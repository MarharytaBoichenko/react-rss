import { useState, useEffect, FormEvent } from 'react';
import { Outlet, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import styles from '../../App.module.css';
import Searchbar from '../../components/Searchbar/Searchbar';
import { Gallery } from '../../components/Gallery/Gallery';
import Loader from '../../components/Loader/Loader';
import api from '../../components/api';
import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import Pagination from '../../components/Pagination/Pagination';
import Select from '../../components/Select/Select';

const Home = () => {
  const [gallery, setGallery] = useState([]);
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

  const searchQuery = searchParams.get('search' || '');
  const firstPageQuery = searchQuery || localStorage.getItem('search');
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    !firstPageQuery ? getAlLData() : getDataBySearch(firstPageQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('in second useefffect');
    setIsLoading(true);
    setHasError(false);
    !firstPageQuery ? getAlLData() : getDataBySearch(firstPageQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, firstPageQuery]);

  const getAlLData = () => {
    api
      .fetchListData(itemsPerPage, skip)
      .then((data) => {
        setGallery(data.products);
        setIsLoading(false);

        setSearchParams({ search: '' });
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const getDataBySearch = (firstPageQuery: string) => {
    api
      .fetchDataBySearch(firstPageQuery)
      .then((data) => {
        setGallery(data.products);
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
  };

  useEffect(() => {
    api
      .fetchListData(itemsPerPage, 0)
      .then((data) => {
        setCurrentPage(1);
        setGallery(data.products);
        setIsLoading(false);
        setSearchParams({});
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerPage]);

  const handleClick = () => {
    console.log('Error Button');
    setHasError(true);
  };

  const handleSelect = (e: FormEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number((e.target as HTMLSelectElement).value));
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
          <Gallery items={gallery} isItemOpened={isItemOpened} onClick={handleGalleryClick} />
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
