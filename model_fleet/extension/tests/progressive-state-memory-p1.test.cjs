const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

function loadP1() {
  const context = { globalThis: null };
  context.globalThis = context;
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'progressive-state-memory-m7-p1.js'), 'utf8'), context, {
    filename: 'progressive-state-memory-m7-p1.js',
  });
  return context.ProgressiveStateMemoryM7P1;
}

function event(overrides = {}) {
  return {
    eventId: 'evt-1',
    sequence: 1,
    at: 100,
    kind: 'goal.changed',
    source: { kind: 'operator', id: 'operator-1' },
    provenance: [{ kind: 'operator', ref: 'operator:operator-1', digest: `sha256:${'a'.repeat(64)}` }],
    payload: { goal: 'bounded work' },
    supersedes: null,
    conflictsWith: [],
    ...overrides,
  };
}

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

test('P1 exposes one browser-compatible typed ledger boundary', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'progressive-state-memory-m7-p1.js'), 'utf8');
  assert.doesNotMatch(source, /require\(|module\.exports|chrome\./);
  const p1 = loadP1();
  assert.deepEqual(plain(p1.emptyLedger()), { schemaVersion: 1, nextSequence: 1, headEventId: null, events: [] });
  assert.ok(p1.EVENT_KINDS.includes('goal.changed'));
});

test('admission assigns one strict ordered event without mutating input', () => {
  const p1 = loadP1();
  const ledger = p1.emptyLedger();
  const input = event();
  const before = JSON.stringify(input);
  const result = p1.admitEvent(ledger, input);
  assert.equal(JSON.stringify(input), before);
  assert.equal(result.event.eventId, 'evt-1');
  assert.equal(result.ledger.nextSequence, 2);
  assert.equal(result.ledger.headEventId, 'evt-1');
  assert.deepEqual(plain(result.ledger.events[0].source), input.source);
});

test('duplicate IDs, duplicate sequence, and conflicting references fail closed', () => {
  const p1 = loadP1();
  const first = p1.admitEvent(p1.emptyLedger(), event()).ledger;
  assert.throws(() => p1.admitEvent(first, event({ eventId: 'evt-1', sequence: 2 })), /duplicate-event-id/);
  assert.throws(() => p1.admitEvent(first, event({ eventId: 'evt-2', sequence: 1 })), /out-of-order-sequence/);
  assert.throws(() => p1.admitEvent(first, event({ eventId: 'evt-2', sequence: 2, conflictsWith: ['missing'] })), /invalid-conflict-reference/);
  assert.throws(() => p1.admitEvent(first, event({ eventId: 'evt-2', sequence: 2, conflictsWith: ['evt-1', 'evt-1'] })), /duplicate-conflict-reference/);
  assert.throws(() => p1.admitEvent(first, event({ eventId: 'evt-2', sequence: 2, at: 99 })), /out-of-order-time/);
});

test('unknown kinds, invalid sources, and malformed provenance fail closed', () => {
  const p1 = loadP1();
  for (const input of [
    event({ kind: 'summary.written' }),
    event({ source: { kind: 'ui', id: 'pane' } }),
    event({ source: { kind: 'operator', id: '' } }),
    event({ provenance: [] }),
    event({ provenance: [{ kind: 'report', ref: 'report.md', digest: 'sha256:not-a-digest' }] }),
    event({ payload: [] }),
    event({ payload: { invalid: undefined } }),
    event({ payload: { invalid: Number.NaN } }),
  ]) assert.throws(() => p1.admitEvent(p1.emptyLedger(), input));
});

test('event-kind source authority is explicit and report evidence cannot author decisions', () => {
  const p1 = loadP1();
  assert.deepEqual(plain(p1.EVENT_SOURCE_POLICY['operator.decision']), ['operator']);
  assert.throws(() => p1.admitEvent(p1.emptyLedger(), event({ source: { kind: 'report', id: 'report-1' }, kind: 'operator.decision' })), /source-not-authorized-for-event-kind/);
  const evidence = p1.admitEvent(p1.emptyLedger(), event({ source: { kind: 'report', id: 'report-1' }, kind: 'evidence.linked' }));
  assert.equal(evidence.event.source.kind, 'report');
  assert.throws(() => p1.admitEvent(p1.emptyLedger(), event({ source: { kind: 'verification', id: 'check-1' }, kind: 'operator.decision' })), /source-not-authorized-for-event-kind/);
});

test('provenance accepts stable repository/report references without weakening validation', () => {
  const p1 = loadP1();
  const result = p1.admitEvent(p1.emptyLedger(), event({ provenance: [{ kind: 'report', ref: 'docs/reports/state-model/P1.md', digest: `sha256:${'b'.repeat(64)}` }] }));
  assert.equal(result.event.provenance[0].ref, 'docs/reports/state-model/P1.md');
});

test('payload admission rejects Date, Map, custom instances, and cycles', () => {
  const p1 = loadP1();
  class CustomPayload { constructor() { this.value = 'not plain'; } }
  for (const payload of [
    { createdAt: new Date('2020-01-01T00:00:00Z') },
    { values: new Map([['key', 'value']]) },
    { custom: new CustomPayload() },
  ]) assert.throws(() => p1.admitEvent(p1.emptyLedger(), event({ payload })), /unserializable-payload/);
  const cyclic = {};
  cyclic.self = cyclic;
  assert.throws(() => p1.admitEvent(p1.emptyLedger(), event({ payload: cyclic })), /cyclic-payload/);
});

test('supersession is explicit, prior, and identity-bound', () => {
  const p1 = loadP1();
  const first = p1.admitEvent(p1.emptyLedger(), event()).ledger;
  const second = p1.admitEvent(first, event({ eventId: 'evt-2', sequence: 2, supersedes: 'evt-1', at: 110 })).ledger;
  assert.equal(second.events[1].supersedes, 'evt-1');
  assert.throws(() => p1.admitEvent(first, event({ eventId: 'evt-2', sequence: 2, supersedes: 'evt-2' })), /invalid-supersession-reference/);
  assert.throws(() => p1.admitEvent(first, event({ eventId: 'evt-2', sequence: 2, supersedes: 'unknown' })), /invalid-supersession-reference/);
});

test('ledger validation rejects reordered, altered, or missing-head history', () => {
  const p1 = loadP1();
  const ledger = p1.admitEvent(p1.emptyLedger(), event()).ledger;
  assert.throws(() => p1.validateLedger({ ...ledger, nextSequence: 99 }), /invalid-ledger-sequence/);
  assert.throws(() => p1.validateLedger({ ...ledger, headEventId: null }), /invalid-ledger-head/);
  assert.throws(() => p1.validateLedger({ ...ledger, events: [{ ...ledger.events[0], sequence: 2 }] }), /out-of-order-sequence/);
  assert.throws(() => p1.validateLedger({ ...ledger, extra: true }), /unknown-ledger-field/);
});

test('serialization is deterministic and round-trips a validated ledger', () => {
  const p1 = loadP1();
  const ledger = p1.admitEvent(p1.emptyLedger(), event()).ledger;
  const serialized = p1.serializeLedger(ledger);
  assert.equal(serialized, p1.serializeLedger(JSON.parse(JSON.stringify(ledger))));
  assert.deepEqual(plain(p1.deserializeLedger(serialized)), plain(ledger));
  assert.throws(() => p1.deserializeLedger('{broken'), /invalid-ledger-serialization/);
});

test('storage contract reads and writes only the injected PSM key', async () => {
  const p1 = loadP1();
  const calls = [];
  const values = {};
  const storage = {
    async get(keys) { calls.push(['get', keys]); return Object.fromEntries(keys.filter((key) => key in values).map((key) => [key, values[key]])); },
    async set(value) { calls.push(['set', Object.keys(value)]); Object.assign(values, value); },
  };
  const initial = await p1.loadLedger(storage);
  const next = p1.admitEvent(initial, event()).ledger;
  await p1.saveLedger(storage, next);
  const loaded = await p1.loadLedger(storage);
  assert.deepEqual(plain(loaded), plain(next));
  assert.deepEqual(plain(calls), [
    ['get', [p1.STORAGE_KEY]],
    ['set', [p1.STORAGE_KEY]],
    ['get', [p1.STORAGE_KEY]],
  ]);
  assert.equal(Object.keys(values).length, 1);
  assert.equal(values[p1.STORAGE_KEY], p1.serializeLedger(next));
  await assert.rejects(() => p1.loadLedger(storage, 'modelFleetState:v2'), /storage-key-override-forbidden/);
  await assert.rejects(() => p1.saveLedger(storage, next, 'modelFleetState:v2'), /storage-key-override-forbidden/);
  assert.throws(() => p1.appendEvent(storage, event({ eventId: 'evt-2', sequence: 2 }), 'modelFleetState:v2'), /storage-key-override-forbidden/);
});

test('storage rejects malformed persisted history before exposing it', async () => {
  const p1 = loadP1();
  const storage = { async get() { return { [p1.STORAGE_KEY]: JSON.stringify({ schemaVersion: 1, nextSequence: 2, headEventId: 'evt-1', events: [] }) }; }, async set() {} };
  await assert.rejects(() => p1.loadLedger(storage), /invalid-ledger-sequence/);
});

test('appendEvent is the single durable load-admit-save contract', async () => {
  const p1 = loadP1();
  const values = {};
  const calls = [];
  const storage = {
    async get(keys) { calls.push('get'); return Object.fromEntries(keys.filter((key) => key in values).map((key) => [key, values[key]])); },
    async set(value) { calls.push('set'); Object.assign(values, value); },
  };
  const result = await p1.appendEvent(storage, event());
  assert.equal(result.event.eventId, 'evt-1');
  assert.deepEqual(calls, ['get', 'set']);
  assert.deepEqual(plain(await p1.loadLedger(storage)), plain(result.ledger));
});

test('concurrent append callers serialize and retain every acknowledged event', async () => {
  const p1 = loadP1();
  const values = {};
  const storage = {
    async get(keys) { await new Promise((resolve) => setTimeout(resolve, 3)); return Object.fromEntries(keys.filter((key) => key in values).map((key) => [key, values[key]])); },
    async set(value) { await new Promise((resolve) => setTimeout(resolve, 3)); Object.assign(values, value); },
  };
  const first = event({ eventId: 'evt-a' });
  const second = event({ eventId: 'evt-b' });
  delete first.sequence;
  delete second.sequence;
  const results = await Promise.all([p1.appendEvent(storage, first), p1.appendEvent(storage, second)]);
  const finalLedger = await p1.loadLedger(storage);
  assert.deepEqual(plain(results.map((result) => result.event.eventId)), ['evt-a', 'evt-b']);
  assert.deepEqual(plain(finalLedger.events.map((entry) => entry.eventId)), ['evt-a', 'evt-b']);
  assert.deepEqual(plain(finalLedger.events.map((entry) => entry.sequence)), [1, 2]);
});
