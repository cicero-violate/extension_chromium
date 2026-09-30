import {
    c as z,
    j as n,
    r as x,
    u as W,
    h as ve
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    F9 as Se,
    Fa as _e,
    bY as Ie,
    gX as oe,
    D$ as je,
    D_ as Te,
    hA as Ne,
    tI as ke,
    sp as me,
    I as Ee,
    e as j,
    Fb as Y,
    ED as Fe,
    EC as ie,
    d as A,
    Fc as we,
    jQ as Pe,
    R as re,
    Fd as Re,
    Fe as Ue,
    Ff as De,
    Fg as Ae,
    Fh as $e,
    Fi as Le,
    Fj as ze,
    Fk as He,
    Fl as le,
    Fm as Oe,
    Fn as ce,
    Fo as Be,
    af as D,
    jp as Ge,
    Fp as We,
    sV as qe,
    ok as Ke,
    fc as $,
    c1 as E,
    b5 as U,
    rB as Ye,
    ol as Xe,
    CG as Qe,
    bX as Ve,
    jw as Ze
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    xV as Je,
    n4 as et,
    aB as tt,
    xW as st,
    xX as at,
    xY as nt,
    xZ as ot,
    x_ as it,
    bI as rt,
    x$ as lt,
    y0 as ue,
    y1 as ct
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function ut(t) {
    "use forget";
    const e = z.c(14),
        {
            accountUserId: s,
            size: o,
            allowViewingProfile: a
        } = t,
        p = Se(s),
        i = _e(s);
    let l;
    e[0] !== i || e[1] !== p ? (l = p != null && i != null ? {
        name: p,
        picture: i
    } : void 0, e[0] = i, e[1] = p, e[2] = l) : l = e[2];
    const y = l;
    if (a) {
        let f;
        e[3] !== s ? (f = () => {
            Ie(Je, {
                accountUserId: s
            })
        }, e[3] = s, e[4] = f) : f = e[4];
        let g;
        e[5] !== o || e[6] !== y ? (g = n.jsx(oe, {
            user: y,
            size: o
        }), e[5] = o, e[6] = y, e[7] = g) : g = e[7];
        let d;
        return e[8] !== f || e[9] !== g ? (d = n.jsx("button", {
            onClick: f,
            className: "relative z-10",
            children: g
        }), e[8] = f, e[9] = g, e[10] = d) : d = e[10], d
    }
    let c;
    return e[11] !== o || e[12] !== y ? (c = n.jsx(oe, {
        user: y,
        size: o
    }), e[11] = o, e[12] = y, e[13] = c) : c = e[13], c
}
const X = new je("calpicoMentionPlugin");

function V() {
    return {
        queryText: "",
        active: !1,
        range: void 0
    }
}

function Z(t, e) {
    return t.setMeta(X, e), t
}

function dt(t) {
    t.dispatch(Z(t.state.tr, V()))
}

function mt(t, e, s, o) {
    const a = t.state.tr;
    Z(a, V()), a.insertText(e + " ", s, o), t.dispatch(a)
}

function pt(t) {
    if (t.depth === 0) return;
    const s = (t.nodeBefore ? .text ? ? "").match(/(?:^|\s)@(\w*)$/);
    if (s) {
        const o = t.pos - s[1].length - 1,
            a = t.pos;
        return {
            range: {
                from: o,
                to: a
            },
            queryText: s[1]
        }
    }
}

function ft() {
    return new Te({
        key: X,
        state: {
            init() {
                return V()
            },
            apply(t, e, s, o) {
                const a = { ...e,
                    ...t.getMeta(X)
                };
                if (t.selection.from === t.selection.to && !o.doc.eq(s.doc)) {
                    const p = pt(t.selection.$from);
                    a.active = !!p, p && (a.range = p.range, a.queryText = p.queryText)
                }
                return a.onMentionMatch ? .(a.active && a.range ? {
                    text: a.queryText,
                    range: a.range
                } : void 0), a
            }
        }
    })
}

function gt(t, e, s) {
    "use no forget";
    const o = W(),
        a = me(),
        p = Ee() ? .normalizedAccountUserId ? ? null,
        i = j(() => a.rooms$().get(t) ? .members$() ? ? []),
        [l, y] = x.useState(void 0),
        [c, f] = x.useState(0);
    x.useEffect(() => {
        e.dispatch(Z(e.state.tr, {
            onMentionMatch(m) {
                y(m)
            }
        }))
    }, [e]);
    const g = o.formatMessage({
            id: "NiduaL",
            defaultMessage: "Ask anything"
        }),
        d = x.useMemo(() => {
            if (!l) return [];
            const m = l.text.trim().toLowerCase(),
                v = m.length === 0,
                _ = {
                    kind: "assistant",
                    text: "@ChatGPT",
                    displayName: "ChatGPT",
                    description: g
                },
                P = v || _.text.replace(/^@/, "").toLowerCase().includes(m) || _.displayName.toLowerCase().includes(m),
                q = [];
            P && q.push(_);
            const T = i.filter(S => S.accountUserId !== p).flatMap(S => {
                const I = S.username.trim().toLowerCase();
                if (!I) return [];
                const N = `@${I}`,
                    H = S.name.trim().toLowerCase();
                return v || N.includes(m) || H.includes(m) ? [{
                    kind: "member",
                    text: N,
                    displayName: S.name,
                    description: N,
                    accountUserId: S.accountUserId
                }] : []
            }).sort((S, I) => S.displayName.localeCompare(I.displayName));
            return q.concat(T)
        }, [l, g, i, p]),
        u = l != null && d.length > 0;
    x.useEffect(() => {
        f(0)
    }, [d]);
    const M = Y(() => {
            if (!l) return !1;
            const m = d[c] ? ? d[0];
            return m ? (mt(e, m.text, l.range.from, l.range.to), !0) : !1
        }),
        C = Y(m => {
            f(v => {
                const _ = d.length;
                return _ === 0 ? 0 : (m(v) % _ + _) % _
            })
        });
    return x.useEffect(() => {
        if (u) return Fe(e, m => {
            if (m === "up") s(), C(v => v - 1);
            else if (m === "down") s(), C(v => v + 1);
            else if (m === "cancel") ie(e), dt(e);
            else if (m === "submit" || m === "checkMatch") return M()
        }), () => {
            e.isDestroyed || ie(e)
        }
    }, [u, e, s]), {
        suggestions: d,
        isSuggestorOpen: u,
        selectedIndex: c,
        setSelectedIndex: C,
        saveMention: M
    }
}

function ht(t) {
    "use forget";
    const e = z.c(10),
        {
            roomId: s,
            editorView: o
        } = t,
        a = x.useRef("mouse");
    let p;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (p = () => {
        a.current = "keyboard"
    }, e[0] = p) : p = e[0];
    const i = p,
        {
            suggestions: l,
            isSuggestorOpen: y,
            selectedIndex: c,
            setSelectedIndex: f,
            saveMention: g
        } = gt(s, o, i);
    if (!y) return null;
    let d;
    e[1] === Symbol.for("react.memo_cache_sentinel") ? (d = () => {
        a.current = "mouse"
    }, e[1] = d) : d = e[1];
    let u;
    e[2] !== o || e[3] !== g || e[4] !== c || e[5] !== f || e[6] !== l ? (u = l.map((C, m) => n.jsx(Ne, {
        as: "div",
        autoFocus: !1,
        className: "rounded-lg px-3 py-2",
        highlighted: m === c,
        hasManagedFocus: !0,
        icon: C.kind === "assistant" ? n.jsx(ke, {
            iconName: "openai",
            size: "small"
        }) : n.jsx(ut, {
            accountUserId: C.accountUserId,
            size: "small"
        }),
        onMouseOver: () => {
            a.current === "mouse" && f(() => m)
        },
        onClick: () => {
            g(), o.focus()
        },
        children: n.jsxs("span", {
            children: [n.jsx("span", {
                className: "font-medium",
                children: C.displayName
            }), n.jsxs("span", {
                className: "text-token-text-secondary",
                children: [" · ", C.description]
            })]
        })
    }, C.kind === "member" ? C.accountUserId : "assistant-" + C.text)), e[2] = o, e[3] = g, e[4] = c, e[5] = f, e[6] = l, e[7] = u) : u = e[7];
    let M;
    return e[8] !== u ? (M = n.jsx("div", {
        className: "shadow-long popover bg-token-bg-primary absolute start-0 end-0 bottom-full z-20 mb-2 max-h-56 max-w-xs overflow-y-auto rounded-2xl py-1.5",
        onMouseDown: xt,
        onMouseMove: d,
        children: u
    }), e[8] = u, e[9] = M) : M = e[9], M
}

function xt(t) {
    t.preventDefault()
}
class yt {
    roomId;
    attachments$;
    replyTo$;
    focusComposer$;
    constructor(e) {
        this.roomId = e, this.attachments$ = A([]), this.replyTo$ = A(null), this.focusComposer$ = A(!1)
    }
    setReplyToImage(e, s) {
        this.replyTo$.set({
            messageId: e,
            messageType: "object",
            previewText: s.formatMessage({
                id: "n6PU6i",
                defaultMessage: "Image"
            })
        })
    }
    setReplyToMessage(e, s) {
        const o = we(e, 200);
        o.length === 0 ? this.setReplyToImage(e.id, s) : this.replyTo$.set({
            messageId: e.id,
            messageType: "text",
            previewText: o
        }), this.focusComposer$.set(!0)
    }
    clearReplyTo() {
        this.replyTo$.set(null)
    }
}
const pe = x.createContext({});

function Lt(t) {
    const [e] = x.useState(() => "controller" in t ? t.controller : new yt(t.roomId));
    if (!e) throw new Error("CalpicoRoomControllerProvider: roomId or controller is required");
    return n.jsx(pe.Provider, {
        value: e,
        children: t.children
    })
}

function Mt() {
    return x.use(pe)
}
const Ct = "image/*",
    Q = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"],
    fe = [".pdf", ".docx", ".txt"],
    bt = [Ct, ...Q, ...fe].join(",");

function ge(t) {
    return t != null && t.startsWith("image/")
}

function vt(t, e) {
    switch (t) {
        case "application/pdf":
            return e.formatMessage({
                id: "eEaagW",
                defaultMessage: "PDF"
            });
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return e.formatMessage({
                id: "0BrFKi",
                defaultMessage: "Document"
            });
        case "text/plain":
            return e.formatMessage({
                id: "C0VVm2",
                defaultMessage: "Text"
            });
        case "image/png":
        case "image/jpeg":
        case "image/gif":
        case "image/webp":
            return e.formatMessage({
                id: "3NDFKD",
                defaultMessage: "Image"
            });
        default:
            return e.formatMessage({
                id: "65WvIM",
                defaultMessage: "File"
            })
    }
}
const St = 2e3;
async function _t({
    roomId: t,
    projectId: e
}) {
    return e ? await re.safePost("/calpico/chatgpt/projects/{project_id}/rooms/{room_id}/responding_heartbeat", {
        parameters: {
            path: {
                project_id: e,
                room_id: t
            }
        }
    }) : await re.safePost("/calpico/chatgpt/rooms/{room_id}/responding_heartbeat", {
        parameters: {
            path: {
                room_id: t
            }
        }
    })
}
const It = Pe(_t, St, {
    trailing: !1
});

function jt({
    editorValue$: t,
    intl: e
}) {
    const s = new Re(null, {
        state: Ue.create({
            schema: De,
            plugins: [Ae(), $e(), ft(), Le(e.formatMessage({
                id: "3MYRWW",
                defaultMessage: "Send a message or @ChatGPT"
            })), ze(), He({ ...le,
                "Shift-Enter": le.Enter,
                "Mod-z": Be,
                "Mod-y": ce,
                "Mod-Shift-z": ce
            }), Oe()]
        }),
        dispatchTransaction(o) {
            const a = s.state.apply(o);
            s.updateState(a), t.set(a.doc.textContent)
        }
    });
    return s
}

function de(t, e) {
    const s = A({
        file: t,
        state: "pending"
    });
    return (async function() {
        try {
            const a = await e(t);
            s.set({ ...a,
                file: t,
                state: "complete"
            })
        } catch {
            s.set({
                file: t,
                state: "error"
            })
        }
    })(), s
}

function Tt({
    file: t,
    className: e
}) {
    const s = W(),
        o = x.useMemo(() => URL.createObjectURL(t), [t]);
    return n.jsx("img", {
        src: o,
        alt: s.formatMessage({
            id: "H7BtDz",
            defaultMessage: "Image preview"
        }),
        className: D("h-10 w-10 rounded-lg object-cover", e)
    })
}
const Nt = 1024 * 1024,
    kt = 1,
    L = ve({
        addPhotosAndFiles: {
            defaultMessage: "Add photos & files",
            id: "calpico.composer.plusMenu.addPhotosAndFiles"
        },
        webSearch: {
            defaultMessage: "Web search",
            id: "calpico.composer.plusMenu.webSearch"
        },
        createImage: {
            defaultMessage: "Create image",
            id: "calpico.composer.plusMenu.createImage"
        }
    });

function zt({
    roomId: t,
    scrollToBottom: e
}) {
    const s = W(),
        o = Ge(),
        a = me(),
        p = a.uploadCalpicoFile$,
        i = We(),
        l = x.useRef(null),
        y = x.useRef(null),
        [c, f] = x.useState(null),
        [g] = x.useState(() => A("")),
        [d] = x.useState(() => A(null)),
        u = Mt(),
        M = j(() => u.replyTo$()),
        C = j(() => g()),
        m = j(() => d()),
        v = m != null,
        _ = Et(c, l, C),
        P = v || _,
        T = j(qe) ? tt : st,
        S = x.useCallback(() => {
            o.danger(s.formatMessage({
                id: "eMW6kP",
                defaultMessage: "Documents must be {maxSize} MB or smaller."
            }, {
                maxSize: s.formatNumber(i / Nt, {
                    maximumFractionDigits: 1,
                    minimumFractionDigits: 0
                })
            }), {
                id: "calpico_file_upload_size_limit",
                toastId: "calpico_file_upload_size_limit"
            })
        }, [s, i, o]),
        I = x.useCallback(h => {
            const r = h.type ? ? "";
            if (ge(r) || r.startsWith("image/")) return !0;
            const b = h.name ? .toLowerCase ? .() ? ? "";
            return !(Q.includes(r) || fe.some(G => b.endsWith(G))) || h.size <= i ? !0 : (S(), !1)
        }, [i, S]),
        N = x.useCallback(h => {
            u.attachments$.set(r => [...r, {
                kind: "fileUpload",
                calpicoFileId: "",
                state: h
            }])
        }, [u]),
        H = x.useCallback(h => {
            if (h)
                for (const r of Array.from(h)) {
                    if (!I(r)) continue;
                    const b = de(r, k => p(t, k));
                    N(b)
                }
        }, [N, t, I, p]),
        J = x.useCallback(h => {
            H(h.target.files), h.target.value = ""
        }, [H]),
        ee = x.useCallback(() => {
            y.current ? .click()
        }, []),
        te = x.useCallback(h => {
            d.set(r => r === h ? r : h)
        }, [d]),
        he = x.useCallback(h => {
            d.set(r => r === h ? null : r)
        }, [d]),
        F = j(() => u.attachments$()),
        xe = F.length > 0 || P ? "-mb-2.5" : "-my-2.5",
        se = j(() => !F.some(r => r.kind === "fileUpload" && r.state().state !== "complete") && (g().trim() !== "" || F.length > 0)),
        ae = Y(() => {
            if (c == null) return;
            const h = Xe(c.state.doc).content;
            if (se) {
                const r = [];
                for (const b of F) switch (b.kind) {
                    case "fileUpload":
                        {
                            const k = b.state();k.state === "complete" && r.push({
                                attachment: {
                                    type: "file",
                                    file_id: k.calpicoFileId
                                },
                                metadata: null
                            });
                            break
                        }
                    case "link":
                        r.push({
                            attachment: {
                                type: "link",
                                url: b.attachment.url
                            },
                            metadata: null
                        });
                        break;
                    case "post":
                        r.push({
                            attachment: {
                                type: "post",
                                post_id: b.attachment.post_id
                            },
                            metadata: null
                        });
                        break;
                    case "sticker":
                        r.push({
                            attachment: {
                                type: "sticker",
                                sticker_id: b.stickerId
                            },
                            metadata: {
                                type: "sticker",
                                sticker_id: b.stickerId,
                                image_url: b.imageUrl,
                                image_metadata: null,
                                file_id: null
                            }
                        });
                        break
                }
                a.sendMessage$(t, {
                    content: {
                        text: h === "" ? null : h,
                        ...r.length > 0 && {
                            attachments: r.map(b => b.attachment)
                        },
                        system_hints: m ? [m] : []
                    },
                    reply_to: M ? .messageId ? {
                        message_id: M.messageId
                    } : void 0,
                    request_id: crypto.randomUUID()
                }, r.map(b => b.metadata)), c && c.dispatch(c.state.tr.delete(0, c.state.doc.content.size)), u.attachments$.set([]), u.clearReplyTo(), d.set(null), e({
                    animation: "instant"
                })
            }
        });
    x.useEffect(() => {
        const h = l.current;
        if (!h) return;
        const r = jt({
            editorValue$: g,
            intl: s
        });
        f(r);
        const b = Ke(r, {
            Enter: w => w.shiftKey ? !1 : (w.preventDefault(), ae(), !0)
        });
        h.appendChild(r.dom);
        const k = () => {
                const w = a.rooms$().get(t) ? .projectId;
                It({
                    roomId: t,
                    projectId: w
                })
            },
            G = w => {
                const K = Array.from(w.clipboardData ? .files ? ? []).filter(R => Qe.includes(R.type) || Q.includes(R.type) ? I(R) : !1);
                K.length === 0 || K.length > 16 || (w.preventDefault(), K.forEach(R => {
                    const Ce = de(R, be => p(t, be));
                    N(Ce)
                }))
            };
        return r.dom.addEventListener("keydown", k), r.dom.addEventListener("paste", G), r.focus(), () => {
            r.dom.removeEventListener("keydown", k), r.dom.removeEventListener("paste", G), b(), r.destroy(), f(null)
        }
    }, [t, g, s, u, a, I, N, p]);
    const ne = j(() => u.focusComposer$());
    x.useEffect(() => {
        ne && c && (c.focus(), u.focusComposer$.set(!1))
    }, [ne, c, u]);
    const O = ue(E.Research),
        B = ue(E.PictureV2),
        ye = n.jsxs(n.Fragment, {
            children: [n.jsx($.Group, {
                separator: !1,
                className: "content-sheet:content-sheet-inset-section",
                children: n.jsx($.Item, {
                    icon: n.jsx(et, {
                        className: "icon"
                    }),
                    label: s.formatMessage(L.addPhotosAndFiles),
                    onClick: ee
                }, "add-files")
            }), n.jsxs($.Group, {
                className: "content-sheet:content-sheet-inset-section",
                children: [n.jsx($.Item, {
                    icon: O ? n.jsx(O, {
                        className: "icon"
                    }) : void 0,
                    label: s.formatMessage(L.webSearch),
                    onClick: () => te(E.Search)
                }, E.Search), n.jsx($.Item, {
                    icon: B ? n.jsx(B, {
                        className: "icon"
                    }) : void 0,
                    label: s.formatMessage(L.createImage),
                    onClick: () => te(E.PictureV2)
                }, E.PictureV2)]
            })]
        }),
        Me = P || F.length > 0 || M;
    return n.jsx(n.Fragment, {
        children: n.jsxs("div", {
            className: "relative w-full",
            children: [c != null && n.jsx(ht, {
                editorView: c,
                roomId: t
            }), n.jsxs(U.div, {
                layout: !0,
                transition: T,
                className: D("shadow-short bg-token-bg-elevated-primary overflow-hidden", Me ? "rounded-3xl" : "rounded-full"),
                children: [M != null && n.jsx("div", {
                    children: n.jsx(at, {
                        replyRegions: [{
                            type: M.messageType,
                            value: M.previewText,
                            onRemoveRegion: () => u.clearReplyTo()
                        }]
                    })
                }), F.length > 0 && n.jsx("div", {
                    className: "px-4 pt-4 pb-2",
                    children: n.jsx(Rt, {
                        attachments: F,
                        onRemove: h => u.attachments$.set(r => r.filter(b => b !== h)),
                        render: h => {
                            switch (h.kind) {
                                case "fileUpload":
                                    return n.jsx(wt, {
                                        fileAttachment: h
                                    });
                                case "sticker":
                                    return null;
                                default:
                                    return null
                            }
                        }
                    })
                }), n.jsx("input", {
                    ref: y,
                    type: "file",
                    accept: bt,
                    className: "hidden",
                    onChange: J
                }), n.jsxs(U.div, {
                    layout: "position",
                    transition: T,
                    className: D("grid grid-cols-[auto_1fr_auto] gap-x-2 px-3 py-2.5", P ? v ? "gap-y-2 [grid-template-areas:'primary_primary_primary'_'leading_tools_trailing']" : "gap-y-2 [grid-template-areas:'primary_primary_primary'_'leading_._trailing']" : "items-center [grid-template-areas:'leading_primary_trailing']"),
                    children: [n.jsx(U.div, {
                        layout: "position",
                        transition: T,
                        className: "flex items-center [grid-area:leading]",
                        children: n.jsx(nt, {
                            items: ye,
                            children: n.jsx(ot, {
                                onDoubleClick: ee
                            })
                        })
                    }), n.jsx(U.div, {
                        layout: "position",
                        transition: T,
                        className: D(xe, "flex min-h-14 flex-1 items-center [grid-area:primary]"),
                        children: n.jsx("div", {
                            ref: l,
                            className: D("bg-token-bg-elevated-primary min-h-12 w-full rounded-2xl px-2", it["prosemirror-parent"], Ye() ? "firefox" : "default-browser")
                        })
                    }), n.jsx(U.div, {
                        layout: "position",
                        transition: T,
                        className: "flex items-center justify-end [grid-area:trailing]",
                        children: n.jsx("button", {
                            className: "composer-submit-btn composer-submit-button-color h-9 w-9",
                            disabled: !se,
                            onClick: () => {
                                ae()
                            },
                            children: n.jsx(rt, {
                                className: "icon-sm"
                            })
                        })
                    }), v && n.jsx(U.div, {
                        layout: "position",
                        transition: T,
                        className: "min-w-0 [grid-area:tools]",
                        initial: {
                            opacity: 0,
                            y: -6
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        children: n.jsx("div", {
                            className: "flex flex-wrap gap-2",
                            children: m && n.jsx(lt, {
                                icon: m === E.Search ? O && n.jsx(O, {
                                    className: "icon"
                                }) : B && n.jsx(B, {
                                    className: "icon"
                                }),
                                label: m === E.Search ? s.formatMessage(L.webSearch) : s.formatMessage(L.createImage),
                                removable: !0,
                                onRemove: () => he(m)
                            }, m)
                        })
                    })]
                })]
            })]
        })
    })
}

function Et(t, e, s) {
    "use forget";
    const o = z.c(5),
        [a, p] = x.useState(!1),
        i = s !== "";
    let l, y;
    return o[0] !== e || o[1] !== t || o[2] !== i ? (l = () => {
        const c = e.current,
            f = t && t.dom ? t.dom : null;
        if (!c || !f) return;
        const g = u => {
                if (!c.isConnected || !f.isConnected) {
                    p(!1);
                    return
                }
                const M = u ? ? f.offsetHeight,
                    C = Ft(c, f),
                    m = M - C > kt;
                p(v => m ? !0 : i ? v : !1)
            },
            d = Ze({
                axis: "height",
                debounce: !0,
                target: f,
                onChange: u => {
                    const {
                        height: M
                    } = u;
                    return g(M)
                }
            });
        return g(f.offsetHeight), () => {
            d ? .()
        }
    }, y = [t, e, i], o[0] = e, o[1] = t, o[2] = i, o[3] = l, o[4] = y) : (l = o[3], y = o[4]), x.useEffect(l, y), a
}

function Ft(t, e) {
    const s = getComputedStyle(e),
        o = Number.parseFloat(s.paddingTop) ? ? 0,
        a = Number.parseFloat(s.paddingBottom) ? ? 0,
        p = Number.parseFloat(s.lineHeight);
    if (!Number.isNaN(p)) return p + o + a;
    const i = t.ownerDocument.createElement("span");
    i.textContent = " ", i.style.visibility = "hidden", i.style.position = "absolute", i.style.font = s.font, i.style.lineHeight = s.lineHeight, i.style.paddingTop = s.paddingTop, i.style.paddingBottom = s.paddingBottom, t.appendChild(i);
    const l = i.offsetHeight;
    return t.removeChild(i), l
}

function wt(t) {
    "use forget";
    const e = z.c(8),
        {
            fileAttachment: s
        } = t;
    let o;
    e[0] !== s ? (o = () => s.state(), e[0] = s, e[1] = o) : o = e[1];
    const a = j(o);
    if (ge(a.file.type) || a.file.type.startsWith("image/")) {
        const l = a.state === "complete" ? void 0 : "opacity-50";
        let y;
        return e[2] !== l || e[3] !== a.file ? (y = n.jsx(Tt, {
            file: a.file,
            className: l
        }), e[2] = l, e[3] = a.file, e[4] = y) : y = e[4], y
    }
    let i;
    return e[5] !== a.file || e[6] !== a.state ? (i = n.jsx(Pt, {
        file: a.file,
        state: a.state
    }), e[5] = a.file, e[6] = a.state, e[7] = i) : i = e[7], i
}

function Pt(t) {
    "use forget";
    const e = z.c(19),
        {
            file: s,
            state: o
        } = t,
        a = W(),
        p = o === "complete";
    let i;
    e[0] !== s.type || e[1] !== a ? (i = s.type && s.type !== "" ? vt(s.type, a) : a.formatMessage({
        id: "6+b7GT",
        defaultMessage: "Unknown file type"
    }), e[0] = s.type, e[1] = a, e[2] = i) : i = e[2];
    const l = i,
        y = !p && "opacity-50";
    let c;
    e[3] !== y ? (c = D("border-token-border-light bg-token-bg-tertiary flex max-w-xs items-center gap-2 rounded-lg border px-3 py-2 text-start", y), e[3] = y, e[4] = c) : c = e[4];
    let f;
    e[5] === Symbol.for("react.memo_cache_sentinel") ? (f = n.jsx(ct, {
        className: "icon-sm"
    }), e[5] = f) : f = e[5];
    let g;
    e[6] !== s.name || e[7] !== a ? (g = s.name || a.formatMessage({
        id: "pMikPF",
        defaultMessage: "Document"
    }), e[6] = s.name, e[7] = a, e[8] = g) : g = e[8];
    let d;
    e[9] !== g ? (d = n.jsx("div", {
        className: "text-token-text-primary truncate text-sm font-medium",
        children: g
    }), e[9] = g, e[10] = d) : d = e[10];
    let u;
    e[11] !== l ? (u = n.jsx("div", {
        className: "text-token-text-secondary truncate text-xs",
        children: l
    }), e[11] = l, e[12] = u) : u = e[12];
    let M;
    e[13] !== d || e[14] !== u ? (M = n.jsxs("div", {
        className: "min-w-0",
        children: [d, u]
    }), e[13] = d, e[14] = u, e[15] = M) : M = e[15];
    let C;
    return e[16] !== c || e[17] !== M ? (C = n.jsxs("div", {
        className: c,
        children: [f, M]
    }), e[16] = c, e[17] = M, e[18] = C) : C = e[18], C
}

function Rt({
    attachments: t,
    onRemove: e,
    render: s
}) {
    return t.length === 0 ? null : n.jsx("div", {
        className: "flex gap-2",
        children: t.map((o, a) => n.jsxs("div", {
            className: "group relative",
            children: [s(o), n.jsx("button", {
                type: "button",
                onClick: () => e(o),
                className: "bg-token-bg-primary text-token-text-secondary border-token-border-heavy invisible absolute -end-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full border group-hover:visible",
                children: n.jsx(Ve, {
                    className: "icon-xs"
                })
            })]
        }, a))
    })
}
export {
    zt as C, Lt as a, Q as b, de as c, ut as d, vt as g, ge as i, Mt as u
};
//# sourceMappingURL=af1d6752-l1jen9j8o9ok5rzx.js.map