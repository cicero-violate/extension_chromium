# M7 C5 Response 06

## Result

C5 is READY_FOR_VERIFY. C1-C4 remain DONE; M7 remains ACTIVE. C6 was not started.

Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`

Candidate base HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`

No browser/CDP/live Chrome or `chrome.storage` access occurred. No dependency, commit, or push was made. The authoritative main checkout's tracked production files remain unchanged.

## Versioned worker-idle-ready boundary

The actual `fleet:worker-idle-ready` handler now branches on the loaded state version. Version 1 preserves the pre-existing legacy `beginWarmIdle`/`rotateWorkerChat` behavior unchanged. Version 2 calls only `c5WorkerIdleReadyV2` and never calls those legacy writers.

The v2 handler requires a registered bound worker, enabled/no-owner/no-fault state, an explicit assignment ID, matching historical `lastCompletionAssignmentId`, and a positive release timestamp. Missing or stale provenance is a no-op. A newly reserved assignment therefore blocks the old idle-ready signal from touching new custody. Warm-idle/rotating states are idempotent no-ops; duplicate idle-ready does not reset warm-idle times or start a second rotation. If the completion fire-and-forget projection has not applied, the exact release provenance permits one guarded retry through the v2 wrapper.

`c5BeginWarmIdleV2` now returns an idempotent result for an existing warm-idle projection without resetting its window or creating a replacement alarm. Rotation continues to use the exact operation claim and enabled/pending/tab/fault settlement guards from Response 05.

## Preserved C5 laws

Staged Phase-B message/control materialization remains capacity-safe, with current-assignment terminalization/notice consumption counted only as projected post-ack capacity. Queued/running/unrelated pending work is never pruned. Capacity failures retain typed reasons and durable completing custody. The committed Phase-B state remains the positive-ack boundary, with no post-commit reload or legacy snapshot dependency. Journal threading, M4 disposition parity, explicit release time, child restrictions, repair escalation/body, and v2-safe warm-idle/rotation remain intact.

## Validation

- C5 focused: 18/18 pass.
- C1-C4 focused: 65/65 pass.
- Copied M0-M6 baseline: 129/129 pass.
- Full candidate test inventory: 384/384 counted Node test cases pass, 0 failures; all candidate test scripts completed successfully.
- `node --check` passed for changed candidate JavaScript.
- `git diff --check` passed.
- Actual idle-ready handler scan confirms the v2 branch has no legacy warm-idle/rotation call; the legacy calls occur only in the preserved v1 branch.
- C5 hidden-time/legacy-authority scan passed.
- Main tracked production protection check passed.

## Candidate status

Candidate changes are limited to the detached C5 overlay/module/tests and required candidate manifest coverage, with copied M0-M6 artifacts preserved. `C5=READY_FOR_VERIFY`, `M7=ACTIVE`, `C6=TODO`.

