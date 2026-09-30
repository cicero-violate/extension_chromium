import {
    u as G,
    r as le,
    j as t,
    c as z,
    o as U,
    s as ae,
    h as ke
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    S as oe,
    bW as lt,
    b5 as Ee,
    ay as Tt,
    I as je,
    dL as wt,
    dS as Ue,
    cO as De,
    c7 as Z,
    _ as de,
    hI as St,
    f8 as It,
    fk as rt,
    aE as Pt,
    fG as ve,
    A as Fe,
    aw as re,
    c8 as Le,
    cb as ct,
    ca as Be,
    c9 as Nt,
    e as se,
    nT as Rt,
    lR as At,
    rn as Et,
    n as Ce,
    aK as Ut,
    jj as Dt,
    nK as dt,
    hB as Bt,
    fc as O,
    fv as Ot,
    Cy as ut,
    be as Ze,
    aV as $t,
    j as pt,
    J as ft,
    nE as Gt,
    o2 as mt,
    Cz as zt,
    CA as Ht,
    js as Vt,
    on as Kt,
    CB as Wt,
    bL as qe,
    eG as gt,
    jo as Re,
    CC as Zt,
    mD as qt,
    eE as Yt,
    qK as Xt,
    CD as Qt,
    nF as Jt,
    eF as Ye,
    mQ as es,
    CE as ts,
    CF as ss,
    ze as os,
    ao as as,
    AC as is,
    mP as ns,
    mG as ls,
    bY as rs,
    CG as cs,
    ff as ds
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    ia as ht,
    tC as us,
    tD as ps,
    tE as fs,
    sZ as ms,
    e2 as gs,
    fx as hs,
    a$ as xs,
    tF as _s,
    d5 as Xe,
    h2 as bs,
    tG as V,
    k0 as ys,
    tH as vs,
    tI as Fs,
    tJ as Qe,
    tK as Ms,
    tL as ks,
    d0 as Oe,
    tM as xt,
    tN as $e,
    ck as js,
    tO as Je,
    tP as et,
    tQ as _t,
    tR as Ge,
    ht as Te,
    dq as Ls,
    ch as Cs,
    tS as Ts,
    k6 as ws,
    c0 as Ss,
    tT as Is,
    tU as tt,
    tV as Ps,
    tW as Ns,
    jv as Rs,
    tX as As,
    qq as Es,
    tY as Us,
    tZ as Ds,
    t_ as Bs,
    l2 as Os,
    t$ as $s,
    u0 as Gs,
    u1 as zs,
    u2 as st,
    u3 as Hs,
    gb as Vs,
    gc as Ks,
    u4 as Ws,
    u5 as Zs,
    u6 as qs
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    u as Ys
} from "./1bc04b52-ud6fhzv6uahbvpse.js";
import {
    e as bt,
    m as ce,
    h as yt
} from "./84e8f385-lndtlkfi7kijfbdy.js";

function Xs({
    usage: a
}) {
    const e = {
            work: {
                icon: _s,
                color: "#35AE47"
            },
            school: {
                icon: xs,
                color: "#E937D1"
            },
            personalTasks: {
                icon: hs,
                color: "#EA8444"
            },
            funAndEntertainment: {
                icon: gs,
                color: "#6C71FF"
            },
            justCurious: {
                icon: ms,
                color: "#FFCC00"
            }
        },
        s = e[a].icon,
        r = e[a].color;
    return t.jsx(s, {
        className: "icon",
        style: {
            color: r
        }
    })
}

function Eo({
    clientThreadId: a
}) {
    const e = G(),
        s = bt({
            clientThreadId: a
        });
    return le.useEffect(() => {
        oe.logEvent("chatgpt_convo_onboarding_usage_chips_shown")
    }, []), t.jsx(lt, {
        mode: "wait",
        children: t.jsx(Ee.div, {
            className: "-mx-6 mt-2 flex flex-wrap gap-2 px-6",
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1,
                transition: {
                    delay: .2,
                    ease: "easeInOut"
                }
            },
            exit: {
                opacity: 0,
                transition: {
                    ease: "easeInOut"
                }
            },
            children: ["school", "work", "personalTasks", "funAndEntertainment", "justCurious"].map(r => t.jsxs("button", {
                className: "border-token-border-default bg-token-main-surface-primary hover:bg-token-main-surface-secondary inline-flex h-[42px] items-center justify-start gap-2 rounded-[25px] border px-4 py-3",
                onClick: l => {
                    s({
                        sourceEvent: l,
                        stepPrompt: e.formatMessage(ce[`${r}Prompt`]),
                        messageMetadata: {
                            onboarding: {
                                main_usages: [{
                                    usage: r
                                }]
                            },
                            is_starter_prompt: !0,
                            suggestion_type: ht.Starter
                        }
                    }), oe.logEvent("chatgpt_convo_onboarding_usage_chip_clicked", null, {
                        usage: r
                    })
                },
                children: [t.jsx("div", {
                    "data-svg-wrapper": !0,
                    className: "relative",
                    children: t.jsx(Xs, {
                        usage: r
                    })
                }), t.jsx("div", {
                    className: "font-['SF Pro'] text-token-text-primary text-[13px] leading-[18px] font-normal opacity-90",
                    children: e.formatMessage(ce[r])
                })]
            }, r))
        })
    })
}

function Uo({
    clientThreadId: a,
    examples: e
}) {
    const s = bt({
            clientThreadId: a
        }),
        r = [us, ps, fs],
        l = G();
    return le.useEffect(() => {
        oe.logEvent("chatgpt_convo_onboarding_examples_shown")
    }, []), t.jsx(lt, {
        mode: "wait",
        children: t.jsxs("div", {
            children: [t.jsx(Ee.p, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    duration: .3,
                    ease: "easeInOut"
                },
                className: "text-token-text-primary text-base",
                children: l.formatMessage(ce.tryAnExample)
            }), t.jsx("ul", {
                className: "-mx-6 flex list-none flex-nowrap gap-6 overflow-auto px-6 py-4",
                children: e.map((o, n) => t.jsx(Ee.li, {
                    initial: {
                        opacity: 0,
                        y: 10
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        delay: (n + 1) * .2,
                        duration: .3
                    },
                    children: t.jsxs("button", {
                        className: "bg-token-main-surface-primary outline-token-border-xlight hover:shadow-token-border-default inline-flex h-60 w-[222px] flex-col items-center justify-start overflow-hidden rounded-2xl outline transition-all duration-300 hover:shadow-lg",
                        onClick: c => {
                            s({
                                sourceEvent: c,
                                stepPrompt: o.example,
                                messageMetadata: {
                                    onboarding: {
                                        triggered_tools: [o.feature]
                                    },
                                    is_starter_prompt: !0,
                                    suggestion_type: ht.Starter
                                }
                            }), oe.logEvent("chatgpt_convo_onboarding_example_clicked", null, {
                                tool: o.feature
                            })
                        },
                        children: [t.jsx("img", {
                            src: r[n % r.length].src,
                            className: "h-[160px] w-full object-cover",
                            alt: l.formatMessage({
                                id: "chatgpt.new-onboarding.example-prompt",
                                defaultMessage: "Example prompt"
                            })
                        }), t.jsx("div", {
                            className: "inline-flex h-20 w-full gap-1 p-4",
                            children: t.jsx("div", {
                                className: "text-token-text-primary line-clamp-2 shrink grow basis-0 text-start text-base leading-normal",
                                title: o.title,
                                children: o.title
                            })
                        })]
                    })
                }, o.feature))
            })]
        })
    })
}

function Qs({
    clientThreadId: a,
    children: e
}) {
    const {
        isEligible: s,
        markAsViewed: r
    } = yt(a), l = G();
    return le.useEffect(() => {
        s && Tt.showAnnouncementTooltipExclusively(Xe.hasSeenFilePickerNuxTooltip, !0)
    }, [s]), s ? t.jsx(bs, {
        announcementKey: Xe.hasSeenFilePickerNuxTooltip,
        show: !0,
        side: "top",
        align: "start",
        theme: "bright",
        dismissOnOutsideClick: !0,
        badge: "none",
        title: l.formatMessage(ce.tryUploadingAFile),
        description: l.formatMessage(ce.uploadFileExample),
        onDismiss: r,
        sideOffset: 0,
        children: e
    }) : e
}
const ot = a => {
    "use forget";
    const e = z.c(30),
        {
            conversation: s,
            rateLimitPopup: r,
            children: l,
            disabled: o,
            highlightTooltip: n,
            disabledReason: c,
            currentModelName: p,
            label: d,
            secondaryLabel: u,
            onTooltipOpenChange: m
        } = a,
        i = n === void 0 ? !1 : n,
        f = G(),
        h = Ue(s.id, De.getIsNewConversation);
    let g;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (g = je(), e[0] = g) : g = e[0];
    const b = g;
    let y;
    e[1] !== m || e[2] !== r ? (y = F => {
        if (m ? .(F), r != null && F) {
            const T = {
                type: "rate_limit",
                location: "file_upload",
                plan_type: b ? .planType ? ? "unknown"
            };
            de.logEvent("Popover Hover", T), oe.logEvent("chatgpt_popover_hover", null, T)
        }
    }, e[1] = m, e[2] = r, e[3] = y) : y = e[3];
    const M = y;
    let x;
    e[4] === Symbol.for("react.memo_cache_sentinel") ? (x = ys(Z.signUpButtonText), e[4] = x) : x = e[4];
    const j = x,
        {
            isEligible: L
        } = yt(s.id),
        _ = !!r,
        S = !o && L;
    if (_) {
        let F;
        e[5] !== l ? (F = t.jsx(vs, {
            asChild: !0,
            children: l
        }), e[5] = l, e[6] = F) : F = e[6];
        let T;
        e[7] !== h || e[8] !== r ? (T = t.jsx(Fs, {
            children: t.jsx(St, {
                children: t.jsx(Qe, {
                    role: "dialog",
                    "aria-labelledby": "rate-limit-popover-title",
                    children: t.jsx(It, {
                        $as: Qe,
                        side: "bottom",
                        sideOffset: 6,
                        align: "start",
                        alignOffset: -6,
                        className: "max-w-[300px]",
                        children: t.jsx(Js, {
                            isNewConversation: h,
                            rateLimitPopup: r,
                            signUpButtonText: j
                        })
                    })
                })
            })
        }), e[7] = h, e[8] = r, e[9] = T) : T = e[9];
        let A;
        return e[10] !== M || e[11] !== F || e[12] !== T ? (A = t.jsxs(Ms, {
            openDelay: 0,
            onOpenChange: M,
            children: [F, T]
        }), e[10] = M, e[11] = F, e[12] = T, e[13] = A) : A = e[13], A
    }
    if (S) {
        let F;
        return e[14] !== l || e[15] !== s.id ? (F = t.jsx(Qs, {
            clientThreadId: s.id,
            children: l
        }), e[14] = l, e[15] = s.id, e[16] = F) : F = e[16], F
    }
    let k;
    e[17] !== p || e[18] !== o || e[19] !== c || e[20] !== f || e[21] !== d ? (k = !o && d ? d : we(f, o, c, p), e[17] = p, e[18] = o, e[19] = c, e[20] = f, e[21] = d, e[22] = k) : k = e[22];
    const v = i ? void 0 : "touch:hidden",
        C = i ? !0 : void 0;
    let N;
    return e[23] !== l || e[24] !== m || e[25] !== u || e[26] !== k || e[27] !== v || e[28] !== C ? (N = t.jsx(rt, {
        label: k,
        secondaryLabel: u,
        labelOrientation: "horizontal",
        className: "flex",
        contentClassName: v,
        open: C,
        side: "bottom",
        onOpenChange: m,
        children: l
    }), e[23] = l, e[24] = m, e[25] = u, e[26] = k, e[27] = v, e[28] = C, e[29] = N) : N = e[29], N
};

function we(a, e, s, r) {
    const l = je(),
        o = l != null,
        n = l ? .isFreeWorkspace(),
        c = wt("3203804112").get("upload_photos", !1);
    return e ? s === V.ModelNotSupported && r != null ? a.formatMessage({
        id: "xPEzDr",
        defaultMessage: "Add files disabled for {modelName}"
    }, {
        modelName: r
    }) : s === V.HasReachedMaxFiles ? o ? a.formatMessage({
        id: "TEBczg",
        defaultMessage: "Cannot add more files"
    }) : a.formatMessage({
        id: "Y6o+nN",
        defaultMessage: "Cannot add more photos"
    }) : s === V.RateLimitReached ? o ? l.hasPaidSubscription() ? a.formatMessage({
        id: "W/ug8Z",
        defaultMessage: "Upload limit reached"
    }) : n ? a.formatMessage({
        id: "y1qZZ9",
        defaultMessage: "Get Business for more uploads"
    }) : a.formatMessage({
        id: "GXsPqr",
        defaultMessage: "Get Plus for more uploads"
    }) : a.formatMessage({
        id: "RHdQBI",
        defaultMessage: "Log in to add more photos"
    }) : s === V.SteeringAsyncTaskPending ? a.formatMessage({
        id: "composer.addFiles.disabled.stopRequest",
        defaultMessage: "Menu actions are disabled for follow ups"
    }) : o ? a.formatMessage({
        id: "MeW0HZ",
        defaultMessage: "Add files is unavailable"
    }) : a.formatMessage({
        id: "bvbDsP",
        defaultMessage: "Add photos is unavailable"
    }) : o ? c ? a.formatMessage({
        id: "composer.add.upload.label",
        defaultMessage: "Upload photos & files"
    }) : a.formatMessage({
        id: "composer.add.label",
        defaultMessage: "Add photos & files"
    }) : c ? a.formatMessage({
        id: "qmpZU4",
        defaultMessage: "Upload photos"
    }) : a.formatMessage({
        id: "wNvwwm",
        defaultMessage: "Add photos"
    })
}
const Js = a => {
        "use forget";
        const e = z.c(35),
            {
                isNewConversation: s,
                rateLimitPopup: r,
                signUpButtonText: l
            } = a,
            o = s === void 0 ? !1 : s,
            n = Pt();
        if (r == null) return null;
        const {
            call_to_action: c,
            description: p
        } = r;
        let d;
        e[0] !== c ? (d = c ? .includes(ve.UPGRADE_TO_GO) ? ? !1, e[0] = c, e[1] = d) : d = e[1];
        const u = d;
        let m;
        e[2] !== c ? (m = c ? .includes(ve.GET_PLUS) ? ? !1, e[2] = c, e[3] = m) : m = e[3];
        const i = m;
        let f;
        e[4] !== c ? (f = c ? .includes(ve.GET_BUSINESS) ? ? !1, e[4] = c, e[5] = f) : f = e[5];
        const h = f;
        let g;
        e[6] !== c ? (g = c ? .includes(ve.AUTHENTICATE) ? ? !1, e[6] = c, e[7] = g) : g = e[7];
        const b = g;
        let y;
        e[8] !== p || e[9] !== h || e[10] !== u ? (y = p ? ? t.jsx(U, { ...eo.defaultDescription,
            values: {
                upgradePlanType: h ? "Business" : u ? "Go" : "Plus"
            }
        }), e[8] = p, e[9] = h, e[10] = u, e[11] = y) : y = e[11];
        const M = y,
            x = b && n;
        let j;
        e[12] !== M ? (j = t.jsx("div", {
            className: "mb-3",
            id: "rate-limit-popover-title",
            children: M
        }), e[12] = M, e[13] = j) : j = e[13];
        let L;
        e[14] !== o || e[15] !== u ? (L = u ? t.jsx(Ae, {
            isNewConversation: o,
            message: Z.upgradeToGo,
            upgradePlanType: Fe.GO
        }) : null, e[14] = o, e[15] = u, e[16] = L) : L = e[16];
        let _;
        e[17] !== o || e[18] !== h ? (_ = h ? t.jsx(Ae, {
            isNewConversation: o,
            message: Z.getBusiness,
            upgradePlanType: Fe.SELF_SERVE_BUSINESS
        }) : null, e[17] = o, e[18] = h, e[19] = _) : _ = e[19];
        let S;
        e[20] !== o || e[21] !== i ? (S = i ? t.jsx(Ae, {
            isNewConversation: o,
            message: ks(),
            upgradePlanType: Fe.PLUS
        }) : null, e[20] = o, e[21] = i, e[22] = S) : S = e[22];
        let k;
        e[23] !== b ? (k = b ? t.jsx(re, {
            color: "primary",
            onClick: so,
            children: t.jsx(U, { ...Z.logInButtonText
            })
        }) : null, e[23] = b, e[24] = k) : k = e[24];
        let v;
        e[25] !== x || e[26] !== l ? (v = x ? t.jsx(re, {
            color: "secondary",
            className: "ms-2",
            onClick: ao,
            children: t.jsx(U, { ...l
            })
        }) : null, e[25] = x, e[26] = l, e[27] = v) : v = e[27];
        let C;
        return e[28] !== S || e[29] !== k || e[30] !== v || e[31] !== j || e[32] !== L || e[33] !== _ ? (C = t.jsxs("div", {
            className: "text-token-text-primary p-2 text-sm",
            children: [j, L, _, S, k, v]
        }), e[28] = S, e[29] = k, e[30] = v, e[31] = j, e[32] = L, e[33] = _, e[34] = C) : C = e[34], C
    },
    Ae = a => {
        "use forget";
        const e = z.c(10),
            {
                isNewConversation: s,
                message: r,
                upgradePlanType: l
            } = a;
        let o;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (o = je(), e[0] = o) : o = e[0];
        const n = o,
            c = ae();
        let p;
        e[1] !== s || e[2] !== c || e[3] !== l ? (p = () => {
            Oe(c, "Rate limited file upload popover"), xt({
                hard_block_reason: "",
                is_hard_block: !1,
                is_new_conversation: s,
                location: "popover",
                plan_type: n ? .planType ? ? "unknown",
                type: "file_upload",
                upgrade_plan_tye: l
            }), $e({
                type: "file_upload",
                location: "popover",
                plan_type: n ? .planType ? ? "unknown",
                is_hard_block: !1,
                is_new_conversation: s,
                hard_block_reason: ""
            })
        }, e[1] = s, e[2] = c, e[3] = l, e[4] = p) : p = e[4];
        let d;
        e[5] !== r ? (d = t.jsx(U, { ...r
        }), e[5] = r, e[6] = d) : d = e[6];
        let u;
        return e[7] !== p || e[8] !== d ? (u = t.jsx(re, {
            size: "small",
            color: "secondary",
            onClick: p,
            children: d
        }), e[7] = p, e[8] = d, e[9] = u) : u = e[9], u
    },
    eo = ke({
        defaultDescription: {
            id: "mMIVYZ",
            defaultMessage: "You've reached your daily upload limit. Get ChatGPT {upgradePlanType} to unlock more."
        }
    });

function to(a) {
    ct({
        location: "File picker rate limit tooltip",
        provider: a
    }, Be.ACCESS_FLOW_ENTRY_POINT_FILE_PICKER_RATE_LIMIT_TOOLTIP)
}

function so() {
    Le({
        fallbackScreenHint: "login",
        callback: to,
        skipLoginModal: !1
    })
}

function oo(a) {
    Nt({
        location: "File picker rate limit tooltip",
        provider: a
    }, Be.ACCESS_FLOW_ENTRY_POINT_FILE_PICKER_RATE_LIMIT_TOOLTIP)
}

function ao() {
    Le({
        fallbackScreenHint: "signup",
        callback: oo,
        skipLoginModal: !1
    })
}
const io = [js.Mod, "u"];

function ze(a, e = "en") {
    if (!a) return "";
    const s = new Date(a);
    if (isNaN(s.getTime())) return "";
    const r = new Date,
        l = Math.max(0, s.getTime() - r.getTime()),
        o = Math.floor(l / (1e3 * 60)),
        n = Math.floor(l / (1e3 * 60 * 60)),
        c = Math.floor(l / (1e3 * 60 * 60 * 24));
    let p, d;
    return c > 0 ? (p = c, d = "day") : n > 0 ? (p = n, d = "hour") : (p = o, d = "minute"), new Intl.RelativeTimeFormat(e, {
        numeric: "always"
    }).format(p, d).replace(/^in\s+/i, "").replace(/\s+ago$/i, "")
}

function no(a, e) {
    if (!e) return null;
    const s = new Date(e);
    return Number.isNaN(s.getTime()) ? null : new Intl.DateTimeFormat(a.locale, {
        hour: "numeric",
        minute: "2-digit"
    }).format(s)
}

function vt({
    currentModelName: a,
    disabled: e,
    disabledReason: s,
    fileUploads: r,
    hasAddPhotosItem: l,
    imageUploads: o,
    intl: n,
    mode: c
}) {
    const p = l ? "android" : c === "sheet" && Ce() ? "ios" : "default";
    if (o === "allowed" && r === "allowed") return n.formatMessage({
        id: "LocalFileDropdownItem.uploadPhotosAndFiles",
        defaultMessage: "Photos & files"
    });
    if (o === "allowed" && r !== "allowed") return n.formatMessage({
        id: "LocalFileDropdownItem.uploadImagesOnly",
        defaultMessage: "Add photos"
    });
    switch (p) {
        case "android":
            return n.formatMessage({
                id: "LocalFileDropdownItem.uploadFilesOnly",
                defaultMessage: "Add files"
            });
        case "ios":
            return n.formatMessage({
                id: "LocalFileDropdownItem.uploadPhotosAndFiles",
                defaultMessage: "Photos & files"
            });
        case "default":
            return we(n, e, s, a)
    }
}

function Ft({
    composerPlusMenuStore: a,
    mode: e,
    openFileDialog: s
}) {
    if (e === "sheet") {
        a.keepSheetOpen$.set(!0), Promise.resolve().then(() => {
            s()
        });
        return
    }
    s()
}

function lo(a) {
    "use forget";
    const e = z.c(57),
        {
            openFileDialog: s,
            showMenuForNoAuth: r,
            showFreeUploadUpsell: l,
            mode: o,
            modelSupportsImages: n,
            isDisabled: c,
            disabledReason: p,
            rateLimitInfo: d,
            currentModelName: u,
            clientThreadId: m
        } = a,
        i = l === void 0 ? !1 : l,
        f = je(),
        h = se(Rt),
        g = G(),
        b = At(co),
        y = b ? .remaining ? ? null,
        M = b ? .reset_after ? ? null;
    let x;
    e[0] !== g || e[1] !== M ? (x = no(g, M), e[0] = g, e[1] = M, e[2] = x) : x = e[2];
    const j = x,
        L = f ? .isFree() ? ? !1,
        _ = i && L && y != null && p !== V.ModelNotSupported && p !== V.HasReachedMaxFiles && p !== V.SteeringAsyncTaskPending;
    let S;
    e[3] !== c || e[4] !== n ? (S = n && !c && Et(), e[3] = c, e[4] = n, e[5] = S) : S = e[5];
    const k = S;
    let v;
    e[6] !== c || e[7] !== n ? (v = n && !c && Ce() && Ut(), e[6] = c, e[7] = n, e[8] = v) : v = e[8];
    const C = v,
        N = c && p === V.RateLimitReached && !_,
        F = Ue(m, De.getIsNewConversation),
        T = le.useRef(!1);
    let A;
    e[9] !== f ? .planType || e[10] !== F || e[11] !== N ? (A = () => {
        N && !T.current && (de.logEventWithStatsig("Rate Limit: Show Info", "chatgpt_rate_limit_tooltip_shown", {
            location: "file_upload",
            type: "rate_limit",
            plan_type: f ? .planType ? ? "unknown",
            is_new_conversation: F
        }), T.current = !0)
    }, e[9] = f ? .planType, e[10] = F, e[11] = N, e[12] = A) : A = e[12];
    let E;
    e[13] !== F || e[14] !== N ? (E = [N, F, f ? .planType], e[13] = F, e[14] = N, e[15] = E) : E = e[15], le.useEffect(A, E);
    let R;
    if (_) {
        let I;
        e[16] !== f || e[17] !== u || e[18] !== C || e[19] !== F || e[20] !== o || e[21] !== s || e[22] !== y || e[23] !== j ? (I = t.jsx(po, {
            account: f,
            currentModelName: u,
            hasAddPhotosItem: C,
            isNewConversation: F,
            mode: o,
            onUploadFile: s,
            remainingFileUploads: y,
            resetAfterText: j
        }), e[16] = f, e[17] = u, e[18] = C, e[19] = F, e[20] = o, e[21] = s, e[22] = y, e[23] = j, e[24] = I) : I = e[24], R = I
    } else if (c && p === V.RateLimitReached)
        if (f ? .hasPaidSubscription()) {
            const I = o === "sheet",
                w = d ? ? null;
            let P;
            e[25] !== f || e[26] !== u || e[27] !== I || e[28] !== w ? (P = t.jsx(at, {
                account: f,
                forSheet: I,
                rateLimitInfo: w,
                currentModelName: u
            }), e[25] = f, e[26] = u, e[27] = I, e[28] = w, e[29] = P) : P = e[29], R = P
        } else {
            const I = o === "sheet" ? "title_and_description" : h.attachfileRateLimitMessageVariant;
            e: switch (I) {
                case "linked_text":
                    {
                        const w = d ? ? null;
                        let P;e[30] !== f || e[31] !== h.attachfileRateLimitMessageShowIcon || e[32] !== w ? (P = t.jsx(mo, {
                            account: f,
                            rateLimitInfo: w,
                            showIcon: h.attachfileRateLimitMessageShowIcon
                        }), e[30] = f, e[31] = h.attachfileRateLimitMessageShowIcon, e[32] = w, e[33] = P) : P = e[33],
                        R = P;
                        break e
                    }
                case "title_and_description":
                    {
                        const w = o === "sheet",
                            P = d ? ? null;
                        let K;e[34] !== f || e[35] !== u || e[36] !== w || e[37] !== P ? (K = t.jsx(at, {
                            account: f,
                            forSheet: w,
                            rateLimitInfo: P,
                            currentModelName: u
                        }), e[34] = f, e[35] = u, e[36] = w, e[37] = P, e[38] = K) : K = e[38],
                        R = K;
                        break e
                    }
                case "upgrade_button":
                    {
                        const w = d ? ? null;
                        let P;e[39] !== f || e[40] !== w ? (P = t.jsx(go, {
                            account: f,
                            rateLimitInfo: w
                        }), e[39] = f, e[40] = w, e[41] = P) : P = e[41],
                        R = P
                    }
            }
        }
    else {
        const I = d ? ? null;
        let w;
        e[42] !== u || e[43] !== p || e[44] !== C || e[45] !== c || e[46] !== o || e[47] !== s || e[48] !== I ? (w = t.jsx(t.Fragment, {
            children: t.jsx(uo, {
                mode: o,
                rateLimitInfo: I,
                hasAddPhotosItem: C,
                currentModelName: u,
                openFileDialog: s,
                disabled: c,
                disabledReason: p
            })
        }), e[42] = u, e[43] = p, e[44] = C, e[45] = c, e[46] = o, e[47] = s, e[48] = I, e[49] = w) : w = e[49], R = w
    }
    let $;
    return e[50] !== R || e[51] !== C || e[52] !== k || e[53] !== o || e[54] !== s || e[55] !== r ? ($ = r ? t.jsx(ho, {
        onClickUploadImages: s,
        redirectToAuth: ro
    }) : o === "sheet" ? t.jsxs(t.Fragment, {
        children: [k && t.jsx(Je, {
            forMobileSheet: !0
        }), C && t.jsx(et, {
            forMobileSheet: !0
        }), R]
    }) : t.jsxs(t.Fragment, {
        children: [C && t.jsx(et, {}), k && t.jsx(Je, {}), R]
    }), e[50] = R, e[51] = C, e[52] = k, e[53] = o, e[54] = s, e[55] = r, e[56] = $) : $ = e[56], $
}

function ro() {
    return Le({
        fallbackScreenHint: "login",
        loginModalSubtitleVariant: "upload-file",
        skipLoginModal: !1
    })
}

function co(a) {
    return a.feature_name === Dt.FILE_UPLOAD
}

function uo(a) {
    "use forget";
    const e = z.c(26),
        {
            hasAddPhotosItem: s,
            currentModelName: r,
            mode: l,
            openFileDialog: o,
            disabled: n,
            disabledReason: c
        } = a,
        p = dt();
    let d;
    e[0] !== p ? (d = _t(p), e[0] = p, e[1] = d) : d = e[1];
    const u = d,
        m = G(),
        i = se(Bt),
        {
            file_uploads: f,
            image_uploads: h
        } = Ge();
    let g;
    e[2] !== r || e[3] !== n || e[4] !== c || e[5] !== f || e[6] !== s || e[7] !== h || e[8] !== m || e[9] !== l ? (g = vt({
        currentModelName: r,
        disabled: n,
        disabledReason: c,
        fileUploads: f,
        hasAddPhotosItem: s,
        imageUploads: h,
        intl: m,
        mode: l
    }), e[2] = r, e[3] = n, e[4] = c, e[5] = f, e[6] = s, e[7] = h, e[8] = m, e[9] = l, e[10] = g) : g = e[10];
    const b = g,
        y = l === "sheet" ? O.HeaderItem : O.Item,
        M = l === "sheet" ? "large" : void 0;
    let x;
    e[11] !== u || e[12] !== l || e[13] !== o ? (x = () => Ft({
        composerPlusMenuStore: u,
        mode: l,
        openFileDialog: o
    }), e[11] = u, e[12] = l, e[13] = o, e[14] = x) : x = e[14];
    let j;
    e[15] === Symbol.for("react.memo_cache_sentinel") ? (j = t.jsx(Te, {
        className: "icon"
    }), e[15] = j) : j = e[15];
    let L;
    e[16] !== l ? (L = l !== "sheet" && t.jsx(Ts, {
        binding: io,
        className: "touch:hidden"
    }), e[16] = l, e[17] = L) : L = e[17];
    let _;
    return e[18] !== y || e[19] !== n || e[20] !== i || e[21] !== b || e[22] !== M || e[23] !== x || e[24] !== L ? (_ = t.jsx(y, {
        size: M,
        onClick: x,
        icon: j,
        label: b,
        disabled: n,
        highlightTrailing: L,
        showHighlightTrailing: i
    }, "upload"), e[18] = y, e[19] = n, e[20] = i, e[21] = b, e[22] = M, e[23] = x, e[24] = L, e[25] = _) : _ = e[25], _
}

function po(a) {
    "use forget";
    const e = z.c(37),
        {
            account: s,
            currentModelName: r,
            hasAddPhotosItem: l,
            isNewConversation: o,
            mode: n,
            onUploadFile: c,
            remainingFileUploads: p,
            resetAfterText: d
        } = a,
        u = dt();
    let m;
    e[0] !== u ? (m = _t(u), e[0] = u, e[1] = m) : m = e[1];
    const i = m,
        f = G(),
        h = ae(),
        {
            file_uploads: g,
            image_uploads: b
        } = Ge();
    let y;
    e[2] !== r || e[3] !== g || e[4] !== l || e[5] !== b || e[6] !== f || e[7] !== n ? (y = vt({
        currentModelName: r,
        disabled: !1,
        disabledReason: void 0,
        fileUploads: g,
        hasAddPhotosItem: l,
        imageUploads: b,
        intl: f,
        mode: n
    }), e[2] = r, e[3] = g, e[4] = l, e[5] = b, e[6] = f, e[7] = n, e[8] = y) : y = e[8];
    const M = y,
        x = p ? ? 0,
        j = p == null || x > 0;
    let L;
    e[9] !== f || e[10] !== x || e[11] !== d ? (L = f.formatMessage(x === 0 && d ? q.freeUploadsRemainingUntilReset : q.freeUploadsRemaining, {
        remaining: x,
        resetAfterText: d
    }), e[9] = f, e[10] = x, e[11] = d, e[12] = L) : L = e[12];
    const _ = L,
        S = n === "sheet" ? O.HeaderItemRow : O.Item;
    let k;
    e[13] !== s ? .planType || e[14] !== o || e[15] !== h ? (k = () => {
        Oe(h, "Composer file upload dropdown"), xt({
            hard_block_reason: "",
            is_hard_block: !1,
            is_new_conversation: o,
            location: "composer_dropdown",
            plan_type: s ? .planType ? ? "unknown",
            type: "file_upload",
            upgrade_plan_tye: Fe.PLUS
        }), $e({
            type: "file_upload",
            location: "composer_dropdown",
            plan_type: s ? .planType ? ? "unknown",
            is_hard_block: !1,
            is_new_conversation: o,
            hard_block_reason: ""
        })
    }, e[13] = s ? .planType, e[14] = o, e[15] = h, e[16] = k) : k = e[16];
    const v = k;
    let C;
    e[17] === Symbol.for("react.memo_cache_sentinel") ? (C = t.jsx(Te, {
        className: "icon"
    }), e[17] = C) : C = e[17];
    let N;
    e[18] !== j || e[19] !== i || e[20] !== n || e[21] !== c || e[22] !== v ? (N = () => {
        j ? Ft({
            composerPlusMenuStore: i,
            mode: n,
            openFileDialog: c
        }) : v()
    }, e[18] = j, e[19] = i, e[20] = n, e[21] = c, e[22] = v, e[23] = N) : N = e[23];
    let F;
    e[24] !== n || e[25] !== v || e[26] !== _ ? (F = n === "sheet" ? _ : t.jsxs("div", {
        className: "text-token-text-tertiary flex w-full gap-1 text-[11px] leading-[13px] tracking-[0.06px]",
        children: [t.jsx("span", {
            className: "min-w-0",
            children: _
        }), t.jsx("button", {
            type: "button",
            className: "shrink-0 font-medium whitespace-nowrap text-[#5856D6] hover:underline dark:text-[#DCDBF6]",
            onClick: E => {
                E.preventDefault(), E.stopPropagation(), v()
            },
            children: t.jsx(U, { ...Z.upgrade
            })
        })]
    }), e[24] = n, e[25] = v, e[26] = _, e[27] = F) : F = e[27];
    let T;
    e[28] !== n || e[29] !== v ? (T = n === "sheet" ? t.jsx(re, {
        className: "min-h-9",
        onClick: E => {
            E.preventDefault(), E.stopPropagation(), v()
        },
        children: t.jsx(U, { ...Z.upgrade
        })
    }) : void 0, e[28] = n, e[29] = v, e[30] = T) : T = e[30];
    let A;
    return e[31] !== S || e[32] !== M || e[33] !== N || e[34] !== F || e[35] !== T ? (A = t.jsx(S, {
        icon: C,
        label: M,
        onClick: N,
        secondary: F,
        trailing: T
    }, "upload"), e[31] = S, e[32] = M, e[33] = N, e[34] = F, e[35] = T, e[36] = A) : A = e[36], A
}

function at(a) {
    "use forget";
    const e = z.c(28),
        {
            account: s,
            forSheet: r,
            rateLimitInfo: l,
            currentModelName: o
        } = a,
        n = G(),
        c = ae();
    let p, d;
    if (e[0] !== s || e[1] !== n || e[2] !== l ? .resets_after) {
        const y = ze(l ? .resets_after);
        let M;
        if (e[5] === Symbol.for("react.memo_cache_sentinel") ? (M = t.jsx(Te, {
                className: "icon"
            }), e[5] = M) : M = e[5], p = M, s ? .hasPaidSubscription()) d = n.formatMessage({
            id: "ZBhfvX",
            defaultMessage: "Wait {time} to upload again"
        }, {
            time: y
        });
        else {
            let x;
            e[6] === Symbol.for("react.memo_cache_sentinel") ? (x = t.jsx(Ls, {
                className: "icon"
            }), e[6] = x) : x = e[6], p = x, d = n.formatMessage({
                id: "ba5pHI",
                defaultMessage: "Or wait {time} to upload again"
            }, {
                time: y
            })
        }
        e[0] = s, e[1] = n, e[2] = l ? .resets_after, e[3] = p, e[4] = d
    } else p = e[3], d = e[4];
    const u = r ? O.HeaderItemRow : O.Item;
    let m;
    e[7] !== s || e[8] !== c ? (m = () => {
        s ? Me(c, s) : Le({
            fallbackScreenHint: "login_or_signup",
            callback: fo,
            skipLoginModal: !1
        })
    }, e[7] = s, e[8] = c, e[9] = m) : m = e[9];
    const i = !r && p;
    let f;
    e[10] !== s || e[11] !== r ? (f = s ? .hasPaidSubscription() && !r, e[10] = s, e[11] = r, e[12] = f) : f = e[12];
    let h;
    e[13] !== o || e[14] !== n ? (h = we(n, !0, V.RateLimitReached, o), e[13] = o, e[14] = n, e[15] = h) : h = e[15];
    let g;
    e[16] !== s || e[17] !== r || e[18] !== c ? (g = r && !s ? .hasPaidSubscription() && t.jsx(re, {
        className: "min-h-9",
        onClick: () => {
            Me(c, s)
        },
        children: t.jsx(U, { ...Z.upgrade
        })
    }), e[16] = s, e[17] = r, e[18] = c, e[19] = g) : g = e[19];
    let b;
    return e[20] !== u || e[21] !== d || e[22] !== m || e[23] !== i || e[24] !== f || e[25] !== h || e[26] !== g ? (b = t.jsx(u, {
        onClick: m,
        icon: i,
        disabled: f,
        label: h,
        trailing: g,
        secondary: d
    }, "upload"), e[20] = u, e[21] = d, e[22] = m, e[23] = i, e[24] = f, e[25] = h, e[26] = g, e[27] = b) : b = e[27], b
}

function fo(a) {
    ct({
        provider: a,
        location: "File picker rate limit tooltip"
    }, Be.ACCESS_FLOW_ENTRY_POINT_FILE_PICKER_RATE_LIMIT_TOOLTIP)
}

function mo(a) {
    "use forget";
    const e = z.c(23),
        {
            account: s,
            rateLimitInfo: r,
            showIcon: l
        } = a,
        o = G(),
        n = ae();
    let c, p, d, u, m;
    if (e[0] !== s || e[1] !== o || e[2] !== n || e[3] !== r ? .resets_after || e[4] !== l) {
        const h = ze(r ? .resets_after);
        d = "upload", u = `group flex min-w-0 items-center py-2 ${l?"px-2.5":"px-5"}`, e[10] !== l ? (m = l && t.jsx("div", {
            className: "flex h-8 w-8 shrink-0 items-center justify-center",
            children: t.jsx(Te, {
                className: "text-token-text-tertiary"
            })
        }), e[10] = l, e[11] = m) : m = e[11], c = "text-token-text-tertiary line-clamp-2 block max-w-[212px] min-w-0 flex-1 text-start text-sm font-light";
        let g;
        e[12] !== s || e[13] !== n ? (g = b => t.jsx("button", {
            type: "button",
            className: "text-token-text-secondary underline",
            onClick: () => {
                Me(n, s)
            },
            children: b
        }), e[12] = s, e[13] = n, e[14] = g) : g = e[14], p = o.formatMessage({
            id: "egGG9V",
            defaultMessage: "<link>Upgrade to Plus</link> to attach more files or try again in {time}"
        }, {
            time: h,
            link: g
        }), e[0] = s, e[1] = o, e[2] = n, e[3] = r ? .resets_after, e[4] = l, e[5] = c, e[6] = p, e[7] = d, e[8] = u, e[9] = m
    } else c = e[5], p = e[6], d = e[7], u = e[8], m = e[9];
    let i;
    e[15] !== c || e[16] !== p ? (i = t.jsx("div", {
        className: c,
        children: p
    }), e[15] = c, e[16] = p, e[17] = i) : i = e[17];
    let f;
    return e[18] !== d || e[19] !== u || e[20] !== m || e[21] !== i ? (f = t.jsxs("div", {
        className: u,
        children: [m, i]
    }, d), e[18] = d, e[19] = u, e[20] = m, e[21] = i, e[22] = f) : f = e[22], f
}

function go(a) {
    "use forget";
    const e = z.c(21),
        {
            account: s,
            rateLimitInfo: r
        } = a,
        l = G(),
        o = ae();
    let n, c, p, d;
    if (e[0] !== l || e[1] !== r ? .resets_after) {
        const b = ze(r ? .resets_after);
        p = "upload", d = "flex flex-col gap-2 px-5 py-2", n = "text-token-text-tertiary max-w-[212px] text-start text-sm font-light", c = l.formatMessage({
            id: "/zL/ev",
            defaultMessage: "Upgrade to Plus to attach more files or try again in {time}"
        }, {
            time: b
        }), e[0] = l, e[1] = r ? .resets_after, e[2] = n, e[3] = c, e[4] = p, e[5] = d
    } else n = e[2], c = e[3], p = e[4], d = e[5];
    let u;
    e[6] !== n || e[7] !== c ? (u = t.jsx("div", {
        className: n,
        children: c
    }), e[6] = n, e[7] = c, e[8] = u) : u = e[8];
    let m;
    e[9] !== s || e[10] !== o ? (m = () => {
        Me(o, s)
    }, e[9] = s, e[10] = o, e[11] = m) : m = e[11];
    let i, f;
    e[12] === Symbol.for("react.memo_cache_sentinel") ? (i = t.jsx(Cs, {
        className: "icon-sm text-[#5D5BD0] dark:text-[#DCDBF6]"
    }), f = t.jsx(U, { ...Z.upgrade
    }), e[12] = i, e[13] = f) : (i = e[12], f = e[13]);
    let h;
    e[14] !== m ? (h = t.jsxs("button", {
        type: "button",
        className: "flex w-full items-center justify-center gap-1 rounded-full bg-[#F1F1FB] px-4 py-2 text-sm font-medium text-[#AF52DE] hover:bg-[#E4E4F6] dark:bg-[#373669] dark:text-[#DCDBF6] dark:hover:bg-[#414071]",
        onClick: m,
        children: [i, f]
    }), e[14] = m, e[15] = h) : h = e[15];
    let g;
    return e[16] !== p || e[17] !== d || e[18] !== u || e[19] !== h ? (g = t.jsxs("div", {
        className: d,
        children: [u, h]
    }, p), e[16] = p, e[17] = d, e[18] = u, e[19] = h, e[20] = g) : g = e[20], g
}

function Me(a, e) {
    Oe(a, "Rate limited file upload inline-text", void 0, void 0, void 0, {
        isStorageUpsellActive: !0
    }), $e({
        type: "file_upload",
        location: "inline-text",
        plan_type: e ? .planType ? ? "unknown",
        is_hard_block: !1,
        hard_block_reason: ""
    })
}

function ho(a) {
    "use forget";
    const e = z.c(15),
        {
            onClickUploadImages: s,
            redirectToAuth: r
        } = a;
    let l;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (l = t.jsx(U, { ...q.connectApps
    }), e[0] = l) : l = e[0];
    let o;
    e[1] === Symbol.for("react.memo_cache_sentinel") ? (o = t.jsxs("div", {
        className: "flex flex-col",
        children: [l, t.jsx("span", {
            className: "text-token-text-secondary text-[13px]",
            children: t.jsx(U, { ...q.loginRequired
            })
        })]
    }), e[1] = o) : o = e[1];
    let n;
    e[2] !== r ? (n = t.jsx(O.Item, {
        icon: ws,
        onClick: r,
        children: o
    }, "connect-apps-no-auth"), e[2] = r, e[3] = n) : n = e[3];
    let c;
    e[4] === Symbol.for("react.memo_cache_sentinel") ? (c = t.jsx(U, { ...q.uploadDocuments
    }), e[4] = c) : c = e[4];
    let p;
    e[5] === Symbol.for("react.memo_cache_sentinel") ? (p = t.jsxs("div", {
        className: "flex flex-col",
        children: [c, t.jsx("span", {
            className: "text-token-text-secondary text-[13px]",
            children: t.jsx(U, { ...q.loginRequired
            })
        })]
    }), e[5] = p) : p = e[5];
    let d;
    e[6] !== r ? (d = t.jsx(O.Item, {
        icon: Ot,
        onClick: r,
        children: p
    }, "upload-documents-no-auth"), e[6] = r, e[7] = d) : d = e[7];
    let u;
    e[8] === Symbol.for("react.memo_cache_sentinel") ? (u = t.jsx(U, { ...q.uploadImages
    }), e[8] = u) : u = e[8];
    let m;
    e[9] !== s ? (m = t.jsx(O.Item, {
        icon: Ss,
        onClick: s,
        children: u
    }, "upload-images-no-auth"), e[9] = s, e[10] = m) : m = e[10];
    let i;
    return e[11] !== n || e[12] !== d || e[13] !== m ? (i = t.jsxs(t.Fragment, {
        children: [n, d, m]
    }), e[11] = n, e[12] = d, e[13] = m, e[14] = i) : i = e[14], i
}
const q = ke({
    connectApps: {
        id: "Rna6u2",
        defaultMessage: "Connect apps"
    },
    uploadDocuments: {
        id: "0BxpM7",
        defaultMessage: "Documents"
    },
    uploadImages: {
        id: "rdMuNJ",
        defaultMessage: "Images"
    },
    freeUploadsRemaining: {
        id: "+c33WN",
        defaultMessage: "{remaining, plural, =0 {0 left} one {# left} other {# left}}."
    },
    freeUploadsRemainingUntilReset: {
        id: "ZxCo/a",
        defaultMessage: "{remaining, plural, =0 {0 left} one {# left} other {# left}} until {resetAfterText}."
    },
    loginRequired: {
        id: "/1XNys",
        defaultMessage: "Login required"
    }
});

function Do({
    clientThreadId: a,
    openFileDialog: e,
    icon: s,
    isDisabled: r = !1,
    isSmall: l = !1,
    showLabel: o = !1,
    showUpsell: n = !1,
    hideBorder: c = !1,
    highlightTooltip: p = !1,
    disabledReason: d,
    currentModelName: u,
    visualTreatment: m,
    showMenuForNoAuth: i,
    modelSupportsImages: f
}) {
    const h = G(),
        g = ut();
    r = (r || !!g) && !n;
    const b = o && (i || n) && !r ? Is(h) : we(h, r, d, u),
        M = t.jsxs(Ps, {
            type: "button",
            disabled: r,
            $showLabel: o,
            $hideBorder: c,
            $isSmall: l,
            $visualTreatment: m,
            onClick: () => {
                if (i || n) {
                    const x = {
                        location: i ? "No auth file upload" : "No auth upsell"
                    };
                    de.logEvent("No Auth Attach Button Clicked", x), oe.logEvent("chatgpt_web_no_auth_attach_button_clicked", null, x);
                    return
                }
                e()
            },
            "aria-label": b,
            children: [s, o && t.jsx(Ns, {})]
        });
    if (i || n) {
        const x = i ? t.jsx(lo, {
                openFileDialog: e,
                showMenuForNoAuth: !0,
                modelSupportsImages: f,
                clientThreadId: a
            }) : t.jsx(Rs, {
                location: "attach",
                statsig_login_event: "chatgpt_composer_upsell_login_button_clicked",
                statsig_signup_event: "chatgpt_composer_upsell_signup_button_clicked"
            }),
            j = t.jsx(O.BasicTrigger, {
                asChild: !0,
                children: M
            });
        return t.jsxs(O.Root, {
            children: [i ? t.jsx(ot, {
                conversation: Ze(a),
                rateLimitPopup: g,
                highlightTooltip: p,
                disabled: r,
                disabledReason: d,
                currentModelName: u,
                children: j
            }) : t.jsx(rt, {
                label: t.jsx(U, {
                    id: "wkpQmi",
                    defaultMessage: "Upload files and more"
                }),
                side: "bottom",
                open: p || void 0,
                children: j
            }), t.jsx(O.Portal, {
                children: t.jsx(O.Content, {
                    alignOffset: -8,
                    side: "bottom",
                    size: "small",
                    className: "radix-side-bottom:flex-col-reverse flex flex-col",
                    children: x
                })
            })]
        })
    }
    return t.jsx(ot, {
        disabled: r,
        conversation: Ze(a),
        rateLimitPopup: g,
        highlightTooltip: p,
        disabledReason: d,
        currentModelName: u,
        children: M
    })
}

function xo({
    code: a,
    message: e
}) {
    switch (a) {
        case tt.FileTooLarge:
            return it.errorFileTooLarge;
        case tt.TooManyFiles:
            return de.logEvent("Uploaded Max Files Error"), it.errorTooManyFiles;
        default:
            return e
    }
}
const it = ke({
        errorFileTooLarge: {
            id: "PromptFilePicker.errorFileTooLarge",
            defaultMessage: "Your file is too large. The maximum file size is {size}MB."
        },
        errorTooManyFiles: {
            id: "PromptFilePicker.errorTooManyFiles",
            defaultMessage: "You may only upload {maxNum} files at a time."
        }
    }),
    nt = ke({
        dragInstructions: {
            id: "FileDropZone.dragInstructions",
            defaultMessage: "Add anything"
        },
        dragAllAccepted: {
            id: "FileDropZone.dragAllAccepted",
            defaultMessage: "Drop any file here to add it to the conversation"
        }
    });

function _o(a) {
    if (!a.accept || Object.keys(a.accept).length === 0) return [];
    const e = [];
    return Object.values(a.accept).forEach(s => e.push(...s)), e.sort()
}

function Bo(a) {
    "use forget";
    const e = z.c(70),
        {
            className: s,
            children: r,
            conversation: l,
            currentModelConfig: o,
            isLibraryEnabled: n,
            noKeyboard: c
        } = a,
        p = n === void 0 ? !1 : n,
        d = G(),
        u = ae(),
        m = ft();
    let i;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (i = Ce(), e[0] = i) : i = e[0];
    const f = i,
        g = se(yo) ? !1 : void 0,
        b = se(l.serverId$),
        y = Ue(l.id, De.getCurrentLeafId);
    let M;
    e[1] !== y || e[2] !== b ? (M = b ? {
        origination_thread_id: b,
        ...y ? {
            origination_message_id: y
        } : {}
    } : void 0, e[1] = y, e[2] = b, e[3] = M) : M = e[3];
    const x = M,
        L = pt().flags ? .includes(mt.NoAuthEnableFileUploads),
        _ = Es(l.id),
        S = qt();
    let k;
    e[4] !== S || e[5] !== _ || e[6] !== o ? (k = Yt(o, _, S), e[4] = S, e[5] = _, e[6] = o, e[7] = k) : k = e[7];
    const v = k,
        C = v !== gt.None,
        N = Xt(bo),
        {
            baseLimit: F,
            remaining: T,
            maxUploads: A
        } = Qt(v),
        E = Math.max(0, A - N.length),
        R = E <= 0;
    let $;
    e[8] !== F || e[9] !== d || e[10] !== T ? ($ = Us(T, F) ? Ds(d, T) : null, e[8] = F, e[9] = d, e[10] = T, e[11] = $) : $ = e[11];
    const I = $,
        w = I != null && T === 0,
        {
            getGizmoId: P
        } = Jt();
    let K;
    e[12] !== l ? (K = () => is(l), e[12] = l, e[13] = K) : K = e[13];
    const Se = se(K),
        Mt = Array.isArray(Se) && Se.length > 0;
    let ue;
    e[14] !== l ? (ue = () => ns(l), e[14] = l, e[15] = ue) : ue = e[15];
    const kt = se(ue);
    let pe;
    e[16] !== _ || e[17] !== o ? (pe = Ye(o, _), e[16] = _, e[17] = o, e[18] = pe) : pe = e[18];
    let fe;
    e[19] !== _ || e[20] !== o ? (fe = es(o, _) ? .attachments, e[19] = _, e[20] = o, e[21] = fe) : fe = e[21];
    const {
        handleFileAccepted: Ie
    } = Mo(d, v, pe, "drag", p, P, fe, Mt ? Se : void 0, kt, g, x), me = ut();
    let ge;
    e[22] === Symbol.for("react.memo_cache_sentinel") ? (ge = Bs(), e[22] = ge) : ge = e[22];
    const {
        enabled: He,
        cooldownSeconds: jt,
        bannerUpgradeCta: Lt,
        bannerOnly: Ct
    } = ge;
    let he;
    e[23] !== me ? (he = $s(me) ? me : null, e[23] = me, e[24] = he) : he = e[24];
    const H = he,
        xe = H != null && He;
    let _e;
    e[25] !== H || e[26] !== xe || e[27] !== d || e[28] !== u || e[29] !== m ? (_e = () => {
        if (H == null) return !1;
        if (!xe) return ls.showRateLimitFeatureBlockBanner(H), !0;
        if (Gs({
                enabled: He,
                cooldownSeconds: jt,
                bannerOnly: Ct
            })) {
            const D = H.call_to_action ? .[0],
                B = Lt && D != null ? zs(d) : null;
            if (B != null) {
                const We = {};
                We.current = st({
                    rateLimitFeatureBlock: H,
                    intl: d,
                    toaster: m,
                    title: "",
                    description: t.jsxs("div", {
                        className: "text-start",
                        children: [t.jsx("span", {
                            children: Hs(d)
                        }), t.jsx("button", {
                            type: "button",
                            className: "mx-1 font-medium underline underline-offset-2 hover:no-underline focus-visible:no-underline focus-visible:outline-none",
                            onClick: () => {
                                We.current ? .close(), Vs({
                                    navigate: u,
                                    openModalLocation: Ks,
                                    primaryAction: D
                                })
                            },
                            children: B
                        }), t.jsx("span", {
                            children: Ws(H, d)
                        })]
                    })
                })
            } else st({
                rateLimitFeatureBlock: H,
                intl: d,
                toaster: m
            });
            return !0
        }
        return Zs(), rs(qs, {
            rateLimitFeatureBlock: H
        }), !0
    }, e[25] = H, e[26] = xe, e[27] = d, e[28] = u, e[29] = m, e[30] = _e) : _e = e[30];
    const Y = _e,
        {
            file_uploads: Ve,
            image_uploads: Ke
        } = Ge();
    let ie;
    e: {
        if (Ke === "allowed" && Ve !== "allowed") {
            ie = cs;
            break e
        } else if (Ke === "blocked" && Ve === "blocked") {
            let B;
            e[31] === Symbol.for("react.memo_cache_sentinel") ? (B = [], e[31] = B) : B = e[31], ie = B;
            break e
        } else if (!f && L) {
            let B;
            e[32] !== _ || e[33] !== o ? (B = Ye(o, _), e[32] = _, e[33] = o, e[34] = B) : B = e[34], ie = B;
            break e
        }
        let D;e[35] !== _ || e[36] !== o ? (D = ts(o, _), e[35] = _, e[36] = o, e[37] = D) : D = e[37],
        ie = D
    }
    const X = ss(ie),
        Pe = !C || R && !xe;
    let Q;
    e[38] !== Y || e[39] !== Ie ? (Q = (D, B) => {
        Y() || Ie(D, B)
    }, e[38] = Y, e[39] = Ie, e[40] = Q) : Q = e[40];
    let J;
    e[41] !== Y || e[42] !== d || e[43] !== m || e[44] !== v ? (J = D => {
        Y() || vo(D, d, m, v, f)
    }, e[41] = Y, e[42] = d, e[43] = m, e[44] = v, e[45] = J) : J = e[45];
    let be;
    e[46] !== X || e[47] !== c || e[48] !== E || e[49] !== Pe || e[50] !== Q || e[51] !== J ? (be = {
        maxFiles: E,
        disabled: Pe,
        noClick: !0,
        noKeyboard: c,
        onDropAccepted: Q,
        onDropRejected: J,
        multiple: !0,
        maxSize: os,
        ...X
    }, e[46] = X, e[47] = c, e[48] = E, e[49] = Pe, e[50] = Q, e[51] = J, e[52] = be) : be = e[52];
    const {
        getRootProps: ne,
        isDragActive: Ne
    } = Ys(be);
    let W, ee, te;
    if (e[53] !== r || e[54] !== s || e[55] !== X || e[56] !== ne || e[57] !== Ne || e[58] !== I || e[59] !== w) {
        const D = _o(X);
        e[63] !== s || e[64] !== ne ? (W = ne({
            className: s
        }), e[63] = s, e[64] = ne, e[65] = W) : W = e[65], ee = r, te = Ne && t.jsx(as, {
            asChild: !0,
            children: t.jsxs(wo, {
                className: "fixed inset-0",
                inert: !0,
                children: [t.jsx(Os, {}), I != null && t.jsx("p", {
                    className: "text-token-text-secondary text-sm leading-5 font-medium",
                    children: I
                }), !w && t.jsxs(t.Fragment, {
                    children: [t.jsx("h3", {
                        children: t.jsx(U, { ...nt.dragInstructions
                        })
                    }), t.jsx("h4", {
                        className: "w-2/3 text-center",
                        children: D.length > 0 ? D.join(", ") : t.jsx(U, { ...nt.dragAllAccepted
                        })
                    })]
                })]
            })
        }), e[53] = r, e[54] = s, e[55] = X, e[56] = ne, e[57] = Ne, e[58] = I, e[59] = w, e[60] = W, e[61] = ee, e[62] = te
    } else W = e[60], ee = e[61], te = e[62];
    let ye;
    return e[66] !== W || e[67] !== ee || e[68] !== te ? (ye = t.jsxs("div", { ...W,
        children: [ee, te]
    }), e[66] = W, e[67] = ee, e[68] = te, e[69] = ye) : ye = e[69], ye
}

function bo(a) {
    return a.files
}

function yo() {
    return ds()
}

function vo(a, e, s, r, l) {
    const {
        file: o
    } = a[0];
    if (!l && !(o.type.startsWith("image/") || Vt(o.name))) {
        Kt({
            files: a.map(n => n.file),
            toaster: s
        });
        return
    }
    Fo(a, e, s, r)
}

function Fo(a, e, s, r) {
    const {
        errors: l
    } = a[0], o = zt(r);
    l.forEach(n => {
        const c = xo(n);
        typeof c == "string" ? s.danger(c, {
            hasCloseButton: !0,
            loggingTitle: "File upload error",
            loggingDescription: c,
            toastId: "file_upload_error"
        }) : s.danger(e.formatMessage(c, {
            size: Ht,
            maxNum: o
        }), {
            hasCloseButton: !0,
            loggingTitle: c.defaultMessage || "File upload error",
            loggingDescription: c.defaultMessage || "File upload error",
            toastId: "file_upload_error"
        })
    })
}

function Mo(a, e, s, r, l, o, n, c, p, d, u, m) {
    "use forget";
    const i = z.c(22),
        f = l === void 0 ? !1 : l,
        h = pt().flags,
        g = ft(),
        b = Gt();
    let y;
    i[0] === Symbol.for("react.memo_cache_sentinel") ? (y = Ce(), i[0] = y) : y = i[0];
    const M = !y,
        x = c ? ? void 0;
    let j;
    i[1] !== f || i[2] !== d ? (j = As({
        storeInLibrary: d,
        isLibraryEnabled: f
    }), i[1] = f, i[2] = d, i[3] = j) : j = i[3];
    const L = j,
        _ = h ? .includes(mt.NoAuthEnableFileUploads);
    let S;
    i[4] !== n || i[5] !== x || i[6] !== L || i[7] !== o || i[8] !== a || i[9] !== f || i[10] !== u || i[11] !== s || i[12] !== m || i[13] !== _ || i[14] !== b || i[15] !== g || i[16] !== r || i[17] !== p || i[18] !== e ? (S = async (C, N) => {
        de.logEvent("Upload File", {
            client: "web",
            eventSource: r,
            intent: e.toString()
        });
        const F = o != null ? await o() : void 0,
            T = await Promise.all(C.map(To)),
            A = new Set(T.map(Co).filter(Lo)),
            E = T.map(jo).filter(ko);
        A.forEach(R => Wt(R, a, g)), E.length > 0 && E.forEach(R => {
            const $ = {
                    gizmoId: F,
                    projectUsesInjestPath: m,
                    uploadSource: p,
                    ..._ && {
                        isUnauthenticated: M
                    },
                    ...x && x.length > 0 ? {
                        contextScopes: x
                    } : {},
                    ...L !== void 0 ? {
                        storeInLibrary: L
                    } : {},
                    ...u !== void 0 ? {
                        libraryFileInfo: u
                    } : {}
                },
                I = [b, qe(R), R, e, s, a, g, $, n];
            if (e === gt.Retrieval) {
                let w = Promise.resolve(),
                    P = Promise.resolve();
                f ? P = Re.uploadFile(b, `${qe(R)}:lib`, R, e, s, a, g, $, n, void 0, !0, !0) : w = Re.uploadFile(...I, void 0, !1, f, !1), Promise.all([w, P])
            } else Re.uploadFile(...I)
        })
    }, i[4] = n, i[5] = x, i[6] = L, i[7] = o, i[8] = a, i[9] = f, i[10] = u, i[11] = s, i[12] = m, i[13] = _, i[14] = b, i[15] = g, i[16] = r, i[17] = p, i[18] = e, i[19] = S) : S = i[19];
    const k = S;
    let v;
    return i[20] !== k ? (v = {
        handleFileAccepted: k
    }, i[20] = k, i[21] = v) : v = i[21], v
}

function ko(a) {
    return a !== void 0
}

function jo(a) {
    const {
        file: e
    } = a;
    return e
}

function Lo(a) {
    return a !== void 0
}

function Co(a) {
    return "failureReason" in a ? a.failureReason : void 0
}

function To(a) {
    return Zt(a)
}
const wo = $t.div `pointer-events-none absolute z-50 inset-0 flex gap-2 flex-col justify-center items-center after:contents-[""] after:absolute after:opacity-80 after:z-[-1] after:bg-token-main-surface-primary after:inset-0`;
export {
    wo as D, Bo as F, Eo as M, Uo as O, Do as P, ot as a, lo as b, io as c, vo as d, we as g, Fo as h, Mo as u
};
//# sourceMappingURL=9bee0952-mp1gcgn6jckvpws6.js.map