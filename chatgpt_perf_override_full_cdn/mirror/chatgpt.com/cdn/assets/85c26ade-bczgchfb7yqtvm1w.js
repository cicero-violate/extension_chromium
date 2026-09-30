import {
    r as a,
    E as p,
    j as c,
    ao as d
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    yE as r,
    rA as n,
    j as l
} from "./4813494d-javwxs2rmzsrunl2.js";

function _(e) {
    const i = s => s.filter(o => /\.css([?#]|$)/.test(o)),
        t = Object.fromEntries(Object.entries(e.routes).map(([s, o]) => [s, o ? .imports ? { ...o,
            imports: i(o.imports)
        } : o])),
        m = e.entry ? .imports ? { ...e.entry,
            imports: i(e.entry.imports)
        } : e.entry;
    return { ...e,
        entry: m,
        routes: t
    }
}
window.__oai_SSR_HTML ? (r.instance.addFirstTiming("composer.html", {
    time: window.__oai_SSR_HTML,
    serialTimingGroup: "pageLoad",
    source: "inline-script"
}), n.setSubmetric("composerHtmlDurationMs", window.__oai_SSR_HTML - performance.timeOrigin)) : window.__oai_logHTML = () => {
    r.instance.addFirstTiming("composer.html", {
        serialTimingGroup: "pageLoad",
        source: "entry.client"
    }), n.setSubmetric("composerHtmlDurationMs", performance.now())
};
window.__oai_SSR_TTI ? (r.instance.addFirstTiming("composer.visible", {
    time: window.__oai_SSR_TTI,
    serialTimingGroup: "pageLoad",
    source: "inline-script"
}), n.setSubmetric("composerVisibleDurationMs", window.__oai_SSR_TTI - performance.timeOrigin)) : window.__oai_logTTI = () => {
    r.instance.addFirstTiming("composer.visible", {
        serialTimingGroup: "pageLoad",
        source: "entry.client"
    }), n.setSubmetric("composerVisibleDurationMs", performance.now())
};
r.instance.addTiming("entry.client", {
    serialTimingGroup: "pageLoad"
});
n.setSubmetric("entryClientDurationMs", performance.now());
const u = () => {
    const e = window.__reactRouterManifest;
    if (!e || !l().stripModulepreloadImports) return;
    const t = _(e);
    window.__reactRouterManifest = t, window.__reactRouterContext ? .manifest && (window.__reactRouterContext = { ...window.__reactRouterContext,
        manifest: t
    })
};
u();
a.startTransition(() => {
    p.hydrateRoot(document, c.jsxs(a.StrictMode, {
        children: [null, c.jsx(d, {})]
    }), {
        onRecoverableError(e, i) {
            const t = new Error(`${e instanceof Error?e.message:String(e)}`);
            t.name = "RecoverableError", t.stack = i.componentStack ? ? (e instanceof Error ? e.stack : String(e)), t.cause = e, r.instance.addError(t)
        }
    })
});
//# sourceMappingURL=85c26ade-bczgchfb7yqtvm1w.js.map