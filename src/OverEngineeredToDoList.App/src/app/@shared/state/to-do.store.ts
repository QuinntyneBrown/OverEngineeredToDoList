import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ToDoService } from "@api";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { ToDoDialogComponent } from "@shared/components";
import { ToDo } from "@shared/models/to-do";
import { exhaustMap, map, pipe, startWith, switchMap, take } from "rxjs";

export interface ToDoState {    
    toDos: ToDo[]
}

const initialToDoState = {
    toDos:[],
};

@Injectable({
    providedIn: "root"
})
export class ToDoStore extends ComponentStore<ToDoState> {

    private readonly _toDoService = inject(ToDoService);
    private readonly _dialog = inject(MatDialog);

    constructor() {
        super(initialToDoState);
    }

    addOrUpdate(toDo:ToDo){
        this._dialog.open(ToDoDialogComponent, { data: toDo, panelClass:'app-dialog-panel' })
    }

    delete = this.effect<ToDo>(
        exhaustMap((toDo) => this._toDoService.removeToDo(toDo.toDoId).pipe(
            switchMap(_ => this.select(x => x.toDos)),
            take(1),
            tapResponse(
                toDos => this.patchState({ toDos: toDos.filter(x => x.toDoId != toDo.toDoId ) }),
                error => {

                }
            )
        ))
    )

    entry = this.effect<void>(
        exhaustMap(_ => this._toDoService.getToDos().pipe(
            map(x => x.toDos),
            startWith(null),
            tapResponse(
                toDos => this.patchState({ toDos }),
                error => {

                }                
            )
        ))
    )
}