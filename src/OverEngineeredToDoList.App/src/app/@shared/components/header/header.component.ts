import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoStore } from '@shared/state/to-do.store';


function createHeaderViewModel() {
  const store = inject(ToDoStore);
  const toDos$ = store.select(state => state.toDos, { debounce: true });  
  return store.select(toDos$, toDos => ({ toDoCount: toDos?.length }));
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class HeaderComponent {

  readonly vm$ = createHeaderViewModel()  

}
