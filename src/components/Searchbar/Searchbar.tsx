import React, { ChangeEvent, FormEvent } from 'react';
import styles from './Searchbar.module.css';

type SearchbarProps = {
  onSubmit: (data: { query: string }) => void;
};
type SearchbarState = {
  query: string;
};

class Searchbar extends React.Component<SearchbarProps, SearchbarState> {
  state = {
    query: '',
  };

  componentDidMount(): void {
    const queryFromLS = localStorage.getItem('search');
    if (queryFromLS) {
      this.setState({
        query: queryFromLS,
      });
    } else {
      this.setState({
        query: '',
      });
    }
  }
  onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: e.target.value,
    });
  };

  formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    localStorage.setItem('search', this.state.query);
    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.formSubmitHandler}>
          <button type="submit" className={styles.searchForm__button}></button>
          <input
            className={styles.searchForm__input}
            type="text"
            onChange={this.onChangeHandler}
            autoComplete="off"
            autoFocus
            placeholder="Enter your query"
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
