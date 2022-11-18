/* tslint:disable */
import { ToDoDto } from './to-do-dto';
export interface UpdateToDoResponse {
  toDo?: ToDoDto;
  validationErrors?: Array<string>;
}
