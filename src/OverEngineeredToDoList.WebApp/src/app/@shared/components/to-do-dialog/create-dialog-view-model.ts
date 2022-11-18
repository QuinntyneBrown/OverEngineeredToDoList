import { inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { of } from "rxjs";


export function createDialogViewModel() {
    const toDo = inject(MAT_DIALOG_DATA);
    
    const form = new FormGroup({
        toDoId: new FormControl(toDo?.toDoId || "", []),
        name: new FormControl(toDo?.name || "",[Validators.required]),
        complete: new FormControl(toDo?.complete || false,[Validators.required])
    });

    return of({ form });
}