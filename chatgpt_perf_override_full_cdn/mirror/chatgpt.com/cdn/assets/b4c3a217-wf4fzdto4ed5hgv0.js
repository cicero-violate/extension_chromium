import {
    a6 as l,
    a7 as o,
    a8 as h
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    unified as p
} from "./f6f4f1b2-gtlbp7j4szobo0y1.js";
import {
    r as u
} from "./1bc04b52-hg3ptm9pgpi9lcut.js";
const i = "codex-file-citation",
    s = "codex-terminal-citation",
    n = "task-stub",
    c = "codex-image-citation",
    g = () => _ => {
        l(_, t => {
            if (!o(t)) return;
            const a = t.data ? ? (t.data = {});
            switch (t.name) {
                case i:
                    {
                        a.hName = i;
                        const r = parseInt(t.attributes ? .line_range_start ? ? "0", 10),
                            e = parseInt(t.attributes ? .line_range_end ? ? t.attributes ? .line_range_start ? ? "0", 10);a.hProperties = {
                            path: t.attributes ? .path,
                            lineRangeStart: r,
                            lineRangeEnd: e,
                            gitUrl: t.attributes ? .git_url
                        };
                        break
                    }
                case s:
                    {
                        a.hName = s;
                        const r = parseInt(t.attributes ? .line_range_start ? ? "0", 10),
                            e = parseInt(t.attributes ? .line_range_end ? ? t.attributes ? .line_range_start ? ? "0", 10);a.hProperties = {
                            chunkId: t.attributes ? .terminal_chunk_id,
                            lineRangeStart: r,
                            lineRangeEnd: e
                        };
                        break
                    }
                case n:
                    {
                        let r;
                        try {
                            r = p().use(u).stringify({
                                type: "root",
                                children: t.children
                            })
                        } catch {
                            r = h({
                                type: "root",
                                children: t.children ? ? []
                            })
                        }
                        a.hName = n,
                        a.hProperties = {
                            title: t.attributes ? .title,
                            prompt: r
                        };
                        break
                    }
                case c:
                    {
                        a.hName = c,
                        a.hProperties = {
                            assetPointer: t.attributes ? .asset_pointer
                        };
                        break
                    }
            }
        })
    };
export {
    c as W, i as a, s as b, n as c, g as r
};
//# sourceMappingURL=b4c3a217-wf4fzdto4ed5hgv0.js.map