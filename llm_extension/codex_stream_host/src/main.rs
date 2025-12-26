use serde_json::Value;
use std::fs::OpenOptions;
use std::io::{self, Read, Write};
use std::os::unix::fs::OpenOptionsExt;

fn read_message() -> io::Result<Option<Value>> {
    let mut len_buf = [0u8; 4];
    if io::stdin().read_exact(&mut len_buf).is_err() {
        return Ok(None); // no more messages
    }
    let msg_len = u32::from_le_bytes(len_buf) as usize;
    let mut buf = vec![0u8; msg_len];
    io::stdin().read_exact(&mut buf)?;
    let v: Value = serde_json::from_slice(&buf)?;
    Ok(Some(v))
}

fn write_message(v: &Value) -> io::Result<()> {
    let out = serde_json::to_vec(v)?;
    let len = (out.len() as u32).to_le_bytes();
    io::stdout().write_all(&len)?;
    io::stdout().write_all(&out)?;
    io::stdout().flush()?;
    Ok(())
}

fn main() -> io::Result<()> {
    let log_path = "/home/cicero-arch-omen/ai_sandbox/extension_chromium/llm_extension/streams/chatgpt_f_conversation.msgpack";
    let mut file = OpenOptions::new()
        .create(true)
        .append(true)
        .mode(0o644)
        .open(log_path)?;

    loop {
        match read_message()? {
            Some(msg) => {
                // convert JSON Value -> MessagePack bytes
                let mut buf = Vec::new();
                rmp_serde::encode::write(&mut buf, &msg).unwrap();

                // append raw msgpack frame to file
                file.write_all(&buf)?;
                file.flush()?; // optional: remove for speed

                // optional ack back to Chrome (not required)
                let ack = serde_json::json!({ "ok": true, "size": buf.len() });
                let _ = write_message(&ack);
            }
            None => break,
        }
    }

    Ok(())
}
