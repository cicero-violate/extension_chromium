# M7 C3 Response 02

## Result

C3 is `READY_FOR_VERIFY`; M7 remains `ACTIVE`. C4 was not started.

Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`  
HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`

The authoritative main checkout remains unchanged. No browser/CDP/live
`chrome.storage` access, dependency change, commit, or push occurred.

## Repairs

- Added global C3 Assignment timeline validation at every normalize/finalize
  boundary, covering reserved, activating, running, and completing phase
  ordering, finite nonnegative fields, and reserved-terminal-field rules.
- `authorizeDispatch()` now requires an integer dispatch tab and exact equality
  with durable `worker.tabId`, returning `dispatch-tab-mismatch` otherwise.
- C3 transport no longer calls legacy `assertDispatchStillAuthorized()` or
  `activateWorkerForDispatch()`. It records the attempt first, then clears the
  warm-idle alarm, re-authorizes, ensures the existing worker window/bridge/tab
  readiness without legacy status writes, re-authorizes immediately before
  send, and accepts only through C3/M4-equivalent Assignment acceptance.
- The v2 scheduling lock now covers reservation mutation only. It releases
  before launching independent transport promises, so a slow acknowledgement
  does not block unrelated admission.
- Dispatch-fault messages follow M5B fallback semantics (`message ||
  'dispatch failed'`) and the background bounds external error text to 2000
  characters before typed fault construction.
- Success bookkeeping now clears dispatch diagnostics, increments chat turns
  exactly once, sets the role turn-limit rotation flag, journals threshold
  transition, and emits task, single-message/batch, or control start journals.
- Failure post-processing preserves worker dispatch diagnostics, per-message
  error/count fields, task status note, lifecycle/warm-idle intent fields, and
  complete `dispatch.failed` detail while retaining transport-failure task
  attempts and `startedAt`.
- Active-page deferral validates `deferredAt` and exact derived page cooldown
  before deriving the release candidate; control inboxes remain untouched.
- Stale worker/assignment/pointer/policy/tab acknowledgements and failures
  return typed stale outcomes and cannot mutate replacement custody or emit a
  false acceptance journal.

## Exact composition law

For an exact reserved Assignment with a recorded attempt, dispatch failure is
ordered as M5B-equivalent runtime/fault projection first, then M4-equivalent
reserved release. The released task preserves attempts and `startedAt`; all
message members requeue; control notices remain. Active authority keeps the
typed historical Assignment ID in the dispatch fault. Paused, disabled, or
authority-disabled policy resets runtime without inventing a blocking fault.

## Tests and validation

- C3 focused: **7/7 pass**
- C2 focused: **17/17 pass**
- C1 focused: **18/18 pass**
- M0-M6 focused: **129/129 pass**
- all copied `fleet-*`: **296/296 pass**
- `node --check` C3, C2, C1, and candidate `background.js`: pass
- `git diff --check`: pass
- C3 browser/hidden-time/legacy-authority scan: pass
- candidate v2 dispatch-range scan: pass
- authoritative main tracked production protection: pass

## Remaining C4+ families

Heartbeat observation/reconciliation, bridge recovery, completion handoff and
acknowledgement, automatic recovery, cancellation/flush, broader lifecycle
families, public snapshot/control-pane, final persistence connection, and
global zero-legacy proof remain outside C3.

`C3 READY_FOR_VERIFY`  
`M7 ACTIVE`  
`M8/M9 TODO`

Blocker: none.
