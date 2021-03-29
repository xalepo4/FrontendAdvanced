import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {CheckNif} from '../../../shared/directives/checkNif';
import {UserService} from '../../services/user.service';
import {LoginService} from '../../../login/services/login.service';

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

  constructor(private formBuilder: FormBuilder, private userService: UserService, public authService: LoginService) {
  }

  ngOnInit(): void {
    const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.userService.getUser(storedCurrentUser).subscribe(
      user => {
        this.currentUser = user;
        console.log(this.currentUser);
      },
      error => {
        console.log('Error getting user');
      });

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

    this.currentUser.name = this.name.value;
    this.currentUser.surname = this.surname.value;
    this.currentUser.birthDate = this.birthDate.value;
    this.currentUser.phone = this.phone.value;
    this.currentUser.nationality = this.nationality.value;
    this.currentUser.nif = this.nif.value;
    this.currentUser.aboutMe = this.aboutMe.value;

    if (this.authService.isUserCompany()) {
      this.currentUser.companyName = this.companyName.value;
      this.currentUser.companyDescription = this.companyDescription.value;
      this.currentUser.cif = this.cif.value;
    }

    console.log('Name: ' + this.currentUser.name + ' Surname: ' + this.currentUser.surname + ' Birth date: ' +
      this.currentUser.birthDate + ' Phone: ' + this.currentUser.phone + ' Nationality: ' +
      this.currentUser.nationality + ' Nif: ' + this.currentUser.nif + ' ' + 'About me: ' + this.currentUser.aboutMe +
      ' Company name: ' + this.currentUser.companyName + ' Company description: ' + this.currentUser.companyDescription
      + ' CIF: ' + this.currentUser.cif);

    this.userService.updateUser(this.currentUser).subscribe(
      data => {
        this.userUpdatedEvent.emit();
      }, error => {
        console.log(error);
      }
    );
  }
}
