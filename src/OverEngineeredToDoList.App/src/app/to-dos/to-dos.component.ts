import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ToDoDialogComponent } from '@shared';
import { ToDo } from '@shared/models/to-do';
import { ToDoStore } from '@shared/state/to-do.store';
import { createToDoListViewModel } from './create-to-list-view-model';

@Component({
  selector: 'app-to-dos',
  template: `
    <h1>To Do List</h1>

    <ng-container *ngIf="vm$ | async as vm">

      <button mat-raised-button (click)="addOrUpdate()">Create</button>
      
      <mat-table [dataSource]="vm.dataSource" class="mat-elevation-z8 app-table">

            <ng-container matColumnDef="name">
                    <mat-header-cell class="app-header-cell" *matHeaderCellDef>Name</mat-header-cell>
                    <mat-cell *matCellDef="let toDo">{{ toDo.name }}</mat-cell>
            </ng-container>

        <ng-container matColumnDef="complete">
          <mat-header-cell class="app-header-cell" *matHeaderCellDef>Complete</mat-header-cell>
          <mat-cell *matCellDef="let toDo">{{ toDo.complete }}</mat-cell>
        </ng-container>
                      
            <ng-container matColumnDef="actions">
                    <mat-header-cell class="app-header-cell" *matHeaderCellDef></mat-header-cell>
                    <mat-cell *matCellDef="let toDo">
              <button mat-icon-button (click)="addOrUpdate(toDo)">
                <mat-icon>edit</mat-icon>
              </button>

              <button mat-icon-button (click)="delete(toDo)">
                <mat-icon>delete</mat-icon>
              </button>
                    </mat-cell>
            </ng-container>

            <mat-header-row *matHeaderRowDef="vm.displayedColumns"></mat-header-row>
            <mat-row *matRowDef="let row; columns: vm.displayedColumns;"></mat-row>

      </mat-table>

    </ng-container>  
  `,
  styles: [`  
  :host {
      display: block;
      box-sizing: border-box;
      padding: 60px;

      .app-table {    
          margin: 30px 0;    
          .mat-header-row,
          .mat-row {
              display: grid;
              grid-template-columns: 1fr 1fr 100px;
          }
      }
  }`],
  standalone:true,
  imports: [
    CommonModule,
    MatDialogModule,
    ToDoDialogComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ToDosComponent implements OnInit {

  private readonly _store = inject(ToDoStore);

  private readonly _dialog = inject(MatDialog);

  readonly vm$ = createToDoListViewModel();

  ngOnInit() {
    this._store.load();
  }

  addOrUpdate(toDo:ToDo){
    this._dialog.open(ToDoDialogComponent, { data: toDo, panelClass:'app-dialog-panel' })
  }

  delete(toDo: ToDo) {
    this._store.delete(toDo);
  }
}
