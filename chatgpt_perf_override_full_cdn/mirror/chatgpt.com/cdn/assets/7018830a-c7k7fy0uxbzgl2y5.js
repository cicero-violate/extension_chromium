import {
    c as I,
    s as O
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    _ as i,
    za as P,
    x as m,
    L as T,
    E as b,
    y as v,
    wl as _
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    C as N,
    a as S,
    g as U
} from "./6cbb6eaf-hqe4w67ks2ili42q.js";
import {
    kS as A
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
const X = {
        $type: "protobuf_analytics_events.v1.ChatgptCheckoutPageShown"
    },
    L = {
        $type: "protobuf_analytics_events.v1.ChatgptCheckoutPrepareCheckoutSession"
    },
    y = {
        $type: "protobuf_analytics_events.v1.ChatgptCheckoutNavigateToCheckout"
    },
    J = {
        $type: "protobuf_analytics_events.v1.ChatgptCheckoutPaymentMethodInfoCompleted"
    },
    Z = {
        $type: "protobuf_analytics_events.v1.ChatgptCheckoutBillingAddressInfoCompleted"
    },
    tt = {
        $type: "protobuf_analytics_events.v1.ChatgptCheckoutSubscribeClickAttempt"
    },
    et = {
        $type: "protobuf_analytics_events.v1.ChatgptCheckoutPaymentInFormFailure"
    },
    ot = {
        $type: "protobuf_analytics_events.v1.ChatgptCheckoutPaymentSuccessPage"
    },
    at = {
        $type: "protobuf_analytics_events.v1.ChatgptCheckoutPaymentFailurePage"
    },
    nt = {
        $type: "protobuf_analytics_events.v1.ChatgptCodexCheckoutStartPageShown"
    },
    ct = {
        $type: "protobuf_analytics_events.v1.ChatgptCodexCheckoutIndividualLinkClicked"
    },
    st = {
        $type: "protobuf_analytics_events.v1.ChatgptCodexCheckoutRateCardClicked"
    },
    ut = {
        $type: "protobuf_analytics_events.v1.ChatgptCodexCheckoutCreditQuantitySubmitted"
    },
    rt = {
        $type: "protobuf_analytics_events.v1.ChatgptCodexCheckoutAutoTopUpSubmitted"
    },
    K = "1019211808",
    w = "2841184320",
    f = "is_india_custom_checkout_enabled",
    R = "3950229590",
    D = "enabled_custom_checkout_for_plus",
    M = "enabled_custom_checkout_for_go",
    H = "enabled_custom_checkout_for_pro",
    Y = "enabled_custom_checkout_for_team",
    F = "checkoutPromoCode",
    $ = "checkoutPromoCampaignId",
    x = "checkoutDiscountCode",
    Ct = "checkoutInOnboarding",
    it = "checkoutOnboardingReturnLocation",
    _t = "checkoutOnboardingSkipUpsell";

function B() {
    return m(R)
}

function G(t) {
    switch (t) {
        case _.PLUS:
            return D;
        case _.GO:
            return M;
        case _.PRO:
        case _.PROLITE:
            return H;
        case _.SELF_SERVE_BUSINESS:
            return Y;
        default:
            return null
    }
}

function q(t, a, s, u, d) {
    const n = a ? .toUpperCase(),
        r = n === A || n == null && s ? .toUpperCase() === P;
    if (u) return r ? m(w).get(f, !0) ? "custom" : "redirect" : "custom";
    const c = G(t);
    return c == null || !B().get(c, !0) ? "redirect" : r ? m(K).get(f, !1) ? "custom" : "redirect" : "custom"
}

function dt() {
    "use forget";
    const t = I.c(3),
        a = O(),
        s = W;
    let u;
    t[0] === Symbol.for("react.memo_cache_sentinel") ? (u = async function(c, e) {
        const o = { ...c,
                checkout_ui_mode: c.checkout_ui_mode ? ? (e ? .fromiOSWebview === !0 ? "redirect" : q(c.plan_name, c.billing_details ? .country, c.billing_details ? .currency, c.usage_based_workspace_credit_purchase_data != null))
            },
            {
                promoCampaignId: C
            } = s(o);
        return i.logStructuredEvent(L, {
            promoCampaignId: C,
            checkoutUiMode: o.checkout_ui_mode,
            planName: o.plan_name ? ? void 0
        }), await N.getCheckoutLink(o, {
            skipSentinelCheckout: e ? .skipSentinelCheckout,
            fromiOSWebview: e ? .fromiOSWebview
        })
    }, t[0] = u) : u = t[0];
    const d = u;
    let n;
    return t[1] !== a ? (n = {
        prepareCheckoutSession: d,
        navigateToCheckout: async function(e, o) {
            if (o ? .checkoutFrom && T.setItem(b.CheckoutFrom, o.checkoutFrom), "tag" in e) {
                const {
                    promoCampaignId: C
                } = s(o ? .checkoutPayload), h = S(e);
                i.logStructuredEvent(y, {
                    checkoutId: h,
                    promoCampaignId: C,
                    checkoutResponseTag: e.tag,
                    planName: o ? .checkoutPayload ? .plan_name ? ? void 0
                }), await Promise.all([v(), i.flushStructuredEvents()]);
                t: switch (e.tag) {
                    case "hosted_checkout_session":
                    case "redirect_to_portal":
                        {
                            window.location.href = e.url;
                            break t
                        }
                    case "custom_checkout_session":
                        {
                            const p = e.processor_entity,
                                l = e.checkout_session_id,
                                {
                                    discountCode: k,
                                    promoCode: g,
                                    promoCampaignId: E
                                } = s(o ? .checkoutPayload);await a({
                                pathname: U(p, l),
                                search: o ? .searchParams ? ? "",
                                hash: ""
                            }, {
                                state: { ...o ? .state,
                                    ...g ? {
                                        [F]: g
                                    } : {},
                                    ...k ? {
                                        [x]: k
                                    } : {},
                                    ...E ? {
                                        [$]: E
                                    } : {}
                                }
                            })
                        }
                }
            } else if (e.url) {
                const {
                    promoCampaignId: C
                } = s(o ? .checkoutPayload), h = S(e);
                i.logStructuredEvent(y, {
                    checkoutId: h,
                    promoCampaignId: C,
                    checkoutResponseTag: "missing_tag",
                    planName: o ? .checkoutPayload ? .plan_name ? ? void 0
                }), await Promise.all([v(), i.flushStructuredEvents()]), window.location.href = e.url
            } else throw new Error("Received invalid response from /checkout")
        }
    }, t[1] = a, t[2] = n) : n = t[2], n
}

function W(t) {
    const a = t ? .discount_code,
        s = a && "promo_code" in a ? a.promo_code : void 0,
        u = a && "referral_code" in a ? a.referral_code : void 0,
        d = t ? .promo_code ? ? void 0,
        n = t ? .promo_campaign,
        r = n && typeof n == "object" ? n.promo_campaign_id : typeof n == "string" ? n : void 0;
    return {
        discountCode: a,
        promoCode: s ? ? u ? ? d ? ? void 0,
        promoCampaignId: r
    }
}
export {
    ot as C, nt as a, ct as b, at as c, _t as d, it as e, Ct as f, st as g, tt as h, ut as i, rt as j, et as k, J as l, Z as m, F as n, $ as o, x as p, X as q, dt as u
};
//# sourceMappingURL=7018830a-c7k7fy0uxbzgl2y5.js.map