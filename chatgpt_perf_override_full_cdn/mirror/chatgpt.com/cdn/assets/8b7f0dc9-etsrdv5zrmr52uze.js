function n(t) {
    if (typeof t != "string") return null;
    const r = t.trim();
    return r.length > 0 ? r : null
}

function i(t) {
    return t.startsWith("PHN2Zy") || t.startsWith("PD94bWw") ? "image/svg+xml" : t.startsWith("iVBORw0KGgo") ? "image/png" : t.startsWith("/9j/") ? "image/jpeg" : t.startsWith("R0lGOD") ? "image/gif" : t.startsWith("UklGR") ? "image/webp" : "image/png"
}

function e(t) {
    return n(t ? .short_description) ? ? n(t ? .description)
}

function o(t) {
    const r = n(t ? .icon_small);
    return r == null ? null : r.startsWith("data:") ? r : `data:${i(r)};base64,${r}`
}

function s(t) {
    const r = n(t ? .brand_color);
    if (!(r == null || !/^#[0-9a-fA-F]{6}$/.test(r))) return {
        backgroundColor: r
    }
}
export {
    s as a, e as b, o as g
};
//# sourceMappingURL=8b7f0dc9-etsrdv5zrmr52uze.js.map