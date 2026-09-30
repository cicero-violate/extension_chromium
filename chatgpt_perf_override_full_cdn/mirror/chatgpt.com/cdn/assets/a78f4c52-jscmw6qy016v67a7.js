import {
    u as ne,
    x as Se,
    y as je,
    r,
    j as e,
    o as c,
    h as le,
    s as Be,
    z as Ve
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    J as De,
    R as te,
    xq as ie,
    e as qe,
    jL as We,
    nV as Qe,
    Y as Ye,
    CI as $e,
    af as Z,
    fc as n,
    ga as pe,
    _ as ee,
    hP as ae,
    a_ as He,
    I as Te,
    aw as ge,
    a0 as Ae,
    b2 as Ke,
    q as we,
    c3 as Xe,
    gu as Je,
    gD as ke,
    aV as Ze
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    u7 as et,
    df as Ce,
    dg as Ne,
    dh as tt,
    di as Oe,
    dj as se,
    oU as st,
    ea as Re,
    u8 as ot,
    dd as rt,
    dk as at,
    eb as it,
    de as nt,
    u9 as lt,
    d0 as dt,
    bD as ct,
    c_ as mt,
    cB as ut
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    R as ft
} from "./e8fe533b-dqowgzb88uo0tkty.js";
import {
    S as ht
} from "./64696494-pcb5zbgdswo1x3cx.js";
import {
    T as xe
} from "./16d1c905-kzb9nx2txdax2vhp.js";
import {
    A as gt
} from "./bc4efe0c-ef367v6adi8m1l4b.js";
import {
    t as xt,
    a as pt
} from "./4b303e9e-iimph5klvq8yx43j.js";
import {
    f as yt
} from "./bd382fd5-bcke632cms89jbha.js";
const Mt = "https://help.openai.com/en/articles/8590148-memory-faq";

function Ge({
    memory: o,
    gizmo: f,
    className: l,
    readOnly: y,
    showDivider: j,
    inlineComponent: V
}) {
    const m = ne(),
        D = De(),
        h = Se(),
        H = et(),
        {
            mutate: M,
            isPending: T
        } = je({
            mutationFn: async ({
                memoryId: t,
                status: i
            }) => {
                const {
                    success: a
                } = await te.safePatch("/memories/{memory_id}/status", {
                    parameters: {
                        path: {
                            memory_id: t
                        }
                    },
                    requestBody: {
                        status: i
                    }
                });
                if (!a) throw new Error("An error occurred while updating the memory status")
            },
            onSettled: () => {
                h.invalidateQueries({
                    queryKey: Ce(f ? .id)
                }), h.invalidateQueries({
                    queryKey: Ne()
                })
            },
            onError: () => {
                D.danger(p.somethingWentWrong, {
                    id: "memoryUpdateStatusFailed",
                    toastId: "memory_update_status_failed"
                })
            }
        }),
        {
            mutate: q,
            isPending: P
        } = je({
            mutationFn: async t => {
                await tt({
                    memoryId: t,
                    gizmoId: f ? .id
                })
            },
            onSettled: () => {
                h.invalidateQueries({
                    queryKey: Ce(f ? .id)
                }), h.invalidateQueries({
                    queryKey: Ne()
                })
            },
            onError: () => {
                D.danger(p.deleteFailed, {
                    id: "memoryDeleteFailed",
                    toastId: "memory_delete_failed"
                })
            }
        }),
        [G, z] = r.useState(!1),
        [J, A] = r.useState(!1);

    function N(t) {
        const i = new Date,
            a = t.getFullYear() === i.getFullYear();
        try {
            return m.formatDate(t, {
                month: "long",
                day: "numeric",
                ...a ? {} : {
                    year: "numeric"
                }
            })
        } catch {
            const g = {
                month: "long",
                day: "numeric"
            };
            return a || (g.year = "numeric"), t.toLocaleDateString(void 0, g)
        }
    }
    const I = m.formatMessage(p.moreOptions),
        v = (o.status ? ? ie) === "cold",
        Q = qe(() => !We() && Qe()),
        u = v ? () => {
            ee.logEvent("Memory Manage Modal Memory Unarchive Clicked"), M({
                memoryId: o.id,
                status: "warm"
            }, {
                onSuccess: () => {
                    D.successNeutral(m.formatMessage(p.memoryPrioritized), {
                        duration: 4,
                        hasCloseButton: !1
                    })
                }
            })
        } : void 0,
        Y = () => {
            ee.logEvent("Memory Manage Modal Memory Delete Clicked"), z(!0)
        },
        E = v && o.last_updated ? p.deprioritizedOnNoReason : null,
        L = v && o.last_updated ? {
            actor: o.last_updated.actor === "user" ? m.formatMessage(p.you) : "ChatGPT",
            date: o.last_updated.timestamp != null ? (() => {
                const t = Ye(o.last_updated.timestamp);
                return N(t)
            })() : m.formatMessage(p.unknownDate)
        } : void 0,
        O = o.conversation_id,
        w = O ? `/c/${O}` : void 0,
        k = o.updated_at ? (() => {
            const t = $e(o.updated_at);
            return N(t)
        })() : void 0,
        F = v ? null : w ? k ? p.savedOnFromChat : p.savedFromChat : k ? p.savedOnNoChat : null,
        _ = v ? void 0 : w ? {
            date: k,
            link: t => e.jsx("a", {
                href: w,
                className: "underline",
                target: "_blank",
                rel: "noreferrer",
                children: t
            })
        } : k ? {
            date: k
        } : void 0,
        R = e.jsxs("div", {
            className: "flex min-w-0 flex-1 flex-row items-center gap-2",
            children: [e.jsx("div", {
                className: Z("min-w-0 flex-initial py-3 [overflow-wrap:anywhere] whitespace-pre-wrap", v && "text-token-text-tertiary"),
                children: o.content
            }), V || null]
        }),
        C = y ? null : e.jsxs(n.Root, {
            open: J,
            onOpenChange: A,
            children: [e.jsx(n.Trigger, {
                asChild: !0,
                children: e.jsx("button", {
                    "aria-label": I,
                    className: Z("text-token-text-tertiary hover:text-token-text-secondary size-8!", Q ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"),
                    children: e.jsx(pe, {
                        className: "icon"
                    })
                })
            }), e.jsx(n.Portal, {
                children: e.jsxs(n.Content, {
                    align: "start",
                    size: "small",
                    className: "max-w-[280px] min-w-0",
                    children: [u && H && e.jsx(n.Item, {
                        icon: gt,
                        onClick: u,
                        children: m.formatMessage(p.prioritizeThisMemory)
                    }), e.jsx(n.Item, {
                        icon: Oe,
                        color: "danger",
                        onClick: Y,
                        children: m.formatMessage(p.delete)
                    }), E && L && e.jsx(n.Group, {
                        children: e.jsx("div", {
                            className: "text-token-text-tertiary px-4 py-2 text-[13px] leading-4",
                            children: e.jsx(c, { ...E,
                                values: L
                            })
                        })
                    }), F && _ && e.jsx(n.Group, {
                        children: e.jsx("div", {
                            className: "text-token-text-tertiary px-4 py-2 text-[13px] leading-4",
                            children: e.jsx(c, { ...F,
                                values: _
                            })
                        })
                    })]
                })
            })]
        });
    return e.jsxs(e.Fragment, {
        children: [e.jsxs("div", {
            className: Z("group border-token-border-default flex w-full flex-row items-center justify-between gap-3 border-b px-3", j === !1 && "border-b-0", (P || T) && "pointer-events-none opacity-50", l),
            children: [R, e.jsx("div", {
                className: "flex shrink-0 justify-end",
                children: e.jsx(xe.Actions, {
                    children: C
                })
            })]
        }), !y && G && e.jsx(se, {
            isOpen: !0,
            primaryButtonColor: "danger",
            title: m.formatMessage(p.deleteConfirmTitle),
            confirmText: m.formatMessage(p.delete),
            onConfirm: () => {
                ee.logEvent("Memory Manage Modal Memory Delete Confirmed"), q(o.id, {
                    onSuccess: () => {
                        D.successNeutral(m.formatMessage(p.memoryDeleted), {
                            duration: 4,
                            hasCloseButton: !1
                        })
                    }
                }), z(!1)
            },
            onClose: () => {
                z(!1)
            },
            children: e.jsx("div", {
                className: "mb-2 text-sm",
                children: m.formatMessage(p.deleteConfirmDescription, {
                    name: f ? .name ? ? "ChatGPT",
                    title: e.jsx("strong", {
                        children: xt(o.content, {
                            length: 130,
                            omission: "..."
                        })
                    }),
                    link: t => e.jsx("a", {
                        href: Mt,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "underline",
                        children: t
                    })
                })
            })
        })]
    })
}
const p = le({
        deprioritizedOnNoReason: {
            id: "MemoryRow.deprioritizedOnNoReason",
            defaultMessage: "Deprioritized by {actor} on {date}."
        },
        deprioritizedOnWithReason: {
            id: "MemoryRow.deprioritizedOnWithReason",
            defaultMessage: "Deprioritized by {actor} on {date} because {reason}."
        },
        delete: {
            id: "MemoryRow.delete",
            defaultMessage: "Delete"
        },
        deleteConfirmTitle: {
            id: "MemoryRow.deleteConfirmTitle",
            defaultMessage: "Delete this memory?"
        },
        deleteConfirmDescription: {
            id: "MemoryRow.deleteConfirmDescription",
            defaultMessage: '"{title}" will be deleted. {name} may not remember this information going forward. <link>Learn more</link>'
        },
        deleteFailed: {
            id: "MemoryRow.deleteFailed",
            defaultMessage: "Failed to forget memory"
        },
        moreOptions: {
            id: "MemoryRow.moreOptions",
            defaultMessage: "More options"
        },
        savedFromChat: {
            id: "MemoryRow.savedFromChat",
            defaultMessage: "Saved from a <link>chat</link>."
        },
        savedOnFromChat: {
            id: "MemoryRow.savedOnFromChat",
            defaultMessage: "Saved on {date} from a <link>chat</link>."
        },
        savedOnNoChat: {
            id: "MemoryRow.savedOnNoChat",
            defaultMessage: "Saved on {date}."
        },
        somethingWentWrong: {
            id: "MemoryRow.somethingWentWrong",
            defaultMessage: "Something went wrong..."
        },
        memoryPrioritized: {
            id: "MemoryRow.memoryPrioritized",
            defaultMessage: "Memory prioritized"
        },
        memoryDeleted: {
            id: "MemoryRow.memoryDeleted",
            defaultMessage: "Memory deleted"
        },
        prioritizeThisMemory: {
            id: "MemoryRow.prioritizeThisMemory",
            defaultMessage: "Prioritize this memory"
        },
        unknownDate: {
            id: "MemoryRow.unknownDate",
            defaultMessage: "Unknown date"
        },
        you: {
            id: "MemoryRow.you",
            defaultMessage: "You"
        }
    }),
    vt = 80,
    bt = 100;

function jt(o) {
    const f = st(),
        l = Re();
    return f && !l && o != null && o > vt
}

function wt({
    memoryFullPct: o,
    className: f
}) {
    if (!jt(o)) return null;
    const y = o;
    return e.jsx("div", {
        className: Z("flex items-center justify-center", f),
        children: e.jsx("div", {
            className: Z("flex items-center justify-center gap-0.5 rounded-[8px] p-1 text-sm leading-4 font-semibold whitespace-nowrap", y >= bt ? "bg-token-bg-status-error text-token-interactive-label-danger-secondary-default" : "bg-token-bg-status-warning text-token-text-status-warning"),
            children: e.jsx(c, {
                id: "R17Ykc",
                defaultMessage: "{memoryFullPct}% full",
                values: {
                    memoryFullPct: y
                }
            })
        })
    })
}
const fe = le({
        disableOptimizeTitle: {
            id: "personalizationSettings.disableOptimizeTitle",
            defaultMessage: "Turn off automatic memory management?"
        },
        turnOff: {
            id: "common.turnOff",
            defaultMessage: "Turn off"
        },
        disableOptimizeDescription: {
            id: "personalizationSettings.disableOptimizeDescription",
            defaultMessage: "Once memory is full, ChatGPT won't save new memories, and responses may feel less personal. {link}"
        }
    }),
    kt = ({
        isOpen: o = !1,
        setShowDisableOMConfirm: f,
        goldenHourMutation: l
    }) => {
        const y = ne();
        return e.jsx(se, {
            isOpen: o,
            title: y.formatMessage(fe.disableOptimizeTitle),
            confirmText: y.formatMessage(fe.turnOff),
            primaryButtonColor: "danger",
            onConfirm: () => {
                l.mutate({
                    setting: He.GoldenHour,
                    value: !1
                }), f(!1)
            },
            onClose: () => {
                f(!1)
            },
            children: e.jsx("div", {
                className: "mb-2 text-sm",
                children: e.jsx(c, { ...fe.disableOptimizeDescription,
                    values: {
                        link: j => e.jsx(ae, {
                            href: "https://help.openai.com/en/articles/8590148-memory-faq",
                            className: "underline",
                            children: j
                        })
                    }
                })
            })
        })
    };

function Ct({
    label: o,
    active: f,
    onClick: l
}) {
    return e.jsx("button", {
        onClick: l,
        className: "rounded-lg px-3 py-2.5 text-start text-sm " + (f ? "dark:bg-token-interactive-bg-secondary-press dark:hover:bg-token-interactive-bg-secondary-hover bg-[#0000000f] hover:bg-[#0000000a]" : "dark:hover:bg-token-interactive-bg-secondary-hover hover:bg-[#0000000a]"),
        children: e.jsx("div", {
            className: "font-semibold text-wrap",
            children: o
        })
    })
}

function Nt({
    isOpen: o,
    onClose: f
}) {
    const l = ne();
    Te();
    const y = Se(),
        {
            data: j,
            isLoading: V,
            isFetching: m,
            refetch: D
        } = ot(50, o),
        h = r.useMemo(() => Array.isArray(j ? .history) ? j.history : [], [j]),
        H = V || m && !j,
        [M, T] = r.useState(null),
        [q, P] = r.useState(!1),
        [G, z] = r.useState(!1),
        [J, A] = r.useState(!1),
        [N, I] = r.useState(!1),
        W = r.useCallback(async () => {
            await D()
        }, [D]),
        v = r.useCallback(t => {
            const i = new Date((t || 0) * 1e3),
                a = i.getFullYear() === new Date().getFullYear();
            try {
                const g = l.formatDate(i, {
                        month: "long",
                        day: "numeric",
                        ...a ? {} : {
                            year: "numeric"
                        }
                    }),
                    x = l.formatTime(i, {
                        hour: "numeric",
                        minute: "2-digit"
                    });
                return `${g}, ${x}`
            } catch {
                const g = {
                    month: "long",
                    day: "numeric"
                };
                a || (g.year = "numeric");
                const x = i.toLocaleDateString(void 0, g),
                    U = i.toLocaleTimeString(void 0, {
                        hour: "numeric",
                        minute: "2-digit"
                    });
                return `${x}, ${U}`
            }
        }, [l]),
        Q = r.useMemo(() => h.map(t => ({
            id: t.id ? ? "__current__",
            label: v(t.snapshot_time)
        })), [h, v]),
        u = r.useMemo(() => {
            if (h.length === 0) return null;
            if (M == null) return h.find(i => i.id == null) ? ? h[0] ? ? null;
            const t = M === "__current__" ? null : M;
            return h.find(i => (i.id ? ? "__current__") === (t ? ? "__current__")) ? ? null
        }, [h, M]),
        Y = r.useMemo(() => u ? v(u.snapshot_time) : "", [u, v]),
        E = r.useCallback(() => {
            !u || u.id == null || A(!0)
        }, [u]),
        L = r.useCallback(async () => {
            if (!(!u || u.id == null)) {
                I(!0);
                try {
                    const {
                        success: t
                    } = await te.safeDelete("/memories/history/{memory_history_id}", {
                        parameters: {
                            path: {
                                memory_history_id: u.id
                            }
                        }
                    });
                    if (!t) throw new Error("failed");
                    await W(), T(null)
                } catch {} finally {
                    I(!1), A(!1)
                }
            }
        }, [u, W]),
        O = (M ? ? "__current__") === "__current__",
        w = u ? .id != null && !O;
    r.useEffect(() => {
        if (!o || H) return;
        if (h.length === 0) {
            T(a => a === null ? a : null);
            return
        }
        const t = new Set(h.map(a => a.id ? ? "__current__")),
            i = t.has("__current__");
        T(a => {
            const g = a ? ? "__current__";
            return t.has(g) ? a : i ? null : h[0] ? .id ? ? null
        })
    }, [o, H, h]);

    function k(t) {
        const i = t.updated_at != null ? Date.parse(t.updated_at) : NaN;
        let a = t.last_updated ? .timestamp;
        a = a ? ? t.created_timestamp ? ? void 0;
        const g = a != null ? a * 1e3 : NaN,
            x = Math.max(Number.isFinite(i) ? i : -1 / 0, Number.isFinite(g) ? g : -1 / 0);
        return Number.isFinite(x) ? x : 0
    }
    const {
        currentMemories: F,
        deprioritizedMemories: _
    } = r.useMemo(() => {
        const t = u ? .memories ? ? [],
            i = [],
            a = [];
        for (const x of t)(x.status ? ? ie) === "cold" ? a.push(x) : i.push(x);
        const g = (x, U) => k(U) - k(x);
        return {
            currentMemories: i.sort(g),
            deprioritizedMemories: a.sort(g)
        }
    }, [u]), R = r.useMemo(() => [...F, ..._], [F, _]);
    let C = null;
    return H ? C = e.jsxs("div", {
        className: "border-token-border-default flex w-full flex-col rounded-lg border",
        children: [e.jsxs("div", {
            className: "border-token-border-default relative flex flex-row items-center justify-between gap-3 px-4 py-5",
            children: [e.jsxs("div", {
                className: "flex w-48 flex-col gap-2 px-3",
                children: [e.jsx("div", {
                    className: "bg-token-bg-tertiary h-5 w-48 animate-pulse rounded"
                }), e.jsx("div", {
                    className: "bg-token-bg-tertiary h-3 w-28 animate-pulse rounded"
                })]
            }), e.jsx("div", {
                className: "bg-token-bg-tertiary h-8 w-36 animate-pulse rounded-full"
            }), e.jsx("span", {
                className: "sr-only",
                children: e.jsx(c, { ...b.loading
                })
            })]
        }), e.jsx("div", {
            className: "flex flex-1 overflow-y-auto px-4",
            children: e.jsx("div", {
                className: "w-full",
                children: Array.from({
                    length: 6
                }).map((t, i) => {
                    const a = Math.floor(Math.random() * 193) + 128;
                    return e.jsx("div", {
                        className: "border-token-border-default flex items-start gap-3 border-b py-4",
                        children: e.jsx("div", {
                            className: "bg-token-bg-tertiary h-6 animate-pulse rounded",
                            style: {
                                width: `${a}px`
                            }
                        })
                    }, i)
                })
            })
        })]
    }) : u ? C = e.jsxs("div", {
        className: "border-token-border-default flex w-full flex-col rounded-lg border",
        children: [e.jsxs("div", {
            className: "border-token-border-default group relative flex flex-row items-center justify-between gap-2 px-4 py-5",
            children: [e.jsx("div", {
                className: "min-w-0 flex-1 px-3",
                children: e.jsx("div", {
                    className: "text-lg font-semibold",
                    children: Y
                })
            }), e.jsxs("div", {
                className: "flex h-full shrink-0 items-start gap-2 pe-1",
                children: [w ? e.jsxs(n.Root, {
                    children: [e.jsx(n.Trigger, {
                        asChild: !0,
                        children: e.jsx("button", {
                            "aria-label": l.formatMessage(b.moreOptions),
                            className: "text-token-text-tertiary hover:text-token-text-secondary size-8!",
                            children: e.jsx(pe, {
                                className: "icon"
                            })
                        })
                    }), e.jsx(n.Portal, {
                        children: e.jsx(n.Content, {
                            align: "start",
                            size: "small",
                            className: "max-w-[200px] min-w-0",
                            children: e.jsx(n.Item, {
                                icon: Oe,
                                color: "danger",
                                onClick: E,
                                className: "gap-2.5! pe-3!",
                                children: l.formatMessage(b.deleteSnapshot)
                            })
                        })
                    })]
                }) : null, e.jsx(ge, {
                    color: "secondary",
                    onClick: () => P(!0),
                    disabled: O,
                    style: {
                        pointerEvents: O ? "none" : void 0
                    },
                    children: u.id == null ? e.jsx(c, { ...b.currentVersion
                    }) : e.jsx(c, { ...b.restoreThisVersion
                    })
                })]
            })]
        }), F.length + _.length === 0 ? e.jsx("div", {
            className: "text-token-text-tertiary flex flex-1 items-center justify-center p-4 text-sm",
            children: e.jsx(c, { ...b.noMemories
            })
        }) : e.jsx("div", {
            className: "flex flex-1 overflow-y-auto px-4",
            children: e.jsx("div", {
                className: "w-full text-sm",
                children: R.map((t, i) => e.jsx(Ge, {
                    memory: t,
                    gizmo: void 0,
                    readOnly: !0,
                    showDivider: i !== R.length - 1
                }, t.id))
            })
        })]
    }) : C = e.jsx("div", {
        className: "border-token-border-default text-token-text-tertiary flex h-full w-full items-center justify-center rounded-lg border p-4 text-sm",
        children: e.jsx(c, { ...b.noMemories
        })
    }), e.jsxs(e.Fragment, {
        children: [e.jsx(Ae, {
            testId: "modal-saved-memories-history",
            isOpen: o,
            onClose: f,
            size: "custom",
            className: "max-h-[85vh] max-md:min-h-[60vh] md:h-[740px] md:max-w-[960px]",
            type: "success",
            title: l.formatMessage(b.title),
            showCloseButton: !0,
            children: e.jsxs("div", {
                className: "flex h-full min-h-0 gap-4",
                children: [e.jsx("div", {
                    className: "w-60 shrink-0 overflow-y-auto",
                    children: e.jsx("div", {
                        className: "flex flex-col pb-2",
                        children: H ? Array.from({
                            length: 6
                        }).map((t, i) => e.jsx("div", {
                            className: "rounded px-3 py-2.5",
                            children: e.jsx("div", {
                                className: "bg-token-bg-tertiary h-4 w-40 animate-pulse rounded"
                            })
                        }, i)) : e.jsxs(e.Fragment, {
                            children: [Q.map(t => {
                                const i = (M ? ? "__current__") === t.id;
                                return e.jsx(Ct, {
                                    label: t.label,
                                    active: i,
                                    onClick: () => T(t.id)
                                }, t.id)
                            }), Q.length === 0 ? e.jsx("div", {
                                className: "text-sm",
                                children: e.jsx(c, { ...b.noHistory
                                })
                            }) : null]
                        })
                    })
                }), e.jsx("div", {
                    className: "flex min-w-0 flex-1 overflow-hidden",
                    children: C
                })]
            })
        }), J && u ? .id != null && e.jsx(se, {
            isOpen: !0,
            title: l.formatMessage(b.confirmDeleteTitle),
            confirmText: l.formatMessage(b.confirmDeleteCta),
            primaryButtonColor: "danger",
            loading: N,
            onConfirm: L,
            onClose: () => {
                N || A(!1)
            },
            children: e.jsx("div", {
                className: "text-token-text-secondary mb-2 text-sm",
                children: e.jsx(c, { ...b.confirmDeleteBody
                })
            })
        }), q && e.jsx(se, {
            isOpen: !0,
            title: l.formatMessage(b.confirmRestoreTitle),
            confirmText: l.formatMessage(b.confirmRestoreCta),
            primaryButtonColor: "danger",
            loading: G,
            onConfirm: async () => {
                if (!(!u || u.id == null)) {
                    z(!0);
                    try {
                        const {
                            success: t
                        } = await te.safePost("/memories/history/{memory_history_id}/revert", {
                            parameters: {
                                path: {
                                    memory_history_id: u.id
                                }
                            }
                        });
                        if (!t) throw new Error("failed");
                        await W(), T(null), y.invalidateQueries({
                            queryKey: ["memories"]
                        })
                    } catch {} finally {
                        P(!1), z(!1)
                    }
                }
            },
            onClose: () => P(!1),
            children: e.jsx("div", {
                className: "mb-2 text-sm",
                children: e.jsx(c, { ...b.confirmRestoreBody
                })
            })
        })]
    })
}
const b = le({
        title: {
            id: "SavedMemoriesHistoryModal.title",
            defaultMessage: "Saved memories history"
        },
        loading: {
            id: "SavedMemoriesHistoryModal.loading",
            defaultMessage: "Loading..."
        },
        noHistory: {
            id: "SavedMemoriesHistoryModal.noHistory",
            defaultMessage: "No checkpoints"
        },
        noMemories: {
            id: "SavedMemoriesHistoryModal.noMemories",
            defaultMessage: "No memories"
        },
        currentVersion: {
            id: "SavedMemoriesHistoryModal.currentVersion",
            defaultMessage: "Current version"
        },
        restoreThisVersion: {
            id: "SavedMemoriesHistoryModal.restoreThisVersion",
            defaultMessage: "Restore this version"
        },
        confirmRestoreTitle: {
            id: "SavedMemoriesHistoryModal.confirmRestoreTitle",
            defaultMessage: "Restore this version?"
        },
        confirmRestoreBody: {
            id: "SavedMemoriesHistoryModal.confirmRestoreBody",
            defaultMessage: "This will replace your current saved memories."
        },
        confirmRestoreCta: {
            id: "SavedMemoriesHistoryModal.confirmRestoreCta",
            defaultMessage: "Restore"
        },
        moreOptions: {
            id: "SavedMemoriesHistoryModal.moreOptions",
            defaultMessage: "More options"
        },
        deleteSnapshot: {
            id: "SavedMemoriesHistoryModal.deleteSnapshot",
            defaultMessage: "Delete this version"
        },
        confirmDeleteTitle: {
            id: "SavedMemoriesHistoryModal.confirmDeleteTitle",
            defaultMessage: "Delete this version?"
        },
        confirmDeleteBody: {
            id: "SavedMemoriesHistoryModal.confirmDeleteBody",
            defaultMessage: "This cannot be undone."
        },
        confirmDeleteCta: {
            id: "SavedMemoriesHistoryModal.confirmDeleteCta",
            defaultMessage: "Delete"
        }
    }),
    re = Ze.div `flex h-full items-center justify-center pb-8 text-sm text-token-text-tertiary rounded-lg border border-token-border-default`;

function _e(o) {
    const f = o.updated_at != null ? Date.parse(o.updated_at) : NaN;
    let l = o.last_updated ? .timestamp;
    l = l ? ? o.created_timestamp ? ? void 0;
    const y = l != null ? l * 1e3 : NaN,
        j = Math.max(Number.isFinite(f) ? f : -1 / 0, Number.isFinite(y) ? y : -1 / 0);
    return Number.isFinite(j) ? j : 0
}

function Pt({
    isOpen: o,
    onClose: f,
    initialGizmoId: l,
    contextScopes: y,
    requiredContextScopes: j
}) {
    const V = Be(),
        m = ne(),
        D = Ke(),
        h = De(),
        H = rt(),
        [M, T] = r.useState(l),
        [q, P] = r.useState(!1),
        [G, z] = r.useState(""),
        [J, A] = r.useState(!1),
        [N, I] = r.useState(!1),
        [W, v] = r.useState(!1),
        [Q, u] = r.useState(!1),
        [Y, E] = r.useState(!1),
        [L, O] = r.useState(!1),
        w = r.useRef(null),
        k = at(),
        F = we("3453210147") ? ? !1;
    we("1900515849");
    const _ = it(),
        R = Re(),
        C = Xe(!0),
        t = r.useCallback(s => {
            if (!s && R) {
                E(!0);
                return
            }
            C.mutate({
                setting: He.GoldenHour,
                value: s
            }), ee.logEventWithStatsig(`Personalization Settings Automatic Memory Management ${s?"Enabled":"Disabled"}`, `chatgpt_personalization_settings_automatic_memory_management_${s?"enabled":"disabled"}`)
        }, [C, R]),
        i = C.isPending,
        {
            data: a,
            isLoading: g,
            isError: x,
            refetch: U
        } = nt({
            gizmoId: M,
            enabled: H,
            contextScopes: y,
            requiredContextScopes: j
        }),
        ye = a ? .memories ? ? [],
        de = ye.length,
        oe = [...ye].sort((s, B) => (q ? 1 : -1) * (_e(s) - _e(B))),
        ce = (() => {
            const s = G.trim();
            if (s === "") return oe;
            const B = new Set(yt(oe, s, S => ({
                targets: [S.content]
            }), {
                locale: m.locale,
                maxResults: oe.length
            }).map(S => S.id));
            return oe.filter(S => B.has(S.id))
        })(),
        Me = ce.filter(s => (s.status ? ? ie) !== "cold"),
        ve = ce.filter(s => (s.status ? ? ie) === "cold"),
        $ = r.useMemo(() => [...Me, ...ve], [Me, ve]);
    r.useEffect(() => () => {
        w.current && (clearTimeout(w.current), w.current = null)
    }, []);
    const ze = r.useCallback(async s => {
            if ($.length === 0) return;
            const B = $.map(S => S.content ? ? "").join(`
`);
            try {
                await Je(B, h, s), O(!0), w.current && clearTimeout(w.current), w.current = setTimeout(() => {
                    O(!1), w.current = null
                }, 2e3)
            } catch {}
        }, [$, h]),
        {
            data: Fe,
            refetch: _t
        } = Ve({
            queryKey: ["memory_gizmos"],
            queryFn: () => te.safeGet("/memories/gizmos", {}),
            refetchOnMount: "always"
        }),
        me = lt(a ? .memoryFullPct ? ? 0) !== "control",
        ue = Te(),
        Pe = ue != null && !ue.isWorkspaceAccount() && !ue.hasPaidFeatures(),
        K = [{
            id: void 0,
            name: "ChatGPT",
            iconUrl: null
        }, ...Fe ? .items.map(({
            gizmo: s
        }) => ({
            id: s.id,
            name: s.display.name,
            iconUrl: s.display.profile_picture_url ? ? null
        })) ? ? []].find(s => s.id === M);
    r.useEffect(() => {
        !g && !x && M !== void 0 && de === 0 && T(void 0)
    }, [g, x, M, de]);
    const Ie = k && R ? d.descriptionOptimizeOn : k && _ ? d.descriptionPaid : k ? d.descriptionFreeMoonshine : d.descriptionFree,
        be = m.formatMessage(L ? d.copiedAll : d.copyAll),
        Ee = r.useCallback(s => {
            s.preventDefault(), s.currentTarget instanceof HTMLElement && s.currentTarget.focus()
        }, []),
        Le = s => e.jsx(ae, {
            href: he,
            className: "underline",
            children: s
        });
    let X;
    return g ? X = e.jsx(re, {
        className: "border-none",
        children: e.jsx(c, { ...d.loading
        })
    }) : x ? X = e.jsx(re, {
        className: "border-none",
        children: e.jsxs("div", {
            className: "max-w-sm text-center",
            children: [e.jsx("div", {
                className: "mb-4 text-red-500",
                children: e.jsx(c, {
                    id: "MemoriesModal.somethingWentWrong",
                    defaultMessage: "Something went wrong..."
                })
            }), e.jsx("div", {
                children: e.jsx(ge, {
                    color: "secondary",
                    size: "small",
                    onClick: () => {
                        U()
                    },
                    children: e.jsx(c, {
                        id: "MemoriesModal.retry",
                        defaultMessage: "Retry"
                    })
                })
            })]
        })
    }) : de === 0 ? X = e.jsx(re, {
        className: "text-token-text-primary border-none",
        children: H ? e.jsxs("div", {
            className: "flex h-full max-w-sm flex-col items-center justify-center gap-0.5 text-center text-base",
            children: [e.jsx(ft, {
                className: "icon-xl"
            }), e.jsx(c, { ...d.noMemories,
                values: {
                    name: K ? .name ? ? "ChatGPT"
                }
            })]
        }) : e.jsx("div", {
            className: "flex h-full max-w-sm items-center justify-center text-center",
            children: e.jsx(c, { ...d.noMemoriesAndDisabled
            })
        })
    }) : G.trim() !== "" && ce.length === 0 ? X = e.jsx(re, {
        className: "text-token-text-tertiary border-none",
        children: e.jsxs("div", {
            className: "flex h-full max-w-sm flex-col items-center justify-center gap-2 text-center text-base",
            children: [e.jsx(ke, {
                className: "icon-lg"
            }), e.jsx("div", {
                children: e.jsx(c, { ...d.searchNoResults,
                    values: {
                        query: G.trim()
                    }
                })
            }), e.jsx("div", {
                children: e.jsx(ge, {
                    color: "secondary",
                    size: "small",
                    onClick: () => {
                        v(!0)
                    },
                    children: e.jsx(c, { ...d.viewHistory
                    })
                })
            })]
        })
    }) : X = e.jsx(xe.Root, {
        size: "compact",
        children: e.jsx(xe.Body, {
            children: $.map((s, B) => {
                const S = K ? {
                        id: K.id,
                        name: K.name
                    } : void 0,
                    Ue = {
                        memory: s,
                        gizmo: S,
                        showDivider: B !== $.length - 1
                    };
                return e.jsx(Ge, { ...Ue
                }, s.id)
            })
        })
    }), e.jsxs(e.Fragment, {
        children: [e.jsxs(Ae, {
            testId: "modal-golden-hour-memories",
            isOpen: o,
            size: "custom",
            className: "max-h-[85vh] px-2 py-2 max-md:min-h-[60vh] md:h-[740px] md:max-w-[680px]",
            headerClassName: "shrink-0",
            contentClassName: "h-full flex flex-col",
            type: "success",
            onClose: f,
            onOpenAutoFocus: Ee,
            title: e.jsxs("div", {
                className: "flex items-center gap-1.5",
                children: [e.jsx("span", {
                    children: m.formatMessage(d.title)
                }), !me && e.jsx(wt, {
                    memoryFullPct: a ? .memoryFullPct
                })]
            }),
            description: !me && e.jsx("div", {
                className: "text-token-text-secondary",
                children: m.formatMessage(Ie, {
                    link: Le
                })
            }),
            showCloseButton: !0,
            isScrollable: !1,
            children: [e.jsxs("div", {
                className: "border-token-border-default w-full border-b pb-4",
                children: [me && e.jsx(pt, {
                    memoryFullPct: a ? .memoryFullPct,
                    shouldShowPlusUpsell: Pe,
                    onUpgrade: () => {
                        ee.logEventWithStatsig("Memories Upgrade Button Clicked", "chatgpt_memories_upgrade_button_clicked_settings", {
                            memory_full_pct: a ? .memoryFullPct ? ? 0
                        }), dt(V, "chatgpt_memories_upgrade_button")
                    },
                    className: "mb-6"
                }), e.jsxs("div", {
                    className: "flex items-center justify-between gap-2",
                    children: [e.jsxs("div", {
                        className: "relative min-w-0 flex-1",
                        children: [e.jsx("div", {
                            className: "pointer-events-none absolute start-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center",
                            children: e.jsx(ke, {
                                className: "icon text-token-text-tertiary"
                            })
                        }), e.jsx("input", {
                            type: "text",
                            id: "memories-search",
                            name: "memories-search",
                            placeholder: m.formatMessage(d.searchPlaceholder),
                            className: "border-token-border-default placeholder:text-token-text-tertiary/70 h-9.5 w-full max-w-[320px] rounded-full border bg-transparent ps-10 pe-3 text-sm outline-none focus:shadow-none focus:ring-0 focus:outline-none",
                            value: G,
                            onChange: s => z(s.target.value)
                        })]
                    }), e.jsxs("div", {
                        className: "flex items-center gap-0.5",
                        children: [F && e.jsx("button", {
                            type: "button",
                            "aria-label": be,
                            title: be,
                            disabled: $.length === 0,
                            onClick: ze,
                            className: "text-token-text-tertiary hover:text-token-text-secondary hover:bg-token-interactive-bg-tertiary-hover inline-flex size-8! items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-40",
                            children: L ? e.jsx(ct, {
                                className: "icon"
                            }) : e.jsx(mt, {
                                className: "icon"
                            })
                        }), e.jsxs(n.Root, {
                            children: [e.jsx(n.Trigger, {
                                asChild: !0,
                                children: e.jsx("button", {
                                    "aria-label": m.formatMessage(d.sortAria),
                                    className: "text-token-text-tertiary hover:text-token-text-secondary hover:bg-token-interactive-bg-tertiary-hover inline-flex size-8! items-center justify-center rounded-md",
                                    children: e.jsx(ht, {
                                        className: "icon"
                                    })
                                })
                            }), e.jsx(n.Portal, {
                                children: e.jsxs(n.Content, {
                                    align: "start",
                                    size: "auto",
                                    className: "max-w-[280px] min-w-[165px]",
                                    children: [e.jsx(n.Group, {
                                        children: e.jsx("div", {
                                            className: "text-token-text-tertiary px-4 pt-2.5 pb-2 text-[13px] leading-4",
                                            children: e.jsx(c, { ...d.sortHeader
                                            })
                                        })
                                    }), e.jsxs(n.RadioGroup, {
                                        value: q ? "oldest" : "newest",
                                        onValueChange: s => P(s === "oldest"),
                                        children: [e.jsx(n.RadioItem, {
                                            value: "newest",
                                            children: e.jsx(c, { ...d.newestFirst
                                            })
                                        }), e.jsx(n.RadioItem, {
                                            value: "oldest",
                                            children: e.jsx(c, { ...d.oldestFirst
                                            })
                                        })]
                                    })]
                                })
                            })]
                        }), e.jsxs(n.Root, {
                            children: [e.jsx(n.Trigger, {
                                asChild: !0,
                                children: e.jsx("button", {
                                    "aria-label": m.formatMessage(d.moreOptionsAria),
                                    className: "text-token-text-tertiary hover:text-token-text-secondary hover:bg-token-interactive-bg-tertiary-hover inline-flex size-8! items-center justify-center rounded-md",
                                    children: e.jsx(pe, {
                                        className: "icon"
                                    })
                                })
                            }), e.jsx(n.Portal, {
                                children: e.jsxs(n.Content, {
                                    align: "start",
                                    size: "small",
                                    className: "max-w-[280px] min-w-0",
                                    children: [_ && e.jsx(n.Group, {
                                        children: e.jsx(n.CheckboxItem, {
                                            label: m.formatMessage(d.autoManageTitle),
                                            checked: R,
                                            disabled: i,
                                            onCheckedChange: s => {
                                                t(s === !0)
                                            }
                                        })
                                    }), e.jsxs(n.Group, {
                                        children: [e.jsx(n.Item, {
                                            onClick: () => {
                                                v(!0)
                                            },
                                            children: e.jsx(c, { ...d.viewHistory
                                            })
                                        }), e.jsx(n.Item, {
                                            color: "danger",
                                            onClick: () => {
                                                I(!1), A(!0)
                                            },
                                            children: e.jsx(c, { ...d.deleteAllMemories
                                            })
                                        })]
                                    })]
                                })
                            })]
                        })]
                    })]
                })]
            }), e.jsx("div", {
                className: "h-full min-w-0 overflow-y-auto",
                children: X
            }), J && e.jsx(se, {
                isOpen: !0,
                primaryButtonColor: "danger",
                title: m.formatMessage(d.deleteAllConfirmTitle),
                confirmText: m.formatMessage(d.deleteAllConfirmCta),
                loading: Q,
                onConfirm: async () => {
                    u(!0);
                    try {
                        const s = {
                            gizmo_id: M,
                            delete_history: N
                        };
                        M === void 0 && (s.delete_history = N), await te.safeDelete("/settings/clear_account_user_memory", {
                            requestBody: s
                        }), await U()
                    } catch {} finally {
                        u(!1), A(!1)
                    }
                },
                onClose: () => A(!1),
                children: e.jsxs("div", {
                    className: "mb-2 flex flex-col gap-5 text-sm",
                    children: [e.jsx("div", {
                        className: "text-sm",
                        children: k ? e.jsx(c, { ...d.deleteAllConfirmDescriptionUpdated,
                            values: {
                                name: K ? .name ? ? "ChatGPT",
                                link: s => e.jsx(ae, {
                                    href: he,
                                    className: "underline",
                                    children: s
                                })
                            }
                        }) : e.jsx(c, { ...d.deleteAllConfirmDescription,
                            values: {
                                name: K ? .name ? ? "ChatGPT",
                                link: s => e.jsx(ae, {
                                    href: he,
                                    className: "underline",
                                    children: s
                                })
                            }
                        })
                    }), e.jsxs("div", {
                        className: "border-token-border-default flex flex-row gap-3 rounded-2xl border px-4 py-4 text-sm",
                        children: [e.jsx(ut, {
                            id: "delete-past-versions",
                            checked: N,
                            onChange: s => I(s.target.checked),
                            className: "border-token-border-default! h-5 w-5 shrink-0 rounded-full! border ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus:outline-none",
                            style: {
                                backgroundColor: N ? D ? "transparent" : "black" : "transparent"
                            }
                        }), e.jsx("span", {
                            children: m.formatMessage(d.alsoDeletePastVersions)
                        })]
                    })]
                })
            })]
        }), e.jsx(Nt, {
            isOpen: W,
            onClose: () => v(!1)
        }), _ && Y && e.jsx(kt, {
            isOpen: Y,
            setShowDisableOMConfirm: E,
            goldenHourMutation: C
        })]
    })
}
const he = "https://help.openai.com/en/articles/8983136-what-is-memory",
    d = le({
        descriptionFree: {
            id: "GoldenHourMemoriesModalFree.description",
            defaultMessage: "ChatGPT remembers useful details about you and your preferences so it can be more helpful. <link>Learn more</link>"
        },
        descriptionFreeMoonshine: {
            id: "GoldenHourMemoriesModal.description.freeMoonshine",
            defaultMessage: "ChatGPT tries to remember your recent chats, but it may forget things over time. Saved memories are never forgotten. <link>Learn more</link>"
        },
        descriptionPaid: {
            id: "GoldenHourMemoriesModal.description",
            defaultMessage: "ChatGPT automatically remembers useful information from chats, making responses more relevant and personal. <link>Learn more</link>"
        },
        descriptionOptimizeOn: {
            id: "GoldenHourMemoriesModal.description.optimizeOn",
            defaultMessage: "ChatGPT remembers and automatically manages useful information from chats, making responses more relevant and personal. <link>Learn more</link>"
        },
        copyAll: {
            id: "GoldenHourMemoriesModal.copyAll",
            defaultMessage: "Copy all"
        },
        copiedAll: {
            id: "GoldenHourMemoriesModal.copiedAll",
            defaultMessage: "Copied"
        },
        loading: {
            id: "GoldenHourMemoriesModal.loading",
            defaultMessage: "Loading..."
        },
        noMemories: {
            id: "GoldenHourMemoriesModal.noMemories",
            defaultMessage: "No saved memories"
        },
        noMemoriesAndDisabled: {
            id: "GoldenHourMemoriesModal.noMemoriesAndDisabled",
            defaultMessage: "Memory is disabled. ChatGPT won't use or save memories."
        },
        autoManageTitle: {
            id: "GoldenHourMemoriesModal.autoManageTitle",
            defaultMessage: "Automatically manage"
        },
        title: {
            id: "GoldenHourMemoriesModal.title",
            defaultMessage: "Saved memories"
        },
        searchPlaceholder: {
            id: "GoldenHourMemoriesModal.searchPlaceholder",
            defaultMessage: "Search memories"
        },
        searchNoResults: {
            id: "GoldenHourMemoriesModal.searchNoResults",
            defaultMessage: 'No results found for "{query}"'
        },
        sortAria: {
            id: "GoldenHourMemoriesModal.sortAria",
            defaultMessage: "Sort"
        },
        sortHeader: {
            id: "GoldenHourMemoriesModal.sortHeader",
            defaultMessage: "Sort"
        },
        newestFirst: {
            id: "GoldenHourMemoriesModal.newestFirst",
            defaultMessage: "Newest first"
        },
        oldestFirst: {
            id: "GoldenHourMemoriesModal.oldestFirst",
            defaultMessage: "Oldest first"
        },
        moreOptionsAria: {
            id: "GoldenHourMemoriesModal.moreOptionsAria",
            defaultMessage: "More options"
        },
        viewHistory: {
            id: "GoldenHourMemoriesModal.viewHistory",
            defaultMessage: "View history"
        },
        deleteAllMemories: {
            id: "GoldenHourMemoriesModal.deleteAllMemories",
            defaultMessage: "Delete all memories"
        },
        deleteAllConfirmTitle: {
            id: "GoldenHourMemoriesModal.deleteAllConfirmTitle",
            defaultMessage: "Delete all memories?"
        },
        deleteAllConfirmCta: {
            id: "GoldenHourMemoriesModal.deleteAllConfirmCta",
            defaultMessage: "Delete all"
        },
        deleteAllConfirmDescription: {
            id: "GoldenHourMemoriesModal.deleteAllConfirmDescription",
            defaultMessage: "{name} may not remember this information going forward. To fully remove this information from memory, also delete any related chats. <link>Learn more</link>"
        },
        deleteAllConfirmDescriptionUpdated: {
            id: "GoldenHourMemoriesModal.deleteAllConfirmDescriptionUpdated",
            defaultMessage: "{name} may not remember this information going forward. To fully remove this information from memory, also delete any related chats. <link>Learn more</link>"
        },
        alsoDeletePastVersions: {
            id: "GoldenHourMemoriesModal.alsoDeletePastVersions",
            defaultMessage: "Also delete all past versions of saved memories. This cannot be undone."
        }
    });
export {
    Pt as G, Ge as M, kt as O, Nt as S, wt as a, _e as g
};
//# sourceMappingURL=a78f4c52-jscmw6qy016v67a7.js.map