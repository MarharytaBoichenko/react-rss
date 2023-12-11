import React, { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IFormData, IDataFromForm } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { controlledSlice } from '../../redux/formSlice';
import DataList from '../../components/Autocomplete/Autocomplete';
import { schema, transformYupErrorsIntoObject } from '../../schema';
import InputUncontrolled from '../../components/InputUncontrolled/InputUncontrolled';
import styles from '../UncontrolledForm/UncontrolledForm.module.css';

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
        image: { value: [File] };
        checkbox: { checked: boolean };
        country: { value: string };
      };
    const dataForm = {
      name: name.value,
      age: age.value,
      email: email.value,
      password: password.value,
      gender: gender.value,
      // image: image.value,
      image: imageInputRef.current?.files,
      agreement: checkbox.checked,
      passwordsecond: passwordsecond.value,
      country: 'country',
    };

    const isFormValid = await schema.isValid(dataForm, {
      abortEarly: false,
    });

    if (isFormValid) {
      formRef.current?.reset();
      navigate('/');
    } else {
      schema.validate(dataForm, { abortEarly: false }).catch((err) => {
        const validationErrors = transformYupErrorsIntoObject(err);
        console.log('errorsFoRender', errorsFoRender);
        console.log('validationErrors', validationErrors);
        setErrorsFoRender({ ...errorsFoRender, ...validationErrors });
        return;
      });
    }

    if (imageInputRef.current?.files) {
      const reader = new FileReader();
      await reader.readAsDataURL(imageInputRef.current?.files[0]);
      reader.onload = () => {
        const Base64 = reader.result as string;
        const newData: IFormData = { ...dataForm, image: Base64 };
        dispatch(controlledSlice.actions.getDataForm(newData));
      };
    }
  };
  return (
    <>
      <h2 className={styles.title}>Uncontrolled Form</h2>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <div className={styles.fields}>
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
            label={'Confirm password'}
            errorMessage={errorsFoRender?.passwordsecond && errorsFoRender.passwordsecond}
            type={'password'}
            id={'password-second'}
            name={'passwordsecond'}
            placeholder="confirm password"
          />
        </div>
        <div className={styles.gender}>
          <h3 className={styles.subtitle}>Choose your gender</h3>
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
              type={'radio'}
              id={'gender-male'}
              value={Gender.MALE}
            />
          </div>
          <p className={styles.error}>{errorsFoRender?.gender && errorsFoRender.gender}</p>
        </div>
        <InputUncontrolled
          label={' I agree with terms and conditions'}
          errorMessage={errorsFoRender?.agreement && errorsFoRender.agreement}
          type={'checkbox'}
          id={'checkbox'}
        />
        <div className={styles.image}>
          <label htmlFor="image" className={styles.label}>
            <span className={styles.text}>Please upload image (png or jpeg)</span>
            <input type="file" id="image" ref={imageInputRef} name="image" />
          </label>
          <p className={styles.error}>{errorsFoRender.image}</p>
        </div>
        <DataList list={countries} />
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default UncontrolledForm;
