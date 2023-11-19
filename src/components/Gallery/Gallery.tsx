import { Link } from 'react-router-dom';
import styles from './Gallery.module.css';
import { GalleryItem } from '../GalleryItem/GalleryItem';
import { GalleryProps } from './../types';

export const Gallery: React.FC<GalleryProps> = ({ gallery }) => {
  const prevPath = `${location.pathname}${location.search}`;
  return (
    <div>
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
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
