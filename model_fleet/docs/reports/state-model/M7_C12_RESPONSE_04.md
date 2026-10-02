# M7 C12 Response 04

## Result

C12 is READY_FOR_VERIFY. C1-C11 remain DONE, M7 remains ACTIVE, and C13 was not started.

## Created-tab claim law

Created-but-unused topology tabs now use the same transient `m7TabCloseClaims` coordination as removed bindings. Cleanup resolves a concrete tab identity, acquires an exact per-tab claim, and performs a bounded fresh v2 read before any physical close. If the tab is already durably owned, the claim is contended/lost, state proof fails, or the created window has zero or multiple possible tab identities, cleanup fails closed with a warning and leaves the browser object untouched.

The C10 durable mutator recheck remains mandatory. A registration that began before claim acquisition but reaches its synchronous `mutateFleet` boundary afterward is rejected with `topology-tab-close-claimed`; no worker binding is created. The created-tab claim is released in `finally` on every path.

## Exact-tab-only physical close

C12 no longer uses `chrome.windows.remove` for observable topology cleanup. Removed-binding cleanup retains its exact claim and requires a final bounded v2 no-owner read immediately before `chrome.tabs.remove(intent.tabId)`. Created-tab cleanup uses the same claim/proof sequence and removes only the known target tab. When the target tab is unknown, cleanup queries the created window and proceeds only for exactly one integer tab; ambiguous or failed discovery is warning-only.

This preserves foreign tabs that enter the captured window after an earlier snapshot. Claim loss, worker rebound, proof read failure, or timeout skips physical close while preserving the already-committed durable unregister/registration result.

## Validation

- C10+C12 focused: 21/21 pass.
- C1-C11 focused: 139/139 pass.
- M0-M6: 129/129 pass.
- copied fleet-* tests: 404/404 pass.
- all candidate tests: 457/457 pass.
- node checks for `background.js`, C12, and `fleet-worker.js` pass.
- `git diff --check` passes.
- C12 overlay scan confirms no `chrome.windows.remove` physical-close call; exact tab removals are claim/proof guarded.

## Candidate and main protection

Changes were confined to the detached candidate. The authoritative main tracked production files remain unchanged, verified with `git -C /workspace/ai_sandbox/extension_chromium diff --quiet --exit-code -- .`.

## Status

C12 READY_FOR_VERIFY; C1-C11 DONE; M7 ACTIVE; C13 not started.
