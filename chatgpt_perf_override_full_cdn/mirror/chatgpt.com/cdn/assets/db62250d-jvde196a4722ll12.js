import {
    r as i,
    j as y,
    f as A,
    c as j
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    jD as D,
    jE as I,
    jF as R,
    jG as T,
    jH as h,
    jI as C,
    jJ as E,
    jK as p
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    k7 as B,
    mc as k,
    kq as P,
    d2 as w,
    cO as _,
    cM as F,
    dS as b
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    T as S
} from "./089c718c-l3mqz3tt2i5t2xnq.js";

function U(e) {
    const {
        bufferType: t,
        isActivelyStreaming: r,
        messages: c,
        parts: u,
        ...g
    } = e, a = c[c.length - 1].id, o = i.useMemo(() => c.some(n => n.metadata ? .mercury_message), [c]), [l, m] = i.useState(D(u)), s = i.useRef(void 0), d = B(), {
        showPerformanceOverlay: M
    } = k();
    i.useEffect(() => {
        if (!(!M || t !== "Adaptive" || !r)) return P.setActiveStreamingMessageId(a), () => P.setActiveStreamingMessageId(null)
    }, [M, t, r, a]);
    const f = i.useMemo(() => d ? u.flatMap(n => {
        if (typeof n == "string") return n;
        if (n.content_type === "audio_transcription") return n.text
    }).filter(n => n !== void 0) : u, [u, d]);
    if (s.current === void 0) switch (t) {
        case "Adaptive":
            o ? s.current = new T(f, m, r, void 0, {
                minRate: .4,
                expectedDisplayInterval: .05,
                maxTokensPerStep: 7,
                messageId: a
            }) : s.current = new T(f, m, r, void 0, {
                messageId: a
            });
            break;
        case "ChunkedCatchup":
            s.current = new R(f, m, r);
            break;
        case "Punctuation":
            s.current = new I(f, m, r);
            break
    }
    return i.useEffect(() => {
        s.current != null && (s.current.onMessagePartsUpdated(f, r), s.current.isBuffering() && h.addDelayedRenderingMessage(a))
    }, [f, a, r]), i.useEffect(() => {
        s.current != null && s.current.removeDelayedRender() && h.removeDelayedRenderingMessage(a)
    }, [l, a]), i.useEffect(() => () => h.removeDelayedRenderingMessage(a), [a]), i.useEffect(() => () => {
        s.current ? .destroy(), s.current = void 0
    }, []), y.jsx(S, { ...g,
        messages: c,
        parts: u,
        displayParts: l,
        isActivelyStreaming: r || !!s.current ? .isBuffering()
    })
}

function L({
    message: e,
    isCompletionInProgress: t,
    hasActiveRequest: r,
    conversation: c,
    className: u,
    isUserTurn: g,
    isFinalUserTurn: a,
    isWithinFirstAssistantTurns: o,
    turnIndex: l,
    isFeedbackEnabled: m,
    prevGroupedMessageType: s,
    prevGroupedMessages: d,
    citableMessages: M,
    superWidgetContent: f,
    currentReasoningType: n,
    isTurnStartMessage: x
}) {
    const v = i.useMemo(() => "parts" in e.content ? e.content.parts : [w(e)], [e]);
    return y.jsxs(y.Fragment, {
        children: [y.jsx(q, {
            parts: v,
            messages: [e],
            hasActiveRequest: r,
            isCompletionInProgress: t,
            className: u,
            citations: e.metadata ? .citations,
            contentReferences: e.metadata ? .content_references,
            attachments: e.metadata ? .attachments,
            isUserTurn: g,
            isFinalUserTurn: a,
            isWithinFirstAssistantTurns: o,
            turnIndex: l,
            id: e.id,
            isFeedbackEnabled: m,
            conversation: c,
            prevGroupedMessageType: s,
            prevGroupedMessages: d,
            citableMessages: M,
            superWidgetContent: f,
            currentReasoningType: n,
            isTurnStartMessage: x
        }), !1]
    })
}
const K = A.memo(L);

function q(e) {
    "use forget";
    const t = j.c(8),
        r = e.messages.length > 1,
        c = _.isLastActorMessage(F(e.conversation.id), e.messages[0].id),
        u = b(e.conversation.id, W),
        {
            bufferType: g,
            wordFadeType: a
        } = C(),
        o = r ? void 0 : E(e.messages[0], c, e.isCompletionInProgress || e.hasActiveRequest, u),
        l = e.messages[e.messages.length - 1],
        m = l ? .metadata ? .chime_version && l ? .status === "finished_successfully",
        s = o ? .flagSeverity !== "danger" && e.isCompletionInProgress && !m;
    let d;
    t[0] !== e.parts ? (d = e.parts.some(O), t[0] = e.parts, t[1] = d) : d = t[1];
    const M = !d,
        n = !o && !(a === "indexed" || a === "instant") && g !== "none" && !e.isUserTurn && (e.isCompletionInProgress || M),
        [x] = i.useState(n);
    let v;
    return t[2] !== g || t[3] !== o || t[4] !== s || t[5] !== e || t[6] !== x ? (v = x ? y.jsx(U, { ...e,
        bufferType: g,
        isActivelyStreaming: s,
        errorState: o
    }) : y.jsx(S, { ...e,
        displayParts: p({
            isUserTurn: e.isUserTurn,
            parts: e.parts
        }),
        isActivelyStreaming: s,
        errorState: o
    }), t[2] = g, t[3] = o, t[4] = s, t[5] = e, t[6] = x, t[7] = v) : v = t[7], v
}

function O(e) {
    return e !== ""
}

function W(e) {
    return !!e ? .sharedConversationMetadata
}
export {
    q as T, K as a
};
//# sourceMappingURL=db62250d-jvde196a4722ll12.js.map