import React from 'react';
import styles from './App.module.css';
import Searchbar from './components/Searchbar/Searchbar';
import { Gallery } from './components/Gallery/Gallery';
import Loader from './components/Loader/Loader';
import api from './components/api';
import { ErrorCard } from './components/ErrorCard/ErrorCard';

type AppProps = {
  message?: string;
};

type AppState = {
  query: string;
  gallery: [];
  isLoading: boolean;
  hasError: boolean;
};
class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    query: '',
    gallery: [],
    isLoading: false,
    hasError: false,
  };

  componentDidMount(): void {
    const firstPageQuery = localStorage.getItem('search');
    if (!firstPageQuery) {
      this.setState({
        isLoading: true,
        hasError: false,
      });
      api
        .fetchListData()
        .then((data) => {
          this.setState({
            gallery: data.results,
            isLoading: false,
          });
        })
        .catch((error) => console.error(error))
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
      hasError: false,
    });
    api
      .fetchDataBySearch(dataForSearch)
      .then((data) => {
        this.setState({
          gallery: data.results,
          isLoading: false,
        });
      })
      .catch((error) => console.error(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleClick = () => {
    console.log('Error Button');
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) throw new Error('Thrown error');
    return (
      <div className={styles.container}>
        <Searchbar onSubmit={this.handleSubmit} />
        <button type="button" className={styles.button} onClick={this.handleClick}>
          ErrorBUTTON
        </button>
        {this.state.isLoading && <Loader />}
        {this.state.gallery.length > 0 ? (
          <Gallery items={this.state.gallery} />
        ) : (
          <ErrorCard>No info</ErrorCard>
        )}
      </div>
    );
  }
}
export default App;
