import { inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ToDoService } from "@api";
import { ToDoDialogComponent } from "@shared/components/to-do-dialog/to-do-dialog.component";
import { ToDo } from "@shared/models/to-do";
import { merge, Observable } from "rxjs";
import { map, startWith, switchMap } from "rxjs/operators";

export function createToDoListViewModel(delete$: Observable<ToDo>, addOrUpdate$: Observable<ToDo>) {

    const toDoService = inject(ToDoService);
    const dialog = inject(MatDialog);

    return toDoService.getToDos().pipe(
        map(response => response.toDos),
        switchMap(toDos => merge(addOrUpdate$.pipe(
          switchMap(toDo => dialog.open(ToDoDialogComponent, { data: toDo, panelClass:'app-dialog-panel' }).afterClosed().pipe(
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
        ),delete$.pipe(
          switchMap(toDo => {
    
            toDos.splice(toDos.findIndex(x => x.toDoId == toDo.toDoId),1);
            
            return toDoService.removeToDo(toDo.toDoId).pipe(
              map(_ => toDos)
            )
          }),
          startWith(toDos)
        ))),
        map(toDos => ({ dataSource: new MatTableDataSource(toDos), displayedColumns : [
            "name",
            "complete",
            "actions"
          ]}))
      );
    
}