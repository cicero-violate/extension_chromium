# Progressive State Memory P8 — Independent Verification 01

Status: REPAIR_REQUIRED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Verified HEAD: `741d4c2bdca35d0ce47424c859e7a6084ce70f0f`
Verified: 2026-10-03
Candidate report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P8_RESPONSE_01.md`

## Verdict

P8 is not independently accepted. All declared focused/combined/full regression gates pass, and resolver injection, digest verification, evidence-only selection, source binding, and fail-closed byte-budget execution are sound. Independent falsification found two P8-owned contract defects.

P9 must remain PENDING.

## Passing evidence

- P8 focused: 7/7 PASS
- P1-P8 combined: 77/77 PASS
- full extension suite: 371/371 PASS, 0 failed, 0 skipped
- P8 syntax: PASS
- durable DAG assertions: PASS
- git diff --check: PASS

## Blocking falsifier 1 — hydrated bundle loses part of request identity

`EvidenceHydrationRequestV1` includes `byteBudget`, but `HydratedEvidenceBundleV1` does not.

Independent probe:

- request A: same source/event IDs, `byteBudget = 3`
- request B: same source/event IDs, `byteBudget = 100`
- both requests hydrate the same 3-byte evidence successfully
- the two requests are different
- the resulting bundles are byte-for-byte identical
- the bundle schema rejects adding a `byteBudget` field

Observed:

`REQUESTS_DIFFER=true`
`BUNDLES_IDENTICAL=true`
`BUNDLE_HAS_BYTE_BUDGET=false`
`BUNDLE_BUDGET_FIELD=REJECTED:invalid-hydrated-bundle`

This violates the P8 requirement that the result preserve the exact request identity. It also means standalone bundle validation cannot prove that `totalByteLength` was within the budget that authorized the hydration.

## Blocking falsifier 2 — resolver descriptor is mutable

P8 requires the injected resolver to receive an immutable descriptor copy. Current code passes a cloned plain object but does not freeze it.

Observed:

`RESOLVER_DESCRIPTOR_FROZEN=false`
`RESOLVER_DESCRIPTOR_MUTABLE_TO=resolver-mutated`

The mutation does not currently alter P8 state because the descriptor is a copy, but it violates the explicit resolver-boundary contract and makes the descriptor itself mutable to downstream resolver code.

## Required bounded repair

Stay in P8. Do not start P9.

1. Add `byteBudget` to the exact HydratedEvidenceBundleV1 schema.
2. Hydration must copy the validated plan/request byteBudget into the bundle.
3. Bundle validation must require a positive safe-integer byteBudget and enforce `totalByteLength <= byteBudget` in addition to exact byteLength/digest checks.
4. The bundle must therefore distinguish otherwise identical hydrations authorized under different byte budgets.
5. Preserve deterministic ordering and source/requestedEventIds binding.
6. Pass the resolver an actually immutable descriptor copy. Prefer recursively freezing a fresh descriptor object before invocation; descriptor values are scalar today, but the helper should fail closed rather than relying on caller discipline.
7. Add adversarial tests proving:
   - different byte budgets produce distinguishable valid bundles;
   - forged bundle byteBudget is rejected if below totalByteLength or malformed;
   - removing byteBudget from bundle is rejected;
   - resolver receives `Object.isFrozen(descriptor) === true`;
   - attempted resolver mutation cannot change the descriptor;
   - existing request/index/returned-byte immutability remains intact.
8. Preserve all existing P8 boundaries: no resolver auto-selection, persistence, cache, semantic interpretation, P9 bootstrap, runtime wiring, live storage, commit, push, deploy, or reload.

No P9+ work is authorized.
