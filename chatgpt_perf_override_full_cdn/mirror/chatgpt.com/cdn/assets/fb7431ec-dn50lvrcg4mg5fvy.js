import {
    u as _,
    r as n,
    j as e,
    o as a
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    e as k,
    qX as O,
    hO as c,
    _ as u,
    b3 as S,
    b4 as M,
    a0 as A,
    b5 as p,
    j4 as E,
    aw as D,
    hY as I,
    j0 as T,
    j1 as L,
    i_ as R
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    d2 as G,
    d3 as P,
    d4 as H,
    d5 as U
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
const F = "https://persistent.oaistatic.com/chatgpt/connector-onboarding-promo.png",
    m = [{
        icon: e.jsx(T, {}),
        label: "GitHub",
        key: c.GITHUB_CONNECTOR
    }, {
        icon: e.jsx(L, {}),
        label: "Google Drive",
        key: c.GDRIVE_ACTION_CONNECTOR
    }, {
        icon: e.jsx(R, {}),
        label: "SharePoint",
        key: c.SHAREPOINT_CONNECTOR
    }, {
        icon: e.jsx(G, {}),
        label: "Browse all",
        key: "browseall"
    }],
    W = ({
        onClose: f,
        referrer: g,
        toggleAllAfterRedirect: h
    }) => {
        const b = I(),
            y = _(),
            [o, j] = n.useState(!1),
            [N, d] = n.useState(!1),
            r = F,
            w = k(() => O(b));
        m.filter(t => w ? .some(s => s.type === t.key));
        const x = () => {
            H(U.hasSeenConnectorsNuxModal), f()
        };
        n.useEffect(() => {
            const t = new Image;
            t.src = r, t.onload = () => j(!0)
        }, [r]), n.useEffect(() => {
            if (!o) return;
            d(!0);
            const t = setTimeout(() => {
                d(!0)
            }, 1e3);
            return () => clearTimeout(t)
        }, [o]), n.useEffect(() => {
            u.logUpsellOrModalEvent(S, {
                eventId: "connectors_onboarding_nux_modal_shown",
                type: M.UPSELL_OR_MODAL_TYPE_CUSTOM_NUX_MODAL
            })
        }, []);
        const v = m.map(t => {
            const {
                key: s,
                icon: l,
                label: i
            } = t;
            return {
                icon: l,
                label: i,
                key: s,
                onClick: () => {
                    u.logEventWithStatsig("chatgpt_contextual_answers_user_nux_v2_modal_choice_selected", "chatgpt_contextual_answers_user_nux_v2_modal_choice_selected", {
                        connector: s
                    });
                    const C = P(s === "browseall" ? void 0 : s, {
                        target: "connectors",
                        referrer: g,
                        toggleAllAfterRedirect: h
                    });
                    window.location.href = C
                }
            }
        });
        return e.jsxs(A, {
            testId: "modal-connectors-nux",
            isOpen: !0,
            noPadding: !0,
            onClose: x,
            shouldIgnoreClickOutside: !0,
            size: "custom",
            type: "success",
            className: "relative flex w-[480px] max-w-[480px] flex-col items-center gap-[32px] bg-white",
            children: [e.jsx("div", {
                className: "relative h-[213px]",
                children: e.jsxs("div", {
                    className: "relative w-full flex-1",
                    children: [e.jsx("img", {
                        src: r,
                        alt: y.formatMessage({
                            id: "yNEeCK",
                            defaultMessage: "Modal splash image"
                        }),
                        className: "h-[213px] w-full object-cover object-bottom"
                    }), e.jsx("div", {
                        className: "pointer-events-none absolute inset-0 flex items-end pb-0",
                        children: e.jsxs("div", {
                            className: "flex w-full flex-col gap-4 px-8",
                            children: [e.jsx(p.div, {
                                className: "relative flex w-auto self-end rounded-3xl bg-white px-4 py-2.5 text-lg backdrop-blur-[24px] dark:bg-[rgba(48,48,48,1)]",
                                initial: {
                                    opacity: 0,
                                    y: 16
                                },
                                animate: o ? {
                                    opacity: 1,
                                    y: 0
                                } : {
                                    opacity: 0,
                                    y: 8
                                },
                                transition: {
                                    type: "tween",
                                    ease: "easeIn",
                                    stiffness: 400,
                                    damping: 30,
                                    delay: .2
                                },
                                layout: "position",
                                children: e.jsx(a, {
                                    id: "iKFO4x",
                                    defaultMessage: "What's the Stargate Project?"
                                })
                            }), e.jsxs(p.div, {
                                initial: {
                                    opacity: 0,
                                    y: 0
                                },
                                animate: o && N ? {
                                    opacity: 1,
                                    y: 0
                                } : {
                                    opacity: 0,
                                    y: 8
                                },
                                transition: {
                                    type: "tween",
                                    ease: "easeIn",
                                    duration: .45,
                                    delay: .5
                                },
                                className: "mt-2 flex max-w-[480px] flex-col overflow-hidden rounded-t-2xl border-s border-e border-t border-[#e3e6e8] bg-white/95 dark:border-transparent",
                                style: {
                                    backdropFilter: "blur(12px)"
                                },
                                children: [e.jsx("span", {
                                    className: "px-5 pt-4 pb-3 text-base text-[18px] font-normal text-[#0D0D0D]",
                                    children: e.jsx(a, {
                                        defaultMessage: "Here's everything you need to know:",
                                        id: "connectorNux.everythingYouNeedToKnow"
                                    })
                                }), e.jsx("div", {
                                    className: "relative flex items-start border-b border-[#e3e6e8] bg-[#f8fafd] px-5 py-1 dark:border-transparent",
                                    children: e.jsxs("div", {
                                        className: "relative flex flex-col items-start",
                                        style: {
                                            paddingLeft: 18
                                        },
                                        children: [e.jsx("div", {
                                            className: "absolute start-0 top-0",
                                            style: {
                                                width: "2px",
                                                height: "100%",
                                                background: "#e3e6e8",
                                                borderRadius: "1px"
                                            }
                                        }), e.jsxs("div", {
                                            className: "flex items-center",
                                            children: [e.jsx(E, {
                                                className: "me-1 h-5 w-5 flex-shrink-0 text-[#4285F4]"
                                            }), e.jsx("span", {
                                                className: "text-base font-normal text-[#0D0D0D]",
                                                children: e.jsx(a, {
                                                    defaultMessage: "Google Doc",
                                                    id: "connectorNux.googleDocLabel"
                                                })
                                            })]
                                        }), e.jsx("a", {
                                            href: "#",
                                            className: "font- mt-1 text-[18px] leading-[28px] font-medium tracking-[-0.45px] text-[#4362A0] transition-colors duration-100 hover:text-[#174ea6]",
                                            tabIndex: 0,
                                            children: e.jsx(a, {
                                                defaultMessage: "Announcing the Stargate Project",
                                                id: "connectorNux.googleDocTitle"
                                            })
                                        })]
                                    })
                                })]
                            })]
                        })
                    })]
                })
            }), e.jsxs("div", {
                className: "flex flex-col items-start px-8 pt-8 pb-4 dark:border-t dark:border-white dark:bg-[rgba(48,48,48,1)]",
                children: [e.jsx("div", {
                    className: "mb-2 text-start text-2xl font-bold",
                    children: e.jsx("span", {
                        style: {
                            color: "var(--text-primary, #0D0D0D)",
                            fontVariantNumeric: "lining-nums tabular-nums",
                            fontSize: 24,
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "32px",
                            letterSpacing: "0.364px"
                        },
                        children: e.jsx(a, {
                            defaultMessage: "Connect your team’s knowledge",
                            id: "connectorNux.connectYourTeamsKnowledge"
                        })
                    })
                }), e.jsx("div", {
                    className: "text-token-text-secondary mb-4 max-w-[420px] pb-4 text-start text-base",
                    children: e.jsx(a, {
                        defaultMessage: "Ask ChatGPT anything about your files, messages, or code, and get helpful, relevant answers.",
                        id: "connectorNux.connectYourTeamsKnowledgeSub"
                    })
                }), e.jsx("div", {
                    className: "flex w-full max-w-[420px] flex-wrap justify-center gap-3",
                    children: v.map(({
                        icon: t,
                        label: s,
                        key: l,
                        onClick: i
                    }) => e.jsxs(D, {
                        color: "secondary",
                        className: "border-radius-999 border:1px solid var(--interactive-border-secondary-default, rgba(13, 13, 13, 0.10)); background: var(--interactive-bg-secondary-default, rgba(13, 13, 13, 0.00)); flex h-[44px] basis-[calc(50%-0.375rem)] items-center justify-center gap-2 focus:shadow-none focus:ring-0 focus:outline-none",
                        onClick: i,
                        children: [e.jsx("span", {
                            className: "me-1 flex-shrink-0",
                            style: {
                                width: 20,
                                height: 20,
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center"
                            },
                            children: t
                        }), e.jsx("span", {
                            className: "text-base text-[14px] font-medium",
                            children: s
                        })]
                    }, l))
                }), e.jsx("button", {
                    type: "button",
                    onClick: x,
                    className: "text-token-text-secondary mx-2 mt-6 flex h-[44px] w-full items-center justify-center rounded-full px-4 text-center text-lg transition focus:ring-0 focus:outline-none",
                    style: {
                        maxWidth: "calc(100% - 16px)",
                        minHeight: 44,
                        borderRadius: 999
                    },
                    children: e.jsx("span", {
                        style: {
                            fontSize: 14,
                            fontStyle: "normal",
                            lineHeight: "20px",
                            letterSpacing: "-0.18px",
                            fontFeatureSettings: "'liga' off, 'clig' off"
                        },
                        children: e.jsx(a, {
                            defaultMessage: "Not now",
                            id: "connectorNux.notNow"
                        })
                    })
                })]
            })]
        })
    };
export {
    W as C
};
//# sourceMappingURL=fb7431ec-dn50lvrcg4mg5fvy.js.map