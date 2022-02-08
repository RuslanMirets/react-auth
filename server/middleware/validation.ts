import { Request, Response, NextFunction } from 'express';

export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  const errors = [];

  if (!name) {
    errors.push('Пожалуйста, добавьте свое имя');
  } else if (name.length > 20) {
    errors.push('Ваше имя может содержать до 20 символов');
  }

  if (!email) {
    return res.status(400).json({ msg: 'Пожалуйста, добавьте свой адрес электронной почты' });
  } else if (!validateEmail(email)) {
    errors.push('Неверный формат электронной почты');
  }

  if (password.length < 6) {
    errors.push('Пароль должен содержать не менее 6 символов');
  }

  if (errors.length > 0) return res.status(400).json({ message: errors });

  next();
};

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
