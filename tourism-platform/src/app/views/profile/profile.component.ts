import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public showProfileInfo = true;
  public showProfileForm = false;

  public showEducationInfo = true;
  public showEducationForm = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  changeToProfileForm(): void {
    this.showProfileInfo = false;
    this.showProfileForm = true;
  }

  changeToProfileInfo(): void {
    this.showProfileInfo = true;
    this.showProfileForm = false;
  }

  changeToEducationForm(): void {
    this.showEducationInfo = false;
    this.showEducationForm = true;
  }

  changeToEducationInfo(): void {
    this.showEducationInfo = true;
    this.showEducationForm = false;
  }
}
