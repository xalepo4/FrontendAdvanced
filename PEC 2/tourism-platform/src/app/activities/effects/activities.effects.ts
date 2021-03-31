import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ActivityService} from '../services/activity.service';
import {
  getAllActivities,
  getAllActivitiesError,
  getAllActivitiesSuccess,
  addActivity,
  addActivitySuccess,
  addActivityError,
  updateActivity,
  updateActivityError,
  updateActivitySuccess,
  deleteActivity,
  deleteActivitySuccess,
  deleteActivityError,
  increaseActivityCounter, decreaseActivityCounter
} from '../actions';
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

  addActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addActivity),
      mergeMap((action) =>
        this.activitiesService.addActivity(action.activity).pipe(
          map((activity) => addActivitySuccess({activity: activity})),
          catchError((err) => of(addActivityError({payload: err})))
        )
      )
    )
  );

  updateActivity = createEffect(() =>
    this.actions$.pipe(
      ofType(updateActivity),
      ofType(increaseActivityCounter),
      ofType(decreaseActivityCounter),
      mergeMap((action) =>
        this.activitiesService.updateActivity(action.activity).pipe(
          map((activity) => updateActivitySuccess({activity: action.activity})),
          catchError((err) => of(updateActivityError({payload: err})))
        )
      )
    )
  );

  deleteActivity = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteActivity),
      mergeMap((action) =>
        this.activitiesService.deleteActivity(action.activity).pipe(
          map((activity) => deleteActivitySuccess({activity: action.activity})),
          catchError((err) => of(deleteActivityError({payload: err})))
        )
      )
    )
  );
}
