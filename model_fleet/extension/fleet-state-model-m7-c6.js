'use strict';

// C6 cancellation/recovery custody boundary. Stop/flush, unregister, and
// public projection remain later slices.
(function installM7C6(global) {
  const C3 = global.ModelFleetStateM7C3;
  if (!C3) throw new Error('M7 C6 requires C3');
  const clone = (value) => typeof global.structuredClone === 'function' ? global.structuredClone(value) : JSON.parse(JSON.stringify(value));
  const positive = (value) => Number.isFinite(value) && value > 0;
  const integer = (value) => Number.isInteger(value) && value >= 0;
  function reject(reason) { const error = new Error(`M7 C6 cancellation rejected: ${reason}`); error.code = 'M7_C6_REJECTED'; error.reason = reason; return error; }
  function normalize(state) { try { return C3.normalizeV2(state); } catch (error) { throw reject(`invalid-v2-state:${error.reason || error.message}`); } }
  function finalize(state) { try { return C3.finalizeV2(state); } catch (error) { throw reject(`invalid-v2-result:${error.reason || error.message}`); } }
  function owner(source, workerId, assignmentId) {
    const worker = source.workers[workerId];
    if (!worker) throw reject('worker-not-found');
    const expected = worker.currentAssignmentId || null;
    if (expected !== assignmentId) return { worker, assignment: null, result: { ok: false, code: expected ? 'assignment_ownership_mismatch' : 'stale-no-owner', terminal: !expected, expectedAssignmentId: expected, reportedAssignmentId: assignmentId || null } };
    const assignment = source.assignments[assignmentId];
    if (!assignment || assignment.workerId !== workerId) throw reject('assignment-pointer-mismatch');
    return { worker, assignment, result: null };
  }
  function itemList(source, assignment, worker) {
    if (assignment.kind === 'task') return [source.tasks[assignment.taskId]].filter(Boolean);
    if (assignment.kind === 'message') return assignment.messageIds.map((id) => source.messages.find((message) => message.id === id)).filter(Boolean);
    return (worker.controlInbox || []).filter((notice) => assignment.controlNoticeIds.includes(String(notice.id)));
  }
  function release(state, { workerId, assignmentId, disposition = 'requeue' } = {}) {
    const source = normalize(state);
    const held = owner(source, workerId, assignmentId);
    if (held.result) return { state: source, result: held.result };
    const { worker, assignment } = held;
    if (assignment.phase === 'completing') throw reject('completion-custody-protected');
    if (!['requeue', 'cancel', 'blocked'].includes(disposition)) throw reject('invalid-release-disposition');
    const next = clone(source);
    const target = next.tasks[assignment.taskId];
    const terminal = disposition === 'cancel' ? 'cancelled' : disposition === 'blocked' ? 'blocked' : null;
    if (assignment.kind === 'task' && target) {
      target.phase = terminal || 'pending';
      target.assignedWorkerId = null;
      target.startedAt = 0;
      if (terminal) target.completedAt = target.completedAt || 0;
    }
    if (assignment.kind === 'message') for (const id of assignment.messageIds) {
      const message = next.messages.find((candidate) => candidate.id === id);
      if (message) message.phase = terminal || 'queued';
    }
    delete next.assignments[assignmentId];
    next.workers[workerId].currentAssignmentId = null;
    next.workers[workerId].runtime.busy = false;
    next.workers[workerId].lifecycle = next.workers[workerId].enabled === false ? 'offline' : 'idle';
    next.workers[workerId].warmIdleSince = 0;
    next.workers[workerId].warmIdleUntil = 0;
    return { state: finalize(next), result: { ok: true, released: true, assignmentId, disposition } };
  }
  function cancelAssignment(state, input = {}) { return release(state, { ...input, disposition: 'cancel' }); }
  function releaseGenericCancellation(state, input = {}) { return release(state, { ...input, disposition: 'requeue' }); }
  function applyAutomaticRecovery(state, { workerId, assignmentId, reason = '' } = {}) {
    const source = normalize(state);
    const held = owner(source, workerId, assignmentId);
    if (held.result) return { state: source, result: held.result };
    const { assignment, worker } = held;
    if (assignment.phase === 'completing') throw reject('completion-custody-protected');
    if (!integer(assignment.recoveryAttempt)) throw reject('invalid-recovery-attempt');
    const items = itemList(source, assignment, worker);
    const attempts = items.map((item) => item.autoRecoveryAttempts === undefined ? 0 : item.autoRecoveryAttempts);
    if (!attempts.every(integer)) throw reject('invalid-auto-recovery-attempts');
    const used = Math.max(assignment.recoveryAttempt, ...attempts);
    const retry = used < 1;
    const outcome = release(source, { workerId, assignmentId, disposition: retry ? 'requeue' : 'blocked' });
    if (!outcome.result.ok) return outcome;
    const nextItems = itemList(outcome.state, { ...assignment, phase: 'released' }, outcome.state.workers[workerId]);
    const recoveryReason = String(reason || `assignment recovery ${assignmentId}`);
    for (const item of nextItems) {
      item.lastAutoRecoveryReason = recoveryReason;
      if (retry) item.autoRecoveryAttempts = used + 1;
      if (assignment.kind === 'task') item.statusNote = `automatic recovery ${retry ? used + 1 : used}/1: ${recoveryReason}`;
      if (assignment.kind === 'message') item.lastDeferredReason = `automatic recovery ${retry ? used + 1 : used}/1: ${recoveryReason}`;
    }
    return { state: finalize(outcome.state), result: { ...outcome.result, recoveryAttempt: retry ? used + 1 : used, retryScheduled: retry, outcome: retry ? 'requeued' : 'exhausted-blocked', reason: recoveryReason } };
  }
  global.ModelFleetStateM7C6 = Object.freeze({ cancelAssignment, releaseGenericCancellation, applyAutomaticRecovery });
}(globalThis));
