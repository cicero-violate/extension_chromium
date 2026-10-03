# Progressive State Memory P1 — Independent Verification 02

Status: DONE_ACCEPTED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Baseline/current HEAD verified: `6ee3bf81a9700c4c3a3b5b00851f911585512248`
Verified: 2026-10-03
Repair candidate: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P1_RESPONSE_02.md`
Prior failed verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P1_INDEPENDENT_VERIFICATION_01.md`

## Verdict

P1 repair is independently accepted. The typed event/admission ledger remains isolated from the live runtime, and all four previously blocking falsifiers are closed.

P2 may become ACTIVE. P3-P13 remain PENDING.

## Independent source verification

Verified directly in `extension/progressive-state-memory-m7-p1.js`:

- explicit `EVENT_SOURCE_POLICY` binds allowed source kinds to event kinds;
- `operator.decision` is operator-only;
- source/provenance objects must be plain typed objects;
- payload validation recursively rejects non-plain/lossy objects, accessors, cycles, undefined, and non-finite values;
- `loadLedger`, `saveLedger`, and `appendEvent` are fixed to `modelFleetPsmLedger:v1`;
- extra storage-key arguments fail closed with `storage-key-override-forbidden`;
- one module-local append queue serializes the supported single-process writer path;
- omitted append sequence is assigned from the ledger while holding the serialized append boundary;
- pure `admitEvent` remains explicit-sequence and immutable;
- P1 remains absent from runtime/background imports and has no `chrome`, `importScripts`, CommonJS, or service-worker dependency.

## Re-run of prior blocking falsifiers

### F1 — source authority

Independent probe:

```text
report source -> operator.decision
PASS_REJECTED: source-not-authorized-for-event-kind
```

### F2 — dedicated key isolation

Independent awaited probes:

```text
loadLedger(storage, alternate-key)
PASS_REJECTED: storage-key-override-forbidden

saveLedger(storage, ledger, alternate-key)
PASS_REJECTED: storage-key-override-forbidden

appendEvent(storage, event, alternate-key)
PASS_REJECTED: storage-key-override-forbidden
```

### F3 — concurrent append preservation

Three independently launched concurrent appends completed as:

```text
acks=evt-a,evt-b,evt-c
ids=evt-a,evt-b,evt-c
seq=1,2,3
```

No acknowledged event was lost.

### F4 — plain payload semantics

Independent probes:

```text
Date payload -> PASS_REJECTED: unserializable-payload
Map payload  -> PASS_REJECTED: unserializable-payload
```

Focused tests additionally cover custom instances and cycles.

## Independent validation

```text
node --test extension/tests/progressive-state-memory-p1.test.cjs
14/14 PASS
0 failed
0 skipped

node --check extension/progressive-state-memory-m7-p1.js
PASS

PSM durable state assertions
PASS

git diff --check
PASS

node --test extension/tests/*.test.cjs
293/293 PASS
0 failed
0 skipped
```

## Isolation verification

Repository search found no P1 runtime import/use outside the P1 focused test surface. The P1 module itself contains no `chrome.*`, `importScripts(...)`, `require(...)`, or `module.exports` dependency.

No live storage mutation, extension reload, commit, push, merge, or deployment was performed during independent verification.

## Accepted P1 contract

P1 owns only:

- typed event identity and bounded event vocabulary;
- source-authority admission;
- provenance structure;
- append-only ledger structural validation;
- explicit supersession/conflict references;
- dedicated PSM ledger serialization;
- serialized single-process append semantics.

P1 does not own canonical current-state meaning. That begins at P2.

## Next boundary

P1: `DONE_ACCEPTED`

P2 only may become `ACTIVE`:

**Canonical state reducer / state graph**

P2 must deterministically reduce a validated P1 ledger into one typed current-state projection, fail closed on semantically malformed event payloads, preserve event provenance/watermarks, and must not implement active-working-set selection, capsules, compaction, Merkle ancestry, hydration, restart bootstrap, or live runtime wiring.
