// injected-hook.js — tee raw SSE bytes and transfer via MessagePort (zero-copy)
(function () {
  const TARGET_PATH = "/backend-api/f/conversation";
  const PORT_NAME   = "llm_bytes_port";

  let pagePort = null;

  // Accept a transferred MessagePort from content.js
  window.addEventListener("message", (e) => {
    const m = e.data;
    if (!m || m.__llm_bridge_handshake__ !== 1 || m.name !== PORT_NAME) return;
    pagePort = (e.ports && e.ports[0]) || null;
    if (pagePort) {
      pagePort.start();
      console.log("[HOOK] pagePort connected");
    }
  }, { capture: true });

  function send(type, payload) {
    if (!pagePort) return;
    if (payload && payload.data instanceof ArrayBuffer) {
      try { pagePort.postMessage({ type, ...payload }, [payload.data]); } catch {}
    } else {
      try { pagePort.postMessage({ type, ...payload }); } catch {}
    }
  }

  const nativeFetch = window.fetch;
  window.fetch = async function hookedFetch(input, init) {
    const res = await nativeFetch(input, init);

    try {
      const reqUrl = typeof input === "string" ? input : (input && input.url) || "";
      const abs = new URL(reqUrl, location.href);
      const ct = res.headers.get("content-type") || "";
      const stream = res.body;

      if (abs.origin === "https://chatgpt.com" &&
          abs.pathname === TARGET_PATH &&
          res.ok && stream && ct.includes("text/event-stream")) {

        const [toPage, toCap] = stream.tee();

        (async () => {
          send("FETCH_SSE_OPEN",  { url: abs.href });
          const r = toCap.getReader();
          let seq = 0;
          try {
            while (true) {
              const { value, done } = await r.read();
              if (done) break;
              if (value && value.byteLength) {
                // Tight ArrayBuffer for transfer
                const ab = value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength);
                // sanity log (page)
                console.log("[HOOK] chunk", seq, "bytes:", ab.byteLength);
                send("FETCH_SSE_BYTES", { url: abs.href, seq: seq++, data: ab });
              } else {
                console.log("[HOOK] empty chunk");
              }
            }
          } catch (err) {
            send("FETCH_SSE_ERROR", { url: abs.href, meta: String(err) });
          } finally {
            send("FETCH_SSE_CLOSE", { url: abs.href });
          }
        })();

        const headers = new Headers(res.headers);
        headers.set("content-type", "text/event-stream; charset=utf-8");
        headers.delete("content-length");

        return new Response(toPage, { status: res.status, statusText: res.statusText, headers });
      }
    } catch {}
    return res;
  };
})();
