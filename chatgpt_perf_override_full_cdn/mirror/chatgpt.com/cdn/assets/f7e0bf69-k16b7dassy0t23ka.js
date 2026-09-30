const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/6a801ab1-blu7mgcakpw2bggz.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/1622ef1c-lbin4ocjqw0z4zbp.js", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/conversation-small-cqp6votf.css", "assets/411304d4-l2o3ynhpzevzmar6.js", "assets/b8ba2ec7-b3h6sni00olgnf96.js", "assets/c8d36e23-ccuyzajtuddlftds.js", "assets/82244417-gtg7yq4t8dhuwljw.js", "assets/74006267-m5l37lodlljn1srb.js", "assets/f254c486-e4e4t6ee3eghlnbc.js", "assets/5ea389ac-gdugcsfq6poi8xkf.js", "assets/d4fd05ef-jcd8acyt60dknv7p.js", "assets/f6f4f1b2-gtlbp7j4szobo0y1.js", "assets/1bc04b52-lymnctp12j4ukscl.js", "assets/1bc04b52-h1em0bjkpkjv8ykw.js", "assets/1bc04b52-homyy2s5cy2i6moh.js", "assets/1bc04b52-pfqcgruptyx7togk.js", "assets/1bc04b52-hnu6g21afx0au4ng.js", "assets/6fd89734-ivsscv8296nz7zhh.js", "assets/2478e8be-fu39n45z77ccw3bg.js", "assets/c50694f1-efc0umb4i9cif66s.js", "assets/1bc04b52-htrlynm8a3t36dsr.js", "assets/b8d51478-eia71ltzneqisl3n.js", "assets/4701097e-fcrkpu9i1g9psrli.js", "assets/02833de5-dv0o4y10dk4nqsl1.js", "assets/e9213bfa-drjldekxa18no8cz.js", "assets/0fe285dc-ef2rid3r4goohlwz.js", "assets/1c86a5ac-l4l9bb8zn1n6pjie.js", "assets/7517017f-efd9iwaiway92n98.js", "assets/84983163-gan1f9ordoegunfq.js", "assets/14a60637-ks75r8kvmgl13oz5.js", "assets/679fc303-kl7c6054usfnqmd4.js", "assets/8d846022-bpect2mtc2esvt45.js"]))) => i.map(i => d[i]);
import {
    _ as ut,
    c as mt,
    r as je,
    j as We
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    A as pt
} from "./1bc04b52-htrlynm8a3t36dsr.js";
import {
    bi as _t,
    _ as ft,
    ge as ht,
    gf as yt,
    cY as y,
    fs as x,
    jR as b,
    fq as i,
    ko as $,
    cZ as K,
    jT as Re,
    iE as _e,
    fr as z,
    jS as gt,
    ch as bt,
    cF as $t,
    d as m,
    a$ as Ae,
    cW as De,
    bY as Ke,
    aJ as M,
    R as vt,
    be as Ct,
    rO as kt,
    AD as St,
    J as wt,
    e as It,
    cN as Et,
    af as Mt,
    hZ as Tt,
    de as Pt
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    t as At
} from "./f254c486-e4e4t6ee3eghlnbc.js";
import {
    E as Dt,
    h as xt
} from "./1c86a5ac-l4l9bb8zn1n6pjie.js";
import {
    ft as Rt
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
const Ot = t => !!t && typeof t == "object" && t.should_display === !1 && "original_error" in t,
    He = t => Array.isArray(t) ? t.find(Ot) ? ? null : null,
    Ut = t => !!t && typeof t == "object" && t.should_display === !0,
    To = t => Array.isArray(t) ? t.filter(Ut).map(e => e.original_error).filter(Boolean) : [];

function Po(t) {
    if (!(t instanceof _t)) return null;
    const e = t.json ? .errors ? ? t.detail ? .errors,
        o = He(e);
    return o ? o.original_error ? ? o : null
}
const L = ({
        conversation: t,
        checkoutId: e,
        connectorId: o,
        messageId: n
    }, s) => {
        ft.logEventWithStatsig("product_checkout", "product_checkout", { ...ht({
                clientThreadId: yt(t),
                messageId: n ? ? void 0
            }),
            ...e ? {
                checkout_id: e
            } : {},
            ...o ? {
                connector_id: o
            } : {},
            merchant_platform: "ecosystem",
            ...s
        })
    },
    Ao = (t, e) => L(t, {
        action: "shown",
        ...e.merchantName ? {
            merchant_name: e.merchantName
        } : {},
        ...e.merchantUrl ? {
            merchant_url: e.merchantUrl
        } : {},
        ...e.hadSavedPaymentMethod !== void 0 ? {
            hadSavedPaymentMethod: e.hadSavedPaymentMethod
        } : {}
    }),
    xe = (t, e, o) => L(t, {
        action: "cart_load_failed",
        reason: e,
        ...o ? {
            error_message: o
        } : {}
    }),
    Do = (t, {
        label: e,
        source: o,
        hasExistingPaymentMethod: n
    }) => L(t, {
        credit_card_type: e ? ? void 0,
        prefill: o === "prefill",
        action: n ? "payment_method_updated" : "payment_method_added"
    }),
    xo = (t, e) => L(t, {
        credit_card_type: e ? ? void 0,
        action: "payment_method_removed"
    }),
    Ro = (t, {
        paymentMethod: e,
        attemptId: o
    }) => L(t, {
        payment_method: e ? ? void 0,
        action: "express_checkout_button_clicked",
        ...o ? {
            attempt_id: o
        } : {}
    }),
    Oo = (t, {
        paymentMethod: e,
        attemptId: o,
        isExpressCheckout: n,
        merchantName: s,
        merchantUrl: r
    }) => L(t, {
        action: "pay_button_clicked",
        ...e ? {
            payment_method: e
        } : {},
        ...s ? {
            merchant_name: s
        } : {},
        ...r ? {
            merchant_url: r
        } : {},
        ...o ? {
            attempt_id: o
        } : {},
        ...n !== void 0 ? {
            is_express_checkout: n
        } : {}
    }),
    Uo = (t, {
        attemptId: e,
        reason: o,
        errorMessage: n,
        succeeded: s
    }) => L(t, {
        action: s ? "payment_succeeded" : "payment_failed",
        ...e ? {
            attempt_id: e
        } : {},
        ...o ? {
            reason: o
        } : {},
        ...n ? {
            error_message: n
        } : {}
    }),
    Ft = ["stripe", "paypal", "adyen", "braintree", "fiserv", "worldpay", "jpmorgan", "checkout", "merchant"],
    Lt = ["card", "link", "apple_pay", "google_pay"],
    Nt = ["amex", "cartes_bancaires", "diners", "discover", "eftpos_au", "jcb", "link", "mastercard", "unionpay", "visa", "unknown"],
    qt = ["terms_of_use", "privacy_policy", "seller_shop_policies", "support_url"],
    jt = ["missing", "invalid", "out_of_stock", "payment_declined", "requires_sign_in", "requires_3ds"],
    Wt = ["plain", "markdown"],
    Bt = ["items_base_amount", "items_discount", "subtotal", "discount", "fulfillment", "tax", "fee", "tip", "total"],
    Ye = ["not_ready_for_payment", "ready_for_payment", "completed", "canceled", "requires_escalation"],
    Kt = ["live", "test"],
    Ve = y({
        id: i,
        item: y({
            id: i,
            quantity: b
        }),
        name: i,
        description: i,
        images: $(i),
        base_amount: b,
        discount: b,
        subtotal: b,
        tax: b,
        total: b
    }),
    Ge = y({
        type: x(Bt),
        display_text: i,
        amount: b
    }),
    Ht = y({
        id: i,
        type: () => "shipping",
        title: i,
        subtitle: i,
        subtotal: b,
        tax: b,
        total: b,
        carrier: i,
        earliest_delivery_time: i,
        latest_delivery_time: i
    }),
    Yt = y({
        id: i,
        type: () => "digital",
        title: i,
        subtitle: i,
        subtotal: b,
        tax: b,
        total: b
    }),
    Ze = t => {
        switch (_e(z(t) ? .type, ["shipping", "digital"])) {
            case "shipping":
                return Ht(t);
            case "digital":
                return Yt(t)
        }
    },
    Je = x(Wt),
    Vt = y({
        type: () => "info",
        param: i,
        content_type: Je,
        content: i
    }),
    ze = y({
        type: () => "error",
        code: x(jt),
        param: i,
        content_type: Je,
        content: i
    }),
    Gt = t => {
        const e = z(t, {}),
            o = {};
        for (const [n, s] of Object.entries(e)) typeof s == "string" && (o[n] = s);
        return o
    },
    Qe = t => {
        switch (_e(z(t) ? .type, ["info", "error"])) {
            case "info":
                return Vt(t);
            case "error":
                return ze(t)
        }
    },
    Xe = y({
        type: x(qt),
        url: i
    }),
    et = y({
        name: i,
        line_one: i,
        line_two: i,
        city: i,
        state: i,
        country: t => At(t) ? ? "US",
        postal_code: i
    }),
    Zt = y({
        id: i,
        checkout_session_id: i,
        permalink_url: i
    }),
    Oe = t => _e(i(t).toLowerCase(), Lt),
    tt = t => _e(i(t).toLowerCase(), Nt, "unknown"),
    Jt = t => {
        const e = z(t);
        return e ? {
            type: Oe(e.type),
            ...e.allowed_card_brands !== void 0 ? {
                allowed_card_brands: gt(e.allowed_card_brands, tt)
            } : {}
        } : {
            type: Oe(t)
        }
    },
    zt = t => {
        let e = t;
        if (typeof t == "string") try {
            e = JSON.parse(t)
        } catch {}
        return $(Jt)(e)
    },
    Qt = y({
        id: i,
        type: Oe,
        display_name: i,
        display_last4: i,
        display_brand: tt
    }),
    Xt = y({
        merchant_id: i,
        provider: x(Ft),
        supported_payment_methods: zt,
        managed_payment_methods: $(Qt)
    }),
    ot = t => i(t).toUpperCase(),
    eo = x(Kt),
    to = y({
        id: i,
        payment_provider: Xt,
        payment_mode: eo,
        status: x(Ye),
        currency: ot,
        metadata: K(Gt),
        line_items: $(Ve),
        totals: $(Ge),
        fulfillment_options: $(Ze),
        fulfillment_address: Re(et),
        fulfillment_option_id: K(i),
        messages: $(Qe),
        links: $(Xe)
    }),
    oo = y({
        id: i,
        buyer: y({
            email: i,
            phone_number: K(i)
        }),
        status: x(Ye),
        currency: ot,
        line_items: $(Ve),
        totals: $(Ge),
        fulfillment_options: $(Ze),
        fulfillment_address: Re(et),
        fulfillment_option_id: K(i),
        messages: $(Qe),
        links: $(Xe),
        order: K(Zt),
        continue_url: K(Re(i))
    }),
    so = t => {
        const e = oo(t);
        if (e.status === "completed" && e.order == null) throw new Error("Missing order in complete checkout response for completed status");
        return e
    },
    Fo = t => {
        const e = t.response,
            o = z(e);
        return so(o)
    },
    no = bt(() => ut(() =>
        import ("./6a801ab1-blu7mgcakpw2bggz.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35])).then(t => t.EcosystemCheckoutModal));
class io {
    constructor(e) {
        this.conversation = e
    }
    checkoutPromise$ = m(null);
    chatSDK$ = m(null);
    resolvedWidget$ = m(null);
    isLoadingPayment$ = m(!0);
    checkoutSession$ = m(null);
    grandTotal$ = Ae(() => this.checkoutSession$() ? .totals.find(e => e.type === "total"));
    status$ = m("idle");
    messages$ = m([]);
    errorMessages$ = Ae(() => this.messages$().filter(e => e.type === "error"));
    paymentDetails$ = m(null);
    managedPaymentMethodDetails$ = m([]);
    savedPaymentMethodDetails$ = m([]);
    paymentMethodSelectionScreenConfig$ = m(null);
    paymentTypes$ = m([]);
    allowedCountries$ = m([]);
    paymentSheetButtonCta$ = m("");
    publishableKey$ = m(null);
    customerId$ = m(null);
    footerMessage$ = m(null);
    sellerDetails$ = m(null);
    orderId$ = m(null);
    billingAddress$ = m(null);
    billingAddressComplete$ = Ae(() => this.billingAddress$() ? !!this.billingAddress$() ? .name && !!this.billingAddress$() ? .line_one && !!this.billingAddress$() ? .city && !!this.billingAddress$() ? .state && !!this.billingAddress$() ? .country && !!this.billingAddress$() ? .postal_code : !1);
    toPaymentMethodDetails = e => (e ? ? []).map(o => ({
        paymentMethodId: o.payment_method_id,
        paymentMethodType: o.payment_method_type,
        label: o.label,
        sublabel: o.sublabel,
        badge: o.badge,
        billingAddress: o.billing_address,
        icon: null,
        iconUrl: o.icon_url,
        managed_by: o.managed_by,
        complete: !0
    }));
    openCheckout = (e, o, n) => new Promise((s, r) => {
        De(() => {
            this.checkoutPromise$.set({
                resolve: s,
                reject: r
            }), this.chatSDK$.set(e), this.resolvedWidget$.set(o), this.checkoutSession$.set(n), this.billingAddress$.set(n.fulfillment_address ? ? null), this.paymentDetails$.set(null), Ke(no, {
                conversation: this.conversation
            })
        })
    });
    toCancelledCompleteCheckoutSession = e => ({
        id: e.id,
        buyer: {
            email: ""
        },
        status: "canceled",
        currency: e.currency,
        line_items: e.line_items,
        order: null,
        fulfillment_options: e.fulfillment_options,
        fulfillment_address: e.fulfillment_address ? ? null,
        fulfillment_option_id: e.fulfillment_option_id,
        messages: e.messages,
        totals: e.totals,
        links: e.links,
        continue_url: null
    });
    closeCheckout = () => De(() => {
        this.messages$.set([]), this.chatSDK$.set(null), this.checkoutSession$.set(null), this.billingAddress$.set(null), this.paymentSheetButtonCta$.set(""), this.checkoutPromise$.set(null), this.status$.set("idle"), this.paymentDetails$.set(null), this.managedPaymentMethodDetails$.set([]), this.savedPaymentMethodDetails$.set([]), this.paymentMethodSelectionScreenConfig$.set(null), this.billingAddress$.set(null)
    });
    cancelCheckout$ = () => {
        const e = this.checkoutPromise$(),
            o = this.checkoutSession$();
        e && o ? e.resolve(this.toCancelledCompleteCheckoutSession(o)) : e ? .reject(), this.closeCheckout()
    };
    completeCheckout$ = e => {
        this.status$.set("complete"), this.checkoutPromise$() ? .resolve ? .(e)
    };
    addErrorMessage$ = e => {
        this.messages$.set([...this.messages$(), ze({
            code: "invalid",
            content: e
        })])
    };
    fetchStripeSession$ = async () => {
        const e = window.location.href,
            o = e.includes("/share/"),
            n = this.conversation.serverId$(),
            {
                widgetParent: s,
                connectorId: r
            } = M(this.chatSDK$()),
            {
                name: l,
                logoUrl: v
            } = M(this.resolvedWidget$()),
            p = M(this.checkoutSession$());
        try {
            const {
                cart: C,
                customer_id: I,
                id: T,
                customer_session_client_secret: k,
                publishable_key: S,
                allowed_countries: g,
                payment_surfaces_and_types: w,
                managed_payment_method_details: H,
                saved_payment_method_details: Y,
                payment_method_selection_screen_config: V,
                seller_details: _,
                payment_sheet_button_cta: c
            } = await vt.safePost("/shopping/ecosystem/checkout_v2", {
                requestBody: { ...p,
                    logo_url: v ? ? null,
                    merchant: {
                        name: l ? ? ""
                    },
                    ...n ? {
                        conversation_id: n
                    } : {},
                    shared_conversation_url: o ? e : null,
                    ecosystem_app_uri: s,
                    connector_id: r
                }
            }), R = He(C ? .errors);
            if (R) {
                const E = R.original_error;
                return xe({
                    conversation: this.conversation,
                    checkoutId: p.id,
                    connectorId: r,
                    messageId: this.chatSDK$() ? .toolMessageId ? ? null
                }, "non_displayable_cart_error", E), this.checkoutPromise$() ? .reject(E ? ? R), this.closeCheckout(), {
                    error: "Failed to load cart session (ecosystem)"
                }
            }
            return !k || !S ? (xe({
                conversation: this.conversation,
                checkoutId: p.id,
                connectorId: r,
                messageId: this.chatSDK$() ? .toolMessageId ? ? null
            }, "error_response_from_endpoint", "Missing customer_session_client_secret or publishable_key"), {
                error: "Failed to load cart session (ecosystem)"
            }) : (De(() => {
                this.orderId$.set(T), this.footerMessage$.set(C ? .footer_level_message ? ? null), this.publishableKey$.set(S), this.customerId$.set(I), this.paymentTypes$.set(w ? .filter(E => E.surface === "payment_sheet").flatMap(E => E.types) ? ? []), this.allowedCountries$.set(g), this.managedPaymentMethodDetails$.set(this.toPaymentMethodDetails(H)), this.savedPaymentMethodDetails$.set(this.toPaymentMethodDetails(Y)), this.paymentMethodSelectionScreenConfig$.set(V), this.sellerDetails$.set(_), this.paymentSheetButtonCta$.set(c)
            }), {
                client_secret: k,
                publishable_key: S
            })
        } catch (C) {
            throw xe({
                conversation: this.conversation,
                checkoutId: p.id,
                connectorId: r,
                messageId: this.chatSDK$() ? .toolMessageId ? ? null
            }, "error_thrown_from_endpoint", C instanceof Error ? C.message : "Unknown error"), C
        }
    }
}
const lo = $t(t => new io(t)),
    ao = /^[A-Z]{3}$/,
    ro = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/i,
    co = /^\+[1-9]\d{1,14}$/,
    uo = ["fee", "tax", "fulfillment", "discount", "items_discount", "tip"];

function a(t, e, o) {
    if (!t) {
        if (o) throw new Error(`Invalid checkout session: ${e}`);
        console.warn(`Invalid checkout session: ${e}`)
    }
}
const h = (t, e, o) => {
        a(t.trim().length > 0, `${e} must be a non-empty string`, o)
    },
    J = (t, e, o, n) => {
        a(t.length <= e, `${o} must be ${e} characters or fewer`, n)
    },
    P = (t, e, o) => {
        a(Number.isInteger(t), `${e} must be provided in integer minor currency units`, o), a(t >= 0, `${e} must be greater than or equal to 0`, o)
    },
    mo = (t, e, o) => {
        a(Number.isInteger(t) && t > 0, `${e} must be a positive integer`, o)
    },
    Be = t => ro.test(t) && !Number.isNaN(Date.parse(t)),
    po = (t, e) => {
        a(t.length > 0, "links must include at least one entry (e.g. terms of use or privacy policy)", e), t.forEach((o, n) => {
            h(o.url, `links[${n}].url`, e);
            try {
                new URL(o.url)
            } catch {
                throw new Error(`Invalid checkout session: links[${n}].url must be an absolute URL`)
            }
        })
    },
    _o = (t, e) => {
        h(t.name, "fulfillment_address.name", e), J(t.name, 256, "fulfillment_address.name", e), h(t.line_one, "fulfillment_address.line_one", e), J(t.line_one, 60, "fulfillment_address.line_one", e), t.line_two ? .trim() && J(t.line_two, 60, "fulfillment_address.line_two", e), h(t.city, "fulfillment_address.city", e), J(t.city, 60, "fulfillment_address.city", e), h(t.state, "fulfillment_address.state", e), h(t.country, "fulfillment_address.country", e), h(t.postal_code, "fulfillment_address.postal_code", e), J(t.postal_code, 20, "fulfillment_address.postal_code", e), t.phone_number && a(co.test(t.phone_number), "fulfillment_address.phone_number must follow the E.164 format (example: +15551234567)", e)
    },
    fo = (t, e) => {
        const o = {
            baseAmount: 0,
            discount: 0,
            subtotal: 0,
            tax: 0,
            total: 0
        };
        for (const [n, s] of t.entries()) {
            h(s.id, `line_items[${n}].id`, e), h(s.item.id, `line_items[${n}].item.id`, e), mo(s.item.quantity, `line_items[${n}].item.quantity`, e), P(s.base_amount, `line_items[${n}].base_amount`, e), P(s.discount, `line_items[${n}].discount`, e), P(s.subtotal, `line_items[${n}].subtotal`, e), P(s.tax, `line_items[${n}].tax`, e), P(s.total, `line_items[${n}].total`, e);
            const r = s.base_amount - s.discount;
            a(s.subtotal === r, `line_items[${n}].subtotal must equal base_amount - discount (${r})`, e);
            const l = s.subtotal + s.tax;
            a(s.total === l, `line_items[${n}].total must equal subtotal + tax (${l})`, e), o.baseAmount += s.base_amount, o.discount += s.discount, o.subtotal += s.subtotal, o.tax += s.tax, o.total += s.total
        }
        return o
    },
    ho = (t, e, o) => {
        a(t.length > 0, "totals must contain at least one entry", o);
        const n = {};
        for (const [S, g] of t.entries()) {
            P(g.amount, `totals[${S}].amount`, o);
            const w = n[g.type];
            w != null && a(uo.includes(g.type), `totals contains duplicate total type "${g.type}"`, o), n[g.type] = (w ? ? 0) + g.amount
        }
        a(n.items_base_amount !== void 0, "totals must include an items_base_amount entry", o), a(n.subtotal !== void 0, "totals must include a subtotal entry", o), a(n.total !== void 0, "totals must include a total entry", o);
        const s = n;
        a(s.items_base_amount === e.baseAmount, `totals.items_base_amount (${s.items_base_amount}) must equal the sum of line item base_amounts (${e.baseAmount})`, o), s.items_discount !== void 0 && a(s.items_discount === e.discount, `totals.items_discount (${s.items_discount}) must equal the sum of line item discounts (${e.discount})`, o);
        const r = s.items_discount ? ? e.discount,
            l = e.baseAmount - r;
        a(s.subtotal === l, `subtotal must equal items_base_amount - items_discount (${l})`, o);
        const v = s.discount ? ? 0,
            p = s.fulfillment ? ? 0,
            C = s.tax ? ? e.tax,
            I = s.fee ? ? 0,
            T = s.tip ? ? 0,
            k = e.baseAmount - r - v + p + C + I + T;
        return a(s.total === k, `total must equal items_base_amount - items_discount - discount + fulfillment + tax + fee (${k})`, o), s
    },
    yo = (t, e) => {
        const o = new Map;
        for (const [n, s] of t.entries()) {
            if (h(s.id, `fulfillment_options[${n}].id`, e), h(s.title, `fulfillment_options[${n}].title`, e), s.type === "shipping" && h(s.subtitle, `fulfillment_options[${n}].subtitle`, e), P(s.subtotal, `fulfillment_options[${n}].subtotal`, e), P(s.tax, `fulfillment_options[${n}].tax`, e), P(s.total, `fulfillment_options[${n}].total`, e), a(s.total === s.subtotal + s.tax, `fulfillment_options[${n}].total must equal subtotal + tax`, e), a(!o.has(s.id), `fulfillment option ids must be unique; duplicate id "${s.id}"`, e), s.type === "shipping") {
                h(s.carrier, `fulfillment_options[${n}].carrier`, e), a(Be(s.earliest_delivery_time), `fulfillment_options[${n}].earliest_delivery_time must be an RFC 3339 timestamp`, e), a(Be(s.latest_delivery_time), `fulfillment_options[${n}].latest_delivery_time must be an RFC 3339 timestamp`, e);
                const r = Date.parse(s.earliest_delivery_time),
                    l = Date.parse(s.latest_delivery_time);
                a(r <= l, `fulfillment_options[${n}].earliest_delivery_time must be before or equal to latest_delivery_time`, e)
            }
            o.set(s.id, s)
        }
        return o
    },
    go = (t, e = !1) => {
        h(t.id, "id", e), a(ao.test(t.currency), `currency "${t.currency}" must be a lower-case ISO 4217 code`, e), a(t.payment_provider.supported_payment_methods.length > 0, "payment_provider.supported_payment_methods must include at least one entry", e), h(t.payment_provider.merchant_id, "payment_provider.merchant_id", e), a(t.line_items.length > 0, "line_items must contain at least one entry", e), a(t.totals.length > 0, "totals must contain at least one entry", e), po(t.links, e), t.fulfillment_address && _o(t.fulfillment_address, e);
        const o = fo(t.line_items, e),
            n = ho(t.totals, o, e),
            s = yo(t.fulfillment_options, e);
        if (t.fulfillment_option_id) {
            const r = M(s.get(t.fulfillment_option_id), `fulfillment_option_id "${t.fulfillment_option_id}" must match an available fulfillment option`);
            a(n.fulfillment !== void 0, "totals must include a fulfillment entry when a fulfillment option is selected", e), a(n.fulfillment === r.total, `fulfillment total (${n.fulfillment}) must equal the selected fulfillment option total (${r.total})`, e)
        }
    },
    bo = async ({
        chatSDK: t,
        clientThreadId: e,
        resolvedWidget: o,
        checkoutSession: n
    }) => {
        const s = to(n);
        return go(s, !1), lo(Ct(e)).openCheckout(t, o, s)
    },
    $o = ({
        body: t
    }) => t.trim().length > 0 ? {
        description: t
    } : void 0,
    vo = (t, e) => {
        const o = $o(e);
        switch (e.level) {
            case "warning":
                t.warning(e.title, o);
                return;
            case "success":
                t.success(e.title, o);
                return;
            case "danger":
                t.danger(e.title, o);
                return
        }
    },
    Co = t => t ? .order != null,
    Lo = t => {
        "use forget";
        const e = mt.c(102),
            {
                heightHint: o,
                safeArea: n,
                widgetRef: s,
                conversation: r,
                chatSDK: l,
                clientThreadId: v,
                resolvedWidget: p,
                onReady: C,
                onClose: I,
                onCanGoBack: T,
                onCanGoForward: k,
                onCheckoutComplete: S,
                onSetOpenInAppUrl: g,
                onUpdateWidgetState: w,
                domain: H,
                html: Y,
                attributionId: V,
                widgetId: _,
                widgetParent: c,
                suggestionMessageId: R,
                widgetType: E,
                features: fe,
                subdomain: he,
                csp: N,
                locale: ye,
                params: ge,
                displayMode: be,
                forceFullHeight: Ue,
                forceFullWidth: Fe,
                forceIntrinsicHeight: Le
            } = t,
            Ne = o === void 0 ? null : o,
            qe = Ue === void 0 ? !1 : Ue,
            st = Fe === void 0 ? !1 : Fe,
            nt = Le === void 0 ? !1 : Le;
        let Q;
        e[0] !== r ? (Q = Rt(r), e[0] = r, e[1] = Q) : Q = e[1];
        const u = Q,
            [it, lt] = je.useState(Ne),
            at = je.useRef(null),
            $e = kt(s, at),
            rt = St(),
            G = wt();
        let X;
        e[2] !== l || e[3] !== u ? (X = () => u.getWidgetStateAndProps$(l), e[2] = l, e[3] = u, e[4] = X) : X = e[4];
        const {
            toolInput: ve,
            toolOutput: Ce,
            widgetState: ke,
            toolResponseMetadata: Se
        } = It(X);
        let ee;
        e[5] !== v ? (ee = Et(v), e[5] = v, e[6] = ee) : ee = e[6];
        const O = ee;
        let te;
        e[7] !== l.connectorId ? (te = A => new Promise(D => {
            const U = A ? ? l.connectorId;
            if (!U) {
                D({
                    didConnect: !1
                });
                return
            }
            Ke(pt, {
                connectorId: U,
                redirectAfter: window.location.href,
                noRedirect: !0,
                referrer: Tt.WidgetConnectSheet,
                onComplete: F => D({
                    didConnect: !0,
                    linkId: typeof F ? .linkId == "string" ? F.linkId : void 0
                }),
                onClose: () => D({
                    didConnect: !1
                })
            })
        }), e[7] = l.connectorId, e[8] = te) : te = e[8];
        const Z = te,
            we = !nt && "max-h-full flex-shrink overflow-y-auto",
            Ie = qe && "h-full",
            Ee = st && "w-full";
        let q;
        e[9] !== Ie || e[10] !== Ee || e[11] !== we ? (q = Mt(we, Ie, Ee), e[9] = Ie, e[10] = Ee, e[11] = we, e[12] = q) : q = e[12];
        const Me = qe ? void 0 : Math.max(it ? ? 0, Ne ? ? 0);
        let j;
        e[13] !== Me ? (j = {
            height: Me
        }, e[13] = Me, e[14] = j) : j = e[14];
        const Te = rt ? ? "light";
        let oe;
        e[15] === Symbol.for("react.memo_cache_sentinel") ? (oe = A => {
            lt(A)
        }, e[15] = oe) : oe = e[15];
        let W;
        if (e[16] !== l || e[17] !== v || e[18] !== N || e[19] !== H || e[20] !== u || e[21] !== T || e[22] !== k || e[23] !== S || e[24] !== I || e[25] !== g || e[26] !== w || e[27] !== Z || e[28] !== p || e[29] !== O || e[30] !== G || e[31] !== _ || e[32] !== c) {
            let A, D;
            e[34] !== I ? (A = () => I("request_close"), D = () => I("escape_key"), e[34] = I, e[35] = A, e[36] = D) : (A = e[35], D = e[36]);
            let U;
            e[37] !== l || e[38] !== v || e[39] !== S || e[40] !== p ? (U = async d => {
                const f = await bo({
                    chatSDK: l,
                    clientThreadId: v,
                    checkoutSession: d,
                    resolvedWidget: p
                });
                return Co(f) && S ? .(f), f
            }, e[37] = l, e[38] = v, e[39] = S, e[40] = p, e[41] = U) : U = e[41];
            let F;
            e[42] !== T || e[43] !== k ? (F = d => {
                const {
                    canGoBack: f,
                    canGoForward: Pe
                } = d;
                T(f), k ? .(Pe)
            }, e[42] = T, e[43] = k, e[44] = F) : F = e[44];
            let ne;
            e[45] !== G ? (ne = d => vo(G, d), e[45] = G, e[46] = ne) : ne = e[46];
            let ie;
            e[47] !== g ? (ie = d => g ? .(d), e[47] = g, e[48] = ie) : ie = e[48];
            let le, ae;
            e[49] !== l.widgetSessionId || e[50] !== u || e[51] !== _ || e[52] !== c ? (le = (d, f) => u.callTool$({
                appUri: M(c),
                name: d,
                args: f,
                callContext: {
                    messageId: _,
                    widgetContext: {
                        appUri: c,
                        widgetId: _,
                        widgetSessionId: l.widgetSessionId,
                        source: "iframe"
                    }
                }
            }), ae = d => u.callMcp$(M(c), d, {
                messageId: _,
                widgetContext: {
                    appUri: c,
                    widgetId: _,
                    widgetSessionId: l.widgetSessionId,
                    source: "iframe"
                }
            }), e[49] = l.widgetSessionId, e[50] = u, e[51] = _, e[52] = c, e[53] = le, e[54] = ae) : (le = e[53], ae = e[54]);
            let re, ce, de;
            e[55] !== u || e[56] !== c ? (re = (d, f) => u.uploadFile$(M(c), d, f), ce = d => u.getFileDownloadUrl$(M(c), d.fileId), de = d => u.getFileMetadata$(M(c), d.fileId), e[55] = u, e[56] = c, e[57] = re, e[58] = ce, e[59] = de) : (re = e[57], ce = e[58], de = e[59]);
            let ue;
            e[60] !== Z ? (ue = d => {
                const {
                    connectorId: f
                } = d;
                return Z(f)
            }, e[60] = Z, e[61] = ue) : ue = e[61];
            let me;
            e[62] !== u || e[63] !== c ? (me = () => u.selectFiles$(M(c)), e[62] = u, e[63] = c, e[64] = me) : me = e[64];
            let pe;
            e[65] !== l.widgetSessionId || e[66] !== u || e[67] !== w || e[68] !== _ || e[69] !== c ? (pe = (d, f) => w ? w(d, f) : u.setWidgetState$(d, f, {
                appUri: c,
                widgetId: _,
                widgetSessionId: l.widgetSessionId,
                source: "iframe"
            }), e[65] = l.widgetSessionId, e[66] = u, e[67] = w, e[68] = _, e[69] = c, e[70] = pe) : pe = e[70], W = {
                notifyIntrinsicHeight: oe,
                openExternal(d) {
                    const {
                        href: f,
                        redirectUrl: Pe,
                        openMode: ct
                    } = d, dt = Pe === !1 ? null : O ? new URL(Pt(O), window.location.origin).toString() : new URL(window.location.href).toString();
                    xt({
                        href: f,
                        csp: N,
                        redirectDomains: p.redirectDomains,
                        resolvedPineappleUri: l.metadata.resolved_pineapple_uri ? ? null,
                        domain: H,
                        distributionChannel: l.distributionChannel,
                        redirectUrl: dt,
                        openMode: ct
                    })
                },
                requestClose: A,
                notifyEscapeKey: D,
                requestCheckout: U,
                notifyNavigation: F,
                showToast: ne,
                setOpenInAppUrl: ie,
                callTool: le,
                callMcp: ae,
                uploadFile: re,
                getFileDownloadUrl: ce,
                getFileMetadata: de,
                requestLinkToConnector: ue,
                selectFiles: me,
                updateWidgetState: pe
            }, e[16] = l, e[17] = v, e[18] = N, e[19] = H, e[20] = u, e[21] = T, e[22] = k, e[23] = S, e[24] = I, e[25] = g, e[26] = w, e[27] = Z, e[28] = p, e[29] = O, e[30] = G, e[31] = _, e[32] = c, e[33] = W
        } else W = e[33];
        let B;
        e[71] !== V || e[72] !== l.distributionChannel || e[73] !== l.oaiSubjectId || e[74] !== N || e[75] !== be || e[76] !== fe || e[77] !== $e || e[78] !== Y || e[79] !== ye || e[80] !== C || e[81] !== ge || e[82] !== p.permissions || e[83] !== p.toolInfo || e[84] !== n || e[85] !== O || e[86] !== he || e[87] !== R || e[88] !== Te || e[89] !== W || e[90] !== ve || e[91] !== Ce || e[92] !== Se || e[93] !== _ || e[94] !== c || e[95] !== ke || e[96] !== E ? (B = We.jsx(Dt, {
            host: "chatgpt",
            html: Y,
            ref: $e,
            theme: Te,
            attributionId: V,
            measureWidth: !1,
            onReady: C,
            conversationId: O,
            widgetId: _,
            widgetParent: c,
            widgetDistributionChannel: l.distributionChannel,
            suggestionMessageId: R,
            widgetType: E,
            subdomain: he,
            widgetState: ke,
            toolInput: ve,
            toolOutput: Ce,
            toolResponseMetadata: Se,
            toolInfo: p.toolInfo,
            subjectId: l.oaiSubjectId,
            features: fe,
            permissions: p.permissions,
            viewParams: ge,
            safeArea: n,
            displayMode: be,
            api: W,
            csp: N,
            locale: ye
        }), e[71] = V, e[72] = l.distributionChannel, e[73] = l.oaiSubjectId, e[74] = N, e[75] = be, e[76] = fe, e[77] = $e, e[78] = Y, e[79] = ye, e[80] = C, e[81] = ge, e[82] = p.permissions, e[83] = p.toolInfo, e[84] = n, e[85] = O, e[86] = he, e[87] = R, e[88] = Te, e[89] = W, e[90] = ve, e[91] = Ce, e[92] = Se, e[93] = _, e[94] = c, e[95] = ke, e[96] = E, e[97] = B) : B = e[97];
        let se;
        return e[98] !== q || e[99] !== j || e[100] !== B ? (se = We.jsx("div", {
            className: q,
            style: j,
            children: B
        }), e[98] = q, e[99] = j, e[100] = B, e[101] = se) : se = e[101], se
    };
export {
    Lo as E, Oo as a, so as b, He as c, To as d, Qe as e, Po as f, lo as g, Ro as h, xo as i, Do as j, Ao as k, Uo as l, bo as m, vo as s, Fo as t
};
//# sourceMappingURL=f7e0bf69-k16b7dassy0t23ka.js.map