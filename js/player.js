// gestisce il riempimento della barra di imput-range
const rangeInput = document.getElementById("progress-bar");

rangeInput.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #1ed760 ${value}%, #404040 ${value}%)`;
});

const playTrack = () => {
  const trackInfo = JSON.parse(localStorage.getItem("track"));
  const title = trackInfo.title;
  const artist = trackInfo.artist;
  const cover = trackInfo.cover;
  const track = trackInfo.track;
  const duration = `${Math.trunc(trackInfo.duration / 60)}:${trackInfo.duration % 60}`;
  const trackTitle = document.querySelector(".song-title");
  trackTitle.innerText = title;
  const trackArtist = document.querySelector(".song-artist");
  trackArtist.innerText = artist;
  const trackCover = document.querySelector(".song-info img");
  trackCover.src = cover;
  const trackDuration = document.querySelector(".time");
  trackDuration.innerText = duration;
  const playerAudio = document.getElementById("playerAudio");
  const playerTrack = playerAudio.querySelector("source");
  playerTrack.src = track;
  playerAudio.load();
};

playTrack();
