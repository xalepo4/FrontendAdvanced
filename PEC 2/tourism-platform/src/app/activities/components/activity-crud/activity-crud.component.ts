import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
      if (activitiesResponse.loaded || activitiesResponse.updated) {
        this.activityList = [...activitiesResponse.activities.filter(act => act.companyId === storedCurrentUser)];
      }
    });

    this.store.dispatch(getAllActivities());
  }

  onActivityUpdate(activity: Activity): void {
    this.activityNeedToUpdateEvent.emit(activity);
  }

  onActivityDelete(activity: Activity): void {
    // delete activity
    this.store.dispatch(deleteActivity({activity}));
  }
}
