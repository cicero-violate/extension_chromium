'use strict';

// C3 dispatch transport boundary. Heartbeat, recovery, completion, cancellation,
// flush, and public projection remain later bounded slices.
(function installM7C3(global) {
  const C1 = global.ModelFleetStateM7C1;
  if (!C1) throw new Error('M7 C3 requires the C1 persistence boundary');
  const MAX_JOURNAL = 250;
  const PAGE_BUSY_RECHECK_MS = 5000;

  function object(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
  function clone(value) { return typeof global.structuredClone === 'function' ? global.structuredClone(value) : JSON.parse(JSON.stringify(value)); }
  function reject(reason) { const error = new Error(`M7 C3 dispatch rejected: ${reason}`); error.code = 'M7_C3_REJECTED'; error.reason = reason; return error; }
  function positive(value) { return Number.isFinite(value) && value > 0; }
  function validateTimelines(state) {
    for (const assignment of Object.values(state.assignments)) {
      const values = ['reservedAt', 'dispatchAttemptAt', 'acceptedAt', 'startedAt', 'responseTerminalAt'];
      if (!values.every((key) => Number.isFinite(assignment[key]) && assignment[key] >= 0) || !(assignment.reservedAt > 0)) throw reject('invalid-assignment-timeline');
      if (assignment.dispatchAttemptAt !== 0 && assignment.dispatchAttemptAt < assignment.reservedAt) throw reject('dispatch-before-reservation');
      if (assignment.phase === 'reserved') {
        if (assignment.acceptedAt !== 0 || assignment.startedAt !== 0 || assignment.responseTerminalAt !== 0) throw reject('reserved-terminal-fields');
      } else if (assignment.phase === 'activating') {
        if (!(assignment.dispatchAttemptAt > 0) || assignment.acceptedAt < assignment.dispatchAttemptAt || assignment.startedAt !== 0 || assignment.responseTerminalAt !== 0) throw reject('activating-order');
      } else if (assignment.phase === 'running') {
        if (!(assignment.dispatchAttemptAt > 0) || assignment.acceptedAt < assignment.dispatchAttemptAt || assignment.startedAt < assignment.acceptedAt || assignment.responseTerminalAt !== 0) throw reject('running-order');
      } else if (assignment.phase === 'completing') {
        if (!(assignment.dispatchAttemptAt > 0) || assignment.acceptedAt < assignment.dispatchAttemptAt || assignment.startedAt < assignment.acceptedAt || !(assignment.responseTerminalAt > 0) || assignment.responseTerminalAt < assignment.startedAt) throw reject('completing-order');
      }
    }
  }
  function normalize(state) { try { const source = C1.normalizeV2FleetState(state); validateTimelines(source); return source; } catch (error) { throw reject(`invalid-v2-state:${error.reason || error.message}`); } }
  function finalize(state) { try { const result = C1.normalizeV2FleetState(state); validateTimelines(result); return result; } catch (error) { throw reject(`invalid-v2-result:${error.reason || error.message}`); } }
  function owned(source, workerId, assignmentId) {
    const worker = source.workers[workerId];
    if (!worker) throw reject('worker-not-found');
    if (worker.currentAssignmentId !== assignmentId) throw reject('assignment-ownership-mismatch');
    const assignment = source.assignments[assignmentId];
    if (!assignment || assignment.workerId !== workerId) throw reject('assignment-pointer-mismatch');
    return { worker, assignment };
  }
  function timelineFloor(assignment) { return Math.max(assignment.reservedAt, assignment.dispatchAttemptAt || 0); }
  function checkTime(value, floor, invalid, regression) {
    if (!positive(value)) throw reject(invalid);
    if (value < floor) throw reject(regression);
  }
  function recordDispatchAttempt(state, { workerId, assignmentId, attemptedAt } = {}) {
    const source = normalize(state); const { assignment } = owned(source, workerId, assignmentId);
    if (assignment.phase !== 'reserved') throw reject('dispatch-attempt-illegal-phase');
    checkTime(attemptedAt, assignment.reservedAt, 'invalid-attempted-at', 'time-regression');
    if (assignment.dispatchAttemptAt > 0) {
      if (assignment.dispatchAttemptAt === attemptedAt) return source;
      throw reject('dispatch-attempt-already-recorded');
    }
    const next = clone(source); next.assignments[assignmentId].dispatchAttemptAt = attemptedAt;
    return finalize(next);
  }
  function acceptDispatch(state, { workerId, assignmentId, acceptedAt } = {}) {
    const source = normalize(state); const { assignment } = owned(source, workerId, assignmentId);
    if (assignment.phase !== 'reserved') throw reject('dispatch-accept-illegal-phase');
    if (!(assignment.dispatchAttemptAt > 0)) throw reject('dispatch-attempt-required');
    checkTime(acceptedAt, timelineFloor(assignment), 'invalid-accepted-at', 'time-regression');
    const next = clone(source); next.assignments[assignmentId].phase = 'activating'; next.assignments[assignmentId].acceptedAt = acceptedAt;
    return finalize(next);
  }
  function releaseWork(source, assignmentId, { rewind = false, reason = '' } = {}) {
    const assignment = source.assignments[assignmentId]; const next = clone(source);
    if (assignment.kind === 'task') {
      const task = next.tasks[assignment.taskId];
      task.phase = 'pending'; task.assignedWorkerId = null;
      if (rewind) { task.startedAt = 0; task.attempts = Math.max(0, Number(task.attempts || 0) - 1); }
      if (reason) task.statusNote = `deferred: ${reason}`;
    } else if (assignment.kind === 'message') {
      for (const id of assignment.messageIds) {
        const message = next.messages.find((candidate) => candidate.id === id);
        if (message) { message.phase = 'queued'; if (reason) message.lastDeferredReason = reason; }
      }
    }
    delete next.assignments[assignmentId];
    next.workers[assignment.workerId].currentAssignmentId = null;
    return finalize(next);
  }
  function deferReservedDispatchForActivePage(state, { workerId, assignmentId, deferredAt, pageBusyUntil, reason = 'ChatGPT turn is still active in the worker tab' } = {}) {
    const source = normalize(state); const { assignment } = owned(source, workerId, assignmentId);
    if (assignment.phase !== 'reserved') throw reject('preflight-deferral-illegal-phase');
    if (!positive(deferredAt)) throw reject('invalid-deferred-at');
    if (!Number.isFinite(pageBusyUntil) || pageBusyUntil < deferredAt) throw reject('invalid-page-busy-until');
    const next = releaseWork(source, assignmentId, { rewind: assignment.kind === 'task', reason });
    const result = clone(next); const worker = result.workers[workerId];
    worker.pageBusyUntil = pageBusyUntil;
    return finalize(result);
  }
  function releaseDispatchFailure(state, { workerId, assignmentId } = {}) {
    const source = normalize(state); const { assignment } = owned(source, workerId, assignmentId);
    if (assignment.phase !== 'reserved') throw reject('dispatch-failure-illegal-phase');
    if (!(assignment.dispatchAttemptAt > 0)) throw reject('dispatch-failure-attempt-required');
    return { state: releaseWork(source, assignmentId), result: { ok: true, released: true, assignmentId } };
  }
  function rollbackReservedDispatch(state, { workerId, assignmentId } = {}) {
    const source = normalize(state); const worker = source.workers[workerId]; const assignment = source.assignments[assignmentId];
    if (!worker || !assignment || worker.currentAssignmentId !== assignmentId || assignment.workerId !== workerId) return { state: source, result: { ok: false, stale: true, reason: 'dispatch-reservation-stale' } };
    if (assignment.phase !== 'reserved' || assignment.dispatchAttemptAt !== 0) throw reject('rollback-not-pre-attempt');
    return { state: releaseWork(source, assignmentId, { rewind: true }), result: { ok: true, rolledBack: true, assignmentId } };
  }
  function applyDispatchFailureFault(state, { workerId, assignmentId, at, message = 'dispatch failed' } = {}) {
    const source = normalize(state); const worker = source.workers[workerId];
    if (!worker) throw reject('worker-not-found');
    if (typeof assignmentId !== 'string' || !assignmentId) throw reject('missing-dispatch-assignment-id');
    const assignment = source.assignments[assignmentId];
    if (!assignment || worker.currentAssignmentId !== assignmentId || assignment.workerId !== workerId) return { state: source, result: { applied: false, reason: 'assignment-mismatch' } };
    if (assignment.phase !== 'reserved') throw reject('dispatch-assignment-not-reserved');
    if (!(assignment.dispatchAttemptAt > 0)) throw reject('dispatch-attempt-required');
    checkTime(at, assignment.dispatchAttemptAt, 'invalid-fault-at', 'dispatch-fault-before-attempt');
    const next = clone(source); next.workers[workerId].runtime.busy = false;
    const shouldBlock = worker.enabled !== false && source.policy?.paused !== true && source.policy?.authorityEnabled !== false;
    const faultMessage = message || 'dispatch failed';
    if (shouldBlock) next.workers[workerId].fault = { code: 'dispatch-failed', message: faultMessage, at, assignmentId };
    const finalState = finalize(next);
    return { state: finalState, result: { applied: shouldBlock, fault: shouldBlock ? finalState.workers[workerId].fault : null, runtimeReset: true, workerBlocked: shouldBlock, lifecycleIntent: { lifecycle: worker.enabled === false ? 'offline' : 'idle', busy: false, warmIdleSince: 0, warmIdleUntil: 0 } } };
  }
  function composeDispatchFailure(state, input = {}) {
    let source;
    try { source = normalize(state); } catch (error) { throw error; }
    const currentWorker = source.workers[input.workerId]; const currentAssignment = source.assignments[input.assignmentId];
    if (!currentWorker || !currentAssignment || currentWorker.currentAssignmentId !== input.assignmentId || currentAssignment.workerId !== input.workerId) return { state: source, result: { ok: false, stale: true, reason: 'dispatch-failure-stale' } };
    const fault = applyDispatchFailureFault(source, input);
    if (fault.result.applied === false && fault.result.reason === 'assignment-mismatch') return { ...fault, result: { ...fault.result, stale: true } };
    const released = releaseDispatchFailure(fault.state, input);
    return { state: released.state, result: { ...released.result, workerBlocked: fault.result.workerBlocked, fault: fault.state.workers[input.workerId].fault || null, lifecycleIntent: fault.result.lifecycleIntent } };
  }
  function authorizeDispatch(state, dispatch) {
    const source = normalize(state); const worker = source.workers[dispatch.workerId];
    if (!worker || worker.currentAssignmentId !== dispatch.assignment?.id) return { ok: false, reason: 'assignment-ownership-mismatch' };
    const assignment = source.assignments[dispatch.assignment.id];
    if (!assignment || assignment.workerId !== dispatch.workerId || assignment.phase !== 'reserved') return { ok: false, reason: 'assignment-not-reserved' };
    if (worker.enabled === false || !Number.isInteger(worker.tabId) || source.policy?.paused || source.policy?.authorityEnabled === false) return { ok: false, reason: 'dispatch-not-authorized' };
    if (!Number.isInteger(dispatch.tabId) || dispatch.tabId !== worker.tabId) return { ok: false, reason: 'dispatch-tab-mismatch' };
    if (assignment.kind !== dispatch.assignment.kind || assignment.taskId !== (dispatch.assignment.taskId ?? null) || JSON.stringify(assignment.messageIds) !== JSON.stringify(dispatch.assignment.messageIds || []) || JSON.stringify(assignment.controlNoticeIds) !== JSON.stringify(dispatch.assignment.controlNoticeIds || [])) return { ok: false, reason: 'dispatch-payload-mismatch' };
    return { ok: true };
  }
  function appendJournal(state, type, text, detail, at) {
    const next = clone(state); const entry = { id: `${next.generation}:${next.journal.length + 1}:${at}`, at, type, text, detail: clone(detail || {}) };
    next.journal = [...next.journal, entry].slice(-MAX_JOURNAL); return finalize(next);
  }
  global.ModelFleetStateM7C3 = Object.freeze({ normalizeV2: normalize, finalizeV2: finalize, recordDispatchAttempt, acceptDispatch, deferReservedDispatchForActivePage, rollbackReservedDispatch, releaseDispatchFailure, applyDispatchFailureFault, composeDispatchFailure, authorizeDispatch, appendJournal, PAGE_BUSY_RECHECK_MS });
}(globalThis));
