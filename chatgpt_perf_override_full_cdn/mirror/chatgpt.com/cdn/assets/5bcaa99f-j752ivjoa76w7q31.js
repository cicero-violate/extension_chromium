import {
    bW as u
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function p(n) {
    const t = n.page_range_start,
        e = n.page_range_end;
    if (typeof t != "number" && typeof e != "number") return null;
    const r = typeof t == "number" ? t : e,
        i = typeof e == "number" ? e : t;
    if (typeof r != "number" || typeof i != "number") return null;
    const o = Math.min(r, i);
    if (!Number.isFinite(o)) return null;
    const a = Math.floor(o);
    return a > 0 ? a : null
}

function f({
    lineRangeStart: n,
    lineRangeEnd: t
}) {
    if (typeof n != "number" && typeof t != "number") return null;
    const e = typeof n == "number" ? n : t,
        r = typeof t == "number" ? t : n;
    if (typeof e != "number" || typeof r != "number") return null;
    const i = Math.floor(Math.min(e, r)),
        o = Math.floor(Math.max(e, r));
    return !Number.isFinite(i) || !Number.isFinite(o) ? null : {
        lineRangeStart: i,
        lineRangeEnd: o
    }
}

function s(n) {
    const t = n.input_pointer,
        r = typeof t ? .line_range_start != "number" && typeof t ? .line_range_end != "number" ? n.fff_metadata ? .input_pointer : t;
    return f({
        lineRangeStart: r ? .line_range_start,
        lineRangeEnd: r ? .line_range_end
    })
}

function l(n) {
    if (typeof n.snippet == "string" && n.snippet.trim().length > 0) return n.snippet;
    if (typeof n.text == "string" && n.text.trim().length > 0) return n.text
}

function g(n) {
    const t = s(n);
    return {
        targetPage: p(n) ? ? void 0,
        highlightSnippet: l(n),
        lineRangeStart: t ? .lineRangeStart,
        lineRangeEnd: t ? .lineRangeEnd
    }
}

function m(n) {
    const t = u({
        fileName: n.name
    });
    return t === "pdf" || t === "text" || t === "code"
}
export {
    m as c, g, f as n
};
//# sourceMappingURL=5bcaa99f-j752ivjoa76w7q31.js.map