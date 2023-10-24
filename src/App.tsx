import React from 'react';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';

type AppProps = {
  message: string;
};
type AppState = {
  query: string;
  gallery: []; // like this
};
class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    query: '',
    gallery: [],
  };

  handleSubmit = (searchQuery: { query: string }) => {
    console.log(searchQuery);
    this.setState({
      query: searchQuery.query,
    });
  };
  render() {
    return (
      <div className="container">
        <Searchbar onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;
