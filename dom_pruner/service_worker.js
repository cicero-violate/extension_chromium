const DEFAULTS = {
  enabled: true,
  debug: false,
  hideHud: false
};

chrome.runtime.onInstalled.addListener(async () => {
  const current = await chrome.storage.local.get(Object.keys(DEFAULTS));
  const next = { ...DEFAULTS, ...current };
  await chrome.storage.local.set(next);
});
