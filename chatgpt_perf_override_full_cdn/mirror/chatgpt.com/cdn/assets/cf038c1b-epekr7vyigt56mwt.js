import {
    c as m,
    u,
    y
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    J as p,
    aO as b,
    bL as F,
    bI as I,
    t6 as f,
    bK as T
} from "./4813494d-javwxs2rmzsrunl2.js";

function g(e) {
    if ("file" in e) return e.file;
    const o = e.mimeType || e.blob.type || f(e.fileName);
    return new File([e.blob], e.fileName, {
        type: o
    })
}

function k(e, o) {
    const t = [e, o].filter(a => a != null && a.length > 0).join(", "),
        i = t.length > 0 ? `Failed to persist generated artifact to file library (${t}).` : "Failed to persist generated artifact to file library.";
    return new Error(i)
}
async function w(e, o, t) {
    const i = g(t),
        a = F(i);
    let r;
    if (await I(a, i, e, o, {
            kind: T.MyFiles
        }, {
            onFileCreated: () => {},
            onFileUploadProgress: () => {},
            onFileUploaded: (s, n, d, l) => {
                r || (r = {
                    kind: "uploaded",
                    result: {
                        fileId: n,
                        libraryFileId: l ? .libraryFileId,
                        fileName: i.name,
                        mimeType: l ? .mimeType || i.type || f(i.name)
                    }
                })
            },
            onError: (s, n, d, l, c) => {
                r || (r = {
                    kind: "error",
                    error: k(d, c)
                })
            }
        }, {
            usesRetrievalIndex: !0,
            storeInLibrary: !0,
            ...t.uploadSource ? {
                uploadSource: t.uploadSource
            } : {},
            libraryFileInfo: t.libraryFileInfo,
            directoryId: t.directoryId
        }), !r) throw new Error("Failed to persist generated artifact to file library.");
    if (r.kind === "error") throw r.error;
    return r.result
}

function _() {
    "use forget";
    const e = m.c(5),
        o = u(),
        t = p();
    let i;
    e[0] !== o || e[1] !== t ? (i = s => w(o, t, s), e[0] = o, e[1] = t, e[2] = i) : i = e[2];
    const a = b(i);
    let r;
    return e[3] !== a ? (r = {
        mutationFn: a
    }, e[3] = a, e[4] = r) : r = e[4], y(r)
}
export {
    _ as u
};
//# sourceMappingURL=cf038c1b-epekr7vyigt56mwt.js.map