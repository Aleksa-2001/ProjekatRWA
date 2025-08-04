import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, mergeMap } from "rxjs"
import * as CartActions from "./cart.actions"

export class CartEffects {
    private actions$ = inject(Actions)
    //private service = inject(CartService)
    private router = inject(Router)

    // loadEffect$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(CartActions.loadItems),
    //         mergeMap(() => this.service.getProdavnice()
    //             .pipe(
    //                 map((prodavnice) => (CartActions.loadItemsSuccess({korpa}))),
    //                 catchError((error) => of(CartActions.loadItemsFailure({ error })))
    //             )
    //         )
    //     )
    // })
    
}