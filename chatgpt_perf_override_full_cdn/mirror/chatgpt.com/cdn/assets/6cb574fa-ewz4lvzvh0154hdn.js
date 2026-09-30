const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/d22c9b51-6776exisz4t39r9r.js", "assets/1bc04b52-jkdznw8znv9rgv81.js", "assets/1bc04b52-nn3a79pgrrxatkgx.js", "assets/1bc04b52-c6spp0aq3f71sxih.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/root-c6w0vzk3.css", "assets/374de796-nik4n0gid13k19yn.js", "assets/7d129ad5-e4paql3yx1g4pg4u.js", "assets/1bc04b52-kbv7syek90tbvv85.js", "assets/index-ivzj8m6u.css", "assets/bf706fa7-e3bui5cvgdm7izni.js", "assets/17602be8-g1cld1nbx1d1mzej.js", "assets/45fa1808-otzksxh36a7gbpoq.js", "assets/f791b3a0-pb7wviqrd3z99l5t.js", "assets/3c9bd127-dosb52niza2qwrjp.js", "assets/d367f22a-hmvl2ho9pvcqg430.js", "assets/d172d6e7-hn7dmvdjly3xl9pg.js", "assets/5d5c6b1a-o907l2888nr234mf.js", "assets/022c7441-c8xay0o8qvmy7bxw.js", "assets/6981ed16-c0ofq81ly9npnqlr.js", "assets/ea255025-gpm7j2f35tzw01kq.js"]))) => i.map(i => d[i]);
import {
    _ as r
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    T as t
} from "./a4ef304b-bcc1699tskmhgi50.js";
import {
    L as n,
    S as u
} from "./1bc04b52-nn3a79pgrrxatkgx.js";

function e(_) {
    return new n(u.define(_))
}
const p = () => r(() =>
        import ("./30ca1328-pbl95wx6493wq92j.js"), []).then(_ => e(_.shell)),
    E = {
        [t.bash]: p,
        [t.zsh]: p,
        [t.swift]: () => r(() =>
            import ("./d28fdc6f-pijqfo56g5y7ss6b.js"), []).then(_ => e(_.swift)),
        [t.css]: () => r(() =>
            import ("./d22c9b51-6776exisz4t39r9r.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6])).then(_ => _.css()),
        [t.html]: () => r(() =>
            import ("./374de796-nik4n0gid13k19yn.js"), __vite__mapDeps([7, 1, 2, 3, 4, 5, 6, 0, 8, 9, 10])).then(_ => _.html()),
        [t.javascript]: () => r(() =>
            import ("./7d129ad5-e4paql3yx1g4pg4u.js"), __vite__mapDeps([8, 1, 2, 3, 4, 5, 6, 9, 10])).then(_ => _.javascript({
            jsx: !0,
            typescript: !1
        })),
        [t.typescript]: () => r(() =>
            import ("./7d129ad5-e4paql3yx1g4pg4u.js"), __vite__mapDeps([8, 1, 2, 3, 4, 5, 6, 9, 10])).then(_ => _.javascript({
            jsx: !0,
            typescript: !0
        })),
        [t.json]: () => r(() =>
            import ("./bf706fa7-e3bui5cvgdm7izni.js"), __vite__mapDeps([11, 1, 2, 3, 4, 5, 6])).then(_ => _.json()),
        [t.python]: () => r(() =>
            import ("./17602be8-g1cld1nbx1d1mzej.js"), __vite__mapDeps([12, 1, 2, 3, 4, 5, 6, 9, 10])).then(_ => _.python()),
        [t.sql]: () => r(() =>
            import ("./45fa1808-otzksxh36a7gbpoq.js"), __vite__mapDeps([13, 2, 3, 4, 5, 6, 1, 9, 10])).then(_ => _.sql()),
        [t.go]: () => r(() =>
            import ("./f791b3a0-pb7wviqrd3z99l5t.js"), __vite__mapDeps([14, 1, 2, 3, 4, 5, 6, 9, 10])).then(_ => _.go()),
        [t.yaml]: () => r(() =>
            import ("./3c9bd127-dosb52niza2qwrjp.js"), __vite__mapDeps([15, 1, 2, 3, 4, 5, 6])).then(_ => _.yaml()),
        [t.java]: () => r(() =>
            import ("./d367f22a-hmvl2ho9pvcqg430.js"), __vite__mapDeps([16, 1, 2, 3, 4, 5, 6])).then(_ => _.java()),
        [t.rust]: () => r(() =>
            import ("./d172d6e7-hn7dmvdjly3xl9pg.js"), __vite__mapDeps([17, 1, 2, 3, 4, 5, 6])).then(_ => _.rust()),
        [t.cpp]: () => r(() =>
            import ("./5d5c6b1a-o907l2888nr234mf.js"), __vite__mapDeps([18, 1, 2, 3, 4, 5, 6])).then(_ => _.cpp()),
        [t.php]: () => r(() =>
            import ("./022c7441-c8xay0o8qvmy7bxw.js"), __vite__mapDeps([19, 1, 2, 3, 4, 5, 6, 7, 0, 8, 9, 10])).then(_ => _.php()),
        [t.xml]: () => r(() =>
            import ("./6981ed16-c0ofq81ly9npnqlr.js"), __vite__mapDeps([20, 1, 2, 3, 4, 5, 6])).then(_ => _.xml()),
        [t.vue]: () => r(() =>
            import ("./ea255025-gpm7j2f35tzw01kq.js"), __vite__mapDeps([21, 2, 3, 4, 5, 6, 7, 1, 0, 8, 9, 10])).then(_ => _.vue()),
        [t.ruby]: () => r(() =>
            import ("./abca46a7-e4lhyu305wu0fcut.js"), []).then(_ => e(_.ruby)),
        [t.haskell]: () => r(() =>
            import ("./38f918fd-jx84qcn2big2ur6d.js"), []).then(_ => e(_.haskell)),
        [t.kotlin]: () => r(() =>
            import ("./035780c7-ihlq97ejw14b1nc1.js"), []).then(_ => e(_.kotlin)),
        [t.csharp]: () => r(() =>
            import ("./035780c7-ihlq97ejw14b1nc1.js"), []).then(_ => e(_.csharp)),
        [t.vb]: () => r(() =>
            import ("./4e977d37-ie9jw1nrdybk3u6w.js"), []).then(_ => e(_.vb)),
        [t.c]: () => r(() =>
            import ("./035780c7-ihlq97ejw14b1nc1.js"), []).then(_ => e(_.c)),
        [t.objectivec]: () => r(() =>
            import ("./035780c7-ihlq97ejw14b1nc1.js"), []).then(_ => e(_.objectiveC)),
        [t.r]: () => r(() =>
            import ("./d6c8b5b9-ejmf57etl4wj4dsl.js"), []).then(_ => e(_.r)),
        [t.lua]: () => r(() =>
            import ("./fdf88481-harowmpdmpnd9wki.js"), []).then(_ => e(_.lua)),
        [t.dart]: () => r(() =>
            import ("./035780c7-ihlq97ejw14b1nc1.js"), []).then(_ => e(_.dart)),
        [t.scala]: () => r(() =>
            import ("./035780c7-ihlq97ejw14b1nc1.js"), []).then(_ => e(_.scala)),
        [t.perl]: () => r(() =>
            import ("./898dddc0-gq1ss5v2zpbborxl.js"), []).then(_ => e(_.perl)),
        [t.commonlisp]: () => r(() =>
            import ("./552443da-jr6cjysmysifr6mr.js"), []).then(_ => e(_.commonLisp)),
        [t.clojure]: () => r(() =>
            import ("./4fd91720-gf1tfl9d2himhfic.js"), []).then(_ => e(_.clojure)),
        [t.ocaml]: () => r(() =>
            import ("./c9caff3d-no1gl1ax0ypay171.js"), []).then(_ => e(_.oCaml)),
        [t.powershell]: () => r(() =>
            import ("./c4801362-i9u5kd7kvamutmln.js"), []).then(_ => e(_.powerShell)),
        [t.verilog]: () => r(() =>
            import ("./252f74d3-fix340p09fldyqxz.js"), []).then(_ => e(_.verilog)),
        [t.dockerfile]: () => r(() =>
            import ("./67e1b8e1-hg7mcwdmf04in92n.js"), []).then(_ => e(_.dockerFile)),
        [t.other]: () => null
    },
    m = _ => _ in E,
    o = {},
    v = async _ => {
        if (o[_] != null) return o[_];
        if (m(_)) {
            const i = await E[_]();
            return o[_] = i, i
        }
        return null
    },
    L = _ => o[_] ? ? null;
export {
    v as a, L as g
};
//# sourceMappingURL=6cb574fa-ewz4lvzvh0154hdn.js.map