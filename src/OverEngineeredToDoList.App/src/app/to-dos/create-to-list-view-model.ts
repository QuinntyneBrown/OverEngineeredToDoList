import { inject } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ToDoStore } from "@shared/state/to-do.store";
import { map } from "rxjs/operators";

export function createToDoListViewModel() {
    const store = inject(ToDoStore);
    const toDos$ = store.select(x => x.toDos);

    return toDos$.pipe(
        map(toDos => ({ dataSource: new MatTableDataSource(toDos), displayedColumns : [
            "name",
            "complete",
            "actions"
          ]}))
    );
    
}