import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Activity} from '../../models/activity';
import {deleteActivity, getAllActivities} from '../../actions';
import {AppState} from '../../../app.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-activity-crud',
  templateUrl: './activity-crud.component.html',
  styleUrls: ['./activity-crud.component.scss']
})
export class ActivityCrudComponent implements OnInit {
  @Output() activityNeedToUpdateEvent = new EventEmitter<any>();

  public activityList: Activity[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.store.select('activitiesApp').subscribe(activitiesResponse => {
      this.activityList = [];

      for (const activity of activitiesResponse.activities) {
        if (activity.companyId === storedCurrentUser) {
          this.activityList.push(activity);
        }
      }
    });

    this.store.dispatch(getAllActivities());
  }

  onActivityUpdate(activity: Activity): void {
    this.activityNeedToUpdateEvent.emit(activity);
  }

  onActivityDelete(position: number, activity: Activity): void {
    // remove activity object
    this.activityList.splice(position, 1);

    // delete activity
    this.store.dispatch(deleteActivity({activity}));
  }
}
