import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import Searchbar from './components/Searchbar/Searchbar';
import { Gallery } from './components/Gallery/Gallery';
import Loader from './components/Loader/Loader';
import api from './components/api';
import { ErrorCard } from './components/ErrorCard/ErrorCard';

// type AppState = {
//   query: string;
//   gallery: [];
//   isLoading: boolean;
//   hasError: boolean;
// };

const App = () => {
  const [query, setQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const firstPageQuery = localStorage.getItem('search');
    console.log('isINLS firstPageQuery', firstPageQuery);
    setIsLoading(true);
    setHasError(false);
    if (firstPageQuery) setQuery(firstPageQuery);
    (!firstPageQuery ? api.fetchListData() : api.fetchDataBySearch(firstPageQuery))
      .then((data) => {
        setGallery(data.results);
        setIsLoading(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));

    // if (!firstPageQuery) {
    //   console.log('fetch all list');
    //   api
    //     .fetchListData()
    //     .then((data) => {
    //       setGallery(data.results);
    //       setIsLoading(false);
    //     })
    //     .catch((error) => console.error(error))
    //     .finally(() => setIsLoading(false));
    // } else {
    //   console.log('fetch for firstPageQuery');
    //   setQuery(firstPageQuery);
    //   getData(firstPageQuery);
    // }
  }, [query]);

  const handleSubmit = (searchQuery: string): void => {
    console.log('searchQuery in handleSubmit', searchQuery);
    setQuery(searchQuery);
  };

  // const getData = (dataForSearch: string): void => {
  //   setIsLoading(true);
  //   setHasError(false);

  //   api
  //     .fetchDataBySearch(dataForSearch)
  //     .then((data) => {
  //       setGallery(data.results);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => console.error(error))
  //     .finally(() => setIsLoading(false));
  // };

  const handleClick = () => {
    console.log('Error Button');
    setHasError(true);
  };

  if (hasError) throw new Error('Thrown error');
  return (
    <div className={styles.container}>
      <Searchbar onSubmit={handleSubmit} />
      <button type="button" className={styles.button} onClick={handleClick}>
        ErrorBUTTON
      </button>
      {isLoading && <Loader />}
      {gallery.length === 0 && !isLoading && <ErrorCard>No info</ErrorCard>}

      {gallery.length > 0 && !isLoading && <Gallery items={gallery} />}
    </div>
  );
};

export default App;
