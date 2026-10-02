# M3 response 02

## Result

M3 is `READY_FOR_VERIFY`. The ledger remains M0/M1/M2 `DONE`, M3 `VERIFY`,
and M4 `TODO`. Only isolated M3 implementation/tests and the M3 report were
changed; production runtime, browser state, storage, dependencies, and live
fleet were untouched.

## Ordering laws repaired

Message selection now reproduces production ordering exactly: select the
requested messages in their existing `state.messages` order, sort only by
`createdAt` ascending, and rely on stable JavaScript sort behavior for equal
timestamps. There is no ID tiebreak. Consequently equal-createdAt input
`[M-Z, M-A]` remains `[M-Z, M-A]`, and the assignment ID is
`A-M-M-Z-(generation+1)`, matching production.

Control notice IDs are treated as a requested set for validation, then
canonicalized to the target worker’s `controlInbox` order. Assignment records
and `resolveAssignmentPromptInputs()` use that same canonical order for task
piggyback, message piggyback, and control-only assignments. Duplicate requested
IDs, duplicate matching inbox identities, and missing notices reject.

## Identity diagnostics repaired

Before any M1 transition helper runs, M3 validates referenced identity:

- worker map key differing from a present `worker.id` ->
  `worker-identity-mismatch`;
- task map key differing from a present `task.id` ->
  `task-identity-mismatch`;
- duplicate state message identities for a requested message ID ->
  `duplicate-message-identity`;
- absent requested task/message or worker -> existing explicit M3 not-found
  diagnostics.

These checks prevent raw `RangeError`/transition exceptions for malformed
referenced entities. M1 invariant failures are wrapped as deterministic
`M3_RESERVATION_REJECTED` errors with an `invalid-v2-state:` reason. A targeted
contradiction test proves one canonical assignment cannot be reciprocally
owned by two workers; the map/pointer mismatch is rejected rather than counted
or reconstructed.

## Added tests

The focused M3 suite now explicitly covers:

- equal-createdAt state-order preservation, message IDs, and first-ID-derived
  assignment ID;
- reversed notice input canonicalized to inbox order for all assignment kinds
  and prompt-input resolution;
- worker/task map identity mismatch and duplicate requested message identity;
- one assignment pointed to by two workers;
- all prior reservation, rollback, prompt-input, collision, immutability,
  invariant, isolation, and M7-manifest cases.

## Validation

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m3.test.cjs` — **14/14 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m2.test.cjs` — **10/10 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m1.test.cjs` — **10/10 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs` — **6/6 pass**
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **165/165 pass**
- `rtk node --check model_fleet/extension/fleet-state-model-m3.cjs` — pass
- `rtk node --check model_fleet/extension/fleet-state-model-m2.cjs` — pass
- `rtk node --check model_fleet/extension/background.js` — pass
- `rtk node --check model_fleet/extension/fleet-worker.js` — pass
- `rtk git diff --check` — pass
- production M3 import/load scan — pass; no M3 reference in
  `background.js`, `fleet-worker.js`, `control-pane.js`, or `manifest.json`
- M3 browser-API scan — pass; no `chrome.` access in the M3 module

## Worktree and dependencies

HEAD is unchanged. Existing unrelated untracked plan/M0/M1/M2 artifacts remain
untouched. The M3 implementation/test files remain uncommitted and unstaged.
No dependency files changed, and no browser/CDP/live fleet interaction
occurred. `git diff --check` passes.

## Next action

M3 is ready for independent verification only. Do not mark M3 `DONE` or start
M4 until this repair is independently accepted.
