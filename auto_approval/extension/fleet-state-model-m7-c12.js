'use strict';

// C12 canonical topology planning boundary. Creation/removal orchestration is
// supplied by the browser wrapper; this module owns only immutable v2 plans
// and exact removal eligibility.
(function installM7C12(global) {
  const C3 = global.ModelFleetStateM7C3;
  const C2 = global.ModelFleetStateM7C2;
  const C10 = global.ModelFleetStateM7C10;
  if (!C3 || !C2 || !C10) throw new Error('M7 C12 requires C2, C3, and C10');
  const ROLES = Object.freeze(['coordinator', 'implementation', 'review']);
  const ROLE_SET = new Set(ROLES);
  const clone = (value) => typeof global.structuredClone === 'function' ? global.structuredClone(value) : JSON.parse(JSON.stringify(value));
  const positive = (value) => Number.isFinite(value) && value > 0;
  const integer = (value) => Number.isInteger(value);
  function reject(reason) {
    const error = new Error(`M7 C12 topology rejected: ${reason}`);
    error.code = 'M7_C12_REJECTED';
    error.reason = reason;
    return error;
  }
  function normalize(state) {
    try { return C3.normalizeV2(state); }
    catch (error) { throw reject(`invalid-v2-state:${error.reason || error.message}`); }
  }
  function role(value) { return C10.canonicalRole(value); }
  function topologyRole(value) {
    const normalized = String(value || '').trim().toLowerCase();
    const aliases = { generalist: 'coordinator', research: 'coordinator', architect: 'coordinator', test: 'review', integrator: 'review', verifier: 'review', 'verifier-integrator': 'review', 'verifier / integrator': 'review' };
    const result = aliases[normalized] || normalized;
    if (!ROLE_SET.has(result)) throw reject('unsupported-fleet-role');
    return result;
  }
  function topologyCounts(source) {
    const counts = Object.fromEntries(ROLES.map((item) => [item, 0]));
    for (const worker of Object.values(source.workers)) {
      if (!worker || worker.enabled !== true || worker.lifecycle === 'stale' || !integer(worker.tabId)) continue;
      const workerRole = role(worker.role);
      if (ROLE_SET.has(workerRole)) counts[workerRole] += 1;
    }
    return counts;
  }
  function removableWorkerV2(state, workerId, { now, heartbeatMaxAgeMs = 30000, targetRole } = {}) {
    const source = normalize(state);
    if (!Number.isFinite(now) || now < 0 || !Number.isFinite(heartbeatMaxAgeMs) || heartbeatMaxAgeMs < 0) throw reject('invalid-availability-time');
    const worker = source.workers[workerId];
    if (!worker) return { removable: false, reason: 'worker-not-found' };
    if (worker.enabled !== true) return { removable: false, reason: 'worker-disabled' };
    if (worker.topologyManaged !== true) return { removable: false, reason: 'worker-not-topology-managed' };
    const workerRole = role(worker.role);
    if (targetRole !== undefined && workerRole !== targetRole) return { removable: false, reason: 'role-mismatch' };
    if (!integer(worker.tabId)) return { removable: false, reason: 'tab-unbound' };
    if (worker.currentAssignmentId != null) return { removable: false, reason: 'assignment-active' };
    if (worker.fault != null) return { removable: false, reason: 'worker-faulted' };
    if (worker.lifecycle === 'rotating') return { removable: false, reason: 'rotation-in-progress' };
    if (worker.chatRotationPending === true) return { removable: false, reason: 'rotation-pending' };
    if (Number(worker.pageBusyUntil || 0) > now) return { removable: false, reason: 'page-busy-cooldown' };
    const availability = C2.workerAvailability(source, workerId, { now, heartbeatMaxAgeMs });
    if (availability !== 'idle') return { removable: false, reason: `availability-${availability}`, availability };
    return { removable: true, workerId, role: workerRole, tabId: worker.tabId, windowId: worker.windowId, registeredAt: worker.registeredAt || 0, availability };
  }
  function topologyPlanV2(state, { now, heartbeatMaxAgeMs = 30000 } = {}) {
    const source = normalize(state);
    if (!Number.isFinite(now) || now < 0 || !Number.isFinite(heartbeatMaxAgeMs) || heartbeatMaxAgeMs < 0) throw reject('invalid-topology-time');
    const desired = Object.fromEntries(ROLES.map((item) => [item, Math.max(0, Math.min(16, Math.trunc(Number(source.topology?.desiredRoleCounts?.[item]) || 0)))]));
    const current = topologyCounts(source);
    const candidates = Object.fromEntries(ROLES.map((item) => [item, []]));
    const protectedWorkers = [];
    for (const worker of Object.values(source.workers)) {
      const workerRole = role(worker.role);
      if (!ROLE_SET.has(workerRole)) continue;
      const check = removableWorkerV2(source, worker.id, { now, heartbeatMaxAgeMs, targetRole: workerRole });
      if (check.removable) candidates[workerRole].push(clone(worker));
      else if (current[workerRole] > desired[workerRole]) protectedWorkers.push({ workerId: worker.id, role: workerRole, reason: check.reason });
    }
    for (const item of ROLES) candidates[item].sort((a, b) => Number(b.registeredAt || 0) - Number(a.registeredAt || 0) || String(b.id).localeCompare(String(a.id), undefined, { numeric: true }));
    const missing = Object.fromEntries(ROLES.map((item) => [item, Math.max(0, desired[item] - current[item])]));
    const excess = Object.fromEntries(ROLES.map((item) => [item, Math.max(0, current[item] - desired[item])]));
    return { desired, current, candidates, removableCandidates: candidates, missing, excess, protectedWorkers };
  }
  global.ModelFleetStateM7C12 = Object.freeze({ topologyRoleCountsV2: (state) => topologyCounts(normalize(state)), topologyPlanV2, removableWorkerV2 });
}(globalThis));
