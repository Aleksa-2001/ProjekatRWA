import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, first, map, mergeMap, of } from "rxjs";
import { showToast } from "../toast/toast.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../app-state";
import { selectItemCount } from "./cart.selectors";
import { maxKolicina } from "./cart.reducer";
import { Router } from "@angular/router";
import * as CartActions from "./cart.actions";

@Injectable()
export class CartEffects { 
    private actions$ = inject(Actions)
    private store = inject(Store<AppState>)
    private router = inject(Router)

    addToCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CartActions.addToCart),
            mergeMap(({ proizvod }) => this.store.select(selectItemCount(proizvod))
                .pipe(
                    first(),
                    map(count => count < 50 ? CartActions.addToCartSuccess({ proizvod }) : CartActions.addToCartFailure({ error: `Maksimalna količina jednog artikla u korpi je ${maxKolicina}` })),
                    catchError(() => of({ type: '[Korpa] Add Error' }))
                )
            )
        )
    })

    addToCartSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CartActions.addToCartSuccess),
            map(({ proizvod }) => showToast({ poruka: `Proizvod \"${proizvod.naziv}\" je dodat u korpu`, tipPoruke: 'success'}))
        )
    })

    addToCartFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CartActions.addToCartFailure),
            map(({ error }) => showToast({ poruka: `Greška: ${error}`, tipPoruke: 'danger'}))
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

    createOrder$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CartActions.createOrder),
            map(() => {
                this.router.navigate(["/"])
                return showToast({ poruka: "Uspešno ste postavili narudžbinu! Hvala Vam na ukazanom poverenju!", tipPoruke: 'success' })
            }),
            catchError(() => of({ type: '[Korpa] Create Order Error' }))
        )
    })

}
