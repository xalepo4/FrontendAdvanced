import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/models/user';
import {CheckNif} from '../../shared/directives/checkNif';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  public user: User = new User();

  public name: FormControl;
  public surname: FormControl;
  public birthDate: FormControl;
  public phone: FormControl;
  public nationality: FormControl;
  public nif: FormControl;
  public aboutMe: FormControl;
  public profileForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
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

  }
}
