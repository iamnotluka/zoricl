(function () {
  var img = document.querySelector("#gh-chart-img");
  if (!img) return;

  var src = img.getAttribute("src");
  var proxied = "https://api.allorigins.win/raw?url=" + encodeURIComponent(src);

  fetch(proxied)
    .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
    .then(function (text) {
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

      img.parentNode.replaceChild(svg, img);
    })
    .catch(function () {
      // Leave the <img> in place as fallback.
    });
})();

