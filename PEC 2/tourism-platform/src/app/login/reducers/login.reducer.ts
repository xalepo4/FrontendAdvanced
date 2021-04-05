import {createReducer, on} from '@ngrx/store';
import {login, loginSuccess, loginError} from '../actions';

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
