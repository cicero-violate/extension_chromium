import {
    u as G,
    x as D,
    r as h,
    s as Q,
    z as K,
    j as e,
    o as u,
    y as S
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    aV as z,
    I as B,
    _ as b,
    a0 as A,
    aw as T,
    J as U,
    R as q,
    fk as R,
    fc as k
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    dd as L,
    de as O,
    df as _,
    dg as P,
    d0 as W,
    dh as H,
    bH as V,
    di as J,
    dj as Z,
    bN as X,
    bB as Y
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    T as p
} from "./16d1c905-kzb9nx2txdax2vhp.js";
import {
    M as $,
    t as ee
} from "./4b303e9e-iimph5klvq8yx43j.js";
import {
    R as se
} from "./7bce51e5-cmbyyrv67x3n5nrc.js";

function te({
    gizmo: i,
    memory: r
}) {
    const m = G(),
        c = U(),
        o = D(),
        [t, g] = h.useState(!1),
        [n, x] = h.useState(r.content),
        C = h.useRef(null);
    h.useEffect(() => {
        if (t && C.current) {
            const s = C.current,
                y = s.value.length;
            s.focus(), s.setSelectionRange(y, y)
        }
    }, [t]);
    const {
        mutate: I,
        isPending: E
    } = S({
        mutationFn: async s => {
            await H({
                memoryId: s,
                gizmoId: i ? .id
            })
        },
        onSettled: () => {
            o.invalidateQueries({
                queryKey: _(i ? .id)
            }), o.invalidateQueries({
                queryKey: P()
            })
        },
        onError: () => {
            c.danger({
                id: "MemoriesModal.deleteFailed",
                defaultMessage: "Failed to forget memory",
                description: "Toast message when deleting memory fails"
            }, {
                id: "memoryDeleteFailed",
                toastId: "memory_delete_failed"
            })
        }
    }), {
        mutate: w,
        isPending: j
    } = S({
        mutationFn: async () => await q.safePatch("/memories/{memory_id}", {
            parameters: {
                path: {
                    memory_id: r.id
                }
            },
            requestBody: {
                gizmo_id: i ? .id,
                content: n
            }
        }),
        onSuccess: s => {
            const {
                memory_max_tokens: y,
                memory_num_tokens: v
            } = s;
            o.setQueryData(_(i ? .id), d => {
                if (!d || typeof d != "object") return d;
                const M = d,
                    a = Math.min(Math.floor(100 * v / y), 100);
                return { ...M,
                    memory_max_tokens: y,
                    memory_num_tokens: v,
                    memoryFullPct: a
                }
            }), o.invalidateQueries({
                queryKey: _(i ? .id)
            }), o.invalidateQueries({
                queryKey: P()
            }), g(!1)
        },
        onError: () => {
            c.danger({
                id: "MemoriesModal.editFailed",
                defaultMessage: "Failed to update memory",
                description: "Toast message when editing memory fails"
            }, {
                id: "memoryEditFailed",
                toastId: "memory_edit_failed"
            })
        }
    }), [N, f] = h.useState(!1), l = m.formatMessage({
        id: "N0czuB",
        defaultMessage: "Remove"
    });
    return e.jsxs(e.Fragment, {
        children: [e.jsx(p.Row, {
            disabled: E || j,
            children: t ? e.jsxs(p.Cell, {
                colSpan: 2,
                className: "relative pe-0",
                children: [e.jsx("input", {
                    ref: C,
                    autoFocus: !0,
                    value: n,
                    onChange: s => x(s.target.value),
                    className: "w-full rounded border-2 border-transparent py-2 pe-36 focus:outline-none",
                    maxLength: 500,
                    onKeyDown: s => {
                        if (!s.nativeEvent.isComposing && s.key === "Enter") {
                            if (n.trim() === "") {
                                b.logEvent("Memory Manage Modal Memory Delete Clicked"), f(!0);
                                return
                            }
                            w()
                        }
                    }
                }), e.jsxs("div", {
                    className: "absolute end-1 top-1/2 flex -translate-y-1/2 gap-1",
                    children: [e.jsx(T, {
                        color: "secondary",
                        size: "small",
                        onClick: () => {
                            x(r.content), g(!1)
                        },
                        children: e.jsx(u, {
                            id: "TTo8Tw",
                            defaultMessage: "Cancel"
                        })
                    }), e.jsx(T, {
                        size: "small",
                        onClick: () => {
                            if (n.trim() === "") {
                                b.logEvent("Memory Manage Modal Memory Delete Clicked"), f(!0);
                                return
                            }
                            w()
                        },
                        disabled: j,
                        children: e.jsx(u, {
                            id: "mDcKbU",
                            defaultMessage: "Save"
                        })
                    })]
                })]
            }) : e.jsxs(e.Fragment, {
                children: [e.jsx(p.Cell, {
                    className: "pe-0",
                    divClassName: "min-h-[40px] items-center w-full",
                    children: e.jsx("div", {
                        className: "border-2 border-transparent py-2 whitespace-pre-wrap",
                        children: r.content
                    })
                }), e.jsx(p.Cell, {
                    textAlign: "right",
                    children: e.jsxs(p.Actions, {
                        children: [(() => {
                            const s = m.formatMessage({
                                id: "EditableMemoriesModal.edit",
                                defaultMessage: "Edit"
                            });
                            return e.jsx("button", {
                                onClick: () => g(!0),
                                "aria-label": s,
                                className: "text-token-text-tertiary hover:text-token-text-secondary",
                                children: e.jsx(R, {
                                    label: s,
                                    side: "top",
                                    className: "leading-none",
                                    children: e.jsx(V, {
                                        className: "icon-sm"
                                    })
                                })
                            })
                        })(), e.jsx("button", {
                            onClick: () => {
                                b.logEvent("Memory Manage Modal Memory Delete Clicked"), f(!0)
                            },
                            "aria-label": l,
                            className: "text-token-text-tertiary hover:text-token-text-secondary",
                            children: e.jsx(R, {
                                className: "leading-none",
                                label: l,
                                side: "top",
                                children: e.jsx(J, {
                                    className: "icon-sm"
                                })
                            })
                        })]
                    })
                })]
            })
        }), N && e.jsx(Z, {
            isOpen: !0,
            primaryButtonColor: "danger",
            title: l,
            confirmText: m.formatMessage({
                id: "fCn0ar",
                defaultMessage: "Forget"
            }),
            onConfirm: () => {
                b.logEvent("Memory Manage Modal Memory Delete Confirmed"), I(r.id), f(!1)
            },
            onClose: () => {
                f(!1), x(r.content), g(!1)
            },
            children: e.jsx(u, {
                id: "j2cZHW",
                defaultMessage: 'Remove "{title}" from {name}’s saved memories. This can’t be undone. <link>Learn more</link>',
                values: {
                    name: i ? .name ? ? "ChatGPT",
                    title: e.jsx("strong", {
                        children: ee(r.content, {
                            length: 130,
                            omission: "..."
                        })
                    }),
                    link: s => e.jsx("a", {
                        href: "https://help.openai.com/en/articles/8590148-memory-faq",
                        target: "_blank",
                        className: "underline",
                        rel: "noreferrer",
                        children: s
                    })
                }
            })
        })]
    })
}

function ae({
    selectedGizmoId: i,
    onSelect: r,
    items: m
}) {
    const c = m.find(t => t.id === i);

    function o(t) {
        return e.jsx(Y, {
            isFirstParty: t.id === void 0,
            src: t.iconUrl ? ? null,
            className: "icon"
        })
    }
    return e.jsx("div", {
        className: "border-token-border-medium mb-2 inline-flex rounded-md border",
        children: e.jsxs(k.Root, {
            children: [e.jsx(k.Trigger, {
                children: e.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [c ? e.jsxs(e.Fragment, {
                        children: [o(c), e.jsx("span", {
                            className: "text-token-text-primary",
                            children: c.name
                        })]
                    }) : e.jsx(u, {
                        id: "MemoriesModal.unknownGizmo",
                        defaultMessage: "Unknown GPT"
                    }), e.jsx(X, {
                        className: "icon-sm text-token-text-tertiary"
                    })]
                })
            }), e.jsx(k.Portal, {
                children: e.jsx(k.Content, {
                    children: m.map(t => e.jsxs(k.Item, {
                        className: "flex items-center gap-3",
                        onClick: () => {
                            r(t.id)
                        },
                        children: [o(t), t.name]
                    }, t.id))
                })
            })]
        })
    })
}
const F = z.div `flex h-full items-center justify-center pb-8 text-sm text-token-text-tertiary rounded-lg border border-token-border-default`;

function me({
    onClose: i,
    initialGizmoId: r,
    contextScopes: m,
    requiredContextScopes: c
}) {
    const o = G(),
        t = D(),
        g = L(),
        [n, x] = h.useState(r),
        C = Q(),
        E = B() ? .hasPlusFeatures();
    h.useEffect(() => {
        b.logEvent("Memory Modal Shown")
    }, []);
    const {
        data: w,
        isLoading: j,
        isError: N,
        refetch: f
    } = O({
        gizmoId: n,
        enabled: g,
        contextScopes: m,
        requiredContextScopes: c
    }), l = w ? .memories, {
        data: s,
        refetch: y
    } = K({
        queryKey: ["memory_gizmos"],
        queryFn: () => q.safeGet("/memories/gizmos", {}),
        refetchOnMount: "always"
    }), v = [{
        id: void 0,
        name: "ChatGPT",
        iconUrl: null
    }, ...s ? .items.map(({
        gizmo: a
    }) => ({
        id: a.id,
        name: a.display.name,
        iconUrl: a.display.profile_picture_url ? ? null
    })) ? ? []], d = v.find(a => a.id === n);
    h.useEffect(() => {
        !j && !N && n !== void 0 && (!l || l.length === 0) && x(void 0)
    }, [j, N, l, n]);
    let M;
    return j ? M = e.jsx(F, {
        children: e.jsx(u, {
            id: "MemoriesModal.loading",
            defaultMessage: "Loading..."
        })
    }) : N ? M = e.jsx(F, {
        children: e.jsxs("div", {
            className: "max-w-sm text-center",
            children: [e.jsx("div", {
                className: "mb-4 text-red-500",
                children: e.jsx(u, {
                    id: "MemoriesModal.somethingWentWrong",
                    defaultMessage: "Something went wrong..."
                })
            }), e.jsx("div", {
                children: e.jsx(T, {
                    color: "secondary",
                    onClick: () => {
                        f()
                    },
                    children: e.jsx(u, {
                        id: "MemoriesModal.retry",
                        defaultMessage: "Retry"
                    })
                })
            })]
        })
    }) : !l || l.length === 0 ? M = e.jsx(F, {
        children: e.jsx("div", {
            className: "max-w-sm text-center",
            children: g ? e.jsx(u, {
                id: "MemoriesModal.noMemories.1",
                defaultMessage: "As you chat with {name}, the details and preferences it saves will be shown here.",
                values: {
                    name: d ? .name ? ? "ChatGPT"
                }
            }) : e.jsx(u, {
                id: "MemoriesModal.noMemoriesAndDisabled",
                defaultMessage: "Memory is disabled. ChatGPT won't use or save memories."
            })
        })
    }) : M = e.jsx(p.Root, {
        className: "border-token-border-default h-full",
        size: "compact",
        bordered: !0,
        children: e.jsx(p.Body, {
            children: l.map(a => e.jsx(te, {
                gizmo: d ? {
                    id: d.id,
                    name: d.name
                } : void 0,
                memory: a
            }, a.id))
        })
    }), e.jsxs(A, {
        testId: "modal-memories",
        isOpen: !0,
        onClose: i,
        size: "custom",
        className: "max-w-5xl",
        type: "success",
        title: o.formatMessage({
            id: "MemoriesModal.title",
            defaultMessage: "Saved memories"
        }),
        showCloseButton: !0,
        children: [E && v.length > 1 && e.jsx("div", {
            className: "mb-4",
            children: e.jsx(ae, {
                selectedGizmoId: n,
                items: v,
                onSelect: a => {
                    t.invalidateQueries({
                        queryKey: _(a)
                    }), t.invalidateQueries({
                        queryKey: P()
                    }), x(a)
                }
            })
        }), e.jsx($, {
            memoryFullPct: w ? .memoryFullPct,
            className: "mb-5",
            showUpgradeCTA: !1,
            isPaid: E,
            onUpgrade: () => {
                b.logEventWithStatsig("Memories Upgrade Button Clicked", "chatgpt_memories_upgrade_button_clicked_settings"), W(C, "chatgpt_memories_upgrade_button")
            }
        }), e.jsx("div", {
            className: "h-[24rem]",
            children: M
        }), e.jsx("div", {
            className: "mt-5 flex justify-end",
            children: e.jsx(se, {
                onReset: () => {
                    f(), y(), n && x(void 0)
                },
                gizmoId: n,
                memoryName: d ? .name ? ? "ChatGPT",
                contextScopes: m,
                requiredContextScopes: c
            })
        })]
    })
}
export {
    me as E
};
//# sourceMappingURL=25de328f-ebweaz4po5j1x1mo.js.map