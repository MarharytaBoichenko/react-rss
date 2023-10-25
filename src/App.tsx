import React from 'react';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import Gallery from './components/Gallery/Gallery';
import GalleryItem from './components/GalleryItem/GalleryItem';
import api from './components/api';

type AppProps = {
  message: string;
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
      this.getData();
    }
  }

  componentDidUpdate(prevProps: Readonly<AppProps>, prevState: Readonly<AppState>): void {
    const prevQuery = prevState.query;
    const newQuery = this.state.query;

    if (prevQuery !== newQuery) {
      console.log('we need  new search');
      this.getData();
    }
  }

  handleSubmit = (searchQuery: { query: string }) => {
    console.log('searchQuery in handleSubmit', searchQuery);
    this.setState({
      query: searchQuery.query,
      gallery: [],
    });
  };

  getData = () => {
    console.log(this.state.query);
    api.fetchDataBySearch(this.state.query).then((data) => {
      console.log('etchDataBySearch', data);
      this.setState({
        item: data.results[0],
      });
    });
  };

  render() {
    return (
      <div className="container">
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.gallery.length ? (
          <Gallery items={this.state.gallery} />
        ) : (
          <GalleryItem
            name={this.state.item.name}
            classification={this.state.item.classification}
            language={this.state.item.language}
            skin_colors={this.state.item.skin_colors}
          />
        )}
      </div>
    );
  }
}
export default App;
