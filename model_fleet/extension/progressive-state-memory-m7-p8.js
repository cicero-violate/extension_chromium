'use strict';

// PSM P8: explicit, ephemeral evidence hydration over a validated P7 index.
(function installProgressiveStateMemoryP8(global) {
  const p7 = global.ProgressiveStateMemoryM7P7;
  if (!p7 || !global.crypto || !global.crypto.subtle || typeof global.TextEncoder !== 'function') throw new Error('PSM P8 requires the accepted P7 module and Web Crypto');

  const SCHEMA_VERSION = 1;
  const DIGEST_RE = /^sha256:[0-9a-f]{64}$/;
  const REQUEST_KEYS = ['schemaVersion', 'source', 'requestedEventIds', 'byteBudget'];
  const PLAN_KEYS = ['schemaVersion', 'source', 'requestedEventIds', 'byteBudget', 'items'];
  const BUNDLE_KEYS = ['schemaVersion', 'source', 'requestedEventIds', 'byteBudget', 'items', 'totalByteLength'];
  const ITEM_KEYS = ['eventId', 'evidenceId', 'subjectType', 'subjectId', 'ref', 'digest'];
  const HYDRATED_ITEM_KEYS = [...ITEM_KEYS, 'byteLength', 'bytes'];

  function reject(reason) { const error = new Error(`PSM P8 rejected: ${reason}`); error.code = 'PSM_P8_REJECTED'; error.reason = reason; return error; }
  function plain(value) { if (value === null || typeof value !== 'object' || Array.isArray(value) || Object.prototype.toString.call(value) !== '[object Object]') return false; const proto = Object.getPrototypeOf(value); return proto === null || (typeof proto.constructor === 'function' && proto.constructor.name === 'Object'); }
  function exact(value, allowed, reason) { if (!plain(value)) throw reject(reason); const actual = Object.keys(value).sort(); const expected = allowed.slice().sort(); if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) throw reject(reason); }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function canonical(value) { if (Array.isArray(value)) return value.map(canonical); if (plain(value)) { const result = {}; Object.keys(value).sort().forEach((key) => { result[key] = canonical(value[key]); }); return result; } return value; }
  function equal(left, right) { return JSON.stringify(canonical(left)) === JSON.stringify(canonical(right)); }
  function id(value) { return typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9._:-]{0,159}$/.test(value); }
  function digest(value) { return typeof value === 'string' && DIGEST_RE.test(value); }
  function source(value) { exact(value, ['rootDigest', 'tipDigest', 'generation'], 'invalid-source'); if (!digest(value.rootDigest) || !digest(value.tipDigest) || !Number.isSafeInteger(value.generation) || value.generation < 0) throw reject('invalid-source'); return clone(value); }
  function eventIds(value, reason, requireSorted = false) { if (!Array.isArray(value) || value.length === 0 || value.some((item) => !id(item))) throw reject(reason); const sorted = value.slice().sort(); if (new Set(value).size !== value.length || (requireSorted && sorted.some((item, index) => item !== value[index]))) throw reject(reason); return requireSorted ? value.slice() : sorted; }
  function budget(value) { if (!Number.isSafeInteger(value) || value <= 0) throw reject('invalid-byte-budget'); return value; }
  function descriptor(value) { exact(value, ITEM_KEYS, 'invalid-evidence-descriptor'); if (!id(value.eventId) || !id(value.evidenceId) || typeof value.subjectType !== 'string' || value.subjectType.length === 0 || typeof value.subjectId !== 'string' || value.subjectId.length === 0 || typeof value.ref !== 'string' || value.ref.length === 0 || !digest(value.digest)) throw reject('invalid-evidence-descriptor'); return canonical(clone(value)); }
  function evidenceMap(index) {
    const result = new Map();
    index.observedFactVersions.filter((entry) => entry.factType === 'evidence').forEach((entry) => {
      const fact = entry.fact;
      result.set(entry.eventId, descriptor({ eventId: entry.eventId, evidenceId: fact.evidenceId, subjectType: fact.subjectType, subjectId: fact.subjectId, ref: fact.ref, digest: fact.digest }));
    });
    return result;
  }
  function validatedIndex(index) { try { return p7.validateSupersessionConflictIndexV1(index); } catch (error) { throw reject('invalid-p7-index'); } }
  function validateRequest(value) { exact(value, REQUEST_KEYS, 'invalid-hydration-request'); return { schemaVersion: value.schemaVersion === SCHEMA_VERSION ? SCHEMA_VERSION : (() => { throw reject('invalid-hydration-request'); })(), source: source(value.source), requestedEventIds: eventIds(value.requestedEventIds, 'invalid-requested-event-ids'), byteBudget: budget(value.byteBudget) }; }
  function validatePlan(value, index) {
    exact(value, PLAN_KEYS, 'invalid-hydration-plan');
    if (value.schemaVersion !== SCHEMA_VERSION) throw reject('invalid-hydration-plan');
    const expectedSource = source(index.source); if (!equal(value.source, expectedSource)) throw reject('source-mismatch');
    const ids = eventIds(value.requestedEventIds, 'invalid-plan-event-ids', true);
    budget(value.byteBudget);
    if (!Array.isArray(value.items) || value.items.length !== ids.length) throw reject('invalid-plan-items');
    const map = evidenceMap(index);
    value.items.forEach((item, position) => { const actual = descriptor(item); if (actual.eventId !== ids[position] || !map.has(actual.eventId) || !equal(actual, map.get(actual.eventId))) throw reject('descriptor-mismatch'); });
    return canonical(clone(value));
  }
  function bytes(value) { if (!Array.isArray(value) || value.some((item) => !Number.isInteger(item) || item < 0 || item > 255)) throw reject('invalid-evidence-bytes'); return value.slice(); }
  function hydratedDescriptor(value) { exact(value, HYDRATED_ITEM_KEYS, 'invalid-hydrated-item'); return descriptor({ eventId: value.eventId, evidenceId: value.evidenceId, subjectType: value.subjectType, subjectId: value.subjectId, ref: value.ref, digest: value.digest }); }
  async function sha256(raw) { const hash = await global.crypto.subtle.digest('SHA-256', Uint8Array.from(raw)); return `sha256:${Array.from(new Uint8Array(hash)).map((item) => item.toString(16).padStart(2, '0')).join('')}`; }
  function validateBundleShape(value, index) {
    exact(value, BUNDLE_KEYS, 'invalid-hydrated-bundle');
    if (value.schemaVersion !== SCHEMA_VERSION) throw reject('invalid-hydrated-bundle');
    if (!equal(source(value.source), source(index.source))) throw reject('source-mismatch');
    const ids = eventIds(value.requestedEventIds, 'invalid-bundle-event-ids', true);
    const byteBudget = budget(value.byteBudget);
    if (!Array.isArray(value.items) || value.items.length !== ids.length || !Number.isSafeInteger(value.totalByteLength) || value.totalByteLength < 0 || value.totalByteLength > byteBudget) throw reject('invalid-hydrated-bundle');
    return { ids, items: value.items, total: value.totalByteLength, byteBudget };
  }
  async function validateHydratedEvidenceBundleV1(index, bundle) {
    const validated = validatedIndex(index); const shape = validateBundleShape(bundle, validated); const map = evidenceMap(validated); let total = 0;
    shape.items.forEach((item, position) => { const descriptorValue = hydratedDescriptor(item); if (descriptorValue.eventId !== shape.ids[position] || !map.has(descriptorValue.eventId) || !equal(descriptorValue, map.get(descriptorValue.eventId))) throw reject('descriptor-mismatch'); const raw = bytes(item.bytes); if (item.byteLength !== raw.length) throw reject('byte-length-mismatch'); total += raw.length; });
    if (total !== shape.total) throw reject('total-byte-length-mismatch');
    for (const item of shape.items) if (await sha256(item.bytes) !== item.digest) throw reject('evidence-digest-mismatch');
    return canonical(clone(bundle));
  }
  function createEvidenceHydrationRequestV1(index, requestedEventIds, byteBudget) { const validated = validatedIndex(index); const request = { schemaVersion: SCHEMA_VERSION, source: source(validated.source), requestedEventIds: eventIds(requestedEventIds, 'invalid-requested-event-ids'), byteBudget: budget(byteBudget) }; const map = evidenceMap(validated); request.requestedEventIds.forEach((eventId) => { if (!map.has(eventId)) throw reject('requested-event-not-evidence'); }); return request; }
  function planEvidenceHydrationV1(index, requestedEventIds, byteBudget) { const request = createEvidenceHydrationRequestV1(index, requestedEventIds.slice(), byteBudget); const map = evidenceMap(validatedIndex(index)); return { schemaVersion: SCHEMA_VERSION, source: source(request.source), requestedEventIds: request.requestedEventIds.slice(), byteBudget: request.byteBudget, items: request.requestedEventIds.map((eventId) => clone(map.get(eventId))) }; }
  async function hydrateEvidenceV1(index, planOrRequest, resolver) {
    const validated = validatedIndex(index); if (typeof resolver !== 'function') throw reject('resolver-required'); let plan;
    if (plain(planOrRequest) && Object.prototype.hasOwnProperty.call(planOrRequest, 'items')) plan = validatePlan(planOrRequest, validated);
    else { const request = validateRequest(planOrRequest); if (!equal(request.source, validated.source)) throw reject('source-mismatch'); plan = planEvidenceHydrationV1(validated, request.requestedEventIds, request.byteBudget); }
    const items = []; let total = 0;
    for (const descriptorValue of plan.items) { let result; const resolverDescriptor = Object.freeze(clone(descriptorValue)); try { result = await resolver(resolverDescriptor); } catch (error) { throw reject('resolver-failed'); } const raw = bytes(result); total += raw.length; if (raw.length > plan.byteBudget || total > plan.byteBudget) throw reject('byte-budget-exceeded'); items.push({ ...clone(descriptorValue), byteLength: raw.length, bytes: raw.slice() }); }
    return validateHydratedEvidenceBundleV1(validated, { schemaVersion: SCHEMA_VERSION, source: source(validated.source), requestedEventIds: plan.requestedEventIds.slice(), byteBudget: plan.byteBudget, items, totalByteLength: total });
  }

  global.ProgressiveStateMemoryM7P8 = Object.freeze({
    SCHEMA_VERSION,
    createEvidenceHydrationRequestV1,
    planEvidenceHydrationV1,
    hydrateEvidenceV1,
    validateEvidenceHydrationRequestV1: validateRequest,
    validateEvidenceHydrationPlanV1: validatePlan,
    validateHydratedEvidenceBundleV1,
  });
}(globalThis));
