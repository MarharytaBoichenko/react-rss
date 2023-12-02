import * as yup from 'yup';

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
  age: yup.number().required().positive().integer(),
  gender: yup.string().required('Choose your  gender'),
  agreement: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
  image: yup
    .mixed()
    .required()
    .test(
      'fileSize',
      'the  file  is too  large',
      (value: FileList) => value && value[0]?.size <= 1000000
    )
    .test('type', 'please  choose png  or  jpeg', (value: FileList) => {
      return (value && value[0]?.type === 'image/png') || value[0]?.type === 'image/jpeg';
    }),
});
