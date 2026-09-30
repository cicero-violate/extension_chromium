const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/aa5ac567-b4lngd7i53f25hoi.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/conversation-small-cqp6votf.css"]))) => i.map(i => d[i]);
import {
    c as z,
    u as vt,
    j as i,
    h as At,
    r as T,
    o as St,
    _ as Vt
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    P as ut,
    l as Xe,
    a as Ft
} from "./aaa2d182-da7hz3gf5lvb4501.js";
import {
    af as D,
    e as st,
    bP as Bt,
    E as Ht,
    Gl as wt,
    fB as qt,
    be as yt,
    cV as Ut,
    iD as ft,
    cN as Ct,
    cF as Kt,
    d as Wt,
    dS as Tt,
    cO as tt,
    ke as zt,
    f as Gt,
    x as nt,
    aN as It,
    aw as Ce,
    sb as Yt,
    R as Xt,
    v as Jt,
    cI as Qt,
    cQ as Zt,
    mc as es,
    sp as ts,
    ch as ss,
    mV as ns,
    CP as Je,
    Gm as rs
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    A6 as os,
    A7 as is,
    bD as as,
    p_ as cs,
    A8 as ls,
    nk as ds,
    nj as us,
    dn as fs,
    pX as Pt,
    cC as ps,
    i_ as hs,
    pY as ms,
    cb as Rt,
    A9 as gs,
    j4 as xs,
    nY as _s
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    u as bs
} from "./93027c7b-etvzqqdjohk7fflh.js";
import {
    g as vs,
    a as Ss,
    c as ws,
    w as ys,
    b as Cs,
    d as Ts
} from "./b38665c9-u4u3ze884ld5k1u4.js";
const pt = At({
    selectLabel: {
        id: "WnuENJ",
        defaultMessage: "Select product"
    },
    deselectLabel: {
        id: "VgU4sb",
        defaultMessage: "Deselect product"
    }
});

function Is({
    conversation: s,
    productId: e,
    isSelectionEnabled: t,
    onToggleSelection: n
}) {
    if (!t || !s) return;
    const r = os(s),
        l = is(s),
        u = !!e && r.has(e);
    return {
        isSelected: u,
        showCheckbox: l || u,
        onToggleSelection: n
    }
}

function Ps(s) {
    "use forget";
    const e = z.c(19),
        {
            selection: t,
            placement: n,
            className: r
        } = s,
        l = n === void 0 ? "inset" : n,
        u = vt();
    let f;
    e[0] !== u ? (f = u.formatMessage(pt.selectLabel), e[0] = u, e[1] = f) : f = e[1];
    const a = f;
    let o;
    e[2] !== u ? (o = u.formatMessage(pt.deselectLabel), e[2] = u, e[3] = o) : o = e[3];
    const p = o,
        c = t.isSelected,
        _ = t.isSelected ? p : a;
    let d;
    e[4] !== t ? (d = y => {
        y.preventDefault(), y.stopPropagation(), t.onToggleSelection()
    }, e[4] = t, e[5] = d) : d = e[5];
    const h = l === "flush" ? "end-0 top-0" : "end-2 top-2",
        b = t.showCheckbox ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100";
    let m;
    e[6] !== r || e[7] !== h || e[8] !== b ? (m = D("focus-visible:outline-token-outline-primary absolute z-10 flex size-7 items-center justify-center rounded-full focus-visible:outline-offset-[-8px]", h, b, r), e[6] = r, e[7] = h, e[8] = b, e[9] = m) : m = e[9];
    let g;
    e[10] === Symbol.for("react.memo_cache_sentinel") ? (g = i.jsx("span", {
        className: "absolute inset-1.5 rounded-full bg-black/35 blur-md"
    }), e[10] = g) : g = e[10];
    let x;
    e[11] !== t.isSelected ? (x = t.isSelected ? i.jsx("span", {
        className: "z-[11] flex size-5 items-center justify-center rounded-full bg-white dark:bg-white",
        children: i.jsx(as, {
            className: "entity-accent size-4 stroke-current stroke-[1.25]"
        })
    }) : i.jsx("span", {
        className: "z-[11] flex size-5 items-center justify-center rounded-full",
        children: i.jsx("span", {
            className: "relative size-5 rounded-full border-2 border-current text-white",
            children: i.jsx("span", {
                className: "absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm"
            })
        })
    }), e[11] = t.isSelected, e[12] = x) : x = e[12];
    let S;
    return e[13] !== t.isSelected || e[14] !== x || e[15] !== _ || e[16] !== d || e[17] !== m ? (S = i.jsxs("button", {
        type: "button",
        "aria-pressed": c,
        "aria-label": _,
        onClick: d,
        className: m,
        children: [g, x]
    }), e[13] = t.isSelected, e[14] = x, e[15] = _, e[16] = d, e[17] = m, e[18] = S) : S = e[18], S
}

function Ae(s) {
    return s != null && typeof s == "object"
}

function Rs(s) {
    return Ae(s)
}

function ht(s, e) {
    return s == null || Number.isNaN(s) ? e : Math.min(Math.max(s, 0), 1)
}

function Nt(s, e = !1) {
    return e || !s || !Ae(s.showcase_metadata) ? null : s.showcase_metadata
}

function rt(s, e, t = !1) {
    const n = Nt(s, t);
    if (!n ? .slots || !Ae(n.slots)) return null;
    const r = n.slots[e];
    return Rs(r) ? r : null
}

function jt(s, e = !1) {
    const t = Nt(s, e) ? .background;
    if (!(!t || !t.primary)) return t.type === "gradient" && t.secondary && t.secondary !== t.primary ? {
        backgroundImage: `linear-gradient(180deg, ${t.primary} 0%, ${t.secondary} 100%)`
    } : {
        backgroundColor: t.primary
    }
}

function Et(s, {
    darkModeClassName: e
} = {}) {
    if (s && s.image_blend_mode !== "normal") return e ? `mix-blend-darken ${e}` : "mix-blend-darken"
}

function Ns(s) {
    if (!s.placement || !Ae(s.placement)) return null;
    const e = s.placement.left_percent,
        t = s.placement.top_percent,
        n = s.placement.width_percent,
        r = s.placement.height_percent;
    return typeof e != "number" || typeof t != "number" || typeof n != "number" || typeof r != "number" ? null : {
        position: "absolute",
        left: `${e}%`,
        top: `${t}%`,
        width: `${n}%`,
        height: `${r}%`,
        maxWidth: "none",
        maxHeight: "none"
    }
}

function mt(s, {
    fitOverride: e,
    maxZoom: t
} = {}) {
    const n = s.position,
        r = ht(typeof n ? .x == "number" ? n.x : void 0, .5),
        l = ht(typeof n ? .y == "number" ? n.y : void 0, .5),
        u = typeof s.zoom == "number" && s.zoom > 0 ? s.zoom : 1,
        f = typeof t == "number" && t > 0 ? Math.min(u, t) : u,
        a = e ? ? (s.fit === "cover" ? "cover" : "contain"),
        o = `${r*100}% ${l*100}%`;
    return {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: a,
        objectPosition: o,
        transform: f === 1 ? void 0 : `scale(${f})`,
        transformOrigin: o
    }
}

function Dt(s) {
    "use forget";
    const e = z.c(32);
    let t, n, r, l, u, f, a, o, p, c;
    e[0] !== s ? ({
        product: a,
        slotKey: o,
        alt: t,
        className: n,
        renderMode: p,
        imageUrl: l,
        ignoreShowcaseMetadata: c,
        fitOverride: r,
        maxZoom: f,
        ...u
    } = s, e[0] = s, e[1] = t, e[2] = n, e[3] = r, e[4] = l, e[5] = u, e[6] = f, e[7] = a, e[8] = o, e[9] = p, e[10] = c) : (t = e[1], n = e[2], r = e[3], l = e[4], u = e[5], f = e[6], a = e[7], o = e[8], p = e[9], c = e[10]);
    const _ = p === void 0 ? "placement" : p,
        d = c === void 0 ? !1 : c;
    let h, b, m;
    if (e[11] !== r || e[12] !== d || e[13] !== l || e[14] !== f || e[15] !== a || e[16] !== _ || e[17] !== o) {
        m = Symbol.for("react.early_return_sentinel");
        e: {
            const I = rt(a, o, d);
            if (h = l ? ? a ? .image_urls ? .[0], !I || !h) {
                m = null;
                break e
            }
            b = _ === "placement" ? Ns(I) ? ? mt(I, {
                fitOverride: r,
                maxZoom: f
            }) : mt(I, {
                fitOverride: r,
                maxZoom: f
            })
        }
        e[11] = r, e[12] = d, e[13] = l, e[14] = f, e[15] = a, e[16] = _, e[17] = o, e[18] = h, e[19] = b, e[20] = m
    } else h = e[18], b = e[19], m = e[20];
    if (m !== Symbol.for("react.early_return_sentinel")) return m;
    const g = b;
    let x;
    e[21] !== n ? (x = D("m-0 block select-none", n), e[21] = n, e[22] = x) : x = e[22];
    let S;
    e[23] !== u.style || e[24] !== g ? (S = { ...g,
        ...u.style
    }, e[23] = u.style, e[24] = g, e[25] = S) : S = e[25];
    let y;
    return e[26] !== t || e[27] !== u || e[28] !== h || e[29] !== x || e[30] !== S ? (y = i.jsx("img", { ...u,
        src: h,
        alt: t,
        className: x,
        style: S
    }), e[26] = t, e[27] = u, e[28] = h, e[29] = x, e[30] = S, e[31] = y) : y = e[31], y
}
const js = Bt(Ht.ShoppingHidePostProcessedImages, () => !1, {
    coerceStoredValue: s => s === !0
});

function kt() {
    "use forget";
    return st(Es)
}

function Es() {
    return js()
}

function Ds(s) {
    "use forget";
    const e = z.c(13),
        {
            onShown: t,
            resetKey: n,
            threshold: r
        } = s,
        l = r === void 0 ? 0 : r,
        [u, f] = T.useState(null),
        a = T.useRef(!1),
        o = T.useRef(t);
    let p, c;
    e[0] !== t ? (p = () => {
        o.current = t
    }, c = [t], e[0] = t, e[1] = p, e[2] = c) : (p = e[1], c = e[2]), T.useEffect(p, c);
    let _;
    e[3] === Symbol.for("react.memo_cache_sentinel") ? (_ = () => {
        a.current = !1
    }, e[3] = _) : _ = e[3];
    let d;
    e[4] !== n ? (d = [n], e[4] = n, e[5] = d) : d = e[5], T.useEffect(_, d);
    let h;
    e[6] !== u || e[7] !== l ? (h = () => {
        if (!(!u || a.current)) {
            if (typeof IntersectionObserver > "u") {
                a.current = !0, o.current();
                return
            }
            return wt({
                target: u,
                options: {
                    threshold: l
                },
                onChange: m => {
                    !m || a.current || (a.current = !0, o.current())
                }
            })
        }
    }, e[6] = u, e[7] = l, e[8] = h) : h = e[8];
    let b;
    return e[9] !== n || e[10] !== u || e[11] !== l ? (b = [n, u, l], e[9] = n, e[10] = u, e[11] = l, e[12] = b) : b = e[12], T.useEffect(h, b), f
}
const ks = Kt(() => new Map),
    Le = Ut((s, e) => Os(ks(s), e, () => Wt(!1))),
    Ms = () => {};

function Mt(s) {
    "use forget";
    const e = z.c(22),
        {
            clientThreadId: t,
            messageId: n,
            contentReferenceStartIndex: r,
            shellProduct: l
        } = s,
        u = qt();
    let f;
    e[0] !== t || e[1] !== u ? (f = u ? ? (t ? yt(t) : void 0), e[0] = t, e[1] = u, e[2] = f) : f = e[2];
    const a = f,
        o = T.useRef(null),
        c = Ms() ? .persist_conversation_to_user === !0;
    let _;
    e[3] === Symbol.for("react.memo_cache_sentinel") ? (_ = vs({
        disableExposureLog: !0
    }), e[3] = _) : _ = e[3];
    const d = _;
    let h;
    e[4] === Symbol.for("react.memo_cache_sentinel") ? (h = Ss({
        disableExposureLog: !0
    }), e[4] = h) : h = e[4];
    const b = h;
    let m;
    e[5] !== r || e[6] !== n || e[7] !== l ? (m = Ls({
        messageId: n,
        contentReferenceStartIndex: r,
        shellProduct: l
    }), e[5] = r, e[6] = n, e[7] = l, e[8] = m) : m = e[8];
    const g = m;
    let x;
    e[9] === Symbol.for("react.memo_cache_sentinel") ? (x = P => {
        o.current = P
    }, e[9] = x) : x = e[9];
    const S = x;
    let y, I;
    e[10] !== a || e[11] !== g ? (y = () => ft(() => {
        if (!(!a || !d && !b) && !Le(a, g)) {
            if (typeof IntersectionObserver > "u") {
                Le.set(a, g, !0);
                return
            }
            return wt({
                target: o.current,
                options: {
                    threshold: 0,
                    rootMargin: "0px 0px 300px 0px"
                },
                onChange: P => {
                    P && Le.set(a, g, !0)
                }
            })
        }
    }), I = [g, a, b, d], e[10] = a, e[11] = g, e[12] = y, e[13] = I) : (y = e[12], I = e[13]), T.useEffect(y, I);
    let C, w;
    return e[14] !== t || e[15] !== a || e[16] !== n || e[17] !== c || e[18] !== g || e[19] !== l ? (C = () => ft(() => {
        if (!a || !d && !b || !Le(a, g)) return;
        const P = (t ? Ct(t) : void 0) ? ? a.serverId$() ? ? a.id;
        let E = !1;
        return requestAnimationFrame(() => {
            E || (b && ys({
                conversation: a,
                shellProduct: l,
                conversationId: P,
                messageId: n
            }), d && Cs({
                conversation: a,
                shellProduct: l,
                conversationId: P,
                messageId: n,
                persistConversationToUser: c
            }))
        }), () => {
            E = !0
        }
    }), w = [t, a, g, d, b, l, n, c], e[14] = t, e[15] = a, e[16] = n, e[17] = c, e[18] = g, e[19] = l, e[20] = C, e[21] = w) : (C = e[20], w = e[21]), T.useEffect(C, w), S
}

function Ls({
    messageId: s,
    contentReferenceStartIndex: e,
    shellProduct: t
}) {
    return `${s}:${e}:${ws(t)}`
}

function Os(s, e, t) {
    let n = s.get(e);
    return n === void 0 && (n = t(), s.set(e, n)), n
}
const se = {
        TTFP: "products.ttfp",
        TTLT: "products.ttlt",
        TTF_VISIBLE_CONTENT_TOKEN: "products.ttf_visible_content_token"
    },
    ot = {
        [se.TTFP]: new Set,
        [se.TTLT]: new Set,
        [se.TTF_VISIBLE_CONTENT_TOKEN]: new Set
    };

function Qe({
    profiler: s,
    messageId: e,
    metric: t,
    overrideDurationMs: n
}) {
    ot[t].add(e);
    const r = ds();
    s.logTimingOnce(t, {
        context: {
            eval_preset: r.eval_preset
        },
        overrideDurationMs: n
    })
}

function Ze({
    messageId: s,
    metric: e
}) {
    return ot[e].has(s)
}

function $s(s) {
    "use forget";
    const e = z.c(25),
        {
            conversation: t,
            messageId: n,
            products: r
        } = s;
    let l;
    e[0] !== n ? (l = S => [tt.getRequestId(S), tt.isMessageTurnEnded(S, n)], e[0] = n, e[1] = l) : l = e[1];
    const [u, f] = Tt(t ? .id, l);
    let a;
    e[2] !== t ? (a = {
        namespace: cs.ProductsCompletionRequest,
        conversation: t
    }, e[2] = t, e[3] = a) : a = e[3];
    const {
        profiler: o,
        isRequestActive: p
    } = ls(a), c = p && !f, _ = bs(c);
    let d, h;
    e[4] !== c || e[5] !== n || e[6] !== r.length || e[7] !== o ? (d = () => {
        Ze({
            messageId: n,
            metric: se.TTFP
        }) || o && c && r.length > 0 && Qe({
            profiler: o,
            messageId: n,
            metric: se.TTFP
        })
    }, h = [c, n, r.length, o], e[4] = c, e[5] = n, e[6] = r.length, e[7] = o, e[8] = d, e[9] = h) : (d = e[8], h = e[9]), T.useEffect(d, h);
    let b, m;
    e[10] !== c || e[11] !== n || e[12] !== _ || e[13] !== o ? (b = () => {
        Ze({
            messageId: n,
            metric: se.TTLT
        }) || o && _.current && !c && Qe({
            profiler: o,
            messageId: n,
            metric: se.TTLT
        })
    }, m = [n, _, c, o], e[10] = c, e[11] = n, e[12] = _, e[13] = o, e[14] = b, e[15] = m) : (b = e[14], m = e[15]), T.useEffect(b, m);
    let g;
    e[16] !== n || e[17] !== o || e[18] !== u ? (g = () => {
        if (Ze({
                messageId: n,
                metric: se.TTF_VISIBLE_CONTENT_TOKEN
            })) return;
        const S = u ? zt(u) : null;
        if (o && S) {
            const y = se.TTF_VISIBLE_CONTENT_TOKEN;
            ot[y].add(n), Qe({
                profiler: o,
                messageId: n,
                metric: y,
                overrideDurationMs: S.completionRequest.turnTracker.first_visible_content_token_lat
            })
        }
    }, e[16] = n, e[17] = o, e[18] = u, e[19] = g) : g = e[19];
    let x;
    e[20] !== n || e[21] !== r.length || e[22] !== o || e[23] !== u ? (x = [n, o, u, r.length], e[20] = n, e[21] = r.length, e[22] = o, e[23] = u, e[24] = x) : x = e[24], T.useEffect(g, x)
}

function As({
    items: s,
    targetItemCount: e,
    onCardRender: t,
    onCardShown: n,
    onCardClicked: r,
    onReplyClicked: l,
    allowFullWidth: u = !1,
    cardClassName: f,
    showGradient: a = !0,
    arrowClassName: o
}) {
    const p = T.useRef(null),
        c = st(() => Gt()),
        d = nt("2128165686").get("product_carousel_cards_per_view", 3),
        [h, b] = T.useState(null),
        m = T.useRef(null),
        g = () => {
            m.current = setTimeout(() => {
                b(null), m.current = null
            }, 200)
        },
        x = () => {
            m.current && (clearTimeout(m.current), m.current = null)
        },
        S = T.useRef(null),
        [y, I] = T.useState({
            left: 0,
            top: 0
        }),
        C = 8;
    T.useEffect(() => {
        const R = p.current,
            j = S.current;
        if (!l || !h || !R || !j) return;
        const k = () => {
            const B = h.card.getBoundingClientRect(),
                F = R.getBoundingClientRect(),
                M = j.getBoundingClientRect(),
                A = B.bottom - F.top + C;
            var L = B.left - F.left;
            L = Math.max(0, L), L = Math.min(L, F.width - M.width), I({
                left: L,
                top: A
            })
        };
        return k(), R.addEventListener("scroll", k), () => R.removeEventListener("scroll", k)
    }, [h, s, l]);
    const w = It(),
        P = w ? 2 : Math.floor(d) + 1;
    if (e === void 0) e = s.length;
    else if (!e && s.length < P) return null;
    const E = (e ? ? s.length) >= P,
        H = E && w,
        $ = c || w ? "xs:basis-[calc((100%-2rem)/3)] shrink-0 basis-[calc((100%-2rem)/2)]" : Fs(d),
        Y = !w && d === 3.5 ? "w-28 bg-linear-to-l from-(--bg-primary) to-transparent" : !w && d === 4.5 ? "w-24 bg-linear-to-l from-(--bg-primary) to-transparent" : void 0;
    return i.jsxs("div", {
        className: "relative",
        children: [i.jsx("div", {
            ref: p,
            className: D("flex flex-row gap-4 py-2", H && "mx-[-1rem] px-[1rem]", E && "no-scrollbar snap-x snap-mandatory overflow-x-scroll scroll-smooth"),
            children: s.map((R, j) => i.jsx("div", {
                className: D(E || !u ? $ : "min-w-0 flex-1"),
                children: i.jsx(it, {
                    cardClassName: D(f, c && "bg-transparent"),
                    onShown: () => n(R, j),
                    onClick: () => r(R, j),
                    onHover: k => {
                        x(), k ? b({
                            card: k,
                            item: R,
                            index: j
                        }) : g()
                    },
                    children: t(R, !w && e === 1 && u)
                })
            }, j))
        }), E && !H && i.jsx(Vs, {
            scrollableRef: p,
            units: s.length,
            showGradient: a,
            arrowClassName: o,
            rightOverlayClassName: Y
        }), l && i.jsx("div", {
            ref: S,
            className: D("absolute z-10", h ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0", "transition-[transform,opacity] duration-200"),
            style: {
                willChange: "opacity, transform",
                left: y.left,
                top: y.top,
                transform: h ? "translateY(0)" : `translateY(${-C}px)`
            },
            onMouseEnter: x,
            onMouseLeave: g,
            children: i.jsx(Ce, {
                className: D(h ? "pointer-events-auto" : "pointer-events-none", "border-light bg-clip-padding px-4 py-2 shadow-md"),
                size: "small",
                color: "secondary",
                onClick: () => h && l(h.item, h.index),
                children: i.jsxs("div", {
                    className: "flex flex-row items-center gap-1",
                    children: [i.jsx(us, {
                        className: "icon-sm text-token-text-secondary"
                    }), i.jsx(St, {
                        id: "9TG7OR",
                        defaultMessage: "Ask about this"
                    })]
                })
            })
        })]
    })
}

function it({
    onShown: s,
    onClick: e,
    onHover: t,
    children: n,
    cardClassName: r
}) {
    const l = T.useRef(null),
        u = T.useRef(s);
    return T.useEffect(() => {
        u.current = s
    }, [s]), T.useEffect(() => {
        if (!l.current) return;
        const f = new IntersectionObserver(([a]) => a.isIntersecting && u.current(), {
            threshold: .5
        });
        return f.observe(l.current), () => f.disconnect()
    }, []), i.jsx("div", {
        ref: l,
        className: D("h-full w-full", "bg-token-bg-primary cursor-pointer", r),
        onClick: e,
        onMouseEnter: () => l.current && t(l.current),
        onMouseLeave: () => t(null),
        children: n
    })
}

function Vs({
    scrollableRef: s,
    units: e,
    showGradient: t,
    arrowClassName: n,
    rightOverlayClassName: r
}) {
    const [l, u] = T.useState({
        left: !1,
        right: !1
    }), [f, a] = T.useState(!1);
    T.useEffect(() => {
        const p = s.current;
        if (!p) return;
        const c = () => {
            const {
                scrollLeft: _,
                scrollWidth: d,
                clientWidth: h
            } = p, b = _ / (d - h);
            u({
                left: b > 0,
                right: b < .99
            }), !f && _ > 0 && a(!0)
        };
        return c(), p.addEventListener("scroll", c), () => p.removeEventListener("scroll", c)
    }, [s, e, f]);
    const o = p => {
        const c = s.current;
        if (!c) return;
        a(!0);
        const {
            clientWidth: _,
            scrollWidth: d,
            scrollLeft: h
        } = c, b = Math.max(0, d - _), m = Math.max(0, Math.min(b, h + p * _));
        c.scrollTo({
            left: m,
            behavior: "smooth"
        })
    };
    return i.jsxs("div", {
        className: "pointer-events-none absolute start-0 top-0 flex h-full w-full flex-row",
        children: [r && l.right && i.jsx("div", {
            className: D("absolute end-0 top-0 h-full", r)
        }), i.jsx("div", {
            className: D("flex h-full w-9 items-center justify-start", f && t && "bg-linear-to-r from-(--bg-primary) to-transparent", l.left ? "opacity-100" : "opacity-0", "transition-opacity duration-100"),
            children: i.jsx(Ce, {
                color: "secondary",
                size: "small",
                className: D("border-token-border-default active:bg-token-bg-tertiary hover:bg-token-bg-primary h-8 w-8 translate-x-[-50%] rounded-full bg-clip-padding hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.05)] active:opacity-100!", n),
                onClick: () => o(-1),
                children: i.jsx(Yt, {
                    className: "icon"
                })
            })
        }), i.jsx("div", {
            className: D("ms-auto flex h-full w-9 items-center justify-end", f && t && "bg-linear-to-l from-(--bg-primary) to-transparent", l.right ? "opacity-100" : "opacity-0", "transition-opacity duration-200"),
            children: i.jsx(Ce, {
                color: "secondary",
                size: "small",
                className: D("border-token-border-default active:bg-token-bg-tertiary hover:bg-token-bg-primary h-8 w-8 translate-x-[50%] rounded-full bg-clip-padding hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.05)] active:opacity-100!", n),
                onClick: () => o(1),
                children: i.jsx(fs, {
                    className: "icon"
                })
            })
        })]
    })
}

function Fs(s) {
    switch (s) {
        case 3:
            return "shrink-0 snap-start basis-[calc((100%-2rem)/3)]";
        case 3.5:
            return "shrink-0 snap-start basis-[calc((100%-3rem)/3.5)]";
        case 4:
            return "shrink-0 snap-start basis-[calc((100%-3rem)/4)]";
        case 4.5:
            return "shrink-0 snap-start basis-[calc((100%-4rem)/4.5)]";
        case 5:
            return "shrink-0 snap-start basis-[calc((100%-4rem)/5)]";
        default:
            return "shrink-0 snap-start basis-[calc((100%-2rem)/3)]"
    }
}

function Bs({
    items: s,
    targetItemCount: e,
    onCardRender: t,
    onCardShown: n,
    onCardClicked: r,
    onReplyClicked: l,
    allowFullWidth: u = !1,
    cardClassName: f,
    showGradient: a = !0,
    arrowClassName: o
}) {
    const c = !It() && e === 1;
    return i.jsx("div", {
        className: "grid grid-cols-3 gap-3",
        children: s.map((_, d) => i.jsx(it, {
            cardClassName: f,
            onShown: () => n(_, d),
            onClick: () => r(_, d),
            onHover: () => {},
            children: t(_, c)
        }, d))
    })
}
const Hs = 5,
    qs = 6,
    gt = 1,
    $e = 3;

function Us(s) {
    "use forget";
    const e = z.c(43),
        {
            products: t,
            targetProductCount: n,
            analyticsMetadata: r,
            contentReferenceStartIndex: l,
            contentReferenceEndIndex: u,
            onCardRender: f,
            onCardShown: a,
            onCardClicked: o
        } = s;
    let p, c;
    if (e[0] === Symbol.for("react.memo_cache_sentinel")) {
        const G = nt("2128165686");
        p = G.get("variable_image_height_enabled", !1), c = G.get("inline_grid_preview_row_count", gt), e[0] = p, e[1] = c
    } else p = e[0], c = e[1];
    const _ = c,
        d = t.length === qs ? Math.min(_, gt) : _,
        h = vt(),
        b = d <= 0,
        [m, g] = T.useState(b),
        x = Pt(r),
        S = b ? t.length : $e * (d + 1);
    let y;
    e[2] !== S || e[3] !== t || e[4] !== m ? (y = m ? t : t.slice(0, S), e[2] = S, e[3] = t, e[4] = m, e[5] = y) : y = e[5];
    const I = y,
        C = !m && d > 0 && t.length > $e * d,
        w = n === 1,
        P = d > 1 ? "max-h-[572px] overflow-hidden xs:max-h-[708px] sm:max-h-[758px] md:max-h-[748px] lg:max-h-[848px]" : "max-h-[295px] overflow-hidden xs:max-h-[358px] sm:max-h-[408px] md:max-h-[398px] lg:max-h-[458px]";
    let E;
    e[6] !== n ? (E = n != null ? {
        target_product_count: n
    } : {}, e[6] = n, e[7] = E) : E = e[7];
    let H;
    e[8] !== u || e[9] !== l || e[10] !== t.length || e[11] !== E ? (H = {
        content_reference_start_index: l,
        content_reference_end_index: u,
        product_count: t.length,
        ...E
    }, e[8] = u, e[9] = l, e[10] = t.length, e[11] = E, e[12] = H) : H = e[12];
    const $ = H;
    let Y, R;
    e[13] !== $ || e[14] !== C || e[15] !== x ? (Y = () => {
        C && x("Search Content Reference Show More Shown", null, "products", $)
    }, R = [$, C, x], e[13] = $, e[14] = C, e[15] = x, e[16] = Y, e[17] = R) : (Y = e[16], R = e[17]), T.useEffect(Y, R);
    const j = C && P;
    let k;
    e[18] !== j ? (k = D("relative", j), e[18] = j, e[19] = k) : k = e[19];
    let B;
    e[20] !== o || e[21] !== f || e[22] !== a || e[23] !== n || e[24] !== I || e[25] !== w ? (B = p ? i.jsx(zs, {
        items: I,
        getKey: Ws,
        renderItem: (G, X) => i.jsx(it, {
            cardClassName: "h-auto",
            onShown: () => a(G, X),
            onClick: () => o(G, X),
            onHover: Ks,
            children: f(G, w, {
                useVariableImageHeight: p && X >= $e
            })
        })
    }) : i.jsx(Bs, {
        items: I,
        targetItemCount: n,
        onCardRender: f,
        onCardShown: a,
        onCardClicked: o
    }), e[20] = o, e[21] = f, e[22] = a, e[23] = n, e[24] = I, e[25] = w, e[26] = B) : B = e[26];
    let F;
    e[27] !== $ || e[28] !== C || e[29] !== x ? (F = C && i.jsxs(i.Fragment, {
        children: [i.jsx("div", {
            className: "to-token-bg-primary pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[68px] bg-gradient-to-b from-transparent"
        }), i.jsx("div", {
            className: "absolute inset-x-0 bottom-2 z-10 flex justify-center",
            children: i.jsx(Ce, {
                as: "button",
                type: "button",
                color: "secondary",
                className: "h-[36px] w-full sm:w-[106px]",
                onClick: () => {
                    x("Search Content Reference Show More Clicked", "search_content_reference_show_more_clicked", "products", $), g(!0)
                },
                children: i.jsx(St, {
                    id: "SeIeu5",
                    defaultMessage: "Show more"
                })
            })
        })]
    }), e[27] = $, e[28] = C, e[29] = x, e[30] = F) : F = e[30];
    let M;
    e[31] !== F || e[32] !== k || e[33] !== B ? (M = i.jsxs("div", {
        className: k,
        children: [B, F]
    }), e[31] = F, e[32] = k, e[33] = B, e[34] = M) : M = e[34];
    let A;
    e[35] !== $ || e[36] !== h || e[37] !== m || e[38] !== x ? (A = m && i.jsx("div", {
        className: "mt-2 flex justify-center",
        children: i.jsx(Ce, {
            as: "button",
            type: "button",
            size: "small",
            color: "secondary",
            icon: ps,
            iconClassName: "h-5 w-5",
            className: "border-token-border-light h-9 w-9 p-2",
            label: h.formatMessage({
                id: "VTbAA5",
                defaultMessage: "Show less"
            }),
            onClick: () => {
                x("Search Content Reference Show Less Clicked", "search_content_reference_show_less_clicked", "products", $), g(!1)
            }
        })
    }), e[35] = $, e[36] = h, e[37] = m, e[38] = x, e[39] = A) : A = e[39];
    let L;
    return e[40] !== M || e[41] !== A ? (L = i.jsxs("div", {
        className: "py-2",
        role: "list",
        children: [M, A]
    }), e[40] = M, e[41] = A, e[42] = L) : L = e[42], L
}

function Ks() {}

function Ws(s, e) {
    return s.id ? ? e
}

function zs(s) {
    "use forget";
    const e = z.c(7),
        {
            items: t,
            renderItem: n,
            getKey: r,
            columnCount: l
        } = s,
        u = l === void 0 ? $e : l;
    let f;
    e[0] !== u || e[1] !== t ? (f = Array.from({
        length: u
    }, Gs), t.forEach((p, c) => {
        f[c % u].push({
            item: p,
            index: c
        })
    }), e[0] = u, e[1] = t, e[2] = f) : f = e[2];
    const a = f;
    let o;
    return e[3] !== a || e[4] !== r || e[5] !== n ? (o = i.jsx("div", {
        className: "flex gap-3",
        children: a.map((p, c) => i.jsx("div", {
            className: "flex min-w-0 flex-1 flex-col gap-3",
            children: p.map(_ => {
                const {
                    item: d,
                    index: h
                } = _;
                return i.jsx("div", {
                    children: n(d, h)
                }, r(d, h))
            })
        }, c))
    }), e[3] = a, e[4] = r, e[5] = n, e[6] = o) : o = e[6], o
}

function Gs() {
    return []
}

function Lt(s) {
    const e = s.trim();
    return e.length > 0 ? e : null
}

function Ys(s) {
    const e = s.title.trim();
    return e.length > 0 ? e : null
}

function Xs(s) {
    const e = {};
    s.rating != null && (e.rating = s.rating), s.num_reviews != null && (e.num_reviews = s.num_reviews);
    const t = (s.featured_tag ? ? "").trim();
    return t && (e.featured_tag = t), Object.keys(e).length > 0 ? e : null
}

function Js(s) {
    const e = Lt(s.id);
    if (!e) return null;
    const t = Ys(s);
    return t ? {
        id: e,
        title: t,
        merchants: s.merchants,
        price: s.price,
        url: s.url,
        description: s.description,
        specs: Xs(s)
    } : null
}

function Qs(s) {
    "use forget";
    const e = z.c(7),
        {
            description: t,
            isLoading: n,
            reserveSpace: r
        } = s,
        l = r === void 0 ? !1 : r,
        u = !!t ? .trim();
    if (!l && !n && !u) return null;
    let f = null;
    if (u) {
        let o;
        e[0] !== t ? (o = t ? .trim(), e[0] = t, e[1] = o) : o = e[1];
        let p;
        e[2] !== o ? (p = i.jsx("div", {
            className: "text-token-text-secondary line-clamp-2 text-sm leading-5",
            children: o
        }), e[2] = o, e[3] = p) : p = e[3], f = p
    } else if (n) {
        let o;
        e[4] === Symbol.for("react.memo_cache_sentinel") ? (o = i.jsxs("div", {
            className: "mt-0.5 flex flex-col gap-1",
            "data-testid": "shopping-product-description-skeleton",
            "aria-hidden": !0,
            children: [i.jsx("div", {
                className: "loading-results-shimmer bg-token-bg-secondary h-3 w-[88%] rounded-md"
            }), i.jsx("div", {
                className: "loading-results-shimmer bg-token-bg-secondary h-3 w-[62%] rounded-md"
            })]
        }), e[4] = o) : o = e[4], f = o
    }
    if (!l) return f;
    let a;
    return e[5] !== f ? (a = i.jsx("div", {
        className: "mt-0.5 h-10",
        "data-testid": "shopping-product-description-slot",
        children: f
    }), e[5] = f, e[6] = a) : a = e[6], a
}
const ye = {},
    Zs = {
        hasStoredDescriptionsOnMessageMetadata: !1,
        storedDescriptions: ye
    },
    Oe = new Map,
    xt = new Map;

function en(s) {
    return `${s.start_idx}:${s.end_idx}`
}

function Ot(s, e) {
    return s ? .shopping ? .product_carousel_descriptions ? .[e] ? ? ye
}

function tn(s, e) {
    return s ? .shopping ? .product_carousel_descriptions ? .[e] != null
}

function sn(s, e, t, n) {
    Object.keys(n).length !== 0 && Qt(s.id, r => {
        Zt.updateTree(r, l => {
            const u = l.getNodeIfExists(e) ? .message.metadata,
                f = u ? .shopping ? ? {},
                a = f.product_carousel_descriptions ? ? {},
                o = Ot(u, t);
            l.updateNodeMessageMetadata(e, {
                shopping: { ...f,
                    product_carousel_descriptions: { ...a,
                        [t]: { ...o,
                            ...n
                        }
                    }
                }
            })
        })
    })
}

function nn(s) {
    return [s.serverThreadId, s.messageId, s.carouselKey, s.productIds.join(",")].join(":")
}

function rn(s) {
    const e = en(s.contentReference),
        t = s.contentReference.products.map(Js).filter(r => r != null),
        n = t.map(r => r.id);
    return {
        carouselKey: e,
        productIds: n,
        productsToRequest: t,
        requestKey: s.serverThreadId && n.length > 0 ? nn({
            serverThreadId: s.serverThreadId,
            messageId: s.messageId,
            carouselKey: e,
            productIds: n
        }) : null
    }
}

function on(s, e) {
    return s.every(t => e[t])
}

function an({
    conversation: s,
    messageId: e,
    contentReference: t,
    enabled: n = !0
}) {
    "use no forget";
    const [r, l] = T.useState({
        requestKey: null,
        descriptions: ye
    }), [u, f] = T.useState(null), a = hs(), o = s ? Ct(s.id) ? ? s.id : void 0, {
        carouselKey: p,
        productIds: c,
        productsToRequest: _,
        requestKey: d
    } = rn({
        contentReference: t,
        serverThreadId: o,
        messageId: e
    }), {
        storedDescriptions: h,
        hasStoredDescriptionsOnMessageMetadata: b
    } = Tt(s ? .id, I => {
        if (!n || !I || !e) return Zs;
        const w = tt.getTree(I).getNodeIfExists(e) ? .message.metadata;
        return {
            hasStoredDescriptionsOnMessageMetadata: tn(w, p),
            storedDescriptions: Ot(w, p)
        }
    }, {
        disablePerfDetector: !0
    }), m = r.requestKey === d ? r.descriptions : d ? xt.get(d) ? ? ye : ye, g = Object.keys(h).length > 0 ? h : m, x = on(c, g), S = u === d, y = n && !a && !b;
    return T.useEffect(() => {
        if (!y || !s || !o || !e || c.length === 0 || !d || x || S) return;
        let I = !1;
        const C = Oe.get(d) ? ? Xt.safePost("/search/product_carousel_descriptions", {
            requestBody: {
                conversation_id: o,
                message_id: e,
                carousel_key: p,
                products: _
            },
            authOption: Jt.SendIfAvailable
        }).then(w => (xt.set(d, w.descriptions), Oe.delete(d), w.descriptions));
        return Oe.set(d, C), C.then(w => {
            l({
                requestKey: d,
                descriptions: w
            }), f(P => P === d ? null : P), sn(s, e, p, w)
        }).catch(() => {
            Oe.delete(d), !I && f(d)
        }), () => {
            I = !0
        }
    }, [p, s, x, S, b, a, e, _, c, g, d, o, y]), {
        productDescriptions: g,
        isLoading: y && !x && !S
    }
}
ss(() => Vt(() =>
    import ("./aa5ac567-b4lngd7i53f25hoi.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5])).then(s => s.BrowseProductsModal));
const _t = 13 / 16,
    cn = 3 / 4,
    ln = 4 / 3,
    dn = 8e3;

function et(s, e) {
    return { ...s.analytics_meta ? ? {},
        product_index : e,
        product_id : s.id,
        product_event_uuid: s.product_event_uuid,
        product_title: s.title,
        product_url: s.url
    }
}

function wn(s) {
    "use forget";
    const e = z.c(101),
        {
            contentReference: t,
            clientThreadId: n,
            messageId: r,
            turnIndex: l,
            isStreaming: u,
            analyticsMetadata: f
        } = s,
        a = t.products,
        o = t.target_product_count;
    let p;
    e[0] !== n ? (p = n && yt(n), e[0] = n, e[1] = p) : p = e[1];
    const c = p;
    let _;
    e[2] !== c || e[3] !== r || e[4] !== a ? (_ = {
        conversation: c,
        messageId: r,
        products: a
    }, e[2] = c, e[3] = r, e[4] = a, e[5] = _) : _ = e[5], $s(_);
    const {
        showDebugConversationTurns: d
    } = es();
    let h;
    e[6] === Symbol.for("react.memo_cache_sentinel") ? (h = ms(), e[6] = h) : h = e[6];
    const m = h && !!c,
        g = Pt(f);
    let x;
    e[7] === Symbol.for("react.memo_cache_sentinel") ? (x = new Set, e[7] = x) : x = e[7];
    const S = T.useRef(x);
    let y;
    e[8] === Symbol.for("react.memo_cache_sentinel") ? (y = Ts(), e[8] = y) : y = e[8];
    const I = y;
    let C, w, P;
    if (e[9] !== a || e[10] !== o) {
        const v = nt("2128165686");
        C = !I && a.length > Hs && v.get("inline_grid_view_enabled", !1), w = o ? ? a.length, P = v.get("carousel_descriptions_enabled", !1), e[9] = a, e[10] = o, e[11] = C, e[12] = w, e[13] = P
    } else C = e[11], w = e[12], P = e[13];
    const H = P && !C && !(t.inline_carousel && a.length === 1),
        $ = o != null && a.length >= o,
        Y = H && ($ || !u),
        R = H ? "translate-y-[-135%]" : "translate-y-[-85%]";
    let j;
    e[14] !== t || e[15] !== c || e[16] !== r || e[17] !== Y ? (j = {
        conversation: c,
        messageId: r,
        contentReference: t,
        enabled: Y
    }, e[14] = t, e[15] = c, e[16] = r, e[17] = Y, e[18] = j) : j = e[18];
    const {
        productDescriptions: k,
        isLoading: B
    } = an(j), F = ut.Products;
    let M;
    e[19] !== t.start_idx || e[20] !== c || e[21] !== r || e[22] !== a || e[23] !== l ? (M = v => {
        if (!c) return;
        const N = a.indexOf(v);
        N < 0 || gs(c, v, {
            messageId: r,
            turnIndex: l,
            contentReferenceStartIndex: t.start_idx,
            productIndex: N,
            contentReferenceType: ut.Products
        }, ns.CHATGPT_PRODUCT_FOLLOW_UP_INTERACTION_SURFACE_CHECKBOX)
    }, e[19] = t.start_idx, e[20] = c, e[21] = r, e[22] = a, e[23] = l, e[24] = M) : M = e[24];
    const A = M;
    let L;
    e[25] !== n || e[26] !== t.start_idx || e[27] !== r || e[28] !== g ? (L = (v, N) => {
        g("Search Content Reference Shown", "search_content_reference_shown", "products", {
            content_reference_start_index: t.start_idx,
            ...et(v, N)
        }), Xe({
            productInteractionEventType: Je.CHATGPT_PRODUCT_INTERACTION_EVENT_TYPE_SHOWN,
            clientThreadId: n,
            product: v,
            productIndex: N,
            contentReferenceType: F,
            messageId: r,
            contentReferenceStartIndex: t.start_idx
        })
    }, e[25] = n, e[26] = t.start_idx, e[27] = r, e[28] = g, e[29] = L) : L = e[29];
    const G = L;
    let X;
    e[30] !== t.start_idx || e[31] !== g ? (X = (v, N) => {
        g("Search Content Reference Shown", "search_content_reference_shown", "products", {
            content_reference_start_index: t.start_idx,
            ...et(v, N)
        })
    }, e[30] = t.start_idx, e[31] = g, e[32] = X) : X = e[32];
    const Se = X;
    let re;
    e[33] !== n || e[34] !== t.start_idx || e[35] !== r ? (re = (v, N) => {
        Xe({
            productInteractionEventType: Je.CHATGPT_PRODUCT_INTERACTION_EVENT_TYPE_SHOWN,
            clientThreadId: n,
            product: v,
            productIndex: N,
            contentReferenceType: F,
            messageId: r,
            contentReferenceStartIndex: t.start_idx
        })
    }, e[33] = n, e[34] = t.start_idx, e[35] = r, e[36] = re) : re = e[36];
    const we = re;
    let oe;
    e[37] !== n || e[38] !== t.start_idx || e[39] !== r || e[40] !== g ? (oe = (v, N) => {
        g("Search Content Reference Clicked", "search_content_reference_clicked", "products", {
            content_reference_start_index: t.start_idx,
            ...et(v, N)
        }), Xe({
            productInteractionEventType: Je.CHATGPT_PRODUCT_INTERACTION_EVENT_TYPE_CLICKED,
            clientThreadId: n,
            product: v,
            productIndex: N,
            contentReferenceType: F,
            messageId: r,
            contentReferenceStartIndex: t.start_idx
        })
    }, e[37] = n, e[38] = t.start_idx, e[39] = r, e[40] = g, e[41] = oe) : oe = e[41];
    const U = oe;
    let ee;
    e[42] !== t.start_idx || e[43] !== a || e[44] !== g ? (ee = (v, N) => {
        const O = `${v.id}:${N}`;
        if (S.current.has(O)) return;
        S.current.add(O);
        const V = a.indexOf(v);
        g("Shopping Content Reference Shown", "chatgpt_shopping_content_reference_shown", "product_carousel_description", {
            content_reference_start_index: t.start_idx,
            ...v.analytics_meta ? ? {},
            ...V >= 0 ? {
                product_index: V
            } : {},
            product_id : v.id,
            product_event_uuid : v.product_event_uuid,
            product_url: v.url,
            render_as: "carousel",
            price: v.price,
            product_name: v.title,
            merchant_name: v.merchants,
            description_surface: "product_card",
            description_length: N.length
        })
    }, e[42] = t.start_idx, e[43] = a, e[44] = g, e[45] = ee) : ee = e[45];
    const te = ee;
    let ie;
    e[46] === Symbol.for("react.memo_cache_sentinel") ? (ie = ts(), e[46] = ie) : ie = e[46];
    const K = ie;
    let q;
    e[47] !== n || e[48] !== t.start_idx || e[49] !== c || e[50] !== r || e[51] !== U || e[52] !== l ? (q = (v, N) => {
        if (n)
            if (U(v, N), v.offers) {
                const O = rs(),
                    V = O ? K.rooms$().get(O) : null,
                    W = {
                        type: "product",
                        messageId: r,
                        turnIndex: l,
                        contentReferenceStartIndex: t.start_idx,
                        productIndex: N,
                        productId: v.id,
                        productUrl: v.url,
                        interactionSource: "carousel"
                    };
                if (V != null) K.hasAccess && K.openThreadSidebar$(V, W);
                else {
                    if (!c) return;
                    xs(c, W)
                }
            } else window.open(v.url, "_blank")
    }, e[47] = n, e[48] = t.start_idx, e[49] = c, e[50] = r, e[51] = U, e[52] = l, e[53] = q) : q = e[53];
    const Z = q;
    if (t.inline_carousel && a.length === 1) {
        const v = a[0];
        let N;
        e[54] !== v || e[55] !== we ? (N = () => we(v, 0), e[54] = v, e[55] = we, e[56] = N) : N = e[56];
        let O;
        e[57] !== v || e[58] !== Se ? (O = () => Se(v, 0), e[57] = v, e[58] = Se, e[59] = O) : O = e[59];
        let V;
        e[60] !== Z || e[61] !== v ? (V = () => Z(v, 0), e[60] = Z, e[61] = v, e[62] = V) : V = e[62];
        let W;
        return e[63] !== n || e[64] !== t.start_idx || e[65] !== r || e[66] !== v || e[67] !== d || e[68] !== N || e[69] !== O || e[70] !== V ? (W = i.jsx("div", {
            className: "flex flex-col",
            "data-testid": "shopping-widget",
            children: i.jsx(mn, {
                product: v,
                clientThreadId: n,
                messageId: r,
                contentReferenceStartIndex: t.start_idx,
                showDebug: d,
                onShown: N,
                onVisible: O,
                onClicked: V
            })
        }), e[63] = n, e[64] = t.start_idx, e[65] = r, e[66] = v, e[67] = d, e[68] = N, e[69] = O, e[70] = V, e[71] = W) : W = e[71], W
    }
    let J;
    e[72] !== f || e[73] !== R || e[74] !== n || e[75] !== t.end_idx || e[76] !== t.start_idx || e[77] !== c || e[78] !== Z || e[79] !== $ || e[80] !== C || e[81] !== B || e[82] !== m || e[83] !== r || e[84] !== k || e[85] !== a || e[86] !== w || e[87] !== H || e[88] !== d || e[89] !== o || e[90] !== A || e[91] !== G || e[92] !== te ? (J = C ? i.jsx(Us, {
        products: a,
        targetProductCount: o,
        analyticsMetadata: f,
        contentReferenceStartIndex: t.start_idx,
        contentReferenceEndIndex: t.end_idx,
        onCardRender: (v, N, O) => i.jsx(bt, {
            product: v,
            clientThreadId: n,
            messageId: r,
            contentReferenceStartIndex: t.start_idx,
            wide: N,
            showDebug: d,
            isSelectionEnabled: m,
            conversation: c,
            onToggleSelection: () => A(v),
            useVariableImageHeight: O ? .useVariableImageHeight
        }),
        onCardShown: G,
        onCardClicked: Z
    }) : i.jsx(As, {
        items: a,
        targetItemCount: o,
        onCardRender: (v, N) => {
            const O = Lt(v.id),
                V = O ? k[O] : void 0;
            return i.jsx(bt, {
                product: v,
                clientThreadId: n,
                messageId: r,
                contentReferenceStartIndex: t.start_idx,
                wide: N,
                showDebug: d,
                isSelectionEnabled: m,
                conversation: c,
                onToggleSelection: () => A(v),
                description: H ? V : void 0,
                isDescriptionLoading: H && (!$ || B) && O != null && !V,
                isDescriptionCardLayoutEnabled: H,
                onDescriptionShown: W => te(v, W)
            })
        },
        onCardShown: G,
        onCardClicked: Z,
        arrowClassName: R,
        allowFullWidth: w > 2,
        showGradient: !1,
        cardClassName: "group"
    }), e[72] = f, e[73] = R, e[74] = n, e[75] = t.end_idx, e[76] = t.start_idx, e[77] = c, e[78] = Z, e[79] = $, e[80] = C, e[81] = B, e[82] = m, e[83] = r, e[84] = k, e[85] = a, e[86] = w, e[87] = H, e[88] = d, e[89] = o, e[90] = A, e[91] = G, e[92] = te, e[93] = J) : J = e[93];
    let Q;
    e[94] !== n || e[95] !== r || e[96] !== d ? (Q = !1, e[94] = n, e[95] = r, e[96] = d, e[97] = Q) : Q = e[97];
    let ae;
    return e[98] !== J || e[99] !== Q ? (ae = i.jsxs("div", {
        className: "flex flex-col",
        "data-testid": "products-widget",
        children: [J, Q]
    }), e[98] = J, e[99] = Q, e[100] = ae) : ae = e[100], ae
}

function bt(s) {
    "use forget";
    const e = z.c(23),
        {
            product: t,
            clientThreadId: n,
            messageId: r,
            contentReferenceStartIndex: l,
            wide: u,
            showDebug: f,
            isSelectionEnabled: a,
            conversation: o,
            onToggleSelection: p,
            useVariableImageHeight: c,
            description: _,
            isDescriptionLoading: d,
            isDescriptionCardLayoutEnabled: h,
            onDescriptionShown: b
        } = s,
        m = c === void 0 ? !1 : c,
        g = d === void 0 ? !1 : d,
        x = h === void 0 ? !1 : h;
    let S;
    e[0] !== n || e[1] !== l || e[2] !== r || e[3] !== t ? (S = {
        clientThreadId: n,
        messageId: r,
        contentReferenceStartIndex: l,
        shellProduct: t
    }, e[0] = n, e[1] = l, e[2] = r, e[3] = t, e[4] = S) : S = e[4];
    const y = Mt(S);
    let I;
    e[5] !== o || e[6] !== a || e[7] !== p || e[8] !== t.id ? (I = () => Is({
        conversation: o,
        productId: t.id,
        isSelectionEnabled: a,
        onToggleSelection: p
    }), e[5] = o, e[6] = a, e[7] = p, e[8] = t.id, e[9] = I) : I = e[9];
    const C = st(I);
    let w;
    e[10] !== _ || e[11] !== x || e[12] !== g || e[13] !== b || e[14] !== t || e[15] !== C || e[16] !== f || e[17] !== m || e[18] !== u ? (w = i.jsx(un, {
        product: t,
        wide: u,
        showDebug: f,
        useVariableImageHeight: m,
        selection: C,
        description: _,
        isDescriptionLoading: g,
        isDescriptionCardLayoutEnabled: x,
        onDescriptionShown: b
    }), e[10] = _, e[11] = x, e[12] = g, e[13] = b, e[14] = t, e[15] = C, e[16] = f, e[17] = m, e[18] = u, e[19] = w) : w = e[19];
    let P;
    return e[20] !== y || e[21] !== w ? (P = i.jsx("div", {
        ref: y,
        className: "group h-full",
        children: w
    }), e[20] = y, e[21] = w, e[22] = P) : P = e[22], P
}

function un(s) {
    "use forget";
    const e = z.c(14),
        {
            product: t,
            wide: n,
            showDebug: r,
            useVariableImageHeight: l,
            selection: u,
            showPrice: f,
            showMerchants: a,
            underlineTitle: o,
            description: p,
            isDescriptionLoading: c,
            isDescriptionCardLayoutEnabled: _,
            animateDescriptionLayout: d,
            onDescriptionShown: h
        } = s,
        b = r === void 0 ? !1 : r,
        m = l === void 0 ? !1 : l,
        g = f === void 0 ? !0 : f,
        x = a === void 0 ? !0 : a,
        S = o === void 0 ? !1 : o,
        y = c === void 0 ? !1 : c,
        I = _ === void 0 ? !1 : _,
        C = d === void 0 ? !1 : d;
    let w;
    return e[0] !== C || e[1] !== p || e[2] !== I || e[3] !== y || e[4] !== h || e[5] !== t || e[6] !== u || e[7] !== b || e[8] !== x || e[9] !== g || e[10] !== S || e[11] !== m || e[12] !== n ? (w = i.jsx(fn, {
        product: t,
        wide: n,
        showDebug: b,
        useVariableImageHeight: m,
        selection: u,
        showPrice: g,
        showMerchants: x,
        underlineTitle: S,
        description: p,
        isDescriptionLoading: y,
        isDescriptionCardLayoutEnabled: I,
        animateDescriptionLayout: C,
        onDescriptionShown: h
    }), e[0] = C, e[1] = p, e[2] = I, e[3] = y, e[4] = h, e[5] = t, e[6] = u, e[7] = b, e[8] = x, e[9] = g, e[10] = S, e[11] = m, e[12] = n, e[13] = w) : w = e[13], w
}

function fn(s) {
    "use forget";
    const e = z.c(84),
        {
            product: t,
            wide: n,
            showDebug: r,
            useVariableImageHeight: l,
            selection: u,
            showPrice: f,
            showMerchants: a,
            underlineTitle: o,
            description: p,
            isDescriptionLoading: c,
            isDescriptionCardLayoutEnabled: _,
            animateDescriptionLayout: d,
            useContainedImageHover: h,
            forceImageDarkenBlend: b,
            initialVariableImageHeight: m,
            onImageLoadStateChange: g,
            onDescriptionShown: x
        } = s,
        S = r === void 0 ? !1 : r,
        y = l === void 0 ? !1 : l,
        I = f === void 0 ? !0 : f,
        C = a === void 0 ? !0 : a,
        w = o === void 0 ? !1 : o,
        P = c === void 0 ? !1 : c,
        E = _ === void 0 ? !1 : _,
        H = d === void 0 ? !1 : d,
        $ = h === void 0 ? !1 : h,
        Y = b === void 0 ? !1 : b,
        R = t.image_urls ? t.image_urls[0] : void 0,
        j = I && !!t.price,
        k = C && !E && !!t.merchants,
        B = j && E && !k;
    let F;
    e[0] !== p ? (F = p ? .trim(), e[0] = p, e[1] = F) : F = e[1];
    const M = F,
        A = !!M,
        L = E && H,
        [G, X] = T.useState("contain"),
        [Se, re] = T.useState("top"),
        [we, oe] = T.useState(_t),
        [U, ee] = T.useState(R ? "pending" : "loaded"),
        te = kt(),
        ie = T.useRef(R),
        K = T.useRef(null),
        q = !n && y,
        Z = n ? "product_square" : "product_portrait_card",
        J = q ? null : rt(t, Z, te);
    let Q;
    e[2] !== te || e[3] !== t ? (Q = jt(t, te), e[2] = te, e[3] = t, e[4] = Q) : Q = e[4];
    const ae = Q,
        v = Y ? "mix-blend-darken" : J ? Et(J) : "mix-blend-darken",
        N = T.useRef(null);
    let O, V;
    e[5] !== R ? (O = () => {
        ie.current !== R && (ie.current = R, oe(_t), X("contain"), re("top"), ee(R ? "pending" : "loaded"))
    }, V = [R], e[5] = R, e[6] = O, e[7] = V) : (O = e[6], V = e[7]), T.useEffect(O, V);
    let W, Te;
    e[8] !== U || e[9] !== g ? (W = () => {
        g ? .(U !== "pending")
    }, Te = [U, g], e[8] = U, e[9] = g, e[10] = W, e[11] = Te) : (W = e[10], Te = e[11]), T.useEffect(W, Te);
    let Ie, Pe;
    e[12] !== U || e[13] !== R ? (Ie = () => {
        if (!R || U !== "pending") {
            K.current != null && (clearTimeout(K.current), K.current = null);
            return
        }
        return K.current != null && clearTimeout(K.current), K.current = setTimeout(() => {
            K.current = null, ee(pn)
        }, dn), () => {
            K.current != null && (clearTimeout(K.current), K.current = null)
        }
    }, Pe = [U, R], e[12] = U, e[13] = R, e[14] = Ie, e[15] = Pe) : (Ie = e[14], Pe = e[15]), T.useEffect(Ie, Pe);
    let Re, Ne;
    e[16] !== E || e[17] !== M || e[18] !== x || e[19] !== t.id ? (Re = () => {
        if (!E || !M) return;
        const ne = `${t.id}:${M}`;
        N.current !== ne && (N.current = ne, x ? .(M))
    }, Ne = [E, M, x, t.id], e[16] = E, e[17] = M, e[18] = x, e[19] = t.id, e[20] = Re, e[21] = Ne) : (Re = e[20], Ne = e[21]), T.useEffect(Re, Ne);
    let je;
    e[22] !== j || e[23] !== P || e[24] !== M || e[25] !== t.price || e[26] !== B || e[27] !== A ? (je = A ? i.jsxs("div", {
        className: "line-clamp-4 leading-5 md:line-clamp-3",
        children: [j ? i.jsx("span", {
            children: t.price
        }) : null, B ? i.jsx("span", {
            className: "mx-0.5",
            children: "•"
        }) : null, i.jsx("span", {
            children: M
        })]
    }) : P ? i.jsxs("div", {
        className: "flex flex-col gap-1",
        "data-testid": "shopping-product-description-skeleton",
        "aria-hidden": !0,
        children: [i.jsxs("div", {
            className: "flex flex-row items-start gap-0.25",
            children: [j && i.jsx("div", {
                className: "shrink-0",
                children: t.price
            }), B ? i.jsx("div", {
                className: "mx-0.5 shrink-0",
                children: "•"
            }) : null, i.jsx("div", {
                className: "flex min-w-0 flex-1 pt-1",
                children: i.jsx("div", {
                    className: "loading-results-shimmer bg-token-bg-secondary h-3 w-full rounded-md"
                })
            })]
        }), i.jsx("div", {
            className: "loading-results-shimmer bg-token-bg-secondary h-3 w-full rounded-md"
        })]
    }) : i.jsx("div", {
        className: "leading-5",
        children: j ? i.jsx("span", {
            children: t.price
        }) : null
    }), e[22] = j, e[23] = P, e[24] = M, e[25] = t.price, e[26] = B, e[27] = A, e[28] = je) : je = e[28];
    const Ve = je,
        $t = Math.min(Math.max(we, cn), ln);
    let Ee;
    e[29] !== q ? (Ee = ne => {
        const {
            naturalWidth: Ge,
            naturalHeight: Ye
        } = ne;
        if (Ge <= 0 || Ye <= 0) return;
        const dt = Ge / Ye;
        if (ee("loaded"), q) {
            oe(dt);
            return
        }
        X(Math.abs(dt - 1) < .4 ? "cover" : "contain"), re(Ye > Ge ? "top" : "center")
    }, e[29] = q, e[30] = Ee) : Ee = e[30];
    const at = Ee;
    let De;
    e[31] === Symbol.for("react.memo_cache_sentinel") ? (De = () => {
        ee("failed")
    }, e[31] = De) : De = e[31];
    const ct = De,
        Fe = q ? R && U === "pending" && m != null ? {
            height: `${m}px`
        } : {
            aspectRatio: `${$t}`
        } : J ? ae : void 0,
        lt = R && U !== "failed" ? J ? i.jsx(Dt, {
            product: t,
            slotKey: Z,
            alt: t.title,
            imageUrl: R,
            ignoreShowcaseMetadata: te,
            className: D(v, $ && "transition-transform duration-200 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"),
            onLoad: ne => at(ne.currentTarget),
            onError: ct
        }) : i.jsx("img", {
            className: D(q ? "m-0 block h-full w-full object-contain" : `absolute inset-0 m-0 h-full w-full object-${G} object-${Se}`, v, $ && "transition-transform duration-200 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"),
            src: R,
            alt: t.title,
            onLoad: ne => at(ne.currentTarget),
            onError: ct
        }) : i.jsx("div", {
            className: "flex aspect-square items-center justify-center",
            children: i.jsx(Rt, {
                className: "text-token-text-tertiary h-12 w-12"
            })
        }),
        ke = $ ? i.jsx("div", {
            className: "h-full w-full overflow-hidden",
            children: lt
        }) : i.jsx(_s, {
            className: D("h-full w-full", v),
            children: lt
        }),
        Be = n ? "flex-row gap-3" : "flex-col gap-2";
    let ce;
    e[32] !== Be ? (ce = D("flex pb-2", Be), e[32] = Be, e[33] = ce) : ce = e[33];
    const He = q ? `shopping-product-variable-image-frame-${t.id}` : void 0,
        qe = n ? "aspect-square w-1/4" : q ? "w-full" : "aspect-[13/16] w-full",
        Ue = q && !R && "aspect-[16/9]";
    let le;
    e[34] !== qe || e[35] !== Ue ? (le = D("relative", qe, Ue, "overflow-clip rounded-xl bg-[#F3F3F3] dark:bg-[#F3F3F3]"), e[34] = qe, e[35] = Ue, e[36] = le) : le = e[36];
    let de;
    e[37] !== ke || e[38] !== q ? (de = q ? i.jsx("div", {
        className: "absolute inset-0",
        children: ke
    }) : ke, e[37] = ke, e[38] = q, e[39] = de) : de = e[39];
    let ue;
    e[40] !== u ? (ue = u && i.jsx(Ps, {
        selection: u
    }), e[40] = u, e[41] = ue) : ue = e[41];
    let fe;
    e[42] !== Fe || e[43] !== He || e[44] !== le || e[45] !== de || e[46] !== ue ? (fe = i.jsxs("div", {
        "data-testid": He,
        className: le,
        style: Fe,
        children: [de, ue]
    }), e[42] = Fe, e[43] = He, e[44] = le, e[45] = de, e[46] = ue, e[47] = fe) : fe = e[47];
    const Ke = `shopping-product-metadata-${t.id}`,
        We = n ? "text-base" : "text-sm";
    let pe;
    e[48] !== We ? (pe = D("line-clamp-2 font-medium text-ellipsis", We), e[48] = We, e[49] = pe) : pe = e[49];
    const ze = w && "entity-underline hover:entity-accent";
    let he;
    e[50] !== ze ? (he = D(ze), e[50] = ze, e[51] = he) : he = e[51];
    let me;
    e[52] !== t.title || e[53] !== he ? (me = i.jsx("span", {
        className: he,
        children: t.title
    }), e[52] = t.title, e[53] = he, e[54] = me) : me = e[54];
    let ge;
    e[55] !== pe || e[56] !== me ? (ge = i.jsx("div", {
        className: pe,
        children: me
    }), e[55] = pe, e[56] = me, e[57] = ge) : ge = e[57];
    let xe;
    e[58] !== p || e[59] !== Ve || e[60] !== k || e[61] !== j || e[62] !== E || e[63] !== P || e[64] !== t.merchants || e[65] !== t.price || e[66] !== L || e[67] !== A ? (xe = E ? i.jsx("div", {
        className: D("text-token-text-secondary flex flex-col text-sm", L && "min-h-[3.75rem]"),
        children: i.jsx("div", {
            className: D(L && "overflow-hidden transition-[max-height] duration-200 ease-out motion-reduce:transition-none", L && (A || P ? "max-h-[5rem]" : "max-h-5")),
            children: i.jsx("div", {
                className: D(L && "transition-opacity duration-200 ease-out motion-reduce:transition-none", L && P && "opacity-80"),
                children: Ve
            })
        })
    }) : i.jsxs(i.Fragment, {
        children: [(j || k) && i.jsxs("div", {
            className: "text-token-text-secondary flex flex-row gap-0.25 text-sm",
            children: [j && i.jsx("div", {
                children: t.price
            }), j && k && i.jsx("div", {
                className: "mx-0.5",
                children: "•"
            }), k && i.jsx("div", {
                className: "w-0 flex-1 truncate",
                children: t.merchants
            })]
        }), i.jsx(Qs, {
            description: p,
            isLoading: P
        })]
    }), e[58] = p, e[59] = Ve, e[60] = k, e[61] = j, e[62] = E, e[63] = P, e[64] = t.merchants, e[65] = t.price, e[66] = L, e[67] = A, e[68] = xe) : xe = e[68];
    let _e;
    e[69] !== t ? (_e = i.jsx(Ft, {
        product: t,
        wrapperClass: "text-token-text-secondary text-sm flex flex-row items-center gap-0.5",
        includeMidDelimiter: !0,
        iconSize: "small"
    }), e[69] = t, e[70] = _e) : _e = e[70];
    let be;
    e[71] !== t || e[72] !== S ? (be = !1, e[71] = t, e[72] = S, e[73] = be) : be = e[73];
    let ve;
    e[74] !== Ke || e[75] !== ge || e[76] !== xe || e[77] !== _e || e[78] !== be ? (ve = i.jsxs("div", {
        className: "flex flex-col gap-1 px-1",
        "data-shopping-browse-product-metadata": !0,
        "data-testid": Ke,
        children: [ge, xe, _e, be]
    }), e[74] = Ke, e[75] = ge, e[76] = xe, e[77] = _e, e[78] = be, e[79] = ve) : ve = e[79];
    let Me;
    return e[80] !== ce || e[81] !== fe || e[82] !== ve ? (Me = i.jsxs("div", {
        className: ce,
        children: [fe, ve]
    }), e[80] = ce, e[81] = fe, e[82] = ve, e[83] = Me) : Me = e[83], Me
}

function pn(s) {
    return s === "pending" ? "failed" : s
}

function hn(s) {
    "use forget";
    const e = z.c(13),
        {
            className: t,
            product: n,
            imageUrl: r,
            productTitle: l,
            onClicked: u
        } = s,
        [f, a] = T.useState("contain"),
        o = kt(),
        p = T.useRef(null);
    let c;
    if (e[0] !== t || e[1] !== f || e[2] !== o || e[3] !== r || e[4] !== u || e[5] !== n || e[6] !== l) {
        const _ = r === n.image_urls ? .[0] ? rt(n, "product_square", o) : null;
        let d;
        e[8] !== o || e[9] !== n ? (d = jt(n, o), e[8] = o, e[9] = n, e[10] = d) : d = e[10];
        const h = d,
            b = Et(_);
        let m;
        e[11] !== t ? (m = D(t, "hover:scale-[1.005]", "dark:bg-token-text-inverted bg-token-bg-primary", "cursor-pointer overflow-hidden rounded-xl shadow-inner transition-all duration-200", "relative aspect-square max-h-60"), e[11] = t, e[12] = m) : m = e[12], c = i.jsx("div", {
            className: m,
            onClick: u,
            style: _ ? h : void 0,
            children: r ? _ ? i.jsx(Dt, {
                product: n,
                slotKey: "product_square",
                alt: l,
                imageUrl: r,
                ignoreShowcaseMetadata: o,
                className: D("h-full w-full overflow-hidden", b)
            }) : i.jsx("img", {
                ref: p,
                className: `m-0 h-full w-full overflow-hidden object-${f} mix-blend-darken`,
                src: r,
                alt: l,
                onLoad: () => {
                    if (!p.current) return;
                    const {
                        naturalWidth: g,
                        naturalHeight: x
                    } = p.current, S = g / x;
                    a(Math.abs(S - 1) < .5 ? "cover" : "contain")
                }
            }) : i.jsx("div", {
                className: "flex aspect-square items-center justify-center",
                children: i.jsx(Rt, {
                    className: "text-token-text-tertiary h-12 w-12"
                })
            })
        }), e[0] = t, e[1] = f, e[2] = o, e[3] = r, e[4] = u, e[5] = n, e[6] = l, e[7] = c
    } else c = e[7];
    return c
}

function mn(s) {
    "use forget";
    const e = z.c(26),
        {
            product: t,
            clientThreadId: n,
            messageId: r,
            contentReferenceStartIndex: l,
            showDebug: u,
            onShown: f,
            onVisible: a,
            onClicked: o
        } = s,
        p = u === void 0 ? !1 : u;
    let c;
    e[0] !== n || e[1] !== l || e[2] !== r || e[3] !== t ? (c = {
        clientThreadId: n,
        messageId: r,
        contentReferenceStartIndex: l,
        shellProduct: t
    }, e[0] = n, e[1] = l, e[2] = r, e[3] = t, e[4] = c) : c = e[4];
    const _ = Mt(c),
        d = `${r}:${l}:${t.id}`;
    let h;
    e[5] !== a || e[6] !== d ? (h = {
        onShown: a,
        resetKey: d
    }, e[5] = a, e[6] = d, e[7] = h) : h = e[7];
    const b = Ds(h);
    let m, g;
    e[8] !== f ? (m = () => {
        f()
    }, g = [f], e[8] = f, e[9] = m, e[10] = g) : (m = e[9], g = e[10]), T.useEffect(m, g);
    let x;
    e[11] !== _ || e[12] !== b ? (x = P => {
        _(P), b(P)
    }, e[11] = _, e[12] = b, e[13] = x) : x = e[13];
    const S = x;
    let y;
    e[14] !== o || e[15] !== t ? (y = t.image_urls && t.image_urls.length > 0 && t.image_urls.slice(0, 3).map(P => i.jsx(hn, {
        product: t,
        imageUrl: P,
        productTitle: t.title,
        onClicked: o
    }, P)), e[14] = o, e[15] = t, e[16] = y) : y = e[16];
    let I;
    e[17] !== y ? (I = i.jsx("div", {
        className: "flex flex-row gap-2 py-2",
        children: y
    }), e[17] = y, e[18] = I) : I = e[18];
    let C;
    e[19] !== t || e[20] !== p ? (C = !1, e[19] = t, e[20] = p, e[21] = C) : C = e[21];
    let w;
    return e[22] !== S || e[23] !== C || e[24] !== I ? (w = i.jsxs("div", {
        ref: S,
        children: [I, C]
    }), e[22] = S, e[23] = C, e[24] = I, e[25] = w) : w = e[25], w
}
export {
    As as C, fn as P, Dt as S, Ds as a, Js as b, kt as c, rt as d, jt as e, Et as f, Ys as g, Ps as h, $s as i, wn as j, Is as s, Mt as u
};
//# sourceMappingURL=0a3e27b8-npag1tmffr7kps0t.js.map