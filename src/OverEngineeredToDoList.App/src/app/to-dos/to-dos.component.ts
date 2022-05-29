import { Component } from '@angular/core';
import { ToDo } from '@shared/models/to-do';
import { Subject} from 'rxjs';
import { createToDoListViewModel } from './create-to-list-view-model';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.scss']
})
export class ToDosComponent {

  private readonly _addOrUpdateSubject: Subject<Partial<ToDo>> = new Subject();

  private readonly _deleteSubject: Subject<ToDo> = new Subject();

  readonly vm$ = createToDoListViewModel(this._deleteSubject.asObservable(), this._addOrUpdateSubject.asObservable());

  addOrUpdate(toDo:Partial<ToDo> = null) {
    this._addOrUpdateSubject.next(toDo);    
  }

  delete(toDo: ToDo) {
    this._deleteSubject.next(toDo);
  }
}
