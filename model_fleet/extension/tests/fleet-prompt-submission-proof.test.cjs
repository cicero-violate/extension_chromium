'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'fleet-worker.js'), 'utf8');
const start = source.indexOf('function normalizedTurnText');
const end = source.indexOf('function writeCompletionHandoff', start);
assert.ok(start >= 0 && end > start, 'submission-proof helper block missing');
const helperSource = source.slice(start, end);

function turn(text) {
  return { innerText: text, textContent: text };
}

function harness(initialTurns = []) {
  const state = { turns: [...initialTurns] };
  const context = {
    document: {
      querySelectorAll() {
        return state.turns;
      },
    },
    normalizeFleetProtocolSource(value) {
      return String(value || '');
    },
    setTimeout,
    clearTimeout,
    Date,
    Promise,
    SUBMISSION_UNPROVEN_AFTER_CLICK_CODE: 'FLEET_SUBMISSION_UNPROVEN_AFTER_CLICK',
    result: null,
  };
  vm.runInNewContext(
    helperSource + '\nresult = { promptTextObserved, assignmentPromptObserved, waitForPromptSubmission };',
    context,
  );
  return { state, ...context.result };
}

test('new matching user turn proves submission', async () => {
  const oldTurn = turn('old');
  const matching = turn('fleet prompt');
  const h = harness([oldTurn, matching]);
  assert.equal(await h.waitForPromptSubmission('fleet prompt', oldTurn, 20), matching);
});

test('composer clearing without a new user turn does not prove submission', async () => {
  const oldTurn = turn('old');
  const h = harness([oldTurn]);
  assert.equal(await h.waitForPromptSubmission('fleet prompt', oldTurn, 10), null);
});

test('unrelated new user turn fails closed', async () => {
  const oldTurn = turn('old');
  const unrelated = turn('human typed something else');
  const h = harness([oldTurn, unrelated]);
  await assert.rejects(
    h.waitForPromptSubmission('fleet prompt', oldTurn, 20),
    /did not match the fleet prompt/,
  );
});

test('old matching user turn already present is not accepted as new proof', async () => {
  const oldMatching = turn('fleet prompt');
  const h = harness([oldMatching]);
  assert.equal(await h.waitForPromptSubmission('fleet prompt', oldMatching, 10), null);
});

test('delayed new matching user turn proves submission', async () => {
  const oldTurn = turn('old');
  const matching = turn('fleet prompt');
  const h = harness([oldTurn]);
  setTimeout(() => h.state.turns.push(matching), 5);
  assert.equal(await h.waitForPromptSubmission('fleet prompt', oldTurn, 100), matching);
});

test('matching helper preserves long-prompt head/tail compatibility', () => {
  const expected = 'A'.repeat(200) + ' middle ' + 'Z'.repeat(200);
  const rendered = 'prefix ' + expected.slice(0, 240) + ' omitted ' + expected.slice(-240) + ' suffix';
  const h = harness([turn(rendered)]);
  assert.equal(h.promptTextObserved(expected), true);
});
