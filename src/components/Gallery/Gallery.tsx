import styles from './Gallery.module.css';
import { GalleryItem } from '../GalleryItem/GalleryItem';
import { ItemProps } from '../types';

type GalleryProps = {
  items: ItemProps[];
};

export const Gallery = ({ items }: GalleryProps) => {
  return (
    <div>
      <ul className={styles.gallery}>
        {items.map(({ name, gender, hair_color, eye_color, mass, created }) => {
          return (
            <li className={styles.gallery__item} key={created}>
              <GalleryItem
                name={name}
                gender={gender}
                hair_color={hair_color}
                eye_color={eye_color}
                mass={mass}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
