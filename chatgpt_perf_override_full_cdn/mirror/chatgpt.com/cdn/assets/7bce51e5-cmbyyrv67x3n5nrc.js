import {
    c as j,
    r as _,
    u as B,
    j as s,
    d as k,
    o as p
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    J as b,
    a0 as w,
    cz as R,
    _ as C,
    R as z,
    aw as v
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    dk as E
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function x({
    description: i,
    onClose: e,
    onConfirm: a
}) {
    const t = B();
    return s.jsx(w, {
        testId: "modal-confirm-reset-memory",
        isOpen: !0,
        onClose: e,
        type: "success",
        title: t.formatMessage({
            id: "MemoriesModal.resetModalTitle",
            defaultMessage: "Are you sure?"
        }),
        description: i,
        primaryButton: s.jsx(R.Button, {
            title: t.formatMessage({
                id: "MemoriesModal.resetModalConfirm",
                defaultMessage: "Clear memory"
            }),
            color: "danger",
            onClick: a,
            "data-testid": "confirm-reset-memories-button"
        }),
        secondaryButton: s.jsx(R.Button, {
            title: t.formatMessage({
                id: "MemoriesModal.resetModalCancel",
                defaultMessage: "Cancel"
            }),
            color: "secondary",
            onClick: e
        })
    })
}

function I(i) {
    "use forget";
    const e = j.c(17),
        {
            onReset: a,
            gizmoId: t,
            memoryName: m
        } = i,
        [g, l] = _.useState(!1),
        o = B(),
        d = b(),
        y = E();
    let c;
    e[0] !== t || e[1] !== o || e[2] !== a || e[3] !== d ? (c = async () => {
        C.logEvent("Memory Manage Reset Button Confirmed");
        try {
            const h = {};
            t && (h.gizmo_id = t), await z.safeDelete("/settings/clear_account_user_memory", {
                requestBody: h
            }), d.success(o.formatMessage({
                id: "ResetMemoriesButton.resetSuccess",
                defaultMessage: "Memory cleared."
            })), a && a(), l(!1)
        } catch {
            d.danger(k({
                id: "ResetMemoriesButton.resetFailed",
                defaultMessage: "Failed to clear memory."
            }), {
                toastId: "reset_memories_button_reset_failed"
            })
        }
    }, e[0] = t, e[1] = o, e[2] = a, e[3] = d, e[4] = c) : c = e[4];
    const u = c;
    let f;
    e[5] === Symbol.for("react.memo_cache_sentinel") ? (f = () => {
        C.logEvent("Memory Manage Reset Button Clicked"), l(!0)
    }, e[5] = f) : f = e[5];
    let r;
    e[6] !== t ? (r = s.jsx(v, {
        color: "danger-outline",
        onClick: f,
        "data-testid": "reset-memories-button",
        children: t ? s.jsx(p, {
            id: "ResetMemoriesButton.resetGizmo",
            defaultMessage: "Clear this GPT's memory"
        }) : s.jsx(p, {
            id: "ResetMemoriesButton.resetChatGPT",
            defaultMessage: "Delete all"
        })
    }), e[6] = t, e[7] = r) : r = e[7];
    let n;
    e[8] !== u || e[9] !== y || e[10] !== o || e[11] !== m || e[12] !== g ? (n = g && (y ? s.jsx(x, {
        description: o.formatMessage({
            id: "MemoriesModal.resetGizmoModalDescriptionUpdated",
            defaultMessage: "Deleting your saved memories means {name} may not remember this information going forward. To fully remove this information from {name}'s memory, please delete any related chats. <link>Learn more</link>"
        }, {
            name: m,
            link: T
        }),
        onClose: () => l(!1),
        onConfirm: u
    }) : s.jsx(x, {
        description: o.formatMessage({
            id: "MemoriesModal.resetGizmoModalDescription",
            defaultMessage: "{name} will forget everything it has remembered from your chats. This cannot be undone."
        }, {
            name: m
        }),
        onClose: () => l(!1),
        onConfirm: u
    })), e[8] = u, e[9] = y, e[10] = o, e[11] = m, e[12] = g, e[13] = n) : n = e[13];
    let M;
    return e[14] !== r || e[15] !== n ? (M = s.jsxs(s.Fragment, {
        children: [r, n]
    }), e[14] = r, e[15] = n, e[16] = M) : M = e[16], M
}

function T(i) {
    return s.jsx("a", {
        className: "underline",
        href: "https://help.openai.com/en/articles/8983136-what-is-memory",
        children: i
    })
}
export {
    I as R
};
//# sourceMappingURL=7bce51e5-cmbyyrv67x3n5nrc.js.map