import {
    c as N,
    r as v,
    j as s
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    af as E,
    w0 as R,
    fk as z
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    bN as T,
    bO as $
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
const w = v.createContext(null),
    C = () => {
        const a = v.useContext(w);
        if (!a) throw new Error("Section components must be used within a Section.Root");
        return a
    },
    A = a => {
        "use forget";
        const e = N.c(10),
            {
                children: o,
                defaultExpanded: c
            } = a,
            d = c === void 0 ? !0 : c,
            [n, x] = v.useState(d),
            r = v.useId(),
            t = v.useId();
        let l;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (l = () => x(O), e[0] = l) : l = e[0];
        let m;
        e[1] !== t || e[2] !== r || e[3] !== n ? (m = {
            isExpanded: n,
            toggle: l,
            headerId: r,
            contentId: t
        }, e[1] = t, e[2] = r, e[3] = n, e[4] = m) : m = e[4];
        let f;
        e[5] !== o ? (f = s.jsx("div", {
            className: "relative z-0 border-b",
            children: o
        }), e[5] = o, e[6] = f) : f = e[6];
        let i;
        return e[7] !== m || e[8] !== f ? (i = s.jsx(w.Provider, {
            value: m,
            children: f
        }), e[7] = m, e[8] = f, e[9] = i) : i = e[9], i
    },
    D = a => {
        "use forget";
        const e = N.c(8),
            {
                children: o
            } = a,
            {
                isExpanded: c,
                contentId: d,
                headerId: n
            } = C(),
            x = !c,
            r = c && "pb-3";
        let t;
        e[0] !== r ? (t = E("z-0 px-3", r), e[0] = r, e[1] = t) : t = e[1];
        let l;
        return e[2] !== o || e[3] !== d || e[4] !== n || e[5] !== x || e[6] !== t ? (l = s.jsx("div", {
            id: d,
            role: "region",
            "aria-labelledby": n,
            hidden: x,
            className: t,
            children: o
        }), e[2] = o, e[3] = d, e[4] = n, e[5] = x, e[6] = t, e[7] = l) : l = e[7], l
    },
    F = a => {
        "use forget";
        const e = N.c(25),
            {
                children: o,
                tooltip: c,
                accessory: d
            } = a,
            {
                isExpanded: n,
                toggle: x,
                headerId: r,
                contentId: t
            } = C(),
            [l, m] = v.useState(!1),
            f = l ? "border-token-border-default" : "border-transparent";
        let i;
        e[0] !== f ? (i = E("bg-token-bg-elevated-secondary sticky top-0 z-20 flex w-full min-w-0 items-center border-b", f), e[0] = f, e[1] = i) : i = e[1];
        const y = !n && "-rotate-90";
        let u;
        e[2] !== y ? (u = E("icon-sm shrink-0 transition-transform", y), e[2] = y, e[3] = u) : u = e[3];
        let p;
        e[4] !== u ? (p = s.jsx(T, {
            className: u
        }), e[4] = u, e[5] = p) : p = e[5];
        let b;
        e[6] !== o ? (b = s.jsx("span", {
            className: "flex min-w-0 flex-1 items-center gap-2",
            children: o
        }), e[6] = o, e[7] = b) : b = e[7];
        let h;
        e[8] !== t || e[9] !== r || e[10] !== n || e[11] !== p || e[12] !== b || e[13] !== x ? (h = s.jsxs("button", {
            type: "button",
            id: r,
            "aria-controls": t,
            "aria-expanded": n,
            onClick: x,
            className: "text-token-text-secondary focus-visible:ring-token-border-strong flex min-w-0 flex-1 items-center gap-2 rounded-sm px-3 py-3 text-start text-sm focus-visible:ring-1 focus-visible:outline-none",
            children: [p, b]
        }), e[8] = t, e[9] = r, e[10] = n, e[11] = p, e[12] = b, e[13] = x, e[14] = h) : h = e[14];
        let g;
        e[15] !== d ? (g = d && s.jsx("div", {
            className: "ms-auto py-1 ps-2 pe-3",
            children: d
        }), e[15] = d, e[16] = g) : g = e[16];
        let j;
        e[17] !== i || e[18] !== h || e[19] !== g ? (j = s.jsxs("div", {
            className: i,
            children: [h, g]
        }), e[17] = i, e[18] = h, e[19] = g, e[20] = j) : j = e[20];
        const k = j;
        let S;
        e[21] === Symbol.for("react.memo_cache_sentinel") ? (S = s.jsx("span", {
            "aria-hidden": "true",
            className: "pointer-events-none absolute block h-[1px] bg-transparent",
            ref: R({
                options: {
                    threshold: 0
                },
                onChange(H, _) {
                    m(_.intersectionRatio === 0)
                }
            })
        }), e[21] = S) : S = e[21];
        let I;
        return e[22] !== k || e[23] !== c ? (I = s.jsxs(s.Fragment, {
            children: [S, c ? s.jsx(z, {
                side: "left",
                triggerAs: null,
                labelTextAlign: "left",
                label: s.jsx($, {
                    size: "small",
                    className: "text-sm leading-5 font-normal",
                    forceDarkMode: !0,
                    children: c
                }),
                children: k
            }) : k]
        }), e[22] = k, e[23] = c, e[24] = I) : I = e[24], I
    },
    B = {
        Content: D,
        Header: F,
        Root: A
    };

function O(a) {
    return !a
}
export {
    B as S
};
//# sourceMappingURL=fd49efc5-ftydrxgh4y8cl3v6.js.map