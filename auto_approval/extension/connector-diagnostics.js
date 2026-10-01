(() => {
  'use strict';

  function snapshot() {
    const nodes = [...document.querySelectorAll('*')];
    const text = (node) => (node.innerText || node.textContent || '').trim().slice(0, 120);
    const attrs = (name) => nodes.map((n) => n.getAttribute(name)).filter(Boolean).slice(0, 100);
    const buttons = nodes.filter((n) => n.tagName === 'BUTTON').map(text).filter(Boolean).slice(0, 100);
    const toolNodes = nodes.filter((n) => /tool|connector|mcp|attachment/i.test(text(n))).map(text).filter(Boolean).slice(0, 100);

    return {
      timestamp: Date.now(),
      url: location.href,
      buttons,
      ariaLabels: attrs('aria-label'),
      dataTestIds: attrs('data-testid'),
      roles: attrs('role'),
      menuItems: nodes.filter((n) => n.getAttribute('role') === 'menuitem').map(text).filter(Boolean).slice(0, 100),
      attachmentNodes: nodes.filter((n) => /attach|file|paperclip/i.test(text(n))).map(text).filter(Boolean).slice(0, 100),
      toolNodes,
      chatgptDetected: /chatgpt\.com|chat\.openai\.com/.test(location.host),
      connectorSurfaceDetected: toolNodes.some((x) => /connector|mcp|tool/i.test(x)),
    };
  }

  function emitDiagnostic() {
    const payload = snapshot();
    chrome.runtime.sendMessage({
      type: 'approval:connector-diagnostic',
      payload,
    }).catch?.(() => {});
    return payload;
  }

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === 'approval:inspect-connector-dom') {
      sendResponse({ ok: true, snapshot: emitDiagnostic() });
      return true;
    }
    return false;
  });

  emitDiagnostic();
})();
