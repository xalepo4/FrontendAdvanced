import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {ActivityCrudComponent} from './components/activity-crud/activity-crud.component';
import {ActivityDetailComponent} from './components/activity-detail/activity-detail.component';
import {ActivityFormComponent} from './components/activity-form/activity-form.component';
import {ActivityListComponent} from './components/activity-list/activity-list.component';
import {MyActivitiesComponent} from './components/my-activities/my-activities.component';
import {AdminComponent} from './components/admin/admin.component';
import {HomeComponent} from './components/home/home.component';

@NgModule({
  declarations: [
    ActivityCrudComponent,
    ActivityDetailComponent,
    ActivityFormComponent,
    ActivityListComponent,
    AdminComponent,
    HomeComponent,
    MyActivitiesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ActivitiesModule {
}
