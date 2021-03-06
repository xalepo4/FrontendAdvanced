import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/models/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CheckPassword} from '../../shared/directives/checkPassword';
import {RegisterService} from '../../shared/services/register.service';

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

  public isUserRegistered = false;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService) {
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

    console.log('Name: ' + this.user.name + ' Surname: ' + this.user.surname
      + ' Type: ' + this.user.type + ' Email: ' + this.user.email
      + ' Password ' + this.user.password);

    this.registerService.checkUserExist(this.user)
      .subscribe(
        alreadyRegistered => {
          if (!alreadyRegistered) {
            console.log('User not already registered');

            // if not registered, register new user
            this.registerService.register(this.user).subscribe(
              success => {
                console.log('User registered successfully');
              },
              error => {
                console.log('Fail registering user');
                console.log(error);
              }
            );
          } else {
            this.isUserRegistered = true;
            console.log('User already registered');
          }
        },
        error => {
          console.log('Error checkig if user is already registered');
          console.log(error);
        }
      );
  }
}
