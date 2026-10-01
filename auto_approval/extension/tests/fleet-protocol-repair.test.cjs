'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'background.js'), 'utf8');

function section(sourceText, startText, endText) {
  const start = sourceText.indexOf(startText);
  const end = sourceText.indexOf(endText, start + startText.length);
  assert.ok(start >= 0, 'missing start: ' + startText);
  assert.ok(end > start, 'missing end: ' + endText);
  return sourceText.slice(start, end);
}

test('closing-only or otherwise malformed fleet message markers are detectable', () => {
  assert.match(source, /const markerPresent = \/\\\[\\s\*\\\/\?\\s\*FLEET_MESSAGE\\b\/i\.test\(source\)/);
  assert.match(source, /malformedMessageEnvelope: markerPresent && messages\.length === 0/);
});

test('routing failures produce one bounded corrective message to the same agent', () => {
  assert.match(source, /const MAX_PROTOCOL_REPAIR_ATTEMPTS = 1/);
  assert.match(source, /function queueProtocolRepair\(/);
  assert.match(source, /toWorkerId: workerId/);
  assert.match(source, /requiresFleetMessage: true/);
  assert.match(source, /protocolRepairAttempts: used \+ 1/);
  assert.match(source, /FLEET ROUTING FORMAT RETRY/);
  assert.match(source, /Do NOT redo the underlying task or analysis/);
});

test('protocol repair requires an actual routed fleet message', () => {
  assert.match(source, /sourceMessage\?\.requiresFleetMessage && routeResult\.queued\.length === 0/);
  assert.match(source, /This routing-format retry still produced no valid routed FLEET_MESSAGE/);
});

test('invalid and self peer targets are repairable routing failures', () => {
  assert.match(source, /recipient resolves to the sending worker itself/);
  assert.match(source, /recipient is not a currently enabled registered worker/);
  assert.match(source, /message\.route_failed/);
});

test('repair exhaustion stops instead of looping and reports the operator', () => {
  assert.match(source, /used >= MAX_PROTOCOL_REPAIR_ATTEMPTS/);
  assert.match(source, /assignment\.protocol_repair_exhausted/);
  assert.match(source, /message\.protocol_repair_failed/);
  assert.match(source, /Fleet peer-routing repair failed for/);
});

test('successful parsed deliveries remain durably queued before completion releases the worker', () => {
  const start = source.indexOf('async function completeAssignment');
  const end = source.indexOf('async function flushWorkerHeartbeats', start);
  const block = source.slice(start, end);
  assert.ok(block.indexOf('routeParsedMessages(state, workerId, parsed') < block.indexOf('clearWorkerAssignmentState(worker)'));
  assert.match(block, /routedMessageCount: routeResult\.queued\.length/);
});


test('peer protocol shows exact to= syntax and rejects recipient= in instructions', () => {
  const protocol = section(source, 'function fleetProtocolText', 'function coordinatorProtocolText');
  assert.match(protocol, /FLEET_MESSAGE to=/);
  assert.match(protocol, /destination attribute is exactly `to`/);
  assert.match(protocol, /do not rename it to `recipient`/);
});

test('parser tolerates recipient= alias from model output while normalizing it to to', () => {
  const normalize = section(source, 'function normalizeFleetProtocolSource', 'function parseFleetAttributes');
  const attrs = section(source, 'function parseFleetAttributes', 'function parseFleetOutput');
  const parse = section(source, 'function parseFleetOutput', 'function createTaskInState');
  const context = {};
  const sample = '[FLEET_MESSAGE recipient="W-S0015"]\nhello\n[/FLEET_MESSAGE]\n[FLEET_STATUS state="done"]ok[/FLEET_STATUS]';
  vm.runInNewContext(`${normalize}\n${attrs}\n${parse}\nresult = parseFleetOutput(${JSON.stringify(sample)});`, context);
  assert.equal(context.result.messages.length, 1);
  assert.equal(context.result.messages[0].to, 'W-S0015');
  assert.equal(context.result.messages[0].body, 'hello');
  assert.equal(context.result.malformedMessageEnvelope, false);
});
