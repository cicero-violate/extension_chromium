'use strict';

// PSM P4: deterministic restart-capsule projection over accepted P3 state.
(function installProgressiveStateMemoryP4(global) {
  const p3 = global.ProgressiveStateMemoryM7P3;
  if (!p3) throw new Error('PSM P4 requires the accepted P3 module');
  const p1 = global.ProgressiveStateMemoryM7P1;
  if (!p1) throw new Error('PSM P4 requires the accepted P1 module');

  const SCHEMA_VERSION = 1;
  const RENDERER_VERSION = 1;
  const NEXT_ACTION_GAP = 'not-encoded-by-p2-p3';

  function reject(reason) {
    const error = new Error(`PSM P4 rejected: ${reason}`);
    error.code = 'PSM_P4_REJECTED';
    error.reason = reason;
    return error;
  }

  function object(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
  function plainObject(value) {
    if (!object(value) || Object.prototype.toString.call(value) !== '[object Object]') return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || (typeof prototype.constructor === 'function' && prototype.constructor.name === 'Object');
  }
  function own(value, key) { return Object.prototype.hasOwnProperty.call(value, key); }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function keysExact(value, allowed, reason) {
    if (!plainObject(value)) throw reject(reason);
    const actual = Object.keys(value).sort();
    const expected = allowed.slice().sort();
    if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) throw reject(reason);
  }
  function nonemptyString(value, reason, max = 4096) {
    if (typeof value !== 'string' || value.length === 0 || value.length > max) throw reject(reason);
  }
  function validateWatermark(value) {
    keysExact(value, ['sequence', 'eventId', 'at'], 'invalid-watermark');
    if (!Number.isInteger(value.sequence) || value.sequence < 0 || (value.eventId !== null && typeof value.eventId !== 'string') || typeof value.at !== 'number' || !Number.isFinite(value.at) || value.at < 0) throw reject('invalid-watermark');
  }
  const TASK_PHASES = ['pending', 'active', 'blocked', 'done', 'cancelled'];
  const MESSAGE_PHASES = ['queued', 'delivered', 'running', 'done', 'blocked', 'cancelled'];
  const CONSTRAINT_STATES = ['active', 'satisfied', 'superseded'];
  const FRONTIER_STATES = ['open', 'blocked', 'complete', 'quiescent'];
  const DECISION_TARGETS = ['goal', 'frontier', 'task', 'message', 'constraint'];
  const ESTABLISHING_EVENT_KINDS = Object.freeze({
    goal: ['goal.changed'], frontier: ['frontier.changed'], constraint: ['constraint.accepted'],
    task: ['task.accepted', 'task.blocked', 'task.completed'], message: ['message.accepted'],
    artifact: ['artifact.accepted'], evidence: ['evidence.linked'], decision: ['operator.decision'],
  });
  function validString(value) { return typeof value === 'string' && value.length > 0; }
  function validNullableString(value) { return value === null || validString(value); }
  function validIdentifier(value) { return typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9._:-]{0,159}$/.test(value); }
  function validReference(value) { return typeof value === 'string' && value.length > 0 && value.length <= 512 && !/[\u0000-\u001f]/.test(value); }
  function validateEstablishedBy(value, factKind) {
    keysExact(value, ['eventId', 'sequence', 'at', 'kind', 'source', 'provenance', 'supersedes', 'conflictsWith'], 'invalid-fact-provenance');
    if (!validIdentifier(value.eventId)) throw reject('invalid-event-id');
    if (!Number.isInteger(value.sequence) || value.sequence < 1) throw reject('invalid-event-sequence');
    if (!Number.isInteger(value.at) || value.at <= 0) throw reject('invalid-event-time');
    if (!validString(value.kind)) throw reject('invalid-fact-provenance');
    if (!p1.EVENT_KINDS.includes(value.kind) || !ESTABLISHING_EVENT_KINDS[factKind].includes(value.kind)) throw reject('invalid-establishing-event-kind');
    keysExact(value.source, ['kind', 'id'], 'invalid-fact-source');
    if (!validString(value.source.kind) || !p1.SOURCE_KINDS.includes(value.source.kind) || !p1.EVENT_SOURCE_POLICY[value.kind]?.includes(value.source.kind)) throw reject('invalid-source-vocabulary');
    if (!validIdentifier(value.source.id)) throw reject('invalid-source-id');
    if (!Array.isArray(value.provenance) || value.provenance.length === 0) throw reject('provenance-required');
    if (!Array.isArray(value.conflictsWith)) throw reject('invalid-conflict-reference');
    if (value.supersedes !== null && (!validIdentifier(value.supersedes) || value.supersedes === value.eventId)) throw reject('invalid-supersession-reference');
    const provenanceIds = new Set();
    value.provenance.forEach((entry) => {
      keysExact(entry, ['kind', 'ref', 'digest'], 'invalid-fact-provenance');
      if (!validString(entry.kind) || !p1.PROVENANCE_KINDS.includes(entry.kind) || !validReference(entry.ref) || typeof entry.digest !== 'string' || !/^sha256:[a-f0-9]{64}$/.test(entry.digest)) throw reject('invalid-provenance-vocabulary');
      const identity = `${entry.kind}:${entry.ref}:${entry.digest}`;
      if (provenanceIds.has(identity)) throw reject('duplicate-provenance');
      provenanceIds.add(identity);
    });
    const conflictIds = new Set();
    value.conflictsWith.forEach((id) => {
      if (!validIdentifier(id) || id === value.eventId) throw reject('invalid-conflict-reference');
      if (conflictIds.has(id)) throw reject('duplicate-conflict-reference');
      conflictIds.add(id);
    });
  }
  function validateFact(kind, fact) {
    const schemas = {
      goal: ['goal', 'establishedBy'], frontier: ['frontierKey', 'state', 'summary', 'establishedBy'],
      constraint: ['constraintId', 'text', 'state', 'establishedBy'],
      task: ['taskId', 'title', 'role', 'phase', 'blocker', 'result', 'ownerWorkerId', 'dependencies', 'priority', 'establishedBy'],
      message: ['messageId', 'from', 'to', 'body', 'phase', 'establishedBy'],
      artifact: ['artifactId', 'kind', 'title', 'digest', 'establishedBy'],
      evidence: ['evidenceId', 'subjectType', 'subjectId', 'ref', 'digest', 'establishedBy'],
      decision: ['decisionId', 'decision', 'targetType', 'targetId', 'establishedBy'],
    };
    if (!schemas[kind] || !plainObject(fact)) throw reject('invalid-selected-fact');
    keysExact(fact, schemas[kind], 'unknown-fact-field');
    validateEstablishedBy(fact.establishedBy, kind);
    if (kind === 'goal' && !validString(fact.goal)) throw reject('invalid-goal-fact');
    if (kind === 'frontier' && (!validString(fact.frontierKey) || !FRONTIER_STATES.includes(fact.state) || typeof fact.summary !== 'string')) throw reject('invalid-frontier-fact');
    if (kind === 'constraint' && (!validString(fact.constraintId) || !validString(fact.text) || !CONSTRAINT_STATES.includes(fact.state))) throw reject('invalid-constraint-fact');
    if (kind === 'task' && (!validString(fact.taskId) || !validString(fact.title) || !validString(fact.role) || !TASK_PHASES.includes(fact.phase) || !validNullableString(fact.blocker) || !validNullableString(fact.result) || !validNullableString(fact.ownerWorkerId) || !Array.isArray(fact.dependencies) || fact.dependencies.some((id) => !validString(id)) || typeof fact.priority !== 'number' || !Number.isFinite(fact.priority))) throw reject('invalid-task-fact');
    if (kind === 'message' && (!validString(fact.messageId) || !validString(fact.from) || !validString(fact.to) || !validString(fact.body) || !MESSAGE_PHASES.includes(fact.phase))) throw reject('invalid-message-fact');
    if (kind === 'artifact' && (!validString(fact.artifactId) || !validString(fact.kind) || !validString(fact.title) || typeof fact.digest !== 'string' || !/^sha256:[a-f0-9]{64}$/.test(fact.digest))) throw reject('invalid-artifact-fact');
    if (kind === 'evidence' && (!validString(fact.evidenceId) || !validString(fact.subjectType) || !validString(fact.subjectId) || !validString(fact.ref) || typeof fact.digest !== 'string' || !/^sha256:[a-f0-9]{64}$/.test(fact.digest))) throw reject('invalid-evidence-fact');
    if (kind === 'decision' && (!validString(fact.decisionId) || !validString(fact.decision) || !DECISION_TARGETS.includes(fact.targetType) || !validString(fact.targetId))) throw reject('invalid-decision-fact');
  }
  function validateEntry(entry) {
    keysExact(entry, ['id', 'fact', 'selection'], 'invalid-selected-fact');
    if (typeof entry.id !== 'string' || !plainObject(entry.fact) || !plainObject(entry.selection)) throw reject('invalid-selected-fact');
    keysExact(entry.selection, ['code', 'via'], 'invalid-selection-reason');
    if (typeof entry.selection.code !== 'string' || entry.selection.code.length === 0 || (entry.selection.via !== null && typeof entry.selection.via !== 'string')) throw reject('invalid-selection-reason');
  }
  function validateCollection(value) {
    if (!Array.isArray(value)) throw reject('invalid-selected-collection');
    value.forEach(validateEntry);
  }
  function validateIdentity(kind, entry) {
    const expected = kind === 'goal' ? 'goal' : kind === 'frontier' ? 'frontier' : entry.fact[{
      constraint: 'constraintId', task: 'taskId', message: 'messageId', decision: 'decisionId', evidence: 'evidenceId', artifact: 'artifactId',
    }[kind]];
    if (entry.id !== expected) throw reject('wrapper-fact-identity-mismatch');
  }
  function validateUniqueIds(collection) {
    const ids = new Set();
    collection.forEach((entry) => {
      if (ids.has(entry.id)) throw reject('duplicate-selected-fact-id');
      ids.add(entry.id);
    });
  }
  function validateWatermarkLowerBound(capsule) {
    const established = [];
    if (capsule.goal !== null) established.push(capsule.goal.fact.establishedBy);
    if (capsule.frontier !== null) established.push(capsule.frontier.fact.establishedBy);
    [capsule.constraints, capsule.tasks, capsule.messages, capsule.operatorDecisions, capsule.evidence, capsule.artifacts].forEach((collection) => collection.forEach((entry) => established.push(entry.fact.establishedBy)));
    established.forEach((entry) => {
      if (capsule.watermark.sequence < entry.sequence || capsule.watermark.at < entry.at) throw reject('watermark-before-selected-fact');
    });
  }
  function validateProject(project) {
    keysExact(project, ['id', 'repositoryPath', 'branch', 'head'], 'invalid-project-metadata');
    nonemptyString(project.id, 'invalid-project-id', 512);
    nonemptyString(project.repositoryPath, 'invalid-repository-path');
    nonemptyString(project.branch, 'invalid-branch', 512);
    nonemptyString(project.head, 'invalid-head', 512);
  }
  function validateRestartCapsule(capsule) {
    keysExact(capsule, ['schemaVersion', 'rendererVersion', 'project', 'watermark', 'goal', 'frontier', 'constraints', 'tasks', 'messages', 'operatorDecisions', 'evidence', 'artifacts', 'nextAction', 'nextActionGap'], 'unknown-capsule-field');
    if (capsule.schemaVersion !== SCHEMA_VERSION || capsule.rendererVersion !== RENDERER_VERSION) throw reject('unsupported-capsule-version');
    validateProject(capsule.project);
    validateWatermark(capsule.watermark);
    [capsule.goal, capsule.frontier].forEach((entry) => { if (entry !== null) validateEntry(entry); });
    [capsule.constraints, capsule.tasks, capsule.messages, capsule.operatorDecisions, capsule.evidence, capsule.artifacts].forEach(validateCollection);
    if (capsule.nextAction !== null) throw reject('unverified-next-action');
    if (capsule.nextActionGap !== NEXT_ACTION_GAP) throw reject('invalid-next-action-gap');
    if (capsule.goal !== null) { validateFact('goal', capsule.goal.fact); validateIdentity('goal', capsule.goal); if (capsule.goal.selection.code !== 'current-goal' || capsule.goal.selection.via !== null) throw reject('invalid-goal-selection-reason'); }
    if (capsule.frontier !== null) { validateFact('frontier', capsule.frontier.fact); validateIdentity('frontier', capsule.frontier); if (capsule.frontier.selection.code !== 'current-frontier' || capsule.frontier.selection.via !== null) throw reject('invalid-frontier-selection-reason'); }
    capsule.constraints.forEach((entry) => { validateFact('constraint', entry.fact); validateIdentity('constraint', entry); if (entry.selection.code !== 'active-constraint' || entry.selection.via !== null) throw reject('invalid-constraint-selection-reason'); });
    capsule.tasks.forEach((entry) => { validateFact('task', entry.fact); validateIdentity('task', entry); if (!['nonterminal-task', 'blocked-task', 'dependency-closure'].includes(entry.selection.code) || (entry.selection.code === 'dependency-closure' ? !validString(entry.selection.via) : entry.selection.via !== null)) throw reject('invalid-task-selection-reason'); if (entry.selection.code === 'blocked-task' && entry.fact.phase !== 'blocked') throw reject('invalid-task-selection-reason'); if (entry.selection.code === 'nonterminal-task' && (entry.fact.phase === 'done' || entry.fact.phase === 'cancelled' || entry.fact.phase === 'blocked')) throw reject('invalid-task-selection-reason'); });
    capsule.messages.forEach((entry) => { validateFact('message', entry.fact); validateIdentity('message', entry); if (entry.selection.code !== 'nonterminal-message' || entry.selection.via !== null) throw reject('invalid-message-selection-reason'); });
    capsule.operatorDecisions.forEach((entry) => { validateFact('decision', entry.fact); validateIdentity('decision', entry); if (entry.selection.code !== 'explicit-decision-target' || entry.selection.via !== `${entry.fact.targetType}:${entry.fact.targetId}`) throw reject('invalid-decision-selection-reason'); });
    capsule.evidence.forEach((entry) => { validateFact('evidence', entry.fact); validateIdentity('evidence', entry); if (entry.selection.code !== 'explicit-evidence-subject' || entry.selection.via !== `${entry.fact.subjectType}:${entry.fact.subjectId}`) throw reject('invalid-evidence-selection-reason'); });
    capsule.artifacts.forEach((entry) => { validateFact('artifact', entry.fact); validateIdentity('artifact', entry); });
    if (capsule.artifacts.length !== 0) throw reject('unsupported-artifact-selection');
    [capsule.constraints, capsule.tasks, capsule.messages, capsule.operatorDecisions, capsule.evidence, capsule.artifacts].forEach(validateUniqueIds);
    validateWatermarkLowerBound(capsule);
    const taskIds = new Set(capsule.tasks.map((entry) => entry.id));
    capsule.tasks.forEach((entry) => {
      if (entry.selection.code === 'dependency-closure') {
        const parent = capsule.tasks.find((candidate) => candidate.id === entry.selection.via);
        if (!parent || !parent.fact.dependencies.includes(entry.id)) throw reject('invalid-task-selection-relation');
      }
    });
    const selectedRelation = (type, id) => (type === 'goal' && id === 'goal' && capsule.goal !== null) || (type === 'frontier' && id === 'frontier' && capsule.frontier !== null) || (type === 'task' && taskIds.has(id)) || (type === 'constraint' && capsule.constraints.some((entry) => entry.id === id)) || (type === 'message' && capsule.messages.some((entry) => entry.id === id));
    capsule.operatorDecisions.forEach((entry) => { if (!selectedRelation(entry.fact.targetType, entry.fact.targetId)) throw reject('invalid-decision-selection-relation'); });
    capsule.evidence.forEach((entry) => { if (!selectedRelation(entry.fact.subjectType, entry.fact.subjectId)) throw reject('invalid-evidence-selection-relation'); });
    return clone(capsule);
  }
  function buildRestartCapsule(state, project) {
    const workingSet = p3.selectActiveWorkingSet(state);
    return validateRestartCapsule({
      schemaVersion: SCHEMA_VERSION,
      rendererVersion: RENDERER_VERSION,
      project: clone(project),
      watermark: clone(workingSet.watermark),
      goal: clone(workingSet.goal),
      frontier: clone(workingSet.frontier),
      constraints: clone(workingSet.constraints),
      tasks: clone(workingSet.tasks),
      messages: clone(workingSet.messages),
      operatorDecisions: clone(workingSet.operatorDecisions),
      evidence: clone(workingSet.evidence),
      artifacts: clone(workingSet.artifacts),
      nextAction: null,
      nextActionGap: NEXT_ACTION_GAP,
    });
  }
  function utf8ByteLength(value) {
    let bytes = 0;
    for (let index = 0; index < value.length; index += 1) {
      const code = value.charCodeAt(index);
      if (code < 0x80) bytes += 1;
      else if (code < 0x800) bytes += 2;
      else if (code >= 0xd800 && code <= 0xdbff && index + 1 < value.length && value.charCodeAt(index + 1) >= 0xdc00 && value.charCodeAt(index + 1) <= 0xdfff) { bytes += 4; index += 1; }
      else bytes += 3;
    }
    return bytes;
  }
  function renderRestartCapsule(state, project, options = {}) {
    if (!plainObject(options)) throw reject('invalid-render-options');
    if (Object.keys(options).some((key) => key !== 'maxBytes')) throw reject('invalid-render-options');
    if (own(options, 'maxBytes') && (!Number.isInteger(options.maxBytes) || options.maxBytes <= 0)) throw reject('invalid-byte-budget');
    const capsule = buildRestartCapsule(state, project);
    const serialized = JSON.stringify(capsule);
    const byteLength = utf8ByteLength(serialized);
    if (own(options, 'maxBytes') && byteLength > options.maxBytes) throw reject('capsule-exceeds-byte-budget');
    return { capsule, serialized, byteLength };
  }
  function parseRestartCapsule(serialized) {
    if (typeof serialized !== 'string' || serialized.length === 0) throw reject('invalid-serialized-capsule');
    let parsed;
    try { parsed = JSON.parse(serialized); } catch (error) { throw reject('malformed-serialized-capsule'); }
    return validateRestartCapsule(parsed);
  }

  global.ProgressiveStateMemoryM7P4 = Object.freeze({
    SCHEMA_VERSION,
    RENDERER_VERSION,
    NEXT_ACTION_GAP,
    buildRestartCapsule,
    validateRestartCapsule,
    renderRestartCapsule,
    parseRestartCapsule,
    utf8ByteLength,
  });
}(globalThis));
