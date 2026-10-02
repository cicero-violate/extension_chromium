'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const background = fs.readFileSync(path.join(__dirname, '..', 'background.js'), 'utf8');
const worker = fs.readFileSync(path.join(__dirname, '..', 'fleet-worker.js'), 'utf8');
const controlJs = fs.readFileSync(path.join(__dirname, '..', 'control-pane.js'), 'utf8');
const controlHtml = fs.readFileSync(path.join(__dirname, '..', 'control-pane.html'), 'utf8');

function section(source, startText, endText) {
  const start = source.indexOf(startText);
  const end = source.indexOf(endText, start + startText.length);
  assert.ok(start >= 0, 'start section not found: ' + startText);
  assert.ok(end > start, 'end section not found: ' + endText);
  return source.slice(start, end);
}

test('semantic messages batch by target under bounded count and prompt size', () => {
  assert.match(background, /const MAX_MESSAGE_BATCH_SIZE = 12/);
  assert.match(background, /const MAX_MESSAGE_BATCH_CHARS = 12000/);
  const select = section(background, 'function selectMessageBatch', 'function routeParsedMessages');
  assert.match(select, /message\.toWorkerId === seed\.toWorkerId/);
  assert.match(select, /message\.requiresFleetMessage !== true/);
  assert.match(select, /MAX_MESSAGE_BATCH_SIZE/);
  assert.match(select, /MAX_MESSAGE_BATCH_CHARS/);
  const choose = section(background, 'function chooseDispatches', 'async function failDispatch');
  assert.match(choose, /const batch = selectMessageBatch\(state, message\)/);
  assert.match(choose, /worker\.currentMessageIds = batch\.map/);
  assert.match(choose, /messageIds: batch\.map/);
  assert.match(choose, /message\.batch_reserved/);
});

test('routing-format repair remains isolated from ordinary mailbox batching', () => {
  const select = section(background, 'function selectMessageBatch', 'function routeParsedMessages');
  assert.match(select, /seed\.requiresFleetMessage === true\) return \[seed\]/);
  assert.match(background, /requiresFleetMessage: true/);
});

test('scheduler child-task failures use typed control inbox instead of semantic traffic', () => {
  const completion = section(background, 'async function completeAssignment', 'async function flushWorkerHeartbeats');
  assert.match(completion, /queueWorkerControlNotice\(state, workerId/);
  assert.match(completion, /type: 'child-task-creation-failure'/);
  const failureBlock = completion.slice(
    completion.indexOf('if (childTaskResult.failures.length)'),
    completion.indexOf('const repairReason'),
  );
  assert.doesNotMatch(failureBlock, /queueSemanticMessage/);
  assert.match(background, /controlInbox/);
  assert.match(background, /control\.reserved/);
});

test('worker reports terminal timestamp and background records terminal-to-release latency', () => {
  const finish = section(worker, 'async function finishActive', 'async function monitorActive');
  assert.match(finish, /const responseTerminalAt = Date\.now\(\)/);
  assert.match(finish, /responseTerminalAt/);
  const report = section(worker, 'async function reportCompletionPayload', 'function signalIdleReady');
  assert.match(report, /responseTerminalAt/);
  const completion = section(background, 'async function completeAssignment', 'async function flushWorkerHeartbeats');
  assert.match(completion, /payload\.responseTerminalAt/);
  assert.match(completion, /assignment\.release_lag/);
  assert.match(completion, /completionReleaseLagTotalMs/);
  assert.match(completion, /completionReleaseLagMaxMs/);
});

test('diagnostics expose queue age per worker and completion release lag', () => {
  const snapshot = section(background, 'function publicSnapshot', 'async function broadcastSnapshot');
  assert.match(snapshot, /queueByWorker/);
  assert.match(snapshot, /oldestQueueAgeMs/);
  assert.match(snapshot, /averageCompletionReleaseLagMs/);
  assert.match(snapshot, /maxCompletionReleaseLagMs/);
  assert.match(controlHtml, /id="queuePressure"/);
  assert.match(controlJs, /function renderQueuePressure/);
  assert.match(controlJs, /queued.*behind/);
  assert.match(controlJs, /terminal→release/);
});

test('deferred journal is aggregated by target and legacy spam is hidden', () => {
  const deferred = section(background, 'async function journalDeferredMessages', 'async function dispatchReserved');
  assert.match(deferred, /schedule\.deferred_group/);
  assert.match(deferred, /queued behind/);
  assert.match(deferred, /oldestQueueAgeMs/);
  const journal = section(controlJs, 'function renderJournal', 'function renderInvariantsAndExceptions');
  assert.match(journal, /event\?\.type !== 'schedule\.deferred'/);
});

test('batch lifecycle requeues every owned semantic message on failures and recovery', () => {
  assert.match(background, /function requeueAssignmentMessages/);
  const failed = section(background, 'async function failDispatch', 'async function journalDeferredMessages');
  assert.match(failed, /requeueAssignmentMessages\(state, worker/);
  const release = section(background, 'function releaseWorkerAssignment', 'async function cancelWorkerDispatch');
  assert.match(release, /const messageIds = assignmentMessageIds\(worker\)/);
  assert.match(release, /for \(const messageId of messageIds\)/);
});
