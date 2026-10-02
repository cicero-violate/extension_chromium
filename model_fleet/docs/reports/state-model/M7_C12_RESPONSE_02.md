# M7 C12 Response 02

## Result

C12 is **READY_FOR_VERIFY**; M7 remains **ACTIVE**. C1-C11 remain DONE and C13 was not started.

Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval` at `02183c4668c214e2a130747ab9b9820b6272cd43`.

## Repairs

- Final topology count proof and C10 `upsertWorkerBindingV2` registration now run in one `mutateFleet` transaction. A concurrent manual registration therefore makes the transaction return capacity-satisfied and the unused created window is closed fail-soft; no second worker is bound.
- Post-registration cleanup reuses the C10 helper, while the durable registration remains authoritative if cleanup/journal work fails.
- C12 uses a transient in-memory tab-close claim acquired before exact C9 unregister and held through C9-style cleanup and physical close. C10 v2 registration rejects a claimed tab. The claim is released in `finally`; it is not persisted or used as fleet authority.
- Exact C9 post-unregister cleanup is reused: heartbeat deletion, bounded alarm/badge cleanup, and identity-scoped `registration-changed:false` notification occur only after durable removal.
- Final state/count read is bounded and fail-soft. After durable actions, read/summary/journal failures return the durable `created`/`removed` arrays, warnings, and best authenticated counts; they cannot reject or hang the result. Scheduling remains fire-and-forget.

## Laws retained

Planning counts only enabled, bound, non-stale canonical workers. Removal requires topology-managed, role-matching, bound, unassigned, idle, non-faulted, non-rotating, non-pending, non-cooldown custody. Exact worker/tab/window/role/removability proof is revalidated inside the unregister transaction. Completing or newly acquired custody is never unregistered. Window/tab close requires the held claim and fresh no-owner proof; rebound tabs are skipped.

Creation remains external-first, bounded, fresh-intent checked, and C10-shaped. Desired-count changes are re-read for every action, stale binding reconciliation runs first, and single-flight remains deduplication only. The v1 reconcile branch remains delegated before v2-only work.

## Validation

- C12 focused: **11/11 pass**
- C1-C11 focused: **139/139 pass**
- M0-M6: **129/129 pass**
- all `fleet-*`: **404/404 pass**
- all candidate tests: **457/457 pass**
- node checks, `git diff --check`, C12 zero-legacy scan: pass
- authoritative main tracked-production protection: pass; no browser/CDP/live storage, commit, or push

Remaining C13+ scope: worker enablement, update-policy, workspace/goal APIs, operator APIs, clear-completed, M6 snapshot/control-pane wiring, and final C1 persistence/global zero-legacy cutover.

**C12 READY_FOR_VERIFY. M7 ACTIVE.**
