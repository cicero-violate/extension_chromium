import {
    bm as D,
    bo as T,
    Ej as H,
    Ek as v,
    El as I,
    bz as B,
    k2 as A,
    Em as h,
    M,
    af as u,
    aw as k,
    b5 as W,
    fk as G,
    hk as _
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    vA as w,
    vB as F,
    vC as K,
    oU as J,
    vD as V
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    j as s,
    o as n
} from "./2340486e-dvd8m80i7d6hyild.js";
var X = "[object RegExp]";

function $(e) {
    return D(e) && T(e) == X
}
var j = v && v.isRegExp,
    q = j ? H(j) : $,
    Y = I("length"),
    N = "\\ud800-\\udfff",
    Z = "\\u0300-\\u036f",
    Q = "\\ufe20-\\ufe2f",
    P = "\\u20d0-\\u20ff",
    ee = Z + Q + P,
    se = "\\ufe0e\\ufe0f",
    ae = "[" + N + "]",
    c = "[" + ee + "]",
    g = "\\ud83c[\\udffb-\\udfff]",
    re = "(?:" + c + "|" + g + ")",
    R = "[^" + N + "]",
    U = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    z = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    ne = "\\u200d",
    C = re + "?",
    E = "[" + se + "]?",
    oe = "(?:" + ne + "(?:" + [R, U, z].join("|") + ")" + E + C + ")*",
    ie = E + C + oe,
    te = "(?:" + [R + c + "?", c, U, z, ae].join("|") + ")",
    y = RegExp(g + "(?=" + g + ")|" + te + ie, "g");

function le(e) {
    for (var r = y.lastIndex = 0; y.test(e);) ++r;
    return r
}

function de(e) {
    return w(e) ? le(e) : Y(e)
}
var me = 30,
    ue = "...",
    fe = /\w*$/;

function be(e, r) {
    var t = me,
        o = ue;
    if (B(r)) {
        var a = "separator" in r ? r.separator : a;
        t = "length" in r ? A(r.length) : t, o = "omission" in r ? h(r.omission) : o
    }
    e = M(e);
    var m = e.length;
    if (w(e)) {
        var d = F(e);
        m = d.length
    }
    if (t >= m) return e;
    var i = t - de(o);
    if (i < 1) return o;
    var l = d ? K(d, 0, i).join("") : e.slice(0, i);
    if (a === void 0) return l + o;
    if (d && (i += l.length - i), q(a)) {
        if (e.slice(i).search(a)) {
            var x, O = l;
            for (a.global || (a = RegExp(a.source, M(fe.exec(a)) + "g")), a.lastIndex = 0; x = a.exec(O);) var p = x.index;
            l = l.slice(0, p === void 0 ? i : p)
        }
    } else if (e.indexOf(h(a), i) != i) {
        var b = l.lastIndexOf(a);
        b > -1 && (l = l.slice(0, b))
    }
    return l + o
}
const ce = 80,
    f = 100;

function S(e) {
    return e < f ? "bg-token-bg-status-warning text-token-text-status-warning" : "bg-token-bg-status-error text-token-interactive-label-danger-secondary-default"
}

function L(e) {
    return J() && e != null && e > ce
}

function ve({
    memoryFullPct: e,
    className: r,
    children: t,
    showInfoLabel: o,
    onManageMemories: a
}) {
    return L(e) ? s.jsx("div", {
        className: u("border-token-border-default rounded-lg border p-1 text-sm", r),
        children: s.jsxs(W.div, {
            className: u("flex h-7 items-center gap-1 overflow-hidden rounded-sm px-1.5 font-medium whitespace-nowrap", S(e)),
            initial: {
                width: 0
            },
            animate: {
                width: `${e}%`
            },
            transition: {
                duration: .5
            },
            children: [s.jsx(V, {
                className: "icon-sm ms-1"
            }), s.jsx(n, {
                id: "6D2etG",
                defaultMessage: "{memoryFullPct}% full",
                values: {
                    memoryFullPct: e
                }
            }), t, o && s.jsx(G, {
                interactive: !0,
                label: e < f ? s.jsx("div", {
                    className: "whitespace-normal",
                    children: s.jsx(n, {
                        id: "gxY4wi",
                        defaultMessage: "ChatGPT's almost out of space for new saved memories. <memoryModalLink>Manage saved memories</memoryModalLink> to create more space.",
                        values: {
                            memoryModalLink: d => s.jsx("a", {
                                href: "#",
                                className: "cursor-pointer underline",
                                onClick: i => {
                                    i.preventDefault(), a ? .()
                                },
                                children: d
                            })
                        }
                    })
                }) : s.jsx("div", {
                    className: "whitespace-normal",
                    children: s.jsx(n, {
                        id: "1JxMf3",
                        defaultMessage: "ChatGPT's out of space for saved memories. <memoryModalLink>Manage saved memories</memoryModalLink> to create more space.",
                        values: {
                            memoryModalLink: d => s.jsx("a", {
                                href: "#",
                                className: "cursor-pointer underline",
                                onClick: i => {
                                    i.preventDefault(), a ? .()
                                },
                                children: d
                            })
                        }
                    })
                }),
                children: s.jsx(_, {
                    className: "icon-sm ms-1"
                })
            })]
        })
    }) : null
}

function he({
    memoryFullPct: e,
    className: r,
    showUpgradeCTA: t = !1,
    isPaid: o = !1,
    onUpgrade: a
}) {
    return L(e) ? s.jsxs("div", {
        className: u("border-token-border-default bg-token-main-surface-primary flex items-center justify-between gap-4 rounded-lg border p-[14px]", r),
        children: [s.jsxs("div", {
            className: "inline-block gap-1",
            children: [s.jsx("div", {
                className: u("mb-1 inline-block rounded-[6px] px-[6px] py-[2px] text-sm font-semibold", S(e ? ? 0)),
                children: s.jsx(n, {
                    id: "56hzv4",
                    defaultMessage: "{memoryFullPct}% full",
                    values: {
                        memoryFullPct: e
                    }
                })
            }), s.jsx("div", {
                className: "text-token-text-secondary text-sm",
                children: (e ? ? 0) >= f ? o ? s.jsx(n, {
                    id: "HaCKNx",
                    defaultMessage: "New memories can't be saved, so responses may feel less personalized. Delete existing memories to free up space."
                }) : s.jsx(n, {
                    id: "MXPinw",
                    defaultMessage: "New memories can't be saved, so responses may feel less personalized. Upgrade to expand memory, or delete existing memories."
                }) : o ? s.jsx(n, {
                    id: "obgK9b",
                    defaultMessage: "Once memory is full, responses may feel less personalized. Delete existing memories to free up space."
                }) : s.jsx(n, {
                    id: "PDLzFM",
                    defaultMessage: "Once memory is full, responses may feel less personalized. Upgrade to expand memory, or delete existing memories."
                })
            })]
        }), t && !o && s.jsx(k, {
            color: "primary",
            size: "medium",
            onClick: a,
            children: s.jsx(n, {
                id: "1rRvWt",
                defaultMessage: "Upgrade"
            })
        })]
    }) : null
}

function Me({
    memoryFullPct: e,
    className: r,
    shouldShowPlusUpsell: t = !1,
    onUpgrade: o
}) {
    const a = (e ? ? 0) >= f,
        m = a ? "bg-token-bg-status-error text-token-interactive-label-danger-secondary-default" : "bg-token-bg-status-warning text-token-text-status-warning";
    return s.jsxs("div", {
        className: u("border-token-border-default bg-token-main-surface-primary flex items-center justify-between gap-4 rounded-2xl border p-[14px]", r),
        children: [s.jsxs("div", {
            className: "inline-block gap-1",
            children: [s.jsx("div", {
                className: u("mb-1 inline-block rounded-[6px] px-[6px] py-[2px] text-sm font-semibold", m),
                children: s.jsx(n, {
                    id: "56hzv4",
                    defaultMessage: "{memoryFullPct}% full",
                    values: {
                        memoryFullPct: e
                    }
                })
            }), s.jsx("div", {
                className: "text-token-text-secondary text-xs",
                children: a ? t ? s.jsx(n, {
                    id: "MXPinw",
                    defaultMessage: "New memories can't be saved, so responses may feel less personalized. Upgrade to expand memory, or delete existing memories."
                }) : s.jsx(n, {
                    id: "HaCKNx",
                    defaultMessage: "New memories can't be saved, so responses may feel less personalized. Delete existing memories to free up space."
                }) : t ? s.jsx(n, {
                    id: "PDLzFM",
                    defaultMessage: "Once memory is full, responses may feel less personalized. Upgrade to expand memory, or delete existing memories."
                }) : s.jsx(n, {
                    id: "obgK9b",
                    defaultMessage: "Once memory is full, responses may feel less personalized. Delete existing memories to free up space."
                })
            })]
        }), t && s.jsx(k, {
            color: "primary",
            size: "medium",
            onClick: o,
            children: s.jsx(n, {
                id: "1rRvWt",
                defaultMessage: "Upgrade"
            })
        })]
    })
}
export {
    he as M, Me as a, ve as b, be as t
};
//# sourceMappingURL=4b303e9e-iimph5klvq8yx43j.js.map