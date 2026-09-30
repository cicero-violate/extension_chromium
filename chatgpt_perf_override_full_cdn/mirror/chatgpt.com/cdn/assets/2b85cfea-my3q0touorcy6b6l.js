const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/f6f4f1b2-gtlbp7j4szobo0y1.js", "assets/1bc04b52-lymnctp12j4ukscl.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/1bc04b52-h1em0bjkpkjv8ykw.js", "assets/e5d54aa7-km6nxu8kh9k1ioef.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/4813494d-lavfi1ibeyheaotg.js", "assets/373ddd65-f76gy0b8ieo4s693.js", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/conversation-small-cqp6votf.css", "assets/ac827dee-ni0c24kw46bltvi6.js", "assets/1bc04b52-jxd082ldak294kcc.js", "assets/8d846022-abx0in25q9ocxjad.js", "assets/1bc04b52-c842ajlk411j0plj.js", "assets/93b8edb0-i4v0k7e37nk0jqqy.js", "assets/1bc04b52-gtpe46xocf6zem4g.js", "assets/1bc04b52-homyy2s5cy2i6moh.js", "assets/200313d5-pcfdrmdp92b52l9u.js"]))) => i.map(i => d[i]);
import {
    _ as e
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    h as E
} from "./ac827dee-ni0c24kw46bltvi6.js";
import {
    vO as v
} from "./4813494d-javwxs2rmzsrunl2.js";
async function A(i, s) {
    if (E.every(t => !i.includes(t))) return i;
    const {
        unified: o
    } = await e(async () => {
        const {
            unified: t
        } = await
        import ("./f6f4f1b2-gtlbp7j4szobo0y1.js");
        return {
            unified: t
        }
    }, __vite__mapDeps([0, 1, 2, 3])), {
        CANVAS_REMARK_PLUGINS: _
    } = await e(async () => {
        const {
            CANVAS_REMARK_PLUGINS: t
        } = await
        import ("./e5d54aa7-km6nxu8kh9k1ioef.js").then(r => r.p);
        return {
            CANVAS_REMARK_PLUGINS: t
        }
    }, __vite__mapDeps([4, 5, 2, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 3])), {
        stripDirectivePlugin: a
    } = await e(async () => {
        const {
            stripDirectivePlugin: t
        } = await
        import ("./200313d5-pcfdrmdp92b52l9u.js");
        return {
            stripDirectivePlugin: t
        }
    }, __vite__mapDeps([18, 11, 5, 2, 6, 9, 10])), {
        hiveLogDirectivePlugin: c
    } = await e(async () => {
        const {
            hiveLogDirectivePlugin: t
        } = await
        import ("./ac827dee-ni0c24kw46bltvi6.js").then(r => r.b);
        return {
            hiveLogDirectivePlugin: t
        }
    }, __vite__mapDeps([11, 5, 2, 6, 9, 10])), n = o();
    n.use(c).use(a, {
        preserve: s ? .preserveContentReferences ? [v] : void 0
    }).use(_);
    const u = await n.process(i);
    return String(u).trim()
}
export {
    A as s
};
//# sourceMappingURL=2b85cfea-my3q0touorcy6b6l.js.map