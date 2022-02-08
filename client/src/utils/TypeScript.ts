import { ChangeEvent, FormEvent } from 'react';

export type InputChange = ChangeEvent<HTMLInputElement>;
export type FormSubmit = FormEvent<HTMLFormElement>;
export interface IParams {
  page?: string;
  slug?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
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
