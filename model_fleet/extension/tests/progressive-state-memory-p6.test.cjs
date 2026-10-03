const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

function loadPsm() {
  const context = { globalThis: null, crypto: crypto.webcrypto, TextEncoder };
  context.globalThis = context;
  for (const file of ['progressive-state-memory-m7-p1.js', 'progressive-state-memory-m7-p2.js', 'progressive-state-memory-m7-p3.js', 'progressive-state-memory-m7-p4.js', 'progressive-state-memory-m7-p5.js', 'progressive-state-memory-m7-p6.js']) {
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context, { filename: file });
  }
  return { p1: context.ProgressiveStateMemoryM7P1, p2: context.ProgressiveStateMemoryM7P2, p4: context.ProgressiveStateMemoryM7P4, p5: context.ProgressiveStateMemoryM7P5, p6: context.ProgressiveStateMemoryM7P6 };
}

function makeEvent(kind, payload, at, sourceKind = 'runtime', eventId = `${kind}-${at}`) {
  const sourceId = sourceKind === 'operator' ? 'operator-1' : 'runtime-1';
  return { eventId, sequence: 1, at, kind, source: { kind: sourceKind, id: sourceId }, provenance: [{ kind: sourceKind, ref: `${sourceKind}:${sourceId}`, digest: `sha256:${String(at).padStart(64, '0')}` }], payload, supersedes: null, conflictsWith: [] };
}
function task(taskId, phase) {
  return { taskId, title: taskId, role: 'implementation', phase, blocker: phase === 'blocked' ? 'blocked' : null, result: phase === 'done' ? 'done' : null, ownerWorkerId: null, dependencies: [], priority: 1 };
}
function capsule() {
  const { p1, p2, p4 } = loadPsm();
  let ledger = p1.emptyLedger();
  for (const spec of [
    makeEvent('goal.changed', { goal: 'P6 goal' }, 100, 'operator', 'goal-1'),
    makeEvent('frontier.changed', { frontierKey: 'T-1', state: 'open', summary: 'work' }, 110, 'runtime', 'frontier-1'),
    makeEvent('constraint.accepted', { constraintId: 'C-1', text: 'constraint', state: 'active' }, 120, 'operator', 'constraint-1'),
    makeEvent('task.accepted', task('T-1', 'blocked'), 130, 'runtime', 'task-1'),
    makeEvent('message.accepted', { messageId: 'M-1', from: 'operator', to: 'W-1', body: 'message', phase: 'queued' }, 140, 'operator', 'message-1'),
  ]) ledger = p1.admitEvent(ledger, { ...spec, sequence: ledger.nextSequence }).ledger;
  return p4.buildRestartCapsule(p2.reduceLedger(ledger), { id: 'model-fleet', repositoryPath: '/workspace/ai_sandbox/extension_chromium/model_fleet', branch: 'main', head: '6ee3bf81a9700c4c3a3b5b00851f911585512248' });
}
function child(parent, sequence, at, mutate = () => {}) {
  const next = JSON.parse(JSON.stringify(parent));
  next.watermark = { sequence, eventId: `event-${sequence}`, at };
  mutate(next);
  return next;
}
function reordered(value) {
  if (Array.isArray(value)) return value.map(reordered);
  if (value && typeof value === 'object') { const result = {}; Object.keys(value).reverse().forEach((key) => { result[key] = reordered(value[key]); }); return result; }
  return value;
}
function stable(value) {
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}

test('P6 is isolated, browser-compatible, and has no P7+ authority', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'progressive-state-memory-m7-p6.js'), 'utf8');
  assert.doesNotMatch(source, /require\(|module\.exports|chrome\.|Date\.now|Math\.random|chrome\.storage|supersession|contradiction|hydrate|fetch\(/);
  assert.match(source, /ProgressiveStateMemoryM7P5/);
  assert.doesNotMatch(source, /MerkleRoot|CAS|context_digest|parent_digest/);
});

test('canonical checkpoint hashing is key-order independent and domain separated', async () => {
  const { p5, p6 } = loadPsm();
  const base = p5.createBaseCheckpointV1(capsule());
  const digest = await p6.checkpointDigest(base);
  assert.match(digest, /^sha256:[0-9a-f]{64}$/);
  assert.equal(digest, await p6.checkpointDigest(reordered(base)));
  const expected = crypto.createHash('sha256').update(`psm:p6:checkpoint:v1\n${p6.canonicalJson(base)}`, 'utf8').digest('hex');
  assert.equal(digest, `sha256:${expected}`);
  assert.notEqual(digest, await p6.sha256(p6.DOMAINS.NODE_DOMAIN, { checkpointDigest: digest, parentDigest: null }));
});

test('builds and verifies a deterministic Merkle chain through P5', async () => {
  const { p5, p6 } = loadPsm();
  const first = capsule();
  const second = child(first, first.watermark.sequence + 1, first.watermark.at, (value) => { value.goal.fact.goal = 'next'; });
  const third = child(second, second.watermark.sequence + 1, second.watermark.at, (value) => { value.frontier.fact.summary = 'later'; });
  const d1 = p5.createDeltaCheckpointV1(first, second, 0);
  const d2 = p5.createDeltaCheckpointV1(second, third, 1);
  const chain = await p6.buildMerkleChainV1(p5.createBaseCheckpointV1(first), [d1, d2]);
  const same = await p6.buildMerkleChainV1(reordered(p5.createBaseCheckpointV1(first)), [reordered(d1), reordered(d2)]);
  assert.equal(JSON.stringify(chain), JSON.stringify(same));
  const verified = await p6.verifyMerkleChainV1(chain);
  assert.equal(verified.generation, 2);
  assert.equal(stable(verified.capsule), stable(third));
});

test('checkpoint and node mutations fail closed', async () => {
  const { p5, p6 } = loadPsm();
  const base = p5.createBaseCheckpointV1(capsule());
  const childCapsule = child(base.capsule, 6, base.capsule.watermark.at, (value) => { value.goal.fact.goal = 'changed'; });
  const delta = p5.createDeltaCheckpointV1(base.capsule, childCapsule, 0);
  const chain = await p6.buildMerkleChainV1(base, [delta]);
  for (const mutate of [
    (value) => { value.nodes[0].checkpoint.capsule.goal.fact.goal = 'tampered'; },
    (value) => { value.nodes[0].checkpointDigest = 'sha256:' + '0'.repeat(64); },
    (value) => { value.nodes[1].nodeDigest = 'sha256:' + '1'.repeat(64); },
    (value) => { value.nodes[1].parentDigest = 'sha256:' + '2'.repeat(64); },
    (value) => { value.nodes[0].checkpoint.extra = true; },
  ]) {
    const forged = JSON.parse(JSON.stringify(chain));
    mutate(forged);
    await assert.rejects(() => p6.verifyMerkleChainV1(forged));
  }
});

test('chain schemas, order, links, algorithms, and digests are strict', async () => {
  const { p5, p6 } = loadPsm();
  const base = p5.createBaseCheckpointV1(capsule());
  const next = child(base.capsule, 6, base.capsule.watermark.at);
  const delta = p5.createDeltaCheckpointV1(base.capsule, next, 0);
  const chain = await p6.buildMerkleChainV1(base, [delta]);
  const cases = [
    (value) => { value.algorithm = 'sha512'; },
    (value) => { value.extra = true; },
    (value) => { value.rootDigest = 'sha256:bad'; },
    (value) => { value.nodes = [value.nodes[1], value.nodes[0]]; },
    (value) => { value.nodes.push(value.nodes[1]); },
    (value) => { value.nodes[1].checkpoint = value.nodes[0].checkpoint; },
  ];
  for (const mutate of cases) { const forged = JSON.parse(JSON.stringify(chain)); mutate(forged); await assert.rejects(() => p6.verifyMerkleChainV1(forged)); }
});

test('P5-invalid chains are rejected even when digest fields are recomputed', async () => {
  const { p5, p6 } = loadPsm();
  const base = p5.createBaseCheckpointV1(capsule());
  const next = child(base.capsule, 6, base.capsule.watermark.at);
  const delta = p5.createDeltaCheckpointV1(base.capsule, next, 0);
  const chain = await p6.buildMerkleChainV1(base, [delta]);
  const invalid = JSON.parse(JSON.stringify(chain));
  invalid.nodes[1].checkpoint.generation = 8;
  invalid.nodes[1].checkpoint.parentGeneration = 7;
  invalid.nodes[1].checkpointDigest = await p6.checkpointDigest(invalid.nodes[1].checkpoint).catch(() => 'sha256:' + '0'.repeat(64));
  invalid.nodes[1].nodeDigest = await p6.nodeDigest(invalid.nodes[1].checkpointDigest, invalid.nodes[1].parentDigest);
  invalid.tipDigest = invalid.nodes[1].nodeDigest;
  await assert.rejects(() => p6.verifyMerkleChainV1(invalid), /invalid-p5/);
});

test('compaction link binds source tip to exact latest P5 base', async () => {
  const { p5, p6 } = loadPsm();
  const first = capsule();
  const second = child(first, 6, first.watermark.at, (value) => { value.goal.fact.goal = 'compacted'; });
  const base = p5.createBaseCheckpointV1(first);
  const delta = p5.createDeltaCheckpointV1(first, second, 0);
  const chain = await p6.buildMerkleChainV1(base, [delta]);
  const compacted = p5.compactCheckpointChainV1(base, [delta]).checkpoint;
  const link = await p6.createCompactionLinkV1(chain, compacted);
  assert.match(link.compactionDigest, /^sha256:[0-9a-f]{64}$/);
  assert.equal((await p6.verifyCompactionLinkV1(link, chain, compacted)).valid, true);
  for (const mutate of [
    (value) => { value.compactedBaseDigest = 'sha256:' + '0'.repeat(64); },
    (value) => { value.sourceTipDigest = 'sha256:' + '1'.repeat(64); },
    (value) => { value.compactionDigest = 'sha256:' + '2'.repeat(64); },
  ]) { const forged = JSON.parse(JSON.stringify(link)); mutate(forged); await assert.rejects(() => p6.verifyCompactionLinkV1(forged, chain, compacted)); }
  const altered = JSON.parse(JSON.stringify(compacted));
  altered.capsule.goal.fact.goal = 'wrong';
  await assert.rejects(() => p6.createCompactionLinkV1(chain, altered));
});

test('P6 APIs do not mutate caller inputs and preserve P5 replay result', async () => {
  const { p5, p6 } = loadPsm();
  const first = capsule();
  const second = child(first, 6, first.watermark.at);
  const base = p5.createBaseCheckpointV1(first);
  const delta = p5.createDeltaCheckpointV1(first, second, 0);
  const beforeBase = JSON.stringify(base);
  const beforeDelta = JSON.stringify(delta);
  const chain = await p6.buildMerkleChainV1(base, [delta]);
  await p6.verifyMerkleChainV1(chain);
  assert.equal(JSON.stringify(base), beforeBase);
  assert.equal(JSON.stringify(delta), beforeDelta);
  assert.notEqual(chain.rootDigest, chain.tipDigest);
});
