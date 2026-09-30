import {
    c as G,
    u as Ce,
    j as s,
    r as w,
    h as Xe
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    an as st,
    a9 as Pe,
    ab as it,
    bX as Ge,
    ya as Ye,
    rO as ot,
    af as xe,
    a6 as rt,
    a2 as at,
    a1 as ct,
    ih as dt,
    ij as ut,
    bN as ft,
    v2 as mt,
    ay as Oe,
    cc as _e,
    b5 as Ne,
    En as ht,
    AW as gt,
    Eo as xt,
    AX as He,
    jw as bt,
    yd as pt,
    aE as vt,
    x as yt,
    cz as Te,
    _ as wt,
    Ep as St,
    Eq as Rt
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    g as Tt
} from "./540191af-eyt4mhgiscgde9oh.js";
import {
    fv as Ue,
    vi as jt,
    g7 as It,
    cX as qe,
    hN as ye,
    dB as Et
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    g as Mt
} from "./b9e74381-im85lkncbx47l1ca.js";
import {
    g as Me
} from "./5955c2e7-bm7q695htcpusowj.js";
import {
    u as Lt,
    S as Ct
} from "./d93502a4-kb9e349iy8dy3l12.js";
import {
    u as kt
} from "./a35b0b5c-c4d5x0qzgpq8r7ek.js";
import {
    i as Le,
    a as Se
} from "./8d846022-n379etekqsymvq1f.js";
import "./77a251d8-ki2u6aaeuhtt02gd.js";
import "./52ac6121-m7z0qcro3hdwwo6n.js";

function _t(c) {
    "use forget";
    const e = G.c(21),
        {
            title: t,
            accessibleTitle: n,
            headerContent: i
        } = c,
        l = Ce();
    let o;
    e[0] !== t ? (o = typeof t == "string" ? t.trim().length > 0 : t != null, e[0] = t, e[1] = o) : o = e[1];
    const r = o;
    let a;
    e[2] !== n || e[3] !== r ? (a = !r && n != null ? s.jsx(st, {
        children: s.jsx(Pe, {
            children: n
        })
    }) : null, e[2] = n, e[3] = r, e[4] = a) : a = e[4];
    let f;
    e[5] !== l ? (f = l.formatMessage({
        id: "iF/tIQ",
        defaultMessage: "Close fullscreen view"
    }), e[5] = l, e[6] = f) : f = e[6];
    let p;
    e[7] !== f ? (p = s.jsx(it, {
        asChild: !0,
        children: s.jsx(Ue, {
            icon: Ge,
            "aria-label": f
        })
    }), e[7] = f, e[8] = p) : p = e[8];
    let v;
    e[9] !== r || e[10] !== t ? (v = r ? s.jsx(Pe, {
        className: "text-token-text-primary min-w-0 truncate text-base font-normal",
        children: t
    }) : null, e[9] = r, e[10] = t, e[11] = v) : v = e[11];
    let g;
    e[12] !== p || e[13] !== v ? (g = s.jsxs("div", {
        className: "flex min-w-0 flex-1 items-center gap-2",
        children: [p, v]
    }), e[12] = p, e[13] = v, e[14] = g) : g = e[14];
    let S;
    e[15] !== i ? (S = i != null ? s.jsx("div", {
        className: "flex shrink-0 items-center gap-2",
        "data-testid": "fullscreen-shell-header-content",
        children: i
    }) : null, e[15] = i, e[16] = S) : S = e[16];
    let d;
    return e[17] !== a || e[18] !== g || e[19] !== S ? (d = s.jsxs("header", {
        className: "bg-token-bg-primary border-token-border-light sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b px-2 md:px-4",
        "data-testid": "fullscreen-shell-header",
        children: [a, g, S]
    }), e[17] = a, e[18] = g, e[19] = S, e[20] = d) : d = e[20], d
}

function Qe(c) {
    "use forget";
    const e = G.c(23),
        {
            open: t,
            onOpenChange: n,
            title: i,
            accessibleTitle: l,
            headerContent: o,
            children: r,
            className: a,
            bodyClassName: f,
            contentRef: p,
            portalContainer: v
        } = c,
        g = Ye(),
        S = w.useRef(null),
        d = ot(p, S),
        y = v ? ? g ? .document.body;
    let x;
    e[0] !== a ? (x = xe("bg-token-bg-primary pointer-events-auto absolute inset-0 z-50 flex flex-col outline-none", a), e[0] = a, e[1] = x) : x = e[1];
    let u;
    e[2] !== l || e[3] !== o || e[4] !== i ? (u = s.jsx(_t, {
        title: i,
        accessibleTitle: l,
        headerContent: o
    }), e[2] = l, e[3] = o, e[4] = i, e[5] = u) : u = e[5];
    let b;
    e[6] !== f ? (b = xe("min-h-0 flex-1 overflow-y-auto", f), e[6] = f, e[7] = b) : b = e[7];
    let L;
    e[8] !== r || e[9] !== b ? (L = s.jsx("div", {
        className: b,
        "data-testid": "fullscreen-shell-body",
        children: r
    }), e[8] = r, e[9] = b, e[10] = L) : L = e[10];
    let k;
    e[11] !== d || e[12] !== x || e[13] !== u || e[14] !== L ? (k = s.jsxs(rt, {
        ref: d,
        "aria-describedby": void 0,
        onInteractOutside: At,
        className: x,
        children: [u, L]
    }), e[11] = d, e[12] = x, e[13] = u, e[14] = L, e[15] = k) : k = e[15];
    let R;
    e[16] !== y || e[17] !== k ? (R = s.jsx(at, {
        container: y,
        children: k
    }), e[16] = y, e[17] = k, e[18] = R) : R = e[18];
    let m;
    return e[19] !== n || e[20] !== t || e[21] !== R ? (m = s.jsx(ct, {
        open: t,
        onOpenChange: n,
        modal: !1,
        children: R
    }), e[19] = n, e[20] = t, e[21] = R, e[22] = m) : m = e[22], m
}

function At(c) {
    return c.preventDefault()
}
let je = null,
    Re = null;

function Nt(c) {
    return c ? .document.getElementById("main") ? .closest("[data-scroll-root]") ? .parentElement ? ? null
}

function Pt(c) {
    "use forget";
    const e = G.c(17);
    let t, n;
    e[0] !== c ? ({
        onOpenChange: t,
        ...n
    } = c, e[0] = c, e[1] = t, e[2] = n) : (t = e[1], n = e[2]);
    const i = Ye(),
        l = dt(),
        o = ut();
    let r;
    e[3] !== l || e[4] !== o ? (r = l ? ft(Ot) : o, e[3] = l, e[4] = o, e[5] = r) : r = e[5];
    const a = w.useRef(r),
        f = w.useRef(!1),
        p = w.useRef(!1);
    let v;
    e[6] === Symbol.for("react.memo_cache_sentinel") ? (v = () => {
        if (p.current) return;
        p.current = !0;
        const b = je === !0;
        je = null, b && Oe.setSidebarOpen(!0)
    }, e[6] = v) : v = e[6];
    const g = v;
    let S, d;
    e[7] === Symbol.for("react.memo_cache_sentinel") ? (S = () => (Re != null && (clearTimeout(Re), Re = null), je == null && (je = a.current), Oe.setSidebarOpen(!1), () => {
        f.current || (Re = setTimeout(() => {
            g(), Re = null
        }, 0))
    }), d = [g], e[7] = S, e[8] = d) : (S = e[7], d = e[8]), w.useEffect(S, d);
    let y;
    e[9] !== t ? (y = b => {
        b || (f.current = !0, g()), t(b)
    }, e[9] = t, e[10] = y) : y = e[10];
    let x;
    e[11] !== i ? (x = Nt(i), e[11] = i, e[12] = x) : x = e[12];
    let u;
    return e[13] !== n || e[14] !== y || e[15] !== x ? (u = s.jsx(Qe, { ...n,
        onOpenChange: y,
        portalContainer: x
    }), e[13] = n, e[14] = y, e[15] = x, e[16] = u) : u = e[16], u
}

function Ot() {
    return mt()
}

function Ze(c) {
    "use forget";
    const e = G.c(11),
        {
            image: t,
            drawingState: n,
            drawingCanvasRef: i,
            imageClassName: l
        } = c,
        o = t.title ? ? "";
    let r;
    e[0] !== t.url || e[1] !== l || e[2] !== o ? (r = s.jsx("img", {
        src: t.url,
        alt: o,
        className: l,
        fetchPriority: "high",
        loading: "eager",
        decoding: "async"
    }), e[0] = t.url, e[1] = l, e[2] = o, e[3] = r) : r = e[3];
    let a;
    e[4] !== i || e[5] !== n || e[6] !== t ? (a = s.jsx(jt, {
        image: t,
        drawingState: n,
        drawingCanvasRef: i
    }), e[4] = i, e[5] = n, e[6] = t, e[7] = a) : a = e[7];
    let f;
    return e[8] !== r || e[9] !== a ? (f = s.jsxs(s.Fragment, {
        children: [r, a]
    }), e[8] = r, e[9] = a, e[10] = f) : f = e[10], f
}

function Ht(c) {
    "use forget";
    const e = G.c(12),
        {
            image: t,
            drawingState: n,
            drawingCanvasRef: i
        } = c,
        l = w.useRef(null),
        [o, r] = w.useState(null);
    let a, f;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (a = () => {
        const d = l.current;
        if (!d) return;
        const y = () => {
            const {
                width: u,
                height: b
            } = d.getBoundingClientRect();
            r(L => L ? .width === u && L ? .height === b ? L : {
                width: u,
                height: b
            })
        };
        if (y(), typeof ResizeObserver > "u") return;
        const x = new ResizeObserver(() => {
            y()
        });
        return x.observe(d), () => {
            x.disconnect()
        }
    }, f = [], e[0] = a, e[1] = f) : (a = e[0], f = e[1]), w.useEffect(a, f);
    let p;
    e[2] !== o || e[3] !== t ? (p = o == null ? void 0 : Mt({
        mediaWidth: t.width,
        mediaHeight: t.height,
        containerWidth: o.width,
        containerHeight: o.height
    }), e[2] = o, e[3] = t, e[4] = p) : p = e[4];
    const v = p;
    let g;
    e[5] !== i || e[6] !== n || e[7] !== v || e[8] !== t ? (g = v && s.jsx("div", {
        className: "absolute overflow-hidden rounded bg-neutral-100",
        style: v,
        children: s.jsx(Ze, {
            image: t,
            drawingState: n,
            drawingCanvasRef: i,
            imageClassName: "block h-full w-full rounded object-contain"
        })
    }), e[5] = i, e[6] = n, e[7] = v, e[8] = t, e[9] = g) : g = e[9];
    let S;
    return e[10] !== g ? (S = s.jsx("div", {
        ref: l,
        className: "relative h-full w-full",
        children: g
    }), e[10] = g, e[11] = S) : S = e[11], S
}
const Vt = 240,
    Wt = 16,
    zt = 9,
    Ve = "pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-black/15 text-white backdrop-blur-md hover:bg-black/30 focus:bg-black/30";

function Dt(c) {
    "use forget";
    const e = G.c(75),
        {
            media: t,
            presentation: n,
            isActiveSlide: i
        } = c,
        l = i === void 0 ? !1 : i,
        o = Ce(),
        r = w.useId(),
        a = w.useRef(null),
        [f, p] = w.useState(!1),
        [v, g] = w.useState(!1),
        S = kt(),
        [d, y] = w.useState(!0),
        x = S ? .isMuted ? ? d,
        u = t.width > 0 ? t.width : Wt,
        b = t.height > 0 ? t.height : zt,
        L = u / b;
    let k;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (k = E => {
        a.current = E, E && E.readyState >= HTMLMediaElement.HAVE_METADATA && g(!0)
    }, e[0] = k) : k = e[0];
    const R = k;
    let m;
    e[1] !== S ? (m = E => {
        if (S) {
            S.setMuted(E);
            return
        }
        y(E)
    }, e[1] = S, e[2] = m) : m = e[2];
    const P = m;
    let T;
    e[3] !== l || e[4] !== x || e[5] !== r || e[6] !== P ? (T = {
        ownerId: r,
        isMuted: x,
        canOwnAudio: l,
        onMutedChange: P
    }, e[3] = l, e[4] = x, e[5] = r, e[6] = P, e[7] = T) : T = e[7];
    const {
        shouldMute: _,
        toggleMuted: C
    } = Lt(T), V = $t;
    let W;
    e[8] === Symbol.for("react.memo_cache_sentinel") ? (W = E => {
        if (E) try {
            E.play().catch(() => {
                p(!1)
            })
        } catch {
            p(!1)
        }
    }, e[8] = W) : W = e[8];
    const D = W;
    let z;
    e[9] === Symbol.for("react.memo_cache_sentinel") ? (z = () => {
        const E = a.current;
        if (E) {
            if (E.paused) {
                D(E);
                return
            }
            E.pause()
        }
    }, e[9] = z) : z = e[9];
    const F = z;
    let $;
    e[10] !== l ? ($ = () => {
        const E = a.current;
        if (!E) return;
        if (!l) {
            V(E);
            return
        }
        E.networkState === HTMLMediaElement.NETWORK_EMPTY && E.load(), D(E);
        const I = () => {
            D(E)
        };
        return E.addEventListener("canplay", I, {
            once: !0
        }), E.addEventListener("loadeddata", I, {
            once: !0
        }), () => {
            E.removeEventListener("canplay", I), E.removeEventListener("loadeddata", I)
        }
    }, e[10] = l, e[11] = $) : $ = e[11];
    let B;
    e[12] !== l || e[13] !== t.url ? (B = [V, l, t.url, D], e[12] = l, e[13] = t.url, e[14] = B) : B = e[14], w.useEffect($, B);
    let ae, O;
    e[15] === Symbol.for("react.memo_cache_sentinel") ? (O = () => {
        const E = a.current;
        return () => {
            V(E)
        }
    }, ae = [V], e[15] = ae, e[16] = O) : (ae = e[15], O = e[16]), w.useEffect(O, ae);
    let J;
    e[17] !== n || e[18] !== L || e[19] !== b || e[20] !== u ? (J = n === "desktop" ? {
        aspectRatio: `${u} / ${b}`,
        height: `min(100%, calc((100vw - ${Vt}px) / ${L}))`,
        maxHeight: "100%"
    } : {
        aspectRatio: `${u} / ${b}`
    }, e[17] = n, e[18] = L, e[19] = b, e[20] = u, e[21] = J) : J = e[21];
    const ee = J,
        Y = l ? t.url : void 0,
        U = t.thumbnail ? ? void 0,
        te = t.title ? ? "",
        ne = !v && "opacity-0";
    let K;
    e[22] !== ne ? (K = xe("block h-full w-full object-contain shadow-none", ne), e[22] = ne, e[23] = K) : K = e[23];
    const ie = n === "desktop" || l ? "auto" : "metadata";
    let q, Q, H, h, j, A;
    e[24] === Symbol.for("react.memo_cache_sentinel") ? (q = () => g(!0), Q = () => g(!0), H = () => g(!0), h = () => g(!0), j = () => {
        g(!0), p(!0)
    }, A = () => p(!1), e[24] = q, e[25] = Q, e[26] = H, e[27] = h, e[28] = j, e[29] = A) : (q = e[24], Q = e[25], H = e[26], h = e[27], j = e[28], A = e[29]);
    let M;
    e[30] !== l || e[31] !== _ || e[32] !== Y || e[33] !== U || e[34] !== te || e[35] !== K || e[36] !== ie || e[37] !== b || e[38] !== u ? (M = s.jsx("video", {
        ref: R,
        src: Y,
        poster: U,
        width: u,
        height: b,
        autoPlay: l,
        muted: _,
        loop: !0,
        playsInline: !0,
        "aria-label": te,
        className: K,
        onClick: F,
        preload: ie,
        onLoadedMetadata: q,
        onLoadedData: Q,
        onCanPlay: H,
        onError: h,
        onPlay: j,
        onPause: A
    }), e[30] = l, e[31] = _, e[32] = Y, e[33] = U, e[34] = te, e[35] = K, e[36] = ie, e[37] = b, e[38] = u, e[39] = M) : M = e[39];
    const N = n === "desktop" ? "opacity-0 group-hover:opacity-100 focus-within:opacity-100" : "opacity-100";
    let X;
    e[40] !== N ? (X = xe("pointer-events-none absolute end-3 top-3 z-10", N), e[40] = N, e[41] = X) : X = e[41];
    let Z;
    e[42] !== o || e[43] !== x ? (Z = o.formatMessage(x ? Ie.unmuteVideo : Ie.muteVideo), e[42] = o, e[43] = x, e[44] = Z) : Z = e[44];
    let ce;
    e[45] !== C ? (ce = E => {
        E.preventDefault(), E.stopPropagation(), C()
    }, e[45] = C, e[46] = ce) : ce = e[46];
    let de;
    e[47] !== x ? (de = s.jsx(Ct, {
        muted: x,
        className: "icon text-white"
    }), e[47] = x, e[48] = de) : de = e[48];
    let ue;
    e[49] !== Z || e[50] !== ce || e[51] !== de ? (ue = s.jsx("button", {
        type: "button",
        "aria-label": Z,
        className: Ve,
        onClick: ce,
        children: de
    }), e[49] = Z, e[50] = ce, e[51] = de, e[52] = ue) : ue = e[52];
    let fe;
    e[53] !== X || e[54] !== ue ? (fe = s.jsx("div", {
        className: X,
        children: ue
    }), e[53] = X, e[54] = ue, e[55] = fe) : fe = e[55];
    const we = n === "desktop" ? "opacity-0 group-hover:opacity-100 focus-within:opacity-100" : "opacity-100";
    let le;
    e[56] !== we ? (le = xe("pointer-events-none absolute start-3 bottom-3 z-10", we), e[56] = we, e[57] = le) : le = e[57];
    let be;
    e[58] !== o || e[59] !== f ? (be = o.formatMessage(f ? Ie.pauseVideo : Ie.playVideo), e[58] = o, e[59] = f, e[60] = be) : be = e[60];
    let me;
    e[61] === Symbol.for("react.memo_cache_sentinel") ? (me = E => {
        E.preventDefault(), E.stopPropagation(), F()
    }, e[61] = me) : me = e[61];
    let he;
    e[62] !== f ? (he = f ? s.jsx(It, {
        className: "icon text-white"
    }) : s.jsx(qe, {
        className: "icon text-white"
    }), e[62] = f, e[63] = he) : he = e[63];
    let oe;
    e[64] !== be || e[65] !== he ? (oe = s.jsx("button", {
        type: "button",
        "aria-label": be,
        className: Ve,
        onClick: me,
        children: he
    }), e[64] = be, e[65] = he, e[66] = oe) : oe = e[66];
    let se;
    e[67] !== le || e[68] !== oe ? (se = s.jsx("div", {
        className: le,
        children: oe
    }), e[67] = le, e[68] = oe, e[69] = se) : se = e[69];
    let ge;
    return e[70] !== ee || e[71] !== M || e[72] !== fe || e[73] !== se ? (ge = s.jsxs("div", {
        "data-testid": "lightbox-video-frame",
        className: "group relative max-h-full max-w-full overflow-hidden rounded",
        style: ee,
        children: [M, fe, se]
    }), e[70] = ee, e[71] = M, e[72] = fe, e[73] = se, e[74] = ge) : ge = e[74], ge
}

function $t(c) {
    c && (c.pause(), c.removeAttribute("src"), c.load())
}

function Ft(c) {
    "use forget";
    const e = G.c(2);
    let t;
    return e[0] !== c ? (t = s.jsx(Dt, { ...c
    }), e[0] = c, e[1] = t) : t = e[1], t
}
const Ie = Xe({
        muteVideo: {
            id: "6ZKYXm",
            defaultMessage: "Mute video"
        },
        unmuteVideo: {
            id: "CXaK+s",
            defaultMessage: "Unmute video"
        },
        playVideo: {
            id: "j3xGIG",
            defaultMessage: "Play video"
        },
        pauseVideo: {
            id: "3bApjQ",
            defaultMessage: "Pause video"
        }
    }),
    We = 1.2,
    ze = .95,
    Bt = 80,
    Kt = 56,
    De = .34,
    $e = "linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 20%, #000 80%, rgba(0,0,0,0) 100%)",
    Fe = "linear-gradient(90deg, rgba(0,0,0,0) 0%, #000 20%, #000 80%, rgba(0,0,0,0) 100%)",
    Ee = Xe({
        imageThumbLabelWithTitle: {
            id: "lightbox.rail.imageThumbLabelWithTitle",
            defaultMessage: "Image {index, number} of {total, number}: {title}"
        },
        videoThumbLabelWithTitle: {
            id: "lightbox.rail.videoThumbLabelWithTitle",
            defaultMessage: "Video {index, number} of {total, number}: {title}"
        },
        imageThumbLabelWithoutTitle: {
            id: "lightbox.rail.imageThumbLabelWithoutTitle",
            defaultMessage: "Image {index, number} of {total, number}"
        },
        videoThumbLabelWithoutTitle: {
            id: "lightbox.rail.videoThumbLabelWithoutTitle",
            defaultMessage: "Video {index, number} of {total, number}"
        }
    }),
    Xt = 2;

function Ae({
    currentOffset: c,
    itemSize: e,
    nextIndex: t,
    targetIndex: n
}) {
    return t === n && Math.abs(c - n * e) <= Xt
}

function Gt(c) {
    if (!(c instanceof HTMLElement)) return !1;
    const e = c.getAttribute("role");
    return c.tagName === "SELECT" || e === "combobox" ? !0 : c instanceof HTMLInputElement || c instanceof HTMLTextAreaElement ? c.value.trim().length > 0 : c.isContentEditable || e === "textbox" ? c.textContent.trim().length > 0 : !1
}
const Je = w.memo(function(e) {
    "use forget";
    const t = G.c(31),
        {
            media: n,
            size: i,
            active: l,
            onClick: o,
            axis: r,
            index: a,
            indexMv: f,
            total: p
        } = e,
        v = Ce();
    let g;
    t[0] !== a ? (g = z => {
        const F = Math.abs(z - a);
        return F < 1 ? We - (We - ze) * F : ze
    }, t[0] = a, t[1] = g) : g = t[1];
    const S = g;
    let d;
    t[2] !== a ? (d = z => {
        const F = Math.abs(z - a);
        return F < 1 ? 1 - (1 - De) * F : De
    }, t[2] = a, t[3] = d) : d = t[3];
    const y = d,
        x = He(f, S),
        u = He(f, y);
    let b;
    t[4] !== n ? (b = n.thumbnail ? ? (Le(n) ? null : n.url), t[4] = n, t[5] = b) : b = t[5];
    const L = b;
    let k;
    t[6] !== n ? (k = Le(n), t[6] = n, t[7] = k) : k = t[7];
    const R = k;
    let m;
    if (t[8] !== a || t[9] !== v || t[10] !== R || t[11] !== n.prompt || t[12] !== n.title || t[13] !== p) {
        const z = n.title ? .trim() || (R ? n.prompt ? .trim() : "");
        m = z ? v.formatMessage(R ? Ee.videoThumbLabelWithTitle : Ee.imageThumbLabelWithTitle, {
            index: a + 1,
            total: p,
            title: z
        }) : v.formatMessage(R ? Ee.videoThumbLabelWithoutTitle : Ee.imageThumbLabelWithoutTitle, {
            index: a + 1,
            total: p
        }), t[8] = a, t[9] = v, t[10] = R, t[11] = n.prompt, t[12] = n.title, t[13] = p, t[14] = m
    } else m = t[14];
    const P = m,
        T = l ? "true" : void 0;
    let _;
    t[15] !== i || t[16] !== u || t[17] !== x ? (_ = {
        height: i,
        width: i,
        scale: x,
        opacity: u
    }, t[15] = i, t[16] = u, t[17] = x, t[18] = _) : _ = t[18];
    const C = r === "vertical" ? "mx-auto mb-2 block" : "flex-shrink-0";
    let V;
    t[19] !== C ? (V = xe("border-thin focus-visible:ring-ring overflow-hidden rounded-lg border-black/10 bg-gray-200 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none dark:border-white/10", C), t[19] = C, t[20] = V) : V = t[20];
    let W;
    t[21] !== L ? (W = L ? s.jsx("img", {
        src: L,
        alt: "",
        loading: "lazy",
        decoding: "async",
        className: "h-full w-full rounded-lg object-cover"
    }) : s.jsx("div", {
        "aria-hidden": "true",
        className: "flex h-full w-full items-center justify-center rounded-lg bg-black/70 text-white",
        children: s.jsx(qe, {
            className: "icon"
        })
    }), t[21] = L, t[22] = W) : W = t[22];
    let D;
    return t[23] !== P || t[24] !== a || t[25] !== o || t[26] !== W || t[27] !== T || t[28] !== _ || t[29] !== V ? (D = s.jsx(Ne.button, {
        "data-rail-index": a,
        type: "button",
        "aria-current": T,
        "aria-label": P,
        onClick: o,
        style: _,
        className: V,
        children: W
    }), t[23] = P, t[24] = a, t[25] = o, t[26] = W, t[27] = T, t[28] = _, t[29] = V, t[30] = D) : D = t[30], D
});

function et(c) {
    "use forget";
    const e = G.c(62),
        {
            axis: t,
            itemSize: n,
            gap: i,
            mediaLen: l,
            index: o,
            setIndex: r,
            externalSyncRef: a,
            externalSyncTargetIndexRef: f,
            wheelHostRef: p
        } = c,
        v = w.useRef(null),
        [g, S] = w.useState(0),
        d = n + i,
        y = d * (l - 1);
    let x;
    e[0] !== t || e[1] !== o || e[2] !== d || e[3] !== y ? (x = () => {
        const h = v.current;
        if (!h) return;
        const j = Math.round(o * d);
        t === "vertical" ? h.scrollTop = ye(j, 0, y) : h.scrollLeft = ye(j, 0, y)
    }, e[0] = t, e[1] = o, e[2] = d, e[3] = y, e[4] = x) : x = e[4];
    let u;
    e[5] === Symbol.for("react.memo_cache_sentinel") ? (u = [], e[5] = u) : u = e[5], _e(x, u);
    let b, L;
    e[6] !== t || e[7] !== d ? (b = () => {
        if (t !== "vertical") return;
        const h = () => {
            const A = window.innerHeight - Kt,
                M = Math.max(1, Math.floor(A / d)),
                N = M % 2 === 0 ? M - 1 : M;
            S(N * d - Bt)
        };
        h();
        const j = bt({
            axis: "height",
            initialSize: !1,
            target: document.documentElement,
            onChange: () => {
                h()
            }
        });
        return () => {
            j ? .()
        }
    }, L = [t, d], e[6] = t, e[7] = d, e[8] = b, e[9] = L) : (b = e[8], L = e[9]), _e(b, L);
    let k;
    e[10] === Symbol.for("react.memo_cache_sentinel") ? (k = {
        container: v
    }, e[10] = k) : k = e[10];
    const {
        scrollX: R,
        scrollY: m
    } = ht(k), P = t === "vertical" ? m : R, T = gt(o), _ = w.useRef(null);
    let C, V;
    e[11] !== t || e[12] !== o || e[13] !== T ? (C = () => {
        t !== "vertical" && T.set(o)
    }, V = [t, o, T], e[11] = t, e[12] = o, e[13] = T, e[14] = C, e[15] = V) : (C = e[14], V = e[15]), w.useEffect(C, V);
    let W;
    e[16] !== t || e[17] !== o || e[18] !== T || e[19] !== d || e[20] !== l || e[21] !== r ? (W = h => {
        if (t !== "vertical") return;
        const j = Math.round(h / d);
        if (_.current != null) {
            const A = _.current;
            if (!Ae({
                    currentOffset: h,
                    itemSize: d,
                    nextIndex: j,
                    targetIndex: A
                })) {
                T.set(h / d);
                return
            }
            _.current = null
        }
        j !== o && j >= 0 && j < l && r(j), T.set(h / d)
    }, e[16] = t, e[17] = o, e[18] = T, e[19] = d, e[20] = l, e[21] = r, e[22] = W) : W = e[22], xt(P, "change", W);
    let D;
    e[23] !== d || e[24] !== y ? (D = (h, j) => {
        const A = h.querySelector(`[data-rail-index="${j}"]`);
        if (A) {
            const M = A.offsetLeft + A.offsetWidth / 2 - h.clientWidth / 2,
                N = Math.max(0, h.scrollWidth - h.clientWidth);
            return ye(Math.round(M), 0, N)
        }
        return ye(Math.round(j * d), 0, y)
    }, e[23] = d, e[24] = y, e[25] = D) : D = e[25];
    const z = D;
    let F;
    e[26] !== t || e[27] !== z || e[28] !== d || e[29] !== y ? (F = (h, j) => {
        const A = j === void 0 ? !1 : j,
            M = v.current;
        if (!M) return;
        if (t === "vertical") {
            const X = ye(Math.round(h * d), 0, y);
            A ? (_.current = h, M.scrollTo({
                top: X,
                behavior: "smooth"
            })) : (_.current = null, M.scrollTop = X);
            return
        }
        const N = z(M, h);
        A ? M.scrollTo({
            left: N,
            behavior: "smooth"
        }) : M.scrollLeft = N
    }, e[26] = t, e[27] = z, e[28] = d, e[29] = y, e[30] = F) : F = e[30];
    const $ = F,
        B = w.useRef(null);
    let ae;
    e[31] !== l || e[32] !== $ || e[33] !== r ? (ae = h => {
        B.current || (B.current = requestAnimationFrame(() => {
            r(j => {
                const A = ye(j + h, 0, l - 1);
                return A !== j && $(A), A
            }), B.current = null
        }))
    }, e[31] = l, e[32] = $, e[33] = r, e[34] = ae) : ae = e[34];
    const O = ae;
    let J, ee;
    e[35] === Symbol.for("react.memo_cache_sentinel") ? (J = () => () => {
        B.current != null && cancelAnimationFrame(B.current)
    }, ee = [], e[35] = J, e[36] = ee) : (J = e[35], ee = e[36]), w.useEffect(J, ee);
    let Y;
    e[37] !== t || e[38] !== O || e[39] !== l || e[40] !== $ || e[41] !== r ? (Y = h => {
        if (t !== "vertical") return;
        const j = h.key === "ArrowUp" || h.key === "ArrowLeft" ? -1 : h.key === "ArrowDown" || h.key === "ArrowRight" ? 1 : 0;
        j && ((h.key === "ArrowLeft" || h.key === "ArrowRight") && Gt(h.target) || (h.repeat ? O(j) : r(A => {
            const M = ye(A + j, 0, l - 1);
            return $(M, !0), M
        }), h.preventDefault()))
    }, e[37] = t, e[38] = O, e[39] = l, e[40] = $, e[41] = r, e[42] = Y) : Y = e[42];
    const U = Y;
    let te, ne;
    e[43] !== t || e[44] !== U ? (te = () => {
        if (t === "vertical") return document.addEventListener("keydown", U), () => document.removeEventListener("keydown", U)
    }, ne = [t, U], e[43] = t, e[44] = U, e[45] = te, e[46] = ne) : (te = e[45], ne = e[46]), w.useEffect(te, ne);
    let K, ie;
    e[47] !== t || e[48] !== y || e[49] !== p ? (K = () => {
        if (!p ? .current || t !== "vertical") return;
        const h = p.current,
            j = v.current;
        if (!j) return;
        const A = M => {
            M.preventDefault();
            let N = j.scrollTop + M.deltaY;
            const X = j.scrollTop <= 0 && M.deltaY < 0,
                Z = j.scrollTop >= y && M.deltaY > 0;
            (X || Z) && (N = j.scrollTop + M.deltaY * .2), N = ye(N, 0, y), N !== j.scrollTop && (j.scrollTop = N)
        };
        return h.addEventListener("wheel", A, {
            passive: !1
        }), () => h.removeEventListener("wheel", A)
    }, ie = [t, p, y], e[47] = t, e[48] = y, e[49] = p, e[50] = K, e[51] = ie) : (K = e[50], ie = e[51]), w.useEffect(K, ie);
    let q, Q;
    e[52] !== a || e[53] !== f || e[54] !== l || e[55] !== r ? (q = () => {
        if (!a ? .current) return;
        const h = a.current,
            j = () => {
                if (h.clientWidth === 0) return;
                const A = Math.round(h.scrollLeft / h.clientWidth);
                if (!(A < 0 || A >= l)) {
                    if (f ? .current != null) {
                        const M = f.current;
                        if (!Ae({
                                currentOffset: h.scrollLeft,
                                itemSize: h.clientWidth,
                                nextIndex: A,
                                targetIndex: M
                            })) return;
                        f.current = null
                    }
                    r(M => M === A ? M : A)
                }
            };
        return h.addEventListener("scroll", j, {
            passive: !0
        }), () => {
            h.removeEventListener("scroll", j)
        }
    }, Q = [a, f, l, r], e[52] = a, e[53] = f, e[54] = l, e[55] = r, e[56] = q, e[57] = Q) : (q = e[56], Q = e[57]), w.useEffect(q, Q);
    let H;
    return e[58] !== T || e[59] !== g || e[60] !== $ ? (H = {
        railRef: v,
        railHeight: g,
        indexMv: T,
        scrollToIndex: $
    }, e[58] = T, e[59] = g, e[60] = $, e[61] = H) : H = e[61], H
}
const Be = w.memo(function(e) {
        "use forget";
        const t = G.c(31),
            {
                media: n,
                index: i,
                setIndex: l,
                wheelHostRef: o
            } = e;
        let r;
        t[0] !== i || t[1] !== n.length || t[2] !== l || t[3] !== o ? (r = {
            axis: "vertical",
            itemSize: 46,
            gap: 8,
            mediaLen: n.length,
            index: i,
            setIndex: l,
            wheelHostRef: o
        }, t[0] = i, t[1] = n.length, t[2] = l, t[3] = o, t[4] = r) : r = t[4];
        const {
            railRef: a,
            railHeight: f,
            indexMv: p,
            scrollToIndex: v
        } = et(r);
        let g;
        t[5] !== v || t[6] !== l ? (g = R => {
            l(R), v(R)
        }, t[5] = v, t[6] = l, t[7] = g) : g = t[7];
        const S = g;
        let d;
        if (t[8] !== S || t[9] !== n) {
            let R;
            t[11] !== S ? (R = (m, P) => () => S(P), t[11] = S, t[12] = R) : R = t[12], d = n.map(R), t[8] = S, t[9] = n, t[10] = d
        } else d = t[10];
        const y = d;
        let x;
        t[13] !== f ? (x = {
            height: f,
            contain: "layout size style",
            maskImage: $e,
            WebkitMaskImage: $e,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat"
        }, t[13] = f, t[14] = x) : x = t[14];
        let u;
        t[15] === Symbol.for("react.memo_cache_sentinel") ? (u = s.jsx("div", {
            style: {
                height: "calc(50% - 23px)"
            }
        }), t[15] = u) : u = t[15];
        let b;
        if (t[16] !== y || t[17] !== i || t[18] !== p || t[19] !== n) {
            let R;
            t[21] !== y || t[22] !== i || t[23] !== p || t[24] !== n.length ? (R = (m, P) => s.jsx(Je, {
                media: m,
                size: 46,
                active: P === i,
                onClick: y[P],
                axis: "vertical",
                index: P,
                indexMv: p,
                total: n.length
            }, `${Me(m)}-${P}`), t[21] = y, t[22] = i, t[23] = p, t[24] = n.length, t[25] = R) : R = t[25], b = n.map(R), t[16] = y, t[17] = i, t[18] = p, t[19] = n, t[20] = b
        } else b = t[20];
        let L;
        t[26] === Symbol.for("react.memo_cache_sentinel") ? (L = s.jsx("div", {
            style: {
                height: "calc(50% - 23px)"
            }
        }), t[26] = L) : L = t[26];
        let k;
        return t[27] !== a || t[28] !== x || t[29] !== b ? (k = s.jsx("div", {
            className: "relative mt-4 w-24 self-start",
            children: s.jsxs(Ne.div, {
                ref: a,
                style: x,
                className: "no-scrollbar overflow-y-scroll",
                children: [u, b, L]
            })
        }), t[27] = a, t[28] = x, t[29] = b, t[30] = k) : k = t[30], k
    }),
    Yt = w.memo(function(e) {
        "use forget";
        const t = G.c(35),
            {
                media: n,
                index: i,
                setIndex: l,
                carouselRef: o,
                externalSyncTargetIndexRef: r
            } = e,
            a = w.useRef(!1);
        let f;
        t[0] !== o || t[1] !== r || t[2] !== i || t[3] !== n.length || t[4] !== l ? (f = {
            axis: "horizontal",
            itemSize: 32,
            gap: 6,
            mediaLen: n.length,
            index: i,
            setIndex: l,
            externalSyncRef: o,
            externalSyncTargetIndexRef: r
        }, t[0] = o, t[1] = r, t[2] = i, t[3] = n.length, t[4] = l, t[5] = f) : f = t[5];
        const {
            railRef: p,
            indexMv: v,
            scrollToIndex: g
        } = et(f);
        let S, d;
        t[6] !== i || t[7] !== g ? (S = () => {
            if (g(i), a.current) return;
            a.current = !0;
            const T = requestAnimationFrame(() => {
                g(i)
            });
            return () => {
                cancelAnimationFrame(T)
            }
        }, d = [i, g], t[6] = i, t[7] = g, t[8] = S, t[9] = d) : (S = t[8], d = t[9]), _e(S, d);
        let y;
        t[10] !== o || t[11] !== r || t[12] !== l ? (y = T => {
            if (!o.current) return;
            l(T), r.current = T;
            const _ = o.current.clientWidth * T;
            if (typeof o.current.scrollTo == "function") {
                o.current.scrollTo({
                    left: _,
                    behavior: "smooth"
                });
                return
            }
            o.current.scrollLeft = _
        }, t[10] = o, t[11] = r, t[12] = l, t[13] = y) : y = t[13];
        const x = y;
        let u;
        if (t[14] !== x || t[15] !== n) {
            let T;
            t[17] !== x ? (T = (_, C) => () => x(C), t[17] = x, t[18] = T) : T = t[18], u = n.map(T), t[14] = x, t[15] = n, t[16] = u
        } else u = t[16];
        const b = u;
        let L, k;
        t[19] === Symbol.for("react.memo_cache_sentinel") ? (L = {
            contain: "layout size style",
            contentVisibility: "auto",
            maskImage: Fe,
            WebkitMaskImage: Fe,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat"
        }, k = s.jsx("div", {
            style: {
                width: "max(calc(50% - 16px), 0px)",
                flexShrink: 0
            }
        }), t[19] = L, t[20] = k) : (L = t[19], k = t[20]);
        let R;
        if (t[21] !== b || t[22] !== i || t[23] !== v || t[24] !== n) {
            let T;
            t[26] !== b || t[27] !== i || t[28] !== v || t[29] !== n.length ? (T = (_, C) => s.jsx(Je, {
                media: _,
                size: 32,
                active: C === i,
                onClick: b[C],
                axis: "horizontal",
                index: C,
                indexMv: v,
                total: n.length
            }, `${Me(_)}-${C}`), t[26] = b, t[27] = i, t[28] = v, t[29] = n.length, t[30] = T) : T = t[30], R = n.map(T), t[21] = b, t[22] = i, t[23] = v, t[24] = n, t[25] = R
        } else R = t[25];
        let m;
        t[31] === Symbol.for("react.memo_cache_sentinel") ? (m = s.jsx("div", {
            style: {
                width: "max(calc(50% - 16px), 0px)",
                flexShrink: 0
            }
        }), t[31] = m) : m = t[31];
        let P;
        return t[32] !== p || t[33] !== R ? (P = s.jsx("div", {
            className: "relative flex min-h-[48px] w-full overflow-hidden",
            children: s.jsxs(Ne.div, {
                ref: p,
                className: "no-scrollbar flex flex-1 gap-1.5 overflow-x-auto px-4 py-2",
                style: L,
                children: [k, R, m]
            })
        }), t[32] = p, t[33] = R, t[34] = P) : P = t[34], P
    }),
    Ut = 400,
    ke = w.createContext({
        activeMedia: void 0,
        index: 0,
        headerVariant: "legacy"
    });

function Ke(c) {
    "use forget";
    const e = G.c(10),
        {
            media: t,
            presentation: n,
            isActiveSlide: i
        } = c,
        l = i === void 0 ? !1 : i;
    if (Le(t)) {
        let v;
        return e[0] !== l || e[1] !== t || e[2] !== n ? (v = s.jsx(Ft, {
            media: t,
            presentation: n,
            isActiveSlide: l
        }), e[0] = l, e[1] = t, e[2] = n, e[3] = v) : v = e[3], v
    }
    const o = t.title ? ? "",
        r = n === "desktop" ? "border-token-border-light shadow-elevation-03 block max-h-full max-w-full rounded-none border object-contain" : "border-token-border-light shadow-elevation-03 max-h-full max-w-full rounded-none border object-contain",
        a = n === "desktop" || l ? "high" : "auto",
        f = n === "desktop" || l ? "eager" : "lazy";
    let p;
    return e[4] !== t.url || e[5] !== o || e[6] !== r || e[7] !== a || e[8] !== f ? (p = s.jsx("img", {
        src: t.url,
        alt: o,
        className: r,
        fetchPriority: a,
        loading: f,
        decoding: "async"
    }), e[4] = t.url, e[5] = o, e[6] = r, e[7] = a, e[8] = f, e[9] = p) : p = e[9], p
}

function qt(c) {
    "use forget";
    const e = G.c(71),
        {
            media: t,
            initialIndex: n,
            onClose: i,
            onIndexChange: l,
            children: o,
            inpaintingProps: r,
            fullscreenShellEnabled: a,
            translucentBackground: f,
            closeOnPointerDownInside: p,
            source: v
        } = c,
        g = n === void 0 ? 0 : n,
        S = a === void 0 ? !1 : a,
        d = f === void 0 ? !1 : f,
        y = p === void 0 ? !1 : p,
        x = v === void 0 ? pt.CHATGPT_IMAGE_LIGHTBOX_SOURCE_TYPE_UNSPECIFIED : v,
        [u, b] = w.useState(g),
        [L, k] = w.useState(nn),
        R = w.useRef(null),
        m = t[u];
    let P, T;
    e[0] !== u || e[1] !== l ? (P = () => {
        l ? .(u)
    }, T = [u, l], e[0] = u, e[1] = l, e[2] = P, e[3] = T) : (P = e[2], T = e[3]), w.useEffect(P, T);
    const _ = Ce(),
        C = vt() === !1,
        V = w.useRef(null);
    let W;
    e[4] !== o ? (W = Tt(o, {
        footerSlot: nt,
        headerActionsSlot: lt
    }), e[4] = o, e[5] = W) : W = e[5];
    const {
        footerSlot: D,
        headerActionsSlot: z
    } = W, F = w.useRef(null), $ = w.useRef(null), B = t.length > 1, ae = yt("1873790768").get("lightbox_revamp_enabled", !1), O = S && ae ? C ? "fullscreen" : "stage" : null, J = O ? "revamp" : "legacy";
    let ee;
    e[6] !== i ? (ee = I => {
        I.key === "Escape" && (i(), I.preventDefault())
    }, e[6] = i, e[7] = ee) : ee = e[7];
    const Y = ee;
    let U;
    e[8] !== m || e[9] !== x ? (U = () => {
        m && wt.logStructuredEvent(St, {
            metadata: {
                sessionId: Rt(),
                generationId: Se(m) ? m.transformationId ? ? void 0 : m.generationId,
                fileId: Se(m) ? m.assetPointer ? ? m.id ? ? void 0 : m.id,
                conversationId: m.conversationId ? ? void 0,
                messageId: Se(m) ? m.messageId ? ? void 0 : m.sourceMessageId
            },
            source: x
        })
    }, e[8] = m, e[9] = x, e[10] = U) : U = e[10], Et(U);
    let te, ne;
    e[11] !== O || e[12] !== Y ? (te = () => {
        if (O == null) return document.addEventListener("keydown", Y), () => {
            document.removeEventListener("keydown", Y)
        }
    }, ne = [O, Y], e[11] = O, e[12] = Y, e[13] = te, e[14] = ne) : (te = e[13], ne = e[14]), w.useEffect(te, ne);
    let K;
    e[15] !== g || e[16] !== C ? (K = I => {
        if (V.current = I, !C || !I || g <= 0) return;
        const pe = () => {
            if (V.current !== I || I.clientWidth === 0) return;
            const ve = I.clientWidth * g,
                re = I.style.scrollBehavior;
            I.style.scrollBehavior = "auto", I.scrollLeft = ve, re ? I.style.scrollBehavior = re : I.style.removeProperty("scroll-behavior")
        };
        pe(), requestAnimationFrame(pe)
    }, e[15] = g, e[16] = C, e[17] = K) : K = e[17];
    const ie = K;
    let q, Q;
    e[18] !== C || e[19] !== t.length ? (q = () => {
        if (!C || !V.current) return;
        const I = V.current,
            pe = () => {
                if (I.clientWidth === 0) return;
                const ve = Math.round(I.scrollLeft / I.clientWidth);
                if (!(ve < 0 || ve >= t.length)) {
                    if (R.current != null) {
                        const re = R.current;
                        if (!Ae({
                                currentOffset: I.scrollLeft,
                                itemSize: I.clientWidth,
                                nextIndex: ve,
                                targetIndex: re
                            })) return;
                        R.current = null
                    }
                    b(re => re === ve ? re : ve)
                }
            };
        return I.addEventListener("scroll", pe, {
            passive: !0
        }), () => {
            I.removeEventListener("scroll", pe)
        }
    }, Q = [C, t.length], e[18] = C, e[19] = t.length, e[20] = q, e[21] = Q) : (q = e[20], Q = e[21]), w.useEffect(q, Q);
    const H = r ? .mode === "inpaint";
    let h;
    e[22] !== _ ? (h = _.formatMessage({
        id: "Xs2Rno",
        defaultMessage: "Edit selection"
    }), e[22] = _, e[23] = h) : h = e[23];
    const j = h,
        A = C && L < Ut,
        M = B && !H && !A,
        N = H ? j : m ? .title ? ? null;
    let X;
    e[24] !== _ || e[25] !== N ? (X = N ? ? _.formatMessage({
        id: "QvVWgJ",
        defaultMessage: "Media viewer"
    }), e[24] = _, e[25] = N, e[26] = X) : X = e[26];
    const Z = X;
    let ce;
    e[27] !== H || e[28] !== C || e[29] !== i ? (ce = I => {
        H || I.button !== 0 || C || i()
    }, e[27] = H, e[28] = C, e[29] = i, e[30] = ce) : ce = e[30];
    const de = ce;
    let ue, fe;
    e[31] === Symbol.for("react.memo_cache_sentinel") ? (ue = () => {
        if (typeof window > "u") return;
        const I = () => {
            k(window.innerHeight)
        };
        return window.addEventListener("resize", I), () => {
            window.removeEventListener("resize", I)
        }
    }, fe = [], e[31] = ue, e[32] = fe) : (ue = e[31], fe = e[32]), w.useEffect(ue, fe);
    const we = O != null && "dark:bg-token-bg-primary bg-[#FAFAFA]";
    let le;
    e[33] !== we ? (le = xe("h-full min-h-0", we), e[33] = we, e[34] = le) : le = e[34];
    const be = O != null && y ? de : void 0;
    let me;
    e[35] !== m || e[36] !== D || e[37] !== O || e[38] !== B || e[39] !== H || e[40] !== u || e[41] !== r || e[42] !== C || e[43] !== t || e[44] !== ie || e[45] !== M ? (me = C ? s.jsxs("div", {
        className: "grid h-full min-h-0 w-full grid-rows-[minmax(0,1fr)_auto] overflow-hidden",
        children: [s.jsx("ol", {
            ref: ie,
            "data-testid": "lightbox-mobile-carousel",
            className: xe("no-scrollbar flex h-full snap-x snap-mandatory scroll-smooth", H ? "overflow-hidden" : "overflow-x-auto"),
            children: t.map((I, pe) => {
                const ve = `${Me(I)}-${pe}`,
                    re = H && r != null && Se(I) && pe === u ? {
                        image: I,
                        drawingState: r.drawingState,
                        drawingCanvasRef: r.drawingCanvasRef
                    } : null;
                return s.jsx("li", {
                    "data-position": pe,
                    className: "flex h-full w-full flex-shrink-0 snap-start snap-always items-center justify-center px-4",
                    children: re ? s.jsx(Ht, {
                        image: re.image,
                        drawingState: re.drawingState,
                        drawingCanvasRef: re.drawingCanvasRef
                    }) : s.jsx(Ke, {
                        media: I,
                        presentation: "mobile",
                        isActiveSlide: pe === u
                    })
                }, ve)
            })
        }), s.jsxs("div", {
            className: "no-scrollbar flex flex-col gap-2 overflow-hidden py-4",
            children: [M && s.jsx(Yt, {
                media: t,
                index: u,
                setIndex: b,
                carouselRef: V,
                externalSyncTargetIndexRef: R
            }), s.jsx("div", {
                className: "px-4",
                children: D
            })]
        })]
    }) : s.jsxs("div", {
        ref: $,
        className: xe("grid h-full w-full items-center overflow-y-auto overscroll-contain", O != null ? "grid-cols-[auto_1fr]" : "grid-cols-[1fr_auto]"),
        children: [O != null && (!H && B ? s.jsx("div", {
            onPointerDown: tn,
            children: s.jsx(Be, {
                media: t,
                index: u,
                setIndex: b,
                wheelHostRef: $
            })
        }) : s.jsx("div", {
            className: "h-full w-24"
        })), s.jsxs("div", {
            className: "grid h-full min-h-0 w-full grid-rows-[minmax(0,1fr)_auto] justify-items-center px-4 pb-9",
            children: [m && s.jsx("div", {
                onPointerDown: en,
                className: "relative my-9 flex items-center justify-center rounded bg-neutral-100",
                children: H && Se(m) ? s.jsx(Ze, {
                    image: m,
                    drawingState: r.drawingState,
                    drawingCanvasRef: r.drawingCanvasRef,
                    imageClassName: "border-token-border-light shadow-elevation-03 block max-h-full max-w-full rounded-none border object-contain"
                }) : s.jsx(Ke, {
                    media: m,
                    presentation: "desktop",
                    isActiveSlide: !0
                })
            }, Me(m)), s.jsx("div", {
                className: "flex w-full justify-center",
                onPointerDown: Jt,
                children: D
            })]
        }), O == null && (!H && B ? s.jsx("div", {
            onPointerDown: Zt,
            children: s.jsx(Be, {
                media: t,
                index: u,
                setIndex: b,
                wheelHostRef: $
            })
        }) : s.jsx("div", {
            className: "h-full w-24"
        }))]
    }), e[35] = m, e[36] = D, e[37] = O, e[38] = B, e[39] = H, e[40] = u, e[41] = r, e[42] = C, e[43] = t, e[44] = ie, e[45] = M, e[46] = me) : me = e[46];
    let he;
    e[47] !== le || e[48] !== be || e[49] !== me ? (he = s.jsx("div", {
        className: le,
        "data-testid": "lightbox-new-body-surface",
        onPointerDown: be,
        children: me
    }), e[47] = le, e[48] = be, e[49] = me, e[50] = he) : he = e[50];
    const oe = he;
    let se;
    e[51] !== m || e[52] !== J || e[53] !== u ? (se = {
        activeMedia: m,
        index: u,
        headerVariant: J
    }, e[51] = m, e[52] = J, e[53] = u, e[54] = se) : se = e[54];
    let ge;
    e[55] !== m || e[56] !== y || e[57] !== Z || e[58] !== O || e[59] !== de || e[60] !== z || e[61] !== H || e[62] !== _ || e[63] !== oe || e[64] !== i || e[65] !== d || e[66] !== N ? (ge = O === "stage" ? s.jsx(Pt, {
        open: !0,
        onOpenChange: I => {
            I || i()
        },
        title: N,
        accessibleTitle: N == null ? Z : null,
        headerContent: z,
        bodyClassName: "overflow-hidden",
        contentRef: F,
        children: oe
    }) : O === "fullscreen" ? s.jsx(Qe, {
        open: !0,
        onOpenChange: I => {
            I || i()
        },
        title: N,
        accessibleTitle: N == null ? Z : null,
        headerContent: z,
        bodyClassName: "overflow-hidden",
        contentRef: F,
        children: oe
    }) : s.jsx(Te.Root, {
        isOpen: !0,
        onClose: i,
        testId: "modal-lightbox-new",
        shouldIgnoreClickOutside: H,
        children: s.jsx(Te.Overlay, {
            children: s.jsxs(Te.Content, {
                size: "fullscreen",
                removePopoverStyling: !0,
                removeBackground: d,
                className: xe("grid min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden", d && "bg-token-bg-primary/50 dark:bg-token-bg-primary/75 starting:backdrop-blur-0 backdrop-blur-lg ease-out motion-safe:transition-[filter,background-color] starting:opacity-0"),
                onPointerDownInside: y ? de : void 0,
                children: [s.jsx(Te.Header, {
                    title: Z,
                    visuallyHiddenHeader: !0
                }), s.jsx("div", {
                    onPointerDown: Qt,
                    children: s.jsxs(tt, {
                        children: [s.jsxs("div", {
                            className: "grid w-full grid-cols-[auto_1fr] items-start justify-between gap-1 md:gap-2",
                            children: [s.jsx(Ue, {
                                icon: Ge,
                                onClick: i,
                                "aria-label": _.formatMessage({
                                    id: "EYLKSm",
                                    defaultMessage: "Close"
                                })
                            }), N && s.jsx("h2", {
                                className: xe("line-clamp-1 self-center text-base font-medium", !Le(m) && "md:line-clamp-none"),
                                children: N
                            })]
                        }), z]
                    })
                }), oe]
            })
        })
    }), e[55] = m, e[56] = y, e[57] = Z, e[58] = O, e[59] = de, e[60] = z, e[61] = H, e[62] = _, e[63] = oe, e[64] = i, e[65] = d, e[66] = N, e[67] = ge) : ge = e[67];
    let E;
    return e[68] !== se || e[69] !== ge ? (E = s.jsx(ke.Provider, {
        value: se,
        children: ge
    }), e[68] = se, e[69] = ge, e[70] = E) : E = e[70], E
}

function Qt(c) {
    return c.stopPropagation()
}

function Zt(c) {
    return c.stopPropagation()
}

function Jt(c) {
    return c.stopPropagation()
}

function en(c) {
    return c.stopPropagation()
}

function tn(c) {
    return c.stopPropagation()
}

function nn() {
    return typeof window > "u" ? 640 : window.innerHeight
}

function tt(c) {
    "use forget";
    const e = G.c(2),
        {
            children: t
        } = c;
    let n;
    return e[0] !== t ? (n = s.jsx("header", {
        className: "grid w-full grid-cols-[auto_1fr] gap-1 p-2",
        children: t
    }), e[0] = t, e[1] = n) : n = e[1], n
}

function nt(c) {
    "use forget";
    const e = G.c(5),
        {
            children: t
        } = c,
        {
            activeMedia: n
        } = w.useContext(ke);
    let i;
    e[0] !== n || e[1] !== t ? (i = typeof t == "function" ? t({
        activeMedia: n
    }) : t, e[0] = n, e[1] = t, e[2] = i) : i = e[2];
    const l = i;
    let o;
    return e[3] !== l ? (o = s.jsx("footer", {
        className: "pointer-events-auto w-full max-w-[768px]",
        children: l
    }), e[3] = l, e[4] = o) : o = e[4], o
}

function lt(c) {
    "use forget";
    const e = G.c(6),
        {
            children: t
        } = c,
        {
            activeMedia: n,
            headerVariant: i
        } = w.useContext(ke);
    let l;
    if (e[0] !== n || e[1] !== t || e[2] !== i) {
        const r = typeof t == "function" ? t({
            activeMedia: n,
            headerVariant: i
        }) : t;
        l = [], w.Children.forEach(r, a => {
            w.isValidElement(a) && l.push(a)
        }), e[0] = n, e[1] = t, e[2] = i, e[3] = l
    } else l = e[3];
    let o;
    return e[4] !== l ? (o = s.jsx("div", {
        className: "flex items-baseline justify-end gap-2",
        children: l.map(ln)
    }), e[4] = l, e[5] = o) : o = e[5], o
}

function ln(c, e) {
    return s.jsx(w.Fragment, {
        children: c
    }, e)
}
const xn = {
    Root: qt,
    Header: tt,
    Footer: nt,
    LightboxHeaderActions: lt,
    Context: ke
};
export {
    nt as Footer, tt as Header, lt as LightboxHeaderActions, xn as LightboxNew, qt as Root
};
//# sourceMappingURL=1f30e218-lhaiclj6u6v5ivxw.js.map