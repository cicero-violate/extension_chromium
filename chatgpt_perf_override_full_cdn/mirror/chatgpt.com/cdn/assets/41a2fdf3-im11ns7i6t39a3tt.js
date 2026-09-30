import {
    c as J,
    u as $,
    j as s,
    o as ee,
    z as Be,
    r as j,
    _ as Ge
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    x5 as he,
    x6 as Ie,
    x7 as V,
    mS as ze,
    x8 as Le,
    mR as _e,
    x9 as Ae,
    bO as Re,
    lT as Ue,
    f5 as Qe,
    ql as We,
    w$ as ke,
    xa as q,
    xb as ge,
    sv as He,
    xc as Ye,
    mL as Ke,
    eX as Xe,
    xd as Je,
    ca as Ve,
    kV as Ze,
    xe as et,
    xf as tt,
    xg as st,
    mg as nt,
    xh as at,
    xi as je,
    jE as ye
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    E as rt
} from "./82244417-gtg7yq4t8dhuwljw.js";
import {
    af as w,
    di as Ce,
    b2 as ot,
    lT as it,
    bV as lt,
    n as ct,
    bf as ut,
    bj as dt,
    b5 as M,
    m4 as d,
    gD as mt,
    _ as we,
    hP as ft,
    m7 as xt,
    aO as pt,
    cc as gt,
    ch as ht,
    a as vt,
    N as jt,
    jw as yt
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    c as Ct,
    g as wt,
    a as bt,
    b as St,
    i as Nt,
    d as Mt,
    C as Tt,
    e as It
} from "./a366adf3-mr5j0wy96h4uuta9.js";
import {
    G as _t
} from "./c19d65aa-ef21vpc58mb9d70k.js";
import {
    C as At,
    D as Rt
} from "./85f3cacd-86tdbr0rb4xbpews.js";
import {
    DragonfruitCoTScreenshotTooltip as be
} from "./e340fd71-h0qop3v8adxc0jv0.js";
import {
    s as kt,
    l as Ot
} from "./e3127a4c-3902zdnsjvimocyi.js";
const pe = 24,
    js = 12,
    Et = 5e3;

function Oe({
    chunk: t,
    intl: e
}) {
    const n = t ? .queries.map(a => a.query) ? ? [];
    if ((t ? .results ? ? []).length > 0) return "";
    const o = new Set(n);
    return e.formatMessage({
        id: "F+zud/",
        defaultMessage: "Searching for {queries_list}{add_more, select, true { and {remaining_count} more} other {}}"
    }, {
        queries_list: Array.from(o).map(a => `"${he(a)}"`).slice(0, 3).join(", "),
        add_more: Array.from(o).length > 3,
        remaining_count: Array.from(o).length - 3
    })
}

function Dt(t) {
    "use forget";
    const e = J.c(12),
        {
            chunk: n,
            isExpanded: r,
            isComplete: o
        } = t,
        a = $(),
        l = Ie() ? .type === "cot";
    let c;
    e[0] !== n || e[1] !== a || e[2] !== o || e[3] !== l ? (c = l ? null : s.jsx("div", {
        className: "text-token-text-secondary flex flex-row gap-1 truncate text-sm overflow-ellipsis",
        children: V(a, n, o)
    }), e[0] = n, e[1] = a, e[2] = o, e[3] = l, e[4] = c) : c = e[4];
    let u;
    e[5] !== n || e[6] !== r || e[7] !== l ? (u = r && s.jsx(Pt, {
        queries: n.queries,
        results: n.results,
        maxResults: l ? 3 : 4
    }), e[5] = n, e[6] = r, e[7] = l, e[8] = u) : u = e[8];
    let m;
    return e[9] !== c || e[10] !== u ? (m = s.jsxs("div", {
        children: [c, u]
    }), e[9] = c, e[10] = u, e[11] = m) : m = e[11], m
}

function Pt(t) {
    "use forget";
    const e = J.c(10),
        {
            maxResults: n,
            queries: r,
            results: o
        } = t,
        a = n === void 0 ? 3 : n;
    let i;
    e[0] !== a || e[1] !== r || e[2] !== o.length ? (i = r.length <= a || !o.length ? r.map(Bt) : [...r.slice(0, a - 1).map($t), s.jsx(ze, {
        maxResults: a,
        queries: r
    }, "query-overflow")], e[0] = a, e[1] = r, e[2] = o.length, e[3] = i) : i = e[3];
    const l = i;
    let c;
    e[4] !== a || e[5] !== o ? (c = o.length <= a ? o.map(qt) : [...o.slice(0, a - 1).map(Ft), s.jsx(Le, {
        maxResults: a,
        results: o
    }, "result-overflow")], e[4] = a, e[5] = o, e[6] = c) : c = e[6];
    const u = c;
    let m;
    return e[7] !== l || e[8] !== u ? (m = s.jsx("div", {
        className: "mt-2",
        children: s.jsxs("div", {
            className: "flex flex-row flex-wrap items-center gap-2",
            children: [l, u]
        })
    }), e[7] = l, e[8] = u, e[9] = m) : m = e[9], m
}

function Ft(t) {
    return s.jsx(Ae, {
        url: t.url,
        name: t.name
    }, t.id)
}

function qt(t) {
    return s.jsx(Ae, {
        url: t.url,
        name: t.name
    }, t.id)
}

function $t(t, e) {
    return s.jsx(_e, {
        query: he(t.query)
    }, `query-${t.query}-${e}`)
}

function Bt(t, e) {
    return s.jsx(_e, {
        query: he(t.query)
    }, `query-${t.query}-${e}`)
}
const Gt = Object.freeze(Object.defineProperty({
        __proto__: null,
        GlauxCoTChunk: Dt,
        getGlauxCoTChunkV4TextContent: Oe
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    zt = ({
        chunk: t,
        isExpanded: e,
        isComplete: n,
        enableV4: r
    }) => {
        const o = $(),
            a = t.assistantMessage,
            i = t.toolMessage,
            l = a != null && Ee(a) != null;
        return s.jsxs("div", {
            className: w("flex w-full flex-col gap-2 text-sm", r && "mt-1"),
            children: [e && !r && V(o, t, n), l && s.jsxs("div", {
                children: [s.jsx(Lt, {
                    message: a,
                    forceDarkMode: !0,
                    showActionBar: !1,
                    codeRendererClassName: w("rounded-md max-h-[calc(clamp(20px,1/4*var(--scroll-root-safe-area-height,100svh),400px))] overflow-auto", i && "rounded-b-none"),
                    codeContainerClassName: "overflow-visible!"
                }), i && s.jsx(Ut, {
                    forceDarkMode: !0,
                    wrapperClassName: "max-h-[calc(clamp(20px,1/8*var(--scroll-root-safe-area-height,100svh),200px))] w-full overflow-auto dark rounded-b-md",
                    codeContainerClassName: "whitespace-pre-wrap",
                    message: i
                })]
            })]
        })
    };

function Ee(t) {
    function e(r, o, a) {
        return `\`\`\`${a}
agent@chatgpt:${r}$ ${o}
\`\`\``
    }

    function n(r) {
        const o = JSON.parse(r);
        if (!o.cmd) return null;
        const a = o.workdir ? ? "/";
        return o.cmd.length === 3 && o.cmd[0] === "bash" && o.cmd[1] === "-lc" ? e(a, o.cmd[2], o.cmd[2].startsWith("python") ? "python" : "bash") : e(a, o.cmd.join(" "), "bash")
    }
    if (t.recipient !== "container.exec") return null;
    switch (t.content.content_type) {
        case Ce.Code:
            return n(t.content.text);
        case Ce.Text:
            return n(t.content.parts.join(""));
        default:
            return null
    }
}

function Lt({
    message: t,
    codeRendererClassName: e,
    forceDarkMode: n,
    removeTopBorderRadius: r,
    showActionBar: o,
    codeContainerClassName: a
}) {
    const i = ot() || n,
        l = Ee(t);
    return l == null ? null : s.jsx(_t.Provider, {
        value: {
            isWithinDataAnalysisToolMessage: !0
        },
        children: s.jsx(Re, {
            className: w("markdown prose dark:prose-invert w-full break-words", i ? "dark" : "light"),
            isCodeInteractive: !1,
            forceDarkMode: n,
            componentOverrides: {
                code: c => s.jsx(Ue, { ...c,
                    wrapperClassName: e,
                    codeContainerClassName: a,
                    removeTopBorderRadius: r,
                    showActionBar: o,
                    isCodeInteractive: !1
                })
            },
            children: l
        })
    })
}

function Ut({
    message: t,
    wrapperClassName: e,
    codeContainerClassName: n,
    forceDarkMode: r
}) {
    const o = t.content.content_type === "text" ? t.content.parts.join("") : null;
    return o ? s.jsx(Ct, {
        forceDarkMode: r,
        wrapperClassName: e,
        codeContainerClassName: n,
        output: o,
        label: null
    }) : null
}

function Qt() {
    return Date.now()
}

function Wt({
    tasks: t
}) {
    return s.jsxs("div", {
        className: "flex w-full flex-col gap-1",
        children: [s.jsx("div", {
            className: "text-token-text-secondary mb-1 text-sm",
            children: s.jsx(ee, {
                id: "FTmQVN",
                defaultMessage: "Delegated Tasks"
            })
        }), s.jsx("div", {
            className: "flex flex-col divide-y divide-gray-200 rounded-lg border border-gray-200",
            children: t.map(e => s.jsx(Ht, {
                task: e
            }, String(e.id)))
        })]
    })
}

function Ht({
    task: t
}) {
    const e = t.startedAtMs ? ? Qt(),
        n = Qe(e, 90 * 1e3),
        r = t.status === "completed" ? s.jsx(it, {
            className: "icon text-token-text-secondary h-4 w-4"
        }) : t.status === "gathering" || t.status === "running" ? s.jsx(We, {
            percentage: n,
            thickness: 1 / 12,
            className: "text-token-text-tertiary h-4 w-4",
            backgroundStrokeClassName: "stroke-token-main-surface-tertiary",
            transitionDuration: `${(100-n)/100*.2}s`,
            transitionTimingFunction: "cubic-bezier(0.55, 0, 1, 1)"
        }) : s.jsx("div", {
            className: "h-4 w-4"
        });
    return s.jsxs("div", {
        className: "grid grid-cols-[1fr_auto] items-center gap-2 p-2",
        children: [s.jsx("div", {
            className: "min-w-0",
            children: s.jsx("div", {
                className: "text-token-text-tertiary truncate text-xs",
                children: t.instruction ? ? t.model
            })
        }), s.jsx("div", {
            className: "flex items-center justify-center",
            children: r
        })]
    })
}
const Yt = ({
        chunk: t,
        isExpanded: e,
        isComplete: n,
        enableV4: r
    }) => {
        const o = $(),
            a = t.assistantMessage,
            i = t.toolMessage,
            l = a != null && wt(a) != null;
        return s.jsxs("div", {
            className: w("flex w-full flex-col gap-2 text-sm", r && "mt-1"),
            children: [e && !r && V(o, t, n), l && s.jsxs("div", {
                className: "flex flex-col gap-0.5",
                children: [s.jsx(bt, {
                    message: a,
                    FormattedText: Re,
                    showActionBar: !1,
                    codeRendererClassName: "rounded-2xl corner-superellipse/1.1 max-h-[calc(clamp(20px,1/4*var(--scroll-root-safe-area-height,100svh),400px))] overflow-auto",
                    codeContainerClassName: "overflow-visible!"
                }), i && s.jsx(St, {
                    wrapperClassName: "max-h-[calc(clamp(20px,1/8*var(--scroll-root-safe-area-height,100svh),200px))] w-full overflow-auto rounded-2xl corner-superellipse/1.1",
                    codeContainerClassName: "whitespace-pre-wrap",
                    message: i,
                    showLabel: !1
                })]
            })]
        })
    },
    Kt = ({
        chunk: t,
        isExpanded: e,
        isComplete: n,
        enableV4: r
    }) => {
        const o = $(),
            a = t.toolMessage,
            i = lt(),
            l = !ct();
        let c;
        const u = a.author.name ? .includes("container") ? ? !1;
        if (a.author.name ? .includes("python")) {
            const f = a.metadata ? .aggregate_result ? .messages.find(Nt);
            c = f ? .image_url && ut(f.image_url)
        } else u && (c = a.metadata ? .attachments ? .[0] ? .id);
        const {
            data: m
        } = Be(c ? It(c, l) : {
            enabled: !1,
            queryKey: []
        }), v = m ? .status === dt.Success ? m.download_url : void 0, {
            isSuccess: g
        } = ke(v), [x] = j.useState(g);
        return s.jsxs("div", {
            className: w("flex w-full flex-col gap-2 text-sm", r && "mt-1"),
            children: [e && !r && V(o, t, n), s.jsxs("div", {
                className: "bg-token-bg-secondary relative flex h-[calc(clamp(150px,1/4*var(--scroll-root-safe-area-height,100svh),400px))] justify-center overflow-hidden rounded-md p-2",
                children: [v && s.jsx(M.div, {
                    initial: {
                        opacity: x ? .5 : 0,
                        scale: 1.1
                    },
                    animate: {
                        opacity: g ? .5 : 0,
                        scale: n || i ? 1.1 : [1.1, 1.25, 1.1]
                    },
                    transition: {
                        opacity: {
                            ease: "easeInOut"
                        },
                        scale: n ? {
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                        } : {
                            duration: 2.5,
                            repeat: 1 / 0,
                            ease: "easeInOut"
                        }
                    },
                    className: "absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 blur-lg filter",
                    style: {
                        backgroundImage: `url(${JSON.stringify(v)})`
                    }
                }), s.jsx(M.div, {
                    initial: {
                        opacity: x ? 1 : 0
                    },
                    animate: {
                        opacity: g ? 1 : 0
                    },
                    className: "relative *:m-0 *:h-full *:w-full *:rounded-md *:object-center *:shadow-lg",
                    children: c && (u ? s.jsx(Mt, {
                        fileId: c
                    }) : s.jsx(Tt, {
                        isCoT: !0,
                        message: a
                    }))
                })]
            })]
        })
    },
    Xt = 4,
    Jt = 3,
    Vt = 3,
    Zt = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1
        }
    },
    Se = {
        hidden: {
            opacity: 0,
            x: -5
        },
        visible: {
            opacity: 1,
            x: 0
        }
    },
    es = ({
        chunk: t,
        isExpanded: e,
        isComplete: n
    }) => {
        const r = $();
        if (!t.searchResults && !t.fetchResult) return e && s.jsx(q, {
            content: ge({
                action: t.action,
                source: t.source,
                intl: r
            })
        });
        const o = [];
        let a = [];
        if (t.action === "n7jupd_cs" && t.searchResults) a = t.searchResults.map(l => ({
            entries: [{
                url: l.url,
                title: l.title,
                snippet: "",
                attribution: l.title
            }]
        }));
        else if (t.action === "n7jupd_cf" && t.fetchResult) a = [{
            entries: [{
                url: t.fetchResult ? .url,
                title: t.fetchResult ? .title,
                snippet: "",
                attribution: t.fetchResult ? .title
            }]
        }];
        else return null;
        const i = {
            type: d.Search,
            queries: o,
            sources: a
        };
        return e && s.jsx(De, {
            chunk: i,
            isExpanded: e,
            isComplete: n,
            headlineContents: ge({
                action: t.action,
                source: t.source,
                intl: r
            }),
            useCloudDocIcons: !0
        })
    },
    ts = ({
        chunk: t,
        isExpanded: e,
        isComplete: n,
        enableV4: r
    }) => {
        const o = $();
        return s.jsx(De, {
            chunk: t,
            isExpanded: e,
            isComplete: n,
            headlineContents: r ? void 0 : V(o, t, n),
            useCloudDocIcons: !1
        })
    },
    De = ({
        chunk: t,
        isExpanded: e,
        isComplete: n,
        headlineContents: r,
        useCloudDocIcons: o,
        isSmall: a,
        isVisualCoT: i = !1
    }) => {
        const {
            queries: l,
            sources: c
        } = t, [u, m] = j.useState(n), v = i ? M.div : "div";
        return s.jsxs(v, {
            className: w("flex min-w-0 flex-col gap-2 text-sm", i && "overflow-hidden"),
            ...i ? {
                initial: {
                    height: 0,
                    opacity: 0
                },
                animate: {
                    height: "auto",
                    opacity: 1
                },
                transition: {
                    duration: .25,
                    ease: "easeOut"
                }
            } : {},
            children: [e && r, s.jsxs("div", {
                className: "flex min-w-0 flex-col gap-1",
                children: [s.jsx(Ne, {
                    isComplete: n,
                    items: l,
                    max: Vt,
                    getKey: g => g.q,
                    Item: ss,
                    ShowMoreButton: rs,
                    onAnimationComplete: () => m(!0),
                    isSmall: a,
                    isVisualCoT: i
                }), s.jsx(Ne, {
                    isComplete: n,
                    items: u ? c : [],
                    max: Xt,
                    getKey: g => g.entries[0].url,
                    Item: ns,
                    ShowMoreButton: as,
                    useCloudDocIcons: o,
                    isSmall: a,
                    isVisualCoT: i
                })]
            })]
        })
    },
    Ne = ({
        isComplete: t,
        items: e,
        max: n,
        getKey: r,
        Item: o,
        ShowMoreButton: a,
        onAnimationComplete: i,
        useCloudDocIcons: l,
        isSmall: c,
        isVisualCoT: u = !1
    }) => {
        const [m, v] = j.useState(!1), [g, x] = e.length > n ? [e.slice(0, n - 1), e.slice(n - 1)] : [e];
        return s.jsxs(M.div, {
            className: w("flex flex-wrap items-center gap-1", u && "justify-center"),
            initial: u ? "hidden" : t ? "visible" : "hidden",
            animate: "visible",
            transition: {
                duration: .25,
                staggerChildren: .1,
                delayChildren: .3
            },
            onAnimationComplete: i,
            children: [g.map(f => s.jsx(M.div, {
                variants: Zt,
                className: "flex max-w-full items-center",
                children: s.jsx(o, {
                    item: f,
                    isComplete: t,
                    useCloudDocIcons: l,
                    isSmall: c,
                    isVisualCoT: u
                })
            }, r(f))), m && s.jsx(M.div, {
                className: "contents",
                initial: "hidden",
                animate: "visible",
                transition: {
                    duration: .2,
                    staggerChildren: .02
                },
                children: x ? .map(f => s.jsx(M.div, {
                    variants: Se,
                    className: "flex max-w-full items-center",
                    children: s.jsx(o, {
                        item: f,
                        isComplete: t,
                        useCloudDocIcons: l,
                        isSmall: c,
                        isVisualCoT: u
                    })
                }, r(f)))
            }), x && s.jsx(M.div, {
                variants: Se,
                className: "flex items-center",
                children: s.jsx(a, {
                    moreItems: x,
                    isShowingMore: m,
                    onClick: () => v(f => !f),
                    useCloudDocIcons: l,
                    isSmall: c
                })
            }, "more")]
        })
    },
    ss = ({
        item: t,
        isSmall: e
    }) => s.jsxs(ue, {
        componentType: "span",
        isSmall: e,
        children: [s.jsx(mt, {
            className: "-ms-1 h-3 w-3 shrink-0"
        }), s.jsx("span", {
            className: "max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap",
            children: t.q
        })]
    }),
    ns = ({
        item: t,
        isComplete: e,
        useCloudDocIcons: n,
        isSmall: r,
        isVisualCoT: o
    }) => {
        const a = t.entries[0],
            i = j.useMemo(() => ({
                url: a.url,
                title: a.title
            }), [a.url, a.title]);
        j.useEffect(() => {
            we.logEvent("link_action", { ...i,
                action: "show"
            })
        }, [i]);
        const l = () => {
                we.logEvent("link_action", { ...i,
                    action: "click"
                })
            },
            c = a.attribution ? ? He(a.url);
        return s.jsxs(ue, {
            componentType: ft,
            href: a.url,
            onClick: l,
            animateScan: !e,
            isSmall: r,
            children: [s.jsx(Pe, {
                url: a.url,
                useCloudDocIcons: n
            }), o ? s.jsx("div", {
                className: "max-w-[8rem] truncate",
                children: c
            }) : c]
        })
    },
    Pe = ({
        url: t,
        withBorder: e = !1,
        useCloudDocIcons: n
    }) => {
        const {
            isSuccess: r,
            isError: o
        } = ke(Ye(t, 32)), [a] = j.useState(r);
        if (o) return null;
        if (n) {
            const i = Ke(t);
            if (i ? .Icon != null) return s.jsx(M.div, {
                initial: {
                    opacity: a ? 1 : 0
                },
                animate: {
                    opacity: r ? 1 : 0
                },
                className: w("bg-token-main-surface-primary -ms-3 box-content h-3 w-3 shrink-0 overflow-hidden rounded-full first:-ms-1", e && "border-token-main-surface-secondary group-hover:border-token-text-primary dark:group-hover:border-token-text-primary border"),
                children: s.jsx(i.Icon, {
                    className: "m-0 h-3 w-3"
                })
            })
        }
        return s.jsx(M.div, {
            initial: {
                opacity: a ? 1 : 0
            },
            animate: {
                opacity: r ? 1 : 0
            },
            className: w("bg-token-main-surface-primary -ms-3 box-content h-3 w-3 shrink-0 overflow-hidden rounded-full first:-ms-1", e && "border-token-main-surface-secondary group-hover:border-token-text-primary dark:group-hover:border-token-text-primary border"),
            children: s.jsx(Xe, {
                url: t,
                size: 32,
                minSize: 16,
                className: "m-0 h-3 w-3"
            })
        })
    },
    as = ({
        moreItems: t,
        isShowingMore: e,
        onClick: n,
        useCloudDocIcons: r,
        isSmall: o
    }) => s.jsx(ue, {
        onClick: n,
        isSmall: o,
        children: e ? s.jsx(ee, {
            id: "19fGXl",
            defaultMessage: "Show less"
        }) : s.jsxs(s.Fragment, {
            children: [t.slice(0, Jt).map((a, i) => s.jsx(Pe, {
                url: a.entries[0].url,
                withBorder: !0,
                useCloudDocIcons: r
            }, i)), s.jsx("div", {
                className: "max-w-[8rem] truncate",
                children: s.jsx(ee, {
                    id: "5ob5C8",
                    defaultMessage: "{count} more",
                    values: {
                        count: t.length
                    }
                })
            })]
        })
    }),
    rs = ({
        moreItems: t,
        isShowingMore: e,
        onClick: n,
        isSmall: r
    }) => s.jsx(ue, {
        onClick: n,
        isSmall: r,
        children: e ? s.jsx(ee, {
            id: "0SWns2",
            defaultMessage: "Show less"
        }) : s.jsx(ee, {
            id: "PpZw7t",
            defaultMessage: "{count} more",
            values: {
                count: t.length
            }
        })
    }),
    os = 1500,
    ue = t => {
        "use forget";
        const e = J.c(26);
        let n, r, o, a, i, l;
        e[0] !== t ? ({
            className: o,
            componentType: i,
            children: r,
            animateScan: n,
            isSmall: l,
            ...a
        } = t, e[0] = t, e[1] = n, e[2] = r, e[3] = o, e[4] = a, e[5] = i, e[6] = l) : (n = e[1], r = e[2], o = e[3], a = e[4], i = e[5], l = e[6]);
        const c = i === void 0 ? "button" : i,
            u = l === void 0 ? !1 : l,
            [m, v] = j.useState(!1),
            g = Math.random() * os;
        let x, f;
        e[7] !== n ? (x = () => {
            n && (v(!1), requestAnimationFrame(() => v(!0)))
        }, f = [n, g], e[7] = n, e[8] = x, e[9] = f) : (x = e[8], f = e[9]), j.useEffect(x, f);
        const T = u ? kt : Ot,
            I = n && "dark:border-token-main-surface-secondary border border-[#f4f4f4] bg-transparent dark:bg-transparent",
            _ = (a.href != null || a.onClick != null) && "hover:bg-token-main-surface-primary-inverse hover:text-token-text-inverted dark:hover:bg-token-text-primary";
        let S;
        e[10] !== o || e[11] !== T || e[12] !== I || e[13] !== _ ? (S = w(T, "group relative max-w-full overflow-hidden", I, _, o), e[10] = o, e[11] = T, e[12] = I, e[13] = _, e[14] = S) : S = e[14];
        let C;
        e[15] !== n || e[16] !== m ? (C = n && s.jsx("span", {
            className: w("dark:bg-token-main-surface-secondary absolute start-0 top-0 z-[-1] h-full rounded-se-full rounded-ee-full bg-[#f4f4f4] transition-[width] ease-in-out", m ? "w-full" : "w-0"),
            style: {
                transitionDuration: `${g}ms`
            }
        }), e[15] = n, e[16] = m, e[17] = C) : C = e[17];
        let p;
        e[18] !== r ? (p = s.jsx("div", {
            className: "z-1 inline-flex items-center gap-1",
            children: r
        }), e[18] = r, e[19] = p) : p = e[19];
        let N;
        return e[20] !== c || e[21] !== a || e[22] !== p || e[23] !== S || e[24] !== C ? (N = s.jsxs(c, {
            className: S,
            ...a,
            children: [C, p]
        }), e[20] = c, e[21] = a, e[22] = p, e[23] = S, e[24] = C, e[25] = N) : N = e[25], N
    },
    Me = null,
    is = ht(() => Ge(() => Promise.resolve().then(() => Gt), void 0).then(t => t.GlauxCoTChunk)),
    ls = t => {
        "use forget";
        const e = J.c(60),
            {
                index: n,
                chunk: r,
                onClick: o,
                onMeasure: a,
                onAnimationComplete: i,
                gap: l,
                showBullet: c,
                isExpanded: u,
                isAnimationComplete: m,
                isLast: v,
                isKAUR1BR5: g,
                hasGlauxMessages: x,
                isAgentTurn: f,
                interruptionInProgress: T,
                odysseyLoadingState: I,
                disableAnimation: _
            } = t,
            S = l === void 0 ? 0 : l,
            C = c === void 0 ? !1 : c,
            p = u === void 0 ? !1 : u,
            N = m === void 0 ? !1 : m,
            h = v === void 0 ? !1 : v,
            D = g === void 0 ? !1 : g,
            B = x === void 0 ? !1 : x,
            b = f === void 0 ? !1 : f,
            P = T === void 0 ? !1 : T,
            O = I === void 0 ? xt.Done : I,
            A = _ === void 0 ? !1 : _,
            F = $(),
            E = h || p,
            y = !h || N,
            R = h ? 0 : S,
            te = Ie() ? .type === "cot";
        let se;
        e[0] !== r || e[1] !== P || e[2] !== F || e[3] !== b || e[4] !== y || e[5] !== h || e[6] !== te || e[7] !== O ? (se = te ? V(F, r, y, P, b && h, O) : void 0, e[0] = r, e[1] = P, e[2] = F, e[3] = b, e[4] = y, e[5] = h, e[6] = te, e[7] = O, e[8] = se) : se = e[8];
        const qe = se,
            z = r.type === d.Thought && r.prototypeIcon ? void 0 : qe,
            de = y || A ? "static" : "stage",
            k = y || A ? "static" : "enter";
        let ne;
        e[9] !== n || e[10] !== i ? (ne = () => {
            i ? .(n, "enter")
        }, e[9] = n, e[10] = i, e[11] = ne) : ne = e[11];
        const G = pt(ne);
        let ae, re;
        e[12] !== k || e[13] !== G ? (ae = () => {
            if (k !== "enter") return;
            const X = setTimeout(() => {
                vt.count(jt.COT_SUMMARIZER, "cot_chunk_timeout"), G()
            }, Et);
            return () => clearTimeout(X)
        }, re = [k, G], e[12] = k, e[13] = G, e[14] = ae, e[15] = re) : (ae = e[14], re = e[15]), j.useEffect(ae, re);
        const me = k === "static",
            ve = j.useRef(null);
        let oe;
        e[16] !== n || e[17] !== a ? (oe = () => yt({
            axis: "height",
            target: ve.current,
            onChange: X => {
                const {
                    height: $e
                } = X;
                return a(n, $e)
            }
        }), e[16] = n, e[17] = a, e[18] = oe) : oe = e[18];
        let ie;
        e[19] === Symbol.for("react.memo_cache_sentinel") ? (ie = [], e[19] = ie) : ie = e[19], gt(oe, ie);
        const fe = te ? void 0 : "button";
        let le;
        e[20] === Symbol.for("react.memo_cache_sentinel") ? (le = {
            static: {
                opacity: 1,
                scale: 1,
                position: "static",
                translateY: 0
            },
            enter: {
                position: "static",
                translateY: 0,
                scale: 1,
                opacity: 1
            },
            stage: {
                position: "absolute",
                translateY: -pe,
                scale: .95,
                opacity: 0
            }
        }, e[20] = le) : le = e[20];
        let L;
        e[21] !== p ? (L = p ? void 0 : {
            opacity: 0,
            pointerEvents: "none",
            position: "absolute",
            translateY: pe,
            filter: "blur(8px)"
        }, e[21] = p, e[22] = L) : L = e[22];
        let U;
        e[23] !== n ? (U = {
            zIndex: n
        }, e[23] = n, e[24] = U) : U = e[24];
        let Q;
        e[25] !== k || e[26] !== N ? (Q = N || k === "static" ? {
            duration: 0
        } : {
            type: "spring",
            bounce: .05
        }, e[25] = k, e[26] = N, e[27] = Q) : Q = e[27];
        const xe = !E && "pointer-events-none";
        let W;
        e[28] !== xe ? (W = w("text-token-text-secondary origin-start start-0 end-0 top-0 mb-2 flex", xe), e[28] = xe, e[29] = W) : W = e[29];
        let H;
        e[30] !== n || e[31] !== i ? (H = X => X !== "enter" && i(n, X), e[30] = n, e[31] = i, e[32] = H) : H = e[32];
        let Y;
        e[33] !== r || e[34] !== z || e[35] !== B || e[36] !== R || e[37] !== b || e[38] !== y || e[39] !== p || e[40] !== D || e[41] !== h || e[42] !== E || e[43] !== C ? (Y = C ? s.jsxs("div", {
            className: w("relative flex w-full items-start gap-2 overflow-clip", Me),
            children: [Me, s.jsxs("div", {
                className: "flex h-full w-4 shrink-0 flex-col items-center",
                children: [s.jsx("div", {
                    className: "flex h-5 shrink-0 items-center justify-center",
                    children: s.jsx(At, {
                        chunk: r,
                        size: "small"
                    })
                }), !h && s.jsx(M.div, {
                    initial: {
                        translateY: -pe,
                        opacity: 0
                    },
                    animate: {
                        translateY: 0,
                        opacity: 1
                    },
                    className: "bg-token-border-heavy h-full w-[1px] rounded-full"
                })]
            }), s.jsxs("div", {
                className: "w-full min-w-0",
                style: {
                    marginBottom: R
                },
                children: [E && s.jsx("div", {
                    className: "w-full min-w-0",
                    children: z && s.jsx("div", {
                        className: "text-token-text-primary text-[14px]",
                        children: z
                    })
                }), s.jsx(Te, {
                    chunk: r,
                    isExpanded: p,
                    isComplete: y,
                    isLast: h,
                    isKAUR1BR5: D,
                    hasGlauxMessages: B,
                    isAgentTurn: b
                })]
            })]
        }) : s.jsxs("div", {
            className: "w-full min-w-0",
            style: {
                marginBottom: R
            },
            children: [E && s.jsx("div", {
                className: "w-full min-w-0",
                children: z && s.jsx("div", {
                    className: "text-token-text-primary text-sm",
                    children: z
                })
            }), s.jsx(Te, {
                chunk: r,
                isExpanded: p,
                isComplete: y,
                isLast: h,
                isKAUR1BR5: D,
                isAgentTurn: b
            })]
        }), e[33] = r, e[34] = z, e[35] = B, e[36] = R, e[37] = b, e[38] = y, e[39] = p, e[40] = D, e[41] = h, e[42] = E, e[43] = C, e[44] = Y) : Y = e[44];
        let K;
        e[45] !== me || e[46] !== G || e[47] !== Y ? (K = s.jsx(at, {
            onComplete: G,
            isDisabled: me,
            defaultDelayPerSegmentMs: 20,
            children: Y
        }), e[45] = me, e[46] = G, e[47] = Y, e[48] = K) : K = e[48];
        let ce;
        return e[49] !== k || e[50] !== de || e[51] !== o || e[52] !== fe || e[53] !== L || e[54] !== U || e[55] !== Q || e[56] !== W || e[57] !== H || e[58] !== K ? (ce = s.jsx(M.div, {
            role: fe,
            variants: le,
            initial: de,
            animate: k,
            exit: L,
            style: U,
            transition: Q,
            className: W,
            onAnimationComplete: H,
            onClick: o,
            ref: ve,
            children: K
        }), e[49] = k, e[50] = de, e[51] = o, e[52] = fe, e[53] = L, e[54] = U, e[55] = Q, e[56] = W, e[57] = H, e[58] = K, e[59] = ce) : ce = e[59], ce
    },
    ys = j.memo(ls);

function Fe(t) {
    switch (t) {
        case "gmail":
            return s.jsx(rt, {
                className: "icon-sm shrink-0",
                alt: "Mail"
            });
        case "file":
            return s.jsx(Ze, {
                className: "icon-sm shrink-0",
                alt: "Files"
            });
        case "convo":
            return s.jsx(Ve, {
                className: "icon-sm shrink-0",
                alt: "Past chats"
            })
    }
}

function cs(t) {
    "use forget";
    const e = J.c(7),
        {
            content: n,
            icon: r
        } = t;
    let o;
    e[0] !== r ? (o = Fe(r), e[0] = r, e[1] = o) : o = e[1];
    let a;
    e[2] !== n ? (a = s.jsx("span", {
        className: "line-clamp-3",
        children: n
    }), e[2] = n, e[3] = a) : a = e[3];
    let i;
    return e[4] !== o || e[5] !== a ? (i = s.jsxs("div", {
        className: "text-token-text-secondary flex items-center gap-2 text-[14px] leading-5",
        children: [o, a]
    }), e[4] = o, e[5] = a, e[6] = i) : i = e[6], i
}
const Cs = t => {
        "use forget";
        const e = J.c(32),
            {
                className: n,
                dot: r,
                chunk: o,
                text: a,
                isStreamingAnimation: i,
                isInteractive: l,
                onClick: c
            } = t,
            u = l === void 0 ? !0 : l,
            [m, v] = j.useState(""),
            g = j.useDeferredValue(m),
            x = j.useRef(null),
            f = j.useRef("");
        let T, I;
        e[0] !== i ? (T = () => {
            if (i) return x.current = new je(ye, v, "", !0), () => {
                x.current ? .destroy(), x.current = null
            }
        }, I = [i], e[0] = i, e[1] = T, e[2] = I) : (T = e[1], I = e[2]), j.useEffect(T, I);
        let _, S;
        e[3] !== i || e[4] !== a ? (_ = () => {
            if (!i) return;
            const O = x.current;
            if (!O) return;
            const A = f.current;
            a.startsWith(A) || (O.destroy(), v(""), x.current = new je(ye, v, "", !0)), x.current ? .setText(a), f.current = a
        }, S = [a, i], e[3] = i, e[4] = a, e[5] = _, e[6] = S) : (_ = e[5], S = e[6]), j.useEffect(_, S);
        let C;
        e[7] !== o ? (C = o ? .type === d.Thought && o.prototypeIcon ? Fe(o.prototypeIcon) : void 0, e[7] = o, e[8] = C) : C = e[8];
        const p = C;
        if (p) {
            const O = u ? "cursor-pointer" : "cursor-default";
            let A;
            e[9] !== n || e[10] !== O ? (A = w("text-token-text-tertiary flex items-center gap-2", O, n), e[9] = n, e[10] = O, e[11] = A) : A = e[11];
            const F = u ? c : void 0,
                E = i ? g : a;
            let y;
            e[12] !== r ? (y = r && s.jsx("span", {
                className: "ms-1 inline-block size-3.5 rounded-full bg-black dark:bg-white"
            }), e[12] = r, e[13] = y) : y = e[13];
            let R;
            e[14] !== E || e[15] !== y ? (R = s.jsxs("span", {
                className: "line-clamp-3",
                children: [E, y]
            }), e[14] = E, e[15] = y, e[16] = R) : R = e[16];
            let Z;
            return e[17] !== p || e[18] !== R || e[19] !== A || e[20] !== F ? (Z = s.jsxs("p", {
                className: A,
                onClick: F,
                children: [p, R]
            }), e[17] = p, e[18] = R, e[19] = A, e[20] = F, e[21] = Z) : Z = e[21], Z
        }
        const N = u ? "cursor-pointer" : "cursor-default";
        let h;
        e[22] !== n || e[23] !== N ? (h = w("text-token-text-tertiary line-clamp-3", N, n), e[22] = n, e[23] = N, e[24] = h) : h = e[24];
        const D = u ? c : void 0,
            B = i ? g : a;
        let b;
        e[25] !== r ? (b = r && s.jsx("span", {
            className: "ms-1 inline-block size-3.5 rounded-full bg-black dark:bg-white"
        }), e[25] = r, e[26] = b) : b = e[26];
        let P;
        return e[27] !== B || e[28] !== b || e[29] !== h || e[30] !== D ? (P = s.jsxs("p", {
            className: h,
            onClick: D,
            children: [B, b]
        }), e[27] = B, e[28] = b, e[29] = h, e[30] = D, e[31] = P) : P = e[31], P
    },
    ws = ({
        chunk: t,
        isLast: e,
        hasGlauxMessages: n,
        intl: r
    }) => {
        switch (t.type) {
            case d.Thought:
                return t.thought.content.trim() || t.thought.summary;
            case d.Recap:
                return t.didFailReasoning || t.didSkipReasoning ? null : t.content.includes("Stopped") ? r.formatMessage({
                    id: "sOsSsn",
                    defaultMessage: "Stopped"
                }) : n && !e ? "" : r.formatMessage({
                    id: "Eo2n2s",
                    defaultMessage: "Done"
                });
            case d.Search:
                return t.sources.slice(0, 3).map(o => o.domain).join(", ") + "...";
            case d.CodeAnalysis:
                return null;
            case d.N7jupdAPI:
                return null;
            case d.Browsing:
                return null;
            case d.ImageAnalysis:
                return r.formatMessage({
                    id: "IrgecZ",
                    defaultMessage: "Analyzing image"
                });
            case d.ComputerOutput:
                return r.formatMessage({
                    id: "QJACwT",
                    defaultMessage: "Using browser"
                });
            case d.N7jupdLoading:
                return null;
            case d.e1ld0dvz:
                return r.formatMessage({
                    id: "f87J+9",
                    defaultMessage: "Delegating tasks"
                });
            case d.Glaux:
                return Oe({
                    intl: r,
                    chunk: t
                });
            case d.Strix:
                return Je({
                    intl: r,
                    chunk: t
                });
            case d.Dragonfruit:
                return t.description || "";
            case d.DragonfruitInteraction:
                return t.interactions.length === 1 && t.interactions[0].type === "type" ? t.interactions[0].content : ""
        }
    },
    Te = ({
        chunk: t,
        isExpanded: e,
        isComplete: n,
        isLast: r,
        isKAUR1BR5: o,
        hasGlauxMessages: a,
        isAgentTurn: i
    }) => {
        const l = $(),
            c = nt(!!i);
        switch (t.type) {
            case d.Thought:
                {
                    const u = t.thought.content.trim() || t.thought.summary;
                    return t.prototypeIcon ? e ? s.jsx(q, {
                        content: u
                    }) : s.jsx(cs, {
                        content: u,
                        icon: t.prototypeIcon
                    }) : s.jsx(q, {
                        content: u
                    })
                }
            case d.Recap:
                return t.didFailReasoning || t.didSkipReasoning ? null : t.content.includes("Stopped") ? s.jsx(q, {
                    content: l.formatMessage({
                        id: "sOsSsn",
                        defaultMessage: "Stopped"
                    })
                }) : a && !r ? null : s.jsx(q, {
                    content: l.formatMessage({
                        id: "Eo2n2s",
                        defaultMessage: "Done"
                    })
                });
            case d.Search:
                return s.jsx(ts, {
                    chunk: t,
                    isExpanded: e,
                    isComplete: n,
                    enableV4: c
                });
            case d.CodeAnalysis:
                {
                    const u = t.assistantMessage,
                        m = t.toolMessage;
                    return u ? .recipient === "container.exec" && u ? .metadata ? .n7jupd_message && m ? .metadata ? .n7jupd_message ? s.jsx(zt, {
                        chunk: t,
                        isExpanded: e,
                        isComplete: n,
                        enableV4: c
                    }) : s.jsx(Yt, {
                        chunk: t,
                        isExpanded: e,
                        isComplete: n,
                        enableV4: c
                    })
                }
            case d.N7jupdAPI:
                return t.action === "n7jupd_as" || t.action === "n7jupd_ag" ? e && s.jsx(q, {
                    content: ge({
                        action: t.action,
                        source: t.source,
                        intl: l
                    })
                }) : s.jsx(es, {
                    chunk: t,
                    isExpanded: e,
                    isComplete: n
                });
            case d.Browsing:
                return e && s.jsx(q, {
                    content: st({
                        contextualAnswerSources: t.sources,
                        intl: l
                    })
                });
            case d.ImageAnalysis:
                return s.jsx(Kt, {
                    chunk: t,
                    isExpanded: e,
                    isComplete: n,
                    enableV4: c
                });
            case d.ComputerOutput:
                return s.jsx(tt, {
                    chunk: t,
                    isKAUR1BR5: o
                });
            case d.N7jupdLoading:
                return null;
            case d.e1ld0dvz:
                return s.jsx(Wt, {
                    tasks: t.tasks
                });
            case d.Glaux:
                return s.jsx(is, {
                    chunk: t,
                    isExpanded: e,
                    isComplete: n
                });
            case d.Strix:
                return s.jsx(et, {
                    chunk: t,
                    isExpanded: e,
                    isComplete: n
                });
            case d.Dragonfruit:
                return s.jsx(be, {
                    chunk: t,
                    children: s.jsx(q, {
                        content: t.description || t.text
                    })
                });
            case d.DragonfruitInteraction:
                return s.jsx(be, {
                    chunk: t,
                    children: s.jsx(Rt, {
                        interactionChunk: t,
                        isExpanded: e
                    })
                })
        }
    };
export {
    ys as C, pe as S, js as a, Cs as b, De as c, ws as g
};
//# sourceMappingURL=41a2fdf3-im11ns7i6t39a3tt.js.map