import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Activity} from '../../models/activity';
import {ActivityService} from '../../services/activity.service';

@Component({
  selector: 'app-activity-crud',
  templateUrl: './activity-crud.component.html',
  styleUrls: ['./activity-crud.component.scss']
})
export class ActivityCrudComponent implements OnInit, OnChanges {
  @Input() loadedActivities;
  @Output() activityNeedToUpdateEvent = new EventEmitter<any>();

  public activityList: Activity[];

  constructor(private activityService: ActivityService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.activityList = [];

    for (const activity of this.loadedActivities) {
      if (activity.companyId === storedCurrentUser) {
        this.activityList.push(activity);
      }
    }
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
