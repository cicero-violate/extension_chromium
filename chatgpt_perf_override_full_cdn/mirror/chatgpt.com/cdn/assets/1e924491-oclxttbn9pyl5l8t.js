const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/2c0ba89a-olv5e457apiuximf.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/e1d1ae28-lk73qwfctl3clvqu.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/2478e8be-fu39n45z77ccw3bg.js", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/conversation-small-cqp6votf.css", "assets/c50694f1-efc0umb4i9cif66s.js", "assets/d4fd05ef-jcd8acyt60dknv7p.js", "assets/f6f4f1b2-gtlbp7j4szobo0y1.js", "assets/1bc04b52-lymnctp12j4ukscl.js", "assets/1bc04b52-h1em0bjkpkjv8ykw.js", "assets/1bc04b52-homyy2s5cy2i6moh.js", "assets/1bc04b52-pfqcgruptyx7togk.js", "assets/1bc04b52-hnu6g21afx0au4ng.js", "assets/e802fc66-icima1dn58d02dbp.js", "assets/eda93c10-owa5kvkms7jsn4fn.js", "assets/6fd89734-ivsscv8296nz7zhh.js", "assets/47b5158d-lwpqmbglilo75anj.js", "assets/ed836a35-dsvpt9pika8334yj.js", "assets/38b1cb71-fzxhpchabhdp967b.js"]))) => i.map(i => d[i]);
import {
    u as $,
    j as s,
    z as Ge,
    r as z,
    s as le,
    c as A,
    n as ve,
    o as ee,
    _ as oe,
    h as Ve
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    cq as We,
    cr as qe,
    x as Qe,
    e as E,
    Cv as Ke,
    cG as Ye,
    cH as Xe,
    fk as Se,
    R as xe,
    v as Ze,
    gO as Je,
    gA as et,
    hL as tt,
    a0 as st,
    aU as at,
    aX as it,
    n_ as ot,
    et as nt,
    fS as rt,
    I as lt,
    F as ct,
    f9 as dt,
    uF as ce,
    i2 as ft,
    i0 as ut,
    ov as mt,
    _ as G,
    Cw as bt,
    Cx as ht,
    ch as pt,
    d as gt,
    g1 as yt,
    np as de,
    cD as vt,
    g6 as St,
    q as xt,
    y4 as _t,
    af as I,
    jw as jt,
    fN as Nt,
    dP as wt,
    D as It,
    gD as pe,
    z as Mt,
    c7 as kt,
    e5 as fe,
    bY as Pt,
    m6 as At,
    ih as _e,
    hF as je,
    v2 as Ne,
    h as we,
    ay as V,
    rL as Ct,
    ij as Ot,
    b5 as ne,
    mR as Et,
    a3 as Tt,
    a6 as Rt,
    an as Bt,
    a9 as Ut,
    aa as Lt,
    f7 as Ft,
    a as Ie,
    N as Me,
    a2 as Dt,
    bW as Ht,
    a1 as zt
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    cz as $t,
    tl as Gt,
    fv as ke,
    hG as Vt,
    c3 as Pe,
    mZ as Wt,
    tm as qt,
    tn as Qt,
    rq as ue,
    c0 as Kt,
    fN as Ae,
    fO as Ce,
    fP as Yt,
    to as Xt,
    fT as Zt,
    fU as Jt,
    dJ as Oe,
    tp as es,
    tq as ge,
    g5 as ts,
    fS as te,
    g0 as ss,
    fZ as Ee,
    tr as Te,
    g1 as as,
    rm as Re,
    iQ as is,
    ts as os,
    tt as ns,
    tu as ye,
    eB as re,
    jS as rs,
    tv as ls,
    iR as cs,
    gO as ds,
    oM as fs,
    oL as us,
    ry as ms,
    tw as bs,
    rB as hs,
    oV as ps,
    d0 as gs,
    rO as ys,
    tx as vs,
    ty as Ss,
    tz as xs,
    jR as _s,
    a1 as se,
    md as js,
    tA as Ns,
    dB as Be,
    jO as ae,
    aB as ws
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    r as Is
} from "./7f00cfec-f04y2v5idy58f22s.js";
import {
    l as me,
    a as Ms
} from "./e9c129e0-obrrz3bfgobj5kgi.js";
const W = We(qe(() => ({
        feedItems: [],
        hasUnreadNotifications: !1,
        isModalOpen: !1
    }))),
    ks = W.getState,
    ie = W.setState,
    Ps = {
        getHasUnreadNotifications: (t = ks()) => t.hasUnreadNotifications
    },
    H = {
        setIsModalOpen: t => {
            ie({
                isModalOpen: t
            })
        },
        setHasUnreadNotifications: t => {
            ie({
                hasUnreadNotifications: t
            })
        },
        bulkLoadFeedItems: t => {
            ie(e => {
                e.feedItems = t
            })
        }
    };

function As() {
    const t = be(),
        e = W(Ps.getHasUnreadNotifications);
    return t && e
}

function Ue(t, e, a, l) {
    const c = As(),
        i = E(() => Ke().some(n => Ye(n) ? .value === Xe.UNREAD));
    return a && c || l && i ? t : e
}

function be() {
    return Qe("3606233934", {
        disableExposureLog: !0
    }).get("enable_notifications_feed")
}

function na() {
    const t = be(),
        e = W(a => a.isModalOpen);
    return t && e
}

function Cs() {
    const t = be(),
        e = Ge({
            queryKey: ["fetch-notifications-feed"],
            queryFn: async () => {
                const a = await xe.safeGet("/notifications/feed", {});
                return H.bulkLoadFeedItems(a.items), H.setHasUnreadNotifications(a.has_unreads), a.items
            },
            enabled: t
        });
    return {
        isLoading: e.isLoading,
        isFetching: e.isFetching
    }
}

function ra() {
    const t = $(),
        e = Ue(Gt, $t, !0, !1),
        a = t.formatMessage({
            id: "1UHY6w",
            defaultMessage: "Notifications"
        });
    return Cs(), s.jsx(Se, {
        label: a,
        className: "group",
        children: s.jsx(ke, {
            icon: e,
            onClick: () => H.setIsModalOpen(!0),
            "aria-label": a
        })
    })
}

function Os({
    conversation: t,
    item: e,
    onClose: a
}) {
    const c = {
        announcement: Pe
    }[e.type];
    let i = null;
    try {
        const r = new Date(e.created_at);
        i = Wt({
            date: r
        })
    } catch {}
    const o = le(),
        n = r => {
            if (e.action ? .type === "show_conversation") a(), o(e.action.conversation_id);
            else if (e.action ? .type === "new_conversation") {
                const d = e.action;
                d.prefilled_message && (Is({
                    callsiteId: "request_completion.notifications.notifications_feed.1",
                    conversation: t,
                    sourceEvent: r,
                    promptMessage: nt(d.prefilled_message),
                    requestedModelId: d.model_slug ? ? void 0
                }), a())
            }
        };
    return s.jsxs("button", {
        className: "border-token-border-default flex w-full items-center justify-start gap-3 overflow-hidden border-t py-4 first-of-type:border-none",
        onClick: n,
        disabled: !e.action,
        children: [s.jsx("div", {
            className: "relative",
            children: c && s.jsx(c, {
                className: "icon"
            })
        }), s.jsxs("div", {
            className: "flex h-5 shrink grow basis-0 items-center justify-between",
            children: [s.jsx("div", {
                className: "text-token-text-primary text-sm leading-tight font-normal",
                children: e.message
            }), s.jsx("div", {
                className: "flex items-center justify-start gap-1",
                children: s.jsx("div", {
                    className: "text-token-text-tertiary text-sm leading-tight font-normal",
                    children: i ? ? ""
                })
            })]
        })]
    })
}

function la({
    conversation: t
}) {
    const {
        feedItems: e,
        isModalOpen: a
    } = W();
    z.useEffect(() => {
        a && (H.setHasUnreadNotifications(!1), xe.safePost("/notifications/feed/read", {
            authOption: Ze.SendIfAvailable
        }))
    }, [a]);
    const l = $(),
        c = le(),
        i = new Date,
        o = Je(e, r => {
            const d = new Date(r.created_at);
            if (et(d)) return "today";
            const f = tt(i, d);
            return f <= 7 ? "last_7_days" : f <= 30 ? "last_30_days" : "more_than_30_days"
        }),
        n = r => {
            switch (r) {
                case "today":
                    return l.formatMessage({
                        id: "zlkA39",
                        defaultMessage: "Today"
                    });
                case "last_7_days":
                    return l.formatMessage({
                        id: "FW89A4",
                        defaultMessage: "Last 7 days"
                    });
                case "last_30_days":
                    return l.formatMessage({
                        id: "2s3h/P",
                        defaultMessage: "Last 30 days"
                    });
                case "more_than_30_days":
                    return l.formatMessage({
                        id: "yArZiR",
                        defaultMessage: "More than 30 days"
                    })
            }
        };
    return s.jsx(st, {
        testId: "modal-notifications-feed",
        isOpen: a,
        onClose: () => {
            H.setIsModalOpen(!1)
        },
        type: "success",
        size: "custom",
        className: "max-w-3xl",
        children: s.jsxs("div", {
            className: "flex flex-col gap-y-10",
            children: [s.jsxs("div", {
                className: "flex items-center justify-between",
                children: [s.jsx("h2", {
                    className: "text-2xl font-bold",
                    children: l.formatMessage({
                        id: "kWt8Cx",
                        defaultMessage: "Notifications"
                    })
                }), s.jsx(Vt, {
                    icon: s.jsx(ot, {
                        className: "icon"
                    }),
                    onClick: () => {
                        c(at(it.Notifications))
                    },
                    label: l.formatMessage({
                        id: "mZVh0S",
                        defaultMessage: "Notifications settings"
                    })
                })]
            }), Object.entries(o).map(([r, d]) => s.jsxs("div", {
                children: [s.jsx("h3", {
                    className: "text-lg font-bold",
                    children: n(r)
                }), d.map(f => s.jsx(Os, {
                    conversation: t,
                    item: f,
                    onClose: () => H.setIsModalOpen(!1)
                }, f.id))]
            }, r))]
        })
    })
}
const Le = t => {
    "use forget";
    const e = A.c(12),
        {
            iconOnly: a
        } = t,
        {
            pathname: l
        } = ve(),
        c = rt();
    let i;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (i = lt() ? .getWorkspaceId(), e[0] = i) : i = e[0];
    const o = i,
        n = c && o != null,
        {
            data: r
        } = ct(n ? o : void 0);
    if (!(!n || r ? .permissions ? .includes(dt.ImageGenAccess)) && !ce()) return null;
    let f, u, m;
    if (e[1] !== l) {
        u = Symbol.for("react.early_return_sentinel");
        e: {
            const v = qt();
            if (v === "/library" && ft()) {
                u = null;
                break e
            }
            m = ut(me(v)).toString(),
            f = l.startsWith(v)
        }
        e[1] = l, e[2] = f, e[3] = u, e[4] = m
    } else f = e[2], u = e[3], m = e[4];
    if (u !== Symbol.for("react.early_return_sentinel")) return u;
    const h = f;
    let p;
    e[5] === Symbol.for("react.memo_cache_sentinel") ? (p = Qt() ? s.jsx(ee, {
        id: "image-gen.images-app.my-images.sidebar-badge",
        defaultMessage: "New"
    }) : void 0, e[5] = p) : p = e[5];
    let b, y;
    e[6] === Symbol.for("react.memo_cache_sentinel") ? (b = {
        source: mt.CHATGPT_IMAGE_HOME_NAVIGATION_SOURCE_TYPE_SIDE_BAR
    }, y = s.jsx(ee, {
        id: "fVw/us",
        defaultMessage: "Images"
    }), e[6] = b, e[7] = y) : (b = e[6], y = e[7]);
    let g;
    return e[8] !== a || e[9] !== h || e[10] !== m ? (g = s.jsx(ue, {
        "data-testid": "sidebar-item-library",
        onClick: Es,
        badge: p,
        active: h,
        icon: Kt,
        to: m,
        state: b,
        label: y,
        iconOnly: a
    }), e[8] = a, e[9] = h, e[10] = m, e[11] = g) : g = e[11], g
};

function Es() {
    G.logStructuredEvent(bt, {
        menuItem: ht.CHATGPT_SIDEBAR_MENU_ITEM_IMAGE_HOME
    })
}
const Ts = pt(() => oe(() =>
        import ("./2c0ba89a-olv5e457apiuximf.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])).then(t => t.ShoppingCartSidebarItem), {
        loading: () => null
    }),
    Rs = gt(null);

function Fe() {
    const {
        isFannyPackEnabled: t
    } = Oe();
    return t || ce()
}
const ca = t => {
        "use forget";
        const e = A.c(20),
            {
                hasProjects: a,
                isLoading: l
            } = yt();
        let c;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (c = Ae(), e[0] = c) : c = e[0];
        const i = c;
        let o;
        e[1] === Symbol.for("react.memo_cache_sentinel") ? (o = Ce(), e[1] = o) : o = e[1];
        const n = o;
        let r;
        e[2] === Symbol.for("react.memo_cache_sentinel") ? (r = de() && vt(), e[2] = r) : r = e[2];
        const d = r;
        let f;
        e[3] === Symbol.for("react.memo_cache_sentinel") ? (f = St(), e[3] = f) : f = e[3];
        const u = f;
        let m;
        e[4] === Symbol.for("react.memo_cache_sentinel") ? (m = u && Yt(), e[4] = m) : m = e[4];
        const h = m,
            p = u && !a && !l && !h,
            b = z.useRef(null);
        let y, g;
        e[5] === Symbol.for("react.memo_cache_sentinel") ? (y = () => {
            if (b.current) return jt({
                axis: "height",
                target: b.current,
                onChange: Ls
            })
        }, g = [], e[5] = y, e[6] = g) : (y = e[5], g = e[6]), z.useEffect(y, g);
        let v;
        e[7] === Symbol.for("react.memo_cache_sentinel") ? (v = xt("3999836663"), e[7] = v) : v = e[7];
        const M = v;
        let S;
        e[8] === Symbol.for("react.memo_cache_sentinel") ? (S = Fe(), e[8] = S) : S = e[8];
        const x = S,
            k = E(_t);
        let C;
        e[9] === Symbol.for("react.memo_cache_sentinel") ? (C = s.jsxs(es, {
            children: [s.jsx(ge, {
                children: s.jsx(De, {})
            }), !1, x && s.jsx(ge, {
                children: s.jsx(He, {})
            })]
        }), e[9] = C) : C = e[9];
        let O;
        e[10] === Symbol.for("react.memo_cache_sentinel") ? (O = s.jsxs(Xt, {
            first: !0,
            ref: b,
            className: "tall:sticky tall:top-header-height tall:z-20 not-tall:relative bg-(--sidebar-mask-bg,var(--bg-elevated-secondary)) [--sticky-spacer:6px]",
            children: [C, s.jsx("div", {
                "aria-hidden": !0,
                className: I("pointer-events-none absolute start-0 end-0", "-bottom-(--sticky-spacer) h-(--sticky-spacer)", "tall:[box-shadow:var(--sharp-edge-top-shadow-placeholder)]", "tall:group-data-scrolled-from-top/scrollport:[box-shadow:var(--sharp-edge-top-shadow)]", "opacity-0 will-change-[opacity] group-data-scrolled-from-top/scrollport:opacity-100", "bg-(--sidebar-mask-bg,var(--bg-elevated-secondary))")
            })]
        }), e[10] = O) : O = e[10];
        let P;
        e[11] !== p ? (P = h ? s.jsx(Bs, {}) : i && p && s.jsx(ts, {
            hasProjects: !1
        }), e[11] = p, e[12] = P) : P = e[12];
        let j, N;
        e[13] === Symbol.for("react.memo_cache_sentinel") ? (j = Zt() && M && s.jsx(Jt, {}), N = i && n && s.jsx(te, {}), e[13] = j, e[14] = N) : (j = e[13], N = e[14]);
        let _;
        e[15] !== k ? (_ = !i && s.jsxs(s.Fragment, {
            children: [!1, s.jsx(ss, {}), s.jsx(Ee, {}), !1, !1, !k && s.jsx(Le, {}), s.jsx(te, {}), !1, s.jsx(Te, {}), s.jsx(Ts, {}), !1, !1, d && s.jsx(as, {}), !1]
        }), e[15] = k, e[16] = _) : _ = e[16];
        let w;
        return e[17] !== P || e[18] !== _ ? (w = s.jsxs(s.Fragment, {
            children: [O, P, j, N, _]
        }), e[17] = P, e[18] = _, e[19] = w) : w = e[19], w
    },
    Bs = () => {
        "use forget";
        const t = A.c(9),
            e = $(),
            {
                pathname: a
            } = ve();
        let l;
        t[0] === Symbol.for("react.memo_cache_sentinel") ? (l = me("/projects"), t[0] = l) : l = t[0];
        let c;
        t[1] !== e ? (c = e.formatMessage(Nt.projectsPageTitle), t[1] = e, t[2] = c) : c = t[2];
        let i;
        t[3] === Symbol.for("react.memo_cache_sentinel") ? (i = /(^|\/)projects(\/|$)/, t[3] = i) : i = t[3];
        let o;
        t[4] !== a ? (o = i.test(a), t[4] = a, t[5] = o) : o = t[5];
        let n;
        return t[6] !== c || t[7] !== o ? (n = s.jsx(ue, {
            "data-testid": "sidebar-item-projects",
            to: l,
            icon: ds,
            label: c,
            active: o
        }), t[6] = c, t[7] = o, t[8] = n) : n = t[8], n
    },
    De = t => {
        "use forget";
        const e = A.c(10),
            {
                iconOnly: a
            } = t,
            l = $(),
            c = Re();
        let i;
        e[0] !== c ? (i = m => {
            G.logEvent("Sidebar Click Gizmo", {
                gizmo_id: "primary"
            }), rs(m, {
                location: c ? ? "Sidebar gizmo list"
            })
        }, e[0] = c, e[1] = i) : i = e[1];
        const o = i;
        let n;
        e[2] !== l ? (n = l.formatMessage({
            id: "6Abeg/",
            defaultMessage: "New chat"
        }), e[2] = l, e[3] = n) : n = e[3];
        const r = n,
            d = is();
        let f;
        e[4] === Symbol.for("react.memo_cache_sentinel") ? (f = me("/"), e[4] = f) : f = e[4];
        let u;
        return e[5] !== o || e[6] !== a || e[7] !== r || e[8] !== d ? (u = s.jsx(ue, {
            "data-testid": "create-new-chat-button",
            to: f,
            state: d,
            onClick: o,
            icon: cs,
            label: r,
            keyBinding: ls,
            iconOnly: a
        }), e[5] = o, e[6] = a, e[7] = r, e[8] = d, e[9] = u) : u = e[9], u
    },
    He = ({
        iconOnly: t
    }) => {
        "use no forget";
        const e = $(),
            {
                isFannyPackEnabled: a
            } = Oe(),
            l = Re(),
            i = E(() => wt());
        if (z.useEffect(() => {
                a && (It.addAction("fannypack.web.action_seen"), oe(() =>
                    import ("./ed836a35-dsvpt9pika8334yj.js").then(r => r.a), __vite__mapDeps([20, 21, 3, 1, 4, 6, 7])))
            }, [a]), !Fe()) return null;
        const o = e.formatMessage({
            id: "bDEsvT",
            defaultMessage: "Search chats"
        });
        return !a && ce() ? s.jsx(os, {
            id: "search-chats" + (t ? "-icon-only" : ""),
            analyticsLocation: "Sidebar search upsell",
            icon: pe,
            iconOnly: t,
            keepSidebarOpenOnClick: i,
            keyBinding: ye,
            label: o,
            backgroundImageUrl: ns.search,
            messages: Us
        }) : s.jsx(re, {
            renderAsButton: !0,
            onClick: r => {
                i && (r.preventDefault(), r.stopPropagation()), oe(() =>
                    import ("./ed836a35-dsvpt9pika8334yj.js").then(d => d.a), __vite__mapDeps([20, 21, 3, 1, 4, 6, 7])).then(d => d.openFannyPackSearch()), G.logEventWithStatsig("chatgpt_web_search_sidebar_item_clicked", "chatgpt_web_search_sidebar_item_clicked", {
                    location: l
                })
            },
            icon: pe,
            label: o,
            keyBinding: ye,
            iconOnly: t
        })
    },
    Us = Ve({
        title: {
            id: "SidebarUnsupportedHoverCard.search.title",
            defaultMessage: "Search your chat history"
        },
        body: {
            id: "SidebarUnsupportedHoverCard.search.body",
            defaultMessage: "Log in to save conversations, search past answers, and pick up where you left off."
        }
    });

function Ls(t) {
    const {
        height: e
    } = t;
    z.startTransition(() => {
        Rs.set(e)
    })
}

function ze(t) {
    "use forget";
    const e = A.c(59);
    let a, l, c, i;
    e[0] !== t ? ({
        onOpen: c,
        className: a,
        isSidebarOpen: l,
        ...i
    } = t, e[0] = t, e[1] = a, e[2] = l, e[3] = c, e[4] = i) : (a = e[1], l = e[2], c = e[3], i = e[4]);
    const o = le(),
        n = $(),
        r = Mt();
    let d;
    e[5] !== r ? (d = r ? .isSelfServeBusiness(), e[5] = r, e[6] = d) : d = e[6];
    const f = d,
        {
            enableTinybarUpgradeBtn: u
        } = fs(),
        m = us(),
        h = ms(),
        p = E(bs),
        b = Ae();
    let y;
    e[7] === Symbol.for("react.memo_cache_sentinel") ? (y = Ce(), e[7] = y) : y = e[7];
    const g = y,
        v = !!f && !b,
        M = vs({
            isAccountReadyAndNoPaidFeatures: m,
            enableTinybarUpgradeBtn: u,
            isSidebarInviteCtaEnabled: v,
            shouldReducePrimaryItems: b
        }),
        {
            shouldHideSidebarButtonIfHeaderPillVisible: S
        } = hs({
            shouldLogExposure: M && h
        }),
        x = !l,
        k = Ss({
            isAccountReadyAndNoPaidFeatures: m,
            enableTinybarUpgradeBtn: u,
            isSidebarInviteCtaEnabled: v,
            shouldReducePrimaryItems: b,
            isThreadHeaderUpgradePillVisible: h,
            shouldHideSidebarButtonIfHeaderPillVisible: S
        });
    let C;
    e[8] !== k ? (C = {
        enabled: k
    }, e[8] = k, e[9] = C) : C = e[9], ps(C);
    let O;
    e[10] !== r ? (O = () => {
        r && (G.logEvent("Account: Invite Member Button Clicked", {
            eventSource: "mouse",
            location: "tiny-bar"
        }), fe("chatgpt_invite_users_to_workspace", 0, {
            action: "OpenAdminInviteModal",
            location: "tiny-bar",
            text: "AddTeammates",
            step: "OpenModal"
        }), Pt(xs, {
            workspace: r
        }))
    }, e[10] = r, e[11] = O) : O = e[11];
    const P = O;
    let j;
    e[12] !== a ? (j = I("group/tiny-bar flex h-full w-(--sidebar-rail-width) cursor-e-resize flex-col items-start bg-transparent pb-1.5 motion-safe:transition-colors rtl:cursor-w-resize", a), e[12] = a, e[13] = j) : j = e[13];
    let N;
    e[14] !== c ? (N = he => {
        he.target === he.currentTarget && c()
    }, e[14] = c, e[15] = N) : N = e[15];
    let _;
    e[16] !== n ? (_ = n.formatMessage({
        id: "GpHrv5",
        defaultMessage: "Open sidebar"
    }), e[16] = n, e[17] = _) : _ = e[17];
    let w;
    e[18] !== n ? (w = n.formatMessage({
        id: "IaY18K",
        defaultMessage: "Open sidebar"
    }), e[18] = n, e[19] = w) : w = e[19];
    let q, Q;
    e[20] === Symbol.for("react.memo_cache_sentinel") ? (Q = s.jsx(At, {
        className: "icon-lg -m-1 group-hover/tiny-bar:hidden group-focus-visible:hidden"
    }), q = s.jsx(_s, {
        className: "icon hidden group-hover/tiny-bar:block group-focus-visible:block"
    }), e[20] = q, e[21] = Q) : (q = e[20], Q = e[21]);
    let T;
    e[22] !== c || e[23] !== w ? (T = s.jsxs(ke, {
        as: "button",
        className: "mx-2 cursor-e-resize rtl:cursor-w-resize",
        "aria-label": w,
        "aria-expanded": !1,
        "aria-controls": "stage-slideover-sidebar",
        onClick: c,
        children: [Q, q]
    }), e[22] = c, e[23] = w, e[24] = T) : T = e[24];
    let R;
    e[25] !== T || e[26] !== _ ? (R = s.jsx("div", {
        className: "h-header-height flex items-center justify-center",
        children: s.jsx(Se, {
            label: _,
            side: "right",
            children: T
        })
    }), e[25] = T, e[26] = _, e[27] = R) : R = e[27];
    let K, Y;
    e[28] === Symbol.for("react.memo_cache_sentinel") ? (K = s.jsx(De, {
        iconOnly: !0
    }), Y = s.jsx(He, {
        iconOnly: !0
    }), e[28] = K, e[29] = Y) : (K = e[28], Y = e[29]);
    let B;
    e[30] !== g || e[31] !== b ? (B = b && g && s.jsx(te, {
        iconOnly: !0
    }), e[30] = g, e[31] = b, e[32] = B) : B = e[32];
    let U;
    e[33] !== p || e[34] !== b ? (U = !b && s.jsxs(s.Fragment, {
        children: [null, !1, p && s.jsx(Ee, {
            iconOnly: !0
        }), s.jsx(Le, {
            iconOnly: !0
        }), s.jsx(te, {
            iconOnly: !0
        }), s.jsx(Te, {
            iconOnly: !0
        }), !1]
    }), e[33] = p, e[34] = b, e[35] = U) : U = e[35];
    let L;
    e[36] !== B || e[37] !== U ? (L = s.jsxs("div", {
        className: "mt-(--sidebar-section-first-margin-top)",
        children: [K, Y, B, U]
    }), e[36] = B, e[37] = U, e[38] = L) : L = e[38];
    let X;
    e[39] === Symbol.for("react.memo_cache_sentinel") ? (X = s.jsx("div", {
        className: "pointer-events-none flex-grow"
    }), e[39] = X) : X = e[39];
    let F;
    e[40] !== n || e[41] !== x || e[42] !== o || e[43] !== k ? (F = k && s.jsx(re, {
        icon: s.jsx(Pe, {
            className: "icon-sm"
        }),
        iconOnly: !0,
        className: I("motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out", x ? "opacity-100 motion-safe:delay-[175ms]" : "opacity-0 motion-safe:delay-0"),
        label: n.formatMessage(kt.upgrade),
        onClick: () => gs(o, "tiny bar")
    }), e[40] = n, e[41] = x, e[42] = o, e[43] = k, e[44] = F) : F = e[44];
    let D;
    e[45] !== n || e[46] !== P || e[47] !== v || e[48] !== x ? (D = v && s.jsx(re, {
        icon: s.jsx(ys, {
            className: "icon-sm"
        }),
        onClick: P,
        iconOnly: !0,
        className: I("motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out", x ? "opacity-100 motion-safe:delay-[175ms]" : "opacity-0 motion-safe:delay-0"),
        label: n.formatMessage({
            id: "C4qYL7",
            defaultMessage: "Invite team members"
        })
    }), e[45] = n, e[46] = P, e[47] = v, e[48] = x, e[49] = D) : D = e[49];
    let Z;
    e[50] === Symbol.for("react.memo_cache_sentinel") ? (Z = s.jsx("div", {
        className: "mb-1",
        children: s.jsx(Ms, {})
    }), e[50] = Z) : Z = e[50];
    let J;
    return e[51] !== i || e[52] !== R || e[53] !== L || e[54] !== F || e[55] !== D || e[56] !== j || e[57] !== N ? (J = s.jsxs("div", {
        id: "stage-sidebar-tiny-bar",
        className: j,
        onClick: N,
        ...i,
        children: [R, L, X, F, D, Z]
    }), e[51] = i, e[52] = R, e[53] = L, e[54] = F, e[55] = D, e[56] = j, e[57] = N, e[58] = J) : J = e[58], J
}

function da() {
    "use forget";
    const t = A.c(8),
        e = Ue(Ns, js, !1, !0),
        a = E(Ne),
        l = we() && de();
    if (!_e()) return null;
    let i;
    t[0] === Symbol.for("react.memo_cache_sentinel") ? (i = I("touch:h-10 touch:w-10 inline-flex h-9 w-9 items-center justify-center rounded-md focus:outline-hidden", l ? "hover:bg-token-bg-tertiary text-token-text-secondary focus-visible:ring-token-ring rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:opacity-100" : "hover:text-token-text-primary rounded-md focus:ring-2 focus:ring-white focus:ring-inset active:opacity-50"), t[0] = i) : i = t[0];
    let o;
    t[1] === Symbol.for("react.memo_cache_sentinel") ? (o = s.jsx("span", {
        className: "sr-only",
        children: s.jsx(ee, {
            id: "navigation.openSidebar",
            defaultMessage: "Open sidebar"
        })
    }), t[1] = o) : o = t[1];
    let n;
    t[2] === Symbol.for("react.memo_cache_sentinel") ? (n = I("text-token-text-secondary", l ? "icon" : "icon-lg mx-2"), t[2] = n) : n = t[2];
    let r;
    t[3] !== e ? (r = s.jsx(e, {
        className: n
    }), t[3] = e, t[4] = r) : r = t[4];
    let d;
    return t[5] !== a || t[6] !== r ? (d = s.jsxs("button", {
        type: "button",
        className: i,
        onClick: Fs,
        "data-testid": "open-sidebar-button",
        "aria-expanded": a,
        "aria-controls": "stage-popover-sidebar",
        children: [o, r]
    }), t[5] = a, t[6] = r, t[7] = d) : d = t[7], d
}

function Fs() {
    z.startTransition(Ds)
}

function Ds() {
    V.setSidebarOpen(!0)
}
const fa = t => {
    "use forget";
    const e = A.c(10),
        {
            children: a,
            rightContent: l
        } = t,
        i = je(Qs) ? "[box-shadow:var(--sharp-edge-top-shadow)]" : "[box-shadow:var(--sharp-edge-top-shadow-placeholder)]";
    let o;
    e[0] !== i ? (o = I("draggable h-header-height bg-token-bg-primary sticky top-0 z-10 flex items-center justify-between gap-2 border-transparent px-2 md:hidden print:hidden", i, "group-data-scroll-from-top/scroll-root:[box-shadow:var(--sharp-edge-top-shadow)]"), e[0] = i, e[1] = o) : o = e[1];
    let n;
    e[2] !== a ? (n = s.jsx("div", {
        className: "no-draggable flex items-center",
        children: a
    }), e[2] = a, e[3] = n) : n = e[3];
    let r;
    e[4] !== l ? (r = l && s.jsx("div", {
        className: "no-draggable flex items-center justify-center",
        children: l
    }), e[4] = l, e[5] = r) : r = e[5];
    let d;
    return e[6] !== o || e[7] !== n || e[8] !== r ? (d = s.jsxs("div", {
        className: o,
        children: [n, r]
    }), e[6] = o, e[7] = n, e[8] = r, e[9] = d) : d = e[9], d
};

function ua(t) {
    "use forget";
    const e = A.c(6),
        {
            children: a,
            nonCollapsable: l,
            insetBg: c
        } = t;
    se.markStart("StageNavigationSidebar"), se.markRendered("StageNavigationSidebar");
    const i = _e(),
        o = je(Hs);
    let n;
    return e[0] !== a || e[1] !== c || e[2] !== i || e[3] !== o || e[4] !== l ? (n = i ? s.jsx(Vs, {
        insetBg: c,
        children: a
    }) : s.jsx(Gs, {
        disableAnimations: o,
        nonCollapsable: l,
        children: a
    }), e[0] = a, e[1] = c, e[2] = i, e[3] = o, e[4] = l, e[5] = n) : n = e[5], n
}

function Hs(t) {
    return t.isSidebarAnimationDisabled
}
const $e = {
        bounce: .1,
        duration: .35,
        type: "spring"
    },
    zs = { ...$e,
        duration: .4
    },
    $s = {
        type: "spring",
        stiffness: 438,
        damping: 38,
        mass: 1,
        restDelta: .01
    },
    Gs = t => {
        "use forget";
        const e = A.c(23),
            {
                children: a,
                nonCollapsable: l,
                disableAnimations: c
            } = t;
        Be(Ks), se.trackNamespace(se.NS_SIDEBAR);
        const i = Ct(),
            o = Ot() || l,
            n = c || i ? ws : $e,
            r = o ? "var(--sidebar-width)" : "var(--sidebar-rail-width)",
            d = o ? "var(--sidebar-bg, var(--bg-elevated-secondary))" : "var(--sidebar-bg, var(--bg-primary))";
        let f;
        e[0] !== r || e[1] !== d ? (f = {
            width: r,
            backgroundColor: d
        }, e[0] = r, e[1] = d, e[2] = f) : f = e[2];
        const u = o ? "pointer-events-none opacity-0" : "opacity-100",
            m = o ? "motion-safe:ease-[steps(1,end)]" : "motion-safe:ease-[steps(1,start)]";
        let h;
        e[3] !== u || e[4] !== m ? (h = I("absolute inset-0", u, m, "motion-safe:transition-opacity motion-safe:duration-150"), e[3] = u, e[4] = m, e[5] = h) : h = e[5];
        const p = !!o;
        let b;
        e[6] !== o || e[7] !== h || e[8] !== p ? (b = s.jsx(ae.Provider, {
            value: "tiny_bar",
            children: s.jsx(ze, {
                className: h,
                inert: o,
                isSidebarOpen: p,
                onOpen: Ys
            })
        }), e[6] = o, e[7] = h, e[8] = p, e[9] = b) : b = e[9];
        const y = o ? "opacity-100" : "pointer-events-none opacity-0";
        let g;
        e[10] !== y ? (g = I(y, "motion-safe:transition-opacity motion-safe:duration-150 motion-safe:ease-linear", "h-full w-(--sidebar-width) overflow-x-clip overflow-y-auto text-clip whitespace-nowrap", "bg-(--sidebar-bg,var(--bg-elevated-secondary))"), e[10] = y, e[11] = g) : g = e[11];
        const v = !o;
        let M;
        e[12] !== a || e[13] !== g || e[14] !== v ? (M = s.jsx(ae.Provider, {
            value: "expanded_sidebar",
            children: s.jsx("div", {
                className: g,
                inert: v,
                children: a
            })
        }), e[12] = a, e[13] = g, e[14] = v, e[15] = M) : M = e[15];
        let S;
        e[16] !== M || e[17] !== b ? (S = s.jsxs("div", {
            className: "relative flex h-full flex-col",
            children: [b, M]
        }), e[16] = M, e[17] = b, e[18] = S) : S = e[18];
        let x;
        return e[19] !== S || e[20] !== f || e[21] !== n ? (x = s.jsx(ne.div, {
            className: "border-token-border-light relative z-21 h-full shrink-0 overflow-hidden border-e max-md:hidden print:hidden",
            transition: n,
            initial: !1,
            animate: f,
            id: "stage-slideover-sidebar",
            children: S
        }), e[19] = S, e[20] = f, e[21] = n, e[22] = x) : x = e[22], x
    },
    Vs = t => {
        "use forget";
        const e = A.c(17),
            {
                children: a,
                insetBg: l
            } = t;
        Be(Xs);
        const c = E(Et),
            i = E(Ne);
        let o;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (o = we() && de(), e[0] = o) : o = e[0];
        const n = o,
            r = n ? $s : zs,
            d = (c || i) && !n;
        let f;
        e[1] !== i || e[2] !== d ? (f = d && s.jsx("div", {
            className: "border-token-border-light relative z-21 h-full w-(--sidebar-rail-width) shrink-0 overflow-hidden border-e max-md:hidden",
            children: s.jsx(ae.Provider, {
                value: "tiny_bar",
                children: s.jsx(ze, {
                    className: I("absolute inset-0", i ? "pointer-events-none opacity-0" : "opacity-100", i ? "motion-safe:ease-[steps(1,end)]" : "motion-safe:ease-[steps(1,start)]", "motion-safe:transition-opacity motion-safe:duration-150"),
                    inert: i,
                    isSidebarOpen: !!i,
                    onOpen: Js
                })
            })
        }), e[1] = i, e[2] = d, e[3] = f) : f = e[3];
        let u;
        e[4] !== i ? (u = i && s.jsx(Tt, {
            asChild: !0,
            children: s.jsx(ne.div, {
                className: "fixed inset-0 z-10 bg-gray-50/50 dark:bg-black/50",
                transition: r,
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                ...!n && {
                    exit: {
                        opacity: 0,
                        transition: {
                            duration: .12
                        }
                    }
                }
            })
        }, "stage-popover-overlay"), e[4] = i, e[5] = u) : u = e[5];
        let m;
        e[6] !== a || e[7] !== l || e[8] !== i ? (m = i && s.jsx(Rt, {
            asChild: !0,
            onOpenAutoFocus: b => {
                n || b.preventDefault()
            },
            onClick: ea,
            children: s.jsxs(ne.div, {
                className: I("fixed start-0 top-0 z-50 h-full w-[var(--sidebar-width)] max-w-xs border-e border-gray-200 bg-(--sidebar-moweb-bg,var(--sidebar-surface-primary)) shadow-[0_0_64px_0_rgba(0,0,0,0.07)] [view-transition-name:var(--sidebar-popover)] focus:outline-hidden dark:border-gray-800 print:hidden", "pb-[env(safe-area-inset-bottom,0px)]"),
                transition: r,
                id: "stage-popover-sidebar",
                initial: {
                    translateX: "-100%"
                },
                animate: {
                    translateX: "0"
                },
                ...!n && {
                    exit: {
                        translateX: "-100%",
                        transition: {
                            duration: .12
                        }
                    }
                },
                children: [l, s.jsx(Bt, {
                    asChild: !0,
                    children: s.jsxs(Ut, {
                        children: [s.jsx(ee, {
                            id: "navigation.sidebarTitle",
                            defaultMessage: "Sidebar"
                        }), s.jsx(Lt, {})]
                    })
                }), s.jsx(Ft, {
                    children: s.jsx(ae.Provider, {
                        value: "popover",
                        children: a
                    })
                })]
            })
        }, "stage-popover-content"), e[6] = a, e[7] = l, e[8] = i, e[9] = m) : m = e[9];
        let h;
        e[10] !== u || e[11] !== m ? (h = s.jsx(Dt, {
            forceMount: !0,
            children: s.jsxs(Ht, {
                children: [u, m]
            })
        }), e[10] = u, e[11] = m, e[12] = h) : h = e[12];
        let p;
        return e[13] !== i || e[14] !== f || e[15] !== h ? (p = s.jsxs(zt, {
            open: i,
            onOpenChange: Zs,
            children: [f, h]
        }), e[13] = i, e[14] = f, e[15] = h, e[16] = p) : p = e[16], p
    };

function Ws(t, e) {
    let a = t;
    for (; a != null;) {
        if (e(a)) return a;
        a = a.parentElement
    }
}

function qs(t) {
    return t.hasAttribute("data-sidebar-keep-open") ? !1 : t.hasAttribute("data-sidebar-item") || t.role === "menuitem" && !t.hasAttribute("data-has-submenu")
}

function Qs(t) {
    return t.isConversationScrolledFromTop
}

function Ks() {
    Ie.count(Me.DEFAULT, "chatgpt_sidebar_show", {
        key: "type",
        value: "slideover"
    }), G.logEvent("Sidebar Show", {
        type: "slideover"
    }), fe("chatgpt_web_sidebar_shown", void 0, {
        type: "slideover"
    })
}

function Ys() {
    return V.setSidebarOpen(!0)
}

function Xs() {
    Ie.count(Me.DEFAULT, "chatgpt_sidebar_show", {
        key: "type",
        value: "popover"
    }), G.logEvent("Sidebar Show", {
        type: "popover"
    }), fe("chatgpt_web_sidebar_shown", void 0, {
        type: "popover"
    })
}

function Zs(t) {
    V.setPopoverSidebarOpen(t)
}

function Js() {
    return V.setPopoverSidebarOpen(!0)
}

function ea(t) {
    t.target instanceof Element && Ws(t.target, qs) && V.setPopoverSidebarOpen(!1)
}
export {
    Le as L, ra as N, ca as P, ua as S, fa as a, da as b, la as c, Ue as d, Rs as f, be as i, na as u
};
//# sourceMappingURL=1e924491-oclxttbn9pyl5l8t.js.map