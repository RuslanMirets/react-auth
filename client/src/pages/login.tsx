import React from 'react';
import { Link } from 'react-router-dom';
import LoginPass from '../components/auth/LoginPass';

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-box">
        <h3 className="text-uppercase text-center mb-4">Авторизация</h3>
        <LoginPass />
        <p>
          У вас нет аккаунта?{' '}
          <Link to="/register" style={{ color: 'crimson' }}>
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
