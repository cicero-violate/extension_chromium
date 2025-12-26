/* background.js — MV3 safe & defensive */

// ---------- Helpers ----------
function isRestrictedUrl(url) {
  if (!url) return true;
  return (
    url.startsWith("chrome://") ||
    url.startsWith("edge://") ||
    url.startsWith("about:") ||
    url.startsWith("devtools://") ||
    url.startsWith("chrome-extension://") ||
    url.startsWith("https://chrome.google.com/webstore")
  );
}

async function ensureTab(tab) {
  if (tab && tab.id != null) return tab;
  const [active] = await chrome.tabs.query({ active: true, currentWindow: true });
  return active || null;
}

async function safeExecScript(tabId, opts) {
  try {
    await chrome.scripting.executeScript({
    target: { tabId },
    ...opts
    });
    return true;
  } catch (e) {
    console.warn("[RCP] executeScript failed:", e);
    return false;
  }
}

async function safeInsertCSS(tabId, file) {
  try {
    await chrome.scripting.insertCSS({
      target: { tabId },
      files: [file]
    });
    return true;
  } catch (e) {
    // okay if already injected or blocked
    return false;
  }
}

async function ensurePaletteInjected(tabId) {
  await safeInsertCSS(tabId, "palette.css");
  await safeExecScript(tabId, { files: ["content.js"] });
}

async function sendPaletteMessage(tab, message) {
  tab = await ensureTab(tab);
  if (!tab || tab.id == null) return;

  const url = tab.url || "";
  if (isRestrictedUrl(url)) return;

  try {
    await chrome.tabs.sendMessage(tab.id, message);
  } catch (_) {
    await ensurePaletteInjected(tab.id);
    try {
      await chrome.tabs.sendMessage(tab.id, message);
    } catch (e) {
      console.warn("[RCP] sendPaletteMessage failed after inject:", e);
    }
  }
}

async function togglePaletteOnTab(tab) {
  await sendPaletteMessage(tab, { type: "RCP_TOGGLE_PALETTE" });
}

// ---------- Context menus ----------
chrome.runtime.onInstalled.addListener(() => {

  chrome.contextMenus.create({
    id: "rcp_root",
    title: "Right-Click Plus",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    id: "rcp_hello",
    parentId: "rcp_root",
    title: "Say Hello",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    id: "rcp_search_selection",
    parentId: "rcp_root",
    title: "Search selection…",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "rcp_highlight_exact",
    title: "Highlight selection (exact)",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "rcp_highlight_similar_group",
    parentId: "rcp_root",
    title: "Highlight similar words (yellow)",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "rcp_copy_link",
    parentId: "rcp_root",
    title: "Copy link URL",
    contexts: ["link"]
  });

  chrome.contextMenus.create({
    id: "rcp_image_info",
    parentId: "rcp_root",
    title: "Image info → alt / src",
    contexts: ["image"]
  });

});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  try {
    tab = await ensureTab(tab);
    if (!tab || tab.id == null) return;
    if (isRestrictedUrl(tab.url || "")) return;

    switch (info.menuItemId) {

      case "rcp_hello": {
        await safeExecScript(tab.id, {
          func: () => alert("Hello from Right-Click Plus 👋")
        });
        break;
      }

      case "rcp_search_selection": {
        const q = (info.selectionText || "").trim();
        if (!q) return;
        await chrome.tabs.create({
          url: "https://duckduckgo.com/?q=" + encodeURIComponent(q),
          index: (tab.index ?? 0) + 1
        });
        break;
      }

      case "rcp_copy_link": {
        const linkUrl = info.linkUrl || "";
        if (!linkUrl) return;
        await safeExecScript(tab.id, {
          args: [linkUrl],
          func: async (url) => {
            try { await navigator.clipboard.writeText(url); }
            catch { alert("Could not copy link."); }
          }
        });
        break;
      }

      case "rcp_image_info": {
        const src = info.srcUrl || "";
        if (!src) return;
        await safeExecScript(tab.id, {
          args: [src],
          func: (s) => alert(`Image src: ${s}`)
        });
        break;
      }

      case "rcp_highlight_exact": {
	const selected = (info.selectionText || "").trim();
	if (!selected) return;

	await safeExecScript(tab.id, {
	  args: [selected],
	  func: (selection) => {
	    // exact highlight version (no groups)
	    const escaped = selection.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	    const re = new RegExp(escaped, "gi");

	    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
	    const nodes = [];

	    while (walker.nextNode()) {
	      const node = walker.currentNode;
	      const parent = node.parentElement;
	      if (!parent) continue;
	      if (["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","INPUT"].includes(parent.tagName)) continue;

	      re.lastIndex = 0;
	      if (re.test(node.nodeValue)) nodes.push(node);
	    }

	    if (!nodes.length) return;

	    // const colors = ["#fff59d", "#c8e6c9", "#ffcc80", "#e1bee7"]; 
	    const colors = [
	      "#fff59d", // soft yellow
	      "#c8e6c9", // green
	      "#ffcc80", // orange
	      "#e1bee7", // purple
	      "#b3e5fc", // baby blue
	      "#ffcdd2", // soft red
	      "#d1c4e9", // lavender
	      "#f0f4c3", // lime
	      "#ffe0b2", // peach
	      "#bbdefb", // light blue
	      "#f8bbd0", // pink
	      "#dcedc8"  // mint
	    ];

	    // if (!window.__rcpColorIndex && window.__rcpColorIndex !== 0) {
	    //   window.__rcpColorIndex = 0;
	    // }

	    if (typeof window.__rcpColorIndex !== "number") {
	      window.__rcpColorIndex = 0;
	    }

	    const color = colors[window.__rcpColorIndex];
	    window.__rcpColorIndex = (window.__rcpColorIndex + 1) % colors.length;

	    nodes.forEach(node => {
	      const text = node.nodeValue;
	      const frag = document.createDocumentFragment();
	      re.lastIndex = 0;
	      let lastIndex = 0;
	      let match;

	      while ((match = re.exec(text)) !== null) {
		const before = text.slice(lastIndex, match.index);
		if (before) frag.appendChild(document.createTextNode(before));

		const mark = document.createElement("mark");
		mark.style.backgroundColor = color;
		mark.textContent = match[0];
		frag.appendChild(mark);

		lastIndex = match.index + match[0].length;
	      }

	      const after = text.slice(lastIndex);
	      if (after) frag.appendChild(document.createTextNode(after));

	      node.parentNode.replaceChild(frag, node);
	    });
	  }
	});

	break;
      }

      case "rcp_highlight_similar_group": {
        const selected = (info.selectionText || "").trim();
        if (!selected) return;

        await safeExecScript(tab.id, {
          args: [selected],
          func: (selection) => {
            // ---- Highlight similar logic ----
            const rawWords = (selection || "")
              .split(/\s+/)
              .map(w => w.trim())
              .filter(Boolean);

            if (!rawWords.length) return;

            const escapeRegex = (str) =>
              str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            const wordMap = new Map();
            rawWords.forEach(word => {
              const canonical = word.toLowerCase();
              if (!wordMap.has(canonical)) wordMap.set(canonical, word);
            });

            if (!wordMap.size) return;

            const groupKey = Array.from(wordMap.keys())
              .sort()
              .join("|");

            const existingMarks = Array.from(
              document.querySelectorAll("mark.rcp__highlight")
            ).filter(m => m.dataset.rcpGroup === groupKey);

            if (existingMarks.length) {
              existingMarks.forEach(mark => {
                const parent = mark.parentNode;
                if (!parent) return;
                const textNode = document.createTextNode(mark.textContent || "");
                parent.replaceChild(textNode, mark);
                parent.normalize();
              });
              return;
            }

            const escapedWords = Array.from(wordMap.values()).map(escapeRegex);
	    // const re = new RegExp(`(${escapedWords.join("|")})`, "gi");
	    const re = new RegExp(`\\b(${escapedWords.join("|")})\\b`, "gi");


            const walker = document.createTreeWalker(
              document.body,
              NodeFilter.SHOW_TEXT,
              null
            );

            const nodes = [];
            while (walker.nextNode()) {
              const node = walker.currentNode;
              if (!node.parentElement) continue;

              const tag = node.parentElement.tagName;
              if (["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","INPUT"].includes(tag))
                continue;

              if (node.parentElement.closest("mark.rcp__highlight"))
                continue;

              re.lastIndex = 0;
              if (re.test(node.nodeValue)) nodes.push(node);
            }

            if (!nodes.length) return;

	    // const colors = ["#fff59d", "#c8e6c9", "#ffcc80", "#e1bee7"]; 
	    const colors = [
	      "#fff59d", // soft yellow
	      "#c8e6c9", // green
	      "#ffcc80", // orange
	      "#e1bee7", // purple
	      "#b3e5fc", // baby blue
	      "#ffcdd2", // soft red
	      "#d1c4e9", // lavender
	      "#f0f4c3", // lime
	      "#ffe0b2", // peach
	      "#bbdefb", // light blue
	      "#f8bbd0", // pink
	      "#dcedc8"  // mint
	    ];

	    // if (!window.__rcpColorIndex && window.__rcpColorIndex !== 0) {
	    //   window.__rcpColorIndex = 0; // persistent across toggles
	    // }
	    if (typeof window.__rcpColorIndex !== "number") {
	      window.__rcpColorIndex = 0;
	    }

	    const color = colors[window.__rcpColorIndex];
	    window.__rcpColorIndex = (window.__rcpColorIndex + 1) % colors.length;


            nodes.forEach(node => {
              const text = node.nodeValue;
              const frag = document.createDocumentFragment();
              let lastIndex = 0;
              re.lastIndex = 0;

              let match;
              while ((match = re.exec(text)) !== null) {
                const before = text.slice(lastIndex, match.index);
                if (before) frag.appendChild(document.createTextNode(before));

                const mark = document.createElement("mark");
                mark.className = "rcp__highlight";
                mark.dataset.rcpGroup = groupKey;
                mark.style.backgroundColor = color;
                mark.textContent = match[0];
                frag.appendChild(mark);

                lastIndex = match.index + match[0].length;
              }

              const after = text.slice(lastIndex);
              if (after) frag.appendChild(document.createTextNode(after));

              node.parentNode.replaceChild(frag, node);
            });
          }
        });

        break;
      }
    }

  } catch (e) {
    console.error("[RCP] contextMenus.onClicked error:", e);
  }
});

// ---------- Command palette ----------
chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (command === "open-palette") {
    await togglePaletteOnTab(tab || null);
    return;
  }
});

// Warm inject on completed navigations
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (info.status !== "complete") return;
  const url = tab?.url || "";
  if (isRestrictedUrl(url)) return;
  await ensurePaletteInjected(tabId);
});

