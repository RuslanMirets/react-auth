import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <div className="auth-page">
      <div className="auth-box">
        <h3 className="text-uppercase text-center mb-4">Регистрация</h3>
        <RegisterForm />
        <p>
          У вас есть аккаунта?{' '}
          <Link to="/login" style={{ color: 'crimson' }}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
