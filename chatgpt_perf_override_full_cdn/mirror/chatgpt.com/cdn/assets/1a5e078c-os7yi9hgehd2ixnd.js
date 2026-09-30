import {
    wC as U,
    Bg as W,
    vO as F
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    g as A,
    b as R,
    c as d,
    d as $,
    r as z,
    s as G
} from "./881648b6-ighgvbrp6yyqupn4.js";
import {
    wS as K,
    Ew as y,
    q1 as V,
    Ex as J,
    Ey as Y,
    wA as S,
    a6 as O,
    hJ as h,
    a7 as Q,
    sv as X
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    m as Z
} from "./bc18f706-ctivje9d0t0qyr68.js";
import {
    unified as N
} from "./f6f4f1b2-gtlbp7j4szobo0y1.js";
import {
    r as b
} from "./1bc04b52-homyy2s5cy2i6moh.js";
import {
    s as D,
    f as ee,
    h as te,
    r as ne
} from "./1bc04b52-pfqcgruptyx7togk.js";
import {
    z as re,
    h as ae
} from "./1bc04b52-j8mdq0okhi6vw6kp.js";
import {
    a as m
} from "./1bc04b52-gtpe46xocf6zem4g.js";
import {
    w as p
} from "./1bc04b52-hnu6g21afx0au4ng.js";
import {
    r as se
} from "./1bc04b52-hg3ptm9pgpi9lcut.js";
const ie = K(function(t) {
        return t.tagName === "audio" || t.tagName === "canvas" || t.tagName === "embed" || t.tagName === "iframe" || t.tagName === "img" || t.tagName === "math" || t.tagName === "object" || t.tagName === "picture" || t.tagName === "svg" || t.tagName === "video"
    }),
    oe = ["address", "article", "aside", "blockquote", "body", "br", "caption", "center", "col", "colgroup", "dd", "dialog", "dir", "div", "dl", "dt", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "legend", "li", "li", "listing", "main", "menu", "nav", "ol", "optgroup", "option", "p", "plaintext", "pre", "section", "summary", "table", "tbody", "td", "td", "tfoot", "th", "th", "thead", "tr", "ul", "wbr", "xmp"],
    ce = ["button", "input", "select", "textarea"],
    le = ["area", "base", "basefont", "dialog", "datalist", "head", "link", "meta", "noembed", "noframes", "param", "rp", "script", "source", "style", "template", "track", "title"],
    ue = {},
    _ = V(["comment", "doctype"]);

function me(t, r) {
    T(t, {
        collapse: Ne((r || ue).newlines ? de : ye),
        whitespace: "normal"
    })
}

function T(t, r) {
    if ("children" in t) {
        const n = { ...r
        };
        return (t.type === "root" || L(t)) && (n.before = !0, n.after = !0), n.whitespace = be(t, r), pe(t, n)
    }
    if (t.type === "text") {
        if (r.whitespace === "normal") return fe(t, r);
        r.whitespace === "nowrap" && (t.value = r.collapse(t.value))
    }
    return {
        ignore: _(t),
        stripAtStart: !1,
        remove: !1
    }
}

function fe(t, r) {
    const n = r.collapse(t.value),
        e = {
            ignore: !1,
            stripAtStart: !1,
            remove: !1
        };
    let a = 0,
        i = n.length;
    return r.before && E(n.charAt(0)) && a++, a !== i && E(n.charAt(i - 1)) && (r.after ? i-- : e.stripAtStart = !0), a === i ? e.remove = !0 : t.value = n.slice(a, i), e
}

function pe(t, r) {
    let n = r.before;
    const e = r.after,
        a = t.children;
    let i = a.length,
        o = -1;
    for (; ++o < i;) {
        const s = T(a[o], { ...r,
            after: P(a, o, e),
            before: n
        });
        s.remove ? (a.splice(o, 1), o--, i--) : s.ignore || (n = s.stripAtStart), H(a[o]) && (n = !1)
    }
    return {
        ignore: !1,
        stripAtStart: !!(n || e),
        remove: !1
    }
}

function P(t, r, n) {
    for (; ++r < t.length;) {
        const e = t[r];
        let a = ge(e);
        if (a === void 0 && "children" in e && !he(e) && (a = P(e.children, -1)), typeof a == "boolean") return a
    }
    return n
}

function ge(t) {
    if (t.type === "element") {
        if (H(t)) return !1;
        if (L(t)) return !0
    } else if (t.type === "text") {
        if (!p(t)) return !1
    } else if (!_(t)) return !1
}

function H(t) {
    return ie(t) || y(t, ce)
}

function L(t) {
    return y(t, oe)
}

function he(t) {
    return !!(t.type === "element" && t.properties.hidden) || _(t) || y(t, le)
}

function E(t) {
    return t === " " || t === `
`
}

function de(t) {
    const r = /\r?\n|\r/.exec(t);
    return r ? r[0] : " "
}

function ye() {
    return " "
}

function Ne(t) {
    return r;

    function r(n) {
        return String(n).replace(/[\t\n\v\f\r ]+/g, t)
    }
}

function be(t, r) {
    if ("tagName" in t && t.properties) switch (t.tagName) {
        case "listing":
        case "plaintext":
        case "script":
        case "style":
        case "xmp":
            return "pre";
        case "nobr":
            return "nowrap";
        case "pre":
            return t.properties.wrap ? "pre-wrap" : "pre";
        case "td":
        case "th":
            return t.properties.noWrap ? "nowrap" : r.whitespace;
        case "textarea":
            return "pre-wrap"
    }
    return r.whitespace
}

function _e(t) {
    return function(r) {
        me(r, t)
    }
}
const we = /^>|^->|<!--|-->|--!>|<!-$/g,
    ve = [">"],
    xe = ["<", ">"];

function Se(t, r, n, e) {
    return e.settings.bogusComments ? "<?" + m(t.value, Object.assign({}, e.settings.characterReferences, {
        subset: ve
    })) + ">" : "<!--" + t.value.replace(we, a) + "-->";

    function a(i) {
        return m(i, Object.assign({}, e.settings.characterReferences, {
            subset: xe
        }))
    }
}

function Ee(t, r, n, e) {
    return "<!" + (e.settings.upperDoctype ? "DOCTYPE" : "doctype") + (e.settings.tightDoctype ? "" : " ") + "html>"
}
const l = B(1),
    I = B(-1),
    ke = [];

function B(t) {
    return r;

    function r(n, e, a) {
        const i = n ? n.children : ke;
        let o = (e || 0) + t,
            s = i[o];
        if (!a)
            for (; s && p(s);) o += t, s = i[o];
        return s
    }
}
const Ce = {}.hasOwnProperty;

function q(t) {
    return r;

    function r(n, e, a) {
        return Ce.call(t, n.tagName) && t[n.tagName](n, e, a)
    }
}
const w = q({
    body: Re,
    caption: g,
    colgroup: g,
    dd: Pe,
    dt: Te,
    head: g,
    html: Ae,
    li: De,
    optgroup: He,
    option: Le,
    p: Oe,
    rp: k,
    rt: k,
    tbody: Be,
    td: C,
    tfoot: qe,
    th: C,
    thead: Ie,
    tr: je
});

function g(t, r, n) {
    const e = l(n, r, !0);
    return !e || e.type !== "comment" && !(e.type === "text" && p(e.value.charAt(0)))
}

function Ae(t, r, n) {
    const e = l(n, r);
    return !e || e.type !== "comment"
}

function Re(t, r, n) {
    const e = l(n, r);
    return !e || e.type !== "comment"
}

function Oe(t, r, n) {
    const e = l(n, r);
    return e ? e.type === "element" && (e.tagName === "address" || e.tagName === "article" || e.tagName === "aside" || e.tagName === "blockquote" || e.tagName === "details" || e.tagName === "div" || e.tagName === "dl" || e.tagName === "fieldset" || e.tagName === "figcaption" || e.tagName === "figure" || e.tagName === "footer" || e.tagName === "form" || e.tagName === "h1" || e.tagName === "h2" || e.tagName === "h3" || e.tagName === "h4" || e.tagName === "h5" || e.tagName === "h6" || e.tagName === "header" || e.tagName === "hgroup" || e.tagName === "hr" || e.tagName === "main" || e.tagName === "menu" || e.tagName === "nav" || e.tagName === "ol" || e.tagName === "p" || e.tagName === "pre" || e.tagName === "section" || e.tagName === "table" || e.tagName === "ul") : !n || !(n.type === "element" && (n.tagName === "a" || n.tagName === "audio" || n.tagName === "del" || n.tagName === "ins" || n.tagName === "map" || n.tagName === "noscript" || n.tagName === "video"))
}

function De(t, r, n) {
    const e = l(n, r);
    return !e || e.type === "element" && e.tagName === "li"
}

function Te(t, r, n) {
    const e = l(n, r);
    return !!(e && e.type === "element" && (e.tagName === "dt" || e.tagName === "dd"))
}

function Pe(t, r, n) {
    const e = l(n, r);
    return !e || e.type === "element" && (e.tagName === "dt" || e.tagName === "dd")
}

function k(t, r, n) {
    const e = l(n, r);
    return !e || e.type === "element" && (e.tagName === "rp" || e.tagName === "rt")
}

function He(t, r, n) {
    const e = l(n, r);
    return !e || e.type === "element" && e.tagName === "optgroup"
}

function Le(t, r, n) {
    const e = l(n, r);
    return !e || e.type === "element" && (e.tagName === "option" || e.tagName === "optgroup")
}

function Ie(t, r, n) {
    const e = l(n, r);
    return !!(e && e.type === "element" && (e.tagName === "tbody" || e.tagName === "tfoot"))
}

function Be(t, r, n) {
    const e = l(n, r);
    return !e || e.type === "element" && (e.tagName === "tbody" || e.tagName === "tfoot")
}

function qe(t, r, n) {
    return !l(n, r)
}

function je(t, r, n) {
    const e = l(n, r);
    return !e || e.type === "element" && e.tagName === "tr"
}

function C(t, r, n) {
    const e = l(n, r);
    return !e || e.type === "element" && (e.tagName === "td" || e.tagName === "th")
}
const Me = q({
    body: Fe,
    colgroup: $e,
    head: We,
    html: Ue,
    tbody: ze
});

function Ue(t) {
    const r = l(t, -1);
    return !r || r.type !== "comment"
}

function We(t) {
    const r = new Set;
    for (const e of t.children)
        if (e.type === "element" && (e.tagName === "base" || e.tagName === "title")) {
            if (r.has(e.tagName)) return !1;
            r.add(e.tagName)
        }
    const n = t.children[0];
    return !n || n.type === "element"
}

function Fe(t) {
    const r = l(t, -1, !0);
    return !r || r.type !== "comment" && !(r.type === "text" && p(r.value.charAt(0))) && !(r.type === "element" && (r.tagName === "meta" || r.tagName === "link" || r.tagName === "script" || r.tagName === "style" || r.tagName === "template"))
}

function $e(t, r, n) {
    const e = I(n, r),
        a = l(t, -1, !0);
    return n && e && e.type === "element" && e.tagName === "colgroup" && w(e, n.children.indexOf(e), n) ? !1 : !!(a && a.type === "element" && a.tagName === "col")
}

function ze(t, r, n) {
    const e = I(n, r),
        a = l(t, -1);
    return n && e && e.type === "element" && (e.tagName === "thead" || e.tagName === "tbody") && w(e, n.children.indexOf(e), n) ? !1 : !!(a && a.type === "element" && a.tagName === "tr")
}
const f = {
    name: [
        [`	
\f\r &/=>`.split(""), `	
\f\r "&'/=>\``.split("")],
        [`\0	
\f\r "&'/<=>`.split(""), `\0	
\f\r "&'/<=>\``.split("")]
    ],
    unquoted: [
        [`	
\f\r &>`.split(""), `\0	
\f\r "&'<=>\``.split("")],
        [`\0	
\f\r "&'<=>\``.split(""), `\0	
\f\r "&'<=>\``.split("")]
    ],
    single: [
        ["&'".split(""), "\"&'`".split("")],
        ["\0&'".split(""), "\0\"&'`".split("")]
    ],
    double: [
        ['"&'.split(""), "\"&'`".split("")],
        ['\0"&'.split(""), "\0\"&'`".split("")]
    ]
};

function Ge(t, r, n, e) {
    const a = e.schema,
        i = a.space === "svg" ? !1 : e.settings.omitOptionalTags;
    let o = a.space === "svg" ? e.settings.closeEmptyElements : e.settings.voids.includes(t.tagName.toLowerCase());
    const s = [];
    let c;
    a.space === "html" && t.tagName === "svg" && (e.schema = D);
    const u = Ke(e, t.properties),
        x = e.all(a.space === "html" && t.tagName === "template" ? t.content : t);
    return e.schema = a, x && (o = !1), (u || !i || !Me(t, r, n)) && (s.push("<", t.tagName, u ? " " + u : ""), o && (a.space === "svg" || e.settings.closeSelfClosing) && (c = u.charAt(u.length - 1), (!e.settings.tightSelfClosing || c === "/" || c && c !== '"' && c !== "'") && s.push(" "), s.push("/")), s.push(">")), s.push(x), !o && (!i || !w(t, r, n)) && s.push("</" + t.tagName + ">"), s.join("")
}

function Ke(t, r) {
    const n = [];
    let e = -1,
        a;
    if (r) {
        for (a in r)
            if (r[a] !== null && r[a] !== void 0) {
                const i = Ve(t, a, r[a]);
                i && n.push(i)
            }
    }
    for (; ++e < n.length;) {
        const i = t.settings.tightAttributes ? n[e].charAt(n[e].length - 1) : void 0;
        e !== n.length - 1 && i !== '"' && i !== "'" && (n[e] += " ")
    }
    return n.join("")
}

function Ve(t, r, n) {
    const e = ee(t.schema, r),
        a = t.settings.allowParseErrors && t.schema.space === "html" ? 0 : 1,
        i = t.settings.allowDangerousCharacters ? 0 : 1;
    let o = t.quote,
        s;
    if (e.overloadedBoolean && (n === e.attribute || n === "") ? n = !0 : (e.boolean || e.overloadedBoolean && typeof n != "string") && (n = !!n), n == null || n === !1 || typeof n == "number" && Number.isNaN(n)) return "";
    const c = m(e.attribute, Object.assign({}, t.settings.characterReferences, {
        subset: f.name[a][i]
    }));
    return n === !0 || (n = Array.isArray(n) ? (e.commaSeparated ? J : Y)(n, {
        padLeft: !t.settings.tightCommaSeparatedLists
    }) : String(n), t.settings.collapseEmptyAttributes && !n) ? c : (t.settings.preferUnquoted && (s = m(n, Object.assign({}, t.settings.characterReferences, {
        attribute: !0,
        subset: f.unquoted[a][i]
    }))), s !== n && (t.settings.quoteSmart && S(n, o) > S(n, t.alternative) && (o = t.alternative), s = o + m(n, Object.assign({}, t.settings.characterReferences, {
        subset: (o === "'" ? f.single : f.double)[a][i],
        attribute: !0
    })) + o), c + (s && "=" + s))
}
const Je = ["<", "&"];

function j(t, r, n, e) {
    return n && n.type === "element" && (n.tagName === "script" || n.tagName === "style") ? t.value : m(t.value, Object.assign({}, e.settings.characterReferences, {
        subset: Je
    }))
}

function Ye(t, r, n, e) {
    return e.settings.allowDangerousHtml ? t.value : j(t, r, n, e)
}

function Qe(t, r, n, e) {
    return e.all(t)
}
const Xe = re("type", {
    invalid: Ze,
    unknown: et,
    handlers: {
        comment: Se,
        doctype: Ee,
        element: Ge,
        raw: Ye,
        root: Qe,
        text: j
    }
});

function Ze(t) {
    throw new Error("Expected node, not `" + t + "`")
}

function et(t) {
    const r = t;
    throw new Error("Cannot compile unknown node `" + r.type + "`")
}
const tt = {},
    nt = {},
    rt = [];

function at(t, r) {
    const n = r || tt,
        e = n.quote || '"',
        a = e === '"' ? "'" : '"';
    if (e !== '"' && e !== "'") throw new Error("Invalid quote `" + e + "`, expected `'` or `\"`");
    return {
        one: st,
        all: it,
        settings: {
            omitOptionalTags: n.omitOptionalTags || !1,
            allowParseErrors: n.allowParseErrors || !1,
            allowDangerousCharacters: n.allowDangerousCharacters || !1,
            quoteSmart: n.quoteSmart || !1,
            preferUnquoted: n.preferUnquoted || !1,
            tightAttributes: n.tightAttributes || !1,
            upperDoctype: n.upperDoctype || !1,
            tightDoctype: n.tightDoctype || !1,
            bogusComments: n.bogusComments || !1,
            tightCommaSeparatedLists: n.tightCommaSeparatedLists || !1,
            tightSelfClosing: n.tightSelfClosing || !1,
            collapseEmptyAttributes: n.collapseEmptyAttributes || !1,
            allowDangerousHtml: n.allowDangerousHtml || !1,
            voids: n.voids || ae,
            characterReferences: n.characterReferences || nt,
            closeSelfClosing: n.closeSelfClosing || !1,
            closeEmptyElements: n.closeEmptyElements || !1
        },
        schema: n.space === "svg" ? D : te,
        quote: e,
        alternative: a
    }.one(Array.isArray(t) ? {
        type: "root",
        children: t
    } : t, void 0, void 0)
}

function st(t, r, n) {
    return Xe(t, r, n, this)
}

function it(t) {
    const r = [],
        n = t && t.children || rt;
    let e = -1;
    for (; ++e < n.length;) r[e] = this.one(n[e], e, t);
    return r.join("")
}

function ot(t) {
    const r = this,
        n = { ...r.data("settings"),
            ...t
        };
    r.compiler = e;

    function e(a) {
        return at(a, n)
    }
}

function ct(t, r) {
    const n = U(t, r);
    return Z(M(n, r))
}

function M(t, r, n = {}) {
    const {
        markdown: e,
        shouldStripSeparators: a
    } = A(t), i = n.enableHighlight ? R : d, o = N().use(b).use(i).use([
        [v, r ? ? []]
    ]);
    n.preferBareUrlSelfLinks && o.use(mt), o.use(se, {
        rule: "-",
        tightDefinitions: !0,
        handlers: {
            text: c => (c.value = c.value.replaceAll("\\[", "["), c.value),
            break: () => `
`,
            link: ft
        }
    });
    const s = o.processSync(e).toString();
    return a ? G(s) : s
}

function lt(t, r, n = {}) {
    const {
        markdown: e,
        shouldStripSeparators: a
    } = A(t), i = n.enableHighlight ? R : d, o = N().use(b).use(i).use([
        [v, r ? ? []]
    ]).use(ne).use($).use(ot).use(_e);
    return a && o.use(z), o.processSync(e).toString()
}

function ut(t) {
    try {
        const r = new URL(t);
        return r.protocol === "http:" || r.protocol === "https:"
    } catch {
        return !1
    }
}

function mt() {
    return t => {
        O(t, "link", (r, n, e) => {
            if (n == null || e == null || r.title != null || r.children.length !== 1) return;
            const a = r.children[0];
            if (!(a ? .type !== "text" || a.value !== r.url) && ut(r.url)) return e.children.splice(n, 1, {
                type: "text",
                value: r.url
            }), [h, n]
        })
    }
}
const ft = (t, r, n, e) => {
    const a = n.createTracker(e),
        i = n.enter("link"),
        o = n.enter("label");
    let s = a.move("[");
    return s += a.move(n.containerPhrasing(t, {
        before: s,
        after: "](",
        ...a.current()
    })), s += a.move("]("), o(), s += a.move(t.url.replace(/[\x00-\x1F\x7F-\x9F()"]/g, pt)), t.title && (s += a.move(" " + JSON.stringify(t.title))), s += a.move(")"), i(), s
};

function pt(t) {
    return "%" + t.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")
}
const gt = N().use(b).use(d).freeze();

function v(t) {
    return r => {
        const n = {},
            e = (a, i) => {
                switch (i.type) {
                    case "grouped_webpages":
                        {
                            const o = [];
                            for (const s of i.items)
                                if (s.url && s.title) {
                                    let c = n[s.url];
                                    c || (c = n[s.url] = {
                                        type: "definition",
                                        identifier: String(Object.keys(n).length + 1),
                                        url: s.url,
                                        title: s.title
                                    }), o.push({
                                        type: "linkReference",
                                        referenceType: "shortcut",
                                        identifier: c.identifier,
                                        children: [{
                                            type: "text",
                                            value: s.attribution ? ? X(s.url)
                                        }]
                                    })
                                }
                            return o.length === 0 ? [] : [{
                                type: "text",
                                value: "("
                            }, ...o.flatMap((s, c, u) => c < u.length - 1 ? [s, {
                                type: "text",
                                value: ", "
                            }] : [s]), {
                                type: "text",
                                value: ")"
                            }]
                        }
                    case "url":
                        {
                            const o = i.item;
                            return o.url ? [{
                                type: "link",
                                url: o.url,
                                title: null,
                                children: [{
                                    type: "text",
                                    value: i.title
                                }]
                            }] : []
                        }
                    case "title_citation":
                    case "location_search":
                    case "time":
                    case "image_v2":
                    case "nav_list":
                    case "file_navlist":
                    case "file":
                    case "grouped_webpages_model_predicted_fallback":
                    case "map":
                    case "tldr":
                    case "navigation":
                    case "stock":
                    case "calculator":
                    case "python":
                    case "container":
                    case "code_execution":
                    case "forecast":
                    case "businesses_map":
                    case "entity_metadata":
                    case "video":
                    case "entity":
                    case "conversation_context_citation":
                    case "sources_footnote":
                    case "sports_standings":
                    case "sports_schedule":
                    case "attribution":
                    case "webpage_extended":
                    case "checkout_confirmation":
                    case "image_inline":
                    case "image_group":
                    case "product_entity":
                    case "products":
                    case "explore_more":
                    case "product":
                    case "product_show_more_header":
                    case "alt_text":
                    case "product_reviews":
                    case "product_rationale":
                    case "dil":
                    case "client_defined_widget":
                    case "link_title":
                    case "strix":
                    case "followup_a":
                    case "followup_memory_a":
                        if (i.alt) {
                            const o = gt.parse(i.alt);
                            if (a.type !== "textDirective") return o.children;
                            const s = o.children[0];
                            if (s.type === "paragraph") return s.children
                        }
                        return [];
                    case "hidden":
                    case "status":
                    case "optimistic_image_citation":
                    case "webpage":
                    case "optimistic_image_inline":
                    case "invalid":
                    case "attribution_footer":
                    case "sports":
                    case "grouped_webpages_v2":
                        return []
                }
            };
        O(r, Q, (a, i, o) => {
            if (o == null || i == null) return;
            if (a.type === "containerDirective" && a.name === W) {
                const u = Array.isArray(a.children) ? a.children : [];
                return o.children.splice(i, 1, ...u), [h, i]
            }
            const s = ht(a, t),
                c = s ? e(a, s) ? ? [a] : [];
            return o.children.splice(i, 1, ...c), [h, i + c.length]
        }), r.children.push(...Object.values(n))
    }
}

function ht(t, r) {
    if (t.name === F) {
        const n = t.attributes ? .index;
        if (n) return r[parseInt(n, 10)]
    }
}
const Ct = Object.freeze(Object.defineProperty({
    __proto__: null,
    markdownWithContentReferenceDirectivesToHTML: lt,
    markdownWithContentReferenceDirectivesToMarkdown: M,
    messageTextToPlaintext: ct,
    replaceContentReferenceDirectivesWithMarkdown: v
}, Symbol.toStringTag, {
    value: "Module"
}));
export {
    lt as a, v as b, Ct as c, M as m, ot as r
};
//# sourceMappingURL=1a5e078c-os7yi9hgehd2ixnd.js.map