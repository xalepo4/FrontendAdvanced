import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {ActivityListComponent} from './views/activity-list/activity-list.component';
import {ActivityDetailComponent} from './views/activity-detail/activity-detail.component';
import {ProfileComponent} from './views/profile/profile.component';
import {HomeComponent} from './views/home/home.component';
import {LoginComponent} from './views/login/login.component';
import {RegisterComponent} from './views/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './shared/services/in-memory-data.service';
import { ProfileFormComponent } from './views/profile-form/profile-form.component';
import { ProfileInfoComponent } from './views/profile-info/profile-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ActivityListComponent,
    ActivityDetailComponent,
    ProfileComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileFormComponent,
    ProfileInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
