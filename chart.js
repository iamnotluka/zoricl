(function () {
  var img = document.querySelector("#gh-chart-img");
  if (!img) return;

  var src = img.getAttribute("src");
  var proxied = "https://api.allorigins.win/raw?url=" + encodeURIComponent(src);
  var maxAttempts = 4;
  var baseDelayMs = 400;

  function attempt(n) {
    var ctrl = new AbortController();
    var timeout = setTimeout(function () { ctrl.abort(); }, 5000);

    fetch(proxied, { signal: ctrl.signal })
      .then(function (r) {
        clearTimeout(timeout);
        return r.ok ? r.text() : Promise.reject("HTTP " + r.status);
      })
      .then(install)
      .catch(function (err) {
        clearTimeout(timeout);
        if (n < maxAttempts && document.querySelector("#gh-chart-img")) {
          setTimeout(function () { attempt(n + 1); }, baseDelayMs * n);
        } else {
          console.warn("[chart.js] gave up after " + n + " tries:", err);
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

  attempt(1);
})();


