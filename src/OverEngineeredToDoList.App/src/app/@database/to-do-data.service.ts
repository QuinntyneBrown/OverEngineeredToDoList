import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import initSqlJs, { Database } from 'sql.js';

@Injectable({
    providedIn: "root"
})
export class ToDoDataService {
    init() {

        const $ = from(initSqlJs({
            locateFile: () => "http://localhost:4200/assets/sql-wasm.wasm"
          }));

        return $;
    }
}