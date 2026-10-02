'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'control-pane.js'), 'utf8');

test('workspace path initialization stays inside the control-pane closure', () => {
  const closureEnd = source.lastIndexOf('})();');
  const loadCall = source.lastIndexOf('loadWorkspacePath();');
  assert.ok(loadCall >= 0, 'missing loadWorkspacePath initialization');
  assert.ok(loadCall < closureEnd, 'loadWorkspacePath must execute before the IIFE closes');
  assert.doesNotMatch(source.slice(closureEnd + 5), /loadWorkspacePath\s*\(/);
});
