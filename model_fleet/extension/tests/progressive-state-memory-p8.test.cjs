const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

function loadPsm() {
  const context = { globalThis: null, crypto: crypto.webcrypto, TextEncoder };
  context.globalThis = context;
  for (const file of ['progressive-state-memory-m7-p1.js', 'progressive-state-memory-m7-p2.js', 'progressive-state-memory-m7-p3.js', 'progressive-state-memory-m7-p4.js', 'progressive-state-memory-m7-p5.js', 'progressive-state-memory-m7-p6.js', 'progressive-state-memory-m7-p7.js', 'progressive-state-memory-m7-p8.js']) {
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context, { filename: file });
  }
  return { p1: context.ProgressiveStateMemoryM7P1, p2: context.ProgressiveStateMemoryM7P2, p4: context.ProgressiveStateMemoryM7P4, p5: context.ProgressiveStateMemoryM7P5, p6: context.ProgressiveStateMemoryM7P6, p7: context.ProgressiveStateMemoryM7P7, p8: context.ProgressiveStateMemoryM7P8 };
}
function project() { return { id: 'model-fleet', repositoryPath: '/workspace/ai_sandbox/extension_chromium/model_fleet', branch: 'main', head: '6ee3bf81a9700c4c3a3b5b00851f911585512248' }; }
function event({ eventId, sequence, kind, at, sourceKind = 'runtime', payload }) { const sourceId = sourceKind === 'operator' ? 'operator-1' : 'runtime-1'; return { eventId, sequence, at, kind, source: { kind: sourceKind, id: sourceId }, provenance: [{ kind: sourceKind, ref: `${sourceKind}:${sourceId}`, digest: `sha256:${String(at).padStart(64, '0')}` }], payload, supersedes: null, conflictsWith: [] }; }
async function evidenceIndex() {
  const { p1, p2, p4, p5, p6, p7 } = loadPsm();
  let ledger = p1.emptyLedger();
  const specs = [
    event({ eventId: 'goal-1', sequence: 1, kind: 'goal.changed', at: 100, sourceKind: 'operator', payload: { goal: 'hydrate exact evidence' } }),
    event({ eventId: 'evidence-1', sequence: 2, kind: 'evidence.linked', at: 110, payload: { evidenceId: 'E-1', subjectType: 'goal', subjectId: 'goal', ref: 'docs/one.txt', digest: digest('one') } }),
    event({ eventId: 'evidence-2', sequence: 3, kind: 'evidence.linked', at: 120, payload: { evidenceId: 'E-2', subjectType: 'goal', subjectId: 'goal', ref: 'literal acceptedEvents.txt', digest: digest('two') } }),
  ];
  for (const spec of specs) ledger = p1.admitEvent(ledger, spec).ledger;
  const capsule = p4.buildRestartCapsule(p2.reduceLedger(ledger), project());
  const base = p5.createBaseCheckpointV1(capsule);
  const chain = await p6.buildMerkleChainV1(base, []);
  return { ...loadPsm(), index: await p7.buildSupersessionConflictIndexV1(chain) };
}
function bytes(text) { return Array.from(Buffer.from(text)); }
function digest(text) { return `sha256:${crypto.createHash('sha256').update(Buffer.from(text)).digest('hex')}`; }
function clone(value) { return JSON.parse(JSON.stringify(value)); }

test('P8 is isolated and has no resolver or P9/runtime authority', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'progressive-state-memory-m7-p8.js'), 'utf8');
  assert.match(source, /ProgressiveStateMemoryM7P7/);
  assert.doesNotMatch(source, /chrome\.|fetch\(|XMLHttpRequest|require\(|module\.exports|Date\.now|Math\.random|filesystem|connector/i);
});

test('planner validates P7, selects only evidence, sorts IDs, and performs zero I/O', async () => {
  const { p8, index } = await evidenceIndex(); let calls = 0;
  const plan = p8.planEvidenceHydrationV1(index, ['evidence-2', 'evidence-1'], 100);
  assert.deepEqual(plan.requestedEventIds, ['evidence-1', 'evidence-2']);
  assert.deepEqual(plan.items.map((item) => item.eventId), ['evidence-1', 'evidence-2']);
  assert.equal(calls, 0);
  assert.throws(() => p8.planEvidenceHydrationV1(index, ['goal-1'], 100), /requested-event-not-evidence/);
  assert.throws(() => p8.planEvidenceHydrationV1(index, ['evidence-1', 'evidence-1'], 100), /invalid-requested-event-ids/);
  assert.throws(() => p8.planEvidenceHydrationV1(index, ['missing'], 100), /requested-event-not-evidence/);
});

test('hydration resolves requested evidence in order and verifies exact bytes', async () => {
  const { p8, index } = await evidenceIndex(); const plan = p8.planEvidenceHydrationV1(index, ['evidence-2', 'evidence-1'], 100); const calls = [];
  const bundle = await p8.hydrateEvidenceV1(index, plan, async (descriptor) => { calls.push(descriptor.eventId); return bytes(descriptor.eventId === 'evidence-1' ? 'one' : 'two'); });
  assert.deepEqual(calls, ['evidence-1', 'evidence-2']);
  assert.equal(bundle.totalByteLength, 6);
  assert.equal(JSON.stringify(bundle.items.map((item) => item.byteLength)), JSON.stringify([3, 3]));
  assert.equal(JSON.stringify(bundle.items.map((item) => item.bytes)), JSON.stringify([bytes('one'), bytes('two')]));
});

test('bundle preserves exact request byte budget and freezes the resolver descriptor', async () => {
  const { p8, index } = await evidenceIndex();
  const observed = [];
  const small = await p8.hydrateEvidenceV1(index, p8.planEvidenceHydrationV1(index, ['evidence-1'], 3), async (descriptor) => { observed.push(Object.isFrozen(descriptor)); try { descriptor.ref = 'forged'; } catch (error) {} return bytes('one'); });
  const large = await p8.hydrateEvidenceV1(index, p8.planEvidenceHydrationV1(index, ['evidence-1'], 100), async (descriptor) => bytes('one'));
  assert.deepEqual(observed, [true]);
  assert.equal(small.byteBudget, 3);
  assert.equal(large.byteBudget, 100);
  assert.notEqual(JSON.stringify(small), JSON.stringify(large));
  const missing = clone(small); delete missing.byteBudget;
  await assert.rejects(() => p8.validateHydratedEvidenceBundleV1(index, missing), /invalid-hydrated-bundle/);
  const malformed = clone(small); malformed.byteBudget = 0;
  await assert.rejects(() => p8.validateHydratedEvidenceBundleV1(index, malformed), /invalid-byte-budget|invalid-hydrated-bundle/);
  const under = clone(small); under.byteBudget = 2;
  await assert.rejects(() => p8.validateHydratedEvidenceBundleV1(index, under), /invalid-hydrated-bundle/);
});

test('source binding, digest mismatch, malformed resolver, and failures are fail-closed', async () => {
  const { p8, index } = await evidenceIndex(); const plan = p8.planEvidenceHydrationV1(index, ['evidence-1'], 100);
  const foreign = clone(plan); foreign.source.generation += 1;
  await assert.rejects(() => p8.hydrateEvidenceV1(index, foreign, async () => bytes('one')), /source-mismatch/);
  await assert.rejects(() => p8.hydrateEvidenceV1(index, plan, async () => bytes('wrong')), /evidence-digest-mismatch/);
  await assert.rejects(() => p8.hydrateEvidenceV1(index, plan, async () => new Uint8Array([1])), /invalid-evidence-bytes/);
  await assert.rejects(() => p8.hydrateEvidenceV1(index, plan, async () => { throw new Error('resolver down'); }), /resolver-failed/);
});

test('byte budgets reject overflow without truncation or partial result', async () => {
  const { p8, index } = await evidenceIndex(); const plan = p8.planEvidenceHydrationV1(index, ['evidence-1', 'evidence-2'], 5);
  let calls = 0;
  await assert.rejects(() => p8.hydrateEvidenceV1(index, plan, async (descriptor) => { calls += 1; return bytes(descriptor.eventId === 'evidence-1' ? 'one' : 'two'); }), /byte-budget-exceeded/);
  assert.equal(calls, 2);
  assert.throws(() => p8.planEvidenceHydrationV1(index, ['evidence-1'], 0), /invalid-byte-budget/);
});

test('request, plan, index, and returned bytes remain immutable; bundle validation is strict', async () => {
  const { p8, index } = await evidenceIndex(); const request = p8.createEvidenceHydrationRequestV1(index, ['evidence-1'], 20); const before = JSON.stringify({ index, request });
  const bundle = await p8.hydrateEvidenceV1(index, request, async () => bytes('one'));
  assert.equal(JSON.stringify({ index, request }), before);
  for (const mutate of [
    (value) => { value.items[0].bytes[0] ^= 1; },
    (value) => { value.items[0].byteLength += 1; },
    (value) => { value.totalByteLength += 1; },
    (value) => { delete value.byteBudget; },
    (value) => { value.items[0].ref = 'forged'; },
    (value) => { value.extra = true; },
    (value) => { value.items = [value.items[0], value.items[0]]; },
  ]) { const forged = clone(bundle); mutate(forged); await assert.rejects(() => p8.validateHydratedEvidenceBundleV1(index, forged)); }
});

test('invalid or non-evidence P7 indexes fail before planning or resolver calls', async () => {
  const { p8, index } = await evidenceIndex(); const forged = clone(index); forged.observedFactVersions[0].fact.goal = 'forged'; let calls = 0;
  assert.throws(() => p8.planEvidenceHydrationV1(forged, ['evidence-1'], 20), /invalid-p7-index/);
  const plan = p8.planEvidenceHydrationV1(index, ['evidence-1'], 20);
  await assert.rejects(() => p8.hydrateEvidenceV1(forged, plan, async () => { calls += 1; return bytes('one'); }), /invalid-p7-index/);
  assert.equal(calls, 0);
  assert.throws(() => p8.planEvidenceHydrationV1(index, ['goal-1'], 20), /requested-event-not-evidence/);
});
