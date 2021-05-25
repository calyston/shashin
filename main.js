//API Key
const auth = "563492ad6f917000010000014b31429f64334d2aa14a12ec09ec7a2d"

//Query Selectors
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const submitButton = document.querySelector('.submit-button');
let searchValue;

//Functions
async function curatedPhotos() {
  const dataFetch = await fetch("https://api.pexels.com/v1/curated?per_page=1", {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: auth
    }
  });
  const data = await dataFetch.json();
  data.photos.forEach(photo => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    galleryImg.innerHTML = `<img src=${photo.src.medium}></img>
    <p>${photo.photographer}</p>`;
    gallery.appendChild(galleryImg);
  });
}

curatedPhotos();
