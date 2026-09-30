import {
    r as b,
    c as $,
    u as q,
    j as r
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    c as z,
    s as B,
    bV as Q,
    nK as W,
    ey as X,
    b5 as Y,
    e5 as U,
    iw as J,
    a as Z,
    N as ee,
    cq as te,
    Bu as oe
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    hX as ne,
    kR as se
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    g as ae,
    R as F,
    r as re,
    u as ie,
    a as le
} from "./881648b6-ighgvbrp6yyqupn4.js";
import {
    m as ce
} from "./bc18f706-ctivje9d0t0qyr68.js";
import me from "./d4fd05ef-jcd8acyt60dknv7p.js";
const ue = z(B, "fd5f48", 18, 18);

function de({
    intl: t,
    submitText: e,
    onCreateCompletion: o
}) {
    const s = e.trim(),
        a = V(s);
    if (!(!s || !a)) return {
        type: "text",
        label: a,
        placeholderTextOverride: t.formatMessage({
            id: "innKMI",
            defaultMessage: "Make a correction"
        }),
        shouldPersistAcrossMessages: !1,
        hideQuotes: !0,
        icon: r.jsx(se, {
            className: "icon text-token-text-tertiary inline-block"
        }),
        createNewCompletionParams: n => n.completionMetadata ? { ...n,
            completionMetadata: { ...n.completionMetadata,
                systemHints: ["bio"]
            },
            promptMessage: { ...n.promptMessage,
                metadata: { ...n.promptMessage.metadata ? ? {},
                    targeted_reply : s,
                    system_hints : ["bio"]
                }
            },
            appendMessages: [...n.appendMessages ? ? [], J(s)]
        } : n,
        onCreateCompletion: n => {
            U("memory_followup_used"), o ? .(n)
        }
    }
}

function V(t) {
    return t ? ce(t).replace(/\s+/g, " ").trim() : ""
}
const we = t => {
        "use forget";
        const e = $.c(37),
            {
                metadata: o
            } = t;
        let s;
        e[0] !== o.matched_text ? (s = ae(o.matched_text), e[0] = o.matched_text, e[1] = s) : s = e[1];
        const {
            markdown: a,
            shouldStripSeparators: n
        } = s, h = Q(), k = W();
        let g;
        e[2] !== k ? (g = X(k), e[2] = k, e[3] = g) : g = e[3];
        const H = g,
            {
                setTargetedContent: j
            } = ne(),
            A = q(),
            K = o.prompt_text ? ? o.matched_text;
        let l, x;
        if (e[4] !== A || e[5] !== K) {
            const i = K.trim();
            l = V(i), x = de({
                intl: A,
                submitText: i
            }), e[4] = A, e[5] = K, e[6] = l, e[7] = x
        } else l = e[6], x = e[7];
        const y = x,
            D = b.useRef(!1);
        let C, _;
        if (e[8] !== l ? (C = () => {
                D.current || !l || (U("memory_followup_seen"), D.current = !0)
            }, _ = [l], e[8] = l, e[9] = C, e[10] = _) : (C = e[9], _ = e[10]), b.useEffect(C, _), !y) return null;
        let v;
        e[11] !== H || e[12] !== j || e[13] !== y ? (v = i => {
            H.focus(), U("memory_followup_activated"), Z.count(ee.DEFAULT, "memory_followup_activated"), j(y)
        }, e[11] = H, e[12] = j, e[13] = y, e[14] = v) : v = e[14];
        const c = v;
        let M;
        e[15] === Symbol.for("react.memo_cache_sentinel") ? (M = {
            duration: .2,
            ease: he
        }, e[15] = M) : M = e[15];
        const G = M;
        let m;
        e[16] !== h ? (m = h ? !1 : {
            opacity: 0,
            width: 0
        }, e[16] = h, e[17] = m) : m = e[17];
        let S;
        e[18] === Symbol.for("react.memo_cache_sentinel") ? (S = {
            opacity: 1,
            width: "1.5rem"
        }, e[18] = S) : S = e[18];
        const N = h ? void 0 : G;
        let w;
        e[19] !== N || e[20] !== m ? (w = {
            initial: m,
            animate: S,
            transition: N
        }, e[19] = N, e[20] = m, e[21] = w) : w = e[21];
        const O = w;
        let u;
        e[22] !== c ? (u = i => {
            (i.key === "Enter" || i.key === " ") && (i.preventDefault(), c(i))
        }, e[22] = c, e[23] = u) : u = e[23];
        let E;
        e[24] === Symbol.for("react.memo_cache_sentinel") ? (E = r.jsx(ue, {
            className: "group-hover:entity-accent icon text-token-text-tertiary inline-block transition-transform duration-150 ease-out group-hover:translate-x-0.5"
        }), e[24] = E) : E = e[24];
        let d;
        e[25] !== O ? (d = r.jsx(Y.span, {
            className: "inline-flex items-center overflow-hidden align-middle",
            ...O,
            children: E
        }), e[25] = O, e[26] = d) : d = e[26];
        let p;
        e[27] !== n ? (p = n ? [...F, re] : F, e[27] = n, e[28] = p) : p = e[28];
        let f;
        e[29] !== a || e[30] !== p ? (f = r.jsx("span", {
            className: "group-hover:entity-accent whitespace-normal",
            children: r.jsx(pe, {
                rehypePlugins: p,
                remarkPlugins: le,
                urlTransform: ie,
                components: fe,
                children: a
            })
        }), e[29] = a, e[30] = p, e[31] = f) : f = e[31];
        let T;
        return e[32] !== c || e[33] !== u || e[34] !== d || e[35] !== f ? (T = r.jsxs("span", {
            className: "entity-underline hover:entity-accent group inline cursor-pointer align-baseline whitespace-nowrap",
            role: "button",
            tabIndex: 0,
            onClick: c,
            onKeyDown: u,
            children: [d, f]
        }), e[32] = c, e[33] = u, e[34] = d, e[35] = f, e[36] = T) : T = e[36], T
    },
    pe = b.memo(me),
    I = "group-hover:entity-accent",
    P = t => t ? `${t} ${I}` : I,
    R = t => ({
        className: e,
        ...o
    }) => b.createElement(t, { ...o,
        className: P(e)
    }),
    fe = {
        p: ({
            children: t
        }) => r.jsx(r.Fragment, {
            children: t
        }),
        a: ({
            children: t,
            title: e,
            className: o
        }) => r.jsx("span", {
            title: e,
            className: P(o),
            children: t
        }),
        strong: R("strong"),
        em: R("em"),
        del: R("del"),
        code: R("code")
    },
    he = [.22, .61, .36, 1],
    ge = {
        highlightedConversationContextCitationKeys: new Set
    },
    L = te(() => ge);

function Ee(t, e) {
    if (!t) return [];
    const o = [],
        s = typeof e.index == "number" || typeof e.matched_text != "string" ? null : oe(e.matched_text),
        a = typeof e.index == "number" ? e.index : s ? .index;
    typeof a == "number" && o.push([t, e.conversation_context_type, a].join("::"));
    const n = e.citation_uuid ? .trim();
    return n && o.push([t, e.conversation_context_type, n].join("::")), o
}

function xe(t, e) {
    return t.size !== e.length ? !1 : e.every(o => t.has(o))
}
const Te = {
    setHighlightedConversationContextCitationKeys: t => {
        L.setState({
            highlightedConversationContextCitationKeys: new Set(t)
        })
    },
    clearHighlightedConversationContextCitationKeys: t => {
        L.setState(e => t && !xe(e.highlightedConversationContextCitationKeys, t) ? e : {
            highlightedConversationContextCitationKeys: new Set
        })
    }
};
export {
    Te as C, we as M, de as c, Ee as g, L as u
};
//# sourceMappingURL=e700964e-ntd8bvrsamyzzorh.js.map