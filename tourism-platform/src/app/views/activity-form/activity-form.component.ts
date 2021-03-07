import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Activity} from '../../shared/models/activity';
import {ActivityService} from '../../shared/services/activity.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {
  @Output() activityUpdatedEvent = new EventEmitter<any>();

  private activity = new Activity();

  public name: FormControl;
  public category: FormControl;
  public subcategory: FormControl;
  public description: FormControl;
  public language: FormControl;
  public date: FormControl;
  public price: FormControl;

  public activityForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private activityService: ActivityService) {
  }

  ngOnInit(): void {
    // set company id for list activities and set 0 registered people
    this.activity.companyId = JSON.parse(localStorage.getItem('currentUser'));
    this.activity.peopleRegistered = 0;

    this.name = new FormControl('', [Validators.required, Validators.minLength(3),
      Validators.maxLength(55)]);
    this.category = new FormControl('', [Validators.required]);
    this.subcategory = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]);
    this.language = new FormControl('');
    this.date = new FormControl('', [Validators.pattern('^(\\d{2}\\/\\d{2}\\/\\d{4})*$')]);
    this.price = new FormControl('', [Validators.required, Validators.pattern('\\d+.\\d+')]);

    this.activityForm = this.formBuilder.group({
      name: this.name,
      category: this.category,
      subcategory: this.subcategory,
      description: this.description,
      language: this.language,
      date: this.date,
      price: this.price,
    });
  }

  checkActivity(): void {
    this.activity.name = this.name.value;
    this.activity.category = this.category.value;
    this.activity.subcategory = this.subcategory.value;
    this.activity.description = this.description.value;
    this.activity.language = this.language.value;
    this.activity.date = this.date.value;
    this.activity.price = this.price.value;

    console.log('Name: ' + this.activity.name + ' Category: ' + this.activity.category
      + ' Subcategory: ' + this.activity.subcategory + ' Description: ' + this.activity.description
      + ' Language ' + this.activity.language + ' Date: ' + this.activity.language + ' Price: ' + this.activity.price);


    this.activityService.addActivity(this.activity).subscribe(
      data => {
        console.log('Activity added successfully');
        this.activityUpdatedEvent.emit();
      },
      error => {
        console.log('Error adding activity');
      }
    );
  }
}
