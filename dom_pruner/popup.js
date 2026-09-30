const DEFAULTS = {
  enabled: true,
  debug: false,
  hideHud: false
};

const enabledEl = document.getElementById("enabled");
const debugEl = document.getElementById("debug");
const hideHudEl = document.getElementById("hideHud");
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
  hideHudEl.checked = Boolean(next.hideHud);
}

async function saveConfig(patch) {
  await chrome.storage.local.set(patch);
}

enabledEl.addEventListener("change", () => {
  saveConfig({ enabled: enabledEl.checked });
  setStatus(enabledEl.checked ? "Containment on" : "Disabled");
});

debugEl.addEventListener("change", () => {
  saveConfig({ debug: debugEl.checked });
});

hideHudEl.addEventListener("change", () => {
  saveConfig({ hideHud: hideHudEl.checked });
  setStatus(hideHudEl.checked ? "HUD hidden" : "HUD shown");
});

loadConfig();
