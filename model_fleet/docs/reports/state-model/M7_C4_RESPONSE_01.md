# M7 C4 response 01

## Candidate and scope

- Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`
- Base HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
- C1/C2/C3: DONE; C4: VERIFY; M7: ACTIVE.
- C4 scope is heartbeat observation/custody reconciliation and hello/bridge recovery only.
- C5+ work was not started: completion acknowledgement, result disposition, cancellation, recovery exhaustion, flush/stop, and public snapshot/control-pane remain out of scope.
- No browser/CDP access, live reload, or `chrome.storage` mutation occurred. No commit, push, or dependency change occurred.

## Files changed

- `extension/fleet-state-model-m7-c4.js` — browser-compatible C4 semantic boundary.
- `extension/tests/fleet-state-model-m7-c4.test.cjs` — C4 parity and isolation tests.
- `extension/background.js` — candidate-only C4 v2 heartbeat/hello/recovery overlay.
- C3’s browser boundary exports its accepted v2 normalizer/finalizer for C4 composition; no C3 custody law was changed.

## Heartbeat composite law

`processHeartbeat()` validates one observation, applies runtime observation, reconciles canonical custody, applies only evidence-backed M4 fault intent, and returns one final canonical state/result. It preserves input immutability and uses explicit positive `observedAt` values.

- stale observations are unchanged;
- exact same-time duplicates are idempotent, while explicit same-time conflicts reject;
- metadata presence follows M5B: omitted/empty title and URL preserve, only integer window IDs update;
- runtime authority is limited to `lastHeartbeatAt`, `busy`, and `reportedAssignmentId` plus observation metadata;
- reserved exact claims produce claim-before-acceptance contradiction and never become running;
- activating exact identity plus busy confirms running and sets `startedAt` to the observation time;
- activating explicit-null idle preserves activation; explicit-null busy is a mismatch;
- running omitted/exact identity preserves custody;
- running explicit-null idle releases/requeues only at or after the M4 watermark and requests scheduling;
- completing custody is protected;
- different identity faults without releasing or mutating replacement custody;
- no-owner non-null identity is a typed contradiction; no assignment is invented.

## M4/M5B fault and clear parity

Faults are created only from the exact typed heartbeat evidence returned by the observation path. Active mismatch and reserved claim evidence retain the canonical expected/reported IDs; no worker status is synthesized. A successful exact custody confirmation constructs the durable matching-heartbeat facts needed to clear clearable dispatch or heartbeat mismatch faults. No broad `fault=null` clearing path was added.

The C4 recovery path also preserves the M5B evidence boundary: recovery results are not treated as proof merely because they are caller-shaped, and completion custody remains protected.

## Hello and bridge recovery law

Hello identity is observation, not reattachment proof. The v2 hello branch binds by exact tab, records runtime/title/URL/window observations, and calls recovery custody with `reattached=false`, `promptProof=false`, and `pendingCompletionProof=false`. Therefore an activating assignment with only hello identity remains activating.

The bridge recovery branch resolves the assignment only from `state.assignments[worker.currentAssignmentId]`, obtains prompt inputs through the C2 canonical resolver, and sends a detached external recovery payload. It accepts reattachment only from explicit response evidence:

- exact reattach/prompt proof can promote activating to running;
- running reattach is preserved;
- recovering-completion proof preserves completing custody;
- reserved same-ID claims fail closed;
- mismatches cannot touch replacement custody;
- unrecoverable non-completing custody releases through the C4 equivalent, while completing custody is protected;
- recovery hints are cleared only for exact accepted outcomes, no-owner, or exact unrecoverable release.

Recovery journals use explicit observed time and the bridge payload is a projection, not a second authority.

## Batch/orchestration law

The v2 heartbeat branch batches `liveHeartbeats` through one durable `mutateFleet` callback. A worker’s stale/no-op result cannot corrupt another worker. Buffered observations are deleted only after the durable mutation promise resolves; failures retain the buffer for retry. Scheduling is requested only when the composite reports custody release/capacity opening. The v2 branch contains no legacy worker status, top-level busy/heartbeat, distributed current-work, or legacy release-helper reads/writes.

## Tests and validation

- C4 focused: **9/9 pass**
- C3+C2+C1 focused: **52/52 pass**
- M0-M6 focused: **129/129 pass**
- copied `fleet-*`: **315/315 pass**
- `node --check` C1/C2/C3/C4/background: pass
- `git diff --check`: pass
- C4 browser/hidden-time scan: pass
- C4 legacy-authority/release-helper scan: pass
- heartbeat-buffer deletion-after-commit scan: pass
- canonical recovery-payload and recovery-hint guard scans: pass
- authoritative main tracked production protection: pass

## Remaining bounded families

C5+ owns completion acknowledgement/result routing, completion lag/warm-idle/rotation after completion, operator cancellation, automatic recovery exhaustion, stop/flush/unregister custody paths, public snapshot/control-pane wiring, and final C1 persistence connection/global zero-legacy proof.

## Result

**C4 READY_FOR_VERIFY.** M7 remains ACTIVE. No blocker.
