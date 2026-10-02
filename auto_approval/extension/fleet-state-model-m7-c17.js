'use strict';

// C17 is a display-only consumer boundary. It never reconstructs canonical
// custody and never writes state; v2 inputs are already M6/C16 projections.
(function installM7C17(global) {
  const object = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
  const clone = (value) => typeof global.structuredClone === 'function'
    ? global.structuredClone(value)
    : JSON.parse(JSON.stringify(value));
  const positive = (value) => Number.isFinite(value) && value > 0;
  function reject(reason) {
    const error = new Error(`M6 control-pane projection rejected: ${reason}`);
    error.code = 'M6_CONTROL_PANE_REJECTED';
    error.reason = reason;
    return error;
  }
  function requireSnapshot(snapshot) {
    if (!object(snapshot) || snapshot.version !== 2 || !Array.isArray(snapshot.workers)
      || !object(snapshot.workerMap) || !Array.isArray(snapshot.tasks)
      || !Array.isArray(snapshot.messages)) throw reject('invalid-v2-snapshot');
  }
  function workerFor(snapshot, workerId) {
    const worker = snapshot.workerMap?.[workerId] || snapshot.workers.find((item) => item.id === workerId);
    if (!worker) throw reject('worker-not-found');
    return worker;
  }
  function displayStatus(worker) {
    return typeof worker.displayStatus === 'string' && worker.displayStatus
      ? worker.displayStatus
      : (worker.lifecycleDisplay || worker.availability || 'idle');
  }
  function refreshViews(snapshot, serverNow) {
    for (const worker of snapshot.workers) {
      worker.heartbeatAgeMs = positive(worker.lastHeartbeatAt) ? Math.max(0, serverNow - worker.lastHeartbeatAt) : null;
      worker.heartbeatAgeSeconds = worker.heartbeatAgeMs == null ? null : Math.round(worker.heartbeatAgeMs / 1000);
      worker.uiHeartbeatStale = worker.uiLifecycleStale === true || worker.heartbeatAgeMs == null || worker.heartbeatAgeMs > 25000;
      if (worker.uiHeartbeatStale && worker.lifecycleDisplay !== 'offline' && worker.lifecycleDisplay !== 'rotating') {
        worker.displayStatus = Number.isInteger(worker.tabId) ? 'offline' : 'offline';
      } else worker.displayStatus = displayStatus(worker);
      if (snapshot.workerMap?.[worker.id]) snapshot.workerMap[worker.id] = worker;
    }
    const dynamic = new Set(['worker-offline', 'heartbeat-never', 'heartbeat-stale']);
    if (snapshot.diagnostics?.issues) {
      snapshot.diagnostics.issues = snapshot.diagnostics.issues.filter((issue) => !dynamic.has(issue.code));
      for (const worker of snapshot.workers) {
        if (worker.uiLifecycleStale || !Number.isInteger(worker.tabId)) snapshot.diagnostics.issues.push({ code: 'worker-offline', workerId: worker.id, message: 'Worker is offline or unbound' });
        else if (worker.heartbeatAgeMs == null) snapshot.diagnostics.issues.push({ code: 'heartbeat-never', workerId: worker.id, message: 'No heartbeat observed' });
        else if (worker.uiHeartbeatStale) snapshot.diagnostics.issues.push({ code: 'heartbeat-stale', workerId: worker.id, message: `Heartbeat is stale (${worker.heartbeatAgeSeconds}s)` });
      }
    }
    const queue = snapshot.diagnostics?.queueByWorker || snapshot.queueByWorker;
    if (queue) {
      for (const metrics of Object.values(queue)) metrics.oldestQueueAgeMs = metrics.oldestQueuedAt > 0 ? Math.max(0, serverNow - metrics.oldestQueuedAt) : 0;
      if (snapshot.diagnostics) snapshot.diagnostics.queueByWorker = clone(queue);
      snapshot.queueByWorker = clone(queue);
    }
    snapshot.observedAt = Math.max(Number(snapshot.observedAt || 0), serverNow);
    snapshot.serverNow = Math.max(Number(snapshot.serverNow || 0), serverNow);
  }
  function applyHeartbeatViewDeltaV2(snapshot, delta) {
    requireSnapshot(snapshot);
    if (!object(delta) || typeof delta.workerId !== 'string' || !positive(delta.observedAt)) throw reject('invalid-heartbeat-delta');
    const serverNow = delta.serverNow === undefined ? delta.observedAt : delta.serverNow;
    if (!positive(serverNow) || serverNow < delta.observedAt) throw reject('invalid-heartbeat-server-now');
    if (Object.prototype.hasOwnProperty.call(delta, 'runtimeBusy') && typeof delta.runtimeBusy !== 'boolean') throw reject('invalid-heartbeat-busy');
    if (Object.prototype.hasOwnProperty.call(delta, 'title') && (typeof delta.title !== 'string' || !delta.title)) throw reject('invalid-heartbeat-title');
    if (Object.prototype.hasOwnProperty.call(delta, 'url') && (typeof delta.url !== 'string' || !delta.url)) throw reject('invalid-heartbeat-url');
    if (Object.prototype.hasOwnProperty.call(delta, 'windowId') && !Number.isInteger(delta.windowId)) throw reject('invalid-heartbeat-window');
    const source = clone(snapshot);
    const worker = workerFor(source, delta.workerId);
    if (positive(worker.lastHeartbeatAt) && delta.observedAt < worker.lastHeartbeatAt) {
      refreshViews(source, serverNow);
      return source;
    }
    if (positive(worker.lastHeartbeatAt) && delta.observedAt === worker.lastHeartbeatAt) {
      for (const key of ['runtimeBusy', 'title', 'url', 'windowId']) if (Object.prototype.hasOwnProperty.call(delta, key) && delta[key] !== worker[key]) throw reject('conflicting-heartbeat-delta');
      refreshViews(source, serverNow);
      return source;
    }
    worker.lastHeartbeatAt = delta.observedAt;
    if (Object.prototype.hasOwnProperty.call(delta, 'runtimeBusy')) worker.runtimeBusy = delta.runtimeBusy;
    for (const key of ['title', 'url', 'windowId']) if (Object.prototype.hasOwnProperty.call(delta, key)) worker[key] = delta[key];
    const listIndex = source.workers.findIndex((item) => item.id === delta.workerId);
    source.workers[listIndex] = clone(worker);
    refreshViews(source, serverNow);
    return source;
  }
  function workerAssignmentLabel(worker) {
    const summary = worker.assignmentSummary;
    return summary?.kind === 'task' ? summary.taskId : summary?.kind === 'message' ? (summary.messageIds?.[0] || 'idle') : 'idle';
  }
  global.ModelFleetStateM7C17 = Object.freeze({ applyHeartbeatViewDeltaV2, workerFor, workerAssignmentLabel, displayStatus });
}(globalThis));
