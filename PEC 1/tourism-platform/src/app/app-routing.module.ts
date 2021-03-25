import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './views/login/login.component';
import {RegisterComponent} from './views/register/register.component';
import {HomeComponent} from './views/home/home.component';
import {ProfileComponent} from './views/profile/profile.component';
import {MyActivitiesComponent} from './views/my-activities/my-activities.component';
import {AdminComponent} from './views/admin/admin.component';
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
