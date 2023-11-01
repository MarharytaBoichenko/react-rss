import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import styles from './Searchbar.module.css';

type SearchbarProps = {
  onSubmit: (data: string) => void;
};
type SearchbarState = {
  query: string;
};

const Searchbar = ({ onSubmit }: SearchbarProps) => {
  const [query, setQuery] = useState(localStorage.getItem('search') || '');

  useEffect(() => {
    const queryFromLS = localStorage.getItem('search');

    if (queryFromLS) {
      setQuery(queryFromLS);
    } else {
      setQuery('');
    }
  }, []);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(' click searchBTN');
    console.log(query);
    onSubmit(query);
    localStorage.setItem('search', query);
    setQuery('');
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
