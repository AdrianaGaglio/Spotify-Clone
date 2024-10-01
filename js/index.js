// endpoint di ricerca
const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
// artisti predefiniti per aggiornare la pagina al caricamento )
const previewArray = ["radiohead", "led zeppelin", "beatles", "jamiroquay", "queen"];

const indexPreview = () => {
  // ciclo l'array di artisti per la preview
  for (let i = 0; i < previewArray.length; i++) {
    // concateno la url e il nome dell'artista
    fetch(searchUrl + previewArray[i])
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((data) => {
        // chiamo la funzione per la generazione delle card degli album (sezione "altro di ciò che ti piace")
        generateAlbumCards(data.data);
        // chiamo la funzione per la generazione delle card degli album (sezione "i tuoi artisti preferiti")
        generateArtistCards(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// const heroSection = () => {}; // TODO

const generateAlbumCards = (data) => {
  // genero randomicamente un indice tra 0 e 4 (serve per mostrare in ordine sempre diverso le card nella pagina)
  const index = Math.floor(Math.random() * 5);
  // seleziono l'album e l'artista in base all'indice generato
  const artist = data[index].artist;
  const album = data[index].album;
  // seleziono l'elemento HTML dove inserire le card
  const albums = document.querySelector(".albums");
  // creo la card
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
  // aggiungo la card creata all'HTML
  albums.appendChild(cardWrapper);
};

const generateArtistCards = (data) => {
  // genero randomicamente un indice tra 0 e 4 (serve per mostrare in ordine sempre diverso le card nella pagina)
  const index = Math.floor(Math.random() * 5);
  // seleziono l'artista in base all'indice generato
  const artist = data[index].artist;
  const artists = document.querySelector(".artists");
  // genero la card
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card-wrapper");
  cardWrapper.innerHTML = `
    <div class="card">
      <img src="${artist.picture_medium}" alt="" />
      <div class="card-body">
          <a href="./artist.html?artistID=${artist.id}"><h6 class="playlist-title" title="${artist.name}">${artist.name}</h6></a>
      </div>
    `;
  // aggiungo la card all'HTML
  artists.appendChild(cardWrapper);
};

indexPreview();
