// endpoint di ricerca
const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const windowUrl = new URLSearchParams(location.search);
const albumId = windowUrl.get("albumID");

const getAlbum = () => {
  fetch(albumUrl + albumId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore!");
      }
    })
    .then((data) => {
      generateAlbumHero(data);
      generateTracks(data.tracks.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

//  qui rendo dinamico l'hero di ogni album
const generateAlbumHero = (data) => {
  const albumTitle = data.title;
  const albumCover = data.cover_big;
  const artistCover = data.artist.picture;
  const artistName = data.artist.name;
  const albumDuration = data.duration;
  const title = document.querySelector(".albumName h1");
  title.innerText = `${albumTitle}`;
  const albumImg = document.querySelector(".albumInfo img");
  albumImg.src = albumCover;
  const artistLogo = document.querySelector(".moreInfo img");
  artistLogo.src = artistCover;
  const artist = document.querySelector(".moreInfo .artist-name");
  artist.innerText = `${artistName}`;
  const durationAllTracks = document.querySelector(".album-duration");
  let seconds = albumDuration % 60;
  if (seconds < 10) {
    seconds = "0" + seconds.toString();
  }

  if (albumDuration < 3600) {
    durationAllTracks.innerHTML = `${Math.trunc(albumDuration / 60)} min ${seconds} sec.`;
  } else {
    durationAllTracks.innerHTML = `${Math.trunc(albumDuration / 3600)} h ${Math.trunc((albumDuration % 3600) / 60)} min ${seconds} sec.`;
  }
};

// qui rendo dinamiche le traccie di ogni album
const generateTracks = (allTracks) => {
  const numOfTracks = document.querySelector(".numOfTracks");
  allTracks.forEach((track, i) => {
    let seconds = track.duration % 60;
    if (seconds < 10) {
      seconds = "0" + seconds.toString();
    }
    numOfTracks.innerHTML = `${i} brani, `; //i e non (i+1) perchè c'è una riga vuota in più per creare lo spazio sopra la prima riga
    const trackRow = document.createElement("tr");
    trackRow.innerHTML = `<td id="${i + 1}" class="track-numbers listNum">${i + 1}</td>
        <td class="track-title">
            <p id="${i + 1}">${track.title}</p>
            <a href="artist.html?artistID=${track.artist.id}">${track.artist.name}</a>
        </td>
        <td class="times-played">
        <p>${new Intl.NumberFormat("it-IT").format(track.rank)}</p>
        </td>
        <td class="track-lenght">
        <p>${Math.trunc(track.duration / 60)}:${seconds}</p>
        </td>`;
    const table = document.querySelector("table");
    table.appendChild(trackRow);

    const audio = document.getElementById("playerAudio");

    trackRow.onmouseenter = (e) => {
      trackRow.onclick = () => {
        trackList(allTracks);
        counter = trackRow.querySelector("td").id - 1;
        // const newTrack = new TrackObj(track.title, track.artist.name, track.album.cover_small, track.preview, track.duration);
        // localStorage.setItem("track", JSON.stringify(newTrack));
        // playTrack();
        // switchBtn();
        handleTrackList();
        if (document.querySelector(".track-played")) {
          //controlla se un elemento ha la classe e se esiste la toglie!
          const classAdded = document.querySelector(".track-played");
          classAdded.classList.remove("track-played");
        }
        const currentSong = document.querySelector(".song-title").innerHTML;

        if (currentSong === track.title && !audio.paused) {
          trackRow.classList.add("track-played");
        }
      };

      const currentSong = document.querySelector(".song-title").innerHTML;

      const listPlayTrack = e.target.querySelector(".listNum");
      if (currentSong === track.title && !audio.paused) {
        listPlayTrack.innerHTML = `<i class="fa-solid fa-pause"></i>`;
      } else {
        listPlayTrack.innerHTML = `<i class="fa-solid fa-play"></i>`;
      }
    };

    trackRow.onmouseleave = (e) => {
      const listPlayTrack = e.currentTarget.querySelector(".listNum");
      listPlayTrack.innerHTML = `${i + 1}`;
    };
  });
};

getAlbum();

//animazione della barra di ricerca
const searchLink = document.getElementById("searchBar");
searchLink.addEventListener("click", () => {
  const searchModal = document.querySelector(".search-modal");
  searchModal.classList.add("add-animation");
  const searchForm = document.querySelector(".search-modal form");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = document.getElementById("search-input").value;
    location.href = `./search.html?searchKeyWord=${inputValue}`;
  });
});

const highlightTrack = () => {
  const currentTrackObj = JSON.parse(localStorage.getItem("track"));
  const currentTitle = currentTrackObj.title;
  const allRows = document.querySelectorAll("tr");
  console.log(allRows);
  for (let i = 2; i < allRows.length; i++) {
    row = allRows[i];
    const title = row.querySelector("td:nth-of-type(2) p").innerHTML;
    console.dir(title);
    if (currentTitle === title && !playerAudio.paused) {
      row.classList.add("track-played");
    } else {
      row.classList.remove("track-played");
    }
  }
};

// evidenzia canzone in riproduzione dalla lista
nextTrack.addEventListener("click", () => {
  highlightTrack();
});

prevTrack.addEventListener("click", () => {
  highlightTrack();
});

playPauseBtn.addEventListener("click", () => {
  highlightTrack();
});
