import { useState, useEffect, FormEvent, useContext, useRef } from 'react';
import { Outlet, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import styles from '../../App.module.css';
import Searchbar from '../../components/Searchbar/Searchbar';
import { Gallery } from '../../components/Gallery/Gallery';
import Loader from '../../components/Loader/Loader';
import api from '../../components/api';
import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import Pagination from '../../components/Pagination/Pagination';
import Select from '../../components/Select/Select';
import { AppContext } from '../../components/AppContext/AppContextProvider';

const Home = () => {
  // const [gallery, setGallery] = useState([]);
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
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search');
  const lsPageQuery = localStorage.getItem('search');

  const { isGallery, gallery } = useContext(AppContext);
  console.log(useContext(AppContext));

  const getAlLData = () => {
    console.log('firstPageQuery all data');
    api
      .fetchListData(itemsPerPage, skip)
      .then((data) => {
        isGallery(data.products);
        // setGallery(data.products);
        setIsLoading(false);

        // setSearchParams({ search: '' });
        setSearchParams({});
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const getDataBySearch = (firstPageQuery: string | null) => {
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
          isGallery(data.products);
          // setGallery(data.products);
          setIsLoading(false);
          setCurrentPage(1);
          if (firstPageQuery === '' || firstPageQuery === null) {
            setSearchParams({ search: '' });
          } else {
            setSearchParams({ search: firstPageQuery });
          }
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }
  };

  const firstMount = useRef(true);
  useEffect(() => {
    if (firstMount.current) {
      console.log('firstMount.current', firstMount.current);
      !lsPageQuery ? getAlLData() : getDataBySearch(lsPageQuery);
      firstMount.current = false;
    } else {
      console.log('in else');
      console.log('searchQuery', searchQuery);
      console.log('from lS', localStorage.getItem('search'));
      setIsLoading(true);
      setHasError(false);
      console.log('!searchQuery', !searchQuery);
      console.log('! lsPageQuery', !lsPageQuery);
      !searchQuery ? getAlLData() : getDataBySearch(searchQuery);
    }
  }, [currentPage, searchQuery, itemsPerPage]);

  const handleClick = () => {
    console.log('Error Button');
    setHasError(true);
  };

  const handleSelect = (e: FormEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number((e.target as HTMLSelectElement).value));
    setSearchParams({});
    setCurrentPage(1);
  };

  const handleGalleryClick = () => {
    if (location.pathname !== '/') navigate('/');
  };
  if (hasError) throw new Error('Thrown error');

  console.log('gallery', gallery);
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
