import {
    r as j,
    u as y,
    j as e,
    o as p,
    y as P
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    z as S,
    a0 as A,
    J as B,
    aw as I,
    cv as R,
    pJ as d,
    fc as b,
    ga as U,
    af as E,
    cf as D
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    A as L
} from "./c7cf66a1-lxlkkugldrmvojpt.js";
import {
    A as O
} from "./a7c981c9-cfqk1lewr9pd0yee.js";
import {
    bK as z,
    bM as K
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function $({
    accountId: n,
    connectionId: a,
    isOpen: t,
    objectType: s,
    onClose: o
}) {
    const [l, i] = j.useState(null), [f, x] = j.useState([]), [r, u] = j.useState(!1), [M, g] = j.useState(!1), c = S(), m = y(), h = c ? .isPersonalAccount() ? ? !1, w = async v => {
        u(!0), g(!1);
        try {
            const N = h ? await d.user_connection_list_item_scopes(a, s, v) : await d.admin_connection_list_item_scopes(n, a, s, v);
            i(N.page_token ? ? null), x(F => [...F, ...N.object_selections.map(C => C.object_handle)])
        } catch {
            g(!0)
        } finally {
            u(!1)
        }
    }, k = () => {
        i(null), u(!1), x([]), g(!1), w(null)
    }, _ = j.useRef(!1);
    return j.useEffect(() => {
        _.current || (_.current = !0, k())
    }, []), e.jsx(A, {
        testId: "modal-connection-blocked-items",
        isOpen: t,
        onClose: o,
        type: "success",
        size: "custom",
        className: "max-w-xl",
        showCloseButton: !0,
        title: m.formatMessage({
            id: "BVUVRc",
            defaultMessage: "Block items"
        }),
        children: e.jsxs("div", {
            className: "flex flex-col gap-4",
            children: [e.jsx("p", {
                className: "text-token-text-secondary text-sm",
                children: e.jsx(p, {
                    id: "LYXIh1",
                    defaultMessage: "Found something that shouldn't be synced? You can block items here to prevent them from being synced or shown in search results."
                })
            }), e.jsx(J, {
                accountId: n,
                connectionId: a,
                objectType: s,
                onItemBlocked: k
            }), e.jsx(X, {
                accountId: n,
                connectionId: a,
                hasError: M,
                hasMoreItems: l != null,
                isLoading: r,
                loadMoreItems: () => w(l),
                objectHandles: f,
                objectType: s,
                onItemUnblocked: k
            })]
        })
    })
}

function X({
    connectionId: n,
    accountId: a,
    objectHandles: t,
    isLoading: s,
    hasError: o,
    hasMoreItems: l,
    loadMoreItems: i,
    onItemUnblocked: f,
    objectType: x
}) {
    return e.jsxs("div", {
        children: [e.jsx("h3", {
            className: "mb-2 font-medium",
            children: e.jsx(p, {
                id: "gimLZo",
                defaultMessage: "Currently blocked items"
            })
        }), o ? e.jsxs("div", {
            className: "flex flex-col items-center justify-center gap-2",
            children: [e.jsx("div", {
                className: "text-token-text-error",
                children: e.jsx(p, {
                    id: "3BZzpX",
                    defaultMessage: "Something went wrong"
                })
            }), e.jsx("div", {
                children: e.jsx(I, {
                    color: "secondary",
                    icon: O,
                    onClick: i,
                    children: e.jsx(p, {
                        id: "fFd9RR",
                        defaultMessage: "Try again"
                    })
                })
            })]
        }) : e.jsxs(e.Fragment, {
            children: [t.length > 0 || s ? e.jsx("ul", {
                className: "flex flex-col gap-1",
                children: t.map(r => e.jsx(V, {
                    connectionId: n,
                    accountId: a,
                    objectType: x,
                    objectHandle: r,
                    onItemUnblocked: f
                }, r))
            }) : e.jsx("p", {
                className: "text-token-text-secondary text-sm",
                children: e.jsx(p, {
                    id: "IGg+fh",
                    defaultMessage: "No items are currently being blocked."
                })
            }), s ? e.jsx(R, {
                lines: 1
            }) : l && e.jsx(I, {
                color: "ghost",
                icon: L,
                onClick: i,
                children: e.jsx(p, {
                    id: "g+Tw+y",
                    defaultMessage: "See more"
                })
            })]
        })]
    })
}

function V({
    connectionId: n,
    accountId: a,
    objectHandle: t,
    onItemUnblocked: s,
    objectType: o
}) {
    const l = B(),
        i = y();
    return e.jsx(q, {
        scopeChangeIcon: K,
        scopeChangeLabel: i.formatMessage({
            id: "yaj/om",
            defaultMessage: "Unblock item"
        }),
        scopeChangeTarget: "include",
        objectHandle: t,
        objectType: o,
        onError: () => {
            l.danger(i.formatMessage({
                id: "yRm6yX",
                defaultMessage: "Failed to unblock item. Please try again later."
            }), {
                loggingTitle: "Failed to unblock item. Please try again later.",
                toastId: "blocked_items_modal",
                loggingDescription: "Failed to unblock item"
            })
        },
        onScopeUpdated: () => {
            l.success(i.formatMessage({
                id: "Xot/uQ",
                defaultMessage: "Item successfully unblocked."
            })), s()
        },
        connectionId: n,
        accountId: a
    })
}

function q({
    connectionId: n,
    accountId: a,
    objectType: t,
    objectHandle: s,
    scopeChangeTarget: o,
    scopeChangeLabel: l,
    scopeChangeIcon: i,
    onScopeUpdated: f,
    onError: x,
    onScopeChangeRequested: r,
    disabled: u
}) {
    const g = S() ? .isPersonalAccount() ? ? !1,
        [c, m] = j.useState(!1),
        {
            isPending: h,
            mutate: w
        } = P({
            mutationFn: async () => o === "exclude" ? g ? await d.user_connection_block_items(n, t, [s]) : await d.admin_connection_block_items(a, n, t, [s]) : g ? await d.user_connection_unblock_items(n, t, [s]) : await d.admin_connection_unblock_items(a, n, t, [s]),
            mutationKey: ["admin_connection_update_item_scope", n, t, o, s],
            onSuccess: () => {
                f(), m(!1)
            },
            onError: () => {
                m(!1), x()
            }
        });
    return e.jsxs("li", {
        className: "group hover:bg-token-surface-hover flex w-full flex-row rounded-xl px-4 py-1 text-sm",
        children: [e.jsx("span", {
            className: "flex-1",
            children: s
        }), e.jsxs(b.Root, {
            open: !u && (c || h),
            onOpenChange: k => {
                u || m(k)
            },
            children: [e.jsx(b.Trigger, {
                className: E("h-6 flex-0 group-hover:visible", !c && "invisible"),
                children: e.jsx(U, {
                    className: "icon-sm"
                })
            }), e.jsx(b.Portal, {
                children: e.jsx(b.Content, {
                    size: "small",
                    children: e.jsx(b.Item, {
                        icon: h ? D : i,
                        onSelect: () => {
                            if (!u) {
                                if (r) {
                                    r({
                                        objectHandle: s,
                                        targetScopeSelection: o
                                    }), m(!1);
                                    return
                                }
                                w()
                            }
                        },
                        disabled: !!u || h,
                        children: l
                    })
                })
            })]
        })]
    })
}

function J({
    accountId: n,
    connectionId: a,
    objectType: t,
    onItemBlocked: s
}) {
    const o = B(),
        l = y();
    return e.jsxs("div", {
        className: "flex flex-col gap-2",
        children: [e.jsx("h3", {
            className: "font-medium",
            children: e.jsx(p, {
                id: "dU+IPT",
                defaultMessage: "Block an item"
            })
        }), e.jsx("p", {
            className: "text-token-text-secondary text-sm",
            children: e.jsx(p, {
                id: "y6yn/t",
                defaultMessage: "Enter the ID or URL of the item you want to block."
            })
        }), e.jsx(Q, {
            accountId: n,
            connectionId: a,
            objectType: t,
            onSuccess: () => {
                o.success(l.formatMessage({
                    id: "Q+KnAh",
                    defaultMessage: "Item successfully blocked."
                })), s()
            },
            onError: () => {
                o.danger(l.formatMessage({
                    id: "UH92LU",
                    defaultMessage: "Failed to block item. Please try again later."
                }), {
                    toastId: "blocked_items_modal",
                    loggingTitle: "Failed to block item. Please try again later.",
                    loggingDescription: "Toast message shown when an item (e.g. file, channel, document, etc.) that the admin requested to block from syncing was unable to be blocked."
                })
            },
            targetScopeSelection: "exclude",
            buttonLabel: e.jsx(p, {
                id: "5FIVI9",
                defaultMessage: "Block"
            })
        })]
    })
}

function Q({
    accountId: n,
    buttonLabel: a,
    connectionId: t,
    objectType: s,
    onError: o,
    onSuccess: l,
    placeholder: i,
    targetScopeSelection: f,
    onSubmitDraft: x,
    disabled: r
}) {
    const u = S(),
        M = y(),
        g = u ? .isPersonalAccount() ? ? !1,
        [c, m] = j.useState(""),
        {
            isPending: h,
            mutate: w
        } = P({
            mutationFn: async () => {
                if (c.trim()) return f === "exclude" ? g ? await d.user_connection_block_items(t, s, [c]) : await d.admin_connection_block_items(n, t, s, [c]) : g ? await d.user_connection_unblock_items(t, s, [c]) : await d.admin_connection_unblock_items(n, t, s, [c])
            },
            mutationKey: ["admin_connection_update_item_scope", t, s, f, c],
            onSuccess: () => {
                l(), m("")
            },
            onError: o
        }),
        k = () => {
            const _ = c.trim();
            if (_ && !r) {
                if (x) {
                    x({
                        objectHandle: _,
                        targetScopeSelection: f
                    }), m("");
                    return
                }
                w()
            }
        };
    return e.jsx("form", {
        onSubmit: _ => {
            _.preventDefault(), k()
        },
        children: e.jsxs("div", {
            className: "flex w-full flex-row gap-2",
            children: [e.jsx(z, {
                type: "text",
                className: "flex-1",
                name: "objectHandle",
                ariaLabel: "object handle",
                value: c,
                onChange: _ => m(_.target.value),
                placeholder: i ? ? M.formatMessage({
                    id: "sPUyj/",
                    defaultMessage: "ID or URL"
                }),
                disabled: h || r
            }), e.jsx(I, {
                color: "primary",
                type: "button",
                onClick: k,
                loading: h,
                disabled: h || !!r || !c.trim(),
                className: "flex-0",
                children: a
            })]
        })
    })
}
export {
    $ as C, q as I, Q as U
};
//# sourceMappingURL=bab22af5-eqmjf43rk6krbg5k.js.map