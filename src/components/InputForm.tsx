import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
type FormInputProps = {
  label: string;
  register: UseFormRegisterReturn;
  errorMessage?: string;
  type?: string;
  value?: string;
  id?: string;
};

const InputForm: React.FC<FormInputProps> = ({
  label,
  register,
  errorMessage,
  type,
  value,
  id,
}) => {
  return (
    <div>
      <label htmlFor={id}>
        {label}
        <input type={type ?? undefined} {...register} id={id} placeholder={label} value={value} />
      </label>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default InputForm;
