# M4 response 03

## Result and scope

M4 is `READY_FOR_VERIFY`; the ledger remains `M4 = VERIFY` and M5A/M5B remain `TODO`. M0-M3 remain `DONE`. This turn repaired M4 only. No production source, storage, dependency, browser, CDP, live-fleet, commit, or push operation was performed.

Before and after:

- branch: `main`
- HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43` before and after
- pre-existing untracked M0-M4 artifacts and editor backup were preserved
- final untracked set remains the M0-M4 model/test files, `STATE_MODEL_CLEANUP_TODO.md`, and `.#STATE_MODEL_CLEANUP_TODO.md`
- no tracked files or dependency files changed

## Repairs

### Stale-heartbeat watermark

For a running assignment, the custody watermark is:

`max(reservedAt, dispatchAttemptAt, acceptedAt, startedAt)`.

An explicit-null, `busy=false` heartbeat releases only when `observedAt >= watermark`. A stale observation returns `preserved` with reason `stale-heartbeat-observation`, includes the watermark, and leaves state unchanged. Omitted identity remains observational; explicit-null + `busy=true` remains a mismatch; completing custody never releases. Regression coverage confirms running at 40 cannot be released by idle evidence at 35, while evidence at 40 can release.

### Recovery phase/evidence matrix

| Phase | Evidence | Result |
| --- | --- | --- |
| reserved | exact non-null identity | `claim-before-acceptance`, unchanged |
| reserved | omitted/null, no unrecoverable proof | `reservation-preserved`, unresolved |
| reserved | explicit unrecoverable proof | exact bridge-release/requeue |
| activating | no identity | `activation-preserved`, unresolved |
| activating | exact identity + reattach/prompt proof | confirm running, monotonic observation required |
| running | exact identity + proof | preserve/reattach, no resend |
| any active phase | different non-null identity | structured ownership mismatch, unchanged |
| completing | exact identity + unrecoverable | completion-custody-protected rejection |

The API `reconcileRecoveryCustody()` reads only canonical assignments and the reciprocal worker pointer. No legacy worker custody reconstruction or custody invention is possible. Repeated unrecoverable observation after release returns terminal no-owner behavior.

### Completing proof law

Completing custody is stronger than ordinary reattachment. Exact identity with `pendingCompletionProof=true` returns `completion-reattached`. Exact identity without proof, reattach flags notwithstanding, returns `completion-proof-pending`; omitted/null identity also preserves completion custody as proof-pending. A mismatch is unchanged and structured. No completing assignment is released by recovery evidence.

### Stop/flush control notices

`flushActiveAssignments()` first scans for completing assignments. If any exist it fails atomically with `flush-completing-custody-protected`; assignments, task state, and every control inbox remain unchanged. Otherwise it cancels active assignments with the reset-start policy, then clears every worker's control inbox, including idle/unrelated notices, and returns deterministic `flushedControlNoticeIds` and `flushedControlNoticeCount`. Queued messages remain outside M4. Ordinary release/recovery/cancel operations continue retaining notices.

### M4 timeline validation

Every M4 operation entry validates assignment timelines after v2 normalization:

- reserved: positive `reservedAt`; `dispatchAttemptAt` is zero or at least reservation; acceptance/start/terminal are exactly zero;
- activating: positive dispatch attempt; `acceptedAt >= dispatchAttemptAt`; start and terminal are zero;
- running: positive dispatch attempt; accepted timestamp is monotonic; `startedAt >= acceptedAt`; terminal is zero;
- completing: positive dispatch attempt; accepted/start are monotonic; `responseTerminalAt >= startedAt` and positive;
- all timeline values are finite and nonnegative where allowed.

Malformed persisted custody fails with deterministic `invalid-assignment-timeline:<id>:...` diagnostics before heartbeat, completion, recovery, or release logic. M1/M2 authorities were not changed.

## Tests and validation

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m4.test.cjs` — **23/23 pass**.
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs model_fleet/extension/tests/fleet-state-model-m1.test.cjs model_fleet/extension/tests/fleet-state-model-m2.test.cjs model_fleet/extension/tests/fleet-state-model-m3.test.cjs` — **40/40 pass**.
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **188/188 pass**.
- `rtk node --check model_fleet/extension/fleet-state-model-m4.cjs` — pass.
- `rtk node --check model_fleet/extension/background.js` — pass.
- `rtk node --check model_fleet/extension/fleet-worker.js` — pass.
- `rtk git diff --check` — pass.
- Production M4 import/load scan across `background.js`, `fleet-worker.js`, `control-pane.js`, and `manifest.json` — no matches.
- M4 Chrome API scan — no `chrome.` references in the M4 module.

## Remaining risk / next action

Independent verification remains required before M4 can be promoted to DONE. The repaired artifacts remain isolated and non-deployable; M5A/M5B must not start until M4 is accepted.
