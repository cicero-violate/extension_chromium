import {
    c as A,
    u as D,
    j as c
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    b5 as E
} from "./4813494d-javwxs2rmzsrunl2.js";

function W(P) {
    "use forget";
    const e = A.c(27),
        {
            size: L,
            strokeWidth: $,
            arcPercentage: C,
            initialOffset: M,
            ariaMessage: S,
            children: l
        } = P,
        t = L === void 0 ? 60 : L,
        s = $ === void 0 ? 2 : $,
        w = C === void 0 ? .25 : C,
        x = M === void 0 ? 0 : M,
        h = D();
    let f;
    e[0] !== h ? (f = h.formatMessage({
        id: "constantSpinner.ariaLabel",
        defaultMessage: "Loading..."
    }), e[0] = h, e[1] = f) : f = e[1];
    const z = f,
        r = (t - s) / 2,
        N = 2 * Math.PI * r,
        I = N * w,
        p = `${I} ${N-I}`,
        v = S ? ? z,
        g = `0 0 ${t} ${t}`;
    let m, d;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (m = {
        rotate: 360
    }, d = {
        repeat: 1 / 0,
        duration: 1.2,
        ease: "linear"
    }, e[2] = m, e[3] = d) : (m = e[2], d = e[3]);
    const y = t / 2,
        b = t / 2;
    let a;
    e[4] !== r || e[5] !== s || e[6] !== y || e[7] !== b ? (a = c.jsx("circle", {
        className: "text-[var(--sidebar-surface-secondary)]",
        stroke: "currentColor",
        fill: "transparent",
        strokeWidth: s,
        cx: y,
        cy: b,
        r
    }), e[4] = r, e[5] = s, e[6] = y, e[7] = b, e[8] = a) : a = e[8];
    const j = t / 2,
        k = t / 2;
    let i;
    e[9] !== p || e[10] !== x || e[11] !== r || e[12] !== s || e[13] !== j || e[14] !== k ? (i = c.jsx("circle", {
        className: "text-[var(--main-surface-primary-inverse)]",
        stroke: "currentColor",
        fill: "transparent",
        strokeWidth: s,
        strokeDasharray: p,
        strokeDashoffset: x,
        strokeLinecap: "butt",
        cx: j,
        cy: k,
        r
    }), e[9] = p, e[10] = x, e[11] = r, e[12] = s, e[13] = j, e[14] = k, e[15] = i) : i = e[15];
    let n;
    e[16] !== t || e[17] !== a || e[18] !== i || e[19] !== g ? (n = c.jsxs(E.svg, {
        width: t,
        height: t,
        viewBox: g,
        animate: m,
        transition: d,
        children: [a, i]
    }), e[16] = t, e[17] = a, e[18] = i, e[19] = g, e[20] = n) : n = e[20];
    let o;
    e[21] !== l ? (o = l && c.jsx("div", {
        className: "absolute inset-0 flex items-center justify-center",
        children: l
    }), e[21] = l, e[22] = o) : o = e[22];
    let u;
    return e[23] !== n || e[24] !== o || e[25] !== v ? (u = c.jsxs("div", {
        className: "relative flex items-center justify-center",
        role: "progressbar",
        "aria-live": "assertive",
        "aria-label": v,
        children: [n, o]
    }), e[23] = n, e[24] = o, e[25] = v, e[26] = u) : u = e[26], u
}
export {
    W as C
};
//# sourceMappingURL=af004db9-d3svat17gfrlvrrt.js.map