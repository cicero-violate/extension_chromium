'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const worker = fs.readFileSync(path.join(__dirname, '..', 'fleet-worker.js'), 'utf8');
const background = fs.readFileSync(path.join(__dirname, '..', 'background.js'), 'utf8');

test('active ChatGPT streaming prevents all fallback completion', () => {
  const start = worker.indexOf('async function monitorActive()');
  const end = worker.indexOf('async function executeAssignment', start);
  const block = worker.slice(start, end);
  const streamingGuard = block.indexOf('if (streaming) return;');
  const explicitCompletion = block.indexOf('if (active.responseChanged && active.explicitTerminal)');
  const quietFallback = block.indexOf('quietFor >= FALLBACK_SETTLE_MS');
  assert.ok(streamingGuard >= 0);
  assert.ok(streamingGuard < explicitCompletion);
  assert.ok(streamingGuard < quietFallback);
});

test('streaming guard requires a visible usable Stop control', () => {
  assert.ok(worker.includes('return !!stopButton && usable(stopButton) && enabledButton(stopButton);'));
});

test('every assignment attempt has a hard fifteen-minute ceiling', () => {
  assert.match(worker, /const HARD_ASSIGNMENT_TIMEOUT_MS = 15 \* 60 \* 1000/);
  assert.match(worker, /monitorHardTimeoutTimer = setTimeout/);
  assert.match(worker, /HARD_ASSIGNMENT_TIMEOUT_MS - \(Date\.now\(\) - active\.sentAt\)/);
  assert.match(worker, /hard 15-minute assignment limit exceeded/);
  assert.match(worker, /cancelCurrent\(AUTO_RECOVERY_REASON_PREFIX/);
});


test('unrelated DOM mutations cannot continually postpone quiet completion', () => {
  const start = worker.indexOf('monitorObserver = new MutationObserver');
  const end = worker.indexOf('monitorObserver.observe', start);
  const observer = worker.slice(start, end);
  assert.doesNotMatch(observer, /scheduleMonitorSettleCheck/);
  assert.match(worker, /if \(!active\.explicitTerminal\) scheduleMonitorSettleCheck\(\)/);
});

test('background preflight refuses to send into a visibly active ChatGPT turn', () => {
  assert.match(background, /async function readFleetPageActivity\(tabId\)/);
  assert.match(background, /#composer-submit-button\[data-testid="stop-button"\]/);
  assert.match(background, /if \(pageActivity\.busy\)/);
  assert.match(background, /deferReservedDispatchForActivePage\(dispatch\)/);
  assert.match(background, /dispatch\.deferred_active_turn/);
});

test('automatic resend is bounded to one recovery attempt', () => {
  assert.match(background, /const MAX_AUTO_RECOVERY_ATTEMPTS = 1/);
  assert.match(background, /requeue = used < MAX_AUTO_RECOVERY_ATTEMPTS/);
  assert.match(background, /assignment\.recovery_queued/);
  assert.match(background, /assignment\.recovery_exhausted/);
  assert.match(background, /terminalStatus = requeue \? 'cancelled' : 'blocked'/);
});

test('scheduler respects page busy cooldown before reserving another assignment', () => {
  assert.match(background, /Number\(w\.pageBusyUntil \|\| 0\) <= now\(\)/);
  assert.match(background, /Number\(target\.pageBusyUntil \|\| 0\) <= now\(\)/);
});


test('hard timeout cancellation clicks the current visible Stop control', () => {
  assert.match(worker, /#composer-submit-button\[data-testid="stop-button"\]/);
  assert.match(worker, /if \(stopButton && usable\(stopButton\) && enabledButton\(stopButton\)\) stopButton\.click\(\)/);
});
