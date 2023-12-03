import React, { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IFormData } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { controlledSlice } from '../redux/formSlice';
import DataList from '../components/Autocomplete';
import { schema, transformYupErrorsIntoObject } from '../schema';
import InputUncontrolled from '../components/InputUncontrolled/InputUncontrolled';
import styles from '../components/InputUncontrolled/InputUncontrolled.module.css';

const Gender = {
  MALE: 'male',
  FEMALE: 'female',
};

const UncontrolledForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [errorsFoRender, setErrorsFoRender] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    passwordsecond: '',
    gender: '',
    image: '',
    agreement: '',
    country: '',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.formControlled.countries);

  const onSubmitHandler = async (evt: FormEvent) => {
    evt.preventDefault();
    const { name, age, email, password, passwordsecond, image, gender, checkbox } =
      evt.target as typeof evt.target & {
        name: { value: string };
        age: { value: number };
        email: { value: string };
        password: { value: string };
        passwordsecond: { value: string };
        gender: { value: 'male' | 'female' };
        image: { value: FileList };
        checkbox: { checked: boolean };
        country: { value: string };
      };

    const dataForm = {
      name: name.value,
      age: age.value,
      email: email.value,
      password: password.value,
      gender: gender.value,
      image: image.value,
      // checkbox: checkbox.checked,
      agreement: checkbox.checked,
      passwordsecond: passwordsecond.value,
      country: 'country',
    };

    const isFormValid = await schema.isValid(dataForm, {
      abortEarly: false,
    });

    if (isFormValid) {
      console.log('Form is legit');
      formRef.current?.reset();
      navigate('/');
    } else {
      schema.validate(dataForm, { abortEarly: false }).catch((err) => {
        console.log(err);
        console.log(err.name);
        console.log(err.errors);
        console.log(err.inner);
        const validationErrors = transformYupErrorsIntoObject(err);
        console.log('errorsFoRender', errorsFoRender);
        console.log('validationErrors', validationErrors);
        setErrorsFoRender({ ...errorsFoRender, ...validationErrors });
        return;
      });
    }

    const encodeFileBase64 = (file: File) => {
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          const Base64 = reader.result as string;
          const newData: IFormData = { ...dataForm, image: Base64 };
          console.log(newData);
          dispatch(controlledSlice.actions.getDataForm(newData));
        };
      }

      reader.onerror = (error) => {
        console.log('error: ', error);
      };
    };
    console.log(imageInputRef !== null);
    if (
      imageInputRef.current?.files !== null &&
      typeof imageInputRef.current?.files[0] !== 'string'
    ) {
      const imageToEncode = imageInputRef.current?.files[0];
      encodeFileBase64(imageToEncode as File);
    }
  };
  console.log(errorsFoRender?.name);
  return (
    <main>
      <h2>Uncontrolled Form</h2>
      <form onSubmit={onSubmitHandler}>
        <InputUncontrolled
          label={'Name'}
          errorMessage={errorsFoRender?.name && errorsFoRender.name}
          type={'text'}
          id={'name'}
          placeholder={'Name'}
        />
        <InputUncontrolled
          label={'Age'}
          errorMessage={errorsFoRender?.age && errorsFoRender.age}
          type={'number'}
          id={'age'}
          placeholder={'age'}
        />
        <InputUncontrolled
          label={'Email'}
          type={'email'}
          id={'email'}
          placeholder={'email@email'}
          errorMessage={errorsFoRender?.email && errorsFoRender.email}
        />
        <InputUncontrolled
          label={'Password'}
          errorMessage={errorsFoRender?.password && errorsFoRender.password}
          type={'password'}
          id={'password'}
          placeholder={'passWord12-3'}
        />
        <InputUncontrolled
          label={'Repeat password'}
          errorMessage={errorsFoRender?.passwordsecond && errorsFoRender.passwordsecond}
          type={'password'}
          id={'password-second'}
          name={'passwordsecond'}
          placeholder="confirm password"
        />
        <div>
          <h3>Choose your gender</h3>
          <div className={styles.wrapper}>
            <InputUncontrolled
              label={'Female'}
              name={'gender'}
              type={'radio'}
              id={'gender-female'}
              value={Gender.FEMALE}
            />
            <InputUncontrolled
              label={'Male'}
              name={'gender'}
              errorMessage={errorsFoRender?.gender && errorsFoRender.gender}
              type={'radio'}
              id={'gender-male'}
              value={Gender.MALE}
            />
          </div>
        </div>
        <InputUncontrolled
          label={' I agree with terms and conditions'}
          errorMessage={errorsFoRender?.agreement && errorsFoRender.agreement}
          type={'checkbox'}
          id={'checkbox'}
        />
        <div>
          <label htmlFor="image">
            Please upload image (png or jpeg)
            <input type="file" id="image" ref={imageInputRef} name="image" />
          </label>
          <p className={styles.error}>{errorsFoRender.image}</p>
        </div>
        <DataList list={countries} />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default UncontrolledForm;
