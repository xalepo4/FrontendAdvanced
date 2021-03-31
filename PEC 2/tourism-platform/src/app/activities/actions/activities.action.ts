import {createAction, props} from '@ngrx/store';
import {Activity} from '../models/activity';

export const addActivity = createAction(
  '[ACTIVITY] Add activity',
  props<{ activity: Activity }>()
);

export const addActivitySuccess = createAction(
  '[ACTIVITY] Add activity success',
  props<{ activity: Activity }>()
);

export const addActivityError = createAction(
  '[ACTIVITY] Add activity error',
  props<{ payload: any }>()
);

export const updateActivity = createAction(
  '[ACTIVITY] Update activity',
  props<{ activity: Activity }>()
);

export const updateActivitySuccess = createAction(
  '[ACTIVITY] Update activity success',
  props<{ activity: Activity }>()
);

export const updateActivityError = createAction(
  '[ACTIVITY] Update activity error',
  props<{ payload: any }>()
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
