import {
    Bg as g,
    vO as E
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    q1 as I,
    gP as k,
    a7 as T,
    q2 as w
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    r as A,
    C
} from "./1bc04b52-c842ajlk411j0plj.js";
import {
    unified as N
} from "./f6f4f1b2-gtlbp7j4szobo0y1.js";
import {
    r as R
} from "./1bc04b52-homyy2s5cy2i6moh.js";
import {
    r as _
} from "./1bc04b52-hg3ptm9pgpi9lcut.js";
const x = {
        blockquote: h,
        break: S,
        code: o,
        definition: o,
        delete: h,
        emphasis: h,
        footnoteReference: o,
        footnoteDefinition: o,
        heading: B,
        html: o,
        image: v,
        imageReference: v,
        inlineCode: y,
        list: h,
        listItem: h,
        link: h,
        linkReference: h,
        strong: h,
        table: o,
        tableCell: o,
        text: y,
        thematicBreak: o,
        toml: o,
        yaml: o
    },
    O = {},
    p = [];

function b(n) {
    const t = { ...x
        },
        i = n || O,
        a = i.keep || p,
        s = i.remove || p;
    let f = -1;
    for (; ++f < s.length;) {
        const e = s[f];
        typeof e == "string" ? t[e] = o : t[e[0]] = e[1]
    }
    let u = {};
    if (a.length === 0) u = t;
    else {
        let e;
        for (e in t) a.includes(e) || (u[e] = t[e]);
        for (f = -1; ++f < a.length;)
            if (e = a[f], !Object.hasOwn(t, e)) throw new Error("Unknown node type `" + e + "` in `keep`, use a replace tuple with a handle instead: `remove: [['" + e + "', handle]]`")
    }
    return function(e) {
        return d(e)
    };

    function d(e) {
        const l = e.type;
        let r = e;
        if (Object.hasOwn(u, l)) {
            const c = u[l];
            c && (r = c(r) || void 0)
        }
        return r = Array.isArray(r) ? m(r) : r, r && "children" in r && (r.children = m(r.children)), r
    }

    function m(e) {
        let l = -1;
        const r = [];
        for (; ++l < e.length;) {
            const c = d(e[l]);
            Array.isArray(c) ? r.push(...m(c)) : c && r.push(c)
        }
        return D(r)
    }
}

function D(n) {
    let t = -1;
    const i = [];
    let a;
    for (; ++t < n.length;) {
        const s = n[t];
        a && s.type === a.type && "value" in s && "value" in a ? a.value += s.value : (i.push(s), a = s)
    }
    return i
}

function v(n) {
    const t = "title" in n ? n.title : "",
        i = n.alt || t || "";
    return i ? {
        type: "text",
        value: i
    } : void 0
}

function y(n) {
    return {
        type: "text",
        value: n.value
    }
}

function B(n) {
    return {
        type: "paragraph",
        children: n.children
    }
}

function h(n) {
    return n.children
}

function S() {
    return {
        type: "text",
        value: `
`
    }
}

function o() {}

function F(n, t, i) {
    const a = I(t);
    let s = !0;
    t && typeof t == "object" && "cascade" in t && typeof t.cascade == "boolean" && (s = t.cascade), f(n);

    function f(u, d, m) {
        if (u !== n && a(u, d, m)) return !1;
        if ("children" in u && Array.isArray(u.children)) {
            const e = u,
                l = e.children;
            let r = -1,
                c = 0;
            if (l.length > 0) {
                for (; ++r < l.length;) f(l[r], r, e) && (l[c++] = l[r]);
                if (u !== n && s && !c) return !1;
                l.length = c
            }
        }
        return !0
    }
}
const M = new Set([g, E, w, C]),
    V = () => n => {
        F(n, t => T(t) && M.has(t.name))
    },
    P = /[\u200B-\u200D\u2060\uFEFF\u00A0\u202F\u2000-\u200A\u3000\u2028\u2029]/gu;

function U(n) {
    const t = N().use(R).use(k, {
        singleTilde: !1
    }).use(A).use(V).use(b, {
        keep: ["list", "listItem"]
    }).use(_, {
        bullet: "-",
        handlers: {
            text: i => (i.value = i.value.replace(P, ""), i.value)
        }
    }).processSync(n);
    return String(t).trim()
}
export {
    U as m, V as r
};
//# sourceMappingURL=bc18f706-ctivje9d0t0qyr68.js.map