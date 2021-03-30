import {createAction, props} from '@ngrx/store';
import {Activity} from '../models/activity';

export const createActivity = createAction(
  '[ACTIVITY] Create activity',
  props<{ activity: Activity }>()
);

export const updateActivity = createAction(
  '[ACTIVITY] Update activity',
  props<{ activity: Activity }>()
);

export const deleteActivity = createAction(
  '[ACTIVITY] Delete activity',
  props<{ id: number }>()
);

export const getAllActivities = createAction(
  '[ACTIVITIES] Get all activities'
);

export const getAllActivitiesSuccess = createAction(
  '[ACTIVITIES] Get all activities success',
  props<{ activities: Activity[] }>()
);

export const getAllActivitiesError = createAction(
  '[TODOS] Get all activities error',
  props<{ payload: any }>()
);
