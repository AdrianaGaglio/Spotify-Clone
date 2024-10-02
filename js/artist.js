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
      // console.log(data);
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
      // console.log(data.data);
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

    const currentSong = document.querySelector(".song-title").innerHTML;
    const audio = document.getElementById("playerAudio");

    newRow.onmouseover = (e) => {
      const playListButton = e.currentTarget.querySelector("td:nth-child(1)");
      playListButton.innerHTML = `<i class="fa-solid fa-play"></i>`;

      // newRow.onclick = () => {
      //   playListButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
      //   const artistTrack = new TrackObj(track.title, track.artist.name, track.album.cover_small, track.preview, track.duration);

      //   localStorage.setItem("track", JSON.stringify(artistTrack));

      //   playTrack();
      //   switchBtn();
      // };
    };

    // newRow.onmouseleave = (e) => {
    //   const playListButton = e.currentTarget.querySelector("td:nth-child(1)");

    //   if (currentSong === track.title && !audio.paused) {
    //     playListButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    //   } else {
    //     playListButton.innerHTML = `${i + 1}`;
    //   }
    // };
  });
};

getArtist();
getTracks();
