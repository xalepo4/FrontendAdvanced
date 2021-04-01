import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Education} from '../../models/education';
import {User} from '../../models/user';
import {AppState} from '../../../app.reducer';
import {Store} from '@ngrx/store';
import {getUser, updateUser} from '../../actions';

@Component({
  selector: 'app-education-info',
  templateUrl: './education-info.component.html',
  styleUrls: ['./education-info.component.scss']
})
export class EducationInfoComponent implements OnInit {
  @Output() educationNeedToUpdateEvent = new EventEmitter<any>();
  public educationList;
  private currentUser: User;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.store.select('profileApp').subscribe(profileResponse => {
      if (profileResponse.user !== null) {
        this.currentUser = profileResponse.user;
        this.educationList = profileResponse.user.education;
        console.log(profileResponse.user);
      }
    });

    if (storedCurrentUser !== undefined) {
      this.store.dispatch(getUser({userId: storedCurrentUser}));
    }
  }

  onEducationUpdate(education: Education): void {
    this.educationNeedToUpdateEvent.emit(education);
  }

  onEducationDelete(education: Education): void {
    const newEducationList = [...this.educationList.filter(edu => edu.id !== education.id)];

    const user = new User();

    user.id = this.currentUser.id;
    user.name = this.currentUser.name;
    user.surname = this.currentUser.surname;
    user.birthDate = this.currentUser.birthDate;
    user.phone = this.currentUser.phone;
    user.nationality = this.currentUser.nationality;
    user.nif = this.currentUser.nif;
    user.aboutMe = this.currentUser.aboutMe;
    user.type = this.currentUser.type;
    user.email = this.currentUser.email;
    user.password = this.currentUser.password;
    user.companyName = this.currentUser.companyName;
    user.companyDescription = this.currentUser.companyDescription;
    user.education = newEducationList;
    user.cif = this.currentUser.cif;
    user.subscribedActivities = this.currentUser.subscribedActivities;

    this.store.dispatch(updateUser({user: user}));
  }
}
