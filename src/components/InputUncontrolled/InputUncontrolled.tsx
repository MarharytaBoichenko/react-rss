import React from 'react';
import { LegacyRef } from 'react';
import styles from '../InputUncontrolled/InputUncontrolled.module.css';

type InputUncontrolledProps = {
  label: string;
  errorMessage?: string;
  type?: string;
  value?: string;
  id?: string;
  ref?: LegacyRef<HTMLInputElement>;
  placeholder?: string;
  name?: string;
};

const InputUncontrolled: React.FC<InputUncontrolledProps> = ({
  label,
  errorMessage,
  type,
  value,
  id,
  ref,
  placeholder,
  name,
}) => {
  return (
    <div>
      <label htmlFor={id}>
        {label}
        <input
          type={type ?? undefined}
          id={id}
          placeholder={placeholder}
          value={value}
          ref={ref}
          name={name}
        />
      </label>
      <p className={styles.error}>{errorMessage}</p>
    </div>
  );
};

export default InputUncontrolled;
