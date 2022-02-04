import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { Constructor } from "./constructor";

@Injectable()
export class Destroyable implements OnDestroy {
  readonly _destroyed$: Subject<void>  = new Subject();

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}

export interface IDestroyable extends OnDestroy {
  readonly _destroyed$: Subject<void>;
}

type DestroyableCtor = Constructor<IDestroyable>;

export function mixinDestroyable<T extends Constructor<{}>>(base: T): DestroyableCtor & T {
  return class extends base {
    readonly _destroyed$: Subject<void> = new Subject();

    ngOnDestroy(): void {
      this._destroyed$.next();
      this._destroyed$.complete();
    }
  }
}
