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
