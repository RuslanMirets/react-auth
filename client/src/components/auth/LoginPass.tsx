import React, { useState } from 'react';
import { InputChange } from '../../utils/TypeScript';

const LoginPass = () => {
  const initialState = { email: '', password: '' };
  const [userLogin, setUserLogin] = useState(initialState);
  const { email, password } = userLogin;

  const [typePass, setTypePass] = useState(false);

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  return (
    <form>
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          className="form-control"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChangeInput}
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="password">
          Пароль
        </label>
        <div className="pass">
          <input
            className="form-control"
            id="password"
            name="password"
            type={typePass ? 'text' : 'password'}
            value={password}
            onChange={handleChangeInput}
          />
          <small onClick={() => setTypePass(!typePass)}>{typePass ? 'Hide' : 'Show'}</small>
        </div>
      </div>
      <button
        className="btn btn-dark w-100 mb-4 mt-1"
        type="submit"
        disabled={email && password ? false : true}>
        Войти
      </button>
    </form>
  );
};

export default LoginPass;
