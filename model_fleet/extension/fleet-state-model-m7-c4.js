'use strict';

// C4 heartbeat observation and bridge-recovery boundary. Completion,
// cancellation, flush/stop, and public projection remain later slices.
(function installM7C4(global) {
  const C1 = global.ModelFleetStateM7C1;
  const C2 = global.ModelFleetStateM7C2;
  const C3 = global.ModelFleetStateM7C3;
  if (!C1 || !C2 || !C3) throw new Error('M7 C4 requires C1-C3');
  const clone = (value) => typeof global.structuredClone === 'function' ? global.structuredClone(value) : JSON.parse(JSON.stringify(value));
  const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
  const object = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
  const positive = (value) => Number.isFinite(value) && value > 0;
  function reject(reason) { const error = new Error(`M7 C4 heartbeat/recovery rejected: ${reason}`); error.code = 'M7_C4_REJECTED'; error.reason = reason; return error; }
  function validateTimelines(state) {
    for (const record of Object.values(state.assignments || {})) {
      const fields = ['reservedAt', 'dispatchAttemptAt', 'acceptedAt', 'startedAt', 'responseTerminalAt'];
      if (!fields.every((field) => Number.isFinite(record[field]) && record[field] >= 0)) throw reject(`invalid-assignment-timeline:${record.id}:nonfinite-or-negative`);
      if (!positive(record.reservedAt)) throw reject(`invalid-assignment-timeline:${record.id}:reserved-at`);
      if (record.dispatchAttemptAt !== 0 && record.dispatchAttemptAt < record.reservedAt) throw reject(`invalid-assignment-timeline:${record.id}:dispatch-before-reservation`);
      if (record.phase === 'reserved') {
        if (record.acceptedAt !== 0 || record.startedAt !== 0 || record.responseTerminalAt !== 0) throw reject(`invalid-assignment-timeline:${record.id}:reserved-terminal-fields`);
      } else if (record.phase === 'activating') {
        if (!(record.dispatchAttemptAt > 0) || record.acceptedAt < record.dispatchAttemptAt || record.startedAt !== 0 || record.responseTerminalAt !== 0) throw reject(`invalid-assignment-timeline:${record.id}:activating-order`);
      } else if (record.phase === 'running') {
        if (!(record.dispatchAttemptAt > 0) || record.acceptedAt < record.dispatchAttemptAt || record.startedAt < record.acceptedAt || record.responseTerminalAt !== 0) throw reject(`invalid-assignment-timeline:${record.id}:running-order`);
      } else if (record.phase === 'completing') {
        if (!(record.dispatchAttemptAt > 0) || record.acceptedAt < record.dispatchAttemptAt || record.startedAt < record.acceptedAt || !(record.responseTerminalAt >= record.startedAt && record.responseTerminalAt > 0)) throw reject(`invalid-assignment-timeline:${record.id}:completing-order`);
      } else throw reject(`invalid-assignment-timeline:${record.id}:unknown-phase`);
    }
  }
  function normalize(state) { try { const source = C3.normalizeV2(state); validateTimelines(source); return source; } catch (error) { throw reject(`invalid-v2-state:${error.reason || error.message}`); } }
  function finalize(state) { try { return C3.finalizeV2(state); } catch (error) { throw reject(`invalid-v2-result:${error.reason || error.message}`); } }
  function assignment(source, workerId) {
    const worker = source.workers[workerId];
    if (!worker) throw reject('worker-not-found');
    if (worker.currentAssignmentId == null) return { worker, assignment: null };
    const record = source.assignments[worker.currentAssignmentId];
    if (!record || record.workerId !== workerId) throw reject('assignment-pointer-mismatch');
    return { worker, assignment: record };
  }
  function reportedValue(observation) {
    if (!observation.hasAssignmentIdentity) return undefined;
    if (observation.reportedAssignmentId === null) return null;
    if (typeof observation.reportedAssignmentId !== 'string' || observation.reportedAssignmentId.length === 0) throw reject('invalid-reported-assignment-id');
    return observation.reportedAssignmentId;
  }
  function validateObservation(observation) {
    if (!object(observation) || typeof observation.workerId !== 'string' || !observation.workerId || !positive(observation.observedAt) || typeof observation.busy !== 'boolean' || typeof observation.hasAssignmentIdentity !== 'boolean') throw reject('invalid-heartbeat-observation');
    reportedValue(observation);
    if (own(observation, 'title') && observation.title !== '' && typeof observation.title !== 'string') throw reject('invalid-heartbeat-title');
    if (own(observation, 'url') && observation.url !== '' && typeof observation.url !== 'string') throw reject('invalid-heartbeat-url');
    if (own(observation, 'windowId') && observation.windowId !== null && !Number.isInteger(observation.windowId)) throw reject('invalid-heartbeat-window-id');
    if (own(observation, 'turnHealth') && !['idle', 'busy', 'stalled', 'dead', 'interrupted'].includes(observation.turnHealth)) throw reject('invalid-heartbeat-turn-health');
    for (const key of ['turnBusySince', 'turnLastProgressAt', 'turnStalledSince']) {
      if (own(observation, key) && (!Number.isFinite(observation[key]) || observation[key] < 0)) throw reject('invalid-heartbeat-' + key);
    }
    if (observation.busy === false && own(observation, 'turnHealth') && !['idle', 'interrupted'].includes(observation.turnHealth)) throw reject('idle-heartbeat-nonidle-turn-health');
    if (['stalled', 'dead'].includes(observation.turnHealth) && observation.busy !== true) throw reject('turn-health-requires-busy');
  }
  function observationMetadata(next, worker, observation) {
    if (own(observation, 'title') && observation.title !== '') next.title = observation.title;
    if (own(observation, 'url') && observation.url !== '') next.url = observation.url;
    if (own(observation, 'windowId') && Number.isInteger(observation.windowId)) next.windowId = observation.windowId;
    return next;
  }
  function matchingHeartbeatEvidence(workerId, assignmentId, observation) {
    return { success: true, kind: 'matching-heartbeat', workerId, at: observation.observedAt, observedAt: observation.observedAt, hasAssignmentIdentity: true, reportedAssignmentId: assignmentId, busy: true };
  }
  function releaseHeartbeat(source, workerId, record) {
    const next = clone(source);
    if (record.kind === 'task') {
      const task = next.tasks[record.taskId];
      if (task) { task.phase = 'pending'; task.assignedWorkerId = null; task.startedAt = 0; }
    } else if (record.kind === 'message') {
      for (const id of record.messageIds) {
        const message = next.messages.find((item) => item.id === id);
        if (message) message.phase = 'queued';
      }
    }
    delete next.assignments[record.id];
    next.workers[workerId].currentAssignmentId = null;
    return finalize(next);
  }
  function applyFault(next, workerId, intent) {
    if (!intent) return { state: next, faulted: false };
    if (!['heartbeat-custody-mismatch', 'm4-custody-contradiction'].includes(intent.code)) throw reject('invalid-m4-fault-intent');
    const worker = next.workers[workerId];
    if (intent.workerId !== workerId || intent.source !== 'heartbeat' || !positive(intent.observedAt)) throw reject('invalid-m4-fault-evidence');
    if (intent.expectedAssignmentId !== (worker.currentAssignmentId || null) || intent.assignmentId !== (worker.currentAssignmentId || null)) throw reject('m4-intent-assignment-mismatch');
    if (intent.code === 'm4-custody-contradiction' && (intent.reason !== 'claim-before-acceptance' || !next.assignments[intent.assignmentId] || next.assignments[intent.assignmentId].phase !== 'reserved' || intent.reportedAssignmentId !== intent.assignmentId)) throw reject('invalid-m4-fault-evidence');
    if (intent.code === 'heartbeat-custody-mismatch' && intent.reason === 'contradictory-page-identity' && (worker.currentAssignmentId !== null || worker.runtime.lastHeartbeatAt < intent.observedAt || worker.runtime.reportedAssignmentId !== intent.reportedAssignmentId)) throw reject('invalid-m4-fault-evidence');
    const result = clone(next);
    result.workers[workerId].fault = { code: intent.code, message: 'M4 custody contradiction', at: intent.observedAt, assignmentId: intent.assignmentId ?? null };
    return { state: finalize(result), faulted: true };
  }
  function clearMatchingFault(next, workerId, observation, assignmentId) {
    const worker = next.workers[workerId];
    if (!worker.fault || !['dispatch-failed', 'heartbeat-custody-mismatch', 'm4-custody-contradiction'].includes(worker.fault.code)) return { state: next, cleared: false };
    if (!positive(observation.observedAt) || observation.hasAssignmentIdentity !== true || observation.reportedAssignmentId !== assignmentId || observation.busy !== true || worker.currentAssignmentId !== assignmentId || worker.runtime.lastHeartbeatAt < observation.observedAt || worker.runtime.busy !== true || worker.runtime.reportedAssignmentId !== assignmentId || observation.observedAt < worker.fault.at) return { state: next, cleared: false };
    if (worker.fault.assignmentId != null && worker.fault.assignmentId !== assignmentId) return { state: next, cleared: false };
    const result = clone(next); result.workers[workerId].fault = null;
    return { state: finalize(result), cleared: true };
  }
  function applyHeartbeatObservationV2(state, observation = {}) {
    validateObservation(observation);
    const source = normalize(state); const { worker } = assignment(source, observation.workerId); const previous = worker.runtime; const reported = reportedValue(observation);
    if (observation.observedAt < previous.lastHeartbeatAt) return { state: source, result: { accepted: false, reason: 'stale-observation', m4Reconciliation: { ...clone(observation) } } };
    const nextReported = observation.hasAssignmentIdentity ? reported : previous.reportedAssignmentId;
    const metadata = {};
    if (own(observation, 'title') && observation.title !== '') metadata.title = observation.title;
    if (own(observation, 'url') && observation.url !== '') metadata.url = observation.url;
    if (own(observation, 'windowId') && Number.isInteger(observation.windowId)) metadata.windowId = observation.windowId;
    const same = observation.observedAt === previous.lastHeartbeatAt && observation.busy === previous.busy && nextReported === previous.reportedAssignmentId
      && (!own(observation, 'turnHealth') || observation.turnHealth === (previous.turnHealth || (previous.busy ? 'busy' : 'idle')))
      && (!own(observation, 'turnBusySince') || observation.turnBusySince === Number(previous.turnBusySince || 0))
      && (!own(observation, 'turnLastProgressAt') || observation.turnLastProgressAt === Number(previous.turnLastProgressAt || 0))
      && (!own(observation, 'turnStalledSince') || observation.turnStalledSince === Number(previous.turnStalledSince || 0))
      && (!own(metadata, 'title') || metadata.title === worker.title) && (!own(metadata, 'url') || metadata.url === worker.url) && (!own(metadata, 'windowId') || metadata.windowId === worker.windowId);
    if (observation.observedAt === previous.lastHeartbeatAt && !same) throw reject('conflicting-same-time-observation');
    const record = assignment(source, observation.workerId).assignment;
    if (observation.hasAssignmentIdentity && reported != null && record && reported !== record.id) return { state: source, result: { accepted: false, reason: 'custody-mismatch', faultIntent: { code: 'heartbeat-custody-mismatch', source: 'heartbeat', reason: 'custody-mismatch', workerId: observation.workerId, observedAt: observation.observedAt, hasAssignmentIdentity: true, expectedAssignmentId: record.id, reportedAssignmentId: reported, assignmentId: record.id }, m4Reconciliation: clone(observation) } };
    if (observation.hasAssignmentIdentity && reported != null && record?.phase === 'reserved') return { state: source, result: { accepted: false, reason: 'claim-before-acceptance', faultIntent: { code: 'm4-custody-contradiction', source: 'heartbeat', reason: 'claim-before-acceptance', workerId: observation.workerId, observedAt: observation.observedAt, hasAssignmentIdentity: true, expectedAssignmentId: record.id, reportedAssignmentId: reported, assignmentId: record.id }, m4Reconciliation: clone(observation) } };
    if (same) return { state: source, result: { accepted: true, idempotent: true, reason: 'duplicate-observation', m4Reconciliation: clone(observation) } };
    const next = clone(source); const target = next.workers[observation.workerId];
    target.runtime.lastHeartbeatAt = observation.observedAt; target.runtime.busy = observation.busy; target.runtime.reportedAssignmentId = nextReported;
    target.runtime.turnHealth = own(observation, 'turnHealth') ? observation.turnHealth : (observation.busy ? 'busy' : 'idle');
    target.runtime.turnBusySince = own(observation, 'turnBusySince') ? observation.turnBusySince : (observation.busy ? Number(previous.turnBusySince || observation.observedAt) : 0);
    target.runtime.turnLastProgressAt = own(observation, 'turnLastProgressAt') ? observation.turnLastProgressAt : (observation.busy ? Number(previous.turnLastProgressAt || observation.observedAt) : 0);
    target.runtime.turnStalledSince = own(observation, 'turnStalledSince') ? observation.turnStalledSince : 0;
    if (observation.busy === false) {
      target.runtime.turnRecoveryAttempts = 0;
      target.runtime.turnRecoveryAt = 0;
      target.runtime.turnRecoveryBusySince = 0;
    }
    observationMetadata(target, worker, metadata);
    const pageContradiction = observation.hasAssignmentIdentity && reported != null && !record;
    const result = { accepted: true, reason: pageContradiction ? 'contradictory-page-identity' : 'observation-recorded', faultIntent: pageContradiction ? { code: 'heartbeat-custody-mismatch', source: 'heartbeat', reason: 'contradictory-page-identity', workerId: observation.workerId, observedAt: observation.observedAt, hasAssignmentIdentity: true, expectedAssignmentId: null, reportedAssignmentId: reported, assignmentId: null } : null, m4Reconciliation: clone(observation) };
    return { state: finalize(next), result };
  }
  function reconcileHeartbeatCustody(state, observation = {}) {
    if (!positive(observation.observedAt)) throw reject('invalid-heartbeat-observed-at');
    const source = normalize(state); const { worker, assignment: record } = assignment(source, observation.workerId); const reported = observation.hasAssignmentIdentity ? reportedValue(observation) : undefined;
    if (!record) return { state: source, result: reported != null ? { kind: 'contradiction', reason: 'reported-assignment-without-durable-custody', reportedAssignmentId: reported } : { kind: 'observation', reason: 'no-durable-custody' } };
    if (reported != null && reported !== record.id) return { state: source, result: { kind: 'mismatch', reason: 'heartbeat-assignment-mismatch', expectedAssignmentId: record.id, reportedAssignmentId: reported } };
    if (record.phase === 'reserved') return { state: source, result: reported != null ? { kind: 'mismatch', reason: 'reserved-custody-unconfirmed', assignmentId: record.id } : { kind: 'preserved', reason: 'reserved-custody-unconfirmed', assignmentId: record.id } };
    if (record.phase === 'activating') {
      if (reported == null && observation.hasAssignmentIdentity && observation.busy === false) return { state: source, result: { kind: 'preserved', reason: 'activating-idle-heartbeat-preserved', assignmentId: record.id } };
      if (reported == null && observation.hasAssignmentIdentity && observation.busy === true) return { state: source, result: { kind: 'mismatch', reason: 'activating-explicit-null-busy', assignmentId: record.id } };
      if (reported === record.id && observation.busy === true) {
        if (observation.observedAt < Math.max(record.reservedAt, record.dispatchAttemptAt, record.acceptedAt)) throw reject('heartbeat-time-regression');
        const next = clone(source); next.assignments[record.id].phase = 'running'; next.assignments[record.id].startedAt = next.assignments[record.id].startedAt || observation.observedAt; return { state: finalize(next), result: { kind: 'confirmed', reason: 'matching-custody-confirmed', assignmentId: record.id } };
      }
      return { state: source, result: { kind: 'preserved', reason: 'activating-custody-unconfirmed', assignmentId: record.id } };
    }
    if (record.phase === 'running') {
      if (reported === undefined || reported === record.id) return { state: source, result: { kind: 'preserved', reason: 'running-custody-preserved', assignmentId: record.id } };
      if (reported === null && observation.busy === true) return { state: source, result: { kind: 'mismatch', reason: 'explicit-null-busy-mismatch', assignmentId: record.id } };
      if (reported === null && observation.busy === false) {
        const watermark = Math.max(record.reservedAt, record.dispatchAttemptAt, record.acceptedAt, record.startedAt);
        if (observation.observedAt < watermark) return { state: source, result: { kind: 'preserved', reason: 'stale-heartbeat-observation', assignmentId: record.id, watermark } };
        return { state: releaseHeartbeat(source, observation.workerId, record), result: { kind: 'released', reason: 'explicit-idle-loss', assignmentId: record.id } };
      }
    }
    return { state: source, result: { kind: record.phase === 'completing' ? 'preserved' : 'preserved', reason: record.phase === 'completing' ? 'completion-custody-protected' : 'custody-preserved', assignmentId: record.id } };
  }
  function processHeartbeat(state, observation = {}) {
    const first = applyHeartbeatObservationV2(state, observation);
    if (first.result.reason === 'stale-observation') return { state: first.state, result: { ...first.result, custody: { kind: 'preserved', reason: 'stale-observation' }, scheduleNeeded: false, faulted: false, cleared: false, released: false, confirmed: false, preserved: true, mismatch: false } };
    const custody = reconcileHeartbeatCustody(first.state, observation);
    let next = custody.state; let faulted = false; let cleared = false;
    if (first.result.faultIntent) { const applied = applyFault(next, observation.workerId, first.result.faultIntent); next = applied.state; faulted = applied.faulted; }
    if (!faulted && custody.result.kind === 'mismatch' && first.result.faultIntent) { const applied = applyFault(next, observation.workerId, first.result.faultIntent); next = applied.state; faulted = applied.faulted; }
    if (!faulted && observation.hasAssignmentIdentity === true && observation.reportedAssignmentId != null && observation.busy === true) { const clearedResult = clearMatchingFault(next, observation.workerId, observation, next.workers[observation.workerId].currentAssignmentId); next = clearedResult.state; cleared = clearedResult.cleared; }
    return { state: finalize(next), result: { ...first.result, custody: custody.result, scheduleNeeded: custody.result.kind === 'released', faulted, cleared, released: custody.result.kind === 'released', confirmed: custody.result.kind === 'confirmed', preserved: custody.result.kind === 'preserved', mismatch: custody.result.kind === 'mismatch' } };
  }
  function reconcileRecoveryCustody(state, input = {}) {
    const source = normalize(state); const { worker, assignment: record } = assignment(source, input.workerId); const reported = input.hasAssignmentIdentity ? reportedValue(input) : undefined;
    if (!positive(input.observedAt)) throw reject('invalid-recovery-observed-at');
    let next = clone(source); next.workers[input.workerId].runtime.lastHeartbeatAt = Math.max(next.workers[input.workerId].runtime.lastHeartbeatAt, input.observedAt); if (own(input, 'busy')) next.workers[input.workerId].runtime.busy = input.busy; if (input.hasAssignmentIdentity) next.workers[input.workerId].runtime.reportedAssignmentId = reported;
    if (own(input, 'turnHealth')) next.workers[input.workerId].runtime.turnHealth = input.turnHealth;
    if (own(input, 'turnBusySince')) next.workers[input.workerId].runtime.turnBusySince = input.turnBusySince;
    if (own(input, 'turnLastProgressAt')) next.workers[input.workerId].runtime.turnLastProgressAt = input.turnLastProgressAt;
    if (own(input, 'turnStalledSince')) next.workers[input.workerId].runtime.turnStalledSince = input.turnStalledSince;
    if (input.busy === false) {
      next.workers[input.workerId].runtime.turnRecoveryAttempts = 0;
      next.workers[input.workerId].runtime.turnRecoveryAt = 0;
      next.workers[input.workerId].runtime.turnRecoveryBusySince = 0;
    }
    if (!record && reported != null) return { state: source, result: { ok: false, code: 'assignment_ownership_mismatch', terminal: true, expectedAssignmentId: null, reportedAssignmentId: reported } };
    if (!record) return { state: finalize(next), result: { ok: true, terminal: true, outcome: 'no-owner', reportedAssignmentId: null } };
    if (reported != null && reported !== record.id) return { state: source, result: { ok: false, code: 'assignment_ownership_mismatch', terminal: false, expectedAssignmentId: record.id, reportedAssignmentId: reported } };
    if (input.unrecoverable) { if (record.phase === 'completing') throw reject('completion-custody-protected'); return { state: releaseHeartbeat(source, input.workerId, record), result: { ok: true, outcome: 'unrecoverable-released', assignmentId: record.id } }; }
    if (record.phase === 'reserved') {
      if (reported === record.id) return { state: source, result: { ok: false, code: 'claim-before-acceptance', terminal: false, assignmentId: record.id } };
      return { state: source, result: { ok: true, outcome: 'reservation-preserved', assignmentId: record.id } };
    }
    if (record.phase === 'completing') return { state: finalize(next), result: { ok: true, outcome: input.pendingCompletionProof && reported === record.id ? 'completion-reattached' : 'completion-proof-pending', assignmentId: record.id } };
    if (record.phase === 'activating' && (input.reattached || input.promptProof) && reported === record.id) { if (input.observedAt < Math.max(record.reservedAt, record.dispatchAttemptAt, record.acceptedAt)) throw reject('recovery-time-regression'); next.assignments[record.id].phase = 'running'; next.assignments[record.id].startedAt = next.assignments[record.id].startedAt || input.observedAt; return { state: finalize(next), result: { ok: true, outcome: 'reattached-running', assignmentId: record.id } }; }
    if (record.phase === 'activating') return { state: finalize(next), result: { ok: true, outcome: 'activation-preserved', assignmentId: record.id } };
    return { state: finalize(next), result: { ok: true, outcome: (input.reattached || input.promptProof) ? 'reattached' : 'recovery-preserved', assignmentId: record.id } };
  }
  function clearFaultWithEvidence(state, workerId, evidence = {}) {
    const source = normalize(state); const worker = source.workers[workerId];
    if (!worker) throw reject('worker-not-found');
    if (!worker.fault) return { state: source, result: { cleared: false, reason: 'no-fault' } };
    if (!['dispatch-failed', 'heartbeat-custody-mismatch', 'm4-custody-contradiction'].includes(worker.fault.code)) return { state: source, result: { cleared: false, reason: 'fault-not-clearable' } };
    if (!object(evidence) || evidence.success !== true || !positive(evidence.at) || evidence.workerId !== workerId || evidence.at < worker.fault.at) throw reject('invalid-clear-proof');
    if (evidence.kind === 'matching-heartbeat') {
      if (!positive(evidence.observedAt) || evidence.at !== evidence.observedAt || evidence.hasAssignmentIdentity !== true || evidence.busy !== true || worker.currentAssignmentId == null || evidence.reportedAssignmentId !== worker.currentAssignmentId || worker.runtime.lastHeartbeatAt < evidence.observedAt || worker.runtime.busy !== true || worker.runtime.reportedAssignmentId !== worker.currentAssignmentId || (worker.fault.assignmentId != null && worker.fault.assignmentId !== worker.currentAssignmentId)) throw reject('invalid-clear-proof');
    } else if (evidence.kind === 'bridge-recovery' || evidence.kind === 'm4-recovery') {
      const recovery = evidence.recoveryInput; const outcome = evidence.result?.ok === true ? evidence.result.outcome : null;
      if (!object(recovery) || recovery.workerId !== workerId || !positive(recovery.observedAt) || evidence.at !== recovery.observedAt || recovery.observedAt < worker.fault.at || !['reattached-running', 'reattached', 'completion-reattached', 'no-owner'].includes(outcome)) throw reject('invalid-clear-proof');
      if (outcome === 'no-owner') {
        if (worker.currentAssignmentId !== null || (recovery.hasAssignmentIdentity !== false && !(recovery.hasAssignmentIdentity === true && recovery.reportedAssignmentId === null)) || (recovery.hasAssignmentIdentity === true && recovery.reportedAssignmentId !== null)) throw reject('invalid-clear-proof');
      } else {
        const id = evidence.result.assignmentId; const record = source.assignments[worker.currentAssignmentId];
        const proof = outcome === 'completion-reattached' ? recovery.pendingCompletionProof === true : (recovery.reattached === true || recovery.promptProof === true);
        if (typeof id !== 'string' || worker.currentAssignmentId !== id || !record || (outcome === 'completion-reattached' ? record.phase !== 'completing' : record.phase !== 'running') || recovery.hasAssignmentIdentity !== true || recovery.reportedAssignmentId !== id || !proof || (worker.fault.assignmentId != null && worker.fault.assignmentId !== id)) throw reject('invalid-clear-proof');
      }
    } else throw reject('invalid-clear-proof');
    const next = clone(source); next.workers[workerId].fault = null; return { state: finalize(next), result: { cleared: true } };
  }
  function recoveryPayloadV2(state, assignmentId) {
    const source = normalize(state);
    if (assignmentId == null) return { assignment: null, promptInputs: null, prompt: '' };
    const inputs = C2.resolveAssignmentPromptInputs(source, assignmentId); return { assignment: clone(inputs.assignment), promptInputs: clone(inputs), prompt: '' };
  }
  global.ModelFleetStateM7C4 = Object.freeze({ applyHeartbeatObservationV2, reconcileHeartbeatCustody, processHeartbeat, reconcileRecoveryCustody, clearFaultWithEvidence, recoveryPayloadV2 });
}(globalThis));
