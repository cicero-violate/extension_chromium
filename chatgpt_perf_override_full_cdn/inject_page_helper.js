(function () {
  const id = 'cgpt-perf-react-boundary-helper';
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.src = chrome.runtime.getURL('page_helper.js');
  script.async = false;
  (document.documentElement || document.head || document.body).appendChild(script);
})();
