import { inject, Injectable } from "@angular/core";
import { ToDoService } from "@api";
import { ToDoDataService } from "@database/to-do-data.service";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { ToDo } from "@shared/models/to-do";
import { exhaustMap, from, map, shareReplay, tap, withLatestFrom } from "rxjs";

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
    private readonly _toDoDataService = inject(ToDoDataService);

    constructor() {
        super(initialToDoState);
    }

    delete = this.effect<ToDo>(
        exhaustMap((toDo) => this._toDoService.removeToDo(toDo.toDoId).pipe(
            withLatestFrom(this.select(x => x.toDos)),
            tapResponse(
                ([_, toDos]) => this.patchState({ toDos: toDos.filter(x => x.toDoId != toDo.toDoId ) }),
                error => {

                }
            )
        ))
    )

    load = this.effect<void>(
        exhaustMap(_ => this._toDoService.getToDos().pipe(
            map(response => response.toDos),
            withLatestFrom(this._toDoDataService.init().pipe(
                shareReplay({
                    bufferSize: 1,
                    refCount: true
                })
            )),
            tapResponse(
                ([toDos,_]) => {
                    alert("?")
                    this.patchState({ toDos });
                },
                error => {

                }                
            )
        ))
    )
}