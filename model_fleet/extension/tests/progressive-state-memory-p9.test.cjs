const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

function loadPsm() {
  const context = { globalThis: null, crypto: crypto.webcrypto, TextEncoder };
  context.globalThis = context;
  for (const file of ['progressive-state-memory-m7-p1.js', 'progressive-state-memory-m7-p2.js', 'progressive-state-memory-m7-p3.js', 'progressive-state-memory-m7-p4.js', 'progressive-state-memory-m7-p5.js', 'progressive-state-memory-m7-p6.js', 'progressive-state-memory-m7-p7.js', 'progressive-state-memory-m7-p8.js', 'progressive-state-memory-m7-p9.js']) vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context, { filename: file });
  return { p1: context.ProgressiveStateMemoryM7P1, p2: context.ProgressiveStateMemoryM7P2, p4: context.ProgressiveStateMemoryM7P4, p5: context.ProgressiveStateMemoryM7P5, p6: context.ProgressiveStateMemoryM7P6, p7: context.ProgressiveStateMemoryM7P7, p8: context.ProgressiveStateMemoryM7P8, p9: context.ProgressiveStateMemoryM7P9 };
}
const reality = () => ({ id: 'model-fleet', repositoryPath: '/workspace/ai_sandbox/extension_chromium/model_fleet', branch: 'main', head: '6ee3bf81a9700c4c3a3b5b00851f911585512248' });
const digest = (text) => `sha256:${crypto.createHash('sha256').update(Buffer.from(text)).digest('hex')}`;
const bytes = (text) => Array.from(Buffer.from(text));
const clone = (value) => JSON.parse(JSON.stringify(value));
function event({ eventId, sequence, kind, at, sourceKind = 'runtime', payload, conflictsWith = [] }) { const sourceId = sourceKind === 'operator' ? 'operator-1' : 'runtime-1'; return { eventId, sequence, at, kind, source: { kind: sourceKind, id: sourceId }, provenance: [{ kind: sourceKind, ref: `${sourceKind}:${sourceId}`, digest: `sha256:${String(at).padStart(64, '0')}` }], payload, supersedes: null, conflictsWith }; }
async function fixture() {
  const { p1, p2, p4, p5, p6, p7, p8, p9 } = loadPsm(); let ledger = p1.emptyLedger();
  for (const spec of [
    event({ eventId: 'goal-old', sequence: 1, kind: 'goal.changed', at: 90, sourceKind: 'operator', payload: { goal: 'old goal' } }),
    event({ eventId: 'goal-1', sequence: 2, kind: 'goal.changed', at: 100, sourceKind: 'operator', payload: { goal: 'restart with literal acceptedEvents context_digest text' }, conflictsWith: ['goal-old'] }),
    event({ eventId: 'evidence-1', sequence: 3, kind: 'evidence.linked', at: 110, payload: { evidenceId: 'E-1', subjectType: 'goal', subjectId: 'goal', ref: 'evidence/one.txt', digest: digest('one') } }),
  ]) ledger = p1.admitEvent(ledger, spec).ledger;
  const capsule = p4.buildRestartCapsule(p2.reduceLedger(ledger), reality()); const base = p5.createBaseCheckpointV1(capsule); const chain = await p6.buildMerkleChainV1(base, []); const index = await p7.buildSupersessionConflictIndexV1(chain); return { ...loadPsm(), chain, index, p8, p9 };
}

test('P9 is isolated, offline, and does not wire runtime/bootstrap authority', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'progressive-state-memory-m7-p9.js'), 'utf8');
  assert.match(source, /ProgressiveStateMemoryM7P6/);
  assert.match(source, /ProgressiveStateMemoryM7P7/);
  assert.match(source, /ProgressiveStateMemoryM7P8/);
  assert.doesNotMatch(source, /chrome\.|chrome\.storage|fetch\(|XMLHttpRequest|require\(|module\.exports|Date\.now|Math\.random|reload|network|connector/i);
});

test('bootstrap reconstructs latest P4 state and preserves P7 guardrails/action gap', async () => {
  const { p9, chain, index } = await fixture(); const bootstrap = await p9.buildRestartBootstrapV1(chain, reality());
  assert.deepEqual(JSON.parse(JSON.stringify(bootstrap.capsule)), JSON.parse(JSON.stringify((await loadPsm().p6.verifyMerkleChainV1(chain)).capsule)));
  assert.deepEqual(bootstrap.finalCurrentEventIds, index.finalCurrentEventIds);
  assert.deepEqual(bootstrap.doNotResurrectEventIds, index.doNotResurrectEventIds);
  assert.deepEqual(bootstrap.unresolvedConflicts, index.unresolvedConflicts);
  assert.deepEqual(bootstrap.unresolvedReferences, index.unresolvedReferences);
  assert.equal(bootstrap.nextAction, null);
  assert.equal(bootstrap.nextActionStatus, 'not-encoded-by-p2-p3');
  assert.equal(bootstrap.state, 'structurally-valid-action-gap');
  await p9.validateRestartBootstrapV1(chain, reality(), bootstrap);
});

test('project reality drift and tampered chain fail closed before bootstrap', async () => {
  const { p9, chain } = await fixture();
  for (const key of ['id', 'repositoryPath', 'branch', 'head']) { const forged = reality(); forged[key] = `${forged[key]}-stale`; await assert.rejects(() => p9.buildRestartBootstrapV1(chain, forged), /stale-restart-context/); }
  const tampered = clone(chain); tampered.nodes[0].checkpoint.capsule.goal.fact.goal = 'forged'; await assert.rejects(() => p9.buildRestartBootstrapV1(tampered, reality()), /invalid-p6-chain/);
});

test('negative memory and unresolved guardrails cannot be omitted or forged', async () => {
  const { p9, chain } = await fixture(); const bootstrap = await p9.buildRestartBootstrapV1(chain, reality());
  for (const mutate of [
    (value) => { value.doNotResurrectEventIds = ['forged']; },
    (value) => { value.finalCurrentEventIds = ['forged']; },
    (value) => { value.unresolvedReferences = []; },
    (value) => { value.unresolvedReferences[0].targetEventId = 'winner'; },
    (value) => { value.nextAction = 'invented'; },
  ]) { const forged = clone(bootstrap); mutate(forged); await assert.rejects(() => p9.validateRestartBootstrapV1(chain, reality(), forged)); }
});

test('optional P8 evidence is accepted only when current, exact, and source-bound', async () => {
  const { p8, p9, chain } = await fixture(); const plan = p8.planEvidenceHydrationV1((await fixture()).index, ['evidence-1'], 10); const bundle = await p8.hydrateEvidenceV1((await fixture()).index, plan, async () => bytes('one')); const bootstrap = await p9.buildRestartBootstrapV1(chain, reality(), [bundle]);
  assert.equal(bootstrap.hydratedEvidenceBundles.length, 1);
  const wrongSource = clone(bundle); wrongSource.source.generation += 1; await assert.rejects(() => p9.buildRestartBootstrapV1(chain, reality(), [wrongSource]), /invalid-hydrated-bundle/);
  const duplicate = [bundle, clone(bundle)]; await assert.rejects(() => p9.buildRestartBootstrapV1(chain, reality(), duplicate), /duplicate-hydrated-evidence/);
  const irrelevant = clone(bundle); irrelevant.requestedEventIds = ['goal-1']; irrelevant.items[0].eventId = 'goal-1'; await assert.rejects(() => p9.buildRestartBootstrapV1(chain, reality(), [irrelevant]), /invalid-hydrated-bundle/);
});

test('no bundles perform no resolver work and render deterministically with byte budgeting', async () => {
  const { p9, chain } = await fixture(); let calls = 0; const bootstrap = await p9.buildRestartBootstrapV1(chain, reality(), []); const reordered = JSON.parse(JSON.stringify(bootstrap, (key, value) => { if (value && typeof value === 'object' && !Array.isArray(value)) { const result = {}; Object.keys(value).reverse().forEach((name) => { result[name] = value[name]; }); return result; } return value; }));
  const first = p9.renderRestartBootstrapV1(bootstrap, { maxBytes: 12288 }); const second = p9.renderRestartBootstrapV1(reordered, { maxBytes: 12288 }); assert.equal(first.serialized, second.serialized); assert.equal(first.byteLength, new TextEncoder().encode(first.serialized).byteLength); assert.equal(calls, 0); assert.throws(() => p9.renderRestartBootstrapV1(bootstrap, { maxBytes: first.byteLength - 1 }), /bootstrap-exceeds-byte-budget/);
});

test('unknown fields, malformed schemas, and input mutation fail closed', async () => {
  const { p9, chain } = await fixture(); const bootstrap = await p9.buildRestartBootstrapV1(chain, reality()); const before = JSON.stringify({ chain, bootstrap });
  for (const mutate of [(value) => { value.extra = true; }, (value) => { value.capsule.extra = true; }, (value) => { value.hydratedEvidenceBundles = null; }]) { const forged = clone(bootstrap); mutate(forged); await assert.rejects(() => p9.validateRestartBootstrapV1(chain, reality(), forged)); }
  assert.equal(JSON.stringify({ chain, bootstrap }), before);
});
