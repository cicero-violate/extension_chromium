'use strict';

// PSM P7: deterministic supersession/conflict projection over a verified P6 chain.
(function installProgressiveStateMemoryP6(global) {
  const p1 = global.ProgressiveStateMemoryM7P1;
  const p5 = global.ProgressiveStateMemoryM7P5;
  const p6 = global.ProgressiveStateMemoryM7P6;
  if (!p1 || !p5 || !p6) throw new Error('PSM P7 requires the accepted P1, P5, and P6 modules');

  const SCHEMA_VERSION = 1;
  const DIGEST_RE = /^sha256:[0-9a-f]{64}$/;
  const FACT_TYPES = Object.freeze(['goal', 'frontier', 'constraint', 'task', 'message', 'decision', 'evidence', 'artifact']);
  const FACT_IDS = Object.freeze({ goal: 'goal', frontier: 'frontier', constraint: 'constraintId', task: 'taskId', message: 'messageId', decision: 'decisionId', evidence: 'evidenceId', artifact: 'artifactId' });
  const FACT_KEYS = Object.freeze({
    goal: ['goal', 'establishedBy'],
    frontier: ['frontierKey', 'state', 'summary', 'establishedBy'],
    constraint: ['constraintId', 'text', 'state', 'establishedBy'],
    task: ['taskId', 'title', 'role', 'phase', 'blocker', 'result', 'ownerWorkerId', 'dependencies', 'priority', 'establishedBy'],
    message: ['messageId', 'from', 'to', 'body', 'phase', 'establishedBy'],
    decision: ['decisionId', 'decision', 'targetType', 'targetId', 'establishedBy'],
    evidence: ['evidenceId', 'subjectType', 'subjectId', 'ref', 'digest', 'establishedBy'],
    artifact: ['artifactId', 'kind', 'title', 'digest', 'establishedBy'],
  });
  const STATUS = Object.freeze({ RESOLVED: 'resolved-by-source-supersession', UNRESOLVED: 'unresolved', HISTORICAL: 'historical' });
  const CONTINUITY_SCHEMA_VERSION = 1;
  const CONTINUITY_DOMAIN = 'psm:p7:compaction-continuity:v1';
  const ESTABLISHING_EVENT_KINDS = Object.freeze({ goal: ['goal.changed'], frontier: ['frontier.changed'], constraint: ['constraint.accepted'], task: ['task.accepted', 'task.blocked', 'task.completed'], message: ['message.accepted'], artifact: ['artifact.accepted'], evidence: ['evidence.linked'], decision: ['operator.decision'] });

  function reject(reason) {
    const error = new Error(`PSM P7 rejected: ${reason}`);
    error.code = 'PSM_P7_REJECTED';
    error.reason = reason;
    return error;
  }
  function plain(value) {
    if (value === null || typeof value !== 'object' || Array.isArray(value) || Object.prototype.toString.call(value) !== '[object Object]') return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || (typeof prototype.constructor === 'function' && prototype.constructor.name === 'Object');
  }
  function exact(value, allowed, reason) {
    if (!plain(value)) throw reject(reason);
    const actual = Object.keys(value).sort();
    const expected = allowed.slice().sort();
    if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) throw reject(reason);
  }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function canonical(value) {
    if (Array.isArray(value)) return value.map(canonical);
    if (plain(value)) { const result = {}; Object.keys(value).sort().forEach((key) => { result[key] = canonical(value[key]); }); return result; }
    return value;
  }
  function json(value) { const encoded = JSON.stringify(canonical(value)); if (typeof encoded !== 'string') throw reject('non-serializable'); return encoded; }
  function equal(left, right) { return json(left) === json(right); }
  function identifier(value) { return typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9._:-]{0,159}$/.test(value); }
  function digest(value) { return typeof value === 'string' && DIGEST_RE.test(value); }
  function established(value) {
    exact(value, ['eventId', 'sequence', 'at', 'kind', 'source', 'provenance', 'supersedes', 'conflictsWith'], 'invalid-established-by');
    if (!identifier(value.eventId) || !Number.isInteger(value.sequence) || value.sequence < 1 || !Number.isInteger(value.at) || value.at <= 0 || typeof value.kind !== 'string' || !p1.EVENT_KINDS.includes(value.kind)) throw reject('invalid-established-by');
    exact(value.source, ['kind', 'id'], 'invalid-established-source');
    if (typeof value.source.kind !== 'string' || !p1.SOURCE_KINDS.includes(value.source.kind) || !p1.EVENT_SOURCE_POLICY[value.kind]?.includes(value.source.kind) || !identifier(value.source.id)) throw reject('invalid-established-source');
    if (!Array.isArray(value.provenance) || value.provenance.length === 0) throw reject('invalid-established-provenance');
    const provenance = new Set();
    value.provenance.forEach((entry) => {
      exact(entry, ['kind', 'ref', 'digest'], 'invalid-established-provenance');
      if (typeof entry.kind !== 'string' || !p1.PROVENANCE_KINDS.includes(entry.kind) || typeof entry.ref !== 'string' || entry.ref.length === 0 || entry.ref.length > 512 || /[\u0000-\u001f]/.test(entry.ref) || !digest(entry.digest)) throw reject('invalid-established-provenance');
      const key = `${entry.kind}:${entry.ref}:${entry.digest}`;
      if (provenance.has(key)) throw reject('duplicate-established-provenance');
      provenance.add(key);
    });
    if (value.supersedes !== null && (!identifier(value.supersedes) || value.supersedes === value.eventId)) throw reject('invalid-established-supersedes');
    if (!Array.isArray(value.conflictsWith)) throw reject('invalid-established-conflicts');
    const conflicts = new Set();
    value.conflictsWith.forEach((target) => { if (!identifier(target) || target === value.eventId || conflicts.has(target)) throw reject('invalid-established-conflicts'); conflicts.add(target); });
  }
  function fact(kind, value, factId) {
    if (!FACT_TYPES.includes(kind) || !plain(value)) throw reject('invalid-observed-fact');
    exact(value, FACT_KEYS[kind], 'invalid-observed-fact');
    established(value.establishedBy);
    if (!ESTABLISHING_EVENT_KINDS[kind].includes(value.establishedBy.kind)) throw reject('invalid-establishing-event-kind');
    if ((kind === 'goal' && factId !== 'goal') || (kind === 'frontier' && factId !== 'frontier')) throw reject('fact-identity-mismatch');
    const identity = kind === 'goal' || kind === 'frontier' ? factId : value[FACT_IDS[kind]];
    if (value.establishedBy.eventId === '' || identity !== factId) throw reject('fact-identity-mismatch');
    if (kind === 'goal' && typeof value.goal !== 'string') throw reject('invalid-observed-fact');
    if (kind === 'frontier' && (typeof value.frontierKey !== 'string' || typeof value.state !== 'string' || typeof value.summary !== 'string')) throw reject('invalid-observed-fact');
    if (kind === 'constraint' && (typeof value.constraintId !== 'string' || typeof value.text !== 'string' || typeof value.state !== 'string')) throw reject('invalid-observed-fact');
    if (kind === 'task' && (typeof value.taskId !== 'string' || typeof value.title !== 'string' || typeof value.role !== 'string' || typeof value.phase !== 'string' || !Array.isArray(value.dependencies) || typeof value.priority !== 'number' || !Number.isFinite(value.priority))) throw reject('invalid-observed-fact');
    if (kind === 'message' && (typeof value.messageId !== 'string' || typeof value.from !== 'string' || typeof value.to !== 'string' || typeof value.body !== 'string' || typeof value.phase !== 'string')) throw reject('invalid-observed-fact');
    if (kind === 'decision' && (typeof value.decisionId !== 'string' || typeof value.decision !== 'string' || typeof value.targetType !== 'string' || typeof value.targetId !== 'string')) throw reject('invalid-observed-fact');
    if (kind === 'evidence' && (typeof value.evidenceId !== 'string' || typeof value.subjectType !== 'string' || typeof value.subjectId !== 'string' || typeof value.ref !== 'string' || !digest(value.digest))) throw reject('invalid-observed-fact');
    if (kind === 'artifact' && (typeof value.artifactId !== 'string' || typeof value.kind !== 'string' || typeof value.title !== 'string' || !digest(value.digest))) throw reject('invalid-observed-fact');
  }
  function entryList(capsule) {
    const entries = [];
    if (capsule.goal !== null) entries.push({ factType: 'goal', factId: 'goal', fact: capsule.goal.fact });
    if (capsule.frontier !== null) entries.push({ factType: 'frontier', factId: 'frontier', fact: capsule.frontier.fact });
    const collections = [['constraint', capsule.constraints], ['task', capsule.tasks], ['message', capsule.messages], ['decision', capsule.operatorDecisions], ['evidence', capsule.evidence], ['artifact', capsule.artifacts]];
    collections.forEach(([factType, values]) => values.forEach((entry) => entries.push({ factType, factId: entry.id, fact: entry.fact })));
    return entries;
  }
  function edgeSort(a, b) { return `${a.sourceEventId}\u0000${a.targetEventId}`.localeCompare(`${b.sourceEventId}\u0000${b.targetEventId}`); }
  function refSort(a, b) { return `${a.relation}\u0000${a.sourceEventId}\u0000${a.targetEventId}`.localeCompare(`${b.relation}\u0000${b.sourceEventId}\u0000${b.targetEventId}`); }
  function versionSort(a, b) { return a.eventId.localeCompare(b.eventId); }
  function sourceEnvelope(verified) { return { rootDigest: verified.rootDigest, tipDigest: verified.tipDigest, generation: verified.generation }; }

  function expectedDerived(index) {
    const versions = new Map(index.observedFactVersions.map((entry) => [entry.eventId, entry]));
    const current = new Set(index.finalCurrentEventIds);
    const supersessionEdges = [];
    const conflictEdges = [];
    const unresolvedReferences = [];
    const doNotResurrect = new Set();
    const seenEdges = new Set();
    versions.forEach((entry) => {
      const metadata = entry.fact.establishedBy;
      const requireObservedPrior = (target, relation) => {
        const targetEntry = versions.get(target);
        if (!targetEntry) return;
        const targetMetadata = targetEntry.fact.establishedBy;
        if (metadata.sequence <= targetMetadata.sequence || metadata.at < targetMetadata.at) throw reject(`invalid-observed-${relation}-ordering`);
      };
      if (metadata.supersedes !== null) {
        requireObservedPrior(metadata.supersedes, 'supersession');
        const key = `${metadata.eventId}\u0000${metadata.supersedes}`;
        if (!seenEdges.has(`s:${key}`)) {
          seenEdges.add(`s:${key}`);
          supersessionEdges.push({ sourceEventId: metadata.eventId, targetEventId: metadata.supersedes, sourceCurrent: current.has(metadata.eventId), targetObserved: versions.has(metadata.supersedes) });
        }
        if (versions.has(metadata.supersedes)) doNotResurrect.add(metadata.supersedes);
        else unresolvedReferences.push({ relation: 'supersedes', sourceEventId: metadata.eventId, targetEventId: metadata.supersedes, sourceCurrent: current.has(metadata.eventId) });
      }
      metadata.conflictsWith.forEach((target) => {
        requireObservedPrior(target, 'conflict');
        const key = `${metadata.eventId}\u0000${target}`;
        if (!seenEdges.has(`c:${key}`)) {
          seenEdges.add(`c:${key}`);
          const targetObserved = versions.has(target);
          const status = !current.has(metadata.eventId) ? STATUS.HISTORICAL : (targetObserved && metadata.supersedes === target ? STATUS.RESOLVED : STATUS.UNRESOLVED);
          conflictEdges.push({ sourceEventId: metadata.eventId, targetEventId: target, sourceCurrent: current.has(metadata.eventId), targetObserved, status });
        }
        if (!versions.has(target)) unresolvedReferences.push({ relation: 'conflictsWith', sourceEventId: metadata.eventId, targetEventId: target, sourceCurrent: current.has(metadata.eventId) });
      });
    });
    supersessionEdges.sort(edgeSort); conflictEdges.sort(edgeSort); unresolvedReferences.sort(refSort);
    const doNotResurrectEventIds = [...doNotResurrect].sort();
    if (doNotResurrectEventIds.some((eventId) => current.has(eventId))) throw reject('current-fact-superseded');
    return { supersessionEdges, conflictEdges, doNotResurrectEventIds, unresolvedConflicts: conflictEdges.filter((edge) => edge.status === STATUS.UNRESOLVED), unresolvedReferences };
  }
  function validateIndex(index) {
    exact(index, ['schemaVersion', 'source', 'finalCurrentEventIds', 'observedFactVersions', 'supersessionEdges', 'conflictEdges', 'doNotResurrectEventIds', 'unresolvedConflicts', 'unresolvedReferences'], 'invalid-p7-index');
    if (index.schemaVersion !== SCHEMA_VERSION) throw reject('invalid-p7-index');
    exact(index.source, ['rootDigest', 'tipDigest', 'generation'], 'invalid-p7-source');
    if (!digest(index.source.rootDigest) || !digest(index.source.tipDigest) || !Number.isSafeInteger(index.source.generation) || index.source.generation < 0) throw reject('invalid-p7-source');
    const versions = new Set();
    index.observedFactVersions.forEach((entry) => {
      exact(entry, ['eventId', 'factType', 'factId', 'fact'], 'invalid-observed-version');
      if (!identifier(entry.eventId) || !FACT_TYPES.includes(entry.factType) || typeof entry.factId !== 'string' || versions.has(entry.eventId)) throw reject('invalid-observed-version');
      fact(entry.factType, entry.fact, entry.factId);
      if (entry.fact.establishedBy.eventId !== entry.eventId) throw reject('invalid-observed-version');
      versions.add(entry.eventId);
    });
    const current = [...index.finalCurrentEventIds];
    if (current.some((id) => !identifier(id) || !versions.has(id)) || new Set(current).size !== current.length || current.slice().sort().some((id, i) => id !== current.slice().sort()[i])) throw reject('invalid-current-facts');
    function validateEdge(edge, conflict) {
      const allowed = conflict ? ['sourceEventId', 'targetEventId', 'sourceCurrent', 'targetObserved', 'status'] : ['sourceEventId', 'targetEventId', 'sourceCurrent', 'targetObserved'];
      exact(edge, allowed, 'invalid-p7-edge');
      if (!identifier(edge.sourceEventId) || !identifier(edge.targetEventId) || !versions.has(edge.sourceEventId) || typeof edge.sourceCurrent !== 'boolean' || typeof edge.targetObserved !== 'boolean') throw reject('invalid-p7-edge');
      if (conflict && !Object.values(STATUS).includes(edge.status)) throw reject('invalid-conflict-status');
    }
    index.supersessionEdges.forEach((edge) => validateEdge(edge, false));
    index.conflictEdges.forEach((edge) => validateEdge(edge, true));
    index.doNotResurrectEventIds.forEach((id) => { if (!identifier(id) || !versions.has(id)) throw reject('invalid-negative-memory'); });
    index.unresolvedConflicts.forEach((edge) => { validateEdge(edge, true); if (edge.status !== STATUS.UNRESOLVED) throw reject('invalid-unresolved-conflict'); });
    index.unresolvedReferences.forEach((ref) => { exact(ref, ['relation', 'sourceEventId', 'targetEventId', 'sourceCurrent'], 'invalid-unresolved-reference'); if (!['supersedes', 'conflictsWith'].includes(ref.relation) || !identifier(ref.sourceEventId) || !identifier(ref.targetEventId) || !versions.has(ref.sourceEventId) || versions.has(ref.targetEventId) || typeof ref.sourceCurrent !== 'boolean') throw reject('invalid-unresolved-reference'); });
    const expected = expectedDerived(index);
    if (!equal(index.supersessionEdges, expected.supersessionEdges) || !equal(index.conflictEdges, expected.conflictEdges) || !equal(index.doNotResurrectEventIds, expected.doNotResurrectEventIds) || !equal(index.unresolvedConflicts, expected.unresolvedConflicts) || !equal(index.unresolvedReferences, expected.unresolvedReferences)) throw reject('derived-index-mismatch');
    return canonical(clone(index));
  }
  function continuityPayload(value) { return { schemaVersion: CONTINUITY_SCHEMA_VERSION, source: clone(value.source), compactedBase: clone(value.compactedBase), observedFactVersions: clone(value.observedFactVersions) }; }
  function continuityIdentity(value) { return { sourceTipDigest: value.compactionLink.sourceTipDigest, compactedBaseDigest: value.compactionLink.compactedBaseDigest, continuityDigest: value.continuityDigest, compactionDigest: value.compactionLink.compactionDigest }; }
  async function validateCompactionContinuityV1(value, chain, requireLink = true, committedIdentity = null) {
    exact(value, ['schemaVersion', 'source', 'compactedBase', 'observedFactVersions', 'continuityDigest', 'compactionLink'], 'invalid-compaction-continuity');
    if (value.schemaVersion !== CONTINUITY_SCHEMA_VERSION) throw reject('invalid-compaction-continuity');
    exact(value.source, ['rootDigest', 'tipDigest', 'generation'], 'invalid-compaction-continuity-source');
    if (!digest(value.source.rootDigest) || !digest(value.source.tipDigest) || !Number.isSafeInteger(value.source.generation) || value.source.generation < 0) throw reject('invalid-compaction-continuity-source');
    exact(value.compactedBase, ['generation', 'checkpointDigest'], 'invalid-compacted-base-identity');
    if (!Number.isSafeInteger(value.compactedBase.generation) || value.compactedBase.generation < 0 || !digest(value.compactedBase.checkpointDigest)) throw reject('invalid-compacted-base-identity');
    if (value.source.generation !== value.compactedBase.generation) throw reject('continuity-generation-mismatch');
    if (!Array.isArray(value.observedFactVersions)) throw reject('invalid-compaction-continuity-facts');
    const ids = new Set();
    value.observedFactVersions.forEach((entry) => { exact(entry, ['eventId', 'factType', 'factId', 'fact'], 'invalid-compaction-continuity-facts'); if (ids.has(entry.eventId)) throw reject('duplicate-compaction-continuity-fact'); ids.add(entry.eventId); if (!identifier(entry.eventId) || !FACT_TYPES.includes(entry.factType)) throw reject('invalid-compaction-continuity-facts'); fact(entry.factType, entry.fact, entry.factId); if (entry.fact.establishedBy.eventId !== entry.eventId) throw reject('invalid-compaction-continuity-facts'); });
    if (value.continuityDigest !== await p6.sha256(CONTINUITY_DOMAIN, continuityPayload(value))) throw reject('continuity-digest-mismatch');
    if (requireLink) {
      if (!plain(value.compactionLink)) throw reject('missing-compaction-link');
      exact(value.compactionLink, ['schemaVersion', 'algorithm', 'relation', 'sourceTipDigest', 'compactedBaseDigest', 'continuityDigest', 'compactionDigest'], 'invalid-compaction-link');
      if (value.compactionLink.continuityDigest !== value.continuityDigest || value.compactionLink.sourceTipDigest !== value.source.tipDigest || value.compactionLink.compactedBaseDigest !== value.compactedBase.checkpointDigest) throw reject('continuity-link-binding');
      if (value.compactionLink.schemaVersion !== p6.COMPACTION_CONTINUITY_SCHEMA_VERSION || value.compactionLink.algorithm !== p6.ALGORITHM || value.compactionLink.relation !== p6.COMPACTION_CONTINUITY_RELATION) throw reject('invalid-compaction-link');
      if (!digest(value.compactionLink.sourceTipDigest) || !digest(value.compactionLink.compactedBaseDigest) || !digest(value.compactionLink.continuityDigest) || !digest(value.compactionLink.compactionDigest)) throw reject('invalid-compaction-link');
      if (chain.nodes[0].checkpoint.generation !== value.compactedBase.generation) throw reject('continuity-generation-mismatch');
      const rootDigest = await p6.checkpointDigest(chain.nodes[0].checkpoint);
      if (rootDigest !== value.compactedBase.checkpointDigest) throw reject('continuity-base-mismatch');
      const expectedLinkDigest = await p6.sha256(p6.COMPACTION_CONTINUITY_DOMAIN, { sourceTipDigest: value.compactionLink.sourceTipDigest, compactedBaseDigest: value.compactionLink.compactedBaseDigest, continuityDigest: value.compactionLink.continuityDigest });
      if (expectedLinkDigest !== value.compactionLink.compactionDigest) throw reject('continuity-link-digest-mismatch');
      if (committedIdentity && !equal({ schemaVersion: value.compactionLink.schemaVersion, algorithm: value.compactionLink.algorithm, relation: value.compactionLink.relation, sourceTipDigest: value.compactionLink.sourceTipDigest, compactedBaseDigest: value.compactionLink.compactedBaseDigest, continuityDigest: value.compactionLink.continuityDigest, compactionDigest: value.compactionLink.compactionDigest }, committedIdentity)) throw reject('continuity-root-binding');
    } else if (value.compactionLink !== null) throw reject('unexpected-compaction-link');
    return canonical(clone(value));
  }
  async function createCompactionContinuityV1(index, sourceChain, compactedBase) {
    const validatedIndex = validateIndex(index);
    const verified = sourceChain && sourceChain.schemaVersion === p6.COMPACTED_CHAIN_SCHEMA_VERSION
      ? await p6.verifyCompactedMerkleChainV2(sourceChain)
      : await p6.verifyMerkleChainV1(sourceChain);
    if (!equal(validatedIndex.source, { rootDigest: verified.rootDigest, tipDigest: verified.tipDigest, generation: verified.generation })) throw reject('continuity-source-mismatch');
    const base = p5.validateBaseCheckpointV1(compactedBase);
    if (base.generation !== verified.generation || !equal(base.capsule, verified.capsule)) throw reject('invalid-continuity-base');
    const value = { schemaVersion: CONTINUITY_SCHEMA_VERSION, source: clone(validatedIndex.source), compactedBase: { generation: base.generation, checkpointDigest: await p6.checkpointDigest(base) }, observedFactVersions: clone(validatedIndex.observedFactVersions), continuityDigest: null, compactionLink: null };
    value.continuityDigest = await p6.sha256(CONTINUITY_DOMAIN, continuityPayload(value));
    return validateCompactionContinuityV1(value, { nodes: [{ checkpoint: base }] }, false);
  }
  async function bindCompactionContinuityV1(continuity, link, sourceChain, compactedBase) {
    const provisional = await validateCompactionContinuityV1({ ...clone(continuity), compactionLink: null }, { nodes: [{ checkpoint: p5.validateBaseCheckpointV1(compactedBase) }] }, false);
    await p6.verifyCompactionLinkV2(link, sourceChain, compactedBase);
    if (link.continuityDigest !== provisional.continuityDigest) throw reject('continuity-link-binding');
    return validateCompactionContinuityV1({ ...provisional, compactionLink: clone(link) }, { nodes: [{ checkpoint: p5.validateBaseCheckpointV1(compactedBase) }] }, true);
  }
  async function buildSupersessionConflictIndexV1(chain, continuity = null) {
    let verified;
    try {
      verified = chain && chain.schemaVersion === p6.COMPACTED_CHAIN_SCHEMA_VERSION
        ? await p6.verifyCompactedMerkleChainV2(chain)
        : await p6.verifyMerkleChainV1(chain);
    } catch (error) { throw reject('invalid-p6-chain'); }
    const rootGeneration = chain.nodes[0].checkpoint.generation;
    if (rootGeneration === 0) {
      if (continuity !== null) throw reject('unexpected-compaction-continuity');
    } else {
      if (chain.schemaVersion !== p6.COMPACTED_CHAIN_SCHEMA_VERSION) throw reject('compacted-chain-required');
      if (continuity === null) throw reject('missing-compaction-continuity');
      await validateCompactionContinuityV1(continuity, chain, true, verified.compactionIdentity);
    }
    let capsule = chain.nodes[0].checkpoint.capsule;
    let generation = chain.nodes[0].checkpoint.generation;
    const observed = new Map();
    if (continuity !== null) continuity.observedFactVersions.forEach((entry) => observed.set(entry.eventId, canonical(clone(entry))));
    for (let index = 0; index < chain.nodes.length; index += 1) {
      if (index > 0) {
        const delta = chain.nodes[index].checkpoint;
        const applied = p5.applyDeltaCheckpointV1(capsule, generation, delta);
        capsule = applied.capsule;
        generation = applied.generation;
      }
      const seenAtCheckpoint = new Set();
      entryList(capsule).forEach((entry) => {
        const eventId = entry.fact.establishedBy.eventId;
        if (seenAtCheckpoint.has(eventId)) throw reject('duplicate-timeline-event');
        seenAtCheckpoint.add(eventId);
        fact(entry.factType, entry.fact, entry.factId);
        const next = { eventId, factType: entry.factType, factId: entry.factId, fact: canonical(clone(entry.fact)) };
        const prior = observed.get(eventId);
        if (prior && (prior.factType !== next.factType || prior.factId !== next.factId || !equal(prior.fact, next.fact))) throw reject('conflicting-fact-version');
        if (!prior) observed.set(eventId, next);
      });
    }
    const finalCurrentEventIds = entryList(capsule).map((entry) => entry.fact.establishedBy.eventId).sort();
    const index = { schemaVersion: SCHEMA_VERSION, source: sourceEnvelope(verified), finalCurrentEventIds, observedFactVersions: [...observed.values()].sort(versionSort), supersessionEdges: [], conflictEdges: [], doNotResurrectEventIds: [], unresolvedConflicts: [], unresolvedReferences: [] };
    const derived = expectedDerived(index);
    Object.assign(index, derived);
    return validateIndex(index);
  }

  global.ProgressiveStateMemoryM7P7 = Object.freeze({
    SCHEMA_VERSION,
    FACT_TYPES,
    CONFLICT_STATUS: STATUS,
    buildSupersessionConflictIndexV1,
    projectSupersessionConflictIndexV1: buildSupersessionConflictIndexV1,
    createCompactionContinuityV1,
    bindCompactionContinuityV1,
    validateCompactionContinuityV1,
    continuityIdentity,
    CONTINUITY_SCHEMA_VERSION,
    CONTINUITY_DOMAIN,
    validateSupersessionConflictIndexV1: validateIndex,
  });
}(globalThis));
