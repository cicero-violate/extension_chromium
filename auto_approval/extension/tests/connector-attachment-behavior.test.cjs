'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const attachment = require(path.join(root, 'connector-attachment.js'));
const content = fs.readFileSync(path.join(root, 'content.js'), 'utf8');
const worker = fs.readFileSync(path.join(root, 'fleet-worker.js'), 'utf8');
const background = fs.readFileSync(path.join(root, 'background.js'), 'utf8');

function fakeRoot(nodes = [], text = '') {
  return {
    innerText: text,
    querySelectorAll() { return nodes; },
  };
}

function fakeMention(name = attachment.CONNECTOR_NAME, appPath = attachment.CONNECTOR_PATH) {
  return {
    getAttribute(attribute) {
      return attribute === 'app-mention-name' ? name : appPath;
    },
  };
}

test('conversation text alone is not an attachment', () => {
  assert.equal(attachment.connectorAttachmentPresent(fakeRoot([], 'chatgpt-mcp-tunnel')), false);
});

test('plain markdown app link is not an attachment', () => {
  assert.equal(
    attachment.connectorAttachmentPresent(fakeRoot([], '[$chatgpt-mcp-tunnel](app://asdk_app_6aa34c5f8468819180eea22fb7808dd9)')),
    false,
  );
});

test('generic content sends detect connector text while fleet sends always attach the connector', () => {
  assert.equal(attachment.requiresConnector('Do ls -la'), false);
  assert.equal(attachment.requiresConnector('Use chatgpt-mcp-tunnel now.'), true);
  assert.doesNotMatch(content, /function requiredConnectorMention/);
  assert.match(content, /connectorHelper\.requiresConnector\(text\)/);
  assert.doesNotMatch(worker, /connectorHelper\.requiresConnector\(text\)/);
  assert.match(worker, /if \(!\(await ensureConnectorAttached\(\)\)\)/);
});

test('the real app mention node is an attachment', () => {
  assert.equal(attachment.connectorAttachmentPresent(fakeRoot([fakeMention()])), true);
  assert.equal(attachment.connectorAttachmentPresent(fakeRoot([fakeMention('other-app')])), false);
  assert.equal(attachment.connectorAttachmentPresent(fakeRoot([fakeMention(attachment.CONNECTOR_NAME, 'app://wrong')])), false);
});

test('content attachment detection is scoped to the composer and has no body-text fallback', () => {
  const start = content.indexOf('function connectorAttachmentPresent');
  const end = content.indexOf('\n  async function ensureConnectorAttached', start);
  const section = content.slice(start, end);
  assert.doesNotMatch(section, /document\.body|innerText/);
  assert.match(section, /ModelFleetConnectorAttachment/);
  assert.match(section, /app-mention-name/);
});

test('fleet send requires verified attachment and performs picker selection before send', () => {
  assert.match(worker, /async function ensureConnectorAttached/);
  assert.match(worker, /ModelFleetConnectorAttachment/);
  assert.match(worker, /connectorAttachmentPresent\(editor\)/);
  assert.match(worker, /refusing to send without it/);
  assert.match(worker, /appendComposerText\(editor, `\\n\\n\$\{text\}`\)/);
  assert.match(worker, /await ensureConnectorAttached\(\)/);
  assert.match(worker, /sendButton\.click\(\)/);
  assert.match(fs.readFileSync(path.join(root, 'connector-attachment.js'), 'utf8'), /button\[aria-label="Add files and more"\]/);
  assert.match(fs.readFileSync(path.join(root, 'connector-attachment.js'), 'utf8'), /card\.click\(\)/);
});

test('missing workspace path fails closed without a placeholder target', () => {
  const start = background.indexOf('function workspaceToolInstruction');
  const end = background.indexOf('\nfunction buildTaskPrompt', start);
  const source = background.slice(start, end);
  const context = {};
  vm.runInNewContext(`${source}\nresult = workspaceToolInstruction('');`, context);
  assert.match(context.result, /BLOCKED/);
  assert.match(context.result, /not configured/);
  assert.doesNotMatch(context.result, /Call workspace:open_context/);
});

test('fleet composer transport chunks large prompts and verifies every cumulative suffix', () => {
  assert.match(worker, /const COMPOSER_CHUNK_CHARS = 1200;/);
  assert.match(worker, /function nextComposerChunk\(source, offset, maxChars = COMPOSER_CHUNK_CHARS\)/);
  assert.match(worker, /for \(let offset = 0; offset < source\.length;\)/);
  assert.match(worker, /await waitForComposerSuffix\(currentEditor, appended\)/);
  assert.match(worker, /connectorAttachmentPresent\(reconciledEditor\)/);
  assert.match(worker, /composerEndsWith\(finalEditor, source\)/);
});

test('fleet send verifies the full payload and attachment before clicking Send', () => {
  const start = worker.indexOf('async function injectPrompt(text, sendReadyTimeoutMs)');
  const end = worker.indexOf('\n  function stopResponseMonitor', start);
  const block = worker.slice(start, end);
  const verify = block.indexOf("ChatGPT composer failed final attachment/payload verification; refusing to click Send");
  const waitButton = block.indexOf('const sendButton = await waitForSendButton');
  const click = block.indexOf('sendButton.click()');
  assert.ok(verify >= 0);
  assert.ok(waitButton > verify);
  assert.ok(click > waitButton);
});


test('picker card detection does not depend on a fixed-position ancestor', () => {
  const attachmentSource = fs.readFileSync(path.join(root, 'connector-attachment.js'), 'utf8');
  const start = attachmentSource.indexOf('function findPickerCard');
  const end = attachmentSource.indexOf('async function ensureConnectorAttached', start);
  const section = attachmentSource.slice(start, end);
  assert.match(section, /querySelectorAll\('button'\)/);
  assert.match(section, /label\.includes\(CONNECTOR_NAME\)/);
  assert.doesNotMatch(section, /position === ['"]fixed['"]/);
});
