# ChatGPT Private Chat Perf Override (Standalone)

This extension now combines two layers:

1. `perf_override.js` freezes older DOM turns to reduce memory/layout pressure.
2. A React-boundary bundle patch redirects the heavy ChatGPT conversation chunk to a patched copy that short-circuits selected old-turn widgets before they subscribe and scan the full thread.

## What is patched

- Old-turn search/status footer widgets
- Old-turn sources footnote widgets
- Old-turn fast-navigation widgets
- Heavy memory citation resolution in long threads
- Heavy deep-research task widgets in long threads

## Limits

- Built specifically for `https://chatgpt.com` and the saved asset hash `1a7ebd5f-csmwtrlxfshzkvs8.js`.
- If OpenAI changes that asset hash or rewrites the relevant components, the redirect rule will need to be updated.
