const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/dde865c8-ifmdz652huuh9zn2.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/conversation-small-cqp6votf.css", "assets/2b4d81ac-mxzs7ihtzeyiiii8.js", "assets/78dab443-c0c56pp1295zmyut.js"]))) => i.map(i => d[i]);
import {
    _ as Jt,
    r as ue,
    j as n,
    u as Ze,
    o as Qt,
    c as We,
    h as Zt
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    k1 as en,
    k2 as tn,
    ge as st,
    k3 as nn,
    bN as sn,
    dZ as on,
    k4 as cn,
    k5 as dt,
    k6 as rn,
    ep as _t,
    k7 as an,
    k8 as ln,
    k9 as Ct,
    ka as dn,
    kb as un,
    kc as fn,
    kd as pn,
    ke as _n,
    hr as hn,
    kf as gn,
    kg as Cn,
    kh as kt,
    ki as yn,
    kj as mn,
    kk as Sn,
    kl as bn,
    km as xn,
    kn,
    ko as vn,
    kp as An,
    kq as In,
    kr as On,
    ks as Nn
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    ch as Mn,
    hX as Tt,
    pK as Et,
    lB as pe,
    r2 as Rt,
    dS as yt,
    cD as mt,
    fc as X,
    n2 as Tn,
    hZ as ot,
    cM as En,
    hO as R,
    b2 as wt,
    e as ge,
    qU as Dt,
    ej as Rn,
    pL as jt,
    r1 as ct,
    k as wn,
    mD as Lt,
    mE as Dn,
    c1 as fe,
    ei as jn,
    af as ht,
    D as vt,
    I as Pt,
    rh as Bt,
    g_ as Ln,
    hN as Oe,
    r4 as At,
    lp as Gt,
    r3 as It,
    ri as Pn,
    r0 as Ht,
    _ as Bn,
    bY as Gn,
    aX as Hn,
    hY as St,
    f as Ft,
    r6 as Wt,
    fk as gt,
    hk as Fn,
    J as Wn,
    r7 as $n,
    r8 as Vn,
    iI as Un,
    hW as zn,
    rc as Yn,
    rg as qn,
    cv as Kn,
    r5 as Xn,
    cf as Jn,
    r9 as Qn,
    ra as Zn,
    rb as es,
    qZ as ts,
    ll as ns,
    q as ss,
    rd as os,
    re as cs,
    fg as is,
    rf as rs,
    jt as as,
    qX as ls,
    lz as ds,
    lD as nt
} from "./4813494d-javwxs2rmzsrunl2.js";
const Ot = Mn(() => Jt(() =>
        import ("./dde865c8-ifmdz652huuh9zn2.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7])).then(t => t.ConnectorsOnboardingModal)),
    at = 6,
    us = new Date("2025-11-24T00:00:00.000Z"),
    fs = (t, e = !1, {
        systemHintType: s
    } = {}) => {
        const o = t.some(r => !r.disabled),
            i = e ? [...t] : o ? t.filter(r => !r.disabled) : [...t],
            d = pe(s),
            a = d ? new Set(Ht()) : null,
            S = r => !a || !r.connectorType ? 0 : a.has(r.connectorType) ? 1 : 0;
        return i.sort((r, p) => {
            if (r.connected && !p.connected) return -1;
            if (!r.connected && p.connected) return 1;
            if (r ? .isAutoConnected && !p ? .isAutoConnected || r.type === "cloud" && p.type !== "cloud") return -1;
            if (r.type !== "cloud" && p.type === "cloud") return 1;
            if (r.type === "web" && p.type !== "web") return -1;
            if (r.type !== "web" && p.type === "web" || e && r.disabled && !p.disabled) return 1;
            if (e && !r.disabled && p.disabled || r.isEcosystemConnector && !p.isEcosystemConnector) return -1;
            if (!r.isEcosystemConnector && p.isEcosystemConnector) return 1;
            if (d && !r.connected && !p.connected) {
                const f = S(r),
                    x = S(p);
                if (f !== x) return x - f
            }
            return r.name.localeCompare(p.name)
        }), i
    },
    $t = t => {
        window.open(t, "", "noopener,noreferrer")
    },
    bt = t => {
        const e = zn(),
            s = ge(() => Ft());
        return ue.useCallback(o => {
            const i = {
                productSku: t,
                ...o
            };
            s ? $t(Yn(i)) : e(i)
        }, [t, s, e])
    };

function Fe(t) {
    switch (t.user_connection_details.activation_status) {
        case "activated":
        case "partially_activated":
            return !0;
        case "activating":
        case "inactive":
            return !1
    }
}

function Vt(t) {
    return t.user_connection_details.auth_status === "admin_connected" || t.user_connection_details.auth_status === "user_connected"
}

function xt(t) {
    return ln(t.user_connection_details.connection_type)
}

function Ut(t) {
    switch (t) {
        case "gdrive_sync_connector":
            return R.GDRIVE_ACTION_CONNECTOR;
        case "gmail_sync_connector":
            return R.GMAIL_CONNECTOR;
        default:
            return
    }
}

function ps(t) {
    return t === R.GDRIVE_ACTION_CONNECTOR || t === R.GMAIL_CONNECTOR
}

function Nt(t) {
    return an(t)
}

function _s(t, e) {
    return e.find(s => xt(s) && Ut(s.user_connection_details.connection_type) === t) ? .user_connection_details.connection_type
}

function zt(t) {
    return Fe(t) || Vt(t)
}

function hs({
    connection: t,
    hasBackingAccessConnector: e,
    hasSearchableSharePointAdminSyncConnection: s,
    hasSearchableTeamsAdminSyncConnection: o
}) {
    const i = t.user_connection_details.connection_type;
    return !!(xt(t) || i === "gdrive_sync_connector" && !Fe(t) || !Fe(t) && t.user_connection_details.backing_link_id && e || i === "github_sync_connector" || !Vt(t) && !gs.has(i) || s && i === "sharepoint_sync_connector" || o && i === "teams_sync_connector" || t.user_connection_details.auth_status === "admin_managed_disconnected")
}
const gs = new Set(["slack_sync_connector", "github_sync_connector", "notion_sync_connector", "sharepoint_admin_sync_connector", "teams_admin_sync_connector", "confluence_sync_connector"]),
    Cs = t => {
        "use forget";
        const e = We.c(170),
            {
                isLoading: s,
                conversation: o,
                enabledConnectors: i,
                enabledEcosystemConnectors: d,
                includeWebSearch: a,
                showWebSearchRow: S,
                includeCloudBrowser: r,
                includeSyncConnectors: p,
                connectorFilterFn: f,
                connectorConfigMap: x,
                fetchValidLinksOnly: E,
                systemHintType: _,
                selectedSources: l,
                selectedMCPSources: O,
                showConnectMore: g,
                toggleSource: C,
                contentRef: k,
                isDeveloperMode: y,
                defaultAutoConnectors: P
            } = t,
            W = s === void 0 ? !1 : s,
            w = a === void 0 ? !0 : a,
            U = S === void 0 ? !0 : S,
            H = r === void 0 ? !1 : r,
            v = p === void 0 ? !1 : p,
            z = g === void 0 ? !0 : g,
            ie = St();
        let Z;
        e[0] !== l ? (Z = l ? .has("cloud"), e[0] = l, e[1] = Z) : Z = e[1];
        const $ = !!Z;
        let se;
        e[2] === Symbol.for("react.memo_cache_sentinel") ? (se = mt(), e[2] = se) : se = e[2];
        const h = se,
            A = ge(xs),
            re = _ === fe.Agent,
            L = H && re && h && !$,
            I = Ze(),
            Ce = Pt(),
            {
                openSettings: _e
            } = on(),
            Pe = yt(o.id, ks),
            ye = Ce ? .isWorkspacePlan() && y,
            ae = !y || Pe === !1 && !ye,
            F = Pe === !0 && !ye;
        let Ne;
        e[3] !== E ? (Ne = {
            fetchValidLinksOnly: E
        }, e[3] = E, e[4] = Ne) : Ne = e[4];
        const {
            connectorLinks: Y,
            isLoading: ut
        } = Tt(Ne);
        let $e;
        e[5] === Symbol.for("react.memo_cache_sentinel") ? ($e = Bt(), e[5] = $e) : $e = e[5];
        const ft = $e;
        let Me;
        e[6] !== v ? (Me = () => jt.if$(v), e[6] = v, e[7] = Me) : Me = e[7];
        const {
            data: ke,
            isLoading: et
        } = ge(Me);
        let ve;
        if (e[8] !== ke ? .connection_statuses || e[9] !== f) {
            e: {
                const j = Ln(ke ? .connection_statuses ? ? [], vs);
                if (f) {
                    ve = j ? .filter(K => f(K.user_connection_details.connection_type)) ? ? [];
                    break e
                }
                ve = j ? ? []
            }
            e[8] = ke ? .connection_statuses,
            e[9] = f,
            e[10] = ve
        }
        else ve = e[10];
        const N = ve;
        let Te;
        e[11] !== N ? (Te = new Set(N.map(As).filter(Is)), e[11] = N, e[12] = Te) : Te = e[12];
        const tt = Te;
        let Ve;
        e[13] !== N ? (Ve = N.some(Os), e[13] = N, e[14] = Ve) : Ve = e[14];
        const Be = Ve;
        let Ee;
        e[15] !== N ? (Ee = N.some(Ns), e[15] = N, e[16] = Ee) : Ee = e[16];
        const me = Ee;
        let Se;
        e[17] !== d ? (Se = new Set((d ? ? []).map(Ms)), e[17] = d, e[18] = Se) : Se = e[18];
        const le = Se;
        let Re;
        if (e[19] !== i || e[20] !== le) {
            let j;
            e[22] !== le ? (j = K => qn(K) || typeof K.type == "string" && le.has(K.type), e[22] = le, e[23] = j) : j = e[23], Re = i.filter(j), e[19] = i, e[20] = le, e[21] = Re
        } else Re = e[21];
        const ee = Re;
        let Ge;
        e: {
            if (!v) {
                let T;
                e[24] !== x || e[25] !== Y || e[26] !== ee ? (T = {
                    enabledConnectors: ee,
                    connectorConfigMap: x,
                    connectorLinks: Y
                }, e[24] = x, e[25] = Y, e[26] = ee, e[27] = T) : T = e[27], Ge = T;
                break e
            }
            const j = Oe[R.GDRIVE_ACTION_CONNECTOR];
            let K;e[28] !== Y ? (K = Y.has(j), e[28] = Y, e[29] = K) : K = e[29];
            const c = K;
            let b;e[30] !== N ? (b = N.some(Ts), e[30] = N, e[31] = b) : b = e[31];
            const M = b;
            let B;e[32] !== N ? (B = N.some(Es), e[32] = N, e[33] = B) : B = e[33];
            const he = B;
            let G, V, m;
            if (e[34] !== x || e[35] !== Y || e[36] !== ee || e[37] !== he || e[38] !== c || e[39] !== M || e[40] !== Be || e[41] !== me || e[42] !== I || e[43] !== N) {
                if (m = [...ee], G = new Map(x), V = new Map(Y), c && !m.some(Rs) && !M) {
                    m.push({
                        id: Oe[R.GDRIVE_ACTION_CONNECTOR],
                        type: R.GDRIVE_ACTION_CONNECTOR,
                        name: "Google Drive",
                        description: "",
                        logo_url: cn,
                        connector_type: "SERVICE",
                        service: "",
                        base_url: null,
                        actions: [],
                        supported_auth: [],
                        owners: [],
                        access_list: [],
                        conformance: {
                            implements_retrievable: !0
                        }
                    });
                    let T;
                    e[47] !== I ? (T = I.formatMessage(ne.contactAdmin), e[47] = I, e[48] = T) : T = e[48];
                    let te;
                    e[49] !== T ? (te = {
                        disabled: !0,
                        disabledText: T,
                        hasBetaTag: !1
                    }, e[49] = T, e[50] = te) : te = e[50], G.set(R.GDRIVE_ACTION_CONNECTOR, te), V.delete(j)
                } else he && (m = m.filter(T => {
                    if (he && T.type === R.GDRIVE_ACTION_CONNECTOR) {
                        const te = V.get(T.id) ? .[0];
                        if (N.some(Ie => Ie.user_connection_details.backing_link_id === te ? .id) || he) return !1
                    }
                    return !0
                }));
                N.forEach(T => {
                    xt(T) || T.user_connection_details.backing_link_id && Fe(T) && V.forEach((te, Ie) => {
                        te.some(xe => xe.id === T.user_connection_details.backing_link_id) && (m = m.filter(xe => xe.id !== Ie))
                    })
                }), Be && (m = m.filter(ws), m = m.filter(Ds)), me && (m = m.filter(js), m = m.filter(Ls)), e[34] = x, e[35] = Y, e[36] = ee, e[37] = he, e[38] = c, e[39] = M, e[40] = Be, e[41] = me, e[42] = I, e[43] = N, e[44] = G, e[45] = V, e[46] = m
            } else G = e[44],
            V = e[45],
            m = e[46];
            let de;e[51] !== G || e[52] !== V || e[53] !== m ? (de = {
                enabledConnectors: m,
                connectorConfigMap: G,
                connectorLinks: V
            }, e[51] = G, e[52] = V, e[53] = m, e[54] = de) : de = e[54],
            Ge = de
        }
        const {
            enabledConnectors: be,
            connectorConfigMap: q,
            connectorLinks: Ae
        } = Ge;
        let we;
        e[55] !== be ? (we = be.some(Ps), e[55] = be, e[56] = we) : we = e[56];
        const De = we;
        let je;
        e[57] !== ie || e[58] !== De ? (je = () => _n(ie, De), e[57] = ie, e[58] = De, e[59] = je) : je = e[59];
        const J = ge(je);
        let Le;
        if (e[60] !== Y || e[61] !== ee || e[62] !== le || e[63] !== q || e[64] !== f || e[65] !== Ae || e[66] !== k || e[67] !== o || e[68] !== P || e[69] !== F || e[70] !== ae || e[71] !== be || e[72] !== Be || e[73] !== me || e[74] !== L || e[75] !== H || e[76] !== v || e[77] !== w || e[78] !== I || e[79] !== $ || e[80] !== O || e[81] !== l || e[82] !== U || e[83] !== J || e[84] !== N || e[85] !== tt || e[86] !== _ || e[87] !== C) {
            const j = [];
            if (w && U && !L) {
                let c;
                e[89] !== l ? (c = l ? .has("web"), e[89] = l, e[90] = c) : c = e[90];
                let b;
                e[91] !== C ? (b = () => {
                    C("web")
                }, e[91] = C, e[92] = b) : b = e[92];
                let M;
                e[93] !== I ? (M = I.formatMessage(ne.webSearch), e[93] = I, e[94] = M) : M = e[94];
                let B;
                e[95] !== F || e[96] !== c || e[97] !== b || e[98] !== M ? (B = n.jsx(X.CheckboxItem, {
                    icon: hn,
                    disabled: F,
                    checked: c,
                    onCheckedChange: b,
                    children: M
                }), e[95] = F, e[96] = c, e[97] = b, e[98] = M, e[99] = B) : B = e[99], j.push({
                    connected: !0,
                    type: "web",
                    name: "web",
                    element: B
                })
            }
            if (H) {
                let c;
                e[100] !== C ? (c = () => {
                    C("cloud")
                }, e[100] = C, e[101] = c) : c = e[101];
                let b;
                e[102] !== I ? (b = I.formatMessage(ne.cloudBrowser), e[102] = I, e[103] = b) : b = e[103];
                let M;
                e[104] !== F || e[105] !== $ || e[106] !== c || e[107] !== b ? (M = n.jsx(X.CheckboxItem, {
                    icon: gn,
                    disabled: F,
                    checked: $,
                    onCheckedChange: c,
                    children: b
                }), e[104] = F, e[105] = $, e[106] = c, e[107] = b, e[108] = M) : M = e[108], j.push({
                    connected: !0,
                    type: "cloud",
                    name: "cloud",
                    element: M
                })
            }
            if (v && !L && N.forEach(c => {
                    if (f && !f(c.user_connection_details.connection_type)) return;
                    const b = q ? .get("sync_connector") ? .disabled,
                        M = c.user_connection_details.backing_link_id,
                        B = M ? [...Ae.keys()].find(m => Ae.get(m) ? .some(de => de.id === M)) : null,
                        he = B ? Ae.get(B) ? .find(m => m.id === M) : void 0,
                        G = B ? ee.find(m => m.id === B) ? .type : null;
                    if (hs({
                            connection: c,
                            hasBackingAccessConnector: !!G,
                            hasSearchableSharePointAdminSyncConnection: Be,
                            hasSearchableTeamsAdminSyncConnection: me
                        })) return;
                    const V = c.user_connection_details.auth_status === "admin_connected" ? c.user_connection_details.activation_status !== "inactive" : c.user_connection_details.auth_status !== "not_connected";
                    j.push({
                        connected: V,
                        type: "sync",
                        name: ct(c),
                        connectorType: c.user_connection_details.connection_type,
                        element: n.jsx(qt, {
                            connection: c,
                            disabled: b,
                            disabledText: b ? q ? .get("sync_connector") ? .disabledText : void 0,
                            backingLinkCreatedAt: he ? .created_at,
                            isSelectedInSource: l ? .has(c.user_connection_details.connection_type) ? ? !1,
                            location: "user_dropdown",
                            refetch: At,
                            showDetails: tt.has(c.user_connection_details.connection_type),
                            toggleSource: m => {
                                G && l.has(G) && C(G), C(m)
                            }
                        }, c.user_connection_details.connection_instance_id)
                    })
                }), l && !L && be.forEach(c => {
                    const M = !!Ae.get(c.id) ? .[0],
                        B = c.id === dt && J.isLoading,
                        he = c.id === dt && !M;
                    if (c.type === Gt.MCP_CONNECTOR && c.status !== "DISABLED_BY_ADMIN") j.push({
                        connected: M,
                        type: "access",
                        name: c.name,
                        connectorType: c.type,
                        element: n.jsx(Ss, {
                            connector: c,
                            connectorLinks: Ae,
                            selectedMCPSources: O,
                            toggleSource: C,
                            systemHintType: _,
                            disabled: c.status === "ONLY_ME" && ae || c.status !== "ONLY_ME" && F
                        })
                    });
                    else {
                        let G = F || (q ? .get(c.type) ? .disabled ? ? !1),
                            V = G ? q ? .get(c.type) ? .disabledText : void 0;
                        const m = _s(c.type, N),
                            de = m ? l.has(m) : !1,
                            T = l.has(c.type) || de,
                            te = Xt => {
                                if (!m) {
                                    C(Xt);
                                    return
                                }
                                l.has(m) && C(m), l.has(c.type) && C(c.type), !l.has(m) && !l.has(c.type) && C(m)
                            };
                        if (c.status === "DISABLED_BY_ADMIN" ? (G = !0, V = I.formatMessage(It.disabledByAdmin)) : B ? (G = !0, V = I.formatMessage(ne.fetchingSyncStatus)) : he && (G = !0, V = I.formatMessage(ne.connectOnMobileTooltip)), c.type === R.GITHUB_CONNECTOR) return;
                        const Ie = ft.includes(c.type) && _ === fe.Slurm,
                            xe = P ? .includes(c.type),
                            Qe = typeof c.type == "string" && le.has(c.type) && !!c.branding ? .is_discoverable_app && !c.conformance.implements_retrievable;
                        j.push({
                            connected: M,
                            disabled: G,
                            type: "access",
                            name: c.name,
                            isAutoConnected: Ie || xe,
                            connectorType: c.type,
                            isEcosystemConnector: Qe,
                            element: n.jsx(Yt, {
                                connector: c,
                                connectorLink: Ae.get(c.id) ? .[0],
                                disabled: G,
                                disabledText: V,
                                hasBetaTag: q ? .get(c.type) ? .hasBetaTag,
                                isSelectedInSource: T,
                                systemHintType: _,
                                toggleSource: te,
                                isDefaultAutoConnected: xe
                            })
                        })
                    }
                }), !L) {
                let c;
                e[109] !== ee || e[110] !== l ? (c = l && ee.find(Bs), e[109] = ee, e[110] = l, e[111] = c) : c = e[111];
                let b = c;
                f && !f(R.GITHUB_CONNECTOR) && (b = void 0);
                let M;
                e[112] !== v || e[113] !== N ? (M = v ? N.find(Gs) : void 0, e[112] = v, e[113] = N, e[114] = M) : M = e[114];
                const B = M;
                if (b || B) {
                    const he = B && B.user_connection_details.auth_status !== "not_connected" && B.user_connection_details.activation_status !== "inactive";
                    let G;
                    e[115] !== Y ? (G = Y.get(Pn) ? .[0], e[115] = Y, e[116] = G) : G = e[116];
                    const V = G,
                        m = b && !!V;
                    let de;
                    e[117] !== q || e[118] !== F ? (de = F || (q ? .get(R.GITHUB_CONNECTOR) ? .disabled ? ? !1), e[117] = q, e[118] = F, e[119] = de) : de = e[119];
                    let T = de,
                        te;
                    e[120] !== q || e[121] !== T ? (te = T ? q ? .get(R.GITHUB_CONNECTOR) ? .disabledText : void 0, e[120] = q, e[121] = T, e[122] = te) : te = e[122];
                    let Ie = te;
                    if (b ? .status === "DISABLED_BY_ADMIN") {
                        T = !0;
                        let Qe;
                        e[123] !== I ? (Qe = I.formatMessage(It.disabledByAdmin), e[123] = I, e[124] = Qe) : Qe = e[124], Ie = Qe
                    }
                    let xe;
                    e[125] !== V || e[126] !== k || e[127] !== o || e[128] !== Ie || e[129] !== T || e[130] !== b || e[131] !== B || e[132] !== l || e[133] !== _ || e[134] !== C ? (xe = n.jsx(bs, {
                        conversation: o,
                        githubSyncConnection: B,
                        githubAccessConnector: b,
                        connectorLink: V,
                        selectedSources: l,
                        toggleSource: C,
                        systemHintType: _,
                        refetch: At,
                        contentRef: k,
                        disabled: T,
                        disabledText: Ie
                    }), e[125] = V, e[126] = k, e[127] = o, e[128] = Ie, e[129] = T, e[130] = b, e[131] = B, e[132] = l, e[133] = _, e[134] = C, e[135] = xe) : xe = e[135], j.push({
                        disabled: T,
                        connected: !!he || !!m,
                        type: he ? "sync" : "access",
                        name: "GitHub",
                        connectorType: R.GITHUB_CONNECTOR,
                        element: xe
                    })
                }
            }
            Le = fs(j, F || ae, {
                systemHintType: _
            }).reduce(Hs, [
                [],
                []
            ]), e[60] = Y, e[61] = ee, e[62] = le, e[63] = q, e[64] = f, e[65] = Ae, e[66] = k, e[67] = o, e[68] = P, e[69] = F, e[70] = ae, e[71] = be, e[72] = Be, e[73] = me, e[74] = L, e[75] = H, e[76] = v, e[77] = w, e[78] = I, e[79] = $, e[80] = O, e[81] = l, e[82] = U, e[83] = J, e[84] = N, e[85] = tt, e[86] = _, e[87] = C, e[88] = Le
        } else Le = e[88];
        const [Q, u] = Le;
        let D;
        e[136] !== Q || e[137] !== u ? (D = {
            connectedRows: Q,
            disconnectedRows: u
        }, e[136] = Q, e[137] = u, e[138] = D) : D = e[138];
        const {
            connectedRows: oe,
            disconnectedRows: ce
        } = D;
        let He;
        e: {
            if (pe(_)) {
                let j;
                e[139] === Symbol.for("react.memo_cache_sentinel") ? (j = new Set(Ht()), e[139] = j) : j = e[139];
                const K = j;
                let c;
                if (e[140] !== ce || e[141] !== K) {
                    let b;
                    e[143] !== K ? (b = M => K.has(M.connectorType ? ? ""), e[143] = K, e[144] = b) : b = e[144], c = ce.filter(b), e[140] = ce, e[141] = K, e[142] = c
                } else c = e[142];
                He = Math.max(at - oe.length, c.length);
                break e
            }
            He = at - oe.length
        }
        const Ue = He;
        if (!l) return null;
        if (et || ut || W) {
            let j;
            return e[145] === Symbol.for("react.memo_cache_sentinel") ? (j = n.jsx("div", {
                className: "w-50 px-4",
                children: n.jsx(Kn, {
                    lines: 5,
                    size: "lg",
                    widthVariance: 0,
                    width: 100
                })
            }), e[145] = j) : j = e[145], j
        }
        const it = oe.length > at,
            pt = it && "border-token-border-secondary mb-1.5 border-b";
        let ze;
        e[146] !== pt ? (ze = ht(pt, "overflow-y-auto"), e[146] = pt, e[147] = ze) : ze = e[147];
        let Ye;
        e[148] !== it ? (Ye = it ? {
            maxHeight: `calc(2.25rem * ${at+.5})`
        } : void 0, e[148] = it, e[149] = Ye) : Ye = e[149];
        let qe;
        e[150] !== oe ? (qe = oe.map(Fs), e[150] = oe, e[151] = qe) : qe = e[151];
        let Ke;
        e[152] !== ze || e[153] !== Ye || e[154] !== qe ? (Ke = n.jsx("div", {
            className: ze,
            style: Ye,
            children: qe
        }), e[152] = ze, e[153] = Ye, e[154] = qe, e[155] = Ke) : Ke = e[155];
        let Xe;
        e[156] !== Ue || e[157] !== ce ? (Xe = ce.length > 0 && Ue > 0 && n.jsx(n.Fragment, {
            children: ce.slice(0, Ue).map(Ws)
        }), e[156] = Ue, e[157] = ce, e[158] = Xe) : Xe = e[158];
        let Je;
        e[159] !== L || e[160] !== I || e[161] !== A || e[162] !== _e || e[163] !== z || e[164] !== _ ? (Je = z && !L && n.jsx(X.Item, {
            icon: rn,
            onPointerOver: () => {
                pe(_) && Ot.prefetch()
            },
            onSelect: () => {
                Bn.logEventWithStatsig("chatgpt_connectors_dropdown_connect_more_clicked", "chatgpt_connectors_dropdown_connect_more_clicked"), A ? $t(Xn) : pe(_) ? Gn(Ot, {}) : _e(Hn.Connectors)
            },
            children: I.formatMessage(ne.connectApps)
        }), e[159] = L, e[160] = I, e[161] = A, e[162] = _e, e[163] = z, e[164] = _, e[165] = Je) : Je = e[165];
        let rt;
        return e[166] !== Ke || e[167] !== Xe || e[168] !== Je ? (rt = n.jsxs("div", {
            className: "w-70",
            children: [Ke, Xe, Je]
        }), e[166] = Ke, e[167] = Xe, e[168] = Je, e[169] = rt) : rt = e[169], rt
    },
    ys = ({
        isLoading: t = !1,
        conversation: e,
        enabledConnectors: s,
        enabledEcosystemConnectors: o,
        trigger: i,
        includeWebSearch: d,
        showWebSearchRow: a,
        includeCloudBrowser: S,
        selectedSources: r,
        selectedMCPSources: p,
        addSource: f,
        deleteSource: x,
        toggleSource: E,
        includeSyncConnectors: _ = !1,
        connectorFilterFn: l,
        connectorConfigMap: O,
        fetchValidLinksOnly: g,
        systemHintType: C,
        showConnectMore: k = !0,
        isDeveloperMode: y,
        defaultAutoConnectors: P
    }) => {
        const {
            refetch: W
        } = Tt({
            fetchValidLinksOnly: g
        }), w = Et(), U = pe(C) ? Rt() : !0, v = yt(e.id, L => L ? .startedWithByoMcp) === !0, z = mt(), ie = r ? .has("cloud"), Z = C === fe.Agent && z && !ie, $ = ue.useRef(null), se = ue.useMemo(() => {
            const L = o ? ? [],
                I = new Set(L.map(_e => _e.id)),
                Ce = s.filter(_e => !I.has(_e.id));
            return [...L, ...Ce]
        }, [s, o]), h = ue.useRef(!1), A = ue.useRef(!1);
        return ue.useEffect(() => {
            const L = (r ? .size ? ? 0) + (p ? .size ? ? 0);
            d && !h.current && L === 0 && !v && f("web"), h.current = !0
        }, [r, p, f, v, d]), ue.useEffect(() => {
            Z && !r ? .has("web") && f("web")
        }, [f, r, Z]), !(!!d || !!S || !!_ || s.length > 0 || (o ? .length ? ? 0) > 0 || k) && !t ? null : n.jsxs(X.Root, {
            "data-testid": "sources-pill",
            onOpenChange: L => {
                L ? (A.current || (Tn.logEntryPointShown({
                    referrer: ot.SourcesDropdown
                }), A.current = !0), W()) : !en(tn(En(e.id), _t)) && U && (x(R.GITHUB_CONNECTOR), w && x("github_sync_connector"))
            },
            children: [i, n.jsx(X.Portal, {
                children: n.jsx(X.Content, {
                    alignOffset: -7,
                    size: "auto",
                    ref: $,
                    children: n.jsx(Cs, {
                        isLoading: t,
                        conversation: e,
                        enabledConnectors: se,
                        enabledEcosystemConnectors: o,
                        includeWebSearch: d,
                        showWebSearchRow: a,
                        includeCloudBrowser: S,
                        includeSyncConnectors: _,
                        connectorFilterFn: l,
                        connectorConfigMap: O,
                        fetchValidLinksOnly: g,
                        systemHintType: C,
                        selectedSources: r,
                        selectedMCPSources: p,
                        showConnectMore: k,
                        toggleSource: E,
                        contentRef: $,
                        isDeveloperMode: y,
                        defaultAutoConnectors: P
                    })
                })
            })]
        })
    },
    lt = 3,
    ms = ({
        includeSyncConnectors: t,
        includeWebSearch: e,
        connectorFilterFn: s,
        selectedSources: o,
        selectedMCPSources: i,
        isDeveloperMode: d,
        plainStyle: a
    }) => {
        const S = St(),
            r = Ze(),
            p = wt(),
            f = ge(() => Dt(S, {
                productSku: Rn.PROMPT_TEXT_AREA
            })),
            x = f === void 0,
            {
                data: E,
                isLoading: _
            } = ge(() => jt.if$(t)),
            l = x || _,
            O = [...o ? ? []].filter(h => h !== "web" && h !== "cloud").filter(h => s ? s(h) : !0).flatMap(h => {
                const A = f ? .find(re => re.type === h);
                return A ? [{
                    dedupeKey: ps(A.type) ? A.type : A.name,
                    icon: n.jsx(st, {
                        connector: A,
                        size: "xsmall"
                    }),
                    name: A.name,
                    priority: Nt(A.type) ? 2 : 1
                }] : []
            }),
            g = t ? Array.from(new Map((E ? .connection_statuses ? ? []).filter(h => Fe(h) && (s ? s(h.user_connection_details.connection_type) : !0) && o ? .has(h.user_connection_details.connection_type)).map(h => {
                const A = Ut(h.user_connection_details.connection_type);
                return [h.user_connection_details.connection_type, {
                    dedupeKey: A ? ? ct(h),
                    icon: n.jsx("img", {
                        src: p && h.connection_display_info.icon_dark_url ? h.connection_display_info.icon_dark_url : h.connection_display_info.icon_url ? ? "",
                        alt: h.connection_display_info.display_name,
                        className: "icon"
                    }),
                    name: ct(h),
                    priority: Nt(A) ? 1 : 2
                }]
            })).values()) : [],
            C = Array.from(i ? ? []).flatMap(h => {
                const A = f ? .find(re => re.id === h);
                return A ? [{
                    dedupeKey: A.name,
                    icon: n.jsx(st, {
                        connector: A,
                        size: "xsmall"
                    }),
                    name: A.name,
                    priority: 0
                }] : []
            }),
            k = new Map;
        [...C, ...O, ...g].forEach(h => {
            const A = k.get(h.dedupeKey);
            (!A || h.priority > A.priority) && k.set(h.dedupeKey, h)
        });
        const y = Array.from(k.values()).sort((h, A) => h.name.localeCompare(A.name)).map(({
                icon: h,
                name: A
            }) => ({
                icon: h,
                name: A
            })),
            P = (i ? .size ? ? 0) > 0 || Array.from(o ? ? []).some(h => h !== "web" && h !== "cloud"),
            W = y.length > lt ? [...y.slice(0, lt - 1), {
                name: "__plus_overflow",
                icon: n.jsx("span", {
                    className: "text-token-text-secondary bg-token-bg-secondary text-caption-regular flex h-4.5 w-4.5 items-center justify-center rounded-full",
                    children: y.length - lt + 1
                }, "more")
            }] : y,
            U = ue.useMemo(() => wn("3282868491"), []).get("short_text", "Connectors"),
            H = r.formatMessage(ne.appsTriggerLabel),
            v = U === "Sources" ? null : r.formatMessage({
                id: "DhW8Wx",
                defaultMessage: "Sources"
            }),
            z = P ? v : H,
            ie = W.length > 0 && !l,
            Z = Lt(),
            $ = Dn(),
            se = Z === fe.Research || $.has(jn);
        return n.jsx(X.BasicTrigger, {
            asChild: !0,
            children: n.jsxs("button", {
                type: "button",
                className: a ? "flex" : ht("composer-btn px-2", d && W.length > 0 && "rounded-full bg-orange-400/10 hover:bg-orange-400/20"),
                onClick: () => {
                    vt.addAction("sources-dropdown.click"), se && vt.addAction("deep-research-landing-page.sources-dropdown-click")
                },
                children: [ie ? n.jsx("div", {
                    className: "flex items-center gap-1",
                    children: W.map(h => n.jsx("div", {
                        className: "icon flex items-center justify-center",
                        children: h.icon
                    }, h.name))
                }) : n.jsx(nn, {
                    className: ht("icon flex-shrink-0", !a && "text-token-icon-primary")
                }), d && W.length > 0 ? n.jsx("span", {
                    className: "ms-1.5 text-orange-400 [[data-collapse-labels]_&]:sr-only",
                    children: W.length === 1 ? W[0].name : n.jsx(Qt, {
                        id: "+Fsfxz",
                        defaultMessage: "Multiple Connectors"
                    })
                }) : (W.length < lt || l) && z && n.jsx("span", {
                    className: "ms-1.5 [[data-collapse-labels]_&]:sr-only",
                    children: z
                }), n.jsx(sn, {
                    className: "icon-sm xs:ms-1.5 ms-1"
                })]
            })
        })
    },
    Yt = ({
        connector: t,
        connectorLink: e,
        disabled: s = !1,
        disabledText: o = "",
        hasBetaTag: i = !1,
        isSelectedInSource: d,
        systemHintType: a,
        toggleSource: S,
        isDefaultAutoConnected: r = !1
    }) => {
        const p = Ze(),
            f = Bt(),
            x = Wt(),
            E = Ct(a),
            _ = bt(E),
            l = !!e,
            O = d && l,
            g = f.includes(t.type) && a === fe.Slurm || !x && pe(a) || r;
        if (t.type === Gt.MCP_CONNECTOR) return null;
        const C = Un[t.type] ? .title,
            k = C ? p.formatMessage(C) : t.name,
            y = n.jsx(st, {
                connector: t,
                size: "xsmall"
            }),
            P = n.jsxs("div", {
                className: "flex items-center gap-2",
                children: [n.jsx("span", {
                    className: "truncate",
                    children: k
                }), i && n.jsx(pn, {})]
            }),
            W = t.id === dt,
            w = !l && W ? !0 : s;
        let U;
        l ? g ? U = n.jsx(X.Item, {
            disabled: w,
            label: P,
            onSelect: () => {
                window.location.href = un(t.type)
            },
            icon: y,
            trailing: n.jsx("div", {
                className: "border-token-text-quaternary text-token-text-secondary dark:border-token-border-heavy dark:text-token-text-tertiary items-center rounded-full border px-1 py-0.5 text-[8px] leading-3 font-semibold uppercase",
                children: p.formatMessage(ne.auto)
            })
        }) : U = n.jsx(X.CheckboxItem, {
            disabled: s,
            label: P,
            icon: y,
            checked: O,
            onCheckedChange: () => {
                S(t.type)
            }
        }) : U = n.jsx(X.Item, {
            disabled: s || W,
            onSelect: () => {
                _({
                    connectorId: t.id,
                    redirectAfter: pe(a) ? `/?system_hints=${a}&select_connector_id=${t.id}` : a ? `/?system_hints=${a}` : void 0,
                    systemHintType: a,
                    referrer: ot.SourcesDropdown
                })
            },
            label: P,
            icon: y,
            trailing: s || W ? void 0 : n.jsx("div", {
                className: "text-token-text-tertiary",
                children: p.formatMessage(ne.connect)
            })
        });
        let H = null;
        return g ? l || !s ? H = p.formatMessage(ne.autoConnected) : H = o || p.formatMessage(ne.autoConnectorDisabled) : s && (H = o), n.jsx(n.Fragment, {
            children: (s || g && l) && H ? n.jsx(gt, {
                label: H,
                side: "right",
                align: "center",
                contentClassName: "w-50",
                children: U
            }) : U
        })
    },
    Ss = ({
        connector: t,
        connectorLinks: e,
        selectedMCPSources: s,
        toggleSource: o,
        systemHintType: i,
        disabled: d = !1
    }) => {
        const a = Ze(),
            S = Ct(i),
            r = bt(S);
        if (!t.conformance.implements_retrievable && (i === fe.Research || i === fe.Slurm)) return null;
        const f = !!e.get(t.id) ? .[0],
            x = s.has(t.id) && f,
            E = t.name,
            _ = n.jsxs("div", {
                className: "flex items-center gap-2",
                children: [n.jsx("span", {
                    className: "truncate",
                    children: E
                }), n.jsx(fn, {
                    connector: t
                })]
            }),
            l = n.jsx(st, {
                connector: t,
                size: "xsmall"
            });
        return n.jsx(n.Fragment, {
            children: f ? n.jsx(X.CheckboxItem, {
                icon: l,
                checked: x,
                label: _,
                disabled: d,
                onCheckedChange: () => {
                    o(t.id)
                }
            }) : n.jsx(X.Item, {
                onSelect: () => {
                    d || r({
                        connectorId: t.id,
                        redirectAfter: pe(i) ? `/?system_hints=${i}&select_connector_id=${t.id}` : i ? `/?system_hints=${i}` : void 0,
                        systemHintType: i,
                        referrer: ot.SourcesDropdown
                    })
                },
                icon: l,
                label: _,
                trailing: n.jsx("div", {
                    className: "text-token-text-tertiary",
                    children: a.formatMessage(ne.connect)
                }),
                disabled: d
            })
        })
    },
    qt = ({
        connection: t,
        refetch: e,
        location: s,
        isSelectedInSource: o,
        toggleSource: i,
        showDetails: d,
        disabled: a = !1,
        disabledText: S = "",
        backingLinkCreatedAt: r
    }) => {
        const p = Wt(),
            f = Ze(),
            x = wt(),
            [E, _] = ue.useState(!1),
            [l, O] = ue.useState(),
            g = Lt(),
            C = Ct(g),
            k = bt(C),
            y = () => {
                i(t.user_connection_details.connection_type)
            },
            P = r === void 0 ? null : new Date(r),
            W = t.user_connection_details.connection_type === "asana_sync_connector" && P !== null && !Number.isNaN(P.getTime()) && P < us,
            w = f.formatMessage(ne.asanaRelinkTooltip),
            U = n.jsxs("div", {
                className: "flex items-center gap-1.5",
                children: [n.jsx("span", {
                    className: "truncate",
                    children: ct(t)
                }), W ? n.jsx(gt, {
                    align: "center",
                    label: w,
                    side: "right",
                    contentClassName: "w-50",
                    children: n.jsx(Fn, {
                        "aria-label": w,
                        className: "icon-sm text-token-icon-status-warning shrink-0"
                    })
                }) : null]
            }),
            H = t.user_connection_details.connection_instance_id,
            v = Wn(),
            z = t.user_connection_details.knowledge_connector_type,
            ie = z === "google_drive_oauth",
            Z = t.user_connection_details.connection_type === "notion_sync_connector" && t.user_connection_details.connection_instance_id.startsWith("ks--merge"),
            $ = pe(g) ? !p && ["activated", "partially_activated"].includes(t.user_connection_details.activation_status) : !1,
            se = ue.useCallback(async () => {
                try {
                    _(!0), await $n({
                        connectorType: z,
                        connectionId: H,
                        location: s,
                        intl: f
                    })
                } catch (F) {
                    F instanceof Error ? v.danger(F.message, {
                        toastId: "sources_dropdown_oauth_error"
                    }) : v.danger({
                        defaultMessage: "Encountered an error connecting your account. Please try again later.",
                        description: "Error message shown when a user tries to link their account but it fails."
                    }, {
                        toastId: "sources_dropdown_oauth_error"
                    })
                } finally {
                    _(!1), e ? .()
                }
            }, [H, z, f, s, e, v]),
            [h, A] = ue.useState(!1),
            re = () => {
                ie ? pe(g) ? k({
                    connectorId: Oe[R.GDRIVE_ACTION_CONNECTOR],
                    redirectAfter: pe(g) ? `/?system_hints=${g}&select_connector_id=${Oe[R.GDRIVE_ACTION_CONNECTOR]}` : g ? `/?system_hints=${g}` : void 0,
                    systemHintType: g ? ? void 0,
                    referrer: ot.SourcesDropdown,
                    syncOnly: !0
                }) : A(!0) : Z ? k({
                    connectorId: Oe[R.NOTION_CONNECTOR],
                    redirectAfter: pe(g) ? `/?system_hints=${g}&select_connector_id=${Oe[R.NOTION_CONNECTOR]}` : g ? `/?system_hints=${g}` : void 0,
                    systemHintType: g ? ? void 0,
                    referrer: ot.SourcesDropdown,
                    syncOnly: !0
                }) : se()
            },
            L = t.user_connection_details.activation_status === "inactive" && t.user_connection_details.auth_status === "not_connected",
            I = ["activating", "partially_activated"].includes(t.user_connection_details.activation_status),
            Ce = L || I,
            _e = n.jsx("img", {
                src: x && t.connection_display_info.icon_dark_url ? t.connection_display_info.icon_dark_url : t.connection_display_info.icon_url ? ? "",
                alt: t.connection_display_info.display_name,
                className: "icon"
            }),
            Pe = F => {
                if (F.stopPropagation(), F.preventDefault(), L) {
                    re();
                    return
                }
                if (I) {
                    O(t);
                    return
                }
            },
            ye = {
                key: t.connection_display_info.display_name,
                disabled: a,
                icon: _e,
                label: U,
                secondary: d ? n.jsx("div", {
                    className: "truncate",
                    children: t.connection_display_info.display_name
                }) : void 0
            };
        $ && (ye.trailing = n.jsx("div", {
            className: "border-token-text-quaternary text-token-text-secondary dark:border-token-border-heavy dark:text-token-text-tertiary items-center rounded-full border px-1 py-0.5 text-[8px] leading-3 font-semibold uppercase",
            children: f.formatMessage(ne.auto)
        }));
        let ae = null;
        switch (t.user_connection_details.activation_status) {
            case "activated":
                ae = n.jsx(X.CheckboxItem, { ...ye,
                    checked: o,
                    onCheckedChange: y
                });
                break;
            case "partially_activated":
                ae = n.jsx(X.CheckboxItem, { ...ye,
                    checked: o,
                    onCheckedChange: y,
                    secondary: n.jsx("div", {
                        className: "group-radix-disabled:opacity-50 flex items-center gap-1.5",
                        children: n.jsx(es, {
                            className: "flex-row-reverse",
                            connection: t
                        })
                    })
                });
                break;
            case "activating":
                ae = n.jsx(X.Item, { ...ye,
                    style: {
                        cursor: Ce ? void 0 : "default"
                    },
                    onSelect: Pe,
                    trailing: n.jsx("div", {
                        className: "group-radix-disabled:opacity-50",
                        children: n.jsx(Zn, {
                            connection: t
                        })
                    })
                });
                break;
            case "inactive":
                ae = n.jsx(X.Item, { ...ye,
                    style: {
                        cursor: Ce ? void 0 : "default"
                    },
                    onSelect: Pe,
                    trailing: n.jsx("div", {
                        className: "group-radix-disabled:opacity-50",
                        children: E ? n.jsx(Jn, {
                            className: "icon"
                        }) : n.jsx(Qn, {
                            connection: t,
                            refetch: e,
                            location: "user_dropdown"
                        })
                    })
                });
                break
        }
        return n.jsxs(n.Fragment, {
            children: [l && n.jsx(dn, {
                connection: l,
                onClose: () => O(void 0)
            }), h && n.jsx(Vn, {
                isAdminFlow: !1,
                onClose: () => A(!1),
                connectionId: H,
                location: s,
                onSuccess: e
            }), a && S ? n.jsx(gt, {
                label: S,
                side: "right",
                align: "center",
                contentClassName: "w-50",
                children: ae
            }) : ae]
        })
    },
    bs = ({
        conversation: t,
        githubSyncConnection: e,
        githubAccessConnector: s,
        connectorLink: o,
        selectedSources: i,
        toggleSource: d,
        systemHintType: a,
        refetch: S,
        contentRef: r,
        disabled: p,
        disabledText: f
    }) => {
        const x = Ze(),
            E = ts("installations/select_target"),
            _ = Et(),
            l = pe(a) ? Rt() : !0,
            g = yt(t.id, v => v ? .startedWithByoMcp) === !0,
            {
                data: C,
                isLoading: k
            } = Cn({
                linkId: o ? .id ? ? ""
            }),
            y = !!C,
            P = o ? .id,
            W = !!P && !y;
        if (!s && !e) return null;
        const w = v => {
                const z = v === "github_sync_connector",
                    ie = v === R.GITHUB_CONNECTOR;
                if ((z || ie) && s && e) {
                    const Z = i ? .has("github_sync_connector"),
                        $ = i ? .has(R.GITHUB_CONNECTOR);
                    Z === $ && d(z ? R.GITHUB_CONNECTOR : "github_sync_connector")
                }
                d(v)
            },
            U = s ? n.jsx(st, {
                connector: s,
                size: "xsmall"
            }) : e ? n.jsx("img", {
                src: e.connection_display_info.icon_url ? ? "",
                alt: e.connection_display_info.display_name,
                className: "icon"
            }) : null,
            H = s ? s.name : e ? ct(e) : "";
        if (W && !k && l) return n.jsx(X.Item, {
            label: H,
            icon: U,
            onSelect: () => {
                window.open(E, "_blank")
            },
            trailing: n.jsx("div", {
                className: "text-token-text-tertiary",
                children: x.formatMessage(ne.finishSetup)
            })
        });
        if (e && (Fe(e) || !s)) {
            const v = i.has("github_sync_connector");
            return n.jsxs(n.Fragment, {
                children: [n.jsx(qt, {
                    connection: e,
                    refetch: S,
                    location: "user_dropdown",
                    isSelectedInSource: v,
                    toggleSource: w,
                    showDetails: !1,
                    disabled: k || p,
                    disabledText: f
                }, e.user_connection_details.connection_instance_id), v && _ && l && n.jsx(kt, {
                    conversation: t,
                    allowSelectAllRepos: !1,
                    githubSyncEnabled: !0,
                    linkId: P,
                    syncConnectionId: e.user_connection_details.connection_instance_id,
                    contentRef: r,
                    selectionScope: _t
                })]
            })
        } else if (s) {
            const v = i.has(R.GITHUB_CONNECTOR);
            return n.jsxs(n.Fragment, {
                children: [n.jsx(Yt, {
                    connector: s,
                    connectorLink: o,
                    disabled: g || p,
                    disabledText: f,
                    hasBetaTag: !1,
                    isSelectedInSource: v,
                    systemHintType: a,
                    toggleSource: w
                }), v && l && n.jsx(kt, {
                    conversation: t,
                    linkId: o ? .id,
                    allowSelectAllRepos: !1,
                    githubSyncEnabled: !1,
                    contentRef: r,
                    selectionScope: _t
                })]
            })
        }
        return null
    },
    ne = Zt({
        appsTriggerLabel: {
            id: "2fkvYc",
            defaultMessage: "Apps"
        },
        contactAdmin: {
            id: "JGCH/x",
            defaultMessage: "Contact your admin to enable Google Drive for chat"
        },
        connect: {
            id: "OODbh3",
            defaultMessage: "Connect"
        },
        connectOnMobileTooltip: {
            id: "Ey/eYm",
            defaultMessage: "Connect on your iPhone or iPad"
        },
        fetchingSyncStatus: {
            id: "mm1SP4",
            defaultMessage: "Fetching sync progress, please wait"
        },
        finishSetup: {
            id: "j12ad3",
            defaultMessage: "Finish Setup"
        },
        webSearch: {
            id: "XoUbAe",
            defaultMessage: "Web search"
        },
        cloudBrowser: {
            id: "RA2J7e",
            defaultMessage: "Use cloud browser"
        },
        connectApps: {
            id: "wwlf43",
            defaultMessage: "Connect more"
        },
        autoConnected: {
            id: "7IJBNd",
            defaultMessage: "This connector is searched automatically"
        },
        autoConnectorDisabled: {
            id: "KJQcAS",
            defaultMessage: "To enable this connector, toggle off all custom connectors"
        },
        auto: {
            id: "uW03xX",
            defaultMessage: "Auto"
        },
        asanaRelinkTooltip: {
            id: "q3vS7u",
            defaultMessage: "Reconnect your Asana account to refresh consent. Disconnect and reconnect to continue syncing."
        }
    });

function xs() {
    return Ft()
}

function ks(t) {
    return t ? .startedWithByoMcp
}

function vs(t) {
    return t.user_connection_details.connection_instance_id
}

function As(t) {
    return t.user_connection_details.connection_type
}

function Is(t, e, s) {
    return s.indexOf(t) !== e
}

function Os(t) {
    return zt(t) && t.user_connection_details.connection_type === "sharepoint_admin_sync_connector"
}

function Ns(t) {
    return zt(t) && t.user_connection_details.connection_type === "teams_admin_sync_connector"
}

function Ms(t) {
    return t.type
}

function Ts(t) {
    return t.user_connection_details.connection_type === "gdrive_sync_connector"
}

function Es(t) {
    return t.user_connection_details.connection_type === "gdrive_sync_connector" && Fe(t)
}

function Rs(t) {
    return t.type === R.GDRIVE_ACTION_CONNECTOR
}

function ws(t) {
    return t.id !== Oe[R.SHAREPOINT_CONNECTOR]
}

function Ds(t) {
    return t.id !== Oe[R.SHAREPOINT_ADMIN_CONNECTOR]
}

function js(t) {
    return t.id !== Oe[R.TEAMS_CONNECTOR]
}

function Ls(t) {
    return t.id !== Oe[R.TEAMS_ADMIN_CONNECTOR]
}

function Ps(t) {
    return t.id === dt
}

function Bs(t) {
    return t.type === R.GITHUB_CONNECTOR
}

function Gs(t) {
    return t.user_connection_details.connection_type === "github_sync_connector"
}

function Hs(t, e) {
    const [s, o] = t;
    return e.connected ? [
        [...s, e], o
    ] : [s, [...o, e]]
}

function Fs(t) {
    const {
        element: e,
        name: s
    } = t;
    return n.jsx(ue.Fragment, {
        children: e
    }, s)
}

function Ws(t) {
    const {
        element: e
    } = t;
    return n.jsx(n.Fragment, {
        children: e
    })
}
const Mt = (t, e, s) => {
    const o = new Set(t.map(d => d.id)),
        i = new Set;
    for (const [d, a] of e) {
        if (!o.has(a)) continue;
        const S = s.has(d),
            r = s.has(a);
        if (S && !r) {
            i.add(a);
            continue
        }
        i.add(d)
    }
    return i
};

function no(t) {
    "use forget";
    const e = We.c(4);
    if (yn()) {
        let i;
        return e[0] !== t ? (i = n.jsx(Xs, { ...t
        }), e[0] = t, e[1] = i) : i = e[1], i
    }
    let o;
    return e[2] !== t ? (o = n.jsx($s, { ...t
    }), e[2] = t, e[3] = o) : o = e[3], o
}

function $s(t) {
    "use forget";
    const e = We.c(62),
        {
            conversation: s,
            activeSystemHint: o,
            activeSystemHintType: i,
            selectedSources: d,
            selectedMCPSources: a,
            addSource: S,
            deleteSource: r,
            toggleSource: p,
            currentModelConfigId: f,
            connectionStatuses: x,
            connectedOnly: E,
            hiddenTypes: _,
            hideMcpConnectors: l,
            isDeepResearchAppActive: O,
            plainStyle: g
        } = t,
        C = l === void 0 ? !1 : l,
        k = O === void 0 ? !1 : O,
        y = St(),
        P = ns(),
        W = Pt(),
        w = ge(Ks),
        U = mt(),
        {
            oldToNewAppIds: H
        } = Sn(),
        v = bn(),
        z = new Set(Array.from(v.data ? .entries() ? ? []).filter(qs).map(Ys)),
        ie = k || o ? .systemHint === fe.Research,
        Z = o ? .systemHint === fe.ApiTool,
        $ = o ? .systemHint === fe.Glaux || i === fe.Glaux,
        se = $ ? fe.Glaux : o ? .systemHint;
    let h;
    e[0] !== s ? (h = () => as(s), e[0] = s, e[1] = h) : h = e[1];
    const re = ge(h) === "potion",
        L = o ? .systemHint === fe.Slurm,
        I = o ? .systemHint;
    let Ce;
    e[2] !== f || e[3] !== I ? (Ce = xn(f, I), e[2] = f, e[3] = I, e[4] = Ce) : Ce = e[4];
    const _e = Ce,
        Pe = U && _e && ss("239809486"),
        {
            availableConnectors: ye,
            isLoading: ae,
            enabled: F
        } = os();
    let Ne;
    e[5] !== w || e[6] !== re ? (Ne = {
        isDeveloperMode: w,
        isHealthConversation: re
    }, e[5] = w, e[6] = re, e[7] = Ne) : Ne = e[7];
    const {
        availableConnectors: Y,
        isLoading: ut,
        enabled: $e
    } = kn(Ne), ft = cs();
    let Me;
    e[8] !== y || e[9] !== L ? (Me = () => ls(y, {
        includeDisabledByAdmin: !0,
        includeAutoConnectors: L,
        filterDisabledAutoConnectors: L
    }), e[8] = y, e[9] = L, e[10] = Me) : Me = e[10];
    const ke = ge(Me),
        et = !ke;
    let ve;
    e[11] !== y ? (ve = () => ds(y), e[11] = y, e[12] = ve) : ve = e[12];
    const N = ge(ve);
    let Te;
    e[13] === Symbol.for("react.memo_cache_sentinel") ? (Te = {
        includeDisabledByAdmin: !0
    }, e[13] = Te) : Te = e[13];
    const {
        availableConnectors: tt,
        enabled: Ve,
        isLoading: Be
    } = vn(Te), Ee = ge(zs);
    let me;
    e[14] !== s ? (me = {
        conversation: s
    }, e[14] = s, e[15] = me) : me = e[15];
    const {
        connectorConfigMap: Se
    } = An(me);
    let le;
    e[16] !== y ? (le = () => Dt(y), e[16] = y, e[17] = le) : le = e[17];
    const Re = ge(le),
        ee = a,
        Ge = C;
    let be;
    e[18] !== $ || e[19] !== a || e[20] !== d || e[21] !== p ? (be = u => {
        const D = d.size + a.size;
        $ && (nt(u) && a.has(u) && D <= 1 || !nt(u) && d.has(u) && D <= 1) || p(u)
    }, e[18] = $, e[19] = a, e[20] = d, e[21] = p, e[22] = be) : be = e[22];
    const q = be,
        Ae = L && ((x ? .length ? ? 0) > 0 || ft && ke && ke.length > 0);
    let we;
    e[23] !== _ || e[24] !== Ge ? (we = u => u ? Ge ? u.filter(D => !nt(D.type) && !_ ? .has(D.type)) : _ ? u.filter(D => !_.has(D.type)) : u : [], e[23] = _, e[24] = Ge, e[25] = we) : we = e[25];
    const De = we;
    let je;
    e[26] !== _ ? (je = u => _ ? !_.has(u) : !0, e[26] = _, e[27] = je) : je = e[27];
    const J = je;
    let Le;
    e[28] !== S || e[29] !== s || e[30] !== r || e[31] !== g || e[32] !== q || e[33] !== d || e[34] !== se ? (Le = u => n.jsx(ys, {
        conversation: s,
        selectedSources: d,
        selectedMCPSources: u.selectedMCPSources,
        addSource: S,
        deleteSource: r,
        toggleSource: q,
        isLoading: u.isLoading,
        enabledConnectors: u.enabledConnectors,
        enabledEcosystemConnectors: u.enabledEcosystemConnectors,
        includeWebSearch: u.includeWebSearch,
        showWebSearchRow: u.showWebSearchRow,
        includeCloudBrowser: u.includeCloudBrowser,
        includeSyncConnectors: u.includeSyncConnectors,
        isDeveloperMode: u.isDeveloperMode,
        connectorConfigMap: u.connectorConfigMap,
        systemHintType: se,
        connectorFilterFn: u.connectorFilterFn,
        fetchValidLinksOnly: u.fetchValidLinksOnly,
        showConnectMore: u.showConnectMore,
        defaultAutoConnectors: u.defaultAutoConnectors,
        trigger: n.jsx(ms, {
            selectedSources: d,
            selectedMCPSources: u.selectedMCPSources,
            includeSyncConnectors: u.triggerIncludeSyncConnectors,
            includeWebSearch: u.triggerIncludeWebSearch,
            isDeveloperMode: u.triggerIsDeveloperMode,
            connectorFilterFn: u.connectorFilterFn,
            plainStyle: g
        })
    }), e[28] = S, e[29] = s, e[30] = r, e[31] = g, e[32] = q, e[33] = d, e[34] = se, e[35] = Le) : Le = e[35];
    const Q = Le;
    if ($e && k) {
        const u = Mt(Y, H, z),
            D = Y.filter(ce => !u.has(ce.id)),
            oe = D.filter(Us);
        return Q({
            isLoading: ut,
            enabledConnectors: De(D),
            enabledEcosystemConnectors: oe,
            includeWebSearch: !0,
            showWebSearchRow: !1,
            includeSyncConnectors: !1,
            fetchValidLinksOnly: !0,
            showConnectMore: !re,
            isDeveloperMode: w,
            connectorFilterFn: J,
            triggerIncludeSyncConnectors: !1,
            triggerIncludeWebSearch: !1,
            selectedMCPSources: ee
        })
    }
    if (F && ie) {
        const u = Mt(ye, H, z),
            D = ye.filter(oe => !u.has(oe.id));
        return Q({
            isLoading: ae,
            enabledConnectors: De(D),
            includeWebSearch: !0,
            showWebSearchRow: !1,
            includeSyncConnectors: !1,
            fetchValidLinksOnly: !0,
            isDeveloperMode: w,
            connectorFilterFn: J,
            triggerIncludeSyncConnectors: !1,
            triggerIncludeWebSearch: !0,
            selectedMCPSources: ee
        })
    }
    if (Ae) {
        const u = W ? .isPersonalAccount() ? P : !0;
        let D;
        return e[36] !== De || e[37] !== Se || e[38] !== J || e[39] !== ke || e[40] !== u || e[41] !== w || e[42] !== et || e[43] !== Q || e[44] !== a ? (D = Q({
            isLoading: et,
            enabledConnectors: De(ke),
            includeWebSearch: !1,
            includeSyncConnectors: u,
            isDeveloperMode: w,
            connectorConfigMap: Se,
            connectorFilterFn: J,
            triggerIncludeSyncConnectors: u,
            triggerIncludeWebSearch: !1,
            triggerIsDeveloperMode: w,
            selectedMCPSources: a
        }), e[36] = De, e[37] = Se, e[38] = J, e[39] = ke, e[40] = u, e[41] = w, e[42] = et, e[43] = Q, e[44] = a, e[45] = D) : D = e[45], D
    }
    if (Z) {
        let u;
        if (e[46] !== Re || e[47] !== Se || e[48] !== J || e[49] !== Q || e[50] !== a) {
            const D = Re ? .filter(Vs) ? ? [];
            u = Q({
                isLoading: !Re,
                enabledConnectors: D,
                includeWebSearch: !1,
                includeSyncConnectors: !1,
                isDeveloperMode: !0,
                connectorConfigMap: Se,
                connectorFilterFn: J,
                triggerIncludeSyncConnectors: !1,
                triggerIncludeWebSearch: !1,
                triggerIsDeveloperMode: !0,
                selectedMCPSources: a
            }), e[46] = Re, e[47] = Se, e[48] = J, e[49] = Q, e[50] = a, e[51] = u
        } else u = e[51];
        return u
    }
    if (Ve && _e) return Pe ? null : Q({
        isLoading: Be,
        enabledConnectors: tt,
        includeCloudBrowser: U && !Pe,
        fetchValidLinksOnly: !0,
        isDeveloperMode: w,
        connectorFilterFn: J,
        triggerIncludeSyncConnectors: !1,
        triggerIncludeWebSearch: !0,
        selectedMCPSources: a
    });
    if ($) {
        let u;
        e[52] !== J || e[53] !== N ? (u = He => (He.endsWith("_sync_connector") ? (N ? ? []) ? .some(Ue => Ue.user_connection_details.connection_type === He) : !0) && J(He), e[52] = J, e[53] = N, e[54] = u) : u = e[54];
        const D = u,
            oe = !Ee;
        let ce;
        return e[55] !== Ee || e[56] !== D || e[57] !== w || e[58] !== Q || e[59] !== a || e[60] !== oe ? (ce = Q({
            isLoading: oe,
            enabledConnectors: Ee ? ? [],
            includeWebSearch: !1,
            includeSyncConnectors: !0,
            isDeveloperMode: w,
            connectorFilterFn: D,
            triggerIncludeSyncConnectors: !0,
            triggerIncludeWebSearch: !1,
            selectedMCPSources: a
        }), e[55] = Ee, e[56] = D, e[57] = w, e[58] = Q, e[59] = a, e[60] = oe, e[61] = ce) : ce = e[61], ce
    }
    return null
}

function Vs(t) {
    return t.connector_type === "MCP"
}

function Us(t) {
    return t.connector_type === "MCP"
}

function zs() {
    return rs()
}

function Ys(t) {
    const [e] = t;
    return e
}

function qs(t) {
    const [, e] = t;
    return e.length > 0
}

function Ks() {
    return is()
}

function Xs(t) {
    "use forget";
    const e = We.c(5);
    let s;
    e[0] !== t ? ({ ...s
    } = t, e[0] = t, e[1] = s) : s = e[1];
    let o;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (o = mn(), e[2] = o) : o = e[2];
    const i = o;
    let d;
    return e[3] !== s ? (d = i ? n.jsx(Qs, { ...s
    }) : n.jsx(Js, { ...s
    }), e[3] = s, e[4] = d) : d = e[4], d
}

function Kt(t) {
    "use forget";
    const e = We.c(18),
        {
            conversation: s,
            controller: o,
            addSource: i,
            deleteSource: d,
            toggleSource: a,
            plainStyle: S
        } = t;
    let r;
    e[0] !== o.input || e[1] !== o.selectionPolicy || e[2] !== a ? (r = O => {
        const g = o.input.selection.selectedSources.size + o.input.selection.selectedMCPSources.size;
        o.selectionPolicy.preventDeselectLastSource && (nt(O) && o.input.selection.selectedMCPSources.has(O) && g <= 1 || !nt(O) && o.input.selection.selectedSources.has(O) && g <= 1) || a(O)
    }, e[0] = o.input, e[1] = o.selectionPolicy, e[2] = a, e[3] = r) : r = e[3];
    const p = r;
    let f;
    e[4] !== i || e[5] !== d || e[6] !== p ? (f = {
        addSource: i,
        deleteSource: d,
        toggleSource: p
    }, e[4] = i, e[5] = d, e[6] = p, e[7] = f) : f = e[7];
    let x;
    e[8] !== o.lifecycle.refreshConnectorLinksOnOpen ? (x = {
        refreshConnectorLinksOnOpen: o.lifecycle.refreshConnectorLinksOnOpen
    }, e[8] = o.lifecycle.refreshConnectorLinksOnOpen, e[9] = x) : x = e[9];
    let E;
    e[10] !== f || e[11] !== x ? (E = {
        selection: f,
        lifecycle: x
    }, e[10] = f, e[11] = x, e[12] = E) : E = e[12];
    const _ = E;
    let l;
    return e[13] !== _ || e[14] !== o.input || e[15] !== s || e[16] !== S ? (l = n.jsx(Nn, {
        conversation: s,
        input: o.input,
        actions: _,
        plainStyle: S
    }), e[13] = _, e[14] = o.input, e[15] = s, e[16] = S, e[17] = l) : l = e[17], l
}

function Js(t) {
    "use forget";
    const e = We.c(16),
        {
            conversation: s,
            activeSystemHint: o,
            activeSystemHintType: i,
            selectedSources: d,
            selectedMCPSources: a,
            addSource: S,
            deleteSource: r,
            toggleSource: p,
            currentModelConfigId: f,
            connectedOnly: x,
            hiddenTypes: E,
            hideMcpConnectors: _,
            isDeepResearchAppActive: l
        } = t,
        O = _ === void 0 ? !1 : _,
        g = l === void 0 ? !1 : l;
    let C;
    e[0] !== o || e[1] !== i || e[2] !== s || e[3] !== f || e[4] !== E || e[5] !== O || e[6] !== g || e[7] !== a || e[8] !== d ? (C = {
        conversation: s,
        activeSystemHint: o,
        activeSystemHintType: i,
        selectedSources: d,
        selectedMCPSources: a,
        currentModelConfigId: f,
        hiddenTypes: E,
        hideMcpConnectors: O,
        isDeepResearchAppActive: g
    }, e[0] = o, e[1] = i, e[2] = s, e[3] = f, e[4] = E, e[5] = O, e[6] = g, e[7] = a, e[8] = d, e[9] = C) : C = e[9];
    const k = On(C);
    if (!k) return null;
    let y;
    return e[10] !== S || e[11] !== k || e[12] !== s || e[13] !== r || e[14] !== p ? (y = n.jsx(Kt, {
        conversation: s,
        controller: k,
        addSource: S,
        deleteSource: r,
        toggleSource: p
    }), e[10] = S, e[11] = k, e[12] = s, e[13] = r, e[14] = p, e[15] = y) : y = e[15], y
}

function Qs(t) {
    "use forget";
    const e = We.c(17),
        {
            conversation: s,
            activeSystemHint: o,
            activeSystemHintType: i,
            selectedSources: d,
            selectedMCPSources: a,
            addSource: S,
            deleteSource: r,
            toggleSource: p,
            currentModelConfigId: f,
            connectedOnly: x,
            hiddenTypes: E,
            hideMcpConnectors: _,
            isDeepResearchAppActive: l,
            plainStyle: O
        } = t,
        g = _ === void 0 ? !1 : _,
        C = l === void 0 ? !1 : l;
    let k;
    e[0] !== o || e[1] !== i || e[2] !== s || e[3] !== f || e[4] !== E || e[5] !== g || e[6] !== C || e[7] !== a || e[8] !== d ? (k = {
        conversation: s,
        activeSystemHint: o,
        activeSystemHintType: i,
        selectedSources: d,
        selectedMCPSources: a,
        currentModelConfigId: f,
        hiddenTypes: E,
        hideMcpConnectors: g,
        isDeepResearchAppActive: C
    }, e[0] = o, e[1] = i, e[2] = s, e[3] = f, e[4] = E, e[5] = g, e[6] = C, e[7] = a, e[8] = d, e[9] = k) : k = e[9];
    const y = In(k);
    if (!y) return null;
    let P;
    return e[10] !== S || e[11] !== y || e[12] !== s || e[13] !== r || e[14] !== O || e[15] !== p ? (P = n.jsx(Kt, {
        conversation: s,
        controller: y,
        addSource: S,
        deleteSource: r,
        toggleSource: p,
        plainStyle: O
    }), e[10] = S, e[11] = y, e[12] = s, e[13] = r, e[14] = O, e[15] = p, e[16] = P) : P = e[16], P
}
export {
    no as C
};
//# sourceMappingURL=d5b1a7e0-di9ny29tenjwy6rl.js.map