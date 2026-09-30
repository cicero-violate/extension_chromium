import {
    h as l
} from "./ac827dee-ni0c24kw46bltvi6.js";
import {
    a6 as m
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import "./4813494d-javwxs2rmzsrunl2.js";
import "./2340486e-dvd8m80i7d6hyild.js";
const a = (s = {}) => {
    const c = new Set(s.preserve ? ? []);
    return o => {
        m(o, "textDirective", (i, t, r) => {
            if (!l.includes(i.name) || c.has(i.name) || !r || typeof t != "number") return;
            const e = r.children[t - 1];
            e && e.type === "text" && e.value.endsWith(" ") && (e.value = e.value.slice(0, -1)), r.children.splice(t, 1)
        })
    }
};
export {
    a as stripDirectivePlugin
};
//# sourceMappingURL=200313d5-pcfdrmdp92b52l9u.js.map