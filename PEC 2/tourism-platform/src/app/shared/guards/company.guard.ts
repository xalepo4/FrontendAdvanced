import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LoginService} from '../../login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) {
  }

  canActivate(): boolean {
    if (!this.authService.isUserCompany()) {
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }
}
