'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'background.js'), 'utf8');

function section(startText, endText) {
  const start = source.indexOf(startText);
  const end = source.indexOf(endText, start + startText.length);
  assert.ok(start >= 0, 'missing start: ' + startText);
  assert.ok(end > start, 'missing end: ' + endText);
  return source.slice(start, end);
}

function continuationHarness() {
  const queueMessage = section('function queueSemanticMessage', 'function compactFleetFingerprint');
  const continuation = section('function compactFleetFingerprint', 'function queueWorkerControlNotice');
  const context = {
    journal: [],
    result: null,
  };
  vm.runInNewContext(`
    const MAX_MESSAGES = 500;
    function now() { return 1000; }
    function canonicalRole(role) { return String(role || '').trim().toLowerCase(); }
    function appendJournal(state, type, message, details) {
      state.journal.push({ type, message, details });
    }
    ${queueMessage}
    ${continuation}
    result = { queueGoalContinuationIfNeeded, queueSemanticMessage };
  `, context);
  return context.result;
}

function quietState(overrides = {}) {
  return {
    goal: 'finish the bounded integration',
    policy: { paused: false, authorityEnabled: true },
    workers: {
      'W-C1': {
        id: 'W-C1',
        enabled: true,
        role: 'coordinator',
        tabId: 42,
        lifecycle: 'warm-idle',
        status: 'idle',
        currentAssignmentId: null,
      },
    },
    tasks: {},
    messages: [],
    nextMessage: 1,
    journal: [],
    lastGoalContinuationKey: '',
    ...overrides,
  };
}

test('a configured fleet goal has bounded quiescent continuation custody', () => {
  const state = section('function freshFleetState', 'function normalizeFleetState');
  assert.match(state, /lastGoalContinuationKey: ''/);
  const helper = section('function goalFrontierKey', 'function queueWorkerControlNotice');
  assert.match(helper, /goalContinuation !== true/);
  assert.match(helper, /message\.toWorkerId !== 'operator'/);
  assert.match(helper, /queueGoalContinuationIfNeeded/);
  assert.match(helper, /canonicalRole\(worker\.role\) === 'coordinator'/);
  assert.match(helper, /goalContinuation: true/);
  assert.match(helper, /lastGoalContinuationKey/);
  assert.match(helper, /GOAL CONTINUATION/);
});

test('quiescent scheduler wakes Coordinator once for a changed goal frontier', () => {
  const scheduler = section('async function schedule()', 'async function scheduleMessageUntilAdmitted');
  assert.match(scheduler, /!hasQueuedMessage && !hasRunnableTask && !hasControlWork/);
  assert.match(scheduler, /active === 0/);
  assert.match(scheduler, /queueGoalContinuationIfNeeded/);
  assert.match(scheduler, /schedulePending = true/);
});

test('saving a goal clears prior continuation fingerprint and kicks scheduler', () => {
  const handler = section("if (message.type === 'fleet:set-goal')", "if (message.type === 'fleet:create-task')");
  assert.match(handler, /state\.lastGoalContinuationKey = ''/);
  assert.match(handler, /schedule\(\)\.catch/);
});

test('continuation decision queues once, records custody, and suppresses an unchanged frontier', () => {
  const { queueGoalContinuationIfNeeded } = continuationHarness();
  const state = quietState();

  const first = queueGoalContinuationIfNeeded(state);
  assert.ok(first);
  assert.equal(first.toWorkerId, 'W-C1');
  assert.equal(first.status, 'queued');
  assert.equal(first.goalContinuation, true);
  assert.match(first.body, /GOAL CONTINUATION/);
  assert.ok(state.lastGoalContinuationKey);
  assert.deepEqual(state.journal.map((entry) => entry.type), [
    'message.queued',
    'goal.continuation_queued',
  ]);

  assert.equal(queueGoalContinuationIfNeeded(state), null);
  assert.equal(state.messages.length, 1);
});

test('continuation decision is gated by active work and resumes after a changed frontier', () => {
  const { queueGoalContinuationIfNeeded } = continuationHarness();

  for (const overrides of [
    { policy: { paused: true, authorityEnabled: true } },
    { policy: { paused: false, authorityEnabled: false } },
    { workers: { 'W-C1': { ...quietState().workers['W-C1'], currentAssignmentId: 'A-1' } } },
    { messages: [{ id: 'M-active', status: 'queued', toWorkerId: 'W-C1' }] },
  ]) {
    const state = quietState(overrides);
    assert.equal(queueGoalContinuationIfNeeded(state), null);
    assert.equal(state.messages.length, overrides.messages ? 1 : 0);
  }

  const state = quietState();
  const first = queueGoalContinuationIfNeeded(state);
  first.status = 'completed';
  first.completedAt = 1001;
  state.tasks['T-1'] = {
    id: 'T-1',
    status: 'done',
    completedAt: 1002,
    attempts: 1,
    lastAutoRecoveryReason: '',
  };

  const resumed = queueGoalContinuationIfNeeded(state);
  assert.ok(resumed);
  assert.notEqual(resumed.id, first.id);
  assert.equal(state.messages.length, 2);
  assert.equal(queueGoalContinuationIfNeeded(state), null);
});
