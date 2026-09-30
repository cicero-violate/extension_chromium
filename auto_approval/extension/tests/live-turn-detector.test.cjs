'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'content.js'), 'utf8');

test('current ChatGPT turn completion uses turn-action-controls', () => {
  assert.match(source, /querySelectorAll\('\.turn-action-controls'\)/);
  assert.match(source, /includes\('user-message'\)/);
  assert.match(source, /button\[aria-label="Copy"\]/);
});

test('legacy assistant role remains compatibility fallback', () => {
  assert.match(source, /data-message-author-role="assistant"/);
  assert.match(source, /Current ChatGPT DOM \(2026\)/);
});
