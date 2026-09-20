(() => {
  'use strict';

  const POLL_MS = 5000;
  const APPROVAL_WAKE_THROTTLE_MS = 100;
  const HIGHLIGHT_ATTR = 'data-approval-hint-wasm';
  const CLICK_DEDUPE_MS = 5000;
  const REPEAT_COOLDOWN_MS = 5000;
  const ROUTER_TOOL_GRACE_MS = 30000;
  const REPEAT_FALLBACK_SETTLE_MS = 30000;
  const STALE_STOP_ESCAPE_MS = 5000;
  const SEND_READY_TIMEOUT_MS = 5000;
  let wasmExports = null;
  let wasmPromise = null;
  let tabEnabled = false;
  let autoApprove = true;
  let autoScroll = true;
  let lastClick = { key: '', at: 0 };
  let repeatMessageEnabled = false;
  let repeatMessage = '';
  let repeatMessageMode = 'forever';
  let repeatMessageCount = 1;
  let repeatMessageSent = 0;
  let repeatRestartEnabled = false;
  let repeatRestartMode = 'reload';
  let repeatRestartPending = false;
  let repeatBootstrapPending = false;
  let wasStreaming = false;
  let repeatPending = false;
  let repeatAssistantFingerprint = '';
  let repeatAssistantChangedAt = 0;
  let repeatResponseObserved = false;
  let lastRepeatSent = 0;
  let pollTimer = null;
  let pollObserver = null;
  let pollWakeTimer = null;
  let tickRunning = false;
  let tickQueued = false;

  function runtimeMessage(message) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, (response) => {
        const error = chrome.runtime.lastError;
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  function applyTabState(state = {}) {
    const wasRepeatEnabled = repeatMessageEnabled;
    tabEnabled = state.enabled === true;
    autoApprove = state.autoApprove !== false;
    autoScroll = state.autoScroll !== false;
    repeatMessageEnabled = state.repeatMessageEnabled === true;
    repeatMessage = typeof state.repeatMessage === 'string' ? state.repeatMessage : '';
    repeatMessageMode = state.repeatMessageMode === 'count' ? 'count' : 'forever';
    repeatMessageCount = Math.max(1, Math.trunc(Number(state.repeatMessageCount) || 1));
    repeatMessageSent = Math.max(0, Math.trunc(Number(state.repeatMessageSent) || 0));
    repeatRestartEnabled = state.repeatRestartEnabled === true && repeatMessageMode === 'count';
    repeatRestartMode = state.repeatRestartMode === 'new_chat' ? 'new_chat' : 'reload';
    repeatRestartPending = state.repeatRestartPending === true && repeatRestartEnabled;
    repeatBootstrapPending = state.repeatBootstrapPending === true && repeatRestartEnabled;
    if (!repeatMessageEnabled) {
      repeatPending = false;
      repeatResponseObserved = false;
      repeatAssistantFingerprint = '';
      repeatAssistantChangedAt = 0;
    } else if (!wasRepeatEnabled) {
      resetRepeatObservation();
    }

    const hasWork = autoApprove || autoScroll || repeatMessageEnabled;
    if (tabEnabled && hasWork) {
      startPolling();
    } else {
      stopPolling();
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

  chrome.runtime.onMessage.addListener((message) => {
    if (message?.type !== 'approval:tab-state-changed') return;
    applyTabState(message.state);
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
        const url = chrome.runtime.getURL('approval_hint_wasm.wasm');
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

  function currentAssistantFingerprint() {
    const nodes = document.querySelectorAll('[data-message-author-role="assistant"]');
    const latest = nodes[nodes.length - 1];
    if (!latest) return '0::0:0';
    const text = (latest.innerText || latest.textContent || '').trim();
    let hash = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    const id = latest.getAttribute('data-message-id') || latest.id || '';
    return `${nodes.length}:${id}:${text.length}:${hash >>> 0}`;
  }

  function resetRepeatObservation() {
    repeatAssistantFingerprint = currentAssistantFingerprint();
    repeatAssistantChangedAt = 0;
    repeatResponseObserved = false;
  }

  function observeAssistantOutput() {
    const next = currentAssistantFingerprint();
    if (!repeatAssistantFingerprint) {
      repeatAssistantFingerprint = next;
      return false;
    }
    if (next === repeatAssistantFingerprint) return false;
    repeatAssistantFingerprint = next;
    repeatAssistantChangedAt = Date.now();
    repeatResponseObserved = true;
    return true;
  }

  function isStreaming() {
    // Router state is advisory. Missing/stale completion flags must never pin the tab
    // in a permanent "streaming" state. Only positive activity keeps the turn busy.
    if ((window.__browserRouterSseCapture?.active || 0) > 0) return true;

    const lastFinalText = Number(window.__browserRouterLastFinalTextAt || 0);
    const lastToolActivity = Math.max(
      Number(window.__browserRouterLastToolCallAt || 0),
      Number(window.__browserRouterLastToolResultAt || 0),
    );
    if (lastToolActivity > lastFinalText && Date.now() - lastToolActivity < ROUTER_TOOL_GRACE_MS) {
      return true;
    }

    const stopButton = document.querySelector(
      '[data-testid="stop-button"], #composer-submit-button[data-testid*="stop" i], button[data-testid*="stop" i], button[aria-label*="stop" i]'
    );
    if (!stopButton || !enabledButton(stopButton)) return false;

    // ChatGPT can leave a stale Stop control visible after final assistant text.
    // Do not let that stale DOM state veto repeat completion forever. This only
    // releases our local busy classification; sendRepeatMessage still requires
    // a genuine enabled Send control before it can submit anything.
    const assistantQuietFor = repeatAssistantChangedAt > 0
      ? Date.now() - repeatAssistantChangedAt
      : 0;
    if (repeatResponseObserved && assistantQuietFor >= STALE_STOP_ESCAPE_MS) {
      return false;
    }
    return true;
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

  function findSendButton() {
    return document.querySelector('#composer-submit-button[data-testid="send-button"]')
      || document.querySelector('button[data-testid="send-button"]')
      || document.querySelector('button[aria-label="Send prompt"]')
      || [...document.querySelectorAll('button')].find((button) => {
        if (!usable(button) || !enabledButton(button)) return false;
        return /^send( prompt)?$/i.test((button.getAttribute('aria-label') || '').trim());
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

  async function sendRepeatMessage() {
    const text = repeatMessage.trim();
    if (!text) return false;
    if (repeatMessageMode === 'count' && repeatMessageSent >= repeatMessageCount) return false;

    const editor = findComposer();
    if (!editor) {
      console.warn('[approval-hint-wasm] repeat message: no input found');
      return false;
    }

    const existing = composerText(editor).trim();
    if (existing && existing !== text) {
      console.warn('[approval-hint-wasm] repeat message: composer contains user text; refusing to overwrite it');
      return false;
    }

    editor.focus();
    if (editor.tagName === 'TEXTAREA') {
      const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')?.set;
      setter?.call(editor, repeatMessage);
      editor.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: repeatMessage }));
      editor.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (!existing) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(editor);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('delete', false, null);
      document.execCommand('insertText', false, repeatMessage);
      editor.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: repeatMessage }));
    }

    const sendBtn = await waitForSendButton();
    if (!sendBtn || !enabledButton(sendBtn)) {
      console.warn('[approval-hint-wasm] repeat message: send button not ready; will retry');
      return false;
    }

    sendBtn.click();
    console.info('[approval-hint-wasm] sent repeat message');
    return true;
  }

  async function tick() {
    if (!tabEnabled) return;
    try {
      if (repeatMessageEnabled) {
        observeAssistantOutput();
        const streaming = isStreaming();
        if (wasStreaming && !streaming) repeatPending = true;
        wasStreaming = streaming;

        const now = Date.now();

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
            resetRepeatObservation();
            try {
              const response = await runtimeMessage({ type: 'approval:repeat-sent' });
              if (response?.ok && response.state) applyTabState(response.state);
            } catch (error) {
              console.warn('[approval-hint-wasm] repeat count update failed', error);
            }
          }
        }

        if (!repeatPending
          && repeatResponseObserved
          && repeatAssistantChangedAt > 0
          && now - repeatAssistantChangedAt >= REPEAT_FALLBACK_SETTLE_MS) {
          repeatPending = true;
          console.info('[approval-hint-wasm] repeat message: using settled-assistant fallback completion');
        }

        if (repeatPending && !streaming && now - lastRepeatSent > REPEAT_COOLDOWN_MS) {
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
      if (pos.scrolled || pos.blocked || !autoApprove) return;
      clickApprovalButton(pos);
    } catch (error) {
      console.debug('[approval-hint-wasm] tick failed', error);
    }
  }

  function mutationTouchesTrackedUi(mutation) {
    const target = mutation.target?.nodeType === Node.ELEMENT_NODE
      ? mutation.target
      : mutation.target?.parentElement;
    if (target?.closest?.('button, [data-message-author-role="assistant"]')) return true;
    return [...mutation.addedNodes].some((node) =>
      node.nodeType === Node.ELEMENT_NODE
      && (
        node.matches?.('button, [data-message-author-role="assistant"]')
        || node.querySelector?.('button, [data-message-author-role="assistant"]')
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
    if (!tabEnabled || pollWakeTimer !== null) return;
    pollWakeTimer = setTimeout(() => {
      pollWakeTimer = null;
      runTick();
    }, Math.max(0, delayMs));
  }

  function startPolling() {
    if (pollTimer !== null) return;
    runTick();
    if (pollObserver === null && document.documentElement) {
      pollObserver = new MutationObserver((mutations) => {
        if (mutations.some(mutationTouchesTrackedUi)) requestTick();
      });
      pollObserver.observe(document.documentElement, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["disabled", "aria-disabled"],
      });
    }
    pollTimer = setInterval(() => requestTick(0), POLL_MS);
  }

  function stopPolling() {
    if (pollTimer !== null) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
    if (pollObserver !== null) {
      pollObserver.disconnect();
      pollObserver = null;
    }
    if (pollWakeTimer !== null) {
      clearTimeout(pollWakeTimer);
      pollWakeTimer = null;
    }
    tickQueued = false;
    lastClick = { key: "", at: 0 };
    wasStreaming = false;
    repeatPending = false;
    repeatRestartPending = false;
    repeatBootstrapPending = false;
    repeatAssistantFingerprint = '';
    repeatAssistantChangedAt = 0;
    repeatResponseObserved = false;
    lastRepeatSent = 0;
    clearHighlights();
  }

  refreshTabState();
})();
