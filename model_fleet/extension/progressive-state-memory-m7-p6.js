'use strict';

// PSM P6: content-addressed provenance over accepted P5 checkpoints.
(function installProgressiveStateMemoryP6(global) {
  const p5 = global.ProgressiveStateMemoryM7P5;
  if (!p5) throw new Error('PSM P6 requires the accepted P5 module');
  const subtle = global.crypto && global.crypto.subtle;
  const TextEncoderImpl = global.TextEncoder;
  if (!subtle || typeof TextEncoderImpl !== 'function') throw new Error('PSM P6 requires Web Crypto and TextEncoder');

  const SCHEMA_VERSION = 1;
  const ALGORITHM = 'sha256';
  const DIGEST_RE = /^sha256:[0-9a-f]{64}$/;
  const CHECKPOINT_DOMAIN = 'psm:p6:checkpoint:v1';
  const NODE_DOMAIN = 'psm:p6:node:v1';
  const COMPACTION_DOMAIN = 'psm:p6:compaction:v1';
  const COMPACTION_CONTINUITY_DOMAIN = 'psm:p6:compaction-continuity:v1';
  const COMPACTION_RELATION = 'p5-compaction';
  const COMPACTION_CONTINUITY_SCHEMA_VERSION = 2;
  const COMPACTION_CONTINUITY_RELATION = 'p5-compaction-with-continuity';
  const COMPACTED_CHAIN_SCHEMA_VERSION = 2;
  const COMPACTED_CHAIN_RELATION = 'p5-compacted-chain-with-continuity';
  const COMPACTED_ROOT_DOMAIN = 'psm:p6:compacted-root:v2';
  const COMPACTED_NODE_DOMAIN = 'psm:p6:compacted-node:v2';

  function reject(reason) {
    const error = new Error(`PSM P6 rejected: ${reason}`);
    error.code = 'PSM_P6_REJECTED';
    error.reason = reason;
    return error;
  }
  function plain(value) {
    if (value === null || typeof value !== 'object' || Array.isArray(value) || Object.prototype.toString.call(value) !== '[object Object]') return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || (typeof prototype.constructor === 'function' && prototype.constructor.name === 'Object');
  }
  function own(value, key) { return Object.prototype.hasOwnProperty.call(value, key); }
  function exact(value, allowed, reason) {
    if (!plain(value)) throw reject(reason);
    const actual = Object.keys(value).sort();
    const expected = allowed.slice().sort();
    if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) throw reject(reason);
  }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function canonical(value) {
    if (Array.isArray(value)) return value.map(canonical);
    if (plain(value)) {
      const result = {};
      Object.keys(value).sort().forEach((key) => { result[key] = canonical(value[key]); });
      return result;
    }
    return value;
  }
  function json(value) {
    const encoded = JSON.stringify(canonical(value));
    if (typeof encoded !== 'string') throw reject('non-serializable-value');
    return encoded;
  }
  function equal(left, right) { return json(left) === json(right); }
  function digestShape(value, reason) {
    if (typeof value !== 'string' || !DIGEST_RE.test(value)) throw reject(reason);
    return value;
  }
  function validatedCheckpoint(value) {
    try { return canonical(p5.validateCheckpointV1(value)); } catch (error) { throw reject('invalid-p5-checkpoint'); }
  }
  function validatedBase(value) {
    try { return canonical(p5.validateBaseCheckpointV1(value)); } catch (error) { throw reject('invalid-p5-base'); }
  }
  function validatedDelta(value) {
    try { return canonical(p5.validateDeltaCheckpointV1(value)); } catch (error) { throw reject('invalid-p5-delta'); }
  }
  function preimage(domain, value) { return new TextEncoderImpl().encode(`${domain}\n${json(value)}`); }
  async function sha256(domain, value) {
    const bytes = await subtle.digest('SHA-256', preimage(domain, value));
    const view = new Uint8Array(bytes);
    let hex = '';
    for (const byte of view) hex += byte.toString(16).padStart(2, '0');
    return `sha256:${hex}`;
  }
  async function checkpointDigest(checkpoint) {
    return sha256(CHECKPOINT_DOMAIN, validatedCheckpoint(checkpoint));
  }
  async function nodeDigest(checkpointDigestValue, parentDigest) {
    digestShape(checkpointDigestValue, 'invalid-checkpoint-digest');
    if (parentDigest !== null) digestShape(parentDigest, 'invalid-parent-digest');
    return sha256(NODE_DOMAIN, { checkpointDigest: checkpointDigestValue, parentDigest });
  }
  function nodeRecord(checkpoint, checkpointDigestValue, parentDigest, nodeDigestValue) {
    return { schemaVersion: SCHEMA_VERSION, algorithm: ALGORITHM, checkpointDigest: checkpointDigestValue, parentDigest, nodeDigest: nodeDigestValue, checkpoint: clone(checkpoint) };
  }
  function validateNodeShape(node) {
    exact(node, ['schemaVersion', 'algorithm', 'checkpointDigest', 'parentDigest', 'nodeDigest', 'checkpoint'], 'invalid-merkle-node');
    if (node.schemaVersion !== SCHEMA_VERSION || node.algorithm !== ALGORITHM) throw reject('invalid-merkle-node');
    digestShape(node.checkpointDigest, 'invalid-checkpoint-digest');
    if (node.parentDigest !== null) digestShape(node.parentDigest, 'invalid-parent-digest');
    digestShape(node.nodeDigest, 'invalid-node-digest');
    return validatedCheckpoint(node.checkpoint);
  }
  function validateChainShape(chain) {
    exact(chain, ['schemaVersion', 'algorithm', 'rootDigest', 'tipDigest', 'nodes'], 'invalid-merkle-chain');
    if (chain.schemaVersion !== SCHEMA_VERSION || chain.algorithm !== ALGORITHM || !Array.isArray(chain.nodes) || chain.nodes.length === 0) throw reject('invalid-merkle-chain');
    digestShape(chain.rootDigest, 'invalid-root-digest');
    digestShape(chain.tipDigest, 'invalid-tip-digest');
    return chain;
  }
  async function buildMerkleChainV1(base, deltas) {
    const normalizedBase = validatedBase(base);
    if (!Array.isArray(deltas)) throw reject('invalid-delta-chain');
    let current = normalizedBase;
    let currentCapsule = normalizedBase.capsule;
    let currentGeneration = normalizedBase.generation;
    const checkpoints = [normalizedBase];
    for (const rawDelta of deltas) {
      const delta = validatedDelta(rawDelta);
      const applied = p5.applyDeltaCheckpointV1(currentCapsule, currentGeneration, delta);
      current = { schemaVersion: p5.SCHEMA_VERSION, kind: p5.CHECKPOINT_KIND.DELTA, generation: delta.generation, parentGeneration: delta.parentGeneration, project: clone(delta.project), parentWatermark: clone(delta.parentWatermark), childWatermark: clone(delta.childWatermark), changes: clone(delta.changes) };
      currentCapsule = applied.capsule;
      currentGeneration = applied.generation;
      checkpoints.push(current);
    }
    const nodes = [];
    let parentDigest = null;
    for (const checkpoint of checkpoints) {
      const checkpointDigestValue = await checkpointDigest(checkpoint);
      const nodeDigestValue = await nodeDigest(checkpointDigestValue, parentDigest);
      nodes.push(nodeRecord(checkpoint, checkpointDigestValue, parentDigest, nodeDigestValue));
      parentDigest = nodeDigestValue;
    }
    return validateChainShape({ schemaVersion: SCHEMA_VERSION, algorithm: ALGORITHM, rootDigest: nodes[0].nodeDigest, tipDigest: nodes[nodes.length - 1].nodeDigest, nodes });
  }
  async function verifyMerkleChainV1(chain) {
    validateChainShape(chain);
    let previousNode = null;
    let base = null;
    const deltas = [];
    for (let index = 0; index < chain.nodes.length; index += 1) {
      const node = chain.nodes[index];
      const checkpoint = validateNodeShape(node);
      const expectedCheckpointDigest = await checkpointDigest(checkpoint);
      if (node.checkpointDigest !== expectedCheckpointDigest) throw reject('checkpoint-digest-mismatch');
      const expectedParent = previousNode ? previousNode.nodeDigest : null;
      if (node.parentDigest !== expectedParent) throw reject('parent-digest-mismatch');
      const expectedNodeDigest = await nodeDigest(node.checkpointDigest, node.parentDigest);
      if (node.nodeDigest !== expectedNodeDigest) throw reject('node-digest-mismatch');
      if (index === 0) {
        if (checkpoint.kind !== p5.CHECKPOINT_KIND.BASE) throw reject('invalid-merkle-root');
        base = checkpoint;
      } else {
        if (checkpoint.kind !== p5.CHECKPOINT_KIND.DELTA) throw reject('invalid-merkle-order');
        deltas.push(checkpoint);
      }
      previousNode = node;
    }
    if (chain.rootDigest !== chain.nodes[0].nodeDigest || chain.tipDigest !== chain.nodes[chain.nodes.length - 1].nodeDigest) throw reject('chain-digest-mismatch');
    let replay;
    try { replay = p5.replayCheckpointChainV1(base, deltas); } catch (error) { throw reject('invalid-p5-chain'); }
    return { valid: true, generation: replay.generation, capsule: clone(replay.capsule), rootDigest: chain.rootDigest, tipDigest: chain.tipDigest };
  }
  async function verifyAnyChain(chain) {
    return chain && chain.schemaVersion === COMPACTED_CHAIN_SCHEMA_VERSION
      ? verifyCompactedMerkleChainV2(chain)
      : verifyMerkleChainV1(chain);
  }
  async function createCompactionLinkV1(sourceChain, compactedBase) {
    const verified = await verifyMerkleChainV1(sourceChain);
    const base = validatedBase(compactedBase);
    if (base.generation !== verified.generation || !equal(base.capsule, verified.capsule)) throw reject('invalid-compacted-base');
    const compactedBaseDigest = await checkpointDigest(base);
    const link = { schemaVersion: SCHEMA_VERSION, algorithm: ALGORITHM, relation: COMPACTION_RELATION, sourceTipDigest: verified.tipDigest, compactedBaseDigest, compactionDigest: await sha256(COMPACTION_DOMAIN, { sourceTipDigest: verified.tipDigest, compactedBaseDigest }) };
    await verifyCompactionLinkV1(link, sourceChain, base);
    return link;
  }
  async function verifyCompactionLinkV1(link, sourceChain, compactedBase) {
    exact(link, ['schemaVersion', 'algorithm', 'relation', 'sourceTipDigest', 'compactedBaseDigest', 'compactionDigest'], 'invalid-compaction-link');
    if (link.schemaVersion !== SCHEMA_VERSION || link.algorithm !== ALGORITHM || link.relation !== COMPACTION_RELATION) throw reject('invalid-compaction-link');
    const verified = await verifyMerkleChainV1(sourceChain);
    const base = validatedBase(compactedBase);
    const expectedBaseDigest = await checkpointDigest(base);
    if (link.sourceTipDigest !== verified.tipDigest || link.compactedBaseDigest !== expectedBaseDigest || base.generation !== verified.generation || !equal(base.capsule, verified.capsule)) throw reject('invalid-compaction-binding');
    const expected = await sha256(COMPACTION_DOMAIN, { sourceTipDigest: link.sourceTipDigest, compactedBaseDigest: link.compactedBaseDigest });
    if (link.compactionDigest !== expected) throw reject('compaction-digest-mismatch');
    return { valid: true, sourceTipDigest: link.sourceTipDigest, compactedBaseDigest: link.compactedBaseDigest, compactionDigest: link.compactionDigest };
  }
  async function createCompactionLinkV2(sourceChain, compactedBase, continuityDigest) {
    digestShape(continuityDigest, 'invalid-continuity-digest');
    const verified = await verifyAnyChain(sourceChain);
    const base = validatedBase(compactedBase);
    if (base.generation !== verified.generation || !equal(base.capsule, verified.capsule)) throw reject('invalid-compacted-base');
    const compactedBaseDigest = await checkpointDigest(base);
    const binding = { sourceTipDigest: verified.tipDigest, compactedBaseDigest, continuityDigest };
    const link = { schemaVersion: COMPACTION_CONTINUITY_SCHEMA_VERSION, algorithm: ALGORITHM, relation: COMPACTION_CONTINUITY_RELATION, sourceTipDigest: verified.tipDigest, compactedBaseDigest, continuityDigest, compactionDigest: await sha256(COMPACTION_CONTINUITY_DOMAIN, binding) };
    await verifyCompactionLinkV2(link, sourceChain, base);
    return link;
  }
  async function verifyCompactionLinkV2(link, sourceChain, compactedBase) {
    exact(link, ['schemaVersion', 'algorithm', 'relation', 'sourceTipDigest', 'compactedBaseDigest', 'continuityDigest', 'compactionDigest'], 'invalid-continuity-link');
    if (link.schemaVersion !== COMPACTION_CONTINUITY_SCHEMA_VERSION || link.algorithm !== ALGORITHM || link.relation !== COMPACTION_CONTINUITY_RELATION) throw reject('invalid-continuity-link');
    digestShape(link.sourceTipDigest, 'invalid-continuity-link'); digestShape(link.compactedBaseDigest, 'invalid-continuity-link'); digestShape(link.continuityDigest, 'invalid-continuity-link'); digestShape(link.compactionDigest, 'invalid-continuity-link');
    const verified = await verifyAnyChain(sourceChain);
    const base = validatedBase(compactedBase);
    const expectedBaseDigest = await checkpointDigest(base);
    if (link.sourceTipDigest !== verified.tipDigest || link.compactedBaseDigest !== expectedBaseDigest || base.generation !== verified.generation || !equal(base.capsule, verified.capsule)) throw reject('invalid-continuity-binding');
    const expected = await sha256(COMPACTION_CONTINUITY_DOMAIN, { sourceTipDigest: link.sourceTipDigest, compactedBaseDigest: link.compactedBaseDigest, continuityDigest: link.continuityDigest });
    if (link.compactionDigest !== expected) throw reject('continuity-link-digest-mismatch');
    return { valid: true, sourceTipDigest: link.sourceTipDigest, compactedBaseDigest: link.compactedBaseDigest, continuityDigest: link.continuityDigest, compactionDigest: link.compactionDigest };
  }
  function compactedIdentity(link) {
    return { schemaVersion: link.schemaVersion, algorithm: link.algorithm, relation: link.relation, sourceTipDigest: link.sourceTipDigest, compactedBaseDigest: link.compactedBaseDigest, continuityDigest: link.continuityDigest, compactionDigest: link.compactionDigest };
  }
  async function compactedNodeDigest(checkpointDigestValue, parentDigest, provenance, root) {
    const domain = root ? COMPACTED_ROOT_DOMAIN : COMPACTED_NODE_DOMAIN;
    return sha256(domain, { checkpointDigest: checkpointDigestValue, parentDigest, provenance });
  }
  function validateCompactedChainShape(chain) {
    exact(chain, ['schemaVersion', 'algorithm', 'relation', 'provenance', 'rootDigest', 'tipDigest', 'nodes'], 'invalid-compacted-chain');
    if (chain.schemaVersion !== COMPACTED_CHAIN_SCHEMA_VERSION || chain.algorithm !== ALGORITHM || chain.relation !== COMPACTED_CHAIN_RELATION || !Array.isArray(chain.nodes) || chain.nodes.length === 0) throw reject('invalid-compacted-chain');
    exact(chain.provenance, ['schemaVersion', 'algorithm', 'relation', 'sourceTipDigest', 'compactedBaseDigest', 'continuityDigest', 'compactionDigest'], 'invalid-compacted-provenance');
    if (chain.provenance.schemaVersion !== COMPACTION_CONTINUITY_SCHEMA_VERSION || chain.provenance.algorithm !== ALGORITHM || chain.provenance.relation !== COMPACTION_CONTINUITY_RELATION) throw reject('invalid-compacted-provenance');
    digestShape(chain.provenance.sourceTipDigest, 'invalid-compacted-provenance'); digestShape(chain.provenance.compactedBaseDigest, 'invalid-compacted-provenance'); digestShape(chain.provenance.continuityDigest, 'invalid-compacted-provenance'); digestShape(chain.provenance.compactionDigest, 'invalid-compacted-provenance');
    digestShape(chain.rootDigest, 'invalid-root-digest'); digestShape(chain.tipDigest, 'invalid-tip-digest');
  }
  async function buildCompactedMerkleChainV2(compactedBase, compactionLink, sourceChain, deltas = []) {
    const base = validatedBase(compactedBase);
    await verifyCompactionLinkV2(compactionLink, sourceChain, base);
    if (!Array.isArray(deltas)) throw reject('invalid-delta-chain');
    const provenance = compactedIdentity(compactionLink);
    let currentCapsule = base.capsule; let currentGeneration = base.generation; const checkpoints = [base];
    for (const rawDelta of deltas) {
      const delta = validatedDelta(rawDelta);
      const applied = p5.applyDeltaCheckpointV1(currentCapsule, currentGeneration, delta);
      checkpoints.push({ schemaVersion: p5.SCHEMA_VERSION, kind: p5.CHECKPOINT_KIND.DELTA, generation: delta.generation, parentGeneration: delta.parentGeneration, project: clone(delta.project), parentWatermark: clone(delta.parentWatermark), childWatermark: clone(delta.childWatermark), changes: clone(delta.changes) });
      currentCapsule = applied.capsule; currentGeneration = applied.generation;
    }
    const nodes = []; let parentDigest = null;
    for (let index = 0; index < checkpoints.length; index += 1) {
      const checkpoint = checkpoints[index]; const checkpointDigestValue = await checkpointDigest(checkpoint); const nodeDigestValue = await compactedNodeDigest(checkpointDigestValue, parentDigest, provenance, index === 0);
      nodes.push({ schemaVersion: COMPACTED_CHAIN_SCHEMA_VERSION, algorithm: ALGORITHM, checkpointDigest: checkpointDigestValue, parentDigest, nodeDigest: nodeDigestValue, checkpoint: clone(checkpoint) }); parentDigest = nodeDigestValue;
    }
    const chain = { schemaVersion: COMPACTED_CHAIN_SCHEMA_VERSION, algorithm: ALGORITHM, relation: COMPACTED_CHAIN_RELATION, provenance, rootDigest: nodes[0].nodeDigest, tipDigest: nodes[nodes.length - 1].nodeDigest, nodes };
    await verifyCompactedMerkleChainV2(chain);
    return chain;
  }
  async function verifyCompactedMerkleChainV2(chain) {
    validateCompactedChainShape(chain); let previous = null; let base = null; const deltas = [];
    for (let index = 0; index < chain.nodes.length; index += 1) {
      const node = chain.nodes[index]; exact(node, ['schemaVersion', 'algorithm', 'checkpointDigest', 'parentDigest', 'nodeDigest', 'checkpoint'], 'invalid-compacted-node');
      if (node.schemaVersion !== COMPACTED_CHAIN_SCHEMA_VERSION || node.algorithm !== ALGORITHM) throw reject('invalid-compacted-node');
      const checkpoint = validatedCheckpoint(node.checkpoint); digestShape(node.checkpointDigest, 'invalid-checkpoint-digest'); if (node.parentDigest !== null) digestShape(node.parentDigest, 'invalid-parent-digest'); digestShape(node.nodeDigest, 'invalid-node-digest');
      const expectedCheckpoint = await checkpointDigest(checkpoint); if (node.checkpointDigest !== expectedCheckpoint) throw reject('checkpoint-digest-mismatch');
      const expectedParent = previous ? previous.nodeDigest : null; if (node.parentDigest !== expectedParent) throw reject('parent-digest-mismatch');
      const expectedNode = await compactedNodeDigest(node.checkpointDigest, node.parentDigest, chain.provenance, index === 0); if (node.nodeDigest !== expectedNode) throw reject('compacted-node-digest-mismatch');
      if (index === 0) { if (checkpoint.kind !== p5.CHECKPOINT_KIND.BASE || checkpoint.generation <= 0) throw reject('invalid-compacted-root'); base = checkpoint; } else { if (checkpoint.kind !== p5.CHECKPOINT_KIND.DELTA) throw reject('invalid-compacted-order'); deltas.push(checkpoint); }
      previous = node;
    }
    if (chain.rootDigest !== chain.nodes[0].nodeDigest || chain.tipDigest !== chain.nodes[chain.nodes.length - 1].nodeDigest) throw reject('chain-digest-mismatch');
    let replay; try { replay = p5.replayCheckpointChainV1(base, deltas); } catch (error) { throw reject('invalid-p5-chain'); }
    return { valid: true, generation: replay.generation, capsule: clone(replay.capsule), rootDigest: chain.rootDigest, tipDigest: chain.tipDigest, compactionIdentity: clone(chain.provenance) };
  }

  global.ProgressiveStateMemoryM7P6 = Object.freeze({
    SCHEMA_VERSION,
    ALGORITHM,
    DOMAINS: Object.freeze({ CHECKPOINT_DOMAIN, NODE_DOMAIN, COMPACTION_DOMAIN }),
    COMPACTION_RELATION,
    COMPACTION_CONTINUITY_SCHEMA_VERSION,
    COMPACTION_CONTINUITY_RELATION,
    COMPACTION_CONTINUITY_DOMAIN,
    COMPACTED_CHAIN_SCHEMA_VERSION,
    COMPACTED_CHAIN_RELATION,
    COMPACTED_ROOT_DOMAIN,
    COMPACTED_NODE_DOMAIN,
    canonicalJson(value) { return json(value); },
    sha256,
    checkpointDigest,
    nodeDigest,
    buildMerkleChainV1,
    verifyMerkleChainV1,
    createCompactionLinkV1,
    verifyCompactionLinkV1,
    createCompactionLinkV2,
    verifyCompactionLinkV2,
    buildCompactedMerkleChainV2,
    verifyCompactedMerkleChainV2,
  });
}(globalThis));
