'use strict';

// PSM P2: deterministic canonical state projection over the accepted P1 ledger.
// This module is intentionally not imported by background.js. P3 owns active
// working-set selection; later nodes own capsules, compaction, hydration, and
// restart bootstrap.
(function installProgressiveStateMemoryP2(global) {
  const p1 = global.ProgressiveStateMemoryM7P1;
  if (!p1) throw new Error('PSM P2 requires the accepted P1 module');

  const SCHEMA_VERSION = 1;
  const REDUCER_VERSION = 1;
  const PHASES = Object.freeze(['pending', 'active', 'blocked', 'done', 'cancelled']);
  const MESSAGE_PHASES = Object.freeze(['queued', 'delivered', 'running', 'done', 'blocked', 'cancelled']);
  const FRONTIER_STATES = Object.freeze(['open', 'blocked', 'complete', 'quiescent']);
  const CONSTRAINT_STATES = Object.freeze(['active', 'satisfied', 'superseded']);
  const DECISION_TARGETS = Object.freeze(['goal', 'frontier', 'task', 'message', 'constraint']);
  const EVENT_KINDS = Object.freeze(p1.EVENT_KINDS.slice());

  function reject(reason) {
    const error = new Error(`PSM P2 rejected: ${reason}`);
    error.code = 'PSM_P2_REJECTED';
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

  function own(value, key) {
    return Object.prototype.hasOwnProperty.call(value, key);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function keysExact(value, allowed) {
    return Object.keys(value).every((key) => allowed.includes(key));
  }

  function string(value, reason, { nonempty = true, max = 20000 } = {}) {
    if (typeof value !== 'string' || (nonempty && value.length === 0) || value.length > max) throw reject(reason);
    return value;
  }

  function id(value, reason) {
    if (typeof value !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._:-]{0,159}$/.test(value)) throw reject(reason);
    return value;
  }

  function finiteNumber(value, reason) {
    if (typeof value !== 'number' || !Number.isFinite(value)) throw reject(reason);
    return value;
  }

  function digest(value) {
    if (typeof value !== 'string' || !/^sha256:[a-f0-9]{64}$/.test(value)) throw reject('invalid-semantic-digest');
    return value;
  }

  function requiredObject(payload) {
    if (!plainObject(payload)) throw reject('semantic-payload-must-be-plain-object');
    return payload;
  }

  function validatePayload(kind, raw) {
    const payload = requiredObject(raw);
    let result;
    switch (kind) {
      case 'goal.changed':
        if (!keysExact(payload, ['goal'])) throw reject('unknown-goal-payload-field');
        result = { goal: string(payload.goal, 'invalid-goal') };
        break;
      case 'frontier.changed':
        if (!keysExact(payload, ['frontierKey', 'state', 'summary'])) throw reject('unknown-frontier-payload-field');
        result = {
          frontierKey: string(payload.frontierKey, 'invalid-frontier-key', { max: 512 }),
          state: string(payload.state, 'invalid-frontier-state', { max: 32 }),
          summary: string(payload.summary, 'invalid-frontier-summary', { nonempty: false }),
        };
        if (!FRONTIER_STATES.includes(result.state)) throw reject('invalid-frontier-state');
        break;
      case 'task.accepted':
        if (!keysExact(payload, ['taskId', 'title', 'role', 'phase', 'blocker', 'result', 'ownerWorkerId', 'dependencies', 'priority'])) throw reject('unknown-task-accepted-field');
        if (!Array.isArray(payload.dependencies) || payload.dependencies.some((value) => typeof value !== 'string')) throw reject('invalid-task-dependencies');
        result = {
          taskId: id(payload.taskId, 'invalid-task-id'),
          title: string(payload.title, 'invalid-task-title'),
          role: string(payload.role, 'invalid-task-role', { max: 64 }),
          phase: string(payload.phase, 'invalid-task-phase', { max: 32 }),
          blocker: payload.blocker === null ? null : string(payload.blocker, 'invalid-task-blocker'),
          result: payload.result === null ? null : string(payload.result, 'invalid-task-result'),
          ownerWorkerId: payload.ownerWorkerId === null ? null : id(payload.ownerWorkerId, 'invalid-task-owner'),
          dependencies: payload.dependencies.map((value) => id(value, 'invalid-task-dependency')),
          priority: finiteNumber(payload.priority, 'invalid-task-priority'),
        };
        if (!PHASES.includes(result.phase)) throw reject('invalid-task-phase');
        break;
      case 'task.blocked':
        if (!keysExact(payload, ['taskId', 'blocker'])) throw reject('unknown-task-blocked-field');
        result = { taskId: id(payload.taskId, 'invalid-task-id'), blocker: string(payload.blocker, 'invalid-task-blocker') };
        break;
      case 'task.completed':
        if (!keysExact(payload, ['taskId', 'result'])) throw reject('unknown-task-completed-field');
        result = { taskId: id(payload.taskId, 'invalid-task-id'), result: string(payload.result, 'invalid-task-result') };
        break;
      case 'message.accepted':
        if (!keysExact(payload, ['messageId', 'from', 'to', 'body', 'phase'])) throw reject('unknown-message-payload-field');
        result = {
          messageId: id(payload.messageId, 'invalid-message-id'),
          from: string(payload.from, 'invalid-message-from', { max: 160 }),
          to: string(payload.to, 'invalid-message-to', { max: 160 }),
          body: string(payload.body, 'invalid-message-body'),
          phase: string(payload.phase, 'invalid-message-phase', { max: 32 }),
        };
        if (!MESSAGE_PHASES.includes(result.phase)) throw reject('invalid-message-phase');
        break;
      case 'constraint.accepted':
        if (!keysExact(payload, ['constraintId', 'text', 'state'])) throw reject('unknown-constraint-payload-field');
        result = {
          constraintId: id(payload.constraintId, 'invalid-constraint-id'),
          text: string(payload.text, 'invalid-constraint-text'),
          state: string(payload.state, 'invalid-constraint-state', { max: 32 }),
        };
        if (!CONSTRAINT_STATES.includes(result.state)) throw reject('invalid-constraint-state');
        break;
      case 'artifact.accepted':
        if (!keysExact(payload, ['artifactId', 'kind', 'title', 'digest'])) throw reject('unknown-artifact-payload-field');
        result = {
          artifactId: id(payload.artifactId, 'invalid-artifact-id'),
          kind: string(payload.kind, 'invalid-artifact-kind', { max: 128 }),
          title: string(payload.title, 'invalid-artifact-title'),
          digest: digest(payload.digest),
        };
        break;
      case 'evidence.linked':
        if (!keysExact(payload, ['evidenceId', 'subjectType', 'subjectId', 'ref', 'digest'])) throw reject('unknown-evidence-payload-field');
        result = {
          evidenceId: id(payload.evidenceId, 'invalid-evidence-id'),
          subjectType: string(payload.subjectType, 'invalid-evidence-subject-type', { max: 64 }),
          subjectId: id(payload.subjectId, 'invalid-evidence-subject-id'),
          ref: string(payload.ref, 'invalid-evidence-ref', { max: 512 }),
          digest: digest(payload.digest),
        };
        break;
      case 'operator.decision':
        if (!keysExact(payload, ['decisionId', 'decision', 'targetType', 'targetId'])) throw reject('unknown-decision-payload-field');
        result = {
          decisionId: id(payload.decisionId, 'invalid-decision-id'),
          decision: string(payload.decision, 'invalid-decision'),
          targetType: string(payload.targetType, 'invalid-decision-target-type', { max: 32 }),
          targetId: id(payload.targetId, 'invalid-decision-target-id'),
        };
        if (!DECISION_TARGETS.includes(result.targetType)) throw reject('invalid-decision-target-type');
        break;
      default:
        throw reject('unsupported-event-kind');
    }
    return result;
  }

  function establishedBy(event) {
    return {
      eventId: event.eventId,
      sequence: event.sequence,
      at: event.at,
      kind: event.kind,
      source: clone(event.source),
      provenance: clone(event.provenance),
      supersedes: event.supersedes,
      conflictsWith: event.conflictsWith.slice(),
    };
  }

  function emptyState() {
    return {
      schemaVersion: SCHEMA_VERSION,
      reducerVersion: REDUCER_VERSION,
      goal: null,
      frontier: null,
      tasks: {},
      constraints: {},
      artifacts: {},
      evidence: {},
      messages: {},
      operatorDecisions: {},
      provenance: {
        watermark: { sequence: 0, eventId: null, at: 0 },
        acceptedEvents: {},
      },
    };
  }

  function stableValue(value) {
    if (Array.isArray(value)) return `[${value.map(stableValue).join(',')}]`;
    if (plainObject(value)) return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableValue(value[key])}`).join(',')}}`;
    return JSON.stringify(value);
  }

  function equalValue(left, right) {
    return stableValue(left) === stableValue(right);
  }

  function historyFromState(state) {
    const events = Object.entries(state.provenance.acceptedEvents).map(([key, event]) => {
      if (!plainObject(event) || key !== event.eventId) throw reject('invalid-canonical-event-index');
      return event;
    }).sort((a, b) => a.sequence - b.sequence);
    const watermark = state.provenance.watermark;
    if (events.length !== watermark.sequence) throw reject('invalid-canonical-watermark');
    const ledger = p1.validateLedger({
      schemaVersion: 1,
      nextSequence: events.length + 1,
      headEventId: events.length ? events[events.length - 1].eventId : null,
      events,
    });
    if (ledger.headEventId !== watermark.eventId || (events.length && ledger.events[ledger.events.length - 1].at !== watermark.at)) throw reject('invalid-canonical-watermark');
    return ledger.events;
  }

  function validateStateShape(state) {
    if (!plainObject(state) || state.schemaVersion !== SCHEMA_VERSION || state.reducerVersion !== REDUCER_VERSION) throw reject('invalid-canonical-state');
    if (!keysExact(state, ['schemaVersion', 'reducerVersion', 'goal', 'frontier', 'tasks', 'constraints', 'artifacts', 'evidence', 'messages', 'operatorDecisions', 'provenance'])) throw reject('unknown-canonical-state-field');
    if (state.goal !== null && !plainObject(state.goal)) throw reject('invalid-canonical-goal');
    if (state.frontier !== null && !plainObject(state.frontier)) throw reject('invalid-canonical-frontier');
    if (!plainObject(state.provenance) || !keysExact(state.provenance, ['watermark', 'acceptedEvents']) || !plainObject(state.provenance.watermark) || !keysExact(state.provenance.watermark, ['sequence', 'eventId', 'at']) || !plainObject(state.provenance.acceptedEvents)) throw reject('invalid-canonical-provenance');
    const watermark = state.provenance.watermark;
    if (!Number.isInteger(watermark.sequence) || watermark.sequence < 0) throw reject('invalid-canonical-watermark');
    if (watermark.sequence === 0 && watermark.eventId !== null) throw reject('invalid-canonical-watermark');
    if (watermark.sequence > 0 && typeof watermark.eventId !== 'string') throw reject('invalid-canonical-watermark');
    if (!Number.isInteger(watermark.at) || watermark.at < 0) throw reject('invalid-canonical-watermark');
    for (const collection of ['tasks', 'constraints', 'artifacts', 'evidence', 'messages', 'operatorDecisions']) {
      if (!plainObject(state[collection]) || Object.values(state[collection]).some((value) => !plainObject(value))) throw reject('invalid-canonical-collections');
    }
    return state;
  }

  function reduceEventInternal(current, admittedEvent) {
    if (!plainObject(admittedEvent)) throw reject('unvalidated-event');
    const expectedSequence = current.provenance.watermark.sequence + 1;
    const history = historyFromState(current);
    const candidateLedger = {
      schemaVersion: 1,
      nextSequence: history.length + 2,
      headEventId: admittedEvent.eventId,
      events: history.slice(),
    };
    candidateLedger.events.push(admittedEvent);
    const validatedLedger = p1.validateLedger(candidateLedger);
    const event = validatedLedger.events[validatedLedger.events.length - 1];
    const payload = validatePayload(event.kind, event.payload);
    if (event.sequence !== expectedSequence) throw reject('out-of-order-event');
    if (event.supersedes !== null && !own(current.provenance.acceptedEvents, event.supersedes)) throw reject('supersession-history-unavailable');
    const next = clone(current);
    next.provenance.acceptedEvents[event.eventId] = clone(event);
    next.provenance.watermark = { sequence: event.sequence, eventId: event.eventId, at: event.at };
    const fact = { ...payload, establishedBy: establishedBy(event) };
    switch (event.kind) {
      case 'goal.changed': next.goal = fact; break;
      case 'frontier.changed': next.frontier = fact; break;
      case 'task.accepted': next.tasks[payload.taskId] = fact; break;
      case 'task.blocked':
        if (!own(next.tasks, payload.taskId)) throw reject('task-not-established');
        next.tasks[payload.taskId] = { ...next.tasks[payload.taskId], phase: 'blocked', blocker: payload.blocker, establishedBy: establishedBy(event) };
        break;
      case 'task.completed':
        if (!own(next.tasks, payload.taskId)) throw reject('task-not-established');
        next.tasks[payload.taskId] = { ...next.tasks[payload.taskId], phase: 'done', result: payload.result, blocker: null, establishedBy: establishedBy(event) };
        break;
      case 'message.accepted': next.messages[payload.messageId] = fact; break;
      case 'constraint.accepted': next.constraints[payload.constraintId] = fact; break;
      case 'artifact.accepted': next.artifacts[payload.artifactId] = fact; break;
      case 'evidence.linked': next.evidence[payload.evidenceId] = fact; break;
      case 'operator.decision': next.operatorDecisions[payload.decisionId] = fact; break;
      default: throw reject('unsupported-event-kind');
    }
    return clone(next);
  }

  function replayHistory(history) {
    let state = emptyState();
    for (const event of history) state = reduceEventInternal(state, event);
    return state;
  }

  function validateState(state) {
    const current = validateStateShape(state);
    const history = historyFromState(current);
    const replayed = replayHistory(history);
    if (!equalValue(current, replayed)) throw reject('canonical-state-does-not-match-replay');
    return current;
  }

  function reduceEvent(state, admittedEvent) {
    const current = validateState(state);
    return reduceEventInternal(current, admittedEvent);
  }

  function reduceLedger(ledger) {
    const validated = p1.validateLedger(ledger);
    let state = emptyState();
    for (const event of validated.events) state = reduceEventInternal(state, event);
    return validateState(state);
  }

  global.ProgressiveStateMemoryM7P2 = Object.freeze({
    SCHEMA_VERSION,
    REDUCER_VERSION,
    EVENT_KINDS,
    emptyState,
    validatePayload,
    validateState,
    reduceEvent,
    reduceLedger,
  });
}(globalThis));
