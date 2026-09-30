// Runs in page world (injected via <script> tag by content.js).
// Patches window.fetch to throttle SSE token delivery to one flush per BATCH_MS,
// reducing the number of React reconciliation + style-recalc cycles during streaming.

(function () {
  if (window.__chatFetchThrottleInstalled) return;
  window.__chatFetchThrottleInstalled = true;

  const BATCH_MS = 80;

  // Only intercept POST requests to ChatGPT's streaming conversation endpoints.
  const STREAM_PATHS = [
    '/backend-api/conversation',
    '/backend-api/f/',
  ];

  function isStreamTarget(input, init) {
    const url = typeof input === 'string' ? input : (input instanceof Request ? input.url : '');
    const method = (
      init?.method ?? (input instanceof Request ? input.method : 'GET')
    ).toUpperCase();
    if (method !== 'POST') return false;
    return STREAM_PATHS.some(p => url.includes(p));
  }

  function buildThrottledStream(body) {
    const reader = body.getReader();
    return new ReadableStream({
      start(controller) {
        let buffer = [];
        let timer = null;

        function flush() {
          timer = null;
          if (!buffer.length) return;
          let size = 0;
          for (const c of buffer) size += c.length;
          const merged = new Uint8Array(size);
          let off = 0;
          for (const c of buffer) { merged.set(c, off); off += c.length; }
          buffer = [];
          controller.enqueue(merged);
        }

        (async () => {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                if (timer) clearTimeout(timer);
                flush();
                controller.close();
                return;
              }
              buffer.push(value);
              if (!timer) timer = setTimeout(flush, BATCH_MS);
            }
          } catch (err) {
            controller.error(err);
          }
        })();
      },
      cancel(reason) {
        reader.cancel(reason);
      },
    });
  }

  const _fetch = window.fetch;
  window.fetch = async function (input, init) {
    const resp = await _fetch.call(this, input, init);
    if (!isStreamTarget(input, init) || !resp.body || !resp.ok) return resp;
    return new Response(buildThrottledStream(resp.body), {
      status: resp.status,
      statusText: resp.statusText,
      headers: resp.headers,
    });
  };
})();
