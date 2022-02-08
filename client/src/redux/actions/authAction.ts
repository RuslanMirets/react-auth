import { ALERT, IAlertType } from './../types/alertType';
import { AUTH, IAuthType } from './../types/authType';
import { postAPI } from './../../utils/FetchData';
import { IUserLogin } from './../../utils/TypeScript';
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

      dispatch({ type: ALERT, payload: { success: "Успешная авторизация" } });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.message } });
    }
  };
