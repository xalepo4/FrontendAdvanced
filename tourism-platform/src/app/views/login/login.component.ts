import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/models/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
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
    console.log('User email --> ' + this.user.email + ' User password --> ' + this.user.password);
  }
}
