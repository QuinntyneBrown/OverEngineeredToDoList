import { inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ToDoDto, ToDoService } from "@api";
import { ToDoDialogComponent } from "@shared/components/to-do-dialog/to-do-dialog.component";
import { merge, Subject } from "rxjs";
import { map, startWith, switchMap } from "rxjs/operators";

export function createToDoListViewModel(deleteSubject: Subject<any>, addOrUpdateSubject: Subject<any>) {

    const toDoService = inject(ToDoService);
    const dialog = inject(MatDialog);

    return toDoService.getToDos().pipe(
        map(response => response.toDos),
        switchMap(toDos => merge(addOrUpdateSubject.pipe(
          switchMap(toDo => dialog.open(ToDoDialogComponent, { data: toDo, panelClass:'app-dialog-panel' }).afterClosed().pipe(
            map((toDo: ToDoDto) => {
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
        ),deleteSubject.pipe(
          switchMap((toDo: ToDoDto) => {
    
            toDos.splice(toDos.findIndex(x => x.toDoId == toDo.toDoId),1);
            
            return toDoService.removeToDo(toDo.toDoId).pipe(
              map(_ => toDos)
            )
          }),
          startWith(toDos)
        ))),
        map(toDos => ({ dataSource: new MatTableDataSource(toDos)}))
      );
    
}