'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'background.js'), 'utf8');

test('fleet task prompts include configured repository workspace path', () => {
  assert.match(source, /workspacePath/);
  assert.match(source, /Repository workspace path:/);
  assert.match(source, /state\.workspacePath/);
});
