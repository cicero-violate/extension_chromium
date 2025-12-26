// Lightweight M-x style palette injected into pages
void function initRcpContentScript() {
  if (typeof window === "undefined") return;
  if (window.__RCP_CONTENT_INITIALIZED) return;
  window.__RCP_CONTENT_INITIALIZED = true;

  const RCP_IDS = {
    overlay: "rcp__overlay",
    box: "rcp__box",
    input: "rcp__input",
    list: "rcp__list"
  };

  const state = {
    open: false,
    root: null,
    input: null,
    list: null,
    items: [],
    filtered: [],
    selectedIndex: 0
  };

  // --- Commands available in the palette ---
  const Commands = [
    {
      id: "hello",
      title: "Say Hello (alert)",
      run: () => alert("Hello from the palette 👋")
    },
    {
      id: "search-selection",
      title: "Search selection on DuckDuckGo",
      run: async () => {
        const sel = (window.getSelection()?.toString() || "").trim();
        if (!sel) return;
        postOpenUrl(
          "https://duckduckgo.com/?q=" + encodeURIComponent(sel)
        );
      }
    },
    {
      id: "copy-url",
      title: "Copy current page URL",
      run: async () => {
        await navigator.clipboard.writeText(location.href);
      }
    },
    {
      id: "copy-md-link",
      title: "Copy as Markdown link: [title](url)",
      run: async () => {
        const md = `[${document.title}](${location.href})`;
        await navigator.clipboard.writeText(md);
      }
    },
    {
      id: "copy-selection",
      title: "Copy selection text",
      run: async () => {
        const sel = window.getSelection()?.toString() || "";
        if (!sel) return;
        await navigator.clipboard.writeText(sel);
      }
    },
    {
      id: "view-source",
      title: "Open view-source of this page",
      run: () => postOpenUrl("view-source:" + location.href)
    },
    {
      id: "scroll-top",
      title: "Scroll to top",
      run: () => window.scrollTo({ top: 0, behavior: "smooth" })
    },
    {
      id: "scroll-bottom",
      title: "Scroll to bottom",
      run: () =>
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth"
        })
    },
    {
      id: "toggle-invert",
      title: "Toggle page invert (quick dark hack)",
      run: () => {
        document.documentElement.classList.toggle("rcp__invert");
      }
    }
  ];

  function postOpenUrl(url) {
    chrome.runtime.sendMessage({ type: "RCP_OPEN_URL", url });
  }

  // --- UI creation ---
  function ensureRoot() {
    if (state.root && document.body.contains(state.root)) return;

    const overlay = document.createElement("div");
    overlay.id = RCP_IDS.overlay;
    overlay.className = "rcp__overlay";
    overlay.style.display = "none";

    const box = document.createElement("div");
    box.id = RCP_IDS.box;
    box.className = "rcp__box";

    const input = document.createElement("input");
    input.id = RCP_IDS.input;
    input.className = "rcp__input";
    input.type = "text";
    input.placeholder = "M-x … (type a command, ↑/↓, Enter, Esc)";

    const list = document.createElement("ul");
    list.id = RCP_IDS.list;
    list.className = "rcp__list";

    box.appendChild(input);
    box.appendChild(list);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    state.root = overlay;
    state.input = input;
    state.list = list;

    // Prevent page shortcuts while palette is open
    overlay.addEventListener(
      "keydown",
      (e) => {
        if (!state.open) return;
        e.stopPropagation();
      },
      { capture: true }
    );

    // Input handlers
    input.addEventListener("input", () => filterAndRender());

    input.addEventListener("keydown", (e) => {
      if (!state.open) return;
      if (handlePaletteKey(e)) {
        e.preventDefault();
        e.stopPropagation();
      }
    });

    // Click to run
    list.addEventListener("click", (e) => {
      const li = e.target.closest("li[data-index]");
      if (!li) return;
      state.selectedIndex = Number(li.dataset.index);
      runSelected();
    });

    // Base items
    state.items = Commands.slice(0);
    state.filtered = state.items;

    renderList();
  }

  function openPalette() {
    ensureRoot();
    state.open = true;
    state.root.style.display = "block";
    state.input.value = "";
    state.selectedIndex = 0;
    filterAndRender();
    state.input.focus({ preventScroll: true });
  }

  function closePalette() {
    if (!state.root) return;
    state.open = false;
    state.root.style.display = "none";
  }

  function moveSelection(delta) {
    if (!state.filtered.length) return;
    state.selectedIndex =
      (state.selectedIndex + delta + state.filtered.length) %
      state.filtered.length;
    updateActive();
  }

  function runSelected() {
    const item = state.filtered[state.selectedIndex];
    if (!item) return;
    closePalette();
    Promise.resolve(item.run()).catch((e) =>
      console.error("[RCP] command error", e)
    );
  }

  function renderList() {
    state.list.innerHTML = "";

    state.filtered.forEach((item, idx) => {
      const li = document.createElement("li");
      li.dataset.index = String(idx);
      li.className =
        "rcp__item" +
        (idx === state.selectedIndex ? " rcp__item--active" : "");
      li.textContent = item.title;
      state.list.appendChild(li);
    });
  }

  function updateActive() {
    const nodes = state.list.querySelectorAll(".rcp__item");
    nodes.forEach((n, i) => {
      if (i === state.selectedIndex)
        n.classList.add("rcp__item--active");
      else n.classList.remove("rcp__item--active");
    });
  }

  // Simple fuzzy: case-insensitive substring with score (earlier index = better)
  function filterAndRender() {
    const q = state.input.value.trim().toLowerCase();

    if (!q) {
      state.filtered = state.items;
    } else {
      const scored = state.items
        .map((it) => {
          const t = it.title.toLowerCase();
          const idx = t.indexOf(q);
          return idx >= 0 ? { it, score: idx } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.score - b.score)
        .map((x) => x.it);

      state.filtered = scored;
    }

    state.selectedIndex = 0;
    renderList();
  }

  // --- Messaging from background ---
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg?.type === "RCP_TOGGLE_PALETTE") {
      if (state.open) closePalette();
      else openPalette();
    }
  });

  // Allow ESC to close even if focus drifts
  document.addEventListener("keydown", (e) => {
    if (!state.open) return;
    if (handlePaletteKey(e)) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  function handlePaletteKey(event) {
    switch (event.key) {
      case "Escape":
        closePalette();
        return true;

      case "ArrowDown":
        moveSelection(1);
        return true;

      case "ArrowUp":
        moveSelection(-1);
        return true;

      case "Enter":
        runSelected();
        return true;

      default:
        return false;
    }
  }
}();
