console.log("running grok content.js");

let expandTimeout;
function debouncedExpand() {
  clearTimeout(expandTimeout);
  expandTimeout = setTimeout(() => {
    window.ExpandMessages.expandMessages();
  }, 100);
}

// Initial expansion
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", debouncedExpand);
} else {
  debouncedExpand();
}

// Watch for new messages
const observer = new MutationObserver((mutations) => {
  let hasNewContent = false;
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      hasNewContent = true;
    }
  });
  if (hasNewContent) {
    debouncedExpand();
  }
});

// Start observing when DOM is ready
function startObserver() {
  const targetNode = document.body || document.documentElement;
  observer.observe(targetNode, {
    childList: true,
    subtree: true
  });
}

if (document.body) {
  startObserver();
} else {
  document.addEventListener("DOMContentLoaded", startObserver);
}
