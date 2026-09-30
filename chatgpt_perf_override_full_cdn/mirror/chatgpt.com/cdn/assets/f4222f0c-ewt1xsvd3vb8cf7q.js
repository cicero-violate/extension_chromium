import {
    r as u,
    j as e,
    u as ce,
    o as b,
    c as Se
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    b5 as te,
    af as k,
    q as ue,
    J as Te,
    e as pe,
    CK as ae,
    D as Ce,
    bN as Ie,
    aw as V,
    ff as Me,
    mc as Ee,
    fk as _e,
    jd as ge,
    ev as Oe,
    jU as Pe,
    a as Ae,
    N as Fe,
    fc as Q,
    hk as Re
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    g as De,
    d as ne,
    i as He,
    P as le
} from "./aaa2d182-da7hz3gf5lvb4501.js";
import {
    u as We
} from "./e1d1ae28-lk73qwfctl3clvqu.js";
import {
    b as ze
} from "./2478e8be-fu39n45z77ccw3bg.js";
import {
    g as Be
} from "./eda93c10-owa5kvkms7jsn4fn.js";
import {
    wX as Ve,
    cC as Ye,
    bN as $e,
    AL as qe,
    eX as be,
    pR as ye,
    dr as Xe,
    aS as G,
    AM as Je,
    xh as je,
    xF as Ke,
    bO as Qe,
    AN as me,
    hT as Ue,
    hS as Ze,
    cW as Le
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    S as Ge
} from "./aa6b223c-hs6eburv6qzq238w.js";
import et from "./d4fd05ef-jcd8acyt60dknv7p.js";
import {
    W as ve
} from "./dccfc4ad-llwbwazdbw44tz1f.js";
import {
    s as tt
} from "./09f5ffef-n7w0jc63hnjzsrzv.js";

function Pt({
    imageUrls: t,
    title: l,
    onImageClick: a,
    isLoading: n
}) {
    const [c, s] = u.useState(0), i = u.useRef(null);
    return t ? e.jsx("div", {
        className: "overflow-clip",
        children: e.jsxs("div", {
            className: k("flex flex-col transition duration-400 ease-in-out", n && "pointer-events-none blur-lg"),
            children: [t[c] && e.jsx(te.div, {
                className: "bg-token-main-surface-secondary dark:bg-token-main-surface-primary-inverse",
                drag: "x",
                dragConstraints: {
                    left: 0,
                    right: 0
                },
                dragElastic: 0,
                onDragEnd: (m, {
                    offset: d,
                    velocity: o
                }) => {
                    const x = Math.abs(d.x) * o.x,
                        f = 1e3;
                    x < -f ? c < t.length - 1 && s(c + 1) : x > f && c > 0 && s(c - 1)
                },
                onClick: () => a(t[c]),
                children: e.jsx("img", {
                    className: "m-0 aspect-square w-full cursor-pointer object-contain mix-blend-darken",
                    src: t[c],
                    alt: l,
                    draggable: !1
                })
            }), t.length > 1 && e.jsx("div", {
                ref: i,
                className: "no-scrollbar flex flex-row gap-2 overflow-x-scroll px-6 py-3",
                children: t.map((m, d) => e.jsx("div", {
                    className: k("flex-none cursor-pointer overflow-hidden rounded-lg border-2 p-0.5", c === d ? "border-token-text-primary" : "border-transparent"),
                    onMouseEnter: () => s(d),
                    children: e.jsx("div", {
                        className: "bg-token-main-surface-secondary dark:bg-token-main-surface-primary-inverse overflow-clip rounded-[4.5px]",
                        children: e.jsx("img", {
                            className: "h-10 w-10 object-cover mix-blend-darken",
                            src: m,
                            alt: l
                        })
                    })
                }, `${d}-${m}`))
            })]
        })
    }) : null
}
const st = (t, l) => l ? { ...t,
        sourceMessageId: l
    } : t,
    xe = 3,
    fe = 300;

function At({
    conversation: t,
    offers: l,
    profiler: a,
    contentReferenceStartIndex: n,
    productIndex: c,
    product: s,
    isLoading: i,
    onOpenCheckout: m,
    trackContentReferenceEvent: d,
    analyticsMetadata: o,
    className: x,
    interactionSource: f
}) {
    "use no forget";
    const h = ue("3375735072"),
        S = h && ue("3109853659"),
        y = h ? Be() : null,
        N = We(),
        T = Te(),
        p = ce(),
        _ = pe(t ? t.serverId$ : () => {}),
        [I, j] = u.useState(!1),
        M = s.offers_see_more_boundary ? ? xe,
        F = (s.variants && Object.values(De(s.variants)).map(r => r.label).join(" • ")) ? ? null,
        w = l.filter(r => r.available),
        C = w.length > 0,
        P = w.slice(0, I ? l.length : M),
        [E, z] = u.useState(200),
        R = u.useRef(null),
        [D, A] = u.useState(i),
        O = nt(f),
        U = l.length,
        v = w.length,
        Y = l.filter(r => r.checkoutable).length,
        $ = s.analytics_meta ? ? {},
        q = s.product_event_uuid,
        se = ({
            offer: r,
            offerIndex: g,
            offerSource: B,
            feedId: H,
            action: X,
            hadBuyButton: Z,
            includeSiteUrl: L
        }) => {
            const J = s.popularity_metadata ? .product_tags ? .includes("popular") ? ? !1;
            d("Product Offer Clicked", "product_offer_clicked", "product_entity", {
                content_reference_start_index: n,
                product_index: c,
                offer_index: g,
                interaction_source: f,
                ...$,
                product_id: s.id,
                product_event_uuid: q,
                product_url: s.url,
                offer_url: r.url,
                offers_count: l.length,
                price: r.price ? .toString(),
                action: X,
                merchant_name: r.merchant_name,
                source: s.provider,
                feed_id: H,
                has_popular_tag: J
            }), ne({
                productOfferInteractionEventType: ae.CHATGPT_PRODUCT_OFFER_INTERACTION_EVENT_TYPE_OFFER_CLICKED,
                clientThreadId: o.clientThreadId,
                product: s,
                offerIndex: g,
                offer: r,
                offerCount: l.length,
                contentReferenceType: O,
                messageId: o.messageId,
                contentReferenceStartIndex: n
            });
            const K = {
                content_reference_start_index: n,
                product_index: c,
                interaction_source: f,
                ...$,
                product_id: s.id,
                product_event_uuid: q,
                product_url: s.url,
                action: X,
                section: "product_detail",
                section_location: "sidebar",
                section_index: g,
                offer_index: g,
                merchant_name: r.merchant_name,
                price: r.price ? .toString(),
                had_buy_button: Z,
                variants: F,
                source: B,
                feed_id: H,
                has_popular_tag: J
            };
            L && (K.site_url = r.url), d("product_offer", "product_offer", "product_entity", K)
        };
    return u.useEffect(() => {
        if (i || !C) return;
        const r = { ...$,
            product_event_uuid: q,
            total_count: l.length,
            available_count: v,
            checkoutable_count: Y,
            interaction_source: f,
            is_variant: !!F,
            source: s.provider,
            has_popular_tag: s.popularity_metadata ? .product_tags ? .includes("popular") ? ? !1
        };
        d("Product Offers Shown", "product_offers_shown", "product_entity", r), d("product_detail", "product_detail", "product_entity", { ...$,
            product_event_uuid: q,
            interaction_source: f,
            action: "updated",
            variants_count: s.variants ? .length ? ? 0,
            variants_with_selection_count: s.variants ? .filter(g => g.selected_option_id).length ? ? 0,
            offers_count: v,
            checkoutable_offers_count: Y,
            has_popular_tag: s.popularity_metadata ? .product_tags ? .includes("popular") ? ? !1
        }), ne({
            productOfferInteractionEventType: ae.CHATGPT_PRODUCT_OFFER_INTERACTION_EVENT_TYPE_OFFER_LIST_SHOWN,
            clientThreadId: o.clientThreadId,
            product: s,
            offerIndex: void 0,
            offer: void 0,
            offerCount: U,
            contentReferenceType: O,
            messageId: o.messageId,
            contentReferenceStartIndex: n
        }), Ce.addAction("shopping_checkout.offers_shown", r)
    }, [i, F]), u.useEffect(() => {
        if (i) {
            z(200);
            return
        }
        if (!C) return;
        const r = requestAnimationFrame(() => {
            if (!R.current) return;
            const g = R.current.scrollHeight;
            z(Math.ceil(g))
        });
        return () => cancelAnimationFrame(r)
    }, [i, C, P.length]), u.useEffect(() => {
        if (i || l.length > 0) {
            A(!0);
            return
        }
        const r = setTimeout(() => A(!1), 300);
        return () => clearTimeout(r)
    }, [i, l.length]), w.length === 0 && s.variants && s.variants.length > 0 && s.variants.every(r => r.selected_option_id) && !i ? e.jsx("div", {
        className: "px-6 pt-6 text-sm",
        children: s.variants_error_state_message ? s.variants_error_state_message : e.jsx(b, {
            id: "jEsmfN",
            defaultMessage: "This combination is unavailable"
        })
    }) : D && e.jsxs("div", {
        className: k(x, "relative"),
        children: [e.jsx("div", {
            className: "relative overflow-hidden transition-[height] duration-300 ease-out",
            style: {
                height: E
            },
            children: e.jsxs("div", {
                ref: R,
                children: [!i && C && P.map((r, g) => {
                    const B = r.debug_info ? .feed_id,
                        H = r.debug_info ? .source,
                        X = h && r.checkoutable,
                        Z = r.launcherPayload ? ? null,
                        L = Z ? Ie(() => Ve({ ...st(Z, o.messageId),
                            conversationId: _ ? ? null
                        })) : null,
                        J = L !== null,
                        K = J || X;
                    return e.jsx(te.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            duration: fe / 1e3
                        },
                        children: e.jsx(lt, {
                            offer: r,
                            isCheckoutEnabled: h,
                            isLoading: i,
                            isCheckoutable: X,
                            showCheckoutLauncherButton: J,
                            checkoutLauncherLaunchProps: L,
                            isMultiItemCartEnabled: S,
                            isAddDisabled: N.status === "loading",
                            showPriceDisclosure: !!s.show_price_disclosure,
                            onOpenCheckout: (W, de) => {
                                W.stopPropagation(), m(), h && y && He(s) && r.checkout_payload && (a ? .startBlock("shown"), y.openNewCheckout({
                                    preloadCustomerSessionClientSecret: de,
                                    metadata: o,
                                    items: [{
                                        id: r.checkout_payload,
                                        productId: s.id,
                                        quantity: 1,
                                        value: r.checkout_payload
                                    }]
                                }), se({
                                    offer: r,
                                    offerIndex: g,
                                    offerSource: H,
                                    feedId: B,
                                    action: "buy_button_clicked",
                                    hadBuyButton: !0,
                                    includeSiteUrl: !1
                                }))
                            },
                            onAddToCart: async W => {
                                if (W.stopPropagation(), !r.checkout_payload) return;
                                await N.addItem(r.checkout_payload) ? T.success(p.formatMessage({
                                    id: "3u8eef",
                                    defaultMessage: "Added to cart"
                                }), {
                                    duration: 2
                                }) : T.danger(p.formatMessage({
                                    id: "IZjwsE",
                                    defaultMessage: "Failed to add to cart"
                                }), {
                                    duration: 3
                                })
                            },
                            onVisitMerchant: W => {
                                W.stopPropagation(), se({
                                    offer: r,
                                    offerIndex: g,
                                    offerSource: H,
                                    feedId: B,
                                    action: "open_site_clicked",
                                    hadBuyButton: K,
                                    includeSiteUrl: !0
                                }), window.open(r.url, "_blank")
                            },
                            onLaunchCheckout: W => {
                                W.stopPropagation(), se({
                                    offer: r,
                                    offerIndex: g,
                                    offerSource: H,
                                    feedId: B,
                                    action: "buy_button_clicked",
                                    hadBuyButton: !0,
                                    includeSiteUrl: !0
                                })
                            },
                            onShown: () => {
                                a ? .logTimingOnce("render_time_to_first_offer"), d("product_offer", "product_offer", "product_entity", {
                                    content_reference_start_index: n,
                                    product_index: c,
                                    ...$,
                                    product_id: s.id,
                                    product_event_uuid: q,
                                    product_url: s.url,
                                    action: "shown",
                                    section: "product_detail",
                                    section_location: "sidebar",
                                    section_index: g,
                                    offer_index: g,
                                    merchant_name: r.merchant_name,
                                    price: r.price ? .toString(),
                                    had_buy_button: K,
                                    checkoutable: r.checkoutable,
                                    source: H,
                                    feed_id: B,
                                    has_popular_tag: s.popularity_metadata ? .product_tags ? .includes("popular") ? ? !1
                                }), ne({
                                    productOfferInteractionEventType: ae.CHATGPT_PRODUCT_OFFER_INTERACTION_EVENT_TYPE_OFFER_SHOWN,
                                    clientThreadId: o.clientThreadId,
                                    product: s,
                                    offerIndex: g,
                                    offer: r,
                                    offerCount: l.length,
                                    contentReferenceType: O,
                                    messageId: o.messageId,
                                    contentReferenceStartIndex: n
                                })
                            }
                        }, r.url + r.checkout_payload)
                    }, r.url)
                }), l.length > M && !i && e.jsx(te.div, {
                    layout: !0,
                    transition: {
                        type: "tween",
                        ease: "easeInOut",
                        duration: .2
                    },
                    children: e.jsxs(V, {
                        className: "w-fit px-3",
                        size: "small",
                        color: "ghost",
                        onClick: () => j(!I),
                        contentWrapperClassName: "gap-1",
                        children: [I ? e.jsx(b, {
                            id: "Gl3oLS",
                            defaultMessage: "See less"
                        }) : e.jsx(b, {
                            id: "f9tOaY",
                            defaultMessage: "See more"
                        }), I ? e.jsx(Ye, {
                            className: "mt-0.5"
                        }) : e.jsx($e, {})]
                    })
                })]
            })
        }), e.jsx("div", {
            className: k("absolute inset-0 h-full px-6 pt-4 transition-opacity ease-out", i ? "opacity-100" : "pointer-events-none opacity-0"),
            style: {
                transitionDuration: `${fe}ms`
            },
            role: i ? "status" : void 0,
            "aria-busy": i || void 0,
            children: Array.from({
                length: xe
            }).map((r, g) => e.jsx(at, {}, `offer-skeleton-${g}`))
        })]
    })
}

function at() {
    return e.jsx("div", {
        className: "flex flex-col rounded-xl p-3",
        children: e.jsxs("div", {
            className: "flex flex-row items-start gap-2",
            children: [e.jsxs("div", {
                className: "flex min-w-0 flex-1 flex-col gap-1",
                children: [e.jsxs("div", {
                    className: "flex flex-row items-center gap-1.5",
                    children: [e.jsx(G, {
                        className: "h-4 w-4 rounded-full!"
                    }), e.jsx(G, {
                        className: "h-4 w-[113px]"
                    })]
                }), e.jsx(G, {
                    className: "h-[14px] w-[201px]"
                })]
            }), e.jsx("div", {
                className: "flex flex-row items-center gap-2",
                children: e.jsx(G, {
                    className: "h-9 w-[58px] rounded-[18px]!"
                })
            })]
        })
    })
}

function nt(t) {
    switch (t) {
        case "inline_link":
            return le.ProductEntity;
        case "carousel":
            return le.Products;
        default:
            return le.Unrecognized
    }
}

function lt({
    offer: t,
    onVisitMerchant: l,
    onOpenCheckout: a,
    onLaunchCheckout: n,
    isCheckoutEnabled: c,
    isLoading: s,
    isCheckoutable: i,
    showCheckoutLauncherButton: m,
    checkoutLauncherLaunchProps: d,
    isMultiItemCartEnabled: o,
    isAddDisabled: x,
    onAddToCart: f,
    showPriceDisclosure: h,
    onShown: S
}) {
    const [y, N] = u.useState(void 0), T = ce(), p = t.price_details, _ = p ? .base && (p.shipping ? ? p.tax) && p.total, I = (p ? .display_price === "total_price" || _) && h, j = p ? .display_price === "total_price", M = pe(Me), {
        showDebugConversationTurns: F
    } = Ee(), w = u.useRef(!1);
    u.useEffect(() => {
        s || S()
    }, [s]), u.useEffect(() => {
        s || (async () => {
            if (!s && i && t.checkout_payload && !w.current) {
                w.current = !0;
                const Y = await ze([{
                    id: t.checkout_payload,
                    quantity: 1,
                    value: t.checkout_payload
                }]);
                Y.customer_session_client_secret && N(Y.customer_session_client_secret)
            }
        })()
    }, [s, i, t.checkout_payload]);
    let C = null;
    _ && p ? C = e.jsxs("div", {
        className: "space-y-1 text-sm",
        children: [e.jsx("div", {
            children: e.jsx(b, {
                id: "offer.breakdown.base",
                defaultMessage: "Base price: {amount}",
                values: {
                    amount: p.base
                }
            })
        }), p.shipping && e.jsx("div", {
            children: e.jsx(b, {
                id: "offer.breakdown.shipping",
                defaultMessage: "Shipping: {amount}",
                values: {
                    amount: p.shipping
                }
            })
        }), p.tax && e.jsx("div", {
            children: e.jsx(b, {
                id: "offer.breakdown.tax",
                defaultMessage: "Tax: {amount}",
                values: {
                    amount: p.tax
                }
            })
        })]
    }) : j && (C = e.jsx(b, {
        id: "ur3//V",
        defaultMessage: "Prices shown include estimated tax and shipping."
    }));
    const P = v => {
            n(v), d ? .onClick(v)
        },
        E = v => {
            v.stopPropagation(), l(v)
        },
        z = m ? E : void 0,
        R = m ? P : c && i && !M ? v => a(v, y) : l,
        D = e.jsx("span", {
            className: "text-[15px] leading-snug font-semibold",
            children: t.price
        }),
        A = c && i && !M,
        O = A && o && !!t.checkout_payload,
        U = qe(t) ? ? t.url;
    return t.debug_info ? .source, t.debug_info ? .feed_id, Object.entries(t.debug_info ? ? {}).filter(([v]) => v !== "source" && v !== "feed_id"), e.jsxs("div", {
        className: k("flex cursor-pointer flex-col rounded-xl p-3", "hover:bg-token-bg-tertiary"),
        onPointerEnter: d ? .onPointerEnter,
        onMouseOver: d ? .onPointerEnter,
        onFocus: d ? .onFocus,
        onClick: R,
        children: [e.jsxs("div", {
            className: "flex flex-row items-start gap-2",
            children: [e.jsxs("div", {
                className: "flex min-w-0 flex-1 flex-col gap-0.5",
                children: [e.jsxs("div", {
                    className: "group flex flex-col gap-0.5",
                    onClick: m ? void 0 : l,
                    children: [e.jsxs("div", {
                        className: "flex flex-row items-center gap-1.5 text-sm font-medium",
                        onClick: z,
                        children: [e.jsx(be, {
                            className: "border-token-border-light h-5 w-5 rounded-full border",
                            url: t.url,
                            size: 128,
                            minSize: 16,
                            fallback: e.jsx(ye, {
                                className: "text-token-text-tertiary"
                            })
                        }), e.jsx("div", {
                            className: "truncate",
                            children: U
                        }), e.jsx("button", {
                            type: "button",
                            "aria-label": T.formatMessage({
                                id: "rigO8r",
                                defaultMessage: "Open {merchantName} in a new tab"
                            }, {
                                merchantName: U
                            }),
                            className: "shrink-0",
                            onClick: E,
                            children: e.jsx(Xe, {
                                className: "text-token-text-secondary mt-0.5 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                            })
                        })]
                    }), e.jsx("div", {
                        className: "text-token-text-secondary text-xs whitespace-pre-wrap",
                        children: t.details
                    })]
                }), c && !m && it({
                    tag: t.tag,
                    showCheckoutLauncherButton: m,
                    isInstantCheckoutEnabled: A
                }) && e.jsx(ot, {
                    tag: t.tag
                })]
            }), e.jsxs("div", {
                className: "flex flex-row items-center gap-2",
                children: [e.jsxs("div", {
                    className: "flex flex-col items-end",
                    children: [t.original_price && e.jsx("span", {
                        className: "text-token-text-secondary text-xs line-through",
                        children: t.original_price
                    }), I && C ? e.jsx(_e, {
                        label: C,
                        children: e.jsxs("span", {
                            className: "flex items-center gap-0.5",
                            children: [D, e.jsx(ge, {
                                className: "text-token-text-secondary h-3 w-3"
                            })]
                        })
                    }) : D]
                }), m ? e.jsx("div", {
                    className: "flex flex-col items-end",
                    children: e.jsx(V, {
                        className: "w-fit truncate px-4",
                        size: "medium",
                        color: "secondary",
                        disabled: s,
                        onPointerEnter: d ? .onPointerEnter,
                        onMouseOver: d ? .onPointerEnter,
                        onFocus: d ? .onFocus,
                        onClick: P,
                        children: e.jsx(b, {
                            id: "RVcyxH",
                            defaultMessage: "Open"
                        })
                    })
                }) : c ? A ? e.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [O && e.jsx(V, {
                        className: "w-fit truncate px-4",
                        disabled: s || x,
                        size: "medium",
                        color: "secondary",
                        type: "button",
                        onClick: f,
                        children: e.jsx(b, {
                            id: "scQ8Wu",
                            defaultMessage: "Add"
                        })
                    }), e.jsx(V, {
                        className: "w-fit truncate px-4",
                        disabled: s,
                        size: "medium",
                        color: "primary",
                        onClick: v => a(v, y),
                        children: e.jsx(b, {
                            id: "vxb4gy",
                            defaultMessage: "Buy"
                        })
                    })]
                }) : e.jsx(V, {
                    className: "w-fit truncate px-4",
                    size: "medium",
                    color: "secondary",
                    disabled: s,
                    children: e.jsx(b, {
                        id: "CvthQr",
                        defaultMessage: "Visit"
                    })
                }) : e.jsx(V, {
                    className: "w-fit min-w-20 truncate",
                    size: "small",
                    color: "secondary",
                    disabled: s,
                    children: e.jsx(b, {
                        id: "CvthQr",
                        defaultMessage: "Visit"
                    })
                })]
            })]
        }), !1]
    })
}
const rt = "https://persistent.oaistatic.com/chatgpt/pink_720.jpeg",
    it = ({
        tag: t,
        showCheckoutLauncherButton: l,
        isInstantCheckoutEnabled: a
    }) => t ? l ? !0 : !(t.tooltip ? .type === "instant_checkout" && !a) : !1,
    ot = t => {
        "use forget";
        const l = Se.c(3),
            {
                tag: a
            } = t;
        if (!a) return null;
        let n;
        return l[0] !== a.text || l[1] !== a.tooltip ? (n = a.tooltip ? e.jsx(_e, {
            label: e.jsxs("div", {
                className: "flex flex-col items-center justify-center overflow-hidden",
                children: [e.jsxs("div", {
                    className: "relative flex h-44 w-full items-center justify-center overflow-hidden",
                    children: [e.jsx("div", {
                        className: "bg-token-bg-elevated-secondary absolute inset-0 h-44 w-full overflow-hidden",
                        children: e.jsx("img", {
                            src: rt,
                            alt: "tag background"
                        })
                    }), e.jsx("div", {
                        className: "outline-token-border-light z-1 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg outline",
                        children: e.jsx(Ge, {
                            className: "h-[18px] w-[18px] text-black"
                        })
                    })]
                }), e.jsxs("div", {
                    className: "flex flex-col items-center justify-start gap-2 self-stretch p-6 text-start",
                    children: [e.jsx("div", {
                        className: "w-full text-base leading-normal",
                        children: a.tooltip ? .title
                    }), e.jsx(et, {
                        className: "text-token-text-secondary text-sm leading-relaxed font-normal",
                        components: {
                            a: ct
                        },
                        children: a.tooltip ? .body_markdown
                    })]
                })]
            }),
            theme: "primary",
            side: "top",
            align: "start",
            customPaddingClassName: "p-0",
            cornerRadius: "2xl",
            contentClassName: "bg-token-bg-primary shadow-xl",
            interactive: !0,
            delayDuration: 500,
            children: e.jsxs("div", {
                className: "text-token-interactive-label-accent-default flex items-center gap-1 text-xs",
                children: [e.jsx(ge, {
                    className: "mt-px h-3 w-3"
                }), e.jsx("span", {
                    className: "leading-3",
                    children: a.text
                })]
            })
        }) : e.jsx("div", {
            className: "text-token-interactive-label-accent-default flex items-center gap-1 text-xs",
            children: e.jsx("span", {
                className: "leading-3",
                children: a.text
            })
        }), l[0] = a.text, l[1] = a.tooltip, l[2] = n) : n = l[2], n
    };

function ct(t) {
    return e.jsx("a", {
        href: t.href,
        className: k(t.className, "underline"),
        target: "_blank",
        rel: "noreferrer",
        children: t.children
    })
}
const re = ({
        durationMs: t,
        delayMs: l
    }) => ({
        "--duration": `${t}ms`,
        "--delay": `${l}ms`
    }),
    ie = t => !!(u.isValidElement(t) && Oe(["strong", "em"], t.type) && Pe(t.props) && typeof t.props.children == "string"),
    Ne = (t, l) => typeof t == "string" ? l(t).length : ie(t) ? l(t.props.children).length : 1,
    ke = (t, l) => Array.isArray(t) ? tt(t.map(a => ke(a, l))) : Ne(t, l),
    dt = "YfNCsW_animate",
    ut = "YfNCsW_fadeIn",
    mt = "YfNCsW_hidden",
    xt = "YfNCsW_marker",
    oe = {
        animate: dt,
        fadeIn: ut,
        hidden: mt,
        marker: xt
    },
    ee = ({
        hideWordsUntilStart: t = !1,
        animationTiming: l,
        children: a,
        delayMs: n,
        index: c,
        segmentText: s,
        onReady: i,
        onComplete: m
    }) => {
        const [d, o] = u.useState(0), x = s(a);
        return e.jsx(e.Fragment, {
            children: x.map((f, h) => {
                const S = n + h * l.delayMs;
                return e.jsx("span", {
                    className: k(oe.fadeIn, t && d < h && "sr-only"),
                    style: re({
                        delayMs: S,
                        durationMs: l.durationMs
                    }),
                    onAnimationStart: () => {
                        i(c + h), t && o(h)
                    },
                    onAnimationEnd: () => m(c + h),
                    children: f
                }, h)
            })
        })
    },
    ft = ({
        tag: t,
        children: l,
        start: a,
        end: n,
        isMarker: c,
        isLastNode: s,
        isOnlyNode: i
    }) => {
        const m = s === "",
            d = i === "",
            {
                enqueueElement: o,
                dequeueElement: x,
                updateElementBounds: f,
                reportComplete: h,
                reportProgress: S,
                reportReady: y,
                isDisabled: N,
                animationTiming: T,
                lastPositionCompletedAnimating: p,
                activeStartPos: _,
                segmentText: I
            } = u.useContext(Je),
            j = u.useRef(null),
            M = () => {
                j.current != null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
                    Ae.count(Fe.DEFAULT, "text_entry_animation.timeout"), y(t, a ? ? 0), j.current = null
                }, 2e3)
            },
            F = !N;
        u.useEffect(() => {
            if (!(a == null || !F)) return o(t, a), () => x(t, a)
        }, [t, a, F]);
        const w = (!m || c) && a != null && n != null,
            C = u.useRef(!1),
            P = c ? 1 : ke(l, I),
            E = P - 1;
        u.useEffect(() => {
            a != null && n != null && f(t, a, n, P), w && C.current !== !1 && C.current >= E ? y(t, a) : w && M()
        }, [w, E, P, a, n]);
        const z = O => {
                a != null && E > 0 && S(t, a, O / E), C.current = O, w && O >= E ? y(t, a) : w && M()
            },
            R = O => {
                c || O === E && (w || d && n != null) && h(n)
            },
            D = _ != null && a != null && n != null && _ > a && p != null && p >= n,
            A = _ != null && a != null && a <= _;
        return {
            segmentText: I,
            onReady: z,
            onComplete: R,
            isDisabled: N || D,
            shouldHide: !N && !A && !D,
            shouldAnimate: A,
            animationTiming: T
        }
    },
    ht = ({
        tag: t,
        children: l,
        className: a,
        ...n
    }) => {
        const c = t,
            s = l,
            i = n["data-start"] ? ? null,
            m = n["data-end"] ? ? null,
            d = n["data-is-last-node"],
            o = n["data-is-only-node"],
            {
                animationTiming: x,
                shouldHide: f,
                isDisabled: h,
                segmentText: S,
                onComplete: y,
                onReady: N
            } = ft({
                isMarker: !1,
                tag: c,
                children: s,
                start: i,
                end: m,
                isLastNode: d,
                isOnlyNode: o
            });
        if (h || f) return e.jsx(c, { ...n,
            className: k(a, f && "hidden!"),
            children: s
        });
        let T = 0,
            p = 0;
        return e.jsx(c, { ...n,
            className: a,
            children: typeof s == "string" ? e.jsx(ee, {
                index: 0,
                segmentText: S,
                delayMs: T,
                animationTiming: x,
                onReady: N,
                onComplete: y,
                children: s
            }, 0) : ie(s) ? u.cloneElement(s, s.props, e.jsx(ee, {
                index: 0,
                delayMs: T,
                animationTiming: x,
                segmentText: S,
                onReady: N,
                onComplete: y,
                children: s.props.children
            }, 0)) : Array.isArray(s) ? s.map(_ => {
                const I = T,
                    j = p,
                    M = Ne(_, S);
                return p += M, T += M * x.delayMs, typeof _ == "string" ? e.jsx(ee, {
                    index: j,
                    delayMs: I,
                    animationTiming: x,
                    segmentText: S,
                    onReady: N,
                    onComplete: y,
                    children: _
                }, j) : ie(_) ? u.cloneElement(_, _.props, e.jsx(ee, {
                    index: j,
                    delayMs: I,
                    animationTiming: x,
                    segmentText: S,
                    onReady: N,
                    onComplete: y,
                    children: _.props.children
                }, j)) : e.jsx("span", {
                    className: oe.fadeIn,
                    style: re({
                        delayMs: T,
                        durationMs: x.durationMs
                    }),
                    onAnimationStart: () => N(j),
                    onAnimationEnd: () => y(j),
                    children: _
                }, j)
            }) : e.jsx("span", {
                className: oe.fadeIn,
                style: re({
                    delayMs: T,
                    durationMs: x.durationMs
                }),
                onAnimationStart: () => N(0),
                onAnimationEnd: () => y(0),
                children: s
            }, 0)
        })
    };

function we({
    title: t,
    children: l,
    headerRef: a,
    stickyHeader: n = !0
}) {
    return e.jsxs("div", {
        className: "border-token-border-light bg-token-bg-primary border-t px-5 py-6",
        children: [e.jsx("div", {
            ref: a,
            className: k("text-token-text-primary bg-token-bg-primary -mx-5 flex items-center px-5 py-2", n && "sticky top-0 z-10"),
            children: e.jsx("div", {
                className: "text-heading-3 font-semibold",
                children: t
            })
        }), e.jsx("div", {
            className: "text-body-regular mt-2",
            children: l
        })]
    })
}

function Ft({
    contentReference: t,
    trackContentReferenceEvent: l,
    disableAnimation: a,
    isLoading: n = !1,
    headerRef: c,
    productAnalyticsMeta: s,
    productEventUuid: i
}) {
    const m = ce(),
        d = u.useRef(!1),
        o = t ? .rationale,
        x = !o && n;
    if (u.useEffect(() => {
            o && !d.current && (d.current = !0, l("Product Sidebar Rationale Loaded", "product_sidebar_rationale_loaded", "product_rationale", { ...s ? ? {},
                ...i ? {
                    product_event_uuid: i
                } : {}
            }))
        }, [s, i, o, l]), !o && !x) return null;
    const f = m.formatMessage({
        id: "rYk+aj",
        defaultMessage: "Looking up product details"
    });
    return e.jsx(we, {
        headerRef: c,
        stickyHeader: !1,
        title: e.jsx(b, {
            id: "/LSf9O",
            defaultMessage: "What to know"
        }),
        children: e.jsx("div", {
            children: o ? e.jsx(je, {
                isDisabled: a,
                children: e.jsxs(ht, {
                    tag: "p",
                    "data-start": 0,
                    "data-end": o.length,
                    children: [e.jsx("span", {
                        className: "me-1",
                        children: o
                    }), t ? .grouped_citation && e.jsx(ve, {
                        webpageItem: t.grouped_citation,
                        trackContentReferenceEvent: l,
                        analyticsMetadata: { ...s ? ? {},
                            ...i ? {
                                product_event_uuid: i
                            } : {},
                            section : "product_rationale",
                            section_location : "sidebar"
                        },
                        isLastHovered: !0,
                        noMarginStart: !0
                    })]
                })
            }) : e.jsx("div", {
                className: "text-token-text-secondary",
                children: e.jsx(Ke, {
                    text: f
                })
            })
        })
    })
}
const pt = {
        positive: Ze,
        negative: Ue,
        neutral: me,
        mixed: me
    },
    _t = {
        positive: "Positive",
        negative: "Negative",
        neutral: "Mixed",
        mixed: "Mixed"
    };

function Rt({
    contentReference: t,
    trackContentReferenceEvent: l,
    disableAnimation: a,
    headerRef: n,
    productAnalyticsMeta: c,
    productEventUuid: s
}) {
    const i = u.useRef(!1);
    u.useEffect(() => {
        t && !i.current && (i.current = !0, l("Product Sidebar Reviews Loaded", "product_sidebar_reviews_loaded", "product_reviews", { ...c ? ? {},
            ...s ? {
                product_event_uuid: s
            } : {}
        }))
    }, [c, s, t, l]);

    function m(o) {
        return new URL(o).hostname.replace(/^www\./, "")
    }

    function d(o) {
        return t ? o.cite ? t.cite_map[o.cite] ? .url : o.cite_url : null
    }
    return t ? e.jsx(we, {
        headerRef: n,
        stickyHeader: !1,
        title: e.jsx(b, {
            id: "p8XHcJ",
            defaultMessage: "What people are saying"
        }),
        children: e.jsxs("div", {
            className: "flex flex-col gap-5",
            children: [t.summary && e.jsx(je, {
                isDisabled: a,
                children: e.jsx(Qe, {
                    className: "text-body-regular prose-p:text-body-regular -mb-2",
                    children: t.summary
                })
            }), t.reviews.map((o, x) => {
                const f = pt[o.sentiment ? ? "neutral"],
                    h = d(o);
                return e.jsxs(te.div, {
                    className: "relative flex flex-col gap-2",
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    transition: {
                        duration: a ? 0 : .4
                    },
                    children: [e.jsxs("div", {
                        className: k("flex flex-row items-center gap-2", "not-prose"),
                        children: [e.jsx(be, {
                            url: h ? ? "",
                            className: "h-8 w-8 rounded-full",
                            size: 128,
                            minSize: 16,
                            fallback: e.jsx(ye, {
                                className: "text-token-text-tertiary"
                            })
                        }), e.jsxs("div", {
                            className: "flex flex-col",
                            children: [e.jsx("div", {
                                className: "text-sm font-semibold",
                                children: o.source
                            }), e.jsxs("div", {
                                className: "text-token-text-secondary flex flex-row gap-1 text-xs",
                                children: [e.jsx("div", {
                                    children: h ? m(h) : ""
                                }), o.sentiment && f && e.jsxs(e.Fragment, {
                                    children: ["·", e.jsx(f, {
                                        className: "icon-sm text-token-text-secondary"
                                    }), _t[o.sentiment]]
                                })]
                            })]
                        })]
                    }), e.jsxs("div", {
                        children: [o.theme && e.jsx("div", {
                            className: "text-body-regular mt-3 font-semibold",
                            children: o.theme
                        }), e.jsx("span", {
                            className: "text-body-regular me-1",
                            children: o.summary
                        }), e.jsx(gt, {
                            cite: o.cite,
                            contentReference: t,
                            trackContentReferenceEvent: l,
                            analyticsMetadata: { ...c ? ? {},
                                ...s ? {
                                    product_event_uuid: s
                                } : {}
                            }
                        })]
                    })]
                }, x)
            })]
        })
    }) : null
}

function gt({
    cite: t,
    contentReference: l,
    trackContentReferenceEvent: a,
    analyticsMetadata: n
}) {
    const {
        cite_map: c
    } = l, s = t ? c[t] : null;
    return s ? e.jsx(ve, {
        webpageItem: s,
        trackContentReferenceEvent: a,
        analyticsMetadata: { ...n,
            section: "product_reviews",
            section_location: "sidebar"
        },
        isLastHovered: !0,
        noMarginStart: !0
    }) : null
}
const bt = ({
        options: t,
        onSelect: l,
        isErrored: a
    }) => e.jsxs(Q.Root, {
        children: [e.jsxs(Q.Trigger, {
            className: k("radix-state-open:border-token-text-primary border-token-border-heavy bg-token-bg-primary text-token-text-secondary hover:bg-token-bg-primary h-12 w-full justify-between rounded-2xl border px-4 py-3 text-start", a && "border-token-interactive-label-danger-secondary-default"),
            children: [t ? .find(n => n.selected) ? .label ? ? e.jsx(b, {
                id: "FxgwoS",
                defaultMessage: "Choose an option"
            }), e.jsx(Le, {
                className: "ms-0.5 h-4 w-4 shrink-0"
            })]
        }), e.jsx(Q.Portal, {
            children: e.jsx(Q.Content, {
                children: t ? .map((n, c) => e.jsx(Q.Item, {
                    "aria-label": n.label ? ? "",
                    onClick: () => l(n.id, c),
                    className: k(n.available === !1 && "text-token-text-tertiary"),
                    children: n.label
                }, n.id))
            })
        })]
    }),
    yt = ({
        options: t,
        onSelect: l
    }) => e.jsx("div", {
        className: "flex flex-wrap gap-2",
        children: t.map((a, n) => e.jsx("button", {
            type: "button",
            "aria-label": a.label,
            className: k("flex items-center justify-center rounded-full border-2 px-4 py-2 text-lg text-xs font-medium transition-all", a.selected ? "bg-token-bg-primary border-black" : "bg-token-bg-tertiary border-transparent", a.available === !1 && "opacity-50"),
            onClick: () => l(a.id, n),
            children: a.label
        }, a.id))
    }),
    jt = ({
        options: t,
        onSelect: l
    }) => e.jsx("div", {
        className: "flex flex-wrap items-center gap-3",
        children: t.map((a, n) => e.jsx("button", {
            type: "button",
            "aria-label": a.label,
            className: k("flex h-9 w-9 items-center justify-center rounded-lg outline-2 outline-offset-1 transition-all", !a.selected && "outline-transparent", a.available === !1 && "opacity-50"),
            onClick: () => l(a.id, n),
            children: a.swatch_color_hex ? e.jsx("span", {
                className: "block h-9 w-9 rounded-lg border",
                style: {
                    backgroundColor: a.swatch_color_hex
                }
            }) : a.swatch_image_url ? e.jsx("img", {
                className: "h-9 w-9 rounded-lg object-cover",
                src: a.swatch_image_url,
                alt: a.label
            }) : null
        }, a.id))
    }),
    he = t => t ? .replace(/_/g, " ").replace(/\s+/g, " ").trim() ? ? "";

function Dt({
    options: t,
    updateOption: l,
    showErrors: a
}) {
    return t ? e.jsx(e.Fragment, {
        children: t.map((n, c) => e.jsxs("div", {
            className: k("flex flex-col gap-1.5", c > 0 && "mt-4"),
            children: [e.jsxs("div", {
                className: "flex items-center gap-1",
                children: [e.jsx("span", {
                    className: "text-sm font-medium capitalize",
                    children: he(n.label)
                }), n.type !== "dropdown" && n.selected_option_id && e.jsxs(e.Fragment, {
                    children: [e.jsx(b, {
                        id: "6JW/+Y",
                        defaultMessage: "•"
                    }), e.jsx("span", {
                        className: "text-token-text-secondary text-sm",
                        children: he(n.options.find(s => s.id === n.selected_option_id) ? .label)
                    })]
                })]
            }), n.type === "swatch" ? e.jsx(jt, {
                options: n.options,
                onSelect: (s, i) => l(n.id, s, i)
            }) : n.type === "pill" ? e.jsx(yt, {
                options: n.options,
                onSelect: (s, i) => l(n.id, s, i)
            }) : e.jsx(bt, {
                options: n.options,
                onSelect: (s, i) => l(n.id, s, i),
                isErrored: a && !n.selected_option_id
            }), !n.selected_option_id && a && e.jsxs("div", {
                className: "text-token-interactive-label-danger-secondary-default flex items-center gap-1 text-sm",
                children: [e.jsx(Re, {
                    className: "icon-sm"
                }), e.jsx(b, {
                    id: "UsAVv3",
                    defaultMessage: "Choose an option"
                })]
            })]
        }, n.id))
    }) : null
}
export {
    ht as F, Pt as I, Dt as P, At as a, Ft as b, Rt as c, re as g, oe as s, ft as u, st as w
};
//# sourceMappingURL=f4222f0c-ewt1xsvd3vb8cf7q.js.map