# M6 Response 06

## Scope and result

- Assigned scope: repair M6 public snapshot, UI, diagnostics, and projection only.
- M0–M5B remain DONE; M6 remains VERIFY; M7 remains TODO.
- Result: READY_FOR_VERIFY. M6 was not marked DONE.
- No M7 work was started.

## Worktree and dependency state

- HEAD before/after: `02183c4668c214e2a130747ab9b9820b6272cd43`.
- Branch: `main`.
- Existing isolated state-model artifacts remain untracked and were preserved.
- Only isolated M6 module/test work was changed in this turn.
- Production `background.js`, `control-pane.js`, `fleet-worker.js`, and `manifest.json` were not changed.
- No dependency files, browser/CDP state, live fleet state, staging, commit, or push were changed.

## Repairs

### Stable lifecycle display through heartbeat refresh

`displayStatusForWorker()` now uses stable public facts only: `lifecycleDisplay`, `uiLifecycleStale`, assignment summary/phase, availability, fault, and heartbeat facts. It no longer depends on omitted raw `worker.lifecycle`.

Heartbeat refresh therefore preserves:

- warm-idle → `warm`;
- rotating → `rotating`;
- reserved/activating custody → `waking`;
- lifecycle offline → `blocked` when not UI-stale;
- rotation-failed/fault → `blocked`;
- cancellation projection → `cancelling`.

Heartbeat deltas update observation/display timing and metadata only; they do not erase lifecycle display intent.

### Monotonic final-serverNow refresh

All fresh, duplicate, and stale-event branches now compute the resulting snapshot clock first and pass that final monotonic `serverNow` to the common refresh. Derived worker ages, UI stale status, dynamic diagnostics, and queue ages cannot regress when an incoming transport clock is older than the existing view clock.

### Coherent heartbeat ages

Every refresh recomputes both fields for every worker:

- `heartbeatAgeMs = max(0, serverNow - lastHeartbeatAt)` when a heartbeat exists;
- rounded UI `heartbeatAgeSeconds` under the 25-second display rule.

The target worker no longer receives a temporary zero age; all workers are derived from the same final view clock.

### Deep-immutable role authority

M6 now maintains a private deeply frozen canonical role source and a deeply frozen exported catalog. Role objects and nested `claimTypes`, `prohibitedActions`, and `allowedHandoffs` arrays are frozen. Validation compares caller input against the private canonical source, not a mutable exported reference, and public output remains an explicit allowlist without `canonicalDefaultCount`.

Adversarial mutation attempts now fail in strict mode and cannot alter later snapshots.

## Tests and validation

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m6.test.cjs` — **34/34 passed**.
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs ... fleet-state-model-m5b.test.cjs` — **95/95 passed**.
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **254/254 passed**.
- Node syntax checks for M6, M6 tests, `background.js`, `control-pane.js`, and `fleet-worker.js` — passed.
- `rtk git diff --check` — passed.
- Production import/load scan — no M6 import/load in production files or manifest.
- M6 Chrome API and hidden-time scan — no `chrome.` or `Date.now()` in the M6 module.
- Mutation/isolation scan — no assignment, task/message phase, production authority, or live-wiring mutation.
- Exact manifest coverage scans — passed.

Focused regression coverage includes warm-idle/rotating/offline/rotation-failed/cancelling delta preservation, older incoming `serverNow` with monotonic age and queue calculations, coherent `heartbeatAgeMs`/seconds for all workers, and mutation attempts against every nested role-contract collection.

## Risks/blockers

- M6 remains isolated and non-deployable pending independent verification.
- No live browser/UI proof was authorized for this node.
- No dependency changes.

## Acceptance and next action

- M6 acceptance criteria covered by focused tests and isolation scans: **READY_FOR_VERIFY**.
- Independent verification should review this isolated projection contract before promoting M6 to DONE.
- M7 remains TODO and must not start in this turn.
