'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const background = fs.readFileSync(path.join(__dirname, '..', 'background.js'), 'utf8');
const controlHtml = fs.readFileSync(path.join(__dirname, '..', 'control-pane.html'), 'utf8');
const controlJs = fs.readFileSync(path.join(__dirname, '..', 'control-pane.js'), 'utf8');

function section(startText, endText) {
  const start = background.indexOf(startText);
  const end = background.indexOf(endText, start + startText.length);
  assert.ok(start >= 0, 'missing start: ' + startText);
  assert.ok(end > start, 'missing end: ' + endText);
  return background.slice(start, end);
}

test('fleet defaults to ten accepted turns per ChatGPT conversation', () => {
  assert.match(background, /const MAX_TURNS_PER_CHAT = 10/);
  assert.match(background, /maxTurnsPerChat: MAX_TURNS_PER_CHAT/);
  const clamp = section('function boundedMaxTurnsPerChat', 'function warmIdleAlarmName');
  assert.match(clamp, /Math\.max\(1, Math\.min\(50/);
});

test('worker turn counters persist and normalize against current policy', () => {
  const normalize = section('function normalizeFleetState', 'async function loadFleetState');
  assert.match(normalize, /worker\.chatTurnCount = Math\.max/);
  assert.match(normalize, /worker\.chatRotationPending = worker\.chatRotationPending === true/);
  assert.match(normalize, /boundedMaxTurnsPerChat\(policy\.maxTurnsPerChat\)/);
  assert.match(normalize, /worker\.lastCountedAssignmentId/);
});

test('only an acknowledged assignment increments the chat turn count and each assignment counts once', () => {
  const dispatch = section('async function dispatchReserved', 'async function schedule');
  assert.match(dispatch, /if \(!response\?\.ok\) throw new Error/);
  assert.match(dispatch, /worker\.lastCountedAssignmentId !== dispatch\.assignment\.id/);
  assert.match(dispatch, /worker\.lastCountedAssignmentId = dispatch\.assignment\.id/);
  assert.match(dispatch, /worker\.chatTurnCount = Math\.max[\s\S]*?\+ 1/);
  assert.match(dispatch, /worker\.chatRotationPending = true/);
  assert.match(dispatch, /worker\.chat_limit_reached/);
});

test('turn 11 cannot dispatch while a fresh-chat rotation is pending', () => {
  const rank = section('function workerMatchRank', 'function workerMatches');
  assert.match(rank, /worker\.chatRotationPending/);
  const choose = section('function chooseDispatches', 'function releaseWorkerAssignment');
  assert.match(choose, /&& !w\.chatRotationPending/);
  const schedule = section('async function schedule', 'async function scheduleMessageUntilAdmitted');
  assert.match(schedule, /!target\.chatRotationPending/);
});

test('chat rotation starts a fresh conversation in the same worker tab and resets the counter only after readiness', () => {
  const rotate = section('async function rotateWorkerChat', 'function startPendingChatRotations');
  assert.match(rotate, /chrome\.tabs\.update\(tabId, \{ url: 'https:\/\/chatgpt\.com\/' \}\)/);
  assert.doesNotMatch(rotate, /chrome\.tabs\.create/);
  assert.doesNotMatch(rotate, /chrome\.tabs\.reload/);
  assert.match(rotate, /await waitForTabReady\(tabId, 30000\)/);
  assert.match(rotate, /await ensureFleetBridgeAfterWake\(tabId, 30000\)/);
  assert.match(rotate, /worker\.chatTurnCount = 0/);
  assert.match(rotate, /worker\.chatRotationPending = false/);
  assert.match(rotate, /worker\.lastChatRotationAt = now\(\)/);
});

test('assignment completion rotates before warm-idle when the limit was reached', () => {
  const completion = section('async function completeAssignment', 'async function flushWorkerHeartbeats');
  assert.match(completion, /if \(completed\.workers\[workerId\]\?\.chatRotationPending\)/);
  assert.match(completion, /await rotateWorkerChat\(workerId/);
  assert.match(completion, /else \{[\s\S]*?await beginWarmIdle/);
});

test('idle acknowledgement cannot bypass a pending chat rotation', () => {
  const handler = section("if (message.type === 'fleet:worker-idle-ready')", "if (message.type === 'fleet:assignment-cancelled')");
  assert.match(handler, /worker\?\.chatRotationPending/);
  assert.match(handler, /rotateWorkerChat\(workerId/);
});

test('lowering the policy limit marks workers at or above the new cap for rotation', () => {
  const handler = section("if (message.type === 'fleet:update-policy')", "if (message.type === 'fleet:cancel-worker-dispatch')");
  assert.match(handler, /maxTurnsPerChat/);
  assert.match(handler, /boundedMaxTurnsPerChat/);
  assert.match(handler, /worker\.chatTurnCount/);
  assert.match(handler, /worker\.chatRotationPending = true/);
});

test('pending rotations resume after browser startup and service-worker reload', () => {
  const lifecycle = background.slice(background.indexOf('chrome.runtime.onStartup.addListener'));
  assert.match(lifecycle, /startPendingChatRotations\(state\)/);
  assert.match(lifecycle, /service worker load/);
});

test('control page exposes configurable turns-per-chat policy and per-worker usage', () => {
  assert.match(controlHtml, /id="turnLimit"/);
  assert.match(controlHtml, /Turns per chat/);
  assert.match(controlJs, /maxTurnsPerChat/);
  assert.match(controlJs, /Turns-per-chat limit updated/);
  assert.match(controlJs, /Chat turns/);
  assert.match(controlJs, /rotation pending/);
});
