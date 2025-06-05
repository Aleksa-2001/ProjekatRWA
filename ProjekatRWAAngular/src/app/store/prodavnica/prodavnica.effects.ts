import { inject, Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { ProdavnicaService } from "../../services/prodavnica.service"
import * as ProdavniceActions from "./prodavnica.actions"
import { of } from "rxjs"
import { catchError, map, mergeMap } from "rxjs/operators"
import { Store } from "@ngrx/store"
import { AppState } from "../app-state"

@Injectable()
export class ProdavniceEffects {
    private actions$ = inject(Actions)
    private service = inject(ProdavnicaService)

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

    loadBySearch$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.loadItemsBySearch),
            mergeMap(({ search }) => this.service.getProdavniceBySearch(search)
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
            mergeMap(({ prodavnica, file }) => this.service.addProdavnica(prodavnica)
                .pipe(
                    map((prodavnica) => {
                        file?.append('id', prodavnica.id.toString())
                        return ProdavniceActions.addItemSuccess({ prodavnica, file })
                    }),
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

    deleteProdavnica$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.deleteItem),
            mergeMap(({ selectedProdavnicaID }) => this.service.deleteProdavnica(selectedProdavnicaID)
                .pipe(
                    map((prodavnicaID) => (ProdavniceActions.deleteItemSuccess({prodavnicaID}))),
                    catchError(() => of({ type: "[Prodavnica] Delete error" }))
                )
            )
        )
    })

    uploadImage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.addItemSuccess),
            mergeMap(({ prodavnica, file }) => this.service.uploadImage(prodavnica.id, file)
                .pipe(
                    map((filename) => (ProdavniceActions.uploadImageSuccess({filename}))),
                    catchError(() => of({ type: "[Prodavnica] Upload failed" }))
                )
            )
        )
    })
}