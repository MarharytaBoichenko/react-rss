import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { FormData } from '../types';
import { useAppDispatch } from '../hooks/hooks';
import { controlledSlice } from '../redux/formSlice';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(7)
    .required('Please enter a password')
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{7,16}$/,
      'Must Contain min 7 Characters, one Uppercase, one Lowercase, one Number and one special case Character'
    ),
  passwordsecond: yup
    .string()
    .min(7)
    .required('Confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  name: yup
    .string()
    .required()
    .matches(/^[A-Z][a-z]*$/, 'First letter  should be  capital'),
  age: yup.number().required().positive().integer(),
  gender: yup.string().required('Choose your  gender'),
  agreement: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
});

const ControlledForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmitHandler = (data: FormData) => {
    console.log(data);
    dispatch(controlledSlice.actions.getDataForm(data));
    navigate('/');
    reset();
  };

  const Gender = {
    MALE: 'male',
    FEMALE: 'female',
  };

  return (
    <main>
      <h2>React Hook Form</h2>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <label htmlFor="name">
          Name
          <input type="text" {...register('name')} id="name" placeholder="name" />
        </label>
        {errors.name?.message && <p>{errors.name?.message}</p>}
        <label htmlFor="age">
          Age
          <input type="number" {...register('age')} id="age" placeholder="age" />
        </label>
        {errors.age?.message && <p>{errors.age?.message}</p>}
        <label htmlFor="email">
          Email
          <input type="email" {...register('email')} id="email" placeholder="email" />
        </label>
        {errors.email?.message && <p>{errors.email?.message}</p>}
        <label htmlFor="password">
          Password
          <input type="text" {...register('password')} id="password" placeholder="password" />
        </label>
        {errors.password?.message && <p>{errors.password?.message}</p>}
        <label htmlFor="password-second">
          Repeat password
          <input
            type="password"
            {...register('passwordsecond')}
            id="password-second"
            placeholder="confirm password"
          />
        </label>
        {errors.passwordsecond?.message && <p>{errors.passwordsecond?.message}</p>}
        <div>
          <h3>Choose your gender</h3>
          <label htmlFor="gender">
            Female
            <input type="radio" {...register('gender')} id="gender" value={Gender.FEMALE} />
          </label>
          <label htmlFor="gender">
            Male
            <input type="radio" {...register('gender')} id="gender" value={Gender.MALE} />
          </label>
          {errors.gender?.message && <p>{errors.gender?.message}</p>}
        </div>
        <label htmlFor="">
          I agree with terms and conditions
          <input type="checkbox" {...register('agreement')} />
        </label>
        {errors.agreement?.message && <p>{errors.agreement?.message}</p>}
        <label htmlFor="image">
          Please upload image (png or jpeg)
          <input type="file" {...register('image')} accept="image/png, image/jpeg" id="image" />
        </label>
        {/* <label htmlFor="">
          <input type="" name="country" />
        </label> */}
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </main>
  );
};

export default ControlledForm;
