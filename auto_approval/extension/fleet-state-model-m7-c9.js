'use strict';

// C9 canonical binding-loss and unregister boundary. Registration and general
// worker mutation remain later slices.
(function installM7C9(global) {
  const C3 = global.ModelFleetStateM7C3;
  const C6 = global.ModelFleetStateM7C6;
  if (!C3 || !C6) throw new Error('M7 C9 requires C3 and C6');
  const clone = (value) => typeof global.structuredClone === 'function' ? global.structuredClone(value) : JSON.parse(JSON.stringify(value));
  const positive = (value) => Number.isFinite(value) && value > 0;
  const integer = (value) => Number.isInteger(value);
  function reject(reason) { const error = new Error(`M7 C9 binding rejected: ${reason}`); error.code = 'M7_C9_REJECTED'; error.reason = reason; return error; }
  function normalize(state) {
    try { return C3.normalizeV2(state); }
    catch (error) { throw reject(`invalid-v2-state:${error.reason || error.message}`); }
  }
  function append(state, type, text, detail, at) {
    if (!positive(at)) throw reject('invalid-binding-time');
    try { return C3.appendJournal(state, type, text, detail, at); }
    catch (error) { throw reject(`invalid-v2-result:${error.reason || error.message}`); }
  }
  function releaseWorkerBindingV2(state, { workerId, expectedTabId, reason = 'worker binding lost', at } = {}) {
    const source = normalize(state);
    if (!integer(expectedTabId)) throw reject('invalid-expected-tab-id');
    if (!positive(at)) throw reject('invalid-binding-time');
    const worker = source.workers[workerId];
    if (!worker) return { state: source, result: { stale: true, workerId, code: 'worker-not-found', transitioned: false } };
    if (worker.tabId !== expectedTabId) return { state: source, result: { stale: true, workerId, code: 'stale-tab-rebound', transitioned: false } };
    const lastTabId = worker.tabId;
    let next = clone(source);
    const assignment = worker.currentAssignmentId ? source.assignments[worker.currentAssignmentId] : null;
    let releasedAssignmentId = null;
    let protectedCompleting = null;
    if (assignment?.phase === 'completing') {
      protectedCompleting = assignment.id;
    } else if (assignment) {
      const released = C6.releaseGenericCancellation(next, { workerId, assignmentId: assignment.id });
      if (!released.result.ok) throw reject(`release-failed:${assignment.id}`);
      next = released.state;
      releasedAssignmentId = assignment.id;
      if (assignment.kind === 'task') {
        const task = next.tasks[assignment.taskId];
        if (task) {
          task.statusNote = `${reason}; task requeued`;
          next = append(next, 'task.requeued', `${task.id} requeued because ${workerId} became stale`, { taskId: task.id, workerId, reason }, at);
        }
      } else if (assignment.kind === 'message') {
        for (const messageId of assignment.messageIds || []) {
          const message = next.messages.find((item) => item.id === messageId);
          if (message) {
            message.lastDeferredReason = `${reason}; message requeued`;
            next = append(next, 'message.requeued', `${message.id} requeued because ${workerId} became stale`, { messageId: message.id, workerId, reason }, at);
          }
        }
      }
    }
    const current = next.workers[workerId];
    current.lastTabId = lastTabId;
    current.tabId = null;
    current.windowId = null;
    current.activeWindowId = null;
    current.lifecycle = 'stale';
    current.pageBusyUntil = 0;
    current.lastStaleReason = reason;
    current.staleAt = at;
    current.runtime.busy = false;
    current.runtime.reportedAssignmentId = null;
    current.runtime.lastHeartbeatAt = 0;
    next = append(next, 'worker.stale', `${workerId} binding released`, { workerId, oldTabId: lastTabId, reason, releasedAssignmentId, protectedCompleting }, at);
    return { state: next, result: { stale: true, transitioned: true, workerId, lastTabId, releasedAssignmentId, protectedCompleting } };
  }
  function unregisterWorkerV2(state, { workerId, at } = {}) {
    const source = normalize(state);
    if (!positive(at)) throw reject('invalid-unregister-time');
    const worker = source.workers[workerId];
    if (!worker) return { state: source, result: { removed: false, workerId, code: 'worker-not-found', droppedControlNoticeIds: [] } };
    const assignment = worker.currentAssignmentId ? source.assignments[worker.currentAssignmentId] : null;
    if (assignment?.phase === 'completing') return { state: source, result: { removed: false, workerId, code: 'unregister-completion-custody-protected', assignmentId: assignment.id } };
    let next = clone(source);
    let releaseResult = null;
    let releasedAssignmentId = null;
    if (assignment) {
      const released = C6.releaseGenericCancellation(next, { workerId, assignmentId: assignment.id });
      if (!released.result.ok) throw reject(`release-failed:${assignment.id}`);
      next = released.state;
      releaseResult = released.result;
      releasedAssignmentId = assignment.id;
      if (assignment.kind === 'task') {
        const task = next.tasks[assignment.taskId];
        if (task) {
          task.statusNote = `worker ${workerId} unregistered; task requeued`;
          next = append(next, 'task.requeued', `${task.id} requeued because ${workerId} was unregistered`, { taskId: task.id, workerId }, at);
        }
      } else if (assignment.kind === 'message') {
        for (const messageId of assignment.messageIds || []) {
          const message = next.messages.find((item) => item.id === messageId);
          if (message) {
            message.lastDeferredReason = `worker ${workerId} unregistered; message requeued`;
            next = append(next, 'message.requeued', `${message.id} requeued because ${workerId} was unregistered`, { messageId: message.id, workerId }, at);
          }
        }
      }
    }
    const current = next.workers[workerId];
    const tabId = current.tabId;
    const droppedControlNoticeIds = (current.controlInbox || []).map((notice) => String(notice?.id ?? notice));
    delete next.workers[workerId];
    next = append(next, 'worker.unregistered', `${workerId} unregistered`, { workerId, tabId, releasedAssignmentId, droppedControlNoticeIds }, at);
    return { state: next, result: { removed: true, workerId, tabId, releasedAssignmentId, releaseResult, droppedControlNoticeIds, transportWarnings: [] } };
  }
  global.ModelFleetStateM7C9 = Object.freeze({ releaseWorkerBindingV2, unregisterWorkerV2 });
}(globalThis));
