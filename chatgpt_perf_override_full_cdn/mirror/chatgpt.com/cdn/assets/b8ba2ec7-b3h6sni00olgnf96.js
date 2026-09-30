import {
    f as s
} from "./2340486e-dvd8m80i7d6hyild.js";

function ae(r, e) {
    var t = Object.keys(r);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(r);
        e && (n = n.filter(function(a) {
            return Object.getOwnPropertyDescriptor(r, a).enumerable
        })), t.push.apply(t, n)
    }
    return t
}

function ie(r) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e] != null ? arguments[e] : {};
        e % 2 ? ae(Object(t), !0).forEach(function(n) {
            de(r, n, t[n])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(t)) : ae(Object(t)).forEach(function(n) {
            Object.defineProperty(r, n, Object.getOwnPropertyDescriptor(t, n))
        })
    }
    return r
}

function B(r) {
    "@babel/helpers - typeof";
    return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? B = function(e) {
        return typeof e
    } : B = function(e) {
        return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }, B(r)
}

function de(r, e, t) {
    return e in r ? Object.defineProperty(r, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : r[e] = t, r
}

function Pe(r, e) {
    if (r == null) return {};
    var t = {},
        n = Object.keys(r),
        a, o;
    for (o = 0; o < n.length; o++) a = n[o], !(e.indexOf(a) >= 0) && (t[a] = r[a]);
    return t
}

function ve(r, e) {
    if (r == null) return {};
    var t = Pe(r, e),
        n, a;
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(r);
        for (a = 0; a < o.length; a++) n = o[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(r, n) && (t[n] = r[n])
    }
    return t
}

function Y(r, e) {
    return Oe(r) || we(r, e) || je(r, e) || Re()
}

function Oe(r) {
    if (Array.isArray(r)) return r
}

function we(r, e) {
    var t = r && (typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"]);
    if (t != null) {
        var n = [],
            a = !0,
            o = !1,
            c, f;
        try {
            for (t = t.call(r); !(a = (c = t.next()).done) && (n.push(c.value), !(e && n.length === e)); a = !0);
        } catch (i) {
            o = !0, f = i
        } finally {
            try {
                !a && t.return != null && t.return()
            } finally {
                if (o) throw f
            }
        }
        return n
    }
}

function je(r, e) {
    if (r) {
        if (typeof r == "string") return se(r, e);
        var t = Object.prototype.toString.call(r).slice(8, -1);
        if (t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set") return Array.from(r);
        if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return se(r, e)
    }
}

function se(r, e) {
    (e == null || e > r.length) && (e = r.length);
    for (var t = 0, n = new Array(e); t < e; t++) n[t] = r[t];
    return n
}

function Re() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
var h = function(e, t, n) {
        var a = !!n,
            o = s.useRef(n);
        s.useEffect(function() {
            o.current = n
        }, [n]), s.useEffect(function() {
            if (!a || !e) return function() {};
            var c = function() {
                o.current && o.current.apply(o, arguments)
            };
            return e.on(t, c),
                function() {
                    e.off(t, c)
                }
        }, [a, t, e, o])
    },
    I = function(e) {
        var t = s.useRef(e);
        return s.useEffect(function() {
            t.current = e
        }, [e]), t.current
    },
    _ = function(e) {
        return e !== null && B(e) === "object"
    },
    Ae = function(e) {
        return _(e) && typeof e.then == "function"
    },
    Le = function(e) {
        return _(e) && typeof e.elements == "function" && typeof e.createToken == "function" && typeof e.createPaymentMethod == "function" && typeof e.confirmCardPayment == "function"
    },
    ue = "[object Object]",
    H = function r(e, t) {
        if (!_(e) || !_(t)) return e === t;
        var n = Array.isArray(e),
            a = Array.isArray(t);
        if (n !== a) return !1;
        var o = Object.prototype.toString.call(e) === ue,
            c = Object.prototype.toString.call(t) === ue;
        if (o !== c) return !1;
        if (!o && !n) return e === t;
        var f = Object.keys(e),
            i = Object.keys(t);
        if (f.length !== i.length) return !1;
        for (var y = {}, S = 0; S < f.length; S += 1) y[f[S]] = !0;
        for (var g = 0; g < i.length; g += 1) y[i[g]] = !0;
        var u = Object.keys(y);
        if (u.length !== f.length) return !1;
        var R = e,
            x = t,
            C = function(E) {
                return r(R[E], x[E])
            };
        return u.every(C)
    },
    me = function(e, t, n) {
        return _(e) ? Object.keys(e).reduce(function(a, o) {
            var c = !_(t) || !H(e[o], t[o]);
            return n.includes(o) ? (c && console.warn("Unsupported prop change: options.".concat(o, " is not a mutable property.")), a) : c ? ie(ie({}, a || {}), {}, de({}, o, e[o])) : a
        }, null) : null
    },
    he = "Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.",
    ce = function(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : he;
        if (e === null || Le(e)) return e;
        throw new Error(t)
    },
    ye = function(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : he;
        if (Ae(e)) return {
            tag: "async",
            stripePromise: Promise.resolve(e).then(function(a) {
                return ce(a, t)
            })
        };
        var n = ce(e, t);
        return n === null ? {
            tag: "empty"
        } : {
            tag: "sync",
            stripe: n
        }
    },
    Se = function(e) {
        !e || !e._registerWrapper || !e.registerAppInfo || (e._registerWrapper({
            name: "react-stripe-js",
            version: "3.10.0"
        }), e.registerAppInfo({
            name: "react-stripe-js",
            version: "3.10.0",
            url: "https://stripe.com/docs/stripe-js/react"
        }))
    },
    D = s.createContext(null);
D.displayName = "ElementsContext";
var Ce = function(e, t) {
        if (!e) throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(t, " in an <Elements> provider."));
        return e
    },
    Ze = function(e) {
        var t = e.stripe,
            n = e.options,
            a = e.children,
            o = s.useMemo(function() {
                return ye(t)
            }, [t]),
            c = s.useState(function() {
                return {
                    stripe: o.tag === "sync" ? o.stripe : null,
                    elements: o.tag === "sync" ? o.stripe.elements(n) : null
                }
            }),
            f = Y(c, 2),
            i = f[0],
            y = f[1];
        s.useEffect(function() {
            var u = !0,
                R = function(C) {
                    y(function(P) {
                        return P.stripe ? P : {
                            stripe: C,
                            elements: C.elements(n)
                        }
                    })
                };
            return o.tag === "async" && !i.stripe ? o.stripePromise.then(function(x) {
                    x && u && R(x)
                }) : o.tag === "sync" && !i.stripe && R(o.stripe),
                function() {
                    u = !1
                }
        }, [o, i, n]);
        var S = I(t);
        s.useEffect(function() {
            S !== null && S !== t && console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.")
        }, [S, t]);
        var g = I(n);
        return s.useEffect(function() {
            if (i.elements) {
                var u = me(n, g, ["clientSecret", "fonts"]);
                u && i.elements.update(u)
            }
        }, [n, g, i.elements]), s.useEffect(function() {
            Se(i.stripe)
        }, [i.stripe]), s.createElement(D.Provider, {
            value: i
        }, a)
    },
    Ie = function(e) {
        var t = s.useContext(D);
        return Ce(t, e)
    },
    et = function() {
        var e = Ie("calls useElements()"),
            t = e.elements;
        return t
    },
    _e = ["on", "session"],
    J = s.createContext(null);
J.displayName = "CheckoutSdkContext";
var ge = function(e, t) {
        if (!e) throw new Error("Could not find CheckoutProvider context; You need to wrap the part of your app that ".concat(t, " in an <CheckoutProvider> provider."));
        return e
    },
    ee = s.createContext(null);
ee.displayName = "CheckoutContext";
var Ue = function(e, t) {
        if (!e) return null;
        e.on, e.session;
        var n = ve(e, _e);
        return Object.assign(t || e.session(), n)
    },
    Te = "Invalid prop `stripe` supplied to `CheckoutProvider`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.",
    tt = function(e) {
        var t = e.stripe,
            n = e.options,
            a = e.children,
            o = s.useMemo(function() {
                return ye(t, Te)
            }, [t]),
            c = s.useState(null),
            f = Y(c, 2),
            i = f[0],
            y = f[1],
            S = s.useState(function() {
                return {
                    stripe: o.tag === "sync" ? o.stripe : null,
                    checkoutSdk: null
                }
            }),
            g = Y(S, 2),
            u = g[0],
            R = g[1],
            x = function(m, b) {
                R(function(w) {
                    return w.stripe && w.checkoutSdk ? w : {
                        stripe: m,
                        checkoutSdk: b
                    }
                })
            },
            C = s.useRef(!1);
        s.useEffect(function() {
            var O = !0;
            return o.tag === "async" && !u.stripe ? o.stripePromise.then(function(m) {
                    m && O && !C.current && (C.current = !0, m.initCheckout(n).then(function(b) {
                        b && (x(m, b), b.on("change", y))
                    }))
                }) : o.tag === "sync" && o.stripe && !C.current && (C.current = !0, o.stripe.initCheckout(n).then(function(m) {
                    m && (x(o.stripe, m), m.on("change", y))
                })),
                function() {
                    O = !1
                }
        }, [o, u, n, y]);
        var P = I(t);
        s.useEffect(function() {
            P !== null && P !== t && console.warn("Unsupported prop change on CheckoutProvider: You cannot change the `stripe` prop after setting it.")
        }, [P, t]);
        var E = I(n),
            N = I(u.checkoutSdk);
        s.useEffect(function() {
            var O, m, b, w;
            if (u.checkoutSdk) {
                var W = !!(!N && u.checkoutSdk),
                    G = E == null || (O = E.elementsOptions) === null || O === void 0 ? void 0 : O.appearance,
                    U = n == null || (m = n.elementsOptions) === null || m === void 0 ? void 0 : m.appearance,
                    K = !H(U, G);
                U && (K || W) && u.checkoutSdk.changeAppearance(U);
                var L = E == null || (b = E.elementsOptions) === null || b === void 0 ? void 0 : b.fonts,
                    A = n == null || (w = n.elementsOptions) === null || w === void 0 ? void 0 : w.fonts,
                    k = !H(L, A);
                A && (k || W) && u.checkoutSdk.loadFonts(A)
            }
        }, [n, E, u.checkoutSdk, N]), s.useEffect(function() {
            Se(u.stripe)
        }, [u.stripe]);
        var q = s.useMemo(function() {
            return Ue(u.checkoutSdk, i)
        }, [u.checkoutSdk, i]);
        return u.checkoutSdk ? s.createElement(J.Provider, {
            value: u
        }, s.createElement(ee.Provider, {
            value: q
        }, a)) : null
    },
    Ne = function(e) {
        var t = s.useContext(J);
        return ge(t, e)
    },
    Q = function(e) {
        var t = s.useContext(J),
            n = s.useContext(D);
        if (t && n) throw new Error("You cannot wrap the part of your app that ".concat(e, " in both <CheckoutProvider> and <Elements> providers."));
        return t ? ge(t, e) : Ce(n, e)
    },
    rt = function() {
        Ne("calls useCheckout()");
        var e = s.useContext(ee);
        if (!e) throw new Error("Could not find Checkout Context; You need to wrap the part of your app that calls useCheckout() in an <CheckoutProvider> provider.");
        return e
    },
    We = ["mode"],
    Me = function(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    },
    l = function(e, t) {
        var n = "".concat(Me(e), "Element"),
            a = function(i) {
                var y = i.id,
                    S = i.className,
                    g = i.options,
                    u = g === void 0 ? {} : g,
                    R = i.onBlur,
                    x = i.onFocus,
                    C = i.onReady,
                    P = i.onChange,
                    E = i.onEscape,
                    N = i.onClick,
                    q = i.onLoadError,
                    O = i.onLoaderStart,
                    m = i.onNetworksChange,
                    b = i.onConfirm,
                    w = i.onCancel,
                    W = i.onShippingAddressChange,
                    G = i.onShippingRateChange,
                    U = i.onSavedPaymentMethodRemove,
                    K = i.onSavedPaymentMethodUpdate,
                    L = Q("mounts <".concat(n, ">")),
                    A = "elements" in L ? L.elements : null,
                    k = "checkoutSdk" in L ? L.checkoutSdk : null,
                    ke = s.useState(null),
                    te = Y(ke, 2),
                    d = te[0],
                    xe = te[1],
                    j = s.useRef(null),
                    z = s.useRef(null);
                h(d, "blur", R), h(d, "focus", x), h(d, "escape", E), h(d, "click", N), h(d, "loaderror", q), h(d, "loaderstart", O), h(d, "networkschange", m), h(d, "confirm", b), h(d, "cancel", w), h(d, "shippingaddresschange", W), h(d, "shippingratechange", G), h(d, "savedpaymentmethodremove", U), h(d, "savedpaymentmethodupdate", K), h(d, "change", P);
                var X;
                C && (e === "expressCheckout" ? X = C : X = function() {
                    C(d)
                }), h(d, "ready", X), s.useLayoutEffect(function() {
                    if (j.current === null && z.current !== null && (A || k)) {
                        var v = null;
                        if (k) switch (e) {
                            case "payment":
                                v = k.createPaymentElement(u);
                                break;
                            case "address":
                                if ("mode" in u) {
                                    var ne = u.mode,
                                        oe = ve(u, We);
                                    if (ne === "shipping") v = k.createShippingAddressElement(oe);
                                    else if (ne === "billing") v = k.createBillingAddressElement(oe);
                                    else throw new Error("Invalid options.mode. mode must be 'billing' or 'shipping'.")
                                } else throw new Error("You must supply options.mode. mode must be 'billing' or 'shipping'.");
                                break;
                            case "expressCheckout":
                                v = k.createExpressCheckoutElement(u);
                                break;
                            case "currencySelector":
                                v = k.createCurrencySelectorElement();
                                break;
                            case "taxId":
                                v = k.createTaxIdElement(u);
                                break;
                            default:
                                throw new Error("Invalid Element type ".concat(n, ". You must use either the <PaymentElement />, <AddressElement options={{mode: 'shipping'}} />, <AddressElement options={{mode: 'billing'}} />, or <ExpressCheckoutElement />."))
                        } else A && (v = A.create(e, u));
                        j.current = v, xe(v), v && v.mount(z.current)
                    }
                }, [A, k, u]);
                var re = I(u);
                return s.useEffect(function() {
                    if (j.current) {
                        var v = me(u, re, ["paymentRequest"]);
                        v && "update" in j.current && j.current.update(v)
                    }
                }, [u, re]), s.useLayoutEffect(function() {
                    return function() {
                        if (j.current && typeof j.current.destroy == "function") try {
                            j.current.destroy(), j.current = null
                        } catch {}
                    }
                }, []), s.createElement("div", {
                    id: y,
                    className: S,
                    ref: z
                })
            },
            o = function(i) {
                Q("mounts <".concat(n, ">"));
                var y = i.id,
                    S = i.className;
                return s.createElement("div", {
                    id: y,
                    className: S
                })
            },
            c = t ? o : a;
        return c.displayName = n, c.__elementType = e, c
    },
    p = typeof window > "u",
    $e = s.createContext(null);
$e.displayName = "EmbeddedCheckoutProviderContext";
var nt = function() {
    var e = Q("calls useStripe()"),
        t = e.stripe;
    return t
};
l("auBankAccount", p);
l("card", p);
l("cardNumber", p);
l("cardExpiry", p);
l("cardCvc", p);
l("fpxBank", p);
l("iban", p);
l("idealBank", p);
l("p24Bank", p);
l("epsBank", p);
var ot = l("payment", p),
    at = l("expressCheckout", p);
l("currencySelector", p);
l("paymentRequestButton", p);
l("linkAuthentication", p);
var it = l("address", p);
l("shippingAddress", p);
l("paymentMethodMessaging", p);
l("affirmMessage", p);
l("afterpayClearpayMessage", p);
l("taxId", p);

function F(r) {
    "@babel/helpers - typeof";
    return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? F = function(e) {
        return typeof e
    } : F = function(e) {
        return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }, F(r)
}
var Ee = "basil",
    Be = function(e) {
        return e === 3 ? "v3" : e
    },
    be = "https://js.stripe.com",
    Fe = "".concat(be, "/").concat(Ee, "/stripe.js"),
    Ve = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,
    Ye = /^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/,
    le = "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",
    De = function(e) {
        return Ve.test(e) || Ye.test(e)
    },
    Je = function() {
        for (var e = document.querySelectorAll('script[src^="'.concat(be, '"]')), t = 0; t < e.length; t++) {
            var n = e[t];
            if (De(n.src)) return n
        }
        return null
    },
    pe = function(e) {
        var t = e && !e.advancedFraudSignals ? "?advancedFraudSignals=false" : "",
            n = document.createElement("script");
        n.src = "".concat(Fe).concat(t);
        var a = document.head || document.body;
        if (!a) throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
        return a.appendChild(n), n
    },
    qe = function(e, t) {
        !e || !e._registerWrapper || e._registerWrapper({
            name: "stripe-js",
            version: "7.9.0",
            startTime: t
        })
    },
    T = null,
    M = null,
    $ = null,
    Ge = function(e) {
        return function(t) {
            e(new Error("Failed to load Stripe.js", {
                cause: t
            }))
        }
    },
    Ke = function(e, t) {
        return function() {
            window.Stripe ? e(window.Stripe) : t(new Error("Stripe.js not available"))
        }
    },
    ze = function(e) {
        return T !== null ? T : (T = new Promise(function(t, n) {
            if (typeof window > "u" || typeof document > "u") {
                t(null);
                return
            }
            if (window.Stripe && e && console.warn(le), window.Stripe) {
                t(window.Stripe);
                return
            }
            try {
                var a = Je();
                if (a && e) console.warn(le);
                else if (!a) a = pe(e);
                else if (a && $ !== null && M !== null) {
                    var o;
                    a.removeEventListener("load", $), a.removeEventListener("error", M), (o = a.parentNode) === null || o === void 0 || o.removeChild(a), a = pe(e)
                }
                $ = Ke(t, n), M = Ge(n), a.addEventListener("load", $), a.addEventListener("error", M)
            } catch (c) {
                n(c);
                return
            }
        }), T.catch(function(t) {
            return T = null, Promise.reject(t)
        }))
    },
    Xe = function(e, t, n) {
        if (e === null) return null;
        var a = t[0],
            o = a.match(/^pk_test/),
            c = Be(e.version),
            f = Ee;
        o && c !== f && console.warn("Stripe.js@".concat(c, " was loaded on the page, but @stripe/stripe-js@").concat("7.9.0", " expected Stripe.js@").concat(f, ". This may result in unexpected behavior. For more information, see https://docs.stripe.com/sdks/stripejs-versioning"));
        var i = e.apply(void 0, t);
        return qe(i, n), i
    },
    fe = function(e) {
        var t = `invalid load parameters; expected object of shape

    {advancedFraudSignals: boolean}

but received

    `.concat(JSON.stringify(e), `
`);
        if (e === null || F(e) !== "object") throw new Error(t);
        if (Object.keys(e).length === 1 && typeof e.advancedFraudSignals == "boolean") return e;
        throw new Error(t)
    },
    V, Z = !1,
    He = function() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        Z = !0;
        var a = Date.now();
        return ze(V).then(function(o) {
            return Xe(o, t, a)
        })
    };
He.setLoadParameters = function(r) {
    if (Z && V) {
        var e = fe(r),
            t = Object.keys(e),
            n = t.reduce(function(a, o) {
                var c;
                return a && r[o] === ((c = V) === null || c === void 0 ? void 0 : c[o])
            }, !0);
        if (n) return
    }
    if (Z) throw new Error("You cannot change load parameters after calling loadStripe");
    V = fe(r)
};
export {
    it as A, tt as C, at as E, ot as P, et as a, Ze as b, rt as c, He as l, nt as u
};
//# sourceMappingURL=b8ba2ec7-b3h6sni00olgnf96.js.map