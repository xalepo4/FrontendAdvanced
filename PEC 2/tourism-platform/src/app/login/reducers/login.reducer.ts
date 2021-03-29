import {createReducer, on} from '@ngrx/store';

/*import {
  completeAllTodos,
  completeTodo,
  createTodo, deleteCompletedTodos,
  deleteTodo,
  editTodo,
  getAllTodos,
  getAllTodosError,
  getAllTodosSuccess
} from '../actions';*/

export interface LoginState {
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: LoginState = {
  loading: false,
  loaded: false,
  error: null
};


const _loginReducer = createReducer(
  initialState,
  /*on(createTodo, (state, {title}) => ({
    ...state,
    loading: false,
    loaded: false,
    todos: [...state.todos, new Todo(title)]
  })),

  on(completeTodo, (state, {id}) => ({
    ...state,
    loading: false,
    loaded: false,
    todos: [...state.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: true,
        };
      } else {
        return todo;
      }
    })]
  })),

  on(editTodo, (state, {id, title}) => ({
    ...state,
    loading: false,
    loaded: false,
    todos: [...state.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title
        };
      } else {
        return todo;
      }
    })]
  })),

  on(deleteTodo, (state, {id}) => ({
    ...state,
    loading: false,
    loaded: false,
    todos: [...state.todos.filter(todo => todo.id !== id)]
  })),

  on(getAllTodos, state => ({...state, loading: true})),
  on(getAllTodosSuccess, (state, {todos}) => ({
    ...state,
    loading: false,
    loaded: true,
    todos: [...todos]
  })),
  on(getAllTodosError, (state, {payload}) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message
    }
  })),
  on(completeAllTodos, state => ({
    ...state,
    loading: false,
    loaded: false,
    todos: [...state.todos.map((todo) => {
      return {
        ...todo,
        done: true
      };
    })]
  })),

  on(deleteCompletedTodos, state => ({
    ...state,
    loading: false,
    loaded: false,
    todos: [...state.todos.filter(todo => todo.done === false)]
  }))*/
);

export function loginReducer(state, action) {
  return _loginReducer(state, action);
}
