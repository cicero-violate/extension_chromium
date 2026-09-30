import {
    c as ye,
    r as n,
    u as Ce,
    j as o
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    sb as Ee,
    af as ve,
    mV as Pe,
    aw as Ne,
    h as Te,
    mc as Ie,
    q as be,
    cN as Le
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    dn as Me,
    bq as Ue,
    pW as Oe,
    nj as Ae,
    pX as Ve,
    ej as De,
    pY as Fe,
    pZ as Be,
    p_ as ze,
    p$ as We,
    q0 as qe,
    kO as ke
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    P as $e,
    c as He,
    u as Xe,
    a as Ge,
    f as Ke
} from "./aaa2d182-da7hz3gf5lvb4501.js";
import {
    I as Qe,
    P as Ye,
    a as Ze,
    b as Je,
    c as et
} from "./f4222f0c-ewt1xsvd3vb8cf7q.js";

function tt(t) {
    "use forget";
    const e = ye.c(58),
        {
            images: a,
            initialIndex: f,
            className: h,
            aspect: S,
            objectPosition: p,
            showDots: m,
            showArrows: y,
            imageClassName: g,
            allowLoop: x,
            onClick: _
        } = t,
        C = f === void 0 ? 0 : f,
        b = h === void 0 ? "" : h,
        I = S === void 0 ? "aspect-[16/9]" : S,
        w = p === void 0 ? "object-cover" : p,
        W = m === void 0 ? !0 : m,
        r = y === void 0 ? !0 : y,
        u = g === void 0 ? "" : g,
        R = x === void 0 ? !0 : x,
        [c, Z] = n.useState(C),
        [pe, me] = n.useState(!1),
        [he, ge] = n.useState(!1),
        oe = n.useRef(null),
        k = Ce();
    let q;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (q = {
        active: !1,
        startX: 0,
        lastX: 0,
        dx: 0,
        width: 1,
        lastTime: 0,
        velocity: 0,
        captured: !1,
        programmaticTargetIndex: null
    }, e[0] = q) : q = e[0];
    const A = n.useRef(q),
        U = a.length;
    let J;
    e[1] !== R || e[2] !== U ? (J = (l, d) => {
        const T = d === void 0 ? "smooth" : d,
            M = oe.current;
        if (!M) return;
        const E = R ? st(l, 0, U - 1) : we(l, 0, U - 1),
            se = A.current.width || M.clientWidth || 1;
        A.current.programmaticTargetIndex = E, M.scrollTo({
            left: E * se,
            behavior: T
        }), Z(E)
    }, e[1] = R, e[2] = U, e[3] = J) : J = e[3];
    const re = J;
    let ee, V;
    e[4] !== r ? (ee = () => {
        if (!r) return;
        ge(!0);
        const l = window.setTimeout(() => ge(!1), 2e3);
        return () => window.clearTimeout(l)
    }, V = [r], e[4] = r, e[5] = ee, e[6] = V) : (ee = e[5], V = e[6]), n.useEffect(ee, V);
    const $ = pe,
        ie = pe || he;
    let P;
    e[7] !== re ? (P = l => {
        re(l, "smooth")
    }, e[7] = re, e[8] = P) : P = e[8];
    const L = P;
    let ae;
    e[9] !== L || e[10] !== c ? (ae = () => L(c + 1), e[9] = L, e[10] = c, e[11] = ae) : ae = e[11];
    const fe = ae;
    let i;
    e[12] !== L || e[13] !== c ? (i = () => L(c - 1), e[12] = L, e[13] = c, e[14] = i) : i = e[14];
    const H = i;
    let le, v;
    e[15] === Symbol.for("react.memo_cache_sentinel") ? (le = () => {
        const l = oe.current;
        if (!l) return;
        const d = new ResizeObserver(T => {
            for (const M of T) A.current.width = M.contentRect.width || l.clientWidth || 1
        });
        return d.observe(l), A.current.width = l.clientWidth || 1, () => d.disconnect()
    }, v = [], e[15] = le, e[16] = v) : (le = e[15], v = e[16]), n.useEffect(le, v);
    let ce, X;
    e[17] !== c || e[18] !== U ? (ce = () => {
        const l = oe.current;
        if (!l) return;
        const d = () => {
            const T = A.current.width || l.clientWidth || 1,
                M = l.scrollLeft || 0,
                E = M / T,
                se = A.current.programmaticTargetIndex;
            if (se != null) {
                const xe = se * T;
                Math.abs(M - xe) <= 2 && (A.current.programmaticTargetIndex = null);
                return
            }
            let ne = c;
            E > c + .5 ? ne = we(c + 1, 0, U - 1) : E < c - .5 && (ne = we(c - 1, 0, U - 1)), ne !== c && Z(ne)
        };
        return l.addEventListener("scroll", d, {
            passive: !0
        }), () => l.removeEventListener("scroll", d)
    }, X = [U, c], e[17] = c, e[18] = U, e[19] = ce, e[20] = X) : (ce = e[19], X = e[20]), n.useEffect(ce, X);
    const ue = `select-none ${b} relative`;
    let te, D;
    e[21] === Symbol.for("react.memo_cache_sentinel") ? (te = () => me(!0), D = () => me(!1), e[21] = te, e[22] = D) : (te = e[21], D = e[22]);
    const G = `relative w-full ${I} overflow-clip`;
    let F;
    if (e[23] !== u || e[24] !== a || e[25] !== k || e[26] !== w || e[27] !== _) {
        let l;
        e[29] !== u || e[30] !== k || e[31] !== w || e[32] !== _ ? (l = (d, T) => o.jsx("div", {
            onClick: () => _ ? .(d, T),
            className: "relative h-full w-full shrink-0 grow-0 basis-full snap-center",
            children: d.content ? d.content : o.jsx("img", {
                src: d.src,
                alt: d.alt ? ? k.formatMessage({
                    id: "wHCsqa",
                    defaultMessage: "Slide {index}"
                }, {
                    index: T + 1
                }),
                className: `h-full w-full ${w} ${u}`
            })
        }, T), e[29] = u, e[30] = k, e[31] = w, e[32] = _, e[33] = l) : l = e[33], F = a.map(l), e[23] = u, e[24] = a, e[25] = k, e[26] = w, e[27] = _, e[28] = F
    } else F = e[28];
    let B;
    e[34] !== F ? (B = o.jsx("div", {
        ref: oe,
        className: "no-scrollbar flex h-full w-full touch-pan-x touch-pan-y snap-x snap-mandatory overflow-x-scroll scroll-smooth",
        children: F
    }), e[34] = F, e[35] = B) : B = e[35];
    let z;
    e[36] !== a.length || e[37] !== k || e[38] !== $ || e[39] !== fe || e[40] !== H || e[41] !== ie || e[42] !== r ? (z = r && a.length > 1 && o.jsxs(o.Fragment, {
        children: [o.jsx(Se, {
            ariaLabel: k.formatMessage({
                id: "l9pylv",
                defaultMessage: "Previous slide"
            }),
            onClick: H,
            side: "start",
            visible: $,
            children: o.jsx(Ee, {
                className: "icon-md"
            })
        }), o.jsx(Se, {
            ariaLabel: k.formatMessage({
                id: "L0pbQh",
                defaultMessage: "Next slide"
            }),
            onClick: fe,
            side: "end",
            visible: ie,
            children: o.jsx(Me, {
                className: "icon-md"
            })
        })]
    }), e[36] = a.length, e[37] = k, e[38] = $, e[39] = fe, e[40] = H, e[41] = ie, e[42] = r, e[43] = z) : z = e[43];
    let K;
    e[44] !== G || e[45] !== B || e[46] !== z ? (K = o.jsxs("div", {
        className: G,
        children: [B, z]
    }), e[44] = G, e[45] = B, e[46] = z, e[47] = K) : K = e[47];
    let Q;
    e[48] !== L || e[49] !== a || e[50] !== c || e[51] !== k || e[52] !== W ? (Q = W && a.length > 1 && a.length <= 20 && o.jsx("div", {
        className: "absolute start-0 end-0 bottom-3 flex items-center justify-center",
        children: o.jsx("div", {
            className: "flex w-fit items-center justify-center gap-2 rounded-full bg-[#0D0D0D66] bg-clip-padding p-1 backdrop-blur",
            children: a.map((l, d) => o.jsx("button", {
                onClick: () => L(d),
                "aria-label": k.formatMessage({
                    id: "PUV+4+",
                    defaultMessage: "Go to slide {index}"
                }, {
                    index: d + 1
                }),
                className: `h-1.5 w-1.5 rounded-full transition-opacity ${d===c?"bg-white":"bg-gray-400 opacity-60"}`
            }, d))
        })
    }), e[48] = L, e[49] = a, e[50] = c, e[51] = k, e[52] = W, e[53] = Q) : Q = e[53];
    let N;
    return e[54] !== ue || e[55] !== K || e[56] !== Q ? (N = o.jsxs("div", {
        className: ue,
        "aria-roledescription": "carousel",
        onMouseEnter: te,
        onMouseLeave: D,
        children: [K, Q]
    }), e[54] = ue, e[55] = K, e[56] = Q, e[57] = N) : N = e[57], N
}
const we = (t, e, a) => Math.min(Math.max(t, e), a),
    st = (t, e, a) => t > a ? e : t < e ? a : t;

function Se(t) {
    "use forget";
    const e = ye.c(8),
        {
            ariaLabel: a,
            onClick: f,
            side: h,
            visible: S,
            children: p
        } = t,
        m = h === "start" ? "start-3" : "end-3",
        y = S ? "opacity-90 pointer-events-auto" : "opacity-0 pointer-events-none";
    let g;
    e[0] !== m || e[1] !== y ? (g = ve("btn-secondary border-token-border-default active:bg-token-bg-tertiary hover:bg-token-bg-primary absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-clip-padding backdrop-blur transition-opacity duration-300 hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.05)] active:opacity-100!", y, m), e[0] = m, e[1] = y, e[2] = g) : g = e[2];
    let x;
    return e[3] !== a || e[4] !== p || e[5] !== f || e[6] !== g ? (x = o.jsx("button", {
        "aria-label": a,
        onClick: f,
        className: g,
        children: p
    }), e[3] = a, e[4] = p, e[5] = f, e[6] = g, e[7] = x) : x = e[7], x
}

function nt(t) {
    "use forget";
    const e = ye.c(16),
        {
            isModal: a,
            product: f,
            conversation: h,
            messageId: S,
            contentReferenceStartIndex: p,
            turnIndex: m,
            productIndex: y
        } = t,
        g = Ce();
    let x;
    e[0] !== g ? (x = g.formatMessage({
        id: "products.detailsFollowUpButton.label",
        defaultMessage: "Follow up"
    }), e[0] = g, e[1] = x) : x = e[1];
    const _ = x;
    let C;
    e[2] !== p || e[3] !== h || e[4] !== a || e[5] !== S || e[6] !== f || e[7] !== y || e[8] !== m ? (C = () => {
        a && Ue(h), Oe(h, f, {
            messageId: S,
            turnIndex: m,
            contentReferenceStartIndex: p,
            productIndex: y,
            contentReferenceType: $e.ProductEntity
        }, Pe.CHATGPT_PRODUCT_FOLLOW_UP_INTERACTION_SURFACE_FOLLOW_UP_BUTTON)
    }, e[2] = p, e[3] = h, e[4] = a, e[5] = S, e[6] = f, e[7] = y, e[8] = m, e[9] = C) : C = e[9];
    let b;
    e[10] !== _ ? (b = o.jsx("span", {
        className: "flex items-center select-none",
        children: _
    }), e[10] = _, e[11] = b) : b = e[11];
    let I;
    return e[12] !== _ || e[13] !== C || e[14] !== b ? (I = o.jsx("div", {
        id: "product-details-follow-up-button",
        className: "fixed end-7 bottom-10 z-[50] md:bottom-8",
        children: o.jsx(Ne, {
            size: "large",
            color: "secondary",
            icon: Ae,
            label: _,
            contentWrapperClassName: "gap-1",
            className: "corner-superellipse/1.1 text-token-text-primary bg-token-bg-primary shadow-short h-12 cursor-pointer overflow-clip rounded-[28px] border-none bg-clip-padding px-6 py-7 font-medium active:opacity-100! dark:bg-[#303030]",
            onClick: C,
            children: b
        })
    }), e[12] = _, e[13] = C, e[14] = b, e[15] = I) : I = e[15], I
}

function ot(t, e) {
    return { ...t.analytics_meta ? ? {},
        interaction_source : e,
        product_id : t.id,
        product_event_uuid: t.product_event_uuid,
        product_url: t.url,
        has_popular_tag: t.popularity_metadata ? .product_tags ? .includes("popular") ? ? !1
    }
}

function dt({
    product: t,
    setUpdatedProduct: e,
    clientThreadId: a,
    messageId: f,
    contentReferenceStartIndex: h,
    turnIndex: S,
    productIndex: p,
    analyticsMetadata: m,
    conversation: y,
    offsetTopMargin: g = !1,
    sidebar: x,
    isModal: _ = !1,
    interactionSource: C,
    onHeaderTitleChange: b,
    scrollTop: I,
    onHeaderImageHeightChange: w,
    scrollContainerRef: W
}) {
    const r = Te(),
        u = Ve(m),
        [R, c] = n.useState(t),
        [Z, pe] = n.useState(!1),
        me = R.product_lookup_key ? .variant_options_query == null,
        [he, ge] = n.useState(null),
        [oe, k] = n.useState(!1),
        [q, A] = n.useState(!1),
        {
            showDebugConversationTurns: U
        } = Ie(),
        J = De.useStore(),
        re = n.useRef(!1),
        ee = n.useRef(null),
        V = n.useRef(null),
        $ = n.useRef(null),
        ie = n.useRef(null),
        P = be("3375735072"),
        L = be("4170238021"),
        ae = be("1290093942"),
        fe = Fe(),
        i = n.useMemo(() => ({ ...R,
            popularity_metadata: R.popularity_metadata ? ? t.popularity_metadata,
            num_reviews: R.num_reviews ? ? t.num_reviews,
            rating: R.rating ? ? t.rating
        }), [R, t.popularity_metadata, t.num_reviews, t.rating]),
        [H] = n.useState(() => new Be(ze.ProductSidebar, {
            context: He("v1")
        }));
    n.useEffect(() => {
        H.reset()
    }, [t.id, H]);
    const le = n.useMemo(() => ({ ...i,
            title: t.title
        }), [i, t.title]),
        {
            productInfo: v,
            isLoadingReviewsOrRationale: ce,
            isLoadingProductEntity: X,
            isCached: ue
        } = Xe({
            clientThreadId: a,
            messageId: f,
            product: le,
            isInitialLoad: me
        }),
        te = n.useRef(!1);
    n.useEffect(() => {
        const s = v.productEntity ? .product;
        s && (re.current || c(s)), s && !te.current && (te.current = !0, u("Product Sidebar Entity Loaded", "product_sidebar_entity_loaded", "product_entity", { ...s.analytics_meta ? ? {},
            product_event_uuid : s.product_event_uuid
        }))
    }, [v.productEntity, u]), n.useEffect(() => {
        u("Product Detail Shown", "product_detail_shown", "product_entity", ot(t, C))
    }, []), n.useEffect(() => {
        i && e(i)
    }, [i, e]);
    const D = n.useRef([]),
        G = n.useRef([]),
        F = t.image_urls ? .[0] ? ? null,
        B = n.useRef(t.image_urls ? .[0] ? ? null),
        z = n.useRef(t.title ? ? null),
        K = We(),
        Q = Le(y.id) ? ? K;
    n.useEffect(() => {
        B.current = F
    }, [t.id, F]), n.useEffect(() => {
        z.current = t.title ? ? null
    }, [t.id, t.title]);
    const N = n.useMemo(() => Z ? i.title : z.current ? ? i.title ? ? t.title ? ? "", [t.title, i.title, Z]),
        l = n.useMemo(() => {
            const s = [];
            return N && s.push(N), i.description && s.push(i.description), v.productRationale ? .rationale && s.push(v.productRationale.rationale), v.productReviews ? .summary && s.push(v.productReviews.summary), s.join(`

`).trim()
        }, [N, v.productRationale ? .rationale, v.productReviews ? .summary, i.description]);
    n.useEffect(() => {
        if (!b) return;
        let s = 0;
        if (W ? .current) {
            const je = W.current.closest('[data-testid="modal-chat-screen-product-flyout"]') ? .querySelector("header");
            je && (s = je.getBoundingClientRect().bottom)
        } else {
            const de = document.querySelector('[data-testid="bar-product-header"]');
            de instanceof HTMLElement && (s = de.getBoundingClientRect().bottom)
        }
        const j = [],
            O = V.current ? .textContent ? .trim();
        O && V.current && j.push({
            title: O,
            top: V.current.getBoundingClientRect().top
        });
        const _e = $.current ? .textContent ? .trim();
        _e && $.current && j.push({
            title: _e,
            top: $.current.getBoundingClientRect().top
        });
        let Y = N;
        for (const de of j) de.top <= s + 1 && (Y = de.title);
        Y && Y !== ie.current && (ie.current = Y, b(Y))
    }, [N, b, I, W, v.productRationale, v.productReviews]);
    const d = i ? .offers ? ? t.offers ? ? [];
    for (const s of d) {
        const j = D.current.findIndex(O => qe(O, s));
        if (j === -1) {
            D.current.push(s);
            continue
        }
        D.current[j] = s
    }
    const T = i ? .image_urls ? ? t.image_urls ? ? [];
    for (const s of T) G.current.includes(s) || G.current.push(s);
    const M = i ? .variants ? ? [],
        E = n.useMemo(() => {
            if (!P) return G.current ? ? [];
            const s = i.image_urls ? ? [];
            if (Z) return s;
            const j = B.current;
            return j ? [j, ...s.filter(O => O !== j)] : s
        }, [P, i.image_urls, Z]);
    n.useEffect(() => {
        if (!w) return;
        if (!E || E.length === 0) {
            w(0);
            return
        }
        const s = ee.current;
        if (!s) return;
        if (typeof ResizeObserver > "u") {
            w(s.offsetHeight || 0);
            return
        }
        w(-1);
        const j = new ResizeObserver(O => {
            for (const _e of O) {
                const Y = Math.floor(_e.contentRect.height);
                Y > 0 && w(Y)
            }
        });
        return j.observe(s), () => {
            j.disconnect()
        }
    }, [w, E]);
    const se = E ? .map(s => ({
            url: s,
            content_url: s,
            thumbnail_url: s,
            title: N,
            content_size: {
                width: 0,
                height: 0
            },
            thumbnail_size: {
                width: 0,
                height: 0
            }
        })),
        ne = P && (q || X),
        xe = !P || !X || ne,
        Re = (ae || fe) && x && Q && l;
    return o.jsxs("div", {
        className: ve("bg-token-bg-primary flex w-full flex-col", g ? r ? "mt-[calc(var(--threadFlyOut-leading-height,var(--header-height))*-1)] min-h-screen" : "mt-[calc(var(--threadFlyOut-leading-height,53px)*-1)] min-h-screen" : "mt-0"),
        children: [o.jsx("div", {
            ref: ee,
            children: L ? o.jsx(tt, {
                images: E ? .map(s => ({
                    src: s
                })) ? ? [],
                aspect: "aspect-square",
                objectPosition: "object-contain",
                imageClassName: "mix-blend-darken dark:mix-blend-lighten cursor-zoom-in",
                onClick: s => {
                    J.setCurrentImage({
                        image: {
                            url: s.src,
                            content_url: s.src,
                            thumbnail_url: s.src,
                            title: t.title,
                            content_size: {
                                width: 0,
                                height: 0
                            },
                            thumbnail_size: {
                                width: 0,
                                height: 0
                            }
                        },
                        source: ke.ImageGroup,
                        analyticsMetadata: m,
                        contentReferenceStartIndex: h,
                        productIndex: p,
                        imageResults: se ? ? []
                    })
                }
            }) : o.jsx(Qe, {
                imageUrls: E,
                title: t.title,
                onImageClick: s => {
                    J.setCurrentImage({
                        image: {
                            url: s,
                            content_url: s,
                            thumbnail_url: s,
                            title: t.title,
                            content_size: {
                                width: 0,
                                height: 0
                            },
                            thumbnail_size: {
                                width: 0,
                                height: 0
                            }
                        },
                        source: ke.ImageGroup,
                        analyticsMetadata: m,
                        contentReferenceStartIndex: h,
                        productIndex: p,
                        imageResults: se ? ? []
                    })
                }
            })
        }), o.jsxs("div", {
            className: "border-token-border-light flex flex-col border-t px-6 pt-4",
            children: [o.jsx("h2", {
                className: "text-xl",
                children: N
            }), o.jsx(Ge, {
                product: i,
                wrapperClass: "text-token-text-primary mt-1 inline-flex items-center gap-1 text-base leading-5 font-normal",
                includeMidDelimiter: !0,
                includeNum: !0
            })]
        }), P && !X && M ? .length > 0 && o.jsx("div", {
            className: ve("px-6 pt-4", q && "pointer-events-none opacity-50"),
            "aria-busy": q,
            children: o.jsx(Ye, {
                options: M,
                showErrors: oe,
                updateOption: (s, j, O) => rt({
                    optionGroupId: s,
                    selectedId: j,
                    variant_index: O,
                    statefulProduct: i,
                    setStatefulProduct: c,
                    setIsSwitchingVariant: A,
                    setFetchedUserSelectedVariant: pe,
                    profiler: H,
                    setError: ge,
                    variantFetchedViaV2Ref: re,
                    trackContentReferenceEvent: u,
                    productIndex: p,
                    productId: t.id
                })
            })
        }), he && o.jsx("div", {
            className: "text-token-interactive-label-danger-secondary-default text-center",
            children: he
        }), xe && o.jsx(Ze, {
            className: ve("border-token-border-light flex flex-col px-4 pt-3 sm:px-6 sm:pt-4", !_ && "-mx-3"),
            offers: P ? i.offers ? ? [] : D.current ? ? [],
            profiler: H,
            conversation: y,
            contentReferenceStartIndex: h,
            productIndex: p,
            product: i,
            trackContentReferenceEvent: u,
            analyticsMetadata: m,
            imageUrls: P ? i.image_urls ? ? [] : G.current ? ? [],
            isLoading: ne,
            onOpenCheckout: () => k(!0),
            interactionSource: C
        }), o.jsxs("div", {
            className: "bg-token-bg-primary flex flex-col pt-4",
            children: [o.jsx(Je, {
                contentReference: v.productRationale,
                trackContentReferenceEvent: u,
                disableAnimation: ue,
                isLoading: ce,
                headerRef: V,
                productAnalyticsMeta: i.analytics_meta ? ? void 0,
                productEventUuid: i.product_event_uuid ? ? void 0
            }), o.jsx(et, {
                contentReference: v.productReviews,
                trackContentReferenceEvent: u,
                disableAnimation: ue,
                headerRef: $,
                productAnalyticsMeta: i.analytics_meta ? ? void 0,
                productEventUuid: i.product_event_uuid ? ? void 0
            })]
        }), Re && o.jsx("div", {
            className: "flex justify-end px-6 pt-16 pb-6",
            children: o.jsx(nt, {
                conversation: y,
                messageId: f,
                contentReferenceStartIndex: h,
                turnIndex: S,
                productIndex: p,
                product: t,
                isModal: _
            })
        }), !1]
    })
}
async function rt({
    optionGroupId: t,
    selectedId: e,
    variant_index: a,
    statefulProduct: f,
    setStatefulProduct: h,
    setIsSwitchingVariant: S,
    setFetchedUserSelectedVariant: p,
    profiler: m,
    setError: y,
    variantFetchedViaV2Ref: g,
    trackContentReferenceEvent: x,
    productIndex: _,
    productId: C
}) {
    const b = f.variants ? .find(r => r.id === t);
    x("product_detail", "product_detail", "product_entity", { ...f.analytics_meta ? ? {},
        product_index : _,
        product_id : C,
        product_event_uuid: f.product_event_uuid,
        action: "variant_selected",
        section: "product_detail",
        section_location: "sidebar",
        variant_name: b ? .label ? ? "",
        variant_value: b ? .options.find(r => r.id === e) ? .label ? ? "",
        variant_index: a
    });
    const I = f.variants ? .map(r => r.id === t ? { ...r,
        options: r.options.map(u => ({ ...u,
            selected: u.id === e
        })),
        selected_option_id: e
    } : r) ? ? f.variants;
    let w = I ? .reduce((r, u) => (u.selected_option_id && (r[u.id] = u.selected_option_id), r), {});
    b ? .options.find(r => r.id === e) ? .available || (w = {
        [t]: e
    }), h(r => ({ ...r,
        variants: I,
        product_lookup_key: { ...r.product_lookup_key,
            variant_options_query: w,
            last_variant_selection_group_id: t
        }
    })), S(!0), m ? .startBlock("offer_variant_reload");
    try {
        const r = { ...f.product_lookup_key,
                variant_options_query: w,
                last_variant_selection_group_id: t
            },
            R = (await Ke({
                productLookupKey: r
            })) ? .product;
        R && R.variants && (p(!0), h(c => ({ ...R,
            title: R.title ? ? c.title,
            product_lookup_key: r
        })), g.current = !0)
    } catch {} finally {
        m ? .endBlock("offer_variant_reload"), S(!1)
    }
}
export {
    dt as P, tt as S
};
//# sourceMappingURL=ecdd5ba5-nah1p7j5w8fsn12u.js.map