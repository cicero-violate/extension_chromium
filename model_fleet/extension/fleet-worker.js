(() => {
  'use strict';

  const HEARTBEAT_MS = 10000;
  const REGISTRATION_RETRY_BASE_MS = 2000;
  const REGISTRATION_RETRY_MAX_MS = 30000;
  const MONITOR_THROTTLE_MS = 500;
  const COMPOSER_READY_TIMEOUT_MS = 20000;
  const COMPOSER_CHUNK_CHARS = 1200;
  const COMPOSER_CHUNK_SETTLE_TIMEOUT_MS = 2500;
  // ChatGPT tool calls and long model responses can legitimately take more
  // than a few seconds. Keep an assignment alive long enough for those turns
  // to produce their final FLEET_STATUS marker.
  const FALLBACK_SETTLE_MS = 60000;
  const WATCHDOG_INTERVAL_MS = 60000;
  const HARD_ASSIGNMENT_TIMEOUT_MS = 15 * 60 * 1000;
  const AUTO_RECOVERY_REASON_PREFIX = 'auto-recovery: ';
  const COMPLETION_HANDOFF_ID = '__model_fleet_completion_handoff__';
  const ASSIGNMENT_RECOVERY_HINT_ID = '__model_fleet_assignment_recovery__';
  const TURN_LIVENESS_ID = '__model_fleet_turn_liveness__';
  const ORPHAN_TURN_STALLED_MS = 2 * 60 * 1000;
  const ORPHAN_TURN_DEAD_MS = 5 * 60 * 1000;
  const OWNED_TURN_STALLED_MS = 5 * 60 * 1000;
  const OWNED_TURN_DEAD_MS = 15 * 60 * 1000;

  let registered = false;
  let registeredWorkerId = null;
  let registrationEnabled = true;
  let registrationRetryPromise = null;
  let registrationRetryAt = 0;
  let registrationRetryDelayMs = REGISTRATION_RETRY_BASE_MS;
  let heartbeatTimer = null;
  let monitorSettleTimer = null;
  let monitorObserver = null;
  let monitorCheckRunning = false;
  let monitorCheckQueued = false;
  let lastMonitorCheckAt = 0;
  let monitorThrottleTimer = null;
  let monitorWatchdogTimer = null;
  let monitorHardTimeoutTimer = null;
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

  function readAssignmentRecoveryHint() {
    const node = document.getElementById(ASSIGNMENT_RECOVERY_HINT_ID);
    const assignmentId = String(node?.getAttribute('data-assignment-id') || '').trim();
    return assignmentId || null;
  }

  function clearAssignmentRecoveryHint(assignmentId = null) {
    const node = document.getElementById(ASSIGNMENT_RECOVERY_HINT_ID);
    if (!node) return;
    const current = String(node.getAttribute('data-assignment-id') || '').trim();
    if (!assignmentId || current === assignmentId) node.remove();
  }

  function normalizedTurnText(text) {
    return normalizeFleetProtocolSource(text).replace(/\s+/g, ' ').trim();
  }

  function latestUserTurnNode() {
    const candidates = document.querySelectorAll(
      '[data-message-author-role="user"], [class~="group/user-message"], .user-message',
    );
    return candidates[candidates.length - 1] || null;
  }

  function latestUserTurnText() {
    const candidates = document.querySelectorAll(
      '[data-message-author-role="user"], [class~="group/user-message"], .user-message',
    );
    const node = candidates[candidates.length - 1] || null;
    return String(node?.innerText || node?.textContent || '').trim();
  }

  function assignmentPromptObserved(assignment) {
    const expected = normalizedTurnText(assignment?.prompt || '');
    const actual = normalizedTurnText(latestUserTurnText());
    if (!expected || !actual) return false;
    if (actual === expected) return true;
    const head = expected.slice(0, Math.min(240, expected.length));
    const tail = expected.slice(Math.max(0, expected.length - Math.min(240, expected.length)));
    return expected.length >= 160 && actual.includes(head) && actual.includes(tail);
  }

  function writeCompletionHandoff(completed, text, responseTerminalAt = 0) {
    const node = completionHandoffNode(true);
    if (!node) return null;
    const payload = {
      assignmentId: completed.assignment.id,
      kind: completed.assignment.kind,
      text: String(text || ''),
      title: document.title,
      url: location.href,
      createdAt: Date.now(),
      responseTerminalAt: Math.max(0, Number(responseTerminalAt || 0)),
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

  function hasActiveThinkingIndicator() {
    return [...document.querySelectorAll('[class*="cadencedShimmer"]')].some((node) => (
      usable(node) && /^thinking(?:\u2026|\.{3})?$/i.test(String(node.innerText || node.textContent || '').trim())
    ));
  }

  function isStreaming() {
    return hasActiveStopControl() || hasActiveThinkingIndicator();
  }

  function turnLivenessNode(create = false) {
    let node = document.getElementById(TURN_LIVENESS_ID);
    if (!node && create && document.documentElement) {
      node = document.createElement('meta');
      node.id = TURN_LIVENESS_ID;
      node.hidden = true;
      node.setAttribute('data-model-fleet-turn-liveness', '1');
      document.documentElement.appendChild(node);
    }
    return node;
  }

  function readTurnLivenessState() {
    const raw = turnLivenessNode(false)?.getAttribute('data-payload');
    if (!raw) return null;
    try {
      const value = JSON.parse(raw);
      return value && typeof value === 'object' ? value : null;
    } catch {
      return null;
    }
  }

  function latestTurnProgressText() {
    const thinking = [...document.querySelectorAll('[class*="cadencedShimmer"]')].find((node) => (
      usable(node) && /^thinking(?:\u2026|\.{3})?$/i.test(String(node.innerText || node.textContent || '').trim())
    ));
    let current = thinking;
    while (current && current !== document.body) {
      const text = String(current.innerText || current.textContent || '').replace(/\s+/g, ' ').trim();
      if (text.length >= 120) return text;
      current = current.parentElement;
    }
    const turns = [...document.querySelectorAll('[data-testid^="conversation-turn-"]')];
    const node = turns[turns.length - 1] || latestAssistantNode(true) || latestUserTurnNode();
    return String(node?.innerText || node?.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function sampleTurnLiveness() {
    const observedAt = Date.now();
    const busy = !!active || !!pendingCompletion || isStreaming();
    if (!busy) {
      turnLivenessNode(false)?.remove();
      return {
        busy: false,
        turnHealth: 'idle',
        turnBusySince: 0,
        turnLastProgressAt: 0,
        turnStalledSince: 0,
      };
    }

    const fingerprintNow = fingerprint(latestTurnProgressText());
    const previous = readTurnLivenessState();
    const sameBusyEpoch = previous && Number(previous.turnBusySince) > 0;
    const turnBusySince = sameBusyEpoch ? Number(previous.turnBusySince) : observedAt;
    const progressed = !previous || previous.fingerprint !== fingerprintNow;
    const turnLastProgressAt = progressed
      ? observedAt
      : Math.max(turnBusySince, Number(previous.turnLastProgressAt) || turnBusySince);
    const orphaned = !active && !pendingCompletion;
    const stalledAfter = orphaned ? ORPHAN_TURN_STALLED_MS : OWNED_TURN_STALLED_MS;
    const deadAfter = orphaned ? ORPHAN_TURN_DEAD_MS : OWNED_TURN_DEAD_MS;
    const quietFor = Math.max(0, observedAt - turnLastProgressAt);
    const turnHealth = quietFor >= deadAfter ? 'dead' : quietFor >= stalledAfter ? 'stalled' : 'busy';
    const turnStalledSince = turnHealth === 'busy'
      ? 0
      : (previous?.turnHealth === 'stalled' || previous?.turnHealth === 'dead')
        ? Math.max(turnLastProgressAt, Number(previous.turnStalledSince) || observedAt)
        : observedAt;
    const payload = {
      fingerprint: fingerprintNow,
      turnHealth,
      turnBusySince,
      turnLastProgressAt,
      turnStalledSince,
      orphaned,
      observedAt,
    };
    turnLivenessNode(true)?.setAttribute('data-payload', JSON.stringify(payload));
    return { busy: true, turnHealth, turnBusySince, turnLastProgressAt, turnStalledSince };
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

  function connectorMention(editor) {
    const verifier = globalThis.ModelFleetConnectorAttachment;
    if (verifier) return verifier.realConnectorMention(editor);
    return editor?.querySelector('[app-mention-name="chatgpt-mcp-tunnel"][app-mention-path="app://asdk_app_6aa34c5f8468819180eea22fb7808dd9"]') || null;
  }

  function connectorAttachmentPresent(editor = findComposer()) {
    return !!connectorMention(editor);
  }

  async function ensureConnectorAttached(timeoutMs = 8000) {
    const editor = await waitForComposer(timeoutMs);
    if (!editor) return false;
    if (connectorAttachmentPresent(editor)) return true;
    const verifier = globalThis.ModelFleetConnectorAttachment;
    return !!verifier?.ensureConnectorAttached
      && await verifier.ensureConnectorAttached(document, timeoutMs);
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

  function composerEndsWith(editor, expectedSuffix) {
    const current = canonicalComposerText(composerText(editor));
    const expected = canonicalComposerText(expectedSuffix);
    return !!expected && current.endsWith(expected);
  }

  async function waitForComposerSuffix(editor, expectedSuffix, timeoutMs = COMPOSER_CHUNK_SETTLE_TIMEOUT_MS) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      const currentEditor = findComposer() || editor;
      if (composerEndsWith(currentEditor, expectedSuffix)) return true;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    return composerEndsWith(findComposer() || editor, expectedSuffix);
  }

  function nextComposerChunk(source, offset, maxChars = COMPOSER_CHUNK_CHARS) {
    let end = Math.min(source.length, offset + maxChars);
    if (end < source.length) {
      const previous = source.charCodeAt(end - 1);
      const next = source.charCodeAt(end);
      if (previous >= 0xD800 && previous <= 0xDBFF && next >= 0xDC00 && next <= 0xDFFF) end -= 1;
    }
    return source.slice(offset, end);
  }

  async function appendComposerText(editor, text) {
    const source = String(text || '');
    if (!source) return true;
    if (composerEndsWith(editor, source)) return true;

    let appended = '';
    for (let offset = 0; offset < source.length;) {
      const chunk = nextComposerChunk(source, offset);
      if (!chunk) return false;
      const currentEditor = findComposer() || editor;
      if (!currentEditor?.isConnected) return false;
      currentEditor.focus();
      placeCaretAtComposerEnd(currentEditor);
      try {
        document.execCommand('insertText', false, chunk);
      } catch {
      }
      currentEditor.dispatchEvent(new InputEvent('input', {
        bubbles: true,
        inputType: 'insertText',
        data: chunk,
      }));
      appended += chunk;
      if (!(await waitForComposerSuffix(currentEditor, appended))) return false;
      const reconciledEditor = findComposer() || currentEditor;
      if (!connectorAttachmentPresent(reconciledEditor)) return false;
      offset += chunk.length;
    }
    const finalEditor = findComposer() || editor;
    return composerEndsWith(finalEditor, source) && connectorAttachmentPresent(finalEditor);
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

  function assistantSnapshotFollowsLatestUserTurn(snapshot) {
    const user = latestUserTurnNode();
    const assistant = snapshot?.node || null;
    if (!user || !assistant || user === assistant) return false;
    try {
      return (user.compareDocumentPosition(assistant) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
    } catch {
      return false;
    }
  }

  function recoveredResponseBelongsToAssignment(assignment, snapshot) {
    return assignmentPromptObserved(assignment)
      && assistantSnapshotFollowsLatestUserTurn(snapshot)
      && String(snapshot?.text || '').trim().length > 0;
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
    if (/\[\s*FLEET_STATUS\b[^\]]*?\bstate\s*=\s*(?:"(?:done|blocked)"|'(?:done|blocked)'|(?:done|blocked))\s*\][\s\S]*?\[\s*\/\s*FLEET_STATUS\s*\]\s*$/i.test(source)) {
      return true;
    }
    return /(?:^|\n)\s*FLEET_STATUS\s*\{[\s\S]*?"state"\s*:\s*"(?:done|completed|blocked)"[\s\S]*?\}\s*$/i.test(source);
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

  function waitForSendButton(timeoutMs) {
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

  async function injectPrompt(text, sendReadyTimeoutMs) {
    const editor = await waitForComposer();
    if (!editor) throw new Error('ChatGPT prompt composer was not found');

    const connectorHelper = globalThis.ModelFleetConnectorAttachment;
    if (!connectorHelper?.connectorAttachmentPresent) {
      throw new Error('chatgpt-mcp-tunnel attachment helper is unavailable');
    }
    if (!(await ensureConnectorAttached())) {
      throw new Error('Required chatgpt-mcp-tunnel app attachment could not be proven; refusing to send without it.');
    }

    const existing = normalizedComposerText(composerText(editor));
    const mention = connectorMention(editor);
    const mentionText = normalizedComposerText(mention?.innerText || mention?.textContent || 'chatgpt-mcp-tunnel');
    const composerOnlyHasConnector = !existing
      || canonicalComposerText(existing) === canonicalComposerText(mentionText)
      || canonicalComposerText(existing) === 'chatgpt-mcp-tunnel';
    if (!composerEndsWith(editor, text)) {
      if (!composerOnlyHasConnector) {
        throw new Error('ChatGPT composer already contains different user text; refusing to append fleet work');
      }
      if (!(await appendComposerText(editor, `\n\n${text}`))) {
        throw new Error('ChatGPT app attachment was present, but the complete worker text could not be appended');
      }
    }
    if (!connectorAttachmentPresent(editor) || !composerEndsWith(editor, text)) {
      throw new Error('ChatGPT composer failed final attachment/payload verification; refusing to click Send');
    }

    const sendButton = await waitForSendButton(sendReadyTimeoutMs);
    if (!sendButton || !usable(sendButton) || !enabledButton(sendButton)) {
      throw new Error('ChatGPT composer accepted the text, but the Send button never became enabled');
    }

    const baseline = latestAssistantSnapshot(true);
    const sentAt = Date.now();
    sendButton.click();
    return { baseline, baselineText: baseline.text, sentAt };
  }

  function stopResponseMonitor() {
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

  function stopMonitor() {
    stopResponseMonitor();
    if (monitorHardTimeoutTimer !== null) {
      clearTimeout(monitorHardTimeoutTimer);
      monitorHardTimeoutTimer = null;
    }
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

  function armHardAssignmentTimeout() {
    if (!active || monitorHardTimeoutTimer !== null) return;
    const assignmentId = active.assignment.id;
    const startedAt = Number(active.acceptedAt || active.sentAt || Date.now());
    const remaining = Math.max(0, HARD_ASSIGNMENT_TIMEOUT_MS - (Date.now() - startedAt));
    monitorHardTimeoutTimer = setTimeout(() => {
      monitorHardTimeoutTimer = null;
      if (!active || active.assignment.id !== assignmentId) return;
      cancelCurrent(AUTO_RECOVERY_REASON_PREFIX + 'hard 15-minute assignment limit exceeded').catch((error) => {
        console.warn('[model-fleet] hard assignment timeout cancellation failed', error);
      });
    }, remaining);
  }

  function startMonitor() {
    stopResponseMonitor();
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

    monitorWatchdogTimer = setInterval(() => {
      requestMonitorCheck();
    }, WATCHDOG_INTERVAL_MS);
    armHardAssignmentTimeout();
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
      responseTerminalAt: Math.max(0, Number(payload.responseTerminalAt || 0)),
    });
    if (response?.ok === false) {
      const error = new Error(response.error || 'completion report rejected');
      error.fleetResponse = response;
      throw error;
    }
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
      const rejection = error?.fleetResponse;
      if (rejection?.terminal === true
        && rejection?.code === 'assignment_ownership_mismatch'
        && rejection?.expectedAssignmentId == null) {
        clearCompletionHandoff(payload.assignmentId);
        signalIdleReady(payload.assignmentId);
        return true;
      }
      if (extensionContextInvalidated(error)) retireInvalidatedBridge();
      return false;
    }
  }

  async function finishActive(text) {
    if (!active) return;
    const completed = active;
    const responseTerminalAt = Date.now();
    const payload = {
      assignmentId: completed.assignment.id,
      kind: completed.assignment.kind,
      text: String(text || ''),
      title: document.title,
      url: location.href,
      createdAt: 0,
      responseTerminalAt,
    };
    // Keep assignment identity visible to heartbeats until the background
    // acknowledges completion. Otherwise a heartbeat can race the completion
    // RPC and make durable custody release/requeue work prematurely.
    pendingCompletion = payload;
    active = null;
    clearAssignmentRecoveryHint(completed.assignment.id);
    stopMonitor();
    try {
      await reportCompletionPayload(payload);
      hideTransportResponse(payload.text);
      clearCompletionHandoff(payload.assignmentId);
      signalIdleReady(payload.assignmentId);
    } catch (error) {
      const rejection = error?.fleetResponse;
      if (rejection?.terminal === true
        && rejection?.code === 'assignment_ownership_mismatch'
        && rejection?.expectedAssignmentId == null) {
        clearCompletionHandoff(payload.assignmentId);
        signalIdleReady(payload.assignmentId);
        return;
      }
      writeCompletionHandoff(completed, text, responseTerminalAt);
      if (extensionContextInvalidated(error)) {
        retireInvalidatedBridge();
        return;
      }
      console.warn('[model-fleet] completion deferred for retry', error);
    }
  }

  async function monitorActive() {
    if (!active || active.phase !== 'running') return;
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
          if (!active.explicitTerminal) scheduleMonitorSettleCheck();
        }
      }
    }

    // Never release the worker while ChatGPT still exposes an active response
    // signal (Stop control or Thinking shimmer). Long tool/model turns can
    // legitimately remain active for many minutes.
    if (streaming) return;

    if (active.recoveredAfterExtensionReload && active.sawStreaming && !active.responseChanged) {
      const recoveredSnapshot = latestAssistantSnapshot(true);
      if (recoveredResponseBelongsToAssignment(active.assignment, recoveredSnapshot)) {
        active.lastFingerprint = recoveredSnapshot.fingerprint;
        active.lastText = recoveredSnapshot.text;
        active.lastChangeAt = nowAt;
        active.lastProgressAt = nowAt;
        active.responseChanged = true;
        active.explicitTerminal = hasFleetTerminalMarker(recoveredSnapshot.text);
      }
    }

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

    // The hard 15-minute timer is independent of streaming/progress state.
    // It stops a stuck ChatGPT turn and routes it through bounded recovery.
  }

  async function prepareAndSendActive(assignmentId) {
    const current = active;
    if (!current || current.assignment.id !== assignmentId || current.phase !== 'preparing') return;
    try {
      const remaining = Math.max(1, HARD_ASSIGNMENT_TIMEOUT_MS - (Date.now() - current.acceptedAt));
      const sent = await injectPrompt(current.assignment.prompt, remaining);
      if (!active || active.assignment.id !== assignmentId || active.phase !== 'preparing') return;

      latestAssistantNodeCache = null;
      active.phase = 'running';
      active.sentAt = sent.sentAt;
      active.baselineFingerprint = sent.baseline.fingerprint;
      active.lastFingerprint = sent.baseline.fingerprint;
      active.lastText = sent.baselineText;
      active.lastChangeAt = sent.sentAt;
      active.lastProgressAt = sent.sentAt;
      active.textDirty = true;
      startMonitor();
    } catch (error) {
      if (!active || active.assignment.id !== assignmentId) return;
      await cancelCurrent(AUTO_RECOVERY_REASON_PREFIX + 'pre-send preparation failed: ' + String(error));
    }
  }

  async function recoverAssignment(assignment) {
    if (!assignment?.id || !assignment.prompt) throw new Error('invalid recovery assignment');
    if (pendingCompletion?.assignmentId === assignment.id) {
      registered = true;
      startHeartbeat();
      return { assignmentId: assignment.id, reattached: true, recoveringCompletion: true };
    }
    if (active) {
      if (active.assignment.id === assignment.id) {
        registered = true;
        startHeartbeat();
        return { assignmentId: assignment.id, reattached: true, alreadyActive: true };
      }
      throw new Error('worker already has assignment ' + active.assignment.id);
    }

    const streaming = isStreaming();
    const promptObserved = assignmentPromptObserved(assignment);
    if (!streaming && !promptObserved) {
      return {
        assignmentId: assignment.id,
        reattached: false,
        reason: 'assignment prompt was not observed in the current ChatGPT conversation',
      };
    }

    const attachedAt = Date.now();
    const baseline = latestAssistantSnapshot(true);
    const currentResponseProven = !streaming && recoveredResponseBelongsToAssignment(assignment, baseline);
    active = {
      assignment,
      phase: 'running',
      acceptedAt: Number(assignment.startedAt || attachedAt),
      sentAt: Number(assignment.startedAt || attachedAt),
      baselineFingerprint: baseline.fingerprint,
      lastFingerprint: baseline.fingerprint,
      lastText: baseline.text,
      lastChangeAt: attachedAt,
      lastProgressAt: attachedAt,
      sawStreaming: streaming,
      textDirty: true,
      responseChanged: currentResponseProven,
      explicitTerminal: currentResponseProven && hasFleetTerminalMarker(baseline.text),
      recoveredAfterExtensionReload: true,
    };
    registered = true;
    clearAssignmentRecoveryHint(assignment.id);
    startHeartbeat();
    startMonitor();
    return {
      assignmentId: assignment.id,
      reattached: true,
      streaming,
      promptObserved,
    };
  }

  async function executeAssignment(assignment) {
    if (!assignment?.id || !assignment.prompt) throw new Error('invalid assignment');
    if (active) throw new Error(`worker already has assignment ${active.assignment.id}`);
    if (pendingCompletion) throw new Error(`worker is recovering completion ${pendingCompletion.assignmentId}`);

    const acceptedAt = Date.now();
    active = {
      assignment,
      phase: 'preparing',
      acceptedAt,
      sentAt: 0,
      baselineFingerprint: '',
      lastFingerprint: '',
      lastText: '',
      lastChangeAt: acceptedAt,
      lastProgressAt: acceptedAt,
      sawStreaming: false,
      textDirty: false,
      responseChanged: false,
      explicitTerminal: false,
    };
    registered = true;
    startHeartbeat();
    armHardAssignmentTimeout();
    prepareAndSendActive(assignment.id).catch((error) => {
      console.warn('[model-fleet] assignment preparation failed', error);
    });
    return { assignmentId: assignment.id, phase: 'preparing' };
  }

  async function cancelCurrent(reason = 'cancelled', expectedAssignmentId) {
    if (!active) return expectedAssignmentId === undefined ? undefined : { ok: true, noOp: true, code: 'stale-no-active-assignment' };
    if (expectedAssignmentId !== undefined && expectedAssignmentId !== active.assignment.id) {
      return { ok: false, noOp: true, code: 'assignment-ownership-mismatch', expectedAssignmentId, activeAssignmentId: active.assignment.id };
    }
    const cancelled = active;
    active = null;
    clearAssignmentRecoveryHint(cancelled.assignment.id);
    stopMonitor();

    const stopButton = document.querySelector(
      '#composer-submit-button[data-testid="stop-button"], '
      + '#composer-submit-button[data-testid*="stop" i], '
      + '#composer-submit-button[aria-label*="stop" i], '
      + 'button[data-testid="stop-button"]'
    ) || [...document.querySelectorAll('button')].find((button) => {
      const label = button.getAttribute('aria-label') || button.textContent || '';
      return usable(button) && /^\s*stop\b/i.test(label);
    });
    if (stopButton && usable(stopButton) && enabledButton(stopButton)) stopButton.click();

    try {
      const response = await runtimeMessage({
        type: 'fleet:assignment-cancelled',
        assignmentId: cancelled.assignment.id,
        reason,
      });
      signalIdleReady(cancelled.assignment.id);
      return { ok: response?.ok !== false, assignmentId: cancelled.assignment.id, cancelled: true };
    } catch {
      // Keep the worker live if cancellation authority was not acknowledged.
      return { ok: false, assignmentId: cancelled.assignment.id, cancelled: true };
    }
  }

  function markRegistrationLost() {
    registered = false;
    registrationRetryAt = 0;
  }

  async function ensureRegistered(force = false) {
    if (!registrationEnabled) return false;
    if (registered) return true;
    const observedAt = Date.now();
    if (!force && observedAt < registrationRetryAt) return false;
    if (registrationRetryPromise) return registrationRetryPromise;
    registrationRetryPromise = (async () => {
      const ok = await hello();
      if (ok) {
        registrationRetryAt = 0;
        registrationRetryDelayMs = REGISTRATION_RETRY_BASE_MS;
        return true;
      }
      registrationRetryAt = Date.now() + registrationRetryDelayMs;
      registrationRetryDelayMs = Math.min(REGISTRATION_RETRY_MAX_MS, registrationRetryDelayMs * 2);
      return false;
    })();
    try {
      return await registrationRetryPromise;
    } finally {
      registrationRetryPromise = null;
    }
  }

  async function heartbeat() {
    if (!registrationEnabled) return;
    if (!registered && !(await ensureRegistered())) return;
    if (pendingCompletion) {
      const recovered = await recoverPendingCompletion();
      if (!recovered || pendingCompletion) return;
    }
    try {
      const liveness = sampleTurnLiveness();
      const response = await runtimeMessage({
        type: 'fleet:worker-heartbeat',
        ...liveness,
        activeAssignmentId: active?.assignment.id || pendingCompletion?.assignmentId || null,
        title: document.title,
        url: location.href,
      });
      if (!response?.ok || response?.registered === false) markRegistrationLost();
    } catch {
      // Service worker may be waking/restarting; next heartbeat retries without
      // discarding the last proven registration identity.
    }
  }

  function startHeartbeat() {
    if (heartbeatTimer !== null || !registrationEnabled) return;
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
      const liveness = sampleTurnLiveness();
      sendResponse({ ok: true, registered, registeredWorkerId, ...liveness, activeAssignmentId: active?.assignment.id || pendingCompletion?.assignmentId || null });
      return false;
    }

    if (message.type === 'fleet:ensure-registration') {
      ensureRegistered(true)
        .then((ok) => {
          const liveness = sampleTurnLiveness();
          sendResponse({ ok, registered, registeredWorkerId, ...liveness, activeAssignmentId: active?.assignment.id || pendingCompletion?.assignmentId || null });
        })
        .catch((error) => sendResponse({ ok: false, registered: false, error: String(error) }));
      return true;
    }

    if (message.type === 'fleet:execute-assignment') {
      executeAssignment(message.assignment)
        .then((result) => sendResponse({ ok: true, ...result }))
        .catch((error) => sendResponse({ ok: false, error: String(error) }));
      return true;
    }

    if (message.type === 'fleet:recover-assignment') {
      recoverAssignment(message.assignment)
        .then((result) => sendResponse({ ok: true, ...result }))
        .catch((error) => sendResponse({ ok: false, error: String(error) }));
      return true;
    }

    if (message.type === 'fleet:cancel-current') {
      cancelCurrent(message.reason || 'cancelled', Object.prototype.hasOwnProperty.call(message, 'expectedAssignmentId') ? message.expectedAssignmentId : undefined)
        .then((result) => sendResponse(result === undefined ? { ok: true } : result))
        .catch((error) => sendResponse({ ok: false, error: String(error) }));
      return true;
    }

    if (message.type === 'fleet:registration-changed') {
      if (message.registered === true) {
        registrationEnabled = true;
        registrationRetryAt = 0;
        registrationRetryDelayMs = REGISTRATION_RETRY_BASE_MS;
        const hasExpected = Object.prototype.hasOwnProperty.call(message, 'expectedWorkerId');
        const expectedWorkerId = hasExpected ? String(message.expectedWorkerId || '') : '';
        if (hasExpected && registeredWorkerId !== null && registeredWorkerId !== expectedWorkerId) {
          sendResponse({ ok: true, noOp: true, code: 'registration-identity-conflict', registeredWorkerId });
          return false;
        }
        registered = true;
        if (hasExpected) registeredWorkerId = expectedWorkerId;
        else if (message.worker?.id) registeredWorkerId = String(message.worker.id);
        recoverPendingCompletion().finally(() => startHeartbeat());
      } else {
        registrationEnabled = false;
        const hasExpected = Object.prototype.hasOwnProperty.call(message, 'expectedWorkerId');
        if (hasExpected && registeredWorkerId !== String(message.expectedWorkerId || '')) {
          sendResponse({ ok: true, noOp: true, code: 'registration-identity-mismatch', registeredWorkerId });
          return false;
        }
        registered = false;
        registeredWorkerId = null;
        stopHeartbeat();
      }
      sendResponse({ ok: true });
      return false;
    }

    return false;
  });

  async function hello() {
    try {
      const liveness = sampleTurnLiveness();
      const response = await runtimeMessage({
        type: 'fleet:worker-hello',
        ...liveness,
        activeAssignmentId: active?.assignment.id || pendingCompletion?.assignmentId || readAssignmentRecoveryHint() || null,
      });
      const nextRegistered = response?.registered === true;
      const nextWorkerId = nextRegistered && response?.worker?.id ? String(response.worker.id) : null;
      if (nextRegistered && registeredWorkerId && nextWorkerId && registeredWorkerId !== nextWorkerId) {
        registered = false;
        return false;
      }
      registered = nextRegistered;
      if (registered) registeredWorkerId = nextWorkerId || registeredWorkerId;
      return registered;
    } catch {
      registered = false;
      return false;
    }
  }

  window.addEventListener('pagehide', () => {
    stopMonitor();
    stopHeartbeat();
  });

  async function bootstrap() {
    if (pendingCompletion) {
      const recovered = await recoverPendingCompletion();
      if (!recovered && pendingCompletion) {
        startHeartbeat();
        return;
      }
    }
    startHeartbeat();
    await ensureRegistered(true);
  }

  bootstrap();
})();
