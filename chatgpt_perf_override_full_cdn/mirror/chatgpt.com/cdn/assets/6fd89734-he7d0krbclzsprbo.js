const s = ["pptx", "xlsx"],
    r = [...s, "csv", "txt", "md", "markdown"],
    o = n => {
        const e = n.split(".").pop();
        return e ? e.toLowerCase() : null
    },
    i = n => {
        const e = s,
            t = o(n);
        return !t || !e.includes(t) ? null : t
    },
    u = n => {
        const e = r,
            t = o(n);
        return !t || !e.includes(t) ? null : t
    },
    l = n => !!i(n);
export {
    i as a, u as g, l as i
};
//# sourceMappingURL=6fd89734-he7d0krbclzsprbo.js.map