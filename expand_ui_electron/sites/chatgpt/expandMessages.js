// /expand_ui/sites/chatgpt/expandMessages.js
console.log("loading expandMessages.js");
window.ExpandMessages = {
    expandMessages: function () {
        // Set maxWidth to "none" for EVERY element on the page
        document.querySelectorAll("*").forEach(e => e.style.maxWidth = "none");
    },
};
