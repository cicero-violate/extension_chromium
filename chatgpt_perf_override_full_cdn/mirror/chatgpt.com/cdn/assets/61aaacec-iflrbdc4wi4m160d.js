import {
    u as v,
    r as c,
    y,
    j as a,
    o as l
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    h as _,
    E as x
} from "./c4ec2cfc-ifp37lczikg7mu97.js";
import {
    _ as o,
    bi as E,
    jp as O,
    R as w,
    zr as S,
    aw as h
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    I as V
} from "./e9213bfa-drjldekxa18no8cz.js";
import {
    a as j,
    m as n
} from "./b3eff28a-grxht9o14my36p69.js";
class p extends Error {
    constructor(i) {
        super(i), this.name = "OtpValidationError"
    }
}
const M = (e, i) => {
        if (i.length !== 6) return e.formatMessage(n.verifyOtpFailureInvalidFormat);
        try {
            parseInt(i)
        } catch {
            return e.formatMessage(n.verifyOtpFailureInvalidFormat)
        }
        return null
    },
    C = (e, i, s) => {
        switch (s.status) {
            case 403:
                throw new Error(e.formatMessage(n.verifyOtpFailureEmailAlreadyLinked, {
                    branch: i ? "email" : "other",
                    emailValue: i
                }));
            case 429:
                throw new Error(e.formatMessage(n.verifyOtpFailureRateLimited));
            case 401:
            case 422:
                throw new Error(e.formatMessage(n.verifyOtpFailureInvalidOtp));
            default:
                return
        }
    };

function b(e) {
    const i = v(),
        [s, f] = c.useState(null),
        u = e.showChangeEmailButton ? ? !0,
        g = c.useCallback(t => {
            const r = t.target.value.trim();
            if (typeof r == "string") {
                if (r.match(/\D/)) {
                    t.preventDefault();
                    return
                }
                e.onOtpChange ? .(r.substring(0, 6))
            }
        }, [e]),
        d = y({
            mutationFn: async () => {
                try {
                    return e.onResendOtp ? await e.onResendOtp() : await j(e.email ? ? "")
                } catch (t) {
                    throw t instanceof E && _(i, e.email ? ? "", t), new Error(i.formatMessage(n.sendEmailFailure))
                }
            },
            onSuccess: () => {
                e.setStep("verifyOtp")
            },
            onError: t => {
                f(t.message), o.logEventWithStatsig("Email Verify Verify OTP Step - Error Resending OTP", "chatgpt_email_verify_verify_otp_step_resend_error", {
                    error: t.message
                })
            }
        }),
        m = y({
            mutationFn: async t => {
                try {
                    const r = M(i, t.code);
                    if (r) throw new p(r);
                    if (e.onVerifyOtp) return await e.onVerifyOtp(t.code, t.email);
                    await w.safePost("/accounts/add_email/verify", {
                        requestBody: t
                    }), await S({
                        reason: "verify_otp"
                    })
                } catch (r) {
                    throw r instanceof p ? r : (r instanceof E && C(i, e.email, r), new Error(i.formatMessage(n.verifyOtpFailure)))
                }
            },
            onSuccess: () => {
                O().success(i.formatMessage(n.verifyOtpSuccess)), e.onVerified ? .()
            },
            onError: t => {
                f(t.message), o.logEventWithStatsig("Email Verify Verify OTP Step - Error Verifying OTP", "chatgpt_email_verify_verify_otp_step_error", {
                    error: t.message
                })
            }
        });
    return c.useEffect(() => {
        o.logEventWithStatsig("Email Verify Verify OTP Step - Shown", "chatgpt_email_verify_verify_otp_step_shown")
    }, []), a.jsxs("div", {
        className: "flex w-full flex-col items-center gap-3",
        children: [a.jsx("p", {
            className: "text-3xl font-semibold",
            children: a.jsx(l, {
                id: "verifyOtp.title",
                defaultMessage: "Check your email"
            })
        }), a.jsxs("p", {
            className: "text-center",
            children: [a.jsx("span", {
                className: "text-token-text-primary text-base",
                children: a.jsx(l, {
                    id: "verifyOtp.description",
                    defaultMessage: "Enter the verification code we just sent to"
                })
            }), e.email && a.jsx("br", {}), a.jsx("span", {
                className: `text-token-text-primary text-base leading-snug ${e.email&&"font-semibold"}`,
                children: a.jsx(l, {
                    id: "verifyOtp.email",
                    defaultMessage: "{branch, select, email {{emailValue}} other { your email.}}",
                    values: {
                        branch: e.email ? "email" : "other",
                        emailValue: e.email
                    }
                })
            })]
        }), a.jsxs("form", {
            onSubmit: t => {
                t.preventDefault(), m.mutate({
                    code: e.otp,
                    email: e.email ? ? ""
                }), o.logEventWithStatsig("Email Verify Verify OTP Step - Attempted Continue", "chatgpt_email_verify_verify_otp_step_continue")
            },
            className: "flex w-full flex-col items-center gap-3",
            children: [a.jsx(V, {
                error: s ? ? void 0,
                ariaLabel: i.formatMessage({
                    id: "emailVerify.otpAriaLabel",
                    defaultMessage: "OTP"
                }),
                value: e.otp,
                onChange: t => {
                    f(null), g(t), o.logEventWithStatsig("Email Verify Verify OTP Step - Typed", "chatgpt_email_verify_verify_otp_step_type")
                },
                name: "otp",
                type: "text",
                placeholder: "XXXXXX",
                className: "mt-6 w-full",
                autoComplete: "off",
                autoFocus: !0
            }), a.jsx(h, {
                className: "w-full rounded-md",
                color: "green",
                type: "submit",
                loading: m.isPending,
                disabled: m.isPending,
                children: a.jsx(l, {
                    id: "verifyOtp.continue",
                    defaultMessage: "Continue"
                })
            }), e.cancelFlowButton]
        }), a.jsxs("div", {
            className: "mt-6 flex w-full flex-col items-center gap-3",
            children: [a.jsx("p", {
                className: "text-token-text-primary text-sm",
                children: a.jsx(l, {
                    id: "verifyOtp.resendMessage",
                    defaultMessage: "Didn't receive the code?"
                })
            }), a.jsx(h, {
                className: "w-full rounded-md",
                color: "secondary",
                onClick: () => {
                    d.mutate(), o.logEventWithStatsig("Email Verify Verify OTP Step - Resend", "chatgpt_email_verify_verify_otp_step_resend")
                },
                loading: d.isPending,
                disabled: d.isPending,
                children: a.jsx(l, {
                    id: "verifyOtp.resend",
                    defaultMessage: "Resend code"
                })
            }), u && a.jsx(h, {
                className: "w-full rounded-md",
                color: "secondary",
                onClick: () => {
                    e.setStep("enterEmail"), o.logEventWithStatsig("Email Verify Verify OTP Step - Back to Enter Email Step", "chatgpt_email_verify_verify_otp_step_change_email")
                },
                children: a.jsx(l, {
                    id: "verifyOtp.changeEmail",
                    defaultMessage: "Change email"
                })
            })]
        })]
    })
}

function N(e) {
    const [i, s] = c.useState(e.initialStep ? ? "enterEmail"), [f, u] = c.useState(""), [g, d] = c.useState(""), m = e.email ? {
        email: e.email,
        onEmailChange: e.onEmailChange
    } : {
        email: f,
        onEmailChange: u
    }, t = e.otp ? {
        otp: e.otp,
        onOtpChange: e.onOtpChange
    } : {
        otp: g,
        onOtpChange: d
    };
    return i === "enterEmail" ? a.jsx(x, {
        title: e.enterEmailTitle,
        description: e.enterEmailDescription,
        cancelFlowButton: e.cancelFlowButton,
        step: i,
        setStep: s,
        ...m
    }) : a.jsx(b, {
        email: m.email,
        onVerified: e.onVerified,
        cancelFlowButton: e.cancelFlowButton,
        step: i,
        setStep: s,
        showChangeEmailButton: e.showChangeEmailButton,
        onResendOtp: e.onResendOtp,
        onVerifyOtp: e.onVerifyOtp,
        ...t
    })
}
export {
    N as E
};
//# sourceMappingURL=61aaacec-iflrbdc4wi4m160d.js.map