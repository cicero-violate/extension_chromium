const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

function loadPsm() {
  const context = { globalThis: null };
  context.globalThis = context;
  for (const file of ['progressive-state-memory-m7-p1.js', 'progressive-state-memory-m7-p2.js', 'progressive-state-memory-m7-p3.js', 'progressive-state-memory-m7-p4.js']) {
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context, { filename: file });
  }
  return { p1: context.ProgressiveStateMemoryM7P1, p2: context.ProgressiveStateMemoryM7P2, p4: context.ProgressiveStateMemoryM7P4 };
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

function project() {
  return { id: 'model-fleet', repositoryPath: '/workspace/ai_sandbox/extension_chromium/model_fleet', branch: 'main', head: '6ee3bf81a9700c4c3a3b5b00851f911585512248' };
}

function richState() {
  const { p1, p2 } = loadPsm();
  return stateFromSpecs(p1, p2, [
    makeEvent('goal.changed', { goal: 'acceptedEvents context_digest parent_digest are ordinary goal text' }, 100, 'operator', 'goal-1'),
    makeEvent('frontier.changed', { frontierKey: 'T-1', state: 'open', summary: 'capsule work' }, 110, 'runtime', 'frontier-1'),
    makeEvent('constraint.accepted', { constraintId: 'C-1', text: 'retain acceptedEvents context_digest parent_digest literally', state: 'active' }, 120, 'operator', 'constraint-1'),
    makeEvent('task.accepted', task('T-done', 'done'), 130, 'runtime', 'task-done'),
    makeEvent('task.accepted', task('T-1', 'blocked', ['T-done']), 140, 'runtime', 'task-1'),
    makeEvent('message.accepted', { messageId: 'M-1', from: 'operator', to: 'W-1', body: 'acceptedEvents context_digest parent_digest', phase: 'queued' }, 150, 'operator', 'message-1'),
    makeEvent('operator.decision', { decisionId: 'D-1', decision: 'continue', targetType: 'goal', targetId: 'goal' }, 160, 'operator', 'decision-1'),
    makeEvent('evidence.linked', { evidenceId: 'E-1', subjectType: 'goal', subjectId: 'goal', ref: 'goal.txt', digest: `sha256:${'1'.repeat(64)}` }, 170, 'runtime', 'evidence-1'),
  ]);
}

test('P4 is isolated, browser-compatible, and does not implement later nodes', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'progressive-state-memory-m7-p4.js'), 'utf8');
  assert.doesNotMatch(source, /require\(|module\.exports|chrome\.|Date\.now|Math\.random|chrome\.storage|context_digest|parent_digest|merkle|hydrate|schedule\(/);
  assert.match(source, /ProgressiveStateMemoryM7P3/);
  assert.equal(loadPsm().p4.SCHEMA_VERSION, 1);
});

test('builder derives from validated P3 and preserves facts, reasons, watermark, and next-action gap', () => {
  const { p4 } = loadPsm();
  const state = richState();
  const before = JSON.stringify(state);
  const capsule = p4.buildRestartCapsule(state, project());
  assert.equal(capsule.goal.fact.goal, 'acceptedEvents context_digest parent_digest are ordinary goal text');
  assert.deepEqual(JSON.parse(JSON.stringify(capsule.tasks.map((entry) => entry.id))), ['T-1', 'T-done']);
  assert.equal(capsule.tasks[1].selection.code, 'dependency-closure');
  assert.equal(capsule.nextAction, null);
  assert.equal(capsule.nextActionGap, 'not-encoded-by-p2-p3');
  assert.equal(capsule.watermark.sequence, state.provenance.watermark.sequence);
  assert.equal(JSON.stringify(state), before);
});

test('rendering is deterministic and reports exact UTF-8 byte size', () => {
  const { p4 } = loadPsm();
  const first = p4.renderRestartCapsule(richState(), project());
  const second = p4.renderRestartCapsule(richState(), project());
  assert.equal(first.serialized, second.serialized);
  assert.equal(first.byteLength, p4.utf8ByteLength(first.serialized));
  assert.equal(first.serialized, JSON.stringify(first.capsule));
});

test('parse/render round trip preserves the validated capsule exactly', () => {
  const { p4 } = loadPsm();
  const rendered = p4.renderRestartCapsule(richState(), project());
  assert.deepEqual(JSON.parse(JSON.stringify(p4.parseRestartCapsule(rendered.serialized))), JSON.parse(rendered.serialized));
});

test('metadata and unknown top-level or nested fields fail closed', () => {
  const { p4 } = loadPsm();
  const capsule = p4.buildRestartCapsule(richState(), project());
  assert.throws(() => p4.buildRestartCapsule(richState(), { ...project(), extra: true }), /invalid-project-metadata/);
  const extra = JSON.parse(JSON.stringify(capsule));
  extra.extra = true;
  assert.throws(() => p4.validateRestartCapsule(extra), /unknown-capsule-field/);
  const nested = JSON.parse(JSON.stringify(capsule));
  nested.tasks[0].selection.extra = true;
  assert.throws(() => p4.validateRestartCapsule(nested), /invalid-selection-reason/);
});

test('malformed, truncated, forged, and arbitrary working-set inputs fail closed', () => {
  const { p4 } = loadPsm();
  assert.throws(() => p4.parseRestartCapsule('{"schemaVersion":1'), /malformed-serialized-capsule/);
  assert.throws(() => p4.parseRestartCapsule('[]'), /unknown-capsule-field/);
  const capsule = p4.buildRestartCapsule(richState(), project());
  const forged = JSON.parse(JSON.stringify(capsule));
  forged.tasks = null;
  assert.throws(() => p4.validateRestartCapsule(forged), /invalid-selected-collection/);
  assert.throws(() => p4.validateRestartCapsule({ ...capsule, acceptedEvents: {} }), /unknown-capsule-field/);
});

test('P2/P3 validation rejects forged canonical state before capsule construction', () => {
  const { p4 } = loadPsm();
  const state = richState();
  state.goal.goal = 'forged';
  assert.throws(() => p4.buildRestartCapsule(state, project()), /canonical-state-does-not-match-replay/);
});

test('mandatory facts are not silently truncated and explicit byte overflow fails closed', () => {
  const { p4 } = loadPsm();
  const rendered = p4.renderRestartCapsule(richState(), project());
  assert.throws(() => p4.renderRestartCapsule(richState(), project(), { maxBytes: rendered.byteLength - 1 }), /capsule-exceeds-byte-budget/);
  assert.equal(p4.renderRestartCapsule(richState(), project(), { maxBytes: rendered.byteLength }).serialized, rendered.serialized);
  assert.throws(() => p4.renderRestartCapsule(richState(), project(), { maxBytes: 0 }), /invalid-byte-budget/);
});

test('literal internal-looking text remains ordinary domain text and no archive field exists', () => {
  const { p4 } = loadPsm();
  const capsule = p4.buildRestartCapsule(richState(), project());
  assert.match(capsule.goal.fact.goal, /acceptedEvents/);
  assert.match(capsule.goal.fact.goal, /context_digest/);
  assert.match(capsule.goal.fact.goal, /parent_digest/);
  assert.match(capsule.constraints[0].fact.text, /acceptedEvents/);
  assert.match(capsule.messages[0].fact.body, /parent_digest/);
  assert.equal(Object.prototype.hasOwnProperty.call(capsule, 'acceptedEvents'), false);
});

test('nested archive fields are rejected while literal text remains valid', () => {
  const { p4 } = loadPsm();
  const capsule = p4.buildRestartCapsule(richState(), project());
  const slots = [
    (copy) => copy.goal,
    (copy) => copy.tasks[0],
    (copy) => copy.messages[0],
    (copy) => copy.constraints[0],
    (copy) => copy.evidence[0],
  ];
  for (const locate of slots) {
    const forged = JSON.parse(JSON.stringify(capsule));
    const target = locate(forged);
    target.fact.acceptedEvents = {};
    assert.throws(() => p4.validateRestartCapsule(forged), /unknown-fact-field/);
  }
});

test('selection reason codes and relationship values cannot be forged', () => {
  const { p4 } = loadPsm();
  const capsule = p4.buildRestartCapsule(richState(), project());
  const cases = [
    (copy) => { copy.goal.selection.code = 'dependency-closure'; },
    (copy) => { copy.tasks[0].selection.code = 'made-up'; },
    (copy) => { copy.messages[0].selection.via = 'message:M-1'; },
    (copy) => { copy.operatorDecisions[0].selection.via = 'task:T-1'; },
  ];
  for (const mutate of cases) {
    const forged = JSON.parse(JSON.stringify(capsule));
    mutate(forged);
    assert.throws(() => p4.validateRestartCapsule(forged), /selection-reason/);
  }
});

test('wrapper IDs are bound to typed fact identities and selected IDs are unique', () => {
  const { p4 } = loadPsm();
  const capsule = p4.buildRestartCapsule(richState(), project());
  const cases = [
    (copy) => { copy.goal.id = 'wrong-goal'; },
    (copy) => { copy.frontier.id = 'wrong-frontier'; },
    (copy) => { copy.constraints[0].id = 'wrong-constraint'; },
    (copy) => { copy.tasks[0].id = 'wrong-task'; },
    (copy) => { copy.messages[0].id = 'wrong-message'; },
    (copy) => { copy.operatorDecisions[0].id = 'wrong-decision'; },
    (copy) => { copy.evidence[0].id = 'wrong-evidence'; },
  ];
  for (const mutate of cases) {
    const forged = JSON.parse(JSON.stringify(capsule));
    mutate(forged);
    assert.throws(() => p4.parseRestartCapsule(JSON.stringify(forged)), /wrapper-fact-identity-mismatch/);
  }
  const duplicate = JSON.parse(JSON.stringify(capsule));
  duplicate.tasks.push(JSON.parse(JSON.stringify(duplicate.tasks[0])));
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(duplicate)), /duplicate-selected-fact-id/);
});

test('selected fact types require their exact establishing event kinds', () => {
  const { p4 } = loadPsm();
  const capsule = p4.buildRestartCapsule(richState(), project());
  const cases = [
    (copy) => { copy.goal.fact.establishedBy.kind = 'frontier.changed'; },
    (copy) => { copy.frontier.fact.establishedBy.kind = 'goal.changed'; },
    (copy) => { copy.constraints[0].fact.establishedBy.kind = 'goal.changed'; },
    (copy) => { copy.tasks[0].fact.establishedBy.kind = 'goal.changed'; },
    (copy) => { copy.messages[0].fact.establishedBy.kind = 'goal.changed'; },
    (copy) => { copy.operatorDecisions[0].fact.establishedBy.kind = 'goal.changed'; },
    (copy) => { copy.evidence[0].fact.establishedBy.kind = 'goal.changed'; },
    (copy) => {
      copy.artifacts = [{
        id: 'A-1',
        fact: {
          artifactId: 'A-1', kind: 'report', title: 'artifact',
          digest: `sha256:${'2'.repeat(64)}`,
          establishedBy: { ...copy.goal.fact.establishedBy, kind: 'goal.changed' },
        },
        selection: { code: 'artifact', via: null },
      }];
    },
  ];
  for (const mutate of cases) {
    const forged = JSON.parse(JSON.stringify(capsule));
    mutate(forged);
    assert.throws(() => p4.parseRestartCapsule(JSON.stringify(forged)), /invalid-establishing-event-kind/);
  }
});

test('P1 source and provenance vocabularies are enforced for selected facts', () => {
  const { p4 } = loadPsm();
  const capsule = p4.buildRestartCapsule(richState(), project());
  const unauthorized = JSON.parse(JSON.stringify(capsule));
  unauthorized.operatorDecisions[0].fact.establishedBy.source.kind = 'runtime';
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(unauthorized)), /invalid-source-vocabulary/);
  const invalidSource = JSON.parse(JSON.stringify(capsule));
  invalidSource.goal.fact.establishedBy.source.kind = 'not-a-source';
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(invalidSource)), /invalid-source-vocabulary/);
  const invalidProvenance = JSON.parse(JSON.stringify(capsule));
  invalidProvenance.goal.fact.establishedBy.provenance[0].kind = 'not-a-provenance-kind';
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(invalidProvenance)), /invalid-provenance-vocabulary/);
});

test('establishedBy metadata remains P1-attainable', () => {
  const { p4 } = loadPsm();
  const capsule = p4.buildRestartCapsule(richState(), project());
  const invalidEventId = JSON.parse(JSON.stringify(capsule));
  invalidEventId.goal.fact.establishedBy.eventId = 'event id with spaces';
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(invalidEventId)), /invalid-event-id/);
  const invalidSourceId = JSON.parse(JSON.stringify(capsule));
  invalidSourceId.goal.fact.establishedBy.source.id = 'source id with spaces';
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(invalidSourceId)), /invalid-source-id/);
  const emptyProvenance = JSON.parse(JSON.stringify(capsule));
  emptyProvenance.goal.fact.establishedBy.provenance = [];
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(emptyProvenance)), /provenance-required/);
  const duplicateProvenance = JSON.parse(JSON.stringify(capsule));
  duplicateProvenance.goal.fact.establishedBy.provenance.push(JSON.parse(JSON.stringify(duplicateProvenance.goal.fact.establishedBy.provenance[0])));
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(duplicateProvenance)), /duplicate-provenance/);
  const zeroTime = JSON.parse(JSON.stringify(capsule));
  zeroTime.goal.fact.establishedBy.at = 0;
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(zeroTime)), /invalid-event-time/);
  const fractionalTime = JSON.parse(JSON.stringify(capsule));
  fractionalTime.goal.fact.establishedBy.at = 1.5;
  fractionalTime.watermark.at = 999;
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(fractionalTime)), /invalid-event-time/);
  const overlongRef = JSON.parse(JSON.stringify(capsule));
  overlongRef.goal.fact.establishedBy.provenance[0].ref = 'r'.repeat(513);
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(overlongRef)), /invalid-provenance-vocabulary/);
  const controlRef = JSON.parse(JSON.stringify(capsule));
  controlRef.goal.fact.establishedBy.provenance[0].ref = 'report\u0001ref';
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(controlRef)), /invalid-provenance-vocabulary/);
  const invalidSupersedes = JSON.parse(JSON.stringify(capsule));
  invalidSupersedes.goal.fact.establishedBy.supersedes = 'not a valid id';
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(invalidSupersedes)), /invalid-supersession-reference/);
  const selfSupersedes = JSON.parse(JSON.stringify(capsule));
  selfSupersedes.goal.fact.establishedBy.supersedes = selfSupersedes.goal.fact.establishedBy.eventId;
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(selfSupersedes)), /invalid-supersession-reference/);
  const invalidConflict = JSON.parse(JSON.stringify(capsule));
  invalidConflict.goal.fact.establishedBy.conflictsWith = ['not a valid id'];
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(invalidConflict)), /invalid-conflict-reference/);
  const duplicateConflict = JSON.parse(JSON.stringify(capsule));
  duplicateConflict.goal.fact.establishedBy.conflictsWith = ['prior-event', 'prior-event'];
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(duplicateConflict)), /duplicate-conflict-reference/);
  const selfConflict = JSON.parse(JSON.stringify(capsule));
  selfConflict.goal.fact.establishedBy.conflictsWith = [selfConflict.goal.fact.establishedBy.eventId];
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(selfConflict)), /invalid-conflict-reference/);
});

test('watermark is a lower bound for selected facts but may refer to an omitted latest event', () => {
  const { p4 } = loadPsm();
  const capsule = p4.buildRestartCapsule(richState(), project());
  const sequenceRegression = JSON.parse(JSON.stringify(capsule));
  sequenceRegression.watermark.sequence = 0;
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(sequenceRegression)), /watermark-before-selected-fact/);
  const timeRegression = JSON.parse(JSON.stringify(capsule));
  timeRegression.watermark.at = 0;
  assert.throws(() => p4.parseRestartCapsule(JSON.stringify(timeRegression)), /watermark-before-selected-fact/);
  const omittedLatest = JSON.parse(JSON.stringify(capsule));
  omittedLatest.watermark = {
    sequence: capsule.watermark.sequence + 1,
    eventId: 'latest-event-omitted-from-working-set',
    at: capsule.watermark.at + 1,
  };
  assert.equal(JSON.stringify(p4.parseRestartCapsule(JSON.stringify(omittedLatest))), JSON.stringify(omittedLatest));
});
