# M7 C4 Response 02

## Result

C4 is READY_FOR_VERIFY. M7 remains ACTIVE. C5 was not started.

Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`  
Base HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`

## Repairs

- Heartbeat flush now enters `mutateFleet` exactly once; it no longer wraps that call in `stateQueue.then`, eliminating the self-deadlock. Buffered observations are removed only after the durable mutation succeeds, and removed workers are skipped without poisoning the batch.
- A stale M5B heartbeat returns immediately with unchanged state. It performs no M4 reconciliation, faulting, clearing, release, or scheduling decision. Same-time exact duplicates retain the allowed M4 reconciliation behavior.
- Direct C4 heartbeat custody reconciliation now requires finite positive `observedAt` and uses the M4 timeline-validated C4 normalization boundary.
- Matching-heartbeat fault clearing requires the M5B proof contract: event time at least the fault time, exact worker/current assignment identity, explicit non-null identity, `busy:true`, durable runtime watermark, and compatible fault assignment. Recovery clearing accepts only validated bridge/M4 outcomes and exact recovery inputs; no broad `fault=null` path exists.
- Recovery matches M4 reserved-custody behavior: reserved custody with null/omitted identity is `reservation-preserved`, while an exact reserved identity is `claim-before-acceptance`.
- Hello and recovery preserve `runtime.busy` unless the input explicitly owns a busy observation. Heartbeat and recovery identity fields are added only when the source payload owns them; omitted identity remains omitted rather than becoming an undefined property.
- `lastHeartbeatFlushAt` advances only after successful durable flush. `scheduleNeeded` also reports a busy-to-idle transition when no assignment remains. Hello consumes an older/equal buffered observation only after its mutation commits.
- Recovery failure catches reload fresh canonical state. They release only the same non-completing assignment, preserve completing custody, return stale/no-owner outcomes without touching replacement custody, append an explicit-time failure journal, and clear the recovery hint only under the exact-custody guard.
- Explicit-time bridge recovery reconciliation clears only proof-bearing M5B-clearable faults and preserves meaningful recovery diagnostics without legacy worker authority.

## Validation

- C4 focused: 13/13 pass.
- C1-C3 focused: 52/52 pass.
- M0-M6 focused: 129/129 pass.
- All copied `fleet-*` tests: 319/319 pass.
- `node --check` for C1/C2/C3/C4/background: pass.
- `git diff --check`: pass.
- C4 browser/hidden-time/legacy-authority/release-helper scans: pass.
- Main authoritative tracked production files: unchanged.
- No browser/CDP/live `chrome.storage` migration or reload was performed by the candidate work.

## Candidate state

C4 changed only the detached candidate C4 overlay and focused C4 tests, while preserving copied C1-C3 artifacts. Remaining bounded families are C5+: completion acknowledgement/result disposition and release-lag accounting, cancellation/automatic recovery exhaustion, stop/flush/unregister paths, public snapshot/control-pane wiring, and final persistence/global zero-legacy cutover.

Status: `C1 DONE`, `C2 DONE`, `C3 DONE`, `C4 READY_FOR_VERIFY`, `M7 ACTIVE`, `C5+ TODO`.
