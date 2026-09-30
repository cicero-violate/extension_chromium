const DEFAULTS = {
  enabled: true,
  keepLast: 3,
  debug: false
};

chrome.runtime.onInstalled.addListener(async () => {
  const current = await chrome.storage.local.get(Object.keys(DEFAULTS));
  const next = { ...DEFAULTS, ...current };
  await chrome.storage.local.set(next);
});

async function getActiveChatTab() {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
    url: [
      "https://chatgpt.com/*",
      "https://chat.openai.com/*"
    ]
  });
  return tabs[0];
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type !== "PRUNE_NOW") {
    return false;
  }

  (async () => {
    const tab = await getActiveChatTab();
    if (!tab?.id) {
      sendResponse({ ok: false, error: "No active ChatGPT tab." });
      return;
    }

    try {
      await chrome.tabs.sendMessage(tab.id, { type: "PRUNE_NOW" });
      sendResponse({ ok: true });
    } catch (err) {
      sendResponse({ ok: false, error: String(err) });
    }
  })();

  return true;
});
