'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const background = fs.readFileSync(path.join(__dirname, '..', 'background.js'), 'utf8');
const control = fs.readFileSync(path.join(__dirname, '..', 'control-pane.js'), 'utf8');

test('dispatch transport failure blocks the worker instead of tight-loop requeueing', () => {
  assert.match(background, /worker\.status = worker\.enabled \? \(blockWorker \? 'blocked' : 'idle'\) : 'offline'/);
  assert.match(background, /if \(!failure\?\.workerBlocked\)/);
  assert.match(background, /target worker blocked after dispatch failure/);
});

test('public snapshot preserves blocked status when no assignment is active', () => {
  assert.match(background, /worker\.status === 'blocked' \? 'blocked'/);
});

test('journal and exceptions expose dispatch errors', () => {
  assert.match(control, /event\.detail\?\.error/);
  assert.match(control, /worker\.lastDispatchError/);
});


test('heartbeat batching preserves a blocked worker', () => {
  assert.match(background, /!worker\.currentAssignmentId && worker\.status !== 'blocked'/);
});


test('successful dispatch clears stale failure diagnostics', () => {
  assert.match(background, /worker\.status = 'running'[\s\S]*?worker\.lastDispatchError = ''[\s\S]*?worker\.dispatchFailureCount = 0[\s\S]*?worker\.lastDispatchFailureAt = 0/);
});
