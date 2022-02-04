/* tslint:disable */
import { ToDoDto } from './to-do-dto';
export interface RemoveToDoResponse {
  toDo?: ToDoDto;
  validationErrors?: Array<string>;
}
