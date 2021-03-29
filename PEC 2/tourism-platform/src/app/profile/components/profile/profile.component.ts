import {Component, OnInit} from '@angular/core';
import {Education} from '../../models/education';

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

  public educationToBeUpdated: Education;

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
    // set null activity to be updated
    this.educationToBeUpdated = null;

    this.showEducationInfo = false;
    this.showEducationForm = true;
  }

  changeToEducationInfo(): void {
    // set null activity to be updated
    this.educationToBeUpdated = null;

    this.showEducationInfo = true;
    this.showEducationForm = false;
  }

  educationNeedToBeUpdated(education: Education): void {
    // set education to update
    this.educationToBeUpdated = education;

    this.showEducationInfo = false;
    this.showEducationForm = true;
  }
}
