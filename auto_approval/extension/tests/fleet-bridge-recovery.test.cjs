'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const background = fs.readFileSync(path.join(__dirname, '..', 'background.js'), 'utf8');
const worker = fs.readFileSync(path.join(__dirname, '..', 'fleet-worker.js'), 'utf8');

function section(source, startText, endText) {
  const start = source.indexOf(startText);
  const end = source.indexOf(endText, start + startText.length);
  assert.ok(start >= 0, 'missing start: ' + startText);
  assert.ok(end > start, 'missing end: ' + endText);
  return source.slice(start, end);
}

test('registered workers are actively bridge-recovered after install startup and service-worker reload', () => {
  const lifecycle = background.slice(background.indexOf('chrome.runtime.onInstalled.addListener'));
  assert.match(lifecycle, /recoverRegisteredFleetBridges\('extension installed'\)/);
  assert.match(lifecycle, /recoverRegisteredFleetBridges\('browser startup'\)/);
  assert.match(lifecycle, /recoverRegisteredFleetBridges\('service worker load'\)/);
  assert.match(lifecycle, /reconcileStaleWorkerBindings\('service worker load'\)/);
});

test('bridge recovery iterates only enabled workers with durable live tab bindings', () => {
  const body = section(background, 'async function recoverRegisteredFleetBridges', 'async function readFleetPageActivity');
  assert.match(body, /worker\.enabled && Number\.isInteger\(worker\.tabId\)/);
  assert.match(body, /recoverRegisteredWorkerBridge\(workerId, reason\)/);
  assert.doesNotMatch(body, /reconcileFleetTopology/);
});

test('background writes assignment recovery hint before fleet-worker reinjection', () => {
  const body = section(background, 'async function recoverRegisteredWorkerBridge', 'let fleetBridgeRecoveryPromise');
  const hint = body.indexOf('setFleetRecoveryHint');
  const bridge = body.indexOf('ensureFleetBridge');
  assert.ok(hint >= 0 && bridge > hint);
  assert.match(body, /assignment\?\.id \|\| null/);
});

test('recovery reconstructs current task or semantic-message assignment from durable custody', () => {
  const body = section(background, 'function assignmentForWorker', 'async function releaseUnrecoverableBridgeAssignment');
  assert.match(body, /worker\.currentTaskId/);
  assert.match(body, /task\.assignmentId !== worker\.currentAssignmentId/);
  assert.match(body, /buildTaskPrompt/);
  assert.match(body, /assignmentMessages\(state, worker\)/);
  assert.match(body, /messageIds: messages\.map/);
  assert.match(body, /buildMessagePrompt/);
});

test('unprovable assignment recovery is requeued rather than treated as complete', () => {
  const body = section(background, 'async function recoverRegisteredWorkerBridge', 'let fleetBridgeRecoveryPromise');
  assert.match(body, /assignmentRecovery\?\.reattached !== true/);
  assert.match(body, /releaseUnrecoverableBridgeAssignment/);
  const release = section(background, 'async function releaseUnrecoverableBridgeAssignment', 'async function recoverRegisteredWorkerBridge');
  assert.match(release, /requeue: true/);
  assert.match(release, /assignment\.bridge_recovery_queued/);
  assert.doesNotMatch(release, /status: 'done'/);
});

test('worker hello advertises recovery hint so background does not drop in-flight custody during reinjection', () => {
  const body = section(worker, 'async function hello()', "window.addEventListener('pagehide'");
  assert.match(body, /readAssignmentRecoveryHint\(\)/);
  assert.match(body, /activeAssignmentId/);
});

test('worker reattaches only when the current page proves the fleet turn', () => {
  const body = section(worker, 'async function recoverAssignment', 'async function executeAssignment');
  assert.match(body, /const streaming = isStreaming\(\)/);
  assert.match(body, /const promptObserved = assignmentPromptObserved\(assignment\)/);
  assert.match(body, /if \(!streaming && !promptObserved\)/);
  assert.match(body, /reattached: false/);
  assert.match(body, /active = \{/);
  assert.match(body, /phase: 'running'/);
  assert.match(body, /startMonitor\(\)/);
  assert.match(body, /reattached: true/);
});

test('worker prompt proof checks the latest user turn against the assignment prompt', () => {
  const body = section(worker, 'function assignmentPromptObserved', 'function writeCompletionHandoff');
  assert.match(body, /normalizedTurnText\(assignment\?\.prompt/);
  assert.match(body, /latestUserTurnText\(\)/);
  assert.match(body, /actual === expected/);
  assert.match(body, /actual\.includes\(head\)/);
  assert.match(body, /actual\.includes\(tail\)/);
});

test('fleet-worker exposes explicit assignment recovery RPC', () => {
  const body = section(worker, "if (message.type === 'fleet:execute-assignment')", "if (message.type === 'fleet:cancel-current')");
  assert.match(body, /message\.type === 'fleet:recover-assignment'/);
  assert.match(body, /recoverAssignment\(message\.assignment\)/);
});

test('recovered assignment hints are cleared on recovery completion and cancellation', () => {
  const finish = section(worker, 'async function finishActive', 'async function monitorActive');
  assert.match(finish, /clearAssignmentRecoveryHint\(completed\.assignment\.id\)/);
  const cancel = section(worker, 'async function cancelCurrent', 'async function heartbeat');
  assert.match(cancel, /clearAssignmentRecoveryHint\(cancelled\.assignment\.id\)/);
});


test('scheduler cannot reserve fresh work while bridge recovery owns custody', () => {
  const recovery = section(background, 'async function recoverRegisteredFleetBridges', 'async function readFleetPageActivity');
  assert.doesNotMatch(recovery, /schedule\(\).*for \(const workerId of workerIds\)/s);
  assert.match(recovery, /fleetBridgeRecoveryPromise = null;[\s\S]*schedule\(\)\.catch/);
  const scheduler = section(background, 'async function schedule()', 'async function scheduleMessageUntilAdmitted');
  assert.match(scheduler, /if \(fleetBridgeRecoveryPromise\)/);
  assert.match(scheduler, /schedulePending = true/);
});
