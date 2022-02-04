/* tslint:disable */
import { ToDoDto } from './to-do-dto';
export interface CreateToDoResponse {
  toDo?: ToDoDto;
  validationErrors?: Array<string>;
}
