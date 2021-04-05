import {createReducer, on} from '@ngrx/store';
import {
  login,
  loginSuccess,
  loginError,
  register,
  registerSuccess,
  registerError,
  logout,
  logoutSuccess,
  logoutError
} from '../actions';

export interface LoginState {
  init: boolean;
  loggingIn: boolean;
  loggedIn: boolean;
  registering: boolean;
  registered: boolean;
  error: any;
}

export const initialState: LoginState = {
  init: false,
  loggingIn: false,
  loggedIn: false,
  registering: false,
  registered: false,
  error: null
};

const _loginReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    init: true,
    loggingIn: true,
    loggedIn: false,
    registering: false,
    registered: false,
  })),
  on(loginSuccess, (state, {loggedIn}) => ({
    ...state,
    loggingIn: false,
    loggedIn: loggedIn,
  })),
  on(loginError, (state, {payload}) => ({
    ...state,
    loggingIn: false,
    loggedIn: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message
    }
  })),
  on(register, (state) => ({
    ...state,
    init: true,
    loggingIn: false,
    loggedIn: false,
    registering: true,
    registered: false,
    checkingUserExists: false,
    userExists: false,
  })),
  on(registerSuccess, (state, {registered}) => ({
    ...state,
    registering: false,
    registered: registered,
    loggedIn: true
  })),
  on(registerError, (state, {payload}) => ({
    ...state,
    registering: false,
    registered: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message
    }
  })),
  on(logout, (state) => ({
    ...state,
  })),
  on(logoutSuccess, (state) => ({
    ...state,
    loggedIn: false,
  })),
  on(logoutError, (state, {payload}) => ({
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

export function loginReducer(state, action) {
  return _loginReducer(state, action);
}
