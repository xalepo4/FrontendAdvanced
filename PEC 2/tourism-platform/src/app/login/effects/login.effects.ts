import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LoginService} from '../services/login.service';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {login, loginError, loginSuccess} from '../actions';

@Injectable()
export class LoginEffects {

  constructor(
    private actions$: Actions,
    private loginService: LoginService
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
}
