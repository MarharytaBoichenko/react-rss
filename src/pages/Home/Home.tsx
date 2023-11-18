import { useState, useLayoutEffect, FormEvent } from 'react';
import { Outlet, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import styles from '../../App.module.css';
import Searchbar from '../../components/Searchbar/Searchbar';
import { Gallery } from '../../components/Gallery/Gallery';
import Loader from '../../components/Loader/Loader';
import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import Pagination from '../../components/Pagination/Pagination';
import Select from '../../components/Select/Select';
import { useGetGalleryListQuery, useGetBySearchQuery } from '../../redux/gallerySlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { changeSearch } from '../../redux/searchSlice';
import { changeQuantity } from '../../redux/itemPerPageSlice';
import { changeLoading } from '../../redux/loadingSlice';

const Home = () => {
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isItemOpened, _] = useState(false);
  const [_searchParams, setSearchParams] = useSearchParams();
  const total = 100;

  const navigate = useNavigate();
  const location = useLocation();
  const prevPath = `${location.pathname}${location.search}`;

  // const lsPageQuery = localStorage.getItem('search');
  // const firstMount = useRef(true);
  const quantityState = useAppSelector((state) => state.quantity.quantity);
  const skip = quantityState * (currentPage - 1);
  const pagesQuantity: number = total / quantityState;
  const { products, isError, isLoadingProducts } = useGetGalleryListQuery(
    { limit: quantityState, skip: skip },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        products: data?.products,
        isError: isError,
        isLoadingProducts: isLoading,
      }),
    }
  );

  console.log(products);
  // console.log(isError);
  // console.log(isLoadingProducts);

  const dispatch = useAppDispatch();
  dispatch(changeLoading({ loading: isLoadingProducts }));

  const searchState = useAppSelector((state) => state.search.search);
  console.log(searchState);

  // const { data: itemsBySearch } = useGetBySearchQuery(searchState);
  // console.log(itemsBySearch);

  // useLayoutEffect(() => {
  //   if (firstMount.current) {
  //     !lsPageQuery ? getAlLData() : getDataBySearch(lsPageQuery);
  //     firstMount.current = false;
  //   } else {
  //     // setIsLoading(true);
  //     setHasError(false);
  //     !search ? getAlLData() : getDataBySearch(search);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentPage, search, itemsPerPage]);

  const handleClick = () => {
    console.log('Error Button');
    setHasError(true);
  };

  const handleSelect = (e: FormEvent<HTMLSelectElement>) => {
    dispatch(changeSearch({ search: '' }));
    dispatch(changeQuantity({ quantity: Number((e.target as HTMLSelectElement).value) }));
    setCurrentPage(1);
    setSearchParams({ page: '1' });
  };

  const handleGalleryClick = () => {
    console.log(location.pathname);
    console.log(prevPath);
    console.log(window.location.search);
    // navigate(`/${window.location.search}`);
    // if (location.pathname !== '/') navigate(prevPath);
  };

  if (hasError) throw new Error('Thrown error');

  return (
    <>
      <Searchbar />
      <div className={styles.container} onClick={handleGalleryClick}>
        <button type="button" className={styles.button} onClick={handleClick}>
          ErrorBUTTON
        </button>
        {!products && !isLoadingProducts && <ErrorCard>No info</ErrorCard>}
        {/* {products?.length === 0 && !isLoadingProducts && <ErrorCard>No info</ErrorCard>} */}
        <Pagination
          currentPage={currentPage}
          pagesQuantity={pagesQuantity}
          setCurrentPage={setCurrentPage}
        />
        <Select handleSelect={handleSelect} />
        {isLoadingProducts && <Loader position="center" />}

        <div className={styles.wrapper}>
          {products && <Gallery gallery={products} onClick={handleGalleryClick} />}
          {/* {itemsBySearch?.products.length > 0 && !isLoading && (
          <Gallery
            // gallery={data.products}
            gallery={itemsBySearch.products}
            isItemOpened={isItemOpened}
            onClick={handleGalleryClick}
          />
        )} */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
