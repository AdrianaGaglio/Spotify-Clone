const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist";

const addressBarContent = new URLSearchParams(location.search);
const artistId = addressBarContent.get("artistID");

const getArtist = () => {
  fetch(artistUrl + "/" + artistId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((data) => {
      artistDefinition(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const artistDefinition = (data) => {
  const artistH1 = document.querySelector("h1");
  const artistH5 = document.querySelector(".right-column h5");
  const heroH5 = document.querySelector("#hero h5");
  const artistImage = document.querySelector(".group-pic img");
  artistH1.innerText = data.name;
  artistH5.innerText = "Di " + data.name;
  heroH5.innerText = data.nb_fan + " ascoltatori mensili";
  artistImage.src = data.picture_small;
};

const getTracks = () => {
  fetch(artistUrl + "/" + artistId + "/top?limit=5")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((data) => {
      tracksDefinition(data.data);
      trackList(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const tracksDefinition = (tracksArray) => {
  const heroArtistCover = document.querySelector("#hero");
  heroArtistCover.style.backgroundImage = `url(${tracksArray[0].album.cover_xl})`;

  const tableBody = document.querySelector("tbody");
  tracksArray.forEach((track, i) => {
    let seconds = track.duration % 60;
    if (seconds < 10) {
      seconds = "0" + seconds.toString();
    }

    const newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${i + 1}</td>
        <td><img src="${track.album.cover_small}" alt="" /></td>
        <td id="${i + 1}">${track.title}</td>
        <td>${new Intl.NumberFormat("it-IT").format(track.rank)}</td>
        <td>${Math.trunc(track.duration / 60)}:${seconds}</td>`;
    tableBody.appendChild(newRow);

    //collegamento tra il play della lista di canzoni e il player in basso
    const audio = document.getElementById("playerAudio");

    newRow.onmouseenter = (e) => {
      newRow.onclick = () => {
        counter = newRow.querySelector("td:nth-of-type(3)").id - 1;
        // const artistTrack = new TrackObj(track.title, track.artist.name, track.album.cover_small, track.preview, track.duration);
        // if (localStorage.getItem("tracklist")) {
        //   const stringOfTrackList = localStorage.getItem("tracklist");
        //   trackListArray = JSON.parse(stringOfTrackList);
        //   trackListArray.unshift(artistTrack);
        // } else {
        //   trackListArray.push(artistTrack);
        // }
        // localStorage.setItem("tracklist", JSON.stringify(trackListArray));
        handleTrackList();

        // localStorage.setItem("track", JSON.stringify(artistTrack));
        // playTrack();
        // switchBtn();

        const classAdded = document.querySelector(".track-played");
        if (classAdded) {
          //controlla se un elemento ha la classe e se esiste la toglie!
          classAdded.classList.remove("track-played");
        }

        const currentSong = document.querySelector(".song-title").innerHTML;

        if (currentSong === track.title && !audio.paused) {
          newRow.classList.add("track-played");
        }
      };

      const currentSong = document.querySelector(".song-title").innerHTML;

      const playListButton = e.currentTarget.querySelector("td:nth-child(1)");
      if (currentSong === track.title && !audio.paused) {
        playListButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
      } else {
        playListButton.innerHTML = `<i class="fa-solid fa-play"></i>`;
      }
    };

    newRow.onmouseleave = (e) => {
      const playListButton = e.currentTarget.querySelector("td:nth-child(1)");
      playListButton.innerHTML = `${i + 1}`;
    };
  });
};

getArtist();
getTracks();

// evidenzia canzone in riproduzione dalla lista
nextTrack.onclick = () => {
  const currentTrackObj = JSON.parse(localStorage.getItem("track"));
  const currentTitle = currentTrackObj.title;
  const allRows = document.querySelectorAll("tr");
  allRows.forEach((row, i) => {
    const title = row.querySelector("td:nth-of-type(3)").innerHTML;
    console.log(title);
    if (currentTitle === title && !playerAudio.paused) {
      row.classList.add("track-played");
    } else {
      row.classList.remove("track-played");
    }
  });
};

prevTrack.onclick = () => {
  const currentTrackObj = JSON.parse(localStorage.getItem("track"));
  const currentTitle = currentTrackObj.title;
  const allRows = document.querySelectorAll("tr");
  allRows.forEach((row, i) => {
    const title = row.querySelector("td:nth-of-type(3)").innerHTML;
    console.log(title);
    if (currentTitle === title && !playerAudio.paused) {
      row.classList.add("track-played");
    } else {
      row.classList.remove("track-played");
    }
  });
};
