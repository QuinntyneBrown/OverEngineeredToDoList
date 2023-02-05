// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

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
import { PushModule } from '@ngrx/component';
import { ToDoStore } from '@shared/state/to-do.store';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-to-do-dialog',
  template: `
  <ng-container *ngIf="vm$ | ngrxPush as vm">
    
      <div class="app-dialog-header">

          <h1 class="app-dialog-heading" *ngIf="!vm.form.value.toDoId">Create To Do</h1>
      
          <h1 class="app-dialog-heading" *ngIf="vm.form.value.toDoId">Edit To Do</h1>
      
          <button mat-icon-button mat-dialog-close tabindex="-1">
              <mat-icon>
              close
              </mat-icon>
          </button>
      
      </div>
      
      <div class="app-dialog-content">
      
          <form [formGroup]="vm.form">
      
              <mat-form-field class="app-form-field">
                  <mat-label>Name</mat-label>
                  <input matInput type="text" formControlName="name" class="app-input">
              </mat-form-field>
      
              <div *ngIf="vm.form.value.toDoId">
                  <mat-checkbox formControlName="complete">Complete</mat-checkbox>
              </div>
          </form>
      
      </div>
      
      <div class="app-dialog-footer">
      
          <div class="app-actions">
      
              <button mat-stroked-button mat-dialog-close="" class="app-stroked-button">Cancel</button>
      
              <button mat-raised-button (click)="save(vm.form.value)"  [disabled]="vm.form.invalid" class="app-stroked-button">Save</button>
      
          </div>
      
      </div>

  </ng-container>`,
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
    MatIconModule,
    PushModule
  ]
})
export class ToDoDialogComponent {

  private readonly _store = inject(ToDoStore);
  private readonly _dialog = inject(DialogRef);

  readonly vm$ = createDialogViewModel();

  save(toDo:ToDo) {    
    this._store.save(toDo, () => this._dialog.close());
  }
}
