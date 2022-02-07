import { generateAccessToken } from './../config/generateToken';
import { Request, Response } from 'express';
import Users from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const CLIENT_URL = `${process.env.BASE_URL}`;

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

      const access_token = generateAccessToken({ newUser });

      const user = new Users(newUser);

      await user.save();

      res.json({
        status: 'OK',
        msg: 'Register successfully.',
        data: newUser,
        access_token,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export default authController;
