import styles from './ErrorCard.module.css';
type ErrorCardProps = {
  children: string;
};

export const ErrorCard = ({ children }: ErrorCardProps) => {
  return <div className={styles.error}>{children}</div>;
};
