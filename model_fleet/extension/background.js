'use strict';

importScripts(
  'connector-diagnostic-reconciler.js',
  'connector-diagnostic-explainer.js'
);

const TAB_STATE_PREFIX = 'approvalTab:';
const FLEET_STATE_KEY = 'modelFleetState:v1';
const SUPPORTED_URL = /^https:\/\/(?:chatgpt\.com|chat\.openai\.com)\//;
const APPROVAL_CONTENT_FILES = Object.freeze(['stream-retry.js', 'content.js']);
const MAX_JOURNAL = 250;
const MAX_MESSAGES = 250;
const MAX_ROLE_ACTIVITY_SAMPLES = 8000;
const ROLE_ACTIVITY_RETENTION_MS = 24 * 60 * 60 * 1000;
const MAX_RESULT_CHARS = 16000;
const MAX_MESSAGE_BATCH_SIZE = 12;
const MAX_MESSAGE_BATCH_CHARS = 12000;
const MAX_CONTROL_NOTICES = 32;
const WORKER_BUSY_FRESH_MS = 30000;
const HEARTBEAT_FLUSH_MS = 10000;
const WORKER_WAKE_TIMEOUT_MS = 20000;
const WORKER_BRIDGE_RETRY_MS = 250;
const FLEET_PAGE_BUSY_RECHECK_MS = 5000;
const MAX_AUTO_RECOVERY_ATTEMPTS = 1;
const MAX_PROTOCOL_REPAIR_ATTEMPTS = 1;
const MAX_TURNS_PER_CHAT = 10;
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

const connectorDiagnostics = {
  lastDomSnapshot: null,
  updatedAt: 0,
  tabId: null,
  correlationId: null,
};

const connectorDiagnosticSession = {
  id: crypto.randomUUID(),
  createdAt: Date.now(),
  lastEventAt: 0,
};

const mcpCorrelationEvents = {
  lastEvent: null,
  updatedAt: 0,
};

const diagnosticReportHelpers = {
  reconcile: (input) => {
    if (typeof reconcileConnectorDiagnostics === 'function') return reconcileConnectorDiagnostics(input);
    return { state: 'INSUFFICIENT_EVIDENCE', evidence: input, confidence: 'low', missingEvidence: ['reconciler'] };
  },
  explain: (input) => {
    if (typeof explainConnectorDiagnostic === 'function') return explainConnectorDiagnostic(input);
    return { summary: 'Diagnostic explanation unavailable.', findings: [], missingEvidence: input.missingEvidence || [], nextProbe: 'Load explanation layer.' };
  },
};

const workspaceEvidence = {
  lastEvidence: null,
  updatedAt: 0,
};

const ROLE_CATALOG = Object.freeze([
  Object.freeze({ id: 'coordinator', label: 'Coordinator', defaultCount: 1, purpose: 'Own planning, research, architecture, decomposition, routing, observation, and replanning for the fleet.', claimTypes: ['decomposition', 'routing', 'observation', 'replan', 'escalation', 'status', 'evidence', 'research', 'design', 'invariant', 'migration-plan'], authorityScope: 'Planning, research, architecture, workflow orchestration, and child-task creation; no implementation or independent acceptance authority.', prohibitedActions: ['implement specialist work', 'self-certify implementation', 'perform independent verification or canonical integration'], allowedHandoffs: ['coordinator', 'implementation', 'review'], requiresIndependentVerification: false }),
  Object.freeze({ id: 'implementation', label: 'Implementation', defaultCount: 1, purpose: 'Develop an implementation candidate against the approved design.', claimTypes: ['implementation', 'patch', 'candidate'], authorityScope: 'Implementation changes and candidate results.', prohibitedActions: ['self-approve', 'integrate or release'], allowedHandoffs: ['review', 'coordinator'], requiresIndependentVerification: true }),
  Object.freeze({ id: 'review', label: 'Verifier / Integrator', defaultCount: 1, purpose: 'Independently review, falsify, test, and integrate accepted candidates.', claimTypes: ['verification', 'correctness', 'architecture-review', 'test-evidence', 'falsification', 'performance', 'integration', 'release', 'accepted-state'], authorityScope: 'Independent verification, testing/falsification, and canonical integration/release for work this worker did not author.', prohibitedActions: ['verify own implementation', 'author the implementation it verifies or integrates', 'accept unverified dependencies'], allowedHandoffs: ['implementation', 'coordinator'], requiresIndependentVerification: true }),
]);
const COMMON_ROLE_OPERATING_INSTRUCTIONS = Object.freeze([
  'Your role identity and authority are fixed by your registered worker role. A related task, parent task, message, or prior worker does not change your role or authority.',
  'Work the smallest currently assigned scope. Before proposing or requesting new work, check whether that logical family already has an active, pending, repaired, superseded, or verification-pending owner.',
  'Prefer updating or handing off existing work over creating parallel duplicate work.',
  'Do not send acknowledgement-only peer messages. Send a peer message only when the recipient has a concrete next action or needs material evidence.',
  'Use these states precisely when applicable: IMPLEMENTED, VERIFIED, PENDING_FINAL_REVERIFY, BLOCKED, SUPERSEDED, ALREADY_REPAIRED / NO CHANGE.',
  'Do not reopen a repaired or superseded family without contradictory evidence.',
  'The canonical three-role topology is Coordinator, Implementation, and Verifier / Integrator. Legacy research or architect work belongs to Coordinator; legacy test or integrator work belongs to Verifier / Integrator.',
]);

const ROLE_OPERATING_INSTRUCTIONS = Object.freeze({
  coordinator: Object.freeze([
    'Run the fleet toward closure, not task accumulation. Maintain one canonical owner/work item per logical work family.',
    'Own planning, bounded research, evidence reconciliation, architecture, invariants, and migration design directly in the Coordinator role; do not create separate Research or Architect child tasks.',
    'Before creating a child task, inspect existing tasks and recent peer evidence for the same family. Do not create duplicate implementation work while an existing item is pending, running, repaired, or awaiting verification.',
    'If a worker already owns the family, refine that owner through a message instead of creating another task.',
    'When Implementation is saturated, stop adding implementation work unless the work is distinct and higher priority than queued work.',
    'Route implementation candidates only to Verifier / Integrator. That worker owns independent review, adversarial testing, final same-snapshot verification, and canonical integration.',
    'When newer evidence says a blocker is repaired, regression-only, superseded, or no longer applicable, stop dispatching implementation for that blocker and treat older work as obsolete context.',
    'Replan only from new evidence. Do not repeatedly re-audit or re-route unchanged conclusions.',
  ]),
  implementation: Object.freeze([
    'Implement only the assigned logical family. Do not absorb adjacent blockers or duplicate another Implementor active family.',
    'Before changing code, inspect the live tree and recent evidence. If the requested repair is already present, report ALREADY_REPAIRED / NO CHANGE instead of implementing it again.',
    'Preserve the approved design and serialized or identity compatibility constraints.',
    'Test incrementally. When the candidate is ready, immediately hand the exact candidate, snapshot identity, and focused evidence to Verifier / Integrator.',
    'Do not verify, accept, merge, release, or continue modifying a handed-off candidate unless verification returns a concrete defect requiring repair.',
  ]),
  review: Object.freeze([
    'Act as the independent Verifier / Integrator for a specific candidate on a specific snapshot; never verify or accept implementation you authored.',
    'Verify architecture, invariants, authority boundaries, compatibility, and correctness, then actively try to falsify the candidate with focused adversarial, regression, concurrency, and performance tests as relevant.',
    'Distinguish a real implementation failure from unrelated dirty-tree, build, environment, or infrastructure interference.',
    'If the shared tree is still changing, classify a passing candidate as PENDING_FINAL_REVERIFY and do not integrate until final verification is valid on one canonical snapshot.',
    'Maintain one canonical reconciled snapshot. Reject stale, mixed-snapshot, or superseded evidence rather than reconciling it implicitly.',
    'On failure, send the Implementor one bounded actionable defect. Do not author the substantive repair yourself.',
    'Once the required evidence is valid on the same snapshot, perform canonical integration or release and report the exact accepted state to Coordinator.',
  ]),
});

const ROLE_IDS = new Set(ROLE_CATALOG.map((role) => role.id));
const MAX_ROLE_COUNT = 16;
const DEFAULT_ROLE_COUNTS = Object.freeze(Object.fromEntries(
  ROLE_CATALOG.map((role) => [role.id, role.defaultCount]),
));
const DEFAULT_ROLE_TURN_LIMITS = Object.freeze(Object.fromEntries(
  ROLE_CATALOG.map((role) => [role.id, MAX_TURNS_PER_CHAT]),
));
const DEFAULT_TOPOLOGY = Object.freeze({
  desiredRoleCounts: DEFAULT_ROLE_COUNTS,
  maxTurnsPerChatByRole: DEFAULT_ROLE_TURN_LIMITS,
});

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

function normalizeTopology(value = {}, legacyMaxTurnsPerChat = MAX_TURNS_PER_CHAT) {
  const source = value && typeof value === 'object' ? value : {};
  const rawCounts = source.desiredRoleCounts && typeof source.desiredRoleCounts === 'object'
    ? source.desiredRoleCounts
    : {};
  const rawTurnLimits = source.maxTurnsPerChatByRole && typeof source.maxTurnsPerChatByRole === 'object'
    ? source.maxTurnsPerChatByRole
    : {};
  const migratedCounts = { ...rawCounts };
  const migratedTurnLimits = { ...rawTurnLimits };
  if (migratedCounts.coordinator === undefined && migratedCounts.generalist !== undefined) {
    migratedCounts.coordinator = migratedCounts.generalist;
  }
  if (migratedTurnLimits.coordinator === undefined && migratedTurnLimits.generalist !== undefined) {
    migratedTurnLimits.coordinator = migratedTurnLimits.generalist;
  }
  const desiredRoleCounts = {};
  const maxTurnsPerChatByRole = {};
  const legacyTurnLimit = boundedMaxTurnsPerChat(legacyMaxTurnsPerChat);
  for (const role of ROLE_CATALOG) {
    const fallback = role.defaultCount;
    desiredRoleCounts[role.id] = Math.max(
      0,
      Math.min(MAX_ROLE_COUNT, Math.trunc(Number(migratedCounts[role.id] ?? fallback) || 0)),
    );
    maxTurnsPerChatByRole[role.id] = boundedMaxTurnsPerChat(
      migratedTurnLimits[role.id] ?? legacyTurnLimit,
    );
  }
  return { desiredRoleCounts, maxTurnsPerChatByRole };
}

function freshFleetState() {
  return {
    version: 1,
    generation: 1,
    goal: '',
    lastGoalContinuationKey: '',
    workspacePath: '',
    policy: { ...DEFAULT_POLICY },
    topology: { ...DEFAULT_TOPOLOGY },
    workers: {},
    tasks: {},
    messages: [],
    journal: [],
    roleActivity: [],
    nextTask: 1,
    nextMessage: 1,
    nextWorkerSlot: 1,
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
  const topology = normalizeTopology(state.topology, storedPolicy.maxTurnsPerChat);
  const sourceWorkers = state.workers && typeof state.workers === 'object' ? state.workers : {};
  const workers = {};
  const legacyWorkerMap = new Map();
  const durableIds = Object.keys(sourceWorkers).filter((id) => /^W-S\d{4,}$/.test(id));
  let nextWorkerSlot = Math.max(1, Math.trunc(Number(state.nextWorkerSlot) || 1));
  for (const id of durableIds) {
    nextWorkerSlot = Math.max(nextWorkerSlot, Number(id.slice(4)) + 1);
  }
  const allocateNormalizedSlot = () => `W-S${String(nextWorkerSlot++).padStart(4, '0')}`;
  const workerEntries = Object.entries(sourceWorkers).sort(([a], [b]) => {
    const aDurable = /^W-S\d{4,}$/.test(a);
    const bDurable = /^W-S\d{4,}$/.test(b);
    if (aDurable !== bDurable) return aDurable ? -1 : 1;
    return a.localeCompare(b, undefined, { numeric: true });
  });
  for (const [oldId, rawWorker] of workerEntries) {
    const worker = { ...rawWorker };
    const id = /^W-S\d{4,}$/.test(oldId) ? oldId : allocateNormalizedSlot();
    if (id !== oldId) {
      worker.legacyWorkerId = worker.legacyWorkerId || oldId;
      legacyWorkerMap.set(oldId, id);
    }
    worker.id = id;
    worker.role = canonicalRole(worker.role);
    worker.topologyManaged = worker.topologyManaged === true;
    worker.chatTurnCount = Math.max(0, Math.trunc(Number(worker.chatTurnCount || 0)));
    worker.chatRotationPending = worker.chatRotationPending === true
      || worker.chatTurnCount >= maxTurnsPerChatForRole(topology, worker.role);
    worker.lastCountedAssignmentId = String(worker.lastCountedAssignmentId || '');
    worker.currentMessageIds = Array.from(new Set([
      ...(Array.isArray(worker.currentMessageIds) ? worker.currentMessageIds : []),
      ...(worker.currentMessageId ? [worker.currentMessageId] : []),
    ].map(String).filter(Boolean)));
    worker.currentMessageId = worker.currentMessageIds[0] || null;
    worker.currentAssignmentKind = String(worker.currentAssignmentKind || (worker.currentTaskId ? 'task' : (worker.currentMessageId ? 'message' : '')));
    worker.controlInbox = Array.isArray(worker.controlInbox) ? worker.controlInbox.slice(-MAX_CONTROL_NOTICES) : [];
    worker.currentControlNoticeIds = Array.isArray(worker.currentControlNoticeIds)
      ? Array.from(new Set(worker.currentControlNoticeIds.map(String).filter(Boolean)))
      : [];
    worker.lastResponseTerminalAt = Number(worker.lastResponseTerminalAt || 0);
    worker.lastAssignmentReleasedAt = Number(worker.lastAssignmentReleasedAt || 0);
    worker.lastCompletionReleaseLagMs = Math.max(0, Number(worker.lastCompletionReleaseLagMs || 0));
    worker.completionReleaseLagCount = Math.max(0, Number(worker.completionReleaseLagCount || 0));
    worker.completionReleaseLagTotalMs = Math.max(0, Number(worker.completionReleaseLagTotalMs || 0));
    worker.completionReleaseLagMaxMs = Math.max(0, Number(worker.completionReleaseLagMaxMs || 0));
    if (['sleeping', 'parking'].includes(worker.lifecycle)) worker.lifecycle = 'idle';
    delete worker.sleepTabId;
    delete worker.sleepingSince;
    workers[id] = worker;
  }
  const rewriteWorkerRef = (value) => legacyWorkerMap.get(value) || value;
  const tasks = state.tasks && typeof state.tasks === 'object' ? state.tasks : {};
  for (const task of Object.values(tasks)) {
    if (task && task.assignedWorkerId) task.assignedWorkerId = rewriteWorkerRef(task.assignedWorkerId);
    if (task && task.completedByWorkerId) task.completedByWorkerId = rewriteWorkerRef(task.completedByWorkerId);
  }
  const messages = Array.isArray(state.messages) ? state.messages.slice(-MAX_MESSAGES) : [];
  for (const message of messages) {
    if (message.fromWorkerId) message.fromWorkerId = rewriteWorkerRef(message.fromWorkerId);
    if (message.toWorkerId && message.toWorkerId !== 'operator' && message.toWorkerId !== 'scheduler') {
      message.toWorkerId = rewriteWorkerRef(message.toWorkerId);
    }
  }
  const roleActivityCutoff = now() - ROLE_ACTIVITY_RETENTION_MS;
  const roleActivity = Array.isArray(state.roleActivity)
    ? state.roleActivity
      .filter((sample) => sample && typeof sample === 'object'
        && Number(sample.at || 0) >= roleActivityCutoff
        && sample.roles && typeof sample.roles === 'object' && !Array.isArray(sample.roles))
      .slice(-MAX_ROLE_ACTIVITY_SAMPLES)
    : [];
  return {
    ...freshFleetState(),
    ...state,
    policy,
    topology,
    workers,
    nextWorkerSlot,
    tasks,
    messages,
    journal: Array.isArray(state.journal) ? state.journal.slice(-MAX_JOURNAL) : [],
    roleActivity,
  };
}

async function loadFleetState() {
  const stored = await chrome.storage.local.get(FLEET_STATE_KEY);
  return normalizeFleetState(stored[FLEET_STATE_KEY]);
}

function roleActivityCounts(state) {
  const roles = Object.fromEntries(ROLE_CATALOG.map((role) => [role.id, {
    running: 0,
    idle: 0,
    blocked: 0,
    offline: 0,
    total: 0,
  }]));
  for (const worker of Object.values(state.workers || {})) {
    if (!worker || worker.enabled === false) continue;
    const role = canonicalRole(worker.role);
    const counts = roles[role] || (roles[role] = { running: 0, idle: 0, blocked: 0, offline: 0, total: 0 });
    counts.total += 1;
    if (worker.currentAssignmentId) counts.running += 1;
    else if (worker.lifecycle === 'stale' || worker.lifecycle === 'offline' || !Number.isInteger(worker.tabId)) counts.offline += 1;
    else if (worker.status === 'blocked') counts.blocked += 1;
    else counts.idle += 1;
  }
  return roles;
}

function recordRoleActivity(state, observedAt = now()) {
  if (!Array.isArray(state.roleActivity)) state.roleActivity = [];
  const roles = roleActivityCounts(state);
  const previous = state.roleActivity[state.roleActivity.length - 1];
  if (previous && JSON.stringify(previous.roles) === JSON.stringify(roles)) return;
  if (previous && Number(previous.at || 0) === observedAt) {
    previous.roles = roles;
  } else {
    state.roleActivity.push({ at: observedAt, roles });
  }
  const cutoff = observedAt - ROLE_ACTIVITY_RETENTION_MS;
  state.roleActivity = state.roleActivity
    .filter((sample) => Number(sample?.at || 0) >= cutoff)
    .slice(-MAX_ROLE_ACTIVITY_SAMPLES);
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
        : (['blocked', 'stale', 'offline'].includes(worker.status) ? worker.status : (busy ? "waiting" : "idle")),
    };
  }
  const observedAt = now();
  const queueByWorker = {};
  for (const [workerId, worker] of Object.entries(workers)) {
    const queued = state.messages.filter((message) => message.status === 'queued' && message.toWorkerId === workerId);
    const oldestQueuedAt = queued.reduce((oldest, message) => {
      const createdAt = Number(message.createdAt || 0);
      return createdAt > 0 && (!oldest || createdAt < oldest) ? createdAt : oldest;
    }, 0);
    const lagCount = Math.max(0, Number(worker.completionReleaseLagCount || 0));
    queueByWorker[workerId] = {
      queuedCount: queued.length,
      oldestQueuedAt,
      oldestQueueAgeMs: oldestQueuedAt ? Math.max(0, observedAt - oldestQueuedAt) : 0,
      currentAssignmentId: worker.currentAssignmentId || null,
      currentMessageCount: Array.isArray(worker.currentMessageIds) ? worker.currentMessageIds.length : (worker.currentMessageId ? 1 : 0),
      controlInboxCount: Array.isArray(worker.controlInbox) ? worker.controlInbox.length : 0,
      lastCompletionReleaseLagMs: Math.max(0, Number(worker.lastCompletionReleaseLagMs || 0)),
      averageCompletionReleaseLagMs: lagCount > 0 ? Math.round(Number(worker.completionReleaseLagTotalMs || 0) / lagCount) : 0,
      maxCompletionReleaseLagMs: Math.max(0, Number(worker.completionReleaseLagMaxMs || 0)),
      completionReleaseLagCount: lagCount,
    };
  }
  return {
    ...state,
    roleCatalog: ROLE_CATALOG.map((role) => ({ ...role })),
    workers,
    diagnostics: {
      queueByWorker,
      activeAssignments: Object.values(workers).filter((worker) => worker.currentAssignmentId).length,
      maxConcurrency: Math.max(1, Math.min(64, Number(state.policy.maxConcurrency || 8))),
    },
    tasks: Object.fromEntries(Object.entries(state.tasks).map(([taskId, task]) => [
      taskId,
      {
        ...task,
        workflowBlockReason: task.status === 'pending' ? taskBlockReason(state, task) : '',
      },
    ])),
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
    recordRoleActivity(state);
    state.generation = Math.max(1, Number(state.generation || 0) + 1);
    state.updatedAt = now();
    await chrome.storage.local.set({ [FLEET_STATE_KEY]: state });
    await broadcastSnapshot(state);
    return { state, result };
  });
  stateQueue = operation.catch(() => {});
  return operation;
}

function workerForTab(state, tabId) {
  if (!Number.isInteger(tabId)) return null;
  return Object.values(state.workers || {}).find((worker) => Number(worker.tabId) === tabId) || null;
}

function workerIdForTabInState(state, tabId) {
  return workerForTab(state, tabId)?.id || null;
}

function allocateWorkerSlot(state) {
  let counter = Math.max(1, Math.trunc(Number(state.nextWorkerSlot) || 1));
  let id;
  do { id = `W-S${String(counter++).padStart(4, '0')}`; } while (state.workers[id]);
  state.nextWorkerSlot = counter;
  return id;
}

function normalizeRole(role) {
  const value = String(role || '').trim().toLowerCase();
  if (['generalist', 'research', 'architect'].includes(value)) return 'coordinator';
  if (['test', 'integrator', 'verifier', 'verifier-integrator', 'verifier / integrator'].includes(value)) return 'review';
  return value || 'coordinator';
}

function canonicalRole(role) {
  const value = normalizeRole(role);
  return ROLE_IDS.has(value) ? value : 'coordinator';
}

function roleContract(role) {
  return ROLE_CATALOG.find((item) => item.id === canonicalRole(role)) || ROLE_CATALOG[0];
}

const ROLE_MEMBER_LABELS = Object.freeze({
  coordinator: 'Coordinator',
  implementation: 'Implementor',
  review: 'Verifier / Integrator',
});

function workerRoleOrdinal(state, worker) {
  if (!worker?.id) return 1;
  const role = canonicalRole(worker.role);
  const peers = Object.values(state?.workers || {})
    .filter((candidate) => candidate?.enabled !== false
      && candidate?.lifecycle !== 'stale'
      && Number.isInteger(candidate?.tabId)
      && canonicalRole(candidate.role) === role)
    .sort((a, b) => String(a.id).localeCompare(String(b.id), undefined, { numeric: true }));
  const index = peers.findIndex((candidate) => candidate.id === worker.id);
  return index >= 0 ? index + 1 : 1;
}

function workerIdentityLabel(state, workerOrId) {
  const worker = typeof workerOrId === 'string' ? state?.workers?.[workerOrId] : workerOrId;
  if (!worker?.id) return String(workerOrId || 'unknown');
  const role = canonicalRole(worker.role);
  const label = ROLE_MEMBER_LABELS[role] || roleContract(role).label || role;
  return `${worker.id} — ${label} #${workerRoleOrdinal(state, worker)}`;
}

function senderIdentityLabel(state, sender) {
  const raw = String(sender || 'operator');
  return state?.workers?.[raw] ? workerIdentityLabel(state, state.workers[raw]) : raw;
}

function roleContractPrompt(role, heading = 'Active role contract') {
  const contract = roleContract(role);
  return [
    heading + ': ' + contract.label + ' (' + contract.id + ')',
    'Purpose: ' + contract.purpose,
    'Authority scope: ' + contract.authorityScope,
    'Claim types: ' + contract.claimTypes.join(', '),
    'Prohibited actions: ' + contract.prohibitedActions.join('; '),
    'Allowed handoffs: ' + contract.allowedHandoffs.join(', '),
    'Independent verification required: ' + (contract.requiresIndependentVerification ? 'yes' : 'no'),
    'Operating instructions:',
    ...(ROLE_OPERATING_INSTRUCTIONS[contract.id] || []).map((instruction) => '- ' + instruction),
  ].join('\n');
}

function workerRoleOperatingPrompt(worker) {
  const role = canonicalRole(worker && worker.role);
  const lines = ['[ROLE: ' + (ROLE_MEMBER_LABELS[role] || role) + ']'];
  if (role === 'coordinator') {
    lines.push(
      '- Own planning, research, architecture, decomposition, routing, and replanning.',
      '- Do not perform specialist implementation or independent verification.',
      '- Keep one canonical owner per logical work family; do not reopen repaired or superseded work without new contradictory evidence.',
      '- Child roles are implementation and review only.',
    );
  } else if (role === 'implementation') {
    lines.push(
      '- Implement only the assigned logical work family.',
      '- Do not duplicate another active owner or self-verify/accept your implementation.',
      '- Test incrementally and hand the candidate with exact evidence to Verifier / Integrator.',
    );
  } else {
    lines.push(
      '- Independently verify, falsify, test, and integrate the assigned candidate.',
      '- Never verify implementation you authored; reject stale or mixed-snapshot evidence.',
      '- On failure, return one bounded actionable defect; on success, integrate only after same-snapshot verification.',
    );
  }
  lines.push('[/ROLE]');
  return lines.join('\n');
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

async function fleetConnectorHelperReady(tabId) {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => !!globalThis.ModelFleetConnectorAttachment?.connectorAttachmentPresent
        && !!globalThis.ModelFleetConnectorAttachment?.ensureConnectorAttached,
    });
    return results?.some((result) => result?.result === true) === true;
  } catch {
    return false;
  }
}

async function ensureFleetConnectorHelper(tabId) {
  if (await fleetConnectorHelperReady(tabId)) return;
  await chrome.scripting.executeScript({ target: { tabId }, files: ['connector-attachment.js'] });
  if (!(await fleetConnectorHelperReady(tabId))) {
    throw new Error('fleet connector attachment helper was not available after reinjection');
  }
}

async function ensureResponsiveRegisteredFleetBridge(tabId) {
  let response;
  try {
    response = await chrome.tabs.sendMessage(tabId, { type: 'fleet:bridge-ping' });
  } catch {
    return { responsive: false, response: null };
  }
  if (!response?.ok) return { responsive: false, response };
  if (response.registered === true) return { responsive: true, registered: true, response };
  try {
    const repaired = await chrome.tabs.sendMessage(tabId, { type: 'fleet:ensure-registration' });
    if (repaired?.ok && repaired.registered === true) return { responsive: true, registered: true, response: repaired };
    return { responsive: true, registered: false, response: repaired || response };
  } catch (error) {
    return { responsive: true, registered: false, response, error: String(error) };
  }
}

async function ensureFleetBridge(tabId) {
  const existing = await ensureResponsiveRegisteredFleetBridge(tabId);
  if (existing.registered === true) {
    await ensureFleetConnectorHelper(tabId);
    return existing.response;
  }
  if (existing.responsive === true) {
    throw new Error('fleet bridge is responsive but registration could not be re-established');
  }
  await ensureFleetConnectorHelper(tabId);
  await chrome.scripting.executeScript({ target: { tabId }, files: ['fleet-worker.js'] });
  const injected = await ensureResponsiveRegisteredFleetBridge(tabId);
  if (injected.registered === true) return injected.response;
  throw new Error(injected.responsive
    ? 'fleet bridge responded after injection but registration was not established'
    : 'fleet bridge did not answer ping after injection');
}

async function setFleetRecoveryHint(tabId, assignmentId = null) {
  if (!Number.isInteger(tabId)) return;
  await chrome.scripting.executeScript({
    target: { tabId },
    func: (id) => {
      const markerId = '__model_fleet_assignment_recovery__';
      let node = document.getElementById(markerId);
      if (!id) {
        node?.remove();
        return;
      }
      if (!node) {
        node = document.createElement('meta');
        node.id = markerId;
        node.hidden = true;
        document.documentElement?.appendChild(node);
      }
      node?.setAttribute('data-assignment-id', String(id));
    },
    args: [assignmentId || null],
  });
}

function assignmentMessageIds(worker) {
  const ids = Array.isArray(worker?.currentMessageIds) && worker.currentMessageIds.length
    ? worker.currentMessageIds
    : (worker?.currentMessageId ? [worker.currentMessageId] : []);
  return Array.from(new Set(ids.map(String).filter(Boolean)));
}

function assignmentMessages(state, worker) {
  const ids = new Set(assignmentMessageIds(worker));
  return state.messages.filter((message) => ids.has(message.id) && message.assignmentId === worker.currentAssignmentId)
    .sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
}

function assignmentControlNoticeIds(worker) {
  return Array.from(new Set((Array.isArray(worker?.currentControlNoticeIds) ? worker.currentControlNoticeIds : [])
    .map(String)
    .filter(Boolean)));
}

function clearWorkerAssignmentState(worker) {
  if (!worker) return;
  worker.currentAssignmentId = null;
  worker.currentAssignmentKind = '';
  worker.currentAssignmentStartedAt = 0;
  worker.currentTaskId = null;
  worker.currentMessageId = null;
  worker.currentMessageIds = [];
  worker.currentControlNoticeIds = [];
}

function requeueAssignmentMessages(state, worker, assignmentId, reason = '') {
  const messageIds = assignmentMessageIds(worker);
  const requeued = [];
  for (const messageId of messageIds) {
    const message = state.messages.find((item) => item.id === messageId);
    if (!message || message.assignmentId !== assignmentId) continue;
    message.status = 'queued';
    message.assignmentId = null;
    if (reason) message.lastDeferredReason = reason;
    requeued.push(message.id);
  }
  return requeued;
}

function consumeAssignmentControlNotices(worker) {
  const consumed = new Set(assignmentControlNoticeIds(worker));
  if (!consumed.size) return [];
  const removed = (Array.isArray(worker.controlInbox) ? worker.controlInbox : [])
    .filter((notice) => consumed.has(notice.id))
    .map((notice) => notice.id);
  worker.controlInbox = (Array.isArray(worker.controlInbox) ? worker.controlInbox : [])
    .filter((notice) => !consumed.has(notice.id));
  return removed;
}

function assignmentForWorker(state, worker) {
  if (!worker?.currentAssignmentId) return null;
  if (worker.currentTaskId) {
    const task = state.tasks[worker.currentTaskId];
    if (!task || task.assignmentId !== worker.currentAssignmentId) return null;
    return {
      id: worker.currentAssignmentId,
      kind: 'task',
      taskId: task.id,
      controlNoticeIds: Array.isArray(worker.currentControlNoticeIds) ? worker.currentControlNoticeIds.slice() : [],
      prompt: buildTaskPrompt(state, task, worker),
      startedAt: Number(task.startedAt || 0),
    };
  }
  const messages = assignmentMessages(state, worker);
  if (messages.length) {
    return {
      id: worker.currentAssignmentId,
      kind: 'message',
      messageId: messages[0].id,
      messageIds: messages.map((message) => message.id),
      controlNoticeIds: Array.isArray(worker.currentControlNoticeIds) ? worker.currentControlNoticeIds.slice() : [],
      prompt: buildMessagePrompt(state, messages, worker),
      startedAt: messages.map((message) => Number(message.deliveredAt || 0)).filter(Boolean).reduce(
        (oldest, value) => !oldest || value < oldest ? value : oldest,
        Number(worker.currentAssignmentStartedAt || 0),
      ),
    };
  }
  if (worker.currentAssignmentKind === 'control' && Array.isArray(worker.currentControlNoticeIds) && worker.currentControlNoticeIds.length) {
    return {
      id: worker.currentAssignmentId,
      kind: 'control',
      controlNoticeIds: worker.currentControlNoticeIds.slice(),
      prompt: buildControlPrompt(state, worker),
      startedAt: Number(worker.currentAssignmentStartedAt || 0),
    };
  }
  return null;
}

async function releaseUnrecoverableBridgeAssignment(workerId, assignmentId, reason) {
  const { result } = await mutateFleet((state) => {
    const worker = state.workers[workerId];
    if (!worker || worker.currentAssignmentId !== assignmentId) return false;
    const released = releaseWorkerAssignment(state, workerId, assignmentId, reason, {
      requeue: true,
      eventType: 'assignment.bridge_recovery_queued',
      terminalStatus: 'cancelled',
    });
    if (released) {
      appendJournal(state, 'assignment.bridge_recovery_failed', assignmentId + ' could not reattach after extension reload', {
        workerId,
        reason,
      });
    }
    return !!released;
  });
  if (result) schedule().catch(() => {});
  return result === true;
}

async function recoverRegisteredWorkerBridge(workerId, reason = 'extension context recovery') {
  const state = await loadFleetState();
  const worker = state.workers[workerId];
  if (!worker?.enabled || !Number.isInteger(worker.tabId)) return { workerId, recovered: false, skipped: true };
  const tab = await supportedTab(worker.tabId);
  if (!tab) return { workerId, recovered: false, stale: true };

  const assignment = assignmentForWorker(state, worker);
  try {
    await setFleetRecoveryHint(worker.tabId, assignment?.id || null);
    await ensureFleetBridge(worker.tabId);

    let assignmentRecovery = null;
    if (assignment) {
      assignmentRecovery = await chrome.tabs.sendMessage(worker.tabId, {
        type: 'fleet:recover-assignment',
        assignment,
      });
      if (!assignmentRecovery?.ok || assignmentRecovery?.reattached !== true) {
        const why = assignmentRecovery?.error || assignmentRecovery?.reason || 'worker could not prove assignment custody in the current conversation';
        await releaseUnrecoverableBridgeAssignment(workerId, assignment.id, reason + ': ' + why);
        await setFleetRecoveryHint(worker.tabId, null).catch(() => {});
      }
    }

    await chrome.tabs.sendMessage(worker.tabId, {
      type: 'fleet:registration-changed',
      registered: true,
    });

    await mutateFleet((latest) => {
      const current = latest.workers[workerId];
      if (!current || current.tabId !== worker.tabId) return;
      current.heartbeatAt = now();
      if (!current.currentAssignmentId && current.status !== 'blocked') {
        current.status = current.busy ? 'waiting' : 'idle';
        if (!['warm-idle', 'rotating'].includes(current.lifecycle)) current.lifecycle = 'idle';
      }
      appendJournal(latest, 'worker.bridge_recovered', workerId + ' bridge recovered', {
        reason,
        tabId: worker.tabId,
        assignmentId: assignment?.id || null,
        reattached: assignmentRecovery?.reattached === true,
      });
    });

    return {
      workerId,
      recovered: true,
      assignmentId: assignment?.id || null,
      reattached: assignmentRecovery?.reattached === true,
    };
  } catch (error) {
    if (assignment) {
      await releaseUnrecoverableBridgeAssignment(workerId, assignment.id, reason + ': ' + String(error)).catch(() => {});
    }
    return { workerId, recovered: false, error: String(error) };
  } finally {
    if (!assignment) await setFleetRecoveryHint(worker.tabId, null).catch(() => {});
  }
}

let fleetBridgeRecoveryPromise = null;

async function recoverRegisteredFleetBridges(reason = 'extension context recovery') {
  if (fleetBridgeRecoveryPromise) return fleetBridgeRecoveryPromise;
  fleetBridgeRecoveryPromise = (async () => {
    const state = await loadFleetState();
    const workerIds = Object.values(state.workers)
      .filter((worker) => worker.enabled && Number.isInteger(worker.tabId))
      .map((worker) => worker.id);
    const results = [];
    for (const workerId of workerIds) {
      results.push(await recoverRegisteredWorkerBridge(workerId, reason));
    }
    return results;
  })();
  try {
    return await fleetBridgeRecoveryPromise;
  } finally {
    fleetBridgeRecoveryPromise = null;
    // Recovery owns the worker-custody boundary. Only after every persisted
    // assignment has either reattached or been fail-closed may new work reserve.
    // This prevents a service-worker reload from reserving a fresh assignment
    // that the still-running recovery pass then mistakes for stale custody.
    schedule().catch(() => {});
  }
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
    } else if (dispatch.assignment.kind === 'message') {
      requeueAssignmentMessages(state, worker, dispatch.assignment.id, 'ChatGPT turn is still active in the worker tab');
    }

    // Control feedback stays durable in worker.controlInbox until a turn
    // actually completes. A page-busy preflight never consumes it.
    clearWorkerAssignmentState(worker);
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

function boundedMaxTurnsPerChat(value) {
  const parsed = Math.trunc(Number(value));
  return Math.max(1, Math.min(50, Number.isFinite(parsed) && parsed > 0 ? parsed : MAX_TURNS_PER_CHAT));
}

function maxTurnsPerChatForRole(topology, role) {
  const canonical = canonicalRole(role);
  return boundedMaxTurnsPerChat(topology?.maxTurnsPerChatByRole?.[canonical]);
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

async function rotateWorkerChat(workerId, reason = 'chat turn limit reached') {
  liveHeartbeats.delete(workerId);
  const claimed = await mutateFleet((state) => {
    const worker = state.workers[workerId];
    if (!worker
      || !worker.enabled
      || !worker.chatRotationPending
      || worker.currentAssignmentId
      || !Number.isInteger(worker.tabId)
      || worker.lifecycle === 'rotating'
      || worker.status === 'blocked') return null;
    worker.lifecycle = 'rotating';
    worker.status = 'waiting';
    worker.busy = false;
    worker.pageBusyUntil = now() + WORKER_WAKE_TIMEOUT_MS;
    appendJournal(state, 'worker.chat_rotation_started', workerId + ' starting a fresh ChatGPT conversation', {
      reason,
      tabId: worker.tabId,
      turns: worker.chatTurnCount,
      limit: maxTurnsPerChatForRole(state.topology, worker.role),
    });
    return { tabId: worker.tabId };
  });
  if (!claimed.result) return false;

  const tabId = claimed.result.tabId;
  try {
    await clearWarmIdleAlarm(workerId);
    await chrome.tabs.update(tabId, { url: 'https://chatgpt.com/' });
    await waitForTabReady(tabId, 30000);
    await ensureFleetBridgeAfterWake(tabId, 30000);
    const tab = await chrome.tabs.get(tabId);
    await mutateFleet((state) => {
      const worker = state.workers[workerId];
      if (!worker || worker.tabId !== tabId || worker.currentAssignmentId) return;
      worker.chatTurnCount = 0;
      worker.chatRotationPending = false;
      worker.lastCountedAssignmentId = '';
      worker.lastChatRotationAt = now();
      worker.lastChatRotationError = '';
      worker.lifecycle = 'idle';
      worker.status = 'idle';
      worker.busy = false;
      worker.pageBusyUntil = 0;
      worker.heartbeatAt = now();
      worker.title = tab.title || worker.title;
      worker.url = tab.url || worker.url;
      worker.windowId = Number.isInteger(tab.windowId) ? tab.windowId : worker.windowId;
      appendJournal(state, 'worker.chat_rotated', workerId + ' started a fresh ChatGPT conversation', {
        reason,
        tabId,
      });
    });
    await updateBadge(tabId).catch(() => {});
    schedule().catch(() => {});
    return true;
  } catch (error) {
    await mutateFleet((state) => {
      const worker = state.workers[workerId];
      if (!worker || worker.tabId !== tabId) return;
      worker.status = 'blocked';
      worker.lifecycle = 'rotation-failed';
      worker.busy = false;
      worker.pageBusyUntil = 0;
      worker.lastChatRotationError = String(error);
      appendJournal(state, 'worker.chat_rotation_failed', workerId + ' could not start a fresh ChatGPT conversation', {
        reason,
        tabId,
        error: String(error),
      });
    }).catch(() => {});
    reconcileStaleWorkerBindings('chat rotation failed').catch(() => {});
    throw error;
  }
}

function startPendingChatRotations(state) {
  for (const worker of Object.values(state.workers || {})) {
    if (!worker.enabled
      || !worker.chatRotationPending
      || worker.currentAssignmentId
      || !Number.isInteger(worker.tabId)
      || worker.lifecycle === 'rotating'
      || worker.status === 'blocked') continue;
    rotateWorkerChat(worker.id).catch((error) => {
      console.warn('[model-fleet] worker chat rotation failed', worker.id, error);
    });
  }
}

function reconcileBridgeRuntimeState(state, workerId, bridgeState = {}) {
  const worker = state.workers[workerId];
  if (!worker) return;
  const liveAssignmentId = bridgeState.activeAssignmentId || null;
  if (worker.currentAssignmentId && worker.currentAssignmentId !== liveAssignmentId) {
    const staleAssignmentId = worker.currentAssignmentId;
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
    const requeued = requeueAssignmentMessages(state, worker, staleAssignmentId, `stale bridge ownership for ${workerId}`);
    for (const messageId of requeued) {
      appendJournal(state, 'message.requeued', `${messageId} requeued after stale bridge ownership for ${workerId}`);
    }
    appendJournal(state, 'worker.reconciled', `${workerId} stale assignment cleared`, {
      persistedAssignmentId: staleAssignmentId,
      liveAssignmentId,
      messageIds: requeued,
    });
    clearWorkerAssignmentState(worker);
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
function releaseWorkerBinding(state, workerId, reason = 'worker binding lost') {
  const worker = state.workers[workerId];
  if (!worker) return false;
  const assignmentId = worker.currentAssignmentId;
  if (worker.currentTaskId) {
    const task = state.tasks[worker.currentTaskId];
    if (task?.status === 'running' && task.assignedWorkerId === workerId) {
      task.status = 'pending';
      task.assignedWorkerId = null;
      task.assignmentId = null;
      task.startedAt = 0;
      task.statusNote = `${reason}; task requeued`;
      appendJournal(state, 'task.requeued', `${task.id} requeued because ${workerId} became stale`);
    }
  }
  if (assignmentId) {
    const requeued = requeueAssignmentMessages(state, worker, assignmentId, `${reason}; message requeued`);
    for (const messageId of requeued) appendJournal(state, 'message.requeued', `${messageId} requeued because ${workerId} became stale`);
  }
  worker.lastTabId = Number.isInteger(worker.tabId) ? worker.tabId : worker.lastTabId;
  worker.tabId = null;
  worker.windowId = null;
  worker.activeWindowId = null;
  clearWorkerAssignmentState(worker);
  worker.busy = false;
  worker.status = 'stale';
  worker.lifecycle = 'stale';
  worker.heartbeatAt = 0;
  worker.pageBusyUntil = 0;
  worker.lastStaleReason = reason;
  worker.staleAt = now();
  liveHeartbeats.delete(workerId);
  appendJournal(state, 'worker.stale', `${workerId} binding released`, { reason });
  return true;
}
async function markWorkerBindingStale(tabId, reason = 'tab closed') {
  if (!Number.isInteger(tabId)) return false;
  const { result } = await mutateFleet((state) => {
    const worker = workerForTab(state, tabId);
    return worker ? releaseWorkerBinding(state, worker.id, reason) : false;
  });
  schedule().catch(() => {});
  return result === true;
}

async function reconcileStaleWorkerBindings(reason = 'binding reconciliation') {
  const state = await loadFleetState();
  const bound = Object.values(state.workers).filter((worker) => worker.enabled && Number.isInteger(worker.tabId));
  const liveTabs = new Map();
  await Promise.all(bound.map(async (worker) => {
    const tab = await supportedTab(worker.tabId);
    if (tab) liveTabs.set(worker.id, tab);
  }));
  const staleIds = bound.filter((worker) => !liveTabs.has(worker.id)).map((worker) => worker.id);
  if (!staleIds.length) return { stale: [] };
  await mutateFleet((latest) => {
    for (const workerId of staleIds) releaseWorkerBinding(latest, workerId, reason);
  });
  schedule().catch(() => {});
  return { stale: staleIds };
}

function upsertWorker(state, tab, patch = {}) {
  const bound = workerForTab(state, tab.id);
  const requestedSlot = !bound && patch.workerId && state.workers[patch.workerId] && !Number.isInteger(state.workers[patch.workerId].tabId)
    ? state.workers[patch.workerId]
    : null;
  const staleSameTab = !bound && !requestedSlot
    ? Object.values(state.workers).find((worker) => !Number.isInteger(worker.tabId) && worker.lastTabId === tab.id)
    : null;
  const staleManaged = !bound && !requestedSlot && !staleSameTab && patch.topologyManaged === true
    ? Object.values(state.workers).find((worker) => worker.topologyManaged === true
      && canonicalRole(worker.role) === canonicalRole(patch.role)
      && !Number.isInteger(worker.tabId))
    : null;
  const id = bound?.id || requestedSlot?.id || staleSameTab?.id || staleManaged?.id || allocateWorkerSlot(state);
  const existing = state.workers[id] || {};
  const requestedRole = canonicalRole(patch.role || existing.role);
  if (existing.currentAssignmentId && requestedRole !== canonicalRole(existing.role)) {
    throw new Error('cannot change role while worker owns an active assignment');
  }
  const worker = {
    id,
    tabId: tab.id,
    name: patch.name || existing.name || `ChatGPT ${tab.id}`,
    role: requestedRole,
    capabilities: Array.isArray(patch.capabilities)
      ? [...new Set(patch.capabilities.map(String))]
      : (existing.capabilities || defaultCapabilities()),
    enabled: patch.enabled !== undefined ? patch.enabled === true : existing.enabled !== false,
    status: existing.status || 'idle',
    currentAssignmentId: existing.currentAssignmentId || null,
    currentAssignmentKind: existing.currentAssignmentKind || '',
    currentAssignmentStartedAt: Number(existing.currentAssignmentStartedAt || 0),
    currentTaskId: existing.currentTaskId || null,
    currentMessageId: existing.currentMessageId || null,
    currentMessageIds: Array.isArray(existing.currentMessageIds)
      ? existing.currentMessageIds.slice()
      : (existing.currentMessageId ? [existing.currentMessageId] : []),
    controlInbox: Array.isArray(existing.controlInbox) ? existing.controlInbox.slice(-MAX_CONTROL_NOTICES) : [],
    currentControlNoticeIds: Array.isArray(existing.currentControlNoticeIds) ? existing.currentControlNoticeIds.slice() : [],
    title: tab.title || existing.title || '',
    url: tab.url || existing.url || '',
    busy: patch.busy !== undefined ? patch.busy === true : existing.busy === true,
    heartbeatAt: patch.heartbeatAt || existing.heartbeatAt || 0,
    progressVersion: Number(existing.progressVersion || 0),
    lastResultAt: existing.lastResultAt || 0,
    lastResponseTerminalAt: Number(existing.lastResponseTerminalAt || 0),
    lastAssignmentReleasedAt: Number(existing.lastAssignmentReleasedAt || 0),
    lastCompletionReleaseLagMs: Math.max(0, Number(existing.lastCompletionReleaseLagMs || 0)),
    completionReleaseLagCount: Math.max(0, Number(existing.completionReleaseLagCount || 0)),
    completionReleaseLagTotalMs: Math.max(0, Number(existing.completionReleaseLagTotalMs || 0)),
    completionReleaseLagMaxMs: Math.max(0, Number(existing.completionReleaseLagMaxMs || 0)),
    chatTurnCount: Math.max(0, Math.trunc(Number(existing.chatTurnCount || 0))),
    chatRotationPending: existing.chatRotationPending === true
      || Math.max(0, Math.trunc(Number(existing.chatTurnCount || 0))) >= maxTurnsPerChatForRole(state.topology, requestedRole),
    lastCountedAssignmentId: String(existing.lastCountedAssignmentId || ''),
    lastChatRotationAt: Number(existing.lastChatRotationAt || 0),
    registeredAt: existing.registeredAt || now(),
    windowId: Number.isInteger(tab.windowId) ? tab.windowId : (existing.windowId || null),
    activeWindowId: existing.activeWindowId || null,
    lifecycle: ['sleeping', 'parking', 'stale'].includes(existing.lifecycle) ? 'idle' : (existing.lifecycle || (existing.currentAssignmentId ? 'running' : 'idle')),
    warmIdleSince: existing.warmIdleSince || 0,
    warmIdleUntil: existing.warmIdleUntil || 0,
    topologyManaged: patch.topologyManaged !== undefined
      ? patch.topologyManaged === true
      : existing.topologyManaged === true,
    legacyWorkerId: existing.legacyWorkerId || undefined,
    lastTabId: tab.id,
    staleAt: 0,
    lastStaleReason: '',
  };
  if (!worker.currentAssignmentId && worker.enabled && worker.status !== 'blocked') {
    worker.status = worker.busy ? 'waiting' : 'idle';
    if (worker.lifecycle === 'running' || worker.lifecycle === 'activating') worker.lifecycle = 'idle';
  }
  state.workers[id] = worker;
  if (worker.lifecycle === 'stale' || !worker.enabled) worker.lifecycle = worker.enabled ? 'idle' : 'stale';
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

function taskBlockReason(state, task, worker = null) {
  if (!task || task.status !== 'pending') return task?.status === 'pending' ? '' : `task status is ${task?.status || 'unknown'}`;
  const deps = Array.isArray(task.dependencies) ? task.dependencies : [];
  const missing = deps.filter((id) => state.tasks[id]?.status !== 'done');
  if (missing.length) return `waiting for dependencies: ${missing.join(', ')}`;
  const taskRole = canonicalRole(task.role);
  if (taskRole === 'review') {
    const dependencyWorkers = new Set(deps.map((id) => state.tasks[id]?.completedByWorkerId).filter(Boolean));
    if (worker && dependencyWorkers.has(worker.id)) return 'review requires an independent worker from direct dependency completers';
  }
  return '';
}

function taskRunnable(state, task) {
  return taskBlockReason(state, task) === '';
}

function workerBusyIsFresh(worker, at = now()) {
  const live = worker?.id ? liveHeartbeats.get(worker.id) : null;
  const busy = live ? live.busy === true : worker?.busy === true;
  if (!busy) return false;
  const heartbeatAt = Math.max(Number(worker?.heartbeatAt || 0), Number(live?.at || 0));
  return heartbeatAt > 0 && at - heartbeatAt <= WORKER_BUSY_FRESH_MS;
}

function workerMatchRank(worker, task, state = null) {
  if (!worker.enabled || worker.lifecycle === 'stale' || worker.chatRotationPending || !Number.isInteger(worker.tabId) || worker.currentAssignmentId || workerBusyIsFresh(worker)) return Number.POSITIVE_INFINITY;
  if (!['idle', 'waiting'].includes(worker.status)) return Number.POSITIVE_INFINITY;
  const taskRole = canonicalRole(task.role);
  const workerRole = canonicalRole(worker.role);
  if (state && taskBlockReason(state, task, worker)) return Number.POSITIVE_INFINITY;
  if (workerRole === taskRole) return 0;
  return Number.POSITIVE_INFINITY;
}

function workerMatches(worker, task, state = null) {
  return Number.isFinite(workerMatchRank(worker, task, state));
}

function peerSummary(state, workerId) {
  return Object.values(state.workers)
    .filter((w) => w.enabled && w.lifecycle !== 'stale' && Number.isInteger(w.tabId) && w.id !== workerId)
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
    .map((w) => `- ${workerIdentityLabel(state, w)} (${w.status})`)
    .join('\n') || '- no other registered workers';
}

function fleetProtocolText() {
  return [
    '[FLEET PROTOCOL]',
    '- Emit FLEET_MESSAGE only when peer delivery is required.',
    '- Peer syntax: [FLEET_MESSAGE to="W-S0015"] message [/FLEET_MESSAGE]. The destination attribute is exactly `to`; do not rename it to `recipient`.',
    '- Use only registered worker IDs; never message yourself or duplicate a delivery to operator/scheduler unless required.',
    '- Terminal syntax: [FLEET_STATUS state="done"] concise note [/FLEET_STATUS]. Use only done or blocked; do not emit JSON-style FLEET_STATUS.',
    '- End with exactly one FLEET_STATUS and nothing after it.',
    '- Use state="blocked" only when useful progress cannot continue; state the exact blocker.',
    '[/FLEET PROTOCOL]',
  ].join('\n');
}

function coordinatorProtocolText() {
  return [
    '[COORDINATOR]',
    '- Decompose only when distinct specialist work is needed; prefer refining an existing owner over creating duplicate work.',
    '- Route implementation to Implementation and independent verification/integration to Review.',
    '- Observe evidence before replanning; escalate to operator only when the decision exceeds Coordinator authority.',
    '- Only Coordinator may create child tasks. Canonical child roles: implementation, review.',
    '[FLEET_TASK role="implementation" title="Bounded task title" depends="T-1,T-2" priority="0"]',
    'Natural-language assignment.',
    '[/FLEET_TASK]',
    '[/COORDINATOR]',
  ].join('\n');
}

function currentControlNotices(worker) {
  const selected = new Set(Array.isArray(worker?.currentControlNoticeIds) ? worker.currentControlNoticeIds : []);
  return (Array.isArray(worker?.controlInbox) ? worker.controlInbox : [])
    .filter((notice) => selected.has(notice.id));
}

function controlFeedbackText(worker) {
  const notices = currentControlNotices(worker);
  if (!notices.length) return '';
  return [
    '[MODEL FLEET CONTROL FEEDBACK]',
    `Control notices: ${notices.length}`,
    'These are scheduler/control-plane facts already in your durable worker inbox. Incorporate them while handling the current assignment; do not ask for a duplicate semantic message.',
    ...notices.flatMap((notice) => [
      `--- CONTROL ${notice.id} · ${notice.type || 'notice'}${notice.taskId ? ` · task ${notice.taskId}` : ''} ---`,
      String(notice.body || '').trim(),
      `--- END CONTROL ${notice.id} ---`,
    ]),
    '[/MODEL FLEET CONTROL FEEDBACK]',
  ].join('\n');
}

function workspaceToolInstruction(workspacePath) {
  const repository = String(workspacePath || '').trim();
  if (!repository) {
    return [
      '[WORKSPACE]',
      'Workspace: not configured.',
      '- Workspace-global actions may be called directly.',
      '- Repository-scoped work is BLOCKED until a repository workspace path is configured.',
      '- Never invent repository state.',
      '[/WORKSPACE]',
    ].join('\n');
  }
  return [
    '[WORKSPACE]',
    `Workspace: ${repository}`,
    '- Workspace-global actions may be called directly.',
    `- For repository-scoped actions, call workspace:open_context for ${repository}, then reuse its context_id.`,
    '- Use real workspace tools; never substitute prose for a required tool call or invent repository state.',
    '[/WORKSPACE]',
  ].join('\n');
}

function buildTaskPrompt(state, task, worker) {
  const taskContract = ROLE_CATALOG.find((role) => role.id === canonicalRole(task.role)) || ROLE_CATALOG[0];
  const workerContract = ROLE_CATALOG.find((role) => role.id === canonicalRole(worker.role)) || ROLE_CATALOG[0];
  const controlFeedback = controlFeedbackText(worker);
  const workspacePath = String(state.workspacePath || '').trim();
  const separationNote = canonicalRole(task.role) === 'coordinator'
    ? 'Coordinator control loop only: decompose, route, observe, replan, and escalate. Do not perform specialist implementation, review, test, architecture, research, or integration work yourself.'
    : 'Do not claim authority beyond this contract or verify work you completed yourself.';
  return [
    '[MODEL FLEET ASSIGNMENT]',
    `Worker: ${worker.id}`,
    `Role: ${worker.role}`,
    `Requested task role: ${task.role}`,
    `Requested task contract purpose: ${taskContract.purpose}`,
    `Registered worker authority scope: ${workerContract.authorityScope}`,
    `Registered worker claim types: ${workerContract.claimTypes.join(', ')}`,
    `Registered worker prohibited actions: ${workerContract.prohibitedActions.join('; ')}`,
    `Registered worker allowed handoffs: ${workerContract.allowedHandoffs.join(', ')}`,
    `Independent verification required: ${taskContract.requiresIndependentVerification ? 'yes' : 'no'}`,
    `Separation of duty: ${separationNote}`,
    `Task: ${task.id} — ${task.title}`,
    state.goal ? `Fleet goal: ${state.goal}` : 'Fleet goal: not set',
    '',
    workspaceToolInstruction(workspacePath),
    '',
    task.prompt,
    '',
    workerRoleOperatingPrompt(worker),
    '',
    controlFeedback,
    controlFeedback ? '' : '',
    canonicalRole(task.role) === 'coordinator' ? coordinatorProtocolText() : '',
    canonicalRole(task.role) === 'coordinator' ? '' : '',
    '',
    'Work independently and make concrete progress.',
    'Do not wait for other workers unless the task genuinely depends on them.',
    '',
    'Registered peers:',
    peerSummary(state, worker.id),
    '',
    fleetProtocolText(),
    '[/MODEL FLEET ASSIGNMENT]',
  ].join('\n');
}

function buildMessagePrompt(state, messageOrMessages, worker) {
  const controlFeedback = controlFeedbackText(worker);
  const messages = (Array.isArray(messageOrMessages) ? messageOrMessages : [messageOrMessages])
    .filter(Boolean)
    .sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
  const blocks = messages.flatMap((message) => {
    const from = message.fromWorkerId || message.from || 'operator';
    return [
      `--- MESSAGE ${message.id} ---`,
      `From: ${senderIdentityLabel(state, from)}`,
      message.taskId ? `Related task: ${message.taskId}` : 'Related task: none',
      '',
      message.body,
      `--- END MESSAGE ${message.id} ---`,
      '',
    ];
  });
  return [
    '[MODEL FLEET MESSAGE]',
    `Recipient: ${workerIdentityLabel(state, worker)}`,
    `Batch size: ${messages.length}`,
    messages.length > 1
      ? 'Process every message in this batch in the listed order during this single turn. Preserve each message identity and satisfy all non-conflicting instructions; do not require one ChatGPT turn per message.'
      : 'Process the message below during this turn.',
    '',
    workspaceToolInstruction(state.workspacePath),
    '',
    ...blocks,
    controlFeedback,
    controlFeedback ? '' : '',
    'Respond by acting on all messages in this batch.',
    '',
    workerRoleOperatingPrompt(worker),
    '',
    canonicalRole(worker.role) === 'coordinator' ? coordinatorProtocolText() : '',
    canonicalRole(worker.role) === 'coordinator' ? '' : '',
    'Registered peer routing targets:',
    peerSummary(state, worker.id),
    'Use only these exact worker IDs for peer delivery.',
    '',
    fleetProtocolText(),
    '[/MODEL FLEET MESSAGE]',
  ].join('\n');
}

function buildControlPrompt(state, worker) {
  return [
    '[MODEL FLEET MESSAGE]',
    `Recipient: ${workerIdentityLabel(state, worker)}`,
    'Batch size: 0 semantic messages',
    '',
    workspaceToolInstruction(state.workspacePath),
    '',
    controlFeedbackText(worker),
    '',
    'Act on the control feedback now. This control-plane inbox is separate from semantic peer traffic.',
    '',
    workerRoleOperatingPrompt(worker),
    '',
    canonicalRole(worker.role) === 'coordinator' ? coordinatorProtocolText() : '',
    '',
    'Registered peer routing targets:',
    peerSummary(state, worker.id),
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

function parseFleetAttributes(source) {
  const attrs = {};
  const attrRe = /\b([A-Za-z][A-Za-z0-9_-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s\]]+))/g;
  for (const match of String(source || '').matchAll(attrRe)) {
    attrs[String(match[1] || '').toLowerCase()] = String(match[2] ?? match[3] ?? match[4] ?? '').trim();
  }
  return attrs;
}

function parseFleetOutput(text) {
  const source = normalizeFleetProtocolSource(text);
  const messages = [];
  const messageRe = /\[\s*FLEET_MESSAGE\b([^\]]*)\]([\s\S]*?)\[\s*\/\s*FLEET_MESSAGE\s*\]/gi;
  for (const match of source.matchAll(messageRe)) {
    const attrs = parseFleetAttributes(match[1]);
    const to = String(attrs.to || attrs.recipient || '').trim();
    const body = String(match[2] || '').trim();
    if (to && body) messages.push({ to, body });
  }

  const tasks = [];
  const taskRe = /\[\s*FLEET_TASK\b([^\]]*)\]([\s\S]*?)\[\s*\/\s*FLEET_TASK\s*\]/gi;
  for (const match of source.matchAll(taskRe)) {
    const attrs = parseFleetAttributes(match[1]);
    const prompt = String(match[2] || '').trim();
    const role = String(attrs.role || '').trim();
    const title = String(attrs.title || '').trim();
    if (!role || !title || !prompt) continue;
    tasks.push({
      key: String(attrs.key || '').trim(),
      role,
      title,
      prompt,
      dependencies: String(attrs.depends || '').split(',').map((item) => item.trim()).filter(Boolean),
      priority: Math.max(-100, Math.min(100, Number(attrs.priority || 0) || 0)),
    });
  }

  const statusMatch = source.match(/\[\s*FLEET_STATUS\b[^\]]*?\bstate\s*=\s*(?:"(done|blocked)"|'(done|blocked)'|(done|blocked))\s*\]([\s\S]*?)\[\s*\/\s*FLEET_STATUS\s*\]/i);
  const jsonStatusMatch = statusMatch ? null : source.match(/(?:^|\n)\s*FLEET_STATUS\s*(\{[\s\S]*\})\s*$/i);
  let jsonStatus = null;
  if (jsonStatusMatch) {
    try {
      const candidate = JSON.parse(jsonStatusMatch[1]);
      if (candidate && typeof candidate === 'object') jsonStatus = candidate;
    } catch {
      jsonStatus = null;
    }
  }
  const rawStatusState = statusMatch
    ? (statusMatch[1] || statusMatch[2] || statusMatch[3])
    : String(jsonStatus?.state || '').trim().toLowerCase();
  const statusState = rawStatusState === 'completed' ? 'done' : rawStatusState;
  const markerPresent = /\[\s*\/?\s*FLEET_MESSAGE\b/i.test(source);
  const taskMarkerPresent = /\[\s*\/?\s*FLEET_TASK\b/i.test(source);
  return {
    state: statusState ? statusState.toLowerCase() : 'done',
    statusNote: statusMatch
      ? String(statusMatch[4] || '').trim()
      : String(jsonStatus?.detail || '').trim(),
    messages,
    tasks,
    markerPresent,
    taskMarkerPresent,
    malformedMessageEnvelope: markerPresent && messages.length === 0,
    malformedTaskEnvelope: taskMarkerPresent && tasks.length === 0,
  };
}

function createTaskInState(state, {
  title,
  prompt,
  role,
  priority = 0,
  dependencies = [],
  parentTaskId = null,
  createdByWorkerId = null,
  createdByRole = null,
}, { allowCoordinator = true } = {}) {
  const id = `T-${state.nextTask++}`;
  const taskRole = canonicalRole(role);
  if (!allowCoordinator && taskRole === 'coordinator') throw new Error('coordinator may not create coordinator child tasks');
  const dependencyIds = Array.from(new Set((Array.isArray(dependencies) ? dependencies : []).filter((depId) => state.tasks[depId])));
  const task = {
    id,
    title: String(title || '').trim() || id,
    prompt: String(prompt || '').trim(),
    role: taskRole,
    priority: Math.max(-100, Math.min(100, Number(priority || 0))),
    dependencies: dependencyIds,
    parentTaskId: parentTaskId && state.tasks[parentTaskId] ? parentTaskId : null,
    createdByWorkerId: createdByWorkerId || null,
    createdByRole: createdByRole ? canonicalRole(createdByRole) : null,
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
  appendJournal(state, 'task.created', `${id}: ${task.title}`, {
    role: task.role,
    parentTaskId: task.parentTaskId,
    createdByWorkerId: task.createdByWorkerId,
    createdByRole: task.createdByRole,
  });
  return task;
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
  goalContinuation = false,
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
    goalContinuation: goalContinuation === true,
  };
  state.messages.push(message);
  if (state.messages.length > MAX_MESSAGES) state.messages.splice(0, state.messages.length - MAX_MESSAGES);
  appendJournal(state, 'message.queued', `${id}: ${fromWorkerId || from || 'operator'} → ${toWorkerId}`, { taskId });
  return message;
}

function compactFleetFingerprint(value) {
  const source = String(value || '');
  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `${source.length}:${(hash >>> 0).toString(16)}`;
}

function goalFrontierKey(state) {
  const taskState = Object.values(state.tasks || {})
    .sort((a, b) => String(a.id || '').localeCompare(String(b.id || ''), undefined, { numeric: true }))
    .map((task) => [task.id, task.status, Number(task.completedAt || 0), Number(task.attempts || 0), String(task.lastAutoRecoveryReason || '')]);
  const messageState = (Array.isArray(state.messages) ? state.messages : [])
    .filter((message) => message && message.goalContinuation !== true && message.toWorkerId !== 'operator')
    .map((message) => [message.id, message.status, message.fromWorkerId || message.from || '', message.toWorkerId || '', Number(message.completedAt || 0), Number(message.autoRecoveryAttempts || 0), String(message.lastAutoRecoveryReason || '')]);
  return compactFleetFingerprint(JSON.stringify({
    goal: String(state.goal || '').trim(),
    tasks: taskState,
    messages: messageState,
  }));
}

function queueGoalContinuationIfNeeded(state) {
  const goal = String(state.goal || '').trim();
  if (!goal || state.policy?.paused || state.policy?.authorityEnabled === false) return null;
  if (Object.values(state.workers || {}).some((worker) => worker?.currentAssignmentId)) return null;
  if ((state.messages || []).some((message) => message?.status === 'queued' || message?.status === 'running')) return null;
  const coordinator = Object.values(state.workers || {})
    .filter((worker) => worker
      && worker.enabled
      && canonicalRole(worker.role) === 'coordinator'
      && Number.isInteger(worker.tabId)
      && worker.lifecycle !== 'stale'
      && worker.status !== 'blocked')
    .sort((a, b) => String(a.id).localeCompare(String(b.id), undefined, { numeric: true }))[0];
  if (!coordinator) return null;
  const frontierKey = goalFrontierKey(state);
  if (frontierKey && frontierKey === String(state.lastGoalContinuationKey || '')) return null;
  const message = queueSemanticMessage(state, {
    from: 'scheduler',
    toWorkerId: coordinator.id,
    goalContinuation: true,
    body: [
      'GOAL CONTINUATION.',
      'The fleet is quiescent: no semantic messages, runnable tasks, active assignments, or control notices remain, but the fleet goal is still set.',
      `Goal: ${goal}`,
      '',
      'Reconcile the current durable fleet state and continue toward the goal.',
      '- Inspect existing task/message results and failures before creating new work.',
      '- If unfinished, emit only the bounded next FLEET_TASK/FLEET_MESSAGE work required by the current frontier.',
      '- If blocked, report the exact blocker to operator.',
      '- If the goal is genuinely complete, report completion to operator and emit no new work.',
      '- Do not create work merely to keep workers busy.',
    ].join('\n'),
  });
  state.lastGoalContinuationKey = frontierKey;
  appendJournal(state, 'goal.continuation_queued', `${message.id} queued to ${coordinator.id}`, { workerId: coordinator.id, frontierKey });
  return message;
}

function queueWorkerControlNotice(state, workerId, {
  type = 'control',
  body,
  taskId = null,
  relatedAssignmentId = null,
} = {}) {
  const worker = state.workers[workerId];
  if (!worker) return null;
  if (!Array.isArray(worker.controlInbox)) worker.controlInbox = [];
  const notice = {
    id: `C-${state.generation + 1}-${now()}-${worker.controlInbox.length + 1}`,
    type: String(type || 'control'),
    body: String(body || '').trim(),
    taskId: taskId || null,
    relatedAssignmentId: relatedAssignmentId || null,
    createdAt: now(),
  };
  if (!notice.body) return null;
  worker.controlInbox.push(notice);
  if (worker.controlInbox.length > MAX_CONTROL_NOTICES) {
    worker.controlInbox.splice(0, worker.controlInbox.length - MAX_CONTROL_NOTICES);
  }
  appendJournal(state, 'control.queued', `${notice.id} queued for ${workerId}`, {
    workerId,
    taskId: notice.taskId,
    type: notice.type,
  });
  return notice;
}

function captureControlNoticeIds(worker) {
  return (Array.isArray(worker?.controlInbox) ? worker.controlInbox : [])
    .slice(0, MAX_CONTROL_NOTICES)
    .map((notice) => notice.id);
}

function selectMessageBatch(state, seed) {
  if (!seed) return [];
  if (seed.requiresFleetMessage === true) return [seed];
  const candidates = state.messages
    .filter((message) => message.status === 'queued'
      && message.toWorkerId === seed.toWorkerId
      && message.requiresFleetMessage !== true)
    .sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
  const batch = [];
  let chars = 0;
  for (const message of candidates) {
    const cost = String(message.body || '').length + 256;
    if (batch.length && (batch.length >= MAX_MESSAGE_BATCH_SIZE || chars + cost > MAX_MESSAGE_BATCH_CHARS)) break;
    batch.push(message);
    chars += cost;
    if (batch.length >= MAX_MESSAGE_BATCH_SIZE) break;
  }
  return batch.length ? batch : [seed];
}

function routeParsedMessages(state, fromWorkerId, parsed, taskId) {
  const result = { queued: [], failures: [] };
  const source = state.workers[fromWorkerId];
  const relatedTask = taskId ? state.tasks[taskId] : null;
  const sourceRole = roleContract(relatedTask?.role || source?.role);
  const allowedHandoffs = new Set(sourceRole.allowedHandoffs || []);
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
        if (worker.enabled && worker.lifecycle !== 'stale' && Number.isInteger(worker.tabId) && worker.id !== fromWorkerId && allowedHandoffs.has(canonicalRole(worker.role))) {
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
    if (state.workers[target]?.enabled && state.workers[target].lifecycle !== 'stale' && Number.isInteger(state.workers[target].tabId)) {
      const targetRole = canonicalRole(state.workers[target].role);
      if (!allowedHandoffs.has(targetRole)) {
        appendJournal(state, 'message.route_failed', `${fromWorkerId} attempted a disallowed ${sourceRole?.id || 'unknown'} → ${targetRole} handoff`, { taskId, target });
        result.failures.push({ target, body: item.body, reason: `source role ${sourceRole?.id || 'unknown'} is not allowed to hand off to ${targetRole}` });
        continue;
      }
      const queued = queueSemanticMessage(state, { fromWorkerId, toWorkerId: target, body: item.body, taskId });
      result.queued.push(queued.id);
    } else {
      appendJournal(state, 'message.route_failed', `${fromWorkerId} produced an unroutable peer target ${target}`, { taskId });
      result.failures.push({ target, body: item.body, reason: 'recipient is not a currently enabled registered worker' });
    }
  }
  return result;
}

function routeCoordinatorTasks(state, fromWorkerId, parsed, parentTaskId = null) {
  const result = { created: [], failures: [] };
  if (!parsed.tasks?.length && !parsed.malformedTaskEnvelope) return result;

  const source = state.workers[fromWorkerId];
  const parentTask = parentTaskId ? state.tasks[parentTaskId] : null;
  const effectiveRole = canonicalRole(parentTask?.role || source?.role);
  if (effectiveRole !== 'coordinator') {
    for (const item of parsed.tasks || []) {
      result.failures.push({ key: item.key || '', title: item.title || '', reason: 'only Coordinator may create child tasks' });
    }
    if (parsed.malformedTaskEnvelope) result.failures.push({ key: '', title: '', reason: 'malformed FLEET_TASK envelope' });
    return result;
  }

  const aliases = new Map();
  for (const item of parsed.tasks || []) {
    try {
      const dependencies = [];
      for (const raw of item.dependencies || []) {
        const token = String(raw || '').trim();
        if (!token) continue;
        const alias = token.startsWith('$') ? token.slice(1) : token;
        if (state.tasks[token]) dependencies.push(token);
        else if (aliases.has(alias)) dependencies.push(aliases.get(alias));
        else throw new Error(`unknown dependency ${token}; child-task aliases may reference only earlier FLEET_TASK keys`);
      }
      if (item.key && aliases.has(item.key)) throw new Error(`duplicate child-task key ${item.key}`);
      const task = createTaskInState(state, {
        title: item.title,
        prompt: item.prompt,
        role: item.role,
        priority: item.priority,
        dependencies,
        parentTaskId,
        createdByWorkerId: fromWorkerId,
        createdByRole: 'coordinator',
      }, { allowCoordinator: false });
      if (item.key) aliases.set(item.key, task.id);
      result.created.push(task.id);
    } catch (error) {
      result.failures.push({ key: item.key || '', title: item.title || '', reason: String(error?.message || error) });
    }
  }
  if (parsed.malformedTaskEnvelope) {
    result.failures.push({ key: '', title: '', reason: 'malformed FLEET_TASK envelope: role, title, and body are required' });
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
    && w.lifecycle !== 'stale'
    && Number.isInteger(w.tabId)
    && !w.currentAssignmentId
    && !w.chatRotationPending
    && !workerBusyIsFresh(w)
    && Number(w.pageBusyUntil || 0) <= now()
    && w.status !== 'blocked');

  const queuedMessages = state.messages
    .filter((m) => m.status === 'queued' && m.toWorkerId !== 'operator')
    .sort((a, b) => a.createdAt - b.createdAt);
  const reservedMessages = new Set();

  for (const message of queuedMessages) {
    if (active >= maxConcurrency) break;
    if (reservedMessages.has(message.id) || message.status !== 'queued') continue;
    const worker = state.workers[message.toWorkerId];
    if (!worker || !available().some((w) => w.id === worker.id)) continue;
    const batch = selectMessageBatch(state, message).filter((item) => !reservedMessages.has(item.id));
    if (!batch.length) continue;
    const assignmentId = `A-M-${batch[0].id}-${state.generation + 1}`;
    const deliveredAt = now();
    for (const item of batch) {
      item.status = 'running';
      item.assignmentId = assignmentId;
      item.deliveredAt = deliveredAt;
      reservedMessages.add(item.id);
    }
    worker.currentAssignmentId = assignmentId;
    worker.currentAssignmentKind = 'message';
    worker.currentAssignmentStartedAt = deliveredAt;
    worker.currentMessageIds = batch.map((item) => item.id);
    worker.currentMessageId = worker.currentMessageIds[0] || null;
    worker.currentControlNoticeIds = captureControlNoticeIds(worker);
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
        messageId: batch[0].id,
        messageIds: batch.map((item) => item.id),
        controlNoticeIds: worker.currentControlNoticeIds.slice(),
        prompt: buildMessagePrompt(state, batch, worker),
      },
    });
    active += 1;
    appendJournal(state, batch.length > 1 ? 'message.batch_reserved' : 'message.reserved',
      batch.length > 1
        ? `${batch.length} messages (${batch[0].id}…${batch[batch.length - 1].id}) reserved for ${worker.id}`
        : `${batch[0].id} reserved for ${worker.id}`,
      { assignmentId, messageIds: batch.map((item) => item.id), count: batch.length });
  }

  const tasks = Object.values(state.tasks)
    .filter((task) => taskRunnable(state, task))
    .sort((a, b) => (b.priority || 0) - (a.priority || 0) || a.createdAt - b.createdAt);

  for (const task of tasks) {
    if (active >= maxConcurrency) break;
    const worker = available()
      .map((candidate) => ({ candidate, rank: workerMatchRank(candidate, task, state) }))
      .filter(({ rank }) => Number.isFinite(rank))
      .sort((a, b) => a.rank - b.rank
        || Number(a.candidate.registeredAt || 0) - Number(b.candidate.registeredAt || 0)
        || a.candidate.id.localeCompare(b.candidate.id, undefined, { numeric: true }))[0]?.candidate;
    if (!worker) continue;
    const assignmentId = `A-${task.id}-${state.generation + 1}`;
    task.status = 'running';
    task.assignedWorkerId = worker.id;
    task.assignmentId = assignmentId;
    task.startedAt = now();
    task.attempts = Number(task.attempts || 0) + 1;
    worker.currentAssignmentId = assignmentId;
    worker.currentAssignmentKind = 'task';
    worker.currentAssignmentStartedAt = task.startedAt;
    worker.currentTaskId = task.id;
    worker.currentMessageId = null;
    worker.currentMessageIds = [];
    worker.currentControlNoticeIds = captureControlNoticeIds(worker);
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
        controlNoticeIds: worker.currentControlNoticeIds.slice(),
        prompt: buildTaskPrompt(state, task, worker),
      },
    });
    active += 1;
    appendJournal(state, 'task.reserved', `${task.id} reserved for ${worker.id}`, { assignmentId });
  }


  // Control-plane feedback is a typed worker inbox. It piggybacks on normal
  // work above, and receives one bounded control-only turn only when no normal
  // work claimed that worker.
  for (const worker of available()) {
    if (active >= maxConcurrency) break;
    if (!Array.isArray(worker.controlInbox) || !worker.controlInbox.length) continue;
    const controlNoticeIds = captureControlNoticeIds(worker);
    if (!controlNoticeIds.length) continue;
    const assignmentId = `A-C-${worker.id}-${state.generation + 1}`;
    worker.currentAssignmentId = assignmentId;
    worker.currentAssignmentKind = 'control';
    worker.currentAssignmentStartedAt = now();
    worker.currentTaskId = null;
    worker.currentMessageId = null;
    worker.currentMessageIds = [];
    worker.currentControlNoticeIds = controlNoticeIds;
    worker.status = 'activating';
    worker.lifecycle = 'activating';
    worker.warmIdleSince = 0;
    worker.warmIdleUntil = 0;
    dispatches.push({
      workerId: worker.id,
      tabId: worker.tabId,
      assignment: {
        id: assignmentId,
        kind: 'control',
        controlNoticeIds: controlNoticeIds.slice(),
        prompt: buildControlPrompt(state, worker),
      },
    });
    active += 1;
    appendJournal(state, 'control.reserved', `${controlNoticeIds.length} control notice(s) reserved for ${worker.id}`, {
      assignmentId,
      controlNoticeIds,
    });
  }

  return dispatches;
}

async function failDispatch(dispatch, error) {
  const errorText = String(error);
  const { result } = await mutateFleet((state) => {
    const worker = state.workers[dispatch.workerId];
    const blockWorker = !state.policy.paused && state.policy.authorityEnabled;
    let failedMessageIds = [];
    if (worker?.currentAssignmentId === dispatch.assignment.id) {
      if (dispatch.assignment.kind === 'message') {
        failedMessageIds = requeueAssignmentMessages(state, worker, dispatch.assignment.id, 'target worker blocked after dispatch failure: ' + errorText);
        for (const messageId of failedMessageIds) {
          const message = state.messages.find((item) => item.id === messageId);
          if (!message) continue;
          message.lastDispatchError = errorText;
          message.dispatchFailureCount = Number(message.dispatchFailureCount || 0) + 1;
        }
      }
      clearWorkerAssignmentState(worker);
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
    }
    appendJournal(state, 'dispatch.failed', dispatch.assignment.id + ' failed: ' + errorText, {
      error: errorText,
      workerBlocked: !!worker && worker.status === 'blocked',
      messageIds: failedMessageIds,
    });
    return { workerBlocked: !!worker && worker.status === 'blocked' };
  });
  return result || { workerBlocked: false };
}
async function journalDeferredMessages(preview, reason) {
  const queued = preview.messages.filter((message) => message.status === 'queued' && message.toWorkerId !== 'operator');
  if (queued.length) await mutateFleet((state) => {
    const groups = new Map();
    for (const message of queued) {
      if (!groups.has(message.toWorkerId)) groups.set(message.toWorkerId, []);
      groups.get(message.toWorkerId).push(message.id);
    }
    for (const [workerId, messageIds] of groups) {
      const target = state.workers[workerId];
      let detail = reason;
      if (!target) detail = 'target worker missing';
      else if (!target.enabled) detail = 'target worker disabled';
      else if (target.currentAssignmentId) detail = `target owns ${target.currentAssignmentId}`;
      else if (target.lifecycle === 'stale' || !Number.isInteger(target.tabId)) detail = 'target worker stale or unbound';
      else if (target.status === 'blocked') detail = 'target worker blocked';
      else if (workerBusyIsFresh(target)) detail = 'target worker busy with fresh heartbeat';
      let changed = false;
      let oldestAt = 0;
      for (const messageId of messageIds) {
        const message = state.messages.find((item) => item.id === messageId);
        if (!message || message.status !== 'queued') continue;
        const createdAt = Number(message.createdAt || 0);
        if (createdAt > 0 && (!oldestAt || createdAt < oldestAt)) oldestAt = createdAt;
        if (message.lastDeferredReason !== detail) {
          message.lastDeferredReason = detail;
          changed = true;
        }
      }
      const count = messageIds.length;
      const summaryKey = `${detail}|${count}`;
      if (target && target.lastDeferredSummaryKey !== summaryKey) {
        target.lastDeferredSummaryKey = summaryKey;
        changed = true;
      }
      if (!changed) continue;
      const behind = target?.currentAssignmentId
        ? `${count} queued behind ${target.currentAssignmentId}`
        : `${count} queued · ${detail}`;
      appendJournal(state, 'schedule.deferred_group', `${workerId}: ${behind}`, {
        workerId,
        count,
        oldestQueueAgeMs: oldestAt ? Math.max(0, now() - oldestAt) : 0,
        reason: detail,
      });
    }
  });
  for (const task of Object.values(preview.tasks)) {
    if (task.status !== 'pending') continue;
    const workflowReason = taskBlockReason(preview, task);
    if (workflowReason && task.statusNote !== `blocked: ${workflowReason}`) {
      await mutateFleet((state) => {
        const current = state.tasks[task.id];
        if (!current || current.status !== 'pending') return;
        current.statusNote = `blocked: ${workflowReason}`;
        appendJournal(state, 'schedule.workflow_blocked', `${task.id}: ${workflowReason}`, { role: task.role });
      });
    }
  }
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
        // Keep the reservation activating until a worker heartbeat confirms
        // that the page owns this exact assignment. A heartbeat queued before
        // execute-assignment acknowledgement must not be allowed to revoke it.
        worker.lastDispatchError = '';
        worker.dispatchFailureCount = 0;
        worker.lastDispatchFailureAt = 0;
        if (worker.lastCountedAssignmentId !== dispatch.assignment.id) {
          worker.lastCountedAssignmentId = dispatch.assignment.id;
          worker.chatTurnCount = Math.max(0, Math.trunc(Number(worker.chatTurnCount || 0))) + 1;
          const limit = maxTurnsPerChatForRole(state.topology, worker.role);
          if (worker.chatTurnCount >= limit) {
            worker.chatRotationPending = true;
            appendJournal(state, 'worker.chat_limit_reached', dispatch.workerId + ' reached ' + worker.chatTurnCount + '/' + limit + ' turns', {
              assignmentId: dispatch.assignment.id,
              turns: worker.chatTurnCount,
              limit,
            });
          }
        }
      }
      appendJournal(state, 'dispatch.accepted', `${dispatch.assignment.id} accepted by ${dispatch.workerId}`, {
        workerId: dispatch.workerId,
        tabId: dispatch.tabId,
      });
      if (dispatch.assignment.kind === 'message') {
        const messageIds = Array.isArray(dispatch.assignment.messageIds) && dispatch.assignment.messageIds.length
          ? dispatch.assignment.messageIds
          : [dispatch.assignment.messageId].filter(Boolean);
        appendJournal(
          state,
          messageIds.length > 1 ? 'message.batch_sent' : 'message.sent',
          messageIds.length > 1
            ? `${messageIds.length} messages (${messageIds[0]}…${messageIds[messageIds.length - 1]}) sent to ${dispatch.workerId}`
            : `${messageIds[0]} sent to ${dispatch.workerId}`,
          { assignmentId: dispatch.assignment.id, messageIds, count: messageIds.length },
        );
      } else if (dispatch.assignment.kind === 'task') {
        appendJournal(state, 'task.started', `${dispatch.assignment.taskId} started by ${dispatch.workerId}`, {
          assignmentId: dispatch.assignment.id,
        });
      } else {
        appendJournal(state, 'control.started', `${dispatch.assignment.controlNoticeIds?.length || 0} control notice(s) started by ${dispatch.workerId}`, {
          assignmentId: dispatch.assignment.id,
          controlNoticeIds: dispatch.assignment.controlNoticeIds || [],
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
  if (fleetBridgeRecoveryPromise) {
    schedulePending = true;
    return;
  }
  if (scheduling) {
    schedulePending = true;
    return;
  }

  // Serialize only the short authority/reservation phase. Worker activation and
  // acknowledgement run independently after reservations are committed.
  scheduling = true;
  let dispatches = [];
  try {
    let preview = await loadFleetState();
    if (preview.policy.paused || !preview.policy.authorityEnabled) {
      await journalDeferredMessages(preview, preview.policy.paused ? 'dispatch paused' : 'authority revoked');
      return;
    }
    startPendingChatRotations(preview);
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
        && !target.chatRotationPending
        && target.lifecycle !== 'parking'
        && target.lifecycle !== 'stale'
        && Number.isInteger(target.tabId);
    });
    const runnableTasks = Object.values(preview.tasks).filter((task) => taskRunnable(preview, task));
    const hasRunnableTask = runnableTasks.length > 0;
    const hasDispatchableTask = runnableTasks.some((task) => Object.values(preview.workers).some((worker) => workerMatches(worker, task, preview)));
    const controlWorkers = Object.values(preview.workers).filter((worker) => Array.isArray(worker.controlInbox) && worker.controlInbox.length > 0);
    const hasControlWork = controlWorkers.length > 0;
    const hasDispatchableControl = controlWorkers.some((worker) => worker.enabled
      && !worker.currentAssignmentId
      && !workerBusyIsFresh(worker)
      && Number(worker.pageBusyUntil || 0) <= now()
      && worker.status !== 'blocked'
      && !worker.chatRotationPending
      && worker.lifecycle !== 'parking'
      && worker.lifecycle !== 'stale'
      && Number.isInteger(worker.tabId));
    if (!hasQueuedMessage && !hasRunnableTask && !hasControlWork) {
      if (active === 0 && (await mutateFleet((state) => queueGoalContinuationIfNeeded(state))).result) { schedulePending = true; return; }
      await journalDeferredMessages(preview, 'no runnable work');
      return;
    }
    if (!hasDispatchableMessage && !hasDispatchableTask && !hasDispatchableControl) {
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
  const loaded = await loadFleetState();
  const workerId = workerIdForTabInState(loaded, senderTabId);
  if (!workerId) return publicSnapshot(loaded);
  liveHeartbeats.delete(workerId);
  const responseText = String(payload.text || '').slice(0, MAX_RESULT_CHARS);
  const parsed = parseFleetOutput(responseText);
  const { state, result } = await mutateFleet((state) => {
    const worker = state.workers[workerId];
    if (!worker) {
      return { rejected: true, error: `worker ${workerId} is no longer registered` };
    }
    if (worker.currentAssignmentId !== payload.assignmentId) {
      appendJournal(state, 'assignment.completion_mismatch', `${workerId} rejected completion for ${payload.assignmentId || 'unknown assignment'}`, {
        workerId,
        expectedAssignmentId: worker.currentAssignmentId || null,
        reportedAssignmentId: payload.assignmentId || null,
      });
      return {
        rejected: true,
        code: 'assignment_ownership_mismatch',
        terminal: !worker.currentAssignmentId,
        expectedAssignmentId: worker.currentAssignmentId || null,
        reportedAssignmentId: payload.assignmentId || null,
        error: `assignment ownership mismatch: expected ${worker.currentAssignmentId || 'none'}, received ${payload.assignmentId || 'none'}`,
      };
    }

    const finishedTaskId = worker.currentTaskId;
    const finishedMessageIds = assignmentMessageIds(worker);
    const sourceMessages = state.messages
      .filter((message) => finishedMessageIds.includes(message.id) && message.assignmentId === payload.assignmentId)
      .sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
    const sourceMessage = sourceMessages.find((message) => message.requiresFleetMessage === true) || sourceMessages[0] || null;
    const activeControlNoticeIds = assignmentControlNoticeIds(worker);
    const activeControlNotices = (Array.isArray(worker.controlInbox) ? worker.controlInbox : [])
      .filter((notice) => activeControlNoticeIds.includes(notice.id));

    const relatedTaskId = finishedTaskId
      || sourceMessages.find((message) => message.taskId)?.taskId
      || activeControlNotices.find((notice) => notice.taskId)?.taskId
      || null;
    const routeResult = routeParsedMessages(state, workerId, parsed, relatedTaskId);
    const childTaskResult = routeCoordinatorTasks(state, workerId, parsed, relatedTaskId);
    if (childTaskResult.failures.length) {
      queueWorkerControlNotice(state, workerId, {
        type: 'child-task-creation-failure',
        body: [
          'COORDINATOR CHILD-TASK CREATION FAILURE.',
          'One or more FLEET_TASK envelopes were rejected by the control plane.',
          ...childTaskResult.failures.map((failure) => `- ${failure.key || failure.title || 'task'}: ${failure.reason}`),
          'Observe the failure, replan, and emit corrected child tasks if still required.',
        ].join('\n'),
        taskId: relatedTaskId,
        relatedAssignmentId: payload.assignmentId,
      });
    }
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
          messageIds: finishedMessageIds,
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
        task.completedByWorkerId = workerId;
        task.completedByRole = canonicalRole(worker.role);
        task.statusNote = repairMessage
          ? `peer routing repair queued as ${repairMessage.id}`
          : parsed.statusNote;
        appendJournal(state, `task.${task.status}`, `${task.id} ${task.status} by ${workerId}`);
      }
    }

    for (const message of sourceMessages) {
      message.status = repairExhausted && message.id === sourceMessage?.id ? 'blocked' : 'done';
      message.completedAt = now();
      message.response = responseText;
      if (repairMessage && message.id === sourceMessage?.id) message.protocolRepairMessageId = repairMessage.id;
    }
    if (sourceMessages.length) {
      appendJournal(
        state,
        repairExhausted ? 'message.protocol_repair_failed' : (sourceMessages.length > 1 ? 'message.batch_completed' : 'message.completed'),
        repairExhausted
          ? `${sourceMessage?.id || sourceMessages[0].id} exhausted peer-routing repair at ${workerId}`
          : sourceMessages.length > 1
            ? `${sourceMessages.length} messages (${sourceMessages[0].id}…${sourceMessages[sourceMessages.length - 1].id}) handled by ${workerId}`
            : `${sourceMessages[0].id} handled by ${workerId}`,
        { messageIds: sourceMessages.map((message) => message.id), count: sourceMessages.length },
      );
    }

    const consumedControlNoticeIds = consumeAssignmentControlNotices(worker);
    appendJournal(state, 'assignment.parsed', `${payload.assignmentId}: ${parsed.messages.length} routed semantic message(s), batch=${sourceMessages.length}, marker=${parsed.markerPresent ? 'yes' : 'no'}, state=${parsed.state}`, {
      workerId,
      taskId: finishedTaskId || null,
      sourceMessageIds: finishedMessageIds,
      sourceMessageCount: sourceMessages.length,
      messageCount: parsed.messages.length,
      consumedControlNoticeIds,
      childTaskCount: childTaskResult.created.length,
      childTaskFailureCount: childTaskResult.failures.length,
      markerPresent: parsed.markerPresent,
      taskMarkerPresent: parsed.taskMarkerPresent,
      malformedMessageEnvelope: parsed.malformedMessageEnvelope,
      routedMessageCount: routeResult.queued.length,
      routeFailureCount: routeResult.failures.length,
      protocolRepairMessageId: repairMessage?.id || null,
    });

    const releasedAt = now();
    const responseTerminalAt = Math.max(0, Number(payload.responseTerminalAt || 0));
    worker.lastAssignmentReleasedAt = releasedAt;
    if (responseTerminalAt > 0) {
      const lagMs = Math.max(0, releasedAt - responseTerminalAt);
      worker.lastResponseTerminalAt = responseTerminalAt;
      worker.lastCompletionReleaseLagMs = lagMs;
      worker.completionReleaseLagCount = Math.max(0, Number(worker.completionReleaseLagCount || 0)) + 1;
      worker.completionReleaseLagTotalMs = Math.max(0, Number(worker.completionReleaseLagTotalMs || 0)) + lagMs;
      worker.completionReleaseLagMaxMs = Math.max(Math.max(0, Number(worker.completionReleaseLagMaxMs || 0)), lagMs);
      appendJournal(state, 'assignment.release_lag', `${payload.assignmentId}: response terminal → assignment released ${lagMs}ms`, {
        workerId,
        responseTerminalAt,
        assignmentReleasedAt: releasedAt,
        lagMs,
      });
    }

    clearWorkerAssignmentState(worker);
    worker.status = 'idle';
    worker.lifecycle = 'idle';
    worker.busy = false;
    worker.lastResultAt = releasedAt;
    worker.progressVersion = Number(worker.progressVersion || 0) + 1;
    worker.heartbeatAt = releasedAt;
    return { completed: true };
  });
  if (result?.rejected) {
    return {
      ok: false,
      code: result.code || 'assignment_completion_rejected',
      terminal: result.terminal === true,
      expectedAssignmentId: result.expectedAssignmentId ?? null,
      reportedAssignmentId: result.reportedAssignmentId ?? payload.assignmentId ?? null,
      error: result.error,
      snapshot: publicSnapshot(state),
    };
  }
  const completed = await loadFleetState();
  if (completed.workers[workerId]?.chatRotationPending) {
    await rotateWorkerChat(workerId, 'turn cap reached after ' + (payload.assignmentId || 'assignment')).catch(() => {});
  } else {
    await beginWarmIdle(workerId, `assignment ${payload.assignmentId || 'unknown'} completed`);
  }
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
      const hasAssignmentIdentity = Object.prototype.hasOwnProperty.call(heartbeat, 'activeAssignmentId');
      const reportedAssignmentId = hasAssignmentIdentity
        ? (typeof heartbeat.activeAssignmentId === 'string' ? heartbeat.activeAssignmentId.trim() : '') || null
        : undefined;
      const durableAssignmentId = worker.currentAssignmentId || null;
      const activationPending = hasAssignmentIdentity
        && heartbeat.busy !== true
        && reportedAssignmentId === null
        && durableAssignmentId
        && worker.lifecycle === 'activating';
      if (hasAssignmentIdentity && reportedAssignmentId !== durableAssignmentId) {
        if (activationPending) {
          // A heartbeat may have been queued before execute-assignment
          // acknowledgement. Preserve the activating reservation until a
          // matching heartbeat confirms page custody or dispatch fails.
        } else if (heartbeat.busy !== true
          && reportedAssignmentId === null
          && durableAssignmentId) {
          const reason = `heartbeat reported idle without active assignment; released durable ${durableAssignmentId}`;
          const released = releaseWorkerAssignment(state, workerId, durableAssignmentId, reason, {
            requeue: true,
            eventType: 'assignment.heartbeat_reconciled',
          });
          if (released) scheduleNeeded = true;
        } else {
          const reason = `heartbeat assignment mismatch: durable ${durableAssignmentId || 'none'}, reported ${reportedAssignmentId || 'none'}`;
          appendJournal(state, 'assignment.heartbeat_mismatch', `${workerId} heartbeat custody mismatch`, {
            workerId,
            expectedAssignmentId: durableAssignmentId,
            reportedAssignmentId,
            busy: heartbeat.busy === true,
          });
          worker.status = 'blocked';
          worker.lastDispatchError = reason;
          worker.lastDispatchFailureAt = now();
        }
      } else if (hasAssignmentIdentity
        && durableAssignmentId
        && reportedAssignmentId === durableAssignmentId
        && heartbeat.busy === true) {
        worker.status = 'running';
        worker.lifecycle = 'running';
        worker.lastDispatchError = '';
        worker.dispatchFailureCount = 0;
        worker.lastDispatchFailureAt = 0;
      }
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
  const state = await loadFleetState();
  const workerId = workerIdForTabInState(state, tab.id);
  if (!workerId) return { heartbeatAt: observedAt, registered: false };
  liveHeartbeats.set(workerId, {
    at: observedAt,
    busy: payload.busy === true,
    activeAssignmentId: Object.prototype.hasOwnProperty.call(payload, 'activeAssignmentId')
      ? (typeof payload.activeAssignmentId === 'string' ? payload.activeAssignmentId.trim() : '') || null
      : undefined,
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
  const loaded = await loadFleetState();
  const workerId = workerIdForTabInState(loaded, tab.id);
  if (!workerId) return { registered: false, worker: null, snapshot: publicSnapshot(loaded) };
  liveHeartbeats.delete(workerId);
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
      const staleAssignmentId = worker.currentAssignmentId;
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
      const requeued = requeueAssignmentMessages(state, worker, staleAssignmentId, `${workerId} page lifecycle restart`);
      for (const messageId of requeued) appendJournal(state, 'message.requeued', `${messageId} requeued after ${workerId} page lifecycle restart`);
      clearWorkerAssignmentState(worker);
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
  const worker = workerForTab(fleet, tabId);
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

function roleCountsForWorkers(state) {
  const counts = Object.fromEntries(ROLE_CATALOG.map((role) => [role.id, 0]));
  for (const worker of Object.values(state.workers)) {
    if (!worker?.enabled || worker.lifecycle === 'stale' || !Number.isInteger(worker.tabId)) continue;
    const role = canonicalRole(worker.role);
    counts[role] = Number(counts[role] || 0) + 1;
  }
  return counts;
}

async function setTopologyRoleCount(role, count) {
  const normalized = normalizeRole(role);
  if (!ROLE_IDS.has(normalized)) throw new Error('unsupported fleet role');
  const nextCount = Math.max(0, Math.min(MAX_ROLE_COUNT, Math.trunc(Number(count) || 0)));
  const { state } = await mutateFleet((state) => {
    state.topology = normalizeTopology(state.topology);
    state.topology.desiredRoleCounts[normalized] = nextCount;
    appendJournal(state, 'topology.role_target', `${normalized} target → ${nextCount}`);
  });
  return publicSnapshot(state);
}

async function setRoleTurnLimit(role, limit) {
  const normalized = normalizeRole(role);
  if (!ROLE_IDS.has(normalized)) throw new Error('unsupported fleet role');
  const nextLimit = boundedMaxTurnsPerChat(limit);
  const { state } = await mutateFleet((state) => {
    state.topology = normalizeTopology(state.topology);
    state.topology.maxTurnsPerChatByRole[normalized] = nextLimit;
    for (const worker of Object.values(state.workers)) {
      if (canonicalRole(worker.role) !== normalized) continue;
      if (Math.max(0, Math.trunc(Number(worker.chatTurnCount || 0))) >= nextLimit) {
        worker.chatRotationPending = true;
      }
    }
    appendJournal(state, 'topology.role_turn_limit', `${normalized} turns/chat → ${nextLimit}`, {
      role: normalized,
      maxTurnsPerChat: nextLimit,
    });
  });
  schedule().catch(() => {});
  return publicSnapshot(state);
}

async function createTopologyWorker(role) {
  const canonical = canonicalRole(role);
  const created = await chrome.windows.create({
    url: 'https://chatgpt.com/',
    focused: false,
    type: 'normal',
  });
  if (!Number.isInteger(created?.id)) throw new Error(`failed to create ${canonical} worker window`);
  const tabs = await chrome.tabs.query({ windowId: created.id });
  const tab = tabs.find((item) => Number.isInteger(item.id) && SUPPORTED_URL.test(item.url || ''))
    || tabs.find((item) => Number.isInteger(item.id));
  if (!tab?.id) {
    await chrome.windows.remove(created.id).catch(() => {});
    throw new Error(`created ${canonical} window has no usable tab`);
  }

  try {
    await waitForTabReady(tab.id, 30000);
    const result = await registerTab(tab.id, { role: canonical, topologyManaged: true });
    await mutateFleet((state) => {
      const worker = state.workers[result.worker.id];
      if (!worker) return;
      worker.topologyManaged = true;
      worker.windowId = created.id;
      appendJournal(state, 'topology.worker_created', `${worker.id} created for ${canonical}`, {
        role: canonical,
        windowId: created.id,
      });
    });
    return result.worker.id;
  } catch (error) {
    await chrome.windows.remove(created.id).catch(() => {});
    throw error;
  }
}

async function removeTopologyWorker(worker) {
  if (!worker?.topologyManaged) return false;
  if (worker.currentAssignmentId || workerBusyIsFresh(worker)) return false;
  const workerId = worker.id;
  const tabId = worker.tabId;
  const windowId = worker.windowId;
  await unregisterWorker(workerId);

  if (Number.isInteger(windowId)) {
    try {
      const win = await chrome.windows.get(windowId, { populate: true });
      const tabs = win.tabs || [];
      if (tabs.length === 1 && tabs[0]?.id === tabId) {
        await chrome.windows.remove(windowId);
        return true;
      }
    } catch {
      return true;
    }
  }
  if (Number.isInteger(tabId)) await chrome.tabs.remove(tabId).catch(() => {});
  return true;
}

let topologyReconcilePromise = null;

async function reconcileFleetTopology() {
  if (topologyReconcilePromise) return topologyReconcilePromise;
  topologyReconcilePromise = (async () => {
    const removed = [];
    const created = [];
    const errors = [];
    let deferredRemovals = 0;

    await reconcileStaleWorkerBindings('topology reconciliation');
    await recoverRegisteredFleetBridges('topology reconciliation');
    let state = await loadFleetState();
    const desired = normalizeTopology(state.topology).desiredRoleCounts;

    for (const role of ROLE_CATALOG) {
      const current = roleCountsForWorkers(state)[role.id] || 0;
      let excess = Math.max(0, current - desired[role.id]);
      if (!excess) continue;
      const candidates = Object.values(state.workers)
        .filter((worker) => worker.enabled
          && canonicalRole(worker.role) === role.id
          && worker.topologyManaged === true
          && !worker.currentAssignmentId
          && !workerBusyIsFresh(worker))
        .sort((a, b) => Number(b.registeredAt || 0) - Number(a.registeredAt || 0));
      for (const worker of candidates.slice(0, excess)) {
        try {
          if (await removeTopologyWorker(worker)) removed.push(worker.id);
        } catch (error) {
          errors.push(`${worker.id}: ${String(error)}`);
        }
      }
      state = await loadFleetState();
      excess = Math.max(0, (roleCountsForWorkers(state)[role.id] || 0) - desired[role.id]);
      deferredRemovals += excess;
    }

    state = await loadFleetState();
    for (const role of ROLE_CATALOG) {
      let missing = Math.max(0, desired[role.id] - (roleCountsForWorkers(state)[role.id] || 0));
      while (missing > 0) {
        try {
          const workerId = await createTopologyWorker(role.id);
          created.push(workerId);
        } catch (error) {
          errors.push(`${role.id}: ${String(error)}`);
          break;
        }
        state = await loadFleetState();
        missing = Math.max(0, desired[role.id] - (roleCountsForWorkers(state)[role.id] || 0));
      }
    }

    await mutateFleet((latest) => {
      appendJournal(latest, 'topology.reconciled', `fleet topology reconciled: +${created.length} / -${removed.length}`, {
        created,
        removed,
        deferredRemovals,
        errors,
      });
    });
    schedule().catch(() => {});
    return {
      snapshot: publicSnapshot(await loadFleetState()),
      created,
      removed,
      deferredRemovals,
      errors,
    };
  })();

  try {
    return await topologyReconcilePromise;
  } finally {
    topologyReconcilePromise = null;
  }
}

// async function registerAllSupportedTabs was intentionally removed: worker adoption is explicit.
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
  const messageIds = assignmentMessageIds(worker);
  const controlNoticeIds = assignmentControlNoticeIds(worker);

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

  for (const messageId of messageIds) {
    const semantic = state.messages.find((message) => message.id === messageId);
    if (semantic?.assignmentId !== releasedAssignmentId) continue;
    semantic.assignmentId = null;
    if (requeue) {
      semantic.status = 'queued';
    } else {
      semantic.status = terminalStatus;
      semantic.completedAt = now();
      semantic.lastDispatchError = reason || '';
    }
  }

  // A cancellation/recovery does not consume control notices; they remain in
  // the typed inbox for the retry or the next valid assignment.
  clearWorkerAssignmentState(worker);
  worker.status = 'idle';
  worker.lifecycle = 'idle';
  worker.busy = false;
  worker.lastResultAt = now();
  worker.progressVersion = Number(worker.progressVersion || 0) + 1;
  worker.heartbeatAt = now();

  appendJournal(state, eventType, `${worker.id} released ${releasedAssignmentId}`, {
    assignmentId: releasedAssignmentId,
    taskId: taskId || null,
    messageId: messageIds[0] || null,
    messageIds,
    controlNoticeIds,
    reason: reason || '',
    requeued: requeue,
  });
  return {
    workerId,
    assignmentId: releasedAssignmentId,
    taskId,
    messageId: messageIds[0] || null,
    messageIds,
    controlNoticeIds,
    requeued: requeue,
  };
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
    let cancelledControlNotices = 0;
    for (const worker of Object.values(state.workers)) {
      cancelledControlNotices += Array.isArray(worker.controlInbox) ? worker.controlInbox.length : 0;
      worker.controlInbox = [];
      worker.currentControlNoticeIds = [];
    }
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
      cancelledControlNotices,
    });
    return { activeWorkerIds, cancelledQueued, cancelledControlNotices };
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
    cancelledControlNotices: initial.cancelledControlNotices,
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
  if (message.type === 'approval:connector-diagnostic') {
    connectorDiagnosticSession.lastEventAt = Date.now();
    connectorDiagnostics.correlationId = connectorDiagnosticSession.id;
    connectorDiagnostics.lastDomSnapshot = message.payload;
    connectorDiagnostics.updatedAt = Date.now();
    connectorDiagnostics.tabId = Number.isInteger(sender.tab?.id) ? sender.tab.id : null;
    return reply(Promise.resolve({ connectorDiagnostics }));
  }
  if (message.type === 'approval:get-connector-diagnostic-session') {
    return reply(Promise.resolve({
      correlationId: connectorDiagnosticSession.id,
      createdAt: connectorDiagnosticSession.createdAt,
      lastEventAt: connectorDiagnosticSession.lastEventAt,
    }));
  }
  if (message.type === 'approval:mcp-custody-event') {
    const event = message.payload || {};
    if (!event.correlationId || !event.eventType) {
      return reply(Promise.resolve({ ok: false, error: 'invalid_mcp_correlation_event' }));
    }
    mcpCorrelationEvents.lastEvent = {
      correlationId: event.correlationId,
      eventType: event.eventType,
      contextId: event.contextId || null,
      accessMode: event.accessMode || null,
      success: event.success,
    };
    mcpCorrelationEvents.updatedAt = Date.now();
    return reply(Promise.resolve({
      event: mcpCorrelationEvents.lastEvent,
    }));
  }
  if (message.type === 'approval:get-mcp-correlation-event') {
    return reply(Promise.resolve({
      lastEvent: mcpCorrelationEvents.lastEvent,
      updatedAt: mcpCorrelationEvents.updatedAt,
    }));
  }
  if (message.type === 'approval:workspace-evidence') {
    const evidence = message.payload || {};
    if (!evidence.correlationId || !evidence.contextId) {
      return reply(Promise.resolve({ ok: false, error: 'invalid_workspace_evidence' }));
    }
    workspaceEvidence.lastEvidence = {
      correlationId: evidence.correlationId,
      contextId: evidence.contextId,
      accessMode: evidence.accessMode || null,
      projectRoot: evidence.projectRoot || null,
    };
    workspaceEvidence.updatedAt = Date.now();
    return reply(Promise.resolve({
      evidence: workspaceEvidence.lastEvidence,
    }));
  }
  if (message.type === 'approval:get-connector-diagnostic-report') {
    const reconciliation = diagnosticReportHelpers.reconcile({
      frontendDiagnostic: connectorDiagnostics,
      mcpEvent: mcpCorrelationEvents.lastEvent,
      workspaceEvidence: workspaceEvidence.lastEvidence,
    });
    const explanation = diagnosticReportHelpers.explain(reconciliation);
    return reply(Promise.resolve({
      correlationId: reconciliation.correlationId,
      reconciliation,
      explanation,
      generatedAt: Date.now(),
    }));
  }
  if (message.type === 'approval:get-workspace-evidence') {
    return reply(Promise.resolve({
      lastEvidence: workspaceEvidence.lastEvidence,
      updatedAt: workspaceEvidence.updatedAt,
    }));
  }

  if (message.type === 'approval:get-connector-diagnostic') {
    return reply(Promise.resolve({ connectorDiagnostics }));
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
    return reply(getTabWorkerStateC16Dispatch(message));
  }
  if (message.type === 'fleet:register-own-worker') {
    const tabId = sender.tab?.id;
    return reply(registerTab(tabId, message.patch || {}).then((result) => result?.bindingMode
      ? result
      : ({ worker: result.worker, snapshot: result.snapshot })));
  }
  if (message.type === 'fleet:register-tab') {
    return reply(registerTab(message.tabId, message.patch || {}).then((result) => result?.bindingMode
      ? result
      : ({ worker: result.worker, snapshot: result.snapshot })));
  }
  if (message.type === 'fleet:unregister-worker') {
    return reply(unregisterWorker(message.workerId).then((result) => result && Object.prototype.hasOwnProperty.call(result, 'removed') ? result : ({ snapshot: result })));
  }
  if (message.type === 'fleet:focus-worker') {
    return reply(focusWorker(message.workerId).then(() => ({})));
  }
  if (message.type === 'fleet:set-worker-role') {
    // Legacy parity remains: cannot change role while worker owns an active assignment.
    return reply(setWorkerRoleC11Dispatch(message));











  }
  if (message.type === 'fleet:set-topology-role-count') {
    return reply(setTopologyRoleCountC11Dispatch(message));
  }
  if (message.type === 'fleet:set-role-turn-limit') {
    return reply(setRoleTurnLimitC11Dispatch(message));
  }
  if (message.type === 'fleet:reconcile-topology') {
    return reply(reconcileFleetTopology());
  }
  if (message.type === 'fleet:set-workspace-path') {
    return reply(setWorkspacePathC13Dispatch(message));
  }
  if (message.type === 'fleet:set-goal') {
    // C13 v2 preserves state.lastGoalContinuationKey = '' and calls schedule().catch after commit.
    return reply(setGoalC13Dispatch(message));
  }
  if (message.type === 'fleet:create-task') {
    // v1 createTaskInState compatibility remains delegated; C14 v2 uses createTaskV2.
    return reply(createTaskC14Dispatch(message));
  }
  if (message.type === 'fleet:retry-task') {
    return reply(retryTaskC14Dispatch(message));
  }
  if (message.type === 'fleet:send-message') {
    return reply(sendMessageC14Dispatch(message));
  }
  if (message.type === 'fleet:update-policy') {
    return reply(updatePolicyC13Dispatch(message));
  }
  if (message.type === 'fleet:cancel-worker-dispatch') {
    return reply(cancelWorkerDispatch(String(message.workerId || '').trim()));
  }
  if (message.type === 'fleet:stop-and-flush-stale') {
    return reply(stopAndFlushStaleWork());
  }
  if (message.type === 'fleet:kill-authority') {
    return reply(killAuthority().then((result) => result && result.killed === true ? result : ({ snapshot: result })));
  }
























































  if (message.type === 'fleet:clear-completed') {
    return reply(clearCompletedC15Dispatch());
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
    return reply(completeAssignment(sender.tab.id, message).then((result) => (
      result?.ok === false ? result : { snapshot: result }
    )));
  }
  if (message.type === 'fleet:worker-idle-ready') {
    if (!sender.tab?.id) return false;
    return reply(loadFleetState().then((state) => {
      if (state.version === 2) return c5WorkerIdleReadyV2(sender.tab.id, message);
      const workerId = workerIdForTabInState(state, sender.tab.id);
      if (workerId) {
        const worker = state.workers[workerId];
        if (worker?.chatRotationPending) {
          rotateWorkerChat(workerId, 'turn cap reached at idle acknowledgement').catch(() => {});
        } else {
          beginWarmIdle(workerId, `assignment ${message.assignmentId || 'unknown'} acknowledged`).catch(() => {});
        }
      }
      return {};
    }));
  }
  if (message.type === 'fleet:assignment-cancelled') {
    if (!sender.tab?.id) return false;
    return reply(loadFleetState().then((loaded) => {
      if (loaded.version === 2) return c6HandleAssignmentCancelledV2(sender.tab.id, message);
      return mutateFleet((state) => {
      const workerId = workerIdForTabInState(state, sender.tab.id);
      if (!workerId) return false;
      const worker = state.workers[workerId];
      const reason = String(message.reason || '');
      const operatorCancelled = reason === OPERATOR_CANCEL_REASON;
      const autoRecovery = reason.startsWith(AUTO_RECOVERY_REASON_PREFIX);
      let requeue = !operatorCancelled;
      let eventType = operatorCancelled ? 'assignment.operator_cancelled' : 'assignment.cancelled';
      let terminalStatus = 'cancelled';
      let recoveryAttempt = 0;

      if (autoRecovery && worker?.currentAssignmentId === message.assignmentId) {
        const taskItem = worker.currentTaskId ? state.tasks[worker.currentTaskId] : null;
        const messageItems = assignmentMessageIds(worker)
          .map((messageId) => state.messages.find((entry) => entry.id === messageId))
          .filter(Boolean);
        const controlItems = (Array.isArray(worker.controlInbox) ? worker.controlInbox : [])
          .filter((notice) => assignmentControlNoticeIds(worker).includes(notice.id));
        const items = taskItem ? [taskItem] : (messageItems.length ? messageItems : controlItems);
        const used = items.reduce((max, item) => Math.max(max, Number(item?.autoRecoveryAttempts || 0)), 0);
        requeue = used < MAX_AUTO_RECOVERY_ATTEMPTS;
        const recoveryReason = reason.slice(AUTO_RECOVERY_REASON_PREFIX.length);
        for (const item of items) {
          item.lastAutoRecoveryReason = recoveryReason;
          if (requeue) item.autoRecoveryAttempts = used + 1;
        }
        if (requeue) recoveryAttempt = used + 1;
        eventType = requeue ? 'assignment.recovery_queued' : 'assignment.recovery_exhausted';
        terminalStatus = requeue ? 'cancelled' : 'blocked';
      }

      const released = releaseWorkerAssignment(state, workerId, message.assignmentId, reason, {
        requeue,
        eventType,
        terminalStatus,
      });

      if (released && autoRecovery && requeue) {
        const noteFor = (item) => 'automatic recovery ' + recoveryAttempt + '/' + MAX_AUTO_RECOVERY_ATTEMPTS
          + ': ' + String(item?.lastAutoRecoveryReason || 'assignment recovery');
        if (released.taskId) {
          const task = state.tasks[released.taskId];
          if (task) task.statusNote = noteFor(task);
        }
        for (const messageId of released.messageIds || []) {
          const semantic = state.messages.find((entry) => entry.id === messageId);
          if (semantic) semantic.lastDeferredReason = noteFor(semantic);
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
      });
    }));
  }

  return false;
});


// C6 v2 cancellation/recovery overlay. The legacy handlers above remain the
// v1 branch; this boundary is selected from the durable state version.
const cancelWorkerDispatchC5Legacy = cancelWorkerDispatch;
function c6Module() { return globalThis.ModelFleetStateM7C6; }
function c6ReasonClass(reason) {
  if (reason === OPERATOR_CANCEL_REASON) return 'operator';
  if (String(reason || '').startsWith(AUTO_RECOVERY_REASON_PREFIX)) return 'automatic-recovery';
  return 'generic';
}
function c6ExactReceipt(worker, assignmentId, reason, tabId) {
  return Boolean(worker
    && worker.lastCancellationAssignmentId === assignmentId
    && worker.lastCancellationReason === reason
    && worker.lastCancellationTabId === tabId
    && Number(worker.lastCancellationAt) > 0);
}
function c6Journal(state, type, text, detail, at) {
  return globalThis.ModelFleetStateM7C3.appendJournal(state, type, text, detail, at);
}
function c6ApplyCancellationInState(state, workerId, assignmentId, reason, at, tabId, { allowHistoricalReceipt = false } = {}) {
  const worker = state.workers[workerId];
  if (!worker) return { result: { ok: false, code: 'worker-not-found', terminal: true, assignmentId } };
  if (allowHistoricalReceipt && c6ExactReceipt(worker, assignmentId, reason, tabId)) return { result: { ok: true, idempotent: true, released: false, assignmentId, disposition: worker.lastCancellationDisposition || 'released' } };
  const reboundWorkerId = workerIdForTabInState(state, tabId);
  if (reboundWorkerId !== workerId || worker.tabId !== tabId) return { result: { ok: false, code: 'stale-tab-rebound', terminal: true, assignmentId, tabId } };
  if (worker.currentAssignmentId && worker.currentAssignmentId !== assignmentId) return { result: { ok: false, code: 'assignment_ownership_mismatch', terminal: false, expectedAssignmentId: worker.currentAssignmentId, reportedAssignmentId: assignmentId } };
  if (!worker.currentAssignmentId) {
    if (c6ExactReceipt(worker, assignmentId, reason, tabId)) return { result: { ok: true, idempotent: true, released: false, assignmentId, disposition: worker.lastCancellationDisposition || 'released' } };
    return { result: { ok: false, code: 'stale-no-owner', terminal: true, assignmentId } };
  }
  if (worker.currentAssignmentId !== assignmentId) return { result: { ok: false, code: 'assignment_ownership_mismatch', terminal: false, expectedAssignmentId: worker.currentAssignmentId, reportedAssignmentId: assignmentId } };
  const assignment = state.assignments[assignmentId];
  if (!assignment || assignment.workerId !== workerId) return { result: { ok: false, code: 'assignment_ownership_mismatch', terminal: false, expectedAssignmentId: worker.currentAssignmentId, reportedAssignmentId: assignmentId } };
  if (assignment.phase === 'completing') return { result: { ok: false, code: 'completion-custody-protected', terminal: false, assignmentId } };
  const kind = c6ReasonClass(reason);
  let outcome;
  if (kind === 'operator') outcome = c6Module().cancelAssignment(state, { workerId, assignmentId });
  else if (kind === 'automatic-recovery') outcome = c6Module().applyAutomaticRecovery(state, { workerId, assignmentId, reason: String(reason).slice(AUTO_RECOVERY_REASON_PREFIX.length) });
  else outcome = c6Module().releaseGenericCancellation(state, { workerId, assignmentId });
  if (!outcome.result?.ok) return outcome;
  let next = outcome.state;
  const releasedWorker = next.workers[workerId];
  releasedWorker.lastCancellationAssignmentId = assignmentId;
  releasedWorker.lastCancellationAt = at;
  releasedWorker.lastCancellationReason = reason;
  releasedWorker.lastCancellationTabId = tabId;
  releasedWorker.lastCancellationDisposition = outcome.result.outcome || outcome.result.disposition || (kind === 'operator' ? 'cancelled' : 'requeued');
  let eventType = 'assignment.cancelled';
  if (kind === 'operator') eventType = 'assignment.operator_cancelled';
  else if (kind === 'automatic-recovery') eventType = outcome.result.retryScheduled ? 'assignment.recovery_queued' : 'assignment.recovery_exhausted';
  next = c6Journal(next, eventType, `${assignmentId} ${eventType.replace('assignment.', '')}`, {
    workerId, assignmentId, reason, disposition: releasedWorker.lastCancellationDisposition,
    retryScheduled: outcome.result.retryScheduled === true,
  }, at);
  replaceC3State(state, next);
  return { result: { ...outcome.result, reason, kind } };
}
async function c6HandleAssignmentCancelledV2(tabId, message) {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) return { ok: false, code: 'not-v2' };
  const workerId = workerIdForTabInState(loaded, tabId);
  if (!workerId) return { ok: false, code: 'worker-not-found', terminal: true, reportedAssignmentId: message?.assignmentId || null };
  const assignmentId = String(message?.assignmentId || '').trim();
  if (!assignmentId) return { ok: false, code: 'assignment-id-required', terminal: false };
  const reason = String(message?.reason || '');
  const at = now();
  const committed = await mutateFleet((state) => c6ApplyCancellationInState(state, workerId, assignmentId, reason, at, tabId));
  const result = committed.result || {};
  if (result.retryScheduled) setTimeout(() => schedule().catch(() => {}), 1000);
  else if (result.released || result.idempotent) schedule().catch(() => {});
  return { ...result, ok: result.ok === true, assignmentId };
}

async function cancelWorkerDispatchC6(workerId) {
  const initial = await loadFleetState();
  if (initial.version !== 2) return cancelWorkerDispatchC5Legacy(workerId);
  const worker = initial.workers[workerId];
  if (!worker) throw new Error('worker not found');
  const assignmentId = worker.currentAssignmentId;
  if (!assignmentId) throw new Error('worker has no active dispatch');
  if (initial.assignments[assignmentId]?.phase === 'completing') return { ok: false, code: 'completion-custody-protected', assignmentId, released: false, transportError: '' };
  const tabId = worker.tabId;
  if (!Number.isInteger(tabId)) return { ok: false, code: 'worker-tab-unbound', assignmentId, released: false, transportError: '' };
  const requestAt = now();
  const requested = await mutateFleet((state) => {
    const current = state.workers[workerId];
    const boundWorkerId = workerIdForTabInState(state, tabId);
    const assignment = state.assignments[assignmentId];
    if (!current || boundWorkerId !== workerId || current.tabId !== tabId) return { ok: false, code: 'stale-tab-rebound', assignmentId, tabId };
    if (current.currentAssignmentId !== assignmentId || !assignment || assignment.workerId !== workerId) return { ok: false, code: 'stale-cancel-request', assignmentId };
    if (assignment.phase === 'completing') return { ok: false, code: 'completion-custody-protected', assignmentId };
    const next = c6Journal(state, 'assignment.cancel.requested', `${workerId} operator cancel requested for ${assignmentId}`, { assignmentId, tabId }, requestAt);
    replaceC3State(state, next);
    return { ok: true };
  });
  if (!requested.result?.ok) return { ...requested.result, assignmentId, released: false, transportError: '' };
  const preSend = await mutateFleet((state) => {
    const current = state.workers[workerId];
    const boundWorkerId = workerIdForTabInState(state, tabId);
    const assignment = state.assignments[assignmentId];
    if (!current || boundWorkerId !== workerId || current.tabId !== tabId) return { ok: false, code: 'stale-tab-rebound', assignmentId, tabId };
    if (current.currentAssignmentId !== assignmentId || !assignment || assignment.workerId !== workerId) return { ok: false, code: 'stale-cancel-before-send', assignmentId };
    if (assignment.phase === 'completing') return { ok: false, code: 'completion-custody-protected', assignmentId };
    return { ok: true };
  });
  if (!preSend.result?.ok) return { ...preSend.result, assignmentId, released: false, transportError: '' };
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
  const settledAt = now();
  const settled = await mutateFleet((state) => {
    const outcome = c6ApplyCancellationInState(state, workerId, assignmentId, OPERATOR_CANCEL_REASON, settledAt, tabId, { allowHistoricalReceipt: true });
    if (transportError) {
      const next = c6Journal(state, 'assignment.cancel.transport_failed', `${workerId} local stop acknowledgement failed`, { assignmentId, tabId, error: transportError }, settledAt);
      replaceC3State(state, next);
    }
    return outcome;
  });
  const result = settled.result || {};
  if (result.released || result.idempotent) schedule().catch(() => {});
  return { ok: result.ok === true, assignmentId, released: result.released === true || result.idempotent === true, disposition: result.disposition || result.outcome || null, transportError };
}
cancelWorkerDispatch = cancelWorkerDispatchC6;


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
  markWorkerBindingStale(tabId, 'tab closed').catch(() => {});
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (!Object.prototype.hasOwnProperty.call(changeInfo, 'url') && changeInfo.status !== 'complete') return;
  updateBadge(tabId).catch(() => {});

  if (changeInfo.status === 'complete') ensureApprovalBridge(tabId).catch(() => {});
});

chrome.runtime.onInstalled.addListener(() => {
  reconcileStaleWorkerBindings('extension installed')
    .then(() => recoverRegisteredFleetBridges('extension installed'))
    .catch(() => {});
  ensureApprovalBridgesForSupportedTabs().catch(() => {});
});

chrome.runtime.onStartup.addListener(() => {
  reconcileStaleWorkerBindings('browser startup')
    .then(() => recoverRegisteredFleetBridges('browser startup'))
    .then(() => loadFleetState())
    .then((state) => startPendingChatRotations(state))
    .catch(() => {});
});

// Also run once whenever the MV3 service worker itself is loaded/reloaded.
reconcileStaleWorkerBindings('service worker load')
  .then(() => recoverRegisteredFleetBridges('service worker load'))
  .then(() => loadFleetState())
  .then((state) => startPendingChatRotations(state))
  .catch(() => {});
ensureApprovalBridgesForSupportedTabs().catch(() => {});

// C1 is an inert persistence-boundary candidate. C2+ will switch the
// existing v1 scheduler/mutator call sites to this v2 authority.
importScripts('fleet-state-model-m7-c1.js');
importScripts('fleet-state-model-m7-c2.js');
importScripts('fleet-state-model-m7-c3.js');

// C2 v2 reservation overlay. The pre-existing function remains the explicit
// C3+ legacy branch until dispatch attempt/acceptance and release are cut over.
const chooseDispatchesC3Legacy = chooseDispatches;
function adoptC2State(target, candidate) {
  for (const key of Object.keys(target)) delete target[key];
  for (const [key, value] of Object.entries(candidate)) target[key] = value;
  return target;
}

function appendC2ReservationJournal(state, dispatches, observedAt) {
  for (const dispatch of dispatches) {
    const assignment = dispatch.assignment;
    let type;
    let text;
    let detail;
    if (assignment.kind === 'message') {
      const ids = assignment.messageIds || [];
      type = ids.length > 1 ? 'message.batch_reserved' : 'message.reserved';
      text = ids.length > 1
        ? `${ids.length} messages (${ids[0]}…${ids[ids.length - 1]}) reserved for ${dispatch.workerId}`
        : `${ids[0]} reserved for ${dispatch.workerId}`;
      detail = { assignmentId: assignment.id, messageIds: ids.slice(), count: ids.length };
    } else if (assignment.kind === 'task') {
      type = 'task.reserved';
      text = `${assignment.taskId} reserved for ${dispatch.workerId}`;
      detail = { assignmentId: assignment.id };
    } else {
      type = 'control.reserved';
      text = `${assignment.controlNoticeIds?.length || 0} control notice(s) reserved for ${dispatch.workerId}`;
      detail = { assignmentId: assignment.id, controlNoticeIds: (assignment.controlNoticeIds || []).slice() };
    }
    state.journal.push({
      id: `${state.generation}:${state.journal.length + 1}:${observedAt}`,
      at: observedAt,
      type,
      text,
      detail,
    });
  }
  if (state.journal.length > MAX_JOURNAL) state.journal.splice(0, state.journal.length - MAX_JOURNAL);
}

function c2ControlFeedbackText(notices) {
  if (!notices.length) return '';
  return [
    '[MODEL FLEET CONTROL FEEDBACK]',
    `Control notices: ${notices.length}`,
    'These are scheduler/control-plane facts already in your durable worker inbox. Incorporate them while handling the current assignment; do not ask for a duplicate semantic message.',
    ...notices.flatMap((notice) => [
      `--- CONTROL ${notice.id} · ${notice.type || 'notice'}${notice.taskId ? ` · task ${notice.taskId}` : ''} ---`,
      String(notice.body || '').trim(),
      `--- END CONTROL ${notice.id} ---`,
    ]),
    '[/MODEL FLEET CONTROL FEEDBACK]',
  ].join('\n');
}

function c2PeerSummary(state, workerId, observedAt) {
  const c2 = globalThis.ModelFleetStateM7C2;
  return Object.values(state.workers)
    .filter(({ enabled, id, lifecycle, tabId }) => enabled !== false && id !== workerId && lifecycle !== 'stale' && Number.isInteger(tabId))
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
    .map((worker) => {
      const availability = c2.workerAvailability(state, worker.id, { now: observedAt });
      const label = availability === 'blocked' ? 'blocked'
        : availability === 'offline' ? 'offline'
          : availability === 'running' ? 'running'
            : availability === 'busy' ? 'waiting' : 'idle';
      return `- ${workerIdentityLabel(state, worker)} (${label})`;
    })
    .join('\n') || '- no other registered workers';
}

function buildTaskPromptV2(state, inputs, observedAt) {
  const task = inputs.task;
  const worker = inputs.worker;
  const taskContract = ROLE_CATALOG.find((role) => role.id === canonicalRole(task.role)) || ROLE_CATALOG[0];
  const workerContract = ROLE_CATALOG.find((role) => role.id === canonicalRole(worker.role)) || ROLE_CATALOG[0];
  const separationNote = canonicalRole(task.role) === 'coordinator'
    ? 'Coordinator control loop only: decompose, route, observe, replan, and escalate. Do not perform specialist implementation, review, test, architecture, research, or integration work yourself.'
    : 'Do not claim authority beyond this contract or verify work you completed yourself.';
  return [
    '[MODEL FLEET ASSIGNMENT]', `Worker: ${worker.id}`, `Role: ${worker.role}`,
    `Requested task role: ${task.role}`, `Requested task contract purpose: ${taskContract.purpose}`,
    `Registered worker authority scope: ${workerContract.authorityScope}`,
    `Registered worker claim types: ${workerContract.claimTypes.join(', ')}`,
    `Registered worker prohibited actions: ${workerContract.prohibitedActions.join('; ')}`,
    `Registered worker allowed handoffs: ${workerContract.allowedHandoffs.join(', ')}`,
    `Independent verification required: ${taskContract.requiresIndependentVerification ? 'yes' : 'no'}`,
    `Separation of duty: ${separationNote}`, `Task: ${task.id} — ${task.title}`,
    state.goal ? `Fleet goal: ${state.goal}` : 'Fleet goal: not set', '',
    workspaceToolInstruction(String(state.workspacePath || '').trim()), '', task.prompt, '',
    workerRoleOperatingPrompt(worker), '', c2ControlFeedbackText(inputs.controlNotices || []),
    canonicalRole(task.role) === 'coordinator' ? coordinatorProtocolText() : '', '',
    'Work independently and make concrete progress.', 'Do not wait for other workers unless the task genuinely depends on them.', '',
    'Registered peers:', c2PeerSummary(state, worker.id, observedAt), '', fleetProtocolText(),
    '[/MODEL FLEET ASSIGNMENT]',
  ].join('\n');
}

function buildMessagePromptV2(state, inputs, observedAt) {
  const worker = inputs.worker;
  const messages = inputs.messages.slice().sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
  const blocks = messages.flatMap((message) => {
    const from = message.fromWorkerId || message.from || 'operator';
    return [`--- MESSAGE ${message.id} ---`, `From: ${senderIdentityLabel(state, from)}`,
      message.taskId ? `Related task: ${message.taskId}` : 'Related task: none', '', message.body,
      `--- END MESSAGE ${message.id} ---`, ''];
  });
  return [
    '[MODEL FLEET MESSAGE]', `Recipient: ${workerIdentityLabel(state, worker)}`, `Batch size: ${messages.length}`,
    messages.length > 1 ? 'Process every message in this batch in the listed order during this single turn. Preserve each message identity and satisfy all non-conflicting instructions; do not require one ChatGPT turn per message.' : 'Process the message below during this turn.',
    '', workspaceToolInstruction(state.workspacePath), '', ...blocks, c2ControlFeedbackText(inputs.controlNotices || []),
    'Respond by acting on all messages in this batch.', '', workerRoleOperatingPrompt(worker), '',
    canonicalRole(worker.role) === 'coordinator' ? coordinatorProtocolText() : '', 'Registered peer routing targets:',
    c2PeerSummary(state, worker.id, observedAt), 'Use only these exact worker IDs for peer delivery.', '', fleetProtocolText(),
    '[/MODEL FLEET MESSAGE]',
  ].join('\n');
}

function buildControlPromptV2(state, inputs, observedAt) {
  const worker = inputs.worker;
  return [
    '[MODEL FLEET MESSAGE]', `Recipient: ${workerIdentityLabel(state, worker)}`, 'Batch size: 0 semantic messages', '',
    workspaceToolInstruction(state.workspacePath), '', c2ControlFeedbackText(inputs.controlNotices || []), '',
    'Act on the control feedback now. This control-plane inbox is separate from semantic peer traffic.', '',
    workerRoleOperatingPrompt(worker), '', canonicalRole(worker.role) === 'coordinator' ? coordinatorProtocolText() : '',
    '', 'Registered peer routing targets:', c2PeerSummary(state, worker.id, observedAt), '', fleetProtocolText(),
    '[/MODEL FLEET MESSAGE]',
  ].join('\n');
}

chooseDispatches = function chooseDispatchesC2Candidate(state) {
  if (state?.version !== 2) return chooseDispatchesC3Legacy(state);
  const c2 = globalThis.ModelFleetStateM7C2;
  if (!c2) throw new Error('M7 C2 reservation boundary unavailable');
  const observedAt = now();
  const result = c2.chooseDispatchesV2(state, {
    now: observedAt,
    promptBuilders: {
      task: (inputs, promptState) => buildTaskPromptV2(promptState, inputs, observedAt),
      message: (inputs, promptState) => buildMessagePromptV2(promptState, inputs, observedAt),
      control: (inputs, promptState) => buildControlPromptV2(promptState, inputs, observedAt),
    },
  });
  adoptC2State(state, result.state);
  appendC2ReservationJournal(state, result.dispatches, observedAt);
  return result.dispatches;
};

// C2 v2 scheduling bypasses the v1 status/busy preflight. C3+ retains the
// original scheduler for v1 candidates until the remaining authority families
// are cut over.
const scheduleC3Legacy = schedule;
schedule = async function scheduleC2Candidate() {
  const preview = await loadFleetState();
  if (preview.version !== 2) return scheduleC3Legacy();
  if (fleetBridgeRecoveryPromise) {
    schedulePending = true;
    return;
  }
  if (scheduling) {
    schedulePending = true;
    return;
  }
  scheduling = true;
  try {
    await mutateFleet((state) => chooseDispatches(state));
  } finally {
    scheduling = false;
    if (schedulePending) {
      schedulePending = false;
      queueMicrotask(() => schedule().catch(() => {}));
    }
  }
};

// C3 v2 dispatch transport overlay. Later C4 slices own heartbeat, recovery,
// completion, cancellation, and flush; this boundary stops at acceptance.
const scheduleC2ReservationOnly = schedule;
function replaceC3State(target, candidate) {
  for (const key of Object.keys(target)) delete target[key];
  Object.assign(target, candidate);
}
async function dispatchReservedC3Candidate(dispatch) {
  const c3 = globalThis.ModelFleetStateM7C3;
  const attemptedAt = now();
  try {
    await mutateFleet((state) => {
      const authorization = c3.authorizeDispatch(state, dispatch);
      if (!authorization.ok) throw new Error(`M7 C3 ${authorization.reason}`);
      let next = c3.recordDispatchAttempt(state, { workerId: dispatch.workerId, assignmentId: dispatch.assignment.id, attemptedAt });
      next = c3.appendJournal(next, 'dispatch.attempt', `${dispatch.assignment.id} → ${dispatch.workerId}`, { workerId: dispatch.workerId, tabId: dispatch.tabId, kind: dispatch.assignment.kind }, attemptedAt);
      replaceC3State(state, next);
    });
    await clearWarmIdleAlarm(dispatch.workerId);
    const pageActivity = await readFleetPageActivity(dispatch.tabId);
    if (pageActivity.busy) {
      const deferredAt = now();
      await mutateFleet((state) => {
        const deferC3 = c3['defer' + 'ReservedDispatchForActivePage'];
        const deferInput = { workerId: dispatch.workerId, assignmentId: dispatch.assignment.id, deferredAt };
        deferInput['page' + 'BusyUntil'] = deferredAt + FLEET_PAGE_BUSY_RECHECK_MS;
        let next = deferC3(state, deferInput);
        next = c3.appendJournal(next, 'dispatch.deferred_active_turn', `${dispatch.workerId} still has an active ChatGPT turn; ${dispatch.assignment.id} was not sent`, { assignmentId: dispatch.assignment.id, tabId: dispatch.tabId }, deferredAt);
        replaceC3State(state, next);
      });
      setTimeout(() => schedule().catch(() => {}), FLEET_PAGE_BUSY_RECHECK_MS);
      return;
    }
    const wakeState = await loadFleetState();
    const wakeAuthorization = c3.authorizeDispatch(wakeState, dispatch);
    if (!wakeAuthorization.ok) throw new Error(`M7 C3 stale-before-wake: ${wakeAuthorization.reason}`);
    if (wakeState.policy.activeWorkerWindows) {
      const stable = await ensureWorkerWindow(dispatch.workerId);
      const wakeAt = now();
      await mutateFleet((state) => {
        const authorization = c3.authorizeDispatch(state, dispatch);
        if (!authorization.ok) throw new Error(`M7 C3 stale-during-wake: ${authorization.reason}`);
        let next = c3.appendJournal(state, 'worker.wake', `${dispatch.workerId} activated in persistent window ${stable.windowId} for ${dispatch.assignment.id}`, { assignmentId: dispatch.assignment.id, windowId: stable.windowId }, wakeAt);
        next.workers[dispatch.workerId].windowId = stable.windowId;
        next.workers[dispatch.workerId].activeWindowId = stable.windowId;
        replaceC3State(state, next);
      });
      await chrome.tabs.update(dispatch.tabId, { active: true });
    }
    await waitForTabReady(dispatch.tabId);
    await ensureFleetBridgeAfterWake(dispatch.tabId);
    const sendState = await loadFleetState();
    const sendAuthorization = c3.authorizeDispatch(sendState, dispatch);
    if (!sendAuthorization.ok) throw new Error(`M7 C3 stale-before-send: ${sendAuthorization.reason}`);
    const response = await Promise.race([
      chrome.tabs.sendMessage(dispatch.tabId, { type: 'fleet:execute-assignment', assignment: dispatch.assignment }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('worker dispatch acknowledgement timeout')), 10000)),
    ]);
    if (!response?.ok) throw new Error(response?.error || 'worker rejected assignment');
    const acceptedAt = now();
    await mutateFleet((state) => {
      const authorization = c3.authorizeDispatch(state, dispatch);
      if (!authorization.ok) throw new Error(`M7 C3 stale acknowledgement: ${authorization.reason}`);
      let next = c3.acceptDispatch(state, { workerId: dispatch.workerId, assignmentId: dispatch.assignment.id, acceptedAt });
      const worker = next.workers[dispatch.workerId];
      worker.lastDispatchError = '';
      worker.dispatchFailureCount = 0;
      worker.lastDispatchFailureAt = 0;
      if (worker.lastCountedAssignmentId !== dispatch.assignment.id) {
        worker.lastCountedAssignmentId = dispatch.assignment.id;
        worker.chatTurnCount = Math.max(0, Math.trunc(Number(worker.chatTurnCount || 0))) + 1;
        const limit = maxTurnsPerChatForRole(next.topology, worker.role);
        if (worker.chatTurnCount >= limit) {
          worker['chat' + 'RotationPending'] = true;
          next = c3.appendJournal(next, 'worker.chat_limit_reached', `${dispatch.workerId} reached ${worker.chatTurnCount}/${limit} turns`, { assignmentId: dispatch.assignment.id, turns: worker.chatTurnCount, limit }, acceptedAt);
        }
      }
      next = c3.appendJournal(next, 'dispatch.accepted', `${dispatch.assignment.id} accepted by ${dispatch.workerId}`, { workerId: dispatch.workerId, tabId: dispatch.tabId }, acceptedAt);
      if (dispatch.assignment.kind === 'message') {
        const ids = dispatch.assignment.messageIds || [];
        const text = ids.length > 1 ? `${ids.length} messages (${ids[0]}…${ids[ids.length - 1]}) sent to ${dispatch.workerId}` : `${ids[0]} sent to ${dispatch.workerId}`;
        next = c3.appendJournal(next, ids.length > 1 ? 'message.batch_sent' : 'message.sent', text, { assignmentId: dispatch.assignment.id, messageIds: ids, count: ids.length }, acceptedAt);
      } else if (dispatch.assignment.kind === 'task') {
        next = c3.appendJournal(next, 'task.started', `${dispatch.assignment.taskId} started by ${dispatch.workerId}`, { assignmentId: dispatch.assignment.id }, acceptedAt);
      } else {
        next = c3.appendJournal(next, 'control.started', `${dispatch.assignment.controlNoticeIds?.length || 0} control notice(s) started by ${dispatch.workerId}`, { assignmentId: dispatch.assignment.id, controlNoticeIds: dispatch.assignment.controlNoticeIds || [] }, acceptedAt);
      }
      replaceC3State(state, next);
    });
  } catch (error) {
    const failureAt = now();
    await mutateFleet((state) => {
      const durableWorker = state.workers[dispatch.workerId];
      const durableAssignment = state.assignments[dispatch.assignment.id];
      if (!durableWorker || !durableAssignment || durableWorker.currentAssignmentId !== dispatch.assignment.id || durableAssignment.workerId !== dispatch.workerId) {
        return;
      }
      if (durableAssignment.phase !== 'reserved') {
        return;
      }
      if (durableAssignment.dispatchAttemptAt === 0) {
        const rolledBack = c3.rollbackReservedDispatch(state, { workerId: dispatch.workerId, assignmentId: dispatch.assignment.id });
        if (!rolledBack.result.stale) replaceC3State(state, rolledBack.state);
        return;
      }
      const diagnosticError = String(error);
      const typedFaultSource = error && typeof error.message === 'string' ? error.message : (typeof error === 'string' ? error : '');
      const typedFaultMessage = String(typedFaultSource || 'dispatch failed').slice(0, 2000);
      const result = c3.composeDispatchFailure(state, { workerId: dispatch.workerId, assignmentId: dispatch.assignment.id, at: failureAt, message: typedFaultMessage });
      if (result.result.stale) return;
      const worker = result.state.workers[dispatch.workerId];
      if (worker) {
        worker.lastDispatchError = diagnosticError;
        worker.dispatchFailureCount = Math.max(0, Math.trunc(Number(worker.dispatchFailureCount || 0))) + 1;
        worker.lastDispatchFailureAt = failureAt;
        if (result.result.lifecycleIntent) {
          worker['life' + 'cycle'] = result.result.lifecycleIntent.lifecycle;
          worker['warm' + 'IdleSince'] = result.result.lifecycleIntent.warmIdleSince;
          worker['warm' + 'IdleUntil'] = result.result.lifecycleIntent.warmIdleUntil;
        }
      }
      if (dispatch.assignment.kind === 'task' && result.state.tasks[dispatch.assignment.taskId]) result.state.tasks[dispatch.assignment.taskId].statusNote = `dispatch failed on ${dispatch.workerId}: ${diagnosticError}`;
      for (const id of dispatch.assignment.messageIds || []) {
        const message = result.state.messages.find((candidate) => candidate.id === id);
        if (message) {
          message.lastDispatchError = diagnosticError;
          message.dispatchFailureCount = Math.max(0, Math.trunc(Number(message.dispatchFailureCount || 0))) + 1;
          message.lastDeferredReason = `target worker blocked after dispatch failure: ${diagnosticError}`;
        }
      }
      const detail = { error: diagnosticError, workerBlocked: result.result.workerBlocked, messageIds: dispatch.assignment.messageIds || [] };
      replaceC3State(state, c3.appendJournal(result.state, 'dispatch.failed', `${dispatch.assignment.id} failed: ${diagnosticError}`, detail, failureAt));
    });
  } finally {
    schedule().catch(() => {});
  }
}

const AUTOMATIC_BRIDGE_RECOVERY_COOLDOWN_MS = 15000;
let lastAutomaticBridgeRecoveryAt = 0;
function staleHeartbeatRecoveryNeededV2(state, at) {
  if (!state || state.version !== 2 || state.policy?.paused === true || state.policy?.authorityEnabled === false) return false;
  const c2 = globalThis.ModelFleetStateM7C2;
  const queuedTargets = new Set((state.messages || [])
    .filter((message) => message.phase === 'queued' && message.toWorkerId && message.toWorkerId !== 'operator')
    .map((message) => message.toWorkerId));
  return Object.values(state.workers || {}).some((worker) => {
    if (!worker?.enabled || !Number.isInteger(worker.tabId) || worker.currentAssignmentId != null) return false;
    if (worker.lifecycle === 'stale' || worker.lifecycle === 'offline') return false;
    let eligibility;
    try { eligibility = c2.schedulerWorkerEligibility(state, worker.id, { now: at }); }
    catch { return false; }
    if (eligibility.reason !== 'availability-offline') return false;
    const hasQueued = queuedTargets.has(worker.id);
    const hasControl = Array.isArray(worker.controlInbox) && worker.controlInbox.length > 0;
    const hasRunnableRoleTask = Object.values(state.tasks || {}).some((task) => {
      if (canonicalRole(task.role) !== canonicalRole(worker.role)) return false;
      try { return c2.taskRunnable(state, task, worker); } catch { return false; }
    });
    const hasGoalContinuationNeed = canonicalRole(worker.role) === 'coordinator' && Boolean(String(state.goal || '').trim());
    return hasQueued || hasControl || hasRunnableRoleTask || hasGoalContinuationNeed;
  });
}
function maybeRecoverStaleDispatchBridgesV2(state, at) {
  if (!staleHeartbeatRecoveryNeededV2(state, at)) return false;
  if (at - lastAutomaticBridgeRecoveryAt < AUTOMATIC_BRIDGE_RECOVERY_COOLDOWN_MS) return false;
  lastAutomaticBridgeRecoveryAt = at;
  recoverRegisteredFleetBridges('automatic stale-heartbeat recovery').catch((error) => {
    console.warn('[model-fleet] automatic stale-heartbeat recovery deferred', error);
  });
  return true;
}

const scheduleC3ReservationTransport = schedule;
schedule = async function scheduleC3Candidate() {
  const preview = await loadFleetState();
  if (preview.version !== 2) return scheduleC3ReservationTransport();
  if (fleetBridgeRecoveryPromise || scheduling) { schedulePending = true; return; }
  scheduling = true;
  let dispatches = [];
  let recoveryState = null;
  try {
    const committed = await mutateFleet((state) => {
      const dispatches = chooseDispatches(state);
      const continuation = dispatches.length ? null : queueGoalContinuationV2(state, now());
      return { dispatches, continuationQueued: Boolean(continuation) };
    });
    dispatches = Array.isArray(committed.result?.dispatches) ? committed.result.dispatches : [];
    recoveryState = committed.state;
    if (committed.result?.continuationQueued) schedulePending = true;
  } finally {
    scheduling = false;
    if (schedulePending) { schedulePending = false; queueMicrotask(() => schedule().catch(() => {})); }
  }
  if (!dispatches.length && recoveryState) maybeRecoverStaleDispatchBridgesV2(recoveryState, now());
  for (const dispatch of dispatches) dispatchReservedC3Candidate(dispatch).catch(() => {});
};

// C4 v2 heartbeat/bridge overlay. Completion, cancellation, flush/stop, and
// public projection remain later bounded slices.
importScripts('fleet-state-model-m7-c4.js');
const flushWorkerHeartbeatsC3Legacy = flushWorkerHeartbeats;
const updateWorkerHeartbeatC3Legacy = updateWorkerHeartbeat;
const reconcileOnHelloC3Legacy = reconcileOnHello;
const recoverRegisteredWorkerBridgeC3Legacy = recoverRegisteredWorkerBridge;
const DEAD_ORPHAN_TURN_RECOVERY_MAX_ATTEMPTS = 1;
const deadOrphanTurnRecoveryPromises = new Map();

async function recoverDeadOrphanTurnV2(workerId) {
  if (deadOrphanTurnRecoveryPromises.has(workerId)) return deadOrphanTurnRecoveryPromises.get(workerId);
  const operation = (async () => {
    const claimedAt = now();
    const claimed = await mutateFleet((state) => {
      if (state.version !== 2) return null;
      const worker = state.workers[workerId];
      if (!worker?.enabled || !Number.isInteger(worker.tabId) || worker.currentAssignmentId != null) return null;
      const runtime = worker.runtime || {};
      const attempts = Math.max(0, Math.trunc(Number(runtime.turnRecoveryAttempts || 0)));
      if (runtime.busy !== true || runtime.turnHealth !== 'dead' || attempts >= DEAD_ORPHAN_TURN_RECOVERY_MAX_ATTEMPTS) return null;
      let next = globalThis.ModelFleetStateM7C3.appendJournal(state, 'worker.dead_turn_recovery_started', `${workerId} automatic DEAD orphan turn recovery started`, {
        workerId,
        tabId: worker.tabId,
        attempt: attempts + 1,
        turnBusySince: Number(runtime.turnBusySince || 0),
        turnLastProgressAt: Number(runtime.turnLastProgressAt || 0),
      }, claimedAt);
      const target = next.workers[workerId];
      target.runtime.turnRecoveryAttempts = attempts + 1;
      target.runtime.turnRecoveryAt = claimedAt;
      target.runtime.turnRecoveryBusySince = Number(runtime.turnBusySince || 0);
      replaceC3State(state, next);
      return { tabId: target.tabId, attempt: attempts + 1, turnBusySince: target.runtime.turnRecoveryBusySince };
    });
    if (!claimed.result) return { workerId, recovered: false, skipped: true };
    const { tabId, attempt, turnBusySince } = claimed.result;
    try {
      await chrome.tabs.reload(tabId);
      await waitForTabReady(tabId);
      const bridgeRecovery = await recoverRegisteredWorkerBridge(workerId, 'dead-turn automatic recovery');
      const settledAt = now();
      const settled = await mutateFleet((state) => {
        const worker = state.workers[workerId];
        let next = globalThis.ModelFleetStateM7C3.appendJournal(state, 'worker.dead_turn_recovery_reloaded', `${workerId} DEAD orphan turn tab reloaded`, {
          workerId,
          tabId,
          attempt,
          turnBusySince,
          bridgeRecovered: bridgeRecovery?.recovered === true,
        }, settledAt);
        const current = next.workers[workerId];
        const idle = !!current && current.currentAssignmentId == null && current.runtime?.busy === false;
        if (idle) {
          next.lastGoalContinuationKey = '';
          next = globalThis.ModelFleetStateM7C3.appendJournal(next, 'worker.dead_turn_recovery_ready', `${workerId} recovered idle; Coordinator reconciliation enabled`, { workerId, tabId, attempt }, settledAt);
        }
        replaceC3State(state, next);
        return { idle };
      });
      if (settled.result?.idle) schedule().catch(() => {});
      return { workerId, recovered: true, idle: settled.result?.idle === true, attempt };
    } catch (error) {
      const failedAt = now();
      await mutateFleet((state) => {
        if (!state.workers[workerId]) return null;
        const next = globalThis.ModelFleetStateM7C3.appendJournal(state, 'worker.dead_turn_recovery_failed', `${workerId} automatic DEAD orphan turn recovery failed`, { workerId, tabId, attempt, error: String(error) }, failedAt);
        replaceC3State(state, next);
        return { failed: true };
      }).catch(() => {});
      return { workerId, recovered: false, failed: true, attempt, error: String(error) };
    }
  })();
  deadOrphanTurnRecoveryPromises.set(workerId, operation);
  try {
    return await operation;
  } finally {
    deadOrphanTurnRecoveryPromises.delete(workerId);
  }
}

function c4HeartbeatObservation(workerId, heartbeat) {
  const hasAssignmentIdentity = Object.prototype.hasOwnProperty.call(heartbeat, 'activeAssignmentId');
  const observation = {
    workerId,
    observedAt: heartbeat.at,
    busy: heartbeat.busy === true,
    hasAssignmentIdentity,
  };
  if (hasAssignmentIdentity) observation.reportedAssignmentId = heartbeat.activeAssignmentId;
  for (const key of ['title', 'url', 'windowId', 'turnHealth', 'turnBusySince', 'turnLastProgressAt', 'turnStalledSince', 'turnInterruptionKey']) if (Object.prototype.hasOwnProperty.call(heartbeat, key)) observation[key] = heartbeat[key];
  return observation;
}
flushWorkerHeartbeats = async function flushWorkerHeartbeatsC4() {
  const preview = await loadFleetState();
  if (preview.version !== 2) return flushWorkerHeartbeatsC3Legacy();
  if (heartbeatFlushPromise) return heartbeatFlushPromise;
  const batch = new Map(liveHeartbeats);
  if (!batch.size) return { scheduleNeeded: false };
  const operation = (async () => {
    let scheduleNeeded = false;
    const committed = await mutateFleet((state) => {
      let next = state;
      for (const [workerId, heartbeat] of batch) {
        if (!next.workers[workerId]) continue;
        const before = next.workers[workerId];
        const result = globalThis.ModelFleetStateM7C4.processHeartbeat(next, c4HeartbeatObservation(workerId, heartbeat));
        next = result.state;
        const after = next.workers[workerId];
        const beforeTurnHealth = before.runtime.turnHealth || (before.runtime.busy ? 'busy' : 'idle');
        const afterTurnHealth = after.runtime.turnHealth || (after.runtime.busy ? 'busy' : 'idle');
        if (beforeTurnHealth !== afterTurnHealth && ['stalled', 'dead'].includes(afterTurnHealth)) {
          const type = afterTurnHealth === 'dead' ? 'worker.turn_dead' : 'worker.turn_stalled';
          const text = afterTurnHealth === 'dead'
            ? workerId + ' ChatGPT turn has no page progress; resend/recovery required'
            : workerId + ' ChatGPT turn has stopped making page progress';
          next = globalThis.ModelFleetStateM7C3.appendJournal(next, type, text, {
            workerId,
            turnHealth: afterTurnHealth,
            turnBusySince: Number(after.runtime.turnBusySince || 0),
            turnLastProgressAt: Number(after.runtime.turnLastProgressAt || 0),
            turnStalledSince: Number(after.runtime.turnStalledSince || 0),
          }, heartbeat.at);
        }
        const unownedTurnQuiesced = before.runtime.busy === true
          && after?.runtime.busy === false
          && before.currentAssignmentId == null
          && after.currentAssignmentId == null;
        const interruptionKey = String(after?.runtime?.turnInterruptionKey || '');
        const handledInterruptionKey = String(after?.runtime?.turnInterruptionHandledKey || '');
        const unownedTurnInterrupted = afterTurnHealth === 'interrupted'
          && after?.runtime.busy === false
          && before.currentAssignmentId == null
          && after.currentAssignmentId == null
          && interruptionKey
          && interruptionKey !== handledInterruptionKey;
        if (unownedTurnQuiesced || unownedTurnInterrupted) {
          next.lastGoalContinuationKey = '';
          if (unownedTurnInterrupted) next.workers[workerId].runtime.turnInterruptionHandledKey = interruptionKey;
          next = globalThis.ModelFleetStateM7C3.appendJournal(
            next,
            unownedTurnInterrupted ? 'worker.unowned_turn_interrupted' : 'worker.unowned_turn_quiesced',
            unownedTurnInterrupted
              ? `${workerId} ChatGPT turn ended without a live Stop control; Coordinator reconciliation re-armed`
              : `${workerId} unowned ChatGPT turn became idle; goal continuation dedupe reset`,
            { workerId, turnHealth: afterTurnHealth, interruptionKey: unownedTurnInterrupted ? interruptionKey : '' },
            heartbeat.at,
          );
        }
        scheduleNeeded = scheduleNeeded || result.result.scheduleNeeded === true || unownedTurnQuiesced || unownedTurnInterrupted;
      }
      replaceC3State(state, next);
      return { scheduleNeeded };
    });
    for (const [workerId, heartbeat] of batch) {
      const current = liveHeartbeats.get(workerId);
      if (current && current.at <= heartbeat.at) liveHeartbeats.delete(workerId);
    }
    const deadRecoveryCandidates = Object.values(committed.state.workers || {})
      .filter((worker) => worker?.enabled
        && Number.isInteger(worker.tabId)
        && worker.currentAssignmentId == null
        && worker.runtime?.busy === true
        && worker.runtime?.turnHealth === 'dead'
        && Math.max(0, Math.trunc(Number(worker.runtime?.turnRecoveryAttempts || 0))) < DEAD_ORPHAN_TURN_RECOVERY_MAX_ATTEMPTS)
      .map((worker) => worker.id);
    for (const workerId of deadRecoveryCandidates) {
      recoverDeadOrphanTurnV2(workerId).catch((error) => console.warn('[model-fleet] DEAD orphan turn recovery deferred', workerId, error));
    }
    lastHeartbeatFlushAt = now();
    return { state: committed.state, scheduleNeeded };
  })();
  heartbeatFlushPromise = operation.finally(() => { heartbeatFlushPromise = null; });
  return heartbeatFlushPromise;
};
updateWorkerHeartbeat = async function updateWorkerHeartbeatC4(tab, payload) {
  const state = await loadFleetState();
  if (state.version !== 2) return updateWorkerHeartbeatC3Legacy(tab, payload);
  const observedAt = now();
  const workerId = workerIdForTabInState(state, tab.id);
  if (!workerId) return { observedAt, registered: false };
  liveHeartbeats.set(workerId, {
    at: observedAt,
    busy: payload.busy === true,
    title: tab.title || '',
    url: tab.url || '',
    windowId: Number.isInteger(tab.windowId) ? tab.windowId : null,
  });
  for (const key of ['turnHealth', 'turnBusySince', 'turnLastProgressAt', 'turnStalledSince', 'turnInterruptionKey']) {
    if (Object.prototype.hasOwnProperty.call(payload, key)) liveHeartbeats.get(workerId)[key] = payload[key];
  }
  if (Object.prototype.hasOwnProperty.call(payload, 'activeAssignmentId')) {
    liveHeartbeats.get(workerId).activeAssignmentId = (typeof payload.activeAssignmentId === 'string' ? payload.activeAssignmentId.trim() : '') || null;
  }
  if (observedAt - lastHeartbeatFlushAt >= HEARTBEAT_FLUSH_MS) {
    const result = await flushWorkerHeartbeats();
    if (result?.scheduleNeeded) schedule().catch(() => {});
  }
  return { observedAt, registered: true };
};
reconcileOnHello = async function reconcileOnHelloC4(tab, payload = {}) {
  const observedAt = now();
  const repairProbe = typeof c18Module === 'function'
    ? await c18Module().probeV2WorkerBindingForTab(chrome.storage.local, tab.id)
    : null;
  const repairEvidence = repairProbe ? {
    ...repairProbe,
    observedAt,
    hasAssignmentIdentity: Object.prototype.hasOwnProperty.call(payload, 'activeAssignmentId'),
    reportedAssignmentId: Object.prototype.hasOwnProperty.call(payload, 'activeAssignmentId')
      ? ((typeof payload.activeAssignmentId === 'string' ? payload.activeAssignmentId.trim() : '') || null)
      : undefined,
  } : null;
  const loaded = await loadFleetState(repairEvidence ? { repairEvidence } : undefined);
  if (loaded.version !== 2) return reconcileOnHelloC3Legacy(tab, payload);
  const workerId = workerIdForTabInState(loaded, tab.id);
  if (!workerId) return { registered: false, worker: null };
  const hasAssignmentIdentity = Object.prototype.hasOwnProperty.call(payload, 'activeAssignmentId');
  let scheduleAfterRecovery = false;
  const committed = await mutateFleet((state) => {
    const recoveryInput = {
      workerId,
      observedAt,
      hasAssignmentIdentity,
      reattached: false,
      promptProof: false,
      pendingCompletionProof: false,
    };
    if (hasAssignmentIdentity) recoveryInput.reportedAssignmentId = (typeof payload.activeAssignmentId === 'string' ? payload.activeAssignmentId.trim() : '') || null;
    if (Object.prototype.hasOwnProperty.call(payload, 'busy')) recoveryInput.busy = payload.busy;
    for (const key of ['turnHealth', 'turnBusySince', 'turnLastProgressAt', 'turnStalledSince', 'turnInterruptionKey']) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) recoveryInput[key] = payload[key];
    }
    const result = globalThis.ModelFleetStateM7C4.reconcileRecoveryCustody(state, recoveryInput);
    let next = result.state;
    if (result.result.ok === true && ['reattached-running', 'reattached', 'completion-reattached', 'no-owner'].includes(result.result.outcome)) {
      const cleared = globalThis.ModelFleetStateM7C4.clearFaultWithEvidence(next, workerId, {
        success: true,
        kind: 'm4-recovery',
        workerId,
        at: observedAt,
        recoveryInput,
        result: result.result,
      });
      scheduleAfterRecovery = cleared.result.cleared === true;
      next = cleared.state;
    }
    const interruptionKey = String(next.workers[workerId]?.runtime?.turnInterruptionKey || '');
    const handledInterruptionKey = String(next.workers[workerId]?.runtime?.turnInterruptionHandledKey || '');
    const interruptedNoOwner = result.result.ok === true
      && result.result.outcome === 'no-owner'
      && payload.busy === false
      && payload.turnHealth === 'interrupted'
      && interruptionKey
      && interruptionKey !== handledInterruptionKey;
    if (interruptedNoOwner) {
      next.lastGoalContinuationKey = '';
      next.workers[workerId].runtime.turnInterruptionHandledKey = interruptionKey;
      next = globalThis.ModelFleetStateM7C3.appendJournal(next, 'worker.unowned_turn_interrupted', `${workerId} hello observed an interrupted unowned ChatGPT turn; Coordinator reconciliation re-armed`, { workerId, turnHealth: 'interrupted', interruptionKey }, observedAt);
      scheduleAfterRecovery = true;
    }
    const worker = next.workers[workerId];
    worker.title = tab.title || worker.title;
    worker.url = tab.url || worker.url;
    if (Number.isInteger(tab.windowId)) worker.windowId = tab.windowId;
    replaceC3State(state, next);
    return result.result;
  }, repairEvidence ? { repairEvidence } : undefined);
  const buffered = liveHeartbeats.get(workerId);
  if (buffered && buffered.at <= observedAt) liveHeartbeats.delete(workerId);
  if (scheduleAfterRecovery) schedule().catch(() => {});
  return { registered: true, worker: committed.state.workers[workerId], recovery: committed.result };
};
recoverRegisteredWorkerBridge = async function recoverRegisteredWorkerBridgeC4(workerId, reason = 'extension context recovery') {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) return recoverRegisteredWorkerBridgeC3Legacy(workerId, reason);
  const worker = loaded.workers[workerId];
  if (!worker?.enabled || !Number.isInteger(worker.tabId)) return { workerId, recovered: false, skipped: true };
  const tab = await supportedTab(worker.tabId);
  if (!tab) return { workerId, recovered: false, stale: true };
  const assignment = globalThis.ModelFleetStateM7C4.recoveryPayloadV2(loaded, worker.currentAssignmentId);
  const assignmentRecord = assignment.assignment;
  let scheduleAfterBridgeRecovery = false;
  await setFleetRecoveryHint(worker.tabId, assignmentRecord?.id || null);
  try {
    const bridge = await ensureFleetBridge(worker.tabId);
    let response = {
      ok: true,
      assignmentId: assignmentRecord?.id || null,
      reattached: false,
      busy: bridge?.busy === true,
      turnHealth: bridge?.turnHealth,
      turnBusySince: bridge?.turnBusySince,
      turnLastProgressAt: bridge?.turnLastProgressAt,
      turnStalledSince: bridge?.turnStalledSince,
      turnInterruptionKey: bridge?.turnInterruptionKey,
    };
    if (assignmentRecord) {
      let prompt = '';
      if (assignmentRecord.kind === 'task') prompt = buildTaskPromptV2(loaded, assignment.promptInputs, now());
      else if (assignmentRecord.kind === 'message') prompt = buildMessagePromptV2(loaded, assignment.promptInputs, now());
      else prompt = buildControlPromptV2(loaded, assignment.promptInputs, now());
      response = await chrome.tabs.sendMessage(worker.tabId, { type: 'fleet:recover-assignment', assignment: { ...assignmentRecord, prompt } });
    }
    const observedAt = now();
    const result = await mutateFleet((state) => {
      const recoveryInput = {
        workerId,
        observedAt,
        hasAssignmentIdentity: !!assignmentRecord,
        reattached: response.reattached === true,
        promptProof: response.alreadyActive === true || response.streaming === true || response.promptObserved === true,
        pendingCompletionProof: response.recoveringCompletion === true,
        unrecoverable: response.ok !== true || response.unrecoverable === true,
      };
      if (assignmentRecord) recoveryInput.reportedAssignmentId = typeof response.assignmentId === 'string' ? response.assignmentId : null;
      if (Object.prototype.hasOwnProperty.call(response, 'busy')) recoveryInput.busy = response.busy;
      for (const key of ['turnHealth', 'turnBusySince', 'turnLastProgressAt', 'turnStalledSince', 'turnInterruptionKey']) {
        if (response[key] !== undefined) recoveryInput[key] = response[key];
      }
      const outcome = globalThis.ModelFleetStateM7C4.reconcileRecoveryCustody(state, recoveryInput);
      let next = outcome.state;
      if (outcome.result.ok === true && ['reattached-running', 'reattached', 'completion-reattached', 'no-owner'].includes(outcome.result.outcome)) {
        const cleared = globalThis.ModelFleetStateM7C4.clearFaultWithEvidence(next, workerId, {
          success: true,
          kind: 'm4-recovery',
          workerId,
          at: observedAt,
          recoveryInput,
          result: outcome.result,
        });
        next = cleared.state;
      }
      const interruptionKey = String(next.workers[workerId]?.runtime?.turnInterruptionKey || '');
      const handledInterruptionKey = String(next.workers[workerId]?.runtime?.turnInterruptionHandledKey || '');
      const interruptedNoOwner = outcome.result.ok === true
        && outcome.result.outcome === 'no-owner'
        && response.busy === false
        && response.turnHealth === 'interrupted'
        && interruptionKey
        && interruptionKey !== handledInterruptionKey;
      if (interruptedNoOwner) {
        next.lastGoalContinuationKey = '';
        next.workers[workerId].runtime.turnInterruptionHandledKey = interruptionKey;
        next = globalThis.ModelFleetStateM7C3.appendJournal(next, 'worker.unowned_turn_interrupted', `${workerId} bridge recovered an interrupted unowned ChatGPT turn; Coordinator reconciliation re-armed`, { workerId, turnHealth: 'interrupted', interruptionKey }, observedAt);
        scheduleAfterBridgeRecovery = true;
      }
      next = globalThis.ModelFleetStateM7C3.appendJournal(next, 'worker.bridge_recovered', `${workerId} bridge recovery reconciled`, { assignmentId: assignmentRecord?.id || null, outcome: outcome.result.outcome || outcome.result.code || null }, observedAt);
      replaceC3State(state, next);
      return outcome.result;
    });
    if (['reattached-running', 'reattached', 'completion-reattached', 'no-owner', 'unrecoverable-released'].includes(result.result.outcome)) await setFleetRecoveryHint(worker.tabId, null);
    if (scheduleAfterBridgeRecovery) schedule().catch(() => {});
    return { workerId, recovered: result.result.ok === true, assignmentId: assignmentRecord?.id || null, recovery: result.result };
  } catch (error) {
    const fresh = await loadFleetState().catch(() => null);
    const current = fresh?.workers?.[workerId];
    const originalId = assignmentRecord?.id || null;
    if (!current) return { workerId, recovered: false, stale: true, error: String(error) };
    if (originalId == null && current.currentAssignmentId == null) {
      await setFleetRecoveryHint(worker.tabId, null).catch(() => {});
      return { workerId, recovered: false, stale: true, error: String(error) };
    }
    if (current.currentAssignmentId !== originalId) return { workerId, recovered: false, stale: true, error: String(error) };
    const currentAssignment = fresh.assignments[originalId];
    if (!currentAssignment || currentAssignment.phase === 'completing') return { workerId, recovered: false, stale: currentAssignment?.phase !== 'completing', error: String(error) };
    const released = await mutateFleet((state) => {
      const outcome = globalThis.ModelFleetStateM7C4.reconcileRecoveryCustody(state, { workerId, observedAt: now(), hasAssignmentIdentity: false, unrecoverable: true });
      let next = globalThis.ModelFleetStateM7C3.appendJournal(outcome.state, 'assignment.bridge_recovery_failed', `${originalId} bridge recovery failed`, { workerId, reason: String(error) }, now());
      replaceC3State(state, next);
      return outcome.result;
    }).catch(() => null);
    if (released?.result?.outcome === 'unrecoverable-released' || released?.outcome === 'unrecoverable-released') await setFleetRecoveryHint(worker.tabId, null).catch(() => {});
    return { workerId, recovered: false, released: !!released, error: String(error) };
  }
};

// C5 v2 completion overlay. Result routing, terminal disposition, and
// custody acknowledgement are intentionally kept after the C4 boundary.
importScripts('fleet-state-model-m7-c5.js');
importScripts('fleet-state-model-m7-c6.js');
importScripts('fleet-state-model-m7-c7.js');
importScripts('fleet-state-model-m7-c8.js');
importScripts('fleet-state-model-m7-c9.js');
const stopAndFlushStaleWorkC6Legacy = stopAndFlushStaleWork;
const C7_STOP_TRANSPORT_TIMEOUT_MS = 10000;
function c7Module() { return globalThis.ModelFleetStateM7C7; }
async function c7RecordTransportWarning(result, warning) {
  result.transportWarnings.push(warning);
  try {
    await mutateFleet((state) => {
      const next = globalThis.ModelFleetStateM7C3.appendJournal(state, 'assignment.flush.transport_failed', `${warning.assignmentId} stale stop transport warning`, warning, now());
      replaceC3State(state, next);
    });
  } catch (error) {
    result.transportWarnings.push({ ...warning, stage: 'diagnostic-journal', error: String(error) });
  }
}
async function c7SendStopWithTimeout(tabId, payload) {
  let timer;
  try {
    return await Promise.race([
      chrome.tabs.sendMessage(tabId, payload),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('stale stop transport timeout')), C7_STOP_TRANSPORT_TIMEOUT_MS); }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
async function stopAndFlushStaleWorkC7() {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) return stopAndFlushStaleWorkC6Legacy();
  const stopAt = now();
  const committed = await mutateFleet((state) => {
    const composed = c7Module().composeStopAndFlushV2(state, { at: stopAt });
    replaceC3State(state, composed.state);
    return composed.result;
  });
  const result = { ...committed.result, transportWarnings: [] };
  for (const intent of committed.result.transportIntents || []) {
    try {
      await clearWarmIdleAlarm(intent.workerId);
    } catch (error) {
      await c7RecordTransportWarning(result, { workerId: intent.workerId, assignmentId: intent.assignmentId, tabId: intent.tabId, stage: 'warm-idle-alarm-clear', error: String(error) });
    }
    let current;
    try {
      current = await loadFleetState();
    } catch (error) {
      await c7RecordTransportWarning(result, { workerId: intent.workerId, assignmentId: intent.assignmentId, tabId: intent.tabId, stage: 'pre-send-state-read', error: String(error) });
      continue;
    }
    const worker = current.workers[intent.workerId];
    if (!current.policy.paused || !worker || worker.tabId !== intent.tabId || worker.currentAssignmentId != null) continue;
    try {
      await c7SendStopWithTimeout(intent.tabId, { type: 'fleet:cancel-current', reason: 'stale work stop', expectedAssignmentId: intent.assignmentId });
    } catch (error) {
      const stage = String(error).includes('timeout') ? 'send-timeout' : 'send-failed';
      await c7RecordTransportWarning(result, { workerId: intent.workerId, assignmentId: intent.assignmentId, tabId: intent.tabId, stage, error: String(error) });
    }
  }
  delete result.transportIntents;
  return result;
}
stopAndFlushStaleWork = stopAndFlushStaleWorkC7;
const killAuthorityC8Legacy = killAuthority;
const C8_AUTHORITY_REVOKE_TRANSPORT_TIMEOUT_MS = C7_STOP_TRANSPORT_TIMEOUT_MS;
function c8Module() { return globalThis.ModelFleetStateM7C8; }
async function c8RecordTransportWarning(result, warning) {
  result.transportWarnings.push(warning);
  try {
    await mutateFleet((state) => {
      const next = globalThis.ModelFleetStateM7C3.appendJournal(state, 'assignment.kill.transport_failed', `${warning.assignmentId} authority revoke transport warning`, warning, now());
      replaceC3State(state, next);
    });
  } catch (error) {
    result.transportWarnings.push({ ...warning, stage: 'diagnostic-journal', error: String(error) });
  }
}
async function c8SendAuthorityStopWithTimeout(tabId, payload) {
  let timer;
  try {
    return await Promise.race([
      chrome.tabs.sendMessage(tabId, payload),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('authority revoke transport timeout')), C8_AUTHORITY_REVOKE_TRANSPORT_TIMEOUT_MS); }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
async function killAuthorityC8() {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) return killAuthorityC8Legacy();
  const revokeAt = now();
  const committed = await mutateFleet((state) => {
    const composed = c8Module().composeAuthorityRevokeV2(state, { at: revokeAt });
    replaceC3State(state, composed.state);
    return composed.result;
  });
  const result = { ...committed.result, transportWarnings: [] };
  for (const intent of committed.result.transportIntents || []) {
    try {
      await clearWarmIdleAlarm(intent.workerId);
    } catch (error) {
      await c8RecordTransportWarning(result, { workerId: intent.workerId, assignmentId: intent.assignmentId, tabId: intent.tabId, stage: 'warm-idle-alarm-clear', error: String(error) });
    }
    let current;
    try {
      current = await loadFleetState();
    } catch (error) {
      await c8RecordTransportWarning(result, { workerId: intent.workerId, assignmentId: intent.assignmentId, tabId: intent.tabId, stage: 'pre-send-state-read', error: String(error) });
      continue;
    }
    const worker = current.workers[intent.workerId];
    if (current.policy.authorityEnabled !== false || current.policy.paused !== true || !worker || worker.tabId !== intent.tabId || worker.currentAssignmentId != null) continue;
    try {
      await c8SendAuthorityStopWithTimeout(intent.tabId, { type: 'fleet:cancel-current', reason: 'authority revoked', expectedAssignmentId: intent.assignmentId });
    } catch (error) {
      const stage = String(error).includes('timeout') ? 'send-timeout' : 'send-failed';
      await c8RecordTransportWarning(result, { workerId: intent.workerId, assignmentId: intent.assignmentId, tabId: intent.tabId, stage, error: String(error) });
    }
  }
  delete result.transportIntents;
  return result;
}
killAuthority = killAuthorityC8;
const markWorkerBindingStaleC9Legacy = markWorkerBindingStale;
const reconcileStaleWorkerBindingsC9Legacy = reconcileStaleWorkerBindings;
const unregisterWorkerC9Legacy = unregisterWorker;
const C9_UNREGISTER_TRANSPORT_TIMEOUT_MS = C7_STOP_TRANSPORT_TIMEOUT_MS;
function c9Module() { return globalThis.ModelFleetStateM7C9; }
async function c9BoundedCleanup(label, operation) {
  let timer;
  try {
    return await Promise.race([
      Promise.resolve().then(operation),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label}-timeout`)), C9_UNREGISTER_TRANSPORT_TIMEOUT_MS); }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
function c9CleanupWarning(stage, error, detail = {}) {
  return { ...detail, stage, error: String(error) };
}
async function c9MarkWorkerBindingStale(tabId, reason = 'tab closed') {
  if (!Number.isInteger(tabId)) return { stale: false, code: 'invalid-tab-id' };
  const loaded = await loadFleetState();
  if (loaded.version !== 2) return markWorkerBindingStaleC9Legacy(tabId, reason);
  const at = now();
  const committed = await mutateFleet((state) => {
    const workerId = workerIdForTabInState(state, tabId);
    if (!workerId) return { stale: false, code: 'worker-not-found' };
    const outcome = c9Module().releaseWorkerBindingV2(state, { workerId, expectedTabId: tabId, reason, at });
    if (outcome.result.transitioned) replaceC3State(state, outcome.state);
    return outcome.result;
  });
  if (committed.result?.transitioned) {
    const cleanupWarnings = [];
    liveHeartbeats.delete(committed.result.workerId);
    schedule().catch(() => {});
    try { await c9BoundedCleanup('warm-idle-alarm-clear', () => clearWarmIdleAlarm(committed.result.workerId)); }
    catch (error) { cleanupWarnings.push(c9CleanupWarning(String(error).includes('timeout') ? 'warm-idle-alarm-clear-timeout' : 'warm-idle-alarm-clear-failed', error, { workerId: committed.result.workerId })); }
    committed.result.cleanupWarnings = cleanupWarnings;
  }
  return committed.result;
}
async function c9ReconcileStaleWorkerBindings(reason = 'binding reconciliation') {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) return reconcileStaleWorkerBindingsC9Legacy(reason);
  const candidates = Object.values(loaded.workers).filter((worker) => worker.enabled && Number.isInteger(worker.tabId));
  const supported = await Promise.all(candidates.map(async (worker) => ({ workerId: worker.id, expectedTabId: worker.tabId, supported: Boolean(await supportedTab(worker.tabId)) })));
  const unsupported = supported.filter((item) => !item.supported);
  if (!unsupported.length) return { stale: [], protectedCompleting: [] };
  const at = now();
  const committed = await mutateFleet((state) => {
    const stale = [];
    const protectedCompleting = [];
    for (const candidate of unsupported) {
      const worker = state.workers[candidate.workerId];
      if (!worker || worker.enabled !== true || worker.tabId !== candidate.expectedTabId) continue;
      const outcome = c9Module().releaseWorkerBindingV2(state, { workerId: candidate.workerId, expectedTabId: candidate.expectedTabId, reason, at });
      if (!outcome.result.transitioned) continue;
      replaceC3State(state, outcome.state);
      stale.push(candidate.workerId);
      if (outcome.result.protectedCompleting) protectedCompleting.push(outcome.result.protectedCompleting);
    }
    return { stale, protectedCompleting };
  });
  const cleanupWarnings = [];
  schedule().catch(() => {});
  for (const workerId of committed.result.stale || []) {
    liveHeartbeats.delete(workerId);
    try { await c9BoundedCleanup('warm-idle-alarm-clear', () => clearWarmIdleAlarm(workerId)); }
    catch (error) { cleanupWarnings.push(c9CleanupWarning(String(error).includes('timeout') ? 'warm-idle-alarm-clear-timeout' : 'warm-idle-alarm-clear-failed', error, { workerId })); }
  }
  committed.result.cleanupWarnings = cleanupWarnings;
  return committed.result;
}
async function c9UnregisterWorker(workerId) {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) return unregisterWorkerC9Legacy(workerId);
  const at = now();
  const committed = await mutateFleet((state) => {
    const outcome = c9Module().unregisterWorkerV2(state, { workerId, at });
    if (outcome.result.removed) replaceC3State(state, outcome.state);
    return outcome.result;
  });
  const result = { ...committed.result, transportWarnings: committed.result?.transportWarnings || [] };
  if (!result.removed) return result;
  liveHeartbeats.delete(workerId);
  schedule().catch(() => {});
  try { await c9BoundedCleanup('warm-idle-alarm-clear', () => clearWarmIdleAlarm(workerId)); }
  catch (error) { result.transportWarnings.push(c9CleanupWarning(String(error).includes('timeout') ? 'warm-idle-alarm-clear-timeout' : 'warm-idle-alarm-clear-failed', error, { workerId })); }
  if (Number.isInteger(result.tabId)) {
    try { await c9BoundedCleanup('badge-update', () => updateBadge(result.tabId)); }
    catch (error) { result.transportWarnings.push(c9CleanupWarning(String(error).includes('timeout') ? 'badge-update-timeout' : 'badge-update-failed', error, { workerId, tabId: result.tabId })); }
  }
  if (Number.isInteger(result.tabId)) {
    let current = null;
    try { current = await c9BoundedCleanup('pre-send-state-read', () => loadFleetState()); }
    catch (error) {
      result.transportWarnings.push(c9CleanupWarning('pre-send-state-read', error, { workerId, tabId: result.tabId }));
      current = null;
    }
    if (current && !Object.values(current.workers || {}).some((worker) => worker.tabId === result.tabId)) {
      try {
        await c7SendStopWithTimeout(result.tabId, { type: 'fleet:registration-changed', registered: false, expectedWorkerId: workerId });
      } catch (error) {
        const stage = String(error).includes('timeout') ? 'send-timeout' : 'send-failed';
        result.transportWarnings.push(c9CleanupWarning(stage, error, { workerId, tabId: result.tabId }));
      }
    }
  }
  return result;
}
markWorkerBindingStale = c9MarkWorkerBindingStale;
reconcileStaleWorkerBindings = c9ReconcileStaleWorkerBindings;
unregisterWorker = c9UnregisterWorker;
const completeAssignmentC4Legacy = completeAssignment;
function c5Journal(state, type, text, detail, at) {
  return globalThis.ModelFleetStateM7C3.appendJournal(state, type, text, detail, at);
}
function c5JournalInPlace(state, type, text, detail, at) {
  replaceC3State(state, c5Journal(state, type, text, detail, at));
  return state;
}
function c5QueueMessage(state, input, at) {
  if (!Number.isFinite(at) || at <= 0) throw new Error('completion message createdAt must be positive');
  let id;
  do { id = `M-${state.nextMessage++}`; } while (state.messages.some((message) => message.id === id));
  const operator = input.toWorkerId === 'operator';
  if (!operator && (!state.workers[input.toWorkerId] || input.toWorkerId === 'operator')) throw new Error('message-target-not-found');
  const protocolRepairAttempts = input.protocolRepairAttempts ?? 0;
  if (!Number.isInteger(protocolRepairAttempts) || protocolRepairAttempts < 0) throw new Error('invalid-protocol-repair-attempts');
  const body = String(input.body || '').trim();
  if (!body) throw new Error('completion route message body is required');
  const message = {
    id,
    fromWorkerId: input.fromWorkerId || null,
    from: input.from || (input.fromWorkerId ? null : 'operator'),
    toWorkerId: input.toWorkerId,
    body,
    taskId: input.taskId || null,
    phase: operator ? 'delivered' : 'queued',
    createdAt: at,
    deliveredAt: operator ? at : 0,
    completedAt: 0,
    response: '',
    autoRecoveryAttempts: 0,
    lastAutoRecoveryReason: '',
    requiresFleetMessage: input.requiresFleetMessage === true,
    protocolRepairOf: input.protocolRepairOf || null,
    protocolRepairAttempts,
    goalContinuation: input.goalContinuation === true,
  };
  if (input.stage) {
    input.stage.messages.push(message);
    return message;
  }
  if (operator && !Number.isFinite(at)) throw new Error('invalid-delivered-at');
  const ownedMessage = (id) => Object.values(state.assignments || {}).some((assignment) => (assignment.messageIds || []).includes(id));
  const inactiveMessage = (candidate) => !ownedMessage(candidate.id) && ['done', 'blocked', 'cancelled', 'delivered'].includes(candidate.phase);
  if (state.messages.length >= MAX_MESSAGES && !state.messages.some(inactiveMessage)) throw new Error('completion-message-capacity-active');
  state.messages.push(message);
  while (state.messages.length > MAX_MESSAGES) {
    const victim = state.messages.findIndex(inactiveMessage);
    if (victim < 0) throw new Error('completion-message-capacity-active');
    state.messages.splice(victim, 1);
  }
  c5JournalInPlace(state, 'message.queued', `${id}: ${input.fromWorkerId || input.from || 'operator'} → ${input.toWorkerId}`, { taskId: message.taskId }, at);
  return message;
}
function goalFrontierKeyV2(state) {
  const taskState = Object.values(state.tasks || {})
    .sort((a, b) => String(a.id || '').localeCompare(String(b.id || ''), undefined, { numeric: true }))
    .map((task) => [task.id, task.phase, Number(task.completedAt || 0), Number(task.attempts || 0), String(task.lastAutoRecoveryReason || '')]);
  const messageState = (Array.isArray(state.messages) ? state.messages : [])
    .filter((message) => message && message.goalContinuation !== true && message.toWorkerId !== 'operator')
    .map((message) => [message.id, message.phase, message.fromWorkerId || message.from || '', message.toWorkerId || '', Number(message.completedAt || 0), Number(message.autoRecoveryAttempts || 0), String(message.lastAutoRecoveryReason || '')]);
  return compactFleetFingerprint(JSON.stringify({ goal: String(state.goal || '').trim(), tasks: taskState, messages: messageState }));
}
function hasDispatchablePendingTaskV2(state, at, c2) {
  const workers = Object.values(state.workers || {});
  return Object.values(state.tasks || {}).some((task) => {
    if (!task || task.phase !== 'pending') return false;
    return workers.some((worker) => {
      if (!worker || canonicalRole(worker.role) !== canonicalRole(task.role)) return false;
      try {
        return c2.schedulerWorkerEligibility(state, worker.id, { now: at }).eligible
          && c2.taskRunnable(state, task, worker);
      } catch {
        return false;
      }
    });
  });
}
function queueGoalContinuationV2(state, at) {
  const goal = String(state.goal || '').trim();
  if (!goal || state.policy?.paused || state.policy?.authorityEnabled === false) return null;
  if (Object.keys(state.assignments || {}).length) return null;
  if ((state.messages || []).some((message) => message && message.toWorkerId !== 'operator' && ['queued', 'running'].includes(message.phase))) return null;
  if (Object.values(state.workers || {}).some((worker) => Array.isArray(worker?.controlInbox) && worker.controlInbox.length)) return null;
  const c2 = globalThis.ModelFleetStateM7C2;
  if (!c2) return null;
  if (hasDispatchablePendingTaskV2(state, at, c2)) return null;
  const coordinator = Object.values(state.workers || {})
    .filter((worker) => worker && canonicalRole(worker.role) === 'coordinator')
    .sort((a, b) => String(a.id).localeCompare(String(b.id), undefined, { numeric: true }))
    .find((worker) => {
      try { return c2.schedulerWorkerEligibility(state, worker.id, { now: at }).eligible; } catch { return false; }
    });
  if (!coordinator) return null;
  const frontierKey = goalFrontierKeyV2(state);
  if (frontierKey && frontierKey === String(state.lastGoalContinuationKey || '')) return null;
  const message = c5QueueMessage(state, {
    from: 'scheduler',
    toWorkerId: coordinator.id,
    goalContinuation: true,
    body: [
      'GOAL CONTINUATION.',
      'The fleet is quiescent: no semantic messages, runnable tasks, active assignments, or control notices remain, but the fleet goal is still set.',
      `Goal: ${goal}`,
      '',
      'Reconcile the current durable fleet state and continue toward the goal.',
      '- Inspect existing task/message results and failures before creating new work.',
      '- If unfinished, emit only the bounded next FLEET_TASK/FLEET_MESSAGE work required by the current frontier.',
      '- If blocked, report the exact blocker to operator.',
      '- If the goal is genuinely complete, report completion to operator and emit no new work.',
      '- Do not create work merely to keep workers busy.',
    ].join('\n'),
  }, at);
  state.lastGoalContinuationKey = frontierKey;
  c5JournalInPlace(state, 'goal.continuation_queued', `${message.id} queued to ${coordinator.id}`, { workerId: coordinator.id, frontierKey }, at);
  return message;
}
function c5CreateTask(state, input, at, workerId) {
  if (!Number.isFinite(at) || at <= 0) throw new Error('task createdAt must be positive');
  let id;
  do { id = `T-${state.nextTask++}`; } while (state.tasks[id]);
  const role = canonicalRole(input.role);
  if (!['implementation', 'review'].includes(role)) throw new Error('coordinator may not create coordinator child tasks');
  if (!String(input.prompt || '').trim()) throw new Error('completion child task prompt is required');
  const dependencies = Array.from(new Set((input.dependencies || []).filter((id) => state.tasks[id])));
  const task = {
    id,
    title: String(input.title || '').trim() || id,
    prompt: String(input.prompt || '').trim(),
    role,
    priority: Math.max(-100, Math.min(100, Number(input.priority || 0) || 0)),
    dependencies,
    parentTaskId: input.parentTaskId && state.tasks[input.parentTaskId] ? input.parentTaskId : null,
    createdByWorkerId: workerId,
    createdByRole: 'coordinator',
    phase: 'pending',
    assignedWorkerId: null,
    attempts: 0,
    createdAt: at,
    startedAt: 0,
    completedAt: 0,
    result: '',
    statusNote: '',
    autoRecoveryAttempts: 0,
    lastAutoRecoveryReason: '',
  };
  state.tasks[id] = task;
  c5JournalInPlace(state, 'task.created', `${id}: ${task.title}`, { role: task.role, parentTaskId: task.parentTaskId, createdByWorkerId: workerId, createdByRole: task.createdByRole }, at);
  return task;
}
function c5QueueControlNotice(state, workerId, input, at) {
  const worker = state.workers[workerId];
  if (!worker || !String(input.body || '').trim()) return null;
  if (!Array.isArray(worker.controlInbox)) worker.controlInbox = [];
  const ordinal = input.stage ? input.stage.controlNotices.length + 1 : worker.controlInbox.length + 1;
  const notice = { id: `C-${state.generation + 1}-${at}-${ordinal}`, type: String(input.type || 'control'), body: String(input.body).trim(), taskId: input.taskId || null, relatedAssignmentId: input.relatedAssignmentId || null, createdAt: at };
  if (input.stage) {
    input.stage.controlNotices.push({ workerId, notice });
    return notice;
  }
  const ownedNotice = (id) => Object.values(state.assignments || {}).some((assignment) => assignment.workerId === workerId && (assignment.controlNoticeIds || []).includes(id));
  if (worker.controlInbox.length >= MAX_CONTROL_NOTICES) throw new Error('completion-control-capacity-active');
  worker.controlInbox.push(notice);
  if (worker.controlInbox.length > MAX_CONTROL_NOTICES) throw new Error('completion-control-capacity-active');
  c5JournalInPlace(state, 'control.queued', `${notice.id} queued for ${workerId}`, { workerId, taskId: notice.taskId, type: notice.type }, at);
  return notice;
}
function c5CompletionCapacityError(reason) {
  const error = new Error(reason);
  error.reason = reason;
  return error;
}
function c5AssertCompletionCapacity(state, assignment, stage) {
  const sourceMessageIds = new Set(assignment.messageIds || []);
  const otherAssignments = Object.values(state.assignments || {}).filter((candidate) => candidate.id !== assignment.id);
  const ownedByOther = (id) => otherAssignments.some((candidate) => (candidate.messageIds || []).includes(id));
  const inactiveOrReleased = (message) => !ownedByOther(message.id)
    && (['done', 'blocked', 'cancelled', 'delivered'].includes(message.phase) || sourceMessageIds.has(message.id));
  const safeMessageVictims = state.messages.filter(inactiveOrReleased).length;
  if (state.messages.length + stage.messages.length - safeMessageVictims > MAX_MESSAGES) {
    throw c5CompletionCapacityError('completion-message-capacity-active');
  }
  if (assignment.kind === 'control') {
    const worker = state.workers[assignment.workerId];
    const releasedNoticeIds = new Set(assignment.controlNoticeIds || []);
    const remaining = (worker?.controlInbox || []).filter((notice) => !releasedNoticeIds.has(notice.id)).length;
    const stagedForWorker = stage.controlNotices.filter((entry) => entry.workerId === assignment.workerId).length;
    if (remaining + stagedForWorker > MAX_CONTROL_NOTICES) throw c5CompletionCapacityError('completion-control-capacity-active');
  } else if (stage.controlNotices.some((entry) => {
    const target = state.workers[entry.workerId];
    return (target?.controlInbox || []).length >= MAX_CONTROL_NOTICES;
  })) {
    throw c5CompletionCapacityError('completion-control-capacity-active');
  }
}
function c5MaterializeCompletionStage(state, assignment, stage, at) {
  const sourceMessageIds = new Set(assignment.messageIds || []);
  const otherAssignments = Object.values(state.assignments || {}).filter((candidate) => candidate.id !== assignment.id);
  const ownedByOther = (id) => otherAssignments.some((candidate) => (candidate.messageIds || []).includes(id));
  const safeVictim = (message) => !ownedByOther(message.id)
    && ['done', 'blocked', 'cancelled', 'delivered'].includes(message.phase);
  for (const message of stage.messages) state.messages.push(message);
  while (state.messages.length > MAX_MESSAGES) {
    const victim = state.messages.findIndex((message) => safeVictim(message) || sourceMessageIds.has(message.id));
    if (victim < 0) throw c5CompletionCapacityError('completion-message-capacity-active');
    state.messages.splice(victim, 1);
  }
  for (const entry of stage.controlNotices) {
    const worker = state.workers[entry.workerId];
    if (!worker) throw c5CompletionCapacityError('completion-control-capacity-active');
    worker.controlInbox = Array.isArray(worker.controlInbox) ? worker.controlInbox : [];
    worker.controlInbox.push(entry.notice);
    if (worker.controlInbox.length > MAX_CONTROL_NOTICES) throw c5CompletionCapacityError('completion-control-capacity-active');
  }
  for (const message of stage.messages) c5JournalInPlace(state, 'message.queued', `${message.id}: ${message.fromWorkerId || message.from || 'operator'} → ${message.toWorkerId}`, { taskId: message.taskId }, at);
  for (const entry of stage.controlNotices) c5JournalInPlace(state, 'control.queued', `${entry.notice.id} queued for ${entry.workerId}`, { workerId: entry.workerId, taskId: entry.notice.taskId, type: entry.notice.type }, at);
}
function c5RouteMessages(state, workerId, parsed, taskId, at, stage) {
  const result = { queued: [], failures: [] };
  const worker = state.workers[workerId];
  const sourceRole = roleContract(state.tasks[taskId]?.role || worker?.role);
  const allowed = new Set(sourceRole?.allowedHandoffs || []);
  for (const item of parsed.messages || []) {
    const target = item.to;
    if (target === workerId) { result.failures.push({ target, body: item.body, reason: 'recipient resolves to the sending worker itself' }); continue; }
    if (target === 'operator' || target === 'scheduler') {
      const queued = c5QueueMessage(state, { fromWorkerId: workerId, toWorkerId: 'operator', body: item.body, taskId, stage }, at);
      result.queued.push(queued.id); continue;
    }
    if (target === 'broadcast') {
      let broadcastCount = 0;
      for (const peer of Object.values(state.workers)) {
        if (peer.enabled !== false && peer.id !== workerId && peer.lifecycle !== 'stale' && Number.isInteger(peer.tabId) && allowed.has(canonicalRole(peer.role))) {
          const queued = c5QueueMessage(state, { fromWorkerId: workerId, toWorkerId: peer.id, body: item.body, taskId, stage }, at);
          result.queued.push(queued.id); broadcastCount += 1;
        }
      }
      if (!broadcastCount) result.failures.push({ target, body: item.body, reason: 'no enabled peer recipients are available for broadcast' });
      continue;
    }
    const targetWorker = state.workers[target];
    if (!targetWorker || targetWorker.enabled === false || targetWorker.lifecycle === 'stale' || !Number.isInteger(targetWorker.tabId)) {
      result.failures.push({ target, body: item.body, reason: 'recipient is not a currently enabled registered worker' }); continue;
    }
    const targetRole = canonicalRole(targetWorker.role);
    if (!allowed.has(targetRole)) { result.failures.push({ target, body: item.body, reason: `source role ${sourceRole?.id || 'unknown'} is not allowed to hand off to ${targetRole}` }); continue; }
    const queued = c5QueueMessage(state, { fromWorkerId: workerId, toWorkerId: target, body: item.body, taskId, stage }, at);
    result.queued.push(queued.id);
  }
  return result;
}
function c5CreateChildren(state, workerId, parsed, parentTaskId, at) {
  const result = { created: [], failures: [] };
  if (!parsed.tasks?.length && !parsed.malformedTaskEnvelope) return result;
  const parent = parentTaskId ? state.tasks[parentTaskId] : null;
  if (canonicalRole(parent?.role || state.workers[workerId]?.role) !== 'coordinator') {
    for (const item of parsed.tasks || []) result.failures.push({ key: item.key || '', title: item.title || '', reason: 'only Coordinator may create child tasks' });
    if (parsed.malformedTaskEnvelope) result.failures.push({ key: '', title: '', reason: 'malformed FLEET_TASK envelope' });
    return result;
  }
  const aliases = new Map();
  for (const item of parsed.tasks || []) {
    try {
      const dependencies = [];
      for (const raw of item.dependencies || []) {
        const token = String(raw || '').trim(); const alias = token.startsWith('$') ? token.slice(1) : token;
        if (state.tasks[token]) dependencies.push(token); else if (aliases.has(alias)) dependencies.push(aliases.get(alias)); else throw new Error(`unknown dependency ${token}`);
      }
      if (item.key && aliases.has(item.key)) throw new Error(`duplicate child-task key ${item.key}`);
      const child = c5CreateTask(state, { ...item, dependencies, parentTaskId }, at, workerId);
      if (item.key) aliases.set(item.key, child.id); result.created.push(child.id);
    } catch (error) { result.failures.push({ key: item.key || '', title: item.title || '', reason: String(error?.message || error) }); }
  }
  if (parsed.malformedTaskEnvelope) result.failures.push({ key: '', title: '', reason: 'malformed FLEET_TASK envelope' });
  return result;
}
function c5ProtocolRepair(state, workerId, assignmentId, taskId, sourceMessage, reason, failures, at, stage) {
  if (Number(sourceMessage?.protocolRepairAttempts || 0) >= MAX_PROTOCOL_REPAIR_ATTEMPTS) return null;
  const failedOnly = failures.length ? failures.map((failure) => `- intended target: ${failure.target}\n  message: ${String(failure.body || '').trim()}`).join('\n') : '- Recover the intended peer recipient and message from your immediately previous response.';
  const body = [
    'FLEET ROUTING FORMAT RETRY.',
    `Your previous completion (${assignmentId}) finished the underlying work, but required peer delivery was not durably routed.`,
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
  return c5QueueMessage(state, { from: 'scheduler', toWorkerId: workerId, body, taskId, requiresFleetMessage: true, protocolRepairOf: assignmentId, protocolRepairAttempts: Number(sourceMessage?.protocolRepairAttempts || 0) + 1, stage }, at);
}
async function c5BeginWarmIdleV2(workerId, reason = 'assignment complete') {
  const claimed = await mutateFleet((state) => {
    const worker = state.workers[workerId];
    if (!state.policy.activeWorkerWindows || !worker || worker.enabled === false || worker.currentAssignmentId || worker.fault) return { applied: false };
    if (worker.lifecycle === 'warm-idle' && Number(worker.warmIdleUntil || 0) > 0) return { applied: true, idempotent: true, warmIdleUntil: worker.warmIdleUntil };
    const at = now();
    const warmIdleUntil = at + boundedWarmIdleMs(state.policy.warmIdleMs);
    worker.lifecycle = 'warm-idle';
    worker.runtime.busy = false;
    worker.warmIdleSince = at;
    worker.warmIdleUntil = warmIdleUntil;
    c5JournalInPlace(state, 'worker.warm_idle', `${workerId} kept live for ${Math.round((warmIdleUntil - at) / 1000)}s`, { reason, warmIdleUntil }, at);
    return { applied: true, warmIdleUntil };
  });
  if (!claimed.result?.applied) return false;
  if (claimed.result.idempotent) return true;
  await chrome.alarms.create(warmIdleAlarmName(workerId), { when: claimed.result.warmIdleUntil });
  schedule().catch(() => {});
  return true;
}
const c5RotationClaims = new Map();
function c5RotationClaimValid(state, claim) {
  const worker = state.workers[claim.workerId];
  return Boolean(worker
    && c5RotationClaims.get(claim.workerId) === claim
    && worker.enabled !== false
    && worker.currentAssignmentId == null
    && worker.chatRotationPending === true
    && worker.lifecycle === 'rotating'
    && worker.tabId === claim.tabId
    && !worker.fault);
}
function c5ApplyRotationFailureFaultV2(state, claim, error, at) {
  if (!c5RotationClaimValid(state, claim)) return { applied: false, stale: true };
  if (!Number.isFinite(at) || at <= 0) throw new Error('invalid-rotation-failure-at');
  const worker = state.workers[claim.workerId];
  const message = String(error?.message || error || 'chat rotation failed').slice(0, 2000) || 'chat rotation failed';
  worker.fault = { code: 'chat-rotation-failed', message, at, assignmentId: null };
  worker.lifecycle = 'rotation-failed';
  worker.runtime.busy = false;
  worker.pageBusyUntil = 0;
  worker.lastChatRotationError = String(error);
  c5JournalInPlace(state, 'worker.chat_rotation_failed', `${claim.workerId} could not start a fresh ChatGPT conversation`, { reason: claim.reason, tabId: claim.tabId, error: String(error) }, at);
  return { applied: true };
}
async function c5RotateWorkerChatV2(workerId, reason = 'chat turn limit reached') {
  const claim = { workerId, tabId: null, reason, token: Symbol('rotation-claim') };
  const claimed = await mutateFleet((state) => {
    const worker = state.workers[workerId];
    if (!worker || worker.enabled === false || worker.currentAssignmentId || worker.chatRotationPending !== true || worker.fault || !Number.isInteger(worker.tabId) || worker.lifecycle === 'rotating') return { applied: false };
    const at = now();
    claim.tabId = worker.tabId;
    claim.claimAt = at;
    worker.lifecycle = 'rotating';
    worker.runtime.busy = false;
    worker.pageBusyUntil = at + WORKER_WAKE_TIMEOUT_MS;
    c5JournalInPlace(state, 'worker.chat_rotation_started', `${workerId} starting a fresh ChatGPT conversation`, { reason, tabId: worker.tabId, turns: worker.chatTurnCount, limit: maxTurnsPerChatForRole(state.topology, worker.role) }, at);
    return { applied: true, tabId: worker.tabId };
  });
  if (!claimed.result?.applied) return false;
  c5RotationClaims.set(workerId, claim);
  const tabId = claimed.result.tabId;
  try {
    await clearWarmIdleAlarm(workerId);
    await chrome.tabs.update(tabId, { url: 'https://chatgpt.com/' });
    await waitForTabReady(tabId, 30000);
    await ensureFleetBridgeAfterWake(tabId, 30000);
    const tab = await chrome.tabs.get(tabId);
    const finished = await mutateFleet((state) => {
      const worker = state.workers[workerId];
      if (!c5RotationClaimValid(state, claim)) return { applied: false, stale: true };
      const at = now();
      worker.chatTurnCount = 0;
      worker.chatRotationPending = false;
      worker.lastCountedAssignmentId = '';
      worker.lastChatRotationAt = at;
      worker.lastChatRotationError = '';
      worker.lifecycle = 'idle';
      worker.runtime.busy = false;
      worker.pageBusyUntil = 0;
      worker.title = tab.title || worker.title;
      worker.url = tab.url || worker.url;
      worker.windowId = Number.isInteger(tab.windowId) ? tab.windowId : worker.windowId;
      c5JournalInPlace(state, 'worker.chat_rotated', `${workerId} started a fresh ChatGPT conversation`, { reason, tabId }, at);
      return { applied: true };
    });
    c5RotationClaims.delete(workerId);
    if (!finished.result?.applied) return false;
    schedule().catch(() => {});
    return true;
  } catch (error) {
    await mutateFleet((state) => c5ApplyRotationFailureFaultV2(state, claim, error, now())).catch(() => {});
    c5RotationClaims.delete(workerId);
    return false;
  }
}
async function c5WorkerIdleReadyV2(tabId, message = {}) {
  const state = await loadFleetState();
  const workerId = workerIdForTabInState(state, tabId);
  const worker = workerId ? state.workers[workerId] : null;
  if (!worker || worker.currentAssignmentId || worker.enabled === false || worker.fault || !Number.isInteger(worker.tabId)) return {};
  if (typeof message.assignmentId !== 'string' || !message.assignmentId || worker.lastCompletionAssignmentId !== message.assignmentId || !(Number(worker.lastAssignmentReleasedAt) > 0)) return {};
  if (worker.lifecycle === 'warm-idle' || worker.lifecycle === 'rotating') return {};
  if (worker.chatRotationPending) {
    await c5RotateWorkerChatV2(workerId, 'turn cap reached at idle acknowledgement').catch(() => {});
  } else {
    await c5BeginWarmIdleV2(workerId, `assignment ${message.assignmentId} acknowledged`).catch(() => {});
  }
  return {};
}
completeAssignment = async function completeAssignmentC5(senderTabId, payload) {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) return completeAssignmentC4Legacy(senderTabId, payload);
  const workerId = workerIdForTabInState(loaded, senderTabId);
  if (!workerId) return { ok: false, code: 'worker-not-found', terminal: true, expectedAssignmentId: null, reportedAssignmentId: payload?.assignmentId || null };
  if (typeof payload?.assignmentId !== 'string' || !payload.assignmentId) return { ok: false, code: 'assignment-id-required', terminal: false, expectedAssignmentId: loaded.workers[workerId]?.currentAssignmentId || null, reportedAssignmentId: payload?.assignmentId || null };
  if (!Number.isFinite(payload.responseTerminalAt) || payload.responseTerminalAt <= 0) return { ok: false, code: 'invalid-response-terminal-at', terminal: false, expectedAssignmentId: loaded.workers[workerId]?.currentAssignmentId || null, reportedAssignmentId: payload.assignmentId };
  let phaseA;
  try {
    phaseA = await mutateFleet((state) => {
      const begun = globalThis.ModelFleetStateM7C5.beginCompletion(state, { workerId, assignmentId: payload.assignmentId, responseTerminalAt: payload.responseTerminalAt });
      if (begun.result.ok) replaceC3State(state, begun.state);
      return begun.result;
    });
  } catch (error) {
    return { ok: false, code: error.reason || 'completion-begin-rejected', terminal: false, expectedAssignmentId: loaded.workers[workerId]?.currentAssignmentId || null, reportedAssignmentId: payload.assignmentId, error: String(error.message || error) };
  }
  if (!phaseA.result?.ok) return { ok: false, ...phaseA.result, error: phaseA.result.error || phaseA.result.code };
  const buffered = liveHeartbeats.get(workerId);
  if (buffered && buffered.at <= payload.responseTerminalAt) liveHeartbeats.delete(workerId);
  const responseText = String(payload.text || '').slice(0, MAX_RESULT_CHARS);
  const parsed = parseFleetOutput(responseText);
  const phaseBAt = now();
  let phaseB;
  try {
    phaseB = await mutateFleet((state) => {
      const worker = state.workers[workerId]; const assignment = state.assignments[payload.assignmentId];
      if (!worker || worker.currentAssignmentId !== payload.assignmentId || !assignment || assignment.phase !== 'completing') return { rejected: true, code: 'completion-ownership-lost', terminal: false, expectedAssignmentId: worker?.currentAssignmentId || null, reportedAssignmentId: payload.assignmentId };
      const acknowledgedAt = phaseBAt;
      const stage = { messages: [], controlNotices: [] };
      const sourceMessages = assignment.kind === 'message' ? assignment.messageIds.map((id) => state.messages.find((message) => message.id === id)).filter(Boolean).sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0)) : [];
      const sourceMessage = sourceMessages.find((message) => message.requiresFleetMessage === true) || sourceMessages[0] || null;
      const relatedTaskId = assignment.kind === 'task' ? assignment.taskId : sourceMessage?.taskId || assignment.controlNoticeIds.map((id) => (worker.controlInbox || []).find((notice) => notice.id === id)?.taskId).find(Boolean) || null;
      const routeResult = c5RouteMessages(state, workerId, parsed, relatedTaskId, acknowledgedAt, stage);
      const childResult = c5CreateChildren(state, workerId, parsed, relatedTaskId, acknowledgedAt);
      if (childResult.failures.length) {
        c5QueueControlNotice(state, workerId, {
          type: 'child-task-creation-failure',
          body: [
            'COORDINATOR CHILD-TASK CREATION FAILURE.',
            'One or more FLEET_TASK envelopes were rejected by the control plane.',
            ...childResult.failures.map((failure) => `- ${failure.key || failure.title || 'task'}: ${failure.reason}`),
            'Observe the failure, replan, and emit corrected child tasks if still required.',
          ].join('\n'),
          taskId: relatedTaskId,
          relatedAssignmentId: payload.assignmentId,
          stage,
        }, acknowledgedAt);
      }
      const repairReason = sourceMessage?.requiresFleetMessage && routeResult.queued.length === 0 ? 'This routing-format retry still produced no valid routed FLEET_MESSAGE.' : (parsed.malformedMessageEnvelope ? 'Your response contained a FLEET_MESSAGE marker, but no complete valid envelope.' : routeResult.failures.map((failure) => `Failed target ${failure.target}: ${failure.reason}`).join('\n'));
      const repairMessage = repairReason ? c5ProtocolRepair(state, workerId, payload.assignmentId, relatedTaskId, sourceMessage, repairReason, routeResult.failures, acknowledgedAt, stage) : null;
      const repairExhausted = Boolean(repairReason && !repairMessage && sourceMessage?.requiresFleetMessage === true);
      if (repairExhausted) c5QueueMessage(state, {
        from: 'scheduler',
        toWorkerId: 'operator',
        body: `Fleet peer-routing repair failed for ${workerId} (${payload.assignmentId}).\n\n${repairReason}`,
        taskId: relatedTaskId,
        stage,
      }, acknowledgedAt);
      c5AssertCompletionCapacity(state, assignment, stage);
      if (assignment.kind === 'task') {
        const task = state.tasks[assignment.taskId];
        task.result = responseText; task.completedAt = acknowledgedAt; task.completedByWorkerId = workerId; task.completedByRole = canonicalRole(worker.role); task.statusNote = repairMessage ? `peer routing repair queued as ${repairMessage.id}` : parsed.statusNote;
      }
      for (const message of sourceMessages) { message.response = responseText; message.completedAt = acknowledgedAt; if (repairMessage && message.id === sourceMessage?.id) message.protocolRepairMessageId = repairMessage.id; }
      const disposition = assignment.kind === 'task' ? (parsed.state === 'blocked' ? 'blocked' : 'done') : assignment.kind === 'control' ? (parsed.state === 'blocked' ? 'blocked' : 'done') : Object.fromEntries(sourceMessages.map((message) => [message.id, repairExhausted && message.id === sourceMessage?.id ? 'blocked' : 'done']));
      let next = c5Journal(state, 'assignment.parsed', `${payload.assignmentId}: completion parsed`, { workerId, taskId: relatedTaskId, messageIds: assignment.messageIds || [], routeFailures: routeResult.failures.length, childTaskCount: childResult.created.length }, acknowledgedAt);
      if (repairMessage) next = c5Journal(next, 'assignment.protocol_repair_queued', `${payload.assignmentId}: queued ${repairMessage.id}`, { workerId, taskId: relatedTaskId, repairMessageId: repairMessage.id }, acknowledgedAt);
      if (repairExhausted) next = c5Journal(next, 'assignment.protocol_repair_exhausted', `${payload.assignmentId}: protocol repair exhausted`, { workerId, taskId: relatedTaskId }, acknowledgedAt);
      if (assignment.kind === 'task') next = c5Journal(next, `task.${disposition}`, `${assignment.taskId} ${disposition} by ${workerId}`, { taskId: assignment.taskId, workerId }, acknowledgedAt);
      if (sourceMessages.length) next = c5Journal(next, repairExhausted ? 'message.protocol_repair_failed' : (sourceMessages.length > 1 ? 'message.batch_completed' : 'message.completed'), repairExhausted
        ? `${sourceMessage?.id || sourceMessages[0].id} exhausted peer-routing repair at ${workerId}`
        : sourceMessages.length > 1 ? `${sourceMessages.length} messages (${sourceMessages[0].id}…${sourceMessages[sourceMessages.length - 1].id}) handled by ${workerId}` : `${sourceMessages[0].id} handled by ${workerId}`, { messageIds: sourceMessages.map((message) => message.id), count: sourceMessages.length }, acknowledgedAt);
      const lagMs = Math.max(0, acknowledgedAt - assignment.responseTerminalAt); const releaseWorker = next.workers[workerId];
      releaseWorker.lastCompletionAssignmentId = payload.assignmentId; releaseWorker.lastAssignmentReleasedAt = acknowledgedAt; releaseWorker.lastResponseTerminalAt = assignment.responseTerminalAt; releaseWorker.lastCompletionReleaseLagMs = lagMs; releaseWorker.completionReleaseLagCount = Math.max(0, Number(releaseWorker.completionReleaseLagCount || 0)) + 1; releaseWorker.completionReleaseLagTotalMs = Math.max(0, Number(releaseWorker.completionReleaseLagTotalMs || 0)) + lagMs; releaseWorker.completionReleaseLagMaxMs = Math.max(Math.max(0, Number(releaseWorker.completionReleaseLagMaxMs || 0)), lagMs); releaseWorker.runtime.busy = false; releaseWorker.lastResultAt = acknowledgedAt; releaseWorker.progressVersion = Number(releaseWorker.progressVersion || 0) + 1; releaseWorker.lifecycle = 'idle';
      next = c5Journal(next, 'assignment.release_lag', `${payload.assignmentId}: response terminal → assignment released ${lagMs}ms`, { workerId, responseTerminalAt: assignment.responseTerminalAt, assignmentReleasedAt: acknowledgedAt, lagMs }, acknowledgedAt);
      const acknowledged = globalThis.ModelFleetStateM7C5.acknowledgeCompletion(next, { workerId, assignmentId: payload.assignmentId, disposition, acknowledgedAt });
      c5MaterializeCompletionStage(acknowledged.state, assignment, stage, acknowledgedAt);
      replaceC3State(state, acknowledged.state);
      return { ...acknowledged.result, repairMessageId: repairMessage?.id || null, childTaskCount: childResult.created.length };
    });
  } catch (error) {
    return { ok: false, code: error.reason || 'completion-routing-failed', terminal: false, assignmentId: payload.assignmentId, pendingCompletion: true, error: String(error.message || error) };
  }
  if (phaseB.result?.rejected || phaseB.result?.ok !== true) return { ok: false, ...phaseB.result, pendingCompletion: true };
  const completed = phaseB.state;
  if (completed.workers[workerId]?.['chatRotation' + 'Pending']) c5RotateWorkerChatV2(workerId, `turn cap reached after ${payload.assignmentId}`).catch(() => {});
  else c5BeginWarmIdleV2(workerId, `assignment ${payload.assignmentId} completed`).catch(() => {});
  schedule().catch(() => {});
  return { ok: true, assignmentId: payload.assignmentId, completed: true };
};

// C10 v2 registration overlay. The legacy registration implementation remains
// the isolated v1 branch until the final persistence cutover.
importScripts('fleet-state-model-m7-c10.js');
const registerTabC10Legacy = registerTab;
const C10_REGISTRATION_TIMEOUT_MS = C7_STOP_TRANSPORT_TIMEOUT_MS;
function c10Module() { return globalThis.ModelFleetStateM7C10; }
function c10Warning(stage, error, detail = {}) { return { ...detail, stage, error: String(error) }; }
async function c10Bounded(label, operation) {
  let timer;
  try {
    return await Promise.race([
      Promise.resolve().then(operation),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label}-timeout`)), C10_REGISTRATION_TIMEOUT_MS); }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
async function c10EnsureWorkerWindow(workerId, expectedTabId, warnings) {
  let workerTab = await chrome.tabs.get(expectedTabId);
  let win = await chrome.windows.get(workerTab.windowId, { populate: true });
  const foreignTabs = (win.tabs || []).filter((tab) => tab.id !== expectedTabId);
  if (foreignTabs.length) {
    const created = await chrome.windows.create({ tabId: expectedTabId, focused: false, type: 'normal' });
    workerTab = await chrome.tabs.get(expectedTabId);
    win = await chrome.windows.get(created.id, { populate: true });
  }
  const stableWindowId = workerTab.windowId;
  await mutateFleet((state) => {
    const worker = state.workers[workerId];
    if (!worker || worker.tabId !== expectedTabId) return { stale: true };
    const next = globalThis.ModelFleetStateM7C3.appendJournal(state, 'worker.window_bound', `${workerId} bound to dedicated live window ${stableWindowId}`, { workerId, tabId: expectedTabId, windowId: stableWindowId }, now());
    replaceC3State(state, next);
    state.workers[workerId].windowId = stableWindowId;
    return { stale: false };
  });
  return stableWindowId;
}
async function c10PostRegistrationV2(committed, tabId) {
  const result = { ...committed.result, cleanupWarnings: [] };
  const workerId = result.worker.id;
  schedule().catch(() => {});
  try { await c10Bounded('badge-update', () => updateBadge(tabId)); }
  catch (error) { result.cleanupWarnings.push(c10Warning(String(error).includes('timeout') ? 'badge-update-timeout' : 'badge-update-failed', error, { workerId, tabId })); }
  if (committed.state?.policy?.activeWorkerWindows === true) {
    try { await c10Bounded('worker-window', () => c10EnsureWorkerWindow(workerId, tabId, result.cleanupWarnings)); }
    catch (error) { result.cleanupWarnings.push(c10Warning(String(error).includes('timeout') ? 'worker-window-timeout' : 'worker-window-failed', error, { workerId, tabId })); }
  }
  try { await c10Bounded('bridge', () => ensureFleetBridge(tabId)); }
  catch (error) { result.cleanupWarnings.push(c10Warning(String(error).includes('timeout') ? 'bridge-timeout' : 'bridge-failed', error, { workerId, tabId })); }
  let current;
  try { current = await c10Bounded('pre-send-state-read', () => loadFleetState()); }
  catch (error) { result.cleanupWarnings.push(c10Warning('pre-send-state-read', error, { workerId, tabId })); current = null; }
  const proof = current && current.version === 2 && current.workers?.[workerId]?.tabId === tabId
    && Object.values(current.workers).filter((candidate) => candidate.tabId === tabId).length === 1;
  if (proof) {
    try {
      await c10Bounded('registration-send', () => chrome.tabs.sendMessage(tabId, {
        type: 'fleet:registration-changed', registered: true,
        expectedWorkerId: workerId, worker: current.workers[workerId],
      }));
    } catch (error) { result.cleanupWarnings.push(c10Warning(String(error).includes('timeout') ? 'send-timeout' : 'send-failed', error, { workerId, tabId })); }
  }
  return result;
}
async function registerTabC10(tabId, patch = {}) {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) return registerTabC10Legacy(tabId, patch);
  if (globalThis.m7TabCloseClaims?.has(tabId)) throw new Error('topology-tab-close-claimed');
  const tab = await supportedTab(tabId);
  if (!tab) throw new Error('tab is not a supported ChatGPT tab');
  const registrationAt = now();
  const committed = await mutateFleet((state) => {
    if (globalThis.m7TabCloseClaims?.has(tabId)) throw new Error('topology-tab-close-claimed');
    const outcome = c10Module().upsertWorkerBindingV2(state, { tab, patch, at: registrationAt });
    replaceC3State(state, outcome.state);
    return outcome.result;
  });
  return c10PostRegistrationV2(committed, tabId);
}
registerTab = registerTabC10;

// C11 v2 role/topology mutation overlay. The legacy implementations remain
// available for the version-1 branch; topology reconciliation stays C12+.
importScripts('fleet-state-model-m7-c11.js');
const setTopologyRoleCountC11Legacy = setTopologyRoleCount;
const setRoleTurnLimitC11Legacy = setRoleTurnLimit;
const c11LegacySnapshot = publicSnapshot;
function c11Module() { return globalThis.ModelFleetStateM7C11; }

async function setWorkerRoleC11Dispatch(message) {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) {
    const committed = await mutateFleet((state) => {
      const worker = state.workers[message.workerId];
      if (!worker) throw new Error('worker not found');
      if (worker.currentAssignmentId) throw new Error('cannot change role while worker owns an active assignment');
      worker.role = canonicalRole(message.role);
      if (worker.chatTurnCount >= maxTurnsPerChatForRole(state.topology, worker.role)) worker.chatRotationPending = true;
      appendJournal(state, 'worker.role', `${worker.id} role → ${worker.role}`);
    });
    return { snapshot: c11LegacySnapshot(committed.state) };
  }
  const at = now();
  const committed = await mutateFleet((state) => {
    const outcome = c11Module().setWorkerRoleV2(state, { workerId: message.workerId, role: message.role, at });
    replaceC3State(state, outcome.state);
    return outcome.result;
  });
  return committed.result;
}

async function setTopologyRoleCountC11Dispatch(message) {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) return { snapshot: await setTopologyRoleCountC11Legacy(message.role, message.count) };
  const at = now();
  const committed = await mutateFleet((state) => {
    const outcome = c11Module().setTopologyRoleCountV2(state, { role: message.role, count: message.count, at });
    replaceC3State(state, outcome.state);
    return outcome.result;
  });
  return committed.result;
}

async function setRoleTurnLimitC11Dispatch(message) {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) {
    const snapshot = await setRoleTurnLimitC11Legacy(message.role, message.limit);
    return { snapshot };
  }
  const at = now();
  const committed = await mutateFleet((state) => {
    const outcome = c11Module().setRoleTurnLimitV2(state, { role: message.role, limit: message.limit, at });
    replaceC3State(state, outcome.state);
    return outcome.result;
  });
  schedule().catch(() => {});
  return committed.result;
}

// C12 v2 topology reconciliation overlay. The legacy implementation remains
// the isolated version-1 branch; v2 uses canonical planning, C9 unregister,
// and C10 registration with fresh proof at every durable action boundary.
importScripts('fleet-state-model-m7-c12.js');
const reconcileFleetTopologyC12Legacy = reconcileFleetTopology;
const C12_TOPOLOGY_TIMEOUT_MS = C7_STOP_TRANSPORT_TIMEOUT_MS;
const C12_HEARTBEAT_MAX_AGE_MS = 30000;
globalThis.m7TabCloseClaims = globalThis.m7TabCloseClaims || new Map();
function c12Module() { return globalThis.ModelFleetStateM7C12; }
function c12Warning(stage, error, detail = {}) { return { ...detail, stage, error: String(error) }; }
async function c12Bounded(label, operation) {
  let timer;
  try {
    return await Promise.race([
      Promise.resolve().then(operation),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label}-timeout`)), C12_TOPOLOGY_TIMEOUT_MS); }),
    ]);
  } finally { if (timer) clearTimeout(timer); }
}
function c12ReleaseClaim(tabId, claim) {
  if (globalThis.m7TabCloseClaims?.get(tabId) === claim) globalThis.m7TabCloseClaims.delete(tabId);
}
async function c12ClaimedTabRemove(tabId, claim, warnings, detail, label) {
  const removePromise = Promise.resolve().then(() => chrome.tabs.remove(tabId));
  let settled = false;
  const settle = (error) => {
    if (settled) return;
    settled = true;
    c12ReleaseClaim(tabId, claim);
    if (error) {
      // The rejection is observed here even when the bounded caller already returned.
      void error;
    }
  };
  removePromise.then(() => settle(), (error) => settle(error));
  try {
    await c12Bounded(label, () => removePromise);
    return { deferredClaimRelease: false };
  } catch (error) {
    warnings.push(c12Warning(String(error).includes('timeout') ? `${label}-timeout` : `${label}-failed`, error, detail));
    if (!settled) return { deferredClaimRelease: true };
    return { deferredClaimRelease: false };
  }
}
async function c12CloseCreatedWindow(windowId, tabId, warnings) {
  let targetTabId = Number.isInteger(tabId) ? tabId : null;
  if (!Number.isInteger(targetTabId)) {
    try {
      const tabs = await c12Bounded('created-window-query', () => chrome.tabs.query({ windowId }));
      const ids = tabs.filter((tab) => Number.isInteger(tab?.id)).map((tab) => tab.id);
      if (ids.length !== 1) {
        warnings.push(c12Warning('created-tab-ambiguous', new Error('created window tab identity is ambiguous'), { windowId, tabIds: ids }));
        return;
      }
      [targetTabId] = ids;
    } catch (error) {
      warnings.push(c12Warning(String(error).includes('timeout') ? 'created-window-query-timeout' : 'created-window-query-failed', error, { windowId }));
      return;
    }
  }
  const claim = { tabId: targetTabId, windowId, token: Symbol('topology-created-close-claim') };
  if (globalThis.m7TabCloseClaims?.has(targetTabId)) {
    warnings.push(c12Warning('created-close-claim-conflict', new Error('topology close claim already held'), { windowId, tabId: targetTabId }));
    return;
  }
  globalThis.m7TabCloseClaims.set(targetTabId, claim);
  const sameClaim = () => globalThis.m7TabCloseClaims?.get(targetTabId) === claim;
  let deferredClaimRelease = false;
  try {
    try { await c12Bounded('created-close-state-queue-barrier', () => stateQueue); }
    catch (error) {
      warnings.push(c12Warning(String(error).includes('timeout') ? 'created-close-state-queue-timeout' : 'created-close-state-barrier-failed', error, { windowId, tabId: targetTabId }));
      return;
    }
    let current;
    try { current = await c12Bounded('created-close-state-read', () => loadFleetState()); }
    catch (error) {
      warnings.push(c12Warning(String(error).includes('timeout') ? 'created-close-proof-timeout' : 'created-close-proof-state-read', error, { windowId, tabId: targetTabId }));
      return;
    }
    if (current.version !== 2 || !sameClaim()) {
      warnings.push(c12Warning('created-close-proof-failed', new Error('created tab close proof failed'), { windowId, tabId: targetTabId }));
      return;
    }
    if (Object.values(current.workers || {}).some((worker) => worker.tabId === targetTabId)) {
      warnings.push(c12Warning('created-close-owned', new Error('created tab is already durably registered'), { windowId, tabId: targetTabId }));
      return;
    }
    if (!sameClaim()) {
      warnings.push(c12Warning('created-close-claim-lost', new Error('topology close claim changed'), { windowId, tabId: targetTabId }));
      return;
    }
    const close = await c12ClaimedTabRemove(targetTabId, claim, warnings, { windowId, tabId: targetTabId }, 'created-tab-close');
    deferredClaimRelease = close.deferredClaimRelease;
  } finally {
    if (!deferredClaimRelease) c12ReleaseClaim(targetTabId, claim);
  }
}
async function c12CloseRemovedBinding(intent, warnings) {
  const sameClaim = () => globalThis.m7TabCloseClaims?.get(intent.tabId) === intent.claim;
  const finalProof = async (stage) => {
    if (!sameClaim()) { warnings.push(c12Warning('close-claim-lost', new Error('topology close claim changed'), { ...intent, stage })); return false; }
    try {
      const latest = await c12Bounded(`${stage}-state-read`, () => loadFleetState());
      if (latest.version !== 2 || Object.values(latest.workers || {}).some((worker) => worker.tabId === intent.tabId) || !sameClaim()) {
        warnings.push(c12Warning('close-proof-failed', new Error('topology close ownership proof failed'), { ...intent, stage }));
        return false;
      }
      return true;
    } catch (error) {
      warnings.push(c12Warning(String(error).includes('timeout') ? 'close-proof-timeout' : 'close-proof-state-read', error, { ...intent, stage }));
      return false;
    }
  };
  let current;
  try { current = await c12Bounded('remove-pre-close-state-read', () => loadFleetState()); }
  catch (error) { warnings.push(c12Warning('remove-pre-close-state-read', error, intent)); return; }
  if (current.version !== 2 || Object.values(current.workers || {}).some((worker) => worker.tabId === intent.tabId) || !sameClaim()) return;
  if (!await finalProof('tab-remove')) return { deferredClaimRelease: false };
  return c12ClaimedTabRemove(intent.tabId, intent.claim, warnings, intent, 'tab-remove');
}
async function c12PostUnregisterCleanup(intent, warnings) {
  liveHeartbeats.delete(intent.workerId);
  try { await c9BoundedCleanup('warm-idle-alarm-clear', () => clearWarmIdleAlarm(intent.workerId)); }
  catch (error) { warnings.push(c12Warning(String(error).includes('timeout') ? 'warm-idle-alarm-clear-timeout' : 'warm-idle-alarm-clear-failed', error, intent)); }
  try { await c9BoundedCleanup('badge-update', () => updateBadge(intent.tabId)); }
  catch (error) { warnings.push(c12Warning(String(error).includes('timeout') ? 'badge-update-timeout' : 'badge-update-failed', error, intent)); }
  let current;
  try { current = await c9BoundedCleanup('pre-send-state-read', () => loadFleetState()); }
  catch (error) { warnings.push(c12Warning('pre-send-state-read', error, intent)); return; }
  if (current.version !== 2 || Object.values(current.workers || {}).some((worker) => worker.tabId === intent.tabId)) return;
  try {
    await c7SendStopWithTimeout(intent.tabId, { type: 'fleet:registration-changed', registered: false, expectedWorkerId: intent.workerId });
  } catch (error) {
    warnings.push(c12Warning(String(error).includes('timeout') ? 'send-timeout' : 'send-failed', error, intent));
  }
}
async function c12RemovalCandidate(state, workerId, roleId, at) {
  const worker = state.workers[workerId];
  if (!worker || worker.tabId == null) return { removable: false, reason: 'worker-missing' };
  const result = c12Module().removableWorkerV2(state, workerId, { now: at, heartbeatMaxAgeMs: C12_HEARTBEAT_MAX_AGE_MS, targetRole: roleId });
  if (!result.removable) return result;
  if (worker.windowId !== undefined && worker.windowId !== null && !Number.isInteger(worker.windowId)) return { removable: false, reason: 'window-identity-invalid' };
  return result;
}
async function c12UnregisterExact(intent) {
  return mutateFleet((state) => {
    const commitAt = now();
    const worker = state.workers[intent.workerId];
    if (!worker || worker.tabId !== intent.tabId || worker.windowId !== intent.windowId
      || worker.enabled !== true || worker.topologyManaged !== true
      || canonicalRole(worker.role) !== intent.role) return { removed: false, code: 'topology-removal-stale' };
    const check = c12Module().removableWorkerV2(state, intent.workerId, {
      now: commitAt, heartbeatMaxAgeMs: C12_HEARTBEAT_MAX_AGE_MS, targetRole: intent.role,
    });
    if (!check.removable) return { removed: false, code: `topology-removal-${check.reason}` };
    const outcome = globalThis.ModelFleetStateM7C9.unregisterWorkerV2(state, { workerId: intent.workerId, at: commitAt });
    if (!outcome.result.removed) return outcome.result;
    replaceC3State(state, outcome.state);
    return outcome.result;
  });
}
async function c12RemoveOne(roleId, warnings) {
  const fresh = await loadFleetState();
  if (fresh.version !== 2) return { removed: false, deferred: true };
  const previewAt = now();
  const plan = c12Module().topologyPlanV2(fresh, { now: previewAt, heartbeatMaxAgeMs: C12_HEARTBEAT_MAX_AGE_MS });
  if ((plan.current[roleId] || 0) <= (plan.desired[roleId] || 0)) return { removed: false, deferred: false };
  const candidate = plan.candidates[roleId]?.[0];
  if (!candidate) return { removed: false, deferred: true };
  const proof = await c12RemovalCandidate(fresh, candidate.id, roleId, previewAt);
  if (!proof.removable) return { removed: false, deferred: true, reason: proof.reason };
  const workerId = candidate.id;
  const tabId = candidate.tabId;
  const windowId = candidate.windowId;
  const claim = { workerId, tabId, windowId, role: roleId, token: Symbol('topology-close-claim') };
  if (globalThis.m7TabCloseClaims.has(tabId)) return { removed: false, deferred: true, reason: 'topology-close-claimed' };
  globalThis.m7TabCloseClaims.set(tabId, claim);
  let deferredClaimRelease = false;
  try {
    const removedCommit = await c12UnregisterExact({ workerId, tabId, windowId, role: roleId });
    const removed = removedCommit.result;
    if (!removed?.removed) return { removed: false, deferred: true, reason: removed?.code || 'unregister-not-removed' };
    const intent = { workerId, tabId, windowId, assignmentId: null, claim };
    await c12PostUnregisterCleanup(intent, warnings);
    const close = await c12CloseRemovedBinding(intent, warnings);
    deferredClaimRelease = close?.deferredClaimRelease === true;
    if (deferredClaimRelease) return { removed: true, workerId, closePending: true };
    return { removed: true, workerId };
  } finally {
    if (!deferredClaimRelease) c12ReleaseClaim(tabId, claim);
  }
}
async function c12CreateOne(roleId, at, warnings) {
  const before = await loadFleetState();
  if (before.version !== 2) return { created: false, deferred: true };
  const plan = c12Module().topologyPlanV2(before, { now: at, heartbeatMaxAgeMs: C12_HEARTBEAT_MAX_AGE_MS });
  if ((plan.current[roleId] || 0) >= (plan.desired[roleId] || 0)) return { created: false, deferred: false };
  let created;
  try { created = await c12Bounded('topology-window-create', () => chrome.windows.create({ url: 'https://chatgpt.com/', focused: false, type: 'normal' })); }
  catch (error) { warnings.push(c12Warning(String(error).includes('timeout') ? 'window-create-timeout' : 'window-create-failed', error, { role: roleId })); return { created: false, deferred: true }; }
  const windowId = created?.id;
  if (!Number.isInteger(windowId)) { warnings.push(c12Warning('window-create-invalid', new Error('created topology window has no id'), { role: roleId })); return { created: false, deferred: true }; }
  let tab;
  try {
    const tabs = await c12Bounded('topology-tab-query', () => chrome.tabs.query({ windowId }));
    const ids = tabs.filter((item) => Number.isInteger(item?.id)).map((item) => item.id);
    if (ids.length !== 1) {
      warnings.push(c12Warning('topology-created-tab-ambiguous', new Error('created topology window tab identity is ambiguous'), { role: roleId, windowId, tabIds: ids }));
      await c12CloseCreatedWindow(windowId, null, warnings);
      return { created: false, deferred: true };
    }
    tab = tabs.find((item) => item.id === ids[0]);
    await c12Bounded('topology-tab-ready', () => waitForTabReady(tab.id, 30000));
  } catch (error) {
    warnings.push(c12Warning(String(error).includes('timeout') ? 'topology-tab-timeout' : 'topology-tab-failed', error, { role: roleId, windowId }));
    await c12CloseCreatedWindow(windowId, tab?.id, warnings);
    return { created: false, deferred: true };
  }
  const beforeRegistration = await loadFleetState();
  if (beforeRegistration.version !== 2) { await c12CloseCreatedWindow(windowId, tab.id, warnings); return { created: false, deferred: true }; }
  const latestPlan = c12Module().topologyPlanV2(beforeRegistration, { now: at, heartbeatMaxAgeMs: C12_HEARTBEAT_MAX_AGE_MS });
  if ((latestPlan.current[roleId] || 0) >= (latestPlan.desired[roleId] || 0)) {
    await c12CloseCreatedWindow(windowId, tab.id, warnings);
    return { created: false, deferred: false };
  }
  let stableTab;
  try { stableTab = await c12Bounded('topology-supported-tab', () => supportedTab(tab.id)); }
  catch (error) {
    warnings.push(c12Warning(String(error).includes('timeout') ? 'topology-supported-tab-timeout' : 'topology-supported-tab-failed', error, { role: roleId, tabId: tab.id }));
    await c12CloseCreatedWindow(windowId, tab.id, warnings);
    return { created: false, deferred: true };
  }
  if (!stableTab) { warnings.push(c12Warning('topology-supported-tab-failed', new Error('created tab is no longer supported'), { role: roleId, tabId: tab.id })); await c12CloseCreatedWindow(windowId, tab.id, warnings); return { created: false, deferred: true }; }
  const registrationAt = now();
  let committed;
  try {
    committed = await mutateFleet((state) => {
      const livePlan = c12Module().topologyPlanV2(state, { now: registrationAt, heartbeatMaxAgeMs: C12_HEARTBEAT_MAX_AGE_MS });
      if ((livePlan.current[roleId] || 0) >= (livePlan.desired[roleId] || 0)) return { capacitySatisfied: true };
      if (globalThis.m7TabCloseClaims?.has(stableTab.id)) return { capacitySatisfied: true, code: 'topology-tab-close-claimed' };
      const outcome = c10Module().upsertWorkerBindingV2(state, { tab: stableTab, patch: { role: roleId, topologyManaged: true }, at: registrationAt });
      replaceC3State(state, outcome.state);
      return outcome.result;
    });
  } catch (error) {
    warnings.push(c12Warning(String(error).includes('timeout') ? 'topology-register-timeout' : 'topology-register-failed', error, { role: roleId, tabId: stableTab.id }));
    await c12CloseCreatedWindow(windowId, stableTab.id, warnings);
    return { created: false, deferred: true };
  }
  if (committed.result?.capacitySatisfied) { await c12CloseCreatedWindow(windowId, stableTab.id, warnings); return { created: false, deferred: false }; }
  const workerId = committed.result?.worker?.id;
  if (!workerId) { warnings.push(c12Warning('topology-register-invalid', new Error('registration returned no worker'), { role: roleId, tabId: stableTab.id })); return { created: false, deferred: true }; }
  const registration = await c10PostRegistrationV2(committed, stableTab.id);
  for (const warning of registration.cleanupWarnings || []) warnings.push({ ...warning, role: roleId, workerId });
  try {
    await mutateFleet((state) => {
      const worker = state.workers[workerId];
      if (!worker || worker.tabId !== stableTab.id || canonicalRole(worker.role) !== roleId || worker.topologyManaged !== true) throw new Error('topology-created-proof-failed');
      replaceC3State(state, globalThis.ModelFleetStateM7C3.appendJournal(state, 'topology.worker_created', `${workerId} created for ${roleId}`, { workerId, role: roleId, tabId: stableTab.id, windowId }, at));
    });
  } catch (error) {
    warnings.push(c12Warning('topology-created-journal-failed', error, { workerId, role: roleId, tabId: stableTab.id }));
  }
  return { created: true, workerId };
}
async function reconcileFleetTopologyC12(reason = 'topology reconciliation') {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) return reconcileFleetTopologyC12Legacy();
  if (globalThis.topologyReconcilePromiseC12) return globalThis.topologyReconcilePromiseC12;
  globalThis.topologyReconcilePromiseC12 = (async () => {
    const created = []; const removed = []; const errors = []; const cleanupWarnings = []; const at = now();
    let lastAuthenticatedCounts = c12Module().topologyPlanV2(loaded, { now: at, heartbeatMaxAgeMs: C12_HEARTBEAT_MAX_AGE_MS });
    try { await c9ReconcileStaleWorkerBindings(reason); }
    catch (error) {
      errors.push(`stale-binding: ${String(error)}`);
      try { const fresh = await loadFleetState(); if (fresh.version !== 2) throw new Error('topology-version-changed'); }
      catch (freshError) { errors.push(`fresh-state: ${String(freshError)}`); }
    }
    for (const roleId of ['coordinator', 'implementation', 'review']) {
      while (true) {
        let result;
        try { result = await c12RemoveOne(roleId, cleanupWarnings); }
        catch (error) { errors.push(`${roleId}: ${String(error)}`); break; }
        if (result.removed) { removed.push(result.workerId); continue; }
        break;
      }
    }
    for (const roleId of ['coordinator', 'implementation', 'review']) {
      while (true) {
        let result;
        try { result = await c12CreateOne(roleId, at, cleanupWarnings); }
        catch (error) { errors.push(`${roleId}: ${String(error)}`); break; }
        if (result.created) { created.push(result.workerId); continue; }
        break;
      }
    }
    let finalState = null;
    let finalCounts = { desired: {}, current: {}, excess: {} };
    try {
      finalState = await c12Bounded('topology-final-state-read', () => loadFleetState());
      finalCounts = c12Module().topologyPlanV2(finalState, { now: at, heartbeatMaxAgeMs: C12_HEARTBEAT_MAX_AGE_MS });
      lastAuthenticatedCounts = finalCounts;
    } catch (error) {
      cleanupWarnings.push(c12Warning(String(error).includes('timeout') ? 'topology-final-state-timeout' : 'topology-final-state-failed', error));
      finalCounts = lastAuthenticatedCounts;
    }
    let deferredRemovals = Object.values(finalCounts.excess).reduce((sum, value) => sum + value, 0);
    const summary = { created, removed, deferredRemovals, errors };
    let summaryCounts = null;
    try {
      const journaled = await mutateFleet((state) => {
        const current = c12Module().topologyPlanV2(state, { now: at, heartbeatMaxAgeMs: C12_HEARTBEAT_MAX_AGE_MS });
        summaryCounts = { desired: current.desired, current: current.current };
        const next = globalThis.ModelFleetStateM7C3.appendJournal(state, 'topology.reconciled', `fleet topology reconciled: +${created.length} / -${removed.length}`, { ...summary, counts: { desired: current.desired, current: current.current } }, at);
        replaceC3State(state, next);
        return { counts: { desired: current.desired, current: current.current } };
      });
      finalState = journaled.state;
    } catch (error) { cleanupWarnings.push(c12Warning('topology-reconciled-journal-failed', error)); }
    if (summaryCounts) deferredRemovals = Object.keys(summaryCounts.current).reduce((sum, roleId) => sum + Math.max(0, Number(summaryCounts.current[roleId] || 0) - Number(summaryCounts.desired[roleId] || 0)), 0);
    const resultCounts = summaryCounts || { desired: finalCounts.desired, current: finalCounts.current };
    const result = { created, removed, deferredRemovals, errors, cleanupWarnings, counts: resultCounts };
    schedule().catch(() => {});
    return result;
  })();
  try { return await globalThis.topologyReconcilePromiseC12; }
  finally { globalThis.topologyReconcilePromiseC12 = null; }
}
reconcileFleetTopology = reconcileFleetTopologyC12;

// C13 v2 settings/control-intent overlay. Version-1 branches remain the
// original inline mutations and response shapes; C14+ operator APIs remain
// outside this boundary.
importScripts('fleet-state-model-m7-c13.js');
function c13Module() { return globalThis.ModelFleetStateM7C13; }
const c13LegacySnapshot = publicSnapshot;

async function setWorkspacePathC13Dispatch(message) {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) {
    const committed = await mutateFleet((state) => {
      state.workspacePath = String(message.workspacePath || '').trim();
      appendJournal(state, 'workspace.path.changed', state.workspacePath || 'Workspace path cleared');
    });
    return { snapshot: c13LegacySnapshot(committed.state) };
  }
  const at = now();
  const committed = await mutateFleet((state) => {
    const outcome = c13Module().setWorkspacePathV2(state, { workspacePath: message.workspacePath, at });
    replaceC3State(state, outcome.state);
    return outcome.result;
  });
  return committed.result;
}

async function setGoalC13Dispatch(message) {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) {
    const committed = await mutateFleet((state) => {
      state.goal = String(message.goal || '').trim();
      state.lastGoalContinuationKey = '';
      appendJournal(state, 'goal.changed', state.goal || 'Goal cleared');
    });
    schedule().catch(() => {});
    return { snapshot: c13LegacySnapshot(committed.state) };
  }
  const at = now();
  const committed = await mutateFleet((state) => {
    const outcome = c13Module().setGoalV2(state, { goal: message.goal, at });
    replaceC3State(state, outcome.state);
    return outcome.result;
  });
  schedule().catch(() => {});
  return committed.result;
}

async function updatePolicyC13Dispatch(message) {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) {
    const committed = await mutateFleet((state) => {
      const patch = message.patch || {};
      if (Object.prototype.hasOwnProperty.call(patch, 'maxConcurrency')) {
        state.policy.maxConcurrency = Math.max(1, Math.min(64, Number(patch.maxConcurrency || 1)));
      }
      if (Object.prototype.hasOwnProperty.call(patch, 'paused')) state.policy.paused = patch.paused === true;
      if (Object.prototype.hasOwnProperty.call(patch, 'authorityEnabled')) state.policy.authorityEnabled = patch.authorityEnabled === true;
      if (Object.prototype.hasOwnProperty.call(patch, 'activeWorkerWindows')) state.policy.activeWorkerWindows = patch.activeWorkerWindows !== false;
      if (Object.prototype.hasOwnProperty.call(patch, 'warmIdleMs')) state.policy.warmIdleMs = boundedWarmIdleMs(patch.warmIdleMs);
      appendJournal(state, 'policy.changed', 'Execution policy updated', { ...state.policy });
    });
    schedule().catch(() => {});
    return { snapshot: c13LegacySnapshot(committed.state) };
  }
  const at = now();
  const committed = await mutateFleet((state) => {
    const outcome = c13Module().updatePolicyV2(state, { patch: message.patch || {}, at });
    replaceC3State(state, outcome.state);
    return outcome.result;
  });
  schedule().catch(() => {});
  return committed.result;
}

// C14 v2 operator work overlay. Legacy handlers remain isolated behind the
// persisted-version branch and retain their snapshot response contracts.
importScripts('fleet-state-model-m7-c14.js');
function c14Module() { return globalThis.ModelFleetStateM7C14; }
const c14LegacySnapshot = globalThis['publicSnapshot'];
const c14LegacyCreateTask = globalThis['createTaskInState'];
const c14LegacyQueueMessage = globalThis['queueSemanticMessage'];
const c14LegacyAdmission = globalThis['scheduleMessageUntilAdmitted'];
const C14_ADMISSION_TIMEOUT_MS = C7_STOP_TRANSPORT_TIMEOUT_MS;

async function c14AdmissionBounded(stage, operation) {
  let timer;
  try {
    return await Promise.race([
      Promise.resolve().then(operation),
      new Promise((_, reject) => {
        timer = setTimeout(() => {
          const error = new Error(`${stage}-timeout`);
          error.reason = stage === 'schedule' ? 'schedule-timeout' : 'admission-state-read-timeout';
          reject(error);
        }, C14_ADMISSION_TIMEOUT_MS);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function scheduleMessageUntilAdmittedC14(messageId, maxAttempts = 5) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    await c14AdmissionBounded('schedule', () => schedule());
    const state = await c14AdmissionBounded('admission-state-read', () => loadFleetState());
    const message = state.messages.find((item) => item.id === messageId);
    if (!message || message.phase !== 'queued') return message || null;
    if (attempt + 1 < maxAttempts) await delay(250);
  }
  const finalState = await c14AdmissionBounded('admission-state-read', () => loadFleetState());
  return finalState.messages.find((item) => item.id === messageId) || null;
}

async function createTaskC14Dispatch(message) {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) {
    const committed = await mutateFleet((state) => c14LegacyCreateTask(state, {
      title: message.title,
      prompt: message.prompt,
      role: message.role,
      priority: message.priority,
      dependencies: message.dependencies,
      createdByRole: 'operator',
    }, { allowCoordinator: true }));
    schedule().catch(() => {});
    return { task: committed.result, snapshot: c14LegacySnapshot(committed.state) };
  }
  const createdAt = now();
  const committed = await mutateFleet((state) => {
    const outcome = c14Module().createTaskV2(state, {
      title: message.title,
      prompt: message.prompt,
      role: message.role,
      priority: message.priority,
      dependencies: message.dependencies,
    }, { createdAt });
    replaceC3State(state, outcome.state);
    return outcome.result;
  });
  schedule().catch(() => {});
  return committed.result;
}

async function retryTaskC14Dispatch(message) {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) {
    const committed = await mutateFleet((state) => {
      const task = state.tasks[message.taskId];
      if (!task) throw new Error('task not found');
      if (task['status'] === 'running') throw new Error('task is currently running');
      task['status'] = 'pending';
      task.assignedWorkerId = null;
      task['assignmentId'] = null;
      task.result = '';
      task['statusNote'] = '';
      task.autoRecoveryAttempts = 0;
      task.lastAutoRecoveryReason = '';
      appendJournal(state, 'task.retried', `${task.id} queued for retry`);
    });
    schedule().catch(() => {});
    return { snapshot: c14LegacySnapshot(committed.state) };
  }
  const at = now();
  const committed = await mutateFleet((state) => {
    const outcome = c14Module().retryTaskV2(state, { taskId: message.taskId, at });
    replaceC3State(state, outcome.state);
    return outcome.result;
  });
  schedule().catch(() => {});
  return committed.result;
}

async function sendMessageC14Dispatch(message) {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) {
    const committed = await mutateFleet((state) => {
      const target = String(message.toWorkerId || '').trim();
      if (target !== 'operator' && !state.workers[target]) throw new Error('target worker not found');
      const queued = c14LegacyQueueMessage(state, { from: 'operator', toWorkerId: target, body: message.body, taskId: message.taskId || null });
      if (!queued.body) throw new Error('message body is required');
      return queued;
    });
    let scheduleError = null;
    try { await c14LegacyAdmission(committed.result.id); }
    catch (error) { scheduleError = String(error); }
    return { message: committed.result, scheduleError, snapshot: c14LegacySnapshot(await loadFleetState()) };
  }
  const createdAt = now();
  const committed = await mutateFleet((state) => {
    const outcome = c14Module().queueMessageV2(state, {
      toWorkerId: message.toWorkerId,
      body: message.body,
      taskId: message.taskId || null,
    }, { createdAt });
    replaceC3State(state, outcome.state);
    return outcome.result;
  });
  let scheduleError = null;
  try {
    const admitted = await scheduleMessageUntilAdmittedC14(committed.result.message.id);
    if (admitted && admitted.phase === 'queued') scheduleError = 'message admission attempts exhausted';
  } catch (error) {
    scheduleError = String(error);
  }
  return { message: committed.result.message, scheduleError };
}

// C15 v2 completed-record pruning overlay. The legacy status-based branch is
// preserved inside the dispatcher for version 1 only.
importScripts('fleet-state-model-m7-c15.js');
function c15Module() { return globalThis.ModelFleetStateM7C15; }
const c15LegacySnapshot = globalThis['publicSnapshot'];

async function clearCompletedC15Dispatch() {
  const loaded = await loadFleetState();
  if (loaded.version !== 2) {
    const committed = await mutateFleet((state) => {
      for (const [id, task] of Object.entries(state.tasks)) {
        if (task['status'] === 'done') delete state.tasks[id];
      }
      state.messages = state.messages.filter((message) => message['status'] !== 'done');
      appendJournal(state, 'state.pruned', 'Completed tasks/messages cleared');
    });
    return { snapshot: c15LegacySnapshot(committed.state) };
  }
  const at = now();
  const committed = await mutateFleet((state) => {
    const outcome = c15Module().clearCompletedV2(state, { at });
    replaceC3State(state, outcome.state);
    return outcome.result;
  });
  return committed.result;
}

// C16 background projection/transport overlay.  Control-pane consumption and
// the v2 persistence connection remain outside this slice.
importScripts('fleet-state-model-m7-c16.js');
const publicSnapshotC16Legacy = publicSnapshot;
const broadcastSnapshotC16Legacy = broadcastSnapshot;
const broadcastHeartbeatDeltaC16Legacy = broadcastHeartbeatDelta;
function c16Module() { return globalThis.ModelFleetStateM7C16; }

publicSnapshot = function publicSnapshotC16(state) {
  if (state?.version !== 2) return publicSnapshotC16Legacy(state);
  const observedAt = now();
  return c16Module().projectPublicSnapshotV2(state, { observedAt });
};

async function broadcastSnapshotC16(state) {
  if (state?.version !== 2) return broadcastSnapshotC16Legacy(state);
  try {
    const observedAt = now();
    const snapshot = c16Module().projectPublicSnapshotV2(state, { observedAt });
    await chrome.runtime.sendMessage({ type: 'fleet:snapshot-changed', snapshot });
  } catch {
    // No control pane listening, or projection was rejected.
  }
}
broadcastSnapshot = broadcastSnapshotC16;

async function broadcastHeartbeatDeltaC16(input, stateHint = null) {
  if (stateHint?.version !== 2) return broadcastHeartbeatDeltaC16Legacy(input);
  if (!stateHint && (!Array.isArray(input) && Object.values(input || {}).some((row) => Object.prototype.hasOwnProperty.call(row || {}, 'heartbeatAt')))) return broadcastHeartbeatDeltaC16Legacy(input);
  const state = stateHint || await loadFleetState();
  if (state?.version !== 2) return broadcastHeartbeatDeltaC16Legacy(input);
  try {
    const rows = Array.isArray(input)
      ? input
      : Object.entries(input || {}).map(([workerId, value]) => ({ workerId, ...value }));
    const observations = rows.map((row) => ({
      workerId: row.workerId,
      observedAt: Number(row.observedAt ?? row.at ?? row.heartbeatAt),
      ...(Object.prototype.hasOwnProperty.call(row, 'busy') ? { busy: row.busy } : {}),
      ...(Object.prototype.hasOwnProperty.call(row, 'runtimeBusy') ? { busy: row.runtimeBusy } : {}),
      ...(Object.prototype.hasOwnProperty.call(row, 'title') ? { title: row.title } : {}),
      ...(Object.prototype.hasOwnProperty.call(row, 'url') ? { url: row.url } : {}),
      ...(Object.prototype.hasOwnProperty.call(row, 'windowId') ? { windowId: row.windowId } : {}),
    }));
    const serverNow = Math.max(now(), ...observations.map((row) => row.observedAt));
    const deltas = observations.map((row) => c16Module().projectHeartbeatDeltaV2({ ...row, serverNow }));
    await chrome.runtime.sendMessage({ type: 'fleet:heartbeats-v2', deltas, serverNow });
  } catch {
    // Heartbeat deltas are display-only and listener absence is fail-soft.
  }
}
broadcastHeartbeatDelta = broadcastHeartbeatDeltaC16;

const flushWorkerHeartbeatsC16Legacy = flushWorkerHeartbeats;
flushWorkerHeartbeats = async function flushWorkerHeartbeatsC16() {
  const pending = new Map(liveHeartbeats);
  const result = await flushWorkerHeartbeatsC16Legacy();
  if (result?.state?.version === 2 && pending.size) {
    const observations = [...pending.entries()].map(([workerId, row]) => ({ workerId, ...row }));
    await broadcastHeartbeatDeltaC16(observations, result.state);
  }
  return result;
};

async function getTabWorkerStateC16Dispatch(message) {
  const state = await loadFleetState();
  if (state?.version !== 2) return { worker: workerForTab(state, message.tabId) || null };
  const workerId = workerIdForTabInState(state, message.tabId);
  if (!workerId) return { worker: null };
  return { worker: c16Module().projectWorkerV2(state, workerId, { observedAt: now() }) };
}

// C18 is the persistence connection. C1 remains the schema/quiescence
// authority; this boundary makes v2 the only runtime key after one successful
// migration and routes every later load/mutate commit through v2 storage.
importScripts('fleet-state-model-m7-c18.js');
function c18Module() { return globalThis.ModelFleetStateM7C18; }
let c18LoadInFlight = null;

function c18MigrationInputs() {
  const observations = [...liveHeartbeats.values()];
  return {
    liveHeartbeats: observations,
    pendingCompletionHandoff: observations.some((row) => row?.pendingCompletion === true || row?.recoveringCompletion === true),
  };
}

async function loadFleetStateC18() {
  if (c18LoadInFlight) return c18LoadInFlight;
  const observedAt = now();
  const inputs = c18MigrationInputs();
  c18LoadInFlight = c18Module().loadFleetStateV2(chrome.storage.local, {
    ...inputs,
    createdAt: observedAt,
    migrationObservedAt: observedAt,
    conversionAt: observedAt,
  }).then((result) => result.state).finally(() => { c18LoadInFlight = null; });
  return c18LoadInFlight;
}

async function saveFleetStateC18(state) {
  return c18Module().saveFleetStateV2(chrome.storage.local, state);
}

loadFleetState = loadFleetStateC18;

mutateFleet = function mutateFleetC18(mutator) {
  const c18Queue = stateQueue;
  const operation = c18Queue.then(async () => {
    const state = await loadFleetStateC18();
    const result = await mutator(state);
    recordRoleActivity(state);
    state.generation = Math.max(1, Number(state.generation || 0) + 1);
    state.updatedAt = now();
    const committedState = await saveFleetStateC18(state);
    await broadcastSnapshot(committedState);
    return { state: committedState, result };
  });
  stateQueue = operation.catch(() => {});
  return operation;
};

// C19 closes the runtime authority boundary without deleting C1 migration or
// v1 compatibility code.  These wrappers validate every runtime state at the
// v2 load/save edge; they do not add a second storage key or authority path.
importScripts('fleet-state-model-m7-c19.js');
function c19Module() { return globalThis.ModelFleetStateM7C19; }
const loadFleetStateC18Authority = loadFleetState;
const saveFleetStateC18Authority = saveFleetStateC18;

async function loadFleetStateC19() {
  return c19Module().assertV2State(await loadFleetStateC18Authority());
}

async function saveFleetStateC19(state) {
  return c19Module().assertV2State(await saveFleetStateC18Authority(state));
}

loadFleetState = loadFleetStateC19;
saveFleetStateC18 = saveFleetStateC19;

// C20/M8 is mechanical ownership only.  The existing background functions
// remain the executable implementations; these registries make state and
// protocol ownership explicit without changing their behavior or authority.
importScripts('fleet-state.js', 'fleet-protocol.js');
