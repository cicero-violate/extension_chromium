# M7 C12 Response 06

## Result

C12 is READY_FOR_VERIFY. C1-C11 remain DONE, M7 remains ACTIVE, and C13 was not started.

## Fresh preview and commit time law

Each C12 removal attempt now reads fresh canonical state and captures its own `previewAt = now()` for topology planning and preview eligibility. The reconcile-start diagnostic timestamp is no longer passed into removal eligibility or unregister.

`c12UnregisterExact` captures `commitAt = now()` inside the serialized `mutateFleet` callback, after earlier queued mutations have committed. Final `removableWorkerV2` eligibility, C9 `unregisterWorkerV2`, and its authoritative release diagnostics all use this commit-time value. A newer busy heartbeat therefore remains fresh at the actual removal boundary and blocks unregister; a heartbeat older than the commit-time freshness window may be removed as stale.

Sequential removal attempts independently capture preview and commit times, so a long reconciliation cannot reuse an old action timestamp.

## Heartbeat race evidence

The focused C12 test now exercises the accepted C2 caller-time law directly: a busy heartbeat at 110 is removable with an intentionally stale `now=100`, but is protected at `now=110` and `now=120`. The C12 source boundary asserts fresh preview time and commit-time eligibility inside the mutator, with no removal call receiving the reconcile-start `at`.

All prior claim invariants remain intact: deferred raw tab removal retains the exact claim until promise settlement; created-tab cleanup drains the pre-claim state queue; C10 rechecks claims inside its mutator; created-tab discovery is exact-one; and C12 physical cleanup remains exact-tab-only with no `chrome.windows.remove`.

## Validation

- C10+C12 focused: 23/23 pass.
- C1-C11 focused: 139/139 pass.
- M0-M6: 129/129 pass.
- copied fleet-* tests: 406/406 pass.
- all candidate tests: 459/459 pass.
- node checks for `background.js`, C12, and `fleet-worker.js` pass.
- `git diff --check` passes.
- freshness-time, close-claim, exact-tab, and C12 zero-legacy scans pass.

## Candidate and main protection

Changes were confined to the detached candidate. The authoritative main tracked production files remain unchanged, verified with `git -C /workspace/ai_sandbox/extension_chromium diff --quiet --exit-code -- .`.

## Status

C12 READY_FOR_VERIFY; C1-C11 DONE; M7 ACTIVE; C13 not started.
