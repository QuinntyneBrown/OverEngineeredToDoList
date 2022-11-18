/* tslint:disable */
import { ToDoDto } from './to-do-dto';
export interface GetToDosResponse {
  toDos?: Array<ToDoDto>;
  validationErrors?: Array<string>;
}
