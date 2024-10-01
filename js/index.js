const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const previewArray = ["radiohead", "led zeppelin", "beatles", "jamiroquay", "queen"];

const indexPreview = () => {
  for (let i = 0; i < previewArray.length; i++) {
    fetch(searchUrl + previewArray[i])
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((data) => {
        generateAlbumCards(data.data);
        generateArtistCards(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const heroSection = () => {};

const generateAlbumCards = (data) => {
  const index = Math.floor(Math.random() * 5);
  const artist = data[index].artist;
  const album = data[index].album;
  const albums = document.querySelector(".albums");
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card-wrapper");
  cardWrapper.innerHTML = `
    <div class="card">
      <img src="${album.cover_medium}" alt="" />
      <div class="card-body">
          <a href="./album.html?albumID=${album.id}"><h6 class="playlist-title" title="${album.title}">${album.title}</h6></a>
          <a href="./artist.html?artistID=${artist.id}"><p class="playlist-artist">${artist.name}</p></a>
      </div>
    `;
  albums.appendChild(cardWrapper);
};

const generateArtistCards = (data) => {
  const index = Math.floor(Math.random() * 5);
  const artist = data[index].artist;
  const artists = document.querySelector(".artists");
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card-wrapper");
  cardWrapper.innerHTML = `
    <div class="card">
      <img src="${artist.picture_medium}" alt="" />
      <div class="card-body">
          <a href="./artist.html?artistID=${artist.id}"><h6 class="playlist-title" title="${artist.name}">${artist.name}</h6></a>
      </div>
    `;
  artists.appendChild(cardWrapper);
};

indexPreview();

//gestisce il riempimento della barra di imput-range
const rangeInput = document.getElementById("progress-bar");

rangeInput.addEventListener("input", function () {
  const value = this.value;

  this.style.background = `linear-gradient(to right, #1ed760 ${value}%, #404040 ${value}%)`;
});
