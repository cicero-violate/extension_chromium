import {
    h as g,
    j as e,
    o as x,
    r as h,
    u as y
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    aV as n,
    aw as d,
    af as M
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    C as b
} from "./b353a040-oc8fgx39stmfth5e.js";
import {
    dc as k
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
const u = g({
        optionalField: {
            id: "UgRDQq",
            defaultMessage: "(optional)"
        },
        teamSignUpPageTitle: {
            id: "Q4AUMN",
            defaultMessage: "Sign up for a Business plan"
        },
        tellUsAboutWorkStepTitle: {
            id: "9TW5Ss",
            defaultMessage: "Tell us about your work"
        },
        tellUsAboutWorkStepSubtitle: {
            id: "9BRmB/",
            defaultMessage: "We'll use these details to suggest ideas that might be useful in your role."
        },
        workspaceNameStepTitle: {
            id: "dxmw1u",
            defaultMessage: "Set up your workspace"
        },
        workspaceNameStepSubtitle: {
            id: "z5NAj9",
            defaultMessage: "You'll use this secure space to manage and collaborate with your team."
        },
        workspaceNameLabel: {
            id: "ZCGF0W",
            defaultMessage: "Workspace name"
        },
        workspaceNamePlaceholder: {
            id: "/MmHRi",
            defaultMessage: "Enter your workspace name"
        },
        roleLabel: {
            id: "ATtnlf",
            defaultMessage: "Role"
        },
        rolePlaceholder: {
            id: "lxHk5i",
            defaultMessage: "Select your role"
        },
        workspaceDepartmentLabel: {
            id: "CC7rYc",
            defaultMessage: "Area of work"
        },
        workspaceDepartmentPlaceholder: {
            id: "V/v9DL",
            defaultMessage: "Select your area of work"
        },
        workspaceCompanySizeLabel: {
            id: "5usFs1",
            defaultMessage: "Company size"
        },
        workspaceCompanySizePlaceholder: {
            id: "drld/V",
            defaultMessage: "Select your company size"
        },
        seatsCountLabel: {
            id: "MNbf/N",
            defaultMessage: "Seats"
        },
        purchaseStepTitle: {
            id: "cx09AW",
            defaultMessage: "Set up your Business plan"
        },
        purchaseStepSubtitle: {
            id: "sJErhK",
            defaultMessage: "Minimum 2 seats. Add and reassign seats at anytime"
        },
        oneDollarPromoTitle: {
            id: "AlEIaa",
            defaultMessage: "Start your trial"
        },
        freeTrialPromoTitle: {
            id: "BrbO2n",
            defaultMessage: "Start your free trial"
        },
        oneDollarPromoSubtitle: {
            id: "woJKaK",
            defaultMessage: "Try ChatGPT Business for $1 for up to 5 seats. After the first month, it’s $30 per seat."
        },
        freeTrialPromoSubtitle: {
            id: "HFQvZ/",
            defaultMessage: "Try ChatGPT Business for free, up to 5 seats. After the first month, it's $30 per seat."
        },
        salesMarketingPromoSubtitleOneDollar: {
            id: "vrk97i",
            defaultMessage: "Drive more leads & growth — activate your ChatGPT Business trial for $1 (up to 5 seats)."
        },
        salesMarketingPromoSubtitleFree: {
            id: "SB66jJ",
            defaultMessage: "Drive more leads & growth — activate your ChatGPT Business trial for free (up to 5 seats)."
        },
        planTypeLabel: {
            id: "RZFV+2",
            defaultMessage: "Plan type"
        },
        annualPlanLabel: {
            id: "0Y3Keg",
            defaultMessage: "Annually <span>({percent}% off)</span>"
        },
        monthlyPlanLabel: {
            id: "y5L8+O",
            defaultMessage: "Monthly"
        },
        planSummaryTitle: {
            id: "9UIAWd",
            defaultMessage: "Plan Summary"
        },
        allPlansTodayTotal: {
            id: "CNJp97",
            defaultMessage: "Today's total"
        },
        fieldRequired: {
            id: "txrvew",
            defaultMessage: "{fieldName} is required"
        },
        continueButton: {
            id: "CYZ25s",
            defaultMessage: "Continue"
        },
        autoCheckoutErrorTitle: {
            id: "gkk9XT",
            defaultMessage: "We couldn't start checkout"
        },
        autoCheckoutErrorSubtitle: {
            id: "qYixEj",
            defaultMessage: "Please try again to continue with checkout."
        },
        autoCheckoutRetryButton: {
            id: "Bwtv5e",
            defaultMessage: "Try again"
        }
    }),
    B = ({
        content: t,
        onPrevious: a,
        headerPaddingClassName: s
    }) => e.jsxs("div", {
        className: M("bg-token-bg-primary text-token-text-primary relative flex min-h-[100dvh] w-screen justify-center overflow-y-auto", s ? ? "pt-16 [@media(min-width:450px)]:pt-[12vh]"),
        children: [a && e.jsx("div", {
            className: "absolute start-4 top-4",
            children: e.jsx(d, {
                onClick: a,
                icon: b,
                color: "ghost"
            })
        }), e.jsx("div", {
            className: "flex max-w-full flex-none items-center justify-center [@media(min-width:450px)]:w-[380px]",
            children: t
        })]
    }),
    L = ({
        title: t,
        subTitle: a,
        children: s
    }) => e.jsxs("div", {
        className: "box-content flex w-full flex-col gap-6 px-4",
        children: [e.jsxs("div", {
            className: "flex flex-col gap-4 text-center",
            children: [e.jsx("div", {
                className: "text-3xl font-normal",
                children: t
            }), a && e.jsx("div", {
                className: "text-token-text-secondary",
                children: a
            })]
        }), s]
    }),
    F = ({
        onClick: t,
        disabled: a
    }) => {
        const [s, l] = h.useState(!1), o = y();
        return e.jsx(d, {
            size: "large",
            loading: s,
            disabled: a,
            onClick: async () => {
                l(!0), await t(), l(!1)
            },
            children: o.formatMessage(u.continueButton)
        })
    },
    S = n.label `font-medium`,
    c = n.div `text-red-500 text-sm mb-2`,
    w = n.input `rounded-full border border-token-border-default bg-token-bg-primary placeholder:text-token-text-tertiary px-5 py-3 focus:border-token-icon-accent focus:ring-token-icon-accent focus:ring-0`,
    A = t => {
        switch (t.formType) {
            case "input":
                return e.jsx(j, { ...t
                });
            case "select":
                return e.jsx(C, { ...t
                })
        }
        return null
    },
    f = ({
        children: t,
        required: a
    }) => e.jsxs(S, {
        children: [t, !a && e.jsxs("span", {
            className: "text-token-text-secondary text-xs",
            children: [" ", e.jsx(x, { ...u.optionalField
            })]
        })]
    }),
    j = ({
        label: t,
        name: a,
        placeholder: s,
        value: l,
        onChange: o,
        required: r,
        error: i,
        ...m
    }) => e.jsxs("div", {
        className: "flex flex-col gap-1.5",
        children: [e.jsx(f, {
            required: r,
            children: t
        }), e.jsx(w, {
            name: a,
            placeholder: s,
            value: l,
            onChange: p => o(p.target.value),
            required: r,
            ...m
        }), i && e.jsx(c, {
            children: i
        })]
    }),
    C = ({
        label: t,
        value: a,
        onChange: s,
        placeholder: l,
        error: o,
        options: r,
        required: i
    }) => e.jsxs("div", {
        className: "flex flex-col gap-1.5",
        children: [e.jsx(f, {
            required: i,
            children: t
        }), e.jsx(k, {
            triggerClassName: "w-full flex justify-between rounded-full border border-token-border-default bg-token-bg-primary data-placeholder:text-token-text-tertiary px-5 py-3 text-md h-12",
            contentClassName: "max-h-80 w-full",
            options: r,
            value: a,
            onValueChange: s,
            placeholder: l
        }), o && e.jsx(c, {
            children: o
        })]
    });
export {
    F as C, L as F, w as I, f as L, B as S, A as a, u as c
};
//# sourceMappingURL=b288024a-hvsuegpzdra9csyb.js.map