# M5A response 01

## Result and scope

M5A is `READY_FOR_VERIFY`; the ledger now records M0-M4 DONE, M5A VERIFY, M5B TODO, and M6 TODO. M5A remains isolated and NON-DEPLOYABLE. No production source, storage, browser/CDP/live fleet, dependency, commit, or push operation was performed.

Before and after:

- branch: `main`
- HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43` before and after
- prior untracked M0-M4 artifacts and editor backup preserved
- added only `model_fleet/extension/fleet-state-model-m5a.cjs` and `model_fleet/extension/tests/fleet-state-model-m5a.test.cjs`; updated the M5A ledger status and M5A scope wording only as needed
- final worktree contains those M5A artifacts plus the prior untracked M0-M4 artifacts; no dependency files changed

## Public APIs

The isolated module composes M1 `transitionTask()`/`transitionMessage()` and does not define a second transition table:

- creation: `createTaskV2`, `queueMessageV2`;
- workflow: `taskBlockDecisionV2`, `taskBlockReasonV2`, `taskRunnableV2`;
- task lifecycle: `completeTaskV2`, `requeueTaskV2`, `cancelTaskV2`, `blockTaskV2`, `retryTaskV2`, `clearCompletedEligibleV2`;
- message lifecycle: `requeueMessageV2`, `completeMessageV2`, `cancelMessageV2`, `clearCompletedMessagesV2`;
- M4 composition: `prepareCompletionDispositionV2`;
- protocol repair: `createProtocolRepairMessageV2`;
- goal lifecycle: `goalFrontierKeyV2`, `quiescenceDecisionV2`, `goalContinuationDecisionV2`;
- work-item intents: `unregisterWorkItemIntentsV2`, `cancelQueuedWorkerMessagesV2`;
- manifest: `M7_STATUS_READER_WRITER_MANIFEST`.

M5A does not export assignment mutation, worker custody, control-notice consumption, or production scheduler authority.

## Source-equivalence semantics

| Surface | Prepared v2 behavior |
| --- | --- |
| Task creation | explicit `createdAt`; `pending`, null owner, zero attempts/start/completion, empty result/note/recovery metadata; dependencies deduplicated and limited to existing IDs; explicit nonempty prompt required |
| Worker message creation | explicit `createdAt`; worker-directed `queued`/`deliveredAt=0`; operator-directed `delivered` with explicit positive `deliveredAt`; no `status` or `assignmentId` |
| Dependency workflow | only pending is runnable; every dependency must be done; missing/nonterminal dependencies are returned in source order; review independence checks only direct dependency completers |
| Task completion | M1 transition to done/blocked plus explicit completion/result/worker/role/note metadata |
| Task requeue/cancel/block | M1 transition only; path caller supplies start reset and terminal metadata; no assignment deletion or worker-pointer mutation |
| Operator retry | running or assignment-owned tasks reject; pending/done/blocked/cancelled use M1 requeue; owner/result/note/recovery fields reset |
| Message completion/requeue/cancel | M1 transition only, with explicit response/completion/deferred/repair metadata |
| Pruning | only done tasks/messages are eligible; delivered, blocked, and cancelled remain |
| Operator delivery | terminal `delivered`, never worker-assignable |

No implicit current time is used. Explicit times and IDs are validated.

## M4 completion disposition contract

`prepareCompletionDispositionV2` requires the exact assignment and worker. It returns task `done|blocked` or an exact per-message disposition map. When repair is exhausted, only the source repair message is blocked and other batch messages are done. It updates semantic work-item metadata but never deletes assignments, clears worker custody, or consumes control notices; M4 remains the sole acknowledgment/removal authority. Assignment/work mismatch and invalid parsed dispositions fail closed.

## Protocol repair, goal, and unregister equivalence

`createProtocolRepairMessageV2` creates a normal queued worker message with `requiresFleetMessage`, `protocolRepairOf`, and explicit bounded attempt metadata. Goal frontier keys use task phase/completedAt/attempts/recovery reason and message phase/routing/completion/recovery fields, excluding `goalContinuation` messages exactly. Quiescence is false for active assignments or queued/running worker-directed messages; terminal and operator-delivered messages do not count. Unchanged frontier suppresses continuation decisions. Unregister returns exact assignment work-item intents, while queued non-active worker messages are cancelled with explicit completion time and `stale queued worker message`.

## M7 status reader/writer manifest

`M7_STATUS_READER_WRITER_MANIFEST` contains 16 exact source boundaries, including public snapshot/workflow projection, queue creation, deferral/recovery/unregister, task workflow predicates, creation writers, goal frontier/quiescence, message selection/scheduler reads, protocol repair, reservation/start writes, completion, reconciliation/release, stop/flush queued cancellation, operator retry, and clear-completed pruning. Each entry records source region, legacy status authority, prepared replacement, and the atomic M7 action. Worker status/lifecycle sites are excluded for M5B.

## Fail-closed and isolation rules

M2 v2 normalization and M1 invariants run at every public operation entry. The module rejects legacy status/assignment authority, unknown phases, malformed IDs/targets, invalid explicit times, invalid repair counters, collisions, active-owned operator retries, and mismatched assignment/work references. Failure paths preserve input state. Creation is the only place with an initial `phase` field; all subsequent phase changes go through M1 transition helpers.

Production import/load scan found no M5A references in `background.js`, `fleet-worker.js`, `control-pane.js`, or `manifest.json`. The M5A module contains no Chrome API access.

## Validation

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m5a.test.cjs` — **9/9 pass**.
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **198/198 pass**.
- `rtk node --check model_fleet/extension/fleet-state-model-m5a.cjs` — pass.
- `rtk node --check model_fleet/extension/background.js` — pass.
- `rtk node --check model_fleet/extension/fleet-worker.js` — pass.
- `rtk git diff --check` — pass.
- M5A production import/load scan — pass, no matches.
- M5A Chrome API scan — pass, no `chrome.` references.
- M5A second-transition/direct-phase scan — pass; no transition table or direct phase assignment outside creation.

The full fleet run includes the accepted M0-M4 coverage and all existing fleet/recovery tests. No dependency files changed.

## Remaining risk / next action

Independent verification must review M5A before promoting it to DONE. M5B and M6 remain TODO; no downstream node was started.
