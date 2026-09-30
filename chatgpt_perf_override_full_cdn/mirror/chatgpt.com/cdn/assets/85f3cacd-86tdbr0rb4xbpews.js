import {
    _ as y,
    c as j,
    j as t,
    o as x,
    r as E
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    e4 as C,
    cb as v,
    hr as w,
    e1 as R,
    me as V,
    vF as L,
    ca as O,
    kV as P,
    vG as F,
    vH as h,
    vI as S,
    gd as $,
    ru as G,
    gM as U,
    gN as W
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    y3 as B,
    c as T,
    s as D,
    fk as K,
    af as g,
    sZ as _,
    m4 as l,
    dl as q,
    vP as z,
    fv as M
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    C as Q
} from "./46a4eebd-dp58yi3ebjz6lx0x.js";
import {
    E as Y
} from "./82244417-gtg7yq4t8dhuwljw.js";
import {
    L as Z
} from "./5eec0dc4-8scuipden3df4f93.js";
import {
    g as J
} from "./ad08b33f-m6y61lzfmpdxz75y.js";
import {
    A as X
} from "./a7c981c9-cfqk1lewr9pd0yee.js";
const N = C({
        animationLoader: () => y(() =>
            import ("./3d40e076-doitflbvj988jrtm.js"), []),
        StaticIcon: B
    }),
    k = C({
        animationLoader: () => y(() =>
            import ("./05056757-ecrufyyzn0h8291m.js"), []),
        StaticIcon: v
    }),
    b = C({
        animationLoader: () => y(() =>
            import ("./eb35c915-hvsc20zw1oied9k8.js"), []),
        StaticIcon: w
    }),
    H = T(D, "00b7d6", 16, 16),
    ee = T(D, "5fb567", 16, 16),
    A = {
        click: H,
        reload: X,
        scroll: R,
        type: ee
    },
    ge = s => {
        "use forget";
        const e = j.c(9),
            {
                interactionChunk: n,
                isExpanded: u
            } = s;
        let i;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (i = {
            click: te,
            reload: ae,
            scroll: se,
            type: oe
        }, e[0] = i) : i = e[0];
        const a = i;
        if (u && n.interactions.length === 1) {
            const f = n.interactions[0],
                d = a[f.type];
            let m;
            return e[1] !== d || e[2] !== f ? (m = t.jsx(d, {
                interaction: f
            }), e[1] = d, e[2] = f, e[3] = m) : m = e[3], m
        }
        let r;
        e[4] === Symbol.for("react.memo_cache_sentinel") ? (r = t.jsx("p", {
            children: t.jsx(x, {
                id: "Md+G2O",
                defaultMessage: "Interacted with the page"
            })
        }), e[4] = r) : r = e[4];
        let o;
        e[5] !== n.interactions ? (o = n.interactions.map(ne), e[5] = n.interactions, e[6] = o) : o = e[6];
        let c;
        return e[7] !== o ? (c = t.jsxs("div", {
            children: [r, t.jsx("div", {
                className: "mt-2 flex items-center gap-2.5",
                children: o
            })]
        }), e[7] = o, e[8] = c) : c = e[8], c
    },
    te = () => {
        "use forget";
        const s = j.c(1);
        let e;
        return s[0] === Symbol.for("react.memo_cache_sentinel") ? (e = t.jsx(x, {
            id: "ruP/Ts",
            defaultMessage: "Clicked"
        }), s[0] = e) : e = s[0], e
    },
    se = () => {
        "use forget";
        const s = j.c(1);
        let e;
        return s[0] === Symbol.for("react.memo_cache_sentinel") ? (e = t.jsx(x, {
            id: "FMYWO3",
            defaultMessage: "Scrolled"
        }), s[0] = e) : e = s[0], e
    },
    ae = () => {
        "use forget";
        const s = j.c(1);
        let e;
        return s[0] === Symbol.for("react.memo_cache_sentinel") ? (e = t.jsx(x, {
            id: "WU9rey",
            defaultMessage: "Reloaded the page"
        }), s[0] = e) : e = s[0], e
    },
    oe = s => {
        "use forget";
        const e = j.c(12),
            {
                interaction: n
            } = s,
            [u, i] = E.useState(!1);
        if (n.type !== "type") return null;
        const a = n.content,
            r = a.length > 100;
        let o;
        e[0] !== a || e[1] !== r ? (o = r ? a.substring(0, 100) : a, e[0] = a, e[1] = r, e[2] = o) : o = e[2];
        const c = o;
        let f;
        e[3] === Symbol.for("react.memo_cache_sentinel") ? (f = t.jsx("p", {
            children: t.jsx(x, {
                id: "MS5Fcf",
                defaultMessage: "Typed"
            })
        }), e[3] = f) : f = e[3];
        const d = u || !r ? a : `${c}…`;
        let m;
        e[4] !== d ? (m = t.jsx("span", {
            className: "text text-black opacity-30",
            children: d
        }), e[4] = d, e[5] = m) : m = e[5];
        let p;
        e[6] !== r || e[7] !== u ? (p = r && t.jsx("button", {
            className: "ms-1 border-none bg-none p-0 hover:text-gray-600",
            onClick: () => i(re),
            children: u ? t.jsx(x, {
                id: "Mggt6n",
                defaultMessage: "See less"
            }) : t.jsx(x, {
                id: "yhD38v",
                defaultMessage: "See all"
            })
        }), e[6] = r, e[7] = u, e[8] = p) : p = e[8];
        let I;
        return e[9] !== m || e[10] !== p ? (I = t.jsxs("div", {
            children: [f, t.jsxs("p", {
                children: [m, p]
            })]
        }), e[9] = m, e[10] = p, e[11] = I) : I = e[11], I
    };

function ne(s, e) {
    const n = A[s.type];
    return s.type === "type" ? t.jsx(K, {
        label: s.content,
        triggerAs: null,
        children: t.jsx(n, {
            className: "icon"
        }, e)
    }, e) : t.jsx(n, {
        className: "icon"
    }, e)
}

function re(s) {
    return !s
}
const ce = J("default"),
    je = ({
        chunk: s,
        size: e = "small",
        isAnimated: n = !1,
        className: u,
        isHeadline: i
    }) => {
        const a = e === "small" ? g("h-[15px] w-[15px]", u) : g("icon", u),
            r = t.jsx("div", {
                className: g("bg-token-interactive-icon-tertiary-default h-[6px] w-[6px] rounded-full", u)
            });
        if (!s) return i ? t.jsx(_, {
            className: a
        }) : null;
        switch (s.type) {
            case l.N7jupdAPI:
                return s.action === "n7jupd_as" ? t.jsx(N, {
                    matchTextColor: !0,
                    className: a
                }) : s.action === "n7jupd_ag" ? t.jsx(M, {
                    className: a
                }) : s.action === "n7jupd_cf" && s.source ? t.jsx(S, {
                    connector: s.source
                }) : s.action === "n7jupd_cs" && s.source ? t.jsx(S, {
                    connector: s.source
                }) : t.jsx(_, {
                    className: a
                });
            case l.Browsing:
                if (s.sources.length > 0) {
                    const o = s.sources.find(c => c in h);
                    if (o) {
                        const c = h[o];
                        return t.jsx(c, {
                            className: a
                        }, o)
                    }
                }
                return n ? t.jsx(N, {
                    matchTextColor: !0,
                    className: a
                }) : t.jsx(M, {
                    className: a
                });
            case l.Search:
                return n ? t.jsx(b, {
                    matchTextColor: !0,
                    className: a
                }) : t.jsx(w, {
                    className: a
                });
            case l.CodeAnalysis:
                return n ? t.jsx(N, {
                    matchTextColor: !0,
                    className: a
                }) : t.jsx(F, {
                    className: a
                });
            case l.ImageAnalysis:
                return n ? t.jsx(k, {
                    matchTextColor: !0,
                    className: a
                }) : t.jsx(v, {
                    className: a
                });
            case l.Recap:
                return s.didFailReasoning ? r : t.jsx(z, {
                    className: a
                });
            case l.Thought:
                if (s.prototypeIcon) switch (s.prototypeIcon) {
                    case "gmail":
                        return t.jsx(Y, {
                            className: a
                        });
                    case "file":
                        return t.jsx(P, {
                            className: a
                        });
                    case "convo":
                        return t.jsx(O, {
                            className: a
                        })
                }
                return r;
            case l.Glaux:
                return t.jsx(L, {
                    className: a
                });
            case l.Strix:
                return null;
            case l.Dragonfruit:
                {
                    const o = i ? t.jsx($, {
                        className: a
                    }) : r;
                    return {
                        default_: o,
                        download: t.jsx(W, {
                            className: a
                        }),
                        upload: t.jsx(U, {
                            className: a
                        }),
                        question: t.jsx(G, {
                            className: a
                        }),
                        url: s.iconUrl ? t.jsx("img", {
                            className: g(a),
                            src: s.iconUrl,
                            alt: ""
                        }) : o,
                        useSkill: t.jsx(ce, {
                            className: a
                        })
                    }[s.icon ? ? "default_"] ? ? o
                }
            case l.DragonfruitInteraction:
                {
                    if (i || s.interactions.length > 1) return t.jsx(Q, {
                        className: a
                    });
                    const o = s.interactions[0],
                        c = A[o.type];
                    return t.jsx(c, {
                        className: g(a, o.type === "type" && "translate-x-[1px]")
                    })
                }
            default:
                return s.type === l.ComputerOutput ? s.messages.every(o => o.author.name === q.n7jupd_m) ? t.jsx(Z, {
                    className: a
                }) : n ? t.jsx(b, {
                    matchTextColor: !0,
                    className: a
                }) : t.jsx(V, {
                    className: a
                }) : i ? t.jsx(_, {
                    className: g("-ms-[3px]", a)
                }) : r
        }
    };
export {
    je as C, ge as D, N as a
};
//# sourceMappingURL=85f3cacd-86tdbr0rb4xbpews.js.map