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

test('recovered assignment uses the live assistant baseline', () => {
  const start = workerSource.indexOf('async function recoverAssignment(assignment)');
  const end = workerSource.indexOf('async function executeAssignment(assignment)', start);
  const code = workerSource.slice(start, end);
  assert.ok(code.includes('const baseline = latestAssistantSnapshot(true)'));
  assert.ok(code.includes('baselineFingerprint: baseline.fingerprint'));
  assert.ok(!code.includes('__fleet_context_recovery__'));
});

test('recovered response is bound after the latest matching user prompt', () => {
  assert.ok(workerSource.includes('function assistantSnapshotFollowsLatestUserTurn'));
  assert.ok(workerSource.includes('DOCUMENT_POSITION_FOLLOWING'));
  assert.ok(workerSource.includes('function recoveredResponseBelongsToAssignment'));
});

test('Thinking shimmer is diagnostic only; Stop control is authoritative streaming evidence', () => {
  assert.ok(workerSource.includes('function hasActiveThinkingIndicator'));
  assert.ok(workerSource.includes('cadencedShimmer'));
  const start = workerSource.indexOf('function isStreaming()');
  const end = workerSource.indexOf('function turnLivenessNode', start);
  const code = workerSource.slice(start, end);
  assert.ok(code.includes('return hasActiveStopControl()'));
  assert.ok(!code.includes('hasActiveThinkingIndicator()'));
});

test('bridge recovery carries immediate page busy proof', () => {
  assert.ok(workerSource.includes('sampleTurnLiveness()'));
  assert.ok(background.includes('const bridge = await ensureFleetBridge(worker.tabId)'));
  assert.ok(background.includes('busy: bridge?.busy === true'));
});

test('post-reload monitor requires recovered current-turn proof before completion', () => {
  assert.ok(workerSource.includes('active.recoveredAfterExtensionReload && active.sawStreaming && !active.responseChanged'));
  assert.ok(workerSource.includes('recoveredResponseBelongsToAssignment(active.assignment, recoveredSnapshot)'));
});

test('busy availability overrides preserved warm-idle display state', () => {
  const c16 = fs.readFileSync(path.join(extensionDir, 'fleet-state-model-m7-c16.js'), 'utf8');
  const displayStart = c16.indexOf('function displayStatus');
  const displayEnd = c16.indexOf('function projectWorkerFromNormalized', displayStart);
  const display = c16.slice(displayStart, displayEnd);
  assert.ok(display.indexOf("worker.availability === 'busy'") < display.indexOf("worker.lifecycleDisplay === 'warm-idle'"));
  assert.ok(display.includes("worker.availability === 'busy') return 'busy'"));
});

test('busy availability counts as active role occupancy', () => {
  const c16 = fs.readFileSync(path.join(extensionDir, 'fleet-state-model-m7-c16.js'), 'utf8');
  assert.ok(c16.includes("worker.availability === 'running' || worker.availability === 'busy'"));
});

test('control pane counts and renders unowned runtime busy workers as active BUSY', () => {
  const pane = fs.readFileSync(path.join(extensionDir, 'control-pane.js'), 'utf8');
  assert.ok(pane.includes("worker.currentAssignmentId || worker.availability === 'running' || worker.availability === 'busy' || worker.runtimeBusy === true"));
  assert.ok(pane.includes("worker.availability === 'busy' || worker.runtimeBusy === true ? 'busy'"));
  assert.ok(pane.includes("status === 'running' || status === 'waking' || status === 'busy'"));
});

test('unowned busy to idle transition resets continuation dedupe and schedules reconciliation', () => {
  const start = background.indexOf('flushWorkerHeartbeats = async function flushWorkerHeartbeatsC4()');
  const end = background.indexOf('updateWorkerHeartbeat = async function updateWorkerHeartbeatC4', start);
  const code = background.slice(start, end);
  assert.ok(code.includes('const unownedTurnQuiesced = before.runtime.busy === true'));
  assert.ok(code.includes("next.lastGoalContinuationKey = ''"));
  assert.ok(code.includes("'worker.unowned_turn_quiesced'"));
  assert.ok(code.includes('scheduleNeeded = scheduleNeeded || result.result.scheduleNeeded === true || unownedTurnQuiesced'));
});


test('DEAD orphan recovery is bounded to one automatic reload and excludes owned assignments', () => {
  assert.ok(background.includes('DEAD_ORPHAN_TURN_RECOVERY_MAX_ATTEMPTS = 1'));
  assert.ok(background.includes('async function recoverDeadOrphanTurnV2(workerId)'));
  assert.ok(background.includes('worker.currentAssignmentId != null'));
  assert.ok(background.includes("runtime.turnHealth !== 'dead'"));
  assert.ok(background.includes('attempts >= DEAD_ORPHAN_TURN_RECOVERY_MAX_ATTEMPTS'));
  assert.ok(background.includes('await chrome.tabs.reload(tabId)'));
});

test('DEAD orphan recovery persists its attempt receipt and only re-enables continuation after idle proof', () => {
  const c1 = fs.readFileSync(path.join(extensionDir, 'fleet-state-model-m7-c1.js'), 'utf8');
  const c4 = fs.readFileSync(path.join(extensionDir, 'fleet-state-model-m7-c4.js'), 'utf8');
  assert.ok(c1.includes('turnRecoveryAttempts'));
  assert.ok(background.includes('target.runtime.turnRecoveryAttempts = attempts + 1'));
  assert.ok(background.includes("'worker.dead_turn_recovery_started'"));
  assert.ok(background.includes("'worker.dead_turn_recovery_reloaded'"));
  assert.ok(background.includes("'worker.dead_turn_recovery_ready'"));
  assert.ok(background.includes("next.lastGoalContinuationKey = ''"));
  assert.ok(c4.includes('target.runtime.turnRecoveryAttempts = 0'));
  assert.ok(c4.includes('next.workers[input.workerId].runtime.turnRecoveryAttempts = 0'));
});

test('DEAD orphan recovery is re-entered from heartbeat state, not a parallel timer', () => {
  assert.ok(background.includes('const deadRecoveryCandidates = Object.values(committed.state.workers || {})'));
  assert.ok(background.includes("worker.runtime?.turnHealth === 'dead'"));
  assert.ok(background.includes('recoverDeadOrphanTurnV2(workerId).catch'));
});


test('latest-turn Thinking without Stop is INTERRUPTED, not BUSY', () => {
  assert.ok(workerSource.includes('function currentThinkingNodes()'));
  assert.ok(workerSource.includes('nodeFollowsLatestUserTurn(node)'));
  assert.ok(workerSource.includes("turnHealth: interrupted ? 'interrupted' : 'idle'"));
  const streamStart = workerSource.indexOf('function isStreaming()');
  const streamEnd = workerSource.indexOf('function turnLivenessNode', streamStart);
  assert.ok(workerSource.slice(streamStart, streamEnd).includes('return hasActiveStopControl()'));
});

test('historical Thinking shimmer is excluded from current-turn interruption evidence', () => {
  assert.ok(workerSource.includes('user.compareDocumentPosition(node)'));
  assert.ok(workerSource.includes('Node.DOCUMENT_POSITION_FOLLOWING'));
  assert.ok(workerSource.includes('const thinkingNodes = currentThinkingNodes()'));
});

test('interrupted orphan turn re-arms Coordinator reconciliation exactly once per interruption fingerprint', () => {
  assert.ok(workerSource.includes("turnInterruptionKey: interrupted ? fingerprint(latestTurnProgressText()) : ''"));
  assert.ok(background.includes("const interruptionKey = String(after?.runtime?.turnInterruptionKey || '')"));
  assert.ok(background.includes("const handledInterruptionKey = String(after?.runtime?.turnInterruptionHandledKey || '')"));
  assert.ok(background.includes('interruptionKey !== handledInterruptionKey'));
  assert.ok(background.includes('runtime.turnInterruptionHandledKey = interruptionKey'));
  assert.ok(background.includes("'worker.unowned_turn_interrupted'"));
  assert.ok(background.includes("next.lastGoalContinuationKey = ''"));
  assert.ok(background.includes('scheduleAfterBridgeRecovery = true'));
  assert.ok(background.includes("hello observed an interrupted unowned ChatGPT turn; Coordinator reconciliation re-armed"));
});

test('INTERRUPTED is projected into the worker status pill', () => {
  const c16 = fs.readFileSync(path.join(extensionDir, 'fleet-state-model-m7-c16.js'), 'utf8');
  const pane = fs.readFileSync(path.join(extensionDir, 'control-pane.js'), 'utf8');
  assert.ok(c16.includes("worker.turnHealth === 'interrupted'"));
  assert.ok(pane.includes("turnHealth === 'interrupted' ? 'interrupted'"));
});


test('interruption fingerprint is typed and persisted across heartbeat and recovery custody', () => {
  const c1 = fs.readFileSync(path.join(extensionDir, 'fleet-state-model-m7-c1.js'), 'utf8');
  const c4 = fs.readFileSync(path.join(extensionDir, 'fleet-state-model-m7-c4.js'), 'utf8');
  assert.ok(c1.includes("['turnInterruptionKey', 'turnInterruptionHandledKey']"));
  assert.ok(c4.includes("own(observation, 'turnInterruptionKey')"));
  assert.ok(c4.includes('target.runtime.turnInterruptionKey = observation.turnInterruptionKey'));
  assert.ok(c4.includes('next.workers[input.workerId].runtime.turnInterruptionKey = input.turnInterruptionKey'));
});
