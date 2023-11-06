function fetchDataBySearch(query: string) {
  return fetch(`https://swapi.dev/api/people/?search=${query}`).then((response) => response.json());
}

function fetchListData() {
  return fetch(`https://swapi.dev/api/people/`).then((response) => response.json());
}

const api = {
  fetchDataBySearch,
  fetchListData,
};

export default api;
