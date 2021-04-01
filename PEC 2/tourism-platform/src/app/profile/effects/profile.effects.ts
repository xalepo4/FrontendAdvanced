import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../services/user.service';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {getUser, getUserError, getUserSuccess, updateUser, updateUserError, updateUserSuccess} from '../actions';

@Injectable()
export class ProfileEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {
  }

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      mergeMap((action) =>
        this.userService.getUser(action.userId).pipe(
          map((user) => getUserSuccess({user: user})),
          catchError((err) => of(getUserError({payload: err})))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap((action) =>
        this.userService.updateUser(action.user).pipe(
          map((user) => updateUserSuccess({user: action.user})),
          catchError((err) => of(updateUserError({payload: err})))
        )
      )
    )
  );

}
