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
  public educationList;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (storedCurrentUser !== undefined) {
      console.log('Get user with id ' + storedCurrentUser);

      this.userService.getUser(storedCurrentUser).subscribe(
        user => {
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

  onEducationDelete(education: Education): void {

  }
}
