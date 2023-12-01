import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header>Enter your data, please</header>
      <main>
        <Outlet />
      </main>
      <footer>Copyright</footer>
    </>
  );
};

export default Layout;
