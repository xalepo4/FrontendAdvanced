import {User} from '../models/user';
import {createReducer, on} from '@ngrx/store';
import {getUser, getUserSuccess, getUserError, updateUser, updateUserSuccess, updateUserError} from '../actions';

export interface ProfileState {
  user: User;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: ProfileState = {
  user: null,
  loading: false,
  loaded: false,
  error: null
};


const _profileReducer = createReducer(
  initialState,
  on(getUser, state => ({
    ...state,
    loading: true,
    loaded: false
  })),
  on(getUserSuccess, (state, {user}) => ({
    ...state,
    loading: false,
    loaded: true,
    user: user
  })),
  on(getUserError, (state, {payload}) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message
    }
  })),
  on(updateUser, state => ({
    ...state,
    loading: true,
    loaded: false
  })),
  on(updateUserSuccess, (state, {user}) => ({
    ...state,
    loading: false,
    loaded: true,
    user: user
  })),
  on(updateUserError, (state, {payload}) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message
    }
  })),
);

export function profileReducer(state, action) {
  return _profileReducer(state, action);
}
