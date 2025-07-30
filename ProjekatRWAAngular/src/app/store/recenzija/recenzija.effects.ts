import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RecenzijaService } from "../../services/recenzija.service";
import { catchError, map, mergeMap, of } from "rxjs";
import * as RecenzijeActions from "./recenzija.actions"

@Injectable()
export class RecenzijeEffects {
    private actions$ = inject(Actions)
    private service = inject(RecenzijaService)

    loadEffectUser = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecenzijeActions.loadItemsUser),
            mergeMap(({ userID }) => this.service.getRecenzijeByUserID(userID).pipe(
                map(recenzije => RecenzijeActions.loadItemsSuccess({ recenzije })),
                catchError((error) => of(RecenzijeActions.loadItemsFailure({ error })))
            )) 
        )
    })

    loadEffectProdavnica = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecenzijeActions.loadItemsProdavnica),
            mergeMap(({ prodavnicaID }) => this.service.getRecenzijeByProdavnicaID(prodavnicaID).pipe(
                map(recenzije => RecenzijeActions.loadItemsSuccess({ recenzije })),
                catchError((error) => of(RecenzijeActions.loadItemsFailure({ error })))
            )) 
        )
    })

    loadEffectProizvod = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecenzijeActions.loadItemsProizvod),
            mergeMap(({ proizvodID }) => this.service.getRecenzijeByProizvodID(proizvodID).pipe(
                map(recenzije => RecenzijeActions.loadItemsSuccess({ recenzije })),
                catchError((error) => of(RecenzijeActions.loadItemsFailure({ error })))
            )) 
        )
    })

    loadRecenzija$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecenzijeActions.loadSelectedItem),
            mergeMap(({ selectedRecenzijaID }) => this.service.getRecenzijaByID(selectedRecenzijaID)
                .pipe(
                    map((selectedRecenzija) => (RecenzijeActions.loadSelectedItemSuccess({selectedRecenzija}))),
                    catchError((error) => of(RecenzijeActions.loadSelectedItemFailure({ error })))
                )
            )
        )
    })

    addRecenzija$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecenzijeActions.addItem),
            mergeMap(({ recenzija }) => this.service.addRecenzija(recenzija)
                .pipe(
                    map((recenzija) => (RecenzijeActions.addItemSuccess({ recenzija }))),
                    catchError((error) => of(RecenzijeActions.addItemFailure({ error })))
                )
            )
        )
    })

    updateRecenzija$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecenzijeActions.updateItem),
            mergeMap(({ selectedRecenzijaID, selectedRecenzija }) => this.service.updateRecenzija(selectedRecenzijaID, selectedRecenzija)
                .pipe(
                    map((recenzija) => (RecenzijeActions.updateItemSuccess({ recenzija: { id: recenzija.id, changes: recenzija } }))),
                    catchError((error) => of(RecenzijeActions.updateItemFailure({ error })))
                )
            )
        )
    })

    deleteRecenzija$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecenzijeActions.deleteItem),
            mergeMap(({ selectedRecenzijaID }) => this.service.deleteRecenzija(selectedRecenzijaID)
                .pipe(
                    map((recenzijaID) => (RecenzijeActions.deleteItemSuccess({recenzijaID}))),
                    catchError((error) => of(RecenzijeActions.deleteItemFailure({ error })))
                )
            )
        )
    })

}