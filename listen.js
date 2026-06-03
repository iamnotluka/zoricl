(function () {
  function fmt(seconds) {
    if (!isFinite(seconds) || seconds < 0) seconds = 0;
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ":" + (s < 10 ? "0" + s : s);
  }

  document.querySelectorAll(".listen").forEach(function (el) {
    var btn = el.querySelector(".listen-btn");
    var icon = el.querySelector(".listen-icon");
    var time = el.querySelector(".listen-time");
    var audio = el.querySelector("audio");
    if (!btn || !audio) return;

    function showRemaining() {
      if (!time) return;
      var remaining = audio.duration - audio.currentTime;
      time.textContent = fmt(remaining);
    }

    function setPlayIcon() {
      if (icon) icon.textContent = "▶";
    }
    function setPauseIcon() {
      if (icon) icon.textContent = "❚❚";
    }

    setPlayIcon();

    btn.addEventListener("click", function () {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });

    audio.addEventListener("play", setPauseIcon);
    audio.addEventListener("pause", setPlayIcon);

    audio.addEventListener("loadedmetadata", showRemaining);
    audio.addEventListener("timeupdate", showRemaining);

    audio.addEventListener("ended", function () {
      setPlayIcon();
      showRemaining();
    });

    // If metadata is already available (cached), show the total straight away.
    if (audio.readyState >= 1) showRemaining();
  });
})();
