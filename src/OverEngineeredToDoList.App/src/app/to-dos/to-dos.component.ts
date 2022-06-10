import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
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

  readonly vm$ = createToDoListViewModel();

  ngOnInit(): void {
    this._store.entry()
  }
  
  addOrUpdate(toDo:Partial<ToDo> = null) {
    this._store.addOrUpdate(toDo);    
  }

  delete(toDo: ToDo) {
    this._store.delete(toDo);
  }
}
