import {
    c as A,
    j as s,
    u as oe,
    r as N,
    B as ce,
    o as O,
    h as _e
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    uu as ve,
    ij as ye,
    h as je,
    af as q,
    n as ae,
    uF as de,
    fW as Ne,
    pG as ke,
    e as Q,
    ff as Te,
    g8 as me,
    ix as Ie,
    bX as re,
    fk as Ce,
    ay as ue,
    m6 as Ee,
    d as fe,
    z6 as Me,
    uL as V,
    jn as Ae,
    v7 as le,
    z7 as Oe,
    dP as Be,
    I as Re,
    z as we,
    aw as te,
    c8 as ie,
    cb as be,
    ca as ne,
    S as pe,
    c9 as Le
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    jL as Pe,
    jM as Fe,
    jN as Ue,
    jO as ze,
    jP as $e,
    jQ as He,
    fv as ge,
    jR as Ge,
    iQ as De,
    jS as We,
    bk as X,
    jT as he,
    jU as Ye,
    cI as Ke,
    jV as Qe,
    jW as Ve,
    jX as Xe,
    jY as qe,
    jZ as Ze,
    j_ as Je,
    j$ as se,
    k0 as et
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    i as tt,
    P as st,
    N as ot,
    f as at
} from "./1e924491-oclxttbn9pyl5l8t.js";
import {
    l as it,
    S as nt,
    O as rt,
    N as lt,
    a as ct
} from "./e9c129e0-obrrz3bfgobj5kgi.js";

function dt(t) {
    "use forget";
    const e = A.c(3),
        {
            clientThreadId: o,
            sidebarGizmoIdOverride: a
        } = t,
        n = Ne(o),
        i = ke(o),
        l = a ? ? i,
        d = Q(Te) ? void 0 : n;
    let c;
    return e[0] !== l || e[1] !== d ? (c = s.jsx(mt, {
        currentGizmoId: l,
        activeId: d
    }), e[0] = l, e[1] = d, e[2] = c) : c = e[2], c
}

function mt(t) {
    "use forget";
    const e = A.c(13),
        {
            currentGizmoId: o,
            activeId: a
        } = t;
    let n;
    e[0] !== o ? (n = s.jsx(st, {
        currentGizmoId: o
    }), e[0] = o, e[1] = n) : n = e[1];
    let i;
    e[2] !== a || e[3] !== o ? (i = Pe() ? s.jsx(Fe, {
        currentGizmoId: o,
        activeThreadId: a
    }) : s.jsx(Ue, {
        currentGizmoId: o,
        activeThreadId: a
    }), e[2] = a, e[3] = o, e[4] = i) : i = e[4];
    let l;
    e[5] === Symbol.for("react.memo_cache_sentinel") ? (l = s.jsx(me, {
        fallback: null,
        children: s.jsx($e, {})
    }), e[5] = l) : l = e[5];
    let r;
    e[6] !== a || e[7] !== o ? (r = s.jsx(Ie, {
        name: "ExpandoSidebar",
        children: s.jsx(He, {
            currentGizmoId: o,
            activeId: a
        })
    }), e[6] = a, e[7] = o, e[8] = r) : r = e[8];
    let d;
    return e[9] !== n || e[10] !== i || e[11] !== r ? (d = s.jsxs(s.Fragment, {
        children: [n, i, l, r]
    }), e[9] = n, e[10] = i, e[11] = r, e[12] = d) : d = e[12], d
}

function zt(t) {
    "use forget";
    const e = A.c(3),
        {
            clientThreadId: o,
            sidebarGizmoIdOverride: a
        } = t;
    let n;
    return e[0] !== o || e[1] !== a ? (n = ae() || de() ? s.jsx(dt, {
        clientThreadId: o,
        sidebarGizmoIdOverride: a
    }) : null, e[0] = o, e[1] = a, e[2] = n) : n = e[2], n
}

function $t() {
    "use forget";
    const t = A.c(19),
        e = oe(),
        o = ve(ft);
    let a;
    t[0] === Symbol.for("react.memo_cache_sentinel") ? (a = tt(), t[0] = a) : a = t[0];
    const n = a;
    let i;
    t[1] !== e ? (i = e.formatMessage({
        id: "Q6nsOM",
        defaultMessage: "Close sidebar"
    }), t[1] = e, t[2] = i) : i = t[2];
    const l = i,
        r = N.useContext(ze),
        d = ye(),
        c = je(),
        p = c ? re : Ge;
    let f;
    t[3] !== o ? (f = o ? .visible && o.getTitlebarAreaRect().left > 0 ? "justify-end" : "justify-between", t[3] = o, t[4] = f) : f = t[4];
    let m;
    t[5] !== f ? (m = q("h-header-height flex items-center", f), t[5] = f, t[6] = m) : m = t[6];
    let B;
    t[7] === Symbol.for("react.memo_cache_sentinel") ? (B = s.jsx(bt, {}), t[7] = B) : B = t[7];
    let k;
    t[8] === Symbol.for("react.memo_cache_sentinel") ? (k = n && s.jsx(ot, {}), t[8] = k) : k = t[8];
    const y = c ? void 0 : l,
        _ = r === "popover" || d,
        g = r === "popover" ? "stage-popover-sidebar" : "stage-slideover-sidebar";
    let v;
    t[9] !== l || t[10] !== _ || t[11] !== g ? (v = s.jsx(ge, {
        className: "no-draggable cursor-w-resize rtl:cursor-e-resize",
        color: "tertiary",
        "aria-expanded": _,
        "aria-controls": g,
        "aria-label": l,
        onClick: ut,
        icon: p,
        mobileIcon: re,
        "data-testid": "close-sidebar-button"
    }), t[9] = l, t[10] = _, t[11] = g, t[12] = v) : v = t[12];
    let b;
    t[13] !== y || t[14] !== v ? (b = s.jsxs("div", {
        className: "flex",
        children: [k, s.jsx(Ce, {
            label: y,
            triggerAs: null,
            children: v
        })]
    }), t[13] = y, t[14] = v, t[15] = b) : b = t[15];
    let h;
    return t[16] !== b || t[17] !== m ? (h = s.jsxs("div", {
        id: "sidebar-header",
        className: m,
        onClick: Se,
        children: [B, b]
    }), t[16] = b, t[17] = m, t[18] = h) : h = t[18], h
}

function ut() {
    ue.setSidebarOpen(!1)
}

function ft() {
    return navigator.windowControlsOverlay
}

function bt() {
    "use forget";
    const t = A.c(8),
        e = oe(),
        o = De();
    let a;
    t[0] !== e ? (a = e.formatMessage({
        id: "H6SRdK",
        defaultMessage: "Home"
    }), t[0] = e, t[1] = a) : a = t[1];
    let n;
    t[2] === Symbol.for("react.memo_cache_sentinel") ? (n = it("/"), t[2] = n) : n = t[2];
    let i;
    t[3] !== o ? (i = {
        to: n,
        state: o
    }, t[3] = o, t[4] = i) : i = t[4];
    let l;
    return t[5] !== a || t[6] !== i ? (l = s.jsx(ge, {
        onClick: pt,
        icon: Ee,
        iconClassName: "icon-lg",
        color: "primary",
        "data-sidebar-item": !0,
        "aria-label": a,
        as: "link",
        linkProps: i
    }), t[5] = a, t[6] = i, t[7] = l) : l = t[7], l
}

function pt(t) {
    Se(t) ? (t.preventDefault(), t.stopPropagation()) : We(t, {
        location: "Blossom"
    })
}

function Se(t) {
    const e = t.currentTarget.closest("nav"),
        o = e != null && e.scrollTop > 0;
    return o && e.scrollTo({
        top: 0,
        behavior: "smooth"
    }), o
}
const Z = fe(!1),
    xe = fe(!1);

function Ht(t) {
    "use forget";
    const e = A.c(52),
        {
            navHeader: o,
            children: a,
            className: n
        } = t;
    let i;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (i = ae(), e[0] = i) : i = e[0];
    const l = i,
        r = Q(kt),
        d = Q(Nt),
        c = ce();
    let p;
    e[1] !== c ? (p = X(c, "images-app"), e[1] = c, e[2] = p) : p = e[2];
    const f = p;
    let m;
    e[3] !== c ? (m = X(c, "deep-research"), e[3] = c, e[4] = m) : m = e[4];
    const k = f || m,
        y = Q(jt),
        _ = oe(),
        [g, v] = N.useState(!1),
        b = d ? `${d}px` : void 0;
    let h;
    e[5] !== b ? (h = {
        "--primary-items-height": b
    }, e[5] = b, e[6] = h) : h = e[6];
    const T = h;
    let I;
    e[7] === Symbol.for("react.memo_cache_sentinel") ? (I = [], e[7] = I) : I = e[7], N.useEffect(_t, I);
    let C, E;
    e[8] === Symbol.for("react.memo_cache_sentinel") ? (C = () => {
        const K = new AbortController;
        return Ae.postTask(async () => {
            await new Promise(xt), !K.signal.aborted && N.startTransition(() => {
                K.signal.aborted || v(!0)
            })
        }, {
            signal: K.signal
        }).catch(St), () => {
            K.abort("Expected cleanup")
        }
    }, E = [], e[8] = C, e[9] = E) : (C = e[8], E = e[9]), N.useEffect(C, E);
    let M;
    e[10] === Symbol.for("react.memo_cache_sentinel") ? (M = s.jsx(Me, {
        asChild: !0,
        children: s.jsx("h2", {
            className: "select-none",
            children: s.jsx(O, { ...H.chatHistoryLabel
            })
        })
    }), e[10] = M) : M = e[10];
    let S;
    e[11] !== k || e[12] !== y || e[13] !== T ? (S = k && s.jsx(N.Activity, {
        mode: y ? "visible" : "hidden",
        children: s.jsx("div", {
            className: "short:h-[calc(var(--header-height)+2px)] short:backdrop-blur-[2px] short:bg-token-bg-primary/10 pointer-events-none absolute inset-x-0 z-1 h-[calc(var(--header-height)+var(--primary-items-height,0)+4px)] w-full bg-(--sidebar-mask-bg) bg-[linear-gradient(180deg,oklch(1_0_0/0.3)_80%,transparent_100%)] [backdrop-filter:var(--sidebar-sticky-backdrop)] contain-size group-data-scrolled-from-top/scrollport:bg-none! dark:bg-[linear-gradient(180deg,oklch(0.5_0_0/0.3)_80%,transparent_100%)]",
            style: T
        })
    }), e[11] = k, e[12] = y, e[13] = T, e[14] = S) : S = e[14];
    let x;
    e[15] !== n ? (x = q("relative flex h-full w-full flex-1 flex-col overflow-y-auto transition-opacity motion-safe:duration-500", n), e[15] = n, e[16] = x) : x = e[16];
    let j;
    e[17] !== _ ? (j = _.formatMessage(H.chatHistoryLabel), e[17] = _, e[18] = j) : j = e[18];
    let u;
    e[19] !== o ? (u = s.jsx("div", {
        className: "sticky top-0 z-30 bg-(--sidebar-mask-bg,var(--bg-elevated-secondary))",
        children: s.jsx("div", {
            className: "touch:px-1.5 px-2",
            children: o
        })
    }), e[19] = o, e[20] = u) : u = e[20];
    const J = g ? "visible" : "hidden";
    let G;
    e[21] === Symbol.for("react.memo_cache_sentinel") ? (G = s.jsx(le, {
        setIsScrolledToEdge: ht,
        className: "absolute top-0",
        options: {
            threshold: 0,
            rootMargin: "-50px 0px"
        }
    }), e[21] = G) : G = e[21];
    let R;
    e[22] !== J ? (R = s.jsx(N.Activity, {
        mode: J,
        children: G
    }), e[22] = J, e[23] = R) : R = e[23];
    const ee = g ? "hidden" : "visible";
    let D;
    e[24] === Symbol.for("react.memo_cache_sentinel") ? (D = s.jsx(Oe, {
        className: "absolute top-0"
    }), e[24] = D) : D = e[24];
    let w;
    e[25] !== ee ? (w = s.jsx(N.Activity, {
        mode: ee,
        children: D
    }), e[25] = ee, e[26] = w) : w = e[26];
    let L;
    e[27] !== R || e[28] !== w ? (L = s.jsxs("div", {
        className: "relative h-0",
        children: [R, w]
    }), e[27] = R, e[28] = w, e[29] = L) : L = e[29];
    let W;
    e[30] === Symbol.for("react.memo_cache_sentinel") ? (W = s.jsx("div", {
        className: "grow"
    }), e[30] = W) : W = e[30];
    let P;
    e[31] !== g ? (P = g && s.jsx(le, {
        setIsScrolledToEdge: gt,
        options: {
            threshold: 0
        }
    }), e[31] = g, e[32] = P) : P = e[32];
    let F;
    e[33] !== r ? (F = !r && !l && V() && s.jsxs("div", {
        className: "mt-3 mb-1.5",
        children: [s.jsx(nt, {
            renderMode: "sidebar"
        }), s.jsx(rt, {
            renderMode: "sidebar"
        }), s.jsx(lt, {})]
    }), e[33] = r, e[34] = F) : F = e[34];
    let U;
    e[35] !== r ? (U = !r && !l && !V() && s.jsx(he, {
        bottom: "calc(3.95rem + 1px)",
        height: 1,
        bg: "bg-token-border-sharp"
    }), e[35] = r, e[36] = U) : U = e[36];
    let z;
    e[37] !== r ? (z = !r && s.jsx(Tt, {}), e[37] = r, e[38] = z) : z = e[38];
    let $;
    e[39] !== a || e[40] !== x || e[41] !== j || e[42] !== u || e[43] !== L || e[44] !== P || e[45] !== F || e[46] !== U || e[47] !== z ? ($ = s.jsxs(Ye, {
        className: x,
        isScrolledFromTopEdge$: Z,
        isScrolledFromBottomEdge$: xe,
        "aria-label": j,
        children: [u, L, a, W, P, F, U, z]
    }), e[39] = a, e[40] = x, e[41] = j, e[42] = u, e[43] = L, e[44] = P, e[45] = F, e[46] = U, e[47] = z, e[48] = $) : $ = e[48];
    let Y;
    return e[49] !== S || e[50] !== $ ? (Y = s.jsxs(s.Fragment, {
        children: [M, S, $]
    }), e[49] = S, e[50] = $, e[51] = Y) : Y = e[51], Y
}

function gt(t) {
    N.startTransition(() => {
        xe.set(t)
    })
}

function ht(t) {
    N.startTransition(() => {
        Z.set(t)
    })
}

function St() {}

function xt(t) {
    return setTimeout(t, 350)
}

function _t() {
    return vt
}

function vt() {
    N.startTransition(yt)
}

function yt() {
    Z.set(!1)
}

function jt() {
    return Z()
}

function Nt() {
    return at()
}

function kt() {
    return Be()
}

function Tt() {
    "use forget";
    const t = A.c(23),
        e = Re(),
        o = we(),
        {
            data: a
        } = Ke(),
        n = !ae(),
        i = ce(),
        l = X(i, "images-app"),
        r = X(i, "deep-research"),
        d = l || r,
        c = e ? .isSelfServeBusiness() ? ? !1,
        p = e ? .isK12() ? ? !1,
        f = e ? .isFreeWorkspace() ? ? !1;
    let m;
    t[0] !== o ? (m = o ? .canInviteMembers() ? ? !1, t[0] = o, t[1] = m) : m = t[1];
    const B = m,
        k = c ? Ve : "",
        {
            data: y
        } = Qe(k);
    let _;
    t[2] !== o || t[3] !== a || t[4] !== y ? (_ = Xe({
        account: o,
        subscription: a,
        teamFreeTrialPromoEligibility: y,
        surface: "sidebar"
    }), t[2] = o, t[3] = a, t[4] = y, t[5] = _) : _ = t[5];
    const {
        invitesRemaining: g,
        shouldShowInviteUpsell: v
    } = _, b = c || p && B || f;
    if (de()) {
        let u;
        return t[6] === Symbol.for("react.memo_cache_sentinel") ? (u = s.jsx(It, {}), t[6] = u) : u = t[6], u
    }
    if (!e) return null;
    if (n) {
        let u;
        return t[7] === Symbol.for("react.memo_cache_sentinel") ? (u = s.jsx(Ct, {}), t[7] = u) : u = t[7], u
    }
    const h = d ? "bg-(--sidebar-mask-bg,var(--bg-elevated-secondary)) [backdrop-filter:var(--sidebar-sticky-backdrop,none)]" : "bg-token-bg-elevated-secondary";
    let T;
    t[8] !== h ? (T = q("relative sticky bottom-0 z-30 pt-2 pb-1.5 empty:hidden", h), t[8] = h, t[9] = T) : T = t[9];
    let I, C;
    t[10] === Symbol.for("react.memo_cache_sentinel") ? (I = s.jsx("div", {
        "aria-hidden": "true",
        className: "border-token-border-heavy pointer-events-none absolute inset-x-0 top-0 border-t opacity-0 group-data-scrolled-from-end/scrollport:opacity-35 motion-safe:transition-opacity motion-safe:duration-150 motion-safe:ease-out dark:group-data-scrolled-from-end/scrollport:opacity-30"
    }), C = s.jsx(he, {
        anchoredToParentTop: !0,
        height: 58,
        className: "absolute inset-x-0 top-0 -translate-y-full opacity-0 group-data-scrolled-from-end/scrollport:opacity-100 motion-safe:transition-opacity motion-safe:duration-150 motion-safe:ease-out dark:group-data-scrolled-from-end/scrollport:opacity-90"
    }), t[10] = I, t[11] = C) : (I = t[10], C = t[11]);
    let E;
    t[12] === Symbol.for("react.memo_cache_sentinel") ? (E = s.jsx(me, {
        children: s.jsx(qe, {})
    }), t[12] = E) : E = t[12];
    let M;
    t[13] === Symbol.for("react.memo_cache_sentinel") ? (M = s.jsx(Ze, {
        children: s.jsx(ct, {})
    }), t[13] = M) : M = t[13];
    let S;
    t[14] !== g || t[15] !== b || t[16] !== v ? (S = b && s.jsx(Je, {
        invitesRemaining: v ? g : void 0
    }), t[14] = g, t[15] = b, t[16] = v, t[17] = S) : S = t[17];
    let x;
    t[18] !== S ? (x = s.jsxs("div", {
        className: "relative",
        children: [E, M, S]
    }), t[18] = S, t[19] = x) : x = t[19];
    let j;
    return t[20] !== T || t[21] !== x ? (j = s.jsxs("div", {
        className: T,
        children: [I, C, x]
    }), t[20] = T, t[21] = x, t[22] = j) : j = t[22], j
}
const It = () => {
        "use forget";
        const t = A.c(6),
            e = Mt;
        let o, a, n;
        t[0] === Symbol.for("react.memo_cache_sentinel") ? (o = !V() && s.jsx("div", {
            className: "h-[280px]"
        }), a = q("sticky bottom-0 p-5", V() && "border-token-border-heavy border-t"), n = {
            backgroundColor: "var(--sidebar-login-pane-bg, var(--bg-elevated-secondary))"
        }, t[0] = o, t[1] = a, t[2] = n) : (o = t[0], a = t[1], n = t[2]);
        let i;
        t[3] === Symbol.for("react.memo_cache_sentinel") ? (i = s.jsx("p", {
            className: "text-token-text-primary mb-4 font-semibold",
            children: s.jsx(O, { ...H.noAuthSidebarTitle
            })
        }), t[3] = i) : i = t[3];
        let l;
        t[4] === Symbol.for("react.memo_cache_sentinel") ? (l = s.jsxs("div", {
            className: "mb-6 text-sm text-wrap",
            children: [i, s.jsx("p", {
                className: "text-token-text-tertiary",
                children: s.jsx(O, { ...H.noAuthSidebarBody
                })
            })]
        }), t[4] = l) : l = t[4];
        let r;
        return t[5] === Symbol.for("react.memo_cache_sentinel") ? (r = s.jsxs(s.Fragment, {
            children: [o, s.jsxs("div", {
                className: a,
                style: n,
                children: [l, s.jsx("div", {
                    className: "-mx-1.5",
                    children: s.jsx(te, {
                        as: "button",
                        size: "large",
                        color: "secondary",
                        fullWidth: !0,
                        onClick: e,
                        children: s.jsx(O, { ...se.logIn
                        })
                    })
                })]
            })]
        }), t[5] = r) : r = t[5], r
    },
    Ct = () => {
        "use forget";
        const t = A.c(6);
        let e;
        t[0] === Symbol.for("react.memo_cache_sentinel") ? (e = et(se.signUp), t[0] = e) : e = t[0];
        const o = e,
            a = Ot,
            n = Rt;
        let i;
        t[1] === Symbol.for("react.memo_cache_sentinel") ? (i = s.jsx(te, {
            as: "button",
            size: "medium",
            color: "secondary",
            "data-testid": "signup-button",
            "data-sidebar-item": !0,
            onClick: n,
            children: s.jsx(O, { ...o
            })
        }, "signup-button"), t[1] = i) : i = t[1];
        const l = i;
        let r;
        t[2] === Symbol.for("react.memo_cache_sentinel") ? (r = s.jsx(te, {
            as: "button",
            size: "medium",
            color: "primary",
            "data-testid": "login-button",
            "data-sidebar-item": !0,
            onClick: a,
            children: s.jsx(O, { ...se.logIn
            })
        }, "login-button"), t[2] = r) : r = t[2];
        const d = r;
        let c;
        t[3] === Symbol.for("react.memo_cache_sentinel") ? (c = s.jsx("p", {
            className: "text-token-text-primary mb-1 text-sm font-semibold",
            children: s.jsx(O, { ...H.logInOrSignUp
            })
        }), t[3] = c) : c = t[3];
        let p;
        t[4] === Symbol.for("react.memo_cache_sentinel") ? (p = s.jsxs("div", {
            className: "mt-2 mb-4",
            children: [c, s.jsx("p", {
                className: "text-token-text-secondary text-sm",
                children: s.jsx(O, {
                    id: "tr+zlt",
                    defaultMessage: "Get smarter responses, upload files and images, and save your conversations."
                })
            })]
        }), t[4] = p) : p = t[4];
        let f;
        return t[5] === Symbol.for("react.memo_cache_sentinel") ? (f = s.jsxs("div", {
            className: "bg-token-bg-elevated-secondary sticky bottom-0 z-30 p-2",
            children: [p, s.jsx("div", {
                className: "flex flex-row items-start gap-2",
                children: [d, l]
            })]
        }), t[5] = f) : f = t[5], f
    },
    H = _e({
        chatHistoryLabel: {
            id: "NavigationContent.chatHistoryLabel",
            defaultMessage: "Chat history"
        },
        signInToChat: {
            id: "NavigationContent.signInToChat",
            defaultMessage: "Sign in to ChatGPT"
        },
        signUpOrLogIn: {
            id: "NavigationContent.signUpOrLogIn",
            defaultMessage: "Sign up or log in"
        },
        logInOrSignUp: {
            id: "NavigationContent.logInOrSignUp",
            defaultMessage: "Log in or sign up for free"
        },
        noAuthSidebarTitle: {
            id: "NavigationContent.noAuthSidebarTitle",
            defaultMessage: "Get responses tailored to you"
        },
        noAuthSidebarBody: {
            id: "NavigationContent.noAuthSidebarBody",
            defaultMessage: "Log in to get answers based on saved chats, plus create images and upload files."
        }
    });

function Et(t) {
    be({
        location: "No-auth sidebar bottom",
        provider: t
    }, ne.ACCESS_FLOW_ENTRY_POINT_SIDEBAR_BOTTOM_UNIT)
}

function Mt() {
    ue.setSidebarOpen(!1), ie({
        fallbackScreenHint: "login",
        callback: Et,
        skipLoginModal: !1
    })
}

function At(t) {
    be({
        location: "Sidebar bottom unit",
        provider: t
    }, ne.ACCESS_FLOW_ENTRY_POINT_SIDEBAR_BOTTOM_UNIT), pe.logEvent("chatgpt_sidebar_login_button_clicked")
}

function Ot() {
    ie({
        fallbackScreenHint: "login",
        callback: At,
        skipLoginModal: !1
    })
}

function Bt(t) {
    Le({
        location: "Sidebar bottom unit",
        provider: t
    }, ne.ACCESS_FLOW_ENTRY_POINT_SIDEBAR_BOTTOM_UNIT), pe.logEvent("chatgpt_sidebar_signup_button_clicked")
}

function Rt() {
    ie({
        fallbackScreenHint: "signup",
        callback: Bt,
        skipLoginModal: !1
    })
}
export {
    zt as C, Ht as N, mt as S, $t as a
};
//# sourceMappingURL=53ae691e-bsyqlm293qvxnzel.js.map