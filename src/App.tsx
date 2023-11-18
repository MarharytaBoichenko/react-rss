import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Details from './pages/Details/Details';
import Loader from './components/Loader/Loader';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {/* <Route path="product" element={<Loader />} /> */}
        <Route path="product/:id" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
