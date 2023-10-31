import styles from './GalleryItem.module.css';
import { ItemProps } from '../types';

export const GalleryItem = ({ name, gender, hair_color, eye_color, mass }: ItemProps) => {
  return (
    <ul className={styles.description}>
      <li>
        <span className={styles.label}>Name: </span> {name}
      </li>
      <li>
        <span className={styles.label}>Gender: </span>
        {gender}
      </li>
      <li>
        <span className={styles.label}> Hair color: </span>
        {hair_color}
      </li>
      <li>
        <span className={styles.label}>Eye color: </span>
        {eye_color}
      </li>
      <li>
        <span className={styles.label}>Mass: </span>
        {mass}
      </li>
    </ul>
  );
};
