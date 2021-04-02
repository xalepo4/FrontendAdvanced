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
      console.log(profileResponse);

      if (profileResponse.loaded || profileResponse.updated) {
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
    const user = {...this.currentUser};
    user.education = [...this.educationList.filter(edu => edu.id !== education.id)];

    this.store.dispatch(updateUser({user: user}));
  }
}
