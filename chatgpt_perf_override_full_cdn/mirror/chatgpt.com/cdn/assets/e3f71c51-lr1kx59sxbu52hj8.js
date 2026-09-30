import {
    bX as g,
    cd as a,
    ce as b
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    j as D
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    r as f
} from "./2340486e-dvd8m80i7d6hyild.js";

function E({
    country: r,
    currentAccount: e,
    location: n,
    pricingPlanIsTypeBusiness: u,
    promoMetadata: s,
    shouldUsePaidSubscriptionBillingCurrency: t = !0
}) {
    const {
        data: i,
        isLoading: o,
        error: c
    } = b({
        countryCode: r
    }), [l, C] = f.useState(() => y({
        country: r,
        currentAccount: e,
        location: n,
        promoMetadata: s,
        shouldUsePaidSubscriptionBillingCurrency: t,
        checkoutPricingConfig: i,
        pricingPlanIsTypeBusiness: u
    }));
    return f.useEffect(() => {
        C(y({
            country: r,
            currentAccount: e,
            location: n,
            promoMetadata: s,
            shouldUsePaidSubscriptionBillingCurrency: t,
            checkoutPricingConfig: i,
            pricingPlanIsTypeBusiness: u
        }))
    }, [r, e, n, s, t, i, o, c, u]), l
}

function S({
    initialCountryCode: r
} = {}) {
    const e = D(),
        n = "userCountry" in e ? e.userCountry : null,
        [u, s] = f.useState(r && g(r) ? r : a({
            country: n,
            shouldUseDefaultCountryCode: !1
        }));
    return {
        country: u,
        setCountry: s,
        userCountry: n
    }
}

function y({
    country: r,
    currentAccount: e,
    location: n,
    promoMetadata: u,
    shouldUsePaidSubscriptionBillingCurrency: s,
    checkoutPricingConfig: t,
    pricingPlanIsTypeBusiness: i
}) {
    if (t) {
        const o = t.currencyConfig.symbol_code,
            c = _(u);
        if (c) return {
            country: r,
            currency: c
        };
        if (e ? .hasPaidSubscription() && s) {
            const l = e ? .mustGetSubscriptionBillingCurrency(n);
            if (l !== o) return {
                currency: l
            }
        }
        return i && t.currencyConfig.business_currency_override ? {
            country: r,
            currency: t.currencyConfig.business_currency_override
        } : {
            country: r,
            currency: o
        }
    } else return null
}

function _(r) {
    return r && "currency_code" in r.discount ? r.discount.currency_code : null
}
export {
    E as a, S as u
};
//# sourceMappingURL=e3f71c51-lr1kx59sxbu52hj8.js.map