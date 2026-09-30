import {
    c as W,
    j as n,
    u as S,
    o as U,
    L as E,
    h as V
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    bD as $
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    af as F,
    b2 as z
} from "./4813494d-javwxs2rmzsrunl2.js";
var K = (t => (t.DIRECT_PURCHASE = "direct_purchase", t.CHECKOUT = "checkout", t))(K || {});
const O = V({
    featureLinkLabelWithPlanContext: {
        id: "PricingColumnAdvertisedFeatures.featureLinkLabelWithPlanContext",
        defaultMessage: "{linkText} ({planName} plan)"
    }
});

function H(t) {
    return typeof t == "string" || typeof t == "number" ? String(t) : Array.isArray(t) ? t.map(e => H(e)).join("") : ""
}

function T({
    chunks: t,
    planNameForA11y: e,
    intl: o
}) {
    const s = H(t).trim();
    if (!(!e || s === "")) return o.formatMessage(O.featureLinkLabelWithPlanContext, {
        linkText: s,
        planName: e
    })
}

function q(t) {
    "use forget";
    const e = W.c(29),
        {
            feature: o,
            type: s,
            planNameForA11y: c,
            useCompactDesktopBusinessLayout: u
        } = t,
        _ = u === void 0 ? !1 : u,
        a = S(),
        {
            label: r,
            icon: C
        } = o,
        j = z(),
        l = C ? ? $,
        i = s === "checkout",
        m = s === "direct_purchase",
        f = i || m;
    let p;
    e[0] !== a || e[1] !== c ? (p = B => ({
        link: N => n.jsx(E, {
            className: "underline",
            target: "_blank",
            rel: "noopener noreferrer",
            to: B.link ? ? "",
            "aria-label": T({
                chunks: N,
                planNameForA11y: c,
                intl: a
            }),
            children: N
        }),
        b: G,
        article: N => n.jsx(E, {
            className: "underline",
            target: "_blank",
            rel: "noopener noreferrer",
            to: B.article ? ? "",
            "aria-label": T({
                chunks: N,
                planNameForA11y: c,
                intl: a
            }),
            children: N
        })
    }), e[0] = a, e[1] = c, e[2] = p) : p = e[2];
    const L = p;
    let v;
    e[3] !== L || e[4] !== r ? (v = L(r), e[3] = L, e[4] = r, e[5] = v) : v = e[5];
    const P = v,
        A = i && "py-2";
    let d;
    e[6] !== A ? (d = F("relative", A), e[6] = A, e[7] = d) : d = e[7];
    const M = _ && "[@media(min-width:1024px)_and_(max-height:900px)]:gap-3",
        I = (i || m) && "items-center";
    let x;
    e[8] !== M || e[9] !== I ? (x = F("text-l flex cursor-default justify-start gap-3.5", M, I), e[8] = M, e[9] = I, e[10] = x) : x = e[10];
    const R = f ? j ? "#8F8DF6" : "#5856D6" : "primary";
    let h;
    e[11] !== l || e[12] !== R ? (h = n.jsx(l, {
        className: "h-5 w-5 shrink-0",
        "aria-hidden": "true",
        color: R
    }), e[11] = l, e[12] = R, e[13] = h) : h = e[13];
    const w = i && "text-[15px]!";
    let g;
    e[14] !== w ? (g = F("text-token-text-primary min-w-0 font-normal", w), e[14] = w, e[15] = g) : g = e[15];
    let k;
    e[16] !== r || e[17] !== P ? (k = n.jsx(U, { ...r,
        values: P
    }), e[16] = r, e[17] = P, e[18] = k) : k = e[18];
    let b;
    e[19] !== g || e[20] !== k ? (b = n.jsx("div", {
        className: "flex flex-1 items-start gap-2",
        children: n.jsx("span", {
            className: g,
            children: k
        })
    }), e[19] = g, e[20] = k, e[21] = b) : b = e[21];
    let y;
    e[22] !== h || e[23] !== b || e[24] !== x ? (y = n.jsxs("div", {
        className: x,
        children: [h, b]
    }), e[22] = h, e[23] = b, e[24] = x, e[25] = y) : y = e[25];
    let D;
    return e[26] !== y || e[27] !== d ? (D = n.jsx("li", {
        className: d,
        children: y
    }), e[26] = y, e[27] = d, e[28] = D) : D = e[28], D
}

function G(t) {
    return n.jsx("strong", {
        children: t
    })
}

function Y(t) {
    "use forget";
    const e = W.c(17),
        {
            advertisedFeatures: o,
            type: s,
            ariaLabelledBy: c,
            planNameForA11y: u,
            useCompactDesktopBusinessLayout: _
        } = t,
        a = _ === void 0 ? !1 : _;
    if (!o ? .length) return null;
    const r = a && "[@media(min-width:1024px)_and_(max-height:900px)]:mb-0 [@media(min-width:1024px)_and_(max-height:900px)]:gap-3",
        C = s === "checkout" && "mb-3 gap-0!",
        j = s === "direct_purchase" && "gap-3!";
    let l;
    e[0] !== r || e[1] !== C || e[2] !== j ? (l = F("mb-2 flex flex-col gap-5", r, C, j), e[0] = r, e[1] = C, e[2] = j, e[3] = l) : l = e[3];
    let i;
    if (e[4] !== o || e[5] !== u || e[6] !== s || e[7] !== a) {
        let f;
        e[9] !== u || e[10] !== s || e[11] !== a ? (f = (p, L) => n.jsx(q, {
            feature: p,
            type: s,
            planNameForA11y: u,
            useCompactDesktopBusinessLayout: a
        }, L), e[9] = u, e[10] = s, e[11] = a, e[12] = f) : f = e[12], i = o.map(f), e[4] = o, e[5] = u, e[6] = s, e[7] = a, e[8] = i
    } else i = e[8];
    let m;
    return e[13] !== c || e[14] !== l || e[15] !== i ? (m = n.jsx("ul", {
        role: "list",
        "aria-labelledby": c,
        className: l,
        children: i
    }), e[13] = c, e[14] = l, e[15] = i, e[16] = m) : m = e[16], m
}
export {
    K as A, Y as P
};
//# sourceMappingURL=65d684aa-lfcsad63o8z9w3e0.js.map