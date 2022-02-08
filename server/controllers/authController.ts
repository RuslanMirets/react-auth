import { IUser, IDecodedToken } from './../config/interface';
import { generateAccessToken, generateRefreshToken } from './../config/generateToken';
import { Request, Response } from 'express';
import Users from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      const candidate = await Users.findOne({ email });
      if (candidate)
        return res
          .status(400)
          .json({ message: 'Адрес электронной почты или номер телефона уже существует' });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        email,
        password: passwordHash,
      };

      const access_token = generateAccessToken({ newUser });

      const user = new Users(newUser);
      await user.save();

      res.json({
        status: 'OK',
        msg: 'Успешная регистрация',
        data: newUser,
        access_token,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Такого аккаунта не существует' });

      // if user exists
      loginUser(user, password, res);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie('refreshtoken', { path: `/api/refresh_token` });
      return res.json({ message: 'Выход из системы' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ message: 'Пожалуйста, войдите в аккаунт' });

      const decoded = <IDecodedToken>jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`);
      if (!decoded.id) return res.status(400).json({ message: 'Пожалуйста, войдите в аккаунт' });

      const user = await Users.findById(decoded.id).select('-password');
      if (!user) return res.status(400).json({ message: 'Такого аккаунта не существует' });

      const access_token = generateAccessToken({ id: user._id });

      res.json({ access_token });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' });

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id });

  res.cookie('refreshtoken', refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.json({
    message: 'Успешная авторизация',
    access_token,
    user: { ...user._doc, password: '' },
  });
};

export default authController;
