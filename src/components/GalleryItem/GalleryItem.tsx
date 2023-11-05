import styles from './GalleryItem.module.css';
import { ItemProps } from '../types';

export const GalleryItem = ({ title, price, rating, category }: ItemProps) => {
  return (
    <ul className={styles.description}>
      <li>
        <span className={styles.label}>Title: </span> {title}
      </li>
      <li>
        <span className={styles.label}>Price: </span>
        {price}
      </li>
      <li>
        <span className={styles.label}> Rating: </span>
        {rating}
      </li>
      <li>
        <span className={styles.label}>Category: </span>
        {category}
      </li>
    </ul>
  );
};
