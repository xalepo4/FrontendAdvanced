import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Activity} from '../../shared/models/activity';
import {ActivityService} from '../../shared/services/activity.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {
  @Input() activityToBeUpdated;
  @Output() activityEditionFinished = new EventEmitter<any>();

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
    // check if we add or update activity
    if (this.activityToBeUpdated == null) {
      this.addActivity();
    } else {
      this.updateActivity();
    }
  }

  addActivity(): void {
    const activity = new Activity();

    activity.name = this.name.value;
    activity.category = this.category.value;
    activity.subcategory = this.subcategory.value;
    activity.description = this.description.value;
    activity.language = this.language.value;
    activity.date = this.date.value;
    activity.price = this.price.value;

    // set company id for list activities and set 0 registered people
    activity.companyId = JSON.parse(localStorage.getItem('currentUser'));
    activity.peopleRegistered = 0;

    console.log('Name: ' + activity.name + ' Category: ' + activity.category + ' Subcategory: ' + activity.subcategory
      + ' Description: ' + activity.description + ' Language ' + activity.language + ' Date: '
      + activity.language + ' Price: ' + activity.price);


    this.activityService.addActivity(activity).subscribe(
      data => {
        console.log('Activity added successfully');
        this.activityEditionFinished.emit();
      },
      error => {
        console.log('Error adding activity');
      }
    );
  }

  updateActivity(): void {
    this.activityToBeUpdated.name = this.name.value;
    this.activityToBeUpdated.category = this.category.value;
    this.activityToBeUpdated.subcategory = this.subcategory.value;
    this.activityToBeUpdated.description = this.description.value;
    this.activityToBeUpdated.language = this.language.value;
    this.activityToBeUpdated.date = this.date.value;
    this.activityToBeUpdated.price = this.price.value;

    // set company id for list activities and set 0 registered people
    this.activityToBeUpdated.companyId = JSON.parse(localStorage.getItem('currentUser'));
    this.activityToBeUpdated.peopleRegistered = 0;

    console.log('Name: ' + this.activityToBeUpdated.name + ' Category: ' + this.activityToBeUpdated.category
      + ' Subcategory: ' + this.activityToBeUpdated.subcategory + ' Description: ' + this.activityToBeUpdated.description
      + ' Language ' + this.activityToBeUpdated.language + ' Date: ' + this.activityToBeUpdated.language
      + ' Price: ' + this.activityToBeUpdated.price);


    this.activityService.updateActivity(this.activityToBeUpdated).subscribe(
      data => {
        console.log('Activity udpated successfully');
        this.activityEditionFinished.emit();
      },
      error => {
        console.log('Error updating activity');
      }
    );
  }
}
