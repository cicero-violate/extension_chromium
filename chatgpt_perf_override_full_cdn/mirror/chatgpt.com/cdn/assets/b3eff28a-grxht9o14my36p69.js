import {
    R as l,
    v as r
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    h as n
} from "./2340486e-dvd8m80i7d6hyild.js";
var t = {};
async function o(e) {
    return l.safePost("/accounts/add_email/begin", {
        requestBody: {
            email: e,
            auth0_client_id: t.AUTH0_CLIENT_ID
        },
        authOption: r.Required
    })
}
async function m(e, i, a) {
    const s = {
        email: e,
        code: i
    };
    return a ? .socialUser === !0 && (s.remove_social_subs = !0), l.safePost("/accounts/change_email/verify", {
        requestBody: s,
        authOption: r.Required
    })
}
async function c(e, i) {
    const a = {
        email: e,
        ...t.AUTH0_CLIENT_ID ? {
            auth0_client_id: t.AUTH0_CLIENT_ID
        } : {}
    };
    return i ? .socialUser === !0 && (a.remove_social_subs = !0), l.safePost("/accounts/change_email/begin", {
        requestBody: a,
        authOption: r.Required
    })
}
const f = n({
    sendEmailFailure: {
        id: "emailVerify.sendEmailFailure",
        defaultMessage: "Could not send email verification code, please try again later."
    },
    sendEmailFailureInvalidEmail: {
        id: "emailVerify.invalidEmail",
        defaultMessage: 'The email address "{email}" is not formatted correctly.'
    },
    sendEmailFailureInvalidEmailEmpty: {
        id: "emailVerify.invalidEmailEmpty",
        defaultMessage: "Please enter a valid email address to continue."
    },
    sendEmailFailureRateLimited: {
        id: "emailVerify.sendEmailFailure.rateLimited",
        defaultMessage: "You've sent too many requests. Please try again later or contact support."
    },
    emailChangeDailyLimitReached: {
        id: "emailVerify.changeEmail.dailyLimitReached",
        defaultMessage: "You can only change your email twice within 24 hours. Please try again later."
    },
    emailChangeLifetimeLimitReached: {
        id: "emailVerify.changeEmail.lifetimeLimitReached",
        defaultMessage: "You’ve reached the 20-email-change limit for this account."
    },
    verifyOtpFailure: {
        id: "emailVerify.verifyOtpFailure",
        defaultMessage: "Something went wrong, please try again later."
    },
    verifyOtpFailureInvalidOtp: {
        id: "emailVerify.verifyOtpFailure.invalidOtp",
        defaultMessage: "The code you entered is invalid. Please try again."
    },
    verifyOtpFailureInvalidFormat: {
        id: "emailVerify.verifyOtpFailure.invalidFormat",
        defaultMessage: "The code you entered is formatted incorrectly."
    },
    verifyOtpFailureEmailAlreadyLinked: {
        id: "emailVerify.verifyOtpFailure.emailAlreadyLinked",
        defaultMessage: '{branch, select, email {"{emailValue}"} other {Your email}} is already linked to another account.'
    },
    verifyOtpFailureRateLimited: {
        id: "emailVerify.verifyOtpFailure.rateLimited",
        defaultMessage: "You've sent too many requests. Please try again later or contact support."
    },
    verifyOtpSuccess: {
        id: "emailVerify.verifyOtpSuccess",
        defaultMessage: "Email confirmed."
    }
});
export {
    o as a, m as b, c, f as m
};
//# sourceMappingURL=b3eff28a-grxht9o14my36p69.js.map