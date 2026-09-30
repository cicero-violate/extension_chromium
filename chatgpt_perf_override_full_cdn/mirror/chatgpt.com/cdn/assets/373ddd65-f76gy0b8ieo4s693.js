class i {
    dependencies() {
        return []
    }
    unifiedInitializationHook(r) {
        return r
    }
}
class o extends i {
    unistToProseMirrorTest(r) {
        return r.type === this.unistNodeName()
    }
    proseMirrorInputRules(r) {
        return []
    }
    proseMirrorKeymap(r) {
        return {}
    }
    postUnistToProseMirrorHook(r) {}
    customDirectiveName() {
        return null
    }
}
class p extends o {
    proseMirrorToUnistTest(r) {
        return this.proseMirrorNodeName() === r.type.name
    }
    proseMirrorNodeView() {
        return null
    }
    proseMirrorNodeName() {
        return this.constructor.proseMirrorNodeName()
    }
    static proseMirrorNodeName() {
        throw new Error("Method not implemented.")
    }
}
class a extends o {
    proseMirrorMarkName() {
        return this.constructor.proseMirrorMarkName()
    }
    static proseMirrorMarkName() {
        throw new Error("Method not implemented.")
    }
}
class M extends a {
    unistNodeName() {
        return "startend"
    }
    static proseMirrorMarkName() {
        return "startend"
    }
    proseMirrorMarkSpec() {
        return {
            attrs: {
                start: {},
                end: {}
            },
            toDOM() {
                return ["span", 0]
            }
        }
    }
    unistNodeToProseMirrorNodes({
        schema: r,
        convertedChildren: s,
        attrs: n
    }) {
        return s.map(t => t.mark(t.marks.concat([r.marks[this.proseMirrorMarkName()].create(n)])))
    }
    processConvertedUnistNode(r) {
        return {
            type: this.unistNodeName(),
            children: [r]
        }
    }
}
export {
    i as E, a as M, p as N, M as S
};
//# sourceMappingURL=373ddd65-f76gy0b8ieo4s693.js.map