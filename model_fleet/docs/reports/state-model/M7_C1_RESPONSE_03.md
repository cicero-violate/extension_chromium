# M7 C1 Response 03

## Result

`C1 READY_FOR_VERIFY`; M7 remains `ACTIVE`. C2 was not started.

Candidate path:

`/workspace/.tmp/auto-approval-m7-cutover/auto_approval`

Candidate HEAD:

`02183c4668c214e2a130747ab9b9820b6272cd43`

No browser/CDP interaction, live `chrome.storage` access, dependency change, commit, or push occurred.

## Complete M1 invariant parity

The browser-compatible C1 normalizer now mirrors the accepted M1 custody checks, including:

- running assignment heartbeat custody: a non-null `worker.runtime.reportedAssignmentId` must equal the running assignment ID;
- duplicate task representation rejection when `assignment.taskIds` accompanies `assignment.taskId`;
- control notice lookup through `controlInbox` or the M1-compatible `controlNotices` collection;
- reciprocal assignment/worker pointers, assignment identity/kind/phase, task/message/control references, duplicate ownership, running/inactive phase ownership, message recipient ownership, and operator-delivery custody.

The added parity matrix covers heartbeat mismatch, duplicate task fields, missing/wrong workers, pointer reciprocity, missing assignment, and running/inactive task ownership. C1 and copied M2/M1 agree on rejection for each case.

## Complete M5B worker-conversion parity

C1 worker conversion now matches the accepted M5B conversion boundary:

- status vocabulary is fail-closed;
- pre-existing non-null fault plus legacy status rejects as `ambiguous-worker-fault-authority`;
- arbitrary fault codes, invalid fault timestamps, and invalid assignment IDs reject;
- pre-existing runtime alongside legacy heartbeat/busy rejects as ambiguous runtime authority;
- blocked fault synthesis uses source `faultAt` or non-rotation `lastDispatchFailureAt`, otherwise explicit conversion/migration observation time;
- rotation-failed never uses unrelated `lastDispatchFailureAt`;
- converted workers retain runtime `{lastHeartbeatAt,busy,reportedAssignmentId:null}`, typed fault/null, and no top-level legacy runtime/status authority.

The C1 tests compare canonical idle conversion against M2 migration followed by M5B conversion and add invalid status, heartbeat, busy, fault, runtime-ambiguity, and blocked-worker cases.

## Raw-v1 pre-normalization

The migration-input normalization now preserves current production semantics before the quiescence gate:

- non-durable worker IDs become deterministic `W-S####` IDs and preserve `legacyWorkerId`;
- task and message worker references are rewritten to the durable ID;
- legacy role aliases canonicalize to the three-role catalog;
- missing policy/topology/default counters and timestamps are filled from source defaults using explicit `migrationObservedAt` for time defaults;
- legacy `policy.maxTurnsPerChat` is the fallback for missing per-role turn limits, with the source clamp/truncation law;
- worker history/diagnostic fields are normalized and preserved: `lastCountedAssignmentId`, `lastResponseTerminalAt`, `lastAssignmentReleasedAt`, and completion-release lag fields;
- sleeping/parking lifecycle and sleep fields follow source normalization;
- bounded messages, journal, and retained role activity use explicit migration time and remain input-immutable.

Active custody markers are still inspected by the gate and are not repaired or erased into quiescence.

## Fresh v2 defaults

Minimal v1 migration and fresh v2 initialization now preserve source defaults for generation, goal continuation key, workspace path, counters, timestamps, policy including `warmIdleMs`, and topology role counts/turn limits, while adding only the intentional v2 authority fields (`version: 2`, `assignments: {}`).

## Storage and exactly-once behavior

The v2 key is read first. If present, C1 normalizes/asserts v2 and performs zero v1 reads and zero writes. Only an absent v2 key causes a v1-source read. A successful quiescent migration performs one v2 write; blocked or failed migration performs zero writes. Fresh install creates v2 with one v2 write. Explicit live-heartbeat and pending-completion evidence remain required at the migration API boundary.

## Parity matrix evidence

The focused C1 tests cover:

- idle, waiting/busy, stale, offline, manual, and blocked worker conversion;
- blocked source timestamp, explicit conversion timestamp, rotation-failed rejection, invalid status, invalid heartbeat/busy, status-plus-fault ambiguity, and runtime-plus-legacy-runtime ambiguity;
- durable ID/reference rewriting, role aliases, legacy max-turn fallback, historical worker fields, top-level defaults, and bounded history;
- M1/M2 invariant families for assignment identity, worker reciprocity, assignment kind/phase, task shape, missing entities, message worker mismatch, running heartbeat mismatch, inactive ownership, and operator-delivered custody.

Deliberate C1 strengthening beyond M2 shape validation is limited to the accepted M5B runtime/fault conversion and validation contract; it is not an alternate parser authority.

## Validation

- C1 focused: **17/17 pass**
- copied M0-M6 focused: **129/129 pass**
- copied candidate `fleet-*`: **271/271 pass**
- `node --check extension/fleet-state-model-m7-c1.js`: pass
- `node --check extension/background.js`: pass
- `git diff --check`: pass
- main tracked production protection: pass; exit `0` for unchanged `background.js`, `fleet-worker.js`, `control-pane.js`, and `manifest.json`

## Candidate status and protection

Candidate tracked edit is limited to the inert bottom-of-file C1 `importScripts('fleet-state-model-m7-c1.js')` hook in `extension/background.js`; the C1 helper and focused test are new candidate artifacts. Copied M0-M6 artifacts remain preserved. Existing v1 scheduler/mutator call sites remain untouched for C2+.

The authoritative main checkout has no tracked production-file changes. M7 remains `ACTIVE`; C1 is the only bounded slice completed and is ready for independent verification.

Next bounded family: C2 scheduler/mutator conversion, only after C1 acceptance.
