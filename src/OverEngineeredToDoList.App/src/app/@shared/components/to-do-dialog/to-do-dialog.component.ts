import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ToDo } from '@shared/models/to-do';
import { createDialogViewModel } from './create-dialog-view-model';
import { ToDoDialogStore } from './to-do-dialog.store';


@Component({
  selector: 'app-to-do-dialog',
  templateUrl: './to-do-dialog.component.html',
  styles: [`
    :host {
      display: flex;
      min-width: 600px;
      padding:30px;
      flex-direction: column;
      gap: 30px;
    }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [
    ToDoDialogStore
  ]
})
export class ToDoDialogComponent {

  private readonly _store = inject(ToDoDialogStore);

  readonly vm$ = createDialogViewModel();

  save(toDo:ToDo) {
    this._store.save(toDo);  
  }
}