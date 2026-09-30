import {
    c as Ee,
    u as O,
    r as y,
    j as s,
    v as ze,
    s as Ge,
    o as Ie
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    p as it,
    m as $e,
    C as J,
    P as Te,
    e as De,
    D as Re,
    f as Oe,
    R as rt,
    b as lt,
    c as Ne,
    u as ot,
    d as ct,
    S as dt,
    g as pt
} from "./1622ef1c-lbin4ocjqw0z4zbp.js";
import {
    l as ut,
    d as mt,
    m as ht,
    e as gt,
    g as Ue,
    i as ee,
    v as Qe,
    f as He,
    a as ft,
    h as xt,
    s as yt,
    j as fe,
    c as E,
    k as _t,
    n as xe,
    o as ke,
    u as K,
    b as Ce,
    p as bt
} from "./6fd89734-ivsscv8296nz7zhh.js";
import {
    g as vt,
    c as Mt,
    u as he
} from "./2478e8be-fu39n45z77ccw3bg.js";
import {
    cN as kt,
    _ as T,
    ge as D,
    cz as Be,
    a0 as Ye,
    D as Pe,
    bY as we,
    aJ as Fe,
    q as be,
    l as ve,
    hY as Ze,
    af as N,
    B7 as je,
    jP as Ct,
    lT as jt,
    h2 as St
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    bK as wt,
    wr as Et,
    di as Je,
    gP as Nt,
    bM as Pt,
    aU as At,
    cB as It,
    ya as Tt
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    a as Dt,
    C as Rt
} from "./e802fc66-icima1dn58d02dbp.js";
import {
    a as Ot,
    u as Ut
} from "./083e3de5-b8q60q8uxlyk4vk7.js";
import {
    a as Me,
    u as Ae,
    E as Bt,
    P as Ft,
    A as Ke
} from "./b8ba2ec7-b3h6sni00olgnf96.js";
import {
    a as Lt,
    u as qt
} from "./eda93c10-owa5kvkms7jsn4fn.js";
import Vt from "./d4fd05ef-jcd8acyt60dknv7p.js";
import "./411304d4-l2o3ynhpzevzmar6.js";
import "./c8d36e23-ccuyzajtuddlftds.js";
import "./82244417-gtg7yq4t8dhuwljw.js";
import "./74006267-m5l37lodlljn1srb.js";
import "./f254c486-e4e4t6ee3eghlnbc.js";
import "./c50694f1-efc0umb4i9cif66s.js";
import "./f6f4f1b2-gtlbp7j4szobo0y1.js";
import "./1bc04b52-lymnctp12j4ukscl.js";
import "./1bc04b52-h1em0bjkpkjv8ykw.js";
import "./1bc04b52-homyy2s5cy2i6moh.js";
import "./1bc04b52-pfqcgruptyx7togk.js";
import "./1bc04b52-hnu6g21afx0au4ng.js";
const Wt = async ({
    intl: t,
    store: e,
    clientThreadId: a
}) => {
    const n = window.location.href,
        l = n.includes("/share/");
    try {
        const r = kt(a),
            i = await vt({
                items: e.items,
                cart: e.cart,
                ...l ? {
                    sharedConversationUrl: n
                } : {
                    conversationId: r
                },
                existing_customer_session_client_secret: e.preloadCustomerSessionClientSecret
            });
        e.setInitialCart(i);
        const u = (i.cart.line_items ? .length ? ? 0) > 0,
            g = i.cart.errors ? .length > 0 && i.cart.errors.every(c => c.merchant_error_code === "out_of_stock");
        return i.cart.errors ? .length > 0 && !(u && g) ? (T.logEventWithStatsig("product_checkout", "product_checkout", { ...D(e.cartMetadata ? ? {}),
            action: "cart_load_failed",
            reason: "error_response_from_endpoint",
            error_message: i.cart.errors[0].message
        }), {
            error: i.cart.errors[0].message
        }) : i.customer_session_client_secret && i.publishable_key ? (i.cart.shipping_option_id && ut(e, i.id, i.cart.shipping_options, i.cart.shipping_option_id, "prefill"), i.cart.shipping_address && mt(e, i.id, { ...ht(i.cart.shipping_address),
            complete: !0
        }, "prefill"), {
            client_secret: i.customer_session_client_secret,
            publishable_key: i.publishable_key
        }) : (T.logEventWithStatsig("product_checkout", "product_checkout", { ...D(e.cartMetadata ? ? {}),
            action: "cart_load_failed",
            reason: "error_response_from_endpoint",
            error_message: "Missing customer_session_client_secret or publishable_key"
        }), {
            error: t.formatMessage({
                id: "imEcZX",
                defaultMessage: "Failed to load cart session (1300)"
            })
        })
    } catch (r) {
        return T.logEventWithStatsig("product_checkout", "product_checkout", { ...D(e.cartMetadata ? ? {}),
            action: "cart_load_failed",
            reason: "error_thrown_from_endpoint",
            error_message: r instanceof Error ? r.message : "Unknown error"
        }), {
            error: r instanceof Error ? r.message : t.formatMessage({
                id: "S86mYy",
                defaultMessage: "Failed to load cart session (1301)"
            })
        }
    }
};

function zt(t) {
    "use forget";
    const e = Ee.c(94),
        {
            onClose: a,
            phoneNumber: n,
            triggeringProduct: l,
            logEvent: r,
            onSuccess: i,
            onBack: u,
            onCancel: g
        } = t,
        c = O(),
        [m, p] = y.useState(""),
        [f, d] = y.useState(null),
        [o, h] = y.useState(null),
        _ = Ot(),
        x = Ut();
    let v, k;
    e[0] !== r ? (v = () => {
        r("sheet_shown", {
            step: "finish_enrollment"
        })
    }, k = [r], e[0] = r, e[1] = v, e[2] = k) : (v = e[1], k = e[2]), y.useEffect(v, k);
    let M;
    e[3] !== g || e[4] !== a ? (M = () => {
        g(), a()
    }, e[3] = g, e[4] = a, e[5] = M) : M = e[5];
    const j = M;
    let S;
    e[6] !== c ? (S = $ => {
        const X = $;
        return (typeof X ? .json ? .detail == "string" ? X.json.detail : void 0) ? ? X ? .message ? ? c.formatMessage({
            id: "MbV2xj",
            defaultMessage: "Verification failed, please try again."
        })
    }, e[6] = c, e[7] = S) : S = e[7];
    const P = S;
    let b;
    e[8] !== m || e[9] !== _ || e[10] !== r || e[11] !== a || e[12] !== i || e[13] !== n || e[14] !== P || e[15] !== l ? (b = async () => {
        if (r("verify_code_tapped", {
                step: "finish_enrollment"
            }), m.trim().length === 6) try {
            d(null), await _.mutateAsync({
                phoneNumber: n,
                verificationCode: m.trim(),
                triggeringProduct: l
            }), r("verify_code_succeeded", {
                step: "finish_enrollment"
            }), a(), i()
        } catch ($) {
            const ue = P($);
            r("verify_code_failed", {
                step: "finish_enrollment",
                reason: ue
            }), d(ue)
        }
    }, e[8] = m, e[9] = _, e[10] = r, e[11] = a, e[12] = i, e[13] = n, e[14] = P, e[15] = l, e[16] = b) : b = e[16];
    const w = b;
    let A;
    e[17] !== c || e[18] !== r || e[19] !== n || e[20] !== x || e[21] !== P || e[22] !== l ? (A = async () => {
        r("resend_code_tapped", {
            step: "finish_enrollment"
        });
        try {
            d(null), h(null), await x.mutateAsync({
                phoneNumber: n,
                triggeringProduct: l
            }), r("send_code_succeeded", {
                step: "finish_enrollment",
                resend: !0
            }), h(c.formatMessage({
                id: "6ZdNIT",
                defaultMessage: "Code sent, please check your phone."
            }))
        } catch ($) {
            const ue = P($);
            r("send_code_failed", {
                step: "finish_enrollment",
                resend: !0,
                reason: ue
            }), d(ue)
        }
    }, e[17] = c, e[18] = r, e[19] = n, e[20] = x, e[21] = P, e[22] = l, e[23] = A) : A = e[23];
    const U = A;
    let H;
    e[24] !== u || e[25] !== a ? (H = () => {
        a(), u()
    }, e[24] = u, e[25] = a, e[26] = H) : H = e[26];
    const te = H;
    let R;
    e[27] !== c ? (R = c.formatMessage({
        id: "Oq/uUi",
        defaultMessage: "Enter code"
    }), e[27] = c, e[28] = R) : R = e[28];
    let B;
    e[29] !== R ? (B = s.jsx("span", {
        className: "text-heading-3",
        children: R
    }), e[29] = R, e[30] = B) : B = e[30];
    let F;
    e[31] !== c ? (F = c.formatMessage({
        id: "LsrdZy",
        defaultMessage: "Back"
    }), e[31] = c, e[32] = F) : F = e[32];
    let L;
    e[33] !== te || e[34] !== F ? (L = s.jsx(Be.Button, {
        color: "secondary",
        title: F,
        onClick: te
    }), e[33] = te, e[34] = F, e[35] = L) : L = e[35];
    let q;
    e[36] !== c ? (q = c.formatMessage({
        id: "Gjhl3C",
        defaultMessage: "Verify"
    }), e[36] = c, e[37] = q) : q = e[37];
    let V;
    e[38] !== m || e[39] !== _.isPending ? (V = m.trim().length !== 6 || _.isPending, e[38] = m, e[39] = _.isPending, e[40] = V) : V = e[40];
    let Y;
    e[41] !== _.isPending || e[42] !== w || e[43] !== q || e[44] !== V ? (Y = s.jsx(Be.Button, {
        "data-testid": "shopping-checkout-phone-verification-step-up-modal__verify",
        title: q,
        color: "primary",
        disabled: V,
        loading: _.isPending,
        onClick: w
    }), e[41] = _.isPending, e[42] = w, e[43] = q, e[44] = V, e[45] = Y) : Y = e[45];
    let W;
    e[46] !== w ? (W = $ => {
        $.preventDefault(), w()
    }, e[46] = w, e[47] = W) : W = e[47];
    let z;
    e[48] !== c || e[49] !== n ? (z = c.formatMessage({
        id: "FH0uY0",
        defaultMessage: "Enter the 6-digit code we sent to {phoneNumber}."
    }, {
        phoneNumber: n
    }), e[48] = c, e[49] = n, e[50] = z) : z = e[50];
    let G;
    e[51] !== z ? (G = s.jsx("p", {
        children: z
    }), e[51] = z, e[52] = G) : G = e[52];
    let C;
    e[53] !== c ? (C = c.formatMessage({
        id: "ImwJZd",
        defaultMessage: "Enter code"
    }), e[53] = c, e[54] = C) : C = e[54];
    let I;
    e[55] !== f ? (I = $ => {
        const X = $.target.value.replace(/\D/g, "").slice(0, 6);
        p(X), f && d(null)
    }, e[55] = f, e[56] = I) : I = e[56];
    let se;
    e[57] !== m || e[58] !== C || e[59] !== I ? (se = s.jsx(wt, {
        ariaLabel: !1,
        name: "shopping-checkout-phone-verification-code",
        value: m,
        inputMode: "numeric",
        maxLength: 6,
        autoComplete: "one-time-code",
        placeholder: C,
        onChange: I
    }), e[57] = m, e[58] = C, e[59] = I, e[60] = se) : se = e[60];
    let ae;
    e[61] !== f ? (ae = f && s.jsx("p", {
        className: "text-xs text-red-500",
        role: "alert",
        children: f
    }), e[61] = f, e[62] = ae) : ae = e[62];
    let ne;
    e[63] !== c ? (ne = c.formatMessage({
        id: "5hOqfV",
        defaultMessage: "Didn't get a code?"
    }), e[63] = c, e[64] = ne) : ne = e[64];
    let ie;
    e[65] !== ne ? (ie = s.jsx("span", {
        children: ne
    }), e[65] = ne, e[66] = ie) : ie = e[66];
    let re;
    e[67] !== c || e[68] !== x.isPending ? (re = x.isPending ? c.formatMessage({
        id: "GR93Ko",
        defaultMessage: "Sending..."
    }) : c.formatMessage({
        id: "enMU6z",
        defaultMessage: "Send again"
    }), e[67] = c, e[68] = x.isPending, e[69] = re) : re = e[69];
    let le;
    e[70] !== U || e[71] !== x.isPending || e[72] !== re ? (le = s.jsx("button", {
        type: "button",
        className: "ms-1 text-blue-400",
        onClick: U,
        disabled: x.isPending,
        children: re
    }), e[70] = U, e[71] = x.isPending, e[72] = re, e[73] = le) : le = e[73];
    let oe;
    e[74] !== o ? (oe = o && s.jsx("div", {
        className: "text-token-text-primary mt-1 text-xs",
        children: o
    }), e[74] = o, e[75] = oe) : oe = e[75];
    let ce;
    e[76] !== ie || e[77] !== le || e[78] !== oe ? (ce = s.jsxs("div", {
        className: "text-token-text-secondary text-xs",
        children: [ie, le, oe]
    }), e[76] = ie, e[77] = le, e[78] = oe, e[79] = ce) : ce = e[79];
    let de;
    e[80] !== G || e[81] !== se || e[82] !== ae || e[83] !== ce ? (de = s.jsxs("div", {
        className: "flex flex-col gap-3",
        children: [G, se, ae, ce]
    }), e[80] = G, e[81] = se, e[82] = ae, e[83] = ce, e[84] = de) : de = e[84];
    let pe;
    e[85] !== W || e[86] !== de ? (pe = s.jsx("form", {
        onSubmit: W,
        className: "text-token-text-primary w-full text-sm",
        children: de
    }), e[85] = W, e[86] = de, e[87] = pe) : pe = e[87];
    let ge;
    return e[88] !== j || e[89] !== L || e[90] !== Y || e[91] !== pe || e[92] !== B ? (ge = s.jsx(Ye, {
        testId: "modal-shopping-checkout-phone-verification-step-up",
        isOpen: !0,
        type: "success",
        noPadding: !0,
        contentClassName: "flex flex-col items-start gap-6 p-6",
        headerClassName: "!px-6 !py-0 !h-[76px] !items-center",
        showCloseButton: !0,
        hasSeparator: !0,
        onClose: j,
        title: B,
        secondaryButton: L,
        primaryButton: Y,
        children: pe
    }), e[88] = j, e[89] = L, e[90] = Y, e[91] = pe, e[92] = B, e[93] = ge) : ge = e[93], ge
}
const Xe = (t, e, a = {}, n) => {
        const l = { ...D(t.cartMetadata ? ? {}),
            checkout_id: t.cartId,
            ...n ? {
                attempt_id: n
            } : {},
            action: e,
            ...a
        };
        T.logEventWithStatsig("product_checkout", "product_checkout", l), Pe.addAction(`shopping_checkout.${e}`, {
            merchant_id: t.merchant ? .externalId,
            merchant_network_id: t.merchant ? .networkId,
            cart_total: t.grandTotal.value,
            ..."reason" in a ? {
                reason: a.reason
            } : {},
            ...a
        })
    },
    Le = "COMMERCE";
class et extends Error {
    constructor(e = "Phone verification cancelled") {
        super(e), this.name = "PhoneStepUpCancelledError"
    }
}
async function Gt(t, e) {
    const a = (n, l = {}) => Xe(t, n, l, e);
    return await new Promise((n, l) => {
        let r = !1;
        const i = m => {
                r || (r = !0, m())
            },
            u = m => {
                a("flow_cancelled", m ? {
                    step: m
                } : void 0), i(() => l(new et))
            },
            g = m => {
                we(Dt, {
                    triggeringProduct: Le,
                    logEvent: a,
                    onContinue: p => {
                        c(p)
                    },
                    onCancel: () => u("start_enrollment"),
                    onSkipVerification: () => {
                        i(() => n())
                    },
                    initialPhoneNumber: m
                })
            },
            c = m => {
                we(zt, {
                    phoneNumber: m,
                    triggeringProduct: Le,
                    logEvent: a,
                    onBack: () => {
                        g(m)
                    },
                    onCancel: () => u("finish_enrollment"),
                    onSuccess: () => {
                        i(() => n())
                    }
                })
            };
        g()
    })
}
async function tt({
    store: t,
    merchant: e,
    elements: a,
    stripe: n,
    ctx: l,
    userEmail: r,
    intl: i,
    finalShippingAddress: u,
    expressPaymentType: g,
    paymentAttemptId: c,
    onConfirm: m,
    onComplete: p
}) {
    const f = performance.now();
    t.setCartStatus("submitting"), c || (c = ze());
    try {
        if ($t({
                store: t,
                merchant: e,
                finalShippingAddress: u,
                expressPaymentType: g,
                paymentAttemptId: c
            }), !Qt({
                elements: a,
                stripe: n,
                userEmail: r,
                intl: i,
                store: t,
                paymentAttemptId: c
            })) return;
        const d = g !== void 0;
        let o = null;
        if (t.cachedPaymentDetailsResponse && !d) o = t.cachedPaymentDetailsResponse;
        else if (o = await it({
                stripe: Fe(n),
                elements: Fe(a),
                intl: i,
                billingName: u ? .name ? ? t.billingAddress ? .name ? ? "",
                billingEmail: r ? ? "",
                isExpressCheckout: d
            }), o ? .isError) return Q({ ...o,
            store: t,
            paymentAttemptId: c
        });
        if (o) d || t.setCachedPaymentDetailsResponse(o);
        else return;
        m ? .(), await st({
            store: t,
            paymentMethod: o,
            intl: i,
            onComplete: p,
            paymentAttemptId: c,
            finalShippingAddress: u,
            startMs: f,
            expressPaymentType: g,
            ctx: l
        })
    } catch (d) {
        const o = d;
        let h = "payment_failed_general_error";
        const {
            stripe_error_code: _,
            stripe_decline_code: x
        } = o ? .json ? .detail || {};
        let v = _ && x ? await n.localizeError({
            code: _,
            decline_code: x
        }) : void 0;
        o.message === "Failed to fetch" && !v && (h = "payment_failed_network_error", v = i.formatMessage({
            id: "DPyhFG",
            defaultMessage: "Failed to submit payment (1347). Please refresh the page and try again."
        })), Q({
            store: t,
            action: "payment_failed",
            reason: h,
            uiMessage: v ? ? o.message ? ? i.formatMessage({
                id: "nyG5lS",
                defaultMessage: "Failed to submit payment (1350)"
            }),
            internalMessage: _ ? ? x ? `Stripe error code: ${_}  ::  Stripe decline code: ${x}` : o.message,
            paymentAttemptId: c
        })
    } finally {
        t.setCartStatus("idle")
    }
}

function $t({
    store: t,
    merchant: e,
    finalShippingAddress: a,
    expressPaymentType: n,
    paymentAttemptId: l
}) {
    const r = t.shippingOptions.find(i => i.id === t.shippingMethodId);
    ye(t, {
        merchant_name: e ? .title,
        merchant_url: e ? .url,
        totals: t.totals,
        total_price: t.grandTotal.value,
        shipping_city: a ? .city ? ? t.shippingAddress ? .city,
        shipping_state: a ? .state ? ? t.shippingAddress ? .state,
        shipping_zip: a ? .postal_code ? ? t.shippingAddress ? .postalCode,
        shipping_country: a ? .country ? ? t.shippingAddress ? .country,
        payment_method: at(t, n),
        shipping_method_name: r ? .title,
        shipping_method_price: r ? .subtotal,
        shipping_method_index: t.shippingOptions.findIndex(i => i.id === t.shippingMethodId),
        items: t.items.map(i => ({
            product_id: i.id,
            product_title: "title" in i ? i.title : void 0,
            variant: "variant" in i ? i.variant : void 0,
            quantity: i.quantity,
            price: "price" in i ? i.price : void 0
        })),
        action: "pay_button_clicked",
        attempt_id: l
    })
}

function Qt({
    elements: t,
    stripe: e,
    userEmail: a,
    intl: n,
    store: l,
    paymentAttemptId: r
}) {
    return !t || !e ? (Q({
        store: l,
        action: "payment_failed",
        reason: "elements_or_stripe_null",
        uiMessage: n.formatMessage({
            id: "/MYGq8",
            defaultMessage: "Failed to submit payment (1340)"
        }),
        internalMessage: "elements or stripe is null",
        paymentAttemptId: r
    }), !1) : a ? !0 : (Q({
        store: l,
        action: "payment_failed",
        reason: "user_email_empty",
        uiMessage: n.formatMessage({
            id: "Zs2vbs",
            defaultMessage: "Failed to submit payment (1346)"
        }),
        internalMessage: "userEmail is empty",
        paymentAttemptId: r
    }), !1)
}
async function st({
    store: t,
    paymentMethod: e,
    intl: a,
    onComplete: n,
    paymentAttemptId: l,
    finalShippingAddress: r,
    startMs: i,
    expressPaymentType: u,
    ctx: g,
    allowStepUpRetry: c = !0
}) {
    const m = e.billing_details ? .address ? $e(e.billing_details.name, e.billing_details.address, e.billing_details.phone) : t.billingAddress ? gt(t.billingAddress) : null;
    if (!e.id || !e.type || !m) {
        Q({
            store: t,
            action: "payment_failed",
            reason: "missing_payment_method_or_billing_address",
            uiMessage: a.formatMessage({
                id: "xYuTJ8",
                defaultMessage: "Failed to submit payment (1344)"
            }),
            internalMessage: "Missing payment method or billing address",
            extraLogData: {
                error_message: `Missing payment method: ${e.id} with type: ${e.type}`
            },
            paymentAttemptId: l
        });
        return
    }
    const p = await Mt(t.cartId, t.items, {
        id: e.id,
        type: e.type,
        billing_address: m
    }, l, r);
    if (p.step_up_action === "PhoneNumberVerification") {
        if (!c) {
            Q({
                store: t,
                action: "payment_failed",
                reason: "phone_step_up_retry_failed",
                uiMessage: a.formatMessage({
                    id: "bKp2EC",
                    defaultMessage: "We couldn't verify your phone number. Please try again."
                }),
                internalMessage: "Step up requested more than once for the same checkout attempt",
                paymentAttemptId: l
            });
            return
        }
        try {
            await Gt(t, l)
        } catch (f) {
            if (f instanceof et) {
                Q({
                    store: t,
                    action: "payment_failed",
                    reason: "phone_step_up_cancelled",
                    uiMessage: a.formatMessage({
                        id: "ETPsrm",
                        defaultMessage: "Phone verification is required to complete checkout."
                    }),
                    internalMessage: "User cancelled phone verification flow",
                    paymentAttemptId: l
                });
                return
            }
            throw f
        }
        await st({
            store: t,
            paymentMethod: e,
            intl: a,
            onComplete: n,
            paymentAttemptId: l,
            finalShippingAddress: r,
            startMs: i,
            expressPaymentType: u,
            ctx: g,
            allowStepUpRetry: !1
        });
        return
    }
    if (Xe(t, "flow_bypassed", {}, l), p.cart != null) {
        if (p.cart.errors ? .length) {
            t.setErrors(p.cart.errors), ye(t, {
                action: "payment_failed",
                reason: "openai_complete_shopping_cart_failed",
                error_message: p.cart.errors.map(f => f.message).join(", "),
                attempt_id: l
            });
            return
        }
        if (p.order ? .id && p.order ? .status === "placed") try {
            ye(t, {
                action: "payment_succeeded",
                attempt_id: l
            }), Pe.addAction("shopping_checkout.complete", {
                durationMs: performance.now() - i,
                merchant_id: t.merchant ? .externalId,
                merchant_network_id: t.merchant ? .networkId,
                cart_total: t.grandTotal.value,
                payment_method: at(t, u)
            }), typeof n == "function" && await n(p.order);
            const f = t.shippingOptions.find(h => h.id === t.shippingMethodId) ? ? null,
                d = t.merchant ? .title ? ? t.merchant ? .subtitle ? ? void 0,
                o = be("3109853659");
            t.closeCheckout(), o && we(Rt, {
                items: t.items,
                merchantName: d,
                orderId: p.order ? .id,
                grandTotal: t.grandTotal,
                shippingOption: f,
                currencyCode: t.currencyCode
            })
        } catch (f) {
            Q({
                store: t,
                action: "refresh_convo_failed",
                uiMessage: a.formatMessage({
                    id: "d45UJa",
                    defaultMessage: "Failed to update conversation (1400)"
                }),
                internalMessage: f instanceof Error ? f.message : "Unknown error",
                paymentAttemptId: l
            })
        } else Q({
            store: t,
            action: "payment_failed",
            reason: "openai_complete_shopping_cart_failed",
            uiMessage: a.formatMessage({
                id: "QJ9CZQ",
                defaultMessage: "Failed to create order (1345)"
            }),
            internalMessage: "Missing orderID",
            extraLogData: {
                error_message: `Missing orderID: ${p.order?.id} with status: ${p.order?.status}`
            },
            paymentAttemptId: l
        })
    }
}

function ye(t, e) {
    T.logEventWithStatsig("product_checkout", "product_checkout", { ...D(t.cartMetadata ? ? {}),
        checkout_id: t.cartId,
        ...e
    }), Pe.addAction(`shopping_checkout.${e.action}`, {
        merchant_id: t.merchant ? .externalId,
        merchant_network_id: t.merchant ? .networkId,
        cart_total: t.grandTotal.value,
        reason: e.reason
    })
}

function Q({
    store: t,
    action: e,
    reason: a,
    uiMessage: n,
    internalMessage: l,
    extraLogData: r,
    paymentAttemptId: i
}) {
    const u = n + "";
    t.setErrors([{
        group: "general",
        message: u
    }]), ye(t, {
        action: e,
        ...a ? {
            reason: a
        } : {},
        ...l ? {
            error_message: l
        } : {},
        ...r ? ? {},
        ...(e === "payment_failed" || e === "payment_succeeded") && i ? {
            attempt_id: i
        } : {}
    })
}

function at(t, e) {
    return e ? .toLocaleLowerCase() ? ? t.paymentDetails ? .label ? .toLocaleLowerCase()
}
const nt = ({
        store: t,
        optionOverrides: e,
        onConfirm: a,
        onReady: n,
        onComplete: l,
        surface: r
    }) => {
        const i = Me(),
            u = Ae(),
            c = ve() ? .email,
            m = O(),
            p = Ge(),
            f = Ze(),
            d = y.useRef(void 0),
            o = y.useRef(void 0),
            h = t.items,
            _ = y.useMemo(() => ({ ...{
                    buttonHeight: 40,
                    shippingAddressRequired: !0,
                    billingAddressRequired: !0,
                    allowedShippingCountries: t.allowedCountries,
                    business: {
                        name: t.merchant ? .title ? ? ""
                    },
                    phoneNumberRequired: !0,
                    paymentMethods: {
                        applePay: t ? .paymentTypes[r] ? .includes("apple_pay") ? "always" : "never",
                        googlePay: t ? .paymentTypes[r] ? .includes("google_pay") ? "always" : "never",
                        shopPay: t ? .paymentTypes[r] ? .includes("shop_pay") ? "auto" : "never",
                        link: t ? .paymentTypes[r] ? .includes("link") ? "auto" : "never"
                    },
                    paymentMethodOrder: ["apple_pay", "google_pay", "shop_pay", "link"],
                    shippingRates: Ue(h, t.shippingOptions, m)
                },
                ...e
            }), [t.merchant ? .title, t.allowedCountries, e, r, t.paymentTypes, t.shippingOptions, m, h]);
        return s.jsx(Bt, {
            options: _,
            onConfirm: async x => {
                const v = x.shippingAddress ? .address && x.shippingAddress ? .name ? $e(x.shippingAddress.name, x.shippingAddress.address, x.billingDetails ? .phone) : void 0;
                await tt({
                    store: t,
                    merchant: t.merchant,
                    elements: i,
                    stripe: u,
                    ctx: f,
                    userEmail: c,
                    intl: m,
                    finalShippingAddress: v,
                    expressPaymentType: x.expressPaymentType,
                    paymentAttemptId: d.current,
                    onConfirm: a,
                    onComplete: async k => {
                        await He({
                            store: t,
                            order: k,
                            navigate: p
                        }), await l ? .(k)
                    }
                })
            },
            onReady: () => {
                n ? .()
            },
            onClick: x => {
                const {
                    expressPaymentType: v,
                    resolve: k,
                    reject: M
                } = x;
                if (o.current = t.shippingAddress, d.current = ze(), T.logEventWithStatsig("product_checkout", "product_checkout", { ...D(t.cartMetadata ? ? {}),
                        payment_method: v,
                        checkout_id: t.cartId,
                        action: "express_checkout_button_clicked",
                        attempt_id: d.current
                    }), Qe(t, m)) return k();
                M()
            },
            onShippingAddressChange: async function({
                address: x,
                resolve: v,
                reject: k
            }) {
                try {
                    const M = await he(t.cartId, {
                        items: h,
                        shippingAddress: {
                            name: null,
                            addressLine1: null,
                            addressLine2: null,
                            city: x.city,
                            state: x.state,
                            postalCode: x.postal_code,
                            country: x.country,
                            complete: !0
                        }
                    });
                    t.updateCart(M);
                    const j = Ue(h, M.cart.shipping_options, m);
                    if (j.length === 0) {
                        k();
                        return
                    }
                    i && i.update({
                        amount: M.cart.grand_total.value_minor
                    }), v({
                        shippingRates: j
                    })
                } catch {
                    k()
                }
            },
            onCancel: async () => {
                try {
                    if (ee(t, o.current)) {
                        const x = await he(t.cartId, {
                            items: h,
                            shippingAddress: o.current
                        });
                        t.updateCart(x), i && i.update({
                            amount: x.cart.grand_total.value_minor
                        })
                    }
                } catch {}
            },
            onShippingRateChange: async function({
                shippingRate: x,
                resolve: v,
                reject: k
            }) {
                try {
                    const M = await he(t.cartId, {
                        items: h,
                        shippingMethodId: x.id
                    });
                    t.updateCart(M), i && i.update({
                        amount: M.cart.grand_total.value_minor
                    }), v()
                } catch {
                    k()
                }
            }
        })
    },
    Z = ({
        cartErrors: t,
        section: e
    }) => {
        const a = t ? .filter(n => e ? n.group === e : !0) ? ? [];
        return a.length ? s.jsx("div", {
            className: "flex flex-col gap-1 pt-3",
            children: a.map(n => s.jsx(J, {
                message: n.message,
                level: n.level ? ? "error"
            }, n.message))
        }) : null
    };
let me = 0;

function Ht({
    store: t,
    pushPane: e,
    loadingCartSession: a,
    loadingPayment: n,
    loadingAddress: l,
    cartLoadError: r,
    stripeLoadingError: i,
    merchant: u,
    footerMessage: g,
    isCurrentPane: c
}) {
    const p = ve() ? .email,
        {
            cartStatus: f,
            paymentDetails: d,
            shippingAddress: o,
            shippingMethodId: h,
            shippingOptions: _,
            totals: x,
            grandTotal: v,
            errors: k,
            headerMessage: M
        } = t,
        j = ft(t.items),
        S = y.useMemo(() => _.find(C => C.id === h), [_, h]),
        P = !!d ? .complete,
        b = !!o ? .complete,
        w = (a || n || l) && !r,
        A = !w,
        U = A && !j,
        H = f === "complete",
        te = f === "updating",
        R = A && (P || n || l),
        B = !!(b && _.length > 0 && S),
        F = !!g && !w,
        L = O(),
        q = be("3109853659"),
        V = t.items[0] ? ? t.unavailableItems[0],
        Y = t.items.length === 0,
        W = y.useCallback(() => {
            if (!xt(t.agreements)) return yt(t, L), !1;
            e("paymentMethod")
        }, [e]),
        z = y.useCallback(() => {
            e("shippingAddress")
        }, [e]),
        G = y.useCallback(() => {
            e("shippingMethod")
        }, [e]);
    return s.jsxs("div", {
        className: "relative flex h-full flex-col",
        children: [H && s.jsx("div", {
            className: "bg-token-bg-primary absolute inset-0 z-50 flex items-center justify-center",
            children: s.jsx(Et, {
                className: "h-44 w-44 text-green-400",
                loop: !1
            })
        }), q ? s.jsxs(s.Fragment, {
            children: [s.jsxs("div", {
                className: "min-h-0 flex-1 overflow-y-auto px-6 pb-6",
                children: [i && s.jsx(J, {
                    message: i
                }), r && s.jsx(J, {
                    message: r
                }), M && s.jsx(J, {
                    message: M,
                    level: "info"
                }), A && s.jsxs(s.Fragment, {
                    children: [R && s.jsxs("div", {
                        className: N(t.cartStatus === "submitting" && "pointer-events-none opacity-50"),
                        children: [s.jsxs("div", {
                            className: "border-token-border-light border-t",
                            children: [s.jsx(Te, {
                                onClick: W,
                                isComplete: d ? .complete ? ? !1,
                                label: d ? .label ? ? "",
                                sublabel: d ? .sublabel ? ? "",
                                icon: d ? .icon ? ? void 0,
                                isLoading: n
                            }), s.jsx(Z, {
                                cartErrors: k,
                                section: "payment_method"
                            })]
                        }), s.jsxs("div", {
                            className: "border-token-border-light border-t",
                            children: [s.jsx(De, {
                                name: o ? .name,
                                addressLine1: o ? .addressLine1,
                                addressLine2: o ? .addressLine2,
                                city: o ? .city,
                                state: o ? .state ? ? void 0,
                                isComplete: o ? .complete ? ? !1,
                                isLoading: l,
                                onClick: z
                            }), s.jsx(Z, {
                                cartErrors: k,
                                section: "shipping_address"
                            })]
                        }), j && s.jsx("div", {
                            className: "border-token-border-light border-t",
                            children: s.jsx(Re, {
                                emailAddress: p
                            })
                        }), B && S && s.jsxs(s.Fragment, {
                            children: [s.jsx("div", {
                                className: "border-token-border-light border-t",
                                children: s.jsx(Oe, {
                                    method: S,
                                    onClick: G
                                })
                            }), s.jsx(Z, {
                                cartErrors: k,
                                section: "shipping_option"
                            })]
                        })]
                    }), s.jsxs("div", {
                        className: "mt-4 mb-4 flex flex-col gap-4",
                        children: [t.items.map((C, I) => s.jsx("div", {
                            className: N(I > 0 && "border-token-border-light border-t pt-4"),
                            children: s.jsx(Se, {
                                item: C,
                                store: t,
                                canUpdateQuantity: U,
                                isLoading: a && !r,
                                showPrice: !0,
                                enableMultiItemRemove: q
                            })
                        }, C.id || C.value || I)), t.unavailableItems.length > 0 && s.jsxs("div", {
                            className: "border-token-border-light border-t pt-4",
                            children: [s.jsx("div", {
                                className: "text-token-text-secondary text-xs font-medium",
                                children: L.formatMessage({
                                    id: "RFuj3z",
                                    defaultMessage: "Unavailable"
                                })
                            }), s.jsx("div", {
                                className: "mt-4 flex flex-col gap-4",
                                children: t.unavailableItems.map((C, I) => s.jsx("div", {
                                    className: N(I > 0 && "border-token-border-light border-t pt-4"),
                                    children: s.jsx(Se, {
                                        item: C,
                                        store: t,
                                        canUpdateQuantity: !1,
                                        isLoading: a && !r,
                                        showPrice: !0,
                                        isUnavailable: !0
                                    })
                                }, C.id || C.value || I))
                            })]
                        })]
                    })]
                })]
            }), s.jsxs("div", {
                className: "bg-token-bg-primary shrink-0",
                children: [s.jsx("div", {
                    className: "border-token-border-light border-t px-6 pt-4 pb-6",
                    children: A && s.jsxs(s.Fragment, {
                        children: [s.jsx(Ve, {
                            totals: x,
                            grandTotal: v,
                            isLoading: te
                        }), s.jsx(We, {
                            store: t
                        }), !r && s.jsx(Z, {
                            cartErrors: k,
                            section: R ? "general" : void 0
                        }), !r && !a && s.jsx(qe, {
                            store: t,
                            merchant: u,
                            hasValidPaymentMethod: P,
                            isCurrentPane: c,
                            pushPane: e
                        })]
                    })
                }), F && s.jsx(_e, {
                    className: "bg-token-bg-elevated-secondary text-token-text-tertiary border-token-border-light h-full border-t p-6 text-xs",
                    components: {
                        a: C => s.jsx("a", { ...C,
                            className: N(C.className, "text-blue-400 underline"),
                            target: "_blank",
                            children: C.children
                        })
                    },
                    children: g
                })]
            })]
        }) : s.jsxs(s.Fragment, {
            children: [s.jsxs("div", {
                className: "flex flex-col px-6 pb-6",
                children: [s.jsx("div", {
                    className: "mb-4",
                    children: V && s.jsx(Se, {
                        item: V,
                        store: t,
                        canUpdateQuantity: U,
                        isLoading: a && !r,
                        isUnavailable: Y
                    })
                }), i && s.jsx(J, {
                    message: i
                }), r && s.jsx(J, {
                    message: r
                }), M && s.jsx(J, {
                    message: M,
                    level: "info"
                }), A && s.jsxs(s.Fragment, {
                    children: [R && s.jsxs("div", {
                        className: N(t.cartStatus === "submitting" && "pointer-events-none opacity-50"),
                        children: [s.jsxs("div", {
                            className: "border-token-border-light border-t",
                            children: [s.jsx(Te, {
                                onClick: W,
                                isComplete: d ? .complete ? ? !1,
                                label: d ? .label ? ? "",
                                sublabel: d ? .sublabel ? ? "",
                                icon: d ? .icon ? ? void 0,
                                isLoading: n
                            }), s.jsx(Z, {
                                cartErrors: k,
                                section: "payment_method"
                            })]
                        }), s.jsxs("div", {
                            className: "border-token-border-light border-t",
                            children: [s.jsx(De, {
                                name: o ? .name,
                                addressLine1: o ? .addressLine1,
                                addressLine2: o ? .addressLine2,
                                city: o ? .city,
                                state: o ? .state ? ? void 0,
                                isComplete: o ? .complete ? ? !1,
                                isLoading: l,
                                onClick: z
                            }), s.jsx(Z, {
                                cartErrors: k,
                                section: "shipping_address"
                            })]
                        }), j && s.jsx("div", {
                            className: "border-token-border-light border-t",
                            children: s.jsx(Re, {
                                emailAddress: p
                            })
                        }), B && S && s.jsxs(s.Fragment, {
                            children: [s.jsx("div", {
                                className: "border-token-border-light border-t",
                                children: s.jsx(Oe, {
                                    method: S,
                                    onClick: G
                                })
                            }), s.jsx(Z, {
                                cartErrors: k,
                                section: "shipping_option"
                            })]
                        })]
                    }), s.jsx(Ve, {
                        totals: x,
                        grandTotal: v,
                        isLoading: te
                    }), s.jsx(We, {
                        store: t
                    }), !r && s.jsx(Z, {
                        cartErrors: k,
                        section: R ? "general" : void 0
                    }), !r && !a && s.jsx(qe, {
                        store: t,
                        merchant: u,
                        hasValidPaymentMethod: P,
                        isCurrentPane: c,
                        pushPane: e
                    })]
                })]
            }), F && s.jsx(_e, {
                className: "bg-token-bg-elevated-secondary text-token-text-tertiary border-token-border-light h-full border-t p-6 text-xs",
                components: {
                    a: C => s.jsx("a", { ...C,
                        className: N(C.className, "text-blue-400 underline"),
                        target: "_blank",
                        children: C.children
                    })
                },
                children: g
            })]
        })]
    })
}
const qe = t => {
        "use forget";
        const e = Ee.c(25),
            {
                store: a,
                merchant: n,
                hasValidPaymentMethod: l,
                isCurrentPane: r,
                pushPane: i
            } = t,
            u = O(),
            g = Ae(),
            c = Me(),
            m = Ge(),
            p = ve() ? .email,
            f = Ze(),
            [d, o] = y.useState(!1);
        let h;
        e[0] !== a ? (h = Lt(a), e[0] = a, e[1] = h) : h = e[1];
        const _ = !h,
            x = a.cartStatus === "submitting",
            v = a.cartStatus === "updating",
            k = n ? .title ? ? "";
        let M;
        e[2] !== r || e[3] !== a ? (M = r && s.jsx(nt, {
            store: a,
            surface: "payment_sheet",
            onReady: () => o(!0)
        }), e[2] = r, e[3] = a, e[4] = M) : M = e[4];
        let j;
        e[5] !== f || e[6] !== c || e[7] !== u || e[8] !== n || e[9] !== m || e[10] !== a || e[11] !== g || e[12] !== p ? (j = async () => {
            Qe(a, u) && await tt({
                store: a,
                merchant: n,
                elements: c,
                stripe: g,
                ctx: f,
                userEmail: p,
                intl: u,
                onComplete: async P => await He({
                    store: a,
                    order: P,
                    navigate: m
                })
            })
        }, e[5] = f, e[6] = c, e[7] = u, e[8] = n, e[9] = m, e[10] = a, e[11] = g, e[12] = p, e[13] = j) : j = e[13];
        let S;
        return e[14] !== d || e[15] !== l || e[16] !== i || e[17] !== a.paymentSheetButtonCta || e[18] !== _ || e[19] !== x || e[20] !== v || e[21] !== k || e[22] !== M || e[23] !== j ? (S = s.jsx(lt, {
            isDisabled: _,
            isSubmitting: x,
            isUpdating: v,
            merchantTitle: k,
            hasValidPaymentMethod: l,
            expressCheckoutElement: M,
            expressCheckoutElementReady: d,
            paymentSheetButtonCta: a.paymentSheetButtonCta,
            onClickPay: j,
            pushPane: i
        }), e[14] = d, e[15] = l, e[16] = i, e[17] = a.paymentSheetButtonCta, e[18] = _, e[19] = x, e[20] = v, e[21] = k, e[22] = M, e[23] = j, e[24] = S) : S = e[24], S
    },
    Yt = t => {
        const e = t.trim(),
            a = /[^\d.,\s]/.test(e),
            n = e.replace(/[^\d.,]/g, "");
        if (!n) return {
            amount: NaN,
            fractionDigits: 0,
            hasCurrencySymbol: a
        };
        const l = n.lastIndexOf("."),
            r = n.lastIndexOf(","),
            i = l === -1 && r === -1 ? null : l > r ? "." : ",";
        let u = "",
            g = 0;
        if (i) {
            const c = n.lastIndexOf(i),
                m = n.slice(0, c),
                p = n.slice(c + 1),
                f = m.replace(/[.,]/g, ""),
                d = p.replace(/[.,]/g, "");
            g = d.length, (i === "." && r === -1 || i === "," && l === -1) && g === 3 ? (u = n.replace(/[.,]/g, ""), g = 0) : u = d.length ? `${f}.${d}` : f
        } else u = n.replace(/[.,]/g, "");
        return {
            amount: Number.parseFloat(u),
            fractionDigits: g,
            hasCurrencySymbol: a
        }
    },
    Zt = (t, e) => {
        if (!t) return;
        const a = t.trim(),
            n = Yt(a);
        if (n.hasCurrencySymbol || !Number.isFinite(n.amount)) return a;
        const l = e ? ? "USD";
        try {
            return new Intl.NumberFormat(void 0, {
                style: "currency",
                currency: l,
                minimumFractionDigits: n.fractionDigits,
                maximumFractionDigits: Math.min(n.fractionDigits, 4)
            }).format(n.amount)
        } catch {
            return a
        }
    },
    Se = ({
        item: t,
        store: e,
        canUpdateQuantity: a,
        isLoading: n,
        showPrice: l = !1,
        enableMultiItemRemove: r = !1,
        isUnavailable: i = !1
    }) => {
        const u = O(),
            g = Zt(t.price, e.currencyCode),
            c = i ? "opacity-50" : void 0;
        return s.jsxs("div", {
            className: "flex gap-4",
            children: [s.jsx("div", {
                className: N("bg-token-bg-tertiary dark:bg-token-main-surface-primary-inverse overflow-clip rounded-lg", c),
                children: n ? s.jsx("div", {
                    className: "relative m-0 aspect-square h-32 w-32",
                    children: s.jsx("div", {
                        className: "absolute inset-0 z-3 w-full overflow-hidden",
                        children: s.jsx("div", {
                            className: "absolute start-[-150%] top-[-150%] h-[400%] w-[400%]",
                            children: s.jsx("div", {
                                className: "diagonal-sweep-gradient h-full w-full"
                            })
                        })
                    })
                }) : s.jsx("img", {
                    className: "m-0 aspect-square h-32 w-32 object-cover mix-blend-darken",
                    src: t.imageUrl,
                    alt: t.title
                })
            }), s.jsxs("div", {
                className: "flex flex-1 flex-col",
                children: [s.jsx("div", {
                    className: N("text-normal line-clamp-2 min-h-6 leading-snug font-medium", c),
                    title: t.title,
                    children: n ? s.jsx(je, {
                        index: 1,
                        width: 80,
                        heightSize: "sm"
                    }) : t.title
                }), s.jsx("div", {
                    className: N("text-token-text-secondary h-[18px] text-[13px]", c),
                    children: n ? s.jsx(je, {
                        index: 2,
                        width: 60,
                        heightSize: "sm"
                    }) : t.variant
                }), i && !n && s.jsx("div", {
                    className: "text-token-text-error mt-1 text-[13px]",
                    children: u.formatMessage({
                        id: "ZNK9C1",
                        defaultMessage: "Out of stock"
                    })
                }), l && (n || g) && s.jsx("div", {
                    className: N("text-token-text-secondary h-[18px] text-[13px]", c),
                    children: n ? s.jsx(je, {
                        index: 3,
                        width: 40,
                        heightSize: "sm"
                    }) : g
                }), s.jsxs("div", {
                    className: "mt-2 flex flex-1 items-end",
                    children: [a && !n && !i && s.jsx(Kt, {
                        quantity: t.quantity,
                        store: e,
                        itemId: t.id,
                        itemValue: t.value,
                        enableMultiItemRemove: r,
                        isDisabled: e.cartStatus === "submitting" || e.cartStatus === "updating"
                    }), i && !n && s.jsx("button", {
                        type: "button",
                        className: "text-token-text-secondary hover:text-token-text-primary flex items-center gap-1 text-sm",
                        onClick: () => e.dismissUnavailableItem(t.value),
                        "aria-label": u.formatMessage({
                            id: "qd6JVt",
                            defaultMessage: "Remove unavailable item"
                        }),
                        children: s.jsx(Je, {
                            className: "icon"
                        })
                    })]
                })]
            })]
        })
    },
    Jt = 600,
    Kt = ({
        quantity: t,
        store: e,
        itemId: a,
        itemValue: n,
        enableMultiItemRemove: l,
        isDisabled: r
    }) => {
        const i = O(),
            u = y.useRef(e);
        y.useEffect(() => {
            u.current = e
        }, [e]);
        const g = y.useCallback(async () => {
                const p = u.current;
                if (!p) return;
                const f = p.items.map(o => o.id === a && o.value === n ? { ...o,
                        quantity: 0
                    } : o),
                    d = ++me;
                p.setCartStatus("updating"), p.setErrors([]);
                try {
                    const o = await he(p.cartId, {
                        items: f,
                        shippingMethodId: p.shippingMethodId,
                        shippingAddress: p.shippingAddress
                    });
                    if (d !== me) return;
                    if (!((o.cart.line_items ? .length ? ? 0) > 0 || (o.cart.unavailable_items ? .length ? ? 0) > 0)) {
                        fe(p, "deleted_item");
                        return
                    }
                    p.updateCart(o)
                } catch (o) {
                    d === me && (p.setErrors([{
                        group: "general",
                        message: i.formatMessage(E.cartUpdateQuantityErrorMessage)
                    }]), T.logEventWithStatsig("product_checkout", "product_checkout", { ...D(p.cartMetadata ? ? {}),
                        action: "cart_update_failed",
                        reason: "error_response_from_endpoint",
                        error_message: o
                    }), p.setCartStatus("idle"))
                }
            }, [i, a, n]),
            c = y.useCallback(Ct(async (p, f) => {
                const d = u.current;
                if (!d) return;
                const o = ++me;
                d.setCartStatus("updating"), d.setErrors([]);
                try {
                    const h = await he(p, {
                        items: f,
                        shippingMethodId: d.shippingMethodId,
                        shippingAddress: d.shippingAddress
                    });
                    if (o === me) {
                        d.updateCart(h);
                        const _ = f.find(v => v.id === a),
                            x = h.cart.line_items ? .find(v => v.item.id === a || _ && v.item.value === _.value) ? .item.quantity ? ? _ ? .quantity ? ? f[0] ? .quantity ? ? 0;
                        T.logEventWithStatsig("product_checkout", "product_checkout", { ...D(d.cartMetadata ? ? {}),
                            checkout_id: d.cartId,
                            product_id: a,
                            action: "quantity_changed",
                            new_quantity: x.toString()
                        })
                    }
                } catch (h) {
                    o === me && (d.setErrors([{
                        group: "general",
                        message: i.formatMessage(E.cartUpdateQuantityErrorMessage)
                    }]), T.logEventWithStatsig("product_checkout", "product_checkout", { ...D(d.cartMetadata ? ? {}),
                        action: "cart_update_failed",
                        reason: "error_response_from_endpoint",
                        error_message: h
                    }), d.setCartStatus("idle"))
                }
            }, Jt), []),
            m = "bg-token-bg-tertiary hover:bg-token-bg-secondary text-token-text-primary flex items-center justify-center px-2 py-2 text-xl font-bold";
        return s.jsxs("div", {
            className: N("inline-flex items-center select-none", r && "pointer-events-none opacity-50"),
            children: [s.jsx("button", {
                className: N(m, "rounded-s-xl"),
                onClick: () => {
                    if (t === 1) {
                        confirm(i.formatMessage({
                            id: "XvhtH9",
                            defaultMessage: "Are you sure you want to remove this item?"
                        })) && (l && e.items.length > 1 ? g() : fe(e, "deleted_item"));
                        return
                    }
                    const p = e.updateQuantity(a, Math.max(t - 1, 1));
                    c(e.cartId, p)
                },
                children: t === 1 ? s.jsx(Je, {
                    className: "icon"
                }) : s.jsx(Pt, {
                    className: "icon"
                })
            }), s.jsx("span", {
                className: "bg-token-bg-tertiary text-token-text-primary flex h-9 w-6 items-center justify-center text-sm font-semibold",
                children: t
            }), s.jsx("button", {
                className: N(m, "rounded-e-xl"),
                onClick: () => {
                    const p = e.updateQuantity(a, t + 1);
                    c(e.cartId, p)
                },
                children: s.jsx(At, {
                    className: "icon"
                })
            })]
        })
    },
    Ve = ({
        totals: t,
        grandTotal: e,
        isLoading: a
    }) => e ? .value ? s.jsxs("div", {
        className: "flex flex-col gap-3 pt-3",
        children: [s.jsx("div", {
            children: t ? .map(n => s.jsxs("div", {
                className: "text-token-text-secondary flex items-end justify-between text-[13px]",
                children: [s.jsx("span", {
                    className: "font-medium",
                    children: n.title
                }), s.jsx(_e, {
                    className: N("transition-opacity duration-200", a && "opacity-50"),
                    remarkPlugins: [
                        [Nt, {
                            singleTilde: !1
                        }]
                    ],
                    children: n.formatted_value
                })]
            }, n.title))
        }), s.jsxs("div", {
            className: "flex items-end justify-between",
            children: [s.jsxs("div", {
                className: "flex flex-col text-[13px]",
                children: [s.jsx("span", {
                    className: "font-medium",
                    children: e.title
                }), s.jsx("span", {
                    className: "text-token-text-secondary",
                    children: e.subtitle
                })]
            }), s.jsx("div", {
                className: "text-xl font-medium",
                children: e.value_minor > 0 ? s.jsx(rt, {
                    text: e.formatted_value,
                    className: N("transition-opacity duration-200", a && "opacity-50")
                }) : "-"
            })]
        })]
    }) : null,
    We = t => {
        "use forget";
        const e = Ee.c(2),
            {
                store: a
            } = t;
        let n;
        return e[0] !== a ? (n = a.agreements && a.agreements.length > 0 && s.jsx("div", {
            className: "flex flex-col gap-2 pt-3",
            children: a.agreements.map(l => s.jsx(Xt, {
                store: a,
                agreement: l
            }, l.id))
        }), e[0] = a, e[1] = n) : n = e[1], n
    },
    Xt = ({
        agreement: t,
        store: e
    }) => {
        "use no forget";
        return y.useEffect(() => {
            T.logEventWithStatsig("product_checkout", "product_checkout", { ...D(e.cartMetadata ? ? {}),
                checkout_id: e.cartId,
                action: "agreement_shown",
                agreement_id: t.id
            })
        }, []), s.jsx(It, {
            id: t.id,
            checked: t.is_checked,
            onChange: a => {
                const n = a.currentTarget.checked;
                e.setHasAcceptedAgreement(t.id, n), T.logEventWithStatsig("product_checkout", "product_checkout", { ...D(e.cartMetadata ? ? {}),
                    checkout_id: e.cartId,
                    action: "agreement_clicked",
                    agreement_id: t.id,
                    checked: n
                })
            },
            labelClassName: "ps-3 text-[13px] font-medium select-none text-token",
            label: s.jsx(_e, {
                components: {
                    a: a => s.jsx("a", { ...a,
                        className: N(a.className, "text-blue-400 underline"),
                        target: "_blank",
                        children: a.children
                    })
                },
                children: t.content + (t.is_required ? " *" : "")
            })
        }, t.id)
    },
    _e = y.memo(Vt),
    es = 10 * 1e3,
    ts = ({
        store: t,
        pushPane: e,
        resetPanes: a,
        setLoadingPayment: n,
        loadingAddress: l,
        setStripeLoadingError: r,
        isCurrentPane: i
    }) => {
        const u = O(),
            c = ve() ? .email,
            m = Me(),
            p = Ae(),
            [f, d] = y.useState(null),
            [o, h] = y.useState(!1),
            [_, x] = y.useState(t.paymentDetails ? .complete ? t.paymentDetails : null),
            [v, k] = y.useState(void 0),
            M = y.useRef(!0),
            j = y.useRef(!0),
            S = () => {
                M.current = !1, r(u.formatMessage(E.stripeLoadingPaymentMethodError)), n(!1)
            };
        y.useEffect(() => {
            const b = setTimeout(() => {
                M.current && S()
            }, es);
            return () => clearTimeout(b)
        }, []);
        const P = async b => {
            if (d(null), M.current) {
                if (M.current = !1, t.paymentDetails ? .complete && t.billingAddress ? .complete && t.cachedPaymentDetailsResponse) {
                    ke(t, t.paymentDetails ? .label, "prefill"), n(!1);
                    return
                }
                if (b.complete && b.value.payment_method ? .id) {
                    t.setPaymentDetails({ ...Ce(b),
                        complete: !0
                    }), t.setCachedPaymentDetailsResponse({
                        id: b.value.payment_method.id,
                        type: b.value.payment_method.type,
                        billing_details: {
                            address: b.value.payment_method.billing_details.address,
                            name: b.value.payment_method.billing_details.name ? ? ""
                        }
                    });
                    const w = { ...xe(b.value.payment_method.billing_details.address, b.value.payment_method.billing_details.name, b.value.payment_method.billing_details.phone),
                        complete: !0
                    };
                    t.setBillingAddress(w), x({ ...Ce(b),
                        complete: b.complete
                    }), !l && t.isShippingAddressSameAsBilling && w.addressLine1 && !ee(t, t.shippingAddress) && await K({
                        store: t,
                        fields: {
                            items: t.items,
                            shippingAddress: w
                        },
                        errorMessage: u.formatMessage(E.cartUpdateShippingAddressErrorMessage),
                        source: "prefill"
                    }), ke(t, b.preview ? .label, "prefill")
                }
                n(!1);
                return
            }
            b.complete && x({ ...Ce(b),
                complete: !0
            })
        };
        return s.jsxs("div", {
            className: "flex w-full flex-col gap-4 px-6 pb-6",
            children: [i && t.paymentDetails ? .complete && s.jsx("div", {
                className: "min-h-10",
                children: s.jsx(nt, {
                    store: t,
                    surface: "payment_sheet",
                    optionOverrides: {
                        layout: {
                            maxRows: 1,
                            overflow: "auto"
                        }
                    },
                    onConfirm: () => {
                        t.setPaymentDetails(void 0), t.setShippingAddress(void 0), a()
                    }
                })
            }), !t.paymentTypes.payment_sheet.includes("card") && !t.paymentDetails ? .complete && s.jsx("div", {
                className: "text-token-text-tertiary py-10 text-center text-sm",
                children: s.jsx(Ie, {
                    id: "7t8tjX",
                    defaultMessage: "No other payment methods available"
                })
            }), s.jsxs("div", {
                className: t.paymentTypes.payment_sheet.includes("card") ? "" : "hidden",
                children: [s.jsx(Ft, {
                    id: "payment-element",
                    options: {
                        fields: {
                            billingDetails: {
                                email: "never",
                                phone: "never"
                            }
                        },
                        wallets: {
                            applePay: "never",
                            googlePay: "never"
                        },
                        defaultValues: {
                            billingDetails: {
                                email: c
                            }
                        },
                        business: {
                            name: "OpenAI"
                        },
                        layout: {
                            type: "accordion",
                            defaultCollapsed: !1
                        }
                    },
                    onLoadError: () => {
                        M.current && S()
                    },
                    onChange: P,
                    onSavedPaymentMethodRemove: b => {
                        t.paymentDetails ? .paymentMethodId === b.payment_method ? .id && (t.setPaymentDetails(void 0), x(null)), _t(t, b.payment_method ? .type ? ? "")
                    }
                }), f && s.jsx("div", {
                    className: "mt-2",
                    children: s.jsx(J, {
                        message: f
                    })
                }), s.jsx("div", {
                    className: "mt-6 mb-2 text-sm font-medium",
                    children: s.jsx(Ie, {
                        id: "8pb7do",
                        defaultMessage: "Billing address"
                    })
                }), s.jsx(Ke, {
                    options: {
                        mode: "billing",
                        allowedCountries: t.allowedCountries,
                        fields: {
                            phone: "always"
                        },
                        validation: {
                            phone: {
                                required: "always"
                            }
                        }
                    },
                    onChange: b => {
                        if (d(null), j.current) {
                            j.current = !1;
                            return
                        }
                        k({ ...xe(b.value.address, b.value.name, b.value.phone),
                            complete: !0
                        })
                    }
                })]
            }), s.jsx(Ne, {
                isSaving: o,
                isDisabled: o,
                onClick: async () => {
                    if (d(null), !m) {
                        d(u.formatMessage(E.cartUpdateGeneralErrorRetryMessage));
                        return
                    }
                    try {
                        if (!_) {
                            d(u.formatMessage(E.cartUpdateGeneralErrorMessage));
                            return
                        }
                        if (!v ? .name) {
                            d(u.formatMessage(E.stripeLoadingBillingAddressError));
                            return
                        }
                        h(!0);
                        const {
                            error: b,
                            paymentMethod: w
                        } = await p.preparePaymentMethod({
                            elements: m,
                            params: {
                                allow_redisplay: "always",
                                billing_details: {
                                    name: v.name,
                                    email: c
                                }
                            }
                        });
                        if (h(!1), b) {
                            const {
                                code: A,
                                decline_code: U
                            } = b || {}, H = A && U ? await p.localizeError({
                                code: A,
                                decline_code: U
                            }) : b.message;
                            d(H);
                            return
                        }
                        ke(t, _ ? .label, "user"), t.setPaymentDetails({ ..._,
                            complete: !0,
                            paymentMethodId: w ? .id,
                            paymentMethodType: w ? .type,
                            label: _ ? .label,
                            sublabel: _ ? .sublabel
                        }), t.setBillingAddress(v), t.setCachedPaymentDetailsResponse(w)
                    } catch {
                        d(u.formatMessage(E.cartUpdateGeneralErrorMessage)), h(!1);
                        return
                    }
                    t.isShippingAddressSameAsBilling && K({
                        store: t,
                        fields: {
                            items: t.items,
                            shippingAddress: v
                        },
                        errorMessage: u.formatMessage(E.cartUpdateShippingAddressErrorMessage),
                        source: "prefill"
                    }), t.shippingAddress ? .addressLine1 ? a() : e("shippingAddress")
                }
            })]
        })
    },
    ss = 10 * 1e3;

function as({
    store: t,
    resetPanes: e,
    setLoadingAddress: a,
    loadingPayment: n,
    setStripeLoadingError: l,
    isCurrentPane: r
}) {
    const i = O(),
        u = be("3109853659"),
        g = y.useRef(!0),
        c = y.useRef(!1),
        m = y.useRef(null),
        p = Me(),
        f = y.useRef(!1);
    y.useEffect(() => {
        if (!u) {
            if (c.current) return;
            c.current = !0, ee(t, t.shippingAddress) && K({
                store: t,
                fields: {
                    items: t.items,
                    shippingAddress: t.shippingAddress
                },
                errorMessage: i.formatMessage(E.cartUpdateShippingAddressErrorMessage),
                source: "prefill",
                skipLogging: !0
            });
            return
        }!t.cartId || t.cartId === m.current || ee(t, t.shippingAddress) && (m.current = t.cartId, K({
            store: t,
            fields: {
                items: t.items,
                shippingAddress: t.shippingAddress
            },
            errorMessage: i.formatMessage(E.cartUpdateShippingAddressErrorMessage),
            source: "prefill",
            skipLogging: !0
        }))
    }, [u, t.cartId]), y.useEffect(() => {
        const h = setTimeout(() => {
            g.current && (g.current = !1, l(i.formatMessage(E.stripeLoadingShippingAddressError)), a(!1))
        }, ss);
        return () => clearTimeout(h)
    }, []);
    const d = async h => {
            if (g.current) {
                if (g.current = !1, ee(t, t.shippingAddress)) {
                    a(!1);
                    return
                }
                h.complete && h.value.address ? .line1 ? await K({
                    store: t,
                    fields: {
                        items: t.items,
                        shippingAddress: { ...xe(h.value.address, h.value.name, h.value.phone),
                            complete: h.complete
                        }
                    },
                    errorMessage: i.formatMessage(E.cartUpdateShippingAddressErrorMessage),
                    onLocalMutationComplete: () => {
                        a(!1)
                    },
                    source: "prefill"
                }) : !n && ee(t, t.billingAddress) && (t.setIsShippingAddressSameAsBilling(!0), await K({
                    store: t,
                    fields: {
                        items: t.items,
                        shippingAddress: t.billingAddress
                    },
                    errorMessage: i.formatMessage(E.cartUpdateShippingAddressErrorMessage),
                    onLocalMutationComplete: () => {
                        a(!1)
                    },
                    source: "prefill"
                })), a(!1);
                return
            }
            r && (f.current = !0), t.setIsShippingAddressSameAsBilling(h.syncAddress)
        },
        o = t.additionalFields ? .includes("shipping_address_phone_number");
    return s.jsxs("div", {
        className: "flex h-full flex-col gap-4 px-6 pb-6",
        children: [s.jsx(Ke, {
            id: "address-element",
            options: {
                mode: "shipping",
                allowedCountries: t.allowedCountries,
                defaultValues: t.shippingAddress ? .complete ? bt(t.shippingAddress, o) : void 0,
                fields: {
                    phone: o ? "always" : "never"
                },
                validation: { ...o && {
                        phone: {
                            required: "always"
                        }
                    }
                }
            },
            onChange: d,
            onLoadError: () => {
                g.current && (g.current = !1, l(i.formatMessage(E.stripeLoadingShippingAddressError)), a(!1))
            }
        }), s.jsx(Ne, {
            onClick: async () => {
                const h = await p ? .getElement("address", {
                    mode: "shipping"
                }) ? .getValue();
                if (h ? .complete) {
                    if (f.current) {
                        const _ = { ...xe(h.value.address, h.value.name, h.value.phone),
                            complete: h.complete
                        };
                        K({
                            store: t,
                            fields: {
                                items: t.items,
                                shippingAddress: _
                            },
                            errorMessage: i.formatMessage(E.cartUpdateShippingAddressErrorMessage),
                            source: "user"
                        })
                    }
                    e()
                }
            }
        })]
    })
}

function ns({
    shippingMethods: t,
    resetPanes: e,
    store: a
}) {
    const n = O(),
        [l, r] = y.useState(a.shippingMethodId);
    return s.jsxs("div", {
        className: "flex h-full flex-col gap-4 px-6 pb-6",
        children: [s.jsx("div", {
            className: "divide-token-border-light -mt-4 flex flex-col gap-2 divide-y",
            children: t.map(i => s.jsxs("button", {
                type: "button",
                onClick: () => {
                    r(i.id)
                },
                className: "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-start",
                children: [l === i.id ? s.jsx(jt, {
                    className: "text-token-text-primary h-6 w-6"
                }) : s.jsx(St, {
                    className: "text-token-text-primary h-6 w-6"
                }), s.jsxs("div", {
                    className: "flex flex-1 flex-col items-start",
                    children: [s.jsx("span", {
                        className: "text-token-text-primary flex items-center gap-2 text-base",
                        children: i.title
                    }), s.jsx("span", {
                        className: "text-token-text-secondary text-sm leading-tight font-normal",
                        children: i.subtitle
                    })]
                })]
            }, i.id))
        }), s.jsx(Ne, {
            onClick: () => {
                l && (K({
                    store: a,
                    fields: {
                        shippingMethodId: l,
                        items: a.items
                    },
                    errorMessage: n.formatMessage(E.cartUpdateShippingAddressErrorMessage),
                    source: "user"
                }), e())
            }
        })]
    })
}

function Ps() {
    const t = qt(),
        e = t.items.length > 0 || t.unavailableItems.length > 0,
        a = ot("overview"),
        n = O(),
        {
            currentPane: l,
            pushPane: r,
            popPane: i,
            resetPanes: u
        } = a,
        g = be("3375735072");
    y.useEffect(() => {
        t.isCheckoutOpen || u()
    }, [t.isCheckoutOpen, u]);
    const c = y.useMemo(() => [...t.paymentTypes ? .express_checkout ? ? [], ...t.paymentTypes ? .payment_sheet ? ? []], [t.paymentTypes]),
        m = t.cartMetadata ? .clientThreadId;
    return !g || !t.isCheckoutOpen || !e || !m ? null : s.jsx(Ye, {
        testId: "modal-shopping-checkout",
        isOpen: !0,
        hideSeparator: !0,
        showCloseButton: t.cartStatus !== "submitting",
        size: "large",
        type: "success",
        className: "min-h-36 max-w-[640px]!",
        headerClassName: "sm:p-0 sm:px-6 sm:py-4 items-center sm:-me-1",
        contentClassName: "!p-0 pt-3",
        rootClassName: "z-40",
        shouldIgnoreClickOutside: !0,
        onEscapeKeyDown: p => {
            p.preventDefault(), fe(t, "closed")
        },
        onClose: () => {
            fe(t, "closed")
        },
        title: s.jsx(dt, {
            currentPane: l,
            popPane: i,
            url: t.merchant ? .url,
            faviconUrl: t.merchant ? .logoUrl,
            title: t.merchant ? .title ? ? "",
            subtitle: t.merchant ? .subtitle ? ? "",
            subtitlePrefix: t.merchant ? .subtitlePrefix,
            subtitleUrl: t.merchant ? .subtitleUrl,
            PANES: rs
        }),
        children: s.jsx(ct, {
            grandTotal: t.grandTotal.value_minor > 0 ? t.grandTotal.value_minor : t.totals ? .find(p => p.type === "subtotal") ? .value_minor ? ? 0,
            merchantExternalId: t.merchant ? .externalId ? ? "",
            merchantNetworkId: t.merchant ? .networkId ? ? "",
            merchantTitle: t.merchant ? .title ? ? "",
            paymentMethodTypes: c,
            clientThreadId: m,
            allowMissingServerThreadId: !!t.cart,
            fetchSession: () => Wt({
                intl: n,
                store: t,
                clientThreadId: m
            }),
            children: ({
                loadingCartSession: p,
                cartLoadError: f
            }) => s.jsx(is, {
                paneStack: a,
                pushPane: r,
                store: t,
                loadingCartSession: p,
                cartLoadError: f,
                resetPanes: u
            })
        })
    })
}

function is({
    paneStack: t,
    pushPane: e,
    store: a,
    loadingCartSession: n,
    cartLoadError: l,
    resetPanes: r
}) {
    const [i, u] = y.useState(!ee(a, a.shippingAddress)), [g, c] = y.useState(!a.paymentDetails ? .complete), [m, p] = y.useState(null), f = Tt({
        namespace: "shopping_checkout"
    }), d = (n || g || i) && !l;
    return y.useEffect(() => {
        if (a.isCheckoutOpen && !d && a.cartMetadata && a.cartId) {
            const o = a.items[0] ? ? a.unavailableItems[0];
            if (!o) return;
            T.logEventWithStatsig("product_checkout", "product_checkout", { ...D(a.cartMetadata),
                checkout_id: a.cartId,
                merchant_name: a.merchant ? .title,
                merchant_url: a.merchant ? .url,
                hadSavedPaymentMethod: !!a.paymentDetails ? .complete,
                items: [{
                    quantity: o.quantity.toString(),
                    price: "price" in o ? o.price : void 0,
                    variants: "variant" in o ? o.variant : void 0,
                    product_id: o.id,
                    product_title: "title" in o ? o.title : void 0
                }],
                action: "shown"
            }), f.endBlock("shown", {
                context: {
                    merchant_id: a.merchant ? .externalId,
                    merchant_network_id: a.merchant ? .networkId,
                    cart_total: a.grandTotal.value,
                    product_id: "productId" in o ? o.productId : void 0
                }
            })
        }
    }, [a.cartMetadata ? .clientThreadId, a.isCheckoutOpen, a.cartId, d]), s.jsx("div", {
        className: "relative w-full",
        children: s.jsx(pt, {
            className: "min-h-[755px] w-full",
            paneStack: t,
            useDelayedEnteringPane: !0,
            alwaysMountedPanes: ["paymentMethod", "overview", "shippingAddress"],
            renderPane: o => {
                switch (o) {
                    case "overview":
                        return s.jsx(Ht, {
                            store: a,
                            pushPane: h => {
                                a.setErrors([]), p(null), e(h)
                            },
                            loadingCartSession: n,
                            loadingPayment: g,
                            loadingAddress: i,
                            cartLoadError: l,
                            stripeLoadingError: m,
                            merchant: a.merchant,
                            footerMessage: a.footerMessage,
                            isCurrentPane: t.currentPane === "overview"
                        });
                    case "paymentMethod":
                        return !n && !l && s.jsx(ts, {
                            store: a,
                            pushPane: e,
                            resetPanes: r,
                            loadingPayment: g,
                            setLoadingPayment: c,
                            loadingAddress: i,
                            setStripeLoadingError: p,
                            isCurrentPane: t.currentPane === "paymentMethod"
                        });
                    case "shippingAddress":
                        return !n && !l && s.jsx(as, {
                            store: a,
                            resetPanes: r,
                            setLoadingAddress: u,
                            loadingPayment: g,
                            setStripeLoadingError: p,
                            isCurrentPane: t.currentPane === "shippingAddress"
                        });
                    case "shippingMethod":
                        return s.jsx(ns, {
                            shippingMethods: a.shippingOptions,
                            store: a,
                            resetPanes: r
                        })
                }
            }
        })
    })
}
const rs = {
    overview: {
        name: {
            id: "shopping-checkout.pane.overview.title",
            defaultMessage: "Overview",
            description: "Title for shopping checkout overview pane"
        }
    },
    shippingAddress: {
        name: {
            id: "shopping-checkout.pane.shippingAddress.title",
            defaultMessage: "Add Shipping Address",
            description: "Title for shopping checkout shipping address pane"
        }
    },
    shippingMethod: {
        name: {
            id: "shopping-checkout.pane.shippingMethod.title",
            defaultMessage: "Select Shipping Method",
            description: "Title for shopping checkout shipping method pane"
        }
    },
    paymentMethod: {
        name: {
            id: "shopping-checkout.pane.paymentMethod.title",
            defaultMessage: "Add payment method",
            description: "Title for shopping checkout payment method pane"
        }
    }
};
export {
    Ps as CheckoutModal
};
//# sourceMappingURL=a9c4a648-l2sjt80qz3kgccoj.js.map