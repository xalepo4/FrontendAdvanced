import {Component, OnInit} from '@angular/core';
import {User} from '../../../profile/models/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppState} from '../../../app.reducer';
import {Store} from '@ngrx/store';
import {login} from '../../actions';

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

  public loggedIn = false;
  public loginClicked = false;

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });

    this.store.select('loginApp').subscribe(loginResponse => {
      this.loggedIn = loginResponse.loggedIn;
      console.log('Log in status ' + this.loggedIn);

      if (this.loggedIn) {
        this.router.navigateByUrl('/home');
      }
    });
  }

  public checkLogin(): void {
    this.loginClicked = true;

    this.user.email = this.email.value;
    this.user.password = this.password.value;

    console.log('Email: ' + this.user.email + ' Password: ' + this.user.password);

    this.store.dispatch(login({email: this.user.email, password: this.user.password}));
  }
}
