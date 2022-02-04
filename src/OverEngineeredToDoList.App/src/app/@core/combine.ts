import { from, merge, Observable, ObservableInput } from "rxjs";
import { map, scan, startWith } from "rxjs/operators";

type EnrichedValue = { value: any, index: number };

export function combine(sources: ObservableInput<any>[]): Observable<any[]> {

  const seed = new Array(sources.length);

  return merge(

    ...(sources.map((source, index) => from(source).pipe(map((value) => ({ value, index })))

    ) as Observable<EnrichedValue>[])).pipe(

      scan((accumlatedValue, enrichedValue) => {
        accumlatedValue[enrichedValue.index] = enrichedValue.value;
        return Array.from(accumlatedValue);
      }, seed),      

      startWith(seed)

    );
}
