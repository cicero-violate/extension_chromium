import {
    fi as is,
    g as J,
    cM as K,
    x as ns,
    c1 as be,
    bN as t,
    jE as os,
    dz as Y,
    ff as X,
    cO as E,
    df as Me,
    vB as Z,
    bb as ee,
    cN as se,
    vC as te,
    oE as F,
    vD as rs,
    mu as ae,
    vE as ds,
    L as ls,
    E as cs,
    vF as us,
    uj as ms,
    es as gs,
    nn as ps,
    cD as fs,
    e4 as Ts,
    d2 as hs,
    k as vs,
    D as Ee,
    da as Is,
    cH as k,
    dJ as ie,
    vG as ke,
    a as ys,
    N as Ss,
    vH as ne,
    cI as Cs,
    cQ as bs,
    vI as Ms,
    vJ as Es,
    dI as H,
    b8 as Ae
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    a9 as q,
    aa as ks,
    ab as qs,
    ac as oe,
    ad as qe,
    ae as As,
    af as Rs,
    ag as _s,
    ah as re,
    ai as de,
    aj as Ps,
    ak as ws,
    al as Ns,
    am as Fs,
    an as le,
    ao as Hs,
    ap as Os,
    aq as Ds,
    ar as Ls,
    as as $s,
    at as Vs,
    au as xs,
    av as Bs,
    aw as Ws,
    ax as js,
    ay as Gs
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    C as ce
} from "./b9ebfa06-dm8xq0zfweyjlyrr.js";
import {
    v as Us
} from "./2340486e-dvd8m80i7d6hyild.js";
async function it(e, r = js()) {
    const {
        conversation: s,
        completionType: m = is.Next,
        sourceEvent: i,
        eventSource: d,
        completionMetadata: n,
        asyncTaskId: l,
        extraStreamParams: I,
        parentMessageId: f,
        promptMessage: c,
        existingMessages: T,
        prependMessages: C,
        appendMessages: y,
        profiler: g,
        skipNotification: h,
        disablePlaceholder: b,
        isReasoningSkipped: v,
        parentMessageIdPromise: M,
        callbacks: Re,
        firstInputTimestampMs: _e,
        callsiteId: Pe,
        requestedModelId: we,
        thinkingEffort: Ne
    } = e;
    let ue = we,
        me = Ne,
        A = C;
    q.set(s, !0);
    const O = J(),
        D = i ? .timeStamp ? ? performance.now(),
        Fe = d ? ? (i ? ks(i) : "mouse"),
        He = ne(),
        R = `request-${s.id}-${He}`,
        u = K(s.id),
        ge = qs(s),
        pe = ge ? ? Us();
    ge || oe(s, pe);
    const {
        conduitToken: L = null,
        prepareState: Oe = "none",
        firstPrepareTimestamp: De = null,
        lastPrepareTimestamp: Le = null,
        prepareRequestCount: $e = 0,
        hasSuccessfulPrepareSinceLastRequestReset: Ve = !1
    } = u ? ? {}, fe = ns("3360722522");
    n ? .systemHints ? .includes(be.PictureV2) && (fe.get("use_default_model") && (ue = t(() => os(s).id)), fe.get("use_standard_thinking_effort") && (me = "standard"));
    const _ = ue ? ? t(() => Y(s).id),
        xe = e.historyDisabled ? ? t(() => X()),
        $ = E.findNode(u, a => a.message.author.role === Me.Assistant || a.message.author.role === Me.Tool) == null,
        Be = u ? .continuingFromSharedConversationId != null,
        We = u ? .continuingFromSharedProjectConversationId != null,
        je = !!u ? .continuingFromSharedPostId,
        Ge = u ? .branchingFromConversationId != null,
        Ue = E.getConversationLastTurn(u) ? .messages.some(a => a.metadata ? .n7jupd_message),
        Te = f ? E.getNode(u, f) : T ? .[0] ? E.getParentNode(u, T[0].id) : E.getCurrentNode(u);
    let V = Te.message.id ? ? Te.id;
    qe.getState().isTakeoverInProgress && (qe.setState({
        isTakeoverInProgress: !1
    }), As(s.id), A = [...A ? ? [], Rs()]);
    const S = [...T ? ? [], ...A ? ? [], ...c ? [c] : [], ...y ? ? []],
        he = _s({
            messages: S,
            asyncTaskId: l,
            steeringAsyncTaskId: u ? .steeringAsyncTaskId
        }),
        x = t(() => Z(ee(s))),
        ze = se(s.id),
        p = te({
            clientRequestId: R,
            gizmoType: x,
            preflightTime: D,
            isTemporaryChat: xe,
            conversationId: ze ? ? void 0,
            turnTraceId: pe,
            firstInputTimestampMs: _e,
            onTurnLog: void 0
        });
    if (p.onUserMessages(S), x === F.PROJECT && $) {
        const a = n ? .systemHints;
        rs.set(s, a)
    }
    const Qe = e.historyDisabled ? ? t(() => ae()),
        Je = t(() => ds()),
        [Ke, Ye] = t(() => [re(s), de(s)]),
        Xe = ls.getItem(cs.ModelSlugStatsOverride),
        P = new ce(R, O, u, s, f, A, c, y, m, _, Fe, Qe, D, x === F.PROJECT, $, Be, Ge, We, p, h ? ? !1, Je, je, v, me, Xe, he, {
            disablePlaceholder: b ? ? !1,
            ...Re
        }, Ke, Ye);
    us(s.id), ms();
    const B = n ? .systemHints ? .includes(gs),
        Ze = ps(),
        es = B && !Ze,
        W = fs();
    if (W) {
        const a = !(n ? .systemHints === void 0 || n.systemHints.length === 0 || n.systemHints.length === 1 && n.systemHints.includes(be.Search)),
            w = (c ? .metadata ? .attachments ? .length ? ? 0) > 0,
            o = !!(c ? .metadata ? c.metadata[Ts] : void 0) ? .sources ? .length,
            ts = a || w || o;
        if (c) {
            const Se = hs(c, {
                shouldGetTextFromContentReferences: !1,
                shouldGetVisibleText: !0
            });
            if (Ps.getState().updateFromEvent(Se, ws(ts)), $) try {
                const as = vs("3205212221").get("optimistic_fetch", {}),
                    Q = Ce => {
                        const N = as[Ce];
                        typeof N != "number" || !isFinite(N) || N <= 0 || Math.random() < N && Ns(Se, Ce)
                    };
                Q("images"), Q("videos"), Q("news")
            } catch {}
        }
    }
    B && Ee.addAction("agent.conversation.start_attempted", {
        client_thread_id: String(s.id),
        model: _
    });
    const ve = Gs(he) ? void 0 : Fs(s.id, void 0, {
        clientInitiated: !0,
        reason: "new_completion",
        hasAgentSystemHint: B
    });
    if (Is.publish({
            kind: "requestCompletion"
        }), le(s.id, {
            source: ie.CLIENT,
            value: es ? k.REALTIME : k.STREAMING
        }, {
            path: "request_completion_start",
            requestId: R
        }), Hs.onCompletionRequestStarted(R), r.withSpan("completion.submit.request.update_before_request", a => P.updateBeforeRequest(a)), Os(s.id) ? .value === k.REALTIME && !!!(Ue && v) && ve) {
        const a = await p.awaitWrapper(ve, "abortCompletion");
        a ? .last_message_id && (V = a.last_message_id)
    }
    if (M) {
        const a = await p.awaitWrapper(M, "parentMessageId");
        a && (V = a)
    }
    const j = Ds(n),
        {
            chatReq: G,
            turnstileToken: Ie,
            proofToken: ye
        } = Ls(j) ? await r.withSpan("completion.submit.request.completion_integrity", () => p.awaitWrapper(j, "completionIntegrity")) : r.withSpan("completion.submit.request.completion_integrity", () => j);
    if (G.force_login) return;
    const ss = S[S.length - 1] ? .id ? ? null;
    if ($s(G, {
            conversationId: s.id,
            lastMessageId: ss,
            turnstileToken: Ie,
            proofToken: ye
        }), O.getQueriesData(ke()) == null && await r.withSpan("completion.submit.request.models_query", () => p.awaitWrapper(O.ensureQueryData(ke()), "modelsQuery")), Vs()) {
        const a = await r.withSpan("completion.submit.request.blocking_promises", () => p.awaitWrapper(xs(), "blockingPromises")),
            w = o => typeof o == "object" && o != null && "id" in o,
            z = a.flatMap(o => o.status !== "fulfilled" || !o.value ? [] : Array.isArray(o.value) ? o.value.filter(w) : w(o.value) ? [o.value] : []);
        if (z.length > 0) {
            const o = [...z].reverse();
            S.unshift(...o), zs({
                conversation: s,
                request: P,
                messages: o
            })
        }
    }
    p.onCompletionStarted(m, _), P.preflightTime = performance.now() - D;
    const U = Bs();
    Ee.addFeatureFlagEvaluation("fast_convo", U), U && Ws({
        firstPrepareTimestamp: De,
        lastPrepareTimestamp: Le,
        prepareRequestCount: $e,
        prepareState: Oe,
        hasSuccessfulPrepareSinceLastRequestReset: Ve,
        hasConduitToken: L != null,
        resolvedModelId: _,
        callsiteId: Pe
    }), U && W && ys.count(Ss.DEFAULT, "client_request_conduit_token", [{
        key: "has_conduit_token",
        value: L != null ? "true" : "false"
    }]), W && g ? .logTimingOnce("prompt_request_started"), await P.sendRequest({
        conduitToken: L,
        turnstileToken: Ie,
        proofToken: ye,
        completionMetadata: n,
        resolvedParentMessageId: V,
        messages: S,
        extraStreamParams: I,
        chatReq: G,
        profiler: g,
        spanContext: r
    })
}

function zs({
    conversation: e,
    request: r,
    messages: s
}) {
    Cs(e.id, m => {
        bs.updateTree(m, i => {
            const d = r.prependMessages ? .[0] ? ? r.promptMessage ? ? r.appendMessages ? .[0];
            if (d && i.containsNodeOrMessageId(d.id)) {
                const n = i.getNodeByIdOrMessageId(d.id);
                for (const l of s) i.containsNodeOrMessageId(l.id) || (l.clientMetadata = Ms(l.clientMetadata), Es(n.message.clientMetadata) ? i.prependOptismisticNode(d.id, l) : i.prependNode(d.id, l));
                return
            }
        })
    })
}
async function nt({
    conversation: e,
    completionType: r,
    token: s,
    serverThreadId: m,
    preflightTime: i,
    turnTraceId: d
}) {
    const n = i ? ? performance.now();
    if (t(() => q(e))) return;
    q.set(e, !0);
    const l = J(),
        I = t(() => Z(ee(e))),
        f = t(() => Y(e).id),
        c = t(() => X()),
        T = t(() => ae()),
        [C, y] = t(() => [re(e), de(e)]),
        g = ne(),
        h = `request-${e.id}-${g}`;
    le(e.id, {
        source: ie.CLIENT,
        value: k.STREAMING
    }, {
        path: "request_completion_resume_existing_stream",
        requestId: h
    });
    const b = se(e.id);
    d && oe(e, d);
    const v = te({
        mode: "reload",
        resumeReason: "reload",
        clientRequestId: h,
        gizmoType: I,
        preflightTime: n,
        isTemporaryChat: c,
        conversationId: b ? ? m,
        turnTraceId: d,
        onTurnLog: void 0
    });
    K(e.id) || H.initThread({
        clientThreadId: e.id,
        conversationMode: {
            kind: Ae.PrimaryAssistant
        },
        userId: void 0,
        accountId: void 0
    }), H.retainThread(e.id);
    const M = new ce(h, l, void 0, e, void 0, void 0, void 0, void 0, r, f, "url", T, n, I === F.PROJECT, !1, !1, !1, !1, v, void 0, !1, void 0, void 0, void 0, void 0, void 0, {
        disablePlaceholder: !0
    }, C, y);
    M.preflightTime = 0, await M.sendResumeRequest({
        conversationId: m,
        resumeToken: s,
        profiler: void 0
    })
}
async function ot({
    conversation: e,
    completionType: r,
    serverThreadId: s,
    preflightTime: m,
    turnTraceId: i
}) {
    const d = m ? ? performance.now();
    if (t(() => q(e))) return;
    q.set(e, !0);
    const n = J(),
        l = t(() => Z(ee(e))),
        I = t(() => Y(e).id),
        f = t(() => X()),
        c = t(() => ae()),
        [T, C] = t(() => [re(e), de(e)]),
        y = ne(),
        g = `request-${e.id}-${y}`;
    le(e.id, {
        source: ie.CLIENT,
        value: k.STREAMING
    }, {
        path: "request_completion_resume_without_token",
        requestId: g
    });
    const h = se(e.id);
    i && oe(e, i);
    const b = te({
        mode: "reload",
        resumeReason: "reload",
        clientRequestId: g,
        gizmoType: l,
        preflightTime: d,
        isTemporaryChat: f,
        conversationId: h ? ? s,
        turnTraceId: i,
        onTurnLog: void 0
    });
    K(e.id) || H.initThread({
        clientThreadId: e.id,
        conversationMode: {
            kind: Ae.PrimaryAssistant
        },
        userId: void 0,
        accountId: void 0
    }), H.retainThread(e.id);
    const v = new ce(g, n, void 0, e, void 0, void 0, void 0, void 0, r, I, "url", c, d, l === F.PROJECT, !1, !1, !1, !1, b, void 0, !1, void 0, void 0, void 0, void 0, void 0, {
        disablePlaceholder: !0
    }, T, C);
    v.preflightTime = 0, await v.resumeWithPolling({
        conversationId: s,
        profiler: void 0,
        turnTraceId: i
    })
}
export {
    nt as a, ot as b, it as r
};
//# sourceMappingURL=7f00cfec-f04y2v5idy58f22s.js.map