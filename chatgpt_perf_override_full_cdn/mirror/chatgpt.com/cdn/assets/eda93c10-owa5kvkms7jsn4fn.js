import {
    bS as S,
    q as L,
    jG as O,
    jH as T
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    h as U,
    m as w,
    a as B
} from "./6fd89734-ivsscv8296nz7zhh.js";
const u = l => {
        const a = l ? .trim();
        return a || void 0
    },
    _ = (l, a) => {
        const s = u(l) ? .toLocaleLowerCase(),
            e = u(a) ? .toLocaleLowerCase();
        return !!(s && e && s === e)
    },
    q = ({
        merchantTitle: l,
        sellerName: a,
        sellerLink: s,
        merchantSubtitle: e
    }) => {
        const t = u(l),
            i = u(a),
            r = u(s),
            n = u(e);
        if (t ? .toLocaleLowerCase() === "walmart" && i) return {
            subtitle: i,
            subtitlePrefix: "Sold by ",
            subtitleUrl: r
        };
        const o = _(i, t) ? void 0 : i,
            c = o ? r : void 0,
            m = o ? ? n;
        return !m || _(m, t) ? {} : {
            subtitle: m,
            subtitleUrl: c
        }
    },
    I = (l, a) => {
        if (!l ? .length) return a;
        const s = new Map(a.map(e => [e.value, e]));
        return l.map(e => {
            const t = e.item,
                i = t.item_metadata,
                r = s.get(t.value);
            return {
                id: t.id ? ? r ? .id ? ? "",
                productId: i ? .product_id ? ? r ? .productId,
                quantity: t.quantity,
                value: t.value,
                title: i ? .product_title ? ? r ? .title,
                variant: i ? .product_variant_info ? ? r ? .variant,
                price: i ? .product_price ? ? r ? .price,
                imageUrl: i ? .product_image_url ? ? r ? .imageUrl,
                url: i ? .product_url ? ? r ? .url,
                metadata: {
                    isDigital: i ? .is_digital ? ? r ? .metadata ? .isDigital
                }
            }
        })
    },
    b = (l, a) => {
        if (!l ? .length) return a;
        const s = new Map(a.map(e => [e.value, e]));
        return l.map(e => {
            const t = e.item_metadata,
                i = s.get(e.value);
            return {
                id: e.id ? ? i ? .id ? ? "",
                productId: t ? .product_id ? ? i ? .productId,
                quantity: e.quantity,
                value: e.value,
                title: t ? .product_title ? ? i ? .title,
                variant: t ? .product_variant_info ? ? i ? .variant,
                price: t ? .product_price ? ? i ? .price,
                imageUrl: t ? .product_image_url ? ? i ? .imageUrl,
                url: t ? .product_url ? ? i ? .url,
                metadata: {
                    isDigital: t ? .is_digital ? ? i ? .metadata ? .isDigital
                }
            }
        })
    },
    P = l => {
        const a = l ? .item,
            s = a ? .item_metadata;
        return a ? [{
            id: a.id ? ? "",
            productId: s ? .product_id,
            quantity: a.quantity,
            value: a.value,
            title: s ? .product_title,
            variant: s ? .product_variant_info,
            price: s ? .product_price,
            imageUrl: s ? .product_image_url,
            url: s ? .product_url,
            metadata: {
                isDigital: s ? .is_digital
            }
        }] : []
    },
    y = l => l.unavailable_items ? ? [],
    f = l => !!l ? .some(a => a.merchant_error_code === "out_of_stock"),
    h = {
        cartId: "",
        cartMetadata: void 0,
        isCheckoutOpen: !1,
        cart: void 0,
        items: [],
        unavailableItems: [],
        shippingAddress: void 0,
        billingAddress: void 0,
        shippingMethodId: void 0,
        totals: void 0,
        merchant: void 0,
        paymentDetails: void 0,
        currencyCode: "USD",
        shippingOptions: [],
        grandTotal: {
            title: "",
            subtitle: "",
            value: "",
            value_minor: 0,
            formatted_value: ""
        },
        paymentTypes: {},
        cartStatus: "idle",
        isShippingAddressSameAsBilling: !1,
        paymentSheetButtonCta: "",
        headerMessage: void 0,
        errors: void 0,
        preloadCustomerSessionClientSecret: void 0,
        cachedPaymentDetailsResponse: void 0,
        agreements: void 0
    },
    A = S(() => {
        const l = L("3109853659");
        return O((a, s) => ({ ...h,
            openNewCheckout: ({
                metadata: e,
                ...t
            }) => a(i => ({ ...h,
                ...t,
                cartMetadata: e ? { ...e
                } : void 0,
                isCheckoutOpen: !0,
                paymentDetails: i.paymentDetails ? .complete ? { ...i.paymentDetails
                } : void 0,
                shippingAddress: i.shippingAddress ? .complete ? { ...i.shippingAddress
                } : void 0,
                billingAddress: i.billingAddress ? .complete ? { ...i.billingAddress
                } : void 0,
                cachedPaymentDetailsResponse: i.cachedPaymentDetailsResponse ? { ...i.cachedPaymentDetailsResponse
                } : void 0,
                isShippingAddressSameAsBilling: i.billingAddress ? .complete && i.isShippingAddressSameAsBilling
            })),
            closeCheckout: (e = !1) => a(t => ({ ...e ? h : { ...t,
                    isCheckoutOpen: !1
                }
            })),
            setInitialCart: e => {
                a(t => {
                    const i = e.cart.line_items ? ? [],
                        r = y(e.cart),
                        n = i[0],
                        d = n ? .item,
                        p = r[0],
                        o = d ? .item_metadata ? ? p ? .item_metadata,
                        c = n ? .seller,
                        m = o ? .merchant_title,
                        g = q({
                            merchantTitle: m,
                            sellerName: c ? .name ? ? o ? .seller_name,
                            merchantSubtitle: o ? .merchant_subtitle,
                            sellerLink: c ? .link
                        }),
                        k = l ? i.length > 0 ? I(i, t.items) : [] : P(n),
                        M = f(e.cart.errors) ? b(r, t.unavailableItems) : [],
                        D = e.cart.header_level_message ? .trim() || void 0;
                    return { ...t,
                        cartId: e.id,
                        totals: e.cart.totals,
                        grandTotal: e.cart.grand_total,
                        shippingAddress: e.cart.shipping_address ? { ...w(e.cart.shipping_address),
                            complete: !0
                        } : t.shippingAddress ? .complete ? { ...t.shippingAddress
                        } : void 0,
                        paymentSheetButtonCta: e.payment_sheet_button_cta.trim(),
                        shippingOptions: e.cart.shipping_options ? ? [],
                        shippingMethodId: e.cart.shipping_option_id ? ? void 0,
                        footerMessage: e.cart.footer_level_message ? ? void 0,
                        headerMessage: D,
                        agreements: e.agreements ? ? [],
                        paymentTypes: Object.fromEntries((e.payment_surfaces_and_types ? ? []).map(v => [v.surface, v.types])),
                        currencyCode: e.cart.currency,
                        errors: e.cart.errors,
                        merchant: o ? {
                            title: m,
                            subtitle: g.subtitle,
                            subtitlePrefix: g.subtitlePrefix,
                            subtitleUrl: g.subtitleUrl,
                            url: o ? .product_url,
                            logoUrl: o ? .merchant_logo_url,
                            externalId: e.seller_details.external_id,
                            networkId: e.seller_details.network_id
                        } : t.merchant,
                        items: k,
                        unavailableItems: M,
                        allowedCountries: e.allowed_countries ? ? [],
                        additionalFields: e.additional_fields ? ? []
                    }
                })
            },
            updateCart: e => a(t => {
                const i = e.cart.line_items ? ? [],
                    r = y(e.cart),
                    d = i[0] ? .item,
                    p = l ? i.length > 0 ? I(i, t.items) : [] : d ? [{ ...t.items[0],
                        id: d.id ? ? "",
                        quantity: d.quantity,
                        value: d.value
                    }] : [],
                    c = f(e.cart.errors) && r.length > 0 ? b(r, t.unavailableItems) : t.unavailableItems;
                return { ...t,
                    totals: e.cart.totals,
                    grandTotal: e.cart.grand_total,
                    shippingOptions: e.cart.shipping_options ? ? [],
                    shippingMethodId: e.cart.shipping_option_id ? ? void 0,
                    footerMessage: e.cart.footer_level_message ? ? void 0,
                    headerMessage: e.cart.header_level_message !== void 0 ? e.cart.header_level_message ? .trim() ? ? void 0 : t.headerMessage,
                    errors: e.cart.errors,
                    cartStatus: t.cartStatus === "updating" ? "idle" : t.cartStatus,
                    items: p,
                    unavailableItems: c
                }
            }),
            updateQuantity: (e, t) => {
                const r = s().items.map(n => n.id === e ? { ...n,
                    quantity: t
                } : n);
                return a({
                    items: r
                }), r
            },
            setShippingAddress: e => a(t => ({ ...t,
                shippingAddress: e ? { ...e
                } : void 0
            })),
            setHasAcceptedAgreement: (e, t) => {
                const i = s().agreements ? .map(r => r.id === e ? { ...r,
                    is_checked: t
                } : r);
                a({
                    agreements: i,
                    ...U(i) ? {
                        errors: void 0
                    } : {}
                })
            },
            dismissUnavailableItem: e => a(t => ({ ...t,
                unavailableItems: t.unavailableItems.filter(i => i.value !== e)
            })),
            setBillingAddress: e => a(t => ({ ...t,
                billingAddress: { ...e
                }
            })),
            setShippingMethodId: e => a(t => ({ ...t,
                shippingMethodId: e
            })),
            setMerchant: e => a(t => ({ ...t,
                merchant: { ...e
                }
            })),
            setCachedPaymentDetailsResponse: e => a(t => ({ ...t,
                cachedPaymentDetailsResponse: e
            })),
            setPaymentDetails: e => a(t => ({ ...t,
                paymentDetails: e ? { ...e
                } : void 0
            })),
            setCartStatus: e => a(t => ({ ...t,
                cartStatus: e
            })),
            setIsShippingAddressSameAsBilling: e => a(t => ({ ...t,
                isShippingAddressSameAsBilling: e
            })),
            setErrors: e => a(t => ({ ...t,
                errors: e
            }))
        }))
    }),
    x = () => A().getState(),
    E = () => T(A()),
    H = l => !!(l.shippingAddress ? .complete && l.paymentDetails ? .complete && (l.shippingMethodId || B(l.items)));
export {
    H as a, x as g, E as u
};
//# sourceMappingURL=eda93c10-owa5kvkms7jsn4fn.js.map