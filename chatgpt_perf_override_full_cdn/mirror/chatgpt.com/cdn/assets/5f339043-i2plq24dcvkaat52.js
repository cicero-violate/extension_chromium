import {
    j as n,
    u as A,
    r as d,
    o as M,
    s as G,
    c as _,
    h as se,
    m as ne,
    z as ae,
    v as oe,
    f as re
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    cz as q,
    aP as ce,
    af as j,
    a6 as ie,
    zK as S,
    zL as w,
    r_ as le,
    de as Y,
    sE as ue,
    k as V,
    qv as de,
    tJ as fe,
    Dx as Q,
    Dw as me,
    R as z,
    jP as he,
    ss as ye,
    sp as ge,
    e as xe,
    f as pe,
    q as J,
    I2 as ve,
    gD as ke,
    aN as be,
    a0 as we,
    I as je,
    bX as Ce
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    u as Ne,
    F as Se
} from "./38b1cb71-fzxhpchabhdp967b.js";
import {
    ca as X,
    iR as Me,
    jS as _e,
    CT as Re,
    jd as Pe,
    CU as Ie,
    sV as Fe,
    fA as De
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    F as N
} from "./ed836a35-dsvpt9pika8334yj.js";

function Ee({
    children: t,
    rootClassName: e,
    className: s,
    description: a,
    icon: c,
    isOpen: r = !1,
    onClose: o,
    primaryButton: m,
    secondaryButton: i,
    size: l = "normal",
    title: u,
    type: h,
    noPadding: x = !1,
    hideSeparator: f = !1,
    showCloseButton: v = !1,
    shouldIgnoreClickOutside: p = !1,
    closeButton: y,
    isScrollable: b = !0,
    position: R = "center",
    removePopoverStyling: P = !1,
    showOverlayBackground: E = !0,
    shadow: I = "normal"
}) {
    const F = !!u,
        C = !!t,
        $ = F && C && !f;
    return n.jsx(q.Root, {
        testId: "modal-fanny-pack",
        isOpen: r,
        onClose: o,
        shouldIgnoreClickOutside: p,
        className: e,
        children: n.jsx(q.Overlay, {
            showBackground: E,
            children: n.jsxs(Ae, {
                size: l,
                position: R,
                className: j("flex flex-col focus:outline-hidden", {
                    "max-w-md": l === "normal"
                }, s),
                removePopoverStyling: P,
                shadow: I,
                children: [n.jsx(q.Header, {
                    icon: c,
                    title: u,
                    type: h,
                    closeButton: v && (y ? ? n.jsx(ce, {
                        onClick: () => o(!0)
                    })),
                    description: a,
                    hasSeparator: $
                }), n.jsxs("div", {
                    className: j("grow", b ? "overflow-y-auto" : "overflow-y-hidden", {
                        "p-4 sm:p-6": l !== "fullscreen" && !x,
                        "md:pt-0!": !C
                    }),
                    children: [t, m != null || i != null ? n.jsx(q.Actions, {
                        primaryButton: m,
                        secondaryButton: i,
                        modalHasContent: C
                    }) : null]
                })]
            })
        })
    })
}

function Ae({
    className: t,
    children: e,
    position: s = "center",
    size: a,
    removePopoverStyling: c = !1,
    shadow: r = "normal"
}) {
    return n.jsx("div", {
        className: j("z-50 h-full w-full overflow-y-auto", a !== "fullscreen" && "grid grid-cols-[10px_1fr_10px]", a !== "fullscreen" && s === "center" && "grid-rows-[minmax(10px,1fr)_auto_minmax(10px,1fr)] md:grid-rows-[minmax(20px,1fr)_auto_minmax(20px,1fr)]", a !== "fullscreen" && s === "bottom" && "grid-rows-[minmax(10px,1fr)_auto_10px] md:grid-rows-[minmax(20px,1fr)_auto_20px]"),
        children: n.jsx(ie, {
            className: j(!c && "popover", "bg-token-main-surface-primary relative start-1/2 col-auto col-start-2 row-auto row-start-2 h-full w-full text-start ltr:-translate-x-1/2 rtl:translate-x-1/2", a !== "fullscreen" && "rounded-2xl", r === "normal" && "shadow-xl", t),
            onEscapeKeyDown: o => {
                o.stopPropagation()
            },
            children: e
        })
    })
}

function Le() {
    const t = A(),
        e = S(a => a.query),
        s = d.useRef(null);
    return n.jsx("input", {
        className: "placeholder:text-token-text-tertiary w-full border-none bg-transparent focus:border-transparent focus:ring-0 focus:outline-hidden",
        placeholder: t.formatMessage({
            id: "FannyPack.SearchPlaceholder",
            defaultMessage: "Search chats..."
        }),
        onChange: a => w.setQuery(a.target.value),
        onKeyDown: a => {
            !a.shiftKey && (a.key === "ArrowUp" || a.key === "ArrowDown") && a.preventDefault()
        },
        value: e,
        ref: s
    })
}

function L({
    className: t,
    isActive: e = !1,
    icon: s,
    children: a,
    href: c,
    onClick: r,
    onMouseEnter: o,
    onMouseLeave: m
}) {
    const i = S(h => h.mouseInteractionsDisabled),
        l = n.jsxs("div", {
            className: j("group relative flex items-center rounded-xl px-4 py-3", e && "dark:bg-token-main-surface-secondary bg-[#f4f4f4]"),
            children: [s, n.jsx("div", {
                className: j("relative grow overflow-hidden whitespace-nowrap", s ? "ps-2" : ""),
                children: a
            })]
        }),
        u = j("block cursor-pointer no-underline", r && !c && "w-full border-0 bg-transparent p-0 text-start", t);
    return c ? n.jsx("a", {
        href: c,
        className: u,
        onMouseEnter: i ? void 0 : o,
        onMouseLeave: i ? void 0 : m,
        onClick: r,
        children: l
    }) : r ? n.jsx("button", {
        type: "button",
        className: u,
        onMouseEnter: i ? void 0 : o,
        onMouseLeave: i ? void 0 : m,
        onClick: r,
        children: l
    }) : n.jsx("div", {
        className: u,
        onMouseEnter: i ? void 0 : o,
        onMouseLeave: i ? void 0 : m,
        children: l
    })
}

function O(t) {
    return !t.defaultPrevented && t.button === 0 && !le(t)
}

function W(t) {
    return t.formatMessage({
        id: "fannyPack.DefaultChatTitle",
        defaultMessage: "New chat"
    })
}

function Z(t) {
    return t ? `/?${new URLSearchParams({q:t}).toString()}` : "/"
}

function Te({
    historyResult: t,
    index: e
}) {
    const s = A(),
        {
            item: a,
            onSelect: c
        } = t,
        r = S(o => o.activeIndex);
    return n.jsx(L, {
        isActive: r === e,
        icon: n.jsx(X, {
            className: "icon"
        }),
        href: Y(a.id),
        onClick: o => {
            N.logClick(a.id, e, "history"), O(o) && (o.preventDefault(), c && c())
        },
        onMouseEnter: () => w.setActiveIndex(e),
        onMouseLeave: () => w.setActiveIndex(void 0),
        children: n.jsx("div", {
            className: "text-sm",
            children: a.title ? ? W(s)
        })
    })
}

function qe({
    labelResult: t
}) {
    return n.jsx("div", {
        className: "group text-token-text-tertiary relative my-2 px-4 pt-2 text-xs leading-4",
        children: t.text
    })
}

function Be({
    newChatResult: t,
    query: e = void 0,
    index: s
}) {
    const {
        onSelect: a
    } = t, c = S(o => o.activeIndex), r = typeof e == "string" ? Z(e) : "/";
    return n.jsx(L, {
        isActive: c === s,
        href: r,
        onClick: o => {
            _e(o, {
                location: "Fanny Pack"
            }), O(o) && (o.preventDefault(), a && a())
        },
        onMouseEnter: () => w.setActiveIndex(s),
        onMouseLeave: () => w.setActiveIndex(void 0),
        icon: n.jsx(Me, {
            className: "icon"
        }),
        children: n.jsx("div", {
            className: "text-sm",
            children: e ? n.jsx(M, {
                id: "iQsutJ",
                defaultMessage: 'New chat "{query}"',
                values: {
                    query: e
                }
            }) : n.jsx(M, {
                id: "FannyPack.NewChat",
                defaultMessage: "New chat"
            })
        })
    })
}

function Ye(t) {
    return d.useMemo(() => {
        if (!t) return null;
        const e = new Date(t * 1e3),
            s = new Date;
        return e.toDateString() === s.toDateString() ? "Today" : new Date(new Date().setDate(s.getDate() - 1)).toDateString() === e.toDateString() ? "Yesterday" : e.getFullYear() === s.getFullYear() ? e.toLocaleDateString(void 0, {
            month: "short",
            day: "numeric"
        }) : e.toLocaleDateString(void 0, {
            year: "2-digit",
            month: "numeric",
            day: "numeric"
        })
    }, [t])
}
const $e = 8;

function Oe(t) {
    return t.isArchived ? {
        titleClassName: "text-sm text-token-text-tertiary",
        titleHighlightedClassName: "text-token-text-secondary font-semibold",
        messageClassName: "text-xs text-token-text-tertiary",
        messageHighlightedClassName: "text-token-text-secondary font-medium"
    } : {
        titleClassName: "text-sm text-token-text-primary",
        titleHighlightedClassName: "text-token-text-primary font-semibold",
        messageClassName: "text-xs text-token-text-secondary",
        messageHighlightedClassName: "text-token-text-primary font-medium"
    }
}

function Ke(t) {
    if (t.isArchived) return n.jsx(Pe, {
        className: "icon text-token-text-tertiary"
    });
    if (!t.isCalpicoRoom) return n.jsx(X, {
        className: "icon"
    });
    const e = t.calpicoRoomMembers ? ? [];
    return e.length <= 1 ? n.jsx(Ie, {
        className: "icon-lg text-token-icon-primary -m-0.5 opacity-[0.15]"
    }) : n.jsx(Fe, {
        list: e.map(s => ({
            id: s.accountUserId,
            avatarUrl: s.avatarUrl,
            name: s.name
        })),
        baseSize: 20
    })
}

function H({
    text: t,
    textToHighlight: e,
    shouldAdjustStart: s = !1,
    highlightClassName: a
}) {
    const c = d.useMemo(() => {
            if (!s || !e) return t;
            const o = t.toLowerCase().indexOf(e ? .toLowerCase());
            if (o === -1) return t;
            const m = Math.max(o - $e, 0),
                i = t.substring(m);
            return m === 0 ? i : "…" + i
        }, [t, e, s]),
        r = d.useMemo(() => {
            const o = new RegExp(`(${Re(e)})`, "gi");
            return c.split(o)
        }, [c, e]);
    return !e || e.length === 0 ? n.jsx("span", {
        children: t
    }) : n.jsx("div", {
        className: "truncate",
        children: r.map((o, m) => o.toLowerCase() === e.toLowerCase() ? n.jsx("span", {
            className: a,
            children: o
        }, m) : o)
    })
}

function Qe({
    searchResult: t,
    index: e,
    elementRef: s
}) {
    const {
        item: a,
        onSelect: c,
        query: r,
        href: o
    } = t, m = A(), i = Ye(a.updateTime), l = Oe(a), h = S(f => f.activeIndex) === e, x = d.useRef(null);
    return d.useEffect(() => {
        let f;
        const v = setTimeout(() => {
            f = new IntersectionObserver(p => {
                p.forEach(y => {
                    y.isIntersecting && (N.logImpression(a.source, e, a.conversationId), f && f.disconnect())
                })
            }, {
                threshold: .5
            }), x.current && f.observe(x.current)
        }, 250);
        return () => {
            f && f.disconnect(), clearTimeout(v)
        }
    }, [x, a, r, e]), n.jsx("div", {
        ref: x,
        children: n.jsx(L, {
            isActive: h,
            icon: Ke(a),
            href: o,
            onClick: f => {
                N.logClick(a.conversationId, e, a.source, a.updateTime), O(f) && (f.preventDefault(), c && c())
            },
            onMouseEnter: () => w.setActiveIndex(e),
            onMouseLeave: () => w.setActiveIndex(void 0),
            children: n.jsxs("div", {
                className: "flex items-center",
                ref: s,
                children: [n.jsxs("div", {
                    className: "relative grow overflow-hidden whitespace-nowrap",
                    children: [n.jsx("div", {
                        className: l.titleClassName,
                        children: n.jsx(H, {
                            text: a.title && a.title.length > 0 ? a.title : W(m),
                            textToHighlight: r.length >= 3 ? r : void 0,
                            highlightClassName: l.titleHighlightedClassName
                        })
                    }), n.jsx("div", {
                        className: j("pt-1", l.messageClassName),
                        children: n.jsx(H, {
                            text: a.snippet ? ? "",
                            textToHighlight: r.length >= 3 ? r : void 0,
                            shouldAdjustStart: !0,
                            highlightClassName: l.messageHighlightedClassName
                        })
                    })]
                }), h && n.jsx("div", {
                    className: "text-token-text-secondary ps-6 text-xs",
                    children: i
                })]
            })
        })
    })
}

function T() {
    return d.useMemo(() => ({
        closeFannyPackModal: t => {
            N.logClose(t), w.setIsActive(!1)
        }
    }), [])
}

function K() {
    const t = G(),
        {
            closeFannyPackModal: e
        } = T();
    return d.useCallback(s => {
        t(s), e("click")
    }, [t, e])
}

function He() {
    "use forget";
    const t = _.c(19),
        {
            conversations: e
        } = ue(),
        {
            closeFannyPackModal: s
        } = T();
    let a;
    t[0] === Symbol.for("react.memo_cache_sentinel") ? (a = V("550560761"), t[0] = a) : a = t[0];
    const c = a.value,
        r = Number(c ? .history_results_limit ? ? 6);
    let o;
    t[1] !== e ? (o = e.slice(0, Math.min(e.length, r)), t[1] = e, t[2] = o) : o = t[2];
    const i = Ue(o),
        l = K(),
        u = G();
    let h;
    t[3] !== s || t[4] !== u ? (h = {
        kind: "newChat",
        onSelect: () => {
            De(u), s("button")
        }
    }, t[3] = s, t[4] = u, t[5] = h) : h = t[5];
    const x = h;
    let f;
    if (t[6] !== i.dynamicMonths || t[7] !== i.dynamicYears || t[8] !== i.recent || t[9] !== l || t[10] !== x) {
        f = [x];
        let p;
        if (t[12] !== i.dynamicMonths || t[13] !== i.dynamicYears || t[14] !== i.recent || t[15] !== l) {
            let y;
            t[17] !== l ? (y = (b, R) => (Object.entries(R).forEach(P => {
                const [, E] = P, {
                    items: I,
                    label: F
                } = E;
                I.length > 0 && (b.push({
                    kind: "label",
                    text: F
                }), I.forEach(C => {
                    b.push({
                        kind: "history",
                        onSelect: () => {
                            l(Y(C.id))
                        },
                        item: C
                    })
                }))
            }), b), t[17] = l, t[18] = y) : y = t[18], p = [i.recent, i.dynamicMonths, i.dynamicYears].reduce(y, []), t[12] = i.dynamicMonths, t[13] = i.dynamicYears, t[14] = i.recent, t[15] = l, t[16] = p
        } else p = t[16];
        f.push(...p), t[6] = i.dynamicMonths, t[7] = i.dynamicYears, t[8] = i.recent, t[9] = l, t[10] = x, t[11] = f
    } else f = t[11];
    return f
}
const B = se({
    historyBucketToday: {
        id: "history.bucket.today",
        defaultMessage: "Today"
    },
    historyBucketYesterday: {
        id: "history.bucket.yesterday",
        defaultMessage: "Yesterday"
    },
    historyBucketLastSeven: {
        id: "history.bucket.lastSeven",
        defaultMessage: "Previous 7 Days"
    },
    historyBucketLastThirty: {
        id: "history.bucket.lastThirty",
        defaultMessage: "Previous 30 Days"
    }
});

function Ue(t) {
    "use forget";
    const e = _.c(9),
        s = A();
    let a;
    if (e[0] !== s || e[1] !== t) {
        let c;
        e[3] !== s ? (c = (l, u) => {
            const h = new Date(u.update_time ? ? u.create_time ? ? 0),
                x = de(new Date, h);
            if (x === 0) l.recent.today.items.push(u);
            else if (x <= 1) l.recent.yesterday.items.push(u);
            else if (x <= 7) l.recent.lastSeven.items.push(u);
            else if (x <= 30) l.recent.lastThirty.items.push(u);
            else if (fe(h)) {
                const f = Q(h),
                    v = me(h),
                    p = `${f}-${v}`;
                l.dynamicMonths[p] ? l.dynamicMonths[p].items.push(u) : l.dynamicMonths[p] = {
                    label: s.formatDate(h, {
                        month: "long"
                    }),
                    items: [u]
                }
            } else {
                const v = `${Q(h)}-`;
                l.dynamicYears[v] ? l.dynamicYears[v].items.push(u) : l.dynamicYears[v] = {
                    label: s.formatDate(h, {
                        year: "numeric"
                    }),
                    items: [u]
                }
            }
            return l
        }, e[3] = s, e[4] = c) : c = e[4];
        let r;
        e[5] === Symbol.for("react.memo_cache_sentinel") ? (r = n.jsx(M, { ...B.historyBucketToday
        }), e[5] = r) : r = e[5];
        let o;
        e[6] === Symbol.for("react.memo_cache_sentinel") ? (o = n.jsx(M, { ...B.historyBucketYesterday
        }), e[6] = o) : o = e[6];
        let m;
        e[7] === Symbol.for("react.memo_cache_sentinel") ? (m = n.jsx(M, { ...B.historyBucketLastSeven
        }), e[7] = m) : m = e[7];
        let i;
        e[8] === Symbol.for("react.memo_cache_sentinel") ? (i = n.jsx(M, { ...B.historyBucketLastThirty
        }), e[8] = i) : i = e[8], a = t.reduce(c, {
            recent: {
                today: {
                    label: r,
                    items: []
                },
                yesterday: {
                    label: o,
                    items: []
                },
                lastSeven: {
                    label: m,
                    items: []
                },
                lastThirty: {
                    label: i,
                    items: []
                }
            },
            dynamicMonths: {},
            dynamicYears: {}
        }), e[0] = s, e[1] = t, e[2] = a
    } else a = e[2];
    return a
}
async function Ge({
    query: t,
    cursor: e
}) {
    return z.safeGet("/conversations/search", {
        parameters: {
            query: {
                query: t,
                cursor: e
            }
        }
    })
}
async function Ve({
    query: t,
    cursor: e,
    limit: s
}) {
    return z.safeGet("/calpico/chatgpt/rooms/search", {
        parameters: {
            query: {
                query: t,
                cursor: e,
                limit: s
            }
        }
    })
}
const U = 2;

function ze(t) {
    const e = t.map(s => s.name.trim()).filter(s => s.length > 0);
    if (e.length !== 0) return e.join(", ")
}

function Je(t) {
    return {
        conversationId: t.id,
        title: t.name,
        isArchived: !1,
        updateTime: Math.floor(Date.parse(t.updated_at) / 1e3),
        snippet: ze(t.members),
        source: "remote",
        isCalpicoRoom: !0,
        calpicoRoomMembers: t.members.map(e => ({
            accountUserId: e.account_user_id,
            name: e.name,
            avatarUrl: e.avatar_url
        }))
    }
}

function Xe() {
    const t = S(g => g.query),
        e = K(),
        [s, a] = d.useState(""),
        [c, r] = d.useState(!1),
        o = d.useRef(he(g => {
            r(!1), a(g)
        }, 250)).current,
        m = d.useCallback(g => {
            g !== s && (r(!0), o(g))
        }, [s, o]);
    d.useEffect(() => {
        m(t)
    }, [t, m]);
    const i = !!s && ye() && ge().hasAccess,
        {
            data: l,
            isError: u,
            isLoading: h,
            isFetchingNextPage: x,
            hasNextPage: f,
            fetchNextPage: v
        } = ne({
            queryKey: ["conversationSearch", {
                query: s
            }],
            queryFn: ({
                pageParam: g
            }) => Ge({
                query: s,
                cursor: g
            }),
            initialPageParam: "",
            getNextPageParam: g => g.cursor ? ? void 0,
            enabled: !!s
        }),
        {
            data: p
        } = ae({
            queryKey: ["calpicoRoomSearch", {
                query: s,
                limit: U
            }],
            queryFn: () => Ve({
                query: s,
                limit: U
            }),
            enabled: i,
            retry: !1
        });
    d.useEffect(() => {
        h && N.logQuery()
    }, [h]), d.useEffect(() => {
        u && N.logQueryError()
    }, [u]), d.useEffect(() => {
        x && N.logQueryMore()
    }, [x]);
    const y = d.useMemo(() => l ? .pages.flatMap(g => g.items) ? ? [], [l]),
        b = d.useCallback(g => {
            if (h || g == null) return;
            const k = new IntersectionObserver(te => {
                te[0].isIntersecting && !x && f && v()
            });
            return k.observe(g), () => {
                k.disconnect()
            }
        }, [h, x, f, v]),
        R = d.useMemo(() => i ? p ? .items.map(Je) ? ? [] : [], [i, p]),
        P = s === t,
        E = V("550560761").value,
        I = Number(E ? .local_results_limit ? ? 0),
        F = Ne(t, I),
        C = d.useMemo(() => {
            const g = new Map(F);
            return P && (R.forEach(k => {
                g.has(k.conversationId) || g.set(k.conversationId, k)
            }), y.forEach(k => {
                g.has(k.conversation_id) || g.set(k.conversation_id, {
                    conversationId: k.conversation_id,
                    nodeId: k.current_node_id,
                    title: k.title,
                    isArchived: k.is_archived,
                    updateTime: k.update_time,
                    snippet: k.payload.snippet,
                    source: "remote"
                })
            })), Array.from(g.values())
        }, [F, y, P, R]),
        $ = t.length > 0 && (c || h || x);
    return {
        searchResults: d.useMemo(() => C.map(g => ({
            kind: "search",
            href: g.isCalpicoRoom ? `/gg/${g.conversationId}` : `${Y(g.conversationId)}?src=history_search`,
            onSelect: () => {
                if (g.isCalpicoRoom) {
                    e(`/gg/${g.conversationId}`);
                    return
                }
                e(`${Y(g.conversationId)}?src=history_search`)
            },
            item: g,
            query: t
        })), [C, e, t]),
        shouldShowLoading: $,
        infiniteScrollTriggerElementRef: b
    }
}

function We(t, e, s) {
    switch (t.kind) {
        case "history":
            return n.jsx(Te, {
                historyResult: t,
                index: e
            });
        case "label":
            return n.jsx(qe, {
                labelResult: t
            });
        case "loading":
            return n.jsx(st, {
                loadingResults: t
            });
        case "newChat":
            return n.jsx(Be, {
                newChatResult: t,
                query: t.query,
                index: e
            });
        case "noResults":
            return n.jsx(tt, {});
        case "search":
            return n.jsx(Qe, {
                searchResult: t,
                index: e,
                elementRef: s
            })
    }
}

function Ze(t, e) {
    const s = d.useCallback(() => {
            for (let r = (t ? ? -1) + 1; r < e.length; r++)
                if (e[r].onSelect) return r;
            return t
        }, [t, e]),
        a = d.useCallback(() => {
            for (let r = (t ? ? e.length) - 1; r >= 0; r--)
                if (e[r].onSelect) return r;
            return t
        }, [t, e]),
        c = d.useCallback(() => {
            t !== void 0 && e[t] && e[t].onSelect && e[t].onSelect()
        }, [t, e]);
    d.useEffect(() => {
        const r = o => {
            o.isComposing || (o.key === "ArrowUp" && !o.shiftKey ? w.setActiveIndex(a()) : o.key === "ArrowDown" && !o.shiftKey ? w.setActiveIndex(s()) : (o.key === "Enter" || o.key === "Return") && (o.preventDefault(), c()))
        };
        return window.addEventListener("keydown", r), () => {
            window.removeEventListener("keydown", r)
        }
    }, [a, s, c]), d.useEffect(() => {
        const r = () => {
            ve.getMouseInteractionsDisabled() && w.setMouseInteractionsDisabled(!1)
        };
        return window.addEventListener("mousemove", r), () => {
            window.removeEventListener("mousemove", r)
        }
    }, [])
}

function et(t, e) {
    const s = d.useRef([]);
    return d.useEffect(() => {
        s.current = e.map(() => re.createRef())
    }, [e]), d.useEffect(() => {
        s.current.forEach((a, c) => {
            t === c && a ? .current && a.current.scrollIntoView({
                behavior: "instant",
                block: "nearest"
            })
        })
    }, [t, s]), s
}

function tt() {
    return n.jsx(L, {
        className: "text-token-text-tertiary text-sm",
        icon: n.jsx(ke, {
            className: "icon"
        }),
        children: n.jsx(M, {
            id: "FannyPack.Noresults",
            defaultMessage: "No results"
        })
    })
}

function D() {
    return n.jsx(L, {
        icon: n.jsx("div", {
            className: "loading-results-shimmer bg-token-main-surface-secondary h-[14px] w-[14px] rounded-full"
        }),
        children: n.jsxs("div", {
            className: "flex min-h-[40px] flex-col justify-center",
            children: [n.jsx("div", {
                className: "loading-results-shimmer bg-token-main-surface-secondary h-2 w-1/4 rounded-full"
            }), n.jsx("div", {
                className: "loading-results-shimmer bg-token-main-surface-secondary mt-3 h-2 w-1/2 rounded-full"
            })]
        })
    })
}

function st({
    loadingResults: t
}) {
    return t.shouldShowMultiple ? n.jsxs(n.Fragment, {
        children: [n.jsx(D, {}), n.jsx(D, {}), n.jsx(D, {}), n.jsx(D, {}), n.jsx(D, {})]
    }) : n.jsx(D, {})
}

function nt() {
    const t = K(),
        {
            searchResults: e,
            shouldShowLoading: s,
            infiniteScrollTriggerElementRef: a
        } = Xe(),
        c = He(),
        r = xe(pe),
        o = S(y => y.query),
        m = o.length > 0,
        i = J("1741586789");
    d.useEffect(() => {
        N.setQuerySessionId(oe())
    }, [o]);
    const l = d.useMemo(() => ({
            kind: "newChat",
            query: o,
            onSelect: () => {
                t(Z(o))
            }
        }), [o, t]),
        u = d.useMemo(() => {
            const y = [];
            return o && i && y.push(l), m ? y.push(...e) : y.push(...c), s ? y.push({
                kind: "loading",
                shouldShowMultiple: y.length === 0
            }) : y.length === 0 && y.push({
                kind: "noResults"
            }), y
        }, [o, i, l, m, s, e, c]),
        h = S(y => y.activeIndex);
    Ze(h, u);
    const x = et(h, u),
        f = d.useRef(null);
    d.useEffect(() => {
        w.setActiveIndex(0), f.current && (f.current.scrollTop = 0)
    }, [o]);
    const v = d.useRef(!0);
    d.useEffect(() => {
        v.current && !s && u.length === 1 && u[0].kind === "noResults" && N.logNoResults(), v.current = s
    }, [s, u]);
    const p = r ? {
        "data-desktop-skip-link-handler": ""
    } : {};
    return n.jsx("div", {
        ref: f,
        ...p,
        children: n.jsx("ol", {
            className: "mx-2",
            children: u.map((y, b) => n.jsx("li", {
                ref: x.current[b],
                children: We(y, b, b === u.length - 1 ? a : void 0)
            }, b))
        })
    })
}

function ht() {
    "use forget";
    const t = _.c(3),
        e = S(at),
        s = be();
    let a;
    return t[0] !== e || t[1] !== s ? (a = s ? n.jsx(rt, {
        isOpen: e
    }) : n.jsx(ct, {
        isOpen: e
    }), t[0] = e, t[1] = s, t[2] = a) : a = t[2], a
}

function at(t) {
    return t.isActive
}

function ot(t) {
    "use forget";
    const e = _.c(9),
        {
            onClick: s,
            className: a
        } = t,
        c = A();
    let r;
    e[0] !== a ? (r = j("hover:bg-token-main-surface-secondary focus-visible:ring-token-text-quaternary dark:hover:bg-token-main-surface-tertiary flex items-center justify-center rounded-full bg-transparent p-1 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent focus-visible:outline-hidden", a), e[0] = a, e[1] = r) : r = e[1];
    let o;
    e[2] !== c ? (o = c.formatMessage({
        id: "Px7S/2",
        defaultMessage: "Close"
    }), e[2] = c, e[3] = o) : o = e[3];
    let m;
    e[4] === Symbol.for("react.memo_cache_sentinel") ? (m = n.jsx(Ce, {
        className: "icon text-token-text-tertiary hover:text-token-text-primary"
    }), e[4] = m) : m = e[4];
    let i;
    return e[5] !== s || e[6] !== r || e[7] !== o ? (i = n.jsx("button", {
        className: r,
        "aria-label": o,
        onClick: s,
        children: m
    }), e[5] = s, e[6] = r, e[7] = o, e[8] = i) : i = e[8], i
}

function ee(t) {
    "use forget";
    const e = _.c(14),
        {
            className: s
        } = t,
        {
            closeFannyPackModal: a
        } = T();
    let c;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (c = je(), e[0] = c) : c = e[0];
    const r = c,
        o = d.useRef(!1);
    let m;
    e[1] === Symbol.for("react.memo_cache_sentinel") ? (m = J("3678527908"), e[1] = m) : m = e[1];
    const i = m;
    let l, u;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (l = () => {
        !o.current && i && r && (Se.setCurrentAccount(r), o.current = !0)
    }, u = [i, r], e[2] = l, e[3] = u) : (l = e[2], u = e[3]), d.useEffect(l, u);
    let h;
    e[4] !== s ? (h = j("flex flex-col", s), e[4] = s, e[5] = h) : h = e[5];
    let x;
    e[6] === Symbol.for("react.memo_cache_sentinel") ? (x = n.jsx(Le, {}), e[6] = x) : x = e[6];
    let f;
    e[7] !== a ? (f = n.jsxs("div", {
        className: "ms-3 me-4 flex max-h-[64px] min-h-[64px] items-center justify-between",
        children: [x, n.jsx(ot, {
            className: "ms-4",
            onClick: () => {
                a("button")
            }
        })]
    }), e[7] = a, e[8] = f) : f = e[8];
    let v;
    e[9] === Symbol.for("react.memo_cache_sentinel") ? (v = n.jsx("hr", {
        className: "border-token-border-default"
    }), e[9] = v) : v = e[9];
    let p;
    e[10] === Symbol.for("react.memo_cache_sentinel") ? (p = n.jsx("div", {
        className: "my-2 grow overflow-y-auto",
        children: n.jsx(nt, {})
    }), e[10] = p) : p = e[10];
    let y;
    return e[11] !== h || e[12] !== f ? (y = n.jsxs("div", {
        className: h,
        children: [f, v, p]
    }), e[11] = h, e[12] = f, e[13] = y) : y = e[13], y
}

function rt(t) {
    "use forget";
    const e = _.c(6),
        {
            isOpen: s
        } = t,
        {
            closeFannyPackModal: a
        } = T();
    let c;
    e[0] !== a ? (c = () => {
        a("modal")
    }, e[0] = a, e[1] = c) : c = e[1];
    let r;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (r = n.jsx(ee, {}), e[2] = r) : r = e[2];
    let o;
    return e[3] !== s || e[4] !== c ? (o = n.jsx(we, {
        testId: "modal-fanny-pack-mobile",
        isOpen: s,
        onClose: c,
        size: "fullscreen",
        showCloseButton: !0,
        type: "success",
        noPadding: !0,
        children: r
    }), e[3] = s, e[4] = c, e[5] = o) : o = e[5], o
}

function ct(t) {
    "use forget";
    const e = _.c(6),
        {
            isOpen: s
        } = t,
        {
            closeFannyPackModal: a
        } = T();
    let c;
    e[0] !== a ? (c = () => {
        a("modal")
    }, e[0] = a, e[1] = c) : c = e[1];
    let r;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (r = n.jsx(ee, {
        className: "max-h-[440px] min-h-[440px]"
    }), e[2] = r) : r = e[2];
    let o;
    return e[3] !== s || e[4] !== c ? (o = n.jsx(Ee, {
        className: "border-token-border-default border bg-clip-padding shadow-[0_14px_62px_0_rgba(0,0,0,0.25)] md:max-w-[680px] md:min-w-[680px]",
        isOpen: s,
        onClose: c,
        showCloseButton: !0,
        type: "success",
        noPadding: !0,
        showOverlayBackground: !1,
        shadow: "custom",
        children: r
    }), e[3] = s, e[4] = c, e[5] = o) : o = e[5], o
}
export {
    ht as FannyPackModalContainer
};
//# sourceMappingURL=5f339043-i2plq24dcvkaat52.js.map