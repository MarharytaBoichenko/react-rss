import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Gallery.module.css';
import { GalleryItem } from '../GalleryItem/GalleryItem';
import { AppContext } from '../AppContext/AppContextProvider';
import { GalleryProps } from './../types';

export const Gallery = ({ isItemOpened, onClick }: GalleryProps) => {
  const { gallery } = useContext(AppContext);
  return (
    <div onClick={onClick}>
      <ul className={isItemOpened ? styles.gallery : styles.overlay}>
        {gallery.map(({ title, price, rating, category, id }) => {
          return (
            <Link
              to={`product/${id}`}
              state={{ from: '/product' }}
              key={id}
              onClick={(e) => {
                isItemOpened ? e.preventDefault() : console.log('not opened');
              }}
            >
              <li className={styles.gallery__item}>
                <GalleryItem
                  title={title}
                  price={price}
                  rating={rating}
                  category={category}
                  id={id}
                />
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
