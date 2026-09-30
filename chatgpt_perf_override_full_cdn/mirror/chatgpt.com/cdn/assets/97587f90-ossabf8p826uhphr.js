import {
    r as x,
    c as b,
    j as r
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    dS as F,
    cO as L,
    df as K,
    lL as A,
    j7 as U
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    aF as w,
    aG as G,
    aH as C,
    aI as V,
    aJ as q,
    aK as z,
    aL as D,
    aM as O
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    g as Q
} from "./089c718c-l3mqz3tt2i5t2xnq.js";
const Z = x.createContext(void 0);

function W(n) {
    const e = L.getConversationTurns(n),
        t = e.findIndex(a => a.role === K.Assistant);
    if (t === -1) return;
    const i = e[t];
    for (let a = 0; a < i.messageGroups.length; a++)
        if (i.messageGroups[a].type === A.SearchGPTQuery) {
            const l = i.messageGroups.slice(a + 1).find(({
                type: c
            }) => c === A.Text);
            if (l == null) return;
            const o = U(l.messages[0]);
            if (o ? .[0] ? .type === "navigation") return {
                turnIndex: t,
                navigationCitation: o[0],
                message: l.messages[0]
            }
        }
}

function $(n, e) {
    if (e == null || n == null) return n;
    const t = new Set(n.domains.map(i => i.url));
    return { ...n,
        domains: [...n.domains, ...e.domains.filter(i => !t.has(i.url))],
        safe_urls: [...n.safe_urls ? ? [], ...e.safe_urls ? ? []]
    }
}

function ee(n) {
    "use forget";
    const e = b.c(4),
        {
            query: t
        } = n;
    let i, a;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (i = w({
        isUserTurn: !0
    }), a = Q(!0), e[0] = i, e[1] = a) : (i = e[0], a = e[1]);
    let s;
    return e[2] !== t ? (s = r.jsx(G, {
        horizontalPadding: "standard",
        children: r.jsx(C, {
            className: i,
            children: r.jsx("div", {
                className: a,
                children: r.jsx(V, {
                    containsImagesOrAttachments: !1,
                    children: r.jsx(q, {
                        text: t
                    })
                })
            })
        })
    }), e[2] = t, e[3] = s) : s = e[3], s
}

function se(n) {
    "use forget";
    const e = b.c(32),
        {
            conversation: t,
            prefetchNavlink: i,
            clearPrefetchNavlink: a
        } = n,
        s = x.use(i);
    let l;
    e[0] !== s ? .timing ? (l = () => {
        window.__oai_SSR_NAVLINK && z.logEvent("Search Tool Page Load Time To Fast Nav SSR", {
            server_timing: s ? .timing
        }, window.__oai_SSR_NAVLINK)
    }, e[0] = s ? .timing, e[1] = l) : l = e[1];
    const o = x.useEffectEvent(l);
    let c;
    e[2] !== o ? (c = () => {
        o()
    }, e[2] = o, e[3] = c) : c = e[3];
    let _;
    e[4] === Symbol.for("react.memo_cache_sentinel") ? (_ = [], e[4] = _) : _ = e[4], x.useEffect(c, _);
    let v, h;
    e[5] !== a || e[6] !== s ? (v = () => {
        s == null && a()
    }, h = [s, a], e[5] = a, e[6] = s, e[7] = v, e[8] = h) : (v = e[7], h = e[8]), x.useEffect(v, h);
    let R;
    e: {
        if (s == null) {
            R = null;
            break e
        }
        const M = s.navlink;
        let g;e[9] !== s.navlink.domains ? (g = s.navlink.domains.map(B), e[9] = s.navlink.domains, e[10] = g) : g = e[10];
        let E;e[11] !== s.navlink || e[12] !== g ? (E = { ...M,
            domains: g
        }, e[11] = s.navlink, e[12] = g, e[13] = E) : E = e[13],
        R = E
    }
    const j = R,
        k = F(t.id, W),
        I = k ? .navigationCitation;
    let S;
    e[14] !== j || e[15] !== I ? (S = $(j, I), e[14] = j, e[15] = I, e[16] = S) : S = e[16];
    const p = S;
    if (s == null || p == null) return null;
    let m;
    e[17] === Symbol.for("react.memo_cache_sentinel") ? (m = w({
        isUserTurn: !1
    }), e[17] = m) : m = e[17];
    const P = k ? .turnIndex ? ? 2,
        y = k ? .message;
    let u;
    e[18] !== t || e[19] !== p || e[20] !== P || e[21] !== y ? (u = r.jsx(D, {
        conversation: t,
        turnIndex: P,
        nextMessage: y,
        navigationCitation: p
    }), e[18] = t, e[19] = p, e[20] = P, e[21] = y, e[22] = u) : u = e[22];
    let f;
    e[23] !== u || e[24] !== m ? (f = r.jsx(C, {
        className: m,
        children: u
    }), e[23] = u, e[24] = m, e[25] = f) : f = e[25];
    let d;
    e[26] !== t || e[27] !== f ? (d = r.jsx("div", {
        className: "mt-10",
        children: r.jsx(G, {
            conversation: t,
            horizontalPadding: "standard",
            children: f
        })
    }), e[26] = t, e[27] = f, e[28] = d) : d = e[28];
    let T;
    e[29] === Symbol.for("react.memo_cache_sentinel") ? (T = r.jsx(O, {
        scriptSrc: "requestAnimationFrame(()=>window.__oai_SSR_NAVLINK=window.__oai_SSR_NAVLINK||performance.now());"
    }), e[29] = T) : T = e[29];
    let N;
    return e[30] !== d ? (N = r.jsxs("div", {
        children: [d, T]
    }), e[30] = d, e[31] = N) : N = e[31], N
}

function B(n) {
    return { ...n,
        subtitle: n.subtitle ? ? n.domain
    }
}
export {
    Z as P, ee as a, se as b
};
//# sourceMappingURL=97587f90-ossabf8p826uhphr.js.map