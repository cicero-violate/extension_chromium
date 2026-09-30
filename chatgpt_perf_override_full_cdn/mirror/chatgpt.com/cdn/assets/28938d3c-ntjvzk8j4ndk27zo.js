const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/72f8c987-lmieg3bcxuv4hnlp.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/conversation-small-cqp6votf.css", "assets/5626b731-m5ne022mkddnvjos.js", "assets/74bc9fb5-lpkvfmw854cstwi7.js", "assets/3e64cc41-gc5mo088m8hqml4y.js", "assets/1a1bda43-ccqt51bvbkt9kl39.js", "assets/a6b829b0-e9ve1fw8ijaccmyb.js", "assets/1f6fa6f6-e8q3ftnb1yq9szd7.js", "assets/7f2fe580-2qh7krtqai1xyx2f.js", "assets/473287f8-nkco7wh9dijykesu.js", "assets/bb54068a-r109lneo6fsdnd69.js", "assets/c82f91b2-d0j1tjld8r0bk41k.js", "assets/65f15ce8-er7901w7j9nww2f2.js", "assets/8a4ba318-icb6f27hecaxunne.js", "assets/33607480-khq1dcn5q6qj894m.js", "assets/1bc04b52-d250f2ixfd4dz9a0.js", "assets/fed4caac-w50eq5iba8wprw7p.js", "assets/c2ffba09-gf3vyhjjhtxxug36.js", "assets/024dc204-nzaficij0fp92mue.js", "assets/1bc04b52-n35w5oqxohw3oyli.js", "assets/1bc04b52-lymnctp12j4ukscl.js", "assets/1bc04b52-h1em0bjkpkjv8ykw.js", "assets/1bc04b52-homyy2s5cy2i6moh.js", "assets/1bc04b52-pfqcgruptyx7togk.js", "assets/1bc04b52-hnu6g21afx0au4ng.js", "assets/1bc04b52-hpmor2vxay5xyk5e.js", "assets/93b8edb0-i4v0k7e37nk0jqqy.js", "assets/1bc04b52-gtpe46xocf6zem4g.js", "assets/puik-widget-renderer-ij5rtrmi.css"]))) => i.map(i => d[i]);
import {
    _ as Ue,
    r as u,
    z as ze,
    j as _
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    r as he
} from "./7f00cfec-f04y2v5idy58f22s.js";
import {
    cW as fe,
    g as M,
    R as be,
    vm as He,
    cM as Ke,
    du as Je,
    dI as Ge,
    b8 as Ve,
    cJ as Ye,
    fi as Xe,
    et as Se,
    cI as Ze,
    y9 as et,
    ch as tt,
    fB as st,
    jp as nt,
    AD as rt,
    fW as ot,
    _ as at,
    jY as it,
    ix as ct,
    bi as ke
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    gj as pe,
    eC as R,
    os as q,
    eF as C,
    ot as w,
    m3 as ge,
    ou as T,
    ov as m,
    ow as we,
    ox as dt,
    oy as ut,
    oz as lt,
    oA as ft,
    oB as pt,
    oC as gt,
    oD as vt,
    dK as yt,
    cq as mt,
    oE as _t,
    oF as Ct,
    oG as ht,
    ej as bt,
    oH as St,
    oI as kt,
    b8 as wt,
    oJ as Tt,
    oK as It
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    u as At
} from "./5983c1e5-d8kn80dssel0a0ls.js";
const E = {
        type: C.Conversation
    },
    Et = e => {
        if (!e) return E;
        switch (e.type) {
            case "curate":
            case "preview":
                return {
                    type: C.Preview
                };
            case "card":
                return E;
            case "on-card":
                return e.cardId ? {
                    type: C.OnCard,
                    cardId: e.cardId
                } : E;
            case "task":
            case "task-edit":
                return e.taskId ? {
                    type: C.TaskEdit,
                    taskId: e.taskId,
                    taskName: e.taskName ? ? "Task",
                    composerMessage: e.composerMessage
                } : E;
            default:
                return E
        }
    },
    ve = e => {
        const t = e ? .trim() ? ? "";
        return t.length > 0 ? t : null
    },
    Pt = e => {
        if (e.surveyConfig) return e.surveyConfig;
        const t = e.surveyTopLevelConfig;
        if (t) return "survey_config" in t ? t.survey_config : t.surveyConfig
    },
    Dt = e => {
        if (!e) return null;
        const t = e.overlay_content ? ? e.overlayContent,
            s = ve(e.content ? .title),
            n = ve(t ? .title);
        return s ? ? n ? ? null
    },
    xt = (e, t) => {
        if (!e) return null;
        const s = "surveyTopLevelConfig" in e ? e.surveyTopLevelConfig : void 0;
        if (s) {
            const n = "survey_config" in s ? s.survey_config : s.surveyConfig,
                r = ("feedback_conversation_id" in s ? s.feedback_conversation_id : s.feedbackConversationId) ? ? t;
            if (!n || !r) return null;
            const o = ("fab_short" in s ? s.fab_short : s.fabShort) ? ? null,
                i = ("fab_long" in s ? s.fab_long : s.fabLong) ? ? null;
            return {
                feedback_conversation_id: r,
                fab_short: o,
                fab_long: i,
                survey_config: n
            }
        }
        return e.type === "survey-reply" && e.surveyConfig && t ? {
            feedback_conversation_id: t,
            fab_short: null,
            fab_long: null,
            survey_config: e.surveyConfig
        } : null
    },
    ye = (e, t, s) => {
        M().setQueryData(e, r => e === m.recentPulse && t !== T || r ? .survey && !(r.id !== t || r.survey.feedback_conversation_id !== s.feedback_conversation_id) ? r : { ...r ? ? {
                id: t,
                items: [],
                feedback: null,
                survey: null,
                onboarding: null,
                expires_at: null,
                date_timestamp: null
            },
            survey : s
        })
    },
    Rt = (e, t) => {
        const s = xt(e, t);
        if (!s) return;
        const n = (e && "feedId" in e ? e.feedId : void 0) ? ? T;
        ye(m.recentPulse, n, s), n && n !== T && ye(["pulse-feed", n], n, s)
    };

function Ft(e, t) {
    if (t.pulsePrompt ? .type === "surveyReply") {
        if (!t.conversationId) return;
        const n = pe(t.pulsePrompt.userMessage ? ? ""),
            r = t.pulsePrompt.targetedReply ? ? null,
            o = t.pulsePrompt.isAutoSend ? ? !1,
            i = R();
        q.set(t.conversationId), o ? fe(() => {
            i.autoSendCompletion = {
                userMessage: n,
                targetedReply: r
            }, i.shouldAutoSendCompletion$.set(!0), i.openFeedbackView({
                type: C.Conversation
            }, {
                anchorConversationId: e,
                source: w.Reactive
            })
        }) : i.openFeedbackView({
            type: C.Preview,
            populatePrompt: {
                type: "surveyReply",
                userMessage: n,
                targetedReply: r
            }
        }, {
            anchorConversationId: e,
            source: w.Reactive
        });
        return
    }
    if (t.pulseOverlayType && Rt(t.pulseOverlayType, t.conversationId), t.pulseOverlayType ? .type === "survey-reply") {
        if (!t.conversationId) return;
        const n = Pt(t.pulseOverlayType),
            r = Dt(n),
            o = t.pulseOverlayType.suggestion,
            i = o ? .prompt ? ? o ? .text ? ? "",
            d = pe(i),
            c = o ? .isAutoSend ? ? o ? .is_auto_send ? ? !1,
            g = o ? .type === "sugar_task" ? null : r,
            v = R();
        q.set(t.conversationId), c ? fe(() => {
            v.autoSendCompletion = {
                userMessage: d,
                targetedReply: g
            }, v.shouldAutoSendCompletion$.set(!0), v.openFeedbackView({
                type: C.Conversation
            }, {
                anchorConversationId: e,
                source: w.Reactive
            })
        }) : v.openFeedbackView({
            type: C.Preview,
            populatePrompt: {
                type: "surveyReply",
                userMessage: d,
                targetedReply: g
            }
        }, {
            anchorConversationId: e,
            source: w.Reactive
        });
        return
    }
    if (t.pulseOverlayType ? .type === "card") {
        const n = t.pulseOverlayType.cardId;
        if (!n) return;
        const r = Mt(n),
            o = t.conversationId ? ? r,
            i = !!t.conversationId;
        if (o) ge.set(o), me(n, o, {
            forceConversationId: i
        });
        else {
            const d = Wt(n);
            ge.set(d), me(n, d, {
                forceConversationId: !1
            })
        }
        R().openCardView(n, {
            anchorConversationId: e,
            source: w.Reactive
        });
        return
    }
    if (!t.conversationId) return;
    q.set(t.conversationId);
    const s = Et(t.pulseOverlayType);
    R().openFeedbackView(s, {
        anchorConversationId: e,
        source: w.Reactive
    })
}
const Mt = e => M().getQueryData(m.pulseCard(e)) ? .conversation_id ? ? null,
    Wt = e => {
        const t = He(),
            s = t.id,
            n = Ke(s),
            r = Je(),
            o = M();
        return n || Ge.initThread({
            clientThreadId: s,
            conversationMode: {
                kind: Ve.PrimaryAssistant
            },
            userId: r ? .user ? .id,
            accountId: r ? .account ? .id,
            disableConversationNavigation: !0,
            pulseCardId: e
        }), Ye(() => t.serverId$() !== void 0, () => {
            const i = t.serverId$();
            i && (Ze(i, d => (d.disableConversationNavigation = !0, d)), ut(o, e, i))
        }), he({
            callsiteId: "request_completion.pulse.open_pulse_overlay.1",
            conversation: t,
            sourceEvent: new Event("pulse-card-stream"),
            promptMessage: Se(""),
            completionType: Xe.Next,
            extraStreamParams: {
                pulseCompletionParams: {
                    type: "card",
                    card_id: e
                }
            }
        }), s
    },
    me = async (e, t, s) => {
        const n = s ? .forceConversationId ? ? !0,
            r = M(),
            o = r.getQueryData(m.pulseCard(e));
        if (o) {
            const c = n ? t : o.conversation_id ? ? t,
                f = { ...o,
                    conversation_id: c
                };
            r.setQueryData(m.pulseCard(e), f), Q(r, f);
            return
        }
        const i = we() ? ? T,
            d = {
                id: e,
                feed_id: i,
                content_type: "card",
                conversation_id: t,
                is_saved: !1,
                is_dismissed: !1,
                card_type: "core"
            };
        r.setQueryData(m.pulseCard(e), d), Q(r, d);
        try {
            const c = await be.safeGet("/feed/card/{card_id}", {
                parameters: {
                    path: {
                        card_id: e
                    }
                }
            });
            if (!c) return;
            const f = r.getQueryData(m.pulseCard(e)),
                g = n ? t : f ? .conversation_id ? ? t,
                v = { ...c,
                    conversation_id: g
                };
            r.setQueryData(m.pulseCard(e), v), Q(r, v)
        } catch {}
    },
    Q = (e, t) => {
        const s = we(),
            n = s && s !== T ? ["pulse-feed", s] : m.recentPulse;
        e.setQueryData(n, r => {
            const o = r ? .items ? ? [];
            let i = !1;
            const d = o.map(c => dt(c) && c.id === t.id ? (i = !0, t) : c);
            return i || d.unshift(t), r ? { ...r,
                items: d
            } : {
                id: s ? ? T,
                items: d,
                feedback: null,
                survey: null,
                onboarding: null,
                expires_at: null,
                date_timestamp: null
            }
        })
    },
    Lt = "gzip-json-base64url-v1",
    $ = e => !!e && typeof e == "object" && !Array.isArray(e),
    jt = e => $(e) && e.__encoding === Lt && typeof e.__compressed == "string",
    Ot = e => {
        if (e !== void 0) {
            if (!jt(e)) return $(e) ? e : void 0;
            try {
                const t = et(e.__compressed),
                    s = new TextDecoder().decode(At(t)),
                    n = JSON.parse(s);
                return $(n) ? n : void 0
            } catch (t) {
                console.warn("Failed to decode compressed widget state", t);
                return
            }
        }
    },
    Nt = !1;
let Bt = null,
    qt = null;
const Qt = tt(() => Ue(() =>
        import ("./72f8c987-lmieg3bcxuv4hnlp.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]))),
    F = e => typeof e == "string" && e.startsWith("1");

function Te(e, t) {
    if (!F(t)) return e;
    let s;
    if ("props" in e) {
        const {
            children: c,
            props: f = {},
            ...g
        } = e;
        s = { ...g,
            ...f
        }
    } else {
        const {
            children: c,
            ...f
        } = e;
        s = f
    }
    const n = e.children ? ? [],
        o = (Array.isArray(n) ? n : [n]).filter(c => c != null).map(c => Te(c, t)),
        {
            type: i,
            ...d
        } = s;
    if (typeof i != "string") throw new Error("Invalid DIL node: missing widget type");
    return { ...d,
        type: i,
        children: o
    }
}
const $t = e => {
        if (!e || typeof e != "object") return null;
        const t = e.props;
        if (!t || typeof t != "object") return null;
        const s = t.payload;
        return s && typeof s == "object" && !Array.isArray(s) ? s : null
    },
    Ie = (e, t) => {
        const s = e.onClickAction;
        if (s && typeof s == "object" && s.type === t) {
            const o = $t(s);
            if (o) return o
        }
        const n = e.children,
            r = Array.isArray(n) ? n : n ? [n] : [];
        for (const o of r) {
            if (!o || typeof o != "object") continue;
            const i = Ie(o, t);
            if (i) return i
        }
        return null
    },
    Ut = (e, t) => {
        if (e)
            for (const s of t) {
                const n = e[s];
                if (typeof n == "string" && n) return n
            }
    },
    zt = e => !Ut(e, ["card_id", "cardId"]),
    Ae = e => {
        if (typeof e.detail == "string") return e.detail;
        if (e.detail && typeof e.detail == "object") {
            const t = e.detail.message ? ? e.detail.error ? .message ? ? e.detail.error;
            if (typeof t == "string") return t
        }
        return e.message
    },
    _e = e => !(e instanceof ke) || e.status !== 404 ? !1 : Ae(e) === "Not found",
    Ce = e => !(e instanceof ke) || e.status !== 404 ? !1 : Ae(e) === "Message not found",
    Ht = e => {
        if (e) try {
            return JSON.stringify(e)
        } catch {
            return
        }
    },
    Xt = ({
        dil: e,
        dilVersion: t,
        dilUrl: s,
        rootWidget: n,
        widgetRefId: r,
        widgetType: o,
        widgetName: i,
        widgetContainsPii: d,
        refIndex: c
    }) => {
        const f = st(),
            g = nt(),
            v = rt(),
            U = lt({
                calendarPreferenceFeatureEnabled: Nt,
                CalendarPreferenceModal: Bt
            }),
            h = u.useMemo(() => {
                const a = n ? ? (e ? Te(e, t) : null);
                if (!a) throw new Error("DILWidget requires either a dil or rootWidget");
                return a
            }, [n, e, t]),
            W = h.theme ? ? v ? ? "light",
            z = u.useRef(null),
            [Ee, Pe] = u.useState(!1),
            P = u.useRef(null),
            H = u.useRef(!1),
            De = u.useMemo(() => ({ ...h,
                theme: W
            }), [h, W]),
            K = !F(t),
            xe = K ? "flat" : "packed",
            J = K ? n ? ? e : e,
            Re = ft({
                mode: xe,
                widget: J
            }, g),
            Fe = pt(),
            Me = gt(),
            {
                openThreadSidebar: G
            } = vt(f),
            {
                resetSidebarHistory: V
            } = yt(),
            I = u.useContext(mt),
            Y = _t(),
            L = !!I ? .message ? .metadata ? .chatgpt_sdk ? .is_custom_agent,
            D = I ? .clientThreadId,
            y = ot(D),
            b = I ? .message,
            p = b ? .id,
            We = !!(p && y),
            j = u.useMemo(() => Ct({
                message: b,
                refIndex: c,
                widgetRefId: r
            }), [b, c, r]),
            x = s ? ? j.dilUrl,
            O = o ? ? "dil",
            N = i ? ? j.widgetName,
            X = d ? ? j.widgetContainsPii,
            Z = I ? .message ? .metadata ? .view_state,
            ee = r && Z ? .widgets ? Z.widgets[r] : void 0,
            S = u.useMemo(() => Ot(ee), [ee]),
            te = S !== void 0,
            se = I ? .message ? .metadata ? .genui_refresh,
            ne = b ? .metadata ? .is_complete ? ? (b ? .status ? b.status !== "in_progress" : !0),
            B = Me && We && ne && Ee && !L,
            Le = !!qt && !Y && !L,
            je = u.useMemo(() => ({
                error_boundary: "DILWidgetRenderer",
                dil_version: t ? ? "unknown",
                widget_renderer_type: h.type,
                widget_type: O,
                widget_name: N,
                widget_contains_pii: X,
                widget_ref_id: r,
                ref_index: c,
                message_id: p,
                client_thread_id: D,
                server_thread_id: y,
                has_view_state: te,
                is_legacy_dil_version: F(t),
                dil_url: x,
                dil_url_present: !!x
            }), [h.type, D, t, x, N, X, O, te, p, c, y, r]),
            Oe = u.useCallback(() => {
                P.current = null
            }, []),
            {
                onRenderFailure: Ne
            } = ht({
                context: je,
                onFailure: Oe
            }),
            Be = u.useCallback(a => {
                z.current = a, Pe(a != null)
            }, []),
            re = u.useCallback(({
                query: a,
                category: l = "ask_sidebar",
                extraParams: k
            }) => {
                !a || !p || (V(), G({
                    type: "entity",
                    debugThreadId: void 0,
                    messageId: p,
                    contentReferenceStartIndex: 0,
                    query: a,
                    category: l,
                    extraParams: k
                }))
            }, [p, G, V]),
            oe = u.useCallback((a, l) => {
                at.logStructuredEvent(it, {
                    eventName: a,
                    eventData: Ht(l)
                })
            }, []),
            ae = u.useCallback(async a => {
                !f || !a ? .trim() || await he({
                    callsiteId: "request_completion.dil.dil_widget.1",
                    conversation: f,
                    promptMessage: Se(a.trim()),
                    eventSource: "mouse"
                })
            }, [f]),
            ie = u.useCallback(a => {
                f && Ft(f.id, a)
            }, [f]),
            ce = bt.useStore(),
            de = u.useMemo(() => ({
                toaster: g,
                calendar: U,
                openEntitySidebar: re,
                issueNewTurn: ae,
                imageLightbox: ce,
                logEvent: oe,
                openPulseOverlay: ie
            }), [U, ae, re, oe, ie, g, ce]),
            qe = u.useCallback(async ({
                type: a,
                payload: l
            }, k = "client") => {
                if (k === "server") {
                    const $e = r ? ? (p && c !== void 0 ? `${p}:${c}` : void 0);
                    return St({
                        actionType: a,
                        payload: l,
                        conversationId: y,
                        messageId: p,
                        refId: $e,
                        toaster: g
                    })
                }
                const ue = typeof a == "string" && a.startsWith("card.") && zt(l),
                    le = ue && a ? Ie(h, a) : null,
                    Qe = ue ? le ? { ...le,
                        action: a
                    } : void 0 : l;
                return kt({
                    payload: Qe,
                    context: de,
                    library: It,
                    actionType: a
                })
            }, [de, h, p, c, y, g, r]);
        return u.useEffect(() => {
            if (S === void 0) return;
            const a = z.current;
            if (!a) return;
            let l = null;
            try {
                l = JSON.stringify(S)
            } catch {
                l = null
            }
            l != null && P.current === l || (P.current = l, a.setState(S, !1))
        }, [S]), u.useEffect(() => {
            !F(t) || H.current || (H.current = !0, g.warning("Legacy widget turn detected", {
                id: "legacy-dil-turn",
                description: "This turn uses DIL 1.x and may not render correctly."
            }))
        }, [t, g]), ze({
            queryKey: ["genui-refresh", y, p, c],
            enabled: !Y && !L && !!(y && p && c !== void 0) && !!(se ? .enabled && se ? .name) && ne,
            queryFn: async () => !y || !p || c === void 0 ? null : await be.safePost("/conversation/{conversation_id}/message/{message_id}/genui/refresh_widget", {
                additionalHeaders: void 0,
                parameters: {
                    path: {
                        conversation_id: y,
                        message_id: p
                    }
                },
                requestBody: {
                    ref_index: c
                }
            }),
            refetchInterval: a => {
                if (document.visibilityState !== "visible") return !1;
                const l = a.state.error;
                if (_e(l)) return !1;
                if (Ce(l)) return 1e3;
                const k = a.state.data;
                if (k) {
                    const A = k.next_poll_after_ms;
                    return A == null ? !1 : typeof A == "number" && A > 0 ? Math.max(1e3, A) : !1
                }
                return 5e3
            },
            refetchIntervalInBackground: !1,
            refetchOnWindowFocus: !0,
            retry: (a, l) => _e(l) ? !1 : Ce(l) ? a < 5 : a < 2
        }), _.jsxs("div", {
            className: B ? "mt-4" : "mt-4 pb-3",
            children: [_.jsx("div", {
                className: "mb-2 flex justify-end gap-2 empty:hidden",
                children: J && Fe && _.jsx(wt, {
                    onCopy: Re,
                    buttonText: "Copy DIL (internal only)"
                })
            }), _.jsxs("div", {
                className: "flex w-fit max-w-full flex-col gap-0.5",
                children: [_.jsx(ct, {
                    name: "DILWidgetRenderer",
                    onError: Ne,
                    children: _.jsx(Qt, {
                        widget: De,
                        theme: W,
                        initialState: S,
                        onAction: qe,
                        ref: Be,
                        onError: () => {
                            P.current = null
                        }
                    })
                }), (Le || B) && _.jsxs("div", {
                    className: "flex justify-end gap-1",
                    children: [null, B && _.jsx(Tt, {
                        messageId: p,
                        clientThreadId: D,
                        widgetRefId: r,
                        dilUrl: x,
                        widgetType: O,
                        widgetName: N,
                        dilVersion: t
                    })]
                })]
            })]
        })
    };
export {
    Xt as D, Ft as o
};
//# sourceMappingURL=28938d3c-ntjvzk8j4ndk27zo.js.map