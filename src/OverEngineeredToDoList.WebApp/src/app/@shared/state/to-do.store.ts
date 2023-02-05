// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { inject, Injectable } from "@angular/core";
import { CreateToDoResponse, ToDoService, UpdateToDoResponse } from "@api";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { ToDo } from "@shared/models/to-do";
import { exhaustMap, map, tap, withLatestFrom } from "rxjs";

export const noop = ((arg:unknown) => { });

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

    readonly save = (toDo:ToDo, nextFn: {(response:unknown): void} = null, errorFn: {(response:unknown): void} = null) => {        
        const apiRequest$ = toDo.toDoId ? this._toDoService.updateToDo(toDo) : this._toDoService.createToDo(toDo);
        const updateFn = toDo?.toDoId ? ([response, toDos]: [UpdateToDoResponse, ToDo[]]) => this.patchState({
            toDos: toDos.map(t => response.toDo.toDoId == t.toDoId ? response.toDo : t)
        })
        :(([response, toDos]: [CreateToDoResponse, ToDo[]]) => this.patchState({ toDos: [...toDos, response.toDo ]}));
        
        return this.effect<void>(
            exhaustMap(()=> apiRequest$.pipe(
                withLatestFrom(this.select(x => x.toDos)),
                tap(updateFn),
                tapResponse(
                    nextFn || noop,
                    errorFn || noop
                )
            )
        ))();
    }

    readonly delete = this.effect<ToDo>(
        exhaustMap((toDo) => this._toDoService.removeToDo(toDo.toDoId).pipe( 
            withLatestFrom(this.select(x => x.toDos)),           
            tapResponse(
                ([_, toDos]) => this.patchState({ toDos: toDos.filter(t => t.toDoId != toDo.toDoId )}),
                noop
            )
        ))
    )

    readonly load = this.effect<void>(
        exhaustMap(_ => this._toDoService.getToDos().pipe(
            map(response => response.toDos),
            tapResponse(
                toDos => this.patchState({ toDos }),
                noop                
            )
        ))
    )
}
