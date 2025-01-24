import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { MatDialogModule } from '@angular/material/dialog';


import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    ListUsersComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatProgressBarModule
  ],
  exports: [
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatProgressBarModule
  ]
})
export class UserModule { }
