# M7 C12 Response 02

## Result

C12 candidate slice is **READY_FOR_VERIFY**. M7 remains **ACTIVE**; C1-C11 are DONE; C13+ remain TODO.

Candidate:

- Path: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`
- HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
- Detached/inert candidate only. No browser, CDP, live extension, or live `chrome.storage` access occurred.

## Files changed for C12

- `extension/fleet-state-model-m7-c12.js`
- `extension/tests/fleet-state-model-m7-c12.test.cjs`
- `extension/background.js`

The accepted copied C1-C11 artifacts were preserved. No commit or push was performed.

Response 02 repairs the atomic registration race, post-action fail-soft summary boundary, and transient tab-close claim coordination.

## Fresh-intent topology law

`topologyPlanV2` normalizes through C3 and computes desired/current/missing/excess counts from enabled, integer-bound, non-stale workers using canonical roles. Each removal and creation action reloads v2 state and recomputes the plan; it does not reuse a stale desired-count snapshot. A C12 single-flight promise deduplicates concurrent service-worker reconcile calls without becoming authority. Desired-count changes remain intent-only; C12 does not invoke topology reconciliation recursively from the C11 setters.

## Canonical removal eligibility and pre-unregister proof

`removableWorkerV2` requires enabled, topology-managed, integer-bound, role-matching, unassigned, non-faulted, non-rotating, non-rotation-pending, non-cooldown, canonical-idle workers. Availability is resolved through the accepted C2 runtime/heartbeat law, so a fresh busy heartbeat is protected while a stale busy heartbeat is idle-eligible. Candidates are ordered newest `registeredAt` first with deterministic worker-ID ordering.

Before unregister, C12 revalidates the exact worker ID, role, topology-managed flag, enabled state, tab ID, window identity, no-assignment custody, and C2 idle eligibility inside the same mutate transaction that invokes the accepted C9 `unregisterWorkerV2` operation. An assignment acquired after preview therefore fails closed and is never requeued by topology removal. Completing custody is likewise never passed to unregister.

After a durable removal, C12 reuses accepted C9 cleanup semantics: live heartbeat deletion, bounded alarm cleanup, badge cleanup, and identity-scoped registration removal notification occur only after commit. A transient in-memory tab-close claim is acquired before exact unregister and held through cleanup/close; C10 v2 registration refuses that tab while the claim exists. Fresh state must prove no worker owns the captured tab; rebound tabs are skipped. A captured window is removed only when its populated tab set is exactly the captured tab; otherwise the captured tab is considered separately. Read/get/remove failures become cleanup warnings and cannot invert `removed`; the claim is released in `finally` on every path.

## Creation and no-overcreate law

For each missing canonical role, C12 fresh-reads before creating a ChatGPT window, performs bounded window creation/tab discovery/readiness, fresh-reads again before registration, and closes an unregistered window when the desired count has been met by another actor. The final count proof and C10 `upsertWorkerBindingV2` bind occur inside one `mutateFleet` transaction, so a concurrent manual registration cannot produce a second worker. The accepted C10 post-registration cleanup/identity helper is reused after that commit. A successful durable registration is irreversible for this operation. The post-registration `topology.worker_created` journal is guarded by an exact worker/tab/role proof; journal or cleanup failure is diagnostic only and never closes the registered window or rolls back the worker. The loop reloads and recomputes counts after every creation, preventing over-creation under manual registration or desired-count races.

Stale-binding reconciliation runs first through the accepted C9 v2 path. If it fails, C12 records the error and continues only after a fresh v2 state remains available; it does not infer stale availability.

## Result and post-commit behavior

The v2 result is minimal and contains only:

`{ created, removed, deferredRemovals, errors, cleanupWarnings, counts: { desired, current } }`

Only durable transitions completed in this invocation enter `created` or `removed`. `deferredRemovals` is computed from final fresh excess counts. The final state read is bounded/fail-soft; if it fails after durable actions, C12 returns the action arrays, a warning, and the best last-authenticated counts rather than rejecting or hanging. One explicit-time `topology.reconciled` journal is attempted after the action loops; a diagnostic journal failure is reported as a cleanup warning without rollback. Scheduling is fire-and-forget after reconciliation and cannot invert the result. The v1 branch remains delegated to the preserved legacy reconcile function and retains its legacy snapshot/result behavior.

## Validation evidence

- C12 focused: **11/11 pass**
- C1-C11 focused: **139/139 pass**
- M0-M6 focused: **129/129 pass**
- all copied `fleet-*` tests: **404/404 pass**
- all candidate tests: **457/457 pass**
- `node --check` background/C12/fleet-worker: pass
- `git diff --check`: pass
- C12 zero-legacy/topology-path scans: pass
- authoritative main tracked-production protection: pass; `git -C /workspace/ai_sandbox/extension_chromium diff --quiet -- .`

## Remaining bounded scope

C13+ owns worker enablement, update-policy, workspace/goal APIs, operator task/message/retry/clear APIs, clear-completed, M6 public snapshot/control-pane wiring, and final C1 persistence/load-save and global zero-legacy cutover. None was started.

**C12 READY_FOR_VERIFY. M7 ACTIVE.**
