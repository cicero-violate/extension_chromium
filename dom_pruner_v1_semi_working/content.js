const DEFAULTS = {
  enabled: true,
  keepLast: 2,
  debug: true
};

const FORCE_HUD = true;
const COMPOSER_ONLY_MODE = true;

let config = { ...DEFAULTS };
let scheduled = false;
let lastPruneAt = 0;
const MIN_PRUNE_INTERVAL_MS = 200;
let composerOnlyApplied = false;
let lastDebug = {
  containerSelector: null,
  countBefore: 0,
  countAfter: 0,
  removed: 0,
  abortReason: null,
  domCount: 0
};
let hudEl = null;

function logDebug(...args) {
  if (config.debug || FORCE_HUD) {
    console.debug("[chat-dom-pruner]", ...args);
  }
}

function updateDebug(patch) {
  lastDebug = { ...lastDebug, ...patch };
  updateHud();
}

function ensureHud() {
  if (hudEl || (!config.debug && !FORCE_HUD)) return;
  hudEl = document.createElement("div");
  hudEl.style.position = "fixed";
  hudEl.style.right = "12px";
  hudEl.style.bottom = "12px";
  hudEl.style.zIndex = "2147483647";
  hudEl.style.background = "rgba(0,0,0,0.75)";
  hudEl.style.color = "#fff";
  hudEl.style.font = "12px/1.4 monospace";
  hudEl.style.padding = "8px 10px";
  hudEl.style.borderRadius = "6px";
  hudEl.style.pointerEvents = "none";
  hudEl.style.maxWidth = "240px";
  document.documentElement.appendChild(hudEl);
}

function removeHud() {
  if (hudEl) {
    hudEl.remove();
    hudEl = null;
  }
}

function updateHud() {
  if (!config.debug && !FORCE_HUD) {
    removeHud();
    return;
  }
  ensureHud();
  if (!hudEl) return;
  const { removed, countBefore, countAfter, abortReason, domCount } = lastDebug;
  hudEl.textContent = [
    "DOM Pruner",
    `dom: ${domCount}`,
    `before: ${countBefore}`,
    `after: ${countAfter}`,
    `removed: ${removed}`,
    abortReason ? `abort: ${abortReason}` : "abort: none"
  ].join("\\n");
  if (COMPOSER_ONLY_MODE) {
    hudEl.textContent += "\\nmode: composer-only";
  }
}

function selectorFor(element) {
  if (!element) return null;
  if (element.id) return `#${CSS.escape(element.id)}`;
  const parts = [];
  let el = element;
  for (let i = 0; i < 3 && el && el.nodeType === Node.ELEMENT_NODE; i += 1) {
    let part = el.tagName.toLowerCase();
    if (el.getAttribute("data-testid")) {
      part += `[data-testid=\"${el.getAttribute("data-testid")}\"]`;
    }
    if (el.classList.length) {
      part += `.${Array.from(el.classList).slice(0, 2).map((c) => CSS.escape(c)).join(".")}`;
    }
    parts.unshift(part);
    el = el.parentElement;
  }
  return parts.join(" > ");
}

function isMessageItem(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
  if (el.matches('[data-testid="conversation-turn"], [data-testid^="conversation-turn"], [data-message-author-role]')) {
    return true;
  }
  if (el.matches("article") && el.querySelector('[data-message-author-role], [data-testid^="conversation-turn"]')) {
    return true;
  }
  return false;
}

function isLikelyMessageNode(node) {
  if (!node) return false;
  if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node;
    if (isMessageItem(el)) return true;
    if (
      el.querySelector &&
      el.querySelector('[data-testid^="conversation-turn"], [data-message-author-role], article')
    ) {
      return true;
    }
  }
  return false;
}

function findMessageItem(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return null;
  if (isMessageItem(el)) return el;
  return el.closest('[data-testid="conversation-turn"], [data-testid^="conversation-turn"], [data-message-author-role], article');
}

function findComposerRoots() {
  const roots = new Set();
  const inputs = Array.from(
    document.querySelectorAll(
      'textarea, div[contenteditable="true"], [role="textbox"], input[type="text"]'
    )
  );
  for (const input of inputs) {
    const root =
      input.closest('[data-testid*="composer"], form, [role="form"], [aria-label*="message" i]') ||
      input.parentElement;
    if (root) roots.add(root);
  }
  return roots;
}

function findComposerElements() {
  const textarea = document.querySelector("textarea");
  const contentEditable = document.querySelector('div[contenteditable="true"]');
  const inputEl = textarea || contentEditable;
  const sendButton = document.querySelector('button[type="submit"], button[data-testid*="send"]');
  const form = inputEl?.closest("form") || sendButton?.closest("form") || null;
  return { inputEl, sendButton, form };
}

function collectAncestors(el, set) {
  let cur = el;
  while (cur) {
    set.add(cur);
    cur = cur.parentElement;
  }
}

function applyComposerOnlyMode() {
  if (!COMPOSER_ONLY_MODE || composerOnlyApplied) return;
  const { inputEl, sendButton, form } = findComposerElements();
  if (!inputEl) return;

  const keep = new Set();
  keep.add(document.documentElement);
  keep.add(document.body);
  if (hudEl) keep.add(hudEl);
  collectAncestors(inputEl, keep);
  if (sendButton) collectAncestors(sendButton, keep);
  if (form) collectAncestors(form, keep);

  const all = document.body ? document.body.querySelectorAll("*") : [];
  for (const el of all) {
    if (keep.has(el)) continue;
    const tag = el.tagName;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "LINK" || tag === "META") continue;
    el.style.display = "none";
  }

  // Stabilize composer layout to avoid relayout on autosize.
  inputEl.style.maxHeight = "140px";
  inputEl.style.height = "140px";
  inputEl.style.overflow = "auto";

  composerOnlyApplied = true;
}

function waitForComposerAndApply() {
  if (!COMPOSER_ONLY_MODE) return;
  applyComposerOnlyMode();
  if (composerOnlyApplied) return;
  const observeTarget = document.body || document.documentElement;
  if (!observeTarget) return;
  const observer = new MutationObserver(() => {
    applyComposerOnlyMode();
    if (composerOnlyApplied) observer.disconnect();
  });
  observer.observe(observeTarget, { childList: true, subtree: true });
}

function collectMessageItems(root) {
  const found = [];
  if (!root) return found;
  try {
    const items = root.querySelectorAll(
      '[data-testid="conversation-turn"], [data-testid^="conversation-turn"], [data-message-author-role], article'
    );
    for (const el of items) {
      const item = findMessageItem(el);
      if (item && item.isConnected) found.push(item);
    }
  } catch {}

  // Recurse into open shadow roots
  try {
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_ELEMENT
    );
    let node = walker.currentNode;
    while (node) {
      if (node.shadowRoot) {
        found.push(...collectMessageItems(node.shadowRoot));
      }
      node = walker.nextNode();
    }
  } catch {}

  return found;
}

function isProtectedNode(el, composerRoots, activeEl, selectionNode) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return true;
  if (el.matches("header, nav, aside, footer, [role=\"navigation\"], [aria-label*=\"sidebar\" i]")) {
    return true;
  }
  if (activeEl && el.contains(activeEl)) return true;
  if (selectionNode && el.contains(selectionNode)) return true;
  for (const root of composerRoots) {
    if (el.contains(root) || root.contains(el)) return true;
  }
  return false;
}

function findContainerAndItems() {
  const items = collectMessageItems(document);
  const uniqueItems = Array.from(new Set(items));
  const uniqueSet = new Set(uniqueItems);
  const topLevelItems = uniqueItems.filter((el) => {
    let parent = el.parentElement;
    while (parent) {
      if (uniqueSet.has(parent)) return false;
      parent = parent.parentElement;
    }
    return true;
  });

  const counts = new Map();
  for (const item of topLevelItems) {
    const parent = item.parentElement;
    if (!parent) continue;
    counts.set(parent, (counts.get(parent) || 0) + 1);
  }

  let container = null;
  let maxCount = 0;
  for (const [parent, count] of counts.entries()) {
    if (count > maxCount) {
      maxCount = count;
      container = parent;
    }
  }

  if (!container) {
    return { container: null, items: [], maxCount: 0 };
  }

  const ordered = Array.from(container.children).filter((child) => isMessageItem(child));
  const fallback = topLevelItems.filter((child) => child.parentElement === container);
  const finalItems = ordered.length ? ordered : fallback;

  return { container, items: finalItems, maxCount };
}

function prune(reason = "auto") {
  updateDebug({ abortReason: null, removed: 0 });

  if (!config.enabled) {
    updateDebug({ abortReason: "disabled" });
    return;
  }

  const keepLast = Number.isInteger(config.keepLast) ? config.keepLast : DEFAULTS.keepLast;
  const { container, items, maxCount } = findContainerAndItems();

  if (!container) {
    updateDebug({ abortReason: "no-container" });
    return;
  }

  updateDebug({ containerSelector: selectorFor(container) });

  if (maxCount < 2 && items.length < 2) {
    updateDebug({ abortReason: "low-confidence" });
    return;
  }

  updateDebug({ countBefore: items.length });
  if (config.debug || FORCE_HUD) {
    updateDebug({ domCount: document.getElementsByTagName("*").length });
  }

  if (items.length <= keepLast) {
    updateDebug({ countAfter: items.length, removed: 0 });
    return;
  }

  const activeEl = document.activeElement;
  const selection = window.getSelection();
  const selectionNode =
    selection && selection.rangeCount > 0 ? selection.getRangeAt(0).commonAncestorContainer : null;
  const composerRoots = findComposerRoots();

  let removed = 0;
  const toRemove = items.slice(0, Math.max(0, items.length - keepLast));

  for (const item of toRemove) {
    if (item === container) continue;
    if (isProtectedNode(item, composerRoots, activeEl, selectionNode)) {
      continue;
    }
    try {
      item.remove();
      removed += 1;
    } catch (err) {
      logDebug("Failed to remove node", err);
    }
  }

  const remaining = findContainerAndItems().items.length;
  updateDebug({
    countAfter: remaining,
    removed,
    abortReason: null,
    domCount: config.debug || FORCE_HUD ? document.getElementsByTagName("*").length : lastDebug.domCount
  });
  logDebug("prune", { reason, before: items.length, after: remaining, removed });
}

function schedulePrune(reason) {
  if (scheduled) return;
  scheduled = true;
  const now = typeof performance !== "undefined" ? performance.now() : Date.now();
  const elapsed = now - lastPruneAt;
  const delay = Math.max(0, MIN_PRUNE_INTERVAL_MS - elapsed);
  const run = () => {
    scheduled = false;
    lastPruneAt = typeof performance !== "undefined" ? performance.now() : Date.now();
    prune(reason);
  };
  if (delay === 0 && typeof requestAnimationFrame === "function") {
    requestAnimationFrame(run);
  } else {
    setTimeout(run, delay || 50);
  }
}

function initObserver() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (!mutation.addedNodes || mutation.addedNodes.length === 0) continue;
      for (const node of mutation.addedNodes) {
        if (isLikelyMessageNode(node)) {
          schedulePrune("mutation");
          return;
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

async function loadConfig() {
  const stored = await chrome.storage.local.get(Object.keys(DEFAULTS));
  config = { ...DEFAULTS, ...stored };
  return config;
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  const patch = {};
  for (const [key, { newValue }] of Object.entries(changes)) {
    patch[key] = newValue;
  }
  config = { ...config, ...patch };
  if (patch.enabled || patch.keepLast || patch.debug) {
    if (patch.debug) {
      updateHud();
    }
    schedulePrune("config-change");
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message?.type === "PRUNE_NOW") {
    schedulePrune("manual");
  }
});

window.__chatPruneDebug = function () {
  return { ...lastDebug };
};

loadConfig().then(() => {
  initObserver();
  schedulePrune("initial");
  waitForComposerAndApply();
});
