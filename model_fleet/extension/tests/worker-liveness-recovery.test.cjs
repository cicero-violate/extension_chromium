'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const extensionDir = path.join(__dirname, '..');
const workerSource = fs.readFileSync(path.join(extensionDir, 'fleet-worker.js'), 'utf8');
const background = fs.readFileSync(path.join(extensionDir, 'background.js'), 'utf8');

function c2Models() {
  const context = {};
  context.globalThis = context;
  for (const file of ['fleet-state-model-m7-c1.js', 'fleet-state-model-m7-c2.js']) {
    vm.runInNewContext(fs.readFileSync(path.join(extensionDir, file), 'utf8'), context, { filename: file });
  }
  return context;
}

function idleState(models, heartbeatAt = 100) {
  const state = models.ModelFleetStateM7C1.freshFleetStateV2({ createdAt: 1 });
  state.workers.W = {
    id: 'W', enabled: true, role: 'implementation', tabId: 7, lastTabId: 7,
    title: 'worker', url: 'https://chatgpt.com/c/test', windowId: 8, activeWindowId: 8,
    name: 'worker', capabilities: [], topologyManaged: true, currentAssignmentId: null, controlInbox: [],
    runtime: { lastHeartbeatAt: heartbeatAt, busy: false, reportedAssignmentId: null },
    fault: null, lifecycle: 'idle', pageBusyUntil: 0, warmIdleSince: 0, warmIdleUntil: 0,
    chatTurnCount: 0, chatRotationPending: false, lastCountedAssignmentId: '', lastChatRotationAt: 0,
    lastChatRotationError: '', progressVersion: 0, completionReleaseLagCount: 0, completionReleaseLagTotalMs: 0,
    completionReleaseLagMaxMs: 0, lastAssignmentReleasedAt: 0, lastResponseTerminalAt: 0, lastResultAt: 0,
    lastCompletionAssignmentId: '', lastCancellationAssignmentId: '', lastCancellationAt: 0,
    lastCancellationReason: '', lastCancellationDisposition: '', lastCancellationTabId: null,
    lastDispatchError: '', lastDispatchFailureAt: 0, dispatchFailureCount: 0, registeredAt: 1,
    staleAt: 0, lastStaleReason: '',
  };
  return models.ModelFleetStateM7C1.normalizeV2FleetState(state);
}

test('worker heartbeat self-heals lost registration instead of permanently going silent', () => {
  const heartbeatStart = workerSource.indexOf('async function heartbeat()');
  const heartbeatEnd = workerSource.indexOf('function startHeartbeat()', heartbeatStart);
  const heartbeat = workerSource.slice(heartbeatStart, heartbeatEnd);
  const startStart = heartbeatEnd;
  const startEnd = workerSource.indexOf('function stopHeartbeat()', startStart);
  const start = workerSource.slice(startStart, startEnd);
  assert.match(heartbeat, /!registered && !\(await ensureRegistered\(\)\)/);
  assert.match(heartbeat, /response\?\.registered === false/);
  assert.doesNotMatch(start, /!registered/);
  assert.match(workerSource, /fleet:ensure-registration/);
  assert.match(workerSource, /REGISTRATION_RETRY_MAX_MS = 30000/);
});

test('explicit unregister disables automatic re-registration', () => {
  const registrationStart = workerSource.indexOf("if (message.type === 'fleet:registration-changed')");
  const registrationEnd = workerSource.indexOf('return false;', registrationStart + 2000);
  const registration = workerSource.slice(registrationStart, registrationEnd + 20);
  assert.match(registration, /registrationEnabled = false/);
  assert.match(registration, /stopHeartbeat\(\)/);
});

test('background bridge health requires both responsiveness and registration', () => {
  const start = background.indexOf('async function ensureResponsiveRegisteredFleetBridge');
  const end = background.indexOf('async function setFleetRecoveryHint', start);
  const code = background.slice(start, end);
  assert.match(code, /response\.registered === true/);
  assert.match(code, /fleet:ensure-registration/);
  assert.match(code, /responsive but registration could not be re-established/);
  const responsiveGuard = code.indexOf('if (existing.responsive === true)');
  const injection = code.indexOf("files: ['fleet-worker.js']");
  assert.ok(responsiveGuard >= 0 && injection > responsiveGuard, 'responsive unregistered bridge is rejected before reinjection');
});

test('stale heartbeat is offline and cannot be scheduled as idle', () => {
  const models = c2Models();
  const state = idleState(models, 100);
  const stale = models.ModelFleetStateM7C2.schedulerWorkerEligibility(state, 'W', { now: 131, heartbeatMaxAgeMs: 30 });
  assert.equal(stale.eligible, false);
  assert.equal(stale.reason, 'availability-offline');
  assert.equal(stale.availability, 'offline');
  const fresh = models.ModelFleetStateM7C2.schedulerWorkerEligibility(state, 'W', { now: 120, heartbeatMaxAgeMs: 30 });
  assert.equal(fresh.eligible, true);
  assert.equal(fresh.availability, 'idle');
});

test('topology reconciliation probes registered bridges, not only tab existence', () => {
  const start = background.indexOf('async function reconcileFleetTopology()');
  const end = background.indexOf('async function', start + 40);
  const code = background.slice(start, end > start ? end : start + 7000);
  const stale = code.indexOf("reconcileStaleWorkerBindings('topology reconciliation')");
  const recover = code.indexOf("recoverRegisteredFleetBridges('topology reconciliation')");
  assert.ok(stale >= 0 && recover > stale);
});

test('scheduler initiates bounded recovery when pending work is blocked by stale heartbeat', () => {
  assert.match(background, /AUTOMATIC_BRIDGE_RECOVERY_COOLDOWN_MS = 15000/);
  assert.match(background, /function staleHeartbeatRecoveryNeededV2/);
  assert.match(background, /eligibility\.reason !== 'availability-offline'/);
  assert.match(background, /recoverRegisteredFleetBridges\('automatic stale-heartbeat recovery'\)/);
  const scheduleStart = background.indexOf('schedule = async function scheduleC3Candidate()');
  const scheduleEnd = background.indexOf('// C4 v2 heartbeat/bridge overlay', scheduleStart);
  const schedule = background.slice(scheduleStart, scheduleEnd);
  assert.match(schedule, /!dispatches\.length && recoveryState/);
  assert.match(schedule, /maybeRecoverStaleDispatchBridgesV2\(recoveryState, now\(\)\)/);
});
