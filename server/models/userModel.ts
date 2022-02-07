import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Пожалуйста, добавьте свое имя'],
      trim: true,
      maxLength: [20, 'Ваше имя может содержать до 20 символов'],
    },
    account: {
      type: String,
      required: [true, 'Пожалуйста, добавьте свой адрес электронной почты или телефон'],
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
      defaul: 'user', // admin
    },
    type: {
      type: String,
      defaul: 'normal', // fast
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', userSchema);
