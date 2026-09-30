import {
    R as s,
    v as t,
    bj as i,
    w2 as d
} from "./4813494d-javwxs2rmzsrunl2.js";
async function c(a, o, r, n) {
    const e = n ? await s.safeGet("/share/{shared_conversation_id}/file_from_message/{message_id}", {
        parameters: {
            path: {
                shared_conversation_id: o,
                message_id: a
            },
            query: {
                file_path: r
            }
        },
        authOption: t.SendIfAvailable
    }) : await s.safeGet("/conversation/{conversation_id}/interpreter/download", {
        parameters: {
            path: {
                conversation_id: o
            },
            query: {
                message_id: a,
                sandbox_path: r
            }
        }
    });
    if (e.status === i.Success) return e;
    throw new d("Could not download file from advanced data analysis", "error_code" in e ? e.error_code : "unknown_error")
}
export {
    c as d
};
//# sourceMappingURL=19ad7347-lm1i0g09rrp3wf61.js.map