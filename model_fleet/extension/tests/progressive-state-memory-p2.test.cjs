const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

function loadPsm() {
  const context = { globalThis: null };
  context.globalThis = context;
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'progressive-state-memory-m7-p1.js'), 'utf8'), context, { filename: 'progressive-state-memory-m7-p1.js' });
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'progressive-state-memory-m7-p2.js'), 'utf8'), context, { filename: 'progressive-state-memory-m7-p2.js' });
  return { p1: context.ProgressiveStateMemoryM7P1, p2: context.ProgressiveStateMemoryM7P2 };
}

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

function event(overrides = {}) {
  return {
    eventId: 'evt-1',
    sequence: 1,
    at: 100,
    kind: 'goal.changed',
    source: { kind: 'operator', id: 'operator-1' },
    provenance: [{ kind: 'operator', ref: 'operator:operator-1', digest: `sha256:${'a'.repeat(64)}` }],
    payload: { goal: 'initial goal' },
    supersedes: null,
    conflictsWith: [],
    ...overrides,
  };
}

function append(p1, ledger, input) {
  return p1.admitEvent(ledger, input).ledger;
}

function eventSource(kind) {
  return kind === 'operator.decision' || kind === 'goal.changed' || kind === 'constraint.accepted'
    ? { kind: 'operator', id: 'operator-1' }
    : { kind: 'runtime', id: 'runtime-1' };
}

test('P2 is browser-compatible, isolated, and exposes one reducer boundary', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'progressive-state-memory-m7-p2.js'), 'utf8');
  assert.doesNotMatch(source, /require\(|module\.exports|chrome\.|Date\.now|Math\.random/);
  const { p2 } = loadPsm();
  assert.deepEqual(plain(p2.emptyState()), {
    schemaVersion: 1,
    reducerVersion: 1,
    goal: null,
    frontier: null,
    tasks: {},
    constraints: {},
    artifacts: {},
    evidence: {},
    messages: {},
    operatorDecisions: {},
    provenance: { watermark: { sequence: 0, eventId: null, at: 0 }, acceptedEvents: {} },
  });
});

test('reduction covers every P1 kind and preserves current facts plus provenance', () => {
  const { p1, p2 } = loadPsm();
  let ledger = p1.emptyLedger();
  const inputs = [
    event({ eventId: 'goal-1', kind: 'goal.changed', at: 100, payload: { goal: 'ship PSM' } }),
    event({ eventId: 'frontier-1', sequence: 2, kind: 'frontier.changed', at: 110, source: eventSource('frontier.changed'), payload: { frontierKey: 'task:T-1', state: 'open', summary: 'implement reducer' } }),
    event({ eventId: 'task-1', sequence: 3, kind: 'task.accepted', at: 120, source: eventSource('task.accepted'), payload: { taskId: 'T-1', title: 'Reducer', role: 'implementation', phase: 'pending', blocker: null, result: null, ownerWorkerId: null, dependencies: [], priority: 1 } }),
    event({ eventId: 'message-1', sequence: 4, kind: 'message.accepted', at: 130, source: eventSource('message.accepted'), payload: { messageId: 'M-1', from: 'operator', to: 'W-1', body: 'work', phase: 'queued' } }),
    event({ eventId: 'constraint-1', sequence: 5, kind: 'constraint.accepted', at: 140, payload: { constraintId: 'C-1', text: 'no live writes', state: 'active' } }),
    event({ eventId: 'artifact-1', sequence: 6, kind: 'artifact.accepted', at: 150, source: eventSource('artifact.accepted'), payload: { artifactId: 'A-1', kind: 'report', title: 'P2 report', digest: `sha256:${'b'.repeat(64)}` } }),
    event({ eventId: 'evidence-1', sequence: 7, kind: 'evidence.linked', at: 160, source: eventSource('evidence.linked'), payload: { evidenceId: 'E-1', subjectType: 'task', subjectId: 'T-1', ref: 'docs/p2.md', digest: `sha256:${'c'.repeat(64)}` } }),
    event({ eventId: 'decision-1', sequence: 8, kind: 'operator.decision', at: 170, payload: { decisionId: 'D-1', decision: 'accept', targetType: 'task', targetId: 'T-1' } }),
  ];
  for (const input of inputs) ledger = append(p1, ledger, input);
  const state = p2.reduceLedger(ledger);
  assert.equal(state.goal.goal, 'ship PSM');
  assert.equal(state.frontier.frontierKey, 'task:T-1');
  assert.equal(state.tasks['T-1'].taskId, 'T-1');
  assert.equal(state.messages['M-1'].phase, 'queued');
  assert.equal(state.constraints['C-1'].state, 'active');
  assert.equal(state.artifacts['A-1'].digest, `sha256:${'b'.repeat(64)}`);
  assert.equal(state.evidence['E-1'].subjectId, 'T-1');
  assert.equal(state.operatorDecisions['D-1'].decision, 'accept');
  assert.equal(state.provenance.watermark.sequence, 8);
  assert.equal(state.provenance.watermark.eventId, 'decision-1');
  assert.equal(state.tasks['T-1'].establishedBy.eventId, 'task-1');
  assert.equal(state.provenance.acceptedEvents['decision-1'].source.kind, 'operator');
});

test('semantic payload contracts fail closed before state changes', () => {
  const { p1, p2 } = loadPsm();
  const cases = [
    event({ kind: 'goal.changed', payload: { goal: 42 } }),
    event({ kind: 'frontier.changed', payload: { frontierKey: 'f', state: 'unknown', summary: '' } }),
    event({ kind: 'task.accepted', payload: { taskId: 'T-1' } }),
    event({ kind: 'message.accepted', payload: { messageId: 'M-1', from: 'a', to: 'b', body: 'x', phase: 'unknown' } }),
    event({ kind: 'artifact.accepted', payload: { artifactId: 'A-1', kind: 'report', title: 'x', digest: 'not-a-digest' } }),
    event({ kind: 'operator.decision', payload: { decisionId: 'D-1', decision: 'accept', targetType: 'unknown', targetId: 'T-1' } }),
    event({ kind: 'goal.changed', payload: { goal: 'ok', extra: true } }),
  ];
  for (const candidate of cases) {
    const ledger = append(p1, p1.emptyLedger(), candidate);
    assert.throws(() => p2.reduceLedger(ledger), /PSM P2 rejected/);
  }
});

test('replay is deterministic and equivalent histories produce equivalent state', () => {
  const { p1, p2 } = loadPsm();
  const first = event({ eventId: 'goal-1', payload: { goal: 'same' } });
  const second = event({ eventId: 'frontier-1', sequence: 2, at: 110, kind: 'frontier.changed', source: eventSource('frontier.changed'), payload: { frontierKey: 'f', state: 'quiescent', summary: '' } });
  const ledger = append(p1, append(p1, p1.emptyLedger(), first), second);
  const cloneLedger = plain(ledger);
  assert.deepEqual(plain(p2.reduceLedger(ledger)), plain(p2.reduceLedger(cloneLedger)));
  assert.deepEqual(plain(p2.reduceLedger(ledger)), plain(p2.reduceLedger(ledger)));
});

test('state and event inputs remain immutable and unvalidated input is rejected', () => {
  const { p1, p2 } = loadPsm();
  const ledger = append(p1, p1.emptyLedger(), event());
  const ledgerBefore = JSON.stringify(ledger);
  const state = p2.reduceLedger(ledger);
  const stateBefore = JSON.stringify(state);
  const next = p2.reduceEvent(state, event({ eventId: 'evt-2', sequence: 2, at: 110 }));
  assert.equal(JSON.stringify(ledger), ledgerBefore);
  assert.equal(JSON.stringify(state), stateBefore);
  assert.notDeepEqual(next, state);
  assert.throws(() => p2.reduceLedger({ ...ledger, nextSequence: 99 }), /invalid-ledger-sequence/);
  assert.throws(() => p2.reduceEvent(state, { ...ledger.events[0], sequence: 3, eventId: 'bad' }), /PSM P[12] rejected/);
});

test('forged materialized facts and unknown canonical fields fail closed', () => {
  const { p1, p2 } = loadPsm();
  let ledger = p1.emptyLedger();
  ledger = append(p1, ledger, event({ eventId: 'goal-1', payload: { goal: 'canonical' } }));
  ledger = append(p1, ledger, event({ eventId: 'frontier-1', sequence: 2, at: 110, kind: 'frontier.changed', source: eventSource('frontier.changed'), payload: { frontierKey: 'f', state: 'open', summary: '' } }));
  ledger = append(p1, ledger, event({ eventId: 'task-1', sequence: 3, at: 120, kind: 'task.accepted', source: eventSource('task.accepted'), payload: { taskId: 'T-1', title: 'Task', role: 'implementation', phase: 'pending', blocker: null, result: null, ownerWorkerId: null, dependencies: [], priority: 1 } }));
  const state = p2.reduceLedger(ledger);
  const forgedGoal = plain(state);
  forgedGoal.goal.goal = 'FORGED';
  const forgedFrontier = plain(state);
  forgedFrontier.frontier.state = 'complete';
  const forgedTask = plain(state);
  forgedTask.tasks['T-1'].title = 'FORGED';
  for (const forged of [forgedGoal, forgedFrontier, forgedTask]) {
    assert.throws(() => p2.validateState(forged), /canonical-state-does-not-match-replay/);
    assert.throws(() => p2.reduceEvent(forged, event({ eventId: 'next', sequence: 4, at: 130 })), /canonical-state-does-not-match-replay/);
  }
  for (const forged of [
    { ...plain(state), unauthorized: true },
    { ...plain(state), provenance: { ...plain(state.provenance), unauthorized: true } },
    { ...plain(state), provenance: { ...plain(state.provenance), watermark: { ...plain(state.provenance.watermark), unauthorized: true } } },
    { ...plain(state), tasks: { ...plain(state.tasks), 'T-1': { ...plain(state.tasks['T-1']), unauthorized: true } } },
  ]) assert.throws(() => p2.validateState(forged), /unknown-canonical-state-field|invalid-canonical-provenance|canonical-state-does-not-match-replay/);
});

test('incremental reduction from a valid state equals full replay after every event', () => {
  const { p1, p2 } = loadPsm();
  let ledger = p1.emptyLedger();
  let incremental = p2.emptyState();
  const events = [
    event({ eventId: 'goal-1', payload: { goal: 'goal' } }),
    event({ eventId: 'task-1', sequence: 2, at: 110, kind: 'task.accepted', source: eventSource('task.accepted'), payload: { taskId: 'T-1', title: 'Task', role: 'implementation', phase: 'pending', blocker: null, result: null, ownerWorkerId: null, dependencies: [], priority: 1 } }),
    event({ eventId: 'blocked-1', sequence: 3, at: 120, kind: 'task.blocked', source: eventSource('task.blocked'), payload: { taskId: 'T-1', blocker: 'wait' } }),
  ];
  for (const candidate of events) {
    ledger = append(p1, ledger, candidate);
    incremental = p2.reduceEvent(incremental, ledger.events[ledger.events.length - 1]);
    assert.deepEqual(plain(incremental), plain(p2.reduceLedger(ledger)));
  }
});

test('replacement/current-value semantics retain supersession and conflict metadata', () => {
  const { p1, p2 } = loadPsm();
  let ledger = p1.emptyLedger();
  ledger = append(p1, ledger, event({ eventId: 'task-1', kind: 'task.accepted', source: eventSource('task.accepted'), payload: { taskId: 'T-1', title: 'Task', role: 'implementation', phase: 'pending', blocker: null, result: null, ownerWorkerId: null, dependencies: [], priority: 1 } }));
  ledger = append(p1, ledger, event({ eventId: 'blocked-1', sequence: 2, at: 110, kind: 'task.blocked', source: eventSource('task.blocked'), payload: { taskId: 'T-1', blocker: 'waiting' }, supersedes: 'task-1', conflictsWith: ['task-1'] }));
  ledger = append(p1, ledger, event({ eventId: 'complete-1', sequence: 3, at: 120, kind: 'task.completed', source: eventSource('task.completed'), payload: { taskId: 'T-1', result: 'done' }, supersedes: 'blocked-1' }));
  const state = p2.reduceLedger(ledger);
  assert.equal(state.tasks['T-1'].phase, 'done');
  assert.equal(state.tasks['T-1'].result, 'done');
  assert.equal(state.tasks['T-1'].establishedBy.eventId, 'complete-1');
  assert.equal(state.provenance.acceptedEvents['blocked-1'].conflictsWith[0], 'task-1');
  assert.equal(state.provenance.acceptedEvents['complete-1'].supersedes, 'blocked-1');
  assert.throws(() => p2.reduceLedger(append(p1, p1.emptyLedger(), event({ kind: 'task.completed', source: eventSource('task.completed'), payload: { taskId: 'missing', result: 'x' } }))), /task-not-established/);
});

test('P2 does not implement later nodes or a second authority', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'progressive-state-memory-m7-p2.js'), 'utf8');
  assert.doesNotMatch(source, /chrome\.storage|Date\.now|schedule\(|loadFleetState\(/);
  assert.match(source, /ProgressiveStateMemoryM7P1/);
});
