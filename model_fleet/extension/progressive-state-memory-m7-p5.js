'use strict';

// PSM P5: deterministic base/delta checkpoint transport over accepted P4 capsules.
(function installProgressiveStateMemoryP5(global) {
  const p4 = global.ProgressiveStateMemoryM7P4;
  if (!p4) throw new Error('PSM P5 requires the accepted P4 module');

  const SCHEMA_VERSION = 1;
  const CHECKPOINT_KIND = Object.freeze({ BASE: 'base', DELTA: 'delta' });
  const CHANGE_KEYS = Object.freeze(['artifacts', 'constraints', 'evidence', 'frontier', 'goal', 'messages', 'nextAction', 'nextActionGap', 'operatorDecisions', 'tasks']);

  function reject(reason) {
    const error = new Error(`PSM P5 rejected: ${reason}`);
    error.code = 'PSM_P5_REJECTED';
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
  function keysExact(value, allowed, reason) {
    if (!plainObject(value)) throw reject(reason);
    const actual = Object.keys(value).sort();
    const expected = allowed.slice().sort();
    if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) throw reject(reason);
  }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function canonical(value) {
    if (Array.isArray(value)) return value.map(canonical);
    if (plainObject(value)) {
      const result = {};
      Object.keys(value).sort().forEach((key) => { result[key] = canonical(value[key]); });
      return result;
    }
    return value;
  }
  function stable(value) { return JSON.stringify(canonical(value)); }
  function equal(left, right) { return stable(left) === stable(right); }
  function validatedCapsule(value) {
    try { return p4.validateRestartCapsule(value); } catch (error) { throw reject('invalid-p4-capsule'); }
  }
  function watermark(value) {
    keysExact(value, ['sequence', 'eventId', 'at'], 'invalid-watermark');
    if (!Number.isInteger(value.sequence) || value.sequence < 0 || (value.eventId !== null && typeof value.eventId !== 'string') || typeof value.at !== 'number' || !Number.isFinite(value.at) || value.at < 0) throw reject('invalid-watermark');
    return clone(value);
  }
  function safeGeneration(value) { return Number.isSafeInteger(value) && value >= 0; }
  function validateProject(value) {
    keysExact(value, ['id', 'repositoryPath', 'branch', 'head'], 'invalid-delta-project');
    if (typeof value.id !== 'string' || value.id.length === 0 || value.id.length > 512 || typeof value.repositoryPath !== 'string' || value.repositoryPath.length === 0 || value.repositoryPath.length > 4096 || typeof value.branch !== 'string' || value.branch.length === 0 || value.branch.length > 512 || typeof value.head !== 'string' || value.head.length === 0 || value.head.length > 512) throw reject('invalid-delta-project');
    return clone(value);
  }
  function projectMetadata(capsule) { return stable(capsule.project); }
  function validateBase(value) {
    keysExact(value, ['schemaVersion', 'kind', 'generation', 'parentGeneration', 'capsule'], 'invalid-base-checkpoint');
    if (value.schemaVersion !== SCHEMA_VERSION || value.kind !== CHECKPOINT_KIND.BASE || !safeGeneration(value.generation) || value.parentGeneration !== null) throw reject('invalid-base-checkpoint');
    const capsule = validatedCapsule(value.capsule);
    return { schemaVersion: SCHEMA_VERSION, kind: CHECKPOINT_KIND.BASE, generation: value.generation, parentGeneration: null, capsule: clone(capsule) };
  }
  function validateDelta(value) {
    keysExact(value, ['schemaVersion', 'kind', 'generation', 'parentGeneration', 'project', 'parentWatermark', 'childWatermark', 'changes'], 'invalid-delta-checkpoint');
    if (value.schemaVersion !== SCHEMA_VERSION || value.kind !== CHECKPOINT_KIND.DELTA || !safeGeneration(value.generation) || value.generation < 1 || !safeGeneration(value.parentGeneration) || value.parentGeneration === Number.MAX_SAFE_INTEGER || value.generation !== value.parentGeneration + 1) throw reject('invalid-delta-generation');
    const project = validateProject(value.project);
    watermark(value.parentWatermark);
    watermark(value.childWatermark);
    if (value.childWatermark.sequence <= value.parentWatermark.sequence || value.childWatermark.at < value.parentWatermark.at) throw reject('invalid-child-watermark');
    if (!plainObject(value.changes) || Object.keys(value.changes).some((key) => !CHANGE_KEYS.includes(key))) throw reject('invalid-delta-changes');
    keysExact(value.changes, Object.keys(value.changes), 'invalid-delta-changes');
    return { schemaVersion: SCHEMA_VERSION, kind: CHECKPOINT_KIND.DELTA, generation: value.generation, parentGeneration: value.parentGeneration, project, parentWatermark: clone(value.parentWatermark), childWatermark: clone(value.childWatermark), changes: canonical(value.changes) };
  }
  function validateCheckpoint(value) {
    if (!plainObject(value)) throw reject('invalid-checkpoint');
    return value.kind === CHECKPOINT_KIND.BASE ? validateBase(value) : value.kind === CHECKPOINT_KIND.DELTA ? validateDelta(value) : (() => { throw reject('unknown-checkpoint-kind'); })();
  }
  function checkpointPayload(capsule) {
    const payload = {};
    CHANGE_KEYS.forEach((key) => { payload[key] = capsule[key]; });
    return payload;
  }
  function changesBetween(parent, child) {
    const changes = {};
    CHANGE_KEYS.forEach((key) => {
      if (!equal(parent[key], child[key])) changes[key] = clone(child[key]);
    });
    return canonical(changes);
  }
  function createBaseCheckpointV1(capsule, generation = 0) {
    const validated = validatedCapsule(capsule);
    if (!safeGeneration(generation)) throw reject('invalid-base-generation');
    return validateBase({ schemaVersion: SCHEMA_VERSION, kind: CHECKPOINT_KIND.BASE, generation, parentGeneration: null, capsule: canonical(validated) });
  }
  function createDeltaCheckpointV1(parentCapsule, childCapsule, parentGeneration) {
    const parent = validatedCapsule(parentCapsule);
    const child = validatedCapsule(childCapsule);
    if (!safeGeneration(parentGeneration)) throw reject('invalid-parent-generation');
    if (parentGeneration === Number.MAX_SAFE_INTEGER) throw reject('generation-exhausted');
    if (projectMetadata(parent) !== projectMetadata(child)) throw reject('project-mismatch');
    if (equal(parent, child)) throw reject('no-op-delta');
    if (child.watermark.sequence <= parent.watermark.sequence || child.watermark.at < parent.watermark.at) throw reject('invalid-child-watermark');
    const changes = changesBetween(parent, child);
    if (Object.keys(changes).length === 0 && equal(parent.watermark, child.watermark)) throw reject('no-op-delta');
    return validateDelta({
      schemaVersion: SCHEMA_VERSION,
      kind: CHECKPOINT_KIND.DELTA,
      generation: parentGeneration + 1,
      parentGeneration,
      project: canonical(parent.project),
      parentWatermark: canonical(parent.watermark),
      childWatermark: canonical(child.watermark),
      changes,
    });
  }
  function applyDeltaCheckpointV1(parentCapsule, parentGeneration, delta) {
    const parent = validatedCapsule(parentCapsule);
    const validated = validateDelta(delta);
    if (!safeGeneration(parentGeneration) || validated.parentGeneration !== parentGeneration) throw reject('parent-generation-mismatch');
    if (!equal(parent.project, validated.project)) throw reject('project-mismatch');
    if (!equal(parent.watermark, validated.parentWatermark)) throw reject('parent-watermark-mismatch');
    const child = clone(parent);
    Object.keys(validated.changes).forEach((key) => { child[key] = clone(validated.changes[key]); });
    child.watermark = clone(validated.childWatermark);
    const reconstructed = validatedCapsule(child);
    if (!equal(reconstructed.watermark, validated.childWatermark)) throw reject('child-watermark-mismatch');
    return { generation: validated.generation, capsule: canonical(reconstructed) };
  }
  function replayCheckpointChainV1(base, deltas) {
    let current = validateBase(base);
    if (!Array.isArray(deltas)) throw reject('invalid-delta-chain');
    for (const delta of deltas) {
      const result = applyDeltaCheckpointV1(current.capsule, current.generation, delta);
      current = { schemaVersion: SCHEMA_VERSION, kind: CHECKPOINT_KIND.DELTA, generation: result.generation, parentGeneration: result.generation - 1, capsule: result.capsule };
    }
    return { generation: current.generation, capsule: canonical(current.capsule) };
  }
  function compactCheckpointChainV1(base, deltas) {
    const replayed = replayCheckpointChainV1(base, deltas);
    return { checkpoint: createBaseCheckpointV1(replayed.capsule, replayed.generation), deltas: [] };
  }

  global.ProgressiveStateMemoryM7P5 = Object.freeze({
    SCHEMA_VERSION,
    CHECKPOINT_KIND,
    CHANGE_KEYS,
    validateBaseCheckpointV1: validateBase,
    validateDeltaCheckpointV1: validateDelta,
    validateCheckpointV1: validateCheckpoint,
    createBaseCheckpointV1,
    buildBaseCheckpointV1: createBaseCheckpointV1,
    createDeltaCheckpointV1,
    buildDeltaCheckpointV1: createDeltaCheckpointV1,
    applyDeltaCheckpointV1,
    replayCheckpointChainV1,
    compactCheckpointChainV1,
  });
}(globalThis));
