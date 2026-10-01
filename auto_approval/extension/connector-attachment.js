(() => {
  'use strict';

  const CONNECTOR_NAME = 'chatgpt-mcp-tunnel';
  const CONNECTOR_PATH = 'app://asdk_app_6aa34c5f8468819180eea22fb7808dd9';

  function realConnectorMention(root) {
    if (!root?.querySelectorAll) return null;
    return [...root.querySelectorAll('[app-mention-name][app-mention-path]')]
      .find((node) => node.getAttribute('app-mention-name') === CONNECTOR_NAME
        && node.getAttribute('app-mention-path') === CONNECTOR_PATH) || null;
  }

  function connectorAttachmentPresent(root) {
    return !!realConnectorMention(root);
  }

  function requiresConnector(text) {
    return /@chatgpt-mcp-tunnel|chatgpt-mcp-tunnel|asdk_app_6aa34c5f8468819180eea22fb7808dd9/i.test(String(text || ''));
  }

  function usable(element, document) {
    if (!element) return false;
    const style = document.defaultView.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.display !== 'none'
      && style.visibility !== 'hidden'
      && style.opacity !== '0'
      && rect.width > 0
      && rect.height > 0;
  }

  function enabled(element) {
    return !!element
      && !element.disabled
      && !element.hasAttribute('disabled')
      && element.getAttribute('aria-disabled') !== 'true';
  }

  function findComposer(document) {
    return document.querySelector('#prompt-textarea')
      || document.querySelector('[contenteditable="true"][role="textbox"]')
      || document.querySelector('[role="textbox"][aria-multiline="true"]')
      || document.querySelector('textarea[name="prompt-textarea"]')
      || document.querySelector('[contenteditable="true"][data-id]')
      || document.querySelector('[contenteditable="true"][data-placeholder]');
  }

  function findPickerCard(document) {
    const cards = [...document.querySelectorAll('button')].filter((button) => {
      if (!usable(button, document) || !enabled(button)) return false;
      const label = `${button.getAttribute('aria-label') || ''} ${button.innerText || button.textContent || ''}`;
      return label.includes(CONNECTOR_NAME);
    });
    if (!cards.length) return null;
    return cards.find((button) => button.closest('[role="menu"], [role="dialog"], [data-radix-menu-content], [data-headlessui-state]'))
      || cards[cards.length - 1];
  }

  async function ensureConnectorAttached(document, timeoutMs = 8000) {
    const deadline = Date.now() + timeoutMs;
    const composer = () => findComposer(document);
    while (Date.now() < deadline && !composer()) await new Promise((resolve) => setTimeout(resolve, 50));
    const editor = composer();
    if (!editor) return false;
    if (connectorAttachmentPresent(editor)) return true;

    let card = findPickerCard(document);
    if (!card) {
      const launcher = [...document.querySelectorAll('button[aria-label="Add files and more"]')]
        .find((button) => usable(button, document) && enabled(button));
      if (!launcher) return false;
      launcher.click();
      while (Date.now() < deadline && !(card = findPickerCard(document))) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
    if (!card) return false;
    card.click();
    while (Date.now() < deadline) {
      if (connectorAttachmentPresent(composer())) return true;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return connectorAttachmentPresent(composer());
  }

  const api = Object.freeze({
    CONNECTOR_NAME,
    CONNECTOR_PATH,
    realConnectorMention,
    connectorAttachmentPresent,
    requiresConnector,
    ensureConnectorAttached,
  });

  globalThis.ModelFleetConnectorAttachment = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
