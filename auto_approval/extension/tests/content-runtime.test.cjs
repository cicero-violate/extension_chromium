'use strict';

const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'content.js'), 'utf8');

test('content script exits cleanly when the extension runtime is unavailable', () => {
  const warnings = [];
  const context = {
    chrome: {},
    console: {
      warn: (...args) => warnings.push(args),
    },
  };
  context.globalThis = context;

  assert.doesNotThrow(() => vm.runInNewContext(source, context));
  assert.equal(warnings.length, 1);
  assert.match(String(warnings[0][0]), /runtime unavailable/i);
});
