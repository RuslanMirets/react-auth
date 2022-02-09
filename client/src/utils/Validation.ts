import { IUserRegister } from './TypeScript';

export const validateRegister = (userRegister: IUserRegister) => {
  const { name, email, password } = userRegister;
  const errors: string[] = [];

  if (!name) {
    errors.push('Пожалуйста, добавьте свое имя');
  } else if (name.length > 20) {
    errors.push('Ваше имя может содержать до 20 символов');
  }

  if (!email) {
    errors.push('Пожалуйста, добавьте свой адрес электронной почты');
  } else if (!validateEmail(email)) {
    errors.push('Неверный формат электронной почты');
  }

  if (password.length < 6) {
    errors.push('Пароль должен содержать не менее 6 символов');
  }

  return {
    errorMessage: errors,
    errorLength: errors.length,
  };
};

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
