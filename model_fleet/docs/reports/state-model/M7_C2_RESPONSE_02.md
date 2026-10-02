# M7 C2 Response 02

## Result

C2 is `READY_FOR_VERIFY`; M7 remains `ACTIVE`. C3 was not started.

Candidate path: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`  
Candidate HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`

The authoritative checkout was not modified. No browser, CDP, live fleet, or
`chrome.storage` access occurred. No dependency, commit, or push was performed.

## Files changed

- `extension/fleet-state-model-m7-c2.js`
- `extension/tests/fleet-state-model-m7-c2.test.cjs`
- candidate `extension/background.js` C2 overlay only

The copied C1 and M0-M6 artifacts were preserved. The C2 candidate remains
inert and is not claimed to be an end-to-end production cutover.

## Canonical assignment and persistence law

The C2 semantic module remains immutable. Its `chooseDispatchesV2()` result
contains the complete canonical candidate state. The candidate background
wrapper adopts that complete root state into the existing mutator-owned object
before returning dispatches; it does not shallow-merge authority fields.
Therefore the saved state contains the exact assignment, reciprocal
`worker.currentAssignmentId`, and task/message phase referenced by each
dispatch.

Reservation primitives remain M3 custody primitives. They create canonical
assignment records and preserve M1/C1 invariants, but do not decide scheduler
eligibility. Eligibility is enforced by the C2 scheduler orchestration.

Message admission checks capacity with `break`, but an already-reserved seed
uses `continue`, allowing later workers to receive eligible messages in the
same pass. Equal-createdAt messages retain source-array order. Control notice
IDs are validated against the worker inbox, reject duplicate inbox identity,
and are canonicalized to inbox order.

## Public decision and time laws

Exported `workerAvailability`, `schedulerWorkerEligibility`, and `taskRunnable`
are validated wrappers over private normalized helpers. They reject malformed
v2/legacy-authority input before returning a decision and preserve input
immutability.

`now` and `heartbeatMaxAgeMs` are finite nonnegative inputs and are validated
before missing-worker or paused-policy early results. `workerAvailability`
matches M5B availability, including the valid `tabAvailable: true` projection
without requiring an integer tab. Scheduler eligibility adds the M7 dispatch
gate requiring an integer concrete `tabId`, returning `tab-unbound` when that
additional gate fails. This is an intentional scheduler strengthening, not a
claim that M5B availability itself requires a concrete tab.

## Prompt and peer-summary law

Task, message, and control prompt builders consume the selected canonical
assignment inputs. Control feedback is rendered only from the assignment's
selected notices, so attached notices appear in canonical order and unselected
inbox notices do not leak into the prompt.

The v2 peer summary derives a display label from canonical availability,
runtime, fault, lifecycle, custody, binding, and the explicit scheduling time.
It does not read or recreate `worker.status`. Legacy prompt behavior remains
outside the v2 C2 path for later C3+ conversion.

## Journal law

Journal entries are added only by the orchestration wrapper, after canonical
state adoption; low-level M3-equivalent reservation helpers do not journal.
The wrapper emits source-shaped entries for message reservation or batching,
task reservation, and control reservation with assignment/item identifiers and
counts. IDs use the existing generation/journal-length/time convention, the
explicit orchestration timestamp, and the existing bounded journal policy.

## Version-2 schedule preflight

For `state.version === 2`, the candidate schedule wrapper bypasses the legacy
status/busy/heartbeat/task-status/message-status preflight and lets one C2
admission plan be authoritative. The v1 branch continues through the legacy
schedule path until C3+ conversion. No compatibility mirror or feature flag
was added. The remaining legacy reads are therefore classified as untouched
C3+ candidate ranges, not as C2 authority.

## Validation

- C2 focused: **12/12 pass**
- copied M0-M6 focused: **129/129 pass**
- copied all `fleet-*` tests: **284/284 pass**
- `node --check` C2, C1, and candidate `background.js`: pass
- `git diff --check`: pass
- C2 Chrome/hidden-time/legacy-authority scan: pass
- candidate background v2 adoption, preflight, prompt-control, peer-summary,
  and journal wiring checks: pass
- authoritative main tracked production files unchanged: pass

## Candidate source accounting

### A — removed from C2-owned paths

Canonical assignment lookup, prompt-input resolution, reservation decisions,
message/task/control reservation writes, C2 scheduler availability, capacity,
and v2 schedule admission no longer use distributed legacy custody/status
fields.

### B — remaining in untouched C3+ ranges

Dispatch attempt/acceptance and failure, completion, heartbeat/recovery,
cancellation/flush, bridge protocol internals, and remaining legacy scheduler
helpers remain in the inert candidate for later bounded slices. They are not
claimed as converted by C2.

### C — migration-only C1

The copied C1 persistence/migration reader and its v1 fixtures retain legacy
field names only for one-time migration input and gate evidence.

## Worktree and status

Candidate status contains the intended candidate `background.js` edit and the
copied C1/C2/M0-M6 artifacts/tests; no unrelated candidate files were removed.
The authoritative checkout's tracked production files remain unchanged.

`C2 READY_FOR_VERIFY`  
`M7 ACTIVE`  
`M8/M9 TODO`

Blocker: none.
