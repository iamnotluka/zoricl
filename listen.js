(function () {
  function fmt(seconds) {
    if (!isFinite(seconds) || seconds < 0) seconds = 0;
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ":" + (s < 10 ? "0" + s : s);
  }

  document.querySelectorAll(".listen").forEach(function (el) {
    var btn = el.querySelector(".listen-btn");
    var time = el.querySelector(".listen-time");
    var audio = el.querySelector("audio");
    if (!btn || !audio) return;

    function setPaused() {
      btn.textContent = "▶ listen instead";
    }
    function setPlaying() {
      btn.textContent = "❚❚ playing";
    }

    setPaused();

    btn.addEventListener("click", function () {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });

    audio.addEventListener("play", setPlaying);
    audio.addEventListener("pause", setPaused);

    audio.addEventListener("timeupdate", function () {
      if (time) time.textContent = fmt(audio.currentTime);
    });

    audio.addEventListener("loadedmetadata", function () {
      if (time) time.textContent = fmt(audio.duration);
    });

    audio.addEventListener("ended", function () {
      setPaused();
      if (time) time.textContent = fmt(audio.duration);
    });
  });
})();
