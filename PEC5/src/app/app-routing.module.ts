import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RepositoriesComponent} from "./components/repositories/repositories.component";
import {RepositoryComponent} from "./components/repository/repository.component";

const routes: Routes = [
  {path: '', component: RepositoriesComponent},
  {path: 'repository/:user/:name', component: RepositoryComponent},
  {path: '**', component: RepositoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
