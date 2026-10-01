'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'fleet-worker.js'), 'utf8');

test('fleet worker supports current ChatGPT assistant turn action rows', () => {
  assert.match(source, /querySelectorAll\('\.turn-action-controls'\)/);
  assert.match(source, /includes\('user-message'\)/);
  assert.match(source, /button\[aria-label="Copy"\]/);
  assert.ok(source.includes('const group = row?.parentElement || null;'));
});

test('fleet worker keeps legacy assistant-role selector as fallback', () => {
  assert.ok(source.includes('[data-message-author-role=\\"assistant\\"]'));
});

test('new assistant turn identity participates in the response fingerprint', () => {
  assert.match(source, /const assistantTurnNodeIds = new WeakMap\(\)/);
  assert.match(source, /fingerprint: assistantTurnNodeId\(node\) \+ ':' \+ fingerprint\(text\)/);
  assert.match(source, /active\.baselineFingerprint = sent\.baseline\.fingerprint/);
});

test('DOM activity forces a throttled rescan but quiet time advances only on assistant change', () => {
  assert.match(source, /if \(active && mutations\.length\)[\s\S]*?active\.textDirty = true;/);
  assert.doesNotMatch(source, /if \(touchedAssistant && active\)[\s\S]*?active\.lastChangeAt = Date\.now\(\)/);
  assert.match(source, /if \(currentFingerprint !== active\.lastFingerprint\)[\s\S]*?active\.lastChangeAt = nowAt/);
});

test('streaming detection is scoped to the composer stop control', () => {
  assert.match(source, /#composer-submit-button\[data-testid="stop-button"\]/);
  assert.ok(!source.includes('document.querySelector("[data-testid=\\"stop-button\\"], button[aria-label*=\\"stop\\" i]")'));
});

test('fleet worker composer adapter matches current ChatGPT textbox and ProseMirror contract', () => {
  assert.match(source, /\[contenteditable="true"\]\[role="textbox"\]/);
  assert.match(source, /\[role="textbox"\]\[aria-multiline="true"\]/);
  assert.match(source, /textarea\[name="prompt-textarea"\]/);
  assert.match(source, /async function writeComposerText\(/);
  assert.match(source, /await waitForComposer\(\)/);
  assert.match(source, /complete worker text could not be appended/);
  assert.match(source, /failed final attachment\/payload verification/);
});

test('fleet worker canonical whitespace verification accepts ProseMirror rendering without weakening token order', () => {
  assert.match(source, /function canonicalComposerText\(value\)/);
  assert.match(source, /normalizedComposerText\(value\)\.replace\(\/\\s\+\/g, ' '\)/);
  assert.match(source, /function composerTextMatches\(editor, expected\)/);
  assert.match(source, /if \(exactCurrent === exactExpected\) return true/);
  assert.match(source, /canonicalComposerText\(current\) === canonicalComposerText\(expected\)/);
});

test('fleet worker separates current ChatGPT prompt echo from assistant response', () => {
  assert.ok(source.includes('const group = row?.parentElement || null;'));
  assert.ok(source.includes('const content = group?.children?.[0] || null;'));
  assert.ok(source.includes('const responseBlocks = content ? [...content.children] : [];'));
  assert.ok(source.includes('responseBlocks[responseBlocks.length - 1]'));
  assert.match(source, /protocol[\s\S]*examples inside the prompt can never be mistaken for outbound messages/);
});


test('worker treats JSON-style completed fleet status as terminal compatibility input', () => {
  const start = source.indexOf('function hasFleetTerminalMarker');
  const end = source.indexOf('function fingerprint', start);
  const block = source.slice(start, end);
  assert.match(block, /FLEET_STATUS\\s\*\\\{/);
  assert.match(block, /done\|completed\|blocked/);
});


test('completion handoff remains busy until background acknowledgment and terminal stale custody can retire it', () => {
  assert.match(source, /pendingCompletion = payload;[\s\S]*active = null;/);
  assert.match(source, /await reportCompletionPayload\(payload\);[\s\S]*clearCompletionHandoff\(payload\.assignmentId\)/);
  assert.match(source, /error\?\.fleetResponse/);
  assert.match(source, /rejection\?\.terminal === true[\s\S]*rejection\?\.code === 'assignment_ownership_mismatch'[\s\S]*rejection\?\.expectedAssignmentId == null/);
});
