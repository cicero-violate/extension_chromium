'use strict';

// C2 scheduler reservation foundation. This is a browser-compatible plain
// script. Dispatch attempt/acceptance, release, completion, and recovery stay
// in the explicitly legacy C3+ branch until their bounded slices land.
(function installM7C2(global) {
  const C1 = global.ModelFleetStateM7C1;
  if (!C1) throw new Error('M7 C2 requires the C1 persistence boundary');
  const TASK_ROLES = ['coordinator', 'implementation', 'review'];
  const MAX_MESSAGE_BATCH_SIZE = 12;
  const MAX_MESSAGE_BATCH_CHARS = 12000;
  const MAX_CONTROL_NOTICES = 32;

  function isObject(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
  function clone(value) { return typeof global.structuredClone === 'function' ? global.structuredClone(value) : JSON.parse(JSON.stringify(value)); }
  function reject(reason) {
    const error = new Error(`M7 C2 reservation rejected: ${reason}`);
    error.code = 'M7_C2_REJECTED';
    error.reason = reason;
    return error;
  }
  function finitePositive(value) { return Number.isFinite(value) && value > 0; }
  function canonicalRole(role) {
    const value = String(role || '').trim().toLowerCase();
    if (['generalist', 'research', 'architect'].includes(value)) return 'coordinator';
    if (['test', 'integrator', 'verifier', 'verifier-integrator', 'verifier / integrator'].includes(value)) return 'review';
    return TASK_ROLES.includes(value) ? value : 'coordinator';
  }
  function normalize(state) {
    try { return C1.normalizeV2FleetState(state); }
    catch (error) { throw reject(`invalid-v2-state:${error.reason || error.message}`); }
  }
  function assertFinal(state) {
    try { return C1.normalizeV2FleetState(state); }
    catch (error) { throw reject(`invalid-v2-result:${error.reason || error.message}`); }
  }
  function workerBoundForDispatch(worker) {
    return worker && worker.enabled !== false && Number.isInteger(worker.tabId);
  }
  function workerAvailableByM5B(worker) {
    return worker
      && worker.enabled !== false
      && worker.lifecycle !== 'stale'
      && worker.lifecycle !== 'offline'
      && worker.tabAvailable !== false
      && (worker.tabAvailable === true || Number.isInteger(worker.tabId));
  }
  function validSchedulerTime(now, heartbeatMaxAgeMs) {
    return Number.isFinite(now) && now >= 0
      && Number.isFinite(heartbeatMaxAgeMs) && heartbeatMaxAgeMs >= 0;
  }
  function workerAvailabilityFromNormalized(state, workerId, { now, heartbeatMaxAgeMs = 30000 } = {}) {
    if (!validSchedulerTime(now, heartbeatMaxAgeMs)) throw reject('invalid-availability-time');
    const worker = state.workers[workerId];
    if (!worker || !workerAvailableByM5B(worker)) return 'offline';
    if (worker.fault != null) return 'blocked';
    if (worker.currentAssignmentId != null) return 'running';
    const heartbeat = worker.runtime.lastHeartbeatAt;
    const fresh = heartbeat > 0 && now >= heartbeat && now - heartbeat <= heartbeatMaxAgeMs;
    if (worker.runtime.busy === true && fresh) return 'busy';
    return 'idle';
  }
  function workerAvailability(state, workerId, options = {}) {
    return workerAvailabilityFromNormalized(normalize(state), workerId, options);
  }
  function schedulerWorkerEligibilityFromNormalized(state, workerId, { now, heartbeatMaxAgeMs = 30000 } = {}) {
    if (!validSchedulerTime(now, heartbeatMaxAgeMs)) throw reject('invalid-availability-time');
    const worker = state.workers[workerId];
    if (!worker) return { eligible: false, reason: 'worker-missing', availability: 'offline' };
    if (state.policy?.paused === true) return { eligible: false, reason: 'policy-paused', availability: 'idle' };
    if (state.policy?.authorityEnabled === false) return { eligible: false, reason: 'authority-disabled', availability: 'idle' };
    const availability = workerAvailabilityFromNormalized(state, workerId, { now, heartbeatMaxAgeMs });
    if (availability !== 'idle') return { eligible: false, reason: `availability-${availability}`, availability };
    if (!workerBoundForDispatch(worker)) return { eligible: false, reason: 'tab-unbound', availability };
    if (worker.chatRotationPending === true) return { eligible: false, reason: 'rotation-pending', availability };
    if (worker.lifecycle === 'rotating') return { eligible: false, reason: 'rotation-in-progress', availability };
    if (Number(worker.pageBusyUntil || 0) > now) return { eligible: false, reason: 'page-busy-cooldown', availability };
    if (worker.currentAssignmentId != null) return { eligible: false, reason: 'assignment-active', availability: 'running' };
    return { eligible: true, reason: 'eligible', availability };
  }
  function schedulerWorkerEligibility(state, workerId, options = {}) {
    return schedulerWorkerEligibilityFromNormalized(normalize(state), workerId, options);
  }
  function assignmentForWorkerV2(state, workerId) {
    const source = normalize(state);
    const worker = source.workers[workerId];
    if (!worker) throw reject('worker-not-found');
    if (worker.currentAssignmentId == null) return null;
    const assignment = source.assignments[worker.currentAssignmentId];
    if (!assignment || assignment.workerId !== workerId) throw reject('assignment-pointer-mismatch');
    return clone(assignment);
  }
  function activeAssignmentCount(state) { return Object.keys(normalize(state).assignments).length; }
  function controlIdsInInbox(worker, requested, required) {
    if (!Array.isArray(requested) || (required && requested.length === 0)) throw reject(required ? 'control-notices-required' : 'invalid-control-notices');
    const ids = requested.map(String);
    if (new Set(ids).size !== ids.length) throw reject('duplicate-control-notice');
    const inbox = Array.isArray(worker.controlInbox) ? worker.controlInbox : [];
    const inboxIds = inbox.map((notice) => String(notice?.id ?? notice));
    const duplicateRequested = ids.some((id) => inboxIds.filter((candidate) => candidate === id).length > 1);
    if (duplicateRequested) throw reject('duplicate-control-notice');
    if (ids.some((id) => !inboxIds.includes(id))) throw reject('control-notice-not-found');
    return inboxIds.filter((id) => ids.includes(id));
  }
  function resolveAssignmentPromptInputs(state, assignmentId) {
    const source = normalize(state);
    const assignment = source.assignments[assignmentId];
    if (!assignment) throw reject('assignment-not-found');
    const worker = source.workers[assignment.workerId];
    if (!worker || worker.currentAssignmentId !== assignmentId) throw reject('assignment-pointer-mismatch');
    const task = assignment.kind === 'task' ? source.tasks[assignment.taskId] : null;
    if (assignment.kind === 'task' && !task) throw reject('assignment-task-not-found');
    const messages = assignment.kind === 'message' ? assignment.messageIds.map((id) => source.messages.find((message) => message.id === id)) : [];
    if (messages.some((message) => !message)) throw reject('assignment-message-not-found');
    const inbox = Array.isArray(worker.controlInbox) ? worker.controlInbox : [];
    const controlNotices = assignment.controlNoticeIds.map((id) => inbox.find((notice) => String(notice?.id ?? notice) === String(id)));
    if (controlNotices.some((notice) => !notice)) throw reject('assignment-control-notice-not-found');
    return { assignment: clone(assignment), worker: clone(worker), task: clone(task), messages: clone(messages), controlNotices: clone(controlNotices), context: clone({ goal: source.goal, workspacePath: source.workspacePath, policy: source.policy, topology: source.topology }) };
  }
  function assignmentBase({ id, workerId, kind, taskId = null, messageIds = [], controlNoticeIds = [], reservedAt, metadata = {} }) {
    return { id, workerId, kind, taskId, messageIds, controlNoticeIds, phase: 'reserved', reservedAt, dispatchAttemptAt: 0, acceptedAt: 0, startedAt: 0, responseTerminalAt: 0, recoveryAttempt: 0, metadata: clone(metadata) };
  }
  function requireAvailableWorker(source, workerId, now, heartbeatMaxAgeMs) {
    const worker = source.workers[workerId];
    if (!worker) throw reject('worker-not-found');
    const eligibility = schedulerWorkerEligibility(source, workerId, { now, heartbeatMaxAgeMs });
    if (!eligibility.eligible) throw reject(eligibility.reason);
    return worker;
  }
  function workerInboxIds(worker) {
    return (Array.isArray(worker.controlInbox) ? worker.controlInbox : [])
      .slice(0, MAX_CONTROL_NOTICES)
      .map((notice) => String(notice?.id ?? notice));
  }
  function reserveTaskAssignment(state, { workerId, taskId, reservedAt, controlNoticeIds = [], metadata = {} } = {}) {
    const source = normalize(state);
    if (!finitePositive(reservedAt)) throw reject('invalid-reserved-at');
    const worker = source.workers[workerId];
    if (!worker || worker.currentAssignmentId != null) throw reject(worker ? 'worker-already-assigned' : 'worker-not-found');
    const task = source.tasks[taskId];
    if (!task) throw reject('task-not-found');
    if (task.id !== taskId) throw reject('task-identity-mismatch');
    if (task.phase !== 'pending') throw reject('task-not-pending');
    if (task.assignedWorkerId != null) throw reject('task-already-owned');
    const notices = controlIdsInInbox(worker, controlNoticeIds, false);
    const id = `A-${task.id}-${source.generation + 1}`;
    if (source.assignments[id]) throw reject('assignment-id-collision');
    const next = clone(source);
    next.tasks[taskId].phase = 'running';
    next.tasks[taskId].assignedWorkerId = workerId;
    next.tasks[taskId].startedAt = reservedAt;
    next.tasks[taskId].attempts = Number(next.tasks[taskId].attempts || 0) + 1;
    next.assignments[id] = assignmentBase({ id, workerId, kind: 'task', taskId, controlNoticeIds: notices, reservedAt, metadata });
    next.workers[workerId].currentAssignmentId = id;
    return assertFinal(next);
  }
  function orderedMessageBatch(source, seed) {
    if (!seed) return [];
    if (seed.requiresFleetMessage === true) return [seed];
    const candidates = source.messages.filter((message) => message.phase === 'queued' && message.toWorkerId === seed.toWorkerId && message.requiresFleetMessage !== true);
    const ordered = candidates.sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
    const batch = [];
    let chars = 0;
    for (const message of ordered) {
      const cost = String(message.body || '').length + 256;
      if (batch.length && (batch.length >= MAX_MESSAGE_BATCH_SIZE || chars + cost > MAX_MESSAGE_BATCH_CHARS)) break;
      batch.push(message);
      chars += cost;
      if (batch.length >= MAX_MESSAGE_BATCH_SIZE) break;
    }
    return batch.length ? batch : [seed];
  }
  function reserveMessageAssignment(state, { workerId, messageIds, reservedAt, controlNoticeIds = [], metadata = {} } = {}) {
    const source = normalize(state);
    if (!finitePositive(reservedAt)) throw reject('invalid-reserved-at');
    const worker = source.workers[workerId];
    if (!worker || worker.currentAssignmentId != null) throw reject(worker ? 'worker-already-assigned' : 'worker-not-found');
    if (!Array.isArray(messageIds) || !messageIds.length) throw reject('message-batch-invalid');
    const requestedIds = messageIds.map(String);
    if (new Set(requestedIds).size !== requestedIds.length) throw reject('message-batch-invalid');
    const requested = new Set(requestedIds);
    const messages = source.messages.filter((message) => requested.has(String(message.id)))
      .sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
    if (messages.length !== requestedIds.length) throw reject('message-not-found');
    if (new Set(messages.map((message) => String(message.id))).size !== messages.length) throw reject('duplicate-message-identity');
    if (messages.some((message) => message.phase !== 'queued')) throw reject('message-not-queued');
    if (messages.some((message) => message.toWorkerId !== workerId || message.toWorkerId === 'operator')) throw reject('message-recipient-mismatch');
    const notices = controlIdsInInbox(worker, controlNoticeIds, false);
    const id = `A-M-${messages[0].id}-${source.generation + 1}`;
    if (source.assignments[id]) throw reject('assignment-id-collision');
    const next = clone(source);
    for (const message of messages) {
      message.phase = 'running';
      const target = next.messages.find((candidate) => candidate.id === message.id);
      target.phase = 'running';
      target.deliveredAt = reservedAt;
    }
    next.assignments[id] = assignmentBase({ id, workerId, kind: 'message', messageIds: messages.map((message) => message.id), controlNoticeIds: notices, reservedAt, metadata });
    next.workers[workerId].currentAssignmentId = id;
    return assertFinal(next);
  }
  function reserveControlAssignment(state, { workerId, controlNoticeIds, reservedAt, metadata = {} } = {}) {
    const source = normalize(state);
    if (!finitePositive(reservedAt)) throw reject('invalid-reserved-at');
    const worker = source.workers[workerId];
    if (!worker || worker.currentAssignmentId != null) throw reject(worker ? 'worker-already-assigned' : 'worker-not-found');
    const notices = controlIdsInInbox(worker, controlNoticeIds, true);
    const id = `A-C-${workerId}-${source.generation + 1}`;
    if (source.assignments[id]) throw reject('assignment-id-collision');
    const next = clone(source);
    next.assignments[id] = assignmentBase({ id, workerId, kind: 'control', controlNoticeIds: notices, reservedAt, metadata });
    next.workers[workerId].currentAssignmentId = id;
    return assertFinal(next);
  }
  function taskRunnableFromNormalized(state, task, worker = null) {
    if (!task || task.phase !== 'pending') return false;
    const dependencies = Array.isArray(task.dependencies) ? task.dependencies : [];
    if (dependencies.some((id) => state.tasks[id]?.phase !== 'done')) return false;
    if (canonicalRole(task.role) === 'review' && worker) {
      const directCompleters = new Set(dependencies.map((id) => state.tasks[id]?.completedByWorkerId).filter(Boolean));
      if (directCompleters.has(worker.id)) return false;
    }
    return true;
  }
  function taskRunnable(state, task, worker = null) {
    const source = normalize(state);
    const canonicalTask = task && source.tasks[task.id];
    if (!canonicalTask) throw reject('task-not-found');
    let canonicalWorker = null;
    if (worker != null) {
      if (!isObject(worker) || typeof worker.id !== 'string' || !worker.id) throw reject('worker-identity-invalid');
      canonicalWorker = source.workers[worker.id];
      if (!canonicalWorker) throw reject('worker-not-found');
    }
    return taskRunnableFromNormalized(source, canonicalTask, canonicalWorker);
  }
  function taskRank(state, worker, task, now, heartbeatMaxAgeMs) {
    if (!schedulerWorkerEligibilityFromNormalized(state, worker.id, { now, heartbeatMaxAgeMs }).eligible) return Infinity;
    return canonicalRole(worker.role) === canonicalRole(task.role) && taskRunnableFromNormalized(state, task, worker) ? 0 : Infinity;
  }
  function chooseDispatchesV2(state, { now, heartbeatMaxAgeMs = 30000, promptBuilders = {} } = {}) {
    const source = normalize(state);
    if (!validSchedulerTime(now, heartbeatMaxAgeMs)) throw reject('invalid-now');
    if (source.policy?.paused || source.policy?.authorityEnabled === false) return { state: source, dispatches: [] };
    const maxConcurrency = Math.max(1, Math.min(64, Number(source.policy?.maxConcurrency || 8)));
    let next = source;
    let active = activeAssignmentCount(source);
    const dispatches = [];
    const reservedMessageIds = new Set();
    const availableWorkers = () => Object.values(next.workers).filter((worker) => schedulerWorkerEligibilityFromNormalized(next, worker.id, { now, heartbeatMaxAgeMs }).eligible);
    const queuedMessages = next.messages.filter((message) => message.phase === 'queued' && message.toWorkerId !== 'operator')
      .sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
    for (const seed of queuedMessages) {
      if (active >= maxConcurrency) break;
      if (reservedMessageIds.has(seed.id)) continue;
      const worker = next.workers[seed.toWorkerId];
      if (!worker || !availableWorkers().some((candidate) => candidate.id === worker.id)) continue;
      const batch = orderedMessageBatch(next, seed).filter((message) => !reservedMessageIds.has(message.id));
      if (!batch.length) continue;
      next = reserveMessageAssignment(next, { workerId: worker.id, messageIds: batch.map((message) => message.id), reservedAt: now, controlNoticeIds: workerInboxIds(worker) });
      const assignment = assignmentForWorkerV2(next, worker.id);
      const inputs = resolveAssignmentPromptInputs(next, assignment.id);
      const prompt = typeof promptBuilders.message === 'function' ? promptBuilders.message(inputs, clone(next)) : null;
      dispatches.push({ workerId: worker.id, tabId: worker.tabId, assignment: { ...assignment, messageId: assignment.messageIds[0], prompt } });
      batch.forEach((message) => reservedMessageIds.add(message.id));
      active += 1;
    }
    const tasks = Object.values(next.tasks).filter((task) => taskRunnableFromNormalized(next, task)).sort((a, b) => (b.priority || 0) - (a.priority || 0) || Number(a.createdAt || 0) - Number(b.createdAt || 0));
    for (const task of tasks) {
      if (active >= maxConcurrency) break;
      const worker = availableWorkers().map((candidate) => ({ candidate, rank: taskRank(next, candidate, task, now, heartbeatMaxAgeMs) }))
        .filter((entry) => Number.isFinite(entry.rank)).sort((a, b) => a.rank - b.rank || Number(a.candidate.registeredAt || 0) - Number(b.candidate.registeredAt || 0) || a.candidate.id.localeCompare(b.candidate.id, undefined, { numeric: true }))[0]?.candidate;
      if (!worker) continue;
      next = reserveTaskAssignment(next, { workerId: worker.id, taskId: task.id, reservedAt: now, controlNoticeIds: workerInboxIds(worker) });
      const assignment = assignmentForWorkerV2(next, worker.id);
      const inputs = resolveAssignmentPromptInputs(next, assignment.id);
      const prompt = typeof promptBuilders.task === 'function' ? promptBuilders.task(inputs, clone(next)) : null;
      dispatches.push({ workerId: worker.id, tabId: worker.tabId, assignment: { ...assignment, prompt } });
      active += 1;
    }
    for (const worker of availableWorkers()) {
      if (active >= maxConcurrency || !worker.controlInbox?.length) continue;
      const ids = workerInboxIds(worker);
      next = reserveControlAssignment(next, { workerId: worker.id, controlNoticeIds: ids, reservedAt: now });
      const assignment = assignmentForWorkerV2(next, worker.id);
      const inputs = resolveAssignmentPromptInputs(next, assignment.id);
      const prompt = typeof promptBuilders.control === 'function' ? promptBuilders.control(inputs, clone(next)) : null;
      dispatches.push({ workerId: worker.id, tabId: worker.tabId, assignment: { ...assignment, prompt } });
      active += 1;
    }
    return { state: assertFinal(next), dispatches };
  }

  global.ModelFleetStateM7C2 = Object.freeze({
    assignmentForWorkerV2,
    activeAssignmentCount,
    resolveAssignmentPromptInputs,
    reserveTaskAssignment,
    reserveMessageAssignment,
    reserveControlAssignment,
    schedulerWorkerEligibility,
    workerAvailability,
    taskRunnable,
    chooseDispatchesV2,
  });
}(globalThis));
