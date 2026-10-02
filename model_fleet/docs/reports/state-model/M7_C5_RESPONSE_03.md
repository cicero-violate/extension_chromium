# M7 C5 Response 03

## Result

C5 is READY_FOR_VERIFY. C1-C4 remain DONE; M7 remains ACTIVE. C6 was not started.

Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`

Candidate base HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`

No browser/CDP/live Chrome or `chrome.storage` access occurred. No dependency, commit, or push was made. The authoritative main checkout's tracked production files remain unchanged.

## Durable journal threading

C5 creation helpers now retain the state returned by the pure C3 journal operation through `c5JournalInPlace`. The returned state is adopted before the helper returns, so `message.queued`, `task.created`, and `control.queued` entries persist with explicit timestamps, bounded journal semantics, and their source detail. Behavioral C5 tests execute the helpers and inspect the durable journal entries rather than relying only on source matching.

## V2-safe post-completion projection

C5 no longer invokes legacy `beginWarmIdle` or `rotateWorkerChat` after Phase B. The candidate uses `c5BeginWarmIdleV2` and `c5RotateWorkerChatV2`:

- warm-idle requires a fresh exact worker with no assignment and durable active-window eligibility, then writes only v2 lifecycle/runtime/warm-idle projection fields and an explicit journal before creating the alarm;
- rotation claims only exact fresh no-owner custody, writes v2-safe rotating projection fields and an explicit start journal, performs external tab work after the claim, and uses typed `chat-rotation-failed` fault state on failure;
- successful rotation resets the source-equivalent turn fields only after the durable rotation operation;
- neither path writes `worker.status`, top-level `worker.busy`, or top-level `worker.heartbeatAt`, and replacement/no-owner races fail closed.

## Custody-safe bounded collections

C5 message and control-notice routing never evicts an identity referenced by a canonical active Assignment. It prunes only unowned victims when safe; if every candidate is custody-owned, it returns a typed capacity error and leaves completion custody intact. Boundary coverage protects an oldest completing message, another worker's active message, and assigned control notices while retaining newly routed feedback when capacity permits. This prevents retry loops caused by assignment-referenced records disappearing during Phase B.

## Validation

- C5 focused: 14/14 pass.
- C1-C4 focused: 79/79 pass.
- Copied M0-M6 baseline: 129/129 pass.
- Full copied candidate test inventory: 380/380 pass, 0 failures.
- `node --check` passed for background and C1-C5 candidate modules.
- `git diff --check` passed.
- C5 browser/hidden-time/legacy-authority scans passed.
- Candidate M5B manifest coverage was extended for the exact C5 v2 post-completion lifecycle projection range.
- Main checkout tracked production protection check passed.

## Candidate files

The C5 candidate work consists of the candidate `extension/background.js` C5 overlay, `extension/fleet-state-model-m7-c5.js`, `extension/tests/fleet-state-model-m7-c5.test.cjs`, and the candidate M5B/M6 manifest coverage updates. Copied M0-M6 artifacts remain preserved in the detached candidate.

## Status

`C5=READY_FOR_VERIFY`, `M7=ACTIVE`, `C6=TODO`.

