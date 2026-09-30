import {
    c as Q,
    j as s,
    r as V,
    o as Z
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    j as ne,
    e as J,
    fg as ce,
    af as ee,
    sb as te,
    aP as se,
    y0 as ie,
    b5 as de,
    go as me,
    bW as fe,
    ti as T
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    E as he
} from "./f7e0bf69-k16b7dassy0t23ka.js";
import {
    g as pe,
    e as X
} from "./67fb493c-izyvw865ff3eh6ob.js";
import {
    ft as ue,
    fu as ge,
    fv as ae
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
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
const xe = {
        type: "spring",
        bounce: .05
    },
    q = 500,
    be = _ => {
        const e = _ ? .layout ? .sidebarWidthPx ? Number(_ ? .layout ? .sidebarWidthPx) : q;
        return `${Math.round(e)}px`
    },
    Be = _ => {
        "use forget";
        const e = Q.c(8),
            {
                conversation: t
            } = _;
        let i;
        e[0] !== t ? (i = () => X(t), e[0] = t, e[1] = i) : i = e[1];
        const a = J(i),
            F = a != null;
        let r;
        e[2] !== t || e[3] !== F || e[4] !== a ? (r = F && s.jsx(ye, {
            conversation: t,
            focusedObject: a.focusedObject,
            chatSDK: a.chatSDK
        }), e[2] = t, e[3] = F, e[4] = a, e[5] = r) : r = e[5];
        let l;
        return e[6] !== r ? (l = s.jsx(fe, {
            children: r
        }), e[6] = r, e[7] = l) : l = e[7], l
    },
    ye = _ => {
        "use forget";
        const e = Q.c(61),
            {
                focusedObject: t,
                conversation: i,
                chatSDK: a
            } = _,
            [F, r] = V.useState(!1),
            [l, W] = V.useState(!1),
            A = V.useRef(null);
        let y;
        e[0] !== t.params ? (y = t ? .params ? ? {}, e[0] = t.params, e[1] = y) : y = e[1];
        const K = y,
            C = K ? .hideHeader ? ? !1,
            G = J(je);
        let j;
        e[2] !== i ? (j = () => {
            X.set(i, null)
        }, e[2] = i, e[3] = j) : j = e[3];
        const o = j,
            [c, D] = V.useState(null);
        let w;
        e[4] !== t.params ? (w = t ? .params ? be(t ? .params) : q, e[4] = t.params, e[5] = w) : w = e[5];
        const k = w;
        if (K.layout ? .isSidebarResponsive && G) {
            let x;
            e[6] === Symbol.for("react.memo_cache_sentinel") ? (x = s.jsx(T.Backdrop, {}), e[6] = x) : x = e[6];
            let n;
            e[7] === Symbol.for("react.memo_cache_sentinel") ? (n = ie({
                axis: "height",
                onChange: oe => {
                    const {
                        height: re
                    } = oe;
                    return D(re)
                }
            }), e[7] = n) : n = e[7];
            let b;
            e[8] !== l ? (b = l && s.jsx(ae, {
                onClick: () => A.current ? .navigate({
                    delta: -1
                }),
                className: "text-white mix-blend-difference grayscale",
                children: s.jsx(te, {})
            }), e[8] = l, e[9] = b) : b = e[9];
            let f;
            e[10] !== t.title ? (f = t.title ? ? s.jsx(Z, {
                id: "OY2FrM",
                defaultMessage: "ChatGPT Application"
            }), e[10] = t.title, e[11] = f) : f = e[11];
            let P;
            e[12] !== f ? (P = s.jsx("div", {
                className: "line-clamp-1 flex-1 truncate px-2 text-lg",
                children: f
            }), e[12] = f, e[13] = P) : P = e[13];
            let L;
            e[14] === Symbol.for("react.memo_cache_sentinel") ? (L = s.jsx(T.Trigger, {
                action: "dismiss",
                children: s.jsx(se, {
                    iconSize: "lg",
                    color: "ghost",
                    className: "text-token-text-primary ms-auto mix-blend-difference grayscale"
                })
            }), e[14] = L) : L = e[14];
            let z;
            e[15] !== n || e[16] !== b || e[17] !== P ? (z = s.jsxs("header", {
                className: "border-token-border-light bg-primary sticky inset-s-0 inset-e-0 top-0 z-[1000] flex w-full items-center justify-between border-b p-2",
                ref: n,
                children: [b, P, L]
            }), e[15] = n, e[16] = b, e[17] = P, e[18] = z) : z = e[18];
            let Y;
            e[19] === Symbol.for("react.memo_cache_sentinel") ? (Y = () => r(!0), e[19] = Y) : Y = e[19];
            let B;
            e[20] !== a || e[21] !== i || e[22] !== t || e[23] !== c ? (B = s.jsx("div", {
                className: "h-full max-h-[80vh] overflow-y-auto",
                children: s.jsx(le, {
                    conversation: i,
                    focusedObject: t,
                    chatSDK: a,
                    displayMode: "modal",
                    headerHeight: c,
                    onReady: Y,
                    onCanGoBack: W,
                    forceFullWidth: !0
                })
            }), e[20] = a, e[21] = i, e[22] = t, e[23] = c, e[24] = B) : B = e[24];
            let $;
            e[25] !== z || e[26] !== B ? ($ = s.jsx(T.Content, {
                size: "fit",
                handle: !1,
                role: "dialog",
                "aria-modal": "true",
                className: "p-0!",
                children: s.jsxs("div", {
                    className: "overflow-hidden rounded-2xl",
                    children: [z, B]
                })
            }), e[25] = z, e[26] = B, e[27] = $) : $ = e[27];
            let U;
            return e[28] !== o || e[29] !== $ ? (U = s.jsx(T.Root, {
                defaultPresented: !0,
                children: s.jsx(T.Portal, {
                    children: s.jsxs(T.View, {
                        onCloseComplete: o,
                        children: [x, $]
                    })
                })
            }), e[28] = o, e[29] = $, e[30] = U) : U = e[30], U
        }
        const H = !F;
        let N, S;
        e[31] === Symbol.for("react.memo_cache_sentinel") ? (N = ee("border-token-border-light bg-token-bg-primary relative h-screen overflow-hidden", "border-s"), S = {
            width: 0
        }, e[31] = N, e[32] = S) : (N = e[31], S = e[32]);
        const M = k ? ? q;
        let h;
        e[33] !== M ? (h = {
            width: M
        }, e[33] = M, e[34] = h) : h = e[34];
        let R;
        e[35] === Symbol.for("react.memo_cache_sentinel") ? (R = {
            width: 0
        }, e[35] = R) : R = e[35];
        let I;
        e[36] === Symbol.for("react.memo_cache_sentinel") ? (I = {
            width: "100%"
        }, e[36] = I) : I = e[36];
        let p;
        e[37] !== l || e[38] !== t.title || e[39] !== o || e[40] !== C || e[41] !== k ? (p = !C && s.jsxs("header", {
            className: "border-token-border-light bg-primary sticky start-0 end-0 top-0 z-[1000] flex w-full items-center justify-between border-b p-2",
            ref: ie({
                axis: "height",
                onChange: x => {
                    const {
                        height: n
                    } = x;
                    return D(n)
                }
            }),
            style: {
                width: k ? ? q
            },
            children: [l && s.jsx(ae, {
                onClick: () => A.current ? .navigate({
                    delta: -1
                }),
                className: "text-white mix-blend-difference grayscale",
                children: s.jsx(te, {})
            }), s.jsx("div", {
                className: "line-clamp-1 flex-1 truncate px-2 text-lg",
                children: t.title ? ? s.jsx(Z, {
                    id: "OY2FrM",
                    defaultMessage: "ChatGPT Application"
                })
            }), s.jsx(se, {
                onClick: o,
                iconSize: "lg",
                className: "text-token-text-primary ms-auto mix-blend-difference grayscale"
            })]
        }), e[37] = l, e[38] = t.title, e[39] = o, e[40] = C, e[41] = k, e[42] = p) : p = e[42];
        const O = t.params ? .layout ? .forceIntrinsicHeight && "pb-4";
        let d;
        e[43] !== O ? (d = ee("flex-1 overflow-auto", O), e[43] = O, e[44] = d) : d = e[44];
        let E;
        e[45] === Symbol.for("react.memo_cache_sentinel") ? (E = () => r(!0), e[45] = E) : E = e[45];
        let u;
        e[46] !== a || e[47] !== i || e[48] !== t || e[49] !== c ? (u = s.jsx(le, {
            conversation: i,
            focusedObject: t,
            chatSDK: a,
            displayMode: "sidebar",
            headerHeight: c,
            onReady: E,
            onCanGoBack: W
        }), e[46] = a, e[47] = i, e[48] = t, e[49] = c, e[50] = u) : u = e[50];
        let m;
        e[51] !== d || e[52] !== u ? (m = s.jsx("div", {
            className: d,
            children: u
        }), e[51] = d, e[52] = u, e[53] = m) : m = e[53];
        let g;
        e[54] !== p || e[55] !== m ? (g = s.jsxs("div", {
            className: "flex h-full flex-col overflow-hidden contain-size",
            style: I,
            children: [p, m]
        }), e[54] = p, e[55] = m, e[56] = g) : g = e[56];
        let v;
        return e[57] !== g || e[58] !== H || e[59] !== h ? (v = s.jsx(de.div, {
            layout: !0,
            "aria-hidden": H,
            className: N,
            initial: S,
            animate: h,
            exit: R,
            transition: xe,
            children: g
        }, "about-me-sidebar"), e[57] = g, e[58] = H, e[59] = h, e[60] = v) : v = e[60], v
    },
    le = _ => {
        "use forget";
        const e = Q.c(38),
            {
                conversation: t,
                focusedObject: i,
                chatSDK: a,
                headerHeight: F,
                onReady: r,
                onCanGoBack: l,
                displayMode: W,
                forceFullWidth: A
            } = _;
        let y;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (y = ne(), e[0] = y) : y = e[0];
        const {
            locale: K
        } = y;
        let C;
        e[1] !== t ? (C = ue(t), e[1] = t, e[2] = C) : C = e[2];
        const G = C;
        let j;
        e[3] !== a || e[4] !== G ? (j = () => G.getLatestChatSDKForSession$(a), e[3] = a, e[4] = G, e[5] = j) : j = e[5];
        const o = J(j),
            c = ge(o),
            D = J(Se),
            {
                html: w,
                domain: k,
                subdomain: H,
                csp: N
            } = c,
            {
                widgetParent: S,
                widgetType: M,
                metadata: h,
                widgetId: R
            } = o,
            I = h ? .attribution_id ? ? S,
            p = h ? .height_hint ? ? 400,
            O = h ? .suggestion_message_id ? ? null;
        let d;
        e[6] !== t ? (d = () => {
            X.set(t, null)
        }, e[6] = t, e[7] = d) : d = e[7];
        const E = d,
            u = F ? ? 0;
        let m;
        e[8] !== u ? (m = {
            insets: {
                top: u,
                bottom: 0,
                left: 0,
                right: 0
            }
        }, e[8] = u, e[9] = m) : m = e[9];
        const g = m;
        let v;
        e[10] !== D || e[11] !== o ? (v = pe(D, o), e[10] = D, e[11] = o, e[12] = v) : v = e[12];
        const x = v,
            n = i.params ? .forceFullHeight,
            b = i.params ? .layout ? .forceIntrinsicHeight;
        let f;
        return e[13] !== I || e[14] !== t || e[15] !== N || e[16] !== W || e[17] !== k || e[18] !== x || e[19] !== i.params || e[20] !== i.title || e[21] !== A || e[22] !== E || e[23] !== p || e[24] !== w || e[25] !== o || e[26] !== l || e[27] !== r || e[28] !== c || e[29] !== g || e[30] !== H || e[31] !== O || e[32] !== n || e[33] !== b || e[34] !== R || e[35] !== S || e[36] !== M ? (f = s.jsx(he, {
            onReady: r,
            onClose: E,
            onCanGoBack: l,
            domain: k,
            html: w,
            attributionId: I,
            widgetId: R,
            widgetParent: S,
            suggestionMessageId: O,
            widgetType: M,
            features: x,
            subdomain: H,
            displayMode: W,
            csp: N,
            locale: K,
            heightHint: p,
            safeArea: g,
            conversation: t,
            chatSDK: o,
            clientThreadId: t.id,
            resolvedWidget: c,
            params: i.params,
            title: i.title,
            forceFullHeight: n,
            forceFullWidth: A,
            forceIntrinsicHeight: b
        }), e[13] = I, e[14] = t, e[15] = N, e[16] = W, e[17] = k, e[18] = x, e[19] = i.params, e[20] = i.title, e[21] = A, e[22] = E, e[23] = p, e[24] = w, e[25] = o, e[26] = l, e[27] = r, e[28] = c, e[29] = g, e[30] = H, e[31] = O, e[32] = n, e[33] = b, e[34] = R, e[35] = S, e[36] = M, e[37] = f) : f = e[37], f
    };

function je() {
    return !me()
}

function Se() {
    return ce()
}
export {
    le as EcosystemAppFocusedObjectWrapper, Be as EcosystemAppSidebar
};
//# sourceMappingURL=eb34548a-micz69xe9kl22112.js.map