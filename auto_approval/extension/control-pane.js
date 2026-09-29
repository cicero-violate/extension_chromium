(() => {
  'use strict';

  const HEARTBEAT_STALE_SECONDS = 25;
  let snapshot = null;
  let refreshTimer = null;

  const $ = (id) => document.getElementById(id);
  const els = {
    healthDot: $('healthDot'), healthText: $('healthText'), pauseAll: $('pauseAll'), stopFlushStale: $('stopFlushStale'), killAll: $('killAll'),
    goalInput: $('goalInput'), saveGoal: $('saveGoal'), workerMetric: $('workerMetric'), taskMetric: $('taskMetric'), messageMetric: $('messageMetric'),
    generation: $('generation'), registerAll: $('registerAll'), refresh: $('refresh'), status: $('status'),
    concurrency: $('concurrency'), concurrencyValue: $('concurrencyValue'), authorityValue: $('authorityValue'),
    invariants: $('invariants'), exceptions: $('exceptions'), exceptionCount: $('exceptionCount'),
    taskTitle: $('taskTitle'), taskRole: $('taskRole'), taskPriority: $('taskPriority'), taskPrompt: $('taskPrompt'), taskDeps: $('taskDeps'), createTask: $('createTask'),
    tasks: $('tasks'), taskCount: $('taskCount'), workers: $('workers'), workerCount: $('workerCount'),
    messageTarget: $('messageTarget'), messageBody: $('messageBody'), sendMessage: $('sendMessage'), inbox: $('inbox'), inboxCount: $('inboxCount'),
    traffic: $('traffic'), trafficCount: $('trafficCount'), journal: $('journal'),
  };

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

  function normalizeSnapshot(value) {
    const source = value && typeof value === 'object' ? value : {};
    const policy = source.policy && typeof source.policy === 'object' ? source.policy : {};
    const workers = source.workers && typeof source.workers === 'object' && !Array.isArray(source.workers) ? source.workers : {};
    const tasks = source.tasks && typeof source.tasks === 'object' && !Array.isArray(source.tasks) ? source.tasks : {};
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
      workers,
      tasks,
      messages: Array.isArray(source.messages) ? source.messages.filter((item) => item && typeof item === 'object') : [],
      journal: Array.isArray(source.journal) ? source.journal.filter((item) => item && typeof item === 'object') : [],
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
    const genericTitle = !title || /^chatgpt(?:\s*[-—].*)?$/i.test(title);
    const context = genericTitle ? url.short : `${compact(title, 36)} · ${url.short}`;
    return `${worker.id} · ${context}`;
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

  function tasks() {
    return snapshot ? Object.values(snapshot.tasks || {}) : [];
  }

  function taskRunnable(task) {
    if (!snapshot || task.status !== 'pending') return false;
    return (task.dependencies || []).every((id) => snapshot.tasks?.[id]?.status === 'done');
  }

  function renderWorkers() {
    const list = workers().sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
    els.workerCount.textContent = `${list.length} registered`;
    if (!list.length) {
      els.workers.innerHTML = '<div class="empty">No workers registered. Open ChatGPT tabs, then register them.</div>';
      return;
    }
    els.workers.innerHTML = list.map((worker) => {
      const age = worker.heartbeatAt ? Math.max(0, Math.round((snapshot.serverNow - worker.heartbeatAt) / 1000)) : null;
      const lifecycle = safeStatus(worker.lifecycle, worker.currentAssignmentId ? 'running' : 'idle');
      const warmIdle = lifecycle === 'warm-idle';
      const activating = lifecycle === 'activating';
      const stale = age === null || age > HEARTBEAT_STALE_SECONDS;
      const status = warmIdle ? 'warm' : activating ? 'waking' : stale ? 'offline' : safeStatus(worker.status, 'idle');
      const statusClass = status === 'running' || status === 'waking' ? 'running' : status === 'blocked' || status === 'offline' ? 'blocked' : 'pending';
      const assignment = worker.currentTaskId || worker.currentMessageId || 'idle';
      const urlInfo = workerUrlInfo(worker);
      const cancelDispatch = worker.currentAssignmentId
        ? `<button class="mini" data-action="cancel-dispatch" data-worker="${escapeHtml(worker.id)}">Cancel / clear</button>`
        : '';
      return `<div class="worker" data-worker="${escapeHtml(worker.id)}">
        <div class="topline"><div><div class="name">${escapeHtml(worker.name)}</div><div class="role">${escapeHtml(worker.id)} · ${escapeHtml(worker.role)}</div></div><span class="pill ${statusClass}">${escapeHtml(status.toUpperCase())}</span></div>
        <div class="small" style="margin-top:6px">${escapeHtml(assignment)} · ${escapeHtml(lifecycle)} · heartbeat ${age === null ? 'never' : `${age}s ago`}</div>
        <div class="small" title="${escapeHtml(urlInfo.full)}">URL · ${escapeHtml(urlInfo.short)}</div>
        <div class="caps">${escapeHtml((worker.capabilities || []).join(' · '))}</div>
        <div class="worker-actions">
          <select class="mini" data-action="role-worker" data-worker="${escapeHtml(worker.id)}">
            ${['generalist','research','implementation','review','test'].map((role) => `<option value="${role}" ${worker.role === role ? 'selected' : ''}>${role}</option>`).join('')}
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
      const age = worker.heartbeatAt ? Math.max(0, Math.round((snapshot.serverNow - worker.heartbeatAt) / 1000)) : null;
      const lifecycle = safeStatus(worker.lifecycle, worker.currentAssignmentId ? "running" : "idle");
      const warmIdle = lifecycle === "warm-idle";
      const activating = lifecycle === "activating";
      const stale = age === null || age > HEARTBEAT_STALE_SECONDS;
      const status = warmIdle ? "warm" : activating ? "waking" : stale ? "offline" : safeStatus(worker.status, "idle");
      const statusClass = status === "running" || status === "waking" ? "running" : status === "blocked" || status === "offline" ? "blocked" : "pending";
      const pill = root.querySelector(".topline .pill");
      if (pill) {
        pill.className = `pill ${statusClass}`;
        pill.textContent = status.toUpperCase();
      }
      const assignment = worker.currentTaskId || worker.currentMessageId || "idle";
      const heartbeatLine = root.querySelector(".small");
      if (heartbeatLine) heartbeatLine.textContent = `${assignment} · ${lifecycle} · heartbeat ${age === null ? "never" : `${age}s ago`}`;
    }
    renderInvariantsAndExceptions();
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
      const taskStatus = safeStatus(task.status, 'pending');
      const stateClass = taskStatus === 'cancelled' ? 'blocked' : ['running','done','blocked'].includes(taskStatus) ? taskStatus : 'pending';
      const stateLabel = runnable ? 'RUNNABLE' : taskStatus.toUpperCase();
      const result = task.result ? `<div class="task-result">${escapeHtml(compact(task.result))}</div>` : '';
      const deps = task.dependencies?.length ? `deps ${task.dependencies.join(', ')}` : 'no deps';
      const retry = ['blocked', 'cancelled'].includes(taskStatus) ? `<button class="mini" data-action="retry-task" data-task="${escapeHtml(task.id)}">Retry</button>` : '';
      return `<div class="task">
        <div class="topline"><div><div class="name">${escapeHtml(task.id)} · ${escapeHtml(task.title)}</div><div class="small">${escapeHtml(task.role)} · priority ${task.priority || 0} · ${escapeHtml(deps)} · attempts ${task.attempts || 0}</div></div><span class="pill ${stateClass}">${escapeHtml(stateLabel)}</span></div>
        <div class="small" style="margin-top:6px">${task.assignedWorkerId ? `owner ${escapeHtml(task.assignedWorkerId)}` : 'unowned'}${task.statusNote ? ` · ${escapeHtml(task.statusNote)}` : ''}</div>
        ${result}${retry ? `<div style="margin-top:7px">${retry}</div>` : ''}
      </div>`;
    }).join('');
  }

  function renderMessages() {
    const list = snapshot?.messages || [];
    const inbox = list.filter((message) => message.toWorkerId === 'operator').slice().reverse();
    const traffic = list.filter((message) => message.toWorkerId !== 'operator').slice(-30).reverse();
    els.inboxCount.textContent = String(inbox.length);
    els.trafficCount.textContent = String(traffic.length);
    els.messageMetric.textContent = String(list.filter((m) => ['queued','running'].includes(m.status)).length);

    els.inbox.innerHTML = inbox.length ? inbox.map((message) => `<div class="message operator">
      <div class="topline"><div class="name">${escapeHtml(message.fromWorkerId || message.from || 'worker')} → you</div><span class="pill done">${escapeHtml(safeStatus(message.status, 'delivered').toUpperCase())}</span></div>
      <div class="message-body">${escapeHtml(compact(message.body, 1200))}</div>
      <div class="small">${formatTime(message.createdAt)}${message.taskId ? ` · ${escapeHtml(message.taskId)}` : ''}</div>
    </div>`).join('') : '<div class="empty">No worker messages to the operator.</div>';

    els.traffic.innerHTML = traffic.length ? traffic.map((message) => `<div class="message">
      <div class="topline"><div class="name">${escapeHtml(message.fromWorkerId || message.from || 'operator')} → ${escapeHtml(message.toWorkerId || 'unknown')}</div><span class="pill ${safeStatus(message.status) === 'running' ? 'running' : safeStatus(message.status) === 'done' ? 'done' : safeStatus(message.status) === 'cancelled' ? 'blocked' : 'pending'}">${escapeHtml(safeStatus(message.status).toUpperCase())}</span></div>
      <div class="message-body">${escapeHtml(compact(message.body, 500))}</div>
      ${message.response ? `<div class="small" style="margin-top:5px">response: ${escapeHtml(compact(message.response, 250))}</div>` : ''}
    </div>`).join('') : '<div class="empty">No semantic traffic yet.</div>';

    const current = els.messageTarget.value;
    els.messageTarget.innerHTML = '<option value="">Select worker by tab</option>' + workers().filter((w) => w.enabled).map((w) => `<option value="${escapeHtml(w.id)}" title="${escapeHtml(w.url || '')}">${escapeHtml(workerTargetLabel(w))}</option>`).join('');
    if ([...els.messageTarget.options].some((option) => option.value === current)) els.messageTarget.value = current;
  }

  function renderJournal() {
    const events = (snapshot?.journal || []).slice(-60).reverse();
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
    const running = list.filter((w) => w.currentAssignmentId);
    const tabIds = list.map((w) => w.tabId);
    const assignmentIds = running.map((w) => w.currentAssignmentId);
    const uniqueTabs = new Set(tabIds).size === tabIds.length;
    const uniqueAssignments = new Set(assignmentIds).size === assignmentIds.length;
    const withinConcurrency = running.length <= Number(snapshot.policy.maxConcurrency || 1);
    const taskOwners = tasks().filter((t) => t.status === 'running').every((task) => list.filter((w) => w.currentTaskId === task.id).length === 1);
    const ownedWorkersActivated = running.every((worker) => ['activating', 'running'].includes(worker.lifecycle));
    const enabledWorkers = list.filter((worker) => worker.enabled !== false);
    const persistentWindowIds = enabledWorkers.filter((worker) => Number.isInteger(worker.windowId)).map((worker) => worker.windowId);
    const persistentWindows = !snapshot.policy.activeWorkerWindows || (persistentWindowIds.length === enabledWorkers.length && new Set(persistentWindowIds).size === persistentWindowIds.length);
    const noSleepState = enabledWorkers.every((worker) => !Number.isInteger(worker.sleepTabId) && !['sleeping', 'parking'].includes(worker.lifecycle));
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

  function renderInvariantsAndExceptions() {
    const invariants = computeInvariants();
    els.invariants.innerHTML = invariants.map(([name, ok, detail]) => `<div class="invariant"><span class="${ok ? 'ok' : 'bad'}">${ok ? '✓' : '!'}</span><div>${escapeHtml(name)}<div class="small">${escapeHtml(detail)}</div></div><span class="${ok ? 'ok' : 'bad'}">${ok ? 'OK' : 'FAIL'}</span></div>`).join('');

    const exceptions = [];
    for (const worker of workers()) {
      const age = worker.heartbeatAt ? Math.round((snapshot.serverNow - worker.heartbeatAt) / 1000) : Infinity;
      if (age > HEARTBEAT_STALE_SECONDS) exceptions.push(`${worker.id} heartbeat stale (${Number.isFinite(age) ? `${age}s` : 'never'})`);
      if (worker.status === 'blocked') {
        exceptions.push(worker.id + ' is blocked' + (worker.lastDispatchError ? ': ' + worker.lastDispatchError : ''));
      }
    }
    for (const task of tasks()) {
      if (task.status === 'blocked') exceptions.push(`${task.id} is blocked${task.statusNote ? `: ${task.statusNote}` : ''}`);
      if (task.status === 'pending' && !taskRunnable(task) && (task.dependencies || []).some((id) => snapshot.tasks?.[id]?.status === 'blocked')) exceptions.push(`${task.id} waits on a blocked dependency`);
    }
    els.exceptionCount.textContent = String(exceptions.length);
    els.exceptions.innerHTML = exceptions.length ? exceptions.map((text) => `<div class="exception"><strong>Attention</strong><div class="small">${escapeHtml(text)}</div></div>`).join('') : '<div class="empty">No current exceptions.</div>';
  }

  function render() {
    if (!snapshot) return;
    const list = workers();
    const active = list.filter((worker) => worker.currentAssignmentId).length;
    const runnable = tasks().filter(taskRunnable).length;
    const healthy = snapshot.policy.authorityEnabled && computeInvariants().every(([, ok]) => ok);

    els.healthText.textContent = healthy ? (snapshot.policy.paused ? 'Healthy · paused' : 'Healthy') : (snapshot.policy.authorityEnabled ? 'Attention required' : 'Authority revoked');
    els.healthDot.style.background = healthy ? 'var(--green)' : snapshot.policy.authorityEnabled ? 'var(--amber)' : 'var(--red)';
    els.goalInput.value = document.activeElement === els.goalInput ? els.goalInput.value : (snapshot.goal || '');
    els.workerMetric.textContent = `${active} / ${list.length}`;
    els.taskMetric.textContent = String(runnable);
    els.generation.textContent = `gen ${snapshot.generation}`;
    els.concurrency.value = String(snapshot.policy.maxConcurrency || 8);
    els.concurrencyValue.textContent = String(snapshot.policy.maxConcurrency || 8);
    els.authorityValue.textContent = snapshot.policy.authorityEnabled ? 'ON' : 'OFF';
    els.authorityValue.style.color = snapshot.policy.authorityEnabled ? 'var(--green)' : 'var(--red)';
    els.pauseAll.textContent = snapshot.policy.paused ? 'Resume dispatch' : 'Pause dispatch';
    els.killAll.textContent = snapshot.policy.authorityEnabled ? 'Kill authority' : 'Restore authority';

    renderWorkers();
    renderTasks();
    renderMessages();
    renderJournal();
    renderInvariantsAndExceptions();
  }

  async function refresh() {
    const response = await send('fleet:get-snapshot');
    snapshot = normalizeSnapshot(response.snapshot);
    render();
  }

  chrome.runtime.onMessage.addListener((message) => {
    if (message?.type === "fleet:snapshot-changed" && message.snapshot) {
      snapshot = normalizeSnapshot(message.snapshot);
      render();
      return;
    }
    if (message?.type === "fleet:heartbeats" && snapshot && message.heartbeats) {
      for (const [workerId, heartbeat] of Object.entries(message.heartbeats)) {
        const worker = snapshot.workers?.[workerId];
        if (!worker) continue;
        snapshot.workers[workerId] = { ...worker, ...heartbeat };
      }
      snapshot.serverNow = Number(message.serverNow) || Date.now();
      updateHeartbeatDisplays();
    }
  });

  els.refresh.addEventListener('click', () => refresh().then(() => setStatus('Refreshed')).catch((error) => setStatus(String(error), true)));
  els.registerAll.addEventListener('click', () => send('fleet:register-all-tabs').then((response) => { snapshot = normalizeSnapshot(response.snapshot); render(); setStatus('Registered supported ChatGPT tabs'); }).catch((error) => setStatus(String(error), true)));
  els.saveGoal.addEventListener('click', () => send('fleet:set-goal', { goal: els.goalInput.value }).then((response) => { snapshot = normalizeSnapshot(response.snapshot); render(); setStatus('Goal saved'); }).catch((error) => setStatus(String(error), true)));

  els.concurrency.addEventListener('input', () => { els.concurrencyValue.textContent = els.concurrency.value; });
  els.concurrency.addEventListener('change', () => send('fleet:update-policy', { patch: { maxConcurrency: Number(els.concurrency.value) } }).then((response) => { snapshot = normalizeSnapshot(response.snapshot); render(); setStatus('Concurrency updated'); }).catch((error) => setStatus(String(error), true)));
  els.pauseAll.addEventListener('click', () => {
    if (!snapshot) return;
    send('fleet:update-policy', { patch: { paused: !snapshot.policy.paused } }).then((response) => {
      snapshot = normalizeSnapshot(response.snapshot);
      render();
      setStatus(snapshot.policy.paused ? 'Dispatch paused' : 'Dispatch resumed; queued work is now eligible');
    }).catch((error) => setStatus(String(error), true));
  });
  els.stopFlushStale.addEventListener('click', () => {
    if (!window.confirm('Pause dispatch, cancel active assignments, and cancel all queued worker messages?')) return;
    els.stopFlushStale.disabled = true;
    send('fleet:stop-and-flush-stale').then((response) => {
      snapshot = normalizeSnapshot(response.snapshot);
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
    request.then((response) => { snapshot = normalizeSnapshot(response.snapshot); render(); setStatus(snapshot.policy.authorityEnabled ? 'Authority restored' : 'Authority revoked'); }).catch((error) => setStatus(String(error), true));
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
      snapshot = normalizeSnapshot(response.snapshot);
      els.taskTitle.value = '';
      els.taskPrompt.value = '';
      els.taskDeps.value = '';
      render();
      setStatus(`Queued ${response.task.id}`);
    }).catch((error) => setStatus(String(error), true));
  });

  els.sendMessage.addEventListener('click', () => {
    if (!els.messageTarget.value || !els.messageBody.value.trim()) return setStatus('Choose a worker and enter a message', true);
    send('fleet:send-message', { toWorkerId: els.messageTarget.value, body: els.messageBody.value }).then((response) => {
      snapshot = normalizeSnapshot(response.snapshot);
      els.messageBody.value = '';
      render();
      const paused = snapshot.policy.paused === true;
      setStatus(response.scheduleError
        ? `Queued ${response.message.id}; scheduler error recorded in Journal`
        : (response.message.status === 'running'
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
        snapshot = normalizeSnapshot(response.snapshot);
        render();
        setStatus(response.transportError ? `Dispatch cleared; local stop warning: ${response.transportError}` : `Cancelled ${response.assignmentId}`);
      }).catch((error) => {
        button.disabled = false;
        setStatus(String(error), true);
      });
      return;
    }
    if (button.dataset.action === 'unregister-worker') send('fleet:unregister-worker', { workerId }).then((response) => { snapshot = normalizeSnapshot(response.snapshot); render(); }).catch((error) => setStatus(String(error), true));
  });

  els.workers.addEventListener('change', (event) => {
    const select = event.target.closest('select[data-action="role-worker"]');
    if (!select) return;
    send('fleet:set-worker-role', { workerId: select.dataset.worker, role: select.value }).then((response) => { snapshot = normalizeSnapshot(response.snapshot); render(); }).catch((error) => setStatus(String(error), true));
  });

  els.tasks.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action="retry-task"]');
    if (!button) return;
    send('fleet:retry-task', { taskId: button.dataset.task }).then((response) => { snapshot = normalizeSnapshot(response.snapshot); render(); }).catch((error) => setStatus(String(error), true));
  });

  refresh().catch((error) => setStatus(String(error), true));
  refreshTimer = setInterval(updateHeartbeatDisplays, 5000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) refresh().catch(() => {}); });
  window.addEventListener('pagehide', () => { if (refreshTimer) clearInterval(refreshTimer); });
})();
