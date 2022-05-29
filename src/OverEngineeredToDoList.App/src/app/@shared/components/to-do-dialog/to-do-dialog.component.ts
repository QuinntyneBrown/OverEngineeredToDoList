import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { createToDoDialogViewModel } from './create-to-do-dialog-view-model';

@Component({
  selector: 'app-to-do-dialog',
  templateUrl: './to-do-dialog.component.html',
  styleUrls: ['./to-do-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoDialogComponent {

  private readonly _saveSubject: Subject<void> = new Subject();

  readonly vm$ = createToDoDialogViewModel(this._saveSubject.asObservable());

  save() {
    this._saveSubject.next();
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
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class ToDoDialogModule { }
