import {Component, OnInit} from '@angular/core';
import {Education} from '../../shared/models/education';

@Component({
  selector: 'app-education-info',
  templateUrl: './education-info.component.html',
  styleUrls: ['./education-info.component.scss']
})
export class EducationInfoComponent implements OnInit {
  public educationList: Education[];

  constructor() {
  }

  ngOnInit(): void {
  }

  onEducationUpdate(education: Education): void {

  }

  onEducationDelete(education: Education): void {

  }
}
