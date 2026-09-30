const DEFAULTS = {
  enabled: true,
  debug: false,
  hideHud: false
};

const FORCE_HUD = true;
const STYLE_ID = "chat-contain-style";
const TURN_SELECTOR = '[data-testid*="conversation-turn"]';
const SCROLLER_ATTR = "data-chat-scroller";

// content-visibility:auto  — browser skips layout+paint for off-screen turns.
// contain-intrinsic-size   — fallback height before first render; auto caches real size after.
// [data-chat-scroller]     — stamped on the main scroll container at runtime;
//                            contain:layout style prevents cascades from escaping it.
const CONTAIN_CSS = `
${TURN_SELECTOR} {
  content-visibility: auto;
  contain-intrinsic-size: auto 1200px;
}
[${SCROLLER_ATTR}] {
  contain: layout style;
}
`;

let config = { ...DEFAULTS };
let hudEl = null;
let lastStats = { turns: 0, domNodes: 0, scrollerFound: false };

// ---- logging ----

function logDebug(...args) {
  if (config.debug || FORCE_HUD) console.debug("[chat-contain]", ...args);
}

// ---- HUD ----

function ensureHud() {
  if (config.hideHud || hudEl || (!config.debug && !FORCE_HUD)) return;
  hudEl = document.createElement("div");
  hudEl.style.cssText =
    "position:fixed;right:12px;top:50%;transform:translateY(-50%);z-index:2147483647;" +
    "background:rgba(0,0,0,0.75);color:#fff;font:12px/1.4 monospace;" +
    "padding:8px 10px;border-radius:6px;pointer-events:none;max-width:240px;";
  document.documentElement.appendChild(hudEl);
}

function removeHud() {
  if (hudEl) { hudEl.remove(); hudEl = null; }
}

function updateHud() {
  if (config.hideHud) { removeHud(); return; }
  if (!config.debug && !FORCE_HUD) { removeHud(); return; }
  ensureHud();
  if (!hudEl) return;
  hudEl.textContent = [
    "DOM Contain",
    `mode: ${config.enabled ? "containment" : "disabled"}`,
    `turns: ${lastStats.turns}`,
    `dom: ${lastStats.domNodes}`,
    `scroller: ${lastStats.scrollerFound ? "found" : "–"}`,
    `fetch: throttled`
  ].join("\n");
}

// ---- CSS injection ----

function injectStyle() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CONTAIN_CSS;
  (document.head || document.documentElement).appendChild(style);
  logDebug("style injected");
}

function removeStyle() {
  const el = document.getElementById(STYLE_ID);
  if (el) { el.remove(); logDebug("style removed"); }
}

// ---- scroller stamping ----
// Finds the main scroll container (the large overflow:auto div) and stamps it
// so the CSS rule [data-chat-scroller] can apply contain:layout style to it.
// Only iterates divs when the scroller isn't already stamped in the DOM.

function findAndStampScroller() {
  if (document.querySelector(`[${SCROLLER_ATTR}]`)) return true;
  for (const el of document.querySelectorAll("div")) {
    const s = window.getComputedStyle(el);
    if (
      (s.overflowY === "auto" || s.overflowY === "scroll") &&
      el.clientHeight > 400 &&
      el.scrollHeight > 5000
    ) {
      el.setAttribute(SCROLLER_ATTR, "true");
      logDebug("scroller stamped", el.className.slice(0, 80));
      return true;
    }
  }
  return false;
}

// ---- page-world script injection ----
// page_patch.js must run in page world to access window.fetch.
// Content scripts are sandboxed and cannot patch page globals directly.

function injectPageScript(src) {
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL(src);
  (document.head || document.documentElement).appendChild(s);
  s.onload = () => s.remove();
}

// ---- stats ----

function refreshStats() {
  lastStats = {
    turns: document.querySelectorAll(TURN_SELECTOR).length,
    domNodes: document.querySelectorAll("*").length,
    scrollerFound: !!document.querySelector(`[${SCROLLER_ATTR}]`)
  };
}

// ---- apply / disable ----

function apply() {
  if (config.enabled) {
    injectStyle();
    findAndStampScroller();
  } else {
    removeStyle();
  }
  refreshStats();
  updateHud();
}

// ---- MutationObserver ----
// Re-injects style and re-stamps scroller if SPA navigation rebuilds the DOM.
// Scroller scan only runs when the attribute is absent (avoids full div scan every frame).

let observerScheduled = false;

function scheduleCheck() {
  if (observerScheduled) return;
  observerScheduled = true;
  requestAnimationFrame(() => {
    observerScheduled = false;
    if (config.enabled) {
      if (!document.getElementById(STYLE_ID)) injectStyle();
      if (!document.querySelector(`[${SCROLLER_ATTR}]`)) findAndStampScroller();
    }
    refreshStats();
    updateHud();
  });
}

function initObserver() {
  const observer = new MutationObserver(scheduleCheck);
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

// ---- config ----

async function loadConfig() {
  const stored = await chrome.storage.local.get(Object.keys(DEFAULTS));
  config = { ...DEFAULTS, ...stored };
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  for (const [key, { newValue }] of Object.entries(changes)) {
    config[key] = newValue;
  }
  apply();
});

// ---- debug API ----

window.__chatContainDebug = function () {
  refreshStats();
  return {
    ...lastStats,
    enabled: config.enabled,
    stylePresent: !!document.getElementById(STYLE_ID),
    fetchThrottled: !!window.__chatFetchThrottleInstalled
  };
};

// ---- init ----

loadConfig().then(() => {
  // page_patch.js patches window.fetch — inject unconditionally so it's ready
  // before the user sends the first message. CSS containment respects config.enabled.
  injectPageScript("page_patch.js");
  apply();
  initObserver();
});
