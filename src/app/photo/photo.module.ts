import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoRoutingModule } from './photo-routing.module';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    PhotoDetailsComponent
  ],
  imports: [
    CommonModule,
    PhotoRoutingModule,
    FormsModule,
    MatDialogModule
  ]
})
export class PhotoModule { }
