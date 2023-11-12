import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}> 404 Not Found </h1>
      <Link to="/">Go home</Link>
    </div>
  );
};

export default NotFound;
