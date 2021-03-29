import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {EducationFormComponent} from './components/education-form/education-form.component';
import {EducationInfoComponent} from './components/education-info/education-info.component';
import {ProfileFormComponent} from './components/profile-form/profile-form.component';
import {ProfileInfoComponent} from './components/profile-info/profile-info.component';
import {ProfileComponent} from './components/profile/profile.component';

@NgModule({
  declarations: [
    EducationFormComponent,
    EducationInfoComponent,
    ProfileComponent,
    ProfileFormComponent,
    ProfileInfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule {
}
