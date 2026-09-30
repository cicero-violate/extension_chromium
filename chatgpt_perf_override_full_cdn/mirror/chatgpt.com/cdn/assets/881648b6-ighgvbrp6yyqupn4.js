import {
    vO as I,
    FC as A,
    Bg as P,
    xf as ee,
    FD as te,
    FE as re,
    x as ne
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    a6 as c,
    a7 as _,
    yl as T,
    ym as se,
    yn as y,
    hJ as E,
    yo as N,
    hI as ie,
    gP as b,
    yp as R,
    q6 as ae,
    yq as oe,
    a8 as k
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    r as O,
    a as B
} from "./1bc04b52-c842ajlk411j0plj.js";
import {
    r as F
} from "./b4c3a217-wf4fzdto4ed5hgv0.js";
import {
    r as M,
    a as le
} from "./1bc04b52-jxd082ldak294kcc.js";
import {
    r as H
} from "./1bc04b52-hpmor2vxay5xyk5e.js";
import {
    t as ce,
    f as ue
} from "./1bc04b52-cvho6b74mdi8rq0h.js";
import {
    k as v
} from "./ce52ae67-pc2givv05uuq8g6l.js";
import {
    defaultUrlTransform as fe
} from "./d4fd05ef-jcd8acyt60dknv7p.js";

function me(e) {
    return !!e && e.type === "entity" && e.category != null && se.includes(e.category)
}

function he(e = {}) {
    const {
        contentReferences: t
    } = e;
    return t ? .length ? t.some(s => s.type === "entity" && s.category === "local_business") ? s => {
        c(s, "list", r => {
            if (r.ordered !== !0) return;
            let i = !1;
            c(r, a => {
                if (!_(a) || a.name !== I) return;
                const o = T(a),
                    l = o == null ? void 0 : t[o];
                if (me(l)) return i = !0, !1
            }), i && (r.ordered = !1)
        })
    } : () => {} : () => {}
}
const G = "disableRichLocalBusiness";

function w(e) {
    return _(e) && e.name === I
}

function U(e, t) {
    const n = T(e);
    return n == null ? void 0 : t[n]
}

function pe(e) {
    return function(n, s) {
        if (!w(n)) return !1;
        const r = U(n, s);
        return r != null && e.matchesRef(r)
    }
}
const de = {
    local_business: {
        matchesRef: y,
        disableProperty: G
    }
};

function ge(e) {
    const t = Array.isArray(e ? .children) ? e.children : [],
        n = s => !s || !_(s) || s.name !== I ? !1 : s.data ? .hProperties ? .displayLayout === "block";
    for (let s = 0; s < t.length - 1; s++) {
        const r = t[s],
            i = t[s + 1];
        if (r ? .type === "list" && n(i)) return !0
    }
    return !1
}

function Ie(e, t) {
    let n = !1;
    return c(e, s => {
        if (s !== e && s.type === "listItem") return E;
        if (!w(s)) return;
        const r = U(s, t);
        if (r != null && y(r)) return n = !0, N
    }), n
}

function _e(e, t) {
    let n = !1;
    return c(e, "list", s => {
        const r = Array.isArray(s.children) ? s.children : [];
        if (!r.length) return;
        let i = !1,
            a = !1;
        for (const o of r) {
            if (o ? .type !== "listItem") continue;
            if (Ie(o, t)) {
                if (i && a) return n = !0, N;
                i = !0;
                continue
            }
            i && (a = !0)
        }
    }), n
}

function ye(e) {
    const t = de[e],
        n = pe(t),
        s = r => r.some(i => y(i));
    return function(i = {}) {
        const {
            contentReferences: a
        } = i;
        return !t || !a ? .length ? () => {} : s(a) ? o => {
            const l = new Set;
            let d = !1,
                f = !1,
                u = !1;
            if (o.type === "root" && (f = ge(o), u = _e(o, a)), c(o, "listItem", m => {
                    let p = 0;
                    c(m, h => {
                        if (h !== m && h.type === "listItem") return E;
                        n(h, a) && (p += 1, l.add(h))
                    }), p > 1 && (d = !0)
                }), c(o, m => {
                    n(m, a) && l.add(m)
                }), !(!d && !f && !u))
                for (const m of l) {
                    const p = m.data ? ? (m.data = {}),
                        h = p.hProperties ? ? (p.hProperties = {});
                    h[t.disableProperty] = !0
                }
        } : () => {}
    }
}
const Re = ye("local_business"),
    Ee = /^([\s\u00A0]*(?:\*\*\s*)?)[–—][\s\u00A0]*/,
    Le = e => e === !0 || e === "true",
    Ae = {
        local_business: {
            matches: (e, t) => y(e) && !Le(t.data ? .hProperties ? .[G])
        }
    },
    Se = e => e.type === "text" && "value" in e && typeof e.value == "string";

function Ne(e) {
    const t = n => n.some(s => y(s));
    return function(s = {}) {
        const {
            contentReferences: r
        } = s, i = Ae[e];
        return !i || !r ? .length ? () => {} : r ? .length ? t(r) ? a => {
            c(a, o => {
                if (o.type !== "listItem") return;
                const l = o;
                let d = !1;
                c(l, f => {
                    if (_(f) && f.name === I) {
                        const u = f.attributes ? .index,
                            m = typeof u == "number" ? u : typeof u == "string" ? Number.parseInt(u, 10) : void 0,
                            p = m == null ? void 0 : r[m];
                        if (!p) return;
                        p && i.matches(p, f) && (d = !0);
                        return
                    }
                    if (d && Se(f)) {
                        const u = f.value.replace(Ee, "$1");
                        if (u !== f.value) return f.value = u, N
                    }
                })
            })
        } : () => {} : () => {}
    }
}
const Ce = Ne("local_business"),
    xe = {},
    Pe = [];

function K(e) {
    const t = e || xe;
    return function(n, s) {
        ie(n, "element", function(r, i) {
            const a = Array.isArray(r.properties.className) ? r.properties.className : Pe,
                o = a.includes("language-math"),
                l = a.includes("math-display"),
                d = a.includes("math-inline");
            let f = l;
            if (!o && !l && !d) return;
            let u = i[i.length - 1],
                m = r;
            if (r.tagName === "code" && o && u && u.type === "element" && u.tagName === "pre" && (m = u, u = i[i.length - 2], f = !0), !u) return;
            const p = ce(m, {
                whitespace: "pre"
            });
            let h;
            try {
                h = v.renderToString(p, { ...t,
                    displayMode: f,
                    throwOnError: !0
                })
            } catch (L) {
                const C = L,
                    x = C.name.toLowerCase();
                s.message("Could not render math with KaTeX", {
                    ancestors: [...i, r],
                    cause: C,
                    place: r.position,
                    ruleId: x,
                    source: "rehype-katex"
                }), x === "parseerror" ? h = v.renderToString(p, { ...t,
                    displayMode: f,
                    strict: "ignore",
                    throwOnError: !1
                }) : h = [{
                    type: "element",
                    tagName: "span",
                    properties: {
                        className: ["katex-error"],
                        style: "color:" + (t.errorColor || "#cc0000"),
                        title: String(L)
                    },
                    children: [{
                        type: "text",
                        value: p
                    }]
                }]
            }
            typeof h == "string" && (h = ue(h, {
                fragment: !0
            }).children);
            const Q = u.children.indexOf(m);
            return u.children.splice(Q, 1, ...h), E
        })
    }
}
const ke = () => e => {
    c(e, t => {
        if (!_(t) || t.name !== A || !Array.isArray(t.children) || t.children.length === 0) return;
        const n = t.data ? ? (t.data = {});
        n.hName = A
    })
};

function ve() {
    return e => {
        c(e, (t, n, s) => {
            if (t.type !== "textDirective") return;
            const r = t;
            if (s == null || typeof n != "number" || r.name !== A || !Array.isArray(r.children) || r.children.length === 0) return;
            const i = s;
            if (Array.isArray(i.children)) return i.children.splice(n, 1, ...r.children), [E, n + r.children.length]
        })
    }
}

function W(e) {
    return e.type === "element"
}

function De(e) {
    return W(e) ? e.tagName === "code" : !1
}

function Te() {
    return function(e) {
        let t = 0;
        c(e, "element", function(n, s, r) {
            De(n) && r && W(r) && r.tagName === "pre" && (n.properties ? ? = {}, n.properties.codeIndex = t++)
        })
    }
}

function z(e) {
    return e.type === "element"
}

function be(e) {
    return z(e) ? e.tagName === "code" : !1
}

function Y() {
    return function(e) {
        c(e, "element", function(t, n, s) {
            be(t) && (s && z(s) && s.tagName === "pre" ? t.properties.inline = !1 : t.properties.inline = !0)
        })
    }
}

function Oe() {
    return e => {
        c(e, {
            tagName: "table"
        }, t => {
            const n = t.children.find(r => g(r, "thead")) ? .children.find(r => g(r, "tr")) ? .children.filter(r => g(r, "th")) ? ? [],
                s = t.children.find(r => g(r, "tbody")) ? .children.filter(r => g(r, "tr")) ? .map(r => r.children.filter(i => g(i, "td"))) ? ? [];
            for (let r = 0; r < n.length; r++) {
                const i = n[r];
                let a = D(i);
                for (let l = 0; l < s.length; l++) a = Math.max(a, D(s[l] ? .[r]));
                const o = a > 160 ? "xl" : a > 100 ? "lg" : a > 40 ? "md" : "sm";
                i.properties["data-col-size"] = o;
                for (let l = 0; l < s.length; l++) s[l] ? .[r] && (s[l][r].properties["data-col-size"] = o)
            }
        })
    }
}

function g(e, t) {
    return e.type === "element" && e.tagName === t
}

function D(e) {
    let t = 0;
    return e && c(e, "text", n => {
        t += n.value.length
    }), t
}
const Be = new Set([te, re]),
    at = e => e.startsWith(ee) || Be.has(e) || e.startsWith("tel:") || e.startsWith("sms:") ? e : fe(e);

function $() {
    return e => {
        c(e, "list", t => {
            for (const n of t.children) n.spread = !0
        })
    }
}

function Fe(e, t) {
    const n = typeof t.value == "string" ? t.value : null;
    if (!n) return k(e);
    const s = e.children ? ? [];
    if (!s.length) return "";
    let r = null;
    for (const a of s) {
        const o = a.position ? .start ? .offset;
        if (o != null) {
            r = o;
            break
        }
    }
    let i = null;
    for (let a = s.length - 1; a >= 0; a--) {
        const o = s[a].position ? .end ? .offset;
        if (o != null) {
            i = o;
            break
        }
    }
    return r != null && i != null && r <= i ? n.slice(r, i) : k(e)
}

function Me() {
    return (e, t) => {
        let n = 0;
        const s = (r, i, a) => {
            const o = r.data ? ? (r.data = {});
            o.hName = P;
            const l = n++;
            o.hProperties = { ...i,
                content: a,
                index: l
            }
        };
        c(e, (r, i, a) => {
            if (oe(r)) {
                if (r.name !== P) return;
                const o = r.position ? .start ? .offset,
                    l = r.position ? .end ? .offset;
                if (o == null || l == null) return;
                const d = Fe(r, t),
                    f = He(r.attributes);
                s(r, f, d);
                return
            }
        })
    }
}

function He(e) {
    if (!e) return {};
    const t = {};
    for (const [n, s] of Object.entries(e)) typeof s == "string" && (t[n] = s);
    return t
}

function ot(e) {
    return t => {
        c(t, n => {
            Object.defineProperties(n, {
                markdownSource: {
                    get() {
                        try {
                            return e.slice(this.position.start.offset, this.position.end.offset)
                        } catch {
                            return ""
                        }
                    }
                }
            })
        })
    }
}

function X() {
    return e => {
        c(e, "textDirective", t => {
            t.data ? .hName || t.name !== I && (t.type = "text", t.value = `:${t.name}`)
        })
    }
}
const Ge = /\u200b/g;

function V() {
    return e => {
        c(e, "text", t => {
            t.value = t.value.replace(Ge, "")
        })
    }
}
const j = [
        [b, {
            singleTilde: !1
        }], H, $, [le, {
            singleDollarTextMath: !1
        }], O, Me, M
    ],
    q = [B, ...R ? [R] : [], F, X, V],
    we = [...j, ...q],
    Ue = [...j, ke, ...q];

function lt({
    highlightEnabled: e,
    isRichLocalBusinessEntityEnabled: t,
    contentReferences: n
}) {
    const s = e ? Ue : we;
    if (!t || !n ? .length) return s;
    const r = [...s];
    return t && r.push([Re, {
        contentReferences: n
    }], he, [Ce, {
        contentReferences: n
    }]), r
}

function Ke() {
    return e => {
        const t = e.position ? .end.offset;
        c(e, "element", (n, s) => {
            const {
                position: r
            } = n;
            if (!r) return;
            const {
                start: i,
                end: a
            } = r, o = i.offset, l = a.offset;
            n.properties ? ? = {}, o != null && (n.properties["data-start"] = o), l != null && (n.properties["data-end"] = l, t === l && (n.properties["data-is-last-node"] = ""), s === e.children.length - 1 && (n.properties["data-is-only-node"] = ""))
        })
    }
}
const ct = [K, Ke, Oe, [ae, {
        target: "_new",
        rel: "noopener noreferrer"
    }], Y, Te],
    ut = [
        [K, {
            output: "mathml"
        }], Y
    ],
    J = [
        [b, {
            singleTilde: !1
        }], H, $, O
    ],
    Z = [M, B, ...R ? [R] : [], F, X, V],
    ft = [...J, ...Z],
    mt = [...J, ve, ...Z],
    We = "1446764205",
    S = "​",
    ze = /["(),]/u,
    Ye = /(?<marker>\*\*|__|\*|_)(?<content>[^\n]+?)\k<marker>(?<suffix>[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF]+)/gu;

function $e(e) {
    return typeof e.enabled == "boolean" ? e.enabled : ne(We, {
        disableExposureLog: e.disableExposureLog ? ? !1
    }).get("show_emphasis_text", !1)
}

function Xe(e) {
    return e.replace(Ye, (t, ...n) => {
        const s = n.at(-1);
        if (s == null || typeof s != "object" || !("marker" in s) || !("content" in s) || !("suffix" in s)) return t;
        const r = s.marker,
            i = s.content,
            a = s.suffix;
        return typeof r != "string" || typeof i != "string" || typeof a != "string" || i.endsWith(S) || !ze.test(i) ? t : `${r}${i}${S}${r}${a}`
    })
}

function Ve(e) {
    let t = "",
        n = 0;
    for (; n < e.length;) {
        if (e[n] === "`") {
            let i = 1;
            for (; e[n + i] === "`";) i++;
            const a = "`".repeat(i),
                o = e.indexOf(a, n + i);
            if (o === -1) {
                t += e.slice(n);
                break
            }
            t += e.slice(n, o + i), n = o + i;
            continue
        }
        const s = e.indexOf("`", n),
            r = s === -1 ? e.length : s;
        t += Xe(e.slice(n, r)), n = r
    }
    return t
}

function je(e) {
    return e.replaceAll(S, "")
}

function ht() {
    return e => {
        c(e, "text", t => {
            t.value = je(t.value)
        })
    }
}

function qe(e) {
    let t = !1;
    return e.split(`
`).map(n => /^\s*(```|~~~)/.test(n) ? (t = !t, n) : t ? n : Ve(n)).join(`
`)
}

function pt(e, t = {}) {
    const n = $e(t);
    return {
        markdown: n ? qe(e) : e,
        shouldStripSeparators: n
    }
}
export {
    G as D, ct as R, we as a, mt as b, ft as c, ut as d, V as e, lt as f, pt as g, ot as h, ht as r, je as s, at as u
};
//# sourceMappingURL=881648b6-ighgvbrp6yyqupn4.js.map