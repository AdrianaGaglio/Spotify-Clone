// endpoint di ricerca
const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const windowUrl = new URLSearchParams(location.search);
const albumId = windowUrl.get("albumID");
console.log(albumId);

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
      console.log(data);
      generateAlbumHero(data);
      generateTracks(data.tracks.data);
      trackList(data.tracks.data);
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
    numOfTracks.innerHTML = `${i + 1} brani, `;
    const trackRow = document.createElement("tr");
    trackRow.innerHTML = `<td class="track-numbers listNum">${i + 1}</td>
        <td class="track-title">
          <div>
            <p id="${i + 1}">${track.title}</p>
            <a href="artist.html?artistID=${track.artist.id}">${track.artist.name}</a>
          </div>
        </td>
        <td class="times-played">
        <p>${new Intl.NumberFormat("it-IT").format(track.rank)}</p>
        </td>
        <td class="track-lenght">
        <p>${Math.trunc(track.duration / 60)}:${seconds}</p>
        </td>`;
    const table = document.querySelector("table");
    table.appendChild(trackRow);

    trackRow.onmouseenter = (event) => {
      const listPlayTrack = event.target.querySelector(".listNum");
      listPlayTrack.innerHTML = `<i class="fa-solid fa-play"></i>`;
    };

    trackRow.onmouseleave = (event) => {
      const listPlayTrack = event.target.querySelector(".listNum");
      listPlayTrack.innerHTML = `${i + 1}`;
    };

    // const selectedTrack = document.getElementById(`${i + 1}`);
    trackRow.onclick = () => {
      const newTrack = new TrackObj(track.title, track.artist.name, track.album.cover_small, track.preview, track.duration);
      localStorage.setItem("track", JSON.stringify(newTrack));
      playTrack();
      switchBtn();
    };
    const artist = document.querySelector(".moreInfo .artist-name");
    artist.setAttribute("href", `artist.html?artistID=${track.artist.id}`);
  });
};

getAlbum();
