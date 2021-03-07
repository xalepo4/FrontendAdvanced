import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../shared/models/activity';
import {ActivityService} from '../../shared/services/activity.service';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() selectedActivity?: Activity;
  public activitiesList: Activity[];
  private currentUser: User;

  constructor(private activityService: ActivityService, private userService: UserService, public authService: AuthService) {
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

    this.activityService.getActivities().subscribe(
      activities => {
        this.activitiesList = activities;
      },
      error => {
        console.log('Fail getting activities');
      }
    );
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
}
