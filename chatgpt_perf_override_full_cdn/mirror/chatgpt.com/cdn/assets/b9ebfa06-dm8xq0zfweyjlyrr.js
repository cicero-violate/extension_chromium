const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/0fd78e4f-gcwrond4o5bwuthm.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/conversation-small-cqp6votf.css", "assets/1a5e078c-os7yi9hgehd2ixnd.js", "assets/881648b6-ighgvbrp6yyqupn4.js", "assets/1bc04b52-c842ajlk411j0plj.js", "assets/93b8edb0-i4v0k7e37nk0jqqy.js", "assets/1bc04b52-gtpe46xocf6zem4g.js", "assets/b4c3a217-wf4fzdto4ed5hgv0.js", "assets/f6f4f1b2-gtlbp7j4szobo0y1.js", "assets/1bc04b52-lymnctp12j4ukscl.js", "assets/1bc04b52-h1em0bjkpkjv8ykw.js", "assets/1bc04b52-hg3ptm9pgpi9lcut.js", "assets/1bc04b52-jxd082ldak294kcc.js", "assets/8d846022-abx0in25q9ocxjad.js", "assets/1bc04b52-hpmor2vxay5xyk5e.js", "assets/1bc04b52-cvho6b74mdi8rq0h.js", "assets/1bc04b52-pfqcgruptyx7togk.js", "assets/1bc04b52-hnu6g21afx0au4ng.js", "assets/ce52ae67-pc2givv05uuq8g6l.js", "assets/d4fd05ef-jcd8acyt60dknv7p.js", "assets/1bc04b52-homyy2s5cy2i6moh.js", "assets/bc18f706-ctivje9d0t0qyr68.js", "assets/1bc04b52-j8mdq0okhi6vw6kp.js"]))) => i.map(i => d[i]);
import {
    v as Ot,
    _ as ot
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    q as ue,
    cN as pe,
    dU as fe,
    yH as qt,
    k as Re,
    cM as q,
    cO as E,
    D as z,
    cI as y,
    cD as we,
    _ as W,
    a as D,
    N as B,
    df as N,
    d1 as Ft,
    u8 as Nt,
    dR as se,
    n as $,
    e8 as Lt,
    ef as Ut,
    eg as xt,
    bi as F,
    x as ne,
    dX as oe,
    R as it,
    v as rt,
    pM as le,
    jC as ge,
    d$ as at,
    yI as Ue,
    u_ as jt,
    yJ as Ht,
    be as Dt,
    d8 as dt,
    bN as X,
    mu as Bt,
    cA as ct,
    s4 as lt,
    b8 as Wt,
    fi as te,
    yK as ut,
    cs as xe,
    dI as je,
    cQ as M,
    vI as ye,
    cU as _e,
    j as zt,
    yL as Gt,
    dZ as Te,
    dz as $t,
    aJ as Vt,
    j$ as ht,
    yM as Yt,
    yN as Kt,
    S as Se,
    dV as Qt,
    np as Jt,
    h as Xt,
    c2 as Zt,
    di as Ie,
    cR as He,
    e2 as De,
    dY as es,
    bY as Be,
    es as We,
    jD as ze,
    da as be,
    sv as ts,
    yO as ss,
    lN as ns,
    my as os,
    mz as is,
    mG as rs,
    it as as,
    jp as ds,
    cH as J,
    dJ as ee,
    yP as cs,
    mI as ls,
    yQ as us,
    yR as hs,
    dk as Ge,
    yS as $e,
    yT as ms,
    jP as _s,
    fO as Ve,
    yU as gs,
    fz as ps,
    dK as fs,
    ch as vs
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    ay as Ae,
    i0 as mt,
    hW as _t,
    i1 as ys,
    i2 as Ts,
    i3 as Ss,
    bv as gt,
    i4 as pt,
    i5 as ke,
    i6 as ve,
    h$ as ft,
    h_ as Ye,
    i7 as Is,
    i8 as bs,
    i9 as Cs,
    ia as Ke,
    ib as Ms,
    aq as Es,
    ic as As,
    av as vt,
    id as Rs,
    ah as ws,
    ai as ks,
    ab as Ps,
    ac as yt,
    ie as Tt,
    ig as Qe,
    ih as Os,
    ii as qs,
    ij as Fs,
    ik as Ns,
    il as Je,
    im as Ls,
    io as Us,
    ip as xs,
    bg as js,
    iq as Ce,
    ir as Xe,
    is as Hs,
    it as Ds,
    iu as Bs,
    iv as Ws,
    iw as zs,
    ix as Ze,
    iy as Gs,
    iz as $s,
    iA as Vs,
    an as de,
    iB as Ys,
    iC as Ks,
    iD as Qs,
    iE as Js,
    iF as et,
    iG as Xs,
    iH as Zs,
    iI as en,
    df as tn,
    dg as sn,
    iJ as nn,
    iK as on,
    cj as rn,
    ap as tt,
    iL as Me,
    iM as an
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function dn(e, t, s, n, o, r) {
    if (t.setConduitToken(e.conduitToken), Ae(e.asyncTaskId)) return un(e, t, o, r);
    const a = at(),
        i = It(),
        d = Tn(e, t, i, s, o, r);
    let c = bt(t, n, d, i.firstResponseWarningMs);
    return ue("1377659296") && (c = mt(c, {
        ctx: a,
        turnTracker: t,
        threadId: "threadId" in e ? e.threadId : void 0,
        clientThreadId: r,
        signal: o,
        turnTraceId: t.turn_trace_id,
        shouldPollOnError: Mt
    })), Fe(c, {
        turnTracker: t,
        signal: o
    })
}

function cn(e) {
    return se(3010482349, `${e}-AAAA`) || se(3240390095, `${e}-AAAA`)
}

function St(e) {
    return $() && cn(e)
}

function ln(e) {
    return $() ? St(e) ? "https://chatgpt.com/backend-alt" : "https://chatgpt.com/backend-api" : "https://chatgpt.com/backend-anon"
}

function st(e, t) {
    e && y(e, s => {
        s.steerTurnRequestInFlight = t
    })
}
async function* un(e, t, s, n) {
    st(n, !0);
    try {
        await Sn(e, t.turn_trace_id), t.logSteerCompletion({
            type: fe.Success
        })
    } catch (o) {
        t.logSteerCompletion({
            type: fe.Error,
            error: qt(o)
        })
    } finally {
        st(n, !1)
    }
}

function hn(e, t, s, n, o) {
    const r = at(),
        a = It(),
        {
            conversationId: i,
            resumeToken: d,
            model: g
        } = e,
        c = {
            conversationId: i,
            resumeToken: d
        };
    let u = Et({
        conversationId: i,
        resumeToken: d,
        model: g,
        turnTracker: t,
        offset: 0,
        signal: n ? ? null,
        streamTimeoutConfig: a
    });
    u = Oe(u, {
        model: g,
        turnTracker: t,
        signal: n ? ? null,
        streamTimeoutConfig: a,
        resumeState: c
    }), u = At(u, {
        turnTracker: t,
        prepareState: null,
        signal: n ? ? null,
        f_completion: !0
    });
    const f = _t(u, h => {
            t.stream_encoding = h
        }),
        v = bt(t, s, Ct(f), a.firstResponseWarningMs);
    let l = v;
    return ue("1377659296") && (l = mt(v, {
        ctx: r,
        turnTracker: t,
        threadId: pe(i),
        signal: n,
        shouldPollOnError: Mt
    })), Fe(l, {
        turnTracker: t,
        signal: n
    })
}

function mn(e, t, s, n) {
    const o = ys(e, {
        signal: s,
        turnTraceId: n ? ? t.turn_trace_id
    });
    return Fe(o, {
        turnTracker: t,
        signal: s
    })
}
const _n = 1e3 * 30,
    gn = 1e3 * 60,
    pn = 1e3 * 60,
    fn = 1e3 * 60,
    vn = 1e3 * 5,
    yn = 1e3 * 30,
    ce = bs.getTracer("completion");

function It() {
    const e = Re("3608673692");
    return {
        firstResponseWarningMs: e.get("sse_first_response_warning_ms", _n),
        initialOpenTimeoutMs: e.get("sse_initial_open_timeout_ms", gn),
        initialOpenWarningMs: e.get("sse_initial_open_warning_ms", pn),
        betweenBytesTimeoutMs: e.get("sse_between_bytes_timeout_ms", fn)
    }
}

function Ee(e, t) {
    D.count(B.DEFAULT, e, [{
        key: "prepare_sent",
        value: t && t !== "none" ? "true" : "false"
    }, {
        key: "prepare_succeeded",
        value: t === "success" ? "true" : "false"
    }, {
        key: "prepare_failed",
        value: t === "failure" ? "true" : "false"
    }])
}
async function* bt(e, t, s, n) {
    let o = !1,
        r = !1,
        a = !1,
        i = !1,
        d, g, c, u, _;
    ce.startActiveSpan("completion.response", l => {
        d = ce.startSpan("completion.first_response"), g = ce.startSpan("completion.first_token_including_tool_calls"), c = ce.startSpan("completion.first_token_including_visible_content"), u = ce.startSpan("completion.first_token"), _ = l
    });
    const T = Date.now();
    let f = !1,
        v = setTimeout(() => {
            W.logEvent("SSE Response Took Too Long to Come Back", {}), f = !0
        }, n);
    try {
        t ? .logTimingOnce("prompt_submitted");
        for await (const l of s) yield l, l.type !== "connected" && v && (clearTimeout(v), v = null), l.type !== "connected" && f && (f = !1, e.logger.info(`Late message received after ${Date.now()-T}ms`), D.count(B.DEFAULT, "conversation.stream.late_message_received", [{
            key: "trigger",
            value: e.trigger ? ? "null"
        }])), l.type === "message" && (e.onMessageUpdate(l.message), o || (o = !0, d ? .end(), t ? .logTimingOnce("first_response")), !r && l.message.author.role === N.Assistant && (r = !0, g ? .end(), t ? .logTimingOnce("first_assistant_token")), !a && l.message.author.role === N.Assistant && Ft(l.message) && (a = !0, c ? .end(), t ? .logTimingOnce("first_visible_content_token")), !i && l.message.author.role === N.Assistant && Nt(l.message) && (i = !0, u ? .end(), t ? .logTimingOnce("first_message_token"))), l.type === "perf_stats" && e.addServerPerfStats(l), l.type === "server_ste_metadata" && e.addServerSteMetadata(l), l.type === "message_marker" && e.onMessageMarker(l)
    } catch (l) {
        throw v && (clearTimeout(v), v = null), l
    } finally {
        _ ? .end()
    }
}
async function* Tn(e, t, s, n, o, r) {
    const {
        conduitToken: a,
        prepareState: i,
        model: d,
        f_completion: g,
        f_search: c
    } = e, u = ln(d);
    let _ = `${u}/conversation`,
        T = "/conversation";
    g && (_ = `${u}/f/conversation`, T = "/f/conversation"), e.pulseCompletionParams && (_ = `${u}/${Ts(e.pulseCompletionParams)}`, T = e.pulseCompletionParams.type === "card" ? "/feed/card/{card_id}/conversation" : "/feed/feedback/conversation");
    const f = wn(_);
    if (e.pulseCompletionParams && Ss(f, e.pulseCompletionParams), ue("212625335") && f.searchParams.set("debug", "true"), t.onSentUserMessage(), r) {
        const p = q(r),
            A = p ? .lastPrepareParentMessageId ? ? null;
        if (A != null) {
            if (e.f_completion && A !== e.parentMessageId) {
                const U = E.getBranchFromLeaf(p, e.parentMessageId).length;
                z.addAction("fast_conversation.parent_message_id_mismatch", {
                    client_thread_id: String(r),
                    model: d,
                    prepare_parent_message_id: A,
                    request_parent_message_id: e.parentMessageId,
                    completion_type: String(e.completionType),
                    has_conduit_token: e.conduitToken != null,
                    branch_length: U
                })
            }
            y(r, U => {
                U.lastPrepareParentMessageId = null
            })
        }
    }
    const v = we() ? await n.withSpan("completion.submit.request.stream_setup.local_functions", () => gt()) : void 0,
        l = typeof window < "u" && typeof document < "u" && e.includeAccountCreationSentinelToken === !0,
        h = () => n.withSpan("completion.submit.request.stream_setup.account_creation_sentinel_token", () => Ye("chat_based_account_creation").catch(() => null));
    let S = null;
    l && (S = await h());
    const P = () => ({ ...ke(),
            ...ft(e.chatReq, e.turnstileToken, e.proofToken, S),
            ...a ? {
                "x-conduit-token": a
            } : {},
            ...t.turn_trace_id ? {
                "x-oai-turn-trace-id": t.turn_trace_id
            } : {}
        }),
        m = () => En(e, v),
        R = performance.now(),
        j = () => n.withSpan("completion.submit.request.stream_setup.refresh_integrity", async p => {
            const A = await Es(e.completionMetadata);
            if (e.chatReq = A.chatReq, e.turnstileToken = A.turnstileToken, e.proofToken = A.proofToken, l && (S = await p.withSpan("completion.submit.request.stream_setup.account_creation_sentinel_token", () => Ye("chat_based_account_creation").catch(() => null))), A.chatReq.force_login) throw new Error("force_login during retry");
            return {
                headers: P(),
                body: m()
            }
        }),
        H = {};
    let O = pt(f.toString(), {
        method: "POST",
        headers: P(),
        body: m(),
        targetBaseUrl: "https://chatgpt.com/backend-api",
        routeName: T,
        signal: o,
        initialOpenTimeoutMs: s.initialOpenTimeoutMs,
        idleTimeoutMs: s.betweenBytesTimeoutMs,
        observer: {
            onOpen: p => {
                t.onOpen({
                    requestType: "initial_request",
                    openLatencyMs: performance.now() - R,
                    warningThresholdMs: s.initialOpenWarningMs,
                    response: p
                })
            },
            onEvent: p => {
                t.onStreamEvent(p.byteLength, p.isDoneEvent)
            }
        },
        shouldRetry: p => (ie(p) || p instanceof F && qe(p.status)) && ne("603105008").get("retry_stream_requests", !1),
        retryConfig: Ne(),
        onRetry: j
    });
    O = Oe(O, {
        model: d,
        turnTracker: t,
        signal: o ? ? null,
        streamTimeoutConfig: s,
        resumeState: H
    }), O = Mn(O, {
        model: d,
        turnTracker: t,
        signal: o ? ? null,
        streamTimeoutConfig: s,
        resumeState: H
    }), O = At(O, {
        turnTracker: t,
        prepareState: i,
        signal: o ? ? null,
        f_completion: g ? ? null
    }), g && r && y(r, p => {
        p.stopConduitToken = a ? ? null, p.prepareState = null, p.firstPrepareTimestamp = null, p.lastPrepareTimestamp = null, p.prepareRequestCount = 0, p.hasSuccessfulPrepareSinceLastRequestReset = !1
    });
    const b = _t(O, p => {
        t.stream_encoding = p
    });
    yield* Ct(b, {
        onPrematureTermination: () => {
            t.onPrematureStreamTermination()
        }
    })
}
const Sn = async (e, t) => {
        const s = { ...ke(),
                ...ft(e.chatReq, e.turnstileToken, e.proofToken, null),
                ...t ? {
                    "x-oai-turn-trace-id": t
                } : {}
            },
            n = Pe(e);
        await it.safePost("/f/steer_turn", {
            overrideBaseUrl: St(e.model) ? "https://chatgpt.com/backend-alt" : void 0,
            requestBody: n,
            additionalHeaders: s,
            authOption: rt.SendIfAvailable
        })
    },
    In = e => {
        let t = null;
        const s = new TextEncoder,
            n = Ht(() => {}, () => {}, a => {
                a.data !== "" && (t = a)
            }),
            r = e.replace(/\r\n/g, `
`).split(`
`);
        for (const a of r) {
            const i = a.indexOf(":");
            n(s.encode(a), i)
        }
        return r[r.length - 1] !== "" && n(s.encode(""), -1), t
    };

function bn(e, t) {
    return As((s, n, o) => {
        const r = Ue(),
            a = jt(e),
            i = r.onConnect(C => {
                t.logger.info("websocket.connection.connected", C), z.addAction("websocket.connection.connected", C)
            }),
            d = r.onDisconnect(C => {
                t.logger.info("websocket.connection.disconnected", C), z.addAction("websocket.connection.disconnected", C)
            }),
            g = a.onSubscribe(C => {
                t.logger.info("websocket.topic.subscribe", C), z.addAction("websocket.topic.subscribe", C), D.count(B.DEFAULT, "conversation.turn_topic.subscribe-success")
            });
        D.count(B.DEFAULT, "conversation.turn_topic.subscribe-attempt"), t.logger.info("websocket.topic.subscribe-attempt", {
            topicId: e,
            offset: a.offset,
            state: a.state,
            isTransportOpen: r.isTransportOpen
        }), a.subscribe({
            includeAllHistory: !0
        });
        const c = Re("339548201", {}),
            u = c.get("log_every_n_events", 0),
            _ = c.get("log_every_ms", 0),
            T = c.get("lag_log_threshold_ms", 2e3),
            f = c.get("lag_log_interval_ms", 1e4),
            v = c.get("websocket_initial_idle_timeout_ms", vn),
            l = c.get("websocket_idle_timeout_ms", yn),
            h = c.get("ignore_parent_id_mismatch", !1);
        let S = 0,
            P = null;
        const m = new Set,
            R = [];
        let j = !1,
            H = !1,
            O = !1,
            L = null;
        const V = C => {
                R.length === 10 && (R.shift(), j = !0), R.push(C ? ? "n/a")
            },
            b = () => j ? ["<omitted>", ...R] : [...R],
            p = (C, x) => {
                t.logWsStreamSummary(e, S, C, x, b())
            };
        let A = null;
        _ > 0 && (A = setInterval(() => {
            p("periodic_time")
        }, _));
        const U = () => {
                H || (H = !0, D.hist(B.DEFAULT, "conversation.turn_topic.stream_item_count", [], S), A && clearInterval(A), L && clearTimeout(L), i ? .(), d ? .(), g ? .(), kt ? .(), Y ? .(), wt ? .(), G ? .(), a.unsubscribe())
            },
            Z = C => {
                U(), o(new F("ws://" + e, 0, {
                    error: oe
                }, void 0, new Error(`Missed messages on ws topic: ${C}`)))
            },
            w = (C = !1) => {
                C && !O && (O = !0), L && (clearTimeout(L), L = null);
                const x = !O,
                    K = x ? v : l;
                if (K === 0) return;
                const re = x ? "initial_stream_item_timeout" : "idle_timeout",
                    ae = x ? "conversation.turn_topic.initial_stream_item_timeout" : "conversation.turn_topic.idle_timeout";
                L = setTimeout(() => {
                    H || (p(re), D.count(B.DEFAULT, ae), Z(re))
                }, K)
            };
        w();
        const Y = a.onPotentialMissedMessages(() => {
                p("recovery_failed"), D.count(B.DEFAULT, "conversation.turn_topic.recovery_failed"), Z("recovery_failed")
            }),
            G = a.onReconnect(() => {
                p("ws_reconnect")
            }),
            wt = a.onDisconnect(() => {
                p("ws_disconnect")
            }),
            kt = a.onMessage(C => {
                if (C.type === "conversation-turn-stream" && (w(!0), C.payload.type === "stream-item")) {
                    const {
                        stream_item_id: x,
                        parent_stream_item_id: K,
                        encoded_item: re,
                        server_timestamp_ms: ae
                    } = C.payload;
                    if (V(x), typeof x == "string" && m.has(x)) p("stream_item_id_duplicate"), D.count(B.DEFAULT, "conversation.turn_topic.stream_item_id_duplicate");
                    else if (K && !m.has(K)) {
                        if (p("stream_item_parent_mismatch"), D.count(B.DEFAULT, "conversation.turn_topic.stream_item_parent_mismatch"), !h) {
                            Z("stream_item_parent_mismatch");
                            return
                        }
                    } else K && P && K !== P && D.count(B.DEFAULT, "conversation.turn_topic.stream_item_parent_interleaved");
                    x && (m.add(x), P = x), S++;
                    const Pt = typeof ae == "number" && Number.isFinite(ae) ? ae : null;
                    t.onWsSample({
                        topicId: e,
                        streamItemId: x,
                        parentStreamItemId: K,
                        streamItemIndex: S,
                        serverTimestampMs: Pt,
                        lagLogThresholdMs: T,
                        lagLogIntervalMs: f
                    }), u > 0 && S % u === 0 && p("periodic_count"), t.onStreamEvent(re.length, !1);
                    const he = In(re);
                    if (!he ? .data || he.data === "[DONE]") return;
                    const Q = JSON.parse(he ? .data);
                    if (Q.error) {
                        const Le = typeof Q.error_code == "string" ? Q.error_code : void 0,
                            me = new Error(Q.error);
                        W.logValueEventWithStatsig({
                            segmentEventName: "raw_request_stream_error",
                            statsigEventName: "chatgpt_raw_request_stream_error",
                            data: {
                                errorMessage: me.message,
                                errorCode: Le,
                                isNetworkError: ie(me),
                                isErrorInMessageData: !0,
                                messageData: Q,
                                transport: "ws"
                            }
                        }), p("payload_error", me.message), o(F.createWithErrorMessage(Ue().ws.url ? ? "ws", "server", Q.error, void 0, me, Le)), U();
                        return
                    }
                    if (Q.type === "message_stream_complete") {
                        t.onStreamEvent(0, !0), p("done"), n(), U();
                        return
                    }
                    s({
                        event: he.event ? ? void 0,
                        data: Q
                    })
                }
            })
    })
}
const Cn = e => {
    if (!e || typeof e != "object") return !1;
    const t = e;
    return t.type === "stream_handoff" && Array.isArray(t.options) && t.options.every(s => typeof s == "object" && typeof s.type == "string")
};

function Mn(e, t) {
    let s = !1;
    return Is(e, n => {
        if ("data" in n && Cn(n.data) && !s) {
            for (const o of n.data.options)
                if (o.type === "subscribe_ws_topic") return t.turnTracker.stream_protocol = "ws", s = !0, Oe(bn(o.topic_id, t.turnTracker), {
                    model: t.model,
                    turnTracker: t.turnTracker,
                    signal: t.signal,
                    streamTimeoutConfig: t.streamTimeoutConfig,
                    resumeState: t.resumeState
                })
        }
        return null
    })
}
async function* Ct(e, t = {}) {
    let s = !1;
    for await (const n of e) if ("response" in n) {
        const o = n.response,
            r = o ? .headers ? .get("x-oai-request-id") ? ? null,
            a = o ? .headers ? .get("X-Conduit-Token") ? ? null;
        yield {
            type: "connected",
            serverRequestId: r,
            interruptConversationToken: a
        }
    } else {
        const o = An(n.data);
        o && (o.type === "done" && (s = !0), yield o)
    }
    s || (t.onPrematureTermination ? .(), yield {
        type: "done"
    })
}

function Pe(e, t) {
    const s = "threadId" in e ? e.threadId : void 0;
    return {
        action: e.completionType,
        messages: e.messages.length > 0 ? e.messages.map(nt) : void 0,
        continue_from_shared_conversation_id: "continueFromSharedConversationId" in e && s == null ? e.continueFromSharedConversationId : void 0,
        branching_from_conversation_id: "branchingFromConversationId" in e && s == null ? e.branchingFromConversationId : void 0,
        branching_from_message_id: "branchingFromMessageId" in e && s == null ? e.branchingFromMessageId : void 0,
        hide_from_history: "hideFromHistory" in e && s == null ? e.hideFromHistory : void 0,
        continue_from_shared_post_id: "continueFromSharedPostId" in e ? e.continueFromSharedPostId : void 0,
        fork_from_shared_post: "forkFromSharedPost" in e ? e.forkFromSharedPost : void 0,
        ..."sharedProjectConversationOwnerId" in e && "sharedProjectConversationId" in e && e.sharedProjectConversationId && e.sharedProjectConversationOwnerId ? {
            continue_from_shared_project_conversation_id: e.sharedProjectConversationId,
            shared_project_conversation_owner_id: e.sharedProjectConversationOwnerId
        } : {
            conversation_id: s
        },
        parent_message_id: e.parentMessageId,
        model: e.model,
        timezone_offset_min: new Date().getTimezoneOffset(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        variant_purpose: e.completionMetadata ? .variantPurpose,
        suggestions: e.completionMetadata ? .suggestions ? e.completionMetadata.suggestions.map(n => Ms(n)) : void 0,
        chosen_suggestion: e.completionMetadata ? .suggestion ? {
            type: e.completionMetadata.suggestion.type,
            index: e.completionMetadata.suggestionIndex,
            source: e.completionMetadata.suggestion.type === Ke.Autocomplete ? e.completionMetadata.suggestion.source : void 0,
            user_input: e.completionMetadata.suggestion.type === Ke.Autocomplete ? e.completionMetadata.suggestion.userInput : void 0
        } : void 0,
        history_and_training_disabled: k(e.historyDisabled),
        is_do_not_remember: k(e.isDoNotRemember),
        conversation_mode: le(e.completionMetadata ? .conversationMode),
        force_paragen: k(e.forceParagen),
        force_paragen_model_slug: e.forceParagenModel,
        force_counterfactual: k(e.forceCounterfactual),
        counterfactual_search_eval_preset: I(e.counterfactualSearchEvalPreset),
        force_indepth_feedback: k(e.forceIndepthFeedback),
        force_rate_limit: k(e.forceRateLimit),
        reset_rate_limits: k(e.resetRateLimits),
        record_rendering: k(e.recordRendering),
        record_transformed_convo_json: k(e.recordTransformedConvoJson),
        disable_system_content_toggling: k(e.disableSystemContentToggling),
        enable_message_followups: e.enableMessageFollowups,
        source: e.completionMetadata ? .source,
        system_hints: e.completionMetadata ? .systemHints,
        prefetch_ids: e.completionMetadata ? .prefetchIds,
        attachment_mime_types: I(e.attachmentMimeTypes),
        partial_query: e.partialQuery ? nt(e.partialQuery) : void 0,
        supports_buffering: !0,
        supported_encodings: [Cs.V1],
        conversation_origin: I(e.conversationOrigin),
        force_use_search: I(e.forceUseSearch),
        force_disable_features: I(e.forceDisableFeatures),
        force_disable_tool_ids: I(e.forceDisableToolIds),
        atlas_mode_enabled: I(e.atlasModeEnabled),
        client_reported_search_source: e.completionMetadata ? .searchSource,
        client_contextual_info: e.contextualInfo,
        no_auth_ad_preferences: e.noAuthAdPreferences ? {
            personalization_enabled: e.noAuthAdPreferences.personalizationEnabled,
            history_enabled: e.noAuthAdPreferences.historyEnabled
        } : void 0,
        paragen_stream_type_override: I(e.paragenStreamType === "none" ? null : e.paragenStreamType),
        paragen_ui_treatment_override: I(e.paragenUiTreatment),
        paragen_cot_summary_display_override: I(e.paragenCotSummaryDisplay === "none" ? null : e.paragenCotSummaryDisplay),
        is_onboarding_conversation: k(e.isOnboardingConversation),
        is_visible: I(e.isVisible),
        override_infer_treatment: I(e.overrideInferTreatment),
        model_slug_stats_override: I(e.modelSlugStatsOverride),
        is_reasoning_skipped: k(e.isReasoningSkipped),
        async_task_id: I(e.asyncTaskId),
        force_parallel_switch: I(e.forceParallelSwitch),
        thinking_effort: I(e.thinkingEffort),
        juice_score: I(e.juiceScore),
        multimodal_juice_score: I(e.multimodalJuiceScore),
        show_all_answers: k(e.showAllAnswers),
        pre_retrieval_settings: I(e.preRetrievalSettings),
        map_search_params: I(e.mapSearchParams),
        nc_override: I(e.ncOverride),
        cpr_override: I(e.cprOverride),
        cm_override_slug: I(e.cmOverride),
        srt_override: I(e.srtOverride),
        pm_override: I(e.pmOverride),
        dsp_override: k(e.dspOverride),
        sj_override: k(e.sjOverride),
        scc_override: k(e.sccOverride),
        sjo_override: k(e.sjoOverride),
        local_function_names: we() && t ? [...t] : void 0,
        r2xg7vml: I(e.r2xg7vml),
        zafn3kp8: I(e.zafn3kp8)
    }
}

function En(e, t) {
    return Pe(e, t)
}

function nt(e) {
    let t = e;
    return e.clientMetadata && (t = { ...e
    }, delete t.clientMetadata), t
}

function k(e) {
    if (e === !0) return e
}

function I(e) {
    if (e != null) return e
}

function An(e) {
    if ("type" in e) {
        switch (e.type) {
            case "instant_answer_debug":
                return {
                    type: "instant_answer_debug",
                    conversationId: e.conversation_id,
                    payload: e.payload && typeof e.payload == "object" && !Array.isArray(e.payload) ? e.payload : {}
                };
            case "gizmo_inline_review":
                return {
                    type: "gizmo_inline_review",
                    gizmoId: e.gizmo_id
                };
            case "title_generation":
                return {
                    type: "title_generation",
                    title: e.title,
                    conversation_id: e.conversation_id
                };
            case "system_hint_suggestion":
                return {
                    type: "system_hint_suggestion",
                    action_label: e.action_label,
                    system_hint: e.system_hint,
                    chips: le(e.chips ? ? [])
                };
            case "moderation":
                return {
                    type: "moderation",
                    conversationId: e.conversation_id,
                    messageId: e.message_id,
                    isCompletion: e.is_completion,
                    flagged: e.moderation_response.flagged ? ? !1,
                    blocked: e.moderation_response.blocked ? ? !1,
                    shouldDisableConversation: !!e.moderation_response.should_disable_conversation,
                    disclaimers: le(e.moderation_response.disclaimers ? ? void 0),
                    metadata: e.moderation_response.metadata ? ? void 0
                };
            case "url_moderation":
                return {
                    type: "url_moderation",
                    conversationId: e.conversation_id,
                    messageId: e.message_id,
                    url: e.url_moderation_result.full_url,
                    isSafe: e.url_moderation_result.is_safe
                };
            case "num_variants_in_stream":
                return {
                    type: "num_variants_in_stream",
                    num_variants_in_stream: e.num_variants_in_stream,
                    display_treatment: e.display_treatment ? ? void 0
                };
            case "input_message":
                return {
                    type: "input_message",
                    message: e.input_message,
                    conversationId: e.conversation_id
                };
            case "add-item":
                return {
                    type: "add-item",
                    item: e.item,
                    conversationId: e.conversation_id
                };
            case "replace-item":
                return {
                    type: "replace-item",
                    item: e.item,
                    itemId: e.item_id,
                    conversationId: e.conversation_id
                };
            case "stream-item-start":
                return {
                    type: "stream-item-start",
                    item: e.item,
                    itemId: e.item_id,
                    conversationId: e.conversation_id
                };
            case "stream-item-patch":
                return {
                    type: "stream-item-patch",
                    itemId: e.item_id,
                    patches: le(e.patches ? ? []),
                    conversationId: e.conversation_id
                };
            case "stream-item-done":
                return {
                    type: "stream-item-done",
                    itemId: e.item_id,
                    conversationId: e.conversation_id
                };
            case "delete-item":
                return {
                    type: "delete-item",
                    itemId: e.item_id,
                    conversationId: e.conversation_id
                };
            case "display_crisis_helpline_message":
                return {
                    type: "display_crisis_helpline_message",
                    text: e.text,
                    links: le(e.links ? ? []),
                    conversationId: e.conversation_id,
                    messageId: e.message_id
                };
            case "toast":
            case "perf_stats":
            case "conversation_detail_metadata":
            case "beacon_ui_response":
            case "resume_conversation_token":
            case "conversation_async_status":
            case "server_ste_metadata":
            case "message_marker":
            case "survey_campaign_effect":
            case "display_crisis_helpline_modal":
            case "ads":
                return e;
            case "message_stream_complete":
                return {
                    type: "done"
                }
        }
        return
    }
    if ("message" in e) return {
        type: "message",
        message: e.message,
        conversationId: e.conversation_id
    }
}
async function Hn(e, t, s = [], n, o) {
    if (!vt(!0) || !Rs() || ne("1925940714").get("disable-convo-2", !1)) return;
    const a = pe(e),
        i = q(e),
        d = Dt(e);
    if (i ? .prepareRequestBlocked) return;
    const g = 3e3;
    if (o.delayAfterCompletion && i ? .lastCompletionFinishedTimestamp) {
        const w = performance.now() - i.lastCompletionFinishedTimestamp,
            Y = g - w;
        Y > 0 && await new Promise(G => setTimeout(G, Y))
    }
    const c = i ? .conversationOrigin ? ? null,
        u = i ? .is_do_not_remember === !0 || d.config ? .startDoNotRemember === !0;
    let _;
    o.isRegen ? _ = E.getParentPromptNode(i) ? .id ? ? "" : _ = E.getCurrentNode(i).message.id;
    const T = dt(),
        [f, v, l, h, S] = X(() => [Bt(), ws(d), ks(d), ct(d), lt(d)]),
        P = ne("1279001932").get("safe-search-default", !1),
        m = i ? .conduitToken ? ? null,
        R = Ps(d),
        j = R ? ? Ot();
    R || yt(d, j);
    const H = i ? .prepareState ? ? "none",
        O = {
            threadId: a,
            prepareState: H,
            conduitToken: m,
            continueFromSharedPostId: i ? .continuingFromSharedPostId,
            forkFromSharedPost: !!i ? .continuingFromSharedPostId,
            continueFromSharedConversationId: i ? .continuingFromSharedConversationId,
            branchingFromMessageId: i ? .branchingFromMessageId,
            branchingFromConversationId: i ? .branchingFromConversationId,
            hideFromHistory: i ? .hideFromHistory,
            sharedProjectConversationId: i ? .continuingFromSharedProjectConversationId,
            sharedProjectConversationOwnerId: i ? .sharedProjectConversationOwner ? .id,
            isOnboardingConversation: o.isOnboardingConversation,
            conversationOrigin: c,
            isDoNotRemember: u,
            model: t,
            atlasModeEnabled: S,
            completionType: te.Next,
            completionMetadata: {
                systemHints: s,
                conversationMode: o.conversationModeOverride ? ? i ? .mode ? ? {
                    kind: Wt.PrimaryAssistant
                }
            },
            partialQuery: o.partialQuery,
            messages: [],
            attachmentMimeTypes: o.attachmentMimeTypes,
            parentMessageId: _,
            thinkingEffort: o.thinkingEffort,
            recordRendering: T.recordRendering,
            recordTransformedConvoJson: T.recordTransformedConvoJson,
            historyDisabled: f,
            asyncTaskId: i ? .steeringAsyncTaskId ? ? void 0,
            contextualInfo: Tt(),
            mapSearchParams: o.mapSearchParams,
            r2xg7vml: h ? v ? ? P : void 0,
            zafn3kp8: h ? l ? ? P : void 0
        },
        L = we() ? await gt() : void 0,
        V = Pe(O, L),
        b = {
            "x-conduit-token": m ? ? "no-token",
            ...j ? {
                "x-oai-turn-trace-id": j
            } : {}
        };
    if (se(3010482349, `${t}-AAAA`) || se(3240390095, `${t}-AAAA`)) {
        y(e, w => {
            w.conduitToken = null, w.prepareState = null, w.firstPrepareTimestamp = null, w.lastPrepareTimestamp = null, w.prepareRequestCount = 0, w.hasSuccessfulPrepareSinceLastRequestReset = !1
        });
        return
    }
    let A = "f";
    const U = performance.now(),
        Z = i ? .lastPrepareTimestamp != null ? U - i.lastPrepareTimestamp : null;
    try {
        y(e, G => {
            G.prepareState = "sent", G.firstPrepareTimestamp ? ? = U, G.lastPrepareTimestamp = U, G.prepareRequestCount += 1, G.lastPrepareParentMessageId = _
        });
        const w = await it.safePost(`/${A}/conversation/prepare`, {
            requestBody: V,
            additionalHeaders: b,
            authOption: rt.SendIfAvailable
        });
        Qe({
            durationMs: performance.now() - U,
            timeSinceLastPrepareMs: Z,
            currentModelId: t,
            existingConduitToken: m,
            requestPath: A,
            result: "success"
        });
        const {
            conduit_token: Y
        } = w;
        n(Y)
    } catch (w) {
        y(e, Y => {
            Y.prepareState = "failure"
        }), Qe({
            durationMs: performance.now() - U,
            timeSinceLastPrepareMs: Z,
            currentModelId: t,
            existingConduitToken: m,
            requestPath: A,
            result: "failure"
        }), D.count(B.DEFAULT, "conduit_f_conversation_prepare_api_error"), z.addError(w)
    }
}
const Rn = e => new Promise(t => setTimeout(t, e));
async function* Oe(e, t) {
    const {
        MIN_RETRY_INTERVAL: s,
        MAX_RETRY_INTERVAL: n,
        RETRY_FACTOR: o,
        MAX_RETRY_COUNT: r
    } = Ne(), {
        signal: a,
        turnTracker: i,
        resumeState: d
    } = t, g = !i.isTemporaryChat;
    let c = !1;
    const u = {
        onClose: (h, S) => {
            h === "completed" && (c = !0)
        }
    };
    let _ = d ? .conversationId,
        T = d ? .resumeToken,
        f = e,
        v = 0,
        l;
    for (; f != null;) try {
        for await (const h of f) {
            const S = "response" in h;
            !S && h.data != null && typeof h.data == "object" && "type" in h.data && h.data.type === "resume_conversation_token" && "token" in h.data && "conversation_id" in h.data ? (T = String(h.data.token), _ = String(h.data.conversation_id), d && (d.resumeToken = T, d.conversationId = _), ve.set(_, T, i.turn_trace_id)) : yield h, i.onResumeSuccessful(v, l), l = void 0, S || v++
        }
        f = null, c = !0
    } catch (h) {
        if (c) return;
        l = {
            error: h,
            rawError: h instanceof Error && "rawError" in h ? h.rawError : void 0
        };
        const S = ie(h);
        i.onStreamNetworkError(v, h, S);
        const P = h instanceof F && qe(h.status);
        if (i.resume.currentAttemptCount < r && !a ? .aborted && g && T != null && _ != null && (ie(h) || P) && ($() || ne("2158581295").get("is_resume_enabled", !1))) {
            i.onResumeAttempted(v, l);
            const R = Math.min(s * o ** i.resume.currentAttemptCount, n) * (.5 + Math.random() * .5);
            i.logger.info("resume stream retry", {
                resume_attempt_number: i.resume.currentAttemptCount,
                resume_status_code: h instanceof F ? h.status : void 0,
                resume_offset: v,
                resume_is_network_error: S,
                resume_is_retryable_http: P
            }), await Rn(R), f = Et({ ...t,
                observer: u,
                resumeToken: T,
                conversationId: _,
                offset: v
            })
        } else {
            const m = h instanceof F && h.status === 404;
            throw (i.resume.currentAttemptCount >= r || m && i.resume.currentAttemptCount > 0) && i.onResumeFailed(v, m, S, l), f = null, i.logger.info("resume stream retry failed - breaking out of loop", {
                resume_attempt_number: i.resume.currentAttemptCount,
                resume_status_code: h instanceof F ? h.status : void 0,
                resume_offset: v,
                resume_is_network_error: S,
                resume_is_retryable_http: P
            }), h instanceof F && h.status === 404 && i.resume.currentAttemptCount > 0 ? (_ != null && ve.remove(_), F.createWithErrorMessage(h.url, "client", oe, void 0, h)) : h
        }
    }
}

function ie(e) {
    return e instanceof Error && e.message === oe || typeof e == "string" && e === oe
}

function Mt(e) {
    return ie(e) ? !0 : !(e instanceof F) || e.status === 403 || e.code === ge.HistoryDisabledConversationExpired ? !1 : e.status >= 400 && e.status < 500
}

function qe(e) {
    return e === 408 || e === 409 || e === 425 || e === 429 || e === 502 || e === 504
}

function Et({
    conversationId: e,
    resumeToken: t,
    model: s,
    turnTracker: n,
    offset: o,
    signal: r,
    streamTimeoutConfig: a,
    observer: i = {}
}) {
    const d = se(3010482349, `${s}-AAAA`) || se(3240390095, `${s}-AAAA`),
        g = $() ? d ? "https://chatgpt.com/backend-alt" : "https://chatgpt.com/backend-api" : "https://chatgpt.com/backend-anon",
        c = {
            "x-conduit-token": t ? ? "no-token",
            ...n.turn_trace_id ? {
                "x-oai-turn-trace-id": n.turn_trace_id
            } : {}
        },
        u = `${g}/f/conversation/resume`,
        _ = Lt(),
        T = {
            conversation_id: e,
            offset: o
        },
        f = performance.now();
    return pt(u, {
        method: "POST",
        headers: { ...ke(),
            ..._ ? Ut({
                accessToken: _
            }) : xt(),
            ...c,
            "Content-Type": "application/json"
        },
        body: T,
        targetBaseUrl: "https://chatgpt.com/backend-api",
        routeName: "/f/conversation/resume",
        signal: r ? ? void 0,
        initialOpenTimeoutMs: a.initialOpenTimeoutMs,
        idleTimeoutMs: a.betweenBytesTimeoutMs,
        observer: { ...i,
            onOpen: l => {
                i.onOpen ? .(l), n.onOpen({
                    requestType: "resume_request",
                    openLatencyMs: performance.now() - f,
                    warningThresholdMs: a.initialOpenWarningMs,
                    response: l
                })
            },
            onEvent: l => {
                i.onEvent ? .(l), n.onStreamEvent(l.byteLength, l.isDoneEvent)
            }
        },
        retryConfig: Ne(),
        shouldRetry: l => (ie(l) || l instanceof F && qe(l.status)) && ne("603105008").get("retry_stream_requests", !1)
    })
}
async function* At(e, {
    turnTracker: t,
    prepareState: s,
    f_completion: n,
    signal: o
}) {
    try {
        for await (const r of e) yield r;
        n && Ee("conduit_f_conversation_api.success", s)
    } catch (r) {
        throw D.count(B.DEFAULT, "conversation_api.client_request_error"), o ? .aborted ? n && Ee("conduit_f_conversation_api.aborted", s) : n && Ee("conduit_f_conversation_api.error", s), r
    }
}
async function* Fe(e, {
    turnTracker: t,
    signal: s
}) {
    try {
        let n = !1;
        for await (const o of e) n || (t.onStreamOpen(), n = !0), yield o
    } catch (n) {
        throw s ? .aborted ? t.handleAbort(n) : t.handleRawError(n instanceof Error ? n : String(n)), n
    }
    t.onStreamClose()
}

function Ne() {
    const e = Re("3165814200");
    return {
        MIN_RETRY_INTERVAL: e.get("MIN_RETRY_INTERVAL", 300),
        MAX_RETRY_INTERVAL: e.get("MAX_RETRY_INTERVAL", 5e3),
        RETRY_FACTOR: e.get("RETRY_FACTOR", 1.5),
        MAX_RETRY_COUNT: e.get("MAX_RETRY_COUNT", 12)
    }
}

function wn(e) {
    try {
        return new URL(e)
    } catch {
        return new URL(e, window.location.origin)
    }
}
const kn = .5,
    Pn = vs(() => ot(() =>
        import ("./0fd78e4f-gcwrond4o5bwuthm.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5])).then(e => e.QuietHoursModal));

function On() {
    const e = qn();
    return e ? e.gapPx > e.viewportHeightPx * kn : !1
}

function qn() {
    if (typeof window > "u" || typeof document > "u") return null;
    const e = document.getElementById("thread");
    if (!e) return null;
    const t = e.querySelectorAll('[data-turn="user"]');
    if (!t.length) return null;
    const s = t[t.length - 1],
        n = window.innerHeight;
    if (!Number.isFinite(n) || n <= 0) return null;
    const {
        bottom: o
    } = s.getBoundingClientRect();
    return {
        gapPx: n - o,
        viewportHeightPx: n
    }
}
class Dn {
    constructor(t, s, n, o, r, a, i, d, g, c, u, _, T, f, v, l, h, S, P, m = !1, R, j = !1, H = !1, O, L = void 0, V, b, p = !1, A = !1) {
        this.requestId = t, this.queryClient = s, this.initialThread = n, this.conversation = o, this.parentMessageId = r, this.prependMessages = a, this.promptMessage = i, this.appendMessages = d, this.completionType = g, this.model = c, this.eventSource = u, this.isHistoryAndTrainingDisabled = _, this.startPreflightTime = T, this.isProjectEnabledForGizmo = f, this.isNewThread = v, this.isContinuingFromSharedConversation = l, this.isContinuingFromBranchingConversation = h, this.isContinuingFromSharedProjectConversation = S, this.turnTracker = P, this.isAnonModeEnabled = R, this.isContinuableSharedPost = j, this.isReasoningSkipped = H, this.thinkingEffort = O, this.modelSlugStatsOverride = L, this.asyncTaskId = V, this.options = b, this.canEnableAuraAdultSearch = p, this.isAuraAdultSearchEnabled = A, this.completionLatencyTracker = new Os(this.requestId, T), this.isFirstCompletionInThread = v || this.isContinuingFromSharedConversation || this.isContinuingFromSharedProjectConversation || this.isContinuableSharedPost || this.isContinuingFromBranchingConversation, this.callbacks = b ? ? {}, m && (this.sentNotification = !0)
    }
    isFirstCompletionInThread;
    activeBranchLastMessage;
    messagesToUpdate = {};
    allIncompleteMessageIds = new Set;
    responseThreadId;
    isCompletionBlocked = !1;
    isEitherFlagged = !1;
    sentNotification = !1;
    variantsInStreamInfo;
    blurDuringCompletionTracker = new qs;
    completionLatencyTracker;
    preflightTime;
    treatCompletionAsAsync = !1;
    realtimeAsyncCompletion = !1;
    resumeToken;
    analyticsServerRequestId;
    abortController;
    callbacks;
    heartbeatChatReq;
    heartbeatTurnstileToken = null;
    heartbeatProofToken = null;
    heartbeatStartedForTurn = !1;
    heartbeatLastMessageId = null;
    requestHistoryEntryKey = ut();
    updateBeforeRequest(t) {
        Fs.incrementUserMessageCount($() ? xe.LoggedIn : xe.LoggedOut), je.retainThread(this.conversation.id), t.withSpan("completion.submit.request.optimistic_thread_update", () => y(this.conversation.id, s => {
            s.stopConduitToken = s.conduitToken ? ? null, s.prepareState = null, s.firstPrepareTimestamp = null, s.lastPrepareTimestamp = null, s.prepareRequestCount = 0, s.hasSuccessfulPrepareSinceLastRequestReset = !1;
            const o = (this.parentMessageId ? E.getNode(s, this.parentMessageId) : void 0) ? .message.author.role === N.User,
                r = On();
            !Ns() && this.completionType === te.Next && E.hasUserMessage(s) && this.promptMessage ? .author.role === N.User && !this.promptMessage ? .metadata ? .is_visually_hidden_from_conversation && !(o && r) && (s.scrollToMessageId = this.promptMessage ? .id), M.updateTree(s, (a, i) => {
                if (this.parentMessageId && (i = E.getNode(s, this.parentMessageId).id, a.optimisticDeleteAfter(this.parentMessageId)), this.prependMessages)
                    for (const d of this.prependMessages) d.clientMetadata = ye(d.clientMetadata), i = a.addOptimisticMessageNode(i, d);
                if (this.promptMessage) {
                    const d = this.promptMessage;
                    d.clientMetadata = { ...ye(d.clientMetadata),
                        requestId: this.requestId
                    }, i = a.addOptimisticMessageNode(i, d)
                }
                if (this.appendMessages)
                    for (const d of this.appendMessages) d.clientMetadata = ye(d.clientMetadata), i = a.addOptimisticMessageNode(i, d);
                return this.completionType === te.Variant && a.updateNodeMetadata(i, {
                    requestId: this.requestId
                }), i
            }), !this.options ? .disablePlaceholder && !Ae(this.asyncTaskId) && M.addPlaceholderRequestId(s, this.requestId)
        }))
    }
    async sendRequest({
        conduitToken: t,
        turnstileToken: s,
        proofToken: n,
        completionMetadata: o,
        resolvedParentMessageId: r,
        messages: a,
        extraStreamParams: i,
        chatReq: d,
        profiler: g,
        spanContext: c
    }) {
        Je(this.conversation.id, !0), this.heartbeatChatReq = d, this.heartbeatTurnstileToken = s, this.heartbeatProofToken = n, this.heartbeatStartedForTurn = !1, this.heartbeatLastMessageId = a[a.length - 1] ? .id ? ? null;
        let u = !1,
            _ = !1,
            T = !1;
        const f = b => Me(b),
            v = q(this.conversation.id) ? .is_do_not_remember ? ? !1,
            [l, h] = X(() => [lt(this.conversation), ct(this.conversation)]),
            S = new AbortController;
        this.abortController = S, !Ae(this.asyncTaskId) && _e.addRequest(this.requestId, this);
        const m = dt(),
            R = X(this.conversation.serverId$);
        if (this.completionType === te.Variant && R == null) {
            z.addError("Generating variant without conversation_id"), this.handleError(new Error("Regeneration must have conversation_id"));
            return
        }
        const j = Date.now(),
            H = q(this.conversation.id),
            L = Ls(H, j) ? !0 : void 0,
            V = dn({
                atlasModeEnabled: l,
                conversationOrigin: this.initialThread ? .conversationOrigin ? ? null,
                model: this.model,
                completionType: this.completionType,
                prepareState: this.initialThread ? .prepareState ? ? "none",
                conduitToken: t,
                threadId: R,
                isReasoningSkipped: this.isReasoningSkipped,
                asyncTaskId: this.asyncTaskId,
                overrideInferTreatment: m.autoSwitcherTreatmentOverride,
                modelSlugStatsOverride: this.modelSlugStatsOverride,
                continueFromSharedConversationId: this.initialThread ? .continuingFromSharedConversationId,
                branchingFromConversationId: this.initialThread ? .branchingFromConversationId,
                branchingFromMessageId: this.initialThread ? .branchingFromMessageId,
                hideFromHistory: this.initialThread ? .hideFromHistory,
                sharedProjectConversationOwnerId: this.initialThread ? .sharedProjectConversationOwner ? .id,
                sharedProjectConversationId: this.initialThread ? .continuingFromSharedProjectConversationId,
                continueFromSharedPostId: this.initialThread ? .continuingFromSharedPostId,
                forkFromSharedPost: this.initialThread ? .forkFromSharedPost,
                historyDisabled: this.isHistoryAndTrainingDisabled,
                isAnonModeEnabled: this.isAnonModeEnabled,
                isDoNotRemember: v,
                parentMessageId: r,
                messages: a,
                chatReq: d,
                turnstileToken: s,
                proofToken: n,
                completionMetadata: o,
                includeAccountCreationSentinelToken: L,
                contextualInfo: {
                    is_dark_mode: Gt(),
                    time_since_loaded: Math.floor(performance.now() / 1e3),
                    page_height: window.innerHeight,
                    page_width: window.innerWidth,
                    pixel_ratio: window.devicePixelRatio,
                    screen_height: window.screen.height,
                    screen_width: window.screen.width,
                    window_style: zt().windowStyle,
                    ...Tt()
                },
                isOnboardingConversation: o ? .isOnboardingConversation,
                thinkingEffort: this.#i(),
                forceParagen: m.forceParagen,
                forceParagenModel: m.forceParagen ? m.forceParagenModel.value : void 0,
                paragenUiTreatment: m.forceParagen ? m.paragenUiTreatment : void 0,
                forceCounterfactual: m.forceParagen && m.forceCounterfactual,
                counterfactualSearchEvalPreset: m.forceParagen && m.forceCounterfactual ? m.counterfactualSearchEvalPreset ? ? void 0 : void 0,
                forceRateLimit: m.forceRateLimit,
                resetRateLimits: m.resetRateLimits,
                recordRendering: m.recordRendering,
                recordTransformedConvoJson: m.recordTransformedConvoJson,
                disableSystemContentToggling: m.rebaseSystemMessageContent != null,
                forceUseSearch: m.forceUseSearch ? ? void 0,
                paragenStreamType: m.paragenStreamType,
                paragenCotSummaryDisplay: m.paragenCotSummaryDisplay,
                forceParallelSwitch: m.forceParallelSwitch,
                juiceScore: m.juiceScore,
                multimodalJuiceScore: m.multimodalJuiceScore,
                showAllAnswers: m.showAllAnswers,
                ncOverride: m.ncOverride,
                cprOverride: m.cprOverride,
                cmOverride: m.cmOverride,
                srtOverride: m.srtOverride,
                pmOverride: m.pmOverride,
                dspOverride: m.dspOverride,
                sjOverride: m.sjOverride,
                sccOverride: m.sccOverride,
                sjoOverride: m.sjoOverride,
                ...vt() ? {
                    f_completion: !0
                } : {},
                ...xs() ? {
                    f_search: !0
                } : {},
                ...i,
                noAuthAdPreferences: $() ? void 0 : X(Us),
                r2xg7vml: h ? this.canEnableAuraAdultSearch : void 0,
                zafn3kp8: h ? this.isAuraAdultSearchEnabled : void 0
            }, this.turnTracker, c, g, S.signal, this.conversation.id);
        js("next_turn");
        try {
            for await (const b of V) if ("type" in b && b.type === "connected") u || (f("streamOpened"), u = !0), this.handleStreamConnected(b);
            else if (Ce(b)) {
                const p = b;
                p.type === "message" && (_ || (f("messageReceived"), _ = !0), !T && p.message ? .author ? .role === N.Assistant && (f("assistantMessageReceived"), T = !0)), this.handleResponse(p)
            }
        } catch (b) {
            Te(b) || S.signal.aborted ? (f("streamAborted"), this.#e(b)) : (f("streamError"), this.handleError(b))
        } finally {
            u && f("streamClosed"), Je(this.conversation.id, !1)
        }
    }
    async sendResumeRequest({
        conversationId: t,
        resumeToken: s,
        profiler: n
    }) {
        let o = !1,
            r = !1,
            a = !1;
        const i = c => Me(c),
            d = new AbortController;
        this.abortController = d, _e.addRequest(this.requestId, this), y(this.conversation.id, c => {
            M.setRequestIdOnCurrentLeaf(c, this.requestId)
        });
        const g = hn({
            conversationId: t,
            resumeToken: s,
            model: this.model
        }, this.turnTracker, n, d.signal, this.conversation.id);
        try {
            for await (const u of g) if (u.type === "connected") o || (i("streamOpened"), o = !0), this.handleStreamConnected(u);
            else if (Ce(u)) {
                const _ = u;
                _.type === "message" && (r || (i("messageReceived"), r = !0), !a && _.message ? .author ? .role === N.Assistant && (i("assistantMessageReceived"), a = !0)), this.handleResponse(_)
            }
            this.turnTracker.onResumeRequestSucceeded();
            const c = this.turnTracker.result ? .type ? ? fe.Success;
            this.turnTracker.finalizeReloadLifecycle(c, "resume_stream")
        } catch (c) {
            Te(c) || d.signal.aborted ? (i("streamAborted"), this.#e(c)) : (i("streamError"), this.handleError(c))
        } finally {
            o && i("streamClosed")
        }
    }
    async resumeWithPolling({
        conversationId: t,
        profiler: s,
        turnTraceId: n
    }) {
        let o = !1,
            r = !1,
            a = !1;
        const i = c => Me(c),
            d = new AbortController;
        _e.addRequest(this.requestId, this), y(this.conversation.id, c => {
            M.setRequestIdOnCurrentLeaf(c, this.requestId)
        }), this.responseThreadId = t, this.turnTracker.onConversationId(t), this.callbacks ? .onServerThreadId ? .(t), i("streamOpened"), o = !0;
        const g = mn(t, this.turnTracker, d.signal, n);
        try {
            for await (const c of g) if (Ce(c)) {
                const u = c;
                u.type === "message" && (r || (i("messageReceived"), r = !0), !a && u.message ? .author ? .role === N.Assistant && (i("assistantMessageReceived"), a = !0)), this.handleResponse(u)
            }
        } catch (c) {
            Te(c) || d.signal.aborted ? (i("streamAborted"), this.#e(c)) : (i("streamError"), this.handleError(c))
        } finally {
            o && i("streamClosed")
        }
    }#
    i() {
        if (this.model !== Xe) {
            const s = X(() => $t(this.conversation));
            if (this.model !== Xe && !s.configurableThinkingEffort) return
        }
        if (ne("790459319").get("show-juice-control", !1)) return this.thinkingEffort
    }
    handleStreamConnected(t) {
        const {
            serverRequestId: s,
            interruptConversationToken: n
        } = t;
        s && (this.analyticsServerRequestId = s, this.turnTracker.onReceivedServerRequestId(s)), n && y(this.conversation.id, o => {
            o.conduitToken = n
        }), Hs(this.requestId, this.model, s, Vt(this.preflightTime))
    }
    handleResponse = t => {
        if (this.activeBranchLastMessage && this.completionLatencyTracker.onResponse(t, this.activeBranchLastMessage, this.responseThreadId), this.responseThreadId === void 0 && "conversationId" in t) {
            const s = t.conversationId;
            if (this.responseThreadId = s, this.turnTracker.onConversationId(s), this.callbacks ? .onServerThreadId ? .(s), ht(this.conversation.id) && pe(this.conversation.id) !== s && (Yt(this.conversation.id, s), W.logEvent("Attribution: Client Thread to Server Thread", {
                    client_thread_id: this.conversation.id,
                    server_thread_id: s
                })), $() || Kt.set(s), this.isContinuingFromSharedConversation && (y(this.conversation.id, o => {
                    delete o.continuingFromSharedConversationId
                }), Se.logEvent("chatgpt_continue_conversation_first_message_sent"), W.logEvent("Continue Conversation: First Message Sent", {
                    forked_conversation_id: s,
                    shared_conversation_id: this.initialThread ? .continuingFromSharedConversationId
                })), this.isContinuingFromBranchingConversation && y(this.conversation.id, o => {
                    delete o.branchingFromConversationId, delete o.branchingFromMessageId
                }), this.isContinuingFromSharedProjectConversation && y(this.conversation.id, o => {
                    delete o.continuingFromSharedProjectConversationId, delete o.sharedProjectConversationOwner
                }), this.isContinuableSharedPost && y(this.conversation.id, o => {
                    delete o.continuingFromSharedPostId, delete o.forkFromSharedPost
                }), this.isFirstCompletionInThread) {
                const o = q(this.conversation.id);
                if (W.logEvent("Create New Thread"), !this.isHistoryAndTrainingDisabled && Ds(o ? .mode) && $()) {
                    Qt(this.queryClient, E.getGizmoId(o));
                    const r = Jt() && Xt() || Rt(this.conversation.id);
                    !o ? .disableConversationNavigation && X(() => Fn(this.requestHistoryEntryKey, this.conversation.id)) && Bs(Zt, this.queryClient, s, this.isProjectEnabledForGizmo, void 0, r)
                }
            }
            const n = {
                id: this.requestId,
                threadId: this.responseThreadId,
                completionType: this.completionType,
                eventSource: this.eventSource,
                model: this.model
            };
            if (this.completionType === te.Next) {
                const o = E.getConversationTurns(q(this.conversation.id)),
                    r = o.length,
                    a = o.filter(d => d.role === N.User),
                    i = a && a[a.length - 1] ? .messages[0];
                if (i ? .content.content_type === Ie.Text) {
                    const d = i.content.parts.join("").length,
                        g = a ? .length ? ? 0;
                    n.countConversationTurns = r, n.countUserSubmittedMessages = g, n.countLastUserPromptTextMessageLength = d
                }
            }
            W.logEvent("Generate Completion", n)
        }
        switch (t.type) {
            case "num_variants_in_stream":
                this.#g(t);
                break;
            case "moderation":
                this.#y(t);
                break;
            case "url_moderation":
                this.#T(t);
                break;
            case "add-item":
            case "replace-item":
            case "delete-item":
            case "stream-item-start":
            case "stream-item-patch":
            case "stream-item-done":
                this.#S(t);
                break;
            case "message":
                this.#s(t);
                break;
            case "input_message":
                this.#s(t);
                break;
            case "done":
                this.#n();
                break;
            case "gizmo_inline_review":
                this.#r(t);
                break;
            case "title_generation":
                this.#a(t);
                break;
            case "system_hint_suggestion":
                this.#d(t);
                break;
            case "conversation_detail_metadata":
                this.#c(t);
                break;
            case "beacon_ui_response":
                this.#l(t, this.responseThreadId);
                break;
            case "instant_answer_debug":
                this.#h(t);
                break;
            case "toast":
                this.#u(t);
                break;
            case "survey_campaign_effect":
                Ws(t);
                break;
            case "conversation_async_status":
                this.#m(t);
                break;
            case "resume_conversation_token":
                this.#_(t);
                break;
            case "display_crisis_helpline_message":
                this.#p(t);
                break;
            case "display_crisis_helpline_modal":
                this.#f(t);
                break;
            case "ads":
                this.#v(t)
        }
    };#
    t() {
        return this.promptMessage ? this.promptMessage.id : E.getParentPromptNode(q(this.conversation.id), this.parentMessageId) ? .message.id
    }
    handleError(t) {
        const s = fs(t),
            n = s.message,
            o = n === oe,
            r = t instanceof F ? t.code : o ? He.NetworkError : void 0,
            a = t instanceof F ? t.detail ? .can_retry : void 0,
            i = o && $();
        i && !ue("1377659296") && (this.treatCompletionAsAsync = !0), this.turnTracker.onRequestError(s, i, i ? "sse_disconnect" : void 0), i || this.turnTracker.finalizeReloadLifecycle(fe.Error, "resume_stream"), this.debouncedUpdateExistingMessages.flush();
        const d = this.treatCompletionAsAsync && n === oe && !i,
            g = De.defaultMessage,
            c = d ? void 0 : i ? g : n;
        this.turnTracker.logger.info("Stream error surfaced", {
            ui_error_message: c,
            ui_error_hidden: d,
            ui_error_type: d ? "hidden" : i ? "info" : "danger",
            is_recoverable_error: i,
            error_code: r,
            stream_protocol: this.turnTracker.stream_protocol
        }), !d && !(t instanceof zs) && y(this.conversation.id, u => {
            M.removePlaceholderRequestId(u, this.requestId), M.updateTree(u, (_, T) => {
                const f = this.variantsInStreamInfo ? E.getParentPromptNode(u) ? .id ? ? T : T,
                    v = {
                        err: i ? De : n,
                        errType: i ? "info" : "danger",
                        errCode: i ? He.NetworkErrorWithReconnection : r,
                        completionSampleFinishTime: Date.now(),
                        canRetry: i ? !1 : a
                    },
                    l = _.getNodeIfExists(f);
                if (l ? .message.author.role !== N.Assistant || l.message.content.content_type !== Ie.Text) {
                    const h = es("");
                    return h.clientMetadata = { ...h.clientMetadata,
                        ...v
                    }, _.addOptimisticMessageNode(f, h)
                } else _.updateNodeMetadata(f, v)
            })
        });
        try {
            typeof n == "string" && n.toLowerCase().includes("blackout hours") && Be(Pn)
        } catch {}
        try {
            const u = q(this.conversation.id);
            if (E.getLastMessageSystemHints(u) ? .includes(We)) {
                const f = t instanceof F ? t : void 0,
                    v = f ? .status,
                    l = f ? .isClientError() ? ? !1,
                    h = f ? .isServerError() ? ? !1,
                    S = o ? "network" : h ? "server" : l ? "client" : "unknown";
                z.addAction("agent.conversation.start_failed", {
                    request_id: this.requestId,
                    model: this.model,
                    error_code: r ? ? "unknown",
                    is_network_error: o,
                    is_recoverable_error: i,
                    error_status: v,
                    is_client_error: l,
                    is_server_error: h,
                    error_type: S
                })
            }
        } catch {}
        if (o) {
            const u = {
                source: "request_stream",
                type: i ? "info_polling" : "error"
            };
            W.logEvent("chatgpt_web_network_error", u), Se.logEvent("chatgpt_web_network_error", null, u)
        }
        switch (r) {
            case ze.ContentPolicy:
            case ze.ContentOrTos:
            case ge.ModelCapExceeded:
            case ge.HistoryDisabledConversationNotFound:
                break;
            default:
                n !== void 0 && Se.logEvent("chatgpt_conversation_error_web", n)
        }
        if (this.blurDuringCompletionTracker.onMessageError(), Ze(s), this.#o(), be.publish({
                kind: "completionFinished",
                serverThreadId: this.responseThreadId
            }), t instanceof F && t.code === ge.ModelCapExceeded) {
            const u = t.detail ? .clears_in;
            u && (Gs(new Date(Date.now() + u * 1e3).toISOString()), setTimeout(() => {
                $s()
            }, u * 1e3))
        }
    }#
    r({
        gizmoId: t
    }) {
        y(this.conversation.id, s => {
            s.promptGptRating = {
                gizmoId: t
            }
        })
    }#
    a(t) {
        Vs(t.conversation_id, t.title, ts.Generated), !this.isProjectEnabledForGizmo && !this.initialThread ? .hideFromHistory && ss(t.conversation_id, t.title)
    }#
    d(t) {
        const s = this.#t();
        if (!s) return;
        const n = t.chips;
        n.length !== 0 && y(this.conversation.id, o => {
            M.updateTree(o, r => {
                const a = r.getNodeIfExists(s);
                if (!a) return;
                const i = a.message.metadata ? .system_hint_suggestions ? ? [],
                    d = new Map;
                for (const g of i) d.set(g.system_hint, g);
                for (const g of n) d.set(g.system_hint, g);
                r.updateNodeMessageMetadata(s, {
                    system_hint_suggestions: Array.from(d.values())
                })
            })
        })
    }#
    c(t) {
        const {
            default_model_slug: s,
            atlas_mode_enabled: n
        } = t;
        s && !ns({
            systemHints: E.getLastMessageSystemHints(q(this.conversation.id))
        }) && y(this.conversation.id, r => {
            r.defaultModelId = s
        }), n != null && y(this.conversation.id, r => {
            r.atlasModeEnabled = n
        }), ue("3315017149") && os(t) && this.queryClient.invalidateQueries({
            queryKey: is()
        }), rs.updateDetails(t)
    }#
    l(t, s) {
        const n = this.activeBranchLastMessage ? .id ? ? E.getCurrentLeafId(q(this.conversation.id));
        as.updateDetails(t, s ? ? void 0, n)
    }#
    u(t) {
        const s = ds(),
            n = t.toast_id ? ? void 0,
            o = n ? {
                id: n
            } : void 0,
            r = n ? {
                id: n
            } : void 0,
            a = n ? {
                id: n,
                toastId: n
            } : void 0;
        if (t.level === "warning") {
            s.warning(t.message, o);
            return
        }
        if (t.level === "success") {
            s.success(t.message, r);
            return
        }
        s.danger(t.message, a)
    }#
    h(t) {
        y(this.conversation.id, s => {
            M.updateTree(s, (n, o) => {
                const r = n.getNodeIfExists(o);
                if (!r) return;
                const a = r.message.metadata ? .__internal && typeof r.message.metadata.__internal == "object" && !Array.isArray(r.message.metadata.__internal) ? r.message.metadata.__internal : {},
                    i = a.instant_answer_debug_info && typeof a.instant_answer_debug_info == "object" && !Array.isArray(a.instant_answer_debug_info) ? a.instant_answer_debug_info : {};
                n.updateNodeMessageMetadata(o, {
                    __internal: { ...a,
                        instant_answer_debug_info: { ...i,
                            ...t.payload
                        }
                    }
                })
            })
        })
    }#
    m(t) {
        const {
            async_status: s
        } = t;
        s === J.REALTIME && (this.realtimeAsyncCompletion = !0), this.responseThreadId && de(this.responseThreadId, {
            source: ee.SERVER,
            value: s
        }, {
            path: "completion_stream_async_status",
            requestId: this.requestId
        }), de(this.conversation.id, {
            source: ee.SERVER,
            value: s
        }, {
            path: "completion_stream_async_status",
            requestId: this.requestId
        })
    }#
    _(t) {
        const {
            token: s
        } = t;
        this.resumeToken = s ? ? void 0;
        const n = t.conversation_id ? ? this.responseThreadId;
        s != null && n != null && ve.set(n, s, this.turnTracker.turn_trace_id);
        const o = q(this.conversation.id),
            a = E.getLastMessageSystemHints(o) ? .includes(We);
        this.realtimeAsyncCompletion && a && z.addAction("agent.conversation.start_succeeded", {
            conversation_id: t.conversation_id ? ? this.responseThreadId ? ? "",
            request_id: this.requestId,
            model: this.model
        })
    }#
    g(t) {
        this.variantsInStreamInfo = t, y(this.conversation.id, s => {
            M.updateTree(s, (n, o) => {
                const r = E.getParentPromptNode(s) ? ? n.getNodeByIdOrMessageId(o);
                n.updateNodeMetadata(r.id, {
                    variantsInStreamInfo: this.variantsInStreamInfo
                })
            })
        })
    }#
    p(t) {
        y(this.conversation.id, s => {
            M.updateTree(s, n => {
                n.updateNodeMessageMetadata(t.messageId, {
                    crisis_helpline_message: t
                })
            })
        })
    }#
    f(t) {
        Be(Ys, {
            effect: t
        })
    }#
    v(t) {
        const s = this.#t();
        W.logStructuredEvent(cs, {
            requestId: this.analyticsServerRequestId,
            conversationId: X(this.conversation.serverId$),
            messageId: s,
            displayType: t.content ? .type,
            cardCount: ls(t.content ? .type === "single_advertiser_ad_unit" ? t.content.carousel_cards.length : t.content ? .type === "multi_advertiser_ad_unit" ? t.content.ads.length : void 0)
        });
        const n = q(this.conversation.id),
            o = E.lastUserMessage(n) ? .id;
        !s || o !== s ? W.logStructuredEvent(us, {
            requestId: this.analyticsServerRequestId,
            conversationId: X(this.conversation.serverId$),
            messageId: s,
            rejectionReason: hs.CHATGPT_ADS_PLACEMENT_REJECTION_REASON_NOT_LATEST_PROMPT
        }) : Ks.set(this.conversation, s, t), t.visibility.status === "hidden" && Qs(window.document.querySelector("[data-scroll-root]"), () => an(this.conversation))
    }#
    y(t) {
        const {
            isCompletion: s,
            flagged: n,
            blocked: o,
            disclaimers: r
        } = t, a = !!r ? .length;
        (n || o || a) && (this.debouncedUpdateExistingMessages.flush(), this.isEitherFlagged = !0, o && s && (this.isCompletionBlocked = !0), Js(t, this.conversation.id))
    }#
    T(t) {
        const {
            conversationId: s,
            url: n,
            isSafe: o
        } = t;
        o && y(s, r => {
            r.safeUrls.push(n)
        })
    }#
    S(t) {
        "item" in t && t.item.message.author.role === N.Assistant && !this.heartbeatStartedForTurn && (this.heartbeatStartedForTurn = !0, et({
            conversationId: this.conversation.id,
            lastMessageId: this.heartbeatLastMessageId,
            chatReq: this.heartbeatChatReq,
            turnstileToken: this.heartbeatTurnstileToken,
            proofToken: this.heartbeatProofToken
        })), y(this.conversation.id, s => {
            M.updateTree(s, n => {
                n.processUpdate(t)
            })
        })
    }#
    s({
        type: t,
        message: s,
        conversationId: n
    }) {
        t === "message" && (this.activeBranchLastMessage = s), s.author.role === N.Assistant && !this.heartbeatStartedForTurn && (this.heartbeatStartedForTurn = !0, et({
            conversationId: this.conversation.id,
            lastMessageId: this.heartbeatLastMessageId,
            chatReq: this.heartbeatChatReq,
            turnstileToken: this.heartbeatTurnstileToken,
            proofToken: this.heartbeatProofToken
        }));
        try {
            const o = q(this.conversation.id),
                r = Date.now(),
                a = Xs(o, r),
                i = Zs(s, a);
            i != null && y(this.conversation.id, d => {
                d.accountCreationFlow = {
                    state: i,
                    updatedAtMs: r
                }
            })
        } catch {}
        if ((Ge(s) || en(s)) && this.callbacks ? .onImageGenMessage ? .(s), s ? .author.role === N.Tool && s ? .author.name === "bio") {
            const o = s.metadata ? .gizmo_id;
            setTimeout(() => {
                this.queryClient.invalidateQueries({
                    queryKey: tn(o)
                }), this.queryClient.invalidateQueries({
                    queryKey: sn()
                })
            }, 5e3)
        }
        if (s.metadata ? .trigger_async_ux && (this.treatCompletionAsAsync = !0, de(this.conversation.id, {
                source: ee.SERVER,
                value: J.STREAMING
            }, {
                path: "completion_message_trigger_async_ux",
                requestId: this.requestId
            })), E.getTree(q(n)).containsNodeOrMessageId(s.id)) {
            this.messagesToUpdate[s.id] = s, this.debouncedUpdateExistingMessages();
            const o = s.metadata ? .parent_id;
            if (!o) return;
            y(this.conversation.id, r => {
                M.updateTree(r, a => {
                    const i = a.getNodeIfExists(s.id),
                        d = a.getNodeIfExists(o);
                    if (!i) {
                        z.addError(new Error(`CompletionRequest handleMessage: message ${s.id} not found in tree`));
                        return
                    }
                    if (!d) {
                        z.addAction("conversation.input_missing_expected_parent", {
                            message_id: s.id,
                            parent_id: o,
                            completion_type: this.completionType
                        });
                        return
                    }
                    i.parentId !== d.id && a.moveNode(d.id, i.id)
                })
            });
            return
        }
        this.debouncedUpdateExistingMessages.flush(), y(this.conversation.id, o => {
            M.updateTree(o, (r, a) => {
                const i = {
                    requestId: this.requestId
                };
                s.status !== "in_progress" ? i.completionSampleFinishTime = Date.now() : this.allIncompleteMessageIds.add(s.id);
                const d = { ...s,
                    clientMetadata: i
                };
                !$e(d) && !ms(d) && M.removePlaceholderRequestId(o, this.requestId), s.metadata ? .invoked_resource && (o.startedWithByoMcp || = s.metadata ? .invoked_resource.publish_status === "private");
                const g = s.metadata ? .parent_id;
                if (g) {
                    if (!r.containsNodeOrMessageId(g)) return;
                    const c = r.getNodeByIdOrMessageId(g).children,
                        u = r.addMessageNode(g, d);
                    if (this.completionType === te.Next && (this.variantsInStreamInfo ? .num_variants_in_stream ? ? 0) <= 1 && c.length > 0) {
                        for (const _ of c) _ !== u && r.moveNode(u, _);
                        return
                    }
                    return u
                } else {
                    const c = r.findFirst(u => u.message.author.role !== N.Root && !$e(u.message));
                    if (c) r.prependNode(c.id, d);
                    else return r.addMessageNode(a, d)
                }
            })
        })
    }
    debouncedUpdateExistingMessages = _s(() => {
        if (this.isCompletionBlocked) return;
        const t = Object.values(this.messagesToUpdate);
        t.length !== 0 && (y(this.conversation.id, s => {
            M.updateTree(s, n => {
                for (const o of t) n.updateNodeMessage(o.id, o), o.status !== "in_progress" && (n.updateNodeMetadata(o.id, {
                    completionSampleFinishTime: Date.now()
                }), this.allIncompleteMessageIds.delete(o.id))
            })
        }), this.messagesToUpdate = {})
    }, 50, {
        leading: !0,
        maxWait: 50
    });#
    e(t) {
        this.debouncedUpdateExistingMessages.flush(), y(this.conversation.id, s => {
            M.updateTree(s, n => {
                for (const o of this.allIncompleteMessageIds) n.updateNodeMessageMetadata(o, {
                    finish_details: {
                        type: "interrupted"
                    }
                })
            })
        }), this.#n()
    }#
    n() {
        if (this.debouncedUpdateExistingMessages.flush(), this.isEitherFlagged || be.publish({
                kind: "completionFinished",
                serverThreadId: this.responseThreadId
            }), this.isFirstCompletionInThread && this.responseThreadId) {
            const t = E.getGizmoId(q(this.responseThreadId));
            this.queryClient.getQueryState([Ve, {
                gizmoId: t
            }]) ? .fetchStatus !== "fetching" && ((this.queryClient.getQueryData([Ve, {
                gizmoId: t
            }]) ? .pages.flatMap(a => a.items) ? ? []).some(a => a.id === this.responseThreadId) || (gs(this.queryClient, t), W.logEventWithStatsig("Refetch Project Conversation in Completion Request", "chatgpt_web_projects_completion_request_new_chat_refetch")))
        }
        be.publish({
            kind: "createConversation",
            clientThreadId: this.conversation.id
        }), this.blurDuringCompletionTracker.onMessageDone(), Ze(), this.responseThreadId && ve.remove(this.responseThreadId), this.#o()
    }
    async maybeSendNotification() {
        if (this.sentNotification) return;
        const t = q(this.conversation.id);
        if (t ? .disableConversationNavigation) return;
        const s = t ? .title ? ? void 0;
        if (!s) return;
        const n = E.getCurrentNode(t).message;
        if (Ge(n) && !nn(n)) return;
        const o = i => i.type === "grouped_webpages" && i.style === "hidden",
            r = n.content,
            a = r ? .content_type === Ie.Text ? on(await ot(() =>
                import ("./1a5e078c-os7yi9hgehd2ixnd.js").then(i => i.c), __vite__mapDeps([6, 2, 1, 3, 7, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26])).then(i => i.messageTextToPlaintext(r.parts[0] ? ? "", (n.metadata ? .content_references ? ? []).filter(d => !o(d)))), 120) : void 0;
        ps({
            title: s,
            subtitle: a,
            clientThreadId: this.conversation.id
        }), this.sentNotification = !0
    }#
    o() {
        yt(this.conversation, null), y(this.conversation.id, t => {
            if (t.shouldRefetchConvoOnFinalize) {
                const s = pe(this.conversation.id);
                s && (rn(s, {
                    skipIfExisting: !1,
                    source: "completion_finalize_refetch"
                }), M.setShouldRefetchConvoOnFinalize(t, !1))
            }
            M.removePlaceholderRequestId(t, this.requestId), M.updateTree(t, s => {
                for (const n of this.allIncompleteMessageIds) s.updateNodeMetadata(n, {
                    completionSampleFinishTime: Date.now()
                })
            })
        }), this.allIncompleteMessageIds.clear(), setTimeout(() => {
            if (this.treatCompletionAsAsync || this.realtimeAsyncCompletion) {
                const t = this.treatCompletionAsAsync ? J.STREAMING : J.REALTIME,
                    s = n => {
                        if (!n) return;
                        const o = tt(n);
                        (o == null || o.source === ee.CLIENT) && de(n, {
                            source: ee.SERVER,
                            value: t
                        }, {
                            path: "completion_finalize_async_status_promotion",
                            requestId: this.requestId
                        })
                    };
                s(this.responseThreadId), s(this.conversation.id)
            } else {
                const t = tt(this.conversation.id);
                t ? .value !== J.REALTIME && t ? .value !== J.REALTIME_BUSY && t ? .value !== J.REALTIME_BACKGROUND && (de(this.conversation.id, {
                    source: ee.CLIENT,
                    value: J.UNREAD
                }, {
                    path: "completion_finalize_unread",
                    requestId: this.requestId
                }), this.maybeSendNotification())
            }
            this.abortController = void 0, _e.removeRequest(this.requestId), je.releaseThread(this.conversation.id)
        }, 0)
    }
}

function Rt(e) {
    return ht(e) && window.location.pathname.endsWith(`/c/${e}`)
}

function Fn(e, t) {
    return ut() === e || Rt(t)
}
export {
    Dn as C, nt as g, Hn as m, An as p
};
//# sourceMappingURL=b9ebfa06-dm8xq0zfweyjlyrr.js.map