import {
    R as n,
    D as o
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    h$ as a,
    h_ as r
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function c(s) {
    if (s != null) return Object.fromEntries(Object.entries(s).filter(t => t[1] != null))
}

function l(s) {
    if ("checkout_session_id" in s) return s.checkout_session_id;
    if (typeof s.url == "string") return s.url.match(/cs_[A-Za-z0-9_]+/) ? .[0]
}
class h {
    static async getCheckoutLink(t, e) {
        return n.safePost("/payments/checkout", {
            requestBody: t,
            additionalHeaders: a(null, null, null, e ? .skipSentinelCheckout ? void 0 : await r("chatgpt_checkout", {
                sdkVariant: e ? .fromiOSWebview ? "openai" : "chatgpt"
            }).catch(i => {
                o.addError(i)
            }))
        })
    }
    static async fetchExistingCheckoutSession(t, e) {
        return await n.safeGet("/payments/checkout/{processor_entity}/{checkout_session_id}", {
            parameters: {
                path: {
                    processor_entity: t,
                    checkout_session_id: e
                }
            }
        })
    }
    static async continueCustomPaymentMethodFlow(t, e) {
        return await n.safePost("/payments/checkout/custom_payment_method/continue", {
            requestBody: {
                checkout_session_id: t,
                action_result: e
            }
        })
    }
    static async confirmCheckout(t) {
        const e = {
            checkout_session_id: t.id
        };
        return "billingAddress" in t && (e.billing_name = t.billingAddress ? .name ? ? null, e.billing_address = c(t.billingAddress ? .address) ? ? null), "taxIdInfo" in t && (e.tax_id_info = t.taxIdInfo ? ? null), n.safePost("/payments/checkout/confirm", {
            requestBody: e
        })
    }
}

function _(s, t) {
    return `/checkout/${s}/${t}`
}
export {
    h as C, l as a, _ as g, c as t
};
//# sourceMappingURL=6cbb6eaf-hqe4w67ks2ili42q.js.map