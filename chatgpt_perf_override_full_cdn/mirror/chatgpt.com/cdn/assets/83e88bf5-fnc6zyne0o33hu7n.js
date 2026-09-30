import {
    wl as o,
    c7 as t,
    A as n
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    p as a
} from "./f43ce1f0-cynln2ayrnjv35lb.js";

function i(r, e) {
    return r === "plus-1-month-free" ? {
        plan_name: o.PLUS,
        title: "",
        summary: e.formatMessage(a.headline),
        discount: {
            percentage: 100
        },
        duration: {
            num_periods: 1,
            period: "month"
        },
        price_period: "recurring",
        promotion_type: "discount",
        promotion_type_label: e.formatMessage(t.specialOffer)
    } : r === "plus-10-for-1-month" ? {
        plan_name: o.PLUS,
        title: "",
        summary: e.formatMessage(a.headline),
        discount: {
            percentage: 50
        },
        duration: {
            num_periods: 1,
            period: "month"
        },
        price_period: "recurring",
        promotion_type: "discount",
        promotion_type_label: e.formatMessage(t.specialOffer)
    } : null
}

function m(r, e) {
    return r === n.GO ? "https://help.openai.com/en/articles/12501659-chatgpt-go-promotions-and-referrals" : "https://help.openai.com/en/articles/10492689-chatgpt-plus-promotions-referrals"
}
export {
    i as a, m as g
};
//# sourceMappingURL=83e88bf5-fnc6zyne0o33hu7n.js.map