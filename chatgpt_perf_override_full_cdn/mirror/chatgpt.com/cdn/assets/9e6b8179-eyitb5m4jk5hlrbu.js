import {
    c as ee,
    u as be,
    j as m,
    r as R,
    y as Ae
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    J as Ne,
    e as Ce,
    ff as $e,
    fW as je,
    aO as Q,
    af as G,
    a as Pe,
    N as Re,
    gu as De,
    aw as we,
    bX as He,
    fk as Me,
    R as Ve,
    v as ze,
    cf as Ge,
    mR as Te,
    _ as We,
    Gn as Ue,
    c as Fe,
    s as Oe,
    b5 as Be,
    sV as Xe
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    cr as Ke,
    b8 as qe,
    gN as _e,
    gM as Je,
    nV as Ze,
    mE as Qe
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    C as Ye
} from "./52047a56-czi1dhw7htgh636e.js";

function et(r) {
    "use forget";
    const e = ee.c(18),
        {
            code: t,
            messageId: o,
            clientThreadId: c,
            disabled: l,
            className: p,
            withText: n
        } = r,
        s = n === void 0 ? !1 : n,
        a = be(),
        h = Ne(),
        u = Ce($e),
        v = je(c);
    let f;
    e[0] !== a ? (f = a.formatMessage({
        id: "CodeBlockCopyButton.copyCode",
        defaultMessage: "Copy code"
    }), e[0] = a, e[1] = f) : f = e[1];
    const g = f;
    let y;
    e[2] !== t || e[3] !== u || e[4] !== o || e[5] !== v || e[6] !== h ? (y = T => {
        const M = {
            "text/plain": t
        };
        Pe.count(Re.CODE_BLOCKS, "chatgpt_code_block_copy_button_clicked"), De(M, h, T), !(u || v == null || o == null) && Ke({
            source: "mouse",
            type: "copy",
            messageId: o,
            serverThreadId: v,
            selectedText: t,
            location: "code-block",
            contentType: "code"
        })
    }, e[2] = t, e[3] = u, e[4] = o, e[5] = v, e[6] = h, e[7] = y) : y = e[7];
    const k = Q(y),
        C = !s,
        w = s ? g : void 0,
        x = s ? "h-9 rounded-lg px-3 whitespace-nowrap" : "size-9 rounded-full px-2",
        E = l && "cursor-not-allowed opacity-50 hover:bg-transparent";
    let b;
    e[8] !== p || e[9] !== x || e[10] !== E ? (b = G(p, "py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10", x, E), e[8] = p, e[9] = x, e[10] = E, e[11] = b) : b = e[11];
    let d;
    return e[12] !== l || e[13] !== k || e[14] !== C || e[15] !== w || e[16] !== b ? (d = m.jsx(qe, {
        onCopy: k,
        iconClassName: "icon-md",
        disabled: l,
        iconOnly: C,
        buttonText: w,
        className: b
    }), e[12] = l, e[13] = k, e[14] = C, e[15] = w, e[16] = b, e[17] = d) : d = e[17], d
}

function Rt(r) {
    "use forget";
    const e = ee.c(33),
        {
            isFullscreen: t,
            codeBlockRef: o,
            isEscapeCloseDisabled: c,
            onEscapeClose: l,
            firstElementRef: p,
            lastElementRef: n,
            children: s,
            ref: a
        } = r,
        h = R.useRef(null),
        [u, v] = R.useState(null),
        f = be();
    let g;
    e[0] !== f ? (g = f.formatMessage({
        id: "code-block-fullscreen-dialog-label",
        defaultMessage: "Code block editor"
    }), e[0] = f, e[1] = g) : g = e[1];
    const y = g;
    let k, C;
    e[2] !== c || e[3] !== t || e[4] !== l ? (k = () => {
        if (!t) return;
        const V = P => {
            c || P.key !== "Escape" && P.key !== "Esc" || (P.preventDefault(), P.stopPropagation(), l())
        };
        return document.addEventListener("keydown", V, !0), () => {
            document.removeEventListener("keydown", V, !0)
        }
    }, C = [c, t, l], e[2] = c, e[3] = t, e[4] = l, e[5] = k, e[6] = C) : (k = e[5], C = e[6]), R.useEffect(k, C);
    let w, x;
    e[7] !== o ? (w = () => ({
        measurePlaceholderMetrics: () => {
            const V = o.current;
            if (!V) return;
            const P = getComputedStyle(V),
                re = Number.parseFloat(P.marginTop) || 0,
                z = Number.parseFloat(P.marginBottom) || 0;
            v({
                height: V.offsetHeight,
                width: V.offsetWidth,
                marginTop: re,
                marginBottom: z
            })
        }
    }), x = [o], e[7] = o, e[8] = w, e[9] = x) : (w = e[8], x = e[9]), R.useImperativeHandle(a, w, x);
    const E = !t && "mt-4 mb-1";
    let b;
    e[10] !== E ? (b = G("relative w-full", E), e[10] = E, e[11] = b) : b = e[11];
    const d = t ? u ? ? void 0 : void 0,
        T = t ? -1 : void 0,
        M = t ? "dialog" : void 0,
        I = t ? !0 : void 0,
        D = t ? y : void 0,
        $ = t && "bg-token-bg-primary fixed inset-0 z-20 flex flex-col items-stretch px-4 pb-4";
    let N;
    e[12] !== $ ? (N = G($), e[12] = $, e[13] = N) : N = e[13];
    let H;
    e[14] !== t || e[15] !== n ? (H = t && m.jsx("span", {
        tabIndex: 0,
        "aria-hidden": "true",
        "data-code-block-focus-sentinel": "true",
        className: "h-0 w-0 overflow-hidden opacity-0",
        onFocus: () => {
            if (n.current != null) {
                n.current.focus();
                return
            }
            h.current ? .focus()
        }
    }), e[14] = t, e[15] = n, e[16] = H) : H = e[16];
    let B;
    e[17] !== p || e[18] !== t ? (B = t && m.jsx("span", {
        tabIndex: 0,
        "aria-hidden": "true",
        "data-code-block-focus-sentinel": "true",
        className: "h-0 w-0 overflow-hidden opacity-0",
        onFocus: () => {
            p.current ? .focus()
        }
    }), e[17] = p, e[18] = t, e[19] = B) : B = e[19];
    let O;
    e[20] !== s || e[21] !== M || e[22] !== I || e[23] !== D || e[24] !== N || e[25] !== H || e[26] !== B || e[27] !== T ? (O = m.jsxs("div", {
        ref: h,
        tabIndex: T,
        role: M,
        "aria-modal": I,
        "aria-label": D,
        className: N,
        children: [H, s, B]
    }), e[20] = s, e[21] = M, e[22] = I, e[23] = D, e[24] = N, e[25] = H, e[26] = B, e[27] = T, e[28] = O) : O = e[28];
    let K;
    return e[29] !== O || e[30] !== b || e[31] !== d ? (K = m.jsx("div", {
        className: b,
        style: d,
        children: O
    }), e[29] = O, e[30] = b, e[31] = d, e[32] = K) : K = e[32], K
}

function tt(r) {
    "use forget";
    const e = ee.c(12),
        {
            disabled: t,
            className: o,
            ref: c,
            onClick: l
        } = r,
        p = t === void 0 ? !1 : t,
        n = R.useRef(null);
    let s, a;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (s = () => ({
        focus: () => {
            n.current ? .focus()
        }
    }), a = [], e[0] = s, e[1] = a) : (s = e[0], a = e[1]), R.useImperativeHandle(c, s, a);
    const h = be();
    let u;
    e[2] !== h ? (u = h.formatMessage({
        id: "CodeBlockCloseButton.closeTooltip",
        defaultMessage: "Close"
    }), e[2] = h, e[3] = u) : u = e[3];
    const v = u;
    let f;
    e[4] !== p || e[5] !== v || e[6] !== l ? (f = m.jsx(we, {
        icon: He,
        color: "ghost",
        size: "medium",
        "aria-disabled": p,
        "aria-label": v,
        ref: n,
        onClick: l,
        className: "rounded-lg border-0"
    }), e[4] = p, e[5] = v, e[6] = l, e[7] = f) : f = e[7];
    let g;
    return e[8] !== o || e[9] !== v || e[10] !== f ? (g = m.jsx(Me, {
        label: v,
        className: o,
        children: f
    }), e[8] = o, e[9] = v, e[10] = f, e[11] = g) : g = e[11], g
}

function nt(r) {
    "use forget";
    const e = ee.c(33),
        {
            onClick: t,
            disabled: o,
            className: c,
            kind: l,
            withText: p
        } = r,
        n = l === void 0 ? "png" : l,
        s = p === void 0 ? !1 : p,
        a = be();
    let h;
    e[0] !== a || e[1] !== n ? (h = n === "code" ? a.formatMessage({
        id: "codeBlockExportButton.downloadCodeFile",
        defaultMessage: "Download code file"
    }) : a.formatMessage({
        id: "codeBlockExportButton.downloadPng",
        defaultMessage: "Download PNG"
    }), e[0] = a, e[1] = n, e[2] = h) : h = e[2];
    const u = h;
    let v;
    e[3] !== a || e[4] !== n || e[5] !== s ? (v = s ? n === "code" ? a.formatMessage({
        id: "codeBlockExportButton.downloadFile",
        defaultMessage: "Download file"
    }) : a.formatMessage({
        id: "codeBlockExportButton.downloadImage",
        defaultMessage: "Download image"
    }) : null, e[3] = a, e[4] = n, e[5] = s, e[6] = v) : v = e[6];
    const f = v;
    let g;
    e[7] !== c ? (g = G("inline-flex", c), e[7] = c, e[8] = g) : g = e[8];
    let y;
    e[9] !== o || e[10] !== n || e[11] !== t ? (y = M => {
        if (o) {
            M.preventDefault();
            return
        }
        Pe.count(Re.CODE_BLOCKS, "chatgpt_code_block_export_button_clicked", {
            kind: n
        }), t()
    }, e[9] = o, e[10] = n, e[11] = t, e[12] = y) : y = e[12];
    const k = s ? "rounded-lg px-3" : "size-9 rounded-full px-2",
        C = !o && "hover:bg-token-bg-secondary",
        w = o && "cursor-not-allowed hover:bg-transparent";
    let x;
    e[13] !== k || e[14] !== C || e[15] !== w ? (x = G("py-2 text-sm font-medium", k, C, w), e[13] = k, e[14] = C, e[15] = w, e[16] = x) : x = e[16];
    let E;
    e[17] !== f || e[18] !== s ? (E = s ? m.jsxs("span", {
        className: "inline-flex items-center gap-1.5 whitespace-nowrap",
        children: [m.jsx(_e, {
            className: "icon-md"
        }), f]
    }) : m.jsx(_e, {
        className: "icon-md"
    }), e[17] = f, e[18] = s, e[19] = E) : E = e[19];
    let b;
    e[20] !== o || e[21] !== u || e[22] !== x || e[23] !== E || e[24] !== y ? (b = m.jsx(we, {
        type: "button",
        color: "ghost",
        label: u,
        visuallyDisabled: o,
        "aria-disabled": o,
        onClick: y,
        className: x,
        children: E
    }), e[20] = o, e[21] = u, e[22] = x, e[23] = E, e[24] = y, e[25] = b) : b = e[25];
    let d;
    e[26] !== b || e[27] !== g ? (d = m.jsx("span", {
        className: g,
        children: b
    }), e[26] = b, e[27] = g, e[28] = d) : d = e[28];
    let T;
    return e[29] !== u || e[30] !== d || e[31] !== s ? (T = m.jsx(Me, {
        label: u,
        disabled: s,
        children: d
    }), e[29] = u, e[30] = d, e[31] = s, e[32] = T) : T = e[32], T
}

function st(r) {
    "use forget";
    const e = ee.c(5),
        {
            clientThreadId: t,
            messageId: o,
            codeIndex: c
        } = r,
        l = je(t),
        p = l != null && o != null;
    let n;
    return e[0] !== p || e[1] !== c || e[2] !== o || e[3] !== l ? (n = {
        mutationKey: p ? ["code-block-share", l, o, c] : ["code-block-share", "disabled", c],
        mutationFn: async () => !p || c == null ? null : await Ve.safePost("/share/post", {
            requestBody: {
                attachments_to_create: [{
                    kind: "code_block",
                    conversation_id: l,
                    message_id: o,
                    code_index: c
                }]
            },
            authOption: ze.SendIfAvailable
        })
    }, e[0] = p, e[1] = c, e[2] = o, e[3] = l, e[4] = n) : n = e[4], Ae(n)
}
const ot = r => {
    "use forget";
    const e = ee.c(28),
        {
            clientThreadId: t,
            messageId: o,
            codeIndex: c,
            flushSave: l,
            language: p
        } = r,
        n = be(),
        s = Ne(),
        a = Ce(rt);
    let h;
    e[0] !== t || e[1] !== c || e[2] !== o ? (h = {
        clientThreadId: t,
        messageId: o,
        codeIndex: c
    }, e[0] = t, e[1] = c, e[2] = o, e[3] = h) : h = e[3];
    const u = st(h);
    let v;
    e[4] !== n ? (v = n.formatMessage({
        id: "CodeBlockFullScreenHeader.shareLabel",
        defaultMessage: "Share"
    }), e[4] = n, e[5] = v) : v = e[5];
    const f = v;
    let g;
    e[6] !== n || e[7] !== s ? (g = () => {
        s.danger(n.formatMessage({
            id: "CodeBlock.share.error",
            defaultMessage: "Failed to create share link."
        }))
    }, e[6] = n, e[7] = s, e[8] = g) : g = e[8];
    const y = Q(g);
    let k;
    e[9] !== t || e[10] !== u || e[11] !== l || e[12] !== n || e[13] !== p || e[14] !== o || e[15] !== y || e[16] !== s ? (k = async () => {
        if (!t || !o || u.isPending) return;
        if (Pe.count(Re.CODE_BLOCKS, "chatgpt_code_block_share_button_clicked"), !await l ? .()) {
            y();
            return
        }
        let I;
        try {
            I = await u.mutateAsync()
        } catch {
            y();
            return
        }
        let D;
        if (I != null && I.post != null && (D = I.post.id), !D) {
            y();
            return
        }
        We.logStructuredEvent(Ue, {
            conversationId: t,
            messageId: o,
            language: p,
            postId: D
        });
        const $ = Ze(D);
        try {
            await De($), s.success(n.formatMessage({
                id: "CodeBlock.share.success",
                defaultMessage: "Share link copied"
            }))
        } catch {
            s.danger(n.formatMessage({
                id: "CodeBlock.share.copyError",
                defaultMessage: "Failed to copy share link."
            }))
        }
    }, e[9] = t, e[10] = u, e[11] = l, e[12] = n, e[13] = p, e[14] = o, e[15] = y, e[16] = s, e[17] = k) : k = e[17];
    const C = Q(k),
        w = u.isPending ? Ge : Je,
        x = a ? "rounded-lg px-2 whitespace-nowrap" : "size-9 rounded-full p-0",
        E = !u.isPending && "hover:bg-token-bg-secondary";
    let b;
    e[18] !== x || e[19] !== E ? (b = G("py-2 text-sm font-medium", x, E), e[18] = x, e[19] = E, e[20] = b) : b = e[20];
    const d = a ? f : null;
    let T;
    return e[21] !== u.isPending || e[22] !== C || e[23] !== f || e[24] !== w || e[25] !== b || e[26] !== d ? (T = m.jsx(we, {
        icon: w,
        color: "ghost",
        size: "medium",
        label: f,
        className: b,
        disabled: u.isPending,
        onClick: C,
        children: d
    }), e[21] = u.isPending, e[22] = C, e[23] = f, e[24] = w, e[25] = b, e[26] = d, e[27] = T) : T = e[27], T
};

function rt() {
    return Te()
}
const lt = Fe(Oe, "e13f29", 20, 20),
    it = Fe(Oe, "baa5ea", 20, 20),
    at = r => {
        "use forget";
        const e = ee.c(19),
            {
                isOpen: t,
                hasErrorOutput: o,
                isDisabled: c,
                onClick: l
            } = r,
            p = t === void 0 ? !1 : t,
            n = o === void 0 ? !1 : o,
            s = c === void 0 ? !1 : c,
            a = be();
        let h;
        e[0] !== a ? (h = a.formatMessage({
            id: "CodeBlockFullScreenHeader.consoleToggleLabel",
            defaultMessage: "Toggle console"
        }), e[0] = a, e[1] = h) : h = e[1];
        const u = h,
            v = n ? it : lt;
        let f;
        e[2] !== s || e[3] !== l ? (f = () => {
            s || l ? .()
        }, e[2] = s, e[3] = l, e[4] = f) : f = e[4];
        const g = !s && "hover:bg-token-bg-secondary",
            y = s && "cursor-not-allowed opacity-50 hover:bg-transparent",
            k = p && "bg-token-bg-secondary";
        let C;
        e[5] !== g || e[6] !== y || e[7] !== k ? (C = G("h-9 w-9 rounded-full p-0", g, y, k), e[5] = g, e[6] = y, e[7] = k, e[8] = C) : C = e[8];
        let w;
        e[9] !== u || e[10] !== s || e[11] !== p || e[12] !== C || e[13] !== v || e[14] !== f ? (w = m.jsx("span", {
            className: "inline-flex",
            children: m.jsx(we, {
                icon: v,
                type: "button",
                color: "ghost",
                size: "medium",
                label: u,
                "aria-pressed": p,
                "aria-disabled": s,
                onClick: f,
                className: C
            })
        }), e[9] = u, e[10] = s, e[11] = p, e[12] = C, e[13] = v, e[14] = f, e[15] = w) : w = e[15];
        let x;
        return e[16] !== u || e[17] !== w ? (x = m.jsx(Me, {
            label: u,
            children: w
        }), e[16] = u, e[17] = w, e[18] = x) : x = e[18], x
    },
    Mt = r => {
        "use forget";
        const e = ee.c(64),
            {
                code: t,
                messageId: o,
                clientThreadId: c,
                codeIndex: l,
                isStreaming: p,
                isPreviewOpen: n,
                isExecutionPaneOnly: s,
                isPreviewDisabled: a,
                isPreviewExportable: h,
                isPreviewExportDisabled: u,
                previewExportKind: v,
                showConsoleToggle: f,
                isConsoleOpen: g,
                hasConsoleErrorOutput: y,
                showCopyButton: k,
                showCodeToggle: C,
                isShareable: w,
                flushSave: x,
                language: E,
                additionalActionButtons: b,
                isCodeOpen: d,
                isCodeDisabled: T,
                onPreviewClick: M,
                onPreviewExportClick: I,
                onPreviewHover: D,
                onConsoleToggle: $,
                onCodeClick: N,
                showCloseButton: H,
                onCloseClick: B,
                closeButtonRef: O
            } = r,
            K = p === void 0 ? !1 : p,
            V = s === void 0 ? !1 : s,
            P = a === void 0 ? !1 : a,
            re = h === void 0 ? !1 : h,
            z = u === void 0 ? !1 : u,
            le = v === void 0 ? "png" : v,
            L = f === void 0 ? !1 : f,
            ie = g === void 0 ? !1 : g,
            me = y === void 0 ? !1 : y,
            te = k === void 0 ? !0 : k,
            Y = C === void 0 ? !0 : C,
            ne = w === void 0 ? !1 : w,
            A = T === void 0 ? !1 : T,
            ae = H === void 0 ? !0 : H,
            _ = be(),
            F = Ce(ct),
            se = L && (F || n),
            oe = F && n && re && I != null,
            pe = se || ne || te || oe || b != null;
        let ce;
        e[0] !== _ ? (ce = _.formatMessage({
            id: "CodeBlockFullScreenHeader.codeLabel",
            defaultMessage: "Code"
        }), e[0] = _, e[1] = ce) : ce = e[1];
        const ge = ce;
        let ve;
        e[2] !== _ ? (ve = _.formatMessage({
            id: "CodeBlockFullScreenHeader.previewLabel",
            defaultMessage: "Preview"
        }), e[2] = _, e[3] = ve) : ve = e[3];
        const xe = ve;
        let de;
        e[4] !== _ ? (de = _.formatMessage({
            id: "CodeBlockFullScreenHeader.consoleLabel",
            defaultMessage: "Console"
        }), e[4] = _, e[5] = de) : de = e[5];
        const q = V ? de : xe;
        let ue;
        e[6] !== _ ? (ue = _.formatMessage({
            id: "CodeBlockFullScreenHeader.viewToggleLabel",
            defaultMessage: "Toggle view"
        }), e[6] = _, e[7] = ue) : ue = e[7];
        const he = ue;
        let fe;
        e[8] !== _ || e[9] !== d || e[10] !== F ? (fe = F && d ? _.formatMessage({
            id: "CodeBlockFullScreenHeader.hideCodeViewLabel",
            defaultMessage: "Hide code"
        }) : _.formatMessage({
            id: "CodeBlockFullScreenHeader.showCodeViewLabel",
            defaultMessage: "Show code"
        }), e[8] = _, e[9] = d, e[10] = F, e[11] = fe) : fe = e[11];
        const J = fe;
        let W;
        e[12] !== O || e[13] !== B || e[14] !== ae ? (W = ae && m.jsx(tt, {
            onClick: B,
            ref: O
        }), e[12] = O, e[13] = B, e[14] = ae, e[15] = W) : W = e[15];
        let U;
        e[16] !== J || e[17] !== A || e[18] !== d || e[19] !== F || e[20] !== N || e[21] !== Y ? (U = F && Y && m.jsx(we, {
            icon: d ? Ye : Qe,
            color: "ghost",
            size: "medium",
            "aria-label": J,
            "aria-pressed": d,
            disabled: A,
            onClick: () => {
                A || N ? .()
            },
            className: "rounded-lg",
            children: J
        }), e[16] = J, e[17] = A, e[18] = d, e[19] = F, e[20] = N, e[21] = Y, e[22] = U) : U = e[22];
        let X;
        e[23] !== W || e[24] !== U ? (X = m.jsxs("div", {
            className: "justify-self-start",
            children: [W, U]
        }), e[23] = W, e[24] = U, e[25] = X) : X = e[25];
        let Z;
        e[26] !== ge || e[27] !== A || e[28] !== d || e[29] !== P || e[30] !== n || e[31] !== F || e[32] !== N || e[33] !== M || e[34] !== D || e[35] !== q || e[36] !== Y || e[37] !== he ? (Z = P ? m.jsx("div", {}) : m.jsx("div", {
            className: "justify-self-center",
            children: !F && Y && m.jsxs("div", {
                role: "group",
                "aria-label": he,
                className: "bg-token-bg-tertiary inline-grid min-w-[190px] grid-cols-2 gap-1 rounded-full p-1",
                children: [m.jsx("button", {
                    type: "button",
                    "aria-label": ge,
                    "aria-pressed": !n,
                    "aria-disabled": !n || A,
                    className: G("h-8 rounded-full px-4 text-sm font-medium transition-colors", d ? "bg-token-bg-primary text-token-text-primary" : "text-token-text-secondary", !d && !A && "hover:text-token-text-primary", A && "text-token-text-quaternary cursor-not-allowed"),
                    onClick: () => {
                        A || d || N ? .()
                    },
                    children: ge
                }), m.jsx("button", {
                    type: "button",
                    "aria-label": q,
                    "aria-pressed": n,
                    "aria-disabled": n || P,
                    className: G("h-8 rounded-full px-4 text-sm font-medium transition-colors", n ? "bg-token-bg-primary text-token-text-primary" : "text-token-text-secondary", !n && !P && "hover:text-token-text-primary", P && "text-token-text-quaternary cursor-not-allowed"),
                    onClick: () => {
                        P || n || M()
                    },
                    onMouseEnter: D,
                    children: q
                })]
            })
        }), e[26] = ge, e[27] = A, e[28] = d, e[29] = P, e[30] = n, e[31] = F, e[32] = N, e[33] = M, e[34] = D, e[35] = q, e[36] = Y, e[37] = he, e[38] = Z) : Z = e[38];
        let i;
        e[39] !== b || e[40] !== c || e[41] !== t || e[42] !== l || e[43] !== x || e[44] !== me || e[45] !== ie || e[46] !== P || e[47] !== z || e[48] !== ne || e[49] !== K || e[50] !== E || e[51] !== o || e[52] !== $ || e[53] !== I || e[54] !== le || e[55] !== pe || e[56] !== se || e[57] !== te || e[58] !== oe ? (i = pe ? m.jsxs("div", {
            className: "flex items-center gap-0.5 justify-self-end",
            children: [se ? m.jsx(at, {
                isOpen: ie,
                hasErrorOutput: me,
                isDisabled: P,
                onClick: $
            }) : null, te ? m.jsx(et, {
                code: t,
                messageId: o,
                clientThreadId: c,
                disabled: K
            }) : null, oe ? m.jsx(nt, {
                onClick: I,
                disabled: z,
                kind: le
            }) : null, ne ? m.jsx(ot, {
                clientThreadId: c,
                messageId: o,
                codeIndex: l,
                flushSave: x,
                language: E
            }) : null, b]
        }) : m.jsx("div", {}), e[39] = b, e[40] = c, e[41] = t, e[42] = l, e[43] = x, e[44] = me, e[45] = ie, e[46] = P, e[47] = z, e[48] = ne, e[49] = K, e[50] = E, e[51] = o, e[52] = $, e[53] = I, e[54] = le, e[55] = pe, e[56] = se, e[57] = te, e[58] = oe, e[59] = i) : i = e[59];
        let S;
        return e[60] !== X || e[61] !== Z || e[62] !== i ? (S = m.jsx("div", {
            className: "sticky top-0 z-1 select-none",
            children: m.jsxs("div", {
                className: "grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2 py-1.5 pe-1.5 font-sans",
                children: [X, Z, i]
            })
        }), e[60] = X, e[61] = Z, e[62] = i, e[63] = S) : S = e[63], S
    };

function ct() {
    return Te()
}
const dt = /^\uFEFF?\s*(?:<\?xml\b[\s\S]*?\?>\s*)?(?:<!doctype\s+svg\b[^>]*>\s*)?<svg\b/i;

function Se(r) {
    return dt.test(r)
}

function Tt({
    svgMarkup: r
}) {
    const e = encodeURIComponent(r);
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: transparent;
      }

      #diagram {
        width: 100%;
        height: 100%;
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
        box-sizing: border-box;
      }

      #diagram > img {
        display: block;
        max-width: 100%;
        max-height: 100%;
      }

      pre {
        margin: 0;
        padding: 16px;
        white-space: pre-wrap;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div id="diagram"></div>
    <script>
      (() => {
        const container = document.getElementById("diagram");
        if (!container) return;

        const showError = (message) => {
          container.innerHTML = "<pre>" + message + "</pre>";
        };

        let svgSource;
        try {
          svgSource = decodeURIComponent(${JSON.stringify(e)});
        } catch (error) {
          showError("Invalid SVG source.");
          console.error(error);
          return;
        }

        const template = document.createElement("template");
        template.innerHTML = svgSource;

        const healedSVG = template.innerHTML
          .replace(/\\s*<!-{4,}>\\s*(?=(?:<\\/[a-zA-Z][^>]*>\\s*)*$)/g, "")
          .replace(/\\s*&lt;\\s*(?=(?:<\\/[a-zA-Z][^>]*>\\s*)*$)/g, "");

        if (!healedSVG.trim()) {
          showError("Invalid SVG source.");
          return;
        }

        const image = document.createElement("img");
        image.alt = "SVG preview";
        image.src =
          "data:image/svg+xml;utf8," + encodeURIComponent(healedSVG);

        container.innerHTML = "";
        container.appendChild(image);
      })();
    <\/script>
  </body>
</html>`
}
const ut = /\bexport\s+default\b/,
    ft = /<html(?:\s|>)/i,
    mt = /["']\$schema["']\s*:\s*["']https:\/\/vega\.github\.io\/schema\/vega\/v\d+(?:\.\d+)?\.json["']/i,
    pt = /["']\$schema["']\s*:\s*["']https:\/\/vega\.github\.io\/schema\/vega-lite\/v\d+(?:\.\d+)?\.json["']/i;

function gt(r) {
    return r.includes("'react'") || r.includes('"react"')
}

function Le(r) {
    return ut.test(r)
}

function ht(r) {
    return ft.test(r)
}

function bt(r) {
    return pt.test(r) ? "vega-lite" : mt.test(r) ? "vega" : null
}

function Bt(r, e, t, o) {
    if (!t.previewEnabled || !t.fullScreenEnabled) return null;
    if (o != null) return o;
    switch (r) {
        case "html":
            return Se(e) ? "svg" : "html";
        case "xml":
            return Se(e) ? "svg" : null;
        case "svg":
            return "svg";
        case "vega":
            return "vega";
        case "vega-lite":
        case "vegalite":
            return "vega-lite";
        case "json":
            return bt(e);
        case "mermaid":
            return "mermaid";
        case "threejs":
            return "threejs";
        case "recharts":
            return "recharts";
        case "react":
            return Le(e) ? "react" : null;
        case "javascript":
        case "typescript":
            return gt(e) && Le(e) ? "react" : null;
        case void 0:
            return Se(e) ? "svg" : null;
        default:
            return null
    }
}

function _t(r, e) {
    return !e.fullScreenEnabled || !e.pythonExecutionEnabled ? null : r === "python" ? "python" : null
}

function Lt(r, e) {
    return r === "react" ? !0 : r === "html" ? ht(e) : !1
}
const Ee = .33,
    vt = 200,
    xt = 200,
    Ie = 8;

function Ct(r, e) {
    if (e <= 0 || !Number.isFinite(r)) return Ee;
    const t = Math.min(.8, vt / e),
        o = Math.max(t, 1 - xt / e);
    return Math.min(o, Math.max(t, r))
}

function wt(r) {
    "use forget";
    const e = ee.c(11);
    R.useRef(!1);
    let t;
    e[0] !== r ? (t = R.Children.count(r), e[0] = r, e[1] = t) : t = e[1];
    const o = t;
    let c, l;
    e[2] !== r ? (c = null, l = null, R.Children.forEach(r, (a, h) => {
        if (h === 0) {
            c = a;
            return
        }
        h === 1 && (l = a)
    }), e[2] = r, e[3] = c, e[4] = l) : (c = e[3], l = e[4]);
    let p, n;
    e[5] !== o ? (p = () => {}, n = [o], e[5] = o, e[6] = p, e[7] = n) : (p = e[6], n = e[7]), R.useEffect(p, n);
    let s;
    return e[8] !== c || e[9] !== l ? (s = [c, l], e[8] = c, e[9] = l, e[10] = s) : s = e[10], s
}
const It = r => {
    "use forget";
    const e = ee.c(67),
        {
            isActive: t,
            isLeftPaneVisible: o,
            isRightPaneVisible: c,
            ref: l,
            children: p,
            onRightPaneAnimationComplete: n
        } = r,
        s = o === void 0 ? !0 : o,
        a = c === void 0 ? !0 : c,
        h = R.useRef(null),
        u = R.useRef(null),
        v = R.useRef(null),
        f = R.useRef(null),
        g = R.useRef(Ee),
        y = R.useRef(0),
        k = R.useRef(null),
        C = R.useRef(null),
        w = R.useRef(null),
        x = R.useRef(null),
        [E, b] = R.useState(Ee),
        [d, T] = R.useState(!1),
        M = Ce(yt),
        [I, D] = wt(p);
    let $;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? ($ = () => {
        const i = document.body.style;
        w.current != null && (i.cursor = w.current, w.current = null), x.current != null && (i.userSelect = x.current, x.current = null)
    }, e[0] = $) : $ = e[0];
    const N = Q($);
    let H;
    e[1] === Symbol.for("react.memo_cache_sentinel") ? (H = i => {
        const S = h.current ? .getBoundingClientRect().width;
        if (S == null || S <= 0) return g.current;
        const j = Ct(i, S);
        return g.current = j, u.current ? .style.setProperty("flex-basis", `${j*100}%`), j
    }, e[1] = H) : H = e[1];
    const B = Q(H);
    let O;
    e[2] !== B ? (O = i => {
        const S = h.current ? .getBoundingClientRect();
        if (S == null || S.width <= 0) return g.current;
        const ke = (i - y.current - S.left) / Math.max(S.width, 1);
        return B(ke)
    }, e[2] = B, e[3] = O) : O = e[3];
    const K = Q(O);
    let V;
    e[4] !== K ? (V = () => {
        C.current != null && (window.cancelAnimationFrame(C.current), C.current = null);
        const i = k.current;
        return k.current = null, i == null ? g.current : K(i)
    }, e[4] = K, e[5] = V) : V = e[5];
    const P = Q(V);
    let re;
    e[6] !== P ? (re = i => {
        k.current = i, C.current == null && (C.current = window.requestAnimationFrame(() => {
            C.current = null, P()
        }))
    }, e[6] = P, e[7] = re) : re = e[7];
    const z = Q(re);
    let le;
    e[8] !== P || e[9] !== N ? (le = () => {
        const i = f.current,
            S = v.current;
        i != null && S ? .hasPointerCapture(i) && S.releasePointerCapture(i), f.current = null;
        const j = P();
        b(j), y.current = 0, N(), T(!1)
    }, e[8] = P, e[9] = N, e[10] = le) : le = e[10];
    const L = Q(le);
    let ie;
    e[11] !== z ? (ie = i => {
        if (i.pointerType === "mouse" && i.button !== 0) return;
        i.preventDefault();
        const S = document.body.style;
        w.current == null && (w.current = S.cursor), x.current == null && (x.current = S.userSelect), S.cursor = "col-resize", S.userSelect = "none", f.current = i.pointerId, v.current = i.currentTarget, i.currentTarget.setPointerCapture(i.pointerId);
        const j = h.current ? .getBoundingClientRect();
        if (j == null || j.width <= 0) y.current = 0;
        else {
            const ke = j.left + g.current * j.width;
            y.current = i.clientX - ke
        }
        T(!0), z(i.clientX)
    }, e[11] = z, e[12] = ie) : ie = e[12];
    const me = Q(ie);
    let te;
    e[13] !== B ? (te = () => {
        const i = B(Ee);
        b(i)
    }, e[13] = B, e[14] = te) : te = e[14];
    const Y = Q(te);
    let ne, A;
    e[15] !== d || e[16] !== z || e[17] !== L ? (ne = () => {
        if (!d) return;
        const i = j => {
                j.pointerId === f.current && z(j.clientX)
            },
            S = j => {
                j.pointerId === f.current && (z(j.clientX), L())
            };
        return document.addEventListener("pointermove", i, {
            passive: !0
        }), document.addEventListener("pointerup", S), document.addEventListener("pointercancel", S), window.addEventListener("blur", L), () => {
            document.removeEventListener("pointermove", i), document.removeEventListener("pointerup", S), document.removeEventListener("pointercancel", S), window.removeEventListener("blur", L)
        }
    }, A = [d, z, L], e[15] = d, e[16] = z, e[17] = L, e[18] = ne, e[19] = A) : (ne = e[18], A = e[19]), R.useEffect(ne, A);
    let ae, _;
    e[20] !== B || e[21] !== t || e[22] !== L ? (ae = () => {
        if (!t) {
            L();
            return
        }
        const i = () => {
            const S = B(g.current);
            b(S)
        };
        return i(), window.addEventListener("resize", i), () => {
            window.removeEventListener("resize", i)
        }
    }, _ = [B, t, L], e[20] = B, e[21] = t, e[22] = L, e[23] = ae, e[24] = _) : (ae = e[23], _ = e[24]), R.useEffect(ae, _);
    let F, se;
    e[25] !== L ? (F = () => () => {
        L()
    }, se = [L], e[25] = L, e[26] = F, e[27] = se) : (F = e[26], se = e[27]), R.useEffect(F, se);
    const oe = Ce(Te),
        pe = t || oe ? s || a : s,
        ce = t && s || a,
        ge = Math.max(1 - E, 1e-4),
        ve = Ie / ge,
        xe = `${1/E*100}%`,
        de = `calc(${100/ge}% + ${ve}px)`,
        ye = `calc(-${E*100}% - ${Ie}px)`;
    let q;
    e[28] !== l ? (q = i => {
        h.current = i, l != null && (l.current = i)
    }, e[28] = l, e[29] = q) : q = e[29];
    const ue = t && "flex min-h-0 flex-1 items-stretch overflow-hidden pb-4",
        he = !t && "relative",
        fe = d && "select-none";
    let J;
    e[30] !== ue || e[31] !== he || e[32] !== fe ? (J = G(ue, he, fe), e[30] = ue, e[31] = he, e[32] = fe, e[33] = J) : J = e[33];
    let W;
    e[34] !== E || e[35] !== t || e[36] !== s || e[37] !== a || e[38] !== I || e[39] !== xe || e[40] !== M || e[41] !== pe ? (W = pe && m.jsx("div", {
        ref: u,
        className: G("h-full min-h-0 min-w-0", t && "shrink-0"),
        style: t ? {
            flexBasis: `${E*100}%`
        } : void 0,
        children: m.jsx(Be.div, {
            initial: !1,
            animate: t ? {
                x: s ? "0" : "-100%",
                width: a ? "100%" : xe
            } : {
                x: "0",
                width: "100%"
            },
            transition: {
                duration: t && !M ? .22 : 0,
                ease: "easeInOut"
            },
            className: "h-full min-h-0 min-w-0",
            children: I
        })
    }), e[34] = E, e[35] = t, e[36] = s, e[37] = a, e[38] = I, e[39] = xe, e[40] = M, e[41] = pe, e[42] = W) : W = e[42];
    let U;
    e[43] !== t || e[44] !== d || e[45] !== oe || e[46] !== M || e[47] !== Y || e[48] !== me || e[49] !== L ? (U = t && m.jsx("div", {
        ref: v,
        role: "separator",
        "aria-orientation": "vertical",
        className: G("bg-token-text-tertiary z-10 w-2 shrink-0 origin-center transform-gpu cursor-ew-resize opacity-0 transition-[transform,opacity]", M ? "duration-0" : "duration-220", d && "scale-x-[0.5] opacity-75", !oe && "pointer-events-none invisible"),
        onPointerDown: me,
        onLostPointerCapture: L,
        onDoubleClick: Y
    }), e[43] = t, e[44] = d, e[45] = oe, e[46] = M, e[47] = Y, e[48] = me, e[49] = L, e[50] = U) : U = e[50];
    let X;
    e[51] !== t || e[52] !== s || e[53] !== a || e[54] !== n || e[55] !== M || e[56] !== D || e[57] !== ye || e[58] !== de || e[59] !== ce ? (X = ce && m.jsx("div", {
        className: G(t && "h-full min-h-0 min-w-0 flex-1"),
        children: m.jsx(Be.div, {
            initial: !1,
            className: G(t && "h-full min-h-0 min-w-0"),
            animate: t ? {
                width: s ? "100%" : de,
                x: a ? s ? "0" : ye : "100%"
            } : {
                x: "0",
                width: "100%"
            },
            transition: {
                duration: t && !M ? .22 : 0,
                ease: "easeInOut"
            },
            onAnimationComplete: () => {
                t && !a && n ? .()
            },
            children: D
        })
    }), e[51] = t, e[52] = s, e[53] = a, e[54] = n, e[55] = M, e[56] = D, e[57] = ye, e[58] = de, e[59] = ce, e[60] = X) : X = e[60];
    let Z;
    return e[61] !== q || e[62] !== J || e[63] !== W || e[64] !== U || e[65] !== X ? (Z = m.jsxs("div", {
        ref: q,
        className: J,
        children: [W, U, X]
    }), e[61] = q, e[62] = J, e[63] = W, e[64] = U, e[65] = X, e[66] = Z) : Z = e[66], Z
};

function yt() {
    return Xe()
}
export {
    Mt as C, It as a, Rt as b, Tt as c, nt as d, et as e, _t as f, Bt as g, Se as h, Lt as i
};
//# sourceMappingURL=9e6b8179-eyitb5m4jk5hlrbu.js.map