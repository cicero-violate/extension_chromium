import {
    f as M,
    n as g,
    h as B,
    s as O
} from "./1bc04b52-pfqcgruptyx7togk.js";
import {
    wP as D,
    wQ as y,
    wR as w,
    q1 as G,
    wS as p
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
const R = new Set(["button", "menu", "reset", "submit"]),
    h = {}.hasOwnProperty;

function E(e, t, n) {
    const i = n && q(n);

    function o(s, r, ...c) {
        let f = -1,
            a;
        if (s == null) {
            a = {
                type: "root",
                children: []
            };
            const l = r;
            c.unshift(l)
        } else if (a = D(s, t), a.tagName = a.tagName.toLowerCase(), i && h.call(i, a.tagName) && (a.tagName = i[a.tagName]), _(r, a.tagName)) {
            let l;
            for (l in r) h.call(r, l) && H(e, a.properties, l, r[l])
        } else c.unshift(r);
        for (; ++f < c.length;) d(a.children, c[f]);
        return a.type === "element" && a.tagName === "template" && (a.content = {
            type: "root",
            children: a.children
        }, a.children = []), a
    }
    return o
}

function _(e, t) {
    return e == null || typeof e != "object" || Array.isArray(e) ? !1 : t === "input" || !e.type || typeof e.type != "string" ? !0 : "children" in e && Array.isArray(e.children) ? !1 : t === "button" ? R.has(e.type.toLowerCase()) : !("value" in e)
}

function H(e, t, n, i) {
    const o = M(e, n);
    let s = -1,
        r;
    if (i != null) {
        if (typeof i == "number") {
            if (Number.isNaN(i)) return;
            r = i
        } else typeof i == "boolean" ? r = i : typeof i == "string" ? o.spaceSeparated ? r = y(i) : o.commaSeparated ? r = w(i) : o.commaOrSpaceSeparated ? r = y(w(i).join(" ")) : r = b(o, o.property, i) : Array.isArray(i) ? r = i.concat() : r = o.property === "style" ? V(i) : String(i);
        if (Array.isArray(r)) {
            const c = [];
            for (; ++s < r.length;) {
                const f = b(o, o.property, r[s]);
                c[s] = f
            }
            r = c
        }
        if (o.property === "className" && Array.isArray(t.className)) {
            const c = r;
            r = t.className.concat(c)
        }
        t[o.property] = r
    }
}

function d(e, t) {
    let n = -1;
    if (t != null)
        if (typeof t == "string" || typeof t == "number") e.push({
            type: "text",
            value: String(t)
        });
        else if (Array.isArray(t))
        for (; ++n < t.length;) d(e, t[n]);
    else if (typeof t == "object" && "type" in t) t.type === "root" ? d(e, t.children) : e.push(t);
    else throw new Error("Expected node, nodes, or string, got `" + t + "`")
}

function b(e, t, n) {
    if (typeof n == "string") {
        if (e.number && n && !Number.isNaN(Number(n))) return Number(n);
        if ((e.boolean || e.overloadedBoolean) && (n === "" || g(n) === g(t))) return !0
    }
    return n
}

function V(e) {
    const t = [];
    let n;
    for (n in e) h.call(e, n) && t.push([n, e[n]].join(": "));
    return t.join("; ")
}

function q(e) {
    const t = {};
    let n = -1;
    for (; ++n < e.length;) t[e[n].toLowerCase()] = e[n];
    return t
}
const W = ["altGlyph", "altGlyphDef", "altGlyphItem", "animateColor", "animateMotion", "animateTransform", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "glyphRef", "linearGradient", "radialGradient", "solidColor", "textArea", "textPath"],
    z = E(B, "div"),
    Q = E(O, "g", W),
    u = {
        html: "http://www.w3.org/1999/xhtml",
        svg: "http://www.w3.org/2000/svg"
    };

function U(e, t) {
    return k(e, {}) || {
        type: "root",
        children: []
    }
}

function k(e, t) {
    const n = Y(e, t);
    return n && t.afterTransform && t.afterTransform(e, n), n
}

function Y(e, t) {
    switch (e.nodeType) {
        case 1:
            return X(e, t);
        case 3:
            return J(e);
        case 8:
            return K(e);
        case 9:
            return N(e, t);
        case 10:
            return $();
        case 11:
            return N(e, t);
        default:
            return
    }
}

function N(e, t) {
    return {
        type: "root",
        children: j(e, t)
    }
}

function $() {
    return {
        type: "doctype"
    }
}

function J(e) {
    return {
        type: "text",
        value: e.nodeValue || ""
    }
}

function K(e) {
    return {
        type: "comment",
        value: e.nodeValue || ""
    }
}

function X(e, t) {
    const n = e.namespaceURI,
        i = n === u.svg ? Q : z,
        o = n === u.html ? e.tagName.toLowerCase() : e.tagName,
        s = n === u.html && o === "template" ? e.content : e,
        r = e.getAttributeNames(),
        c = {};
    let f = -1;
    for (; ++f < r.length;) c[r[f]] = e.getAttribute(r[f]) || "";
    return i(o, c, j(s, t))
}

function j(e, t) {
    const n = e.childNodes,
        i = [];
    let o = -1;
    for (; ++o < n.length;) {
        const s = k(n[o], t);
        s !== void 0 && i.push(s)
    }
    return i
}
const Z = new DOMParser;

function le(e, t) {
    const n = t ? .fragment ? v(e) : Z.parseFromString(e, "text/html");
    return U(n)
}

function v(e) {
    const t = document.createElement("template");
    return t.innerHTML = e, t.content
}
const x = (function(e, t, n) {
        const i = G(n);
        if (!e || !e.type || !e.children) throw new Error("Expected parent node");
        if (typeof t == "number") {
            if (t < 0 || t === Number.POSITIVE_INFINITY) throw new Error("Expected positive finite number as index")
        } else if (t = e.children.indexOf(t), t < 0) throw new Error("Expected child node or index");
        for (; ++t < e.children.length;)
            if (i(e.children[t], t, e)) return e.children[t]
    }),
    A = /\n/g,
    C = /[\t ]+/g,
    m = p("br"),
    S = p(se),
    ee = p("p"),
    T = p("tr"),
    te = p(["datalist", "head", "noembed", "noframes", "noscript", "rp", "script", "style", "template", "title", oe, ce]),
    I = p(["address", "article", "aside", "blockquote", "body", "caption", "center", "dd", "dialog", "dir", "dl", "dt", "div", "figure", "figcaption", "footer", "form,", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "legend", "li", "listing", "main", "menu", "nav", "ol", "p", "plaintext", "pre", "section", "ul", "xmp"]);

function pe(e, t) {
    const n = t || {},
        i = "children" in e ? e.children : [],
        o = I(e),
        s = F(e, {
            whitespace: n.whitespace || "normal"
        }),
        r = [];
    (e.type === "text" || e.type === "comment") && r.push(...P(e, {
        breakBefore: !0,
        breakAfter: !0
    }));
    let c = -1;
    for (; ++c < i.length;) r.push(...L(i[c], e, {
        whitespace: s,
        breakBefore: c ? void 0 : o,
        breakAfter: c < i.length - 1 ? m(i[c + 1]) : o
    }));
    const f = [];
    let a;
    for (c = -1; ++c < r.length;) {
        const l = r[c];
        typeof l == "number" ? a !== void 0 && l > a && (a = l) : l && (a !== void 0 && a > -1 && f.push(`
`.repeat(a) || " "), a = -1, f.push(l))
    }
    return f.join("")
}

function L(e, t, n) {
    return e.type === "element" ? ne(e, t, n) : e.type === "text" ? n.whitespace === "normal" ? P(e, n) : re(e) : []
}

function ne(e, t, n) {
    const i = F(e, n),
        o = e.children || [];
    let s = -1,
        r = [];
    if (te(e)) return r;
    let c, f;
    for (m(e) || T(e) && x(t, e, T) ? f = `
` : ee(e) ? (c = 2, f = 2) : I(e) && (c = 1, f = 1); ++s < o.length;) r = r.concat(L(o[s], e, {
        whitespace: i,
        breakBefore: s ? void 0 : c,
        breakAfter: s < o.length - 1 ? m(o[s + 1]) : f
    }));
    return S(e) && x(t, e, S) && r.push("	"), c && r.unshift(c), f && r.push(f), r
}

function P(e, t) {
    const n = String(e.value),
        i = [],
        o = [];
    let s = 0;
    for (; s <= n.length;) {
        A.lastIndex = s;
        const f = A.exec(n),
            a = f && "index" in f ? f.index : n.length;
        i.push(ie(n.slice(s, a).replace(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, ""), s === 0 ? t.breakBefore : !0, a === n.length ? t.breakAfter : !0)), s = a + 1
    }
    let r = -1,
        c;
    for (; ++r < i.length;) i[r].charCodeAt(i[r].length - 1) === 8203 || r < i.length - 1 && i[r + 1].charCodeAt(0) === 8203 ? (o.push(i[r]), c = void 0) : i[r] ? (typeof c == "number" && o.push(c), o.push(i[r]), c = 0) : (r === 0 || r === i.length - 1) && o.push(0);
    return o
}

function re(e) {
    return [String(e.value)]
}

function ie(e, t, n) {
    const i = [];
    let o = 0,
        s;
    for (; o < e.length;) {
        C.lastIndex = o;
        const r = C.exec(e);
        s = r ? r.index : e.length, !o && !s && r && !t && i.push(""), o !== s && i.push(e.slice(o, s)), o = r ? s + r[0].length : s
    }
    return o !== s && !n && i.push(""), i.join(" ")
}

function F(e, t) {
    if (e.type === "element") {
        const n = e.properties || {};
        switch (e.tagName) {
            case "listing":
            case "plaintext":
            case "xmp":
                return "pre";
            case "nobr":
                return "nowrap";
            case "pre":
                return n.wrap ? "pre-wrap" : "pre";
            case "td":
            case "th":
                return n.noWrap ? "nowrap" : t.whitespace;
            case "textarea":
                return "pre-wrap"
        }
    }
    return t.whitespace
}

function oe(e) {
    return !!(e.properties || {}).hidden
}

function se(e) {
    return e.tagName === "td" || e.tagName === "th"
}

function ce(e) {
    return e.tagName === "dialog" && !(e.properties || {}).open
}
export {
    le as f, z as h, Q as s, pe as t, u as w
};
//# sourceMappingURL=1bc04b52-cvho6b74mdi8rq0h.js.map