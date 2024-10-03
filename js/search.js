const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=queen";

const getSearchResult = () => {
  fetch(searchUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((searchObj) => {
      console.log(searchObj.data);
      getSearch(searchObj.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getSearch = (searchResult) => {
  const image = searchResult[0].artist.picture;
  const name = searchResult[0].artist.name;
  const artistName = document.querySelector(".results h4");
  artistName.innerHTML = name;
  const artistImg = document.querySelector(".results img");
  artistImg.src = image;
};

getSearchResult();
