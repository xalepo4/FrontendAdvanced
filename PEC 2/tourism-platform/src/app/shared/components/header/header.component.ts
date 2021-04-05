import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../../login/services/login.service';
import {AppState} from '../../../app.reducer';
import {Store} from '@ngrx/store';
import {logout} from '../../../login/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public store: Store<AppState>, public authService: LoginService) {
  }

  ngOnInit(): void {
  }

  logoutClicked(): void {
    this.store.dispatch(logout());
  }
}
