# M7 C3 response 04

## Candidate and scope

- Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`
- Base HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
- C1: DONE; C2: DONE; C3: VERIFY; M7: ACTIVE; C4: not started.
- No browser/CDP access, live extension reload, or `chrome.storage` mutation occurred.
- No commit, push, dependency change, or authoritative-main production edit occurred.

## Durable-attempt classification law

The C3 catch path no longer uses a local `attemptRecorded` flag. It classifies the freshly loaded durable canonical state:

1. Missing/replaced worker, assignment, pointer, or owner: typed stale no-op; replacement custody is untouched.
2. Exact reserved assignment with `dispatchAttemptAt === 0`: M3-equivalent pre-attempt rollback; no fault, failure count, or failure journal.
3. Exact reserved assignment with `dispatchAttemptAt > 0`: M5B dispatch fault followed by M4 release.
4. Exact assignment already activating/running/completing: typed already-progressed/stale no-op; progressing custody is not released.

The durable attempt mutation completes before any wake, page, alarm, bridge, or send side effect. If persistence fails before the attempt becomes durable, the subsequent settlement sees `dispatchAttemptAt === 0` and rolls back cleanly.

## Typed fault versus historical diagnostics

C3 now keeps two independent values:

- `diagnosticError = String(error)`, preserved for source-equivalent worker/message/task diagnostics and `dispatch.failed` text/detail;
- `typedFaultMessage`, derived from the error message/value, defaulted according to M5B falsy semantics, and bounded to 2000 characters only for typed fault construction.

Thus `Error('boom')` produces typed fault text `boom` while historical/operator text remains `Error: boom`. Long errors remain intact in diagnostic fields while typed fault input is bounded. `dispatch.failed` detail is source-shaped as `{error, workerBlocked, messageIds}`; the assignment ID remains in the journal text and typed custody history.

## V2-safe wake projection

When active worker windows are enabled, after exact durable authorization and `ensureWorkerWindow()` returns the stable window, C3 updates only operational projection fields:

- `worker.windowId = stable.windowId`;
- `worker.activeWindowId = stable.windowId`;
- explicit-time `worker.wake` journal with assignment/window context.

It does not write `worker.status`, lifecycle activation authority, top-level busy/heartbeat, or distributed current-work fields. Assignment phase remains reserved until `acceptDispatch`. The candidate re-authorizes during wake and again before send. With active windows disabled, no active-window projection mutation is introduced.

## Preserved C3 laws

Global M4 timeline validation, exact dispatch-tab binding, attempt-before-side-effects, lock release before transport launch, M5B fault parity, pre-attempt rollback, stale custody protection, active-page deferral, explicit acceptedAt journals, exact message journal text, count-once turn bookkeeping, and source-equivalent failure/lifecycle diagnostics remain in force. The C3 range contains no calls to legacy authorization, activation, failure, or deferral helpers and no legacy authority reads/writes.

## Tests and validation

- C3 focused: **17/17 pass**
- C1+C2 focused: **35/35 pass**
- M0-M6 focused: **129/129 pass**
- copied `fleet-*`: **306/306 pass**
- `node --check` C1/C2/C3/background: pass
- `git diff --check`: pass
- C3 browser/hidden-time scan: pass
- C3 durable-classification, diagnostic-separation, wake-projection, and legacy-helper scans: pass
- authoritative main tracked production protection: pass

The detached candidate contains only candidate-slice changes and copied M0-M6/C1-C2 artifacts. The authoritative main checkout's tracked production files are unchanged.

## Result

**C3 READY_FOR_VERIFY.** M7 remains ACTIVE. No blocker.
