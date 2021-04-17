import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppState} from 'src/app/app.reducers';
import {Store} from '@ngrx/store';
import {LoginState} from '../../reducers';
import * as LoginAction from '../../actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: FormControl;
  public password: FormControl;
  public loginForm: FormGroup;
  public errorLogin: any;
  public bSubmitted: boolean;

  loginState$: LoginState;

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder,
              public router: Router) {
    this.store.select('login').subscribe(login => this.loginState$ = login);
  }

  ngOnInit(): void {
    this.bSubmitted = false;
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.errorLogin = '';
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  // Se recoge la pulsación sobre el botón de login
  public checkLogin() {
    this.bSubmitted = true;
    const credentials = {
      email: this.email.value,
      password: this.password.value,
    };
    this.store.dispatch(LoginAction.login({credentials}));
  }

  public getEmailErrorMessage(): string {
    if (this.email.hasError('email')) {
      return 'Email doesn\'t have a correct format';
    } else if (this.email.hasError('required')) {
      return 'Email is required';

    }
  }

  public getPasswordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }
  }
}
