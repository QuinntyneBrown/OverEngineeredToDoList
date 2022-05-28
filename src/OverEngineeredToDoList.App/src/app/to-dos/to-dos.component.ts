import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToDoDto } from '@api';
import { ToDoService } from '@api/services';
import { ToDoDialogComponent } from '@shared';
import { map, merge, startWith, Subject, switchMap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { createToDoListViewModel } from './create-to-list-view-model';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.scss']
})
export class ToDosComponent {

  private readonly _addOrUpdateSubject: Subject<Partial<ToDoDto>> = new Subject();

  private readonly _deleteSubject: Subject<ToDoDto> = new Subject();

  readonly vm$ = createToDoListViewModel(this._deleteSubject, this._addOrUpdateSubject);

  addOrUpdate(toDo:Partial<ToDoDto> = null) {
    this._addOrUpdateSubject.next(toDo);    
  }

  delete(toDo: ToDoDto) {
    this._deleteSubject.next(toDo);
  }
}
