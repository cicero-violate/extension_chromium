import { CdpSocket } from "./cdp-socket.mjs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── JS snippets (ported from cdp_auto_approve/js_snippets.py) ─────────────────

const HAS_DENY_JS = `(function() {
    return [...document.querySelectorAll('button')]
        .some(b => b.innerText.trim() === 'Deny'
            && (() => {
                const s = window.getComputedStyle(b);
                const r = b.getBoundingClientRect();
                return s.display !== 'none'
                    && s.visibility !== 'hidden'
                    && s.pointerEvents !== 'none'
                    && r.width > 0
                    && r.height > 0;
            })());
})()`;

const APPROVE_POS_JS = `(function() {
    function usable(el) {
        const s = window.getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return s.display !== 'none'
            && s.visibility !== 'hidden'
            && s.opacity !== '0'
            && s.pointerEvents !== 'none'
            && r.width > 0
            && r.height > 0;
    }
    function inViewport(el) {
        const r = el.getBoundingClientRect();
        return r.top >= 0
            && r.left >= 0
            && r.bottom <= window.innerHeight
            && r.right <= window.innerWidth;
    }
    function requestScroll(el) {
        (el.parentElement || el).scrollIntoView({ block: 'center', inline: 'nearest' });
        return { scrolled: true };
    }
    function enabled(el) {
        return !el.disabled
            && el.getAttribute('aria-disabled') !== 'true'
            && !el.hasAttribute('disabled');
    }
    function centerDistance(a, b) {
        const ar = a.getBoundingClientRect();
        const br = b.getBoundingClientRect();
        const ax = ar.x + ar.width / 2, ay = ar.y + ar.height / 2;
        const bx = br.x + br.width / 2, by = br.y + br.height / 2;
        return Math.hypot(ax - bx, ay - by);
    }
    const denys = [...document.querySelectorAll('button')]
        .filter(b => (b.innerText || b.textContent || '').trim() === 'Deny' && usable(b))
        .sort((a, b) => b.getBoundingClientRect().y - a.getBoundingClientRect().y);
    if (!denys.length) return null;
    for (const deny of denys) {
        if (!inViewport(deny)) {
            return requestScroll(deny);
        }
        const denyRect = deny.getBoundingClientRect();
        const directRowButtons = [...(deny.parentElement?.children || [])]
            .filter(el => el.tagName === 'BUTTON' && el !== deny && usable(el) && enabled(el));
        const sameRow = directRowButtons
            .filter(b => {
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
        if (sameRow.length) {
            const btn = sameRow[0];
            const r = btn.getBoundingClientRect();
            if (!inViewport(btn)) return requestScroll(btn);
            const x = r.x + r.width / 2;
            const y = r.y + r.height / 2;
            if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) {
                return requestScroll(btn);
            }
            const hit = document.elementFromPoint(x, y);
            const hitButton = hit && hit.closest && hit.closest('button');
            if (hitButton !== btn) {
                return {
                    blocked: true,
                    label: (btn.innerText || btn.textContent || btn.getAttribute('aria-label') || 'approval').trim(),
                    blockedBy: hitButton
                        ? (hitButton.innerText || hitButton.textContent || hitButton.getAttribute('aria-label') || '').trim()
                        : (hit ? String(hit.tagName || '') : 'none')
                };
            }
            const label = (btn.innerText || btn.textContent || btn.getAttribute('aria-label') || 'approval').trim();
            const rowText = (deny.parentElement?.innerText || '').trim().replace(/\\s+/g, ' ');
            return {
                label,
                x,
                y,
                key: [label, Math.round(denyRect.x), Math.round(denyRect.y), Math.round(r.x), Math.round(r.y), rowText].join('|')
            };
        }
    }
    return null;
})()`;

const APPROVE_CLICK_JS = `(function() {
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
    function inViewport(el) {
        const r = el.getBoundingClientRect();
        return r.top >= 0
            && r.left >= 0
            && r.bottom <= window.innerHeight
            && r.right <= window.innerWidth;
    }
    function enabled(el) {
        return !el.disabled
            && el.getAttribute('aria-disabled') !== 'true'
            && !el.hasAttribute('disabled');
    }
    function centerDistance(a, b) {
        const ar = a.getBoundingClientRect();
        const br = b.getBoundingClientRect();
        const ax = ar.x + ar.width / 2, ay = ar.y + ar.height / 2;
        const bx = br.x + br.width / 2, by = br.y + br.height / 2;
        return Math.hypot(ax - bx, ay - by);
    }
    function requestScroll(el) {
        (el.parentElement || el).scrollIntoView({ block: 'center', inline: 'nearest' });
        return { ok: false, scrolled: true };
    }
    function keyFor(label, deny, btn) {
        const dr = deny.getBoundingClientRect();
        const br = btn.getBoundingClientRect();
        const rowText = (deny.parentElement?.innerText || '').trim().replace(/\\s+/g, ' ');
        return [label, Math.round(dr.x), Math.round(dr.y), Math.round(br.x), Math.round(br.y), rowText].join('|');
    }
    const denys = [...document.querySelectorAll('button')]
        .filter(b => (b.innerText || b.textContent || '').trim() === 'Deny' && usable(b))
        .sort((a, b) => b.getBoundingClientRect().y - a.getBoundingClientRect().y);
    if (!denys.length) return { ok: false, reason: 'no-deny' };
    for (const deny of denys) {
        if (!inViewport(deny)) return requestScroll(deny);
        const denyRect = deny.getBoundingClientRect();
        const sameRow = [...(deny.parentElement?.children || [])]
            .filter(el => el.tagName === 'BUTTON' && el !== deny && usable(el) && enabled(el))
            .filter(b => {
                const r = b.getBoundingClientRect();
                const dy = Math.abs((r.y + r.height / 2) - (denyRect.y + denyRect.height / 2));
                return dy <= Math.max(24, denyRect.height);
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
        if (!inViewport(btn)) return requestScroll(btn);
        const label = (btn.innerText || btn.textContent || btn.getAttribute('aria-label') || 'approval').trim();
        const key = keyFor(label, deny, btn);
        btn.focus({ preventScroll: true });
        btn.click();
        return { ok: true, label, key };
    }
    return { ok: false, reason: 'no-approval-sibling' };
})()`;

const RATE_LIMIT_GOT_IT_POS_JS = `(function() {
    const phrases = [
        "You're making requests too quickly",
        "temporarily limited access to your conversations",
        "Please wait a few minutes before trying again"
    ];
    const bodyText = document.body?.innerText || "";
    if (!phrases.some(p => bodyText.includes(p))) return null;
    function visible(el) {
        if (!el) return false;
        const s = window.getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return s.display !== 'none'
            && s.visibility !== 'hidden'
            && s.opacity !== '0'
            && s.pointerEvents !== 'none'
            && r.width > 0
            && r.height > 0
            && r.bottom > 0
            && r.right > 0
            && r.top < window.innerHeight
            && r.left < window.innerWidth;
    }
    const buttons = [...document.querySelectorAll('button')].filter(visible);
    const gotIt = buttons.find(b =>
        (b.innerText || b.textContent || '').trim().toLowerCase() === 'got it'
        || (b.getAttribute('aria-label') || '').trim().toLowerCase() === 'got it'
    );
    if (!gotIt) return null;
    const r = gotIt.getBoundingClientRect();
    return {
        label: (gotIt.innerText || gotIt.textContent || gotIt.getAttribute('aria-label') || 'Got it').trim(),
        x: r.x + r.width / 2,
        y: r.y + r.height / 2
    };
})()`;

const CONNECTOR_CHECK_JS = `(function() {
    function inFixedOverlay(el) {
        let n = el.parentElement;
        while (n && n !== document.body) {
            if (window.getComputedStyle(n).position === 'fixed') return true;
            n = n.parentElement;
        }
        return false;
    }
    for (const el of document.querySelectorAll('button,[role="button"]')) {
        const label = (el.getAttribute('aria-label') || '').toLowerCase();
        const text  = (el.innerText || el.textContent || '').trim().toLowerCase();
        if ((label.includes('chatgpt-mcp-connector') || text === 'chatgpt-mcp-connector')
                && !inFixedOverlay(el))
            return 'active';
    }
    return 'not-found';
})()`;

const PAGE_READY_JS = `(function() {
    const composer = document.querySelector('form[data-type="unified-composer"]')
        || document.querySelector('form.group\\\\/composer')
        || document;
    const el = composer.querySelector('#prompt-textarea')
        || composer.querySelector('[contenteditable="true"][role="textbox"]')
        || composer.querySelector('[role="textbox"]')
        || composer.querySelector('textarea');
    return el ? 'ready' : 'loading';
})()`;

// ── CDP helpers ────────────────────────────────────────────────────────────────

async function jsEval(cdp, expression) {
  const res = await cdp.send("Runtime.evaluate", { expression, returnByValue: true });
  return res?.result?.value ?? null;
}

async function mouseClick(cdp, x, y) {
  await cdp.send("Page.bringToFront");
  for (const [type, button, buttons] of [
    ["mouseMoved", "none", 0],
    ["mousePressed", "left", 1],
    ["mouseReleased", "left", 0],
  ]) {
    await cdp.send("Input.dispatchMouseEvent", { type, button, buttons, x, y, clickCount: 1 });
    await sleep(80);
  }
}

// ── Approval ───────────────────────────────────────────────────────────────────

async function clickApproval(cdp, pos, context) {
  let label = pos.label ?? "approval";
  let key = pos.key;
  for (let attempt = 0; attempt < 3; attempt++) {
    let clicked;
    try {
      clicked = await jsEval(cdp, APPROVE_CLICK_JS) ?? {};
    } catch {
      return false;
    }
    if (clicked.scrolled) { await sleep(400); continue; }
    if (!clicked.ok) return false;
    label = clicked.label ?? label;
    key = clicked.key ?? key;
    await sleep(800);
    let still;
    try {
      still = await jsEval(cdp, APPROVE_POS_JS);
    } catch {
      return false;
    }
    if (!still) {
      console.log(`[auto-approve] approved '${label}' on: ${context}`);
      return true;
    }
    if (still.scrolled || still.blocked) { await sleep(300); continue; }
    if (key && still.key !== key) {
      console.log(`[auto-approve] approved '${label}' on: ${context}`);
      return true;
    }
  }
  console.log(`[auto-approve] approval did not clear '${label}' on: ${context}`);
  return false;
}

async function watchTab(wsUrl, label) {
  const cdp = new CdpSocket(wsUrl, { commandTimeoutMs: 10_000 });
  try {
    await cdp.connect();
    await cdp.send("Runtime.enable");
    while (cdp.open) {
      await sleep(500);
      try {
        const limitPos = await jsEval(cdp, RATE_LIMIT_GOT_IT_POS_JS);
        if (limitPos) {
          await mouseClick(cdp, limitPos.x, limitPos.y);
          console.log(`[auto-approve] dismissed rate-limit on: ${label}`);
          continue;
        }
        const pos = await jsEval(cdp, APPROVE_POS_JS);
        if (pos) await clickApproval(cdp, pos, label);
      } catch {
        // CDP errors mid-poll are normal (tab navigating, etc.)
      }
    }
  } catch {
    // Connection dropped — normal when tab closes or navigates
  } finally {
    cdp.close();
  }
}

export function startAutoApproveLoop(targetManager) {
  const known = new Set();

  async function tick() {
    let targets;
    try { targets = await targetManager.listTargets(); }
    catch { return; }

    for (const t of targets) {
      if (t.type !== "page" || !t.webSocketDebuggerUrl) continue;
      const url = String(t.url ?? "");
      if (!url.startsWith("https://chatgpt.com/") && !url.startsWith("https://chat.openai.com/")) continue;
      if (known.has(t.id)) continue;
      known.add(t.id);
      const label = `${(t.title || t.url).slice(0, 60)} [${t.id.slice(0, 8)}]`;
      watchTab(t.webSocketDebuggerUrl, label).finally(() => known.delete(t.id));
    }
  }

  (async () => {
    while (true) {
      await tick();
      await sleep(2000);
    }
  })();
}

// ── Connector activation (ported from cdp_auto_approve/connector.py) ──────────

export async function activateConnector(cdp) {
  async function pillActive() {
    return await jsEval(cdp, CONNECTOR_CHECK_JS) === "active";
  }

  if (await pillActive()) {
    console.log("[connector] already active");
    return true;
  }

  console.log("[connector] activating via slash command...");

  const composerPos = await jsEval(cdp, `(function() {
    const composer = document.querySelector('form[data-type="unified-composer"]')
        || document.querySelector('form.group\\\\/composer')
        || document;
    const el = composer.querySelector('#prompt-textarea')
        || composer.querySelector('[contenteditable="true"][role="textbox"]')
        || composer.querySelector('[role="textbox"]')
        || composer.querySelector('textarea');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  })()`);

  if (!composerPos) {
    console.log("[connector] composer not found");
    return false;
  }

  await mouseClick(cdp, composerPos.x, composerPos.y);
  await sleep(200);
  await cdp.send("Input.insertText", { text: "/chatgpt-mcp-connector" });
  await sleep(1500);

  const suggestionPos = await jsEval(cdp, `(function() {
    const composer = document.getElementById('prompt-textarea')
        || document.querySelector('[role="textbox"]');
    let best = null, bestArea = Infinity;
    for (const el of document.querySelectorAll('*')) {
        const t = (el.innerText || '').trim().toLowerCase();
        if (!t.includes('chatgpt-mcp-connector')) continue;
        if (composer && (el === composer || composer.contains(el) || el.contains(composer))) continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const area = r.width * r.height;
        if (area < bestArea) { bestArea = area; best = r; }
    }
    if (!best) return null;
    return { x: best.x + best.width / 2, y: best.y + best.height / 2 };
  })()`);

  if (suggestionPos) {
    console.log("[connector] slash suggestion appeared — clicking");
    await mouseClick(cdp, suggestionPos.x, suggestionPos.y);
    await sleep(1000);
    if (await pillActive()) {
      console.log("[connector] activated via slash command");
      return true;
    }
    console.log("[connector] slash click did not produce connector pill");
  } else {
    console.log("[connector] no slash suggestion popup found");
  }

  // Clear typed text before + menu fallback
  await jsEval(cdp, `(function() {
    const composer = document.querySelector('form[data-type="unified-composer"]')
        || document.querySelector('form.group\\\\/composer')
        || document;
    const el = composer.querySelector('#prompt-textarea')
        || composer.querySelector('[contenteditable="true"][role="textbox"]')
        || composer.querySelector('[role="textbox"]')
        || composer.querySelector('textarea');
    if (!el) return;
    el.focus();
    if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
        el.value = '';
        el.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
        document.execCommand('selectAll');
        document.execCommand('delete');
    }
  })()`);
  await sleep(300);

  // Fallback: + menu
  const plusPos = await jsEval(cdp, `(function() {
    const b = document.querySelector('button[data-testid="composer-plus-btn"]');
    if (!b) return null;
    const r = b.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  })()`);

  if (!plusPos) {
    console.log("[connector] no composer-plus-btn found");
    return false;
  }

  await mouseClick(cdp, plusPos.x, plusPos.y);
  await sleep(1000);

  const CONN_POS_JS = `(function() {
    for (const el of document.querySelectorAll('*')) {
        const text = (el.innerText || el.textContent || '').trim().toLowerCase();
        if (text !== 'chatgpt-mcp-connector') continue;
        const s = window.getComputedStyle(el);
        if (s.display === 'none' || parseFloat(s.opacity || '1') < 0.1) continue;
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0)
            return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }
    return null;
  })()`;

  let connPos = await jsEval(cdp, CONN_POS_JS);

  if (!connPos) {
    const morePos = await jsEval(cdp, `(function() {
      const candidates = document.querySelectorAll('button,[role="menuitem"],[role="option"],[role="listitem"]');
      for (const el of candidates) {
          const t = (el.innerText || el.textContent || '').trim();
          if (t !== 'More') continue;
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0)
              return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
      }
      return null;
    })()`);

    if (!morePos) {
      console.log("[connector] no 'More' button found in + popup");
      return false;
    }

    await mouseClick(cdp, morePos.x, morePos.y);
    await sleep(1500);
    connPos = await jsEval(cdp, CONN_POS_JS);

    if (!connPos) {
      console.log("[connector] connector not found after More");
      return false;
    }
  }

  console.log("[connector] connector visible in popup — clicking");
  await mouseClick(cdp, connPos.x, connPos.y);

  for (let i = 0; i < 10; i++) {
    await sleep(500);
    if (await pillActive()) {
      console.log("[connector] activated via + menu");
      return true;
    }
  }

  console.log("[connector] pill did not appear after menu click");
  return false;
}

export { HAS_DENY_JS, APPROVE_POS_JS, APPROVE_CLICK_JS, RATE_LIMIT_GOT_IT_POS_JS, CONNECTOR_CHECK_JS, PAGE_READY_JS };
