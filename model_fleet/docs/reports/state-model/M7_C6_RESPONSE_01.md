# M7 C6 response

## Candidate and scope

- Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`
- Base HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
- C1-C5 remain DONE; C6 is the only new M7 slice; M7 remains ACTIVE.
- No browser/CDP session, authenticated Chrome state, or `chrome.storage` was touched.
- No commit or push was performed.

## Files changed for C6

- `extension/fleet-state-model-m7-c6.js` — browser-compatible pure cancellation/recovery custody operations.
- `extension/background.js` — version-selected v2 assignment-cancelled handler and v2 operator-cancel transport/settle overlay; v1 paths remain selected for non-v2 state.
- `extension/tests/fleet-state-model-m7-c6.test.cjs` — C6 pure parity, immutability, identity-race, browser-safety, and source-boundary tests.

The copied M0-M6 manifest/test artifacts were also adjusted only for the candidate’s shifted source line coverage; the authoritative main checkout is unchanged.

## Cancellation and recovery law

The v2 worker callback resolves the worker from the sender tab and requires a nonempty exact `assignmentId`. It returns typed stale/no-owner or ownership-mismatch results without touching replacement custody, protects `completing`, and uses canonical `state.assignments` only:

- operator reason → cancellation disposition;
- `auto-recovery: ` reason → bounded M4-equivalent automatic recovery;
- all other reasons → generic requeue/release.

Automatic recovery uses `max(assignment.recoveryAttempt, item.autoRecoveryAttempts)`, retries once when the effective count is below `1`, otherwise blocks terminally, preserves item diagnostics, and schedules only retry outcomes after the bounded delay. Control notices remain in the inbox until their canonical assignment semantics consume them.

## Operator transport race and receipt law

Operator cancellation records an explicit request journal without writing status authority, sends `fleet:cancel-current` with the captured tab and reason, then settles against freshly loaded custody. A worker-origin release that wins the race is accepted only through an exact historical receipt containing assignment, reason, time, and disposition. Replacement assignments, tab rebound, worker removal, completion custody, and stale callbacks fail closed. The receipt is diagnostic history only and never satisfies C5 completion provenance or becomes scheduler custody.

Transport failure is diagnostic and still attempts the exact local canonical cancellation fallback. v2 responses omit the legacy public snapshot and return a minimal deterministic result; post-settle scheduling is fire-and-forget.

## Post-release and authority isolation

Cancellation clears `currentAssignmentId` only through the C6 canonical release operation, resets runtime busy, preserves heartbeat-reported identity until a later accepted heartbeat, and sets only non-authoritative lifecycle/warm-idle projection fields. The C6 module has no Chrome APIs, hidden time, CommonJS loading, legacy status/busy/heartbeat authority, distributed current-task/message/control reads, or legacy release helpers. The actual `fleet:assignment-cancelled` handler selects the v2 branch by durable `state.version`; the v1 branch remains available for v1 state.

## Validation

- C6 focused: **10/10 pass**.
- M0-M6 focused: **129/129 pass** (`node --test extension/tests/fleet-state-model-m{0..6}.test.cjs` equivalent explicit file set).
- C1-C5 focused: **83/83 pass**.
- All `fleet-*` tests: **347/347 pass**.
- All candidate tests: **400/400 pass**.
- `node --check` changed/candidate JavaScript: pass.
- `git diff --check`: pass.
- C6 browser/hidden-time/legacy scans: pass.
- Main tracked production files (`background.js`, `control-pane.js`, `fleet-worker.js`, `manifest.json`): unchanged.

## Remaining bounded M7 families

C7+ remains for stop/flush-stale, unregister/registration removal, authority-revoke bulk cancellation, remaining general APIs, public snapshot/control-pane wiring, and final persistence/global zero-legacy cutover. No C7 work was started.

## Status

**C6 READY_FOR_VERIFY. M7 ACTIVE.**
