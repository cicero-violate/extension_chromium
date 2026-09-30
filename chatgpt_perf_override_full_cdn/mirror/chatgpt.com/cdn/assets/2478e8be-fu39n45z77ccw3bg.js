import {
    j as e,
    n as M,
    o as g,
    z as S,
    s as q,
    r as w
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    af as m,
    R as x,
    v as u,
    D as L,
    B6 as E,
    q as O,
    _ as b,
    ge as _,
    aw as j,
    sb as T,
    de as N,
    hk as B,
    aX as F,
    B7 as k
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    eX as R,
    pR as U,
    gP as G,
    dn as W
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    S as $
} from "./c50694f1-efc0umb4i9cif66s.js";
import z from "./d4fd05ef-jcd8acyt60dknv7p.js";
const A = {
    sm: {
        container: "h-14 w-14",
        single: "h-14 w-14",
        stacked: "h-11 w-11",
        offset: "translate-x-3 translate-y-3"
    },
    lg: {
        container: "h-32 w-32",
        single: "h-32 w-32",
        stacked: "h-28 w-28",
        offset: "translate-x-3 translate-y-3"
    }
};

function H({
    imageUrls: s,
    alt: a,
    size: t,
    containerClassName: i,
    frameClassName: n,
    imageClassName: r,
    maxImages: d = 2
}) {
    const c = s.filter(f => !!f).slice(0, d),
        p = A[t];
    return e.jsxs("div", {
        className: m("relative", p.container, i),
        children: [c.length === 0 && e.jsx("div", {
            className: m("absolute start-0 top-0 overflow-hidden", p.single, n)
        }), c.length === 1 && e.jsx("div", {
            className: m("absolute start-0 top-0 overflow-hidden", p.single, n),
            children: e.jsx("img", {
                src: c[0],
                alt: a,
                className: m("m-0 h-full w-full object-cover", r)
            })
        }), c.length >= 2 && e.jsxs(e.Fragment, {
            children: [e.jsx("div", {
                className: m("absolute start-0 top-0 overflow-hidden", p.stacked, n),
                children: e.jsx("img", {
                    src: c[1],
                    alt: a,
                    className: m("m-0 h-full w-full object-cover", r)
                })
            }), e.jsx("div", {
                className: m("absolute start-0 top-0 overflow-hidden", p.stacked, p.offset, n),
                children: e.jsx("img", {
                    src: c[0],
                    alt: a,
                    className: m("m-0 h-full w-full object-cover", r)
                })
            })]
        })]
    })
}
const ae = async s => await x.safePost("/shopping/customer", {
        requestBody: {
            items: s.map(a => ({
                id: a.id,
                value: a.value,
                quantity: a.quantity
            }))
        },
        authOption: u.SendIfAvailable
    }),
    re = async ({
        conversationId: s,
        sharedConversationUrl: a,
        existing_customer_session_client_secret: t,
        items: i,
        cart: n
    }) => {
        const d = {
                items: n ? void 0 : (i ? ? []).map(c => ({
                    id: c.id,
                    value: c.value,
                    quantity: c.quantity
                })),
                cart: n || void 0,
                conversation_id: s,
                shared_conversation_url: a,
                existing_customer_session_client_secret: t
            },
            l = async () => await x.safePost("/shopping/checkout", {
                requestBody: d,
                authOption: u.SendIfAvailable
            });
        try {
            return await l()
        } catch {
            return await l()
        }
    },
    oe = async () => await x.safeGet("/shopping/carts", {
        authOption: u.SendIfAvailable
    }),
    ne = async s => await x.safePost("/shopping/cart/add", {
        requestBody: {
            item_payload: s
        },
        authOption: u.SendIfAvailable
    }),
    ie = async s => await x.safePost("/shopping/cart/remove", {
        requestBody: {
            item: s
        },
        authOption: u.SendIfAvailable
    }),
    le = async (s, {
        shippingMethodId: a,
        shippingAddress: t,
        items: i
    }) => {
        const n = performance.now(),
            r = {
                items: i.map(l => ({
                    id: l.id,
                    value: l.value,
                    quantity: l.quantity
                }))
            };
        a != null && (r.shipping_option_id = a), t != null && (r.shipping_address = {
            name: t.name ? ? void 0,
            line_one: t.addressLine1 ? ? void 0,
            line_two: t.addressLine2,
            city: t.city,
            state: t.state,
            postal_code: t.postalCode,
            country: t.country,
            phone_number: t.phoneNumber ? ? void 0
        }), r.items = i.map(l => ({
            id: l.id,
            value: l.value,
            quantity: l.quantity
        }));
        const d = await x.safePatch("/shopping/checkout/{checkout_session_id}/update", {
            parameters: {
                path: {
                    checkout_session_id: s
                }
            },
            requestBody: r,
            authOption: u.SendIfAvailable
        });
        return L.addAction("shopping_checkout.update", {
            durationMs: performance.now() - n
        }), d
    },
    de = async (s, a, t, i, n) => await x.safePost("/shopping/checkout/{checkout_session_id}/complete", {
        parameters: {
            path: {
                checkout_session_id: s
            }
        },
        requestBody: {
            items: a.map(r => ({
                id: r.id,
                value: r.value,
                quantity: r.quantity
            })),
            payment_method: t,
            attempt_id: i,
            shipping_address: n
        },
        authOption: u.SendIfAvailable
    }),
    D = async () => (await x.safeGet("/shopping/orders", {
        authOption: u.SendIfAvailable
    })).orders,
    K = async s => await x.safeGet("/shopping/order/{order_id}", {
        parameters: {
            path: {
                order_id: s
            }
        },
        authOption: u.SendIfAvailable
    }),
    I = 1e3 * 5 * 60;

function ce() {
    const s = M(),
        a = Z(s.hash);
    return a ? e.jsx(V, {
        orderId: a
    }) : e.jsx(E, {
        title: e.jsx(g, {
            id: "xdSD9Q",
            defaultMessage: "Orders"
        }),
        children: e.jsx(Q, {})
    })
}
const C = () => e.jsxs("div", {
    className: "flex w-full gap-3 py-2",
    children: [e.jsx("div", {
        className: "bg-token-bg-tertiary h-20 w-20 rounded-xl"
    }), e.jsxs("div", {
        className: "flex flex-1 flex-col items-start justify-start gap-1",
        children: [e.jsx(k, {
            index: 0,
            width: 50,
            heightSize: "sm"
        }), e.jsx(k, {
            index: 0,
            width: 70,
            heightSize: "sm"
        })]
    })]
});

function Q() {
    const s = q(),
        a = O("3109853659"),
        {
            data: t,
            isLoading: i,
            isError: n,
            error: r
        } = S({
            queryKey: ["orders"],
            queryFn: D,
            staleTime: I,
            refetchOnMount: "always",
            refetchOnWindowFocus: "always"
        });
    return i ? e.jsx(C, {}) : n ? e.jsxs("div", {
        className: "flex min-h-[400px] w-full flex-col items-center justify-center py-6 text-sm",
        children: [e.jsx(B, {
            className: "icon-xl"
        }), e.jsx("div", {
            className: "text-base font-medium",
            children: e.jsx(g, {
                id: "/GqhEc",
                defaultMessage: "Error loading orders"
            })
        }), !1]
    }) : t && t ? .length ? e.jsx("div", {
        className: "flex flex-col",
        children: t ? .map((d, l) => e.jsxs(e.Fragment, {
            children: [e.jsx(X, {
                order: d,
                onClick: () => {
                    P(s, d.order.id)
                },
                showStackedImages: a
            }, d.order.id), l !== t.length - 1 && e.jsx("div", {
                className: "bg-token-border-light h-px"
            })]
        }))
    }) : e.jsxs("div", {
        className: "flex min-h-[400px] w-full flex-col items-center justify-center py-6 text-sm",
        children: [e.jsx($, {
            className: "icon-xl"
        }), e.jsx("div", {
            className: "text-base font-medium",
            children: e.jsx(g, {
                id: "2XILkl",
                defaultMessage: "No orders yet"
            })
        }), e.jsx("div", {
            className: "text-token-text-secondary text-xs",
            children: e.jsx(g, {
                id: "LwFNFv",
                defaultMessage: "Products you buy with ChatGPT will show here."
            })
        })]
    })
}
const X = ({
        order: s,
        onClick: a,
        showStackedImages: t
    }) => {
        const i = s.image_urls ? .filter(r => !!r) ? ? [],
            n = i.length > 0 ? i : s.image_url ? [s.image_url] : [];
        return e.jsxs("button", {
            className: "my-3",
            onClick: a,
            children: [e.jsxs("div", {
                className: "flex gap-3",
                children: [e.jsx("div", {
                    children: t ? e.jsx(H, {
                        imageUrls: n,
                        alt: s.title,
                        size: "sm",
                        frameClassName: "border-token-border-default bg-token-bg-primary shadow-xxs rounded-[10px] border border-[.5px]"
                    }) : e.jsx("img", {
                        className: "border-token-border-default bg-token-bg-primary shadow-xxs relative h-14 w-14 rounded-[10px] border border-[.5px]",
                        src: s.image_url ? ? n[0] ? ? "",
                        alt: s.title
                    })
                }), e.jsxs("div", {
                    className: "flex flex-1 flex-col items-start justify-start gap-0.5",
                    children: [e.jsx("div", {
                        className: "-mt-1 line-clamp-2 text-start text-base",
                        children: s.title
                    }), e.jsx("div", {
                        className: "text-token-text-secondary text-xs",
                        children: s.subtitle
                    })]
                }), e.jsx("div", {
                    className: "me-2 flex items-center justify-center",
                    children: e.jsx(W, {
                        className: "icon"
                    })
                })]
            }), s.error_message && e.jsx("div", {
                className: "bg-token-bg-status-error text-token-interactive-label-danger-secondary-default mt-3 flex items-center rounded-lg px-3 py-1 text-sm",
                children: s.error_message
            })]
        })
    },
    V = ({
        orderId: s
    }) => {
        const a = O("3109853659"),
            {
                data: t,
                isLoading: i
            } = S({
                queryKey: ["order", s],
                queryFn: () => K(s),
                staleTime: I,
                refetchOnMount: "always",
                refetchOnWindowFocus: "always"
            }),
            n = q(),
            r = t ? .items ? ? [],
            [d, l] = w.useState(!1),
            c = 3,
            p = d ? r : r.slice(0, c),
            f = Math.max(r.length - c, 0),
            y = !!(t ? .order.conversation_id || t ? .order.shared_conversation_url);
        return w.useEffect(() => {
            (t ? .order.conversation_id || t ? .order.shared_conversation_url) && s && b.logEventWithStatsig("product_order_history", "product_order_history", { ..._({
                    clientThreadId: t ? .order.conversation_id
                }),
                action: "shown",
                order_id: s,
                shared_conversation_url: t.order.shared_conversation_url
            })
        }, [t ? .order.conversation_id, t ? .order.shared_conversation_url, s]), e.jsxs("div", {
            children: [e.jsxs("div", {
                className: "h-header-height my-1 -ms-1 flex flex-shrink-0 items-center gap-2",
                children: [e.jsx(j, {
                    color: "ghost",
                    size: "medium",
                    onClick: () => P(n, void 0),
                    contentWrapperClassName: "gap-[6px]",
                    className: "w-9 rounded-lg",
                    children: e.jsx(T, {
                        className: "icon icon-sm"
                    })
                }), e.jsxs("div", {
                    className: "flex flex-col",
                    children: [e.jsxs("div", {
                        className: "flex items-center gap-1",
                        children: [e.jsx(R, {
                            className: "icon h-[18px] w-[18px] rounded-full",
                            url: t ? .merchant_logo_url ? ? "",
                            size: 128,
                            minSize: 16,
                            fallback: e.jsx(U, {
                                className: "text-token-text-tertiary"
                            })
                        }), e.jsx("div", {
                            className: "text-sm font-normal",
                            children: t ? .merchant_title
                        })]
                    }), e.jsx("div", {
                        className: "text-token-text-secondary text-xs",
                        children: t ? .merchant_subtitle
                    })]
                })]
            }), i ? e.jsx(C, {}) : t ? e.jsxs("div", {
                className: "flex flex-col pt-1 pb-4",
                children: [a ? e.jsxs(e.Fragment, {
                    children: [r.length > 0 && e.jsx("div", {
                        className: "mt-2",
                        children: e.jsxs("div", {
                            className: "flex flex-col gap-3",
                            children: [p.map((o, h) => e.jsxs("div", {
                                className: "border-token-border-light flex items-center gap-4 border-b pb-3 last:border-b-0 last:pb-0",
                                children: [e.jsx("div", {
                                    className: "border-token-border-light h-16 w-16 overflow-hidden rounded-xl border bg-white dark:bg-white",
                                    children: o.image_url ? e.jsx("img", {
                                        className: "h-full w-full object-cover",
                                        src: o.image_url,
                                        alt: o.title
                                    }) : null
                                }), e.jsxs("div", {
                                    className: "min-w-0 flex-1",
                                    children: [e.jsx("div", {
                                        className: "line-clamp-2 text-sm font-semibold",
                                        children: o.title
                                    }), e.jsx("div", {
                                        className: "text-token-text-secondary text-xs whitespace-pre-line",
                                        children: o.subtitle
                                    })]
                                })]
                            }, `${o.title}-${h}`)), !d && f > 0 && e.jsxs("button", {
                                className: "border-token-border-light flex items-center gap-4 border-b pb-3 text-start last:border-b-0 last:pb-0",
                                onClick: () => l(!0),
                                children: [e.jsx("div", {
                                    className: "border-token-border-light flex h-16 w-16 items-center justify-center rounded-xl border bg-white text-sm font-semibold text-black dark:bg-white",
                                    children: e.jsx(g, {
                                        id: "RVvcdn",
                                        defaultMessage: "+{count}",
                                        values: {
                                            count: f
                                        }
                                    })
                                }), e.jsx("div", {
                                    className: "text-sm font-medium",
                                    children: e.jsx(g, {
                                        id: "pqUyZA",
                                        defaultMessage: "{count, plural, one {# more item} other {# more items}}",
                                        values: {
                                            count: f
                                        }
                                    })
                                })]
                            })]
                        })
                    }), (y || t.external_buttons.length > 0) && e.jsxs("div", {
                        className: "mt-4 flex flex-wrap gap-2",
                        children: [y && e.jsx(j, {
                            as: "a",
                            to: t.order.shared_conversation_url || N(t.order.conversation_id),
                            onClick: o => {
                                o.stopPropagation(), b.logEventWithStatsig("product_order_history", "product_order_history", { ..._({
                                        clientThreadId: t ? .order.conversation_id
                                    }),
                                    action: "open_conversation_button_clicked",
                                    order_id: s,
                                    shared_conversation_url: t.order.shared_conversation_url
                                })
                            },
                            color: "ghost",
                            className: "border-token-border-light rounded-2xl border px-4",
                            children: e.jsx(g, {
                                id: "bLLnUh",
                                defaultMessage: "Open in ChatGPT"
                            })
                        }), t.external_buttons.map((o, h) => e.jsx(j, {
                            as: "a",
                            to: o.url,
                            openNewTab: !0,
                            onClick: v => {
                                v.stopPropagation(), b.logEventWithStatsig("product_order_history", "product_order_history", { ..._({
                                        clientThreadId: t ? .order.conversation_id
                                    }),
                                    action: "external_link_button_clicked",
                                    url: o.url,
                                    order_id: s
                                })
                            },
                            color: "ghost",
                            className: "border-token-border-light rounded-2xl border px-4",
                            children: o.title
                        }, `${o.title}-${h}`))]
                    })]
                }) : e.jsxs("div", {
                    className: "flex gap-4",
                    children: [e.jsx("div", {
                        className: "bg-token-bg-tertiary dark:bg-token-main-surface-primary-inverse overflow-clip rounded-lg",
                        children: e.jsx("img", {
                            className: "m-0 aspect-square h-32 w-32 object-cover mix-blend-darken",
                            src: t ? .image_url ? ? "",
                            alt: t ? .title ? ? ""
                        })
                    }), e.jsxs("div", {
                        className: "flex flex-1 flex-col gap-0.5",
                        children: [e.jsx("div", {
                            className: "text-normal line-clamp-2 text-[17px] font-medium",
                            children: t.title
                        }), e.jsx("div", {
                            className: "text-token-text-secondary text-sm",
                            children: t ? .subtitle
                        }), e.jsxs("div", {
                            className: "mt-2 flex w-full flex-1 items-end gap-2",
                            children: [(t.order.conversation_id ? ? t.order.shared_conversation_url) && e.jsx(j, {
                                as: "a",
                                to: t.order.shared_conversation_url || N(t.order.conversation_id),
                                onClick: o => {
                                    o.stopPropagation(), b.logEventWithStatsig("product_order_history", "product_order_history", { ..._({
                                            clientThreadId: t ? .order.conversation_id
                                        }),
                                        action: "open_conversation_button_clicked",
                                        order_id: s,
                                        shared_conversation_url: t.order.shared_conversation_url
                                    })
                                },
                                color: "ghost",
                                className: "border-token-border-light rounded-2xl border px-4",
                                children: e.jsx(g, {
                                    id: "bLLnUh",
                                    defaultMessage: "Open in ChatGPT"
                                })
                            }), t.external_buttons.map((o, h) => e.jsx(j, {
                                as: "a",
                                to: o.url,
                                openNewTab: !0,
                                onClick: v => {
                                    v.stopPropagation(), b.logEventWithStatsig("product_order_history", "product_order_history", { ..._({
                                            clientThreadId: t ? .order.conversation_id
                                        }),
                                        action: "external_link_button_clicked",
                                        url: o.url,
                                        order_id: s
                                    })
                                },
                                color: "ghost",
                                className: "border-token-border-light rounded-2xl border px-4",
                                children: o.title
                            }, `${o.title}-${h}`))]
                        })]
                    })]
                }), t.error_message && e.jsx("div", {
                    className: "bg-token-bg-status-error text-token-interactive-label-danger-secondary-default mt-4 flex items-center rounded-lg px-3 py-1 text-sm",
                    children: t.error_message
                }), e.jsx("div", {
                    className: "mt-8 flex flex-col gap-8",
                    children: t ? .sections ? .map(o => e.jsxs("div", {
                        className: "flex flex-col",
                        children: [e.jsx("div", {
                            className: "border-token-border-light border-b pb-2.5 text-base font-medium",
                            children: o.title
                        }), e.jsx("dl", {
                            className: "divide-token-border-light divide-y",
                            children: o.items.map(h => e.jsxs("div", {
                                className: "text-token-text-primary flex items-start gap-2 py-2.5 text-sm",
                                children: [e.jsx("dt", {
                                    className: "flex-grow text-sm",
                                    children: h.label
                                }), e.jsx("dd", {
                                    className: "text-end text-sm font-medium whitespace-pre",
                                    children: e.jsx(z, {
                                        remarkPlugins: [
                                            [G, {
                                                singleTilde: !1
                                            }]
                                        ],
                                        components: {
                                            a: v => e.jsx("a", { ...v,
                                                className: m(v.className, "underline"),
                                                target: "_blank",
                                                children: v.children
                                            })
                                        },
                                        children: h.value
                                    })
                                })]
                            }, h.label))
                        })]
                    }, o.title))
                })]
            }) : null]
        })
    },
    P = (s, a) => {
        const t = window.location.hash,
            [i, n] = t.split("?"),
            r = new URLSearchParams(n);
        a ? r.set("order", a) : r.delete("order");
        const d = `#settings/${F.Orders}${r.toString()?`?${r.toString()}`:""}`;
        s(d, {
            replace: !0
        })
    },
    Z = s => {
        const [a, t] = s.split("?");
        return new URLSearchParams(t).get("order")
    };
export {
    ce as O, ne as a, ae as b, de as c, re as g, oe as l, ie as r, P as s, le as u
};
//# sourceMappingURL=2478e8be-fu39n45z77ccw3bg.js.map