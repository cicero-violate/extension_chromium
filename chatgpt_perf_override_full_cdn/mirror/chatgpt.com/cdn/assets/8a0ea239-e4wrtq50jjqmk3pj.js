import {
    hU as Me,
    d as B,
    cX as re,
    aW as ue,
    vm as ge,
    dI as he,
    b8 as ee,
    cI as le,
    cQ as ce,
    eu as te,
    c2 as de,
    bN as W,
    AV as Te,
    c1 as fe,
    D as Y,
    cM as Pe,
    cO as xe,
    dY as be,
    qI as Ie,
    eC as ve,
    di as Ce,
    df as Ge,
    bS as N,
    et as ae,
    jE as oe,
    dk as we,
    eB as Ee,
    be as Ae,
    c5 as ke,
    q as Oe,
    rX as Re,
    v9 as $e,
    va as Fe,
    nK as Ue,
    no as J,
    ey as Z,
    iw as qe
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    iI as Le,
    pm as Ke,
    pn as _e,
    po as ne,
    pp as De,
    pq as me,
    kQ as Ne,
    pr as je,
    ps as ze,
    pt as Ve,
    pu as He,
    hX as We,
    i_ as Be,
    pv as Xe,
    bl as Qe,
    bF as Ye,
    lo as pe,
    pw as Je,
    px as Ze
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    r as et
} from "./7f00cfec-f04y2v5idy58f22s.js";
import {
    v as E,
    c as ye,
    r as se,
    j as L
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    a as tt
} from "./e21b3b3f-kmcsjww08yol2h37.js";
class st {
    conversation;
    requestKey;
    input;
    optimisticMessages;
    createdAt;
    state$;
    placeholderState$;
    constructor(e) {
        this.conversation = e.conversation, this.requestKey = e.requestKey, this.input = e.input, this.optimisticMessages = e.input.optimisticMessages.map(a => ({ ...a,
            id: a.id ? ? E()
        }));
        const [t] = this.optimisticMessages;
        if (!t) throw new Error("No optimistic prompt message provided");
        this.state$ = B({
            status: "created",
            error: void 0,
            serverThreadId: void 0,
            hasReceivedImageGenToolCall: !1,
            promptMessage: t
        }, {
            equals: re
        }), this.placeholderState$ = B(void 0), this.createdAt = new Date
    }
    setState(e) {
        this.state$.set(t => {
            const a = { ...t,
                ...e
            };
            return re(t, a) ? t : a
        })
    }
    renderPlaceholderConversation$() {
        try {
            const {
                session: e
            } = ue(), t = ge();
            return he.initThread({
                clientThreadId: t.id,
                conversationMode: {
                    kind: ee.PrimaryAssistant
                },
                userId: e ? .user ? .id,
                accountId: e ? .account ? .id,
                disableConversationNavigation: !0
            }), le(t.id, a => {
                for (const o of this.optimisticMessages) ce.appendOptimisticMessage(a, { ...o,
                    clientMetadata: te(o.clientMetadata, {
                        kind: "image-gen-placeholder-conversation"
                    }),
                    id: E()
                })
            }), this.placeholderState$.set({
                placeholderConversationId: t.id
            }), de(`/c/${t.id}`), !0
        } catch (e) {
            return this.handleOptimisticRenderFailure(this.normalizeError(e, "image_gen_optimistic_render_failed")), !1
        }
    }
    async run$() {
        (this.input.renderPlaceholder ? ? !0) && !this.renderPlaceholderConversation$() || await this.requestCompletion$()
    }
    async requestCompletion$() {
        this.setState({
            status: "generating"
        });
        let e = null;
        try {
            if (e = await this.input.asyncWork(), e == null) {
                this.handleAsyncWorkFailure(new Error("image_gen_async_work_returned_null"));
                return
            }
        } catch (t) {
            this.handleAsyncWorkFailure(this.normalizeError(t, "image_gen_async_work_failed"));
            return
        }
        try {
            const t = e.callbacks,
                a = { ...t ? ? {},
                    onServerThreadId : o => {
                        if (t ? .onServerThreadId ? .(o), W(() => this.state$().serverThreadId)) return;
                        this.setState({
                            serverThreadId: o
                        });
                        const s = W(() => this.placeholderState$() ? .placeholderConversationId);
                        s && Te("/c/:conversationId") ? .params ? .conversationId === s && de(`/c/${o}`, {
                            replace: !0
                        }), Ke.refetch()
                    },
                    onImageGenMessage : o => {
                        t ? .onImageGenMessage ? .(o), !(!Le(o) || W(() => this.state$().hasReceivedImageGenToolCall)) && this.setState({
                            hasReceivedImageGenToolCall: !0
                        })
                    }
                };
            await et({
                callsiteId: "request_completion.images.image_gen_conversation_generation.1",
                conversation: this.conversation,
                ...e,
                completionMetadata: {
                    conversationMode: {
                        kind: ee.PrimaryAssistant
                    },
                    systemHints: [fe.PictureV2]
                },
                callbacks: a
            }), this.handleCompletionSuccess()
        } catch (t) {
            this.handleCompletionFailure(this.normalizeError(t, "image_gen_request_completion_failed"))
        }
    }
    handleOptimisticRenderFailure(e) {
        Y.addError(e), this.setState({
            status: "failed",
            error: e
        }), this.input.lifecycleCallbacks ? .onOptimisticRenderError ? .(e)
    }
    handleAsyncWorkFailure(e) {
        Y.addAction("imagegen-async-error", {
            error: e
        }), this.setState({
            status: "failed",
            error: e
        }), this.input.lifecycleCallbacks ? .onAsyncWorkError ? .(e);
        const t = W(() => this.placeholderState$() ? .placeholderConversationId);
        if (!t) return;
        const a = Pe(t),
            n = xe.getConversationLastTurn(a) ? .messages.at(-1);
        n && le(t, s => {
            ce.updateTree(s, l => {
                l.updateNodeMetadata(n.id, te(void 0, {
                    kind: "image-gen-placeholder-conversation",
                    errorMessage: "Error preparing request"
                }))
            })
        })
    }
    handleCompletionSuccess() {
        this.setState({
            status: "succeeded"
        }), this.input.lifecycleCallbacks ? .onSuccess ? .()
    }
    handleCompletionFailure(e) {
        Y.addError(e), this.setState({
            status: "failed",
            error: e
        }), this.input.lifecycleCallbacks ? .onCompletionError ? .(e)
    }
    normalizeError(e, t) {
        return e instanceof Error ? e : new Error(t, {
            cause: e
        })
    }
}
const at = 3e4;
async function ot(r, e) {
    let t = 0,
        a = !1;
    const o = new Set(r);
    for (; t < at;) {
        await new Promise(s => setTimeout(s, 100)), t += 100;
        const n = e.getState().files.filter(s => o.has(s.tempId));
        if (a = n.length > 0 && n.every(s => s.status === Ie.Ready), a) break
    }
    return a ? {
        success: !0
    } : {
        success: !1,
        error: new Error("image-gen-upload-timeout")
    }
}
const nt = B([]),
    Se = Me((r, e) => B(void 0));

function it(r, e) {
    nt.set(t => t.includes(e.requestKey) ? t : [...t, e.requestKey]), Se.set(r, e.requestKey, e)
}

function rt(r) {
    const {
        id: e = E(),
        text: t,
        filePickerStore: a,
        fileTempIds: o,
        persistedFileStore: n
    } = r, s = a.getState().files.filter(i => o.includes(i.tempId));
    for (const i of s) n.getState().files.find(d => d.tempId === i.tempId) || n.addFile({
        tempId: i.tempId,
        status: Ie.Ready,
        file: i.file,
        fileId: i.tempId,
        cdnUrl: URL.createObjectURL(i.file),
        progress: 100,
        source: "local",
        fileSpec: {
            id: i.tempId,
            name: i.file.name,
            size: i.file.size,
            mimeType: i.file.type,
            width: 0,
            height: 0
        }
    });
    const l = [t];
    for (const i of s) l.push({
        content_type: ve.ImageAssetPointer,
        asset_pointer: i.tempId,
        size_bytes: i.file.size,
        height: 0,
        width: 0
    });
    return {
        id: e,
        author: {
            role: Ge.User
        },
        content: {
            content_type: Ce.MultimodalText,
            parts: l
        },
        metadata: {
            attachments: s.map(i => ({
                id: i.tempId,
                url: URL.createObjectURL(i.file),
                mimeType: i.file.type,
                name: i.file.name,
                size: i.file.size
            }))
        }
    }
}

function lt(r) {
    const e = be(r);
    return e.clientMetadata = te(e.clientMetadata, {
        kind: "image-gen-placeholder-conversation"
    }), e
}
const ie = N(r => (e, t) => {
        const a = Se(r, e);
        if (a) return a;
        const o = t.conversation ? ? ct(),
            n = new st({
                conversation: o,
                requestKey: e,
                input: t
            });
        return it(r, n), n.run$(), n
    }),
    _t = N(() => {
        const r = ie();
        return ({
            conversation: e,
            group: t,
            promptItem: a,
            surface: o,
            position: n
        }) => {
            const s = E(),
                l = E(),
                c = ae(a.prompt_text, {
                    image_feature: "prompt",
                    image_prompt_id: a.id,
                    image_send_uuid: l
                });
            ne({
                item: a,
                group: t,
                surface: o,
                position: n,
                imageSendUuid: l
            }), r(s, {
                model: oe(e),
                optimisticMessages: [c],
                asyncWork: () => Promise.resolve({
                    eventSource: "url",
                    promptMessage: c
                })
            })
        }
    }),
    yt = N(() => {
        const r = ie();
        return ({
            conversation: e,
            prompt: t,
            images: a
        }) => {
            if (a.length === 0) return;
            const {
                promptItem: o,
                group: n,
                surface: s,
                position: l
            } = _e(e);
            if (o == null || n == null || s == null) return;
            const c = E(),
                i = {
                    content_type: Ce.MultimodalText,
                    parts: [t, ...a.map(g => ({
                        content_type: ve.ImageAssetPointer,
                        asset_pointer: g.asset_pointer,
                        width: g.width,
                        height: g.height,
                        size_bytes: 0
                    }))]
                },
                p = E(),
                d = ae(i, {
                    image_feature: "prompt",
                    image_prompt_id: o.id,
                    image_send_uuid: p
                });
            ne({
                item: o,
                group: n,
                surface: s,
                position: l,
                imageSendUuid: p
            }), r(c, {
                model: oe(e),
                optimisticMessages: [d],
                asyncWork: () => Promise.resolve({
                    eventSource: "url",
                    promptMessage: d
                })
            })
        }
    }),
    St = N(() => {
        const r = ie();
        return ({
            conversation: e,
            tempIds: t,
            filePickerStore: a,
            persistedFileStore: o
        }) => {
            if (t.length === 0) return;
            const {
                promptItem: n,
                group: s,
                surface: l,
                position: c
            } = _e(e);
            if (n == null || s == null || l == null) return;
            const i = De(t),
                p = me(e)();
            if (p && p !== i) return;
            me(e).set(i);
            const d = oe(e),
                g = Ne(e),
                K = rt({
                    filePickerStore: a,
                    persistedFileStore: o,
                    fileTempIds: t,
                    text: n.prompt_text
                });
            r(i, {
                model: d,
                optimisticMessages: [K, lt("Uploading")],
                asyncWork: async () => {
                    const x = await ot(t, a);
                    if (!x.success) throw x.error;
                    const {
                        content: y,
                        attachments: I
                    } = je(a, n.prompt_text, d, g, null);
                    a.setState({ ...a.getState(),
                        files: []
                    });
                    const v = E();
                    return ne({
                        item: n,
                        group: s,
                        surface: l,
                        position: c,
                        imageSendUuid: v
                    }), {
                        eventSource: "url",
                        promptMessage: ae(y, {
                            attachments: I,
                            image_feature: "prompt",
                            image_prompt_id: n.id,
                            image_send_uuid: v
                        })
                    }
                }
            })
        }
    }),
    Mt = N(() => ({
        source: r
    }) => {
        const e = r === "camera" ? ze : Ve,
            t = document.getElementById(e);
        t instanceof HTMLInputElement && t.click()
    });
async function Tt(r, e) {
    if (!we(r)) return;
    const t = Ee.getImageAssetPointers(r);
    t.length > 0 && await Promise.allSettled(t.map(a => He(e, a, r)))
}

function ct() {
    const r = ge(),
        {
            session: e
        } = ue();
    return he.initThread({
        clientThreadId: r.id,
        conversationMode: {
            kind: ee.PrimaryAssistant
        },
        userId: e ? .user ? .id,
        accountId: e ? .account ? .id,
        disableConversationNavigation: !0
    }), r
}
const dt = "video";

function mt(r) {
    "use forget";
    const e = ye.c(35),
        {
            conversation: t,
            currentModelId: a,
            onRequestCompletion: o,
            onClose: n,
            isVideoLightboxContext: s,
            activeSourceMessageId: l,
            activeSourceMessageLabel: c,
            hasSoraOperationMetadata: i,
            activeSoraOriginalFileId: p,
            activeSoraOriginalGenId: d,
            activeSoraOriginalTaskId: g,
            shouldUseAnimatePlaceholder: K,
            shouldIsolateComposerState: x,
            promptOverride: y,
            pendingPromptText: I,
            onPendingPromptHandled: v
        } = r,
        u = Ue(),
        A = Ye(!1);
    let T;
    e[0] !== u ? (T = () => {
        J(Z(u), "")
    }, e[0] = u, e[1] = T) : T = e[1];
    const m = T;
    let S, k;
    e[2] !== u || e[3] !== y ? (S = () => {
        const f = y ? .trim();
        f && J(Z(u), f)
    }, k = [u, y], e[2] = u, e[3] = y, e[4] = S, e[5] = k) : (S = e[4], k = e[5]), se.useEffect(S, k);
    let O;
    e[6] !== m || e[7] !== u || e[8] !== A ? .store ? (O = (f, _) => {
        const R = _.trim();
        if (R.length === 0) return !1;
        const $ = A ? .store.getSharedProps() ? .submitPromptTextOverride;
        return $ && $(f, R, {
            commitComposerState: !1
        }) ? (m(), !0) : (J(Z(u), R), !1)
    }, e[6] = m, e[7] = u, e[8] = A ? .store, e[9] = O) : O = e[9];
    const b = O;
    let G, P;
    e[10] !== v || e[11] !== I || e[12] !== b ? (G = () => {
        I != null && (b(new Event("submit"), I), v ? .())
    }, P = [v, I, b], e[10] = v, e[11] = I, e[12] = b, e[13] = G, e[14] = P) : (G = e[13], P = e[14]), se.useEffect(G, P);
    let C;
    e[15] !== o ? (C = f => o(Je(f)), e[15] = o, e[16] = C) : C = e[16];
    let M;
    e[17] !== p || e[18] !== d || e[19] !== g || e[20] !== l || e[21] !== c || e[22] !== m || e[23] !== i || e[24] !== s || e[25] !== n || e[26] !== o ? (M = async f => {
        const _ = await Ze(f);
        s && (_.promptMessage.metadata = pt({
            existingMetadata: _.promptMessage.metadata,
            targetedReplySourceMessageId: l,
            targetedReplyText: c,
            hasSoraOperationMetadata: i,
            soraOriginalFileId: p,
            soraOriginalGenId: d,
            soraOriginalTaskId: g
        }), c && l && (_.appendMessages = [..._.appendMessages ? ? [], qe(c)])), m(), o(_), n()
    }, e[17] = p, e[18] = d, e[19] = g, e[20] = l, e[21] = c, e[22] = m, e[23] = i, e[24] = s, e[25] = n, e[26] = o, e[27] = M) : M = e[27];
    const h = K ? pe.imagesAppLightboxAnimatePlaceholder : pe.imagesAppLightboxPlaceholder;
    let w;
    return e[28] !== t || e[29] !== a || e[30] !== x || e[31] !== C || e[32] !== M || e[33] !== h ? (w = L.jsx(tt, {
        conversation: t,
        isNewThread: !0,
        currentModelId: a,
        disableDraftPersistence: x,
        onContinueGenerating: C,
        onRequestCompletion: M,
        hideHeader: !0,
        disableAdvancedVoiceMode: !0,
        plusButtonAddsFiles: !0,
        placeholder: h
    }), e[28] = t, e[29] = a, e[30] = x, e[31] = C, e[32] = M, e[33] = h, e[34] = w) : w = e[34], w
}
const pt = ({
    existingMetadata: r,
    targetedReplySourceMessageId: e,
    targetedReplyText: t,
    hasSoraOperationMetadata: a,
    soraOriginalFileId: o,
    soraOriginalGenId: n,
    soraOriginalTaskId: s
}) => {
    const l = { ...r ? ? {}
    };
    return e && (l.targeted_reply_source_message_id = e, t && (l.targeted_reply = t)), a && (l.sora = {
        from_client: {
            operation: { ...o ? {
                    original_file_id: o
                } : {},
                ...n ? {
                    original_gen_id: n
                } : {},
                ...s ? {
                    original_task_id: s
                } : {}
            }
        }
    }), l
};

function Pt(r) {
    "use forget";
    const e = ye.c(48),
        {
            clientThreadId: t,
            currentModelId: a,
            onRequestCompletion: o,
            filePickerStore: n,
            activeImage: s,
            activeSourceMessageId: l,
            activeSourceMessageLabel: c,
            activeSoraOriginalFileId: i,
            activeSoraOriginalGenId: p,
            activeSoraOriginalTaskId: d,
            hasDrawing: g,
            getImageData: K,
            onCancelInpaint: x,
            promptOverride: y,
            pendingPromptText: I,
            onPendingPromptHandled: v,
            onClose: u
        } = r,
        A = g === void 0 ? !1 : g;
    let T;
    e[0] !== t ? (T = Ae(t), e[0] = t, e[1] = T) : T = e[1];
    const m = T,
        {
            setTargetedContent: S
        } = We(),
        k = Be(),
        O = ke();
    let b;
    e: {
        if (!s) {
            b = void 0;
            break e
        }
        const X = s.assetPointer ? ? "";
        let V;e[2] !== s.transformationId ? (V = {
            dalle: {
                gen_id: s.transformationId
            },
            generation: {
                gen_id: s.transformationId
            }
        }, e[2] = s.transformationId, e[3] = V) : V = e[3];
        const Q = V;
        let H;e[4] !== s.height || e[5] !== s.width || e[6] !== X || e[7] !== Q ? (H = {
            asset_pointer: X,
            metadata: Q,
            height: s.height,
            width: s.width
        }, e[4] = s.height, e[5] = s.width, e[6] = X, e[7] = Q, e[8] = H) : H = e[8],
        b = H
    }
    const G = b,
        P = !!(i || p || d);
    let C;
    e[9] !== s ? (C = s != null && Oe("2092005809"), e[9] = s, e[10] = C) : C = e[10];
    const M = C,
        h = l != null || P,
        w = h && !k && !O,
        f = !k && !O,
        _ = x ? ? gt,
        R = K ? ? ut;
    let $;
    e[11] !== A || e[12] !== G || e[13] !== _ || e[14] !== R ? ($ = {
        image: G,
        hasDrawing: A,
        onCleared: _,
        getImageData: R
    }, e[11] = A, e[12] = G, e[13] = _, e[14] = R, e[15] = $) : $ = e[15], Xe($);
    let D, j;
    e[16] !== s || e[17] !== h || e[18] !== S ? (D = () => {
        if (!(s || !h)) return S({
            type: "object",
            subtype: dt,
            shouldPersistAcrossMessages: !0,
            isFocusedViewContent: !1
        }), () => {
            S(void 0)
        }
    }, j = [s, h, S], e[16] = s, e[17] = h, e[18] = S, e[19] = D, e[20] = j) : (D = e[19], j = e[20]), se.useEffect(D, j);
    let F;
    e[21] !== i || e[22] !== p || e[23] !== d || e[24] !== l || e[25] !== c || e[26] !== m || e[27] !== a || e[28] !== P || e[29] !== h || e[30] !== u || e[31] !== v || e[32] !== o || e[33] !== I || e[34] !== y || e[35] !== w || e[36] !== M ? (F = L.jsx(Qe, {
        children: L.jsx(mt, {
            conversation: m,
            currentModelId: a,
            onRequestCompletion: o,
            onClose: u,
            isVideoLightboxContext: h,
            activeSourceMessageId: l,
            activeSourceMessageLabel: c,
            hasSoraOperationMetadata: P,
            activeSoraOriginalFileId: i,
            activeSoraOriginalGenId: p,
            activeSoraOriginalTaskId: d,
            shouldUseAnimatePlaceholder: M,
            shouldIsolateComposerState: w,
            promptOverride: y,
            pendingPromptText: I,
            onPendingPromptHandled: v
        })
    }), e[21] = i, e[22] = p, e[23] = d, e[24] = l, e[25] = c, e[26] = m, e[27] = a, e[28] = P, e[29] = h, e[30] = u, e[31] = v, e[32] = o, e[33] = I, e[34] = y, e[35] = w, e[36] = M, e[37] = F) : F = e[37];
    let U;
    e[38] !== m || e[39] !== F ? (U = L.jsx(Re, {
        conversation: m,
        forcedSystemHintType: fe.PictureV2,
        children: F
    }), e[38] = m, e[39] = F, e[40] = U) : U = e[40];
    let q;
    e[41] !== n || e[42] !== U ? (q = L.jsx($e, {
        store: n,
        children: U
    }), e[41] = n, e[42] = U, e[43] = q) : q = e[43];
    let z;
    return e[44] !== m || e[45] !== f || e[46] !== q ? (z = L.jsx(Fe, {
        conversation: m,
        ignoreParentComposerController: f,
        children: q
    }), e[44] = m, e[45] = f, e[46] = q, e[47] = z) : z = e[47], z
}

function ut() {}

function gt() {}
export {
    Pt as I, Se as a, yt as b, _t as c, St as d, Mt as e, Tt as f, ie as g, lt as m, ot as w
};
//# sourceMappingURL=8a0ea239-e4wrtq50jjqmk3pj.js.map