import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { MatDialogModule } from '@angular/material/dialog';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    MatProgressBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ],

})
export class UserModule { }
