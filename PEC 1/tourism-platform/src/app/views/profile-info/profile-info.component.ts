import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  public currentUser: User;

  constructor(private userService: UserService, public authService: AuthService) {
  }

  ngOnInit(): void {
    const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (storedCurrentUser !== undefined) {
      this.userService.getUser(storedCurrentUser).subscribe(
        user => {
          this.currentUser = user;
          console.log(this.currentUser);
        },
        error => {
          console.log('Error getting user');
        });
    }
  }
}
