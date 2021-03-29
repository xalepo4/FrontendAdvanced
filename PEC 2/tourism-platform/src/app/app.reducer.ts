import {ActionReducerMap} from '@ngrx/store';

import * as activityReducers from './activities/reducers';
import * as loginReducers from './login/reducers';
import * as profileReducers from './profile/reducers';

export interface AppState {
  activitiesApp: activityReducers.ActivityState;
  loginApp: loginReducers.LoginState;
  profileApp: profileReducers.ProfileState;
}

export const appReducers: ActionReducerMap<AppState> = {
  activitiesApp: activityReducers.activityReducer,
  loginApp: loginReducers.loginReducer,
  profileApp: profileReducers.profileReducer
};
