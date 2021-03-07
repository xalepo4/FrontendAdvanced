import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../shared/models/activity';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user';
import {ActivityService} from '../../shared/services/activity.service';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})
export class MyActivitiesComponent implements OnInit {
  @Input() selectedActivity?: Activity;
  private currentUser: User;
  public activitiesList: Activity[];

  constructor(private activityService: ActivityService, private userService: UserService) {
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
    this.selectedActivity.peopleRegistered = this.selectedActivity.peopleRegistered - 1;

    this.activityService.updateActivity(this.selectedActivity).subscribe(
      data => {
        console.log('Activity updated successfully');
      },
      error => {
        console.log('Error updating activity');
      }
    );

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
