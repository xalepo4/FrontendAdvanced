import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../shared/models/activity';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {
  @Input() selectedActivity?: Activity;

  constructor() {
  }

  ngOnInit(): void {
  }

}
