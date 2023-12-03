import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from '../Autocomplete/Autocomplete.module.css';

type Country = {
  name: string;
  code: string;
};
type CountriesListProps = {
  list: Country[];
  register?: UseFormRegisterReturn;
};

const DataList: React.FC<CountriesListProps> = ({ list, register }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="country-choice">
        <span className={styles.text}> Choose a country:</span>

        <input
          list="country-list"
          id="country-choice"
          {...register}
          autoComplete="off"
          className={styles.input}
        />
      </label>
      <datalist id="country-list">
        {list.map((item) => (
          <option value={item.name} key={item.name}></option>
        ))}
      </datalist>
    </div>
  );
};

export default DataList;
