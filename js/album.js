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
    })
    .catch((error) => {
      console.log(error);
    });
};

const generateAlbumHero = (data) => {
  const albumTitle = data.title;
  const albumCover = data.cover_big;
  const artistCover = data.artist.picture;
  const artistName = data.artist.name;
  const title = document.querySelector(".albumName h1");
  title.innerText = `${albumTitle}`;
  const albumImg = document.querySelector(".albumInfo img");
  albumImg.src = albumCover;
  const artistLogo = document.querySelector(".moreInfo img");
  artistLogo.src = artistCover;
  const artist = document.querySelector(".moreInfo .artist-name");
  artist.innerText = `${artistName}`;
};

const generateTracks = (allTracks) => {
  const numOfTracks = document.querySelector(".numOfTracks");
  allTracks.forEach((track, i) => {
    numOfTracks.innerHTML = `${i} brani, <span style="color: rgba(255, 255, 255, 0.678)">${track.duration}</span>`;
    const trackRow = document.createElement("tr");
    trackRow.innerHTML = `<td class="track-numbers">${i + 1}</td>
        <td class="track-title">
          <div>
            <p>${track.title}</p>
            <p>${track.artist.name}</p>
          </div>
        </td>
        <td class="times-played">${track.rank}</td>
        <td class="track-lenght">${track.duration}</td>`;
    const table = document.querySelector("table");
    table.appendChild(trackRow);
  });
};

getAlbum();
