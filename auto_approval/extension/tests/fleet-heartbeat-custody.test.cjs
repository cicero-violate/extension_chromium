'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const background = fs.readFileSync(path.join(__dirname, '..', 'background.js'), 'utf8');

function section(source, startText, endText) {
  const start = source.indexOf(startText);
  const end = source.indexOf(endText, start + startText.length);
  assert.ok(start >= 0, 'missing start: ' + startText);
  assert.ok(end > start, 'missing end: ' + endText);
  return source.slice(start, end);
}

test('idle heartbeat reconciles durable assignment custody and requeues work', () => {
  const heartbeat = section(background, 'async function flushWorkerHeartbeats', 'async function updateWorkerHeartbeat');
  assert.match(heartbeat, /activeAssignmentId/);
  assert.match(heartbeat, /heartbeat\.busy !== true[\s\S]*reportedAssignmentId === null[\s\S]*durableAssignmentId[\s\S]*worker\.lifecycle !== 'activating'/);
  assert.match(heartbeat, /releaseWorkerAssignment\(state, workerId, durableAssignmentId/);
  assert.match(heartbeat, /requeue: true/);
  assert.match(heartbeat, /assignment\.heartbeat_reconciled/);
  assert.match(heartbeat, /scheduleNeeded = true/);
});

test('non-null heartbeat custody mismatch fails closed without overwriting assignment ownership', () => {
  const heartbeat = section(background, 'async function flushWorkerHeartbeats', 'async function updateWorkerHeartbeat');
  assert.match(heartbeat, /assignment\.heartbeat_mismatch/);
  assert.match(heartbeat, /worker\.status = 'blocked'/);
  assert.match(heartbeat, /worker\.lastDispatchError = reason/);
  assert.doesNotMatch(heartbeat, /worker\.currentAssignmentId\s*=\s*reportedAssignmentId/);
});

test('completion assignment mismatch is journaled and negatively acknowledged', () => {
  const completion = section(background, 'async function completeAssignment', 'async function flushWorkerHeartbeats');
  assert.match(completion, /assignment\.completion_mismatch/);
  assert.match(completion, /expectedAssignmentId/);
  assert.match(completion, /reportedAssignmentId/);
  assert.match(completion, /ok: false/);
  assert.match(completion, /assignment ownership mismatch/);
});

test('matching completion retains the normal release path', () => {
  const completion = section(background, 'async function completeAssignment', 'async function flushWorkerHeartbeats');
  assert.match(completion, /worker\.currentAssignmentId !== payload\.assignmentId/);
  assert.match(completion, /clearWorkerAssignmentState\(worker\)/);
  assert.match(completion, /worker\.status = 'idle'/);
  assert.match(completion, /return \{ completed: true \}/);
});

test('completion rejection is forwarded to fleet-worker as a negative acknowledgment', () => {
  const handler = section(background, "if (message.type === 'fleet:assignment-complete')", "if (message.type === 'fleet:worker-idle-ready')");
  assert.match(handler, /result\?\.ok === false \? result : \{ snapshot: result \}/);
  assert.doesNotMatch(handler, /then\(\(snapshot\) => \(\{ snapshot \}\)\)/);
});
