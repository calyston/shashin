//API Key
const auth = "563492ad6f917000010000014b31429f64334d2aa14a12ec09ec7a2d"

//Query Selectors
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;

//Event Listeners
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

//Functions

function updateInput(e) {
  searchValue = e.target.value;
};

async function fetchAPI(url) {
  const dataFetch = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: auth
    }
  });
  const data = await dataFetch.json();
  return data;
};

function generatePictures(data) {
  data.photos.forEach(photo => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    galleryImg.innerHTML = `<img src=${photo.src.medium}></img>
    <p>${photo.photographer}</p>`;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  const data = await fetchAPI("https://api.pexels.com/v1/curated?per_page=16&page=1");
  generatePictures(data);
}

async function searchPhotos(search) {
  const data = await fetchAPI(`https://api.pexels.com/v1/search?query=${search}+query&per_page=16&page=1`);
  generatePictures(data);
}

curatedPhotos();
searchPhotos();
