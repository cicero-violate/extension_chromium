# ChatGPT Auto Approval WASM

A minimal Chromium extension that automatically clicks likely ChatGPT approval buttons after scoring nearby controls with a WASM helper.

## Layout

- `src/lib.rs` — small no-std WASM scoring helper.
- `extension/content.js` — DOM bridge for approvals, repeat messages, and bounded stream-error retry.
- `extension/stream-retry.js` — exact error-banner matching and per-turn two-attempt retry gate.
- `extension/tests/stream-retry.test.cjs` — Node regression tests for retry selection, backoff, and wiring.
- `extension/manifest.json` — Manifest V3 extension.
- `build.sh` — builds the WASM and copies it into `extension/`.

## Build

```bash
cd /workspace/ai_sandbox/extension_chromium/auto_approval
./build.sh
```

If needed:

```bash
rustup target add wasm32-unknown-unknown
./build.sh
```

## Load

In Chromium, load unpacked extension:

```text
/workspace/ai_sandbox/extension_chromium/auto_approval/extension
```

## Behavior

The content script looks for a visible `Deny` button, scores enabled sibling buttons in the same row, and clicks the most likely approval action. A short de-dupe window prevents repeat-clicking the same still-visible dialog on every polling cycle.

## Delivery-error retry

Enable **Approval capability** and **Auto retry delivery errors** for the target tab in the extension popup. Auto retry is **OFF by default** because recovery can execute tools a second time. For stream errors, the extension clicks only a visible Retry button in the current-turn error banner. For the exact Message delivery timed out / Please try again banner, it resubmits the latest user message through the live composer. Both paths are bounded to **two attempts per user turn** with a **3-second** retry backoff; successful recovery must clear or advance the failed turn before another attempt. Other error banners, conflicting composer text, and streaming turns are not resubmitted. The budget is in-memory and resets when the page reloads. Confirm idempotence or reconcile tool side effects before enabling on mutation-capable work.

Tests: `node --test extension/tests/stream-retry.test.cjs`. Reload the unpacked extension **and** the ChatGPT tab after modifying content scripts. DOM behavior still requires a manual browser smoke test against ChatGPT.
