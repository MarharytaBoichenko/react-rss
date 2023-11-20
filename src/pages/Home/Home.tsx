import { useState, FormEvent, useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import styles from '../../App.module.css';
import Searchbar from '../../components/Searchbar/Searchbar';
import { Gallery } from '../../components/Gallery/Gallery';
import Loader from '../../components/Loader/Loader';
import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import Pagination from '../../components/Pagination/Pagination';
import Select from '../../components/Select/Select';
import { useGetGalleryListSearchQuery } from '../../redux/gallerySlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { changeSearch } from '../../redux/searchSlice';
import { changeQuantity } from '../../redux/itemPerPageSlice';
import { changeMainLoading } from '../../redux/loadingSlice';

const Home: React.FC = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [_searchParams, setSearchParams] = useSearchParams();
  const total = 100;

  const dispatch = useAppDispatch();
  useEffect(() => {
    const lsPageQuery = localStorage.getItem('search');
    if (lsPageQuery) dispatch(changeSearch({ search: lsPageQuery }));
  }, [dispatch]);

  const searchState = useAppSelector((state) => state.search.search);
  const quantityState = useAppSelector((state) => state.quantity.quantity);

  const skip = quantityState * (currentPage - 1);
  const pagesQuantity: number = total / quantityState;

  const { products, isError, isFetchingProducts } = useGetGalleryListSearchQuery(
    {
      limit: quantityState,
      skip: skip,
      search: searchState,
    },
    {
      selectFromResult: ({ data, isLoading, isError, isFetching }) => ({
        products: data?.products,
        isError: isError,
        isLoadingProducts: isLoading,
        isFetchingProducts: isFetching,
      }),
    }
  );

  dispatch(changeMainLoading({ loadingMain: isFetchingProducts, loadingDetailed: false }));

  const handleClick = () => {
    console.log('Error Button');
    setHasError(true);
  };

  const handleSelect = (e: FormEvent<HTMLSelectElement>) => {
    dispatch(changeSearch({ search: '' }));
    dispatch(changeQuantity({ quantity: Number((e.target as HTMLSelectElement).value) }));
    dispatch(changeMainLoading({ loadingMain: isFetchingProducts, loadingDetailed: false }));
    setCurrentPage(1);
    setSearchParams({ page: '1' });
  };

  if (hasError) throw new Error('Thrown error');

  return (
    <>
      <Searchbar />
      <div className={styles.container}>
        <button type="button" className={styles.button} onClick={handleClick}>
          ErrorBUTTON
        </button>
        {isError || products?.length === 0 ? (
          <ErrorCard>No info</ErrorCard>
        ) : (
          <>
            <Pagination
              currentPage={currentPage}
              pagesQuantity={pagesQuantity}
              setCurrentPage={setCurrentPage}
            />
            <Select handleSelect={handleSelect} />
            {isFetchingProducts && <Loader position="center" />}

            <div className={styles.wrapper}>
              {products && <Gallery gallery={products} />}
              <Outlet />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
