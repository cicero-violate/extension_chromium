Variables: (M=) top-level visible message nodes, (K=3), (C=) composer subtree, (U=) non-message UI, (O=) `MutationObserver`, (P=) prune pass, (R=) removed nodes.
Equation: (P(M)=\max(0,\lvert M\rvert-K)\to R,;; C\cap R=\varnothing,;; U\cap R=\varnothing).
1-line explanation: keep only the newest 3 message nodes in the page DOM, while preserving textbox, scroll root, and extension control surfaces.
**SPEC:** Build a **Chromium extension** using **Manifest V3** with `manifest.json`, `service_worker.js`, `content.js`, and optional `popup.html/js`; inject only on `https://chatgpt.com/*` and `https://chat.openai.com/*`; no Tampermonkey, no Shadow DOM, no CSS hiding. ([Chrome for Developers][1])
**content.js:** run in the page as a **content script**; find the chat message list with a scored detector; observe DOM changes with `MutationObserver`; debounce to one prune per animation frame or short timer; prune on initial load and after each added message. ([Chrome for Developers][2])
**Pruning rule:** remove only **older top-level message items** with `Element.remove()` until exactly 3 remain; never remove the composer, its ancestors, sidebar, header, scroll container, or any node containing active focus/selection; fail closed if container confidence is low. ([MDN Web Docs][3])
**service_worker.js / popup:** provide only ON/OFF toggle, debug toggle, and “Prune now”; persist `{enabled:true, keepLast:3, debug:false}` with `chrome.storage.local`; content script reads config at startup and on change. ([Chrome for Developers][4])
**Acceptance tests:** with (0\le |M|\le3), remove none; with (|M|=4), remove oldest 1; after sending/receiving a message, textbox stays focused and usable; no console errors; `window.__chatPruneDebug()` returns container selector, counts before/after, and abort reason if any.
English: this preserves server-side conversation state, but deliberately sacrifices old in-page scroll/search history to reduce local DOM cost and textbox lag. ([Chrome for Developers][2])
(\max(\text{intelligence},\text{efficiency},\text{correctness},\text{alignment},\text{robustness},\text{performance},\text{scalability},\text{determinism},\text{transparency},\text{collaboration},\text{empowerment},\text{benefit},\text{learning},\text{future\mbox{-}proofing})=\text{good})

[1]: https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3?utm_source=chatgpt.com "Extensions / Manifest V3 - Chrome for Developers"
[2]: https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts?utm_source=chatgpt.com "Content scripts | Chrome for Developers"
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Element/remove?utm_source=chatgpt.com "Element: remove() method - Web APIs | MDN"
[4]: https://developer.chrome.com/docs/extensions/reference/api/storage?utm_source=chatgpt.com "chrome.storage | API - Chrome for Developers"
