'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'background.js'), 'utf8');

test('fleet task prompts include configured repository workspace path', () => {
  assert.match(source, /workspacePath/);
  assert.match(source, /Workspace:/);
  assert.match(source, /state\.workspacePath/);
});

test('repository prompts distinguish global and repository-scoped workspace actions', () => {
  assert.match(source, /function workspaceToolInstruction\(workspacePath\)/);
  assert.match(source, /Workspace:/);
  assert.match(source, /Workspace-global actions may be called directly/);
  assert.match(source, /For repository-scoped actions, call workspace:open_context/);
  assert.match(source, /reuse its context_id/);
  assert.match(source, /never substitute prose for a required tool call or invent repository state/i);
});

test('all worker prompt surfaces use the canonical workspace tool instruction', () => {
  for (const name of ['buildTaskPrompt', 'buildMessagePrompt', 'buildControlPrompt']) {
    const start = source.indexOf(`function ${name}`);
    assert.ok(start >= 0, `missing ${name}`);
    const end = source.indexOf('\nfunction ', start + 10);
    const body = source.slice(start, end < 0 ? source.length : end);
    assert.match(body, /workspaceToolInstruction\(/, `${name} lacks canonical tool instruction`);
  }
});

test('fleet prompts keep execution order compact and do not embed a textual app id', () => {
  const taskStart = source.indexOf('function buildTaskPrompt');
  const messageStart = source.indexOf('function buildMessagePrompt');
  const controlStart = source.indexOf('function buildControlPrompt');
  const parseStart = source.indexOf('function normalizeFleetProtocolSource');
  const task = source.slice(taskStart, messageStart);
  const message = source.slice(messageStart, controlStart);
  const control = source.slice(controlStart, parseStart);

  assert.ok(task.indexOf('[MODEL FLEET ASSIGNMENT]') < task.indexOf('workspaceToolInstruction(workspacePath)'));
  assert.ok(task.indexOf('workspaceToolInstruction(workspacePath)') < task.indexOf('task.prompt'));
  assert.ok(task.indexOf('task.prompt') < task.indexOf('workerRoleOperatingPrompt(worker)'));

  assert.ok(message.indexOf('[MODEL FLEET MESSAGE]') < message.indexOf('workspaceToolInstruction(state.workspacePath)'));
  assert.ok(message.indexOf('workspaceToolInstruction(state.workspacePath)') < message.indexOf('...blocks'));
  assert.ok(message.indexOf('...blocks') < message.indexOf('workerRoleOperatingPrompt(worker)'));

  assert.ok(control.indexOf('[MODEL FLEET MESSAGE]') < control.indexOf('workspaceToolInstruction(state.workspacePath)'));
  assert.ok(control.indexOf('workspaceToolInstruction(state.workspacePath)') < control.indexOf('controlFeedbackText(worker)'));
  assert.ok(control.indexOf('controlFeedbackText(worker)') < control.indexOf('workerRoleOperatingPrompt(worker)'));

  assert.doesNotMatch(task + message + control, /asdk_app_/);
});
