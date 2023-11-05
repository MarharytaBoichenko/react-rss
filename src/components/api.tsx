// function fetchDataBySearch(query: string) {
//   return fetch(`https://swapi.dev/api/people/?search=${query}`).then((response) => response.json());
// }

// function fetchListData() {
//   return fetch(`https://swapi.dev/api/people/`).then((response) => response.json());
// }

// function fetchOnePerson(dataNumber: string) {
//   console.log(dataNumber);
//   return fetch(`https://swapi.dev/api/people/${dataNumber}`).then((response) => response.json());
// }
// const api = {
//   fetchDataBySearch,
//   fetchListData,
//   fetchOnePerson,
// };

// export default api;
const BASE_URL = 'https://dummyjson.com/products';
function fetchDataBySearch(query: string) {
  return fetch(`${BASE_URL}/search?q=${query}`).then((response) => response.json());
}

function fetchListData(limit: number, skip: number) {
  console.log('limit', limit, 'skip', skip);
  return fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`).then((response) => response.json());
}

function fetchOnePerson(dataNumber: string) {
  console.log(dataNumber);
  return fetch(`${BASE_URL}/${dataNumber}`).then((response) => response.json());
}
const api = {
  fetchDataBySearch,
  fetchListData,
  fetchOnePerson,
};
export default api;
