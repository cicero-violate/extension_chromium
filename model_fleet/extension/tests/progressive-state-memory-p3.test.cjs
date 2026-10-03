const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

function loadPsm() {
  const context = { globalThis: null };
  context.globalThis = context;
  for (const file of ['progressive-state-memory-m7-p1.js', 'progressive-state-memory-m7-p2.js', 'progressive-state-memory-m7-p3.js']) {
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context, { filename: file });
  }
  return { p1: context.ProgressiveStateMemoryM7P1, p2: context.ProgressiveStateMemoryM7P2, p3: context.ProgressiveStateMemoryM7P3 };
}

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

function makeEvent(kind, payload, at, sourceKind = 'runtime', eventId = `${kind}-${at}`) {
  const sourceId = sourceKind === 'operator' ? 'operator-1' : 'runtime-1';
  return {
    eventId,
    sequence: 1,
    at,
    kind,
    source: { kind: sourceKind, id: sourceId },
    provenance: [{ kind: sourceKind, ref: `${sourceKind}:${sourceId}`, digest: `sha256:${String(at).padStart(64, '0')}` }],
    payload,
    supersedes: null,
    conflictsWith: [],
  };
}

function task(taskId, phase, dependencies = [], overrides = {}) {
  return {
    taskId,
    title: taskId,
    role: 'implementation',
    phase,
    blocker: phase === 'blocked' ? 'blocked reason' : null,
    result: phase === 'done' ? 'done' : null,
    ownerWorkerId: null,
    dependencies,
    priority: 1,
    ...overrides,
  };
}

function buildState(p1, p2, specs) {
  let ledger = p1.emptyLedger();
  for (const spec of specs) {
    const next = ledger.nextSequence;
    ledger = p1.admitEvent(ledger, { ...spec.event, sequence: next }).ledger;
  }
  return { ledger, state: p2.reduceLedger(ledger) };
}

test('P3 is isolated, browser-compatible, and has no later-node/runtime authority', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'progressive-state-memory-m7-p3.js'), 'utf8');
  assert.doesNotMatch(source, /require\(|module\.exports|chrome\.|Date\.now|Math\.random|chrome\.storage|schedule\(|loadFleetState\(/);
  assert.match(source, /ProgressiveStateMemoryM7P2/);
  const { p3 } = loadPsm();
  assert.equal(p3.SCHEMA_VERSION, 1);
});

test('working set preserves goal, frontier, active constraints, blockers, and dependency closure', () => {
  const { p1, p2, p3 } = loadPsm();
  const specs = [
    { event: makeEvent('goal.changed', { goal: 'ship' }, 100, 'operator', 'goal-1') },
    { event: makeEvent('frontier.changed', { frontierKey: 'T-active', state: 'open', summary: 'work' }, 110, 'runtime', 'frontier-1') },
    { event: makeEvent('constraint.accepted', { constraintId: 'C-1', text: 'preserve authority', state: 'active' }, 120, 'operator', 'constraint-1') },
    { event: makeEvent('constraint.accepted', { constraintId: 'C-2', text: 'old', state: 'satisfied' }, 130, 'operator', 'constraint-2') },
    { event: makeEvent('task.accepted', task('T-done', 'done'), 140, 'runtime', 'task-done') },
    { event: makeEvent('task.accepted', task('T-active', 'active', ['T-done']), 150, 'runtime', 'task-active') },
    { event: makeEvent('task.accepted', task('T-blocked', 'blocked'), 160, 'runtime', 'task-blocked') },
    { event: makeEvent('task.accepted', task('T-unrelated', 'done'), 170, 'runtime', 'task-unrelated') },
  ];
  const { state } = buildState(p1, p2, specs);
  const selected = p3.selectActiveWorkingSet(state);
  assert.equal(selected.goal.selection.code, 'current-goal');
  assert.equal(selected.frontier.selection.code, 'current-frontier');
  assert.deepEqual(plain(selected.constraints.map((entry) => entry.id)), ['C-1']);
  assert.deepEqual(plain(selected.tasks.map((entry) => entry.id)), ['T-active', 'T-blocked', 'T-done']);
  assert.equal(selected.tasks.find((entry) => entry.id === 'T-done').selection.code, 'dependency-closure');
  assert.equal(selected.tasks.find((entry) => entry.id === 'T-blocked').fact.blocker, 'blocked reason');
  assert.equal(selected.tasks.some((entry) => entry.id === 'T-unrelated'), false);
});

test('missing and cyclic dependency closure fails closed', () => {
  const { p1, p2, p3 } = loadPsm();
  const missing = buildState(p1, p2, [{ event: makeEvent('task.accepted', task('T-1', 'active', ['MISSING']), 100, 'runtime', 'task-1') }]).state;
  assert.throws(() => p3.selectActiveWorkingSet(missing), /missing-task-dependency/);
  const cyclic = buildState(p1, p2, [
    { event: makeEvent('task.accepted', task('T-1', 'active', ['T-2']), 100, 'runtime', 'task-1') },
    { event: makeEvent('task.accepted', task('T-2', 'active', ['T-1']), 110, 'runtime', 'task-2') },
  ]).state;
  assert.throws(() => p3.selectActiveWorkingSet(cyclic), /cyclic-task-dependency/);
});

test('nonterminal messages and only explicit target/subject relations are selected', () => {
  const { p1, p2, p3 } = loadPsm();
  const specs = [
    { event: makeEvent('goal.changed', { goal: 'acceptedEvents is valid goal text' }, 100, 'operator', 'goal-1') },
    { event: makeEvent('frontier.changed', { frontierKey: 'frontier', state: 'open', summary: '' }, 110, 'runtime', 'frontier-1') },
    { event: makeEvent('task.accepted', task('T-1', 'active'), 120, 'runtime', 'task-1') },
    { event: makeEvent('task.accepted', task('T-done', 'done'), 130, 'runtime', 'task-done') },
    { event: makeEvent('constraint.accepted', { constraintId: 'C-1', text: 'acceptedEvents is valid constraint text', state: 'active' }, 140, 'operator', 'constraint-1') },
    { event: makeEvent('constraint.accepted', { constraintId: 'C-done', text: 'old', state: 'satisfied' }, 150, 'operator', 'constraint-done') },
    { event: makeEvent('message.accepted', { messageId: 'M-1', from: 'W-1', to: 'operator', body: 'acceptedEvents is valid message text', phase: 'queued' }, 160, 'runtime', 'message-1') },
    { event: makeEvent('message.accepted', { messageId: 'M-done', from: 'W-1', to: 'operator', body: 'done', phase: 'done' }, 170, 'runtime', 'message-done') },
    { event: makeEvent('operator.decision', { decisionId: 'D-task', decision: 'inspect', targetType: 'task', targetId: 'T-1' }, 180, 'operator', 'decision-task') },
    { event: makeEvent('operator.decision', { decisionId: 'D-done', decision: 'ignore', targetType: 'task', targetId: 'T-done' }, 190, 'operator', 'decision-done') },
    { event: makeEvent('operator.decision', { decisionId: 'D-goal', decision: 'continue', targetType: 'goal', targetId: 'goal' }, 200, 'operator', 'decision-goal') },
    { event: makeEvent('operator.decision', { decisionId: 'D-frontier', decision: 'work', targetType: 'frontier', targetId: 'frontier' }, 210, 'operator', 'decision-frontier') },
    { event: makeEvent('operator.decision', { decisionId: 'D-missing', decision: 'bad', targetType: 'task', targetId: 'missing' }, 220, 'operator', 'decision-missing') },
    { event: makeEvent('evidence.linked', { evidenceId: 'E-task', subjectType: 'task', subjectId: 'T-1', ref: 'task.txt', digest: `sha256:${'1'.repeat(64)}` }, 230, 'runtime', 'evidence-task') },
    { event: makeEvent('evidence.linked', { evidenceId: 'E-done', subjectType: 'task', subjectId: 'T-done', ref: 'done.txt', digest: `sha256:${'2'.repeat(64)}` }, 240, 'runtime', 'evidence-done') },
    { event: makeEvent('evidence.linked', { evidenceId: 'E-goal', subjectType: 'goal', subjectId: 'goal', ref: 'goal.txt', digest: `sha256:${'3'.repeat(64)}` }, 250, 'runtime', 'evidence-goal') },
    { event: makeEvent('evidence.linked', { evidenceId: 'E-missing', subjectType: 'task', subjectId: 'missing', ref: 'missing.txt', digest: `sha256:${'4'.repeat(64)}` }, 260, 'runtime', 'evidence-missing') },
    { event: makeEvent('artifact.accepted', { artifactId: 'A-1', kind: 'report', title: 'recent but unrelated', digest: `sha256:${'5'.repeat(64)}` }, 270, 'runtime', 'artifact-1') },
  ];
  const selected = p3.selectActiveWorkingSet(buildState(p1, p2, specs).state);
  assert.deepEqual(plain(selected.messages.map((entry) => entry.id)), ['M-1']);
  assert.deepEqual(plain(selected.operatorDecisions.map((entry) => entry.id)), ['D-frontier', 'D-goal', 'D-task']);
  assert.deepEqual(plain(selected.evidence.map((entry) => entry.id)), ['E-goal', 'E-task']);
  assert.deepEqual(plain(selected.artifacts), []);
  assert.equal(selected.operatorDecisions.find((entry) => entry.id === 'D-task').selection.via, 'task:T-1');
  assert.equal(selected.goal.fact.goal, 'acceptedEvents is valid goal text');
  assert.equal(selected.constraints[0].fact.text, 'acceptedEvents is valid constraint text');
  assert.equal(selected.messages[0].fact.body, 'acceptedEvents is valid message text');
});

test('invalid P2 state is rejected, output is deterministic, immutable, and watermark-bound', () => {
  const { p1, p2, p3 } = loadPsm();
  const { state } = buildState(p1, p2, [
    { event: makeEvent('goal.changed', { goal: 'goal' }, 100, 'operator', 'goal-1') },
    { event: makeEvent('task.accepted', task('T-1', 'active'), 110, 'runtime', 'task-1') },
  ]);
  const before = JSON.stringify(state);
  const first = p3.selectActiveWorkingSet(state);
  const second = p3.selectActiveWorkingSet(plain(state));
  assert.deepEqual(plain(first), plain(second));
  assert.equal(first.watermark.sequence, state.provenance.watermark.sequence);
  assert.equal(first.watermark.eventId, state.provenance.watermark.eventId);
  assert.deepEqual(Object.keys(first).sort(), ['artifacts', 'constraints', 'evidence', 'frontier', 'goal', 'messages', 'operatorDecisions', 'schemaVersion', 'selectorVersion', 'tasks', 'watermark']);
  assert.equal(JSON.stringify(state), before);
  const forged = plain(state);
  forged.goal.goal = 'forged';
  assert.throws(() => p3.selectActiveWorkingSet(forged), /canonical-state-does-not-match-replay/);
  const unknown = plain(state);
  unknown.unauthorized = true;
  assert.throws(() => p3.selectActiveWorkingSet(unknown), /unknown-canonical-state-field/);
});
