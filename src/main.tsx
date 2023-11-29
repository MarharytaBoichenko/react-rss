import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
// import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
// import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <Provider store={}>
  <BrowserRouter>
    {/* <ErrorBoundary> */}
    <App />
    {/* </ErrorBoundary> */}
  </BrowserRouter>
  // </Provider>
);
