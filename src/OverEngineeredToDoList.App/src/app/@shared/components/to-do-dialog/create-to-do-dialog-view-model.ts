import { inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToDoService } from "@api";
import { ToDo } from "@shared/models/to-do";
import { map, Observable, startWith, switchMap } from 'rxjs';


export function createToDoDialogViewModel(save$: Observable<void>) {
    const toDoService = inject(ToDoService);
    const dialogRef = inject(MatDialogRef);
    const toDo: ToDo = inject(MAT_DIALOG_DATA);
    const form = new FormGroup({
      toDoId: new FormControl(toDo.toDoId || "",[]),
      name: new FormControl(toDo.name || "",[Validators.required]),
      complete: new FormControl(toDo.complete || false,[Validators.required])
    });

    return save$.pipe(
      switchMap(_ => form.value.toDoId ? toDoService.updateToDo(form.value) : toDoService.createToDo(form.value)),
      map(response => {
        dialogRef.close(response.toDo);
        return { form };
      }),
      startWith(({ form }))
    );  
}