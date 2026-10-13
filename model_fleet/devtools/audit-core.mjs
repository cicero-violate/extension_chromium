// Pure helpers shared by the read-only Fleet environment inspector.
import {createHash} from 'node:crypto';
export const ENVIRONMENTS=Object.freeze({
  9225:Object.freeze({label:'DEV',profile:'/workspace/.config/model-fleet-dev-9225',runtime:'/workspace/.local/share/model-fleet-dev'}),
  9226:Object.freeze({label:'NEXT',profile:'/workspace/.config/model-fleet-next-9226',runtime:'/workspace/.local/share/model-fleet-next'})
});
const fail=(message)=>{throw new Error(message)};
const hex=/^[0-9a-f]{64}$/;
export function parseArguments(args) {
  if(args.length!==2 && args.length!==3)fail('usage: node devtools/audit.mjs --port 9225|9226 [--strict]');
  if(args[0]!=='--port'||!['9225','9226'].includes(args[1])
     ||(args.length===3&&args[2]!=='--strict'))
    fail('only explicit --port 9225|9226 and optional --strict are permitted');
  return {port:Number(args[1]),strict:args[2]==='--strict'};
}
export function sha(bytes) {return createHash('sha256').update(bytes).digest('hex')}
export function sourceDigest(rows) {
  if(!Array.isArray(rows)||!rows.length)fail('empty installed source inventory');
  const paths=new Set(),byPath=[...rows].sort((a,b)=>a.path<b.path?-1:a.path>b.path?1:0);
  for(const row of byPath){
    if(typeof row.path!=='string'||!row.path||row.path.startsWith('/')||row.path.includes('..')
       ||paths.has(row.path)||!Number.isSafeInteger(row.bytes)||row.bytes<0||!hex.test(row.sha256))
      fail('invalid or duplicate source inventory entry');
    paths.add(row.path);
  }
  return sha(Buffer.from(byPath.map(r=>r.path+'\0'+r.bytes+'\0'+r.sha256+'\n').join(''),'utf8'));
}
export function selectExtension(prefs,installedPath) {
  const matches=Object.entries(prefs?.extensions?.settings||{}).filter(([id,info])=>
    /^[a-p]{32}$/.test(id)&&info?.path===installedPath&&
    (info.disable_reasons===undefined||
      (Array.isArray(info.disable_reasons)&&info.disable_reasons.length===0)));
  if(matches.length!==1)fail('expected exactly one enabled unpacked extension in the selected isolated profile');
  return matches[0][0];
}
export function summarizeState(input,now=Date.now()) {
  if(!input||typeof input!=='object')return {available:false,reason:'state_not_initialized'};
  const workers=Object.values(input.workers||{}),tasks=Object.values(input.tasks||{});
  const assignments=Object.keys(input.assignments||{}).length;
  const messages=Array.isArray(input.messages)?input.messages:[];
  const phases=Object.create(null);
  for(const m of messages){
    const phase=String(m?.phase||'unknown');
    phases[phase]=(phases[phase]||0)+1;
  }
  const status=input.selfHealing?.activationStatus||null;
  const validHeartbeat = value=>typeof value==='number'&&Number.isFinite(value)
    && value>0&&value<=now;
  const mapped=workers.map(w=>{
    const heartbeat=w?.runtime?.lastHeartbeatAt;
    const hasHeartbeat=validHeartbeat(heartbeat);
    const age=hasHeartbeat?Math.max(0,Math.round((now-heartbeat)/1000)):null;
    return {
      id:String(w?.id||''),role:String(w?.role||''),enabled:w?.enabled===true,
      tabBound:Number.isSafeInteger(w?.tabId)&&w.tabId>=0,
      hasAssignment:!!w?.currentAssignmentId,
      lastHeartbeatAgeSeconds:age
    };
  }).sort((a,b)=>a.id.localeCompare(b.id,'en',{numeric:true}));
  const bindingRecordsMissingTab=mapped.filter(w=>!w.tabBound).length;
  const heartbeatRecordsMissing=mapped.filter(w=>w.lastHeartbeatAgeSeconds===null).length;
  const heartbeatRecordsStale=mapped.filter(w=>w.lastHeartbeatAgeSeconds!==null
    &&w.lastHeartbeatAgeSeconds>90).length;
  return {
    available:true,policy:{paused:input.policy?.paused===true,authorityEnabled:input.policy?.authorityEnabled===true},
    generation:Number.isSafeInteger(input.generation)?input.generation:null,
    workers:mapped,workerCount:workers.length,taskCount:tasks.length,
    bindingRecordsMissingTab,heartbeatRecordsMissing,heartbeatRecordsStale,
    workerRecordWarnings:bindingRecordsMissingTab+heartbeatRecordsMissing+heartbeatRecordsStale,
    assignmentCount:assignments,messageCount:messages.length,
    messagePhases:phases,
    healing:{epoch:input.selfHealing?.activationEpoch??null,status},
    // This is a diagnostic only. It never confers R2, R4, or Genesis acceptance.
    genesisAccepted:false
  };
}
export function decideStatus({sourceValid,targetsReadable,workerPresent,stateAvailable}) {
  if(!sourceValid)return 'SOURCE_MISMATCH';
  if(!targetsReadable)return 'CDP_OFFLINE';
  if(!workerPresent)return 'WORKER_DORMANT';
  return stateAvailable?'READ_ONLY_STATE':'STATE_UNAVAILABLE';
}
