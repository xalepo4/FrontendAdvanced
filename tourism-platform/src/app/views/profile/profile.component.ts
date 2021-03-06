import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public showProfileInfo = true;
  public showProfileForm = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  changeToProfileForm(): void {
    this.showProfileInfo = false;
    this.showProfileForm = true;
  }
}
