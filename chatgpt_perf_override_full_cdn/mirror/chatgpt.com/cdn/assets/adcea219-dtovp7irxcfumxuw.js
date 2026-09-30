const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/9ba1a705-fa7cnojz89igyu6x.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/conversation-small-cqp6votf.css", "assets/bfac314f-mm1jhi616vljbl96.js", "assets/53e54fd2-nsg9wic4wypalpvu.js", "assets/c82f91b2-d0j1tjld8r0bk41k.js", "assets/4fd5e21c-iqckvf9l7t9wu5o7.js", "assets/65f15ce8-er7901w7j9nww2f2.js", "assets/bb54068a-r109lneo6fsdnd69.js", "assets/8a4ba318-icb6f27hecaxunne.js", "assets/7f2fe580-2qh7krtqai1xyx2f.js", "assets/473287f8-nkco7wh9dijykesu.js", "assets/1bc04b52-gispxsg5kl3t8vy0.js", "assets/404fcfb3-h4d3wzdy3nmn6y91.js", "assets/74bc9fb5-lpkvfmw854cstwi7.js", "assets/558211ed-hp3eu5sv1pox83ts.js", "assets/a6b829b0-e9ve1fw8ijaccmyb.js", "assets/1f6fa6f6-e8q3ftnb1yq9szd7.js", "assets/ede32a8e-ckihntqbdrle51rj.js", "assets/916289eb-evk5bznprxnrg184.js", "assets/f005d113-1re5iaibjrl5tpwu.js", "assets/22724723-hcq7pr9e9rdzi53r.js", "assets/63e1cf0b-dk1yufdi6a3505q3.js", "assets/b39f2778-dalp8dsp5fxj27qr.js", "assets/80f61f96-ou8jsmk5pl0vaoom.js", "assets/190163c6-cmpv9phqchl31xtj.js", "assets/244f4e42-paf6jyxzqp9szebm.js", "assets/c7cf66a1-lxlkkugldrmvojpt.js", "assets/bfc953d6-hjpb46py98qzcsny.js", "assets/aa214ea3-mewgt9ra7uf34uug.js", "assets/a89794b1-iid29x3u23vy2xh2.js", "assets/1ba6ad46-f0hhclcypyetq86y.js"]))) => i.map(i => d[i]);
import {
    c as G,
    j as t,
    u as X,
    r as y,
    o as L,
    h as re,
    _ as q
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    ij as ae,
    rL as ie,
    af as H,
    b5 as de,
    J as ce,
    bX as fe,
    fk as ue,
    jd as me,
    gb as pe,
    fc as xe,
    aw as Z,
    e5 as Y,
    ch as J,
    aE as ge,
    ih as he,
    ay as oe,
    a0 as we
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    aB as be,
    sl as ye,
    gN as Se,
    o4 as ve
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    u as ne
} from "./a89794b1-iid29x3u23vy2xh2.js";
import {
    u as _e
} from "./cf038c1b-epekr7vyigt56mwt.js";
import {
    u as je
} from "./e04c699b-c1yj8j54x1smqexb.js";
import {
    d as Ie
} from "./679fc303-kl7c6054usfnqmd4.js";
import {
    F as ee
} from "./14f71e20-oiejkcbcinz69nah.js";
import {
    g as te
} from "./6fd89734-he7d0krbclzsprbo.js";
import {
    E as Te
} from "./a24a6b0e-bqz8i0dx9sfl7wz5.js";
const Ee = {
        bounce: .1,
        duration: .35,
        type: "spring"
    },
    De = n => {
        "use forget";
        const e = G.c(10),
            {
                children: l,
                className: s,
                testId: r
            } = n,
            a = ae(),
            i = ie() ? be : Ee;
        let f;
        e[0] !== s ? (f = H("fixed inset-0 z-50 bg-white", s), e[0] = s, e[1] = f) : f = e[1];
        const m = a ? "var(--sidebar-width)" : "var(--sidebar-rail-width)";
        let o;
        e[2] !== m ? (o = {
            insetInlineStart: m
        }, e[2] = m, e[3] = o) : o = e[3];
        let u;
        return e[4] !== l || e[5] !== f || e[6] !== o || e[7] !== r || e[8] !== i ? (u = t.jsx(de.div, {
            className: f,
            "data-testid": r,
            initial: !1,
            animate: o,
            transition: i,
            children: l
        }), e[4] = l, e[5] = f, e[6] = o, e[7] = r, e[8] = i, e[9] = u) : u = e[9], u
    },
    k = re({
        downloadFileError: {
            id: "postSharingModal.downloadFileError",
            defaultMessage: "Failed to download file. Please try again later."
        },
        title: {
            id: "walnut.title",
            defaultMessage: "Preview"
        },
        tooltip: {
            id: "walnut.tooltip",
            defaultMessage: "This is a web preview and may not reflect exact formatting. Download to open in your preferred software for best results."
        },
        downloadMenuTriggerLabel: {
            id: "walnut.downloadMenuTriggerLabel",
            defaultMessage: "Open download options"
        },
        downloadMenuDownloadFile: {
            id: "walnut.downloadMenuDownloadFile",
            defaultMessage: "Download file"
        },
        downloadMenuSaveToLibrary: {
            id: "walnut.downloadMenuSaveToLibrary",
            defaultMessage: "Save to library"
        },
        saveToLibrarySuccess: {
            id: "walnut.saveToLibrarySuccess",
            defaultMessage: 'Saved "{fileName}" to library.'
        },
        saveToLibraryError: {
            id: "walnut.saveToLibraryError",
            defaultMessage: "Couldn't save to library. Try again."
        }
    }),
    Ne = ({
        onClose: n,
        onPlay: e,
        extension: l,
        contentType: s,
        clientThreadId: r,
        editHandlers: a
    }) => {
        "use no forget";
        const c = X(),
            i = ce(),
            f = s === "presentation",
            {
                formatMessage: m
            } = X(),
            o = m(k.title),
            u = m(k.tooltip),
            w = !1,
            A = m(k.downloadMenuTriggerLabel),
            {
                focusedWalnutId: d,
                presentationMap: E,
                spreadsheetExporters: S
            } = ne(),
            j = d ? E[d] : void 0,
            p = j ? .fileName ? ? (s === "presentation" ? "presentation.pptx" : "spreadsheet.xlsx"),
            C = !1,
            $ = s === "spreadsheet",
            O = j ? .fileBlob,
            I = c.formatMessage(k.downloadFileError),
            P = c.formatMessage(k.saveToLibraryError),
            {
                mutateAsync: T,
                isPending: g
            } = _e(),
            [v, b] = y.useState(null),
            B = je(!1, r, d ? ? "", () => {}, () => {
                i.danger(I, {
                    toastId: "post_sharing_modal_download_error",
                    loggingTitle: I,
                    loggingDescription: "Error message when a file download fails"
                })
            }),
            D = async () => {
                if (O) {
                    Ie(O, p), Y("chatgpt_web_artifact_output_container_direct_exported", void 0, {
                        artifact_extension: te(p) ? ? "unknown",
                        artifact_surface: "focused_view_header"
                    });
                    return
                }
                const {
                    data: h
                } = await B.refetch();
                if (h === void 0 || h.status !== "success") {
                    i.danger(I, {
                        toastId: "post_sharing_modal_download_error",
                        loggingTitle: I,
                        loggingDescription: "Error message when a file download fails"
                    });
                    return
                }
                const x = document.createElement("a");
                x.href = h.download_url, x.click(), Y("chatgpt_web_artifact_output_remote_file_downloaded", void 0, {
                    artifact_extension: te(p) ? ? "unknown",
                    artifact_surface: "focused_view_header"
                })
            };
        return y.useCallback(() => {}, [w]), y.useCallback(() => {
            g || b(null)
        }, [g]), y.useCallback(h => {
            b(x => {
                if (x == null) return x;
                const K = x.expandedDirectoryIds.includes(h) ? x.expandedDirectoryIds.filter(F => F !== h) : [...x.expandedDirectoryIds, h];
                return { ...x,
                    expandedDirectoryIds: K
                }
            })
        }, []), y.useCallback(async () => {}, [B, O, p, c, g, w, f, T, v, P, i]), d && S[d], t.jsxs(t.Fragment, {
            children: [t.jsxs("div", {
                className: H("text-token-text-secondary relative flex w-full items-center justify-between border-b px-3 py-1", C, $ ? "border-token-border-heavy" : "border-token-border-light"),
                children: [t.jsxs("div", {
                    className: "z-10 flex flex-row gap-2",
                    children: [t.jsx(ye, {
                        onClick: n,
                        children: t.jsx(fe, {})
                    }), !1]
                }), t.jsxs("div", {
                    className: "absolute start-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1",
                    children: [t.jsx(ee, {
                        fileName: o
                    }), t.jsx("div", {
                        className: "text-token-text-primary flex flex-row items-center truncate text-sm font-medium",
                        children: t.jsx(ue, {
                            label: u,
                            theme: "white",
                            defaultOpen: !0,
                            customBackgroundColorClassName: "bg-[#6B91F1]",
                            labelClassName: "text-white font-light",
                            side: "bottom",
                            disabled: C,
                            children: t.jsxs("div", {
                                className: "flex flex-row items-center",
                                children: [t.jsxs("div", {
                                    className: "flex flex-row items-center gap-2",
                                    children: [t.jsx(ee, {
                                        fileName: p
                                    }), p]
                                }), t.jsx(me, {
                                    className: "ms-1 size-4"
                                })]
                            })
                        })
                    }), l && t.jsx("div", {
                        className: "text-token-text-tertiary ms-2 text-sm",
                        children: l
                    })]
                }), t.jsxs("div", {
                    className: "z-10 flex items-center gap-1",
                    children: [!1, t.jsxs(pe, {
                        size: "small",
                        contentAlign: "end",
                        sideOffset: 4,
                        triggerButton: t.jsx(Z, {
                            color: "ghost",
                            size: "small",
                            "aria-label": A,
                            children: t.jsx(Se, {})
                        }),
                        children: [!1, t.jsx(xe.Item, {
                            onClick: () => {
                                D()
                            },
                            children: t.jsx(L, { ...k.downloadMenuDownloadFile
                            })
                        }), w]
                    }), f && t.jsx(Z, {
                        color: "primary",
                        onClick: e,
                        size: "small",
                        children: t.jsxs("div", {
                            className: "flex items-center gap-1",
                            children: [t.jsx(ve, {}), t.jsx("span", {
                                className: "hidden sm:block",
                                children: t.jsx(L, {
                                    id: "walnut.play",
                                    defaultMessage: "Play Slideshow"
                                })
                            })]
                        })
                    })]
                })]
            }), w]
        })
    };

function se(n) {
    "use forget";
    const e = G.c(14),
        {
            state: l,
            className: s
        } = n;
    if (l === "loading") {
        let f;
        e[0] !== s ? (f = H("flex w-full items-center justify-center bg-white px-6 py-10 dark:bg-[#1f1f1f]", s), e[0] = s, e[1] = f) : f = e[1];
        let m;
        e[2] === Symbol.for("react.memo_cache_sentinel") ? (m = t.jsx("div", {
            className: "border-token-border-heavy h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"
        }), e[2] = m) : m = e[2];
        let o;
        e[3] === Symbol.for("react.memo_cache_sentinel") ? (o = t.jsxs("div", {
            className: "flex flex-col items-center gap-3 text-center",
            children: [m, t.jsx("div", {
                className: "text-token-text-tertiary text-sm",
                children: t.jsx(L, {
                    id: "CZvcq/",
                    defaultMessage: "Loading preview..."
                })
            })]
        }), e[3] = o) : o = e[3];
        let u;
        return e[4] !== f ? (u = t.jsx("div", {
            className: f,
            children: o
        }), e[4] = f, e[5] = u) : u = e[5], u
    }
    let r;
    e[6] !== s ? (r = H("flex w-full items-center justify-center bg-white px-6 py-10 dark:bg-[#1f1f1f]", s), e[6] = s, e[7] = r) : r = e[7];
    let a;
    e[8] === Symbol.for("react.memo_cache_sentinel") ? (a = t.jsx(Te, {
        className: "text-token-text-tertiary size-7"
    }), e[8] = a) : a = e[8];
    let c;
    e[9] !== l ? (c = t.jsxs("div", {
        className: "flex max-w-[22rem] flex-col items-center gap-4 text-center",
        children: [a, t.jsx("div", {
            className: "text-token-text-tertiary text-sm",
            children: l === "fileTooLarge" ? t.jsx(L, {
                id: "C141hG",
                defaultMessage: "This file is too large to preview. Download it to view locally."
            }) : t.jsx(L, {
                id: "wSfUmM",
                defaultMessage: "Unable to load preview. Try refreshing the page."
            })
        })]
    }), e[9] = l, e[10] = c) : c = e[10];
    let i;
    return e[11] !== r || e[12] !== c ? (i = t.jsx("div", {
        className: r,
        children: c
    }), e[11] = r, e[12] = c, e[13] = i) : i = e[13], i
}
const Me = J(() => q(() =>
        import ("./9ba1a705-fa7cnojz89igyu6x.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27])).then(n => n.CanvasRenderer)),
    ke = J(() => q(() =>
        import ("./190163c6-cmpv9phqchl31xtj.js"), __vite__mapDeps([28, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 25, 29, 30, 31, 23, 32, 33])).then(n => n.SpreadsheetRenderer)),
    Le = J(() => q(() =>
        import ("./1ba6ad46-f0hhclcypyetq86y.js"), __vite__mapDeps([34, 1, 3, 4, 33, 6, 7, 2, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 26])).then(n => n.Slideshow));
let V = null,
    R = null;
const Ce = () => {
        const n = V === !0;
        V = null, n && oe.setSidebarOpen(!0)
    },
    Oe = n => {
        "use forget";
        const e = G.c(4),
            {
                children: l
            } = n,
            s = ae(),
            r = y.useRef(s);
        let a, c;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (a = () => (R != null && (clearTimeout(R), R = null), V == null && (V = r.current), oe.setSidebarOpen(!1), Re), c = [], e[0] = a, e[1] = c) : (a = e[0], c = e[1]), y.useEffect(a, c);
        let i;
        return e[2] !== l ? (i = t.jsx(De, {
            testId: "modal-walnut-content",
            children: l
        }), e[2] = l, e[3] = i) : i = e[3], i
    };

function qe(n) {
    "use forget";
    const e = G.c(35),
        {
            isOpen: l,
            onClose: s,
            clientThreadId: r
        } = n,
        [a, c] = y.useState(!1),
        i = ge(),
        f = he(),
        {
            presentationMap: m,
            focusedWalnutId: o,
            setSelectedSlideIdx: u
        } = ne(),
        [w, A] = y.useState(!1),
        d = o ? m[o] : null;
    let E;
    e[0] !== d ? (E = d ? ? {}, e[0] = d, e[1] = E) : E = e[1];
    const {
        presentation: S,
        fileName: j,
        workbook: p,
        document: C
    } = E, $ = d ? .contentType ? ? "none", O = !!S || !!p || !1, I = d ? .loadState ? ? (O ? "ready" : "loading"), P = d ? .loadError ? ? null, T = S ? "presentation" : p ? "spreadsheet" : $, g = T === "spreadsheet" && p && !a, v = !d || I === "loading" && !a, b = I === "error" && !a, B = g && i && !f && !v && !b;
    if (!o) return null;
    const D = T === "presentation" && S && !a,
        h = !1;
    let x;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (x = !1, e[2] = x) : x = e[2];
    const F = v || b || !(g && x);
    let W;
    e[3] !== r || e[4] !== T || e[5] !== C || e[6] !== j || e[7] !== o || e[8] !== w || e[9] !== a || e[10] !== P || e[11] !== S || e[12] !== d ? .selectedSheetIdx || e[13] !== d ? .selectedSlideIdx || e[14] !== u || e[15] !== h || e[16] !== b || e[17] !== F || e[18] !== v || e[19] !== D || e[20] !== g || e[21] !== p ? (W = _ => t.jsxs("div", {
        className: "flex h-full flex-col overflow-hidden",
        children: [F && t.jsx(Ne, {
            onClose: _,
            onPlay: () => c(!a),
            title: j,
            contentType: T,
            clientThreadId: r,
            canEdit: !1
        }), D && t.jsx(Me, {
            presentation: S,
            selectedSlideIdx: d ? .selectedSlideIdx ? ? 0,
            setSelectedSlideIdx: le => u(o, le),
            isEditing: w,
            setIsEditing: A
        }), p && t.jsx(ke, {
            workbook: p,
            selectedSheetIdx: d ? .selectedSheetIdx ? ? 0,
            isEditing: w,
            setIsEditing: A,
            onClose: _,
            fileName: j,
            clientThreadId: r
        }), !1, v && t.jsx(se, {
            state: "loading",
            className: "min-h-0 flex-1"
        }), b && t.jsx(se, {
            state: P === "fileTooLarge" ? "fileTooLarge" : "error",
            className: "min-h-0 flex-1"
        }), a && t.jsx(Le, {
            startIndex: 0,
            onExit: _,
            walnutId: o
        }), !D && !g && !h && !v && !b && !a && t.jsx("div", {
            className: "flex h-full w-full items-center justify-center",
            children: t.jsx(L, {
                id: "walnut.noFile",
                defaultMessage: "No file selected."
            })
        })]
    }), e[3] = r, e[4] = T, e[5] = C, e[6] = j, e[7] = o, e[8] = w, e[9] = a, e[10] = P, e[11] = S, e[12] = d ? .selectedSheetIdx, e[13] = d ? .selectedSlideIdx, e[14] = u, e[15] = h, e[16] = b, e[17] = F, e[18] = v, e[19] = D, e[20] = g, e[21] = p, e[22] = W) : W = e[22];
    const N = W;
    if (B) {
        let _;
        return e[23] !== s || e[24] !== N ? (_ = t.jsx(Oe, {
            children: N(s)
        }), e[23] = s, e[24] = N, e[25] = _) : _ = e[25], _
    }
    const U = g ? ? !1,
        Q = g ? Pe : void 0;
    let M;
    e[26] !== s || e[27] !== N ? (M = N(s), e[26] = s, e[27] = N, e[28] = M) : M = e[28];
    let z;
    return e[29] !== l || e[30] !== s || e[31] !== U || e[32] !== Q || e[33] !== M ? (z = t.jsx(we, {
        testId: "modal-walnut-content",
        type: "success",
        size: "fullscreen",
        isOpen: l,
        onClose: s,
        visuallyHiddenHeader: !0,
        shouldIgnoreClickOutside: U,
        onEscapeKeyDown: Q,
        children: M
    }), e[29] = l, e[30] = s, e[31] = U, e[32] = Q, e[33] = M, e[34] = z) : z = e[34], z
}

function Pe(n) {
    n.preventDefault(), n.stopPropagation()
}

function Fe() {
    Ce(), R = null
}

function Re() {
    R = setTimeout(Fe, 0)
}
export {
    qe as W
};
//# sourceMappingURL=adcea219-dtovp7irxcfumxuw.js.map