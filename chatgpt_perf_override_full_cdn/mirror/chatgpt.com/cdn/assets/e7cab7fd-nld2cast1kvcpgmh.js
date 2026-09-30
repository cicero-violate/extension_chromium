import {
    r as S,
    R as E
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    m as q
} from "./66c6e910-ol9d5wxhynx9q2is.js";
const _ = S.createContext(void 0),
    L = {};
_.Provider;
const D = () => S.useContext(_) ? S.useContext(_) : L,
    y = typeof window > "u" ? global : window,
    p = "@griffel/";

function P(e, t) {
    return y[Symbol.for(p + e)] || (y[Symbol.for(p + e)] = t), y[Symbol.for(p + e)]
}
const I = P("DEFINITION_LOOKUP_TABLE", {}),
    g = "data-make-styles-bucket",
    B = "data-priority",
    R = 7,
    x = "___",
    H = x.length + R,
    K = 0,
    M = 1;

function U(e) {
    const t = e.length;
    if (t === R) return e;
    for (let n = t; n < R; n++) e += "0";
    return e
}

function T(e, t, n = []) {
    return x + U(q(e + t))
}

function b(e, t) {
    let n = "",
        s = "";
    for (const r in e) {
        const o = e[r];
        if (o === 0) {
            s += r + " ";
            continue
        }
        const i = Array.isArray(o),
            c = t === "rtl" ? (i ? o[1] : o) + " " : (i ? o[0] : o) + " ";
        n += c, s += c
    }
    return [n.slice(0, -1), s.slice(0, -1)]
}

function N(e, t) {
    const n = {};
    for (const s in e) {
        const [r, o] = b(e[s], t);
        if (o === "") {
            n[s] = "";
            continue
        }
        const i = T(o, t),
            c = i + (r === "" ? "" : " " + r);
        I[i] = [e[s], t], n[s] = c
    }
    return n
}
const v = {};

function X() {
    let e = null,
        t = "",
        n = "";
    const s = new Array(arguments.length);
    for (let l = 0; l < arguments.length; l++) {
        const m = arguments[l];
        if (typeof m == "string" && m !== "") {
            const u = m.indexOf(x);
            if (u === -1) t += m + " ";
            else {
                const C = m.substr(u, H);
                u > 0 && (t += m.slice(0, u)), n += C, s[l] = C
            }
        }
    }
    if (n === "") return t.slice(0, -1);
    const r = v[n];
    if (r !== void 0) return t + r;
    const o = [];
    for (let l = 0; l < arguments.length; l++) {
        const m = s[l];
        if (m) {
            const u = I[m];
            u && (o.push(u[K]), e = u[M])
        }
    }
    const i = Object.assign.apply(Object, [{}].concat(o)),
        [c, a] = b(i, e),
        f = T(a, e, s),
        d = f + " " + c;
    return v[n] = d, I[f] = [i, e], t + d
}

function $(e) {
    return Array.isArray(e) ? e : [e]
}

function z(e, t, n, s) {
    const r = [];
    if (s[g] = t, s[B] = String(n), e)
        for (const i in s) e.setAttribute(i, s[i]);

    function o(i) {
        return e ? .sheet ? e.sheet.insertRule(i, e.sheet.cssRules.length) : r.push(i)
    }
    return {
        elementAttributes: s,
        insertRule: o,
        element: e,
        bucketName: t,
        cssRules() {
            return e ? .sheet ? Array.from(e.sheet.cssRules).map(i => i.cssText) : r
        }
    }
}
const Q = ["r", "d", "l", "v", "w", "f", "i", "h", "a", "s", "k", "t", "m", "c"],
    w = Q.reduce((e, t, n) => (e[t] = n, e), {});

function j(e, t, n) {
    return (e === "m" ? e + t : e) + n
}

function G(e, t, n, s, r = {}) {
    var o, i;
    const c = e === "m",
        a = (o = r.m) !== null && o !== void 0 ? o : "0",
        f = (i = r.p) !== null && i !== void 0 ? i : 0,
        d = j(e, a, f);
    if (!s.stylesheets[d]) {
        const l = t && t.createElement("style"),
            m = z(l, e, f, Object.assign({}, s.styleElementAttributes, c && {
                media: a
            }));
        s.stylesheets[d] = m, t && l && t.head.insertBefore(l, V(t, n, e, s, r))
    }
    return s.stylesheets[d]
}

function k(e, t, n) {
    var s, r;
    const o = t + ((s = n.m) !== null && s !== void 0 ? s : ""),
        i = e.getAttribute(g) + ((r = e.media) !== null && r !== void 0 ? r : "");
    return o === i
}

function V(e, t, n, s, r = {}) {
    var o, i;
    const c = w[n],
        a = (o = r.m) !== null && o !== void 0 ? o : "",
        f = (i = r.p) !== null && i !== void 0 ? i : 0;
    let d = h => c - w[h.getAttribute(g)],
        l = e.head.querySelectorAll(`[${g}]`);
    if (n === "m") {
        const h = e.head.querySelectorAll(`[${g}="${n}"]`);
        h.length && (l = h, d = F => s.compareMediaQueries(a, F.media))
    }
    const m = h => k(h, n, r) ? f - Number(h.getAttribute("data-priority")) : d(h),
        u = l.length;
    let C = u - 1;
    for (; C >= 0;) {
        const h = l.item(C);
        if (m(h) > 0) return h.nextSibling;
        C--
    }
    return u > 0 ? l.item(0) : t ? t.nextSibling : null
}

function A(e, t) {
    try {
        e.insertRule(t)
    } catch {}
}
let W = 0;
const Y = (e, t) => e < t ? -1 : e > t ? 1 : 0;

function Z(e = typeof document > "u" ? void 0 : document, t = {}) {
    const {
        classNameHashSalt: n,
        unstable_filterCSSRule: s,
        insertionPoint: r,
        styleElementAttributes: o,
        compareMediaQueries: i = Y
    } = t, c = {
        classNameHashSalt: n,
        insertionCache: {},
        stylesheets: {},
        styleElementAttributes: Object.freeze(o),
        compareMediaQueries: i,
        id: `d${W++}`,
        insertCSSRules(a) {
            for (const f in a) {
                const d = a[f];
                for (let l = 0, m = d.length; l < m; l++) {
                    const [u, C] = $(d[l]), h = G(f, e, r || null, c, C);
                    c.insertionCache[u] || (c.insertionCache[u] = f, s ? s(u) && A(h, u) : A(h, u))
                }
            }
        }
    };
    return c
}
const J = () => {
    const e = {};
    return function(n, s) {
        e[n.id] === void 0 && (n.insertCSSRules(s), e[n.id] = !0)
    }
};

function ee(e, t, n = J) {
    const s = n();
    let r = null,
        o = null;

    function i(c) {
        const {
            dir: a,
            renderer: f
        } = c, d = a === "ltr";
        return d ? r === null && (r = N(e, a)) : o === null && (o = N(e, a)), s(f, t), d ? r : o
    }
    return i
}

function te() {
    return typeof window < "u" && !!(window.document && window.document.createElement)
}
const O = E.useInsertionEffect ? E.useInsertionEffect : void 0,
    ne = () => {
        const e = {};
        return function(n, s) {
            if (O && te()) {
                O(() => {
                    n.insertCSSRules(s)
                }, [n, s]);
                return
            }
            e[n.id] === void 0 && (n.insertCSSRules(s), e[n.id] = !0)
        }
    },
    se = S.createContext(Z());

function oe() {
    return S.useContext(se)
}
const re = S.createContext("ltr");

function ie() {
    return S.useContext(re)
}

function ce(e, t) {
    const n = ee(e, t, ne);
    return function() {
        const r = ie(),
            o = oe();
        return n({
            dir: r,
            renderer: o
        })
    }
}
const le = ce({
        root: {
            mc9l5x: "f1w7gpdv",
            Bg96gwp: "fez10in",
            ycbfsm: "fg4l7m0"
        },
        rtl: {
            Bz10aip: "f13rod7r"
        }
    }, {
        d: [".f1w7gpdv{display:inline;}", ".fez10in{line-height:0;}", ".f13rod7r{-webkit-transform:scaleX(-1);-moz-transform:scaleX(-1);-ms-transform:scaleX(-1);transform:scaleX(-1);}"],
        t: ["@media (forced-colors: active){.fg4l7m0{forced-color-adjust:auto;}}"]
    }),
    ue = (e, t) => {
        const {
            title: n,
            primaryFill: s = "currentColor",
            ...r
        } = e, o = { ...r,
            title: void 0,
            fill: s
        }, i = le(), c = D();
        return o.className = X(i.root, t ? .flipInRtl && c ? .textDirection === "rtl" && i.rtl, o.className), n && (o["aria-label"] = n), !o["aria-label"] && !o["aria-labelledby"] ? o["aria-hidden"] = !0 : o.role = "img", o
    },
    de = (e, t, n, s) => {
        const r = t === "1em" ? "20" : t,
            o = S.forwardRef((i, c) => {
                const a = { ...ue(i, {
                        flipInRtl: s ? .flipInRtl
                    }),
                    ref: c,
                    width: t,
                    height: t,
                    viewBox: `0 0 ${r} ${r}`,
                    xmlns: "http://www.w3.org/2000/svg"
                };
                return S.createElement("svg", a, ...n.map(f => S.createElement("path", {
                    d: f,
                    fill: a.fill
                })))
            });
        return o.displayName = e, o
    };
export {
    de as c
};
//# sourceMappingURL=e7cab7fd-nld2cast1kvcpgmh.js.map