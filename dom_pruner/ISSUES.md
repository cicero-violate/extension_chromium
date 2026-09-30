● I have everything I need. Here's the complete CDN patching feasibility analysis:

  ---
  CDN Patching: What's Actually Possible

  What's causing the fiber growth (confirmed)

  In hcm9mo4suepntluq.js at offset ~86000, the turn list renders like this:

  // x = array of ALL turn IDs (from getConversationTurnIds)
  // xd = Zo.memo(vd) — the per-turn component (memoized but always mounted)
  v = x.map(h)  // maps ALL turns unconditionally, no windowing

  No virtual scrolling library exists anywhere in the CDN bundle. Every turn mounts and stays mounted forever. That's 63 fibers × N turns. At 480 turns: ~30,000 fibers, ~650MB heap. There is no other explanation.

  ---
  Option 1: Enable their dormant native content-visibility (page_patch.js — no CDN needed)

  ChatGPT already wrote the code. It's gated behind Statsig flag "1011775750" (default false):

  Po = Hi() && CSS.supports("content-visibility: auto")
    && Vn(r, "1011775750").get("enabled", !1)  // ← always false
    && (a == null || a === "finalAgentTurn") && !Zr(w)

  Their implementation uses contain-intrinsic-size: auto 100lvh (ours uses auto 1200px).

  To enable it: In page_patch.js (already runs in page world), intercept the Statsig SDK before React loads:

  // Override Statsig flag to enable their native content-visibility
  const _defineProperty = Object.defineProperty;
  Object.defineProperty(window, '__STATSIG__', {
    set(v) {
      if (v) {
        const origGetLayer = v.getLayer?.bind(v);
        if (origGetLayer) {
          v.getLayer = function(r, flagName) {
            const layer = origGetLayer(r, flagName);
            if (flagName === "1011775750") {
              return { get: (key, def) => key === "enabled" ? true : def };
            }
            return layer;
          };
        }
      }
      _defineProperty(window, '__STATSIG__', { value: v, writable: true });
    },
    configurable: true
  });

  Verdict: Redundant — our CSS injection already does the same thing. Their implementation also has an extra guard (a === "finalAgentTurn") that restricts it to final turns only. Our CSS injection is broader and already active. Skip.

  ---
  Option 2: Redirect CDN assets via declarativeNetRequest (extension — no proxy needed)

  MV3 supports URL redirects via declarativeNetRequest. The patched file could be served as a web_accessible_resources file within the extension itself.

  What this enables: Serve a modified hcm9mo4suepntluq.js with whatever changes you want, without any external proxy or --host-rules.

  Steps:
  1. Add "declarativeNetRequest" permission to manifest.json
  2. Add a redirect rule: cdn.oaistatic.com/assets/hcm9mo4suepntluq.js → chrome-extension://.../patched_turn.js
  3. Put the patched file in web_accessible_resources

  Problem: The asset filename is hashed (content-hash in the filename). Every ChatGPT deploy changes it. You'd need to match by pattern (wildcard on the hash portion) or update the rule on each deploy. Wildcards in declarativeNetRequest
  URL patterns are possible but limited.

  Verdict: Mechanically works. Brittle against deploys. Best used for targeted, stable patches only.

  ---
  Option 3: Add virtual scrolling (the only real fix for heap growth)

  This is the only thing that actually reduces fiber count.

  What it requires in the CDN code:

  The x.map(h) loop at offset ~87054 in hcm9mo4suepntluq.js needs to become a virtualizer. The parent container already has a scroll container (we already identify and stamp it). The minimum changes:

  1. Bundle a virtualizer (e.g., @tanstack/virtual ~15KB minified) into the patched file
  2. Replace x.map(h) with a virtual list that renders only visible windows + overscan
  3. The virtualizer needs estimated item sizes (turns vary from ~100px to >5000px) — needs a dynamic size estimator with ResizeObserver per turn
  4. Preserve scrollToMessageId behavior (currently a prop that gets passed down)
  5. Preserve the IntersectionObserver logic in bd component (viewport turn tracking)

  Complexity: The minified code has no source maps in the CDN directory (.map files are referenced but not present locally). Editing minified code at this scale is high-risk. Variable-height virtualizing is 200–400 lines of non-trivial
  logic on top of the library API. Scroll anchoring during streaming (new content appends at bottom) needs special handling.

  Verdict: Technically possible via the declarativeNetRequest redirect approach. Estimated effort: 1–2 days of careful work. Very fragile — breaks on every ChatGPT deploy that touches the turn component chunk (which is frequent). The
  filename hash changes whenever the component code changes.

  ---
  Summary: What's worth doing

  ┌──────────────────────────────────┬───────────────────────────────┬──────────────┬────────────────────────────────────┐
  │             Approach             │           Heap fix?           │    Effort    │             Fragility              │
  ├──────────────────────────────────┼───────────────────────────────┼──────────────┼────────────────────────────────────┤
  │ CSS via extension (already done) │ No — layout only              │ ✓ Done       │ Low — selector-based               │
  ├──────────────────────────────────┼───────────────────────────────┼──────────────┼────────────────────────────────────┤
  │ Statsig flag override            │ No — same as above            │ 10 min       │ Medium                             │
  ├──────────────────────────────────┼───────────────────────────────┼──────────────┼────────────────────────────────────┤
  │ declarativeNetRequest redirect   │ Enables CDN patches           │ 1 hour setup │ High — hash filenames              │
  ├──────────────────────────────────┼───────────────────────────────┼──────────────┼────────────────────────────────────┤
  │ Virtual scrolling via CDN patch  │ Yes — eliminates fiber growth │ 1–2 days     │ Very high — breaks on every deploy │
  └──────────────────────────────────┴───────────────────────────────┴──────────────┴────────────────────────────────────┘

  The honest answer: The heap growth cannot be fixed without virtual scrolling. Virtual scrolling via CDN patching is possible but fragile and expensive to maintain. The rendering cost (CPU/layout) is already addressed by what we shipped.
  The memory growth is inherent to ChatGPT's architecture.

  The only low-maintenance option that would actually help would be if OpenAI enables flag "1011775750" themselves (it's already written and deployed, just disabled). That's their call.
