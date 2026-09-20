(() => {
  'use strict';

  const HEARTBEAT_MS = 10000;
  const WATCHDOG_MS = 5000;
  const MONITOR_THROTTLE_MS = 500;
  const FALLBACK_SETTLE_MS = 30000;
  const START_TIMEOUT_MS = 20000;
  const COMPLETION_HANDOFF_ID = '__model_fleet_completion_handoff__';

  let registered = false;
  let heartbeatTimer = null;
  let monitorTimer = null;
  let monitorObserver = null;
  let monitorCheckRunning = false;
  let monitorCheckQueued = false;
  let lastMonitorCheckAt = 0;
  let monitorThrottleTimer = null;
  let active = null;
  let pendingCompletion = readCompletionHandoff();
  let latestAssistantNodeCache = null;

  function completionHandoffNode(create = false) {
    let node = document.getElementById(COMPLETION_HANDOFF_ID);
    if (!node && create && document.documentElement) {
      node = document.createElement('meta');
      node.id = COMPLETION_HANDOFF_ID;
      node.hidden = true;
      node.setAttribute('data-model-fleet-handoff', '1');
      document.documentElement.appendChild(node);
    }
    return node;
  }

  function readCompletionHandoff() {
    const node = completionHandoffNode(false);
    const raw = node?.getAttribute('data-payload');
    if (!raw) return null;
    try {
      const value = JSON.parse(raw);
      if (!value || typeof value.assignmentId !== 'string' || typeof value.text !== 'string') throw new Error('invalid handoff');
      return value;
    } catch {
      node?.remove();
      return null;
    }
  }

  function writeCompletionHandoff(completed, text) {
    const node = completionHandoffNode(true);
    if (!node) return null;
    const payload = {
      assignmentId: completed.assignment.id,
      kind: completed.assignment.kind,
      text: String(text || ''),
      title: document.title,
      url: location.href,
      createdAt: Date.now(),
    };
    node.setAttribute('data-payload', JSON.stringify(payload));
    pendingCompletion = payload;
    return payload;
  }

  function clearCompletionHandoff(assignmentId) {
    const node = completionHandoffNode(false);
    const stored = readCompletionHandoff();
    if (!assignmentId || !stored || stored.assignmentId === assignmentId) node?.remove();
    if (!assignmentId || !pendingCompletion || pendingCompletion.assignmentId === assignmentId) pendingCompletion = null;
  }

  function extensionContextInvalidated(error) {
    return /extension context invalidated/i.test(String(error?.message || error || ''));
  }

  function retireInvalidatedBridge() {
    registered = false;
    stopMonitor();
    stopHeartbeat();
  }

  function runtimeMessage(message) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, (response) => {
        const error = chrome.runtime.lastError;
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  function usable(el) {
    if (!el) return false;
    const style = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return style.display !== 'none'
      && style.visibility !== 'hidden'
      && style.opacity !== '0'
      && rect.width > 0
      && rect.height > 0;
  }

  function enabledButton(el) {
    return !!el
      && !el.disabled
      && !el.hasAttribute('disabled')
      && el.getAttribute('aria-disabled') !== 'true';
  }

  function isStreaming() {
    const stopButton = document.querySelector("[data-testid=\"stop-button\"], button[aria-label*=\"stop\" i]");
    return !!stopButton && enabledButton(stopButton);
  }

  function findComposer() {
    return document.querySelector('#prompt-textarea')
      || document.querySelector('textarea#prompt-textarea')
      || document.querySelector('[contenteditable="true"][data-id]')
      || document.querySelector('[contenteditable="true"][data-placeholder]');
  }

  function composerText(editor) {
    if (!editor) return '';
    if (editor.tagName === 'TEXTAREA' || editor.tagName === 'INPUT') return editor.value || '';
    return editor.innerText || editor.textContent || '';
  }

  function setComposerText(editor, text) {
    editor.focus();
    if (editor.tagName === 'TEXTAREA') {
      const descriptor = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value');
      descriptor?.set?.call(editor, text);
      editor.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));
      editor.dispatchEvent(new Event('change', { bubbles: true }));
      return;
    }

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(editor);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('delete', false, null);
    document.execCommand('insertText', false, text);
    editor.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));
  }

  function findSendButton() {
    return document.querySelector('button[data-testid="send-button"]')
      || document.querySelector('button[aria-label="Send prompt"]')
      || [...document.querySelectorAll('button')].find((button) => {
        if (!usable(button) || !enabledButton(button)) return false;
        const label = button.getAttribute('aria-label') || '';
        return /^send( prompt)?$/i.test(label.trim());
      });
  }

  function assistantNodes() {
    return document.querySelectorAll("[data-message-author-role=\"assistant\"]");
  }

  function rememberAssistantNodeFromMutations(mutations) {
    let touchedAssistant = false;
    for (const mutation of mutations) {
      const target = mutation.target?.nodeType === Node.ELEMENT_NODE ? mutation.target : mutation.target?.parentElement;
      const owner = target?.closest?.("[data-message-author-role=\"assistant\"]");
      if (owner) {
        latestAssistantNodeCache = owner;
        touchedAssistant = true;
      }
      for (const node of mutation.addedNodes || []) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        if (node.matches?.("[data-message-author-role=\"assistant\"]")) {
          latestAssistantNodeCache = node;
          touchedAssistant = true;
          continue;
        }
        const nested = node.querySelectorAll?.("[data-message-author-role=\"assistant\"]");
        if (nested?.length) {
          latestAssistantNodeCache = nested[nested.length - 1];
          touchedAssistant = true;
        }
      }
    }
    if (touchedAssistant && active) {
      active.textDirty = true;
      active.lastChangeAt = Date.now();
    }
  }

  function latestAssistantNode(refresh = false) {
    if (!refresh && latestAssistantNodeCache?.isConnected) return latestAssistantNodeCache;
    const nodes = assistantNodes();
    latestAssistantNodeCache = nodes[nodes.length - 1] || null;
    return latestAssistantNodeCache;
  }

  function latestAssistantText(refresh = false) {
    const node = latestAssistantNode(refresh);
    if (!node) return "";
    return String(node.innerText || node.textContent || "").trim();
  }

  function hideTransportResponse(text) {
    const source = normalizeFleetProtocolSource(text);
    if (!/\[\s*FLEET_MESSAGE\b/i.test(source)) return false;
    const nodes = assistantNodes();
    const node = nodes[nodes.length - 1];
    if (!node) return false;
    const current = String(node.innerText || node.textContent || '').trim();
    if (fingerprint(current) !== fingerprint(String(text || '').trim())) return false;
    const container = node.closest('article') || node.closest('[data-testid^="conversation-turn"]') || node;
    container.setAttribute('data-model-fleet-transport-output', 'hidden');
    container.style.display = 'none';
    return true;
  }

  function normalizeFleetProtocolSource(text) {
    return String(text || '')
      .normalize('NFKC')
      .replace(/[\u200B-\u200D\u2060\uFEFF]/g, '')
      .replace(/\u00A0/g, ' ')
      .replace(/[“”„‟]/g, '"')
      .replace(/[‘’‚‛]/g, "'");
  }

  function hasFleetTerminalMarker(text) {
    const source = normalizeFleetProtocolSource(text);
    return /\[\s*FLEET_STATUS\b[^\]]*?\bstate\s*=\s*(?:"(?:done|blocked)"|'(?:done|blocked)'|(?:done|blocked))\s*\][\s\S]*?\[\s*\/\s*FLEET_STATUS\s*\]\s*$/i.test(source);
  }

  function fingerprint(text) {
    const value = String(text || '');
    let hash = 2166136261;
    for (let i = 0; i < value.length; i += 1) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return `${value.length}:${(hash >>> 0).toString(16)}`;
  }

  function waitForSendButton(timeoutMs = 8000) {
    const immediate = findSendButton();
    if (immediate && enabledButton(immediate)) return Promise.resolve(immediate);

    return new Promise((resolve) => {
      let settled = false;
      const finish = (button) => {
        if (settled) return;
        settled = true;
        observer.disconnect();
        clearTimeout(timeoutId);
        resolve(button);
      };
      const observer = new MutationObserver(() => {
        const button = findSendButton();
        if (button && enabledButton(button)) finish(button);
      });
      observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["disabled", "aria-disabled", "data-testid", "aria-label"] });
      const timeoutId = setTimeout(() => finish(null), timeoutMs);
    });
  }

  async function injectPrompt(text) {
    if (isStreaming()) throw new Error('ChatGPT tab is already busy');
    const editor = findComposer();
    if (!editor) throw new Error('ChatGPT prompt composer was not found');
    if (composerText(editor).trim()) throw new Error('ChatGPT composer is not empty; refusing to overwrite user text');

    setComposerText(editor, text);
    const sendButton = await waitForSendButton();
    if (!sendButton) throw new Error('ChatGPT send button did not become available');
    sendButton.click();
  }

  function stopMonitor() {
    if (monitorTimer !== null) {
      clearInterval(monitorTimer);
      monitorTimer = null;
    }
    if (monitorObserver !== null) {
      monitorObserver.disconnect();
      monitorObserver = null;
    }
    if (monitorThrottleTimer !== null) {
      clearTimeout(monitorThrottleTimer);
      monitorThrottleTimer = null;
    }
    monitorCheckRunning = false;
    monitorCheckQueued = false;
    lastMonitorCheckAt = 0;
  }

  function requestMonitorCheck() {
    if (!active) return;
    const elapsed = Date.now() - lastMonitorCheckAt;
    if (elapsed < MONITOR_THROTTLE_MS) {
      if (monitorThrottleTimer === null) {
        monitorThrottleTimer = setTimeout(() => {
          monitorThrottleTimer = null;
          requestMonitorCheck();
        }, MONITOR_THROTTLE_MS - elapsed);
      }
      return;
    }
    lastMonitorCheckAt = Date.now();
    if (monitorCheckRunning) {
      monitorCheckQueued = true;
      return;
    }
    monitorCheckRunning = true;
    monitorActive().catch((error) => {
      console.debug("[model-fleet] monitor check failed", error);
    }).finally(() => {
      monitorCheckRunning = false;
      if (monitorCheckQueued && active) {
        monitorCheckQueued = false;
        queueMicrotask(requestMonitorCheck);
      }
    });
  }

  function startMonitor() {
    stopMonitor();
    const root = document.body || document.documentElement;
    if (root) {
      monitorObserver = new MutationObserver((mutations) => { rememberAssistantNodeFromMutations(mutations); requestMonitorCheck(); });
      monitorObserver.observe(root, {
        subtree: true,
        childList: true,
        characterData: true,
      });
    }
    monitorTimer = setInterval(requestMonitorCheck, WATCHDOG_MS);
    requestMonitorCheck();
  }

  async function reportCompletionPayload(payload) {
    const response = await runtimeMessage({
      type: 'fleet:assignment-complete',
      assignmentId: payload.assignmentId,
      kind: payload.kind,
      text: payload.text,
      title: payload.title || document.title,
      url: payload.url || location.href,
      recoveredAfterContextReload: payload.createdAt > 0,
    });
    if (response?.ok === false) throw new Error(response.error || 'completion report rejected');
    return response;
  }


  function signalIdleReady(assignmentId) {
    try {
      const pending = chrome.runtime.sendMessage({
        type: 'fleet:worker-idle-ready',
        assignmentId,
      });
      if (pending?.catch) pending.catch(() => {});
    } catch {
      // The completion/cancellation acknowledgement is already authoritative.
    }
  }

  async function recoverPendingCompletion() {
    if (!pendingCompletion) pendingCompletion = readCompletionHandoff();
    if (!pendingCompletion) return true;
    const payload = pendingCompletion;
    try {
      await reportCompletionPayload(payload);
      hideTransportResponse(payload.text);
      clearCompletionHandoff(payload.assignmentId);
      signalIdleReady(payload.assignmentId);
      return true;
    } catch (error) {
      if (extensionContextInvalidated(error)) retireInvalidatedBridge();
      return false;
    }
  }

  async function finishActive(text) {
    if (!active) return;
    const completed = active;
    active = null;
    stopMonitor();
    const payload = {
      assignmentId: completed.assignment.id,
      kind: completed.assignment.kind,
      text: String(text || ''),
      title: document.title,
      url: location.href,
      createdAt: 0,
    };
    try {
      await reportCompletionPayload(payload);
      hideTransportResponse(payload.text);
      signalIdleReady(payload.assignmentId);
    } catch (error) {
      writeCompletionHandoff(completed, text);
      if (extensionContextInvalidated(error)) {
        retireInvalidatedBridge();
        return;
      }
      console.warn('[model-fleet] completion deferred for retry', error);
    }
  }

  async function monitorActive() {
    if (!active) return;
    const streaming = isStreaming();
    if (streaming) active.sawStreaming = true;

    const elapsed = Date.now() - active.sentAt;
    if (active.textDirty) {
      const text = latestAssistantText();
      const currentFingerprint = fingerprint(text);
      active.textDirty = false;
      if (currentFingerprint !== active.lastFingerprint) {
        active.lastFingerprint = currentFingerprint;
        active.lastText = text;
        active.responseChanged = currentFingerprint !== active.baselineFingerprint && text.trim().length > 0;
        active.explicitTerminal = active.responseChanged && hasFleetTerminalMarker(text);
      }
    }

    const quietFor = Date.now() - active.lastChangeAt;
    if (active.responseChanged && active.explicitTerminal) {
      await finishActive(active.lastText);
      return;
    }

    if (active.responseChanged && !active.explicitTerminal && quietFor >= FALLBACK_SETTLE_MS && elapsed >= FALLBACK_SETTLE_MS) {
      console.debug("[model-fleet] completing response without explicit FLEET_STATUS after long quiet fallback");
      await finishActive(active.lastText);
      return;
    }

    // A stale Stop button must not pin an already-settled assignment forever.
    // For genuinely active turns, streaming still suppresses the no-start timeout.
    if (streaming) return;

    if (!active.sawStreaming && elapsed > START_TIMEOUT_MS && !active.responseChanged) {
      const failed = active;
      active = null;
      stopMonitor();
      runtimeMessage({
        type: "fleet:assignment-cancelled",
        assignmentId: failed.assignment.id,
        reason: "no model response observed before start timeout",
      }).then(() => signalIdleReady(failed.assignment.id)).catch(() => {});
    }
  }

  async function executeAssignment(assignment) {
    if (!assignment?.id || !assignment.prompt) throw new Error('invalid assignment');
    if (active) throw new Error(`worker already has assignment ${active.assignment.id}`);
    if (pendingCompletion) throw new Error(`worker is recovering completion ${pendingCompletion.assignmentId}`);

    const baselineText = latestAssistantText(true);
    const sentAt = Date.now();
    await injectPrompt(assignment.prompt);
    latestAssistantNodeCache = null;
    registered = true;
    startHeartbeat();
    active = {
      assignment,
      sentAt,
      baselineFingerprint: fingerprint(baselineText),
      lastFingerprint: fingerprint(baselineText),
      lastText: baselineText,
      lastChangeAt: sentAt,
      sawStreaming: false,
      textDirty: true,
      responseChanged: false,
      explicitTerminal: false,
    };
    startMonitor();
    return { assignmentId: assignment.id };
  }

  async function cancelCurrent(reason = 'cancelled') {
    if (!active) return;
    const cancelled = active;
    active = null;
    stopMonitor();

    const stopButton = document.querySelector('[data-testid="stop-button"]')
      || [...document.querySelectorAll('button')].find((button) => {
        const label = button.getAttribute('aria-label') || button.textContent || '';
        return usable(button) && /^\s*stop\b/i.test(label);
      });
    if (stopButton && enabledButton(stopButton)) stopButton.click();

    try {
      await runtimeMessage({
        type: 'fleet:assignment-cancelled',
        assignmentId: cancelled.assignment.id,
        reason,
      });
      signalIdleReady(cancelled.assignment.id);
    } catch {
      // Keep the worker live if cancellation authority was not acknowledged.
    }
  }

  async function heartbeat() {
    if (!registered) return;
    if (pendingCompletion) {
      const recovered = await recoverPendingCompletion();
      if (!recovered || pendingCompletion) return;
    }
    try {
      const response = await runtimeMessage({
        type: 'fleet:worker-heartbeat',
        busy: !!active || !!pendingCompletion || isStreaming(),
        activeAssignmentId: active?.assignment.id || pendingCompletion?.assignmentId || null,
        title: document.title,
        url: location.href,
      });
      if (!response?.ok) registered = false;
    } catch {
      // Service worker may be waking/restarting; next heartbeat retries.
    }
  }

  function startHeartbeat() {
    if (heartbeatTimer !== null || !registered) return;
    heartbeat();
    heartbeatTimer = setInterval(heartbeat, HEARTBEAT_MS);
  }

  function stopHeartbeat() {
    if (heartbeatTimer !== null) {
      clearInterval(heartbeatTimer);
      heartbeatTimer = null;
    }
  }

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (!message || typeof message.type !== 'string') return false;

    if (message.type === 'fleet:bridge-ping') {
      sendResponse({ ok: true, registered, activeAssignmentId: active?.assignment.id || pendingCompletion?.assignmentId || null });
      return false;
    }

    if (message.type === 'fleet:execute-assignment') {
      executeAssignment(message.assignment)
        .then((result) => sendResponse({ ok: true, ...result }))
        .catch((error) => sendResponse({ ok: false, error: String(error) }));
      return true;
    }

    if (message.type === 'fleet:cancel-current') {
      cancelCurrent(message.reason || 'cancelled')
        .then(() => sendResponse({ ok: true }))
        .catch((error) => sendResponse({ ok: false, error: String(error) }));
      return true;
    }

    if (message.type === 'fleet:registration-changed') {
      registered = message.registered === true;
      if (registered) {
        recoverPendingCompletion().finally(() => startHeartbeat());
      } else stopHeartbeat();
      sendResponse({ ok: true });
      return false;
    }

    return false;
  });

  async function hello() {
    try {
      const response = await runtimeMessage({
        type: 'fleet:worker-hello',
        activeAssignmentId: active?.assignment.id || pendingCompletion?.assignmentId || null,
      });
      registered = response?.registered === true;
      if (registered) startHeartbeat();
    } catch {
      registered = false;
    }
  }

  window.addEventListener('pagehide', () => {
    stopMonitor();
    stopHeartbeat();
  });

  async function bootstrap() {
    if (pendingCompletion) {
      const recovered = await recoverPendingCompletion();
      if (!recovered && pendingCompletion) return;
    }
    await hello();
  }

  bootstrap();
})();
