import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LoginService} from '../services/login.service';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  login,
  loginError,
  loginSuccess,
  logout,
  logoutError,
  logoutSuccess,
  register,
  registerError,
  registerSuccess
} from '../actions';
import {RegisterService} from '../services/register.service';

@Injectable()
export class LoginEffects {

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private registerService: RegisterService
  ) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((action) =>
        this.loginService.logIn(action.email, action.password).pipe(
          map((loggedIn) => loginSuccess({loggedIn: loggedIn})),
          catchError((err) => of(loginError({payload: err})))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      mergeMap((action) =>
        this.registerService.register(action.user).pipe(
          map((registered) => registerSuccess({registered: registered})),
          catchError((err) => of(registerError({payload: err})))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      mergeMap(() =>
        this.loginService.logOut().pipe(
          map(() => logoutSuccess({loggedIn: false})),
          catchError((err) => of(logoutError({payload: err})))
        )
      )
    )
  );
}
