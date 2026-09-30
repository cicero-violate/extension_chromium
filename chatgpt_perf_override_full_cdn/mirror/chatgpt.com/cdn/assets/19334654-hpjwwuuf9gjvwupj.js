import {
    cO as c
} from "./4813494d-javwxs2rmzsrunl2.js";

function p({
    thread: t,
    messageId: e,
    contentReferenceStartIndex: r,
    productIndex: o
}) {
    if (!t || !e || r === void 0 || o === void 0) return {};
    const s = c.getNode(t, e).message ? .metadata ? .content_references ? .find(a => a.start_idx === r);
    return s ? u({
        contentReference: s,
        productIndex: o
    }) : {}
}

function u({
    contentReference: t,
    productIndex: e
}) {
    let r;
    switch (t.type) {
        case "products":
        case "explore_more":
            r = t.products[e];
            break;
        case "product":
            r = t.product;
            break;
        case "product_entity":
            r = t.product;
            break
    }
    return r ? {
        product: r
    } : {}
}
export {
    u as a, p as g
};
//# sourceMappingURL=19334654-hpjwwuuf9gjvwupj.js.map