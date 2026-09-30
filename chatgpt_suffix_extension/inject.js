(function() {
  if (window.__BridgeInstalled) return;
  window.__BridgeInstalled = true;
  window.__ChatGPTSuffixConfig = window.__ChatGPTSuffixConfig || {
    APPEND_TEXT: "\n\n<use python internal computation>",
  };

  window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    if (event.data?.type !== 'CHATGPT_SUFFIX_CONFIG') return;
    window.__ChatGPTSuffixConfig = {
      ...window.__ChatGPTSuffixConfig,
      APPEND_TEXT: typeof event.data.appendText === 'string'
        ? event.data.appendText
        : "\n\n<use python internal computation>",
    };
  });

  window.postMessage({ type: 'BRIDGE_READY', href: location.href }, '*');
})();
