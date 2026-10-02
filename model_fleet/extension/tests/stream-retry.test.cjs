'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { findStreamError, findDeliveryTimeout, latestUserMessageText, turnKey, createController, createResendController } = require('../stream-retry.js');

function makePage({ error = 'Error in message stream', label = 'Retry', top = 200, userId = 'u1' } = {}) {
  const body = {};
  const button = {
    innerText: label, getAttribute: () => null,
  };
  const banner = {
    parentElement: body, innerText: error + ' ' + label,
    getBoundingClientRect: () => ({ top, bottom: top + 50 }),
    querySelectorAll: (selector) => selector === 'button' ? [button] : [],
  };
  button.parentElement = banner;
  const user = { getAttribute: () => userId };
  const document = {
    body,
    querySelectorAll(selector) {
      if (selector === 'button') return [button];
      if (selector === '[data-message-author-role="user"]') return [user];
      return [];
    },
  };
  const latestTurn = {
    contains: () => false,
    getBoundingClientRect: () => ({ top: 180 }),
  };
  return { document, button, banner, latestTurn, usable: () => true };
}


function makeTimeoutPage({
  text = 'Message delivery timed out. Please try again.',
  top = 200,
  userId = 'u1',
  userText = 'continue the refactor',
} = {}) {
  const body = {};
  const alert = {
    innerText: text,
    textContent: text,
    getBoundingClientRect: () => ({ top, bottom: top + 50 }),
  };
  const messageBody = { innerText: userText, textContent: userText };
  const user = {
    innerText: userText,
    textContent: userText,
    getAttribute: () => userId,
    querySelector: (selector) => selector === '[data-message-content]' ? messageBody : null,
  };
  const document = {
    body,
    querySelectorAll(selector) {
      if (selector === '[role="alert"], [role="status"], [aria-live]') return [alert];
      if (selector === '[data-message-author-role="user"]') return [user];
      return [];
    },
  };
  const latestTurn = {
    contains: () => false,
    getBoundingClientRect: () => ({ top: 180 }),
  };
  return { document, alert, latestTurn, usable: () => true };
}

test('click candidate must be Retry in a small visible stream-error banner', () => {
  const page = makePage();
  assert.equal(findStreamError(page.document, page)?.button, page.button);
  const unrelated = makePage({ error: 'Other failure' });
  assert.equal(findStreamError(unrelated.document, unrelated), null);
  const wrongButton = makePage({ label: 'Regenerate' });
  assert.equal(findStreamError(wrongButton.document, wrongButton), null);
  const giant = makePage({ error: 'Error in message stream' + 'x'.repeat(500) });
  assert.equal(findStreamError(giant.document, giant), null);
});

test('historical banner before latest assistant turn is ignored', () => {
  const old = makePage({ top: 50 });
  assert.equal(findStreamError(old.document, old), null);
  assert.equal(findStreamError(old.document, { ...old, latestTurn: null })?.button, old.button);
});

test('delivery timeout is matched exactly near the latest turn and recovers the latest user text', () => {
  const page = makeTimeoutPage();
  assert.equal(findDeliveryTimeout(page.document, page)?.banner, page.alert);
  assert.equal(latestUserMessageText(page.document), 'continue the refactor');

  const unrelated = makeTimeoutPage({ text: 'Network error. Please try again.' });
  assert.equal(findDeliveryTimeout(unrelated.document, unrelated), null);

  const historical = makeTimeoutPage({ top: 50 });
  assert.equal(findDeliveryTimeout(historical.document, historical), null);
});

test('delivery-timeout resend is bounded, asynchronous, and requires clear after success', () => {
  const gate = createResendController({ maxAttempts: 2, backoffMs: 3000 });
  const request = (time, visible = true, nextKey = 'turn-1', ready = true, streaming = false) =>
    gate.observe({ turnKey: nextKey, visible, ready, streaming, now: time });

  assert.deepEqual(request(10000), { action: 'resend', attempts: 1 });
  assert.equal(request(10001).action, 'in-flight');
  gate.settle({ success: false });
  assert.deepEqual(request(12000), { action: 'wait', delayMs: 1000, attempts: 1 });
  assert.deepEqual(request(13000), { action: 'resend', attempts: 2 });
  gate.settle({ success: true });
  assert.equal(request(14000).action, 'await-clear');
  assert.equal(request(14500, false).action, 'none');
  assert.equal(request(15000).action, 'exhausted');
  assert.deepEqual(request(16000, true, 'turn-2'), { action: 'resend', attempts: 1 });
});

test('retry budget is bounded and requires banner disappearance between attempts', () => {
  const gate = createController({ maxAttempts: 2, backoffMs: 3000 });
  const request = (time, visible = true, nextKey = 'turn-1', ready = true, streaming = false) =>
    gate.observe({ turnKey: nextKey, visible, ready, streaming, now: time });
  assert.deepEqual(request(10000), { action: 'click', attempts: 1 });
  assert.equal(request(11000).action, 'await-clear');
  assert.equal(request(12000, false).action, 'none');
  assert.deepEqual(request(12500), { action: 'wait', delayMs: 500, attempts: 1 });
  assert.deepEqual(request(13000), { action: 'click', attempts: 2 });
  assert.equal(request(15000).action, 'await-clear');
  request(15500, false);
  assert.equal(request(25000).action, 'exhausted');
  assert.deepEqual(request(25001, true, 'turn-2'), { action: 'click', attempts: 1 });
});

test('retry waits for transport idle and enabled button', () => {
  const gate = createController();
  const arg = { turnKey: 'turn-1', visible: true, ready: true, now: 5000 };
  assert.equal(gate.observe({ ...arg, streaming: true }).action, 'busy');
  assert.equal(gate.observe({ ...arg, streaming: false, ready: false }).action, 'busy');
  assert.equal(gate.observe({ ...arg, streaming: false }).action, 'click');
});

test('retry identity remains stable across assistant output changes', () => {
  const page = makePage({ userId: 'user-one' });
  const location = { origin: 'https://chatgpt.com', pathname: '/c/abc' };
  assert.equal(turnKey(page.document, location), turnKey(page.document, location));
  assert.notEqual(turnKey(page.document, location), turnKey(page.document, { ...location, pathname: '/c/xyz' }));
});

test('manifest, state, popup and content script are wired together', () => {
  const ext = path.join(__dirname, '..');
  const manifest = JSON.parse(fs.readFileSync(path.join(ext, 'manifest.json'), 'utf8'));
  const scripts = manifest.content_scripts[0].js;
  assert.ok(scripts.indexOf('stream-retry.js') < scripts.indexOf('content.js'));
  const background = fs.readFileSync(path.join(ext, 'background.js'), 'utf8');
  const content = fs.readFileSync(path.join(ext, 'content.js'), 'utf8');
  const popup = fs.readFileSync(path.join(ext, 'popup.js'), 'utf8');
  const html = fs.readFileSync(path.join(ext, 'popup.html'), 'utf8');
  assert.match(background, /autoRetry: value\.autoRetry === true/);
  assert.match(content, /if \(autoRetry && streamRetryController\)/);
  assert.match(content, /if \(currentStreamErrorBanner\(\)\)/);
  assert.match(content, /currentDeliveryTimeoutBanner\(\)/);
  assert.match(content, /latestUserMessageText\(document\)/);
  assert.match(popup, /approval\.autoRetry/);
  assert.match(html, /id="autoRetry"/);
});


test('fleet-managed prompts are not resent by the generic delivery-timeout path', () => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'content.js'), 'utf8');
  assert.match(content, /fleetManaged = \/\^\\\[MODEL FLEET \(\?:ASSIGNMENT\\|MESSAGE\)\\\]\//);
  assert.match(content, /fleet-managed delivery timeout left to fleet retry policy/);
});
