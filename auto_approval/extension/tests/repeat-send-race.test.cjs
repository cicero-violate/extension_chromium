'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'content.js'), 'utf8');

test('repeat captures assistant baseline before clicking Send', () => {
  const fnStart = source.indexOf('async function sendRepeatMessage()');
  const fnEnd = source.indexOf('async function tick()', fnStart);
  assert.ok(fnStart >= 0 && fnEnd > fnStart);
  const body = source.slice(fnStart, fnEnd);

  const reset = body.lastIndexOf('resetRepeatObservation();');
  const click = body.lastIndexOf('sendBtn.click();');

  assert.ok(reset >= 0, 'repeat send must reset observation');
  assert.ok(click >= 0, 'repeat send must click Send');
  assert.ok(reset < click, 'assistant baseline must be captured before click');
});

test('successful repeat caller does not reset observation after click', () => {
  const tickStart = source.indexOf('async function tick()');
  const tick = source.slice(tickStart);
  const success = tick.indexOf('repeatMessageSent += 1;');
  assert.ok(success >= 0);
  const afterSuccess = tick.slice(success, success + 700);
  assert.doesNotMatch(afterSuccess, /resetRepeatObservation\(\)/);
});
