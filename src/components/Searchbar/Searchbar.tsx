import { ChangeEvent, FormEvent, useState, useContext, useEffect } from 'react';
import styles from './Searchbar.module.css';
import { AppContext } from './../AppContext/AppContextProvider';

const Searchbar = () => {
  const [query, setQuery] = useState(localStorage.getItem('search') || '');
  const { search, setSearch } = useContext(AppContext);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    setQuery(search || '');
  }, [search]);

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    setSearch(query);
    localStorage.setItem('search', query);
  };
  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={formSubmitHandler}>
        <button type="submit" className={styles.searchForm__button}></button>
        <input
          className={styles.searchForm__input}
          type="text"
          onChange={onChangeHandler}
          autoComplete="off"
          autoFocus
          placeholder="Enter your query"
          value={query}
        />
      </form>
    </header>
  );
};

export default Searchbar;
