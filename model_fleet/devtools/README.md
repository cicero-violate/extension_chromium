# Model Fleet devtools

Read-only observability and repeatable validation. This directory is
deliberately separate from ops/fleetctl, runtime source, release artifacts,
and authenticated browser profiles. Never use these scripts to edit
extension state or claim Genesis acceptance.

## Inspect a live development lane

    node model_fleet/devtools/audit.mjs --port 9225
    node model_fleet/devtools/audit.mjs --port 9226
    node model_fleet/devtools/audit.mjs --port 9226 --strict

The inspector requires an explicit port: 9225 (Dev) or 9226 (NEXT).
It refuses personal ChatGPT on 9222, Canon on 9223, Release on 9224, and
arbitrary ports. It checks the exact installed extension path and profile
identity, compares every installed file's bytes and SHA-256 against its own
tested installation receipt, then uses only a read-only Chrome runtime
projection to count tasks, assignments, messages, registered worker records,
and healing status.

The report deliberately omits user messages, task instructions, prompts,
cookies, access tokens, complete URLs, and raw Chrome profile content.
The sourceMatchesReceipt field establishes installed-source self-consistency;
it is not a substitute for independent source acceptance or Release proof.

The inspector never wakes a worker. If the MV3 service worker is sleeping,
the report will say WORKER_DORMANT and cannot establish runtime custody.
This is normal for an idle browser. A sleeping worker must not be treated as
proof of missing tasks, healthy state, or a disabled extension.

The --strict option returns nonzero unless installed source and a read-only
runtime projection are both available. It checks diagnostic completeness,
not operational health or acceptance: a blocked healing epoch is still
readable, but remains blocked. Source mismatch and ambiguous worker
identity fail in all modes.

To wake the isolated NEXT service worker using its identity-checked
lifecycle without restarting the browser, use:

    model_fleet/ops/fleetctl next verify

Then retry the audit on 9226. No devtools command automatically
registers workers or replays work.

## Source and regression checks

    model_fleet/devtools/check.sh

This runs the inspector's dedicated tests, the fleetctl safety suite,
the full extension regressions, and the strongest adversarial tests.
It does not commit, deploy, stop/start Chromium, sign in, or edit
runtime state.

## Authority boundaries

- The existing 9225 Dev session owns a blocked R4 epoch and retained evidence.
  Do not clear its storage, close registered worker tabs, or force reload.
- NEXT 9226 uses its own profile and V15-derived installed extension. It
  still needs interactive ChatGPT sign-in for meaningful R2/R4 verification.
- Release 9224 remains gated. No devtools command promotes source or accepts
  R2-R6.
- Original source and acceptance receipts remain in docs/. Local private
  checkpoints stay in /workspace/.local/state/ and are not published.
