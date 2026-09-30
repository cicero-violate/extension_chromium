const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/df4a2937-mpi82nqqb645ej0m.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/conversation-small-cqp6votf.css", "assets/16d1c905-kzb9nx2txdax2vhp.js", "assets/4b303e9e-iimph5klvq8yx43j.js", "assets/7bce51e5-cmbyyrv67x3n5nrc.js", "assets/7ea2afc2-e5zig5rh2tcj6ymv.js", "assets/2b73e49b-giqe3caw6velz41s.js", "assets/e8fe533b-dqowgzb88uo0tkty.js", "assets/64696494-pcb5zbgdswo1x3cx.js", "assets/a78f4c52-jscmw6qy016v67a7.js", "assets/bc4efe0c-ef367v6adi8m1l4b.js", "assets/bd382fd5-bcke632cms89jbha.js"]))) => i.map(i => d[i]);
import {
    x as B,
    r as u,
    z as ie,
    j as o,
    o as c,
    _ as H,
    c as D,
    d as ae,
    y as le
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    R as E,
    e as C,
    f as de,
    tE as ce,
    dL as w,
    q as me,
    be as K,
    AC as ue,
    bW as fe,
    b5 as pe,
    df as M,
    d2 as he,
    di as I,
    ay as ye,
    az as ge,
    ch as Q,
    J as Me,
    cN as xe,
    af as V,
    aw as L,
    tx as _e,
    I as be,
    _ as k,
    cI as W,
    cQ as F,
    v as ve
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    ne as je,
    eR as Te,
    eQ as Se,
    t as Ae,
    nf as Pe,
    hu as Ee,
    dk as Ce,
    h7 as we,
    d5 as P,
    h2 as Re,
    d4 as ke,
    cf as Oe,
    dn as Ne
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    M as Ue
} from "./6ee9bd33-eye21sqplbfe3iul.js";
import {
    G as Ie
} from "./a78f4c52-jscmw6qy016v67a7.js";
import "./25de328f-ebweaz4po5j1x1mo.js";
import "./e8fe533b-dqowgzb88uo0tkty.js";
import "./64696494-pcb5zbgdswo1x3cx.js";
import "./16d1c905-kzb9nx2txdax2vhp.js";
import "./bc4efe0c-ef367v6adi8m1l4b.js";
import "./4b303e9e-iimph5klvq8yx43j.js";
import "./bd382fd5-bcke632cms89jbha.js";
import "./7bce51e5-cmbyyrv67x3n5nrc.js";
const R = "memories/current_memory_undo_id",
    $ = {
        async getCurrentMemoryUndoId(t) {
            return await E.safeGet("/memories/current_memory_undo_id", {
                parameters: {
                    query: {
                        gizmo_id: t
                    }
                }
            })
        },
        async undoMemoryWrite(t, e) {
            return await E.safePost("/memories/undo_memory_write", {
                requestBody: {
                    gizmo_id: t,
                    memory_undo_id: e
                }
            })
        }
    },
    Le = Q(() => H(() =>
        import ("./df4a2937-mpi82nqqb645ej0m.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8]))),
    We = 5e3,
    G = Q(() => H(() =>
        import ("./7ea2afc2-e5zig5rh2tcj6ymv.js"), __vite__mapDeps([9, 1, 2, 3, 4, 5, 10, 11, 12, 6, 13, 14, 7, 15])).then(t => t.PotionMemoriesModal));
let q = !1;

function Y(t) {
    return t.find(e => e.author.role === M.Tool && e.metadata ? .pending_memory_info)
}

function Fe(t) {
    return t.filter((e, n) => {
        const r = t[n + 1],
            s = r ? .recipient === "assistant" && r ? .author.role === M.Tool && r ? .author.name === "bio" && he(r).startsWith("Model set context");
        return e.author.role === M.Assistant && e.recipient === "bio" && s
    }).flatMap(e => {
        const n = e.content.content_type;
        return n === I.Text ? e.content.parts : n === I.Code ? [e.content.text] : []
    }).map(Ye)
}

function Ge(t) {
    return t.some(e => e.author.role === M.Assistant && e.recipient === "bio" && e.status === "in_progress")
}

function qe(t) {
    return t.find(n => n.author.role === M.Tool && n.author.name === "bio" && n.recipient === M.Assistant) ? .metadata ? .current_memory_undo_id
}

function ze(t) {
    const {
        eligible: e,
        isLoading: n
    } = Ae(), r = u.useMemo(() => t.length > 0, [t]);
    u.useEffect(() => {
        r && e && !n && ye.openModal(ge.GlobalMemoryOnboarding)
    }, [r, e, n])
}

function Be(t) {
    const [e, n] = u.useState(!1);
    return {
        isPopoverOpen: e,
        setIsPopoverOpen: n,
        handleTogglePopover: i => {
            const s = i ? ? !e;
            n(s), s && k.logEvent("Memory Update Popover Shown", {
                updateCount: t.length
            })
        }
    }
}

function X({
    memoryWrites: t,
    popoverState: e,
    triggerButton: n,
    isParagen: r,
    gizmoId: i,
    memoryUndoId: s,
    setShowMemoriesModal: a,
    disableActions: l
}) {
    return o.jsxs(Oe, {
        open: e.isPopoverOpen,
        sideOffset: 4,
        side: "bottom",
        alignAgainstAnchor: "start",
        size: "none",
        className: "z-10 max-w-96 min-w-60 text-sm",
        onOpenChange: d => e.handleTogglePopover(d),
        disableAutofocus: !0,
        triggerButton: n,
        children: [o.jsx("div", {
            className: "border-token-border-default bg-token-main-surface-secondary mb-2 rounded-sm border",
            children: t.map((d, m) => o.jsx("div", {
                className: "border-token-border-default border-b px-3 py-2 first-letter:uppercase last:border-b-0",
                children: d
            }, m))
        }), r ? o.jsx("div", {
            className: "text-token-text-tertiary text-xs",
            children: o.jsx(c, {
                id: "MemoryActionResult.paragenMessage",
                defaultMessage: "This memory will be saved if you choose this response."
            })
        }) : l ? null : o.jsxs(o.Fragment, {
            children: [o.jsx($e, {
                gizmoId: i,
                memoryUndoId: s
            }), o.jsx(J, {
                onClick: () => {
                    a(!0), k.logEvent("Memory Update Popover Manage Button Clicked", {
                        updateCount: t.length
                    })
                },
                children: o.jsx(c, {
                    id: "MemoryActionResult.manageMemories",
                    defaultMessage: "Manage"
                })
            })]
        })]
    })
}

function He({
    clientThreadId: t,
    pendingMessage: e,
    memoryWrites: n,
    popoverState: r,
    setShowMemoriesModal: i,
    disableActions: s
}) {
    const a = Me(),
        l = xe(t),
        d = Ee({
            conversation: K(t)
        }),
        m = n.join(" ");
    let f = m.slice(0, 50).replace(new RegExp("^\\p{L}", "u"), y => y.toLocaleUpperCase()).replace(/\.$/, "");
    m.length > 50 && (f += "...");
    const p = async y => {
        if (!l) throw new Error("Failed to confirm or reject memory update: serverThreadId is not found");
        const g = e.metadata ? .pending_memory_info;
        W(t, b => {
            F.updateTree(b, h => {
                h.updateNodeMessageMetadata(e.id, {
                    pending_memory_info: { ...g,
                        is_pending: !1,
                        confirm_result: y
                    }
                })
            })
        });
        try {
            await E.safePost("/memories/confirm_or_reject", {
                requestBody: {
                    message_id: e.id,
                    conversation_id: l,
                    is_confirm: y
                },
                authOption: ve.SendIfAvailable
            })
        } catch {
            a.danger(ae({
                id: "memory.confirmOrDenyFail",
                defaultMessage: "Failed to confirm or reject memory update"
            }), {
                toastId: "memory_confirm_or_deny_fail"
            }), W(t, h => {
                F.updateTree(h, j => {
                    j.updateNodeMessageMetadata(e.id, {
                        pending_memory_info: g
                    })
                })
            })
        }
    };
    return o.jsxs("div", {
        className: "flex items-start",
        children: [o.jsx("div", {
            className: "text-token-text-tertiary inline-block text-sm font-semibold outline-hidden",
            children: o.jsx(c, {
                id: "MemoryActionResult.memoryConfirmation",
                defaultMessage: "Update memory? {memoryText}",
                values: {
                    memoryText: o.jsx("div", {
                        className: "inline-block py-1",
                        onMouseOver: () => r.handleTogglePopover(!0),
                        onMouseOut: () => r.handleTogglePopover(!1),
                        children: o.jsx(X, {
                            memoryWrites: n,
                            popoverState: r,
                            disableActions: s,
                            triggerButton: o.jsx("button", {
                                className: V("text-start font-normal", r.isPopoverOpen ? "text-token-text-secondary" : "text-token-text-tertiary"),
                                children: o.jsx(c, {
                                    id: "MemoryActionResult.memoryWrapper",
                                    defaultMessage: "“{memoryWrites}”",
                                    values: {
                                        memoryWrites: f
                                    }
                                })
                            }),
                            setShowMemoriesModal: i
                        })
                    })
                }
            })
        }), o.jsx(L, {
            className: "text-token-text-tertiary hover:text-token-text-primary ms-3",
            size: "small",
            color: "secondary",
            disabled: d,
            onClick: () => {
                p(!0)
            },
            children: o.jsx(c, {
                id: "MemoryActionResult.confirm",
                defaultMessage: "Yes"
            })
        }), o.jsx(L, {
            className: "text-token-text-tertiary hover:text-token-text-primary ms-2",
            size: "small",
            color: "secondary",
            disabled: d,
            onClick: () => {
                p(!1)
            },
            children: o.jsx(c, {
                id: "MemoryActionResult.deny",
                defaultMessage: "No"
            })
        })]
    })
}

function z({
    memoryWrites: t,
    popoverState: e,
    isParagen: n,
    memoryUndoId: r,
    gizmoId: i,
    setShowMemoriesModal: s,
    showTooltip: a,
    disableActions: l
}) {
    const d = Ce(),
        {
            eligible: m,
            isLoading: f
        } = we(P.hasSeenMemoryUpdatedTooltip),
        p = !C(_e),
        [y, g] = u.useState(!1),
        h = be() ? .hasPlusFeatures();
    return u.useEffect(() => {
        !f && m && d && a === !0 && !q ? (g(!0), q = !0) : !f && !m && g(!1)
    }, [a, f, m, d]), t.length === 0 ? null : o.jsxs("div", {
        className: "flex items-center",
        children: [o.jsx(Re, {
            announcementKey: P.hasSeenMemoryUpdatedTooltip,
            show: y,
            onDismiss: () => {
                ke(P.hasSeenMemoryUpdatedTooltip), k.logEventWithStatsig("Memory Updated Tooltip Dismissed", "memory_updated_tooltip_dismissed")
            },
            dismissOnOutsideClick: !0,
            side: p ? "bottom" : "left",
            sideOffset: 4,
            theme: "bright",
            badge: "none",
            title: o.jsx(c, {
                id: "MoonshineV2Tooltip.heading",
                defaultMessage: "Memory in ChatGPT has changed"
            }),
            description: o.jsxs(o.Fragment, {
                children: [h ? o.jsx(c, {
                    id: "MoonshineV2Tooltip.description",
                    defaultMessage: "ChatGPT can now reference all chats, but you can still manage individual saved memories."
                }) : o.jsx(c, {
                    id: "MoonshineV2Tooltip.description.freeMoonshine",
                    defaultMessage: "ChatGPT can now reference recent chats, but you can still manage individual saved memories."
                }), o.jsx("br", {}), o.jsx("a", {
                    href: "https://help.openai.com/en/articles/10303002-how-does-memory-use-past-conversations",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "underline",
                    children: o.jsx(c, {
                        id: "MoonshineV2Tooltip.learnMoreLink",
                        defaultMessage: "Learn more"
                    })
                }, "learn-more-link")]
            }),
            children: o.jsx("div", {
                style: {
                    width: 1,
                    height: 1
                }
            })
        }), o.jsx("div", {
            className: "inline-block",
            onMouseOver: () => e.handleTogglePopover(!0),
            onMouseOut: () => e.handleTogglePopover(!1),
            children: o.jsx(X, {
                memoryWrites: t,
                popoverState: e,
                isParagen: n,
                gizmoId: i,
                memoryUndoId: r,
                disableActions: l,
                triggerButton: o.jsxs("button", {
                    className: V("my-1 flex items-center gap-1 text-sm font-semibold outline-hidden", e.isPopoverOpen ? "text-token-text-secondary" : "text-token-text-tertiary"),
                    children: [o.jsx(Ue, {
                        className: "mb-[-1px]"
                    }), t.length === 1 ? o.jsx(c, {
                        id: "MemoryActionResult.memoryWriteSingular.New",
                        defaultMessage: "Updated saved memory"
                    }) : o.jsx(c, {
                        id: "MemoryActionResult.memoryWritePlural.New",
                        defaultMessage: "Updated saved memories"
                    })]
                }),
                setShowMemoriesModal: s
            })
        })]
    })
}

function De(t) {
    const e = Y(t),
        n = e ? .metadata ? .pending_memory_info ? .confirm_result;
    return e == null ? null : n === !0 ? "confirmed" : n === !1 ? "denied" : "pending"
}

function Ke(t) {
    return t.some(e => e.author.role === M.Tool && e.author.name === "bio" && e.metadata ? .memory_write_failure_reason != null)
}

function Qe(t) {
    "use forget";
    const e = D.c(3),
        [n, r] = u.useState(!1),
        i = u.useRef(!1);
    let s, a;
    return e[0] !== t ? (s = () => {
        t && i.current === !1 && (i.current = !0, r(!0))
    }, a = [t], e[0] = t, e[1] = s, e[2] = a) : (s = e[1], a = e[2]), u.useEffect(s, a), n
}

function Ve(t, e) {
    "use forget";
    const n = D.c(5),
        r = Pe(),
        [i, s] = u.useState(!1);
    let a, l;
    return n[0] !== t || n[1] !== e || n[2] !== r ? (a = () => {
        if (!t) {
            s(!1);
            return
        }
        s(!1);
        const d = r(() => {
            s(!0)
        }, e);
        return () => {
            clearTimeout(d)
        }
    }, l = [t, e, r], n[0] = t, n[1] = e, n[2] = r, n[3] = a, n[4] = l) : (a = n[3], l = n[4]), u.useEffect(a, l), i
}

function ct({
    messages: t,
    clientThreadId: e,
    gizmoResource: n,
    isParagen: r
}) {
    const i = n ? .gizmo.id,
        s = Fe(t),
        a = Be(s),
        l = Ge(t),
        d = qe(t),
        m = C(() => de());
    ze(s);
    const f = G != null && ce() ? G : null,
        p = Y(t),
        g = w("3983984123").get("is_memory_undo_enabled", !1),
        h = w("612957800").get("show_updating_memory_msg", !1);
    me("1900515849");
    const j = je(),
        Z = K(e),
        T = C(() => ue(Z)),
        x = Qe(l),
        O = B();
    u.useEffect(() => {
        !l && !p && d && x && O.invalidateQueries({
            queryKey: [R, i]
        })
    }, [l, p, d, x, i, O]);
    const {
        data: N
    } = ie({
        queryKey: [R, i],
        queryFn: () => $.getCurrentMemoryUndoId(i),
        enabled: g && !l && !p
    }), [S, _] = u.useState(!1), v = De(t), U = Ke(t), ee = U === !1 && !l && x && s.length === 0 && v !== "pending", te = Ve(ee, We), oe = U === !1 && (l || x && s.length === 0 && v !== "pending" && te === !1), A = h && oe, ne = s.length > 0, se = A || ne, re = A ? "memory-updating" : "memory-saved";
    return v === "denied" ? null : o.jsxs(o.Fragment, {
        children: [v === "pending" ? o.jsx(He, {
            clientThreadId: e,
            memoryWrites: s,
            popoverState: a,
            setShowMemoriesModal: _,
            pendingMessage: p,
            disableActions: m
        }) : h && se ? o.jsx("div", {
            className: "relative my-1",
            style: {
                minHeight: "1.5em"
            },
            children: o.jsx(fe, {
                mode: "sync",
                initial: !1,
                children: o.jsx(pe.div, {
                    className: "absolute inset-0",
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
                        duration: .15,
                        ease: "easeOut"
                    },
                    children: A ? o.jsx(Te, {
                        highlightedCommand: o.jsx("span", {
                            className: "text-token-text-secondary",
                            children: o.jsx(c, {
                                id: "MemoryActionResult.updatingMemory",
                                defaultMessage: "Updating memory"
                            })
                        }),
                        status: Se.Running
                    }) : o.jsx(z, {
                        memoryWrites: s,
                        popoverState: a,
                        isParagen: r,
                        memoryUndoId: N ? .current_memory_undo_id === d ? d : void 0,
                        setShowMemoriesModal: _,
                        showTooltip: x && s.length > 0,
                        disableActions: m
                    })
                }, re)
            })
        }) : o.jsx(z, {
            memoryWrites: s,
            popoverState: a,
            isParagen: r,
            memoryUndoId: N ? .current_memory_undo_id === d ? d : void 0,
            setShowMemoriesModal: _,
            showTooltip: x && s.length > 0,
            disableActions: m
        }), S ? f ? o.jsx(f, {
            isOpen: S,
            onClose: () => _(!1),
            initialContextScope: T ? .includes("HEALTH") ? "HEALTH" : null
        }) : j ? o.jsx(Ie, {
            isOpen: S,
            initialGizmoId: i,
            contextScopes: T,
            onClose: () => _(!1)
        }) : o.jsx(Le, {
            initialGizmoId: i,
            contextScopes: T,
            onClose: () => _(!1)
        }) : null]
    })
}

function J({
    children: t,
    disabled: e,
    onClick: n
}) {
    return o.jsxs("button", {
        className: "hover:bg-token-main-surface-secondary flex w-full items-center justify-between rounded-sm px-3 py-2 font-semibold",
        disabled: e,
        onClick: n,
        children: [t, o.jsx(Ne, {
            className: "icon text-token-text-tertiary -me-1"
        })]
    })
}

function $e({
    gizmoId: t,
    memoryUndoId: e
}) {
    const r = w("3983984123").get("is_memory_undo_enabled", !1),
        i = B(),
        {
            isPending: s,
            mutate: a
        } = le({
            mutationFn: l => $.undoMemoryWrite(t, l),
            onSuccess: () => {
                i.invalidateQueries({
                    queryKey: [R, t]
                })
            }
        });
    return !r || !e ? null : o.jsx(J, {
        disabled: s,
        onClick: () => {
            e && a(e)
        },
        children: o.jsx(c, {
            id: "qeyS8G",
            defaultMessage: "Undo"
        })
    })
}

function Ye(t) {
    const e = ["The user ", "The user's ", "User ", "User's "];
    for (const n of e)
        if (t.startsWith(n)) return t.slice(n.length);
    return t
}
export {
    ct as MemoryActionResult
};
//# sourceMappingURL=9c5a2fed-mtogxpsrx5su7i10.js.map