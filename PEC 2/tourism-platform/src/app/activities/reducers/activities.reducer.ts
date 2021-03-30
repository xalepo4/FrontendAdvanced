import {Activity} from '../models/activity';
import {
  createActivity,
  updateActivity,
  deleteActivity,
  getAllActivities,
  getAllActivitiesSuccess,
  getAllActivitiesError,
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
  on(createActivity, (state, {activity}) => ({
    ...state,
    loading: false,
    loaded: false,
    activities: [...state.activities, activity]
  })),
  on(updateActivity, (state, {activity}) => ({
    ...state,
    loading: false,
    loaded: false,
    activities: [...state.activities.map((currentActivity) => {
      if (currentActivity.id === activity.id) {
        return activity;
      } else {
        return currentActivity;
      }
    })]
  })),
  on(deleteActivity, (state, {id}) => ({
    ...state,
    loading: false,
    loaded: false,
    activities: [...state.activities.filter(activity => activity.id !== id)]
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
);

export function activityReducer(state, action) {
  return _activityReducer(state, action);
}
