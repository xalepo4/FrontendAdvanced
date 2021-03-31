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
  getAllActivitiesError,
  increaseActivityCounter,
  decreaseActivityCounter
} from '../actions';
import {createReducer, on} from '@ngrx/store';

export interface ActivityState {
  activities: Activity[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: ActivityState = {
  activities: [],
  loading: false,
  loaded: false,
  error: null
};

const _activityReducer = createReducer(
  initialState,
  on(addActivity, state => ({...state, loading: true})),
  on(addActivitySuccess, (state, {activity}) => ({
    ...state,
    loading: false,
    loaded: true,
    activities: [...state.activities, activity]
  })),
  on(addActivityError, (state, {payload}) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message
    }
  })),
  on(updateActivity, state => ({...state, loading: true})),
  on(updateActivitySuccess, (state, {activity}) => ({
    ...state,
    loading: false,
    loaded: true,
    activities: [...state.activities.map((act) => {
      if (act.id === activity.id) {
        return act;
      } else {
        return activity;
      }
    })]
  })),
  on(updateActivityError, (state, {payload}) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message
    }
  })),
  on(deleteActivity, state => ({...state, loading: true})),
  on(deleteActivitySuccess, (state, {activity}) => ({
    ...state,
    loading: false,
    loaded: true,
    activities: [...state.activities.filter(act => act.id !== activity.id)]
  })),
  on(deleteActivityError, (state, {payload}) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message
    }
  })),
  on(getAllActivities, state => ({...state, loading: true})),
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
  })),
  on(increaseActivityCounter, (state, {activity}) => ({
    ...state,
    loading: false,
    loaded: false,
    activities: [...state.activities.map((act) => {
      if (act.id === activity.id) {
        return {
          ...act,
          peopleRegistered: act.peopleRegistered + 1
        };
      } else {
        return act;
      }
    })]
  })),
  on(decreaseActivityCounter, (state, {activity}) => ({
    ...state,
    loading: false,
    loaded: false,
    activities: [...state.activities.map((act) => {
      if (act.id === activity.id) {
        return {
          ...act,
          peopleRegistered: act.peopleRegistered - 1
        };
      } else {
        return act;
      }
    })]
  }))
);

export function activityReducer(state, action) {
  return _activityReducer(state, action);
}
