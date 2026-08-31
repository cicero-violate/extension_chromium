# Right-Click Plus + Palette

A small Chromium (Manifest V3) extension that adds two things to every page:

## 1. Context menu — "Right-Click Plus"

| Item | Context | Action |
| --- | --- | --- |
| Search selection… | text selection | Opens the selection as a DuckDuckGo search in the next tab |
| Highlight selection (exact) | text selection | Wraps every exact match of the selection in a coloured `<mark>`. Run again on the same text to remove it. |
| Highlight each word (toggle) | text selection | Highlights every distinct whole word in the selection as one group; run again to clear that group. |
| Copy link URL | link | Copies the link target to the clipboard |
| Image info → src | image | Alerts the image's `src` |

Each highlight run cycles to the next colour in a 12-colour pastel palette.

## 2. Command palette (M-x)

Press **Alt+X** (or click the toolbar icon) to open an Emacs-style command
palette pinned to the top of the page:

- Search / copy selection, copy page URL, copy page as a Markdown link
- Open `view-source:` of the page
- Scroll to top / bottom
- Toggle a quick page invert ("dark mode hack")
- Clear all highlights

Type to filter, `↑`/`↓` or `Tab` to move, `Enter` to run, `Esc` or a click on
the backdrop to close.

## Files

| File | Role |
| --- | --- |
| `manifest.json` | MV3 manifest; registers the content script, command, and toolbar action |
| `background.js` | Service worker: context menu, palette toggle, opening URLs for the palette |
| `content.js` | The injected palette UI and its commands |
| `palette.css` | Palette and highlight styling |

## Install (unpacked)

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. **Load unpacked** → select this folder
