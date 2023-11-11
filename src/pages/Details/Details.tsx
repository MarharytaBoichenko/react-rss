import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ItemProps } from '../../components/types';
import api from '../../components/api';
import { GalleryItemDetailed } from '../../components/GalleryItemDetailed/GalleryItemDetailed';
import Loader from '../../components/Loader/Loader';
import styles from './Details.module.css';

const Details = () => {
  const [product, setProduct] = useState<ItemProps>();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getPersonInfo = () => {
    setLoading(true);
    if (id)
      api.fetchOnePerson(id).then((data) => {
        setProduct(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id === '') return;
    getPersonInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeDetails = () => {
    navigate('/');
  };

  return (
    <>
      {loading && <Loader />}
      {product && !loading && (
        <div className={styles.overlay}>
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
