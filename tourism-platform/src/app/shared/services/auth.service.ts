import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserService) {
  }

  logIn(email: string, password: string): Observable<boolean> {
    return this.userService.getUserByEmail(email).pipe(map(user => {
      const loggedIn = user ? user.password === password : false;

      if (loggedIn) {
        // save currentUser to local storage
        localStorage.setItem('currentUser', JSON.stringify(user.id));
        localStorage.setItem('userType', user.type);
      }

      return loggedIn;
    }));
  }

  logOut(): void {
    // remove currentUser from local storage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType');
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== undefined;
  }

  isUserTourist(): boolean {
    return localStorage.getItem('userType') === 'tourist';
  }

  isUserCompany(): boolean {
    return localStorage.getItem('userType') === 'company';
  }
}
