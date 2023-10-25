function fetchDataBySearch(query: string) {
  console.log('query', query);
  return fetch(`https://swapi.dev/api/species/?search=${query}`).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Data  not found`));
  });
}

function fetchListData() {
  console.log('fetch list');
  return fetch(`https://swapi.dev/api/species`).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Data  not found`));
  });
}

const api = {
  fetchDataBySearch,
  fetchListData,
};

export default api;
