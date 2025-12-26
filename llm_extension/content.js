// content.js (document_start)
const PORT_NAME = "llm_bytes_port";

// 1) create MessageChannel to the page
const channel = new MessageChannel();
window.postMessage({ __llm_bridge_handshake__: 1, name: PORT_NAME }, "*", [channel.port2]);

// 2) open a long-lived port to the SW
const swPort = chrome.runtime.connect({ name: "llm-bytes" });

// 3) forward bytes arriving on channel.port1 → swPort (no inspection)
channel.port1.onmessage = (e) => {
  const msg = e.data || {};
  // Sanity log in content world
  const len = (msg && msg.data && msg.data.byteLength) ? msg.data.byteLength : 0;
  console.log("[CONTENT] fwd", msg.type, "len:", len);

  try { swPort.postMessage(msg); } catch {}
};

// keep the channel alive
channel.port1.start();
