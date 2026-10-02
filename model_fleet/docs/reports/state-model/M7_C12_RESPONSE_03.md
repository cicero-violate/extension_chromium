# M7 C12 Response 03

## Result

C12 is READY_FOR_VERIFY. C1-C11 remain DONE and M7 remains ACTIVE. C13 was not started.

## Durable C10 claim recheck

`registerTabC10` keeps the early `m7TabCloseClaims` rejection as an optimization, then repeats the check inside the synchronous `mutateFleet` callback immediately before `upsertWorkerBindingV2`. A claim present at the durable registration boundary therefore produces `topology-tab-close-claimed` with zero worker/state mutation. C12's direct topology-creation registration path performs the same in-transaction claim check before its C10 upsert.

The check is intentionally in the mutator: registration that began before a close claim, including one stalled in tab probing, cannot bind after C12 owns the tab-close claim.

## Exact-claim physical-close proof

C12 carries the claim object/token through unregister cleanup and close handling. The claim must remain the exact value stored for the tab. Before each irreversible `windows.remove` or `tabs.remove`, C12 performs a bounded fresh v2 state read after any preceding asynchronous window lookup and requires:

- the same close claim is still held;
- the canonical state is v2;
- no worker owns the target tab.

Claim loss, claim replacement, worker rebound, invalid state, or a failed/timed-out proof skips physical close and records a cleanup warning. Durable unregister remains committed. Claims are released in `finally`; they are transient coordination state, not canonical authority.

## Behavioral and parity evidence

The focused C10/C12 boundary suite covers durable claim rechecking, C12 in-mutate creation protection, claim identity retention, final close proof, and fail-closed close behavior. Pure C12 planning/removal eligibility remains source-aligned with the accepted C2/C9 laws. Existing C10 identity/allocation, completing-custody, v1 delegation, and committed-policy behavior remain green.

## Validation

- C10/C12 focused: 21/21 pass.
- C1-C11 focused: 139/139 pass.
- M0-M6: 129/129 pass.
- copied fleet-* tests: 404/404 pass.
- all candidate tests: 457/457 pass.
- node checks: `background.js`, C10, C12, and `fleet-worker.js` pass.
- `git diff --check` passes.
- C12/C10 claim and zero-legacy scans pass.

## Candidate and main protection

Only the detached candidate was modified. The authoritative main tracked production files are unchanged, verified with `git -C /workspace/ai_sandbox/extension_chromium diff --quiet --exit-code -- .`.

## Status

C12 READY_FOR_VERIFY; C1-C11 DONE; M7 ACTIVE; C13 not started.
