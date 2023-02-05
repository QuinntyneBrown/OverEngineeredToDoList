// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/* tslint:disable */
import { ToDoDto } from './to-do-dto';
export interface GetToDosPageResponse {
  entities?: Array<ToDoDto>;
  length?: number;
  validationErrors?: Array<string>;
}

