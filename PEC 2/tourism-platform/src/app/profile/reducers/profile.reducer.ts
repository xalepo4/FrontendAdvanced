import {User} from '../models/user';
import {createReducer, on} from '@ngrx/store';
import {getUser, getUserSuccess, getUserError, updateUser, updateUserSuccess, updateUserError} from '../actions';

export interface ProfileState {
  users: User[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: ProfileState = {
  users: [],
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
    users: [...state.users, user]
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
    users: [...state.users.map((usr) => {
      if (usr.id === user.id) {
        return user;
      } else {
        return usr;
      }
    })]
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
