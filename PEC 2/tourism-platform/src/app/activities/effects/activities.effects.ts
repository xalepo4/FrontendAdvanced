import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ActivityService} from '../services/activity.service';
// import {getAllTodos, getAllTodosError, getAllTodosSuccess} from '../actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class ActivitiesEffects {

  constructor(
    private actions$: Actions,
    private activitiesService: ActivityService
  ) {
  }

  /*getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTodos),
      mergeMap(() =>
        this.todosService.getAllTodos().pipe(
          map((todos) => getAllTodosSuccess({todos: todos})),
          catchError((err) => of(getAllTodosError({payload: err})))
        )
      )
    )
  );*/
}
