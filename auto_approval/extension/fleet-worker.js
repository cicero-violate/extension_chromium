(() => {
  'use strict';

  const HEARTBEAT_MS = 10000;
  const MONITOR_THROTTLE_MS = 500;
  const COMPOSER_READY_TIMEOUT_MS = 20000;
  const SEND_READY_TIMEOUT_MS = 5000;
  // ChatGPT tool calls and long model responses can legitimately take more
  // than a few seconds. Keep an assignment alive long enough for those turns
  // to produce their final FLEET_STATUS marker.
  const FALLBACK_SETTLE_MS = 60000;
  const START_TIMEOUT_MS = 120000;
  const WATCHDOG_INTERVAL_MS = 60000;
  const LONG_RUNNING_STALL_MS = 20 * 60 * 1000;
  const AUTO_RECOVERY_REASON_PREFIX = 'auto-recovery: ';
  const COMPLETION_HANDOFF_ID = '__model_fleet_completion_handoff__';

  let registered = false;
  let heartbeatTimer = null;
  let monitorStartTimer = null;
  let monitorSettleTimer = null;
  let monitorObserver = null;
  let monitorCheckRunning = false;
  let monitorCheckQueued = false;
  let lastMonitorCheckAt = 0;
  let monitorThrottleTimer = null;
  let monitorWatchdogTimer = null;
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

  function hasActiveStopControl() {
    const stopButton = document.querySelector(
      '#composer-submit-button[data-testid="stop-button"], '
      + '#composer-submit-button[data-testid*="stop" i], '
      + '#composer-submit-button[aria-label*="stop" i], '
      + 'button[data-testid="stop-button"]'
    );
    return !!stopButton && usable(stopButton) && enabledButton(stopButton);
  }

  function isStreaming() {
    return hasActiveStopControl();
  }

  function findComposer() {
    return document.querySelector('#prompt-textarea')
      || document.querySelector('[contenteditable="true"][role="textbox"]')
      || document.querySelector('[role="textbox"][aria-multiline="true"]')
      || document.querySelector('textarea[name="prompt-textarea"]')
      || document.querySelector('[contenteditable="true"][data-id]')
      || document.querySelector('[contenteditable="true"][data-placeholder]');
  }

  function composerText(editor) {
    if (!editor) return '';
    if (editor.tagName === 'TEXTAREA' || editor.tagName === 'INPUT') return editor.value || '';

    const blocks = [...editor.children];
    if (blocks.length && blocks.every((node) => /^(P|DIV)$/.test(node.tagName))) {
      return blocks.map((node) => node.innerText || node.textContent || '').join(String.fromCharCode(10));
    }
    return editor.innerText || editor.textContent || '';
  }

  function normalizedComposerText(value) {
    const crlf = String.fromCharCode(13) + String.fromCharCode(10);
    const lf = String.fromCharCode(10);
    const nbsp = String.fromCharCode(160);
    return String(value || '').split(nbsp).join(' ').split(crlf).join(lf).trim();
  }

  function canonicalComposerText(value) {
    return normalizedComposerText(value).replace(/\s+/g, ' ');
  }

  function composerTextMatches(editor, expected) {
    const current = composerText(editor);
    const exactCurrent = normalizedComposerText(current);
    const exactExpected = normalizedComposerText(expected);
    if (exactCurrent === exactExpected) return true;
    return canonicalComposerText(current) === canonicalComposerText(expected);
  }

  function selectComposerContents(editor) {
    const selection = window.getSelection();
    if (!selection) return false;
    const range = document.createRange();
    range.selectNodeContents(editor);
    selection.removeAllRanges();
    selection.addRange(range);
    return true;
  }

  function placeCaretAtComposerEnd(editor) {
    const selection = window.getSelection();
    if (!selection) return;
    const range = document.createRange();
    range.selectNodeContents(editor);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function renderPlainTextIntoContentEditable(editor, text) {
    const fragment = document.createDocumentFragment();
    const lines = String(text).split(String.fromCharCode(10));
    for (const line of lines) {
      const paragraph = document.createElement('p');
      if (line) paragraph.appendChild(document.createTextNode(line));
      else paragraph.appendChild(document.createElement('br'));
      fragment.appendChild(paragraph);
    }
    editor.replaceChildren(fragment);
    placeCaretAtComposerEnd(editor);
  }

  async function waitForComposerText(editor, expected, timeoutMs = 1200) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      if (composerTextMatches(editor, expected)) return true;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    return composerTextMatches(editor, expected);
  }

  async function writeComposerText(editor, text) {
    if (composerTextMatches(editor, text)) return true;

    editor.focus();
    if (editor.tagName === 'TEXTAREA' || editor.tagName === 'INPUT') {
      const proto = editor.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
      if (!setter) return false;
      setter.call(editor, text);
      editor.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));
      editor.dispatchEvent(new Event('change', { bubbles: true }));
      return waitForComposerText(editor, text);
    }

    if (selectComposerContents(editor)) {
      try {
        document.execCommand('insertText', false, text);
      } catch {
      }
      if (await waitForComposerText(editor, text, 450)) return true;
    }

    try {
      editor.dispatchEvent(new InputEvent('beforeinput', {
        bubbles: true,
        cancelable: true,
        inputType: 'insertText',
        data: text,
      }));
      renderPlainTextIntoContentEditable(editor, text);
      editor.dispatchEvent(new InputEvent('input', {
        bubbles: true,
        inputType: 'insertText',
        data: text,
      }));
    } catch {
      return false;
    }
    return waitForComposerText(editor, text);
  }

  function findSendButton() {
    const selectors = [
      '#composer-submit-button[data-testid="send-button"]',
      'button[data-testid="send-button"]',
      'button[data-testid*="send" i]',
      'button[aria-label="Send prompt"]',
      'button[aria-label="Send"]',
    ];
    const candidates = [...document.querySelectorAll(selectors.join(', '))];
    const visible = candidates.find((button) => usable(button));
    if (visible) return visible;
    return [...document.querySelectorAll('button')].find((button) => {
      if (!usable(button)) return false;
      return /^send(?: prompt| message)?$/i.test((button.getAttribute('aria-label') || '').trim());
    }) || null;
  }

  function waitForComposer(timeoutMs = COMPOSER_READY_TIMEOUT_MS) {
    const immediate = findComposer();
    if (immediate) return Promise.resolve(immediate);

    return new Promise((resolve) => {
      let settled = false;
      const finish = (editor) => {
        if (settled) return;
        settled = true;
        observer.disconnect();
        clearTimeout(timeoutId);
        resolve(editor);
      };
      const observer = new MutationObserver(() => {
        const editor = findComposer();
        if (editor) finish(editor);
      });
      observer.observe(document.documentElement, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['id', 'contenteditable', 'role', 'aria-multiline', 'name', 'data-id', 'data-placeholder'],
      });
      const timeoutId = setTimeout(() => finish(null), timeoutMs);
    });
  }

  const assistantTurnNodeIds = new WeakMap();
  let nextAssistantTurnNodeId = 1;

  function isUserTurnNode(node) {
    let current = node;
    while (current && current !== document.documentElement) {
      if (String(current.className || '').includes('user-message')) return true;
      current = current.parentElement;
    }
    return false;
  }

  function assistantTurnActionRows() {
    return [...document.querySelectorAll('.turn-action-controls')].filter((row) => {
      if (isUserTurnNode(row)) return false;
      return !!row.querySelector(
        'button[aria-label="Copy"], '
        + 'button[aria-label*="good response" i], '
        + 'button[aria-label*="bad response" i]'
      );
    });
  }

  function latestAssistantActionRow() {
    const rows = assistantTurnActionRows();
    return rows[rows.length - 1] || null;
  }

  function assistantNodes() {
    return document.querySelectorAll("[data-message-author-role=\"assistant\"]");
  }

  function assistantTurnNodeId(node) {
    if (!node) return 0;
    let id = assistantTurnNodeIds.get(node);
    if (!id) {
      id = nextAssistantTurnNodeId++;
      assistantTurnNodeIds.set(node, id);
    }
    return id;
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
    if (active && mutations.length) {
      // Current ChatGPT no longer exposes data-message-author-role on assistant
      // turns. Any DOM activity may create or update the current turn boundary,
      // so force one throttled rescan. lastChangeAt is updated only when the
      // assistant fingerprint actually changes.
      if (!touchedAssistant) latestAssistantNodeCache = null;
      active.textDirty = true;
    }
  }

  function latestAssistantNode(refresh = false) {
    if (!refresh && latestAssistantNodeCache?.isConnected) return latestAssistantNodeCache;

    // Legacy/older ChatGPT DOM.
    const nodes = assistantNodes();
    const legacy = nodes[nodes.length - 1] || null;
    if (legacy) {
      latestAssistantNodeCache = legacy;
      return latestAssistantNodeCache;
    }

    // Current ChatGPT DOM (2026): the action row belongs to a group whose
    // first child contains semantic transcript blocks. ChatGPT renders the
    // echoed user prompt first ("You said:") and the actual assistant response
    // last ("ChatGPT said:"). Parse only the final response block so protocol
    // examples inside the prompt can never be mistaken for outbound messages.
    const row = latestAssistantActionRow();
    const group = row?.parentElement || null;
    const content = group?.children?.[0] || null;
    const responseBlocks = content ? [...content.children] : [];
    latestAssistantNodeCache = responseBlocks[responseBlocks.length - 1]
      || content
      || group
      || row
      || null;
    return latestAssistantNodeCache;
  }

  function latestAssistantSnapshot(refresh = false) {
    const node = latestAssistantNode(refresh);
    const text = node ? String(node.innerText || node.textContent || "").trim() : "";
    return {
      node,
      text,
      fingerprint: assistantTurnNodeId(node) + ':' + fingerprint(text),
    };
  }

  function hideTransportResponse(text) {
    const source = normalizeFleetProtocolSource(text);
    if (!/\[\s*FLEET_MESSAGE\b/i.test(source)) return false;
    const node = latestAssistantNode(true);
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

  function waitForSendButton(timeoutMs = SEND_READY_TIMEOUT_MS) {
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
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['disabled', 'aria-disabled', 'data-testid', 'aria-label'],
      });
      const timeoutId = setTimeout(() => finish(null), timeoutMs);
    });
  }

  async function injectPrompt(text) {
    if (isStreaming()) throw new Error('ChatGPT tab is already busy');

    const editor = await waitForComposer();
    if (!editor) throw new Error('ChatGPT prompt composer was not found');

    const existing = normalizedComposerText(composerText(editor));
    if (existing && !composerTextMatches(editor, text)) {
      throw new Error('ChatGPT composer already contains different user text; refusing to overwrite it');
    }

    if (!existing) {
      const written = await writeComposerText(editor, text);
      if (!written) throw new Error('ChatGPT rejected the programmatic composer write');
    }

    const sendButton = await waitForSendButton();
    if (!sendButton || !usable(sendButton) || !enabledButton(sendButton)) {
      throw new Error('ChatGPT composer accepted the text, but the Send button never became enabled');
    }
    sendButton.click();
  }

  function stopMonitor() {
    if (monitorStartTimer !== null) {
      clearTimeout(monitorStartTimer);
      monitorStartTimer = null;
    }
    if (monitorSettleTimer !== null) {
      clearTimeout(monitorSettleTimer);
      monitorSettleTimer = null;
    }
    if (monitorObserver !== null) {
      monitorObserver.disconnect();
      monitorObserver = null;
    }
    if (monitorThrottleTimer !== null) {
      clearTimeout(monitorThrottleTimer);
      monitorThrottleTimer = null;
    }
    if (monitorWatchdogTimer !== null) {
      clearInterval(monitorWatchdogTimer);
      monitorWatchdogTimer = null;
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

  function scheduleMonitorSettleCheck() {
    if (!active) return;
    if (monitorSettleTimer !== null) clearTimeout(monitorSettleTimer);
    monitorSettleTimer = setTimeout(() => {
      monitorSettleTimer = null;
      requestMonitorCheck();
    }, FALLBACK_SETTLE_MS + 50);
  }

  function startMonitor() {
    stopMonitor();
    const root = document.body || document.documentElement;
    if (root) {
      monitorObserver = new MutationObserver((mutations) => {
        rememberAssistantNodeFromMutations(mutations);
        requestMonitorCheck();
      });
      monitorObserver.observe(root, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['disabled', 'aria-disabled', 'data-testid', 'aria-label'],
      });
    }

    // One deadline for "response never started"; DOM activity drives all normal checks.
    monitorStartTimer = setTimeout(() => {
      monitorStartTimer = null;
      requestMonitorCheck();
    }, START_TIMEOUT_MS + 50);
    monitorWatchdogTimer = setInterval(() => {
      requestMonitorCheck();
    }, WATCHDOG_INTERVAL_MS);
    requestMonitorCheck();
  }

  async function requestAutoRecovery(reason) {
    if (!active || isStreaming()) return false;
    const stalled = active;
    active = null;
    stopMonitor();
    try {
      const response = await runtimeMessage({
        type: 'fleet:assignment-cancelled',
        assignmentId: stalled.assignment.id,
        reason: AUTO_RECOVERY_REASON_PREFIX + reason,
      });
      if (response?.ok === false) throw new Error(response.error || 'auto recovery rejected');
      signalIdleReady(stalled.assignment.id);
      return true;
    } catch (error) {
      if (extensionContextInvalidated(error)) {
        retireInvalidatedBridge();
        return false;
      }
      active = stalled;
      active.lastProgressAt = Date.now();
      active.textDirty = true;
      startMonitor();
      console.warn('[model-fleet] automatic recovery request failed; continuing original assignment', error);
      return false;
    }
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
    const nowAt = Date.now();
    const streaming = isStreaming();
    if (streaming) {
      active.sawStreaming = true;
      active.lastProgressAt = nowAt;
    }

    const elapsed = nowAt - active.sentAt;
    if (active.textDirty) {
      const snapshot = latestAssistantSnapshot(true);
      const text = snapshot.text;
      const currentFingerprint = snapshot.fingerprint;
      active.textDirty = false;
      if (currentFingerprint !== active.lastFingerprint) {
        active.lastFingerprint = currentFingerprint;
        active.lastText = text;
        active.lastChangeAt = nowAt;
        active.lastProgressAt = nowAt;
        active.responseChanged = currentFingerprint !== active.baselineFingerprint && text.trim().length > 0;
        active.explicitTerminal = active.responseChanged && hasFleetTerminalMarker(text);
        if (active.responseChanged) {
          if (monitorStartTimer !== null) {
            clearTimeout(monitorStartTimer);
            monitorStartTimer = null;
          }
          if (!active.explicitTerminal) scheduleMonitorSettleCheck();
        }
      }
    }

    // Never release the worker while ChatGPT still exposes the active Stop
    // control. Long tool/model turns can legitimately remain active for many
    // minutes; completing here would allow a second fleet message to collide
    // with the still-running turn.
    if (streaming) return;

    const quietFor = nowAt - active.lastChangeAt;
    if (active.responseChanged && active.explicitTerminal) {
      await finishActive(active.lastText);
      return;
    }

    if (active.responseChanged && !active.explicitTerminal && quietFor >= FALLBACK_SETTLE_MS && elapsed >= FALLBACK_SETTLE_MS) {
      console.debug("[model-fleet] completing response without explicit FLEET_STATUS after long quiet fallback");
      await finishActive(active.lastText);
      return;
    }

    if (!active.sawStreaming && elapsed > START_TIMEOUT_MS && !active.responseChanged) {
      await requestAutoRecovery('no model response observed before start timeout');
      return;
    }

    const noProgressFor = nowAt - Number(active.lastProgressAt || active.sentAt);
    if (active.sawStreaming && !active.responseChanged && noProgressFor >= LONG_RUNNING_STALL_MS) {
      await requestAutoRecovery('long-running assignment stalled after active streaming stopped');
    }
  }

  async function executeAssignment(assignment) {
    if (!assignment?.id || !assignment.prompt) throw new Error('invalid assignment');
    if (active) throw new Error(`worker already has assignment ${active.assignment.id}`);
    if (pendingCompletion) throw new Error(`worker is recovering completion ${pendingCompletion.assignmentId}`);

    const baseline = latestAssistantSnapshot(true);
    const baselineText = baseline.text;
    const sentAt = Date.now();
    await injectPrompt(assignment.prompt);
    latestAssistantNodeCache = null;
    registered = true;
    startHeartbeat();
    active = {
      assignment,
      sentAt,
      baselineFingerprint: baseline.fingerprint,
      lastFingerprint: baseline.fingerprint,
      lastText: baselineText,
      lastChangeAt: sentAt,
      lastProgressAt: sentAt,
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
