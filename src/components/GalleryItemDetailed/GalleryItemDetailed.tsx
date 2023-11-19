import styles from '../GalleryItemDetailed/GalleryItemDetailed.module.css';
import { ItemProps } from '../types';

export const GalleryItemDetailed: React.FC<ItemProps> = ({
  title,
  price,
  rating,
  category,
  discountPercentage,
  description,
  brand,
}) => {
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
      <li>
        <span className={styles.label}>Discount percentage: </span>
        {discountPercentage}
      </li>
      <li>
        <span className={styles.label}>Brand: </span>
        {brand}
      </li>
      <li>
        <span className={styles.label}>Description: </span>
        {description}
      </li>
    </ul>
  );
};
