(function() {
  if (window.__RequestHookPrivateInstalled) return;
  window.__RequestHookPrivateInstalled = true;

  function getSuffix() {
    const value = window.__ChatGPTSuffixConfig?.APPEND_TEXT;
    return typeof value === 'string' ? value : "\n\n<use python internal computation>";
  }
  const TARGETS = [
    { origin: "https://chatgpt.com", path: "/backend-api/f/conversation" },
    { origin: "https://chat.openai.com", path: "/backend-api/f/conversation" }
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
    if (!Array.isArray(payload?.messages) || payload.messages.length === 0) return false;

    for (let i = payload.messages.length - 1; i >= 0; i--) {
      const msg = payload.messages[i];
      if (msg?.author?.role !== 'user') continue;
      const parts = msg?.content?.parts;
      if (!Array.isArray(parts)) continue;

      let changed = false;
      msg.content.parts = parts.map((part) => {
        if (typeof part !== 'string') return part;
        const suffix = getSuffix();
        if (part.endsWith(suffix)) return part;
        changed = true;
        return part + suffix;
      });
      return changed;
    }

    return false;
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
      console.warn('[RequestHookPrivate] rewrite failed', error);
      return originalFetch.apply(this, arguments);
    }
  };
})();
