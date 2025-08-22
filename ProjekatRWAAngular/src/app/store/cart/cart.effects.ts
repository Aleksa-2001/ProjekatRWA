import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of } from "rxjs";
import * as CartActions from "./cart.actions";
import { showToast } from "../toast/toast.actions";

@Injectable()
export class CartEffects { 
    private actions$ = inject(Actions)

    addToCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CartActions.addToCart),
            map(({ proizvod }) => showToast({ poruka: `Proizvod \"${proizvod.naziv}\" je dodat u korpu`, tipPoruke: 'success'})),
            catchError(() => of({ type: '[Korpa] Add Error' }))
        )
    })

    removeFromCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CartActions.removeFromCart),
            map(({ artikal }) => showToast({ poruka: `Proizvod \"${artikal.proizvod.naziv}\" je uklonjen iz korpe`, tipPoruke: 'warning' })),
            catchError(() => of({ type: '[Korpa] Remove Error' }))
        )
    })

    clearCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CartActions.clearCart),
            map(() => showToast({ poruka: `Korpa je ispražnjena`, tipPoruke: 'warning' })),
            catchError(() => of({ type: '[Korpa] Remove All Error' }))
        )
    })
}
