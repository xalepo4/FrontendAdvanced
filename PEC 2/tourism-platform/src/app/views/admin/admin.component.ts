import {Component, OnInit} from '@angular/core';
import {Activity} from '../../shared/models/activity';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public showActivityCrud = true;
  public showActivityForm = false;
  public activityToBeUpdated: Activity;

  constructor() {
  }

  ngOnInit(): void {
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
