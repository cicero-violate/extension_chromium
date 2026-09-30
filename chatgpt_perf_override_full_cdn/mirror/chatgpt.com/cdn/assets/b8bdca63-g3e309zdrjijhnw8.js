import {
    c as D,
    u as F,
    r as j,
    j as t,
    o as I
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    dl as G
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    af as b,
    fk as z,
    lT as C
} from "./4813494d-javwxs2rmzsrunl2.js";
const H = 50;

function E({
    className: u,
    delay: e = H,
    height: a,
    width: x
}) {
    const [h, r] = j.useState(!1);
    return j.useEffect(() => {
        const o = setTimeout(() => {
            r(!0)
        }, e);
        return () => {
            clearTimeout(o)
        }
    }, [e]), h ? t.jsx("div", {
        className: "flex max-h-full max-w-full items-center justify-center",
        style: {
            width: x,
            height: a,
            aspectRatio: `${x} / ${a}`
        },
        children: t.jsx("div", {
            className: b("bg-token-border-default h-full w-full animate-pulse", u)
        })
    }) : null
}

function Y(u) {
    "use forget";
    const e = D.c(21),
        {
            allRepos: a,
            enableScroll: x,
            fetchNextPage: h,
            hasNextPage: r,
            isFetchingNextPage: o,
            isLoading: i,
            onChange: N,
            searchTerm: S,
            selectedRepos: c
        } = u,
        l = x === void 0 ? !0 : x,
        w = F(),
        R = j.useRef(null),
        T = j.useRef(null),
        p = G(),
        k = c.size >= p;
    let g;
    e[0] !== h || e[1] !== r || e[2] !== o || e[3] !== i ? (g = s => {
        if (i || s == null) return;
        const n = new IntersectionObserver(m => {
            m[0].isIntersecting && !o && r && h()
        });
        return n.observe(s), () => {
            n.disconnect()
        }
    }, e[0] = h, e[1] = r, e[2] = o, e[3] = i, e[4] = g) : g = e[4];
    const M = g;
    let y;
    e[5] === Symbol.for("react.memo_cache_sentinel") ? (y = Array.from({
        length: 6
    }).map(A), e[5] = y) : y = e[5];
    const L = y;
    let d;
    e[6] !== a || e[7] !== l || e[8] !== r || e[9] !== M || e[10] !== w || e[11] !== o || e[12] !== i || e[13] !== k || e[14] !== p || e[15] !== N || e[16] !== S || e[17] !== c ? (d = i ? t.jsx("div", {
        className: "h-[300px]",
        children: L.map(P)
    }) : t.jsx(t.Fragment, {
        children: t.jsxs("div", {
            className: b("relative flex flex-col", l && "overflow-y-auto"),
            children: [l && t.jsx("div", {
                ref: R,
                className: b("from-token-bg-primary pointer-events-none absolute start-0 end-0 top-0 z-10 h-20 bg-gradient-to-b to-transparent opacity-0 transition-opacity duration-200")
            }), t.jsx("div", {
                ref: s => {
                    if (!s) return;
                    const n = () => {
                        if (!l || !s || !R.current || !T.current) return;
                        const m = s.scrollTop <= 10,
                            f = s.scrollHeight - s.scrollTop <= s.clientHeight + 10;
                        R.current.style.opacity = m ? "0" : "1", T.current.style.opacity = f ? "0" : "1"
                    };
                    return s.addEventListener("scroll", () => n()), n(), () => s.removeEventListener("scroll", () => n())
                },
                className: b("no-scrollbar", l && "h-[300px] overflow-y-auto", !l && "overflow-y-visible"),
                children: a.length > 0 || r ? t.jsxs(t.Fragment, {
                    children: [a.map(s => {
                        if (!s.id) return null;
                        const n = k && !c.has(s.id);
                        return t.jsx(z, {
                            label: w.formatMessage({
                                id: "N6yvBk",
                                defaultMessage: "You've reached the limit of {maxReposToSync} synced repositories."
                            }, {
                                maxReposToSync: p
                            }),
                            side: "right",
                            align: "center",
                            className: "flex w-full flex-1",
                            sideOffset: 10,
                            disabled: !n,
                            children: t.jsxs("button", {
                                disabled: n,
                                onClick: m => {
                                    m.preventDefault(), m.stopPropagation();
                                    const f = new Map(c);
                                    f.has(s.id) ? f.delete(s.id) : f.set(s.id, s), N(f)
                                },
                                className: "border-token-border-secondary flex w-full justify-between border-b-1 py-3",
                                children: [t.jsx("div", {
                                    className: "text-token-text-primary text-md flex-1 text-start",
                                    children: s.repository_full_name
                                }), t.jsx("div", {
                                    className: "flex items-center",
                                    children: c.has(s.id) ? t.jsx(C, {
                                        className: "icon-lg"
                                    }) : t.jsx("div", {
                                        className: "flex h-6 items-center pe-0.5",
                                        children: t.jsx("div", {
                                            className: "border-token-border-heavy h-5 w-5 rounded-full border"
                                        })
                                    })
                                })]
                            }, s.id)
                        }, s.id)
                    }), r && t.jsx("div", {
                        ref: M,
                        className: "h-1 w-full"
                    }), o && t.jsx("div", {
                        className: "border-token-border-secondary flex w-full justify-between border-b-1 py-3",
                        children: t.jsx(E, {
                            className: "rounded-md",
                            width: Math.random() * 250 + 100,
                            height: 20
                        })
                    })]
                }) : t.jsx("div", {
                    className: "text-token-text-tertiary mt-5 flex h-full justify-center text-sm",
                    children: t.jsx(I, {
                        id: "IyK1Z7",
                        defaultMessage: "No results found for “{searchTerm}”",
                        values: {
                            searchTerm: S
                        }
                    })
                })
            }), l && t.jsx("div", {
                ref: T,
                className: b("from-token-bg-primary pointer-events-none absolute start-0 end-0 bottom-0 z-10 mt-auto h-20 bg-gradient-to-t to-transparent transition-opacity duration-200")
            })]
        })
    }), e[6] = a, e[7] = l, e[8] = r, e[9] = M, e[10] = w, e[11] = o, e[12] = i, e[13] = k, e[14] = p, e[15] = N, e[16] = S, e[17] = c, e[18] = d) : d = e[18];
    let v;
    return e[19] !== d ? (v = t.jsx(t.Fragment, {
        children: d
    }), e[19] = d, e[20] = v) : v = e[20], v
}

function P(u, e) {
    return t.jsx("div", {
        className: "border-token-border-secondary flex w-full justify-between border-b-1 py-3",
        children: t.jsx(E, {
            className: "rounded-md",
            width: u,
            height: 20
        })
    }, e)
}

function A() {
    return Math.random() * 250 + 100
}
export {
    Y as G
};
//# sourceMappingURL=b8bdca63-g3e309zdrjijhnw8.js.map