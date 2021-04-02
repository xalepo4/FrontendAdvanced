import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../models/activity';
import {User} from '../../../profile/models/user';
import {AppState} from '../../../app.reducer';
import {Store} from '@ngrx/store';
import {updateActivity} from '../../actions';
import {getUser, updateUser} from '../../../profile/actions';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})
export class MyActivitiesComponent implements OnInit {
  @Input() selectedActivity?: Activity;
  public activitiesList: Activity[];
  private currentUser: User;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.store.select('profileApp').subscribe(profileResponse => {
      if (profileResponse.loaded || profileResponse.updated) {
        this.currentUser = profileResponse.user;
        this.activitiesList = profileResponse.user.subscribedActivities;
        console.log(this.currentUser);
      }
    });

    this.store.dispatch(getUser({userId: storedCurrentUser}));
  }

  showActivity(activity: Activity): void {
    this.selectedActivity = activity;
  }

  cancelActivity(): void {
    const activity = {...this.selectedActivity};
    activity.peopleRegistered -= 1;

    this.store.dispatch(updateActivity({activity: activity}));

    const user = {...this.currentUser};
    user.subscribedActivities = [...this.currentUser.subscribedActivities.filter(act => act.id !== activity.id)];

    // set selected activity to null for hide detail
    this.selectedActivity = null;

    // update user with unsubscribed activity
    this.store.dispatch(updateUser({user: user}));
  }
}
