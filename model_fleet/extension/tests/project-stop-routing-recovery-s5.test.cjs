'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'background.js'), 'utf8');

function continuationHarness() {
  const queueStart = source.indexOf('function c5QueueMessage');
  const queueEnd = source.indexOf('function c5CreateTask', queueStart);
  const helperStart = source.indexOf('function goalFrontierKeyV2');
  const helperEnd = source.indexOf('function c5CreateTask', helperStart);
  assert.ok(queueStart >= 0 && queueEnd > queueStart && helperStart >= 0);
  const context = {
    result: null,
    MAX_MESSAGES: 250,
    ModelFleetStateM7C2: {
      schedulerWorkerEligibility(state, workerId, { now }) {
        const worker = state.workers[workerId];
        const eligible = Boolean(worker
          && worker.enabled !== false
          && Number.isInteger(worker.tabId)
          && worker.lifecycle !== 'stale'
          && worker.lifecycle !== 'offline'
          && worker.lifecycle !== 'rotating'
          && worker.currentAssignmentId == null
          && worker.fault == null
          && worker.chatRotationPending !== true
          && Number(worker.pageBusyUntil || 0) <= now
          && worker.runtime?.busy !== true);
        return { eligible, reason: eligible ? 'eligible' : 'ineligible' };
      },
      taskRunnable(state, task, worker = null) {
        if (!task || task.phase !== 'pending') return false;
        const dependencies = Array.isArray(task.dependencies) ? task.dependencies : [];
        if (dependencies.some((id) => state.tasks[id]?.phase !== 'done')) return false;
        if (String(task.role || '').toLowerCase() === 'review' && worker) {
          const completers = new Set(dependencies.map((id) => state.tasks[id]?.completedByWorkerId).filter(Boolean));
          if (completers.has(worker.id)) return false;
        }
        return true;
      },
    },
  };
  vm.runInNewContext(`
    function compactFleetFingerprint(value) { return String(value).length + ':' + String(value); }
    function canonicalRole(role) { return String(role || '').trim().toLowerCase(); }
    function c5Journal(state, type, text, detail, at) {
      state.journal.push({ type, text, detail, at });
      return state;
    }
    function c5JournalInPlace(state, type, text, detail, at) { return c5Journal(state, type, text, detail, at); }
    ${source.slice(queueStart, queueEnd)}
    ${source.slice(helperStart, helperEnd)}
    result = { queueGoalContinuationV2 };
  `, context);
  return context.result;
}

function worker(overrides = {}) {
  return {
    id: 'W-C1', role: 'coordinator', enabled: true, tabId: 42, lifecycle: 'warm-idle',
    currentAssignmentId: null, fault: null, chatRotationPending: false, pageBusyUntil: 0,
    runtime: { busy: false, lastHeartbeatAt: 1000, reportedAssignmentId: null },
    controlInbox: [], ...overrides,
  };
}

function quietState(overrides = {}) {
  return {
    version: 2,
    goal: 'finish the bounded integration',
    policy: { paused: false, authorityEnabled: true },
    workers: { 'W-C1': worker() },
    tasks: {}, messages: [], assignments: {}, nextMessage: 1, journal: [], lastGoalContinuationKey: '',
    ...overrides,
  };
}

test('v2 historical false-stop queues exactly one canonical continuation', () => {
  const { queueGoalContinuationV2 } = continuationHarness();
  const state = quietState();
  state.tasks = {
    'T-3': { id: 'T-3', phase: 'done', completedAt: 200, attempts: 1, lastAutoRecoveryReason: '' },
    'T-4': { id: 'T-4', phase: 'done', completedAt: 300, attempts: 1, lastAutoRecoveryReason: 'stale evidence' },
  };
  state.messages = [
    { id: 'M-14', phase: 'blocked', toWorkerId: 'W-C1', goalContinuation: false, completedAt: 0, autoRecoveryAttempts: 1, lastAutoRecoveryReason: 'protocol repair exhausted' },
    { id: 'M-15', phase: 'delivered', toWorkerId: 'operator', goalContinuation: false, completedAt: 400, autoRecoveryAttempts: 0, lastAutoRecoveryReason: '' },
  ];
  const message = queueGoalContinuationV2(state, 1000);
  assert.ok(message);
  assert.equal(message.phase, 'queued');
  assert.equal(message.from, 'scheduler');
  assert.equal(message.toWorkerId, 'W-C1');
  assert.equal(message.goalContinuation, true);
  assert.equal(Object.hasOwn(message, 'status'), false);
  assert.equal(Object.hasOwn(message, 'assignmentId'), false);
  assert.equal(state.messages.length, 3);
  assert.equal(queueGoalContinuationV2(state, 1001), null);
  assert.equal(state.messages.length, 3);
});

test('v2 continuation is blocked by queued/running messages, dispatchable pending tasks, custody, controls, or ineligible Coordinator', () => {
  const { queueGoalContinuationV2 } = continuationHarness();
  const cases = [
    { messages: [{ id: 'M-Q', phase: 'queued', toWorkerId: 'W-C1' }] },
    { messages: [{ id: 'M-R', phase: 'running', toWorkerId: 'W-C1' }] },
    { tasks: { 'T-P': { id: 'T-P', phase: 'pending', role: 'coordinator', dependencies: [] } } },
    { assignments: { A1: { id: 'A1', workerId: 'W-C1', phase: 'running' } } },
    { workers: { 'W-C1': worker({ controlInbox: [{ id: 'C1' }] }) } },
    { workers: { 'W-C1': worker({ fault: { code: 'dispatch-failed' } }) } },
    { workers: { 'W-C1': worker({ enabled: false }) } },
    { workers: { 'W-C1': worker({ lifecycle: 'stale' }) } },
  ];
  for (const overrides of cases) {
    const state = quietState(overrides);
    assert.equal(queueGoalContinuationV2(state, 1000), null);
    assert.equal(state.messages.filter((message) => message.goalContinuation === true).length, 0);
  }
});



test('v2 continuation is allowed when pending tasks are not dispatchable because dependencies are blocked', () => {
  const { queueGoalContinuationV2 } = continuationHarness();
  const state = quietState({
    workers: {
      'W-C1': worker(),
      'W-R1': worker({ id: 'W-R1', role: 'review', tabId: 43 }),
    },
    tasks: {
      'T-5': { id: 'T-5', phase: 'blocked', role: 'review', dependencies: [], completedAt: 500, attempts: 1, lastAutoRecoveryReason: '' },
      'T-6': { id: 'T-6', phase: 'pending', role: 'review', dependencies: ['T-5'], completedAt: 0, attempts: 0, lastAutoRecoveryReason: '' },
    },
  });
  const message = queueGoalContinuationV2(state, 1000);
  assert.ok(message);
  assert.equal(message.goalContinuation, true);
  assert.equal(message.toWorkerId, 'W-C1');
});



test('a continuation-created pending blocked child does not advance the continuation frontier by itself', () => {
  const { queueGoalContinuationV2 } = continuationHarness();
  const state = quietState({
    tasks: {
      'T-5': { id: 'T-5', phase: 'blocked', role: 'review', dependencies: [], createdAt: 500, completedAt: 600, attempts: 1, lastAutoRecoveryReason: '' },
    },
  });
  const first = queueGoalContinuationV2(state, 1000);
  assert.ok(first);
  first.phase = 'done';
  state.tasks['T-6'] = {
    id: 'T-6', phase: 'pending', role: 'review', dependencies: ['T-5'],
    createdAt: 1100, completedAt: 0, attempts: 0, lastAutoRecoveryReason: '',
  };
  assert.equal(queueGoalContinuationV2(state, 1200), null);
  state.tasks['T-6'].phase = 'blocked';
  state.tasks['T-6'].completedAt = 1250;
  const resumed = queueGoalContinuationV2(state, 1300);
  assert.ok(resumed);
  assert.equal(resumed.goalContinuation, true);
});

test('v2 continuation is disabled for empty goal, paused policy, and revoked authority', () => {
  const { queueGoalContinuationV2 } = continuationHarness();
  for (const overrides of [
    { goal: '' },
    { policy: { paused: true, authorityEnabled: true } },
    { policy: { paused: false, authorityEnabled: false } },
  ]) assert.equal(queueGoalContinuationV2(quietState(overrides), 1000), null);
});

test('v2 frontier changes permit one new continuation and preserve canonical phase fields', () => {
  const { queueGoalContinuationV2 } = continuationHarness();
  const state = quietState();
  const first = queueGoalContinuationV2(state, 1000);
  assert.ok(first);
  first.phase = 'done';
  first.completedAt = 1100;
  state.tasks['T-4'] = { id: 'T-4', phase: 'done', completedAt: 1101, attempts: 1, lastAutoRecoveryReason: '' };
  const second = queueGoalContinuationV2(state, 1200);
  assert.ok(second);
  assert.equal(state.messages.filter((message) => message.goalContinuation === true).length, 2);
  for (const message of state.messages) {
    assert.equal(Object.hasOwn(message, 'status'), false);
    assert.equal(Object.hasOwn(message, 'assignmentId'), false);
  }
});

test('the final v2 scheduler boundary owns continuation and schedules one follow-up admission pass', () => {
  const scheduler = source.slice(source.indexOf('schedule = async function scheduleC3Candidate()'), source.indexOf('// C4 v2 heartbeat/bridge overlay'));
  assert.match(scheduler, /queueGoalContinuationV2\(state, now\(\)\)/);
  assert.match(scheduler, /continuationQueued/);
  assert.match(scheduler, /schedulePending = true/);
  assert.match(scheduler, /return \{ dispatches, continuationQueued/);
});

test('v2 continuation uses the existing C5 queue authority and not legacy queue construction', () => {
  const helper = source.slice(source.indexOf('function goalFrontierKeyV2'), source.indexOf('function c5CreateTask'));
  assert.match(helper, /c5QueueMessage\(state/);
  assert.doesNotMatch(helper, /queueSemanticMessage\(state/);
  assert.match(helper, /hasDispatchablePendingTaskV2/);
  assert.match(helper, /taskRunnable/);
  assert.match(helper, /schedulerWorkerEligibility/);
});
