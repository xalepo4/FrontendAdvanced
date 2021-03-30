import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ActivityService} from '../services/activity.service';
import {getAllActivities, getAllActivitiesError, getAllActivitiesSuccess} from '../actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class ActivitiesEffects {

  constructor(
    private actions$: Actions,
    private activitiesService: ActivityService
  ) {
  }

  getActivities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllActivities),
      mergeMap(() =>
        this.activitiesService.getActivities().pipe(
          map((activities) => getAllActivitiesSuccess({activities: activities})),
          catchError((err) => of(getAllActivitiesError({payload: err})))
        )
      )
    )
  );
}
