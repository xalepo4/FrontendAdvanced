import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/models/user';
import {CheckNif} from '../../shared/directives/checkNif';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  public currentUser: User;

  public name: FormControl;
  public surname: FormControl;
  public birthDate: FormControl;
  public phone: FormControl;
  public nationality: FormControl;
  public nif: FormControl;
  public aboutMe: FormControl;
  public profileForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.name = new FormControl('', [Validators.required, Validators.minLength(3),
      Validators.maxLength(55), Validators.pattern('^[-a-zA-Z]+(\\s+[-a-zA-Z]+)*$')]);
    this.surname = new FormControl('', [Validators.minLength(3),
      Validators.maxLength(55), Validators.pattern('^[-a-zA-Z]+(\\s+[-a-zA-Z]+)*$')]);
    this.birthDate = new FormControl('', [Validators.pattern('^(\\d{2}\\/\\d{2}\\/\\d{4})*$')]);
    this.phone = new FormControl('', [Validators.pattern('^[0-9]*$')]);
    this.nationality = new FormControl('');
    this.nif = new FormControl('', [CheckNif.checkInvalidNif]);
    this.aboutMe = new FormControl('', [Validators.pattern('^[a-zA-Z]*$')]);

    this.profileForm = this.formBuilder.group({
      name: this.name,
      surname: this.surname,
      birthDate: this.birthDate,
      phone: this.phone,
      nationality: this.nationality,
      nif: this.nif,
      aboutMe: this.aboutMe
    });
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

    console.log('Name: ' + this.currentUser.name + ' Surname: ' + this.currentUser.surname + ' Birth date: ' +
      this.currentUser.birthDate + ' Phone: ' + this.currentUser.phone + ' Nationality: ' +
      this.currentUser.nationality + ' Nif: ' + this.currentUser.nif + ' ' + 'About me: ' + this.currentUser.aboutMe);

    this.userService.updateUser(this.currentUser).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }
}
