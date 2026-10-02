# M4 response 02

## Result

M4 is `READY_FOR_VERIFY` (the ledger remains `M4 = VERIFY`; this turn does not mark it DONE). M0-M3 remain DONE. M5A and M5B remain TODO.

## Scope and state

- Assigned scope: repair M4 custody consumers only.
- Production behavior was not wired or changed. No browser/CDP, live fleet, storage, commit, push, or dependency operation was performed.
- Before: branch `main`, HEAD `02183c4668c214e2a130747ab9b9820b6272cd43`; worktree contained the prior untracked M0-M4 artifacts and editor backup.
- After: same branch and HEAD. The M4 module/test and the M4 plan section were updated; all prior unrelated untracked artifacts were preserved.
- Final worktree: untracked `model_fleet/extension/.#STATE_MODEL_CLEANUP_TODO.md`, `STATE_MODEL_CLEANUP_TODO.md`, `fleet-state-model-m1.cjs`, `fleet-state-model-m2.cjs`, `fleet-state-model-m3.cjs`, `fleet-state-model-m4.cjs`, and the M0-M4 focused test files. No tracked files were modified. No dependency files changed.

## Repaired contracts

### Control recovery boundedness

`applyAutomaticRecovery()` now accounts for `autoRecoveryAttempts` on the exact assignment's retained control notices, including notices piggybacked on task/message assignments. The first recovery retains notices and records attempt 1; a subsequent reservation observes that metadata and returns `exhausted-blocked` with attempt 2 rather than requeueing indefinitely. No worker status/fault field is written.

### Release policy

| Path | task.startedAt | task.attempts |
| --- | --- | --- |
| transport failure (`releaseDispatchFailure`) | preserve | preserve |
| active-page preflight deferral | reset to 0 | decrement exactly once, floor 0 |
| heartbeat loss | reset to 0 | preserve |
| unrecoverable bridge | reset to 0 | preserve |
| operator cancel / terminal block | reset to 0 | preserve |
| automatic recovery | reset to 0 | preserve |
| stop/flush | reset to 0 | preserve |

Messages are requeued or terminally transitioned by their assignment kind; control notices remain in the inbox on release/recovery/cancellation and are consumed only by successful completion acknowledgment.

### Timestamp monotonicity

Dispatch acceptance requires a previously recorded positive dispatch attempt. Acceptance is not earlier than reservation/attempt; matching heartbeat confirmation is not earlier than reservation/attempt/acceptance; completion is not earlier than acceptance or nonzero start; acknowledgment is not earlier than response terminal time. Repeated completion at the same terminal timestamp is idempotent; a conflicting timestamp is rejected without rewriting custody.

### Heartbeat decision matrix

| Assignment phase | Identity observation | Result |
| --- | --- | --- |
| reserved | any non-null | mismatch; no ownership invention |
| activating | omitted | preserve unresolved activation |
| activating | explicit null + busy=false | preserve queued-ack activation |
| activating | explicit null + busy=true | mismatch intent; unchanged |
| activating | matching + busy=true | confirm custody -> running, monotonic start |
| running | omitted | preserve |
| running | matching non-null | preserve |
| running | explicit null + busy=false | release/requeue with reset policy |
| running | explicit null + busy=true | mismatch intent; unchanged |
| running | different non-null | mismatch; unchanged |
| completing | omitted/null/matching | preserve completion custody |

Heartbeat observations never create or overwrite assignment ownership.

### Recovery evidence API

Added pure `reconcileRecoveryCustody(state, evidence)` using only the canonical assignment map and reciprocal worker pointer. It supports unresolved activation preservation, exact reattachment with optional prompt proof, exact pending-completion reattachment, mismatch diagnostics, and explicit unrecoverable release. An unrecoverable release is exact-once; a later no-owner observation returns terminal `no-owner`, while a reported identity with no durable owner is a terminal ownership mismatch. No legacy worker custody reconstruction or duplicate send is possible.

### Completion validation and flush

Control acknowledgment accepts only `done` or `blocked`. Message disposition maps must contain exactly the assignment message IDs and each value must be `done` or `blocked`; missing/extra/invalid keys fail deterministically and inputs remain unchanged. `flushActiveAssignments()` uses an atomic fail-closed law: if any assignment is completing, it throws `flush-completing-custody-protected` before releasing any other assignment.

## M7 replacement manifest

The composed `M7_REPLACEMENT_MANIFEST` retains the M3 reservation/prompt boundaries and covers the M4 production boundaries: `dispatchReserved`, `deferReservedDispatchForActivePage`, `failDispatch`, heartbeat flush/update, `reconcileOnHello`, `completeAssignment`, bridge recovery/unrecoverable release, assignment-cancelled recovery, `cancelWorkerDispatch`, `stopAndFlushStaleWork`, and fleet-worker completion/recovery/heartbeat/cancel paths. Each entry records source region, legacy authority, prepared operation, and the later M7 cutover action. No entry is wired before M7.

## Validation

Commands and results:

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m4.test.cjs` — **19/19 pass**.
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m{0,1,2,3,4}.test.cjs` — **59/59 pass**.
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **184/184 pass**.
- `rtk node --check model_fleet/extension/fleet-state-model-m4.cjs` — pass.
- `rtk node --check model_fleet/extension/background.js` — pass.
- `rtk node --check model_fleet/extension/fleet-worker.js` — pass.
- `rtk git diff --check` — pass.
- Production import/load scan over `background.js`, `fleet-worker.js`, `control-pane.js`, and `manifest.json` for M4 module references — no matches.
- M4 Chrome API scan (`chrome.` in `fleet-state-model-m4.cjs`) — no matches.

The full fleet run includes the M0-M4 tests and all existing fleet/recovery coverage; no production source or dependency file was changed.

## Remaining risks / next action

M4 remains isolated and non-deployable. Independent verification must review the exact release-policy and recovery-evidence semantics before promoting M4 to DONE. The next DAG action after acceptance is M5A or M5B, not a live cutover; M7 remains the only production authority cutover.
