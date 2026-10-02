'use strict';

// C10 canonical worker registration/binding boundary. General worker, role,
// policy, and public projection mutations remain later slices.
(function installM7C10(global) {
  const C3 = global.ModelFleetStateM7C3;
  if (!C3) throw new Error('M7 C10 requires C3');
  const clone = (value) => typeof global.structuredClone === 'function' ? global.structuredClone(value) : JSON.parse(JSON.stringify(value));
  const positive = (value) => Number.isFinite(value) && value > 0;
  const integer = (value) => Number.isInteger(value);
  const ROLE_ALIASES = Object.freeze({
    generalist: 'coordinator', research: 'coordinator', architect: 'coordinator',
    test: 'review', integrator: 'review', verifier: 'review',
    'verifier-integrator': 'review', 'verifier / integrator': 'review',
  });
  const ROLES = new Set(['coordinator', 'implementation', 'review']);
  function canonicalRole(value) {
    const raw = String(value || '').trim().toLowerCase();
    const role = ROLE_ALIASES[raw] || raw;
    return ROLES.has(role) ? role : 'coordinator';
  }
  function reject(reason) {
    const error = new Error(`M7 C10 registration rejected: ${reason}`);
    error.code = 'M7_C10_REJECTED';
    error.reason = reason;
    return error;
  }
  function normalize(state) {
    try { return C3.normalizeV2(state); }
    catch (error) { throw reject(`invalid-v2-state:${error.reason || error.message}`); }
  }
  function append(state, type, text, detail, at) {
    if (!positive(at)) throw reject('invalid-registration-time');
    try { return C3.appendJournal(state, type, text, detail, at); }
    catch (error) { throw reject(`invalid-v2-result:${error.reason || error.message}`); }
  }
  function capabilities(value, fallback) {
    const source = Array.isArray(value) ? value : (Array.isArray(fallback) ? fallback : []);
    return [...new Set(source.map(String).filter(Boolean))];
  }
  function allocate(state) {
    let slot = Math.max(1, Math.trunc(Number(state.nextWorkerSlot) || 1));
    let id;
    do { id = `W-S${String(slot++).padStart(4, '0')}`; } while (state.workers[id]);
    state.nextWorkerSlot = slot;
    return id;
  }
  function newWorker(id, tab, patch, at) {
    const role = canonicalRole(patch.role);
    return {
      id, tabId: tab.id, lastTabId: tab.id,
      name: String(patch.name || `ChatGPT ${tab.id}`), role,
      capabilities: capabilities(patch.capabilities, ['chatgpt', 'natural-language', 'mcp-connector', 'approval-wasm']), enabled: true,
      currentAssignmentId: null, controlInbox: [],
      runtime: { lastHeartbeatAt: 0, busy: false, reportedAssignmentId: null },
      fault: null, lifecycle: 'idle', pageBusyUntil: 0,
      warmIdleSince: 0, warmIdleUntil: 0,
      topologyManaged: patch.topologyManaged === true,
      chatTurnCount: 0, chatRotationPending: false, lastCountedAssignmentId: '',
      lastChatRotationAt: 0, lastChatRotationError: '',
      progressVersion: 0, lastResultAt: 0, lastCompletionAssignmentId: '',
      lastResponseTerminalAt: 0, lastAssignmentReleasedAt: 0,
      lastCompletionReleaseLagMs: 0, completionReleaseLagCount: 0,
      completionReleaseLagTotalMs: 0, completionReleaseLagMaxMs: 0,
      registeredAt: at, staleAt: 0, lastStaleReason: '',
      title: String(tab.title || ''), url: String(tab.url || ''),
      windowId: integer(tab.windowId) ? tab.windowId : null,
      activeWindowId: null,
    };
  }
  function upsertWorkerBindingV2(state, { tab, patch = {}, at } = {}) {
    const source = normalize(state);
    if (!tab || !integer(tab.id)) throw reject('invalid-tab-id');
    if (!positive(at)) throw reject('invalid-registration-time');
    if (patch == null || typeof patch !== 'object' || Array.isArray(patch)) throw reject('invalid-registration-patch');
    const boundOwners = new Map();
    for (const worker of Object.values(source.workers)) {
      if (!integer(worker.tabId)) continue;
      const owners = boundOwners.get(worker.tabId) || [];
      owners.push(worker.id);
      boundOwners.set(worker.tabId, owners);
    }
    if ([...boundOwners.values()].some((owners) => owners.length > 1)) {
      throw reject('registration-tab-binding-conflict');
    }
    const bound = Object.values(source.workers).find((worker) => worker.tabId === tab.id) || null;
    const requested = !bound && patch.workerId ? source.workers[patch.workerId] : null;
    if (requested && integer(requested.tabId) && requested.tabId !== tab.id) throw reject('requested-worker-already-bound');
    const staleSameTab = !bound && !requested
      ? Object.values(source.workers).find((worker) => !integer(worker.tabId) && worker.lastTabId === tab.id) || null : null;
    const requestedRole = canonicalRole(patch.role);
    const topologyManaged = !bound && !requested && !staleSameTab && patch.topologyManaged === true;
    const topology = topologyManaged
      ? Object.values(source.workers).find((worker) => worker.topologyManaged === true
        && !integer(worker.tabId) && canonicalRole(worker.role) === requestedRole) || null : null;
    const selected = bound || requested || staleSameTab || topology;
    const bindingMode = bound ? 'bound' : requested ? 'requested' : staleSameTab ? 'stale-same-tab' : topology ? 'topology' : 'new';
    const id = selected?.id || allocate(source);
    const existing = selected ? source.workers[id] : null;
    const role = canonicalRole(patch.role || existing?.role);
    if (existing?.currentAssignmentId && role !== canonicalRole(existing.role)) throw reject('registration-role-change-with-active-assignment');
    const next = clone(source);
    const current = existing ? next.workers[id] : newWorker(id, tab, patch, at);
    if (existing) {
      current.id = id;
      current.tabId = tab.id;
      current.lastTabId = tab.id;
      current.title = String(tab.title || current.title || '');
      current.url = String(tab.url || current.url || '');
      current.windowId = integer(tab.windowId) ? tab.windowId : current.windowId || null;
      current.role = role;
      if (Array.isArray(patch.capabilities)) current.capabilities = capabilities(patch.capabilities, current.capabilities);
      current.name = String(patch.name || current.name || `ChatGPT ${tab.id}`);
      if (patch.topologyManaged !== undefined) current.topologyManaged = patch.topologyManaged === true;
      current.enabled = true;
      current.staleAt = 0;
      current.lastStaleReason = '';
      if (!current.currentAssignmentId) {
        current.lifecycle = 'idle';
        current.pageBusyUntil = 0;
      }
      if (!current.runtime || typeof current.runtime !== 'object') current.runtime = { lastHeartbeatAt: 0, busy: false, reportedAssignmentId: null };
      current.runtime = {
        lastHeartbeatAt: Number(current.runtime.lastHeartbeatAt || 0),
        busy: current.runtime.busy === true,
        reportedAssignmentId: current.runtime.reportedAssignmentId == null ? null : String(current.runtime.reportedAssignmentId),
      };
    }
    next.workers[id] = current;
    const journaled = append(next, 'worker.registered', `${id} registered`, {
      workerId: id, tabId: tab.id, role: current.role, bindingMode,
    }, at);
    const targetOwners = Object.values(journaled.workers).filter((worker) => worker.tabId === tab.id);
    if (targetOwners.length !== 1 || targetOwners[0].id !== id) throw reject('registration-tab-binding-conflict');
    return {
      state: journaled,
      result: { worker: clone(journaled.workers[id]), bindingMode },
    };
  }
  global.ModelFleetStateM7C10 = Object.freeze({ upsertWorkerBindingV2, canonicalRole });
}(globalThis));
