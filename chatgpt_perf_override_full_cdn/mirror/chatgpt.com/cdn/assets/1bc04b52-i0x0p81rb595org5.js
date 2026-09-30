import {
    r as E,
    j as n,
    f as p
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    ag as G,
    ak as m,
    a8 as S,
    ha as V,
    h7 as k,
    h8 as A,
    h9 as T,
    z5 as M
} from "./4813494d-javwxs2rmzsrunl2.js";
var N = "Toggle",
    h = E.forwardRef((e, r) => {
        const {
            pressed: a,
            defaultPressed: t = !1,
            onPressedChange: s,
            ...u
        } = e, [l = !1, o] = G({
            prop: a,
            onChange: s,
            defaultProp: t
        });
        return n.jsx(m.button, {
            type: "button",
            "aria-pressed": l,
            "data-state": l ? "on" : "off",
            "data-disabled": e.disabled ? "" : void 0,
            ...u,
            ref: r,
            onClick: S(e.onClick, () => {
                e.disabled || o(!l)
            })
        })
    });
h.displayName = N;
var d = "ToggleGroup",
    [C, H] = M(d, [T]),
    j = T(),
    x = p.forwardRef((e, r) => {
        const {
            type: a,
            ...t
        } = e;
        if (a === "single") {
            const s = t;
            return n.jsx(w, { ...s,
                ref: r
            })
        }
        if (a === "multiple") {
            const s = t;
            return n.jsx(F, { ...s,
                ref: r
            })
        }
        throw new Error(`Missing prop \`type\` expected on \`${d}\``)
    });
x.displayName = d;
var [I, _] = C(d), w = p.forwardRef((e, r) => {
    const {
        value: a,
        defaultValue: t,
        onValueChange: s = () => {},
        ...u
    } = e, [l, o] = G({
        prop: a,
        defaultProp: t,
        onChange: s
    });
    return n.jsx(I, {
        scope: e.__scopeToggleGroup,
        type: "single",
        value: l ? [l] : [],
        onItemActivate: o,
        onItemDeactivate: p.useCallback(() => o(""), [o]),
        children: n.jsx(b, { ...u,
            ref: r
        })
    })
}), F = p.forwardRef((e, r) => {
    const {
        value: a,
        defaultValue: t,
        onValueChange: s = () => {},
        ...u
    } = e, [l = [], o] = G({
        prop: a,
        defaultProp: t,
        onChange: s
    }), c = p.useCallback(i => o((g = []) => [...g, i]), [o]), f = p.useCallback(i => o((g = []) => g.filter(y => y !== i)), [o]);
    return n.jsx(I, {
        scope: e.__scopeToggleGroup,
        type: "multiple",
        value: l,
        onItemActivate: c,
        onItemDeactivate: f,
        children: n.jsx(b, { ...u,
            ref: r
        })
    })
});
x.displayName = d;
var [D, B] = C(d), b = p.forwardRef((e, r) => {
    const {
        __scopeToggleGroup: a,
        disabled: t = !1,
        rovingFocus: s = !0,
        orientation: u,
        dir: l,
        loop: o = !0,
        ...c
    } = e, f = j(a), i = k(l), g = {
        role: "group",
        dir: i,
        ...c
    };
    return n.jsx(D, {
        scope: a,
        rovingFocus: s,
        disabled: t,
        children: s ? n.jsx(A, {
            asChild: !0,
            ...f,
            orientation: u,
            dir: i,
            loop: o,
            children: n.jsx(m.div, { ...g,
                ref: r
            })
        }) : n.jsx(m.div, { ...g,
            ref: r
        })
    })
}), v = "ToggleGroupItem", R = p.forwardRef((e, r) => {
    const a = _(v, e.__scopeToggleGroup),
        t = B(v, e.__scopeToggleGroup),
        s = j(e.__scopeToggleGroup),
        u = a.value.includes(e.value),
        l = t.disabled || e.disabled,
        o = { ...e,
            pressed: u,
            disabled: l
        },
        c = p.useRef(null);
    return t.rovingFocus ? n.jsx(V, {
        asChild: !0,
        ...s,
        focusable: !l,
        active: u,
        ref: c,
        children: n.jsx(P, { ...o,
            ref: r
        })
    }) : n.jsx(P, { ...o,
        ref: r
    })
});
R.displayName = v;
var P = p.forwardRef((e, r) => {
        const {
            __scopeToggleGroup: a,
            value: t,
            ...s
        } = e, u = _(v, a), l = {
            role: "radio",
            "aria-checked": e.pressed,
            "aria-pressed": void 0
        }, o = u.type === "single" ? l : void 0;
        return n.jsx(h, { ...o,
            ...s,
            ref: r,
            onPressedChange: c => {
                c ? u.onItemActivate(t) : u.onItemDeactivate(t)
            }
        })
    }),
    L = x,
    U = R;
export {
    U as I, L as R, H as c
};
//# sourceMappingURL=1bc04b52-i0x0p81rb595org5.js.map