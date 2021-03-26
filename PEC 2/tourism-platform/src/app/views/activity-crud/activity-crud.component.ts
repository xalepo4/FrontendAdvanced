import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Activity} from '../../shared/models/activity';
import {ActivityService} from '../../shared/services/activity.service';

@Component({
  selector: 'app-activity-crud',
  templateUrl: './activity-crud.component.html',
  styleUrls: ['./activity-crud.component.scss']
})
export class ActivityCrudComponent implements OnInit {
  @Output() activityNeedToUpdateEvent = new EventEmitter<any>();

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
    this.activityNeedToUpdateEvent.emit(activity);
  }

  onActivityDelete(position: number, activity: Activity): void {
    // remove activity object
    this.activityList.splice(position, 1);

    // delete activity
    this.activityService.deleteActivity(activity).subscribe(
      data => {
        console.log('Activity deleted successfully');
      }, error => {
        console.log('Error deleting activity');
      }
    );
  }
}
