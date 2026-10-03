'use strict';

// PSM P3: deterministic active-working-set projection over accepted P2 state.
// This module is read-only and intentionally not imported by background.js.
(function installProgressiveStateMemoryP3(global) {
  const p2 = global.ProgressiveStateMemoryM7P2;
  if (!p2) throw new Error('PSM P3 requires the accepted P2 module');

  const SCHEMA_VERSION = 1;
  const SELECTOR_VERSION = 1;
  const TERMINAL_TASK_PHASES = Object.freeze(['done', 'cancelled']);
  const TERMINAL_MESSAGE_PHASES = Object.freeze(['done', 'cancelled']);

  function reject(reason) {
    const error = new Error(`PSM P3 rejected: ${reason}`);
    error.code = 'PSM_P3_REJECTED';
    error.reason = reason;
    return error;
  }

  function object(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  function plainObject(value) {
    if (!object(value) || Object.prototype.toString.call(value) !== '[object Object]') return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || (typeof prototype.constructor === 'function' && prototype.constructor.name === 'Object');
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function keysExact(value, allowed, reason) {
    if (!plainObject(value) || Object.keys(value).some((key) => !allowed.includes(key))) throw reject(reason);
  }

  function idSort(left, right) {
    return left.localeCompare(right);
  }

  function factEntry(id, fact, code, via = null) {
    return {
      id,
      fact: clone(fact),
      selection: { code, via },
    };
  }

  function validateWorkingSetShape(selected) {
    keysExact(selected, ['schemaVersion', 'selectorVersion', 'watermark', 'goal', 'frontier', 'constraints', 'tasks', 'messages', 'operatorDecisions', 'evidence', 'artifacts'], 'unknown-working-set-field');
    keysExact(selected.watermark, ['sequence', 'eventId', 'at'], 'invalid-working-set-watermark');
    const validateEntry = (entry, reason) => {
      keysExact(entry, ['id', 'fact', 'selection'], reason);
      if (typeof entry.id !== 'string' || !plainObject(entry.selection)) throw reject(reason);
      keysExact(entry.selection, ['code', 'via'], reason);
      if (typeof entry.selection.code !== 'string' && entry.selection.code !== null) throw reject(reason);
      if (entry.selection.via !== null && typeof entry.selection.via !== 'string') throw reject(reason);
    };
    for (const entry of [selected.goal, selected.frontier]) {
      if (entry !== null) validateEntry(entry, 'invalid-working-set-fact-entry');
    }
    for (const collection of [selected.constraints, selected.tasks, selected.messages, selected.operatorDecisions, selected.evidence, selected.artifacts]) {
      if (!Array.isArray(collection)) throw reject('invalid-working-set-collection');
      collection.forEach((entry) => validateEntry(entry, 'invalid-working-set-fact-entry'));
    }
  }

  function selectActiveWorkingSet(state) {
    p2.validateState(state);
    const selectedTasks = new Set();
    const taskReasons = new Map();
    const taskIds = Object.keys(state.tasks).sort(idSort);

    for (const taskId of taskIds) {
      const task = state.tasks[taskId];
      if (!TERMINAL_TASK_PHASES.includes(task.phase)) {
        selectedTasks.add(taskId);
        taskReasons.set(taskId, task.phase === 'blocked' ? { code: 'blocked-task', via: null } : { code: 'nonterminal-task', via: null });
      }
    }

    const visiting = new Set();
    function includeDependencies(taskId) {
      if (visiting.has(taskId)) throw reject('cyclic-task-dependency');
      const task = state.tasks[taskId];
      if (!task || !Array.isArray(task.dependencies)) throw reject('missing-task-dependency-closure');
      visiting.add(taskId);
      for (const dependencyId of task.dependencies.slice().sort(idSort)) {
        if (!Object.prototype.hasOwnProperty.call(state.tasks, dependencyId)) throw reject('missing-task-dependency');
        if (!selectedTasks.has(dependencyId)) {
          selectedTasks.add(dependencyId);
          taskReasons.set(dependencyId, { code: 'dependency-closure', via: taskId });
        }
        includeDependencies(dependencyId);
      }
      visiting.delete(taskId);
    }

    for (const taskId of Array.from(selectedTasks).sort(idSort)) includeDependencies(taskId);

    const selectedTaskEntries = Array.from(selectedTasks).sort(idSort).map((taskId) => {
      const reason = taskReasons.get(taskId) || { code: 'dependency-closure', via: null };
      return factEntry(taskId, state.tasks[taskId], reason.code, reason.via);
    });
    const selectedTaskIds = new Set(selectedTasks);
    const selectedConstraintIds = new Set(Object.keys(state.constraints).filter((id) => state.constraints[id].state === 'active').sort(idSort));
    const selectedMessageIds = new Set(Object.keys(state.messages).filter((id) => !TERMINAL_MESSAGE_PHASES.includes(state.messages[id].phase)).sort(idSort));

    function relationSelected(type, targetId) {
      if (type === 'goal') return targetId === 'goal' && state.goal !== null;
      if (type === 'frontier') return targetId === 'frontier' && state.frontier !== null;
      if (type === 'task') return selectedTaskIds.has(targetId);
      if (type === 'constraint') return selectedConstraintIds.has(targetId);
      if (type === 'message') return selectedMessageIds.has(targetId);
      return false;
    }

    const selectedDecisionEntries = Object.keys(state.operatorDecisions).sort(idSort).filter((decisionId) => {
      const decision = state.operatorDecisions[decisionId];
      return relationSelected(decision.targetType, decision.targetId);
    }).map((decisionId) => {
      const decision = state.operatorDecisions[decisionId];
      return factEntry(decisionId, decision, 'explicit-decision-target', `${decision.targetType}:${decision.targetId}`);
    });

    const selectedEvidenceEntries = Object.keys(state.evidence).sort(idSort).filter((evidenceId) => {
      const evidence = state.evidence[evidenceId];
      return relationSelected(evidence.subjectType, evidence.subjectId);
    }).map((evidenceId) => {
      const evidence = state.evidence[evidenceId];
      return factEntry(evidenceId, evidence, 'explicit-evidence-subject', `${evidence.subjectType}:${evidence.subjectId}`);
    });

    const selected = {
      schemaVersion: SCHEMA_VERSION,
      selectorVersion: SELECTOR_VERSION,
      watermark: clone(state.provenance.watermark),
      goal: state.goal === null ? null : factEntry('goal', state.goal, 'current-goal'),
      frontier: state.frontier === null ? null : factEntry('frontier', state.frontier, 'current-frontier'),
      constraints: Array.from(selectedConstraintIds).map((constraintId) => factEntry(constraintId, state.constraints[constraintId], 'active-constraint')),
      tasks: selectedTaskEntries,
      messages: Array.from(selectedMessageIds).sort(idSort).map((messageId) => factEntry(messageId, state.messages[messageId], 'nonterminal-message')),
      operatorDecisions: selectedDecisionEntries,
      evidence: selectedEvidenceEntries,
      // P2 artifact facts have no typed subject/target relation. P3 therefore
      // excludes them rather than inferring relevance from recency or prose.
      artifacts: [],
    };
    // The exact output schema has no accepted-event archive field. Domain
    // facts are intentionally opaque here, so valid user text may contain
    // internal-looking literals without being interpreted as structure.
    validateWorkingSetShape(selected);
    return clone(selected);
  }

  global.ProgressiveStateMemoryM7P3 = Object.freeze({
    SCHEMA_VERSION,
    SELECTOR_VERSION,
    selectActiveWorkingSet,
  });
}(globalThis));
