# Progressive State Memory P1 — Independent Verification 01

Status: REPAIR_REQUIRED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Baseline/current HEAD: `6ee3bf81a9700c4c3a3b5b00851f911585512248`
Verified: 2026-10-03
Candidate report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P1_RESPONSE_01.md`

## Verdict

P1 is not independently accepted. The isolated module boundary, baseline tests, syntax, durable-state assertions, and full extension regressions are green, but independent adversarial checks falsified four required P1 properties.

P2 must remain PENDING.

## Passing evidence

Independent rerun:

```text
node --test extension/tests/progressive-state-memory-p1.test.cjs
11/11 PASS, 0 failed, 0 skipped

node --check extension/progressive-state-memory-m7-p1.js
PASS

durable PSM JSON/status assertions
PASS

git diff --check
PASS

node --test extension/tests/*.test.cjs
290/290 PASS, 0 failed, 0 skipped
```

The candidate remains isolated from `background.js` and is not runtime-wired.

## Blocking falsifiers

### F1 — source kind is not an authority policy

The admission boundary accepts:

```text
kind: operator.decision
source.kind: report
```

Independent result:

```text
FALSIFIER_REPORT_AS_OPERATOR_AUTHORITY_ACCEPTED=true
```

This contradicts the accepted P0/P1 invariant that reports/prose are evidence and cannot self-admit as current authority. A known source-kind enum is insufficient; admission needs an explicit authority policy/binding for event kinds.

### F2 — storage-key isolation is bypassable

`loadLedger`, `saveLedger`, and `appendEvent` accept an arbitrary caller-provided key. Independent execution successfully wrote the PSM serialization under:

```text
modelFleetState:v2
```

Result:

```text
FALSIFIER_ARBITRARY_STORAGE_KEY_WRITE=modelFleetState:v2
```

This directly defeats the claimed dedicated-key isolation. The P1 persistence contract must not permit a caller to redirect PSM writes into fleet-state authority.

### F3 — concurrent append loses history

Two concurrent `appendEvent` calls both loaded the same empty ledger, both fulfilled, and the final persisted ledger contained only one event.

```text
FALSIFIER_CONCURRENT_RESULTS=fulfilled,fulfilled
FALSIFIER_CONCURRENT_FINAL_EVENT_COUNT=1
FALSIFIER_CONCURRENT_FINAL_IDS=evt-b
```

A public durable append contract that can acknowledge two appends while persisting one is not append-only. P1 must either serialize its append boundary for the supported single-process writer model or make serialization an enforced contract that cannot be bypassed by the exported durable append API.

### F4 — non-plain JSON payload silently changes meaning

A `Date` nested in payload passes validation and is converted by JSON cloning into a string.

```text
FALSIFIER_NONPLAIN_PAYLOAD_TRANSFORMED_TYPE=string 2020-01-01T00:00:00.000Z
```

P1 claims a plain JSON-object payload and rejection of lossy values. Validation must reject non-JSON/plain object types rather than normalize them silently.

## Non-blocking report defect

The candidate report states both `290/290` and later `289/289`. Independent full-suite truth for this verification run is `290/290`. Correct the report when repairing.

## Required bounded repair

Stay in P1. Do not start P2.

1. Add explicit event-kind/source authority validation so non-authoritative sources cannot self-author authoritative event kinds.
2. Remove or hard-restrict arbitrary storage-key override; PSM persistence must target only the dedicated PSM ledger key.
3. Make the exported durable append contract serial for the supported writer model and add a concurrent-append regression proving no acknowledged event is lost.
4. Reject non-plain/lossy payload values recursively; add Date/Map/custom-object style adversarial coverage.
5. Preserve the existing isolated, browser-compatible boundary and all P0 authority constraints.
6. Rerun focused, full, syntax, durable-state, and diff checks.

No commit/push/deploy/reload/live storage mutation is authorized.
