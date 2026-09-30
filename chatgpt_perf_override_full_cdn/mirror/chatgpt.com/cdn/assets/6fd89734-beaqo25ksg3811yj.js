import {
    cq as w,
    zb as P,
    zc as x,
    jp as I,
    D as n,
    R as f
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    kT as y,
    cx as q,
    hM as B
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    T as C
} from "./e8eebcb1-hl1q1mqbpavqpner.js";
import {
    g as M
} from "./6fd89734-ghfoi7e1ajqagqxe.js";
const h = w(e => ({
    abortController: null,
    setAbortController: t => e({
        abortController: t
    }),
    codexAutoTopUpEnabled: null,
    setCodexAutoTopUpEnabled: t => e({
        codexAutoTopUpEnabled: t
    }),
    isRunningServerUpdate: !1,
    isPlanSelectionPending: !1,
    setIsRunningServerUpdate: t => e({
        isRunningServerUpdate: t
    }),
    setIsPlanSelectionPending: t => e({
        isPlanSelectionPending: t
    }),
    subscribeButtonContainer: null,
    setSubscribeButtonContainer: t => e({
        subscribeButtonContainer: t
    }),
    celebrationBannerText: null,
    setCelebrationBannerText: t => e({
        celebrationBannerText: t
    }),
    checkoutSessionUpdateError: null,
    setCheckoutSessionUpdateError: t => e({
        checkoutSessionUpdateError: t
    })
}));
var O = {};
const j = 30;

function V({
    amountMinorUnits: e,
    currency: t,
    maximumFractionDigits: r
}) {
    const a = x(t),
        s = e / Math.pow(10, a);
    return new Intl.NumberFormat(void 0, {
        style: "currency",
        currency: t,
        maximumFractionDigits: r
    }).format(s)
}

function W({
    amountMinorUnits: e,
    country: t
}) {
    const r = t && y[t] ? q({
        inclusive: !1,
        amount: e,
        taxPercent: y[t]
    }) : 0;
    return e + r
}
var S = (e => (e.CODEX = "codex", e.SORA = "oiw216z", e.OPERATOR = "vza493q", e.STUDENTS = "students", e))(S || {});
const Y = {
    codex: "/codex",
    oiw216z: `${O.VITE_OIW216Z_SERVICE_URL??"https://sora.com"}/subscription`,
    vza493q: P,
    students: M(!0)
};

function F(e) {
    return typeof e != "string" ? !1 : Object.values(S).includes(e)
}
async function H({
    checkout: e,
    processorEntity: t,
    planName: r,
    priceInterval: a,
    seatQuantity: s,
    promoCode: l,
    promoCampaign: i,
    annualBillingPlan: u,
    intl: o,
    currency: c
}) {
    if (!e) return;
    const {
        setIsRunningServerUpdate: d,
        abortController: m,
        setAbortController: A,
        setCelebrationBannerText: k,
        setCheckoutSessionUpdateError: _
    } = h.getState();
    _(null), n.addAction("update-business-checkout-session.initiated"), m ? .abort();
    const p = new AbortController;
    A(p);
    try {
        await e.runServerUpdate(async () => {
            d(!0), await f.safePost("/payments/checkout/update", {
                requestBody: {
                    checkout_session_id: e.id,
                    processor_entity: t,
                    plan_name: r,
                    price_interval: a,
                    seat_quantity: s,
                    promo_code: l,
                    promo_campaign: i ? {
                        promo_campaign_id: i,
                        is_coupon_from_query_param: !1
                    } : void 0
                },
                signal: p.signal
            })
        });
        const g = T => o.formatNumber(T, {
                style: "currency",
                currency: c,
                currencyDisplay: "narrowSymbol",
                trailingZeroDisplay: "stripIfInteger"
            }),
            {
                monthlyCost: v,
                discountedMonthlyCost: E,
                currencySign: U,
                currencyCode: R
            } = u,
            b = (v - E) * s;
        k(a === "year" ? o.formatMessage(B.businessAnnualPlanSavingsAmount, {
            currencyCode: o.formatMessage(R),
            currencySign: o.formatMessage(U),
            savingsAmountMonthly: g(b),
            savingsAmountYearly: g(b * 12)
        }) : null), n.addAction("update-business-checkout-session.success")
    } catch (g) {
        p.signal.aborted || (n.addAction("update-business-checkout-session.error"), _(!0), n.addError("[Checkout] could not update checkout session", {
            error: g
        }))
    } finally {
        p.signal.aborted || d(!1)
    }
}
async function X({
    autoTopUpEnabled: e,
    checkout: t,
    creditPurchaseQuantity: r,
    processorEntity: a
}) {
    if (!t) return "error";
    const {
        setIsRunningServerUpdate: s,
        abortController: l,
        setAbortController: i,
        setCheckoutSessionUpdateError: u
    } = h.getState();
    u(null), n.addAction("update-usage-based-checkout-session.initiated"), l ? .abort();
    const o = new AbortController;
    i(o);
    try {
        return await t.runServerUpdate(async () => {
            s(!0), await f.safePost("/payments/checkout/update", {
                requestBody: {
                    checkout_session_id: t.id,
                    processor_entity: a,
                    ...r != null ? {
                        credit_purchase_quantity: r
                    } : {},
                    ...e != null ? {
                        auto_top_up_enabled: e
                    } : {}
                },
                signal: o.signal
            })
        }), n.addAction("update-usage-based-checkout-session.success"), "success"
    } catch (c) {
        return o.signal.aborted ? "aborted" : (n.addAction("update-usage-based-checkout-session.error"), u(!0), n.addError("[Checkout] could not update usage-based checkout session", {
            error: c
        }), "error")
    } finally {
        o.signal.aborted || s(!1)
    }
}
async function Z({
    checkout: e,
    processorEntity: t,
    planName: r,
    priceInterval: a,
    discountCode: s,
    promoCampaign: l
}) {
    if (!e) return !1;
    const {
        setIsRunningServerUpdate: i,
        abortController: u,
        setAbortController: o,
        setCheckoutSessionUpdateError: c
    } = h.getState();
    c(null), n.addAction("update-individual-checkout-session.initiated"), u ? .abort();
    const d = new AbortController;
    o(d);
    try {
        return await e.runServerUpdate(async () => {
            i(!0), await f.safePost("/payments/checkout/update", {
                requestBody: {
                    checkout_session_id: e.id,
                    processor_entity: t,
                    plan_name: r,
                    price_interval: a,
                    seat_quantity: 1,
                    discount_code: s,
                    promo_campaign: l
                },
                signal: d.signal
            })
        }), n.addAction("update-individual-checkout-session.success"), !0
    } catch (m) {
        return d.signal.aborted || (n.addAction("update-individual-checkout-session.error"), c(!0), n.addError("[Checkout] could not update individual checkout session", {
            error: m,
            planName: r
        })), !1
    } finally {
        d.signal.aborted || i(!1)
    }
}
async function G({
    checkout: e,
    processorEntity: t,
    planName: r,
    promoCode: a
}) {
    if (!e) return !1;
    const {
        setIsRunningServerUpdate: s,
        abortController: l,
        setAbortController: i,
        setCheckoutSessionUpdateError: u
    } = h.getState();
    u(null), n.addAction("update-pro-checkout-session.initiated"), l ? .abort();
    const o = new AbortController;
    i(o);
    try {
        return await e.runServerUpdate(async () => {
            s(!0), await f.safePost("/payments/checkout/update", {
                requestBody: {
                    checkout_session_id: e.id,
                    processor_entity: t,
                    plan_name: r,
                    price_interval: "month",
                    seat_quantity: 1,
                    promo_code: a
                },
                signal: o.signal
            })
        }), n.addAction("update-pro-checkout-session.success"), !0
    } catch (c) {
        return o.signal.aborted || (n.addAction("update-pro-checkout-session.error"), u(!0), n.addError("[Checkout] could not update Pro checkout session", {
            error: c
        })), !1
    } finally {
        o.signal.aborted || s(!1)
    }
}
const $ = e => {
    const t = I(),
        r = e ? .[0];
    if (!r ? .recurring ? .interval) {
        n.addError(new Error("CheckoutDisclaimer: missing first line item recurring interval"), {
            feature: "checkout",
            component: "CheckoutDisclaimer",
            message: "Expected first Stripe line item with a recurring interval but none was found.",
            checkout_has_line_items: !!e ? .length,
            checkout_line_item_keys: r ? Object.keys(r) : void 0
        }), t.danger("We’re having trouble initializing your checkout right now. Please refresh the page and try again, or contact support if the problem persists.", {
            toastId: "checkout_disclaimer_missing_interval"
        });
        return
    }
    return {
        interval: r.recurring.interval === "month" ? C.FLEXIBLE : C.ANNUAL,
        quantity: r.quantity
    }
};
export {
    Y as C, j as D, S as a, h as b, Z as c, G as d, X as e, V as f, $ as g, W as h, F as i, H as u
};
//# sourceMappingURL=6fd89734-beaqo25ksg3811yj.js.map