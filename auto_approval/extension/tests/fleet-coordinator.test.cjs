'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const background = fs.readFileSync(path.join(__dirname, '..', 'background.js'), 'utf8');
const control = fs.readFileSync(path.join(__dirname, '..', 'control-pane.js'), 'utf8');
const popup = fs.readFileSync(path.join(__dirname, '..', 'popup.js'), 'utf8');

function section(startText, endText) {
  const start = background.indexOf(startText);
  const end = background.indexOf(endText, start + startText.length);
  assert.ok(start >= 0, 'missing start: ' + startText);
  assert.ok(end > start, 'missing end: ' + endText);
  return background.slice(start, end);
}

test('Coordinator replaces Generalist while preserving legacy state migration', () => {
  assert.match(background, /id: 'coordinator', label: 'Coordinator', defaultCount: 1/);
  assert.doesNotMatch(background, /id: 'generalist', label: 'Generalist'/);
  assert.match(background, /if \(value === 'generalist'\) return 'coordinator'/);
  assert.match(background, /migratedCounts\.coordinator === undefined && migratedCounts\.generalist !== undefined/);
  assert.doesNotMatch(control, /'generalist'/);
  assert.doesNotMatch(popup, /'generalist'/);
});

test('Coordinator contract is orchestration-only and names the five-stage loop', () => {
  const catalog = section('const ROLE_CATALOG', 'const ROLE_IDS');
  assert.match(catalog, /decompose goals, route work, observe results, replan the DAG, and escalate unresolved decisions/);
  assert.match(catalog, /Workflow orchestration and child-task creation only/);
  assert.match(catalog, /implement specialist work/);
  assert.match(catalog, /perform canonical integration or release/);
});

test('scheduler has no coordinator specialist fallback', () => {
  const rank = section('function workerMatchRank', 'function workerMatches');
  assert.match(rank, /if \(workerRole === taskRole\) return 0/);
  assert.doesNotMatch(rank, /workerRole === 'coordinator'.*return 1/);
  assert.doesNotMatch(rank, /taskRole === 'coordinator'.*return workerRole/);
  assert.match(rank, /return Number\.POSITIVE_INFINITY/);
});

test('Coordinator assignment prompt carries the explicit control loop and FLEET_TASK syntax', () => {
  const protocol = section('function coordinatorProtocolText', 'function buildTaskPrompt');
  for (const stage of ['DECOMPOSE', 'ROUTE', 'OBSERVE', 'REPLAN', 'ESCALATE']) {
    assert.match(protocol, new RegExp(stage));
  }
  assert.match(protocol, /FLEET_TASK role=/);
  assert.match(protocol, /do not create coordinator child tasks/);
});

test('fleet output parser accepts FLEET_TASK envelopes with role title dependencies and priority', () => {
  const parser = section('function parseFleetAttributes', 'function createTaskInState');
  assert.match(parser, /FLEET_TASK/);
  assert.match(parser, /attrs\.role/);
  assert.match(parser, /attrs\.title/);
  assert.match(parser, /attrs\.depends/);
  assert.match(parser, /attrs\.priority/);
  assert.match(parser, /taskMarkerPresent/);
});

test('only Coordinator can create model-emitted child tasks', () => {
  const route = section('function routeCoordinatorTasks', 'function protocolRepairReason');
  assert.match(route, /effectiveRole !== 'coordinator'/);
  assert.match(route, /only Coordinator may create child tasks/);
  assert.match(route, /allowCoordinator: false/);
  assert.match(route, /createdByRole: 'coordinator'/);
});

test('Coordinator child DAG supports local aliases to earlier child tasks', () => {
  const route = section('function routeCoordinatorTasks', 'function protocolRepairReason');
  assert.match(route, /const aliases = new Map/);
  assert.match(route, /token\.startsWith\('\$'\)/);
  assert.match(route, /aliases\.has\(alias\)/);
  assert.match(route, /child-task aliases may reference only earlier FLEET_TASK keys/);
});

test('Coordinator cannot recursively create Coordinator child tasks', () => {
  const create = section('function createTaskInState', 'function queueSemanticMessage');
  assert.match(create, /!allowCoordinator && taskRole === 'coordinator'/);
  assert.match(create, /coordinator may not create coordinator child tasks/);
});

test('child-task creation failures feed back to Coordinator for replanning', () => {
  const completion = section('async function completeAssignment', 'async function flushWorkerHeartbeats');
  assert.match(completion, /routeCoordinatorTasks/);
  assert.match(completion, /COORDINATOR CHILD-TASK CREATION FAILURE/);
  assert.match(completion, /Observe the failure, replan/);
  assert.match(completion, /childTaskCount/);
  assert.match(completion, /childTaskFailureCount/);
});

test('all specialist roles can report back to Coordinator', () => {
  const catalog = section('const ROLE_CATALOG', 'const ROLE_IDS');
  for (const role of ['research', 'architect', 'implementation', 'review', 'test', 'integrator']) {
    const line = catalog.split('\n').find((item) => item.includes("id: '" + role + "'"));
    assert.ok(line, 'missing role ' + role);
    assert.match(line, /allowedHandoffs: \[[^\]]*'coordinator'/);
  }
});

test('default topology remains twelve workers with one Coordinator', () => {
  const defaults = [...background.matchAll(/defaultCount:\s*(\d+)/g)].slice(0, 7).map((m) => Number(m[1]));
  assert.deepEqual(defaults, [1, 2, 1, 3, 2, 2, 1]);
  assert.equal(defaults.reduce((a, b) => a + b, 0), 12);
});
