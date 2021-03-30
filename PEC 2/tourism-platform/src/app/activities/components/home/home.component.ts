import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../models/activity';
import {ActivityService} from '../../services/activity.service';
import {User} from '../../../profile/models/user';
import {UserService} from '../../../profile/services/user.service';
import {LoginService} from '../../../login/services/login.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../app.reducer';
import {getAllActivities} from '../../actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() selectedActivity?: Activity;
  public activitiesList: Activity[];
  public saveEnabled = true;
  private currentUser: User;

  constructor(private store: Store<AppState>, private activityService: ActivityService, private userService: UserService,
              public authService: LoginService) {
  }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

      this.userService.getUser(storedCurrentUser).subscribe(
        user => {
          this.currentUser = user;
          console.log(this.currentUser);
        },
        error => {
          console.log('Error getting user');
        });
    }

    this.store.select('activitiesApp').subscribe(activitiesResponse => {
      this.activitiesList = activitiesResponse.activities;
    });

    this.store.dispatch(getAllActivities());
  }

  showActivity(activity: Activity): void {
    this.selectedActivity = activity;
  }

  signUp(): void {
    this.selectedActivity.peopleRegistered = this.selectedActivity.peopleRegistered + 1;

    this.activityService.updateActivity(this.selectedActivity).subscribe(
      data => {
        console.log('Activity updated successfully');
      },
      error => {
        console.log('Error updating activity');
      }
    );

    // if current user doesn't have any activity, add it, otherwise push it to the list
    if (this.currentUser.subscribedActivities === undefined) {
      this.currentUser.subscribedActivities = [this.selectedActivity];
    } else {
      this.currentUser.subscribedActivities.push(this.selectedActivity);
    }

    // update user with subscribed activity
    this.userService.updateUser(this.currentUser).subscribe(
      data => {
        console.log('User updated successfully');
      },
      error => {
        console.log('Error updating user');
      }
    );
  }

  checkIfUserIsSubscribed(): boolean {
    if (this.currentUser.subscribedActivities === undefined) {
      return false;
    }

    for (const activity of this.currentUser.subscribedActivities) {
      if (activity.id === this.selectedActivity.id) {
        return true;
      }
    }
    return false;
  }
}
