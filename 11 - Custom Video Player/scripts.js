const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const toggle = player.querySelector(".toggle");
const slider = player.querySelectorAll(".player__slider");
const skip = player.querySelectorAll("[data-skip]");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const fullScreenButton = player.querySelector(".full__screen");

const toggleVideo = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  //   Alternate way
  //   const method = video.paused ? "play" : "pause";
  //   video[method]();
};

const updateIcon = () => {
  const icon = video.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
};

const handleSkip = (event) => {
  video.currentTime += parseFloat(event.target.dataset.skip);
};

let isSliding = false;
const handleProgress = (event) => {
  if (!isSliding) {
    return;
  }
  video[event.target.name] = event.target.value;
};

const updateProgress = () => {
  const percentProgress = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentProgress}%`;
};

const handleScrub = (event) => {
  const scrubProgress = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubProgress;
};

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

video.addEventListener("click", toggleVideo);
video.addEventListener("play", updateIcon);
video.addEventListener("pause", updateIcon);
toggle.addEventListener("click", toggleVideo);
skip.forEach((skipButton) => skipButton.addEventListener("click", handleSkip));
slider.forEach((control) => control.addEventListener("change", handleProgress));
slider.forEach((control) =>
  control.addEventListener("mousemove", handleProgress)
);
slider.forEach((control) =>
  control.addEventListener("mousedown", () => (isSliding = true))
);
slider.forEach((control) =>
  control.addEventListener("mouseup", () => (isSliding = false))
);
slider.forEach((control) =>
  control.addEventListener("mouseout", () => (isSliding = false))
);

video.addEventListener("timeupdate", updateProgress);

let isScrubbing = false;
progress.addEventListener("click", handleScrub);
progress.addEventListener(
  "mousemove",
  (event) => isScrubbing && handleScrub(event)
);
progress.addEventListener("mousedown", () => (isScrubbing = true));
progress.addEventListener("mouseup", () => (isScrubbing = false));
progress.addEventListener("mouseout", () => (isScrubbing = false));
fullScreenButton.addEventListener("click", toggleFullscreen);
