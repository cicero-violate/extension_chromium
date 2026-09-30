import {
    c as U,
    u as Ce,
    r as E,
    j as T,
    h as He,
    z as Xe,
    p as je
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    I as K,
    mD as Ze,
    nE as et,
    ay as tt,
    c1 as ce,
    cM as nt,
    cI as st,
    dz as rt,
    et as Te,
    fe as ot,
    t8 as at,
    BU as it,
    cO as Be,
    _ as lt,
    gf as ct,
    op as Re,
    lB as ut,
    er as dt,
    e as D,
    af as J,
    no as Ve,
    ey as be,
    aO as ke,
    b5 as Ne,
    t$ as pt,
    ok as mt,
    vX as ft,
    q as ye,
    F as gt,
    f9 as ht,
    dS as Ee,
    l as ze,
    n as St,
    nK as bt,
    av as yt,
    gF as _t,
    b8 as Oe,
    nF as wt,
    o4 as vt,
    aJ as xt,
    y as kt,
    d as ne,
    z as Mt,
    r as At,
    C as Ct,
    be as We,
    df as Tt,
    wS as Et,
    BV as Ot,
    eV as Pt,
    aK as It,
    S as pe,
    x as Ft,
    R as Ut,
    dV as Nt,
    g as $t,
    dL as Lt
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    bF as Ht,
    r9 as De,
    ra as jt,
    rb as Bt,
    ia as L,
    rc as Rt,
    nl as Vt,
    pr as zt,
    ib as Wt,
    nk as Dt,
    rd as Pe,
    re as Kt,
    rf as Gt,
    rg as Ke,
    qR as qt,
    q3 as Ge,
    rh as Qt,
    oP as Yt,
    ri as Jt,
    a1 as ge,
    rj as Xt,
    rk as Zt,
    h7 as me,
    d5 as B,
    rl as en,
    d4 as ue
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    r as Ie
} from "./7f00cfec-f04y2v5idy58f22s.js";

function tn() {
    "use forget";
    const t = U.c(8),
        {
            store: e
        } = Ht();
    let n;
    t[0] === Symbol.for("react.memo_cache_sentinel") ? (n = K(), t[0] = n) : n = t[0];
    const o = n,
        s = Ze(),
        {
            clearSystemHintModeTrigger: r,
            getSystemHintModeTrigger: i
        } = De(),
        l = !jt.useDisabledGlobally(),
        c = et();
    let f;
    return t[1] !== s || t[2] !== r || t[3] !== c || t[4] !== i || t[5] !== l || t[6] !== e ? (f = (a, u, k, b) => {
        const p = e.getSharedProps();
        if (!p) return;
        const {
            conversation: h,
            onResetState: M,
            conversationMode: A
        } = p;
        tt.hideThreadHeader();
        const g = s === ce.Search,
            x = g ? i(ce.Search) : void 0,
            S = nt(h.id),
            O = Bt(u),
            y = S ? .selectedHazelnuts ? Array.from(S.selectedHazelnuts) : [],
            P = O.length > 0 ? Array.from(new Set([...y, ...O])) : y;
        O.length > 0 && st(h.id, I => {
            const ee = new Set(I.selectedHazelnuts ? ? []);
            for (const oe of O) ee.add(oe);
            I.selectedHazelnuts = Array.from(ee)
        });
        let C;
        (u.type === L.Starter || u.type === L.Templated) && (C = u.data ? .system_hint);
        const _ = C ? ? s,
            $ = S ? .selectedSources ? .get(_) ? ? new Set;
        let w, m;
        if (Rt(u)) w = u.categoryId !== "ask" ? [u.categoryId] : [], m = u.modelOverride ? {
            model: u.modelOverride
        } : {};
        else {
            const I = Vt(_ ? [_] : []);
            w = I.systemHints ? ? [], m = I.extraStreamParams ? ? {}
        }
        l && (m.enableMessageFollowups = !0);
        const v = rt(h),
            {
                content: X,
                attachments: G
            } = zt(c, Wt(u), v, A, _),
            R = w.includes(ce.Slurm),
            q = w.includes(ce.Glaux),
            Q = Dt(),
            N = {
                suggestion_type: u.type,
                starter_prompt_id: "id" in u ? u.id : void 0,
                selected_sources: R || q ? Array.from($.values()).map(sn).filter(Boolean) : void 0,
                ...w.length > 0 && {
                    system_hints: w
                },
                ...P.length > 0 && {
                    selected_hazelnuts: P
                }
            };
        if (Q && (N.__internal = {
                search_settings: Q
            }), G.length > 0 && (N.attachments = G), u.type === L.Starter && u.data ? .kaur1br5) {
            const I = u.data ? .kaur1br5;
            N.kaur1br5 = I
        }
        const V = Te(X, N),
            z = [];
        S ? .startedWithByoMcp === !0 && z.push(ot("", {
            disable_tool_ids: ["gmail", "gcal", "gcontacts"]
        }));
        let H;
        if (w ? .some(nn) && at()) {
            const I = it();
            I && (H = I)
        }
        Ie({
            callsiteId: "request_completion.prompt_textarea.use_create_completion_from_suggestion.1",
            conversation: h,
            requestedModelId: H,
            promptMessage: V,
            prependMessages: z,
            sourceEvent: a,
            extraStreamParams: m,
            completionMetadata: {
                suggestions: k,
                suggestion: u,
                suggestionIndex: b,
                conversationMode: A ? ? S ? .mode,
                systemHints: w,
                searchSource: x
            }
        });
        const Z = Be.getCurrentNode(S).message.id;
        M();
        const se = o ? .isK12 ? .() ? "K12 Use Starter Prompt" : void 0,
            re = u.type === L.Starter && u.data ? .quorumHealth === !0;
        if (Pe(u, b, h.id, Z, se), re) {
            const I = u.data ? .health_use_case ? ? u.category ? ? u.theme ? ? "unknown";
            lt.logEvent("Use Quorum Starter Prompt", {
                id: u.id,
                client_thread_id: ct(h),
                message_id: Z,
                use_case: I,
                role: u.data ? .health_role,
                department: u.data ? .health_department,
                context_id: u.data ? .health_context_id,
                context_label: u.data ? .health_context_label
            })
        }
        Re() || Kt(), x && g && r(ce.Search)
    }, t[1] = s, t[2] = r, t[3] = c, t[4] = i, t[5] = l, t[6] = e, t[7] = f) : f = t[7], f
}

function nn(t) {
    return ut(t)
}

function sn(t) {
    return dt[t]
}
const ds = 4;

function ps(t) {
    "use forget";
    const e = U.c(24),
        {
            canShowAutocomplete$: n,
            layoutMode: o,
            pinToVirtualKeyboard: s,
            composerController: r,
            conversation: i
        } = t,
        l = s === void 0 ? !1 : s,
        c = D(n);
    let f;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (f = Gt(), e[0] = f) : f = e[0];
    const u = D(f.supportsVirtualKeyboardApi$),
        k = Ce(),
        [b, p] = E.useState(""),
        h = E.useRef(c);
    let M;
    e[1] !== r ? (M = (w, m, v) => {
        m && Ve(be(r), v ? `${v.title}${v.body}` : "")
    }, e[1] = r, e[2] = M) : M = e[2];
    const A = M;
    let g, x;
    if (e[3] !== c || e[4] !== k ? (g = () => {
            if (h.current && !c) {
                let w;
                const m = window.setTimeout(() => {
                    p(Ae(k, {
                        type: "cleared"
                    })), w = window.setTimeout(() => {
                        p("")
                    }, 300)
                }, 0);
                return h.current = c, () => {
                    window.clearTimeout(m), w !== void 0 && window.clearTimeout(w)
                }
            }
            h.current = c
        }, x = [c, k], e[3] = c, e[4] = k, e[5] = g, e[6] = x) : (g = e[5], x = e[6]), E.useEffect(g, x), !c) {
        if (!b) return null;
        let w;
        return e[7] !== b ? (w = T.jsx("div", {
            "aria-live": "polite",
            className: "sr-only",
            role: "status",
            children: b
        }), e[7] = b, e[8] = w) : w = e[8], w
    }
    let S;
    e[9] !== b ? (S = T.jsx("div", {
        "aria-live": "polite",
        className: "sr-only",
        role: "status",
        children: b
    }), e[9] = b, e[10] = S) : S = e[10];
    const O = o === "center" ? "top-full" : "bottom-full",
        y = u && l && "keyboard-open:fixed keyboard-open:bottom-[calc(var(--screen-keyboard-height,0px)+var(--composer-height,100px)+12px)] keyboard-open:px-4";
    let P;
    e[11] !== O || e[12] !== y ? (P = J("absolute start-0 z-[-1] box-border w-full ps-0", O, y), e[11] = O, e[12] = y, e[13] = P) : P = e[13];
    let C;
    e[14] !== r || e[15] !== i || e[16] !== A ? (C = T.jsx(rn, {
        composerController: r,
        onAnnouncement: p,
        onChange: A,
        conversation: i
    }), e[14] = r, e[15] = i, e[16] = A, e[17] = C) : C = e[17];
    let _;
    e[18] !== C || e[19] !== P ? (_ = T.jsx("div", {
        className: P,
        children: C
    }), e[18] = C, e[19] = P, e[20] = _) : _ = e[20];
    let $;
    return e[21] !== _ || e[22] !== S ? ($ = T.jsxs(T.Fragment, {
        children: [S, _]
    }), e[21] = _, e[22] = S, e[23] = $) : $ = e[23], $
}

function $e(t) {
    return [t.title, t.body].filter(Boolean).join(" ").replace(/\s+/g, " ").trim()
}

function Ae(t, e) {
    switch (e.type) {
        case "available":
            return t.formatMessage(Me.suggestionsAvailable, {
                count: e.count,
                suggestion: $e(e.suggestion)
            });
        case "selected":
            return t.formatMessage(Me.suggestionSelected, {
                count: e.count,
                index: e.index,
                suggestion: $e(e.suggestion)
            });
        case "cleared":
            return t.formatMessage(Me.suggestionsCleared)
    }
}

function rn(t) {
    "use forget";
    const e = U.c(70),
        {
            composerController: n,
            onAnnouncement: o,
            onSelect: s,
            onChange: r,
            conversation: i
        } = t;
    let l;
    e[0] !== n ? (l = Ke(n), e[0] = n, e[1] = l) : l = e[1];
    const c = l;
    let f;
    e[2] !== c ? (f = () => c.autocompletions$(), e[2] = c, e[3] = f) : f = e[3];
    const a = D(f);
    let u;
    e[4] !== c ? (u = () => c.shouldShowAutocomplete$(), e[4] = c, e[5] = u) : u = e[5];
    const k = D(u),
        b = tn(),
        [p, h] = E.useState(-1),
        M = E.useRef(0),
        A = E.useRef(-1),
        g = E.useRef(null);
    let x, S;
    e[6] !== i.id || e[7] !== k || e[8] !== a ? (x = () => {
        k && a.length > 0 && a.every(an) && qt(a, i.id)
    }, S = [a, k, i.id], e[6] = i.id, e[7] = k, e[8] = a, e[9] = x, e[10] = S) : (x = e[9], S = e[10]), E.useEffect(x, S);
    let O;
    e[11] !== b || e[12] !== s ? (O = (d, F, j, le) => {
        if (F.onSelectOverride) return F.onSelectOverride(d, F, j, le);
        if (F.type === L.Templated) {
            const Je = {
                id: F.id ? ? `dyn-${Date.now()}`,
                name: F.title,
                prompt: F.prompt,
                description: F.title ? ? null
            };
            pt({
                prompt: Je,
                referer: "autocomplete-suggestion"
            }), s ? .(F, j, le);
            return
        }
        s ? .(F, j, le), b(d, F, j, le)
    }, e[11] = b, e[12] = s, e[13] = O) : O = e[13];
    const y = O,
        P = a.length > 0,
        [C, _] = E.useState(!1);
    let $;
    e[14] !== r || e[15] !== p || e[16] !== a ? ($ = () => {
        if (a.length === 0) return !1;
        const d = p === a.length - 1 ? 0 : p + 1;
        return g.current = "keyboard", h(d), r ? .(d, !0, a[d]), !0
    }, e[14] = r, e[15] = p, e[16] = a, e[17] = $) : $ = e[17];
    const w = ke($);
    let m;
    e[18] !== r || e[19] !== p || e[20] !== a ? (m = () => {
        if (a.length === 0) return !1;
        const d = p <= 0 ? a.length - 1 : p - 1;
        return g.current = "keyboard", h(d), r ? .(d, !0, a[d]), !0
    }, e[18] = r, e[19] = p, e[20] = a, e[21] = m) : m = e[21];
    const v = ke(m);
    let X;
    e[22] !== y || e[23] !== p || e[24] !== a ? (X = d => a[p] ? (y(d, a[p], a, p), !0) : !1, e[22] = y, e[23] = p, e[24] = a, e[25] = X) : X = e[25];
    const G = ke(X);
    let R, q;
    e[26] !== n || e[27] !== w || e[28] !== v || e[29] !== G ? (R = () => mt(be(n), {
        ArrowDown: w,
        ArrowUp: v,
        Enter: G
    }), q = [n, w, v, G], e[26] = n, e[27] = w, e[28] = v, e[29] = G, e[30] = R, e[31] = q) : (R = e[30], q = e[31]), E.useEffect(R, q);
    let Q, N;
    e[32] !== C ? (Q = () => {
        if (!C) {
            const d = () => {
                _(!0), window.removeEventListener("mousemove", d)
            };
            return window.addEventListener("mousemove", d), () => {
                window.removeEventListener("mousemove", d)
            }
        }
    }, N = [C], e[32] = C, e[33] = Q, e[34] = N) : (Q = e[33], N = e[34]), E.useEffect(Q, N);
    let V;
    e[35] !== r ? (V = () => {
        g.current = null, h(-1), r ? .(-1, !1), _(!1)
    }, e[35] = r, e[36] = V) : V = e[36];
    let z;
    e[37] !== r || e[38] !== a ? (z = [a, r], e[37] = r, e[38] = a, e[39] = z) : z = e[39], E.useEffect(V, z);
    const H = Ce();
    let de;
    e[40] !== H || e[41] !== o || e[42] !== a[0] || e[43] !== a.length ? (de = () => {
        const d = M.current;
        a.length > 0 && d === 0 && o ? .(Ae(H, {
            type: "available",
            count: a.length,
            suggestion: a[0]
        })), M.current = a.length
    }, e[40] = H, e[41] = o, e[42] = a[0], e[43] = a.length, e[44] = de) : de = e[44];
    let Z;
    e[45] !== H || e[46] !== o || e[47] !== a ? (Z = [H, o, a], e[45] = H, e[46] = o, e[47] = a, e[48] = Z) : Z = e[48], E.useEffect(de, Z);
    let se, re;
    e[49] !== H || e[50] !== o || e[51] !== p || e[52] !== a ? (se = () => {
        g.current === "keyboard" && p >= 0 && p < a.length && p !== A.current && o ? .(Ae(H, {
            type: "selected",
            count: a.length,
            index: p + 1,
            suggestion: a[p]
        })), A.current = p
    }, re = [H, o, p, a], e[49] = H, e[50] = o, e[51] = p, e[52] = a, e[53] = se, e[54] = re) : (se = e[53], re = e[54]), E.useEffect(se, re);
    let I, ee, oe;
    e[55] === Symbol.for("react.memo_cache_sentinel") ? (I = {
        opacity: 0
    }, ee = {
        opacity: 1
    }, oe = {
        opacity: 0
    }, e[55] = I, e[56] = ee, e[57] = oe) : (I = e[55], ee = e[56], oe = e[57]);
    const xe = P ? "flex" : "hidden";
    let ae;
    e[58] !== xe ? (ae = J("divide-token-border-light w-full flex-col divide-y p-2.5 max-sm:px-0", xe), e[58] = xe, e[59] = ae) : ae = e[59];
    let ie;
    e[60] !== C || e[61] !== n || e[62] !== y || e[63] !== r || e[64] !== p || e[65] !== a ? (ie = a.map((d, F) => T.jsx(Ne.li, {
        initial: {
            opacity: 0,
            translateY: 4
        },
        animate: {
            opacity: 1,
            translateY: 0
        },
        transition: {
            delay: F * .03
        },
        exit: {
            opacity: 0,
            translateY: 4
        },
        className: "w-full",
        children: T.jsxs("button", {
            className: J("flex w-full cursor-pointer items-center justify-start rounded-lg px-2.5 py-3 text-start whitespace-pre-wrap", p === F ? "bg-token-main-surface-secondary" : "bg-token-main-surface-primary"),
            onClick: j => {
                j.preventDefault(), y(j, d, a, F), Re() && be(n).dom.blur()
            },
            onMouseDown: on,
            onMouseEnter: () => {
                C && (g.current = "pointer", h(F), r ? .(F, !1, d))
            },
            onMouseLeave: () => {
                g.current = null, h(-1), r ? .(-1, !1, d)
            },
            children: [d.source === "CURATED" && (d.iconThumbnailUrl || d.coverThumbnailImageUrl) ? T.jsx("img", {
                className: J("me-2 flex-none rounded-md object-cover", d.coverThumbnailImageUrl ? "h-7 w-7" : "h-8 w-8"),
                src: d.iconThumbnailUrl || d.coverThumbnailImageUrl,
                alt: ""
            }) : d.emoji ? T.jsx("span", {
                "aria-hidden": "true",
                className: J("bg-primary text-token-text-primary text-md me-4 flex flex-none items-center justify-center"),
                children: d.emoji
            }) : d.icon ? T.jsx("span", {
                className: "text-token-text-secondary icon me-2 flex-none",
                children: d.icon
            }) : null, T.jsx("span", {
                className: J(d.category === "personalized" ? "text-md" : "text-sm", "whitespace-pre-wrap"),
                children: d.autocompletionChunks && d.autocompletionChunks.length > 0 ? T.jsx(T.Fragment, {
                    children: d.autocompletionChunks.map((j, le) => T.jsx("span", {
                        className: J(j.className ? ? (j.isMatched ? "text-token-text-tertiary" : d.category === "personalized" ? "text-token-text-secondary" : "text-token-text-primary")),
                        children: j.text
                    }, le))
                }) : d.source === "CURATED" ? T.jsx("span", {
                    className: J("text-pretty", d.type === L.Starter || d.type === L.Trending ? "text-token-text-secondary" : "text-token-text-tertiary"),
                    children: d.title
                }) : T.jsxs(T.Fragment, {
                    children: [T.jsx("span", {
                        className: J("text-pretty", d.type === L.Starter || d.type === L.Trending ? "text-token-text-secondary" : "text-token-text-tertiary"),
                        children: d.title
                    }), T.jsx("span", {
                        className: "text-token-text-primary text-pretty",
                        children: d.body
                    })]
                })
            }), d.trailing ? d.trailing : null]
        })
    }, d.id ? ? F)), e[60] = C, e[61] = n, e[62] = y, e[63] = r, e[64] = p, e[65] = a, e[66] = ie) : ie = e[66];
    let fe;
    return e[67] !== ae || e[68] !== ie ? (fe = T.jsx("div", {
        className: "bg-token-bg-primary w-full",
        children: T.jsx(Ne.ul, {
            initial: I,
            animate: ee,
            exit: oe,
            className: ae,
            children: ie
        })
    }), e[67] = ae, e[68] = ie, e[69] = fe) : fe = e[69], fe
}

function on(t) {
    t.preventDefault()
}

function an(t) {
    return t.type === L.Autocomplete || t.type === L.Trending
}

function ln(t, e) {
    t = t.toLocaleLowerCase();
    const n = e;
    e = e.toLocaleLowerCase();
    const o = [];
    let s = 0;
    for (let l = 0; l < e.length && (s < t.length && t[s] === e[l] && (o.push(l), s++), s !== t.length); l++);
    const r = [];
    let i = 0;
    if (o.forEach(l => {
            if (l > i) {
                const c = n.slice(i, l);
                c && r.push({
                    text: c,
                    isMatched: !1
                })
            }
            r.push({
                text: n[l],
                isMatched: !0
            }), i = l + 1
        }), i < e.length) {
        const l = n.slice(i);
        l && r.push({
            text: l,
            isMatched: !1
        })
    }
    return cn(r)
}

function cn(t) {
    if (t.length === 0) return t;
    const e = [t[0]];
    for (let o = 1; o < t.length; o++) {
        const s = e[e.length - 1],
            r = t[o];
        s.isMatched === r.isMatched ? s.text += r.text : e.push(r)
    }
    const n = e.filter(o => o.isMatched).reduce((o, s) => o + s.text.trim().length, 0);
    return e.length <= 4 && n >= 2 ? e : [{
        text: e.map(o => o.text).join(""),
        isMatched: !1
    }]
}
const Me = He({
        suggestionsAvailable: {
            id: "AutocompleteSuggestions.suggestionsAvailable",
            defaultMessage: "{count, plural, one {# suggestion available. First suggestion: {suggestion}} other {# suggestions available. First suggestion: {suggestion}}}"
        },
        suggestionSelected: {
            id: "AutocompleteSuggestions.suggestionSelected",
            defaultMessage: "Suggestion {index} of {count}: {suggestion}"
        },
        suggestionsCleared: {
            id: "AutocompleteSuggestions.suggestionsCleared",
            defaultMessage: "Suggestions cleared"
        }
    }),
    ms = () => ({
        isFinservPromptEligible: !1,
        isLoading: !1,
        isFinservRoute: !1
    });

function Le(t) {
    return (ft(t) ? t.promptStarters : t.gizmo.display.prompt_starters) ? .map(e => ({
        type: L.Starter,
        title: "",
        body: e,
        prompt: e
    }))
}

function un() {
    "use forget";
    const t = U.c(1),
        e = ze(),
        n = Yt(Jt);
    let o;
    t[0] === Symbol.for("react.memo_cache_sentinel") ? (o = St(), t[0] = o) : o = t[0];
    const s = o,
        [r] = E.useState(dn);
    return !s && n < 20 || s && e && r - e.created < 1209600
}

function dn() {
    return Date.now() / 1e3
}

function pn() {
    const {
        enabled: t
    } = mn();
    return t
}

function mn() {
    const e = K() ? .getWorkspaceId(),
        {
            data: n,
            isLoading: o
        } = gt(e),
        s = ye("4233029563"),
        r = ye("597299768"),
        i = !!n ? .permissions ? .includes(ht.EnhancedCitations),
        l = (s || i) && !r;
    return {
        enabled: l,
        isLoading: !l && e != null && o === !0
    }
}

function Fe() {
    return pn()
}
const fn = () => {
    "use forget";
    const t = U.c(3);
    let e;
    t[0] === Symbol.for("react.memo_cache_sentinel") ? (e = Ge({
        logExposure: !0
    }), t[0] = e) : e = t[0];
    const n = e,
        o = un(),
        s = Fe();
    if (_e() || s) return gn;
    let r;
    return t[1] !== o ? (r = () => {
        const i = n.get(o ? "web-enable-for-new-users" : "web_enable_for_existing_users", !1);
        return kt().catch(hn), i
    }, t[1] = o, t[2] = r) : r = t[2], r
};

function _e() {
    "use forget";
    const t = U.c(1);
    let e;
    if (t[0] === Symbol.for("react.memo_cache_sentinel")) {
        const n = K(),
            o = ye("4100765009");
        e = (n ? .isK12() ? ? !1) || o, t[0] = e
    } else e = t[0];
    return e
}

function qe({
    shouldBeEnabledForDefaultAssistant: t,
    clientThreadId: e
}) {
    const n = fn(),
        o = K(),
        s = Ee(e, c => c ? .mode),
        r = Qt(s);
    let i = !o ? .isEnterprisey();
    const l = Fe();
    return (_e() || l) && (i = !0), t && !r && i && n()
}

function fs(t) {
    "use forget";
    const e = U.c(3),
        {
            shouldBeEnabledForDefaultAssistant: n,
            clientThreadId: o
        } = t,
        s = Ge();
    let i = s.get("homepage_prompt_style", "chips");
    const l = Fe();
    (_e() || l) && (i = "tiles"), (s.get("use_case_prompts_enabled", !1) || s.get("use_baseline_prompts", !1)) && (i = "use-case-styles");
    let c;
    return e[0] !== o || e[1] !== n ? (c = {
        shouldBeEnabledForDefaultAssistant: n,
        clientThreadId: o
    }, e[0] = o, e[1] = n, e[2] = c) : c = e[2], qe(c) ? i : "chips"
}
const gs = t => {
    "use forget";
    const e = U.c(19),
        {
            clientThreadId: n,
            limit: o,
            shouldBeEnabledForDefaultAssistant: s,
            modelSlug: r
        } = t,
        i = bt(),
        {
            autocompletions$: l
        } = Ke(i),
        c = yt(),
        f = Ce(),
        {
            clearAllSystemHintModeTriggers: a,
            setThreadSystemHintMode: u
        } = De(),
        k = Ee(n, Sn),
        b = _t(k ? .kind === Oe.GizmoInteraction ? k.gizmo_id : void 0).data,
        {
            gizmoEditorData: p,
            mode: h
        } = wt();
    let M;
    e[0] !== n || e[1] !== s ? (M = {
        shouldBeEnabledForDefaultAssistant: s,
        clientThreadId: n
    }, e[0] = n, e[1] = s, e[2] = M) : M = e[2];
    const A = qe(M);
    let g;
    e[3] !== o || e[4] !== r ? (g = Zt(o, r), e[3] = o, e[4] = r, e[5] = g) : g = e[5];
    let x;
    e[6] !== A || e[7] !== g ? (x = { ...g,
        enabled: A
    }, e[6] = A, e[7] = g, e[8] = x) : x = e[8];
    const {
        data: S,
        isSuccess: O
    } = Xe(x);
    if (c == null) {
        let m;
        return e[9] === Symbol.for("react.memo_cache_sentinel") ? (m = {
            promptStarters: [],
            isLoading: !0,
            isSuccess: !1
        }, e[9] = m) : m = e[9], m
    }
    if (h === "test" && p) {
        let m;
        e[10] !== p ? (m = Le(p) ? ? [], e[10] = p, e[11] = m) : m = e[11];
        let v;
        return e[12] !== m ? (v = {
            promptStarters: m,
            isLoading: !1,
            isSuccess: !0
        }, e[12] = m, e[13] = v) : v = e[13], v
    }
    if (b != null) {
        let m;
        e[14] !== b ? (m = Le(b), e[14] = b, e[15] = m) : m = e[15];
        let v;
        return e[16] !== m ? (v = {
            promptStarters: m,
            isLoading: !1,
            isSuccess: !0
        }, e[16] = m, e[17] = v) : v = e[17], v
    }
    if (!A) {
        let m;
        return e[18] === Symbol.for("react.memo_cache_sentinel") ? (m = {
            promptStarters: [],
            isLoading: !1,
            isSuccess: !0
        }, e[18] = m) : m = e[18], m
    }
    const y = S ? .items.map(bn) ? ? [],
        P = (m, v, X, G) => {
            const R = be(i);
            if (v.type === L.Starter && v.category === "dalle") {
                requestAnimationFrame(() => {
                    a(), u(ce.PictureV2, !0, {}), vt(R)
                }), l.set(Xt(f));
                return
            }
            const q = v.title;
            l.set([]), R.focus(), Ve(R, q), requestAnimationFrame(() => {
                const Q = y.filter(N => N.theme === v.theme).map(N => {
                    const V = xt(N.oneliner),
                        z = V.startsWith(N.title);
                    return { ...N,
                        title: z ? `${N.title} ` : "",
                        body: z ? N.body : V,
                        autocompletionChunks: ln(q, V),
                        type: L.Autocomplete
                    }
                });
                l.set(Q), Pe(v, G, n)
            })
        },
        C = [],
        _ = y ? .reduce(yn, {});
    if (_)
        for (const m in _) m !== "For you" && C.push(_[m]);
    const $ = C.length > 0,
        w = s && O && $;
    return s && (ge.markStart("StarterPromptChips", ge.NS_COMPOSER), w && ge.markRendered("StarterPromptChips", ge.NS_COMPOSER)), {
        onSelectStarterPrompt: P,
        shouldShowStarterPrompts: w,
        promptStarters: C
    }
};

function gn() {
    return !0
}

function hn() {}

function Sn(t) {
    return t ? .mode
}

function bn(t) {
    return {
        type: L.Starter,
        id: t.id,
        title: t.title,
        body: t.description,
        prompt: t.prompt,
        category: t.category,
        oneliner: t.oneliner,
        theme: t.theme,
        requires_file_upload: t.requires_file_upload,
        emoji: t.emoji
    }
}

function yn(t, e) {
    return e.theme && !t[e.theme] && (t[e.theme] = e), t
}
const W = ne(null),
    te = ne(null),
    Qe = {
        status: "idle",
        conversationId: null,
        redirectTarget: null,
        variant: null,
        userId: null
    },
    _n = {
        status: "complete",
        conversationId: null,
        redirectTarget: null,
        variant: null,
        userId: null
    },
    Y = ne(Qe),
    wn = "__unknown_user__",
    he = ne(null);

function vn(t) {
    return t === "empty_thread" ? "empty_thread" : t === "generic" ? "generic" : "personalized"
}

function Se(t) {
    return { ..._n,
        userId: t
    }
}

function xn(t) {
    return t ? ? wn
}

function kn(t) {
    if (typeof t == "object" && t !== null && "conversation_id" in t) {
        const e = t.conversation_id;
        if (typeof e == "string") return e
    }
    return null
}

function Mn(t) {
    const e = K(),
        n = ye("4100765009");
    return e ? .isK12() || n ? "k12" : t ? .isHipaaCompliantWorkspace ? "health" : e ? .isEnterprise() || e ? .isSelfServeBusiness() ? "new" : null
}

function An() {
    "use forget";
    const t = U.c(16),
        {
            eligible: e,
            isLoading: n
        } = me(B.NewOnboardingFlow),
        s = ze() ? .id ? ? null,
        r = D(On);
    let i;
    t[0] !== s ? (i = () => {
        const g = Y();
        return g.userId === s ? g : Qe
    }, t[0] = s, t[1] = i) : i = t[1];
    const l = D(i),
        c = Ye(),
        [f] = je();
    let a;
    t[2] !== f ? (a = f.get("from_webview"), t[2] = f, t[3] = a) : a = t[3];
    const u = a === "ios";
    let k;
    t[4] === Symbol.for("react.memo_cache_sentinel") ? (k = K() ? .isFree(), t[4] = k) : k = t[4];
    const b = k,
        p = En;
    let h, M;
    t[5] !== e || t[6] !== c || t[7] !== u || t[8] !== n || t[9] !== s ? (h = () => {
        if (!e || n || c || !b || s == null) return;
        const g = xn(s);
        if (!u && he() === g && he.set(null), u) {
            he() !== g && (pe.logEvent("chatgpt_conversational_onboarding_ios_skip", null, {
                reason: "direct_purchase_route"
            }), he.set(g));
            return
        }
        W.set(Tn), te.set(!1), en.set(!1);
        const x = Y();
        if (x.userId === s && x.status !== "idle") return;
        const S = Ft("4200615758"),
            O = S.get("show_guided_onboarding", !0),
            y = vn(S.get("variant", "default"));
        if (O) {
            Y.set(Se(s));
            return
        }
        if (y === "empty_thread") {
            pe.logEvent("chatgpt_conversational_onboarding_bootstrap_skipped", null, {
                reason: "empty_thread",
                redirect_target: "empty_thread",
                variant: y
            }), Y.set({ ...Se(s),
                redirectTarget: "empty_thread",
                variant: y
            });
            return
        }
        Y.set({
            status: "loading",
            conversationId: null,
            redirectTarget: "conversation",
            variant: y,
            userId: s
        }), pe.logEvent("chatgpt_conversational_onboarding_bootstrap_started", null, {
            redirect_target: "conversation",
            variant: y
        });
        const P = s;
        Ut.safePost("/feed/create_onboarding_conversation", {
            requestBody: {
                use_cases: [],
                variant: y
            }
        }).then(C => {
            if (Y().userId !== P) return;
            const _ = kn(C),
                $ = {
                    redirect_target: "conversation",
                    status: _ == null ? "missing_conversation_id" : "success",
                    variant: y
                };
            _ != null && ($.conversation_id = _), pe.logEvent("chatgpt_conversational_onboarding_bootstrap_completed", null, $), _ != null && Nt($t()), Y.set({
                status: "complete",
                conversationId: _,
                redirectTarget: _ == null ? null : "conversation",
                variant: _ == null ? null : y,
                userId: P
            })
        }, () => {
            Y().userId === P && (pe.logEvent("chatgpt_conversational_onboarding_bootstrap_completed", null, {
                redirect_target: "conversation",
                status: "error",
                variant: y
            }), Y.set(Se(P)))
        })
    }, M = [e, n, c, b, u, s], t[5] = e, t[6] = c, t[7] = u, t[8] = n, t[9] = s, t[10] = h, t[11] = M) : (h = t[10], M = t[11]), E.useEffect(h, M);
    let A;
    return t[12] !== n || t[13] !== r || t[14] !== l ? (A = {
        isOpen: r,
        isLoading: n,
        closeModal: Cn,
        markAsViewed: p,
        onboardingConversationBootstrap: l
    }, t[12] = n, t[13] = r, t[14] = l, t[15] = A) : A = t[15], A
}

function Cn() {
    return W.set(!1)
}

function Tn(t) {
    return t ? ? !0
}

function En() {
    return ue(B.NewOnboardingFlow)
}

function On() {
    return W() === !0
}

function Pn() {
    "use forget";
    const t = U.c(21),
        e = K(),
        n = Mt(),
        o = e ? .isWorkspacePlan(),
        s = e ? .isEnterprisey(),
        r = e ? .isSelfServeBusiness(),
        i = e ? .isSelfServeBusinessUsageBased(),
        l = _e(),
        c = n ? .isHipaaCompliantWorkspace ? ? !1;
    let f;
    t[0] !== n ? .isFedrampCompliantWorkspace ? (f = n ? .isFedrampCompliantWorkspace ? ? At.getBooleanCookie(Ct.WorkspaceIsFedrampCompliant) ? ? !1, t[0] = n ? .isFedrampCompliantWorkspace, t[1] = f) : f = t[1];
    const a = f;
    let u;
    t[2] !== n ? (u = Mn(n), t[2] = n, t[3] = u) : u = t[3];
    const k = u,
        {
            eligible: b,
            isLoading: p
        } = me(B.Onboarding),
        h = Ye(),
        M = D(jn),
        A = !!o && n === null;
    let g, x;
    t[4] !== b || t[5] !== h || t[6] !== s || t[7] !== a || t[8] !== c || t[9] !== l || t[10] !== p || t[11] !== i || t[12] !== r || t[13] !== o ? (g = () => {
        if (!(!o || !b || p || h))
            if (l) W.set(Hn), te.set(!1);
            else if (c) {
            if (Lt("217573384") ? .get("enabled")) {
                W.set(Ln), te.set(!1);
                return
            }
        } else if (a) {
            W.set($n);
            return
        } else s ? (W.set(Nn), te.set(!1)) : r && !i && (W.set(Un), te.set(!1))
    }, x = [o, l, b, p, h, a, i, s, r, c], t[4] = b, t[5] = h, t[6] = s, t[7] = a, t[8] = c, t[9] = l, t[10] = p, t[11] = i, t[12] = r, t[13] = o, t[14] = g, t[15] = x) : (g = t[14], x = t[15]), E.useEffect(g, x);
    let S;
    return t[16] !== p || t[17] !== M || t[18] !== A || t[19] !== k ? (S = {
        isOpen: M,
        isLoading: p,
        isWorkspaceOnboardingVariantLoading: A,
        closeModal: Fn,
        markAsViewed: In,
        workspaceOnboardingVariant: k
    }, t[16] = p, t[17] = M, t[18] = A, t[19] = k, t[20] = S) : S = t[20], S
}

function In() {
    return ue(B.Onboarding)
}

function Fn() {
    W.set(!1), zn("completed")
}

function Un(t) {
    return t ? ? !0
}

function Nn(t) {
    return t ? ? !0
}

function $n(t) {
    return t === !0 ? !1 : t
}

function Ln(t) {
    return t ? ? !0
}

function Hn(t) {
    return t ? ? !0
}

function jn() {
    return W() === !0
}

function hs() {
    "use forget";
    const t = U.c(4);
    let e;
    t[0] === Symbol.for("react.memo_cache_sentinel") ? (e = K() ? .isWorkspacePlan(), t[0] = e) : e = t[0];
    const n = e,
        o = An(),
        s = Pn();
    let r;
    return t[1] !== o || t[2] !== s ? (r = n ? { ...s,
        isWorkspaceUser: !0,
        onboardingConversationBootstrap: Se(null)
    } : { ...o,
        isWorkspaceUser: !1,
        isWorkspaceOnboardingVariantLoading: !1,
        workspaceOnboardingVariant: void 0
    }, t[1] = o, t[2] = s, t[3] = r) : r = t[3], r
}

function Ye() {
    "use forget";
    const t = U.c(2),
        [e] = je();
    let n;
    return t[0] !== e ? (n = e.has("prompt"), t[0] = e, t[1] = n) : n = t[1], n
}
const Ss = He({
        hi: {
            id: "new_user_onboarding.hi",
            defaultMessage: "Hi"
        },
        hiThere: {
            id: "new_user_onboarding.hi_there",
            defaultMessage: "Hi there"
        },
        tryUploadingAFile: {
            defaultMessage: "Try uploading a file",
            id: "chatgpt.new-onboarding.try-uploading-a-file"
        },
        uploadFileExample: {
            defaultMessage: "ChatGPT can summarize and analyze your files or images.",
            id: "chatgpt.new-onboarding.upload-file-exp"
        },
        school: {
            defaultMessage: "School",
            id: "chatgpt.new-onboarding.school"
        },
        schoolPrompt: {
            defaultMessage: "I’m trying to learn and do better in school.",
            id: "chatgpt.new-onboarding.school-prompt"
        },
        work: {
            defaultMessage: "Work",
            id: "chatgpt.new-onboarding.work"
        },
        workPrompt: {
            defaultMessage: "I'm here to learn and grow in my work.",
            id: "chatgpt.new-onboarding.work-prompt"
        },
        personalTasks: {
            defaultMessage: "Personal tasks",
            id: "chatgpt.new-onboarding.personal-tasks"
        },
        personalTasksPrompt: {
            defaultMessage: "I'm here for my personal tasks",
            id: "chatgpt.new-onboarding.personal-tasks-prompt"
        },
        funAndEntertainment: {
            defaultMessage: "Fun and entertainment",
            id: "chatgpt.new-onboarding.fun-and-entertainment"
        },
        funAndEntertainmentPrompt: {
            defaultMessage: "I'm here to explore fun ideas and relax.",
            id: "chatgpt.new-onboarding.fun-and-entertainment-prompt"
        },
        other: {
            defaultMessage: "Other",
            id: "chatgpt.new-onboarding.other"
        },
        justCurious: {
            defaultMessage: "Just curious",
            id: "chatgpt.new-onboarding.just-curious"
        },
        justCuriousPrompt: {
            defaultMessage: "I'm just curious, exploring what you can do.",
            id: "chatgpt.new-onboarding.just-curious-prompt"
        },
        tryAnExample: {
            defaultMessage: "Try an example below or send any message in the message box below.",
            id: "chatgpt.new-onboarding.try-an-example"
        }
    }),
    bs = t => {
        "use forget";
        const e = U.c(4),
            {
                clientThreadId: n
            } = t;
        let o;
        e[0] !== n ? (o = We(n), e[0] = n, e[1] = o) : o = e[1];
        const s = o;
        let r;
        return e[2] !== s ? (r = i => {
            const {
                stepPrompt: l,
                messageMetadata: c,
                authorMetadata: f,
                ...a
            } = i;
            Ie({
                callsiteId: "request_completion.onboarding.new_user_onboarding.1",
                conversation: s,
                ...a,
                promptMessage: Te(l, c ? ? void 0, f ? ? void 0),
                completionMetadata: {
                    isOnboardingConversation: !0,
                    conversationMode: {
                        kind: Oe.PrimaryAssistant
                    },
                    systemHints: c ? .onboarding ? .system_hints
                },
                skipNotification: !0
            })
        }, e[2] = s, e[3] = r) : r = e[3], r
    },
    ys = t => {
        "use forget";
        const e = U.c(6),
            {
                clientThreadId: n
            } = t;
        let o;
        e[0] !== n ? (o = We(n), e[0] = n, e[1] = o) : o = e[1];
        const s = o,
            {
                open: r
            } = es();
        let i;
        return e[2] !== n || e[3] !== s || e[4] !== r ? (i = l => {
            const {
                suggestedPrompt: c,
                index: f,
                isOnboarding: a
            } = l;
            a && (ue(B.Onboarding), r()), Ie({
                callsiteId: "request_completion.onboarding.new_user_onboarding.2",
                conversation: s,
                promptMessage: Te(c.prompt, {
                    is_starter_prompt: !0,
                    suggestion_type: L.Starter,
                    starter_prompt_id: c.id
                }),
                eventSource: "mouse",
                completionMetadata: {
                    conversationMode: {
                        kind: Oe.PrimaryAssistant
                    }
                },
                skipNotification: !0
            }), Pe(c, f, n)
        }, e[2] = n, e[3] = s, e[4] = r, e[5] = i) : i = e[5], i
    };

function _s(t) {
    "use forget";
    const e = U.c(6),
        n = Ee(t, Rn),
        {
            eligible: o,
            isLoading: s
        } = me(B.hasSeenFilePickerNuxTooltip),
        r = Bn;
    let i;
    e[0] !== o || e[1] !== s || e[2] !== n ? .triggered_tools ? (i = n ? .triggered_tools ? .includes("file_upload") && o && !s, e[0] = o, e[1] = s, e[2] = n ? .triggered_tools, e[3] = i) : i = e[3];
    let l;
    return e[4] !== i ? (l = {
        isEligible: i,
        markAsViewed: r
    }, e[4] = i, e[5] = l) : l = e[5], l
}

function Bn() {
    return ue(B.hasSeenFilePickerNuxTooltip)
}

function Rn(t) {
    return Be.findNode(t, Vn) ? .message.metadata ? .onboarding
}

function Vn(t) {
    return t.message.author.role === Tt.User
}
const Ue = ne(null);

function zn(t) {
    if (typeof window > "u" || !Et()) return;
    const e = Ot(JSON.stringify({
        type: "enterprise_onboarding_complete",
        reason: t
    }));
    if (Pt()) {
        window.webkit ? .messageHandlers ? .onboardingComplete ? .postMessage ? .(e);
        return
    }
    It() && (window.openai ? ? window.Android) ? .postMessage ? .(e)
}
const we = ne({
    isOpen: null,
    isUserTriggered: !1
});

function ws() {
    "use forget";
    const t = U.c(9),
        {
            eligible: e,
            isLoading: n
        } = me(B.NewPromptOnboardingFlow),
        {
            isOpen: o,
            isUserTriggered: s
        } = D(Qn);
    let r;
    t[0] === Symbol.for("react.memo_cache_sentinel") ? (r = K() ? .isFree(), t[0] = r) : r = t[0];
    const i = r,
        l = qn;
    let c, f;
    t[1] !== e || t[2] !== n ? (c = () => {
        e && !n && i && we.set(Gn)
    }, f = [e, n, i], t[1] = e, t[2] = n, t[3] = c, t[4] = f) : (c = t[3], f = t[4]), E.useEffect(c, f);
    const a = !!o;
    let u;
    return t[5] !== n || t[6] !== s || t[7] !== a ? (u = {
        isOpen: a,
        isUserTriggered: s,
        isLoading: n,
        reopenModal: Kn,
        closeModal: Wn,
        markAsViewed: l
    }, t[5] = n, t[6] = s, t[7] = a, t[8] = u) : u = t[8], u
}

function Wn() {
    return we.set(Dn)
}

function Dn(t) {
    return { ...t,
        isOpen: !1
    }
}

function Kn() {
    return we.set({
        isOpen: !0,
        isUserTriggered: !0
    })
}

function Gn(t) {
    return { ...t,
        isOpen: t.isOpen ? ? !0
    }
}

function qn() {
    return ue(B.NewPromptOnboardingFlow)
}

function Qn() {
    return we()
}

function vs() {
    "use forget";
    const t = U.c(8),
        {
            eligible: e,
            isLoading: n
        } = me(B.NewStaticOnboardingFlow),
        o = D(Zn);
    let s;
    t[0] === Symbol.for("react.memo_cache_sentinel") ? (s = K() ? .isFree(), t[0] = s) : s = t[0];
    const r = s,
        i = Xn;
    let l, c;
    t[1] !== e || t[2] !== n ? (l = () => {
        e && !n && r && (Ue.set(Jn), te.set(!1))
    }, c = [e, n, r], t[1] = e, t[2] = n, t[3] = l, t[4] = c) : (l = t[3], c = t[4]), E.useEffect(l, c);
    const f = !!o;
    let a;
    return t[5] !== n || t[6] !== f ? (a = {
        isOpen: f,
        isLoading: n,
        closeModal: Yn,
        markAsViewed: i
    }, t[5] = n, t[6] = f, t[7] = a) : a = t[7], a
}

function Yn() {
    Ue.set(!1), te.set(!0)
}

function Jn(t) {
    return t ? ? !0
}

function Xn() {
    return ue(B.NewStaticOnboardingFlow)
}

function Zn() {
    return Ue() === !0
}
const ve = ne({
    isOpen: !1,
    viewedInClientThreadId: null
});

function es() {
    "use forget";
    const t = U.c(3),
        {
            isOpen: e,
            viewedInClientThreadId: n
        } = D(as);
    let o;
    return t[0] !== e || t[1] !== n ? (o = {
        isOpen: e,
        viewedInClientThreadId: n,
        close: rs,
        open: ns,
        markViewedInClientThreadId: ts
    }, t[0] = e, t[1] = n, t[2] = o) : o = t[2], o
}

function ts(t) {
    return ve.set(e => ({ ...e,
        viewedInClientThreadId: t
    }))
}

function ns() {
    return ve.set(ss)
}

function ss(t) {
    return { ...t,
        isOpen: !0
    }
}

function rs() {
    return ve.set(os)
}

function os(t) {
    return { ...t,
        isOpen: !1
    }
}

function as() {
    return ve()
}
export {
    ps as A, ds as N, vs as a, ws as b, tn as c, te as d, bs as e, ys as f, Le as g, _s as h, W as i, gs as j, fs as k, qe as l, Ss as m, zn as n, mn as o, _e as p, ms as q, Mn as r, hs as u
};
//# sourceMappingURL=84e8f385-lndtlkfi7kijfbdy.js.map