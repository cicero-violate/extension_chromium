const r = /[ \t\n\f\r]/g;

function c(e) {
    return typeof e == "object" ? e.type === "text" ? t(e.value) : !1 : t(e)
}

function t(e) {
    return e.replace(r, "") === ""
}
export {
    c as w
};
//# sourceMappingURL=1bc04b52-hnu6g21afx0au4ng.js.map