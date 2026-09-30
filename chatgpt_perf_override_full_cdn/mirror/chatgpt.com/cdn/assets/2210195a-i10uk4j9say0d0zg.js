import {
    j as i,
    u as ot,
    c as rt,
    r as u
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    D as lt,
    L as ct
} from "./ecab41d6-fnij669o94ytz9r7.js";
import {
    b5 as J,
    af as Me,
    b2 as dt,
    D as ut
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    qk as mt
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    C as ft
} from "./af004db9-d3svat17gfrlvrrt.js";
import {
    D as gt
} from "./ee5ab530-kzkl2ajiknxobp5p.js";
const ht = ({
        children: l,
        isDimensionsUnknown: e,
        className: c
    }) => i.jsxs(J.div, {
        className: Me(["relative max-w-[480px] rounded-2xl", e && "aspect-square overflow-hidden", c]),
        children: [i.jsx("div", {
            className: "bg-token-main-surface-secondary pointer-events-none absolute inset-0"
        }), i.jsx("div", {
            className: "relative h-full",
            children: l
        })]
    }),
    Ct = ({
        children: l,
        isDimensionsUnknown: e,
        width: c,
        height: s
    }) => i.jsxs(J.div, {
        layout: !0,
        transition: {
            duration: .3,
            ease: "easeInOut"
        },
        exit: {
            opacity: 0,
            transition: {
                duration: .1,
                ease: "easeInOut"
            }
        },
        className: Me(["relative max-w-[480px] overflow-hidden rounded-2xl", e && "aspect-square"]),
        style: {
            width: c ? ? "auto",
            height: s ? ? "auto"
        },
        children: [i.jsx("div", {
            className: "bg-token-main-surface-secondary pointer-events-none absolute inset-0"
        }), i.jsx("div", {
            className: "relative h-full",
            children: l
        })]
    });

function Ke({
    withLottie: l
}) {
    const c = ot().formatMessage({
        id: "imagegen.progressIndicator.ariaLabel",
        defaultMessage: "Generating image..."
    });
    return i.jsx("div", {
        className: "absolute inset-s-0 top-0 flex h-full w-full items-center justify-center rounded-full",
        children: i.jsx(ft, {
            size: 40,
            arcPercentage: .2,
            ariaMessage: c,
            children: i.jsx(gt, {
                animate: l,
                matchTextColor: !0,
                className: "h-6 w-6"
            })
        })
    })
}
const Lt = Object.freeze(Object.defineProperty({
        __proto__: null,
        ProgressIndicator: Ke
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    $e = 300,
    pt = 1.3,
    qe = .05,
    vt = /blur\(([\d.]+)px\)/,
    St = {
        duration: $e / 1e3,
        ease: "linear"
    };

function De(l, e, c) {
    const s = new Array(l.length).fill(0);
    for (let _ = 0; _ <= l.length; _ += 1) {
        const K = _ - 1,
            o = _,
            v = l[K] ? .availablePercentComplete ? ? 0,
            y = l[o] ? .availablePercentComplete ? ? 1;
        if (e >= v && e <= y && v !== y) {
            const m = (e - v) / (y - v);
            s[K] = 1 - m, s[o] = m
        }
    }
    const a = s[s.length - 1],
        p = s[s.length - 2];
    return a === 1 && p === 0 && (s[s.length - 2] = .01), c && e <= l[0] ? .availablePercentComplete && (s[0] = 1), s
}
const At = l => {
    "use forget";
    const e = rt.c(125),
        {
            alt: c,
            src: s,
            availablePercentComplete: a,
            onAnimationUpdate: p,
            ignoreFirstChunk: _,
            isTransparent: K,
            dimensions: o,
            onError: v,
            unconstrainedWidth: y,
            progressLoaderProps: m,
            datadogImageContext: Se,
            isWrappedByInteractiveSurface: ze,
            semanticImageId: Q
        } = l,
        f = _ === void 0 ? !1 : _,
        Z = K === void 0 ? !1 : K,
        Ve = y === void 0 ? !1 : y,
        g = ze === void 0 ? !1 : ze,
        xe = `url(${dt()?lt:ct})`,
        [$, Xe] = u.useState(!1),
        Oe = mt(),
        we = Oe ? "lazy" : void 0,
        be = Oe ? "async" : void 0,
        [Ye, Je] = u.useState(1e3),
        [V, Fe] = u.useState(a ? ? 0),
        [R, Qe] = u.useState(a === 1 ? 1 : 0),
        Be = u.useRef(0),
        Ge = u.useRef(0);
    let ee;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (ee = [], e[0] = ee) : ee = e[0];
    const T = u.useRef(ee);
    let te;
    e[1] === Symbol.for("react.memo_cache_sentinel") ? (te = [], e[1] = te) : te = e[1];
    const [N, Ze] = u.useState(te);
    let ae;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (ae = {}, e[2] = ae) : ae = e[2];
    const se = u.useRef(ae);
    let ne;
    e[3] === Symbol.for("react.memo_cache_sentinel") ? (ne = new Set, e[3] = ne) : ne = e[3];
    const Ue = u.useRef(ne);
    let ie;
    e[4] === Symbol.for("react.memo_cache_sentinel") ? (ie = [0], e[4] = ie) : ie = e[4];
    const [S, _e] = u.useState(ie), [et, tt] = u.useState(a === 1), Re = u.useRef(!1), [at, st] = u.useState(!1), He = u.useRef(null), I = V === 1, r = a === 1 && et, d = o ? o.width / o.height : 1;
    let oe, re;
    e[5] !== a || e[6] !== $ ? (oe = () => {
        !$ && a && (u.startTransition(() => {
            Xe(!0)
        }), Ge.current = performance.now())
    }, re = [$, a], e[5] = a, e[6] = $, e[7] = oe, e[8] = re) : (oe = e[7], re = e[8]), u.useEffect(oe, re);
    let le, ce;
    e[9] !== a || e[10] !== V || e[11] !== f || e[12] !== s ? (le = () => {
        const n = T.current[T.current.length - 1] ? .src;
        if (s && s !== n) {
            const t = [...T.current],
                x = t.findIndex(w => w.availablePercentComplete === a);
            x !== -1 ? t[x] = {
                src: s,
                availablePercentComplete: a ? ? 0,
                lastSrcReceivedTime: performance.now()
            } : t.push({
                src: s,
                availablePercentComplete: a ? ? 0,
                lastSrcReceivedTime: performance.now()
            }), t.sort(xt), T.current = t, Ze(t), se.current[s] == null && (se.current[s] = performance.now()), _e(De(t, V, f))
        }
    }, ce = [s, V, f, a], e[9] = a, e[10] = V, e[11] = f, e[12] = s, e[13] = le, e[14] = ce) : (le = e[13], ce = e[14]), u.useEffect(le, ce);
    let de;
    e[15] !== Se ? (de = n => {
        const {
            requestedSrc: t,
            actualSrc: x,
            isFinalChunk: w
        } = n;
        if (Ue.current.has(t)) return;
        Ue.current.add(t);
        const b = se.current[t] ? ? se.current[x],
            h = b != null ? performance.now() - b : void 0,
            Ee = h == null,
            We = bt,
            Y = We(x) ? ? We(t);
        ut.addAction("image-gen-image-bytes-loaded", {
            load_ms: h,
            load_ms_missing: Ee,
            is_complete: w,
            resource_duration_ms: Y ? .duration,
            transfer_size: Y ? .transferSize,
            encoded_body_size: Y ? .encodedBodySize,
            decoded_body_size: Y ? .decodedBodySize,
            initiator_type: Y ? .initiatorType,
            ...Se
        })
    }, e[15] = Se, e[16] = de) : de = e[16];
    const X = de;
    let ue;
    e[17] !== a || e[18] !== r || e[19] !== f || e[20] !== m ? (ue = () => {
        if (He.current && a) {
            const n = Be.current || Ge.current;
            Je(r ? $e : (performance.now() - n) * pt), (!f || Re.current || a >= qe) && a !== 1 && Qe(a), Re.current || st(!0), Re.current = !0, Be.current = performance.now(), m ? .setHasImageReady(!0)
        }
    }, e[17] = a, e[18] = r, e[19] = f, e[20] = m, e[21] = ue) : ue = e[21];
    const Ie = ue;
    let me;
    e[22] !== f || e[23] !== p ? (me = n => {
        const t = parseFloat(n.height) / 100;
        p ? .(t), Fe(t), _e(De(T.current, parseFloat(n.height) / 100, f))
    }, e[22] = f, e[23] = p, e[24] = me) : me = e[24];
    const nt = me;
    let fe;
    e[25] !== f || e[26] !== p || e[27] !== R ? (fe = n => {
        const t = n.filter.toString().match(vt) ? .[1] ? ? "0",
            w = (16 - parseFloat(t)) / 16,
            b = 1 - R,
            h = R + b * w;
        p ? .(h), Fe(h), _e(De(T.current, h, f))
    }, e[25] = f, e[26] = p, e[27] = R, e[28] = fe) : fe = e[28];
    const it = fe,
        k = d >= 2 ? "max-w-(--thread-content-max-width)" : d >= 1 ? "max-w-[30rem]" : "max-w-[25rem]";
    if (!$) {
        let n;
        e[29] === Symbol.for("react.memo_cache_sentinel") ? (n = i.jsx(Ke, {
            withLottie: !0
        }), e[29] = n) : n = e[29];
        let t;
        return e[30] !== k ? (t = i.jsx(ht, {
            isDimensionsUnknown: !0,
            className: k,
            children: n
        }), e[30] = k, e[31] = t) : t = e[31], t
    }
    const ye = Ye / 1e3;
    let ge;
    e[32] !== ye ? (ge = {
        duration: ye,
        ease: "linear"
    }, e[32] = ye, e[33] = ge) : ge = e[33];
    const Te = ge,
        Ne = a !== 1 || !Z,
        he = !g || Q !== void 0,
        ke = !I && "pointer-events-none",
        Ce = !at && "bg-token-main-surface-secondary",
        Le = Ve && "max-w-full";
    let C;
    e[34] !== k || e[35] !== ke || e[36] !== Ce || e[37] !== Le ? (C = Me("relative z-0 cursor-pointer overflow-hidden", k, ke, Ce, Le), e[34] = k, e[35] = ke, e[36] = Ce, e[37] = Le, e[38] = C) : C = e[38];
    let L;
    e[39] !== d ? (L = {
        aspectRatio: d
    }, e[39] = d, e[40] = L) : L = e[40];
    let A;
    e[41] !== a || e[42] !== m ? .shouldHideDiagonalShimmer ? (A = !m ? .shouldHideDiagonalShimmer && a && a < qe && i.jsx("div", {
        className: "absolute inset-0 z-3 w-full overflow-hidden",
        children: i.jsx("div", {
            className: "absolute start-[-150%] top-[-150%] h-[400%] w-[400%]",
            children: i.jsx("div", {
                className: "diagonal-sweep-gradient h-full w-full"
            })
        })
    }), e[41] = a, e[42] = m ? .shouldHideDiagonalShimmer, e[43] = A) : A = e[43];
    let j;
    e[44] !== r ? (j = r ? !1 : {
        height: "0%"
    }, e[44] = r, e[45] = j) : j = e[45];
    let P;
    e[46] !== I || e[47] !== R ? (P = I ? {
        height: "100%"
    } : {
        height: `${R*100}%`
    }, e[46] = I, e[47] = R, e[48] = P) : P = e[48];
    const Ae = r ? void 0 : nt;
    let E;
    e[49] !== Te || e[50] !== r ? (E = r ? {
        duration: 0,
        ease: "linear"
    } : Te, e[49] = Te, e[50] = r, e[51] = E) : E = e[51];
    let D;
    e[52] !== I ? (D = I ? void 0 : {
        mask: "linear-gradient(rgb(0,0,0) 0%, rgb(0,0,0) calc(100% - 24px), rgba(0,0,0,0) 100%)"
    }, e[52] = I, e[53] = D) : D = e[53];
    let M;
    e[54] !== c || e[55] !== d || e[56] !== o ? .height || e[57] !== o ? .width || e[58] !== Ie || e[59] !== v || e[60] !== Q || e[61] !== he || e[62] !== s ? (M = s && i.jsx("img", {
        id: Q,
        ref: He,
        src: s,
        loading: we,
        decoding: be,
        width: o ? .width,
        height: o ? .height,
        onLoad: Ie,
        onError: v,
        alt: he ? c : "",
        "aria-hidden": he ? void 0 : !0,
        className: "absolute top-0 z-1 w-full",
        style: {
            aspectRatio: d
        }
    }), e[54] = c, e[55] = d, e[56] = o ? .height, e[57] = o ? .width, e[58] = Ie, e[59] = v, e[60] = Q, e[61] = he, e[62] = s, e[63] = M) : M = e[63];
    let z;
    e[64] !== xe || e[65] !== Z ? (z = Z && i.jsx("div", {
        className: "absolute inset-0 z-0 w-full overflow-hidden opacity-0 transition-opacity duration-300 group-focus-within/imagegen-image:opacity-100 group-hover/imagegen-image:opacity-100",
        children: i.jsx("div", {
            className: "absolute inset-0 bg-repeat",
            style: {
                backgroundImage: xe,
                backgroundSize: "auto"
            }
        })
    }), e[64] = xe, e[65] = Z, e[66] = z) : z = e[66];
    let O;
    e[67] !== j || e[68] !== P || e[69] !== Ae || e[70] !== E || e[71] !== D || e[72] !== M || e[73] !== z ? (O = i.jsxs(J.div, {
        className: "absolute start-0 end-0 top-0 z-2 w-full overflow-hidden transition-[mask] ease-linear",
        initial: j,
        animate: P,
        onUpdate: Ae,
        transition: E,
        style: D,
        children: [M, z]
    }), e[67] = j, e[68] = P, e[69] = Ae, e[70] = E, e[71] = D, e[72] = M, e[73] = z, e[74] = O) : O = e[74];
    let pe;
    e[75] === Symbol.for("react.memo_cache_sentinel") ? (pe = {
        filter: "blur(16px)"
    }, e[75] = pe) : pe = e[75];
    let F;
    e[76] !== r ? (F = r ? {
        filter: "blur(0px)"
    } : void 0, e[76] = r, e[77] = F) : F = e[77];
    const je = r ? St : void 0,
        Pe = r ? it : void 0;
    let B;
    e[78] !== d ? (B = {
        aspectRatio: d
    }, e[78] = d, e[79] = B) : B = e[79];
    let G;
    if (e[80] !== c || e[81] !== d || e[82] !== o ? .height || e[83] !== o ? .width || e[84] !== r || e[85] !== g || e[86] !== X || e[87] !== S || e[88] !== m ? .shouldShowPulseAnimation || e[89] !== N) {
        let n;
        e[91] !== c || e[92] !== d || e[93] !== o ? .height || e[94] !== o ? .width || e[95] !== r || e[96] !== g || e[97] !== X || e[98] !== S || e[99] !== m ? .shouldShowPulseAnimation ? (n = (t, x) => {
            const w = S[x],
                b = t.availablePercentComplete === 1;
            return w !== 0 || b ? i.jsx("img", {
                src: t.src,
                width: o ? .width,
                height: o ? .height,
                alt: g ? "" : c,
                "aria-hidden": g ? !0 : void 0,
                loading: we,
                decoding: be,
                style: {
                    opacity: w,
                    willChange: "opacity",
                    aspectRatio: d
                },
                className: !r && m ? .shouldShowPulseAnimation ? "bg-scale-pulse" : "",
                onLoad: h => {
                    const Ee = h.currentTarget.currentSrc || h.currentTarget.src;
                    X({
                        requestedSrc: t.src,
                        actualSrc: Ee,
                        isFinalChunk: b
                    }), b && tt(!0)
                }
            }, t.src) : null
        }, e[91] = c, e[92] = d, e[93] = o ? .height, e[94] = o ? .width, e[95] = r, e[96] = g, e[97] = X, e[98] = S, e[99] = m ? .shouldShowPulseAnimation, e[100] = n) : n = e[100], G = N.map(n), e[80] = c, e[81] = d, e[82] = o ? .height, e[83] = o ? .width, e[84] = r, e[85] = g, e[86] = X, e[87] = S, e[88] = m ? .shouldShowPulseAnimation, e[89] = N, e[90] = G
    } else G = e[90];
    let U;
    e[101] !== F || e[102] !== je || e[103] !== Pe || e[104] !== B || e[105] !== G ? (U = i.jsx(J.div, {
        className: "relative z-1 w-full overflow-hidden",
        initial: pe,
        animate: F,
        transition: je,
        onUpdate: Pe,
        style: B,
        children: G
    }), e[101] = F, e[102] = je, e[103] = Pe, e[104] = B, e[105] = G, e[106] = U) : U = e[106];
    let H;
    e[107] !== d ? (H = {
        aspectRatio: d
    }, e[107] = d, e[108] = H) : H = e[108];
    let W;
    e[109] !== c || e[110] !== Ne || e[111] !== g || e[112] !== S || e[113] !== N ? (W = Ne && N.filter((n, t) => S[t] !== 0).map(n => i.jsx("img", {
        loading: we,
        decoding: be,
        src: n.src,
        alt: g ? "" : c,
        "aria-hidden": g ? !0 : void 0,
        className: "absolute top-0 w-full"
    }, n.src)), e[109] = c, e[110] = Ne, e[111] = g, e[112] = S, e[113] = N, e[114] = W) : W = e[114];
    let q;
    e[115] !== H || e[116] !== W ? (q = i.jsx(J.div, {
        className: "absolute inset-0 z-0 scale-110 overflow-hidden blur-2xl",
        style: H,
        children: W
    }), e[115] = H, e[116] = W, e[117] = q) : q = e[117];
    let ve;
    return e[118] !== C || e[119] !== L || e[120] !== A || e[121] !== O || e[122] !== U || e[123] !== q ? (ve = i.jsxs("div", {
        className: C,
        style: L,
        children: [A, O, U, q]
    }), e[118] = C, e[119] = L, e[120] = A, e[121] = O, e[122] = U, e[123] = q, e[124] = ve) : ve = e[124], ve
};

function xt(l, e) {
    return l.lastSrcReceivedTime - e.lastSrcReceivedTime
}

function wt(l) {
    return l.entryType === "resource"
}

function bt(l) {
    return performance.getEntriesByName(l).filter(wt).slice(-1)[0]
}
export {
    Ct as A, ht as G, At as S, Lt as p
};
//# sourceMappingURL=2210195a-i10uk4j9say0d0zg.js.map