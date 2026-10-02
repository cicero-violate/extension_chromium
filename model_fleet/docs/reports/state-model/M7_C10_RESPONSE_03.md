# M7 C10 Response 03

## Candidate and scope

- Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`
- HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
- Scope: C10 duplicate-tab identity repair only; C11 was not started.
- Authoritative checkout tracked diff: empty.
- No browser/CDP/live storage, commit, or push was used.

## Tab-binding uniqueness law

`upsertWorkerBindingV2` now scans every normalized worker with an integer `tabId` before identity selection. Any duplicate ownership of any bound tab rejects with the stable `registration-tab-binding-conflict` reason. C10 never deletes, rebinds, or arbitrarily selects one duplicate. The source object remains immutable, so a conflict produces no journal, allocation, or state mutation.

After selection and journal finalization, C10 defensively verifies that exactly one worker owns the registered tab and that it is the selected worker; otherwise it fails closed with the same conflict reason.

Unique bound tabs retain normal idempotent selection. Stale, explicit-tabless, topology, and new allocation paths cannot create a duplicate binding because the preflight rejects existing ambiguity and the final target-owner assertion guards the output.

## Zero-side-effect orchestration

The duplicate check occurs inside the pure mutation callback before `worker.registered` journaling. A thrown conflict prevents the `mutateFleet` storage commit and therefore prevents the post-commit badge, window, bridge, scheduling, and page-registration effects. The existing committed-policy window law, v1 isolation, topology/name parity, and expected-worker page guard remain intact.

## Tests and validation

- C10 focused: 10/10 pass.
- C1–C9 focused: 121/121 pass.
- M0–M6 focused: 129/129 pass.
- All `fleet-*`: 385/385 pass.
- All candidate tests: 438/438 pass.
- Node syntax checks for C10/C1–C9, background, and fleet-worker: pass.
- `git diff --check`: pass.
- C10 zero-legacy/hidden-time/browser scan: pass.
- Duplicate target-tab and duplicate-other-tab zero-mutation tests: pass.
- Main tracked-production protection: pass.

## Candidate files changed in this repair

- `extension/fleet-state-model-m7-c10.js`
- `extension/tests/fleet-state-model-m7-c10.test.cjs`

Earlier accepted C1–C9 and C10 Response-02 artifacts remain preserved.

## Status

C1–C9 remain DONE. C10 is `READY_FOR_VERIFY`. M7 remains ACTIVE. C11 was not started.

READY_FOR_VERIFY
