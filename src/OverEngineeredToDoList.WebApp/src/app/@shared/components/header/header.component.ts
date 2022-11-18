import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoStore } from '@shared/state/to-do.store';
import { PushModule } from '@ngrx/component';

function createHeaderViewModel() {
  const store = inject(ToDoStore);
  const toDos$ = store.select(state => state.toDos, { debounce: true });  
  return store.select(toDos$, toDos => ({ toDoCount: toDos?.length }));
}

@Component({
  selector: 'app-header',
  template:`
  <ng-container *ngIf="vm$ | ngrxPush as vm">
	  <h1>Over Engineered To Do List App {{ vm.toDoCount }}</h1>
  </ng-container>
  `,
  standalone: true,
  imports: [
    CommonModule,
    PushModule
  ]
})
export class HeaderComponent {

  readonly vm$ = createHeaderViewModel();

}
