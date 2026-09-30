const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/df4a2937-mpi82nqqb645ej0m.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/conversation-small-cqp6votf.css", "assets/16d1c905-kzb9nx2txdax2vhp.js", "assets/4b303e9e-iimph5klvq8yx43j.js", "assets/7bce51e5-cmbyyrv67x3n5nrc.js", "assets/7ea2afc2-e5zig5rh2tcj6ymv.js", "assets/2b73e49b-giqe3caw6velz41s.js", "assets/e8fe533b-dqowgzb88uo0tkty.js", "assets/64696494-pcb5zbgdswo1x3cx.js", "assets/a78f4c52-jscmw6qy016v67a7.js", "assets/bc4efe0c-ef367v6adi8m1l4b.js", "assets/bd382fd5-bcke632cms89jbha.js", "assets/6ed44741-cgo7n6mx2tl4tedm.js", "assets/a8077c3c-l0ditq4z8me4vohx.js"]))) => i.map(i => d[i]);
import {
    c as F,
    r as Ce,
    j as t,
    o as E,
    h as mt,
    _ as Re,
    u as De,
    s as kt,
    n as At
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    u as yt,
    s as wt
} from "./6fd89734-e246szx8pk7yijni.js";
import {
    af as st,
    _ as ft,
    vL as It,
    vM as Tt,
    cf as Et,
    fc as R,
    ch as He,
    l_ as Ke,
    dS as Je,
    e as z,
    zw as Nt,
    zy as Ot,
    zx as Lt,
    A6 as Bt,
    rV as nt,
    sI as Qe,
    hK as zt,
    g5 as Rt,
    aO as Dt,
    g6 as Ht,
    fN as H,
    hY as ht,
    lr as Gt,
    AL as $t,
    AM as Ut,
    AN as Ft,
    AO as Vt,
    bY as ue,
    AP as Wt,
    a as Fe,
    N as Ve,
    b8 as Yt,
    et as qt,
    fY as Ee,
    n_ as Kt,
    uX as Jt,
    mY as Qt,
    AQ as at,
    aw as ve,
    gb as pt,
    I as gt,
    ct as Xt,
    n as Te,
    uL as Zt,
    rn as es,
    x as jt,
    c7 as it,
    ca as ts,
    ih as St,
    be as ss,
    fW as os,
    l as ns,
    b_ as as,
    cO as We,
    cG as is,
    mR as rs,
    j$ as cs,
    h as ls,
    k7 as ds,
    o0 as us,
    gF as ms,
    av as fs,
    ff as hs,
    q as Ye,
    ru as ps,
    gQ as gs,
    dH as js,
    y$ as Ss,
    mD as xs,
    mE as Ps,
    c1 as bs,
    ei as rt,
    sp as _s,
    cA as Cs,
    go as vs,
    fk as xt,
    AR as Ms,
    sF as ks,
    c8 as qe,
    cb as As,
    c9 as ys,
    nY as ws
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    o8 as Is,
    o9 as Ts,
    oa as ct,
    fP as Pt,
    jc as Es,
    dm as Ns,
    iV as bt,
    ob as _t,
    lB as ot,
    oc as Os,
    od as Ls,
    gq as Bs,
    ef as zs,
    eg as Rs,
    oe as Ds,
    lC as Ct,
    of as Hs,
    kw as Xe,
    h7 as Gs,
    d5 as Ze,
    gM as et,
    h2 as $s,
    d4 as Us,
    a1 as lt,
    og as Fs,
    oh as Vs,
    k0 as Ws,
    oi as Ys,
    iW as qs,
    iP as Ks,
    oj as Js,
    ok as Qs,
    fv as vt,
    ol as Xs,
    om as Zs,
    on as eo,
    oo as dt,
    op as to,
    oq as so,
    iQ as oo,
    jS as no,
    iR as ao
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    b as io,
    G as ro
} from "./26c0a75b-ohajenatbq3bkll5.js";
import {
    P as co
} from "./e9c129e0-obrrz3bfgobj5kgi.js";
import {
    u as lo
} from "./b81d67c1-edign3dbahpky6bz.js";
import {
    b as uo
} from "./1e924491-oclxttbn9pyl5l8t.js";
import {
    P as mo
} from "./97587f90-ossabf8p826uhphr.js";

function fo(r) {
    "use forget";
    const e = F.c(38),
        {
            conversationMode: l
        } = r;
    let s;
    e[0] !== l ? (s = {
        conversationMode: l
    }, e[0] = l, e[1] = s) : s = e[1];
    const {
        isAdultSearchEnabled: a,
        handleToggleSetting: c,
        isLoading: n
    } = yt(s), d = Ce.useRef(!1);
    let P, m;
    e[2] !== a ? (P = () => {
        d.current || (d.current = !0, ft.logStructuredEvent(It, {
            step: Tt.ATLAS_SAFE_SEARCH_TOGGLE_ACTION_STEP_SHOW,
            fromEnabled: !a
        }))
    }, m = [a], e[2] = a, e[3] = P, e[4] = m) : (P = e[3], m = e[4]), Ce.useEffect(P, m);
    let h;
    e[5] === Symbol.for("react.memo_cache_sentinel") ? (h = st("flex min-w-[155px] items-center justify-between rounded-full p-3 whitespace-nowrap", "hover:bg-token-text-secondary text-token-bg-primary bg-token-text-primary focus-visible:bg-token-text-secondary!", "dark:bg-token-text-secondary! dark:hover:bg-token-text-primary! dark:focus-visible:bg-token-text-primary!"), e[5] = h) : h = e[5];
    let u;
    e[6] === Symbol.for("react.memo_cache_sentinel") ? (u = t.jsx(E, { ...de.matureContent
    }), e[6] = u) : u = e[6];
    let v;
    e[7] !== a || e[8] !== n ? (v = !n && t.jsxs("span", {
        className: "text-token-text-tertiary dark:text-token-bg-primary/60 whitespace-pre",
        children: [" ", a ? t.jsx(E, { ...de.off
        }) : t.jsx(E, { ...de.on
        })]
    }), e[7] = a, e[8] = n, e[9] = v) : v = e[9];
    let k;
    e[10] !== v ? (k = t.jsxs("span", {
        className: "flex",
        children: [u, v]
    }), e[10] = v, e[11] = k) : k = e[11];
    let M;
    e[12] !== n ? (M = t.jsx("div", {
        className: "text-token-text-tertiary dark:text-token-bg-primary/60 min-w-[16px]",
        children: n ? t.jsx(Et, {
            className: "icon-sm"
        }) : t.jsx(Is, {
            className: "icon-md"
        })
    }), e[12] = n, e[13] = M) : M = e[13];
    let o;
    e[14] !== k || e[15] !== M ? (o = t.jsxs(R.Trigger, {
        color: "primary",
        className: h,
        children: [k, M]
    }), e[14] = k, e[15] = M, e[16] = o) : o = e[16];
    const p = a ? "off" : "on",
        b = a ? "default" : "selected";
    let g, T;
    e[17] === Symbol.for("react.memo_cache_sentinel") ? (g = t.jsx(E, { ...de.on
    }), T = t.jsx(E, { ...de.onDescription
    }), e[17] = g, e[18] = T) : (g = e[17], T = e[18]);
    let j;
    e[19] !== c ? (j = () => c(!1), e[19] = c, e[20] = j) : j = e[20];
    let S;
    e[21] !== b || e[22] !== j ? (S = t.jsx(R.RadioItem, {
        color: b,
        value: "on",
        label: g,
        secondary: T,
        onClick: j
    }), e[21] = b, e[22] = j, e[23] = S) : S = e[23];
    const A = a ? "selected" : "default";
    let _, y;
    e[24] === Symbol.for("react.memo_cache_sentinel") ? (_ = t.jsx(E, { ...de.off
    }), y = t.jsx(E, { ...de.offDescription
    }), e[24] = _, e[25] = y) : (_ = e[24], y = e[25]);
    let w;
    e[26] !== c ? (w = () => c(!0), e[26] = c, e[27] = w) : w = e[27];
    let x;
    e[28] !== A || e[29] !== w ? (x = t.jsx(R.RadioItem, {
        color: A,
        value: "off",
        label: _,
        secondary: y,
        onClick: w
    }), e[28] = A, e[29] = w, e[30] = x) : x = e[30];
    let I;
    e[31] !== p || e[32] !== S || e[33] !== x ? (I = t.jsx(R.Portal, {
        children: t.jsx(R.Content, {
            size: "auto",
            children: t.jsxs(R.RadioGroup, {
                value: p,
                children: [S, x]
            })
        })
    }), e[31] = p, e[32] = S, e[33] = x, e[34] = I) : I = e[34];
    let O;
    return e[35] !== I || e[36] !== o ? (O = t.jsxs(R.Root, {
        children: [o, I]
    }), e[35] = I, e[36] = o, e[37] = O) : O = e[37], O
}
const de = mt({
        matureContent: {
            id: "GICB3y",
            defaultMessage: "Safe search"
        },
        on: {
            id: "mC2XW7",
            defaultMessage: "On"
        },
        onDescription: {
            id: "+P7pkx",
            defaultMessage: "Attempt to hide explicit content"
        },
        off: {
            id: "HnMYit",
            defaultMessage: "Off"
        },
        offDescription: {
            id: "P/OfYZ",
            defaultMessage: "Allow explicit links"
        }
    }),
    ho = He(() => Re(() =>
        import ("./df4a2937-mpi82nqqb645ej0m.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8]))),
    ut = He(() => Re(() =>
        import ("./7ea2afc2-e5zig5rh2tcj6ymv.js"), __vite__mapDeps([9, 1, 2, 3, 4, 5, 10, 11, 12, 6, 13, 14, 7, 15])).then(r => r.PotionMemoriesModal)),
    po = He(() => Re(() =>
        import ("./6ed44741-cgo7n6mx2tl4tedm.js"), __vite__mapDeps([16, 1, 2, 3])).then(r => r.PotionProjectInstructionsModal)),
    go = null;

function jo(r) {
    "use forget";
    const e = F.c(25);
    let l, s;
    e[0] !== r ? ({
        className: s,
        ...l
    } = r, e[0] = r, e[1] = l, e[2] = s) : (l = e[1], s = e[2]);
    const a = De(),
        c = gt(),
        {
            eligible: n
        } = Gs(Ze.hasSeenSharedProjectsTooltip),
        d = $s,
        P = Ze,
        m = "bottom",
        h = "end",
        u = "w-full",
        v = 0,
        k = "z-100",
        M = "w-full",
        o = "bright",
        p = !0,
        b = "new";
    let g;
    e[3] !== a ? (g = a.formatMessage({
        id: "YJ1BcI",
        defaultMessage: "Invite others to projects"
    }), e[3] = a, e[4] = g) : g = e[4];
    const T = c ? .isWorkspaceAccount() ? a.formatMessage({
        id: "7i6HBq",
        defaultMessage: "Build reports, plan client work, or do research — together."
    }) : a.formatMessage({
        id: "CO0hjY",
        defaultMessage: "Plan adventures, campaigns, workouts, and more — together."
    });
    let j;
    e[5] !== s ? (j = st("mx-2", s), e[5] = s, e[6] = j) : j = e[6];
    let S;
    e[7] !== a ? (S = a.formatMessage(H.projectShareButton), e[7] = a, e[8] = S) : S = e[8];
    let A;
    e[9] !== a ? (A = a.formatMessage(H.projectShareButton), e[9] = a, e[10] = A) : A = e[10];
    let _;
    e[11] !== A ? (_ = t.jsx("span", {
        className: "max-md:hidden",
        children: A
    }), e[11] = A, e[12] = _) : _ = e[12];
    let y;
    e[13] !== l || e[14] !== j || e[15] !== S || e[16] !== _ ? (y = t.jsx(ve, {
        className: j,
        color: "ghost",
        icon: et,
        label: S,
        ...l,
        children: _
    }), e[13] = l, e[14] = j, e[15] = S, e[16] = _, e[17] = y) : y = e[17];
    let w;
    return e[18] !== d || e[19] !== n || e[20] !== P.hasSeenSharedProjectsTooltip || e[21] !== g || e[22] !== T || e[23] !== y ? (w = t.jsx(d, {
        announcementKey: P.hasSeenSharedProjectsTooltip,
        show: n,
        side: m,
        align: h,
        className: u,
        sideOffset: v,
        contentClassName: k,
        childrenWrapperClassName: M,
        theme: o,
        dismissOnOutsideClick: p,
        badge: b,
        title: g,
        description: T,
        onDismiss: So,
        children: y
    }), e[18] = d, e[19] = n, e[20] = P.hasSeenSharedProjectsTooltip, e[21] = g, e[22] = T, e[23] = y, e[24] = w) : w = e[24], w
}

function So() {
    return Us(Ze.hasSeenSharedProjectsTooltip)
}

function xo(r) {
    "use forget";
    const e = F.c(126),
        {
            clientThreadId: l,
            gizmoId: s,
            serverThreadId: a
        } = r,
        c = De(),
        n = kt(),
        d = ht();
    let P;
    e[0] !== d || e[1] !== s ? (P = Ke(d, s), e[0] = d, e[1] = s, e[2] = P) : P = e[2];
    const m = P;
    let h;
    e[3] !== s ? (h = i => bt(i ? .mode, s), e[3] = s, e[4] = h) : h = e[4];
    const u = Je(l, h),
        v = lo(l),
        k = z(Mo);
    let M;
    e[5] !== m ? (M = () => m.gizmo$(), e[5] = m, e[6] = M) : M = e[6];
    const o = z(M),
        {
            pinnedProjectIds: p
        } = Nt();
    let b;
    e[7] !== m ? (b = () => $t(m)(), e[7] = m, e[8] = b) : b = e[8];
    const g = z(b),
        T = !a;
    let j;
    e[9] !== m ? (j = () => Ut(m)(), e[9] = m, e[10] = j) : j = e[10];
    const S = z(j);
    let A;
    e[11] !== m ? (A = () => Ft(m)(), e[11] = m, e[12] = A) : A = e[12];
    const _ = z(A);
    let y;
    e[13] !== m ? (y = () => Vt(m)(), e[13] = m, e[14] = y) : y = e[14];
    const w = z(y),
        {
            canEdit: x
        } = Ot(o ? ? void 0),
        I = o ? ? void 0;
    let O;
    e[15] !== I ? (O = Lt(I), e[15] = I, e[16] = O) : O = e[16];
    const Y = O;
    let L;
    if (e[17] !== o ? .gizmo ? .author ? .user_id || e[18] !== o ? .gizmo ? .sharing ? .subjects) {
        L = new Set;
        const i = o ? .gizmo ? .author ? .user_id;
        i && L.add(i);
        for (const f of o ? .gizmo ? .sharing ? .subjects ? ? []) f.type === Bt.USER && f.user_id && L.add(f.user_id);
        e[17] = o ? .gizmo ? .author ? .user_id, e[18] = o ? .gizmo ? .sharing ? .subjects, e[19] = L
    } else L = e[19];
    const V = L;
    let G;
    e[20] !== o ? (G = o ? nt(o) : !1, e[20] = o, e[21] = G) : G = e[21];
    const $ = G;
    let me;
    e[22] !== o ? (me = Qe(o), e[22] = o, e[23] = me) : me = e[23];
    const U = me;
    let Me;
    e[24] !== o ? (Me = zt(o), e[24] = o, e[25] = Me) : Me = e[25];
    const K = Me;
    let B;
    e[26] !== o ? (B = !1, e[26] = o, e[27] = B) : B = e[27];
    const J = B,
        N = T && Y && !U,
        Ge = Ts(o);
    let fe;
    e[28] !== c ? (fe = c.formatMessage(ct.connectPrompt), e[28] = c, e[29] = fe) : fe = e[29];
    const ke = fe,
        Ae = Ge,
        {
            mutate: Ne
        } = Rt();
    let he;
    e[30] !== s || e[31] !== p ? (he = p.has(s), e[30] = s, e[31] = p, e[32] = he) : he = e[32];
    const q = he,
        ye = o ? .gizmo ? .author ? .user_id === k ? .normalizedAccountUserId,
        we = $ && T;
    let te;
    e[33] !== o ? (te = () => {
        o && ue(_t, {
            projectId: o.gizmo.id,
            projectName: o.gizmo.display.name,
            onClose: vo
        })
    }, e[33] = o, e[34] = te) : te = e[34];
    const se = te;
    let pe;
    e[35] !== o || e[36] !== c ? (pe = () => {
        o && (ft.logStructuredEvent(Wt, {
            projectId: o.gizmo.id,
            entrySurface: "header_dropdown",
            isSharedProject: nt(o)
        }), ue(ot, {
            submitButtonTitle: c.formatMessage(H.projectSettingsSubmitButton),
            gizmo: o,
            onClose: Co,
            onSuccess: _o
        }))
    }, e[35] = o, e[36] = c, e[37] = pe) : pe = e[37];
    const Q = pe;
    let ge;
    e[38] !== u || e[39] !== ke || e[40] !== v ? (ge = i => {
        i.preventDefault(), Fe.count(Ve.POTION, "medical_records.metrics.request_completion", {
            source: "project_settings_dropdown",
            type: "connect_medical_records"
        });
        const f = Qt(Hs);
        v({
            callsiteId: "request_completion.projects.project_header_actions.1",
            sourceEvent: i,
            promptMessage: qt(ke, {
                system_hints: [f]
            }),
            completionMetadata: {
                conversationMode: u ? ? {
                    kind: Yt.PrimaryAssistant
                },
                systemHints: [f]
            }
        })
    }, e[38] = u, e[39] = ke, e[40] = v, e[41] = ge) : ge = e[41];
    const X = ge;
    let Z;
    e[42] !== o || e[43] !== J || e[44] !== K ? (Z = () => {
        if (!o) return;
        let i = null;
        K ? i = po : J && (i = go), i && ue(i, {
            gizmo: o,
            onClose: () => Ee(i)
        })
    }, e[42] = o, e[43] = J, e[44] = K, e[45] = Z) : Z = e[45];
    const oe = Dt(Z);
    let je;
    e[46] !== o || e[47] !== s || e[48] !== n ? (je = () => {
        if (!o) return;
        const i = () => n("/", {
            replace: !0
        });
        ue(Os, {
            gizmoId: s,
            projectName: o.gizmo.display.name,
            handleLeaveComplete: i
        })
    }, e[46] = o, e[47] = s, e[48] = n, e[49] = je) : je = e[49];
    const ne = je;
    let ae;
    e[50] !== o || e[51] !== q || e[52] !== Ne ? (ae = () => {
        o && Ne({
            isPinned: !q,
            project: {
                gizmo: o
            }
        })
    }, e[50] = o, e[51] = q, e[52] = Ne, e[53] = ae) : ae = e[53];
    const ee = ae,
        ie = bo;
    let Se;
    e[54] !== s ? (Se = () => {
        ue(ho, {
            initialGizmoId: s,
            exclusiveToGizmo: !0,
            showResetMemoriesButton: !1
        })
    }, e[54] = s, e[55] = Se) : Se = e[55];
    const Ie = Se,
        re = (o ? .gizmo ? .instructions ? .length ? ? 0) > 0;
    let xe;
    e[56] === Symbol.for("react.memo_cache_sentinel") ? (xe = Ht() && Pt(), e[56] = xe) : xe = e[56];
    const $e = xe,
        ce = x ? re ? H.editInstructionsDropdownLabel : H.addInstructionsDropdownLabel : H.viewOnlyInstructionsDropdownLabel;
    let D;
    if (e[57] !== x || e[58] !== ce || e[59] !== o || e[60] !== oe || e[61] !== X || e[62] !== Q || e[63] !== Ie || e[64] !== ne || e[65] !== ee || e[66] !== se || e[67] !== re || e[68] !== U || e[69] !== J || e[70] !== ye || e[71] !== q || e[72] !== K || e[73] !== Ae || e[74] !== we) {
        if (D = [], K) {
            let i;
            e[76] === Symbol.for("react.memo_cache_sentinel") ? (i = t.jsx(R.Item, {
                onClick: ie,
                icon: Ls,
                children: t.jsx(E, {
                    id: "snorlax.header.actions.health-memories",
                    defaultMessage: "View Health memories"
                })
            }, "saved-memories"), e[76] = i) : i = e[76], D.push(i)
        }
        if (!Qe(o)) {
            let i;
            e[80] === Symbol.for("react.memo_cache_sentinel") ? (i = t.jsx(E, { ...H.projectSettings
            }), e[80] = i) : i = e[80];
            let f;
            e[81] !== Q ? (f = t.jsx(R.Item, {
                onClick: Q,
                icon: Kt,
                children: i
            }, "edit"), e[81] = Q, e[82] = f) : f = e[82], D.push(f)
        }
        if ((x || re) && U) {
            let i;
            e[83] !== ce ? (i = t.jsx(E, { ...ce
            }), e[83] = ce, e[84] = i) : i = e[84];
            let f;
            e[85] !== oe || e[86] !== i ? (f = t.jsx(R.Item, {
                onClick: oe,
                icon: Bs,
                children: i
            }, "instructions"), e[85] = oe, e[86] = i, e[87] = f) : f = e[87], D.push(f)
        }
        if (we) {
            let i;
            e[88] === Symbol.for("react.memo_cache_sentinel") ? (i = t.jsx(E, { ...H.reportProjectButtonLabel
            }), e[88] = i) : i = e[88];
            let f;
            e[89] !== se ? (f = t.jsx(R.Item, {
                onClick: se,
                icon: zs,
                children: i
            }, "report"), e[89] = se, e[90] = f) : f = e[90], D.push(f)
        }
        if (o && $e) {
            const i = q ? Es : Ns,
                f = q ? H.unpinProjectButton : H.pinProjectButton;
            let le;
            e[91] !== f ? (le = t.jsx(E, { ...f
            }), e[91] = f, e[92] = le) : le = e[92];
            let ze;
            e[93] !== ee || e[94] !== i || e[95] !== le ? (ze = t.jsx(R.Item, {
                onClick: ee,
                icon: i,
                children: le
            }, "pin-project"), e[93] = ee, e[94] = i, e[95] = le, e[96] = ze) : ze = e[96], D.push(ze)
        }
        if (!ye && !U) {
            let i;
            e[97] === Symbol.for("react.memo_cache_sentinel") ? (i = t.jsx(E, { ...H.leaveProjectDropdownButton
            }), e[97] = i) : i = e[97];
            let f;
            e[98] !== ne ? (f = t.jsx(R.Item, {
                color: "danger",
                onClick: ne,
                icon: Rs,
                children: i
            }, "leave"), e[98] = ne, e[99] = f) : f = e[99], D.push(f)
        }
        if (Ae) {
            let i;
            e[100] === Symbol.for("react.memo_cache_sentinel") ? (i = t.jsx(E, { ...ct.connectDropdownLabel
            }), e[100] = i) : i = e[100];
            let f;
            e[101] !== X ? (f = t.jsx(R.Item, {
                onClick: X,
                icon: Ds,
                children: i
            }, "connect-medical-records"), e[101] = X, e[102] = f) : f = e[102], D.push(f)
        }
        e[57] = x, e[58] = ce, e[59] = o, e[60] = oe, e[61] = X, e[62] = Q, e[63] = Ie, e[64] = ne, e[65] = ee, e[66] = se, e[67] = re, e[68] = U, e[69] = J, e[70] = ye, e[71] = q, e[72] = K, e[73] = Ae, e[74] = we, e[75] = D
    } else D = e[75];
    const C = D;
    let W;
    e[103] !== o ? (W = () => {
        o && ue(Ct, {
            gizmo: Jt(o),
            publishedGizmo: o,
            onClose: Po
        })
    }, e[103] = o, e[104] = W) : W = e[104];
    const Oe = W;
    let Pe, Le;
    e[105] !== g || e[106] !== N || e[107] !== S ? (Pe = () => {
        g && (Fe.count(Ve.PROJECTS, "snorlax_header_actions_shown", {
            workspace_allows_sharing: S ? "true" : "false"
        }), N && Fe.count(Ve.PROJECTS, "snorlax_header_actions_share_button_shown"))
    }, Le = [g, N, S], e[105] = g, e[106] = N, e[107] = S, e[108] = Pe, e[109] = Le) : (Pe = e[108], Le = e[109]), Ce.useEffect(Pe, Le);
    let be;
    e[110] !== c ? (be = c.formatMessage(H.showProjectDetailsDropdown), e[110] = c, e[111] = be) : be = e[111];
    let _e;
    e[112] !== c ? (_e = c.formatMessage(H.projectShareButton), e[112] = c, e[113] = _e) : _e = e[113];
    const Ue = !o;
    let Be;
    return e[114] !== C || e[115] !== Oe || e[116] !== U || e[117] !== V || e[118] !== w || e[119] !== T || e[120] !== _ || e[121] !== N || e[122] !== be || e[123] !== _e || e[124] !== Ue ? (Be = {
        dropdownAriaLabel: be,
        dropdownOptions: C,
        handleClickShare: Oe,
        isFirstPartyProjectValue: U,
        memberAccountUserIds: V,
        monograms: w,
        onProjectHomePage: T,
        projectShareLabel: _e,
        shareButtonDisabled: Ue,
        shouldShowMonograms: _,
        showShareProjectButton: N
    }, e[114] = C, e[115] = Oe, e[116] = U, e[117] = V, e[118] = w, e[119] = T, e[120] = _, e[121] = N, e[122] = be, e[123] = _e, e[124] = Ue, e[125] = Be) : Be = e[125], Be
}

function Po() {
    return Ee(Ct)
}

function bo() {
    ut && ue(ut, {
        isOpen: !0,
        initialContextScope: "HEALTH"
    })
}

function _o() {
    Ee(ot)
}

function Co() {
    return Ee(ot)
}

function vo() {
    return Ee(_t)
}

function Mo() {
    return Gt()
}

function ko(r) {
    "use forget";
    const e = F.c(10),
        {
            state: l
        } = r,
        {
            handleClickShare: s,
            memberAccountUserIds: a,
            monograms: c,
            projectShareLabel: n,
            shouldShowMonograms: d,
            showShareProjectButton: P
        } = l;
    if (!d) return null;
    if (!P) {
        let u;
        return e[0] !== a || e[1] !== c ? (u = t.jsx("div", {
            className: "mx-2",
            children: t.jsx(at, {
                monograms: c,
                userAccountUserIds: a
            })
        }), e[0] = a, e[1] = c, e[2] = u) : u = e[2], u
    }
    let m;
    e[3] !== a || e[4] !== c ? (m = t.jsx(at, {
        monograms: c,
        userAccountUserIds: a
    }), e[3] = a, e[4] = c, e[5] = m) : m = e[5];
    let h;
    return e[6] !== s || e[7] !== n || e[8] !== m ? (h = t.jsx(ve, {
        "aria-label": n,
        className: "bg-transparent! px-0! hover:opacity-90",
        color: "ghost",
        onClick: s,
        children: m
    }), e[6] = s, e[7] = n, e[8] = m, e[9] = h) : h = e[9], h
}

function Ao(r) {
    "use forget";
    const e = F.c(3),
        {
            state: l
        } = r,
        {
            handleClickShare: s,
            isFirstPartyProjectValue: a,
            shareButtonDisabled: c,
            showShareProjectButton: n
        } = l;
    if (!n || a) return null;
    let d;
    return e[0] !== s || e[1] !== c ? (d = t.jsx(jo, {
        disabled: c,
        onClick: s
    }), e[0] = s, e[1] = c, e[2] = d) : d = e[2], d
}

function yo(r) {
    "use forget";
    const e = F.c(5),
        {
            state: l
        } = r,
        {
            dropdownAriaLabel: s,
            dropdownOptions: a,
            onProjectHomePage: c
        } = l;
    if (!c || a.length === 0) return null;
    let n;
    e[0] !== s ? (n = t.jsx(Xe, {
        "aria-label": s,
        className: "shrink-0"
    }), e[0] = s, e[1] = n) : n = e[1];
    let d;
    return e[2] !== a || e[3] !== n ? (d = t.jsx(pt, {
        side: "top",
        contentAlign: "end",
        sideOffset: 0,
        triggerButton: n,
        size: "auto",
        children: a
    }), e[2] = a, e[3] = n, e[4] = d) : d = e[4], d
}

function wo(r) {
    "use forget";
    const e = F.c(2),
        l = xo(r);
    let s;
    return e[0] !== l ? (s = t.jsxs(t.Fragment, {
        children: [t.jsx(ko, {
            state: l
        }), t.jsx(Ao, {
            state: l
        }), t.jsx(yo, {
            state: l
        })]
    }), e[0] = l, e[1] = s) : s = e[1], s
}
const Io = He(() => Re(() =>
    import ("./a8077c3c-l0ditq4z8me4vohx.js"), __vite__mapDeps([17, 1, 2, 3, 4, 5])).then(r => r.GizmoKeepInSidebarMenuItem), {
    loading: () => t.jsx(ks, {})
});

function $o({
    showShareButton: r,
    showProfileDropdown: e,
    showConversationPrivacyIndicator: l,
    clientThreadId: s
}) {
    const a = ht(),
        c = ss(s),
        n = os(s),
        d = De(),
        P = ns(),
        m = At();
    as.useStoreWithInit({});
    const [h, u, v, k, M, o, p, b, g] = Je(s, C => {
        const W = We.getGizmoId(C);
        return [We.hasUserMessage(C), W, bt(C ? .mode, W), C ? .title, C ? .is_do_not_remember, C ? .isStarred, C ? .continuingFromSharedProjectConversationId, C ? .sharedProjectConversationOwner, qs(C)]
    }), T = z(() => is(c) ? .value), j = Ce.useMemo(() => io({
        clientThreadId: b ? .id && p ? p : n ? ? s,
        gizmoId: u,
        conversationTitle: k,
        conversationAsyncStatus: T,
        isDoNotRemember: M,
        isStarred: o,
        owner: b ? .id ? {
            user_id: b.id
        } : null
    }), [b ? .id, p, n, s, u, k, T, M, o]), S = z(rs), A = St(), _ = cs(s), w = Ce.use(mo) != null, x = ls(), I = ds(), O = !x && S, Y = d.formatMessage({
        id: "GizmoInformation.shareChat",
        defaultMessage: "Share"
    }), L = us(u), V = L ? Ke(a, u) : null, {
        data: G
    } = ms(u), $ = z(() => {
        const C = V ? .gizmo$() ? .gizmo;
        return C != null && "memory_scope" in C ? C.memory_scope : void 0
    }), me = V && Ms($), U = fs(), K = gt() ? .isWorkspaceAccount ? .() ? ? !1, B = !Te(), {
        onShare: J
    } = Ks({
        clientThreadId: s,
        gizmoId: u,
        serverThreadId: n ? ? void 0
    }), N = z(() => hs()), Ge = Ye("2322626856"), fe = Ye("4145668545"), ke = G != null && !B && Pt() && n == null && p == null && !L, Ae = ps(n), he = Je(s, C => {
        const W = We.getConversationTurns(C);
        return gs(W, {
            title: C ? .title ? ? null,
            threadUpdateTimeMs: C ? .update_time != null ? C.update_time * 1e3 : void 0
        }).filter(Pe => !Pe.isTurnEnded).length
    }) > 0, q = Ye("3018147683"), ye = js(u), we = Ss(), te = ye ? Ke(a, u) : null, se = z(() => te ? .isShared$() ? ? !1), pe = z(() => te ? .serverState$().data), Q = se && we && n != null && !Qe(pe), ge = u == null && p == null, X = n ? ? p, Z = X != null && (!K || U != null), oe = Ce.useMemo(() => !B && r && !N ? jt("2874358162").get("open_personalization_button_enabled", !1) : !1, [B, r, N]), je = xs(), ne = Ps(), ae = je === bs.Research || rt != null && ne.has(rt), ee = z(() => _s().hasAccess && !B && r && !N && !ae && !I && !w && !x && (ge || Q) && !g);
    let ie = null;
    ee ? n != null ? ie = Q ? "from-shared-project" : "from-conversation" : _ && !h && (ie = "new-chat") : ie = null;
    const [Se, Ie, re] = z(() => [Cs(c), vs(), wt(c)]), xe = !!m.state ? .newConversationConfig ? .startDoNotRemember, $e = !!M || xe, ce = !!h, D = !!($e && h);
    return t.jsxs(t.Fragment, {
        children: [!_ && A && !x && t.jsx(tt, {
            location: "Atlas header"
        }), re && P && Ie && t.jsx(fo, {
            conversationMode: v
        }), Te() ? t.jsx(Js, {}) : null, Te() && U ? .includes("caterpillar") && t.jsx(Qs, {}), u && L && t.jsx(wo, {
            clientThreadId: s,
            gizmoId: u,
            serverThreadId: n ? ? p
        }), !B && me && !x && !N && !I && Z && null, !B && !u && !x && !N && !I && ce && Z && null, !B && !u && !x && !N && !I && D && Z && null, r && X && t.jsx(t.Fragment, {
            children: O ? t.jsx(ve, {
                onClick: J,
                icon: et,
                label: Y,
                "data-testid": "share-chat-button",
                color: "ghost",
                className: "text-token-text-primary hover:bg-token-surface-hover keyboard-focused:bg-token-surface-hover rounded-lg max-sm:hidden",
                style: {
                    viewTransitionName: "var(--vt_share_chat_wide_button)"
                },
                children: Y
            }) : t.jsx(xt, {
                label: d.formatMessage({
                    id: "CPEfES",
                    defaultMessage: "Share chat"
                }),
                children: t.jsx(vt, {
                    "data-testid": "share-chat-button",
                    className: "max-sm:hidden",
                    onClick: J,
                    icon: et,
                    style: {
                        viewTransitionName: "var(--vt_share_chat_compact_button)"
                    }
                })
            })
        }), t.jsxs("div", {
            className: "flex items-center",
            children: [ee && ie === "new-chat" && !fe ? t.jsx(Xs, {
                type: ie,
                variant: "default"
            }) : null, !B && !u && _ && !w && !h && !x && !I && !ae && t.jsx(t.Fragment, {
                children: t.jsx(Zs, {
                    clientThreadId: s
                })
            }), !B && !u && !x && !N && !I && !h && null, l && t.jsx("div", {
                className: "me-2",
                children: t.jsx(eo, {
                    clientThreadId: s,
                    gizmoId: u
                })
            }), oe ? n ? t.jsx(dt, {
                variant: S ? "default" : "icon"
            }) : h ? null : t.jsx(dt, {
                variant: "icon"
            }) : null, t.jsx(to, {}), ke && t.jsx(pt, {
                side: "top",
                contentAlign: "end",
                sideOffset: 0,
                triggerButton: t.jsx(Xe, {
                    "aria-label": d.formatMessage(Mt.openGptActions),
                    className: "shrink-0",
                    "data-testid": "gpt-landing-options-button"
                }),
                size: "auto",
                children: t.jsx(Io, {
                    gizmoResource: G,
                    location: "conversation_page"
                })
            }), (n != null || p != null || N && Ge && n != null) && !B && t.jsx(ro, {
                conversation: j,
                inMainScreen: !0,
                isActiveConversation: !0,
                inChatWindow: !0,
                shouldShowAdultSearchToggle: re && !Ie,
                children: t.jsxs("div", {
                    className: "relative overflow-hidden",
                    children: [t.jsx(Xe, {
                        "aria-label": d.formatMessage({
                            id: "9Mk/E3",
                            defaultMessage: "Open conversation options"
                        }),
                        "data-testid": "conversation-options-button"
                    }), (Ae.length > 0 && q || he) && t.jsx("div", {
                        className: "pointer-events-none absolute inset-0 grid place-items-center",
                        children: t.jsx(so, {
                            size: 28,
                            backgroundStrokeClassName: "stroke-black/10 dark:stroke-white/10"
                        })
                    })]
                })
            }), Se && (n != null || p != null) && t.jsx(tt, {
                location: "Atlas header"
            }), e && t.jsx(To, {})]
        })]
    })
}
const To = () => {
    "use forget";
    const r = F.c(7),
        e = Xt();
    lt.markStart("LoginOrProfileMenu"), lt.markRendered("LoginOrProfileMenu");
    let l;
    r[0] !== e ? (l = !e && !Te() && t.jsx(Eo, {}), r[0] = e, r[1] = l) : l = r[1];
    let s;
    r[2] !== e ? (s = !e && (Te() || !Zt()) && t.jsx(co, {}), r[2] = e, r[3] = s) : s = r[3];
    let a;
    return r[4] !== l || r[5] !== s ? (a = t.jsxs(t.Fragment, {
        children: [l, s]
    }), r[4] = l, r[5] = s, r[6] = a) : a = r[6], a
};

function tt(r) {
    "use forget";
    const e = F.c(18),
        {
            location: l,
            className: s,
            testId: a,
            to: c,
            state: n
        } = r,
        d = De(),
        P = oo();
    let m;
    e[0] !== d ? (m = d.formatMessage({
        id: "OFyxqj",
        defaultMessage: "New chat"
    }), e[0] = d, e[1] = m) : m = e[1];
    const h = m;
    let u;
    e[2] !== s ? (u = st("flex", s), e[2] = s, e[3] = u) : u = e[3];
    let v;
    e[4] !== l ? (v = g => {
        no(g, {
            location: l
        })
    }, e[4] = l, e[5] = v) : v = e[5];
    const k = c ? ? "/",
        M = n ? ? P;
    let o;
    e[6] !== k || e[7] !== M ? (o = {
        to: k,
        state: M
    }, e[6] = k, e[7] = M, e[8] = o) : o = e[8];
    let p;
    e[9] !== h || e[10] !== v || e[11] !== o || e[12] !== a ? (p = t.jsx(vt, {
        onClick: v,
        icon: ao,
        "aria-label": h,
        "data-testid": a,
        as: "link",
        linkProps: o
    }), e[9] = h, e[10] = v, e[11] = o, e[12] = a, e[13] = p) : p = e[13];
    let b;
    return e[14] !== h || e[15] !== u || e[16] !== p ? (b = t.jsx(xt, {
        label: h,
        className: u,
        children: p
    }), e[14] = h, e[15] = u, e[16] = p, e[17] = b) : b = e[17], b
}

function Uo(r) {
    "use forget";
    const e = F.c(5),
        {
            hideNewChat: l
        } = r,
        s = l === void 0 ? !1 : l;
    if (!St()) return null;
    let c;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (c = t.jsx(uo, {}), e[0] = c) : c = e[0];
    let n;
    e[1] !== s ? (n = !s && t.jsx(tt, {
        location: "Navigation actions"
    }), e[1] = s, e[2] = n) : n = e[2];
    let d;
    return e[3] !== n ? (d = t.jsxs("div", {
        className: "flex items-center",
        children: [c, n]
    }), e[3] = n, e[4] = d) : d = e[4], d
}

function Eo(r) {
    "use forget";
    const e = F.c(31);
    let l;
    e[0] !== r ? (l = r === void 0 ? {} : r, e[0] = r, e[1] = l) : l = e[1];
    const {
        callbackUrl: s,
        skipLoginModal: a,
        location: c
    } = l, n = a === void 0 ? !1 : a, d = c === void 0 ? "Chat header" : c;
    let P;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (P = Fs(), e[2] = P) : P = e[2];
    const m = P,
        h = es() && jt("1803944755").get("should_mobile_chat_header_use_login_or_sign_up_copy", !1) ? Vs.loginOrSignup : it.logInButtonText;
    let u;
    e[3] === Symbol.for("react.memo_cache_sentinel") ? (u = Ws(Mt.signUpCta), e[3] = u) : u = e[3];
    const v = u;
    let k;
    e[4] === Symbol.for("react.memo_cache_sentinel") ? (k = Ys(), e[4] = k) : k = e[4];
    const M = k,
        o = ts.ACCESS_FLOW_ENTRY_POINT_CHAT_HEADER;
    let p;
    e[5] !== s || e[6] !== d || e[7] !== n ? (p = () => {
        qe({
            fallbackScreenHint: "login",
            callback: $ => {
                As({
                    location: d,
                    provider: $
                }, o)
            },
            skipLoginModal: n ? ? !1,
            ...s ? {
                callbackUrl: s
            } : {}
        })
    }, e[5] = s, e[6] = d, e[7] = n, e[8] = p) : p = e[8];
    const b = p;
    let g;
    e[9] !== s || e[10] !== d || e[11] !== n ? (g = () => {
        qe({
            fallbackScreenHint: "signup",
            callback: $ => {
                ys({
                    location: d,
                    provider: $
                }, o)
            },
            skipLoginModal: n ? ? !1,
            ...s ? {
                callbackUrl: s
            } : {}
        })
    }, e[9] = s, e[10] = d, e[11] = n, e[12] = g) : g = e[12];
    const T = g;
    let j;
    e[13] !== s || e[14] !== d || e[15] !== n ? (j = () => {
        qe({
            fallbackScreenHint: "login_or_signup",
            callback: $ => {
                ws({
                    location: d,
                    provider: $
                }, o)
            },
            skipLoginModal: n ? ? !1,
            ...s ? {
                callbackUrl: s
            } : {}
        })
    }, e[13] = s, e[14] = d, e[15] = n, e[16] = j) : j = e[16];
    const S = j;
    let A;
    e[17] === Symbol.for("react.memo_cache_sentinel") ? (A = t.jsx("span", {
        className: "screen-arch:hidden md:screen-arch:inline max-xs:hidden",
        children: t.jsx(E, { ...it.logInButtonText
        })
    }), e[17] = A) : A = e[17];
    let _;
    e[18] === Symbol.for("react.memo_cache_sentinel") ? (_ = t.jsx("span", {
        className: "max-xs:inline screen-arch:inline md:screen-arch:hidden hidden",
        children: t.jsx(E, { ...h
        })
    }), e[18] = _) : _ = e[18];
    let y;
    e[19] !== b ? (y = t.jsxs(ve, {
        onClick: b,
        color: "primary",
        "data-testid": "login-button",
        children: [A, _]
    }, "login"), e[19] = b, e[20] = y) : y = e[20];
    const w = y;
    let x;
    e[21] === Symbol.for("react.memo_cache_sentinel") ? (x = t.jsx(E, { ...v
    }), e[21] = x) : x = e[21];
    let I;
    e[22] !== T ? (I = t.jsx(ve, {
        color: "secondary",
        onClick: T,
        "data-testid": "signup-button",
        className: "screen-arch:hidden md:screen-arch:flex max-xs:hidden",
        children: x
    }, "signup"), e[22] = T, e[23] = I) : I = e[23];
    const O = I;
    let Y;
    e[24] === Symbol.for("react.memo_cache_sentinel") ? (Y = t.jsx(E, { ...M
    }), e[24] = Y) : Y = e[24];
    let L;
    e[25] !== S ? (L = t.jsx(ve, {
        color: "primary",
        onClick: S,
        "data-testid": "login-or-signup-button",
        className: "screen-arch:hidden md:screen-arch:flex",
        children: Y
    }, "signup"), e[25] = S, e[26] = L) : L = e[26];
    const V = L;
    let G;
    if (e[27] !== w || e[28] !== V || e[29] !== O) {
        const $ = m ? [V] : [w, O];
        G = t.jsx("div", {
            className: "flex items-center justify-center gap-2",
            children: $
        }), e[27] = w, e[28] = V, e[29] = O, e[30] = G
    } else G = e[30];
    return G
}
const Mt = mt({
    signUpCta: {
        id: "P6cySK",
        defaultMessage: "Sign up"
    },
    openGptActions: {
        id: "GizmoInformation.gpt.actions.open",
        defaultMessage: "Open GPT actions"
    }
});
export {
    $o as C, To as L, Uo as N, Eo as a
};
//# sourceMappingURL=d70d5a79-mdlj2wo46kax6t6t.js.map