import React from 'react';
import s from './App.module.css';
import Searchbar from './components/Searchbar/Searchbar';
import Gallery from './components/Gallery/Gallery';
import Loader from './components/Loader/Loader';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import api from './components/api';

type AppProps = {
  message?: string;
};

type AppState = {
  query: string;
  gallery: [];
  isLoading: boolean;
};
class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    query: '',
    gallery: [],
    isLoading: false,
  };

  componentDidMount(): void {
    const firstPageQuery = localStorage.getItem('search');
    console.log(firstPageQuery);
    if (!firstPageQuery) {
      api.fetchListData().then((data) => {
        console.log(data.results);
        console.log('in if');
        this.setState({
          gallery: data.results,
        });
      });
    } else {
      this.setState({ query: firstPageQuery });
      console.log('in else');
      this.getData(firstPageQuery);
    }
  }

  componentDidUpdate(prevProps: Readonly<AppProps>, prevState: Readonly<AppState>): void {
    const prevQuery = prevState.query;
    const newQuery = this.state.query;
    console.log(prevQuery);
    console.log(newQuery);

    if (prevQuery !== newQuery) {
      console.log('we need  new search');
      this.getData(newQuery);
    }
  }

  handleSubmit = (searchQuery: { query: string }) => {
    console.log('searchQuery in handleSubmit', searchQuery);
    this.setState({
      query: searchQuery.query,
      gallery: [],
    });
  };

  getData = (dataForSearch: string) => {
    console.log('dataForSearch', dataForSearch);
    console.log('this.state.query', this.state.query);
    this.setState({ isLoading: true });
    api
      .fetchDataBySearch(dataForSearch)
      .then((data) => {
        console.log('etchDataBySearch', data);
        if (data.results.length === 0) {
          console.log('No data  for  your query');
          return;
        }
        this.setState({
          gallery: data.results,
          isLoading: false,
        });
      })
      .catch((error) => console.log(error));
  };

  setError = () => {
    throw new Error('Error here !');
  };

  handleClick = () => {
    console.log('Test Button');
    this.setError();
  };

  render() {
    return (
      <ErrorBoundary>
        <div className={s.container}>
          <Searchbar onSubmit={this.handleSubmit} />
          <button type="button" className={s.button} onClick={this.handleClick}>
            ErrorBUTTON
          </button>
          {this.state.isLoading && <Loader />}
          <Gallery items={this.state.gallery} />
        </div>{' '}
      </ErrorBoundary>
    );
  }
}
export default App;
