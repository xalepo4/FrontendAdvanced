import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/components/login/login.component';
import {RegisterComponent} from './login/components/register/register.component';
import {HomeComponent} from './activities/components/home/home.component';
import {ProfileComponent} from './profile/components/profile/profile.component';
import {MyActivitiesComponent} from './activities/components/my-activities/my-activities.component';
import {AdminComponent} from './activities/components/admin/admin.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {CompanyGuard} from './shared/guards/company.guard';
import {TouristGuard} from './shared/guards/tourist.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard, CompanyGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'my-activities', component: MyActivitiesComponent, canActivate: [AuthGuard, TouristGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
