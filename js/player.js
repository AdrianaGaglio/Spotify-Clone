let trackListArray = [];

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
  const title = JSON.parse(localStorage.getItem("track")).title;
  const artist = trackInfo.artist;
  const cover = trackInfo.cover;
  const track = trackInfo.track;
  const seconds = trackInfo.duration % 60;
  let formattedSeconds;
  if (seconds < 10) {
    formattedSeconds = "0" + seconds;
  } else {
    formattedSeconds = seconds;
  }
  const duration = `${Math.trunc(trackInfo.duration / 60)}:${formattedSeconds}`;
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

  // gestisce il passaggio alla traccia successiva quando finisce la traccia
  playerAudio.addEventListener("loadedmetadata", function () {
    // durata totale della traccia in riproduzione
    let duration = playerAudio.duration;
    let progressWidth = 0;
    setInterval(() => {
      // secondi correnti della traccia in riproduzione
      let seconds = playerAudio.currentTime;
      progressWidth = Math.trunc((100 * seconds) / duration);
      const progressBar = document.querySelector(".progress-bar > div");
      progressBar.style.width = `${progressWidth}%`;
      // controlla se i secondi correnti sono uguali alla durata totale
      if (duration === seconds) {
        // controlla se è l'ultima traccia
        if (counter === trackList.length - 1) {
          // se si, riparte dalla prima
          counter = 0;
        } else {
          // se no, incrementa l'indice per passaggio a traccia successiva
          counter++;
        }
        // mette la traccia da playare in localstorage e chiama le funzioni per il play
        localStorage.setItem("track", JSON.stringify(trackList[counter]));
        playTrack();
        switchBtn();
      }
    }, 1000);
  });
};

const playPauseBtn = document.querySelector(".playPauseBtn");

const switchBtn = function () {
  if (playerAudio.paused) {
    playerAudio.play();
    // const loopButton = document.querySelector(".loopButton");
    // loopButton.addEventListener("click", () => {
    //   loopButton.classList.toggle("activeButton");
    //   playerAudio.loop = !playerAudio.loop; // Alterna tra ripetere o no la traccia
    // });
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

window.onload = () => {
  if (JSON.parse(localStorage.getItem("track")) === null) {
    const tempTrack = new TrackObj(
      "Layla",
      "Eric Clapton",
      "https://e-cdns-images.dzcdn.net/images/cover/196eaf4d3f7437f744a71d867a543dbb/56x56-000000-80-0-0.jpg",
      "https://cdnt-preview.dzcdn.net/api/1/1/8/c/6/0/8c6110d6bd9691315006fc185d53ab2c.mp3?hdnea=exp=1727969139~acl=/api/1/1/8/c/6/0/8c6110d6bd9691315006fc185d53ab2c.mp3*~data=user_id=0,application_id=42~hmac=f52ea3fae2f6b286b76cf3e802a5bc60c31fb26061c166d4d42085cdd92dd3f5",
      357
    );
    localStorage.setItem("track", JSON.stringify(tempTrack));
    playTrack();
  } else {
    playTrack();
  }
};
