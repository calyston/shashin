//API Key
const auth = "563492ad6f917000010000014b31429f64334d2aa14a12ec09ec7a2d"

//Query Selectors
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const more = document.querySelector('.more');
let searchValue;

//Event Listeners
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

more.addEventListener('click', loadMore);

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
    <div class="gallery-text">
      <p>${photo.photographer}</p>
      <a href=${photo.src.original} target="blank">Download</a>
    </div>`;
    gallery.appendChild(galleryImg);
  });
};

async function curatedPhotos() {
  const data = await fetchAPI("https://api.pexels.com/v1/curated?per_page=15&page=1");
  generatePictures(data);
};

async function searchPhotos(search) {
  clear();
  const data = await fetchAPI(`https://api.pexels.com/v1/search?query=${search}+query&per_page=15&page=1`);
  generatePictures(data);
};

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
};

async function loadMore()

curatedPhotos();
