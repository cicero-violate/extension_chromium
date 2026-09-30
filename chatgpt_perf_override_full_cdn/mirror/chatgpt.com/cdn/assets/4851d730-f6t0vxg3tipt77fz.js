import {
    h as D,
    u as T,
    j as e,
    o as b
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    I as B,
    b5 as o,
    af as k,
    aw as y,
    bW as A,
    vP as I
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    b4 as S,
    aT as r,
    b5 as i,
    b6 as v,
    b7 as W
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function U({
    inputRef: c,
    isLoading: n,
    shareUrl: l,
    sharedObject: t,
    shareTextPlaceholder: j,
    title: p,
    isCopySuccessful: m,
    isCreateLinkRequestInProgress: x,
    didPublishUpdates: M,
    isPublishedVersionLatest: u,
    handleUpdateLatestSharedVersion: f,
    handlePrivacyChange: w,
    handlePrimaryButtonClick: N,
    maybeRenderWarndingContent: C
}) {
    const a = T(),
        P = B() ? .isWorkspaceAccount(),
        g = p ? e.jsx(b, {
            id: "mxstAC",
            defaultMessage: "Share {title}",
            values: {
                title: `'${p}'`
            }
        }) : e.jsx(b, {
            id: "dm0aoB",
            defaultMessage: "Share"
        });
    return t ? .isModerationBlocked ? e.jsx("div", {
        className: "w-[max(95vw,300px)] sm:w-[460px]",
        children: e.jsx("div", {
            className: "overflow-hidden rounded-[22px] shadow-[0_4px_24px_-5px_rgba(0,0,0,0.2)]",
            children: e.jsxs("div", {
                className: "bg-token-main-surface-primary flex flex-col gap-4 border-b border-black/10 pt-5 *:px-5 dark:border-white/10",
                children: [e.jsx("div", {
                    className: "text-lg font-semibold",
                    children: g
                }), e.jsx("div", {
                    className: "pb-6",
                    children: e.jsx("div", {
                        className: "text-md border-token-surface-error/5 bg-token-surface-error/5 text-token-text-error rounded-lg border px-4 py-2",
                        children: a.formatMessage(s.moderationBlocked)
                    })
                })]
            })
        })
    }) : e.jsx(o.div, {
        initial: {
            opacity: 0,
            scale: .75
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        exit: {
            opacity: 0,
            scale: .75
        },
        style: {
            transformOrigin: "top right"
        },
        transition: {
            type: "spring",
            bounce: .2,
            duration: .32
        },
        className: "w-[max(95vw,300px)] sm:w-[460px]",
        children: e.jsx("div", {
            className: "overflow-hidden rounded-[22px] shadow-[0_4px_24px_-5px_rgba(0,0,0,0.2)]",
            children: e.jsxs("div", {
                className: "bg-token-main-surface-primary flex flex-col gap-4 border-b border-black/10 p-6 dark:border-white/10",
                children: [e.jsx("div", {
                    className: "line-clamp-1 text-lg font-medium",
                    children: g
                }), e.jsx("div", {
                    children: e.jsxs("div", {
                        className: "border-token-border-default text-token-text-secondary flex items-center justify-between rounded-full border",
                        children: [e.jsxs("div", {
                            className: "relative grow",
                            children: [e.jsx("input", {
                                ref: c,
                                type: "text",
                                readOnly: !0,
                                onPointerDown: h => {
                                    h.currentTarget.select(), h.preventDefault()
                                },
                                value: l,
                                placeholder: j,
                                className: k("text-md w-full rounded-xl border-0 bg-transparent py-2 ps-4 pe-0 focus:ring-0 focus:outline-hidden", t ? "text-token-text-secondary" : "text-token-text-tertiary")
                            }), e.jsx("div", {
                                className: "from-token-main-surface-primary pointer-events-none absolute end-0 top-0 bottom-0 w-6 bg-linear-to-l"
                            })]
                        }), e.jsx(y, {
                            icon: t ? null : S,
                            disabled: m,
                            loading: n || x,
                            onClick: N,
                            size: "medium",
                            className: k("absolute inset-0 m-1 font-semibold transition-opacity duration-300", n ? "pointer-events-none opacity-0" : "opacity-100"),
                            children: m ? a.formatMessage(s.copied) : t ? a.formatMessage(s.copyLink) : x ? a.formatMessage(s.creatingLink) : n ? null : a.formatMessage(s.createLink)
                        })]
                    })
                }), C ? .(), t && e.jsx(r.Root, {
                    value: t.access,
                    onValueChange: w,
                    children: e.jsxs("div", {
                        className: "items-start",
                        children: [e.jsx(r.Trigger, {
                            asChild: !0,
                            className: "text-md text-token-text-secondary hover:bg-token-bg-primary dark:hover:bg-token-bg-primary flex h-auto w-full items-center justify-between p-0",
                            children: e.jsxs("div", {
                                className: "flex w-full items-start justify-between gap-2",
                                children: [e.jsx("div", {
                                    className: "text-token-text-secondary flex flex-col items-start text-sm",
                                    children: (() => {
                                        switch (t ? .access) {
                                            case i.PUBLIC:
                                                return e.jsxs(e.Fragment, {
                                                    children: [e.jsx("span", {
                                                        children: a.formatMessage(s.publicDescription)
                                                    }), e.jsx("span", {
                                                        children: a.formatMessage(s.conversationPrivateDescription)
                                                    })]
                                                });
                                            case i.PRIVATE:
                                                return e.jsx("span", {
                                                    children: a.formatMessage(s.privateDescription)
                                                });
                                            case i.WORKSPACE:
                                                return e.jsx("span", {
                                                    children: a.formatMessage(s.workspaceDescription)
                                                });
                                            case void 0:
                                                return null
                                        }
                                    })()
                                }), e.jsxs("button", {
                                    className: "text-token-text-primary hover:bg-token-main-surface-tertiary dark:hover:bg-token-main-surface-secondary flex items-center gap-1 rounded-lg py-1.5 ps-3 pe-2 text-sm font-semibold",
                                    children: [(() => {
                                        switch (t ? .access) {
                                            case i.PUBLIC:
                                                return e.jsx(v, {
                                                    className: "icon-xs me-1"
                                                });
                                            case i.PRIVATE:
                                                return e.jsx(W, {
                                                    className: "icon-xs me-1"
                                                });
                                            case i.WORKSPACE:
                                                return e.jsx(v, {
                                                    className: "icon-xs me-1"
                                                });
                                            case void 0:
                                                return null
                                        }
                                    })(), a.formatMessage(t ? .access === i.WORKSPACE ? s.workspace : t ? .access === i.PUBLIC ? s.public : s.private), e.jsx("span", {
                                        className: "text-token-text-tertiary",
                                        children: e.jsx(r.Icon, {})
                                    })]
                                })]
                            })
                        }), e.jsx(r.Portal, {
                            children: e.jsxs(r.Content, {
                                className: "min-w-[var(--radix-select-trigger-width)]",
                                position: "popper",
                                sideOffset: -50,
                                children: [P ? e.jsx(d, {
                                    access: i.WORKSPACE,
                                    title: a.formatMessage(s.workspace),
                                    description: a.formatMessage(s.workspaceDescription)
                                }) : e.jsx(d, {
                                    access: i.PUBLIC,
                                    title: a.formatMessage(s.public),
                                    description: a.formatMessage(s.publicDescription)
                                }), e.jsx(d, {
                                    access: i.PRIVATE,
                                    title: a.formatMessage(s.private),
                                    description: a.formatMessage(s.privateDescription)
                                })]
                            })
                        })]
                    })
                }), e.jsx(A, {
                    mode: "wait",
                    children: t && f && (!u || M) && e.jsx("div", {
                        className: "border-token-border-default border-t-token-border-xlight bg-token-main-surface-secondary text-token-text-secondary -mx-6 -mb-6 flex items-center justify-between gap-4 border-t px-[22px] py-4 text-sm",
                        children: u ? e.jsxs(e.Fragment, {
                            children: [e.jsx(o.div, {
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
                                    type: "spring",
                                    bounce: .2,
                                    duration: .32
                                },
                                children: a.formatMessage(s.publishedChanges)
                            }), e.jsx(o.div, {
                                initial: {
                                    opacity: 0,
                                    scale: 0
                                },
                                animate: {
                                    opacity: 1,
                                    scale: 1
                                },
                                transition: {
                                    type: "spring",
                                    bounce: .2,
                                    duration: .32
                                },
                                children: e.jsx(I, {
                                    className: "icon-lg my-2 me-2 shrink-0 opacity-50"
                                })
                            })]
                        }) : e.jsxs(o.div, {
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
                                type: "spring",
                                bounce: .2,
                                duration: .32
                            },
                            className: "flex w-full items-center justify-between gap-4",
                            children: [a.formatMessage(s.unsharedChanges), e.jsx(y, {
                                color: "secondary",
                                size: "medium",
                                className: "me-1 px-4",
                                onClick: () => f(t.id),
                                children: a.formatMessage(s.publish)
                            })]
                        })
                    })
                })]
            })
        })
    })
}

function d({
    access: c,
    title: n,
    description: l
}) {
    return e.jsx(r.Item, {
        iconClassName: "icon-lg",
        value: c,
        children: e.jsx("div", {
            className: "flex w-full items-start justify-between gap-2",
            children: e.jsxs("div", {
                className: "text-md flex flex-col items-start",
                children: [e.jsx("span", {
                    className: "text-md text-token-text-primary",
                    children: n
                }), e.jsx("span", {
                    className: "text-token-text-secondary text-sm",
                    children: l
                })]
            })
        })
    })
}
const s = D({
    share: {
        id: "Tne3oh",
        defaultMessage: "Share"
    },
    createLink: {
        id: "Ns/mpl",
        defaultMessage: "Create link"
    },
    copyLink: {
        id: "dHmHBn",
        defaultMessage: "Copy link"
    },
    creatingLink: {
        id: "hHh4kJ",
        defaultMessage: "Creating ..."
    },
    copied: {
        id: "zMndTF",
        defaultMessage: "Copied"
    },
    workspace: {
        id: "XuBl8l",
        defaultMessage: "Workspace"
    },
    public: {
        id: "i4Czrk",
        defaultMessage: "Public"
    },
    private: {
        id: "WZUwOD",
        defaultMessage: "Private"
    },
    privateDescription: {
        id: "hBkTCk",
        defaultMessage: "Only you can view."
    },
    publicDescription: {
        id: "k38+6+",
        defaultMessage: "Anyone with the link can view."
    },
    workspaceDescription: {
        id: "RRaxxv",
        defaultMessage: "Members of your workspace can view."
    },
    conversationPrivateDescription: {
        id: "dP5iAS",
        defaultMessage: "Your chat messages will not be shared."
    },
    failedToCopyLink: {
        id: "ChbUTM",
        defaultMessage: "Failed to copy link to clipboard."
    },
    publish: {
        id: "MT1/Gm",
        defaultMessage: "Update"
    },
    unsharedChanges: {
        id: "X9C94W",
        defaultMessage: "Your latest changes aren’t included."
    },
    publishedChanges: {
        id: "+VCnlg",
        defaultMessage: "The shared canvas is up to date."
    },
    moderationBlocked: {
        id: "UbWyx9",
        defaultMessage: "This shared link has been blocked by moderation"
    },
    workspaceSharingDisabled: {
        id: "+HZ/LH",
        defaultMessage: "Sharing has been disabled for this workspace. Contact your admin to enable."
    }
});
export {
    U as B, s
};
//# sourceMappingURL=4851d730-f6t0vxg3tipt77fz.js.map