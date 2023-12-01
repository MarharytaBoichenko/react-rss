export type FormData = {
  id: string;
  email: string;
  password: string;
  passwordsecond: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  agreement: boolean;
  image: string;
};

export type FormDataList = {
  list: FormData[];
};
