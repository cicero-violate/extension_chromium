'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const background = fs.readFileSync(path.join(__dirname, '..', 'background.js'), 'utf8');
const controlHtml = fs.readFileSync(path.join(__dirname, '..', 'control-pane.html'), 'utf8');
const controlJs = fs.readFileSync(path.join(__dirname, '..', 'control-pane.js'), 'utf8');
const popupHtml = fs.readFileSync(path.join(__dirname, '..', 'popup.html'), 'utf8');
const popupJs = fs.readFileSync(path.join(__dirname, '..', 'popup.js'), 'utf8');

test('fleet exposes seven canonical roles with a default total of twelve', () => {
  for (const role of ['coordinator', 'research', 'architect', 'implementation', 'review', 'test', 'integrator']) {
    assert.match(background, new RegExp("id: '" + role + "'"));
  }
  const defaults = [...background.matchAll(/defaultCount:\s*(\d+)/g)].map((match) => Number(match[1]));
  assert.deepEqual(defaults.slice(0, 7), [1, 2, 1, 3, 2, 2, 1]);
  assert.equal(defaults.slice(0, 7).reduce((a, b) => a + b, 0), 12);
});

test('public snapshot is the role catalog authority for both UIs', () => {
  assert.match(background, /roleCatalog:\s*ROLE_CATALOG\.map/);
  assert.match(controlJs, /source\.roleCatalog/);
  assert.match(controlJs, /function roleOptions\(selected = ''\)/);
  assert.match(popupJs, /send\('fleet:get-snapshot'\)/);
  assert.match(popupJs, /fleetResponse\.snapshot\?\.roleCatalog/);
  assert.doesNotMatch(popupHtml, /option value="(?:coordinator|research|implementation|review|test)"/);
});

test('scheduler requires exact role and coordinator is not a specialist fallback', () => {
  assert.match(background, /if \(workerRole === taskRole\) return 0/);
  assert.doesNotMatch(background, /workerRole === 'coordinator'\) return 1/);
  assert.doesNotMatch(background, /taskRole === 'coordinator'\) return workerRole/);
  assert.match(background, /return Number\.POSITIVE_INFINITY/);
  assert.match(background, /const taskRole = canonicalRole\(task\.role\)/);
});

test('peer routing does not silently truncate enabled workers', () => {
  const start = background.indexOf('function peerSummary');
  const end = background.indexOf('function fleetProtocolText', start);
  const body = background.slice(start, end);
  assert.ok(start >= 0 && end > start);
  assert.doesNotMatch(body, /\.slice\(0,\s*12\)/);
  assert.match(body, /\.filter\(\(w\) => w\.enabled/);
});

test('topology UI exposes per-role decrement/increment controls and reconciliation', () => {
  assert.match(controlHtml, /id="roleTargets"/);
  assert.match(controlHtml, /id="reconcileFleet"/);
  assert.match(controlJs, /data-action="role-minus"/);
  assert.match(controlJs, /data-action="role-plus"/);
  assert.match(controlJs, /fleet:set-topology-role-count/);
  assert.match(controlJs, /fleet:reconcile-topology/);
});

test('missing workers are created as new Chromium windows, not tabs', () => {
  const start = background.indexOf('async function createTopologyWorker');
  const end = background.indexOf('async function removeTopologyWorker', start);
  const body = background.slice(start, end);
  assert.ok(start >= 0 && end > start);
  assert.match(body, /chrome\.windows\.create/);
  assert.doesNotMatch(body, /chrome\.tabs\.create/);
  assert.match(body, /topologyManaged:\s*true/);
});

test('topology reduction only selects managed idle non-busy workers', () => {
  const start = background.indexOf('async function reconcileFleetTopology');
  const end = background.indexOf('async function registerAllSupportedTabs', start);
  const body = background.slice(start, end);
  assert.ok(start >= 0 && end > start);
  assert.match(body, /worker\.topologyManaged === true/);
  assert.match(body, /!worker\.currentAssignmentId/);
  assert.match(body, /!workerBusyIsFresh\(worker\)/);
  assert.match(body, /deferredRemovals/);
});

test('manual workers count toward desired role capacity', () => {
  const start = background.indexOf('function roleCountsForWorkers');
  const end = background.indexOf('async function setTopologyRoleCount', start);
  const body = background.slice(start, end);
  assert.ok(start >= 0 && end > start);
  assert.match(body, /Object\.values\(state\.workers\)/);
  assert.doesNotMatch(body, /topologyManaged/);
});
