import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private userService: UserService) {
  }

  checkUserExist(user: User): Observable<boolean> {
    return this.userService.getUserByEmail(user.email).pipe(map(existingUser => {
        return existingUser !== undefined;
      },
      error => {
        // return true for avoid register new user
        return true;
      }));
  }

  register(user: User): Observable<boolean> {
    // add user to the server
    return this.userService.addUser(user).pipe(map(
      addedUser => {
        localStorage.setItem('currentUser', JSON.stringify(addedUser.id));
        localStorage.setItem('userType', addedUser.type);
        return true;
      },
      error => {
        return false;
      }));
  }
}
