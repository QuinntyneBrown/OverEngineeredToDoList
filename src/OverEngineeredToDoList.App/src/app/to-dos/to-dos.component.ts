import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToDoDto } from '@api';
import { ToDoService } from '@api/services';
import { ToDoDialogComponent } from '@shared';
import { map, merge, startWith, Subject, switchMap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.scss']
})
export class ToDosComponent {

  private readonly _addOrUpdateSubject: Subject<Partial<ToDoDto>> = new Subject();

  private readonly _deleteSubject: Subject<ToDoDto> = new Subject();

  displayedColumns = [
    "name",
    "complete",
    "actions"
  ];

  readonly vm$ = this._toDoService.getToDos().pipe(
    map(response => response.toDos),
    switchMap(toDos => merge(this._addOrUpdateSubject.pipe(
      switchMap(toDo => this._dialog.open(ToDoDialogComponent, { data: toDo, panelClass:'app-dialog-panel' }).afterClosed().pipe(
        map(toDo => {
          if(toDo) {

            const existingToDo = toDos.find(x => x.toDoId == toDo.toDoId);

            if(existingToDo) {
              for(let i = 0; i < toDos.length; i++) {
                if(toDos[i].toDoId == toDo.toDoId) {
                  toDos[i] = toDo;
                }
              }
            } 
            else 
            {
              toDos.push(toDo)
            }
          }
          
          return toDos;
        })
      )),
      startWith(toDos)
    ),this._deleteSubject.pipe(
      switchMap(toDo => {

        toDos.splice(toDos.findIndex(x => x.toDoId == toDo.toDoId),1);
        
        return this._toDoService.removeToDo(toDo.toDoId).pipe(
          map(_ => toDos)
        )
      }),
      startWith(toDos)
    ))),
    map(toDos => ({ dataSource: new MatTableDataSource(toDos)}))
  );

  constructor(
    private readonly _toDoService: ToDoService,
    private readonly _dialog: MatDialog
  ) { 

  }

  addOrUpdate(toDo:Partial<ToDoDto> = null) {
    this._addOrUpdateSubject.next(toDo);    
  }

  delete(toDo: ToDoDto) {
    this._deleteSubject.next(toDo);
  }
}
