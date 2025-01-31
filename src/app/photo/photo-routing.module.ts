import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { AuthGuard } from '../authentication/auth.guard';

const routes: Routes = [
  { path: 'photo/:id', component: PhotoDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotoRoutingModule { }
