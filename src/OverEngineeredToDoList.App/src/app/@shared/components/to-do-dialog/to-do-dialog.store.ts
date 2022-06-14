import { inject, Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ToDoService } from "@api";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { ToDo } from "@shared/models/to-do";
import { ToDoStore } from "@shared/state/to-do.store";
import { exhaustMap, withLatestFrom } from "rxjs";

@Injectable()
export class ToDoDialogStore extends ComponentStore<null> {

    private readonly _toDoStore = inject(ToDoStore);
    private readonly _dialogRef = inject(MatDialogRef);
    private readonly _toDoService = inject(ToDoService);

    readonly save = this.effect(
        exhaustMap((toDo:ToDo) => (toDo?.toDoId ? this._toDoService.updateToDo(toDo) : this._toDoService.createToDo(toDo)).pipe(            
            tapResponse(
                (response) => {
                    toDo.toDoId ? this._toDoStore.update(response.toDo) : this._toDoStore.add(response.toDo);
                    this._dialogRef.close();
                },
                error => {

                }
            )
        ))
    )   
}