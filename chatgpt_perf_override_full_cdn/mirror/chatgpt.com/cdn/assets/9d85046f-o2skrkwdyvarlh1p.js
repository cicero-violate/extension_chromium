const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/ba54e42c-hyypfbbveuv646kj.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/14046b31-lecgrug5j18e0bi8.js", "assets/1bc04b52-c6spp0aq3f71sxih.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/c93e007a-ky1a854e4spuc4at.js", "assets/dced7e81-hb3uflr74s09v6gi.js", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/conversation-small-cqp6votf.css", "assets/31cec8d8-j4linhdlo3s8o8v8.js", "assets/1bc04b52-nn3a79pgrrxatkgx.js", "assets/1bc04b52-kbv7syek90tbvv85.js", "assets/index-ivzj8m6u.css", "assets/6cb574fa-ewz4lvzvh0154hdn.js", "assets/a4ef304b-bcc1699tskmhgi50.js", "assets/8ad92f11-dff614f59ztoslhd.js", "assets/code-block-editor-fp5rpeal.css"]))) => i.map(i => d[i]);
import {
    c as Z,
    u as q,
    r as V,
    j as r,
    _ as te
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    af as Q,
    hi as oe,
    e as se,
    aO as ie,
    cc as ne,
    b5 as le,
    sV as ae,
    ch as ce
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    bJ as re,
    nZ as de
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    C as fe
} from "./7d7b57e4-fft59e56sdckq2uk.js";
import "./6cb574fa-ewz4lvzvh0154hdn.js";
import "./a4ef304b-bcc1699tskmhgi50.js";
import "./1bc04b52-nn3a79pgrrxatkgx.js";
import "./1bc04b52-c6spp0aq3f71sxih.js";
import "./31cec8d8-j4linhdlo3s8o8v8.js";
import "./8ad92f11-dff614f59ztoslhd.js";
import "./22724723-hcq7pr9e9rdzi53r.js";
const ue = "shadow-[0_8px_12px_0_rgba(0,0,0,0.16),0_0_1px_0_rgba(0,0,0,0.60)] dark:shadow-[0_8px_16px_0_rgba(0,0,0,0.40),inset_0_0_1px_0_rgba(255,255,255,0.25),0_0_1px_0_rgba(0,0,0,0.60)]",
    me = M => {
        "use forget";
        const e = Z.c(21),
            {
                onAccept: i,
                onUndo: n
            } = M,
            l = q();
        let a;
        e[0] !== l ? (a = l.formatMessage({
            id: "codeBlock.magicEdit.diff.accept",
            defaultMessage: "Accept"
        }), e[0] = l, e[1] = a) : a = e[1];
        const t = a;
        let u;
        e[2] !== l ? (u = l.formatMessage({
            id: "codeBlock.magicEdit.diff.undo",
            defaultMessage: "Undo"
        }), e[2] = l, e[3] = u) : u = e[3];
        const o = u;
        let b, _;
        e[4] !== i || e[5] !== n ? (b = () => {
            const h = s => {
                if ((s.metaKey || s.ctrlKey) && !s.shiftKey && !s.altKey && s.key === "Enter") {
                    s.preventDefault(), s.stopPropagation(), i();
                    return
                }(s.key === "Escape" || s.key === "Esc") && (s.preventDefault(), s.stopPropagation(), n())
            };
            return document.addEventListener("keydown", h, !0), () => {
                document.removeEventListener("keydown", h, !0)
            }
        }, _ = [i, n], e[4] = i, e[5] = n, e[6] = b, e[7] = _) : (b = e[6], _ = e[7]), V.useEffect(b, _);
        let m;
        e[8] === Symbol.for("react.memo_cache_sentinel") ? (m = Q("bg-token-main-surface-primary text-token-text-primary pointer-events-auto flex h-9 items-center gap-0.5 rounded-xl px-1 py-1.5", ue), e[8] = m) : m = e[8];
        let g;
        e[9] === Symbol.for("react.memo_cache_sentinel") ? (g = r.jsx(re, {
            className: "h-4 w-4"
        }), e[9] = g) : g = e[9];
        let d;
        e[10] !== n || e[11] !== o ? (d = r.jsx("button", {
            type: "button",
            "aria-label": o,
            className: "dark:hover:bg-token-interactive-bg-secondary-hover focus-visible:outline-token-interactive-label-accent-default text-token-text-primary flex h-7 w-7 items-center justify-center rounded-lg hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2",
            onClick: n,
            children: g
        }), e[10] = n, e[11] = o, e[12] = d) : d = e[12];
        let p;
        e[13] === Symbol.for("react.memo_cache_sentinel") ? (p = r.jsx("div", {
            className: "bg-token-border-default h-4 w-px"
        }), e[13] = p) : p = e[13];
        let x;
        e[14] === Symbol.for("react.memo_cache_sentinel") ? (x = r.jsx(oe, {
            className: "h-4 w-4"
        }), e[14] = x) : x = e[14];
        let c;
        e[15] !== t || e[16] !== i ? (c = r.jsx("button", {
            type: "button",
            "aria-label": t,
            className: "focus-visible:outline-token-interactive-label-accent-default dark:hover:bg-token-interactive-bg-secondary-hover flex h-7 w-7 items-center justify-center rounded-lg text-[rgba(2,133,255,1)] hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2",
            onClick: i,
            children: x
        }), e[15] = t, e[16] = i, e[17] = c) : c = e[17];
        let f;
        return e[18] !== c || e[19] !== d ? (f = r.jsx("div", {
            className: "pointer-events-none sticky top-14 z-10 flex justify-end px-4",
            children: r.jsxs("div", {
                className: m,
                children: [d, p, c]
            })
        }), e[18] = c, e[19] = d, e[20] = f) : f = e[20], f
    },
    W = ce(() => te(() =>
        import ("./ba54e42c-hyypfbbveuv646kj.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])).then(M => M.CodeBlockEditor)),
    ge = 9 / 16,
    pe = 2,
    Me = M => {
        "use forget";
        const e = Z.c(50),
            {
                messageId: i,
                codeIndex: n,
                languageTag: l,
                latestEditedCode: a,
                isFullScreen: t,
                isReadOnly: u,
                isStreaming: o,
                isPreviewing: b,
                useFixedInlineHeight: _,
                onChange: m,
                onBlur: g,
                hasPendingMagicEditSuggestion: d,
                onUndoMagicEditSuggestion: p,
                onAcceptMagicEditSuggestion: x,
                pendingMagicEditTextdocDiff: c,
                editorRef: f,
                className: h
            } = M,
            s = _ === void 0 ? !1 : _,
            N = q(),
            X = V.useRef(null),
            Y = se(xe),
            D = !t && s,
            L = !D;
        let I;
        e[0] !== L ? (I = {
            disabled: L,
            track: "width"
        }, e[0] = L, e[1] = I) : I = e[1];
        const [J, O] = de(I), [T, ee] = V.useState(!1);
        let P;
        e[2] === Symbol.for("react.memo_cache_sentinel") ? (P = () => {
            ee(!1)
        }, e[2] = P) : P = e[2];
        const B = ie(P);
        let j;
        e[3] !== o ? (j = () => {
            if (!o) return;
            const A = X.current;
            A != null && (A.scrollTop = A.scrollHeight)
        }, e[3] = o, e[4] = j) : j = e[4];
        let H;
        e[5] !== o || e[6] !== a ? (H = [o, a], e[5] = o, e[6] = a, e[7] = H) : H = e[7], ne(j, H);
        const $ = D && J != null ? `${Math.round(J.width*ge)+pe}px` : void 0;
        let E;
        e[8] !== O ? (E = A => {
            X.current = A, O(A)
        }, e[8] = O, e[9] = E) : E = e[9];
        let y;
        e[10] !== T || e[11] !== t ? (y = t && T ? {
            x: "-100%"
        } : {
            x: 0
        }, e[10] = T, e[11] = t, e[12] = y) : y = e[12];
        const K = Y ? 0 : .22;
        let k;
        e[13] !== K ? (k = {
            duration: K,
            ease: "easeInOut"
        }, e[13] = K, e[14] = k) : k = e[14];
        const U = t && "flex h-full min-h-0 w-full flex-col overflow-y-auto",
            F = !t && b && "absolute inset-0 overflow-hidden",
            z = D && "w-full overflow-x-hidden overflow-y-auto",
            G = t && !b && "mx-auto w-full max-w-[1000px] grow";
        let v;
        e[15] !== h || e[16] !== U || e[17] !== F || e[18] !== z || e[19] !== G ? (v = Q(U, F, z, G, h), e[15] = h, e[16] = U, e[17] = F, e[18] = z, e[19] = G, e[20] = v) : v = e[20];
        let C;
        e[21] !== $ ? (C = {
            maxHeight: $
        }, e[21] = $, e[22] = C) : C = e[22];
        let w;
        e[23] !== d || e[24] !== t || e[25] !== x || e[26] !== p ? (w = t && d && r.jsx(me, {
            onUndo: p,
            onAccept: x
        }), e[23] = d, e[24] = t, e[25] = x, e[26] = p, e[27] = w) : w = e[27];
        let S;
        e[28] !== n || e[29] !== f || e[30] !== N || e[31] !== t || e[32] !== u || e[33] !== o || e[34] !== l || e[35] !== a || e[36] !== i || e[37] !== g || e[38] !== m || e[39] !== c ? (S = c != null ? r.jsx(W, {
            className: t ? "fullscreen" : void 0,
            id: `${i}:${n}:editor`,
            language: l,
            label: N.formatMessage({
                id: "code-block-editor-label",
                defaultMessage: "Edit code"
            }),
            hideLineNumbers: !0,
            ref: f,
            readonly: !0,
            code: c.contentAfter,
            textdocDiff: c
        }) : u ? r.jsx(fe, {
            code: a,
            language: l,
            isStreaming: o
        }) : r.jsx(W, {
            className: t ? "fullscreen" : void 0,
            id: `${i}:${n}:editor`,
            code: a,
            language: l,
            label: N.formatMessage({
                id: "code-block-editor-label",
                defaultMessage: "Edit code"
            }),
            onChange: m,
            onBlur: g,
            hideLineNumbers: !0,
            ref: f
        }), e[28] = n, e[29] = f, e[30] = N, e[31] = t, e[32] = u, e[33] = o, e[34] = l, e[35] = a, e[36] = i, e[37] = g, e[38] = m, e[39] = c, e[40] = S) : S = e[40];
        let R;
        return e[41] !== B || e[42] !== k || e[43] !== v || e[44] !== C || e[45] !== w || e[46] !== S || e[47] !== E || e[48] !== y ? (R = r.jsxs(le.div, {
            ref: E,
            initial: !1,
            animate: y,
            onAnimationComplete: B,
            transition: k,
            className: v,
            style: C,
            children: [w, S]
        }), e[41] = B, e[42] = k, e[43] = v, e[44] = C, e[45] = w, e[46] = S, e[47] = E, e[48] = y, e[49] = R) : R = e[49], R
    };

function xe() {
    return ae()
}
export {
    Me as CodeBlockEditorPane
};
//# sourceMappingURL=9d85046f-o2skrkwdyvarlh1p.js.map