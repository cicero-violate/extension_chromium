'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const worker = fs.readFileSync(path.join(root, 'fleet-worker.js'), 'utf8');
const background = fs.readFileSync(path.join(root, 'background.js'), 'utf8');
const c6Source = fs.readFileSync(path.join(root, 'fleet-state-model-m7-c6.js'), 'utf8');

function loadC6() {
  const sandbox = {
    structuredClone,
    ModelFleetStateM7C3: {
      normalizeV2: (state) => structuredClone(state),
      finalizeV2: (state) => structuredClone(state),
    },
  };
  sandbox.globalThis = sandbox;
  vm.runInNewContext(c6Source, sandbox);
  return sandbox.ModelFleetStateM7C6;
}

function runningMessageState() {
  return {
    workers: {
      'W-S0002': {
        id: 'W-S0002',
        enabled: true,
        currentAssignmentId: 'A-1',
        lifecycle: 'running',
        runtime: { busy: true },
        controlInbox: [],
      },
    },
    assignments: {
      'A-1': {
        id: 'A-1',
        workerId: 'W-S0002',
        phase: 'running',
        kind: 'message',
        messageIds: ['M-1'],
        recoveryAttempt: 0,
      },
    },
    tasks: {},
    messages: [{
      id: 'M-1',
      phase: 'running',
      autoRecoveryAttempts: 0,
    }],
  };
}

test('post-click unproven submission is blocked rather than automatically resent', () => {
  const c6 = loadC6();
  const result = c6.applyAutomaticRecovery(runningMessageState(), {
    workerId: 'W-S0002',
    assignmentId: 'A-1',
    reason: 'post-send submission unproven: proof timeout after Send click',
  });
  assert.equal(result.result.ok, true);
  assert.equal(result.result.retryScheduled, false);
  assert.equal(result.result.outcome, 'submission-uncertain-blocked');
  assert.equal(result.state.messages[0].phase, 'blocked');
  assert.equal(result.state.messages[0].autoRecoveryAttempts, 0);
  assert.equal(result.state.workers['W-S0002'].currentAssignmentId, null);
  assert.equal(result.state.assignments['A-1'], undefined);
});

test('definite pre-click preparation failure still receives the single bounded retry', () => {
  const c6 = loadC6();
  const result = c6.applyAutomaticRecovery(runningMessageState(), {
    workerId: 'W-S0002',
    assignmentId: 'A-1',
    reason: 'pre-send preparation failed: connector card unavailable',
  });
  assert.equal(result.result.ok, true);
  assert.equal(result.result.retryScheduled, true);
  assert.equal(result.result.outcome, 'requeued');
  assert.equal(result.state.messages[0].phase, 'queued');
  assert.equal(result.state.messages[0].autoRecoveryAttempts, 1);
});

test('worker classifies only post-click proof failures as unsafe to retry', () => {
  assert.ok(worker.includes("const SUBMISSION_UNPROVEN_AFTER_CLICK_CODE = 'FLEET_SUBMISSION_UNPROVEN_AFTER_CLICK';"));
  assert.ok(worker.includes("const AMBIGUOUS_POST_SEND_RECOVERY_PREFIX = 'post-send submission unproven:';"));
  assert.ok(worker.includes("throw submissionUnprovenAfterClick('ChatGPT Send click was not proven: no new matching user turn appeared')"));
  assert.ok(worker.includes("error?.code === SUBMISSION_UNPROVEN_AFTER_CLICK_CODE"));
  assert.ok(worker.includes("? AMBIGUOUS_POST_SEND_RECOVERY_PREFIX + ' ' + String(error)"));
  assert.ok(worker.includes(": 'pre-send preparation failed: ' + String(error)"));
});

test('legacy recovery path also disables retry for ambiguous post-click delivery', () => {
  assert.ok(background.includes("const AMBIGUOUS_POST_SEND_RECOVERY_PREFIX = 'post-send submission unproven:';"));
  assert.ok(background.includes('const ambiguousPostSend = recoveryReason.startsWith(AMBIGUOUS_POST_SEND_RECOVERY_PREFIX);'));
  assert.ok(background.includes('if (ambiguousPostSend) requeue = false;'));
});


test('typed post-click ambiguity survives a failed cancellation RPC and cannot fall into generic requeue', () => {
  assert.ok(worker.includes("errorCode: String(error?.code || '')"));
  assert.ok(worker.includes('unsafeToRetry: error?.code === SUBMISSION_UNPROVEN_AFTER_CLICK_CODE'));

  assert.ok(background.includes('function workerDispatchResponseError(response)'));
  assert.ok(background.includes('response?.unsafeToRetry === true'));
  assert.ok(background.includes('function ambiguousPostSendDispatchError(error)'));

  const c3Start = background.indexOf('async function dispatchReservedC3Candidate');
  const c3End = background.indexOf('function c4Module', c3Start);
  const c3Dispatch = background.slice(c3Start, c3End);
  const exactOwnerCheck = c3Dispatch.indexOf('durableWorker.currentAssignmentId !== dispatch.assignment.id');
  const ambiguityGate = c3Dispatch.indexOf('if (ambiguousPostSendDispatchError(error))');
  const c6Route = c3Dispatch.indexOf('c6ApplyCancellationInState(', ambiguityGate);
  const genericFailure = c3Dispatch.indexOf('c3.composeDispatchFailure', ambiguityGate);
  assert.ok(exactOwnerCheck >= 0);
  assert.ok(ambiguityGate > exactOwnerCheck);
  assert.ok(c6Route > ambiguityGate);
  assert.ok(genericFailure > c6Route);
  assert.ok(c3Dispatch.includes('{ requireTabBinding: false }'));

  const legacyStart = background.indexOf('async function failDispatch');
  const legacyEnd = background.indexOf('async function journalDeferredMessages', legacyStart);
  const legacy = background.slice(legacyStart, legacyEnd);
  assert.ok(legacy.includes('if (ambiguousPostSend && worker?.currentAssignmentId === dispatch.assignment.id)'));
  assert.ok(legacy.includes("eventType: 'assignment.recovery_exhausted'"));
  assert.ok(legacy.includes("terminalStatus: 'blocked'"));
  assert.ok(legacy.includes('requeue: false'));
});
