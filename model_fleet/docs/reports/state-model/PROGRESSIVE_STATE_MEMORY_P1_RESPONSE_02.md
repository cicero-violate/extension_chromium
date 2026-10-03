# Progressive State Memory P1 Repair — Typed Event Model and Durable Event Ledger

Status: READY_FOR_VERIFY
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
P0: DONE_ACCEPTED
P1: READY_FOR_VERIFY
P2-P13: PENDING

## Repair boundary

This response repairs only the four falsifiers recorded by independent P1
verification. The P1 module remains isolated and browser-compatible; it is not
imported by `background.js`, does not wire a reducer, and does not perform live
storage or runtime work. P2 remains unstarted.

Changed for this repair:

* `extension/progressive-state-memory-m7-p1.js`
* `extension/tests/progressive-state-memory-p1.test.cjs`
* `docs/architecture/PROGRESSIVE_STATE_MEMORY_DAG.md`
* this repair report and the P1 durable workflow metadata

The prior accepted dirty worktree was preserved. No extension reload, live
storage mutation, commit, push, merge, or deploy was performed.

## Repaired contracts

### Event-kind/source authority

P1 now applies an explicit event-kind policy before admission. In particular,
`operator.decision` accepts only an `operator` source. Report and verification
sources may provide evidence for their permitted event kinds, including
`evidence.linked`, but cannot self-author operator decisions. Unknown source
objects and non-plain source/provenance records fail closed.

### Dedicated PSM persistence key

`loadLedger`, `saveLedger`, and `appendEvent` accept only their documented
arguments and reject extra key-override arguments with
`storage-key-override-forbidden`. All durable access is fixed to
`modelFleetPsmLedger:v1`; `modelFleetState:v2` and other fleet keys cannot be
selected through this API.

### Serial append semantics

The exported durable append boundary owns a serialized writer queue for the
supported single-process writer model. An append that omits `sequence` receives
the next sequence while holding that queue, then performs load → admission →
save. Pure `admitEvent` remains explicit-sequence and immutable. A concurrent
two-writer adversarial test acknowledges both appends and verifies events
`evt-a`/`evt-b` persist with sequences 1/2; no acknowledged append is lost.

### Recursive plain-payload validation

Payload roots and nested records must be plain objects. Recursive validation
rejects Date, Map, custom-class instances, accessors, cycles, `undefined`,
non-finite numbers, and other lossy/non-JSON values before cloning or saving.
Arrays and nested plain objects are checked without silently transforming them.

## Preserved authority boundaries

P1 still owns only typed event admission and its dedicated append-only ledger
contract. Fleet state reduction remains P2. Existing C1/C3-C8/C18/C19 state,
custody, scheduler, recovery, and persistence authorities are unchanged. No
UI, report prose, heartbeat buffer, or later capsule/reducer path became an
alternate state authority.

## Validation evidence

```text
node --test extension/tests/progressive-state-memory-p1.test.cjs
14/14 PASS, 0 failed, 0 skipped

node --test extension/tests/*.test.cjs
293/293 PASS, 0 failed, 0 skipped

node --check extension/progressive-state-memory-m7-p1.js
PASS

PSM durable JSON parse and P0/P1/P2 status assertions
PASS

git diff --check
PASS
```

Focused coverage includes source-authority rejection, dedicated-key rejection,
concurrent acknowledged appends, Date/Map/custom/cyclic/lossy payload
rejection, deterministic serialization, supersession/conflict validation, and
the prior P1 admission/storage cases. The former first-response count
inconsistency was corrected: its candidate count is explicitly 290/290; this
repair candidate is 293/293.

## Durable stopping state

`progressive-state-memory-dag.json` now records top-level `READY_FOR_VERIFY`,
P0 `DONE_ACCEPTED`, P1 `READY_FOR_VERIFY`, and P2-P13 `PENDING`. The P1 repair
falsifiers are recorded as resolved for this candidate, but independent
acceptance remains required. P2 was not started.

P1 stops at **READY_FOR_VERIFY**.
