'use strict';

// C7 canonical bulk-stop boundary. This module is intentionally limited to
// stop/flush-stale; authority revoke, unregister, and UI/persistence cutover
// remain later slices.
(function installM7C7(global) {
  const C1 = global.ModelFleetStateM7C1;
  const C3 = global.ModelFleetStateM7C3;
  if (!C1 || !C3) throw new Error('M7 C7 requires the C1/C3 persistence boundaries');
  const MAX_JOURNAL = 250;

  function clone(value) { return typeof global.structuredClone === 'function' ? global.structuredClone(value) : JSON.parse(JSON.stringify(value)); }
  function object(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
  function positive(value) { return Number.isFinite(value) && value > 0; }
  function reject(reason) { const error = new Error(`M7 C7 stop rejected: ${reason}`); error.code = 'M7_C7_REJECTED'; error.reason = reason; return error; }
  function normalize(state) {
    try { return C3.normalizeV2(state); }
    catch (error) { throw reject(`invalid-v2-state:${error.reason || error.message}`); }
  }
  function finalize(state) {
    try { return C3.finalizeV2(state); }
    catch (error) { throw reject(`invalid-v2-result:${error.reason || error.message}`); }
  }
  function appendJournal(state, type, text, detail, at) {
    if (!positive(at)) throw reject('invalid-journal-time');
    const next = clone(state);
    next.journal = [...(next.journal || []), {
      id: `${next.generation}:${next.journal.length + 1}:${at}`,
      at, type, text, detail: clone(detail || {}),
    }].slice(-MAX_JOURNAL);
    return finalize(next);
  }
  function assignmentResult(assignment) {
    return {
      ok: true,
      released: true,
      assignmentId: assignment.id,
      disposition: 'cancel',
    };
  }
  function flushActiveAssignments(state) {
    const source = normalize(state);
    if (Object.values(source.assignments).some((assignment) => assignment.phase === 'completing')) throw reject('flush-completing-custody-protected');
    const next = clone(source);
    const controlIds = Object.values(next.workers).flatMap((worker) => (worker.controlInbox || []).map((notice) => String(notice?.id ?? notice)));
    const assignments = Object.values(source.assignments).map((assignment) => assignmentResult(assignment));
    for (const assignment of Object.values(source.assignments)) {
      if (assignment.kind === 'task') {
        const task = next.tasks[assignment.taskId];
        if (task) { task.phase = 'cancelled'; task.assignedWorkerId = null; task.startedAt = 0; }
      } else if (assignment.kind === 'message') {
        for (const messageId of assignment.messageIds || []) {
          const message = next.messages.find((candidate) => candidate.id === messageId);
          if (message) message.phase = 'cancelled';
        }
      }
      if (next.workers[assignment.workerId]) next.workers[assignment.workerId].currentAssignmentId = null;
      delete next.assignments[assignment.id];
    }
    for (const worker of Object.values(next.workers)) worker.controlInbox = [];
    const finalState = finalize(next);
    return { state: finalState, result: { released: assignments.length, assignments, flushedControlNoticeIds: controlIds, flushedControlNoticeCount: controlIds.length } };
  }
  function cancelQueuedWorkerMessages(state, { completedAt, reason = 'stale queued worker message' } = {}) {
    const source = normalize(state);
    if (!positive(completedAt)) throw reject('invalid-completed-at');
    const owned = new Set(Object.values(source.assignments).flatMap((assignment) => assignment.messageIds || []));
    const next = clone(source);
    const cancelled = [];
    for (const message of next.messages) {
      if (message.phase !== 'queued' || message.toWorkerId === 'operator' || owned.has(message.id)) continue;
      message.phase = 'cancelled';
      message.completedAt = completedAt;
      message.lastDeferredReason = reason;
      cancelled.push(message.id);
    }
    return { state: finalize(next), result: { cancelled, count: cancelled.length } };
  }
  function composeStopAndFlushV2(state, { at } = {}) {
    const source = normalize(state);
    if (!positive(at)) throw reject('invalid-stop-at');
    const activeWorkerIntents = Object.values(source.assignments).map((assignment) => ({
      workerId: assignment.workerId,
      assignmentId: assignment.id,
      tabId: source.workers[assignment.workerId]?.tabId,
    }));
    const active = flushActiveAssignments(source);
    const queued = cancelQueuedWorkerMessages(active.state, { completedAt: at });
    let next = queued.state;
    next.policy.paused = true;
    for (const intent of activeWorkerIntents) {
      const worker = next.workers[intent.workerId];
      if (worker && worker.currentAssignmentId == null) {
        worker.runtime.busy = false;
        if (worker.lifecycle === 'running' || worker.lifecycle === 'activating') worker.lifecycle = 'idle';
        worker.warmIdleSince = 0;
        worker.warmIdleUntil = 0;
      }
    }
    next = appendJournal(next, 'authority.stale_work_stop', 'Paused dispatch and flushed active and queued worker work', {
      activeAssignments: active.result.released,
      cancelledQueued: queued.result.count,
      cancelledControlNotices: active.result.flushedControlNoticeCount,
    }, at);
    for (const messageId of queued.result.cancelled) {
      next = appendJournal(next, 'message.cancelled', `${messageId} cancelled: stale queued worker message`, { messageId, reason: 'stale queued worker message' }, at);
    }
    return {
      state: next,
      result: {
        stopped: true,
        cancelledActive: active.result.released,
        cancelledQueued: queued.result.count,
        cancelledControlNotices: active.result.flushedControlNoticeCount,
        activeAssignments: active.result.assignments,
        flushedControlNoticeIds: active.result.flushedControlNoticeIds,
        transportIntents: activeWorkerIntents,
        transportWarnings: [],
      },
    };
  }
  global.ModelFleetStateM7C7 = Object.freeze({ flushActiveAssignments, cancelQueuedWorkerMessagesV2: cancelQueuedWorkerMessages, composeStopAndFlushV2 });
}(globalThis));
