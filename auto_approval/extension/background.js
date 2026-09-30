'use strict';

const TAB_STATE_PREFIX = 'approvalTab:';
const FLEET_STATE_KEY = 'modelFleetState:v1';
const SUPPORTED_URL = /^https:\/\/(?:chatgpt\.com|chat\.openai\.com)\//;
const APPROVAL_CONTENT_FILES = Object.freeze(['stream-retry.js', 'content.js']);
const MAX_JOURNAL = 250;
const MAX_MESSAGES = 250;
const MAX_RESULT_CHARS = 16000;
const WORKER_BUSY_FRESH_MS = 30000;
const HEARTBEAT_FLUSH_MS = 10000;
const WORKER_WAKE_TIMEOUT_MS = 20000;
const WORKER_BRIDGE_RETRY_MS = 250;
const FLEET_PAGE_BUSY_RECHECK_MS = 5000;
const MAX_AUTO_RECOVERY_ATTEMPTS = 1;
const MAX_PROTOCOL_REPAIR_ATTEMPTS = 1;
const AUTO_RECOVERY_REASON_PREFIX = 'auto-recovery: ';
const LEGACY_SLEEP_PAGE_URL = chrome.runtime.getURL('sleep.html');
const WARM_IDLE_ALARM_PREFIX = 'model-fleet:warm-idle:';
const DEFAULT_WARM_IDLE_MS = 60000;

const DEFAULT_TAB_STATE = Object.freeze({
  enabled: false,
  autoApprove: true,
  autoScroll: true,
  autoRetry: false,
  repeatMessageEnabled: false,
  repeatMessage: '',
  repeatMessageMode: 'forever',
  repeatMessageCount: 1,
  repeatMessageSent: 0,
  repeatRestartEnabled: false,
  repeatRestartMode: 'new_chat',
  repeatRestartPending: false,
  repeatBootstrapPending: false,
});

const DEFAULT_POLICY = Object.freeze({
  paused: false,
  authorityEnabled: true,
  maxConcurrency: 8,
  activeWorkerWindows: true,
  warmIdleMs: DEFAULT_WARM_IDLE_MS,
});

const DEFAULT_TOPOLOGY = Object.freeze({});

let stateQueue = Promise.resolve();
let scheduling = false;
let schedulePending = false;
const liveHeartbeats = new Map();
let lastHeartbeatFlushAt = 0;
let heartbeatFlushPromise = null;
const workerWindowPromises = new Map();

function now() {
  return Date.now();
}

function iso(ts = now()) {
  return new Date(ts).toISOString();
}

function tabStateKey(tabId) {
  return `${TAB_STATE_PREFIX}${tabId}`;
}

function normalizeTabState(value = {}) {
  const repeatMessageMode = value.repeatMessageMode === 'count' ? 'count' : 'forever';
  const repeatMessageCount = Math.max(1, Math.min(1000000, Math.trunc(Number(value.repeatMessageCount) || 1)));
  const repeatMessageSent = Math.max(0, Math.trunc(Number(value.repeatMessageSent) || 0));
  const repeatRestartEnabled = value.repeatRestartEnabled === true && repeatMessageMode === 'count';
  const repeatRestartMode = 'new_chat';
  const repeatLimitReached = repeatMessageMode === 'count' && repeatMessageSent >= repeatMessageCount;
  const repeatRestartPending = repeatRestartEnabled
    && repeatLimitReached
    && value.repeatRestartPending === true;
  const repeatBootstrapPending = repeatRestartEnabled
    && value.repeatBootstrapPending === true
    && !repeatLimitReached;
  return {
    enabled: value.enabled === true,
    autoApprove: value.autoApprove !== false,
    autoScroll: value.autoScroll !== false,
    autoRetry: value.autoRetry === true,
    repeatMessageEnabled: value.repeatMessageEnabled === true && (!repeatLimitReached || repeatRestartPending),
    repeatMessage: typeof value.repeatMessage === 'string' ? value.repeatMessage : '',
    repeatMessageMode,
    repeatMessageCount,
    repeatMessageSent,
    repeatRestartEnabled,
    repeatRestartMode,
    repeatRestartPending,
    repeatBootstrapPending,
  };
}

async function getTabState(tabId) {
  if (!Number.isInteger(tabId)) return { ...DEFAULT_TAB_STATE };
  const key = tabStateKey(tabId);
  const stored = await chrome.storage.session.get(key);
  return normalizeTabState(stored[key]);
}

async function setTabState(tabId, patch) {
  if (!Number.isInteger(tabId)) throw new Error('invalid tab id');
  const key = tabStateKey(tabId);
  const current = await getTabState(tabId);
  const next = normalizeTabState({ ...current, ...patch });
  await chrome.storage.session.set({ [key]: next });
  await updateBadge(tabId, next);
  try {
    await ensureApprovalBridge(tabId);
    await chrome.tabs.sendMessage(tabId, { type: 'approval:tab-state-changed', state: next });
  } catch {
    // Unsupported, closing, or not-yet-ready tabs stay safely disabled in-page.
  }
  return next;
}

async function recordRepeatMessageSent(tabId) {
  const current = await getTabState(tabId);
  if (!current.repeatMessageEnabled) return current;
  const repeatMessageSent = current.repeatMessageSent + 1;
  const repeatLimitReached = current.repeatMessageMode === 'count'
    && repeatMessageSent >= current.repeatMessageCount;
  const repeatRestartPending = repeatLimitReached && current.repeatRestartEnabled;
  return setTabState(tabId, {
    repeatMessageSent,
    repeatBootstrapPending: false,
    repeatRestartPending,
    repeatMessageEnabled: repeatLimitReached && !repeatRestartPending
      ? false
      : current.repeatMessageEnabled,
  });
}

async function restartRepeatCycle(tabId) {
  if (!Number.isInteger(tabId)) throw new Error('invalid tab id');
  const current = await getTabState(tabId);
  if (!current.repeatMessageEnabled
    || !current.repeatRestartEnabled
    || !current.repeatRestartPending
    || current.repeatMessageMode !== 'count'
    || current.repeatMessageSent < current.repeatMessageCount) {
    return { restarted: false, state: current };
  }

  const key = tabStateKey(tabId);
  const next = normalizeTabState({
    ...current,
    repeatMessageSent: 0,
    repeatRestartPending: false,
    repeatBootstrapPending: true,
    repeatMessageEnabled: true,
  });

  await chrome.storage.session.set({ [key]: next });
  await updateBadge(tabId, next);

  // Restart always means leave the current /c/<conversation> URL and return
  // this same browser tab to the ChatGPT root. There is intentionally no
  // chrome.tabs.reload() branch here.
  await chrome.tabs.update(tabId, { url: 'https://chatgpt.com/' });

  return { restarted: true, state: next, mode: 'new_chat', tabId };
}

function freshFleetState() {
  return {
    version: 1,
    generation: 1,
    goal: '',
    policy: { ...DEFAULT_POLICY },
    topology: { ...DEFAULT_TOPOLOGY },
    workers: {},
    tasks: {},
    messages: [],
    journal: [],
    nextTask: 1,
    nextMessage: 1,
    createdAt: now(),
    updatedAt: now(),
  };
}

function normalizeFleetState(value) {
  const state = value && typeof value === 'object' ? value : freshFleetState();
  const storedPolicy = state.policy && typeof state.policy === 'object' ? state.policy : {};
  const policy = Object.fromEntries(Object.keys(DEFAULT_POLICY).map((key) => [
    key,
    Object.prototype.hasOwnProperty.call(storedPolicy, key) ? storedPolicy[key] : DEFAULT_POLICY[key],
  ]));
  const workers = {};
  for (const [id, rawWorker] of Object.entries(state.workers && typeof state.workers === 'object' ? state.workers : {})) {
    const worker = { ...rawWorker };
    if (['sleeping', 'parking'].includes(worker.lifecycle)) worker.lifecycle = 'idle';
    delete worker.sleepTabId;
    delete worker.sleepingSince;
    workers[id] = worker;
  }
  return {
    ...freshFleetState(),
    ...state,
    policy,
    topology: {},
    workers,
    tasks: state.tasks && typeof state.tasks === 'object' ? state.tasks : {},
    messages: Array.isArray(state.messages) ? state.messages.slice(-MAX_MESSAGES) : [],
    journal: Array.isArray(state.journal) ? state.journal.slice(-MAX_JOURNAL) : [],
  };
}

async function loadFleetState() {
  const stored = await chrome.storage.local.get(FLEET_STATE_KEY);
  return normalizeFleetState(stored[FLEET_STATE_KEY]);
}

function appendJournal(state, type, text, detail = {}) {
  state.journal.push({
    id: `${state.generation}:${state.journal.length + 1}:${now()}`,
    at: now(),
    type,
    text,
    detail,
  });
  if (state.journal.length > MAX_JOURNAL) {
    state.journal.splice(0, state.journal.length - MAX_JOURNAL);
  }
}

function publicSnapshot(state) {
  const workers = {};
  for (const [workerId, worker] of Object.entries(state.workers)) {
    const live = liveHeartbeats.get(workerId);
    const heartbeatAt = Math.max(Number(worker.heartbeatAt || 0), Number(live?.at || 0));
    const busy = live ? live.busy === true : worker.busy === true;
    workers[workerId] = {
      ...worker,
      heartbeatAt,
      busy,
      title: live?.title || worker.title,
      url: live?.url || worker.url,
      windowId: Number.isInteger(live?.windowId) ? live.windowId : worker.windowId,
      status: worker.currentAssignmentId
        ? worker.status
        : (worker.status === 'blocked' ? 'blocked' : (busy ? "waiting" : "idle")),
    };
  }
  return {
    ...state,
    workers,
    tasks: { ...state.tasks },
    messages: state.messages.slice(),
    journal: state.journal.slice(),
    serverNow: now(),
  };
}

async function broadcastSnapshot(state) {
  try {
    await chrome.runtime.sendMessage({ type: 'fleet:snapshot-changed', snapshot: publicSnapshot(state) });
  } catch {
    // No control pane listening.
  }
}

async function broadcastHeartbeatDelta(heartbeats) {
  try {
    await chrome.runtime.sendMessage({ type: "fleet:heartbeats", heartbeats, serverNow: now() });
  } catch {
    // No control pane listening.
  }
}

function mutateFleet(mutator) {
  const operation = stateQueue.then(async () => {
    const state = await loadFleetState();
    const result = await mutator(state);
    state.generation = Math.max(1, Number(state.generation || 0) + 1);
    state.updatedAt = now();
    await chrome.storage.local.set({ [FLEET_STATE_KEY]: state });
    await broadcastSnapshot(state);
    return { state, result };
  });
  stateQueue = operation.catch(() => {});
  return operation;
}

function workerIdForTab(tabId) {
  return `W-${tabId}`;
}

function normalizeRole(role) {
  const value = String(role || '').trim().toLowerCase();
  return value || 'generalist';
}

function defaultCapabilities() {
  return ['chatgpt', 'natural-language', 'mcp-connector', 'approval-wasm'];
}

async function supportedTab(tabId) {
  try {
    const tab = await chrome.tabs.get(tabId);
    return SUPPORTED_URL.test(tab.url || '') ? tab : null;
  } catch {
    return null;
  }
}

async function ensureApprovalBridge(tabId) {
  if (!Number.isInteger(tabId)) throw new Error('invalid tab id');
  try {
    const response = await chrome.tabs.sendMessage(tabId, { type: 'approval:bridge-ping' });
    if (response?.ok) return response;
  } catch {
    // A reload/update invalidates old content-script extension contexts.
  }

  const tab = await supportedTab(tabId);
  if (!tab) throw new Error('approval bridge target is not a supported ChatGPT tab');

  // A reloaded unpacked extension can leave this isolated-world bootstrap
  // sentinel behind after the old extension context is invalidated. Clear it
  // before reinjection so content.js cannot incorrectly short-circuit.
  await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      delete globalThis.__approvalHintWasmContentV1;
    },
  });

  await chrome.scripting.executeScript({
    target: { tabId },
    files: APPROVAL_CONTENT_FILES,
  });

  const response = await chrome.tabs.sendMessage(tabId, { type: 'approval:bridge-ping' });
  if (!response?.ok) throw new Error('approval bridge did not answer ping after reinjection');
  return response;
}

async function ensureApprovalBridgesForSupportedTabs() {
  const tabs = await chrome.tabs.query({});
  const supported = tabs.filter((tab) => Number.isInteger(tab.id) && SUPPORTED_URL.test(tab.url || ''));
  await Promise.allSettled(supported.map((tab) => ensureApprovalBridge(tab.id)));
}

async function sendApprovalMessage(tabId, text) {
  if (!Number.isInteger(tabId)) throw new Error('invalid tab id');
  const body = String(text || '');
  if (!body.trim()) throw new Error('message is empty');

  // Explicit sends are routed through the background authority so every send
  // proves or repairs the content-script bridge immediately before delivery.
  await ensureApprovalBridge(tabId);
  const response = await chrome.tabs.sendMessage(tabId, {
    type: 'approval:send-message-now',
    text: body,
  });
  if (!response?.ok) {
    throw new Error(response?.error || 'Message could not be sent from the current ChatGPT state.');
  }
  return { sent: true };
}

async function readRepeatTurnSignal(tabId) {
  if (!Number.isInteger(tabId)) return { available: false };
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      func: () => {
        const capture = window.__browserRouterSseCapture;
        const hasRouterSignal = capture !== undefined
          || window.__browserRouterMessageStreamComplete !== undefined
          || window.__browserRouterMessageCompleteObserved !== undefined
          || window.__browserRouterLastFinalTextAt !== undefined
          || window.__browserRouterLastToolCallAt !== undefined
          || window.__browserRouterLastToolResultAt !== undefined;
        if (!hasRouterSignal) return { available: false };

        const lastFinalTextAt = Number(window.__browserRouterLastFinalTextAt || 0);
        const lastToolCallAt = Number(window.__browserRouterLastToolCallAt || 0);
        const lastToolResultAt = Number(window.__browserRouterLastToolResultAt || 0);
        const latestToolActivityAt = Math.max(lastToolCallAt, lastToolResultAt);
        const sseActive = Number(capture?.active || 0);
        const messageStreamComplete = window.__browserRouterMessageStreamComplete === true;
        const messageCompleteObserved = window.__browserRouterMessageCompleteObserved === true;
        const postToolFinalText = lastFinalTextAt > 0 && lastFinalTextAt >= latestToolActivityAt;
        const terminalSuccess = sseActive === 0
          && messageStreamComplete
          && messageCompleteObserved
          && postToolFinalText;

        return {
          available: true,
          sseActive,
          messageStreamComplete,
          messageCompleteObserved,
          lastFinalTextAt,
          lastToolCallAt,
          lastToolResultAt,
          latestToolActivityAt,
          postToolFinalText,
          terminalSuccess,
        };
      },
    });
    return results?.[0]?.result || { available: false };
  } catch {
    return { available: false };
  }
}

async function ensureFleetBridge(tabId) {
  try {
    const response = await chrome.tabs.sendMessage(tabId, { type: 'fleet:bridge-ping' });
    if (response?.ok) return response;
  } catch {
    // Inject below when the static content script is not present in an already-open tab.
  }
  await chrome.scripting.executeScript({ target: { tabId }, files: ['fleet-worker.js'] });
  try {
    const response = await chrome.tabs.sendMessage(tabId, { type: 'fleet:bridge-ping' });
    if (response?.ok) return response;
  } catch {
    // Fall through to a hard failure. Reconciliation must never invent an idle bridge,
    // because an old extension context may have a completion handoff waiting in-page.
  }
  throw new Error('fleet bridge did not answer ping after injection');
}

async function readFleetPageActivity(tabId) {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const button = document.querySelector(
          '#composer-submit-button[data-testid="stop-button"], '
          + '#composer-submit-button[data-testid*="stop" i], '
          + '#composer-submit-button[aria-label*="stop" i], '
          + 'button[data-testid="stop-button"]'
        );
        if (!button) return { available: true, busy: false };
        const style = window.getComputedStyle(button);
        const rect = button.getBoundingClientRect();
        const usable = style.display !== 'none'
          && style.visibility !== 'hidden'
          && style.opacity !== '0'
          && rect.width > 0
          && rect.height > 0
          && !button.disabled
          && !button.hasAttribute('disabled')
          && button.getAttribute('aria-disabled') !== 'true';
        return { available: true, busy: usable };
      },
    });
    return results?.[0]?.result || { available: false, busy: false };
  } catch {
    return { available: false, busy: false };
  }
}

async function deferReservedDispatchForActivePage(dispatch) {
  await mutateFleet((state) => {
    const worker = state.workers[dispatch.workerId];
    if (!worker || worker.currentAssignmentId !== dispatch.assignment.id) return;

    if (dispatch.assignment.kind === 'task') {
      const task = state.tasks[dispatch.assignment.taskId];
      if (task?.assignmentId === dispatch.assignment.id) {
        task.status = 'pending';
        task.assignedWorkerId = null;
        task.assignmentId = null;
        task.startedAt = 0;
        task.attempts = Math.max(0, Number(task.attempts || 0) - 1);
        task.statusNote = 'deferred: ChatGPT turn is still active in the worker tab';
      }
    } else {
      const semantic = state.messages.find((item) => item.id === dispatch.assignment.messageId);
      if (semantic?.assignmentId === dispatch.assignment.id) {
        semantic.status = 'queued';
        semantic.assignmentId = null;
        semantic.lastDeferredReason = 'ChatGPT turn is still active in the worker tab';
      }
    }

    worker.currentAssignmentId = null;
    worker.currentTaskId = null;
    worker.currentMessageId = null;
    worker.status = 'waiting';
    worker.lifecycle = 'waiting';
    worker.busy = true;
    worker.pageBusyUntil = now() + FLEET_PAGE_BUSY_RECHECK_MS;
    appendJournal(
      state,
      'dispatch.deferred_active_turn',
      dispatch.workerId + ' still has an active ChatGPT turn; ' + dispatch.assignment.id + ' was not sent',
      { assignmentId: dispatch.assignment.id, tabId: dispatch.tabId }
    );
  });

  setTimeout(() => schedule().catch(() => {}), FLEET_PAGE_BUSY_RECHECK_MS);
}


function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function boundedWarmIdleMs(value) {
  return Math.max(10000, Math.min(300000, Number(value) || DEFAULT_WARM_IDLE_MS));
}

function warmIdleAlarmName(workerId) {
  return `${WARM_IDLE_ALARM_PREFIX}${workerId}`;
}

async function clearWarmIdleAlarm(workerId) {
  try {
    await chrome.alarms.clear(warmIdleAlarmName(workerId));
  } catch {
    // Alarm may not exist yet.
  }
}

async function beginWarmIdle(workerId, reason = 'assignment complete') {
  liveHeartbeats.delete(workerId);
  const { result } = await mutateFleet((state) => {
    const worker = state.workers[workerId];
    if (!state.policy.activeWorkerWindows || !worker || !worker.enabled || worker.currentAssignmentId) return null;
    if (worker.lifecycle === 'warm-idle' && Number(worker.warmIdleUntil || 0) > now()) {
      return { warmIdleUntil: worker.warmIdleUntil, existing: true };
    }

    const warmIdleMs = boundedWarmIdleMs(state.policy.warmIdleMs);
    const at = now();
    worker.lifecycle = 'warm-idle';
    worker.status = 'idle';
    worker.busy = false;
    worker.warmIdleSince = at;
    worker.warmIdleUntil = at + warmIdleMs;
    appendJournal(state, 'worker.warm_idle', `${workerId} kept live for ${Math.round(warmIdleMs / 1000)}s`, {
      reason,
      warmIdleUntil: worker.warmIdleUntil,
    });
    return { warmIdleUntil: worker.warmIdleUntil };
  });

  if (!result) return false;
  await chrome.alarms.create(warmIdleAlarmName(workerId), { when: result.warmIdleUntil });
  schedule().catch(() => {});
  return true;
}

async function waitForTabReady(tabId, timeoutMs = WORKER_WAKE_TIMEOUT_MS) {
  const deadline = now() + timeoutMs;
  let last = null;
  while (now() < deadline) {
    last = await chrome.tabs.get(tabId);
    if (!last.discarded && last.status === 'complete') return last;
    if (last.discarded) await chrome.tabs.update(tabId, { active: true });
    await delay(WORKER_BRIDGE_RETRY_MS);
  }
  throw new Error(`worker tab ${tabId} did not become ready within ${timeoutMs}ms (status=${last?.status || 'unknown'}, discarded=${!!last?.discarded})`);
}

async function ensureFleetBridgeAfterWake(tabId, timeoutMs = WORKER_WAKE_TIMEOUT_MS) {
  const deadline = now() + timeoutMs;
  let lastError = null;
  while (now() < deadline) {
    try {
      return await ensureFleetBridge(tabId);
    } catch (error) {
      lastError = error;
      await delay(WORKER_BRIDGE_RETRY_MS);
    }
  }
  throw lastError || new Error(`fleet bridge ${tabId} did not wake`);
}

async function ensureWorkerWindow(workerId) {
  if (workerWindowPromises.has(workerId)) return workerWindowPromises.get(workerId);

  const operation = (async () => {
    const state = await loadFleetState();
    const worker = state.workers[workerId];
    if (!worker?.enabled || !Number.isInteger(worker.tabId)) throw new Error(`worker ${workerId} is not registered`);

    let workerTab = await chrome.tabs.get(worker.tabId);
    let win = await chrome.windows.get(workerTab.windowId, { populate: true });

    // v0.8 put sleep.html beside the ChatGPT tab. Remove it in-place first so
    // existing Hyprland window placement survives the migration.
    const legacyTabs = (win.tabs || []).filter((tab) => tab.id !== worker.tabId && tab.url === LEGACY_SLEEP_PAGE_URL);
    if (legacyTabs.length) {
      await chrome.tabs.remove(legacyTabs.map((tab) => tab.id));
      win = await chrome.windows.get(workerTab.windowId, { populate: true });
    }

    const foreignTabs = (win.tabs || []).filter((tab) => tab.id !== worker.tabId);
    if (foreignTabs.length) {
      const created = await chrome.windows.create({ tabId: worker.tabId, focused: false, type: 'normal' });
      workerTab = await chrome.tabs.get(worker.tabId);
      win = await chrome.windows.get(created.id, { populate: true });
    }

    const stable = { windowId: workerTab.windowId };
    await mutateFleet((latest) => {
      const current = latest.workers[workerId];
      if (!current) return;
      const changed = current.windowId !== stable.windowId;
      current.windowId = stable.windowId;
      delete current.sleepTabId;
      delete current.sleepingSince;
      if (['sleeping', 'parking'].includes(current.lifecycle)) current.lifecycle = 'idle';
      if (changed) {
        appendJournal(latest, 'worker.window_bound', `${workerId} bound to dedicated live window ${stable.windowId}`, {
          windowId: stable.windowId,
        });
      }
    });
    return stable;
  })();

  workerWindowPromises.set(workerId, operation);
  try {
    return await operation;
  } finally {
    workerWindowPromises.delete(workerId);
  }
}

async function cleanupLegacySleepTabs(reason = 'sleep-tab migration') {
  const tabs = await chrome.tabs.query({});
  const legacyIds = tabs
    .filter((tab) => Number.isInteger(tab.id) && tab.url === LEGACY_SLEEP_PAGE_URL)
    .map((tab) => tab.id);

  if (!legacyIds.length) return 0;

  try {
    await chrome.tabs.remove(legacyIds);
  } catch {
    // A legacy tab/window may disappear while cleanup is running.
  }

  await mutateFleet((state) => {
    state.topology = {};
    let normalized = 0;
    for (const worker of Object.values(state.workers)) {
      const hadLegacyState = Number.isInteger(worker.sleepTabId) || ['sleeping', 'parking'].includes(worker.lifecycle);
      delete worker.sleepTabId;
      delete worker.sleepingSince;
      if (['sleeping', 'parking'].includes(worker.lifecycle)) worker.lifecycle = worker.currentAssignmentId ? 'running' : 'idle';
      if (!worker.currentAssignmentId && worker.status !== 'blocked') worker.status = worker.busy ? 'waiting' : 'idle';
      if (hadLegacyState) normalized += 1;
    }
    if (legacyIds.length || normalized) {
      appendJournal(state, 'topology.sleep_tabs_removed', `removed ${legacyIds.length} legacy Model Fleet tab(s)`, {
        reason,
        normalizedWorkers: normalized,
      });
    }
  });

  return legacyIds.length;
}

async function settleWorkerIdle(workerId, reason = 'idle') {
  await clearWarmIdleAlarm(workerId);
  const { result } = await mutateFleet((state) => {
    const worker = state.workers[workerId];
    if (!worker || !worker.enabled || worker.currentAssignmentId) return false;
    worker.lifecycle = 'idle';
    worker.status = worker.busy ? 'waiting' : 'idle';
    worker.warmIdleSince = 0;
    worker.warmIdleUntil = 0;
    delete worker.sleepTabId;
    delete worker.sleepingSince;
    appendJournal(state, 'worker.idle', `${workerId} remains live in its dedicated window`, { reason, windowId: worker.windowId || null });
    return true;
  });
  schedule().catch(() => {});
  return result === true;
}

async function normalizeIdleWorkers(reason = 'worker window normalization') {
  await cleanupLegacySleepTabs(reason);
  const state = await loadFleetState();
  for (const worker of Object.values(state.workers)) {
    if (!worker.enabled) continue;
    if (state.policy.activeWorkerWindows) await ensureWorkerWindow(worker.id).catch(() => {});
    if (!worker.currentAssignmentId) await settleWorkerIdle(worker.id, reason).catch(() => {});
  }
}

function dispatchStillAuthorized(state, dispatch) {
  if (state.policy.paused || !state.policy.authorityEnabled) return false;
  const worker = state.workers[dispatch.workerId];
  return !!worker
    && worker.enabled
    && worker.currentAssignmentId === dispatch.assignment.id
    && worker.lifecycle === 'activating';
}

async function assertDispatchStillAuthorized(dispatch) {
  const state = await loadFleetState();
  if (!dispatchStillAuthorized(state, dispatch)) {
    throw new Error(`dispatch ${dispatch.assignment.id} lost authority or ownership while worker was waking`);
  }
}

async function activateWorkerForDispatch(dispatch) {
  const state = await loadFleetState();
  const worker = state.workers[dispatch.workerId];
  if (!worker || worker.currentAssignmentId !== dispatch.assignment.id) {
    throw new Error(`worker ${dispatch.workerId} lost assignment reservation before wake`);
  }
  if (!state.policy.activeWorkerWindows) {
    return ensureFleetBridgeAfterWake(dispatch.tabId);
  }

  await clearWarmIdleAlarm(dispatch.workerId);
  const stable = await ensureWorkerWindow(dispatch.workerId);
  await chrome.tabs.update(dispatch.tabId, { active: true });

  await mutateFleet((latest) => {
    const current = latest.workers[dispatch.workerId];
    if (!current || current.currentAssignmentId !== dispatch.assignment.id) return;
    current.lifecycle = 'activating';
    current.windowId = stable.windowId;
    current.activeWindowId = stable.windowId;
    current.status = 'activating';
    appendJournal(latest, 'worker.wake', `${dispatch.workerId} activated in persistent window ${stable.windowId} for ${dispatch.assignment.id}`, { windowId: stable.windowId });
  });

  await waitForTabReady(dispatch.tabId);
  return ensureFleetBridgeAfterWake(dispatch.tabId);
}

function reconcileBridgeRuntimeState(state, workerId, bridgeState = {}) {
  const worker = state.workers[workerId];
  if (!worker) return;
  const liveAssignmentId = bridgeState.activeAssignmentId || null;
  if (worker.currentAssignmentId && worker.currentAssignmentId !== liveAssignmentId) {
    if (worker.currentTaskId) {
      const task = state.tasks[worker.currentTaskId];
      if (task?.status === 'running') {
        task.status = 'pending';
        task.assignedWorkerId = null;
        task.assignmentId = null;
        task.startedAt = 0;
        appendJournal(state, 'task.requeued', `${task.id} requeued after stale bridge ownership for ${workerId}`);
      }
    }
    if (worker.currentMessageId) {
      const message = state.messages.find((m) => m.id === worker.currentMessageId);
      if (message?.status === 'running') {
        message.status = 'queued';
        message.assignmentId = null;
        appendJournal(state, 'message.requeued', `${message.id} requeued after stale bridge ownership for ${workerId}`);
      }
    }
    appendJournal(state, 'worker.reconciled', `${workerId} stale assignment cleared`, {
      persistedAssignmentId: worker.currentAssignmentId,
      liveAssignmentId,
    });
    worker.currentAssignmentId = null;
    worker.currentTaskId = null;
    worker.currentMessageId = null;
  }
  if (!worker.currentAssignmentId) {
    worker.status = 'idle';
    worker.busy = false;
  }
  worker.lastDispatchError = '';
  worker.dispatchFailureCount = 0;
  worker.lastDispatchFailureAt = 0;
  worker.heartbeatAt = now();
}

function upsertWorker(state, tab, patch = {}) {
  const id = workerIdForTab(tab.id);
  const existing = state.workers[id] || {};
  const worker = {
    id,
    tabId: tab.id,
    name: patch.name || existing.name || `ChatGPT ${tab.id}`,
    role: normalizeRole(patch.role || existing.role),
    capabilities: Array.isArray(patch.capabilities)
      ? [...new Set(patch.capabilities.map(String))]
      : (existing.capabilities || defaultCapabilities()),
    enabled: patch.enabled !== undefined ? patch.enabled === true : existing.enabled !== false,
    status: existing.status || 'idle',
    currentAssignmentId: existing.currentAssignmentId || null,
    currentTaskId: existing.currentTaskId || null,
    currentMessageId: existing.currentMessageId || null,
    title: tab.title || existing.title || '',
    url: tab.url || existing.url || '',
    busy: patch.busy !== undefined ? patch.busy === true : existing.busy === true,
    heartbeatAt: patch.heartbeatAt || existing.heartbeatAt || 0,
    progressVersion: Number(existing.progressVersion || 0),
    lastResultAt: existing.lastResultAt || 0,
    registeredAt: existing.registeredAt || now(),
    windowId: Number.isInteger(tab.windowId) ? tab.windowId : (existing.windowId || null),
    activeWindowId: existing.activeWindowId || null,
    lifecycle: ['sleeping', 'parking'].includes(existing.lifecycle) ? 'idle' : (existing.lifecycle || (existing.currentAssignmentId ? 'running' : 'idle')),
    warmIdleSince: existing.warmIdleSince || 0,
    warmIdleUntil: existing.warmIdleUntil || 0,
  };
  if (!worker.currentAssignmentId && worker.enabled && worker.status !== 'blocked') {
    worker.status = worker.busy ? 'waiting' : 'idle';
    if (worker.lifecycle === 'running' || worker.lifecycle === 'activating') worker.lifecycle = 'idle';
  }
  state.workers[id] = worker;
  return worker;
}

async function registerTab(tabId, patch = {}) {
  const tab = await supportedTab(tabId);
  if (!tab) throw new Error('tab is not a supported ChatGPT tab');
  const { state, result: worker } = await mutateFleet((state) => {
    const worker = upsertWorker(state, tab, { ...patch, enabled: true });
    appendJournal(state, 'worker.registered', `${worker.id} registered`, { tabId: worker.tabId, role: worker.role });
    return worker;
  });
  await updateBadge(tabId);
  await cleanupLegacySleepTabs('register-tab migration');
  const latest = await loadFleetState();
  if (latest.policy.activeWorkerWindows) await ensureWorkerWindow(worker.id);

  let bridgeReady = false;
  try {
    const bridgeState = await ensureFleetBridge(tabId);
    bridgeReady = true;
    await mutateFleet((current) => reconcileBridgeRuntimeState(current, worker.id, bridgeState));
  } catch (error) {
    await mutateFleet((current) => {
      const item = current.workers[worker.id];
      if (item) item.status = 'blocked';
      appendJournal(current, 'worker.bridge_failed', `${worker.id} bridge unavailable`, { error: String(error) });
    });
  }
  if (bridgeReady) {
    try {
      await chrome.tabs.sendMessage(tabId, { type: 'fleet:registration-changed', registered: true, worker });
    } catch {
      // The page may still be loading; worker hello will reconcile later.
    }
  }
  schedule().catch(() => {});
  return { worker, snapshot: publicSnapshot(await loadFleetState()) };
}

async function unregisterWorker(workerId) {
  liveHeartbeats.delete(workerId);
  await clearWarmIdleAlarm(workerId);
  const { state, result } = await mutateFleet((state) => {
    const worker = state.workers[workerId];
    if (!worker) return null;
    if (worker.currentTaskId && state.tasks[worker.currentTaskId]?.status === 'running') {
      const task = state.tasks[worker.currentTaskId];
      task.status = 'pending';
      task.assignedWorkerId = null;
      task.assignmentId = null;
      task.startedAt = 0;
      appendJournal(state, 'task.requeued', `${task.id} requeued because ${workerId} was unregistered`);
    }
    for (const message of state.messages) {
      if (message.toWorkerId === workerId && message.status === 'running') message.status = 'queued';
    }
    delete state.workers[workerId];
    appendJournal(state, 'worker.unregistered', `${workerId} unregistered`);
    return worker;
  });
  if (result?.tabId) {
    updateBadge(result.tabId).catch(() => {});
    chrome.tabs.sendMessage(result.tabId, { type: 'fleet:registration-changed', registered: false }).catch(() => {});
  }
  schedule().catch(() => {});
  return publicSnapshot(state);
}

function taskRunnable(state, task) {
  if (task.status !== 'pending') return false;
  const deps = Array.isArray(task.dependencies) ? task.dependencies : [];
  return deps.every((id) => state.tasks[id]?.status === 'done');
}

function workerBusyIsFresh(worker, at = now()) {
  const live = worker?.id ? liveHeartbeats.get(worker.id) : null;
  const busy = live ? live.busy === true : worker?.busy === true;
  if (!busy) return false;
  const heartbeatAt = Math.max(Number(worker?.heartbeatAt || 0), Number(live?.at || 0));
  return heartbeatAt > 0 && at - heartbeatAt <= WORKER_BUSY_FRESH_MS;
}

function workerMatches(worker, task) {
  if (!worker.enabled || worker.currentAssignmentId || workerBusyIsFresh(worker)) return false;
  if (!['idle', 'waiting'].includes(worker.status)) return false;
  const role = normalizeRole(task.role);
  return role === 'generalist' || worker.role === role || worker.role === 'generalist';
}

function peerSummary(state, workerId) {
  return Object.values(state.workers)
    .filter((w) => w.enabled && w.id !== workerId)
    .slice(0, 12)
    .map((w) => `- ${w.id}: ${w.role} (${w.status})`)
    .join('\n') || '- no other registered workers';
}

function fleetProtocolText() {
  return [
    'FLEET PROTOCOL — compliance is required, not optional.',
    'The extension routes peer communication ONLY from explicit FLEET_MESSAGE envelopes in your final response.',
    'If the instruction requires you to send, forward, relay, reply to, notify, delegate to, or report to another worker, a status-only response is INVALID.',
    'For every required peer delivery, emit one complete envelope in this exact form using ASCII straight quotes:',
    '[FLEET_MESSAGE to="W-123"]',
    'Your natural-language message to that worker.',
    '[/FLEET_MESSAGE]',
    'If the instruction provides an explicit outbound FLEET_MESSAGE block to send, reproduce that outbound envelope in your response (normalizing smart/curly quotes to ASCII straight quotes) instead of merely acknowledging or summarizing it.',
    'Never replace a required peer message with prose such as "acknowledged", "awaiting", "sent", "already dispatched", or a summary inside FLEET_STATUS.',
    'Never send a FLEET_MESSAGE to your own worker ID.',
    'When forwarding or replying to a peer, emit only the peer message(s) actually required by the instruction.',
    'Do not also send the same update to="operator" or to="scheduler" unless the incoming instruction explicitly asks for an operator report or operator intervention is required.',
    'Use to="broadcast" only when the instruction genuinely requires all enabled peers.',
    'Do not narrate, quote, or repeat an outbound FLEET_MESSAGE outside its envelope.',
    'After all required FLEET_MESSAGE envelopes, end with exactly one terminal status envelope:',
    '[FLEET_STATUS state="done"]',
    'Concise completion note.',
    '[/FLEET_STATUS]',
    'Use state="blocked" only when you cannot make useful progress. If a required recipient is unknown or invalid, do not invent one; use blocked and explain the routing problem in the status note.',
    'Before finalizing, verify: (1) every required peer delivery has a FLEET_MESSAGE envelope, (2) every to= target is valid and not yourself, (3) all envelope tags are closed, (4) attributes use straight quotes, and (5) [/FLEET_STATUS] is the final text with nothing after it.',
    'If no peer delivery is required, a status-only response is allowed.',
  ].join('\n');
}

function buildTaskPrompt(state, task, worker) {
  return [
    '[MODEL FLEET ASSIGNMENT]',
    `Worker: ${worker.id}`,
    `Role: ${worker.role}`,
    `Task: ${task.id} — ${task.title}`,
    state.goal ? `Fleet goal: ${state.goal}` : 'Fleet goal: not set',
    '',
    task.prompt,
    '',
    'Work independently and make concrete progress. You may use tools actually available in this ChatGPT session.',
    'If the connected chatgpt-mcp-connector is available and useful, you may call it. Do not claim a tool ran unless it actually ran.',
    'Do not wait for other workers unless the task genuinely depends on them.',
    '',
    'Registered peers:',
    peerSummary(state, worker.id),
    '',
    fleetProtocolText(),
    '[/MODEL FLEET ASSIGNMENT]',
  ].join('\n');
}

function buildMessagePrompt(state, message, worker) {
  const from = message.fromWorkerId || message.from || 'operator';
  return [
    '[MODEL FLEET MESSAGE]',
    `Recipient: ${worker.id}`,
    `From: ${from}`,
    message.taskId ? `Related task: ${message.taskId}` : 'Related task: none',
    '',
    message.body,
    '',
    'Respond by acting on the message. You may use tools actually available in this ChatGPT session, including chatgpt-mcp-connector when available.',
    '',
    'Registered peer routing targets:',
    peerSummary(state, worker.id),
    'When the instruction requires sending to another worker, use that peer exact W-... ID in the FLEET_MESSAGE to= field.',
    'Do not guess or invent a worker ID that is not listed above.',
    '',
    fleetProtocolText(),
    '[/MODEL FLEET MESSAGE]',
  ].join('\n');
}

function normalizeFleetProtocolSource(text) {
  return String(text || '')
    .normalize('NFKC')
    .replace(/[\u200B-\u200D\u2060\uFEFF]/g, '')
    .replace(/\u00A0/g, ' ')
    .replace(/[“”„‟]/g, '"')
    .replace(/[‘’‚‛]/g, "'");
}

function parseFleetOutput(text) {
  const source = normalizeFleetProtocolSource(text);
  const messages = [];
  const messageRe = /\[\s*FLEET_MESSAGE\b[^\]]*?\bto\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s\]]+))\s*\]([\s\S]*?)\[\s*\/\s*FLEET_MESSAGE\s*\]/gi;
  for (const match of source.matchAll(messageRe)) {
    const to = String(match[1] || match[2] || match[3] || '').trim();
    const body = String(match[4] || '').trim();
    if (to && body) messages.push({ to, body });
  }
  const statusMatch = source.match(/\[\s*FLEET_STATUS\b[^\]]*?\bstate\s*=\s*(?:"(done|blocked)"|'(done|blocked)'|(done|blocked))\s*\]([\s\S]*?)\[\s*\/\s*FLEET_STATUS\s*\]/i);
  const statusState = statusMatch ? (statusMatch[1] || statusMatch[2] || statusMatch[3]) : null;
  const markerPresent = /\[\s*\/?\s*FLEET_MESSAGE\b/i.test(source);
  return {
    state: statusState ? statusState.toLowerCase() : 'done',
    statusNote: statusMatch ? String(statusMatch[4] || '').trim() : '',
    messages,
    markerPresent,
    malformedMessageEnvelope: markerPresent && messages.length === 0,
  };
}

function queueSemanticMessage(state, {
  fromWorkerId = null,
  from = null,
  toWorkerId,
  body,
  taskId = null,
  requiresFleetMessage = false,
  protocolRepairOf = null,
  protocolRepairAttempts = 0,
}) {
  const id = `M-${state.nextMessage++}`;
  const message = {
    id,
    fromWorkerId,
    from: from || (fromWorkerId ? null : 'operator'),
    toWorkerId,
    body: String(body || '').trim(),
    taskId,
    status: toWorkerId === 'operator' ? 'delivered' : 'queued',
    assignmentId: null,
    createdAt: now(),
    deliveredAt: toWorkerId === 'operator' ? now() : 0,
    completedAt: 0,
    response: '',
    autoRecoveryAttempts: 0,
    lastAutoRecoveryReason: '',
    requiresFleetMessage: requiresFleetMessage === true,
    protocolRepairOf,
    protocolRepairAttempts: Number(protocolRepairAttempts || 0),
  };
  state.messages.push(message);
  if (state.messages.length > MAX_MESSAGES) state.messages.splice(0, state.messages.length - MAX_MESSAGES);
  appendJournal(state, 'message.queued', `${id}: ${fromWorkerId || from || 'operator'} → ${toWorkerId}`, { taskId });
  return message;
}

function routeParsedMessages(state, fromWorkerId, parsed, taskId) {
  const result = { queued: [], failures: [] };
  for (const item of parsed.messages) {
    const target = item.to;
    if (target === fromWorkerId) {
      appendJournal(state, 'message.self_dropped', `${fromWorkerId} attempted to route a message to itself`, { taskId });
      result.failures.push({ target, body: item.body, reason: 'recipient resolves to the sending worker itself' });
      continue;
    }
    if (target === 'operator' || target === 'scheduler') {
      const queued = queueSemanticMessage(state, { fromWorkerId, toWorkerId: 'operator', body: item.body, taskId });
      result.queued.push(queued.id);
      continue;
    }
    if (target === 'broadcast') {
      let broadcastCount = 0;
      for (const worker of Object.values(state.workers)) {
        if (worker.enabled && worker.id !== fromWorkerId) {
          const queued = queueSemanticMessage(state, { fromWorkerId, toWorkerId: worker.id, body: item.body, taskId });
          result.queued.push(queued.id);
          broadcastCount += 1;
        }
      }
      if (!broadcastCount) {
        result.failures.push({ target, body: item.body, reason: 'no enabled peer recipients are available for broadcast' });
      }
      continue;
    }
    if (state.workers[target]?.enabled) {
      const queued = queueSemanticMessage(state, { fromWorkerId, toWorkerId: target, body: item.body, taskId });
      result.queued.push(queued.id);
    } else {
      appendJournal(state, 'message.route_failed', `${fromWorkerId} produced an unroutable peer target ${target}`, { taskId });
      result.failures.push({ target, body: item.body, reason: 'recipient is not a currently enabled registered worker' });
    }
  }
  return result;
}

function protocolRepairReason(parsed, routeResult, sourceMessage) {
  if (sourceMessage?.requiresFleetMessage && routeResult.queued.length === 0) {
    return 'This routing-format retry still produced no valid routed FLEET_MESSAGE.';
  }
  if (parsed.malformedMessageEnvelope) {
    return 'Your response contained a FLEET_MESSAGE marker, but no complete valid envelope with recipient and body could be parsed.';
  }
  if (routeResult.failures.length) {
    return routeResult.failures
      .map((failure) => `Failed target ${failure.target}: ${failure.reason}`)
      .join('\n');
  }
  return '';
}

function queueProtocolRepair(state, {
  workerId,
  failedAssignmentId,
  taskId,
  sourceMessage,
  reason,
  routeFailures,
}) {
  const used = Number(sourceMessage?.protocolRepairAttempts || 0);
  if (used >= MAX_PROTOCOL_REPAIR_ATTEMPTS) return null;

  const failedOnly = routeFailures.length
    ? routeFailures.map((failure) => `- intended target: ${failure.target}\n  message: ${String(failure.body || '').trim()}`).join('\n')
    : '- Recover the intended peer recipient and message from your immediately previous response.';

  const body = [
    'FLEET ROUTING FORMAT RETRY.',
    `Your previous completion (${failedAssignmentId}) finished the underlying work, but required peer delivery was not durably routed.`,
    `Reason: ${reason}`,
    '',
    'Do NOT redo the underlying task or analysis.',
    'Re-emit ONLY the peer delivery that failed routing. Do not resend any peer message that was already accepted.',
    'Use one complete envelope per delivery with an exact currently registered W-... recipient:',
    '[FLEET_MESSAGE to="W-123"]',
    'message body',
    '[/FLEET_MESSAGE]',
    '',
    'Failed delivery context:',
    failedOnly,
    '',
    'End with exactly one FLEET_STATUS envelope after the repaired peer message(s).',
    'If the correct recipient cannot be determined from the registered peer list and your immediately previous response, use state="blocked" and explain why.',
  ].join('\n');

  return queueSemanticMessage(state, {
    from: 'scheduler',
    toWorkerId: workerId,
    body,
    taskId,
    requiresFleetMessage: true,
    protocolRepairOf: failedAssignmentId,
    protocolRepairAttempts: used + 1,
  });
}

function chooseDispatches(state) {
  if (state.policy.paused || !state.policy.authorityEnabled) return [];
  const maxConcurrency = Math.max(1, Math.min(64, Number(state.policy.maxConcurrency || 8)));
  let active = Object.values(state.workers).filter((w) => w.currentAssignmentId).length;
  const dispatches = [];
  const available = () => Object.values(state.workers).filter((w) => w.enabled
    && !w.currentAssignmentId
    && !workerBusyIsFresh(w)
    && Number(w.pageBusyUntil || 0) <= now()
    && w.status !== 'blocked');

  const queuedMessages = state.messages
    .filter((m) => m.status === 'queued' && m.toWorkerId !== 'operator')
    .sort((a, b) => a.createdAt - b.createdAt);

  for (const message of queuedMessages) {
    if (active >= maxConcurrency) break;
    const worker = state.workers[message.toWorkerId];
    if (!worker || !available().some((w) => w.id === worker.id)) continue;
    const assignmentId = `A-M-${message.id}-${state.generation + 1}`;
    message.status = 'running';
    message.assignmentId = assignmentId;
    message.deliveredAt = now();
    worker.currentAssignmentId = assignmentId;
    worker.currentMessageId = message.id;
    worker.status = 'activating';
    worker.lifecycle = 'activating';
    worker.warmIdleSince = 0;
    worker.warmIdleUntil = 0;
    dispatches.push({
      workerId: worker.id,
      tabId: worker.tabId,
      assignment: {
        id: assignmentId,
        kind: 'message',
        messageId: message.id,
        prompt: buildMessagePrompt(state, message, worker),
      },
    });
    active += 1;
    appendJournal(state, 'message.reserved', `${message.id} reserved for ${worker.id}`);
  }

  const tasks = Object.values(state.tasks)
    .filter((task) => taskRunnable(state, task))
    .sort((a, b) => (b.priority || 0) - (a.priority || 0) || a.createdAt - b.createdAt);

  for (const task of tasks) {
    if (active >= maxConcurrency) break;
    const worker = available().find((candidate) => workerMatches(candidate, task));
    if (!worker) continue;
    const assignmentId = `A-${task.id}-${state.generation + 1}`;
    task.status = 'running';
    task.assignedWorkerId = worker.id;
    task.assignmentId = assignmentId;
    task.startedAt = now();
    task.attempts = Number(task.attempts || 0) + 1;
    worker.currentAssignmentId = assignmentId;
    worker.currentTaskId = task.id;
    worker.status = 'activating';
    worker.lifecycle = 'activating';
    worker.warmIdleSince = 0;
    worker.warmIdleUntil = 0;
    dispatches.push({
      workerId: worker.id,
      tabId: worker.tabId,
      assignment: {
        id: assignmentId,
        kind: 'task',
        taskId: task.id,
        prompt: buildTaskPrompt(state, task, worker),
      },
    });
    active += 1;
    appendJournal(state, 'task.reserved', `${task.id} reserved for ${worker.id}`, { assignmentId });
  }

  return dispatches;
}

async function failDispatch(dispatch, error) {
  const errorText = String(error);
  const { result } = await mutateFleet((state) => {
    const worker = state.workers[dispatch.workerId];
    const blockWorker = !state.policy.paused && state.policy.authorityEnabled;
    if (worker?.currentAssignmentId === dispatch.assignment.id) {
      worker.currentAssignmentId = null;
      worker.currentTaskId = null;
      worker.currentMessageId = null;
      worker.status = worker.enabled ? (blockWorker ? 'blocked' : 'idle') : 'offline';
      worker.lifecycle = worker.enabled ? 'idle' : 'offline';
      worker.busy = false;
      worker.warmIdleSince = 0;
      worker.warmIdleUntil = 0;
      worker.lastDispatchError = errorText;
      worker.dispatchFailureCount = Number(worker.dispatchFailureCount || 0) + 1;
      worker.lastDispatchFailureAt = now();
    }
    if (dispatch.assignment.kind === 'task') {
      const task = state.tasks[dispatch.assignment.taskId];
      if (task?.assignmentId === dispatch.assignment.id) {
        task.status = 'pending';
        task.assignedWorkerId = null;
        task.assignmentId = null;
        task.statusNote = 'dispatch failed on ' + dispatch.workerId + ': ' + errorText;
      }
    } else {
      const message = state.messages.find((m) => m.id === dispatch.assignment.messageId);
      if (message?.assignmentId === dispatch.assignment.id) {
        message.status = 'queued';
        message.assignmentId = null;
        message.lastDispatchError = errorText;
        message.dispatchFailureCount = Number(message.dispatchFailureCount || 0) + 1;
        if (blockWorker) {
          message.lastDeferredReason = 'target worker blocked after dispatch failure: ' + errorText;
        }
      }
    }
    appendJournal(state, 'dispatch.failed', dispatch.assignment.id + ' failed: ' + errorText, {
      error: errorText,
      workerBlocked: !!worker && worker.status === 'blocked',
    });
    return { workerBlocked: !!worker && worker.status === 'blocked' };
  });
  return result || { workerBlocked: false };
}

async function journalDeferredMessages(preview, reason) {
  const queued = preview.messages.filter((message) => message.status === 'queued' && message.toWorkerId !== 'operator');
  if (!queued.length) return;
  await mutateFleet((state) => {
    for (const message of queued) {
      const target = state.workers[message.toWorkerId];
      let detail = reason;
      if (!target) detail = 'target worker missing';
      else if (!target.enabled) detail = 'target worker disabled';
      else if (target.currentAssignmentId) detail = `target owns ${target.currentAssignmentId}`;
      else if (target.status === 'blocked') detail = 'target worker blocked';
      else if (workerBusyIsFresh(target)) detail = 'target worker busy with fresh heartbeat';
      if (message.lastDeferredReason === detail) continue;
      message.lastDeferredReason = detail;
      appendJournal(state, 'schedule.deferred', `${message.id} → ${message.toWorkerId}: ${detail}`);
    }
  });
}

async function dispatchReserved(dispatch) {
  await mutateFleet((state) => {
    appendJournal(state, 'dispatch.attempt', `${dispatch.assignment.id} → ${dispatch.workerId}`, {
      workerId: dispatch.workerId,
      tabId: dispatch.tabId,
      kind: dispatch.assignment.kind,
    });
  });

  try {
    await clearWarmIdleAlarm(dispatch.workerId);
    await assertDispatchStillAuthorized(dispatch);
    const pageActivity = await readFleetPageActivity(dispatch.tabId);
    if (pageActivity.busy) {
      await deferReservedDispatchForActivePage(dispatch);
      return;
    }
    await activateWorkerForDispatch(dispatch);
    await assertDispatchStillAuthorized(dispatch);
    const response = await Promise.race([
      chrome.tabs.sendMessage(dispatch.tabId, {
        type: 'fleet:execute-assignment',
        assignment: dispatch.assignment,
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('worker dispatch acknowledgement timeout')), 10000)),
    ]);
    if (!response?.ok) throw new Error(response?.error || 'worker rejected assignment');
    await mutateFleet((state) => {
      const worker = state.workers[dispatch.workerId];
      if (worker?.currentAssignmentId === dispatch.assignment.id) {
        worker.status = 'running';
        worker.lifecycle = 'running';
        worker.lastDispatchError = '';
        worker.dispatchFailureCount = 0;
        worker.lastDispatchFailureAt = 0;
      }
      appendJournal(state, 'dispatch.accepted', `${dispatch.assignment.id} accepted by ${dispatch.workerId}`, {
        workerId: dispatch.workerId,
        tabId: dispatch.tabId,
      });
      if (dispatch.assignment.kind === 'message') {
        appendJournal(state, 'message.sent', `${dispatch.assignment.messageId} sent to ${dispatch.workerId}`, {
          assignmentId: dispatch.assignment.id,
        });
      } else {
        appendJournal(state, 'task.started', `${dispatch.assignment.taskId} started by ${dispatch.workerId}`, {
          assignmentId: dispatch.assignment.id,
        });
      }
    });
  } catch (error) {
    const failure = await failDispatch(dispatch, error);
    if (!failure?.workerBlocked) {
      await settleWorkerIdle(dispatch.workerId, 'dispatch failure').catch(() => {});
    }
  } finally {
    // A transport path must never hold up admission for unrelated worker windows.
    schedule().catch(() => {});
  }
}

async function schedule() {
  if (scheduling) {
    schedulePending = true;
    return;
  }

  // Serialize only the short authority/reservation phase. Worker activation and
  // acknowledgement run independently after reservations are committed.
  scheduling = true;
  let dispatches = [];
  try {
    const preview = await loadFleetState();
    if (preview.policy.paused || !preview.policy.authorityEnabled) {
      await journalDeferredMessages(preview, preview.policy.paused ? 'dispatch paused' : 'authority revoked');
      return;
    }
    const active = Object.values(preview.workers).filter((worker) => worker.currentAssignmentId).length;
    const maxConcurrency = Math.max(1, Math.min(64, Number(preview.policy.maxConcurrency || 8)));
    if (active >= maxConcurrency) {
      await journalDeferredMessages(preview, `concurrency saturated ${active}/${maxConcurrency}`);
      return;
    }
    const queuedMessages = preview.messages.filter((message) => message.status === 'queued' && message.toWorkerId !== 'operator');
    const hasQueuedMessage = queuedMessages.length > 0;
    const hasDispatchableMessage = queuedMessages.some((message) => {
      const target = preview.workers[message.toWorkerId];
      return !!target
        && target.enabled
        && !target.currentAssignmentId
        && !workerBusyIsFresh(target)
        && Number(target.pageBusyUntil || 0) <= now()
        && target.status !== 'blocked'
        && target.lifecycle !== 'parking';
    });
    const runnableTasks = Object.values(preview.tasks).filter((task) => taskRunnable(preview, task));
    const hasRunnableTask = runnableTasks.length > 0;
    const hasDispatchableTask = runnableTasks.some((task) => Object.values(preview.workers).some((worker) => workerMatches(worker, task)));
    if (!hasQueuedMessage && !hasRunnableTask) return;
    if (!hasDispatchableMessage && !hasDispatchableTask) {
      await journalDeferredMessages(preview, hasQueuedMessage ? 'target not currently eligible' : 'no eligible worker');
      return;
    }

    const reserved = await mutateFleet((state) => chooseDispatches(state));
    dispatches = reserved.result || [];
    if (!dispatches.length) {
      const latest = await loadFleetState();
      await journalDeferredMessages(latest, 'no dispatch selected after eligibility check');
    }
  } catch (error) {
    // Callers intentionally kick the scheduler fire-and-forget. Preserve the
    // error in the fleet journal so a queued message cannot fail silently.
    try {
      await mutateFleet((state) => {
        appendJournal(state, 'schedule.failed', 'Scheduler failed while admitting queued work', {
          error: String(error),
        });
      });
    } catch {
      // Do not replace the original scheduler error if persistence is also
      // unavailable.
    }
    throw error;
  } finally {
    scheduling = false;
    if (schedulePending) {
      schedulePending = false;
      queueMicrotask(() => schedule().catch(() => {}));
    }
  }

  // Dedicated worker windows may begin dispatch immediately and concurrently.
  for (const dispatch of dispatches) {
    dispatchReserved(dispatch).catch((error) => {
      console.warn('[model-fleet] reserved dispatch transport failed unexpectedly', dispatch.assignment.id, error);
    });
  }
}

async function scheduleMessageUntilAdmitted(messageId, maxAttempts = 5) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    await schedule();
    const state = await loadFleetState();
    const message = state.messages.find((item) => item.id === messageId);
    if (!message || message.status !== 'queued') return message || null;
    if (attempt + 1 < maxAttempts) await delay(250);
  }
  return (await loadFleetState()).messages.find((item) => item.id === messageId) || null;
}

async function completeAssignment(senderTabId, payload) {
  liveHeartbeats.delete(workerIdForTab(senderTabId));
  const workerId = workerIdForTab(senderTabId);
  const responseText = String(payload.text || '').slice(0, MAX_RESULT_CHARS);
  const parsed = parseFleetOutput(responseText);
  const { state } = await mutateFleet((state) => {
    const worker = state.workers[workerId];
    if (!worker || worker.currentAssignmentId !== payload.assignmentId) return;

    const finishedTaskId = worker.currentTaskId;
    const finishedMessageId = worker.currentMessageId;
    const sourceMessage = finishedMessageId
      ? state.messages.find((message) => message.id === finishedMessageId)
      : null;

    const routeResult = routeParsedMessages(state, workerId, parsed, finishedTaskId || null);
    const repairReason = protocolRepairReason(parsed, routeResult, sourceMessage);
    let repairMessage = null;
    let repairExhausted = false;

    if (repairReason) {
      repairMessage = queueProtocolRepair(state, {
        workerId,
        failedAssignmentId: payload.assignmentId,
        taskId: finishedTaskId || sourceMessage?.taskId || null,
        sourceMessage,
        reason: repairReason,
        routeFailures: routeResult.failures,
      });
      repairExhausted = !repairMessage && sourceMessage?.requiresFleetMessage === true;

      appendJournal(
        state,
        repairMessage ? 'assignment.protocol_repair_queued' : 'assignment.protocol_repair_exhausted',
        repairMessage
          ? `${payload.assignmentId}: peer routing failed; queued ${repairMessage.id} back to ${workerId}`
          : `${payload.assignmentId}: peer routing repair exhausted for ${workerId}`,
        {
          workerId,
          taskId: finishedTaskId || null,
          messageId: finishedMessageId || null,
          reason: repairReason,
          repairMessageId: repairMessage?.id || null,
        },
      );

      if (repairExhausted) {
        queueSemanticMessage(state, {
          from: 'scheduler',
          toWorkerId: 'operator',
          body: `Fleet peer-routing repair failed for ${workerId} (${payload.assignmentId}).\n\n${repairReason}`,
          taskId: finishedTaskId || sourceMessage?.taskId || null,
        });
      }
    }

    if (finishedTaskId) {
      const task = state.tasks[finishedTaskId];
      if (task?.assignmentId === payload.assignmentId) {
        task.status = parsed.state === 'blocked' ? 'blocked' : 'done';
        task.completedAt = now();
        task.result = responseText;
        task.statusNote = repairMessage
          ? `peer routing repair queued as ${repairMessage.id}`
          : parsed.statusNote;
        appendJournal(state, `task.${task.status}`, `${task.id} ${task.status} by ${workerId}`);
      }
    }

    if (finishedMessageId) {
      const message = state.messages.find((m) => m.id === finishedMessageId);
      if (message?.assignmentId === payload.assignmentId) {
        message.status = repairExhausted ? 'blocked' : 'done';
        message.completedAt = now();
        message.response = responseText;
        if (repairMessage) message.protocolRepairMessageId = repairMessage.id;
        appendJournal(
          state,
          repairExhausted ? 'message.protocol_repair_failed' : 'message.completed',
          repairExhausted
            ? `${message.id} exhausted peer-routing repair at ${workerId}`
            : `${message.id} handled by ${workerId}`,
        );
      }
    }

    appendJournal(state, 'assignment.parsed', `${payload.assignmentId}: ${parsed.messages.length} semantic message(s), marker=${parsed.markerPresent ? 'yes' : 'no'}, state=${parsed.state}`, {
      workerId,
      taskId: finishedTaskId || null,
      messageCount: parsed.messages.length,
      markerPresent: parsed.markerPresent,
      malformedMessageEnvelope: parsed.malformedMessageEnvelope,
      routedMessageCount: routeResult.queued.length,
      routeFailureCount: routeResult.failures.length,
      protocolRepairMessageId: repairMessage?.id || null,
    });
    worker.currentAssignmentId = null;
    worker.currentTaskId = null;
    worker.currentMessageId = null;
    worker.status = 'idle';
    worker.lifecycle = 'idle';
    worker.busy = false;
    worker.lastResultAt = now();
    worker.progressVersion = Number(worker.progressVersion || 0) + 1;
    worker.heartbeatAt = now();
  });
  await beginWarmIdle(workerId, `assignment ${payload.assignmentId || 'unknown'} completed`);
  schedule().catch(() => {});
  return publicSnapshot(await loadFleetState());
}

async function flushWorkerHeartbeats() {
  if (heartbeatFlushPromise) return heartbeatFlushPromise;
  const batch = new Map(liveHeartbeats);
  if (!batch.size) return { scheduleNeeded: false };

  const operation = stateQueue.then(async () => {
    const state = await loadFleetState();
    let touched = false;
    let scheduleNeeded = false;
    const heartbeatDelta = {};
    for (const [workerId, heartbeat] of batch) {
      const worker = state.workers[workerId];
      if (!worker) continue;
      const wasBusy = worker.busy === true;
      worker.title = heartbeat.title || worker.title;
      worker.url = heartbeat.url || worker.url;
      worker.windowId = Number.isInteger(heartbeat.windowId) ? heartbeat.windowId : worker.windowId;
      worker.heartbeatAt = Math.max(Number(worker.heartbeatAt || 0), heartbeat.at);
      worker.busy = heartbeat.busy === true;
      if (!worker.currentAssignmentId && worker.status !== 'blocked') {
        worker.status = worker.busy ? "waiting" : "idle";
      }
      if (wasBusy && !worker.busy) scheduleNeeded = true;
      heartbeatDelta[workerId] = { heartbeatAt: worker.heartbeatAt, busy: worker.busy, status: worker.status };
      touched = true;
    }
    if (touched) {
      state.updatedAt = now();
      await chrome.storage.local.set({ [FLEET_STATE_KEY]: state });
      await broadcastHeartbeatDelta(heartbeatDelta);
    }
    for (const [workerId, heartbeat] of batch) {
      const current = liveHeartbeats.get(workerId);
      if (current && current.at <= heartbeat.at) liveHeartbeats.delete(workerId);
    }
    lastHeartbeatFlushAt = now();
    return { state, scheduleNeeded };
  });
  stateQueue = operation.catch(() => {});
  heartbeatFlushPromise = operation.finally(() => { heartbeatFlushPromise = null; });
  return heartbeatFlushPromise;
}

async function updateWorkerHeartbeat(tab, payload) {
  const observedAt = now();
  const workerId = workerIdForTab(tab.id);
  liveHeartbeats.set(workerId, {
    at: observedAt,
    busy: payload.busy === true,
    title: tab.title || "",
    url: tab.url || "",
    windowId: Number.isInteger(tab.windowId) ? tab.windowId : null,
  });
  if (observedAt - lastHeartbeatFlushAt >= HEARTBEAT_FLUSH_MS) {
    try {
      const result = await flushWorkerHeartbeats();
      if (result?.scheduleNeeded) schedule().catch(() => {});
    } catch (error) {
      console.debug("[model-fleet] heartbeat batch flush deferred", error);
    }
  }
  return { heartbeatAt: observedAt };
}

async function reconcileOnHello(tab, payload = {}) {
  liveHeartbeats.delete(workerIdForTab(tab.id));
  const workerId = workerIdForTab(tab.id);
  const liveAssignmentId = payload.activeAssignmentId || null;
  const { state, result } = await mutateFleet((state) => {
    const worker = state.workers[workerId];
    if (!worker) return null;

    const preserveActivatingReservation = worker.lifecycle === 'activating'
      && !!worker.currentAssignmentId
      && !liveAssignmentId;
    const preserveLiveAssignment = !!worker.currentAssignmentId
      && liveAssignmentId === worker.currentAssignmentId;

    if (worker.currentAssignmentId && !preserveActivatingReservation && !preserveLiveAssignment) {
      if (worker.currentTaskId) {
        const task = state.tasks[worker.currentTaskId];
        if (task?.status === 'running') {
          task.status = 'pending';
          task.assignedWorkerId = null;
          task.assignmentId = null;
          task.startedAt = 0;
          appendJournal(state, 'task.requeued', `${task.id} requeued after ${workerId} page lifecycle restart`);
        }
      }
      if (worker.currentMessageId) {
        const message = state.messages.find((m) => m.id === worker.currentMessageId);
        if (message?.status === 'running') {
          message.status = 'queued';
          message.assignmentId = null;
        }
      }
      worker.currentAssignmentId = null;
      worker.currentTaskId = null;
      worker.currentMessageId = null;
      worker.status = 'idle';
      worker.lifecycle = 'idle';
      worker.busy = false;
    } else if (preserveLiveAssignment) {
      worker.status = 'running';
      worker.lifecycle = 'running';
      worker.busy = true;
      appendJournal(state, 'worker.recovered', `${workerId} resumed live assignment ${worker.currentAssignmentId}`);
    } else if (preserveActivatingReservation) {
      worker.status = 'activating';
      worker.lifecycle = 'activating';
      worker.busy = false;
    } else {
      worker.status = 'idle';
      if (worker.lifecycle !== 'warm-idle') worker.lifecycle = 'idle';
      worker.busy = false;
    }

    worker.heartbeatAt = now();
    worker.title = tab.title || worker.title;
    worker.url = tab.url || worker.url;
    worker.windowId = Number.isInteger(tab.windowId) ? tab.windowId : worker.windowId;
    return worker;
  });
  schedule().catch(() => {});
  return { registered: !!result, worker: result, snapshot: publicSnapshot(state) };
}

async function updateBadge(tabId, approvalState = null) {
  if (!Number.isInteger(tabId)) return;
  const tab = await supportedTab(tabId);
  if (!tab) {
    await chrome.action.setBadgeText({ tabId, text: '' });
    return;
  }
  const state = approvalState || await getTabState(tabId);
  const fleet = await loadFleetState();
  const worker = fleet.workers[workerIdForTab(tabId)];
  let text = '';
  let color = '#166534';
  if (worker?.enabled) {
    text = worker.currentAssignmentId ? 'RUN' : 'W';
    color = worker.currentAssignmentId ? '#1d4ed8' : '#6d28d9';
  } else if (state.enabled) {
    text = 'ON';
  }
  await chrome.action.setBadgeText({ tabId, text });
  if (text) await chrome.action.setBadgeBackgroundColor({ tabId, color });
}

async function registerAllSupportedTabs() {
  const tabs = await chrome.tabs.query({});
  const supported = tabs.filter((tab) => Number.isInteger(tab.id) && SUPPORTED_URL.test(tab.url || ''));
  const { state } = await mutateFleet((state) => {
    for (const tab of supported) {
      const worker = upsertWorker(state, tab, { enabled: true });
      appendJournal(state, 'worker.registered', `${worker.id} registered`, { source: 'register-all' });
    }
  });
  await cleanupLegacySleepTabs('register-all migration');
  for (const tab of supported) {
    updateBadge(tab.id).catch(() => {});
    const workerId = workerIdForTab(tab.id);
    const current = await loadFleetState();
    const worker = current.workers[workerId];
    try {
      if (current.policy.activeWorkerWindows && worker) await ensureWorkerWindow(workerId);
      const bridgeState = await ensureFleetBridge(tab.id);
      await mutateFleet((latest) => reconcileBridgeRuntimeState(latest, workerId, bridgeState));
      await chrome.tabs.sendMessage(tab.id, { type: 'fleet:registration-changed', registered: true, worker });
    } catch (error) {
      await mutateFleet((latest) => {
        const item = latest.workers[workerId];
        if (item && !item.currentAssignmentId) item.status = 'idle';
        appendJournal(latest, 'worker.bridge_failed', `${workerId} bridge unavailable`, { error: String(error) });
      });
    }
  }
  schedule().catch(() => {});
  return publicSnapshot(await loadFleetState());
}

async function focusWorker(workerId) {
  await clearWarmIdleAlarm(workerId);
  const state = await loadFleetState();
  const worker = state.workers[workerId];
  if (!worker) throw new Error('worker not found');
  const stable = state.policy.activeWorkerWindows
    ? await ensureWorkerWindow(workerId)
    : { windowId: (await chrome.tabs.get(worker.tabId)).windowId };
  await chrome.tabs.update(worker.tabId, { active: true });
  await chrome.windows.update(stable.windowId, { focused: true });
  await mutateFleet((latest) => {
    const current = latest.workers[workerId];
    if (!current) return;
    current.windowId = stable.windowId;
    current.activeWindowId = stable.windowId;
    current.lifecycle = current.currentAssignmentId ? current.lifecycle : 'manual';
    appendJournal(latest, 'worker.focused', `${workerId} focused in dedicated live window ${stable.windowId}`, { windowId: stable.windowId });
  });
}

const OPERATOR_CANCEL_REASON = 'operator clear/cancel dispatch';

function releaseWorkerAssignment(state, workerId, assignmentId, reason, {
  requeue = true,
  eventType = 'assignment.cancelled',
  terminalStatus = 'cancelled',
} = {}) {
  liveHeartbeats.delete(workerId);
  const worker = state.workers[workerId];
  if (!worker || !worker.currentAssignmentId) return null;
  if (assignmentId && worker.currentAssignmentId !== assignmentId) return null;

  const releasedAssignmentId = worker.currentAssignmentId;
  const taskId = worker.currentTaskId;
  const messageId = worker.currentMessageId;

  if (taskId) {
    const task = state.tasks[taskId];
    if (task?.assignmentId === releasedAssignmentId) {
      task.assignedWorkerId = null;
      task.assignmentId = null;
      task.startedAt = 0;
      if (requeue) {
        task.status = 'pending';
      } else {
        task.status = terminalStatus;
        task.completedAt = now();
        task.statusNote = reason || (terminalStatus === 'blocked' ? 'automatic recovery exhausted' : 'cancelled by operator');
      }
    }
  }

  if (messageId) {
    const semantic = state.messages.find((m) => m.id === messageId);
    if (semantic?.assignmentId === releasedAssignmentId) {
      semantic.assignmentId = null;
      if (requeue) {
        semantic.status = 'queued';
      } else {
        semantic.status = terminalStatus;
        semantic.completedAt = now();
        semantic.lastDispatchError = reason || '';
      }
    }
  }

  worker.currentAssignmentId = null;
  worker.currentTaskId = null;
  worker.currentMessageId = null;
  worker.status = 'idle';
  worker.lifecycle = 'idle';
  worker.busy = false;
  worker.lastResultAt = now();
  worker.progressVersion = Number(worker.progressVersion || 0) + 1;
  worker.heartbeatAt = now();

  appendJournal(state, eventType, `${worker.id} released ${releasedAssignmentId}`, {
    assignmentId: releasedAssignmentId,
    taskId: taskId || null,
    messageId: messageId || null,
    reason: reason || '',
    requeued: requeue,
  });
  return { workerId, assignmentId: releasedAssignmentId, taskId, messageId, requeued: requeue };
}

async function cancelWorkerDispatch(workerId) {
  const initial = await loadFleetState();
  const worker = initial.workers[workerId];
  if (!worker) throw new Error('worker not found');
  if (!worker.currentAssignmentId) throw new Error('worker has no active dispatch');

  const assignmentId = worker.currentAssignmentId;
  const tabId = worker.tabId;
  await mutateFleet((state) => {
    const current = state.workers[workerId];
    if (!current || current.currentAssignmentId !== assignmentId) throw new Error('dispatch changed before cancellation');
    current.status = 'cancelling';
    appendJournal(state, 'assignment.cancel.requested', `${workerId} operator cancel requested for ${assignmentId}`, { assignmentId });
  });

  let transportError = '';
  try {
    const response = await Promise.race([
      chrome.tabs.sendMessage(tabId, { type: 'fleet:cancel-current', reason: OPERATOR_CANCEL_REASON }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('worker cancellation acknowledgement timeout')), 10000)),
    ]);
    if (!response?.ok) throw new Error(response?.error || 'worker rejected cancellation');
  } catch (error) {
    transportError = String(error);
  }

  const { state, result } = await mutateFleet((state) => {
    const current = state.workers[workerId];
    let released = null;
    if (current?.currentAssignmentId === assignmentId) {
      released = releaseWorkerAssignment(state, workerId, assignmentId, OPERATOR_CANCEL_REASON, {
        requeue: false,
        eventType: 'assignment.operator_cancelled',
      });
    }
    if (transportError) {
      appendJournal(state, 'assignment.cancel.transport_failed', `${workerId} local stop acknowledgement failed`, {
        assignmentId,
        error: transportError,
      });
    }
    return released;
  });
  schedule().catch(() => {});
  return { snapshot: publicSnapshot(state), assignmentId, released: !!result, transportError };
}

async function stopAndFlushStaleWork() {
  const { result: initial } = await mutateFleet((state) => {
    state.policy.paused = true;
    const activeWorkerIds = Object.values(state.workers)
      .filter((worker) => worker.currentAssignmentId)
      .map((worker) => worker.id);
    let cancelledQueued = 0;
    for (const message of state.messages) {
      if (message.status !== 'queued' || message.toWorkerId === 'operator') continue;
      message.status = 'cancelled';
      message.completedAt = now();
      message.lastDeferredReason = 'stale queued worker message';
      cancelledQueued += 1;
      appendJournal(state, 'message.cancelled', `${message.id} cancelled: ${message.lastDeferredReason}`);
    }
    appendJournal(state, 'authority.stale_work_stop', 'Paused dispatch and flushed active and queued worker work', {
      activeAssignments: activeWorkerIds.length,
      cancelledQueued,
    });
    return { activeWorkerIds, cancelledQueued };
  });

  let cancelledActive = 0;
  let cancellationWarnings = 0;
  for (const workerId of initial.activeWorkerIds) {
    try {
      const result = await cancelWorkerDispatch(workerId);
      if (result.released) cancelledActive += 1;
      if (result.transportError) cancellationWarnings += 1;
    } catch (error) {
      cancellationWarnings += 1;
      await mutateFleet((state) => {
        appendJournal(state, 'assignment.cancel.failed', `${workerId} stale assignment could not be cancelled`, {
          error: String(error),
        });
      });
    }
  }

  const state = await loadFleetState();
  return {
    snapshot: publicSnapshot(state),
    cancelledActive,
    cancelledQueued: initial.cancelledQueued,
    cancellationWarnings,
  };
}

async function killAuthority() {
  const { state, result: tabs } = await mutateFleet((state) => {
    state.policy.authorityEnabled = false;
    state.policy.paused = true;
    const tabs = [];
    for (const worker of Object.values(state.workers)) {
      if (worker.currentAssignmentId) tabs.push({ tabId: worker.tabId, workerId: worker.id });
    }
    appendJournal(state, 'authority.killed', 'Operator revoked fleet dispatch authority');
    return tabs;
  });
  for (const item of tabs) {
    try {
      await chrome.tabs.sendMessage(item.tabId, { type: 'fleet:cancel-current', reason: 'authority revoked' });
    } catch {
      // Best effort stop.
    }
  }
  return publicSnapshot(state);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || typeof message.type !== 'string') return false;

  const reply = (promise) => {
    promise.then((value) => sendResponse({ ok: true, ...value })).catch((error) => sendResponse({ ok: false, error: String(error) }));
    return true;
  };

  if (message.type === 'approval:send-message-now') {
    return reply(sendApprovalMessage(message.tabId, message.text));
  }
  if (message.type === 'approval:get-own-tab-state') {
    const tabId = sender.tab?.id;
    return reply(getTabState(tabId).then((state) => ({ state, supported: Number.isInteger(tabId) })));
  }
  if (message.type === 'approval:get-tab-state') {
    const tabId = message.tabId;
    return reply(Promise.all([getTabState(tabId), supportedTab(tabId)]).then(([state, tab]) => ({ state, supported: !!tab })));
  }
  if (message.type === 'approval:get-turn-signal') {
    const tabId = sender.tab?.id;
    if (!Number.isInteger(tabId)) return false;
    return reply(readRepeatTurnSignal(tabId).then((signal) => ({ signal })));
  }
  if (message.type === 'approval:set-tab-state') {
    const tabId = message.tabId;
    return reply(setTabState(tabId, message.patch || {}).then(async (state) => {
      const tab = await supportedTab(tabId);
      if (tab) {
        // UI-originated state changes are not successful until the live page
        // bridge is proven and the exact state has reached that bridge.
        await ensureApprovalBridge(tabId);
        await chrome.tabs.sendMessage(tabId, { type: 'approval:tab-state-changed', state });
      }
      return { state, supported: !!tab };
    }));
  }
  if (message.type === 'approval:repeat-sent') {
    const tabId = sender.tab?.id;
    if (!Number.isInteger(tabId)) return false;
    return reply(recordRepeatMessageSent(tabId).then((state) => ({ state })));
  }
  if (message.type === 'approval:restart-repeat-cycle') {
    const tabId = sender.tab?.id;
    if (!Number.isInteger(tabId)) return false;
    return reply(restartRepeatCycle(tabId));
  }

  if (message.type === 'fleet:get-snapshot') {
    return reply(loadFleetState().then((state) => ({ snapshot: publicSnapshot(state) })));
  }
  if (message.type === 'fleet:get-tab-worker-state') {
    return reply(loadFleetState().then((state) => ({ worker: state.workers[workerIdForTab(message.tabId)] || null })));
  }
  if (message.type === 'fleet:register-own-worker') {
    const tabId = sender.tab?.id;
    return reply(registerTab(tabId, message.patch || {}).then(({ worker, snapshot }) => ({ worker, snapshot })));
  }
  if (message.type === 'fleet:register-tab') {
    return reply(registerTab(message.tabId, message.patch || {}).then(({ worker, snapshot }) => ({ worker, snapshot })));
  }
  if (message.type === 'fleet:register-all-tabs') {
    return reply(registerAllSupportedTabs().then((snapshot) => ({ snapshot })));
  }
  if (message.type === 'fleet:unregister-worker') {
    return reply(unregisterWorker(message.workerId).then((snapshot) => ({ snapshot })));
  }
  if (message.type === 'fleet:focus-worker') {
    return reply(focusWorker(message.workerId).then(() => ({})));
  }
  if (message.type === 'fleet:set-worker-role') {
    return reply(mutateFleet((state) => {
      const worker = state.workers[message.workerId];
      if (!worker) throw new Error('worker not found');
      worker.role = normalizeRole(message.role);
      appendJournal(state, 'worker.role', `${worker.id} role → ${worker.role}`);
    }).then(({ state }) => ({ snapshot: publicSnapshot(state) })));
  }
  if (message.type === 'fleet:set-goal') {
    return reply(mutateFleet((state) => {
      state.goal = String(message.goal || '').trim();
      appendJournal(state, 'goal.changed', state.goal || 'Goal cleared');
    }).then(({ state }) => ({ snapshot: publicSnapshot(state) })));
  }
  if (message.type === 'fleet:create-task') {
    return reply(mutateFleet((state) => {
      const id = `T-${state.nextTask++}`;
      const task = {
        id,
        title: String(message.title || '').trim() || id,
        prompt: String(message.prompt || '').trim(),
        role: normalizeRole(message.role),
        priority: Math.max(-100, Math.min(100, Number(message.priority || 0))),
        dependencies: Array.isArray(message.dependencies) ? message.dependencies.filter((x) => state.tasks[x]) : [],
        status: 'pending',
        assignedWorkerId: null,
        assignmentId: null,
        attempts: 0,
        createdAt: now(),
        startedAt: 0,
        completedAt: 0,
        result: '',
        statusNote: '',
        autoRecoveryAttempts: 0,
        lastAutoRecoveryReason: '',
      };
      if (!task.prompt) throw new Error('task prompt is required');
      state.tasks[id] = task;
      appendJournal(state, 'task.created', `${id}: ${task.title}`, { role: task.role });
      return task;
    }).then(({ state, result: task }) => {
      schedule().catch(() => {});
      return { task, snapshot: publicSnapshot(state) };
    }));
  }
  if (message.type === 'fleet:retry-task') {
    return reply(mutateFleet((state) => {
      const task = state.tasks[message.taskId];
      if (!task) throw new Error('task not found');
      if (task.status === 'running') throw new Error('task is currently running');
      task.status = 'pending';
      task.assignedWorkerId = null;
      task.assignmentId = null;
      task.result = '';
      task.statusNote = '';
      task.autoRecoveryAttempts = 0;
      task.lastAutoRecoveryReason = '';
      appendJournal(state, 'task.retried', `${task.id} queued for retry`);
    }).then(({ state }) => {
      schedule().catch(() => {});
      return { snapshot: publicSnapshot(state) };
    }));
  }
  if (message.type === 'fleet:send-message') {
    return reply(mutateFleet((state) => {
      const target = String(message.toWorkerId || '').trim();
      if (target !== 'operator' && !state.workers[target]) throw new Error('target worker not found');
      const queued = queueSemanticMessage(state, {
        from: 'operator',
        toWorkerId: target,
        body: message.body,
        taskId: message.taskId || null,
      });
      if (!queued.body) throw new Error('message body is required');
      return queued;
    }).then(async ({ result: queued }) => {
      let scheduleError = null;
      try {
        // Wait through reservation, but not worker activation/acknowledgement.
        // This makes the response reflect whether the target was admitted.
        await scheduleMessageUntilAdmitted(queued.id);
      } catch (error) {
        scheduleError = String(error);
      }
      return { message: queued, scheduleError, snapshot: publicSnapshot(await loadFleetState()) };
    }));
  }
  if (message.type === 'fleet:update-policy') {
    return reply(mutateFleet((state) => {
      const patch = message.patch || {};
      if (Object.prototype.hasOwnProperty.call(patch, 'maxConcurrency')) {
        state.policy.maxConcurrency = Math.max(1, Math.min(64, Number(patch.maxConcurrency || 1)));
      }
      if (Object.prototype.hasOwnProperty.call(patch, 'paused')) state.policy.paused = patch.paused === true;
      if (Object.prototype.hasOwnProperty.call(patch, 'authorityEnabled')) state.policy.authorityEnabled = patch.authorityEnabled === true;
      if (Object.prototype.hasOwnProperty.call(patch, 'activeWorkerWindows')) state.policy.activeWorkerWindows = patch.activeWorkerWindows !== false;
      if (Object.prototype.hasOwnProperty.call(patch, 'warmIdleMs')) state.policy.warmIdleMs = boundedWarmIdleMs(patch.warmIdleMs);
      appendJournal(state, 'policy.changed', 'Execution policy updated', { ...state.policy });
    }).then(({ state }) => {
      schedule().catch(() => {});
      return { snapshot: publicSnapshot(state) };
    }));
  }
  if (message.type === 'fleet:cancel-worker-dispatch') {
    return reply(cancelWorkerDispatch(String(message.workerId || '').trim()));
  }
  if (message.type === 'fleet:stop-and-flush-stale') {
    return reply(stopAndFlushStaleWork());
  }
  if (message.type === 'fleet:kill-authority') {
    return reply(killAuthority().then((snapshot) => ({ snapshot })));
  }
  if (message.type === 'fleet:clear-completed') {
    return reply(mutateFleet((state) => {
      for (const [id, task] of Object.entries(state.tasks)) {
        if (task.status === 'done') delete state.tasks[id];
      }
      state.messages = state.messages.filter((m) => m.status !== 'done');
      appendJournal(state, 'state.pruned', 'Completed tasks/messages cleared');
    }).then(({ state }) => ({ snapshot: publicSnapshot(state) })));
  }
  if (message.type === 'fleet:worker-hello') {
    if (!sender.tab?.id) return false;
    return reply(reconcileOnHello(sender.tab, message));
  }
  if (message.type === 'fleet:worker-heartbeat') {
    if (!sender.tab?.id) return false;
    return reply(updateWorkerHeartbeat(sender.tab, message));
  }
  if (message.type === 'fleet:assignment-complete') {
    if (!sender.tab?.id) return false;
    return reply(completeAssignment(sender.tab.id, message).then((snapshot) => ({ snapshot })));
  }
  if (message.type === 'fleet:worker-idle-ready') {
    if (!sender.tab?.id) return false;
    const workerId = workerIdForTab(sender.tab.id);
    beginWarmIdle(workerId, `assignment ${message.assignmentId || 'unknown'} acknowledged`).catch(() => {});
    return false;
  }
  if (message.type === 'fleet:assignment-cancelled') {
    if (!sender.tab?.id) return false;
    return reply(mutateFleet((state) => {
      const workerId = workerIdForTab(sender.tab.id);
      const worker = state.workers[workerId];
      const reason = String(message.reason || '');
      const operatorCancelled = reason === OPERATOR_CANCEL_REASON;
      const autoRecovery = reason.startsWith(AUTO_RECOVERY_REASON_PREFIX);
      let requeue = !operatorCancelled;
      let eventType = operatorCancelled ? 'assignment.operator_cancelled' : 'assignment.cancelled';
      let terminalStatus = 'cancelled';
      let recoveryAttempt = 0;

      if (autoRecovery && worker?.currentAssignmentId === message.assignmentId) {
        const item = worker.currentTaskId
          ? state.tasks[worker.currentTaskId]
          : state.messages.find((entry) => entry.id === worker.currentMessageId);
        const used = Number(item?.autoRecoveryAttempts || 0);
        requeue = used < MAX_AUTO_RECOVERY_ATTEMPTS;
        if (item) {
          item.lastAutoRecoveryReason = reason.slice(AUTO_RECOVERY_REASON_PREFIX.length);
          if (requeue) {
            item.autoRecoveryAttempts = used + 1;
            recoveryAttempt = item.autoRecoveryAttempts;
          }
        }
        eventType = requeue ? 'assignment.recovery_queued' : 'assignment.recovery_exhausted';
        terminalStatus = requeue ? 'cancelled' : 'blocked';
      }

      const released = releaseWorkerAssignment(state, workerId, message.assignmentId, reason, {
        requeue,
        eventType,
        terminalStatus,
      });

      if (released && autoRecovery) {
        const item = released.taskId
          ? state.tasks[released.taskId]
          : state.messages.find((entry) => entry.id === released.messageId);
        if (item && requeue) {
          const note = 'automatic recovery ' + recoveryAttempt + '/' + MAX_AUTO_RECOVERY_ATTEMPTS
            + ': ' + item.lastAutoRecoveryReason;
          if (released.taskId) item.statusNote = note;
          else item.lastDeferredReason = note;
        }
      }

      return { released, autoRecovery, requeued: !!released && requeue };
    }).then(({ state, result }) => {
      if (result?.autoRecovery && result?.requeued) {
        setTimeout(() => schedule().catch(() => {}), 1000);
      } else {
        schedule().catch(() => {});
      }
      return { snapshot: publicSnapshot(state) };
    }));
  }

  return false;
});


chrome.alarms.onAlarm.addListener((alarm) => {
  if (!alarm?.name?.startsWith(WARM_IDLE_ALARM_PREFIX)) return;
  const workerId = alarm.name.slice(WARM_IDLE_ALARM_PREFIX.length);
  loadFleetState().then((state) => {
    const worker = state.workers[workerId];
    if (!worker || worker.currentAssignmentId || worker.lifecycle !== 'warm-idle') return;
    if (Number(worker.warmIdleUntil || 0) > now()) {
      chrome.alarms.create(alarm.name, { when: worker.warmIdleUntil });
      return;
    }
    settleWorkerIdle(workerId, 'warm idle expired').catch(() => {});
  }).catch(() => {});
});

chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.session.remove(tabStateKey(tabId)).catch(() => {});
  const workerId = workerIdForTab(tabId);
  unregisterWorker(workerId).catch(() => {});
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (!Object.prototype.hasOwnProperty.call(changeInfo, 'url') && changeInfo.status !== 'complete') return;
  updateBadge(tabId).catch(() => {});
  if (changeInfo.status === 'complete') ensureApprovalBridge(tabId).catch(() => {});
});

chrome.runtime.onInstalled.addListener(() => {
  normalizeIdleWorkers('extension reload migration').catch(() => {});
  ensureApprovalBridgesForSupportedTabs().catch(() => {});
});

chrome.runtime.onStartup.addListener(() => {
  normalizeIdleWorkers('browser startup normalization').catch(() => {});
});

// Also run once whenever the MV3 service worker itself is loaded/reloaded.
cleanupLegacySleepTabs('service worker migration').catch(() => {});
ensureApprovalBridgesForSupportedTabs().catch(() => {});
