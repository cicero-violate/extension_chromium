import {
    r as b,
    j as e
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    af as o,
    jU as f,
    aH as O,
    J as $,
    fq as P,
    vQ as J,
    gu as M
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    b8 as D
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
const m = s => Array.isArray(s) || f(s) || s instanceof Map || s instanceof Set,
    h = s => s == null || typeof s == "string" || typeof s == "number" || typeof s == "boolean",
    N = s => f(s) ? Object.entries(s) : Array.from(s.entries()),
    k = s => `${typeof s}:${typeof s=="object"?JSON.stringify(s):s}`,
    R = ({
        isPreview: s = !1,
        isInitialLevelExpanded: t = !1,
        unwrap: c = !1,
        value: n,
        className: x
    }) => {
        const [r, a] = b.useState(t);
        if (h(n)) {
            const i = e.jsx(j, {
                value: n,
                depth: 0
            });
            return x ? e.jsx("span", {
                className: x,
                children: i
            }) : i
        }
        return m(n) ? c ? e.jsx("span", {
            className: o("text-sm", x),
            children: e.jsx(w, {
                value: n,
                depth: 0
            })
        }) : e.jsxs("span", {
            className: o("relative z-0 max-w-full font-mono text-sm leading-6", r && "w-full flex-auto", x),
            children: [e.jsxs("span", {
                role: "button",
                className: "group/row flex flex-wrap items-center gap-x-1",
                onClick: () => a(!r),
                children: [!s && e.jsx(E, {
                    isExpanded: r
                }), e.jsx(C, {
                    value: n,
                    depth: 0
                }), e.jsx(u, {
                    value: n
                })]
            }), r && !s && e.jsx("div", {
                className: "ps-6",
                children: e.jsx(w, {
                    value: n,
                    depth: 0
                })
            })]
        }) : e.jsx("span", {
            className: o("truncate", x),
            children: String(n)
        })
    },
    S = ({
        value: s,
        depth: t = 0
    }) => m(s) ? e.jsx(w, {
        depth: t,
        value: s
    }) : h(s) ? e.jsx(j, {
        depth: t,
        value: s
    }) : e.jsx("span", {
        className: "truncate",
        children: String(s)
    }),
    C = ({
        value: s,
        depth: t = 0
    }) => {
        const c = Array.isArray(s),
            n = N(s);
        return e.jsxs("div", {
            className: "inline-flex max-w-fit min-w-0 grow basis-0",
            children: [!f(s) && e.jsx(y, {
                isShort: !0,
                isSecondary: !0,
                collection: s
            }), c ? "[" : "{", e.jsx("span", {
                className: "inline-flex max-w-fit min-w-0 shrink grow basis-0 overflow-hidden",
                children: n.map(([x, r], a) => {
                    let i = null;
                    return m(r) ? i = e.jsx(y, {
                        collection: r
                    }) : h(r) ? i = e.jsx(j, {
                        truncate: !0,
                        depth: t + 1,
                        value: r
                    }) : i = e.jsx(S, {
                        depth: t + 1,
                        value: r
                    }), e.jsxs(b.Fragment, {
                        children: [(f(s) || s instanceof Map) && e.jsx("span", {
                            className: "text-token-text-secondary min-w-[2em] shrink truncate whitespace-pre",
                            children: e.jsx(A, {
                                value: s,
                                propertyKey: x
                            })
                        }), i, a < n.length - 1 && e.jsx("span", {
                            className: "whitespace-pre",
                            children: ", "
                        })]
                    }, k(x))
                })
            }), c ? "]" : "}"]
        })
    },
    w = ({
        value: s,
        depth: t = 0
    }) => {
        const [c, n] = b.useState(() => new Set), x = N(s);
        return e.jsx("ol", {
            className: "flex flex-col ps-6 font-mono",
            children: x.map(([r, a]) => {
                const i = k(r),
                    d = c.has(i),
                    l = m(a),
                    z = () => {
                        n(g => {
                            const p = new Set(g);
                            return p.has(i) ? p.delete(i) : p.add(i), p
                        })
                    };
                return e.jsxs("li", {
                    className: o("flex ps-1 whitespace-nowrap", l && "flex-col", !l && "group/row flex-wrap"),
                    onClick: g => g.stopPropagation(),
                    children: [e.jsxs("span", {
                        onClick: l ? z : void 0,
                        role: l ? "button" : void 0,
                        className: o("group/row z-10 -ms-1 min-w-0 items-center gap-x-1", l ? "flex" : "inline-flex"),
                        children: [l && e.jsxs(e.Fragment, {
                            children: [e.jsx(L, {}), e.jsx(E, {
                                shiftLeft: !0,
                                isExpanded: d
                            })]
                        }), e.jsx("span", {
                            className: o("font-bold", (f(s) || Array.isArray(s)) && "text-red-900 dark:text-blue-400"),
                            children: e.jsx(A, {
                                value: s,
                                propertyKey: r
                            })
                        }), l && !d && e.jsx(C, {
                            value: a,
                            depth: t + 1
                        }), l && d && e.jsx(y, {
                            isSecondary: !0,
                            collection: a
                        }), l && e.jsx(u, {
                            value: a
                        })]
                    }), (!l || d) && e.jsx(S, {
                        value: a,
                        depth: t + 1
                    }), (typeof a == "string" || typeof a == "number") && e.jsx(u, {
                        value: a
                    })]
                }, i)
            })
        })
    },
    j = ({
        value: s,
        truncate: t = !1
    }) => typeof s == "string" ? e.jsxs("span", {
        className: o("dark:text-blue-75 text-red-500", t && "max-w-fit min-w-[2em] shrink-0 grow basis-0 overflow-hidden text-ellipsis whitespace-nowrap", !t && "break-words break-all whitespace-normal"),
        children: ["'", s, "'"]
    }) : e.jsx("span", {
        className: o("whitespace-nowrap", s == null ? "text-token-text-secondary" : "dark:text-brand-purple-600 text-blue-500"),
        children: String(s)
    }),
    L = () => e.jsx("span", {
        className: "absolute start-0 end-0 z-[-1] h-6 rounded-md group-hover/row:bg-gray-50 dark:group-hover/row:bg-gray-700"
    }),
    y = ({
        collection: s,
        isSecondary: t = !1,
        isShort: c = !1
    }) => {
        let n = null;
        return Array.isArray(s) && s.length > 0 ? n = c ? `(${s.length})` : `Array(${s.length})` : s instanceof Set ? n = `Set(${s.size})` : s instanceof Map ? n = `Map(${s.size})` : f(s) && (n = "{…}"), n && e.jsx("span", {
            className: o(t && "text-token-text-secondary"),
            children: n
        })
    },
    A = ({
        value: s,
        propertyKey: t
    }) => f(s) || Array.isArray(s) ? `${P(t)}: ` : s instanceof Map ? e.jsxs("span", {
        className: "inline-flex items-center gap-1",
        children: [h(t) ? e.jsx(j, {
            value: t,
            depth: 0
        }) : e.jsx("span", {
            className: "text-token-text-secondary",
            children: JSON.stringify(t)
        }), e.jsx(J, {
            className: "icon-sm text-token-text-secondary"
        })]
    }) : null,
    E = ({
        isExpanded: s,
        shiftLeft: t = !1
    }) => e.jsx("button", {
        className: o("flex h-5 shrink-0 items-center overflow-hidden", t && "ms-[-16px]"),
        children: e.jsx(O, {
            className: o("icon-sm text-token-text-secondary transition-transform", s && "rotate-90")
        })
    }),
    u = ({
        value: s
    }) => {
        const t = $(),
            c = () => {
                M(JSON.stringify(s), t)
            };
        return e.jsx("span", {
            className: o("text-token-text-secondary relative inline-block h-4 self-center opacity-0 transition-opacity", "group-hover/row:opacity-100 group-hover/row:delay-500", "hover:after:bg-token-main-surface-tertiary after:pointer-events-none after:absolute after:inset-[-4px] after:z-0 after:rounded-lg after:content-['']"),
            children: e.jsx(D, {
                iconClassName: "icon-sm z-10",
                iconOnly: !0,
                onCopy: c
            })
        })
    };
export {
    R as L
};
//# sourceMappingURL=c8f38d6c-i5s9j3oolp7zpjbo.js.map