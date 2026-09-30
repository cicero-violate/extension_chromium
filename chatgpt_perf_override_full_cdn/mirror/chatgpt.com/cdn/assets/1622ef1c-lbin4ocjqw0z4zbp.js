import {
    c as R,
    u as C,
    j as t,
    r as x,
    o as g
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    hP as A,
    sb as z,
    b2 as D,
    fW as $,
    aO as O,
    rL as X,
    af as b,
    hk as U,
    aw as w,
    bW as E,
    b5 as v,
    cf as Y,
    B7 as W,
    nP as H
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    eX as G,
    pR as K,
    wY as L,
    dn as q
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    g as Q
} from "./411304d4-l2o3ynhpzevzmar6.js";
import {
    l as V,
    b as Z
} from "./b8ba2ec7-b3h6sni00olgnf96.js";
import {
    C as F
} from "./c8d36e23-ccuyzajtuddlftds.js";
import {
    E as J
} from "./82244417-gtg7yq4t8dhuwljw.js";
import {
    S as ee
} from "./74006267-m5l37lodlljn1srb.js";
import {
    t as te
} from "./f254c486-e4e4t6ee3eghlnbc.js";
const je = s => {
        "use forget";
        const e = R.c(23);
        let i, r, n, a;
        e[0] !== s ? ({
            currentPane: r,
            popPane: n,
            PANES: i,
            ...a
        } = s, e[0] = s, e[1] = i, e[2] = r, e[3] = n, e[4] = a) : (i = e[1], r = e[2], n = e[3], a = e[4]);
        const o = C();
        if (r === "overview") {
            let m;
            return e[5] !== a ? (m = t.jsx(se, { ...a
            }), e[5] = a, e[6] = m) : m = e[6], m
        }
        let l;
        e[7] !== o ? (l = o.formatMessage({
            id: "Px7S/2",
            defaultMessage: "Close"
        }), e[7] = o, e[8] = l) : l = e[8];
        let c;
        e[9] === Symbol.for("react.memo_cache_sentinel") ? (c = t.jsx(z, {
            className: "icon-md text-token-interactive-icon-tertiary-default"
        }), e[9] = c) : c = e[9];
        let d;
        e[10] !== n || e[11] !== l ? (d = t.jsx("button", {
            type: "button",
            onClick: n,
            className: "bg-token-main-surface-primary hover:bg-token-main-surface-secondary focus-visible:ring-token-text-quaternary dark:hover:bg-token-main-surface-tertiary -ms-1 flex h-8 w-8 items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent focus-visible:outline-hidden",
            "aria-label": l,
            children: c
        }), e[10] = n, e[11] = l, e[12] = d) : d = e[12];
        let p;
        e[13] !== i || e[14] !== r || e[15] !== o ? (p = o.formatMessage(i[r].name), e[13] = i, e[14] = r, e[15] = o, e[16] = p) : p = e[16];
        let u;
        e[17] !== p ? (u = t.jsx("span", {
            className: "text-xl font-medium",
            children: p
        }), e[17] = p, e[18] = u) : u = e[18];
        let f;
        return e[19] !== r || e[20] !== d || e[21] !== u ? (f = t.jsxs("div", {
            className: "flex items-center gap-2 pt-1",
            children: [d, u]
        }, r), e[19] = r, e[20] = d, e[21] = u, e[22] = f) : f = e[22], f
    },
    se = s => {
        "use forget";
        const e = R.c(15),
            {
                url: i,
                faviconUrl: r,
                logoUrl: n,
                title: a,
                subtitle: o,
                subtitlePrefix: l,
                subtitleUrl: c
            } = s;
        let d;
        if (e[0] !== r || e[1] !== n || e[2] !== o || e[3] !== l || e[4] !== c || e[5] !== a || e[6] !== i) {
            const p = ae(a);
            let u;
            e[8] !== r || e[9] !== n || e[10] !== a ? (u = n ? t.jsx("img", {
                src: n,
                alt: a,
                className: "icon bg-token-bg-primary dark:bg-token-main-surface-primary-inverse rounded-full object-cover"
            }) : t.jsx(G, {
                className: "icon bg-token-bg-primary dark:bg-token-main-surface-primary-inverse rounded-full object-cover",
                url: r ? ? "",
                size: 128,
                minSize: 16,
                fallback: t.jsx(K, {
                    className: "text-token-text-tertiary"
                })
            }), e[8] = r, e[9] = n, e[10] = a, e[11] = u) : u = e[11];
            const f = i ? t.jsx(A, {
                className: `text-sm font-medium ${p?"text-token-text-link":""}`,
                href: i,
                target: "_blank",
                children: a
            }) : t.jsx("div", {
                className: "text-sm font-medium",
                children: a
            });
            let m;
            e[12] !== u || e[13] !== f ? (m = t.jsxs("div", {
                className: "flex items-center gap-2",
                children: [u, f]
            }), e[12] = u, e[13] = f, e[14] = m) : m = e[14], d = t.jsxs("div", {
                className: "flex min-h-[36px] flex-col justify-center",
                children: [m, o && t.jsxs("div", {
                    className: "text-token-text-secondary text-xs",
                    children: [l, c ? t.jsx(A, {
                        className: ne(p),
                        href: c,
                        target: "_blank",
                        children: o
                    }) : o]
                })]
            }), e[0] = r, e[1] = n, e[2] = o, e[3] = l, e[4] = c, e[5] = a, e[6] = i, e[7] = d
        } else d = e[7];
        return d
    },
    ae = s => {
        const e = s.trim().toLocaleLowerCase().replace(/^www\./, "").replace(/\/+$/, "");
        return e === "walmart" || e === "walmart.com"
    },
    ne = s => s ? "inline text-xs text-blue-400 underline" : "inline text-token-text-link text-xs underline",
    ie = ["card", "shop_pay", "us_bank_account"],
    re = ["payment_element_change_preview_beta_1", "prepare_payment_method_beta_1", "elements_icon_style_beta_1", "elements_address_element_sync_checkbox_beta_1", "link_forest_beta_1", "ece_prefer_plain_single_row_beta_1", "relax_spm_address_validation_beta_1", "change_event_improvements_beta_1"],
    oe = 15e3;

function ve({
    clientThreadId: s,
    grandTotal: e,
    merchantExternalId: i,
    merchantNetworkId: r,
    merchantTitle: n,
    paymentMethodTypes: a,
    fetchSession: o,
    allowMissingServerThreadId: l = !1,
    children: c
}) {
    const {
        stripeCartSession: d,
        loading: p,
        error: u
    } = ce(s, o, l), f = D(), m = C(), [h, S] = x.useState(null), _ = x.useMemo(() => d ? .publishable_key ? V(d.publishable_key, {
        betas: re
    }) : null, [d ? .publishable_key]), I = x.useMemo(() => {
        if (!d ? .client_secret || !a ? .length) return null;
        const k = Q();
        return {
            mode: "payment",
            currency: "usd",
            amount: e,
            customerSessionClientSecret: d.client_secret,
            paymentMethodTypes: a.filter(B => ie.includes(B)),
            paymentMethodOptions: a.includes("shop_pay") ? {
                shop_pay: {
                    shop_id: i
                }
            } : void 0,
            sellerDetails: i && r && n ? {
                externalId: i,
                networkId: r,
                businessName: n
            } : void 0,
            syncAddressCheckbox: {
                mode: "shipping",
                formBehavior: "editable"
            },
            ...k ? {
                savedPaymentMethod: k
            } : void 0,
            appearance: le(f)
        }
    }, [f, i, r, n, a, d ? .client_secret, e]), M = p || !_ || !I;
    return x.useEffect(() => {
        if (!M) return;
        const k = setTimeout(() => {
            S(m.formatMessage({
                id: "Vj32Tb",
                defaultMessage: "Failed to load cart session (1298). Please refresh the page and try again."
            }))
        }, oe);
        return () => clearTimeout(k)
    }, [M, m]), M ? c({
        loadingCartSession: !0,
        cartLoadError: u ? ? h
    }) : t.jsx(Z, {
        stripe: _,
        options: I,
        children: c({
            loadingCartSession: p,
            cartLoadError: u
        })
    })
}

function le(s) {
    return {
        icons: "outline",
        theme: s ? "night" : "stripe",
        labels: "floating",
        inputs: "condensed",
        variables: {
            fontSizeBase: "16px",
            colorPrimary: s ? "white" : "black",
            colorBackground: s ? "#2f2f2f" : "white",
            borderRadius: "30px",
            gridRowSpacing: "8px",
            gridColumnSpacing: "8px",
            colorTextSecondary: "#8F8F8F",
            fontSizeXs: "0.8rem"
        },
        rules: {
            ".Input, .PickerItem, .Tab, .AccordionItem, .Dropdown, .Block": {
                borderRadius: "16px",
                boxShadow: "none"
            },
            ".Input": {
                padding: "12px 16px 10px 16px",
                fontSize: "1em"
            },
            ".CheckboxLabel": {
                fontWeight: "500",
                fontSize: ".9rem",
                alignItems: "center"
            },
            ".Label--floating": {
                padding: "0",
                fontSize: ".75em",
                marginTop: "-3px"
            },
            ".AccordionItem--selected": {
                border: `solid 1px ${s?"white":"black"}`
            },
            ".Input:focus": {
                boxShadow: "none",
                borderColor: s ? "white" : "black"
            },
            ".Label": {
                fontWeight: "500",
                fontSize: "14px",
                marginBottom: "6px",
                color: "#8F8F8F"
            }
        },
        disableAnimations: !0
    }
}

function ce(s, e, i) {
    const r = C(),
        n = $(s),
        o = (window && window.location.href).includes("/share/"),
        [l, c] = x.useState(null),
        [d, p] = x.useState(!0),
        [u, f] = x.useState(null),
        m = O(async () => {
            try {
                const {
                    error: h,
                    client_secret: S,
                    publishable_key: _
                } = await e();
                return h ? f(h) : S && _ ? c({
                    client_secret: S,
                    publishable_key: _
                }) : f(r.formatMessage({
                    id: "imEcZX",
                    defaultMessage: "Failed to load cart session (1300)"
                }))
            } catch (h) {
                return f(h instanceof Error ? h.message : r.formatMessage({
                    id: "S86mYy",
                    defaultMessage: "Failed to load cart session (1301)"
                }))
            } finally {
                p(!1)
            }
        });
    return x.useEffect(() => {
        if (!n && !o && !i) {
            f(r.formatMessage({
                id: "/zl1B7",
                defaultMessage: "Failed to load cart session (1299). Please refresh the page and try again."
            }));
            return
        }
        m()
    }, []), {
        stripeCartSession: l,
        loading: d,
        error: u
    }
}
const j = 200,
    P = 150;

function Se(s) {
    const [e, i] = x.useState([s]), [r, n] = x.useState(null), [a, o] = x.useState("right"), l = e[e.length - 1], c = x.useCallback(u => {
        o("right"), n(l), i(f => [...f, u]), setTimeout(() => n(null), j + P)
    }, [l]), d = x.useCallback(() => {
        e.length <= 1 || (o("left"), n(l), i(u => u.slice(0, u.length - 1)), setTimeout(() => n(null), j + P))
    }, [l, e.length]), p = x.useCallback(() => {
        e.length <= 1 || (o("left"), n(l), i([e[0]]), setTimeout(() => n(null), j + P))
    }, [l, e]);
    return {
        currentPane: l,
        exitingPane: r,
        direction: a,
        pushPane: c,
        popPane: d,
        resetPanes: p
    }
}

function ke({
    renderPane: s,
    className: e,
    paneStack: i,
    useDelayedEnteringPane: r,
    alwaysMountedPanes: n = []
}) {
    const {
        currentPane: a,
        exitingPane: o,
        direction: l
    } = i, c = X(), [d, p] = x.useState(!0), u = x.useRef(a), f = x.useRef(null);
    return x.useEffect(() => {
        if (u.current !== a)
            if (p(!1), !c && r) {
                const m = setTimeout(() => {
                    p(!0), u.current = a
                }, j + 50);
                return () => clearTimeout(m)
            } else p(!0), u.current = a
    }, [a, c, r]), x.useEffect(() => {
        setTimeout(() => {
            f.current && f.current ? .scrollTo({
                top: 0
            })
        }, j)
    }, [o]), t.jsxs("div", {
        className: b("relative overflow-x-clip", e),
        children: [o != null && !c && !n.includes(o) && t.jsx("div", {
            className: b("absolute inset-0 overflow-y-auto", N("exit", l)),
            children: s(o)
        }), !n.includes(a) && t.jsx("div", {
            className: b("absolute inset-0 overflow-y-auto", u.current !== a && !c ? N("enter", l) : ""),
            children: d && s(a)
        }), n.map(m => {
            const h = m === o;
            return t.jsx("div", {
                ref: h ? f : void 0,
                className: b("absolute inset-0 overflow-y-auto", m === a || m === o ? "" : "hidden", o === m && !c && N("exit", l), a === m && u.current !== a && !c && N("enter", l)),
                children: s(m)
            }, `persist-${String(m)}`)
        })]
    })
}

function N(s, e) {
    return s === "enter" ? e === "right" ? "animate-[slide-in-right_0.2s_forwards]" : "animate-[slide-in-left_0.2s_forwards]" : e === "right" ? "animate-[slide-out-left_0.2s_forwards]" : "animate-[slide-out-right_0.2s_forwards]"
}
const ue = {
        error: "bg-token-bg-status-error text-token-interactive-label-danger-secondary-default",
        warning: "bg-token-bg-status-warning text-token-text-status-warning",
        info: "bg-blue-50 text-blue-800 dark:bg-blue-900/40 dark:text-blue-100"
    },
    Ne = ({
        message: s,
        level: e = "error"
    }) => t.jsxs("div", {
        className: `${ue[e]} flex items-center rounded-lg px-3 py-2 text-sm`,
        children: [t.jsx(U, {
            className: "me-2 shrink-0"
        }), s]
    }),
    T = ({
        messages: s,
        intervalMs: e = 4e3,
        repeat: i
    }) => {
        const [r, n] = x.useState(0);
        return x.useEffect(() => {
            if (s.length <= 1) return;
            const a = setInterval(() => {
                n(o => !i && o >= s.length - 1 ? (clearInterval(a), o) : (o + 1) % s.length)
            }, e);
            return () => clearInterval(a)
        }, [s.length, e, i]), t.jsx(w, {
            contentsFullWidth: !0,
            fullWidth: !0,
            disabled: !0,
            className: "h-10 text-base",
            children: t.jsx("div", {
                className: "relative h-6 w-full overflow-hidden",
                children: t.jsx(E, {
                    initial: !1,
                    children: t.jsxs(v.span, {
                        initial: {
                            y: "100%",
                            opacity: 0
                        },
                        animate: {
                            y: "0%",
                            opacity: 1
                        },
                        exit: {
                            y: "-100%",
                            opacity: 0
                        },
                        transition: {
                            duration: .3
                        },
                        className: "absolute inset-0 flex items-center justify-center",
                        children: [t.jsx(Y, {
                            className: "me-2"
                        }), s[r]]
                    }, r)
                })
            })
        })
    },
    we = ({
        isSubmitting: s,
        isUpdating: e,
        isDisabled: i,
        merchantTitle: r,
        hasValidPaymentMethod: n,
        paymentSheetButtonCta: a,
        onClickPay: o,
        pushPane: l,
        expressCheckoutElement: c,
        expressCheckoutElementReady: d
    }) => {
        const p = x.useMemo(() => de(r), [r]),
            u = i || !n,
            f = s ? t.jsx(T, {
                messages: p
            }) : t.jsx(w, {
                fullWidth: !0,
                disabled: u,
                onClick: o,
                className: "btn-primary h-10 rounded-full px-6 text-sm font-medium",
                contentWrapperClassName: "w-full min-w-0",
                children: t.jsx("span", {
                    className: "truncate",
                    children: t.jsx(g, {
                        id: "BbrtuK",
                        defaultMessage: "Pay {merchant}",
                        values: {
                            merchant: r
                        }
                    })
                })
            }),
            m = t.jsxs("div", {
                className: "flex w-full flex-col gap-2 overflow-hidden",
                style: {
                    minHeight: d ? void 0 : "104px"
                },
                children: [t.jsxs("div", {
                    className: "relative",
                    children: [t.jsx(E, {
                        initial: !1,
                        children: !d && !s && t.jsx(v.div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            transition: {
                                duration: .3
                            },
                            className: "absolute inset-0",
                            children: t.jsx(T, {
                                messages: [t.jsx(g, {
                                    id: "4NPTWv",
                                    defaultMessage: "Loading payment methods"
                                }, "loading")]
                            })
                        }, "working")
                    }), t.jsx(v.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: d ? 1 : 0
                        },
                        transition: {
                            opacity: {
                                duration: .3
                            }
                        },
                        style: {
                            pointerEvents: d ? "auto" : "none"
                        },
                        className: b(s && "hidden"),
                        children: c
                    }, "express")]
                }), !n && t.jsx("div", {
                    className: "flex place-items-start",
                    children: s ? t.jsx(T, {
                        messages: p
                    }) : t.jsx(w, {
                        fullWidth: !0,
                        color: "ghost",
                        className: "border-token-border-light h-10 rounded-full border text-base",
                        onClick: () => l("paymentMethod"),
                        children: t.jsx(g, {
                            id: "checkout.payButtons.paymentSheetCta",
                            defaultMessage: "{cta}",
                            values: {
                                cta: a.trim().length > 0 ? a : "Pay another way"
                            }
                        })
                    })
                })]
            });
        return t.jsxs("div", {
            className: b("flex flex-col gap-2 pt-4 transition-opacity duration-300", e && "pointer-events-none opacity-30 [&_*]:pointer-events-none"),
            children: [n && f, m]
        })
    },
    de = s => [t.jsx(g, {
        id: "RHR6oM",
        defaultMessage: "Talking to {store}",
        values: {
            store: s
        }
    }, "working"), t.jsx(g, {
        id: "QGko3r",
        defaultMessage: "Still working"
    }, "talking"), t.jsx(g, {
        id: "D8fGfD",
        defaultMessage: "Finalizing details"
    }, "securing")],
    Me = ({
        text: s,
        className: e = "",
        duration: i = .15
    }) => {
        const r = x.useMemo(() => [...s].map((n, a) => ({
            key: `${a}-${n}`,
            char: n,
            delay: Math.random() * .4
        })), [s]);
        return t.jsx("span", {
            className: `perspective-1000 inline-block ${e}`,
            children: r.map(({
                key: n,
                char: a,
                delay: o
            }, l) => t.jsxs(v.span, {
                layout: !0,
                transition: {
                    layout: {
                        type: "spring",
                        stiffness: 320,
                        damping: 30
                    }
                },
                className: "relative inline-block align-baseline",
                children: [t.jsx("span", {
                    className: "invisible",
                    children: a === " " ? " " : a
                }), t.jsx(E, {
                    initial: !1,
                    children: t.jsx(v.span, {
                        className: "absolute inset-0 inline-block will-change-transform",
                        initial: {
                            rotateX: 90,
                            opacity: 0,
                            translateY: "0.2em"
                        },
                        animate: {
                            rotateX: 0,
                            opacity: 1,
                            translateY: 0
                        },
                        exit: {
                            rotateX: -90,
                            opacity: 0,
                            translateY: "-0.2em"
                        },
                        transition: {
                            duration: i,
                            ease: "easeInOut",
                            delay: o
                        },
                        children: a === " " ? " " : a
                    }, n)
                })]
            }, l))
        })
    },
    y = ({
        onClick: s,
        className: e = "",
        icon: i,
        primaryText: r,
        secondaryText: n,
        rightContent: a,
        disabled: o,
        showChevron: l = !0
    }) => t.jsxs("button", {
        type: "button",
        disabled: o,
        className: b("bg-token-bg-elevated-primary flex min-h-[62px] w-full items-center justify-between rounded px-1 py-0 select-none", e, !s && "cursor-default"),
        onClick: s,
        style: {
            boxShadow: "none"
        },
        children: [t.jsxs("div", {
            className: "flex items-center gap-3.5 py-3",
            children: [i, t.jsxs("div", {
                className: "flex flex-col items-start",
                children: [t.jsx("span", {
                    className: "flex items-center gap-2 text-sm font-medium",
                    children: r
                }), n && t.jsx("span", {
                    className: "text-token-text-secondary text-[13px] leading-tight",
                    children: n
                })]
            })]
        }), (a || l) && t.jsxs("div", {
            className: "flex items-center gap-2 pe-2",
            children: [a, l && t.jsx(q, {
                className: "text-token-text-tertiary icon-lg"
            })]
        })]
    }),
    Pe = ({
        onClick: s,
        isComplete: e,
        icon: i,
        iconUrl: r,
        label: n,
        sublabel: a,
        badge: o,
        isLoading: l
    }) => l ? t.jsx(y, {
        disabled: !0,
        icon: t.jsx(F, {
            className: "icon-lg"
        }),
        primaryText: t.jsx(W, {
            index: 1,
            width: 100,
            heightSize: "sm",
            className: "min-w-28"
        })
    }) : t.jsx(y, {
        onClick: s,
        icon: e && r ? t.jsx("img", {
            src: r,
            alt: "",
            className: "icon-lg object-contain"
        }) : e && i ? t.jsx(H, {
            svgString: i ? .outerHTML,
            className: "icon-lg"
        }) : t.jsx(F, {
            className: "icon-lg"
        }),
        primaryText: e ? n : t.jsx(g, {
            id: "nO5Crd",
            defaultMessage: "Add payment method"
        }),
        secondaryText: e ? a : void 0,
        rightContent: e && o ? t.jsx("span", {
            className: "rounded-md bg-[#fff8eb] px-3 py-1 text-xs leading-none font-semibold text-[#e29e00]",
            children: o
        }) : void 0
    }),
    Te = ({
        isLoading: s,
        onClick: e,
        name: i,
        addressLine1: r,
        addressLine2: n,
        city: a,
        state: o,
        isComplete: l
    }) => s ? t.jsx(y, {
        disabled: !0,
        icon: t.jsx(L, {
            className: "icon-lg"
        }),
        primaryText: t.jsx(W, {
            index: 1,
            width: 100,
            heightSize: "sm",
            className: "min-w-28"
        })
    }) : t.jsx(y, {
        onClick: e,
        icon: t.jsx(L, {
            className: "icon-lg"
        }),
        primaryText: l ? t.jsx(t.Fragment, {
            children: i && t.jsx("span", {
                children: i
            })
        }) : t.jsx(g, {
            id: "BlMnQg",
            defaultMessage: "Add shipping address"
        }),
        secondaryText: l ? t.jsx(g, {
            id: "XZ62ju",
            defaultMessage: "{line1}{line2}{city}, {state}",
            values: {
                line1: r ? `${r}, ` : "",
                line2: n ? `${n}, ` : "",
                city: a || "",
                state: o || ""
            }
        }) : void 0
    }),
    Ce = ({
        emailAddress: s
    }) => t.jsx(y, {
        onClick: void 0,
        icon: t.jsx(J, {
            className: "icon-lg"
        }),
        showChevron: !1,
        primaryText: t.jsx(g, {
            id: "xNqXJN",
            defaultMessage: "Digital Delivery"
        }),
        secondaryText: t.jsx(g, {
            id: "a8C3IV",
            defaultMessage: "Email to {emailAddress}",
            values: {
                emailAddress: s
            }
        })
    }),
    Ee = ({
        method: s,
        onClick: e
    }) => t.jsx(y, {
        onClick: e,
        icon: t.jsx(ee, {
            className: "icon-lg"
        }),
        primaryText: s.title,
        secondaryText: s.subtitle
    });

function Ie(s, e, i) {
    return {
        name: s,
        line_one: e.line1 ? ? void 0,
        line_two: e.line2,
        city: e.city ? ? "",
        state: e.state ? ? "",
        postal_code: e.postal_code ? ? "",
        country: e.country,
        phone_number: i
    }
}

function Ae(s, e, i) {
    return {
        name: s ? ? "",
        line_one: e.line1 ? ? "",
        line_two: e.line2 ? ? "",
        city: e.city ? ? "",
        state: e.state ? ? "",
        country: te(e.country) ? ? "US",
        postal_code: e.postal_code ? ? "",
        phone_number: i ? ? ""
    }
}
async function Le({
    stripe: s,
    elements: e,
    intl: i,
    billingName: r,
    billingEmail: n,
    isExpressCheckout: a
}) {
    if (!a) {
        const c = await e.submit();
        if (c ? .error) return {
            isError: !0,
            action: "payment_failed",
            reason: "stripe_payment_submit_failed",
            uiMessage: c.error.message ? ? i.formatMessage({
                id: "Fken/H",
                defaultMessage: "Failed to submit payment (1341)"
            }),
            internalMessage: c.error.message ? `${c.error.message} (${c.error.code})` : void 0,
            extraLogData: {
                error_message: c.error.message,
                error_code: c.error.code
            }
        }
    }
    const {
        error: o,
        paymentMethod: l
    } = await s.preparePaymentMethod({
        elements: e,
        params: {
            allow_redisplay: "always",
            billing_details: {
                name: r,
                email: n
            }
        }
    });
    return o ? {
        isError: !0,
        action: "payment_failed",
        reason: "stripe_prepare_payment_method_failed",
        uiMessage: o.message ? ? i.formatMessage({
            id: "bUeW4/",
            defaultMessage: "Failed to submit payment (1342)"
        }),
        internalMessage: String(o),
        extraLogData: {
            error_message: o
        }
    } : l
}
const Fe = ({
    onClick: s,
    isDisabled: e = !1,
    isSaving: i = !1
}) => t.jsx(w, {
    fullWidth: !0,
    color: "primary",
    onClick: s,
    disabled: e,
    className: "h-10",
    children: i ? t.jsx(g, {
        id: "WmDyLh",
        defaultMessage: "Saving..."
    }) : t.jsx(g, {
        id: "8jETK0",
        defaultMessage: "Continue"
    })
});
export {
    Ne as C, Ce as D, Pe as P, Me as R, je as S, Ae as a, we as b, Fe as c, ve as d, Te as e, Ee as f, ke as g, Ie as m, Le as p, Se as u
};
//# sourceMappingURL=1622ef1c-lbin4ocjqw0z4zbp.js.map