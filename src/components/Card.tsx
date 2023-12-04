import React from 'react';
import styles from './Card.module.css';
import { IFormData } from '../types';

interface CardProps extends IFormData {
  index: number;
}
const Card: React.FC<CardProps> = ({
  name,
  age,
  password,
  country,
  gender,
  image,
  agreement,
  index,
}) => {
  console.log(index);
  return (
    <div className={index === 0 ? styles.updated : styles.wrapper}>
      <div className={styles.info}>
        <p className={styles.name}>Name: {name}</p>
        <p className={styles.age}>Age: {age}</p>
        <p className={styles.password}>Email: {password}</p>
        <p className={styles.password}>Password: {password}</p>
        <p className={styles.gender}>Gender: {gender}</p>
        <p className={styles.agreement}>Agreed T&C: {agreement.toString()}</p>
        <p className={styles.country}>Country: {country}</p>
      </div>

      <div className={styles.thumb}>
        <img src={image as string} alt="" className={styles.image} />
      </div>
    </div>
  );
};

export default Card;
