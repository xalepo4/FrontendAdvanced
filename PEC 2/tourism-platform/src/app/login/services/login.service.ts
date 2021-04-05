import {Injectable} from '@angular/core';
import {UserService} from '../../profile/services/user.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private userService: UserService, private router: Router) {
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

  logOut(): Observable<void> {
    return new Observable(observer => {
      // remove currentUser from local storage
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userType');

      // redirect to home
      this.router.navigateByUrl('/home');

      return observer.next();
    });
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('currentUser') != null;
  }

  isUserTourist(): boolean {
    return localStorage.getItem('userType') === 'tourist';
  }

  isUserCompany(): boolean {
    return localStorage.getItem('userType') === 'company';
  }
}
