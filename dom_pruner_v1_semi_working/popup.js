const DEFAULTS = {
  enabled: true,
  keepLast: 3,
  debug: false
};

const enabledEl = document.getElementById("enabled");
const debugEl = document.getElementById("debug");
const keepLastEl = document.getElementById("keepLast");
const pruneNowEl = document.getElementById("pruneNow");
const statusEl = document.getElementById("status");

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
  if (message) {
    setTimeout(() => {
      statusEl.textContent = "";
      statusEl.classList.remove("error");
    }, 2000);
  }
}

async function loadConfig() {
  const config = await chrome.storage.local.get(Object.keys(DEFAULTS));
  const next = { ...DEFAULTS, ...config };
  enabledEl.checked = Boolean(next.enabled);
  debugEl.checked = Boolean(next.debug);
  keepLastEl.textContent = String(next.keepLast ?? DEFAULTS.keepLast);
}

async function saveConfig(patch) {
  await chrome.storage.local.set(patch);
}

enabledEl.addEventListener("change", () => {
  saveConfig({ enabled: enabledEl.checked });
});

debugEl.addEventListener("change", () => {
  saveConfig({ debug: debugEl.checked });
});

pruneNowEl.addEventListener("click", async () => {
  setStatus("Pruning...");
  chrome.runtime.sendMessage({ type: "PRUNE_NOW" }, (response) => {
    if (chrome.runtime.lastError) {
      setStatus(chrome.runtime.lastError.message, true);
      return;
    }
    if (!response?.ok) {
      setStatus(response?.error || "Failed", true);
      return;
    }
    setStatus("Done");
  });
});

loadConfig();
