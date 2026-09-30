(function () {
  if (window.__ChatGPTPerfOverrideInstalled) return;
  if (location.hostname === "gemini.google.com") return;
  window.__ChatGPTPerfOverrideInstalled = true;

  const CFG = {
    minTurnsBeforeFreezing: 24,
    keepRecentTurns: 12,
    restoreBufferTurns: 4,
    viewportBufferPx: 1200,
    minPlaceholderHeight: 72,
    previewChars: 220,
  };

  const state = {
    frozen: new Map(),
    raf: null,
    observer: null,
    overlayObserver: null,
    overlayHidden: true,
  };

  const OVERLAY_CFG = {
    matchText: "DOM Contain mode",
    storageKey: "cgptPerfOverlayState",
    defaultPosition: { left: 16, top: 16 },
    toggleKey: { ctrl: true, shift: true, key: "h" },
  };

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[ch] || ch));
  }

  function installStyles() {
    if (document.getElementById("cgpt-perf-override-style")) return;
    const style = document.createElement("style");
    style.id = "cgpt-perf-override-style";
    style.textContent = `
      .cgpt-perf-placeholder {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 8px;
        padding: 12px 14px;
        border: 1px solid rgba(127,127,127,.22);
        border-radius: 16px;
        background: rgba(127,127,127,.08);
        color: inherit;
        text-align: left;
        cursor: pointer;
      }
      .cgpt-perf-placeholder:hover {
        background: rgba(127,127,127,.12);
      }
      .cgpt-perf-placeholder__label {
        font-size: 12px;
        line-height: 16px;
        opacity: .75;
        text-transform: uppercase;
        letter-spacing: .04em;
      }
      .cgpt-perf-placeholder__text {
        font-size: 14px;
        line-height: 20px;
        opacity: .95;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .cgpt-perf-placeholder__hint {
        font-size: 12px;
        line-height: 16px;
        opacity: .65;
      }
      section[data-perf-frozen="true"] {
        content-visibility: auto;
        contain: layout style paint;
      }
      [data-cgpt-overlay-managed="true"] {
        touch-action: none;
        user-select: none;
      }
    `;
    document.head.appendChild(style);
  }

  function loadOverlayPrefs() {
    try {
      const raw = localStorage.getItem(OVERLAY_CFG.storageKey);
      if (!raw) {
        return {
          hidden: true,
          left: OVERLAY_CFG.defaultPosition.left,
          top: OVERLAY_CFG.defaultPosition.top,
        };
      }
      const parsed = JSON.parse(raw);
      return {
        hidden: parsed.hidden !== false,
        left: Number.isFinite(parsed.left) ? parsed.left : OVERLAY_CFG.defaultPosition.left,
        top: Number.isFinite(parsed.top) ? parsed.top : OVERLAY_CFG.defaultPosition.top,
      };
    } catch {
      return {
        hidden: true,
        left: OVERLAY_CFG.defaultPosition.left,
        top: OVERLAY_CFG.defaultPosition.top,
      };
    }
  }

  function saveOverlayPrefs(prefs) {
    try {
      localStorage.setItem(OVERLAY_CFG.storageKey, JSON.stringify(prefs));
    } catch {}
  }

  function looksLikeContainOverlay(el) {
    if (!(el instanceof HTMLElement)) return false;
    const text = (el.textContent || "").replace(/\s+/g, " ").trim();
    if (!text || !text.includes(OVERLAY_CFG.matchText)) return false;
    const style = getComputedStyle(el);
    return style.position === "fixed" || style.position === "absolute";
  }

  function findContainOverlay() {
    const nodes = document.querySelectorAll("body *");
    for (const el of nodes) {
      if (looksLikeContainOverlay(el)) return el;
    }
    return null;
  }

  function applyOverlayPosition(el, prefs) {
    el.dataset.cgptOverlayManaged = "true";
    el.style.position = "fixed";
    el.style.left = `${Math.max(0, Math.round(prefs.left))}px`;
    el.style.top = `${Math.max(0, Math.round(prefs.top))}px`;
    el.style.right = "auto";
    el.style.bottom = "auto";
    el.style.zIndex = "2147483647";
    el.style.maxWidth = "min(560px, calc(100vw - 24px))";
    el.style.cursor = "move";
  }

  function applyOverlayVisibility(el, prefs) {
    state.overlayHidden = !!prefs.hidden;
    if (prefs.hidden) {
      el.style.display = "none";
      el.setAttribute("aria-hidden", "true");
    } else {
      el.style.display = "";
      el.removeAttribute("aria-hidden");
    }
  }

  function syncContainOverlay() {
    const overlay = findContainOverlay();
    if (!overlay) return;
    const prefs = loadOverlayPrefs();
    applyOverlayPosition(overlay, prefs);
    applyOverlayVisibility(overlay, prefs);
    installOverlayDrag(overlay);
  }

  function setOverlayHidden(hidden) {
    const prefs = loadOverlayPrefs();
    prefs.hidden = !!hidden;
    saveOverlayPrefs(prefs);
    const overlay = findContainOverlay();
    if (overlay) applyOverlayVisibility(overlay, prefs);
  }

  function toggleOverlayHidden() {
    setOverlayHidden(!state.overlayHidden);
  }

  function installOverlayDrag(overlay) {
    if (overlay.dataset.cgptOverlayDragInstalled === "true") return;
    overlay.dataset.cgptOverlayDragInstalled = "true";

    let drag = null;
    overlay.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      const prefs = loadOverlayPrefs();
      drag = {
        pointerId: event.pointerId,
        dx: event.clientX - prefs.left,
        dy: event.clientY - prefs.top,
      };
      try {
        overlay.setPointerCapture(event.pointerId);
      } catch {}
      event.preventDefault();
      event.stopPropagation();
    });

    overlay.addEventListener("pointermove", (event) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      const next = {
        hidden: false,
        left: Math.max(0, event.clientX - drag.dx),
        top: Math.max(0, event.clientY - drag.dy),
      };
      saveOverlayPrefs(next);
      applyOverlayPosition(overlay, next);
      applyOverlayVisibility(overlay, next);
      event.preventDefault();
      event.stopPropagation();
    });

    function stopDrag(event) {
      if (!drag || event.pointerId !== drag.pointerId) return;
      drag = null;
      try {
        overlay.releasePointerCapture(event.pointerId);
      } catch {}
      event.preventDefault();
      event.stopPropagation();
    }

    overlay.addEventListener("pointerup", stopDrag);
    overlay.addEventListener("pointercancel", stopDrag);
  }

  function installOverlayControls() {
    document.addEventListener(
      "keydown",
      (event) => {
        const wantCtrl = !!OVERLAY_CFG.toggleKey.ctrl;
        const wantShift = !!OVERLAY_CFG.toggleKey.shift;
        if (!!event.ctrlKey !== wantCtrl) return;
        if (!!event.shiftKey !== wantShift) return;
        if (String(event.key || "").toLowerCase() !== OVERLAY_CFG.toggleKey.key) return;
        toggleOverlayHidden();
        event.preventDefault();
        event.stopPropagation();
      },
      true
    );

    if (state.overlayObserver) return;
    state.overlayObserver = new MutationObserver(() => {
      syncContainOverlay();
    });
    state.overlayObserver.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });
    syncContainOverlay();
  }

  function getTurns() {
    return Array.from(document.querySelectorAll("section[data-turn-id]"));
  }

  function getRole(section) {
    return section.getAttribute("data-turn") ||
      section.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role") ||
      "turn";
  }

  function extractPreview(section) {
    const role = getRole(section);
    const parts = [];
    const nodes = section.querySelectorAll(
      "[data-message-author-role], p, li, pre, code, h1, h2, h3, h4, h5, h6"
    );
    for (const node of nodes) {
      const text = (node.innerText || node.textContent || "").replace(/\s+/g, " ").trim();
      if (!text) continue;
      parts.push(text);
      if (parts.join(" ").length >= CFG.previewChars) break;
    }
    let text = parts.join(" ").trim() || `${role} turn`;
    if (text.length > CFG.previewChars) {
      text = `${text.slice(0, CFG.previewChars - 1)}…`;
    }
    return { role, text };
  }

  function makePlaceholder(section, height) {
    const { role, text } = extractPreview(section);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "cgpt-perf-placeholder";
    button.dataset.perfPlaceholder = "true";
    button.dataset.turnId = section.dataset.turnId || "";
    button.style.minHeight = `${Math.max(height, CFG.minPlaceholderHeight)}px`;
    button.innerHTML = `
      <div class="cgpt-perf-placeholder__label">${escapeHtml(role)} turn hidden for performance</div>
      <div class="cgpt-perf-placeholder__text">${escapeHtml(text)}</div>
      <div class="cgpt-perf-placeholder__hint">Click to restore this turn.</div>
    `;
    button.addEventListener("click", () => restoreTurn(section, { scrollIntoView: true }));
    return button;
  }

  function freezeTurn(section) {
    if (!section?.isConnected || state.frozen.has(section)) return;
    const originalChildren = Array.from(section.childNodes);
    if (!originalChildren.length) return;
    const height = Math.max(
      CFG.minPlaceholderHeight,
      section.getBoundingClientRect().height || 0,
      section.offsetHeight || 0,
      section.scrollHeight || 0,
    );
    const placeholder = makePlaceholder(section, height);
    state.frozen.set(section, { originalChildren, placeholder, height });
    section.replaceChildren(placeholder);
    section.dataset.perfFrozen = "true";
  }

  function restoreTurn(section, opts = {}) {
    const saved = state.frozen.get(section);
    if (!saved) return;
    section.replaceChildren(...saved.originalChildren);
    section.dataset.perfFrozen = "false";
    state.frozen.delete(section);
    if (opts.scrollIntoView) {
      section.scrollIntoView({ block: "nearest" });
    }
  }

  function liveSet(turns) {
    const live = new Set();
    const total = turns.length;
    const tailStart = Math.max(0, total - CFG.keepRecentTurns);

    for (let i = tailStart; i < total; i += 1) {
      live.add(turns[i]);
    }

    const top = -CFG.viewportBufferPx;
    const bottom = (window.innerHeight || document.documentElement.clientHeight) + CFG.viewportBufferPx;
    const visibleIndexes = [];

    for (let i = 0; i < total; i += 1) {
      const rect = turns[i].getBoundingClientRect();
      if (rect.bottom >= top && rect.top <= bottom) {
        visibleIndexes.push(i);
      }
    }

    if (visibleIndexes.length) {
      const lo = Math.max(0, Math.min(...visibleIndexes) - CFG.restoreBufferTurns);
      const hi = Math.min(total - 1, Math.max(...visibleIndexes) + CFG.restoreBufferTurns);
      for (let i = lo; i <= hi; i += 1) {
        live.add(turns[i]);
      }
    }

    return live;
  }

  function reconcile() {
    state.raf = null;

    const turns = getTurns();
    if (turns.length < CFG.minTurnsBeforeFreezing) {
      for (const turn of turns) restoreTurn(turn);
      return;
    }

    const live = liveSet(turns);
    const freezeBefore = Math.max(0, turns.length - CFG.keepRecentTurns);

    for (let i = 0; i < turns.length; i += 1) {
      const turn = turns[i];
      if (live.has(turn)) {
        restoreTurn(turn);
      } else if (i < freezeBefore) {
        freezeTurn(turn);
      }
    }
  }

  function scheduleReconcile() {
    if (state.raf != null) return;
    state.raf = window.requestAnimationFrame(reconcile);
  }

  function onMutations(mutations) {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        if (node.matches?.("section[data-turn-id]") || node.querySelector?.("section[data-turn-id]")) {
          scheduleReconcile();
          return;
        }
      }
      for (const node of mutation.removedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        if (node.matches?.("section[data-turn-id]") || node.querySelector?.("section[data-turn-id]")) {
          scheduleReconcile();
          return;
        }
      }
    }
  }

  function init() {
    installStyles();
    installOverlayControls();
    state.observer = new MutationObserver(onMutations);
    state.observer.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true,
    });
    window.addEventListener("scroll", scheduleReconcile, { passive: true });
    window.addEventListener("resize", scheduleReconcile, { passive: true });
    document.addEventListener("visibilitychange", scheduleReconcile, { passive: true });
    scheduleReconcile();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
