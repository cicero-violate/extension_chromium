(() => {
  'use strict';

  const HEARTBEAT_STALE_SECONDS = 25;
  const ROLE_TIMELINE_RANGE_KEY = 'modelFleetControl:roleTimelineRange:v1';
  const ROLE_TIMELINE_RANGES = new Set([900000, 3600000, 14400000]);
  let roleTimelineRangeMs = 3600000;
  try {
    const storedRange = Number(localStorage.getItem(ROLE_TIMELINE_RANGE_KEY));
    if (ROLE_TIMELINE_RANGES.has(storedRange)) roleTimelineRangeMs = storedRange;
  } catch {}
  let snapshot = null;
  let refreshTimer = null;

  const $ = (id) => document.getElementById(id);
  const els = {
    healthDot: $('healthDot'), healthText: $('healthText'), pauseAll: $('pauseAll'), stopFlushStale: $('stopFlushStale'), killAll: $('killAll'),
    goalInput: $('goalInput'), saveGoal: $('saveGoal'), workspacePathInput: $('workspacePathInput'), saveWorkspacePath: $('saveWorkspacePath'), workerMetric: $('workerMetric'), taskMetric: $('taskMetric'), messageMetric: $('messageMetric'),
    generation: $('generation'), refresh: $('refresh'), status: $('status'), roleContracts: $('roleContracts'),
    roleTargets: $('roleTargets'), topologyActual: $('topologyActual'), topologyTotal: $('topologyTotal'), reconcileFleet: $('reconcileFleet'),
    concurrency: $('concurrency'), concurrencyValue: $('concurrencyValue'), authorityValue: $('authorityValue'),
    invariants: $('invariants'), queuePressure: $('queuePressure'), queuePressureCount: $('queuePressureCount'), exceptions: $('exceptions'), exceptionCount: $('exceptionCount'),
    taskTitle: $('taskTitle'), taskRole: $('taskRole'), taskPriority: $('taskPriority'), taskPrompt: $('taskPrompt'), taskDeps: $('taskDeps'), createTask: $('createTask'),
    tasks: $('tasks'), taskCount: $('taskCount'), workers: $('workers'), workerCount: $('workerCount'),
    messageTarget: $('messageTarget'), messageBody: $('messageBody'), sendMessage: $('sendMessage'), allThreads: $('allThreads'), allThreadsCount: $('allThreadsCount'), allThreadsSort: $('allThreadsSort'), inbox: $('inbox'), inboxCount: $('inboxCount'), inboxSort: $('inboxSort'),
    traffic: $('traffic'), trafficCount: $('trafficCount'), trafficSort: $('trafficSort'), journal: $('journal'), viewTabs: $('viewTabs'), messageViewTabs: $('messageViewTabs'),
    roleTimeline: $('roleTimeline'), roleTimelineRange: $('roleTimelineRange'), roleTimelineMeta: $('roleTimelineMeta'),
    connectorDiagnostics: $('connectorDiagnostics'),
  };

  function loadWorkspacePath() {
    try {
      const value = localStorage.getItem('modelFleetControl:workspacePath') || '';
      if (els.workspacePathInput) els.workspacePathInput.value = value;
    } catch {}
  }

  function saveWorkspacePath() {
    const value = els.workspacePathInput?.value?.trim() || '';
    try { localStorage.setItem('modelFleetControl:workspacePath', value); } catch {}
    chrome.runtime.sendMessage({ type: 'fleet:set-workspace-path', workspacePath: value });
    if (els.status) els.status.textContent = value ? `Workspace path saved: ${value}` : 'Workspace path cleared';
  }

  function send(type, payload = {}) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type, ...payload }, (response) => {
        const error = chrome.runtime.lastError;
        if (error) reject(error);
        else if (!response?.ok) reject(new Error(response?.error || 'request failed'));
        else resolve(response);
      });
    });
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
    })[char]);
  }

  els.saveWorkspacePath?.addEventListener('click', saveWorkspacePath);

  function formatTime(ts) {
    if (!ts) return '—';
    try {
      const value = typeof ts === 'number' ? ts : Number.isFinite(Number(ts)) ? Number(ts) : Date.parse(String(ts));
      if (!Number.isFinite(value)) return '—';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return '—';
      return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return '—';
    }
  }

  function formatDurationMs(value) {
    const ms = Math.max(0, Number(value || 0));
    if (ms < 1000) return `${Math.round(ms)}ms`;
    const seconds = ms / 1000;
    if (seconds < 60) return `${seconds < 10 ? seconds.toFixed(1) : Math.round(seconds)}s`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${minutes < 10 ? minutes.toFixed(1) : Math.round(minutes)}m`;
    const hours = minutes / 60;
    return `${hours < 10 ? hours.toFixed(1) : Math.round(hours)}h`;
  }

  function normalizeSnapshot(value) {
    const source = value && typeof value === 'object' ? value : {};
    const policy = source.policy && typeof source.policy === 'object' ? source.policy : {};
    const workers = source.version === 2 ? (Array.isArray(source.workers) ? source.workers : []) : (source.workers && typeof source.workers === 'object' && !Array.isArray(source.workers) ? source.workers : {});
    const tasks = source.version === 2 ? (Array.isArray(source.tasks) ? source.tasks : []) : (source.tasks && typeof source.tasks === 'object' && !Array.isArray(source.tasks) ? source.tasks : {});
    const roleCatalog = Array.isArray(source.roleCatalog) ? source.roleCatalog.filter((role) => role && typeof role.id === 'string') : [];
    const topology = source.topology && typeof source.topology === 'object' ? source.topology : {};
    const desiredRoleCounts = topology.desiredRoleCounts && typeof topology.desiredRoleCounts === 'object'
      ? topology.desiredRoleCounts
      : {};
    const maxTurnsPerChatByRole = topology.maxTurnsPerChatByRole && typeof topology.maxTurnsPerChatByRole === 'object'
      ? topology.maxTurnsPerChatByRole
      : {};
    return {
      ...source,
      generation: Number.isFinite(Number(source.generation)) ? Number(source.generation) : 0,
      goal: typeof source.goal === 'string' ? source.goal : '',
      serverNow: Number.isFinite(Number(source.serverNow)) ? Number(source.serverNow) : Date.now(),
      policy: {
        paused: policy.paused === true,
        authorityEnabled: policy.authorityEnabled !== false,
        maxConcurrency: Math.max(1, Math.min(64, Number(policy.maxConcurrency) || 8)),
        activeWorkerWindows: policy.activeWorkerWindows !== false,
        warmIdleMs: Math.max(10000, Math.min(300000, Number(policy.warmIdleMs) || 60000)),
      },
      roleCatalog,
      topology: { desiredRoleCounts, maxTurnsPerChatByRole },
      workers,
      tasks,
      diagnostics: source.diagnostics && typeof source.diagnostics === 'object'
        ? source.diagnostics
        : { queueByWorker: {}, activeAssignments: 0, maxConcurrency: Math.max(1, Math.min(64, Number(policy.maxConcurrency) || 8)) },
      messages: Array.isArray(source.messages) ? source.messages.filter((item) => item && typeof item === 'object') : [],
      journal: Array.isArray(source.journal) ? source.journal.filter((item) => item && typeof item === 'object') : [],
      roleActivity: Array.isArray(source.roleActivity) ? source.roleActivity.filter((item) => item && typeof item === 'object' && Number(item.at || 0) > 0) : [],
    };
  }

  function safeStatus(value, fallback = 'unknown') {
    const status = typeof value === 'string' && value.trim() ? value.trim().toLowerCase() : fallback;
    return status;
  }

  function compact(text, max = 700) {
    const value = String(text || '').trim();
    return value.length > max ? `${value.slice(0, max)}…` : value;
  }

  function workerUrlInfo(worker) {
    const raw = typeof worker?.url === 'string' ? worker.url.trim() : '';
    if (!raw) return { short: 'URL unavailable', full: '' };
    try {
      const url = new URL(raw);
      const path = `${url.pathname || '/'}${url.search || ''}`;
      return { short: compact(`${url.hostname}${path}`, 72), full: raw };
    } catch {
      return { short: compact(raw, 72), full: raw };
    }
  }

  function workerTargetLabel(worker) {
    const url = workerUrlInfo(worker);
    const title = String(worker?.title || '').trim();
    const role = String(worker?.role || 'coordinator').trim() || 'coordinator';
    const genericTitle = !title || /^chatgpt(?:\s*[-—].*)?$/i.test(title);
    const context = genericTitle ? url.short : `${compact(title, 36)} · ${url.short}`;
    return `${worker.id} · ${role} · ${context}`;
  }

  function workerTabTitle(worker) {
    const title = String(worker?.title || '').trim();
    return title || String(worker?.name || '').trim() || 'ChatGPT tab';
  }

  const VIEW_NAMES = ['overview', 'tasks', 'messages', 'diagnostics'];
  const VIEW_STORAGE_KEY = 'modelFleetControl:view:v1';
  const MESSAGE_VIEW_NAMES = ['all', 'operator', 'traffic'];
  const MESSAGE_VIEW_STORAGE_KEY = 'modelFleetControl:messageView:v1';

  function setView(requested, persist = true) {
    const view = VIEW_NAMES.includes(requested) ? requested : 'overview';
    for (const tab of els.viewTabs.querySelectorAll('[data-view]')) {
      const active = tab.dataset.view === view;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
    }
    for (const panel of document.querySelectorAll('[data-view-panel]')) {
      panel.hidden = panel.dataset.viewPanel !== view;
    }
    if (persist) {
      try { localStorage.setItem(VIEW_STORAGE_KEY, view); } catch {}
    }
  }

  function setMessageView(requested, persist = true) {
    const view = MESSAGE_VIEW_NAMES.includes(requested) ? requested : 'operator';
    for (const tab of els.messageViewTabs.querySelectorAll('[data-message-view]')) {
      const active = tab.dataset.messageView === view;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
    }
    for (const panel of document.querySelectorAll('[data-message-view-panel]')) {
      panel.hidden = panel.dataset.messageViewPanel !== view;
    }
    if (persist) {
      try { localStorage.setItem(MESSAGE_VIEW_STORAGE_KEY, view); } catch {}
    }
  }

  function setStatus(text, error = false) {
    els.status.textContent = text;
    els.status.style.color = error ? 'var(--red)' : 'var(--green)';
    clearTimeout(setStatus.timer);
    setStatus.timer = setTimeout(() => { els.status.textContent = ''; }, 2400);
  }

  function workers() {
    return snapshot ? Object.values(snapshot.workers || {}) : [];
  }

  function currentRoleActivityCounts() {
    const roles = Object.fromEntries(roleCatalog().map((role) => [role.id, {
      running: 0,
      idle: 0,
      blocked: 0,
      offline: 0,
      total: 0,
    }]));
    for (const worker of workers()) {
      if (!worker || worker.enabled === false) continue;
      const role = String(worker.role || 'coordinator');
      const counts = roles[role] || (roles[role] = { running: 0, idle: 0, blocked: 0, offline: 0, total: 0 });
      counts.total += 1;
      if (worker.currentAssignmentId) counts.running += 1;
      else if (workerIsStale(worker) || workerLifecycle(worker) === 'offline') counts.offline += 1;
      else if (workerStatus(worker) === 'blocked') counts.blocked += 1;
      else counts.idle += 1;
    }
    return roles;
  }

  function roleActivityCountsEqual(a, b) {
    return ['running', 'idle', 'blocked', 'offline', 'total']
      .every((key) => Math.max(0, Number(a?.[key] || 0)) === Math.max(0, Number(b?.[key] || 0)));
  }

  function formatTimelineTime(ts) {
    try {
      return new Date(Number(ts)).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '—';
    }
  }

  function renderRoleTimeline() {
    if (!snapshot || !els.roleTimeline) return;
    const nowAt = Math.max(Date.now(), Number(snapshot.serverNow || 0));
    const range = ROLE_TIMELINE_RANGES.has(roleTimelineRangeMs) ? roleTimelineRangeMs : 3600000;
    const requestedStartAt = nowAt - range;
    const stored = (Array.isArray(snapshot.roleActivity) ? snapshot.roleActivity : [])
      .filter((sample) => Number(sample?.at || 0) > 0 && sample.roles && typeof sample.roles === 'object')
      .sort((a, b) => Number(a.at) - Number(b.at));
    const currentRoles = currentRoleActivityCounts();
    const earliestCapturedAt = stored.length ? Number(stored[0].at || 0) : 0;
    const startAt = earliestCapturedAt && earliestCapturedAt > requestedStartAt ? earliestCapturedAt : requestedStartAt;
    const displayedRange = Math.max(1, nowAt - startAt);
    const last = stored[stored.length - 1];
    const samples = stored.slice();
    const currentChanged = !last || roleCatalog().some((role) => !roleActivityCountsEqual(last.roles?.[role.id], currentRoles[role.id]));
    if (currentChanged) samples.push({ at: nowAt, roles: currentRoles });

    els.roleTimelineRange.value = String(range);
    const earliest = earliestCapturedAt;
    els.roleTimelineMeta.textContent = earliest
      ? formatDurationMs(Math.max(0, nowAt - earliest)) + ' captured · showing ' + formatDurationMs(displayedRange) + ' · ' + stored.length + ' transitions'
      : 'history starts with this deployment';

    const axisTicks = [0, 0.25, 0.5, 0.75, 1];
    const axis = '<div class="role-timeline-axis"><div></div><div class="role-timeline-axis-track">'
      + axisTicks.map((ratio, index) => '<span class="role-timeline-tick" style="left:' + (ratio * 100) + '%">'
        + (index === axisTicks.length - 1 ? 'now' : escapeHtml(formatTimelineTime(startAt + displayedRange * ratio)))
        + '</span>').join('')
      + '</div></div>';

    const rows = roleCatalog().map((role) => {
      const current = currentRoles[role.id] || { running: 0, idle: 0, blocked: 0, offline: 0, total: 0 };
      const currentDetail = current.running + '/' + current.total + ' running · ' + current.idle + ' idle'
        + ((current.blocked || current.offline) ? ' · ' + (current.blocked + current.offline) + ' unavailable' : '');

      let state = null;
      for (const sample of samples) {
        if (Number(sample.at) <= startAt && sample.roles?.[role.id]) state = sample.roles[role.id];
        else if (Number(sample.at) > startAt) break;
      }
      let cursor = startAt;
      const segments = [];
      for (const sample of samples) {
        const at = Number(sample.at || 0);
        if (at <= startAt || at > nowAt) continue;
        const nextState = sample.roles?.[role.id];
        if (!nextState || (state && roleActivityCountsEqual(state, nextState))) continue;
        if (state && at > cursor) segments.push([cursor, at, state]);
        state = nextState;
        cursor = Math.max(cursor, at);
      }
      if (state && nowAt > cursor) segments.push([cursor, nowAt, state]);

      const segmentHtml = segments.map(([from, to, counts]) => {
        const left = Math.max(0, Math.min(100, ((from - startAt) / displayedRange) * 100));
        const width = Math.max(0.08, Math.min(100 - left, ((to - from) / displayedRange) * 100));
        const total = Math.max(0, Number(counts.total || 0));
        const running = Math.max(0, Number(counts.running || 0));
        const unavailable = Math.max(0, Number(counts.blocked || 0) + Number(counts.offline || 0));
        const runningPct = total ? Math.min(100, (running / total) * 100) : 0;
        const unavailablePct = total ? Math.min(100, (unavailable / total) * 100) : 0;
        const title = (role.label || role.id) + ': ' + running + '/' + total + ' running, '
          + Math.max(0, Number(counts.idle || 0)) + ' idle, ' + unavailable + ' blocked/offline · '
          + formatTime(from) + '–' + formatTime(to);
        return '<div class="role-timeline-segment" style="left:' + left + '%;width:' + width + '%" title="' + escapeHtml(title) + '">'
          + '<span class="role-timeline-run" style="height:' + runningPct + '%"></span>'
          + '<span class="role-timeline-unavailable" style="width:' + unavailablePct + '%"></span></div>';
      }).join('');

      return '<div class="role-timeline-row">'
        + '<div class="role-timeline-label"><strong>' + escapeHtml(role.label || role.id) + '</strong><span class="role-timeline-current">' + escapeHtml(currentDetail) + '</span></div>'
        + '<div class="role-timeline-track">' + (segmentHtml || '<span class="role-timeline-no-data">collecting history…</span>') + '<span class="role-timeline-now"></span></div>'
        + '</div>';
    }).join('');

    els.roleTimeline.innerHTML = axis + rows;
  }

  function tasks() {
    return snapshot ? Object.values(snapshot.tasks || {}) : [];
  }

  function taskRunnable(task) {
    if (!snapshot || taskPhase(task) !== 'pending') return false;
    if (String(task.workflowBlockReason || '').trim()) return false;
    return c17() ? (task.waitingDependencyIds || []).length === 0 : (task.dependencies || []).every((id) => snapshot.tasks?.[id]?.status === 'done');
  }

  function messageTime(message) {
    return Number(message?.createdAt || message?.completedAt || 0) || 0;
  }

  function sortMessages(list, direction) {
    const sorted = list.slice().sort((a, b) => messageTime(a) - messageTime(b));
    return direction === 'oldest' ? sorted : sorted.reverse();
  }

  function workerRouteLabel(workerId) {
    const id = String(workerId || '').trim();
    if (!id) return 'unknown';
    const worker = snapshot?.workers?.[id];
    if (!worker) return id;
    const role = String(worker.role || 'coordinator').trim() || 'coordinator';
    return `${id} (${role})`;
  }

  function messageRoute(message) {
    const from = message.fromWorkerId
      ? workerRouteLabel(message.fromWorkerId)
      : (message.from || 'operator');
    const to = message.toWorkerId === 'operator'
      ? 'you'
      : message.toWorkerId
        ? workerRouteLabel(message.toWorkerId)
        : 'unknown';
    return `${from} → ${to}`;
  }

  function involvesOperator(message) {
    return message?.toWorkerId === 'operator' || message?.from === 'operator';
  }

  function renderMessageCard(message, operatorStyle = false, bodyMax = 700) {
    const status = safeStatus(messagePhase(message), message.toWorkerId === 'operator' ? 'delivered' : 'unknown');
    const statusClass = status === 'running' ? 'running' : status === 'done' || status === 'delivered' ? 'done' : status === 'cancelled' ? 'blocked' : 'pending';
    const response = message.response ? `<div class="small" style="margin-top:5px">response: ${escapeHtml(compact(message.response, 350))}</div>` : '';
    return `<div class="message ${operatorStyle ? 'operator' : ''}">
      <div class="topline"><div class="name">${escapeHtml(messageRoute(message))}</div><span class="pill ${statusClass}">${escapeHtml(status.toUpperCase())}</span></div>
      <div class="message-body">${escapeHtml(compact(message.body, bodyMax))}</div>
      ${response}
      <div class="small" style="margin-top:5px">${formatTime(message.createdAt)}${message.taskId ? ` · ${escapeHtml(message.taskId)}` : ''}</div>
    </div>`;
  }

  function roleCatalog() {
    return Array.isArray(snapshot?.roleCatalog) && snapshot.roleCatalog.length
      ? snapshot.roleCatalog
      : [{ id: 'coordinator', label: 'Coordinator', defaultCount: 1 }];
  }

  function roleOptions(selected = '') {
    return roleCatalog().map((role) => {
      const id = String(role.id || 'coordinator');
      const label = String(role.label || id);
      return `<option value="${escapeHtml(id)}" ${selected === id ? 'selected' : ''}>${escapeHtml(label)}</option>`;
    }).join('');
  }

  function roleTurnLimit(role) {
    const value = Math.trunc(Number(snapshot?.topology?.maxTurnsPerChatByRole?.[String(role || 'coordinator')]));
    return Math.max(1, Math.min(50, Number.isFinite(value) && value > 0 ? value : 10));
  }

  function renderTopology() {
    const catalog = roleCatalog();
    const counts = Object.fromEntries(catalog.map((role) => [role.id, 0]));
    const staleCounts = Object.fromEntries(catalog.map((role) => [role.id, 0]));
    for (const worker of workers().filter((worker) => worker.enabled !== false)) {
      const role = String(worker.role || 'coordinator');
      if (workerIsStale(worker)) staleCounts[role] = Number(staleCounts[role] || 0) + 1;
      else counts[role] = Number(counts[role] || 0) + 1;
    }
    const desired = snapshot?.topology?.desiredRoleCounts || {};
    const desiredTotal = catalog.reduce((sum, role) => sum + Math.max(0, Number(desired[role.id] ?? role.defaultCount ?? 0)), 0);
    els.topologyActual.textContent = String(Object.values(counts).reduce((sum, count) => sum + count, 0));
    els.topologyTotal.textContent = String(desiredTotal);
    els.roleTargets.innerHTML = catalog.map((role) => {
      const target = Math.max(0, Number(desired[role.id] ?? role.defaultCount ?? 0));
      const current = Number(counts[role.id] || 0);
      const stale = Number(staleCounts[role.id] || 0);
      const turnLimit = roleTurnLimit(role.id);
      return `<div class="role-target" data-role="${escapeHtml(role.id)}">
        <div><div class="name">${escapeHtml(role.label || role.id)}</div><div class="small">${current} live${stale ? ` · ${stale} stale` : ''}</div></div>
        <div class="role-count">${current} / ${target}</div>
        <div class="stepper">
          <button type="button" data-action="role-minus" data-role="${escapeHtml(role.id)}" aria-label="Reduce ${escapeHtml(role.label || role.id)} target">−</button>
          <button type="button" data-action="role-plus" data-role="${escapeHtml(role.id)}" aria-label="Increase ${escapeHtml(role.label || role.id)} target">+</button>
        </div>
        <div class="role-turn-policy">
          <span class="small">Turns / chat</span>
          <input type="range" min="1" max="50" value="${turnLimit}" data-action="role-turn-limit" data-role="${escapeHtml(role.id)}" aria-label="${escapeHtml(role.label || role.id)} turns per chat"/>
          <span class="value role-turn-limit-value">${turnLimit}</span>
        </div>
      </div>`;
    }).join('');

    const currentTaskRole = els.taskRole.value;
    els.taskRole.innerHTML = roleOptions(currentTaskRole);
    if ([...els.taskRole.options].some((option) => option.value === currentTaskRole)) els.taskRole.value = currentTaskRole;
  }

  function renderRoleContracts() {
    if (!els.roleContracts) return;
    els.roleContracts.innerHTML = roleCatalog().map((role) => `<div class="policy">
      <div class="policy-top"><span class="name">${escapeHtml(role.label || role.id)}</span><span class="value">${escapeHtml(role.authorityScope || '')}</span></div>
      <div class="small">${escapeHtml(role.purpose || '')}</div>
    </div>`).join('');
  }

  function renderWorkers() {
    const list = workers().sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
    const boundCount = list.filter((worker) => worker.enabled !== false && !workerIsStale(worker)).length;
    els.workerCount.textContent = `${list.length} slots · ${boundCount} bound`;
    if (!list.length) {
      els.workers.innerHTML = '<div class="empty">No workers registered. Open ChatGPT tabs, then register them.</div>';
      return;
    }
    els.workers.innerHTML = list.map((worker) => {
      const age = workerHeartbeatAt(worker) ? Math.max(0, Math.round((snapshot.serverNow - workerHeartbeatAt(worker)) / 1000)) : null;
      const lifecycle = workerLifecycle(worker, worker.currentAssignmentId ? 'running' : 'idle');
      const warmIdle = lifecycle === 'warm-idle';
      const activating = lifecycle === 'activating';
      const rotating = lifecycle === 'rotating';
      const stale = workerIsStale(worker) || age === null || age > HEARTBEAT_STALE_SECONDS;
      const turnHealth = worker.turnHealth || (worker.runtimeBusy === true ? 'busy' : 'idle');
      const status = stale ? 'offline' : turnHealth === 'dead' ? 'dead' : turnHealth === 'stalled' ? 'stalled' : turnHealth === 'interrupted' ? 'interrupted' : worker.availability === 'busy' || worker.runtimeBusy === true ? 'busy' : warmIdle ? 'warm' : rotating ? 'rotating' : activating ? 'waking' : workerStatus(worker, 'idle');
      const statusClass = status === 'running' || status === 'waking' || status === 'busy' ? 'running' : status === 'blocked' || status === 'offline' || status === 'dead' || status === 'stalled' || status === 'interrupted' ? 'blocked' : 'pending';
      const assignment = workerAssignment(worker);
      const queue = snapshot?.diagnostics?.queueByWorker?.[worker.id] || {};
      const queuedCount = Math.max(0, Number(queue.queuedCount || 0));
      const oldestQueueAgeMs = Number(queue.oldestQueuedAt || 0)
        ? Math.max(0, Date.now() - Number(queue.oldestQueuedAt))
        : Math.max(0, Number(queue.oldestQueueAgeMs || 0));
      const queueDetail = queuedCount
        ? `${queuedCount} queued${worker.currentAssignmentId ? ` behind ${worker.currentAssignmentId}` : ''} · oldest ${formatDurationMs(oldestQueueAgeMs)}`
        : 'empty';
      const urlInfo = workerUrlInfo(worker);
      const cancelDispatch = worker.currentAssignmentId
        ? `<button class="mini" data-action="cancel-dispatch" data-worker="${escapeHtml(worker.id)}">Cancel / clear</button>`
        : '';
      return `<div class="worker" data-worker="${escapeHtml(worker.id)}">
        <div class="topline"><div><div class="name tab-name" title="${escapeHtml(workerTabTitle(worker))}">${escapeHtml(workerTabTitle(worker))}</div><div class="role">${escapeHtml(worker.id)} · ${escapeHtml(worker.role)}</div></div><span class="pill ${statusClass}">${escapeHtml(status.toUpperCase())}</span></div>
        <div class="small" style="margin-top:6px">${escapeHtml(assignment)} · ${escapeHtml(lifecycle)} · ${workerIsStale(worker) ? 'stale / unbound' : `tab ${worker.tabId ?? '—'} · window ${worker.windowId ?? '—'} · heartbeat ${age === null ? 'never' : `${age}s ago`}`}</div>
        <div class="small">Queue · ${escapeHtml(queueDetail)}</div>
        <div class="small">Chat turns · ${Math.max(0, Number(worker.chatTurnCount || 0))} / ${roleTurnLimit(worker.role)}${worker.chatRotationPending ? ' · rotation pending' : ''}</div>
        <div class="small" title="${escapeHtml(urlInfo.full)}">URL · ${escapeHtml(urlInfo.short)}</div>
        <div class="caps">${escapeHtml((worker.capabilities || []).join(' · '))}</div>
        <div class="worker-actions">
          <select class="mini" data-action="role-worker" data-worker="${escapeHtml(worker.id)}">
            ${roleOptions(worker.role)}
          </select>
          ${cancelDispatch}
          <button class="mini" data-action="unregister-worker" data-worker="${escapeHtml(worker.id)}">Unregister</button>
        </div>
      </div>`;
    }).join('');
  }

  function updateHeartbeatDisplays() {
    if (!snapshot || document.hidden) return;
    snapshot.serverNow = Date.now();
    const roots = new Map([...els.workers.querySelectorAll(".worker[data-worker]")].map((node) => [node.dataset.worker, node]));
    for (const worker of workers()) {
      const root = roots.get(worker.id);
      if (!root) continue;
      const age = workerHeartbeatAt(worker) ? Math.max(0, Math.round((snapshot.serverNow - workerHeartbeatAt(worker)) / 1000)) : null;
      const lifecycle = workerLifecycle(worker, worker.currentAssignmentId ? "running" : "idle");
      const warmIdle = lifecycle === "warm-idle";
      const activating = lifecycle === "activating";
      const rotating = lifecycle === "rotating";
      const stale = workerIsStale(worker) || age === null || age > HEARTBEAT_STALE_SECONDS;
      const turnHealth = worker.turnHealth || (worker.runtimeBusy === true ? "busy" : "idle");
      const status = stale ? "offline" : turnHealth === "dead" ? "dead" : turnHealth === "stalled" ? "stalled" : turnHealth === "interrupted" ? "interrupted" : worker.availability === "busy" || worker.runtimeBusy === true ? "busy" : warmIdle ? "warm" : rotating ? "rotating" : activating ? "waking" : workerStatus(worker, "idle");
      const statusClass = status === "running" || status === "waking" || status === "busy" ? "running" : status === "blocked" || status === "offline" || status === "dead" || status === "stalled" || status === "interrupted" ? "blocked" : "pending";
      const pill = root.querySelector(".topline .pill");
      if (pill) {
        pill.className = `pill ${statusClass}`;
        pill.textContent = status.toUpperCase();
      }
      const assignment = workerAssignment(worker);
      const heartbeatLine = root.querySelector(".small");
      if (heartbeatLine) heartbeatLine.textContent = `${assignment} · ${lifecycle} · heartbeat ${age === null ? "never" : `${age}s ago`}`;
    }
    renderQueuePressure();
    renderInvariantsAndExceptions();
    renderConnectorDiagnostics();
  }

  function renderTasks() {
    const list = tasks().sort((a, b) => a.createdAt - b.createdAt);
    els.taskCount.textContent = `${list.length} tasks`;
    if (!list.length) {
      els.tasks.innerHTML = '<div class="empty">No tasks yet. Create one above.</div>';
      return;
    }
    els.tasks.innerHTML = list.map((task) => {
      const runnable = taskRunnable(task);
      const taskStatus = safeStatus(taskPhase(task), 'pending');
      const stateClass = taskStatus === 'cancelled' ? 'blocked' : ['running','done','blocked'].includes(taskStatus) ? taskStatus : 'pending';
      const stateLabel = runnable ? 'RUNNABLE' : taskStatus.toUpperCase();
      const result = task.result ? `<div class="task-result">${escapeHtml(compact(task.result))}</div>` : '';
      const deps = task.dependencies?.length ? `deps ${task.dependencies.join(', ')}` : 'no deps';
      const retry = ['blocked', 'cancelled'].includes(taskStatus) ? `<button class="mini" data-action="retry-task" data-task="${escapeHtml(task.id)}">Retry</button>` : '';
      return `<div class="task">
        <div class="topline"><div><div class="name">${escapeHtml(task.id)} · ${escapeHtml(task.title)}</div><div class="small">${escapeHtml(task.role)} · priority ${task.priority || 0} · ${escapeHtml(deps)} · attempts ${task.attempts || 0}</div></div><span class="pill ${stateClass}">${escapeHtml(stateLabel)}</span></div>
        <div class="small" style="margin-top:6px">${taskOwner(task) ? `owner ${escapeHtml(taskOwner(task))}` : 'unowned'}${task.statusNote ? ` · ${escapeHtml(task.statusNote)}` : ''}${task.workflowBlockReason ? ` · gate: ${escapeHtml(task.workflowBlockReason)}` : ''}</div>
        ${result}${retry ? `<div style="margin-top:7px">${retry}</div>` : ''}
      </div>`;
    }).join('');
  }

  function renderMessages() {
    const list = snapshot?.messages || [];
    const allThreads = sortMessages(list, els.allThreadsSort.value);
    const inbox = sortMessages(list.filter((message) => involvesOperator(message)), els.inboxSort.value);
    const traffic = sortMessages(list.filter((message) => !involvesOperator(message)), els.trafficSort.value).slice(0, 30);
    els.allThreadsCount.textContent = String(allThreads.length);
    els.inboxCount.textContent = String(inbox.length);
    els.trafficCount.textContent = String(traffic.length);
    els.messageMetric.textContent = String(list.filter((m) => ['queued','running'].includes(messagePhase(m))).length);

    els.allThreads.innerHTML = allThreads.length
      ? allThreads.map((message) => renderMessageCard(message, message.toWorkerId === 'operator', 900)).join('')
      : '<div class="empty">No semantic messages yet.</div>';

    els.inbox.innerHTML = inbox.length
      ? inbox.map((message) => renderMessageCard(message, message.toWorkerId === 'operator', 1200)).join('')
      : '<div class="empty">No operator messages yet.</div>';

    els.traffic.innerHTML = traffic.length
      ? traffic.map((message) => renderMessageCard(message, false, 500)).join('')
      : '<div class="empty">No semantic traffic yet.</div>';

    const current = els.messageTarget.value;
    els.messageTarget.innerHTML = '<option value="">Select live worker</option>' + workers()
      .filter((w) => w.enabled && !workerIsStale(w))
      .map((w) => `<option value="${escapeHtml(w.id)}" title="${escapeHtml(w.url || '')}">${escapeHtml(workerTargetLabel(w))}</option>`).join('');
    if ([...els.messageTarget.options].some((option) => option.value === current)) els.messageTarget.value = current;
  }

  function renderQueuePressure() {
    if (!els.queuePressure || !els.queuePressureCount) return;
    const queueByWorker = snapshot?.diagnostics?.queueByWorker || {};
    const rows = workers().map((worker) => {
      const metrics = queueByWorker[worker.id] || {};
      return {
        worker,
        queuedCount: Math.max(0, Number(metrics.queuedCount || 0)),
        oldestQueueAgeMs: Number(metrics.oldestQueuedAt || 0)
          ? Math.max(0, Date.now() - Number(metrics.oldestQueuedAt))
          : Math.max(0, Number(metrics.oldestQueueAgeMs || 0)),
        currentAssignmentId: metrics.currentAssignmentId || worker.currentAssignmentId || null,
        currentMessageCount: Math.max(0, Number(metrics.currentMessageCount || 0)),
        controlInboxCount: Math.max(0, Number(metrics.controlInboxCount || 0)),
        lastLagMs: Math.max(0, Number(metrics.lastCompletionReleaseLagMs || 0)),
        avgLagMs: Math.max(0, Number(metrics.averageCompletionReleaseLagMs || 0)),
        maxLagMs: Math.max(0, Number(metrics.maxCompletionReleaseLagMs || 0)),
        lagCount: Math.max(0, Number(metrics.completionReleaseLagCount || 0)),
      };
    }).filter((row) => row.queuedCount > 0 || row.controlInboxCount > 0 || row.lagCount > 0)
      .sort((a, b) => b.queuedCount - a.queuedCount
        || b.oldestQueueAgeMs - a.oldestQueueAgeMs
        || a.worker.id.localeCompare(b.worker.id, undefined, { numeric: true }));
    const totalQueued = rows.reduce((sum, row) => sum + row.queuedCount, 0);
    els.queuePressureCount.textContent = `${totalQueued} queued`;
    els.queuePressure.innerHTML = rows.length ? rows.map((row) => {
      const queueText = row.queuedCount
        ? `${row.queuedCount} queued${row.currentAssignmentId ? ` behind ${row.currentAssignmentId}` : ''}`
        : 'no semantic queue';
      const lagText = row.lagCount
        ? `terminal→release last ${formatDurationMs(row.lastLagMs)} · avg ${formatDurationMs(row.avgLagMs)} · max ${formatDurationMs(row.maxLagMs)} · n=${row.lagCount}`
        : 'terminal→release awaiting sample';
      return `<div class="invariant"><span class="${row.queuedCount ? 'bad' : 'ok'}">${row.queuedCount ? '!' : '✓'}</span><div>${escapeHtml(row.worker.id)} · ${escapeHtml(queueText)}<div class="small">oldest ${row.queuedCount ? escapeHtml(formatDurationMs(row.oldestQueueAgeMs)) : '—'} · active batch ${row.currentMessageCount} · control ${row.controlInboxCount}</div><div class="small">${escapeHtml(lagText)}</div></div><span class="${row.queuedCount ? 'bad' : 'ok'}">${row.queuedCount ? 'QUEUE' : 'OK'}</span></div>`;
    }).join('') : '<div class="empty">No queue pressure or completion-lag samples yet.</div>';
  }

  function renderJournal() {
    const events = (snapshot?.journal || [])
      .filter((event) => event?.type !== 'schedule.deferred')
      .slice(-60)
      .reverse();
    els.journal.innerHTML = events.length ? events.map((event) => {
      const error = typeof event.detail?.error === 'string' && event.detail.error.trim()
        ? '<div class="small" style="margin-top:4px">error: ' + escapeHtml(compact(event.detail.error, 500)) + '</div>'
        : '';
      return '<div class="event"><div class="event-time">' + formatTime(event.at)
        + '</div><div class="event-text"><strong>' + escapeHtml(event.type)
        + '</strong> · ' + escapeHtml(event.text) + error + '</div></div>';
    }).join('') : '<div class="empty">No events.</div>';
  }

  function computeInvariants() {
    const list = workers();
    const liveList = list.filter((w) => w.enabled !== false && !workerIsStale(w));
    const running = liveList.filter((w) => w.currentAssignmentId);
    const tabIds = liveList.map((w) => w.tabId);
    const assignmentIds = running.map((w) => w.currentAssignmentId);
    const uniqueTabs = new Set(tabIds).size === tabIds.length;
    const uniqueAssignments = new Set(assignmentIds).size === assignmentIds.length;
    const withinConcurrency = running.length <= Number(snapshot.policy.maxConcurrency || 1);
    const taskOwners = tasks().filter((t) => taskPhase(t) === 'running').every((task) => liveList.filter((w) => w.assignmentSummary?.taskId === task.id || w.currentTaskId === task.id).length === 1);
    const ownedWorkersActivated = running.every((worker) => ['activating', 'running'].includes(workerLifecycle(worker)));
    const enabledWorkers = liveList;
    const persistentWindowIds = enabledWorkers.filter((worker) => Number.isInteger(worker.windowId)).map((worker) => worker.windowId);
    const persistentWindows = !snapshot.policy.activeWorkerWindows || (persistentWindowIds.length === enabledWorkers.length && new Set(persistentWindowIds).size === persistentWindowIds.length);
    const noSleepState = list.every((worker) => !Number.isInteger(worker.sleepTabId) && !['sleeping', 'parking'].includes(workerLifecycle(worker)));
    return [
      ['Authority', snapshot.policy.authorityEnabled, snapshot.policy.authorityEnabled ? 'dispatch permitted' : 'revoked'],
      ['Unique tab ownership', uniqueTabs, `${new Set(tabIds).size}/${tabIds.length} unique`],
      ['Unique assignments', uniqueAssignments, `${assignmentIds.length} active`],
      ['Concurrency bound', withinConcurrency, `${running.length}/${snapshot.policy.maxConcurrency}`],
      ['Running task owner', taskOwners, taskOwners ? 'exactly one worker' : 'ownership mismatch'],
      ['Owned workers activated', ownedWorkersActivated, ownedWorkersActivated ? 'active-only lifecycle' : 'assignment/window mismatch'],
      ['Dedicated worker windows', persistentWindows, persistentWindows ? `${persistentWindowIds.length} dedicated windows` : 'worker windows are shared or not yet bound'],
      ['No sleep tabs', noSleepState, noSleepState ? 'ChatGPT-only worker windows' : 'legacy sleep state remains'],
    ];
  }

  async function renderConnectorDiagnostics() {
    if (!els.connectorDiagnostics) return;
    try {
      const report = await send('approval:get-connector-diagnostic-report');
      const reconciliation = report.reconciliation || {};
      const explanation = report.explanation || {};
      els.connectorDiagnostics.innerHTML = `
        <div class="stack">
          <div><strong>Correlation:</strong> ${escapeHtml(report.correlationId || '—')}</div>
          <div><strong>State:</strong> ${escapeHtml(reconciliation.state || '—')}</div>
          <div><strong>Confidence:</strong> ${escapeHtml(reconciliation.confidence || '—')}</div>
          <div><strong>Summary:</strong> ${escapeHtml(explanation.summary || '—')}</div>
          <div><strong>Missing Evidence:</strong><div class="small">${escapeHtml((explanation.missingEvidence || []).join(', ') || 'None')}</div></div>
          <div><strong>Next Probe:</strong> ${escapeHtml(explanation.nextProbe || '—')}</div>
        </div>`;
    } catch (error) {
      els.connectorDiagnostics.innerHTML = `<div class="empty">${escapeHtml(String(error))}</div>`;
    }
  }

  function renderInvariantsAndExceptions() {
    const invariants = computeInvariants();
    els.invariants.innerHTML = invariants.map(([name, ok, detail]) => `<div class="invariant"><span class="${ok ? 'ok' : 'bad'}">${ok ? '✓' : '!'}</span><div>${escapeHtml(name)}<div class="small">${escapeHtml(detail)}</div></div><span class="${ok ? 'ok' : 'bad'}">${ok ? 'OK' : 'FAIL'}</span></div>`).join('');

    const exceptions = [];
    for (const worker of workers()) {
      const age = workerHeartbeatAt(worker) ? Math.round((snapshot.serverNow - workerHeartbeatAt(worker)) / 1000) : Infinity;
      if (workerIsStale(worker)) exceptions.push(`${worker.id} is stale / unbound`);
      else if (age > HEARTBEAT_STALE_SECONDS) exceptions.push(`${worker.id} heartbeat stale (${Number.isFinite(age) ? `${age}s` : 'never'})`);
      if (workerStatus(worker) === 'blocked') {
        exceptions.push(worker.id + ' is blocked' + (worker.lastDispatchError ? ': ' + worker.lastDispatchError : ''));
      }
    }
    for (const task of tasks()) {
      if (taskPhase(task) === 'blocked') exceptions.push(`${task.id} is blocked${task.statusNote ? `: ${task.statusNote}` : ''}`);
      if (taskPhase(task) === 'pending' && task.workflowBlockReason) exceptions.push(`${task.id} workflow blocked: ${task.workflowBlockReason}`);
      else if (taskPhase(task) === 'pending' && !taskRunnable(task) && (task.waitingDependencyIds || task.dependencies || []).some((id) => snapshot.tasks?.[id]?.phase === 'blocked' || snapshot.tasks?.[id]?.status === 'blocked')) exceptions.push(`${task.id} waits on a blocked dependency`);
    }
    els.exceptionCount.textContent = String(exceptions.length) + ' current';
    els.exceptions.innerHTML = exceptions.length ? exceptions.map((text) => `<div class="exception"><strong>Attention</strong><div class="small">${escapeHtml(text)}</div></div>`).join('') : '<div class="empty">No current exceptions.</div>';
    const history = (snapshot?.diagnostics?.issues || []).filter((issue) => issue && typeof issue === 'object');
    const historical = history.filter((issue) => !['worker-offline', 'heartbeat-never', 'heartbeat-stale', 'task-blocked', 'task-workflow-blocked', 'policy-restricted'].includes(issue.code));
    if (historical.length) {
      els.exceptions.insertAdjacentHTML('beforeend', '<details class="diagnostic-disclosure" style="margin-top:9px"><summary>Historical audit (' + historical.length + ')</summary><div class="diagnostic-disclosure-body">' + historical.map((issue) => '<div class="event"><div class="event-text"><strong>' + escapeHtml(issue.code || 'issue') + '</strong> · ' + escapeHtml(issue.message || issue.reason || 'Recorded diagnostic') + '</div></div>').join('') + '</div></details>');
    }
  }

  function render() {
    if (!snapshot) return;
    const list = workers();
    const active = list.filter((worker) => worker.currentAssignmentId || worker.availability === 'running' || worker.availability === 'busy' || worker.runtimeBusy === true).length;
    const runnable = tasks().filter(taskRunnable).length;
    const healthy = snapshot.policy.authorityEnabled && computeInvariants().every(([, ok]) => ok);

    els.healthText.textContent = healthy ? (snapshot.policy.paused ? 'Healthy · paused' : 'Healthy') : (snapshot.policy.authorityEnabled ? 'Attention required' : 'Authority revoked');
    els.healthDot.style.background = healthy ? 'var(--green)' : snapshot.policy.authorityEnabled ? 'var(--amber)' : 'var(--red)';
    els.goalInput.value = document.activeElement === els.goalInput ? els.goalInput.value : (snapshot.goal || '');
    if (els.goalSummary) els.goalSummary.textContent = snapshot.goal || 'Not set';
    const live = list.filter((worker) => worker.enabled !== false && !workerIsStale(worker)).length;
    els.workerMetric.textContent = `${active} / ${live}`;
    els.taskMetric.textContent = String(runnable);
    els.generation.textContent = `gen ${snapshot.generation}`;
    els.concurrency.value = String(snapshot.policy.maxConcurrency || 8);
    els.concurrencyValue.textContent = String(snapshot.policy.maxConcurrency || 8);
    els.authorityValue.textContent = snapshot.policy.authorityEnabled ? 'ON' : 'OFF';
    els.authorityValue.style.color = snapshot.policy.authorityEnabled ? 'var(--green)' : 'var(--red)';
    els.pauseAll.textContent = snapshot.policy.paused ? 'Resume dispatch' : 'Pause dispatch';
    els.killAll.textContent = snapshot.policy.authorityEnabled ? 'Kill authority' : 'Restore authority';

    renderTopology();
    renderRoleContracts();
    renderRoleTimeline();
    renderWorkers();
    renderTasks();
    renderMessages();
    renderQueuePressure();
    renderJournal();
    renderInvariantsAndExceptions();
    renderConnectorDiagnostics();
  }

  async function refresh() {
    const response = await send('fleet:get-snapshot');
    adoptResponse(response);
    render();
  }

  chrome.runtime.onMessage.addListener((message) => {
    if (message?.type === "fleet:snapshot-changed" && message.snapshot) {
      snapshot = normalizeSnapshot(message.snapshot);
      render();
      return;
    }
    if (message?.type === 'fleet:heartbeats-v2' && snapshot?.version === 2 && Array.isArray(message.deltas)) { applyC17HeartbeatMessage(message); return; }
    if (message?.type === "fleet:heartbeats" && snapshot?.version !== 2 && snapshot && message.heartbeats) {
      for (const [workerId, heartbeat] of Object.entries(message.heartbeats)) {
        const worker = snapshot.workers?.[workerId];
        if (!worker) continue;
        snapshot.workers[workerId] = { ...worker, ...heartbeat };
      }
      snapshot.serverNow = Number(message.serverNow) || Date.now();
      updateHeartbeatDisplays();
      renderRoleTimeline(); }
  });

  els.roleTargets.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action][data-role]');
    if (!button || !snapshot) return;
    const role = button.dataset.role;
    const current = Math.max(0, Number(snapshot.topology?.desiredRoleCounts?.[role] || 0));
    const next = button.dataset.action === 'role-plus' ? current + 1 : Math.max(0, current - 1);
    button.disabled = true;
    send('fleet:set-topology-role-count', { role, count: next }).then((response) => {
      adoptResponse(response);
      render();
      setStatus(`${role} target → ${next}`);
    }).catch((error) => setStatus(String(error), true)).finally(() => { button.disabled = false; });
  });

  els.roleTargets.addEventListener('input', (event) => {
    const input = event.target.closest('input[data-action="role-turn-limit"][data-role]');
    if (!input) return;
    const value = input.closest('.role-target')?.querySelector('.role-turn-limit-value');
    if (value) value.textContent = String(input.value);
  });

  els.roleTargets.addEventListener('change', (event) => {
    const input = event.target.closest('input[data-action="role-turn-limit"][data-role]');
    if (!input || !snapshot) return;
    const role = input.dataset.role;
    const limit = Math.max(1, Math.min(50, Math.trunc(Number(input.value) || 10)));
    input.disabled = true;
    send('fleet:set-role-turn-limit', { role, limit }).then((response) => {
      adoptResponse(response);
      render();
      setStatus(`${role} turns/chat → ${limit}`);
    }).catch((error) => {
      input.disabled = false;
      setStatus(String(error), true);
    });
  });

  els.reconcileFleet.addEventListener('click', () => {
    els.reconcileFleet.disabled = true;
    setStatus('Reconciling fleet windows…');
    send('fleet:reconcile-topology').then((response) => {
      adoptResponse(response);
      render();
      const warnings = Array.isArray(response.errors) ? response.errors.length : 0;
      const deferred = Number(response.deferredRemovals || 0);
      const detail = `Created ${response.created?.length || 0}; removed ${response.removed?.length || 0}`
        + (deferred ? `; ${deferred} reduction(s) deferred` : '')
        + (warnings ? `; ${warnings} warning(s)` : '');
      setStatus(detail, warnings > 0);
    }).catch((error) => setStatus(String(error), true)).finally(() => {
      els.reconcileFleet.disabled = false;
    });
  });

  els.refresh.addEventListener('click', () => refresh().then(() => setStatus('Refreshed')).catch((error) => setStatus(String(error), true)));
  els.roleTimelineRange.addEventListener('change', () => {
    const next = Number(els.roleTimelineRange.value);
    roleTimelineRangeMs = ROLE_TIMELINE_RANGES.has(next) ? next : 3600000;
    try { localStorage.setItem(ROLE_TIMELINE_RANGE_KEY, String(roleTimelineRangeMs)); } catch {}
    renderRoleTimeline();
  });
  els.saveGoal.addEventListener('click', () => send('fleet:set-goal', { goal: els.goalInput.value }).then((response) => { adoptResponse(response); render(); setStatus('Goal saved'); }).catch((error) => setStatus(String(error), true)));

  els.concurrency.addEventListener('input', () => { els.concurrencyValue.textContent = els.concurrency.value; });
  els.concurrency.addEventListener('change', () => send('fleet:update-policy', { patch: { maxConcurrency: Number(els.concurrency.value) } }).then((response) => { adoptResponse(response); render(); setStatus('Concurrency updated'); }).catch((error) => setStatus(String(error), true)));
  els.pauseAll.addEventListener('click', () => {
    if (!snapshot) return;
    send('fleet:update-policy', { patch: { paused: !snapshot.policy.paused } }).then((response) => {
      adoptResponse(response);
      render();
      setStatus(snapshot.policy.paused ? 'Dispatch paused' : 'Dispatch resumed; queued work is now eligible');
    }).catch((error) => setStatus(String(error), true));
  });
  els.stopFlushStale.addEventListener('click', () => {
    if (!window.confirm('Pause dispatch, cancel active assignments, and cancel all queued worker messages?')) return;
    els.stopFlushStale.disabled = true;
    send('fleet:stop-and-flush-stale').then((response) => {
      adoptResponse(response);
      render();
      const warning = response.cancellationWarnings ? ` (${response.cancellationWarnings} warning(s))` : '';
      setStatus(`Stopped ${response.cancelledActive} active assignment(s); cancelled ${response.cancelledQueued} stale queued message(s)${warning}. Dispatch remains paused; click Resume dispatch before sending new work.`);
    }).catch((error) => setStatus(String(error), true)).finally(() => {
      els.stopFlushStale.disabled = false;
    });
  });
  els.killAll.addEventListener('click', () => {
    if (!snapshot) return;
    const request = snapshot.policy.authorityEnabled
      ? send('fleet:kill-authority')
      : send('fleet:update-policy', { patch: { authorityEnabled: true, paused: false } });
    request.then((response) => { adoptResponse(response); render(); setStatus(snapshot.policy.authorityEnabled ? 'Authority restored' : 'Authority revoked'); }).catch((error) => setStatus(String(error), true));
  });

  els.createTask.addEventListener('click', () => {
    const dependencies = els.taskDeps.value.split(',').map((x) => x.trim()).filter(Boolean);
    send('fleet:create-task', {
      title: els.taskTitle.value,
      prompt: els.taskPrompt.value,
      role: els.taskRole.value,
      priority: Number(els.taskPriority.value || 0),
      dependencies,
    }).then((response) => {
      adoptResponse(response);
      els.taskTitle.value = '';
      els.taskPrompt.value = '';
      els.taskDeps.value = '';
      render();
      setStatus(`Queued ${response.task.id}`);
    }).catch((error) => setStatus(String(error), true));
  });

  for (const select of [els.allThreadsSort, els.inboxSort, els.trafficSort]) {
    select.addEventListener('change', () => renderMessages());
  }

  els.sendMessage.addEventListener('click', () => {
    if (!els.messageTarget.value || !els.messageBody.value.trim()) return setStatus('Choose a worker and enter a message', true);
    send('fleet:send-message', { toWorkerId: els.messageTarget.value, body: els.messageBody.value }).then((response) => {
      adoptResponse(response);
      els.messageBody.value = '';
      render();
      const paused = snapshot.policy.paused === true;
      setStatus(response.scheduleError
        ? `Queued ${response.message.id}; scheduler error recorded in Journal`
        : (messagePhase(response.message) === 'running'
          ? `Dispatching ${response.message.id}`
          : (paused
            ? `Queued ${response.message.id}; dispatch is paused — click Resume dispatch`
            : `Queued ${response.message.id}`)),
      !!response.scheduleError || paused);
    }).catch((error) => setStatus(String(error), true));
  });

  els.workers.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const workerId = button.dataset.worker;
    if (button.dataset.action === 'cancel-dispatch') {
      button.disabled = true;
      send('fleet:cancel-worker-dispatch', { workerId }).then((response) => {
        adoptResponse(response);
        render();
        setStatus(response.transportError ? `Dispatch cleared; local stop warning: ${response.transportError}` : `Cancelled ${response.assignmentId}`);
      }).catch((error) => {
        button.disabled = false;
        setStatus(String(error), true);
      });
      return;
    }
    if (button.dataset.action === 'unregister-worker') send('fleet:unregister-worker', { workerId }).then((response) => { adoptResponse(response); render(); }).catch((error) => setStatus(String(error), true));
  });

  els.workers.addEventListener('change', (event) => {
    const select = event.target.closest('select[data-action="role-worker"]');
    if (!select) return;
    send('fleet:set-worker-role', { workerId: select.dataset.worker, role: select.value }).then((response) => { adoptResponse(response); render(); }).catch((error) => setStatus(String(error), true));
  });

  els.tasks.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action="retry-task"]');
    if (!button) return;
    send('fleet:retry-task', { taskId: button.dataset.task }).then((response) => { adoptResponse(response); render(); }).catch((error) => setStatus(String(error), true));
  });

  els.viewTabs.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-view]');
    if (tab) setView(tab.dataset.view);
  });

  els.messageViewTabs.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-message-view]');
    if (tab) setMessageView(tab.dataset.messageView);
  });

  els.messageViewTabs.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const tabs = [...els.messageViewTabs.querySelectorAll('[data-message-view]')];
    const current = Math.max(0, tabs.findIndex((tab) => tab.classList.contains('active')));
    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? tabs.length - 1
        : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    event.preventDefault();
    setMessageView(tabs[next].dataset.messageView);
    tabs[next].focus();
  });

  els.viewTabs.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const tabs = [...els.viewTabs.querySelectorAll('[data-view]')];
    const current = Math.max(0, tabs.findIndex((tab) => tab.classList.contains('active')));
    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? tabs.length - 1
        : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    event.preventDefault();
    setView(tabs[next].dataset.view);
    tabs[next].focus();
  });

  let initialView = 'overview';
  try { initialView = localStorage.getItem(VIEW_STORAGE_KEY) || initialView; } catch {}
  setView(initialView, false);

  let initialMessageView = 'operator';
  try { initialMessageView = localStorage.getItem(MESSAGE_VIEW_STORAGE_KEY) || initialMessageView; } catch {}
  setMessageView(initialMessageView, false);

  loadWorkspacePath();
  refresh().catch((error) => setStatus(String(error), true));
  refreshTimer = setInterval(updateHeartbeatDisplays, 5000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) refresh().catch(() => {}); });
  window.addEventListener('pagehide', () => { if (refreshTimer) clearInterval(refreshTimer); });

  function applyC17HeartbeatMessage(message) {
    try {
      for (const delta of message.deltas) snapshot = globalThis.ModelFleetStateM7C17.applyHeartbeatViewDeltaV2(snapshot, delta);
      updateHeartbeatDisplays();
      renderRoleTimeline();
    } catch (error) {
      setStatus(String(error), true);
    }
  }

  function adoptResponse(response) {
    const normalize = normalizeSnapshot;
    if (response?.snapshot) snapshot = normalize(response.snapshot);
    else refresh().catch((error) => setStatus(String(error), true));
  }

  function c17() {
    return snapshot?.version === 2 ? globalThis.ModelFleetStateM7C17 : null;
  }

  function workerStatus(worker, fallback = 'idle') {
    return c17() ? c17().displayStatus(worker) : safeStatus(worker['status'], fallback);
  }

  function workerHeartbeatAt(worker) {
    return c17() ? Number(worker.lastHeartbeatAt || 0) : Number(worker['heartbeatAt'] || 0);
  }

  function workerLifecycle(worker, fallback = 'idle') {
    return c17() ? safeStatus(worker.lifecycleDisplay, fallback) : safeStatus(worker.lifecycle, fallback);
  }

  function workerIsStale(worker) {
    return c17() ? worker.uiLifecycleStale === true || !Number.isInteger(worker.tabId) : worker.lifecycle === 'stale' || !Number.isInteger(worker.tabId);
  }

  function workerAssignment(worker) {
    if (c17()) return c17().workerAssignmentLabel(worker);
    return worker['current' + 'TaskId'] || worker['current' + 'MessageId'] || 'idle';
  }

  function taskPhase(task) {
    return c17() ? task.phase : task['status'];
  }

  function taskOwner(task) {
    return c17() ? task.ownerWorkerId : task.assignedWorkerId;
  }

  function messagePhase(message) {
    return c17() ? message.phase : message['status'];
  }
})();
