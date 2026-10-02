# M6 Response 05

## Scope and result

- Assigned scope: repair M6 public snapshot, UI, diagnostics, and projection only.
- M0–M5B remain DONE; M6 remains VERIFY; M7 remains TODO.
- Result: READY_FOR_VERIFY. M6 was not marked DONE.
- No M7 work was started.

## Worktree state

- HEAD before/after: `02183c4668c214e2a130747ab9b9820b6272cd43`.
- Branch: `main`.
- Existing isolated state-model artifacts remain untracked and were preserved.
- M6 changes are limited to the isolated M6 module/test artifacts; no production source was changed.
- `background.js`, `control-pane.js`, `fleet-worker.js`, and `manifest.json` remain unchanged.
- No dependency files, browser state, live fleet state, staging area, commit, or push were changed.

## Repairs

### Source-shaped completion-release lag

M6 now consumes only the production-shaped worker fields:

- `lastCompletionReleaseLagMs`
- `completionReleaseLagCount`
- `completionReleaseLagTotalMs`
- `completionReleaseLagMaxMs`

The public average is derived as `Math.round(total / count)` when count is positive; maximum is derived from the source max field. Invented persisted average/max inputs are not used as authority. Queue lag remains diagnostic-only.

### Raw-lifecycle UI live/bound law

Each projected worker carries `uiLifecycleStale`, derived before M5B lifecycle display projection. UI live/bound, topology, target selection, unique-tab, running-owner, concurrency, and dedicated-window logic use this fact plus enabled/integer-tab checks. An active assignment cannot mask raw `lifecycle='stale'`. Heartbeat deltas preserve this fact through refresh.

### Dynamic heartbeat diagnostics and queue age

Heartbeat deltas remain display-only and custody-neutral. On an accepted transport-clock advance, M6 refreshes all worker heartbeat ages/display fields, recomputes dynamic worker diagnostics, and refreshes queue ages. The queue renderer derives `oldestQueueAgeMs` from `serverNow - oldestQueuedAt` at render time.

Issue typing is source-distinct:

- raw stale lifecycle or missing/non-integer tab: `worker-offline` stale/unbound issue;
- no heartbeat on a bound, non-stale worker: `heartbeat-never`;
- rounded age greater than 25 seconds on a bound, non-stale worker: `heartbeat-stale`;
- worker fault remains an additional issue;
- lifecycle-offline/bound follows the offline diagnostic path without being mislabeled heartbeat-stale.

Stale heartbeat events may advance the detached transport/view clock when newer, without changing worker observation or custody fields.

### Canonical role contracts and turn limits

Role metadata is now non-spoofable: caller-supplied role catalogs must exactly match the fixed three-role source catalog for authority-bearing fields and labels. Public output is an explicit allowlist only; `canonicalDefaultCount` is removed. `roleTurnLimitV2` is shared by role contracts and topology and matches control-pane truncation/clamping: valid positive values clamp to 1–50; zero, negative, missing, and invalid values default to 10.

### Exact compact/route/target semantics

M6 now uses source-equivalent trim-and-ellipsis compacting for title length 36 and URL context length 72. Message rendering uses `fromWorkerId` precedence, then `message.from`, role-aware worker route labels, Unicode `→`, and operator destination `you`. Unknown endpoint fallback remains deterministic.

### Current-UI invariant/live-set semantics

The UI invariant rows now use the explicit projected live/bound worker set for unique assignment ownership, concurrency, running task ownership, tab ownership, and dedicated windows. Global canonical assignment count remains a separate diagnostic quantity and is not substituted for current UI concurrency semantics.

The prior report wording was corrected here: the journal renderer **excludes** `schedule.deferred` entries, then takes the last 60 remaining entries and reverses them newest-first.

## Validation

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m6.test.cjs` — **31/31 passed**.
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs ... fleet-state-model-m5b.test.cjs` — **95/95 passed**.
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **251/251 passed**.
- Node syntax checks for M6, M6 tests, `background.js`, `control-pane.js`, and `fleet-worker.js` — passed.
- `rtk git diff --check` — passed.
- Production import/load scan — no M6 import/load in production files or manifest.
- M6 Chrome API and hidden-time scan — no `chrome.` or `Date.now()` in the M6 module.
- Mutation/isolation scan — no assignment, task/message phase, production authority, or live-wiring mutation.
- Exact manifest coverage scans — passed for named background/control boundaries, publicSnapshot sites, normalizeSnapshot sites, heartbeat handler, and M6 reader coverage.

## Risks/blockers

- M6 remains isolated and non-deployable pending independent verification.
- No live browser/UI proof was authorized for this node.
- No dependency changes.

## Acceptance and next action

- M6 acceptance criteria covered by focused tests and isolation scans: **READY_FOR_VERIFY**.
- Independent verification should review this isolated projection contract before promoting M6 to DONE.
- M7 remains TODO and must not start in this turn.
