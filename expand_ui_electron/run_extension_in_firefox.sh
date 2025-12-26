#!/bin/bash
# Save as run_extension_with_bridge.sh

set -e

# Get the current script directory
EXTENSION_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Find the Firefox default profile
PROFILE_DIR=$(find ~/.mozilla/firefox -name "*default-release*" -type d | head -1)

if [ -z "$PROFILE_DIR" ]; then
  echo "Error: Could not find default-release profile directory"
  exit 1
fi

echo "Using profile directory: $PROFILE_DIR"
echo "Using extension directory: $EXTENSION_DIR"


# Launch Firefox with web-ext
EXTENSION_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$EXTENSION_DIR"
web-ext run --source-dir="$EXTENSION_DIR" \
  --firefox=/usr/bin/firefox \
  --firefox-profile="$PROFILE_DIR" \
  --keep-profile-changes \
  --start-url="about:debugging#/runtime/this-firefox" \
  --start-url="https://chatgpt.com/" \
  --start-url="https://claude.ai" \
  --start-url="https://chat.deepseek.com/" \
  --start-url="https://grok.com/" 

# Script ends, Claude bridge will be killed by trap
