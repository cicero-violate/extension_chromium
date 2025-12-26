use anyhow::{Context, Result};
use clap::{Parser, ValueEnum};
use rmp_serde::decode::Error as RmpError;
use serde_json::Value;
use std::fs::File;
use std::io::Write;
use std::io::{Read, Seek, SeekFrom};
use std::path::PathBuf;
use std::thread;
use std::time::Duration;

/// Tail concatenated MessagePack objects as the file grows.
#[derive(Parser, Debug)]
#[command(version, about)]
struct Args {
    /// Path to the .msgpack stream file
    path: PathBuf,

    /// Start from end (like tail -f) instead of from beginning
    #[arg(long)]
    from_end: bool,

    /// Output format
    #[arg(long, value_enum, default_value_t = Format::Pretty)]
    format: Format,

    /// Poll interval while waiting for more bytes
    #[arg(long, default_value_t = 120)]
    ms: u64,
}

#[derive(Copy, Clone, Debug, ValueEnum)]
enum Format { Pretty, Compact }

fn main() -> Result<()> {
    let args = Args::parse();
    tail_msgpack(args)
}

fn tail_msgpack(args: Args) -> Result<()> {
    let mut f = File::open(&args.path)
        .with_context(|| format!("open {:?}", args.path))?;

    // where to start
    let mut offset = if args.from_end {
        f.seek(SeekFrom::End(0))?
    } else {
        0
    };

    // rolling buffer we keep filling as file grows
    let mut buf = Vec::<u8>::new();
    let mut consumed = 0usize; // number of bytes we've successfully decoded from buf

    loop {
        // read any new bytes from file into buf
        let new_len = refill(&mut f, offset, &mut buf)?;
        offset += new_len as u64;

        // try to decode as many consecutive msgpack objects as possible
        loop {
            let slice = &buf[consumed..];
            if slice.is_empty() { break; }

            match decode_one(slice) {
                Ok((val, used)) => {
                    print_val(&val, args.format);
                    consumed += used;
                }
                Err(DecodeStatus::NeedMore) => {
                    // we don't have a full object yet; wait for more bytes
                    break;
                }
                Err(DecodeStatus::Corrupt(e)) => {
                    eprintln!("!! decode error at {}: {e}", consumed);
                    // best effort recovery: drop one byte and continue
                    consumed += 1;
                }
            }
        }

        // GC old bytes we've already consumed to keep memory bounded
        if consumed > 0 {
            buf.drain(0..consumed);
            consumed = 0;
        }

        // sleep a little before polling for more bytes
        thread::sleep(Duration::from_millis(args.ms));
    }
}

/// Read all newly appended bytes since last offset into `buf`.
fn refill(f: &mut File, offset: u64, buf: &mut Vec<u8>) -> Result<usize> {
    f.seek(SeekFrom::Start(offset))?;
    let mut tmp = Vec::with_capacity(64 * 1024);
    let n = f.read_to_end(&mut tmp)?;
    if n > 0 { buf.extend_from_slice(&tmp); }
    Ok(n)
}

enum DecodeStatus { NeedMore, Corrupt(String) }

/// Attempt to decode one msgpack value from `bytes`.
/// Returns (value, bytes_consumed) on success.
fn decode_one(bytes: &[u8]) -> Result<(Value, usize), DecodeStatus> {
    // rmp-serde needs a Read; we give it a cursor over the slice
    let mut cursor = std::io::Cursor::new(bytes);
    match rmp_serde::from_read::<_, Value>(&mut cursor) {
        Ok(v) => {
            let used = cursor.position() as usize;
            Ok((v, used))
        }
        Err(err) => match err {
            // When we don't have enough bytes for a full object, rmp-serde frequently
            // reports `InvalidMarkerRead` or `InvalidDataRead` wrapping an unexpected EOF.
            RmpError::InvalidMarkerRead(e) | RmpError::InvalidDataRead(e) => {
                if e.kind() == std::io::ErrorKind::UnexpectedEof {
                    Err(DecodeStatus::NeedMore)
                } else {
                    Err(DecodeStatus::Corrupt(format!("{e:?}")))
                }
            }
            RmpError::Syntax(..) | RmpError::TypeMismatch(..) => {
                Err(DecodeStatus::Corrupt(format!("{err}")))
            }
            other => {
                // best guess: more bytes needed
                let s = other.to_string();
                if s.contains("unexpected EOF") {
                    Err(DecodeStatus::NeedMore)
                } else {
                    Err(DecodeStatus::Corrupt(s))
                }
            }
        },
    }
}

fn print_val(v: &Value, fmt: Format) {
    match fmt {
        Format::Pretty => {
            println!("{}", serde_json::to_string_pretty(v).unwrap_or_else(|_| "<bad-json>".into()));
        }
        Format::Compact => {
            println!("{}", serde_json::to_string(v).unwrap_or_else(|_| "<bad-json>".into()));
        }
    }
    // flush so you see output immediately
    let _ = std::io::stdout().flush();
}
