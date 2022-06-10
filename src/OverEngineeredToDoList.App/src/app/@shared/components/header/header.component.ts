import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, of, tap } from 'rxjs';
import { ToDoStore } from '@shared/state/to-do.store';


function createHeaderViewModel() {
  const store = inject(ToDoStore);

  return store.state$.pipe(
    map(s => ({ toDoCount: s.toDos?.length }))
  )
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class HeaderComponent {

  readonly vm$ = createHeaderViewModel()  

}
