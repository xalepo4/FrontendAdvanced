import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Activity} from '../../shared/models/activity';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  @Output() newActivityEvent = new EventEmitter<Activity>();
  @Input() activitiesList: Activity[];

  constructor() {
  }

  ngOnInit(): void {

  }

  onActivityClicked(activity: Activity): void {
    this.newActivityEvent.emit(activity);
  }
}
