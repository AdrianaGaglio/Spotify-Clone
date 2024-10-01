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

//  qui rendo dinamico l'hero di ogni album
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

// qui rendo dinamiche le traccie di ogni album
const generateTracks = (allTracks) => {
  const numOfTracks = document.querySelector(".numOfTracks");
  allTracks.forEach((track, i) => {
    let seconds = track.duration % 60;
    if (seconds < 10) {
      seconds = "0" + seconds.toString();
    }
    numOfTracks.innerHTML = `${i + 1} brani`;
    const trackRow = document.createElement("tr");
    trackRow.innerHTML = `<td class="track-numbers">${i + 1}</td>
        <td class="track-title">
          <div>
            <p>${track.title}</p>
            <p>${track.artist.name}</p>
          </div>
        </td>
        <td class="times-played">${new Intl.NumberFormat("it-IT").format(track.rank)}</td>
        <td class="track-lenght">${Math.trunc(track.duration / 60)}:${seconds}</td>`;
    const table = document.querySelector("table");
    table.appendChild(trackRow);
  });
};

getAlbum();

{
  /* <span style="color: rgba(255, 255, 255, 0.678)">${Math.trunc(track.duration / 60)} min ${seconds} sec.</span> */
}
