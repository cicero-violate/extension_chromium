/* Isolated, bounded retry policy for ChatGPT's "Error in message stream" UI. */
(function (root) {
  'use strict';

  const ERROR_TEXT = /\berror in (?:the )?message stream\b/i;
  const RETRY_LABEL = /^retry(?: response)?$/i;
  const DELIVERY_TIMEOUT_TEXT = /\bmessage delivery timed out\.?\s*please try again\.?\b/i;

  function findStreamError(document, { usable, latestTurn = null }) {
    const buttons = [...document.querySelectorAll('button')];
    const turnTop = latestTurn?.getBoundingClientRect().top ?? -Infinity;
    for (let i = buttons.length - 1; i >= 0; i -= 1) {
      const button = buttons[i];
      if (!usable(button)) continue;
      const label = (button.getAttribute('aria-label') || button.innerText || button.textContent || '')
        .replace(/\s+/g, ' ').trim();
      if (!RETRY_LABEL.test(label)) continue;

      // Match only a small banner containing BOTH the error text and Retry.
      // Never click a generic Retry button elsewhere on the page.
      let container = button.parentElement;
      for (let depth = 0; container && container !== document.body && depth < 6; depth += 1, container = container.parentElement) {
        const text = (container.innerText || container.textContent || '').replace(/\s+/g, ' ').trim();
        if (text.length > 400 || !ERROR_TEXT.test(text)) continue;
        if (container.querySelectorAll('button').length > 3) continue;
        if (latestTurn && !latestTurn.contains(container)
          && container.getBoundingClientRect().bottom < turnTop - 32) continue;
        if (!usable(container)) continue;
        return { button, banner: container };
      }
    }
    return null;
  }

  function findDeliveryTimeout(document, { usable, latestTurn = null }) {
    const candidates = [...document.querySelectorAll('[role="alert"], [role="status"], [aria-live]')];
    const turnTop = latestTurn?.getBoundingClientRect().top ?? -Infinity;
    for (let i = candidates.length - 1; i >= 0; i -= 1) {
      const node = candidates[i];
      if (!usable(node)) continue;
      const text = (node.innerText || node.textContent || '').replace(/\s+/g, ' ').trim();
      if (text.length > 400 || !DELIVERY_TIMEOUT_TEXT.test(text)) continue;
      if (latestTurn && !latestTurn.contains(node)
        && node.getBoundingClientRect().bottom < turnTop - 32) continue;
      return { banner: node, text };
    }
    return null;
  }

  function latestUserMessageText(document) {
    const users = document.querySelectorAll('[data-message-author-role="user"]');
    const last = users[users.length - 1];
    if (!last) return '';
    const body = last.querySelector?.('[data-message-content]')
      || last.querySelector?.('.whitespace-pre-wrap')
      || last;
    return String(body.innerText || body.textContent || '').trim();
  }

  function turnKey(document, location) {
    const users = document.querySelectorAll('[data-message-author-role="user"]');
    const last = users[users.length - 1];
    const id = last?.getAttribute('data-message-id') || last?.id || '';
    // Same user request retains one retry budget across assistant rerenders.
    return `${location.origin}${location.pathname}:${users.length}:${id}`;
  }

  function createController({ maxAttempts = 2, backoffMs = 3000 } = {}) {
    let key = null;
    let attempts = 0;
    let awaitingClear = false;
    let lastClickAt = 0;
    return {
      observe({ turnKey: nextKey, visible, ready, streaming, now }) {
        if (key !== nextKey) {
          key = nextKey;
          attempts = 0;
          awaitingClear = false;
          lastClickAt = 0;
        }
        if (!visible) {
          // Only a *disappeared* banner arms a subsequent retry; an unchanged
          // error banner cannot trigger a loop, even if the button re-enables.
          awaitingClear = false;
          return { action: 'none', attempts };
        }
        if (awaitingClear) return { action: 'await-clear', attempts };
        if (attempts >= maxAttempts) return { action: 'exhausted', attempts };
        if (streaming || !ready) return { action: 'busy', attempts };
        const dueAt = lastClickAt + backoffMs * (2 ** (attempts - 1));
        if (attempts > 0 && now < dueAt) {
          return { action: 'wait', delayMs: dueAt - now, attempts };
        }
        attempts += 1;
        lastClickAt = now;
        awaitingClear = true;
        return { action: 'click', attempts };
      },
    };
  }

  function createResendController({ maxAttempts = 2, backoffMs = 3000 } = {}) {
    let key = null;
    let attempts = 0;
    let awaitingClear = false;
    let inFlight = false;
    let lastAttemptAt = 0;

    function reset(nextKey) {
      key = nextKey;
      attempts = 0;
      awaitingClear = false;
      inFlight = false;
      lastAttemptAt = 0;
    }

    return {
      observe({ turnKey: nextKey, visible, ready, streaming, now }) {
        if (key !== nextKey) reset(nextKey);
        if (!visible) {
          awaitingClear = false;
          inFlight = false;
          return { action: 'none', attempts };
        }
        if (inFlight) return { action: 'in-flight', attempts };
        if (awaitingClear) return { action: 'await-clear', attempts };
        if (attempts >= maxAttempts) return { action: 'exhausted', attempts };
        if (streaming || !ready) return { action: 'busy', attempts };

        const dueAt = lastAttemptAt + backoffMs * (2 ** (attempts - 1));
        if (attempts > 0 && now < dueAt) {
          return { action: 'wait', delayMs: dueAt - now, attempts };
        }

        attempts += 1;
        lastAttemptAt = now;
        inFlight = true;
        return { action: 'resend', attempts };
      },
      settle({ success }) {
        if (!inFlight) return;
        inFlight = false;
        awaitingClear = success === true;
      },
    };
  }

  const api = Object.freeze({ findStreamError, findDeliveryTimeout, latestUserMessageText, turnKey, createController, createResendController });
  root.ApprovalStreamRetry = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(globalThis);
