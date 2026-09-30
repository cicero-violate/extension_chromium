import {
    x as u
} from "./4813494d-javwxs2rmzsrunl2.js";
const i = "427211931",
    E = "saved_payment_methods_enabled";

function r() {
    return u(i).get(E, !1) ? {
        enableSave: "auto",
        enableRedisplay: "auto"
    } : void 0
}

function _({
    paymentIntentClientSecret: t,
    customerSessionClientSecret: o,
    checkoutState: e,
    appearance: l,
    paymentMethodTypes: d,
    customPaymentMethods: s
}) {
    if (o == null || e == null) return null;
    const n = r(),
        a = t != null ? {
            clientSecret: t,
            appearance: l,
            customerSessionClientSecret: o,
            ...n ? {
                savedPaymentMethod: n
            } : void 0
        } : {
            mode: "subscription",
            amount: e.total.total.minorUnitsAmount,
            currency: e.currency,
            appearance: l,
            customerSessionClientSecret: o,
            ...n ? {
                savedPaymentMethod: n
            } : void 0
        };
    return d != null && (a.paymentMethodTypes = d), s != null && (a.customPaymentMethods = s), a
}
export {
    _ as b, r as g
};
//# sourceMappingURL=411304d4-l2o3ynhpzevzmar6.js.map