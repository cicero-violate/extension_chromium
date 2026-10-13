#!/usr/bin/env bash
set -euo pipefail
# Developer verification only: no browser stop/start, extension reload or deployment.
ROOT="$(cd "$(dirname "$0")/.." && pwd -P)"
cd "$ROOT"
echo '== D19 read-only inspector regressions =='
node --test "$ROOT/devtools/audit.test.mjs"
echo '== Fleet controller safety regressions =='
python3 -m unittest discover -s "$ROOT/ops" -p test_fleetctl.py -q
echo '== Extension + strongest adversarial regressions =='
"$ROOT/ops/fleetctl" test
echo '== Source syntax =='
node --check "$ROOT/devtools/audit-core.mjs"
node --check "$ROOT/devtools/audit.mjs"
node --check "$ROOT/devtools/audit.test.mjs"
echo '== PASS: source-only checks, no browser mutation =='
