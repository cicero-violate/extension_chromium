'use strict';

// C8 canonical authority-revoke boundary. Unregister, policy APIs, and UI
// projection remain later slices.
(function installM7C8(global) {
  const C3 = global.ModelFleetStateM7C3;
  const C6 = global.ModelFleetStateM7C6;
  if (!C3 || !C6) throw new Error('M7 C8 requires C3 and C6');
  const clone = (value) => typeof global.structuredClone === 'function' ? global.structuredClone(value) : JSON.parse(JSON.stringify(value));
  const positive = (value) => Number.isFinite(value) && value > 0;
  function reject(reason) { const error = new Error(`M7 C8 authority revoke rejected: ${reason}`); error.code = 'M7_C8_REJECTED'; error.reason = reason; return error; }
  function normalize(state) {
    try { return C3.normalizeV2(state); }
    catch (error) { throw reject(`invalid-v2-state:${error.reason || error.message}`); }
  }
  function appendJournal(state, type, text, detail, at) {
    if (!positive(at)) throw reject('invalid-revoke-at');
    try { return C3.appendJournal(state, type, text, detail, at); }
    catch (error) { throw reject(`invalid-v2-result:${error.reason || error.message}`); }
  }
  function composeAuthorityRevokeV2(state, { at } = {}) {
    const source = normalize(state);
    if (!positive(at)) throw reject('invalid-revoke-at');
    let next = clone(source);
    next.policy.authorityEnabled = false;
    next.policy.paused = true;
    const cancelled = [];
    const protectedCompleting = [];
    const transportIntents = [];
    for (const assignment of Object.values(source.assignments)) {
      const worker = source.workers[assignment.workerId];
      if (assignment.phase === 'completing') {
        protectedCompleting.push(assignment.id);
        continue;
      }
      if (!worker) throw reject(`assignment-worker-missing:${assignment.id}`);
      transportIntents.push({ workerId: assignment.workerId, assignmentId: assignment.id, tabId: worker.tabId });
      const released = C6.cancelAssignment(next, { workerId: assignment.workerId, assignmentId: assignment.id });
      if (!released.result.ok) throw reject(`cancel-failed:${assignment.id}`);
      next = released.state;
      cancelled.push(released.result);
    }
    next = appendJournal(next, 'authority.killed', 'Operator revoked fleet dispatch authority', {
      cancelledAssignmentIds: cancelled.map((item) => item.assignmentId),
      protectedCompletingAssignmentIds: protectedCompleting,
      cancelledActive: cancelled.length,
      protectedCompleting: protectedCompleting.length,
    }, at);
    return {
      state: next,
      result: {
        killed: true,
        cancelledActive: cancelled.length,
        protectedCompleting,
        activeAssignments: cancelled,
        transportWarnings: [],
        transportIntents,
      },
    };
  }
  global.ModelFleetStateM7C8 = Object.freeze({ composeAuthorityRevokeV2 });
}(globalThis));
