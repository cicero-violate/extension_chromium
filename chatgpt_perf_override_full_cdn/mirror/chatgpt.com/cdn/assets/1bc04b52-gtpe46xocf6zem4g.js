import {
    xP as d
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
const h = /["&'<>`]/g,
    f = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
    p = /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,
    x = /[|\\{}()[\]^$+*?.]/g,
    l = new WeakMap;

function m(r, e) {
    if (r = r.replace(e.subset ? A(e.subset) : h, t), e.subset || e.escapeOnly) return r;
    return r.replace(f, a).replace(p, t);

    function a(c, i, n) {
        return e.format((c.charCodeAt(0) - 55296) * 1024 + c.charCodeAt(1) - 56320 + 65536, n.charCodeAt(i + 2), e)
    }

    function t(c, i, n) {
        return e.format(c.charCodeAt(0), n.charCodeAt(i + 1), e)
    }
}

function A(r) {
    let e = l.get(r);
    return e || (e = C(r), l.set(r, e)), e
}

function C(r) {
    const e = [];
    let a = -1;
    for (; ++a < r.length;) e.push(r[a].replace(x, "\\$&"));
    return new RegExp("(?:" + e.join("|") + ")", "g")
}
const b = /[\dA-Fa-f]/;

function E(r, e, a) {
    const t = "&#x" + r.toString(16).toUpperCase();
    return a && e && !b.test(String.fromCharCode(e)) ? t : t + ";"
}
const S = /\d/;

function O(r, e, a) {
    const t = "&#" + String(r);
    return a && e && !S.test(String.fromCharCode(e)) ? t : t + ";"
}
const o = {
        nbsp: " ",
        iexcl: "¡",
        cent: "¢",
        pound: "£",
        curren: "¤",
        yen: "¥",
        brvbar: "¦",
        sect: "§",
        uml: "¨",
        copy: "©",
        ordf: "ª",
        laquo: "«",
        not: "¬",
        shy: "­",
        reg: "®",
        macr: "¯",
        deg: "°",
        plusmn: "±",
        sup2: "²",
        sup3: "³",
        acute: "´",
        micro: "µ",
        para: "¶",
        middot: "·",
        cedil: "¸",
        sup1: "¹",
        ordm: "º",
        raquo: "»",
        frac14: "¼",
        frac12: "½",
        frac34: "¾",
        iquest: "¿",
        Agrave: "À",
        Aacute: "Á",
        Acirc: "Â",
        Atilde: "Ã",
        Auml: "Ä",
        Aring: "Å",
        AElig: "Æ",
        Ccedil: "Ç",
        Egrave: "È",
        Eacute: "É",
        Ecirc: "Ê",
        Euml: "Ë",
        Igrave: "Ì",
        Iacute: "Í",
        Icirc: "Î",
        Iuml: "Ï",
        ETH: "Ð",
        Ntilde: "Ñ",
        Ograve: "Ò",
        Oacute: "Ó",
        Ocirc: "Ô",
        Otilde: "Õ",
        Ouml: "Ö",
        times: "×",
        Oslash: "Ø",
        Ugrave: "Ù",
        Uacute: "Ú",
        Ucirc: "Û",
        Uuml: "Ü",
        Yacute: "Ý",
        THORN: "Þ",
        szlig: "ß",
        agrave: "à",
        aacute: "á",
        acirc: "â",
        atilde: "ã",
        auml: "ä",
        aring: "å",
        aelig: "æ",
        ccedil: "ç",
        egrave: "è",
        eacute: "é",
        ecirc: "ê",
        euml: "ë",
        igrave: "ì",
        iacute: "í",
        icirc: "î",
        iuml: "ï",
        eth: "ð",
        ntilde: "ñ",
        ograve: "ò",
        oacute: "ó",
        ocirc: "ô",
        otilde: "õ",
        ouml: "ö",
        divide: "÷",
        oslash: "ø",
        ugrave: "ù",
        uacute: "ú",
        ucirc: "û",
        uuml: "ü",
        yacute: "ý",
        thorn: "þ",
        yuml: "ÿ",
        fnof: "ƒ",
        Alpha: "Α",
        Beta: "Β",
        Gamma: "Γ",
        Delta: "Δ",
        Epsilon: "Ε",
        Zeta: "Ζ",
        Eta: "Η",
        Theta: "Θ",
        Iota: "Ι",
        Kappa: "Κ",
        Lambda: "Λ",
        Mu: "Μ",
        Nu: "Ν",
        Xi: "Ξ",
        Omicron: "Ο",
        Pi: "Π",
        Rho: "Ρ",
        Sigma: "Σ",
        Tau: "Τ",
        Upsilon: "Υ",
        Phi: "Φ",
        Chi: "Χ",
        Psi: "Ψ",
        Omega: "Ω",
        alpha: "α",
        beta: "β",
        gamma: "γ",
        delta: "δ",
        epsilon: "ε",
        zeta: "ζ",
        eta: "η",
        theta: "θ",
        iota: "ι",
        kappa: "κ",
        lambda: "λ",
        mu: "μ",
        nu: "ν",
        xi: "ξ",
        omicron: "ο",
        pi: "π",
        rho: "ρ",
        sigmaf: "ς",
        sigma: "σ",
        tau: "τ",
        upsilon: "υ",
        phi: "φ",
        chi: "χ",
        psi: "ψ",
        omega: "ω",
        thetasym: "ϑ",
        upsih: "ϒ",
        piv: "ϖ",
        bull: "•",
        hellip: "…",
        prime: "′",
        Prime: "″",
        oline: "‾",
        frasl: "⁄",
        weierp: "℘",
        image: "ℑ",
        real: "ℜ",
        trade: "™",
        alefsym: "ℵ",
        larr: "←",
        uarr: "↑",
        rarr: "→",
        darr: "↓",
        harr: "↔",
        crarr: "↵",
        lArr: "⇐",
        uArr: "⇑",
        rArr: "⇒",
        dArr: "⇓",
        hArr: "⇔",
        forall: "∀",
        part: "∂",
        exist: "∃",
        empty: "∅",
        nabla: "∇",
        isin: "∈",
        notin: "∉",
        ni: "∋",
        prod: "∏",
        sum: "∑",
        minus: "−",
        lowast: "∗",
        radic: "√",
        prop: "∝",
        infin: "∞",
        ang: "∠",
        and: "∧",
        or: "∨",
        cap: "∩",
        cup: "∪",
        int: "∫",
        there4: "∴",
        sim: "∼",
        cong: "≅",
        asymp: "≈",
        ne: "≠",
        equiv: "≡",
        le: "≤",
        ge: "≥",
        sub: "⊂",
        sup: "⊃",
        nsub: "⊄",
        sube: "⊆",
        supe: "⊇",
        oplus: "⊕",
        otimes: "⊗",
        perp: "⊥",
        sdot: "⋅",
        lceil: "⌈",
        rceil: "⌉",
        lfloor: "⌊",
        rfloor: "⌋",
        lang: "〈",
        rang: "〉",
        loz: "◊",
        spades: "♠",
        clubs: "♣",
        hearts: "♥",
        diams: "♦",
        quot: '"',
        amp: "&",
        lt: "<",
        gt: ">",
        OElig: "Œ",
        oelig: "œ",
        Scaron: "Š",
        scaron: "š",
        Yuml: "Ÿ",
        circ: "ˆ",
        tilde: "˜",
        ensp: " ",
        emsp: " ",
        thinsp: " ",
        zwnj: "‌",
        zwj: "‍",
        lrm: "‎",
        rlm: "‏",
        ndash: "–",
        mdash: "—",
        lsquo: "‘",
        rsquo: "’",
        sbquo: "‚",
        ldquo: "“",
        rdquo: "”",
        bdquo: "„",
        dagger: "†",
        Dagger: "‡",
        permil: "‰",
        lsaquo: "‹",
        rsaquo: "›",
        euro: "€"
    },
    v = ["cent", "copy", "divide", "gt", "lt", "not", "para", "times"],
    g = {}.hasOwnProperty,
    u = {};
let s;
for (s in o) g.call(o, s) && (u[o[s]] = s);
const y = /[^\dA-Za-z]/;

function R(r, e, a, t) {
    const c = String.fromCharCode(r);
    if (g.call(u, c)) {
        const i = u[c],
            n = "&" + i;
        return a && d.includes(i) && !v.includes(i) && (!t || e && e !== 61 && y.test(String.fromCharCode(e))) ? n : n + ";"
    }
    return ""
}

function q(r, e, a) {
    let t = E(r, e, a.omitOptionalSemicolons),
        c;
    if ((a.useNamedReferences || a.useShortestReferences) && (c = R(r, e, a.omitOptionalSemicolons, a.attribute)), (a.useShortestReferences || !c) && a.useShortestReferences) {
        const i = O(r, e, a.omitOptionalSemicolons);
        i.length < t.length && (t = i)
    }
    return c && (!a.useShortestReferences || c.length < t.length) ? c : t
}

function F(r) {
    return "&#x" + r.toString(16).toUpperCase() + ";"
}

function D(r, e) {
    return m(r, Object.assign({
        format: q
    }, e))
}

function P(r, e) {
    return m(r, Object.assign({
        format: F
    }, e))
}
export {
    D as a, P as s
};
//# sourceMappingURL=1bc04b52-gtpe46xocf6zem4g.js.map