import {
    cj as m
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    _ as d,
    ge as s,
    D as p
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    u as _,
    s as f
} from "./2478e8be-fu39n45z77ccw3bg.js";
const y = {
        cartUpdateShippingAddressErrorMessage: {
            id: "cart.updateShippingAddressError",
            defaultMessage: "Failed to update shipping address. Please try again.",
            description: "Error message shown when failed to update shipping address"
        },
        cartUpdateGeneralErrorMessage: {
            id: "cart.updateGeneralError",
            defaultMessage: "Failed to update the cart. Please try again.",
            description: "Error message shown when failed to update the cart"
        },
        cartUpdateGeneralErrorRetryMessage: {
            id: "cart.updateGeneralErrorRetry",
            defaultMessage: "Failed to update the cart. Please close the cart and try again.",
            description: "Error message shown when failed to update the cart"
        },
        cartUpdateQuantityErrorMessage: {
            id: "cart.updateQuantityError",
            defaultMessage: "Failed to update cart quantity. Please try again.",
            description: "Error message shown when failed to update cart quantity"
        },
        stripeLoadingPaymentMethodError: {
            id: "cart.stripeLoadingPaymentMethodError",
            defaultMessage: "Failed to load previous payment method. Please add a new payment method.",
            description: "Error message for failed to load payment method"
        },
        stripeLoadingShippingAddressError: {
            id: "cart.stripeLoadingShippingAddressError",
            defaultMessage: "Failed to load previous shipping address. Please enter a new shipping address.",
            description: "Error message for failed to load shipping address"
        },
        stripeLoadingBillingAddressError: {
            id: "cart.stripeLoadingBillingAddressError",
            defaultMessage: "Failed to load previous billing address. Please enter a new billing address.",
            description: "Error message for failed to load billing address"
        },
        cartAgreementsRequiredErrorMessage: {
            id: "cart.updateAgreementsError",
            defaultMessage: "Please check the {count, plural, one {box} other {boxes}} to agree before continuing.",
            description: "Message to show when the user has not accepted all required agreements"
        }
    },
    M = (e, t, a, r, n) => {
        if (!r) return;
        const i = a.find(o => o.id === r);
        d.logEventWithStatsig("product_checkout", "product_checkout", { ...s(e.cartMetadata ? ? {}),
            checkout_id: t,
            prefill: n === "prefill",
            action: e.shippingMethodId ? "shipping_method_updated" : "shipping_method_added",
            shipping_method_name: i ? .title,
            shipping_method_price: i ? .subtotal,
            shipping_method_index: a.findIndex(o => o.id === r)
        })
    },
    E = (e, t, a, r) => {
        d.logEventWithStatsig("product_checkout", "product_checkout", { ...s(e.cartMetadata ? ? {}),
            checkout_id: t,
            prefill: r === "prefill",
            action: e.shippingAddress ? "shipping_address_updated" : "shipping_address_added",
            shipping_city: a ? .city,
            shipping_state: a ? .state,
            shipping_postal_code: a ? .postalCode,
            shipping_country: a ? .country
        })
    },
    L = (e, t, a) => {
        d.logEventWithStatsig("product_checkout", "product_checkout", { ...s(e.cartMetadata ? ? {}),
            checkout_id: e.cartId,
            credit_card_type: t,
            prefill: a === "prefill",
            action: e.paymentDetails ? .paymentMethodId ? "payment_method_updated" : "payment_method_added"
        })
    },
    P = (e, t) => {
        d.logEventWithStatsig("product_checkout", "product_checkout", { ...s(e.cartMetadata ? ? {}),
            checkout_id: e.cartId,
            credit_card_type: t,
            action: "payment_method_removed"
        })
    };

function T(e, t, a) {
    return {
        name: t,
        addressLine1: e.line1,
        addressLine2: e.line2,
        city: e.city,
        state: e.state,
        postalCode: e.postal_code,
        country: e.country,
        phoneNumber: a ? ? void 0
    }
}

function R(e, t) {
    return {
        name: e.name,
        address: {
            line1: e.addressLine1,
            line2: e.addressLine2,
            city: e.city,
            state: e.state,
            postal_code: e.postalCode,
            country: e.country ? ? ""
        },
        phone: t ? e.phoneNumber : void 0
    }
}

function F(e) {
    return {
        name: e.name,
        line_one: e.addressLine1,
        line_two: e.addressLine2,
        city: e.city,
        state: e.state,
        postal_code: e.postalCode,
        country: e.country ? ? "",
        phone_number: e.phoneNumber
    }
}

function N(e) {
    return {
        name: e.name ? ? null,
        addressLine1: e.line_one ? ? null,
        addressLine2: e.line_two ? ? null,
        city: e.city ? ? null,
        state: e.state ? ? null,
        postalCode: e.postal_code ? ? null,
        country: e.country ? ? null,
        phoneNumber: e.phone_number ? ? void 0
    }
}
const w = e => e.every(t => "metadata" in t ? t.metadata ? .isDigital : !0),
    D = e => {
        const t = e;
        return {
            paymentMethodId: t.value.payment_method ? .id,
            paymentMethodType: t.value.payment_method ? .type,
            label: t.preview ? .label ? ? "",
            sublabel: t.preview ? .sublabel ? ? "",
            icon: t.preview ? .icon ? ? null
        }
    },
    q = async ({
        store: e,
        fields: t,
        errorMessage: a,
        onLocalMutationComplete: r,
        source: n,
        skipLogging: i
    }) => {
        try {
            e.setCartStatus("updating"), t.shippingAddress && (i || E(e, e.cartId, t.shippingAddress, n), e.setShippingAddress(t.shippingAddress)), t.shippingMethodId && (i || M(e, e.cartId, e.shippingOptions, t.shippingMethodId, n), e.setShippingMethodId(t.shippingMethodId)), r ? .();
            const o = await _(e.cartId, t);
            o.cart.errors.length > 0 && d.logEventWithStatsig("product_checkout", "product_checkout", { ...s(e.cartMetadata ? ? {}),
                action: "cart_update_failed",
                reason: "bad_response_from_endpoint",
                error_message: JSON.stringify(o.cart.errors)
            }), e.updateCart(o)
        } catch (o) {
            d.logEventWithStatsig("product_checkout", "product_checkout", { ...s(e.cartMetadata ? ? {}),
                action: "cart_update_failed",
                reason: "error_response_from_endpoint",
                error_message: o
            }), e.setErrors([{
                group: "general",
                message: a
            }]), e.setCartStatus("idle")
        }
    },
    x = (e, t) => {
        e.cartStatus !== "submitting" && (e.closeCheckout(!0), d.logEventWithStatsig("product_checkout", "product_checkout", { ...s(e.cartMetadata ? ? {}),
            checkout_id: e.cartId,
            reason: t,
            action: "abandoned"
        }), p.addAction("shopping_checkout.abandoned", {
            merchant_id: e.merchant ? .externalId,
            merchant_network_id: e.merchant ? .networkId,
            cart_total: e.grandTotal.value,
            reason: t
        }))
    },
    k = (e, t) => {
        const r = (n = 3, i = 1) => {
            const o = u(e);
            if (o) {
                const c = A(o);
                if (c) {
                    const h = o.getBoundingClientRect(),
                        g = c.getBoundingClientRect();
                    c.scrollTo({
                        top: h.top - g.top + c.scrollTop,
                        behavior: "smooth"
                    })
                } else o.scrollIntoView({
                    behavior: "smooth"
                });
                t ? .()
            } else n > 1 && setTimeout(() => r(n - 1, i + 1), 200 * i)
        };
        setTimeout(() => r(), 50)
    },
    u = e => document.querySelector(`[data-order-id="${e}"]`),
    A = e => {
        let t = e.parentElement;
        for (; t;) {
            const {
                overflowY: a
            } = window.getComputedStyle(t);
            if (a === "auto" || a === "scroll") return t;
            t = t.parentElement
        }
        return null
    },
    U = (e, t, a) => w(e) ? [{
        id: "na",
        amount: 0,
        displayName: a.formatMessage({
            id: "tLRVwj",
            defaultMessage: "Digital delivery"
        })
    }] : t.map(r => ({
        id: r.id,
        amount: r.subtotal_minor,
        displayName: r.title
    })),
    l = 1e3,
    W = async ({
        store: e,
        order: t,
        navigate: a
    }) => {
        let r = !1;
        e.setCartStatus("complete");
        const n = performance.now();
        t.conversation_id && await m(t.conversation_id, {
            forceNetworkFetch: !0,
            source: "shopping_checkout_complete"
        }), performance.now() - n < l && (u(e.cartId) && (r = !0, p.addAction("shopping_checkout.receipt", {
            durationMs: performance.now() - n,
            merchant_id: e.merchant ? .externalId,
            merchant_network_id: e.merchant ? .networkId
        })), await new Promise(i => setTimeout(i, l - (performance.now() - n)))), t.conversation_id ? k(e.cartId, () => {
            r || p.addAction("shopping_checkout.receipt", {
                durationMs: performance.now() - n,
                merchant_id: e.merchant ? .externalId,
                merchant_network_id: e.merchant ? .networkId
            })
        }) : f(a, t.id)
    },
    O = (e, t) => {
        const a = e.additionalFields ? .includes("shipping_address_phone_number") ? !!t ? .phoneNumber : !0;
        return !!t ? .complete && !!t ? .addressLine1 && a
    },
    v = e => e ? !e.some(t => t.is_required && !t.is_checked) : !0,
    B = (e, t) => v(e.agreements) ? !0 : (b(e, t), !1),
    b = (e, t) => {
        e.setErrors([{
            group: "general",
            message: t.formatMessage(y.cartAgreementsRequiredErrorMessage, {
                count: e.agreements ? .filter(a => a.is_required).length
            })
        }])
    };
export {
    w as a, D as b, y as c, E as d, F as e, W as f, U as g, v as h, O as i, x as j, P as k, M as l, N as m, T as n, L as o, R as p, b as s, q as u, B as v
};
//# sourceMappingURL=6fd89734-ivsscv8296nz7zhh.js.map