import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'authentication/login', pathMatch: 'full' },
  {
    path: "authentication",
    loadChildren: () =>
      import("./authentication/authentication.module").then((m) => m.AuthenticationModule),
  },
  {
    path: "user",
    loadChildren: () =>
      import("./user/user.module").then((m) => m.UserModule),
  },
  // {
  //   path: "dashboard",
  //   loadChildren: () =>
  //     import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  // },
  {
    path: "details",
    loadChildren: () =>
      import("./details/details.module").then((m) => m.DetailsModule),
  },
  {
    path: "albums",
    loadChildren: () =>
      import("./albums/albums.module").then((m) => m.AlbumsModule),
  },
  {
    path: "photo",
    loadChildren: () =>
      import("./photo/photo.module").then((m) => m.PhotoModule),
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
  // { path: '**', redirectTo: 'authentication/page404' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
