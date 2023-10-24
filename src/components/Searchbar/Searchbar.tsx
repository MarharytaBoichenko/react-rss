import { Component, ChangeEvent, FormEvent } from 'react';
import s from './Searchbar.module.css';

type SearchbarProps = {
  onSubmit: (data: string) => void;
};
type SearchbarState = {
  query: string;
};

class Searchbar extends Component {
  state = {
    query: '',
  };
  onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: e.target.value,
    });
  };

  formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
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
