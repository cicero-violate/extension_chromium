import {
    r as f,
    j as e,
    o as g
} from "./2340486e-dvd8m80i7d6hyild.js";
import j from "./a2e12fbe-efn5f3ec8mo4hr2i.js";
import v from "./d5fa12f2-jwpmhuor5ljwmxl3.js";
import {
    j0 as w
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    W as b
} from "./dcadf3b0-bn6a8zmyx2ysg1i5.js";
import {
    co as C,
    cp as _,
    az as M,
    aA as k
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function P({
    path: t,
    lineRangeStart: n,
    lineRangeEnd: r,
    gitUrl: a
}) {
    const [i, l] = f.useState(!1), s = f.useContext(b), c = f.useRef(null), o = f.useRef(null), u = f.useRef(null), p = () => {
        u.current && (clearTimeout(u.current), u.current = null), l(!0)
    }, x = () => {
        u.current = window.setTimeout(() => {
            l(!1)
        }, 200)
    };
    if (!t) return null;
    const d = s ? .fileSnapshots.find(m => m.path === t);
    if (!d) return null;
    const h = y(n, r, d);
    return h.length ? e.jsxs(C, {
        open: i,
        onOpenChange: l,
        children: [e.jsx(_, {
            asChild: !0,
            onMouseEnter: p,
            onMouseLeave: x,
            children: e.jsx("span", {
                ref: c,
                className: "bg-token-bg-secondary text-token-text-secondary mx-0.5 inline-flex aspect-square size-min cursor-default items-center justify-center rounded-full p-1",
                children: e.jsx(v, {
                    className: "size-[10px]"
                })
            })
        }), e.jsx(M, {
            children: e.jsx(k, {
                ref: o,
                className: "z-50 focus:outline-none",
                side: "right",
                onMouseEnter: p,
                onMouseLeave: x,
                onOpenAutoFocus: m => m.preventDefault(),
                children: e.jsx(N, {
                    snapshot: d,
                    snippetLines: h,
                    lineRangeStart: n,
                    lineRangeEnd: r,
                    gitUrl: a
                })
            })
        })]
    }) : null
}

function N({
    snapshot: t,
    snippetLines: n,
    lineRangeStart: r,
    lineRangeEnd: a,
    gitUrl: i
}) {
    const l = t.path.split(".").pop() ? ? "sh",
        s = n.reduce((o, u) => {
            if (u.trim() === "") return o;
            const p = u.match(/^\s*/),
                x = p ? p[0].length : 0;
            return o === -1 ? x : Math.min(o, x)
        }, -1),
        c = n.map(o => s > 0 ? o.slice(s) : o).join(`
`);
    return e.jsxs("div", {
        className: "bg-token-bg-primary border-token-border-default mx-4 flex max-h-[600px] flex-col rounded-2xl border px-2 pt-2 pb-4 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.05)] focus:outline-none dark:shadow-none",
        children: [c && e.jsx(j, {
            wrapperClassName: "rounded-lg !bg-token-bg-tertiary !border-none mb-3 max-h-[400px] overflow-auto text-xs w-[600px] max-w-full [--sticky-padding-top:var(--header-height)]",
            codeContainerClassName: "!p-2",
            language: l,
            content: c,
            showActionBar: !1
        }), e.jsxs("div", {
            className: "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center justify-between gap-1 px-2 text-sm",
            children: [t.path, e.jsxs("div", {
                className: "text-token-text-tertiary flex items-center gap-1 whitespace-nowrap",
                children: [e.jsx(g, {
                    id: "wham.citation.file.lineRange",
                    defaultMessage: "Lines {lineRangeStart}-{lineRangeEnd}",
                    values: {
                        lineRangeStart: r,
                        lineRangeEnd: a
                    }
                }), i && e.jsx("a", {
                    className: "group flex w-full items-center gap-1 p-1",
                    href: i,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: e.jsx(w, {
                        className: "icon-xs hover:text-token-text-primary"
                    })
                })]
            })]
        })]
    })
}

function y(t, n, r) {
    if (r.contents) {
        const s = r.contents.split(`
`),
            c = Math.max(0, t - 1),
            o = n ? Math.min(s.length, n) : c + 1;
        return s.slice(c, o)
    }
    const a = r.line_range_contents ? .find(s => R(s, t, n));
    if (!a) return [];
    const i = Math.max(t - a.line_range_start, 0),
        l = i + (n - t + 1);
    return a.content.slice(i, l)
}

function R(t, n, r) {
    return n < t.line_range_start ? !1 : !(r > t.line_range_end)
}
export {
    P as W
};
//# sourceMappingURL=58cf4120-j76sbnb31d6rrn3i.js.map