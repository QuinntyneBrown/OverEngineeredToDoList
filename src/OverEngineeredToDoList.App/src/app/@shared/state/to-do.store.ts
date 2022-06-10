import { inject, Injectable } from "@angular/core";
import { ToDoService } from "@api";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { ToDo } from "@shared/models/to-do";
import { exhaustMap } from "rxjs";


export interface ToDoState {
    
    toDos: ToDo[],
    dialogOpen: false
}

@Injectable({
    providedIn: "root"
})
export class ToDoStore extends ComponentStore<ToDoState> {

    private readonly _toDoService = inject(ToDoService);

    save = this.effect<ToDo>(
        exhaustMap((toDo) => (toDo.toDoId ? this._toDoService.updateToDo(toDo) : this._toDoService.createToDo(toDo)).pipe(
            tapResponse(
                r => {
                    this.patchState({ dialogOpen: false })
                },
                e => {

                }
            )
        ))
    )

    addOrUpdate = this.effect<ToDo | null>(
        exhaustMap((toDo) => (toDo.toDoId ? this._toDoService.updateToDo(toDo) : this._toDoService.createToDo(toDo)).pipe(
            tapResponse(
                r => {
                    
                },
                e => {

                }
            )
        ))
    )

    delete = this.effect<ToDo>(
        exhaustMap((toDo) => this._toDoService.removeToDo(toDo.toDoId).pipe(
            tapResponse(
                r => {
                    
                },
                e => {

                }
            )
        ))
    )
}