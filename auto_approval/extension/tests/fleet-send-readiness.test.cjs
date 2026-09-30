'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const worker = fs.readFileSync(path.join(__dirname, '..', 'fleet-worker.js'), 'utf8');

test('assignment custody is acknowledged before waiting for the send button', () => {
  const start = worker.indexOf('async function executeAssignment(assignment)');
  const end = worker.indexOf('async function cancelCurrent', start);
  const block = worker.slice(start, end);
  assert.match(block, /phase: 'preparing'/);
  assert.match(block, /armHardAssignmentTimeout\(\)/);
  assert.match(block, /prepareAndSendActive\(assignment\.id\)\.catch/);
  assert.match(block, /return \{ assignmentId: assignment\.id, phase: 'preparing' \}/);
  assert.doesNotMatch(block, /await injectPrompt/);
});

test('preparing assignment waits for send readiness for the remaining hard-time budget', () => {
  const start = worker.indexOf('async function prepareAndSendActive');
  const end = worker.indexOf('async function executeAssignment', start);
  const block = worker.slice(start, end);
  assert.match(block, /HARD_ASSIGNMENT_TIMEOUT_MS - \(Date\.now\(\) - current\.acceptedAt\)/);
  assert.match(block, /await injectPrompt\(current\.assignment\.prompt, remaining\)/);
  assert.match(block, /active\.phase = 'running'/);
});

test('there is no five-second fleet send-readiness timeout anymore', () => {
  assert.doesNotMatch(worker, /SEND_READY_TIMEOUT_MS/);
  assert.match(worker, /function waitForSendButton\(timeoutMs\)/);
  assert.match(worker, /async function injectPrompt\(text, sendReadyTimeoutMs\)/);
});

test('pre-send failure uses the bounded fleet recovery path', () => {
  assert.match(worker, /pre-send preparation failed:/);
  assert.match(worker, /cancelCurrent\(AUTO_RECOVERY_REASON_PREFIX/);
});

test('hard timeout covers both preparing and running phases', () => {
  assert.match(worker, /const startedAt = Number\(active\.acceptedAt \|\| active\.sentAt \|\| Date\.now\(\)\)/);
  assert.match(worker, /cancelCurrent\(AUTO_RECOVERY_REASON_PREFIX \+ 'hard 15-minute assignment limit exceeded'\)/);
});
