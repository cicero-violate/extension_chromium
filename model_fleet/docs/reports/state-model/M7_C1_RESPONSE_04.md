# M7 C1 Response 04

## Result

`C1 READY_FOR_VERIFY`; M7 remains `ACTIVE`. C2 was not started.

Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`  
HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`

No browser/CDP interaction, live `chrome.storage` access, dependency change, commit, or push occurred.

## Exact M5B final fault law

C1 `normalizeV2FleetState()` now matches the accepted M5B final runtime/fault validator:

- `fault.code` is a nonempty string of at most 80 characters and one of `dispatch-failed`, `heartbeat-custody-mismatch`, `chat-rotation-failed`, `m4-custody-contradiction`, or `legacy-blocked`;
- `fault.message` is a string of at most 2000 characters;
- `fault.at` is finite and positive;
- `fault.assignmentId` may be absent, `undefined`, or `null`; otherwise it must be a nonempty string.

The C1 validator rejects unknown/overlong codes, overlong messages, empty assignment IDs, and nonpositive/nonfinite timestamps. It accepts the M5B-permitted absent/undefined/null assignment-ID forms.

## Exact worker identity law

Every v2 worker entry must be an object whose `id` exactly equals its worker-map key. Missing IDs and wrong IDs now reject deterministically. C1 v1 pre-normalization materializes IDs before migration, so source-faithful migrated workers remain valid.

## Already-v2 C1↔M5B acceptance matrix

The focused final-boundary matrix compares C1 normalization with the accepted M5B `convertV2WorkerRuntime()` consumer for:

- exact worker identity, missing identity, wrong identity;
- runtime heartbeat finite/nonnegative validation;
- boolean runtime busy validation;
- null/nonempty runtime reported assignment IDs;
- every canonical fault code;
- unknown and overlong fault codes;
- fault messages at 2000 and 2001 characters;
- fault timestamps at zero and positive values;
- fault assignment ID absent, explicitly `undefined`, `null`, nonempty, and empty.

C1 and M5B agree on the acceptance set. C1 may return its own `M7_C1_BLOCKED` diagnostic, but does not accept a state M5B rejects.

## Preserved M1/M2 and migration parity

The previous repairs remain intact:

- running assignment heartbeat-custody mismatch rejects;
- duplicate `taskId`/`taskIds` representation rejects;
- control inbox/control-notices lookup parity remains;
- source-faithful v1 pre-normalization preserves durable ID/reference rewriting, role aliases, legacy max-turn fallback, worker history fields, top-level defaults, bounded history, and explicit migration timestamps;
- M2 quiescence evidence remains fail-closed for active custody, live heartbeat custody, pending completion, rotation, pending rotation, and malformed residues;
- v2-key-first reads, exactly-once migration, and zero-write blocked migration remain unchanged;
- no scheduler/mutator C2 wiring was started.

## Validation

- C1 focused: **18/18 pass**
- copied M0-M6 focused: **129/129 pass**
- copied candidate `fleet-*`: **272/272 pass**
- `node --check extension/fleet-state-model-m7-c1.js`: pass
- `node --check extension/background.js`: pass
- `git diff --check`: pass
- main tracked production protection: pass; unchanged tracked `background.js`, `fleet-worker.js`, `control-pane.js`, and `manifest.json` in the authoritative checkout

## Candidate status and protection

Candidate C1 artifacts remain limited to the inert persistence-boundary hook, browser-compatible C1 helper, and C1 tests; copied M0-M6 artifacts remain preserved. Existing v1 scheduler/mutator call sites remain untouched for C2+.

The authoritative main checkout remains unchanged for tracked production files. C1 is ready for independent verification; M7 remains `ACTIVE`.
