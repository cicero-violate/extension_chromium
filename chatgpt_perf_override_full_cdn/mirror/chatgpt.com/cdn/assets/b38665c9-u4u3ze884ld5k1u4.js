import {
    x as $,
    d,
    bN as u,
    cW as l,
    b9 as i,
    a$ as o,
    th as S,
    dw as I,
    q as E,
    cO as v,
    cX as z
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    pZ as F,
    p_ as O,
    bo as T,
    ua as m,
    q0 as j
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    g as J
} from "./19334654-hpjwwuuf9gjvwupj.js";
import {
    c as L,
    r as M,
    b as G
} from "./aaa2d182-da7hz3gf5lvb4501.js";
import "./2340486e-dvd8m80i7d6hyild.js";

function W(e) {
    return $("2128165686", e).get("pdp_v2_enabled", !1)
}

function X(e) {
    return $("2128165686", e).get("pdp_v2_prewarm_enabled", !1)
}

function Le(e) {
    return $("2128165686", e).get("pdp_v2_offers_prewarm_enabled", !1)
}

function Z(e) {
    return $("2128165686", e).get("pdp_initial_visible_offers", 3)
}

function Ve(e) {
    return {
        isPdpV2Enabled: W(e),
        isPdpPrewarmEnabled: X(e),
        initialVisibleOfferCount: Z(e)
    }
}
class Y {
    rationale$ = d(void 0);
    reviews$ = d(void 0);
    debug$ = d(void 0);
    loading$ = d(!1);
    status$ = d("idle");
    requestToken$ = d(null);
    error$ = d(void 0);
    requestKey = null;
    inFlightPromise = null;
    profiler = null;
    ensureStarted(t) {
        return u(() => this.loading$() && this.requestKey === t.requestKey) ? this.inFlightPromise ? ? Promise.resolve() : u(() => this.status$() === "success" && this.requestKey === t.requestKey) ? Promise.resolve() : this.start(t)
    }
    start(t) {
        const r = V();
        this.requestKey = t.requestKey, this.profiler = new F(O.ProductSidebar, {
            context: L("v2")
        }), l(() => {
            this.loading$.set(!0), this.status$.set("loading"), this.requestToken$.set(r), this.error$.set(void 0)
        });
        const s = this.run(r, t);
        return this.inFlightPromise = s, s
    }
    async run(t, r) {
        try {
            for await (const n of r.requestFn({
                conversationId: r.conversationId,
                messageId: r.messageId,
                shellProduct: r.shellProduct,
                productLookupKey: r.productLookupKey,
                rewrittenQueries: r.rewrittenQueries
            })) switch (n.type) {
                case "product_rationale":
                    l(() => {
                        this.rationale$.set(n)
                    }), this.profiler ? .logTimingOnce("time_to_rationale");
                    break;
                case "product_reviews":
                    l(() => {
                        this.reviews$.set(n)
                    }), this.profiler ? .logTimingOnce("time_to_first_review");
                    break;
                case "__debug":
                    l(() => {
                        this.debug$.set(x(this.debug$(), n))
                    });
                    break;
                default:
                    break
            }
            u(() => this.requestToken$() === t) && l(() => {
                this.loading$.set(!1), this.status$.set("success")
            })
        } catch (s) {
            throw u(() => this.requestToken$() === t) && l(() => {
                this.loading$.set(!1), this.status$.set("error"), this.error$.set(s)
            }), s
        } finally {
            u(() => this.requestToken$() === t) && l(() => {
                this.requestToken$.set(null)
            }), this.inFlightPromise != null && (this.inFlightPromise = null)
        }
    }
}
class ee {
    constructor(t) {
        this.deps = t
    }
    entity$ = d(void 0);
    debug$ = d(void 0);
    loading$ = d(!1);
    status$ = d("idle");
    requestToken$ = d(null);
    error$ = d(void 0);
    requestKey = null;
    inFlightPromise = null;
    profiler = null;
    ensureStarted(t) {
        return u(() => this.loading$() && this.requestKey === t.requestKey) ? this.inFlightPromise ? ? Promise.resolve() : u(() => this.status$() === "success" && this.requestKey === t.requestKey) ? Promise.resolve() : this.start(t)
    }
    start(t) {
        const r = V();
        this.requestKey = t.requestKey, this.profiler = new F(O.ProductSidebar, {
            context: L("v2")
        }), l(() => {
            this.loading$.set(!0), this.status$.set("loading"), this.requestToken$.set(r), this.error$.set(void 0)
        });
        const s = this.run(r, t);
        return this.inFlightPromise = s, s
    }
    async run(t, r) {
        try {
            for await (const n of r.requestProductEntity({
                conversationId: r.conversationId,
                messageId: r.messageId,
                shellProduct: r.shellProduct,
                productLookupKey: r.productLookupKey
            })) if (u(() => this.requestToken$() === t)) switch (n.type) {
                case "product_entity":
                    {
                        const a = this.deps.normalizeProductEntityCitation(n, r.productLookupKey);l(() => {
                            this.entity$.set(a)
                        }),
                        this.profiler ? .logTimingOnce("time_to_product_entity"),
                        this.deps.applyProductEntityUpdate({
                            conversation: r.conversation,
                            shellProduct: r.shellProduct,
                            nextProduct: a.product
                        });
                        break
                    }
                case "__debug":
                    l(() => {
                        this.debug$.set(x(this.debug$(), te(n)))
                    });
                    break;
                default:
                    break
            }
            u(() => this.requestToken$() === t) && l(() => {
                this.loading$.set(!1), this.status$.set("success")
            })
        } catch (s) {
            throw u(() => this.requestToken$() === t) && l(() => {
                this.loading$.set(!1), this.status$.set("error"), this.error$.set(s)
            }), s
        } finally {
            u(() => this.requestToken$() === t) && l(() => {
                this.requestToken$.set(null), this.inFlightPromise = null
            })
        }
    }
}

function V() {
    return `${Date.now()}:${Math.random().toString(36).slice(2)}`
}

function x(e, t) {
    return e ? t ? { ...e,
        ...t,
        data: { ...e.data,
            ...t.data
        }
    } : e : t
}

function te(e) {
    return { ...e,
        data: { ...e.data,
            ...e.data.sonic_thread_id ? {
                product_update_sonic_thread_id: e.data.sonic_thread_id
            } : {}
        }
    }
}
const xe = e => e ? .reduce((r, s) => (s.selected_option_id && (r[s.id] = s.options.find(n => n.id === s.selected_option_id)), r), {}) ? ? {},
    Ce = e => !e.variants ? .length || e.variants.every(t => t.selected_option_id),
    De = ({
        isCheckoutEnabled: e,
        isSwitchingVariant: t,
        isLoadingProductEntity: r
    }) => e && (t || r),
    re = e => e.filter(t => t.available),
    se = e => re(e)[0],
    ne = e => e[0],
    _ = i(e => o(() => {
        const t = T(e);
        if (m(t, "product_agent")) return t.product;
        if (m(t, "product")) {
            const {
                product: r
            } = J({
                thread: I(e),
                messageId: t.messageId,
                contentReferenceStartIndex: t.contentReferenceStartIndex,
                productIndex: t.productIndex
            });
            return r ? ? null
        }
        return null
    })),
    f = i(e => o(() => {
        const t = _(e);
        return t ? k(t) : null
    })),
    R = S((e, t) => d(null)),
    C = S((e, t) => d(-1)),
    q = S((e, t) => d(!1)),
    P = S((e, t) => new Y),
    K = S((e, t) => new ee({
        normalizeProductEntityCitation: ge,
        applyProductEntityUpdate: me
    })),
    b = i(e => o(() => {
        const t = f(e);
        return t == null ? null : $e(_(e), R(e, t)())
    })),
    ie = i(e => o(() => be({
        shellProduct: _(e),
        statefulProduct: b(e),
        hasFetchedVariant: ae(e)
    }))),
    Ae = i(e => o(() => Ke({
        shellProduct: _(e),
        statefulProduct: b(e),
        displayOffers: de(e),
        isCheckoutEnabled: E("3375735072")
    }))),
    Qe = i(e => o(() => {
        const t = f(e);
        return t == null ? -1 : C(e, t)()
    })),
    oe = i(e => o(() => {
        const t = f(e);
        if (t != null) return P(e, t).rationale$()
    })),
    ue = i(e => o(() => {
        const t = f(e);
        if (t != null) return P(e, t).reviews$()
    })),
    Be = i(e => o(() => {
        const t = f(e);
        if (t != null) return ke(K(e, t).debug$(), P(e, t).debug$())
    })),
    Ne = i(e => o(() => {
        const t = f(e);
        return t == null ? !1 : P(e, t).loading$()
    })),
    He = i(e => o(() => {
        const t = f(e);
        if (t != null) return K(e, t).entity$()
    })),
    Ue = i(e => o(() => {
        const t = f(e);
        return t == null ? !1 : K(e, t).loading$()
    })),
    ae = i(e => o(() => {
        const t = f(e);
        return t == null ? !1 : q(e, t)()
    })),
    ze = i(e => o(() => {
        const t = f(e),
            r = _(e),
            s = b(e);
        return t == null ? r ? .image_urls ? ? [] : we({
            shellProduct: r,
            statefulProduct: s,
            hasFetchedVariant: q(e, t)()
        })
    })),
    de = i(e => o(() => qe({
        shellProduct: _(e),
        statefulProduct: b(e)
    }))),
    je = i(e => o(() => {
        const t = T(e);
        if (!m(t, "product") && !m(t, "product_agent")) return [];
        const r = _(e),
            s = I(e);
        if (!r || !s) return [];
        const c = v.getNodeIfExists(s, t.messageId) ? .message ? .metadata ? .content_references ? ? [],
            a = new Set([r.id]),
            h = [];
        for (const p of c) {
            const g = p.type === "products" || p.type === "explore_more" ? p.products : p.type === "product" || p.type === "product_entity" ? [p.product] : [];
            for (const y of g) a.has(y.id) || (a.add(y.id), h.push(y))
        }
        return h
    })),
    Je = i(e => o(() => Se({
        displayTitle: ie(e),
        description: b(e) ? .description,
        rationale: oe(e) ? .rationale,
        reviewsSummary: ue(e) ? .summary
    }))),
    Me = i(e => o(() => {
        const t = T(e);
        return m(t, "product") ? {
            clientThreadId: e.id,
            messageId: t.messageId,
            turnIndex: t.turnIndex
        } : m(t, "product_agent") ? {
            clientThreadId: e.id,
            messageId: t.messageId,
            turnIndex: 0
        } : {
            clientThreadId: e.id
        }
    }, {
        equals: z
    }));

function ce(e, t) {
    const r = u(() => f(e));
    r != null && R(e, r).set(t)
}

function le(e, t, r) {
    const s = k(t);
    q(e, s).set(r)
}

function D(e, t, r) {
    const s = u(() => b(e) ? ? t);
    ce(e, r(s))
}

function Ge({
    conversation: e,
    shellProduct: t,
    updatedVariants: r,
    variantOptionsQuery: s,
    optionGroupId: n
}) {
    D(e, t, c => ve({
        currentProduct: c,
        updatedVariants: r,
        variantOptionsQuery: s,
        optionGroupId: n
    }))
}

function We({
    conversation: e,
    shellProduct: t,
    nextProduct: r,
    productLookupKey: s
}) {
    D(e, t, n => Ie({
        currentProduct: n,
        nextProduct: r,
        productLookupKey: s
    })), le(e, t, !0)
}

function Xe(e, t) {
    const r = u(() => f(e));
    r != null && l(() => {
        C(e, r).set(t)
    })
}

function k(e) {
    return e.id
}

function Ze({
    conversation: e,
    shellProduct: t,
    statefulProduct: r = t,
    conversationId: s,
    messageId: n,
    persistConversationToUser: c,
    requestProductInfo: a
}) {
    const h = k(t),
        p = r.product_lookup_key,
        g = u(() => Pe(e, n)),
        y = P(e, h),
        w = a ? ? (({
            conversationId: Q,
            messageId: B,
            shellProduct: N,
            productLookupKey: H,
            rewrittenQueries: U
        }) => G({
            conversationId: Q,
            messageId: B,
            productQuery: N.title,
            productLookupKey: H,
            isGenericProductSidebarEnabled: !0,
            persistConversationToUser: c,
            rewrittenQueries: U
        }));
    return y.ensureStarted({
        requestKey: fe({
            conversationId: s,
            messageId: n,
            shellProduct: t,
            productLookupKey: p,
            rewrittenQueries: g
        }),
        requestFn: w,
        conversationId: s,
        messageId: n,
        shellProduct: t,
        productLookupKey: p,
        rewrittenQueries: g
    })
}

function Ye({
    conversation: e,
    shellProduct: t,
    conversationId: r,
    messageId: s,
    requestProductEntity: n
}) {
    const c = k(t),
        a = t.product_lookup_key,
        h = pe({
            productId: t.id,
            productLookupKey: a
        }),
        p = K(e, c),
        g = n ? ? (({
            shellProduct: y,
            productLookupKey: w
        }) => M({
            productQuery: y.title,
            productLookupKey: w
        }));
    return p.ensureStarted({
        conversation: e,
        requestKey: h,
        requestProductEntity: g,
        conversationId: r,
        messageId: s,
        shellProduct: t,
        productLookupKey: a
    })
}

function fe({
    conversationId: e,
    messageId: t,
    shellProduct: r,
    productLookupKey: s,
    rewrittenQueries: n
}) {
    return JSON.stringify([e, t, r.id, s ? .variant_options_query ? ? null, n ? ? null])
}

function pe({
    productId: e,
    productLookupKey: t
}) {
    const r = ye(t);
    return JSON.stringify([e, r ? .known_ids ? ? null, r ? .metadata_sources ? ? null, t ? .variant_options_query ? ? null])
}

function he(e) {
    return typeof e == "object" && e != null
}

function ye(e) {
    if (!e ? .data) return null;
    try {
        const t = JSON.parse(e.data);
        return he(t) ? t : null
    } catch {
        return null
    }
}

function _e(e, t) {
    const r = [...e];
    for (const s of t) r.includes(s) || r.push(s);
    return r
}

function ge(e, t) {
    return { ...e,
        product: { ...e.product,
            product_lookup_key: { ...e.product.product_lookup_key,
                variant_options_query: t ? .variant_options_query
            }
        }
    }
}

function me({
    conversation: e,
    shellProduct: t,
    nextProduct: r
}) {
    const s = k(t);
    u(() => q(e, s)()) || R(e, s).set(r)
}

function $e(e, t) {
    return t == null ? e : e == null ? t : A({
        currentProduct: e,
        nextProduct: t
    })
}

function be({
    shellProduct: e,
    statefulProduct: t,
    hasFetchedVariant: r
}) {
    return r ? t ? .title ? ? e ? .title ? ? "" : e ? .title ? ? t ? .title ? ? ""
}

function Se({
    displayTitle: e,
    description: t,
    rationale: r,
    reviewsSummary: s
}) {
    return [e, t, r, s].filter(Boolean).join(`

`).trim()
}

function Pe(e, t) {
    const r = u(() => I(e));
    if (!r) return;
    let s = v.getNodeIfExists(r, t);
    for (; s;) {
        if (s.message.author.role === "assistant") {
            const n = s.message.metadata ? .shopping ? .rewritten_queries;
            if (Array.isArray(n)) {
                const c = n.filter(a => typeof a == "string" && a !== "");
                return c.length > 0 ? c : void 0
            }
        }
        if (!s.parentId) return;
        s = v.getNodeIfExists(r, s.parentId)
    }
}

function ke(e, t) {
    return e ? t ? { ...e,
        ...t,
        data: { ...e.data,
            ...t.data
        }
    } : e : t
}

function qe({
    shellProduct: e,
    statefulProduct: t
}) {
    const r = e ? .offers ? ? [],
        s = t ? .offers ? ? r,
        n = [...r];
    for (const c of s) {
        const a = n.findIndex(h => j(h, c));
        if (a === -1) {
            n.push(c);
            continue
        }
        n[a] = c
    }
    return n
}

function Ke({
    shellProduct: e,
    statefulProduct: t,
    displayOffers: r,
    isCheckoutEnabled: s
}) {
    const n = s ? t ? .offers ? ? e ? .offers ? ? [] : r;
    return se(n) ? ? ne(n)
}

function we({
    shellProduct: e,
    statefulProduct: t,
    hasFetchedVariant: r
}) {
    return r ? t ? .image_urls ? ? e ? .image_urls ? ? [] : _e(e ? .image_urls ? ? [], t ? .image_urls ? ? [])
}

function ve({
    currentProduct: e,
    updatedVariants: t,
    variantOptionsQuery: r,
    optionGroupId: s
}) {
    return { ...e,
        variants: t,
        product_lookup_key: { ...e.product_lookup_key,
            variant_options_query: r,
            last_variant_selection_group_id: s
        }
    }
}

function Ie({
    currentProduct: e,
    nextProduct: t,
    productLookupKey: r
}) {
    return A({
        currentProduct: e,
        nextProduct: { ...t,
            title: t.title || e.title,
            product_lookup_key: r
        }
    })
}

function A({
    currentProduct: e,
    nextProduct: t
}) {
    return { ...t,
        analytics_meta: t.analytics_meta ? ? e.analytics_meta,
        product_event_uuid: t.product_event_uuid ? ? e.product_event_uuid,
        url: t.url || e.url,
        popularity_metadata: t.popularity_metadata ? ? e.popularity_metadata,
        num_reviews: t.num_reviews ? ? e.num_reviews,
        rating: t.rating ? ? e.rating
    }
}

function et() {
    return $("2128165686").get("browse_enabled", !1)
}

function tt() {
    return $("2128165686").get("browse_descriptions_enabled", !1)
}

function rt() {
    return E("2550652417")
}
export {
    Ae as A, Qe as B, Ve as C, rt as D, Le as a, Ze as b, k as c, et as d, tt as e, Me as f, X as g, je as h, xe as i, Ce as j, b as k, de as l, Ge as m, We as n, oe as o, ue as p, Be as q, Ne as r, De as s, Ue as t, ie as u, Je as v, Ye as w, ze as x, He as y, Xe as z
};
//# sourceMappingURL=b38665c9-u4u3ze884ld5k1u4.js.map