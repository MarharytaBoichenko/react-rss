import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
const NotFound: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}> 404 Not Found </h1>
      <Link to="/">
        <span>Go home</span>
      </Link>
    </div>
  );
};

export default NotFound;
