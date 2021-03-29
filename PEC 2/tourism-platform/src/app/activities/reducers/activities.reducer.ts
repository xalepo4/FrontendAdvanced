import {Activity} from '../models/activity';
import {createActivity, updateActivity, deleteActivity, getAllActivities} from '../actions';
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
    todos: [...state.activities.map((currentActivity) => {
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
    todos: [...state.activities.filter(activity => activity.id !== id)]
  })),
  on(getAllActivities, state => ({...state, loading: true}))
);

export function activityReducer(state, action) {
  return _activityReducer(state, action);
}
