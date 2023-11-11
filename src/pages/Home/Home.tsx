import { useState, useLayoutEffect, FormEvent, useContext, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from '../../App.module.css';
import Searchbar from '../../components/Searchbar/Searchbar';
import { Gallery } from '../../components/Gallery/Gallery';
import Loader from '../../components/Loader/Loader';
import api from '../../components/api';
import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import Pagination from '../../components/Pagination/Pagination';
import Select from '../../components/Select/Select';
import { AppContext } from '../../components/AppContext/AppContextProvider';
import { AppContextType } from '../../components/types';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isItemOpened, _] = useState(false);
  const skip = itemsPerPage * (currentPage - 1);
  const total = 100;
  const pagesQuantity: number = total / itemsPerPage;
  const navigate = useNavigate();
  const location = useLocation();
  const lsPageQuery = localStorage.getItem('search');
  const firstMount = useRef(true);

  const { setGallery, gallery, search, setSearch } = useContext(AppContext) as AppContextType;

  const getAlLData = () => {
    console.log('firstPageQuery all data');
    console.log('firstMount.current', firstMount.current);
    api
      .fetchListData(itemsPerPage, skip)
      .then((data) => {
        setGallery(data.products);
        setIsLoading(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const getDataBySearch = (firstPageQuery: string | null) => {
    console.log('firstMount.current', firstMount.current);
    console.log('firstPageQuery by search', firstPageQuery);
    if (!firstPageQuery) {
      console.log(!firstPageQuery);
      console.log('in getDataBySearch', firstPageQuery);
      return;
    } else {
      console.log('go to search by', firstPageQuery);
      api
        .fetchDataBySearch(firstPageQuery)
        .then((data) => {
          console.log(data.products);
          setGallery(data.products);
          setIsLoading(false);
          setCurrentPage(1);
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }
  };

  useLayoutEffect(() => {
    if (firstMount.current) {
      console.log('firstMount.current', firstMount.current);
      !lsPageQuery ? getAlLData() : getDataBySearch(lsPageQuery);
      firstMount.current = false;
    } else {
      console.log(firstMount.current);
      console.log('in else');
      console.log('from lS', localStorage.getItem('search'));
      setIsLoading(true);
      setHasError(false);
      console.log('search', search);
      console.log('! lsPageQuery', !lsPageQuery);
      !search ? getAlLData() : getDataBySearch(search);
    }
  }, [currentPage, search, itemsPerPage]);

  const handleClick = () => {
    console.log('Error Button');
    setHasError(true);
  };

  const handleSelect = (e: FormEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number((e.target as HTMLSelectElement).value));
    setSearch('');
    setCurrentPage(1);
  };

  const handleGalleryClick = () => {
    if (location.pathname !== '/') navigate('/');
  };

  if (hasError) throw new Error('Thrown error');

  return (
    <div className={styles.container} onClick={handleGalleryClick}>
      <Searchbar />
      <button type="button" className={styles.button} onClick={handleClick}>
        ErrorBUTTON
      </button>

      {gallery.length === 0 && !isLoading && <ErrorCard>No info</ErrorCard>}
      <Pagination
        currentPage={currentPage}
        pagesQuantity={pagesQuantity}
        setCurrentPage={setCurrentPage}
      />
      <Select handleSelect={handleSelect} />
      {isLoading && <Loader />}

      <div className={styles.wrapper}>
        {gallery.length > 0 && !isLoading && (
          <Gallery isItemOpened={isItemOpened} onClick={handleGalleryClick} />
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
