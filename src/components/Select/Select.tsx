import { useLocation } from 'react-router-dom';
import { SelectProps } from '../types';
import styles from './Select.module.css';

const Select: React.FC<SelectProps> = ({ handleSelect }) => {
  const location = useLocation();
  return (
    <div>
      <select
        className={styles.select}
        onChange={handleSelect}
        disabled={location.pathname !== '/'}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
};

export default Select;
