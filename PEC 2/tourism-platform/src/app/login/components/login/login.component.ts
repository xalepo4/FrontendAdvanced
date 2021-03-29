import {Component, OnInit} from '@angular/core';
import {User} from '../../../profile/models/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: User = new User();

  public email: FormControl;
  public password: FormControl;
  public loginForm: FormGroup;

  public isUserValid = true;

  constructor(private formBuilder: FormBuilder, private authService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  public checkLogin(): void {
    this.user.email = this.email.value;
    this.user.password = this.password.value;

    console.log('Email: ' + this.user.email + ' Password: ' + this.user.password);

    this.authService.logIn(this.user.email, this.user.password)
      .subscribe(
        loggedIn => {
          this.isUserValid = loggedIn;
          console.log('Log in status ' + this.isUserValid);
          this.router.navigateByUrl('/home');
        },
        error => {
          this.isUserValid = false;
          console.log(error);
          console.log('Log in status ' + this.isUserValid);
        });
  }
}
