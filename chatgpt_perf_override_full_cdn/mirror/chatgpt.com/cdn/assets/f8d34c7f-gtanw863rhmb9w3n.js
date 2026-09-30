import {
    a,
    N as l,
    _ as u,
    wk as d
} from "./4813494d-javwxs2rmzsrunl2.js";

function g(e, {
    isCodeEdited: t,
    analyticsContext: o
}) {
    if (o == null) return;
    const {
        conversationId: r,
        messageId: c,
        codeBlockLanguage: n
    } = o;
    u.logStructuredEvent(d, {
        conversationId: r,
        messageId: c,
        codeBlockLanguage: n,
        operation: e,
        isEdited: t
    })
}

function i(e, t, {
    outcome: o,
    language: r,
    isCodeEdited: c,
    analyticsContext: n
}) {
    a.count(l.CODE_BLOCKS, t, {
        outcome: o,
        language: r,
        is_edited: String(c)
    }), o === "failure" && g(e, {
        isCodeEdited: c,
        analyticsContext: n
    })
}

function k(e) {
    i("preview", "chatgpt_code_block.preview.outcome", e)
}

function f(e) {
    i("run", "chatgpt_code_block.run.outcome", e)
}
export {
    f as a, k as l
};
//# sourceMappingURL=f8d34c7f-gtanw863rhmb9w3n.js.map