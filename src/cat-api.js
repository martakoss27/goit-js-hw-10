import axios from 'axios';

let axiosCatApi = null;

//config function
export function init(api_key) {
  axiosCatApi = require('axios').default;
  axiosCatApi.defaults.headers.common['x-api-key'] = api_key;
}

//capturing array of all objects from the server
export function fetchBreeds() {
  return axiosCatApi
    .get(`https://api.thecatapi.com/v1/breeds`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
    });
}
//capturing 1 object from the server
export function fetchCatByBreed(breedId) {
  return axiosCatApi
    .get(`https://api.thecatapi.com/v1/images/${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
    });
}
