import {
    j as a,
    h as Dt,
    u as q,
    x as Yt,
    r as y,
    y as zt,
    o as oe,
    c as ye,
    z as Ms,
    s as Xt
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    J as Jt,
    aw as jt,
    cf as Zt,
    aN as Cs,
    fk as Bt,
    k as ys,
    yF as vs,
    nK as es,
    e as Ot,
    rv as ts,
    zk as ss,
    ej as as,
    hO as ns,
    a0 as os,
    cz as Wt,
    z as Es,
    aO as Nt,
    W as Ss,
    fc as J,
    af as it,
    bX as ks,
    i6 as Ts,
    ie as _s,
    i7 as As,
    i8 as Is,
    ib as Rs,
    ey as D,
    Ez as js,
    EA as Os,
    EC as Se,
    ED as Ns,
    EE as Ps,
    g$ as Ds,
    o4 as Pt,
    bO as Bs,
    bY as Fs,
    bW as Ls,
    dL as Ws,
    nE as Us,
    qK as Ut,
    eD as At,
    q as Gs,
    rN as qs,
    jo as at,
    bL as Hs,
    eG as Qs,
    fu as Vs,
    ol as $s,
    no as Gt,
    bi as It,
    pS as Ks,
    ok as Ys,
    eH as zs,
    Ib as Xs
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    e6 as Js,
    hq as ke,
    hZ as k,
    bI as Zs,
    DJ as ea,
    DK as ta,
    h2 as sa,
    DL as qt,
    d4 as aa,
    x$ as na,
    aU as oa,
    kR as is,
    cW as ia,
    DM as ra,
    ck as nt,
    cl as la,
    DN as ca,
    DO as da,
    DP as ua,
    DQ as ma,
    DR as Ht,
    DS as fa,
    DT as pa,
    DU as ha,
    DV as ga,
    DW as ba,
    DX as xa
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import wa from "./d5fa12f2-jwpmhuor5ljwmxl3.js";
import {
    M as Ma
} from "./38e61b13-gvzgb5vtqjj2oi6o.js";
import {
    W as Ce,
    b as Ca,
    d as ya,
    a as Rt,
    w as Qt
} from "./cf64444f-b0z8ffdp5xu532do.js";
import {
    g as va,
    b as Ea,
    C as Sa,
    a as ka,
    W as Ta
} from "./e7a416e4-lwnhgy5dnf3htcv0.js";
import {
    u as _a
} from "./82d09521-lr5i67hbagw70kyh.js";
import {
    B as Aa,
    b as Ia,
    c as Ra,
    d as ja,
    g as Oa,
    f as Na,
    i as rs,
    W as Pa
} from "./0a717d1e-09ybvrr05t1lv0x0.js";
import {
    C as Da
} from "./e8b55dd1-0egvp6sbx7ge01os.js";
import {
    M as Ba,
    n as rt,
    f as Fa,
    s as La,
    o as Wa,
    q as Ua
} from "./af7de5ed-hluw7l4ayzlk3ze4.js";
import {
    s as Vt,
    a as Ga
} from "./79f982eb-ml1kmcaq3unqs1sp.js";
import {
    f as qa
} from "./bd382fd5-bcke632cms89jbha.js";
import {
    u as Ha,
    M as Qa
} from "./94e0eb8c-fpnlthqv7c3yeffk.js";
import {
    s as $t
} from "./943d6b1c-egk9di0nscfiahtx.js";
import {
    b as Va
} from "./f5472ced-1pqcle7qcaqv6l79.js";
import {
    u as $a
} from "./0f28d127-l3kclpo98h76r1qr.js";
import {
    i as Ka
} from "./1951ef38-oh93heirltpqy8iv.js";
import {
    s as Ya
} from "./97db0fda-m2ghqmcv3nlpdg28.js";
const Me = Dt({
        codeLabel: {
            id: "wham.composer.tool.codeLabel",
            defaultMessage: "Code"
        },
        codeSubmitLabel: {
            id: "wham.composer.tool.codeSubmitLabel",
            defaultMessage: "Code"
        },
        codeDescription: {
            id: "wham.composer.tool.codeDescription",
            defaultMessage: "Generate and edit code with full environment setup."
        },
        planLabel: {
            id: "wham.composer.tool.planLabel",
            defaultMessage: "Plan"
        },
        planSubmitLabel: {
            id: "wham.composer.tool.askSubmitLabel",
            defaultMessage: "Plan"
        },
        planDescription: {
            id: "wham.composer.tool.planDescription",
            defaultMessage: "Create a plan you can implement later (no repo changes)."
        }
    }),
    za = [{
        key: "code",
        environmentMode: "code",
        runEnvironmentInQaMode: !1,
        slashCommand: "code",
        icon: a.jsx(wa, {
            className: "icon",
            "aria-hidden": !0
        }),
        analyticsAction: "code",
        messages: {
            label: Me.codeLabel,
            submitLabel: Me.codeSubmitLabel,
            description: Me.codeDescription
        }
    }, {
        key: "plan",
        environmentMode: "ask",
        runEnvironmentInQaMode: !0,
        slashCommand: "plan",
        slashAliases: ["qa", "ask"],
        icon: a.jsx(Ma, {
            className: "icon",
            "aria-hidden": !0
        }),
        analyticsAction: "ask",
        messages: {
            label: Me.planLabel,
            submitLabel: Me.planSubmitLabel,
            description: Me.planDescription
        }
    }];

function Xa({
    taskId: t,
    hasMultipleInProgressOrStreamingTurns: e
}) {
    const o = q(),
        i = Jt(),
        r = Yt(),
        [u, s] = y.useState(!1),
        {
            mutate: l
        } = zt({
            mutationFn: async () => {
                s(!0), await Ce.cancelTask(t)
            },
            onError: () => {
                i.danger(o.formatMessage({
                    id: "wham.whamTaskRow.failedToCancelTask",
                    defaultMessage: "Failed to cancel task"
                }))
            },
            onSuccess: () => {
                r.refetchQueries({
                    queryKey: ["wham", "task", t]
                }), r.invalidateQueries({
                    queryKey: ["wham", "tasks"]
                })
            }
        });
    return a.jsx(jt, {
        color: "primary",
        type: "button",
        size: "small",
        className: e ? void 0 : "h-9 w-9",
        icon: u ? Zt : Js,
        onClick: () => (ke.recordCancel("task-details"), l()),
        disabled: u,
        "aria-label": o.formatMessage({
            id: "wham.composer.cancelTask",
            defaultMessage: "Cancel task"
        }),
        "data-testid": "stop-button",
        children: e && a.jsx(oe, {
            id: "wham.composer.stopButton.multipleInProgressOrStreamingTurns",
            defaultMessage: "Stop all"
        })
    })
}

function ls() {
    "use forget";
    const t = ye.c(21),
        e = k(an),
        o = k(sn),
        i = k(tn),
        r = k(en),
        u = k(Za),
        s = k(Ja),
        l = e ? ? "";
    let d;
    t[0] !== l ? (d = ["wham", "repository", l], t[0] = l, t[1] = d) : d = t[1];
    const f = !!e && s;
    let m;
    t[2] !== e ? (m = () => Ce.getRepository(e ? ? ""), t[2] = e, t[3] = m) : m = t[3];
    let p;
    t[4] !== d || t[5] !== f || t[6] !== m ? (p = {
        queryKey: d,
        enabled: f,
        queryFn: m,
        staleTime: 3e5
    }, t[4] = d, t[5] = f, t[6] = m, t[7] = p) : p = t[7];
    const {
        data: v
    } = Ms(p);
    let h;
    t[8] !== r || t[9] !== i || t[10] !== o || t[11] !== u ? (h = {
        onSuccess: _ => {
            if (!_) return;
            if (o(_.id), !k.getState().branch) {
                const g = va(_);
                i(g)
            }
            r(_.id), u(!1)
        }
    }, t[8] = r, t[9] = i, t[10] = o, t[11] = u, t[12] = h) : h = t[12];
    const {
        mutateAsync: E,
        isPending: T
    } = _a(h);
    let n;
    t[13] !== E || t[14] !== v || t[15] !== e ? (n = async () => {
        const _ = k.getState().environmentId;
        if (_) return _;
        if (!e) throw new Error("Repository is required to create an environment");
        if (!k.getState().useRepositoryAsEnvironment) return _;
        const c = v ? ? await Ce.getRepository(e ? ? "");
        return (await E(Ea(c.id, c.name))).id
    }, t[13] = E, t[14] = v, t[15] = e, t[16] = n) : n = t[16];
    const w = n,
        I = !!e && s;
    let A;
    return t[17] !== w || t[18] !== T || t[19] !== I ? (A = {
        isCreatingEnvironment: T,
        ensureEnvironment: w,
        hasRepository: I
    }, t[17] = w, t[18] = T, t[19] = I, t[20] = A) : A = t[20], A
}

function Ja(t) {
    return t.useRepositoryAsEnvironment
}

function Za(t) {
    return t.setUseRepositoryAsEnvironment
}

function en(t) {
    return t.setAutoCreatedEnvironment
}

function tn(t) {
    return t.setBranch
}

function sn(t) {
    return t.setEnvironmentId
}

function an(t) {
    return t.selectedRepositoryId
}

function nn({
    isSubmitDisabled: t,
    createTask: e,
    selectedTool: o,
    disabledReason: i,
    isFollowUp: r
}) {
    const u = q(),
        s = Cs(),
        [l, d] = y.useState(!1),
        f = k(n => n.environmentId),
        {
            isCreatingEnvironment: m,
            ensureEnvironment: p,
            hasRepository: v
        } = ls(),
        h = !r && !f && v,
        E = y.useCallback(n => {
            ke.recordComposerAction(n ? "ask" : "code"), e({
                runEnvironmentInQaMode: n
            })
        }, [e]),
        T = y.useCallback(async n => {
            if (t) {
                d(!0);
                return
            }
            if (!m) {
                if (h) {
                    try {
                        if (!await p()) return
                    } catch {
                        return
                    }
                    E(n);
                    return
                }
                E(n)
            }
        }, [t, p, m, E, h]);
    return a.jsx("div", {
        className: "flex items-center gap-2 px-2",
        onClick: n => n.stopPropagation(),
        children: a.jsx(Bt, {
            label: i,
            open: s ? l : void 0,
            onOpenChange: d,
            children: a.jsx("button", {
                "aria-label": u.formatMessage(on.submitLabel),
                color: "primary",
                type: "button",
                className: "composer-submit-btn composer-submit-button-color h-9 w-9",
                disabled: (t || m) && !s,
                onClick: t ? () => d(!0) : () => T(o.runEnvironmentInQaMode),
                children: a.jsx(Zs, {
                    className: "icon"
                })
            })
        })
    })
}
const on = Dt({
        submitLabel: {
            id: "gVT0DB",
            defaultMessage: "Submit"
        }
    }),
    rn = 4,
    ln = t => {
        switch (t) {
            case 1:
                return a.jsx(ja, {
                    "aria-hidden": !0,
                    className: "icon-sm"
                });
            case 2:
                return a.jsx(Ra, {
                    "aria-hidden": !0,
                    className: "icon-sm"
                });
            case 3:
                return a.jsx(Ia, {
                    "aria-hidden": !0,
                    className: "icon-sm"
                });
            default:
                return a.jsx(Aa, {
                    "aria-hidden": !0,
                    className: "icon-sm"
                })
        }
    };

function cn(t) {
    "use forget";
    const e = ye.c(33),
        {
            attempts: o,
            setAttempts: i,
            disabled: r,
            disabledReason: u
        } = t,
        s = r === void 0 ? !1 : r,
        l = q(),
        [d, f] = y.useState(!1),
        m = y.useRef(null);
    let p;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (p = () => f(!1), e[0] = p) : p = e[0];
    const v = p;
    let h;
    e[1] !== s || e[2] !== u || e[3] !== l ? (h = s ? u ? ? l.formatMessage({
        id: "wham.attemptsSelector.disabledDefaultTooltip",
        defaultMessage: "This selector is disabled right now."
    }) : l.formatMessage({
        id: "wham.attemptsSelector.tooltip",
        defaultMessage: "Number of simultaneous versions"
    }), e[1] = s, e[2] = u, e[3] = l, e[4] = h) : h = e[4];
    const E = h,
        T = ys("2179180337").value.max_attempts ? ? rn;
    let n, w;
    e[5] !== s ? (n = () => {
        s && f(!1)
    }, w = [s], e[5] = s, e[6] = n, e[7] = w) : (n = e[6], w = e[7]), y.useEffect(n, w);
    const I = s ? !1 : d;
    let A;
    e[8] !== s ? (A = H => {
        s || f(H)
    }, e[8] = s, e[9] = A) : A = e[9];
    const _ = A,
        c = dn,
        g = ea;
    let C;
    e[10] !== o || e[11] !== l ? (C = l.formatMessage({
        id: "wham.attemptsSelector.trigger",
        defaultMessage: "{count}x"
    }, {
        count: o
    }), e[10] = o, e[11] = l, e[12] = C) : C = e[12];
    let x;
    e[13] !== o || e[14] !== l ? (x = l.formatMessage({
        id: "wham.attemptsSelector.ariaLabel",
        defaultMessage: "Open versions number selector, currently set to {count}x"
    }, {
        count: o
    }), e[13] = o, e[14] = l, e[15] = x) : x = e[15];
    let j;
    e[16] !== o ? (j = ln(o), e[16] = o, e[17] = j) : j = e[17];
    let N;
    e[18] !== s || e[19] !== j || e[20] !== C || e[21] !== x || e[22] !== E ? (N = a.jsx(ka, {
        triggerText: C,
        toolTip: E,
        ariaLabel: x,
        Icon: j,
        truncate: !1,
        disabled: s
    }), e[18] = s, e[19] = j, e[20] = C, e[21] = x, e[22] = E, e[23] = N) : N = e[23];
    const Z = !s && a.jsx(Da, {
        align: "start",
        isOpen: I,
        closePopover: v,
        popoverContentRef: m,
        children: a.jsx("div", {
            className: "flex w-50 flex-col rounded-lg p-1.5",
            children: [...Array(T)].map((H, ee) => a.jsx(Sa, {
                className: "w-full",
                onClick: () => {
                    i(ee + 1), v()
                },
                isSelected: o === ee + 1,
                label: l.formatMessage({
                    id: "wham.attemptsSelector.option",
                    defaultMessage: "{count, plural, one {# version} other {# versions}}"
                }, {
                    count: ee + 1
                })
            }, ee + 1))
        })
    });
    let F;
    e[24] !== I || e[25] !== _ || e[26] !== N || e[27] !== Z || e[28] !== g.Popover ? (F = a.jsxs(g.Popover, {
        open: I,
        onOpenChange: _,
        children: [N, Z]
    }), e[24] = I, e[25] = _, e[26] = N, e[27] = Z, e[28] = g.Popover, e[29] = F) : F = e[29];
    let ie;
    return e[30] !== c || e[31] !== F ? (ie = a.jsx(c, {
        children: F
    }), e[30] = c, e[31] = F, e[32] = ie) : ie = e[32], ie
}

function dn({
    children: t
}) {
    const e = q(),
        o = ta(),
        i = Ba(),
        r = o && !o.isLoading && o.eligible && !i.isLoading && !!i.data;
    return a.jsx(sa, {
        side: "bottom",
        theme: "bright",
        dismissOnOutsideClick: !0,
        badge: "new",
        show: r,
        sideOffset: 0,
        className: "w-60",
        announcementKey: qt,
        title: e.formatMessage({
            id: "wham.composerBon.nuxTooltip.title",
            defaultMessage: "Best-of-N"
        }),
        description: e.formatMessage({
            id: "wham.composerBon.nuxTooltip.description",
            defaultMessage: "Generate multiple solutions so you can pick the best approach."
        }),
        onDismiss: () => aa(qt),
        children: t
    })
}

function cs(t) {
    const e = q(),
        {
            data: o
        } = rt(),
        i = Oa(o);
    switch (t) {
        case "enabled":
            return;
        case "rate-limit":
            return e.formatMessage({
                id: "wham.whamComposer.hitRateLimit",
                defaultMessage: "You have reached your rate limit. It will reset at {resetsAfterText}"
            }, {
                resetsAfterText: i != null ? Na(e, i) : void 0
            });
        case "no-environment":
            return e.formatMessage({
                id: "wham.whamComposer.noEnvironment",
                defaultMessage: "No environment selected"
            });
        case "no-content":
            return e.formatMessage({
                id: "wham.whamComposer.noContent",
                defaultMessage: "Enter a prompt to continue"
            });
        case "no-github-connection":
            return e.formatMessage({
                id: "wham.whamComposer.noGitHubConnection",
                defaultMessage: "No GitHub connection"
            });
        case "no-repository":
            return e.formatMessage({
                id: "wham.whamComposer.noRepository",
                defaultMessage: "No repository selected"
            });
        case "connect-github-error":
            return e.formatMessage({
                id: "wham.whamComposer.connectGitHubError",
                defaultMessage: "Failed to load environments"
            });
        default:
            vs(t)
    }
}

function ds({
    isFollowUp: t,
    hasComments: e
}) {
    const {
        data: o
    } = rt(), i = rs(o), r = k(({
        environmentId: h
    }) => h), u = k(({
        selectedRepositoryId: h
    }) => h), s = k(h => h.useRepositoryAsEnvironment), l = k(({
        branch: h
    }) => h), d = es(), m = !Ot(() => ts(d)) || e, {
        isConnected: p,
        error: v
    } = ss(ns.GITHUB_CONNECTOR, "github", "/codex", as.CODEX);
    if (i) return "rate-limit";
    if (!r && !l && !t) {
        if (!s) return "no-environment";
        if (!u) return "no-repository"
    }
    return !t && !p ? "no-github-connection" : !t && v ? "connect-github-error" : m ? "enabled" : "no-content"
}
const un = "/admin/billing",
    mn = "/codex/settings/usage",
    fn = {
        id: "wham.outOfCreditsModal.addCredits",
        defaultMessage: "Add Credits",
        description: "Primary button label for workspace owners when their workspace has no more credits."
    },
    pn = {
        id: "wham.outOfCreditsModal.increaseSpendCap",
        defaultMessage: "Increase Spend Cap",
        description: "Primary button label for workspace owners when their workspace has hit its spend cap."
    },
    hn = {
        id: "wham.outOfCreditsModal.viewUsage",
        defaultMessage: "View Usage",
        description: "Primary button label for viewing Codex usage."
    },
    gn = {
        id: "wham.outOfCreditsModal.creditsExpiredTitle",
        defaultMessage: "Credits expired",
        description: "Title of the modal shown when a usage-based workspace no longer has credits."
    },
    bn = {
        id: "wham.outOfCreditsModal.usageLimitExceededTitle",
        defaultMessage: "Usage limit exceeded",
        description: "Title of the modal shown when a usage-based workspace has hit its spend cap."
    },
    xn = {
        id: "wham.outOfCreditsModal.ownerCreditsExpiredMessage",
        defaultMessage: "Your workspace does not have anymore credits. Please add more to continue.",
        description: "Message shown to workspace owners when their usage-based workspace has no credits remaining."
    },
    wn = {
        id: "wham.outOfCreditsModal.ownerSpendCapMessage",
        defaultMessage: "You have hit your spend cap on your workspace. Please increase it to continue.",
        description: "Message shown to workspace owners when their usage-based workspace has hit the spend cap."
    },
    Mn = {
        id: "wham.outOfCreditsModal.memberCreditsExpiredMessage",
        defaultMessage: "Your workspace does not have anymore credits. Please contact your admin to refill your credits.",
        description: "Message shown to non-owners when their usage-based workspace has no credits remaining."
    },
    Cn = {
        id: "wham.outOfCreditsModal.memberSpendCapMessage",
        defaultMessage: "You have hit your spend cap on your workspace. Please contact a workspace admin to increase your spend cap.",
        description: "Message shown to non-owners when their usage-based workspace has hit the spend cap."
    },
    yn = {
        id: "wham.rateLimitModal.title",
        defaultMessage: "Rate limit reached",
        description: "Title of the modal shown when a user reaches the Codex rate limit."
    },
    vn = {
        id: "wham.rateLimitModal.message",
        defaultMessage: "You’ve reached your Codex rate limit. View usage to learn more.",
        description: "Message shown when a user reaches the Codex rate limit."
    };

function En({
    variant: t,
    onClose: e
}) {
    const o = q(),
        i = Xt(),
        r = t === "usage_based_owner_credits_expired",
        u = t === "usage_based_owner_spend_cap",
        s = t === "usage_based_member_credits_expired",
        l = t === "usage_based_member_spend_cap",
        d = r ? fn : u ? pn : hn,
        f = r ? xn : u ? wn : s ? Mn : l ? Cn : vn,
        m = r || s ? gn : u || l ? bn : yn,
        p = () => {
            e(), i(r || u ? un : mn)
        };
    return a.jsx(os, {
        testId: "modal-wham-out-of-credits",
        isOpen: !0,
        title: a.jsx(oe, { ...m
        }),
        onClose: e,
        primaryButton: a.jsx(Wt.Button, {
            title: o.formatMessage(d),
            color: "primary",
            onClick: p
        }),
        secondaryButton: a.jsx(Wt.Button, {
            title: o.formatMessage({
                id: "wham.outOfCreditsModal.cancel",
                defaultMessage: "Cancel"
            }),
            color: "secondary",
            onClick: e
        }),
        children: a.jsx("div", {
            className: "text-sm",
            children: a.jsx(oe, { ...f
            })
        })
    })
}

function Sn({
    isUsageBasedWorkspace: t,
    isOwner: e,
    hasCredits: o,
    isUnlimited: i,
    spendControlReached: r
}) {
    if (!t) return "rate_limit";
    if (r === !0) return e ? "usage_based_owner_spend_cap" : "usage_based_member_spend_cap";
    const u = o === !1 && i === !1;
    return e ? u ? "usage_based_owner_credits_expired" : "usage_based_owner_spend_cap" : u ? "usage_based_member_credits_expired" : "usage_based_member_spend_cap"
}

function kn(t) {
    if (typeof t != "object" || t == null) return;
    const e = Reflect.get(t, "status");
    return typeof e == "number" ? e : void 0
}

function Tn(t) {
    if (typeof t != "object" || t == null) return;
    const e = Reflect.get(t, "type");
    if (typeof e == "string") return e;
    const o = Reflect.get(t, "payload");
    if (typeof o == "object" && o != null) {
        const r = Reflect.get(o, "type");
        if (typeof r == "string") return r
    }
    const i = Reflect.get(t, "detail");
    if (typeof i == "object" && i != null) {
        const r = Reflect.get(i, "type");
        if (typeof r == "string") return r
    }
}

function _n(t) {
    return kn(t) === 429 || Tn(t) === Ca.RATE_LIMIT_EXCEEDED
}

function An(t) {
    const e = Reflect.get(t ? ? {}, "plan_type");
    return typeof e == "string" ? e : void 0
}

function In() {
    const t = Es(),
        {
            data: e,
            refetch: o
        } = rt(),
        i = k(l => l.outOfCreditsModalVariant),
        r = k(l => l.showOutOfCreditsModal),
        u = k(l => l.hideOutOfCreditsModal);
    return {
        maybeShowOutOfCreditsModal: Nt(async l => {
            if (!_n(l)) return !1;
            let d = e;
            try {
                const {
                    data: m
                } = await o();
                m != null && (d = m)
            } catch {}
            const f = Sn({
                isUsageBasedWorkspace: An(d) === "self_serve_business_usage_based",
                isOwner: t ? .data.role === Ss.OWNER,
                hasCredits: d ? .credits ? .has_credits,
                isUnlimited: d ? .credits ? .unlimited,
                spendControlReached: d ? .spend_control ? .reached === !0
            });
            return r(f), !0
        }),
        outOfCreditsModal: i == null ? null : a.jsx(En, {
            variant: i,
            onClose: u
        })
    }
}

function Rn(t) {
    "use forget";
    const e = ye.c(44),
        {
            selectableTools: o,
            selectedTool: i,
            onSelectTool: r,
            isGitHubConnected: u,
            fileInputRef: s,
            onFileChange: l
        } = t,
        d = q();
    let f;
    e[0] !== d ? (f = d.formatMessage({
        id: "wham.whamComposer.plusMenu",
        defaultMessage: "Add files and more"
    }), e[0] = d, e[1] = f) : f = e[1];
    let m;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (m = a.jsx("kbd", {
        className: "bg-token-bg-tertiary -me-1 inline-grid aspect-square w-4 items-center justify-center rounded-sm text-[11px]",
        children: a.jsx("span", {
            children: "/"
        })
    }), e[2] = m) : m = e[2];
    let p;
    e[3] !== f ? (p = a.jsxs(a.Fragment, {
        children: [f, " ", m]
    }), e[3] = f, e[4] = p) : p = e[4];
    let v;
    e[5] !== d ? (v = d.formatMessage({
        id: "wham.whamComposer.plusMenu",
        defaultMessage: "Add files and more"
    }), e[5] = d, e[6] = v) : v = e[6];
    let h;
    e[7] === Symbol.for("react.memo_cache_sentinel") ? (h = a.jsx(oa, {
        className: "icon"
    }), e[7] = h) : h = e[7];
    let E;
    e[8] !== v ? (E = a.jsx(J.BasicTrigger, {
        asChild: !0,
        children: a.jsx("button", {
            type: "button",
            className: "composer-btn",
            "aria-label": v,
            children: h
        })
    }), e[8] = v, e[9] = E) : E = e[9];
    let T;
    e[10] !== p || e[11] !== E ? (T = a.jsx("div", {
        onPointerDown: On,
        onClick: jn,
        children: a.jsx(Bt, {
            side: "bottom",
            label: p,
            children: E
        })
    }), e[10] = p, e[11] = E, e[12] = T) : T = e[12];
    let n;
    if (e[13] !== r || e[14] !== o || e[15] !== i.key) {
        let C;
        e[17] !== r || e[18] !== i.key ? (C = x => a.jsxs(J.Item, {
            disabled: !x.available,
            className: "hover:bg-token-bg-tertiary flex items-center gap-2 rounded-lg px-3 py-2 text-start text-sm",
            onSelect: j => {
                j.preventDefault(), x.available && r(x.key)
            },
            children: [a.jsx("span", {
                className: "text-token-text-secondary",
                children: x.icon
            }), a.jsx("span", {
                className: it("flex-1", x.key === i.key && x.available ? "text-token-text-brand font-medium" : void 0),
                children: x.label
            })]
        }, x.key), e[17] = r, e[18] = i.key, e[19] = C) : C = e[19], n = o.map(C), e[13] = r, e[14] = o, e[15] = i.key, e[16] = n
    } else n = e[16];
    let w;
    e[20] !== s || e[21] !== d || e[22] !== u || e[23] !== o.length ? (w = u && a.jsxs(a.Fragment, {
        children: [o.length > 0 && a.jsx(J.Separator, {
            className: "my-1"
        }), a.jsx(J.Item, {
            className: "hover:bg-token-bg-tertiary rounded-lg px-3 py-2 text-start text-sm",
            onSelect: C => {
                C.preventDefault(), s.current ? .click()
            },
            children: d.formatMessage({
                id: "wham.whamComposer.attachImage",
                defaultMessage: "Upload attachment"
            })
        })]
    }), e[20] = s, e[21] = d, e[22] = u, e[23] = o.length, e[24] = w) : w = e[24];
    let I;
    e[25] !== n || e[26] !== w ? (I = a.jsx(J.Portal, {
        children: a.jsxs(J.Content, {
            align: "start",
            sideOffset: 8,
            className: "min-w-[16rem] p-1",
            children: [n, w]
        })
    }), e[25] = n, e[26] = w, e[27] = I) : I = e[27];
    let A;
    e[28] !== I || e[29] !== T ? (A = a.jsxs(J.Root, {
        modal: !1,
        children: [T, I]
    }), e[28] = I, e[29] = T, e[30] = A) : A = e[30];
    let _;
    e[31] !== r || e[32] !== i.icon || e[33] !== i.key || e[34] !== i.label ? (_ = i.key !== "code" && a.jsx(na, {
        icon: i.icon,
        label: i.label,
        content: i.label,
        removable: !0,
        onRemove: () => r("code")
    }), e[31] = r, e[32] = i.icon, e[33] = i.key, e[34] = i.label, e[35] = _) : _ = e[35];
    let c;
    e[36] !== s || e[37] !== u || e[38] !== l ? (c = u && a.jsx("input", {
        ref: s,
        type: "file",
        accept: "image/*",
        multiple: !0,
        hidden: !0,
        onChange: l
    }), e[36] = s, e[37] = u, e[38] = l, e[39] = c) : c = e[39];
    let g;
    return e[40] !== A || e[41] !== _ || e[42] !== c ? (g = a.jsxs("div", {
        className: "flex items-center",
        children: [A, _, c]
    }), e[40] = A, e[41] = _, e[42] = c, e[43] = g) : g = e[43], g
}

function jn(t) {
    return t.stopPropagation()
}

function On(t) {
    return t.stopPropagation()
}

function Nn({
    comments: t,
    onClearComments: e
}) {
    const o = q();
    return t.length === 0 ? null : a.jsxs("div", {
        className: "bg bg-token-bg-secondary mx-1 mt-1 flex items-center gap-2 rounded-t-3xl rounded-b-lg py-0.5 ps-3 pe-0.5 font-semibold text-blue-400",
        children: [a.jsx(is, {
            className: "icon"
        }), a.jsx("div", {
            className: "flex-1 text-sm",
            children: a.jsx(oe, {
                id: "wham.composer.commentCount",
                defaultMessage: "{count, plural, one {One code comment} other {# code comments}}",
                values: {
                    count: t.length
                }
            })
        }), a.jsx("button", {
            className: "text-token-text-secondary flex h-9 w-9 shrink-0 items-center justify-center",
            onClick: i => {
                i.preventDefault(), i.stopPropagation(), e()
            },
            "aria-label": o.formatMessage({
                id: "wham.composer.clearComments",
                defaultMessage: "Clear comments"
            }),
            children: a.jsx(ks, {
                className: "icon"
            })
        })]
    })
}

function Pn({
    composerController: t,
    layoutMode: e,
    slashCommands: o
}) {
    const i = q(),
        {
            refs: r,
            floatingStyles: u
        } = Ts({
            placement: "bottom-start",
            middleware: [As({
                mainAxis: 10,
                alignmentAxis: -18
            }), Is({
                padding: 6
            }), Rs({
                apply: ({
                    elements: c,
                    availableWidth: g,
                    availableHeight: C
                }) => {
                    c.floating.style.setProperty("--radix-popper-available-width", `${g}px`), c.floating.style.setProperty("--radix-popper-available-height", `${C}px`)
                }
            })],
            whileElementsMounted: _s
        }),
        [s, l] = y.useState(void 0);
    y.useEffect(() => {
        const c = D(t);
        c.dispatch(js(c.state.tr, {
            setReferencePosition: r.setReference,
            onHintMatch(g) {
                l(C => Bs(C, g) ? C : g)
            }
        }))
    }, [t, r.setReference]);
    const d = y.useMemo(() => !s || s.triggerSymbol !== "/" ? [] : o.length ? s.text ? [qa(o, s.text, c => Vt(c).searchParameters || {
            targets: [c.title, ...c.aliases || []]
        }, {
            locale: i.locale
        })] : [o.filter(c => !c.noMatchEmpty)] : [], [s, i.locale, o]),
        f = y.useMemo(() => e !== "bottom" ? d : d.slice().reverse().map(c => [...c].reverse()), [d, e]),
        m = y.useMemo(() => f.flat(), [f]),
        [p, v] = y.useState(e === "bottom" ? -1 : 0),
        h = p == null ? null : (p + m.length) % m.length,
        E = y.useCallback(c => {
            v(g => {
                if (g == null) return null;
                const C = m.length;
                for (let x = 0; x < C; x++) {
                    const j = (g + C + (x + 1) * c) % C;
                    if (!m[j].disabled) return j
                }
                return null
            })
        }, [m]),
        T = y.useRef(E);
    T.current = E;
    const n = m.length === 0;
    y.useEffect(() => {
        if (n) {
            v(null);
            return
        }
        e === "bottom" ? (v(0), T.current(-1)) : (v(-1), T.current(1))
    }, [e, n]);
    const w = h == null ? null : m[h],
        I = y.useCallback(() => {
            if (s ? .range) {
                const c = D(t);
                Os(c, s.range.from, s.range.to)
            }
        }, [t, s]),
        A = y.useCallback(({
            commandToSave: c = w,
            expectPerfectMatch: g
        }) => {
            if (!s || !c || c.disabled) return !1;
            const C = s.text.toLocaleLowerCase(),
                x = [c.command, ...c.aliases ? ? []].some(N => N.toLocaleLowerCase() === C);
            if (g && !x) return !1;
            I();
            const j = D(t);
            return Se(j), c.onSelect(), !0
        }, [I, t, s, w]),
        _ = y.useRef(A);
    return _.current = A, y.useEffect(() => {
        if (n) {
            const g = D(t);
            Se(g);
            return
        }
        const c = D(t);
        return Ns(c, g => {
            if (g === "up") T.current(-1);
            else if (g === "down") T.current(1);
            else if (g === "cancel") Se(c), Ps(c);
            else {
                if (g === "submit") return Se(c), _.current({
                    expectPerfectMatch: !1
                });
                if (g === "checkMatch") return _.current({
                    expectPerfectMatch: !0
                })
            }
        }), () => Se(c)
    }, [t, n]), n ? null : a.jsx(Ds, {
        ref: r.setFloating,
        style: u,
        className: it("max-w-[min(var(--radix-popper-available-width,100vw),--spacing(100))] overflow-y-auto [scrollbar-width:none]", m.length > 6 ? "max-h-[min(var(--radix-popper-available-height,50svh),--spacing(1.5)+5*var(--menu-item-height))]" : "max-h-[var(--radix-popper-available-height,50svh)]"),
        onPointerDown: c => {
            c.preventDefault()
        },
        children: f.map((c, g) => {
            let C = 0;
            for (let x = 0; x < g; x++) C += f[x].length;
            return a.jsx(J.Group, {
                children: c.map((x, j) => {
                    const N = C + j;
                    return a.jsx(Ga, {
                        item: Vt(x),
                        isHighlighted: N === h,
                        onHighlight: () => v(N),
                        onClick: () => {
                            A({
                                commandToSave: x,
                                expectPerfectMatch: !1
                            }), Pt(D(t))
                        }
                    }, x.command)
                })
            }, g)
        })
    })
}

function Dn({
    onMfaEnabled: t
}) {
    const e = q(),
        o = Xt(),
        {
            setupMfa: i
        } = Va({
            redirectUrl: "/codex"
        });
    return Ha({
        enabled: $t,
        redirectUrl: "/codex",
        onMfaEnabled: t
    }), a.jsx(os, {
        isOpen: !0,
        onClose: () => {},
        type: "warning",
        title: e.formatMessage({
            id: "wham.mfaRequiredModal.title",
            defaultMessage: "Enable multi-factor authentication to access Codex"
        }),
        description: e.formatMessage({
            id: "wham.mfaRequiredModal.description",
            defaultMessage: "To continue using Codex, please turn on multi-factor authentication for your account."
        }),
        testId: "modal-mfa-required",
        children: a.jsxs("div", {
            className: "flex w-full justify-end gap-2",
            children: [a.jsx(jt, {
                color: "secondary",
                onClick: () => {
                    o("/")
                },
                children: a.jsx(oe, {
                    id: "wham.mfaRequiredModal.backToChatGPT",
                    defaultMessage: "Back to ChatGPT"
                })
            }), a.jsx(jt, {
                color: "primary",
                onClick: () => {
                    if ($t()) {
                        Fs(Qa, {
                            redirectUrl: "/codex",
                            onMfaEnabled: t
                        });
                        return
                    }
                    i()
                },
                children: a.jsx(oe, {
                    id: "wham.mfaRequiredModal.enableMFA",
                    defaultMessage: "Enable MFA"
                })
            })]
        })
    })
}

function Bn({
    taskId: t,
    turnId: e,
    isComposerExpanded: o,
    followUpSuggestions: i,
    hasComments: r,
    isSubmitting: u,
    onSuggestionClick: s,
    children: l
}) {
    const d = Ln(),
        f = q(),
        [m, p] = y.useState(null),
        v = ds({
            isFollowUp: !0,
            hasComments: r
        });
    let h = cs(v);
    v === "no-content" && (h = void 0);
    const E = !(d === "hidden" || !i.length) && t && e;
    return y.useEffect(() => {
        E && ke.recordFollowUpsSeen(t, e, i.length)
    }, [E, t, e, i.length]), E ? a.jsxs("div", {
        className: "bg-token-bg-tertiary flex flex-col gap-1.5 rounded-2xl p-2",
        children: [a.jsx(Ls, {
            initial: !1,
            children: d === "visible" && a.jsx("div", {
                className: "flex flex-col",
                inert: u,
                children: i.map((T, n) => a.jsx(Fn, {
                    index: n,
                    taskId: t,
                    turnId: e,
                    suggestion: T.suggestion,
                    disabledReason: h,
                    loading: m === n && u,
                    onClick: () => {
                        u || (p(n), s(T.suggestion))
                    }
                }, n))
            })
        }), d === "collapsed" && a.jsxs("button", {
            type: "button",
            className: "text-token-text-tertiary enabled:hover:text-token-text-secondary focus:bg-token-bg-secondary flex items-center gap-2 rounded-lg p-2 text-xs font-semibold focus:outline-none",
            "aria-label": f.formatMessage({
                id: "wham.followUpContainer.showSuggestions",
                defaultMessage: "Show follow up suggestions"
            }),
            onClick: () => {
                ke.recordFollowUpsExpanded(t, e)
            },
            children: [a.jsx(ia, {
                className: "icon-sm"
            }), a.jsx(oe, {
                id: "wham.composer.followup.show",
                defaultMessage: "Suggestions"
            }, "text")]
        }, "collapsed"), l({
            isWrappedByContainer: !0
        })]
    }) : l({
        isWrappedByContainer: !1
    })
}

function Fn({
    taskId: t,
    turnId: e,
    index: o,
    suggestion: i,
    disabledReason: r,
    loading: u,
    onClick: s
}) {
    return a.jsx(Bt, {
        side: "right",
        sideOffset: 10,
        label: r,
        children: a.jsxs("button", {
            type: "button",
            disabled: !!r || u,
            className: "group hover:bg-token-bg-secondary focus:bg-token-bg-secondary -disabled:cursor-pointer flex w-full items-start gap-1.5 rounded-lg px-2 py-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            onClick: () => {
                s(), ke.recordFollowUpsClicked(t, e, o, i.severity)
            },
            children: [a.jsx("span", {
                className: "pt-[0.125rem]",
                children: u ? a.jsx(Zt, {
                    className: "text-token-text-tertiary icon-sm"
                }) : a.jsx(is, {
                    className: "text-token-text-tertiary icon-sm"
                })
            }), a.jsx("span", {
                className: "text-token-text-primary line-clamp-2 text-start text-sm leading-snug break-words",
                children: i.title
            })]
        })
    })
}

function Ln(t) {
    return "hidden"
}

function Wn(t) {
    "use forget";
    const e = ye.c(7),
        {
            environmentId: o
        } = t,
        {
            data: i,
            isLoading: r
        } = Fa();
    let u;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (u = Ka(), e[0] = u) : u = e[0];
    const s = u;
    let l;
    e[1] !== o || e[2] !== i ? (l = i ? .find(p => p.id === o) ? ? null, e[1] = o, e[2] = i, e[3] = l) : l = e[3];
    const f = s && l ? .codex_github_direct === !0;
    if (o && r) {
        let p;
        return e[4] === Symbol.for("react.memo_cache_sentinel") ? (p = {
            isEligible: !1
        }, e[4] = p) : p = e[4], p
    }
    let m;
    return e[5] !== f ? (m = {
        isEligible: f
    }, e[5] = f, e[6] = m) : m = e[6], m
}

function Un(t) {
    "use forget";
    const e = ye.c(5),
        {
            bestOfN: o,
            interruptingTurn: i,
            environmentId: r,
            environmentMode: u
        } = t;
    let s;
    e[0] !== r ? (s = {
        environmentId: r
    }, e[0] = r, e[1] = s) : s = e[1];
    const {
        isEligible: l
    } = Wn(s), d = u === "code" && l, f = i || d ? 1 : o;
    let m;
    return e[2] !== d || e[3] !== f ? (m = {
        directPushEnabled: d,
        effectiveBestOfN: f
    }, e[2] = d, e[3] = f, e[4] = m) : m = e[4], m
}

function Gn() {
    const t = k(o => o.bestOfN);
    return t ? ? Ws("2398649844").get("default_attempts", 1)
}
const ot = Dt({
        describeTask: {
            id: "wham.whamComposer.describeACodingTask",
            defaultMessage: "Describe a task"
        },
        describeAnotherTask: {
            id: "wham.whamComposer.describeAnotherCodingTask",
            defaultMessage: "Describe another task"
        },
        askQuestionWithPlan: {
            id: "wham.whamComposer.askAQuestionWithPlan",
            defaultMessage: "Ask a question with /plan"
        },
        askQuestionWithPlanAnother: {
            id: "wham.whamComposer.askAQuestionWithPlanAnother",
            defaultMessage: "Ask a question with /plan"
        }
    }),
    Kt = [{
        firstTaskMessage: ot.describeTask,
        subsequentTaskMessage: ot.describeAnotherTask
    }, {
        firstTaskMessage: ot.askQuestionWithPlan,
        subsequentTaskMessage: ot.askQuestionWithPlanAnother
    }];

function wo(t) {
    "use forget";
    const e = ye.c(153),
        {
            disableAutoFocus: o,
            isBigBoxMode: i,
            disableDuringSubmit: r,
            expanded: u,
            followUp: s,
            onClearComments: l,
            onSubmit: d,
            onSuccess: f,
            onCreateEnvironment: m,
            attemptIndex: p,
            ariaLabel: v
        } = t,
        h = o === void 0 ? !1 : o,
        E = i === void 0 ? !1 : i,
        T = r === void 0 ? !1 : r,
        n = q(),
        w = Jt(),
        I = Yt(),
        [A, _] = y.useState("code"),
        {
            refetch: c
        } = La(),
        {
            refetch: g
        } = Wa(s ? .taskId),
        {
            refetch: C
        } = Ua(s ? .taskId),
        x = k(Jn),
        j = k(Xn),
        N = k(zn),
        Z = k(Yn),
        [F, ie] = y.useState(!0),
        [H, ee] = y.useState(!1),
        U = Us(),
        Te = Ut(Kn),
        us = Ut(At.hasUploadInProgress),
        ms = Gn(),
        fs = k($n),
        {
            isCreatingEnvironment: lt,
            ensureEnvironment: ct,
            hasRepository: ps
        } = ls(),
        [hs, gs] = y.useState(1),
        dt = s ? hs : ms,
        ut = s ? gs : fs;
    let _e;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (_e = Gs("2474824343"), e[0] = _e) : _e = e[0];
    const Ft = _e,
        [mt, ft] = y.useState(!1),
        {
            maybeShowOutOfCreditsModal: Ae,
            outOfCreditsModal: pt
        } = In(),
        b = es();
    let Ie;
    e[1] !== b ? (Ie = ra(b), e[1] = b, e[2] = Ie) : Ie = e[2];
    const re = Ot(Ie.isWhisperActive$),
        bs = y.useRef(null),
        Lt = y.useRef(Kt[Math.floor(Math.random() * Kt.length)]),
        {
            data: ht
        } = rt();
    let Re;
    e[3] !== ht ? (Re = rs(ht), e[3] = ht, e[4] = Re) : Re = e[4];
    const je = Re,
        le = je && !!s,
        gt = le ? !1 : re ? !0 : u;
    let Oe;
    e[5] !== b || e[6] !== gt ? (Oe = () => gt ? ? (!ts(b) || qs(b)), e[5] = b, e[6] = gt, e[7] = Oe) : Oe = e[7];
    const z = Ot(Oe),
        bt = T && H || le,
        G = !!s && (s.comments.length ? ? 0) > 0;
    let Ne;
    e[8] !== U || e[9] !== n || e[10] !== w ? (Ne = M => {
        for (const R of M) at.uploadFile(U, Hs(R), R, Qs.Codex, [], n, w)
    }, e[8] = U, e[9] = n, e[10] = w, e[11] = Ne) : Ne = e[11];
    const te = Ne;
    let Pe;
    e[12] !== te ? (Pe = function(R) {
        const B = R.target.files;
        B && (te(B), R.target.value = "")
    }, e[12] = te, e[13] = Pe) : Pe = e[13];
    const xt = Pe;
    let De, Be;
    e[14] !== b || e[15] !== te ? (De = () => {
        const M = R => {
            const B = R.clipboardData;
            if (!B) return;
            const W = B.getData("text/plain") || B.getData("text");
            if (W && xa(W)) {
                R.preventDefault(), Xs(D(b), W);
                return
            }
            const V = B.items;
            if (!V) return;
            const S = [];
            for (const X of V)
                if (X.kind === "file") {
                    const O = X.getAsFile();
                    O && O.type.startsWith("image/") && S.push(O)
                }
            S.length > 0 && (R.preventDefault(), te(S))
        };
        return Vs(D(b).dom, {
            paste: M
        })
    }, Be = [b, te], e[14] = b, e[15] = te, e[16] = De, e[17] = Be) : (De = e[16], Be = e[17]), y.useEffect(De, Be);
    let Fe;
    e[18] !== U ? (Fe = function() {
        return At.getReadyFiles(U.getState()).flatMap(Vn)
    }, e[18] = U, e[19] = Fe) : Fe = e[19];
    const wt = Fe;
    let ce;
    e[20] !== b ? (ce = () => Pt(D(b)), e[20] = b, e[21] = ce) : ce = e[21];
    let de;
    e[22] !== n ? (de = n.formatMessage({
        id: "wham.keyboardActions.focusComposer",
        defaultMessage: "Focus chat"
    }), e[22] = n, e[23] = de) : de = e[23];
    let Le;
    e[24] === Symbol.for("react.memo_cache_sentinel") ? (Le = [nt.Shift, nt.Escape], e[24] = Le) : Le = e[24];
    let ue;
    e[25] !== s ? (ue = s ? void 0 : [
        [nt.Mod, nt.Shift, "o"]
    ], e[25] = s, e[26] = ue) : ue = e[26];
    let We;
    e[27] !== ce || e[28] !== de || e[29] !== ue ? (We = [{
        key: "focusComposer",
        action: ce,
        actionMessageDescriptor: de,
        group: la.Chat,
        keyboardBinding: Le,
        altKeyboardBindings: ue
    }], e[27] = ce, e[28] = de, e[29] = ue, e[30] = We) : We = e[30], $a(We);
    const Mt = !!s;
    let Ue;
    e[31] !== G || e[32] !== Mt ? (Ue = {
        isFollowUp: Mt,
        hasComments: G
    }, e[31] = G, e[32] = Mt, e[33] = Ue) : Ue = e[33];
    const xs = ds(Ue),
        {
            isConnected: Q
        } = ss(ns.GITHUB_CONNECTOR, "github", "/codex", as.CODEX),
        Ge = cs(xs),
        $ = !!Ge || H && T || us,
        Ct = !s && !x && ps;
    let se, L, qe;
    if (e[34] !== n || e[35] !== Q || e[36] !== A) {
        let M;
        e[40] !== n || e[41] !== Q ? (M = S => {
            const X = !S.requiresGitHubConnection || Q,
                O = !S.requiresReviewFeature,
                Ee = X && O;
            return {
                key: S.key,
                label: n.formatMessage(S.messages.label),
                submitLabel: n.formatMessage(S.messages.submitLabel),
                description: n.formatMessage(S.messages.description),
                environmentMode: S.environmentMode,
                runEnvironmentInQaMode: S.runEnvironmentInQaMode,
                slashCommand: S.slashCommand,
                slashAliases: S.slashAliases,
                icon: S.icon,
                analyticsAction: S.analyticsAction,
                available: Ee,
                disabledReason: !Ee && S.messages.unavailable ? n.formatMessage(S.messages.unavailable) : void 0
            }
        }, e[40] = n, e[41] = Q, e[42] = M) : M = e[42];
        const R = za.map(M),
            B = new Map(R.map(Qn));
        se = R.filter(Hn);
        const W = B.get("code") ? ? R[0];
        L = B.get(A) ? ? W;
        let V;
        e[43] === Symbol.for("react.memo_cache_sentinel") ? (V = S => ({
            command: S.slashCommand,
            aliases: S.slashAliases,
            title: S.label,
            secondary: void 0,
            icon: S.icon,
            disabled: !S.available,
            onSelect: () => {
                S.available && _(S.key)
            }
        }), e[43] = V) : V = e[43], qe = se.map(V), e[34] = n, e[35] = Q, e[36] = A, e[37] = se, e[38] = L, e[39] = qe
    } else se = e[37], L = e[38], qe = e[39];
    const yt = qe;
    let He;
    e[44] !== s ? (He = Ya(s ? [{
        turn_status: s.turnStatus,
        cancellation_requested_at: s.cancellationRequestedAt
    }, ...s.siblingTurnStatuses.map((M, R) => ({
        turn_status: M,
        cancellation_requested_at: s.siblingCancellationRequestedAts ? .[R] ? ? null
    }))] : [], qn), e[44] = s, e[45] = He) : He = e[45];
    const ve = He,
        K = Ft && !!s && ve > 0;
    let Qe;
    e[46] !== dt || e[47] !== x || e[48] !== K || e[49] !== L.environmentMode ? (Qe = {
        bestOfN: dt,
        interruptingTurn: K,
        environmentId: x,
        environmentMode: L.environmentMode
    }, e[46] = dt, e[47] = x, e[48] = K, e[49] = L.environmentMode, e[50] = Qe) : Qe = e[50];
    const {
        directPushEnabled: me,
        effectiveBestOfN: ae
    } = Un(Qe);
    let Ve;
    e[51] !== me || e[52] !== n ? (Ve = me ? n.formatMessage({
        id: "wham.attemptsSelector.directPushDisabled",
        defaultMessage: "GitHub Direct enabled on environment."
    }) : void 0, e[51] = me, e[52] = n, e[53] = Ve) : Ve = e[53];
    const vt = Ve;
    let fe;
    e[54] !== b || e[55] !== ae || e[56] !== U || e[57] !== s || e[58] !== wt || e[59] !== G || e[60] !== K || e[61] !== n || e[62] !== F || e[63] !== Ae || e[64] !== d || e[65] !== I || e[66] !== w ? (fe = async M => {
        const {
            runEnvironmentInQaMode: R,
            promptOverride: B
        } = M === void 0 ? {
            runEnvironmentInQaMode: !1
        } : M, W = B ? ? $s(D(b).state.doc).content, V = At.getReadyFiles(U.getState());
        if (!(!!W.length || G)) throw new Error("No content to submit");
        const X = wt();
        if (d ? .(), at.reset(U), ee(!0), s) return await (K ? Ce.createFollowUpTaskInterrupt(s.taskId, s.turnId, W, X) : Ce.createFollowUpTask(s.taskId, s.turnId, W, s.comments, R, ae, X)).catch(async O => {
            throw B || (Gt(D(b), W), at.restoreFiles(U, V)), await Ae(O) || (O instanceof Rt ? Qt(O, s.turnId, n, w) : O instanceof It && O.status === 403 && O.detail ? .toLowerCase().includes("multi-factor authentication") ? ft(!0) : w.danger(n.formatMessage({
                id: "wham.whamComposer.failedToCreateFollowUpTask",
                defaultMessage: "Failed to create follow-up"
            }), {
                id: s.turnId,
                duration: 5,
                hasCloseButton: !0
            })), O
        }); {
            const {
                branch: O,
                environmentId: Ee
            } = k.getState(), ws = F;
            if (O) {
                if (!Ee) throw new Error("Environment is required for new tasks.")
            } else throw new Error("Branch is required");
            const ne = crypto.randomUUID();
            return k.getState().addPendingTaskId(ne), Ce.createNewTask(Ee, O, W, R, ae, X).catch(P => {
                throw k.getState().removePendingTaskId(ne), B || (Ks(D(b).state.doc) ? (Gt(D(b), W), at.restoreFiles(U, V)) : (w.danger(n.formatMessage({
                    id: "wham.whamComposer.failedToCreateTaskCopyToClipboard",
                    defaultMessage: "Failed to create task. Previous prompt copied to clipboard."
                }), {
                    id: ne,
                    duration: 5,
                    hasCloseButton: !0
                }), navigator.clipboard.writeText(W))), P
            }).catch(async P => {
                if (P instanceof It || P instanceof Rt) {
                    if (await Ae(P)) throw P;
                    P instanceof Rt ? Qt(P, ne, n, w) : P instanceof It && P.status === 403 && P.detail ? .toLowerCase().includes("multi-factor authentication") ? ft(!0) : w.danger(n.formatMessage({
                        id: "wham.whamComposer.failedToCreateTask",
                        defaultMessage: "Failed to create task"
                    }), {
                        id: ne,
                        duration: 5,
                        hasCloseButton: !0
                    })
                } else w.danger(n.formatMessage({
                    id: "wham.whamComposer.failedToCreateTask",
                    defaultMessage: "Failed to create task"
                }), {
                    id: ne,
                    duration: 5,
                    hasCloseButton: !0
                });
                throw P
            }).then(P => (k.getState().assignPendingTaskToFinalTask(ne, P.task.id), I.invalidateQueries({
                queryKey: ["wham", "usage", "rate-limit-status"]
            }), ws && ie(!1), P))
        }
    }, e[54] = b, e[55] = ae, e[56] = U, e[57] = s, e[58] = wt, e[59] = G, e[60] = K, e[61] = n, e[62] = F, e[63] = Ae, e[64] = d, e[65] = I, e[66] = w, e[67] = fe) : fe = e[67];
    let pe;
    e[68] !== j || e[69] !== b || e[70] !== s || e[71] !== N || e[72] !== f || e[73] !== g || e[74] !== c || e[75] !== C || e[76] !== Z ? (pe = M => {
        Z(!0), j(M.task.id, M.turn), M.user_turn && (j(M.task.id, M.user_turn), Reflect.get(M, "paragen_forced_compare") === !0 && N(M.user_turn.id)), f ? .(M), setTimeout(() => {
            Pt(D(b))
        }, 0), c(), s && (g(), C())
    }, e[68] = j, e[69] = b, e[70] = s, e[71] = N, e[72] = f, e[73] = g, e[74] = c, e[75] = C, e[76] = Z, e[77] = pe) : pe = e[77];
    let $e;
    e[78] === Symbol.for("react.memo_cache_sentinel") ? ($e = () => {
        ee(!1)
    }, e[78] = $e) : $e = e[78];
    let Ke;
    e[79] !== fe || e[80] !== pe ? (Ke = {
        mutationFn: fe,
        onSuccess: pe,
        onSettled: $e
    }, e[79] = fe, e[80] = pe, e[81] = Ke) : Ke = e[81];
    const {
        mutate: Y,
        isPending: he
    } = zt(Ke);
    let Ye;
    e[82] !== Y || e[83] !== ct || e[84] !== lt || e[85] !== he || e[86] !== $ || e[87] !== L.runEnvironmentInQaMode || e[88] !== Ct ? (Ye = async () => {
        if (!(he || $ || lt)) {
            if (Ct) try {
                if (!await ct()) return
            } catch {
                return
            }
            Y({
                runEnvironmentInQaMode: L.runEnvironmentInQaMode
            })
        }
    }, e[82] = Y, e[83] = ct, e[84] = lt, e[85] = he, e[86] = $, e[87] = L.runEnvironmentInQaMode, e[88] = Ct, e[89] = Ye) : Ye = e[89];
    const ge = Nt(Ye);
    let ze;
    e[90] !== $ || e[91] !== ge ? (ze = M => $ ? !1 : M.metaKey || M.altKey ? (ge(), !0) : !1, e[90] = $, e[91] = ge, e[92] = ze) : ze = e[92];
    const Xe = Nt(ze);
    let Je, Ze;
    e[93] !== b || e[94] !== Xe ? (Je = () => Ys(D(b), {
        Enter: Xe
    }), Ze = [b, Xe], e[93] = b, e[94] = Xe, e[95] = Je, e[96] = Ze) : (Je = e[95], Ze = e[96]), y.useEffect(Je, Ze);
    const et = !!s && !Ft && ve > 0,
        Et = !et && !re,
        St = (s ? .siblingTurnStatuses ? .length ? ? 0) > 1;
    let tt;
    e[97] !== p || e[98] !== St || e[99] !== n ? (tt = St && p ? n.formatMessage({
        id: "wham.whamComposer.followUpOnTurn",
        defaultMessage: "Follow-up on version {version}"
    }, {
        version: p
    }) : n.formatMessage({
        id: "wham.whamComposer.requestChangesOrAskAQuestion",
        defaultMessage: "Request changes or ask a question"
    }), e[97] = p, e[98] = St, e[99] = n, e[100] = tt) : tt = e[100];
    const kt = tt,
        Tt = s ? .taskId,
        _t = s ? .turnId;
    let be;
    e[101] !== s ? .followUpSuggestions ? (be = s ? .followUpSuggestions ? ? [], e[101] = s ? .followUpSuggestions, e[102] = be) : be = e[102];
    let xe;
    e[103] !== Y ? (xe = M => {
        Y({
            runEnvironmentInQaMode: !1,
            promptOverride: M.body
        })
    }, e[103] = Y, e[104] = xe) : xe = e[104];
    let we;
    e[105] !== v || e[106] !== b || e[107] !== bt || e[108] !== Y || e[109] !== vt || e[110] !== me || e[111] !== h || e[112] !== Ge || e[113] !== ae || e[114] !== s || e[115] !== kt || e[116] !== G || e[117] !== je || e[118] !== ve || e[119] !== K || e[120] !== n || e[121] !== E || e[122] !== he || e[123] !== z || e[124] !== F || e[125] !== Q || e[126] !== $ || e[127] !== H || e[128] !== re || e[129] !== l || e[130] !== m || e[131] !== xt || e[132] !== pt || e[133] !== Te || e[134] !== se || e[135] !== L || e[136] !== ut || e[137] !== mt || e[138] !== le || e[139] !== et || e[140] !== Et || e[141] !== ge || e[142] !== yt ? (we = M => {
        const {
            isWrappedByContainer: R
        } = M;
        return a.jsxs("div", {
            className: "contents",
            inert: bt,
            children: [a.jsxs(ca, {
                expanded: z,
                canCollapseWithInput: !he && R,
                isTemporaryChat: !1,
                shouldUseTightRadius: R,
                onSubmit: () => {
                    ge()
                },
                composerController: b,
                footerActionClassName: "h-full",
                children: [a.jsx(da, {
                    children: re ? a.jsx("div", {
                        className: it("flex max-w-full min-w-0 flex-1 items-center", E && z && "min-h-30"),
                        children: a.jsx(ua, {
                            composerController: b,
                            className: "h-14"
                        })
                    }) : a.jsx(ma, {
                        composerController: b,
                        disableAutoFocus: h || je,
                        textareaMaxHeightClassName: it(E && z && "min-h-30", s ? "max-h-[max(10rem,min(calc(100dvh-29rem),10rem))]" : "max-h-[max(10rem,min(calc(100dvh-29rem),50dvh))]"),
                        ariaLabel: v ? ? n.formatMessage({
                            id: "wham.whamComposer.ariaLabel",
                            defaultMessage: "Codex composer"
                        }),
                        placeholder: s ? kt : n.formatMessage(F ? Lt.current.firstTaskMessage : Lt.current.subsequentTaskMessage)
                    })
                }), Q && Te.length > 0 && a.jsx(Ht, {
                    children: a.jsx(fa, {
                        files: Te,
                        selectedApps: [],
                        activeSystemHintType: void 0,
                        disableEditButton: !0,
                        forceSmallView: !0,
                        className: "no-scrollbar horizontal-scroll-fade-mask flex flex-nowrap gap-2 overflow-x-auto px-2.5 pt-2.5 pb-1.5 [--edge-fade-distance:1rem]"
                    })
                }), a.jsx(pa, {
                    children: a.jsx(Rn, {
                        selectableTools: se,
                        selectedTool: L,
                        onSelectTool: _,
                        isGitHubConnected: Q,
                        fileInputRef: bs,
                        onFileChange: xt
                    })
                }), G && a.jsx(Ht, {
                    children: a.jsx(Nn, {
                        comments: s.comments,
                        onClearComments: l
                    })
                }), !re && a.jsx(ha, {
                    children: a.jsxs("div", {
                        className: "flex h-full items-center gap-2",
                        children: [!s && a.jsx(Ta, {
                            onCreateEnvironment: m
                        }), Q && !K && a.jsx(cn, {
                            attempts: ae,
                            setAttempts: ut,
                            disabled: me,
                            disabledReason: vt
                        })]
                    })
                }), a.jsxs(ga, {
                    children: [!le && a.jsxs("div", {
                        className: "flex",
                        children: [a.jsx("div", {
                            inert: H,
                            children: a.jsx(ba, {
                                composerController: b,
                                composerType: "codex"
                            })
                        }), Et && a.jsx(nn, {
                            isSubmitDisabled: $,
                            createTask: Y,
                            selectedTool: L,
                            disabledReason: Ge,
                            isFollowUp: !!s
                        }), et && a.jsx(Xa, {
                            taskId: s.taskId,
                            hasMultipleInProgressOrStreamingTurns: ve > 1
                        })]
                    }), le && a.jsx(Pa, {})]
                })]
            }), a.jsx(Pn, {
                composerController: b,
                layoutMode: "bottom",
                slashCommands: yt
            }), mt && a.jsx(Dn, {
                onMfaEnabled: () => {
                    ft(!1)
                }
            }), pt]
        })
    }, e[105] = v, e[106] = b, e[107] = bt, e[108] = Y, e[109] = vt, e[110] = me, e[111] = h, e[112] = Ge, e[113] = ae, e[114] = s, e[115] = kt, e[116] = G, e[117] = je, e[118] = ve, e[119] = K, e[120] = n, e[121] = E, e[122] = he, e[123] = z, e[124] = F, e[125] = Q, e[126] = $, e[127] = H, e[128] = re, e[129] = l, e[130] = m, e[131] = xt, e[132] = pt, e[133] = Te, e[134] = se, e[135] = L, e[136] = ut, e[137] = mt, e[138] = le, e[139] = et, e[140] = Et, e[141] = ge, e[142] = yt, e[143] = we) : we = e[143];
    let st;
    return e[144] !== G || e[145] !== z || e[146] !== H || e[147] !== Tt || e[148] !== _t || e[149] !== be || e[150] !== xe || e[151] !== we ? (st = a.jsx(Bn, {
        taskId: Tt,
        turnId: _t,
        isComposerExpanded: z,
        followUpSuggestions: be,
        hasComments: G,
        isSubmitting: H,
        onSuggestionClick: xe,
        children: we
    }), e[144] = G, e[145] = z, e[146] = H, e[147] = Tt, e[148] = _t, e[149] = be, e[150] = xe, e[151] = we, e[152] = st) : st = e[152], st
}

function qn(t) {
    return t.turn_status && ["pending", "in_progress"].includes(t.turn_status) && !ya(t) ? 1 : 0
}

function Hn(t) {
    return t.key !== "code" && t.available
}

function Qn(t) {
    return [t.key, t]
}

function Vn(t) {
    const e = t.fileSpec;
    return e && "width" in e && "height" in e && t.fileId ? [{
        type: "image_asset_pointer",
        asset_pointer: zs(t.fileId),
        width: e.width,
        height: e.height,
        size_bytes: e.size
    }] : []
}

function $n(t) {
    return t.setBestOfN
}

function Kn(t) {
    return t.files
}

function Yn(t) {
    return t.setHasSubmittedTaskInSession
}

function zn(t) {
    return t.markParagenForcedCompareUserTurn
}

function Xn(t) {
    const {
        addTurnToTaskMap: e
    } = t;
    return e
}

function Jn(t) {
    return t.environmentId
}
export {
    wo as W, ls as u
};
//# sourceMappingURL=2af37e0b-b7nq4r5vunpqrfv4.js.map