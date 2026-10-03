'use strict';

// PSM P1: typed event admission and an append-only ledger contract.
// This module is intentionally not imported by background.js. P1 defines the
// durable history boundary; P2 will own reduction and later nodes may wire it
// through the existing serialized runtime boundary.
(function installProgressiveStateMemoryP1(global) {
  const SCHEMA_VERSION = 1;
  const STORAGE_KEY = 'modelFleetPsmLedger:v1';
  const SOURCE_KINDS = Object.freeze(['runtime', 'operator', 'verification', 'report', 'system']);
  const PROVENANCE_KINDS = Object.freeze(['runtime', 'operator', 'verification', 'report', 'test']);
  const EVENT_KINDS = Object.freeze([
    'goal.changed',
    'frontier.changed',
    'task.accepted',
    'task.blocked',
    'task.completed',
    'message.accepted',
    'constraint.accepted',
    'artifact.accepted',
    'evidence.linked',
    'operator.decision',
  ]);
  const EVENT_SOURCE_POLICY = Object.freeze({
    'goal.changed': Object.freeze(['operator', 'runtime', 'verification']),
    'frontier.changed': Object.freeze(['runtime', 'operator', 'verification']),
    'task.accepted': Object.freeze(['runtime', 'operator', 'verification']),
    'task.blocked': Object.freeze(['runtime', 'verification']),
    'task.completed': Object.freeze(['runtime', 'verification']),
    'message.accepted': Object.freeze(['runtime', 'operator']),
    'constraint.accepted': Object.freeze(['operator', 'verification']),
    'artifact.accepted': Object.freeze(['runtime', 'operator', 'verification']),
    'evidence.linked': Object.freeze(['runtime', 'operator', 'verification', 'report']),
    'operator.decision': Object.freeze(['operator']),
  });
  let appendQueue = Promise.resolve();

  function reject(reason) {
    const error = new Error(`PSM P1 rejected: ${reason}`);
    error.code = 'PSM_P1_REJECTED';
    error.reason = reason;
    return error;
  }

  function object(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  function plainObject(value) {
    if (!object(value)) return false;
    const tag = Object.prototype.toString.call(value);
    if (tag !== '[object Object]') return false;
    const prototype = Object.getPrototypeOf(value);
    if (prototype === null) return true;
    return typeof prototype.constructor === 'function' && prototype.constructor.name === 'Object';
  }

  function own(value, key) {
    return Object.prototype.hasOwnProperty.call(value, key);
  }

  function clone(value) {
    if (value === undefined) return undefined;
    return JSON.parse(JSON.stringify(value));
  }

  function positiveInteger(value) {
    return Number.isInteger(value) && value > 0;
  }

  function identifier(value, reason) {
    if (typeof value !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._:-]{0,159}$/.test(value)) throw reject(reason);
    return value;
  }

  function reference(value, reason) {
    if (typeof value !== 'string' || value.length === 0 || value.length > 512 || /[\u0000-\u001f]/.test(value)) throw reject(reason);
    return value;
  }

  function digest(value) {
    if (typeof value !== 'string' || !/^sha256:[a-f0-9]{64}$/.test(value)) throw reject('invalid-provenance-digest');
    return value;
  }

  function validateSource(source) {
    if (!plainObject(source) || !SOURCE_KINDS.includes(source.kind)) throw reject('invalid-source-kind');
    identifier(source.id, 'invalid-source-id');
    if (Object.keys(source).some((key) => !['kind', 'id'].includes(key))) throw reject('unknown-source-field');
    return { kind: source.kind, id: source.id };
  }

  function validateProvenance(provenance) {
    if (!Array.isArray(provenance) || provenance.length === 0) throw reject('provenance-required');
    const seen = new Set();
    const result = provenance.map((entry) => {
      if (!plainObject(entry) || !PROVENANCE_KINDS.includes(entry.kind)) throw reject('invalid-provenance-kind');
      reference(entry.ref, 'invalid-provenance-ref');
      const entryDigest = digest(entry.digest);
      const key = `${entry.kind}:${entry.ref}:${entryDigest}`;
      if (seen.has(key)) throw reject('duplicate-provenance');
      seen.add(key);
      if (Object.keys(entry).some((field) => !['kind', 'ref', 'digest'].includes(field))) throw reject('unknown-provenance-field');
      return { kind: entry.kind, ref: entry.ref, digest: entryDigest };
    });
    return result;
  }

  function validatePayload(payload) {
    if (!plainObject(payload)) throw reject('invalid-payload');
    const seen = new Set();
    function validateValue(value) {
      if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
      if (typeof value === 'number') { if (!Number.isFinite(value)) throw reject('unserializable-payload'); return; }
      if (Array.isArray(value)) {
        if (seen.has(value)) throw reject('cyclic-payload');
        seen.add(value);
        value.forEach(validateValue);
        seen.delete(value);
        return;
      }
      if (plainObject(value)) {
        if (seen.has(value)) throw reject('cyclic-payload');
        seen.add(value);
        for (const key of Object.keys(value)) {
          const descriptor = Object.getOwnPropertyDescriptor(value, key);
          if (!descriptor || !('value' in descriptor)) throw reject('accessor-payload');
          validateValue(descriptor.value);
        }
        seen.delete(value);
        return;
      }
      throw reject('unserializable-payload');
    }
    validateValue(payload);
    return clone(payload);
  }

  function validateEventInput(input, expectedSequence, priorEvents) {
    if (!plainObject(input)) throw reject('invalid-event');
    const allowed = ['eventId', 'sequence', 'at', 'kind', 'source', 'provenance', 'payload', 'supersedes', 'conflictsWith'];
    if (Object.keys(input).some((key) => !allowed.includes(key))) throw reject('unknown-event-field');
    const eventId = identifier(input.eventId, 'invalid-event-id');
    if (!positiveInteger(input.sequence) || input.sequence !== expectedSequence) throw reject('out-of-order-sequence');
    if (!positiveInteger(input.at)) throw reject('invalid-event-time');
    if (priorEvents.length && input.at < priorEvents[priorEvents.length - 1].at) throw reject('out-of-order-time');
    if (!EVENT_KINDS.includes(input.kind)) throw reject('unknown-event-kind');
    const source = validateSource(input.source);
    if (!EVENT_SOURCE_POLICY[input.kind]?.includes(source.kind)) throw reject('source-not-authorized-for-event-kind');
    const provenance = validateProvenance(input.provenance);
    const payload = validatePayload(input.payload);
    if (input.supersedes !== null && input.supersedes !== undefined) identifier(input.supersedes, 'invalid-supersession-reference');
    const conflictsWith = input.conflictsWith === undefined ? [] : input.conflictsWith;
    if (!Array.isArray(conflictsWith) || conflictsWith.some((value) => typeof value !== 'string')) throw reject('invalid-conflict-reference');
    const refs = new Set();
    for (const reference of conflictsWith) {
      identifier(reference, 'invalid-conflict-reference');
      if (refs.has(reference)) throw reject('duplicate-conflict-reference');
      refs.add(reference);
    }
    const previousIds = new Set(priorEvents.map((event) => event.eventId));
    if (previousIds.has(eventId)) throw reject('duplicate-event-id');
    if (input.supersedes !== null && input.supersedes !== undefined) {
      if (input.supersedes === eventId || !previousIds.has(input.supersedes)) throw reject('invalid-supersession-reference');
    }
    for (const reference of conflictsWith) {
      if (reference === eventId || !previousIds.has(reference)) throw reject('invalid-conflict-reference');
    }
    return {
      eventId,
      sequence: input.sequence,
      at: input.at,
      kind: input.kind,
      source,
      provenance,
      payload,
      supersedes: input.supersedes ?? null,
      conflictsWith: conflictsWith.slice(),
    };
  }

  function validateLedger(ledger) {
    if (!plainObject(ledger) || ledger.schemaVersion !== SCHEMA_VERSION) throw reject('invalid-ledger-schema');
    if (Object.keys(ledger).some((key) => !['schemaVersion', 'nextSequence', 'headEventId', 'events'].includes(key))) throw reject('unknown-ledger-field');
    if (!Array.isArray(ledger.events)) throw reject('invalid-ledger-events');
    if (!positiveInteger(ledger.nextSequence) || ledger.nextSequence !== ledger.events.length + 1) throw reject('invalid-ledger-sequence');
    if (ledger.headEventId !== null && typeof ledger.headEventId !== 'string') throw reject('invalid-ledger-head');
    let expected = 1;
    const ids = new Set();
    const events = [];
    for (const raw of ledger.events) {
      const event = validateEventInput(raw, expected, events);
      if (ids.has(event.eventId)) throw reject('duplicate-ledger-event-id');
      ids.add(event.eventId);
      events.push(event);
      expected += 1;
    }
    const head = events.length ? events[events.length - 1].eventId : null;
    if (ledger.headEventId !== head) throw reject('invalid-ledger-head');
    return { schemaVersion: SCHEMA_VERSION, nextSequence: expected, headEventId: head, events: clone(events) };
  }

  function emptyLedger() {
    return { schemaVersion: SCHEMA_VERSION, nextSequence: 1, headEventId: null, events: [] };
  }

  function admitEvent(ledger, input) {
    const current = validateLedger(ledger);
    const event = validateEventInput(input, current.nextSequence, current.events);
    const next = {
      schemaVersion: SCHEMA_VERSION,
      nextSequence: current.nextSequence + 1,
      headEventId: event.eventId,
      events: [...current.events, event],
    };
    return { ledger: next, event: clone(event) };
  }

  function stableValue(value) {
    if (Array.isArray(value)) return `[${value.map(stableValue).join(',')}]`;
    if (object(value)) return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableValue(value[key])}`).join(',')}}`;
    return JSON.stringify(value);
  }

  function serializeLedger(ledger) {
    return stableValue(validateLedger(ledger));
  }

  function deserializeLedger(serialized) {
    if (typeof serialized !== 'string' || serialized.length === 0) throw reject('invalid-ledger-serialization');
    let parsed;
    try { parsed = JSON.parse(serialized); } catch { throw reject('invalid-ledger-serialization'); }
    return validateLedger(parsed);
  }

  function storageAdapter(storage) {
    if (!storage || typeof storage.get !== 'function' || typeof storage.set !== 'function') throw reject('invalid-storage-boundary');
    return storage;
  }

  function rejectKeyOverride(argumentCount, expectedArguments) {
    if (argumentCount > expectedArguments) throw reject('storage-key-override-forbidden');
  }

  async function loadLedger(storage) {
    rejectKeyOverride(arguments.length, 1);
    storageAdapter(storage);
    const result = await storage.get([STORAGE_KEY]);
    if (!result || result[STORAGE_KEY] === undefined) return emptyLedger();
    if (typeof result[STORAGE_KEY] === 'string') return deserializeLedger(result[STORAGE_KEY]);
    return validateLedger(result[STORAGE_KEY]);
  }

  async function saveLedger(storage, ledger) {
    rejectKeyOverride(arguments.length, 2);
    storageAdapter(storage);
    const normalized = validateLedger(ledger);
    await storage.set({ [STORAGE_KEY]: serializeLedger(normalized) });
    return normalized;
  }

  function appendEvent(storage, input) {
    rejectKeyOverride(arguments.length, 2);
    const operation = appendQueue.then(async () => {
      const current = await loadLedger(storage);
      const candidate = own(input, 'sequence') ? input : { ...input, sequence: current.nextSequence };
      const admitted = admitEvent(current, candidate);
      const ledger = await saveLedger(storage, admitted.ledger);
      return { ledger, event: admitted.event };
    });
    appendQueue = operation.catch(() => {});
    return operation;
  }

  global.ProgressiveStateMemoryM7P1 = Object.freeze({
    SCHEMA_VERSION,
    STORAGE_KEY,
    SOURCE_KINDS,
    PROVENANCE_KINDS,
    EVENT_KINDS,
    EVENT_SOURCE_POLICY,
    emptyLedger,
    validateLedger,
    admitEvent,
    serializeLedger,
    deserializeLedger,
    loadLedger,
    saveLedger,
    appendEvent,
  });
}(globalThis));
