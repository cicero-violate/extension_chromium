import {
    r as m,
    j as e
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    R as g,
    I as p
} from "./1bc04b52-i0x0p81rb595org5.js";
import {
    af as o,
    b5 as f
} from "./4813494d-javwxs2rmzsrunl2.js";

function j({
    ariaLabel: n,
    isCompact: t = !1,
    size: r = "small",
    className: i,
    leftItem: l,
    onChange: u,
    rightItem: s,
    value: a
}) {
    const c = a === l.value,
        x = m.useId();
    return e.jsx(g, {
        type: "single",
        "aria-label": n,
        onClick: () => {
            u(c ? s.value : l.value)
        },
        value: a,
        className: o("bg-token-main-surface-tertiary cursor-pointer rounded-full p-1 select-none", i),
        children: e.jsxs("div", {
            className: "relative grid h-full grid-cols-2 gap-1",
            children: [e.jsx(d, { ...l,
                isCompact: t,
                size: r,
                isSelected: a === l.value,
                highlightLayoutId: x
            }), e.jsx(d, { ...s,
                isCompact: t,
                size: r,
                isSelected: a === s.value,
                highlightLayoutId: x
            })]
        })
    })
}

function d({
    ariaLabel: n,
    isSelected: t,
    label: r,
    value: i,
    isCompact: l = !1,
    size: u = "small",
    className: s,
    highlightLayoutId: a
}) {
    return e.jsxs("div", {
        className: o("relative z-10 h-full text-center font-medium", u === "large" ? "px-6 py-2 text-sm" : o("px-3", l ? "py-1 text-xs" : "py-1.5 text-sm")),
        children: [e.jsx(p, {
            "aria-label": n,
            className: o({
                "box-content h-full": !0,
                "text-token-text-primary": t,
                "text-token-text-tertiary": !t
            }),
            value: i,
            children: r
        }), t ? e.jsx(f.div, {
            transition: {
                duration: .05
            },
            layoutId: a,
            className: o("bg-token-bg-primary absolute inset-0 -z-10 box-content h-full rounded-full shadow-sm", s)
        }) : null]
    })
}
export {
    j as S
};
//# sourceMappingURL=c816d342-i01x53wgy40jgq48.js.map