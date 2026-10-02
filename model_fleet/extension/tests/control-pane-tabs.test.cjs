'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'control-pane.html'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, '..', 'control-pane.js'), 'utf8');

test('control pane exposes four focused top-level views', () => {
  for (const view of ['overview', 'tasks', 'messages', 'diagnostics']) {
    assert.ok(html.includes('data-view="' + view + '"'));
    assert.ok(html.includes('data-view-panel="' + view + '"'));
  }
  assert.match(js, /function setView\(requested, persist = true\)/);
  assert.match(js, /modelFleetControl:view:v1/);
});

test('worker cards show the browser tab title as their primary label', () => {
  assert.match(js, /function workerTabTitle\(worker\)/);
  assert.match(js, /class="name tab-name"/);
  assert.match(js, /worker\?\.title/);
});

test('tab navigation supports keyboard traversal', () => {
  assert.match(js, /ArrowLeft/);
  assert.match(js, /ArrowRight/);
  assert.match(js, /aria-selected/);
});
