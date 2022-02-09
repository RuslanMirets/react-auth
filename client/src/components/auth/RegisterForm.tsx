import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/authAction';
import { FormSubmit, InputChange } from '../../utils/TypeScript';

const RegisterForm = () => {
  const initialState = { name: '', email: '', password: '' };
  const [userRegister, setUserRegister] = useState(initialState);
  const { name, email, password } = userRegister;

  const [typePass, setTypePass] = useState(false);

  const dispatch = useDispatch();

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    dispatch(register(userRegister));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="name">
          Имя
        </label>
        <input
          className="form-control"
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={handleChangeInput}
        />
      </div>
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
      <button className="btn btn-dark w-100 mb-4 mt-1" type="submit">
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
