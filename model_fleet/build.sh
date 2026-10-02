#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if ! rustup target list --installed 2>/dev/null | grep -qx 'wasm32-unknown-unknown'; then
  echo "Missing Rust target wasm32-unknown-unknown." >&2
  echo "Install it with:" >&2
  echo "  rustup target add wasm32-unknown-unknown" >&2
  exit 2
fi

cargo build --release --target wasm32-unknown-unknown
cp target/wasm32-unknown-unknown/release/approval_hint_wasm.wasm extension/approval_hint_wasm.wasm
ls -lh extension/approval_hint_wasm.wasm
cargo test
