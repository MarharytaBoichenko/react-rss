import { Outlet } from 'react-router-dom';
import styles from '../App.module.css';

const Layout = () => {
  return (
    <>
      <header className={styles.header}>Enter your data, please</header>
      <main className={styles.container}>
        <Outlet />
      </main>
      <footer>Copyright</footer>
    </>
  );
};

export default Layout;
