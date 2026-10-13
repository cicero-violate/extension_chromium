#!/usr/bin/env node
// Read-only Model Fleet diagnostic. Never contacts personal 9222, Canon 9223,
// Release 9224, or mutable browser/extension state APIs.
import {readFileSync,readdirSync,lstatSync,realpathSync} from 'node:fs';
import {join,relative,resolve,sep} from 'node:path';
import {ENVIRONMENTS,parseArguments,sha,sourceDigest,selectExtension,
  summarizeState,decideStatus} from './audit-core.mjs';

const fail=(message)=>{throw new Error(message)};
const {port,strict}=parseArguments(process.argv.slice(2));
const env=ENVIRONMENTS[port],directory=env.runtime+'/extension';
const receipt=JSON.parse(readFileSync(env.runtime+'/release.json','utf8'));
if(receipt.devOnly!==true||receipt.promotable!==false)fail('non-development receipt: audit refused');
if(port===9226&&receipt.port!==9226)fail('NEXT 9226 installed receipt port mismatch');
const prefs=JSON.parse(readFileSync(env.profile+'/Default/Preferences','utf8'));
const extensionId=selectExtension(prefs,directory);
if(!lstatSync(directory).isDirectory()||realpathSync(directory)!==directory)
 fail('installed extension directory must be real, not symlinked');
const inventory=[];
function walk(dir) {
 for(const name of readdirSync(dir).sort()){
  const item=join(dir,name),stat=lstatSync(item);
  if(stat.isSymbolicLink())fail('symlink rejected in installed extension');
  if(stat.isDirectory()){walk(item);continue;}
  if(!stat.isFile())fail('unrecognized installed extension filesystem entry');
  const path=relative(directory,item).split(sep).join('/');
  const contents=readFileSync(item);
  inventory.push({path,bytes:contents.length,sha256:sha(contents)});
 }
}
walk(directory);
const expected=receipt.inventory;
if(!expected||!Array.isArray(expected.files)||!expected.files.length)
 fail('missing tested source inventory');
const actualDigest=sourceDigest(inventory);
const expectedDigest=sourceDigest(expected.files);
const lhs=new Map(inventory.map(r=>[r.path,r]));
const sourceValid=actualDigest===expected.digest&&expectedDigest===expected.digest&&
 lhs.size===expected.files.length&&
 expected.files.every(r=>{const actual=lhs.get(r.path);return !!actual&&
 actual.bytes===r.bytes&&actual.sha256===r.sha256});
const result={
 schema:'model-fleet-devtools-audit-v1',port,environment:env.label,
 extensionId,installedSourceDigest:actualDigest,
 testedReceiptDigest:expected.digest,sourceMatchesReceipt:sourceValid,
 strict,readOnly:true,genesisAccepted:false
};
if(!sourceValid){
 result.status=decideStatus({sourceValid:false});
 console.log(JSON.stringify(result,null,2));
 process.exitCode=2;
}else{
 let targets=null;
 try{
  const response=await fetch('http://127.0.0.1:'+port+'/json/list',
   {signal:AbortSignal.timeout(3200)});
  if(response.ok)targets=await response.json();
 }catch{}
 if(!Array.isArray(targets)){
  result.status='CDP_OFFLINE';
 }else{
  const source='chrome-extension://'+extensionId+'/background.js';
  const workers=targets.filter(t=>t.type==='service_worker'&&t.url===source);
  // A different extension worker or multiple identities is not an absence.
  const unexpected=targets.filter(t=>t.type==='service_worker'
    &&/^chrome-extension:\/\//.test(t.url||'')&&t.url!==source);
  if(unexpected.length||workers.length>1){
   result.status='IDENTITY_AMBIGUOUS';
   result.observedExpectedWorkers=workers.length;
   result.otherExtensionWorkers=unexpected.length;
  }else if(!workers.length){
   result.status='WORKER_DORMANT';
   result.runtimeEvidence='unavailable until the exact worker is awake';
  }else{
   const ws=new WebSocket(workers[0].webSocketDebuggerUrl);
   try{
    await Promise.race([
      new Promise((done,reject)=>{
       ws.addEventListener('open',done,{once:true});
       ws.addEventListener('error',reject,{once:true});
      }),
      new Promise((_,reject)=>setTimeout(()=>reject(Error('read-only CDP attach timed out')),3500))
    ]);
    const projection=[
     "(async()=>{",
     "const data=await chrome.storage.local.get('modelFleetState:v2');",
     "const s=data['modelFleetState:v2'];",
     "if(!s)return {runtimeId:chrome.runtime.id,initialized:false};",
     "const rows=Object.values(s.workers||{});",
     "return {runtimeId:chrome.runtime.id,initialized:true,",
     "policy:{paused:s.policy?.paused,authorityEnabled:s.policy?.authorityEnabled},",
     "generation:s.generation,",
     "workers:rows.map(w=>({id:w.id,role:w.role,enabled:w.enabled,tabId:w.tabId,",
     "currentAssignmentId:w.currentAssignmentId,runtime:{lastHeartbeatAt:w.runtime?.lastHeartbeatAt}})),",
     "tasks:Object.fromEntries(Object.keys(s.tasks||{}).map(k=>[k,{}])),",
     "assignments:Object.fromEntries(Object.keys(s.assignments||{}).map(k=>[k,{}])),",
     "messages:(s.messages||[]).map(m=>({phase:m.phase})),",
     "selfHealing:{activationEpoch:s.selfHealing?.activationEpoch,",
     "activationStatus:s.selfHealing?.activationStatus}};",
     "})()"
    ].join('');
    const projectionResult=await new Promise((done,reject)=>{
      const timer=setTimeout(()=>reject(Error('read-only CDP evaluation timed out')),6000);
      ws.addEventListener('message',event=>{
       const message=JSON.parse(event.data);
       if(message.id!==1)return;
       clearTimeout(timer);
       if(message.error||message.result?.exceptionDetails)
         reject(Error('read-only projection failed'));
       else done(message.result?.result?.value);
      });
      ws.send(JSON.stringify({id:1,method:'Runtime.evaluate',params:{
       expression:projection,returnByValue:true,awaitPromise:true}}));
    });
    if(!projectionResult||projectionResult.runtimeId!==extensionId)
      fail('CDP evaluation returned incorrect extension identity');
    result.runtimeState=projectionResult.initialized
      ?summarizeState(projectionResult):{available:false,reason:'state_not_initialized'};
    result.status=decideStatus({sourceValid:true,targetsReadable:true,
      workerPresent:true,stateAvailable:result.runtimeState.available});
   }catch(error){
    result.status='STATE_UNAVAILABLE';
    result.runtimeEvidenceError=String(error.message||error).slice(0,150);
   }finally{ws.close()}
  }
 }
 console.log(JSON.stringify(result,null,2));
 if(strict&&result.status!=='READ_ONLY_STATE')process.exitCode=2;
 if(result.status==='IDENTITY_AMBIGUOUS')process.exitCode=2;
}
