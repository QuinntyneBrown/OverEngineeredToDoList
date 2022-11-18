/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GetToDoByIdResponse } from '../models/get-to-do-by-id-response';
import { RemoveToDoResponse } from '../models/remove-to-do-response';
import { GetToDosResponse } from '../models/get-to-dos-response';
import { CreateToDoResponse } from '../models/create-to-do-response';
import { CreateToDoRequest } from '../models/create-to-do-request';
import { UpdateToDoResponse } from '../models/update-to-do-response';
import { UpdateToDoRequest } from '../models/update-to-do-request';
import { GetToDosPageResponse } from '../models/get-to-dos-page-response';
@Injectable({
  providedIn: 'root',
})
class ToDoService extends __BaseService {
  static readonly getToDoByIdPath = '/api/ToDo/{toDoId}';
  static readonly removeToDoPath = '/api/ToDo/{toDoId}';
  static readonly getToDosPath = '/api/ToDo';
  static readonly createToDoPath = '/api/ToDo';
  static readonly updateToDoPath = '/api/ToDo';
  static readonly getToDosPagePath = '/api/ToDo/page/{pageSize}/{index}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get ToDo by id.
   *
   * Get ToDo by id.
   * @param toDoId undefined
   * @return Success
   */
  getToDoByIdResponse(toDoId: string): __Observable<__StrictHttpResponse<GetToDoByIdResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ToDo/${encodeURIComponent(String(toDoId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GetToDoByIdResponse>;
      })
    );
  }
  /**
   * Get ToDo by id.
   *
   * Get ToDo by id.
   * @param toDoId undefined
   * @return Success
   */
  getToDoById(toDoId: string): __Observable<GetToDoByIdResponse> {
    return this.getToDoByIdResponse(toDoId).pipe(
      __map(_r => _r.body as GetToDoByIdResponse)
    );
  }

  /**
   * Delete ToDo.
   *
   * Delete ToDo.
   * @param toDoId undefined
   * @return Success
   */
  removeToDoResponse(toDoId: string): __Observable<__StrictHttpResponse<RemoveToDoResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/ToDo/${encodeURIComponent(String(toDoId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RemoveToDoResponse>;
      })
    );
  }
  /**
   * Delete ToDo.
   *
   * Delete ToDo.
   * @param toDoId undefined
   * @return Success
   */
  removeToDo(toDoId: string): __Observable<RemoveToDoResponse> {
    return this.removeToDoResponse(toDoId).pipe(
      __map(_r => _r.body as RemoveToDoResponse)
    );
  }

  /**
   * Get ToDos.
   *
   * Get ToDos.
   * @return Success
   */
  getToDosResponse(): __Observable<__StrictHttpResponse<GetToDosResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ToDo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GetToDosResponse>;
      })
    );
  }
  /**
   * Get ToDos.
   *
   * Get ToDos.
   * @return Success
   */
  getToDos(): __Observable<GetToDosResponse> {
    return this.getToDosResponse().pipe(
      __map(_r => _r.body as GetToDosResponse)
    );
  }

  /**
   * Create ToDo.
   *
   * Create ToDo.
   * @param body undefined
   * @return Success
   */
  createToDoResponse(body?: CreateToDoRequest): __Observable<__StrictHttpResponse<CreateToDoResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/ToDo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CreateToDoResponse>;
      })
    );
  }
  /**
   * Create ToDo.
   *
   * Create ToDo.
   * @param body undefined
   * @return Success
   */
  createToDo(body?: CreateToDoRequest): __Observable<CreateToDoResponse> {
    return this.createToDoResponse(body).pipe(
      __map(_r => _r.body as CreateToDoResponse)
    );
  }

  /**
   * Update ToDo.
   *
   * Update ToDo.
   * @param body undefined
   * @return Success
   */
  updateToDoResponse(body?: UpdateToDoRequest): __Observable<__StrictHttpResponse<UpdateToDoResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/ToDo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UpdateToDoResponse>;
      })
    );
  }
  /**
   * Update ToDo.
   *
   * Update ToDo.
   * @param body undefined
   * @return Success
   */
  updateToDo(body?: UpdateToDoRequest): __Observable<UpdateToDoResponse> {
    return this.updateToDoResponse(body).pipe(
      __map(_r => _r.body as UpdateToDoResponse)
    );
  }

  /**
   * Get ToDo Page.
   *
   * Get ToDo Page.
   * @param params The `ToDoService.GetToDosPageParams` containing the following parameters:
   *
   * - `pageSize`:
   *
   * - `index`:
   *
   * @return Success
   */
  getToDosPageResponse(params: ToDoService.GetToDosPageParams): __Observable<__StrictHttpResponse<GetToDosPageResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ToDo/page/${encodeURIComponent(String(params.pageSize))}/${encodeURIComponent(String(params.index))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GetToDosPageResponse>;
      })
    );
  }
  /**
   * Get ToDo Page.
   *
   * Get ToDo Page.
   * @param params The `ToDoService.GetToDosPageParams` containing the following parameters:
   *
   * - `pageSize`:
   *
   * - `index`:
   *
   * @return Success
   */
  getToDosPage(params: ToDoService.GetToDosPageParams): __Observable<GetToDosPageResponse> {
    return this.getToDosPageResponse(params).pipe(
      __map(_r => _r.body as GetToDosPageResponse)
    );
  }
}

module ToDoService {

  /**
   * Parameters for getToDosPage
   */
  export interface GetToDosPageParams {
    pageSize: number;
    index: number;
  }
}

export { ToDoService }
