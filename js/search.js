const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const artistTracklist = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const windowUrl = new URLSearchParams(location.search);
const searchKeyWord = windowUrl.get("searchKeyWord");

const getSearchResult = (keyWord) => {
  fetch(searchUrl + keyWord)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((searchObj) => {
      getSearch(searchObj.data);
      relatedAlbumsRow(searchObj.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getArtistTopTracks = (artistID) => {
  fetch(artistTracklist + artistID + "/top?limit=20")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((topTracks) => {
      console.log(topTracks.data);
      showTopTracks(topTracks.data);
      trackList(topTracks.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getSearch = (searchResult) => {
  const image = searchResult[0].artist.picture;
  const name = searchResult[0].artist.name;
  const artistName = document.querySelector(".results h4");
  artistName.innerHTML = "The Best of " + name;
  const artistImg = document.querySelector(".results img");
  artistImg.src = image;
  const artistID = searchResult[0].artist.id;
  getArtistTopTracks(artistID);
};

const showTopTracks = (topTracks) => {
  const tracksContainer = document.querySelector(".tracks");
  tracksContainer.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    const singleTrack = topTracks[i];
    const trackDiv = document.createElement("div");
    trackDiv.classList.add("single-track");
    const seconds = singleTrack.duration % 60;
    if (seconds < 10) {
      seconds = "0" + seconds.toString();
    }
    trackDiv.innerHTML = `
    <img src="${singleTrack.album.cover}" alt="${singleTrack.album.title}" />
    <div>
        <h5>${singleTrack.title}</h5>
        <p>${singleTrack.artist.name}</p>
    </div>
    <div>
        <p>${Math.trunc(singleTrack.duration / 60)}:${seconds}</p>
    </div>
    `;
    tracksContainer.appendChild(trackDiv);
    trackDiv.addEventListener("click", () => {
      counter = i;
      handleTrackList();
    });
  }
};

const relatedAlbumsRow = (relatedAlbums) => {
  const albumRow = document.querySelector(".album-row");
  albumRow.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const singleAlbum = relatedAlbums[i];
    const albumDiv = document.createElement("div");
    albumDiv.innerHTML = `
<div>
  <div class="albums-poster">
  <a href="./album.html?albumID=${singleAlbum.album.id}"><img src="${singleAlbum.album.cover}" alt="album poster" /></a>
  <p><a href="./album.html?albumID=${singleAlbum.album.id}">${singleAlbum.album.title}</a></p>
  <p> <a href="./artist.html?artistID=${singleAlbum.artist.id}">${singleAlbum.artist.name}</a></p>
  </div>
</div>
              `;
    albumRow.appendChild(albumDiv);
  }
};

const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = document.querySelector("input").value;
  getSearchResult(inputValue);
  form.reset();
});

getSearchResult(searchKeyWord);

const highlightCurrent = () => {
  const currentTrackObj = JSON.parse(localStorage.getItem("track"));
  const currentTitle = currentTrackObj.title;
  const allRows = document.querySelectorAll(".single-track");
  allRows.forEach((row, i) => {
    const title = row.querySelector("h5").innerHTML;
    if (currentTitle === title && !playerAudio.paused) {
      row.classList.add("track-played");
    } else {
      row.classList.remove("track-played");
    }
  });
};

prevTrack.addEventListener("click", () => {
  highlightCurrent();
});

nextTrack.addEventListener("click", () => {
  highlightCurrent();
});

playPauseBtn.addEventListener("click", () => {
  highlightCurrent();
});
