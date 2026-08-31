/* background.js — MV3 service worker for "Right-Click Plus + Palette".
 *
 * Responsibilities:
 *   - build the page context menu and act on clicks
 *   - toggle the command palette (keyboard command + toolbar icon)
 *   - open URLs requested by the palette content script
 *
 * palette.css / content.js are declared as content scripts in the manifest, so
 * they load automatically on every page. We only inject them by hand for tabs
 * that were already open when the extension was installed or updated.
 */

// ---------- URL helpers ----------
const RESTRICTED_PREFIXES = [
  "chrome://",
  "edge://",
  "brave://",
  "about:",
  "devtools://",
  "view-source:",
  "chrome-extension://",
  "moz-extension://",
  "https://chrome.google.com/webstore",
  "https://chromewebstore.google.com",
];

function isRestrictedUrl(url) {
  if (!url) return true;
  return RESTRICTED_PREFIXES.some((prefix) => url.startsWith(prefix));
}

async function getActiveTab(tab) {
  if (tab && tab.id != null) return tab;
  const [active] = await chrome.tabs.query({ active: true, currentWindow: true });
  return active || null;
}

// ---------- Scripting helpers ----------
async function execScript(tabId, opts) {
  try {
    return await chrome.scripting.executeScript({ target: { tabId }, ...opts });
  } catch (e) {
    console.warn("[RCP] executeScript failed:", e);
    return null;
  }
}

async function injectPalette(tabId) {
  try {
    await chrome.scripting.insertCSS({ target: { tabId }, files: ["palette.css"] });
  } catch (_) {
    /* already present or blocked — fine */
  }
  await execScript(tabId, { files: ["content.js"] });
}

async function togglePalette(tab) {
  tab = await getActiveTab(tab);
  if (!tab || tab.id == null || isRestrictedUrl(tab.url || "")) return;

  const message = { type: "RCP_TOGGLE_PALETTE" };
  try {
    await chrome.tabs.sendMessage(tab.id, message);
  } catch (_) {
    // Content script not there yet (tab predates install) — inject and retry.
    await injectPalette(tab.id);
    try {
      await chrome.tabs.sendMessage(tab.id, message);
    } catch (e) {
      console.warn("[RCP] togglePalette failed after inject:", e);
    }
  }
}

async function copyInPage(tabId, text) {
  await execScript(tabId, {
    args: [text],
    func: async (value) => {
      try {
        await navigator.clipboard.writeText(value);
      } catch (_) {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
        } catch (_) {
          /* give up silently */
        }
        ta.remove();
      }
    },
  });
}

/* Injected into the page. Must be fully self-contained (it is serialised via
 * Function.prototype.toString by chrome.scripting). Highlights every match of
 * `selection`, or removes the highlight if that exact group is already active.
 *
 *   mode "exact" — highlight the literal selected string
 *   mode "words" — highlight each distinct whole word in the selection
 */
function highlightInPage(selection, mode) {
  const COLORS = [
    "#fff59d", "#c8e6c9", "#ffcc80", "#e1bee7", "#b3e5fc", "#ffcdd2",
    "#d1c4e9", "#f0f4c3", "#ffe0b2", "#bbdefb", "#f8bbd0", "#dcedc8",
  ];
  const SKIP_TAGS = new Set([
    "SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "MARK",
  ]);
  const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  let groupKey;
  let regex;
  if (mode === "words") {
    const words = Array.from(
      new Set(
        selection
          .split(/\s+/)
          .map((w) => w.trim().toLowerCase())
          .filter(Boolean)
      )
    );
    if (!words.length) return;
    groupKey = "words:" + words.slice().sort().join("|");
    regex = new RegExp("\\b(" + words.map(escapeRe).join("|") + ")\\b", "gi");
  } else {
    const term = selection.trim();
    if (!term) return;
    groupKey = "exact:" + term.toLowerCase();
    regex = new RegExp(escapeRe(term), "gi");
  }

  // Toggle off: if this group is already highlighted, unwrap it and stop.
  const existing = Array.from(
    document.querySelectorAll("mark.rcp__highlight")
  ).filter((m) => m.dataset.rcpGroup === groupKey);
  if (existing.length) {
    existing.forEach((mark) => {
      const parent = mark.parentNode;
      if (!parent) return;
      parent.replaceChild(document.createTextNode(mark.textContent || ""), mark);
      parent.normalize();
    });
    return;
  }

  if (!document.body) return;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const targets = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const parent = node.parentElement;
    if (!parent || SKIP_TAGS.has(parent.tagName)) continue;
    if (parent.closest("mark.rcp__highlight")) continue;
    regex.lastIndex = 0;
    if (regex.test(node.nodeValue)) targets.push(node);
  }
  if (!targets.length) return;

  const idx = ((window.__rcpColorIndex ?? -1) + 1) % COLORS.length;
  window.__rcpColorIndex = idx;
  const color = COLORS[idx];

  targets.forEach((node) => {
    const text = node.nodeValue;
    const frag = document.createDocumentFragment();
    let last = 0;
    let match;
    regex.lastIndex = 0;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > last) {
        frag.appendChild(document.createTextNode(text.slice(last, match.index)));
      }
      const mark = document.createElement("mark");
      mark.className = "rcp__highlight";
      mark.dataset.rcpGroup = groupKey;
      mark.style.setProperty("background-color", color, "important");
      mark.textContent = match[0];
      frag.appendChild(mark);
      last = match.index + match[0].length;
      if (match[0].length === 0) regex.lastIndex++; // guard against zero-width matches
    }
    if (last < text.length) {
      frag.appendChild(document.createTextNode(text.slice(last)));
    }
    node.parentNode.replaceChild(frag, node);
  });
}

// ---------- Context menu ----------
const MENU_ITEMS = [
  { id: "rcp_search_selection", title: "Search selection…", contexts: ["selection"] },
  { id: "rcp_highlight_exact", title: "Highlight selection (exact)", contexts: ["selection"] },
  { id: "rcp_highlight_words", title: "Highlight each word (toggle)", contexts: ["selection"] },
  { id: "rcp_copy_link", title: "Copy link URL", contexts: ["link"] },
  { id: "rcp_image_info", title: "Image info → src", contexts: ["image"] },
];

function buildMenus() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "rcp_root",
      title: "Right-Click Plus",
      contexts: ["all"],
    });
    for (const item of MENU_ITEMS) {
      chrome.contextMenus.create({ ...item, parentId: "rcp_root" });
    }
  });
}

chrome.runtime.onInstalled.addListener(() => {
  buildMenus();
  // Make the palette available on tabs that were open before install/update.
  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      if (tab.id != null && !isRestrictedUrl(tab.url || "")) injectPalette(tab.id);
    }
  });
});

// Context menus can be dropped when the service worker is recycled.
chrome.runtime.onStartup.addListener(buildMenus);

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  try {
    tab = await getActiveTab(tab);
    if (!tab || tab.id == null || isRestrictedUrl(tab.url || "")) return;

    switch (info.menuItemId) {
      case "rcp_search_selection": {
        const q = (info.selectionText || "").trim();
        if (!q) return;
        await chrome.tabs.create({
          url: "https://duckduckgo.com/?q=" + encodeURIComponent(q),
          index: (tab.index ?? 0) + 1,
        });
        break;
      }

      case "rcp_copy_link": {
        if (info.linkUrl) await copyInPage(tab.id, info.linkUrl);
        break;
      }

      case "rcp_image_info": {
        if (!info.srcUrl) return;
        await execScript(tab.id, {
          args: [info.srcUrl],
          func: (src) => window.alert("Image src:\n" + src),
        });
        break;
      }

      case "rcp_highlight_exact":
      case "rcp_highlight_words": {
        const sel = (info.selectionText || "").trim();
        if (!sel) return;
        const mode = info.menuItemId === "rcp_highlight_words" ? "words" : "exact";
        await execScript(tab.id, { args: [sel, mode], func: highlightInPage });
        break;
      }
    }
  } catch (e) {
    console.error("[RCP] contextMenus.onClicked error:", e);
  }
});

// ---------- Palette triggers ----------
chrome.commands.onCommand.addListener((command) => {
  if (command === "open-palette") togglePalette(null);
});

chrome.action.onClicked.addListener((tab) => togglePalette(tab));

// URLs the palette asks us to open (it can't call chrome.tabs itself).
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg?.type !== "RCP_OPEN_URL" || !msg.url) return;
  const opener = sender.tab;
  chrome.tabs
    .create({
      url: msg.url,
      index: opener?.index != null ? opener.index + 1 : undefined,
    })
    .catch((e) => console.warn("[RCP] open URL failed:", msg.url, e));
});
