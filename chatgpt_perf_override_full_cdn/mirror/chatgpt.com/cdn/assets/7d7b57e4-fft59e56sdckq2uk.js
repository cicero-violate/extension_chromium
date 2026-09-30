import {
    c as qe,
    r as d,
    j as C
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    g as Ee,
    a as Ie
} from "./6cb574fa-ewz4lvzvh0154hdn.js";
import {
    Z as je
} from "./31cec8d8-j4linhdlo3s8o8v8.js";
import {
    g as Ae
} from "./8ad92f11-dff614f59ztoslhd.js";
import {
    f_ as Me,
    aO as Le,
    af as xe
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    o as Ge,
    q as He
} from "./1bc04b52-nn3a79pgrrxatkgx.js";
import {
    b as Oe,
    E as Pe,
    S as De
} from "./1bc04b52-c6spp0aq3f71sxih.js";
import {
    o as Fe
} from "./22724723-hcq7pr9e9rdzi53r.js";
const Ke = "q9tKkq_readonly",
    Ue = "q9tKkq_viewer",
    We = "q9tKkq_wrapLines",
    Re = {
        readonly: Ke,
        viewer: Ue,
        wrapLines: We
    },
    $e = 500,
    re = new Map;

function Be(n) {
    const e = re.get(n);
    if (e != null) return e;
    const s = Ie(n).finally(() => {
        re.get(n) === s && re.delete(n)
    });
    return re.set(n, s), s
}

function Ve(n) {
    const e = new Set;
    for (const s of n) {
        const u = s.getRules().matchAll(/\.([^\s.{:]+)\s+\.cm-(?:content|cursor|dropCursor|activeLine|activeLineGutter)\b/g);
        for (const i of u) {
            const h = i[1];
            h.length > 0 && e.add(h)
        }
    }
    return [...e].join(" ")
}

function Ze(n) {
    const e = n.current ? .getRootNode();
    return e instanceof Document || e instanceof ShadowRoot ? e : null
}

function oe(n, e, s) {
    if (s.length === 0) return;
    const o = n[n.length - 1];
    if (o ? .className === e) {
        o.text += s;
        return
    }
    n.push({
        className: e,
        text: s
    })
}

function we(n) {
    return n.length === 0 ? [] : [{
        className: null,
        text: n
    }]
}

function ze(n) {
    const e = [];
    let s = 0;
    for (const o of n) {
        const u = o.text.split(`
`);
        for (let i = 0; i < u.length; i += 1) {
            const h = u[i];
            h.length > 0 && (e.push(C.jsx("span", {
                className: o.className ? ? void 0,
                children: h
            }, `text-${s}`)), s += 1), i < u.length - 1 && (e.push(C.jsx("br", {}, `br-${s}`)), s += 1)
        }
    }
    return e
}

function ve(n, e, s, o, u) {
    if (o >= u) return [];
    const i = [];
    let h = o;
    return Ge(e, {
        style: p => He(s, p)
    }, (p, w, f) => {
        p > h && oe(i, null, n.slice(h, p)), w > p && oe(i, f, n.slice(p, w)), h = w
    }, o, u), h < u && oe(i, null, n.slice(h, u)), i
}

function Xe(n, e, s) {
    const o = n.parse(e);
    return {
        appendOnly: s != null && e.startsWith(s.code),
        cache: {
            code: e,
            tree: o
        }
    }
}
const it = n => {
    "use forget";
    const e = qe.c(85),
        {
            className: s,
            id: o,
            code: u,
            language: i,
            isStreaming: h,
            wrapLines: p
        } = n,
        w = o === void 0 ? "code-block-viewer" : o,
        f = h === void 0 ? !1 : h,
        Ce = p === void 0 ? !1 : p,
        Ne = d.useRef(null),
        ce = d.useRef(0),
        {
            isDarkMode: he
        } = Me();
    let b;
    e[0] !== he ? (b = Ae(he), e[0] = he, e[1] = b) : b = e[1];
    const ge = b;
    let k;
    e[2] !== ge ? (k = Oe.create({
        extensions: [ge]
    }), e[2] = ge, e[3] = k) : k = e[3];
    const g = k;
    let q;
    e[4] !== g ? (q = g.facet(Pe.styleModule), e[4] = g, e[5] = q) : q = e[5];
    const x = q;
    let I;
    e[6] !== x ? (I = Ve(x), e[6] = x, e[7] = I) : I = e[7];
    const ae = I;
    let j;
    e[8] !== i ? (j = () => i == null ? null : Ee(i), e[8] = i, e[9] = j) : j = e[9];
    const [Te, A] = d.useState(j);
    let M, G;
    e[10] !== i ? (G = () => {
        const r = ce.current = ce.current + 1;
        if (i == null) {
            A(null);
            return
        }
        const t = Ee(i);
        if (t != null) {
            A(t);
            return
        }
        A(null), Be(i).then(L => {
            r === ce.current && A(L)
        })
    }, M = [i], e[10] = i, e[11] = M, e[12] = G) : (M = e[11], G = e[12]), d.useEffect(G, M);
    let H, O;
    e[13] !== x ? (H = () => {
        const r = Ze(Ne);
        r != null && x.length > 0 && De.mount(r, x)
    }, O = [x], e[13] = x, e[14] = H, e[15] = O) : (H = e[14], O = e[15]), d.useEffect(H, O);
    const l = u ? ? "",
        c = Te ? .language.parser ? ? null,
        T = d.useRef(null);
    let v;
    e[16] !== l ? (v = we(l), e[16] = l, e[17] = v) : v = e[17];
    let P;
    e[18] !== l.length || e[19] !== v ? (P = {
        highlightedSegments: v,
        highlightedLength: l.length
    }, e[18] = l.length, e[19] = v, e[20] = P) : P = e[20];
    const [R, be] = d.useState(P), ue = d.useRef(R);
    let D;
    e[21] === Symbol.for("react.memo_cache_sentinel") ? (D = r => {
        ue.current = r, be(r)
    }, e[21] = D) : D = e[21];
    const S = Le(D);
    let F;
    e[22] !== g || e[23] !== c || e[24] !== l || e[25] !== S ? (F = r => {
        const t = r === void 0 ? l : r,
            L = c;
        if (L == null) {
            T.current = null, S({
                highlightedSegments: we(t),
                highlightedLength: t.length
            });
            return
        }
        const se = L.parse(t);
        T.current = {
            code: t,
            tree: se
        }, S({
            highlightedSegments: ve(t, se, g, 0, t.length),
            highlightedLength: t.length
        })
    }, e[22] = g, e[23] = c, e[24] = l, e[25] = S, e[26] = F) : F = e[26];
    const a = Le(F);
    let K;
    e[27] !== a || e[28] !== g || e[29] !== c || e[30] !== l || e[31] !== S ? (K = () => {
        const r = c,
            t = l,
            {
                highlightedLength: L,
                highlightedSegments: se
            } = ue.current;
        if (r == null) {
            S({
                highlightedSegments: we(t),
                highlightedLength: t.length
            });
            return
        }
        if (t.length <= L) {
            t.length < L && a(t);
            return
        }
        const ie = Xe(r, t, T.current);
        if (T.current = ie.cache, !ie.appendOnly || L === 0) {
            S({
                highlightedSegments: ve(t, ie.cache.tree, g, 0, t.length),
                highlightedLength: t.length
            });
            return
        }
        const _e = [...se],
            ke = ve(t, ie.cache.tree, g, L, t.length);
        for (const ye of ke) oe(_e, ye.className, ye.text);
        S({
            highlightedSegments: _e,
            highlightedLength: t.length
        })
    }, e[27] = a, e[28] = g, e[29] = c, e[30] = l, e[31] = S, e[32] = K) : K = e[32];
    const fe = Le(K);
    let U;
    e[33] !== fe ? (U = () => {
        fe()
    }, e[33] = fe, e[34] = U) : U = e[34];
    let W;
    e[35] === Symbol.for("react.memo_cache_sentinel") ? (W = {
        leading: !1,
        trailing: !0
    }, e[35] = W) : W = e[35];
    const m = Fe(U, $e, W);
    let $;
    e[36] !== a ? ($ = () => {
        a()
    }, e[36] = a, e[37] = $) : $ = e[37];
    let B;
    e[38] !== a || e[39] !== g || e[40] !== c ? (B = [a, g, c], e[38] = a, e[39] = g, e[40] = c, e[41] = B) : B = e[41], d.useEffect($, B);
    let V, Z;
    e[42] !== a || e[43] !== f || e[44] !== l ? (V = () => {
        if (f || T.current ? .code === l) return;
        const r = window.requestAnimationFrame(() => {
            a(l)
        });
        return () => {
            window.cancelAnimationFrame(r)
        }
    }, Z = [a, f, l], e[42] = a, e[43] = f, e[44] = l, e[45] = V, e[46] = Z) : (V = e[45], Z = e[46]), d.useEffect(V, Z);
    let z;
    e[47] !== f || e[48] !== c || e[49] !== l.length || e[50] !== m ? (z = () => {
        !f || c == null || l.length > ue.current.highlightedLength && m()
    }, e[47] = f, e[48] = c, e[49] = l.length, e[50] = m, e[51] = z) : z = e[51];
    let X;
    e[52] !== f || e[53] !== c || e[54] !== l || e[55] !== m ? (X = [f, c, l, m], e[52] = f, e[53] = c, e[54] = l, e[55] = m, e[56] = X) : X = e[56], d.useEffect(z, X);
    let J, Q;
    e[57] !== m ? (J = () => () => {
        m.cancel()
    }, Q = [m], e[57] = m, e[58] = J, e[59] = Q) : (J = e[58], Q = e[59]), d.useEffect(J, Q);
    let Y;
    e[60] !== R.highlightedLength || e[61] !== l ? (Y = l.slice(R.highlightedLength), e[60] = R.highlightedLength, e[61] = l, e[62] = Y) : Y = e[62];
    const ee = Y;
    let de;
    e: {
        if (ee.length === 0) {
            de = R.highlightedSegments;
            break e
        }
        let r;e[63] !== ee ? (r = {
            className: null,
            text: ee
        }, e[63] = ee, e[64] = r) : r = e[64];
        let t;e[65] !== R.highlightedSegments || e[66] !== r ? (t = [...R.highlightedSegments, r], e[65] = R.highlightedSegments, e[66] = r, e[67] = t) : t = e[67],
        de = t
    }
    const me = de;
    let te;
    e[68] !== me ? (te = ze(me), e[68] = me, e[69] = te) : te = e[69];
    const pe = te;
    let N;
    e[70] !== s ? (N = xe("relative z-0 flex max-w-full", s), e[70] = s, e[71] = N) : N = e[71];
    const Se = Ce && Re.wrapLines;
    let _;
    e[72] !== Se || e[73] !== ae ? (_ = xe(Re.viewer, Se, "cm-editor", je.composer, "light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch", ae), e[72] = Se, e[73] = ae, e[74] = _) : _ = e[74];
    let ne;
    e[75] === Symbol.for("react.memo_cache_sentinel") ? (ne = xe("cm-content", Re.readonly), e[75] = ne) : ne = e[75];
    let y;
    e[76] !== pe ? (y = C.jsx("div", {
        className: "cm-scroller",
        children: C.jsx("div", {
            className: ne,
            children: pe
        })
    }), e[76] = pe, e[77] = y) : y = e[77];
    let E;
    e[78] !== w || e[79] !== _ || e[80] !== y ? (E = C.jsx("div", {
        id: w,
        dir: "ltr",
        ref: Ne,
        className: _,
        children: y
    }), e[78] = w, e[79] = _, e[80] = y, e[81] = E) : E = e[81];
    let le;
    return e[82] !== N || e[83] !== E ? (le = C.jsx("div", {
        className: N,
        children: E
    }), e[82] = N, e[83] = E, e[84] = le) : le = e[84], le
};
export {
    it as C
};
//# sourceMappingURL=7d7b57e4-fft59e56sdckq2uk.js.map