import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../models/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Education} from '../../models/education';
import {AppState} from '../../../app.reducer';
import {Store} from '@ngrx/store';
import {getUser, updateUser} from '../../actions';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})
export class EducationFormComponent implements OnInit {
  @Input() educationToBeUpdated: Education;
  @Output() educationEditionFinished = new EventEmitter<any>();

  public currentUser: User;

  public type: FormControl;
  public level: FormControl;
  public name: FormControl;
  public university: FormControl;
  public finishDate: FormControl;
  public educationForm: FormGroup;

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.store.select('profileApp').subscribe(profileResponse => {
      if (profileResponse.loaded) {
        this.currentUser = profileResponse.user;
      }

      if (profileResponse.updated) {
        this.educationEditionFinished.emit();
      }
    });

    this.store.dispatch(getUser({userId: storedCurrentUser}));

    this.type = new FormControl('', [Validators.required]);
    this.level = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [Validators.required, Validators.minLength(3),
      Validators.maxLength(55)]);
    this.university = new FormControl('', [Validators.required, Validators.minLength(3),
      Validators.maxLength(55)]);
    this.finishDate = new FormControl('', [Validators.pattern('^(\\d{2}\\/\\d{2}\\/\\d{4})*$')]);

    this.educationForm = this.formBuilder.group({
      type: this.type,
      level: this.level,
      name: this.name,
      university: this.university,
      finishDate: this.finishDate
    });
  }

  checkEducation(): void {
    // check if currentUser is undefined
    if (this.currentUser === undefined) {
      console.log('User is undefined');
      return;
    }

    // check if we add or update education
    if (this.educationToBeUpdated == null) {
      this.addEducation();
    } else {
      this.updateEducation();
    }
  }

  addEducation(): void {
    const education: Education = {
      id: Math.floor(Math.random() * (50 - 1 + 1)) + 1,
      type: this.type.value,
      level: this.level.value,
      name: this.name.value,
      university: this.university.value,
      finishDate: this.finishDate.value,
    };

    const user = {...this.currentUser};
    user.education = [...this.currentUser.education, education];

    console.log('Type: ' + education.type + ' Level: ' + education.level + ' name: ' + education.name +
      ' University: ' + education.university + ' Finish Date: ' + education.finishDate);

    this.store.dispatch(updateUser({user: user}));
  }

  updateEducation(): void {
    const education: Education = {
      id: this.educationToBeUpdated.id,
      type: this.type.value,
      level: this.level.value,
      name: this.name.value,
      university: this.university.value,
      finishDate: this.finishDate.value,
    };

    const user = {...this.currentUser};

    user.education = [...this.currentUser.education.map((edu) => {
      if (edu.id === this.educationToBeUpdated.id) {
        return education;
      } else {
        return edu;
      }
    })];

    this.store.dispatch(updateUser({user: user}));
  }
}
