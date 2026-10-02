const assert = require('assert');

function ingest(payload) {
  if (!payload.correlationId || !payload.contextId) return { ok:false, error:'invalid_workspace_evidence' };
  return { ok:true, evidence: payload };
}

assert.deepStrictEqual(ingest({correlationId:'c1',contextId:'ctx1',accessMode:'isolated_mutation',projectRoot:'/workspace'}).ok, true);
assert.deepStrictEqual(ingest({contextId:'ctx1'}).error, 'invalid_workspace_evidence');
assert.deepStrictEqual(ingest({correlationId:'c1'}).error, 'invalid_workspace_evidence');
const read = {lastEvidence:{correlationId:'c1',contextId:'ctx1'}, updatedAt:Date.now()};
assert.ok(read.lastEvidence.contextId);
console.log('workspace evidence tests passed');
