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
      return user ? user.password === password : false;
    }));
  }
}
