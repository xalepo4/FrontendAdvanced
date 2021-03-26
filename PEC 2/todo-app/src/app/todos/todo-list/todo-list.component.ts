import {Component, OnInit} from '@angular/core';
import {Todo} from '../models/todo.model';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {TodoService} from '../services/todo.service';
import {completeAllTodos, completeTodo, deleteCompletedTodos, getAllTodos} from '../actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];

  constructor(private store: Store<AppState>, /*private todoService: TodoService*/) {
  }

  ngOnInit(): void {
    // this.store.select('todos').subscribe((todos) => (this.todos = todos));

    this.store.select('todosApp').subscribe(todosResponse => {
      this.todos = todosResponse.todos;
    });

    this.store.dispatch(getAllTodos());
    // this.todoService.getAllTodos().subscribe((todos) => console.log(todos));
  }

  completeAllTask(): void {
    this.store.dispatch(completeAllTodos());
  }

  deleteCompletedTasks(): void {
    this.store.dispatch(deleteCompletedTodos());
  }
}
