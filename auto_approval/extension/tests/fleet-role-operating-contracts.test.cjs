const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const background = fs.readFileSync(path.resolve(__dirname, '..', 'background.js'), 'utf8');

function section(start, end) {
  const a = background.indexOf(start);
  const b = background.indexOf(end, a + start.length);
  assert.ok(a >= 0, 'missing start ' + start);
  assert.ok(b > a, 'missing end ' + end);
  return background.slice(a, b);
}

test('common operating contract fixes authority to registered worker role', () => {
  const common = section('const COMMON_ROLE_OPERATING_INSTRUCTIONS', 'const ROLE_IDS');
  assert.match(common, /role identity and authority are fixed by your registered worker role/i);
  assert.match(common, /does not change your role or authority/);
  assert.match(common, /Prefer updating or handing off existing work over creating parallel duplicate work/);
  assert.match(common, /Do not send acknowledgement-only peer messages/);
  assert.match(common, /PENDING_FINAL_REVERIFY/);
  assert.match(common, /ALREADY_REPAIRED \/ NO CHANGE/);
});

test('Coordinator operating contract is closure-oriented and duplicate-resistant', () => {
  const roles = section('const ROLE_OPERATING_INSTRUCTIONS', 'const ROLE_IDS');
  assert.match(roles, /Run the fleet toward closure, not task accumulation/);
  assert.match(roles, /one canonical owner\/work item per logical work family/);
  assert.match(roles, /Do not create duplicate implementation work/);
  assert.match(roles, /When Implementation is saturated, stop adding implementation work/);
  assert.match(roles, /Route implementation candidates only to Verifier \/ Integrator/);
  assert.match(roles, /repaired, regression-only, superseded/);
});

test('three-role operating contracts preserve planning, implementation, and independent acceptance', () => {
  const roles = section('const ROLE_OPERATING_INSTRUCTIONS', 'const ROLE_IDS');
  assert.match(roles, /bounded research/);
  assert.match(roles, /architecture, invariants, and migration design/);
  assert.match(roles, /ALREADY_REPAIRED \/ NO CHANGE/);
  assert.match(roles, /actively try to falsify the candidate/);
  assert.match(roles, /PENDING_FINAL_REVERIFY/);
  assert.match(roles, /Maintain one canonical reconciled snapshot/);
  assert.match(roles, /perform canonical integration or release/);
});

test('all assignment surfaces carry registered role operating instructions', () => {
  const task = section('function buildTaskPrompt', 'function buildMessagePrompt');
  const message = section('function buildMessagePrompt', 'function buildControlPrompt');
  const control = section('function buildControlPrompt', 'function normalizeFleetProtocolSource');
  assert.match(task, /workerRoleOperatingPrompt\(worker\)/);
  assert.match(task, /Requested task contract purpose:/);
  assert.match(task, /Registered worker authority scope:/);
  assert.match(message, /workerRoleOperatingPrompt\(worker\)/);
  assert.match(control, /workerRoleOperatingPrompt\(worker\)/);
});
