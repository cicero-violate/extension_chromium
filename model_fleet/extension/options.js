'use strict';

const autoApproveButton = document.getElementById('autoApprove');
const autoScrollButton = document.getElementById('autoScroll');
const repeatToggleButton = document.getElementById('repeatToggle');
const repeatMessageInput = document.getElementById('repeatMessage');
const saveRepeatButton = document.getElementById('saveRepeat');
const status = document.getElementById('status');

let autoApprove = true;
let autoScroll = true;
let repeatMessageEnabled = false;

function setStatus(text) {
  status.textContent = text;
  clearTimeout(setStatus.timer);
  setStatus.timer = setTimeout(() => { status.textContent = ''; }, 1200);
}

chrome.storage.sync.get({ enabled: true, autoApprove: null, autoScroll: null, repeatMessageEnabled: false, repeatMessage: '' }, (settings) => {
  const legacyEnabled = settings.enabled !== false;
  autoApprove = settings.autoApprove === null ? legacyEnabled : settings.autoApprove !== false;
  autoScroll = settings.autoScroll === null ? legacyEnabled : settings.autoScroll !== false;
  repeatMessageEnabled = settings.repeatMessageEnabled === true;
  repeatMessageInput.value = settings.repeatMessage || '';
  render();
});

function renderButton(button, label, active) {
  button.textContent = `${label}: ${active ? 'ON' : 'OFF'}`;
  button.className = active ? 'enabled' : 'disabled';
  button.setAttribute('aria-pressed', String(active));
}

function render() {
  renderButton(autoApproveButton, 'Auto approve', autoApprove);
  renderButton(autoScrollButton, 'Auto scroll', autoScroll);
  renderButton(repeatToggleButton, 'Repeat message', repeatMessageEnabled);
}

autoApproveButton.addEventListener('click', () => {
  autoApprove = !autoApprove;
  render();
  chrome.storage.sync.set({ autoApprove }, () => {
    setStatus(autoApprove ? 'Auto approve enabled' : 'Auto approve disabled');
  });
});

autoScrollButton.addEventListener('click', () => {
  autoScroll = !autoScroll;
  render();
  chrome.storage.sync.set({ autoScroll }, () => {
    setStatus(autoScroll ? 'Auto scroll enabled' : 'Auto scroll disabled');
  });
});

repeatToggleButton.addEventListener('click', () => {
  repeatMessageEnabled = !repeatMessageEnabled;
  render();
  chrome.storage.sync.set({ repeatMessageEnabled }, () => {
    setStatus(repeatMessageEnabled ? 'Repeat message enabled' : 'Repeat message disabled');
  });
});

saveRepeatButton.addEventListener('click', () => {
  const msg = repeatMessageInput.value;
  chrome.storage.sync.set({ repeatMessage: msg }, () => {
    setStatus('Message saved');
  });
});
