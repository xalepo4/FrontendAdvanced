import {Component, OnInit} from '@angular/core';
import {Activity} from '../../shared/models/activity';
import {ActivityService} from '../../shared/services/activity.service';

@Component({
  selector: 'app-activity-crud',
  templateUrl: './activity-crud.component.html',
  styleUrls: ['./activity-crud.component.scss']
})
export class ActivityCrudComponent implements OnInit {
  public activityList: Activity[];

  constructor(private activityService: ActivityService) {
  }

  ngOnInit(): void {
    const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.activityService.getActivities().subscribe(
      activities => {
        for (const activity of activities) {
          if (activity.companyId === storedCurrentUser) {
            if (this.activityList === undefined) {
              this.activityList = [activity];
            } else {
              this.activityList.push(activity);
            }
          }
        }
      },
      error => {
        console.log('Error getting activities');
      }
    );
  }

  onActivityUpdate(activity: Activity): void {

  }

  onActivityDelete(position: number): void {

  }

}
