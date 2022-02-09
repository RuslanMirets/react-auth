import { validateRegister } from './../../utils/Validation';
import { ALERT, IAlertType } from './../types/alertType';
import { AUTH, IAuthType } from './../types/authType';
import { postAPI } from './../../utils/FetchData';
import { IUserLogin, IUserRegister } from './../../utils/TypeScript';
import { Dispatch } from 'redux';

export const login =
  (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await postAPI('login', userLogin);
      dispatch({
        type: AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });

      dispatch({ type: ALERT, payload: { success: res.data.message } });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.message } });
    }
  };
export const register =
  (userRegister: IUserRegister) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = validateRegister(userRegister);
    if (check.errorLength > 0)
      return dispatch({ type: ALERT, payload: { errors: check.errorMessage } });

    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await postAPI('register', userRegister);

      dispatch({ type: ALERT, payload: { success: res.data.message } });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.message } });
    }
  };
