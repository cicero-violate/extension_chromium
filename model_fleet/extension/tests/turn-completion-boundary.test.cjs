'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'content.js'), 'utf8');

test('completion detection prefers the outer conversation-turn over inner article', () => {
  assert.match(
    source,
    /latest\.closest\('\[data-testid\^="conversation-turn-"\], \[data-testid\*="conversation-turn"\]'\)[\s\S]*?latest\.closest\('article'\)/,
  );
  assert.doesNotMatch(
    source,
    /latest\.closest\('article, \[data-testid\*="conversation-turn"\]'\)/,
  );
});

test('native final-turn actions include ChatGPT copy-turn action', () => {
  assert.match(source, /copy-turn-action-button/);
});

test('fresh response-complete signal can satisfy final UI completion without native action row', () => {
  assert.match(
    source,
    /function hasFreshUiCompletionSignal\(\)[\s\S]*?repeatUiCompletionAt >= repeatAssistantChangedAt/
  );
  assert.match(
    source,
    /if \(!hasNativeFinalTurnActions\(\) && !hasFreshUiCompletionSignal\(\)\) return false;/
  );
});
