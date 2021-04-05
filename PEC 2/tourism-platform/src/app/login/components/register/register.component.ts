import {Component, OnInit} from '@angular/core';
import {User} from '../../../profile/models/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CheckPassword} from '../../../shared/directives/checkPassword';
import {RegisterService} from '../../services/register.service';
import {Router} from '@angular/router';
import {AppState} from '../../../app.reducer';
import {Store} from '@ngrx/store';
import {register} from '../../actions';

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

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder, private registerService: RegisterService,
              private router: Router) {
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

    this.store.select('loginApp').subscribe(loginResponse => {
      if (loginResponse.registered) {
        console.log('User registered successfully');
        this.router.navigateByUrl('/home');
      }
    });
  }

  public checkRegister(): void {
    const user = (Object.keys(this.user).length === 0) ? this.user : {...this.user};
    user.name = this.name.value;
    user.surname = this.surname.value;
    user.type = this.type.value;
    user.email = this.email.value;
    user.password = this.password.value;

    console.log('Name: ' + user.name + ' Surname: ' + user.surname + ' Type: ' + user.type + ' Email: ' + user.email + ' Password '
      + user.password);

    this.registerService.checkUserExist(user)
      .subscribe(
        alreadyRegistered => {
          if (!alreadyRegistered) {
            console.log('User not already registered');

            // if not registered, register new user
            this.store.dispatch(register({user: user}));
          } else {
            this.isUserRegistered = true;
            console.log('User already registered');
          }
        },
        error => {
          console.log('Error checking if user is already registered');
          console.log(error);
        }
      );
  }
}
