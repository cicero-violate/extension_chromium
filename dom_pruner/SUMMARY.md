content.js — Completely replaced. Removed: DOM pruning logic, COMPOSER_ONLY_MODE, keepLast, prune(), findContainerAndItems(), collectMessageItems(), isMessageItem(), isProtectedNode(), and all related helpers. Replaced with: a single
<style> injection of content-visibility: auto; contain-intrinsic-size: auto 1200px targeting [data-testid*="conversation-turn"]. A lightweight MutationObserver re-injects the style if SPA navigation drops the <head> element. HUD stays,
shows turn count + dom node count. Debug API renamed to window.__chatContainDebug().

service_worker.js — Stripped to just the install handler that seeds default config. Removed: getActiveChatTab(), PRUNE_NOW message forwarding, tabs permission dependency.

popup.js — Removed keepLast display and pruneNow button. Kept enabled + debug toggles.

popup.html — Removed keepLast row and Prune Now button. Added a one-line description of what the extension actually does.

manifest.json — Name: "Chat DOM Containment", version 2.0.0, description updated. No permissions changes needed (still just storage).

Why this works: content-visibility: auto tells the browser to skip layout, style recalculation, and paint for any turn that's outside the viewport. During streaming (when a new token is appended to the last message), layout reflow is now
 bounded to only the visible turns (~3–5) instead of all 374. That's the 59% layout CPU load dropping to roughly 1/100th of its current cost.
