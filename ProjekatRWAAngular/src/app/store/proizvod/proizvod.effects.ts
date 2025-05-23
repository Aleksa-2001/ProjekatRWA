import { inject, Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { ProizvodService } from "../../services/proizvod.service"
import * as ProizvodiActions from "./proizvod.actions"
import { of } from "rxjs"
import { catchError, map, mergeMap } from "rxjs/operators"

@Injectable()
export class ProizvodiEffects {
    private actions$ = inject(Actions);
    private service = inject(ProizvodService);

    //constructor(private service: RacunarskaKomponentaService, private actions$: Actions) { }

    loadEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.loadItems),
            mergeMap(({ prodavnicaID }) => this.service.getProizvodi(prodavnicaID)
                .pipe(
                    map((proizvodi) => (ProizvodiActions.loadItemsSuccess({proizvodi}))),
                    catchError(() => of({ type: "[Proizvod] Load error" }))
                )
            )
        )
    })

    loadProdavnica$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.loadSelectedItem),
            mergeMap(({ selectedProizvodID }) => this.service.getProizvodByID(selectedProizvodID)
                .pipe(
                    map((selectedProizvod) => (ProizvodiActions.loadSelectedItemSuccess({selectedProizvod}))),
                    catchError(() => of({ type: "[Proizvod] Load item error" }))
                )
            )
        )
    })

    addProizvod$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.addItem),
            mergeMap(({ proizvod }) => this.service.addProizvod(proizvod)
                .pipe(
                    map((proizvod) => (ProizvodiActions.addItemSuccess({proizvod}))),
                    catchError(() => of({ type: "[Proizvod] Add error" }))
                )
            )
        )
    })

    updateProizvod$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.updateItem),
            mergeMap(({ selectedProizvodID, selectedProizvod }) => this.service.updateProizvod(selectedProizvodID, selectedProizvod)
                .pipe(
                    map((selectedProizvod) => (ProizvodiActions.updateItemSuccess({selectedProizvod}))),
                    catchError(() => of({ type: "[Proizvod] Update error" }))
                )
            )
        )
    })
}