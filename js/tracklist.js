const trackListArray = [];

const trackList = (tracklist) => {
  tracklist.forEach((track) => {
    const newTrack = new TrackObj(track.title, track.artist.name, track.album.cover_small, track.preview, track.duration);
    trackListArray.push(newTrack);
  });
  localStorage.setItem("tracklist", JSON.stringify(trackListArray));
};

const spotifyBtn = document.querySelector(".spotify-button");
spotifyBtn.addEventListener("click", () => {
  const trackList = JSON.parse(localStorage.getItem("tracklist"));
  let counter = 0;
  const track = trackList[counter];
  localStorage.setItem("track", JSON.stringify(track));
  playTrack();
  switchBtn();
  const audioPlayer = document.getElementById("playerAudio");
  audioPlayer.addEventListener("loadedmetadata", function () {
    // La durata in secondi
    let duration = audioPlayer.duration;
    setInterval(() => {
      let seconds = audioPlayer.currentTime;
      if (duration === seconds) {
        if (counter === trackList.length) {
          counter = 0;
        } else {
          counter++;
        }
        localStorage.setItem("track", JSON.stringify(trackList[counter]));
        playTrack();
        switchBtn();
      }
    }, 1000);
  });
});
