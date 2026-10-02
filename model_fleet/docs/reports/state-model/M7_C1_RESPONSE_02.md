# M7 C1 response 02 — persistence/migration repair

Result: READY_FOR_VERIFY (C1 only)

M7 remains ACTIVE. C2 was not started.

## Candidate identity and protection

- Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`
- HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
- Candidate tracked production edit: `extension/background.js` only, adding the
  inert bottom `importScripts('fleet-state-model-m7-c1.js')` load.
- New candidate helper: `extension/fleet-state-model-m7-c1.js`.
- New focused test: `extension/tests/fleet-state-model-m7-c1.test.cjs`.
- Existing copied M0–M6 artifacts were preserved.
- No browser/CDP/chrome.storage access, reload, commit, push, or dependency
  change occurred.

The authoritative main checkout was checked after the repair:
`git -C /workspace/ai_sandbox/extension_chromium diff --quiet` for tracked
`background.js`, `fleet-worker.js`, `control-pane.js`, and `manifest.json`
returned exit 0.

## Real-v1 worker runtime conversion law

C1 now composes the production-shaped path:

```text
raw v1
  -> validate raw shape and explicit migration evidence
  -> source-faithful v1 pre-normalization
  -> M0 quiescence gate
  -> M2 task/message/custody mapping
  -> M5B worker runtime/fault conversion
  -> C1 v2 shape + M1 invariant validation
```

`normalizeV1ForMigration(raw, migrationObservedAt)` is pure and input-immutable.
It performs the current production preservation semantics needed before the gate:

- legacy worker IDs become deterministic `W-S####` IDs;
- task owner/completer and message sender/recipient worker references are
  rewritten to the durable IDs;
- legacy role aliases are canonicalized (`research`/`architect` to
  `coordinator`, verifier/test/integrator aliases to `review`);
- policy defaults, including `warmIdleMs`, are filled and bounded;
- topology role counts and turn limits are filled with current defaults;
- messages and journal are bounded to current production limits;
- role activity is filtered using the explicit `migrationObservedAt` cutoff and
  bounded to the current production maximum.

The raw shape is validated before normalization, so malformed collection shapes
and contradictory raw custody markers cannot be erased by normalization before
the M0 gate sees them.

`convertLegacyWorkerRuntime()` preserves v1 worker semantics as:

```text
runtime: { lastHeartbeatAt: heartbeatAt, busy, reportedAssignmentId: null }
fault: null | typed legacy-blocked/chat-rotation-failed fault
currentAssignmentId: null for quiescent migration
```

It removes top-level `status`, `busy`, `heartbeatAt`, and `faultAt`. It validates
the accepted legacy status vocabulary, stale/offline lifecycle agreement,
active-status custody evidence, strict runtime types, and the M5B timestamp law:

- non-rotation blocked workers may use valid `faultAt` or
  `lastDispatchFailureAt`;
- rotation-failed never uses `lastDispatchFailureAt`;
- a missing source failure timestamp requires explicit `conversionAt`/
  `migrationObservedAt` evidence;
- no timestamp constant or inferred failure time is invented;
- `rotation-failed` with `chatRotationPending=true` remains rejected by the
  quiescence gate.

## Exact M1 invariant parity law

`assertFleetInvariantsV2()` is now part of C1 v2 normalization. It enforces the
accepted M1 rules for:

- assignment key/id, worker existence, reciprocal worker pointer, canonical
  assignment kind and phase;
- task/message/control assignment shape and referenced work/notice identity;
- unique task/message assignment ownership;
- worker pointer-to-assignment validity;
- running task/message custody;
- inactive task/message phases having no active assignment;
- operator-delivered message custody exclusion;
- runtime and typed fault shape.

The focused parity matrix covers missing reciprocal worker pointers, missing
assignments, wrong assignment worker, running task without an assignment,
running message without an assignment, duplicate semantic ownership, and valid
reciprocal custody. Every invalid candidate is rejected both by C1 and by the
copied M2 normalizer/M1 invariant engine; the valid reciprocal candidate is
accepted by both.

## Fresh v2 defaults

`freshFleetStateV2({ createdAt })` now emits the current source defaults plus v2
authority:

- `version: 2`;
- `assignments: {}`;
- policy `warmIdleMs: 60000`;
- desired role counts: coordinator/implementation/review = `1/1/1`;
- max turns per role = `10/10/10`;
- existing generation, goal, policy, topology, journal, role activity, counters,
  and explicit timestamps.

The focused source-parity fixture verifies these defaults while treating only
the v2 authority fields and explicit timestamps as intentional differences.

## V2-first load law

`loadFleetStateV2()` now performs separate reads:

1. read only `modelFleetState:v2`;
2. if present, normalize/assert and return with zero writes and zero v1 reads;
3. only when v2 is absent, read `modelFleetState:v1` and require explicit
   `liveHeartbeats`, `pendingCompletionHandoff`, `migrationObservedAt`, and
   conversion evidence as needed;
4. migrate and issue exactly one v2 write;
5. fresh install writes only v2.

Focused mock-storage assertions prove the v2 path never requests the v1 key.
Blocked migration and validation failures happen before `storage.set`, so they
perform zero writes and leave inputs unchanged.

## Parity evidence

- C1 migration output for a normalized v1 worker was compared structurally to
  copied `M2.migrateFleetStateV1ToV2()` followed by copied
  `M5B.convertV2WorkerRuntime(..., { conversionAt })`.
- C1 final candidates are accepted by copied M2 normalization and M5B-shaped
  runtime/fault consumers.
- The invalid-v2 matrix compares C1 and copied M1/M2 acceptance/rejection.
- Source-faithful worker fixtures cover idle, waiting/busy, stale, offline,
  manual, blocked with source timestamp, blocked requiring explicit migration
  evidence, and rotation-failed/pending rejection.

## Tests and validation

- C1 focused: **14/14 pass**
- copied M0–M6 focused: **129/129 pass**
- copied full `fleet-*`: **268/268 pass**
- `node --check extension/background.js`: pass
- `node --check extension/fleet-worker.js`: pass
- `node --check extension/fleet-state-model-m7-c1.js`: pass
- `git diff --check`: pass
- main tracked production unchanged proof: pass

## Candidate status and next bounded family

C1 status: **READY_FOR_VERIFY**.

Next bounded family remains C2, which must switch the real production
load/save/mutate boundary and then convert the scheduler/mutator consumers. C1
does not claim that runtime cutover, zero legacy runtime references, or M7
VERIFY.

M7 remains **ACTIVE**; M8 and M9 remain `TODO`.

