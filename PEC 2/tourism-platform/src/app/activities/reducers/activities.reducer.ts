import {Activity} from '../models/activity';
import {
  addActivity,
  addActivitySuccess,
  addActivityError,
  updateActivity,
  updateActivitySuccess,
  updateActivityError,
  deleteActivity,
  deleteActivitySuccess,
  deleteActivityError,
  getAllActivities,
  getAllActivitiesSuccess,
  getAllActivitiesError
} from '../actions';
import {createReducer, on} from '@ngrx/store';

export interface ActivityState {
  activities: Activity[];
  loading: boolean;
  loaded: boolean;
  updating: boolean;
  updated: boolean;
  error: any;
}

export const initialState: ActivityState = {
  activities: [],
  loading: false,
  loaded: false,
  updating: false,
  updated: false,
  error: null
};

const _activityReducer = createReducer(
  initialState,
  on(addActivity, state => ({
    ...state,
    loading: false,
    loaded: false,
    updating: true,
    updated: false
  })),
  on(addActivitySuccess, (state, {activity}) => ({
    ...state,
    updating: false,
    updated: true,
    activities: [...state.activities, activity]
  })),
  on(addActivityError, (state, {payload}) => ({
    ...state,
    updating: false,
    updated: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message
    }
  })),
  on(updateActivity, state => ({
    ...state,
    loading: false,
    loaded: false,
    updating: true,
    updated: false
  })),
  on(updateActivitySuccess, (state, {activity}) => ({
    ...state,
    updating: false,
    updated: true,
    activities: [...state.activities.map((act) => {
      if (act.id === activity.id) {
        return activity;
      } else {
        return act;
      }
    })]
  })),
  on(updateActivityError, (state, {payload}) => ({
    ...state,
    updating: false,
    updated: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message
    }
  })),
  on(deleteActivity, state => ({
    ...state,
    loading: false,
    loaded: false,
    updating: true,
    updated: false,
  })),
  on(deleteActivitySuccess, (state, {activity}) => ({
    ...state,
    updating: false,
    updated: true,
    activities: [...state.activities.filter(act => act.id !== activity.id)]
  })),
  on(deleteActivityError, (state, {payload}) => ({
    ...state,
    updating: false,
    updated: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message
    }
  })),
  on(getAllActivities, state => ({
    ...state,
    loading: true,
    loaded: false,
    updating: false,
    updated: false,
  })),
  on(getAllActivitiesSuccess, (state, {activities}) => ({
    ...state,
    loading: false,
    loaded: true,
    activities: [...activities]
  })),
  on(getAllActivitiesError, (state, {payload}) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message
    }
  }))
);

export function activityReducer(state, action) {
  return _activityReducer(state, action);
}
