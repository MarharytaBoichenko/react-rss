import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Searchbar.module.css';

const Searchbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(localStorage.getItem('search') || '');

  useEffect(() => {
    console.log('in search');
    if (!searchParams.get('search')) {
      setQuery('');
    }
  }, [searchParams]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    setSearchParams({ search: query });
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
