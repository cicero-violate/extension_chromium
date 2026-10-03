'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const worker = fs.readFileSync(path.join(root, 'fleet-worker.js'), 'utf8');
const background = fs.readFileSync(path.join(root, 'background.js'), 'utf8');

test('assignment acknowledgement is held until prompt submission is proven', () => {
  const start = worker.indexOf('async function executeAssignment(assignment)');
  const end = worker.indexOf('async function cancelCurrent', start);
  const block = worker.slice(start, end);
  assert.ok(block.includes("phase: 'preparing'"));
  assert.ok(block.includes('armHardAssignmentTimeout()'));
  assert.ok(block.includes('return prepareAndSendActive(assignment.id)'));
  assert.ok(!block.includes("return { assignmentId: assignment.id, phase: 'preparing' }"));
});

test('preparing assignment enters running only after injectPrompt returns submission proof', () => {
  const start = worker.indexOf('async function prepareAndSendActive');
  const end = worker.indexOf('async function recoverAssignment', start);
  const block = worker.slice(start, end);
  const inject = block.indexOf('const sent = await injectPrompt');
  const running = block.indexOf("active.phase = 'running'");
  const result = block.indexOf('submissionProven: sent.submissionProven === true');
  assert.ok(inject >= 0);
  assert.ok(running > inject);
  assert.ok(result > running);
});

test('injectPrompt proves a new matching user turn after clicking Send', () => {
  const start = worker.indexOf('async function injectPrompt(text, sendReadyTimeoutMs)');
  const end = worker.indexOf('\n  function stopResponseMonitor', start);
  const block = worker.slice(start, end);
  const previous = block.indexOf('const previousUserTurn = latestUserTurnNode()');
  const click = block.indexOf('sendButton.click()');
  const proof = block.indexOf('await waitForPromptSubmission(text, previousUserTurn, proofTimeoutMs)');
  const returned = block.indexOf('submissionProven: true');
  assert.ok(previous >= 0);
  assert.ok(click > previous);
  assert.ok(proof > click);
  assert.ok(returned > proof);
  assert.ok(block.includes('no new matching user turn appeared'));
});

test('pre-send submission failure uses exactly one bounded fleet recovery cancellation and propagates failure', () => {
  const start = worker.indexOf('async function prepareAndSendActive');
  const end = worker.indexOf('async function recoverAssignment', start);
  const block = worker.slice(start, end);
  const cancelNeedle = 'cancelCurrent(AUTO_RECOVERY_REASON_PREFIX + recoveryReason)';
  assert.equal(block.split(cancelNeedle).length - 1, 1);
  assert.ok(block.includes('await cancelCurrent'));
  assert.ok(block.includes('error?.code === SUBMISSION_UNPROVEN_AFTER_CLICK_CODE'));
  assert.ok(block.includes('AMBIGUOUS_POST_SEND_RECOVERY_PREFIX'));
  assert.ok(block.includes("'pre-send preparation failed: ' + String(error)"));
  assert.ok(block.includes('throw error'));
});

test('background accepts dispatch only with explicit submission proof', () => {
  assert.equal(background.split('response?.submissionProven !== true').length - 1, 2);
  assert.equal(background.split('throw workerDispatchResponseError(response)').length - 1, 2);
  assert.equal(background.split('worker did not prove prompt submission').length - 1, 1);
  assert.ok(background.includes('const WORKER_DISPATCH_ACK_TIMEOUT_MS = 16 * 60 * 1000;'));
  assert.equal(background.split("worker dispatch acknowledgement timeout')), WORKER_DISPATCH_ACK_TIMEOUT_MS").length - 1, 2);
});

test('there is no five-second fleet send-readiness timeout anymore', () => {
  assert.ok(!worker.includes('SEND_READY_TIMEOUT_MS'));
  assert.ok(worker.includes('function waitForSendButton(timeoutMs)'));
  assert.ok(worker.includes('async function injectPrompt(text, sendReadyTimeoutMs)'));
});

test('hard timeout covers both preparing and running phases', () => {
  assert.ok(worker.includes('const startedAt = Number(active.acceptedAt || active.sentAt || Date.now())'));
  assert.ok(worker.includes("cancelCurrent(AUTO_RECOVERY_REASON_PREFIX + 'hard 15-minute assignment limit exceeded')"));
});
