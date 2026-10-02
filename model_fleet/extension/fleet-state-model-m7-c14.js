'use strict';

// C14 operator work mutations. These are canonical v2 phase writers; the
// legacy handlers remain isolated in background.js for version 1.
(function installM7C14(global) {
  const C3 = global.ModelFleetStateM7C3;
  const C10 = global.ModelFleetStateM7C10;
  if (!C3 || !C10) throw new Error('M7 C14 requires C3 and C10');
  const ROLES = new Set(['coordinator', 'implementation', 'review']);
  const TERMINAL_MESSAGE_PHASES = new Set(['done', 'blocked', 'cancelled', 'delivered']);
  const clone = (value) => typeof global.structuredClone === 'function' ? global.structuredClone(value) : JSON.parse(JSON.stringify(value));
  const positive = (value) => Number.isFinite(value) && value > 0;
  function reject(reason) {
    const error = new Error(`M7 C14 operator mutation rejected: ${reason}`);
    error.code = 'M7_C14_REJECTED';
    error.reason = reason;
    return error;
  }
  function normalize(state) {
    try { return C3.normalizeV2(state); }
    catch (error) { throw reject(`invalid-v2-state:${error.reason || error.message}`); }
  }
  function finalize(state) {
    try { return C3.finalizeV2(state); }
    catch (error) { throw reject(`invalid-v2-result:${error.reason || error.message}`); }
  }
  function append(state, type, text, detail, at) {
    if (!positive(at)) throw reject('invalid-mutation-time');
    try { return C3.appendJournal(state, type, text, detail, at); }
    catch (error) { throw reject(`invalid-v2-result:${error.reason || error.message}`); }
  }
  function boundedPriority(value) {
    const parsed = Number(value || 0);
    return Number.isFinite(parsed) ? Math.max(-100, Math.min(100, parsed)) : 0;
  }
  function taskIdFor(source) {
    const number = Number(source.nextTask);
    if (!Number.isInteger(number) || number < 1) throw reject('invalid-next-task');
    return `T-${number}`;
  }
  function messageIdFor(source) {
    const number = Number(source.nextMessage);
    if (!Number.isInteger(number) || number < 1) throw reject('invalid-next-message');
    return `M-${number}`;
  }
  function createTaskV2(state, input = {}, { createdAt } = {}) {
    const source = normalize(state);
    if (!positive(createdAt)) throw reject('invalid-created-at');
    const id = taskIdFor(source);
    if (source.tasks[id]) throw reject('task-id-collision');
    const prompt = String(input.prompt || '').trim();
    if (!prompt) throw reject('task-prompt-required');
    const role = C10.canonicalRole(input.role);
    const dependencies = Array.from(new Set(Array.isArray(input.dependencies) ? input.dependencies.map(String) : []))
      .filter((dependencyId) => source.tasks[dependencyId]);
    const next = clone(source);
    next.nextTask += 1;
    next.tasks[id] = {
      id,
      title: String(input.title || '').trim() || id,
      prompt,
      role,
      priority: boundedPriority(input.priority),
      dependencies,
      parentTaskId: null,
      createdByWorkerId: null,
      createdByRole: 'coordinator',
      phase: 'pending',
      assignedWorkerId: null,
      attempts: 0,
      createdAt,
      startedAt: 0,
      completedAt: 0,
      result: '',
      statusNote: '',
      autoRecoveryAttempts: 0,
      lastAutoRecoveryReason: '',
    };
    const journaled = append(next, 'task.created', `${id} created`, { taskId: id, role, createdByRole: 'coordinator' }, createdAt);
    return { state: finalize(journaled), result: { task: clone(journaled.tasks[id]) } };
  }
  function retryTaskV2(state, { taskId, at } = {}) {
    const source = normalize(state);
    if (!positive(at)) throw reject('invalid-retry-time');
    const task = source.tasks[taskId];
    if (!task) throw reject('task-not-found');
    if (task.phase === 'running' || Object.values(source.assignments || {}).some((assignment) => assignment.taskId === taskId)) throw reject('task-active');
    const next = clone(source);
    const candidate = next.tasks[taskId];
    candidate.phase = 'pending';
    candidate.assignedWorkerId = null;
    candidate.result = '';
    candidate.statusNote = '';
    candidate.autoRecoveryAttempts = 0;
    candidate.lastAutoRecoveryReason = '';
    const journaled = append(next, 'task.retried', `${taskId} queued for retry`, { taskId }, at);
    return { state: finalize(journaled), result: { taskId, retried: true, task: clone(journaled.tasks[taskId]) } };
  }
  function messageOwned(source, id) {
    return Object.values(source.assignments || {}).some((assignment) => Array.isArray(assignment.messageIds) && assignment.messageIds.includes(id));
  }
  function pruneSafeMessages(next, newId) {
    const referenced = new Set();
    for (const assignment of Object.values(next.assignments || {})) for (const id of assignment.messageIds || []) referenced.add(id);
    while (next.messages.length > 250) {
      const victimIndex = next.messages.findIndex((message) => message.id !== newId && !referenced.has(message.id) && TERMINAL_MESSAGE_PHASES.has(message.phase));
      if (victimIndex < 0) throw reject('operator-message-capacity-active');
      next.messages.splice(victimIndex, 1);
    }
  }
  function queueMessageV2(state, input = {}, { createdAt } = {}) {
    const source = normalize(state);
    if (!positive(createdAt)) throw reject('invalid-created-at');
    const target = String(input.toWorkerId || '').trim();
    if (target !== 'operator' && !source.workers[target]) throw reject('message-target-not-found');
    const body = String(input.body || '').trim();
    if (!body) throw reject('message-body-required');
    const id = messageIdFor(source);
    if (source.messages.some((message) => message.id === id)) throw reject('message-id-collision');
    const operator = target === 'operator';
    const next = clone(source);
    next.nextMessage += 1;
    next.messages.push({
      id, from: 'operator', fromWorkerId: null, toWorkerId: target, body,
      taskId: input.taskId || null, phase: operator ? 'delivered' : 'queued',
      createdAt, deliveredAt: operator ? createdAt : 0, completedAt: 0, response: '',
      autoRecoveryAttempts: 0, lastAutoRecoveryReason: '', requiresFleetMessage: false,
      protocolRepairOf: null, protocolRepairAttempts: 0, goalContinuation: false,
    });
    pruneSafeMessages(next, id);
    const journaled = append(next, 'message.queued', `${id} queued for ${target}`, {
      messageId: id, toWorkerId: target, taskId: input.taskId || null, from: 'operator', bodyLength: body.length,
    }, createdAt);
    return { state: finalize(journaled), result: { message: clone(journaled.messages.find((message) => message.id === id)) } };
  }
  global.ModelFleetStateM7C14 = Object.freeze({ createTaskV2, retryTaskV2, queueMessageV2 });
}(globalThis));
