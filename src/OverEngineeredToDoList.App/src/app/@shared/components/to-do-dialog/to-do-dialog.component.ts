import { Component, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoDto, ToDoService } from '@api';
import { BehaviorSubject, combineLatest, startWith, Subject, switchMap, tap } from 'rxjs';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-to-do-dialog',
  templateUrl: './to-do-dialog.component.html',
  styleUrls: ['./to-do-dialog.component.scss']
})
export class ToDoDialogComponent {

  private readonly _storeSubject: Subject<Partial<ToDoDto>> = new Subject();

  private readonly _toDo$: BehaviorSubject<Partial<ToDoDto>> = new BehaviorSubject(null);

  readonly form = new FormGroup({
    toDoId: new FormControl(null,[]),
    name: new FormControl(null,[Validators.required]),
    complete: new FormControl(false,[Validators.required])
  });

  readonly vm$ = combineLatest([
    this._toDo$.pipe(
      tap(toDo => this.form.patchValue(toDo))
    ),
    this._storeSubject.pipe(
      switchMap(toDo => toDo.toDoId ? this._toDoService.updateToDo(toDo) : this._toDoService.createToDo(toDo)),
      tap(response => this._dialogRef.close(response.toDo)),
      startWith(null)
    )    
  ]);

  save(toDo: Partial<ToDoDto>) {
    this._storeSubject.next(toDo);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) toDo: Partial<ToDoDto>,
    private readonly _toDoService: ToDoService,
    private readonly _dialogRef: MatDialogRef<ToDoDialogComponent>
  ) { 

    this._toDo$.next(toDo);
  }
}

@NgModule({
  declarations: [
    ToDoDialogComponent
  ],
  exports: [
    ToDoDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ]
})
export class ToDoDialogModule { }
