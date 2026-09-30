import {
    q as r
} from "./4813494d-javwxs2rmzsrunl2.js";
const a = "152371702";

function e(n) {
    return n ? r(a) : !0
}

function s({
    hasAdminPrivileges: n,
    isFedrampCompliantWorkspace: t
}) {
    return !!n && e(t)
}

function u({
    isFedrampCompliantWorkspace: n,
    noConnectorsAvailable: t,
    isDirectoryEnabled: o
}) {
    return !e(n) && n || t && !o
}
export {
    u as a, e as i, s
};
//# sourceMappingURL=8f71ba8b-ir8722agkyx3m2ag.js.map