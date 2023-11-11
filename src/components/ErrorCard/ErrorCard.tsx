import styles from './ErrorCard.module.css';
import { ErrorCardProps } from '../types';

export const ErrorCard = ({ children }: ErrorCardProps) => {
  return <div className={styles.error}>{children}</div>;
};
