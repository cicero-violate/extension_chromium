import {
    PT as N,
    a6 as R
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    j as d
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    unified as H
} from "./f6f4f1b2-gtlbp7j4szobo0y1.js";
import {
    r as S
} from "./1bc04b52-homyy2s5cy2i6moh.js";
import {
    r as D,
    t as I,
    u
} from "./1bc04b52-pfqcgruptyx7togk.js";
import {
    V as U
} from "./1bc04b52-lymnctp12j4ukscl.js";
import "./4813494d-javwxs2rmzsrunl2.js";
import "./1bc04b52-h1em0bjkpkjv8ykw.js";
import "./1bc04b52-hnu6g21afx0au4ng.js";
const F = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md",
    w = [],
    h = {
        allowDangerousHtml: !0
    },
    M = /^(https?|ircs?|mailto|xmpp)$/i,
    V = [{
        from: "astPlugins",
        id: "remove-buggy-html-in-markdown-parser"
    }, {
        from: "allowDangerousHtml",
        id: "remove-buggy-html-in-markdown-parser"
    }, {
        from: "allowNode",
        id: "replace-allownode-allowedtypes-and-disallowedtypes",
        to: "allowElement"
    }, {
        from: "allowedTypes",
        id: "replace-allownode-allowedtypes-and-disallowedtypes",
        to: "allowedElements"
    }, {
        from: "disallowedTypes",
        id: "replace-allownode-allowedtypes-and-disallowedtypes",
        to: "disallowedElements"
    }, {
        from: "escapeHtml",
        id: "remove-buggy-html-in-markdown-parser"
    }, {
        from: "includeElementIndex",
        id: "#remove-includeelementindex"
    }, {
        from: "includeNodeIndex",
        id: "change-includenodeindex-to-includeelementindex"
    }, {
        from: "linkTarget",
        id: "remove-linktarget"
    }, {
        from: "plugins",
        id: "change-plugins-to-remarkplugins",
        to: "remarkPlugins"
    }, {
        from: "rawSourcePos",
        id: "#remove-rawsourcepos"
    }, {
        from: "renderers",
        id: "change-renderers-to-components",
        to: "components"
    }, {
        from: "source",
        id: "change-source-to-children",
        to: "children"
    }, {
        from: "sourcePos",
        id: "#remove-sourcepos"
    }, {
        from: "transformImageUri",
        id: "#add-urltransform",
        to: "urlTransform"
    }, {
        from: "transformLinkUri",
        id: "#add-urltransform",
        to: "urlTransform"
    }];

function Q(e) {
    const o = e.allowedElements,
        a = e.allowElement,
        m = e.children || "",
        i = e.className,
        y = e.components,
        f = e.disallowedElements,
        k = e.rehypePlugins || w,
        b = e.remarkPlugins || w,
        O = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions,
            ...h
        } : h,
        P = e.skipHtml,
        v = e.unwrapDisallowed,
        x = e.urlTransform || q,
        p = H().use(S).use(b).use(D, O).use(k),
        c = new U;
    typeof m == "string" && (c.value = m);
    for (const r of V) Object.hasOwn(e, r.from) && N("Unexpected `" + r.from + "` prop, " + (r.to ? "use `" + r.to + "` instead" : "remove it") + " (see <" + F + "#" + r.id + "> for more info)");
    const E = p.parse(c);
    let n = p.runSync(E, c);
    return i && (n = {
        type: "element",
        tagName: "div",
        properties: {
            className: i
        },
        children: n.type === "root" ? n.children : [n]
    }), R(n, T), I(n, {
        Fragment: d.Fragment,
        components: y,
        ignoreInvalidStyle: !0,
        jsx: d.jsx,
        jsxs: d.jsxs,
        passKeys: !0,
        passNode: !0
    });

    function T(r, t, l) {
        if (r.type === "raw" && l && typeof t == "number") return P ? l.children.splice(t, 1) : l.children[t] = {
            type: "text",
            value: r.value
        }, t;
        if (r.type === "element") {
            let s;
            for (s in u)
                if (Object.hasOwn(u, s) && Object.hasOwn(r.properties, s)) {
                    const j = r.properties[s],
                        g = u[s];
                    (g === null || g.includes(r.tagName)) && (r.properties[s] = x(String(j || ""), s, r))
                }
        }
        if (r.type === "element") {
            let s = o ? !o.includes(r.tagName) : f ? f.includes(r.tagName) : !1;
            if (!s && a && typeof t == "number" && (s = !a(r, t, l)), s && l && typeof t == "number") return v && r.children ? l.children.splice(t, 1, ...r.children) : l.children.splice(t, 1), t
        }
    }
}

function q(e) {
    const o = e.indexOf(":"),
        a = e.indexOf("?"),
        m = e.indexOf("#"),
        i = e.indexOf("/");
    return o < 0 || i > -1 && o > i || a > -1 && o > a || m > -1 && o > m || M.test(e.slice(0, o)) ? e : ""
}
export {
    Q as
    default, q as defaultUrlTransform
};
//# sourceMappingURL=d4fd05ef-jcd8acyt60dknv7p.js.map