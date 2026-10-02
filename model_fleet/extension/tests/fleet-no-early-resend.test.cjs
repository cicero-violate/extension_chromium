'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const worker = fs.readFileSync(path.join(__dirname, '..', 'fleet-worker.js'), 'utf8');
const content = fs.readFileSync(path.join(__dirname, '..', 'content.js'), 'utf8');

test('fleet has no two-minute automatic resend path', () => {
  assert.doesNotMatch(worker, /START_TIMEOUT_MS/);
  assert.doesNotMatch(worker, /120000/);
  assert.doesNotMatch(worker, /no model response observed before start timeout/);
  assert.match(worker, /const HARD_ASSIGNMENT_TIMEOUT_MS = 15 \* 60 \* 1000/);
});

test('generic delivery-timeout recovery never resends a fleet-managed prompt', () => {
  assert.ok(content.includes("const fleetManaged = /^\\[MODEL FLEET (?:ASSIGNMENT|MESSAGE)\\]/.test(lastUserMessage);"));
  assert.ok(content.includes('fleet-managed delivery timeout left to fleet retry policy'));
});
