/* tslint:disable */
import { ToDoDto } from './to-do-dto';
export interface GetToDoByIdResponse {
  toDo?: ToDoDto;
  validationErrors?: Array<string>;
}
