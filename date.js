(function () {
  function daysAgo(iso) {
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return null;
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.round((now - d) / 86400000);
  }

  function relative(iso) {
    var n = daysAgo(iso);
    if (n === null || n < 0) return iso;
    if (n === 0) return "today";
    if (n === 1) return "yesterday";
    if (n < 7) return n + " days ago";
    if (n < 14) return "last week";
    if (n < 30) return Math.floor(n / 7) + " weeks ago";
    if (n < 60) return "last month";
    if (n < 365) return Math.floor(n / 30) + " months ago";
    if (n < 730) return "last year";
    return Math.floor(n / 365) + " years ago";
  }

  document.querySelectorAll("time[datetime]").forEach(function (t) {
    var iso = t.getAttribute("datetime");
    t.textContent = relative(iso);
    t.title = iso;
  });
})();
