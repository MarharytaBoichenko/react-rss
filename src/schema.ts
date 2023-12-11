import * as yup from 'yup';
import { ValidationError } from 'yup';

export const schema = yup.object().shape({
  country: yup.string().required('Please choose  a  country'),
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
  age: yup.number().required('Please  enter  your  age').positive().integer().min(0).max(120),
  gender: yup.string().required('Choose your  gender'),
  agreement: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
  image: yup
    .mixed<[File]>()
    .required()
    .test(
      'type',
      'please  choose png  or  jpeg file',
      (value: [File]) =>
        value[0] && (value[0].type === 'image/png' || value[0].type === 'image/jpeg')
    )
    .test(
      'fileSize',
      'the  file  is too  large',
      (value: [File]) => value[0] && value[0].size <= 1000000
    ),
});

export const transformYupErrorsIntoObject = (errors: ValidationError) => {
  const validationErrors: Record<string, string> = {};

  errors.inner.forEach((error) => {
    if (error.path !== undefined) {
      validationErrors[error.path] = error.errors[0];
    }
  });

  return validationErrors;
};
