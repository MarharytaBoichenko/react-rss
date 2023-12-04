import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './/InputFormControlled.module.css';
type FormInputProps = {
  label: string;
  register: UseFormRegisterReturn;
  errorMessage?: string;
  type?: string;
  value?: string;
  id?: string;
  placeholder?: string;
};

const InputFormControlled: React.FC<FormInputProps> = ({
  label,
  register,
  errorMessage,
  type,
  value,
  id,
  placeholder,
}) => {
  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        <span className={styles.text}>{label}: </span>
        <input
          className={styles.input}
          type={type ?? undefined}
          {...register}
          id={id}
          placeholder={placeholder}
          value={value}
        />
      </label>
      <p className={styles.error}>{errorMessage}</p>
    </div>
  );
};

export default InputFormControlled;
