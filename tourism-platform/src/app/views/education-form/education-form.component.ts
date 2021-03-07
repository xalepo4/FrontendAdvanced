import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../shared/models/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Education} from '../../shared/models/education';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})
export class EducationFormComponent implements OnInit {
  @Output() educationUpdatedEvent = new EventEmitter<any>();

  public currentUser: User;

  public type: FormControl;
  public level: FormControl;
  public name: FormControl;
  public university: FormControl;
  public finishDate: FormControl;
  public educationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
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

    const education: Education = {
      type: this.type.value,
      level: this.level.value,
      name: this.name.value,
      university: this.university.value,
      finishDate: this.finishDate.value,
    };

    // add education field if not exist, otherwise push new education
    if (this.currentUser.education === undefined) {
      this.currentUser.education = [education];
    } else {
      this.currentUser.education.push(education);
    }

    console.log('Type: ' + education.type + ' Level: ' + education.level + ' name: ' + education.name +
      ' University: ' + education.university + ' Finish Date: ' + education.finishDate);

    this.userService.updateUser(this.currentUser).subscribe(
      data => {
        this.educationUpdatedEvent.emit();
      }, error => {
        console.log(error);
      }
    );
  }
}
