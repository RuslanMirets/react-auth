import { ChangeEvent, FormEvent } from 'react';
import rootReducer from '../redux/reducers/index';

export type InputChange = ChangeEvent<HTMLInputElement>;
export type FormSubmit = FormEvent<HTMLFormElement>;

export type RootStore = ReturnType<typeof rootReducer>;

export interface IParams {
  page?: string;
  slug?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUserRegister extends IUserLogin {
  name: string;
}

export interface IUser extends IUserLogin {
  _id: string;
  name: string;
  role: string;
  type: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAlert {
  loading?: boolean;
  success?: string | string[];
  errors?: string | string[];
}
