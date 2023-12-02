import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
type Country = {
  name: string;
  code: string;
};
type CountriesListProps = {
  list: Country[];
  register: UseFormRegisterReturn;
};

const DataList: React.FC<CountriesListProps> = ({ list, register }) => {
  return (
    <div>
      <label htmlFor="country-choice">Choose a country: </label>
      <input list="country-list" id="country-choice" {...register} />
      <datalist id="country-list">
        {list.map((item) => (
          <option value={item.name} key={item.name}></option>
        ))}
      </datalist>
    </div>
  );
};

export default DataList;
