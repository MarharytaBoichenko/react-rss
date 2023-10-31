import React from 'react';
import styles from './App.module.css';
import Searchbar from './components/Searchbar/Searchbar';
import { Gallery } from './components/Gallery/Gallery';
import Loader from './components/Loader/Loader';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import api from './components/api';
import { ErrorCard } from './components/ErrorCard/ErrorCard';

type AppProps = {
  message?: string;
};

type AppState = {
  query: string;
  gallery: [];
  isLoading: boolean;
  error: string;
};
class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    query: '',
    gallery: [],
    isLoading: false,
    error: '',
  };

  componentDidMount(): void {
    const firstPageQuery = localStorage.getItem('search');
    if (!firstPageQuery) {
      this.setState({
        isLoading: true,
        error: '',
      });
      api
        .fetchListData()
        .then((data) => {
          this.setState({
            gallery: data.results,
            isLoading: false,
          });
        })
        .catch((error) => this.setState({ error: error }))
        .finally(() => this.setState({ isLoading: false }));
    } else {
      this.setState({ query: firstPageQuery });
      this.getData(firstPageQuery);
    }
  }

  componentDidUpdate(prevProps: Readonly<AppProps>, prevState: Readonly<AppState>): void {
    const prevQuery = prevState.query;
    const newQuery = this.state.query;
    if (prevQuery !== newQuery) {
      this.getData(newQuery);
    }
  }

  handleSubmit = (searchQuery: { query: string }): void => {
    this.setState({
      query: searchQuery.query,
      gallery: [],
    });
  };

  getData = (dataForSearch: string): void => {
    this.setState({
      isLoading: true,
      error: '',
    });
    api
      .fetchDataBySearch(dataForSearch)
      .then((data) => {
        if (data.results.length === 0) {
          return Promise.reject('No data  for  your query');
        }
        this.setState({
          gallery: data.results,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error: error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  setError = (): void => {
    throw new Error('Error here !');
  };

  handleClick = () => {
    console.log('Test Button');
    this.setError();
  };

  render() {
    return (
      <ErrorBoundary>
        <div className={styles.container}>
          <Searchbar onSubmit={this.handleSubmit} />
          <button type="button" className={styles.button} onClick={this.handleClick}>
            ErrorBUTTON
          </button>
          {this.state.error && <ErrorCard>{this.state.error}</ErrorCard>}
          {this.state.isLoading && <Loader />}
          {this.state.gallery.length > 0 && <Gallery items={this.state.gallery} />}
        </div>
      </ErrorBoundary>
    );
  }
}
export default App;
