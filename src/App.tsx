import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ControlledForm from './pages/ControlledForm/ControlledForm';
import UncontrolledForm from './pages/UncontrolledForm/UncontrolledForm';
import Layout from './components/Layout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="controlled" element={<ControlledForm />} />
        <Route path="uncontrolled" element={<UncontrolledForm />} />
      </Route>
    </Routes>
  );
};

export default App;
