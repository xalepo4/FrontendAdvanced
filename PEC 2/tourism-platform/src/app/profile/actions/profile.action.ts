import {createAction, props} from '@ngrx/store';
import {User} from '../models/user';

export const getUser = createAction(
  '[PROFILE] Get user',
  props<{ userId: number }>()
);

export const getUserSuccess = createAction(
  '[PROFILE] Get user success',
  props<{ user: User }>()
);

export const getUserError = createAction(
  '[PROFILE] Get user error',
  props<{ payload: any }>()
);

export const updateUser = createAction(
  '[PROFILE] Update user',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  '[PROFILE] Update user success',
  props<{ user: User }>()
);

export const updateUserError = createAction(
  '[PROFILE] Update user error',
  props<{ payload: any }>()
);



