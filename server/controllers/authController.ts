import { generateActiveToken } from './../config/generateToken';
import { Request, Response } from 'express';
import Users from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;

      const candidate = await Users.findOne({ account });
      if (candidate)
        return res
          .status(400)
          .json({ message: 'Адрес электронной почты или номер телефона уже существует' });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        account,
        password: passwordHash,
      };

      const active_token = generateActiveToken({newUser});

      res.json({ status: 'OK', message: 'Успешная регистрация', data: newUser, active_token });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export default authController;
