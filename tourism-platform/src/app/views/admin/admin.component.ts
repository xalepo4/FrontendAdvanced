import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public showActivityCrud = true;
  public showActivityForm = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  changeToActivityForm(): void {
    this.showActivityCrud = false;
    this.showActivityForm = true;
  }

  changeToActivityCrud(): void {
    this.showActivityCrud = true;
    this.showActivityForm = false;
  }

}
