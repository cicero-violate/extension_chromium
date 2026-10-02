# M7 C2 Response 01

## Result

C2 is READY_FOR_VERIFY. M7 remains ACTIVE. C1 is treated as DONE. No C3+ work was started.

Candidate worktree: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`  
Candidate HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`  
Authoritative checkout: `/workspace/ai_sandbox/extension_chromium`  
No browser, CDP, live fleet, or `chrome.storage` interaction occurred.

## Files changed for C2

- `extension/fleet-state-model-m7-c2.js`
  - browser-compatible C2 reservation/lookup module;
  - no CommonJS, Chrome API, hidden time source, or dependency.
- `extension/tests/fleet-state-model-m7-c2.test.cjs`
  - focused C2 parity, isolation, immutability, and reservation tests.
- `extension/background.js`
  - candidate-only `importScripts()` loading of C1/C2;
  - v2-only `chooseDispatches` overlay;
  - the pre-existing v1 scheduler remains explicitly named as the C3+ branch.

The copied C1 and M0–M6 artifacts were preserved. No authoritative main production file changed.

## Canonical assignment lookup law

C2 reads custody only from `state.assignments[worker.currentAssignmentId]`. It validates the reciprocal worker pointer and assignment worker identity, then returns a detached assignment record. Assignment task/message/control references are resolved from the assignment record and canonical maps/inboxes; C2 never reconstructs custody from distributed worker current-task/current-message/current-control fields or task/message assignment fields.

`activeAssignmentCount()` is `Object.keys(state.assignments).length` after C1 normalization. Pointer/map contradictions are rejected by the C1/M1 invariant boundary rather than silently counted.

Prompt inputs contain the canonical assignment, reciprocal worker, referenced task or ordered messages, ordered control notices, and detached top-level context. Message order is createdAt ascending with stable source-array tie order. Control notices are canonicalized to worker inbox order.

## Reservation and dispatch law

The public C2 operations are:

- `assignmentForWorkerV2(state, workerId)`
- `activeAssignmentCount(state)`
- `resolveAssignmentPromptInputs(state, assignmentId)`
- `reserveTaskAssignment(state, input)`
- `reserveMessageAssignment(state, input)`
- `reserveControlAssignment(state, input)`
- `schedulerWorkerEligibility(state, workerId, {now, heartbeatMaxAgeMs})`
- `workerAvailability(state, workerId, {now, heartbeatMaxAgeMs})`
- `taskRunnable(state, task, worker)`
- `chooseDispatchesV2(state, {now, heartbeatMaxAgeMs, promptBuilders})`

Every operation normalizes a v2 state through C1, clones before mutation, and finalizes through C1/M1 invariants. Reservation failures are deterministic `M7_C2_REJECTED` errors and leave the input unchanged.

Task reservation requires a pending, unowned task and an eligible reciprocal worker. It uses `A-<task.id>-<generation+1>`, changes pending to running through the accepted reservation semantics, sets owner/start/attempt metadata, creates one reserved assignment, and sets only `worker.currentAssignmentId`.

Message reservation requires a nonempty, unique, worker-directed queued batch. It preserves production stable createdAt ordering, including equal-createdAt source order, and uses `A-M-<firstMessage.id>-<generation+1>`. Each selected message becomes running with `deliveredAt=reservedAt`; one reserved assignment owns the canonical message ID batch.

Control reservation requires nonempty requested notices, validates the requested set against the worker inbox, canonicalizes IDs to inbox order, and uses `A-C-<worker.id>-<generation+1>`. It changes no task/message phase and consumes no notices.

All assignments use the M3 shape: `phase='reserved'`, explicit positive `reservedAt`, zero dispatch/accept/start/terminal timestamps, zero recovery attempt, and detached metadata. Collision, identity, ownership, phase, recipient, malformed batch, notice, timestamp, and invariant failures are fail-closed.

`chooseDispatchesV2()` reserves worker messages before tasks, tasks before control notices, enforces canonical assignment concurrency, preserves task priority/worker matching and message batching, and returns bridge-compatible dispatch projections containing `assignment.id`, kind-specific IDs, and prompt data. The payload is derived from the canonical assignment; it is not a second authority record.

## Availability and concurrency

Eligibility uses explicit time and the accepted M5B facts: enabled concrete tab binding, policy authority/not-paused, no fault, no current assignment, fresh-runtime busy exclusion, rotation pending/in-progress exclusion, and page cooldown. Availability remains `offline | blocked | running | busy | idle`; stale busy heartbeat becomes eligible idle under the supplied heartbeat age threshold. C2 does not use display status or legacy top-level worker status/busy/heartbeat fields.

## Parity evidence

- Task reservation result and assignment shape deep-equal accepted M3 semantics for equivalent v2 fixtures.
- Message single/batch reservation matches M3 IDs and ordering, including equal-createdAt ties.
- Control reservation matches M3 inbox ordering and custody shape.
- Runnable dependency and direct review-independence decisions match M5A.
- Availability and scheduler gates match M5B for faulted, offline, stale, unbound, busy, cooldown, rotation-pending, and stale-busy cases.
- Injected stale legacy authority is rejected and never consulted.

## C2-owned legacy scan

The C2 module has no reads or writes of the forbidden runtime authority names: worker status, top-level busy/heartbeatAt, distributed current assignment fields, task/message status, or task/message assignment fields. It has no Chrome API or hidden-time access. The candidate source scan also confirms the C2 v2 `chooseDispatches` branch uses only canonical phase/assignment/runtime facts.

The original lexical v1 `chooseDispatches(state)` and its surrounding scheduler/mutator callers remain in `background.js` as an explicitly untouched C3+ family. The bottom candidate overlay routes version-2 candidates to C2 and leaves non-v2 candidates on that legacy branch. This is intentional intermediate-candidate accounting, not a global zero-legacy claim.

Remaining C3+ legacy families include dispatch attempt/acceptance, dispatch failure/release, completion, heartbeat reconciliation, bridge/hello recovery, cancellation/flush, fleet-worker protocol internals, and public snapshot/control-pane wiring. C2 did not modify those authorities.

## Validation

- C2 focused: **9/9 pass**
- C1 focused: **18/18 pass**
- copied M0–M6 focused: **129/129 pass**
- all copied `fleet-*` tests: **281/281 pass**
- `node --check` C1, C2, and candidate `background.js`: pass
- `git diff --check`: pass
- C2 Chrome/hidden-time/legacy-authority scan: pass
- authoritative main tracked production diff check: clean (`exit 0`)

Candidate status is limited to the C2 slice. No commit or push was made, no dependency changed, and no live reload or storage migration occurred.

## Worktree/status

Candidate tracked modification is `extension/background.js`; C1/C2 modules and copied test/spec artifacts are untracked candidate artifacts preserved in the detached worktree. Candidate HEAD remains the requested exact base commit. The authoritative main checkout remains unchanged.

## Next bounded family

C3+: dispatch attempt/acceptance and subsequent failure/completion/heartbeat/recovery/cancellation/flush cutovers. No C3 work was started in this slice.

**M7 status: ACTIVE. C2 status: READY_FOR_VERIFY.**
