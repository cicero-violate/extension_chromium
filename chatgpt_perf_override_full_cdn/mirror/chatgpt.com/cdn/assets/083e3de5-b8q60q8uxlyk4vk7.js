import {
    R as o
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    y as r
} from "./2340486e-dvd8m80i7d6hyild.js";

function u() {
    return r({
        mutationFn: ({
            phoneNumber: t,
            triggeringProduct: e,
            verificationExpiryWindowMs: n
        }) => o.safePost("/accounts/v1/phone_registry/enroll/start", {
            requestBody: {
                phone_number: t,
                triggering_product: e,
                verification_expiry_window_ms: n
            }
        })
    })
}

function a() {
    return r({
        mutationFn: ({
            phoneNumber: t,
            triggeringProduct: e,
            verificationCode: n
        }) => o.safePost("/accounts/v1/phone_registry/enroll/finish", {
            requestBody: {
                phone_number: t,
                triggering_product: e,
                verification_code: n
            }
        })
    })
}
export {
    a,
    u
};
//# sourceMappingURL=083e3de5-b8q60q8uxlyk4vk7.js.map