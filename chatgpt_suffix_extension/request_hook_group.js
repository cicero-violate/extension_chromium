(function() {
  if (window.__RequestHookGroupInstalled) return;
  window.__RequestHookGroupInstalled = true;

  function getSuffix() {
    const value = window.__ChatGPTSuffixConfig?.APPEND_TEXT;
    return typeof value === 'string' ? value : "\n\n<use python internal computation>";
  }
  const TARGETS = [
    { origin: "https://chatgpt.com", path: "/backend-api/calpico/chatgpt/rooms" },
    { origin: "https://chat.openai.com", path: "/backend-api/calpico/chatgpt/rooms" }
  ];

  function matchesTarget(input) {
    try {
      const abs = new URL(input, location.href);
      return TARGETS.some((target) => abs.origin === target.origin && abs.pathname.startsWith(target.path));
    } catch {
      return false;
    }
  }

  function appendSuffixToPayload(payload) {
    if (typeof payload?.content?.text !== 'string') return false;
    const suffix = getSuffix();
    if (payload.content.text.endsWith(suffix)) return false;
    payload.content.text += suffix;
    return true;
  }

  function rewriteBodyString(bodyString) {
    const payload = JSON.parse(bodyString);
    if (!appendSuffixToPayload(payload)) return null;
    return JSON.stringify(payload);
  }

  const originalFetch = window.fetch;
  window.fetch = async function(input, init) {
    try {
      if (input instanceof Request) {
        if (!matchesTarget(input.url) || input.method !== 'POST') {
          return originalFetch.apply(this, arguments);
        }
        const text = await input.clone().text();
        if (!text) return originalFetch.apply(this, arguments);
        const rewritten = rewriteBodyString(text);
        if (!rewritten) return originalFetch.apply(this, arguments);
        const newReq = new Request(input, { body: rewritten });
        return originalFetch.call(this, newReq);
      }

      const url = typeof input === 'string' ? input : input?.url;
      if (!matchesTarget(url) || !init || typeof init.body !== 'string') {
        return originalFetch.apply(this, arguments);
      }
      const rewritten = rewriteBodyString(init.body);
      if (!rewritten) return originalFetch.apply(this, arguments);
      const nextInit = { ...init, body: rewritten };
      return originalFetch.call(this, input, nextInit);
    } catch (error) {
      console.warn('[RequestHookGroup] rewrite failed', error);
      return originalFetch.apply(this, arguments);
    }
  };
})();
