export interface IFormData {
  id?: string;
  email: string;
  password: string;
  passwordsecond: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  agreement: boolean;
  image: string | FileList;
  country: string;
  key?: string;
}

export type Country = {
  name: string;
  code: string;
};

export type FormDataList = {
  list: IFormData[];
  countries: Country[];
};
