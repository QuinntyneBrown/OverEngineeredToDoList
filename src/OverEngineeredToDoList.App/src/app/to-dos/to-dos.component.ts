import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ToDoDialogComponent } from '@shared';
import { ToDo } from '@shared/models/to-do';
import { ToDoStore } from '@shared/state/to-do.store';
import { createToDoListViewModel } from './create-to-list-view-model';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.scss'],
  standalone:true,
  imports: [
    CommonModule,
    MatDialogModule,
    ToDoDialogComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ToDosComponent implements OnInit {

  private readonly _store = inject(ToDoStore);

  private readonly _dialog = inject(MatDialog);

  readonly vm$ = createToDoListViewModel();

  ngOnInit = () => this._store.load();

  addOrUpdate(toDo:ToDo){
    this._dialog.open(ToDoDialogComponent, { data: toDo, panelClass:'app-dialog-panel' })
  }

  delete(toDo: ToDo) {
    this._store.delete(toDo);
  }
}
