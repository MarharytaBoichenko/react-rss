import { Link } from 'react-router-dom';
import styles from './Gallery.module.css';
import { GalleryItem } from '../GalleryItem/GalleryItem';
import { GalleryProps } from './../types';

export const Gallery = ({ gallery, onClick }: GalleryProps) => {
  const prevPath = `${location.pathname}${location.search}`;
  return (
    <div onClick={onClick}>
      {' '}
      <ul className={styles.gallery}>
        {gallery.map(({ title, price, rating, category, id }) => {
          return (
            <Link to={`product/${id}`} state={{ prevPath: prevPath }} key={id}>
              <li className={styles.gallery__item}>
                <GalleryItem
                  title={title}
                  price={price}
                  rating={rating}
                  category={category}
                  id={id}
                />
                {/* <GalleryItem/> */}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
