import {
    c as H,
    j as l,
    u as ae,
    r as N,
    o as Y
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    af as $,
    rn as Q,
    eh as ie,
    aH as re,
    bX as ce,
    bN as me,
    sV as fe,
    jw as de
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    q3 as ge,
    bG as ue,
    q4 as he,
    q5 as X,
    aU as pe,
    gM as xe
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function ee(i) {
    "use forget";
    const e = H.c(5),
        {
            children: a,
            className: t
        } = i;
    let s;
    e[0] !== t ? (s = $("flex flex-col gap-3", t), e[0] = t, e[1] = s) : s = e[1];
    let n;
    return e[2] !== a || e[3] !== s ? (n = l.jsx("section", {
        className: s,
        children: a
    }), e[2] = a, e[3] = s, e[4] = n) : n = e[4], n
}
const te = i => {
    "use forget";
    const e = H.c(24),
        {
            pageIndex: a,
            pageCount: t,
            onPreviousPage: s,
            onNextPage: n
        } = i,
        o = ae(),
        L = Q(),
        r = Math.min(a, t - 1);
    let d;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (d = ge().get("use_case_prompts_enabled", !1), e[0] = d) : d = e[0];
    const v = d;
    let _;
    e[1] === Symbol.for("react.memo_cache_sentinel") ? (_ = $("flex items-center gap-2", L ? "hidden" : "flex"), e[1] = _) : _ = e[1];
    let g;
    e[2] !== o ? (g = o.formatMessage({
        id: "imagegen.actions.page.previous",
        defaultMessage: "Previous page"
    }), e[2] = o, e[3] = g) : g = e[3];
    const m = r <= 0;
    let p, c;
    e[4] === Symbol.for("react.memo_cache_sentinel") ? (p = $("hover:bg-token-interactive-bg-tertiary-press bg-token-bg-primary flex size-9 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-30", v ? "border-transparent" : "border-token-border-heavy"), c = l.jsx(ue, {
        className: "icon-sm"
    }), e[4] = p, e[5] = c) : (p = e[4], c = e[5]);
    let x;
    e[6] !== s || e[7] !== g || e[8] !== m ? (x = l.jsx("button", {
        "aria-label": g,
        onClick: s,
        disabled: m,
        className: p,
        children: c
    }), e[6] = s, e[7] = g, e[8] = m, e[9] = x) : x = e[9];
    let f;
    e[10] !== o ? (f = o.formatMessage({
        id: "imagegen.actions.page.next",
        defaultMessage: "Next page"
    }), e[10] = o, e[11] = f) : f = e[11];
    const b = r >= t - 1;
    let R, C;
    e[12] === Symbol.for("react.memo_cache_sentinel") ? (R = $("hover:bg-token-interactive-bg-tertiary-press bg-token-bg-primary flex size-9 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-30", v ? "border-transparent" : "border-token-border-heavy"), C = l.jsx(re, {
        className: "icon-sm"
    }), e[12] = R, e[13] = C) : (R = e[12], C = e[13]);
    let u;
    e[14] !== n || e[15] !== f || e[16] !== b ? (u = l.jsx("button", {
        "aria-label": f,
        onClick: n,
        disabled: b,
        className: R,
        children: C
    }), e[14] = n, e[15] = f, e[16] = b, e[17] = u) : u = e[17];
    let j;
    e[18] !== o ? (j = v ? l.jsx(be, {
        ariaLabel: o.formatMessage({
            id: "imagegen.actions.page.dismiss",
            defaultMessage: "Dismiss"
        })
    }) : null, e[18] = o, e[19] = j) : j = e[19];
    let y;
    return e[20] !== u || e[21] !== j || e[22] !== x ? (y = l.jsxs("div", {
        className: _,
        children: [x, u, j]
    }), e[20] = u, e[21] = j, e[22] = x, e[23] = y) : y = e[23], y
};

function be(i) {
    "use forget";
    const e = H.c(6),
        {
            ariaLabel: a
        } = i,
        t = ie();
    let s;
    e[0] !== t ? (s = () => {
        t(null)
    }, e[0] = t, e[1] = s) : s = e[1];
    let n;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (n = l.jsx(ce, {
        className: "icon-sm"
    }), e[2] = n) : n = e[2];
    let o;
    return e[3] !== a || e[4] !== s ? (o = l.jsx("button", {
        "aria-label": a,
        onClick: s,
        className: "hover:bg-token-interactive-bg-tertiary-press bg-token-bg-primary flex size-9 items-center justify-center rounded-full border border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-30",
        children: n
    }), e[3] = a, e[4] = s, e[5] = o) : o = e[5], o
}
const se = "-my-1.5 flex w-full gap-3 overflow-clip overflow-x-auto overscroll-x-contain py-1.5 contain-layout contain-paint contain-style [overflow-clip-margin:calc(var(--spacing)*1.5)] [scrollbar-width:none]";

function ye(i) {
    return Array.from(i.querySelectorAll("button")).filter(e => e.getClientRects().length > 0)
}

function Z(i, e) {
    return e.reduce((a, t, s) => Math.abs(t - i) < Math.abs(e[a] - i) ? s : a, 0)
}

function ve(i) {
    const e = ye(i),
        a = Math.max(i.scrollWidth - i.clientWidth, 0);
    if (e.length === 0) return [0];
    if (e.length === 1) return [0];
    const t = i.getBoundingClientRect().left,
        s = e[0].getBoundingClientRect(),
        n = e[1].getBoundingClientRect(),
        o = s.left - t + i.scrollLeft,
        L = n.left - t + i.scrollLeft,
        r = o,
        d = s.width,
        v = Math.max(L - o - d, 0),
        _ = d + v;
    if (_ <= 0) return [0];
    const g = Math.max(Math.floor((i.clientWidth + v) / _), 1),
        m = [];
    for (let p = 0; p < e.length; p += g) {
        const c = e[p].getBoundingClientRect().left - t + i.scrollLeft,
            x = Math.max(c - r, 0),
            f = Math.min(x, a);
        m.at(-1) !== f && m.push(f)
    }
    return m.length > 0 ? m : [0]
}
const je = i => {
    "use forget";
    const e = H.c(4);
    if (he().isSuggestedImagesRailRevampEnabled()) {
        let t;
        return e[0] !== i ? (t = l.jsx(_e, { ...i
        }), e[0] = i, e[1] = t) : t = e[1], t
    }
    let a;
    return e[2] !== i ? (a = l.jsx(Ce, { ...i
    }), e[2] = i, e[3] = a) : a = e[3], a
};

function le(i) {
    "use forget";
    const e = H.c(23),
        {
            hideControls: a,
            itemsLength: t,
            skeleton: s
        } = i,
        n = N.useRef(null);
    let o;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (o = [0], e[0] = o) : o = e[0];
    const L = N.useRef(o),
        [r, d] = N.useState(0),
        [v, _] = N.useState(1);
    let g;
    e[1] === Symbol.for("react.memo_cache_sentinel") ? (g = me(Pe), e[1] = g) : g = e[1];
    const m = g;
    let p;
    e[2] !== t || e[3] !== s ? (p = () => s ? ? t === 0, e[2] = t, e[3] = s, e[4] = p) : p = e[4];
    const [c, x] = N.useState(p);
    let f;
    e[5] === Symbol.for("react.memo_cache_sentinel") ? (f = () => {
        const h = n.current;
        if (!h) return;
        const P = ve(h);
        L.current = P;
        const w = Z(h.scrollLeft, P);
        N.startTransition(() => {
            _(P.length), d(w)
        })
    }, e[5] = f) : f = e[5];
    const b = f;
    let R;
    e[6] === Symbol.for("react.memo_cache_sentinel") ? (R = () => {
        const h = n.current;
        if (!h) return;
        const P = Z(h.scrollLeft, L.current);
        N.startTransition(() => {
            d(P)
        })
    }, e[6] = R) : R = e[6];
    const C = R;
    let u;
    e[7] === Symbol.for("react.memo_cache_sentinel") ? (u = h => {
        const P = n.current;
        if (!P) return;
        const w = L.current,
            U = Math.max(w.length - 1, 0),
            T = Math.max(0, Math.min(h, U));
        N.startTransition(() => {
            d(T)
        }), P.scrollTo({
            left: w[T] ? ? 0,
            behavior: m ? "auto" : "smooth"
        })
    }, e[7] = u) : u = e[7];
    const j = u;
    let y, S;
    e[8] !== t || e[9] !== s ? (y = () => {
        N.startTransition(() => {
            x(s ? ? t === 0)
        })
    }, S = [t, s], e[8] = t, e[9] = s, e[10] = y, e[11] = S) : (y = e[10], S = e[11]), N.useEffect(y, S);
    let E, k;
    e[12] === Symbol.for("react.memo_cache_sentinel") ? (k = () => {
        if (Q()) return;
        const h = n.current;
        if (!(!h || typeof ResizeObserver > "u")) return de({
            axis: "width",
            onChange: () => {
                b()
            },
            target: h
        })
    }, E = [b], e[12] = E, e[13] = k) : (E = e[12], k = e[13]), N.useEffect(k, E);
    let A;
    e[14] === Symbol.for("react.memo_cache_sentinel") ? (A = () => {
        Q() || b()
    }, e[14] = A) : A = e[14];
    let I;
    e[15] !== a || e[16] !== c || e[17] !== t ? (I = [a, c, t, b], e[15] = a, e[16] = c, e[17] = t, e[18] = I) : I = e[18], N.useEffect(A, I);
    let M;
    return e[19] !== c || e[20] !== v || e[21] !== r ? (M = {
        isSkeleton: c,
        pageCount: v,
        pageIndex: r,
        scrollContainerRef: n,
        scrollToPage: j,
        updatePageIndexFromScroll: C
    }, e[19] = c, e[20] = v, e[21] = r, e[22] = M) : M = e[22], M
}

function Pe() {
    return fe()
}

function _e(i) {
    "use forget";
    const e = H.c(59),
        {
            className: a,
            headerClassName: t,
            scrollContainerWrapperClassName: s,
            scrollContainerClassName: n,
            header: o,
            headerAction: L,
            hideControls: r,
            items: d,
            onEditPhoto: v,
            renderItem: _,
            skeleton: g
        } = i;
    let m;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (m = $("transition-discrete motion-safe:transition-opacity shrink-0 basis-24 starting:opacity-0", "md:flex-none md:basis-[calc((100%-(var(--spacing)*12))/5)]"), e[0] = m) : m = e[0];
    const p = m;
    let c;
    e[1] !== r || e[2] !== d.length || e[3] !== g ? (c = {
        hideControls: r,
        itemsLength: d.length,
        skeleton: g
    }, e[1] = r, e[2] = d.length, e[3] = g, e[4] = c) : c = e[4];
    const {
        isSkeleton: x,
        pageCount: f,
        pageIndex: b,
        scrollContainerRef: R,
        scrollToPage: C,
        updatePageIndexFromScroll: u
    } = le(c), j = x && "group skeleton";
    let y;
    e[5] !== a || e[6] !== j ? (y = $("gap-4", "my-1.5", j, a), e[5] = a, e[6] = j, e[7] = y) : y = e[7];
    let S;
    e[8] !== t ? (S = $("flex min-h-9 items-center justify-between gap-4", t), e[8] = t, e[9] = S) : S = e[9];
    const E = x ? null : L;
    let k, A;
    e[10] !== b || e[11] !== C ? (k = () => C(b - 1), A = () => C(b + 1), e[10] = b, e[11] = C, e[12] = k, e[13] = A) : (k = e[12], A = e[13]);
    let I;
    e[14] !== f || e[15] !== b || e[16] !== k || e[17] !== A ? (I = l.jsx(te, {
        pageIndex: b,
        pageCount: f,
        onPreviousPage: k,
        onNextPage: A
    }), e[14] = f, e[15] = b, e[16] = k, e[17] = A, e[18] = I) : I = e[18];
    let M;
    e[19] !== E || e[20] !== I ? (M = l.jsxs("div", {
        className: "ms-auto flex items-center gap-3",
        children: [E, I]
    }), e[19] = E, e[20] = I, e[21] = M) : M = e[21];
    let h;
    e[22] !== o || e[23] !== M || e[24] !== S ? (h = l.jsxs("div", {
        className: S,
        children: [o, M]
    }), e[22] = o, e[23] = M, e[24] = S, e[25] = h) : h = e[25];
    const P = x && "group skeleton";
    let w;
    e[26] !== n || e[27] !== P ? (w = $(P, se, n), e[26] = n, e[27] = P, e[28] = w) : w = e[28];
    const U = x ? "visible" : "hidden",
        T = r ? 10 : 11;
    let V;
    e[29] !== T ? (V = l.jsx(ne, {
        count: T,
        itemClassName: p,
        labelPosition: "overlay"
    }), e[29] = T, e[30] = V) : V = e[30];
    let B;
    e[31] !== U || e[32] !== V ? (B = l.jsx(N.Activity, {
        mode: U,
        children: V
    }), e[31] = U, e[32] = V, e[33] = B) : B = e[33];
    const W = x ? "hidden" : "visible";
    let z;
    e[34] !== r || e[35] !== v ? (z = !r && l.jsx(X, {
        className: p,
        label: l.jsx(Y, {
            id: "imagegen.actions.upload_photo.label",
            defaultMessage: "Upload a photo"
        }),
        onClick: v,
        content: l.jsx("div", {
            className: "flex h-full w-full items-center justify-center",
            children: l.jsx(pe, {
                className: "icon size-6"
            })
        }),
        labelPosition: "overlay",
        type: "add-photo"
    }), e[34] = r, e[35] = v, e[36] = z) : z = e[36];
    let G;
    if (e[37] !== d || e[38] !== _) {
        let K;
        e[40] !== _ ? (K = (J, oe) => l.jsx(N.Fragment, {
            children: _({
                item: J,
                index: oe,
                itemClassName: p
            })
        }, J.id), e[40] = _, e[41] = K) : K = e[41], G = d.map(K), e[37] = d, e[38] = _, e[39] = G
    } else G = e[39];
    let F;
    e[42] !== W || e[43] !== z || e[44] !== G ? (F = l.jsxs(N.Activity, {
        mode: W,
        children: [z, G]
    }), e[42] = W, e[43] = z, e[44] = G, e[45] = F) : F = e[45];
    let O;
    e[46] !== R || e[47] !== w || e[48] !== B || e[49] !== F || e[50] !== u ? (O = l.jsxs("div", {
        ref: R,
        onScrollEnd: u,
        className: w,
        children: [B, F]
    }), e[46] = R, e[47] = w, e[48] = B, e[49] = F, e[50] = u, e[51] = O) : O = e[51];
    let q;
    e[52] !== s || e[53] !== O ? (q = l.jsx("div", {
        className: s,
        children: O
    }), e[52] = s, e[53] = O, e[54] = q) : q = e[54];
    let D;
    return e[55] !== h || e[56] !== q || e[57] !== y ? (D = l.jsxs(ee, {
        className: y,
        children: [h, q]
    }), e[55] = h, e[56] = q, e[57] = y, e[58] = D) : D = e[58], D
}

function Ce(i) {
    "use forget";
    const e = H.c(53),
        {
            className: a,
            header: t,
            headerAction: s,
            hideControls: n,
            items: o,
            onEditPhoto: L,
            renderItem: r,
            skeleton: d
        } = i;
    let v;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (v = $("transition-discrete motion-safe:transition-opacity shrink-0 basis-24 starting:opacity-0", "md:flex-none md:basis-[calc((100%-(var(--spacing)*15))/6)]"), e[0] = v) : v = e[0];
    const _ = v;
    let g;
    e[1] !== n || e[2] !== o.length || e[3] !== d ? (g = {
        hideControls: n,
        itemsLength: o.length,
        skeleton: d
    }, e[1] = n, e[2] = o.length, e[3] = d, e[4] = g) : g = e[4];
    const {
        isSkeleton: m,
        pageCount: p,
        pageIndex: c,
        scrollContainerRef: x,
        scrollToPage: f,
        updatePageIndexFromScroll: b
    } = le(g), R = m && "group skeleton";
    let C;
    e[5] !== a || e[6] !== R ? (C = $("gap-4", R, a), e[5] = a, e[6] = R, e[7] = C) : C = e[7];
    let u;
    e[8] !== s || e[9] !== m || e[10] !== p || e[11] !== c || e[12] !== f ? (u = !m && l.jsxs("div", {
        className: "ms-auto flex items-center gap-3",
        children: [s, l.jsx(te, {
            pageIndex: c,
            pageCount: p,
            onPreviousPage: () => f(c - 1),
            onNextPage: () => f(c + 1)
        })]
    }), e[8] = s, e[9] = m, e[10] = p, e[11] = c, e[12] = f, e[13] = u) : u = e[13];
    let j;
    e[14] !== t || e[15] !== u ? (j = l.jsxs("div", {
        className: "flex min-h-9 items-center justify-between gap-4 pe-4",
        children: [t, u]
    }), e[14] = t, e[15] = u, e[16] = j) : j = e[16];
    const y = n && "hidden";
    let S;
    e[17] !== y ? (S = $("after:bg-token-border-heavy relative me-1 flex gap-3 after:absolute after:-end-4 after:top-0 after:h-full after:w-px after:content-['']", y), e[17] = y, e[18] = S) : S = e[18];
    let E, k;
    e[19] === Symbol.for("react.memo_cache_sentinel") ? (k = l.jsx(Y, {
        id: "imagegen.actions.edit_photo.label",
        defaultMessage: "Edit an image"
    }), E = l.jsx(xe, {
        className: "icon size-6"
    }), e[19] = E, e[20] = k) : (E = e[19], k = e[20]);
    let A;
    e[21] !== L ? (A = l.jsx(X, {
        label: k,
        content: E,
        type: "add-photo",
        onClick: L
    }), e[21] = L, e[22] = A) : A = e[22];
    let I;
    e[23] !== A || e[24] !== S ? (I = l.jsx("div", {
        className: S,
        children: A
    }), e[23] = A, e[24] = S, e[25] = I) : I = e[25];
    const M = m && "group skeleton",
        h = n ? "mx-4" : "px-4";
    let P;
    e[26] !== M || e[27] !== h ? (P = $(M, `${se} flex-1 max-md:mx-0 max-md:px-4`, h), e[26] = M, e[27] = h, e[28] = P) : P = e[28];
    const w = m ? "visible" : "hidden";
    let U;
    e[29] === Symbol.for("react.memo_cache_sentinel") ? (U = l.jsx(ne, {
        count: 10,
        itemClassName: _
    }), e[29] = U) : U = e[29];
    let T;
    e[30] !== w ? (T = l.jsx(N.Activity, {
        mode: w,
        children: U
    }), e[30] = w, e[31] = T) : T = e[31];
    const V = m ? "hidden" : "visible";
    let B;
    if (e[32] !== o || e[33] !== r) {
        let O;
        e[35] !== r ? (O = (q, D) => l.jsx(N.Fragment, {
            children: r({
                item: q,
                index: D,
                itemClassName: _
            })
        }, q.id), e[35] = r, e[36] = O) : O = e[36], B = o.map(O), e[32] = o, e[33] = r, e[34] = B
    } else B = e[34];
    let W;
    e[37] !== V || e[38] !== B ? (W = l.jsx(N.Activity, {
        mode: V,
        children: B
    }), e[37] = V, e[38] = B, e[39] = W) : W = e[39];
    let z;
    e[40] !== x || e[41] !== P || e[42] !== T || e[43] !== W || e[44] !== b ? (z = l.jsxs("div", {
        ref: x,
        onScrollEnd: b,
        className: P,
        children: [T, W]
    }), e[40] = x, e[41] = P, e[42] = T, e[43] = W, e[44] = b, e[45] = z) : z = e[45];
    let G;
    e[46] !== I || e[47] !== z ? (G = l.jsxs("div", {
        className: "flex justify-between gap-3",
        children: [I, z]
    }), e[46] = I, e[47] = z, e[48] = G) : G = e[48];
    let F;
    return e[49] !== G || e[50] !== C || e[51] !== j ? (F = l.jsxs(ee, {
        className: C,
        children: [j, G]
    }), e[49] = G, e[50] = C, e[51] = j, e[52] = F) : F = e[52], F
}

function ne(i) {
    "use forget";
    const e = H.c(6),
        {
            count: a,
            itemClassName: t,
            labelPosition: s
        } = i;
    let n;
    e[0] !== a ? (n = Array.from({
        length: a
    }), e[0] = a, e[1] = n) : n = e[1];
    let o;
    return e[2] !== t || e[3] !== s || e[4] !== n ? (o = n.map((L, r) => l.jsx(X, {
        className: t,
        skeleton: !0,
        label: l.jsx(Y, {
            id: "imagegen.actions.add_yourself.label",
            defaultMessage: "Add yourself"
        }),
        content: l.jsx("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAn8B9FY6SFwAAAAASUVORK5CYII=",
            alt: "",
            width: 1024,
            height: 1024,
            className: "invisible h-full w-full object-cover"
        }),
        labelPosition: s,
        type: "apply-style"
    }, r)), e[2] = t, e[3] = s, e[4] = n, e[5] = o) : o = e[5], o
}
const Ne = Object.freeze(Object.defineProperty({
    __proto__: null,
    ImageGenPromptItemCardRow: je
}, Symbol.toStringTag, {
    value: "Module"
}));
export {
    te as I, ee as a, je as b, Ne as i
};
//# sourceMappingURL=9521ff6d-cy066hy1jl6r8zjn.js.map