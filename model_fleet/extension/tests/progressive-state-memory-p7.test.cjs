const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

function loadPsm() {
  const context = { globalThis: null, crypto: crypto.webcrypto, TextEncoder };
  context.globalThis = context;
  for (const file of ['progressive-state-memory-m7-p1.js', 'progressive-state-memory-m7-p2.js', 'progressive-state-memory-m7-p3.js', 'progressive-state-memory-m7-p4.js', 'progressive-state-memory-m7-p5.js', 'progressive-state-memory-m7-p6.js', 'progressive-state-memory-m7-p7.js']) {
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context, { filename: file });
  }
  return { p1: context.ProgressiveStateMemoryM7P1, p2: context.ProgressiveStateMemoryM7P2, p4: context.ProgressiveStateMemoryM7P4, p5: context.ProgressiveStateMemoryM7P5, p6: context.ProgressiveStateMemoryM7P6, p7: context.ProgressiveStateMemoryM7P7 };
}
function event(kind, payload, at, sourceKind = 'runtime', eventId = `${kind}-${at}`) {
  const sourceId = sourceKind === 'operator' ? 'operator-1' : 'runtime-1';
  return { eventId, sequence: 1, at, kind, source: { kind: sourceKind, id: sourceId }, provenance: [{ kind: sourceKind, ref: `${sourceKind}:${sourceId}`, digest: `sha256:${String(at).padStart(64, '0')}` }], payload, supersedes: null, conflictsWith: [] };
}
function task(taskId, phase) { return { taskId, title: taskId, role: 'implementation', phase, blocker: phase === 'blocked' ? 'blocked' : null, result: phase === 'done' ? 'done' : null, ownerWorkerId: null, dependencies: [], priority: 1 }; }
function capsule() {
  const { p1, p2, p4 } = loadPsm();
  let ledger = p1.emptyLedger();
  for (const spec of [
    event('goal.changed', { goal: 'goal text says conflict and superseded' }, 100, 'operator', 'goal-1'),
    event('frontier.changed', { frontierKey: 'T-1', state: 'open', summary: 'frontier' }, 110, 'runtime', 'frontier-1'),
    event('constraint.accepted', { constraintId: 'C-1', text: 'constraint', state: 'active' }, 120, 'operator', 'constraint-1'),
    event('task.accepted', task('T-1', 'blocked'), 130, 'runtime', 'task-1'),
    event('message.accepted', { messageId: 'M-1', from: 'operator', to: 'W-1', body: 'message', phase: 'queued' }, 140, 'operator', 'message-1'),
  ]) ledger = p1.admitEvent(ledger, { ...spec, sequence: ledger.nextSequence }).ledger;
  return p4.buildRestartCapsule(p2.reduceLedger(ledger), { id: 'model-fleet', repositoryPath: '/workspace/ai_sandbox/extension_chromium/model_fleet', branch: 'main', head: '6ee3bf81a9700c4c3a3b5b00851f911585512248' });
}
function child(parent, sequence, at, mutate = () => {}) { const next = JSON.parse(JSON.stringify(parent)); next.watermark = { sequence, eventId: `event-${sequence}`, at }; mutate(next); return next; }
function established(eventId, sequence, at, supersedes = null, conflictsWith = []) {
  return { eventId, sequence, at, kind: 'goal.changed', source: { kind: 'operator', id: 'operator-1' }, provenance: [{ kind: 'operator', ref: 'operator:operator-1', digest: `sha256:${String(at).padStart(64, '0')}` }], supersedes, conflictsWith };
}
function replaceGoal(value, eventId, sequence, at, supersedes = null, conflictsWith = []) { value.goal.fact.goal = `goal-${eventId}`; value.goal.fact.establishedBy = established(eventId, sequence, at, supersedes, conflictsWith); }
function stable(value) {
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}
async function oneDeltaChain(p5, p6, baseCapsule, nextCapsule) {
  const base = p5.createBaseCheckpointV1(baseCapsule);
  const delta = p5.createDeltaCheckpointV1(baseCapsule, nextCapsule, 0);
  return p6.buildMerkleChainV1(base, [delta]);
}
async function indexFor(baseCapsule, mutate) {
  const { p5, p6, p7 } = loadPsm();
  const next = child(baseCapsule, 6, baseCapsule.watermark.at + 1, mutate);
  return p7.buildSupersessionConflictIndexV1(await oneDeltaChain(p5, p6, baseCapsule, next));
}

test('P7 is isolated, validates through P6, and has no P8 behavior', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'progressive-state-memory-m7-p7.js'), 'utf8');
  assert.match(source, /ProgressiveStateMemoryM7P6/);
  assert.doesNotMatch(source, /chrome\.|chrome\.storage|fetch\(|XMLHttpRequest|hydrate|embedding|llm|Date\.now|Math\.random|module\.exports|require\(/i);
});

test('explicit supersession creates one edge and negative memory; prose alone creates none', async () => {
  const { p5, p6, p7 } = loadPsm();
  const base = capsule();
  const next = child(base, 6, 141, (value) => replaceGoal(value, 'goal-2', 6, 141, 'goal-1'));
  const index = await p7.buildSupersessionConflictIndexV1(await oneDeltaChain(p5, p6, base, next));
  assert.equal(JSON.stringify(index.doNotResurrectEventIds), JSON.stringify(['goal-1']));
  assert.equal(stable(index.supersessionEdges), stable([{ sourceEventId: 'goal-2', targetEventId: 'goal-1', sourceCurrent: true, targetObserved: true }]));
  assert.equal(index.conflictEdges.length, 0);
  const proseOnly = await p7.buildSupersessionConflictIndexV1(await oneDeltaChain(p5, p6, base, child(base, 6, 141, (value) => replaceGoal(value, 'goal-2', 6, 141))));
  assert.equal(stable(proseOnly.doNotResurrectEventIds), stable([]));
});

test('conflict edges are metadata-only and classify conservatively', async () => {
  const { p5, p6, p7 } = loadPsm();
  const base = capsule();
  const unresolved = await p7.buildSupersessionConflictIndexV1(await oneDeltaChain(p5, p6, base, child(base, 6, 141, (value) => replaceGoal(value, 'goal-2', 6, 141, null, ['task-1']))));
  assert.equal(unresolved.conflictEdges[0].status, 'unresolved');
  const resolved = await p7.buildSupersessionConflictIndexV1(await oneDeltaChain(p5, p6, base, child(base, 6, 141, (value) => replaceGoal(value, 'goal-2', 6, 141, 'goal-1', ['goal-1']))));
  assert.equal(resolved.conflictEdges[0].status, 'resolved-by-source-supersession');
  const historicalBase = JSON.parse(JSON.stringify(base));
  historicalBase.goal.fact.establishedBy.conflictsWith = ['missing-historical'];
  const historicalSecond = child(historicalBase, 6, 141, (value) => replaceGoal(value, 'goal-2', 6, 141, 'goal-1'));
  const chain = await p6.buildMerkleChainV1(p5.createBaseCheckpointV1(historicalBase), [p5.createDeltaCheckpointV1(historicalBase, historicalSecond, 0)]);
  const historicalIndex = await p7.buildSupersessionConflictIndexV1(chain);
  assert.equal(historicalIndex.conflictEdges.find((edge) => edge.sourceEventId === 'goal-1').status, 'historical');
});

test('missing references remain unresolved and are never fabricated or resolved', async () => {
  const { p5, p6, p7 } = loadPsm();
  const base = capsule();
  const index = await p7.buildSupersessionConflictIndexV1(await oneDeltaChain(p5, p6, base, child(base, 6, 141, (value) => replaceGoal(value, 'goal-2', 6, 141, 'missing-1', ['missing-2']))));
  assert.equal(stable(index.unresolvedReferences), stable([
    { relation: 'conflictsWith', sourceEventId: 'goal-2', targetEventId: 'missing-2', sourceCurrent: true },
    { relation: 'supersedes', sourceEventId: 'goal-2', targetEventId: 'missing-1', sourceCurrent: true },
  ]));
  assert.equal(stable(index.doNotResurrectEventIds), stable([]));
  assert.equal(index.supersessionEdges[0].targetObserved, false);
});

test('observed supersession and conflict targets must be prior by sequence and time', async () => {
  const { p5, p6, p7 } = loadPsm();
  const original = capsule();
  async function rejectsOrdering(relation, sourceSequence, sourceAt) {
    const base = JSON.parse(JSON.stringify(original));
    base.goal.fact.establishedBy.sequence = 5;
    base.goal.fact.establishedBy.at = 150;
    base.watermark = { sequence: 5, eventId: 'goal-1', at: 150 };
    const next = child(base, 6, 151, (value) => replaceGoal(
      value,
      'goal-2',
      sourceSequence,
      sourceAt,
      relation === 'supersedes' ? 'goal-1' : null,
      relation === 'conflictsWith' ? ['goal-1'] : [],
    ));
    const chain = await oneDeltaChain(p5, p6, base, next);
    await assert.rejects(
      () => p7.buildSupersessionConflictIndexV1(chain),
      /invalid-observed-(supersession|conflict)-ordering/,
    );
  }
  for (const relation of ['supersedes', 'conflictsWith']) {
    await rejectsOrdering(relation, 5, 151); // equal sequence
    await rejectsOrdering(relation, 4, 151); // lower sequence
    await rejectsOrdering(relation, 6, 149); // lower event time
  }
});

test('goal and frontier fact identities are fixed and cannot be forged', async () => {
  const { p5, p6, p7 } = loadPsm();
  const base = capsule();
  const index = await p7.buildSupersessionConflictIndexV1(await oneDeltaChain(p5, p6, base, child(base, 6, 141)));
  for (const factType of ['goal', 'frontier']) {
    const forged = JSON.parse(JSON.stringify(index));
    const entry = forged.observedFactVersions.find((item) => item.factType === factType);
    entry.factId = `${factType}-forged`;
    assert.throws(() => p7.validateSupersessionConflictIndexV1(forged), /fact-identity-mismatch|invalid-p7/);
  }
});

test('unchanged versions deduplicate and mutated or cross-category reuse fails closed', async () => {
  const { p5, p6, p7 } = loadPsm();
  const base = capsule();
  const unchanged = child(base, 6, 141);
  const index = await p7.buildSupersessionConflictIndexV1(await oneDeltaChain(p5, p6, base, unchanged));
  assert.equal(index.observedFactVersions.filter((entry) => entry.eventId === 'goal-1').length, 1);
  const mutated = child(base, 6, 141, (value) => { value.goal.fact.goal = 'changed without a new event'; });
  const mutatedChain = await oneDeltaChain(p5, p6, base, mutated);
  await assert.rejects(() => p7.buildSupersessionConflictIndexV1(mutatedChain), /conflicting-fact-version|invalid-p6-chain/);
  const crossCategory = child(base, 6, 141, (value) => { value.frontier.fact.establishedBy.eventId = 'goal-1'; });
  const crossCategoryChain = await oneDeltaChain(p5, p6, base, crossCategory);
  await assert.rejects(() => p7.buildSupersessionConflictIndexV1(crossCategoryChain), /conflicting-fact-version|duplicate-timeline-event|invalid-p6-chain|invalid-p7/);
});

test('deterministic output, current IDs, and input immutability hold', async () => {
  const { p5, p6, p7 } = loadPsm();
  const base = capsule();
  const next = child(base, 6, 141, (value) => replaceGoal(value, 'goal-2', 6, 141, 'goal-1'));
  const chain = await oneDeltaChain(p5, p6, base, next);
  const before = JSON.stringify(chain);
  const first = await p7.buildSupersessionConflictIndexV1(chain);
  const second = await p7.buildSupersessionConflictIndexV1(JSON.parse(JSON.stringify(chain, (key, value) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) { const result = {}; Object.keys(value).reverse().forEach((name) => { result[name] = value[name]; }); return result; }
    return value;
  })));
  assert.equal(stable(first), stable(second));
  assert.equal(JSON.stringify(chain), before);
  assert.equal(first.source.generation, 1);
  first.finalCurrentEventIds.forEach((id) => assert.ok(first.observedFactVersions.some((entry) => entry.eventId === id)));
});

test('P7 validator rejects forged statuses, edges, current IDs, and negative memory', async () => {
  const { p5, p6, p7 } = loadPsm();
  const base = capsule();
  const next = child(base, 6, 141, (value) => replaceGoal(value, 'goal-2', 6, 141, 'goal-1', ['task-1']));
  const index = await p7.buildSupersessionConflictIndexV1(await oneDeltaChain(p5, p6, base, next));
  for (const mutate of [
    (value) => { value.finalCurrentEventIds = ['missing']; },
    (value) => { value.doNotResurrectEventIds = ['task-1']; },
    (value) => { value.conflictEdges[0].status = 'winner-by-text'; },
    (value) => { value.supersessionEdges[0].targetEventId = 'missing'; },
    (value) => { value.observedFactVersions[0].fact.extra = 'forged'; },
  ]) { const forged = JSON.parse(JSON.stringify(index)); mutate(forged); assert.throws(() => p7.validateSupersessionConflictIndexV1(forged)); }
});

test('invalid P6 chain is rejected before projection', async () => {
  const { p5, p6, p7 } = loadPsm();
  const base = p5.createBaseCheckpointV1(capsule());
  const chain = await p6.buildMerkleChainV1(base, []);
  const forged = JSON.parse(JSON.stringify(chain));
  forged.nodes[0].checkpoint.capsule.goal.fact.goal = 'tampered';
  await assert.rejects(() => p7.buildSupersessionConflictIndexV1(forged), /invalid-p6-chain/);
});
