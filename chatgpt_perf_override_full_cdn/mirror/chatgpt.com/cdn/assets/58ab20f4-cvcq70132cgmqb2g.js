import {
    di as v,
    cY as $,
    jU as j,
    fq as T,
    fr as O,
    d2 as b,
    cF as A,
    d as E,
    a$ as I,
    j9 as w,
    a as N,
    N as F,
    _ as M
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    kx as S,
    ky as R
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import "./2340486e-dvd8m80i7d6hyild.js";
const B = e => {
        const [t] = S(b(e), $({
            path: T,
            args: o => {
                if (j(o)) return o;
                const [r] = S(T(o), O);
                return r ? ? {}
            }
        }));
        return t
    },
    P = e => {
        const t = b(e);
        if (t.trim().length === 0) return null;
        try {
            return JSON.parse(t) ? ? null
        } catch {
            return t
        }
    },
    y = e => e.metadata ? .chatgpt_sdk ? .tool_response_metadata,
    D = e => {
        const t = new Set;
        typeof e.recipient == "string" && e.recipient.length > 0 && t.add(e.recipient);
        const o = B(e) ? .path;
        if (typeof o != "string") return t;
        const r = o.split("/").filter(Boolean);
        return r.length < 2 || t.add(`api_tool.${r[0]}.${r[r.length-1]}`), t
    },
    W = (e, t) => {
        const o = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return new RegExp(`^${o}(?:_\\d+)*$`).test(e)
    },
    k = (e, t) => {
        if (e.author.role !== "tool") return !1;
        const o = e.author.name;
        return typeof o == "string" ? Array.from(D(t)).some(r => W(o, r)) : !!e.metadata ? .attachments ? .some(r => r.display_files_from_actions_ext)
    },
    q = e => {
        const t = y(e);
        if (!t || typeof t != "object") return null;
        const o = t,
            r = [o.call_tool_result, o.mcp_tool_result, o.mcpToolResult, o.structuredContent, o.structured_content, o.result, o.output];
        for (const l of r)
            if (l !== void 0) return l;
        return null
    },
    J = e => {
        const t = e.metadata ? .attachments ? .filter(o => o.display_files_from_actions_ext);
        return t ? .length ? {
            attachments: t
        } : null
    },
    L = e => {
        const t = P(e);
        if (t != null && typeof t != "string") return t;
        const r = e.metadata ? .jit_plugin_data ? .from_server,
            l = r && "body" in r ? r.body : void 0;
        if (l && typeof l == "object") {
            const u = l;
            if (u.structuredContent !== void 0) return u.structuredContent;
            if (u.structured_content !== void 0) return u.structured_content;
            if (u.result !== void 0) return u.result;
            if (u.output !== void 0) return u.output
        }
        const f = e.metadata ? .chatgpt_sdk;
        if (f && typeof f == "object") {
            const u = f;
            if (u.tool_output !== void 0) return u.tool_output;
            if (u.structuredContent !== void 0) return u.structuredContent;
            if (u.structured_content !== void 0) return u.structured_content
        }
        const m = q(e);
        if (m !== null) return m;
        const _ = J(e);
        return _ !== null ? _ : e.content.content_type !== v.Text && e.content.content_type !== v.Code ? e.content : t ? ? null
    },
    G = (e, t) => {
        for (const o of e.values())
            for (const r of o)
                if (r.id === t) return r;
        return null
    };
class Y {
    constructor(t) {
        this.conversation = t
    }
    focusedMessageId$ = E(null, {
        equals: () => !1
    });
    focusedMessages$ = I(() => {
        const t = w(this.conversation),
            o = this.focusedMessageId$();
        if (!o) return [];
        const r = n => n.author.role === "assistant" && !!n.recipient ? .startsWith("api_tool"),
            l = n => n.author.role === "tool" && typeof n.author.name == "string",
            f = n => {
                const s = L(n);
                if ((n.metadata ? .chatgpt_sdk != null ? R(n.metadata.chatgpt_sdk) : null) != null) return !0;
                const c = y(n);
                return c && typeof c == "object" && "elicitation" in c ? !0 : s != null
            },
            m = n => {
                if ((n.metadata ? .chatgpt_sdk != null ? R(n.metadata.chatgpt_sdk) : null) != null) return !0;
                const a = y(n);
                return !!(a && typeof a == "object" && "elicitation" in a)
            },
            _ = (n, s) => {
                const a = n[s];
                let c = null;
                for (let i = s + 1; i < n.length; i += 1) {
                    const d = n[i];
                    if (r(d)) break;
                    k(d, a) && f(d) && (c = i)
                }
                return c
            },
            u = (n, s) => {
                const a = n[s];
                if (r(a)) return s;
                if (l(a))
                    for (let c = s - 1; c >= 0; c -= 1) {
                        const i = n[c];
                        if (r(i) && k(a, i)) return c
                    }
                for (let c = s; c >= 0; c -= 1)
                    if (r(n[c])) return c;
                return null
            },
            C = (n, s) => {
                for (let a = s + 1; a < n.length; a += 1)
                    if (r(n[a])) return a;
                return n.length
            };
        for (const n of t) {
            const s = n.messages,
                a = s.findIndex(p => p.id === o);
            if (a === -1) continue;
            const c = u(s, a);
            if (c == null) continue;
            const i = C(s, c);
            let d = 0,
                g = a;
            for (; g >= 0 && !r(s[g]); g -= 1);
            for (let p = g; p >= 0; p -= 1) {
                if (!r(s[p])) continue;
                const h = _(s, p);
                if (h == null) continue;
                const x = s[h];
                if (m(x)) {
                    d = h + 1;
                    break
                }
            }
            return s.slice(d, i)
        }
        return []
    });
    focusMessage$(t) {
        N.count(F.ECOSYSTEM, "dev_mode_inspector.opened"), M.logEventWithStatsig("Ecosystem app: Open dev mode inspector", "chatgpt_web_ecosystem_dev_mode_inspector_opened"), this.focusedMessageId$.set(t)
    }
    blur() {
        this.focusedMessageId$.set(null)
    }
}
const H = A(e => new Y(e));
export {
    G as a, L as b, y as c, H as g, k as i, B as p
};
//# sourceMappingURL=58ab20f4-cvcq70132cgmqb2g.js.map