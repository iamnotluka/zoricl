(function () {
  var img = document.querySelector("#gh-chart-img");
  if (!img) return;

  var src = img.getAttribute("src");
  var proxies = [
    "https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(src),
    "https://api.allorigins.win/raw?url=" + encodeURIComponent(src)
  ];
  var maxAttemptsPerProxy = 2;
  var baseDelayMs = 400;

  function attempt(proxyIdx, n) {
    if (proxyIdx >= proxies.length) {
      console.warn("[chart.js] all proxies exhausted");
      return;
    }
    var ctrl = new AbortController();
    var timeout = setTimeout(function () { ctrl.abort(); }, 6000);

    fetch(proxies[proxyIdx], { signal: ctrl.signal })
      .then(function (r) {
        clearTimeout(timeout);
        return r.ok ? r.text() : Promise.reject("HTTP " + r.status);
      })
      .then(install)
      .catch(function (err) {
        clearTimeout(timeout);
        if (!document.querySelector("#gh-chart-img")) return;
        if (n < maxAttemptsPerProxy) {
          setTimeout(function () { attempt(proxyIdx, n + 1); }, baseDelayMs * n);
        } else {
          console.warn("[chart.js] proxy " + proxyIdx + " failed:", err);
          attempt(proxyIdx + 1, 1);
        }
      });
  }

  function install(text) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(text, "image/svg+xml");
    var svg = doc.documentElement;
    if (svg.nodeName.toLowerCase() !== "svg") throw new Error("bad svg");

    svg.querySelectorAll("text").forEach(function (t) { t.remove(); });

    svg.querySelectorAll("rect").forEach(function (r) {
      r.setAttribute("width", "6");
      r.setAttribute("height", "6");
    });

    svg.setAttribute("viewBox", "27 20 636 84");
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.setAttribute("preserveAspectRatio", "xMinYMin meet");
    svg.setAttribute("class", "gh-chart-svg");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", img.getAttribute("alt") || "GitHub contributions");

    var current = document.querySelector("#gh-chart-img");
    if (current && current.parentNode) current.parentNode.replaceChild(svg, current);
  }

  attempt(0, 1);
})();


