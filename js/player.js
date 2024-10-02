// oggetto track
class TrackObj {
  constructor(_title, _artist, _cover, _track, _duration) {
    this.title = _title;
    this.artist = _artist;
    this.cover = _cover;
    this.track = _track;
    this.duration = _duration;
  }
}

const playTrack = () => {
  const trackInfo = JSON.parse(localStorage.getItem("track"));
  const title = trackInfo.title;
  const artist = trackInfo.artist;
  const cover = trackInfo.cover;
  const track = trackInfo.track;
  const duration = `${Math.trunc(trackInfo.duration / 60)}:${
    trackInfo.duration % 60
  }`;
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

const playPauseBtn = document.querySelector(".playPauseBtn");

const switchBtn = function () {
  if (playerAudio.paused) {
    playerAudio.play();
    playPauseBtn.innerHTML = `<i class="fas fa-pause-circle btnPauseTrack "></i>`;
  } else {
    playerAudio.pause();
    playPauseBtn.innerHTML = `<i class="fas fa-play-circle btnPauseTrack"></i>`;
  }
};

playPauseBtn.addEventListener("click", function () {
  switchBtn();
});

//gestisce il riempimento della barra di Audio-range
const rangeAudio = document.getElementById("rangeAudio");
rangeAudio.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #1ed760 ${value}%, #404040 ${value}%)`;

  playerAudio.volume = value / 100;
});

playTrack();
