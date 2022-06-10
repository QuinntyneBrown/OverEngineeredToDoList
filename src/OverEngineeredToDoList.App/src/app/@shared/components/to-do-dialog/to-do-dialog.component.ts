import { ChangeDetectionStrategy, Component, inject, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ToDo } from '@shared/models/to-do';
import { ToDoStore } from '@shared/state/to-do.store';

@Component({
  selector: 'app-to-do-dialog',
  templateUrl: './to-do-dialog.component.html',
  styleUrls: ['./to-do-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatIconModule
  ]  
})
export class ToDoDialogComponent {

  private readonly _store = inject(ToDoStore);

  private _toDo: ToDo = inject(MAT_DIALOG_DATA);

  private _dialog = inject(MatDialogRef);

  form = new FormGroup({
    toDoId: new FormControl(this._toDo?.toDoId || "",[]),
    name: new FormControl(this._toDo?.name || "",[Validators.required]),
    complete: new FormControl(this._toDo?.complete || false,[Validators.required])
  });

  save(toDo:ToDo) {
    this._store.save(toDo);  
    
    this._dialog.close(null);  
  }
}