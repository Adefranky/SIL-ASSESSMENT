import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { AuthGuard } from '../authentication/auth.guard';


const routes: Routes = [
  { path: 'list-users', component: ListUsersComponent },

  { path: '**', redirectTo: 'list-users' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
