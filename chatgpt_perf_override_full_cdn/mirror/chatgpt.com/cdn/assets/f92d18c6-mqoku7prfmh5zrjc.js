import {
    u as K,
    j as t,
    o as y,
    h as re,
    c as ne,
    s as oe,
    n as ce,
    r as R,
    L as X,
    Y as de
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    L as fe
} from "./605b091d-ifqjdw7ydae262j8.js";
import {
    c9 as J,
    b6 as Z,
    c8 as ee,
    ce as ge,
    jV as he,
    xR as r,
    cD as xe,
    dt as pe
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    E as _e
} from "./82244417-gtg7yq4t8dhuwljw.js";
import {
    a0 as be,
    cz as te,
    aV as me,
    aw as ve,
    q as ye,
    _ as v,
    jp as je,
    aY as ke,
    o7 as Me,
    af as we,
    x as Se,
    R as Pe,
    v as Ne,
    bY as Ee,
    c8 as H,
    zg as Ce,
    n as Ie
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    u as Te,
    a as Be
} from "./e3f71c51-lr1kx59sxbu52hj8.js";
import {
    d as Ae,
    a as Le,
    t as z
} from "./e8eebcb1-hl1q1mqbpavqpner.js";
import {
    S as Y
} from "./c09d86e5-wq4gzqnoxnkj8lzz.js";
import {
    i as Re,
    C as Oe
} from "./d9c77c9b-n2xhmb28raiv0up9.js";
import {
    u as Fe
} from "./cb241c69-g0cmr91t06tc1osg.js";
import {
    I as We
} from "./e9213bfa-drjldekxa18no8cz.js";
import {
    V as Ue
} from "./cedbe818-h2t8e4spzi3rf7zt.js";
import {
    A as se
} from "./8799acd7-ocfyzbsyvkoedxba.js";
const $ = re({
        title: {
            id: "nonWorkEmailModal.title",
            defaultMessage: "Are you sure this is your work email?"
        },
        body: {
            id: "nonWorkEmailModal.body",
            defaultMessage: "You need to sign up with a work email to be eligible."
        },
        primaryCta: {
            id: "nonWorkEmailModal.primaryCta",
            defaultMessage: "Sign up with your work email"
        },
        secondaryCta: {
            id: "nonWorkEmailModal.secondaryCta",
            defaultMessage: "{email} is my work email"
        }
    }),
    De = ({
        email: l,
        onUseWorkEmail: e,
        onContinue: M,
        onClose: a
    }) => {
        const n = K();
        return t.jsx(be, {
            isOpen: !0,
            onClose: a,
            size: "custom",
            className: "max-w-sm",
            contentClassName: "p-0!",
            testId: "modal-non-work-email",
            children: t.jsxs("div", {
                className: "flex w-full flex-col gap-4 p-6 text-center",
                children: [t.jsx("div", {
                    className: "text-token-text-primary text-xl font-semibold",
                    children: t.jsx(y, { ...$.title
                    })
                }), t.jsx("div", {
                    className: "text-token-text-secondary text-sm",
                    children: t.jsx(y, { ...$.body
                    })
                }), t.jsx(te.Button, {
                    title: n.formatMessage($.primaryCta),
                    color: "primary",
                    className: "w-full",
                    onClick: () => {
                        e(), a()
                    }
                }), t.jsx(te.Button, {
                    title: n.formatMessage($.secondaryCta, {
                        email: l
                    }),
                    color: "ghost",
                    className: "w-full",
                    onClick: () => {
                        a(), M()
                    }
                })]
            })
        })
    },
    h = re({
        salesMarketingHeadline: {
            id: "businessPurchaseInterstitialPage.salesMarketingHeadline",
            defaultMessage: "From first touch to closed deal — powered by AI"
        },
        salesMarketingSubheadline: {
            id: "businessPurchaseInterstitialPage.salesMarketingSubheadline",
            defaultMessage: "Essential tools to win new customers"
        },
        salesMarketingBullet1: {
            id: "businessPurchaseInterstitialPage.salesMarketingBullet1",
            defaultMessage: "Unlimited creative for email, ads, & social"
        },
        salesMarketingBullet2: {
            id: "businessPurchaseInterstitialPage.salesMarketingBullet2",
            defaultMessage: "Connected CRM and Google Drive"
        },
        salesMarketingBullet3: {
            id: "businessPurchaseInterstitialPage.salesMarketingBullet3",
            defaultMessage: "Shared projects, campaigns, & pitches"
        },
        salesMarketingBullet4: {
            id: "businessPurchaseInterstitialPage.salesMarketingBullet4",
            defaultMessage: "Enterprise security — no training on your data"
        },
        valueTitleAlt4: {
            id: "businessPurchaseInterstitialPage.valueTitleAlt4",
            defaultMessage: "Help your team move faster with advanced AI"
        },
        valueSubtitleAlt: {
            id: "businessPurchaseInterstitialPage.valueSubtitleAlt",
            defaultMessage: "Top features"
        },
        altValue1_5: {
            id: "businessPurchaseInterstitialPage.altValue1_5",
            defaultMessage: "No training on your data; SAML security"
        },
        altValue2: {
            id: "businessPurchaseInterstitialPage.altValue2",
            defaultMessage: "Advanced access to our best model for work"
        },
        altValue3_5: {
            id: "businessPurchaseInterstitialPage.altValue3_5",
            defaultMessage: "Integrate with Google Drive & other tools"
        },
        altValue4_6: {
            id: "businessPurchaseInterstitialPage.altValue4_6",
            defaultMessage: "Easy member, role, & billing management"
        }
    });

function Ge(l) {
    "use forget";
    const e = ne.c(70),
        {
            salesMarketingMessagingEnabled: M
        } = l,
        a = K();
    if (M) {
        let P;
        e[0] !== a ? (P = a.formatMessage(h.salesMarketingHeadline), e[0] = a, e[1] = P) : P = e[1];
        let b;
        e[2] !== P ? (b = t.jsx("div", {
            className: "mb-10 max-w-[400px] text-start text-3xl font-semibold",
            children: P
        }), e[2] = P, e[3] = b) : b = e[3];
        let d;
        e[4] !== a ? (d = a.formatMessage(h.salesMarketingSubheadline), e[4] = a, e[5] = d) : d = e[5];
        let f;
        e[6] !== d ? (f = t.jsx("div", {
            className: "text-md mb-4 self-start font-medium",
            children: d
        }), e[6] = d, e[7] = f) : f = e[7];
        let O;
        e[8] === Symbol.for("react.memo_cache_sentinel") ? (O = t.jsx(J, {
            className: "mt-1 h-5 w-5 fill-[#5856D6]"
        }), e[8] = O) : O = e[8];
        let N;
        e[9] !== a ? (N = a.formatMessage(h.salesMarketingBullet1), e[9] = a, e[10] = N) : N = e[10];
        let T;
        e[11] !== N ? (T = t.jsxs("div", {
            className: "mb-3 flex items-start gap-3 self-start",
            children: [O, t.jsx("div", {
                className: "text-[16px] font-normal",
                children: N
            })]
        }), e[11] = N, e[12] = T) : T = e[12];
        let D;
        e[13] === Symbol.for("react.memo_cache_sentinel") ? (D = t.jsx(se, {
            className: "mt-1 h-5 w-5 fill-[#5856D6]"
        }), e[13] = D) : D = e[13];
        let g;
        e[14] !== a ? (g = a.formatMessage(h.salesMarketingBullet2), e[14] = a, e[15] = g) : g = e[15];
        let B;
        e[16] !== g ? (B = t.jsxs("div", {
            className: "mb-3 flex items-start gap-3 self-start",
            children: [D, t.jsx("div", {
                className: "text-[16px] font-normal",
                children: g
            })]
        }), e[16] = g, e[17] = B) : B = e[17];
        let G;
        e[18] === Symbol.for("react.memo_cache_sentinel") ? (G = t.jsx(Z, {
            className: "mt-1 h-5 w-5 fill-[#5856D6]"
        }), e[18] = G) : G = e[18];
        let A;
        e[19] !== a ? (A = a.formatMessage(h.salesMarketingBullet3), e[19] = a, e[20] = A) : A = e[20];
        let L;
        e[21] !== A ? (L = t.jsxs("div", {
            className: "mb-3 flex items-start gap-3 self-start",
            children: [G, t.jsx("div", {
                className: "text-[16px] font-normal",
                children: A
            })]
        }), e[21] = A, e[22] = L) : L = e[22];
        let V;
        e[23] === Symbol.for("react.memo_cache_sentinel") ? (V = t.jsx(ee, {
            className: "mt-1 h-5 w-5 fill-[#5856D6]"
        }), e[23] = V) : V = e[23];
        let s;
        e[24] !== a ? (s = a.formatMessage(h.salesMarketingBullet4), e[24] = a, e[25] = s) : s = e[25];
        let m;
        e[26] !== s ? (m = t.jsxs("div", {
            className: "mb-3 flex items-start gap-3 self-start",
            children: [V, t.jsx("div", {
                className: "text-[16px] font-normal",
                children: s
            })]
        }), e[26] = s, e[27] = m) : m = e[27];
        let i;
        return e[28] !== B || e[29] !== L || e[30] !== m || e[31] !== b || e[32] !== f || e[33] !== T ? (i = t.jsxs("div", {
            className: "relative z-10",
            children: [b, f, T, B, L, m]
        }), e[28] = B, e[29] = L, e[30] = m, e[31] = b, e[32] = f, e[33] = T, e[34] = i) : i = e[34], i
    }
    let n;
    e[35] !== a ? (n = a.formatMessage(h.valueTitleAlt4), e[35] = a, e[36] = n) : n = e[36];
    let E;
    e[37] !== n ? (E = t.jsx("div", {
        className: "mb-10 max-w-[400px] text-start text-3xl font-semibold",
        children: n
    }), e[37] = n, e[38] = E) : E = e[38];
    let x;
    e[39] !== a ? (x = a.formatMessage(h.valueSubtitleAlt), e[39] = a, e[40] = x) : x = e[40];
    let p;
    e[41] !== x ? (p = t.jsx("div", {
        className: "text-md mb-4 self-start font-medium",
        children: x
    }), e[41] = x, e[42] = p) : p = e[42];
    let F;
    e[43] === Symbol.for("react.memo_cache_sentinel") ? (F = t.jsx(ee, {
        className: "mt-1 h-5 w-5 fill-[#5856D6]"
    }), e[43] = F) : F = e[43];
    let C;
    e[44] !== a ? (C = a.formatMessage(h.altValue1_5), e[44] = a, e[45] = C) : C = e[45];
    let u;
    e[46] !== C ? (u = t.jsxs("div", {
        className: "mb-3 flex items-start gap-3 self-start",
        children: [F, t.jsx("div", {
            className: "text-[16px] font-normal",
            children: C
        })]
    }), e[46] = C, e[47] = u) : u = e[47];
    let W;
    e[48] === Symbol.for("react.memo_cache_sentinel") ? (W = t.jsx(J, {
        className: "mt-1 h-5 w-5 fill-[#5856D6]"
    }), e[48] = W) : W = e[48];
    let _;
    e[49] !== a ? (_ = a.formatMessage(h.altValue2), e[49] = a, e[50] = _) : _ = e[50];
    let o;
    e[51] !== _ ? (o = t.jsxs("div", {
        className: "mb-3 flex items-start gap-3 self-start",
        children: [W, t.jsx("div", {
            className: "text-[16px] font-normal",
            children: _
        })]
    }), e[51] = _, e[52] = o) : o = e[52];
    let j;
    e[53] === Symbol.for("react.memo_cache_sentinel") ? (j = t.jsx(se, {
        className: "mt-1 h-5 w-5 fill-[#5856D6]"
    }), e[53] = j) : j = e[53];
    let c;
    e[54] !== a ? (c = a.formatMessage(h.altValue3_5), e[54] = a, e[55] = c) : c = e[55];
    let I;
    e[56] !== c ? (I = t.jsxs("div", {
        className: "mb-3 flex items-start gap-3 self-start",
        children: [j, t.jsx("div", {
            className: "text-[16px] font-normal",
            children: c
        })]
    }), e[56] = c, e[57] = I) : I = e[57];
    let U;
    e[58] === Symbol.for("react.memo_cache_sentinel") ? (U = t.jsx(Z, {
        className: "mt-1 h-5 w-5 fill-[#5856D6]"
    }), e[58] = U) : U = e[58];
    let k;
    e[59] !== a ? (k = a.formatMessage(h.altValue4_6), e[59] = a, e[60] = k) : k = e[60];
    let w;
    e[61] !== k ? (w = t.jsxs("div", {
        className: "mb-3 flex items-start gap-3 self-start",
        children: [U, t.jsx("div", {
            className: "text-[16px] font-normal",
            children: k
        })]
    }), e[61] = k, e[62] = w) : w = e[62];
    let S;
    return e[63] !== o || e[64] !== I || e[65] !== w || e[66] !== E || e[67] !== p || e[68] !== u ? (S = t.jsxs("div", {
        className: "relative z-10",
        children: [E, p, u, o, I, w]
    }), e[63] = o, e[64] = I, e[65] = w, e[66] = E, e[67] = p, e[68] = u, e[69] = S) : S = e[69], S
}
const Ve = "https://openai.com/policies/terms-of-use",
    He = "https://openai.com/policies/privacy-policy",
    ae = "require_work_email",
    ie = me(ve)
`w-full p-3`, $e = me.div `flex h-[1px] w-full border-b border-token-surface-tertiary`, qe = () => {
    const l = K(),
        {
            country: e
        } = Te(),
        M = Be({
            country: e,
            currentAccount: null,
            location: "TeamPurchaseInterstitialPage",
            pricingPlanIsTypeBusiness: !0
        }),
        a = oe(),
        n = ce(),
        x = R.useMemo(() => {
            const m = new URLSearchParams(n.search).get("segment");
            return Re(m) ? m : null
        }, [n.search]) != null,
        {
            data: p,
            isLoading: F,
            error: C
        } = ge({
            countryCode: M ? .country,
            currency: M ? .currency,
            enabled: M != null
        }),
        u = ye("2189411909"),
        W = x,
        _ = Ae(),
        {
            data: o
        } = he(_ ? ? "", !!_);
    let j = !1;
    R.useEffect(() => {
        if (!window || !document) return;
        const m = new URLSearchParams(window.location.search).get("referrer") ? ? document.referrer;
        v.logEventWithStatsig("ChatGPT Business: Interstitial Impression", "chatgpt_business_interstitial_impression", {
            referrer: m
        })
    }, []), R.useEffect(() => {
        u && v.logEventWithStatsig("ChatGPT Business: Interstitial Show Login Hint", "chatgpt_business_interstitial_show_login_hint", {
            promo_state: o ? .state
        }), j && v.logEventWithStatsig("ChatGPT Business: Interstitial Promo Banner Shown", "chatgpt_business_interstitial_promo_banner_shown", {
            promo_state: o ? .state
        })
    }, [u, o ? .state, j]);
    const [c, I] = R.useState(""), [U, k] = R.useState(void 0), w = new URLSearchParams(n.search).get(ae) === "1", S = `${Oe}${n.search}`, P = je(), b = Fe(), d = !!b;
    if (R.useEffect(() => {
            if (!w) return;
            k(l.formatMessage(r.useWorkEmailError));
            const s = new URLSearchParams(n.search);
            s.delete(ae), a({
                pathname: n.pathname,
                search: s.toString() ? `?${s.toString()}` : ""
            }, {
                replace: !0
            })
        }, [l, n.pathname, n.search, a, w]), R.useEffect(() => {
            b && P.info(l.formatMessage(r.loggedOutToast, {
                email: b
            }), {
                id: "businessPurchaseInterstitialPage.logout_email_hint_toast"
            })
        }, [l, b, P]), !M || F || C != null || !p) return null;
    const f = !!_ && _ === Le && p.currencyConfig.promos.business_free_trial.enabled,
        O = f && o ? .state === "not_eligible",
        N = f && o ? .state === "temporary_disabled",
        T = f && o ? .state === "offline";
    j = f && o ? .state === "eligible";
    const D = s => {
            if (!s || s.trim() === "") return l.formatMessage(r.emailRequiredError);
            if (!Ue.test(s)) return l.formatMessage(r.emailInvalidError)
        },
        g = async s => {
            if (s === "password") {
                v.logEventWithStatsig("ChatGPT Business: Interstitial Continue With Email Click", "chatgpt_business_interstitial_continue_with_email_click", {
                    promo_state: o ? .state
                });
                const m = D(c);
                if (k(m), u && m) {
                    v.logEventWithStatsig("ChatGPT Business: Interstitial Email Validation Error", "chatgpt_business_interstitial_email_validation_error");
                    return
                }
                let i;
                if (u && c && (i = {
                        screen_hint: "login_or_signup",
                        login_hint: c
                    }), d && c) try {
                    const Q = (await Pe.safePost("/accounts/domain-type", {
                        requestBody: {
                            email: c
                        },
                        authOption: Ne.SendIfAvailable
                    })) ? .domain_type;
                    if (Q && Q !== "professional") {
                        Ee(De, {
                            email: c,
                            onUseWorkEmail: () => k(l.formatMessage(r.useWorkEmailError)),
                            onContinue: () => {
                                let q;
                                u && c && (q = {
                                    screen_hint: "login_or_signup",
                                    login_hint: c
                                }), H({
                                    fallbackScreenHint: "login_or_signup",
                                    useFallbackScreenHint: !0,
                                    ...q ? {
                                        additionalAuthParams: q
                                    } : {},
                                    callbackUrl: S
                                })
                            }
                        });
                        return
                    }
                } catch {}
                v.logEventWithStatsig("ChatGPT Business: Interstitial Email Signup Navigated To Auth", "chatgpt_business_interstitial_email_signup_navigated_to_auth", {
                    promo_state: o ? .state
                }), H({
                    fallbackScreenHint: "login_or_signup",
                    useFallbackScreenHint: !0,
                    ...i ? {
                        additionalAuthParams: i
                    } : {},
                    callbackUrl: S
                });
                return
            }
            v.logEventWithStatsig("ChatGPT Business: Interstitial Continue With Social Click", "chatgpt_business_interstitial_continue_with_social_click", {
                connection: s
            }), H({
                fallbackScreenHint: "login",
                useFallbackScreenHint: !0,
                additionalAuthParams: {
                    connection: Ce[s]
                },
                callbackUrl: S
            })
        },
        B = () => {
            v.logEventWithStatsig("ChatGPT Business: Interstitial Already Have Account Click", "chatgpt_business_interstitial_already_have_account_click"), H({
                fallbackScreenHint: "login_or_signup",
                callbackUrl: S,
                skipLoginModal: !0
            })
        },
        G = () => {
            "use forget";
            const s = ne.c(5);
            switch (Se("3099523586").get("treatment", "control")) {
                case "redeem_free_offer":
                    {
                        let i;
                        return s[0] === Symbol.for("react.memo_cache_sentinel") ? (i = t.jsx(y, { ...r.redeemFreeOfferButton
                        }), s[0] = i) : i = s[0],
                        i
                    }
                case "claim_free_offer":
                    {
                        let i;
                        return s[1] === Symbol.for("react.memo_cache_sentinel") ? (i = t.jsx(y, { ...r.claimFreeOfferButton
                        }), s[1] = i) : i = s[1],
                        i
                    }
                case "redeem_offer":
                    {
                        let i;
                        return s[2] === Symbol.for("react.memo_cache_sentinel") ? (i = t.jsx(y, { ...r.redeemOfferButton
                        }), s[2] = i) : i = s[2],
                        i
                    }
                case "claim_offer":
                    {
                        let i;
                        return s[3] === Symbol.for("react.memo_cache_sentinel") ? (i = t.jsx(y, { ...r.claimOfferButton
                        }), s[3] = i) : i = s[3],
                        i
                    }
                default:
                    {
                        let i;
                        return s[4] === Symbol.for("react.memo_cache_sentinel") ? (i = t.jsx(y, { ...r.tryButton
                        }), s[4] = i) : i = s[4],
                        i
                    }
            }
        },
        A = t.jsxs(t.Fragment, {
            children: [u ? t.jsxs("form", {
                onSubmit: s => {
                    s.preventDefault(), g("password")
                },
                className: "flex w-full flex-col gap-3",
                children: [t.jsx(We, {
                    name: "email",
                    value: c,
                    onChange: s => I(s.target.value),
                    inputClassName: "w-full rounded-full dark:bg-transparent! bg-gray-solid-75!  text-base! sm:text-base! py-3! px-5!",
                    error: U,
                    showErrorIcon: !0,
                    ariaLabel: l.formatMessage(d ? r.emailClaimTrialPlaceholder : r.placeholder),
                    placeholder: l.formatMessage(d ? r.emailClaimTrialPlaceholder : r.placeholder),
                    className: "rounded-full! border-[var(--border-heavy)] p-0! px-0! py-0! focus-within:ring-1"
                }), t.jsx(ie, {
                    type: "submit",
                    children: j ? t.jsx(t.Fragment, {
                        children: f && t.jsx(G, {})
                    }) : t.jsx(y, { ...d ? r.claimFreeTrial : r.getButton
                    })
                })]
            }) : t.jsx(ie, {
                icon: _e,
                color: "secondary",
                onClick: () => g("password"),
                children: l.formatMessage(r.email)
            }), t.jsx("div", {
                className: "flex cursor-pointer items-center gap-1 py-1.5",
                children: l.formatMessage(r.alreadyHaveAccount, {
                    content: s => t.jsx("span", {
                        className: "text-token-text-secondary",
                        children: s
                    }),
                    login: s => t.jsx(ke, {
                        onClick: B,
                        className: "text-token-text-primary font-medium no-underline hover:underline",
                        children: s
                    })
                })
            })]
        }),
        L = t.jsxs(t.Fragment, {
            children: [t.jsx(Y, {
                provider: "google",
                className: "w-full p-3",
                onClick: () => g("google")
            }), t.jsx(Y, {
                provider: "microsoft",
                className: "w-full p-3",
                onClick: () => g("microsoft")
            }), t.jsx(Y, {
                provider: "apple",
                className: "w-full p-3",
                onClick: () => g("apple")
            })]
        }),
        V = t.jsxs("div", {
            className: "relative my-6 w-full",
            children: [t.jsx($e, {}), t.jsx("span", {
                className: "bg-token-bg-primary text-token-text-secondary absolute start-1/2 -top-2 -translate-x-1/2 transform px-2 text-xs font-medium",
                children: t.jsx(y, { ...r.or
                })
            })]
        });
    return t.jsxs("div", {
        className: "flex h-full w-full gap-8",
        children: [t.jsxs("div", {
            className: "flex min-w-[320px] flex-1 flex-col items-center p-9 px-4",
            children: [t.jsxs("div", {
                className: "flex w-full max-w-[360px] grow flex-col items-center justify-center gap-3",
                children: [t.jsx("button", {
                    onClick: () => {
                        v.logEventWithStatsig("ChatGPT Business: Interstitial Logo Click", "chatgpt_business_interstitial_logo_click"), a("/")
                    },
                    className: "mb-6 cursor-pointer p-0 md:fixed md:start-4 md:top-4 md:h-6 md:w-6",
                    "aria-label": l.formatMessage(r.homeButtonAriaLabel),
                    children: t.jsx(Me, {
                        className: "h-8 w-8"
                    })
                }), t.jsx("div", {
                    className: "text-token-text-secondary text-center text-lg font-medium",
                    children: j && f && l.formatMessage(r.altFreeTrialSubtitle)
                }), t.jsx("div", {
                    className: we("text-center text-2xl font-semibold md:text-3xl", d ? "mb-1" : "mb-5"),
                    children: t.jsx(y, { ...r.altTitle
                    })
                }), d && t.jsx("div", {
                    className: "text-token-text-secondary mb-5 text-center font-sans text-base leading-snug font-medium tracking-tight",
                    children: t.jsx(y, { ...r.claimSubtitle
                    })
                }), A, V, L, (O || N || T) && (() => {
                    let s;
                    switch (!0) {
                        case O:
                            s = z.teamFreeTrialNotEligible;
                            break;
                        case N:
                            s = z.teamFreeTrialTemporarilyDisabled;
                            break;
                        default:
                            s = z.teamFreeTrialOffline
                    }
                    return t.jsx("div", {
                        className: "mb-4 w-full",
                        "data-testid": "promo-banner",
                        children: t.jsx(xe, {
                            content: l.formatMessage(s),
                            type: "normal"
                        })
                    })
                })()]
            }), t.jsxs("div", {
                className: "text-token-text-secondary flex h-8 items-center gap-2 text-sm font-medium",
                children: [t.jsx(X, {
                    target: "_blank",
                    to: Ve,
                    onClick: () => v.logEventWithStatsig("ChatGPT Business: Interstitial Terms of Use Click", "chatgpt_business_interstitial_terms_of_use_click"),
                    children: l.formatMessage(r.termsOfUse)
                }), t.jsx("div", {
                    className: "border-token-text-primary mx-2 h-[18px] border-s"
                }), t.jsx(X, {
                    target: "_blank",
                    to: He,
                    onClick: () => v.logEventWithStatsig("ChatGPT Business: Interstitial Privacy Policy Click", "chatgpt_business_interstitial_privacy_policy_click"),
                    children: l.formatMessage(r.privacyPolicy)
                })]
            })]
        }), t.jsxs("div", {
            className: "hidden min-h-[560px] flex-col overflow-y-auto bg-white text-gray-950 md:relative md:flex md:h-full md:flex-1 md:items-center md:justify-between md:p-4 dark:bg-white",
            children: [t.jsxs("div", {
                className: "flex w-full grow flex-col md:mt-16 md:items-center md:justify-center",
                children: [t.jsx(Ge, {
                    salesMarketingMessagingEnabled: W
                }), t.jsx("img", {
                    alt: "",
                    src: "https://cdn.openai.com/chatgpt/team-interstitial-background.png",
                    className: "absolute inset-x-0 -top-[140px] z-0 h-full w-full object-fill object-top"
                })]
            }), t.jsxs("div", {
                className: "relative flex flex-col items-center",
                children: [t.jsx("div", {
                    className: "relative top-[10px] text-center text-[12px] font-medium text-gray-600",
                    children: l.formatMessage(r.logoGardenTitle)
                }), t.jsx("img", {
                    alt: l.formatMessage(r.logoGardenAlt),
                    src: fe.src,
                    className: "mt-1 h-auto w-7/8 max-w-[1040px] object-contain"
                })]
            })]
        })]
    })
}, le = "/team-sign-up", rt = () => {
    const l = ce(),
        e = pe(l),
        a = !Ie() && e,
        n = oe();
    R.useEffect(() => {
        if (a) {
            const x = new URLSearchParams(l.search).toString(),
                p = x ? le + `?${x}` : le;
            n(p, {
                replace: !0
            })
        }
    }, [l.search, n, a])
}, nt = de(function() {
    return t.jsx(qe, {})
});
export {
    nt as t, rt as u
};
//# sourceMappingURL=f92d18c6-mqoku7prfmh5zrjc.js.map