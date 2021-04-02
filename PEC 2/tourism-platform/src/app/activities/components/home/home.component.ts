import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../models/activity';
import {User} from '../../../profile/models/user';
import {LoginService} from '../../../login/services/login.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../app.reducer';
import {getAllActivities, updateActivity} from '../../actions';
import {getUser, updateUser} from '../../../profile/actions';

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

  constructor(private store: Store<AppState>, public authService: LoginService) {
  }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

      this.store.select('profileApp').subscribe(profileResponse => {
        if (profileResponse.loaded || profileResponse.updated) {
          this.currentUser = profileResponse.user;
          console.log(this.currentUser);
        }
      });

      this.store.dispatch(getUser({userId: storedCurrentUser}));
    }

    this.store.select('activitiesApp').subscribe(activitiesResponse => {
      if (activitiesResponse.loaded || activitiesResponse.updated) {
        // update activities list
        this.activitiesList = activitiesResponse.activities;

        // update selected activity
        if (this.selectedActivity !== undefined) {
          this.selectedActivity = this.activitiesList.find(act => act.id === this.selectedActivity.id);
        }
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

    const user = {...this.currentUser};

    if (user.subscribedActivities === undefined) {
      user.subscribedActivities = [activity];
    } else {
      user.subscribedActivities = [...this.currentUser.subscribedActivities, activity];
    }

    this.store.dispatch(updateUser({user: user}));
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
