'use strict';

// C13 canonical settings/control-intent mutations. Destructive controls and
// operator work APIs remain isolated in their later slices.
(function installM7C13(global) {
  const C3 = global.ModelFleetStateM7C3;
  if (!C3) throw new Error('M7 C13 requires C3');
  const clone = (value) => typeof global.structuredClone === 'function' ? global.structuredClone(value) : JSON.parse(JSON.stringify(value));
  const positive = (value) => Number.isFinite(value) && value > 0;
  function reject(reason) {
    const error = new Error(`M7 C13 settings rejected: ${reason}`);
    error.code = 'M7_C13_REJECTED';
    error.reason = reason;
    return error;
  }
  function normalize(state) {
    try { return C3.normalizeV2(state); }
    catch (error) { throw reject(`invalid-v2-state:${error.reason || error.message}`); }
  }
  function append(state, type, text, detail, at) {
    if (!positive(at)) throw reject('invalid-mutation-time');
    try { return C3.appendJournal(state, type, text, detail, at); }
    catch (error) { throw reject(`invalid-v2-result:${error.reason || error.message}`); }
  }
  function finalize(state) {
    try { return C3.finalizeV2(state); }
    catch (error) { throw reject(`invalid-v2-result:${error.reason || error.message}`); }
  }
  function setWorkspacePathV2(state, { workspacePath, at } = {}) {
    const source = normalize(state);
    const value = String(workspacePath || '').trim();
    const next = clone(source);
    next.workspacePath = value;
    const journaled = append(next, 'workspace.path.changed', value || 'Workspace path cleared', { workspacePath: value }, at);
    return { state: finalize(journaled), result: { workspacePath: value } };
  }
  function setGoalV2(state, { goal, at } = {}) {
    const source = normalize(state);
    const value = String(goal || '').trim();
    const next = clone(source);
    next.goal = value;
    next.lastGoalContinuationKey = '';
    const journaled = append(next, 'goal.changed', value || 'Goal cleared', { goal: value }, at);
    return { state: finalize(journaled), result: { goal: value, lastGoalContinuationKey: '' } };
  }
  function maxConcurrency(value) {
    const parsed = Number(value || 1);
    if (!Number.isFinite(parsed)) throw reject('invalid-max-concurrency');
    return Math.max(1, Math.min(64, parsed));
  }
  function warmIdleMs(value) {
    return Math.max(10000, Math.min(300000, Number(value) || 60000));
  }
  function updatePolicyV2(state, { patch, at } = {}) {
    const source = normalize(state);
    if (patch == null || typeof patch !== 'object' || Array.isArray(patch)) throw reject('invalid-policy-patch');
    const next = clone(source);
    const policy = next.policy;
    if (Object.prototype.hasOwnProperty.call(patch, 'maxConcurrency')) policy.maxConcurrency = maxConcurrency(patch.maxConcurrency);
    if (Object.prototype.hasOwnProperty.call(patch, 'paused')) policy.paused = patch.paused === true;
    if (Object.prototype.hasOwnProperty.call(patch, 'authorityEnabled')) policy.authorityEnabled = patch.authorityEnabled === true;
    if (Object.prototype.hasOwnProperty.call(patch, 'activeWorkerWindows')) policy.activeWorkerWindows = patch.activeWorkerWindows !== false;
    if (Object.prototype.hasOwnProperty.call(patch, 'warmIdleMs')) policy.warmIdleMs = warmIdleMs(patch.warmIdleMs);
    const journaled = append(next, 'policy.changed', 'Execution policy updated', { ...policy }, at);
    return { state: finalize(journaled), result: { policy: clone(journaled.policy) } };
  }
  global.ModelFleetStateM7C13 = Object.freeze({ setWorkspacePathV2, setGoalV2, updatePolicyV2 });
}(globalThis));
