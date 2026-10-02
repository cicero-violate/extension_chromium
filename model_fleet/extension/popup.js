'use strict';

const $ = (id) => document.getElementById(id);
const els = {
  openControlPane: $('openControlPane'), workerScope: $('workerScope'), workerToggle: $('workerToggle'), workerRole: $('workerRole'),
  scope: $('scope'), tabEnabled: $('tabEnabled'), features: $('features'), autoApprove: $('autoApprove'), autoScroll: $('autoScroll'), autoRetry: $('autoRetry'), repeatToggle: $('repeatToggle'), repeatMode: $('repeatMode'), repeatCount: $('repeatCount'), repeatProgress: $('repeatProgress'), repeatRestartEnabled: $('repeatRestartEnabled'), repeatMessage: $('repeatMessage'), saveRepeat: $('saveRepeat'), sendMessage: $('sendMessage'), status: $('status'),
};

let tabId = null;
let supported = false;
let worker = null;
let roleCatalog = [];
let approval = {
  enabled: false, autoApprove: true, autoScroll: true, autoRetry: false, repeatMessageEnabled: false, repeatMessage: '',
  repeatMessageMode: 'forever', repeatMessageCount: 1, repeatMessageSent: 0,
  repeatRestartEnabled: false, repeatRestartMode: 'new_chat', repeatRestartPending: false, repeatBootstrapPending: false,
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

function setStatus(text, error = false) {
  els.status.textContent = text;
  els.status.style.color = error ? '#f2777a' : '#5dd39e';
  clearTimeout(setStatus.timer);
  setStatus.timer = setTimeout(() => { els.status.textContent = ''; }, error ? 8000 : 3000);
}

function renderToggle(button, label, active) {
  button.textContent = `${label}: ${active ? 'ON' : 'OFF'}`;
  button.className = active ? 'enabled' : 'disabled';
  button.setAttribute('aria-pressed', String(active));
}

function renderRoleOptions() {
  const catalog = roleCatalog.length ? roleCatalog : [{ id: 'coordinator', label: 'Coordinator' }];
  const selected = worker?.role || els.workerRole.value || 'coordinator';
  els.workerRole.innerHTML = catalog.map((role) => {
    const id = String(role.id || 'coordinator');
    const label = String(role.label || id);
    return `<option value="${id}">${label}</option>`;
  }).join('');
  if ([...els.workerRole.options].some((option) => option.value === selected)) els.workerRole.value = selected;
}

function render() {
  renderRoleOptions();
  els.workerScope.textContent = supported
    ? (worker ? `${worker.id} · ${worker.status} · tab ${tabId}` : 'This ChatGPT tab is not registered as a fleet worker.')
    : 'Open ChatGPT in this tab to register a worker.';
  els.workerScope.className = supported ? 'scope' : 'scope unsupported';
  els.workerToggle.disabled = !supported;
  els.workerToggle.textContent = worker ? 'Unregister this tab as worker' : 'Register this tab as worker';
  els.workerToggle.className = worker ? 'enabled' : 'secondary';
  els.workerRole.disabled = !worker;
  if (worker) els.workerRole.value = worker.role || 'coordinator';

  els.scope.textContent = supported ? 'Independent approval settings for this browser tab.' : 'Approval automation is unavailable on this page.';
  els.scope.className = supported ? 'scope' : 'scope unsupported';
  els.tabEnabled.disabled = !supported && !approval.enabled;
  els.features.hidden = !supported;
  renderToggle(els.tabEnabled, 'Approval capability', approval.enabled);
  renderToggle(els.autoApprove, 'Auto approve', approval.autoApprove);
  renderToggle(els.autoScroll, 'Auto scroll', approval.autoScroll);
  renderToggle(els.autoRetry, 'Auto retry delivery errors', approval.autoRetry === true);
  renderToggle(els.repeatToggle, 'Repeat', approval.repeatMessageEnabled);
  const mode = approval.repeatMessageMode === 'count' ? 'count' : 'forever';
  const count = Math.max(1, Math.trunc(Number(approval.repeatMessageCount) || 1));
  const sent = Math.max(0, Math.trunc(Number(approval.repeatMessageSent) || 0));
  if (document.activeElement !== els.repeatMode) els.repeatMode.value = mode;
  if (document.activeElement !== els.repeatCount) els.repeatCount.value = String(count);
  els.repeatCount.disabled = mode !== 'count';
  const restartEnabled = approval.repeatRestartEnabled === true && mode === 'count';
  els.repeatRestartEnabled.checked = restartEnabled;
  els.repeatRestartEnabled.disabled = mode !== 'count';
  const cycleState = approval.repeatRestartPending
    ? ' · waiting to restart after this turn'
    : (approval.repeatBootstrapPending ? ' · starting next batch' : '');
  els.repeatProgress.textContent = mode === 'forever'
    ? 'Sent ' + sent + ' time' + (sent === 1 ? '' : 's') + ' · no limit'
    : 'Sent ' + sent + ' of ' + count + ' · ' + Math.max(0, count - sent) + ' remaining' + cycleState;
  if (document.activeElement !== els.repeatMessage) els.repeatMessage.value = approval.repeatMessage || '';
}

async function initialize() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    tabId = tab?.id;
    if (!Number.isInteger(tabId)) throw new Error('No active tab');
    const [approvalResponse, workerResponse, fleetResponse] = await Promise.all([
      send('approval:get-tab-state', { tabId }),
      send('fleet:get-tab-worker-state', { tabId }),
      send('fleet:get-snapshot'),
    ]);
    supported = approvalResponse.supported === true;
    approval = approvalResponse.state;
    worker = workerResponse.worker;
    roleCatalog = Array.isArray(fleetResponse.snapshot?.roleCatalog) ? fleetResponse.snapshot.roleCatalog : [];
    render();
  } catch (error) {
    setStatus(String(error), true);
  }
}

async function patchApproval(patch, message) {
  if (!Number.isInteger(tabId)) return;
  if (!supported && patch.enabled !== false) return;
  const response = await send('approval:set-tab-state', { tabId, patch });
  approval = response.state;
  supported = response.supported !== false;
  render();
  setStatus(message);
}

els.openControlPane.addEventListener('click', () => {
  chrome.tabs.create({ url: chrome.runtime.getURL('control-pane.html') });
});

els.workerToggle.addEventListener('click', () => {
  if (!supported || !Number.isInteger(tabId)) return;
  const request = worker
    ? send('fleet:unregister-worker', { workerId: worker.id }).then(() => ({ worker: null }))
    : send('fleet:register-tab', { tabId, patch: { role: els.workerRole.value } });
  request.then((response) => {
    worker = response.worker || null;
    render();
    setStatus(worker ? 'Worker registered' : 'Worker unregistered');
  }).catch((error) => setStatus(String(error), true));
});

els.workerRole.addEventListener('change', () => {
  if (!worker) return;
  send('fleet:set-worker-role', { workerId: worker.id, role: els.workerRole.value }).then((response) => {
    worker = response.snapshot.workers[worker.id] || worker;
    render();
    setStatus('Worker role updated');
  }).catch((error) => setStatus(String(error), true));
});

els.tabEnabled.addEventListener('click', () => patchApproval({ enabled: !approval.enabled }, !approval.enabled ? 'Approval enabled' : 'Approval disabled').catch((error) => setStatus(String(error), true)));
els.autoApprove.addEventListener('click', () => patchApproval({ autoApprove: !approval.autoApprove }, 'Auto approve updated').catch((error) => setStatus(String(error), true)));
els.autoScroll.addEventListener('click', () => patchApproval({ autoScroll: !approval.autoScroll }, 'Auto scroll updated').catch((error) => setStatus(String(error), true)));
els.autoRetry.addEventListener('click', () => patchApproval({ autoRetry: !approval.autoRetry }, 'Auto retry updated').catch((error) => setStatus(String(error), true)));
els.repeatToggle.addEventListener('click', () => {
  const enabling = !approval.repeatMessageEnabled;
  const patch = {
    repeatMessageEnabled: enabling,
    repeatRestartPending: false,
    repeatBootstrapPending: false,
  };
  if (enabling) patch.repeatMessageSent = 0;
  patchApproval(patch, enabling ? 'Repeat enabled' : 'Repeat disabled').catch((error) => setStatus(String(error), true));
});

els.repeatMode.addEventListener('change', () => {
  const counted = els.repeatMode.value === 'count';
  els.repeatCount.disabled = !counted;
  els.repeatRestartEnabled.disabled = !counted;
  if (!counted) els.repeatRestartEnabled.checked = false;
});


els.saveRepeat.addEventListener('click', () => {
  const mode = els.repeatMode.value === 'count' ? 'count' : 'forever';
  const count = Math.max(1, Math.min(1000000, Math.trunc(Number(els.repeatCount.value) || 1)));
  patchApproval({
    repeatMessage: els.repeatMessage.value,
    repeatMessageMode: mode,
    repeatMessageCount: count,
    repeatMessageSent: 0,
    repeatRestartEnabled: mode === 'count' && els.repeatRestartEnabled.checked,
    repeatRestartMode: 'new_chat',
    repeatRestartPending: false,
    repeatBootstrapPending: false,
  }, 'Repeat settings saved').catch((error) => setStatus(String(error), true));
});

els.sendMessage.addEventListener('click', async () => {
  const text = els.repeatMessage.value;
  if (!text.trim()) {
    setStatus('Message is empty', true);
    return;
  }
  els.sendMessage.disabled = true;
  setStatus('Sending…');
  try {
    await send('approval:send-message-now', { tabId, text });
    setStatus('Message sent');
  } catch (error) {
    const message = String(error?.message || error || 'request failed').replace(/^(?:Error:\s*)+/, '');
    setStatus(message, true);
  } finally {
    els.sendMessage.disabled = false;
  }
});

initialize();
