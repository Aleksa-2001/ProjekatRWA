import { inject, Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { ProdavnicaService } from "../../services/prodavnica.service"
import * as ProdavniceActions from "./prodavnica.actions"
import { of } from "rxjs"
import { catchError, map, mergeMap, tap } from "rxjs/operators"
import { selectSelectedProdavnicaID } from "./prodavnica.selectors"

@Injectable()
export class ProdavniceEffects {
    private actions$ = inject(Actions);
    private service = inject(ProdavnicaService);

    loadEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.loadItems),
            mergeMap(() => this.service.getProdavnice()
                .pipe(
                    map((prodavnice) => (ProdavniceActions.loadItemsSuccess({prodavnice}))),
                    catchError(() => of({ type: "[Prodavnica] Load error" }))
                )
            )
        )
    })

    loadProdavnica$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.loadSelectedItem),
            mergeMap(({ selectedProdavnicaID }) => this.service.getProdavnicaByID(selectedProdavnicaID)
                .pipe(
                    map((selectedProdavnica) => (ProdavniceActions.loadSelectedItemSuccess({selectedProdavnica}))),
                    catchError(() => of({ type: "[Prodavnica] Load error" }))
                )
            )
        )
    })

    addProdavnica$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.addItem),
            mergeMap(({ prodavnica }) => this.service.addProdavnica(prodavnica)
                .pipe(
                    map((prodavnica) => (ProdavniceActions.addItemSuccess({prodavnica}))),
                    catchError(() => of({ type: "[Prodavnica] Add error" }))
                )
            )
        )
    })

    updateProdavnica$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.updateItem),
            mergeMap(({ selectedProdavnicaID, selectedProdavnica }) => this.service.updateProdavnica(selectedProdavnicaID, selectedProdavnica)
                .pipe(
                    map((selectedProdavnica) => (ProdavniceActions.updateItemSuccess({selectedProdavnica}))),
                    catchError(() => of({ type: "[Prodavnica] Update error" }))
                )
            )
        )
    })
}