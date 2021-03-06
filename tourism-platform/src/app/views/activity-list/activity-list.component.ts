import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../../shared/services/activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  public activitiesList;

  constructor(private activityService: ActivityService) {
  }

  ngOnInit(): void {
    this.activityService.getActivities().subscribe(
      activities => {
        this.activitiesList = activities;
        console.log(this.activitiesList);
      },
      error => {
        console.log('Fail getting activities');
      }
    );
  }

  onActivityClicked($event): void {
    console.log($event);
  }

}
