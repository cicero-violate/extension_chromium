(() => {
  const DEFAULT_APPEND_TEXT = "\n\n<use python internal computation>";
  const textarea = document.getElementById('appendText');
  const saveButton = document.getElementById('save');
  const resetButton = document.getElementById('reset');
  const status = document.getElementById('status');

  function setStatus(message) {
    status.textContent = message;
    window.setTimeout(() => {
      if (status.textContent === message) status.textContent = '';
    }, 2000);
  }

  async function load() {
    const stored = await chrome.storage.local.get({ appendText: DEFAULT_APPEND_TEXT });
    textarea.value = stored.appendText;
  }

  async function save() {
    await chrome.storage.local.set({ appendText: textarea.value });
    setStatus('Saved');
  }

  async function reset() {
    textarea.value = DEFAULT_APPEND_TEXT;
    await chrome.storage.local.set({ appendText: DEFAULT_APPEND_TEXT });
    setStatus('Reset');
  }

  saveButton.addEventListener('click', save);
  resetButton.addEventListener('click', reset);
  void load();
})();