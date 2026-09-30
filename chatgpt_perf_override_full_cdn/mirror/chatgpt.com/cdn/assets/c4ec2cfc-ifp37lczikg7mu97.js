import {
    u as c,
    r as d,
    y as f,
    j as r,
    o as u
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    _ as n,
    bi as g,
    aw as h
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    I as y
} from "./e9213bfa-drjldekxa18no8cz.js";
import {
    a as _,
    m as s
} from "./b3eff28a-grxht9o14my36p69.js";
class E extends Error {
    constructor(t) {
        super(t), this.name = "EmailValidationError"
    }
}
const p = (e, t) => t.trim() === "" ? e.formatMessage(s.sendEmailFailureInvalidEmailEmpty) : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t) ? null : e.formatMessage(s.sendEmailFailureInvalidEmail, {
        email: t
    }),
    x = (e, t, l) => {
        switch (l.status) {
            case 429:
                throw new Error(e.formatMessage(s.sendEmailFailureRateLimited));
            case 403:
                throw new Error(e.formatMessage(s.verifyOtpFailureEmailAlreadyLinked, {
                    branch: t ? "email" : "other",
                    emailValue: t
                }));
            default:
                return
        }
    };

function V(e) {
    const t = c(),
        [l, m] = d.useState(null),
        o = f({
            mutationFn: async a => {
                try {
                    const i = p(t, a);
                    if (i) throw new E(i);
                    return await _(a)
                } catch (i) {
                    throw i instanceof E ? i : (i instanceof g && x(t, a, i), new Error(t.formatMessage(s.sendEmailFailure)))
                }
            },
            onSuccess: () => {
                e.setStep("verifyOtp")
            },
            onError: a => {
                m(a.message), n.logEventWithStatsig("Email Verify Enter Email Step - Error Sending Verification Email", "chatgpt_email_verify_enter_email_step_error", {
                    error: a.message
                })
            }
        });
    return d.useEffect(() => {
        n.logEventWithStatsig("Email Verify Enter Email Step - Shown", "chatgpt_email_verify_enter_email_step_shown")
    }, []), r.jsx("form", {
        onSubmit: a => {
            a.preventDefault(), o.mutate(e.email), n.logEventWithStatsig("Email Verify Enter Email Step - Attempted Continue", "chatgpt_email_verify_enter_email_step_continue")
        },
        noValidate: !0,
        children: r.jsxs("div", {
            className: "flex w-full flex-col items-center gap-3",
            children: [r.jsx("p", {
                className: "text-3xl font-semibold",
                children: e.title ? e.title : r.jsx(u, {
                    id: "emailVerify.enterEmailTitle",
                    defaultMessage: "Add your email"
                })
            }), e.description && r.jsx("p", {
                className: "text-token-text-primary text-center text-base",
                children: e.description
            }), r.jsx(y, {
                ariaLabel: t.formatMessage({
                    id: "emailVerify.emailAddress",
                    defaultMessage: "Email Address"
                }),
                placeholder: t.formatMessage({
                    id: "emailVerify.emailAddressPlaceholder",
                    defaultMessage: "Email Address"
                }),
                name: "email",
                type: "email",
                className: "mt-6 w-full",
                value: e.email,
                onChange: a => {
                    m(null), e.onEmailChange ? .(a.target.value), n.logEventWithStatsig("Email Verify Enter Email Step - Typed", "chatgpt_email_verify_enter_email_step_type")
                },
                autoFocus: !0,
                autoComplete: "email",
                error: l ? ? void 0
            }), r.jsx(h, {
                className: "w-full rounded-md",
                color: "green",
                type: "submit",
                loading: o.isPending,
                disabled: o.isPending,
                children: r.jsx(u, {
                    id: "emailVerify.continue",
                    defaultMessage: "Continue"
                })
            }), e.cancelFlowButton]
        })
    })
}
export {
    V as E, x as h
};
//# sourceMappingURL=c4ec2cfc-ifp37lczikg7mu97.js.map