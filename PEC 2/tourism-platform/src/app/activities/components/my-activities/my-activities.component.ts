import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../models/activity';
import {UserService} from '../../../profile/services/user.service';
import {User} from '../../../profile/models/user';
import {AppState} from '../../../app.reducer';
import {Store} from '@ngrx/store';
import {updateActivity} from '../../actions';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})
export class MyActivitiesComponent implements OnInit {
  @Input() selectedActivity?: Activity;
  public activitiesList: Activity[];
  private currentUser: User;

  constructor(private store: Store<AppState>, private userService: UserService) {
  }

  ngOnInit(): void {
    const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.userService.getUser(storedCurrentUser).subscribe(
      user => {
        this.currentUser = user;
        this.activitiesList = user.subscribedActivities;
        console.log(this.currentUser);
      },
      error => {
        console.log('Error getting user');
      });
  }

  showActivity(activity: Activity): void {
    this.selectedActivity = activity;
  }

  cancelActivity(): void {
    const activity = {...this.selectedActivity};
    activity.peopleRegistered -= 1;

    this.store.dispatch(updateActivity({activity}));

    // get activity index and delete it
    const index = this.activitiesList.indexOf(this.selectedActivity, 0);
    this.activitiesList.splice(index, 1);

    // set activities to user
    this.currentUser.subscribedActivities = this.activitiesList;

    // set selected activity to null for hide detail
    this.selectedActivity = null;

    // update user with unsubscribed activity
    this.userService.updateUser(this.currentUser).subscribe(
      data => {
        console.log('User updated successfully');
      },
      error => {
        console.log('Error updating user');
      }
    );
  }
}
