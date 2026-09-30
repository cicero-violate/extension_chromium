import {
    c as D,
    j as n,
    r as C,
    u as U
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    e as B,
    be as q,
    bN as Y,
    AU as J,
    aP as X,
    a0 as Z
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    l$ as ee,
    m3 as te,
    m1 as se,
    fG as z,
    eD as re,
    eE as ne,
    m0 as ae,
    dK as oe,
    ph as G,
    pi as y,
    pj as le,
    pk as ce,
    eC as g,
    pl as ie,
    eF as W,
    br as ue
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    T as K
} from "./5373c7f8-h4l09ncnnop7wabg.js";
const de = s => {
    "use forget";
    const e = D.c(9),
        {
            cardId: o
        } = s;
    let c;
    e[0] !== o ? (c = () => se().find(v => v.id === o), e[0] = o, e[1] = c) : c = e[1];
    const t = B(c),
        a = B(fe),
        {
            data: l
        } = ee(t ? null : o),
        i = t ? ? l;
    if (!i && !a) return null;
    const h = i ? .conversation_id ? i.conversation_id : a || void 0;
    if (!h) return null;
    let m;
    e[2] !== h ? (m = q(h), e[2] = h, e[3] = m) : m = e[3];
    const d = m;
    let u;
    e[4] !== d ? (u = n.jsx(K, {
        conversation: d,
        className: "min-h-0! flex-1",
        hideDisclaimer: !0
    }), e[4] = d, e[5] = u) : u = e[5];
    let p;
    return e[6] !== d || e[7] !== u ? (p = n.jsx(z, {
        conversation: d,
        ignoreParentComposerController: !0,
        threadContent: u
    }), e[6] = d, e[7] = u, e[8] = p) : p = e[8], p
};

function fe() {
    return te()
}
const me = () => {
    "use forget";
    const s = D.c(10),
        e = B(pe);
    let o, c;
    if (s[0] !== e ? (o = () => {
            ne().logEventWithStatsig("(Web) FYP Feedback Conversation Shown", "chatgpt_web_fyp_feedback_conversation_shown", {
                feedback_conversation_id: e
            })
        }, c = [e], s[0] = e, s[1] = o, s[2] = c) : (o = s[1], c = s[2]), C.useEffect(o, c), !e) return null;
    let t;
    s[3] !== e ? (t = q(e), s[3] = e, s[4] = t) : t = s[4];
    const a = t;
    let l;
    s[5] !== a ? (l = n.jsx(K, {
        conversation: a,
        className: "min-h-0! flex-1",
        hideDisclaimer: !0,
        withCustomCompletionParams: be
    }), s[5] = a, s[6] = l) : l = s[6];
    let i;
    return s[7] !== a || s[8] !== l ? (i = n.jsx(z, {
        conversation: a,
        shouldScrollToBottom: !0,
        threadContent: l
    }), s[7] = a, s[8] = l, s[9] = i) : i = s[9], i
};

function pe() {
    return re()
}

function be(s) {
    return { ...s,
        extraStreamParams: { ...s.extraStreamParams,
            pulseCompletionParams: { ...s.extraStreamParams ? .pulseCompletionParams,
                type : "feedback-conversation"
            }
        }
    }
}

function we(s) {
    "use forget";
    const e = D.c(43),
        {
            type: o
        } = s,
        c = o === void 0 ? "sidebar" : o,
        t = B(he),
        {
            closeView: a
        } = ae(),
        l = U(),
        i = C.useRef(null),
        h = C.useRef(null),
        m = C.useRef(null),
        d = C.useRef(!1),
        {
            resetSidebarHistory: u
        } = oe(),
        p = G.useStore();
    let v;
    e[0] !== t ? (v = r => ie({
        viewState: t,
        history: r.history,
        historyIndex: r.historyIndex
    }), e[0] = t, e[1] = v) : v = e[1];
    const k = G.useState(v),
        H = k != null;
    let j;
    e[2] !== k || e[3] !== p || e[4] !== t ? .source ? (j = () => {
        if (k != null) {
            if (k.kind === "card") {
                g().openCardView(k.cardId, {
                    source: t ? .source
                });
                return
            }
            p.setActiveIndex(k.historyIndex), g().openFeedbackView({
                type: W.Preview
            }, {
                source: t ? .source
            })
        }
    }, e[2] = k, e[3] = p, e[4] = t ? .source, e[5] = j) : j = e[5];
    const A = j;
    let E;
    e[6] !== a || e[7] !== u || e[8] !== t ? .type ? (E = () => {
        const r = m.current;
        m.current = null, u(), t ? .type === y.Card ? a() : t ? .type === y.Feedback && g().closeFeedbackView(), r ? .isConnected && requestAnimationFrame(() => {
            r.focus({
                preventScroll: !0
            })
        })
    }, e[6] = a, e[7] = u, e[8] = t ? .type, e[9] = E) : E = e[9];
    const f = E,
        M = C.useRef(null);
    let T, I;
    e[10] !== t ? (T = () => {
        const r = t != null;
        if (r && !d.current) {
            const b = document.activeElement;
            m.current = b instanceof HTMLElement ? b : null
        }
        d.current = r
    }, I = [t], e[10] = t, e[11] = T, e[12] = I) : (T = e[11], I = e[12]), C.useEffect(T, I);
    let _, R;
    e[13] !== t ? (_ = () => {
        const r = Y(Ce);
        if (!(t ? .type === y.Card || t ? .type === y.Feedback && t.feedbackState.type === W.Preview)) {
            M.current = null;
            return
        }
        if (M.current === r) return;
        M.current = r;
        const Q = requestAnimationFrame(() => {
            h.current ? .focus({
                preventScroll: !0
            })
        });
        return () => {
            cancelAnimationFrame(Q)
        }
    }, R = [t], e[13] = t, e[14] = _, e[15] = R) : (_ = e[14], R = e[15]), C.useEffect(_, R);
    let V;
    e[16] !== t ? (V = t ? .type === y.Card ? n.jsx(de, {
        cardId: t.cardId
    }) : t ? .type === y.Feedback ? n.jsx(me, {}) : null, e[16] = t, e[17] = V) : V = e[17];
    const O = V;
    let $;
    e[18] !== t ? ($ = t ? .type === y.Feedback ? n.jsx(le, {
        feedbackState: t.feedbackState,
        className: "backdrop-blur-xl backdrop-filter"
    }) : t ? .type === y.Card ? n.jsx(ce, {
        className: "backdrop-blur-xl backdrop-filter"
    }) : null, e[18] = t, e[19] = $) : $ = e[19];
    const L = $;
    let x;
    e[20] !== H || e[21] !== A ? (x = H && n.jsx(J, {
        onClick: A,
        className: "pointer-events-auto"
    }), e[20] = H, e[21] = A, e[22] = x) : x = e[22];
    let S;
    e[23] !== f ? (S = n.jsx(X, {
        ref: h,
        className: "backdrop-blur-xl backdrop-filter",
        onClick: f
    }), e[23] = f, e[24] = S) : S = e[24];
    let w;
    e[25] !== L || e[26] !== S ? (w = n.jsxs("div", {
        className: "pointer-events-auto ms-auto flex items-center gap-1",
        children: [L, S]
    }), e[25] = L, e[26] = S, e[27] = w) : w = e[27];
    let P;
    e[28] !== x || e[29] !== w ? (P = n.jsxs("div", {
        className: "sticky top-0 z-50 flex items-center p-2",
        children: [x, w]
    }), e[28] = x, e[29] = w, e[30] = P) : P = e[30];
    let N;
    e[31] !== O || e[32] !== P ? (N = n.jsxs("div", {
        className: "relative flex h-full flex-col overflow-auto",
        children: [P, O]
    }), e[31] = O, e[32] = P, e[33] = N) : N = e[33];
    const F = N;
    switch (c) {
        case "sidebar":
            {
                let r;e[34] !== l ? (r = l.formatMessage({
                    id: "pulse.sidebar.title",
                    defaultMessage: "Pulse"
                }), e[34] = l, e[35] = r) : r = e[35];
                let b;
                return e[36] !== F || e[37] !== f || e[38] !== r ? (b = n.jsx(ue, {
                    handleClose: f,
                    renderLeading: ye,
                    ariaLabel: r,
                    scrollMode: "content-only",
                    children: F
                }, "pulse-sidebar"), e[36] = F, e[37] = f, e[38] = r, e[39] = b) : b = e[39],
                b
            }
        case "modal":
            {
                let r;
                return e[40] !== F || e[41] !== f ? (r = n.jsx(Z, {
                    testId: "modal-chat-screen-pulse-flyout",
                    className: "relative max-w-[500px]",
                    size: "custom",
                    type: "success",
                    position: "end",
                    noPadding: !0,
                    contentRef: i,
                    visuallyHiddenHeader: !0,
                    showCloseButton: !0,
                    isOpen: !0,
                    onClose: f,
                    children: F
                }, "pulse-modal"), e[40] = F, e[41] = f, e[42] = r) : r = e[42],
                r
            }
    }
}

function ye() {
    return null
}

function Ce() {
    return g().sidebarEntryFocusToken$()
}

function he() {
    return g().viewState$()
}
export {
    we as P
};
//# sourceMappingURL=de6c4a91-ewa7my738fxqmse2.js.map