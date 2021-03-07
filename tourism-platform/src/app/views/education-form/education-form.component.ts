import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})
export class EducationFormComponent implements OnInit {
  @Output() educationUpdatedEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
