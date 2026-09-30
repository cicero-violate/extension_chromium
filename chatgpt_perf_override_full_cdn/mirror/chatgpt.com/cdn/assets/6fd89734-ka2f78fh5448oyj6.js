import {
    zd as F,
    R as x,
    bh as L,
    bj as U,
    D as _
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    gQ as M,
    gR as D,
    kU as z
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import k from "./a8e729b2-g28kd33mnyafvoxt.js";
import {
    h as v
} from "./2340486e-dvd8m80i7d6hyild.js";

function T(t) {
    const a = t.replace(/\\/g, "/").split("/").filter(Boolean);
    return a.length === 0 ? t.trim() || "file" : a[a.length - 1]
}

function E(t) {
    const a = t.replace(/\\/g, "/").split("/").filter(Boolean);
    return a.length === 0 ? "file" : a[a.length - 1]
}

function g(t) {
    return t.trim().replace(/\\/g, "/").replace(/^\/+/, "")
}

function S(t) {
    if (!t) return null;
    for (const a of Object.entries(t)) {
        const [e, o] = a;
        if (e.trim().toLowerCase().endsWith("skill.md")) return a
    }
    return null
}

function I(t) {
    const a = t.replace(/^\ufeff/, ""),
        e = a.split(/\r?\n/);
    let o = 0;
    for (; o < e.length && !e[o].trim();) o += 1;
    if (o < e.length && e[o].trim() === "---") {
        let n = o + 1;
        for (; n < e.length && e[n].trim() !== "---";) n += 1;
        if (n < e.length) return e.slice(n + 1).join(`
`).trim()
    }
    return a.trim()
}

function R() {
    return typeof crypto < "u" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`
}
async function W(t, a) {
    const e = S(t.files);
    if (!e) return;
    const [, o] = e;
    if (!o || typeof o.start != "number" || typeof o.length != "number" || o.length <= 0) return;
    let n;
    if (t.sediment_id) {
        const l = await M(t.id, t.sediment_id);
        if (a ? .aborted) return;
        if (!l.download_url) throw new Error("Unable to fetch SKILL.md download URL");
        const c = Math.max(0, o.start),
            r = c + o.length - 1,
            s = {};
        o.length > 0 && (s.Range = `bytes=${c}-${r}`);
        const u = await fetch(l.download_url, {
            headers: s,
            signal: a
        });
        if (a ? .aborted || (n = await u.arrayBuffer(), a ? .aborted)) return;
        u.status !== 206 && o.length > 0 && n.byteLength >= r + 1 && (n = n.slice(c, r + 1))
    } else if (n = await D(t.id, e[0]), a ? .aborted) return;
    const d = new TextDecoder("utf-8").decode(n);
    return I(d)
}
async function B({
    file: t,
    filename: a,
    contentType: e
}) {
    const n = (await z([{
        filename: a,
        content_type: e
    }])).uploads ? .[0];
    if (!n) throw new Error("Failed to initialize upload");
    return await k.put(n.upload_url, t, {
        headers: F(n.upload_url, e)
    }), await x.safePost("/hazelnuts/uploads/finish", {
        requestBody: {
            file_id: n.file_id
        }
    }), n.file_id
}
const q = async (t, a, e, o, n) => {
    const d = new Set(n.map(r => g(r.path || r.filename).toLowerCase())),
        i = t.map(r => r.webkitRelativePath && r.webkitRelativePath.length > 0 ? r.webkitRelativePath : void 0),
        l = i.every(r => typeof r == "string" && r.length > 0);
    let c = null;
    l && i[0] && (c = i[0].replace(/\\/g, "/").split("/")[0] || null);
    for (let r = 0; r < t.length; r++) {
        const s = t[r];
        let u;
        const y = i[r];
        if (l && y) {
            const f = y.replace(/\\/g, "/"),
                p = c ? f.split("/").slice(1).join("/") : f;
            u = g(p)
        } else u = E(s.name);
        const P = g(u).toLowerCase();
        if (d.has(P)) {
            o.danger(e.formatMessage(b.uploadDuplicateName, {
                name: u
            }));
            continue
        }
        d.add(P);
        const w = R();
        a(f => [...f, {
            clientId: w,
            filename: s.name,
            size: s.size,
            contentType: s.type || "application/octet-stream",
            path: u,
            status: "uploading"
        }]);
        try {
            const f = await B({
                file: s,
                filename: s.name,
                contentType: s.type || "application/octet-stream"
            });
            a(p => p.map(h => h.clientId === w ? { ...h,
                fileId: f,
                status: "uploaded"
            } : h))
        } catch (f) {
            _.addError(f), a(p => p.map(h => h.clientId === w ? { ...h,
                status: "error",
                error: e.formatMessage(b.uploadFailed)
            } : h)), o.danger(e.formatMessage(b.uploadFailed))
        }
    }
};

function K(t, a, e) {
    const o = a.trim();
    if (!o) return t.formatMessage(m.validationPathEmpty);
    const n = o.replace(/\\/g, "/");
    if (n.startsWith("/")) return t.formatMessage(m.validationPathAbsolute);
    const d = n.split("/");
    return d.some(i => i === "" || i === ".") || d.some(i => i === "..") ? t.formatMessage(m.validationPathDot) : n.trim().toLowerCase() === "skill.md" ? t.formatMessage(m.validationPathSkillMd) : e > 1 ? t.formatMessage(m.validationPathDuplicate) : null
}
async function N(t, a, e, o) {
    let n;
    if (a) {
        const d = await M(t, a);
        if (!d.download_url) throw new Error("Unable to fetch download URL");
        const i = {};
        let l = 0,
            c = 0;
        e && typeof e.start == "number" && typeof e.length == "number" && e.length > 0 && (l = Math.max(0, e.start), c = l + e.length - 1, i.Range = `bytes=${l}-${c}`);
        const r = await fetch(d.download_url, {
            headers: i
        });
        if (!r.ok) throw new Error("Unable to download file content");
        if (n = await r.arrayBuffer(), e && e.length > 0 && r.status !== 206) {
            const s = l + e.length;
            n.byteLength >= s && (n = n.slice(l, s))
        }
    } else n = await D(t, o);
    return new TextDecoder("utf-8").decode(n)
}
async function Q(t) {
    if (!t) throw new Error("Missing file id");
    const a = await L(t);
    if (a.status !== U.Success || !a.download_url) throw new Error("Unable to fetch download URL");
    const e = {},
        o = await fetch(a.download_url, {
            headers: e
        });
    if (!o.ok) throw new Error("Unable to download file content");
    const n = await o.arrayBuffer();
    return new TextDecoder("utf-8").decode(n)
}
const b = v({
        uploadFailed: {
            id: "363wGD",
            defaultMessage: "Failed to upload file."
        },
        uploadDuplicateName: {
            id: "TqOtV2",
            defaultMessage: "File name already exists: {name}."
        }
    }),
    m = v({
        validationPathEmpty: {
            id: "Z7PcWS",
            defaultMessage: "Path cannot be empty."
        },
        validationPathAbsolute: {
            id: "X9fb9/",
            defaultMessage: "Path cannot start with a '/'."
        },
        validationPathDot: {
            id: "LhWbnQ",
            defaultMessage: "Path cannot contain '.' or '..' segments."
        },
        validationPathSkillMd: {
            id: "eQhwwM",
            defaultMessage: "Path cannot be 'SKILL.md'."
        },
        validationPathDuplicate: {
            id: "v/Kr1j",
            defaultMessage: "Path is duplicated."
        }
    });
export {
    N as a, I as b, Q as c, W as d, T as e, S as f, R as g, q as h, g as n, E as s, B as u, K as v
};
//# sourceMappingURL=6fd89734-ka2f78fh5448oyj6.js.map