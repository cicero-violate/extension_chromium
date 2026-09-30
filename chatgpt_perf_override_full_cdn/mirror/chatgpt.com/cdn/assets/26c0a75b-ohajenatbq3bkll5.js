const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/18798b51-buxslks8xx71fqtp.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/a8077c3c-l0ditq4z8me4vohx.js", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/conversation-small-cqp6votf.css", "assets/b18bdd4a-kpo01h4d6nyizg3k.js", "assets/a600b597-fg22mch80zotjngg.js", "assets/5ff05818-cf0xcd1p0waiidym.js", "assets/84e8f385-lndtlkfi7kijfbdy.js", "assets/7f00cfec-f04y2v5idy58f22s.js", "assets/b9ebfa06-dm8xq0zfweyjlyrr.js", "assets/05574d3d-ch7z14vjotjhkelg.js", "assets/58ea7b30-dr4b9ejy8mhyg98s.js", "assets/1de975ca-kqz8utvd9bymuv6h.js"]))) => i.map(i => d[i]);
import {
    j as e,
    o as n,
    _ as b,
    r as le,
    f as $,
    c as Ke,
    s as me,
    u as Qe,
    x as Xe,
    p as Je,
    h as Ze
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    fc as s,
    _ as k,
    u7 as We,
    e as A,
    dA as et,
    dz as tt,
    ch as T,
    gb as ue,
    yV as ot,
    yW as st,
    yX as nt,
    yY as at,
    av as it,
    yZ as rt,
    G as te,
    q as y,
    t4 as dt,
    b1 as H,
    n as he,
    z as pe,
    sY as ct,
    jd as lt,
    bY as _,
    T as mt,
    n_ as ut,
    ty as ge,
    se as ht,
    bX as pt,
    y_ as gt,
    sp as ft,
    l_ as Ct,
    o0 as It,
    x as vt,
    ff as jt,
    cN as St,
    g6 as xt,
    dS as _t,
    rV as oe,
    y$ as bt,
    sI as N,
    g1 as Tt,
    J as Mt,
    dP as Gt,
    be as se,
    cA as Pt,
    kk as wt,
    af as ne,
    fl as zt,
    fm as Et,
    fn as yt,
    i2 as kt,
    fN as R,
    iC as At,
    hY as Ot,
    R as U,
    gS as ae,
    dV as ie,
    f$ as Ft,
    mR as Dt,
    S as Lt,
    np as Vt,
    cD as Nt
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    u as Rt
} from "./6fd89734-e246szx8pk7yijni.js";
import {
    iN as Ut,
    fM as $t,
    iO as fe,
    iP as Ce,
    iQ as Ht,
    iR as Bt,
    iS as Yt,
    b7 as qt,
    c_ as Kt,
    iT as Qt,
    iU as Xt,
    ca as Jt,
    aX as Zt,
    ef as Ie,
    gM as ve,
    iV as Wt,
    iW as eo,
    iX as to,
    iY as oo,
    h7 as so,
    d5 as re,
    iZ as no,
    i_ as ao,
    i$ as io,
    j0 as ro,
    j1 as de,
    bH as co,
    j2 as lo,
    j3 as mo,
    j4 as uo,
    j5 as ho,
    j6 as po,
    j7 as ce,
    j8 as go,
    gO as fo,
    j9 as Co,
    ja as Io,
    jb as vo,
    b_ as jo,
    jc as So,
    dm as xo,
    fe as _o,
    jd as bo,
    di as To,
    je as Mo,
    cj as Go,
    jf as Po,
    d4 as wo,
    fA as zo
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    T as Eo,
    g as yo,
    u as ko
} from "./c41e33f5-ibnnr1vsfllithl8.js";

function Ao(o, t, h) {
    const {
        conversationVersion$: c
    } = We(o), l = A(() => yo({
        currentModelId: tt(o).id,
        currentVersionId: c(),
        modelsData: et(o)
    }).modelLabel), u = Ut(), m = ko(o, u, void 0, t, h);
    return {
        modelLabel: l,
        dropdownSections: m
    }
}

function Oo({
    show: o,
    conversation: t,
    gizmoHasCustomActions: h,
    preferredModelId: c
}) {
    const {
        modelLabel: l,
        dropdownSections: u
    } = Ao(t, h, c);
    return o ? e.jsxs(s.Sub, {
        onOpenChange: m => {
            m && k.logEvent("GPTs: Breadcrumb Picker Model Picker Open")
        },
        children: [e.jsx(s.SubMenuTrigger, {
            children: e.jsxs("div", {
                className: "flex w-full items-center justify-between gap-1",
                children: [e.jsx(n, {
                    id: "ilkdMh",
                    defaultMessage: "Model"
                }), e.jsx("span", {
                    className: "text-token-text-secondary text-xs font-medium",
                    children: l
                })]
            })
        }), e.jsx(s.Portal, {
            children: e.jsx(s.SubContent, {
                onClick: () => {
                    k.logEvent("GPTs: Breadcrumb Picker Model Picker Select")
                },
                children: e.jsx(Eo, {
                    sections: u
                })
            })
        })]
    }) : null
}
const Fo = T(() => b(() =>
        import ("./18798b51-buxslks8xx71fqtp.js"), __vite__mapDeps([0, 1, 2, 3]))),
    Do = T(() => b(() =>
        import ("./a8077c3c-l0ditq4z8me4vohx.js"), __vite__mapDeps([4, 1, 2, 3, 5, 6])).then(o => o.GizmoKeepInSidebarMenuItem)),
    Lo = T(() => b(() =>
        import ("./b18bdd4a-kpo01h4d6nyizg3k.js"), __vite__mapDeps([7, 1, 5, 2, 3, 6])).then(o => o.DeleteConversationConfirmationModalContainer)),
    Vo = T(() => b(() =>
        import ("./a600b597-fg22mch80zotjngg.js").then(o => o.c), __vite__mapDeps([8, 1, 2, 3, 5, 6, 9, 10, 11, 12])).then(o => o.GizmoDetailsModal)),
    No = T(() => b(() =>
        import ("./05574d3d-ch7z14vjotjhkelg.js"), __vite__mapDeps([13, 1, 2, 3, 5, 6])).then(o => o.default)),
    Ro = T(() => b(() =>
        import ("./58ea7b30-dr4b9ejy8mhyg98s.js"), __vite__mapDeps([14, 1, 2, 3, 5, 6])).then(o => o.default)),
    Uo = T(() => b(() =>
        import ("./1a7ebd5f-csmwtrlxfshzkvs8.js").then(o => o.QF), __vite__mapDeps([5, 1, 2, 3, 6])).then(o => o.default)),
    $o = T(() => b(() =>
        import ("./1de975ca-kqz8utvd9bymuv6h.js"), __vite__mapDeps([15, 1, 2, 3, 5, 6])).then(o => o.ThreadReportConversationModal));

function Ho(o) {
    "use forget";
    const t = Ke.c(8),
        {
            children: h,
            conversation: c,
            gizmoResource: l,
            showReportModal: u,
            showGizmoModelPicker: m
        } = o;
    let g;
    t[0] !== c || t[1] !== l || t[2] !== m || t[3] !== u ? (g = e.jsx(je, {
        conversation: c,
        gizmoResource: l,
        showReportModal: u,
        showGizmoModelPicker: m
    }), t[0] = c, t[1] = l, t[2] = m, t[3] = u, t[4] = g) : g = t[4];
    let C;
    return t[5] !== h || t[6] !== g ? (C = e.jsx(e.Fragment, {
        children: e.jsx(ue, {
            size: "small",
            triggerButton: h,
            children: g
        })
    }), t[5] = h, t[6] = g, t[7] = C) : C = t[7], C
}

function je({
    conversation: o,
    gizmoResource: t,
    showReportModal: h,
    showGizmoModelPicker: c
}) {
    const {
        canEdit: l
    } = ot(t), {
        canCreate: u
    } = st(), {
        canViewConfig: m
    } = nt(t), g = at(t.gizmo.id), C = it(), M = rt(t), I = t.gizmo.share_recipient === te.Marketplace || t.gizmo.share_recipient === te.Link, r = !M && I, S = y("1825130190") && !M && dt(t), P = C ? .includes(H.GizmoSupportEmails) && !M && t.gizmo.author.will_receive_support_emails && S, v = $t(), f = A(o.serverId$), w = fe(H.WorkspaceShareLinks), {
        onShare: i
    } = Ce({
        clientThreadId: o.id,
        serverThreadId: f ? ? void 0,
        gizmoId: t.gizmo.id,
        gizmo: t
    }), O = w && f && he(), G = me(), D = pe(), z = Ht();
    return e.jsxs(e.Fragment, {
        children: [e.jsx(Oo, {
            show: c,
            conversation: o,
            gizmoHasCustomActions: ct(t.tools),
            preferredModelId: t.gizmo.default_model ? ? void 0
        }), e.jsx(s.LinkItem, {
            onClick: () => {
                Yt({
                    location: "Gizmo information dropdown",
                    gizmo_id: t.gizmo.id
                })
            },
            to: `/g/${t.gizmo.short_url}`,
            state: z,
            icon: Bt,
            children: e.jsx(n, { ...d.newChat
            })
        }), e.jsx(s.Item, {
            onClick: () => _(Vo, {
                gizmoId: t.gizmo.id,
                creatorId: t.gizmo.author.user_id
            }),
            icon: lt,
            children: e.jsx(n, { ...d.about
            })
        }), t.tools ? .find(j => j.type === mt.JIT_PLUGIN) && e.jsx(s.Item, {
            onClick: () => _(No, {
                gizmo: t
            }),
            icon: qt,
            children: e.jsx(n, { ...d.privacySettings
            })
        }), l && e.jsx(s.Item, {
            onClick: () => {
                G(g)
            },
            icon: ut,
            children: e.jsx(n, { ...d.customize
            })
        }), !l && m && e.jsxs(e.Fragment, {
            children: [e.jsx(s.Item, {
                onClick: () => {
                    G(`/g/${t.gizmo.id}/view`)
                },
                icon: ge,
                children: e.jsx(n, {
                    id: "GizmoInformation.viewGizmoLabel",
                    defaultMessage: "View configuration"
                })
            }), u && e.jsx(s.Item, {
                onClick: async () => {
                    const j = await ht.copyGizmo({
                        gizmoId: t.gizmo.id
                    });
                    j.gizmo.id && G(`/gpts/editor/${j.gizmo.id}`)
                },
                icon: Kt,
                children: e.jsx(n, {
                    id: "GizmoInformation.copyGizmoLabel",
                    defaultMessage: "Duplicate GPT"
                })
            })]
        }), e.jsx(Do, {
            gizmoResource: t,
            location: "conversation_page"
        }), e.jsx(Qt, {
            gizmoResource: t
        }), e.jsx(Xt, {
            gizmoResource: t,
            canEdit: l
        }), P && e.jsx(s.Item, {
            onClick: () => _(Ro, {
                gizmo: t
            }),
            icon: Jt,
            children: e.jsx(n, { ...d.feedbackEmail
            })
        }), S && e.jsx(s.Item, {
            onClick: () => _(Uo, {
                gizmo: t
            }),
            icon: Zt,
            children: e.jsx(n, { ...d.reviewGPT
            })
        }), r && e.jsx(s.Item, {
            onClick: h,
            icon: Ie,
            children: e.jsx(n, { ...d.reportGPT
            })
        }), O && e.jsx(s.Item, {
            onClick: i,
            icon: ve,
            children: e.jsx(n, { ...d.shareChat
            })
        }), v && e.jsxs(e.Fragment, {
            children: [e.jsx(s.Separator, {}), e.jsx(s.Item, {
                color: "danger",
                onClick: () => {
                    _(Fo, {
                        gpt: t,
                        account: D,
                        isOpen: !0
                    })
                },
                icon: pt,
                children: e.jsx(n, {
                    defaultMessage: "Remove GPT from workspace",
                    id: "GizmoInformation.removeGPT"
                })
            })]
        }), C ? .includes("debug") && e.jsxs(e.Fragment, {
            children: [e.jsx(s.Separator, {}), e.jsx(s.Item, {
                onClick: () => {
                    G(gt(t))
                },
                children: "(Internal) See share page"
            })]
        })]
    })
}
const Bo = ({
    conversation: o,
    isActiveConversation: t,
    inMainScreen: h = !1,
    inChatWindow: c = !1,
    inOrla: l = !1,
    shouldShowAdultSearchToggle: u = !1,
    restoreFocusAfterPinToggle: m
}) => {
    const g = Ot(),
        C = ft(),
        M = pe(),
        I = o.id,
        r = o.gizmo_id,
        p = A(() => r ? Ct(g, r).gizmo$() : null),
        S = It(r),
        P = y("3376455464"),
        v = vt("1030729005").get("chatgpt_conversation_reporting_disabled", !1),
        f = A(jt),
        w = y("2322626856"),
        i = St(I),
        O = fe(H.WorkspaceShareLinks),
        G = !he(),
        D = xt(),
        z = "owner" in o ? o.owner ? .user_id : null,
        j = z == null || z === M ? .normalizedAccountUserId,
        [Se, B, xe, _e] = _t(I, a => [a ? .isStarred, a ? .continuingFromSharedProjectConversationId, Wt(a ? .mode, r ? ? void 0), eo(a)]),
        {
            onShare: be
        } = Ce({
            clientThreadId: I,
            gizmoId: r,
            ownerUserId: z,
            gizmo: p,
            serverThreadId: i ? ? void 0,
            location: "History Item Menu"
        }),
        Te = O && (i ? ? B) && !G,
        Me = !!p && oe(p),
        Ge = bt(),
        Y = Me && Ge && !N(p),
        Pe = r == null && B == null,
        we = C.hasAccess && !G && O && i != null && !f && j && (Pe || Y) && !_e,
        F = Se ? ? !!o.is_starred,
        q = Qe(),
        K = p && S ? oe(p) : !1;
    let E = null;
    const {
        projects: ze
    } = Tt();
    E = ze;
    let Q = null;
    S && E && (Q = E.find(({
        gizmo: a
    }) => a.gizmo.id === r) ? .gizmo);
    const L = to(),
        {
            mutate: Ee
        } = oo(),
        X = Xe(),
        ye = y("4027353239"),
        {
            eligible: ke
        } = so(re.ArchiveConversationOnboarding),
        Ae = Mt(),
        Oe = me(),
        [, Fe] = Je(),
        {
            isAdultSearchEnabled: J,
            handleToggleSetting: De
        } = Rt({
            conversationMode: xe
        }),
        [V, Le] = no(),
        Ve = () => Po() && Ft() && !Dt(),
        Ne = async () => {
            ye ? await U.safePost("/conversation/{conversation_id}/archive", {
                parameters: {
                    path: {
                        conversation_id: o.id
                    }
                },
                requestBody: {
                    is_archived: !0
                }
            }) : await U.safePatch("/conversation/{conversation_id}", {
                parameters: {
                    path: {
                        conversation_id: o.id
                    }
                },
                requestBody: {
                    is_archived: !0
                }
            }), ie(X, o.gizmo_id), Lt.logEvent("chatgpt_conversation_archived"), k.logEvent("Conversation Archived");
            const a = Vt() && Nt();
            ke && !a && (Ae.info(q.formatMessage({
                defaultMessage: "You can view archived chats in Settings",
                id: "HistoryGizmoItem.archiveChatOnboarding"
            }), {
                duration: 10,
                hasCloseButton: !0
            }), wo(re.ArchiveConversationOnboarding)), t && zo(Oe)
        },
        Re = async () => {
            i && (await U.safePost("/conversation/{conversation_id}/convert_temporary", {
                parameters: {
                    path: {
                        conversation_id: i
                    }
                }
            }), Fe(a => (a.has(ae) && a.delete(ae), a), {
                replace: !0
            }), await Go(i, {
                skipIfExisting: !1,
                source: "temporary_chat_convert"
            }), ie(X, o.gizmo_id))
        },
        Ue = () => {
            const a = !F;
            Ee({
                conversation: o,
                isStarred: a
            }), m ? .(), k.logEvent(a ? "Conversation Pinned" : "Conversation Unpinned")
        },
        $e = ao(),
        He = A(() => {
            if (!Gt()) return !1;
            const a = se(I);
            return Pt(a)
        }),
        Z = [f && t && w && e.jsx(s.Item, {
            disabled: !i,
            onClick: Re,
            icon: io,
            children: e.jsx(n, { ...d.saveChat
            })
        }, "save-temporary-chat"), Te && e.jsx(wt, {
            as: s.Item,
            className$: () => ne(c && !He && "sm:hidden"),
            onClick: be,
            icon: ve,
            "data-testid": "share-chat-menu-item",
            children: e.jsx(n, { ...d.shareChat
            })
        }, "share"), we && e.jsx(s.Item, {
            onClick: () => {
                if (!i || de == null) return;
                k.logStructuredEvent(zt, {
                    step: yt.GROUP_CHATS_INVITE_ACTIONS_STEP_CLICK_ADD_PEOPLE_BUTTON,
                    source: Et.GROUP_CHATS_INVITE_ACTIONS_SOURCE_CONVERSATION_DROPDOWN_MENU,
                    originalConversationId: i
                }), _(de, Y && r ? {
                    type: "from-shared-project",
                    serverThreadId: i,
                    projectId: r,
                    source: "sidebar"
                } : {
                    type: "from-conversation",
                    serverThreadId: i,
                    source: "sidebar"
                })
            },
            icon: ro,
            children: e.jsx(n, {
                id: "2lQyjA",
                defaultMessage: "Start a group chat"
            })
        }, "start-group-chat"), !c && !l && j && e.jsx(s.Item, {
            disabled: !i,
            onClick: () => {
                setTimeout(() => {
                    i && lo.publish({
                        kind: h ? "editTitleInMainScreen" : "editTitle",
                        serverThreadId: i
                    })
                }, 100)
            },
            icon: co,
            children: e.jsx(n, { ...d.renameChat
            })
        }, "rename"), kt() && t && c && e.jsx(s.Item, {
            onClick: () => {
                const a = se(I);
                uo(a, {
                    type: "conversationFiles"
                })
            },
            icon: mo,
            children: e.jsx(n, { ...d.viewFiles
            })
        }, "view-files"), D && !f && j && E && E ? .length > 0 && ho(r, F) && i && !N(p) && e.jsxs($.Fragment, {
            children: [S && e.jsxs(e.Fragment, {
                children: [E.length > 1 && e.jsxs(s.Sub, {
                    children: [e.jsx(s.SubMenuTrigger, {
                        icon: po,
                        children: e.jsx(n, { ...R.moveConversationToProject
                        })
                    }), e.jsx(s.Portal, {
                        children: e.jsx(s.SubContent, {
                            children: e.jsx(ce, {
                                inSidebarFlyout: !1,
                                onUpdateConversationGizmo: a => L({
                                    newGizmoId: a,
                                    conversation: o,
                                    previousGizmoId: r ? ? null
                                }),
                                currentGizmoId: r
                            })
                        })
                    })]
                }), e.jsx(s.Item, {
                    onClick: () => {
                        L({
                            newGizmoId: null,
                            conversation: o,
                            previousGizmoId: r ? ? null
                        })
                    },
                    icon: go,
                    children: e.jsx("div", {
                        className: "overflow-hidden text-ellipsis whitespace-nowrap",
                        children: e.jsx(n, { ...R.removeConversationFromProject,
                            values: {
                                projectName: Q ? .gizmo.display.name ? ? "project"
                            }
                        })
                    })
                })]
            }), !S && !N(p) && e.jsxs(s.Sub, {
                children: [e.jsx(s.SubMenuTrigger, {
                    icon: fo,
                    children: q.formatMessage(R.moveConversationToProject)
                }), e.jsx(s.Portal, {
                    children: e.jsx(s.SubContent, {
                        children: e.jsx(ce, {
                            inSidebarFlyout: !1,
                            onUpdateConversationGizmo: a => L({
                                newGizmoId: a,
                                conversation: o,
                                previousGizmoId: r ? ? null
                            })
                        })
                    })
                })]
            })]
        }, "snorlax")].filter(Boolean),
        {
            automationId: W,
            sourceMessageId: Be
        } = le.useContext(Co),
        Ye = y("3018147683"),
        x = {
            topItems: Z.length > 0,
            odysseyItem: !!W || !W && !!Be,
            pinItem: !r && !f,
            tocToggleItem$: Ve,
            reportItem: P && !v && (c || K),
            archiveItem: j && !f,
            deleteItem: j && !f,
            toggleAdultSearchItem: u
        };
    return Object.values(x).some(Boolean) ? e.jsxs(e.Fragment, {
        children: [x.topItems && e.jsxs(e.Fragment, {
            children: [Z, e.jsx(s.Separator, {
                className: ne("first:hidden last:hidden", c && "sm:hidden")
            })]
        }), u && e.jsx(s.Item, {
            onClick: () => De(!J),
            icon: Io,
            children: J ? e.jsx(n, { ...d.hideMatureContent
            }) : e.jsx(n, { ...d.showMatureContent
            })
        }, "adult-search-toggle"), x.odysseyItem && e.jsx(vo, {
            children: ({
                openScheduleModal: a,
                isScheduled: ee,
                isSchedulable: qe
            }) => (qe || ee) && e.jsx(s.Item, {
                onClick: a,
                disabled: !i,
                icon: jo,
                children: e.jsx(n, { ...ee ? d.editSchedule : d.scheduleTask
                })
            })
        }), x.pinItem && e.jsx(s.Item, {
            disabled: !i,
            onClick: Ue,
            icon: F ? So : xo,
            children: e.jsx(n, { ...F ? d.unpinChat : d.pinChat
            })
        }), e.jsx(At, {
            when$: x.tocToggleItem$,
            children: e.jsx(s.Item, {
                onClick: () => Le(!V),
                icon: V ? ge : _o,
                children: V ? e.jsx(n, {
                    id: "TableOfContents.Menu.Show",
                    defaultMessage: "Show table of contents"
                }) : e.jsx(n, {
                    id: "TableOfContents.Menu.Hide",
                    defaultMessage: "Hide table of contents"
                })
            }, "toc-toggle")
        }), x.archiveItem && e.jsx(s.Item, {
            disabled: !i,
            onClick: () => {
                i && Ne()
            },
            icon: bo,
            children: e.jsx(n, { ...d.archiveChat
            })
        }), x.reportItem && e.jsx(s.Item, {
            icon: Ie,
            onClick: () => _($o, {
                clientThreadId: I,
                isSharedConversation: $e,
                ...K && {
                    projectId: r,
                    conversationOwnerId: z
                },
                isStaticSharedThread: !1
            }),
            children: r ? e.jsx(n, {
                id: "thread.reportConversation",
                defaultMessage: "Report conversation"
            }) : e.jsx(n, {
                id: "thread.report",
                defaultMessage: "Report"
            })
        }), x.deleteItem && e.jsx(s.Item, {
            color: "danger",
            disabled: !i,
            onClick: () => {
                i && _(Lo, {
                    conversationTitle: o.title,
                    serverThreadId: i,
                    isActiveConversation: t,
                    gizmoId: r
                })
            },
            icon: To,
            "data-testid": "delete-chat-menu-item",
            children: e.jsx(n, { ...d.deleteChat
            })
        }), Ye && e.jsx(Mo, {
            conversationId: o.id,
            isActiveConversation: t
        })]
    }) : null
};

function Yo({
    clientThreadId: o,
    gizmoId: t,
    conversationTitle: h,
    conversationAsyncStatus: c,
    isDoNotRemember: l,
    isStarred: u,
    owner: m = null
}) {
    return {
        id: o,
        title: h ? ? "",
        create_time: null,
        update_time: null,
        owner: m,
        conversation_template_id: null,
        async_status: c ? ? null,
        gizmo_id: t ? ? null,
        snippet: null,
        is_do_not_remember: l,
        is_starred: u
    }
}
const qo = ({
        conversation: o,
        children: t,
        isActiveConversation: h,
        onOpenChange: c,
        findRestoreFocusTarget: l,
        inMainScreen: u = !1,
        inChatWindow: m = !1,
        inOrla: g = !1,
        shouldShowAdultSearchToggle: C = !1,
        ...M
    }) => {
        const [I, r] = le.useState(!1), p = $.useRef(null), S = $.useCallback(() => {
            const v = f => {
                requestAnimationFrame(() => {
                    const w = p.current ? .isConnected === !0 ? p.current : l ? .() ? ? null;
                    if (w != null) {
                        w.focus({
                            preventScroll: !0
                        });
                        return
                    }
                    f > 0 && v(f - 1)
                })
            };
            v(4)
        }, [l]), P = Bo({
            conversation: o,
            inMainScreen: u,
            isActiveConversation: h,
            inChatWindow: m,
            inOrla: g,
            shouldShowAdultSearchToggle: C,
            restoreFocusAfterPinToggle: S
        });
        return e.jsx(ue, { ...M,
            open: I,
            onOpenChange: v => {
                v && document.activeElement instanceof HTMLElement && document.activeElement !== document.body && (p.current = document.activeElement), r(v), c ? .(v)
            },
            side: "bottom",
            contentAlign: m ? "end" : "start",
            alignOffset: m ? 0 : -8,
            sideOffset: m ? 0 : -4,
            triggerButton: P ? t : void 0,
            size: "auto",
            children: I && e.jsx(e.Fragment, {
                children: P
            })
        })
    },
    d = Ze({
        newChat: {
            defaultMessage: "New chat",
            id: "GizmoInformation.newChat"
        },
        about: {
            defaultMessage: "About",
            id: "GizmoInformation.about"
        },
        privacySettings: {
            defaultMessage: "Privacy settings",
            id: "GizmoInformation.privacySettings"
        },
        customize: {
            defaultMessage: "Edit GPT",
            id: "GizmoInformation.customize"
        },
        feedbackEmail: {
            defaultMessage: "Send feedback",
            id: "GizmoInformation.feedbackEmail"
        },
        reviewGPT: {
            defaultMessage: "Review GPT",
            id: "GizmoInformation.reviewGPT"
        },
        reportGPT: {
            defaultMessage: "Report GPT",
            id: "GizmoInformation.reportGPT"
        },
        deleteChat: {
            defaultMessage: "Delete",
            id: "GizmoInformation.deleteChat.0"
        },
        renameChat: {
            defaultMessage: "Rename",
            id: "GizmoInformation.renameChat"
        },
        viewFiles: {
            defaultMessage: "View files in chat",
            id: "GizmoInformation.viewFiles"
        },
        scheduleTask: {
            id: "7e1pG9",
            defaultMessage: "Schedule"
        },
        editSchedule: {
            id: "qzM4nO",
            defaultMessage: "Edit schedule"
        },
        archiveChat: {
            defaultMessage: "Archive",
            id: "GizmoInformation.archiveChat.0"
        },
        shareChat: {
            defaultMessage: "Share",
            id: "GizmoInformation.shareChat"
        },
        saveChat: {
            id: "s3KGQw",
            defaultMessage: "Save chat"
        },
        pinChat: {
            defaultMessage: "Pin chat",
            id: "GizmoInformation.pinChat"
        },
        unpinChat: {
            defaultMessage: "Unpin chat",
            id: "GizmoInformation.unpinChat"
        },
        showMatureContent: {
            defaultMessage: "Show mature content",
            id: "GizmoInformation.showMatureContent"
        },
        hideMatureContent: {
            defaultMessage: "Hide mature content",
            id: "GizmoInformation.hideMatureContent"
        }
    }),
    Wo = Object.freeze(Object.defineProperty({
        __proto__: null,
        GizmoConversationOptionsDropdown: qo,
        GizmoInformationDropdown: Ho,
        GizmoInformationDropdownItems: je,
        buildConversationResponse: Yo
    }, Symbol.toStringTag, {
        value: "Module"
    }));
export {
    qo as G, Wo as a, Yo as b, Ao as u
};
//# sourceMappingURL=26c0a75b-ohajenatbq3bkll5.js.map