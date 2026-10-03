const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

function loadPsm() {
  const context = { globalThis: null };
  context.globalThis = context;
  for (const file of ['progressive-state-memory-m7-p1.js', 'progressive-state-memory-m7-p2.js', 'progressive-state-memory-m7-p3.js', 'progressive-state-memory-m7-p4.js', 'progressive-state-memory-m7-p5.js']) {
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context, { filename: file });
  }
  return { p1: context.ProgressiveStateMemoryM7P1, p2: context.ProgressiveStateMemoryM7P2, p4: context.ProgressiveStateMemoryM7P4, p5: context.ProgressiveStateMemoryM7P5 };
}

function makeEvent(kind, payload, at, sourceKind = 'runtime', eventId = `${kind}-${at}`) {
  const sourceId = sourceKind === 'operator' ? 'operator-1' : 'runtime-1';
  return { eventId, sequence: 1, at, kind, source: { kind: sourceKind, id: sourceId }, provenance: [{ kind: sourceKind, ref: `${sourceKind}:${sourceId}`, digest: `sha256:${String(at).padStart(64, '0')}` }], payload, supersedes: null, conflictsWith: [] };
}

function task(taskId, phase, dependencies = []) {
  return { taskId, title: taskId, role: 'implementation', phase, blocker: phase === 'blocked' ? 'blocked' : null, result: phase === 'done' ? 'done' : null, ownerWorkerId: null, dependencies, priority: 1 };
}

function stateFromSpecs(p1, p2, specs) {
  let ledger = p1.emptyLedger();
  for (const spec of specs) ledger = p1.admitEvent(ledger, { ...spec, sequence: ledger.nextSequence }).ledger;
  return p2.reduceLedger(ledger);
}

function capsule() {
  const { p1, p2, p4 } = loadPsm();
  const state = stateFromSpecs(p1, p2, [
    makeEvent('goal.changed', { goal: 'checkpoint goal' }, 100, 'operator', 'goal-1'),
    makeEvent('frontier.changed', { frontierKey: 'T-1', state: 'open', summary: 'work' }, 110, 'runtime', 'frontier-1'),
    makeEvent('constraint.accepted', { constraintId: 'C-1', text: 'constraint', state: 'active' }, 120, 'operator', 'constraint-1'),
    makeEvent('task.accepted', task('T-1', 'blocked'), 130, 'runtime', 'task-1'),
    makeEvent('message.accepted', { messageId: 'M-1', from: 'operator', to: 'W-1', body: 'message', phase: 'queued' }, 140, 'operator', 'message-1'),
  ]);
  return p4.buildRestartCapsule(state, { id: 'model-fleet', repositoryPath: '/workspace/ai_sandbox/extension_chromium/model_fleet', branch: 'main', head: '6ee3bf81a9700c4c3a3b5b00851f911585512248' });
}

function reordered(value) {
  if (Array.isArray(value)) return value.map(reordered);
  if (value && typeof value === 'object') {
    const result = {};
    Object.keys(value).reverse().forEach((key) => { result[key] = reordered(value[key]); });
    return result;
  }
  return value;
}

function stable(value) {
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}

function advancedChild(parent, sequence, at, mutate = () => {}) {
  const child = JSON.parse(JSON.stringify(parent));
  child.watermark = { sequence, eventId: `event-${sequence}`, at };
  mutate(child);
  return child;
}

test('P5 is isolated, browser-compatible, and has no P6 behavior', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'progressive-state-memory-m7-p5.js'), 'utf8');
  assert.doesNotMatch(source, /require\(|module\.exports|chrome\.|Date\.now|Math\.random|chrome\.storage|merkle|context_digest|parent_digest|crypto|hydrate/);
  assert.match(source, /ProgressiveStateMemoryM7P4/);
});

test('base checkpoints require a validated P4 capsule and preserve generation rules', () => {
  const { p5 } = loadPsm();
  const base = p5.createBaseCheckpointV1(capsule());
  assert.equal(base.kind, 'base');
  assert.equal(base.generation, 0);
  assert.equal(base.parentGeneration, null);
  const forged = JSON.parse(JSON.stringify(base));
  forged.capsule.goal.fact.extra = 'forged';
  assert.throws(() => p5.validateBaseCheckpointV1(forged), /invalid-p4-capsule/);
  assert.throws(() => p5.createBaseCheckpointV1(base.capsule, -1), /invalid-base-generation/);
  assert.throws(() => p5.createBaseCheckpointV1(base.capsule, Number.MAX_SAFE_INTEGER + 1), /invalid-base-generation/);
});

test('delta generation is deterministic, top-level, and project-bound', () => {
  const { p5 } = loadPsm();
  const parent = capsule();
  const child = advancedChild(parent, parent.watermark.sequence + 1, parent.watermark.at, (next) => { next.goal.fact.goal = 'updated'; });
  const first = p5.createDeltaCheckpointV1(parent, child, 0);
  const second = p5.createDeltaCheckpointV1(reordered(parent), reordered(child), 0);
  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.deepEqual(Object.keys(first.changes), ['goal']);
  const projectMismatch = JSON.parse(JSON.stringify(child));
  projectMismatch.project.branch = 'other';
  assert.throws(() => p5.createDeltaCheckpointV1(parent, projectMismatch, 0), /project-mismatch/);
  const unknown = JSON.parse(JSON.stringify(first));
  unknown.changes.unknown = true;
  assert.throws(() => p5.validateDeltaCheckpointV1(unknown), /invalid-delta-changes/);
  const unknownProject = JSON.parse(JSON.stringify(first));
  unknownProject.project.extra = true;
  assert.throws(() => p5.validateDeltaCheckpointV1(unknownProject), /invalid-delta-project/);
  assert.deepEqual(Object.keys(first.project).sort(), ['branch', 'head', 'id', 'repositoryPath']);
});

test('delta watermark and generation boundaries fail closed', () => {
  const { p5 } = loadPsm();
  const parent = capsule();
  const child = advancedChild(parent, parent.watermark.sequence + 1, parent.watermark.at, (next) => { next.goal.fact.goal = 'updated'; });
  const delta = p5.createDeltaCheckpointV1(parent, child, 4);
  assert.throws(() => p5.applyDeltaCheckpointV1(parent, 3, delta), /parent-generation-mismatch/);
  const wrongParentWatermark = JSON.parse(JSON.stringify(delta));
  wrongParentWatermark.parentWatermark.sequence -= 1;
  assert.throws(() => p5.applyDeltaCheckpointV1(parent, 4, wrongParentWatermark), /parent-watermark-mismatch/);
  const lowerSequence = JSON.parse(JSON.stringify(child));
  lowerSequence.watermark.sequence = parent.watermark.sequence;
  assert.throws(() => p5.createDeltaCheckpointV1(parent, lowerSequence, 0), /invalid-child-watermark/);
  const parentWithLaterWatermark = advancedChild(parent, parent.watermark.sequence + 1, parent.watermark.at + 60);
  const lowerTime = advancedChild(parentWithLaterWatermark, parentWithLaterWatermark.watermark.sequence + 1, parentWithLaterWatermark.watermark.at - 1);
  assert.throws(() => p5.createDeltaCheckpointV1(parentWithLaterWatermark, lowerTime, 0), /invalid-child-watermark/);
  assert.throws(() => p5.createDeltaCheckpointV1(parent, child, Number.MAX_SAFE_INTEGER), /generation-exhausted/);
  assert.throws(() => p5.createDeltaCheckpointV1(parent, child, Number.MAX_SAFE_INTEGER + 1), /invalid-parent-generation/);
  const unsafe = JSON.parse(JSON.stringify(delta));
  unsafe.parentGeneration = Number.MAX_SAFE_INTEGER;
  unsafe.generation = Number.MAX_SAFE_INTEGER + 1;
  assert.throws(() => p5.validateDeltaCheckpointV1(unsafe), /invalid-delta-generation/);
});

test('delta application reconstructs exact children without mutating inputs', () => {
  const { p5 } = loadPsm();
  const parent = capsule();
  const child = advancedChild(parent, parent.watermark.sequence + 1, parent.watermark.at, (next) => { next.goal.fact.goal = 'updated'; });
  const parentBefore = JSON.stringify(parent);
  const delta = p5.createDeltaCheckpointV1(parent, child, 0);
  const deltaBefore = JSON.stringify(delta);
  const result = p5.applyDeltaCheckpointV1(parent, 0, delta);
  assert.equal(stable(result.capsule), stable(child));
  assert.equal(JSON.stringify(parent), parentBefore);
  assert.equal(JSON.stringify(delta), deltaBefore);
  const tampered = JSON.parse(JSON.stringify(delta));
  tampered.changes.tasks = null;
  assert.throws(() => p5.applyDeltaCheckpointV1(parent, 0, tampered), /invalid-p4-capsule/);
  const otherProject = JSON.parse(JSON.stringify(parent));
  otherProject.project.branch = 'other';
  assert.throws(() => p5.applyDeltaCheckpointV1(otherProject, 0, delta), /project-mismatch/);
  assert.throws(() => p5.replayCheckpointChainV1(p5.createBaseCheckpointV1(otherProject), [delta]), /project-mismatch/);
});

test('watermark-only delta is valid and identical delta is rejected', () => {
  const { p5 } = loadPsm();
  const parent = capsule();
  const child = advancedChild(parent, parent.watermark.sequence + 1, parent.watermark.at);
  const delta = p5.createDeltaCheckpointV1(parent, child, 0);
  assert.deepEqual(Object.keys(delta.changes), []);
  assert.equal(stable(p5.applyDeltaCheckpointV1(parent, 0, delta).capsule), stable(child));
  assert.throws(() => p5.createDeltaCheckpointV1(parent, parent, 0), /no-op-delta/);
});

test('ordered replay rejects skipped/repeated generations and matches the final capsule', () => {
  const { p5 } = loadPsm();
  const baseCapsule = capsule();
  const child1 = advancedChild(baseCapsule, baseCapsule.watermark.sequence + 1, baseCapsule.watermark.at, (next) => { next.goal.fact.goal = 'one'; });
  const child2 = advancedChild(child1, child1.watermark.sequence + 1, child1.watermark.at, (next) => { next.frontier.fact.summary = 'two'; });
  const d1 = p5.createDeltaCheckpointV1(baseCapsule, child1, 0);
  const d2 = p5.createDeltaCheckpointV1(child1, child2, 1);
  const base = p5.createBaseCheckpointV1(baseCapsule);
  const replayed = p5.replayCheckpointChainV1(base, [d1, d2]);
  assert.equal(replayed.generation, 2);
  assert.equal(stable(replayed.capsule), stable(child2));
  assert.throws(() => p5.replayCheckpointChainV1(base, [d2]), /parent-generation-mismatch/);
  assert.throws(() => p5.replayCheckpointChainV1(base, [d1, d1]), /parent-generation-mismatch/);
  const skipped = JSON.parse(JSON.stringify(d2));
  skipped.parentGeneration = 9;
  skipped.generation = 10;
  assert.throws(() => p5.replayCheckpointChainV1(base, [d1, skipped]), /parent-generation-mismatch/);
});

test('explicit compaction emits the latest base and no residual deltas', () => {
  const { p5 } = loadPsm();
  const parent = capsule();
  const child = advancedChild(parent, parent.watermark.sequence + 1, parent.watermark.at, (next) => { next.goal.fact.goal = 'compacted'; });
  const delta = p5.createDeltaCheckpointV1(parent, child, 0);
  const compacted = p5.compactCheckpointChainV1(p5.createBaseCheckpointV1(parent), [delta]);
  assert.equal(compacted.checkpoint.kind, 'base');
  assert.equal(compacted.checkpoint.generation, 1);
  assert.equal(compacted.deltas.length, 0);
  assert.equal(stable(compacted.checkpoint.capsule), stable(p5.replayCheckpointChainV1(compacted.checkpoint, []).capsule));
  assert.equal(stable(compacted.checkpoint.capsule), stable(child));
});
