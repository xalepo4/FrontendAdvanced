import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivityService} from '../../shared/services/activity.service';
import {Activity} from '../../shared/models/activity';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  @Output() newActivityEvent = new EventEmitter<Activity>();

  public activitiesList: Activity[];

  constructor(private activityService: ActivityService) {
  }

  ngOnInit(): void {
    this.activityService.getActivities().subscribe(
      activities => {
        this.activitiesList = activities;
      },
      error => {
        console.log('Fail getting activities');
      }
    );
  }

  onActivityClicked(activity: Activity): void {
    this.newActivityEvent.emit(activity);
  }
}
