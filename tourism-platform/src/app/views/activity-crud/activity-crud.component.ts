import {Component, OnInit} from '@angular/core';
import {Activity} from '../../shared/models/activity';

@Component({
  selector: 'app-activity-crud',
  templateUrl: './activity-crud.component.html',
  styleUrls: ['./activity-crud.component.scss']
})
export class ActivityCrudComponent implements OnInit {
  public activityList: Activity[];

  constructor() {
  }

  ngOnInit(): void {
  }

  onActivityUpdate(activity: Activity): void {

  }

  onActivityDelete(position: number): void {

  }

}
