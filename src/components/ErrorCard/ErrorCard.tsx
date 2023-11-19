import styles from './ErrorCard.module.css';
import { ErrorCardProps } from '../types';

export const ErrorCard: React.FC<ErrorCardProps> = ({ children }) => {
  return <div className={styles.error}>{children}</div>;
};
