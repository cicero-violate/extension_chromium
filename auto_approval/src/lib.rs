/// Scores a visible sibling button near a visible Deny button.
/// The browser content script uses this score before auto-clicking.
///
/// Return values:
/// - negative: reject
/// - positive: candidate score
#[no_mangle]
pub extern "C" fn approval_hint_score(
    same_row: i32,
    enabled: i32,
    primary: i32,
    right_of_deny: i32,
    deny_label_match: i32,
    label_kind: i32,
    distance_times_100: i32,
    row_text_len: i32,
) -> i32 {
    if same_row == 0 || enabled == 0 || deny_label_match == 0 {
        return -10_000;
    }

    // label_kind: 0 unknown, 1 positive action, 2 negative action.
    if label_kind == 2 {
        return -10_000;
    }

    let mut score = 1_000i32;

    if primary != 0 {
        score += 500;
    }
    if right_of_deny != 0 {
        score += 300;
    }
    if label_kind == 1 {
        score += 250;
    }

    score -= distance_times_100 / 100;

    if row_text_len > 800 {
        score -= 200;
    } else if row_text_len > 400 {
        score -= 75;
    }

    score
}

#[no_mangle]
pub extern "C" fn approval_hint_threshold() -> i32 {
    800
}
