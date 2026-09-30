import {
    c as nt,
    u as at,
    j as A,
    r as k
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    ln as ot,
    pZ as rt,
    p_ as st,
    hV as z,
    i9 as ct,
    hW as it
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    e as dt,
    x as Q,
    af as L,
    w7 as ut,
    mR as lt,
    cN as W,
    ef as B,
    K as Z,
    mU as tt,
    _ as j,
    CJ as _t,
    CK as G,
    CL as pt,
    CM as ft,
    CN as Et,
    CO as Tt,
    CP as D,
    CQ as gt,
    CR as ht,
    CS as vt,
    CT as Pt,
    CU as Ct,
    CV as mt
} from "./4813494d-javwxs2rmzsrunl2.js";
const jt = e => e ? .reduce((n, a) => (a.selected_option_id && (n[a.id] = a.options.find(o => o.id === a.selected_option_id)), n), {}) ? ? {},
    Yt = e => !e.variants ? .length || e.variants.every(t => t.selected_option_id),
    It = 20,
    Rt = 100;

function Nt({
    rating: e,
    numReviews: t,
    intl: n,
    includeNum: a = !1
}) {
    if (t != null && t < It) return null;
    const o = a && t && t > Rt && n.formatNumber(t, {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1
    });
    if (e == null) return null;
    const T = n.formatNumber(e, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    });
    return a && o ? `${T} (${o})` : T
}
const K = " · ",
    J = " ";

function Lt(e) {
    "use forget";
    const t = nt.c(38),
        {
            product: n,
            includeNum: a,
            includeEndDelimiter: o,
            includeMidDelimiter: T,
            isInline: u,
            wrapperClass: E,
            iconSize: P
        } = e,
        d = a === void 0 ? !1 : a,
        p = o === void 0 ? !1 : o,
        w = T === void 0 ? !1 : T,
        m = u === void 0 ? !1 : u,
        g = P === void 0 ? "medium" : P,
        N = !dt(yt),
        f = w && !N,
        h = at();
    let l;
    t[0] !== n.popularity_metadata ? .product_tags ? (l = n.popularity_metadata ? .product_tags ? .includes("popular") ? ? !1, t[0] = n.popularity_metadata ? .product_tags, t[1] = l) : l = t[1];
    const y = l;
    let I;
    if (t[2] !== y) {
        const U = Q("2128165686");
        I = y && U.get("render_product_tags_v1", !1), t[2] = y, t[3] = I
    } else I = t[3];
    const O = I,
        M = n.rating != null;
    let x;
    t[4] !== d || t[5] !== h || t[6] !== n.num_reviews || t[7] !== n.rating ? (x = Nt({
        rating: n.rating,
        numReviews: n.num_reviews,
        intl: h,
        includeNum: d
    }), t[4] = d, t[5] = h, t[6] = n.num_reviews, t[7] = n.rating, t[8] = x) : x = t[8];
    const V = x,
        b = V && M;
    if (!O && !b) return null;
    const F = m ? "inline-flex items-center font-normal" : "inline-block w-full items-center font-normal",
        S = N && "tracking-tight";
    let c;
    t[9] !== S || t[10] !== F || t[11] !== E ? (c = L(E, F, S), t[9] = S, t[10] = F, t[11] = E, t[12] = c) : c = t[12];
    let _;
    t[13] !== g || t[14] !== h || t[15] !== O ? (_ = O && A.jsx("span", {
        children: A.jsxs("span", {
            className: "inline-block text-nowrap",
            children: [A.jsx(ut, {
                className: L("mb-0.5 inline-block", g === "small" ? "size-3" : "size-4")
            }), J, A.jsx("span", {
                children: h.formatMessage({
                    id: "search.product.popular",
                    defaultMessage: "Popular"
                })
            })]
        })
    }), t[13] = g, t[14] = h, t[15] = O, t[16] = _) : _ = t[16];
    let C;
    t[17] !== f || t[18] !== O || t[19] !== b ? (C = f && O && b && A.jsx("span", {
        children: K
    }), t[17] = f, t[18] = O, t[19] = b, t[20] = C) : C = t[20];
    let i;
    t[21] !== f || t[22] !== O || t[23] !== b ? (i = !f && O && b && A.jsx("span", {
        children: J
    }), t[21] = f, t[22] = O, t[23] = b, t[24] = i) : i = t[24];
    let r;
    t[25] !== g || t[26] !== V || t[27] !== b ? (r = b && V && A.jsxs("span", {
        className: "text-nowrap",
        children: [A.jsx(ot, {
            className: L("me-1 mb-[0.1875rem] inline-block", g === "small" ? "size-3" : "size-4")
        }), V]
    }), t[25] = g, t[26] = V, t[27] = b, t[28] = r) : r = t[28];
    let v;
    t[29] !== p ? (v = p && A.jsx("span", {
        className: "mb-1",
        children: K
    }), t[29] = p, t[30] = v) : v = t[30];
    let s;
    return t[31] !== c || t[32] !== _ || t[33] !== C || t[34] !== i || t[35] !== r || t[36] !== v ? (s = A.jsxs("span", {
        className: c,
        children: [_, C, i, r, v]
    }), t[31] = c, t[32] = _, t[33] = C, t[34] = i, t[35] = r, t[36] = v, t[37] = s) : s = t[37], s
}

function yt() {
    return lt()
}
const Ot = "pdp_version";

function bt(e, t = {}) {
    return { ...t,
        [Ot]: e
    }
}
const H = new Map;

function $(e, t) {
    return e ? t ? { ...e,
        ...t,
        data: { ...e.data ? ? {},
            ...t.data ? ? {}
        }
    } : e : t
}
async function $t({
    productLookupKey: e
}) {
    const t = z(`${Z}/search/product_info_variants`, {
        method: "POST",
        headers: { ...B({
                isAuthOptional: !0
            })
        },
        body: {
            product_lookup_key: e
        },
        routeName: "/search/product_info_variants"
    });
    let n;
    for await (const a of t)
    "data" in a && (n = a.data);
    return n
}
const q = new Map,
    St = () => {};

function qt({
    clientThreadId: e,
    messageId: t,
    product: n,
    isInitialLoad: a
}) {
    const o = W(e) ? ? e,
        u = St() ? .persist_conversation_to_user === !0,
        P = Q("2128165686").get("generic_product_info_enabled", !1),
        d = X({
            conversationId: o,
            messageId: t,
            productQuery: n.title
        }),
        p = [o, t, n.title].join(":"),
        [w, m] = k.useState(H.get(p) ? .productReviews),
        [g, R] = k.useState(H.get(p) ? .productRationale),
        [N, f] = k.useState(H.get(p) ? .__debug),
        [h, l] = k.useState(q.get(d)),
        [y, I] = k.useState(!1),
        [O, M] = k.useState(!0),
        x = k.useRef(null);
    return k.useEffect(() => {
        async function V({
            profiler: S,
            conversationId: c,
            messageId: _,
            productQuery: C,
            productLookupKey: i,
            isGenericProductSidebarEnabled: r,
            updatePartial: v
        }) {
            for await (const s of Dt({
                conversationId: c,
                messageId: _,
                productQuery: C,
                productLookupKey: i,
                isGenericProductSidebarEnabled: r,
                persistConversationToUser: u
            })) if (s.type !== "message") switch (s.type) {
                case "product_reviews":
                    {
                        m(s),
                        v({
                            productReviews: s
                        }),
                        S.logTimingOnce("time_to_first_review"),
                        I(!1);
                        break
                    }
                case "product_rationale":
                    {
                        R(s),
                        v({
                            productRationale: s
                        }),
                        S.logTimingOnce("time_to_rationale"),
                        I(!1);
                        break
                    }
                case "__debug":
                    {
                        v({
                            __debug: s
                        }),
                        f(U => $(U, s) ? ? s);
                        break
                    }
            }
            I(!1)
        }
        async function b({
            profiler: S,
            productQuery: c,
            productLookupKey: _,
            updatePartial: C
        }) {
            for await (const i of wt({
                productQuery: c,
                productLookupKey: _
            })) switch (i.type) {
                case "product_entity":
                    {
                        if (d === x.current) {
                            const r = { ...i,
                                product: { ...i.product,
                                    product_lookup_key: { ...i.product.product_lookup_key,
                                        variant_options_query: _ ? .variant_options_query
                                    }
                                }
                            };
                            C({
                                productEntity: r
                            }), l(r), M(!1), S.logTimingOnce("time_to_product_entity")
                        }
                        break
                    }
                case "__debug":
                    {
                        const r = { ...i,
                            data: { ...i.data ? ? {},
                                ...i.data ? .sonic_thread_id ? {
                                    product_update_sonic_thread_id: i.data.sonic_thread_id
                                } : {}
                            }
                        };C({
                            __debug: r
                        }),
                        f(v => $(v, r) ? ? r);
                        break
                    }
            }
        }
        async function F({
            conversationId: S,
            messageId: c,
            productQuery: _,
            productLookupKey: C
        }) {
            const i = new rt(st.ProductSidebar, {
                context: bt("v1", {
                    version: "v2"
                })
            });
            let r = {};

            function v(s) {
                const U = r.__debug;
                r = { ...r,
                    ...s
                }, s.__debug && (r.__debug = $(U, s.__debug))
            }
            try {
                a && I(!0), await Promise.allSettled([V({
                    profiler: i,
                    conversationId: S,
                    messageId: c,
                    productQuery: _,
                    productLookupKey: C,
                    isGenericProductSidebarEnabled: P,
                    updatePartial: v
                }), b({
                    profiler: i,
                    productQuery: _,
                    productLookupKey: C,
                    updatePartial: v
                })])
            } finally {
                a && i.logTimingOnce("sidebar_loaded"), d === x.current && (x.current = null, M(!1));
                const {
                    productReviews: s,
                    productRationale: U,
                    __debug: Y
                } = r;
                (s || U || Y) && H.set(p, { ...H.get(p) ? ? {},
                    ...s && {
                        productReviews: s
                    },
                    ...U && {
                        productRationale: U
                    },
                    ...Y && {
                        __debug: Y
                    }
                }), r.productEntity !== void 0 && q.set(X({
                    conversationId: S,
                    messageId: c,
                    productQuery: _
                }), r.productEntity)
            }
        }(async function() {
            const c = H.get(p);
            c && (c.productReviews && m(c.productReviews), c.productRationale && R(c.productRationale), c.__debug && f(c.__debug));
            const _ = q.get(d);
            if (_) {
                l(_), M(!1);
                return
            }
            o && t && x.current !== d && (x.current = d, await F({
                conversationId: o,
                messageId: t,
                productQuery: n.title,
                productLookupKey: n.product_lookup_key
            }))
        })()
    }, [t, n.title, d, o, a, P]), {
        productInfo: {
            productReviews: w,
            productRationale: g,
            productEntity: h,
            __debug: N
        },
        isLoadingReviewsOrRationale: y,
        isLoadingProductEntity: O,
        isCached: H.has(p)
    }
}
async function* Dt({
    conversationId: e,
    messageId: t,
    productQuery: n,
    productLookupKey: a,
    isGenericProductSidebarEnabled: o,
    persistConversationToUser: T,
    rewrittenQueries: u
}) {
    const E = !!a ? .variant_options_query,
        d = { ...{
                conversation_id: e,
                message_id: t,
                supported_encodings: [ct.V1]
            },
            ...o && !E ? {
                category: "generic_entity",
                generic_entity_params: {
                    name: n,
                    category: "product_rationale_and_reviews",
                    ...a || u ? {
                        extra_params: { ...a ? {
                                product_lookup_key: a
                            } : {},
                            ...u ? {
                                rewritten_queries: u
                            } : {}
                        }
                    } : {}
                }
            } : {
                category: "product",
                product_params: {
                    product_query: n,
                    ...a ? {
                        product_lookup_key: a
                    } : {}
                }
            }
        },
        p = z(`${Z}/sidebar/conversation`, {
            method: "POST",
            headers: { ...B({
                    isAuthOptional: !0
                }),
                "Content-Type": "application/json"
            },
            body: d,
            routeName: "/sidebar/conversation"
        });
    let w = !1;
    for await (const m of it(p)) {
        if (!("data" in m)) continue;
        const {
            type: g,
            data: R
        } = m.data;
        if (!w && g === "__debug") w = !0, yield {
            type: "__debug",
            data: {
                conversation_link: `/c/${R.conversation_id}`,
                ...R.thread_id ? {
                    sidebar_conversation_sonic_thread_id: R.thread_id
                } : {}
            }
        };
        else if (g === "message") {
            const N = R;
            yield {
                type: "message",
                data: N
            };
            const f = N.metadata ? .content_references;
            if (!f) continue;
            for (const h of f) {
                const l = h;
                if (!(a ? .variant_options_query && l.type === "product_entity" && !l.product.variants)) switch (l.type) {
                    case "product_reviews":
                    case "product_rationale":
                        yield l;
                        break;
                    default:
                        continue
                }
            }
        }
    }
}
async function* wt({
    productQuery: e,
    productLookupKey: t
}) {
    const n = z(`${Z}/search/product_update`, {
        method: "POST",
        headers: { ...B({
                isAuthOptional: !0
            }),
            "Content-Type": "application/json"
        },
        body: {
            product_query: e,
            ...t ? {
                product_lookup_key: t
            } : {}
        },
        routeName: "/search/product_update"
    });
    for await (const a of n)
    "data" in a && (yield a.data)
}

function X({
    conversationId: e,
    messageId: t,
    productQuery: n
}) {
    return [e, t, n].join(":")
}
var xt = (e => (e.Products = "products", e.ProductEntity = "product_entity", e.ComparisonTableProductEntity = "comparison_table_product_entity", e.HeroProductEntity = "hero_product_entity", e.RichProductEntity = "rich_product_entity", e.Unrecognized = "unrecognized", e))(xt || {});

function At(e, t) {
    switch (e) {
        case "products":
            switch (t) {
                case D.CHATGPT_PRODUCT_INTERACTION_EVENT_TYPE_CLICKED:
                    return mt;
                case D.CHATGPT_PRODUCT_INTERACTION_EVENT_TYPE_SHOWN:
                    return Ct;
                case D.CHATGPT_PRODUCT_INTERACTION_EVENT_TYPE_UNSPECIFIED:
                case D.UNRECOGNIZED:
                    return null;
                default:
                    return t
            }
        case "product_entity":
        case "comparison_table_product_entity":
        case "hero_product_entity":
        case "rich_product_entity":
            switch (t) {
                case D.CHATGPT_PRODUCT_INTERACTION_EVENT_TYPE_CLICKED:
                    return Pt;
                case D.CHATGPT_PRODUCT_INTERACTION_EVENT_TYPE_SHOWN:
                    return vt;
                case D.CHATGPT_PRODUCT_INTERACTION_EVENT_TYPE_UNSPECIFIED:
                case D.UNRECOGNIZED:
                    return null;
                default:
                    return t
            }
        case "unrecognized":
            return null;
        default:
            return e
    }
}

function Ut(e) {
    switch (e) {
        case D.CHATGPT_PRODUCT_INTERACTION_EVENT_TYPE_CLICKED:
            return ht;
        case D.CHATGPT_PRODUCT_INTERACTION_EVENT_TYPE_SHOWN:
            return gt;
        case D.CHATGPT_PRODUCT_INTERACTION_EVENT_TYPE_UNSPECIFIED:
        case D.UNRECOGNIZED:
            return null;
        default:
            return e
    }
}

function kt(e) {
    const {
        productInteractionEventType: t,
        clientThreadId: n,
        productId: a,
        productEventUuid: o,
        productIndex: T,
        productTitle: u,
        contentReferenceType: E,
        messageId: P,
        productUrl: d,
        productMerchants: p,
        contentReferenceStartIndex: w,
        productProvider: m,
        hasPopularTag: g
    } = e, R = n ? W(n) : void 0, N = d ? tt(d) ? ? void 0 : void 0, f = P && w != null ? `${P}-${w}` : void 0, h = Ut(t), l = At(E, t), y = {
        conversationId: R,
        productId: a,
        productEventUuid: o,
        productIndex: T,
        productUrl: d,
        productTitle: u,
        productHostname: N,
        productMerchants: p,
        contentReferenceType: E,
        messageId: P,
        turnIndex: void 0,
        turnId: void 0,
        contentReferenceId: f,
        productProvider: m,
        hasPopularTag: g
    }, I = {
        type: t,
        ...y
    };
    l != null && j.logStructuredEvent(l, y), h != null && j.logStructuredEvent(h, y), j.logStructuredEvent(Tt, I)
}

function et(e, t) {
    return !!e.popularity_metadata ? .product_tags.includes(t)
}

function zt({
    productInteractionEventType: e,
    clientThreadId: t,
    contentReferenceType: n,
    messageId: a,
    product: o,
    productIndex: T,
    contentReferenceStartIndex: u
}) {
    try {
        return kt({
            productInteractionEventType: e,
            clientThreadId: t,
            productIndex: T,
            productId: o.id,
            productEventUuid: o.product_event_uuid ? ? void 0,
            productUrl: o.url,
            productTitle: o.title,
            productMerchants: o.merchants ? ? void 0,
            contentReferenceType: n,
            messageId: a,
            contentReferenceStartIndex: u,
            productProvider: o.metadata_sources ? .[0] ? ? void 0,
            hasPopularTag: et(o, "popular")
        })
    } catch {}
}

function Wt({
    productOfferInteractionEventType: e,
    clientThreadId: t,
    contentReferenceType: n,
    messageId: a,
    product: o,
    offerIndex: T,
    offer: u,
    offerCount: E,
    contentReferenceStartIndex: P
}) {
    try {
        return Ht({
            productOfferInteractionEventType: e,
            clientThreadId: t,
            offerIndex: T,
            offerUrl: u ? .url,
            offerMerchantName: u ? .merchant_name,
            offerCount: E,
            productId: o.id,
            productUrl: o.url,
            productTitle: o.title,
            productMerchants: o.merchants ? ? void 0,
            contentReferenceType: n,
            contentReferenceStartIndex: P,
            messageId: a,
            hasPopularTag: et(o, "popular")
        })
    } catch {}
}

function Vt(e) {
    switch (e) {
        case G.CHATGPT_PRODUCT_OFFER_INTERACTION_EVENT_TYPE_OFFER_CLICKED:
            return Et;
        case G.CHATGPT_PRODUCT_OFFER_INTERACTION_EVENT_TYPE_OFFER_SHOWN:
            return ft;
        case G.CHATGPT_PRODUCT_OFFER_INTERACTION_EVENT_TYPE_OFFER_LIST_SHOWN:
            return pt;
        case G.CHATGPT_PRODUCT_OFFER_INTERACTION_EVENT_TYPE_UNSPECIFIED:
        case G.UNRECOGNIZED:
            return null;
        default:
            return e
    }
}

function Ht(e) {
    const {
        productOfferInteractionEventType: t,
        clientThreadId: n,
        productId: a,
        productTitle: o,
        contentReferenceType: T,
        contentReferenceStartIndex: u,
        messageId: E,
        offerIndex: P,
        offerUrl: d,
        offerMerchantName: p,
        offerCount: w,
        productUrl: m,
        productMerchants: g,
        hasPopularTag: R
    } = e, N = n ? W(n) : void 0, f = m ? tt(m) ? ? void 0 : void 0, h = E && u != null ? `${E}-${u}` : void 0, l = Vt(t), y = {
        conversationId: N,
        productId: a,
        productUrl: m,
        productTitle: o,
        productHostname: f,
        productMerchants: g,
        offerIndex: P,
        offerUrl: d,
        offerMerchantName: p,
        offerCount: w,
        messageId: E,
        turnIndex: void 0,
        turnId: void 0,
        contentReferenceType: T,
        contentReferenceId: h,
        hasPopularTag: R
    }, I = {
        type: t,
        ...y
    };
    l != null && j.logStructuredEvent(l, y), j.logStructuredEvent(_t, I)
}
export {
    xt as P, Lt as a, Dt as b, bt as c, Wt as d, Nt as e, $t as f, jt as g, Yt as i, zt as l, wt as r, qt as u
};
//# sourceMappingURL=aaa2d182-da7hz3gf5lvb4501.js.map