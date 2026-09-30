(function () {
  const DEFAULT_APPEND_TEXT = '\n\n<use python internal computation>';

  function injectScript(src) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(src);
    script.onload = () => script.remove();
    (document.head || document.documentElement).appendChild(script);
  }

  function dispatchConfig(appendText) {
    window.postMessage({
      type: 'CHATGPT_SUFFIX_CONFIG',
      appendText,
    }, '*');
  }

  async function boot() {
    const stored = await chrome.storage.local.get({ appendText: DEFAULT_APPEND_TEXT });

    injectScript('inject.js');

    if (location.pathname.startsWith('/gg/')) {
      injectScript('request_hook_group.js');
    } else {
      injectScript('request_hook_private.js');
    }

    dispatchConfig(stored.appendText);
  }

  window.addEventListener('message', async (event) => {
    if (event.source !== window) return;
    if (event.data?.type === 'BRIDGE_READY') {
      const stored = await chrome.storage.local.get({ appendText: DEFAULT_APPEND_TEXT });
      dispatchConfig(stored.appendText);
      console.log('[ChatGPT Suffix Injector] bridge ready', event.data?.href || location.href);
    }
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'local' || !changes.appendText) return;
    dispatchConfig(changes.appendText.newValue ?? DEFAULT_APPEND_TEXT);
  });

  void boot();
})();
