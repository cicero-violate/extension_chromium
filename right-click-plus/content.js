/* content.js — Emacs-style (M-x) command palette injected into every page.
 *
 * Opened/closed with Alt+X (or the toolbar icon) via a RCP_TOGGLE_PALETTE
 * message from the service worker. Typing filters; ArrowUp/Down move the
 * selection; Enter runs it; Esc (or a click on the backdrop) closes it.
 */
void (function initRcpPalette() {
  if (typeof window === "undefined" || window.__RCP_CONTENT_INITIALIZED) return;
  window.__RCP_CONTENT_INITIALIZED = true;

  const state = {
    open: false,
    root: null,
    input: null,
    list: null,
    items: [],
    filtered: [],
    selectedIndex: 0,
  };

  // ---------- Small helpers ----------
  function sendMessage(msg) {
    try {
      chrome.runtime?.sendMessage(msg);
    } catch (_) {
      /* extension context invalidated (e.g. after a reload) — ignore */
    }
  }

  const openUrl = (url) => sendMessage({ type: "RCP_OPEN_URL", url });
  const selectionText = () => (window.getSelection()?.toString() || "").trim();

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch (_) {
        /* nothing else to try */
      }
      ta.remove();
    }
  }

  function clearHighlights() {
    document.querySelectorAll("mark.rcp__highlight").forEach((mark) => {
      const parent = mark.parentNode;
      if (!parent) return;
      parent.replaceChild(document.createTextNode(mark.textContent || ""), mark);
      parent.normalize();
    });
  }

  // ---------- Commands ----------
  const Commands = [
    {
      id: "search-selection",
      title: "Search selection on DuckDuckGo",
      run: () => {
        const s = selectionText();
        if (s) openUrl("https://duckduckgo.com/?q=" + encodeURIComponent(s));
      },
    },
    {
      id: "copy-url",
      title: "Copy current page URL",
      run: () => copy(location.href),
    },
    {
      id: "copy-md-link",
      title: "Copy page as Markdown link — [title](url)",
      run: () => copy(`[${document.title}](${location.href})`),
    },
    {
      id: "copy-selection",
      title: "Copy selection text",
      run: () => {
        const s = selectionText();
        if (s) return copy(s);
      },
    },
    {
      id: "view-source",
      title: "Open view-source of this page",
      run: () => openUrl("view-source:" + location.href),
    },
    {
      id: "scroll-top",
      title: "Scroll to top",
      run: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    {
      id: "scroll-bottom",
      title: "Scroll to bottom",
      run: () =>
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        }),
    },
    {
      id: "toggle-invert",
      title: "Toggle page invert (quick dark mode)",
      run: () => document.documentElement.classList.toggle("rcp__invert"),
    },
    {
      id: "clear-highlights",
      title: "Clear all highlights",
      run: clearHighlights,
    },
  ];

  // ---------- UI ----------
  function ensureRoot() {
    if (state.root && document.body.contains(state.root)) return;

    const overlay = document.createElement("div");
    overlay.id = "rcp__overlay";
    overlay.className = "rcp__overlay";
    overlay.hidden = true;

    const box = document.createElement("div");
    box.id = "rcp__box";
    box.className = "rcp__box";

    const input = document.createElement("input");
    input.id = "rcp__input";
    input.className = "rcp__input";
    input.type = "text";
    input.autocomplete = "off";
    input.spellcheck = false;
    input.placeholder = "M-x … (type to filter · ↑/↓ · Enter · Esc)";

    const list = document.createElement("ul");
    list.id = "rcp__list";
    list.className = "rcp__list";

    box.append(input, list);
    overlay.append(box);
    document.body.appendChild(overlay);

    state.root = overlay;
    state.input = input;
    state.list = list;

    input.addEventListener("input", filterAndRender);

    overlay.addEventListener("mousedown", (e) => {
      if (e.target === overlay) closePalette();
    });

    list.addEventListener("click", (e) => {
      const li = e.target.closest("li[data-index]");
      if (!li) return;
      state.selectedIndex = Number(li.dataset.index);
      runSelected();
    });

    state.items = Commands.slice();
    state.filtered = state.items;
    renderList();
  }

  function openPalette() {
    ensureRoot();
    state.open = true;
    state.root.hidden = false;
    state.input.value = "";
    state.selectedIndex = 0;
    filterAndRender();
    state.input.focus({ preventScroll: true });
  }

  function closePalette() {
    state.open = false;
    if (state.root) state.root.hidden = true;
  }

  function moveSelection(delta) {
    if (!state.filtered.length) return;
    const n = state.filtered.length;
    state.selectedIndex = (state.selectedIndex + delta + n) % n;
    updateActive();
  }

  function runSelected() {
    const item = state.filtered[state.selectedIndex];
    if (!item) return;
    closePalette();
    Promise.resolve()
      .then(() => item.run())
      .catch((e) => console.error("[RCP] command error:", e));
  }

  function renderList() {
    state.list.textContent = "";

    if (!state.filtered.length) {
      const li = document.createElement("li");
      li.className = "rcp__item rcp__item--empty";
      li.textContent = "No matching commands";
      state.list.appendChild(li);
      return;
    }

    const frag = document.createDocumentFragment();
    state.filtered.forEach((item, idx) => {
      const li = document.createElement("li");
      li.dataset.index = String(idx);
      li.className =
        "rcp__item" + (idx === state.selectedIndex ? " rcp__item--active" : "");
      li.textContent = item.title;
      frag.appendChild(li);
    });
    state.list.appendChild(frag);
  }

  function updateActive() {
    const nodes = state.list.querySelectorAll("li[data-index]");
    nodes.forEach((n, i) => {
      const active = i === state.selectedIndex;
      n.classList.toggle("rcp__item--active", active);
      if (active) n.scrollIntoView({ block: "nearest" });
    });
  }

  // Case-insensitive substring match, ranked by match position.
  function filterAndRender() {
    const q = state.input.value.trim().toLowerCase();
    state.filtered = !q
      ? state.items
      : state.items
          .map((it) => ({ it, score: it.title.toLowerCase().indexOf(q) }))
          .filter((x) => x.score >= 0)
          .sort((a, b) => a.score - b.score)
          .map((x) => x.it);
    state.selectedIndex = 0;
    renderList();
  }

  // ---------- Wiring ----------
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg?.type !== "RCP_TOGGLE_PALETTE") return;
    if (state.open) closePalette();
    else openPalette();
  });

  // One capture-phase handler. While the palette is open we swallow keydowns so
  // the page's own shortcuts stay quiet; typing still reaches the focused input
  // (stopPropagation does not cancel the default action) and fires `input`.
  window.addEventListener(
    "keydown",
    (e) => {
      if (!state.open) return;
      e.stopPropagation();
      switch (e.key) {
        case "Escape":
          closePalette();
          e.preventDefault();
          break;
        case "ArrowDown":
          moveSelection(1);
          e.preventDefault();
          break;
        case "ArrowUp":
          moveSelection(-1);
          e.preventDefault();
          break;
        case "Tab":
          moveSelection(e.shiftKey ? -1 : 1);
          e.preventDefault();
          break;
        case "Enter":
          runSelected();
          e.preventDefault();
          break;
      }
    },
    true
  );
})();
