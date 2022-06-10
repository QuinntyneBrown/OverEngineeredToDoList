import { inject, Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ToDoService } from "@api";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { ToDo } from "@shared/models/to-do";
import { ToDoStore } from "@shared/state/to-do.store";
import { exhaustMap, map, switchMap, take } from "rxjs";

@Injectable()
export class ToDoDialogStore extends ComponentStore<null> {

    _toDoStore = inject(ToDoStore);
    _dialogRef = inject(MatDialogRef);
    _toDoService = inject(ToDoService);

    save = this.effect(
        exhaustMap((toDo:ToDo) => (toDo?.toDoId ? this._toDoService.updateToDo(toDo) : this._toDoService.createToDo(toDo)).pipe(
            switchMap(response => this._toDoStore.state$.pipe(
                take(1),
                tapResponse(
                    state => {
                        const toDos = toDo.toDoId ? state.toDos.map(x => {
                            if(toDo.toDoId == x.toDoId) {
                                return response.toDo;
                            }
                            return x;
                        }) : [...state.toDos, response.toDo];

                        this._toDoStore.patchState({ toDos });
                        this._dialogRef.close(null);
                    },
                    error => {

                    }
                )
            ))
        ))
    )
}