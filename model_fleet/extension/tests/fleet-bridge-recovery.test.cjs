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


test('fleet bridge recovery restores connector attachment helper before dispatch', () => {
  const helper = section(background, 'async function fleetConnectorHelperReady', 'async function ensureFleetBridge');
  assert.match(helper, /connector-attachment\.js/);
  assert.match(helper, /ModelFleetConnectorAttachment/);
  const bridge = section(background, 'async function ensureFleetBridge', 'async function setFleetRecoveryHint');
  assert.match(bridge, /await ensureFleetConnectorHelper\(tabId\)/);
  assert.ok(bridge.indexOf('ensureFleetConnectorHelper(tabId)') < bridge.indexOf("files: ['fleet-worker.js']"));
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

test('worker hello separates recovery hint from proven active assignment custody', () => {
  const body = section(worker, 'async function hello()', "window.addEventListener('pagehide'");
  assert.match(body, /activeAssignmentId: activeAssignmentIdForCustody\(\)/);
  assert.match(body, /recoveryHintAssignmentId: readAssignmentRecoveryHint\(\)/);
  assert.doesNotMatch(body, /activeAssignmentId: .*readAssignmentRecoveryHint/);
});

test('worker reattaches reserved custody only with prompt proof and never treats preparing as proven', () => {
  const body = section(worker, 'async function recoverAssignment', 'async function executeAssignment');
  assert.match(body, /active\.phase === 'preparing'/);
  assert.match(body, /preparing: true/);
  assert.match(body, /submissionProven: false/);
  assert.match(body, /unsafeToRetry: true/);
  assert.match(body, /const streaming = isStreaming\(\)/);
  assert.match(body, /const promptObserved = assignmentPromptObserved\(assignment\)/);
  assert.match(body, /const reservedRecovery = assignment\.phase === 'reserved'/);
  assert.match(body, /reservedRecovery && !promptObserved/);
  assert.match(body, /submissionProven: reservedRecovery \? promptObserved : true/);
  assert.match(body, /active = \{/);
  assert.match(body, /phase: 'running'/);
  assert.match(body, /startMonitor\(\)/);
});

test('v2 bridge recovery blocks unproven reserved custody and accepts proven custody through C3 before C4', () => {
  const start = background.indexOf('recoverRegisteredWorkerBridge = async function recoverRegisteredWorkerBridgeC4');
  const end = background.indexOf('// C5 v2 completion overlay', start);
  assert.ok(start >= 0 && end > start);
  const body = background.slice(start, end);
  assert.match(body, /assignmentRecord\?\.phase === 'reserved' && response\.submissionProven !== true/);
  assert.match(body, /AMBIGUOUS_POST_SEND_RECOVERY_PREFIX/);
  assert.match(body, /c6ApplyCancellationInState/);
  assert.match(body, /assignmentRecord\?\.phase === 'reserved' && response\.submissionProven === true/);
  assert.match(body, /c3DispatchFromAssignment/);
  assert.match(body, /acceptProvenDispatchC3State/);
  assert.match(body, /reconcileRecoveryCustody\(recoveryState, recoveryInput\)/);
});

test('preparing worker liveness never advertises accepted assignment custody', () => {
  const helper = section(worker, 'function activeAssignmentIdForCustody', 'function sampleTurnLiveness');
  assert.match(helper, /active\?\.phase === 'running'/);
  assert.doesNotMatch(helper, /phase === 'preparing'/);
  const liveness = section(worker, 'function sampleTurnLiveness', 'function findComposer');
  assert.match(liveness, /active\?\.phase === 'running'/);
});

test('worker prompt proof checks the latest user turn against the assignment prompt', () => {
  const assignmentBody = section(worker, 'function assignmentPromptObserved', 'function userTurnAfter');
  assert.match(assignmentBody, /promptTextObserved\(assignment\?\.prompt/);
  const matcherBody = section(worker, 'function promptTextObserved', 'function assignmentPromptObserved');
  assert.match(matcherBody, /normalizedTurnText\(prompt/);
  assert.match(matcherBody, /latestUserTurnNode\(\)/);
  assert.match(matcherBody, /actual === expected/);
  assert.match(matcherBody, /actual\.includes\(head\)/);
  assert.match(matcherBody, /actual\.includes\(tail\)/);
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
  assert.match(cancel, /if \(releasedLocally\)[\s\S]*clearAssignmentRecoveryHint\(assignmentId\)/);
});


test('scheduler cannot reserve fresh work while bridge recovery owns custody', () => {
  const recovery = section(background, 'async function recoverRegisteredFleetBridges', 'async function readFleetPageActivity');
  assert.doesNotMatch(recovery, /schedule\(\).*for \(const workerId of workerIds\)/s);
  assert.match(recovery, /fleetBridgeRecoveryPromise = null;[\s\S]*schedule\(\)\.catch/);
  const scheduler = section(background, 'async function schedule()', 'async function scheduleMessageUntilAdmitted');
  assert.match(scheduler, /if \(fleetBridgeRecoveryPromise\)/);
  assert.match(scheduler, /schedulePending = true/);
});


test('bridge and registration responses never expose preparing as active assignment custody', () => {
  const ping = section(worker, "if (message.type === 'fleet:bridge-ping')", "if (message.type === 'fleet:ensure-registration')");
  assert.match(ping, /activeAssignmentId: activeAssignmentIdForCustody\(\)/);
  assert.doesNotMatch(ping, /active\?\.assignment\.id/);

  const registration = section(worker, "if (message.type === 'fleet:ensure-registration')", "if (message.type === 'fleet:execute-assignment')");
  assert.match(registration, /activeAssignmentId: activeAssignmentIdForCustody\(\)/);
  assert.doesNotMatch(registration, /active\?\.assignment\.id/);
});

test('legacy hello reconciliation treats recovery hint as metadata, not live custody authority', () => {
  const body = section(background, 'async function reconcileOnHello', 'async function updateWorkerHeartbeat');
  assert.match(body, /const liveAssignmentId = payload\.activeAssignmentId \|\| null/);
  assert.doesNotMatch(body, /recoveryHintAssignmentId/);
});
