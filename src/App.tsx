import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Details from './pages/Details/Details';

import Loader from './components/Loader/Loader';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="product" element={<Loader />} />
        <Route path="product/:id" element={<Details />} />
      </Route>
    </Routes>
  );
};

export default App;
