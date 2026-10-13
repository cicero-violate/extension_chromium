import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync,spawnSync} from 'node:child_process';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {ENVIRONMENTS,parseArguments,sha,sourceDigest,selectExtension,
 summarizeState,decideStatus} from './audit-core.mjs';

test('D19 requires explicit Dev or NEXT port; never personal, Canon, Release, or open arbitrary CDP',()=>{
 assert.deepEqual(parseArguments(['--port','9225']),{port:9225,strict:false});
 assert.deepEqual(parseArguments(['--port','9226','--strict']),{port:9226,strict:true});
 for(const args of [[],['--port','9222'],['--port','9223'],['--port','9224'],
   ['--port','9227'],['--port','0'],['--port','abc'],['--port','9226','--change'],
   ['--port','9226','--strict','--other']])
   assert.throws(()=>parseArguments(args));
 assert.notEqual(ENVIRONMENTS[9225].profile,ENVIRONMENTS[9226].profile);
 assert.notEqual(ENVIRONMENTS[9225].runtime,ENVIRONMENTS[9226].runtime);
});
test('D19 verifies inventory content digest without mutating source input',()=>{
 const files=[{path:'b.js',bytes:2,sha256:sha(Buffer.from('bb'))},
              {path:'a.js',bytes:3,sha256:sha(Buffer.from('aaa'))}];
 const reversed=files.slice().reverse();
 assert.equal(sourceDigest(files),sourceDigest(reversed));
 assert.deepEqual(files,reversed.slice().reverse());
 for(const rows of [[],[files[0],files[0]],[{...files[0],path:'../password'}],
   [{...files[0],sha256:'not SHA'}], [{...files[0],bytes:-1}]])
   assert.throws(()=>sourceDigest(rows));
});
test('D19 rejects ambiguous, disabled, or wrong-profile extension identity',()=>{
 const first='a'.repeat(32),second='b'.repeat(32);
 const path='/workspace/.local/share/model-fleet-next/extension';
 const enabled={path,disable_reasons:[]},disabled={path,disable_reasons:[1]};
 assert.equal(selectExtension({extensions:{settings:{[first]:enabled}}},path),first);
 assert.equal(selectExtension({extensions:{settings:{[first]:{path}}}},path),first,
  'Chromium may omit disable_reasons for a healthy unpacked extension');
 for(const entries of [{[first]:enabled,[second]:enabled},{[first]:disabled},
  {[first]:{path:'/other',disable_reasons:[]}},{}])
  assert.throws(()=>selectExtension({extensions:{settings:entries}},path));
});
test('D19 read-only state projection never reproduces prompts, message text, or private metadata',()=>{
 const at=1700000000000;
 const state={
  generation:8,policy:{paused:true,authorityEnabled:true},
  workers:{
   W2:{id:'W-S0002',role:'implementation',enabled:true,tabId:35,
       runtime:{lastHeartbeatAt:at-3000},privatePrompt:'SECRET MUST NOT LEAK'},
   W1:{id:'W-S0001',role:'coordinator',enabled:true,tabId:31,
       currentAssignmentId:'A-5',runtime:{lastHeartbeatAt:at-5000}}
  },
  tasks:{T1:{prompt:'PRIVATE'}},assignments:{A5:{body:'PRIVATE'}},
  messages:[{phase:'blocked',body:'SENSITIVE'}, {phase:'delivered',body:'SENSITIVE'}],
  selfHealing:{activationEpoch:2,activationStatus:'blocked'}
 };
 const summary=summarizeState(state,at),printed=JSON.stringify(summary);
 assert.equal(summary.workerCount,2);
 assert.equal(summary.taskCount,1);
 assert.equal(summary.assignmentCount,1);
 assert.equal(summary.messageCount,2);
 assert.deepEqual([...summary.workers].map(x=>x.id),['W-S0001','W-S0002']);
 assert.equal(summary.workers[1].lastHeartbeatAgeSeconds,3);
 assert.equal(summary.messagePhases.blocked,1);
 assert.equal(summary.healing.status,'blocked');
 assert.equal(summary.genesisAccepted,false);
 for(const secret of ['SECRET MUST NOT LEAK','PRIVATE','SENSITIVE','privatePrompt'])
  assert.equal(printed.includes(secret),false);
});
test('D20 incomplete worker bindings and zero/future heartbeats are explicit diagnostics',()=>{
 const at=1800000000000;
 const state={
   workers:{
     coordinator:{id:'W-S0001',role:'coordinator',enabled:true,tabId:null,
       runtime:{lastHeartbeatAt:0}},
     implementation:{id:'W-S0002',role:'implementation',enabled:true,tabId:22,
       runtime:{lastHeartbeatAt:at-200000}},
     review:{id:'W-S0003',role:'review',enabled:true,tabId:-2,
       runtime:{lastHeartbeatAt:at+600000}}
   },policy:{paused:true,authorityEnabled:true},
   tasks:{},messages:[],assignments:{}
 };
 const r=summarizeState(state,at);
 assert.equal(r.workerCount,3);
 assert.equal(r.bindingRecordsMissingTab,2);
 assert.equal(r.heartbeatRecordsMissing,2);
 assert.equal(r.heartbeatRecordsStale,1);
 assert.equal(r.workerRecordWarnings,5);
 assert.equal(r.workers[0].tabBound,false);
 assert.equal(r.workers[0].lastHeartbeatAgeSeconds,null);
 assert.equal(r.workers[1].lastHeartbeatAgeSeconds,200);
 assert.equal(r.workers[2].tabBound,false);
 assert.equal(r.workers[2].lastHeartbeatAgeSeconds,null);
 assert.equal(r.genesisAccepted,false);
});
test('D20 missing or malformed lastHeartbeatAt never becomes a fake huge age',()=>{
 const at=1800000000000;
 for(const invalid of [0,null,undefined,Infinity,NaN,-1,at+120000,'100']){
   const r=summarizeState({workers:{X:{id:'W-S0001',tabId:1,
     runtime:{lastHeartbeatAt:invalid}}}},at);
   assert.equal(r.workers[0].lastHeartbeatAgeSeconds,null,String(invalid));
   assert.equal(r.heartbeatRecordsMissing,1);
 }
});
test('D19 sleeping worker is inconclusive, missing source is failure, neither is acceptance',()=>{
 assert.equal(decideStatus({sourceValid:true,targetsReadable:true,workerPresent:false}),
              'WORKER_DORMANT');
 assert.equal(decideStatus({sourceValid:false}),'SOURCE_MISMATCH');
 assert.equal(decideStatus({sourceValid:true,targetsReadable:false}),'CDP_OFFLINE');
 assert.equal(decideStatus({sourceValid:true,targetsReadable:true,workerPresent:true,
                           stateAvailable:false}),'STATE_UNAVAILABLE');
 assert.equal(decideStatus({sourceValid:true,targetsReadable:true,workerPresent:true,
                           stateAvailable:true}),'READ_ONLY_STATE');
});
test('D19 CLI rejects unsafe ports before it can read browser state',()=>{
 const script=fileURLToPath(new URL('./audit.mjs',import.meta.url));
 for(const port of ['9222','9223','9224','9227']){
  const completed=spawnSync(process.execPath,[script,'--port',port],
   {encoding:'utf8',timeout:8000});
  assert.notEqual(completed.status,0);
  assert.match(completed.stderr,/explicit --port 9225\|9226/);
 }
});
test('D19 inspector has no mutation, open-tab, login, credential, or replay actions',()=>{
 const source=execFileSync('cat',[fileURLToPath(new URL('./audit.mjs',import.meta.url))],
  {encoding:'utf8'});
 for(const forbidden of ['chrome.storage.local.set','Target.createTarget',
  'Target.closeTarget','ServiceWorker.startWorker','fleet:update-policy',
  'fleet:reconcile-topology','shell:exec','--remote-debugging-port',
  '/Cookies','Login Data','Network.setCookie','fetch("https://'])
   assert.equal(source.includes(forbidden),false,forbidden);
 assert.match(source,/chrome\.storage\.local\.get/);
 assert.match(source,/Runtime\.evaluate/);
});
