# ChatGPT Right Panel Resizer

v1.0.5

This version uses the exact working DevTools logic:

- find the first qualifying ancestor from the "Activity" label
- force that panel to `position: fixed`
- place a fixed 6px drag handle beside it
- resize with `mousedown / mousemove / mouseup`

The only added wrapper is:
- MutationObserver
- resize hook
- periodic refresh

Those re-run the same working logic when ChatGPT replaces the sidebar DOM.

## Install
1. Open `chrome://extensions`
2. Remove older versions or click Reload
3. Load this folder as unpacked, or unzip the archive and load the extracted folder
4. Refresh the ChatGPT tab
5. Drag the thin boundary handle on the left edge of the Activity panel
