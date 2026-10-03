const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

function loadPsm() {
  const context = { globalThis: null, crypto: crypto.webcrypto, TextEncoder };
  context.globalThis = context;
  for (const file of ['progressive-state-memory-m7-p1.js', 'progressive-state-memory-m7-p2.js', 'progressive-state-memory-m7-p3.js', 'progressive-state-memory-m7-p4.js', 'progressive-state-memory-m7-p5.js', 'progressive-state-memory-m7-p6.js', 'progressive-state-memory-m7-p7.js', 'progressive-state-memory-m7-p8.js', 'progressive-state-memory-m7-p9.js', 'progressive-state-memory-m7-p12.js']) vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context, { filename: file });
  return Object.fromEntries(['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p12'].map((name, index) => [name, context[`ProgressiveStateMemoryM7P${index + 1 === 10 ? 12 : index + 1}`]]));
}
const reality = () => ({ id: 'model-fleet', repositoryPath: '/workspace/ai_sandbox/extension_chromium/model_fleet', branch: 'main', head: '6ee3bf81a9700c4c3a3b5b00851f911585512248' });
const clone = (value) => JSON.parse(JSON.stringify(value));
const digest = (text) => `sha256:${crypto.createHash('sha256').update(Buffer.from(text)).digest('hex')}`;
const event = ({ eventId, sequence, kind, at, sourceKind = 'runtime', payload, supersedes = null, conflictsWith = [] }) => ({ eventId, sequence, at, kind, source: { kind: sourceKind, id: sourceKind === 'operator' ? 'operator-1' : 'runtime-1' }, provenance: [{ kind: sourceKind, ref: `${sourceKind}:fixture`, digest: `sha256:${String(at).padStart(64, '0')}` }], payload, supersedes, conflictsWith });
async function fixture() {
  const { p1, p2, p4, p5, p6, p7, p9, p12 } = loadPsm(); let ledger = p1.emptyLedger();
  for (const input of [
    event({ eventId: 'goal-old', sequence: 1, kind: 'goal.changed', at: 90, sourceKind: 'operator', payload: { goal: 'old' } }),
    event({ eventId: 'goal-1', sequence: 2, kind: 'goal.changed', at: 100, sourceKind: 'operator', payload: { goal: 'current' }, supersedes: 'goal-old' }),
    event({ eventId: 'frontier-1', sequence: 3, kind: 'frontier.changed', at: 110, payload: { frontierKey: 'frontier', state: 'open', summary: 'open frontier' } }),
    event({ eventId: 'constraint-1', sequence: 4, kind: 'constraint.accepted', at: 120, sourceKind: 'operator', payload: { constraintId: 'C-1', text: 'preserve authority', state: 'active' } }),
    event({ eventId: 'task-1', sequence: 5, kind: 'task.accepted', at: 130, payload: { taskId: 'T-1', title: 'Continue task', role: 'implementation', phase: 'pending', blocker: null, result: null, ownerWorkerId: null, dependencies: [], priority: 1 } }),
    event({ eventId: 'message-1', sequence: 6, kind: 'message.accepted', at: 140, sourceKind: 'operator', payload: { messageId: 'M-1', from: 'operator', to: 'W-1', body: 'queued message', phase: 'queued' } }),
    event({ eventId: 'decision-1', sequence: 7, kind: 'operator.decision', at: 150, sourceKind: 'operator', payload: { decisionId: 'D-1', decision: 'continue', targetType: 'task', targetId: 'T-1' } }),
    event({ eventId: 'evidence-1', sequence: 8, kind: 'evidence.linked', at: 160, payload: { evidenceId: 'E-1', subjectType: 'task', subjectId: 'T-1', ref: 'evidence/task.txt', digest: digest('task') } }),
  ]) ledger = p1.admitEvent(ledger, input).ledger;
  const baseCapsule = p4.buildRestartCapsule(p2.reduceLedger(ledger), reality());
  const childCapsule = clone(baseCapsule); childCapsule.watermark = { sequence: 9, eventId: 'goal-2', at: 170 }; childCapsule.goal.fact.goal = 'current next'; childCapsule.goal.fact.establishedBy = { ...childCapsule.goal.fact.establishedBy, eventId: 'goal-2', sequence: 9, at: 170, supersedes: 'goal-1' };
  const base = p5.createBaseCheckpointV1(baseCapsule); const delta = p5.createDeltaCheckpointV1(baseCapsule, childCapsule, 0); const chain = await p6.buildMerkleChainV1(base, [delta]);
  const index = await p7.buildSupersessionConflictIndexV1(chain); const compacted = p5.compactCheckpointChainV1(base, [delta]); const draft = await p7.createCompactionContinuityV1(index, chain, compacted.checkpoint); const link = await p6.createCompactionLinkV2(chain, compacted.checkpoint, draft.continuityDigest); const continuity = await p7.bindCompactionContinuityV1(draft, link, chain, compacted.checkpoint); const compactedChain = await p6.buildCompactedMerkleChainV2(compacted.checkpoint, link, chain, []);
  const bootstrap = await p9.buildRestartBootstrapV1(compactedChain, reality(), [], continuity); return { p1, p2, p4, p5, p6, p7, p9, p12, chain: compactedChain, continuity, bootstrap };
}
const action = (type, id, eventId, actionId = `auth-${type}`) => ({ actionId, action: { verb: 'continue', target: { type, id, eventId } } });
const authority = { kind: 'operator', authorizationId: 'operator-auth-1' };

test('P12 is isolated and has no runtime or storage authority', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'progressive-state-memory-m7-p12.js'), 'utf8');
  assert.doesNotMatch(source, /chrome\.|chrome\.storage|fetch\(|XMLHttpRequest|require\(|module\.exports|Date\.now|Math\.random|filesystem|network|reload/i);
});

test('P9 remains an action gap and explicit current task/message/frontier authorizations become ready', async () => {
  const { p12, chain, continuity, bootstrap } = await fixture();
  const gap = await p12.assessRestartReadinessV1(chain, reality(), bootstrap, null, continuity); assert.equal(gap.state, p12.GAP_STATE); assert.equal(gap.nextAction, null); assert.equal(gap.nextActionStatus, p12.ACTION_GAP);
  for (const [type, id, eventId] of [['task', 'T-1', 'task-1'], ['message', 'M-1', 'message-1'], ['frontier', 'frontier', 'frontier-1']]) {
    const auth = await p12.createRestartActionAuthorizationV1(chain, reality(), bootstrap, action(type, id, eventId), authority, continuity);
    const ready = await p12.assessRestartReadinessV1(chain, reality(), bootstrap, auth, continuity); assert.equal(ready.state, p12.READY_STATE); assert.equal(ready.actionId, 'auth-' + type); assert.equal(ready.authority.authorizationId, authority.authorizationId); assert.equal(Object.prototype.hasOwnProperty.call(ready, 'authorizationId'), false); assert.deepEqual(ready.nextAction, auth.action); assert.deepEqual(await p12.validateRestartActionAuthorizationV1(chain, reality(), bootstrap, auth, continuity), auth);
  }
});

test('P12 create boundary is closed-world before explicit-action normalization', async () => {
  const { p12, chain, continuity, bootstrap } = await fixture();
  const badActions = [
    { actionId: 'action-1', action: action('task', 'T-1', 'task-1').action, extra: true },
    { action: 'missing-id' },
    { actionId: 'missing-action' },
  ];
  for (const bad of badActions) await assert.rejects(() => p12.createRestartActionAuthorizationV1(chain, reality(), bootstrap, bad, authority, continuity));
  for (const bad of [{ ...authority, extra: true }, { authorizationId: authority.authorizationId }, { kind: authority.kind }]) await assert.rejects(() => p12.createRestartActionAuthorizationV1(chain, reality(), bootstrap, action('task', 'T-1', 'task-1'), bad, continuity));
});

test('P12 rejects stale, substituted, malformed, unsafe, and non-current targets', async () => {
  const { p12, chain, continuity, bootstrap } = await fixture();
  const valid = await p12.createRestartActionAuthorizationV1(chain, reality(), bootstrap, action('task', 'T-1', 'task-1'), authority, continuity);
  const cases = [
    (x) => { x.source.rootDigest = `sha256:${'0'.repeat(64)}`; },
    (x) => { x.project.branch = 'stale'; },
    (x) => { x.watermark.sequence -= 1; },
    (x) => { x.action.target.eventId = 'goal-old'; },
    (x) => { x.action.target.type = 'unknown'; },
    (x) => { x.action.verb = 'invent'; },
    (x) => { x.authority.kind = 'planner'; },
    (x) => { x.extra = true; },
    (x) => { x.action.target.id = 'missing'; },
  ];
  for (const mutate of cases) { const forged = clone(valid); mutate(forged); await assert.rejects(() => p12.validateRestartActionAuthorizationV1(chain, reality(), bootstrap, forged, continuity)); }
  const forgedDecision = clone(valid); forgedDecision.action.target.eventId = 'goal-1'; await assert.rejects(() => p12.validateRestartActionAuthorizationV1(chain, reality(), bootstrap, forgedDecision, continuity));
});

test('P12 rejects an authorization after the same task receives a new current event version', async () => {
  const { p4, p5, p6, p9, p12, chain, continuity, bootstrap } = await fixture();
  const old = await p12.createRestartActionAuthorizationV1(chain, reality(), bootstrap, action('task', 'T-1', 'task-1'), authority, continuity);
  const latestCapsule = clone(bootstrap.capsule); latestCapsule.watermark = { sequence: 10, eventId: 'task-2', at: 180 }; latestCapsule.tasks[0].fact.establishedBy = { ...latestCapsule.tasks[0].fact.establishedBy, eventId: 'task-2', sequence: 10, at: 180 };
  const latestChain = await p6.buildMerkleChainV1(p5.createBaseCheckpointV1(p4.validateRestartCapsule(latestCapsule)), []);
  const latestBootstrap = await p9.buildRestartBootstrapV1(latestChain, reality());
  await assert.rejects(() => p12.validateRestartActionAuthorizationV1(latestChain, reality(), latestBootstrap, old), /PSM P12 rejected/);
});

test('P12 rejects blocked/done/terminal/quiescent targets and prose-only decisions', async () => {
  const { p12, chain, continuity, bootstrap } = await fixture();
  for (const [type, id, eventId] of [['task', 'T-1', 'task-1'], ['message', 'M-1', 'message-1'], ['frontier', 'frontier', 'frontier-1']]) {
    const forged = action(type, id, eventId); if (type === 'task') forged.action.target.id = 'T-1';
    const capsule = clone(bootstrap); const fact = type === 'task' ? capsule.capsule.tasks[0].fact : type === 'message' ? capsule.capsule.messages[0].fact : capsule.capsule.frontier.fact; if (type === 'task') fact.phase = 'done'; if (type === 'message') fact.phase = 'done'; if (type === 'frontier') fact.state = 'quiescent';
    await assert.rejects(() => p12.createRestartActionAuthorizationV1(chain, reality(), capsule, forged, authority, continuity));
  }
  const gap = await p12.assessRestartReadinessV1(chain, reality(), bootstrap, null, continuity); assert.equal(gap.state, 'structurally-valid-action-gap');
});

test('P12 compacted continuity and forged continuity remain governed by P9/P7', async () => {
  const { p6, p12, chain, bootstrap, continuity } = await fixture(); const before = JSON.stringify({ chain, bootstrap, continuity });
  const auth = await p12.createRestartActionAuthorizationV1(chain, reality(), bootstrap, action('task', 'T-1', 'task-1'), authority, continuity); assert.equal(auth.action.target.eventId, 'task-1');
  const forged = clone(continuity); forged.observedFactVersions.pop(); forged.continuityDigest = await p6.sha256('psm:p7:compaction-continuity:v1', { schemaVersion: forged.schemaVersion, source: clone(forged.source), compactedBase: clone(forged.compactedBase), observedFactVersions: clone(forged.observedFactVersions) });
  await assert.rejects(() => p12.assessRestartReadinessV1(chain, reality(), bootstrap, auth, forged)); assert.equal(JSON.stringify({ chain, bootstrap, continuity }), before);
});
