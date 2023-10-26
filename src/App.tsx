import React from 'react';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import Gallery from './components/Gallery/Gallery';
import GalleryItem from './components/GalleryItem/GalleryItem';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import api from './components/api';

type AppProps = {
  message?: string;
};

type AppState = {
  query: string;
  gallery: [];
  item: {
    name?: string;
    classification?: string;
    language?: string;
    skin_colors?: string;
  };
};
class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    query: '',
    gallery: [],
    item: {},
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
    api.fetchDataBySearch(dataForSearch).then((data) => {
      console.log('etchDataBySearch', data);
      // this.setState({
      //   item: data.results[0],
      // });
      this.setState({
        gallery: data.results,
      });
    });
  };

  setError = () => {
    throw new Error('Error here !');
  };
  handleClick = () => {
    console.log('Test Button');
    this.setError();
    // throw new Error('Not a correct click');
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="container">
          <Searchbar onSubmit={this.handleSubmit} />
          <button type="button" onClick={this.handleClick}>
            ErrorBUTTON
          </button>
          <Gallery items={this.state.gallery} />
          {/* <ErrorBoundary> */}
        </div>{' '}
      </ErrorBoundary>
    );
  }
}
export default App;
