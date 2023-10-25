import React, { ChangeEvent, FormEvent } from 'react';
import s from './Searchbar.module.css';

type SearchbarProps = {
  onSubmit: (data: string) => void;
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
    // const { children } = this.props;

    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.formSubmitHandler}>
          <button type="submit" className={s.searchForm__button}>
            <span className={s.searchForm__buttonLabel}>Search</span>
          </button>

          <input
            className={s.searchForm__input}
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
