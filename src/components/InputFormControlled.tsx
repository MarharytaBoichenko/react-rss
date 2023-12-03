import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
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
      <label htmlFor={id}>
        {label}
        <input
          type={type ?? undefined}
          {...register}
          id={id}
          placeholder={placeholder}
          value={value}
        />
      </label>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default InputFormControlled;
