const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/a05edf66-h2m75yhxkd1ybukm.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css"]))) => i.map(i => d[i]);
import {
    v as I,
    _ as W,
    u as H,
    r as m
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    vT as O,
    jU as T,
    di as E,
    df as v,
    vU as K,
    be as V,
    cI as L,
    cQ as U,
    ch as $,
    dS as N,
    cO as A,
    cD as w,
    mv as R,
    cM as F,
    nn as P,
    vV as Q,
    sC as Y,
    da as X,
    cE as Z,
    bY as tt
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    bs as g,
    bt as y,
    bu as p,
    bv as et,
    bw as x,
    bx as J,
    by as rt,
    bz as nt,
    bA as ot
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    r as st
} from "./7f00cfec-f04y2v5idy58f22s.js";
const at = $(() => W(() =>
        import ("./a05edf66-h2m75yhxkd1ybukm.js"), __vite__mapDeps([0, 1, 2, 3])).then(t => t.SafeLinkWarningModal)),
    it = 15e3,
    ut = 240 * 1e3,
    ct = t => t === y ? null : P() ? ut : it,
    j = "TimeoutError",
    lt = "opening link failed",
    b = new Map;

function Pt(t) {
    const e = H(),
        r = m.useRef(new Set),
        n = N(t, A.getConversationTurns, {
            disablePerfDetector: !0
        });
    m.useEffect(() => {
        w() && et().catch(() => {})
    }, []);
    const o = N(t, i => A.getRequestId(i)),
        s = g(i => i.getRunningToolsForThread(t));
    m.useEffect(() => {
        if (!w()) return;
        if (!n.length) {
            R.dragonFruitState$.set({
                active: !1
            });
            return
        }
        const i = g.getState();
        let f;
        for (let l = s.length - 1; l >= 0; l -= 1) {
            const h = s[l];
            if (h ? .toolName === y) {
                f = h;
                break
            }
        }
        const _ = !!f,
            d = f ? .messageId;
        if (R.dragonFruitState$.set({
                active: _,
                messageId: d
            }), !s.length) return;
        const c = [],
            a = new Set;
        n.forEach(l => {
            l.messages.forEach(h => {
                c.push(h), a.add(h.id)
            })
        }), s.forEach(l => {
            if (!a.has(l.messageId)) {
                i.setToolState(t, l.messageId, l.toolName, p.Finished);
                return
            }
            let h = c.findIndex(S => S.id === l.messageId);
            if (h === -1) {
                i.setToolState(t, l.messageId, l.toolName, p.Finished);
                return
            }
            if (x(t, l.messageId)) {
                const S = c.slice(h + 1).findIndex(G => G.recipient === y);
                if (S === -1) return;
                h += 1 + S
            }
            c.slice(h + 1).find(S => S.author.role === v.User || S.author.role === v.Assistant) && i.setToolState(t, l.messageId, l.toolName, p.Finished)
        })
    }, [t, n, s]);
    const u = m.useCallback(async () => {
        if (!w()) return;
        const i = F(t);
        if (!i) return;
        const f = A.getConversationTurns(i);
        if (!f.length) return;
        const _ = A.getRequestId(i);
        if (!_) return;
        const d = f.flatMap(a => a.messages).filter(a => !!a.recipient && J(a.recipient) && a.status === "finished_successfully" && !r.current.has(a.id) && a.clientMetadata ? .requestId === _),
            c = P() && Q() ? rt(t, f, _) : null;
        if (c) {
            const a = d.findIndex(l => l.recipient === y);
            a !== -1 && d.splice(a, 1), d.push(c)
        }
        if (d.length !== 0)
            for (const a of d) r.current.has(a.id) || (r.current.add(a.id), x(t, a) && L(t, l => {
                U.appendMessage(l, a)
            }), await ft(a, t, e))
    }, [t, e]);
    m.useEffect(() => {
        u()
    }, [o, u, n]), m.useEffect(() => {
        if (w()) return Y(X, {
            completionFinished: () => {
                u()
            }
        })
    }, [t, o, u])
}
async function Jt(t, e) {
    const r = b.get(t);
    r && (b.delete(t), await q(r.clientThreadId, r.fnName, t, e, r.intl))
}
async function ft(t, e, r) {
    const n = t.recipient;
    if (!n || !J(n)) return;
    let o;
    if (t.content ? .content_type === E.Text ? o = t.content.parts && t.content.parts.length ? t.content.parts[0] : "" : t.content ? .content_type === E.Code ? o = t.content.text : o = "", n === y) {
        o = St(t.metadata);
        const c = pt(e);
        c && (o = _t(o, c));
        const {
            conversationAttachmentIds: a,
            currentTurnAttachmentIds: l
        } = mt(e);
        o = ht(o, a), o = yt(o, l), o = M(o, {
            conversation_id: e
        }), typeof t.metadata ? .n7jupd_local_safe_mode == "boolean" && (o = M(o, {
            n7jupd_local_safe_mode: t.metadata.n7jupd_local_safe_mode
        }))
    }
    if (!await Mt(n, o, e)) {
        g.getState().setToolState(e, t.id, n, p.Finished);
        return
    }
    if (!await kt(n, o, e)) {
        g.getState().setToolState(e, t.id, n, p.Finished);
        return
    }
    if (!await Ot(n, o, e)) {
        g.getState().setToolState(e, t.id, n, p.Finished);
        return
    }
    if (n === nt) {
        g.getState().setToolState(e, t.id, n, p.Finished);
        return
    }
    const f = () => {
            g.getState().setToolState(e, t.id, n, p.Error)
        },
        _ = () => {
            f(), C(e, n, "Tool host unavailable", "host_unavailable")
        };
    let d;
    try {
        d = (await Z()).getHost()
    } catch {
        _();
        return
    }
    try {
        if (g.getState().setToolState(e, t.id, n, p.Running), !await dt({
                host: d,
                clientThreadId: e,
                fnName: n,
                args: o,
                messageId: t.id,
                intl: r,
                setToolStateToError: f
            })) return;
        const a = await gt(d, n, o, t.id);
        await q(e, n, t.id, a, r)
    } catch (c) {
        if (O(t.id)) {
            g.getState().setToolState(e, t.id, n, p.Cancelled);
            return
        }
        const a = c instanceof Error && c.name === j ? "timeout" : "exception";
        f(), C(e, n, a, a)
    }
}
async function dt({
    host: t,
    clientThreadId: e,
    fnName: r,
    args: n,
    messageId: o,
    intl: s,
    setToolStateToError: u
}) {
    if (r !== y || !t.invokeAsyncLocalTool) return !0;
    b.set(o, {
        clientThreadId: e,
        fnName: r,
        intl: s
    });
    try {
        const i = await t.invokeAsyncLocalTool(r, n, o);
        return i.status === "accepted" ? !1 : (b.delete(o), O(o) ? (g.getState().setToolState(e, o, r, p.Cancelled), !1) : (u(), C(e, r, i.message ? ? "Tool failed...", "exception"), !1))
    } catch {
        return b.delete(o), !0
    }
}
async function gt(t, e, r, n) {
    const o = ct(e),
        s = t.callLocalTool(e, r, n);
    return o == null ? await s : await Ut(s, o)
}
async function q(t, e, r, n, o) {
    const s = g.getState().getToolState(t, r),
        u = s == null ? void 0 : Date.now() - s.startTime,
        i = g.getState().getToolUIElements(r) ? ? [],
        f = n.map(c => At(c.serializedmetadata)),
        _ = e === y ? f.find(c => z(c) && typeof c ? .kaur1br5_dragonfruit_thread_id == "string" && c.kaur1br5_dragonfruit_thread_id.length > 0) : void 0,
        d = typeof _ ? .kaur1br5_dragonfruit_thread_id == "string" ? _.kaur1br5_dragonfruit_thread_id : void 0;
    if (O(r)) {
        g.getState().setToolState(t, r, e, p.Cancelled, {
            dragonfruitThreadId: d
        });
        return
    }
    if (e === y && f.some(z)) {
        g.getState().setToolState(t, r, e, p.Cancelled, {
            dragonfruitThreadId: d
        });
        return
    }
    g.getState().setToolState(t, r, e, p.Finished);
    for (const [c, a] of n.entries()) {
        const l = f[c],
            h = bt(a.attachments);
        await B(t, a.author, a.message, r, l, h, i, u, o)
    }
}

function pt(t) {
    const e = F(t);
    if (!e) return;
    const r = A.getConversationTurns(e);
    for (let n = r.length - 1; n >= 0; n -= 1) {
        const o = r[n] ? .messages ? ? [];
        for (let s = o.length - 1; s >= 0; s -= 1) {
            const u = o[s];
            if (u.author.role === v.Tool && u.author.name === y) {
                const i = u.metadata ? .kaur1br5_dragonfruit_thread_id;
                if (typeof i == "string" && i.length > 0) return i
            }
        }
    }
}

function _t(t, e) {
    return M(t, {
        kaur1br5_dragonfruit_thread_id: e
    })
}

function ht(t, e) {
    return M(t, {
        kaur1br5_attachment_ids: Array.from(e)
    })
}

function yt(t, e) {
    return M(t, {
        kaur1br5_current_turn_attachment_ids: Array.from(e)
    })
}

function M(t, e) {
    try {
        const r = JSON.parse(t || "{}"),
            n = T(r) ? r : {};
        return JSON.stringify({ ...n,
            ...e
        })
    } catch {
        return JSON.stringify(e)
    }
}

function St(t) {
    const e = t ? .kaur1br5_dragonfruit_conversation_context;
    if (T(e)) {
        const r = vt(e);
        return JSON.stringify(typeof r == "string" ? { ...e,
            prompt: r
        } : e)
    }
    return "{}"
}

function vt(t) {
    const e = t.conversation_messages;
    if (Array.isArray(e))
        for (let r = e.length - 1; r >= 0; r -= 1) {
            const n = e[r];
            if (T(n) && n.author === "user" && typeof n.text == "string") return n.text
        }
}

function Tt(t) {
    return new Set((t.metadata ? .attachments ? ? []).map(e => e.id).filter(e => typeof e == "string" && e.length > 0))
}

function mt(t) {
    const e = F(t);
    if (!e) return {
        conversationAttachmentIds: new Set,
        currentTurnAttachmentIds: new Set
    };
    const r = A.getConversationTurns(e),
        n = new Set;
    let o = new Set;
    for (const s of r)
        for (const u of s.messages) {
            const i = Tt(u);
            if (u.author.role === v.User && u.recipient === "all" && !u.metadata ? .is_visually_hidden_from_conversation && (o = i), !(u.author.role === v.Tool && u.author.name === y))
                for (const f of i) n.add(f)
        }
    return {
        conversationAttachmentIds: n,
        currentTurnAttachmentIds: o
    }
}
async function B(t, e, r, n, o, s, u = [], i, f) {
    const _ = o || s && s.length > 0 ? { ...o ? ? {},
            ...s && s.length > 0 ? {
                attachments: s
            } : {}
        } : void 0,
        d = {
            id: I(),
            author: {
                role: v.Tool,
                name: e
            },
            create_time: Date.now() / 1e3,
            content: {
                content_type: E.Text,
                parts: [r]
            },
            recipient: "all",
            status: "finished_successfully",
            weight: 0,
            metadata: _
        };
    try {
        await st({
            callsiteId: "request_completion.aura.use_aura_local_function_listener.1",
            conversation: V(t),
            promptMessage: d,
            eventSource: "keyboard",
            prependMessages: n && f ? await K(f, u, e, i) : []
        })
    } catch {
        L(t, a => {
            U.appendMessage(a, d)
        })
    }
}

function At(t) {
    if (t) try {
        const e = JSON.parse(t);
        return T(e) ? e : void 0
    } catch {
        return
    }
}

function z(t) {
    return t ? .kaur1br5_dragonfruit_cancellation === !0
}

function bt(t) {
    if (!(!t || t.length === 0)) return t.map(e => {
        const r = typeof e.size == "bigint" ? Number(e.size) : e.size,
            n = Number.isFinite(r) ? r : void 0;
        return { ...e.id ? {
                id: e.id
            } : {},
            name: e.name,
            ...n !== void 0 ? {
                size: n
            } : {},
            ...e.mimeType ? {
                mime_type: e.mimeType
            } : {},
            ...e.width != null ? {
                width: e.width
            } : {},
            ...e.height != null ? {
                height: e.height
            } : {},
            ...e.fileTokenSize != null ? {
                file_token_size: e.fileTokenSize
            } : {},
            ...e.atlasInAppUrl ? {
                atlas_in_app_url: e.atlasInAppUrl
            } : {}
        }
    })
}

function C(t, e, r, n) {
    const o = {
        id: I(),
        author: {
            role: v.Assistant,
            name: e
        },
        create_time: Date.now() / 1e3,
        content: {
            content_type: E.Text,
            parts: ["Error: " + r]
        },
        status: "finished_successfully",
        weight: 0,
        metadata: {
            local_function_error: !0,
            local_function_error_type: n
        }
    };
    L(t, s => {
        U.appendMessage(s, o)
    })
}

function Mt(t, e, r) {
    return t !== "kaur1br5.navigate_current_tab" ? Promise.resolve(!0) : D(t, e, r, n => {
        const o = Et(n);
        return o ? [o] : void 0
    })
}

function wt(t) {
    return T(t) && (t.url === void 0 || typeof t.url == "string")
}

function Et(t) {
    try {
        const e = JSON.parse(t || "{}");
        if (wt(e)) return e.url
    } catch {}
}

function kt(t, e, r) {
    return t !== "kaur1br5.open_tabs" ? Promise.resolve(!0) : D(t, e, r, Ct)
}

function Ct(t) {
    try {
        const e = JSON.parse(t || "{}"),
            r = T(e) ? e : {};
        if (Array.isArray(r.urls)) return r.urls.filter(n => typeof n == "string")
    } catch {}
}

function Ot(t, e, r) {
    return t !== "kaur1br5.add_bookmark" ? Promise.resolve(!0) : D(t, e, r, Lt)
}

function Lt(t) {
    try {
        const e = JSON.parse(t || "{}"),
            r = T(e) ? e : {};
        if (typeof r.url == "string") return [r.url]
    } catch {}
}

function Ut(t, e) {
    return new Promise((r, n) => {
        const o = setTimeout(() => {
            const s = new Error("Local function invocation timed out");
            s.name = j, n(s)
        }, e);
        t.then(s => {
            clearTimeout(o), r(s)
        }).catch(s => {
            clearTimeout(o), n(s)
        })
    })
}
async function k(t, e, r) {
    const n = await Ft(r);
    return n || await B(t, e, lt), n
}

function Ft(t) {
    return new Promise(e => {
        let r = !1;
        const n = o => {
            r || (r = !0, e(o))
        };
        tt(at, {
            urls: t,
            suppressNavigation: !0,
            onAction: o => n(o === "open"),
            onActionAborted: () => n(!1)
        })
    })
}
async function D(t, e, r, n) {
    try {
        const o = n(e);
        if (!o || o.length === 0) return k(r, t, e);
        const s = o.filter(i => !Dt(i));
        if (s.length === 0) return !0;
        const u = await ot(r, s);
        return u.length === 0 ? !0 : k(r, t, u.length === 1 ? u[0] : u)
    } catch {
        return k(r, t, e)
    }
}

function Dt(t) {
    try {
        return new URL(t).protocol.toLowerCase() === "atlas:"
    } catch {
        return !1
    }
}
export {
    Jt as h, Pt as u
};
//# sourceMappingURL=677acd42-bn1yi1ernukdhe14.js.map