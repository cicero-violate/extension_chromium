function d({
    mediaWidth: c,
    mediaHeight: i,
    containerWidth: e,
    containerHeight: o,
    horizontalPadding: f = 0,
    verticalPadding: h = 0
}) {
    const t = Math.max(0, e - 2 * f),
        a = Math.max(0, o - 2 * h);
    if (c <= 0 || i <= 0 || t <= 0 || a <= 0) return {
        top: o / 2,
        left: e / 2,
        width: 0,
        height: 0
    };
    const s = c / i,
        M = t / a,
        n = s > M,
        l = n ? t : a * s,
        p = n ? t / s : a;
    return {
        top: (o - p) / 2,
        left: (e - l) / 2,
        width: l,
        height: p
    }
}
export {
    d as g
};
//# sourceMappingURL=b9e74381-im85lkncbx47l1ca.js.map