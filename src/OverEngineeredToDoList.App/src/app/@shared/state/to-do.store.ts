import { inject, Injectable } from "@angular/core";
import { ToDoService } from "@api";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { ToDo } from "@shared/models/to-do";
import { exhaustMap, map } from "rxjs";

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

    readonly update = this.updater<ToDo>((state: ToDoState, toDo:ToDo) => ({
        ...state,
        toDos: state.toDos.map(x => {
            if(toDo.toDoId == x.toDoId) {
                return toDo;
            }
            return x;
        })
    }));

    readonly add = this.updater<ToDo>((state: ToDoState, toDo:ToDo) => ({
        ...state,
        toDos: [...state.toDos, toDo]
    }));

    readonly remove = this.updater<ToDo>((state: ToDoState, toDo:ToDo) => ({
        ...state,
        toDos: state.toDos.filter(t => t.toDoId != toDo.toDoId )
    }))

    delete = this.effect<ToDo>(
        exhaustMap((toDo) => this._toDoService.removeToDo(toDo.toDoId).pipe(            
            tapResponse(
                _ => this.remove(toDo),
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