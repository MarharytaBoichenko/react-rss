import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { IFormData } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { controlledSlice } from '../redux/formSlice';
import DataList from '../components/Autocomplete';
import InputForm from '../components/InputForm';
import { schema } from '../schema';

const ControlledForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.formControlled.countries);

  const onSubmitHandler = (data: IFormData) => {
    const imageToEncode = Array(data.image)[0];
    console.log(imageToEncode);
    const encodeFileBase64 = (file: FileList) => {
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file[0]);
        reader.onload = () => {
          const Base64 = reader.result as string;
          const newData: IFormData = { ...data, image: Base64 };
          dispatch(controlledSlice.actions.getDataForm(newData));
        };
      }

      reader.onerror = (error) => {
        console.log('error: ', error);
      };
    };

    if (typeof data.image !== 'string') encodeFileBase64(data.image);

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
        <InputForm
          label={'Name'}
          type={'text'}
          id={'name'}
          register={{ ...register('name') }}
          errorMessage={errors['name']?.message}
        />
        <InputForm
          label={'Age'}
          type={'age'}
          id={'age'}
          register={{ ...register('age') }}
          errorMessage={errors['age']?.message}
        />
        <InputForm
          label={'Email'}
          type={'email'}
          id={'email'}
          register={{ ...register('email') }}
          errorMessage={errors['email']?.message}
        />
        <InputForm
          label={'Password'}
          // type={'password'}
          type={'text'}
          id={'password'}
          register={{ ...register('password') }}
          errorMessage={errors['password']?.message}
        />
        <InputForm
          label={'Confirm  your  password'}
          type={'password'}
          id={'passwordsecond'}
          register={{ ...register('passwordsecond') }}
          errorMessage={errors['passwordsecond']?.message}
        />
        <div>
          <h3>Choose your gender</h3>
          <InputForm
            label={Gender.FEMALE}
            type={'radio'}
            value={Gender.FEMALE}
            id={Gender.FEMALE}
            register={{ ...register('gender') }}
            errorMessage={errors['gender']?.message}
          />
          <InputForm
            label={Gender.MALE}
            type={'radio'}
            value={Gender.MALE}
            id={Gender.MALE}
            register={{ ...register('gender') }}
            errorMessage={errors['gender']?.message}
          />
        </div>
        <InputForm
          label={'I  agree  with  terms and conditions'}
          type={'checkbox'}
          id={'checkbox'}
          register={{ ...register('agreement') }}
          errorMessage={errors['agreement']?.message}
        />
        <InputForm
          label={' Please upload image (png or jpeg)'}
          type={'file'}
          id={'image'}
          register={{ ...register('image') }}
          errorMessage={errors['image']?.message}
        />
        <DataList list={countries} register={{ ...register('country') }} />
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </main>
  );
};

export default ControlledForm;
