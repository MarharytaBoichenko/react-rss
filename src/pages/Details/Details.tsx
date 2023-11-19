import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { GalleryItemDetailed } from '../../components/GalleryItemDetailed/GalleryItemDetailed';
import Loader from '../../components/Loader/Loader';
import { useGetOneItemQuery } from '../../redux/gallerySlice';
import { useAppDispatch } from '../../hooks/hooks';
import styles from './Details.module.css';
import { changeDetailedLoading } from '../../redux/loadingSlice';
import React from 'react';

const Details: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetOneItemQuery(id as string);
  dispatch(changeDetailedLoading({ loadingMain: false, loadingDetailed: isLoading }));

  const closeDetails = () => {
    navigate(location.state?.prevPath);
  };

  return (
    <>
      {isLoading && <Loader position="right" />}
      {product && !isLoading && (
        <div>
          <div className={styles.middleware} onClick={closeDetails}></div>
          <div className={styles.item_wrapper}>
            <button className={styles.close} type="button" onClick={closeDetails}>
              x
            </button>
            <GalleryItemDetailed
              title={product.title}
              price={product.price}
              rating={product.rating}
              category={product.category}
              id={product.id}
              discountPercentage={product.discountPercentage}
              description={product.description}
              brand={product.brand}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
