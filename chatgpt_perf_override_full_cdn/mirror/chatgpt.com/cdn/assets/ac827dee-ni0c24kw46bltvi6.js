import {
    vO as p
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    a6 as u
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function h(t) {
    return "children" in t
}
const v = t => t.type === "text" && "value" in t && typeof t.value == "string",
    a = "hiveTranscript",
    c = /(::hiveTranscript\{([^}]+)\})/g,
    E = /\btimestamp\s*=\s*["']?(\d+)["']?(?=\s|,|$)/,
    f = () => t => {
        u(t, e => {
            if (e.type !== "paragraph" && e.type !== "tableCell" || !h(e) || !Array.isArray(e.children)) return;
            const r = [];
            for (const i of e.children)
                if (v(i) && i.value.includes(`::${a}`)) {
                    c.lastIndex = 0;
                    let s = 0,
                        n;
                    for (;
                        (n = c.exec(i.value)) != null;) {
                        n.index > s && r.push({
                            type: "text",
                            value: i.value.slice(s, n.index)
                        });
                        const o = n[2],
                            l = E.exec(o) ? .[1];
                        l && Number.isInteger(Number(l)) && r.push({
                            type: "textDirective",
                            name: a,
                            attributes: {
                                timestamp: l
                            },
                            data: {
                                hName: a,
                                hProperties: {
                                    timestamp: l
                                }
                            },
                            children: [],
                            position: i.position
                        }), s = c.lastIndex
                    }
                    s < i.value.length && r.push({
                        type: "text",
                        value: i.value.slice(s)
                    })
                } else r.push(i);
            e.children = r
        })
    },
    T = Object.freeze(Object.defineProperty({
        __proto__: null,
        HIVE_LOG_DIRECTIVE_NAME: a,
        hiveLogDirectivePlugin: f
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    m = [p, a],
    d = () => t => {
        u(t, "textDirective", e => {
            m.includes(e.name) || (e.type = "text", e.value = `:${e.name}`)
        })
    };
export {
    a as H, f as a, T as b, d as f, m as h, h as i
};
//# sourceMappingURL=ac827dee-ni0c24kw46bltvi6.js.map