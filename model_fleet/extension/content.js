(() => {
  'use strict';

  const runtime = globalThis.chrome?.runtime;
  if (!runtime?.onMessage || typeof runtime.sendMessage !== 'function') {
    console.warn('[approval-hint-wasm] extension runtime unavailable; waiting for reinjection');
    return;
  }

  const BOOTSTRAP_KEY = '__approvalHintWasmContentV1';
  if (globalThis[BOOTSTRAP_KEY]) return;
  globalThis[BOOTSTRAP_KEY] = true;

  const APPROVAL_WAKE_THROTTLE_MS = 100;
  const HIGHLIGHT_ATTR = 'data-approval-hint-wasm';
  const CLICK_DEDUPE_MS = 5000;
  const REPEAT_COOLDOWN_MS = 5000;
  const REPEAT_COMPLETION_SETTLE_MS = 1500;
  const FINAL_IDLE_STABILITY_MS = 4000;
  const COMPOSER_READY_TIMEOUT_MS = 20000;
  const SEND_READY_TIMEOUT_MS = 5000;
  const TURN_SIGNAL_CACHE_MS = 500;
  const streamRetryApi = globalThis.ApprovalStreamRetry;
  const streamRetryController = streamRetryApi?.createController();
  const deliveryTimeoutRetryController = streamRetryApi?.createResendController?.();
  let retryExhaustionLoggedFor = '';
  let deliveryTimeoutExhaustionLoggedFor = '';
  const TURN_INTERRUPTION_RE = /\b(?:connection interrupted|waiting for (?:the )?complete answer)\b/i;
  const TURN_FAILURE_RE = /\b(?:something went wrong|network error|message delivery timed out|there was an error generating (?:a )?response|error generating (?:a )?response)\b/i;
  let wasmExports = null;
  let wasmPromise = null;
  let tabEnabled = false;
  let autoApprove = true;
  let autoScroll = true;
  let autoRetry = false;
  let lastClick = { key: '', at: 0 };
  let repeatMessageEnabled = false;
  let repeatMessage = '';
  let repeatMessageMode = 'forever';
  let repeatMessageCount = 1;
  let repeatMessageSent = 0;
  let repeatRestartEnabled = false;
  let repeatRestartMode = 'new_chat';
  let repeatRestartPending = false;
  let repeatBootstrapPending = false;
  let wasStreaming = false;
  let repeatPending = false;
  let repeatAssistantFingerprint = '';
  let repeatAssistantChangedAt = 0;
  let repeatTurnObservedAt = 0;
  let repeatUiCompletionAt = 0;
  let repeatResponseObserved = false;
  let repeatCompletionProven = false;
  let repeatIdleSince = 0;
  let lastRepeatSent = 0;
  let repeatTurnSignal = { available: false };
  let repeatTurnSignalAt = 0;
  let repeatFailureKey = '';
  const assistantTurnNodeIds = new WeakMap();
  let nextAssistantTurnNodeId = 1;
  let eventObserver = null;
  let wakeTimer = null;
  let wakeAt = 0;
  let tickRunning = false;
  let tickQueued = false;

  function runtimeMessage(message) {
    return new Promise((resolve, reject) => {
      try {
        runtime.sendMessage(message, (response) => {
          const error = runtime.lastError;
          if (error) reject(error);
          else resolve(response);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function invalidateRepeatTurnSignal() {
    repeatTurnSignal = { available: false };
    repeatTurnSignalAt = 0;
  }

  async function getRepeatTurnSignal(force = false) {
    const now = Date.now();
    if (!force && repeatTurnSignalAt > 0 && now - repeatTurnSignalAt < TURN_SIGNAL_CACHE_MS) {
      return repeatTurnSignal;
    }

    try {
      const response = await runtimeMessage({ type: 'approval:get-turn-signal' });
      repeatTurnSignal = response?.ok && response.signal
        ? response.signal
        : { available: false, queryFailed: true };
    } catch {
      repeatTurnSignal = { available: false, queryFailed: true };
    }
    repeatTurnSignalAt = now;
    return repeatTurnSignal;
  }

  function applyTabState(state = {}) {
    const wasRepeatEnabled = repeatMessageEnabled;
    tabEnabled = state.enabled === true;
    autoApprove = state.autoApprove !== false;
    autoScroll = state.autoScroll !== false;
    autoRetry = state.autoRetry === true;
    repeatMessageEnabled = state.repeatMessageEnabled === true;
    repeatMessage = typeof state.repeatMessage === 'string' ? state.repeatMessage : '';
    repeatMessageMode = state.repeatMessageMode === 'count' ? 'count' : 'forever';
    repeatMessageCount = Math.max(1, Math.trunc(Number(state.repeatMessageCount) || 1));
    repeatMessageSent = Math.max(0, Math.trunc(Number(state.repeatMessageSent) || 0));
    repeatRestartEnabled = state.repeatRestartEnabled === true && repeatMessageMode === 'count';
    repeatRestartMode = 'new_chat';
    repeatRestartPending = state.repeatRestartPending === true && repeatRestartEnabled;
    repeatBootstrapPending = state.repeatBootstrapPending === true && repeatRestartEnabled;
    if (!repeatMessageEnabled) {
      repeatPending = false;
      repeatResponseObserved = false;
      repeatAssistantFingerprint = '';
      repeatAssistantChangedAt = 0;
      repeatTurnObservedAt = 0;
      repeatUiCompletionAt = 0;
      repeatCompletionProven = false;
      repeatIdleSince = 0;
    } else if (!wasRepeatEnabled || (!repeatResponseObserved && repeatMessageSent === 0 && !repeatBootstrapPending)) {
      // Enabling repeat after a response has already finished must adopt that
      // completed assistant turn instead of waiting forever for a new mutation.
      armRepeatFromCurrentTurn();
    }

    const hasWork = autoApprove || autoScroll || repeatMessageEnabled || autoRetry;
    if (tabEnabled && hasWork) {
      startWatching();
    } else {
      stopWatching();
    }
  }

  async function refreshTabState() {
    try {
      const response = await runtimeMessage({ type: 'approval:get-own-tab-state' });
      if (!response?.ok) throw new Error(response?.error || 'tab state unavailable');
      applyTabState(response.state);
    } catch (error) {
      applyTabState({ enabled: false });
      console.warn('[approval-hint-wasm] tab state read failed; leaving this tab disabled', error);
    }
  }

  runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === 'approval:bridge-ping') {
      sendResponse({ ok: true });
      return false;
    }
    if (message?.type === 'approval:tab-state-changed') {
      applyTabState(message.state);
      return;
    }
    if (message?.type === 'approval:send-message-now') {
      sendMessageNow(String(message.text || ''), true)
        .then((sent) => sendResponse(sent
          ? { ok: true }
          : { ok: false, error: 'Message could not be sent from the current ChatGPT state.' }))
        .catch((error) => sendResponse({ ok: false, error: String(error) }));
      return true;
    }
  });

  function fallbackScorer() {
    return {
      approval_hint_score(sameRow, enabledValue, primary, rightOfDeny, denyLabelMatch, labelKindValue, distanceTimes100, rowTextLen) {
        if (!sameRow || !enabledValue || !denyLabelMatch) return -10000;
        if (labelKindValue === 2) return -10000;
        let score = 1000;
        if (primary) score += 500;
        if (rightOfDeny) score += 300;
        if (labelKindValue === 1) score += 250;
        score -= Math.floor(distanceTimes100 / 100);
        if (rowTextLen > 800) score -= 200;
        else if (rowTextLen > 400) score -= 75;
        return score;
      },
      approval_hint_threshold() {
        return 800;
      },
    };
  }

  function loadWasm() {
    if (wasmExports) return Promise.resolve(wasmExports);
    if (wasmPromise) return wasmPromise;
    wasmPromise = (async () => {
      try {
        const url = runtime.getURL('approval_hint_wasm.wasm');
        const response = await fetch(url);
        if (!response.ok) throw new Error(`wasm fetch failed: ${response.status} ${response.statusText}`);
        const bytes = await response.arrayBuffer();
        const instance = await WebAssembly.instantiate(bytes, {});
        wasmExports = instance.instance.exports;
        return wasmExports;
      } catch (error) {
        console.warn('[approval-hint-wasm] wasm load failed; using JS fallback scorer', error);
        wasmExports = fallbackScorer();
        return wasmExports;
      }
    })();
    return wasmPromise;
  }

  function usable(el) {
    if (!el) return false;
    const s = window.getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return s.display !== 'none'
      && s.visibility !== 'hidden'
      && s.opacity !== '0'
      && s.pointerEvents !== 'none'
      && r.width > 0
      && r.height > 0;
  }

  function enabledButton(el) {
    return !!el
      && !el.disabled
      && el.getAttribute('aria-disabled') !== 'true'
      && !el.hasAttribute('disabled');
  }

  function inViewport(el) {
    const r = el.getBoundingClientRect();
    return r.top >= 0
      && r.left >= 0
      && r.bottom <= window.innerHeight
      && r.right <= window.innerWidth;
  }

  function requestScroll(el, reason = 'scroll') {
    const target = el?.parentElement || el;
    if (!target) return { scrolled: false, reason: 'missing-target' };

    try {
      target.scrollIntoView({ block: 'center', inline: 'nearest' });
    } catch {
      // Best effort: explicit nudges below cover nested scroll containers.
    }

    const nudge = () => {
      const r = el.getBoundingClientRect();
      const delta = (r.y + r.height / 2) - (window.innerHeight * 0.45);
      if (Math.abs(delta) < 12) return;

      let n = el.parentElement;
      while (n && n !== document.body) {
        const style = window.getComputedStyle(n);
        const scrollable = /(auto|scroll)/.test(style.overflowY) && n.scrollHeight > n.clientHeight;
        if (scrollable) {
          n.scrollBy({ top: delta, behavior: 'instant' });
        }
        n = n.parentElement;
      }

      window.scrollBy({ top: delta, behavior: 'instant' });
    };

    nudge();
    window.requestAnimationFrame(nudge);
    return { scrolled: true, reason };
  }

  function centerDistance(a, b) {
    const ar = a.getBoundingClientRect();
    const br = b.getBoundingClientRect();
    const ax = ar.x + ar.width / 2;
    const ay = ar.y + ar.height / 2;
    const bx = br.x + br.width / 2;
    const by = br.y + br.height / 2;
    return Math.hypot(ax - bx, ay - by);
  }

  function labelOf(el, fallback = '') {
    return (el?.innerText || el?.textContent || el?.getAttribute?.('aria-label') || fallback).trim();
  }

  function labelKind(label) {
    const text = String(label || '').trim().toLowerCase();
    if (/^(deny|cancel|close|reject|dismiss)$/i.test(text)) return 2;
    if (/^(allow|approve|continue|run|yes|ok|okay|confirm|accept|authorize|start)$/i.test(text)) return 1;
    if (/(allow|approve|continue|run|confirm|accept|authorize)/i.test(text)) return 1;
    return 0;
  }

  function clearHighlights() {
    for (const el of document.querySelectorAll(`[${HIGHLIGHT_ATTR}]`)) {
      el.removeAttribute(HIGHLIGHT_ATTR);
      el.style.outline = el.dataset.approvalHintOldOutline || '';
      el.style.boxShadow = el.dataset.approvalHintOldBoxShadow || '';
      el.style.position = el.dataset.approvalHintOldPosition || '';
      delete el.dataset.approvalHintOldOutline;
      delete el.dataset.approvalHintOldBoxShadow;
      delete el.dataset.approvalHintOldPosition;
    }
    for (const badge of document.querySelectorAll('.approval-hint-wasm-badge')) badge.remove();
  }

  function clickApprovalButton(pos) {
    const now = Date.now();
    if (lastClick.key === pos.key && now - lastClick.at < CLICK_DEDUPE_MS) return false;

    lastClick = { key: pos.key, at: now };
    pos.button.focus({ preventScroll: true });
    pos.button.click();
    console.info('[approval-hint-wasm] clicked approval candidate', {
      label: pos.label,
      score: pos.score,
    });
    return true;
  }

  // Ported from router-server/src/browser/auto-approve.mjs APPROVE_POS_JS.
  async function findApprovalPositionCandidate() {
    const wasm = await loadWasm();
    const denys = [...document.querySelectorAll('button')]
      .filter((b) => labelOf(b) === 'Deny' && usable(b))
      .sort((a, b) => b.getBoundingClientRect().y - a.getBoundingClientRect().y);

    if (!denys.length) return null;

    for (const deny of denys) {
      if (!inViewport(deny)) {
        if (autoScroll) {
          return requestScroll(deny);
        }
        continue;
      }

      const denyRect = deny.getBoundingClientRect();
      const directRowButtons = [...(deny.parentElement?.children || [])]
        .filter((el) => el.tagName === 'BUTTON' && el !== deny && usable(el) && enabledButton(el));

      const sameRow = directRowButtons
        .filter((b) => {
          const r = b.getBoundingClientRect();
          const dy = Math.abs((r.y + r.height / 2) - (denyRect.y + denyRect.height / 2));
          return dy <= Math.max(24, denyRect.height) && inViewport(b);
        })
        .sort((a, b) => {
          const ap = String(a.className || '').includes('btn-primary') ? 0 : 1;
          const bp = String(b.className || '').includes('btn-primary') ? 0 : 1;
          const ar = a.getBoundingClientRect();
          const br = b.getBoundingClientRect();
          const ax = ar.x + ar.width / 2;
          const bx = br.x + br.width / 2;
          const aRight = ax > denyRect.x + denyRect.width / 2 ? 0 : 1;
          const bRight = bx > denyRect.x + denyRect.width / 2 ? 0 : 1;
          return ap - bp || aRight - bRight || centerDistance(a, deny) - centerDistance(b, deny);
        });

      if (!sameRow.length) continue;

      const btn = sameRow[0];
      const r = btn.getBoundingClientRect();
      if (!inViewport(btn)) {
        if (autoScroll) {
          return requestScroll(btn);
        }
        continue;
      }

      const x = r.x + r.width / 2;
      const y = r.y + r.height / 2;
      if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) {
        if (autoScroll) {
          return requestScroll(btn);
        }
        continue;
      }

      const hit = document.elementFromPoint(x, y);
      const hitButton = hit && hit.closest && hit.closest('button');
      const label = labelOf(btn, 'approval');
      if (hitButton !== btn) {
        const blockedBy = hitButton ? labelOf(hitButton) : (hit ? String(hit.tagName || '') : 'none');
        if (autoScroll) {
          return {
            ...requestScroll(btn, 'blocked'),
            blocked: true,
            label,
            blockedBy,
          };
        }
        return { blocked: true, label, blockedBy };
      }

      const rowText = (deny.parentElement?.innerText || '').trim().replace(/\s+/g, ' ');
      const key = [label, Math.round(denyRect.x), Math.round(denyRect.y), Math.round(r.x), Math.round(r.y), rowText].join('|');
      const distance = centerDistance(btn, deny);
      const score = wasm.approval_hint_score(
        1,
        enabledButton(btn) ? 1 : 0,
        String(btn.className || '').includes('btn-primary') ? 1 : 0,
        x > denyRect.x + denyRect.width / 2 ? 1 : 0,
        labelOf(deny) === 'Deny' ? 1 : 0,
        labelKind(label),
        Math.round(distance * 100),
        rowText.length,
      );

      if (score < wasm.approval_hint_threshold()) return null;
      return { button: btn, label, x, y, key, score };
    }

    return null;
  }

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

  function assistantTurnNodeId(node) {
    if (!node) return 0;
    let id = assistantTurnNodeIds.get(node);
    if (!id) {
      id = nextAssistantTurnNodeId++;
      assistantTurnNodeIds.set(node, id);
    }
    return id;
  }

  function hashText(text) {
    let hash = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function currentAssistantFingerprint() {
    // Legacy/older ChatGPT DOM.
    const nodes = document.querySelectorAll('[data-message-author-role="assistant"]');
    const latest = nodes[nodes.length - 1];
    if (latest) {
      const text = (latest.innerText || latest.textContent || '').trim();
      const id = latest.getAttribute('data-message-id') || latest.id || '';
      return 'legacy:' + nodes.length + ':' + id + ':' + text.length + ':' + hashText(text);
    }

    // Current ChatGPT DOM (2026): assistant/user role attributes and
    // conversation-turn testids are absent. The durable end-of-turn boundary is
    // the assistant action row. User action rows live under *user-message* and
    // use "Copy message"; assistant rows are outside that subtree and expose
    // "Copy"/feedback actions.
    const row = latestAssistantActionRow();
    if (!row) return '0::0:0';
    const turn = row.parentElement || row;
    const text = (turn.innerText || turn.textContent || '').trim();
    return 'actions:' + assistantTurnNodeId(row) + ':' + text.length + ':' + hashText(text);
  }

  function resetRepeatObservation() {
    repeatAssistantFingerprint = currentAssistantFingerprint();
    repeatAssistantChangedAt = 0;
    repeatTurnObservedAt = 0;
    repeatUiCompletionAt = 0;
    repeatResponseObserved = false;
    repeatCompletionProven = false;
    repeatIdleSince = 0;
    repeatFailureKey = '';
    invalidateRepeatTurnSignal();
  }

  function armRepeatFromCurrentTurn() {
    resetRepeatObservation();
    if (repeatAssistantFingerprint === '0::0:0') return;

    const now = Date.now();
    repeatAssistantChangedAt = now;
    repeatTurnObservedAt = now;
    repeatResponseObserved = true;
    repeatIdleSince = now;
    if (!currentTurnFailureSignal() && hasNativeFinalTurnActions() && hasReadyComposerForNextTurn()) {
      // Adoption path: repeat may be enabled after a turn already completed, so
      // there is no future aria-live "response complete" mutation to observe.
      repeatUiCompletionAt = now;
    }
    requestTick(FINAL_IDLE_STABILITY_MS + 50);
  }

  function observeAssistantOutput() {
    const next = currentAssistantFingerprint();
    if (!repeatAssistantFingerprint) {
      repeatAssistantFingerprint = next;
      return false;
    }
    if (next === repeatAssistantFingerprint) return false;
    repeatAssistantFingerprint = next;
    const changedAt = Date.now();
    repeatAssistantChangedAt = changedAt;
    if (!repeatTurnObservedAt) repeatTurnObservedAt = changedAt;
    repeatResponseObserved = true;
    // Any new assistant output invalidates completion evidence from an earlier
    // segment. This is the key guard against sending between tool phases.
    repeatUiCompletionAt = 0;
    repeatCompletionProven = false;
    repeatFailureKey = '';
    invalidateRepeatTurnSignal();
    return true;
  }

  function observeUiCompletion(mutations) {
    if (!repeatMessageEnabled) return;
    for (const mutation of mutations) {
      const candidates = [];
      const target = mutation.target?.nodeType === Node.ELEMENT_NODE
        ? mutation.target
        : mutation.target?.parentElement;
      if (target) candidates.push(target);
      for (const node of mutation.addedNodes || []) {
        if (node.nodeType === Node.ELEMENT_NODE) candidates.push(node);
        else if (node.parentElement) candidates.push(node.parentElement);
      }
      for (const node of candidates) {
        const live = node.closest?.('[aria-live], [role="status"]')
          || node.querySelector?.('[aria-live], [role="status"]');
        const text = (live?.innerText || live?.textContent || '').trim();
        if (/response complete/i.test(text)) {
          repeatUiCompletionAt = Date.now();
          requestTick(0);
          return;
        }
      }
    }
  }

  function latestAssistantTurn() {
    // Legacy/older ChatGPT DOM.
    const assistants = document.querySelectorAll('[data-message-author-role="assistant"]');
    const latest = assistants[assistants.length - 1];
    if (latest) {
      return latest.closest('[data-testid^="conversation-turn-"], [data-testid*="conversation-turn"]')
        || latest.closest('article')
        || latest.parentElement;
    }

    // Current ChatGPT DOM: the assistant completion row is a child of the
    // completed assistant turn container.
    const row = latestAssistantActionRow();
    return row?.parentElement || row || null;
  }

  function currentStreamErrorBanner() {
    return streamRetryApi?.findStreamError(document, { usable, latestTurn: latestAssistantTurn() }) || null;
  }

  function currentDeliveryTimeoutBanner() {
    return streamRetryApi?.findDeliveryTimeout(document, { usable, latestTurn: latestAssistantTurn() }) || null;
  }

  function currentTurnFailureSignal() {
    if (currentStreamErrorBanner()) return { state: 'failed', text: 'Error in message stream' };
    const deliveryTimeout = currentDeliveryTimeoutBanner();
    if (deliveryTimeout) return { state: 'failed', text: deliveryTimeout.text };
    const turn = latestAssistantTurn();
    const candidates = new Set();

    if (turn) {
      for (const node of turn.querySelectorAll('[role="alert"], [role="status"], [aria-live], button')) {
        candidates.add(node);
      }
    }

    // ChatGPT can render interruption/error notices outside the assistant
    // message node. Only consider visible live/status UI at or below the latest
    // turn so an old historical error cannot poison future turns.
    const turnTop = turn?.getBoundingClientRect().top ?? -Infinity;
    for (const node of document.querySelectorAll('[role="alert"], [role="status"], [aria-live]')) {
      if (!usable(node)) continue;
      if (node.closest?.('[data-message-author-role="assistant"]')) continue;
      const rect = node.getBoundingClientRect();
      if (!turn || turn.contains(node) || rect.bottom >= turnTop - 32) candidates.add(node);
    }

    for (const node of candidates) {
      if (!usable(node)) continue;
      if (node.closest?.('[data-message-author-role="assistant"]')) continue;
      const text = labelOf(node).replace(/\s+/g, ' ').trim();
      if (!text) continue;
      if (TURN_INTERRUPTION_RE.test(text)) return { state: 'interrupted', text };
      if (TURN_FAILURE_RE.test(text)) return { state: 'failed', text };
    }
    return null;
  }

  function completionAuthoritySatisfied(signal) {
    // The __browserRouter* globals are optional external evidence: this
    // extension reads them but does not own or produce them. Therefore they
    // cannot be a mandatory positive authority for Repeat. Treat only fresh
    // evidence from the current observed turn as a negative veto.
    if (!signal?.available || signal?.queryFailed) return true;

    const lastFinalTextAt = Number(signal.lastFinalTextAt || 0);
    const lastToolCallAt = Number(signal.lastToolCallAt || 0);
    const lastToolResultAt = Number(signal.lastToolResultAt || 0);
    const latestToolActivityAt = Math.max(
      Number(signal.latestToolActivityAt || 0),
      lastToolCallAt,
      lastToolResultAt,
    );
    const latestTransportEventAt = Math.max(lastFinalTextAt, latestToolActivityAt);

    // Ignore stale router state from an older turn/navigation.
    if (repeatTurnObservedAt > 0 && latestTransportEventAt > 0
      && latestTransportEventAt < repeatTurnObservedAt) {
      return true;
    }

    // Fresh transport evidence may veto an otherwise-complete UI turn.
    if (Number(signal.sseActive || 0) > 0) return false;
    if (latestToolActivityAt > 0 && lastFinalTextAt < latestToolActivityAt) return false;

    return true;
  }

  function hasNativeFinalTurnActions() {
    // Current ChatGPT DOM.
    if (latestAssistantActionRow()) return true;

    // Legacy fallback.
    const turn = latestAssistantTurn();
    if (!turn) return false;
    return !!turn.querySelector(
      '[data-testid="copy-turn-action-button"], '
      + '[data-testid="feedback-turn-action-button"], '
      + '[data-testid*="copy" i][data-testid*="turn" i], '
      + 'button[aria-label*="copy" i], '
      + 'button[aria-label*="good response" i], '
      + 'button[aria-label*="bad response" i]'
    );
  }

  function hasActiveStopControl() {
    const stopButton = document.querySelector(
      '#composer-submit-button[data-testid="stop-button"], '
      + '#composer-submit-button[data-testid*="stop" i], '
      + '#composer-submit-button[aria-label*="stop" i], '
      + 'button[data-testid="stop-button"]'
    );
    return !!stopButton && enabledButton(stopButton);
  }

  function hasReadyComposerForNextTurn() {
    const editor = findComposer();
    if (!editor) return false;
    return !hasActiveStopControl();
  }

  function hasFreshUiCompletionSignal() {
    return repeatUiCompletionAt > 0
      && repeatAssistantChangedAt > 0
      && repeatUiCompletionAt >= repeatAssistantChangedAt;
  }

  function hasStrongUiTurnCompletion(now = Date.now()) {
    if (!repeatResponseObserved || repeatAssistantChangedAt <= 0) return false;
    if (currentTurnFailureSignal()) return false;
    if (!hasNativeFinalTurnActions() && !hasFreshUiCompletionSignal()) return false;
    if (!hasReadyComposerForNextTurn()) return false;
    return now - repeatAssistantChangedAt >= REPEAT_COMPLETION_SETTLE_MS;
  }

  function repeatTurnComplete(now, signal) {
    if (!repeatResponseObserved || repeatAssistantChangedAt <= 0) return false;
    if (currentTurnFailureSignal()) return false;
    if (repeatIdleSince <= 0 || now - repeatIdleSince < FINAL_IDLE_STABILITY_MS) return false;
    if (!hasStrongUiTurnCompletion(now)) return false;
    if (!completionAuthoritySatisfied(signal)) return false;

    repeatCompletionProven = true;
    return true;
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

    // ProseMirror renders plain multiline input as sibling block nodes. innerText
    // may insert browser-dependent extra blank lines between <p> nodes, which
    // made successful writes look different from the requested string.
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

    // ChatGPT's current #prompt-textarea is a ProseMirror EditorView DOM.
    // Replace in one browser editing operation so ProseMirror observes one
    // coherent edit rather than a delete/insert race.
    if (selectComposerContents(editor)) {
      try {
        document.execCommand('insertText', false, text);
      } catch {
        // Fall through to the DOM-observer path below.
      }
      if (await waitForComposerText(editor, text, 450)) return true;
    }

    // Fallback for Chromium builds where execCommand does not update the
    // ProseMirror DOM from an extension isolated world. ProseMirror maintains a
    // DOM observer; mutate to schema-compatible paragraphs, then emit input.
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
        attributeFilter: ['id', 'contenteditable', 'data-id', 'data-placeholder'],
      });
      const timeoutId = setTimeout(() => finish(null), timeoutMs);
    });
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
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['disabled', 'aria-disabled', 'data-testid', 'aria-label'],
      });
      const timeoutId = setTimeout(() => finish(null), timeoutMs);
    });
  }

  function connectorAttachmentPresent() {
    const editor = findComposer();
    const verifier = globalThis.ModelFleetConnectorAttachment;
    return !!editor && (verifier
      ? verifier.connectorAttachmentPresent(editor)
      : !!editor.querySelector('[app-mention-name="chatgpt-mcp-tunnel"][app-mention-path="app://asdk_app_6aa34c5f8468819180eea22fb7808dd9"]'));
  }

  async function ensureConnectorAttached() {
    if (connectorAttachmentPresent()) return true;
    const verifier = globalThis.ModelFleetConnectorAttachment;
    return !!verifier?.ensureConnectorAttached
      && await verifier.ensureConnectorAttached(document);
  }

  async function sendMessageNow(messageText, strict = false) {
    const fail = (message) => {
      if (strict) throw new Error(message);
      return false;
    };

    const text = String(messageText || '');
    const connectorHelper = globalThis.ModelFleetConnectorAttachment;
    if (!connectorHelper?.requiresConnector) {
      return fail('chatgpt-mcp-tunnel attachment helper is unavailable.');
    }
    if (connectorHelper.requiresConnector(text) && !(await ensureConnectorAttached())) {
      return fail('Required chatgpt-mcp-tunnel attachment is missing; refusing to send text-only connector instructions.');
    }
    const trimmed = normalizedComposerText(text);
    if (!trimmed) return fail('Message is empty.');

    const editor = await waitForComposer();
    if (!editor) return fail('ChatGPT composer was not found.');

    const existing = normalizedComposerText(composerText(editor));
    if (existing && !composerTextMatches(editor, text)) {
      return fail('ChatGPT composer already contains different user text; refusing to overwrite it.');
    }

    if (!existing) {
      const written = await writeComposerText(editor, text);
      if (!written) {
        return fail('ChatGPT rejected the programmatic composer write (ProseMirror did not accept the text).');
      }
    }

    const sendBtn = await waitForSendButton();
    if (!sendBtn || !usable(sendBtn) || !enabledButton(sendBtn)) {
      return fail('ChatGPT composer accepted the text, but the Send button never became enabled.');
    }

    // For an explicit popup send, the live visible/enabled Send control is the
    // commit authority. A stale hidden Stop control must not veto the click.
    sendBtn.click();
    return true;
  }

  async function sendRepeatMessage() {
    const text = repeatMessage.trim();
    if (!text) return false;
    if (repeatMessageMode === 'count' && repeatMessageSent >= repeatMessageCount) return false;
    const failure = currentTurnFailureSignal();
    if (!repeatBootstrapPending && failure) {
      console.debug('[approval-hint-wasm] repeat message: current turn is not successful; refusing to send', failure);
      return false;
    }
    if (isStreaming()) {
      console.debug('[approval-hint-wasm] repeat message: turn still active; refusing to send');
      return false;
    }

    const editor = await waitForComposer();
    if (!editor) {
      console.debug('[approval-hint-wasm] repeat message: composer not ready; will retry');
      return false;
    }

    const existing = normalizedComposerText(composerText(editor));
    if (existing && !composerTextMatches(editor, text)) {
      console.debug('[approval-hint-wasm] repeat message: composer contains user text; refusing to overwrite it');
      return false;
    }

    if (!existing) {
      const written = await writeComposerText(editor, repeatMessage);
      if (!written) {
        console.debug('[approval-hint-wasm] repeat message: ProseMirror rejected composer write; will retry');
        return false;
      }
    }

    const sendBtn = await waitForSendButton();
    if (!sendBtn || !enabledButton(sendBtn)) {
      console.debug('[approval-hint-wasm] repeat message: send button not ready; will retry');
      return false;
    }

    // Bootstrap sends start a new chat and therefore have no preceding assistant
    // turn to prove. Every repeat-after-turn send is revalidated at the commit
    // point so a newly resumed tool/assistant phase cannot race the click.
    if (!repeatBootstrapPending) {
      const latestFingerprint = currentAssistantFingerprint();
      const turnSignal = await getRepeatTurnSignal(true);
      const latestFailure = currentTurnFailureSignal();
      if (latestFingerprint !== repeatAssistantFingerprint
        || latestFailure
        || !repeatCompletionProven
        || !hasStrongUiTurnCompletion()
        || !completionAuthoritySatisfied(turnSignal)) {
        repeatCompletionProven = false;
        console.debug('[approval-hint-wasm] repeat message: completed turn proof changed before send; refusing to submit', {
          failure: latestFailure,
          signal: turnSignal,
        });
        return false;
      }
    }

    if (isStreaming()) {
      console.debug('[approval-hint-wasm] repeat message: turn still active at send boundary; refusing to submit');
      return false;
    }

    // Capture the completed-turn baseline BEFORE clicking Send. ChatGPT may
    // synchronously create the next assistant-turn shell during click(), so
    // resetting after the click can adopt that future turn and make its later
    // completion appear unchanged forever.
    resetRepeatObservation();
    sendBtn.click();
    console.info('[approval-hint-wasm] sent repeat message');
    return true;
  }

  async function tick() {
    if (!tabEnabled) return;
    try {
      if (autoRetry && deliveryTimeoutRetryController) {
        const timeoutBanner = currentDeliveryTimeoutBanner();
        const key = streamRetryApi.turnKey(document, location);
        const lastUserMessage = streamRetryApi.latestUserMessageText(document);
        const editor = findComposer();
        const existing = composerText(editor).trim();
        const ready = !!timeoutBanner
          && !!lastUserMessage
          && !!editor
          && (!existing || existing === lastUserMessage);
        const decision = deliveryTimeoutRetryController.observe({
          turnKey: key,
          visible: !!timeoutBanner,
          ready,
          streaming: isStreaming(),
          now: Date.now(),
        });
        if (decision.action === 'wait') requestTick(decision.delayMs + 30);
        if (decision.action === 'exhausted' && deliveryTimeoutExhaustionLoggedFor !== key) {
          deliveryTimeoutExhaustionLoggedFor = key;
          console.warn('[approval-hint-wasm] delivery-timeout resend exhausted; manual intervention required', { attempts: decision.attempts });
        }
        if (decision.action === 'resend') {
          const fleetManaged = /^\[MODEL FLEET (?:ASSIGNMENT|MESSAGE)\]/.test(lastUserMessage);
          if (fleetManaged) {
            deliveryTimeoutRetryController.settle({ success: false });
            console.warn('[approval-hint-wasm] fleet-managed delivery timeout left to fleet retry policy');
            requestTick(1000);
            return;
          }
          repeatPending = false;
          repeatCompletionProven = false;
          const sent = await sendMessageNow(lastUserMessage);
          deliveryTimeoutRetryController.settle({ success: sent });
          if (sent) {
            console.warn('[approval-hint-wasm] resubmitted last user message after delivery timeout', { attempt: decision.attempts });
          } else {
            console.warn('[approval-hint-wasm] delivery-timeout resend could not submit; retry remains bounded', { attempt: decision.attempts });
          }
          requestTick(1000);
          return;
        }
      }
      if (autoRetry && streamRetryController) {
        const banner = currentStreamErrorBanner();
        const key = streamRetryApi.turnKey(document, location);
        const decision = streamRetryController.observe({
          turnKey: key,
          visible: !!banner,
          ready: !!banner && enabledButton(banner.button),
          streaming: isStreaming(),
          now: Date.now(),
        });
        if (decision.action === 'wait') requestTick(decision.delayMs + 30);
        if (decision.action === 'exhausted' && retryExhaustionLoggedFor !== key) {
          retryExhaustionLoggedFor = key;
          console.warn('[approval-hint-wasm] auto retry exhausted; manual intervention required', { attempts: decision.attempts });
        }
        if (decision.action === 'click') {
          repeatPending = false;
          repeatCompletionProven = false;
          banner.button.click();
          console.warn('[approval-hint-wasm] auto retrying message stream error', { attempt: decision.attempts });
          requestTick(1000);
          return;
        }
      }
      if (repeatMessageEnabled) {
        const assistantChanged = observeAssistantOutput();
        const now = Date.now();

        if (assistantChanged) {
          repeatIdleSince = now;
          repeatPending = false;
        } else {
          if (repeatIdleSince <= 0) repeatIdleSince = now;
          const idleRemaining = FINAL_IDLE_STABILITY_MS - (now - repeatIdleSince);
          if (idleRemaining > 0) requestTick(idleRemaining + 50);
        }

        let streaming = isStreaming();
        wasStreaming = streaming;
        const turnFailure = repeatBootstrapPending ? null : currentTurnFailureSignal();
        if (turnFailure) {
          repeatPending = false;
          repeatCompletionProven = false;
          const failureKey = turnFailure.state + ':' + turnFailure.text;
          if (failureKey !== repeatFailureKey) {
            repeatFailureKey = failureKey;
            console.debug('[approval-hint-wasm] repeat message: waiting on nonterminal/error turn state', turnFailure);
          }
        } else {
          repeatFailureKey = '';
        }

        if (assistantChanged) {
          requestTick(REPEAT_COMPLETION_SETTLE_MS + 50);
        }
        if (repeatResponseObserved && repeatAssistantChangedAt > 0) {
          const quietFor = now - repeatAssistantChangedAt;
          const settleRemaining = REPEAT_COMPLETION_SETTLE_MS - quietFor;
          if (settleRemaining > 0) requestTick(settleRemaining + 50);
        }

        if (repeatBootstrapPending && repeatRestartEnabled) {
          const alreadyAtChatRoot = location.hostname === 'chatgpt.com'
            && location.pathname === '/'
            && !location.search
            && !location.hash;
          if (!alreadyAtChatRoot) {
            console.info('[approval-hint-wasm] repeat bootstrap: forcing same tab to ChatGPT root');
            location.replace('https://chatgpt.com/');
            return;
          }
        }

        if (repeatBootstrapPending && !streaming && now - lastRepeatSent > REPEAT_COOLDOWN_MS) {
          const sent = await sendRepeatMessage();
          if (sent) {
            lastRepeatSent = Date.now();
            repeatPending = false;
            repeatMessageSent += 1;
            repeatBootstrapPending = false;
            if (repeatMessageMode === 'count' && repeatMessageSent >= repeatMessageCount) {
              if (repeatRestartEnabled) repeatRestartPending = true;
              else repeatMessageEnabled = false;
            }
            try {
              const response = await runtimeMessage({ type: 'approval:repeat-sent' });
              if (response?.ok && response.state) applyTabState(response.state);
            } catch (error) {
              console.warn('[approval-hint-wasm] repeat count update failed', error);
            }
          } else {
            requestTick(TURN_SIGNAL_CACHE_MS + 50);
          }
        }

        const turnSignal = repeatResponseObserved && !repeatBootstrapPending && !turnFailure
          ? await getRepeatTurnSignal(false)
          : { available: false };

        if (!repeatPending && repeatResponseObserved && !repeatBootstrapPending && !turnFailure) {
          requestTick(TURN_SIGNAL_CACHE_MS + 50);
        }

        if (!repeatPending && !turnFailure && repeatTurnComplete(now, turnSignal)) {
          repeatPending = true;
          streaming = isStreaming();
          wasStreaming = streaming;
          console.info('[approval-hint-wasm] repeat message: terminal success proven');
        }

        if (repeatPending && !turnFailure && !streaming) {
          const cooldownRemaining = REPEAT_COOLDOWN_MS - (now - lastRepeatSent);
          if (cooldownRemaining > 0) requestTick(cooldownRemaining + 10);
        }

        if (repeatPending && !turnFailure && !streaming && now - lastRepeatSent > REPEAT_COOLDOWN_MS) {
          if (repeatRestartPending) {
            repeatPending = false;
            try {
              const response = await runtimeMessage({ type: 'approval:restart-repeat-cycle' });
              if (!response?.ok || !response.restarted) {
                repeatPending = true;
                console.warn('[approval-hint-wasm] repeat cycle restart was not accepted');
              }
            } catch (error) {
              repeatPending = true;
              console.warn('[approval-hint-wasm] repeat cycle restart failed', error);
            }
            if (repeatPending) requestTick(TURN_SIGNAL_CACHE_MS + 50);
            return;
          }

          const sent = await sendRepeatMessage();
          if (sent) {
            lastRepeatSent = Date.now();
            repeatPending = false;
            repeatMessageSent += 1;
            repeatBootstrapPending = false;
            if (repeatMessageMode === 'count' && repeatMessageSent >= repeatMessageCount) {
              if (repeatRestartEnabled) {
                repeatRestartPending = true;
              } else {
                repeatMessageEnabled = false;
              }
            }
            resetRepeatObservation();
            try {
              const response = await runtimeMessage({ type: 'approval:repeat-sent' });
              if (response?.ok && response.state) applyTabState(response.state);
            } catch (error) {
              console.warn('[approval-hint-wasm] repeat count update failed', error);
            }
          } else {
            requestTick(TURN_SIGNAL_CACHE_MS + 50);
          }
        }
      } else {
        wasStreaming = false;
        repeatPending = false;
      }

      if (!autoApprove && !autoScroll) return;
      const pos = await findApprovalPositionCandidate();
      if (!pos) {
        lastClick = { key: '', at: 0 };
        return;
      }
      if (pos.scrolled) {
        requestTick(250);
        return;
      }
      if (pos.blocked || !autoApprove) return;
      clickApprovalButton(pos);
    } catch (error) {
      console.debug('[approval-hint-wasm] tick failed', error);
    }
  }

  function mutationTouchesTrackedUi(mutation) {
    const selector = 'button, .turn-action-controls, [role="alert"], [role="status"], [aria-live], [data-message-author-role="assistant"], #prompt-textarea, [contenteditable="true"][data-id], [contenteditable="true"][data-placeholder]';
    const target = mutation.target?.nodeType === Node.ELEMENT_NODE
      ? mutation.target
      : mutation.target?.parentElement;
    if (target?.closest?.(selector)) return true;
    return [...mutation.addedNodes].some((node) =>
      node.nodeType === Node.ELEMENT_NODE
      && (
        node.matches?.(selector)
        || node.querySelector?.(selector)
      )
    );
  }

  function runTick() {
    if (!tabEnabled) return;
    if (tickRunning) {
      tickQueued = true;
      return;
    }
    tickRunning = true;
    Promise.resolve(tick()).finally(() => {
      tickRunning = false;
      if (tickQueued && tabEnabled) {
        tickQueued = false;
        requestTick();
      }
    });
  }

  function requestTick(delayMs = APPROVAL_WAKE_THROTTLE_MS) {
    if (!tabEnabled) return;
    const delay = Math.max(0, Number(delayMs) || 0);
    const targetAt = Date.now() + delay;

    // Coalesce wakeups. If a more urgent event arrives, pull the existing
    // one-shot timer earlier instead of adding another timer.
    if (wakeTimer !== null) {
      if (targetAt >= wakeAt) return;
      clearTimeout(wakeTimer);
      wakeTimer = null;
      wakeAt = 0;
    }

    wakeAt = targetAt;
    wakeTimer = setTimeout(() => {
      wakeTimer = null;
      wakeAt = 0;
      runTick();
    }, delay);
  }

  function onViewportEvent() {
    requestTick();
  }

  function startWatching() {
    if (eventObserver !== null) {
      requestTick(0);
      return;
    }

    runTick();

    if (document.documentElement) {
      eventObserver = new MutationObserver((mutations) => {
        observeUiCompletion(mutations);
        if (mutations.some(mutationTouchesTrackedUi)) requestTick();
      });
      eventObserver.observe(document.documentElement, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["disabled", "aria-disabled"],
      });
    }

    // These are event-driven recovery points for layout/SPA lifecycle changes.
    window.addEventListener('scroll', onViewportEvent, { passive: true, capture: true });
    window.addEventListener('resize', onViewportEvent, { passive: true });
    window.addEventListener('pageshow', onViewportEvent);
  }

  function stopWatching() {
    if (eventObserver !== null) {
      eventObserver.disconnect();
      eventObserver = null;
    }
    if (wakeTimer !== null) {
      clearTimeout(wakeTimer);
      wakeTimer = null;
      wakeAt = 0;
    }

    window.removeEventListener('scroll', onViewportEvent, { capture: true });
    window.removeEventListener('resize', onViewportEvent);
    window.removeEventListener('pageshow', onViewportEvent);

    tickQueued = false;
    lastClick = { key: "", at: 0 };
    wasStreaming = false;
    repeatPending = false;
    repeatRestartPending = false;
    repeatBootstrapPending = false;
    repeatAssistantFingerprint = '';
    repeatAssistantChangedAt = 0;
    repeatTurnObservedAt = 0;
    repeatUiCompletionAt = 0;
    repeatResponseObserved = false;
    repeatCompletionProven = false;
    repeatIdleSince = 0;
    lastRepeatSent = 0;
    repeatFailureKey = '';
    invalidateRepeatTurnSignal();
    clearHighlights();
  }

  refreshTabState();
})();
