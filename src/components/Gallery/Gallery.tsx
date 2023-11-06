import { Link } from 'react-router-dom';
import styles from './Gallery.module.css';
import { GalleryItem } from '../GalleryItem/GalleryItem';
import { ItemProps } from '../types';

type GalleryProps = {
  items: ItemProps[];
  isItemOpened: boolean;
  onClick: () => void;
};

export const Gallery = ({ items, isItemOpened, onClick }: GalleryProps) => {
  return (
    <div onClick={onClick}>
      <ul className={isItemOpened ? styles.gallery : styles.overlay}>
        {items.map(({ title, price, rating, category, id }) => {
          return (
            <Link
              to={`product/${id}`}
              state={{ from: '/product' }}
              key={id}
              onClick={(e) => {
                isItemOpened ? e.preventDefault() : console.log('fgdfg');
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
