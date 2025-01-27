import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { GenWidgetsComponent } from './gen-widgets/gen-widgets.component';
import { AuthGuard } from '../authentication/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'gen-widgets', component: GenWidgetsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,]
})
export class LayoutRoutingModule { }
