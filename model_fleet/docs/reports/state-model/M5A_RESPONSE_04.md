# M5A Response 04

## Result and scope

Assigned scope: repair M5A only after independent verification rejection. M5B and M6 were not started.

Result: **READY_FOR_VERIFY**. M5A remains `VERIFY`; it is not marked `DONE`.

Ledger:

- M0 = DONE
- M1 = DONE
- M2 = DONE
- M3 = DONE
- M4 = DONE
- M5A = VERIFY
- M5B = TODO
- M6 = TODO

## Worktree and dependency state

HEAD before and after: `02183c4668c214e2a130747ab9b9820b6272cd43`.

Branch: `main`.

No production source, dependency, browser, CDP, account, storage, or live fleet state was changed. No commit or push was performed. Existing isolated M0-M5A untracked artifacts and editor backup remain preserved.

Files changed for this repair:

- `extension/fleet-state-model-m5a.cjs`
- `extension/tests/fleet-state-model-m5a.test.cjs`

## Repaired authority laws

### Active-owned message requeue

`requeueMessageV2()` now rejects with `active-custody-owned-by-m4` whenever any canonical assignment references the message. It cannot produce a queued message while assignment custody remains active. The same guard remains on active-owned task/message completion, cancellation, blocking, and requeue helpers.

Public-surface tests confirm the path-specific M4 authority boundary and confirm that no generic `releaseAssignment` helper is exported.

### Canonical protocol-repair assignment/source/target/task link

`createProtocolRepairMessageV2()` now requires `failedAssignmentId` to resolve to a canonical assignment whose phase is `completing` and whose worker pointer reciprocally matches. The assignment, not the caller, supplies authority.

For a message assignment, canonical source selection is:

1. first assignment message with `requiresFleetMessage === true`;
2. otherwise first assignment message in M3-preserved order;
3. otherwise null.

For task and control assignments the source message is null. A supplied `sourceMessageId` is assertion-only and must equal the derived source. The repair target is the assignment worker; a supplied `toWorkerId` is assertion-only and must match it.

Task-link derivation is:

- task assignment: the assignment task ID;
- message assignment: first assignment message with a valid task ID;
- control assignment: first assigned control notice in worker inbox order with a valid task ID;
- otherwise null.

A supplied `taskId` is assertion-only and must match the derived value. Fake assignments, queued/unassigned sources, wrong targets, mismatched sources, and dangling task links fail deterministically.

Attempt accounting remains source-faithful: a null source starts at zero and can create the first repair; a canonical repair message with attempt one returns exhausted and creates no second repair.

### Canonical completion repair source

`prepareCompletionDispositionV2()` uses the same derived source-message rule. For message batches:

- all messages default to `done`;
- only `repairExhausted` on the canonical source becomes `blocked`;
- `protocolRepairMessageId` is written only on the canonical source;
- a caller-selected different batch member is rejected;
- no-repair batches use the first message as canonical source.

Task and control completion preparation continue to return no message disposition.

### Stored worker-role authority

Task completion now requires the stored assignment worker role itself to be exactly `coordinator`, `implementation`, or `review`. The stored role is written to `completedByRole`. An optional caller role is assertion-only and must be canonical and equal to the stored role. Missing, noncanonical, or mismatched role data fails closed.

### Invariant finalization

A bounded `finalizeState()` helper now validates successful mutated v2 states with `assertFleetInvariants()`. It is applied to creation, transition, pruning, cancellation, and other public state-returning mutation paths. Completion preparation also validates its metadata-only state. This prevents successful M5A APIs from returning latent active-custody contradictions.

## Tests and scans

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m5a.test.cjs` — **10/10 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m4.test.cjs` — **24/24 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m3.test.cjs` — **14/14 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m2.test.cjs` — **10/10 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m1.test.cjs` — **10/10 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs` — **6/6 pass**
- combined `rtk node --test ... fleet-*.test.cjs` — **199/199 pass**
- `rtk node --check model_fleet/extension/fleet-state-model-m5a.cjs` — pass
- `rtk node --check model_fleet/extension/background.js` — pass
- `rtk node --check model_fleet/extension/fleet-worker.js` — pass
- `rtk git diff --check` — pass
- production M5A import/load scan — pass
- M5A Chrome API scan — pass
- no-second-active-transition/export scan — pass
- strengthened status-manifest coverage scan — pass

The new focused cases cover active message requeue rejection, fake/queued repair sources, completing message assignment lineage, preferred fleet-message source selection, first-message fallback, task/control first repair creation, exhausted repair-message retry, source/target/task assertions, and canonical caller source rejection.

## Blockers and next action

No bounded-scope blocker remains. M5A requires independent verification before promotion to `DONE`. M5B remains the owner of worker runtime/fault/availability conversion, and M7 remains the only production authority cutover.

Recommended next action: independently review this report and the two M5A artifacts; if accepted, promote M5A to `DONE` and authorize M5B separately.

Dependency-file status: unchanged; no dependency files were modified.

