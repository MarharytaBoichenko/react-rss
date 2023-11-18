import styles from './Loader.module.css';
import { LoaderProps } from '../types';

const Loader = ({ position }: LoaderProps) => {
  return <div className={position === 'center' ? styles.loader : styles.right}></div>;
};

export default Loader;
