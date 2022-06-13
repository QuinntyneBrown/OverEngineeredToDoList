import { inject, Injectable } from "@angular/core";
import { ToDoService } from "@api";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { ToDo } from "@shared/models/to-do";
import { exhaustMap, map, withLatestFrom } from "rxjs";

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

    constructor() {
        super(initialToDoState);
    }

    delete = this.effect<ToDo>(
        exhaustMap((toDo) => this._toDoService.removeToDo(toDo.toDoId).pipe(
            withLatestFrom(this.select(response => response.toDos)),
            tapResponse(
                ([_, toDos]) => this.patchState({ toDos: toDos.filter(t => t.toDoId != toDo.toDoId ) }),
                error => {

                }
            )
        ))
    )

    load = this.effect<void>(
        exhaustMap(_ => this._toDoService.getToDos().pipe(
            map(response => response.toDos),
            tapResponse(
                toDos => this.patchState({ toDos }),
                error => {

                }                
            )
        ))
    )
}