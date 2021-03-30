import {Component, OnInit} from '@angular/core';
import {Activity} from '../../models/activity';
import {Store} from '@ngrx/store';
import {AppState} from '../../../app.reducer';
import {getAllActivities} from '../../actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public showActivityCrud = true;
  public showActivityForm = false;
  public activityToBeUpdated: Activity;

  public loadedActivities: Activity[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('activitiesApp').subscribe(activitiesResponse => {
      this.loadedActivities = activitiesResponse.activities;
    });

    this.store.dispatch(getAllActivities());
  }

  changeToActivityForm(): void {
    // set null activity to be updated
    this.activityToBeUpdated = null;

    this.showActivityCrud = false;
    this.showActivityForm = true;
  }

  changeToActivityCrud(): void {
    // set null activity to be updated
    this.activityToBeUpdated = null;

    this.showActivityCrud = true;
    this.showActivityForm = false;
  }

  activityNeedToBeUpdated(activity: Activity): void {
    // set activity to be updated
    this.activityToBeUpdated = activity;

    this.showActivityCrud = false;
    this.showActivityForm = true;
  }
}
