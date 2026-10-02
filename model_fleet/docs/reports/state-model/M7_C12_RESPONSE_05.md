# M7 C12 Response 05

## Result

C12 is READY_FOR_VERIFY. C1-C11 remain DONE, M7 remains ACTIVE, and C13 was not started.

## Deferred close-claim release

C12 physical tab cleanup now creates one raw `chrome.tabs.remove(tabId)` promise and observes its fulfillment/rejection independently of the bounded liveness race. If the bounded timeout wins, cleanup returns a warning but transfers claim-release ownership to the underlying promise; `m7TabCloseClaims` retains the exact claim until that request settles. Late rejection is observed and cannot become unhandled. Immediate success/failure releases the exact claim normally.

Removed-binding outer cleanup honors this transfer and does not delete the claim in its `finally` while the physical remove remains in flight. If the request never settles, the transient claim remains fail-closed for the service-worker lifetime rather than permitting a later registration to race with the destructive request.

## Pre-claim mutation drain

Created-tab cleanup acquires its exact tab claim before awaiting a bounded `stateQueue` barrier. Only after pre-claim mutations drain does it perform the fresh v2 no-owner proof and start physical removal. C10’s in-mutator claim check continues to reject registrations that reach the durable boundary after claim acquisition.

## Ambiguous created-tab law

C12 initial discovery of a topology-created window now requires exactly one integer tab identity. Zero or multiple tabs produce `topology-created-tab-ambiguous`, skip registration, and invoke fail-closed cleanup without selecting an arbitrary tab. Unknown-tab cleanup uses the same exact-one discovery rule. No C12 physical cleanup uses `chrome.windows.remove`; all known-target cleanup is exact `chrome.tabs.remove` under claim and fresh no-owner proof.

## Race and validation evidence

The focused C10/C12 boundary suite covers the durable claim recheck, claim retention/deferred release structure, queue-drain barrier, exact-tab cleanup, ambiguity rejection, and zero-window-remove scan. Existing C10 identity/registration and C12 atomic planning/registration behavior remain green.

- C10+C12 focused: 21/21 pass.
- C1-C11 focused: 139/139 pass.
- M0-M6: 129/129 pass.
- copied fleet-* tests: 404/404 pass.
- all candidate tests: 457/457 pass.
- node checks for `background.js`, C12, and `fleet-worker.js` pass.
- `git diff --check` passes.
- exact-tab and C12 close-claim scans pass; C12 overlay has no `chrome.windows.remove` call.

## Candidate and main protection

Changes were confined to the detached candidate. The authoritative main tracked production files remain unchanged, verified with `git -C /workspace/ai_sandbox/extension_chromium diff --quiet --exit-code -- .`.

## Status

C12 READY_FOR_VERIFY; C1-C11 DONE; M7 ACTIVE; C13 not started.
