import {
    r as n,
    j as t
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    af as c
} from "./4813494d-javwxs2rmzsrunl2.js";
const b = n.createContext({
    rootBordered: !1
});

function h({
    children: e
}) {
    return t.jsx("thead", {
        children: t.jsx("tr", {
            children: e
        })
    })
}

function j({
    textAlign: e = "left",
    children: r,
    className: s = "",
    onClick: o
}) {
    const {
        rootBordered: a
    } = n.useContext(b);
    return t.jsx("th", {
        onClick: o,
        className: c("text-token border-token-border-medium bg-token-main-surface-primary sticky top-0 z-10 border-b-[0.5px] py-2 font-semibold", a ? "px-3" : "pe-4 last:pe-0", e === "left" ? "text-start" : e === "right" ? "text-end" : "text-center", s, {
            "hover:text-token-text-tertiary cursor-pointer": o != null
        }),
        children: r
    })
}

function y({
    children: e,
    ...r
}) {
    return t.jsx("tbody", { ...r,
        children: e
    })
}
const v = n.forwardRef(function({
    children: r,
    disabled: s = !1,
    onClick: o,
    className: a,
    tabIndex: i,
    ariaLabel: l,
    role: d
}, f) {
    return t.jsx("tr", {
        tabIndex: i,
        ref: f,
        ...s ? {
            "data-disabled": !0
        } : {},
        className: c(s ? "pointer-events-none" : "", o ? "hover:bg-token-interactive-bg-tertiary-hover cursor-pointer" : "", a),
        onClick: o,
        "aria-label": l,
        role: d,
        children: r
    })
});

function R({
    textAlign: e = "left",
    verticalAlign: r = "top",
    children: s,
    className: o,
    divClassName: a = "min-h-[40px] items-center",
    colSpan: i,
    wrap: l = !1
}) {
    const {
        rootBordered: d
    } = n.useContext(b);
    return t.jsx("td", {
        className: c("border-token-border-medium border-b-[0.5px]", r === "top" ? "align-top" : r === "bottom" ? "align-bottom" : "align-middle", d ? "px-3" : "pe-4 last:pe-0 [tr:last-child_&]:border-b-0", e && "text-" + e, o),
        colSpan: i,
        style: l ? {
            overflowWrap: "anywhere"
        } : void 0,
        children: t.jsx("div", {
            className: c("flex [tr[data-disabled=true]_&]:opacity-50", e === "right" && "justify-end", e === "center" && "justify-center", a),
            children: s
        })
    })
}

function w({
    children: e
}) {
    return t.jsx("div", {
        className: "text-md flex items-center justify-end gap-2",
        children: e
    })
}

function T({
    children: e,
    fixed: r = !1,
    className: s,
    size: o = "normal",
    bordered: a = !1,
    disableScroll: i = !1
}) {
    const l = n.useRef(null),
        d = n.useRef(null),
        [f, m] = n.useState(!1);
    return n.useEffect(() => {
        const u = l.current,
            x = d.current;
        if (u && x) {
            const p = new ResizeObserver(() => {
                m(x.scrollHeight > u.clientHeight)
            });
            return p.observe(u), () => p.disconnect()
        }
    }, []), t.jsx(b.Provider, {
        value: {
            rootBordered: a
        },
        children: t.jsx("div", {
            className: c("text-token-text-primary", !i && "overflow-y-auto", a && "border-token-border-default rounded-lg border", o === "normal" ? "text-base" : "text-sm", f && "pe-1", s),
            ref: l,
            children: t.jsx("table", {
                className: c("w-full border-separate border-spacing-0", r && "table-fixed"),
                ref: d,
                children: e
            })
        })
    })
}
const C = {
    Root: T,
    Header: h,
    HeaderCell: j,
    Body: y,
    Row: v,
    Cell: R,
    Actions: w
};
export {
    C as T
};
//# sourceMappingURL=16d1c905-kzb9nx2txdax2vhp.js.map