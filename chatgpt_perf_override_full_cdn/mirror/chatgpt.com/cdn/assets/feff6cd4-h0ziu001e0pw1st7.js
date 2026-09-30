import {
    A as n,
    cT as p,
    he as C,
    wr as m
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    cu as P,
    ct as h,
    cL as g
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function S(r) {
    switch (r) {
        case n.PLUS:
            return "plus";
        case n.PROLITE:
            return "prolite";
        case n.PRO:
            return "pro";
        case n.SELF_SERVE_BUSINESS:
            return "business";
        case n.FREE:
            return "free";
        case n.GO:
            return "go";
        case n.FREE_WORKSPACE:
            return "free_workspace";
        default:
            return "plus"
    }
}

function D(r, u, e, s, t, o) {
    const c = S(o);
    c === "plus" && o !== n.PLUS && p.error(`Unsupported plan type for checkout pricing: ${o}`);
    const f = P(t, c, h.Month).amount,
        d = C(s),
        l = f * u;
    let i;
    if ("percentage" in e) i = l * (1 - e.percentage / 100);
    else if ("value" in e) i = l - e.value;
    else throw new Error("Invalid discount type");
    return i < 0 && (p.warn("Discounted cost dropped below zero; clamping to zero.", {
        planType: o,
        regularCost: l,
        discount: e,
        discountedCost: i
    }), i = 0), {
        formattedDiscountedCost: r.formatNumber(i, {
            style: "currency",
            currency: s,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }),
        currencySymbol: d
    }
}

function E(r, u, e, s) {
    const t = { ...u
    };
    let o;
    if (s && (s.period === "year" ? s.num_periods === 1 ? o = r.formatMessage({
            id: "pricingPlanConstants.promoCostSubtitleForSingleYear",
            defaultMessage: "per month for the first year"
        }) : o = r.formatMessage({
            id: "pricingPlanConstants.promoCostPerMonthSubtitleForPluralYears",
            defaultMessage: "per month for the first {num_years} years"
        }, {
            num_years: s.num_periods
        }) : s.num_periods === 1 ? o = r.formatMessage({
            id: "pricingPlanConstants.promoCostSubtitleForSingleMonth",
            defaultMessage: "for the first month"
        }) : o = r.formatMessage({
            id: "pricingPlanConstants.promoCostSubtitleForPluralMonths",
            defaultMessage: "for the first {num_months} months"
        }, {
            num_months: s.num_periods
        })), o ? t.costDuration = {
            id: "promoCostDuration",
            defaultMessage: o,
            description: "Cost duration for promo plan"
        } : delete t.costDuration, "percentage" in e || "discount_type" in e && e.discount_type === m.PERCENTAGE) {
        const a = (1 - ("percentage" in e ? e.percentage : e.amount) / 100) * t.costValue;
        t.costValue = a, t.costTitle = {
            id: "discountedCost",
            defaultMessage: g(a).toString()
        }
    } else if ("value" in e || e.discount_type === m.FIXED) {
        const c = "value" in e ? e.value : e.amount,
            a = Math.max(0, t.costValue - c);
        t.costValue = a, t.costTitle = {
            id: "discountedCost",
            defaultMessage: g(a).toString()
        }
    }
    return t
}
export {
    E as a, D as g
};
//# sourceMappingURL=feff6cd4-h0ziu001e0pw1st7.js.map