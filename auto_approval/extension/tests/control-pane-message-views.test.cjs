'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'control-pane.html'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, '..', 'control-pane.js'), 'utf8');

test('messages view includes a combined all-threads inbox', () => {
  assert.match(html, /id="allThreads"/);
  assert.match(html, /id="allThreadsCount"/);
  assert.match(js, /const allThreads = sortMessages\(list, els\.allThreadsSort\.value\)/);
});

test('message sections expose newest and oldest sort controls', () => {
  for (const id of ['allThreadsSort', 'inboxSort', 'trafficSort']) {
    assert.ok(html.includes('id="' + id + '"'));
  }
  assert.match(js, /function sortMessages\(list, direction\)/);
  assert.match(js, /direction === 'oldest'/);
});

test('operator inbox and semantic traffic remain disjoint projections', () => {
  assert.match(js, /message\.toWorkerId === 'operator'/);
  assert.match(js, /message\.toWorkerId !== 'operator'/);
});


test('worker selector identifies each worker role', () => {
  assert.match(js, /const role = String\(worker\?\.role \|\| 'generalist'\)/);
  assert.match(js, /return `\$\{worker\.id\} · \$\{role\} · \$\{context\}`/);
});
