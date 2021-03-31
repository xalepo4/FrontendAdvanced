import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../models/activity';
import {User} from '../../../profile/models/user';
import {UserService} from '../../../profile/services/user.service';
import {LoginService} from '../../../login/services/login.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../app.reducer';
import {getAllActivities, updateActivity} from '../../actions';

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

  constructor(private store: Store<AppState>, private userService: UserService,
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
      console.log(activitiesResponse);

      // update activities list
      this.activitiesList = activitiesResponse.activities;

      // update selected activity
      if (this.selectedActivity !== undefined) {
        this.selectedActivity = this.activitiesList.find(act => act.id === this.selectedActivity.id);
      }
    });

    this.store.dispatch(getAllActivities());
  }

  showActivity(activity: Activity): void {
    this.selectedActivity = activity;
  }

  signUp(): void {
    const activity = {...this.selectedActivity};
    activity.peopleRegistered += 1;

    this.store.dispatch(updateActivity({activity}));

    // if current user doesn't have any activity, add it, otherwise push it to the list
    if (this.currentUser.subscribedActivities === undefined) {
      this.currentUser.subscribedActivities = [activity];
    } else {
      this.currentUser.subscribedActivities.push(activity);
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
