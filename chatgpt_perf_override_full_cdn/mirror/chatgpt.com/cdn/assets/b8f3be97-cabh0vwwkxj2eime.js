import {
    D as P,
    A as r,
    wl as e
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    cs as _,
    ct as l,
    cu as T,
    cv as i,
    cw as A,
    cx as C
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function I(t, n, c) {
    const a = A(t, c);
    if (!a) return null;
    const E = t,
        o = n.currency,
        {
            taxName: S,
            reverseChargeEligible: u,
            taxRatePercent: s
        } = a;
    return s == null ? {
        taxAmount: null,
        taxCurrency: o,
        taxCountry: E,
        taxName: S,
        reverseChargeEligible: u
    } : {
        taxAmount: C({
            amount: n.amount,
            taxPercent: s,
            inclusive: n.amountTaxBehavior === i.Inclusive
        }),
        taxCurrency: o,
        taxCountry: E,
        taxName: S,
        reverseChargeEligible: u
    }
}

function U(t, n, c) {
    const a = T(t, n, c);
    if (a.amount == null || a.taxBehavior == null) {
        const E = new Error("Incomplete pricing details");
        throw P.addError(E, {
            planType: n,
            interval: c,
            countryCode: t.countryCode,
            currency: t.currencyConfig.symbol_code
        }), E
    }
    return {
        product: n,
        currency: t.currencyConfig.symbol_code,
        recurringInterval: c,
        amount: a.amount,
        amountTaxBehavior: a.taxBehavior === "inclusive" ? i.Inclusive : i.Exclusive
    }
}

function B(t, n, c, a) {
    const E = _(n);
    if (!E) {
        const R = new Error("Unsupported plan type for pricing config");
        throw P.addError(R, {
            planType: n
        }), R
    }
    const o = E === "business" ? l.Year : l.Month,
        u = U(t, E, a ? ? o),
        s = c.country ? I(c.country, u, t) : null;
    return {
        priceDetails: u,
        taxDetails: s
    }
}

function x(t) {
    switch (t) {
        case r.GUEST:
            return e.GUEST;
        case r.FREE:
            return e.FREE;
        case r.GO:
            return e.GO;
        case r.PLUS:
            return e.PLUS;
        case r.PROLITE:
            return e.PROLITE;
        case r.PRO:
            return e.PRO;
        case r.SELF_SERVE_BUSINESS:
        case r.SELF_SERVE_BUSINESS_USAGE_BASED:
            return e.SELF_SERVE_BUSINESS;
        case r.ENTERPRISE_CBP:
        case r.ENTERPRISE_CBP_USAGE_BASED:
            return e.ENTERPRISE_CBP_FLAT;
        case r.HC:
            return e.HC_FLAT;
        case r.FINSERV:
            return e.FINSERV_FLAT;
        case r.EDUCATION_CBP:
            return e.EDUCATION_CBP_FLAT;
        case r.K12:
            return e.K12;
        case r.QUORUM:
            return e.QUORUM;
        case r.FREE_WORKSPACE:
            return e.FREE_WORKSPACE;
        case r.DEPRECATED_ENTERPRISE:
            return e.DEPRECATED_ENTERPRISE;
        case r.DEPRECATED_EDU:
            return e.DEPRECATED_EDU
    }
}

function F(t) {
    switch (t) {
        case r.GUEST:
            return 0;
        case r.FREE:
            return 1;
        case r.GO:
            return 2;
        case r.PLUS:
            return 3;
        case r.PROLITE:
            return 4;
        case r.PRO:
            return 5;
        case r.SELF_SERVE_BUSINESS:
        case r.SELF_SERVE_BUSINESS_USAGE_BASED:
            return 6;
        case r.ENTERPRISE_CBP:
        case r.ENTERPRISE_CBP_USAGE_BASED:
            return 7;
        case r.HC:
            return 8;
        case r.FINSERV:
            return 9;
        case r.FREE_WORKSPACE:
            return 6;
        default:
            return P.addError(new Error("Unsupported plan type", {
                cause: t
            })), -1
    }
}
export {
    x as a, B as b, F as g
};
//# sourceMappingURL=b8f3be97-cabh0vwwkxj2eime.js.map