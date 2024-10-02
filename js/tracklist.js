let counter = 0;
const trackListArray = [];

// crea oggetto traccia da aggiungere all'array tracklist
const trackList = (tracklist) => {
  tracklist.forEach((track) => {
    const newTrack = new TrackObj(track.title, track.artist.name, track.album.cover_small, track.preview, track.duration);
    trackListArray.push(newTrack);
  });
  localStorage.setItem("tracklist", JSON.stringify(trackListArray));
};

// gestisce riproduzione tracklist
const handleTrackList = () => {
  const trackList = JSON.parse(localStorage.getItem("tracklist"));
  const track = trackList[counter];
  localStorage.setItem("track", JSON.stringify(track));
  playTrack();
  switchBtn();
  // gestisce il passaggio alla traccia successiva quando finisce la traccai
  const audioPlayer = document.getElementById("playerAudio");
  audioPlayer.addEventListener("loadedmetadata", function () {
    // durata totale della traccia in riproduzione
    let duration = audioPlayer.duration;
    setInterval(() => {
      // secondi correnti della traccia in riproduzione
      let seconds = audioPlayer.currentTime;
      // controlla se i secondi correnti sono uguali alla durata totale
      if (duration === seconds) {
        // controlla se è l'ultima traccia
        if (counter === trackList.length) {
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

const spotifyBtn = document.querySelector(".spotify-button");
spotifyBtn.addEventListener("click", () => {
  handleTrackList();
});

// gestisce passaggio a traccia precedente con pulsante
const prevTrack = document.getElementById("prevTrack");
prevTrack.addEventListener("click", () => {
  // controlla se è la prima traccia
  if (counter === 0) {
    // se si, tornando indietro prende l'ultima della tracklist
    counter = trackListArray.length - 1;
  } else {
    // se no va alla precedente
    counter--;
  }
  handleTrackList();
});

// gestisce passaggio a traccia successiva con pulsante
const nextTrack = document.getElementById("nextTrack");
nextTrack.addEventListener("click", () => {
  // controlla se è l'ultima
  if (counter === trackListArray.length - 1) {
    // se si, va alla prima della tracklist
    counter = 0;
  } else {
    // se no, passa alla successiva
    counter++;
  }
  handleTrackList();
});
