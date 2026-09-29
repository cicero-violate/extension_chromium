'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'control-pane.html'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, '..', 'control-pane.js'), 'utf8');

test('message history uses nested tabs instead of stacked sections', () => {
  for (const view of ['all', 'operator', 'traffic']) {
    assert.ok(html.includes('data-message-view="' + view + '"'));
    assert.ok(html.includes('data-message-view-panel="' + view + '"'));
  }
  assert.match(js, /function setMessageView\(requested, persist = true\)/);
});

test('natural-language bus lives with the operator inbox tab', () => {
  const operatorStart = html.indexOf('data-message-view-panel="operator"');
  const operatorEnd = html.indexOf('data-message-view-panel="traffic"');
  const operator = html.slice(operatorStart, operatorEnd);
  assert.match(operator, /Natural-language bus/);
  assert.match(operator, /Operator inbox/);
  assert.match(operator, /id="messageTarget"/);
});

test('nested message tab choice persists and supports keyboard navigation', () => {
  assert.match(js, /modelFleetControl:messageView:v1/);
  assert.match(js, /els\.messageViewTabs\.addEventListener\('keydown'/);
  assert.match(js, /ArrowLeft/);
  assert.match(js, /ArrowRight/);
});
