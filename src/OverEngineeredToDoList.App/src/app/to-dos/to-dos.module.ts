import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDosRoutingModule } from './to-dos-routing.module';
import { ToDosComponent } from './to-dos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ToDoDialogModule } from '@shared';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ToDosComponent
  ],
  imports: [
    CommonModule,
    ToDosRoutingModule,
    MatDialogModule,
    ToDoDialogModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ToDosModule { }
