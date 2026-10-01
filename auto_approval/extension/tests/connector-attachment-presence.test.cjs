'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const contentSource = fs.readFileSync(path.join(__dirname, '..', 'content.js'), 'utf8');
const backgroundSource = fs.readFileSync(path.join(__dirname, '..', 'background.js'), 'utf8');

test('connector attachment detection is explicit and not only heuristic', () => {
  assert.match(
    contentSource,
    /connectorAttachmentPresent|approval:get-turn-signal|attachment/i,
    'content path should expose or consume an attachment verification signal'
  );
});

test('send guard should not rely only on composer text heuristics', () => {
  assert.doesNotMatch(
    contentSource,
    /if\s*\([^)]*composer[^)]*\.textContent[^)]*\)\s*return/,
    'send gating should not use only composer text content'
  );
});

test('background runtime should contain connector state bridge', () => {
  assert.match(
    backgroundSource,
    /chrome\.runtime|onMessage|sendMessage/,
    'background bridge should exist for verified connector state'
  );
});
