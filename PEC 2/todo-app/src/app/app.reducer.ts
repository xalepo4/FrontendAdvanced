import {Todo} from './todos/models/todo.model';
import {ActionReducerMap} from '@ngrx/store';

import * as reducers from './todos/reducers';

/*export interface AppState {
  todos: Todo[];
}*/

export interface AppState {
  todosApp: reducers.TodoState;
}

export const appReducers: ActionReducerMap<AppState> = {
  todosApp: reducers.todoReducer
};
