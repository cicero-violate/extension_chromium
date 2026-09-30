import {
    R as n
} from "./4813494d-javwxs2rmzsrunl2.js";
async function i(t) {
    const e = new FormData;
    e.append("file", t, t.name);
    const o = await n.safePost("/calpico/chatgpt/profile_files", {
        requestBody: e
    });
    return r(o)
}

function r(t) {
    if (t == null || typeof t != "object") return null;
    const e = Reflect.get(t, "asset_pointer");
    return typeof e == "string" ? e : null
}
export {
    i as u
};
//# sourceMappingURL=880eb4dc-e1dniulzyhjekor0.js.map