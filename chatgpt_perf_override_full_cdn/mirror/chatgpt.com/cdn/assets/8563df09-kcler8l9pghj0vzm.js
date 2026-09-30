import {
    _ as P,
    S as h,
    A as _,
    R as y,
    D as E,
    L as S,
    E as b,
    z as f,
    wl as C
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    C as k
} from "./58c15f95-e3yoo2duc6sgaog5.js";
import {
    h$ as v,
    h_ as R
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    c as A
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    u as L,
    a as T
} from "./e3f71c51-lr1kx59sxbu52hj8.js";
async function w(t) {
    return y.safePost("/payments/checkout", {
        requestBody: t,
        additionalHeaders: v(null, null, null, await R("chatgpt_checkout").catch(s => {
            E.addError(s)
        }))
    })
}
async function U(t, s, o, a) {
    P.logEvent("Account Pay: Payment Checkout Clicked", s), h.logEvent("chatgpt_account_payment_modal_upgrade_button_click", _.PLUS);
    const e = await w({
        entry_point: k.REFERRAL_REDIRECT,
        plan_name: "chatgptplusplan",
        billing_details: t,
        ...o && {
            student_verification_id: o
        },
        ...a && {
            veterans_verification_id: a
        }
    });
    P.logEvent("Account Pay: Navigating to Payment Checkout", { ...s,
        url: e.url
    }), h.logEvent("chatgpt_account_payment_modal_navigating_to_checkout", _.PLUS, {
        url: e.url
    }), o && S.setItem(b.CheckoutFrom, "students"), a && S.setItem(b.CheckoutFrom, "veterans"), window.location.href = e.url
}

function H() {
    "use forget";
    const t = A.c(15),
        s = f(),
        {
            country: o
        } = L();
    let a;
    t[0] !== o || t[1] !== s ? (a = {
        country: o,
        currentAccount: s,
        location: "useCheckoutDetails",
        shouldUsePaidSubscriptionBillingCurrency: !0,
        pricingPlanIsTypeBusiness: !1
    }, t[0] = o, t[1] = s, t[2] = a) : a = t[2];
    const e = T(a),
        u = s ? .data.subscriptionStatus.planType ? ? _.FREE,
        r = s ? .data.subscriptionStatus.billingPeriod,
        l = s ? .data.subscriptionStatus.hasPaidSubscription ? ? !1,
        p = s ? .data.subscriptionStatus.subscriptionPlan ? ? C.FREE,
        g = s ? .data.subscriptionStatus.subscriptionExpiresAt ? ? void 0,
        d = s ? .data.subscriptionStatus.wasPaidCustomer ? ? !1;
    let n;
    t[3] !== r || t[4] !== l || t[5] !== p || t[6] !== g || t[7] !== d ? (n = {
        billingPeriod: r,
        hasPaidSubscription: l,
        subscriptionPlan: p,
        subscriptionExpiresAt: g,
        wasPaidCustomer: d
    }, t[3] = r, t[4] = l, t[5] = p, t[6] = g, t[7] = d, t[8] = n) : n = t[8];
    let i;
    t[9] !== u || t[10] !== n ? (i = {
        currentPlanType: u,
        subscriptionStatus: n
    }, t[9] = u, t[10] = n, t[11] = i) : i = t[11];
    const m = i;
    if (!e) return null;
    let c;
    return t[12] !== m || t[13] !== e ? (c = {
        billingDetails: e,
        plusAnalyticsParams: m
    }, t[12] = m, t[13] = e, t[14] = c) : c = t[14], c
}
export {
    U as r, H as u
};
//# sourceMappingURL=8563df09-kcler8l9pghj0vzm.js.map