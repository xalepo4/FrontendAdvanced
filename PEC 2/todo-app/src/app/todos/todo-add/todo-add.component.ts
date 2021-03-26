import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {createTodo} from '../actions/todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  public titleInput: FormControl;

  constructor(private store: Store<AppState>) {
    this.titleInput = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
  }

  addTodoTask() {
    if (this.titleInput.valid) {
      this.store.dispatch(createTodo({title: this.titleInput.value}));
      this.titleInput.reset();
    }
  }
}
