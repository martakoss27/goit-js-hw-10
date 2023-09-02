import * as catApi from './cat-api';
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const apiKey =
  live_N9bTL2PELSvwTb14NwO76BVd6zb15srFE6uHREFMwupXA6Ut6dAtFJQqKZv2D90Q;

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function createList(items) {
  const markup = items
    .map(item => {
      return `<option value=${item.reference_image_id}>${item.name} </option>`;
    })
    .join('');
  breedSelect.innerHTML = markup;
}

//creating post on website with cat name, image and descripion
function createPost(item) {
  const markup = `
    <img class="postImage" src="${item.url}" alt="">
    <div>
      <h1>${item.breeds[0].name}</h1>
      <p>${item.breeds[0].description}</p>
      <p><b>Temperament: </b>${item.breeds[0].temperament}</p>
    </div>
    `;
  catInfo.innerHTML = markup;
}

breedSelect.addEventListener('change', handleChange);
breedSelect.classList.add('hidden');
error.classList.add('hidden');

function handleChange(event) {
  loader.classList.remove('hidden');
  catInfo.classList.add('hidden');
  catApi
    .fetchCatByBreed(event.currentTarget.value)
    .then(function (response) {
      createPost(response);
      loader.classList.add('hidden');
      catInfo.classList.remove('hidden');
      error.classList.add('hidden');
    })
    .catch(function (error) {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      error.classList.remove('hidden');
      loader.classList.add('hidden');
      console.log(error);
    });
}
catApi.init(apiKey);
catApi
  .fetchBreeds()
  .then(function (response) {
    createList(response);
    loader.classList.add('hidden');
    breedSelect.classList.remove('hidden');
    error.classList.add('hidden');
    const select = new SlimSelect({
      select: breedSelect,
    });
  })
  .catch(function (error) {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    error.classList.remove('hidden');
    loader.classList.add('hidden');
    console.log(error);
  });
