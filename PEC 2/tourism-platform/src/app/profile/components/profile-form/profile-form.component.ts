import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {CheckNif} from '../../../shared/directives/checkNif';
import {UserService} from '../../services/user.service';
import {LoginService} from '../../../login/services/login.service';
import {AppState} from '../../../app.reducer';
import {Store} from '@ngrx/store';
import {getUser, updateUser} from '../../actions';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  @Output() userUpdatedEvent = new EventEmitter<any>();

  public currentUser: User;

  public name: FormControl;
  public surname: FormControl;
  public birthDate: FormControl;
  public phone: FormControl;
  public nationality: FormControl;
  public nif: FormControl;
  public aboutMe: FormControl;
  public companyName: FormControl;
  public companyDescription: FormControl;
  public cif: FormControl;

  public profileForm: FormGroup;

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder, private userService: UserService, public authService: LoginService) {
  }

  ngOnInit(): void {
    const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.store.select('profileApp').subscribe(profileResponse => {
      console.log('here');
      console.log(profileResponse);
      this.currentUser = profileResponse.user;

      // this.userUpdatedEvent.emit();
    });

    this.store.dispatch(getUser({userId: storedCurrentUser}));

    this.name = new FormControl('', [Validators.required, Validators.minLength(3),
      Validators.maxLength(55), Validators.pattern('^[-a-zA-Z]+(\\s+[-a-zA-Z]+)*$')]);
    this.surname = new FormControl('', [Validators.minLength(3),
      Validators.maxLength(55), Validators.pattern('^[-a-zA-Z]+(\\s+[-a-zA-Z]+)*$')]);
    this.birthDate = new FormControl('', [Validators.pattern('^(\\d{2}\\/\\d{2}\\/\\d{4})*$')]);
    this.phone = new FormControl('', [Validators.pattern('^[0-9]*$')]);
    this.nationality = new FormControl('');
    this.nif = new FormControl('', [CheckNif.checkInvalidNif]);
    this.aboutMe = new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]);
    this.companyName = new FormControl('', [Validators.required, Validators.minLength(3),
      Validators.maxLength(255), Validators.pattern('^[-a-zA-Z]+(\\s+[-a-zA-Z]+)*$')]);
    this.companyDescription = new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]);
    this.cif = new FormControl('', [Validators.required]);

    this.profileForm = this.formBuilder.group({
      name: this.name,
      surname: this.surname,
      birthDate: this.birthDate,
      phone: this.phone,
      nationality: this.nationality,
      nif: this.nif,
      aboutMe: this.aboutMe,
    });

    // Add additional fields if user is a company
    if (this.authService.isUserCompany()) {
      this.profileForm.addControl('companyName', this.companyName);
      this.profileForm.addControl('companyDescription', this.companyDescription);
      this.profileForm.addControl('cif', this.cif);
    }
  }

  checkProfile(): void {
    // check if currentUser is undefined
    if (this.currentUser === undefined) {
      console.log('User is undefined');
      return;
    }

    const user = new User();

    user.id = this.currentUser.id;
    user.name = this.name.value;
    user.surname = this.surname.value;
    user.birthDate = this.birthDate.value;
    user.phone = this.phone.value;
    user.nationality = this.nationality.value;
    user.nif = this.nif.value;
    user.aboutMe = this.aboutMe.value;

    if (this.authService.isUserCompany()) {
      user.companyName = this.companyName.value;
      user.companyDescription = this.companyDescription.value;
      user.cif = this.cif.value;
    }

    console.log('Name: ' + user.name + ' Surname: ' + user.surname + ' Birth date: ' + user.birthDate + ' Phone: ' + user.phone
      + ' Nationality: ' + user.nationality + ' Nif: ' + user.nif + ' ' + 'About me: ' + user.aboutMe + ' Company name: '
      + user.companyName + ' Company description: ' + user.companyDescription + ' CIF: ' + user.cif);

    this.store.dispatch(updateUser({user: user}));
  }
}
