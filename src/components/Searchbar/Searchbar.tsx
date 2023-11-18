import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import styles from './Searchbar.module.css';
import { changeSearch } from '../../redux/searchSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

const Searchbar = () => {
  const [query, setQuery] = useState(localStorage.getItem('search') || '');
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.search);
  console.log('searchState', searchState);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    setQuery(query || '');
  }, [query]);

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(changeSearch({ search: query }));
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
