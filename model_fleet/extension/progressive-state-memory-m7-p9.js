'use strict';

// PSM P9: offline restart-bootstrap projection over verified P6/P7/P8 material.
(function installProgressiveStateMemoryP9(global) {
  const p4 = global.ProgressiveStateMemoryM7P4;
  const p5 = global.ProgressiveStateMemoryM7P5;
  const p6 = global.ProgressiveStateMemoryM7P6;
  const p7 = global.ProgressiveStateMemoryM7P7;
  const p8 = global.ProgressiveStateMemoryM7P8;
  if (!p4 || !p5 || !p6 || !p7 || !p8 || !global.TextEncoder) throw new Error('PSM P9 requires accepted P4-P8 modules');

  const SCHEMA_VERSION = 1;
  const BOOTSTRAP_VERSION = 1;
  const ACTION_GAP = 'not-encoded-by-p2-p3';
  const STATE = 'structurally-valid-action-gap';
  const DIGEST_RE = /^sha256:[0-9a-f]{64}$/;
  const PROJECT_KEYS = ['id', 'repositoryPath', 'branch', 'head'];
  const SOURCE_KEYS = ['rootDigest', 'tipDigest', 'generation'];
  const BOOTSTRAP_KEYS = ['schemaVersion', 'bootstrapVersion', 'source', 'project', 'watermark', 'capsule', 'finalCurrentEventIds', 'doNotResurrectEventIds', 'unresolvedConflicts', 'unresolvedReferences', 'hydratedEvidenceBundles', 'nextAction', 'nextActionStatus', 'state'];
  const COMPACT_BOOTSTRAP_KEYS = BOOTSTRAP_KEYS.concat('continuity');

  function reject(reason) { const error = new Error(`PSM P9 rejected: ${reason}`); error.code = 'PSM_P9_REJECTED'; error.reason = reason; return error; }
  function plain(value) { if (value === null || typeof value !== 'object' || Array.isArray(value) || Object.prototype.toString.call(value) !== '[object Object]') return false; const proto = Object.getPrototypeOf(value); return proto === null || (typeof proto.constructor === 'function' && proto.constructor.name === 'Object'); }
  function exact(value, allowed, reason) { if (!plain(value)) throw reject(reason); const actual = Object.keys(value).sort(); const expected = allowed.slice().sort(); if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) throw reject(reason); }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function canonical(value) { if (Array.isArray(value)) return value.map(canonical); if (plain(value)) { const result = {}; Object.keys(value).sort().forEach((key) => { result[key] = canonical(value[key]); }); return result; } return value; }
  function equal(left, right) { return JSON.stringify(canonical(left)) === JSON.stringify(canonical(right)); }
  function id(value) { return typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9._:-]{0,159}$/.test(value); }
  function digest(value) { return typeof value === 'string' && DIGEST_RE.test(value); }
  function project(value) { exact(value, PROJECT_KEYS, 'invalid-project-reality'); if (PROJECT_KEYS.some((key) => typeof value[key] !== 'string' || value[key].length === 0)) throw reject('invalid-project-reality'); return clone(value); }
  function source(value) { exact(value, SOURCE_KEYS, 'invalid-bootstrap-source'); if (!digest(value.rootDigest) || !digest(value.tipDigest) || !Number.isSafeInteger(value.generation) || value.generation < 0) throw reject('invalid-bootstrap-source'); return clone(value); }
  function sortedIds(value, reason, allowEmpty = true) { if (!Array.isArray(value) || (!allowEmpty && value.length === 0) || value.some((item) => !id(item))) throw reject(reason); const sorted = value.slice().sort(); if (new Set(value).size !== value.length || sorted.some((item, index) => item !== value[index])) throw reject(reason); return value.slice(); }
  function utf8(value) { return new TextEncoder().encode(value).byteLength; }
  function maxBytes(value) { if (!Number.isSafeInteger(value) || value <= 0) throw reject('invalid-byte-budget'); return value; }
  function evidenceEventIds(capsule) { return new Set(capsule.evidence.map((entry) => entry.fact.establishedBy.eventId)); }
  function bundleKey(bundle) { return bundle.requestedEventIds.join('\u0000'); }
  async function verifiedMaterial(chain, reality, bundles, continuity = null) {
    let verified; try {
      verified = chain && chain.schemaVersion === p6.COMPACTED_CHAIN_SCHEMA_VERSION
        ? await p6.verifyCompactedMerkleChainV2(chain)
        : await p6.verifyMerkleChainV1(chain);
    } catch (error) { throw reject('invalid-p6-chain'); }
    let index; try { index = await p7.buildSupersessionConflictIndexV1(chain, continuity); } catch (error) { throw reject('invalid-p7-index'); }
    const capsule = p4.validateRestartCapsule(verified.capsule);
    const actualProject = project(reality);
    if (!equal(actualProject, capsule.project)) throw reject('stale-restart-context');
    if (!Array.isArray(bundles)) throw reject('invalid-hydrated-bundles');
    const normalizedBundles = [];
    const seenEvents = new Set(); const relevantEvidence = evidenceEventIds(capsule);
    for (const bundle of bundles) {
      let validated; try { validated = await p8.validateHydratedEvidenceBundleV1(index, bundle); } catch (error) { throw reject('invalid-hydrated-bundle'); }
      validated.requestedEventIds.forEach((eventId) => { if (seenEvents.has(eventId)) throw reject('duplicate-hydrated-evidence'); if (!relevantEvidence.has(eventId)) throw reject('irrelevant-hydrated-evidence'); seenEvents.add(eventId); });
      normalizedBundles.push(validated);
    }
    normalizedBundles.sort((left, right) => bundleKey(left).localeCompare(bundleKey(right)));
    return { verified, index, capsule, project: actualProject, hydratedEvidenceBundles: normalizedBundles, continuity: continuity ? p7.continuityIdentity(continuity) : null };
  }
  function expectedBootstrap(material) {
    const index = material.index;
    const result = {
      schemaVersion: SCHEMA_VERSION,
      bootstrapVersion: BOOTSTRAP_VERSION,
      source: { rootDigest: index.source.rootDigest, tipDigest: index.source.tipDigest, generation: index.source.generation },
      project: clone(material.project),
      watermark: clone(material.capsule.watermark),
      capsule: clone(material.capsule),
      finalCurrentEventIds: clone(index.finalCurrentEventIds),
      doNotResurrectEventIds: clone(index.doNotResurrectEventIds),
      unresolvedConflicts: clone(index.unresolvedConflicts),
      unresolvedReferences: clone(index.unresolvedReferences),
      hydratedEvidenceBundles: clone(material.hydratedEvidenceBundles),
      nextAction: null,
      nextActionStatus: ACTION_GAP,
      state: STATE,
    };
    if (material.continuity) result.continuity = clone(material.continuity);
    return result;
  }
  async function buildRestartBootstrapV1(chain, reality, hydratedEvidenceBundles = [], continuity = null) { const material = await verifiedMaterial(chain, reality, hydratedEvidenceBundles, continuity); return canonical(expectedBootstrap(material)); }
  async function validateRestartBootstrapV1(chain, reality, bootstrap, continuity = null) {
    const material = await verifiedMaterial(chain, reality, bootstrap && Array.isArray(bootstrap.hydratedEvidenceBundles) ? bootstrap.hydratedEvidenceBundles : [], continuity);
    exact(bootstrap, material.continuity ? COMPACT_BOOTSTRAP_KEYS : BOOTSTRAP_KEYS, 'invalid-bootstrap');
    if (!equal(canonical(bootstrap), canonical(expectedBootstrap(material)))) throw reject('bootstrap-derived-state-mismatch');
    source(bootstrap.source); project(bootstrap.project); p4.validateRestartCapsule(bootstrap.capsule);
    if (!equal(bootstrap.watermark, bootstrap.capsule.watermark) || bootstrap.nextAction !== null || bootstrap.nextActionStatus !== ACTION_GAP || bootstrap.state !== STATE) throw reject('invalid-bootstrap-action-state');
    if (material.continuity && !equal(bootstrap.continuity, material.continuity)) throw reject('invalid-bootstrap-continuity');
    sortedIds(bootstrap.finalCurrentEventIds, 'invalid-final-current-ids'); sortedIds(bootstrap.doNotResurrectEventIds, 'invalid-negative-memory');
    return canonical(clone(bootstrap));
  }
  function renderRestartBootstrapV1(bootstrap, options = {}) { exact(options, ['maxBytes'], 'invalid-render-options'); const limit = maxBytes(options.maxBytes); const serialized = JSON.stringify(canonical(bootstrap)); const byteLength = utf8(serialized); if (byteLength > limit) throw reject('bootstrap-exceeds-byte-budget'); return { serialized, byteLength, bootstrap: canonical(clone(bootstrap)) }; }
  async function buildAndRenderRestartBootstrapV1(chain, reality, hydratedEvidenceBundles = [], options = {}, continuity = null) { const bootstrap = await buildRestartBootstrapV1(chain, reality, hydratedEvidenceBundles, continuity); return renderRestartBootstrapV1(bootstrap, options); }

  global.ProgressiveStateMemoryM7P9 = Object.freeze({
    SCHEMA_VERSION,
    BOOTSTRAP_VERSION,
    ACTION_GAP,
    STATE,
    buildRestartBootstrapV1,
    validateRestartBootstrapV1,
    renderRestartBootstrapV1,
    buildAndRenderRestartBootstrapV1,
  });
}(globalThis));
