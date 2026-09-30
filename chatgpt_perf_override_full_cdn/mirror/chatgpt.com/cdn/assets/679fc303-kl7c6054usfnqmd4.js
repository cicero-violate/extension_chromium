function t(d, c) {
    const o = URL.createObjectURL(d),
        e = document.createElement("a");
    e.href = o, e.download = c, document.body.appendChild(e), e.click(), document.body.removeChild(e), URL.revokeObjectURL(o)
}
export {
    t as d
};
//# sourceMappingURL=679fc303-kl7c6054usfnqmd4.js.map