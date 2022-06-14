import { inject, Injectable } from "@angular/core";
import { ToDoService } from "@api";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { ToDo } from "@shared/models/to-do";
import { exhaustMap, map, tap } from "rxjs";

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

    readonly update = (toDo:ToDo, nextFn: {(response:unknown): void} = null, errorFn: {(response:unknown): void} = null) => {
        const state = this.get();   
        
        return this.effect<void>(
            exhaustMap(() => (toDo?.toDoId ? this._toDoService.updateToDo(toDo).pipe(
                tap(response => this.patchState({
                    toDos: state.toDos.map(t => response.toDo.toDoId == t.toDoId ? response.toDo : t)
                }))
            ) : this._toDoService.createToDo(toDo).pipe(
                tap(response => this.patchState({ toDos: [...state.toDos, response.toDo ]}))
            )).pipe(            
                tapResponse(
                    nextFn || ((response) => {

                    }),
                    errorFn || (error => {
    
                    })
                )
            ))
        )();
    }

    readonly delete = this.effect<ToDo>(
        exhaustMap((toDo) => this._toDoService.removeToDo(toDo.toDoId).pipe(            
            tapResponse(
                _ => {
                    const toDos = this.get(state => state.toDos);
                    this.patchState({ toDos: toDos.filter(t => t.toDoId != toDo.toDoId )})
                },
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