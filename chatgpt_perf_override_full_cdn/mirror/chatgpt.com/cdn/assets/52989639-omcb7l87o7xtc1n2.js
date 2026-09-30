import {
    xg as C,
    xh as v,
    ey as R,
    ny as c,
    nx as O,
    gO as w,
    xi as S,
    R as N,
    xj as k,
    xk as x,
    nA as f,
    nz as A,
    xl as P,
    qz as y
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    r as D
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    m as T
} from "./04aceeae-i9smgosz0rjfku3p.js";
import {
    e7 as d,
    e8 as g
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function pe({
    composerController: r,
    parsedDocumentHandler: e
}) {
    const {
        connectorConfig: s
    } = C();
    return D.useEffect(() => {
        v(R(r), {
            transformPasted: (t, n) => {
                const {
                    allDocIds: o,
                    nextSlice: a
                } = b(t, n, s);
                return requestAnimationFrame(() => {
                    e(o)
                }), a
            }
        })
    }, [r, s, e]), null
}

function b(r, e, s) {
    const t = [],
        n = e.state.schema,
        o = i => {
            if (i.isText) {
                let p = i.text ? ? "";
                const u = U(p, s);
                if (u.length === 0) return i;
                for (const m of u) t.push(m), m.isConnected && (p = p.replaceAll(m.url, ""));
                return p === "" ? null : n.text(p, i.marks)
            }
            if (i.isLeaf) return i;
            const l = [];
            return i.forEach(p => {
                const u = o(p);
                u && l.push(u)
            }), i.copy(y.fromArray(l))
        },
        a = [];
    return r.content.forEach(i => {
        const l = o(i);
        l && a.push(l)
    }), {
        allDocIds: t,
        nextSlice: new P(y.fromArray(a), r.openStart, r.openEnd)
    }
}

function U(r, e) {
    const s = [];
    for (const t of e.values()) switch (t.type) {
        case c.GDRIVE:
            {
                if (t.link_enabled ? ? !0) {
                    const n = F(r, t);
                    s.push(...n)
                }
                break
            }
        case c.O365:
            break;
        case c.O365_BUSINESS:
            {
                const n = X(r, t).filter(o => o != null);s.push(...n);
                break
            }
        case c.O365_PERSONAL:
            {
                const n = J(r, t).filter(o => o != null);s.push(...n);
                break
            }
        case c.CONFLUENCE:
            {
                const n = H(r, t).filter(o => o != null);s.push(...n);
                break
            }
        case c.JIRA:
            {
                const n = W(r, t).filter(o => o != null);s.push(...n);
                break
            }
        case c.NOTION_OPEN_CONNECTOR:
            {
                const n = oe(r, t).filter(o => o != null);s.push(...n);
                break
            }
        case c.SLACK_OPEN_CONNECTOR:
            {
                const n = V(r, t).filter(o => o != null);s.push(...n);
                break
            }
    }
    return s.length && O.linkPasted(T(w(s, t => t.type), t => t.length)), s
}
const $ = /\bhttps:\/\/docs\.google\.com\/(document|spreadsheets|presentation)\/d\/([\w-]+)\/?(?:(?:edit|view)\/?)?(?:\?[\w\-.~%=]*)?(?:#[\w\-.~%=]*)?/gm,
    L = /\bhttps:\/\/drive\.google\.com\/(file)\/d\/([\w-]+)\/?(?:(?:edit|view)\/?)?(?:\?[\w\-.~%=]*)?(?:#[\w\-.~%=]*)?/gm,
    j = "https://www.googleapis.com/auth/drive.readonly";

function F(r, e) {
    return [...r.matchAll($), ...r.matchAll(L)].map(s => {
        const t = {
            url: s[0],
            id: s[2],
            type: c.GDRIVE,
            isConnected: e.access_token != null
        };
        return e.access_token && e.scopes && e.scopes.includes(j) ? { ...t,
            handler: {
                type: "fetch",
                tryFetch: async () => {
                    g.logAttemptIfAccessTokenIsExpired(e, f.Link);
                    const o = `https://www.googleapis.com/drive/v3/files/${t.id}?fields=name,mimeType`,
                        a = await fetch(o, {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${e.access_token}`,
                                "Content-Type": "application/json"
                            }
                        });
                    if (!a.ok) return Promise.reject(new Error(`HTTP ${a.status}`));
                    const {
                        name: i,
                        mimeType: l
                    } = await a.json(), p = A(l);
                    return {
                        connector: c.GDRIVE,
                        id: t.id,
                        title: i,
                        mimeType: l,
                        url: t.url,
                        syntheticExtension: p
                    }
                }
            }
        } : { ...t,
            handler: {
                type: "prompt",
                message: "not-connected"
            }
        }
    })
}

function _(r) {
    let e;
    try {
        e = new URL(r).toString()
    } catch {
        return null
    }
    return `u!${btoa(e).replaceAll("=","").replaceAll("/","_").replaceAll("+","-")}`
}
const B = /\bhttps:\/\/onedrive\.live\.com\/[\w\-_.~!*'();:@&=+$,\\/?%#[\]]*/gm,
    M = /\bhttps:\/\/photos\.onedrive\.com\/(?:share|photo)\/[\w\-_.~!*'();:@&=+$,\\/?%#[\]]*/gm,
    G = /\bhttps:\/\/1drv\.ms\/[\w\-_.~!*'();:@&=+$,\\/?%#[\]]*/gm;

function J(r, e) {
    return [...r.matchAll(B), ...r.matchAll(G), ...r.matchAll(M)].map(s => {
        const t = _(s[0]);
        if (!t) return null;
        const n = {
            url: s[0],
            id: t,
            type: c.O365_PERSONAL,
            isConnected: e.access_token != null
        };
        return e.access_token ? { ...n,
            handler: {
                type: "fetch",
                tryFetch: E(d.OneDrive_PERSONAL_SHARES, t, e.access_token, e)
            }
        } : { ...n,
            handler: {
                type: "prompt",
                message: "not-connected"
            }
        }
    })
}
const z = /\bhttps:\/\/([^\s]+?\.atlassian\.net)\/wiki\/spaces\/[^\s]+\/pages\/(\d+)\/([^\s]+)?/gm;

function H(r, e) {
    return [...r.matchAll(z)].map(s => {
        const t = s[1],
            n = s[2],
            o = s[3];
        if (!n) return null;
        const a = {
            url: s[0],
            id: n,
            type: c.CONFLUENCE,
            isConnected: e.access_token != null
        };
        return e.access_token ? { ...a,
            handler: {
                type: "fetch",
                tryFetch: async () => {
                    let i = o;
                    return !o && e.access_token && (i = await se(e.access_token, `https://${t}`, e, n)), {
                        connector: e.type,
                        id: n,
                        title: i,
                        mimeType: "text/html",
                        url: a.url,
                        syntheticExtension: null,
                        manifest: {
                            id: n,
                            domain: t,
                            type: x.PAGE,
                            manifest_type: c.CONFLUENCE
                        }
                    }
                }
            }
        } : { ...a,
            handler: {
                type: "prompt",
                message: "not-connected"
            }
        }
    })
}
const q = /\bhttps:\/\/([^\s]+?\.atlassian\.net)\/browse\/([^\s]+)\??/gm,
    K = /\bhttps:\/\/([^\s]+?\.atlassian\.net)\/jira\/(?:[^\s]+\/)*projects\/(?:[^\s]+\/)+(?:[^\s]+\/?)\?selectedIssue=([^\s]+)&?/gm;

function W(r, e) {
    return [...r.matchAll(q), ...r.matchAll(K)].map(s => {
        const t = s[1],
            n = s[2];
        if (!n || !t) return null;
        const o = {
            url: s[0],
            id: n,
            type: c.JIRA,
            isConnected: e.access_token != null
        };
        return e.access_token ? { ...o,
            handler: {
                type: "fetch",
                tryFetch: async () => {
                    const a = await ne(e.access_token, `https://${t}`, e, n);
                    return Promise.resolve({
                        connector: e.type,
                        id: n,
                        title: a,
                        mimeType: "text/markdown",
                        url: o.url,
                        syntheticExtension: null,
                        manifest: {
                            id_or_key: n,
                            domain: t,
                            manifest_type: c.JIRA
                        }
                    })
                }
            }
        } : { ...o,
            handler: {
                type: "prompt",
                message: "not-connected"
            }
        }
    })
}
const Q = /\bhttps:\/\/[^\s]+?\.sharepoint\.com\/[^\s]*/gm;

function X(r, e) {
    return [...r.matchAll(Q)].map(s => {
        const t = _(s[0]),
            n = d.OneDrive_BUSINESS_SHARES;
        if (!t) return null;
        const o = {
            url: s[0],
            id: t,
            type: c.O365_BUSINESS,
            isConnected: e.access_token != null
        };
        return e.access_token ? { ...o,
            handler: {
                type: "fetch",
                tryFetch: E(n, t, e.access_token, e)
            }
        } : { ...o,
            handler: {
                type: "prompt",
                message: "not-connected"
            }
        }
    })
}
const Y = /\bhttps:\/\/(?<domain>[^\s]+?\.(?:enterprise\.)?slack\.com)\/archives\/(?<conversation_id>[^\s/]+)\/?\??$/gm,
    Z = /\bhttps:\/\/(?<domain>[^\s]+?\.(?:enterprise\.)?slack\.com)\/archives\/(?<conversation_id>[^\s/]+)\/p(?<message_id>[^\s?&]+)(?:\?(?:.*thread_ts=(?<thread_id>[^\s&]+)(?:&.*))?)?/gm;

function V(r, e) {
    return [...r.matchAll(Z), ...r.matchAll(Y)].map(s => {
        const t = s.groups ? .domain;
        if (!t) throw new Error(`No domain found in match ${JSON.stringify(s)}`);
        const n = s.groups ? .conversation_id;
        if (!n) throw new Error(`No conversation ID found in match ${JSON.stringify(s)}`);
        const o = s.groups ? .message_id;
        let a = null;
        o && (a = `${o.slice(0,10)}.${o.slice(10)}`);
        const i = s.groups ? .thread_id ? ? null;
        let l = "Conversation",
            p = `conversation-${n}`;
        a ? (l = "Message", p = `message-${a}`) : i ? (l = "Thread", p = `thread-${i}`) : n[0] === "D" && (l = "Direct message");
        const u = {
            id: p,
            url: s[0],
            domain: t,
            conversationId: n,
            messageId: a,
            threadId: i,
            type: c.SLACK_OPEN_CONNECTOR,
            isConnected: e.access_token != null
        };
        return e.access_token ? { ...u,
            handler: {
                type: "fetch",
                tryFetch: async () => e.access_token ? Promise.resolve({
                    connector: e.type,
                    id: u.id,
                    title: l,
                    mimeType: "application/json",
                    url: u.url,
                    syntheticExtension: null,
                    manifest: {
                        conversation_id: u.conversationId,
                        domain: u.domain,
                        manifest_type: c.SLACK_OPEN_CONNECTOR,
                        message_id: u.messageId,
                        thread_id: i,
                        type: S.MESSAGE
                    }
                }) : Promise.reject(new Error("Not connected"))
            }
        } : { ...u,
            handler: {
                type: "prompt",
                message: "not-connected"
            }
        }
    })
}

function E(r, e, s, t, n) {
    switch (r) {
        case d.OneDrive_BUSINESS_SHARES:
        case d.OneDrive_PERSONAL_SHARES:
            return () => h(`${r}/${encodeURIComponent(e)}/driveItem`, s, t);
        case d.OneDrive_BUSINESS_DRIVE_ITEMS:
            return () => h(`${r}/${encodeURIComponent(e)}`, s, t);
        case d.OneDrive_BUSINESS_DRIVE_ROOT:
            return async () => {
                const o = await ee(s, e);
                if (!o) return Promise.reject(new Error("Unable to resolve OneDrive file path from root"));
                const a = `${r}:${encodeURIComponent(o)}`;
                return h(a, s, t)
            };
        case d.OneDrive_PERSONAL_DRIVE_ITEMS:
            return () => Promise.reject(new Error("Missing OneDrive drive ID for personal item lookup"))
    }
}
async function ee(r, e) {
    const t = await fetch("https://graph.microsoft.com/v1.0/me/drive/root", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${r}`,
            "Content-Type": "application/json"
        }
    });
    if (!t.ok) return null;
    const {
        webUrl: n
    } = await t.json(), a = new URL(n).pathname;
    return e.startsWith(a) ? e.substring(a.length) : e
}
async function h(r, e, s, t) {
    g.logAttemptIfAccessTokenIsExpired(s, f.Link);
    const n = await fetch(r, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${e}`,
            "Content-Type": "application/json"
        }
    });
    if (!n.ok) return Promise.reject(new Error(`HTTP ${n.status}`));
    const {
        id: o,
        name: a,
        file: i,
        webUrl: l,
        ...p
    } = await n.json();
    return t || (t = p.parentReference ? .driveId), {
        connector: s.type,
        id: o,
        title: a ? ? "",
        mimeType: i ? .mimeType ? ? "",
        url: l ? ? "",
        syntheticExtension: null,
        o365DriveId: t
    }
}
const te = "https://api.atlassian.com/oauth/token/accessible-resources";
async function I(r, e, s) {
    g.logAttemptIfAccessTokenIsExpired(s, f.Link);
    const n = (await fetch(te, {
        headers: {
            Authorization: `Bearer ${r}`
        }
    }).then(o => o.json())).find(o => o.url === e) ? .id;
    return n || Promise.reject(new Error("Cloud ID not found"))
}
async function se(r, e, s, t) {
    const n = await I(r, e, s);
    return (await fetch(`https://api.atlassian.com/ex/confluence/${n}/wiki/api/v2/pages/${t}?include-version=false`, {
        headers: {
            Authorization: `Bearer ${r}`
        }
    }).then(i => i.json())).title ? ? "Confluence Page"
}
async function ne(r, e, s, t) {
    const n = await I(r, e, s);
    return (await fetch(`https://api.atlassian.com/ex/jira/${n}/rest/api/2/issue/${t}?fields=summary`, {
        headers: {
            Authorization: `Bearer ${r}`
        }
    }).then(i => i.json())).fields.summary ? ? "Jira Issue"
}
const re = /\bhttps:\/\/www\.notion\.so\/(?:.*?)?(?<page_id>[a-f0-9]{32})(?:\?[\x21-\x7e]*)?/gm;

function oe(r, e) {
    return [...r.matchAll(re)].map(s => {
        const t = s.groups ? .page_id;
        if (!t) return null;
        const n = {
            url: s[0],
            id: t,
            type: c.NOTION_OPEN_CONNECTOR,
            isConnected: e.access_token != null
        };
        return e.access_token ? { ...n,
            handler: {
                type: "fetch",
                tryFetch: async () => {
                    const o = await N.safePost("/connectors/metadata", {
                        requestBody: {
                            manifest: {
                                id: t,
                                manifest_type: c.NOTION_OPEN_CONNECTOR
                            }
                        }
                    });
                    return Promise.resolve({
                        connector: e.type,
                        id: t,
                        title: o.title ? ? "Notion Page",
                        mimeType: "application/json",
                        url: n.url,
                        syntheticExtension: null,
                        manifest: {
                            id: t,
                            type: k.PAGE,
                            manifest_type: c.NOTION_OPEN_CONNECTOR
                        }
                    })
                }
            }
        } : { ...n,
            handler: {
                type: "prompt",
                message: "not-connected"
            }
        }
    })
}
export {
    pe as ContextConnectorDocumentParser, _ as encodeOneDriveShareUrl, $ as gdocRegex, U as parseDocumentURLs
};
//# sourceMappingURL=52989639-omcb7l87o7xtc1n2.js.map