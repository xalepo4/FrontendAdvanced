import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileLanguageComponent } from './components/profile-language/profile-language.component';
import { ProfileEducationComponent } from './components/profile-education/profile-education.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';

@NgModule({
  declarations: [
    RegisterComponent,
    ProfileComponent,
    ProfileLanguageComponent,
    ProfileEducationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class ProfileModule { }
