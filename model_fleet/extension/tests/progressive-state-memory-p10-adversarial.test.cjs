const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

function loadPsm() {
  const context = { globalThis: null, crypto: crypto.webcrypto, TextEncoder };
  context.globalThis = context;
  for (const file of [
    'progressive-state-memory-m7-p1.js', 'progressive-state-memory-m7-p2.js',
    'progressive-state-memory-m7-p3.js', 'progressive-state-memory-m7-p4.js',
    'progressive-state-memory-m7-p5.js', 'progressive-state-memory-m7-p6.js',
    'progressive-state-memory-m7-p7.js', 'progressive-state-memory-m7-p8.js',
    'progressive-state-memory-m7-p9.js',
  ]) vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context, { filename: file });
  return {
    p1: context.ProgressiveStateMemoryM7P1, p2: context.ProgressiveStateMemoryM7P2,
    p3: context.ProgressiveStateMemoryM7P3, p4: context.ProgressiveStateMemoryM7P4,
    p5: context.ProgressiveStateMemoryM7P5, p6: context.ProgressiveStateMemoryM7P6,
    p7: context.ProgressiveStateMemoryM7P7, p8: context.ProgressiveStateMemoryM7P8,
    p9: context.ProgressiveStateMemoryM7P9,
  };
}

const reality = () => ({ id: 'model-fleet', repositoryPath: '/workspace/ai_sandbox/extension_chromium/model_fleet', branch: 'main', head: '6ee3bf81a9700c4c3a3b5b00851f911585512248' });
const clone = (value) => JSON.parse(JSON.stringify(value));
const digest = (text) => `sha256:${crypto.createHash('sha256').update(Buffer.from(text)).digest('hex')}`;
const bytes = (text) => Array.from(Buffer.from(text));
const stable = (value) => JSON.stringify((function canonical(input) {
  if (Array.isArray(input)) return input.map(canonical);
  if (input && typeof input === 'object') return Object.fromEntries(Object.keys(input).sort().map((key) => [key, canonical(input[key])]));
  return input;
}(value)));

function event({ eventId, sequence, kind, at, sourceKind = 'runtime', payload, supersedes = null, conflictsWith = [] }) {
  const sourceId = sourceKind === 'operator' ? 'operator-1' : 'runtime-1';
  return { eventId, sequence, at, kind, source: { kind: sourceKind, id: sourceId }, provenance: [{ kind: sourceKind, ref: `${sourceKind}:${sourceId}`, digest: `sha256:${String(at).padStart(64, '0')}` }], payload, supersedes, conflictsWith };
}

function established(eventId, sequence, at, supersedes = null, conflictsWith = []) {
  return { eventId, sequence, at, kind: 'goal.changed', source: { kind: 'operator', id: 'operator-1' }, provenance: [{ kind: 'operator', ref: 'operator:operator-1', digest: `sha256:${String(at).padStart(64, '0')}` }], supersedes, conflictsWith };
}

async function fixture() {
  const { p1, p2, p4, p5, p6, p7, p8, p9 } = loadPsm();
  let ledger = p1.emptyLedger();
  for (const input of [
    event({ eventId: 'goal-old', sequence: 1, kind: 'goal.changed', at: 90, sourceKind: 'operator', payload: { goal: 'old' } }),
    event({ eventId: 'goal-1', sequence: 2, kind: 'goal.changed', at: 100, sourceKind: 'operator', payload: { goal: 'current acceptedEvents text' }, conflictsWith: ['goal-old'] }),
    event({ eventId: 'frontier-1', sequence: 3, kind: 'frontier.changed', at: 110, payload: { frontierKey: 'task:T-1', state: 'open', summary: 'frontier' } }),
    event({ eventId: 'task-1', sequence: 4, kind: 'task.accepted', at: 120, payload: { taskId: 'T-1', title: 'Task', role: 'implementation', phase: 'pending', blocker: null, result: null, ownerWorkerId: null, dependencies: [], priority: 1 } }),
    event({ eventId: 'message-1', sequence: 5, kind: 'message.accepted', at: 130, sourceKind: 'operator', payload: { messageId: 'M-1', from: 'operator', to: 'W-1', body: 'message', phase: 'queued' } }),
    event({ eventId: 'evidence-1', sequence: 6, kind: 'evidence.linked', at: 140, payload: { evidenceId: 'E-1', subjectType: 'task', subjectId: 'T-1', ref: 'evidence/one.txt', digest: digest('one') } }),
  ]) ledger = p1.admitEvent(ledger, input).ledger;
  const baseCapsule = p4.buildRestartCapsule(p2.reduceLedger(ledger), reality());
  const childCapsule = clone(baseCapsule);
  childCapsule.watermark = { sequence: 7, eventId: 'goal-2', at: 150 };
  childCapsule.goal.fact.goal = 'new goal';
  childCapsule.goal.fact.establishedBy = established('goal-2', 7, 150, 'goal-1', ['missing-conflict']);
  const base = p5.createBaseCheckpointV1(baseCapsule);
  const delta = p5.createDeltaCheckpointV1(baseCapsule, childCapsule, 0);
  const chain = await p6.buildMerkleChainV1(base, [delta]);
  const index = await p7.buildSupersessionConflictIndexV1(chain);
  const bootstrap = await p9.buildRestartBootstrapV1(chain, reality());
  const compacted = p5.compactCheckpointChainV1(base, [delta]);
  const continuityDraft = await p7.createCompactionContinuityV1(index, chain, compacted.checkpoint);
  const continuityLink = await p6.createCompactionLinkV2(chain, compacted.checkpoint, continuityDraft.continuityDigest);
  const continuity = await p7.bindCompactionContinuityV1(continuityDraft, continuityLink, chain, compacted.checkpoint);
  const compactedChain = await p6.buildCompactedMerkleChainV2(compacted.checkpoint, continuityLink, chain, []);
  const compactedIndex = await p7.buildSupersessionConflictIndexV1(compactedChain, continuity);
  const compactedBootstrap = await p9.buildRestartBootstrapV1(compactedChain, reality(), [], continuity);
  return { ...loadPsm(), baseCapsule, childCapsule, base, delta, chain, index, bootstrap, compacted, compactedChain, compactedIndex, compactedBootstrap, continuity, continuityLink, p8, p9 };
}

test('P10 matrix A/B: canonical history, reducer, active set, capsule and action-gap attacks fail closed', async () => {
  const { p1, p2, p3, p4, chain, bootstrap, p9 } = await fixture();
  let ledger = p1.emptyLedger();
  const first = event({ eventId: 'goal-1', sequence: 1, kind: 'goal.changed', at: 100, sourceKind: 'operator', payload: { goal: 'goal' } });
  const second = event({ eventId: 'task-1', sequence: 2, kind: 'task.accepted', at: 110, payload: { taskId: 'T-1', title: 'Task', role: 'implementation', phase: 'pending', blocker: null, result: null, ownerWorkerId: null, dependencies: [], priority: 1 } });
  ledger = p1.admitEvent(ledger, first).ledger;
  ledger = p1.admitEvent(ledger, second).ledger;
  assert.throws(() => p1.validateLedger({ ...clone(ledger), events: [ledger.events[1], ledger.events[0]] }), /PSM P1 rejected/);
  assert.throws(() => p1.validateLedger({ ...clone(ledger), events: ledger.events.slice(0, 1) }), /PSM P1 rejected/);
  const state = p2.reduceLedger(ledger);
  const forged = clone(state); forged.goal.goal = 'forged';
  assert.throws(() => p2.validateState(forged), /canonical-state-does-not-match-replay/);
  assert.deepEqual(p2.reduceLedger(ledger), p2.reduceLedger(clone(ledger)));
  assert.throws(() => p3.selectActiveWorkingSet(forged), /PSM P[23] rejected/);
  const forgedCapsule = clone(bootstrap); forgedCapsule.nextAction = 'invented';
  assert.rejects(() => p9.validateRestartBootstrapV1(chain, reality(), forgedCapsule), /PSM P9 rejected/);
  assert.throws(() => p4.validateRestartCapsule({ ...clone(bootstrap.capsule), extra: true }), /PSM P4 rejected/);
});

test('P10 matrix C: lineage, Merkle, compaction, and mutation attacks fail closed', async () => {
  const { p5, p6, chain, base, delta, childCapsule } = await fixture();
  const badGeneration = clone(delta); badGeneration.generation += 1;
  await assert.rejects(() => p6.verifyMerkleChainV1({ ...clone(chain), nodes: [chain.nodes[0], { ...clone(chain.nodes[1]), checkpoint: badGeneration }] }), /PSM P6 rejected/);
  const reordered = clone(chain); reordered.nodes.reverse();
  await assert.rejects(() => p6.verifyMerkleChainV1(reordered), /PSM P6 rejected/);
  const badDigest = clone(chain); badDigest.nodes[0].checkpointDigest = `sha256:${'0'.repeat(64)}`;
  await assert.rejects(() => p6.verifyMerkleChainV1(badDigest), /PSM P6 rejected/);
  const compacted = p5.compactCheckpointChainV1(base, [delta]);
  const link = await p6.createCompactionLinkV1(chain, compacted.checkpoint);
  await p6.verifyCompactionLinkV1(link, chain, compacted.checkpoint);
  let currentBase = compacted.checkpoint;
  for (let cycle = 0; cycle < 5; cycle += 1) {
    const root = await p6.buildMerkleChainV1(currentBase, []);
    const verified = await p6.verifyMerkleChainV1(root);
    assert.equal(stable(verified.capsule), stable(childCapsule));
    currentBase = p5.compactCheckpointChainV1(currentBase, []).checkpoint;
  }
  const crossProject = clone(delta); crossProject.project.branch = 'other';
  assert.throws(() => p5.applyDeltaCheckpointV1(base.capsule, 0, crossProject), /project-mismatch|PSM P5 rejected/);
  assert.equal(compacted.deltas.length, 0);
});

test('P10 matrix D: compaction must not silently discard P7 negative memory or unresolved guards', async () => {
  const { p5, p6, p7, p9, chain, base, delta, index, bootstrap, compacted, compactedChain, compactedIndex, compactedBootstrap, continuity } = await fixture();
  assert.equal(stable(index.doNotResurrectEventIds), stable(['goal-1']));
  assert.ok(index.unresolvedConflicts.length >= 1);
  await assert.rejects(() => p7.buildSupersessionConflictIndexV1(compactedChain), /missing-compaction-continuity/);
  await assert.rejects(() => p9.buildRestartBootstrapV1(compactedChain, reality()), /invalid-p7-index/);
  const plainGenerationPositive = await p6.buildMerkleChainV1(compacted.checkpoint, []);
  await assert.rejects(() => p7.buildSupersessionConflictIndexV1(plainGenerationPositive, continuity), /compacted-chain-required/);
  await assert.rejects(() => p9.buildRestartBootstrapV1(plainGenerationPositive, reality(), [], continuity), /invalid-p7-index/);
  assert.equal(stable(compactedIndex.doNotResurrectEventIds), stable(index.doNotResurrectEventIds));
  assert.equal(stable(compactedIndex.unresolvedConflicts), stable(index.unresolvedConflicts));
  assert.equal(stable(compactedIndex.unresolvedReferences), stable(index.unresolvedReferences));
  assert.equal(stable(compactedBootstrap.doNotResurrectEventIds), stable(bootstrap.doNotResurrectEventIds));
  assert.equal(stable(compactedBootstrap.unresolvedConflicts), stable(bootstrap.unresolvedConflicts));
  assert.equal(stable(compactedBootstrap.unresolvedReferences), stable(bootstrap.unresolvedReferences));
  assert.equal(compactedBootstrap.continuity.continuityDigest, continuity.continuityDigest);
  const forgedBootstrap = clone(compactedBootstrap);
  forgedBootstrap.continuity.continuityDigest = `sha256:${'f'.repeat(64)}`;
  await assert.rejects(() => p9.validateRestartBootstrapV1(compactedChain, reality(), forgedBootstrap, continuity), /PSM P9 rejected/);
  const forgedContinuity = clone(continuity);
  forgedContinuity.observedFactVersions = forgedContinuity.observedFactVersions.filter((entry) => entry.eventId !== 'goal-1');
  forgedContinuity.continuityDigest = await p6.sha256('psm:p7:compaction-continuity:v1', { schemaVersion: 1, source: forgedContinuity.source, compactedBase: forgedContinuity.compactedBase, observedFactVersions: forgedContinuity.observedFactVersions });
  forgedContinuity.compactionLink.continuityDigest = forgedContinuity.continuityDigest;
  forgedContinuity.compactionLink.compactionDigest = await p6.sha256(p6.COMPACTION_CONTINUITY_DOMAIN, { sourceTipDigest: forgedContinuity.compactionLink.sourceTipDigest, compactedBaseDigest: forgedContinuity.compactionLink.compactedBaseDigest, continuityDigest: forgedContinuity.compactionLink.continuityDigest });
  await assert.rejects(() => p7.buildSupersessionConflictIndexV1(compactedChain, forgedContinuity), /continuity-root-binding/);
  await assert.rejects(() => p9.buildRestartBootstrapV1(compactedChain, reality(), [], forgedContinuity), /PSM P9 rejected/);
  const forgedChain = await p6.buildCompactedMerkleChainV2(compacted.checkpoint, forgedContinuity.compactionLink, chain, []);
  assert.notEqual(forgedChain.rootDigest, compactedChain.rootDigest);
  assert.notEqual(forgedChain.tipDigest, compactedChain.tipDigest);
  await assert.rejects(() => p9.validateRestartBootstrapV1(forgedChain, reality(), compactedBootstrap, continuity), /PSM P9 rejected/);
});

test('P10 matrix E: relation, ordering, identity, and negative-memory attacks remain conservative', async () => {
  const { p7, chain, index } = await fixture();
  assert.equal(stable(index.doNotResurrectEventIds), stable(['goal-1']));
  const forged = clone(index); forged.finalCurrentEventIds = ['goal-1'];
  assert.throws(() => p7.validateSupersessionConflictIndexV1(forged), /PSM P7 rejected/);
  const prose = clone(index); prose.observedFactVersions[0].fact.goal = 'conflict superseded contradiction';
  assert.throws(() => p7.validateSupersessionConflictIndexV1(prose), /PSM P7 rejected/);
  const source = clone(chain); source.nodes[1].checkpoint.changes.goal.fact.goal = 'not safely valid';
  await assert.rejects(() => p7.buildSupersessionConflictIndexV1(source), /PSM P7 rejected|PSM P6 rejected/);
});

test('P10 compaction continuity rejects omission, tamper, stale reuse, and preserves five cycles', async () => {
  const { p5, p6, p7, p9, chain, compacted, compactedChain, continuity, continuityLink, index } = await fixture();
  const missing = clone(continuity); missing.compactionLink = null;
  await assert.rejects(() => p7.buildSupersessionConflictIndexV1(compactedChain, missing), /missing-compaction-link|invalid-compaction-continuity/);
  const changedFacts = clone(continuity); changedFacts.observedFactVersions[0].fact.goal = 'tampered';
  await assert.rejects(() => p7.buildSupersessionConflictIndexV1(compactedChain, changedFacts), /continuity-digest-mismatch|invalid-compaction-continuity|invalid-observed-fact/);
  const recomputed = clone(changedFacts);
  recomputed.continuityDigest = await p6.sha256('psm:p7:compaction-continuity:v1', { schemaVersion: 1, source: recomputed.source, compactedBase: recomputed.compactedBase, observedFactVersions: recomputed.observedFactVersions });
  await assert.rejects(() => p7.buildSupersessionConflictIndexV1(compactedChain, recomputed), /continuity-link-binding|continuity-digest-mismatch|invalid-observed-fact/);
  const alteredLink = clone(continuityLink); alteredLink.sourceTipDigest = `sha256:${'1'.repeat(64)}`;
  const altered = clone(continuity); altered.compactionLink = alteredLink;
  await assert.rejects(() => p7.buildSupersessionConflictIndexV1(compactedChain, altered), /continuity-link-binding|continuity-link-digest-mismatch/);
  let currentBase = compacted.checkpoint;
  let currentChain = compactedChain;
  let currentIndex = await p7.buildSupersessionConflictIndexV1(currentChain, continuity);
  for (let cycle = 0; cycle < 5; cycle += 1) {
    const nextCompacted = p5.compactCheckpointChainV1(currentBase, []).checkpoint;
    const draft = await p7.createCompactionContinuityV1(currentIndex, currentChain, nextCompacted);
    const link = await p6.createCompactionLinkV2(currentChain, nextCompacted, draft.continuityDigest);
    const nextContinuity = await p7.bindCompactionContinuityV1(draft, link, currentChain, nextCompacted);
    const nextChain = await p6.buildCompactedMerkleChainV2(nextCompacted, link, currentChain, []);
    currentIndex = await p7.buildSupersessionConflictIndexV1(nextChain, nextContinuity);
    const nextBootstrap = await p9.buildRestartBootstrapV1(nextChain, reality(), [], nextContinuity);
    assert.equal(stable(currentIndex.doNotResurrectEventIds), stable(index.doNotResurrectEventIds));
    assert.equal(stable(currentIndex.unresolvedConflicts), stable(index.unresolvedConflicts));
    assert.equal(stable(currentIndex.unresolvedReferences), stable(index.unresolvedReferences));
    assert.equal(nextBootstrap.state, 'structurally-valid-action-gap');
    currentBase = nextCompacted; currentChain = nextChain;
  }
  const postCompaction = clone(compacted.checkpoint.capsule);
  postCompaction.watermark = { sequence: 8, eventId: 'goal-3', at: 160 };
  postCompaction.goal.fact.goal = 'post-compaction goal';
  postCompaction.goal.fact.establishedBy = established('goal-3', 8, 160, 'goal-2', ['missing-after-compaction']);
  const postDelta = p5.createDeltaCheckpointV1(compacted.checkpoint.capsule, postCompaction, compacted.checkpoint.generation);
  const postChain = await p6.buildCompactedMerkleChainV2(compacted.checkpoint, continuityLink, chain, [postDelta]);
  const postIndex = await p7.buildSupersessionConflictIndexV1(postChain, continuity);
  assert.equal(stable(postIndex.doNotResurrectEventIds), stable(['goal-1', 'goal-2']));
  assert.ok(postIndex.unresolvedReferences.some((ref) => ref.targetEventId === 'missing-after-compaction'));
});

test('P10 matrix F: P8 validates identity, source, digest, bytes, budget, and laziness', async () => {
  const { p7, p8, chain, index } = await fixture();
  let calls = 0;
  const plan = p8.planEvidenceHydrationV1(index, ['evidence-1'], 3);
  assert.equal(calls, 0);
  const bundle = await p8.hydrateEvidenceV1(index, plan, async (descriptor) => { calls += 1; assert.equal(Object.isFrozen(descriptor), true); return bytes('one'); });
  assert.equal(calls, 1);
  await p8.validateHydratedEvidenceBundleV1(index, bundle);
  assert.throws(() => p8.planEvidenceHydrationV1(index, ['goal-1'], 3), /PSM P8 rejected/);
  const wrong = clone(bundle); wrong.source.tipDigest = `sha256:${'0'.repeat(64)}`;
  await assert.rejects(() => p8.validateHydratedEvidenceBundleV1(index, wrong), /PSM P8 rejected/);
  const tampered = clone(bundle); tampered.items[0].bytes[0] ^= 1;
  await assert.rejects(() => p8.validateHydratedEvidenceBundleV1(index, tampered), /PSM P8 rejected/);
  await assert.rejects(() => p8.hydrateEvidenceV1(index, plan, async () => { throw new Error('resolver'); }), /PSM P8 rejected/);
  await assert.rejects(() => p8.hydrateEvidenceV1(index, plan, async () => bytes('toolong')), /PSM P8 rejected/);
  assert.equal(chain.nodes.length, 2);
});

test('P10 matrix G/J/H: P9 stale reality, source binding, guardrails, action gap, and serialization boundary', async () => {
  const { p9, chain, bootstrap } = await fixture();
  for (const key of ['id', 'repositoryPath', 'branch', 'head']) {
    const stale = reality(); stale[key] += '-stale';
    await assert.rejects(() => p9.validateRestartBootstrapV1(chain, stale, bootstrap), /PSM P9 rejected/);
  }
  const fake = clone(bootstrap); fake.nextAction = 'restart-now';
  const rendered = p9.renderRestartBootstrapV1(fake, { maxBytes: 12288 });
  assert.equal(typeof rendered.serialized, 'string');
  await assert.rejects(() => p9.validateRestartBootstrapV1(chain, reality(), fake), /PSM P9 rejected/);
  const sourceForged = clone(bootstrap); sourceForged.source.generation += 1;
  await assert.rejects(() => p9.validateRestartBootstrapV1(chain, reality(), sourceForged), /PSM P9 rejected/);
  assert.equal(bootstrap.nextAction, null);
  assert.equal(bootstrap.nextActionStatus, 'not-encoded-by-p2-p3');
  assert.throws(() => p9.renderRestartBootstrapV1(bootstrap, { maxBytes: 1 }), /PSM P9 rejected/);
});

test('P10 matrix I/K: repeated projections are stable and all P1-P10 modules remain offline', async () => {
  const { chain, index, bootstrap } = await fixture();
  for (let cycle = 0; cycle < 5; cycle += 1) {
    const next = await fixture();
    assert.equal(stable(next.chain), stable(chain));
    assert.equal(stable(next.index), stable(index));
    assert.equal(stable(next.bootstrap), stable(bootstrap));
  }
  for (const file of [
    'progressive-state-memory-m7-p1.js', 'progressive-state-memory-m7-p2.js', 'progressive-state-memory-m7-p3.js',
    'progressive-state-memory-m7-p4.js', 'progressive-state-memory-m7-p5.js', 'progressive-state-memory-m7-p6.js',
    'progressive-state-memory-m7-p7.js', 'progressive-state-memory-m7-p8.js', 'progressive-state-memory-m7-p9.js',
  ]) {
    const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    assert.doesNotMatch(source, /chrome\.storage|fetch\(|XMLHttpRequest|require\(|module\.exports|Date\.now|Math\.random|reload\s*\(|connector/i);
  }
});
