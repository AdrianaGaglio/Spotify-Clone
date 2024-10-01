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
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

getArtist();
