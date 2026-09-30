function l(e) {
    if (!e) return null;
    let t = e.match(/filename\*\s*=\s*([^;]+)/i);
    if (t && t[1]) {
        const r = t[1].trim(),
            n = r.split("''");
        if (n.length === 2) try {
            return decodeURIComponent(n[1])
        } catch {
            return n[1]
        }
        return r
    }
    return t = e.match(/filename="?([^"]+)"?/), t && t[1] ? t[1] : null
}
export {
    l as g
};
//# sourceMappingURL=378f37b1-mia7qmdupqoji40k.js.map