import {
    r as i,
    j as a
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    T as P,
    Z as w
} from "./31cec8d8-j4linhdlo3s8o8v8.js";
import {
    co as A,
    cp as C,
    az as F,
    aA as M
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    ak as u,
    h7 as z,
    h8 as B,
    h9 as f,
    z5 as D,
    ha as g,
    a8 as $,
    af as d,
    aV as h
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    c as _,
    R as K,
    I as L
} from "./1bc04b52-i0x0p81rb595org5.js";
var U = "Separator",
    m = "horizontal",
    H = ["horizontal", "vertical"],
    j = i.forwardRef((o, e) => {
        const {
            decorative: r,
            orientation: t = m,
            ...n
        } = o, s = V(t) ? t : m, c = r ? {
            role: "none"
        } : {
            "aria-orientation": s === "vertical" ? s : void 0,
            role: "separator"
        };
        return a.jsx(u.div, {
            "data-orientation": s,
            ...c,
            ...n,
            ref: e
        })
    });
j.displayName = U;

function V(o) {
    return H.includes(o)
}
var W = j,
    b = "Toolbar",
    [Z] = D(b, [f, _]),
    T = f(),
    N = _(),
    [X, R] = Z(b),
    k = i.forwardRef((o, e) => {
        const {
            __scopeToolbar: r,
            orientation: t = "horizontal",
            dir: n,
            loop: s = !0,
            ...l
        } = o, c = T(r), p = z(n);
        return a.jsx(X, {
            scope: r,
            orientation: t,
            dir: p,
            children: a.jsx(B, {
                asChild: !0,
                ...c,
                orientation: t,
                dir: p,
                loop: s,
                children: a.jsx(u.div, {
                    role: "toolbar",
                    "aria-orientation": t,
                    dir: p,
                    ...l,
                    ref: e
                })
            })
        })
    });
k.displayName = b;
var S = "ToolbarSeparator",
    O = i.forwardRef((o, e) => {
        const {
            __scopeToolbar: r,
            ...t
        } = o, n = R(S, r);
        return a.jsx(W, {
            orientation: n.orientation === "horizontal" ? "vertical" : "horizontal",
            ...t,
            ref: e
        })
    });
O.displayName = S;
var q = "ToolbarButton",
    v = i.forwardRef((o, e) => {
        const {
            __scopeToolbar: r,
            ...t
        } = o, n = T(r);
        return a.jsx(g, {
            asChild: !0,
            ...n,
            focusable: !o.disabled,
            children: a.jsx(u.button, {
                type: "button",
                ...t,
                ref: e
            })
        })
    });
v.displayName = q;
var J = "ToolbarLink",
    Q = i.forwardRef((o, e) => {
        const {
            __scopeToolbar: r,
            ...t
        } = o, n = T(r);
        return a.jsx(g, {
            asChild: !0,
            ...n,
            focusable: !0,
            children: a.jsx(u.a, { ...t,
                ref: e,
                onKeyDown: $(o.onKeyDown, s => {
                    s.key === " " && s.currentTarget.click()
                })
            })
        })
    });
Q.displayName = J;
var y = "ToolbarToggleGroup",
    Y = i.forwardRef((o, e) => {
        const {
            __scopeToolbar: r,
            ...t
        } = o, n = R(y, r), s = N(r);
        return a.jsx(K, {
            "data-orientation": n.orientation,
            dir: n.dir,
            ...s,
            ...t,
            ref: e,
            rovingFocus: !1
        })
    });
Y.displayName = y;
var oo = "ToolbarToggleItem",
    ro = i.forwardRef((o, e) => {
        const {
            __scopeToolbar: r,
            ...t
        } = o, n = N(r), s = {
            __scopeToolbar: o.__scopeToolbar
        };
        return a.jsx(v, {
            asChild: !0,
            ...s,
            children: a.jsx(L, { ...n,
                ...t,
                ref: e
            })
        })
    });
ro.displayName = oo;
var eo = k,
    ao = O,
    to = (o => (o.CODE = "code", o.WRITING = "writing", o))(to || {});
const x = ({
        children: o,
        toolbarType: e
    }) => a.jsx(eo, {
        className: d("bg-token-main-surface-primary m-0 flex h-9 w-fit min-w-0 shrink items-center overflow-hidden rounded-xl px-1 dark:bg-[#353535]", P, e === "code" ? "py-0" : "py-1"),
        children: o
    }),
    E = ({
        icon: o,
        hideLabel: e,
        isActive: r,
        label: t,
        subLabel: n,
        iconClassName: s,
        labelClassName: l
    }) => a.jsxs(a.Fragment, {
        children: [o && a.jsx(o, {
            className: d("icon-sm", {
                "me-0.5": !e,
                "text-token-text-tertiary": !e && !r,
                "text-token-text-primary": e && !r,
                "text-token-interactive-label-accent-default hover:text-token-interactive-label-accent-hover": r
            }, s)
        }), !e && a.jsx("span", {
            className: d("truncate text-sm", {
                "text-token-text-primary": !r,
                "text-token-interactive-label-accent-default hover:text-token-interactive-label-accent-hover": r
            }, l),
            children: t
        }), n]
    }),
    G = h(v)
`flex h-full items-center rounded-lg gap-1 px-2 hover:bg-black/5 dark:hover:bg-token-interactive-bg-secondary-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent`, no = ({
    label: o,
    subLabel: e,
    icon: r,
    isDisabled: t = !1,
    isActive: n = !1,
    hideLabel: s = !1,
    onClick: l,
    onMouseDown: c,
    iconClassName: p,
    labelClassName: I
}) => a.jsx(G, {
    onClick: l,
    "aria-label": s ? o : void 0,
    onMouseDown: c,
    disabled: t,
    "aria-pressed": n || void 0,
    "data-state": n ? "on" : void 0,
    children: a.jsx(E, {
        icon: r,
        hideLabel: s,
        label: o,
        subLabel: e,
        isActive: n,
        iconClassName: p,
        labelClassName: I
    })
}), so = ({
    icon: o,
    hideLabel: e,
    label: r,
    children: t,
    align: n = "end"
}) => a.jsxs(A, {
    children: [a.jsx(C, {
        asChild: !0,
        children: a.jsx(G, {
            "aria-label": e ? r : void 0,
            children: a.jsx(E, {
                icon: o,
                hideLabel: e,
                label: r
            })
        })
    }), a.jsx(F, {
        children: a.jsx(M, {
            align: n,
            className: d(w.toolbar, "popover"),
            sideOffset: 8,
            children: t
        })
    })]
});
x.Separator = h(ao)
`mx-1 p-0 list-none h-3 w-[1px] bg-token-border-default`;
x.Action = no;
x.Button = v;
x.Popover = so;
export {
    eo as R, ao as S, to as T, x as a, v as b
};
//# sourceMappingURL=781797c9-j3ifxdswmznku0vx.js.map