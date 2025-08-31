import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { debounceTime, filter, map, withLatestFrom } from "rxjs";
import { selectPrikaz } from "./toast.selectors";
import { Store } from "@ngrx/store";
import { AppState } from "../app-state";
import * as ToastActions from "./toast.actions";

@Injectable()
export class ToastEffects {
    private actions$ = inject(Actions)
    private store = inject(Store<AppState>)

    hideToast$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ToastActions.showToast),
            debounceTime(5000),
            withLatestFrom(this.store.select(selectPrikaz)),
            filter(([_, prikaziPoruku]) => prikaziPoruku),
            map(() => ToastActions.hideToast())
        )
    })
}