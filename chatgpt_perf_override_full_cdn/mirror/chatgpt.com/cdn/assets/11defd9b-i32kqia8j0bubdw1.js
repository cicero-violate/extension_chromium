import {
    ed as h,
    fV as m,
    bi as g
} from "./4813494d-javwxs2rmzsrunl2.js";
import p from "./a8e729b2-g28kd33mnyafvoxt.js";
import {
    h as v
} from "./2340486e-dvd8m80i7d6hyild.js";
const s = v({
    networkError: {
        defaultMessage: "We couldn't upload or create the skill because your network connection was interrupted. Check your connection and try again.",
        id: "hazelnutsSettings.networkError"
    },
    permissionDenied: {
        defaultMessage: "You don't have permission to upload or create skills in this workspace.",
        id: "hazelnutsSettings.permissionDenied"
    },
    invalidZip: {
        defaultMessage: "That file isn't a valid .zip skill archive. Re-export the skill and try again.",
        id: "hazelnutsSettings.invalidZip"
    },
    archiveTooLarge: {
        defaultMessage: "This .zip file is too large to upload. Remove large files or split the skill into smaller archives.",
        id: "hazelnutsSettings.archiveTooLarge"
    },
    archiveUnsafeCompression: {
        defaultMessage: "That .zip file can't be opened because it appears to be over-compressed. Re-export the skill archive and try again.",
        id: "hazelnutsSettings.archiveUnsafeCompression"
    },
    archiveEmpty: {
        defaultMessage: "We couldn't find any skills in that .zip file. Make sure it contains a SKILL.md file and try again.",
        id: "hazelnutsSettings.archiveEmpty"
    },
    duplicateName: {
        defaultMessage: "A skill with this name already exists in your workspace. Rename the skill and try again.",
        id: "hazelnutsSettings.duplicateName"
    },
    duplicateNameWithSkill: {
        defaultMessage: 'The skill "{skillName}" already exists in your workspace. Rename that skill and try again.',
        id: "hazelnutsSettings.duplicateNameWithSkill"
    },
    invalidSkillName: {
        defaultMessage: "Skill name should follow the format your-skill-name",
        id: "hazelnutsSettings.invalidSkillName"
    },
    sharedSaveError: {
        defaultMessage: "Can’t save Skill after it has been shared.",
        id: "hazelnutsSettings.sharedSaveError"
    },
    invalidEncoding: {
        defaultMessage: "SKILL.md must be saved as UTF-8. Re-save the file and try again.",
        id: "hazelnutsSettings.invalidEncoding"
    },
    timeout: {
        defaultMessage: "Skill creation is taking longer than expected. Please try again.",
        id: "hazelnutsSettings.timeout"
    }
});

function c(t, e) {
    if (typeof t != "object" || t == null) return;
    const a = Reflect.get(t, e);
    return typeof a == "string" && a.trim() ? a.trim() : void 0
}

function k(t, e) {
    if (typeof t != "object" || t == null) return [];
    const a = Reflect.get(t, e);
    return Array.isArray(a) ? a.filter(r => typeof r == "string" && r.trim() !== "") : []
}

function y(t) {
    const e = t.detail,
        a = ["skill_name", "hazelnut_name", "name", "duplicate_name"];
    for (const o of a) {
        const n = c(e, o);
        if (n) return n
    }
    const r = ["duplicate_names", "skill_names", "hazelnut_names"];
    for (const o of r) {
        const n = k(e, o);
        if (n.length > 0) return n[0]
    }
    const u = (() => {
        if (!(typeof e != "object" || e == null)) return Reflect.get(e, "error")
    })();
    if (u && typeof u == "object")
        for (const o of a) {
            const n = c(u, o);
            if (n) return n
        }
    const l = t.message ? ? "";
    if (!l) return;
    const d = l.match(/(?:skill|name)\s*["'`]?([^"'`]+)["'`]?\s+already exists/i);
    if (d ? .[1] ? .trim()) return d[1].trim();
    const i = l.match(/["'`]([^"'`]+)["'`]/);
    if (i ? .[1] ? .trim()) return i[1].trim()
}

function M(t) {
    if (!(t instanceof g) || t.code !== "hazelnut_duplicate_name") return null;
    const e = y(t);
    if (!e) return null;
    const a = c(t.detail, "resolution");
    return a === "UPDATE_EXISTING" || a === "FORCE_CREATE" ? {
        skillName: e,
        resolution: a
    } : typeof t.detail == "object" && t.detail != null && Reflect.get(t.detail, "updateable") === !0 ? {
        skillName: e,
        resolution: "UPDATE_EXISTING"
    } : {
        skillName: e,
        resolution: null
    }
}

function N({
    error: t,
    intl: e,
    fallbackMessage: a
}) {
    const r = t instanceof g ? t : void 0,
        l = (p.isAxiosError(t) ? t.response ? .status : void 0) ? ? r ? .status,
        i = (t instanceof Error ? t.message : "").toLowerCase();
    if (h(t)) return e.formatMessage(s.networkError);
    if (l === 401 || l === 403) return e.formatMessage(s.permissionDenied);
    if (l === 408 || l === 504 || i.includes("timeout")) return e.formatMessage(s.timeout);
    if (l === 413) return e.formatMessage(s.archiveTooLarge);
    if (r ? .code === "hazelnut_duplicate_name") {
        const n = M(r);
        if (n ? .resolution === null) {
            const f = m(t);
            if (f) return f
        }
        return n ? .skillName ? e.formatMessage(s.duplicateNameWithSkill, {
            skillName: n.skillName
        }) : e.formatMessage(s.duplicateName)
    }
    if (i.includes("can't save hazelnut after it has been shared")) return e.formatMessage(s.sharedSaveError);
    if (i.includes("skill.md front matter 'name' must") || i.includes("skill name should follow the format")) return e.formatMessage(s.invalidSkillName);
    if (i.includes("not a valid zip")) return e.formatMessage(s.invalidZip);
    if (i.includes("no skills parsed from archive")) return e.formatMessage(s.archiveEmpty);
    if (i.includes("too large to extract safely")) return e.formatMessage(s.archiveTooLarge);
    if (i.includes("over-compressed")) return e.formatMessage(s.archiveUnsafeCompression);
    if (i.includes("skill.md must be utf-8 encoded")) return e.formatMessage(s.invalidEncoding);
    if (i.includes("files must include at least one entry")) return e.formatMessage(s.archiveEmpty);
    const o = m(t);
    return o || e.formatMessage(a)
}
export {
    M as e, N as g
};
//# sourceMappingURL=11defd9b-i32kqia8j0bubdw1.js.map