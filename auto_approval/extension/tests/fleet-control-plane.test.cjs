'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const background = fs.readFileSync(path.join(__dirname, '..', 'background.js'), 'utf8');
const controlHtml = fs.readFileSync(path.join(__dirname, '..', 'control-pane.html'), 'utf8');
const controlJs = fs.readFileSync(path.join(__dirname, '..', 'control-pane.js'), 'utf8');

function section(startText, endText) {
  const start = background.indexOf(startText);
  const end = background.indexOf(endText, start + startText.length);
  assert.ok(start >= 0, 'start section not found: ' + startText);
  assert.ok(end > start, 'end section not found: ' + endText);
  return background.slice(start, end);
}

test('legacy tab-derived workers migrate to durable W-S slots and rewrite references', () => {
  const body = section('function normalizeFleetState', 'async function loadFleetState');
  assert.match(body, /W-S/);
  assert.match(body, /allocateNormalizedSlot/);
  assert.match(body, /legacyWorkerId/);
  assert.match(body, /task\.assignedWorkerId = rewriteWorkerRef/);
  assert.match(body, /task\.completedByWorkerId = rewriteWorkerRef/);
  assert.match(body, /message\.fromWorkerId = rewriteWorkerRef/);
  assert.match(body, /message\.toWorkerId = rewriteWorkerRef/);
  assert.match(body, /nextWorkerSlot/);
});

test('same bound tab and stale same-tab binding reuse durable identity', () => {
  const body = section('function upsertWorker', 'async function registerTab');
  assert.match(body, /const bound = workerForTab\(state, tab\.id\)/);
  assert.match(body, /staleSameTab/);
  assert.match(body, /worker\.lastTabId === tab\.id/);
  assert.match(body, /allocateWorkerSlot/);
});

test('closed tabs preserve durable slots as stale rather than unregistering them', () => {
  const lifecycle = section('chrome.tabs.onRemoved.addListener', 'chrome.tabs.onUpdated.addListener');
  assert.match(lifecycle, /markWorkerBindingStale/);
  assert.doesNotMatch(lifecycle, /unregisterWorker/);
  const stale = section('function releaseWorkerBinding', 'async function markWorkerBindingStale');
  assert.match(stale, /worker\.lastTabId/);
  assert.match(stale, /worker\.tabId = null/);
  assert.match(stale, /worker\.status = 'stale'/);
  assert.doesNotMatch(stale, /delete state\.workers/);
});

test('stale slots do not satisfy live role capacity', () => {
  const body = section('function roleCountsForWorkers', 'async function setTopologyRoleCount');
  assert.match(body, /worker\.lifecycle === 'stale'/);
  assert.match(body, /!Number\.isInteger\(worker\.tabId\)/);
  assert.match(controlJs, /staleCounts/);
});

test('topology reconciliation checks stale bindings before capacity', () => {
  const body = section('async function reconcileFleetTopology', 'async function focusWorker');
  assert.match(body, /await reconcileStaleWorkerBindings\('topology reconciliation'\)/);
  const upsert = section('function upsertWorker', 'async function registerTab');
  assert.ok(upsert.indexOf('staleManaged') >= 0);
  assert.ok(upsert.indexOf('allocateWorkerSlot') > upsert.indexOf('staleManaged'));
});

test('legacy sleep cleanup preserves custom topology', () => {
  const body = section('async function cleanupLegacySleepTabs', 'async function settleWorkerIdle');
  assert.doesNotMatch(body, /state\.topology\s*=\s*\{\}/);
  assert.doesNotMatch(body, /desiredRoleCounts\s*=/);
  assert.match(body, /delete worker\.sleepTabId/);
});

test('broad register-all adoption is removed', () => {
  assert.doesNotMatch(background, /message\.type === 'fleet:register-all-tabs'/);
  assert.doesNotMatch(controlHtml, /Register all ChatGPT tabs/i);
  assert.doesNotMatch(controlJs, /fleet:register-all-tabs/);
  assert.match(background, /message\.type === 'fleet:register-own-worker'/);
});

test('role catalog exposes machine-readable contracts', () => {
  for (const field of ['purpose', 'claimTypes', 'authorityScope', 'prohibitedActions', 'allowedHandoffs', 'requiresIndependentVerification']) {
    assert.match(background, new RegExp(field + ':'));
  }
  assert.match(background, /Canonical integration and release authority/);
  assert.match(background, /roleCatalog:\s*ROLE_CATALOG\.map/);
  assert.match(controlHtml, /id="roleContracts"/);
});

test('review and test assignments require independent workers', () => {
  const gate = section('function taskBlockReason', 'function taskRunnable');
  assert.match(gate, /\['review', 'test'\]\.includes\(taskRole\)/);
  assert.match(gate, /completedByWorkerId/);
  assert.match(gate, /requires an independent worker/);
  const rank = section('function workerMatchRank', 'function workerMatches');
  assert.match(rank, /taskBlockReason\(state, task, worker\)/);
});

test('integrator tasks require verification dependencies and separation', () => {
  const gate = section('function taskBlockReason', 'function taskRunnable');
  assert.match(gate, /integrator tasks require at least one direct dependency/);
  assert.match(gate, /direct review or test dependency/);
  assert.match(gate, /independent from dependency completers/);
  const create = section('function createTaskInState', 'function queueSemanticMessage');
  assert.match(create, /task\.role === 'integrator'/);
  assert.match(create, /direct review or test dependency/);
  const handler = section("if (message.type === 'fleet:create-task')", "if (message.type === 'fleet:retry-task')");
  assert.match(handler, /createTaskInState/);
});

test('active worker role cannot change', () => {
  const body = section("if (message.type === 'fleet:set-worker-role')", "if (message.type === 'fleet:set-topology-role-count')");
  assert.match(body, /cannot change role while worker owns an active assignment/);
});

test('handoffs use effective task role and reject disallowed destinations', () => {
  const body = section('function routeParsedMessages', 'function protocolRepairReason');
  assert.match(body, /relatedTask/);
  assert.match(body, /roleContract\(relatedTask\?\.role \|\| source\?\.role\)/);
  assert.match(body, /allowedHandoffs/);
  assert.match(body, /not allowed to hand off/);
  const completion = section('async function completeAssignment', 'async function flushWorkerHeartbeats');
  assert.match(completion, /sourceMessage\?\.taskId/);
});

test('task prompt carries role contract and separation of duty', () => {
  const body = section('function buildTaskPrompt', 'function buildMessagePrompt');
  assert.match(body, /Requested task role:/);
  assert.match(body, /Active role contract purpose:/);
  assert.match(body, /Active role authority scope:/);
  assert.match(body, /Active role claim types:/);
  assert.match(body, /Active role prohibited actions:/);
  assert.match(body, /Active role allowed handoffs:/);
  assert.match(body, /Separation of duty:/);
});

test('workflow gate reason is exposed to the control page', () => {
  const body = section('function publicSnapshot', 'async function broadcastSnapshot');
  assert.match(body, /workflowBlockReason/);
  assert.match(body, /taskBlockReason\(state, task\)/);
  assert.match(controlJs, /task\.workflowBlockReason/);
  assert.match(controlJs, /workflow blocked:/);
});

test('startup reconciles stale bindings without auto-creating fleet windows', () => {
  const lifecycle = background.slice(background.indexOf('chrome.runtime.onInstalled.addListener'));
  assert.match(lifecycle, /reconcileStaleWorkerBindings\('browser startup'\)/);
  assert.match(lifecycle, /reconcileStaleWorkerBindings\('service worker load'\)/);
  assert.match(lifecycle, /recoverRegisteredFleetBridges\('service worker load'\)/);
  assert.doesNotMatch(lifecycle, /reconcileFleetTopology\(/);
});
