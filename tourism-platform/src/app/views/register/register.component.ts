import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/models/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CheckPassword} from '../../shared/directives/checkPassword';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public user: User = new User();

  public name: FormControl;
  public surname: FormControl;
  public type: FormControl;
  public email: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;
  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.name = new FormControl('', [Validators.required, Validators.minLength(3),
      Validators.maxLength(55), Validators.pattern('^[-a-zA-Z]+(\\s+[-a-zA-Z]+)*$')]);
    this.surname = new FormControl('', [Validators.minLength(3),
      Validators.maxLength(55), Validators.pattern('^[-a-zA-Z]+(\\s+[-a-zA-Z]+)*$')]);
    this.type = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);

    this.registerForm = this.formBuilder.group({
      name: this.name,
      surname: this.surname,
      type: this.type,
      email: this.email,
      passwordGroup: this.formBuilder.group({
        password: this.password,
        confirmPassword: this.confirmPassword
      }, {
        validator: CheckPassword.checkInvalidPassword
      })
    });
  }

  public checkRegister(): void {
    this.user.name = this.name.value;
    this.user.surname = this.surname.value;
    this.user.type = this.type.value;
    this.user.email = this.email.value;
    this.user.password = this.password.value;
    console.log('User name --> ' + this.user.name + ' User surname --> ' + this.user.surname
      + ' User type --> ' + this.user.type + ' User email --> ' + this.user.email
      + ' User password --> ' + this.user.password);
  }
}
