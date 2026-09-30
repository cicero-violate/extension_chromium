import {
    c as Ee,
    r as I,
    j as c,
    n as He
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    j as Ne,
    rn as be,
    cf as Pe,
    c6 as Te,
    aE as We,
    ij as je,
    e as Ae,
    q as Le,
    a0 as Re,
    aP as Oe,
    cI as xe
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    mo as De,
    ft as Fe,
    fu as $e,
    mp as Ke,
    mq as Ue,
    mr as Ce
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    E as Be
} from "./f7e0bf69-k16b7dassy0t23ka.js";
import {
    N as ze,
    u as qe,
    E as Ge,
    a as Je
} from "./da39060d-pev6u3jq0nawzolv.js";
import "./1bc04b52-htrlynm8a3t36dsr.js";
import "./b8d51478-eia71ltzneqisl3n.js";
import "./4701097e-fcrkpu9i1g9psrli.js";
import "./02833de5-dv0o4y10dk4nqsl1.js";
import "./e9213bfa-drjldekxa18no8cz.js";
import "./0fe285dc-ef2rid3r4goohlwz.js";
import "./f254c486-e4e4t6ee3eghlnbc.js";
import "./1c86a5ac-l4l9bb8zn1n6pjie.js";
import "./7517017f-efd9iwaiway92n98.js";
import "./84983163-gan1f9ordoegunfq.js";
import "./14a60637-ks75r8kvmgl13oz5.js";
import "./679fc303-kl7c6054usfnqmd4.js";
import "./8d846022-bpect2mtc2esvt45.js";
const Ve = 400,
    Ye = i => typeof i ? .reason == "string" ? i.reason : typeof i ? .status == "string" ? `Tool call returned status ${i.status}.` : "The launcher tool call failed before it returned a reason.",
    Qe = i => {
        if (i != null) try {
            return JSON.stringify(i)
        } catch {
            return
        }
    },
    Me = i => {
        "use forget";
        const e = Ee.c(127),
            {
                conversation: l,
                session: t,
                onClose: d
            } = i;
        let h;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (h = De(), e[0] = h) : h = e[0];
        const V = h;
        let A;
        e[1] !== l ? (A = Fe(l), e[1] = l, e[2] = A) : A = e[2];
        const M = A;
        let k;
        e[3] === Symbol.for("react.memo_cache_sentinel") ? (k = Ne(), e[3] = k) : k = e[3];
        const {
            locale: n
        } = k;
        let W;
        e[4] !== t.widgetState ? (W = Qe(t.widgetState), e[4] = t.widgetState, e[5] = W) : W = e[5];
        const D = W,
            y = I.useRef(null),
            j = I.useRef(null);
        let w;
        e[6] === Symbol.for("react.memo_cache_sentinel") ? (w = {
            sessionId: null,
            toolMessageId: null
        }, e[6] = w) : w = e[6];
        const E = I.useRef(w);
        let v;
        e[7] === Symbol.for("react.memo_cache_sentinel") ? (v = {
            sessionId: null,
            html: null
        }, e[7] = v) : v = e[7];
        const H = I.useRef(v),
            [g, J] = I.useState(!1),
            [b, L] = I.useState(!1),
            [O, N] = I.useState(!1);
        let R;
        e[8] !== D || e[9] !== t.chatSDK.metadata ? (R = { ...t.chatSDK.metadata,
            widget_state: D
        }, e[8] = D, e[9] = t.chatSDK.metadata, e[10] = R) : R = e[10];
        const x = t.toolInput ? ? t.chatSDK.toolInput,
            P = t.toolOutput ? ? t.chatSDK.toolOutput,
            u = t.toolResponseMetadata ? ? t.chatSDK.toolResponseMetadata;
        let S;
        e[11] !== t.chatSDK || e[12] !== u || e[13] !== R || e[14] !== x || e[15] !== P ? (S = { ...t.chatSDK,
            metadata: R,
            toolInput: x,
            toolOutput: P,
            toolResponseMetadata: u
        }, e[11] = t.chatSDK, e[12] = u, e[13] = R, e[14] = x, e[15] = P, e[16] = S) : S = e[16];
        const o = S;
        let _;
        e[17] === Symbol.for("react.memo_cache_sentinel") ? (_ = {
            skipNetworkRequestWhenCacheHit: !0
        }, e[17] = _) : _ = e[17];
        const s = $e(o, void 0, _),
            f = o.metadata.resolved_pineapple_uri ? ? null;
        let C;
        e: {
            if (t.status === "error") {
                let a;
                e[18] !== t.toolResponseMetadata ? (a = Ye(t.toolResponseMetadata), e[18] = t.toolResponseMetadata, e[19] = a) : a = e[19];
                const m = typeof t.toolResponseMetadata ? .status == "string" ? t.toolResponseMetadata.status : null;
                let p;
                e[20] !== m ? (p = {
                    label: "Tool status",
                    value: m
                }, e[20] = m, e[21] = p) : p = e[21];
                const T = typeof t.toolResponseMetadata ? .request_id == "string" ? t.toolResponseMetadata.request_id : null;
                let U;
                e[22] !== T ? (U = {
                    label: "Request ID",
                    value: T
                }, e[22] = T, e[23] = U) : U = e[23];
                const ve = typeof t.toolResponseMetadata ? .error_http_status_code == "number" ? t.toolResponseMetadata.error_http_status_code : null;
                let B;
                e[24] !== ve ? (B = {
                    label: "HTTP status",
                    value: ve
                }, e[24] = ve, e[25] = B) : B = e[25];
                const _e = typeof t.toolResponseMetadata ? .error_code == "string" ? t.toolResponseMetadata.error_code : null;
                let z;
                e[26] !== _e ? (z = {
                    label: "Error code",
                    value: _e
                }, e[26] = _e, e[27] = z) : z = e[27];
                let q;
                e[28] !== f ? (q = {
                    label: "Resolved URI",
                    value: f
                }, e[28] = f, e[29] = q) : q = e[29];
                let G;
                e[30] !== p || e[31] !== U || e[32] !== B || e[33] !== z || e[34] !== q ? (G = [p, U, B, z, q], e[30] = p, e[31] = U, e[32] = B, e[33] = z, e[34] = q, e[35] = G) : G = e[35];
                let ue;
                e[36] !== a || e[37] !== G ? (ue = {
                    message: "Unable to launch this app right now.",
                    failurePoint: "tool_call",
                    reason: a,
                    extraDebugItems: G
                }, e[36] = a, e[37] = G, e[38] = ue) : ue = e[38], C = ue;
                break e
            }
            if (s.isError) {
                let a;
                e[39] !== f ? (a = {
                    message: "Unable to resolve this app.",
                    failurePoint: "widget_resolution_request",
                    reason: "The /ecosystem/widget request failed while resolving the launcher iframe.",
                    extraDebugItems: [{
                        label: "Resolved URI",
                        value: f
                    }]
                }, e[39] = f, e[40] = a) : a = e[40], C = a;
                break e
            }
            if (!s.html && !s.isLoading) {
                let a;
                e[41] !== f ? (a = {
                    message: "Unable to resolve this app.",
                    failurePoint: "widget_resolution_response",
                    reason: "The /ecosystem/widget response did not include widget HTML.",
                    extraDebugItems: [{
                        label: "Resolved URI",
                        value: f
                    }]
                }, e[41] = f, e[42] = a) : a = e[42], C = a;
                break e
            }
            C = null
        }
        const r = C;
        let Y;
        e[43] !== s.hideFullScreenHeader || e[44] !== t.mode || e[45] !== r ? (Y = r == null && t.mode === "fullscreen" && !s.hideFullScreenHeader && !be(), e[43] = s.hideFullScreenHeader, e[44] = t.mode, e[45] = r, e[46] = Y) : Y = e[46];
        const me = Y;
        let Q;
        e[47] !== s.hideFullScreenHeader || e[48] !== t.mode || e[49] !== r ? (Q = t.mode === "fullscreen" && (r != null || s.hideFullScreenHeader || be()), e[47] = s.hideFullScreenHeader, e[48] = t.mode, e[49] = r, e[50] = Q) : Q = e[50];
        const F = Q;
        let X;
        e[51] !== t.mode || e[52] !== F ? (X = t.mode === "fullscreen" ? {
            insets: {
                top: F ? ze : 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        } : void 0, e[51] = t.mode, e[52] = F, e[53] = X) : X = e[53];
        const pe = X,
            fe = o.metadata.attribution_id ? ? o.widgetParent;
        let Z;
        e[54] !== s.csp || e[55] !== s.domain || e[56] !== o.widgetId ? (Z = {
            csp: s.csp,
            domain: s.domain,
            widgetId: o.widgetId,
            widgetRef: y
        }, e[54] = s.csp, e[55] = s.domain, e[56] = o.widgetId, e[57] = Z) : Z = e[57];
        const {
            openInApp: he,
            setOpenInAppUrl: ge,
            widgetRedirectUrl: Se
        } = qe(Z), Ie = t.mode === "modal" ? o.metadata.height_hint ? ? s.heightHint ? ? Ve : null, ye = t.mode === "modal" && r == null && !O;
        let ee, te;
        e[58] !== t.chatSDK || e[59] !== t.id || e[60] !== t.launchAttemptId || e[61] !== t.payload || e[62] !== t.status || e[63] !== t.toolResponseMetadata || e[64] !== r ? (ee = () => {
            if (!r) return;
            const a = `${t.id}:${r.failurePoint}:${r.reason}`;
            j.current !== a && (j.current = a, Ue({
                host: "chatgpt",
                payload: t.payload,
                session: {
                    id: t.id,
                    launchAttemptId: t.launchAttemptId,
                    status: t.status,
                    chatSDK: t.chatSDK
                },
                error: r,
                toolResponseMetadata: t.toolResponseMetadata
            }))
        }, te = [t.id, t.launchAttemptId, t.payload, t.status, t.chatSDK, t.toolResponseMetadata, r], e[58] = t.chatSDK, e[59] = t.id, e[60] = t.launchAttemptId, e[61] = t.payload, e[62] = t.status, e[63] = t.toolResponseMetadata, e[64] = r, e[65] = ee, e[66] = te) : (ee = e[65], te = e[66]), I.useEffect(ee, te);
        let se;
        e[67] === Symbol.for("react.memo_cache_sentinel") ? (se = () => {
            J(!1), L(!1)
        }, e[67] = se) : se = e[67];
        let oe;
        e[68] !== t.id ? (oe = [t.id], e[68] = t.id, e[69] = oe) : oe = e[69], I.useEffect(se, oe);
        let ae, le;
        e[70] !== s.html || e[71] !== s.isLoading || e[72] !== t.id ? (ae = () => {
            const a = H.current;
            if (a.sessionId !== t.id) {
                H.current = {
                    sessionId: t.id,
                    html: s.html
                }, N(!1);
                return
            }
            if (s.html == null && s.isLoading) return;
            const p = a.html !== s.html;
            H.current = {
                sessionId: t.id,
                html: s.html
            }, p && N(!1)
        }, le = [t.id, s.html, s.isLoading], e[70] = s.html, e[71] = s.isLoading, e[72] = t.id, e[73] = ae, e[74] = le) : (ae = e[73], le = e[74]), I.useEffect(ae, le);
        let ne, ie;
        e[75] !== M || e[76] !== t.id || e[77] !== t.widgetState || e[78] !== o.toolMessageId || e[79] !== o.widgetId || e[80] !== o.widgetParent || e[81] !== o.widgetSessionId ? (ne = () => {
            E.current.sessionId !== t.id && (E.current = {
                sessionId: t.id,
                toolMessageId: null
            });
            const a = o.toolMessageId ? ? null,
                m = E.current.toolMessageId;
            E.current.toolMessageId = a, !(!(m == null && a != null) || t.widgetState == null) && M.setWidgetState$(a, t.widgetState, {
                appUri: o.widgetParent,
                widgetId: o.widgetId,
                widgetSessionId: o.widgetSessionId,
                source: "host"
            })
        }, ie = [M, t.id, t.widgetState, o.toolMessageId, o.widgetId, o.widgetParent, o.widgetSessionId], e[75] = M, e[76] = t.id, e[77] = t.widgetState, e[78] = o.toolMessageId, e[79] = o.widgetId, e[80] = o.widgetParent, e[81] = o.widgetSessionId, e[82] = ne, e[83] = ie) : (ne = e[82], ie = e[83]), I.useEffect(ne, ie);
        let re;
        e[84] !== d || e[85] !== t.id ? (re = a => {
            V.setLastCheckoutRequestId$(t.id, a.id), d("checkout_completed")
        }, e[84] = d, e[85] = t.id, e[86] = re) : re = e[86];
        const we = re;
        let de;
        e[87] !== fe || e[88] !== l || e[89] !== we || e[90] !== M || e[91] !== Ie || e[92] !== d || e[93] !== s || e[94] !== pe || e[95] !== t.id || e[96] !== t.mode || e[97] !== t.payload || e[98] !== o || e[99] !== r || e[100] !== ge ? (de = r ? c.jsx(Ke, {
            error: r,
            payload: t.payload,
            sessionId: t.id
        }) : c.jsx(Be, {
            onReady: () => N(!0),
            onClose: d,
            onCheckoutComplete: we,
            onCanGoBack: J,
            onCanGoForward: L,
            onSetOpenInAppUrl: ge,
            onUpdateWidgetState: (a, m) => {
                V.setWidgetState$(t.id, m), o.toolMessageId != null && M.setWidgetState$(a, m, {
                    appUri: o.widgetParent,
                    widgetId: o.widgetId,
                    widgetSessionId: o.widgetSessionId,
                    source: "host"
                })
            },
            title: s.name ? ? "",
            domain: s.domain,
            params: t.payload.viewParams,
            displayMode: t.mode,
            forceFullHeight: t.mode === "fullscreen",
            heightHint: Ie,
            safeArea: pe,
            widgetRef: y,
            conversation: l,
            chatSDK: o,
            clientThreadId: l.id,
            resolvedWidget: s,
            html: s.html,
            attributionId: fe,
            widgetId: o.widgetId,
            suggestionMessageId: o.metadata.suggestion_message_id ? ? null,
            widgetType: o.widgetType,
            widgetParent: o.widgetParent,
            subdomain: s.subdomain,
            csp: s.csp,
            locale: n
        }), e[87] = fe, e[88] = l, e[89] = we, e[90] = M, e[91] = Ie, e[92] = d, e[93] = s, e[94] = pe, e[95] = t.id, e[96] = t.mode, e[97] = t.payload, e[98] = o, e[99] = r, e[100] = ge, e[101] = de) : de = e[101];
        const $ = de;
        if (t.mode === "fullscreen") {
            let a;
            e[102] !== g || e[103] !== b || e[104] !== d || e[105] !== he || e[106] !== s.logoUrl || e[107] !== s.name || e[108] !== me || e[109] !== Se ? (a = me && c.jsx(Ge, {
                logo: s.logoUrl,
                hideOpenInAppButton: !1,
                onClickBack: () => y.current ? .navigate({
                    delta: -1
                }),
                onClickClose: () => d("user_dismissed"),
                onClickForward: () => y.current ? .navigate({
                    delta: 1
                }),
                canGoBack: g,
                canGoForward: b,
                title: s.name ? ? "",
                widgetDisplayName: s.name ? ? "",
                widgetDomain: Se ? ? null,
                onClickOpenInApp: he
            }), e[102] = g, e[103] = b, e[104] = d, e[105] = he, e[106] = s.logoUrl, e[107] = s.name, e[108] = me, e[109] = Se, e[110] = a) : a = e[110];
            let m;
            e[111] !== g || e[112] !== b || e[113] !== d || e[114] !== F ? (m = F && c.jsx(Je, {
                isNavOnly: !0,
                onClickBack: () => y.current ? .navigate({
                    delta: -1
                }),
                onClickForward: () => y.current ? .navigate({
                    delta: 1
                }),
                onClickClose: () => d("user_dismissed"),
                canGoBack: g,
                canGoForward: b
            }), e[111] = g, e[112] = b, e[113] = d, e[114] = F, e[115] = m) : m = e[115];
            let p;
            e[116] !== $ ? (p = c.jsx("div", {
                className: "relative min-h-0 flex-1",
                children: $
            }), e[116] = $, e[117] = p) : p = e[117];
            let T;
            return e[118] !== a || e[119] !== m || e[120] !== p ? (T = c.jsxs("div", {
                className: "flex h-full min-h-0 flex-col",
                children: [a, m, p]
            }), e[118] = a, e[119] = m, e[120] = p, e[121] = T) : T = e[121], T
        }
        let K;
        e[122] !== ye ? (K = ye && c.jsx("div", {
            "data-testid": "ecosystem-launcher-loading-state",
            className: "bg-token-bg-primary/80 pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-2xl backdrop-blur-xs sm:rounded-3xl",
            children: c.jsx(Pe, {
                className: "text-token-text-tertiary h-5 w-5"
            })
        }), e[122] = ye, e[123] = K) : K = e[123];
        let ce;
        return e[124] !== $ || e[125] !== K ? (ce = c.jsxs("div", {
            className: "relative min-h-0",
            children: [$, K]
        }), e[124] = $, e[125] = K, e[126] = ce) : ce = e[126], ce
    },
    ke = "pointer-events-none absolute start-0 end-0 top-0 z-10 min-h-0 border-0 p-2",
    Xe = ({
        clientThreadId: i,
        toolMessageId: e
    }) => {
        e != null && (xe(i, l => {
            l.scrollToWidgetMessageId = void 0
        }), requestAnimationFrame(() => {
            xe(i, l => {
                l.scrollToWidgetMessageId = e
            })
        }))
    },
    yt = i => {
        "use forget";
        const e = Ee.c(41),
            {
                conversation: l
            } = i;
        let t;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (t = De(), e[0] = t) : t = e[0];
        const d = t,
            h = He(),
            V = Te(),
            A = We(),
            M = je();
        let k;
        e[1] === Symbol.for("react.memo_cache_sentinel") ? (k = () => d.activeSession$(), e[1] = k) : k = e[1];
        const n = Ae(k),
            W = I.useRef(h.pathname);
        let D;
        e[2] !== h.pathname || e[3] !== n ? (D = () => {
            const u = W.current;
            W.current = h.pathname, !(!n || !(u !== h.pathname)) && (Ce({
                payload: n.payload,
                session: n,
                closeReason: "navigation_changed"
            }), d.close$())
        }, e[2] = h.pathname, e[3] = n, e[4] = D) : D = e[4];
        let y;
        if (e[5] !== l.id || e[6] !== h.pathname || e[7] !== n ? (y = [l.id, d, h.pathname, n], e[5] = l.id, e[6] = h.pathname, e[7] = n, e[8] = y) : y = e[8], I.useEffect(D, y), !n) return null;
        let j;
        e[9] !== l.id || e[10] !== n ? (j = u => {
            Ce({
                payload: n.payload,
                session: n,
                closeReason: u
            }), d.close$(), Le("3100704650") && Xe({
                clientThreadId: l.id,
                toolMessageId: n.chatSDK.toolMessageId ? ? null
            })
        }, e[9] = l.id, e[10] = n, e[11] = j) : j = e[11];
        const w = j;
        let E;
        if (e[12] !== w) {
            const u = () => {
                w("user_dismissed")
            };
            E = S => {
                u()
            }, e[12] = w, e[13] = E
        } else E = e[13];
        const v = E;
        let H;
        e[14] !== w ? (H = u => {
            w(u ? ? "user_dismissed")
        }, e[14] = w, e[15] = H) : H = e[15];
        const g = H,
            J = n.payload.toolName === "start_spotlight_widget";
        if (n.mode === "fullscreen") {
            let u;
            e[16] !== l || e[17] !== g || e[18] !== n ? (u = c.jsx(Me, {
                conversation: l,
                session: n,
                onClose: g
            }), e[16] = l, e[17] = g, e[18] = n, e[19] = u) : u = e[19];
            const S = u;
            if (!A) {
                let f;
                e[20] === Symbol.for("react.memo_cache_sentinel") ? (f = c.jsx("span", {
                    className: "sr-only",
                    children: "Widget modal"
                }), e[20] = f) : f = e[20];
                let C;
                return e[21] !== S || e[22] !== v ? (C = c.jsx(Re, {
                    isOpen: !0,
                    onClose: v,
                    size: "fullscreen",
                    title: f,
                    noPadding: !0,
                    isScrollable: !1,
                    showOverlayBackground: !1,
                    removePopoverStyling: !0,
                    shadow: "custom",
                    headerClassName: ke,
                    contentClassName: "flex min-h-0 flex-col p-0",
                    testId: "modal-ecosystem-widget-launch",
                    children: S
                }), e[21] = S, e[22] = v, e[23] = C) : C = e[23], C
            }
            const o = M ? "var(--sidebar-width)" : "var(--sidebar-rail-width)";
            let _;
            e[24] !== o ? (_ = {
                insetInlineStart: o
            }, e[24] = o, e[25] = _) : _ = e[25];
            let s;
            return e[26] !== S || e[27] !== _ ? (s = c.jsx("div", {
                className: "fixed inset-0 z-50 bg-white",
                style: _,
                children: S
            }), e[26] = S, e[27] = _, e[28] = s) : s = e[28], s
        }
        const b = !V,
            L = J ? "custom" : "normal";
        let O;
        e[29] === Symbol.for("react.memo_cache_sentinel") ? (O = c.jsx("span", {
            className: "sr-only",
            children: "Widget modal"
        }), e[29] = O) : O = e[29];
        let N;
        e[30] === Symbol.for("react.memo_cache_sentinel") ? (N = c.jsx(Oe, {
            onPointerDown: Ze,
            onClick: et,
            iconSize: "lg",
            className: "text-token-text-primary bg-token-main-surface-primary/60! hover:bg-token-main-surface-primary/70! keyboard-focused:bg-token-main-surface-primary/70! pointer-events-auto ms-auto backdrop-blur-xl backdrop-filter transition-colors"
        }), e[30] = N) : N = e[30];
        const R = `max-h-[min(90vh,900px)] w-full ${J?"max-w-lg":"max-w-6xl"}`;
        let x;
        e[31] !== l || e[32] !== g || e[33] !== n ? (x = c.jsx(Me, {
            conversation: l,
            session: n,
            onClose: g
        }), e[31] = l, e[32] = g, e[33] = n, e[34] = x) : x = e[34];
        let P;
        return e[35] !== v || e[36] !== R || e[37] !== x || e[38] !== b || e[39] !== L ? (P = c.jsx(Re, {
            isOpen: !0,
            onClose: v,
            isBottomSheet: b,
            size: L,
            title: O,
            noPadding: !0,
            isScrollable: !1,
            showCloseButton: !0,
            closeButton: N,
            headerClassName: ke,
            contentSize: "fill",
            className: R,
            contentClassName: "flex min-h-0 flex-col p-0",
            testId: "modal-ecosystem-widget-launch",
            children: x
        }), e[35] = v, e[36] = R, e[37] = x, e[38] = b, e[39] = L, e[40] = P) : P = e[40], P
    };

function Ze(i) {
    i.stopPropagation()
}

function et(i) {
    i.stopPropagation()
}
export {
    yt as EcosystemWidgetLaunchHost
};
//# sourceMappingURL=34eaae60-5kedagn441hgxh5i.js.map