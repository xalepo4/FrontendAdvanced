import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {LoginService} from '../../../login/services/login.service';
import {AppState} from '../../../app.reducer';
import {Store} from '@ngrx/store';
import {getUser} from '../../actions';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  public currentUser: User;

  constructor(private store: Store<AppState>, public authService: LoginService) {
  }

  ngOnInit(): void {
    const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.store.select('profileApp').subscribe(profileResponse => {
      this.currentUser = profileResponse.user;
    });

    if (storedCurrentUser !== undefined) {
      this.store.dispatch(getUser({userId: storedCurrentUser}));
    }
  }
}
