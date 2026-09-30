import {
    l as r,
    J as m
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    p as u,
    i as l,
    a as c
} from "./af7de5ed-hluw7l4ayzlk3ze4.js";
import {
    W as d
} from "./cf64444f-b0z8ffdp5xu532do.js";
import {
    x as f,
    u as h,
    y as v,
    d as p
} from "./2340486e-dvd8m80i7d6hyild.js";

function C({
    onSuccess: n,
    showSuccessToast: i = !0
}) {
    const a = f(),
        t = r(),
        s = m(),
        o = h();
    return v({
        mutationFn: e => d.createEnvironment(e),
        onSuccess: async e => {
            e && u(a, e, {
                id: t ? .id ? ? "",
                email: t ? .email ? ? "",
                name: t ? .name ? ? ""
            }), await Promise.all([l(a), c(a, e ? .id)]), i && s.success(o.formatMessage({
                id: "wham.whamMutations.environmentCreatedSuccessfully",
                defaultMessage: "Environment created successfully"
            })), n ? .(e)
        },
        onError: () => {
            s.danger(p({
                id: "wham.whamMutations.failedToCreateEnvironment",
                defaultMessage: "Failed to create environment"
            }), {
                toastId: "wham_mutations_failed_to_create_environment"
            })
        }
    })
}
export {
    C as u
};
//# sourceMappingURL=82d09521-lr5i67hbagw70kyh.js.map