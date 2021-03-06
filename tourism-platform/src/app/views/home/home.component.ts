import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../shared/models/activity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() selectedActivity?: Activity;

  constructor() {
  }

  ngOnInit(): void {
  }

  showActivity(activity: Activity): void {
    this.selectedActivity = activity;
  }

  signUp(): void {
    this.selectedActivity.peopleRegistered = this.selectedActivity.peopleRegistered + 1;
  }
}
