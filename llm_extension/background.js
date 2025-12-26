// background.js (MV3 service worker, type: module)

// === Config you still need ===
const MAX = 512; // per-tab ring size

// --- Per-tab ring buffers: Map<tabId:number, Array<{bytes:ArrayBuffer}>> ---
const rings = new Map();

function pushToRing(tabId, item) {
  const id = Number.isInteger(tabId) ? tabId : -1;
  const buf = rings.get(id) || [];
  buf.push(item);
  if (buf.length > MAX) buf.shift();
  rings.set(id, buf);
}

// --- Inject MAIN-world hook early ---
async function registerMainHook() {
  const existing = await chrome.scripting.getRegisteredContentScripts().catch(() => []);
  const ids = (existing || []).map(s => s.id);
  if (ids.length) await chrome.scripting.unregisterContentScripts(ids);

  await chrome.scripting.registerContentScripts([{
    id: 'chatgpt-main-hook',
    js: ['injected-hook.js'],
    matches: ['https://chatgpt.com/*'],
    runAt: 'document_start',
    world: 'MAIN',
  }]);
}
chrome.runtime.onInstalled.addListener(registerMainHook);
chrome.runtime.onStartup?.addListener(registerMainHook);

// --- (Optional) batching to a local consumer ---
const INGEST_URL = "http://127.0.0.1:8765/ingest";
let batch = [];
let batchBytes = 0;
let flushTimer = null;
const FLUSH_MS = 15, FLUSH_MAX_SIZE = 1<<20, FLUSH_MAX_FR = 500;
function frameChunk(ab) {
  const u8 = new Uint8Array(ab);
  const L = u8.byteLength >>> 0;

  const out = new Uint8Array(4 + L);
  out[0] = L & 0xFF; out[1] = (L>>>8)&0xFF; out[2]=(L>>>16)&0xFF; out[3]=(L>>>24)&0xFF;
  out.set(u8, 4);
  return out.buffer;
}
async function flushNow(frames) {
  const total = frames.reduce((s, ab) => s + ab.byteLength, 0);
  const blob = new Uint8Array(total);
  let off = 0;
  for (const ab of frames) { const u8 = new Uint8Array(ab); blob.set(u8, off); off += u8.byteLength; }
  try { await fetch(INGEST_URL, { method: "POST", headers: { "Content-Type": "application/octet-stream" }, body: blob }); } catch {}
}
function scheduleFlush() {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    if (!batch.length) return;
    const frames = batch; batch = []; batchBytes = 0;
    flushNow(frames);
  }, FLUSH_MS);
}

function enqueueForIngest(ab) {
  const framed = frameChunk(ab);
  batch.push(framed);
  batchBytes += framed.byteLength;
  if (batch.length >= FLUSH_MAX_FR || batchBytes >= FLUSH_MAX_SIZE) {
    const frames = batch; batch = []; batchBytes = 0;
    flushNow(frames);
  } else {
    scheduleFlush();
  }
}

// --- Port-based relay: content.js connects as {name: "llm-bytes"} ---
chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== "llm-bytes") return;

  port.onMessage.addListener((msg, sender) => {
    if (msg?.type !== "FETCH_SSE_BYTES") return;
    // We don’t inspect URL or bytes; we just route and optionally ship.

    const tabId = sender?.sender?.tab?.id ?? sender?.tab?.id ?? -1;
    let ab = null;
    const any = msg.data;

    // Coerce whatever we got into an ArrayBuffer without peeking
    if (any instanceof ArrayBuffer) {
      ab = any;
    } else if (ArrayBuffer.isView(any) && any.buffer instanceof ArrayBuffer) {
      const { buffer, byteOffset = 0, byteLength = buffer.byteLength } = any;
      ab = buffer.slice(byteOffset, byteOffset + byteLength);
    } else if (any && any.buffer instanceof ArrayBuffer) {
      const { buffer, byteOffset = 0, byteLength = buffer.byteLength } = any;
      ab = buffer.slice(byteOffset, byteOffset + byteLength);
    } else {
      // If Chrome hands something odd, make it zero-length instead of dropping
      ab = new ArrayBuffer(0);
    }

    // Push to per-tab ring (producer responsibility)
    pushToRing(tabId, { bytes: ab });

    // (Optional) forward to consumer
     if (ab.byteLength > 0) enqueueForIngest(ab);
  });
});

// --- (Optional) small API to inspect rings while debugging ---
chrome.runtime.onMessage.addListener((msg, _s, sendResponse) => {
  if (msg?.type === "GET_RING") {
    const id = Number.isInteger(msg.tabId) ? msg.tabId : -1;
    sendResponse(rings.get(id) || []);
    return true;
  }
  if (msg?.type === "GET_RING_ALL") {
    const all = {}; for (const [id, buf] of rings.entries()) all[id] = buf;
    sendResponse(all); return true;
  }
});
