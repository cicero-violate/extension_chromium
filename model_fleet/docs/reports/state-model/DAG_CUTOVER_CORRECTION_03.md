# DAG Cutover Correction 03

## Assigned scope

Repair the authoritative plan only. Keep M0 and M1 at `VERIFY`, M2 at `TODO`, and do not implement M2 or change M0/M1 tests, production source, browser/fleet state, dependencies, commit state, or push state.

## Exact corrections

1. `docs/architecture/STATE_MODEL_CLEANUP_TODO.md:1012` now says:

```text
Status: TODO
```

This removes the stale M2 `Status: READY`. The DAG table at lines 885-895 and immediate-next-action at lines 1544-1556 consistently keep M0/M1 at VERIFY and M2-M9 at TODO.

2. `docs/architecture/STATE_MODEL_CLEANUP_TODO.md:877` now states that M5A/M5B may proceed as independent isolated v2 contract/test work after M4, must not wire or modify production `background.js`, `fleet-worker.js`, or `control-pane.js` before M7, and may coordinate serially only for shared isolated helper/test artifacts. Production hunk overlap is explicitly deferred to M7.

No M0/M1 tests were changed in this turn.

## Full consistency scan

Exact scans and results:

```text
rtk rg -n '^Status: READY$' model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md
no matches; exit 1 (expected clean result)
```

The ledger status scan shows:

```text
M0 = VERIFY
M1 = VERIFY
M2 = TODO
M3 = TODO
M4 = TODO
M5A = TODO
M5B = TODO
M6 = TODO
M7 = TODO
M8 = TODO
M9 = TODO
```

The M2-M6 actual pre-M7 production-action scan covered lines 1010-1227 and searched for:

```text
live 9222
Switch production load/save
Rename persisted
Update control-pane.js
Make scheduler call
Remove scheduler decisions
no production direct write ... remains outside
```

It produced no matches; exit 1 (expected clean result). Remaining production references in M2-M6 are prohibitions, unchanged-until-M7 statements, or inventories of exact future replacement points, not pre-M7 actions.

The M5A/M5B commentary explicitly contains the required isolated-preparation rule at line 877.

## Validation

Exact final commands and results:

```text
rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs
6 passed, 0 failed

rtk node --test model_fleet/extension/tests/fleet-state-model-m1.test.cjs
10 passed, 0 failed

rtk node --test model_fleet/extension/tests/fleet-*.test.cjs
141 passed, 0 failed

rtk git diff --check
exit 0
```

No browser/CDP or live fleet interaction was performed.

## Worktree and dependency status

HEAD before and after: `02183c4668c214e2a130747ab9b9820b6272cd43`

Status before and after:

```text
?? model_fleet/extension/.#STATE_MODEL_CLEANUP_TODO.md
?? model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md
?? model_fleet/extension/fleet-state-model-m1.cjs
?? model_fleet/extension/tests/fleet-state-model-m0.test.cjs
?? model_fleet/extension/tests/fleet-state-model-m1.test.cjs
```

No files are staged. No production or dependency files changed. No dependency installation or lockfile update was performed.

## Acceptance

Plan correction result: `READY_FOR_VERIFY`. M0/M1 remain VERIFY and M2 remains TODO pending independent acceptance.

## Recommended next action

Independently verify the clean readiness/deployment scan. Only after M0 and M1 are promoted to DONE may M2 become READY and implementation be separately authorized.
