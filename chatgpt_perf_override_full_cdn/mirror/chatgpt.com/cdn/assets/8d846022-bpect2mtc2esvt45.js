var a = (r => (r.LOG = "log", r.RUN_START = "run_start", r.ENVIRONMENT_STATUS = "environment_status", r.OUTPUT = "output", r.ERROR = "error", r.RUN_COMPLETE = "run_complete", r))(a || {});
const I = ["python", "javascript", "typescript", "html", "react", "recharts", "threejs"];

function f(r) {
    return I.includes(r)
}
var _ = (r => (r[r.INITIALIZING = 0] = "INITIALIZING", r[r.INSTALLING_PACKAGES = 1] = "INSTALLING_PACKAGES", r[r.RUNNING_CODE = 2] = "RUNNING_CODE", r))(_ || {});
const E = r => {
    if (typeof r != "object" || r === null) return null;
    const t = r;
    if (!Array.isArray(t.content)) return null;
    const n = o => {
            if (Array.isArray(o)) return o.map(e => n(e));
            if (typeof o == "object" && o !== null) {
                const e = {};
                for (const [A, N] of Object.entries(o)) N !== null && (e[A] = n(N));
                return e
            }
            return o
        },
        i = n(t.content),
        l = t.structuredContent == null ? void 0 : n(t.structuredContent),
        u = typeof t.isError == "boolean" ? t.isError : void 0,
        c = t._meta == null ? void 0 : n(t._meta),
        s = c != null && typeof c == "object" && !Array.isArray(c) ? c : void 0;
    return {
        content: i,
        ...l !== void 0 ? {
            structuredContent: l
        } : {},
        ...u !== void 0 ? {
            isError: u
        } : {},
        ...s !== void 0 ? {
            _meta: s
        } : {}
    }
};
export {
    _ as E, a as M, f as i, E as n
};
//# sourceMappingURL=8d846022-bpect2mtc2esvt45.js.map