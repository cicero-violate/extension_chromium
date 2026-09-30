const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/fbf44c55-dsw6y1znrgyif7in.js", "assets/2340486e-dvd8m80i7d6hyild.js"]))) => i.map(i => d[i]);
import {
    r as V,
    c as X,
    j as r,
    u as z,
    _ as B
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    hT as H,
    af as E,
    bX as A,
    fk as J,
    ch as K
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    lo as Q
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    _ as U,
    a as W,
    g as Y,
    b as Z,
    d as D,
    v as ee,
    e as F,
    u as te,
    f as ae,
    S as ne,
    c as R
} from "./e2a9a3b9-elvt9b2xa2tub7jv.js";
var oe = ["allowCreateWhileLoading", "createOptionPosition", "formatCreateLabel", "isValidNewOption", "getNewOptionData", "onCreateOption", "options", "onChange"],
    G = function() {
        var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "",
            n = arguments.length > 1 ? arguments[1] : void 0,
            o = arguments.length > 2 ? arguments[2] : void 0,
            i = String(e).toLowerCase(),
            l = String(o.getOptionValue(n)).toLowerCase(),
            c = String(o.getOptionLabel(n)).toLowerCase();
        return l === i || c === i
    },
    T = {
        formatCreateLabel: function(e) {
            return 'Create "'.concat(e, '"')
        },
        isValidNewOption: function(e, n, o, i) {
            return !(!e || n.some(function(l) {
                return G(e, l, i)
            }) || o.some(function(l) {
                return G(e, l, i)
            }))
        },
        getNewOptionData: function(e, n) {
            return {
                label: n,
                value: e,
                __isNew__: !0
            }
        }
    };

function re(a) {
    var e = a.allowCreateWhileLoading,
        n = e === void 0 ? !1 : e,
        o = a.createOptionPosition,
        i = o === void 0 ? "last" : o,
        l = a.formatCreateLabel,
        c = l === void 0 ? T.formatCreateLabel : l,
        v = a.isValidNewOption,
        C = v === void 0 ? T.isValidNewOption : v,
        d = a.getNewOptionData,
        p = d === void 0 ? T.getNewOptionData : d,
        x = a.onCreateOption,
        w = a.options,
        g = w === void 0 ? [] : w,
        h = a.onChange,
        f = U(a, oe),
        P = f.getOptionValue,
        L = P === void 0 ? Z : P,
        y = f.getOptionLabel,
        k = y === void 0 ? Y : y,
        m = f.inputValue,
        $ = f.isLoading,
        I = f.isMulti,
        j = f.value,
        t = f.name,
        s = V.useMemo(function() {
            return C(m, W(j), g, {
                getOptionValue: L,
                getOptionLabel: k
            }) ? p(m, c(m)) : void 0
        }, [c, p, k, L, m, C, g, j]),
        u = V.useMemo(function() {
            return (n || !$) && s ? i === "first" ? [s].concat(D(g)) : [].concat(D(g), [s]) : g
        }, [n, i, $, s, g]),
        S = V.useCallback(function(b, O) {
            if (O.action !== "select-option") return h(b, O);
            var M = Array.isArray(b) ? b : [b];
            if (M[M.length - 1] === s) {
                if (x) x(m);
                else {
                    var N = p(m, m),
                        _ = {
                            action: "create-option",
                            name: t,
                            option: N
                        };
                    h(ee(I, [].concat(D(W(j)), [N]), N), _)
                }
                return
            }
            h(b, O)
        }, [p, m, I, t, s, x, h, j]);
    return F(F({}, f), {}, {
        options: u,
        onChange: S
    })
}
var se = V.forwardRef(function(a, e) {
        var n = te(a),
            o = re(n);
        return V.createElement(ae, H({
            ref: e
        }, o))
    }),
    ie = se;
const le = K(() => B(() =>
    import ("./fbf44c55-dsw6y1znrgyif7in.js"), __vite__mapDeps([0, 1])).then(a => a.DirectorySyncResourceManagedIndication));

function q({
    value: a,
    onChange: e,
    disabled: n = !1,
    options: o,
    onSearch: i,
    placeholder: l,
    trailingComponent: c,
    isLoading: v,
    menuIsOpen: C,
    menuPlacement: d,
    maxMenuHeight: p,
    onMenuOpen: x,
    classNames: w,
    noOptionsMessage: g,
    inputValue: h,
    onKeyDown: f,
    getMultiValueConfig: P
}) {
    const L = z(),
        y = L.formatMessage({
            id: "F+GhgL",
            defaultMessage: "People outside of your workspace cannot be added"
        }),
        k = t => r.jsx(R.IndicatorsContainer, { ...t,
            children: c
        }),
        m = (t, s) => s.context === "value" ? t.label : r.jsxs("div", {
            className: "flex items-center gap-2",
            children: [r.jsxs("div", {
                className: "flex flex-col",
                children: [r.jsx("span", {
                    className: "text-sm",
                    children: t.label
                }), t.sublabel && r.jsx("span", {
                    className: "text-token-text-secondary text-xs",
                    children: t.sublabel
                })]
            }), t.kind === "group" && t.isScimManaged && r.jsx(le, {})]
        });
    return {
        className: "react-select-container min-w-0",
        classNamePrefix: "react-select",
        isMulti: !0,
        isDisabled: n,
        isClearable: !1,
        isLoading: v,
        menuIsOpen: C,
        menuPlacement: d,
        maxMenuHeight: p,
        options: o,
        value: a,
        classNames: w,
        inputValue: h,
        getOptionValue: t => `${t.kind}:${t.id}`,
        getOptionLabel: t => t.label,
        onChange: t => e(t),
        onInputChange: (t, s) => {
            s.action !== "menu-close" && s.action !== "input-blur" && i(t, s)
        },
        placeholder: l,
        openMenuOnFocus: !0,
        openMenuOnClick: !0,
        hideSelectedOptions: !1,
        closeMenuOnSelect: !1,
        backspaceRemovesValue: !0,
        controlShouldRenderValue: !0,
        components: {
            DropdownIndicator: () => null,
            ClearIndicator: () => null,
            IndicatorsContainer: k,
            MultiValue: t => {
                const s = t.data,
                    u = P ? .(s),
                    S = u ? .tone ? ? "default",
                    b = u ? .removeOnChipClick ? ? !0,
                    O = "m-1 rounded-md border px-1.5 py-1 text-sm transition-colors",
                    M = {
                        danger: "bg-token-bg-status-error text-token-interactive-label-danger-secondary-default border-token-interactive-border-danger-secondary-default",
                        default: "text-token-text-primary bg-token-bg-tertiary border-transparent hover:bg-token-bg-secondary hover-border-token-border-light"
                    },
                    N = E(O, b ? "cursor-pointer" : "cursor-default", M[S] ? ? M.default, u ? .className),
                    _ = b ? r.jsx("div", {
                        className: N,
                        role: "button",
                        tabIndex: 0,
                        ...t.removeProps,
                        children: r.jsxs("span", {
                            className: "flex min-w-0 items-center gap-1",
                            children: [u ? .leadingIcon, r.jsx("span", {
                                className: "min-w-0",
                                children: t.children
                            }), u ? .trailingIcon, r.jsx(A, {
                                className: "icon-sm"
                            })]
                        })
                    }) : r.jsx("div", {
                        className: N,
                        children: r.jsxs("span", {
                            className: "flex min-w-0 items-center gap-1",
                            children: [u ? .leadingIcon, r.jsx("span", {
                                className: "min-w-0",
                                children: t.children
                            }), u ? .trailingIcon, r.jsx("button", {
                                type: "button",
                                className: "inline-flex cursor-pointer items-center border-0 bg-transparent p-0",
                                ...t.removeProps,
                                children: r.jsx(A, {
                                    className: "icon-sm"
                                })
                            })]
                        })
                    });
                return u ? .tooltip ? r.jsx(R.MultiValue, { ...t,
                    children: r.jsx(J, {
                        label: u.tooltip,
                        side: "top",
                        delayDuration: 150,
                        children: _
                    })
                }) : r.jsx(R.MultiValue, { ...t,
                    children: _
                })
            },
            Option: t => {
                const {
                    isFocused: s,
                    isSelected: u,
                    innerProps: S,
                    innerRef: b,
                    data: O
                } = t;
                return r.jsx("div", { ...S,
                    ref: b,
                    className: E("cursor-pointer rounded-md p-2", u ? "bg-token-interactive-bg-secondary-press" : s ? "bg-token-interactive-bg-secondary-hover" : "bg-transparent"),
                    children: m(O, {
                        context: "menu"
                    })
                })
            },
            MultiValueRemove: () => null
        },
        formatOptionLabel: m,
        noOptionsMessage: t => g ? g(t) : y,
        loadingMessage: () => L.formatMessage(Q.loading),
        filterOption: (t, s) => t.data.label.toLowerCase().includes(s.toLowerCase()) || (t.data.sublabel ? ? "").toLowerCase().includes(s.toLowerCase()),
        onKeyDown: f,
        onMenuOpen: x
    }
}

function me(a) {
    "use forget";
    const e = X.c(2),
        n = q(a);
    let o;
    return e[0] !== n ? (o = r.jsx(ne, { ...n
    }), e[0] = n, e[1] = o) : o = e[1], o
}

function ge(a) {
    "use forget";
    const e = X.c(16);
    let n, o, i, l, c;
    e[0] !== a ? ({
        onCreateOption: l,
        isValidNewOption: i,
        formatCreateLabel: n,
        getMultiValueConfig: o,
        ...c
    } = a, e[0] = a, e[1] = n, e[2] = o, e[3] = i, e[4] = l, e[5] = c) : (n = e[1], o = e[2], i = e[3], l = e[4], c = e[5]);
    let v;
    e[6] !== o || e[7] !== c ? (v = { ...c,
        getMultiValueConfig: o
    }, e[6] = o, e[7] = c, e[8] = v) : v = e[8];
    const C = q(v);
    let d;
    e[9] !== i ? (d = (x, w, g) => i ? .(x) ? ? !0, e[9] = i, e[10] = d) : d = e[10];
    let p;
    return e[11] !== C || e[12] !== n || e[13] !== l || e[14] !== d ? (p = r.jsx(ie, { ...C,
        onCreateOption: l,
        isValidNewOption: d,
        formatCreateLabel: n
    }), e[11] = C, e[12] = n, e[13] = l, e[14] = d, e[15] = p) : p = e[15], p
}
export {
    ge as C, me as S
};
//# sourceMappingURL=daf50f1d-kdq76fgiseqm0e6u.js.map