import {createAction, props} from '@ngrx/store';
import {User} from '../../profile/models/user';

export const login = createAction(
  '[LOGIN] Login',
  props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
  '[LOGIN] Login success',
  props<{ loggedIn: boolean }>()
);

export const loginError = createAction(
  '[LOGIN] Login error',
  props<{ payload: any }>()
);

export const register = createAction(
  '[LOGIN] Register',
  props<{ user: User }>()
);

export const registerSuccess = createAction(
  '[LOGIN] Register success',
  props<{ registered: boolean }>()
);

export const registerError = createAction(
  '[LOGIN] Register error',
  props<{ payload: any }>()
);

export const logout = createAction(
  '[LOGIN] Logout',
);

export const logoutSuccess = createAction(
  '[LOGIN] Logout success',
  props<{ loggedIn: boolean }>()
);

export const logoutError = createAction(
  '[LOGIN] Logout error',
  props<{ payload: any }>()
);
