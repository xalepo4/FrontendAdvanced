import {Component, OnInit} from '@angular/core';
import {Education} from '../../shared/models/education';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-education-info',
  templateUrl: './education-info.component.html',
  styleUrls: ['./education-info.component.scss']
})
export class EducationInfoComponent implements OnInit {
  private currentUser: User;
  public educationList;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (storedCurrentUser !== undefined) {
      this.userService.getUser(storedCurrentUser).subscribe(
        user => {
          this.currentUser = user;
          this.educationList = user.education;
          console.log(user);
        },
        error => {
          console.log('Error getting user');
        });
    }
  }

  onEducationUpdate(education: Education): void {

  }

  onEducationDelete(position: number): void {
    this.educationList.splice(position, 1);
    this.currentUser.education = this.educationList;
    this.userService.updateUser(this.currentUser).subscribe(
      data => {
        console.log('Education deleted successfully');
      }, error => {
        console.log('Error updating user');
      }
    );
  }
}
