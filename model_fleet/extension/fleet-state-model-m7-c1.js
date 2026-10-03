'use strict';

// C1 persistence boundary. This is intentionally a browser-compatible plain
// script; C2+ will replace the remaining v1 scheduler/mutator consumers.
(function installM7C1(global) {
  const V1_STORAGE_KEY = 'modelFleetState:v1';
  const V2_STORAGE_KEY = 'modelFleetState:v2';
  const TASK_PHASES = ['pending', 'running', 'done', 'blocked', 'cancelled'];
  const MESSAGE_PHASES = ['queued', 'running', 'done', 'blocked', 'cancelled', 'delivered'];
  const V2_LEGACY_FIELDS = Object.freeze([
    ['task', 'status', 'legacy-v2-task-status'],
    ['task', 'assignmentId', 'legacy-v2-task-assignment-id'],
    ['message', 'status', 'legacy-v2-message-status'],
    ['message', 'assignmentId', 'legacy-v2-message-assignment-id'],
    ['worker', 'currentAssignmentKind', 'legacy-v2-worker-current-assignment-kind'],
    ['worker', 'currentAssignmentStartedAt', 'legacy-v2-worker-current-assignment-start'],
    ['worker', 'currentTaskId', 'legacy-v2-worker-current-task'],
    ['worker', 'currentMessageId', 'legacy-v2-worker-current-message'],
    ['worker', 'currentMessageIds', 'legacy-v2-worker-current-messages'],
    ['worker', 'currentControlNoticeIds', 'legacy-v2-worker-current-control-notices'],
    ['worker', 'status', 'legacy-v2-worker-status'],
    ['worker', 'busy', 'legacy-v2-worker-busy'],
    ['worker', 'heartbeatAt', 'legacy-v2-worker-heartbeat-at'],
  ]);
  const ROLE_IDS = ['coordinator', 'implementation', 'review'];
  const MAX_MESSAGES = 250;
  const MAX_JOURNAL = 250;
  const MAX_ROLE_ACTIVITY_SAMPLES = 8000;
  const ROLE_ACTIVITY_RETENTION_MS = 24 * 60 * 60 * 1000;
  const DEFAULT_WARM_IDLE_MS = 60000;
  const MAX_TURNS_PER_CHAT = 10;
  const FAULT_CODES = Object.freeze([
    'dispatch-failed', 'heartbeat-custody-mismatch', 'chat-rotation-failed',
    'm4-custody-contradiction', 'legacy-blocked',
  ]);

  function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  function own(value, key) {
    return Object.prototype.hasOwnProperty.call(value, key);
  }

  function clone(value) {
    if (typeof global.structuredClone === 'function') return global.structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function blocked(reason, prefix = 'M7 C1 persistence blocked') {
    const error = new Error(`${prefix}: ${reason}`);
    error.code = 'M7_C1_BLOCKED';
    error.reason = reason;
    return error;
  }

  function decision(allowed, reason) { return { allowed, reason }; }

  function canonicalRole(role) {
    const value = String(role || '').trim().toLowerCase();
    if (['generalist', 'research', 'architect'].includes(value)) return 'coordinator';
    if (['test', 'integrator', 'verifier', 'verifier-integrator', 'verifier / integrator'].includes(value)) return 'review';
    return ROLE_IDS.includes(value) ? value : 'coordinator';
  }

  function boundedTurnLimit(value) {
    const parsed = Math.trunc(Number(value));
    return Math.max(1, Math.min(50, Number.isFinite(parsed) && parsed > 0 ? parsed : MAX_TURNS_PER_CHAT));
  }

  function boundedWarmIdle(value) {
    return Math.max(10000, Math.min(300000, Number(value) || DEFAULT_WARM_IDLE_MS));
  }

  function boundedNonnegative(value) {
    const parsed = Number(value || 0);
    return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
  }

  function normalizeV1ForMigration(raw, migrationObservedAt) {
    if (!isObject(raw)) throw blocked('invalid-v1-state-shape');
    if (!Number.isFinite(migrationObservedAt) || migrationObservedAt <= 0) throw blocked('migration-observed-at-required');
    const source = clone(raw);
    const storedPolicy = isObject(source.policy) ? source.policy : {};
    const policy = {
      paused: own(storedPolicy, 'paused') ? storedPolicy.paused : false,
      authorityEnabled: own(storedPolicy, 'authorityEnabled') ? storedPolicy.authorityEnabled : true,
      maxConcurrency: own(storedPolicy, 'maxConcurrency') ? storedPolicy.maxConcurrency : 8,
      activeWorkerWindows: own(storedPolicy, 'activeWorkerWindows') ? storedPolicy.activeWorkerWindows : true,
      warmIdleMs: own(storedPolicy, 'warmIdleMs') ? boundedWarmIdle(storedPolicy.warmIdleMs) : DEFAULT_WARM_IDLE_MS,
    };
    const rawTopology = isObject(source.topology) ? source.topology : {};
    const rawCounts = isObject(rawTopology.desiredRoleCounts) ? rawTopology.desiredRoleCounts : {};
    const rawTurns = isObject(rawTopology.maxTurnsPerChatByRole) ? rawTopology.maxTurnsPerChatByRole : {};
    const legacyTurnLimit = boundedTurnLimit(storedPolicy.maxTurnsPerChat);
    if (rawCounts.coordinator === undefined && rawCounts.generalist !== undefined) rawCounts.coordinator = rawCounts.generalist;
    if (rawTurns.coordinator === undefined && rawTurns.generalist !== undefined) rawTurns.coordinator = rawTurns.generalist;
    const topology = { desiredRoleCounts: {}, maxTurnsPerChatByRole: {} };
    for (const role of ROLE_IDS) {
      const count = Number(rawCounts[role]);
      topology.desiredRoleCounts[role] = Math.max(0, Math.min(16, Math.trunc(Number.isFinite(count) ? count : (role === 'coordinator' || role === 'implementation' || role === 'review' ? 1 : 0))));
      topology.maxTurnsPerChatByRole[role] = boundedTurnLimit(
        rawTurns[role] === undefined ? legacyTurnLimit : rawTurns[role],
      );
    }
    const rawWorkers = isObject(source.workers) ? source.workers : {};
    const durableIds = Object.keys(rawWorkers).filter((id) => /^W-S\d{4,}$/.test(id));
    let nextWorkerSlot = Math.max(1, Math.trunc(Number(source.nextWorkerSlot) || 1));
    for (const id of durableIds) nextWorkerSlot = Math.max(nextWorkerSlot, Number(id.slice(4)) + 1);
    const workerEntries = Object.entries(rawWorkers).sort(([a], [b]) => {
      const ad = /^W-S\d{4,}$/.test(a); const bd = /^W-S\d{4,}$/.test(b);
      if (ad !== bd) return ad ? -1 : 1;
      return a.localeCompare(b, undefined, { numeric: true });
    });
    const workerMap = {};
    const workerRefs = new Map();
    for (const [oldId, rawWorker] of workerEntries) {
      if (!isObject(rawWorker)) throw blocked('invalid-v1-worker-entry');
      const id = /^W-S\d{4,}$/.test(oldId) ? oldId : `W-S${String(nextWorkerSlot++).padStart(4, '0')}`;
      if (id !== oldId) workerRefs.set(oldId, id);
      const worker = { ...rawWorker, id, role: canonicalRole(rawWorker.role) };
      if (id !== oldId) worker.legacyWorkerId = worker.legacyWorkerId || oldId;
      worker.topologyManaged = worker.topologyManaged === true;
      worker.chatTurnCount = Math.max(0, Math.trunc(Number(worker.chatTurnCount || 0)));
      worker.chatRotationPending = worker.chatRotationPending === true
        || worker.chatTurnCount >= topology.maxTurnsPerChatByRole[worker.role];
      worker.currentMessageIds = Array.from(new Set([
        ...(Array.isArray(worker.currentMessageIds) ? worker.currentMessageIds : []),
        ...(worker.currentMessageId ? [worker.currentMessageId] : []),
      ].map(String).filter(Boolean)));
      worker.currentMessageId = worker.currentMessageIds[0] || null;
      worker.currentAssignmentKind = String(worker.currentAssignmentKind || (worker.currentTaskId ? 'task' : (worker.currentMessageId ? 'message' : '')));
      worker.currentControlNoticeIds = Array.isArray(worker.currentControlNoticeIds)
        ? Array.from(new Set(worker.currentControlNoticeIds.map(String).filter(Boolean))) : [];
      worker.controlInbox = Array.isArray(worker.controlInbox) ? worker.controlInbox.slice(-32) : [];
      worker.lastCountedAssignmentId = String(worker.lastCountedAssignmentId || '');
      worker.lastResponseTerminalAt = Number(worker.lastResponseTerminalAt || 0);
      worker.lastAssignmentReleasedAt = Number(worker.lastAssignmentReleasedAt || 0);
      worker.lastCompletionReleaseLagMs = boundedNonnegative(worker.lastCompletionReleaseLagMs);
      worker.completionReleaseLagCount = boundedNonnegative(worker.completionReleaseLagCount);
      worker.completionReleaseLagTotalMs = boundedNonnegative(worker.completionReleaseLagTotalMs);
      worker.completionReleaseLagMaxMs = boundedNonnegative(worker.completionReleaseLagMaxMs);
      if (['sleeping', 'parking'].includes(worker.lifecycle)) worker.lifecycle = 'idle';
      delete worker.sleepTabId;
      delete worker.sleepingSince;
      workerMap[id] = worker;
    }
    const rewrite = (value) => workerRefs.get(value) || value;
    const tasks = isObject(source.tasks) ? source.tasks : {};
    for (const task of Object.values(tasks)) {
      if (isObject(task)) {
        if (task.assignedWorkerId) task.assignedWorkerId = rewrite(task.assignedWorkerId);
        if (task.completedByWorkerId) task.completedByWorkerId = rewrite(task.completedByWorkerId);
      }
    }
    const messages = Array.isArray(source.messages) ? source.messages.slice(-MAX_MESSAGES) : [];
    for (const message of messages) {
      if (message.fromWorkerId) message.fromWorkerId = rewrite(message.fromWorkerId);
      if (message.toWorkerId && !['operator', 'scheduler'].includes(message.toWorkerId)) message.toWorkerId = rewrite(message.toWorkerId);
    }
    const roleActivity = Array.isArray(source.roleActivity)
      ? source.roleActivity.filter((sample) => isObject(sample)
        && Number(sample.at) >= migrationObservedAt - ROLE_ACTIVITY_RETENTION_MS
        && isObject(sample.roles)).slice(-MAX_ROLE_ACTIVITY_SAMPLES) : [];
    const defaultSource = {
      version: 1,
      generation: 1,
      goal: '',
      lastGoalContinuationKey: '',
      workspacePath: '',
      policy: {
        paused: false,
        authorityEnabled: true,
        maxConcurrency: 8,
        activeWorkerWindows: true,
        warmIdleMs: DEFAULT_WARM_IDLE_MS,
      },
      topology: {
        desiredRoleCounts: { coordinator: 1, implementation: 1, review: 1 },
        maxTurnsPerChatByRole: { coordinator: 10, implementation: 10, review: 10 },
      },
      workers: {}, tasks: {}, messages: [], journal: [], roleActivity: [],
      nextTask: 1, nextMessage: 1, nextWorkerSlot: 1,
      createdAt: migrationObservedAt, updatedAt: migrationObservedAt,
    };
    const normalized = {
      ...defaultSource,
      ...source,
      policy,
      topology,
      workers: workerMap,
      nextWorkerSlot,
      tasks,
      messages,
      journal: Array.isArray(source.journal) ? source.journal.slice(-MAX_JOURNAL) : [],
      roleActivity,
    };
    for (const key of ['generation', 'nextTask', 'nextMessage', 'nextWorkerSlot']) {
      if (!Number.isFinite(Number(normalized[key]))) normalized[key] = defaultSource[key];
    }
    if (!Number.isFinite(Number(normalized.createdAt)) || Number(normalized.createdAt) <= 0) normalized.createdAt = migrationObservedAt;
    if (!Number.isFinite(Number(normalized.updatedAt)) || Number(normalized.updatedAt) <= 0) normalized.updatedAt = migrationObservedAt;
    return normalized;
  }

  function assertRuntime(worker) {
    if (!isObject(worker.runtime)) throw blocked('invalid-worker-runtime');
    if (!Number.isFinite(worker.runtime.lastHeartbeatAt) || worker.runtime.lastHeartbeatAt < 0) throw blocked('invalid-runtime-heartbeat');
    if (typeof worker.runtime.busy !== 'boolean') throw blocked('invalid-runtime-busy');
    if (worker.runtime.reportedAssignmentId !== null
      && (typeof worker.runtime.reportedAssignmentId !== 'string' || !worker.runtime.reportedAssignmentId)) {
      throw blocked('invalid-runtime-reported-assignment');
    }
    if (Object.prototype.hasOwnProperty.call(worker.runtime, 'turnHealth')
      && !['idle', 'busy', 'stalled', 'dead', 'interrupted'].includes(worker.runtime.turnHealth)) {
      throw blocked('invalid-runtime-turn-health');
    }
    for (const key of ['turnBusySince', 'turnLastProgressAt', 'turnStalledSince', 'turnRecoveryAt', 'turnRecoveryBusySince']) {
      if (Object.prototype.hasOwnProperty.call(worker.runtime, key)
        && (!Number.isFinite(worker.runtime[key]) || worker.runtime[key] < 0)) {
        throw blocked('invalid-runtime-' + key);
      }
    }
    if (Object.prototype.hasOwnProperty.call(worker.runtime, 'turnRecoveryAttempts')
      && (!Number.isInteger(worker.runtime.turnRecoveryAttempts) || worker.runtime.turnRecoveryAttempts < 0 || worker.runtime.turnRecoveryAttempts > 1)) {
      throw blocked('invalid-runtime-turn-recovery-attempts');
    }
  }

  function assertFault(worker) {
    if (worker.fault == null) return;
    if (!isObject(worker.fault) || typeof worker.fault.code !== 'string' || !worker.fault.code
      || worker.fault.code.length > 80 || !FAULT_CODES.includes(worker.fault.code)
      || typeof worker.fault.message !== 'string' || worker.fault.message.length > 2000
      || !Number.isFinite(worker.fault.at) || worker.fault.at <= 0
      || (worker.fault.assignmentId !== null && worker.fault.assignmentId !== undefined
        && (typeof worker.fault.assignmentId !== 'string' || !worker.fault.assignmentId))) {
      throw blocked('invalid-worker-fault');
    }
  }

  function assertFleetInvariantsV2(state) {
    const workers = state.workers;
    const assignments = state.assignments;
    const tasks = state.tasks;
    const messages = state.messages;
    const assignmentOwners = new Map();
    for (const [id, assignment] of Object.entries(assignments)) {
      if (!isObject(assignment) || assignment.id !== id) throw blocked(`assignment-key-id-mismatch:${id}`);
      const worker = workers[assignment.workerId];
      if (!worker) throw blocked(`assignment-missing-worker:${id}`);
      if (worker.currentAssignmentId !== id) throw blocked(`assignment-missing-reciprocal-worker:${id}`);
      if (!['task', 'message', 'control'].includes(assignment.kind)) throw blocked(`assignment-unknown-kind:${id}`);
      if (!['reserved', 'activating', 'running', 'completing'].includes(assignment.phase)) throw blocked(`assignment-unknown-phase:${id}`);
      const messageIds = Array.isArray(assignment.messageIds) ? assignment.messageIds : [];
      const controlIds = Array.isArray(assignment.controlNoticeIds) ? assignment.controlNoticeIds : [];
      if (assignment.kind === 'task' && (typeof assignment.taskId !== 'string' || !assignment.taskId || messageIds.length)) throw blocked(`assignment-task-shape:${id}`);
      if (assignment.kind === 'task' && Array.isArray(assignment.taskIds)) throw blocked(`assignment-task-shape:${id}`);
      if (assignment.kind === 'message' && (assignment.taskId != null || !messageIds.length)) throw blocked(`assignment-message-shape:${id}`);
      if (assignment.kind === 'control' && (assignment.taskId != null || messageIds.length || !controlIds.length)) throw blocked(`assignment-control-shape:${id}`);
      if (assignment.taskId != null && !tasks[assignment.taskId]) throw blocked(`assignment-missing-task:${id}`);
      for (const messageId of messageIds) {
        const message = messages.find((entry) => entry.id === messageId);
        if (!message) throw blocked(`assignment-missing-message:${id}`);
        if (message.toWorkerId !== assignment.workerId) throw blocked(`assignment-message-worker:${id}`);
        if (assignmentOwners.has(messageId)) throw blocked(`message-duplicate-assignment:${messageId}`);
        assignmentOwners.set(messageId, id);
      }
      const inbox = Array.isArray(worker.controlInbox)
        ? worker.controlInbox
        : (Array.isArray(worker.controlNotices) ? worker.controlNotices : []);
      for (const noticeId of controlIds) if (!inbox.some((notice) => (notice.id || notice) === noticeId)) throw blocked(`assignment-missing-control-notice:${id}`);
      if (assignment.taskId != null) {
        if (assignmentOwners.has(`task:${assignment.taskId}`)) throw blocked(`task-duplicate-assignment:${assignment.taskId}`);
        assignmentOwners.set(`task:${assignment.taskId}`, id);
      }
      if (assignment.phase === 'running'
        && worker.runtime?.reportedAssignmentId != null
        && worker.runtime.reportedAssignmentId !== id) {
        throw blocked(`running-assignment-heartbeat-mismatch:${id}`);
      }
    }
    for (const [workerId, worker] of Object.entries(workers)) {
      if (worker.id !== workerId) throw blocked(`worker-key-id-mismatch:${workerId}`);
      assertRuntime(worker);
      assertFault(worker);
      if (worker.currentAssignmentId != null) {
        const assignment = assignments[worker.currentAssignmentId];
        if (!assignment || assignment.workerId !== workerId) throw blocked(`worker-nonreciprocal-assignment:${workerId}`);
      }
    }
    for (const task of Object.values(tasks)) {
      if (!TASK_PHASES.includes(task.phase)) throw blocked(`unknown-task-phase:${task.id || ''}`);
      const owner = assignmentOwners.get(`task:${task.id}`);
      if (task.phase === 'running' && !owner) throw blocked(`running-task-without-assignment:${task.id}`);
      if (['pending', 'done', 'blocked', 'cancelled'].includes(task.phase) && owner) throw blocked(`inactive-task-with-assignment:${task.id}`);
    }
    for (const message of messages) {
      if (!MESSAGE_PHASES.includes(message.phase)) throw blocked(`unknown-message-phase:${message.id || ''}`);
      const owner = assignmentOwners.get(message.id);
      if (message.phase === 'running' && message.toWorkerId !== 'operator' && !owner) throw blocked(`running-message-without-assignment:${message.id}`);
      if (['queued', 'done', 'blocked', 'cancelled', 'delivered'].includes(message.phase) && owner) throw blocked(`inactive-message-with-assignment:${message.id}`);
      if (message.toWorkerId === 'operator' && message.phase === 'delivered' && owner) throw blocked(`operator-message-assigned:${message.id}`);
    }
    return true;
  }

  function convertLegacyWorkerRuntime(state, { conversionAt } = {}) {
    if (!Number.isFinite(conversionAt) || conversionAt <= 0) throw blocked('migration-observed-at-required');
    const next = clone(state);
    for (const [id, worker] of Object.entries(next.workers)) {
      if (own(worker, 'status') && (typeof worker.status !== 'string'
        || !['idle', 'waiting', 'blocked', 'stale', 'offline', 'activating', 'running', 'cancelling'].includes(worker.status))) {
        throw blocked(`invalid-legacy-status:${id}`);
      }
      if (worker.status === 'stale' && worker.lifecycle !== 'stale') throw blocked(`legacy-status-lifecycle-contradiction:${id}`);
      if (worker.status === 'offline' && worker.lifecycle !== 'offline') throw blocked(`legacy-status-lifecycle-contradiction:${id}`);
      if (['activating', 'running', 'cancelling'].includes(worker.status) && !worker.currentAssignmentId) {
        throw blocked(`legacy-active-status-custody-contradiction:${id}`);
      }
      if (own(worker, 'runtime')) throw blocked(`ambiguous-worker-runtime-authority:${id}`);
      if (own(worker, 'status') && own(worker, 'fault') && worker.fault != null) {
        assertFault(worker);
        throw blocked(`ambiguous-worker-fault-authority:${id}`);
      }
      const heartbeatAt = own(worker, 'heartbeatAt') ? worker.heartbeatAt : 0;
      const busy = own(worker, 'busy') ? worker.busy : false;
      if (!Number.isFinite(heartbeatAt) || heartbeatAt < 0) throw blocked(`invalid-runtime-heartbeat:${id}`);
      if (typeof busy !== 'boolean') throw blocked(`invalid-runtime-busy:${id}`);
      worker.runtime = { lastHeartbeatAt: heartbeatAt, busy, reportedAssignmentId: null };
      if (worker.status === 'blocked' && !worker.fault) {
        const rotation = worker.lifecycle === 'rotation-failed';
        const sourceFaultAt = Number.isFinite(worker.faultAt) && worker.faultAt > 0
          ? worker.faultAt
          : (rotation ? null : (Number.isFinite(worker.lastDispatchFailureAt) && worker.lastDispatchFailureAt > 0 ? worker.lastDispatchFailureAt : null));
        if (!sourceFaultAt && !Number.isFinite(conversionAt)) throw blocked(`missing-legacy-fault-at:${id}`);
        worker.fault = {
          code: rotation ? 'chat-rotation-failed' : 'legacy-blocked',
          message: rotation ? 'legacy chat rotation failed' : 'legacy blocked worker',
          at: sourceFaultAt || conversionAt,
          assignmentId: worker.currentAssignmentId || null,
        };
      } else if (!own(worker, 'fault')) worker.fault = null;
      delete worker.status;
      delete worker.busy;
      delete worker.heartbeatAt;
      delete worker.faultAt;
    }
    return next;
  }

  function validateV1Shape(state, liveHeartbeats) {
    if (!isObject(state)) return 'invalid-v1-state-shape';
    if (state.version !== 1) return 'not-v1-state';
    if (own(state, 'assignments')) return 'unexpected-v1-assignments';
    if (!isObject(state.workers)) return 'invalid-v1-workers-shape';
    if (!isObject(state.tasks)) return 'invalid-v1-tasks-shape';
    if (!Array.isArray(state.messages)) return 'invalid-v1-messages-shape';
    if (!Array.isArray(liveHeartbeats)) return 'invalid-live-heartbeats-shape';
    if (Object.values(state.workers).some((entry) => !isObject(entry))) return 'invalid-v1-worker-entry';
    if (Object.values(state.tasks).some((entry) => !isObject(entry))) return 'invalid-v1-task-entry';
    if (state.messages.some((entry) => !isObject(entry))) return 'invalid-v1-message-entry';
    if (liveHeartbeats.some((entry) => !isObject(entry))) return 'invalid-live-heartbeat-entry';
    return null;
  }

  function canMigrateV1ToV2({ state, liveHeartbeats, pendingCompletionHandoff } = {}) {
    const shapeReason = validateV1Shape(state, liveHeartbeats);
    if (shapeReason) return decision(false, shapeReason);
    if (pendingCompletionHandoff !== true && pendingCompletionHandoff !== false) {
      return decision(false, 'migration-evidence-required');
    }
    if (pendingCompletionHandoff) return decision(false, 'pending-completion-handoff');

    const workers = Object.values(state.workers);
    if (workers.some((worker) => worker.lifecycle === 'rotating')) return decision(false, 'rotation-in-progress');
    if (workers.some((worker) => worker.chatRotationPending === true)) return decision(false, 'rotation-pending');
    if (workers.some((worker) => worker.currentAssignmentId == null
      && typeof worker.currentAssignmentKind === 'string' && worker.currentAssignmentKind.trim())) {
      return decision(false, 'orphaned-worker-assignment-kind');
    }
    if (workers.some((worker) => worker.currentAssignmentId == null
      && Number(worker.currentAssignmentStartedAt) > 0)) {
      return decision(false, 'stale-worker-assignment-start');
    }
    if (workers.some((worker) => worker.currentAssignmentId
      || worker.currentTaskId
      || worker.currentMessageId
      || (Array.isArray(worker.currentMessageIds) && worker.currentMessageIds.length)
      || (Array.isArray(worker.currentControlNoticeIds) && worker.currentControlNoticeIds.length))) {
      return decision(false, 'active-worker-custody');
    }
    if (liveHeartbeats.some((heartbeat) => heartbeat.activeAssignmentId)) {
      return decision(false, 'reported-active-custody');
    }
    for (const task of Object.values(state.tasks)) {
      if (!TASK_PHASES.includes(task.status)) return decision(false, 'unknown-task-status');
      if (task.status === 'running') return decision(false, 'active-task-state');
      if (task.status === 'pending' && (task.assignmentId || task.assignedWorkerId)) {
        return decision(false, 'pending-task-custody');
      }
    }
    for (const message of state.messages) {
      if (!MESSAGE_PHASES.includes(message.status)) return decision(false, 'unknown-message-status');
      if (message.status === 'running') return decision(false, 'active-message-state');
      if (message.status === 'queued' && message.assignmentId) return decision(false, 'queued-message-custody');
      if (message.toWorkerId === 'operator' && message.status === 'delivered' && message.assignmentId) {
        return decision(false, 'delivered-operator-assignment');
      }
    }
    return decision(true, 'quiescent-v1');
  }

  function assertV2Candidate(state) {
    if (!isObject(state) || state.version !== 2) throw blocked('not-v2-state');
    if (!isObject(state.assignments)) throw blocked('invalid-v2-assignments-shape');
    if (!isObject(state.workers)) throw blocked('invalid-v2-workers-shape');
    if (!isObject(state.tasks)) throw blocked('invalid-v2-tasks-shape');
    if (!Array.isArray(state.messages)) throw blocked('invalid-v2-messages-shape');
    if (Object.values(state.workers).some((entry) => !isObject(entry))) throw blocked('invalid-v2-worker-entry');
    if (Object.values(state.tasks).some((entry) => !isObject(entry))) throw blocked('invalid-v2-task-entry');
    if (state.messages.some((entry) => !isObject(entry))) throw blocked('invalid-v2-message-entry');
    for (const [kind, field, reason] of V2_LEGACY_FIELDS) {
      const entries = kind === 'worker' ? Object.values(state.workers)
        : kind === 'task' ? Object.values(state.tasks) : state.messages;
      if (entries.some((entry) => own(entry, field))) throw blocked(reason, 'M7 C1 v2 normalization blocked');
    }
    for (const task of Object.values(state.tasks)) {
      if (!TASK_PHASES.includes(task.phase)) throw blocked('invalid-v2-task-phase');
    }
    for (const message of state.messages) {
      if (!MESSAGE_PHASES.includes(message.phase)) throw blocked('invalid-v2-message-phase');
    }
    assertFleetInvariantsV2(state);
    return state;
  }

  function normalizeV2FleetState(state) {
    return clone(assertV2Candidate(state));
  }

  function migrateFleetStateV1ToV2({ state, liveHeartbeats, pendingCompletionHandoff, migrationObservedAt, conversionAt } = {}) {
    const rawShapeReason = validateV1Shape(state, liveHeartbeats);
    if (rawShapeReason) throw blocked(rawShapeReason, 'M7 C1 migration blocked');
    if (!Number.isFinite(migrationObservedAt) || migrationObservedAt <= 0) throw blocked('migration-observed-at-required', 'M7 C1 migration blocked');
    const normalizedV1 = normalizeV1ForMigration(state, migrationObservedAt);
    const gate = canMigrateV1ToV2({ state: normalizedV1, liveHeartbeats, pendingCompletionHandoff });
    if (!gate.allowed) throw blocked(gate.reason, 'M7 C1 migration blocked');
    const candidate = clone(normalizedV1);
    candidate.version = 2;
    candidate.assignments = {};
    candidate.tasks = Object.fromEntries(Object.entries(candidate.tasks).map(([id, task]) => {
      const migrated = { ...task, phase: task.status };
      delete migrated.status;
      delete migrated.assignmentId;
      return [id, migrated];
    }));
    candidate.messages = candidate.messages.map((message) => {
      const migrated = { ...message, phase: message.status };
      delete migrated.status;
      delete migrated.assignmentId;
      return migrated;
    });
    candidate.workers = Object.fromEntries(Object.entries(candidate.workers).map(([id, worker]) => {
      const migrated = { ...worker, currentAssignmentId: null };
      delete migrated.currentAssignmentKind;
      delete migrated.currentAssignmentStartedAt;
      delete migrated.currentTaskId;
      delete migrated.currentMessageId;
      delete migrated.currentMessageIds;
      delete migrated.currentControlNoticeIds;
      return [id, migrated];
    }));
    const converted = convertLegacyWorkerRuntime(candidate, { conversionAt: conversionAt ?? migrationObservedAt });
    return normalizeV2FleetState(converted);
  }

  function freshFleetStateV2({ createdAt } = {}) {
    if (!Number.isFinite(createdAt) || createdAt <= 0) throw blocked('invalid-fresh-created-at');
    return {
      version: 2,
      assignments: {},
      generation: 1,
      goal: '',
      lastGoalContinuationKey: '',
      workspacePath: '',
      policy: { paused: false, authorityEnabled: true, maxConcurrency: 8, activeWorkerWindows: true, warmIdleMs: DEFAULT_WARM_IDLE_MS },
      topology: {
        desiredRoleCounts: { coordinator: 1, implementation: 1, review: 1 },
        maxTurnsPerChatByRole: { coordinator: MAX_TURNS_PER_CHAT, implementation: MAX_TURNS_PER_CHAT, review: MAX_TURNS_PER_CHAT },
      },
      workers: {},
      tasks: {},
      messages: [],
      journal: [],
      roleActivity: [],
      nextTask: 1,
      nextMessage: 1,
      nextWorkerSlot: 1,
      createdAt,
      updatedAt: createdAt,
    };
  }

  async function loadFleetStateV2(storage, { liveHeartbeats, pendingCompletionHandoff, createdAt, migrationObservedAt, conversionAt } = {}) {
    if (!storage || typeof storage.get !== 'function' || typeof storage.set !== 'function') {
      throw blocked('invalid-storage-boundary');
    }
    const v2Stored = await storage.get([V2_STORAGE_KEY]);
    if (isObject(v2Stored) && v2Stored[V2_STORAGE_KEY] !== undefined) {
      return { state: normalizeV2FleetState(v2Stored[V2_STORAGE_KEY]), migrated: false, writes: 0 };
    }
    const v1Stored = await storage.get([V1_STORAGE_KEY]);
    if (isObject(v1Stored) && v1Stored[V1_STORAGE_KEY] !== undefined) {
      const state = migrateFleetStateV1ToV2({ state: v1Stored[V1_STORAGE_KEY], liveHeartbeats, pendingCompletionHandoff, migrationObservedAt, conversionAt });
      await storage.set({ [V2_STORAGE_KEY]: state });
      return { state, migrated: true, writes: 1 };
    }
    const state = freshFleetStateV2({ createdAt });
    await storage.set({ [V2_STORAGE_KEY]: state });
    return { state, migrated: false, fresh: true, writes: 1 };
  }

  async function saveFleetStateV2(storage, state) {
    if (!storage || typeof storage.set !== 'function') throw blocked('invalid-storage-boundary');
    const normalized = normalizeV2FleetState(state);
    await storage.set({ [V2_STORAGE_KEY]: normalized });
    return normalized;
  }

  global.ModelFleetStateM7C1 = Object.freeze({
    V1_STORAGE_KEY,
    V2_STORAGE_KEY,
    normalizeV1ForMigration,
    canMigrateV1ToV2,
    migrateFleetStateV1ToV2,
    normalizeV2FleetState,
    freshFleetStateV2,
    loadFleetStateV2,
    saveFleetStateV2,
  });
}(globalThis));
