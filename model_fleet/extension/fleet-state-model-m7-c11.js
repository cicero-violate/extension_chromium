'use strict';

// C11 canonical role and topology intent mutations. Topology reconciliation,
// policy mutation, and operator/work APIs remain later bounded slices.
(function installM7C11(global) {
  const C3 = global.ModelFleetStateM7C3;
  const C10 = global.ModelFleetStateM7C10;
  if (!C3 || !C10) throw new Error('M7 C11 requires C3 and C10');
  const ROLES = new Set(['coordinator', 'implementation', 'review']);
  const ROLE_ALIASES = Object.freeze({
    generalist: 'coordinator', research: 'coordinator', architect: 'coordinator',
    test: 'review', integrator: 'review', verifier: 'review',
    'verifier-integrator': 'review', 'verifier / integrator': 'review',
  });
  const DEFAULT_MAX_TURNS = 10;
  const MAX_ROLE_COUNT = 16;

  function clone(value) {
    return typeof global.structuredClone === 'function' ? global.structuredClone(value) : JSON.parse(JSON.stringify(value));
  }
  function positive(value) { return Number.isFinite(value) && value > 0; }
  function reject(reason) {
    const error = new Error(`M7 C11 mutation rejected: ${reason}`);
    error.code = 'M7_C11_REJECTED';
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
  function normalizedRole(value) {
    const raw = String(value || '').trim().toLowerCase();
    return ROLE_ALIASES[raw] || raw || 'coordinator';
  }
  function topologyRole(value) {
    const role = normalizedRole(value);
    if (!ROLES.has(role)) throw reject('unsupported-fleet-role');
    return role;
  }
  function boundedCount(value) {
    return Math.max(0, Math.min(MAX_ROLE_COUNT, Math.trunc(Number(value) || 0)));
  }
  function boundedTurnLimit(value) {
    const parsed = Math.trunc(Number(value));
    return Math.max(1, Math.min(50, Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_MAX_TURNS));
  }
  function roleLimit(topology, role) {
    return boundedTurnLimit(topology?.maxTurnsPerChatByRole?.[role]);
  }
  function workerTurns(worker) {
    return Math.max(0, Math.trunc(Number(worker.chatTurnCount || 0)));
  }

  function setWorkerRoleV2(state, { workerId, role, at } = {}) {
    const source = normalize(state);
    const worker = source.workers[workerId];
    if (!worker) throw reject('worker-not-found');
    if (worker.currentAssignmentId != null) throw reject('role-change-active-assignment');
    const nextRole = C10.canonicalRole(role);
    const next = clone(source);
    const current = next.workers[workerId];
    const previousRole = current.role;
    current.role = nextRole;
    const limit = roleLimit(next.topology, nextRole);
    if (workerTurns(current) >= limit) current.chatRotationPending = true;
    const journaled = append(next, 'worker.role', `${workerId} role → ${nextRole}`, {
      workerId, previousRole, role: nextRole, chatTurnCount: workerTurns(current), limit,
    }, at);
    return { state: journaled, result: { workerId, role: nextRole, rotationPending: journaled.workers[workerId].chatRotationPending === true } };
  }

  function setTopologyRoleCountV2(state, { role, count, at } = {}) {
    const source = normalize(state);
    const normalized = topologyRole(role);
    const nextCount = boundedCount(count);
    const next = clone(source);
    next.topology.desiredRoleCounts[normalized] = nextCount;
    const journaled = append(next, 'topology.role_target', `${normalized} target → ${nextCount}`, { role: normalized, count: nextCount }, at);
    return { state: journaled, result: { role: normalized, count: nextCount } };
  }

  function setRoleTurnLimitV2(state, { role, limit, at } = {}) {
    const source = normalize(state);
    const normalized = topologyRole(role);
    const nextLimit = boundedTurnLimit(limit);
    const next = clone(source);
    next.topology.maxTurnsPerChatByRole[normalized] = nextLimit;
    const rotationPendingWorkerIds = [];
    for (const worker of Object.values(next.workers)) {
      if (C10.canonicalRole(worker.role) !== normalized) continue;
      if (workerTurns(worker) >= nextLimit) {
        worker.chatRotationPending = true;
        rotationPendingWorkerIds.push(worker.id);
      }
    }
    const journaled = append(next, 'topology.role_turn_limit', `${normalized} turns/chat → ${nextLimit}`, {
      role: normalized, maxTurnsPerChat: nextLimit,
    }, at);
    return { state: journaled, result: { role: normalized, maxTurnsPerChat: nextLimit, rotationPendingWorkerIds } };
  }

  global.ModelFleetStateM7C11 = Object.freeze({
    setWorkerRoleV2, setTopologyRoleCountV2, setRoleTurnLimitV2,
    canonicalRole: C10.canonicalRole, normalizeRole: normalizedRole,
  });
}(globalThis));
