const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/18e7d84e-eahv7dznhqoltf2t.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/91969468-lcw0ql9lsgjnwz6c.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/9e6b8179-eyitb5m4jk5hlrbu.js", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/conversation-small-cqp6votf.css", "assets/52047a56-czi1dhw7htgh636e.js", "assets/22724723-hcq7pr9e9rdzi53r.js", "assets/f5588252-jj7fdom20w3i9pbi.js", "assets/1bc04b52-ktky0fctjapxchyv.js", "assets/1bc04b52-gvld45w9v7fqfedv.js", "assets/679fc303-kl7c6054usfnqmd4.js", "assets/code-block-dop2czwo.css"]))) => i.map(i => d[i]);
import {
    c as N,
    _ as W,
    j as m,
    u as O,
    r as L,
    z as X,
    h as q
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    bP as K,
    eq as U
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    xf as M,
    ch as V,
    e as G,
    a as H,
    N as Q,
    _ as J,
    xx as Y,
    U as Z,
    v as ee,
    ef as te,
    jn as ne,
    jB as se
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    n as oe
} from "./c0a6f1bf-i8ofb6h61nprdqec.js";
import {
    d as ae
} from "./19ad7347-lm1i0g09rrp3wf61.js";
const ie = V(() => W(() =>
        import ("./18e7d84e-eahv7dznhqoltf2t.js").then(a => a.c), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])).then(a => a.CodeBlock), {
        loading: () => m.jsx(ce, {})
    }),
    re = 1e6,
    le = /<(sandbox:[^>\r\n]+?\.(?:html|htm))>|(sandbox:[^\s)<>\]]+?\.(?:html|htm))/gi;

function ge(a) {
    "use forget";
    const e = N.c(11),
        {
            conversation: s,
            messageId: n,
            text: t
        } = a;
    let r;
    e[0] !== t ? (r = fe(t), e[0] = t, e[1] = r) : r = e[1];
    const o = r;
    if (o.length === 0) return null;
    let c;
    if (e[2] !== s || e[3] !== o || e[4] !== n) {
        let h;
        e[6] !== s || e[7] !== n ? (h = (i, l) => m.jsx(de, {
            conversation: s,
            messageId: n,
            filepath: i,
            previewIndex: l
        }, i), e[6] = s, e[7] = n, e[8] = h) : h = e[8], c = o.map(h), e[2] = s, e[3] = o, e[4] = n, e[5] = c
    } else c = e[5];
    let f;
    return e[9] !== c ? (f = m.jsx("div", {
        className: "mt-1 flex w-full flex-col gap-3",
        children: c
    }), e[9] = c, e[10] = f) : f = e[10], f
}

function de(a) {
    "use forget";
    const e = N.c(38),
        {
            conversation: s,
            messageId: n,
            filepath: t,
            previewIndex: r
        } = a,
        o = O(),
        c = L.useContext(K);
    let f;
    e[0] !== s ? (f = () => s.serverId$(), e[0] = s, e[1] = f) : f = e[1];
    const h = G(f),
        i = c ? .serverSharedThreadId ? ? h,
        l = !!c ? .serverSharedThreadId;
    let b;
    e[2] !== t ? (b = t.split("/").filter(Boolean).pop() ? ? t, e[2] = t, e[3] = b) : b = e[3];
    const u = b;
    let _;
    e[4] !== t ? (_ = ue(t), e[4] = t, e[5] = _) : _ = e[5];
    const d = _,
        k = r;
    let S;
    e[6] === Symbol.for("react.memo_cache_sentinel") ? (S = { ...U(),
        editEnabled: !1
    }, e[6] = S) : S = e[6];
    const $ = S;
    let p;
    e[7] !== t || e[8] !== l || e[9] !== n || e[10] !== i ? (p = ["sandboxFilePreview", n, i, t, l], e[7] = t, e[8] = l, e[9] = n, e[10] = i, e[11] = p) : p = e[11];
    const y = !!(n && i && t && d);
    let w;
    e[12] !== t || e[13] !== l || e[14] !== n || e[15] !== d || e[16] !== i ? (w = async x => {
        const {
            signal: z
        } = x;
        if (!i) throw new Error("Missing server thread id for sandbox file preview");
        H.count(Q.CODE_BLOCKS, "chatgpt_code_block_sandbox_file_preview_download_started", {
            language: d ? ? ""
        }), J.logStructuredEvent(Y, {
            conversationId: i,
            messageId: n,
            language: d ? ? void 0
        });
        const j = (await ae(n, i, t, l)).download_url;
        if (!j) throw new Error("Missing download URL for sandbox file preview");
        const F = await Z.get(j, {
            additionalHeaders: l ? void 0 : te(),
            authOption: l ? ee.Anonymous : void 0,
            credentials: "omit",
            skipJsonTransform: !0,
            signal: z
        });
        if (!(F instanceof Response) || !F.ok) throw new Error("Failed to fetch sandbox file preview");
        const T = await F.blob();
        return T.size > re ? null : (await ne.yield(), {
            content: await T.text()
        })
    }, e[12] = t, e[13] = l, e[14] = n, e[15] = d, e[16] = i, e[17] = w) : w = e[17];
    let E;
    e[18] !== p || e[19] !== y || e[20] !== w ? (E = {
        queryKey: p,
        enabled: y,
        retry: !1,
        staleTime: 3e5,
        queryFn: w
    }, e[18] = p, e[19] = y, e[20] = w, e[21] = E) : E = e[21];
    const C = X(E),
        g = C.data ? .content ? ? null,
        R = L.useRef(!1),
        A = C.status === "success" && g != null && d != null;
    let B, I;
    e[22] !== u || e[23] !== t || e[24] !== o || e[25] !== A || e[26] !== n ? (I = () => {
        !A || R.current || (R.current = !0, se(o.formatMessage(D.previewAvailableAnnouncement, {
            fileName: u
        }), {
            id: `sandbox-file-preview-${n}-${t}`,
            interrupt: "none",
            priority: "normal"
        }))
    }, B = [u, t, o, A, n], e[22] = u, e[23] = t, e[24] = o, e[25] = A, e[26] = n, e[27] = B, e[28] = I) : (B = e[27], I = e[28]), L.useEffect(I, B);
    let v;
    if (C.isError || g == null) v = null;
    else if (d == null) v = null;
    else {
        let x;
        e[29] !== k || e[30] !== s.id || e[31] !== u || e[32] !== n || e[33] !== g || e[34] !== d ? (x = m.jsx(ie, {
            code: g,
            language: d,
            headerTitle: u,
            threadId: s.id,
            messageId: n,
            codeIndex: k,
            isPreviewable: !0,
            editable: !1,
            isInteractive: !1,
            gates: $
        }), e[29] = k, e[30] = s.id, e[31] = u, e[32] = n, e[33] = g, e[34] = d, e[35] = x) : x = e[35], v = x
    }
    if (v == null) return null;
    let P;
    return e[36] !== v ? (P = m.jsx("div", {
        className: "w-full",
        children: v
    }), e[36] = v, e[37] = P) : P = e[37], P
}

function ce(a) {
    "use forget";
    const e = N.c(5),
        {
            children: s
        } = a,
        n = O();
    let t;
    e[0] !== s || e[1] !== n ? (t = s ? ? n.formatMessage(D.previewLoadingFallback), e[0] = s, e[1] = n, e[2] = t) : t = e[2];
    const r = t;
    let o;
    return e[3] !== r ? (o = m.jsx("div", {
        className: "bg-token-bg-tertiary text-token-text-secondary flex aspect-video items-center justify-center rounded-2xl px-4 text-center text-sm",
        children: m.jsx("span", {
            className: "loading-shimmer inline-block font-medium",
            children: r
        })
    }), e[3] = r, e[4] = o) : o = e[4], o
}

function fe(a) {
    const e = oe(a),
        s = new Set;
    for (const n of e.matchAll(le)) {
        const t = n[1] ? ? n[2];
        t == null || !t.startsWith(M) || s.add(t.slice(M.length))
    }
    return Array.from(s)
}

function ue(a) {
    const e = a.toLowerCase();
    return e.endsWith(".html") || e.endsWith(".htm") ? "html" : null
}
const D = q({
    previewLoadingFallback: {
        id: "codeBlockSandboxFilePreview.previewLoadingFallback",
        defaultMessage: "Loading preview"
    },
    previewAvailableAnnouncement: {
        id: "codeBlockSandboxFilePreview.previewAvailableAnnouncement",
        defaultMessage: "Preview available for {fileName}"
    }
});
export {
    ge as CodeBlockSandboxFilePreview
};
//# sourceMappingURL=a46d2176-eiofepfdbe1v31zl.js.map