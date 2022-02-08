import mongoose from 'mongoose';
import { IUser } from '../config/interface';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Пожалуйста, добавьте свое имя'],
      trim: true,
      maxLength: [20, 'Ваше имя может содержать до 20 символов'],
    },
    email: {
      type: String,
      required: [true, 'Пожалуйста, добавьте свой адрес электронной почты'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Пожалуйста, добавьте свой пароль'],
      trim: true,
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
    },
    role: {
      type: String,
      default: 'user', // admin
    },
    type: {
      type: String,
      default: 'register', // login
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUser>('User', userSchema);
