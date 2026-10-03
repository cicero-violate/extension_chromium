'use strict';

// PSM P12: explicit, externally supplied restart-action authorization.
(function installProgressiveStateMemoryP12(global) {
  const p9 = global.ProgressiveStateMemoryM7P9;
  if (!p9) throw new Error('PSM P12 requires the accepted P9 module');

  const SCHEMA_VERSION = 1;
  const AUTHORIZATION_VERSION = 1;
  const ACTION_GAP = 'not-encoded-by-p2-p3';
  const GAP_STATE = 'structurally-valid-action-gap';
  const READY_STATE = 'restart-ready-explicit-action';
  const ID_RE = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,159}$/;
  const DIGEST_RE = /^sha256:[0-9a-f]{64}$/;
  const SOURCE_KEYS = ['rootDigest', 'tipDigest', 'generation'];
  const PROJECT_KEYS = ['id', 'repositoryPath', 'branch', 'head'];
  const WATERMARK_KEYS = ['sequence', 'eventId', 'at'];
  const AUTH_KEYS = ['schemaVersion', 'authorizationVersion', 'source', 'project', 'watermark', 'actionId', 'authority', 'action'];
  const AUTHORITY_KEYS = ['kind', 'authorizationId'];
  const ACTION_KEYS = ['verb', 'target'];
  const TARGET_KEYS = ['type', 'id', 'eventId'];
  const READINESS_GAP_KEYS = ['schemaVersion', 'state', 'nextAction', 'nextActionStatus', 'source', 'project', 'watermark'];

  function reject(reason) { const error = new Error(`PSM P12 rejected: ${reason}`); error.code = 'PSM_P12_REJECTED'; error.reason = reason; return error; }
  function plain(value) { if (value === null || typeof value !== 'object' || Array.isArray(value) || Object.prototype.toString.call(value) !== '[object Object]') return false; const proto = Object.getPrototypeOf(value); return proto === null || (typeof proto.constructor === 'function' && proto.constructor.name === 'Object'); }
  function exact(value, allowed, reason) { if (!plain(value)) throw reject(reason); const actual = Object.keys(value).sort(); const expected = allowed.slice().sort(); if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) throw reject(reason); }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function canonical(value) { if (Array.isArray(value)) return value.map(canonical); if (plain(value)) { const out = {}; Object.keys(value).sort().forEach((key) => { out[key] = canonical(value[key]); }); return out; } return value; }
  function equal(left, right) { return JSON.stringify(canonical(left)) === JSON.stringify(canonical(right)); }
  function id(value) { return typeof value === 'string' && ID_RE.test(value); }
  function digest(value) { return typeof value === 'string' && DIGEST_RE.test(value); }
  function validateSource(value) { exact(value, SOURCE_KEYS, 'invalid-source'); if (!digest(value.rootDigest) || !digest(value.tipDigest) || !Number.isSafeInteger(value.generation) || value.generation < 0) throw reject('invalid-source'); return clone(value); }
  function validateProject(value) { exact(value, PROJECT_KEYS, 'invalid-project'); PROJECT_KEYS.forEach((key) => { if (typeof value[key] !== 'string' || value[key].length === 0) throw reject('invalid-project'); }); return clone(value); }
  function validateWatermark(value) { exact(value, WATERMARK_KEYS, 'invalid-watermark'); if (!Number.isSafeInteger(value.sequence) || value.sequence < 0 || typeof value.at !== 'number' || !Number.isFinite(value.at) || value.at < 0 || (value.eventId !== null && !id(value.eventId))) throw reject('invalid-watermark'); return clone(value); }
  function currentFact(capsule, type, targetId) {
    if (type === 'frontier') return capsule.frontier && capsule.frontier.fact.frontierKey === targetId ? capsule.frontier.fact : null;
    const collection = type === 'task' ? capsule.tasks : type === 'message' ? capsule.messages : null;
    if (!collection) return null;
    return collection.find((entry) => entry.fact[type === 'task' ? 'taskId' : 'messageId'] === targetId)?.fact || null;
  }
  function targetAllowed(fact, type) {
    if (type === 'task') return fact.phase === 'pending' || fact.phase === 'active';
    if (type === 'message') return fact.phase === 'queued' || fact.phase === 'running';
    return fact.state === 'open';
  }
  function validateAuthorizationShape(value) {
    exact(value, AUTH_KEYS, 'invalid-authorization');
    if (value.schemaVersion !== SCHEMA_VERSION || value.authorizationVersion !== AUTHORIZATION_VERSION) throw reject('invalid-authorization-version');
    validateSource(value.source); validateProject(value.project); validateWatermark(value.watermark);
    if (!id(value.actionId)) throw reject('invalid-action-id');
    exact(value.authority, AUTHORITY_KEYS, 'invalid-authority');
    if (value.authority.kind !== 'operator' || !id(value.authority.authorizationId)) throw reject('invalid-authority');
    exact(value.action, ACTION_KEYS, 'invalid-action');
    if (value.action.verb !== 'continue') throw reject('invalid-action-verb');
    exact(value.action.target, TARGET_KEYS, 'invalid-action-target');
    if (!['task', 'message', 'frontier'].includes(value.action.target.type) || !id(value.action.target.id) || !id(value.action.target.eventId)) throw reject('invalid-action-target');
  }
  function validateAgainstBootstrap(value, bootstrap) {
    validateAuthorizationShape(value);
    if (!equal(value.source, bootstrap.source) || !equal(value.project, bootstrap.project) || !equal(value.watermark, bootstrap.watermark)) throw reject('authorization-source-mismatch');
    const target = value.action.target;
    const fact = currentFact(bootstrap.capsule, target.type, target.id);
    if (!fact || fact.establishedBy.eventId !== target.eventId) throw reject('target-not-current');
    if (!bootstrap.finalCurrentEventIds.includes(target.eventId)) throw reject('target-not-final-current');
    if (bootstrap.doNotResurrectEventIds.includes(target.eventId)) throw reject('target-superseded');
    if (!targetAllowed(fact, target.type)) throw reject('target-not-restartable');
    return canonical(clone(value));
  }
  async function validatedBootstrap(chain, reality, bootstrap, continuity) {
    try { return await p9.validateRestartBootstrapV1(chain, reality, bootstrap, continuity || null); } catch (error) { throw reject('invalid-p9-bootstrap'); }
  }
  async function createRestartActionAuthorizationV1(chain, reality, bootstrap, explicitAction, explicitAuthority, continuity = null) {
    const validated = await validatedBootstrap(chain, reality, bootstrap, continuity);
    exact(explicitAction, ['actionId', 'action'], 'invalid-explicit-action');
    exact(explicitAuthority, AUTHORITY_KEYS, 'invalid-explicit-authority');
    const authorization = { schemaVersion: SCHEMA_VERSION, authorizationVersion: AUTHORIZATION_VERSION, source: clone(validated.source), project: clone(validated.project), watermark: clone(validated.watermark), actionId: explicitAction.actionId, authority: clone(explicitAuthority), action: clone(explicitAction.action) };
    return validateAgainstBootstrap(authorization, validated);
  }
  async function validateRestartActionAuthorizationV1(chain, reality, bootstrap, authorization, continuity = null) {
    const validated = await validatedBootstrap(chain, reality, bootstrap, continuity);
    return validateAgainstBootstrap(authorization, validated);
  }
  async function assessRestartReadinessV1(chain, reality, bootstrap, authorization = null, continuity = null) {
    const validated = await validatedBootstrap(chain, reality, bootstrap, continuity);
    const base = { schemaVersion: SCHEMA_VERSION, source: clone(validated.source), project: clone(validated.project), watermark: clone(validated.watermark) };
    if (authorization === null) return canonical({ ...base, state: GAP_STATE, nextAction: null, nextActionStatus: ACTION_GAP });
    const accepted = validateAgainstBootstrap(authorization, validated);
    return canonical({ ...base, state: READY_STATE, nextAction: clone(accepted.action), actionId: accepted.actionId, authority: clone(accepted.authority) });
  }
  global.ProgressiveStateMemoryM7P12 = Object.freeze({
    SCHEMA_VERSION, AUTHORIZATION_VERSION, ACTION_GAP, GAP_STATE, READY_STATE,
    createRestartActionAuthorizationV1, validateRestartActionAuthorizationV1, assessRestartReadinessV1,
  });
}(globalThis));
