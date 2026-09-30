import {
    u as P,
    x as F,
    r as y,
    s as D,
    z as S,
    j as e,
    o as m,
    y as q,
    d as A
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    I as B,
    _ as j,
    a0 as Q,
    aw as z,
    aV as U,
    J as K,
    fk as L,
    fc as g,
    R as O
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    dd as W,
    de as H,
    df as _,
    dg as E,
    d0 as J,
    dh as V,
    di as Z,
    dj as X,
    bN as Y,
    bB as $
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    T as h
} from "./16d1c905-kzb9nx2txdax2vhp.js";
import {
    M as ee,
    t as se
} from "./4b303e9e-iimph5klvq8yx43j.js";
import {
    R as te
} from "./7bce51e5-cmbyyrv67x3n5nrc.js";

function ae({
    gizmo: o,
    memory: i
}) {
    const r = P(),
        l = K(),
        n = F(),
        {
            mutate: s,
            isPending: p
        } = q({
            mutationFn: async d => {
                await V({
                    memoryId: d,
                    gizmoId: o ? .id
                })
            },
            onSettled: () => {
                n.invalidateQueries({
                    queryKey: _(o ? .id)
                }), n.invalidateQueries({
                    queryKey: E()
                })
            },
            onError: () => {
                l.danger(A({
                    id: "MemoriesModal.deleteFailed",
                    defaultMessage: "Failed to forget memory"
                }), {
                    id: "memoryDeleteFailed",
                    toastId: "memory_delete_failed"
                })
            }
        }),
        [M, c] = y.useState(!1),
        t = r.formatMessage({
            id: "N0czuB",
            defaultMessage: "Remove"
        });
    return e.jsxs(e.Fragment, {
        children: [e.jsxs(h.Row, {
            disabled: p,
            children: [e.jsx(h.Cell, {
                children: e.jsx("div", {
                    className: "py-2 whitespace-pre-wrap",
                    children: i.content
                })
            }), e.jsx(h.Cell, {
                textAlign: "right",
                children: e.jsx(h.Actions, {
                    children: e.jsx("button", {
                        onClick: () => {
                            j.logEvent("Memory Manage Modal Memory Delete Clicked"), c(!0)
                        },
                        "aria-label": t,
                        className: "text-token-text-tertiary hover:text-token-text-secondary",
                        children: e.jsx(L, {
                            className: "leading-none",
                            label: t,
                            side: "top",
                            children: e.jsx(Z, {
                                className: "icon-sm"
                            })
                        })
                    })
                })
            })]
        }), M && e.jsx(X, {
            isOpen: !0,
            primaryButtonColor: "danger",
            title: t,
            confirmText: r.formatMessage({
                id: "fCn0ar",
                defaultMessage: "Forget"
            }),
            onConfirm: () => {
                j.logEvent("Memory Manage Modal Memory Delete Confirmed"), s(i.id), c(!1)
            },
            onClose: () => {
                c(!1)
            },
            children: e.jsx(m, {
                id: "j2cZHW",
                defaultMessage: 'Remove "{title}" from {name}’s saved memories. This can’t be undone. <link>Learn more</link>',
                values: {
                    name: o ? .name ? ? "ChatGPT",
                    title: e.jsx("strong", {
                        children: se(i.content, {
                            length: 130,
                            omission: "..."
                        })
                    }),
                    link: d => e.jsx("a", {
                        href: "https://help.openai.com/en/articles/8590148-memory-faq",
                        target: "_blank",
                        className: "underline",
                        rel: "noreferrer",
                        children: d
                    })
                }
            })
        })]
    })
}

function re({
    selectedGizmoId: o,
    onSelect: i,
    items: r
}) {
    const l = r.find(s => s.id === o);

    function n(s) {
        return e.jsx($, {
            isFirstParty: s.id === void 0,
            src: s.iconUrl ? ? null,
            className: "icon"
        })
    }
    return e.jsx("div", {
        className: "border-token-border-medium mb-2 inline-flex rounded-md border",
        children: e.jsxs(g.Root, {
            children: [e.jsx(g.Trigger, {
                children: e.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [l ? e.jsxs(e.Fragment, {
                        children: [n(l), e.jsx("span", {
                            className: "text-token-text-primary",
                            children: l.name
                        })]
                    }) : e.jsx(m, {
                        id: "MemoriesModal.unknownGizmo",
                        defaultMessage: "Unknown GPT"
                    }), e.jsx(Y, {
                        className: "icon-sm text-token-text-tertiary"
                    })]
                })
            }), e.jsx(g.Portal, {
                children: e.jsx(g.Content, {
                    children: r.map(s => e.jsxs(g.Item, {
                        className: "flex items-center gap-3",
                        onClick: () => {
                            i(s.id)
                        },
                        children: [n(s), s.name]
                    }, s.id))
                })
            })]
        })
    })
}
const C = U.div `flex h-full items-center justify-center pb-8 text-sm text-token-text-tertiary rounded-lg border border-token-border-default`;

function ue({
    onClose: o,
    initialGizmoId: i,
    exclusiveToGizmo: r = !1,
    showResetMemoriesButton: l = !0,
    contextScopes: n,
    requiredContextScopes: s
}) {
    const p = P(),
        M = F(),
        c = W(),
        [t, d] = y.useState(i),
        T = D(),
        N = B() ? .hasPlusFeatures();
    y.useEffect(() => {
        j.logEvent("Memory Modal Shown")
    }, []);
    const {
        data: k,
        isLoading: v,
        isError: b,
        refetch: I
    } = H({
        gizmoId: t,
        exclusiveToGizmo: r,
        enabled: c,
        contextScopes: n,
        requiredContextScopes: s
    }), u = k ? .memories, {
        data: R,
        refetch: G
    } = S({
        queryKey: ["memory_gizmos"],
        queryFn: () => O.safeGet("/memories/gizmos", {}),
        refetchOnMount: "always"
    }), w = [{
        id: void 0,
        name: "ChatGPT",
        iconUrl: null
    }, ...R ? .items.map(({
        gizmo: a
    }) => ({
        id: a.id,
        name: a.display.name,
        iconUrl: a.display.profile_picture_url ? ? null
    })) ? ? []], f = w.find(a => a.id === t);
    y.useEffect(() => {
        !r && !v && !b && t !== void 0 && (!u || u.length === 0) && d(void 0)
    }, [r, v, b, u, t]);
    let x;
    return v ? x = e.jsx(C, {
        children: e.jsx(m, {
            id: "MemoriesModal.loading",
            defaultMessage: "Loading..."
        })
    }) : b ? x = e.jsx(C, {
        children: e.jsxs("div", {
            className: "max-w-sm text-center",
            children: [e.jsx("div", {
                className: "mb-4 text-red-500",
                children: e.jsx(m, {
                    id: "MemoriesModal.somethingWentWrong",
                    defaultMessage: "Something went wrong..."
                })
            }), e.jsx("div", {
                children: e.jsx(z, {
                    color: "secondary",
                    onClick: () => {
                        I()
                    },
                    children: e.jsx(m, {
                        id: "MemoriesModal.retry",
                        defaultMessage: "Retry"
                    })
                })
            })]
        })
    }) : !u || u.length === 0 ? x = e.jsx(C, {
        children: e.jsx("div", {
            className: "max-w-sm text-center",
            children: c ? e.jsx(m, {
                id: "MemoriesModal.noMemories.1",
                defaultMessage: "As you chat with {name}, the details and preferences it saves will be shown here.",
                values: {
                    name: f ? .name ? ? "ChatGPT"
                }
            }) : e.jsx(m, {
                id: "MemoriesModal.noMemoriesAndDisabled",
                defaultMessage: "Memory is disabled. ChatGPT won't use or save memories."
            })
        })
    }) : x = e.jsx(h.Root, {
        className: "border-token-border-default h-full",
        size: "compact",
        bordered: !0,
        children: e.jsx(h.Body, {
            children: u.map(a => e.jsx(ae, {
                gizmo: f ? {
                    id: f.id,
                    name: f.name
                } : void 0,
                memory: a
            }, a.id))
        })
    }), e.jsxs(Q, {
        testId: "modal-memories",
        isOpen: !0,
        onClose: o,
        size: "custom",
        className: "max-w-5xl",
        type: "success",
        title: p.formatMessage({
            id: "MemoriesModal.title",
            defaultMessage: "Saved memories"
        }),
        showCloseButton: !0,
        children: [N && w.length > 1 && e.jsx("div", {
            className: "mb-4",
            children: e.jsx(re, {
                selectedGizmoId: t,
                items: w,
                onSelect: a => {
                    M.invalidateQueries({
                        queryKey: _(a)
                    }), M.invalidateQueries({
                        queryKey: E()
                    }), d(a)
                }
            })
        }), e.jsx(ee, {
            memoryFullPct: k ? .memoryFullPct,
            isPaid: N,
            showUpgradeCTA: !1,
            onUpgrade: () => {
                j.logEventWithStatsig("Memories Upgrade Button Clicked", "chatgpt_memories_upgrade_button_clicked_settings"), J(T, "chatgpt_memories_upgrade_button")
            },
            className: "mb-5"
        }), e.jsx("div", {
            className: "h-[24rem]",
            children: x
        }), l && e.jsx("div", {
            className: "mt-5 flex justify-end",
            children: e.jsx(te, {
                onReset: () => {
                    I(), G(), t && d(void 0)
                },
                gizmoId: t,
                memoryName: f ? .name ? ? "ChatGPT",
                contextScopes: n,
                requiredContextScopes: s
            })
        })]
    })
}
export {
    ue as
    default
};
//# sourceMappingURL=df4a2937-mpi82nqqb645ej0m.js.map