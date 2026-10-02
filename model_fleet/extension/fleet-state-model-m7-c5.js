'use strict';

// C5 completion custody boundary. Routing orchestration is kept in the
// candidate background overlay; this module owns only the two M4 custody
// phases and explicit completion bookkeeping.
(function installM7C5(global) {
  const C3 = global.ModelFleetStateM7C3;
  if (!C3) throw new Error('M7 C5 requires C3');
  const clone = (value) => typeof global.structuredClone === 'function' ? global.structuredClone(value) : JSON.parse(JSON.stringify(value));
  const positive = (value) => Number.isFinite(value) && value > 0;
  const object = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
  function reject(reason) { const error = new Error(`M7 C5 completion rejected: ${reason}`); error.code = 'M7_C5_REJECTED'; error.reason = reason; return error; }
  function normalize(state) { try { return C3.normalizeV2(state); } catch (error) { throw reject(`invalid-v2-state:${error.reason || error.message}`); } }
  function finalize(state) { try { return C3.finalizeV2(state); } catch (error) { throw reject(`invalid-v2-result:${error.reason || error.message}`); } }
  function mismatch(source, workerId, assignmentId) {
    const expected = source.workers[workerId]?.currentAssignmentId || null;
    return { state: source, result: { ok: false, code: 'assignment_ownership_mismatch', terminal: expected == null, expectedAssignmentId: expected, reportedAssignmentId: assignmentId ?? null } };
  }
  function owned(source, workerId, assignmentId) {
    const worker = source.workers[workerId];
    if (!worker) throw reject('worker-not-found');
    if (worker.currentAssignmentId !== assignmentId) return null;
    const assignment = source.assignments[assignmentId];
    if (!assignment || assignment.workerId !== workerId) return null;
    return { worker, assignment };
  }
  function beginCompletion(state, { workerId, assignmentId, responseTerminalAt } = {}) {
    const source = normalize(state);
    if (typeof assignmentId !== 'string' || !assignmentId) throw reject('assignment-id-required');
    if (!positive(responseTerminalAt)) throw reject('invalid-response-terminal-at');
    const owner = owned(source, workerId, assignmentId);
    if (!owner) return mismatch(source, workerId, assignmentId);
    const { assignment } = owner;
    if (assignment.phase === 'reserved') return { state: source, result: { ok: false, code: 'completion-before-acceptance', terminal: false, assignmentId } };
    if (assignment.phase === 'completing') {
      if (assignment.responseTerminalAt === responseTerminalAt) return { state: source, result: { ok: true, idempotent: true, assignmentId, phase: 'completing' } };
      throw reject('completion-terminal-time-conflict');
    }
    if (responseTerminalAt < Math.max(assignment.acceptedAt, assignment.startedAt || 0)) throw reject('completion-time-regression');
    const next = clone(source);
    if (assignment.phase === 'activating') {
      next.assignments[assignmentId].phase = 'running';
      next.assignments[assignmentId].startedAt = next.assignments[assignmentId].startedAt || next.assignments[assignmentId].acceptedAt || responseTerminalAt;
    }
    if (next.assignments[assignmentId].phase !== 'running') return { state: source, result: { ok: false, code: 'completion-illegal-phase', terminal: false, assignmentId } };
    next.assignments[assignmentId].phase = 'completing';
    next.assignments[assignmentId].responseTerminalAt = responseTerminalAt;
    return { state: finalize(next), result: { ok: true, assignmentId, phase: 'completing', responseTerminalAt } };
  }
  function dispositionForAssignment(source, assignment, disposition) {
    if (assignment.kind === 'message' && object(disposition)) {
      const expected = new Set(assignment.messageIds);
      const actual = Object.keys(disposition);
      if (actual.length !== expected.size || actual.some((id) => !expected.has(id))) throw reject('message-disposition-keys-mismatch');
      for (const id of assignment.messageIds) if (!['done', 'blocked'].includes(disposition[id])) throw reject('invalid-message-disposition');
      return disposition;
    }
    if (assignment.kind === 'message' && !['done', 'blocked'].includes(disposition)) throw reject('invalid-message-disposition');
    if (assignment.kind === 'control' && !['done', 'blocked'].includes(disposition)) throw reject('invalid-control-disposition');
    if (assignment.kind !== 'message' && !['done', 'blocked'].includes(disposition)) throw reject('invalid-disposition');
    return disposition;
  }
  function acknowledgeCompletion(state, { workerId, assignmentId, disposition, acknowledgedAt } = {}) {
    const source = normalize(state);
    if (!positive(acknowledgedAt)) throw reject('invalid-acknowledged-at');
    const owner = owned(source, workerId, assignmentId);
    if (!owner) return mismatch(source, workerId, assignmentId);
    const { assignment } = owner;
    if (assignment.phase !== 'completing') return { state: source, result: { ok: false, code: 'completion-not-ready', terminal: false, assignmentId } };
    if (acknowledgedAt < assignment.responseTerminalAt) throw reject('ack-time-regression');
    const selected = dispositionForAssignment(source, assignment, disposition);
    const next = clone(source);
    const terminalFor = (choice) => choice === 'done' ? 'done' : 'blocked';
    if (assignment.kind === 'task') next.tasks[assignment.taskId].phase = terminalFor(selected);
    if (assignment.kind === 'message') for (const id of assignment.messageIds) next.messages.find((message) => message.id === id).phase = terminalFor(object(selected) ? selected[id] : selected);
    const worker = next.workers[workerId];
    const consumed = new Set(assignment.controlNoticeIds || []);
    worker.controlInbox = (worker.controlInbox || []).filter((notice) => !consumed.has(String(notice.id)));
    delete next.assignments[assignmentId];
    worker.currentAssignmentId = null;
    return { state: finalize(next), result: { ok: true, released: true, assignmentId, acknowledgedAt } };
  }
  function accountReleaseLag(state, { workerId, assignmentId, acknowledgedAt, releasedAt } = {}) {
    const source = normalize(state); const worker = source.workers[workerId]; const assignment = source.assignments[assignmentId];
    if (!worker || !assignment) throw reject('assignment-not-found');
    if (assignment.phase !== 'completing') throw reject('completion-not-ready');
    if (!positive(acknowledgedAt) || !positive(releasedAt)) throw reject('invalid-release-time');
    if (!positive(assignment.responseTerminalAt) || acknowledgedAt < assignment.responseTerminalAt) throw reject('ack-time-regression');
    if (releasedAt < acknowledgedAt) throw reject('release-time-regression');
    const lagMs = Math.max(0, releasedAt - assignment.responseTerminalAt);
    const next = clone(source); const target = next.workers[workerId];
    target.lastAssignmentReleasedAt = releasedAt;
    target.lastResponseTerminalAt = assignment.responseTerminalAt;
    target.lastCompletionReleaseLagMs = lagMs;
    target.completionReleaseLagCount = Math.max(0, Number(target.completionReleaseLagCount || 0)) + 1;
    target.completionReleaseLagTotalMs = Math.max(0, Number(target.completionReleaseLagTotalMs || 0)) + lagMs;
    target.completionReleaseLagMaxMs = Math.max(Math.max(0, Number(target.completionReleaseLagMaxMs || 0)), lagMs);
    return { state: finalize(next), result: { lagMs, releasedAt, responseTerminalAt: assignment.responseTerminalAt } };
  }
  global.ModelFleetStateM7C5 = Object.freeze({ beginCompletion, acknowledgeCompletion, accountReleaseLag });
}(globalThis));
