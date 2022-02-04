/* tslint:disable */
import { ToDoDto } from './to-do-dto';
export interface GetToDosPageResponse {
  entities?: Array<ToDoDto>;
  length?: number;
  validationErrors?: Array<string>;
}
