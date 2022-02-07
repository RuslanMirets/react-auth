import { Request, Response, NextFunction } from 'express';

export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
  const { name, account, password } = req.body;

  if (!name) {
    return res.status(400).json({ msg: 'Пожалуйста, добавьте свое имя' });
  } else if (name.length > 20) {
    return res.status(400).json({ msg: 'Ваше имя может содержать до 20 символов' });
  }

  if (!account) {
    return res
      .status(400)
      .json({ msg: 'Пожалуйста, добавьте свой адрес электронной почты или номер телефона' });
  } else if (!validPhone(account) && !validateEmail(account)) {
    return res.status(400).json({ msg: 'Неверный формат электронной почты или номера телефона' });
  }

  if (password.length < 6) {
    return res.status(400).json({ msg: 'Пароль должен содержать не менее 6 символов' });
  }

  next();
};

function validPhone(phone: string) {
  const re = /^[+]/g;
  return re.test(phone);
}

function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
